'use client';

import React from 'react';
import { 
  TrendingDown,
  Package,
  Code2,
  Database,
  Layers,
  Gauge,
  Coins,
  Cpu,
  BarChart2,
  Lightbulb
} from 'lucide-react';

interface TokenUsageSectionProps {
  usage: string[];
}

const getUsageIcon = (usage: string) => {
  const lowerUsage = usage.toLowerCase();
  
  if (lowerUsage.includes('cost') || lowerUsage.includes('estimate')) {
    return Coins;
  } else if (lowerUsage.includes('minimize') || lowerUsage.includes('compact')) {
    return Package;
  } else if (lowerUsage.includes('json') || lowerUsage.includes('format')) {
    return Code2;
  } else if (lowerUsage.includes('cache') || lowerUsage.includes('memoize')) {
    return Database;
  } else if (lowerUsage.includes('batch') || lowerUsage.includes('request')) {
    return Layers;
  } else if (lowerUsage.includes('optimize') || lowerUsage.includes('efficient')) {
    return Gauge;
  } else if (lowerUsage.includes('token') || lowerUsage.includes('usage')) {
    return TrendingDown;
  } else if (lowerUsage.includes('model') || lowerUsage.includes('smaller')) {
    return Cpu;
  }
  return BarChart2;
};

const getUsageCategory = (usage: string) => {
  const lowerUsage = usage.toLowerCase();
  
  if (lowerUsage.includes('cost')) {
    return { label: 'Cost Control', color: 'text-blue-400', bg: 'bg-blue-500/10' };
  } else if (lowerUsage.includes('minimize')) {
    return { label: 'Optimization', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  } else if (lowerUsage.includes('json')) {
    return { label: 'Formatting', color: 'text-purple-400', bg: 'bg-purple-500/10' };
  } else if (lowerUsage.includes('cache')) {
    return { label: 'Performance', color: 'text-orange-400', bg: 'bg-orange-500/10' };
  } else if (lowerUsage.includes('batch')) {
    return { label: 'Efficiency', color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
  }
  return { label: 'Strategy', color: 'text-indigo-400', bg: 'bg-indigo-500/10' };
};

export const TokenUsageSection: React.FC<TokenUsageSectionProps> = ({ usage }) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Token / Resource Usage</h2>
        <p className="text-gray-400 text-sm">Optimize performance and control costs</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-4">
          {usage.map((item, index) => {
            const Icon = getUsageIcon(item);
            const category = getUsageCategory(item);
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-5 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-colors">
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${category.color} ${category.bg} px-2 py-0.5 rounded-full`}>
                        {category.label}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed pr-4">
                      {item}
                    </p>
                  </div>
                  
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5" />
          <div className="relative flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-indigo-400">Pro tip:</span> Monitor token usage patterns across your pipeline stages to identify bottlenecks and optimize resource allocation for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenUsageSection;