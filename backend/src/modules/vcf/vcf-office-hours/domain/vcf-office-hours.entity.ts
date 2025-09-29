import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfOfficeHoursStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum VcfOfficeHoursType {
  ONE_ON_ONE = 'one_on_one',
  GROUP_SESSION = 'group_session',
  WORKSHOP = 'workshop',
  CODE_REVIEW = 'code_review',
  ARCHITECTURE_REVIEW = 'architecture_review',
}

@Entity({ tableName: 'vcf_office_hours' })
export class VcfOfficeHoursEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  host!: User;

  @Enum(() => VcfOfficeHoursStatus)
  status: VcfOfficeHoursStatus = VcfOfficeHoursStatus.SCHEDULED;

  @Enum(() => VcfOfficeHoursType)
  type!: VcfOfficeHoursType;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'array' })
  topics: string[] = [];

  @Property()
  scheduledAt!: Date;

  @Property()
  durationMinutes: number = 60;

  @Property()
  maxAttendees: number = 1;

  @Property({ type: 'array' })
  attendeeIds: string[] = [];

  @Property()
  meetingUrl?: string;

  @Property()
  recordingUrl?: string;

  @Property({ type: 'text' })
  notes?: string;

  @Property({ type: 'array' })
  resources: string[] = [];

  @Property()
  startedAt?: Date;

  @Property()
  endedAt?: Date;

  @Property()
  isRecurring: boolean = false;

  @Property()
  recurringPattern?: string;

  @Property()
  requiresSubscription: boolean = true;

  @Property({ type: 'array' })
  allowedTiers: string[] = ['pro', 'vip', 'startup', 'scaleup', 'enterprise'];

  @Property({ type: 'json' })
  feedback: Array<{
    userId: string;
    rating: number;
    comment?: string;
    submittedAt: Date;
  }> = [];

  @Property()
  averageRating?: number;
}