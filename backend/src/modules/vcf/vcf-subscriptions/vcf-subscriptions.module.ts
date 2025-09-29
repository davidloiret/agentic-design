import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfSubscriptionEntity } from './domain/vcf-subscription.entity';
import { VcfSubscriptionsController } from './infrastructure/vcf-subscriptions.controller';
import { VcfSubscriptionsService } from './application/vcf-subscriptions.service';
import { VcfSubscriptionsRepository } from './infrastructure/vcf-subscriptions.repository';

@Module({
  imports: [MikroOrmModule.forFeature([VcfSubscriptionEntity])],
  controllers: [VcfSubscriptionsController],
  providers: [VcfSubscriptionsService, VcfSubscriptionsRepository],
  exports: [VcfSubscriptionsService],
})
export class VcfSubscriptionsModule {}