import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { GameRoom, GameStatus } from '../../domain/entity/game-room.entity';
import { GameRoomRepositoryInterface } from '../../domain/repository/game-room-repository.interface';

@Injectable()
export class GameRoomRepository implements GameRoomRepositoryInterface {
  constructor(
    @InjectRepository(GameRoom)
    private readonly repository: EntityRepository<GameRoom>,
    private readonly em: EntityManager,
  ) {}

  async create(gameRoom: GameRoom): Promise<GameRoom> {
    await this.em.persistAndFlush(gameRoom);
    return gameRoom;
  }

  async findById(id: string): Promise<GameRoom | null> {
    return await this.repository.findOne({ id });
  }

  async findByPlayerId(playerId: string): Promise<GameRoom[]> {
    return await this.repository.find({
      $or: [
        { hostPlayerId: playerId },
        { guestPlayerId: playerId },
      ],
    });
  }

  async findWaitingRooms(): Promise<GameRoom[]> {
    return await this.repository.find(
      { status: 'waiting' },
      { orderBy: { createdAt: 'ASC' } },
    );
  }

  async findActiveGamesByPlayerId(playerId: string): Promise<GameRoom[]> {
    return await this.repository.find({
      $and: [
        {
          $or: [
            { hostPlayerId: playerId },
            { guestPlayerId: playerId },
          ],
        },
        {
          status: { $in: ['waiting', 'playing'] },
        },
      ],
    });
  }

  async updateGameState(id: string, gameState: any): Promise<void> {
    await this.repository.nativeUpdate({ id }, { gameState });
  }

  async updateStatus(id: string, status: GameStatus): Promise<void> {
    await this.repository.nativeUpdate({ id }, { status });
  }

  async save(gameRoom: GameRoom): Promise<GameRoom> {
    await this.em.persistAndFlush(gameRoom);
    return gameRoom;
  }

  async remove(gameRoom: GameRoom): Promise<void> {
    await this.em.removeAndFlush(gameRoom);
  }

  async findByStatus(status: GameStatus): Promise<GameRoom[]> {
    return await this.repository.find({ status });
  }
}