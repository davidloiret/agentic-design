'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  Zap, 
  DollarSign, 
  Shield, 
  TrendingUp,
  BarChart3,
  Brain,
  Star,
  Activity
} from 'lucide-react';

interface KPIsSectionProps {
  metrics: string[];
}

const getMetricIcon = (metric: string) => {
  const lowerMetric = metric.toLowerCase();
  
  if (lowerMetric.includes('success rate') || lowerMetric.includes('pass/fail')) {
    return CheckCircle2;
  } else if (lowerMetric.includes('accuracy') || lowerMetric.includes('factuality')) {
    return Target;
  } else if (lowerMetric.includes('latency') || lowerMetric.includes('timing') || lowerMetric.includes('speed')) {
    return Zap;
  } else if (lowerMetric.includes('cost') || lowerMetric.includes('token')) {
    return DollarSign;
  } else if (lowerMetric.includes('error') || lowerMetric.includes('failure') || lowerMetric.includes('containment')) {
    return Shield;
  } else if (lowerMetric.includes('regression') || lowerMetric.includes('delta')) {
    return TrendingUp;
  } else if (lowerMetric.includes('throughput') || lowerMetric.includes('volume')) {
    return BarChart3;
  } else if (lowerMetric.includes('memory') || lowerMetric.includes('retention')) {
    return Brain;
  } else if (lowerMetric.includes('quality') || lowerMetric.includes('score')) {
    return Star;
  }
  return Activity;
};

const getMetricStyle = (metric: string) => {
  const lowerMetric = metric.toLowerCase();
  
  if (lowerMetric.includes('success') || lowerMetric.includes('pass')) {
    return {
      gradient: 'from-emerald-500/5 via-emerald-500/10 to-emerald-500/5',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      border: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/40',
      glow: 'hover:shadow-emerald-500/20'
    };
  } else if (lowerMetric.includes('error') || lowerMetric.includes('failure')) {
    return {
      gradient: 'from-red-500/5 via-red-500/10 to-red-500/5',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500',
      border: 'border-red-500/20',
      hoverBorder: 'hover:border-red-500/40',
      glow: 'hover:shadow-red-500/20'
    };
  } else if (lowerMetric.includes('latency') || lowerMetric.includes('speed')) {
    return {
      gradient: 'from-amber-500/5 via-amber-500/10 to-amber-500/5',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      border: 'border-amber-500/20',
      hoverBorder: 'hover:border-amber-500/40',
      glow: 'hover:shadow-amber-500/20'
    };
  } else if (lowerMetric.includes('cost')) {
    return {
      gradient: 'from-blue-500/5 via-blue-500/10 to-blue-500/5',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      border: 'border-blue-500/20',
      hoverBorder: 'hover:border-blue-500/40',
      glow: 'hover:shadow-blue-500/20'
    };
  }
  return {
    gradient: 'from-violet-500/5 via-violet-500/10 to-violet-500/5',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    border: 'border-violet-500/20',
    hoverBorder: 'hover:border-violet-500/40',
    glow: 'hover:shadow-violet-500/20'
  };
};

export const KPIsSection: React.FC<KPIsSectionProps> = ({ metrics }) => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">KPIs / Success Metrics</h2>
        <p className="text-gray-400 text-sm">Track performance and optimize your implementation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const parts = metric.split(':');
          const title = parts[0].trim();
          const description = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
          const Icon = getMetricIcon(metric);
          const style = getMetricStyle(metric);
          
          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${style.hoverBorder} ${style.glow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50`} />
              
              <div className={`relative p-6 border ${style.border} rounded-2xl bg-gray-900/50 backdrop-blur-sm`}>
                <div className="flex items-start gap-4">
                  <div className={`${style.iconBg} p-3 rounded-xl backdrop-blur-sm`}>
                    <Icon className={`w-6 h-6 ${style.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-white text-base">{title}</h3>
                    {description && (
                      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                    )}
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 opacity-10">
                  <Icon className="w-32 h-32" strokeWidth={0.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KPIsSection;