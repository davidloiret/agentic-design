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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../../application/usecase/auth.service");
const login_dto_1 = require("../../../application/dto/login.dto");
const register_dto_1 = require("../../../application/dto/register.dto");
const auth_guard_1 = require("../../guard/auth.guard");
function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        domain: isProduction ? undefined : 'localhost',
        path: '/',
    };
}
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, response) {
        const result = await this.authService.register(dto);
        const cookieOptions = getCookieOptions();
        response.cookie('access_token', result.access_token, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000,
        });
        if (result.refresh_token) {
            response.cookie('refresh_token', result.refresh_token, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }
        return result;
    }
    async login(dto, response) {
        const result = await this.authService.login(dto);
        const cookieOptions = getCookieOptions();
        response.cookie('access_token', result.access_token, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000,
        });
        if (result.refresh_token) {
            response.cookie('refresh_token', result.refresh_token, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }
        return result;
    }
    async logout(request, response) {
        const token = request.cookies?.['access_token'] ||
            request.headers.authorization?.replace('Bearer ', '');
        if (token) {
            await this.authService.logout(token);
        }
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        return { message: 'Logged out successfully' };
    }
    async getCurrentUser(request) {
        console.log('[/me] Request received');
        console.log('[/me] Cookies:', JSON.stringify(request.cookies));
        console.log('[/me] Headers:', {
            origin: request.headers.origin,
            authorization: request.headers.authorization,
            cookie: request.headers.cookie,
        });
        const token = request.cookies?.['access_token'] ||
            request.headers.authorization?.replace('Bearer ', '');
        console.log('[/me] Token found:', token ? 'Yes' : 'No');
        console.log('[/me] Token source:', request.cookies?.['access_token'] ? 'Cookie' :
            request.headers.authorization ? 'Header' : 'None');
        if (!token) {
            console.log('[/me] No token found, returning null');
            return null;
        }
        console.log('[/me] Fetching user with token...');
        const user = await this.authService.getCurrentUser(token);
        console.log('[/me] User found:', user ? user.email : 'None');
        return user;
    }
    async googleAuth(response) {
        console.log('[OAuth] Starting Google OAuth flow');
        const { url } = await this.authService.signInWithGoogle();
        console.log('[OAuth] Redirecting to Google:', url);
        return response.redirect(url);
    }
    async googleCallback(code, error, response) {
        console.log('[OAuth] Received callback from Google');
        console.log('[OAuth] Code:', code ? 'Present' : 'Missing');
        console.log('[OAuth] Error:', error || 'None');
        if (!code) {
            console.log('[OAuth] No authorization code received');
            return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login?error=no_code`);
        }
        try {
            console.log('[OAuth] Exchanging code for tokens...');
            const result = await this.authService.handleOAuthCallback(code);
            console.log('[OAuth] Token exchange successful');
            console.log('[OAuth] Access token length:', result.access_token?.length);
            console.log('[OAuth] Refresh token:', result.refresh_token ? 'Present' : 'Missing');
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            const callbackUrl = new URL('/auth/callback', frontendUrl);
            callbackUrl.searchParams.set('access_token', result.access_token);
            if (result.refresh_token) {
                callbackUrl.searchParams.set('refresh_token', result.refresh_token);
            }
            console.log('[OAuth] Redirecting to frontend:', callbackUrl.toString().substring(0, 100) + '...');
            return response.redirect(callbackUrl.toString());
        }
        catch (error) {
            console.error('[OAuth] Callback error:', error);
            return response.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?error=oauth_failed`);
        }
    }
    async completeOAuthCallback(body, request, response) {
        console.log('[OAuth Complete] Received request to set cookies');
        console.log('[OAuth Complete] Origin:', request.headers.origin);
        console.log('[OAuth Complete] Access token length:', body.access_token?.length);
        console.log('[OAuth Complete] Refresh token:', body.refresh_token ? 'Present' : 'Missing');
        if (!body.access_token) {
            console.log('[OAuth Complete] No access token provided');
            throw new common_1.BadRequestException('Access token is required');
        }
        try {
            console.log('[OAuth Complete] Verifying token...');
            const user = await this.authService.getCurrentUser(body.access_token);
            if (!user) {
                console.log('[OAuth Complete] Token validation failed - no user found');
                throw new common_1.UnauthorizedException('Invalid access token');
            }
            console.log('[OAuth Complete] Token valid, user:', user.email);
            const cookieOptions = getCookieOptions();
            console.log('[OAuth Complete] Cookie options:', JSON.stringify(cookieOptions));
            response.cookie('access_token', body.access_token, {
                ...cookieOptions,
                maxAge: 24 * 60 * 60 * 1000,
            });
            console.log('[OAuth Complete] Access token cookie set');
            if (body.refresh_token) {
                response.cookie('refresh_token', body.refresh_token, {
                    ...cookieOptions,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                console.log('[OAuth Complete] Refresh token cookie set');
            }
            console.log('[OAuth Complete] All cookies set successfully');
            return { success: true, user };
        }
        catch (error) {
            console.error('[OAuth Complete] Error:', error);
            throw error;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('error')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('callback/complete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "completeOAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map