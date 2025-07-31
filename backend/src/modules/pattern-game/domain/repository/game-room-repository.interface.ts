import { GameRoom, GameStatus } from '../entity/game-room.entity';

export interface GameRoomRepositoryInterface {
  create(gameRoom: GameRoom): Promise<GameRoom>;
  findById(id: string): Promise<GameRoom | null>;
  findByPlayerId(playerId: string): Promise<GameRoom[]>;
  findWaitingRooms(): Promise<GameRoom[]>;
  findActiveGamesByPlayerId(playerId: string): Promise<GameRoom[]>;
  updateGameState(id: string, gameState: any): Promise<void>;
  updateStatus(id: string, status: GameStatus): Promise<void>;
  save(gameRoom: GameRoom): Promise<GameRoom>;
  remove(gameRoom: GameRoom): Promise<void>;
  findByStatus(status: GameStatus): Promise<GameRoom[]>;
}