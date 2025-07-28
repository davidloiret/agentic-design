import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/entity/user.entity';
import { IUserRepository } from '../../domain/repository/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ id });
  }

  async findBySupabaseId(supabaseId: string): Promise<User | null> {
    return this.repository.findOne({ supabaseId });
  }

  async save(user: User): Promise<User> {
    await this.repository.getEntityManager().persistAndFlush(user);
    return user;
  }

  async update(user: User): Promise<User> {
    await this.repository.getEntityManager().flush();
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await this.repository.getEntityManager().removeAndFlush(user);
    }
  }
}