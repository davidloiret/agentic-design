import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
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

  private getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const,
      domain: isProduction ? '.agentic-design.ai' : 'localhost',
      path: '/',
    };
  }

  private async refreshTokenAndSetCookies(refreshToken: string, response: Response) {
    try {
      const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);
      if (refreshResult?.session?.access_token) {
        const cookieOptions = this.getCookieOptions();
        
        response.cookie('access_token', refreshResult.session.access_token, {
          ...cookieOptions,
          maxAge: 60 * 60 * 1000, // 1 hour
        });
        
        if (refreshResult.session.refresh_token) {
          response.cookie('refresh_token', refreshResult.session.refresh_token, {
            ...cookieOptions,
            maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
          });
        }
        
        return {
          token: refreshResult.session.access_token,
          user: refreshResult.user ?? refreshResult.session.user,
        };
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear invalid cookies with same options used to set them
      const cookieOptions = this.getCookieOptions();
      response.clearCookie('access_token', cookieOptions);
      response.clearCookie('refresh_token', cookieOptions);
    }
    return null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    
    let token = request.cookies?.['access_token'];
    let isFromCookie = !!token;
    
    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
        isFromCookie = false;
      }
    }
    
    if (!token) {
      // No access token at all, try refresh if available
      if (request.cookies?.['refresh_token']) {
        const refreshToken = request.cookies['refresh_token'];
        const refreshResult = await this.refreshTokenAndSetCookies(refreshToken, response);
        if (refreshResult) {
          token = refreshResult.token;
          isFromCookie = true;
        }
      }
      
      if (!token) {
        throw new UnauthorizedException('No authentication token provided');
      }
    }

    try {
      let user = await this.supabaseAuthService.getUserByToken(token);
      
      // If token is invalid/expired and we have refresh token (cookie-based auth only)
      if (!user && isFromCookie && request.cookies?.['refresh_token']) {
        const refreshToken = request.cookies['refresh_token'];
        const refreshResult = await this.refreshTokenAndSetCookies(refreshToken, response);
        if (refreshResult) {
          token = refreshResult.token;
          user = refreshResult.user;
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
      // Clear invalid cookies only if auth was cookie-based
      if (isFromCookie) {
        const cookieOptions = this.getCookieOptions();
        response.clearCookie('access_token', cookieOptions);
        response.clearCookie('refresh_token', cookieOptions);
      }
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Authentication failed');
    }
  }
}