import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { Workshop } from './workshop.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { SessionActivity } from './session-activity.entity';

export enum SessionType {
  LECTURE = 'lecture',
  INTERACTIVE = 'interactive',
  LAB = 'lab',
  CHALLENGE = 'challenge',
  TEAM_BATTLE = 'team_battle',
  Q_AND_A = 'q_and_a',
  ASSESSMENT = 'assessment'
}

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity()
export class WorkshopSession extends BaseEntity {
  @ManyToOne(() => Workshop)
  workshop: Workshop;

  @Property()
  title: string;

  @Property({ type: 'text' })
  description: string;

  @Property()
  sessionNumber: number;

  @Enum(() => SessionType)
  type: SessionType;

  @Enum(() => SessionStatus)
  status: SessionStatus = SessionStatus.SCHEDULED;

  @Property()
  scheduledStartTime: Date;

  @Property()
  scheduledEndTime: Date;

  @Property({ nullable: true })
  actualStartTime?: Date;

  @Property({ nullable: true })
  actualEndTime?: Date;

  @ManyToOne(() => User, { nullable: true })
  leadInstructor?: User;

  @Property({ type: 'json' })
  assistantInstructors: string[] = [];

  @Property({ type: 'json' })
  learningObjectives: string[];

  @Property({ type: 'json' })
  materials: Array<{
    id: string;
    title: string;
    type: 'slide' | 'video' | 'document' | 'code' | 'resource';
    url: string;
    duration?: number;
    isRequired: boolean;
  }>;

  @Property({ type: 'json' })
  activities: Array<{
    id: string;
    title: string;
    type: 'quiz' | 'code_challenge' | 'discussion' | 'team_exercise' | 'battle';
    duration: number;
    points: number;
    config: any;
  }>;

  @Property({ type: 'json' })
  gamificationElements: {
    sessionPoints: number;
    bonusChallenges: Array<{
      id: string;
      title: string;
      points: number;
      timeLimit: number;
    }>;
    teamCompetitions: Array<{
      id: string;
      title: string;
      type: 'speed' | 'accuracy' | 'creativity';
      points: number;
    }>;
  };

  @Property({ type: 'json' })
  liveFeatures: {
    enableChat: boolean;
    enablePolls: boolean;
    enableBreakoutRooms: boolean;
    enableWhiteboard: boolean;
    enableScreenShare: boolean;
    maxBreakoutRooms?: number;
    pollsConfig?: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer?: number;
      points?: number;
    }>;
  };

  @OneToMany(() => SessionActivity, activity => activity.session)
  sessionActivities = new Collection<SessionActivity>(this);

  @Property({ type: 'json' })
  recordingDetails?: {
    isRecorded: boolean;
    recordingUrl?: string;
    transcriptUrl?: string;
    duration?: number;
  };

  @Property()
  maxXpReward: number;

  @Property({ unique: true })
  sessionCode: string;

  @Property({ nullable: true })
  sessionCodeExpiresAt?: Date;

  constructor(
    workshop: Workshop,
    title: string,
    description: string,
    sessionNumber: number,
    type: SessionType,
    scheduledStartTime: Date,
    scheduledEndTime: Date
  ) {
    super();
    this.workshop = workshop;
    this.title = title;
    this.description = description;
    this.sessionNumber = sessionNumber;
    this.type = type;
    this.scheduledStartTime = scheduledStartTime;
    this.scheduledEndTime = scheduledEndTime;
    this.learningObjectives = [];
    this.materials = [];
    this.activities = [];
    this.gamificationElements = {
      sessionPoints: 100,
      bonusChallenges: [],
      teamCompetitions: []
    };
    this.liveFeatures = {
      enableChat: true,
      enablePolls: true,
      enableBreakoutRooms: false,
      enableWhiteboard: false,
      enableScreenShare: true
    };
    this.maxXpReward = 200;
    this.sessionCode = this.generateSessionCode();
    // Code expires after 24 hours
    this.sessionCodeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  private generateSessionCode(): string {
    // Generate a human-friendly code like "LEARN-2024-ABCD"
    const prefix = 'WORKSHOP';
    const year = new Date().getFullYear();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${year}-${randomPart}`;
  }

  regenerateSessionCode(): void {
    this.sessionCode = this.generateSessionCode();
    this.sessionCodeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  isSessionCodeValid(): boolean {
    if (!this.sessionCodeExpiresAt) return false;
    return new Date() < this.sessionCodeExpiresAt;
  }

  startSession(): void {
    if (this.status !== SessionStatus.SCHEDULED) {
      throw new Error('Session is not scheduled');
    }
    this.status = SessionStatus.LIVE;
    this.actualStartTime = new Date();
  }

  endSession(): void {
    if (this.status !== SessionStatus.LIVE) {
      throw new Error('Session is not live');
    }
    this.status = SessionStatus.COMPLETED;
    this.actualEndTime = new Date();
  }

  cancelSession(): void {
    if (this.status === SessionStatus.COMPLETED) {
      throw new Error('Cannot cancel completed session');
    }
    this.status = SessionStatus.CANCELLED;
  }

  get duration(): number {
    return this.scheduledEndTime.getTime() - this.scheduledStartTime.getTime();
  }

  get actualDuration(): number | null {
    if (!this.actualStartTime || !this.actualEndTime) return null;
    return this.actualEndTime.getTime() - this.actualStartTime.getTime();
  }
}