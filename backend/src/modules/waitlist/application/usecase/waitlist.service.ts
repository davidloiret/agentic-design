import { Injectable, Logger } from '@nestjs/common';
import { ResendEmailService } from '../../infrastructure/adapter/out/resend-email.service';
import { WaitlistSignupDto, WaitlistSignupResponseDto } from '../dto/waitlist-signup.dto';

@Injectable()
export class WaitlistService {
  private readonly logger = new Logger(WaitlistService.name);

  constructor(private readonly emailService: ResendEmailService) {}

  async signup(dto: WaitlistSignupDto): Promise<WaitlistSignupResponseDto> {
    this.logger.log(`Processing waitlist signup for: ${dto.email}`);

    // Send notification to team
    const notificationSent = await this.emailService.sendWaitlistNotification(dto.email);

    if (!notificationSent) {
      this.logger.warn(`Team notification failed for: ${dto.email}`);
    }

    // Send welcome email to user
    const welcomeSent = await this.emailService.sendWelcomeEmail(dto.email);

    if (!welcomeSent) {
      this.logger.warn(`Welcome email failed for: ${dto.email}`);
    }

    return {
      success: true,
      message: "You've been added to the waitlist!",
    };
  }
}
