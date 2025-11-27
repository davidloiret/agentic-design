import { Injectable } from '@nestjs/common';
import { MediaBackupRepository } from '../../infrastructure/persistence/media-backup.repository';
import { MediaStorageRepository } from '../../infrastructure/adapter/out/media-storage.repository';
import { MediaMetadata, MediaBackupResult } from '../../domain/types/media.types';
import { MediaStatus } from '../../domain/enums/media-status.enum';
import { MediaBackupEntity } from '../../domain/entity/media-backup.entity';
import { CreateMediaBackupDto } from '../dto/create-media-backup.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class MediaBackupService {
  constructor(
    private readonly mediaBackupRepository: MediaBackupRepository,
    private readonly mediaStorageRepository: MediaStorageRepository
  ) {}

  async backupMedia(
    userId: string,
    mediaData: Buffer,
    dto: CreateMediaBackupDto
  ): Promise<MediaBackupResult> {
    const mediaMetadata: MediaMetadata = {
      fileName: dto.fileName,
      originalName: dto.originalName,
      mimeType: dto.mimeType,
      mediaType: dto.mediaType,
      size: dto.size,
      width: dto.width,
      height: dto.height,
      duration: dto.duration,
      fps: dto.fps,
      bitrate: dto.bitrate,
      codec: dto.codec,
      audioCodec: dto.audioCodec,
      sampleRate: dto.sampleRate,
      channels: dto.channels,
      createdAt: new Date(),
      modifiedAt: new Date(),
      originalCreatedAt: dto.originalCreatedAt,
      originalModifiedAt: dto.originalModifiedAt,
      exifData: dto.exifData,
      checksum: {
        md5: dto.checksumMd5,
        sha256: dto.checksumSha256
      }
    };

    // Check for duplicates first
    const existingMedia = await this.mediaBackupRepository.findByChecksum(
      mediaMetadata.checksum.md5,
      mediaMetadata.checksum.sha256,
      userId
    );

    if (existingMedia) {
      return {
        success: false,
        error: 'Media already exists in backup',
        mediaId: existingMedia.id
      };
    }

    try {
      // Generate a unique media ID for storage
      const mediaId = randomUUID();

      // Step 1: Save media file to storage first
      // This ensures we have the storageKey before creating the database record
      const storageResult = await this.mediaStorageRepository.saveMedia(
        userId,
        mediaId,
        mediaData,
        mediaMetadata
      );

      if (!storageResult.storageKey) {
        throw new Error('Storage operation did not return a valid storage key');
      }

      // Step 2: Create media entity with all data including storageKey
      const mediaEntity = await this.mediaBackupRepository.createMedia({
        user: userId as any,
        deviceId: dto.deviceId,
        originalName: dto.originalName,
        fileName: dto.fileName,
        mimeType: dto.mimeType,
        mediaType: dto.mediaType,
        size: dto.size,
        width: storageResult.processedMetadata?.width || dto.width,
        height: storageResult.processedMetadata?.height || dto.height,
        duration: dto.duration,
        fps: dto.fps,
        bitrate: dto.bitrate,
        codec: dto.codec,
        audioCodec: dto.audioCodec,
        sampleRate: dto.sampleRate,
        channels: dto.channels,
        originalCreatedAt: dto.originalCreatedAt,
        originalModifiedAt: dto.originalModifiedAt,
        checksumMd5: dto.checksumMd5,
        checksumSha256: dto.checksumSha256,
        exifData: dto.exifData,
        gpsLatitude: dto.gpsLatitude,
        gpsLongitude: dto.gpsLongitude,
        altitude: dto.altitude,
        status: MediaStatus.PROCESSING,
        processingStartedAt: new Date(),
        deletedFromDevice: false,
        albumId: dto.albumId,
        tags: dto.tags,
        metadata: dto.metadata,
        storageKey: storageResult.storageKey,
        thumbnailUrl: storageResult.thumbnailUrl,
        previewUrl: storageResult.previewUrl
      });

      // Step 3: Start background processing (integrity check, etc.)
      this.processMediaInBackground(mediaEntity.id, userId).catch(err => {
        console.error(`Background processing failed for media ${mediaEntity.id}:`, err);
      });

      return {
        success: true,
        mediaId: mediaEntity.id,
        storageKey: storageResult.storageKey,
        cdnUrl: storageResult.storageKey,
        thumbnailUrl: storageResult.thumbnailUrl,
        previewUrl: storageResult.previewUrl
      };

    } catch (error) {
      console.error('Media backup failed:', error);
      throw new Error(`Media backup failed: ${error.message}`);
    }
  }

  async getMedia(mediaId: string, userId: string): Promise<MediaBackupEntity | null> {
    return this.mediaBackupRepository.findById(mediaId, userId);
  }

  async getUserMedia(
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      mediaType?: any;
      status?: any;
      albumId?: string;
      tags?: string[];
    } = {}
  ): Promise<[MediaBackupEntity[], number]> {
    return this.mediaBackupRepository.findByUserId(userId, options);
  }

  async getDeviceMedia(
    userId: string,
    deviceId: string,
    options: {
      limit?: number;
      offset?: number;
      status?: any;
    } = {}
  ): Promise<[MediaBackupEntity[], number]> {
    return this.mediaBackupRepository.findByDeviceId(deviceId, userId, options);
  }

  async deleteMedia(mediaId: string, userId: string): Promise<void> {
    const media = await this.mediaBackupRepository.findById(mediaId, userId);
    if (!media) {
      throw new Error('Media not found');
    }

    // Delete from storage
    if (media.storageKey) {
      await this.mediaStorageRepository.deleteMediaFile(media.storageKey);
    }

    // Delete from database
    await this.mediaBackupRepository.delete(mediaId, userId);
  }

  async markAsDeletedFromDevice(mediaId: string, userId: string): Promise<void> {
    const media = await this.mediaBackupRepository.findById(mediaId, userId);
    if (!media) {
      throw new Error('Media not found');
    }

    await this.mediaBackupRepository.markAsDeletedFromDevice(mediaId);
  }

  async getMediaStats(userId: string): Promise<{
    totalCount: number;
    totalSize: number;
    byType: Record<any, { count: number; size: number }>;
    byStatus: Record<any, number>;
  }> {
    return this.mediaBackupRepository.getStatsByUserId(userId);
  }

  async findDuplicates(userId: string): Promise<MediaBackupEntity[]> {
    return this.mediaBackupRepository.findDuplicates(userId);
  }

  async validateMediaIntegrity(mediaId: string, userId: string): Promise<boolean> {
    const media = await this.mediaBackupRepository.findById(mediaId, userId);
    if (!media || !media.storageKey) {
      return false;
    }

    return this.mediaStorageRepository.validateMediaIntegrity(
      media.storageKey,
      {
        md5: media.checksumMd5,
        sha256: media.checksumSha256
      }
    );
  }

  private async processMediaInBackground(mediaId: string, userId: string): Promise<void> {
    // This would typically be implemented with a background job queue
    // For now, we'll process synchronously in a simple way
    try {
      const media = await this.mediaBackupRepository.findById(mediaId, userId);
      if (!media) return;

      // Validate integrity
      const isValid = await this.validateMediaIntegrity(mediaId, userId);
      if (!isValid) {
        await this.mediaBackupRepository.updateStatus(
          mediaId,
          MediaStatus.CORRUPTED,
          'Media integrity check failed'
        );
        return;
      }

      // Additional processing could go here (virus scanning, etc.)

      // Mark as completed
      await this.mediaBackupRepository.updateStatus(mediaId, MediaStatus.COMPLETED);

    } catch (error) {
      console.error('Media processing failed:', error);
      await this.mediaBackupRepository.updateStatus(
        mediaId,
        MediaStatus.FAILED,
        `Processing failed: ${error.message}`
      );
    }
  }

  async streamMedia(mediaId: string, userId: string): Promise<Buffer> {
    const media = await this.mediaBackupRepository.findById(mediaId, userId);
    if (!media) {
      throw new Error('Media not found');
    }

    return this.mediaStorageRepository.getMediaFile(media.storageKey);
  }
}