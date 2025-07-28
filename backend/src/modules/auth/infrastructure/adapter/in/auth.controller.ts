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
    
    if (!token) {
      return null;
    }
    
    const user = await this.authService.getCurrentUser(token);
    
    return user;
  }

  @Public()
  @Get('google')
  async googleAuth(@Res() response: Response) {
    const { url } = await this.authService.signInWithGoogle();
    return response.redirect(url);
  }

  @Public()
  @Get('github')
  async githubAuth(@Res() response: Response) {
    const { url } = await this.authService.signInWithGitHub();
    return response.redirect(url);
  }

  @Public()
  @Get('callback')
  async googleCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Res() response: Response,
  ) {
    if (!code) {
      return response.redirect(`${process.env.FRONTEND_URL || 'https://agentic-design.ai'}/auth/login?error=no_code`);
    }

    try {
      const result = await this.authService.handleOAuthCallback(code);
      
      const frontendUrl = process.env.FRONTEND_URL || 'https://agentic-design.ai';
      const callbackUrl = new URL('/auth/callback', frontendUrl);
      callbackUrl.searchParams.set('access_token', result.access_token);
      if (result.refresh_token) {
        callbackUrl.searchParams.set('refresh_token', result.refresh_token);
      }
      
      return response.redirect(callbackUrl.toString());
    } catch (error) {
      return response.redirect(`${process.env.FRONTEND_URL || 'https://agentic-design.ai'}/auth/callback?error=oauth_failed`);
    }
  }

  @Public()
  @Post('callback/complete')
  async completeOAuthCallback(
    @Body() body: { access_token: string; refresh_token?: string },
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {    
    if (!body.access_token) {
      throw new BadRequestException('Access token is required');
    }

    try {
      const user = await this.authService.getCurrentUser(body.access_token);
      if (!user) {
        throw new UnauthorizedException('Invalid access token');
      }

      // Set cookies
      const cookieOptions = getCookieOptions();

      response.cookie('access_token', body.access_token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      
      if (body.refresh_token) {
        response.cookie('refresh_token', body.refresh_token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }
      
      response.status(HttpStatus.OK);
      return { success: true, user };
    } catch (error) {
      console.error('[OAuth Complete] Error:', error);
      throw error;
    }
  }
}