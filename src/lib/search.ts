import { SearchResult, SearchFilters } from '@/contexts/SearchContext';
import { searchIndex, SearchableContent } from './searchIndex';

function calculateRelevance(item: SearchableContent, query: string): number {
  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/);
  let score = 0;

  // Title match (highest weight)
  if (item.title.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }
  terms.forEach(term => {
    if (item.title.toLowerCase().includes(term)) {
      score += 3;
    }
  });

  // Description match
  if (item.description.toLowerCase().includes(lowerQuery)) {
    score += 5;
  }
  terms.forEach(term => {
    if (item.description.toLowerCase().includes(term)) {
      score += 2;
    }
  });

  // Content match
  if (item.content.toLowerCase().includes(lowerQuery)) {
    score += 3;
  }
  terms.forEach(term => {
    if (item.content.toLowerCase().includes(term)) {
      score += 1;
    }
  });

  // Tags match
  if (item.tags) {
    item.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        score += 4;
      }
      terms.forEach(term => {
        if (tag.toLowerCase().includes(term)) {
          score += 2;
        }
      });
    });
  }

  // Category match
  if (item.category.toLowerCase().includes(lowerQuery)) {
    score += 2;
  }

  return score;
}

function highlightMatches(text: string, query: string): string[] {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const highlights: string[] = [];
  
  const index = lowerText.indexOf(lowerQuery);
  if (index !== -1) {
    const start = Math.max(0, index - 40);
    const end = Math.min(text.length, index + query.length + 40);
    let highlight = text.substring(start, end);
    
    if (start > 0) highlight = '...' + highlight;
    if (end < text.length) highlight = highlight + '...';
    
    highlights.push(highlight);
  }
  
  return highlights;
}

export async function searchContent(
  query: string,
  filters?: SearchFilters
): Promise<SearchResult[]> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));

  if (!query.trim()) {
    return [];
  }

  let results = searchIndex
    .map(item => {
      const relevance = calculateRelevance(item, query);
      
      if (relevance === 0) {
        return null;
      }

      const highlights = [
        ...highlightMatches(item.title, query),
        ...highlightMatches(item.description, query),
        ...highlightMatches(item.content, query)
      ].filter(h => h.length > 0);

      return {
        ...item,
        relevance,
        highlights: highlights.slice(0, 2)
      } as SearchResult;
    })
    .filter((result): result is SearchResult => result !== null);

  // Apply filters
  if (filters) {
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(r => filters.categories!.includes(r.category));
    }
    
    if (filters.types && filters.types.length > 0) {
      results = results.filter(r => filters.types!.includes(r.type));
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, 20); // Limit to top 20 results
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const lowerQuery = query.toLowerCase();

  searchIndex.forEach(item => {
    // Suggest from titles
    if (item.title.toLowerCase().startsWith(lowerQuery)) {
      suggestions.add(item.title);
    }

    // Suggest from tags
    if (item.tags) {
      item.tags.forEach(tag => {
        if (tag.toLowerCase().startsWith(lowerQuery)) {
          suggestions.add(tag);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 5);
}