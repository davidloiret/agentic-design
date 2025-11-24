import { Injectable } from '@nestjs/common';
import { EntityManager, Reference } from '@mikro-orm/core';
import { MediaBackupEntity } from '../../domain/entity/media-backup.entity';
import { MediaStatus } from '../../domain/enums/media-status.enum';
import { MediaType } from '../../domain/enums/media-type.enum';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class MediaBackupRepository {
  constructor(private readonly em: EntityManager) {}

  async createMedia(mediaData: Partial<MediaBackupEntity>): Promise<MediaBackupEntity> {
    const media = this.em.create(MediaBackupEntity, mediaData);
    await this.em.persistAndFlush(media);
    return media;
  }

  async findById(id: string, userId?: string): Promise<MediaBackupEntity | null> {
    const where: any = { id };
    if (userId) {
      where.user = { id: userId };
    }

    return this.em.findOne(MediaBackupEntity, where);
  }

  async findByUserId(
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      mediaType?: MediaType;
      status?: MediaStatus;
      albumId?: string;
      tags?: string[];
    } = {}
  ): Promise<[MediaBackupEntity[], number]> {
    const {
      limit = 50,
      offset = 0,
      mediaType,
      status,
      albumId,
      tags
    } = options;

    const where: any = { user: { id: userId } };

    if (mediaType) {
      where.mediaType = mediaType;
    }

    if (status) {
      where.status = status;
    }

    if (albumId) {
      where.albumId = albumId;
    }

    if (tags && tags.length > 0) {
      where.tags = { $contains: tags };
    }

    const [media, total] = await this.em.findAndCount(
      MediaBackupEntity,
      where,
      {
        orderBy: { createdAt: 'DESC' },
        limit,
        offset
      }
    );

    return [media, total];
  }

  async findByDeviceId(
    deviceId: string,
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      status?: MediaStatus;
    } = {}
  ): Promise<[MediaBackupEntity[], number]> {
    const { limit = 50, offset = 0, status } = options;

    const where: any = { deviceId, user: { id: userId } };

    if (status) {
      where.status = status;
    }

    return this.em.findAndCount(
      MediaBackupEntity,
      where,
      {
        orderBy: { createdAt: 'DESC' },
        limit,
        offset
      }
    );
  }

  async findByChecksum(
    checksumMd5: string,
    checksumSha256: string,
    userId?: string
  ): Promise<MediaBackupEntity | null> {
    const where: any = { checksumMd5, checksumSha256 };

    if (userId) {
      where.user = { id: userId };
    }

    return this.em.findOne(MediaBackupEntity, where);
  }

  async updateStatus(id: string, status: MediaStatus, errorMessage?: string): Promise<void> {
    const updateData: Partial<MediaBackupEntity> = {
      status
    };

    if (status === MediaStatus.PROCESSING) {
      updateData.processingStartedAt = new Date();
    } else if (status === MediaStatus.COMPLETED) {
      updateData.processingCompletedAt = new Date();
    }

    if (errorMessage) {
      updateData.errorMessage = errorMessage;
    }

    await this.em.nativeUpdate(MediaBackupEntity, { id }, updateData);
  }

  async updateUrls(
    id: string,
    urls: {
      cdnUrl?: string;
      thumbnailUrl?: string;
      previewUrl?: string;
    }
  ): Promise<void> {
    await this.em.nativeUpdate(
      MediaBackupEntity,
      { id },
      urls
    );
  }

  async markAsDeletedFromDevice(id: string): Promise<void> {
    await this.em.nativeUpdate(
      MediaBackupEntity,
      { id },
      {
        deletedFromDevice: true,
        deletedFromDeviceAt: new Date()
      }
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.em.nativeDelete(MediaBackupEntity, { id, user: { id: userId } });
  }

  async getStatsByUserId(userId: string): Promise<{
    totalCount: number;
    totalSize: number;
    byType: Record<MediaType, { count: number; size: number }>;
    byStatus: Record<MediaStatus, number>;
  }> {
    // For now, return basic stats using find
    const media = await this.em.find(MediaBackupEntity, { user: { id: userId } });

    const stats = {
      totalCount: media.length,
      totalSize: 0,
      byType: {} as Record<MediaType, { count: number; size: number }>,
      byStatus: {} as Record<MediaStatus, number>
    };

    for (const mediaType of Object.values(MediaType)) {
      stats.byType[mediaType] = { count: 0, size: 0 };
    }

    for (const status of Object.values(MediaStatus)) {
      stats.byStatus[status] = 0;
    }

    media.forEach(item => {
      stats.totalSize += item.size;
      stats.byType[item.mediaType].count++;
      stats.byType[item.mediaType].size += item.size;
      stats.byStatus[item.status]++;
    });

    return stats;
  }

  async findDuplicates(userId: string): Promise<MediaBackupEntity[]> {
    // Simple implementation - find all media for the user and check for duplicates
    const media = await this.em.find(MediaBackupEntity, { user: { id: userId } });
    const checksumMap = new Map<string, MediaBackupEntity[]>();

    // Group by checksum
    media.forEach(item => {
      const key = `${item.checksumMd5}-${item.checksumSha256}`;
      if (!checksumMap.has(key)) {
        checksumMap.set(key, []);
      }
      checksumMap.get(key)!.push(item);
    });

    // Return only groups with more than 1 item
    const duplicates: MediaBackupEntity[] = [];
    checksumMap.forEach(items => {
      if (items.length > 1) {
        duplicates.push(...items);
      }
    });

    return duplicates;
  }
}