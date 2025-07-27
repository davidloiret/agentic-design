"use client"

import { useState, useEffect, useMemo, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';

export interface Technique {
  id: string;
  name: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  abbr?: string;
  icon?: ReactNode;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  techniques?: Technique[];
}

interface TechniquesListLayoutProps {
  techniques: Technique[];
  categories: Category[] | Record<string, Category>;
  selectedCategory?: string;
  selectedTechnique?: string;
  searchPlaceholder?: string;
  sectionTitle?: string;
  basePath: string;
  searchOptions?: {
    keys: string[];
    threshold: number;
  };
  accentColor?: string;
  renderTechniqueIcon?: (technique: Technique) => ReactNode;
  filterTechniques?: (techniques: Technique[], searchQuery: string) => Technique[];
  getTechniquesForCategory?: (categoryId: string, techniques: Technique[]) => Technique[];
  getCategoryCount?: (categoryId: string, categories: Category[] | Record<string, Category>) => number;
}

export const TechniquesListLayout = ({
  techniques,
  categories,
  selectedCategory,
  selectedTechnique,
  searchPlaceholder = "Search techniques...",
  sectionTitle = "Techniques",
  basePath,
  accentColor = "blue",
  renderTechniqueIcon,
  filterTechniques,
  getTechniquesForCategory,
  getCategoryCount
}: TechniquesListLayoutProps) => {
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
    router.push(`${basePath}/${categoryId}`);
  };

  const handleTechniqueSelect = (technique: Technique) => {
    router.push(`${basePath}/${technique.category}/${technique.id}`);
  };

  // Default filter function
  const defaultFilterTechniques = (techniques: Technique[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    return techniques.filter(technique =>
      technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technique.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (technique.abbr && technique.abbr.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Default techniques for category function
  const defaultGetTechniquesForCategory = (categoryId: string, techniques: Technique[]) => {
    if (categoryId === 'all') return techniques;
    return techniques.filter(technique => technique.category === categoryId);
  };

  // Default category count function
  const defaultGetCategoryCount = (categoryId: string, categories: Category[] | Record<string, Category>) => {
    if (Array.isArray(categories)) {
      const category = categories.find(cat => cat.id === categoryId);
      return category?.techniques?.length || 0;
    } else {
      return categories[categoryId]?.techniques?.length || 0;
    }
  };

  const searchFilteredTechniques = useMemo(() => {
    const filterFunc = filterTechniques || defaultFilterTechniques;
    return filterFunc(techniques, searchQuery);
  }, [techniques, searchQuery, filterTechniques]);

  const getTechniquesForCategoryFunc = getTechniquesForCategory || defaultGetTechniquesForCategory;
  const getCategoryCountFunc = getCategoryCount || defaultGetCategoryCount;

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAccentClasses = (isSelected: boolean) => {
    const colors = {
      blue: isSelected ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20' : 'bg-gray-800/30',
      red: isSelected ? 'bg-gradient-to-r from-red-500/20 to-red-600/20' : 'bg-gray-800/30'
    };
    return colors[accentColor as keyof typeof colors] || colors.blue;
  };

  const renderTechnique = (technique: Technique) => {
    const isSelected = selectedTechnique === technique.id;

    return (
      <button
        key={technique.id}
        onClick={(event) => {
          event.stopPropagation();
          handleTechniqueSelect(technique);
        }}
        className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${
          isSelected
            ? getAccentClasses(true) + ' shadow-lg scale-[0.98]'
            : getAccentClasses(false) + ' hover:bg-gray-800/50 hover:scale-[0.99]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
            isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
          }`}>
            {renderTechniqueIcon ? renderTechniqueIcon(technique) : (technique.icon || '🔧')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${
                isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
              }`}>
                {technique.name}
                {technique.abbr && (
                  <span className={`text-xs ml-1 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                    ({technique.abbr})
                  </span>
                )}
              </h4>
              <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getComplexityColor(technique.complexity)}`}>
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
    const categoryTechniques = getTechniquesForCategoryFunc(category.id, searchFilteredTechniques);
    const categoryCount = getCategoryCountFunc(category.id, categories);
    const hasMatchingTechniques = categoryTechniques.length > 0;

    if (!hasMatchingTechniques && !isSelected && categoryCount === 0) {
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
                  <ChevronRight className={`w-3 lg:w-4 h-3 lg:h-4 ${
                    isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                </div>
              </button>
            )}

            <button
              className="flex-1 flex items-center gap-1.5 lg:gap-3 cursor-pointer hover:scale-[0.99] transition-transform min-h-[28px] lg:min-h-[32px]"
            >
              <div className={`w-7 lg:w-10 h-7 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-white/20' : 'bg-gray-700/50 group-hover:bg-gray-600/50'
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
                <span className={`text-xs px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50'
                }`}>
                  {categoryCount}
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

  const categoriesArray = Array.isArray(categories) ? categories : Object.values(categories);

  return (
    <div className="h-full flex flex-col">
      {/* Sticky header with search and title */}
      <div className="sticky top-0 bg-gray-950 z-10 flex-shrink-0">
        {/* Search */}
        <div className="relative mb-2 lg:mb-4 px-4 lg:px-0 mt-6">
          <Search className="absolute left-7 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 lg:w-5 h-4 lg:h-5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-11 lg:pl-12 pr-10 lg:pr-12 py-2 lg:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg lg:rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="cursor-pointer absolute right-7 lg:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors p-1 rounded hover:bg-gray-700/50"
            >
              <X className="w-4 lg:w-4 h-4 lg:h-4" />
            </button>
          )}
        </div>

        {/* Section Title */}
        <div className="hidden lg:flex items-center gap-2 px-1 pb-2">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            {sectionTitle}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>
      </div>

      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>

        <div className="space-y-1 lg:space-y-2 pb-4 lg:pb-6">
          {searchQuery ? (
            /* Search Results */
            searchFilteredTechniques.map(technique => renderTechnique(technique))
          ) : (
            /* Categories */
            categoriesArray.map(category => renderCategory(category))
          )}
        </div>
      </div>
    </div>
  );
};