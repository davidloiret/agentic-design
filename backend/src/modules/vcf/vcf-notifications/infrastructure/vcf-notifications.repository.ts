import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfNotificationEntity, VcfNotificationStatus } from '../domain/vcf-notification.entity';

@Injectable()
export class VcfNotificationsRepository {
  constructor(
    @InjectRepository(VcfNotificationEntity)
    private readonly repository: EntityRepository<VcfNotificationEntity>,
    private readonly em: EntityManager,
  ) {}

  create(data: Partial<VcfNotificationEntity>): VcfNotificationEntity {
    return this.repository.create(data);
  }

  async save(notification: VcfNotificationEntity): Promise<void> {
    await this.em.persistAndFlush(notification);
  }

  async findOne(id: string): Promise<VcfNotificationEntity | null> {
    return this.repository.findOne({ id }, { populate: ['recipient'] });
  }

  async findByUser(userId: string, unreadOnly: boolean = false): Promise<VcfNotificationEntity[]> {
    const query: any = { recipient: { id: userId } };

    if (unreadOnly) {
      query.status = { $ne: VcfNotificationStatus.READ };
    }

    return this.repository.find(query, {
      populate: ['recipient'],
      orderBy: { createdAt: 'DESC' },
      limit: 100,
    });
  }

  async update(notification: VcfNotificationEntity): Promise<void> {
    await this.em.persistAndFlush(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.repository.find({
      recipient: { id: userId },
      status: { $ne: VcfNotificationStatus.READ },
    });

    for (const notification of notifications) {
      notification.status = VcfNotificationStatus.READ;
      notification.readAt = new Date();
    }

    await this.em.flush();
  }

  async findPendingRetries(): Promise<VcfNotificationEntity[]> {
    const now = new Date();

    return this.repository.find({
      status: VcfNotificationStatus.FAILED,
      retryCount: { $lt: 3 },
      nextRetryAt: { $lte: now },
    }, {
      populate: ['recipient'],
    });
  }

  async deleteOldNotifications(cutoffDate: Date): Promise<number> {
    const result = await this.em.nativeDelete(VcfNotificationEntity, {
      createdAt: { $lt: cutoffDate },
      status: VcfNotificationStatus.READ,
    });

    return result;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.repository.count({
      recipient: { id: userId },
      status: { $ne: VcfNotificationStatus.READ },
    });
  }

  async findByBatch(batchId: string): Promise<VcfNotificationEntity[]> {
    return this.repository.find(
      { batchId },
      { populate: ['recipient'], orderBy: { createdAt: 'ASC' } }
    );
  }
}