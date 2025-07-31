import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SupabaseAuthService } from '../adapter/out/supabase-auth.service';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    
    let token = request.cookies?.['access_token'];
    
    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token && request.cookies?.['refresh_token']) {
      const refreshToken = request.cookies['refresh_token'];
      const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);
      if (refreshResult?.session?.access_token) {
        token = refreshResult.session.access_token;
        const response = context.switchToHttp().getResponse();
        response.cookie('access_token', refreshResult.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        if (refreshResult.session.refresh_token) {
          response.cookie('refresh_token', refreshResult.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
        }
      }
    }
    
    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      let user = await this.supabaseAuthService.getUserByToken(token);
      
      if (!user && request.cookies?.['refresh_token']) {
        const refreshToken = request.cookies['refresh_token'];
        const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);
        if (refreshResult?.session?.access_token) {
          token = refreshResult.session.access_token;
          user = refreshResult.user ?? refreshResult.session.user;
          const response = context.switchToHttp().getResponse();
          response.cookie('access_token', refreshResult.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          if (refreshResult.session.refresh_token) {
            response.cookie('refresh_token', refreshResult.session.refresh_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
          }
        }
      }
      
      if (!user) {
        throw new UnauthorizedException('Invalid or expired authentication token');
      }

      if (!user.id) {
        console.error('[AuthGuard] User object missing ID:', JSON.stringify(user, null, 2));
        throw new UnauthorizedException('Invalid user data: missing user ID');
      }

      // Get the local User entity using the Supabase user ID
      let localUser = await this.userRepository.findBySupabaseId(user.id);
      if (!localUser) {
        console.log('[AuthGuard] Local user not found, attempting to create/sync for:', user.email);
        
        // Try to find by email first
        localUser = await this.userRepository.findByEmail(user.email);
        
        if (localUser) {
          // Update existing user with Supabase ID
          localUser.supabaseId = user.id;
          await this.userRepository.update(localUser);
        } else {
          // Create new user (fallback for race conditions)
          const { User } = await import('../../../user/domain/entity/user.entity');
          const newUser = new User(
            user.email,
            user.user_metadata?.firstName || user.email.split('@')[0],
            user.user_metadata?.lastName || '',
            user.id
          );
          await this.userRepository.save(newUser);
          localUser = newUser;
        }
      }

      request['user'] = localUser;
      request['supabaseUser'] = user;
      
      return true;
    } catch (error) {
      // Clear invalid cookies
      const response = context.switchToHttp().getResponse();
      response.clearCookie('access_token');
      response.clearCookie('refresh_token');
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Authentication failed');
    }
  }
}