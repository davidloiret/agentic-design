import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';
import { VcfHotlineMessageEntity } from './vcf-hotline-message.entity';

export enum VcfSessionStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum VcfSessionPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity({ tableName: 'vcf_hotline_sessions' })
export class VcfHotlineSessionEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => User, { nullable: true })
  expert?: User;

  @Enum(() => VcfSessionStatus)
  status: VcfSessionStatus = VcfSessionStatus.WAITING;

  @Enum(() => VcfSessionPriority)
  priority: VcfSessionPriority = VcfSessionPriority.NORMAL;

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

  @Property()
  errorMessage?: string;

  @Property({ type: 'text' })
  codeSnippet?: string;

  @Property()
  startedAt?: Date;

  @Property()
  resolvedAt?: Date;

  @Property()
  responseTimeMinutes?: number;

  @Property()
  resolutionTimeMinutes?: number;

  @Property({ type: 'text' })
  resolution?: string;

  @Property()
  satisfactionRating?: number;

  @Property({ type: 'text' })
  feedback?: string;

  @OneToMany(() => VcfHotlineMessageEntity, message => message.session)
  messages = new Collection<VcfHotlineMessageEntity>(this);
}