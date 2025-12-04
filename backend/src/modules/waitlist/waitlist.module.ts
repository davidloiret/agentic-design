import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WaitlistController } from './infrastructure/adapter/in/waitlist.controller';
import { WaitlistService } from './application/usecase/waitlist.service';
import { ResendEmailService } from './infrastructure/adapter/out/resend-email.service';

@Module({
  imports: [ConfigModule],
  controllers: [WaitlistController],
  providers: [WaitlistService, ResendEmailService],
})
export class WaitlistModule {}
