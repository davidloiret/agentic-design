import { Injectable } from '@nestjs/common';
import { UserProgressRepository } from '../../infrastructure/persistence/user-progress.repository';
import { UserAchievementRepository } from '../../infrastructure/persistence/user-achievement.repository';
import { UserXpRepository, UserXpTransactionRepository } from '../../infrastructure/persistence/user-xp.repository';
import { UserStreakRepository } from '../../infrastructure/persistence/user-streak.repository';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { NotificationService } from '../../../notification/application/usecase/notification.service';
import { AchievementService } from './achievement.service';
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
    private readonly notificationService: NotificationService,
    private readonly achievementService: AchievementService,
  ) {}

  async updateProgress(
    userId: string,
    courseId: string,
    lessonId: string,
    progressPercentage: number,
    timeSpent?: number,
    xpEarned?: number,
  ): Promise<UserProgress> {
    console.log('[LearningHubService] updateProgress called:', {
      userId, courseId, lessonId, progressPercentage, timeSpent, xpEarned
    });

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let progress = await this.progressRepository.findByUserAndLesson(user.id, lessonId);

    if (!progress) {
      progress = new UserProgress(user, courseId, lessonId, progressPercentage, timeSpent);
      await this.progressRepository.save(progress);
    } else {
      progress.updateProgress(progressPercentage, timeSpent);
      await this.progressRepository.update(progress);
    }

    await this.updateUserStreak(user.id);

    await this.checkAndAwardAchievements(user.id, courseId, lessonId, progress, xpEarned);

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
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let progress: UserProgress[];
    let courseProgress: {
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
      totalTimeSpent: number;
    } | undefined;

    if (courseId) {
      progress = await this.progressRepository.findByUserAndCourse(user.id, courseId);
      courseProgress = await this.progressRepository.getUserCourseProgress(user.id, courseId);
    } else {
      progress = await this.progressRepository.findByUser(user.id);
    }

    return { progress, courseProgress };
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    const user = await this.userRepository.findById(userId);
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
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const userXp = await this.xpRepository.findByUser(user.id);
    const transactions = await this.xpTransactionRepository.findByUser(user.id, 20);
    const xpBySource = await this.xpTransactionRepository.getTotalXpBySource(user.id);

    return { userXp, transactions, xpBySource };
  }

  async getUserStreak(userId: string): Promise<UserStreak | null> {
    const user = await this.userRepository.findById(userId);
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
    const user = await this.userRepository.findById(userId);
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

    if (streak.currentStreak > previousStreak) {
      // Create streak notification
      const isNewRecord = streak.currentStreak > streak.longestStreak;
      await this.notificationService.createStreakNotification(
        user,
        streak.currentStreak,
        isNewRecord
      );
      
      await this.checkStreakAchievements(userId, streak.currentStreak);
    }
  }

  private async checkAndAwardAchievements(
    userId: string,
    courseId: string,
    lessonId: string,
    progress: UserProgress,
    xpEarned?: number,
  ): Promise<void> {
    console.log('[LearningHubService] Checking achievements for user:', userId);

    const userProgress = await this.progressRepository.findByUser(userId);
    const completedLessons = userProgress.filter(p => p.isCompleted);
    console.log('[LearningHubService] Completed lessons count:', completedLessons.length);

    // First lesson achievement
    if (completedLessons.length === 1) {
      await this.achievementService.checkAndUnlockAchievement(userId, AchievementType.FIRST_LESSON);
    }

    // Award XP for lesson completion
    if (progress.isCompleted) {
      // Use provided XP or default to 25
      const xpAmount = xpEarned ?? 25;
      await this.awardXp(userId, xpAmount, XpSource.LESSON_COMPLETION, lessonId, 'Lesson completed');
      
      // Check time-based achievements
      await this.achievementService.checkTimeBasedAchievements(userId, new Date());
      
      // Check daily achievements
      const today = new Date().toISOString().split('T')[0];
      const lessonsCompletedToday = completedLessons.filter(
        p => p.completedAt && p.completedAt.toISOString().split('T')[0] === today
      ).length;
      await this.achievementService.checkDailyAchievements(userId, lessonsCompletedToday);
    }

    // Course completion achievement
    const courseProgress = await this.progressRepository.getUserCourseProgress(userId, courseId);
    if (courseProgress.progressPercentage === 100) {
      await this.achievementService.checkAndUnlockAchievement(
        userId,
        AchievementType.COURSE_COMPLETION,
        { courseId }
      );
      await this.awardXp(userId, 100, XpSource.COURSE_COMPLETION, courseId, 'Course completed');
      
      // Check course-related achievements (e.g., speed demon)
      const courseStartTime = Math.min(...userProgress
        .filter(p => p.courseId === courseId)
        .map(p => p.createdAt.getTime())
      );
      const completionTime = Date.now() - courseStartTime;
      await this.achievementService.checkCourseAchievements(userId, courseId, completionTime);
    }
  }

  private async checkStreakAchievements(userId: string, currentStreak: number): Promise<void> {
    const milestones = [7, 30, 100, 365];
    
    for (const milestone of milestones) {
      if (currentStreak >= milestone) {
        await this.achievementService.checkAndUnlockAchievement(
          userId,
          AchievementType.STREAK_MILESTONE,
          { days: milestone },
          1
        );
      }
    }
  }


  async awardXp(
    userId: string,
    amount: number,
    source: XpSource,
    sourceId?: string,
    description?: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) return;

    let userXp = await this.xpRepository.findByUser(userId);
    if (!userXp) {
      userXp = new UserXp(user);
      await this.xpRepository.save(userXp);
    }

    const previousLevel = userXp.level;
    userXp.addXp(amount);
    await this.xpRepository.update(userXp);

    const transaction = new UserXpTransaction(user, amount, source, sourceId, description);
    await this.xpTransactionRepository.save(transaction);

    if (userXp.level > previousLevel) {
      // Create level up notification
      await this.notificationService.createLevelUpNotification(
        user,
        userXp.level,
        previousLevel,
        userXp.totalXp
      );
      
      await this.checkXpMilestoneAchievements(userId, userXp.totalXp, userXp.level);
    }
  }

  private async checkXpMilestoneAchievements(userId: string, totalXp: number, level: number): Promise<void> {
    const xpMilestones = [1000, 5000, 10000, 25000, 50000];
    const levelMilestones = [10, 25, 50, 100];

    for (const milestone of xpMilestones) {
      if (totalXp >= milestone) {
        await this.achievementService.checkAndUnlockAchievement(
          userId,
          AchievementType.XP_MILESTONE,
          { xp: milestone }
        );
      }
    }

    for (const milestone of levelMilestones) {
      if (level >= milestone) {
        await this.achievementService.checkAndUnlockAchievement(
          userId,
          AchievementType.XP_MILESTONE,
          { level: milestone }
        );
      }
    }
  }
}