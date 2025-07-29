import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { RiskLevel, FindingStatus } from '../../domain/entity/audit-finding.entity';
import { AuditPhase } from '../../domain/entity/audit.entity';

export class CreateFindingDto {
  @IsString()
  @IsNotEmpty()
  auditId: string;

  @IsEnum(AuditPhase)
  phase: AuditPhase;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  checklistItem: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(RiskLevel)
  riskLevel: RiskLevel;

  @IsOptional()
  @IsString()
  evidence?: string;

  @IsOptional()
  @IsString()
  impact?: string;

  @IsOptional()
  @IsString()
  recommendation?: string;

  @IsOptional()
  @IsString()
  cweId?: string;

  @IsOptional()
  @IsString()
  cveId?: string;

  @IsOptional()
  @IsString()
  technicalDetails?: string;

  @IsOptional()
  @IsString()
  reproductionSteps?: string;
}