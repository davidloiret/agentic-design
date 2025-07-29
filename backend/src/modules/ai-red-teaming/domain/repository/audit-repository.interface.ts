import { Audit, AuditStatus, AuditScope } from '../entity/audit.entity';

export interface FindAuditsOptions {
  userId?: string;
  status?: AuditStatus;
  scope?: AuditScope;
  systemName?: string;
  limit?: number;
  offset?: number;
}

export interface IAuditRepository {
  findById(id: string): Promise<Audit | null>;
  findByIdWithFindings(id: string): Promise<Audit | null>;
  findAll(options?: FindAuditsOptions): Promise<Audit[]>;
  findByUserId(userId: string): Promise<Audit[]>;
  save(audit: Audit): Promise<Audit>;
  update(audit: Audit): Promise<Audit>;
  delete(id: string): Promise<void>;
  count(options?: FindAuditsOptions): Promise<number>;
}