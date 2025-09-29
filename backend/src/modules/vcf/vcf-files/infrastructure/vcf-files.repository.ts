import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfFileEntity, VcfFileStatus } from '../domain/vcf-file.entity';

@Injectable()
export class VcfFilesRepository {
  constructor(
    @InjectRepository(VcfFileEntity)
    private readonly repository: EntityRepository<VcfFileEntity>,
    private readonly em: EntityManager,
  ) {}

  create(data: Partial<VcfFileEntity>): VcfFileEntity {
    return this.repository.create(data);
  }

  async save(file: VcfFileEntity): Promise<void> {
    await this.em.persistAndFlush(file);
  }

  async findOne(id: string): Promise<VcfFileEntity | null> {
    return this.repository.findOne({ id }, { populate: ['uploader'] });
  }

  async findByEntity(entityType: string, entityId: string): Promise<VcfFileEntity[]> {
    return this.repository.find(
      {
        entityType,
        entityId,
        status: { $ne: VcfFileStatus.DELETED },
      },
      {
        populate: ['uploader'],
        orderBy: { createdAt: 'DESC' },
      }
    );
  }

  async update(file: VcfFileEntity): Promise<void> {
    await this.em.persistAndFlush(file);
  }

  async findExpired(now: Date): Promise<VcfFileEntity[]> {
    return this.repository.find(
      {
        expiresAt: { $lte: now },
        status: { $ne: VcfFileStatus.DELETED },
      },
      { populate: ['uploader'] }
    );
  }

  async findByUploader(uploaderId: string): Promise<VcfFileEntity[]> {
    return this.repository.find(
      {
        uploader: { id: uploaderId },
        status: { $ne: VcfFileStatus.DELETED },
      },
      {
        populate: ['uploader'],
        orderBy: { createdAt: 'DESC' },
      }
    );
  }

  async getStorageStats(uploaderId?: string): Promise<{
    totalFiles: number;
    totalSize: number;
    byType: Record<string, { count: number; size: number }>;
  }> {
    const query: any = { status: { $ne: VcfFileStatus.DELETED } };
    if (uploaderId) {
      query.uploader = { id: uploaderId };
    }

    const files = await this.repository.find(query);

    const stats = {
      totalFiles: files.length,
      totalSize: 0,
      byType: {} as Record<string, { count: number; size: number }>,
    };

    for (const file of files) {
      stats.totalSize += file.size;

      if (!stats.byType[file.fileType]) {
        stats.byType[file.fileType] = { count: 0, size: 0 };
      }
      stats.byType[file.fileType].count++;
      stats.byType[file.fileType].size += file.size;
    }

    return stats;
  }

  async deleteOldFiles(daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.em.nativeDelete(VcfFileEntity, {
      deletedAt: { $lt: cutoffDate },
      status: VcfFileStatus.DELETED,
    });

    return result;
  }
}