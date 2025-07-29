import { Injectable, Inject } from "@nestjs/common";
import { RecentSearch } from "../../domain/entity/recent-search.entity";
import { RecentSearchRepositoryInterface } from "../../domain/repository/recent-search-repository.interface";
import { SearchQuery } from "../../domain/value-object/search-query.vo";
import { SearchFilters } from "../../domain/value-object/search-filters.vo";
import { User } from "../../../user/domain/entity/user.entity";
import { EntityManager } from "@mikro-orm/core";

export interface SaveSearchCommand {
  query: string;
  userId?: string; // Now expects database ID, not supabaseId
  category?: string;
  filters?: Record<string, any>;
  searchType?: string;
}

export interface GetRecentSearchesQuery {
  userId?: string; // Now expects database ID, not supabaseId
  sessionId?: string;
  limit?: number;
}

export interface SearchAnalyticsQuery {
  userId: string; // Now expects database ID, not supabaseId
}

@Injectable()
export class RecentSearchService {
  constructor(
    @Inject('RecentSearchRepositoryInterface')
    private readonly recentSearchRepository: RecentSearchRepositoryInterface,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * Helper method to get user entity by database ID
   */
  private async getUserById(userId: string): Promise<User | null> {
    return await this.entityManager.findOne(User, { id: userId });
  }

  /**
   * Save a search query to recent searches
   * If the query already exists for the user, increment frequency
   */
  async saveSearch(command: SaveSearchCommand): Promise<RecentSearch> {
    const searchQuery = new SearchQuery(command.query);
    const searchFilters = new SearchFilters(command.filters || {});

    if (!command.userId) {
      throw new Error('User ID is required to save search');
    }

    let user: User | undefined;
    
    // Get user entity if userId is provided
    if (command.userId) {
      user = await this.getUserById(command.userId);
      
      if (!user) {
        console.error('[RecentSearchService] User not found with ID:', command.userId);
        throw new Error(`User with ID ${command.userId} not found`);
      }
      
      if (user) {
        const existingSearch = await this.recentSearchRepository.findByUserIdAndQuery(
          user.id,
          searchQuery.getValue()
        );

        if (existingSearch) {
          existingSearch.incrementFrequency();
          existingSearch.category = command.category || existingSearch.category;
          existingSearch.filters = searchFilters.isEmpty() ? existingSearch.filters : searchFilters.toJSON();
          existingSearch.searchType = command.searchType || existingSearch.searchType;
          
          return await this.recentSearchRepository.save(existingSearch);
        }
      }
    }

    // Create new search entry
    const recentSearch = new RecentSearch(
      searchQuery.getValue(),
      user,
      command.category,
      searchFilters.isEmpty() ? undefined : searchFilters.toJSON(),
      command.searchType
    );

    return await this.recentSearchRepository.save(recentSearch);
  }

  /**
   * Get recent searches for a user or session
   */
  async getRecentSearches(query: GetRecentSearchesQuery): Promise<RecentSearch[]> {
    const limit = Math.min(query.limit || 10, 50); // Cap at 50 results

    if (query.userId) {
      const user = await this.getUserById(query.userId);
      if (!user) {
        console.error('[RecentSearchService] User not found with ID:', query.userId);
        return [];
      }
      return await this.recentSearchRepository.findByUserId(user.id, limit);
    }

    if (query.sessionId) {
      return await this.recentSearchRepository.findBySession(query.sessionId, limit);
    }

    return [];
  }

  /**
   * Get most frequently searched queries for a user
   */
  async getMostFrequentSearches(userId: string, limit: number = 5): Promise<RecentSearch[]> {
    const user = await this.getUserById(userId);
    if (!user) {
      console.error('[RecentSearchService] User not found with ID:', userId);
      return [];
    }
    return await this.recentSearchRepository.findMostFrequentByUserId(
      user.id, 
      Math.min(limit, 20)  // Cap at 20 results
    );
  }

  /**
   * Get search analytics for a user
   */
  async getSearchAnalytics(query: SearchAnalyticsQuery) {
    const user = await this.getUserById(query.userId);
    if (!user) {
      console.error('[RecentSearchService] User not found with ID:', query.userId);
      return {
        totalSearches: 0,
        uniqueQueries: 0,
        mostSearchedCategories: [],
        recentActivity: []
      };
    }
    return await this.recentSearchRepository.getSearchAnalytics(user.id);
  }

  /**
   * Clear all recent searches for a user
   */
  async clearRecentSearches(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      console.error('[RecentSearchService] User not found with ID:', userId);
      return;
    }
    await this.recentSearchRepository.deleteByUserId(user.id);
  }

  /**
   * Get search suggestions based on user's search history
   */
  async getSearchSuggestions(userId: string, partialQuery: string, limit: number = 5): Promise<string[]> {
    const user = await this.getUserById(userId);
    if (!user) {
      console.error('[RecentSearchService] User not found with ID:', userId);
      return [];
    }
    const recentSearches = await this.recentSearchRepository.findByUserId(user.id, 50);
    
    const suggestions = recentSearches
      .filter(search => 
        search.query.toLowerCase().includes(partialQuery.toLowerCase()) &&
        search.query.toLowerCase() !== partialQuery.toLowerCase()
      )
      .sort((a, b) => {
        // Sort by frequency first, then by recency
        if (a.frequency !== b.frequency) {
          return b.frequency - a.frequency;
        }
        return b.lastSearchedAt.getTime() - a.lastSearchedAt.getTime();
      })
      .slice(0, limit)
      .map(search => search.query);

    // Remove duplicates
    return Array.from(new Set(suggestions));
  }

  /**
   * Clean up old search entries (should be run periodically)
   */
  async cleanupOldSearches(daysOld: number = 90): Promise<number> {
    return await this.recentSearchRepository.deleteOldSearches(daysOld);
  }
}