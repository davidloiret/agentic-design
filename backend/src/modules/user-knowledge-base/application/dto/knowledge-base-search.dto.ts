import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
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
}