export interface SearchFiltersData {
  categories?: string[];
  types?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
  [key: string]: any;
}

export class SearchFilters {
  private readonly filters: SearchFiltersData;

  constructor(filters: SearchFiltersData = {}) {
    this.validateFilters(filters);
    this.filters = this.sanitizeFilters(filters);
  }

  private validateFilters(filters: SearchFiltersData): void {
    if (!filters || typeof filters !== 'object') {
      throw new Error('Search filters must be an object');
    }

    if (filters.categories && !Array.isArray(filters.categories)) {
      throw new Error('Categories filter must be an array');
    }

    if (filters.types && !Array.isArray(filters.types)) {
      throw new Error('Types filter must be an array');
    }

    if (filters.dateRange) {
      if (typeof filters.dateRange !== 'object') {
        throw new Error('Date range filter must be an object');
      }

      if (filters.dateRange.from && !(filters.dateRange.from instanceof Date)) {
        throw new Error('Date range from must be a Date object');
      }

      if (filters.dateRange.to && !(filters.dateRange.to instanceof Date)) {
        throw new Error('Date range to must be a Date object');
      }

      if (filters.dateRange.from && filters.dateRange.to && 
          filters.dateRange.from > filters.dateRange.to) {
        throw new Error('Date range from cannot be after to date');
      }
    }
  }

  private sanitizeFilters(filters: SearchFiltersData): SearchFiltersData {
    const sanitized: SearchFiltersData = {};

    if (filters.categories && filters.categories.length > 0) {
      sanitized.categories = filters.categories
        .filter(cat => typeof cat === 'string' && cat.trim().length > 0)
        .map(cat => cat.trim().toLowerCase());
    }

    if (filters.types && filters.types.length > 0) {
      sanitized.types = filters.types
        .filter(type => typeof type === 'string' && type.trim().length > 0)
        .map(type => type.trim().toLowerCase());
    }

    if (filters.dateRange) {
      sanitized.dateRange = { ...filters.dateRange };
    }

    // Copy other filters
    Object.keys(filters).forEach(key => {
      if (!['categories', 'types', 'dateRange'].includes(key)) {
        sanitized[key] = filters[key];
      }
    });

    return sanitized;
  }

  public getFilters(): SearchFiltersData {
    return { ...this.filters };
  }

  public hasCategories(): boolean {
    return !!(this.filters.categories && this.filters.categories.length > 0);
  }

  public hasTypes(): boolean {
    return !!(this.filters.types && this.filters.types.length > 0);
  }

  public hasDateRange(): boolean {
    return !!(this.filters.dateRange && 
      (this.filters.dateRange.from || this.filters.dateRange.to));
  }

  public isEmpty(): boolean {
    return Object.keys(this.filters).length === 0;
  }

  public equals(other: SearchFilters): boolean {
    return JSON.stringify(this.filters) === JSON.stringify(other.filters);
  }

  public toJSON(): SearchFiltersData {
    return this.getFilters();
  }
}