import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

@Entity({ tableName: 'user_progress' })
export class UserProgress extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Property()
  courseId: string;

  @Property()
  lessonId: string;

  @Property({ default: 0 })
  progressPercentage: number;

  @Property({ default: false })
  isCompleted: boolean;

  @Property({ nullable: true })
  completedAt?: Date;

  @Property({ nullable: true })
  timeSpent: number; // in seconds

  @Property({ nullable: true })
  lastAccessedAt?: Date;

  constructor(
    user: User,
    courseId: string,
    lessonId: string,
    progressPercentage: number = 0,
    timeSpent?: number,
  ) {
    super();
    this.user = user;
    this.courseId = courseId;
    this.lessonId = lessonId;
    this.progressPercentage = progressPercentage;
    this.timeSpent = timeSpent;
    this.lastAccessedAt = new Date();
    
    if (this.progressPercentage === 100) {
      this.markCompleted();
    }
  }

  markCompleted(): void {
    this.isCompleted = true;
    this.progressPercentage = 100;
    this.completedAt = new Date();
  }

  updateProgress(percentage: number, timeSpent?: number): void {
    this.progressPercentage = Math.min(percentage, 100);
    if (timeSpent) {
      this.timeSpent = (this.timeSpent || 0) + timeSpent;
    }
    this.lastAccessedAt = new Date();
    
    if (this.progressPercentage === 100 && !this.isCompleted) {
      this.markCompleted();
    }
  }
}