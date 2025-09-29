import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfFileEntity } from './domain/vcf-file.entity';
import { VcfFilesService } from './application/vcf-files.service';
import { VcfFilesRepository } from './infrastructure/vcf-files.repository';
import { VcfFilesController } from './infrastructure/vcf-files.controller';

@Module({
  imports: [MikroOrmModule.forFeature([VcfFileEntity])],
  controllers: [VcfFilesController],
  providers: [VcfFilesService, VcfFilesRepository],
  exports: [VcfFilesService],
})
export class VcfFilesModule {}