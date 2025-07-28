import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

@Entity({ tableName: 'user_streaks' })
export class UserStreak extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Property({ default: 0 })
  currentStreak: number;

  @Property({ default: 0 })
  longestStreak: number;

  @Property({ nullable: true })
  lastActivityDate?: Date;

  @Property({ default: 0 })
  totalActiveDays: number;

  constructor(user: User) {
    super();
    this.user = user;
  }

  updateStreak(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!this.lastActivityDate) {
      // First activity
      this.currentStreak = 1;
      this.totalActiveDays = 1;
      this.lastActivityDate = today;
      this.updateLongestStreak();
      return;
    }

    const lastActivity = new Date(this.lastActivityDate);
    lastActivity.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Same day, no change to streak
      return;
    } else if (daysDiff === 1) {
      // Consecutive day
      this.currentStreak += 1;
      this.totalActiveDays += 1;
      this.lastActivityDate = today;
      this.updateLongestStreak();
    } else {
      // Streak broken
      this.currentStreak = 1;
      this.totalActiveDays += 1;
      this.lastActivityDate = today;
    }
  }

  private updateLongestStreak(): void {
    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
  }

  isStreakActive(): boolean {
    if (!this.lastActivityDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActivity = new Date(this.lastActivityDate);
    lastActivity.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    return daysDiff <= 1;
  }

  getDaysUntilStreakExpires(): number {
    if (!this.lastActivityDate) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActivity = new Date(this.lastActivityDate);
    lastActivity.setHours(0, 0, 0, 0);

    const daysSinceLastActivity = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLastActivity >= 2) {
      return 0; // Streak already expired
    }

    return 1 - daysSinceLastActivity;
  }
}