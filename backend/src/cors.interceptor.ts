import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    
    const origin = request.headers.origin;
    const allowed = new Set([
      'http://localhost:3002',
      'http://127.0.0.1:3002',
      'https://agentic-design.ai',
      'http://localhost:8081',
      'https://reasoninglayer.ai',
    ]);

    const devRegex = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+$/;
    const isAllowed = !origin || origin === 'null' || allowed.has(origin) || devRegex.test(origin);

    if (isAllowed && origin) {
      // Override the wildcard with explicit headers
      response.setHeader('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Type,Content-Language,Origin,X-Requested-With,Authorization,X-Tenant-Id,Cookie');
    }

    return next.handle();
  }
}
