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
import { VcfHotlineService } from '../application/vcf-hotline.service';
import { VcfMessageType } from '../domain/vcf-hotline-message.entity';

@Controller('api/v1/vcf/hotline')
@UseGuards(AuthGuard)
export class VcfHotlineController {
  constructor(
    private readonly hotlineService: VcfHotlineService,
  ) {}

  @Post('sessions')
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @Request() req,
    @Body() body: {
      title: string;
      description: string;
      programmingLanguage?: string;
      framework?: string;
      errorMessage?: string;
      codeSnippet?: string;
      tags?: string[];
    },
  ) {
    return this.hotlineService.createSession(req.user, body);
  }

  @Get('sessions')
  async getMySessions(@Request() req) {
    return this.hotlineService.getUserSessions(req.user.id);
  }

  @Get('sessions/waiting')
  async getWaitingSessions() {
    return this.hotlineService.getWaitingSessions();
  }

  @Get('sessions/:id')
  async getSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.hotlineService.getSession(sessionId, req.user.id);
  }

  @Put('sessions/:id/assign')
  async assignExpert(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.hotlineService.assignExpert(sessionId, req.user);
  }

  @Post('sessions/:id/messages')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(
    @Param('id') sessionId: string,
    @Request() req,
    @Body() body: {
      content: string;
      type?: VcfMessageType;
      codeSnippet?: string;
      programmingLanguage?: string;
    },
  ) {
    return this.hotlineService.sendMessage(
      sessionId,
      req.user.id,
      body.content,
      body.type,
      body.codeSnippet,
      body.programmingLanguage,
    );
  }

  @Get('sessions/:id/messages')
  async getMessages(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.hotlineService.getSessionMessages(sessionId, req.user.id);
  }

  @Put('sessions/:id/resolve')
  async resolveSession(
    @Param('id') sessionId: string,
    @Request() req,
    @Body() body: { resolution: string },
  ) {
    return this.hotlineService.markSessionResolved(
      sessionId,
      req.user.id,
      body.resolution,
    );
  }

  @Put('sessions/:id/close')
  async closeSession(
    @Param('id') sessionId: string,
    @Request() req,
  ) {
    return this.hotlineService.closeSession(sessionId, req.user.id);
  }

  @Post('sessions/:id/rate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rateSession(
    @Param('id') sessionId: string,
    @Request() req,
    @Body() body: { rating: number; feedback?: string },
  ) {
    await this.hotlineService.rateSatisfaction(
      sessionId,
      req.user.id,
      body.rating,
      body.feedback,
    );
  }

  @Get('stats')
  async getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.hotlineService.getHotlineStats(start, end);
  }
}