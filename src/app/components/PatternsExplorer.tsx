"use client"

import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { TechniquesList } from './TechniquesList';
import { TechniqueDetails } from './TechniqueDetails';
import { CategoryDetails } from './CategoryDetails';
import { ExpandableBottomSheet, type BottomSheetState } from './ExpandableBottomSheet';
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
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('collapsed');
  
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

  // Close mobile sidebar when technique is selected
  const handleTechniqueSelect = (technique: any) => {
    setSelectedTechnique(technique);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto px-4 sm:px-6 py-4 lg:py-8">
        {/* Mobile: Minimal header when technique is selected */}
        {selectedTechnique && (
          <div className="lg:hidden mb-2">
            <div className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-2">
              <button
                onClick={() => setSelectedTechnique(null)}
                className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Back to patterns"
              >
                <span className="text-lg">←</span>
              </button>
              <span className="text-lg">{selectedTechnique.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-white truncate text-sm">{selectedTechnique.name}</h2>
              </div>
            </div>
          </div>
        )}


        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
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

        {/* Mobile: Content area */}
        <div className="md:hidden">
          {selectedTechnique ? (
            <div className="min-h-[calc(100vh-4rem)] pb-20">
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
          ) : (
            <>
              <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center pb-20">
                <div className="text-center text-gray-400 px-6">
                  <Brain className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                  <h3 className="text-2xl font-semibold mb-4 text-white">Welcome to Agentic Design Patterns</h3>
                  <p className="mb-6 text-lg leading-relaxed">Discover powerful AI design patterns and techniques to build more reliable AI systems.</p>
                  <p className="text-sm text-gray-500 mb-8">Swipe up to browse patterns</p>
                  <div className="flex items-center justify-center">
                    <div className="animate-bounce">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Auto-show bottom sheet when no technique is selected */}
              <ExpandableBottomSheet
                isOpen={true}
                onClose={() => {}} // Don't allow closing when no technique is selected
                initialState="collapsed"
                onStateChange={setBottomSheetState}
              >
                <TechniquesList
                  techniques={techniques}
                  categories={categories}
                  selectedTechnique={selectedTechnique}
                  setSelectedTechnique={handleTechniqueSelect}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  filteredTechniques={filteredTechniques}
                  searchFilteredTechniques={searchFilteredTechniques}
                  bottomSheetState={bottomSheetState}
                />
              </ExpandableBottomSheet>
            </>
          )}
        </div>

      </div>
    </div>
  );
};