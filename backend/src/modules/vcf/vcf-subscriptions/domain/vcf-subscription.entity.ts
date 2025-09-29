import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfSubscriptionTier {
  BASIC = 'basic',
  PRO = 'pro',
  VIP = 'vip',
  STARTUP = 'startup',
  SCALEUP = 'scaleup',
  ENTERPRISE = 'enterprise',
}

export enum VcfSubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  TRIAL = 'trial',
  PAST_DUE = 'past_due',
}

@Entity({ tableName: 'vcf_subscriptions' })
export class VcfSubscriptionEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Enum(() => VcfSubscriptionTier)
  tier!: VcfSubscriptionTier;

  @Enum(() => VcfSubscriptionStatus)
  status: VcfSubscriptionStatus = VcfSubscriptionStatus.TRIAL;

  @Property()
  stripeCustomerId?: string;

  @Property()
  stripeSubscriptionId?: string;

  @Property()
  pricePerMonth!: number;

  @Property()
  currentPeriodStart!: Date;

  @Property()
  currentPeriodEnd!: Date;

  @Property()
  cancelledAt?: Date;

  @Property({ type: 'json' })
  features: {
    questionsPerMonth?: number;
    codeFixesPerMonth?: number;
    responseTimeHours: number;
    hasScreenSharing: boolean;
    hasPhoneSupport: boolean;
    hasOfficeHours: boolean;
    teamSeats?: number;
  } = {
    responseTimeHours: 24,
    hasScreenSharing: false,
    hasPhoneSupport: false,
    hasOfficeHours: false,
  };

  @Property({ type: 'json' })
  usage: {
    questionsThisMonth: number;
    codeFixesThisMonth: number;
    lastQuestionAt?: Date;
    lastCodeFixAt?: Date;
  } = {
    questionsThisMonth: 0,
    codeFixesThisMonth: 0,
  };
}