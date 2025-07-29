export interface SaveSearchRequest {
  query: string;
  category?: string;
  filters?: Record<string, any>;
  searchType?: string;
}

export interface RecentSearchResponse {
  id: string;
  query: string;
  category?: string;
  filters?: Record<string, any>;
  searchType: string;
  frequency: number;
  lastSearchedAt: string;
  createdAt: string;
}

export interface SearchAnalyticsResponse {
  totalSearches: number;
  uniqueQueries: number;
  mostSearchedCategories: Array<{ category: string; count: number }>;
  recentActivity: RecentSearchResponse[];
}

export interface SearchSuggestionsResponse {
  suggestions: string[];
}

class RecentSearchAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if user is logged in
    const token = this.getAuthToken();
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getAuthToken(): string | null {
    // This should match your authentication implementation
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Save a search query to recent searches
   */
  async saveSearch(data: SaveSearchRequest): Promise<RecentSearchResponse> {
    return this.request<RecentSearchResponse>('/search/recent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get recent searches for the current user
   */
  async getRecentSearches(limit?: number): Promise<RecentSearchResponse[]> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<RecentSearchResponse[]>(endpoint);
  }

  /**
   * Get most frequently searched queries
   */
  async getMostFrequentSearches(limit?: number): Promise<RecentSearchResponse[]> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent/frequent${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<RecentSearchResponse[]>(endpoint);
  }

  /**
   * Get search analytics for the current user
   */
  async getSearchAnalytics(): Promise<SearchAnalyticsResponse> {
    return this.request<SearchAnalyticsResponse>('/search/recent/analytics');
  }

  /**
   * Get search suggestions based on user's search history
   */
  async getSearchSuggestions(query: string, limit?: number): Promise<SearchSuggestionsResponse> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent/suggestions?${params.toString()}`;
    return this.request<SearchSuggestionsResponse>(endpoint);
  }

  /**
   * Clear all recent searches for the current user
   */
  async clearRecentSearches(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/search/recent', {
      method: 'DELETE',
    });
  }
}

export const recentSearchAPI = new RecentSearchAPI();