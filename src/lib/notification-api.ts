import { api } from './api-client';

export interface Notification {
  id: string;
  type: 'achievement_unlocked' | 'level_up' | 'streak_milestone' | 'course_completed' | 'xp_gained' | 'system';
  title: string;
  message: string;
  icon?: string;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
  isRead: boolean;
  readAt?: string;
  isArchived: boolean;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface NotificationResponse {
  success: boolean;
  data?: Notification[];
  count?: number;
  total?: number;
  message?: string;
  error?: string;
}

export const notificationApi = {
  // Get user notifications
  async getNotifications(options?: {
    includeRead?: boolean;
    includeArchived?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<NotificationResponse> {
    const params = new URLSearchParams();
    if (options?.includeRead !== undefined) params.append('includeRead', options.includeRead.toString());
    if (options?.includeArchived !== undefined) params.append('includeArchived', options.includeArchived.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.offset !== undefined) params.append('offset', options.offset.toString());

    const response = await api.get(`/api/v1/notifications?${params.toString()}`);
    return await response.json();
  },

  // Get unread notifications
  async getUnreadNotifications(): Promise<NotificationResponse> {
    const response = await api.get('/api/v1/notifications/unread');
    return await response.json();
  },

  // Get unread count
  async getUnreadCount(): Promise<{ success: boolean; count: number; error?: string }> {
    const response = await api.get('/api/v1/notifications/count');
    return await response.json();
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<{ success: boolean; message?: string; error?: string }> {
    const response = await api.patch(`/api/v1/notifications/${notificationId}/read`, {});
    return await response.json();
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<{ success: boolean; message?: string; error?: string }> {
    const response = await api.post('/api/v1/notifications/mark-all-read', {});
    return await response.json();
  },

  // Archive notification
  async archiveNotification(notificationId: string): Promise<{ success: boolean; message?: string; error?: string }> {
    const response = await api.patch(`/api/v1/notifications/${notificationId}/archive`, {});
    return await response.json();
  },
};