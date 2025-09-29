import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfNotificationsService } from '../application/vcf-notifications.service';

@Controller('api/v1/vcf/notifications')
@UseGuards(AuthGuard)
export class VcfNotificationsController {
  constructor(
    private readonly notificationsService: VcfNotificationsService,
  ) {}

  @Get()
  async getMyNotifications(
    @Request() req,
    @Query('unreadOnly') unreadOnly?: string,
  ) {
    return this.notificationsService.getUserNotifications(
      req.user.id,
      unreadOnly === 'true'
    );
  }

  @Put(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsRead(
    @Param('id') notificationId: string,
    @Request() req,
  ) {
    await this.notificationsService.markAsRead(notificationId, req.user.id);
  }

  @Put('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAllAsRead(@Request() req) {
    await this.notificationsService.markAllAsRead(req.user.id);
  }

  @Get('preferences')
  async getPreferences(@Request() req) {
    return this.notificationsService.getUserNotificationPreferences(req.user.id);
  }

  @Put('preferences')
  async updatePreferences(
    @Request() req,
    @Body() preferences: Record<string, boolean>,
  ) {
    await this.notificationsService.updateNotificationPreferences(
      req.user.id,
      preferences
    );
    return { message: 'Preferences updated successfully' };
  }
}