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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const nestjs_1 = require("@mikro-orm/nestjs");
const user_entity_1 = require("../../domain/entity/user.entity");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByEmail(email) {
        return this.repository.findOne({ email });
    }
    async findById(id) {
        return this.repository.findOne({ id });
    }
    async findBySupabaseId(supabaseId) {
        return this.repository.findOne({ supabaseId });
    }
    async save(user) {
        await this.repository.getEntityManager().persistAndFlush(user);
        return user;
    }
    async update(user) {
        await this.repository.getEntityManager().flush();
        return user;
    }
    async delete(id) {
        const user = await this.findById(id);
        if (user) {
            await this.repository.getEntityManager().removeAndFlush(user);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map