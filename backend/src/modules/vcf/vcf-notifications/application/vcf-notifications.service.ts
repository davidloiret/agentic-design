import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VcfNotificationsRepository } from '../infrastructure/vcf-notifications.repository';
import {
  VcfNotificationEntity,
  VcfNotificationType,
  VcfNotificationChannel,
  VcfNotificationStatus,
  VcfNotificationPriority
} from '../domain/vcf-notification.entity';
import { User } from '../../../user/domain/entity/user.entity';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

interface NotificationPayload {
  type: VcfNotificationType;
  subject: string;
  content: string;
  htmlContent?: string;
  metadata?: Record<string, any>;
  templateId?: string;
  templateData?: Record<string, any>;
  priority?: VcfNotificationPriority;
  relatedEntityType?: string;
  relatedEntityId?: string;
}

interface SendOptions {
  channels?: VcfNotificationChannel[];
  priority?: VcfNotificationPriority;
  scheduleFor?: Date;
  batchId?: string;
}

@Injectable()
export class VcfNotificationsService {
  private readonly logger = new Logger(VcfNotificationsService.name);
  private emailTransporter: Transporter;

  constructor(
    private readonly notificationsRepository: VcfNotificationsRepository,
    private readonly configService: ConfigService,
  ) {
    this.initializeEmailTransporter();
  }

  private initializeEmailTransporter() {
    const emailConfig = {
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    };

    this.emailTransporter = nodemailer.createTransport(emailConfig);
  }

  async sendNotification(
    recipient: User,
    payload: NotificationPayload,
    options: SendOptions = {}
  ): Promise<VcfNotificationEntity[]> {
    const channels = options.channels || this.getDefaultChannels(payload.type);
    const notifications: VcfNotificationEntity[] = [];

    for (const channel of channels) {
      const notification = await this.createNotification(
        recipient,
        channel,
        payload,
        options
      );
      notifications.push(notification);

      // Process immediately if not scheduled
      if (!options.scheduleFor || options.scheduleFor <= new Date()) {
        await this.processNotification(notification);
      }
    }

    return notifications;
  }

  private async createNotification(
    recipient: User,
    channel: VcfNotificationChannel,
    payload: NotificationPayload,
    options: SendOptions
  ): Promise<VcfNotificationEntity> {
    const notification = this.notificationsRepository.create({
      recipient,
      type: payload.type,
      channel,
      subject: payload.subject,
      content: payload.content,
      htmlContent: payload.htmlContent,
      metadata: payload.metadata || {},
      templateId: payload.templateId,
      templateData: payload.templateData,
      priority: options.priority || payload.priority || VcfNotificationPriority.NORMAL,
      batchId: options.batchId,
      relatedEntityType: payload.relatedEntityType,
      relatedEntityId: payload.relatedEntityId,
      recipientEmail: recipient.email,
      status: VcfNotificationStatus.PENDING,
    });

    await this.notificationsRepository.save(notification);
    return notification;
  }

  private async processNotification(notification: VcfNotificationEntity): Promise<void> {
    try {
      switch (notification.channel) {
        case VcfNotificationChannel.EMAIL:
          await this.sendEmail(notification);
          break;
        case VcfNotificationChannel.SMS:
          await this.sendSMS(notification);
          break;
        case VcfNotificationChannel.IN_APP:
          await this.sendInApp(notification);
          break;
        case VcfNotificationChannel.PUSH:
          await this.sendPush(notification);
          break;
        case VcfNotificationChannel.WEBHOOK:
          await this.sendWebhook(notification);
          break;
        case VcfNotificationChannel.SLACK:
          await this.sendSlack(notification);
          break;
        case VcfNotificationChannel.DISCORD:
          await this.sendDiscord(notification);
          break;
      }
    } catch (error) {
      await this.handleNotificationError(notification, error);
    }
  }

  private async sendEmail(notification: VcfNotificationEntity): Promise<void> {
    if (!notification.recipientEmail) {
      throw new Error('Recipient email not provided');
    }

    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'noreply@vibecodefix.com'),
      to: notification.recipientEmail,
      subject: notification.subject,
      text: notification.content,
      html: notification.htmlContent || notification.content,
    };

    const result = await this.emailTransporter.sendMail(mailOptions);

    notification.status = VcfNotificationStatus.SENT;
    notification.sentAt = new Date();
    notification.deliveryResponse = { messageId: result.messageId };

    await this.notificationsRepository.update(notification);
    this.logger.log(`Email sent to ${notification.recipientEmail} - ${notification.subject}`);
  }

  private async sendSMS(notification: VcfNotificationEntity): Promise<void> {
    // Twilio integration would go here
    this.logger.warn('SMS notifications not yet implemented');
    notification.status = VcfNotificationStatus.FAILED;
    notification.errorMessage = 'SMS provider not configured';
    await this.notificationsRepository.update(notification);
  }

  private async sendInApp(notification: VcfNotificationEntity): Promise<void> {
    // In-app notifications are stored and retrieved via API
    notification.status = VcfNotificationStatus.DELIVERED;
    notification.deliveredAt = new Date();
    await this.notificationsRepository.update(notification);
    this.logger.log(`In-app notification created for user ${notification.recipient.id}`);
  }

  private async sendPush(notification: VcfNotificationEntity): Promise<void> {
    // Firebase/OneSignal integration would go here
    this.logger.warn('Push notifications not yet implemented');
    notification.status = VcfNotificationStatus.FAILED;
    notification.errorMessage = 'Push provider not configured';
    await this.notificationsRepository.update(notification);
  }

  private async sendWebhook(notification: VcfNotificationEntity): Promise<void> {
    if (!notification.webhookUrl) {
      throw new Error('Webhook URL not provided');
    }

    const response = await fetch(notification.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: notification.type,
        subject: notification.subject,
        content: notification.content,
        metadata: notification.metadata,
      }),
    });

    if (response.ok) {
      notification.status = VcfNotificationStatus.DELIVERED;
      notification.deliveredAt = new Date();
    } else {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
    }

    await this.notificationsRepository.update(notification);
  }

  private async sendSlack(notification: VcfNotificationEntity): Promise<void> {
    // Slack API integration would go here
    this.logger.warn('Slack notifications not yet implemented');
    notification.status = VcfNotificationStatus.FAILED;
    notification.errorMessage = 'Slack integration not configured';
    await this.notificationsRepository.update(notification);
  }

  private async sendDiscord(notification: VcfNotificationEntity): Promise<void> {
    // Discord API integration would go here
    this.logger.warn('Discord notifications not yet implemented');
    notification.status = VcfNotificationStatus.FAILED;
    notification.errorMessage = 'Discord integration not configured';
    await this.notificationsRepository.update(notification);
  }

  private async handleNotificationError(
    notification: VcfNotificationEntity,
    error: any
  ): Promise<void> {
    notification.status = VcfNotificationStatus.FAILED;
    notification.errorMessage = error.message || 'Unknown error';
    notification.failedAt = new Date();
    notification.retryCount++;

    if (notification.retryCount < notification.maxRetries) {
      notification.nextRetryAt = new Date(Date.now() + Math.pow(2, notification.retryCount) * 60000);
      this.logger.warn(
        `Notification ${notification.id} failed, will retry at ${notification.nextRetryAt}`
      );
    } else {
      this.logger.error(`Notification ${notification.id} failed after ${notification.maxRetries} retries`);
    }

    await this.notificationsRepository.update(notification);
  }

  private getDefaultChannels(type: VcfNotificationType): VcfNotificationChannel[] {
    const urgentTypes = [
      VcfNotificationType.PANIC_ALERT_TRIGGERED,
      VcfNotificationType.SUBSCRIPTION_PAYMENT_FAILED,
    ];

    if (urgentTypes.includes(type)) {
      return [VcfNotificationChannel.EMAIL, VcfNotificationChannel.SMS, VcfNotificationChannel.IN_APP];
    }

    return [VcfNotificationChannel.EMAIL, VcfNotificationChannel.IN_APP];
  }

  async getUserNotifications(
    userId: string,
    unreadOnly: boolean = false
  ): Promise<VcfNotificationEntity[]> {
    return this.notificationsRepository.findByUser(userId, unreadOnly);
  }

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationsRepository.findOne(notificationId);

    if (!notification || notification.recipient.id !== userId) {
      throw new Error('Notification not found');
    }

    notification.status = VcfNotificationStatus.READ;
    notification.readAt = new Date();
    await this.notificationsRepository.update(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationsRepository.markAllAsRead(userId);
  }

  async getUserNotificationPreferences(userId: string): Promise<Record<string, boolean>> {
    // This would typically fetch from a user preferences table
    return {
      email: true,
      sms: false,
      inApp: true,
      push: true,
    };
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: Record<string, boolean>
  ): Promise<void> {
    // This would typically update a user preferences table
    this.logger.log(`Updated notification preferences for user ${userId}`);
  }

  async processRetryQueue(): Promise<void> {
    const pendingRetries = await this.notificationsRepository.findPendingRetries();

    for (const notification of pendingRetries) {
      await this.processNotification(notification);
    }
  }

  async cleanupOldNotifications(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    return this.notificationsRepository.deleteOldNotifications(cutoffDate);
  }

  // Specific notification methods for VCF events
  async notifyNewHotlineSession(session: any): Promise<void> {
    const availableExperts = []; // Would fetch available experts

    for (const expert of availableExperts) {
      await this.sendNotification(
        expert.user,
        {
          type: VcfNotificationType.HOTLINE_NEW_SESSION,
          subject: 'New Hotline Session Available',
          content: `A new ${session.priority} priority hotline session needs assistance: ${session.title}`,
          metadata: { sessionId: session.id },
          priority: VcfNotificationPriority.HIGH,
        },
        { channels: [VcfNotificationChannel.EMAIL, VcfNotificationChannel.PUSH] }
      );
    }
  }

  async notifyPanicAlert(panic: any): Promise<void> {
    const admins = []; // Would fetch admin users

    for (const admin of admins) {
      await this.sendNotification(
        admin,
        {
          type: VcfNotificationType.PANIC_ALERT_TRIGGERED,
          subject: `🚨 URGENT: ${panic.severity} Panic Alert`,
          content: `${panic.title}\n\n${panic.description}`,
          metadata: { panicId: panic.id },
          priority: VcfNotificationPriority.URGENT,
        },
        { channels: [VcfNotificationChannel.EMAIL, VcfNotificationChannel.SMS, VcfNotificationChannel.PUSH] }
      );
    }
  }
}