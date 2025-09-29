import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfHotlineSessionEntity } from './domain/vcf-hotline-session.entity';
import { VcfHotlineMessageEntity } from './domain/vcf-hotline-message.entity';
import { VcfHotlineController } from './infrastructure/vcf-hotline.controller';
import { VcfHotlineService } from './application/vcf-hotline.service';
import { VcfHotlineRepository } from './infrastructure/vcf-hotline.repository';
import { VcfSubscriptionsModule } from '../vcf-subscriptions/vcf-subscriptions.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfHotlineSessionEntity, VcfHotlineMessageEntity]),
    VcfSubscriptionsModule,
  ],
  controllers: [VcfHotlineController],
  providers: [VcfHotlineService, VcfHotlineRepository],
  exports: [VcfHotlineService],
})
export class VcfHotlineModule {}