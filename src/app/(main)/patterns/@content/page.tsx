'use client';

import React from 'react';
import { Brain, TrendingUp, Activity, Star, Code, BookOpen, Users, Target, Shield, ChartBar } from 'lucide-react';
import { categories } from '../../../categories';
import Link from 'next/link';
import { BrainMascot, BrainExpression } from '@/components/BrainMascot';
import { motion, AnimatePresence } from 'framer-motion';

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

// CategoryItem Component
const CategoryItem: React.FC<{ category: any; index: number }> = ({ category, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Different brain expressions for different categories
  const categoryExpressions: BrainExpression[] = ['focused', 'thinking', 'excited', 'happy', 'surprised', 'neutral'];
  const categoryColors = ['purple', 'blue', 'green', 'amber', 'red', 'purple'] as const;
  
  return (
    <Link href={`/patterns/${category.id}`} className="block">
      <motion.div 
        className="relative bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all cursor-pointer group overflow-hidden"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Floating Brain Mascot - Positioned Absolutely */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              className="absolute top-2 right-2 z-10"
              initial={{ opacity: 0, scale: 0.5, rotate: -20, x: 10, y: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -20, x: 10, y: -10 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <BrainMascot
                expression={categoryExpressions[index]}
                size="small"
                color={categoryColors[index]}
                animate={true}
                skipInitialAnimation={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{category.icon}</span>
              <h4 className="font-semibold text-white text-sm">{category.name}</h4>
            </div>
          </div>
          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
            {category.techniques?.length || 0} techniques
          </span>
        </div>
        <p className="text-xs text-gray-300 mb-3 line-clamp-2">{category.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{category.useCases?.length || 0} use cases</span>
          <span className="text-purple-400 hover:text-purple-300 group-hover:translate-x-1 transition-transform">
            Explore →
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default function ContentPage() {
  // Calculate analytics from categories data
  const totalTechniques = categories.reduce((sum, cat) => sum + (cat.techniques?.length || 0), 0);
  const totalCategories = categories.length;
  const totalUseCases = categories.reduce((sum, cat) => sum + (cat.useCases?.length || 0), 0);
  const avgTechniquesPerCategory = Math.round(totalTechniques / totalCategories);

  // Brain mascot expressions for different sections
  const [headerExpression, setHeaderExpression] = React.useState<BrainExpression>('happy');
  const [interactionCount, setInteractionCount] = React.useState(0);

  const handleBrainClick = () => {
    const expressions: BrainExpression[] = ['excited', 'happy', 'surprised', 'winking', 'focused'];
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    setHeaderExpression(randomExpression);
    setInteractionCount(prev => prev + 1);
    
    // Reset to happy after a delay
    setTimeout(() => setHeaderExpression('happy'), 2000);
  };

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
      {/* Header with Animated Brain Mascot */}
      <div className="text-center">
        <motion.div 
          className="flex justify-center mb-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            scale: {
              type: "spring",
              damping: 15,
              stiffness: 100
            }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <BrainMascot
              expression={headerExpression}
              size="medium"
              color="purple"
              animate={true}
              skipInitialAnimation={true}
              onExpressionChange={handleBrainClick}
            />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Agentic Design Patterns
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Explore our comprehensive collection of patterns, techniques, and methodologies for building intelligent AI systems.
        </motion.p>
        
        {/* Interaction counter with celebration */}
        {interactionCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-2"
          >
            <span className="text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded-full border border-purple-700/50">
              {interactionCount === 1 ? 'Great! You found the interactive brain!' : 
               interactionCount === 5 ? 'Wow! You really like clicking that brain!' :
               interactionCount === 10 ? '🎉 Brain clicked 10 times! You\'re a true AI enthusiast!' :
               `Clicked ${interactionCount} times`}
            </span>
          </motion.div>
        )}
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
          {categories.slice(0, 6).map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden">
        {/* Floating brain mascot in corner */}
        <motion.div 
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, x: 20, scale: 0.5 }}
          animate={{ opacity: 0.6, x: 0, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            ease: "easeOut",
            scale: { duration: 0.3 }
          }}
        >
          <BrainMascot
            expression="happy"
            size="small"
            color="green"
            animate={true}
          />
        </motion.div>
        
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