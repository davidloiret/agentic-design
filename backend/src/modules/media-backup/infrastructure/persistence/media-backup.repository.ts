import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { MediaBackupEntity } from '../../domain/entity/media-backup.entity';
import { MediaStatus } from '../../domain/enums/media-status.enum';
import { MediaType } from '../../domain/enums/media-type.enum';

@Injectable()
export class MediaBackupRepository extends EntityRepository<MediaBackupEntity> {
  constructor(private readonly em: EntityManager) {
    super(em, MediaBackupEntity);
  }

  async create(mediaData: Partial<MediaBackupEntity>): Promise<MediaBackupEntity> {
    const media = this.create(mediaData);
    await this.em.persistAndFlush(media);
    return media;
  }

  async findById(id: string, userId?: string): Promise<MediaBackupEntity | null> {
    const qb = this.createQueryBuilder('m').where({ id });

    if (userId) {
      qb.andWhere({ userId });
    }

    return qb.getSingleResult();
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

    const qb = this.createQueryBuilder('m')
      .where({ userId })
      .orderBy({ createdAt: 'DESC' })
      .limit(limit)
      .offset(offset);

    if (mediaType) {
      qb.andWhere({ mediaType });
    }

    if (status) {
      qb.andWhere({ status });
    }

    if (albumId) {
      qb.andWhere({ albumId });
    }

    if (tags && tags.length > 0) {
      qb.andWhere({ $ overlaps: { tags } });
    }

    return qb.getResultAndCount();
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

    const qb = this.createQueryBuilder('m')
      .where({ deviceId, userId })
      .orderBy({ createdAt: 'DESC' })
      .limit(limit)
      .offset(offset);

    if (status) {
      qb.andWhere({ status });
    }

    return qb.getResultAndCount();
  }

  async findByChecksum(
    checksumMd5: string,
    checksumSha256: string,
    userId?: string
  ): Promise<MediaBackupEntity | null> {
    const qb = this.createQueryBuilder('m')
      .where({ checksumMd5, checksumSha256 });

    if (userId) {
      qb.andWhere({ userId });
    }

    return qb.getSingleResult();
  }

  async updateStatus(id: string, status: MediaStatus, errorMessage?: string): Promise<void> {
    const updateData: Partial<MediaBackupEntity> = {
      status,
      updatedAt: new Date()
    };

    if (status === MediaStatus.PROCESSING) {
      updateData.processingStartedAt = new Date();
    } else if (status === MediaStatus.COMPLETED) {
      updateData.processingCompletedAt = new Date();
    }

    if (errorMessage) {
      updateData.errorMessage = errorMessage;
    }

    await this.nativeUpdate({ id }, updateData);
  }

  async updateUrls(
    id: string,
    urls: {
      cdnUrl?: string;
      thumbnailUrl?: string;
      previewUrl?: string;
    }
  ): Promise<void> {
    await this.nativeUpdate(
      { id },
      {
        ...urls,
        updatedAt: new Date()
      }
    );
  }

  async markAsDeletedFromDevice(id: string): Promise<void> {
    await this.nativeUpdate(
      { id },
      {
        deletedFromDevice: true,
        deletedFromDeviceAt: new Date(),
        updatedAt: new Date()
      }
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.nativeDelete({ id, userId });
  }

  async getStatsByUserId(userId: string): Promise<{
    totalCount: number;
    totalSize: number;
    byType: Record<MediaType, { count: number; size: number }>;
    byStatus: Record<MediaStatus, number>;
  }> {
    const qb = this.createQueryBuilder('m')
      .select([
        'COUNT(*) as totalCount',
        'SUM(m.size) as totalSize',
        'm.mediaType as mediaType',
        'm.status as status'
      ])
      .where({ userId })
      .groupBy(['m.mediaType', 'm.status']);

    const results = await qb.execute();

    const stats = {
      totalCount: 0,
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

    results.forEach(result => {
      const mediaType = result.mediaType as MediaType;
      const status = result.status as MediaStatus;
      const count = parseInt(result.totalCount);
      const size = parseInt(result.totalSize);

      stats.totalCount += count;
      stats.totalSize += size;

      if (stats.byType[mediaType]) {
        stats.byType[mediaType].count += count;
        stats.byType[mediaType].size += size;
      }

      stats.byStatus[status] = (stats.byStatus[status] || 0) + count;
    });

    return stats;
  }

  async findDuplicates(userId: string): Promise<MediaBackupEntity[]> {
    // Find media files with same checksums (potential duplicates)
    const qb = this.createQueryBuilder('m')
      .where({ userId })
      .groupBy(['m.checksumMd5', 'm.checksumSha256'])
      .having('COUNT(*) > 1');

    const duplicates = await qb.execute();
    const duplicateIds: string[] = [];

    duplicates.forEach(duplicate => {
      // Find all files with these checksums
      const duplicateQb = this.createQueryBuilder('m')
        .where({
          userId,
          checksumMd5: duplicate.checksumMd5,
          checksumSha256: duplicate.checksumSha256
        });

      duplicateIds.push(...duplicateQb.select(['m.id']).execute().map(r => r.id));
    });

    if (duplicateIds.length === 0) {
      return [];
    }

    return this.find({ id: { $in: duplicateIds } });
  }
}