import { IsString, IsOptional, IsArray, IsObject, IsNumber, Min } from 'class-validator';

export class UpdateWorkshopDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  learningOutcomes?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

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
    enableTeams?: boolean;
    enableLeaderboard?: boolean;
    enableBattles?: boolean;
    enableAchievements?: boolean;
    pointsPerActivity?: Record<string, number>;
    teamSize?: number;
    bonusPoints?: {
      firstPlace?: number;
      secondPlace?: number;
      thirdPlace?: number;
      participation?: number;
    };
  };
}