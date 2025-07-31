import { IsEnum, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';
import type { ActionType } from '../../domain/entity/game-action.entity';

export class GameActionDto {
  @IsEnum(['play_card', 'attack', 'use_ability', 'end_turn', 'surrender'])
  actionType!: ActionType;

  @IsOptional()
  @IsObject()
  actionData?: {
    cardId?: string;
    targetId?: string;
    fromPosition?: number;
    toPosition?: number;
    abilityIndex?: number;
    [key: string]: any;
  };
}

export class GameActionResponseDto {
  success!: boolean;
  error?: string;
  gameState?: any;
  effects?: any[];
}