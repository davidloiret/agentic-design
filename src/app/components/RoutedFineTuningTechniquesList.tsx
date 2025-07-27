"use client"

import React, { Suspense } from 'react';
import { Search } from 'lucide-react';
import { TechniquesListLayout, type Technique, type Category as TechniqueCategory } from './TechniquesListLayout';
import { 
  BookOpen, 
  Code, 
  Cloud, 
  Monitor, 
  Brain, 
  FileText, 
  Settings 
} from 'lucide-react';

interface RoutedFineTuningTechniquesListProps {
  selectedCategory?: string;
  selectedTechnique?: string;
}

// Define Fine tuning sections as "techniques" for the layout
const fineTuningSections: Technique[] = [
  {
    id: 'overview',
    name: 'Overview & Quick Start',
    category: 'getting-started',
    complexity: 'low' as const,
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: 'cheatsheet',
    name: 'Cheatsheet & Best Practices',
    category: 'getting-started',
    complexity: 'low' as const,
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: 'techniques',
    name: 'Fine-Tuning Techniques',
    category: 'methods',
    complexity: 'medium' as const,
    icon: <Settings className="w-4 h-4" />
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Tools',
    category: 'implementation',
    complexity: 'medium' as const,
    icon: <Code className="w-4 h-4" />
  },
  {
    id: 'cloud',
    name: 'Cloud Providers',
    category: 'deployment',
    complexity: 'medium' as const,
    icon: <Cloud className="w-4 h-4" />
  },
  {
    id: 'local',
    name: 'Local & Edge Setup',
    category: 'deployment',
    complexity: 'high' as const,
    icon: <Monitor className="w-4 h-4" />
  },
  {
    id: 'models',
    name: 'Model Selection Guide',
    category: 'getting-started',
    complexity: 'medium' as const,
    icon: <Brain className="w-4 h-4" />
  }
];

// Define categories for grouping sections
const fineTuningCategories: TechniqueCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '🚀',
    techniques: fineTuningSections.filter(s => s.category === 'getting-started')
  },
  {
    id: 'methods',
    name: 'Methods & Techniques',
    icon: '⚙️',
    techniques: fineTuningSections.filter(s => s.category === 'methods')
  },
  {
    id: 'implementation',
    name: 'Implementation',
    icon: '🔧',
    techniques: fineTuningSections.filter(s => s.category === 'implementation')
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: '☁️',
    techniques: fineTuningSections.filter(s => s.category === 'deployment')
  }
];

const RoutedFineTuningTechniquesListInner = ({ selectedCategory, selectedTechnique }: RoutedFineTuningTechniquesListProps) => {
  // Custom filter function for fine tuning sections
  const filterTechniques = (techniques: Technique[], searchQuery: string) => {
    if (!searchQuery) return techniques;
    return techniques.filter(technique =>
      technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technique.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Custom techniques for category function
  const getTechniquesForCategory = (categoryId: string, techniques: Technique[]) => {
    if (categoryId === 'all') return techniques;
    return techniques.filter(technique => technique.category === categoryId);
  };

  // Custom navigation handler for flat routes
  const handleTechniqueSelect = (technique: Technique) => {
    // For flat routes, navigate directly to /fine-tuning/{section}
    window.location.href = `/fine-tuning/${technique.id}`;
  };

  // Custom category count function
  const getCategoryCount = (categoryId: string) => {
    const category = fineTuningCategories.find(cat => cat.id === categoryId);
    return category ? category.techniques?.length || 0 : 0;
  };

  return (
    <TechniquesListLayout
      techniques={fineTuningSections}
      categories={fineTuningCategories}
      selectedCategory={selectedCategory}
      selectedTechnique={selectedTechnique}
      searchPlaceholder="Search fine-tuning topics..."
      sectionTitle="Fine-Tuning Guide"
      basePath="/fine-tuning"
      accentColor="blue"
      renderTechniqueIcon={(technique) => technique.icon}
      filterTechniques={filterTechniques}
      getTechniquesForCategory={getTechniquesForCategory}
      getCategoryCount={getCategoryCount}
    />
  );
};

export const RoutedFineTuningTechniquesList = ({ selectedCategory, selectedTechnique }: RoutedFineTuningTechniquesListProps = {}) => {
  return (
    <Suspense fallback={<div className="lg:col-span-1 h-full flex flex-col min-h-0">
      <div className="relative flex-shrink-0 mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search fine-tuning topics..."
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
      <RoutedFineTuningTechniquesListInner 
        selectedCategory={selectedCategory} 
        selectedTechnique={selectedTechnique} 
      />
    </Suspense>
  );
};