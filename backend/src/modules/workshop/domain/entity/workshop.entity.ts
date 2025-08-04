import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { WorkshopSession } from './workshop-session.entity';
import { WorkshopEnrollment } from './workshop-enrollment.entity';

export enum WorkshopType {
  ONLINE = 'online',
  ONSITE = 'onsite',
  HYBRID = 'hybrid'
}

export enum WorkshopTier {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export enum WorkshopStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  REGISTRATION_OPEN = 'registration_open',
  REGISTRATION_CLOSED = 'registration_closed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity()
export class Workshop extends BaseEntity {
  @Property()
  title: string;

  @Property({ type: 'text' })
  description: string;

  @Property()
  slug: string;

  @ManyToOne(() => User)
  instructor: User;

  @Enum(() => WorkshopType)
  type: WorkshopType;

  @Enum(() => WorkshopTier)
  tier: WorkshopTier;

  @Enum(() => WorkshopStatus)
  status: WorkshopStatus = WorkshopStatus.DRAFT;

  @Property()
  startDate: Date;

  @Property()
  endDate: Date;

  @Property()
  maxParticipants: number;

  @Property({ nullable: true })
  price?: number;

  @Property({ type: 'json' })
  requirements: string[];

  @Property({ type: 'json' })
  learningOutcomes: string[];

  @Property({ type: 'json' })
  gamificationConfig: {
    enableTeams: boolean;
    enableLeaderboard: boolean;
    enableBattles: boolean;
    enableAchievements: boolean;
    pointsPerActivity: Record<string, number>;
    teamSize?: number;
    bonusPoints: {
      firstPlace: number;
      secondPlace: number;
      thirdPlace: number;
      participation: number;
    };
  };

  @Property({ type: 'json' })
  schedule: {
    timezone: string;
    sessions: Array<{
      date: string;
      startTime: string;
      endTime: string;
      title: string;
      description: string;
    }>;
  };

  @Property({ type: 'json', nullable: true })
  locationDetails?: {
    venue?: string;
    address?: string;
    city?: string;
    country?: string;
    onlineUrl?: string;
    hybridInstructions?: string;
  };

  @Property({ type: 'json' })
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    criteria: string;
    points: number;
  }>;

  @OneToMany(() => WorkshopSession, session => session.workshop)
  sessions = new Collection<WorkshopSession>(this);

  @OneToMany(() => WorkshopEnrollment, enrollment => enrollment.workshop)
  enrollments = new Collection<WorkshopEnrollment>(this);

  @Property()
  totalXpReward: number;

  @Property({ type: 'json' })
  prerequisites?: {
    minLevel?: number;
    requiredJourneys?: string[];
    requiredAchievements?: string[];
  };

  @Property({ unique: true })
  workshopCode: string;

  constructor(
    title: string,
    description: string,
    instructor: User,
    type: WorkshopType,
    tier: WorkshopTier,
    startDate: Date,
    endDate: Date,
    maxParticipants: number
  ) {
    super();
    this.title = title;
    this.description = description;
    this.slug = this.generateSlug(title);
    this.instructor = instructor;
    this.type = type;
    this.tier = tier;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxParticipants = maxParticipants;
    this.requirements = [];
    this.learningOutcomes = [];
    this.badges = [];
    this.totalXpReward = 0;
    this.gamificationConfig = {
      enableTeams: false,
      enableLeaderboard: true,
      enableBattles: false,
      enableAchievements: true,
      pointsPerActivity: {},
      bonusPoints: {
        firstPlace: 500,
        secondPlace: 300,
        thirdPlace: 200,
        participation: 100
      }
    };
    this.schedule = {
      timezone: 'UTC',
      sessions: []
    };
    this.workshopCode = this.generateWorkshopCode();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private generateWorkshopCode(): string {
    return `${Math.random().toString(36).substr(2, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
  }

  publish(): void {
    if (this.status !== WorkshopStatus.DRAFT) {
      throw new Error('Only draft workshops can be published');
    }
    this.status = WorkshopStatus.PUBLISHED;
  }

  openRegistration(): void {
    if (this.status !== WorkshopStatus.PUBLISHED) {
      throw new Error('Only published workshops can open registration');
    }
    this.status = WorkshopStatus.REGISTRATION_OPEN;
  }

  closeRegistration(): void {
    this.status = WorkshopStatus.REGISTRATION_CLOSED;
  }

  start(): void {
    this.status = WorkshopStatus.IN_PROGRESS;
  }

  complete(): void {
    this.status = WorkshopStatus.COMPLETED;
  }

  cancel(): void {
    this.status = WorkshopStatus.CANCELLED;
  }

  get isRegistrationOpen(): boolean {
    return this.status === WorkshopStatus.REGISTRATION_OPEN;
  }

  get currentParticipants(): number {
    return this.enrollments.count();
  }

  get availableSlots(): number {
    return this.maxParticipants - this.currentParticipants;
  }
}