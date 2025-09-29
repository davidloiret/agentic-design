import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserStreak } from '../../domain/entity/user-streak.entity';
import { IUserStreakRepository } from '../../domain/repository/user-streak-repository.interface';

@Injectable()
export class UserStreakRepository implements IUserStreakRepository {
  constructor(
    @InjectRepository(UserStreak)
    private readonly repository: EntityRepository<UserStreak>,
  ) {}

  async findByUser(userId: string): Promise<UserStreak | null> {
    return this.repository.findOne({ 
      user: userId 
    }, { populate: ['user'] });
  }

  async save(streak: UserStreak): Promise<UserStreak> {
    await this.repository.getEntityManager().persistAndFlush(streak);
    return streak;
  }

  async update(streak: UserStreak): Promise<UserStreak> {
    // Merge the entity to ensure it's managed by the current entity manager
    const em = this.repository.getEntityManager();
    em.persist(streak);
    await em.flush();
    return streak;
  }

  async delete(id: string): Promise<void> {
    const streak = await this.repository.findOne({ id });
    if (streak) {
      await this.repository.getEntityManager().removeAndFlush(streak);
    }
  }

  async getTopStreaks(limit: number = 10): Promise<UserStreak[]> {
    return this.repository.find({}, {
      populate: ['user'],
      orderBy: { currentStreak: 'DESC' },
      limit
    });
  }
}