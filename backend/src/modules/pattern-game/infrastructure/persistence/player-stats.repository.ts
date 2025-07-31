import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PlayerStats } from '../../domain/entity/player-stats.entity';
import { PlayerStatsRepositoryInterface } from '../../domain/repository/player-stats-repository.interface';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class PlayerStatsRepository implements PlayerStatsRepositoryInterface {
  constructor(
    @InjectRepository(PlayerStats)
    private readonly repository: EntityRepository<PlayerStats>,
    private readonly em: EntityManager,
  ) {}

  async create(playerStats: PlayerStats): Promise<PlayerStats> {
    await this.em.persistAndFlush(playerStats);
    return playerStats;
  }

  async findByUserId(userId: string): Promise<PlayerStats | null> {
    return await this.repository.findOne({ userId });
  }

  async findOrCreateByUserId(userId: string): Promise<PlayerStats> {
    let playerStats = await this.findByUserId(userId);
    
    if (!playerStats) {
      playerStats = new PlayerStats(userId);
      playerStats.id = uuidv7();
      await this.create(playerStats);
    }
    
    return playerStats;
  }

  async save(playerStats: PlayerStats): Promise<PlayerStats> {
    await this.em.persistAndFlush(playerStats);
    return playerStats;
  }

  async findLeaderboard(limit: number = 50): Promise<PlayerStats[]> {
    return await this.repository.find(
      {},
      {
        orderBy: [
          { level: 'DESC' },
          { experience: 'DESC' },
          { winRate: 'DESC' },
        ],
        limit,
      },
    );
  }

  async findByRank(rank: string): Promise<PlayerStats[]> {
    return await this.repository.find(
      { currentRank: rank },
      { orderBy: { rankPoints: 'DESC' } },
    );
  }
}