import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfExpertEntity, VcfExpertStatus, VcfExpertLevel } from '../domain/vcf-expert.entity';

@Injectable()
export class VcfExpertsRepository {
  constructor(
    @InjectRepository(VcfExpertEntity)
    private readonly repository: EntityRepository<VcfExpertEntity>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<VcfExpertEntity>): Promise<VcfExpertEntity> {
    const expert = this.repository.create(data);
    await this.em.persistAndFlush(expert);
    return expert;
  }

  async findOne(id: string): Promise<VcfExpertEntity | null> {
    return this.repository.findOne({ id }, { populate: ['user'] });
  }

  async findByUserId(userId: string): Promise<VcfExpertEntity | null> {
    return this.repository.findOne({ user: { id: userId } }, { populate: ['user'] });
  }

  async findAvailableExperts(
    languages?: string[],
    frameworks?: string[],
  ): Promise<VcfExpertEntity[]> {
    const query: any = {
      status: VcfExpertStatus.ACTIVE,
      isAvailable: true,
    };

    if (languages?.length) {
      query.programmingLanguages = { $in: languages };
    }

    if (frameworks?.length) {
      query.frameworks = { $in: frameworks };
    }

    return this.repository.find(query, {
      populate: ['user'],
      orderBy: { createdAt: 'DESC' } as any,
    });
  }

  async findActiveExperts(): Promise<VcfExpertEntity[]> {
    return this.repository.find(
      { status: VcfExpertStatus.ACTIVE },
      { populate: ['user'] }
    );
  }

  async update(expert: VcfExpertEntity): Promise<void> {
    await this.em.persistAndFlush(expert);
  }

  async updateStats(
    expertId: string,
    stats: Partial<VcfExpertEntity['stats']>,
  ): Promise<void> {
    const expert = await this.findOne(expertId);
    if (expert) {
      expert.stats = { ...expert.stats, ...stats };
      await this.update(expert);
    }
  }

  async incrementSessionCount(expertId: string): Promise<void> {
    const expert = await this.findOne(expertId);
    if (expert) {
      expert.stats.totalSessions++;
      expert.currentActiveSessions++;
      await this.update(expert);
    }
  }

  async decrementActiveSessionCount(expertId: string): Promise<void> {
    const expert = await this.findOne(expertId);
    if (expert && expert.currentActiveSessions > 0) {
      expert.currentActiveSessions--;
      await this.update(expert);
    }
  }

  async updateRating(
    expertId: string,
    newRating: number,
  ): Promise<void> {
    const expert = await this.findOne(expertId);
    if (expert) {
      const totalRatings = expert.stats.totalRatings;
      const currentAverage = expert.stats.averageRating;

      const newAverage = (currentAverage * totalRatings + newRating) / (totalRatings + 1);

      expert.stats.averageRating = newAverage;
      expert.stats.totalRatings = totalRatings + 1;

      await this.update(expert);
    }
  }

  async findByLevel(level: VcfExpertLevel): Promise<VcfExpertEntity[]> {
    return this.repository.find(
      { level, status: VcfExpertStatus.ACTIVE },
      { populate: ['user'] }
    );
  }

  async searchExperts(
    query: string,
    limit: number = 10,
  ): Promise<VcfExpertEntity[]> {
    return this.repository.find(
      {
        status: VcfExpertStatus.ACTIVE,
        $or: [
          { bio: { $like: `%${query}%` } },
          { expertise: { $contains: query } },
          { programmingLanguages: { $contains: query } },
          { frameworks: { $contains: query } },
        ],
      },
      {
        populate: ['user'],
        limit,
        orderBy: { createdAt: 'DESC' } as any,
      }
    );
  }

  async getTopExperts(limit: number = 10): Promise<VcfExpertEntity[]> {
    return this.repository.find(
      { status: VcfExpertStatus.ACTIVE },
      {
        populate: ['user'],
        orderBy: { createdAt: 'DESC' } as any,
        limit,
      }
    );
  }
}