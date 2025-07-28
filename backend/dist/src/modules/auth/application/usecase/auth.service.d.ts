import { SupabaseAuthService } from '../../infrastructure/adapter/out/supabase-auth.service';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
export declare class AuthService {
    private readonly supabaseAuthService;
    private readonly userRepository;
    constructor(supabaseAuthService: SupabaseAuthService, userRepository: UserRepository);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    logout(token: string): Promise<void>;
    getCurrentUser(token: string): Promise<{
        id: string;
        email: string;
        firstName: any;
        lastName: any;
    }>;
    signInWithGoogle(): Promise<{
        provider: import("@supabase/auth-js").Provider;
        url: string;
    } | {
        provider: import("@supabase/auth-js").Provider;
        url: null;
    }>;
    handleOAuthCallback(code: string): Promise<AuthResponseDto>;
}
