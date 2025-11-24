import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikOrmModule } from '@mikro-orm/nestjs';
import { MediaBackupController } from './infrastructure/adapter/in/media-backup.controller';
import { MediaBackupService } from './application/usecase/media-backup.service';
import { MediaBackupRepository } from './infrastructure/persistence/media-backup.repository';
import { MediaStorageRepository } from './infrastructure/adapter/out/media-storage.repository';
import { MediaBackupEntity } from './domain/entity/media-backup.entity';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    MikOrmModule.forFeature([MediaBackupEntity]),
    SharedModule,
    UserModule
  ],
  controllers: [MediaBackupController],
  providers: [
    MediaBackupService,
    MediaBackupRepository,
    MediaStorageRepository
  ],
  exports: [MediaBackupService, MediaBackupRepository]
})
export class MediaBackupModule {}