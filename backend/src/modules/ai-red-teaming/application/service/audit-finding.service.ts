import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuditFinding, RiskLevel, FindingStatus } from '../../domain/entity/audit-finding.entity';
import { Audit, AuditPhase } from '../../domain/entity/audit.entity';
import { IAuditFindingRepository } from '../../domain/repository/audit-finding-repository.interface';
import { IAuditRepository } from '../../domain/repository/audit-repository.interface';
import { CreateFindingDto } from '../dto/create-finding.dto';

@Injectable()
export class AuditFindingService {
  constructor(
    private readonly findingRepository: IAuditFindingRepository,
    private readonly auditRepository: IAuditRepository,
  ) {}

  async createFinding(createFindingDto: CreateFindingDto): Promise<AuditFinding> {
    const audit = await this.auditRepository.findById(createFindingDto.auditId);
    if (!audit) {
      throw new NotFoundException(`Audit with ID ${createFindingDto.auditId} not found`);
    }

    const finding = new AuditFinding(
      audit,
      createFindingDto.phase,
      createFindingDto.category,
      createFindingDto.checklistItem,
      createFindingDto.title,
      createFindingDto.riskLevel
    );

    if (createFindingDto.description) {
      finding.description = createFindingDto.description;
    }
    if (createFindingDto.evidence) {
      finding.evidence = createFindingDto.evidence;
    }
    if (createFindingDto.impact) {
      finding.impact = createFindingDto.impact;
    }
    if (createFindingDto.recommendation) {
      finding.recommendation = createFindingDto.recommendation;
    }
    if (createFindingDto.cweId) {
      finding.cweId = createFindingDto.cweId;
    }
    if (createFindingDto.cveId) {
      finding.cveId = createFindingDto.cveId;
    }
    if (createFindingDto.technicalDetails) {
      finding.technicalDetails = createFindingDto.technicalDetails;
    }
    if (createFindingDto.reproductionSteps) {
      finding.reproductionSteps = createFindingDto.reproductionSteps;
    }

    const savedFinding = await this.findingRepository.save(finding);
    
    // Update audit's risk score after adding a new finding
    audit.updateRiskScore();
    await this.auditRepository.update(audit);

    return savedFinding;
  }

  async findById(id: string): Promise<AuditFinding> {
    const finding = await this.findingRepository.findById(id);
    if (!finding) {
      throw new NotFoundException(`Finding with ID ${id} not found`);
    }
    return finding;
  }

  async findByAuditId(auditId: string): Promise<AuditFinding[]> {
    return this.findingRepository.findByAuditId(auditId);
  }

  async updateFindingRisk(id: string, riskLevel: RiskLevel): Promise<AuditFinding> {
    const finding = await this.findById(id);
    finding.updateRiskLevel(riskLevel);
    
    const updatedFinding = await this.findingRepository.update(finding);
    
    // Update audit's risk score
    const audit = await this.auditRepository.findById(finding.audit.id);
    if (audit) {
      audit.updateRiskScore();
      await this.auditRepository.update(audit);
    }

    return updatedFinding;
  }

  async updateFindingStatus(id: string, status: FindingStatus): Promise<AuditFinding> {
    const finding = await this.findById(id);
    
    switch (status) {
      case FindingStatus.RESOLVED:
        finding.resolve();
        break;
      case FindingStatus.ACCEPTED_RISK:
        finding.acceptRisk();
        break;
      case FindingStatus.FALSE_POSITIVE:
        finding.markAsFalsePositive();
        break;
      default:
        finding.status = status;
    }

    return this.findingRepository.update(finding);
  }

  async assignFinding(id: string, userId: string, dueDate?: Date): Promise<AuditFinding> {
    const finding = await this.findById(id);
    finding.assignTo(userId, dueDate);
    return this.findingRepository.update(finding);
  }

  async addEvidence(id: string, evidence: string): Promise<AuditFinding> {
    const finding = await this.findById(id);
    finding.addEvidence(evidence);
    return this.findingRepository.update(finding);
  }

  async updateRemediation(id: string, notes: string): Promise<AuditFinding> {
    const finding = await this.findById(id);
    finding.updateRemediation(notes);
    return this.findingRepository.update(finding);
  }

  async deleteFinding(id: string): Promise<void> {
    const finding = await this.findById(id);
    await this.findingRepository.delete(id);
    
    // Update audit's risk score after deleting a finding
    const audit = await this.auditRepository.findById(finding.audit.id);
    if (audit) {
      audit.updateRiskScore();
      await this.auditRepository.update(audit);
    }
  }

  async bulkCreateFindings(findings: CreateFindingDto[]): Promise<AuditFinding[]> {
    const auditFindings: AuditFinding[] = [];
    
    for (const dto of findings) {
      const audit = await this.auditRepository.findById(dto.auditId);
      if (!audit) {
        throw new NotFoundException(`Audit with ID ${dto.auditId} not found`);
      }

      const finding = new AuditFinding(
        audit,
        dto.phase,
        dto.category,
        dto.checklistItem,
        dto.title,
        dto.riskLevel
      );

      // Set optional properties
      if (dto.description) finding.description = dto.description;
      if (dto.evidence) finding.evidence = dto.evidence;
      if (dto.impact) finding.impact = dto.impact;
      if (dto.recommendation) finding.recommendation = dto.recommendation;
      if (dto.cweId) finding.cweId = dto.cweId;
      if (dto.cveId) finding.cveId = dto.cveId;
      if (dto.technicalDetails) finding.technicalDetails = dto.technicalDetails;
      if (dto.reproductionSteps) finding.reproductionSteps = dto.reproductionSteps;

      auditFindings.push(finding);
    }

    const savedFindings = await this.findingRepository.bulkSave(auditFindings);
    
    // Update risk scores for all affected audits
    const auditIds = [...new Set(findings.map(f => f.auditId))];
    for (const auditId of auditIds) {
      const audit = await this.auditRepository.findById(auditId);
      if (audit) {
        audit.updateRiskScore();
        await this.auditRepository.update(audit);
      }
    }

    return savedFindings;
  }

  async getFindingsByPhase(auditId: string, phase: AuditPhase): Promise<AuditFinding[]> {
    return this.findingRepository.findAll({ auditId, phase });
  }

  async getFindingsByRiskLevel(auditId: string, riskLevel: RiskLevel): Promise<AuditFinding[]> {
    return this.findingRepository.findAll({ auditId, riskLevel });
  }
}