import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guard/auth.guard';
import { VcfPaymentsService } from '../application/vcf-payments.service';

@Controller('api/v1/vcf/payments')
export class VcfPaymentsController {
  constructor(
    private readonly paymentsService: VcfPaymentsService,
  ) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() body: string,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing Stripe signature');
    }

    await this.paymentsService.handleWebhook(body, signature);
    return { received: true };
  }

  @Get('history')
  @UseGuards(AuthGuard)
  async getPaymentHistory(@Request() req) {
    return this.paymentsService.getPaymentHistory(req.user.id);
  }

  @Post('retry-failed')
  @UseGuards(AuthGuard)
  async retryFailedPayments() {
    await this.paymentsService.processRetryQueue();
    return { message: 'Retry queue processing initiated' };
  }
}