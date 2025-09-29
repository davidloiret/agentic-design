import { Injectable, Logger, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VcfFilesRepository } from '../infrastructure/vcf-files.repository';
import { VcfFileEntity, VcfFileType, VcfFileStatus, VcfFileAccessLevel } from '../domain/vcf-file.entity';
import { User } from '../../../user/domain/entity/user.entity';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';

interface UploadOptions {
  entityType: string;
  entityId: string;
  description?: string;
  tags?: string[];
  accessLevel?: VcfFileAccessLevel;
  allowedUserIds?: string[];
  expiresAt?: Date;
}

export interface FileUploadResult {
  fileId: string;
  filename: string;
  size: number;
  mimeType: string;
  url?: string;
}

@Injectable()
export class VcfFilesService {
  private readonly logger = new Logger(VcfFilesService.name);
  private readonly uploadDir: string;
  private readonly maxFileSize: number;
  private readonly allowedMimeTypes: Set<string>;

  constructor(
    private readonly filesRepository: VcfFilesRepository,
    private readonly configService: ConfigService,
  ) {
    this.uploadDir = this.configService.get('UPLOAD_DIR', './uploads');
    this.maxFileSize = this.configService.get('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
    this.allowedMimeTypes = new Set([
      // Images
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      // Documents
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // Code
      'text/plain', 'text/html', 'text/css', 'text/javascript', 'application/json', 'application/xml',
      // Archives
      'application/zip', 'application/x-tar', 'application/x-gzip',
      // Logs
      'text/x-log', 'application/x-log',
    ]);

    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      this.logger.error(`Failed to create upload directory: ${error}`);
    }
  }

  async uploadFile(
    uploader: User,
    file: Express.Multer.File,
    options: UploadOptions
  ): Promise<FileUploadResult> {
    // Validate file
    this.validateFile(file);

    // Generate unique filename
    const uniqueFilename = this.generateUniqueFilename(file.originalname);
    const storageKey = path.join(
      options.entityType,
      options.entityId,
      uniqueFilename
    );
    const fullPath = path.join(this.uploadDir, storageKey);

    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });

    // Calculate checksums
    const checksums = await this.calculateChecksums(file.buffer);

    // Save file to disk
    await fs.writeFile(fullPath, file.buffer);

    // Create file entity
    const fileEntity = this.filesRepository.create({
      uploader,
      filename: uniqueFilename,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      fileType: this.determineFileType(file.mimetype),
      size: file.size,
      storageKey,
      storageProvider: 'local',
      status: VcfFileStatus.UPLOADED,
      accessLevel: options.accessLevel || VcfFileAccessLevel.PRIVATE,
      description: options.description,
      tags: options.tags || [],
      entityType: options.entityType,
      entityId: options.entityId,
      checksumMd5: checksums.md5,
      checksumSha256: checksums.sha256,
      allowedUserIds: options.allowedUserIds || [],
      expiresAt: options.expiresAt,
      uploadedAt: new Date(),
    });

    await this.filesRepository.save(fileEntity);

    // Process file based on type
    await this.processFile(fileEntity, fullPath);

    // Generate thumbnail if image
    if (fileEntity.fileType === VcfFileType.IMAGE) {
      await this.generateThumbnail(fileEntity, fullPath);
    }

    // Initiate virus scan (async)
    this.scanFileForViruses(fileEntity).catch(error => {
      this.logger.error(`Virus scan failed for file ${fileEntity.id}: ${error}`);
    });

    return {
      fileId: fileEntity.id,
      filename: fileEntity.filename,
      size: fileEntity.size,
      mimeType: fileEntity.mimeType,
      url: await this.getFileUrl(fileEntity),
    };
  }

  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`File size exceeds maximum of ${this.maxFileSize} bytes`);
    }

    if (!this.allowedMimeTypes.has(file.mimetype)) {
      throw new BadRequestException(`File type ${file.mimetype} is not allowed`);
    }
  }

  private generateUniqueFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext);
    const timestamp = Date.now();
    const random = crypto.randomBytes(8).toString('hex');
    return `${name}-${timestamp}-${random}${ext}`;
  }

  private async calculateChecksums(buffer: Buffer): Promise<{ md5: string; sha256: string }> {
    const md5 = crypto.createHash('md5').update(buffer).digest('hex');
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    return { md5, sha256 };
  }

  private determineFileType(mimeType: string): VcfFileType {
    if (mimeType.startsWith('image/')) return VcfFileType.IMAGE;
    if (mimeType.startsWith('video/')) return VcfFileType.VIDEO;
    if (mimeType.startsWith('audio/')) return VcfFileType.AUDIO;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return VcfFileType.DOCUMENT;
    if (mimeType.includes('text') || mimeType.includes('javascript') || mimeType.includes('json')) return VcfFileType.CODE;
    if (mimeType.includes('log')) return VcfFileType.LOG;
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('gz')) return VcfFileType.ARCHIVE;
    return VcfFileType.OTHER;
  }

  private async processFile(file: VcfFileEntity, filePath: string): Promise<void> {
    try {
      file.status = VcfFileStatus.PROCESSING;
      await this.filesRepository.update(file);

      switch (file.fileType) {
        case VcfFileType.IMAGE:
          await this.processImage(file, filePath);
          break;
        case VcfFileType.CODE:
        case VcfFileType.LOG:
          await this.processText(file, filePath);
          break;
      }

      file.status = VcfFileStatus.READY;
      file.processedAt = new Date();
    } catch (error) {
      file.status = VcfFileStatus.FAILED;
      file.processingErrors = { error: error.message };
      this.logger.error(`Failed to process file ${file.id}: ${error}`);
    }

    await this.filesRepository.update(file);
  }

  private async processImage(file: VcfFileEntity, filePath: string): Promise<void> {
    try {
      const metadata = await sharp(filePath).metadata();
      file.metadata = {
        ...file.metadata,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        density: metadata.density,
      };
    } catch (error) {
      this.logger.warn(`Could not extract image metadata: ${error}`);
    }
  }

  private async processText(file: VcfFileEntity, filePath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      file.metadata = {
        ...file.metadata,
        lineCount: lines.length,
        encoding: 'utf-8',
      };
    } catch (error) {
      this.logger.warn(`Could not process text file: ${error}`);
    }
  }

  private async generateThumbnail(file: VcfFileEntity, filePath: string): Promise<void> {
    try {
      const thumbnailFilename = `thumb-${file.filename}`;
      const thumbnailPath = path.join(this.uploadDir, 'thumbnails', thumbnailFilename);

      await fs.mkdir(path.dirname(thumbnailPath), { recursive: true });

      await sharp(filePath)
        .resize(200, 200, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      file.thumbnailUrl = `/thumbnails/${thumbnailFilename}`;
      await this.filesRepository.update(file);
    } catch (error) {
      this.logger.warn(`Could not generate thumbnail: ${error}`);
    }
  }

  private async scanFileForViruses(file: VcfFileEntity): Promise<void> {
    // Placeholder for virus scanning integration (ClamAV, etc.)
    file.isVirusScanPending = false;
    file.isVirusScanClean = true;
    file.virusScanDate = new Date();
    await this.filesRepository.update(file);
  }

  async getFile(fileId: string, userId: string): Promise<VcfFileEntity> {
    const file = await this.filesRepository.findOne(fileId);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (!await this.canAccessFile(file, userId)) {
      throw new ForbiddenException('Access denied');
    }

    // Update download stats
    file.downloadCount++;
    file.lastDownloadedAt = new Date();
    await this.filesRepository.update(file);

    return file;
  }

  async getFileStream(fileId: string, userId: string): Promise<NodeJS.ReadableStream> {
    const file = await this.getFile(fileId, userId);
    const filePath = path.join(this.uploadDir, file.storageKey);

    const fs = require('fs');
    return fs.createReadStream(filePath);
  }

  async deleteFile(fileId: string, userId: string): Promise<void> {
    const file = await this.filesRepository.findOne(fileId);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.uploader.id !== userId) {
      throw new ForbiddenException('Only the uploader can delete this file');
    }

    // Mark as deleted (soft delete)
    file.status = VcfFileStatus.DELETED;
    file.deletedAt = new Date();
    await this.filesRepository.update(file);

    // Delete physical file
    try {
      const filePath = path.join(this.uploadDir, file.storageKey);
      await fs.unlink(filePath);
    } catch (error) {
      this.logger.error(`Failed to delete physical file: ${error}`);
    }
  }

  private async canAccessFile(file: VcfFileEntity, userId: string): Promise<boolean> {
    // File owner can always access
    if (file.uploader.id === userId) return true;

    // Check access level
    switch (file.accessLevel) {
      case VcfFileAccessLevel.PUBLIC:
        return true;
      case VcfFileAccessLevel.PRIVATE:
        return false;
      case VcfFileAccessLevel.RESTRICTED:
        return file.allowedUserIds.includes(userId);
    }

    return false;
  }

  async getFileUrl(file: VcfFileEntity): Promise<string> {
    if (file.cdnUrl) {
      return file.cdnUrl;
    }

    // Generate signed URL for secure access
    const token = this.generateAccessToken(file.id);
    return `/api/v1/vcf/files/${file.id}/download?token=${token}`;
  }

  private generateAccessToken(fileId: string): string {
    const payload = {
      fileId,
      exp: Date.now() + 3600000, // 1 hour
    };
    const secret = this.configService.get('JWT_SECRET', 'secret');
    return crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
  }

  async getFilesByEntity(entityType: string, entityId: string, userId: string): Promise<VcfFileEntity[]> {
    const files = await this.filesRepository.findByEntity(entityType, entityId);

    // Filter files user can access
    const accessibleFiles = [];
    for (const file of files) {
      if (await this.canAccessFile(file, userId)) {
        accessibleFiles.push(file);
      }
    }

    return accessibleFiles;
  }

  async cleanupExpiredFiles(): Promise<number> {
    const now = new Date();
    const expiredFiles = await this.filesRepository.findExpired(now);

    for (const file of expiredFiles) {
      await this.deleteFile(file.id, file.uploader.id);
    }

    return expiredFiles.length;
  }
}