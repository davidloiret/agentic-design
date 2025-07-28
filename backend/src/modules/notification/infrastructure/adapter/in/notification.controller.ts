import { Controller, Get, Post, Patch, Param, Query, Req, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../../../../auth/infrastructure/guard/auth.guard';
import { NotificationService } from '../../../application/usecase/notification.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Get()
  async getUserNotifications(
    @Req() request: Request,
    @Query('includeRead') includeRead?: string,
    @Query('includeArchived') includeArchived?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      const notifications = await this.notificationService.getUserNotifications(
        user.id,
        {
          includeRead: includeRead === 'true',
          includeArchived: includeArchived === 'true',
          limit: limit ? parseInt(limit) : undefined,
          offset: offset ? parseInt(offset) : undefined,
        }
      );

      return {
        success: true,
        data: notifications,
        total: notifications.length,
      };
    } catch (error) {
      console.error('[NotificationController] Error fetching notifications:', error);
      return {
        success: false,
        message: 'Failed to fetch notifications',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get('unread')
  async getUnreadNotifications(@Req() request: Request) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      const [notifications, count] = await Promise.all([
        this.notificationService.getUnreadNotifications(user.id),
        this.notificationService.getUnreadCount(user.id),
      ]);

      return {
        success: true,
        data: notifications,
        count,
      };
    } catch (error) {
      console.error('[NotificationController] Error fetching unread notifications:', error);
      return {
        success: false,
        message: 'Failed to fetch unread notifications',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get('count')
  async getUnreadCount(@Req() request: Request) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      const count = await this.notificationService.getUnreadCount(user.id);
      return {
        success: true,
        count,
      };
    } catch (error) {
      console.error('[NotificationController] Error fetching unread count:', error);
      return {
        success: false,
        message: 'Failed to fetch unread count',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(@Param('id') id: string, @Req() request: Request) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      await this.notificationService.markAsRead(id);
      return {
        success: true,
        message: 'Notification marked as read',
      };
    } catch (error) {
      console.error('[NotificationController] Error marking notification as read:', error);
      return {
        success: false,
        message: 'Failed to mark notification as read',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Post('mark-all-read')
  @HttpCode(HttpStatus.OK)
  async markAllAsRead(@Req() request: Request) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      await this.notificationService.markAllAsRead(user.id);
      return {
        success: true,
        message: 'All notifications marked as read',
      };
    } catch (error) {
      console.error('[NotificationController] Error marking all notifications as read:', error);
      return {
        success: false,
        message: 'Failed to mark all notifications as read',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Patch(':id/archive')
  @HttpCode(HttpStatus.OK)
  async archiveNotification(@Param('id') id: string, @Req() request: Request) {
    const user = (request as any).user;
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    try {
      await this.notificationService.archiveNotification(id);
      return {
        success: true,
        message: 'Notification archived',
      };
    } catch (error) {
      console.error('[NotificationController] Error archiving notification:', error);
      return {
        success: false,
        message: 'Failed to archive notification',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}