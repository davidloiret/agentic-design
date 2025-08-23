import { Module } from '@nestjs/common';
import { SecretsController } from './infrastructure/adapter/in/secrets.controller';
import { SecretsService } from './application/usecase/secrets.service';

@Module({
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}