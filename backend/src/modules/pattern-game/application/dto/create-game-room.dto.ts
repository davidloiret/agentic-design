import { IsEnum, IsOptional, IsObject } from 'class-validator';
import type { GameMode } from '../../domain/entity/game-room.entity';

export class CreateGameRoomDto {
  @IsEnum(['pvp', 'pve'])
  mode: GameMode = 'pvp';

  @IsOptional()
  @IsObject()
  gameSettings?: {
    maxTurnTime: number;
    deckSize: number;
    maxHandSize: number;
  };
}