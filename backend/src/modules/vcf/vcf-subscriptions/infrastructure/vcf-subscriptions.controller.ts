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
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfSubscriptionsService } from '../application/vcf-subscriptions.service';
import { VcfSubscriptionTier, VcfSubscriptionStatus } from '../domain/vcf-subscription.entity';

@Controller('api/v1/vcf/subscriptions')
@UseGuards(AuthGuard)
export class VcfSubscriptionsController {
  constructor(
    private readonly subscriptionsService: VcfSubscriptionsService,
  ) {}

  @Get('my-subscription')
  async getMySubscription(@Request() req) {
    return this.subscriptionsService.getSubscriptionByUserId(req.user.id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createSubscription(
    @Request() req,
    @Body() body: { tier: VcfSubscriptionTier; stripeCustomerId?: string },
  ) {
    return this.subscriptionsService.createSubscription(
      req.user,
      body.tier,
      body.stripeCustomerId,
    );
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: VcfSubscriptionStatus },
  ) {
    return this.subscriptionsService.updateSubscriptionStatus(id, body.status);
  }

  @Post('record-usage')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recordUsage(
    @Request() req,
    @Body() body: { type: 'question' | 'codeFix' },
  ) {
    await this.subscriptionsService.recordUsage(req.user.id, body.type);
  }

  @Get('check-limits')
  async checkUsageLimits(@Request() req): Promise<{ allowed: boolean }> {
    const allowed = await this.subscriptionsService.checkUsageLimits(req.user.id);
    return { allowed };
  }
}