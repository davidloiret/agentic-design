import { IsString, IsOptional, IsObject, MaxLength, MinLength } from 'class-validator';

export class SaveSearchDto {
  @IsString()
  @MinLength(1, { message: 'Query cannot be empty' })
  @MaxLength(255, { message: 'Query cannot exceed 255 characters' })
  query: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Category cannot exceed 100 characters' })
  category?: string;

  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Search type cannot exceed 50 characters' })
  searchType?: string;
}