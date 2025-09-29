import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfHelpRequestStatus {
  OPEN = 'open',
  CLAIMED = 'claimed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum VcfHelpRequestType {
  BUG_FIX = 'bug_fix',
  FEATURE_IMPLEMENTATION = 'feature_implementation',
  PERFORMANCE_OPTIMIZATION = 'performance_optimization',
  ARCHITECTURE_REVIEW = 'architecture_review',
  CODE_REVIEW = 'code_review',
  DEBUGGING = 'debugging',
  DEPLOYMENT_ISSUE = 'deployment_issue',
  INTEGRATION_PROBLEM = 'integration_problem',
  OTHER = 'other',
}

export enum VcfHelpRequestPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity({ tableName: 'vcf_help_requests' })
export class VcfHelpRequestEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => User, { nullable: true })
  assignedExpert?: User;

  @Enum(() => VcfHelpRequestStatus)
  status: VcfHelpRequestStatus = VcfHelpRequestStatus.OPEN;

  @Enum(() => VcfHelpRequestType)
  type!: VcfHelpRequestType;

  @Enum(() => VcfHelpRequestPriority)
  priority: VcfHelpRequestPriority = VcfHelpRequestPriority.NORMAL;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'array' })
  tags: string[] = [];

  @Property()
  programmingLanguage?: string;

  @Property()
  framework?: string;

  @Property({ type: 'text' })
  currentCode?: string;

  @Property({ type: 'text' })
  expectedBehavior?: string;

  @Property({ type: 'text' })
  actualBehavior?: string;

  @Property({ type: 'text' })
  errorMessage?: string;

  @Property({ type: 'array' })
  stepsToReproduce: string[] = [];

  @Property({ type: 'array' })
  attachments: string[] = [];

  @Property()
  estimatedTimeHours?: number;

  @Property()
  actualTimeHours?: number;

  @Property()
  bountyAmount?: number;

  @Property()
  isPublic: boolean = true;

  @Property()
  allowMultipleExperts: boolean = false;

  @Property()
  maxExperts: number = 1;

  @Property()
  claimedAt?: Date;

  @Property()
  startedAt?: Date;

  @Property()
  completedAt?: Date;

  @Property()
  expiresAt?: Date;

  @Property({ type: 'text' })
  solution?: string;

  @Property({ type: 'text' })
  solutionCode?: string;

  @Property({ type: 'array' })
  solutionSteps: string[] = [];

  @Property()
  solutionAccepted: boolean = false;

  @Property()
  solutionAcceptedAt?: Date;

  @Property()
  satisfactionRating?: number;

  @Property({ type: 'text' })
  feedback?: string;

  @Property({ type: 'json' })
  metadata: {
    viewCount: number;
    interestedExperts: string[];
    declinedExperts: string[];
    previousAttempts: number;
  } = {
    viewCount: 0,
    interestedExperts: [],
    declinedExperts: [],
    previousAttempts: 0,
  };
}