import { Injectable } from "@nestjs/common";
import { EntityRepository, EntityManager } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { RecentSearch } from "../../domain/entity/recent-search.entity";
import { RecentSearchRepositoryInterface } from "../../domain/repository/recent-search-repository.interface";

@Injectable()
export class RecentSearchRepository implements RecentSearchRepositoryInterface {
  constructor(
    @InjectRepository(RecentSearch)
    private readonly repository: EntityRepository<RecentSearch>,
    private readonly entityManager: EntityManager,
  ) {}

  async save(recentSearch: RecentSearch): Promise<RecentSearch> {
    await this.entityManager.persistAndFlush(recentSearch);
    return recentSearch;
  }

  async findByUserId(userId: string, limit: number = 10): Promise<RecentSearch[]> {
    return await this.repository.find(
      { user: userId },
      {
        orderBy: { lastSearchedAt: 'DESC' },
        limit,
        populate: ['user'],
      }
    );
  }

  async findByUserIdAndQuery(userId: string, query: string): Promise<RecentSearch | null> {
    return await this.repository.findOne({
      user: userId,
      query,
    }, {
      populate: ['user'],
    });
  }

  async findBySession(sessionId: string, limit: number = 10): Promise<RecentSearch[]> {
    // For anonymous users, we could use a session identifier
    // This is a placeholder implementation
    return await this.repository.find(
      { 
        user: null,
        // We could add a sessionId field to track anonymous searches
      },
      {
        orderBy: { lastSearchedAt: 'DESC' },
        limit,
      }
    );
  }

  async findMostFrequentByUserId(userId: string, limit: number = 5): Promise<RecentSearch[]> {
    return await this.repository.find(
      { user: userId },
      {
        orderBy: { frequency: 'DESC', lastSearchedAt: 'DESC' },
        limit,
        populate: ['user'],
      }
    );
  }

  async deleteOldSearches(daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.repository.nativeDelete({
      lastSearchedAt: { $lt: cutoffDate },
    });

    return result;
  }

  async deleteByUserId(userId: string): Promise<number> {
    const result = await this.repository.nativeDelete({ user: userId });
    return result;
  }

  async updateLastSearched(id: string): Promise<void> {
    await this.repository.nativeUpdate(
      { id },
      { lastSearchedAt: new Date() }
    );
  }

  async getSearchAnalytics(userId: string): Promise<{
    totalSearches: number;
    uniqueQueries: number;
    mostSearchedCategories: Array<{ category: string; count: number }>;
    recentActivity: RecentSearch[];
  }> {
    const totalSearches = await this.repository.count({ user: userId });
    
    // Get all searches for this user and calculate unique queries in memory
    const allSearches = await this.repository.find({ user: userId });
    const uniqueQueries = new Set(allSearches.map(search => search.query)).size;

    // Calculate category statistics in memory
    const categoryCount: Record<string, number> = {};
    allSearches.forEach(search => {
      if (search.category) {
        categoryCount[search.category] = (categoryCount[search.category] || 0) + 1;
      }
    });

    const mostSearchedCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentActivity = await this.findByUserId(userId, 10);

    return {
      totalSearches,
      uniqueQueries,
      mostSearchedCategories,
      recentActivity,
    };
  }
}