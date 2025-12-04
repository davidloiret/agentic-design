import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

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

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: (origin, cb) => {
      const allowed = new Set([
        configService.get<string>('FRONTEND_URL') ?? '',
        'http://localhost:3002',
        'http://127.0.0.1:3002',
        'https://agentic-design.ai',
        'http://localhost:8081',
        'https://reasoninglayer.ai',
      ]);

      const devRegex = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+$/;

      // `origin` can be undefined (same-origin) or "null" (file:/, some mobile/webviews)
      const ok =
        !origin ||
        origin === 'null' ||
        allowed.has(origin) ||
        devRegex.test(origin);

      cb(null, ok);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],   // lets browser echo back requested headers
    credentials: true,
    optionsSuccessStatus: 200,
  });


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