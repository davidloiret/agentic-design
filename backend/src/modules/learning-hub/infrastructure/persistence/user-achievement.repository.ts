import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserAchievement, AchievementType } from '../../domain/entity/user-achievement.entity';
import { IUserAchievementRepository } from '../../domain/repository/user-achievement-repository.interface';

@Injectable()
export class UserAchievementRepository implements IUserAchievementRepository {
  constructor(
    @InjectRepository(UserAchievement)
    private readonly repository: EntityRepository<UserAchievement>,
  ) {}

  async findByUser(userId: string): Promise<UserAchievement[]> {
    return this.repository.find({ 
      user: userId 
    }, { 
      populate: ['user'],
      orderBy: { unlockedAt: 'DESC' }
    });
  }

  async findByUserAndType(userId: string, type: AchievementType, metadata?: object): Promise<UserAchievement | null> {
    const query: any = { user: userId, type };
    
    if (metadata) {
      query.metadata = JSON.stringify(metadata);
    }
    
    return this.repository.findOne(query, { 
      populate: ['user']
    });
  }

  async hasAchievement(userId: string, type: AchievementType, metadata?: object): Promise<boolean> {
    const query: any = { user: userId, type };
    
    if (metadata) {
      query.metadata = JSON.stringify(metadata);
    }

    const achievement = await this.repository.findOne(query);
    return !!achievement;
  }

  async save(achievement: UserAchievement): Promise<UserAchievement> {
    await this.repository.getEntityManager().persistAndFlush(achievement);
    return achievement;
  }

  async update(achievement: UserAchievement): Promise<UserAchievement> {
    await this.repository.getEntityManager().flush();
    return achievement;
  }

  async delete(id: string): Promise<void> {
    const achievement = await this.repository.findOne({ id });
    if (achievement) {
      await this.repository.getEntityManager().removeAndFlush(achievement);
    }
  }

  async getRecentAchievements(userId: string, limit: number = 10): Promise<UserAchievement[]> {
    return this.repository.find({ 
      user: userId 
    }, { 
      populate: ['user'],
      orderBy: { unlockedAt: 'DESC' },
      limit
    });
  }

  async countByType(userId: string, type: AchievementType): Promise<number> {
    return this.repository.count({ 
      user: userId, 
      type,
      unlockedAt: { $ne: null }
    });
  }
}