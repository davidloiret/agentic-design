"use client"

import React from 'react';
import { 
  Brain, 
  Globe,
  Eye, 
  Search as SearchIcon,
  MessageSquare,
  Code,
  Bot,
  Zap,
  ChevronRight
} from 'lucide-react';
import { CategoryNavigationLayout, NavigationItem, NavigationCategory } from './CategoryNavigationLayout';

const promptItems: NavigationItem[] = [
  // Anthropic Claude - Only existing pages
  {
    id: 'claude-2-0-20240306',
    name: 'Claude 2.0 (2024-03-06)',
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
    category: 'openai',
    complexity: 'low',
    icon: <MessageSquare className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-20221201',
    dateLeaked: '2022-12-01',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-20241210',
    name: 'ChatGPT 4o (2024-12-10)',
    category: 'openai',
    complexity: 'high',
    icon: <MessageSquare className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-20241210',
    dateLeaked: '2024-12-10',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-20250506',
    name: 'ChatGPT 4o (2025-05-06)',
    category: 'openai',
    complexity: 'high',
    icon: <MessageSquare className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-20250506',
    dateLeaked: '2025-05-06',
    promptCount: 1
  },
  {
    id: 'chatgpt-4o-mini-voice-mode-20250706',
    name: 'ChatGPT 4o-mini Voice Mode (2025-07-06)',
    category: 'openai',
    complexity: 'medium',
    icon: <MessageSquare className="w-4 h-4" />,
    href: '/prompt-hub/openai/chatgpt-4o-mini-voice-mode-20250706',
    dateLeaked: '2025-07-06',
    promptCount: 1
  },
  {
    id: 'dalle-3-20231007',
    name: 'DALL-E 3 (2023-10-07)',
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
    category: 'browser-company',
    complexity: 'high',
    icon: <Globe className="w-4 h-4" />,
    href: '/prompt-hub/browser-company/dia-20250515',
    dateLeaked: '2025-05-15',
    promptCount: 1
  },

  // Cognition - Software Engineer AI
  {
    id: 'devin-20250515',
    name: 'Devin AI (2025-05-15)',
    category: 'cognition',
    complexity: 'high',
    icon: <Code className="w-4 h-4" />,
    href: '/prompt-hub/cognition/devin-20250515',
    dateLeaked: '2025-05-15',
    promptCount: 1
  }
];

const categories: NavigationCategory[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    description: 'Constitutional AI with safety focus'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    description: 'Industry-leading language models'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🎯',
    description: 'Real-time search AI'
  },
  {
    id: 'bolt',
    name: 'Bolt',
    icon: '⚡',
    description: 'AI-powered full-stack development'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '🎨',
    description: 'AI-powered UI generation platform'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    icon: '🤖',
    description: 'Agentic IDE development assistant'
  },
  {
    id: 'browser-company',
    name: 'The Browser Company',
    icon: '🌐',
    description: 'Browser-native AI assistant'
  },
  {
    id: 'cognition',
    name: 'Cognition',
    icon: '💻',
    description: 'Real OS software engineer AI'
  }
];

export const PromptHubNavigation = () => {
  // Custom render function to show additional info
  const renderPromptItemContent = (item: NavigationItem, isSelected: boolean) => {
    return (
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
              {item.complexity && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                  item.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {item.complexity}
                </span>
              )}
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
          {item.dateLeaked && (
            <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/60' : 'text-gray-500'}`}>
              Leaked: {item.dateLeaked}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <CategoryNavigationLayout
      items={promptItems}
      categories={categories}
      searchPlaceholder="Search system prompts..."
      sectionTitle="System Prompts"
      basePath="/prompt-hub"
      defaultExpandedCategories={['anthropic']}
      renderItemContent={renderPromptItemContent}
    />
  );
};