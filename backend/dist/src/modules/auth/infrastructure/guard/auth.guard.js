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
exports.AuthGuard = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const supabase_auth_service_1 = require("../adapter/out/supabase-auth.service");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
let AuthGuard = class AuthGuard {
    constructor(supabaseAuthService, reflector) {
        this.supabaseAuthService = supabaseAuthService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(exports.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        let token = request.cookies?.['access_token'];
        if (!token) {
            const authHeader = request.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        if (!token && request.cookies?.['refresh_token']) {
            const refreshToken = request.cookies['refresh_token'];
            const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);
            if (refreshResult?.session?.access_token) {
                token = refreshResult.session.access_token;
                const response = context.switchToHttp().getResponse();
                response.cookie('access_token', refreshResult.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000,
                });
                if (refreshResult.session.refresh_token) {
                    response.cookie('refresh_token', refreshResult.session.refresh_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                }
            }
        }
        if (!token) {
            throw new common_1.UnauthorizedException('No authentication token provided');
        }
        try {
            let user = await this.supabaseAuthService.getUserByToken(token);
            if (!user && request.cookies?.['refresh_token']) {
                const refreshToken = request.cookies['refresh_token'];
                const refreshResult = await this.supabaseAuthService.refreshSession(refreshToken);
                if (refreshResult?.session?.access_token) {
                    token = refreshResult.session.access_token;
                    user = refreshResult.user ?? refreshResult.session.user;
                    const response = context.switchToHttp().getResponse();
                    response.cookie('access_token', refreshResult.session.access_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    if (refreshResult.session.refresh_token) {
                        response.cookie('refresh_token', refreshResult.session.refresh_token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                    }
                }
            }
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid or expired authentication token');
            }
            request['user'] = user;
            return true;
        }
        catch (error) {
            const response = context.switchToHttp().getResponse();
            response.clearCookie('access_token');
            response.clearCookie('refresh_token');
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_auth_service_1.SupabaseAuthService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map