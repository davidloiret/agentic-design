import { Brain, TrendingUp, Activity, Star, Code, BookOpen, Users, Target, Shield, ChartBar } from 'lucide-react';
import { categories } from '../../../categories';
import Link from 'next/link';

// Analytics Components
const MetricCard: React.FC<{ 
  title: string; 
  value: string | number; 
  change?: number; 
  icon: React.ReactNode;
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
        <div className="text-blue-400">{icon}</div>
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

const CategoryChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex items-center space-x-3">
          <div className="w-24 text-xs text-gray-400 text-right truncate">{item.label}</div>
          <div className="flex-1 bg-gray-700/30 rounded-full h-2 relative overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
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

export default function ContentPage() {
  // Calculate analytics from categories data
  const totalTechniques = categories.reduce((sum, cat) => sum + (cat.techniques?.length || 0), 0);
  const totalCategories = categories.length;
  const totalUseCases = categories.reduce((sum, cat) => sum + (cat.useCases?.length || 0), 0);
  const avgTechniquesPerCategory = Math.round(totalTechniques / totalCategories);

  // Category distribution data
  const categoryData = categories.slice(0, 8).map((cat, index) => ({
    label: cat.name,
    value: cat.techniques?.length || 0,
    color: [
      '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', 
      '#ef4444', '#06b6d4', '#84cc16', '#f97316'
    ][index % 8]
  }));

  // Top techniques by frequency (simulated data based on complexity)
  const popularTechniques = [
    'Chain of Thought', 'Tool Use', 'RAG', 'Multi-Agent', 'Self-Correction'
  ];

  return (
    <div className="w-full max-w-none p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <Brain className="w-10 h-10 mx-auto mb-3 text-purple-400" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Agentic Design Patterns
        </h2>
        <p className="text-gray-400 text-sm">
          Explore our comprehensive collection of patterns, techniques, and methodologies for building intelligent AI systems.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Categories" 
          value={totalCategories} 
          change={12} 
          icon={<BookOpen className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Total Techniques" 
          value={totalTechniques} 
          change={18} 
          icon={<Code className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Use Cases" 
          value={totalUseCases} 
          change={25} 
          icon={<Target className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Avg per Category" 
          value={avgTechniquesPerCategory} 
          change={8} 
          icon={<ChartBar className="w-4 h-4" />} 
          trend="up" 
        />
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Pattern Categories</span>
          </h3>
          <CategoryChart data={categoryData} />
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span>Popular Techniques</span>
          </h3>
          <div className="space-y-3">
            {popularTechniques.map((technique, index) => (
              <div key={technique} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{technique}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-700/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(20, (5 - index) * 20)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{5 - index}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span>Featured Categories</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 6).map(category => (
            <Link key={category.id} href={`/patterns/${category.id}`} className="block">
              <div className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <h4 className="font-semibold text-white text-sm">{category.name}</h4>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                    {category.techniques?.length || 0} techniques
                  </span>
                </div>
                <p className="text-xs text-gray-300 mb-3 line-clamp-2">{category.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{category.useCases?.length || 0} use cases</span>
                  <span className="text-purple-400 hover:text-purple-300">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-400" />
          <span>Getting Started</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-purple-400 mb-2">For Beginners</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Start with <strong>Reasoning Techniques</strong> for foundational thinking patterns</li>
              <li>• Explore <strong>Prompt Chaining</strong> for building multi-step workflows</li>
              <li>• Learn <strong>Tool Use</strong> patterns for practical applications</li>
              <li>• Study <strong>Guardrails/Safety</strong> for responsible AI deployment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-400 mb-2">For Advanced Users</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Implement <strong>Multi-Agent</strong> systems for complex coordination</li>
              <li>• Design <strong>Cognitive Architectures</strong> for specialized reasoning</li>
              <li>• Build <strong>Knowledge Representation</strong> systems with semantic validation</li>
              <li>• Explore <strong>Context Orchestration</strong> for enterprise-scale deployments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}