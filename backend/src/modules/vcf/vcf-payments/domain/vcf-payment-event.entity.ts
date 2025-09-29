import { Entity, Property, Enum, ManyToOne, Index } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { VcfSubscriptionEntity } from '../../vcf-subscriptions/domain/vcf-subscription.entity';

export enum VcfPaymentEventType {
  // Subscription events
  SUBSCRIPTION_CREATED = 'customer.subscription.created',
  SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  SUBSCRIPTION_PAUSED = 'customer.subscription.paused',
  SUBSCRIPTION_RESUMED = 'customer.subscription.resumed',
  SUBSCRIPTION_TRIAL_WILL_END = 'customer.subscription.trial_will_end',

  // Payment events
  PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  PAYMENT_FAILED = 'invoice.payment_failed',
  PAYMENT_ACTION_REQUIRED = 'invoice.payment_action_required',
  PAYMENT_REFUNDED = 'charge.refunded',
  PAYMENT_DISPUTE_CREATED = 'charge.dispute.created',

  // Invoice events
  INVOICE_CREATED = 'invoice.created',
  INVOICE_FINALIZED = 'invoice.finalized',
  INVOICE_PAID = 'invoice.paid',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  INVOICE_UPCOMING = 'invoice.upcoming',

  // Customer events
  CUSTOMER_CREATED = 'customer.created',
  CUSTOMER_UPDATED = 'customer.updated',
  CUSTOMER_DELETED = 'customer.deleted',
  CUSTOMER_SOURCE_CREATED = 'customer.source.created',
  CUSTOMER_SOURCE_DELETED = 'customer.source.deleted',
}

export enum VcfPaymentEventStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed',
  IGNORED = 'ignored',
}

@Entity({ tableName: 'vcf_payment_events' })
@Index({ properties: ['stripeEventId'], options: { unique: true } })
@Index({ properties: ['type', 'status'] })
@Index({ properties: ['user', 'createdAt'] })
export class VcfPaymentEventEntity extends BaseEntity {
  @Property()
  stripeEventId!: string;

  @Enum(() => VcfPaymentEventType)
  type!: VcfPaymentEventType;

  @Enum(() => VcfPaymentEventStatus)
  status: VcfPaymentEventStatus = VcfPaymentEventStatus.PENDING;

  @ManyToOne(() => User, { nullable: true })
  user?: User;

  @ManyToOne(() => VcfSubscriptionEntity, { nullable: true })
  subscription?: VcfSubscriptionEntity;

  @Property({ nullable: true })
  stripeCustomerId?: string;

  @Property({ nullable: true })
  stripeSubscriptionId?: string;

  @Property({ nullable: true })
  stripeInvoiceId?: string;

  @Property({ nullable: true })
  stripeChargeId?: string;

  @Property({ nullable: true })
  stripePaymentIntentId?: string;

  @Property({ nullable: true })
  stripePaymentMethodId?: string;

  @Property({ type: 'json' })
  eventData: Record<string, any> = {};

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Property({ nullable: true })
  amount?: number;

  @Property({ nullable: true })
  currency?: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ nullable: true })
  processedAt?: Date;

  @Property({ nullable: true })
  failedAt?: Date;

  @Property({ type: 'text', nullable: true })
  errorMessage?: string;

  @Property({ type: 'json', nullable: true })
  errorDetails?: Record<string, any>;

  @Property()
  retryCount: number = 0;

  @Property()
  maxRetries: number = 3;

  @Property({ nullable: true })
  nextRetryAt?: Date;

  @Property({ nullable: true })
  webhookReceivedAt?: Date;

  @Property({ nullable: true })
  idempotencyKey?: string;
}