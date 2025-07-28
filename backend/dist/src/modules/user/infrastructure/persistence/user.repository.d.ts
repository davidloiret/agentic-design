import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../../domain/entity/user.entity';
import { IUserRepository } from '../../domain/repository/user-repository.interface';
export declare class UserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: EntityRepository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findBySupabaseId(supabaseId: string): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}
