import React, { useState, useEffect } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'ai' | 'agents' | 'research' | 'industry' | 'tools';
  relevanceScore: number;
  company?: string;
  institution?: string;
  readTime?: number;
  bookmarked?: boolean;
}

interface Person {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  twitterHandle?: string;
  linkedinUrl?: string;
  recentActivity: string;
  influenceScore: number;
  avatar?: string;
}

interface EmailSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  categories: string[];
  minimumRelevance: number;
}

interface FilterOptions {
  search: string;
  sortBy: 'relevance' | 'date' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

// Skeleton Loader Component
const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-800 p-6 rounded-xl space-y-4">
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-700 rounded w-24"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="text-6xl mb-4 opacity-50">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-300 mb-2">{title}</h3>
    <p className="text-gray-500 text-center max-w-md">{description}</p>
  </div>
);

// Simple Chart Components
const TrendChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center space-x-3">
          <div className="w-16 text-xs text-gray-400 text-right">{item.label}</div>
          <div className="flex-1 bg-gray-700/30 rounded-full h-2 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${(item.value / maxValue) * 100}%`,
                animationDelay: `${index * 100}ms`
              }}
            />
          </div>
          <div className="w-8 text-xs text-gray-300 font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  return (
    <div className="flex items-center space-x-6">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="15.915"
            fill="transparent"
            stroke="rgb(75 85 99)"
            strokeWidth="1"
          />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -currentAngle;
            currentAngle += percentage;
            
            return (
              <circle
                key={index}
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke={item.color}
                strokeWidth="2"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{total}</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-300">{item.label}</span>
            <span className="text-xs text-gray-400">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ 
  title: string; 
  value: string | number; 
  change?: number; 
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}> = ({ title, value, change, icon, trend }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '➡️';
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-medium">{title}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <span className="text-xs">{getTrendIcon()}</span>
            <span className="text-xs font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const NewsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'articles' | 'people' | 'companies' | 'settings'>('overview');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    enabled: false,
    frequency: 'weekly',
    categories: ['ai', 'agents'],
    minimumRelevance: 7
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['ai', 'agents']);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: '',
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  // Enhanced mock data with more realistic content
  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'GPT-4 Agents Show Remarkable Planning Capabilities in Complex Environments',
          summary: 'Recent research demonstrates that GPT-4 based agents can perform multi-step planning tasks with 85% success rate in simulated environments, opening new possibilities for autonomous systems in real-world applications.',
          source: 'AI Research Weekly',
          url: 'https://example.com/article1',
          publishedAt: '2025-01-18T10:00:00Z',
          category: 'research',
          relevanceScore: 9.2,
          institution: 'MIT Computer Science',
          company: 'OpenAI',
          readTime: 5,
          bookmarked: false
        },
        {
          id: '2',
          title: 'OpenAI Announces New Agent Framework for Enterprise Applications',
          summary: 'OpenAI unveiled a comprehensive framework designed specifically for building autonomous agents in enterprise settings, featuring enhanced safety measures, compliance tools, and enterprise-grade security protocols.',
          source: 'TechCrunch',
          url: 'https://example.com/article2',
          publishedAt: '2025-01-18T08:30:00Z',
          category: 'industry',
          relevanceScore: 8.7,
          company: 'OpenAI',
          readTime: 7,
          bookmarked: true
        },
        {
          id: '3',
          title: 'Chain-of-Thought Reasoning Breakthrough: New Techniques Improve Accuracy by 40%',
          summary: 'Researchers at Stanford present novel approaches to chain-of-thought prompting that significantly enhance reasoning accuracy across diverse problem domains, with particular improvements in mathematical and logical reasoning tasks.',
          source: 'ArXiv Papers',
          url: 'https://example.com/article3',
          publishedAt: '2025-01-17T15:20:00Z',
          category: 'research',
          relevanceScore: 9.5,
          institution: 'Stanford University',
          readTime: 12,
          bookmarked: false
        },
        {
          id: '4',
          title: 'Microsoft Copilot Integration Brings AI Agents to Office 365',
          summary: 'Microsoft announces deeper integration of AI agents within Office 365, enabling automated workflow management, intelligent document processing, and context-aware assistance across productivity applications.',
          source: 'Microsoft Blog',
          url: 'https://example.com/article4',
          publishedAt: '2025-01-17T12:15:00Z',
          category: 'industry',
          relevanceScore: 8.3,
          company: 'Microsoft',
          readTime: 6,
          bookmarked: false
        },
        {
          id: '5',
          title: 'New LangChain Tools Simplify Multi-Agent System Development',
          summary: 'LangChain releases a suite of new tools designed to streamline the development of multi-agent systems, including agent communication protocols, coordination mechanisms, and debugging utilities.',
          source: 'AI Tool Review',
          url: 'https://example.com/article5',
          publishedAt: '2025-01-16T14:45:00Z',
          category: 'tools',
          relevanceScore: 7.9,
          readTime: 8,
          bookmarked: false
        }
      ];

      const mockPeople: Person[] = [
        {
          id: '1',
          name: 'Andrej Karpathy',
          title: 'AI Research Scientist',
          company: 'Tesla (former OpenAI)',
          expertise: ['Neural Networks', 'Computer Vision', 'Autonomous Systems'],
          twitterHandle: '@karpathy',
          recentActivity: 'Published new insights on scaling laws for transformer models and their implications for autonomous agents',
          influenceScore: 9.8,
          avatar: '👨‍💻'
        },
        {
          id: '2',
          name: 'Yann LeCun',
          title: 'Chief AI Scientist',
          company: 'Meta',
          expertise: ['Deep Learning', 'Computer Vision', 'AI Safety'],
          twitterHandle: '@ylecun',
          recentActivity: 'Discussed the future of autonomous AI agents and their role in advancing human-AI collaboration at NeurIPS 2024',
          influenceScore: 9.9,
          avatar: '🧠'
        },
        {
          id: '3',
          name: 'Chelsea Finn',
          title: 'Assistant Professor',
          company: 'Stanford University',
          expertise: ['Robot Learning', 'Meta-Learning', 'AI Agents'],
          recentActivity: 'Released groundbreaking research on few-shot learning capabilities for robotic agents in dynamic environments',
          influenceScore: 8.9,
          avatar: '🤖'
        },
        {
          id: '4',
          name: 'Pieter Abbeel',
          title: 'Professor & Co-founder',
          company: 'UC Berkeley & Covariant',
          expertise: ['Robotics', 'Deep RL', 'AI Agents'],
          recentActivity: 'Demonstrated new reinforcement learning techniques for multi-agent coordination in manufacturing environments',
          influenceScore: 9.1,
          avatar: '⚡'
        }
      ];

      setArticles(mockArticles);
      setPeople(mockPeople);
      setLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, bookmarked: !article.bookmarked }
        : article
    ));
  };

  const filteredAndSortedArticles = articles
    .filter(article => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(article.category);
      const matchesSearch = filterOptions.search === '' || 
        article.title.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        article.summary.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        article.source.toLowerCase().includes(filterOptions.search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const multiplier = filterOptions.sortOrder === 'desc' ? -1 : 1;
      switch (filterOptions.sortBy) {
        case 'relevance':
          return (a.relevanceScore - b.relevanceScore) * multiplier;
        case 'date':
          return (new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()) * multiplier;
        case 'popularity':
          return (a.relevanceScore - b.relevanceScore) * multiplier; // Using relevance as proxy for popularity
        default:
          return 0;
      }
    });

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      ai: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: '🧠' },
      agents: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: '🤖' },
      research: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: '🔬' },
      industry: { color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: '🏢' },
      tools: { color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: '🛠️' }
    };
    return categoryMap[category as keyof typeof categoryMap] || categoryMap.tools;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 9) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    if (score >= 5) return 'text-orange-400';
    return 'text-red-400';
  };

  // Mock analytics data
  const analyticsData = {
    weeklyTrends: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 19 },
      { label: 'Wed', value: 15 },
      { label: 'Thu', value: 27 },
      { label: 'Fri', value: 23 },
      { label: 'Sat', value: 8 },
      { label: 'Sun', value: 11 }
    ],
    categoryDistribution: [
      { label: 'AI', value: 8, color: '#3b82f6' },
      { label: 'Agents', value: 12, color: '#10b981' },
      { label: 'Research', value: 15, color: '#8b5cf6' },
      { label: 'Industry', value: 10, color: '#f59e0b' },
      { label: 'Tools', value: 5, color: '#6b7280' }
    ],
    metrics: [
      { title: 'Total Articles', value: 47, change: 12, icon: '📄', trend: 'up' as const },
      { title: 'Avg. Relevance', value: '8.4', change: 5, icon: '⭐', trend: 'up' as const },
      { title: 'Active Sources', value: 23, change: -2, icon: '📰', trend: 'down' as const },
      { title: 'Bookmarked', value: 12, change: 8, icon: '🔖', trend: 'up' as const }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
            <span className="text-2xl">📰</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Agentic Design News Hub
            </h1>
            <p className="text-gray-400 mt-1">Stay updated with the latest in AI agents, reasoning patterns, and industry developments</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Now at the top */}
      <div className="flex flex-wrap gap-2 mb-8 bg-gray-800/30 backdrop-blur-sm p-2 rounded-2xl border border-gray-700/50">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'articles', label: 'Articles', icon: '📄', count: articles.length },
          { id: 'people', label: 'People', icon: '👥', count: people.length },
          { id: 'companies', label: 'Companies', icon: '🏢', count: 6 },
          { id: 'settings', label: 'Settings', icon: '⚙️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeSection === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeSection === tab.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div>
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {analyticsData.metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>📊</span>
                <span>Weekly Activity</span>
              </h3>
              <TrendChart data={analyticsData.weeklyTrends} />
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span>🎯</span>
                <span>Category Distribution</span>
              </h3>
              <DonutChart data={analyticsData.categoryDistribution} />
            </div>
          </div>

          {/* Recent Activity Summary */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <span>🔥</span>
              <span>Latest Highlights</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400">🔬</span>
                  <span className="text-sm font-medium text-blue-400">Research Trending</span>
                </div>
                <p className="text-sm text-gray-300">
                  Chain-of-thought reasoning papers showing 40% accuracy improvement
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-emerald-400">🏢</span>
                  <span className="text-sm font-medium text-emerald-400">Industry Updates</span>
                </div>
                <p className="text-sm text-gray-300">
                  OpenAI and Microsoft lead in enterprise agent frameworks
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-purple-400">👥</span>
                  <span className="text-sm font-medium text-purple-400">Expert Insights</span>
                </div>
                <p className="text-sm text-gray-300">
                  Yann LeCun discusses future of autonomous AI agents
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveSection('articles')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all"
              >
                <span>📄</span>
                <span>Browse Articles</span>
              </button>
              <button 
                onClick={() => setActiveSection('people')}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-all"
              >
                <span>👥</span>
                <span>View Experts</span>
              </button>
              <button 
                onClick={() => setActiveSection('companies')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-all"
              >
                <span>🏢</span>
                <span>Track Companies</span>
              </button>
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                <span className={`${refreshing ? 'animate-spin' : ''}`}>🔄</span>
                <span>{refreshing ? 'Refreshing...' : 'Refresh All'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Section */}
      {activeSection === 'articles' && (
        <div>
          {/* Real-time insights banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <span className="text-xl">💡</span>
              <div>
                <h3 className="font-semibold text-blue-400">Today's Insights</h3>
                <p className="text-sm text-gray-300">
                  Research articles are trending +40% this week. OpenAI and Stanford lead in publication activity.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search articles, sources, companies..."
                value={filterOptions.search}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {filterOptions.search && (
                <button
                  onClick={() => setFilterOptions(prev => ({ ...prev, search: '' }))}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Categories */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-300">Categories:</label>
                  <div className="flex flex-wrap gap-2">
                    {['ai', 'agents', 'research', 'industry', 'tools'].map(category => {
                      const categoryInfo = getCategoryInfo(category);
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategories(prev => 
                              prev.includes(category) 
                                ? prev.filter(c => c !== category)
                                : [...prev, category]
                            );
                          }}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                            selectedCategories.includes(category)
                              ? categoryInfo.color
                              : 'bg-gray-700/50 text-gray-400 border-gray-600/50 hover:bg-gray-600/50'
                          }`}
                        >
                          <span>{categoryInfo.icon}</span>
                          <span>{category.toUpperCase()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Range */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-300">Time:</label>
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="bg-gray-700/50 text-white px-3 py-2 rounded-lg border border-gray-600/50 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-300">Sort:</label>
                  <select 
                    value={`${filterOptions.sortBy}-${filterOptions.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-');
                      setFilterOptions(prev => ({ 
                        ...prev, 
                        sortBy: sortBy as FilterOptions['sortBy'], 
                        sortOrder: sortOrder as FilterOptions['sortOrder'] 
                      }));
                    }}
                    className="bg-gray-700/50 text-white px-3 py-2 rounded-lg border border-gray-600/50 focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="relevance-desc">Relevance (High to Low)</option>
                    <option value="relevance-asc">Relevance (Low to High)</option>
                    <option value="date-desc">Date (Newest First)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {filteredAndSortedArticles.length !== articles.length && (
                  <span className="text-xs text-gray-400 px-2 py-1 bg-gray-700/50 rounded">
                    {filteredAndSortedArticles.length} of {articles.length}
                  </span>
                )}
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={`${refreshing ? 'animate-spin' : ''}`}>🔄</span>
                  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Articles List */}
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : filteredAndSortedArticles.length === 0 ? (
            <EmptyState 
              icon="📄" 
              title="No articles found" 
              description="Try adjusting your filters or search terms to find relevant articles."
            />
          ) : (
            <div className="space-y-6">
              {filteredAndSortedArticles.map(article => {
                const categoryInfo = getCategoryInfo(article.category);
                return (
                  <article 
                    key={article.id} 
                    className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-wrap gap-2">
                        <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${categoryInfo.color}`}>
                          <span>{categoryInfo.icon}</span>
                          <span>{article.category.toUpperCase()}</span>
                        </span>
                        <span className="text-gray-400 text-sm font-medium">{article.source}</span>
                        <span className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</span>
                        {article.readTime && (
                          <span className="text-gray-500 text-sm">📖 {article.readTime} min read</span>
                        )}
                        {article.company && (
                          <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium">
                            🏢 {article.company}
                          </span>
                        )}
                        {article.institution && (
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                            🎓 {article.institution}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-xs text-gray-400">Relevance</div>
                          <div className={`text-sm font-bold ${getRelevanceColor(article.relevanceScore)}`}>
                            {article.relevanceScore}/10
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 cursor-pointer transition-colors leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <a 
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium group/link transition-all"
                      >
                        <span>Read Full Article</span>
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleBookmark(article.id)}
                          className={`p-2 rounded-lg transition-all ${
                            article.bookmarked 
                              ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' 
                              : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                          }`}
                          title={article.bookmarked ? 'Remove bookmark' : 'Bookmark article'}
                        >
                          <span className="text-lg">{article.bookmarked ? '🔖' : '📌'}</span>
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                          title="Share article"
                        >
                          <span className="text-lg">📤</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Enhanced People Section */}
      {activeSection === 'people' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Key People in Agentic Design
            </h2>
            <p className="text-gray-400">Track influential researchers, practitioners, and thought leaders shaping the future of AI agents</p>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {people.map(person => (
                <div 
                  key={person.id} 
                  className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-xl">
                        {person.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                          {person.name}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">{person.title}</p>
                        <p className="text-gray-500 text-sm">{person.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Influence</div>
                      <div className={`text-lg font-bold ${getRelevanceColor(person.influenceScore)}`}>
                        {person.influenceScore}/10
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2 font-medium">Expertise:</div>
                    <div className="flex flex-wrap gap-2">
                      {person.expertise.map(skill => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs text-gray-400 mb-2 font-medium">Recent Activity:</div>
                    <p className="text-sm text-gray-300 leading-relaxed">{person.recentActivity}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {person.twitterHandle && (
                        <a 
                          href={`https://twitter.com/${person.twitterHandle.replace('@', '')}`} 
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>🐦</span>
                          <span>Twitter</span>
                        </a>
                      )}
                      {person.linkedinUrl && (
                        <a 
                          href={person.linkedinUrl} 
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>💼</span>
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>
                    <button className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Companies Section */}
      {activeSection === 'companies' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Companies & Institutions
            </h2>
            <p className="text-gray-400">Track organizations leading in agentic design and AI research</p>
          </div>

          {/* Enhanced Company Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'OpenAI',
                type: 'AI Research Company',
                icon: '🚀',
                articles: 2,
                activityScore: 9.2,
                category: 'AI Research',
                categoryColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                recentArticles: [
                  'New Agent Framework for Enterprise',
                  'GPT-4 Planning Capabilities Study'
                ]
              },
              {
                name: 'Stanford University',
                type: 'Research Institution',
                icon: '🎓',
                articles: 1,
                activityScore: 8.9,
                category: 'Research',
                categoryColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                recentArticles: [
                  'Chain-of-Thought Reasoning Breakthrough'
                ]
              },
              {
                name: 'MIT Computer Science',
                type: 'Research Institution',
                icon: '🏛️',
                articles: 1,
                activityScore: 8.7,
                category: 'Research',
                categoryColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                recentArticles: [
                  'GPT-4 Agents Planning Research'
                ]
              },
              {
                name: 'Microsoft',
                type: 'Technology Company',
                icon: '💻',
                articles: 1,
                activityScore: 8.3,
                category: 'Industry',
                categoryColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
                recentArticles: [
                  'Copilot Integration with Office 365'
                ]
              },
              {
                name: 'Meta',
                type: 'Technology Company',
                icon: '🌐',
                articles: 0,
                activityScore: 7.8,
                category: 'AI Research',
                categoryColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                recentArticles: []
              },
              {
                name: 'UC Berkeley',
                type: 'University',
                icon: '🐻',
                articles: 0,
                activityScore: 8.5,
                category: 'Research',
                categoryColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
                recentArticles: []
              }
            ].map(org => (
              <div 
                key={org.name}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600/20 to-gray-500/20 rounded-xl flex items-center justify-center text-xl">
                      {org.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                        {org.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{org.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Activity Score</div>
                    <div className={`text-lg font-bold ${getRelevanceColor(org.activityScore)}`}>
                      {org.activityScore}/10
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-2 font-medium">
                    Recent Articles: {org.articles}
                  </div>
                  <div className="space-y-1 min-h-[3rem]">
                    {org.recentArticles.length > 0 ? (
                      org.recentArticles.map((article, idx) => (
                        <div key={idx} className="text-sm text-gray-300">
                          • {article}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic">No recent articles</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${org.categoryColor}`}>
                    {org.category}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline transition-all">
                    View All →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
              <div className="text-gray-400 font-medium">Companies Tracked</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">8</div>
              <div className="text-gray-400 font-medium">Institutions Tracked</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">47</div>
              <div className="text-gray-400 font-medium">Articles This Month</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">8.4</div>
              <div className="text-gray-400 font-medium">Avg Activity Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Settings Section */}
      {activeSection === 'settings' && (
        <div className="max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-400 to-blue-400 bg-clip-text text-transparent">
              Notification Settings
            </h2>
            <p className="text-gray-400">Configure how you receive updates about agentic design developments</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-gray-700/50">
              <div>
                <h3 className="font-semibold text-lg text-white mb-1">Email Notifications</h3>
                <p className="text-gray-400 text-sm">Receive curated summaries and updates via email</p>
              </div>
              <button
                onClick={() => setEmailSettings(prev => ({...prev, enabled: !prev.enabled}))}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  emailSettings.enabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  emailSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {emailSettings.enabled && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Frequency</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'daily', label: 'Daily', desc: 'Every day' },
                      { value: 'weekly', label: 'Weekly', desc: 'Every Sunday' },
                      { value: 'monthly', label: 'Monthly', desc: 'First of month' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => setEmailSettings(prev => ({...prev, frequency: option.value as any}))}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          emailSettings.frequency === option.value
                            ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                            : 'bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-400">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Categories to Include</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['ai', 'agents', 'research', 'industry', 'tools'].map(category => {
                      const categoryInfo = getCategoryInfo(category);
                      return (
                        <label key={category} className="flex items-center space-x-3 p-3 rounded-xl bg-gray-700/30 border border-gray-600/50 hover:bg-gray-700/50 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            checked={emailSettings.categories.includes(category)}
                            onChange={(e) => {
                              setEmailSettings(prev => ({
                                ...prev,
                                categories: e.target.checked 
                                  ? [...prev.categories, category]
                                  : prev.categories.filter(c => c !== category)
                              }));
                            }}
                            className="w-4 h-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <span className="text-lg">{categoryInfo.icon}</span>
                          <span className="text-gray-300 font-medium capitalize">{category}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Minimum Relevance Score: {emailSettings.minimumRelevance}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={emailSettings.minimumRelevance}
                      onChange={(e) => setEmailSettings(prev => ({...prev, minimumRelevance: parseInt(e.target.value)}))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1 - Low</span>
                      <span>5 - Medium</span>
                      <span>10 - High</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700/50">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                    <span>💾</span>
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};