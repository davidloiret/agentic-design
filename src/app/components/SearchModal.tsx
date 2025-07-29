'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  Clock, 
  FileText, 
  Code, 
  Shield, 
  Sparkles,
  ChevronRight,
  Filter,
  Loader2,
  Command
} from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getSearchSuggestions } from '@/lib/search';
import { getAllCategories, getAllTypes } from '@/lib/searchIndex';

const categoryIcons: Record<string, React.ReactNode> = {
  patterns: <Code className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  prompts: <Sparkles className="w-4 h-4" />,
  main: <FileText className="w-4 h-4" />,
  training: <Sparkles className="w-4 h-4" />,
  deployment: <Code className="w-4 h-4" />,
  education: <FileText className="w-4 h-4" />,
  projects: <Code className="w-4 h-4" />,
  news: <FileText className="w-4 h-4" />
};

const categoryColors: Record<string, string> = {
  patterns: 'text-blue-400 bg-blue-400/10',
  security: 'text-red-400 bg-red-400/10',
  prompts: 'text-purple-400 bg-purple-400/10',
  main: 'text-gray-400 bg-gray-400/10',
  training: 'text-green-400 bg-green-400/10',
  deployment: 'text-cyan-400 bg-cyan-400/10',
  education: 'text-yellow-400 bg-yellow-400/10',
  projects: 'text-indigo-400 bg-indigo-400/10',
  news: 'text-orange-400 bg-orange-400/10',
  user: 'text-pink-400 bg-pink-400/10',
  support: 'text-teal-400 bg-teal-400/10'
};

const categoryLabels: Record<string, string> = {
  main: 'Main',
  patterns: 'Patterns',
  security: 'Security',
  training: 'Training',
  deployment: 'Deployment',
  prompts: 'Prompts',
  education: 'Education',
  projects: 'Projects',
  news: 'News',
  user: 'User',
  support: 'Support'
};

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    setSearchQuery,
    performSearch,
    closeSearch,
    openSearch
  } = useSearch();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          // Will be handled by Header component
        }
      } else if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      } else if (e.key === '/' && !isSearchOpen && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          openSearch();
        }
      } else if (isSearchOpen && searchResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            router.push(searchResults[selectedIndex].url);
            closeSearch();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex, closeSearch, openSearch, router]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(0);
    
    if (query.length > 0) {
      const newSuggestions = getSearchSuggestions(query);
      setSuggestions(newSuggestions);
      
      if (query.length >= 2) {
        await performSearch(query, { 
          categories: selectedCategories.length > 0 ? selectedCategories : undefined 
        });
      }
    } else {
      setSuggestions([]);
    }
  }, [setSearchQuery, performSearch, selectedCategories]);

  const handleResultClick = (url: string) => {
    router.push(url);
    closeSearch();
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-400/30 text-yellow-300 px-0.5 rounded">{part}</mark> : 
        part
    );
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm"
        onClick={closeSearch}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="relative border-b border-gray-700/50">
            <div className="flex items-center p-4">
              <Search className="absolute left-6 text-gray-400 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search pages, patterns, prompts, and more..."
                className="w-full pl-12 pr-20 py-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none text-lg"
              />
              <div className="absolute right-4 flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1.5 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  onClick={closeSearch}
                  className="p-1.5 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="px-6 pb-3 flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-gray-400">
                <Command className="w-3 h-3" />
                <span>K</span>
                <span className="text-gray-500">to close</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <span className="text-gray-500">Use</span>
                <span>↑↓</span>
                <span className="text-gray-500">to navigate</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <span>↵</span>
                <span className="text-gray-500">to select</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-700/50 p-4 overflow-hidden"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {getAllCategories().map(category => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedCategories.includes(category)
                            ? categoryColors[category] || 'text-gray-300 bg-gray-300/20'
                            : 'text-gray-400 bg-gray-800/50 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          {categoryIcons[category] || <FileText className="w-3 h-3" />}
                          <span>{categoryLabels[category] || category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
            )}

            {!isSearching && searchQuery.length === 0 && (
              <div className="p-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-left"
                        >
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'AI Patterns', url: '/patterns', icon: <Code className="w-4 h-4" /> },
                      { name: 'Red Teaming', url: '/ai-red-teaming', icon: <Shield className="w-4 h-4" /> },
                      { name: 'Prompt Hub', url: '/prompt-hub', icon: <Sparkles className="w-4 h-4" /> },
                      { name: 'Fine Tuning', url: '/fine-tuning', icon: <Sparkles className="w-4 h-4" /> }
                    ].map((link) => (
                      <button
                        key={link.url}
                        onClick={() => handleResultClick(link.url)}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-left"
                      >
                        <div className="text-gray-400">{link.icon}</div>
                        <span className="text-gray-300">{link.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isSearching && searchQuery.length > 0 && suggestions.length > 0 && searchQuery.length < 2 && (
              <div className="p-6">
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-left"
                    >
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="p-6">
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Results ({searchResults.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${
                        selectedIndex === index
                          ? 'bg-gray-800/70 border-l-2 border-blue-400'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-gray-100 font-medium">
                              {highlightMatch(result.title, searchQuery)}
                            </h4>
                            <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[result.category] || 'text-gray-400 bg-gray-400/10'}`}>
                              {categoryLabels[result.category] || result.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {highlightMatch(result.description, searchQuery)}
                          </p>
                          {result.highlights && result.highlights.length > 0 && (
                            <div className="text-xs text-gray-500 italic">
                              {result.highlights[0]}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 mt-1 ml-4" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};