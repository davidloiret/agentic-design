import { IsEmail, IsNotEmpty } from 'class-validator';

export class WaitlistSignupDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class WaitlistSignupResponseDto {
  success: boolean;
  message: string;
}
