import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/auth/infrastructure/guard/auth.guard';

@Controller()
export class AppController {
  @Get('health')
  @Public()
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'agentic-design-backend',
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}