import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum AchievementType {
  FIRST_LESSON = 'first_lesson',
  COURSE_COMPLETION = 'course_completion',
  STREAK_MILESTONE = 'streak_milestone',
  XP_MILESTONE = 'xp_milestone',
  SPEED_LEARNER = 'speed_learner',
  DEDICATED_LEARNER = 'dedicated_learner',
  PERFECT_WEEK = 'perfect_week',
  NIGHT_OWL = 'night_owl',
  EARLY_BIRD = 'early_bird',
  QUIZ_MASTER = 'quiz_master',
  HELPING_HAND = 'helping_hand',
  EXPLORER = 'explorer',
  COMPLETIONIST = 'completionist',
  SPEED_DEMON = 'speed_demon',
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@Entity({ tableName: 'user_achievements' })
export class UserAchievement extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Enum(() => AchievementType)
  type: AchievementType;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  icon?: string;

  @Property({ default: 0 })
  xpReward: number;

  @Enum(() => AchievementRarity)
  rarity: AchievementRarity = AchievementRarity.COMMON;

  @Property({ default: 0 })
  progress: number = 0;

  @Property({ default: 0 })
  maxProgress: number = 0;

  @Property({ default: false })
  isProgressBased: boolean = false;

  @Property({ nullable: true })
  metadata?: string; // JSON string for additional data

  @Property()
  unlockedAt: Date;

  constructor(
    user: User,
    type: AchievementType,
    title: string,
    description: string,
    xpReward: number = 0,
    icon?: string,
    metadata?: object,
    rarity: AchievementRarity = AchievementRarity.COMMON,
    isProgressBased: boolean = false,
    maxProgress: number = 0,
  ) {
    super();
    this.user = user;
    this.type = type;
    this.title = title;
    this.description = description;
    this.xpReward = xpReward;
    this.icon = icon;
    this.metadata = metadata ? JSON.stringify(metadata) : undefined;
    this.unlockedAt = new Date();
    this.rarity = rarity;
    this.isProgressBased = isProgressBased;
    this.maxProgress = maxProgress;
    this.progress = isProgressBased ? 0 : maxProgress;
  }

  getMetadata(): object | null {
    return this.metadata ? JSON.parse(this.metadata) : null;
  }
}