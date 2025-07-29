import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Audit, AuditStatus, AuditPhase, AuditScope } from '../../domain/entity/audit.entity';
import { AuditFinding } from '../../domain/entity/audit-finding.entity';
import { IAuditRepository } from '../../domain/repository/audit-repository.interface';
import { IAuditFindingRepository } from '../../domain/repository/audit-finding-repository.interface';
import { CreateAuditDto } from '../dto/create-audit.dto';
import { UpdateAuditDto } from '../dto/update-audit.dto';

@Injectable()
export class AuditService {
  constructor(
    private readonly auditRepository: IAuditRepository,
    private readonly findingRepository: IAuditFindingRepository,
  ) {}

  async createAudit(createAuditDto: CreateAuditDto, userId?: string): Promise<Audit> {
    const audit = new Audit(
      createAuditDto.systemName,
      createAuditDto.auditorName,
      new Date(createAuditDto.startDate),
      createAuditDto.scope,
      userId
    );

    if (createAuditDto.description) {
      audit.description = createAuditDto.description;
    }
    if (createAuditDto.objectives) {
      audit.objectives = createAuditDto.objectives;
    }
    if (createAuditDto.systemArchitecture) {
      audit.systemArchitecture = createAuditDto.systemArchitecture;
    }
    if (createAuditDto.riskTolerance) {
      audit.riskTolerance = createAuditDto.riskTolerance;
    }

    return this.auditRepository.save(audit);
  }

  async findAuditById(id: string): Promise<Audit> {
    const audit = await this.auditRepository.findById(id);
    if (!audit) {
      throw new NotFoundException(`Audit with ID ${id} not found`);
    }
    return audit;
  }

  async findAuditByIdWithFindings(id: string): Promise<Audit> {
    const audit = await this.auditRepository.findByIdWithFindings(id);
    if (!audit) {
      throw new NotFoundException(`Audit with ID ${id} not found`);
    }
    return audit;
  }

  async findUserAudits(userId: string): Promise<Audit[]> {
    return this.auditRepository.findByUserId(userId);
  }

  async updateAudit(id: string, updateAuditDto: UpdateAuditDto): Promise<Audit> {
    const audit = await this.findAuditById(id);

    if (updateAuditDto.description !== undefined) {
      audit.description = updateAuditDto.description;
    }
    if (updateAuditDto.objectives !== undefined) {
      audit.objectives = updateAuditDto.objectives;
    }
    if (updateAuditDto.systemArchitecture !== undefined) {
      audit.systemArchitecture = updateAuditDto.systemArchitecture;
    }
    if (updateAuditDto.riskTolerance !== undefined) {
      audit.riskTolerance = updateAuditDto.riskTolerance;
    }
    if (updateAuditDto.executiveSummary !== undefined) {
      audit.executiveSummary = updateAuditDto.executiveSummary;
    }
    if (updateAuditDto.recommendations !== undefined) {
      audit.recommendations = updateAuditDto.recommendations;
    }
    if (updateAuditDto.progressPercentage !== undefined) {
      audit.updateProgress(updateAuditDto.progressPercentage);
    }
    if (updateAuditDto.currentPhase !== undefined) {
      audit.updatePhase(updateAuditDto.currentPhase);
    }
    if (updateAuditDto.status !== undefined) {
      this.updateAuditStatus(audit, updateAuditDto.status);
    }

    return this.auditRepository.update(audit);
  }

  private updateAuditStatus(audit: Audit, newStatus: AuditStatus): void {
    switch (newStatus) {
      case AuditStatus.IN_PROGRESS:
        audit.startAudit();
        break;
      case AuditStatus.COMPLETED:
        audit.completeAudit();
        break;
      default:
        audit.status = newStatus;
    }
  }

  async deleteAudit(id: string): Promise<void> {
    const audit = await this.findAuditById(id);
    
    // Delete all associated findings first
    const findings = await this.findingRepository.findByAuditId(id);
    for (const finding of findings) {
      await this.findingRepository.delete(finding.id);
    }

    await this.auditRepository.delete(id);
  }

  async updateAuditProgress(id: string): Promise<Audit> {
    const audit = await this.findAuditByIdWithFindings(id);
    
    // Calculate progress based on completed checklist items
    const totalItems = this.getTotalChecklistItems();
    const completedItems = audit.findings.length; // Assuming each finding represents a completed item
    
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    audit.updateProgress(progress);
    
    // Update risk score
    audit.updateRiskScore();
    
    return this.auditRepository.update(audit);
  }

  private getTotalChecklistItems(): number {
    // This could be dynamically calculated based on audit scope and phases
    // For now, using a fixed number based on our methodology
    return 50; // Total items across all phases
  }

  async getAuditStatistics(id: string): Promise<any> {
    const audit = await this.findAuditByIdWithFindings(id);
    const findings = audit.findings.getItems();

    const riskDistribution = {
      critical: findings.filter(f => f.riskLevel === 'critical').length,
      high: findings.filter(f => f.riskLevel === 'high').length,
      medium: findings.filter(f => f.riskLevel === 'medium').length,
      low: findings.filter(f => f.riskLevel === 'low').length,
      info: findings.filter(f => f.riskLevel === 'info').length,
    };

    const phaseDistribution = {
      reconnaissance: findings.filter(f => f.phase === AuditPhase.RECONNAISSANCE).length,
      technical_testing: findings.filter(f => f.phase === AuditPhase.TECHNICAL_TESTING).length,
      data_privacy: findings.filter(f => f.phase === AuditPhase.DATA_PRIVACY).length,
      supply_chain: findings.filter(f => f.phase === AuditPhase.SUPPLY_CHAIN).length,
      governance: findings.filter(f => f.phase === AuditPhase.GOVERNANCE).length,
    };

    return {
      totalFindings: findings.length,
      overallRiskScore: audit.overallRiskScore,
      progressPercentage: audit.progressPercentage,
      riskDistribution,
      phaseDistribution,
      status: audit.status,
      currentPhase: audit.currentPhase,
    };
  }
}