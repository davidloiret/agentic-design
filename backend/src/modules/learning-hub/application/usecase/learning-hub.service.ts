import { Injectable } from '@nestjs/common';
import { UserProgressRepository } from '../../infrastructure/persistence/user-progress.repository';
import { UserAchievementRepository } from '../../infrastructure/persistence/user-achievement.repository';
import { UserXpRepository, UserXpTransactionRepository } from '../../infrastructure/persistence/user-xp.repository';
import { UserStreakRepository } from '../../infrastructure/persistence/user-streak.repository';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { UserProgress } from '../../domain/entity/user-progress.entity';
import { UserAchievement, AchievementType } from '../../domain/entity/user-achievement.entity';
import { UserXp, UserXpTransaction, XpSource } from '../../domain/entity/user-xp.entity';
import { UserStreak } from '../../domain/entity/user-streak.entity';

@Injectable()
export class LearningHubService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly progressRepository: UserProgressRepository,
    private readonly achievementRepository: UserAchievementRepository,
    private readonly xpRepository: UserXpRepository,
    private readonly xpTransactionRepository: UserXpTransactionRepository,
    private readonly streakRepository: UserStreakRepository,
  ) {}

  async updateProgress(
    userId: string,
    courseId: string,
    lessonId: string,
    progressPercentage: number,
    timeSpent?: number,
  ): Promise<UserProgress> {
    console.log('[LearningHubService] updateProgress called:', {
      userId, courseId, lessonId, progressPercentage, timeSpent
    });

    // First try to find by internal ID, then by Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    console.log('[LearningHubService] User found:', user ? { id: user.id, email: user.email } : 'null');
    
    if (!user) {
      throw new Error('User not found');
    }

    let progress = await this.progressRepository.findByUserAndLesson(user.id, lessonId);
    console.log('[LearningHubService] Existing progress:', progress ? { id: progress.id, isCompleted: progress.isCompleted } : 'null');

    if (!progress) {
      console.log('[LearningHubService] Creating new progress...');
      progress = new UserProgress(user, courseId, lessonId, progressPercentage, timeSpent);
      await this.progressRepository.save(progress);
    } else {
      console.log('[LearningHubService] Updating existing progress...');
      progress.updateProgress(progressPercentage, timeSpent);
      await this.progressRepository.update(progress);
    }

    console.log('[LearningHubService] Progress saved, updating streak...');
    // Update streak
    await this.updateUserStreak(user.id);

    console.log('[LearningHubService] Checking achievements...');
    // Check for achievements and XP rewards
    await this.checkAndAwardAchievements(user.id, courseId, lessonId, progress);

    console.log('[LearningHubService] Update complete');
    return progress;
  }

  async getUserProgress(userId: string, courseId?: string): Promise<{
    progress: UserProgress[];
    courseProgress?: {
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
      totalTimeSpent: number;
    };
  }> {
    // Find user by internal ID or Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    
    if (!user) {
      throw new Error('User not found');
    }

    let progress: UserProgress[];
    let courseProgress;

    if (courseId) {
      progress = await this.progressRepository.findByUserAndCourse(user.id, courseId);
      courseProgress = await this.progressRepository.getUserCourseProgress(user.id, courseId);
    } else {
      progress = await this.progressRepository.findByUser(user.id);
    }

    return { progress, courseProgress };
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    // Find user by internal ID or Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    
    if (!user) {
      throw new Error('User not found');
    }

    return this.achievementRepository.findByUser(user.id);
  }

  async getUserXp(userId: string): Promise<{
    userXp: UserXp | null;
    transactions: UserXpTransaction[];
    xpBySource: { source: XpSource; total: number }[];
  }> {
    // Find user by internal ID or Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    
    if (!user) {
      throw new Error('User not found');
    }

    const userXp = await this.xpRepository.findByUser(user.id);
    const transactions = await this.xpTransactionRepository.findByUser(user.id, 20);
    const xpBySource = await this.xpTransactionRepository.getTotalXpBySource(user.id);

    return { userXp, transactions, xpBySource };
  }

  async getUserStreak(userId: string): Promise<UserStreak | null> {
    // Find user by internal ID or Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    
    if (!user) {
      throw new Error('User not found');
    }

    return this.streakRepository.findByUser(user.id);
  }

  async getLeaderboard(): Promise<{
    xpLeaderboard: UserXp[];
    streakLeaderboard: UserStreak[];
  }> {
    const xpLeaderboard = await this.xpRepository.getLeaderboard(10);
    const streakLeaderboard = await this.streakRepository.getTopStreaks(10);

    return { xpLeaderboard, streakLeaderboard };
  }

  async getUserStats(userId: string): Promise<{
    progress: UserProgress[];
    achievements: UserAchievement[];
    xp: UserXp | null;
    streak: UserStreak | null;
    recentTransactions: UserXpTransaction[];
  }> {
    // Find user by internal ID or Supabase ID
    let user = await this.userRepository.findById(userId);
    if (!user) {
      user = await this.userRepository.findBySupabaseId(userId);
    }
    
    if (!user) {
      throw new Error('User not found');
    }

    const [progress, achievements, xpData, streak] = await Promise.all([
      this.progressRepository.findByUser(user.id),
      this.achievementRepository.findByUser(user.id),
      this.getUserXp(userId), // This already handles user lookup
      this.streakRepository.findByUser(user.id),
    ]);

    return {
      progress,
      achievements,
      xp: xpData.userXp,
      streak,
      recentTransactions: xpData.transactions.slice(0, 5),
    };
  }

  private async updateUserStreak(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    let streak = await this.streakRepository.findByUser(userId);
    
    if (!streak) {
      streak = new UserStreak(user);
    }

    const previousStreak = streak.currentStreak;
    streak.updateStreak();
    
    if (!streak.id) {
      await this.streakRepository.save(streak);
    } else {
      await this.streakRepository.update(streak);
    }

    // Award streak achievements
    if (streak.currentStreak > previousStreak) {
      await this.checkStreakAchievements(userId, streak.currentStreak);
    }
  }

  private async checkAndAwardAchievements(
    userId: string,
    courseId: string,
    lessonId: string,
    progress: UserProgress,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    // First lesson completion
    const userProgress = await this.progressRepository.findByUser(userId);
    const completedLessons = userProgress.filter(p => p.isCompleted);
    
    if (completedLessons.length === 1 && !await this.achievementRepository.hasAchievement(userId, AchievementType.FIRST_LESSON)) {
      await this.awardAchievement(user, AchievementType.FIRST_LESSON, 'First Steps', 'Completed your first lesson!', 50);
    }

    // Lesson completion XP
    if (progress.isCompleted) {
      await this.awardXp(userId, 25, XpSource.LESSON_COMPLETION, lessonId, 'Lesson completed');
    }

    // Course completion
    const courseProgress = await this.progressRepository.getUserCourseProgress(userId, courseId);
    if (courseProgress.progressPercentage === 100) {
      const hasAchievement = await this.achievementRepository.hasAchievement(
        userId, 
        AchievementType.COURSE_COMPLETION, 
        { courseId }
      );
      
      if (!hasAchievement) {
        await this.awardAchievement(
          user, 
          AchievementType.COURSE_COMPLETION, 
          'Course Master', 
          'Completed an entire course!', 
          200,
          '🏆',
          { courseId }
        );
        await this.awardXp(userId, 100, XpSource.COURSE_COMPLETION, courseId, 'Course completed');
      }
    }
  }

  private async checkStreakAchievements(userId: string, currentStreak: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    const milestones = [7, 30, 100, 365];
    
    for (const milestone of milestones) {
      if (currentStreak >= milestone) {
        const hasAchievement = await this.achievementRepository.hasAchievement(
          userId,
          AchievementType.STREAK_MILESTONE,
          { days: milestone }
        );

        if (!hasAchievement) {
          await this.awardAchievement(
            user,
            AchievementType.STREAK_MILESTONE,
            `${milestone} Day Streak`,
            `Maintained a ${milestone}-day learning streak!`,
            milestone * 2,
            '🔥',
            { days: milestone }
          );
        }
      }
    }
  }

  private async awardAchievement(
    user: any,
    type: AchievementType,
    title: string,
    description: string,
    xpReward: number,
    icon?: string,
    metadata?: object,
  ): Promise<void> {
    const achievement = new UserAchievement(user, type, title, description, xpReward, icon, metadata);
    await this.achievementRepository.save(achievement);

    if (xpReward > 0) {
      await this.awardXp(user.id, xpReward, XpSource.ACHIEVEMENT_UNLOCK, achievement.id, `Achievement: ${title}`);
    }
  }

  private async awardXp(
    userId: string,
    amount: number,
    source: XpSource,
    sourceId?: string,
    description?: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    // Get or create user XP record
    let userXp = await this.xpRepository.findByUser(userId);
    if (!userXp) {
      userXp = new UserXp(user);
      await this.xpRepository.save(userXp);
    }

    const previousLevel = userXp.level;
    userXp.addXp(amount);
    await this.xpRepository.update(userXp);

    // Create transaction record
    const transaction = new UserXpTransaction(user, amount, source, sourceId, description);
    await this.xpTransactionRepository.save(transaction);

    // Check for level-up achievements
    if (userXp.level > previousLevel) {
      await this.checkXpMilestoneAchievements(userId, userXp.totalXp, userXp.level);
    }
  }

  private async checkXpMilestoneAchievements(userId: string, totalXp: number, level: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    const xpMilestones = [1000, 5000, 10000, 25000, 50000];
    const levelMilestones = [10, 25, 50, 100];

    // XP milestones
    for (const milestone of xpMilestones) {
      if (totalXp >= milestone) {
        const hasAchievement = await this.achievementRepository.hasAchievement(
          userId,
          AchievementType.XP_MILESTONE,
          { xp: milestone }
        );

        if (!hasAchievement) {
          await this.awardAchievement(
            user,
            AchievementType.XP_MILESTONE,
            `${milestone} XP Master`,
            `Earned ${milestone} total experience points!`,
            milestone / 10,
            '⭐',
            { xp: milestone }
          );
        }
      }
    }

    // Level milestones
    for (const milestone of levelMilestones) {
      if (level >= milestone) {
        const hasAchievement = await this.achievementRepository.hasAchievement(
          userId,
          AchievementType.XP_MILESTONE,
          { level: milestone }
        );

        if (!hasAchievement) {
          await this.awardAchievement(
            user,
            AchievementType.XP_MILESTONE,
            `Level ${milestone} Expert`,
            `Reached level ${milestone}!`,
            milestone * 10,
            '🎯',
            { level: milestone }
          );
        }
      }
    }
  }
}