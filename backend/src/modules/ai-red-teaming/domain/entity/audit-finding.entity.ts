import { Entity, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../shared/domain/entity/base.entity';
import { Audit, AuditPhase } from './audit.entity';

export enum RiskLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

export enum FindingStatus {
  OPEN = 'open',
  IN_REVIEW = 'in_review',
  RESOLVED = 'resolved',
  ACCEPTED_RISK = 'accepted_risk',
  FALSE_POSITIVE = 'false_positive'
}

@Entity({ tableName: 'audit_findings' })
export class AuditFinding extends BaseEntity {
  @ManyToOne(() => Audit)
  audit: Audit;

  @Enum(() => AuditPhase)
  phase: AuditPhase;

  @Property()
  category: string;

  @Property()
  checklistItem: string;

  @Property()
  title: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Enum(() => RiskLevel)
  riskLevel: RiskLevel;

  @Property({ type: 'float' })
  riskScore: number;

  @Enum(() => FindingStatus)
  status: FindingStatus = FindingStatus.OPEN;

  @Property({ type: 'text', nullable: true })
  evidence?: string;

  @Property({ type: 'text', nullable: true })
  impact?: string;

  @Property({ type: 'text', nullable: true })
  recommendation?: string;

  @Property({ nullable: true })
  cweId?: string; // Common Weakness Enumeration ID

  @Property({ nullable: true })
  cveId?: string; // Common Vulnerabilities and Exposures ID

  @Property({ type: 'text', nullable: true })
  technicalDetails?: string;

  @Property({ type: 'text', nullable: true })
  reproductionSteps?: string;

  @Property({ nullable: true })
  assignedTo?: string;

  @Property({ nullable: true })
  dueDate?: Date;

  @Property({ type: 'text', nullable: true })
  remediationNotes?: string;

  constructor(
    audit: Audit,
    phase: AuditPhase,
    category: string,
    checklistItem: string,
    title: string,
    riskLevel: RiskLevel
  ) {
    super();
    this.audit = audit;
    this.phase = phase;
    this.category = category;
    this.checklistItem = checklistItem;
    this.title = title;
    this.riskLevel = riskLevel;
    this.riskScore = this.calculateRiskScore(riskLevel);
  }

  // Domain methods
  private calculateRiskScore(riskLevel: RiskLevel): number {
    const riskScores = {
      [RiskLevel.CRITICAL]: 4.0,
      [RiskLevel.HIGH]: 3.0,
      [RiskLevel.MEDIUM]: 2.0,
      [RiskLevel.LOW]: 1.0,
      [RiskLevel.INFO]: 0.0
    };
    return riskScores[riskLevel];
  }

  updateRiskLevel(newRiskLevel: RiskLevel): void {
    this.riskLevel = newRiskLevel;
    this.riskScore = this.calculateRiskScore(newRiskLevel);
  }

  resolve(): void {
    this.status = FindingStatus.RESOLVED;
  }

  acceptRisk(): void {
    this.status = FindingStatus.ACCEPTED_RISK;
  }

  markAsFalsePositive(): void {
    this.status = FindingStatus.FALSE_POSITIVE;
  }

  assignTo(userId: string, dueDate?: Date): void {
    this.assignedTo = userId;
    this.dueDate = dueDate;
    this.status = FindingStatus.IN_REVIEW;
  }

  addEvidence(evidence: string): void {
    if (this.evidence) {
      this.evidence += '\n\n---\n\n' + evidence;
    } else {
      this.evidence = evidence;
    }
  }

  updateRemediation(notes: string): void {
    this.remediationNotes = notes;
  }
}