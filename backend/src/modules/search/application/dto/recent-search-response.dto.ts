export class RecentSearchResponseDto {
  id: string;
  query: string;
  category?: string;
  filters?: Record<string, any>;
  searchType: string;
  frequency: number;
  lastSearchedAt: Date;
  createdAt: Date;

  constructor(data: {
    id: string;
    query: string;
    category?: string;
    filters?: Record<string, any>;
    searchType: string;
    frequency: number;
    lastSearchedAt: Date;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.query = data.query;
    this.category = data.category;
    this.filters = data.filters;
    this.searchType = data.searchType;
    this.frequency = data.frequency;
    this.lastSearchedAt = data.lastSearchedAt;
    this.createdAt = data.createdAt;
  }
}

export class SearchAnalyticsResponseDto {
  totalSearches: number;
  uniqueQueries: number;
  mostSearchedCategories: Array<{ category: string; count: number }>;
  recentActivity: RecentSearchResponseDto[];

  constructor(data: {
    totalSearches: number;
    uniqueQueries: number;
    mostSearchedCategories: Array<{ category: string; count: number }>;
    recentActivity: any[];
  }) {
    this.totalSearches = data.totalSearches;
    this.uniqueQueries = data.uniqueQueries;
    this.mostSearchedCategories = data.mostSearchedCategories;
    this.recentActivity = data.recentActivity.map(
      activity => new RecentSearchResponseDto(activity)
    );
  }
}

export class SearchSuggestionsResponseDto {
  suggestions: string[];

  constructor(suggestions: string[]) {
    this.suggestions = suggestions;
  }
}