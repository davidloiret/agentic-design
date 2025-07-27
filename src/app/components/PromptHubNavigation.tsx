"use client"

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';
import { 
  Brain, 
  Github, 
  FileText, 
  Eye, 
  Search as SearchIcon,
  MessageSquare,
  Code,
  Bot,
  Zap,
  Database
} from 'lucide-react';

interface PromptItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  complexity: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  href: string;
  dateLeaked: string;
  promptCount: number;
}

interface ProviderCategory {
  id: string;
  name: string;
  icon: string;
  items: PromptItem[];
  description: string;
}

const promptItems: PromptItem[] = [
  // Anthropic Claude - Only existing pages
  {
    id: 'claude-2-0-20240306',
    name: 'Claude 2.0 (2024-03-06)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'medium',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-2-0-20240306',
    dateLeaked: '2024-03-06',
    promptCount: 1
  },
  {
    id: 'claude-2-1-20240306',
    name: 'Claude 2.1 (2024-03-06)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'medium',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-2-1-20240306',
    dateLeaked: '2024-03-06',
    promptCount: 1
  },
  {
    id: 'claude-3-opus-20240306',
    name: 'Claude 3 Opus (2024-03-06)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'high',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-3-opus-20240306',
    dateLeaked: '2024-03-06',
    promptCount: 1
  },
  {
    id: 'claude-35-sonnet-20240712',
    name: 'Claude 3.5 Sonnet (2024-07-12)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'high',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-35-sonnet-20240712',
    dateLeaked: '2024-07-12',
    promptCount: 1
  },
  {
    id: 'claude-api-tool-use-20250119',
    name: 'Claude API Tool Use (2025-01-19)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'high',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-api-tool-use-20250119',
    dateLeaked: '2025-01-19',
    promptCount: 1
  },
  {
    id: 'claude-37-sonnet-20250224',
    name: 'Claude 3.7 Sonnet (2025-02-24)',
    provider: 'anthropic',
    category: 'anthropic',
    complexity: 'high',
    icon: <Brain className="w-4 h-4" />,
    href: '/prompt-hub/anthropic/claude-37-sonnet-20250224',
    dateLeaked: '2025-02-24',
    promptCount: 1
  },

  // OpenAI - Only existing pages
  {
    id: 'chatgpt-20221201',
    name: 'ChatGPT (2022-12-01)',
    provider: 'openai',
    category: 'openai',
    complexity: 'medium',
    icon: <Github className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-20221201',
    dateLeaked: '2022-12-01',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-20241210',
    name: 'ChatGPT-4o (2024-12-10)',
    provider: 'openai',
    category: 'openai',
    complexity: 'high',
    icon: <Github className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-20241210',
    dateLeaked: '2024-12-10',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-20250506',
    name: 'ChatGPT-4o (2025-05-06)',
    provider: 'openai',
    category: 'openai',
    complexity: 'high',
    icon: <Github className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-20250506',
    dateLeaked: '2025-05-06',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-mini-voice-mode-20250706',
    name: 'ChatGPT-4o Mini Voice Mode (2025-07-06)',
    provider: 'openai',
    category: 'openai',
    complexity: 'high',
    icon: <Github className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-mini-voice-mode-20250706',
    dateLeaked: '2025-07-06',
    promptCount: 1
  },
  {
    id: 'dalle-3-20231007',
    name: 'DALL-E 3 (2023-10-07)',
    provider: 'openai',
    category: 'openai',
    complexity: 'medium',
    icon: <Eye className="w-4 h-4" />,
    href: '/prompt-hub/openai/dalle-3-20231007',
    dateLeaked: '2023-10-07',
    promptCount: 1
  },

  // Bolt - AI Development Platform
  {
    id: 'bolt-new-20241009',
    name: 'Bolt.new (2024-10-09)',
    provider: 'bolt',
    category: 'bolt',
    complexity: 'high',
    icon: <Zap className="w-4 h-4" />,
    href: '/prompt-hub/bolt/bolt-new-20241009',
    dateLeaked: '2024-10-09',
    promptCount: 1
  },

  // Vercel - AI UI Generation
  {
    id: 'v0-20250306',
    name: 'v0 (2025-03-06)',
    provider: 'vercel',
    category: 'vercel',
    complexity: 'high',
    icon: <Code className="w-4 h-4" />,
    href: '/prompt-hub/vercel/v0-20250306',
    dateLeaked: '2025-03-06',
    promptCount: 1
  },

  // Codeium - Agentic IDE
  {
    id: 'windsurf-cascade-r1-20250201',
    name: 'Windsurf Cascade R1 (2025-02-01)',
    provider: 'codeium',
    category: 'codeium',
    complexity: 'high',
    icon: <Bot className="w-4 h-4" />,
    href: '/prompt-hub/codeium/windsurf-cascade-r1-20250201',
    dateLeaked: '2025-02-01',
    promptCount: 1
  },

  // Perplexity - Search AI
  {
    id: 'perplexity-ai-20250112',
    name: 'Perplexity.ai (2025-01-12)',
    provider: 'perplexity',
    category: 'perplexity',
    complexity: 'high',
    icon: <SearchIcon className="w-4 h-4" />,
    href: '/prompt-hub/perplexity/perplexity-ai-20250112',
    dateLeaked: '2025-01-12',
    promptCount: 1
  },

  // The Browser Company - Browser-Native AI
  {
    id: 'dia-20250515',
    name: 'Dia (2025-05-15)',
    provider: 'browser-company',
    category: 'browser-company',
    complexity: 'high',
    icon: <Globe className="w-4 h-4" />,
    href: '/prompt-hub/browser-company/dia-20250515',
    dateLeaked: '2025-05-15',
    promptCount: 1
  }
];

const categories: ProviderCategory[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    description: 'Constitutional AI with safety focus',
    items: promptItems.filter(item => item.category === 'anthropic')
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    description: 'Industry-leading language models',
    items: promptItems.filter(item => item.category === 'openai')
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🎯',
    description: 'Real-time search AI',
    items: promptItems.filter(item => item.category === 'perplexity')
  },
  {
    id: 'bolt',
    name: 'Bolt',
    icon: '⚡',
    description: 'AI-powered full-stack development',
    items: promptItems.filter(item => item.category === 'bolt')
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '🎨',
    description: 'AI-powered UI generation platform',
    items: promptItems.filter(item => item.category === 'vercel')
  },
  {
    id: 'codeium',
    name: 'Codeium',
    icon: '🤖',
    description: 'Agentic IDE development assistant',
    items: promptItems.filter(item => item.category === 'codeium')
  },
  {
    id: 'browser-company',
    name: 'The Browser Company',
    icon: '🌐',
    description: 'Browser-native AI assistant',
    items: promptItems.filter(item => item.category === 'browser-company')
  }
];

export const PromptHubNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['anthropic']));
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

  const filteredItems = useMemo(() => {
    if (!searchQuery) return promptItems;
    return promptItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderPromptItem = (item: PromptItem) => {
    const isSelected = pathname === item.href;

    return (
      <button
        key={item.id}
        onClick={() => router.push(item.href)}
        className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all duration-200 group ml-4 ${
          isSelected
            ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 shadow-lg scale-[0.98]'
            : 'bg-gray-800/30 hover:bg-gray-800/50 hover:scale-[0.99]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
            isSelected ? 'bg-white/20 text-white' : 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600'
          }`}>
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm truncate ${
                isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
              }`}>
                {item.name}
              </h4>
              <div className={`flex items-center gap-2 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getComplexityColor(item.complexity)}`}>
                  {item.complexity}
                </span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{item.promptCount} prompt{item.promptCount > 1 ? 's' : ''}</span>
              <span className="text-xs text-gray-600">•</span>
              <span className="text-xs text-gray-500">{item.dateLeaked}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderCategory = (category: ProviderCategory) => {
    const isExpanded = expandedCategories.has(category.id);
    const categoryItems = category.items.filter(item => 
      filteredItems.includes(item)
    );
    
    if (categoryItems.length === 0 && searchQuery) {
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
                <p className="text-xs text-gray-500 truncate">{category.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full font-medium bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50">
                  {category.items.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-0.5 lg:space-y-1 ml-0">
            {categoryItems.map(item => renderPromptItem(item))}
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
            placeholder="Search leaked prompts..."
            className="w-full pl-11 lg:pl-12 pr-10 lg:pr-12 py-2 lg:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg lg:rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-gray-800/70 transition-all duration-200 text-gray-200 placeholder-gray-400 text-sm lg:text-base"
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
            Leaked System Prompts
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
        </div>
      </div>

      {/* Categories Tree */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-0 lg:pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        <div className="space-y-1 lg:space-y-2 pb-4 lg:pb-6">
          {searchQuery ? (
            /* Search Results */
            filteredItems.map(item => renderPromptItem(item))
          ) : (
            /* Categories */
            categories.map(category => renderCategory(category))
          )}
        </div>
      </div>
    </div>
  );
};