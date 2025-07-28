import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '@/modules/user/domain/entity/user.entity';

export enum NotificationType {
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  LEVEL_UP = 'level_up',
  STREAK_MILESTONE = 'streak_milestone',
  COURSE_COMPLETED = 'course_completed',
  XP_GAINED = 'xp_gained',
  SYSTEM = 'system',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity({ tableName: 'notifications' })
export class Notification extends BaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Enum(() => NotificationType)
  type!: NotificationType;

  @Property()
  title!: string;

  @Property()
  message!: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ nullable: true })
  actionUrl?: string;

  @Property({ nullable: true })
  actionText?: string;

  @Enum(() => NotificationPriority)
  priority: NotificationPriority = NotificationPriority.MEDIUM;

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Property({ default: false })
  isRead: boolean = false;

  @Property({ nullable: true })
  readAt?: Date;

  @Property({ default: false })
  isArchived: boolean = false;

  @Property({ nullable: true })
  archivedAt?: Date;

  @Property()
  expiresAt?: Date;

  constructor(
    user: User,
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      icon?: string;
      actionUrl?: string;
      actionText?: string;
      priority?: NotificationPriority;
      metadata?: Record<string, any>;
      expiresAt?: Date;
    }
  ) {
    super();
    this.user = user;
    this.type = type;
    this.title = title;
    this.message = message;
    
    if (options) {
      this.icon = options.icon;
      this.actionUrl = options.actionUrl;
      this.actionText = options.actionText;
      this.priority = options.priority || NotificationPriority.MEDIUM;
      this.metadata = options.metadata;
      this.expiresAt = options.expiresAt || this.getDefaultExpiry();
    } else {
      this.expiresAt = this.getDefaultExpiry();
    }
  }

  private getDefaultExpiry(): Date {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30); // 30 days default expiry
    return expiry;
  }

  markAsRead(): void {
    if (!this.isRead) {
      this.isRead = true;
      this.readAt = new Date();
    }
  }

  markAsUnread(): void {
    this.isRead = false;
    this.readAt = undefined;
  }

  archive(): void {
    if (!this.isArchived) {
      this.isArchived = true;
      this.archivedAt = new Date();
    }
  }

  unarchive(): void {
    this.isArchived = false;
    this.archivedAt = undefined;
  }

  isExpired(): boolean {
    return this.expiresAt ? new Date() > this.expiresAt : false;
  }
}