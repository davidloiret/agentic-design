import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum XpSource {
  LESSON_COMPLETION = 'lesson_completion',
  COURSE_COMPLETION = 'course_completion',
  ACHIEVEMENT_UNLOCK = 'achievement_unlock',
  DAILY_STREAK = 'daily_streak',
  QUIZ_COMPLETION = 'quiz_completion',
  BONUS_ACTIVITY = 'bonus_activity',
}

@Entity({ tableName: 'user_xp' })
export class UserXp extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Property({ default: 0 })
  totalXp: number;

  @Property({ default: 1 })
  level: number;

  @Property({ default: 0 })
  currentLevelXp: number;

  @Property({ default: 100 })
  nextLevelXp: number;

  constructor(user: User) {
    super();
    this.user = user;
  }

  addXp(amount: number): void {
    this.totalXp += amount;
    this.currentLevelXp += amount;

    // Check for level up
    while (this.currentLevelXp >= this.nextLevelXp) {
      this.levelUp();
    }
  }

  private levelUp(): void {
    this.currentLevelXp -= this.nextLevelXp;
    this.level += 1;
    this.nextLevelXp = this.calculateNextLevelXp(this.level);
  }

  private calculateNextLevelXp(level: number): number {
    // XP required increases by 50 per level
    return 100 + (level - 1) * 50;
  }

  getProgressToNextLevel(): number {
    return (this.currentLevelXp / this.nextLevelXp) * 100;
  }
}

@Entity({ tableName: 'user_xp_transactions' })
export class UserXpTransaction extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Property()
  amount: number;

  @Enum(() => XpSource)
  source: XpSource;

  @Property({ nullable: true })
  sourceId?: string; // lesson ID, course ID, achievement ID, etc.

  @Property({ nullable: true })
  description?: string;

  @Property()
  earnedAt: Date;

  constructor(
    user: User,
    amount: number,
    source: XpSource,
    sourceId?: string,
    description?: string,
  ) {
    super();
    this.user = user;
    this.amount = amount;
    this.source = source;
    this.sourceId = sourceId;
    this.description = description;
    this.earnedAt = new Date();
  }
}