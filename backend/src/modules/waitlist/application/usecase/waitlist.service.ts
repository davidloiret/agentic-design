import { Injectable, Logger } from '@nestjs/common';
import { ResendEmailService } from '../../infrastructure/adapter/out/resend-email.service';
import { WaitlistSignupDto, WaitlistSignupResponseDto } from '../dto/waitlist-signup.dto';

@Injectable()
export class WaitlistService {
  private readonly logger = new Logger(WaitlistService.name);

  constructor(private readonly emailService: ResendEmailService) {}

  async signup(dto: WaitlistSignupDto): Promise<WaitlistSignupResponseDto> {
    this.logger.log(`Processing waitlist signup for: ${dto.email}`);

    const emailSent = await this.emailService.sendWaitlistNotification(dto.email);

    if (!emailSent) {
      this.logger.warn(`Email notification failed for: ${dto.email}`);
    }

    return {
      success: true,
      message: "You've been added to the waitlist!",
    };
  }
}
