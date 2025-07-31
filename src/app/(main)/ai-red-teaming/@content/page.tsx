'use client';

import React from 'react';
import { Shield, TrendingUp, Activity, Star, Code, BookOpen, Users, Target, AlertTriangle, ChartBar, Lock, Zap, FileText, ArrowRight, CheckSquare } from 'lucide-react';
import { allRedTeamingTechniques, redTeamingCategories } from '../../../red-teaming';
import Link from 'next/link';
import { BrainMascot, BrainExpression } from '@/components/BrainMascot';
import { motion } from 'framer-motion';

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
        <div className="text-red-400">{icon}</div>
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
  // Calculate analytics from red teaming data
  const totalTechniques = allRedTeamingTechniques.length;
  const totalCategories = Object.keys(redTeamingCategories).length;
  const totalUseCases = allRedTeamingTechniques.reduce((sum, technique) => sum + (technique.useCases?.length || 0), 0);
  const avgTechniquesPerCategory = Math.round(totalTechniques / totalCategories);
  
  // Brain mascot state
  const [headerExpression, setHeaderExpression] = React.useState<BrainExpression>('fighter');

  // Category distribution data
  const categoryData = Object.entries(redTeamingCategories).map(([key, category], index) => ({
    label: category.name,
    value: category.techniques.length,
    color: [
      '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', 
      '#10b981', '#f97316', '#84cc16', '#ec4899'
    ][index % 8]
  }));

  // Top techniques by complexity and usage (simulated data)
  const popularTechniques = [
    'Prompt Injection', 'Jailbreaking', 'Model Extraction', 'Adversarial Examples', 'Supply Chain Attack'
  ];

  // Complexity distribution
  const complexityStats = {
    low: allRedTeamingTechniques.filter(t => t.complexity === 'low').length,
    medium: allRedTeamingTechniques.filter(t => t.complexity === 'medium').length,
    high: allRedTeamingTechniques.filter(t => t.complexity === 'high').length,
  };

  return (
    <div className="w-full max-w-none p-4 sm:p-6 space-y-6">
      {/* Header */}
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
            onHoverStart={() => setHeaderExpression('angry')}
            onHoverEnd={() => setHeaderExpression('fighter')}
          >
            <BrainMascot
              expression={headerExpression}
              size="medium"
              color="red"
              animate={true}
              skipInitialAnimation={false}
            />
          </motion.div>
        </motion.div>
        <motion.h2 
          className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI Red Teaming Hub
        </motion.h2>
        <p className="text-gray-400 text-sm">
          Comprehensive security testing techniques and defensive strategies for AI systems. Learn to identify vulnerabilities and build more secure AI.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Categories" 
          value={totalCategories} 
          change={15} 
          icon={<BookOpen className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Total Techniques" 
          value={totalTechniques} 
          change={22} 
          icon={<Code className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Attack Vectors" 
          value={totalUseCases} 
          change={18} 
          icon={<Target className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Avg per Category" 
          value={avgTechniquesPerCategory} 
          change={10} 
          icon={<ChartBar className="w-4 h-4" />} 
          trend="up" 
        />
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-red-400" />
            <span>Attack Categories</span>
          </h3>
          <CategoryChart data={categoryData} />
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-orange-400" />
            <span>Complexity Distribution</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Low Complexity
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-700/30 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(complexityStats.low / totalTechniques) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{complexityStats.low}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Medium Complexity
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-700/30 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(complexityStats.medium / totalTechniques) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{complexityStats.medium}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                High Complexity
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-700/30 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(complexityStats.high / totalTechniques) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-6">{complexityStats.high}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Methodology CTA */}
      <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-1">
                AI Security Audit Methodology
              </h3>
              <p className="text-gray-300 text-sm mb-2">
                Comprehensive framework for conducting systematic security audits of AI systems
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span>5 Audit Phases</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckSquare className="w-3 h-3" />
                  <span>Interactive Checklists</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Progress Tracking</span>
                </span>
              </div>
            </div>
          </div>
          <Link 
            href="/ai-red-teaming/audit" 
            className="group bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-xl px-6 py-3 transition-all flex items-center space-x-2"
          >
            <span className="text-red-300 font-medium">Start Audit</span>
            <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span>Security Testing Categories</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(redTeamingCategories).map(([key, category]) => (
            <Link key={key} href={`/ai-red-teaming/${key}`} className="block">
              <div className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <h4 className="font-semibold text-white text-sm">{category.name}</h4>
                  </div>
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
                    {category.techniques.length} techniques
                  </span>
                </div>
                <p className="text-xs text-gray-300 mb-3 line-clamp-2">{category.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Security Testing</span>
                  <span className="text-red-400 hover:text-red-300">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Security Guidelines */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span>Ethical Guidelines</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-400 mb-2">⚠️ Responsible Disclosure</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Only test systems you own or have explicit permission to test</li>
              <li>• Report vulnerabilities through proper channels</li>
              <li>• Follow coordinated vulnerability disclosure practices</li>
              <li>• Respect system availability and user privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-400 mb-2">🛡️ Defensive Focus</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Use techniques to improve system security</li>
              <li>• Document and implement appropriate defenses</li>
              <li>• Share knowledge to strengthen the AI security community</li>
              <li>• Prioritize building safer, more robust AI systems</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-200">
            <Lock className="w-4 h-4 inline mr-2" />
            <strong>Remember:</strong> These techniques are for defensive security testing and research purposes only. 
            Always follow ethical guidelines and legal requirements.
          </p>
        </div>
      </div>
    </div>
  );
}