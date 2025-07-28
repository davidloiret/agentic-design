import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateProgressDto {
  @IsString()
  courseId: string;

  @IsString()
  lessonId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpent?: number;
}