import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfSubscriptionEntity, VcfSubscriptionStatus } from '../domain/vcf-subscription.entity';

@Injectable()
export class VcfSubscriptionsRepository {
  constructor(
    @InjectRepository(VcfSubscriptionEntity)
    private readonly repository: EntityRepository<VcfSubscriptionEntity>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<VcfSubscriptionEntity>): Promise<VcfSubscriptionEntity> {
    const subscription = this.repository.create(data);
    await this.em.persistAndFlush(subscription);
    return subscription;
  }

  async findOne(id: string): Promise<VcfSubscriptionEntity | null> {
    return this.repository.findOne({ id });
  }

  async findOneByUser(userId: string): Promise<VcfSubscriptionEntity | null> {
    return this.repository.findOne({ user: { id: userId } }, { populate: ['user'] });
  }

  async findByStripeId(stripeSubscriptionId: string): Promise<VcfSubscriptionEntity | null> {
    return this.repository.findOne({ stripeSubscriptionId }, { populate: ['user'] });
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<VcfSubscriptionEntity | null> {
    return this.repository.findOne({ stripeCustomerId }, { populate: ['user'] });
  }

  async findActiveSubscriptions(): Promise<VcfSubscriptionEntity[]> {
    return this.repository.find({ status: VcfSubscriptionStatus.ACTIVE }, { populate: ['user'] });
  }

  async update(subscription: VcfSubscriptionEntity): Promise<void> {
    await this.em.persistAndFlush(subscription);
  }

  async resetAllMonthlyUsage(): Promise<void> {
    const subscriptions = await this.findActiveSubscriptions();

    for (const subscription of subscriptions) {
      subscription.usage.questionsThisMonth = 0;
      subscription.usage.codeFixesThisMonth = 0;
    }

    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const subscription = await this.findOne(id);
    if (subscription) {
      await this.em.removeAndFlush(subscription);
    }
  }
}