import { Injectable, ConflictException, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient, Provider, AuthError } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseAuthService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: false,
        persistSession: false,
        autoRefreshToken: false,  // Disable auto-refresh since we handle it manually
        debug: process.env.NODE_ENV !== 'production',  // Enable debug logging in development
      },
    });

    this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }

  private handleAuthError(error: AuthError): never {
    switch (error.message) {
      case 'User already registered':
      case 'User with this email already exists':
        throw new ConflictException('A user with this email already exists');
      
      case 'Invalid login credentials':
        throw new UnauthorizedException('Invalid email or password');
      
      case 'Email not confirmed':
        throw new UnauthorizedException('Please check your email and click the confirmation link to activate your account');
      
      case 'Password should be at least 6 characters':
        throw new BadRequestException('Password must be at least 6 characters long');
      
      case 'Unable to validate email address: invalid format':
        throw new BadRequestException('Invalid email format');
      
      case 'User not found':
        throw new NotFoundException('User not found');
      
      case 'Token has expired or is invalid':
        throw new UnauthorizedException('Token has expired or is invalid');
      
      default:
        if (error.status === 422) {
          throw new BadRequestException(error.message || 'Invalid request data');
        }
        if (error.status === 401) {
          throw new UnauthorizedException(error.message || 'Authentication failed');
        }
        if (error.status === 409) {
          throw new ConflictException(error.message || 'Resource conflict');
        }
        
        console.error('Unhandled Supabase auth error:', error);
        throw new BadRequestException(error.message || 'Authentication error occurred');
    }
  }

  async signUp(email: string, password: string, userData?: any) {
    console.log(`[SupabaseAuth] Attempting sign up for: ${email}`);
    
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://agentic-design.ai';
    
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${frontendUrl}/auth/callback`,
      },
    });

    if (error) {
      console.error(`[SupabaseAuth] Sign up error for ${email}:`, {
        message: error.message,
        status: error.status,
        code: error.code || 'unknown'
      });
      this.handleAuthError(error);
    }

    console.log(`[SupabaseAuth] Sign up result for ${email}:`, {
      userId: data.user?.id,
      confirmed: data.user?.email_confirmed_at ? 'confirmed' : 'pending',
      sessionExists: !!data.session
    });
    
    return data;
  }

  async signIn(email: string, password: string) {
    console.log(`[SupabaseAuth] Attempting sign in for: ${email}`);
    
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(`[SupabaseAuth] Sign in error for ${email}:`, {
        message: error.message,
        status: error.status,
        code: error.code || 'unknown'
      });
      this.handleAuthError(error);
    }

    console.log(`[SupabaseAuth] Sign in successful for: ${email}`);
    console.log(`[SupabaseAuth] Session refresh_token length: ${data.session?.refresh_token?.length}`);
    console.log(`[SupabaseAuth] Session refresh_token (first 50 chars): ${data.session?.refresh_token?.substring(0, 50)}...`);
    console.log(`[SupabaseAuth] Full refresh_token: ${data.session?.refresh_token}`);
    return data;
  }

  async signOut(token: string) {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      this.handleAuthError(error);
    }
    
    return true;
  }

  async getUserByToken(token: string) {
    try {
      console.log('[SupabaseAuth] Validating token:', token.substring(0, 20) + '...');
      const { data, error } = await this.supabaseAdmin.auth.getUser(token);

      if (error) {
        console.error('[SupabaseAuth] Token validation error:', {
          message: error.message,
          status: error.status,
          code: error.code,
          tokenPrefix: token.substring(0, 20),
        });

        if (error.message?.includes('invalid') ||
            error.message?.includes('expired') ||
            error.message?.includes('malformed') ||
            error.status === 401) {
          return null;
        }

        this.handleAuthError(error);
      }

      if (!data?.user) {
        console.error('[SupabaseAuth] No user returned for token');
        return null;
      }

      console.log('[SupabaseAuth] Token validated successfully for user:', data.user.email);
      return data.user;
    } catch (error) {
      console.error('[SupabaseAuth] Unexpected error in getUserByToken:', error);
      return null;
    }
  }

  async refreshSession(refreshToken: string) {
    try {
      console.log('[SupabaseAuth] Attempting to refresh session with token:', refreshToken.substring(0, 20) + '...');

      const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });

      if (error) {
        console.error('[SupabaseAuth] Refresh session error from Supabase:', {
          message: error.message,
          status: error.status,
          code: error.code,
          details: error,
        });
        this.handleAuthError(error);
      }

      if (!data?.session) {
        console.error('[SupabaseAuth] No session returned from refresh, data:', data);
        throw new UnauthorizedException('No session returned from refresh');
      }

      console.log('[SupabaseAuth] Session refreshed successfully for user:', data.user?.email);
      return data;
    } catch (error) {
      console.error('[SupabaseAuth] Unexpected error in refreshSession:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Failed to refresh authentication session');
    }
  }

  async signInWithGoogle() {
    const backendUrl = this.configService.get<string>('BACKEND_URL') || 
                      `http://localhost:${this.configService.get<number>('PORT') || 3001}`;
    
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${backendUrl}/api/v1/auth/callback`,
      },
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async signInWithGitHub() {
    // Get the backend URL for OAuth callback
    const backendUrl = this.configService.get<string>('BACKEND_URL') || 
                      `http://localhost:${this.configService.get<number>('PORT') || 3001}`;
    
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${backendUrl}/api/v1/auth/callback`,
      },
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async exchangeCodeForSession(code: string) {
    const { data, error } = await this.supabase.auth.exchangeCodeForSession(code);

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async resetPasswordForEmail(email: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3002';
    
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${frontendUrl}/auth/reset-password`,
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async updatePassword(accessToken: string, newPassword: string) {
    // First get the user from the access token
    const { data: userData, error: userError } = await this.supabaseAdmin.auth.getUser(accessToken);
    
    if (userError || !userData.user) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    // Update the user's password using their ID
    const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(
      userData.user.id,
      { password: newPassword }
    );

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async verifyOtp(email: string, token: string, type: 'recovery') {
    const { data, error } = await this.supabase.auth.verifyOtp({
      email,
      token,
      type,
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async resendConfirmationEmail(email: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'https://agentic-design.ai';
    
    const { data, error } = await this.supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${frontendUrl}/auth/callback`,
      },
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }
}