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
}

interface EmailSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  categories: string[];
  minimumRelevance: number;
}

export const NewsTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'articles' | 'people' | 'settings'>('articles');
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
  const [loading, setLoading] = useState(false);

  // Mock data - in real implementation, this would fetch from APIs
  useEffect(() => {
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'GPT-4 Agents Show Remarkable Planning Capabilities in Complex Environments',
        summary: 'Recent research demonstrates that GPT-4 based agents can perform multi-step planning tasks with 85% success rate in simulated environments...',
        source: 'AI Research Weekly',
        url: 'https://example.com/article1',
        publishedAt: '2025-01-18T10:00:00Z',
        category: 'research',
        relevanceScore: 9.2
      },
      {
        id: '2',
        title: 'OpenAI Announces New Agent Framework for Enterprise Applications',
        summary: 'OpenAI unveiled a new framework designed specifically for building autonomous agents in enterprise settings, featuring enhanced safety measures...',
        source: 'TechCrunch',
        url: 'https://example.com/article2',
        publishedAt: '2025-01-18T08:30:00Z',
        category: 'industry',
        relevanceScore: 8.7
      },
      {
        id: '3',
        title: 'Chain-of-Thought Reasoning Breakthrough: New Techniques Improve Accuracy by 40%',
        summary: 'Researchers at Stanford present novel approaches to chain-of-thought prompting that significantly enhance reasoning accuracy...',
        source: 'ArXiv Papers',
        url: 'https://example.com/article3',
        publishedAt: '2025-01-17T15:20:00Z',
        category: 'research',
        relevanceScore: 9.5
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
        recentActivity: 'Published new insights on scaling laws for transformer models',
        influenceScore: 9.8
      },
      {
        id: '2',
        name: 'Yann LeCun',
        title: 'Chief AI Scientist',
        company: 'Meta',
        expertise: ['Deep Learning', 'Computer Vision', 'AI Safety'],
        twitterHandle: '@ylecun',
        recentActivity: 'Discussed the future of autonomous AI agents at NeurIPS 2024',
        influenceScore: 9.9
      },
      {
        id: '3',
        name: 'Chelsea Finn',
        title: 'Assistant Professor',
        company: 'Stanford University',
        expertise: ['Robot Learning', 'Meta-Learning', 'AI Agents'],
        recentActivity: 'Released new research on few-shot learning for robotic agents',
        influenceScore: 8.9
      }
    ];

    setArticles(mockArticles);
    setPeople(mockPeople);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const filteredArticles = articles.filter(article => 
    selectedCategories.includes(article.category) ||
    selectedCategories.length === 0
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      ai: 'bg-blue-100 text-blue-800',
      agents: 'bg-green-100 text-green-800',
      research: 'bg-purple-100 text-purple-800',
      industry: 'bg-orange-100 text-orange-800',
      tools: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.tools;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agentic Design News Hub</h1>
        <p className="text-gray-400">Stay updated with the latest in AI agents, reasoning patterns, and industry developments</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'articles', label: 'Articles', icon: '📰' },
          { id: 'people', label: 'People', icon: '👥' },
          { id: 'settings', label: 'Settings', icon: '⚙️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeSection === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Articles Section */}
      {activeSection === 'articles' && (
        <div>
          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Categories:</label>
              <div className="flex space-x-2">
                {['ai', 'agents', 'research', 'industry', 'tools'].map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategories(prev => 
                        prev.includes(category) 
                          ? prev.filter(c => c !== category)
                          : [...prev, category]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Time:</label>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-all disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">{article.source}</span>
                    <span className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Relevance:</span>
                    <span className="text-sm font-medium text-blue-400">{article.relevanceScore}/10</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-white hover:text-blue-400 cursor-pointer">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    <span>Read Full Article</span>
                    <span>→</span>
                  </a>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span>🔖</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <span>📤</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People Section */}
      {activeSection === 'people' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Key People in Agentic Design</h2>
            <p className="text-gray-400">Track influential researchers, practitioners, and thought leaders</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {people.map(person => (
              <div key={person.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{person.name}</h3>
                    <p className="text-gray-400 text-sm">{person.title}</p>
                    <p className="text-gray-500 text-sm">{person.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Influence</div>
                    <div className="text-sm font-medium text-yellow-400">{person.influenceScore}/10</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {person.expertise.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 mb-1">Recent Activity:</div>
                  <p className="text-sm text-gray-300">{person.recentActivity}</p>
                </div>

                <div className="flex space-x-2">
                  {person.twitterHandle && (
                    <a href={`https://twitter.com/${person.twitterHandle.replace('@', '')}`} 
                       className="text-blue-400 hover:text-blue-300 text-sm">
                      Twitter
                    </a>
                  )}
                  {person.linkedinUrl && (
                    <a href={person.linkedinUrl} 
                       className="text-blue-400 hover:text-blue-300 text-sm">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Email Notifications</h2>
            <p className="text-gray-400">Configure how you receive updates about agentic design developments</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Email Notifications</h3>
                <p className="text-gray-400 text-sm">Receive curated summaries via email</p>
              </div>
              <button
                onClick={() => setEmailSettings(prev => ({...prev, enabled: !prev.enabled}))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailSettings.enabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {emailSettings.enabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
                  <select 
                    value={emailSettings.frequency}
                    onChange={(e) => setEmailSettings(prev => ({...prev, frequency: e.target.value as any}))}
                    className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categories to Include</label>
                  <div className="space-y-2">
                    {['ai', 'agents', 'research', 'industry', 'tools'].map(category => (
                      <label key={category} className="flex items-center space-x-2">
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
                          className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-300 capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Relevance Score: {emailSettings.minimumRelevance}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={emailSettings.minimumRelevance}
                    onChange={(e) => setEmailSettings(prev => ({...prev, minimumRelevance: parseInt(e.target.value)}))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-all">
                    Save Settings
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};