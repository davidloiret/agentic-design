import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfPanicButtonStatus {
  TRIGGERED = 'triggered',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  FALSE_ALARM = 'false_alarm',
}

export enum VcfPanicButtonSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency',
}

export enum VcfPanicButtonType {
  PRODUCTION_DOWN = 'production_down',
  DATA_LOSS = 'data_loss',
  SECURITY_BREACH = 'security_breach',
  DEPLOYMENT_FAILED = 'deployment_failed',
  INFINITE_LOOP = 'infinite_loop',
  MEMORY_LEAK = 'memory_leak',
  DATABASE_ISSUE = 'database_issue',
  API_DOWN = 'api_down',
  INTEGRATION_BROKEN = 'integration_broken',
  OTHER = 'other',
}

@Entity({ tableName: 'vcf_panic_buttons' })
export class VcfPanicButtonEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => User, { nullable: true })
  assignedExpert?: User;

  @Enum(() => VcfPanicButtonStatus)
  status: VcfPanicButtonStatus = VcfPanicButtonStatus.TRIGGERED;

  @Enum(() => VcfPanicButtonSeverity)
  severity!: VcfPanicButtonSeverity;

  @Enum(() => VcfPanicButtonType)
  type!: VcfPanicButtonType;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  impactDescription!: string;

  @Property()
  affectedUsers?: number;

  @Property()
  isProductionIssue: boolean = false;

  @Property({ type: 'text' })
  errorMessage?: string;

  @Property({ type: 'text' })
  stackTrace?: string;

  @Property({ type: 'array' })
  affectedServices: string[] = [];

  @Property({ type: 'array' })
  attemptedSolutions: string[] = [];

  @Property()
  triggeredAt: Date = new Date();

  @Property()
  acknowledgedAt?: Date;

  @Property()
  expertAssignedAt?: Date;

  @Property()
  resolutionStartedAt?: Date;

  @Property()
  resolvedAt?: Date;

  @Property()
  responseTimeMinutes?: number;

  @Property()
  resolutionTimeMinutes?: number;

  @Property({ type: 'text' })
  resolution?: string;

  @Property({ type: 'text' })
  rootCause?: string;

  @Property({ type: 'array' })
  preventionSteps: string[] = [];

  @Property()
  postMortemUrl?: string;

  @Property()
  estimatedDowntimeMinutes?: number;

  @Property()
  estimatedRevenueLoss?: number;

  @Property()
  expertResponseRequired: boolean = true;

  @Property({ type: 'json' })
  timeline: Array<{
    timestamp: Date;
    action: string;
    userId?: string;
    details?: string;
  }> = [];

  @Property()
  satisfactionRating?: number;

  @Property({ type: 'text' })
  feedback?: string;
}