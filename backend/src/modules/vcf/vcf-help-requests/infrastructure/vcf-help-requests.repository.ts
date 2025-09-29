import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { VcfHelpRequestEntity, VcfHelpRequestStatus, VcfHelpRequestType, VcfHelpRequestPriority } from '../domain/vcf-help-request.entity';

@Injectable()
export class VcfHelpRequestsRepository {
  constructor(
    @InjectRepository(VcfHelpRequestEntity)
    private readonly repository: EntityRepository<VcfHelpRequestEntity>,
    private readonly em: EntityManager,
  ) {}

  async create(data: Partial<VcfHelpRequestEntity>): Promise<VcfHelpRequestEntity> {
    const request = this.repository.create(data);
    await this.em.persistAndFlush(request);
    return request;
  }

  async findOne(id: string): Promise<VcfHelpRequestEntity | null> {
    return this.repository.findOne({ id }, { populate: ['user', 'assignedExpert'] });
  }

  async findUserRequests(userId: string): Promise<VcfHelpRequestEntity[]> {
    return this.repository.find(
      { user: { id: userId } },
      { populate: ['assignedExpert'], orderBy: { createdAt: 'DESC' } }
    );
  }

  async findOpenRequests(
    filters?: {
      type?: VcfHelpRequestType;
      priority?: VcfHelpRequestPriority;
      programmingLanguage?: string;
      framework?: string;
      tags?: string[];
    }
  ): Promise<VcfHelpRequestEntity[]> {
    const query: any = {
      status: VcfHelpRequestStatus.OPEN,
      isPublic: true,
    };

    if (filters?.type) {
      query.type = filters.type;
    }

    if (filters?.priority) {
      query.priority = filters.priority;
    }

    if (filters?.programmingLanguage) {
      query.programmingLanguage = filters.programmingLanguage;
    }

    if (filters?.framework) {
      query.framework = filters.framework;
    }

    if (filters?.tags?.length) {
      query.tags = { $in: filters.tags };
    }

    return this.repository.find(query, {
      populate: ['user'],
      orderBy: { priority: 'DESC', createdAt: 'DESC' },
    });
  }

  async findExpertRequests(expertId: string): Promise<VcfHelpRequestEntity[]> {
    return this.repository.find(
      { assignedExpert: { id: expertId } },
      { populate: ['user'], orderBy: { createdAt: 'DESC' } }
    );
  }

  async update(request: VcfHelpRequestEntity): Promise<void> {
    await this.em.persistAndFlush(request);
  }

  async incrementViewCount(requestId: string): Promise<void> {
    const request = await this.findOne(requestId);
    if (request) {
      request.metadata.viewCount++;
      await this.update(request);
    }
  }

  async addInterestedExpert(requestId: string, expertId: string): Promise<void> {
    const request = await this.findOne(requestId);
    if (request && !request.metadata.interestedExperts.includes(expertId)) {
      request.metadata.interestedExperts.push(expertId);
      await this.update(request);
    }
  }

  async addDeclinedExpert(requestId: string, expertId: string): Promise<void> {
    const request = await this.findOne(requestId);
    if (request && !request.metadata.declinedExperts.includes(expertId)) {
      request.metadata.declinedExperts.push(expertId);
      await this.update(request);
    }
  }

  async findExpiredRequests(): Promise<VcfHelpRequestEntity[]> {
    const now = new Date();
    return this.repository.find({
      status: { $in: [VcfHelpRequestStatus.OPEN, VcfHelpRequestStatus.CLAIMED] },
      expiresAt: { $lte: now },
    });
  }

  async getRequestStats(startDate?: Date, endDate?: Date): Promise<{
    totalRequests: number;
    openRequests: number;
    completedRequests: number;
    averageCompletionTimeHours: number;
    satisfactionAverage: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    const query: any = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const requests = await this.repository.find(query);

    const completed = requests.filter(r => r.status === VcfHelpRequestStatus.COMPLETED);
    const withRating = completed.filter(r => r.satisfactionRating);

    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    requests.forEach(request => {
      byType[request.type] = (byType[request.type] || 0) + 1;
      byPriority[request.priority] = (byPriority[request.priority] || 0) + 1;
    });

    return {
      totalRequests: requests.length,
      openRequests: requests.filter(r => r.status === VcfHelpRequestStatus.OPEN).length,
      completedRequests: completed.length,
      averageCompletionTimeHours: completed.length > 0
        ? completed.reduce((sum, r) => sum + (r.actualTimeHours || 0), 0) / completed.length
        : 0,
      satisfactionAverage: withRating.length > 0
        ? withRating.reduce((sum, r) => sum + (r.satisfactionRating || 0), 0) / withRating.length
        : 0,
      byType,
      byPriority,
    };
  }

  async searchRequests(query: string, limit: number = 20): Promise<VcfHelpRequestEntity[]> {
    return this.repository.find(
      {
        isPublic: true,
        $or: [
          { title: { $like: `%${query}%` } },
          { description: { $like: `%${query}%` } },
          { tags: { $contains: query } },
          { programmingLanguage: { $like: `%${query}%` } },
          { framework: { $like: `%${query}%` } },
        ],
      },
      {
        populate: ['user', 'assignedExpert'],
        limit,
        orderBy: { createdAt: 'DESC' },
      }
    );
  }
}