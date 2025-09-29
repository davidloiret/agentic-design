import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfPanicButtonEntity } from './domain/vcf-panic-button.entity';
import { VcfPanicButtonController } from './infrastructure/vcf-panic-button.controller';
import { VcfPanicButtonService } from './application/vcf-panic-button.service';
import { VcfPanicButtonRepository } from './infrastructure/vcf-panic-button.repository';
import { VcfSubscriptionsModule } from '../vcf-subscriptions/vcf-subscriptions.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfPanicButtonEntity]),
    VcfSubscriptionsModule,
  ],
  controllers: [VcfPanicButtonController],
  providers: [VcfPanicButtonService, VcfPanicButtonRepository],
  exports: [VcfPanicButtonService],
})
export class VcfPanicButtonModule {}