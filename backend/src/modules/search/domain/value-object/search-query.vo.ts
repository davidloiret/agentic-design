export class SearchQuery {
  private readonly value: string;

  constructor(query: string) {
    this.validateQuery(query);
    this.value = this.sanitizeQuery(query);
  }

  private validateQuery(query: string): void {
    if (!query || typeof query !== 'string') {
      throw new Error('Search query must be a non-empty string');
    }

    if (query.trim().length === 0) {
      throw new Error('Search query cannot be empty or contain only whitespace');
    }

    if (query.length > 255) {
      throw new Error('Search query cannot exceed 255 characters');
    }

    // Basic XSS protection
    if (/<script|javascript:|data:|vbscript:/i.test(query)) {
      throw new Error('Invalid characters in search query');
    }
  }

  private sanitizeQuery(query: string): string {
    return query.trim().replace(/\s+/g, ' ');
  }

  public getValue(): string {
    return this.value;
  }

  public getLength(): number {
    return this.value.length;
  }

  public isEmpty(): boolean {
    return this.value.length === 0;
  }

  public equals(other: SearchQuery): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}