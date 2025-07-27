"use client"

import { Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Category } from '../categories';
import { type BottomSheetState } from './ExpandableBottomSheet';

interface TechniquesListProps {
  techniques: any[];
  categories: Category[];
  selectedTechnique: any;
  setSelectedTechnique: (technique: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredTechniques: any[];
  searchFilteredTechniques: any[]; // For calculating category counts
  bottomSheetState?: BottomSheetState;
}

export const TechniquesList = ({
  selectedTechnique,
  setSelectedTechnique,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filteredTechniques,
  searchFilteredTechniques,
  categories,
  bottomSheetState,
}: TechniquesListProps) => {
  // Auto-expand categories when sheet is expanded or fullscreen for better mobile experience
  const getInitialExpandedCategories = () => {
    if (bottomSheetState === 'expanded' || bottomSheetState === 'fullscreen') {
      return new Set(['prompt-chaining', 'routing', 'parallelization', 'reflection']);
    }
    return new Set();
  };

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(getInitialExpandedCategories());

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

  // All categories are flat - no parent/child relationships
  const parentCategories = categories;

  // For calculating category counts (ignores selected category filter)
  const getTechniquesForCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return searchFilteredTechniques;
    }
    return searchFilteredTechniques.filter(technique => technique.category === categoryId);
  };

  // For displaying techniques (respects selected category filter)
  const getTechniquesForCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      return filteredTechniques;
    }
    return filteredTechniques.filter(technique => technique.category === categoryId);
  };

  const renderTechnique = (technique: any) => {
    const isSelected = selectedTechnique?.id === technique.id;
    const isCompact = bottomSheetState === 'collapsed';

    return (
      <button
        key={technique.id}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedTechnique(technique);
        }}
        className={`cursor-pointer w-full text-left rounded-lg transition-all duration-200 group ml-4 ${
          isCompact ? 'p-2 min-h-[40px]' : 'p-2.5 lg:p-3 min-h-[48px] lg:min-h-[56px]'
        } ${isSelected
            ? 'bg-gradient-to-r ' + technique.color + ' shadow-lg scale-[0.98]'
            : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-[0.99]'
          }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center text-sm lg:text-sm transition-colors ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
            }`}>
            {technique.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm lg:text-sm overflow-hidden text-ellipsis whitespace-nowrap ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                  }`}>
                  {technique.name}
                  {technique.abbr && (
                    <span className={`text-xs lg:text-xs ml-1 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                      ({technique.abbr})
                    </span>
                  )}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <span className={`text-xs lg:text-xs px-1.5 py-0.5 lg:px-2 lg:py-0.5 rounded-full ${technique.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                    technique.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                  }`}>
                  {technique.complexity}
                </span>
                <ChevronRight className={`w-3 h-3 lg:w-3 lg:h-3 ${isSelected ? 'text-white/70' : 'text-gray-500'}`} />
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
    const isCompact = bottomSheetState === 'collapsed';

    if (!hasMatchingTechniques && !isSelected && categoryTechniquesCount.length === 0) {
      return null;
    }

    return (
      <div onClick={() => {
        openCategory(category.id);
        setSelectedCategory(category.id);
      }} key={category.id} className={isCompact ? "space-y-1" : "space-y-2"}>
        <div className={`w-full rounded-lg transition-all duration-200 text-left group bg-gray-800/60 hover:bg-gray-800/80 ${
          isCompact ? 'p-1.5 min-h-[36px]' : 'p-2 lg:p-2 min-h-[44px] lg:min-h-auto'
        }`}>
          <div className="flex items-center gap-1 lg:gap-2">
            {categoryTechniques.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(category.id);
                  toggleCategory(category.id);
                }}
                className={`rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                  isCompact ? 'p-1 min-w-[28px] min-h-[28px]' : 'p-1.5 lg:p-2 min-w-[32px] min-h-[32px] lg:min-w-[36px] lg:min-h-[36px]'
                }`}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name} category`}
              >
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight className={`w-3 h-3 lg:w-4 lg:h-4 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                </div>
              </button>
            )}

            <button
              className={`flex-1 flex items-center cursor-pointer hover:scale-[0.99] transition-transform ${
                isCompact ? 'gap-1.5 min-h-[28px]' : 'gap-2 lg:gap-3 min-h-[32px]'
              }`}
            >
              <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCompact ? 'w-7 h-7' : 'w-8 h-8 lg:w-10 lg:h-10'
              } ${isSelected
                  ? 'bg-white/20'
                  : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                }`}>
                <span className={isCompact ? 'text-sm' : 'text-base lg:text-lg'}>
                  {category.icon}
                </span>
              </div>

              <div className="text-left flex-1 min-w-0 overflow-hidden">
                <h3 className={`font-medium text-ellipsis whitespace-nowrap overflow-hidden ${
                  isCompact ? 'text-xs' : 'text-sm lg:text-base'
                } ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                  }`}>
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <span className={`rounded-full font-medium ${
                  isCompact ? 'text-xs px-1.5 py-0.5' : 'text-xs lg:text-xs px-2 py-0.5 lg:px-2.5 lg:py-1'
                } ${isSelected
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
          <div className={`ml-0 ${isCompact ? 'space-y-0.5' : 'space-y-1'}`}>
            {categoryTechniques.map(technique => renderTechnique(technique))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-1 h-full flex flex-col min-h-0">
      {/* Search - hidden on mobile, only show on desktop */}
      <div className="relative flex-shrink-0 mb-4 px-0 hidden lg:block">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Mobile search - responsive based on bottom sheet state */}
      <div className={`relative flex-shrink-0 px-4 lg:hidden ${
        bottomSheetState === 'collapsed' ? 'mb-1' : 'mb-3'
      }`}>
        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={bottomSheetState === 'collapsed' ? "Search..." : "Search patterns..."}
          className={`w-full pl-11 pr-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm ${
            bottomSheetState === 'collapsed' ? 'py-1.5' : 'py-2'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Tree */}
      <div className={`flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-2 min-h-0 ${
        bottomSheetState === 'collapsed' ? 'space-y-1' : 'space-y-3'
      }`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        {/* Show section header for expanded states */}
        {(bottomSheetState === 'expanded' || bottomSheetState === 'fullscreen') && (
          <div className="lg:hidden flex items-center gap-2 px-1 pb-2 pt-1">
            <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Design Patterns & Techniques
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
          </div>
        )}
        
        <div className="hidden lg:flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Design Patterns & Techniques
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>

        <div className={`${
          bottomSheetState === 'collapsed' ? 'space-y-0.5' : 'space-y-1 lg:space-y-3'
        } pt-1 lg:pt-0 pb-4 lg:pb-6`}>
          {parentCategories.map(category => renderCategory(category))}
        </div>
      </div>
    </div>
  );
};