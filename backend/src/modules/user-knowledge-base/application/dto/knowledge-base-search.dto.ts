import { IsString, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';

export class KnowledgeBaseSearchDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsEnum(KnowledgeBaseItemType)
  type?: KnowledgeBaseItemType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize?: number = 20;
}