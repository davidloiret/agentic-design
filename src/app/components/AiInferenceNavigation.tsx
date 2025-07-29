"use client"

import React from 'react';
import { 
  BookOpen, 
  Cpu, 
  Cloud, 
  Zap, 
  BarChart3
} from 'lucide-react';
import { CategoryNavigationLayout, NavigationItem, NavigationCategory } from './CategoryNavigationLayout';
import Fuse from 'fuse.js';

const sections: NavigationItem[] = [
  {
    id: 'overview',
    name: 'Overview',
    category: 'core',
    complexity: 'low',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/ai-inference'
  },
  {
    id: 'agentic-patterns',
    name: 'Agentic Patterns',
    category: 'core',
    complexity: 'medium',
    icon: <Cpu className="w-4 h-4" />,
    href: '/ai-inference/agentic-patterns'
  },
  {
    id: 'optimization',
    name: 'Advanced Optimization',
    category: 'core',
    complexity: 'high',
    icon: <Zap className="w-4 h-4" />,
    href: '/ai-inference/optimization'
  },
  {
    id: 'web-inference',
    name: 'Web Inference',
    category: 'deployment',
    complexity: 'medium',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/ai-inference/web-inference'
  },
  {
    id: 'edge-mobile',
    name: 'Edge & Mobile',
    category: 'deployment',
    complexity: 'medium',
    icon: <Cpu className="w-4 h-4" />,
    href: '/ai-inference/edge-mobile'
  },
  {
    id: 'vision-models',
    name: 'Vision Models',
    category: 'deployment',
    complexity: 'high',
    icon: <BarChart3 className="w-4 h-4" />,
    href: '/ai-inference/vision-models'
  },
  {
    id: 'providers',
    name: 'Providers',
    category: 'tools',
    complexity: 'low',
    icon: <Cloud className="w-4 h-4" />,
    href: '/ai-inference/providers'
  },
  {
    id: 'libraries',
    name: 'Libraries',
    category: 'tools',
    complexity: 'medium',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/ai-inference/libraries'
  },
  {
    id: 'critical-gaps',
    name: 'Critical Gaps',
    category: 'advanced',
    complexity: 'high',
    icon: <Zap className="w-4 h-4" />,
    href: '/ai-inference/critical-gaps'
  },
  {
    id: 'examples',
    name: 'Examples',
    category: 'advanced',
    complexity: 'low',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/ai-inference/examples'
  }
];

const categories: NavigationCategory[] = [
  {
    id: 'core',
    name: 'Core Concepts',
    icon: '🧠'
  },
  {
    id: 'deployment',
    name: 'Deployment Options',
    icon: '🚀'
  },
  {
    id: 'tools',
    name: 'Tools & Services',
    icon: '🛠️'
  },
  {
    id: 'advanced',
    name: 'Advanced Topics',
    icon: '⚡'
  }
];

const options = {
  keys: ['name', 'category'],
  threshold: 0.3
};

export const AiInferenceNavigation = () => {
  // Custom filter function using Fuse.js
  const filterSections = (items: NavigationItem[], searchQuery: string) => {
    if (!searchQuery) return items;
    const fuse = new Fuse(items, options);
    return fuse.search(searchQuery).map(result => result.item);
  };

  return (
    <CategoryNavigationLayout
      items={sections}
      categories={categories}
      searchPlaceholder="Search AI inference topics..."
      sectionTitle="AI Inference Guide"
      basePath="/ai-inference"
      defaultExpandedCategories={['core']}
      filterItems={filterSections}
    />
  );
};