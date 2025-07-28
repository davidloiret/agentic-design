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

    // Create user in our database
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

    // Get user from our database
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

    // Get user from our database
    const localUser = await this.userRepository.findBySupabaseId(user.id);

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

  async handleOAuthCallback(code: string): Promise<AuthResponseDto> {
    console.log('Processing OAuth callback with code:', code);
    
    const { user, session } = await this.supabaseAuthService.exchangeCodeForSession(code);
    console.log('Supabase session obtained for user:', user.email);

    // Check if user exists in our database, if not create them
    let localUser = await this.userRepository.findBySupabaseId(user.id);
    
    if (!localUser) {
      console.log('Creating new user in database for:', user.email);
      const newUser = new User(
        user.email,
        user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.firstName || '',
        user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.lastName || '',
        user.id
      );
      await this.userRepository.save(newUser);
      localUser = newUser;
    } else {
      console.log('Found existing user in database:', localUser.email);
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
}