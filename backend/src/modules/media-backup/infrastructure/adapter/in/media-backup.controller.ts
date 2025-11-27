import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../../../../modules/auth/infrastructure/guard/auth.guard';
import { MediaBackupService } from '../../../application/usecase/media-backup.service';
import { MediaBackupResponseDto } from '../../../application/dto/media-backup-response.dto';
import { MediaType } from '../../../domain/enums/media-type.enum';
import { MediaStatus } from '../../../domain/enums/media-status.enum';

@ApiTags('Media Backup')
@Controller('media-backup')
@UseGuards(AuthGuard)
export class MediaBackupController {
  constructor(private readonly mediaBackupService: MediaBackupService) {}

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
  ): Promise<{ success: boolean; media: MediaBackupResponseDto[]; total: number }> {
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
        success: true,
        media: media.map(this.mapToResponseDto),
        total
      };
    } catch (error) {
      return {
        success: false,
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
  ): Promise<{ success: boolean; data?: MediaBackupResponseDto; error?: string }> {
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
        data: this.mapToResponseDto(media)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Post(':id/mark-deleted')
  @ApiOperation({ summary: 'Mark media as deleted from device' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  async markAsDeletedFromDevice(
    @Request() req,
    @Param('id') id: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      await this.mediaBackupService.markAsDeletedFromDevice(id, req.user.id);
      return {
        success: true,
        message: 'Media marked as deleted from device'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Post(':id/validate')
  @ApiOperation({ summary: 'Validate media integrity' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  async validateMediaIntegrity(
    @Request() req,
    @Param('id') id: string
  ): Promise<{ success: boolean; valid?: boolean; error?: string }> {
    try {
      const isValid = await this.mediaBackupService.validateMediaIntegrity(id, req.user.id);
      return {
        success: true,
        valid: isValid
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
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      await this.mediaBackupService.deleteMedia(id, req.user.id);
      return {
        success: true,
        message: 'Media deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  private mapToResponseDto(media: any): MediaBackupResponseDto {
    return {
      id: media.id,
      userId: media.user?.id,
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
