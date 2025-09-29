import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfOfficeHoursService } from '../application/vcf-office-hours.service';
import { VcfOfficeHoursType } from '../domain/vcf-office-hours.entity';

@Controller('api/v1/vcf/office-hours')
@UseGuards(AuthGuard)
export class VcfOfficeHoursController {
  constructor(
    private readonly officeHoursService: VcfOfficeHoursService,
  ) {}

  @Post('schedule')
  @HttpCode(HttpStatus.CREATED)
  async scheduleOfficeHours(
    @Request() req,
    @Body() body: {
      type: VcfOfficeHoursType;
      title: string;
      description: string;
      topics?: string[];
      scheduledAt: Date;
      durationMinutes?: number;
      maxAttendees?: number;
      meetingUrl?: string;
      isRecurring?: boolean;
      recurringPattern?: string;
      requiresSubscription?: boolean;
      allowedTiers?: string[];
    },
  ) {
    return this.officeHoursService.scheduleOfficeHours(req.user, body);
  }

  @Get('upcoming')
  async getUpcomingSessions() {
    return this.officeHoursService.getUpcomingSessions();
  }

  @Get('available')
  async getAvailableSessions(@Request() req) {
    return this.officeHoursService.getAvailableSessions(req.user.id);
  }

  @Get('my-sessions')
  async getMySessions(@Request() req) {
    return this.officeHoursService.getUserSessions(req.user.id);
  }

  @Get('hosting')
  async getHostingSessions(@Request() req) {
    return this.officeHoursService.getHostSessions(req.user.id);
  }

  @Get(':id')
  async getSession(@Param('id') sessionId: string) {
    return this.officeHoursService.getOfficeHours(sessionId);
  }

  @Post(':id/join')
  @HttpCode(HttpStatus.NO_CONTENT)
  async joinSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    await this.officeHoursService.joinSession(sessionId, req.user);
  }

  @Delete(':id/leave')
  @HttpCode(HttpStatus.NO_CONTENT)
  async leaveSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    await this.officeHoursService.leaveSession(sessionId, req.user.id);
  }

  @Put(':id/start')
  async startSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.officeHoursService.startSession(sessionId, req.user.id);
  }

  @Put(':id/end')
  async endSession(
    @Param('id') sessionId: string,
    @Request() req,
    @Body() body?: { notes?: string; recordingUrl?: string },
  ) {
    return this.officeHoursService.endSession(
      sessionId,
      req.user.id,
      body?.notes,
      body?.recordingUrl,
    );
  }

  @Put(':id/cancel')
  async cancelSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.officeHoursService.cancelSession(sessionId, req.user.id);
  }

  @Post(':id/feedback')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFeedback(
    @Param('id') sessionId: string,
    @Request() req,
    @Body() body: { rating: number; comment?: string },
  ) {
    await this.officeHoursService.addFeedback(
      sessionId,
      req.user.id,
      body.rating,
      body.comment,
    );
  }
}