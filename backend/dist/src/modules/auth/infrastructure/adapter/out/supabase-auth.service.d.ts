import { Provider } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
export declare class SupabaseAuthService {
    private configService;
    private supabase;
    private supabaseAdmin;
    constructor(configService: ConfigService);
    private handleAuthError;
    signUp(email: string, password: string, userData?: any): Promise<{
        user: import("@supabase/supabase-js").AuthUser | null;
        session: import("@supabase/supabase-js").AuthSession | null;
    } | {
        user: null;
        session: null;
    }>;
    signIn(email: string, password: string): Promise<{
        user: import("@supabase/supabase-js").AuthUser;
        session: import("@supabase/supabase-js").AuthSession;
        weakPassword?: import("@supabase/supabase-js").WeakPassword;
    } | {
        user: null;
        session: null;
        weakPassword?: null;
    }>;
    signOut(token: string): Promise<boolean>;
    getUserByToken(token: string): Promise<import("@supabase/supabase-js").AuthUser>;
    refreshSession(refreshToken: string): Promise<{
        user: import("@supabase/supabase-js").AuthUser | null;
        session: import("@supabase/supabase-js").AuthSession | null;
    } | {
        user: null;
        session: null;
    }>;
    signInWithGoogle(): Promise<{
        provider: Provider;
        url: string;
    } | {
        provider: Provider;
        url: null;
    }>;
    exchangeCodeForSession(code: string): Promise<{
        user: import("@supabase/supabase-js").AuthUser;
        session: import("@supabase/supabase-js").AuthSession;
    } | {
        user: null;
        session: null;
    }>;
}
