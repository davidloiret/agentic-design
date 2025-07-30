import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsObject } from 'class-validator';
import { CollectionRule } from '../../domain/entity/collection.entity';

export class CreateCollectionDto {
  @IsOptional()
  @IsString()
  workspaceId?: string;

  @IsString()
  name: string;

  @IsString()
  color: string;

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
  isSmartCollection?: boolean;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  smartRules?: CollectionRule[];
}