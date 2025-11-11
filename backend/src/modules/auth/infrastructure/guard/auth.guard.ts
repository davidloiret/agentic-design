import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { SupabaseAuthService } from '../adapter/out/supabase-auth.service';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { getCookieConfig, getAccessTokenCookieOptions, getRefreshTokenCookieOptions } from '../utils/cookie-config';

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
    return getCookieConfig();
  }

  private async refreshTokenAndSetCookies(refreshToken: string, response: Response) {
    try {
      console.log('[AuthGuard] Attempting to refresh token...');
      const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);

      if (refreshResult?.session?.access_token) {
        console.log('[AuthGuard] Setting new cookies after refresh');
        console.log('[AuthGuard] New access_token:', refreshResult.session.access_token.substring(0, 20) + '...');

        response.cookie('access_token', refreshResult.session.access_token, getAccessTokenCookieOptions());

        // Always update the refresh token if a new one is provided
        if (refreshResult.session.refresh_token) {
          response.cookie('refresh_token', refreshResult.session.refresh_token, getRefreshTokenCookieOptions());
          console.log('[AuthGuard] Updated both access and refresh tokens');
          console.log('[AuthGuard] New refresh_token:', refreshResult.session.refresh_token.substring(0, 20) + '...');
        } else {
          console.log('[AuthGuard] Only updated access token, no new refresh token provided');
        }

        return {
          token: refreshResult.session.access_token,
          user: refreshResult.user ?? refreshResult.session.user,
        };
      } else {
        console.error('[AuthGuard] No session returned from refresh attempt');
      }
    } catch (error) {
      console.error('[AuthGuard] Token refresh failed with error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      // Clear invalid cookies with same options used to set them
      const cookieOptions = this.getCookieOptions();
      console.log('[AuthGuard] Clearing cookies with options:', cookieOptions);
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

    // Debug logging with request ID for tracking
    const requestId = Math.random().toString(36).substring(7);
    console.log(`[AuthGuard ${requestId}] === NEW REQUEST: ${request.method} ${request.url} ===`);
    console.log(`[AuthGuard ${requestId}] Incoming request cookies:`, Object.keys(request.cookies || {}));
    console.log(`[AuthGuard ${requestId}] Cookie header:`, request.headers['cookie']);

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
      console.log(`[AuthGuard ${requestId}] No access token found, checking for refresh token...`);
      // No access token at all, try refresh if available
      if (request.cookies?.['refresh_token']) {
        const refreshToken = request.cookies['refresh_token'];
        console.log(`[AuthGuard ${requestId}] Found refresh token, attempting automatic refresh...`);
        console.log(`[AuthGuard ${requestId}] Refresh token being used:`, refreshToken.substring(0, 20) + '...');
        const refreshResult = await this.refreshTokenAndSetCookies(refreshToken, response);
        if (refreshResult) {
          token = refreshResult.token;
          isFromCookie = true;
          console.log(`[AuthGuard ${requestId}] Successfully refreshed token via cookie`);
        } else {
          console.error(`[AuthGuard ${requestId}] Failed to refresh token, no valid session returned`);
        }
      } else {
        console.log(`[AuthGuard ${requestId}] No refresh token available`);
      }

      if (!token) {
        throw new UnauthorizedException('No authentication token provided');
      }
    }

    try {
      let user = await this.supabaseAuthService.getUserByToken(token);

      // If token is invalid/expired and we have refresh token (cookie-based auth only)
      if (!user && isFromCookie && request.cookies?.['refresh_token']) {
        console.log(`[AuthGuard ${requestId}] Token validation failed, attempting refresh with refresh token...`);
        const refreshToken = request.cookies['refresh_token'];
        console.log(`[AuthGuard ${requestId}] Refresh token being used:`, refreshToken.substring(0, 20) + '...');
        const refreshResult = await this.refreshTokenAndSetCookies(refreshToken, response);
        if (refreshResult) {
          token = refreshResult.token;
          user = refreshResult.user;
          console.log(`[AuthGuard ${requestId}] Successfully recovered from expired token via refresh`);
        } else {
          console.error(`[AuthGuard ${requestId}] Failed to recover from expired token, refresh failed`);
        }
      }

      if (!user) {
        console.error(`[AuthGuard ${requestId}] Authentication failed: no valid user after all attempts`);
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