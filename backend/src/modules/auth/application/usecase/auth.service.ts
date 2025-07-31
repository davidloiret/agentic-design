import { Injectable } from '@nestjs/common';
import { SupabaseAuthService } from '../../infrastructure/adapter/out/supabase-auth.service';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { User } from '../../../user/domain/entity/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName } = dto;
    
    const { user, session } = await this.supabaseAuthService.signUp(email, password, {
      firstName,
      lastName,
    });

    const newUser = new User(email, firstName, lastName, user.id);
    await this.userRepository.save(newUser);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.firstName,
        lastName: user.user_metadata?.lastName,
      },
      access_token: session?.access_token,
      refresh_token: session?.refresh_token,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = dto;
    
    const { user, session } = await this.supabaseAuthService.signIn(email, password);

    const localUser = await this.userRepository.findBySupabaseId(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: localUser?.firstName || user.user_metadata?.firstName,
        lastName: localUser?.lastName || user.user_metadata?.lastName,
      },
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };
  }

  async logout(token: string): Promise<void> {
    await this.supabaseAuthService.signOut(token);
  }

  async getCurrentUser(token: string) {
    const user = await this.supabaseAuthService.getUserByToken(token);
    
    if (!user) {
      return null;
    }

    let localUser = await this.userRepository.findBySupabaseId(user.id);
    
    if (!localUser) {
      console.log('[Auth] User not found in local database, creating:', user.email);
      
      localUser = await this.userRepository.findByEmail(user.email);
      
      if (localUser) {
        localUser.supabaseId = user.id;
        await this.userRepository.update(localUser);
      } else {
        const newUser = new User(
          user.email,
          user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.firstName || user.email.split('@')[0],
          user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.lastName || '',
          user.id
        );
        await this.userRepository.save(newUser);
        localUser = newUser;
      }
    }

    return {
      id: user.id,
      email: user.email,
      firstName: localUser?.firstName || user.user_metadata?.firstName,
      lastName: localUser?.lastName || user.user_metadata?.lastName,
    };
  }

  async signInWithGoogle() {
    return await this.supabaseAuthService.signInWithGoogle();
  }

  async signInWithGitHub() {
    return await this.supabaseAuthService.signInWithGitHub();
  }

  async handleOAuthCallback(code: string): Promise<AuthResponseDto> {
    console.log('Processing OAuth callback with code:', code);
    
    const { user, session } = await this.supabaseAuthService.exchangeCodeForSession(code);
    console.log('Supabase session obtained for user:', user.email);

    let localUser = await this.userRepository.findBySupabaseId(user.id);
    
    if (!localUser) {
      localUser = await this.userRepository.findByEmail(user.email);
      
      if (localUser) {
        console.log('Found existing user by email, updating supabase ID:', user.email);
        localUser.supabaseId = user.id;
        if (!localUser.firstName && user.user_metadata?.full_name) {
          localUser.firstName = user.user_metadata.full_name.split(' ')[0] || '';
          localUser.lastName = user.user_metadata.full_name.split(' ').slice(1).join(' ') || '';
        }
        await this.userRepository.update(localUser);
      } else {
        console.log('Creating new user in database for:', user.email);
        const newUser = new User(
          user.email,
          user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.firstName || '',
          user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.lastName || '',
          user.id
        );
        await this.userRepository.save(newUser);
        localUser = newUser;
      }
    } else {
      console.log('Found existing user by supabase ID:', localUser.email);
    }

    const result = {
      user: {
        id: user.id,
        email: user.email,
        firstName: localUser.firstName || user.user_metadata?.firstName,
        lastName: localUser.lastName || user.user_metadata?.lastName,
      },
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };

    console.log('OAuth callback processed successfully for user:', user.email);
    return result;
  }

  async resetPasswordForEmail(email: string): Promise<void> {
    await this.supabaseAuthService.resetPasswordForEmail(email);
  }

  async updatePassword(accessToken: string, newPassword: string): Promise<any> {
    return await this.supabaseAuthService.updatePassword(accessToken, newPassword);
  }

  async verifyOtp(email: string, token: string): Promise<AuthResponseDto> {
    const { user, session } = await this.supabaseAuthService.verifyOtp(email, token, 'recovery');
    
    const localUser = await this.userRepository.findBySupabaseId(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: localUser?.firstName || user.user_metadata?.firstName,
        lastName: localUser?.lastName || user.user_metadata?.lastName,
      },
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };
  }

  async refreshSession(refreshToken: string): Promise<any> {
    return await this.supabaseAuthService.refreshSession(refreshToken);
  }

  async resendConfirmationEmail(email: string): Promise<void> {
    await this.supabaseAuthService.resendConfirmationEmail(email);
  }
}