import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserXp, UserXpTransaction, XpSource } from '../../domain/entity/user-xp.entity';
import { IUserXpRepository, IUserXpTransactionRepository } from '../../domain/repository/user-xp-repository.interface';

@Injectable()
export class UserXpRepository implements IUserXpRepository {
  constructor(
    @InjectRepository(UserXp)
    private readonly repository: EntityRepository<UserXp>,
  ) {}

  async findByUser(userId: string): Promise<UserXp | null> {
    return this.repository.findOne({ 
      user: userId 
    }, { populate: ['user'] });
  }

  async save(userXp: UserXp): Promise<UserXp> {
    await this.repository.getEntityManager().persistAndFlush(userXp);
    return userXp;
  }

  async update(userXp: UserXp): Promise<UserXp> {
    await this.repository.getEntityManager().flush();
    return userXp;
  }

  async delete(id: string): Promise<void> {
    const userXp = await this.repository.findOne({ id });
    if (userXp) {
      await this.repository.getEntityManager().removeAndFlush(userXp);
    }
  }

  async getLeaderboard(limit: number = 10): Promise<UserXp[]> {
    return this.repository.find({}, {
      populate: ['user'],
      orderBy: { totalXp: 'DESC' },
      limit
    });
  }
}

@Injectable()
export class UserXpTransactionRepository implements IUserXpTransactionRepository {
  constructor(
    @InjectRepository(UserXpTransaction)
    private readonly repository: EntityRepository<UserXpTransaction>,
  ) {}

  async findByUser(userId: string, limit: number = 50): Promise<UserXpTransaction[]> {
    return this.repository.find({ 
      user: userId 
    }, { 
      populate: ['user'],
      orderBy: { earnedAt: 'DESC' },
      limit
    });
  }

  async findByUserAndSource(userId: string, source: XpSource): Promise<UserXpTransaction[]> {
    return this.repository.find({ 
      user: userId, 
      source 
    }, { 
      populate: ['user'],
      orderBy: { earnedAt: 'DESC' }
    });
  }

  async save(transaction: UserXpTransaction): Promise<UserXpTransaction> {
    await this.repository.getEntityManager().persistAndFlush(transaction);
    return transaction;
  }

  async delete(id: string): Promise<void> {
    const transaction = await this.repository.findOne({ id });
    if (transaction) {
      await this.repository.getEntityManager().removeAndFlush(transaction);
    }
  }

  async getTotalXpBySource(userId: string): Promise<{ source: XpSource; total: number }[]> {
    const em = this.repository.getEntityManager();
    const result = await em.getConnection().execute(`
      SELECT source, SUM(amount) as total
      FROM user_xp_transactions
      WHERE user_id = ?
      GROUP BY source
      ORDER BY total DESC
    `, [userId]);

    return result.map((row: any) => ({
      source: row.source as XpSource,
      total: parseInt(row.total, 10)
    }));
  }
}