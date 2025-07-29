import { AuditFinding, RiskLevel, FindingStatus } from '../entity/audit-finding.entity';
import { AuditPhase } from '../entity/audit.entity';

export interface FindFindingsOptions {
  auditId?: string;
  phase?: AuditPhase;
  category?: string;
  riskLevel?: RiskLevel;
  status?: FindingStatus;
  assignedTo?: string;
  limit?: number;
  offset?: number;
}

export interface IAuditFindingRepository {
  findById(id: string): Promise<AuditFinding | null>;
  findByAuditId(auditId: string): Promise<AuditFinding[]>;
  findAll(options?: FindFindingsOptions): Promise<AuditFinding[]>;
  save(finding: AuditFinding): Promise<AuditFinding>;
  update(finding: AuditFinding): Promise<AuditFinding>;
  delete(id: string): Promise<void>;  
  count(options?: FindFindingsOptions): Promise<number>;
  bulkSave(findings: AuditFinding[]): Promise<AuditFinding[]>;
}