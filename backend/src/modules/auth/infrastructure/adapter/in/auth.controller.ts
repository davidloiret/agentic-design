import { Controller, Post, Body, Get, Req, Res, HttpCode, HttpStatus, Query, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../../../application/usecase/auth.service';
import { LoginDto } from '../../../application/dto/login.dto';
import { RegisterDto } from '../../../application/dto/register.dto';
import { Public } from '../../guard/auth.guard';

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    domain: isProduction ? undefined : 'localhost',
    path: '/',
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(dto);
    
    // Set cookies with consistent options
    const cookieOptions = getCookieOptions();

    response.cookie('access_token', result.access_token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }
    
    return result;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto);
    
    // Set cookies with consistent options
    const cookieOptions = getCookieOptions();

    response.cookie('access_token', result.access_token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }
    
    return result;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = request.cookies?.['access_token'] || 
                  request.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      await this.authService.logout(token);
    }
    
    // Clear cookies
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  async getCurrentUser(@Req() request: Request) {
    console.log('[/me] Request received');
    console.log('[/me] Cookies:', JSON.stringify(request.cookies));
    console.log('[/me] Headers:', {
      origin: request.headers.origin,
      authorization: request.headers.authorization,
      cookie: request.headers.cookie,
    });
    
    const token = request.cookies?.['access_token'] || 
                  request.headers.authorization?.replace('Bearer ', '');
    
    console.log('[/me] Token found:', token ? 'Yes' : 'No');
    console.log('[/me] Token source:', request.cookies?.['access_token'] ? 'Cookie' : 
                  request.headers.authorization ? 'Header' : 'None');
    
    if (!token) {
      console.log('[/me] No token found, returning null');
      return null;
    }
    
    console.log('[/me] Fetching user with token...');
    const user = await this.authService.getCurrentUser(token);
    console.log('[/me] User found:', user ? user.email : 'None');
    
    return user;
  }

  @Public()
  @Get('google')
  async googleAuth(@Res() response: Response) {
    console.log('[OAuth] Starting Google OAuth flow');
    const { url } = await this.authService.signInWithGoogle();
    console.log('[OAuth] Redirecting to Google:', url);
    return response.redirect(url);
  }

  @Public()
  @Get('github')
  async githubAuth(@Res() response: Response) {
    console.log('[OAuth] Starting GitHub OAuth flow');
    const { url } = await this.authService.signInWithGitHub();
    console.log('[OAuth] Redirecting to GitHub:', url);
    return response.redirect(url);
  }

  @Public()
  @Get('callback')
  async googleCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Res() response: Response,
  ) {
    console.log('[OAuth] Received callback from Google');
    console.log('[OAuth] Code:', code ? 'Present' : 'Missing');
    console.log('[OAuth] Error:', error || 'None');
    
    if (!code) {
      console.log('[OAuth] No authorization code received');
      return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login?error=no_code`);
    }

    try {
      console.log('[OAuth] Exchanging code for tokens...');
      const result = await this.authService.handleOAuthCallback(code);
      console.log('[OAuth] Token exchange successful');
      console.log('[OAuth] Access token length:', result.access_token?.length);
      console.log('[OAuth] Refresh token:', result.refresh_token ? 'Present' : 'Missing');
      
      // Instead of setting cookies during redirect, pass tokens in URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const callbackUrl = new URL('/auth/callback', frontendUrl);
      callbackUrl.searchParams.set('access_token', result.access_token);
      if (result.refresh_token) {
        callbackUrl.searchParams.set('refresh_token', result.refresh_token);
      }
      
      console.log('[OAuth] Redirecting to frontend:', callbackUrl.toString().substring(0, 100) + '...');
      return response.redirect(callbackUrl.toString());
    } catch (error) {
      console.error('[OAuth] Callback error:', error);
      return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?error=oauth_failed`);
    }
  }

  @Public()
  @Post('callback/complete')
  async completeOAuthCallback(
    @Body() body: { access_token: string; refresh_token?: string },
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('[OAuth Complete] Received request to set cookies');
    console.log('[OAuth Complete] Origin:', request.headers.origin);
    console.log('[OAuth Complete] Access token length:', body.access_token?.length);
    console.log('[OAuth Complete] Refresh token:', body.refresh_token ? 'Present' : 'Missing');
    
    if (!body.access_token) {
      console.log('[OAuth Complete] No access token provided');
      throw new BadRequestException('Access token is required');
    }

    try {
      // Verify the token is valid by getting the user
      console.log('[OAuth Complete] Verifying token...');
      const user = await this.authService.getCurrentUser(body.access_token);
      if (!user) {
        console.log('[OAuth Complete] Token validation failed - no user found');
        throw new UnauthorizedException('Invalid access token');
      }
      console.log('[OAuth Complete] Token valid, user:', user.email);

      // Set cookies
      const cookieOptions = getCookieOptions();
      console.log('[OAuth Complete] Cookie options:', JSON.stringify(cookieOptions));

      response.cookie('access_token', body.access_token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      console.log('[OAuth Complete] Access token cookie set');
      
      if (body.refresh_token) {
        response.cookie('refresh_token', body.refresh_token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log('[OAuth Complete] Refresh token cookie set');
      }

      console.log('[OAuth Complete] All cookies set successfully');
      
      return { success: true, user };
    } catch (error) {
      console.error('[OAuth Complete] Error:', error);
      throw error;
    }
  }
}