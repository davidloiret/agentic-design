import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Notification } from './domain/entity/notification.entity';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { NotificationService } from './application/usecase/notification.service';
import { NotificationController } from './infrastructure/adapter/in/notification.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Notification]),
    AuthModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}