import { UserXp, UserXpTransaction, XpSource } from '../entity/user-xp.entity';

export interface IUserXpRepository {
  findByUser(userId: string): Promise<UserXp | null>;
  save(userXp: UserXp): Promise<UserXp>;
  update(userXp: UserXp): Promise<UserXp>;
  delete(id: string): Promise<void>;
  getLeaderboard(limit?: number): Promise<UserXp[]>;
}

export interface IUserXpTransactionRepository {
  findByUser(userId: string, limit?: number): Promise<UserXpTransaction[]>;
  findByUserAndSource(userId: string, source: XpSource): Promise<UserXpTransaction[]>;
  save(transaction: UserXpTransaction): Promise<UserXpTransaction>;
  delete(id: string): Promise<void>;
  getTotalXpBySource(userId: string): Promise<{ source: XpSource; total: number }[]>;
}