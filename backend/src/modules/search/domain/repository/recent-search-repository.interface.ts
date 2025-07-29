import { RecentSearch } from "../entity/recent-search.entity";

export interface RecentSearchRepositoryInterface {
  /**
   * Save a recent search entry
   */
  save(recentSearch: RecentSearch): Promise<RecentSearch>;

  /**
   * Find recent searches by user ID
   */
  findByUserId(userId: string, limit?: number): Promise<RecentSearch[]>;

  /**
   * Find a specific search by user ID and query
   */
  findByUserIdAndQuery(userId: string, query: string): Promise<RecentSearch | null>;

  /**
   * Get recent searches for anonymous users (by session or IP)
   */
  findBySession(sessionId: string, limit?: number): Promise<RecentSearch[]>;

  /**
   * Find most frequent searches by user
   */
  findMostFrequentByUserId(userId: string, limit?: number): Promise<RecentSearch[]>;

  /**
   * Delete old search entries older than specified days
   */
  deleteOldSearches(daysOld: number): Promise<number>;

  /**
   * Delete all searches for a user
   */
  deleteByUserId(userId: string): Promise<number>;

  /**
   * Update last searched timestamp
   */
  updateLastSearched(id: string): Promise<void>;

  /**
   * Get search analytics for a user
   */
  getSearchAnalytics(userId: string): Promise<{
    totalSearches: number;
    uniqueQueries: number;
    mostSearchedCategories: Array<{ category: string; count: number }>;
    recentActivity: RecentSearch[];
  }>;
}