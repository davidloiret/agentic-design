import { IsString, IsEnum, IsNumber, IsOptional, IsArray, IsObject, IsDateString, Min, Max } from 'class-validator';
import { WorkshopType, WorkshopTier } from '../../domain/entity/workshop.entity';

export class CreateWorkshopDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(WorkshopType)
  type: WorkshopType;

  @IsEnum(WorkshopTier)
  tier: WorkshopTier;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  maxParticipants: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  learningOutcomes?: string[];

  @IsOptional()
  @IsObject()
  schedule?: {
    timezone: string;
    sessions: Array<{
      date: string;
      startTime: string;
      endTime: string;
      title: string;
      description: string;
    }>;
  };

  @IsOptional()
  @IsObject()
  locationDetails?: {
    venue?: string;
    address?: string;
    city?: string;
    country?: string;
    onlineUrl?: string;
    hybridInstructions?: string;
  };

  @IsOptional()
  @IsObject()
  gamificationConfig?: {
    enableTeams: boolean;
    enableLeaderboard: boolean;
    enableBattles: boolean;
    enableAchievements: boolean;
    pointsPerActivity: Record<string, number>;
    teamSize?: number;
    bonusPoints: {
      firstPlace: number;
      secondPlace: number;
      thirdPlace: number;
      participation: number;
    };
  };

  @IsOptional()
  @IsObject()
  prerequisites?: {
    minLevel?: number;
    requiredJourneys?: string[];
    requiredAchievements?: string[];
  };

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalXpReward?: number;
}