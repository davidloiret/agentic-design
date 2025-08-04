import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { WorkshopSession } from './workshop-session.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { WorkshopTeam } from './workshop-team.entity';

export enum ActivityType {
  POLL = 'POLL',
  QUIZ = 'QUIZ',
  CODE_CHALLENGE = 'CODE_CHALLENGE',
  TEAM_BATTLE = 'TEAM_BATTLE',
  DISCUSSION = 'DISCUSSION',
  BREAKOUT_ROOM = 'BREAKOUT_ROOM',
  WHITEBOARD = 'WHITEBOARD',
  Q_AND_A = 'Q_AND_A'
}

export enum ActivityStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity()
export class SessionActivity extends BaseEntity {
  @ManyToOne(() => WorkshopSession)
  session: WorkshopSession;

  @Property()
  title: string;

  @Property({ type: 'text' })
  description: string;

  @Enum(() => ActivityType)
  type: ActivityType;

  @Enum(() => ActivityStatus)
  status: ActivityStatus = ActivityStatus.PENDING;

  @Property()
  scheduledStartTime: Date;

  @Property()
  duration: number; // in minutes

  @Property({ nullable: true })
  actualStartTime?: Date;

  @Property({ nullable: true })
  actualEndTime?: Date;

  @Property()
  points: number;

  @Property()
  xpReward: number;

  @Property({ type: 'json' })
  config: any; // Activity-specific configuration

  @Property({ type: 'json' })
  results: {
    participants: Array<{
      userId: string;
      teamId?: string;
      joinedAt: Date;
      submittedAt?: Date;
      response?: any;
      score?: number;
      timeSpent?: number;
    }>;
    teamResults?: Array<{
      teamId: string;
      score: number;
      rank: number;
      bonusPoints: number;
    }>;
    summary?: {
      totalParticipants: number;
      averageScore: number;
      topScorers: Array<{
        userId: string;
        userName: string;
        score: number;
      }>;
      distribution?: Record<string, number>;
    };
  };

  @Property({ type: 'json' })
  liveData?: {
    activeParticipants: number;
    submittedCount: number;
    averageTimeSpent: number;
    currentLeader?: {
      userId?: string;
      teamId?: string;
      name: string;
      score: number;
    };
    realtimeUpdates: Array<{
      timestamp: Date;
      type: string;
      data: any;
    }>;
  };

  constructor(
    session: WorkshopSession,
    title: string,
    description: string,
    type: ActivityType,
    scheduledStartTime: Date,
    duration: number,
    points: number
  ) {
    super();
    this.session = session;
    this.title = title;
    this.description = description;
    this.type = type;
    this.scheduledStartTime = scheduledStartTime;
    this.duration = duration;
    this.points = points;
    this.xpReward = Math.floor(points * 1.5);
    this.config = {};
    this.results = {
      participants: []
    };
  }

  start(): void {
    if (this.status !== ActivityStatus.PENDING) {
      throw new Error('Activity is not pending');
    }
    this.status = ActivityStatus.ACTIVE;
    this.actualStartTime = new Date();
    this.liveData = {
      activeParticipants: 0,
      submittedCount: 0,
      averageTimeSpent: 0,
      realtimeUpdates: []
    };
  }

  complete(): void {
    if (this.status !== ActivityStatus.ACTIVE) {
      throw new Error('Activity is not active');
    }
    this.status = ActivityStatus.COMPLETED;
    this.actualEndTime = new Date();
    this.calculateResults();
  }

  cancel(): void {
    if (this.status === ActivityStatus.COMPLETED) {
      throw new Error('Cannot cancel completed activity');
    }
    this.status = ActivityStatus.CANCELLED;
  }

  addParticipant(userId: string, teamId?: string): void {
    if (!this.results.participants.find(p => p.userId === userId)) {
      this.results.participants.push({
        userId,
        teamId,
        joinedAt: new Date()
      });
      if (this.liveData) {
        this.liveData.activeParticipants++;
      }
    }
  }

  submitResponse(userId: string, response: any, score?: number): void {
    const participant = this.results.participants.find(p => p.userId === userId);
    if (participant) {
      participant.submittedAt = new Date();
      participant.response = response;
      participant.score = score;
      participant.timeSpent = participant.submittedAt.getTime() - participant.joinedAt.getTime();
      
      if (this.liveData) {
        this.liveData.submittedCount++;
        this.updateLiveData();
      }
    }
  }

  private updateLiveData(): void {
    if (!this.liveData) return;

    const submitted = this.results.participants.filter(p => p.submittedAt);
    if (submitted.length > 0) {
      const totalTime = submitted.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
      this.liveData.averageTimeSpent = totalTime / submitted.length;

      const topScorer = submitted
        .filter(p => p.score !== undefined)
        .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

      if (topScorer) {
        this.liveData.currentLeader = {
          userId: topScorer.userId,
          teamId: topScorer.teamId,
          name: topScorer.userId, // This would be replaced with actual name
          score: topScorer.score || 0
        };
      }
    }
  }

  private calculateResults(): void {
    const submitted = this.results.participants.filter(p => p.submittedAt);
    
    if (submitted.length > 0) {
      const scores = submitted.map(p => p.score || 0);
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      const topScorers = submitted
        .filter(p => p.score !== undefined)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 3)
        .map(p => ({
          userId: p.userId,
          userName: p.userId, // This would be replaced with actual name
          score: p.score || 0
        }));

      this.results.summary = {
        totalParticipants: this.results.participants.length,
        averageScore,
        topScorers
      };

      // Calculate team results if applicable
      if (this.type === ActivityType.TEAM_BATTLE) {
        this.calculateTeamResults();
      }
    }
  }

  private calculateTeamResults(): void {
    const teamScores = new Map<string, { total: number; count: number }>();
    
    this.results.participants
      .filter(p => p.teamId && p.score !== undefined)
      .forEach(p => {
        const current = teamScores.get(p.teamId!) || { total: 0, count: 0 };
        current.total += p.score || 0;
        current.count++;
        teamScores.set(p.teamId!, current);
      });

    const teamResults = Array.from(teamScores.entries())
      .map(([teamId, data]) => ({
        teamId,
        score: data.total / data.count,
        rank: 0,
        bonusPoints: 0
      }))
      .sort((a, b) => b.score - a.score);

    // Assign ranks and bonus points
    teamResults.forEach((result, index) => {
      result.rank = index + 1;
      result.bonusPoints = this.getBonusPointsForRank(result.rank);
    });

    this.results.teamResults = teamResults;
  }

  private getBonusPointsForRank(rank: number): number {
    const bonusMap: Record<number, number> = {
      1: 300,
      2: 200,
      3: 100
    };
    return bonusMap[rank] || 50; // Participation bonus for other ranks
  }
}