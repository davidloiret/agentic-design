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
    domain: isProduction ? '.agentic-design.ai' : 'localhost',
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
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
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
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
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
    
    const cookieOptions = getCookieOptions();
    response.clearCookie('access_token', cookieOptions);
    response.clearCookie('refresh_token', cookieOptions);
    
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
        maxAge: 60 * 60 * 1000, // 1 hour
      });
      
      if (body.refresh_token) {
        response.cookie('refresh_token', body.refresh_token, {
          ...cookieOptions,
          maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
        });
      }
      
      response.status(HttpStatus.OK);
      return { success: true, user };
    } catch (error) {
      console.error('[OAuth Complete] Error:', error);
      throw error;
    }
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() body: { email: string }) {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }

    await this.authService.resetPasswordForEmail(body.email);
    
    return { 
      message: 'If an account exists with this email, a password reset link has been sent.' 
    };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() body: { password: string; access_token?: string },
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = body.access_token || 
                       request.cookies?.['access_token'] || 
                       request.headers.authorization?.replace('Bearer ', '');
    
    if (!accessToken) {
      throw new BadRequestException('Access token is required');
    }

    if (!body.password) {
      throw new BadRequestException('New password is required');
    }

    const result = await this.authService.updatePassword(accessToken, body.password);
    
    // Clear cookies after password reset for security
    const cookieOptions = getCookieOptions();
    response.clearCookie('access_token', cookieOptions);
    response.clearCookie('refresh_token', cookieOptions);
    
    return { 
      message: 'Password has been reset successfully. Please login with your new password.' 
    };
  }

  @Public()
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() body: { email: string; token: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!body.email || !body.token) {
      throw new BadRequestException('Email and token are required');
    }

    const result = await this.authService.verifyOtp(body.email, body.token);
    
    const cookieOptions = getCookieOptions();

    response.cookie('access_token', result.access_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      });
    }
    
    return result;
  }

  @Public()
  @Post('exchange-reset-code')
  @HttpCode(HttpStatus.OK)
  async exchangeResetCode(
    @Body() body: { code: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!body.code) {
      throw new BadRequestException('Reset code is required');
    }

    const result = await this.authService.handleOAuthCallback(body.code);
    
    const cookieOptions = getCookieOptions();

    // Set cookies for password reset flow
    response.cookie('access_token', result.access_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    
    if (result.refresh_token) {
      response.cookie('refresh_token', result.refresh_token, {
        ...cookieOptions,
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      });
    }
    
    return { 
      success: true,
      message: 'Code exchanged successfully' 
    };
  }

  // Mobile-specific endpoints that return tokens instead of setting cookies
  @Public()
  @Post('mobile/login')
  @HttpCode(HttpStatus.OK)
  async mobileLogin(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    // Return tokens directly for mobile apps
    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      user: result.user,
      expires_in: 24 * 60 * 60, // 1 day in seconds
    };
  }

  @Public()
  @Post('mobile/register')
  async mobileRegister(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    // Return tokens directly for mobile apps
    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      user: result.user,
      expires_in: 24 * 60 * 60, // 1 day in seconds
    };
  }

  @Public()
  @Post('mobile/refresh')
  @HttpCode(HttpStatus.OK)
  async mobileRefresh(@Body() body: { refresh_token: string }) {
    if (!body.refresh_token) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const result = await this.authService.refreshSession(body.refresh_token);
      if (!result?.session) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        access_token: result.session.access_token,
        refresh_token: result.session.refresh_token,
        expires_in: 30 * 24 * 60 * 60, // 30 days in seconds
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }
  }

  @Public()
  @Get('mobile/google')
  async mobileGoogleAuth() {
    const { url } = await this.authService.signInWithGoogle();
    return { url };
  }

  @Public()
  @Get('mobile/github')
  async mobileGithubAuth() {
    const { url } = await this.authService.signInWithGitHub();
    return { url };
  }

  @Public()
  @Post('mobile/oauth/callback')
  async mobileOAuthCallback(@Body() body: { code: string }) {
    if (!body.code) {
      throw new BadRequestException('Authorization code is required');
    }

    try {
      const result = await this.authService.handleOAuthCallback(body.code);
      
      return {
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        user: result.user,
        expires_in: 30 * 24 * 60 * 60, // 30 days in seconds
      };
    } catch (error) {
      throw new BadRequestException('OAuth callback failed');
    }
  }

  @Public()
  @Post('resend-confirmation')
  @HttpCode(HttpStatus.OK)
  async resendConfirmation(@Body() body: { email: string }) {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }

    await this.authService.resendConfirmationEmail(body.email);
    
    return { 
      message: 'If an account exists with this email, a confirmation link has been sent.' 
    };
  }
}