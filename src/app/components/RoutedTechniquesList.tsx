"use client"

import React, { Suspense } from 'react';
import { Search } from 'lucide-react';
import { CategoryNavigationLayout, NavigationItem, NavigationCategory } from './CategoryNavigationLayout';
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
  // Convert techniques to NavigationItem format
  const convertedTechniques: NavigationItem[] = techniques.map(tech => ({
    id: tech.id,
    name: tech.name,
    category: tech.category,
    complexity: tech.complexity,
    abbr: tech.abbr,
    icon: tech.icon,
    href: `/patterns/${tech.category}/${tech.id}`
  }));

  // Convert categories to NavigationCategory format
  const convertedCategories: NavigationCategory[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon
  }));

  // Custom filter function using Fuse.js
  const filterTechniques = (techniques: NavigationItem[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    const fuse = new Fuse(techniques, options);
    return fuse.search(searchQuery).map(result => result.item);
  };

  // Get the currently selected category from URL
  const currentCategory = selectedCategory || null;

  return (
    <CategoryNavigationLayout
      items={convertedTechniques}
      categories={convertedCategories}
      searchPlaceholder="Search patterns..."
      sectionTitle="Design Patterns & Techniques"
      basePath="/patterns"
      accentColor="blue"
      enableCategoryNavigation={true}
      defaultExpandedCategories={currentCategory ? [currentCategory] : []}
      filterItems={filterTechniques}
    />
  );
};

export const RoutedTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedTechniquesListProps = {}) => {
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