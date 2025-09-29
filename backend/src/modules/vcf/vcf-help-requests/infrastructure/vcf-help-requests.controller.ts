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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfHelpRequestsService } from '../application/vcf-help-requests.service';
import { VcfHelpRequestType, VcfHelpRequestPriority } from '../domain/vcf-help-request.entity';

@Controller('api/v1/vcf/help-requests')
@UseGuards(AuthGuard)
export class VcfHelpRequestsController {
  constructor(
    private readonly helpRequestsService: VcfHelpRequestsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHelpRequest(
    @Request() req,
    @Body() body: {
      type: VcfHelpRequestType;
      title: string;
      description: string;
      priority?: VcfHelpRequestPriority;
      tags?: string[];
      programmingLanguage?: string;
      framework?: string;
      currentCode?: string;
      expectedBehavior?: string;
      actualBehavior?: string;
      errorMessage?: string;
      stepsToReproduce?: string[];
      estimatedTimeHours?: number;
      bountyAmount?: number;
      isPublic?: boolean;
      expiresAt?: Date;
    },
  ) {
    return this.helpRequestsService.createHelpRequest(req.user, body);
  }

  @Get('my-requests')
  async getMyHelpRequests(@Request() req) {
    return this.helpRequestsService.getUserHelpRequests(req.user.id);
  }

  @Get('open')
  async getOpenHelpRequests(
    @Query('type') type?: VcfHelpRequestType,
    @Query('priority') priority?: VcfHelpRequestPriority,
    @Query('language') programmingLanguage?: string,
    @Query('framework') framework?: string,
    @Query('tags') tags?: string,
  ) {
    const filters = {
      type,
      priority,
      programmingLanguage,
      framework,
      tags: tags ? tags.split(',') : undefined,
    };
    return this.helpRequestsService.getOpenHelpRequests(filters);
  }

  @Get('search')
  async searchHelpRequests(@Query('q') query: string) {
    return this.helpRequestsService.searchHelpRequests(query);
  }

  @Get('stats')
  async getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.helpRequestsService.getHelpRequestStats(start, end);
  }

  @Get(':id')
  async getHelpRequest(@Param('id') requestId: string) {
    return this.helpRequestsService.getHelpRequest(requestId);
  }

  @Post(':id/claim')
  @HttpCode(HttpStatus.NO_CONTENT)
  async claimHelpRequest(
    @Param('id') requestId: string,
    @Request() req,
  ) {
    await this.helpRequestsService.claimHelpRequest(requestId, req.user);
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.NO_CONTENT)
  async startWork(
    @Param('id') requestId: string,
    @Request() req,
  ) {
    await this.helpRequestsService.startWork(requestId, req.user.id);
  }

  @Post(':id/solution')
  async submitSolution(
    @Param('id') requestId: string,
    @Request() req,
    @Body() body: {
      solution: string;
      solutionCode?: string;
      solutionSteps?: string[];
      actualTimeHours?: number;
    },
  ) {
    return this.helpRequestsService.submitSolution(
      requestId,
      req.user.id,
      body,
    );
  }

  @Post(':id/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acceptSolution(
    @Param('id') requestId: string,
    @Request() req,
    @Body() body?: { rating?: number; feedback?: string },
  ) {
    await this.helpRequestsService.acceptSolution(
      requestId,
      req.user.id,
      body?.rating,
      body?.feedback,
    );
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSolution(
    @Param('id') requestId: string,
    @Request() req,
    @Body() body: { reason: string },
  ) {
    await this.helpRequestsService.rejectSolution(
      requestId,
      req.user.id,
      body.reason,
    );
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelRequest(
    @Param('id') requestId: string,
    @Request() req,
  ) {
    await this.helpRequestsService.cancelRequest(requestId, req.user.id);
  }

  @Post(':id/decline')
  @HttpCode(HttpStatus.NO_CONTENT)
  async declineRequest(
    @Param('id') requestId: string,
    @Request() req,
  ) {
    await this.helpRequestsService.declineRequest(requestId, req.user.id);
  }

  @Post(':id/interest')
  @HttpCode(HttpStatus.NO_CONTENT)
  async expressInterest(
    @Param('id') requestId: string,
    @Request() req,
  ) {
    await this.helpRequestsService.expressInterest(requestId, req.user.id);
  }
}