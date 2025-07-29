"use client"

import React from 'react';
import { 
  BookOpen, 
  Code, 
  Cloud, 
  Monitor, 
  Brain, 
  FileText, 
  Settings 
} from 'lucide-react';
import { CategoryNavigationLayout, NavigationItem, NavigationCategory } from './CategoryNavigationLayout';

const sections: NavigationItem[] = [
  {
    id: 'overview',
    name: 'Overview & Quick Start',
    category: 'getting-started',
    complexity: 'low',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/fine-tuning'
  },
  {
    id: 'cheatsheet',
    name: 'Cheatsheet & Best Practices',
    category: 'getting-started',
    complexity: 'low',
    icon: <FileText className="w-4 h-4" />,
    href: '/fine-tuning/cheatsheet'
  },
  {
    id: 'models',
    name: 'Model Selection Guide',
    category: 'getting-started',
    complexity: 'medium',
    icon: <Brain className="w-4 h-4" />,
    href: '/fine-tuning/models'
  },
  {
    id: 'techniques',
    name: 'Fine-Tuning Techniques',
    category: 'methods',
    complexity: 'medium',
    icon: <Settings className="w-4 h-4" />,
    href: '/fine-tuning/techniques'
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Tools',
    category: 'implementation',
    complexity: 'medium',
    icon: <Code className="w-4 h-4" />,
    href: '/fine-tuning/frameworks'
  },
  {
    id: 'cloud',
    name: 'Cloud Providers',
    category: 'deployment',
    complexity: 'medium',
    icon: <Cloud className="w-4 h-4" />,
    href: '/fine-tuning/cloud'
  },
  {
    id: 'local',
    name: 'Local & Edge Setup',
    category: 'deployment',
    complexity: 'high',
    icon: <Monitor className="w-4 h-4" />,
    href: '/fine-tuning/local'
  }
];

const categories: NavigationCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '🚀'
  },
  {
    id: 'methods',
    name: 'Methods & Techniques',
    icon: '🧪'
  },
  {
    id: 'implementation',
    name: 'Implementation',
    icon: '⚙️'
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: '🌐'
  }
];

export const FineTuningNavigation = () => {
  return (
    <CategoryNavigationLayout
      items={sections}
      categories={categories}
      searchPlaceholder="Search fine-tuning topics..."
      sectionTitle="Fine-Tuning Guide"
      basePath="/fine-tuning"
      defaultExpandedCategories={['getting-started']}
    />
  );
};