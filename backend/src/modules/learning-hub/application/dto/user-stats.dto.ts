import { UserProgress } from '../../domain/entity/user-progress.entity';
import { UserAchievement } from '../../domain/entity/user-achievement.entity';
import { UserXp, UserXpTransaction } from '../../domain/entity/user-xp.entity';
import { UserStreak } from '../../domain/entity/user-streak.entity';

export class UserStatsResponseDto {
  progress: UserProgress[];
  achievements: UserAchievement[];
  xp: UserXp | null;
  streak: UserStreak | null;
  recentTransactions: UserXpTransaction[];
}

export class UserProgressResponseDto {
  progress: UserProgress[];
  courseProgress?: {
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalTimeSpent: number;
  };
}

export class UserXpResponseDto {
  userXp: UserXp | null;
  transactions: UserXpTransaction[];
  xpBySource: { source: string; total: number }[];
}

export class LeaderboardResponseDto {
  xpLeaderboard: UserXp[];
  streakLeaderboard: UserStreak[];
}