import { IsArray, ValidateNested, IsString, IsOptional, IsEnum, IsObject, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { KnowledgeBaseItemType } from '../../domain/entity/knowledge-base-item.entity';

export class BulkCreateKnowledgeBaseItemDto {
  @IsString()
  id?: string; // Optional external ID for duplicate detection

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

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}

export class BulkCreateRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkCreateKnowledgeBaseItemDto)
  items: BulkCreateKnowledgeBaseItemDto[];
}