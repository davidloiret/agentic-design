"use client"

import React, { useState, useEffect, Suspense } from 'react';
import { ChevronRight, Shield, Search, AlertTriangle, Target, Lock, Zap, Users, Eye, BookOpen } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { redTeamingCategories, allRedTeamingTechniques } from '../red-teaming';

interface RoutedRedTeamingTechniquesListProps {
  selectedCategory?: string;
  selectedTechnique?: string;
}

const RoutedRedTeamingTechniquesListInner = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Initialize expanded categories from URL params or include selected category
  const getInitialExpandedCategories = () => {
    const expandedFromUrl = searchParams.get('expanded');
    const expandedSet = expandedFromUrl ? new Set(expandedFromUrl.split(',').filter(Boolean)) : new Set();
    if (selectedCategory) {
      expandedSet.add(selectedCategory);
    }
    return expandedSet;
  };

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(getInitialExpandedCategories());

  useEffect(() => {
    const searchFromParams = searchParams.get('search') || '';
    setSearchQuery(searchFromParams);
    
    // Update expanded categories from URL params
    const expandedFromUrl = searchParams.get('expanded');
    const expandedSet = expandedFromUrl ? new Set(expandedFromUrl.split(',').filter(Boolean)) : new Set();
    if (selectedCategory) {
      expandedSet.add(selectedCategory);
    }
    setExpandedCategories(expandedSet);
  }, [searchParams, selectedCategory]);

  // Update URL when expandedCategories changes (but not during initial load)
  useEffect(() => {
    const expandedFromUrl = searchParams.get('expanded');
    const currentExpanded = Array.from(expandedCategories).join(',');
    
    // Only update if expanded state actually changed and not during initial load
    if (expandedFromUrl !== currentExpanded && expandedCategories.size > 0) {
      const currentPath = window.location.pathname;
      const url = buildUrl(currentPath, searchQuery, expandedCategories);
      router.replace(url);
    }
  }, [expandedCategories, searchQuery, searchParams, router]);

  // Helper function to build URL with search and expanded parameters
  const buildUrl = (path: string, searchQuery?: string, expandedCategories?: Set<string>) => {
    const params = new URLSearchParams();
    const search = searchQuery || searchParams.get('search');
    const expanded = expandedCategories || new Set(searchParams.get('expanded')?.split(',').filter(Boolean) || []);
    
    if (search) {
      params.set('search', search);
    }
    if (expanded.size > 0) {
      params.set('expanded', Array.from(expanded).join(','));
    }
    
    return params.toString() ? `${path}?${params.toString()}` : path;
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const currentPath = window.location.pathname;
    const url = buildUrl(currentPath, query, expandedCategories);
    router.replace(url);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    // First update the expanded categories to include the new category
    const updatedExpanded = new Set(expandedCategories);
    updatedExpanded.add(categoryId);
    
    const url = buildUrl(`/ai-red-teaming/${categoryId}`, searchQuery, updatedExpanded);
    router.push(url);
  };

  const handleTechniqueSelect = (categoryId: string, techniqueId: string) => {
    const url = buildUrl(`/ai-red-teaming/${categoryId}/${techniqueId}`, searchQuery, expandedCategories);
    router.push(url);
  };

  const searchFilteredTechniques = searchQuery
    ? allRedTeamingTechniques.filter(technique =>
        technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technique.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allRedTeamingTechniques;

  const getCategoryCount = (categoryId: string) => {
    const category = redTeamingCategories[categoryId as keyof typeof redTeamingCategories];
    return category ? category.techniques.length : 0;
  };

  const getDifficultyColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="lg:col-span-1 flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-red-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">AI Red Teaming</h1>
            <p className="text-gray-400 text-sm">Defensive Security Techniques</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search techniques..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Ethical Warning */}
      <div className="mb-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">Ethical Use Only</span>
        </div>
        <p className="text-gray-300 text-xs">
          For educational and defensive security purposes only.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery ? (
          /* Search Results */
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Search Results ({searchFilteredTechniques.length})
            </h3>
            {searchFilteredTechniques.map((technique) => (
              <button
                key={technique.id}
                onClick={() => handleTechniqueSelect(technique.category, technique.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors border ${
                  selectedTechnique === technique.id
                    ? 'bg-red-500/10 border-red-500/50 text-white'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{technique.name}</span>
                  <span className={`text-xs ${getDifficultyColor(technique.complexity)}`}>
                    {technique.complexity}
                  </span>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {technique.category.replace('-', ' ')}
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Categories */
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Security Categories
            </h3>
            {Object.entries(redTeamingCategories).map(([categoryId, category]) => {
              const isExpanded = expandedCategories.has(categoryId);
              const isSelected = selectedCategory === categoryId;
              const count = getCategoryCount(categoryId);
              
              return (
                <div key={categoryId} className="space-y-1">
                  {/* Category Header */}
                  <div
                    className={`w-full flex items-center justify-between rounded-lg transition-colors border ${
                      isSelected
                        ? 'bg-red-500/10 border-red-500/50 text-white'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <button
                      onClick={() => handleCategorySelect(categoryId)}
                      className="flex-1 flex items-center space-x-3 p-3 text-left"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-gray-500">{count} techniques</div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(categoryId);
                      }}
                      className="p-3 hover:bg-gray-700/30 rounded-r-lg transition-colors"
                    >
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Techniques List */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1">
                      {category.techniques.map((technique) => (
                        <button
                          key={technique.id}
                          onClick={() => handleTechniqueSelect(categoryId, technique.id)}
                          className={`w-full text-left p-2 rounded-lg transition-colors ${
                            selectedTechnique === technique.id
                              ? 'bg-red-500/20 text-red-300'
                              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{technique.name}</span>
                            <span className={`text-xs ${getDifficultyColor(technique.complexity)}`}>
                              {technique.complexity}
                            </span>
                          </div>
                          {technique.abbr && (
                            <div className="text-xs text-gray-500 mt-0.5">{technique.abbr}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const RoutedRedTeamingTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps = {}) => {
  return (
    <Suspense fallback={
      <div className="lg:col-span-1 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-red-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">AI Red Teaming</h1>
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search techniques..."
              disabled
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
          </div>
        </div>
      </div>
    }>
      <RoutedRedTeamingTechniquesListInner 
        selectedCategory={selectedCategory} 
        selectedTechnique={selectedTechnique} 
      />
    </Suspense>
  );
};