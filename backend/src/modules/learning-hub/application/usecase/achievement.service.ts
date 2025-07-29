import { Injectable } from '@nestjs/common';
import { UserAchievementRepository } from '../../infrastructure/persistence/user-achievement.repository';
import { UserRepository } from '../../../user/infrastructure/persistence/user.repository';
import { NotificationService } from '../../../notification/application/usecase/notification.service';
import { UserAchievement, AchievementType, AchievementRarity } from '../../domain/entity/user-achievement.entity';
import { ACHIEVEMENT_DEFINITIONS, getAchievementDefinition } from '../../domain/achievement-definitions';
import { User } from '../../../user/domain/entity/user.entity';

export interface AchievementProgress {
  type: AchievementType;
  progress: number;
  maxProgress: number;
  percentage: number;
}

@Injectable()
export class AchievementService {
  constructor(
    private readonly achievementRepository: UserAchievementRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async checkAndUnlockAchievement(
    userId: string,
    type: AchievementType,
    metadata?: object,
    progressIncrement: number = 1,
  ): Promise<UserAchievement | null> {
    console.log('[AchievementService] Checking achievement:', { userId, type, metadata, progressIncrement });
    
    const user = await this.userRepository.findById(userId);
    if (!user) {
      console.log('[AchievementService] User not found:', userId);
      return null;
    }

    const definition = getAchievementDefinition(type);
    console.log('[AchievementService] Achievement definition:', definition);
    
    // Check if achievement already exists
    let achievement = await this.achievementRepository.findByUserAndType(userId, type, metadata);
    
    if (definition.isProgressBased) {
      if (!achievement) {
        // Create progress-based achievement
        achievement = new UserAchievement(
          user,
          type,
          definition.title,
          definition.description,
          definition.xpReward,
          definition.icon,
          metadata,
          definition.rarity,
          true,
          definition.maxProgress || 1,
        );
        achievement.progress = progressIncrement;
        await this.achievementRepository.save(achievement);
        
        // Notify progress
        await this.notifyAchievementProgress(user, achievement, definition);
        
        return achievement;
      } else if (!achievement.unlockedAt && achievement.progress < achievement.maxProgress) {
        // Update progress
        achievement.progress = Math.min(achievement.progress + progressIncrement, achievement.maxProgress);
        
        if (achievement.progress >= achievement.maxProgress) {
          // Unlock achievement
          achievement.unlockedAt = new Date();
          await this.unlockAchievement(user, achievement, definition);
        } else {
          // Notify progress update
          await this.notifyAchievementProgress(user, achievement, definition);
        }
        
        await this.achievementRepository.update(achievement);
        return achievement;
      }
    } else {
      // Non-progress based achievement
      if (!achievement) {
        achievement = new UserAchievement(
          user,
          type,
          definition.title,
          definition.description,
          definition.xpReward,
          definition.icon,
          metadata,
          definition.rarity,
        );
        await this.achievementRepository.save(achievement);
        await this.unlockAchievement(user, achievement, definition);
        return achievement;
      }
    }
    
    return null;
  }

  private async unlockAchievement(
    user: User,
    achievement: UserAchievement,
    definition: any,
  ): Promise<void> {
    console.log('[AchievementService] Unlocking achievement:', {
      userId: user.id,
      achievement: achievement.title,
      type: achievement.type,
      xpReward: achievement.xpReward
    });
    
    // Create enhanced notification with gamification metadata
    await this.notificationService.createNotification(user, {
      type: 'achievement_unlocked' as any,
      title: `🏆 ${this.getRarityEmoji(achievement.rarity)} Achievement Unlocked: ${achievement.title}`,
      message: `${achievement.description} (+${achievement.xpReward} XP)`,
      icon: achievement.icon || '🏆',
      actionUrl: '/learning-hub?view=achievements',
      actionText: 'View Achievement',
      priority: this.getRarityPriority(achievement.rarity),
      metadata: {
        achievementId: achievement.id,
        achievementType: achievement.type,
        xpReward: achievement.xpReward,
        rarity: achievement.rarity,
        specialEffect: definition.specialEffect,
        soundEffect: definition.soundEffect,
        unlockTime: achievement.unlockedAt,
      },
    });
  }

  private async notifyAchievementProgress(
    user: User,
    achievement: UserAchievement,
    definition: any,
  ): Promise<void> {
    const percentage = Math.round((achievement.progress / achievement.maxProgress) * 100);
    
    // Only notify on significant progress milestones
    if (percentage === 25 || percentage === 50 || percentage === 75) {
      await this.notificationService.createNotification(user, {
        type: 'achievement_unlocked' as any,
        title: `📊 Achievement Progress: ${achievement.title}`,
        message: `${percentage}% complete (${achievement.progress}/${achievement.maxProgress})`,
        icon: achievement.icon || '📊',
        priority: 'low' as any,
        metadata: {
          achievementId: achievement.id,
          achievementType: achievement.type,
          progress: achievement.progress,
          maxProgress: achievement.maxProgress,
          percentage,
        },
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });
    }
  }

  async getUserAchievements(userId: string): Promise<{
    unlocked: UserAchievement[];
    inProgress: UserAchievement[];
    locked: AchievementType[];
    stats: {
      totalUnlocked: number;
      totalXpEarned: number;
      byRarity: Record<AchievementRarity, number>;
    };
  }> {
    const achievements = await this.achievementRepository.findByUser(userId);
    
    const unlocked = achievements.filter(a => a.unlockedAt);
    const inProgress = achievements.filter(a => !a.unlockedAt && a.isProgressBased);
    
    // Get locked achievements (not started)
    const userAchievementTypes = new Set(achievements.map(a => a.type));
    const locked = Object.keys(ACHIEVEMENT_DEFINITIONS)
      .filter(type => !userAchievementTypes.has(type as AchievementType))
      .map(type => type as AchievementType);
    
    // Calculate stats
    const totalXpEarned = unlocked.reduce((sum, a) => sum + a.xpReward, 0);
    const byRarity = unlocked.reduce((acc, a) => {
      acc[a.rarity] = (acc[a.rarity] || 0) + 1;
      return acc;
    }, {} as Record<AchievementRarity, number>);
    
    return {
      unlocked,
      inProgress,
      locked,
      stats: {
        totalUnlocked: unlocked.length,
        totalXpEarned,
        byRarity,
      },
    };
  }

  async getUserAchievementProgress(userId: string): Promise<AchievementProgress[]> {
    const achievements = await this.achievementRepository.findByUser(userId);
    
    return achievements
      .filter(a => a.isProgressBased && !a.unlockedAt)
      .map(a => ({
        type: a.type,
        progress: a.progress,
        maxProgress: a.maxProgress,
        percentage: Math.round((a.progress / a.maxProgress) * 100),
      }));
  }

  private getRarityEmoji(rarity: AchievementRarity): string {
    const rarityEmojis = {
      [AchievementRarity.COMMON]: '⚪',
      [AchievementRarity.UNCOMMON]: '🟢',
      [AchievementRarity.RARE]: '🔵',
      [AchievementRarity.EPIC]: '🟣',
      [AchievementRarity.LEGENDARY]: '🟡',
    };
    return rarityEmojis[rarity] || '';
  }

  private getRarityPriority(rarity: AchievementRarity): any {
    const priorities = {
      [AchievementRarity.COMMON]: 'medium',
      [AchievementRarity.UNCOMMON]: 'medium',
      [AchievementRarity.RARE]: 'high',
      [AchievementRarity.EPIC]: 'high',
      [AchievementRarity.LEGENDARY]: 'high',
    };
    return priorities[rarity] || 'medium';
  }

  // Check time-based achievements
  async checkTimeBasedAchievements(userId: string, lessonCompletedAt: Date): Promise<void> {
    const hour = lessonCompletedAt.getHours();
    
    // Night Owl: 10 PM - 2 AM
    if (hour >= 22 || hour < 2) {
      await this.checkAndUnlockAchievement(userId, AchievementType.NIGHT_OWL);
    }
    
    // Early Bird: 5 AM - 8 AM
    if (hour >= 5 && hour < 8) {
      await this.checkAndUnlockAchievement(userId, AchievementType.EARLY_BIRD);
    }
  }

  // Check daily achievements
  async checkDailyAchievements(userId: string, lessonsCompletedToday: number): Promise<void> {
    // Speed Learner: 5 lessons in one day
    if (lessonsCompletedToday >= 1) {
      await this.checkAndUnlockAchievement(
        userId, 
        AchievementType.SPEED_LEARNER,
        { date: new Date().toISOString().split('T')[0] },
        1,
      );
    }
  }

  // Check course-related achievements
  async checkCourseAchievements(userId: string, courseId: string, completionTime?: number): Promise<void> {
    // Speed Demon: Complete course in under 24 hours
    if (completionTime && completionTime < 24 * 60 * 60 * 1000) {
      await this.checkAndUnlockAchievement(
        userId,
        AchievementType.SPEED_DEMON,
        { courseId, completionTime },
      );
    }
    
    // Completionist: Track number of 100% completed courses
    const completedCourses = await this.achievementRepository.countByType(
      userId,
      AchievementType.COURSE_COMPLETION,
    );
    
    if (completedCourses >= 1) {
      await this.checkAndUnlockAchievement(
        userId,
        AchievementType.COMPLETIONIST,
        undefined,
        1,
      );
    }
  }
}