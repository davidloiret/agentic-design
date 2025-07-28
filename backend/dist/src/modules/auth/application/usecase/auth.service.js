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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_auth_service_1 = require("../../infrastructure/adapter/out/supabase-auth.service");
const user_repository_1 = require("../../../user/infrastructure/persistence/user.repository");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
let AuthService = class AuthService {
    constructor(supabaseAuthService, userRepository) {
        this.supabaseAuthService = supabaseAuthService;
        this.userRepository = userRepository;
    }
    async register(dto) {
        const { email, password, firstName, lastName } = dto;
        const { user, session } = await this.supabaseAuthService.signUp(email, password, {
            firstName,
            lastName,
        });
        const newUser = new user_entity_1.User(email, firstName, lastName, user.id);
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
    async login(dto) {
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
    async logout(token) {
        await this.supabaseAuthService.signOut(token);
    }
    async getCurrentUser(token) {
        const user = await this.supabaseAuthService.getUserByToken(token);
        if (!user) {
            return null;
        }
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
    async handleOAuthCallback(code) {
        const { user, session } = await this.supabaseAuthService.exchangeCodeForSession(code);
        let localUser = await this.userRepository.findBySupabaseId(user.id);
        if (!localUser) {
            const newUser = new user_entity_1.User(user.email, user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.firstName || '', user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.lastName || '', user.id);
            await this.userRepository.save(newUser);
            localUser = newUser;
        }
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: localUser.firstName || user.user_metadata?.firstName,
                lastName: localUser.lastName || user.user_metadata?.lastName,
            },
            access_token: session.access_token,
            refresh_token: session.refresh_token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_auth_service_1.SupabaseAuthService,
        user_repository_1.UserRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map