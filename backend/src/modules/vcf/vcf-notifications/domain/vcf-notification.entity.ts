import { Entity, Property, Enum, ManyToOne, Index } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfNotificationType {
  // Hotline notifications
  HOTLINE_NEW_SESSION = 'hotline_new_session',
  HOTLINE_EXPERT_ASSIGNED = 'hotline_expert_assigned',
  HOTLINE_NEW_MESSAGE = 'hotline_new_message',
  HOTLINE_SESSION_RESOLVED = 'hotline_session_resolved',

  // Help request notifications
  HELP_REQUEST_NEW = 'help_request_new',
  HELP_REQUEST_CLAIMED = 'help_request_claimed',
  HELP_REQUEST_SOLUTION_SUBMITTED = 'help_request_solution_submitted',
  HELP_REQUEST_SOLUTION_ACCEPTED = 'help_request_solution_accepted',
  HELP_REQUEST_SOLUTION_REJECTED = 'help_request_solution_rejected',

  // Panic button notifications
  PANIC_ALERT_TRIGGERED = 'panic_alert_triggered',
  PANIC_ALERT_ACKNOWLEDGED = 'panic_alert_acknowledged',
  PANIC_ALERT_RESOLVED = 'panic_alert_resolved',

  // Office hours notifications
  OFFICE_HOURS_SCHEDULED = 'office_hours_scheduled',
  OFFICE_HOURS_REMINDER = 'office_hours_reminder',
  OFFICE_HOURS_STARTED = 'office_hours_started',
  OFFICE_HOURS_CANCELLED = 'office_hours_cancelled',

  // Subscription notifications
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_RENEWED = 'subscription_renewed',
  SUBSCRIPTION_CANCELLED = 'subscription_cancelled',
  SUBSCRIPTION_EXPIRED = 'subscription_expired',
  SUBSCRIPTION_PAYMENT_FAILED = 'subscription_payment_failed',
  SUBSCRIPTION_USAGE_LIMIT_WARNING = 'subscription_usage_limit_warning',
  SUBSCRIPTION_USAGE_LIMIT_REACHED = 'subscription_usage_limit_reached',

  // Expert notifications
  EXPERT_APPLICATION_APPROVED = 'expert_application_approved',
  EXPERT_APPLICATION_REJECTED = 'expert_application_rejected',
  EXPERT_NEW_ASSIGNMENT = 'expert_new_assignment',
}

export enum VcfNotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  IN_APP = 'in_app',
  PUSH = 'push',
  WEBHOOK = 'webhook',
  SLACK = 'slack',
  DISCORD = 'discord',
}

export enum VcfNotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
  BOUNCED = 'bounced',
}

export enum VcfNotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity({ tableName: 'vcf_notifications' })
@Index({ properties: ['recipient', 'status', 'createdAt'] })
@Index({ properties: ['type', 'status'] })
export class VcfNotificationEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  recipient!: User;

  @Enum(() => VcfNotificationType)
  type!: VcfNotificationType;

  @Enum(() => VcfNotificationChannel)
  channel!: VcfNotificationChannel;

  @Enum(() => VcfNotificationStatus)
  status: VcfNotificationStatus = VcfNotificationStatus.PENDING;

  @Enum(() => VcfNotificationPriority)
  priority: VcfNotificationPriority = VcfNotificationPriority.NORMAL;

  @Property()
  subject!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'text', nullable: true })
  htmlContent?: string;

  @Property({ type: 'json' })
  metadata: Record<string, any> = {};

  @Property({ type: 'json', nullable: true })
  templateData?: Record<string, any>;

  @Property()
  templateId?: string;

  @Property({ nullable: true })
  recipientEmail?: string;

  @Property({ nullable: true })
  recipientPhone?: string;

  @Property({ nullable: true })
  recipientSlackId?: string;

  @Property({ nullable: true })
  recipientDiscordId?: string;

  @Property({ nullable: true })
  webhookUrl?: string;

  @Property({ nullable: true })
  sentAt?: Date;

  @Property({ nullable: true })
  deliveredAt?: Date;

  @Property({ nullable: true })
  readAt?: Date;

  @Property({ nullable: true })
  failedAt?: Date;

  @Property({ type: 'text', nullable: true })
  errorMessage?: string;

  @Property()
  retryCount: number = 0;

  @Property()
  maxRetries: number = 3;

  @Property({ nullable: true })
  nextRetryAt?: Date;

  @Property({ type: 'json', nullable: true })
  deliveryResponse?: Record<string, any>;

  @Property()
  expiresAt?: Date;

  @Property({ nullable: true })
  batchId?: string;

  @Property({ nullable: true })
  relatedEntityType?: string;

  @Property({ nullable: true })
  relatedEntityId?: string;
}