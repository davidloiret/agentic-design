'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchContent } from '@/lib/search';
import { recentSearchAPI, type RecentSearchResponse } from '@/lib/recent-search-api';
import { useAuth } from './AuthContext';

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
  previousResults: SearchResult[];
  filters: SearchFilters;
  recentSearches: string[];
  recentSearchData: RecentSearchResponse[];
  toggleSearch: () => void;
  closeSearch: () => void;
  openSearch: () => void;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string, filters?: SearchFilters) => Promise<void>;
  clearSearch: () => void;
  setFilters: (filters: SearchFilters) => void;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => Promise<void>;
  loadRecentSearches: () => Promise<void>;
  saveSearchOnClick: (query: string, category?: string) => Promise<void>;
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
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentSearchData, setRecentSearchData] = useState<RecentSearchResponse[]>([]);
  const [previousResults, setPreviousResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  
  // Search cache
  const searchCache = useRef<Map<string, SearchResult[]>>(new Map());

  // Load recent searches when user changes or search opens
  useEffect(() => {
    if (user && isSearchOpen) {
      loadRecentSearches();
    }
  }, [user, isSearchOpen]);

  const loadRecentSearches = useCallback(async () => {
    if (!user) return;
    
    try {
      const data = await recentSearchAPI.getRecentSearches(10);
      setRecentSearchData(data);
      setRecentSearches(data.map(search => search.query));
    } catch (error) {
      console.error('Failed to load recent searches:', error);
      // Fallback to local storage for offline functionality
      const localRecentSearches = JSON.parse(
        localStorage.getItem('recentSearches') || '[]'
      );
      setRecentSearches(localRecentSearches);
    }
  }, [user]);

  const saveSearchToBackend = useCallback(async (query: string, category?: string) => {
    if (!user) return;

    try {
      await recentSearchAPI.saveSearch({
        query,
        category,
        filters: filters,
        searchType: 'manual',
      });
      
      // Refresh recent searches after saving
      loadRecentSearches();
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  }, [user, filters, loadRecentSearches]);

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
    setPreviousResults([]);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const addToRecentSearches = useCallback((query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(q => q !== query);
      const newSearches = [query, ...filtered].slice(0, 5);
      
      // Store in localStorage as fallback
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      }
      
      return newSearches;
    });
  }, []);

  const performSearch = useCallback(async (query: string, searchFilters?: SearchFilters) => {
    if (!query.trim()) {
      setSearchResults([]);
      setPreviousResults([]);
      return;
    }

    // Check cache first
    const cacheKey = `${query}-${JSON.stringify(searchFilters || filters)}`;
    const cachedResults = searchCache.current.get(cacheKey);
    
    if (cachedResults) {
      setSearchResults(cachedResults);
      return;
    }

    try {
      const results = await searchContent(query, searchFilters || filters);
      
      // Cache results
      searchCache.current.set(cacheKey, results);
      
      // Keep cache size reasonable (max 50 entries)
      if (searchCache.current.size > 50) {
        const firstKey = searchCache.current.keys().next().value;
        searchCache.current.delete(firstKey);
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  }, [filters]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setPreviousResults([]);
  }, []);

  const clearRecentSearches = useCallback(async () => {
    try {
      if (user) {
        await recentSearchAPI.clearRecentSearches();
      }
      
      setRecentSearches([]);
      setRecentSearchData([]);
      
      // Clear localStorage as well
      if (typeof window !== 'undefined') {
        localStorage.removeItem('recentSearches');
      }
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  }, [user]);

  const saveSearchOnClick = useCallback(async (query: string, category?: string) => {
    if (!query || query.length < 2) return;
    
    // Add to local recent searches
    addToRecentSearches(query);
    
    // Save to backend if user is logged in
    if (user) {
      await saveSearchToBackend(query, category);
    }
  }, [user, addToRecentSearches, saveSearchToBackend]);

  const value = useMemo(() => ({
    isSearchOpen,
    searchQuery,
    searchResults,
    previousResults,
    filters,
    recentSearches,
    recentSearchData,
    toggleSearch,
    closeSearch,
    openSearch,
    setSearchQuery,
    performSearch,
    clearSearch,
    setFilters,
    addToRecentSearches,
    clearRecentSearches,
    loadRecentSearches,
    saveSearchOnClick
  }), [
    isSearchOpen,
    searchQuery,
    searchResults,
    previousResults,
    filters,
    recentSearches,
    recentSearchData,
    toggleSearch,
    closeSearch,
    openSearch,
    performSearch,
    clearSearch,
    addToRecentSearches,
    clearRecentSearches,
    loadRecentSearches,
    saveSearchOnClick
  ]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};