import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject } from 'class-validator';
import { CollectionRule } from '../../domain/entity/collection.entity';

export class UpdateCollectionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isExpanded?: boolean;

  @IsOptional()
  @IsBoolean()
  isSmartCollection?: boolean;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  smartRules?: CollectionRule[];
}