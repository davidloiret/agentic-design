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
    
    // Client for OAuth flows (uses anon key with PKCE)
    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: false,
        persistSession: false,
      },
    });

    // Admin client for server operations (uses service key)
    this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }

  private handleAuthError(error: AuthError): never {
    // Handle specific Supabase error codes
    switch (error.message) {
      case 'User already registered':
      case 'User with this email already exists':
        throw new ConflictException('A user with this email already exists');
      
      case 'Invalid login credentials':
      case 'Email not confirmed':
        throw new UnauthorizedException('Invalid email or password');
      
      case 'Password should be at least 6 characters':
        throw new BadRequestException('Password must be at least 6 characters long');
      
      case 'Unable to validate email address: invalid format':
        throw new BadRequestException('Invalid email format');
      
      case 'User not found':
        throw new NotFoundException('User not found');
      
      case 'Token has expired or is invalid':
        throw new UnauthorizedException('Token has expired or is invalid');
      
      default:
        // For unknown errors, check the status code if available
        if (error.status === 422) {
          throw new BadRequestException(error.message || 'Invalid request data');
        }
        if (error.status === 401) {
          throw new UnauthorizedException(error.message || 'Authentication failed');
        }
        if (error.status === 409) {
          throw new ConflictException(error.message || 'Resource conflict');
        }
        
        // Log the original error for debugging
        console.error('Unhandled Supabase auth error:', error);
        throw new BadRequestException(error.message || 'Authentication error occurred');
    }
  }

  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) {
      this.handleAuthError(error);
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      this.handleAuthError(error);
    }

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
      // Use admin client for getting user data
      const { data, error } = await this.supabaseAdmin.auth.getUser(token);
      
      if (error) {
        // Log the error for debugging
        console.error('Token validation error:', error);
        
        // For token validation errors, return null instead of throwing
        if (error.message?.includes('invalid') || 
            error.message?.includes('expired') || 
            error.message?.includes('malformed') ||
            error.status === 401) {
          return null;
        }
        
        // For other errors, still throw
        this.handleAuthError(error);
      }
      
      return data.user;
    } catch (error) {
      // Log unexpected errors
      console.error('Unexpected error in getUserByToken:', error);
      return null;
    }
  }

  async refreshSession(refreshToken: string) {
    try {
      // Attempt to refresh the session using the provided refresh token
      const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });

      if (error) {
        this.handleAuthError(error);
      }

      return data; // data contains { session, user }
    } catch (error) {
      // Log unexpected errors
      console.error('Unexpected error in refreshSession:', error);
      throw new UnauthorizedException('Failed to refresh authentication session');
    }
  }

  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000'}/auth/callback`,
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
}