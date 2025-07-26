"use client"

import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { TechniquesList } from './TechniquesList';
import { TechniqueDetails } from './TechniqueDetails';
import { CategoryDetails } from './CategoryDetails';
import { techniques } from '../techniques';
import { categories } from '../categories';
import { useCases } from '../use-cases';
import { type LanguageType } from '../pattern-examples';
import Fuse from 'fuse.js';

const options = {
  keys: ['name', 'abbr', 'description', 'category', 'useCases'],
  threshold: 0.3
};

export const PatternsExplorer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryState, setSelectedCategoryState] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('typescript');
  const [detailsTab, setDetailsTab] = useState<'overview' | 'flow' | 'interactive' | 'code'>('overview');
  
  const setSelectedCategory = (categoryId: string) => {
    setSelectedCategoryState(categoryId);
    setSelectedTechnique(null);
  };
  
  const selectedCategory = selectedCategoryState;

  const fuse = new Fuse(techniques, options);

  // Perform search
  const searchFilteredTechniques = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : techniques;

  const filteredTechniques = searchFilteredTechniques.filter(technique => {
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto px-6 py-8 h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full overflow-hidden">
        <TechniquesList
          techniques={techniques}
          categories={categories}
          selectedTechnique={selectedTechnique}
          setSelectedTechnique={setSelectedTechnique}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredTechniques={filteredTechniques}
          searchFilteredTechniques={searchFilteredTechniques}
        />
        {(() => {
          const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
          
          if (selectedTechnique) {
            return (
              <div className="lg:col-span-3 overflow-y-auto">
                <TechniqueDetails
                  selectedTechnique={selectedTechnique}
                  categories={categories}
                  useCases={useCases}
                  detailsTab={detailsTab}
                  setDetailsTab={setDetailsTab}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              </div>
            );
          }
          
          if (selectedCategoryData?.detailedDescription) {
            return (
              <div className="lg:col-span-3 overflow-y-auto">
                <CategoryDetails
                  category={selectedCategoryData}
                  techniques={techniques}
                  setSelectedTechnique={setSelectedTechnique}
                />
              </div>
            );
          }

          return (
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold mb-2">Select a Pattern or Technique</h3>
                <p>Choose a pattern or technique from the left to view detailed information, examples, and interactive demos.</p>
              </div>
            </div>
          );
        })()}
        </div>
      </div>
    </div>
  );
};