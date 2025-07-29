import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { AuditScope } from '../../domain/entity/audit.entity';

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  systemName: string;

  @IsString()
  @IsNotEmpty()
  auditorName: string;

  @IsDateString()
  startDate: string;

  @IsEnum(AuditScope)
  scope: AuditScope;

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
}