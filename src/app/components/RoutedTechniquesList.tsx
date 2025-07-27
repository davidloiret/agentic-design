"use client"

import { Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Category } from '../categories';
import { techniques } from '../techniques';
import { categories } from '../categories';
import Fuse from 'fuse.js';

interface RoutedTechniquesListProps {
  selectedCategory?: string;
  selectedTechnique?: string;
}

const options = {
  keys: ['name', 'abbr', 'description', 'category', 'useCases'],
  threshold: 0.3
};

const RoutedTechniquesListInner = ({ selectedCategory, selectedTechnique }: RoutedTechniquesListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize expanded categories with selected category
  const getInitialExpandedCategories = () => {
    const expandedSet = new Set<string>();
    if (selectedCategory) {
      expandedSet.add(selectedCategory);
    }
    return expandedSet;
  };
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(getInitialExpandedCategories());
  const router = useRouter();

  useEffect(() => {
    // Ensure selected category is always expanded
    if (selectedCategory) {
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedCategory);
        return newSet;
      });
    }
  }, [selectedCategory]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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

  const openCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      newSet.add(categoryId);
      return newSet;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/patterns/${categoryId}`);
  };

  const handleTechniqueSelect = (technique: any) => {
    router.push(`/patterns/${technique.category}/${technique.id}`);
  };

  const fuse = useMemo(() => new Fuse(techniques, options), []);

  const searchFilteredTechniques = useMemo(() => {
    return searchQuery
      ? fuse.search(searchQuery).map(result => result.item)
      : techniques;
  }, [searchQuery, fuse]);

  const filteredTechniques = useMemo(() => {
    return searchFilteredTechniques.filter(technique => {
      return true;
    });
  }, [searchFilteredTechniques]);

  const getTechniquesForCategoryCount = useMemo(() => {
    return (categoryId: string) => {
      if (categoryId === 'all') {
        return searchFilteredTechniques;
      }
      return searchFilteredTechniques.filter(technique => technique.category === categoryId);
    };
  }, [searchFilteredTechniques]);

  const getTechniquesForCategory = useMemo(() => {
    return (categoryId: string) => {
      if (categoryId === 'all') {
        return filteredTechniques;
      }
      return filteredTechniques.filter(technique => technique.category === categoryId);
    };
  }, [filteredTechniques]);

  const renderTechnique = (technique: any) => {
    const isSelected = selectedTechnique === technique.id;

    return (
      <button
        key={technique.id}
        onClick={(event) => {
          event.stopPropagation();
          handleTechniqueSelect(technique);
        }}
        className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${isSelected
            ? 'bg-gradient-to-r ' + technique.color + ' shadow-lg scale-[0.98]'
            : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-[0.99]'
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
            }`}>
            {technique.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                {technique.name}
                {technique.abbr && (
                  <span className={`text-xs ml-1 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                    ({technique.abbr})
                  </span>
                )}
              </h4>
              <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                <span className={`text-xs px-2 py-0.5 rounded-full ${technique.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                    technique.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                  {technique.complexity}
                </span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderCategory = (category: Category) => {
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const categoryTechniques = getTechniquesForCategory(category.id);
    const categoryTechniquesCount = getTechniquesForCategoryCount(category.id);
    const hasMatchingTechniques = categoryTechniques.length > 0;

    if (!hasMatchingTechniques && !isSelected && categoryTechniquesCount.length === 0) {
      return null;
    }

    return (
      <div onClick={() => handleCategorySelect(category.id)} key={category.id} className="space-y-1">
        <div className="w-full rounded-lg lg:rounded-xl transition-all duration-200 text-left group p-1.5 lg:p-2 bg-gray-800/60 hover:bg-gray-800/80 min-h-[36px] lg:min-h-auto">
          <div className="flex items-center gap-1 lg:gap-1">
            {categoryTechniques.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.id);
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer min-w-[28px] lg:min-w-[32px] min-h-[28px] lg:min-h-[32px] flex items-center justify-center"
              >
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight className={`w-3 lg:w-4 h-3 lg:h-4 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                </div>
              </button>
            )}

            <button
              className="flex-1 flex items-center gap-1.5 lg:gap-3 cursor-pointer hover:scale-[0.99] transition-transform min-h-[28px] lg:min-h-[32px]"
            >
              <div className={`w-7 lg:w-10 h-7 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${isSelected
                  ? 'bg-white/20'
                  : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                }`}>
                <span className="text-sm lg:text-lg">
                  {category.icon}
                </span>
              </div>

              <div className="text-left flex-1 min-w-0">
                <h3 className={`font-semibold truncate ${
                  isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                } text-xs lg:text-base`}>
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium ${isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50'
                  }`}>
                  {categoryTechniquesCount.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-0.5 lg:space-y-1 ml-0">
            {categoryTechniques.map(technique => renderTechnique(technique))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-1 h-full flex flex-col min-h-0">
      {/* Search - responsive based on screen size */}
      <div className="relative flex-shrink-0 mb-2 lg:mb-4 px-4 lg:px-0">
        <Search className="absolute left-7 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 lg:w-5 h-4 lg:h-5" />
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full pl-11 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg lg:rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm lg:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto space-y-1 lg:space-y-3 px-4 lg:px-0 lg:pr-2 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        <div className="hidden lg:flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Design Patterns & Techniques
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>

        <div className="space-y-1 lg:space-y-2 pb-4 lg:pb-6">
          {categories.map(category => renderCategory(category))}
        </div>
      </div>
    </div>
  );
};

export const RoutedTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedTechniquesListProps) => {
  return (
    <Suspense fallback={<div className="lg:col-span-1 h-full flex flex-col min-h-0">
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400"
          disabled
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-0">
        <div className="flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Loading...
          </h2>
        </div>
      </div>
    </div>}>
      <RoutedTechniquesListInner selectedCategory={selectedCategory} selectedTechnique={selectedTechnique} />
    </Suspense>
  );
};