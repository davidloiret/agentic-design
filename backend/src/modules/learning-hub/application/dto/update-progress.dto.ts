import { IsString, IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProgressDto {
  @IsString()
  courseId: string;

  @IsString()
  lessonId: string;

  @IsOptional()
  @IsString()
  journeyId?: string;

  @IsOptional()
  @IsString()
  chapterId?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  xpEarned?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}