import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfHelpRequestEntity } from './domain/vcf-help-request.entity';
import { VcfHelpRequestsController } from './infrastructure/vcf-help-requests.controller';
import { VcfHelpRequestsService } from './application/vcf-help-requests.service';
import { VcfHelpRequestsRepository } from './infrastructure/vcf-help-requests.repository';
import { VcfSubscriptionsModule } from '../vcf-subscriptions/vcf-subscriptions.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfHelpRequestEntity]),
    VcfSubscriptionsModule,
  ],
  controllers: [VcfHelpRequestsController],
  providers: [VcfHelpRequestsService, VcfHelpRequestsRepository],
  exports: [VcfHelpRequestsService],
})
export class VcfHelpRequestsModule {}