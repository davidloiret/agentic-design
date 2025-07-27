"use client"

import React, { Suspense } from 'react';
import { Search } from 'lucide-react';
import { TechniquesListLayout, type Technique, type Category as TechniqueCategory } from './TechniquesListLayout';
import { redTeamingCategories, allRedTeamingTechniques } from '../red-teaming';

interface RoutedRedTeamingTechniquesListProps {
  selectedCategory?: string;
  selectedTechnique?: string;
}

const RoutedRedTeamingTechniquesListInner = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps) => {
  // Convert techniques to the generic component format
  const convertedTechniques: Technique[] = allRedTeamingTechniques.map(tech => ({
    id: tech.id,
    name: tech.name,
    category: tech.category,
    complexity: tech.complexity,
    abbr: tech.abbr
  }));

  // Convert categories to the generic component format
  const convertedCategories: TechniqueCategory[] = Object.entries(redTeamingCategories).map(([id, category]) => ({
    id,
    name: category.name,
    icon: category.icon,
    techniques: category.techniques
  }));

  // Custom filter function for red teaming techniques
  const filterTechniques = (techniques: Technique[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    return techniques.filter(technique =>
      technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technique.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (technique.abbr && technique.abbr.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Custom techniques for category function
  const getTechniquesForCategory = (categoryId: string, techniques: Technique[]) => {
    if (categoryId === 'all') return techniques;
    return techniques.filter(technique => technique.category === categoryId);
  };

  // Custom category count function
  const getCategoryCount = (categoryId: string) => {
    const category = redTeamingCategories[categoryId as keyof typeof redTeamingCategories];
    return category ? category.techniques.length : 0;
  };

  return (
    <TechniquesListLayout
      techniques={convertedTechniques}
      categories={convertedCategories}
      selectedCategory={selectedCategory}
      selectedTechnique={selectedTechnique}
      searchPlaceholder="Search techniques..."
      sectionTitle="AI Red Teaming Techniques"
      basePath="/ai-red-teaming"
      accentColor="red"
      renderTechniqueIcon={() => '🛡️'}
      filterTechniques={filterTechniques}
      getTechniquesForCategory={getTechniquesForCategory}
      getCategoryCount={getCategoryCount}
    />
  );
};

export const RoutedRedTeamingTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedRedTeamingTechniquesListProps = {}) => {
  return (
    <Suspense fallback={<div className="lg:col-span-1 h-full flex flex-col min-h-0">
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search techniques..."
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
      <RoutedRedTeamingTechniquesListInner 
        selectedCategory={selectedCategory} 
        selectedTechnique={selectedTechnique} 
      />
    </Suspense>
  );
};