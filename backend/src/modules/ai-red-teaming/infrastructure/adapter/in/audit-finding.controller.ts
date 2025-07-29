import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuditFindingService } from '../../application/service/audit-finding.service';
import { CreateFindingDto } from '../../application/dto/create-finding.dto';
import { AuditFinding, RiskLevel, FindingStatus } from '../../domain/entity/audit-finding.entity';
import { AuditPhase } from '../../domain/entity/audit.entity';

@Controller('api/audit-findings')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
export class AuditFindingController {
  constructor(private readonly findingService: AuditFindingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFinding(@Body() createFindingDto: CreateFindingDto): Promise<AuditFinding> {
    return this.findingService.createFinding(createFindingDto);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  async bulkCreateFindings(@Body() findings: CreateFindingDto[]): Promise<AuditFinding[]> {
    return this.findingService.bulkCreateFindings(findings);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AuditFinding> {
    return this.findingService.findById(id);
  }

  @Get('audit/:auditId')
  async findByAuditId(@Param('auditId') auditId: string): Promise<AuditFinding[]> {
    return this.findingService.findByAuditId(auditId);
  }

  @Get('audit/:auditId/phase/:phase')
  async getFindingsByPhase(
    @Param('auditId') auditId: string,
    @Param('phase') phase: AuditPhase,
  ): Promise<AuditFinding[]> {
    return this.findingService.getFindingsByPhase(auditId, phase);
  }

  @Get('audit/:auditId/risk/:riskLevel')
  async getFindingsByRiskLevel(
    @Param('auditId') auditId: string,
    @Param('riskLevel') riskLevel: RiskLevel,
  ): Promise<AuditFinding[]> {
    return this.findingService.getFindingsByRiskLevel(auditId, riskLevel);
  }

  @Put(':id/risk')
  async updateFindingRisk(
    @Param('id') id: string,
    @Body('riskLevel') riskLevel: RiskLevel,
  ): Promise<AuditFinding> {
    return this.findingService.updateFindingRisk(id, riskLevel);
  }

  @Put(':id/status')
  async updateFindingStatus(
    @Param('id') id: string,
    @Body('status') status: FindingStatus,
  ): Promise<AuditFinding> {
    return this.findingService.updateFindingStatus(id, status);
  }

  @Put(':id/assign')
  async assignFinding(
    @Param('id') id: string,
    @Body() assignmentData: { userId: string; dueDate?: string },
  ): Promise<AuditFinding> {
    const dueDate = assignmentData.dueDate ? new Date(assignmentData.dueDate) : undefined;
    return this.findingService.assignFinding(id, assignmentData.userId, dueDate);
  }

  @Put(':id/evidence')
  async addEvidence(
    @Param('id') id: string,
    @Body('evidence') evidence: string,
  ): Promise<AuditFinding> {
    return this.findingService.addEvidence(id, evidence);
  }

  @Put(':id/remediation')
  async updateRemediation(
    @Param('id') id: string,
    @Body('notes') notes: string,
  ): Promise<AuditFinding> {
    return this.findingService.updateRemediation(id, notes);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFinding(@Param('id') id: string): Promise<void> {
    return this.findingService.deleteFinding(id);
  }
}