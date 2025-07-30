import { IsString, IsOptional, IsNumber } from 'class-validator';

export class MoveCollectionDto {
  @IsOptional()
  @IsString()
  newParentId?: string; // null for root level

  @IsOptional()
  @IsNumber()
  newOrder?: number;
}