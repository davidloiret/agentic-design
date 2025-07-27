"use client"

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';
import { 
  BookOpen, 
  Cpu, 
  Cloud, 
  Zap, 
  BarChart3, 
  Settings,
  FileText
} from 'lucide-react';

interface NavigationSection {
  id: string;
  name: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  href: string;
}

interface NavigationCategory {
  id: string;
  name: string;
  icon: string;
  sections: NavigationSection[];
}

const sections: NavigationSection[] = [
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
    icon: '🧠',
    sections: sections.filter(s => s.category === 'core')
  },
  {
    id: 'deployment',
    name: 'Deployment Options',
    icon: '🚀',
    sections: sections.filter(s => s.category === 'deployment')
  },
  {
    id: 'tools',
    name: 'Tools & Services',
    icon: '🛠️',
    sections: sections.filter(s => s.category === 'tools')
  },
  {
    id: 'advanced',
    name: 'Advanced Topics',
    icon: '⚡',
    sections: sections.filter(s => s.category === 'advanced')
  }
];

export const AiInferenceNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['core']));
  const router = useRouter();
  const pathname = usePathname();

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

  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    return sections.filter(section =>
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderSection = (section: NavigationSection) => {
    const isSelected = pathname === section.href;

    return (
      <button
        key={section.id}
        onClick={() => router.push(section.href)}
        className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${
          isSelected
            ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 shadow-lg scale-[0.98]'
            : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-[0.99]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
            isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
          }`}>
            {section.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${
                isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
              }`}>
                {section.name}
              </h4>
              <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getComplexityColor(section.complexity)}`}>
                  {section.complexity}
                </span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderCategory = (category: NavigationCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    const categorySections = category.sections.filter(section => 
      filteredSections.includes(section)
    );
    
    if (categorySections.length === 0 && searchQuery) {
      return null;
    }

    return (
      <div key={category.id} className="space-y-1">
        <div className="w-full rounded-lg lg:rounded-xl transition-all duration-200 text-left group p-1.5 lg:p-2 bg-gray-800/60 hover:bg-gray-800/80 min-h-[36px] lg:min-h-auto">
          <div className="flex items-center gap-1 lg:gap-1">
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-1 rounded hover:bg-white/10 transition-colors duration-200 cursor-pointer min-w-[28px] lg:min-w-[32px] min-h-[28px] lg:min-h-[32px] flex items-center justify-center"
            >
              <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                <ChevronRight className="w-3 lg:w-4 h-3 lg:h-4 text-gray-400 group-hover:text-gray-300" />
              </div>
            </button>

            <div className="lg:w-[200px] flex-1 flex items-center gap-1.5 lg:gap-3 cursor-pointer hover:scale-[0.99] transition-transform min-h-[28px] lg:min-h-[32px]">
              <div className="w-7 lg:w-10 h-7 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center bg-gray-700/50 group-hover:bg-gray-600/50">
                <span className="text-sm lg:text-lg">
                  {category.icon}
                </span>
              </div>

              <div className="text-left flex-1 min-w-0">
                <h3 className="font-semibold truncate text-gray-200 group-hover:text-white text-xs lg:text-base">
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50">
                  {category.sections.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-0.5 lg:space-y-1 ml-0">
            {categorySections.map(section => renderSection(section))}
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
            placeholder="Search AI inference topics..."
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
            AI Inference Guide
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>
      </div>

      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        <div className="space-y-1 lg:space-y-2 pb-4 lg:pb-6">
          {searchQuery ? (
            /* Search Results */
            filteredSections.map(section => renderSection(section))
          ) : (
            /* Categories */
            categories.map(category => renderCategory(category))
          )}
        </div>
      </div>
    </div>
  );
};