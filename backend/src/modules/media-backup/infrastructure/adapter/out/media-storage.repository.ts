import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import sharp from 'sharp';
import { MediaMetadata, MediaProcessingOptions } from '../../../domain/types/media.types';
import { MediaType } from '../../../domain/enums/media-type.enum';

@Injectable()
export class MediaStorageRepository {
  private readonly uploadDir: string;
  private readonly thumbnailDir: string;
  private readonly previewDir: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('MEDIA_UPLOAD_DIR', './uploads/media');
    this.thumbnailDir = path.join(this.uploadDir, 'thumbnails');
    this.previewDir = path.join(this.uploadDir, 'previews');
    this.ensureDirectories();
  }

  private async ensureDirectories(): Promise<void> {
    const dirs = [this.uploadDir, this.thumbnailDir, this.previewDir];
    await Promise.all(
      dirs.map(dir => fs.mkdir(dir, { recursive: true }))
    );
  }

  async saveMedia(
    userId: string,
    mediaId: string,
    buffer: Buffer,
    metadata: MediaMetadata,
    options: MediaProcessingOptions = {
      generateThumbnails: true,
      generatePreviews: true,
      preserveOriginal: true
    }
  ): Promise<{
    storageKey: string;
    thumbnailUrl?: string;
    previewUrl?: string;
    processedMetadata: Partial<MediaMetadata>;
  }> {
    const userDir = path.join(this.uploadDir, userId);
    await fs.mkdir(userDir, { recursive: true });

    // Generate unique filename - preserve original extension from filename if available
    const timestamp = Date.now();
    const originalName = metadata.originalName || '';
    const originalExt = path.extname(originalName).toLowerCase().replace('.', '');
    // Use original file extension if available, otherwise derive from mime type
    const extension = originalExt || this.getFileExtension(metadata.mimeType);
    const filename = `${timestamp}_${mediaId}.${extension}`;
    const storageKey = `${userId}/${filename}`;
    const filePath = path.join(userDir, filename);

    // Check if this is a HEIC/HEIF file - we'll convert it ONLY for thumbnail generation
    const isHeicFile = originalName.toLowerCase().endsWith('.heic') || originalName.toLowerCase().endsWith('.heif');
    const isHeicMime = metadata.mimeType === 'image/heic' || metadata.mimeType === 'image/heif';
    const isHeic = isHeicFile || isHeicMime;

    // Keep the original buffer for saving the file as-is
    // Only create a converted buffer for thumbnail generation if needed
    let processBuffer = buffer;
    if (isHeic) {
      try {
        console.log(`Processing HEIC file for thumbnails: ${originalName}, mimeType: ${metadata.mimeType}`);
        // Convert HEIC to JPEG ONLY for processing (thumbnails/metadata)
        processBuffer = await sharp(Buffer.from(buffer))
          .jpeg({ quality: 95 })
          .toBuffer();
        console.log('HEIC thumbnail conversion successful');
      } catch (error) {
        console.error('Error converting HEIC for thumbnail generation:', error);
        // If conversion fails, try to process as is
        processBuffer = Buffer.from(buffer);
      }
    }

    // Calculate checksums of original buffer
    const checksumMd5 = crypto.createHash('md5').update(buffer).digest('hex');
    const checksumSha256 = crypto.createHash('sha256').update(buffer).digest('hex');

    // Save original file
    await fs.writeFile(filePath, buffer);

    const processedMetadata: Partial<MediaMetadata> = {
      ...metadata,
      checksum: {
        md5: checksumMd5,
        sha256: checksumSha256
      }
    };

    let thumbnailUrl: string | undefined;
    let previewUrl: string | undefined;

    // Process media based on type
    if (metadata.mediaType === MediaType.IMAGE) {
      try {
        // Create a new buffer instance for metadata extraction
        const metadataBuffer = Buffer.from(processBuffer);
        const imageInfo = await sharp(metadataBuffer).metadata();
        processedMetadata.width = imageInfo.width;
        processedMetadata.height = imageInfo.height;

        if (options.generateThumbnails) {
          thumbnailUrl = await this.generateImageThumbnail(
            processBuffer,
            userId,
            mediaId,
            options
          );
        }
      } catch (error) {
        console.error('Error processing image metadata:', error);
        // Set default values if metadata extraction fails
        processedMetadata.width = metadata.width || 0;
        processedMetadata.height = metadata.height || 0;

        // Still try to generate thumbnail even if metadata fails
        if (options.generateThumbnails) {
          try {
            thumbnailUrl = await this.generateImageThumbnail(
              processBuffer,
              userId,
              mediaId,
              options
            );
          } catch (thumbError) {
            console.error('Error generating thumbnail after metadata failure:', thumbError);
          }
        }
      }
    } else if (metadata.mediaType === MediaType.VIDEO) {
      if (options.generateThumbnails) {
        thumbnailUrl = await this.generateVideoThumbnail(
          buffer,
          userId,
          mediaId,
          options
        );
      }
      if (options.generatePreviews) {
        previewUrl = await this.generateVideoPreview(
          buffer,
          userId,
          mediaId,
          options
        );
      }
    }

    return {
      storageKey,
      thumbnailUrl,
      previewUrl,
      processedMetadata
    };
  }

  async getMediaFile(storageKey: string): Promise<Buffer> {
    const filePath = path.join(this.uploadDir, storageKey);
    return fs.readFile(filePath);
  }

  async deleteMediaFile(storageKey: string): Promise<void> {
    const filePath = path.join(this.uploadDir, storageKey);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // File might not exist, ignore
    }

    // Also delete associated thumbnails and previews
    const userId = storageKey.split('/')[0];
    const mediaId = storageKey.split('_')[1].split('.')[0];

    const thumbnailPath = path.join(this.thumbnailDir, userId, `${mediaId}_thumb.jpg`);
    const previewPath = path.join(this.previewDir, userId, `${mediaId}_preview.mp4`);

    await Promise.all([
      fs.unlink(thumbnailPath).catch(() => {}),
      fs.unlink(previewPath).catch(() => {})
    ]);
  }

  private async generateImageThumbnail(
    buffer: Buffer,
    userId: string,
    mediaId: string,
    options: MediaProcessingOptions
  ): Promise<string> {
    const thumbnailDir = path.join(this.thumbnailDir, userId);
    await fs.mkdir(thumbnailDir, { recursive: true });

    const thumbnailPath = path.join(thumbnailDir, `${mediaId}_thumb.jpg`);

    let resizeOptions: sharp.ResizeOptions = {
      width: 300,
      height: 300,
      fit: 'cover'
    };

    if (options.maxResolution) {
      resizeOptions = {
        width: options.maxResolution.width,
        height: options.maxResolution.height,
        fit: 'inside'
      };
    }

    try {
      // Create a new buffer instance to avoid seek issues
      const thumbnailBuffer = Buffer.from(buffer);
      await sharp(thumbnailBuffer)
        .resize(resizeOptions)
        .jpeg({ quality: options.compressionLevel || 80 })
        .toFile(thumbnailPath);
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      // Create a fallback placeholder thumbnail if processing fails
      await sharp({
        create: {
          width: resizeOptions.width || 300,
          height: resizeOptions.height || 300,
          channels: 4,
          background: { r: 128, g: 128, b: 128, alpha: 1 }
        }
      })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);
    }

    return `${userId}/${mediaId}_thumb.jpg`;
  }

  private async generateVideoThumbnail(
    buffer: Buffer,
    userId: string,
    mediaId: string,
    options: MediaProcessingOptions
  ): Promise<string> {
    // This would require ffmpeg integration
    // For now, return a placeholder
    const thumbnailDir = path.join(this.thumbnailDir, userId);
    await fs.mkdir(thumbnailDir, { recursive: true });

    const thumbnailPath = path.join(thumbnailDir, `${mediaId}_thumb.jpg`);

    // TODO: Implement ffmpeg-based thumbnail generation
    // For now, create a placeholder
    await sharp({
      create: {
        width: 300,
        height: 300,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);

    return `${userId}/${mediaId}_thumb.jpg`;
  }

  private async generateVideoPreview(
    buffer: Buffer,
    userId: string,
    mediaId: string,
    options: MediaProcessingOptions
  ): Promise<string> {
    // This would require ffmpeg integration
    // For now, return a placeholder
    const previewDir = path.join(this.previewDir, userId);
    await fs.mkdir(previewDir, { recursive: true });

    const previewPath = path.join(previewDir, `${mediaId}_preview.mp4`);

    // TODO: Implement ffmpeg-based preview generation
    // For now, create an empty placeholder
    await fs.writeFile(previewPath, Buffer.alloc(0));

    return `${userId}/${mediaId}_preview.mp4`;
  }

  private getFileExtension(mimeType: string): string {
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/heic': 'heic',
      'image/heif': 'heif',
      'image/tiff': 'tiff',
      'image/bmp': 'bmp',
      'image/svg+xml': 'svg',
      'image/avif': 'avif',
      'video/mp4': 'mp4',
      'video/mov': 'mov',
      'video/avi': 'avi',
      'video/mkv': 'mkv',
      'video/webm': 'webm',
      'video/flv': 'flv',
      'video/wmv': 'wmv',
      'video/m4v': 'm4v',
      'video/3gp': '3gp',
      'video/quicktime': 'mov',
      'audio/mpeg': 'mp3',
      'audio/mp3': 'mp3',
      'audio/wav': 'wav',
      'audio/flac': 'flac',
      'audio/aac': 'aac',
      'audio/ogg': 'ogg',
      'audio/m4a': 'm4a',
      'audio/webm': 'webm',
      'application/pdf': 'pdf',
      'text/plain': 'txt'
    };

    return mimeToExt[mimeType] || 'bin';
  }

  async validateMediaIntegrity(
    storageKey: string,
    expectedChecksums: {
      md5: string;
      sha256: string;
    }
  ): Promise<boolean> {
    try {
      const buffer = await this.getMediaFile(storageKey);

      const actualMd5 = crypto.createHash('md5').update(buffer).digest('hex');
      const actualSha256 = crypto.createHash('sha256').update(buffer).digest('hex');

      return actualMd5 === expectedChecksums.md5 && actualSha256 === expectedChecksums.sha256;
    } catch (error) {
      return false;
    }
  }

  async getStorageStats(userId: string): Promise<{
    totalFiles: number;
    totalSize: number;
    byType: Record<MediaType, { count: number; size: number }>;
  }> {
    const userDir = path.join(this.uploadDir, userId);

    try {
      const files = await fs.readdir(userDir, { withFileTypes: true });
      const filesOnly = files.filter(file => file.isFile());

      let totalSize = 0;
      const byType: Record<MediaType, { count: number; size: number }> = {} as any;

      for (const mediaType of Object.values(MediaType)) {
        byType[mediaType] = { count: 0, size: 0 };
      }

      for (const file of filesOnly) {
        const filePath = path.join(userDir, file.name);
        const stats = await fs.stat(filePath);
        totalSize += stats.size;

        // Determine media type from file extension
        const extension = path.extname(file.name).toLowerCase();
        // This is a simplified approach - in practice, you'd want to maintain a mapping
        // or read the file to determine the actual type
      }

      return {
        totalFiles: filesOnly.length,
        totalSize,
        byType
      };
    } catch (error) {
      return {
        totalFiles: 0,
        totalSize: 0,
        byType: {} as any
      };
    }
  }
}