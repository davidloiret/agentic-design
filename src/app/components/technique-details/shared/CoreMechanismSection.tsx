'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface CoreMechanismSectionProps {
  description: string;
  subtitle?: string;
  stats?: Array<{
    icon: string | React.ReactNode;
    label: string;
    value: string;
    unit?: string;
    tooltip?: string;
  }>;
}

export const CoreMechanismSection: React.FC<CoreMechanismSectionProps> = ({ 
  description,
  subtitle,
  stats = []
}) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Core Mechanism</h2>
        {subtitle && (
          <p className="text-gray-400 text-sm">{subtitle}</p>
        )}
      </div>
      
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/60" />
        
        <div className="relative p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-gray-100 text-base leading-relaxed flex-1">
              {description}
            </p>
          </div>
          
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-gray-800/70"
                  role="group"
                  aria-label={`${stat.label}: ${stat.value}${stat.unit || ''}`}
                  title={stat.tooltip}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  
                  <div className="relative text-center">
                    <div className="text-2xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {stat.icon}
                    </div>
                    <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                      {stat.unit && <span className="text-sm text-gray-400 ml-1">{stat.unit}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoreMechanismSection;