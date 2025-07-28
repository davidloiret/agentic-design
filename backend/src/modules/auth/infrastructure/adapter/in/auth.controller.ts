import { Controller, Post, Body, Get, Req, Res, HttpCode, HttpStatus, Query } from '@nestjs/common';
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
    const token = request.cookies?.['access_token'] || 
                  request.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }
    
    return this.authService.getCurrentUser(token);
  }

  @Public()
  @Get('google')
  async googleAuth(@Res() response: Response) {
    const { url } = await this.authService.signInWithGoogle();
    return response.redirect(url);
  }

  @Public()
  @Get('callback')
  async googleCallback(
    @Query('code') code: string,
    @Res() response: Response,
  ) {
    if (!code) {
      return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login?error=no_code`);
    }

    try {
      const result = await this.authService.handleOAuthCallback(code);
      
      // Set cookies before redirect
      const isProduction = process.env.NODE_ENV === 'production';
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax' as const,
        domain: isProduction ? undefined : 'localhost',
        path: '/',
      };

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

      console.log('Cookies set successfully, redirecting to frontend...');
      
      // Redirect to frontend callback page to handle the auth state
      return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?success=true`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?error=oauth_failed`);
    }
  }
}