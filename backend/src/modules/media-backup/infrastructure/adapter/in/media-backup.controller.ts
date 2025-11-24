import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  Body,
  Request,
  UseGuards,
  Res,
  HttpStatus,
  StreamableFile,
  Headers
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../../../modules/auth/auth.guard';
import { MediaBackupService } from '../../../application/usecase/media-backup.service';
import { CreateMediaBackupDto } from '../../../application/dto/create-media-backup.dto';
import { MediaBackupResponseDto } from '../../../application/dto/media-backup-response.dto';
import { MediaType } from '../../../domain/enums/media-type.enum';
import { MediaStatus } from '../../../domain/enums/media-status.enum';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Media Backup')
@Controller('api/v1/media-backup')
@UseGuards(AuthGuard)
export class MediaBackupController {
  private readonly UPLOAD_DIR = './uploads/media';
  private readonly CHUNK_DIR = './uploads/chunks';
  private readonly MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  private readonly CHUNK_SIZE = 1024 * 1024; // 1MB chunks

  constructor(private readonly mediaBackupService: MediaBackupService) {
    // Ensure upload directories exist
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    [this.UPLOAD_DIR, this.CHUNK_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('media', {
      limits: {
        fileSize: this.MAX_FILE_SIZE,
      },
      fileFilter: (req, file, cb) => {
        // Allow common media types
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/heic',
          'video/mp4',
          'video/quicktime',
          'video/x-msvideo',
          'video/x-matroska',
          'video/webm',
          'audio/mpeg',
          'audio/wav',
          'audio/mp4',
          'audio/aac',
          'audio/flac',
          'application/pdf',
          'text/plain'
        ];

        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`File type not allowed: ${file.mimetype}`), false);
        }
      }
    })
  )
  @ApiOperation({ summary: 'Upload and backup media file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Media uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 413, description: 'File too large' })
  async uploadMedia(
    @Request() req,
    @UploadedFile() mediaFile: Express.Multer.File,
    @Body() createMediaBackupDto: CreateMediaBackupDto
  ): Promise<any> {
    // PROPER ERROR HANDLING - Don't throw, return error response
    if (!mediaFile) {
      return {
        success: false,
        error: 'Media file is required',
        code: 'MISSING_FILE'
      };
    }

    try {
      // Validate DTO
      if (!createMediaBackupDto.deviceId) {
        createMediaBackupDto.deviceId = req.user.id;
      }

      // Add file metadata to DTO
      const dtoWithFileData = {
        ...createMediaBackupDto,
        fileName: mediaFile.filename,
        originalName: mediaFile.originalname,
        mimeType: mediaFile.mimetype,
        size: mediaFile.size,
        userId: req.user.id
      };

      // Process upload
      const result = await this.mediaBackupService.backupMedia(
        req.user.id,
        mediaFile.buffer,
        dtoWithFileData
      );

      // Clean up buffer to free memory
      mediaFile.buffer = null;

      return {
        success: true,
        message: 'Media uploaded successfully',
        data: result
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message,
        code: 'UPLOAD_FAILED'
      };
    }
  }

  // STREAMING UPLOAD HANDLERS

  @Post('upload/start')
  @ApiOperation({ summary: 'Start a streaming upload session' })
  async startStreamingUpload(
    @Request() req,
    @Body() body: {
      uploadId: string;
      totalSize: number;
      fileName: string;
      mimeType: string;
      mediaType: MediaType;
      deviceId?: string;
    }
  ): Promise<any> {
    try {
      const { uploadId, totalSize, fileName, mimeType, mediaType } = body;

      // Validate file size
      if (totalSize > this.MAX_FILE_SIZE) {
        return {
          success: false,
          error: `File too large: ${this.formatBytes(totalSize)} (max: ${this.formatBytes(this.MAX_FILE_SIZE)})`
        };
      }

      // Create upload session directory
      const sessionDir = path.join(this.CHUNK_DIR, uploadId);
      fs.mkdirSync(sessionDir, { recursive: true });

      // Create session info file
      const sessionInfo = {
        sessionId: uploadId,
        userId: req.user.id,
        deviceId: body.deviceId || req.user.id,
        totalSize,
        fileName,
        mimeType,
        mediaType,
        startTime: new Date(),
        totalChunks: Math.ceil(totalSize / this.CHUNK_SIZE),
        receivedChunks: []
      };

      fs.writeFileSync(
        path.join(sessionDir, 'info.json'),
        JSON.stringify(sessionInfo, null, 2)
      );

      return {
        success: true,
        sessionId: uploadId,
        chunkSize: this.CHUNK_SIZE,
        totalChunks: sessionInfo.totalChunks
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Post('upload/chunk')
  @UseInterceptors(
    FileInterceptor('chunk', {
      limits: {
        fileSize: this.CHUNK_SIZE * 2, // Allow some flexibility
      }
    })
  )
  @ApiOperation({ summary: 'Upload a chunk of a file' })
  async uploadChunk(
    @UploadedFile() chunk: Express.Multer.File,
    @Body() body: {
      sessionId: string;
      chunkIndex: number;
      offset: number;
      size: number;
      isLast: boolean;
    }
  ): Promise<any> {
    try {
      const { sessionId, chunkIndex, offset, size, isLast } = body;

      if (!chunk) {
        return {
          success: false,
          error: 'Chunk data is required'
        };
      }

      const sessionDir = path.join(this.CHUNK_DIR, sessionId);
      const infoPath = path.join(sessionDir, 'info.json');

      // Verify session exists
      if (!fs.existsSync(infoPath)) {
        return {
          success: false,
          error: 'Invalid session ID'
        };
      }

      // Read session info
      const sessionInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

      // Save chunk
      const chunkPath = path.join(sessionDir, `chunk_${chunkIndex}.tmp`);
      fs.writeFileSync(chunkPath, chunk.buffer);

      // Update session info
      if (!sessionInfo.receivedChunks) {
        sessionInfo.receivedChunks = [];
      }
      sessionInfo.receivedChunks.push({
        index: chunkIndex,
        offset,
        size: chunk.size,
        timestamp: new Date()
      });

      // Free memory
      chunk.buffer = null;

      fs.writeFileSync(infoPath, JSON.stringify(sessionInfo, null, 2));

      return {
        success: true,
        chunkIndex,
        receivedChunks: sessionInfo.receivedChunks.length,
        totalChunks: sessionInfo.totalChunks
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Post('upload/complete')
  @ApiOperation({ summary: 'Complete a streaming upload' })
  async completeStreamingUpload(
    @Request() req,
    @Body() body: {
      sessionId: string;
      totalChunks: number;
      totalSize: number;
    }
  ): Promise<any> {
    try {
      const { sessionId } = body;
      const sessionDir = path.join(this.CHUNK_DIR, sessionId);
      const infoPath = path.join(sessionDir, 'info.json');

      if (!fs.existsSync(infoPath)) {
        return {
          success: false,
          error: 'Invalid session ID'
        };
      }

      const sessionInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

      // Verify all chunks received
      if (sessionInfo.receivedChunks.length !== sessionInfo.totalChunks) {
        return {
          success: false,
          error: `Missing chunks. Expected: ${sessionInfo.totalChunks}, Received: ${sessionInfo.receivedChunks.length}`
        };
      }

      // Combine chunks into final file
      const finalFileName = `${Date.now()}_${sessionInfo.fileName}`;
      const finalPath = path.join(this.UPLOAD_DIR, finalFileName);
      const writeStream = fs.createWriteStream(finalPath);

      for (let i = 0; i < sessionInfo.totalChunks; i++) {
        const chunkPath = path.join(sessionDir, `chunk_${i}.tmp`);
        if (fs.existsSync(chunkPath)) {
          const chunkData = fs.readFileSync(chunkPath);
          writeStream.write(chunkData);
          fs.unlinkSync(chunkPath); // Delete chunk file
        } else {
          writeStream.end();
          throw new Error(`Missing chunk ${i}`);
        }
      }

      writeStream.end();

      // Read final file for processing
      const finalFileBuffer = fs.readFileSync(finalPath);

      // Create DTO
      const createMediaBackupDto = {
        deviceId: sessionInfo.deviceId,
        originalName: sessionInfo.fileName,
        fileName: finalFileName,
        mimeType: sessionInfo.mimeType,
        mediaType: sessionInfo.mediaType,
        size: sessionInfo.totalSize,
        userId: sessionInfo.userId,
        originalCreatedAt: new Date(),
        originalModifiedAt: new Date()
      };

      // Process with existing service
      const result = await this.mediaBackupService.backupMedia(
        sessionInfo.userId,
        finalFileBuffer,
        createMediaBackupDto
      );

      // Clean up session directory
      fs.rmSync(sessionDir, { recursive: true, force: true });

      return {
        success: true,
        message: 'Upload completed successfully',
        data: result
      };
    } catch (error) {
      console.error('Upload completion error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Post('upload/cancel')
  @ApiOperation({ summary: 'Cancel a streaming upload' })
  async cancelStreamingUpload(
    @Body() body: { sessionId: string }
  ): Promise<any> {
    try {
      const { sessionId } = body;
      const sessionDir = path.join(this.CHUNK_DIR, sessionId);

      if (fs.existsSync(sessionDir)) {
        fs.rmSync(sessionDir, { recursive: true, force: true });
      }

      return {
        success: true,
        message: 'Upload cancelled and cleaned up'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // EXISTING ENDPOINTS (unchanged but with better error handling)
  @Get()
  @ApiOperation({ summary: 'Get user media files' })
  @ApiResponse({ status: 200, description: 'Media files retrieved successfully' })
  async getUserMedia(
    @Request() req,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('mediaType') mediaType?: MediaType,
    @Query('status') status?: MediaStatus,
    @Query('albumId') albumId?: string,
    @Query('tags') tags?: string
  ): Promise<{ media: MediaBackupResponseDto[]; total: number }> {
    try {
      const parsedLimit = limit ? parseInt(limit.toString()) : 50;
      const parsedOffset = offset ? parseInt(offset.toString()) : 0;
      const parsedTags = tags ? tags.split(',').map(tag => tag.trim()) : undefined;

      const [media, total] = await this.mediaBackupService.getUserMedia(req.user.id, {
        limit: parsedLimit,
        offset: parsedOffset,
        mediaType,
        status,
        albumId,
        tags: parsedTags
      });

      return {
        media: media.map(this.mapToResponseDto),
        total
      };
    } catch (error) {
      return {
        media: [],
        total: 0
      };
    }
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get media backup statistics' })
  async getMediaStats(@Request() req): Promise<any> {
    try {
      const stats = await this.mediaBackupService.getMediaStats(req.user.id);
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific media file details' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  async getMedia(
    @Request() req,
    @Param('id') id: string
  ): Promise<{ media: MediaBackupResponseDto }> {
    try {
      const media = await this.mediaBackupService.getMedia(id, req.user.id);
      if (!media) {
        return {
          success: false,
          error: 'Media not found'
        };
      }

      return {
        success: true,
        media: this.mapToResponseDto(media)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete media file permanently' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  async deleteMedia(
    @Request() req,
    @Param('id') id: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.mediaBackupService.deleteMedia(id, req.user.id);
      return {
        success: true,
        message: 'Media deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Helper methods
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  private mapToResponseDto(media: any): MediaBackupResponseDto {
    return {
      id: media.id,
      userId: media.userId,
      deviceId: media.deviceId,
      originalName: media.originalName,
      fileName: media.fileName,
      mimeType: media.mimeType,
      mediaType: media.mediaType,
      size: media.size,
      width: media.width,
      height: media.height,
      duration: media.duration,
      fps: media.fps,
      bitrate: media.bitrate,
      codec: media.codec,
      audioCodec: media.audioCodec,
      sampleRate: media.sampleRate,
      channels: media.channels,
      originalCreatedAt: media.originalCreatedAt,
      originalModifiedAt: media.originalModifiedAt,
      storageKey: media.storageKey,
      storageProvider: media.storageProvider,
      cdnUrl: media.cdnUrl,
      thumbnailUrl: media.thumbnailUrl,
      previewUrl: media.previewUrl,
      checksumMd5: media.checksumMd5,
      checksumSha256: media.checksumSha256,
      exifData: media.exifData,
      gpsLatitude: media.gpsLatitude,
      gpsLongitude: media.gpsLongitude,
      altitude: media.altitude,
      status: media.status,
      errorMessage: media.errorMessage,
      processingStartedAt: media.processingStartedAt,
      processingCompletedAt: media.processingCompletedAt,
      deletedFromDevice: media.deletedFromDevice,
      deletedFromDeviceAt: media.deletedFromDeviceAt,
      isPublic: media.isPublic,
      sharedWith: media.sharedWith,
      albumId: media.albumId,
      tags: media.tags,
      metadata: media.metadata,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt
    };
  }
}