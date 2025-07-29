"use client"

import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';

export interface NavigationItem {
  id: string;
  name: string;
  category: string;
  complexity?: 'low' | 'medium' | 'high';
  icon?: ReactNode;
  href: string;
  // Additional fields for flexibility
  abbr?: string;
  dateLeaked?: string;
  promptCount?: number;
  description?: string;
}

export interface NavigationCategory {
  id: string;
  name: string;
  icon: string | ReactNode;
  items?: NavigationItem[];
  description?: string;
}

interface CategoryNavigationLayoutProps {
  items: NavigationItem[];
  categories: NavigationCategory[];
  searchPlaceholder?: string;
  sectionTitle?: string;
  basePath?: string;
  accentColor?: string;
  defaultExpandedCategories?: string[];
  filterItems?: (items: NavigationItem[], searchQuery: string) => NavigationItem[];
  getItemsForCategory?: (categoryId: string, items: NavigationItem[]) => NavigationItem[];
  getCategoryCount?: (category: NavigationCategory, items: NavigationItem[]) => number;
  renderItemContent?: (item: NavigationItem, isSelected: boolean) => ReactNode;
  onCategoryClick?: (categoryId: string) => void;
  onItemClick?: (item: NavigationItem) => void;
  enableCategoryNavigation?: boolean;
}

export const CategoryNavigationLayout = ({
  items,
  categories,
  searchPlaceholder = "Search...",
  sectionTitle = "Navigation",
  basePath,
  accentColor = "blue",
  defaultExpandedCategories = [],
  filterItems,
  getItemsForCategory,
  getCategoryCount,
  renderItemContent,
  onCategoryClick,
  onItemClick,
  enableCategoryNavigation = false
}: CategoryNavigationLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(defaultExpandedCategories)
  );
  const router = useRouter();
  const pathname = usePathname();

  // Auto-expand category that contains the current route
  useEffect(() => {
    if (basePath && pathname.startsWith(basePath)) {
      const pathSegments = pathname.replace(basePath, '').split('/').filter(Boolean);
      const currentCategory = pathSegments[0];
      
      if (currentCategory) {
        setExpandedCategories(prev => {
          const newSet = new Set(prev);
          newSet.add(currentCategory);
          return newSet;
        });
      }
    }
  }, [pathname, basePath]);

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

  const expandCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      newSet.add(categoryId);
      return newSet;
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    if (enableCategoryNavigation && onCategoryClick) {
      onCategoryClick(categoryId);
    } else if (enableCategoryNavigation && basePath) {
      router.push(`${basePath}/${categoryId}`);
    } else {
      // Only expand (not collapse) when clicking the category
      expandCategory(categoryId);
    }
  };

  const handleItemClick = (item: NavigationItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      router.push(item.href);
    }
  };

  // Default filter function
  const defaultFilterItems = (items: NavigationItem[], searchQuery: string) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.abbr && item.abbr.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query))
    );
  };

  // Default items for category function
  const defaultGetItemsForCategory = (categoryId: string, items: NavigationItem[]) => {
    return items.filter(item => item.category === categoryId);
  };

  // Default category count function
  const defaultGetCategoryCount = (category: NavigationCategory, items: NavigationItem[]) => {
    if (category.items) {
      return category.items.length;
    }
    return items.filter(item => item.category === category.id).length;
  };

  const filterFunc = filterItems || defaultFilterItems;
  const getItemsForCategoryFunc = getItemsForCategory || defaultGetItemsForCategory;
  const getCategoryCountFunc = getCategoryCount || defaultGetCategoryCount;

  const searchFilteredItems = useMemo(() => {
    return filterFunc(items, searchQuery);
  }, [items, searchQuery, filterFunc]);

  const getComplexityColor = (complexity?: string) => {
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

  const renderItem = (item: NavigationItem) => {
    const isSelected = pathname === item.href;

    return (
      <button
        key={item.id}
        onClick={(event) => {
          event.stopPropagation();
          handleItemClick(item);
        }}
        className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${
          isSelected
            ? getAccentClasses(true) + ' shadow-lg scale-[0.98]'
            : getAccentClasses(false) + ' hover:bg-gray-800/50 hover:scale-[0.99]'
        }`}
      >
        {renderItemContent ? (
          renderItemContent(item, isSelected)
        ) : (
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
              isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
            }`}>
              {item.icon || '📄'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium text-sm truncate ${
                  isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {item.name}
                  {item.abbr && (
                    <span className={`text-xs ml-1 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                      ({item.abbr})
                    </span>
                  )}
                </h4>
                <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  {item.complexity && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getComplexityColor(item.complexity)}`}>
                      {item.complexity}
                    </span>
                  )}
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </button>
    );
  };

  const renderCategory = (category: NavigationCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    const categoryItems = getItemsForCategoryFunc(category.id, searchFilteredItems);
    const categoryCount = getCategoryCountFunc(category, items);
    const hasMatchingItems = categoryItems.length > 0;
    const isSelected = basePath && pathname === `${basePath}/${category.id}`;

    if (!hasMatchingItems && searchQuery) {
      return null;
    }

    return (
      <div key={category.id} className="space-y-1">
        <div 
          onClick={() => handleCategoryClick(category.id)}
          className="w-full rounded-lg lg:rounded-xl transition-all duration-200 text-left group p-1.5 lg:p-2 bg-gray-800/60 hover:bg-gray-800/80 min-h-[36px] lg:min-h-auto cursor-pointer"
        >
          <div className="flex items-center gap-1 lg:gap-1">
            {categoryItems.length > 0 && (
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

            <div className="lg:w-[200px] flex-1 flex items-center gap-1.5 lg:gap-3 cursor-pointer hover:scale-[0.99] transition-transform min-h-[28px] lg:min-h-[32px]">
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
                {category.description && (
                  <p className="text-xs text-gray-500 truncate">{category.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50'
                }`}>
                  {categoryCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-0.5 lg:space-y-1 ml-0">
            {categoryItems.map(item => renderItem(item))}
          </div>
        )}
      </div>
    );
  };

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
            searchFilteredItems.map(item => renderItem(item))
          ) : (
            /* Categories */
            categories.map(category => renderCategory(category))
          )}
        </div>
      </div>
    </div>
  );
};