import { Entity, Property, Enum, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { User } from '../../../user/domain/entity/user.entity';

export enum VcfExpertStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum VcfExpertLevel {
  JUNIOR = 'junior',
  SENIOR = 'senior',
  PRINCIPAL = 'principal',
  ARCHITECT = 'architect',
}

@Entity({ tableName: 'vcf_experts' })
export class VcfExpertEntity extends BaseEntity {
  @ManyToOne(() => User, { nullable: false, unique: true })
  user!: User;

  @Enum(() => VcfExpertStatus)
  status: VcfExpertStatus = VcfExpertStatus.PENDING;

  @Enum(() => VcfExpertLevel)
  level: VcfExpertLevel = VcfExpertLevel.JUNIOR;

  @Property({ type: 'text' })
  bio!: string;

  @Property({ type: 'array' })
  expertise: string[] = [];

  @Property({ type: 'array' })
  programmingLanguages: string[] = [];

  @Property({ type: 'array' })
  frameworks: string[] = [];

  @Property({ type: 'array' })
  certifications: string[] = [];

  @Property()
  yearsOfExperience!: number;

  @Property()
  githubUrl?: string;

  @Property()
  linkedinUrl?: string;

  @Property()
  portfolioUrl?: string;

  @Property()
  hourlyRate?: number;

  @Property()
  isAvailable: boolean = true;

  @Property({ type: 'json' })
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    startHour: number;
    endHour: number;
    timezone: string;
  } = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    startHour: 9,
    endHour: 18,
    timezone: 'UTC',
  };

  @Property({ type: 'json' })
  stats: {
    totalSessions: number;
    resolvedSessions: number;
    averageResponseTimeHours: number;
    averageResolutionTimeHours: number;
    averageRating: number;
    totalRatings: number;
    lastActiveAt?: Date;
  } = {
    totalSessions: 0,
    resolvedSessions: 0,
    averageResponseTimeHours: 0,
    averageResolutionTimeHours: 0,
    averageRating: 0,
    totalRatings: 0,
  };

  @Property()
  verifiedAt?: Date;

  @Property()
  suspendedAt?: Date;

  @Property({ type: 'text' })
  suspensionReason?: string;

  @Property({ type: 'array' })
  badges: string[] = [];

  @Property()
  preferredSessionTypes?: string[];

  @Property()
  maxConcurrentSessions: number = 3;

  @Property()
  currentActiveSessions: number = 0;
}