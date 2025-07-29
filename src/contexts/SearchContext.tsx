'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { searchContent } from '@/lib/search';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  category: string;
  subcategory?: string;
  type: 'page' | 'prompt' | 'pattern' | 'technique' | 'article' | 'project';
  relevance: number;
  highlights?: string[];
  metadata?: Record<string, any>;
}

export interface SearchFilters {
  categories?: string[];
  types?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

interface SearchContextType {
  isSearchOpen: boolean;
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  filters: SearchFilters;
  recentSearches: string[];
  toggleSearch: () => void;
  closeSearch: () => void;
  openSearch: () => void;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string, filters?: SearchFilters) => Promise<void>;
  clearSearch: () => void;
  setFilters: (filters: SearchFilters) => void;
  addToRecentSearches: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const performSearch = useCallback(async (query: string, searchFilters?: SearchFilters) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchContent(query, searchFilters || filters);
      setSearchResults(results);
      
      if (query.length > 2) {
        addToRecentSearches(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [filters]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const addToRecentSearches = useCallback((query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 5);
    });
  }, []);

  const value = useMemo(() => ({
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    filters,
    recentSearches,
    toggleSearch,
    closeSearch,
    openSearch,
    setSearchQuery,
    performSearch,
    clearSearch,
    setFilters,
    addToRecentSearches
  }), [
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    filters,
    recentSearches,
    toggleSearch,
    closeSearch,
    openSearch,
    performSearch,
    clearSearch,
    addToRecentSearches
  ]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};