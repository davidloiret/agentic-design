import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfPaymentEventEntity, VcfPaymentEventStatus } from '../domain/vcf-payment-event.entity';

@Injectable()
export class VcfPaymentsRepository {
  constructor(
    @InjectRepository(VcfPaymentEventEntity)
    private readonly repository: EntityRepository<VcfPaymentEventEntity>,
    private readonly em: EntityManager,
  ) {}

  create(data: Partial<VcfPaymentEventEntity>): VcfPaymentEventEntity {
    return this.repository.create(data);
  }

  async save(event: VcfPaymentEventEntity): Promise<void> {
    await this.em.persistAndFlush(event);
  }

  async findOne(id: string): Promise<VcfPaymentEventEntity | null> {
    return this.repository.findOne({ id }, { populate: ['user', 'subscription'] });
  }

  async findByStripeEventId(stripeEventId: string): Promise<VcfPaymentEventEntity | null> {
    return this.repository.findOne({ stripeEventId });
  }

  async update(event: VcfPaymentEventEntity): Promise<void> {
    await this.em.persistAndFlush(event);
  }

  async findPendingRetries(): Promise<VcfPaymentEventEntity[]> {
    const now = new Date();

    return this.repository.find({
      status: VcfPaymentEventStatus.FAILED,
      retryCount: { $lt: 3 },
      nextRetryAt: { $lte: now },
    }, {
      populate: ['user', 'subscription'],
    });
  }

  async findByUser(userId: string): Promise<VcfPaymentEventEntity[]> {
    return this.repository.find(
      { user: { id: userId } },
      {
        populate: ['user', 'subscription'],
        orderBy: { createdAt: 'DESC' },
        limit: 100,
      }
    );
  }

  async findBySubscription(subscriptionId: string): Promise<VcfPaymentEventEntity[]> {
    return this.repository.find(
      { subscription: { id: subscriptionId } },
      {
        populate: ['user', 'subscription'],
        orderBy: { createdAt: 'DESC' },
      }
    );
  }

  async getEventStats(startDate?: Date, endDate?: Date): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    failureRate: number;
  }> {
    const query: any = {};

    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const events = await this.repository.find(query);

    const stats = {
      total: events.length,
      byType: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      failureRate: 0,
    };

    let failedCount = 0;

    for (const event of events) {
      // Count by type
      if (!stats.byType[event.type]) {
        stats.byType[event.type] = 0;
      }
      stats.byType[event.type]++;

      // Count by status
      if (!stats.byStatus[event.status]) {
        stats.byStatus[event.status] = 0;
      }
      stats.byStatus[event.status]++;

      if (event.status === VcfPaymentEventStatus.FAILED) {
        failedCount++;
      }
    }

    stats.failureRate = stats.total > 0 ? (failedCount / stats.total) * 100 : 0;

    return stats;
  }
}