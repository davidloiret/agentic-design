import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { VcfSubscriptionsRepository } from '../infrastructure/vcf-subscriptions.repository';
import { VcfSubscriptionEntity, VcfSubscriptionTier, VcfSubscriptionStatus } from '../domain/vcf-subscription.entity';
import { User } from '../../../user/domain/entity/user.entity';

@Injectable()
export class VcfSubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: VcfSubscriptionsRepository,
  ) {}

  async createSubscription(
    user: User,
    tier: VcfSubscriptionTier,
    stripeCustomerId?: string,
  ): Promise<VcfSubscriptionEntity> {
    // Check if user already has an active subscription
    const existingSubscription = await this.subscriptionsRepository.findOneByUser(user.id);
    if (existingSubscription && existingSubscription.status === VcfSubscriptionStatus.ACTIVE) {
      throw new BadRequestException('User already has an active subscription');
    }

    const priceMap = {
      [VcfSubscriptionTier.BASIC]: 197,
      [VcfSubscriptionTier.PRO]: 597,
      [VcfSubscriptionTier.VIP]: 1497,
      [VcfSubscriptionTier.STARTUP]: 1997,
      [VcfSubscriptionTier.SCALEUP]: 4997,
      [VcfSubscriptionTier.ENTERPRISE]: 9997,
    };

    const featuresMap = {
      [VcfSubscriptionTier.BASIC]: {
        questionsPerMonth: undefined, // unlimited
        codeFixesPerMonth: 1,
        responseTimeHours: 24,
        hasScreenSharing: false,
        hasPhoneSupport: false,
        hasOfficeHours: false,
      },
      [VcfSubscriptionTier.PRO]: {
        questionsPerMonth: undefined,
        codeFixesPerMonth: undefined, // 2 hours included
        responseTimeHours: 8,
        hasScreenSharing: true,
        hasPhoneSupport: false,
        hasOfficeHours: true,
      },
      [VcfSubscriptionTier.VIP]: {
        questionsPerMonth: undefined,
        codeFixesPerMonth: undefined,
        responseTimeHours: 4,
        hasScreenSharing: true,
        hasPhoneSupport: true,
        hasOfficeHours: true,
      },
      [VcfSubscriptionTier.STARTUP]: {
        questionsPerMonth: undefined,
        codeFixesPerMonth: undefined,
        responseTimeHours: 2,
        hasScreenSharing: true,
        hasPhoneSupport: true,
        hasOfficeHours: true,
        teamSeats: 5,
      },
      [VcfSubscriptionTier.SCALEUP]: {
        questionsPerMonth: undefined,
        codeFixesPerMonth: undefined,
        responseTimeHours: 1,
        hasScreenSharing: true,
        hasPhoneSupport: true,
        hasOfficeHours: true,
        teamSeats: 15,
      },
      [VcfSubscriptionTier.ENTERPRISE]: {
        questionsPerMonth: undefined,
        codeFixesPerMonth: undefined,
        responseTimeHours: 0.5,
        hasScreenSharing: true,
        hasPhoneSupport: true,
        hasOfficeHours: true,
        teamSeats: undefined, // unlimited
      },
    };

    const subscription = await this.subscriptionsRepository.create({
      user,
      tier,
      status: VcfSubscriptionStatus.TRIAL,
      pricePerMonth: priceMap[tier],
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      features: featuresMap[tier],
      stripeCustomerId,
    });

    return subscription;
  }

  async getSubscriptionByUserId(userId: string): Promise<VcfSubscriptionEntity> {
    const subscription = await this.subscriptionsRepository.findOneByUser(userId);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async updateSubscriptionStatus(
    subscriptionId: string,
    status: VcfSubscriptionStatus,
  ): Promise<VcfSubscriptionEntity> {
    const subscription = await this.subscriptionsRepository.findOne(subscriptionId);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    subscription.status = status;
    if (status === VcfSubscriptionStatus.CANCELLED) {
      subscription.cancelledAt = new Date();
    }

    await this.subscriptionsRepository.update(subscription);
    return subscription;
  }

  async recordUsage(
    userId: string,
    type: 'question' | 'codeFix',
  ): Promise<void> {
    const subscription = await this.getSubscriptionByUserId(userId);

    if (type === 'question') {
      subscription.usage.questionsThisMonth++;
      subscription.usage.lastQuestionAt = new Date();
    } else {
      subscription.usage.codeFixesThisMonth++;
      subscription.usage.lastCodeFixAt = new Date();
    }

    await this.subscriptionsRepository.update(subscription);
  }

  async checkUsageLimits(userId: string): Promise<boolean> {
    const subscription = await this.getSubscriptionByUserId(userId);

    // Check if subscription is active
    if (subscription.status !== VcfSubscriptionStatus.ACTIVE &&
        subscription.status !== VcfSubscriptionStatus.TRIAL) {
      return false;
    }

    // Check code fixes limit for Basic tier
    if (subscription.tier === VcfSubscriptionTier.BASIC &&
        subscription.features.codeFixesPerMonth &&
        subscription.usage.codeFixesThisMonth >= subscription.features.codeFixesPerMonth) {
      return false;
    }

    return true;
  }

  async resetMonthlyUsage(): Promise<void> {
    await this.subscriptionsRepository.resetAllMonthlyUsage();
  }
}