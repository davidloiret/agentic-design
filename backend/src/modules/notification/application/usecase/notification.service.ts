import { Injectable } from '@nestjs/common';
import { Notification, NotificationType, NotificationPriority } from '../../domain/entity/notification.entity';
import { NotificationRepository } from '../../infrastructure/persistence/notification.repository';
import { User } from '../../../user/domain/entity/user.entity';

export interface CreateNotificationDto {
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  actionUrl?: string;
  actionText?: string;
  priority?: NotificationPriority;
  metadata?: Record<string, any>;
  expiresAt?: Date;
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotification(
    user: User,
    dto: CreateNotificationDto
  ): Promise<Notification> {
    const notification = new Notification(
      user,
      dto.type,
      dto.title,
      dto.message,
      {
        icon: dto.icon,
        actionUrl: dto.actionUrl,
        actionText: dto.actionText,
        priority: dto.priority,
        metadata: dto.metadata,
        expiresAt: dto.expiresAt,
      }
    );

    await this.notificationRepository.save(notification);
    console.log(`[NotificationService] Created notification for user ${user.id}: ${dto.title}`);
    
    return notification;
  }

  async createAchievementNotification(
    user: User,
    achievementTitle: string,
    achievementDescription: string,
    xpReward: number,
    achievementIcon?: string,
    metadata?: Record<string, any>
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.ACHIEVEMENT_UNLOCKED,
      title: `Achievement Unlocked: ${achievementTitle}`,
      message: `${achievementDescription} (+${xpReward} XP)`,
      icon: achievementIcon || '🏆',
      actionUrl: '/learning-hub?view=achievements',
      actionText: 'View Achievements',
      priority: NotificationPriority.HIGH,
      metadata: {
        xpReward,
        achievementTitle,
        ...metadata,
      },
    });
  }

  async createLevelUpNotification(
    user: User,
    newLevel: number,
    previousLevel: number,
    totalXp: number
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.LEVEL_UP,
      title: `Level Up! You're now Level ${newLevel}`,
      message: `Congratulations! You've advanced from Level ${previousLevel} to Level ${newLevel} with ${totalXp} total XP!`,
      icon: '🌟',
      actionUrl: '/learning-hub?view=dashboard',
      actionText: 'View Progress',
      priority: NotificationPriority.HIGH,
      metadata: {
        newLevel,
        previousLevel,
        totalXp,
      },
    });
  }

  async createStreakNotification(
    user: User,
    streakDays: number,
    isNewRecord: boolean = false
  ): Promise<Notification> {
    const title = isNewRecord 
      ? `New Record! ${streakDays} Day Streak!`
      : `${streakDays} Day Learning Streak!`;
    
    const message = isNewRecord
      ? `Amazing! You've set a new personal record with a ${streakDays}-day learning streak!`
      : `Great consistency! You've maintained your learning streak for ${streakDays} days in a row!`;

    return this.createNotification(user, {
      type: NotificationType.STREAK_MILESTONE,
      title,
      message,
      icon: '🔥',
      actionUrl: '/learning-hub?view=dashboard',
      actionText: 'View Streak',
      priority: NotificationPriority.MEDIUM,
      metadata: {
        streakDays,
        isNewRecord,
      },
    });
  }

  async createCourseCompletionNotification(
    user: User,
    courseName: string,
    courseId: string,
    xpEarned: number
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.COURSE_COMPLETED,
      title: `Course Completed: ${courseName}`,
      message: `Congratulations! You've successfully completed the ${courseName} course and earned ${xpEarned} XP!`,
      icon: '🎓',
      actionUrl: `/learning-hub?course=${courseId}`,
      actionText: 'View Course',
      priority: NotificationPriority.HIGH,
      metadata: {
        courseName,
        courseId,
        xpEarned,
      },
    });
  }

  async createXpGainedNotification(
    user: User,
    xpAmount: number,
    source: string,
    totalXp: number
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.XP_GAINED,
      title: `+${xpAmount} XP Earned!`,
      message: `You earned ${xpAmount} XP from ${source}. Total XP: ${totalXp}`,
      icon: '⚡',
      priority: NotificationPriority.LOW,
      metadata: {
        xpAmount,
        source,
        totalXp,
      },
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
  }

  async getUserNotifications(
    userId: string,
    options?: {
      includeRead?: boolean;
      includeArchived?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Promise<Notification[]> {
    return this.notificationRepository.findByUser(userId, options);
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepository.findUnreadByUser(userId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.countUnreadByUser(userId);
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (notification) {
      notification.markAsRead();
      await this.notificationRepository.update(notification);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async archiveNotification(notificationId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (notification) {
      notification.archive();
      await this.notificationRepository.update(notification);
    }
  }

  async cleanupExpiredNotifications(): Promise<number> {
    return this.notificationRepository.deleteExpired();
  }

  // Workshop-specific notifications
  async createWorkshopAnnouncementNotification(
    instructor: User,
    workshop: any
  ): Promise<void> {
    // In a real system, you'd notify followers/subscribers
    console.log(`[NotificationService] Workshop ${workshop.title} announced by ${instructor.name}`);
  }

  async createWorkshopUpdateNotification(
    user: User,
    workshop: any,
    message: string
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.SYSTEM,
      title: 'Workshop Updated',
      message: `${workshop.title}: ${message}`,
      icon: '📚',
      priority: NotificationPriority.MEDIUM,
      actionUrl: `/workshops/${workshop.id}`,
      actionText: 'View Workshop',
    });
  }

  async createEnrollmentNotification(
    user: User,
    workshop: any,
    message: string
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.SUCCESS,
      title: 'Workshop Enrollment',
      message: `${workshop.title}: ${message}`,
      icon: '🎓',
      priority: NotificationPriority.HIGH,
      actionUrl: `/workshops/${workshop.id}`,
      actionText: 'View Workshop',
    });
  }

  async createSessionStartNotification(
    user: User,
    session: any
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.INFO,
      title: 'Session Started',
      message: `${session.title} is now live!`,
      icon: '🎥',
      priority: NotificationPriority.HIGH,
      actionUrl: `/workshops/${session.workshop.id}/session/${session.id}`,
      actionText: 'Join Session',
    });
  }

  async createActivityStartNotification(
    user: User,
    activity: any
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.INFO,
      title: 'Activity Started',
      message: `${activity.title} - ${activity.points} points available`,
      icon: '⚡',
      priority: NotificationPriority.HIGH,
      actionUrl: `/workshops/${activity.session.workshop.id}/session/${activity.session.id}`,
      actionText: 'Participate',
    });
  }

  async createWorkshopCompletionNotification(
    user: User,
    workshop: any,
    enrollment: any
  ): Promise<Notification> {
    return this.createNotification(user, {
      type: NotificationType.SUCCESS,
      title: 'Workshop Completed! 🏆',
      message: `Congratulations! You've completed ${workshop.title}`,
      icon: '🎉',
      priority: NotificationPriority.HIGH,
      actionUrl: enrollment.certificateUrl,
      actionText: 'View Certificate',
      metadata: {
        workshopId: workshop.id,
        finalScore: enrollment.overallScore,
        rank: enrollment.progress.rank,
      },
    });
  }
}