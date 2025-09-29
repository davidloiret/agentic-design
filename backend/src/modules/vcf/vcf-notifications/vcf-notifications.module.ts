import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { VcfNotificationEntity } from './domain/vcf-notification.entity';
import { VcfNotificationsService } from './application/vcf-notifications.service';
import { VcfNotificationsRepository } from './infrastructure/vcf-notifications.repository';
import { VcfNotificationsController } from './infrastructure/vcf-notifications.controller';

@Module({
  imports: [MikroOrmModule.forFeature([VcfNotificationEntity])],
  controllers: [VcfNotificationsController],
  providers: [VcfNotificationsService, VcfNotificationsRepository],
  exports: [VcfNotificationsService],
})
export class VcfNotificationsModule {}