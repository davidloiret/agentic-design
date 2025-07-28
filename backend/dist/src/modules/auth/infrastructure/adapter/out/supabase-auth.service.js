"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseAuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
let SupabaseAuthService = class SupabaseAuthService {
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseAnonKey = this.configService.get('SUPABASE_ANON_KEY');
        const supabaseServiceKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
            throw new Error('Missing Supabase environment variables');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
            auth: {
                flowType: 'pkce',
                detectSessionInUrl: false,
                persistSession: false,
            },
        });
        this.supabaseAdmin = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
    }
    handleAuthError(error) {
        switch (error.message) {
            case 'User already registered':
            case 'User with this email already exists':
                throw new common_1.ConflictException('A user with this email already exists');
            case 'Invalid login credentials':
            case 'Email not confirmed':
                throw new common_1.UnauthorizedException('Invalid email or password');
            case 'Password should be at least 6 characters':
                throw new common_1.BadRequestException('Password must be at least 6 characters long');
            case 'Unable to validate email address: invalid format':
                throw new common_1.BadRequestException('Invalid email format');
            case 'User not found':
                throw new common_1.NotFoundException('User not found');
            case 'Token has expired or is invalid':
                throw new common_1.UnauthorizedException('Token has expired or is invalid');
            default:
                if (error.status === 422) {
                    throw new common_1.BadRequestException(error.message || 'Invalid request data');
                }
                if (error.status === 401) {
                    throw new common_1.UnauthorizedException(error.message || 'Authentication failed');
                }
                if (error.status === 409) {
                    throw new common_1.ConflictException(error.message || 'Resource conflict');
                }
                console.error('Unhandled Supabase auth error:', error);
                throw new common_1.BadRequestException(error.message || 'Authentication error occurred');
        }
    }
    async signUp(email, password, userData) {
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
    async signIn(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            this.handleAuthError(error);
        }
        return data;
    }
    async signOut(token) {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            this.handleAuthError(error);
        }
        return true;
    }
    async getUserByToken(token) {
        try {
            const { data, error } = await this.supabaseAdmin.auth.getUser(token);
            if (error) {
                console.error('Token validation error:', error);
                if (error.message?.includes('invalid') ||
                    error.message?.includes('expired') ||
                    error.message?.includes('malformed') ||
                    error.status === 401) {
                    return null;
                }
                this.handleAuthError(error);
            }
            return data.user;
        }
        catch (error) {
            console.error('Unexpected error in getUserByToken:', error);
            return null;
        }
    }
    async refreshSession(refreshToken) {
        try {
            const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });
            if (error) {
                this.handleAuthError(error);
            }
            return data;
        }
        catch (error) {
            console.error('Unexpected error in refreshSession:', error);
            throw new common_1.UnauthorizedException('Failed to refresh authentication session');
        }
    }
    async signInWithGoogle() {
        const backendUrl = this.configService.get('BACKEND_URL') ||
            `http://localhost:${this.configService.get('PORT') || 3001}`;
        const { data, error } = await this.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${backendUrl}/api/v1/auth/callback`,
            },
        });
        console.log('[Supabase] OAuth redirect URL:', `${backendUrl}/api/v1/auth/callback`);
        if (error) {
            this.handleAuthError(error);
        }
        return data;
    }
    async exchangeCodeForSession(code) {
        const { data, error } = await this.supabase.auth.exchangeCodeForSession(code);
        if (error) {
            this.handleAuthError(error);
        }
        return data;
    }
};
exports.SupabaseAuthService = SupabaseAuthService;
exports.SupabaseAuthService = SupabaseAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseAuthService);
//# sourceMappingURL=supabase-auth.service.js.map