import { Entity, Property, Enum, ManyToOne, OneToMany, Collection, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { Workshop } from './workshop.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { WorkshopTeam } from './workshop-team.entity';

export enum EnrollmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export enum EnrollmentRole {
  PARTICIPANT = 'participant',
  TEAM_LEADER = 'team_leader',
  ASSISTANT = 'assistant',
  OBSERVER = 'observer'
}

@Entity()
@Unique({ properties: ['workshop', 'user'] })
export class WorkshopEnrollment extends BaseEntity {
  @ManyToOne(() => Workshop)
  workshop: Workshop;

  @ManyToOne(() => User)
  user: User;

  @Enum(() => EnrollmentStatus)
  status: EnrollmentStatus = EnrollmentStatus.PENDING;

  @Enum(() => EnrollmentRole)
  role: EnrollmentRole = EnrollmentRole.PARTICIPANT;

  @Property()
  enrolledAt: Date;

  @Property({ nullable: true })
  confirmedAt?: Date;

  @Property({ nullable: true })
  cancelledAt?: Date;

  @Property({ nullable: true })
  completedAt?: Date;

  @ManyToOne(() => WorkshopTeam, { nullable: true })
  team?: WorkshopTeam;

  @Property({ type: 'json' })
  paymentDetails?: {
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionId: string;
    paidAt: Date;
    refundedAt?: Date;
    refundAmount?: number;
  };

  @Property({ type: 'json' })
  progress: {
    sessionsAttended: string[];
    activitiesCompleted: string[];
    totalPoints: number;
    totalXpEarned: number;
    badges: string[];
    rank?: number;
  };

  @Property({ type: 'json' })
  performance: {
    quizScores: Record<string, number>;
    challengeScores: Record<string, number>;
    participationScore: number;
    teamContribution: number;
    peerRatings: Array<{
      fromUserId: string;
      rating: number;
      comment?: string;
    }>;
  };

  @Property({ type: 'json' })
  attendance: Array<{
    sessionId: string;
    joinedAt: Date;
    leftAt?: Date;
    duration: number;
    participationLevel: 'active' | 'moderate' | 'passive';
  }>;

  @Property({ type: 'json' })
  achievements: Array<{
    achievementId: string;
    unlockedAt: Date;
    points: number;
  }>;

  @Property({ type: 'json' })
  feedback?: {
    overallRating: number;
    contentRating: number;
    instructorRating: number;
    comments: string;
    wouldRecommend: boolean;
    submittedAt: Date;
  };

  @Property({ nullable: true })
  certificateIssuedAt?: Date;

  @Property({ nullable: true })
  certificateUrl?: string;

  constructor(
    workshop: Workshop,
    user: User,
    role: EnrollmentRole = EnrollmentRole.PARTICIPANT
  ) {
    super();
    this.workshop = workshop;
    this.user = user;
    this.role = role;
    this.enrolledAt = new Date();
    this.progress = {
      sessionsAttended: [],
      activitiesCompleted: [],
      totalPoints: 0,
      totalXpEarned: 0,
      badges: []
    };
    this.performance = {
      quizScores: {},
      challengeScores: {},
      participationScore: 0,
      teamContribution: 0,
      peerRatings: []
    };
    this.attendance = [];
    this.achievements = [];
  }

  confirm(): void {
    if (this.status !== EnrollmentStatus.PENDING) {
      throw new Error('Only pending enrollments can be confirmed');
    }
    this.status = EnrollmentStatus.CONFIRMED;
    this.confirmedAt = new Date();
  }

  cancel(): void {
    if (this.status === EnrollmentStatus.COMPLETED) {
      throw new Error('Cannot cancel completed enrollment');
    }
    this.status = EnrollmentStatus.CANCELLED;
    this.cancelledAt = new Date();
  }

  complete(): void {
    if (this.status !== EnrollmentStatus.CONFIRMED) {
      throw new Error('Only confirmed enrollments can be completed');
    }
    this.status = EnrollmentStatus.COMPLETED;
    this.completedAt = new Date();
  }

  markAsNoShow(): void {
    if (this.status !== EnrollmentStatus.CONFIRMED) {
      throw new Error('Only confirmed enrollments can be marked as no-show');
    }
    this.status = EnrollmentStatus.NO_SHOW;
  }

  addAttendance(sessionId: string, joinedAt: Date): void {
    this.attendance.push({
      sessionId,
      joinedAt,
      duration: 0,
      participationLevel: 'passive'
    });
  }

  updateAttendance(sessionId: string, leftAt: Date, participationLevel: 'active' | 'moderate' | 'passive'): void {
    const attendance = this.attendance.find(a => a.sessionId === sessionId && !a.leftAt);
    if (attendance) {
      attendance.leftAt = leftAt;
      attendance.duration = leftAt.getTime() - attendance.joinedAt.getTime();
      attendance.participationLevel = participationLevel;
    }
  }

  addPoints(points: number, xp: number): void {
    this.progress.totalPoints += points;
    this.progress.totalXpEarned += xp;
  }

  unlockAchievement(achievementId: string, points: number): void {
    if (!this.achievements.find(a => a.achievementId === achievementId)) {
      this.achievements.push({
        achievementId,
        unlockedAt: new Date(),
        points
      });
      this.addPoints(points, points * 2); // Double XP for achievements
    }
  }

  get attendanceRate(): number {
    if (!this.workshop.sessions || this.workshop.sessions.count() === 0) return 0;
    return (this.progress.sessionsAttended.length / this.workshop.sessions.count()) * 100;
  }

  get overallScore(): number {
    const weights = {
      attendance: 0.2,
      quiz: 0.25,
      challenge: 0.25,
      participation: 0.15,
      team: 0.15
    };

    const quizAvg = Object.values(this.performance.quizScores).length > 0
      ? Object.values(this.performance.quizScores).reduce((a, b) => a + b, 0) / Object.values(this.performance.quizScores).length
      : 0;

    const challengeAvg = Object.values(this.performance.challengeScores).length > 0
      ? Object.values(this.performance.challengeScores).reduce((a, b) => a + b, 0) / Object.values(this.performance.challengeScores).length
      : 0;

    return (
      this.attendanceRate * weights.attendance +
      quizAvg * weights.quiz +
      challengeAvg * weights.challenge +
      this.performance.participationScore * weights.participation +
      this.performance.teamContribution * weights.team
    );
  }
}