import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfOfficeHoursEntity } from './domain/vcf-office-hours.entity';
import { VcfOfficeHoursController } from './infrastructure/vcf-office-hours.controller';
import { VcfOfficeHoursService } from './application/vcf-office-hours.service';
import { VcfOfficeHoursRepository } from './infrastructure/vcf-office-hours.repository';
import { VcfSubscriptionsModule } from '../vcf-subscriptions/vcf-subscriptions.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfOfficeHoursEntity]),
    VcfSubscriptionsModule,
  ],
  controllers: [VcfOfficeHoursController],
  providers: [VcfOfficeHoursService, VcfOfficeHoursRepository],
  exports: [VcfOfficeHoursService],
})
export class VcfOfficeHoursModule {}