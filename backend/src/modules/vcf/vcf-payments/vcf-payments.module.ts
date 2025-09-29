import { Module, forwardRef } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfPaymentEventEntity } from './domain/vcf-payment-event.entity';
import { VcfPaymentsService } from './application/vcf-payments.service';
import { VcfPaymentsRepository } from './infrastructure/vcf-payments.repository';
import { VcfPaymentsController } from './infrastructure/vcf-payments.controller';
import { VcfSubscriptionsModule } from '../vcf-subscriptions/vcf-subscriptions.module';
import { VcfNotificationsModule } from '../vcf-notifications/vcf-notifications.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfPaymentEventEntity]),
    forwardRef(() => VcfSubscriptionsModule),
    VcfNotificationsModule,
  ],
  controllers: [VcfPaymentsController],
  providers: [VcfPaymentsService, VcfPaymentsRepository],
  exports: [VcfPaymentsService],
})
export class VcfPaymentsModule {}