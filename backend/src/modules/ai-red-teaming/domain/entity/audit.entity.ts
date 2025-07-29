import { Entity, Property, OneToMany, Collection, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { AuditFinding } from './audit-finding.entity';

export enum AuditStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export enum AuditPhase {
  RECONNAISSANCE = 'reconnaissance',
  TECHNICAL_TESTING = 'technical_testing',
  DATA_PRIVACY = 'data_privacy',
  SUPPLY_CHAIN = 'supply_chain',
  GOVERNANCE = 'governance'
}

export enum AuditScope {
  FULL_SYSTEM = 'full',
  FOCUSED = 'focused',
  COMPLIANCE = 'compliance',
  PENETRATION = 'penetration'
}

@Entity({ tableName: 'ai_security_audits' })
export class Audit extends BaseEntity {
  @Property()
  systemName: string;

  @Property()
  auditorName: string;

  @Property()
  startDate: Date;

  @Property({ nullable: true })
  endDate?: Date;

  @Enum(() => AuditScope)
  scope: AuditScope;

  @Enum(() => AuditStatus)
  status: AuditStatus = AuditStatus.DRAFT;

  @Enum(() => AuditPhase)
  currentPhase: AuditPhase = AuditPhase.RECONNAISSANCE;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  objectives?: string;

  @Property({ nullable: true })
  systemArchitecture?: string;

  @Property({ nullable: true })
  riskTolerance?: string;

  @Property({ type: 'float', default: 0 })
  progressPercentage: number = 0;

  @Property({ type: 'float', default: 0 })
  overallRiskScore: number = 0;

  @Property({ nullable: true })
  executiveSummary?: string;

  @Property({ nullable: true })
  recommendations?: string;

  @Property({ nullable: true })
  userId?: string; // Link to user who created the audit

  @OneToMany(() => AuditFinding, finding => finding.audit)
  findings = new Collection<AuditFinding>(this);

  constructor(
    systemName: string,
    auditorName: string,
    startDate: Date,
    scope: AuditScope,
    userId?: string
  ) {
    super();
    this.systemName = systemName;
    this.auditorName = auditorName;
    this.startDate = startDate;
    this.scope = scope;
    this.userId = userId;
  }

  // Domain methods
  startAudit(): void {
    if (this.status !== AuditStatus.DRAFT) {
      throw new Error('Audit can only be started from draft status');
    }
    this.status = AuditStatus.IN_PROGRESS;
  }

  completeAudit(): void {
    if (this.status !== AuditStatus.IN_PROGRESS) {
      throw new Error('Only in-progress audits can be completed');
    }
    this.status = AuditStatus.COMPLETED;
    this.endDate = new Date();
    this.progressPercentage = 100;
  }

  updateProgress(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Progress percentage must be between 0 and 100');
    }
    this.progressPercentage = percentage;
  }

  updatePhase(phase: AuditPhase): void {
    this.currentPhase = phase;
  }

  calculateRiskScore(): number {
    if (this.findings.length === 0) return 0;
    
    const totalScore = this.findings.getItems().reduce((sum, finding) => sum + finding.riskScore, 0);
    return totalScore / this.findings.length;
  }

  updateRiskScore(): void {
    this.overallRiskScore = this.calculateRiskScore();
  }
}