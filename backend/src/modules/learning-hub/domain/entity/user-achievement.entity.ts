import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/libs/base-entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum AchievementType {
  FIRST_LESSON = 'first_lesson',
  COURSE_COMPLETION = 'course_completion',
  STREAK_MILESTONE = 'streak_milestone',
  XP_MILESTONE = 'xp_milestone',
  SPEED_LEARNER = 'speed_learner',
  DEDICATED_LEARNER = 'dedicated_learner',
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
  }

  getMetadata(): object | null {
    return this.metadata ? JSON.parse(this.metadata) : null;
  }
}