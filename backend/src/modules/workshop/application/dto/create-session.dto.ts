import { IsString, IsEnum, IsNumber, IsDateString, IsOptional, IsArray, IsObject } from 'class-validator';
import { SessionType } from '../../domain/entity/workshop-session.entity';

export class CreateSessionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  sessionNumber: number;

  @IsEnum(SessionType)
  type: SessionType;

  @IsDateString()
  scheduledStartTime: string;

  @IsDateString()
  scheduledEndTime: string;

  @IsOptional()
  @IsString()
  leadInstructorId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assistantInstructorIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  learningObjectives?: string[];

  @IsOptional()
  @IsArray()
  materials?: Array<{
    id: string;
    title: string;
    type: 'slide' | 'video' | 'document' | 'code' | 'resource';
    url: string;
    duration?: number;
    isRequired: boolean;
  }>;

  @IsOptional()
  @IsObject()
  liveFeatures?: {
    enableChat: boolean;
    enablePolls: boolean;
    enableBreakoutRooms: boolean;
    enableWhiteboard: boolean;
    enableScreenShare: boolean;
    maxBreakoutRooms?: number;
  };
}