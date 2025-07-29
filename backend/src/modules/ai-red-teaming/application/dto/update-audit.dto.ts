import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { AuditStatus, AuditPhase } from '../../domain/entity/audit.entity';

export class UpdateAuditDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  objectives?: string;

  @IsOptional()
  @IsString()
  systemArchitecture?: string;

  @IsOptional()
  @IsString()
  riskTolerance?: string;

  @IsOptional()
  @IsEnum(AuditStatus)
  status?: AuditStatus;

  @IsOptional()
  @IsEnum(AuditPhase)
  currentPhase?: AuditPhase;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage?: number;

  @IsOptional()
  @IsString()
  executiveSummary?: string;

  @IsOptional()
  @IsString()
  recommendations?: string;
}