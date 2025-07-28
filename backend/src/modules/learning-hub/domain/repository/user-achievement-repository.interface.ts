import { UserAchievement, AchievementType } from '../entity/user-achievement.entity';

export interface IUserAchievementRepository {
  findByUser(userId: string): Promise<UserAchievement[]>;
  findByUserAndType(userId: string, type: AchievementType): Promise<UserAchievement[]>;
  hasAchievement(userId: string, type: AchievementType, metadata?: object): Promise<boolean>;
  save(achievement: UserAchievement): Promise<UserAchievement>;
  delete(id: string): Promise<void>;
  getRecentAchievements(userId: string, limit?: number): Promise<UserAchievement[]>;
}