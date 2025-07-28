import { Notification, NotificationType } from '../entity/notification.entity';

export interface INotificationRepository {
  save(notification: Notification): Promise<void>;
  findById(id: string): Promise<Notification | null>;
  findByUser(userId: string, options?: {
    includeRead?: boolean;
    includeArchived?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Notification[]>;
  findUnreadByUser(userId: string): Promise<Notification[]>;
  countUnreadByUser(userId: string): Promise<number>;
  update(notification: Notification): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  deleteExpired(): Promise<number>;
  findByUserAndType(userId: string, type: NotificationType): Promise<Notification[]>;
}