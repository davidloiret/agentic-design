"use client"

import { Search, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Category } from '../categories';

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
}: TechniquesListProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  // new Set(['prompt-chaining', 'routing', 'parallelization', 'reflection', 'tool-use', 'multi-agent', 'memory-management', 'knowledge-retrieval', 'knowledge-representation', 'workflow-orchestration', 'reasoning-techniques', 'planning-execution', 'human-ai-collaboration'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      console.log('toggleCategory', categoryId);
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

    return (
      <button
        key={technique.id}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedTechnique(technique);
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
      <div onClick={() => {
        openCategory(category.id);
        setSelectedCategory(category.id);
      }} key={category.id} className="space-y-1">
        <div className="w-full rounded-xl transition-all duration-200 text-left group p-2 bg-gray-800/60 hover:bg-gray-800/80">
          <div className="flex items-center gap-1">
            {categoryTechniques.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(category.id);
                  toggleCategory(category.id);
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                </div>
              </button>
            )}

            <button
              className="flex-1 flex items-center gap-3 cursor-pointer hover:scale-[0.99] transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected
                  ? 'bg-white/20'
                  : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                }`}>
                <span className="text-lg">
                  {category.icon}
                </span>
              </div>

              <div className="text-left flex-1 min-w-0">
                <h3 className={`font-semibold text-base truncate ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                  }`}>
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isSelected
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
          <div className="space-y-1 ml-0">
            {categoryTechniques.map(technique => renderTechnique(technique))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="lg:col-span-1 h-full flex flex-col min-h-0">
      {/* Search */}
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search patterns..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        <div className="flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Design Patterns & Techniques
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>

        <div className="space-y-2 pb-6">
          {parentCategories.map(category => renderCategory(category))}
        </div>
      </div>
    </div>
  );
};