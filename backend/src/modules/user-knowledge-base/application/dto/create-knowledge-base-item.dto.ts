import { IsString, IsOptional, IsArray, IsEnum, IsObject, IsBoolean } from 'class-validator';
import { KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';

export class CreateKnowledgeBaseItemDto {
  @IsString()
  workspaceId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  collectionIds?: string[];

  @IsEnum(KnowledgeBaseItemType)
  type: KnowledgeBaseItemType;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  rawContent?: string;

  @IsOptional()
  @IsString()
  markdownContent?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  filePath?: string;

  @IsOptional()
  @IsBoolean()
  shouldFollow?: boolean;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}