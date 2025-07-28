import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Req() request: Request) {
    // The user is attached to the request by the AuthGuard
    return request['user'];
  }
}