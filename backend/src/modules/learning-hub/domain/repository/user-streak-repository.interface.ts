import { UserStreak } from '../entity/user-streak.entity';

export interface IUserStreakRepository {
  findByUser(userId: string): Promise<UserStreak | null>;
  save(streak: UserStreak): Promise<UserStreak>;
  update(streak: UserStreak): Promise<UserStreak>;
  delete(id: string): Promise<void>;
  getTopStreaks(limit?: number): Promise<UserStreak[]>;
}