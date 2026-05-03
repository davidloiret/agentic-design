import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import type { Request, Response, NextFunction } from 'express';
import { CorsInterceptor } from './cors.interceptor';

async function bootstrap() {
  // Create NestJS app with body parser disabled initially
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  // Configure NestJS body parser with custom limits
  app.useBodyParser('json', { limit: 10_485_760 });
  app.useBodyParser('text', { limit: 10_485_760 });
  app.useBodyParser('raw', { limit: 10_485_760 });
  app.useBodyParser('urlencoded', { limit: 10_485_760, extended: true });
  
  const configService = app.get(ConfigService);

  // Raw Express middleware for CORS - must be BEFORE setGlobalPrefix
  app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    const allowed = new Set([
      configService.get<string>('FRONTEND_URL') ?? '',
      'http://localhost:3002',
      'http://127.0.0.1:3002',
      'https://agentic-design.ai',
      'http://localhost:8081',
      'https://reasoninglayer.ai',
    ]);

    const devRegex = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+$/;
    const isAllowed = !origin || origin === 'null' || allowed.has(origin) || devRegex.test(origin);

    // Check if this is the waitlist endpoint (public endpoint, no credentials needed)
    const isWaitlistEndpoint = req.url.includes('/waitlist');

    if (isAllowed && origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);

      // Always set credentials header, but skip expose headers for waitlist
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      if (!isWaitlistEndpoint) {
        res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
      }

      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Vary', 'Origin');

      // Force explicit headers - override any wildcard
      const explicitHeaders = 'Accept,Accept-Language,Content-Type,Content-Language,Origin,X-Requested-With,Authorization,X-Tenant-Id,Cookie';
      res.setHeader('Access-Control-Allow-Headers', explicitHeaders);

      // Hook to enforce headers right before sending
      const originalWriteHead = res.writeHead;
      res.writeHead = function(...args: any[]) {
        res.setHeader('Access-Control-Allow-Headers', explicitHeaders);
        return originalWriteHead.apply(res, args);
      };
    }

    if (req.method === 'OPTIONS') {
      const explicitHeaders = 'Accept,Accept-Language,Content-Type,Content-Language,Origin,X-Requested-With,Authorization,X-Tenant-Id,Cookie';
      res.setHeader('Access-Control-Max-Age', '86400');
      res.setHeader('Access-Control-Allow-Headers', explicitHeaders); // Force again right before end()
      res.status(204).end();
      return;
    }

    next();
  });

  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`WebSocket server is available at ws://localhost:${port}/game`);
}
bootstrap();