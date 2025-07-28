import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Notification, NotificationType } from '../../domain/entity/notification.entity';
import { INotificationRepository } from '../../domain/repository/notification.repository.interface';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: EntityRepository<Notification>,
  ) {}

  async save(notification: Notification): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    return this.repository.findOne(
      { id },
      { populate: ['user'] }
    );
  }

  async findByUser(
    userId: string,
    options?: {
      includeRead?: boolean;
      includeArchived?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Promise<Notification[]> {
    const where: any = { user: userId };
    
    if (!options?.includeRead) {
      where.isRead = false;
    }
    
    if (!options?.includeArchived) {
      where.isArchived = false;
    }

    // Don't show expired notifications
    where.expiresAt = { $gte: new Date() };

    return this.repository.find(where, {
      populate: ['user'],
      orderBy: { createdAt: 'desc' },
      limit: options?.limit || 50,
      offset: options?.offset || 0,
    });
  }

  async findUnreadByUser(userId: string): Promise<Notification[]> {
    return this.repository.find({
      user: userId,
      isRead: false,
      isArchived: false,
      expiresAt: { $gte: new Date() }
    }, {
      populate: ['user'],
      orderBy: { createdAt: 'desc' },
    });
  }

  async countUnreadByUser(userId: string): Promise<number> {
    return this.repository.count({
      user: userId,
      isRead: false,
      isArchived: false,
      expiresAt: { $gte: new Date() }
    });
  }

  async update(notification: Notification): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.repository.find({
      user: userId,
      isRead: false,
      isArchived: false,
    });

    notifications.forEach(notification => {
      notification.markAsRead();
    });

    await this.repository.getEntityManager().flush();
  }

  async deleteExpired(): Promise<number> {
    const expiredNotifications = await this.repository.find({
      expiresAt: { $lt: new Date() }
    });

    await this.repository.getEntityManager().removeAndFlush(expiredNotifications);
    return expiredNotifications.length;
  }

  async findByUserAndType(userId: string, type: NotificationType): Promise<Notification[]> {
    return this.repository.find({
      user: userId,
      type,
      isArchived: false,
    }, {
      populate: ['user'],
      orderBy: { createdAt: 'desc' },
    });
  }
}