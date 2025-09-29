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
import { VcfPanicButtonService } from '../application/vcf-panic-button.service';
import { VcfPanicButtonType, VcfPanicButtonSeverity, VcfPanicButtonStatus } from '../domain/vcf-panic-button.entity';

@Controller('api/v1/vcf/panic-button')
@UseGuards(AuthGuard)
export class VcfPanicButtonController {
  constructor(
    private readonly panicButtonService: VcfPanicButtonService,
  ) {}

  @Post('trigger')
  @HttpCode(HttpStatus.CREATED)
  async triggerPanicButton(
    @Request() req,
    @Body() body: {
      type: VcfPanicButtonType;
      severity: VcfPanicButtonSeverity;
      title: string;
      description: string;
      impactDescription: string;
      affectedUsers?: number;
      isProductionIssue?: boolean;
      errorMessage?: string;
      stackTrace?: string;
      affectedServices?: string[];
      attemptedSolutions?: string[];
      estimatedDowntimeMinutes?: number;
      estimatedRevenueLoss?: number;
    },
  ) {
    return this.panicButtonService.triggerPanicButton(req.user, body);
  }

  @Get('active')
  async getActiveAlerts() {
    return this.panicButtonService.getActiveAlerts();
  }

  @Get('my-alerts')
  async getMyAlerts(@Request() req) {
    return this.panicButtonService.getUserAlerts(req.user.id);
  }

  @Get('severity/:severity')
  async getAlertsBySeverity(@Param('severity') severity: VcfPanicButtonSeverity) {
    return this.panicButtonService.getAlertsBySeverity(severity);
  }

  @Get('stats')
  async getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.panicButtonService.getPanicButtonStats(start, end);
  }

  @Get(':id')
  async getAlert(@Param('id') panicId: string) {
    return this.panicButtonService.getPanicButton(panicId);
  }

  @Post(':id/acknowledge')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acknowledgeAlert(
    @Param('id') panicId: string,
    @Request() req,
  ) {
    await this.panicButtonService.acknowledgeAlert(panicId, req.user.id);
  }

  @Post(':id/assign')
  async assignExpert(
    @Param('id') panicId: string,
    @Request() req,
  ) {
    return this.panicButtonService.assignExpert(panicId, req.user);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') panicId: string,
    @Request() req,
    @Body() body: { status: VcfPanicButtonStatus; notes?: string },
  ) {
    return this.panicButtonService.updateStatus(
      panicId,
      req.user.id,
      body.status,
      body.notes,
    );
  }

  @Post(':id/resolve')
  async resolveAlert(
    @Param('id') panicId: string,
    @Request() req,
    @Body() body: {
      resolution: string;
      rootCause?: string;
      preventionSteps?: string[];
      postMortemUrl?: string;
    },
  ) {
    return this.panicButtonService.resolveAlert(
      panicId,
      req.user.id,
      body,
    );
  }

  @Post(':id/false-alarm')
  async markAsFalseAlarm(
    @Param('id') panicId: string,
    @Request() req,
    @Body() body: { reason: string },
  ) {
    return this.panicButtonService.markAsFalseAlarm(
      panicId,
      req.user.id,
      body.reason,
    );
  }

  @Post(':id/feedback')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFeedback(
    @Param('id') panicId: string,
    @Request() req,
    @Body() body: { rating: number; feedback?: string },
  ) {
    await this.panicButtonService.addFeedback(
      panicId,
      req.user.id,
      body.rating,
      body.feedback,
    );
  }
}