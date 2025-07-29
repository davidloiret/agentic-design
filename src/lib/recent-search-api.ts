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
    this.baseUrl = '/api/v1';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

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
  async saveSearch(data: SaveSearchRequest): Promise<RecentSearchResponse> {
    return this.request<RecentSearchResponse>('/search/recent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRecentSearches(limit?: number): Promise<RecentSearchResponse[]> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<RecentSearchResponse[]>(endpoint);
  }

  async getMostFrequentSearches(limit?: number): Promise<RecentSearchResponse[]> {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent/frequent${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request<RecentSearchResponse[]>(endpoint);
  }

  async getSearchAnalytics(): Promise<SearchAnalyticsResponse> {
    return this.request<SearchAnalyticsResponse>('/search/recent/analytics');
  }

  async getSearchSuggestions(query: string, limit?: number): Promise<SearchSuggestionsResponse> {
    const params = new URLSearchParams();
    params.append('q', query);
    if (limit) {
      params.append('limit', limit.toString());
    }

    const endpoint = `/search/recent/suggestions?${params.toString()}`;
    return this.request<SearchSuggestionsResponse>(endpoint);
  }

  async clearRecentSearches(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/search/recent', {
      method: 'DELETE',
    });
  }
}

export const recentSearchAPI = new RecentSearchAPI();