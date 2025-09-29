import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfExpertEntity } from './domain/vcf-expert.entity';
import { VcfExpertsController } from './infrastructure/vcf-experts.controller';
import { VcfExpertsService } from './application/vcf-experts.service';
import { VcfExpertsRepository } from './infrastructure/vcf-experts.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([VcfExpertEntity]),
  ],
  controllers: [VcfExpertsController],
  providers: [VcfExpertsService, VcfExpertsRepository],
  exports: [VcfExpertsService],
})
export class VcfExpertsModule {}