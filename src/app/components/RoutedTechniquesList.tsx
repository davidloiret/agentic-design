"use client"

import { Search } from 'lucide-react';
import { Suspense } from 'react';
import { TechniquesListLayout, type Technique, type Category as TechniqueCategory } from './TechniquesListLayout';
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
  // Convert techniques and categories to the generic component format
  const convertedTechniques: Technique[] = techniques.map(tech => ({
    id: tech.id,
    name: tech.name,
    category: tech.category,
    complexity: tech.complexity,
    abbr: tech.abbr,
    icon: tech.icon,
    color: tech.color
  }));

  const convertedCategories: TechniqueCategory[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon
  }));

  // Custom filter function using Fuse.js
  const filterTechniques = (techniques: Technique[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    const fuse = new Fuse(techniques, options);
    return fuse.search(searchQuery).map(result => result.item);
  };

  // Custom techniques for category function
  const getTechniquesForCategory = (categoryId: string, techniques: Technique[]) => {
    if (categoryId === 'all') return techniques;
    return techniques.filter(technique => technique.category === categoryId);
  };

  // Custom category count function  
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return techniques.length;
    return techniques.filter(technique => technique.category === categoryId).length;
  };

  return (
    <TechniquesListLayout
      techniques={convertedTechniques}
      categories={convertedCategories}
      selectedCategory={selectedCategory}
      selectedTechnique={selectedTechnique}
      searchPlaceholder="Search patterns..."
      sectionTitle="Design Patterns & Techniques"
      basePath="/patterns"
      accentColor="blue"
      renderTechniqueIcon={(technique) => technique.icon}
      filterTechniques={filterTechniques}
      getTechniquesForCategory={getTechniquesForCategory}
      getCategoryCount={getCategoryCount}
    />
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