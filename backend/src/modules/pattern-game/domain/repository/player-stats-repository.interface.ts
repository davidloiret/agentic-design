import { PlayerStats } from '../entity/player-stats.entity';

export interface PlayerStatsRepositoryInterface {
  create(playerStats: PlayerStats): Promise<PlayerStats>;
  findByUserId(userId: string): Promise<PlayerStats | null>;
  findOrCreateByUserId(userId: string): Promise<PlayerStats>;
  save(playerStats: PlayerStats): Promise<PlayerStats>;
  findLeaderboard(limit?: number): Promise<PlayerStats[]>;
  findByRank(rank: string): Promise<PlayerStats[]>;
}