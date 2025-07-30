import { IsString, IsOptional } from 'class-validator';

export class UpdateContentWithDiffDto {
  @IsOptional()
  @IsString()
  rawContent?: string;

  @IsOptional()
  @IsString()
  markdownContent?: string;

  @IsOptional()
  @IsString()
  rawDiff?: string;

  @IsOptional()
  @IsString()
  markdownDiff?: string;

  @IsOptional()
  @IsString()
  checksum?: string;
}