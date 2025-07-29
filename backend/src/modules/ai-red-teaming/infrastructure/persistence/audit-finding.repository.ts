import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuditFinding, RiskLevel, FindingStatus } from '../../domain/entity/audit-finding.entity';
import { AuditPhase } from '../../domain/entity/audit.entity';
import { IAuditFindingRepository, FindFindingsOptions } from '../../domain/repository/audit-finding-repository.interface';

@Injectable()
export class AuditFindingRepository implements IAuditFindingRepository {
  constructor(
    @InjectRepository(AuditFinding)
    private readonly repository: EntityRepository<AuditFinding>,
  ) {}

  async findById(id: string): Promise<AuditFinding | null> {
    return this.repository.findOne({ id }, { populate: ['audit'] });
  }

  async findByAuditId(auditId: string): Promise<AuditFinding[]> {
    return this.repository.find(
      { audit: auditId },
      { 
        orderBy: { createdAt: 'ASC' },
        populate: ['audit']
      }
    );
  }

  async findAll(options: FindFindingsOptions = {}): Promise<AuditFinding[]> {
    const { 
      auditId, 
      phase, 
      category, 
      riskLevel, 
      status, 
      assignedTo, 
      limit = 100, 
      offset = 0 
    } = options;
    
    const filters: any = {};
    
    if (auditId) filters.audit = auditId;
    if (phase) filters.phase = phase;
    if (category) filters.category = category;
    if (riskLevel) filters.riskLevel = riskLevel;
    if (status) filters.status = status;
    if (assignedTo) filters.assignedTo = assignedTo;

    return this.repository.find(filters, {
      limit,
      offset,
      orderBy: { riskScore: 'DESC', createdAt: 'ASC' },
      populate: ['audit']
    });
  }

  async save(finding: AuditFinding): Promise<AuditFinding> {
    await this.repository.persistAndFlush(finding);
    return finding;
  }

  async update(finding: AuditFinding): Promise<AuditFinding> {
    await this.repository.flush();
    return finding;
  }

  async delete(id: string): Promise<void> {
    const finding = await this.repository.findOne({ id });
    if (finding) {
      await this.repository.removeAndFlush(finding);
    }
  }

  async count(options: FindFindingsOptions = {}): Promise<number> {
    const { auditId, phase, category, riskLevel, status, assignedTo } = options;
    
    const filters: any = {};
    
    if (auditId) filters.audit = auditId;
    if (phase) filters.phase = phase;
    if (category) filters.category = category;
    if (riskLevel) filters.riskLevel = riskLevel;
    if (status) filters.status = status;
    if (assignedTo) filters.assignedTo = assignedTo;

    return this.repository.count(filters);
  }

  async bulkSave(findings: AuditFinding[]): Promise<AuditFinding[]> {
    findings.forEach(finding => this.repository.persist(finding));
    await this.repository.flush();
    return findings;
  }
}