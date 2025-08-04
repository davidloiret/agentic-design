import { IsString, IsEnum, IsNumber, IsDateString, IsOptional, IsObject } from 'class-validator';
import { ActivityType } from '../../domain/entity/session-activity.entity';

export class CreateActivityDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ActivityType)
  type: ActivityType;

  @IsDateString()
  scheduledStartTime: string;

  @IsNumber()
  duration: number; // in minutes

  @IsNumber()
  points: number;

  @IsOptional()
  @IsObject()
  config?: any; // Activity-specific configuration
}