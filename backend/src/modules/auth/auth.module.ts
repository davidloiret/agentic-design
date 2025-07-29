import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './application/usecase/auth.service';
import { AuthController } from './infrastructure/adapter/in/auth.controller';
import { SupabaseAuthService } from './infrastructure/adapter/out/supabase-auth.service';
import { AuthGuard } from './infrastructure/guard/auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SupabaseAuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, SupabaseAuthService, AuthGuard],
})
export class AuthModule {}