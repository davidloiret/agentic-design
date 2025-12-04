import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../../../../auth/infrastructure/guard/auth.guard';
import { WaitlistService } from '../../../application/usecase/waitlist.service';
import { WaitlistSignupDto, WaitlistSignupResponseDto } from '../../../application/dto/waitlist-signup.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: WaitlistSignupDto): Promise<WaitlistSignupResponseDto> {
    return this.waitlistService.signup(dto);
  }
}
