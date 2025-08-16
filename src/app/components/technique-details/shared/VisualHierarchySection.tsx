'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertCircle, Lightbulb, Target, Zap } from 'lucide-react';
import { DesignSystem } from '@/lib/design-system';

interface QuickSummaryProps {
  points: string[];
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'amber';
}

export const QuickSummary: React.FC<QuickSummaryProps> = ({ 
  points, 
  icon = <Lightbulb className="w-5 h-5" />,
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 space-y-3`}
    >
      <div className="flex items-center gap-2 text-white mb-4">
        {icon}
        <h3 className="font-semibold">Quick Summary</h3>
      </div>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2"
          >
            <span className="text-blue-400 mt-1">•</span>
            <span className="text-gray-300 text-sm">{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

interface InfoBoxProps {
  type: 'info' | 'warning' | 'tip' | 'important';
  title?: string;
  children: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ type, title, children }) => {
  const config = {
    info: {
      icon: <Info className="w-5 h-5" />,
      color: 'blue',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400'
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'amber',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400'
    },
    tip: {
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'green',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400'
    },
    important: {
      icon: <Zap className="w-5 h-5" />,
      color: 'purple',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400'
    }
  };
  
  const { icon, bg, border, text } = config[type];
  
  return (
    <div className={`${bg} ${border} border rounded-lg p-4`}>
      <div className={`flex items-start gap-3`}>
        <div className={`${text} flex-shrink-0 mt-0.5`}>{icon}</div>
        <div className="flex-1">
          {title && <h4 className={`font-medium ${text} mb-1`}>{title}</h4>}
          <div className="text-gray-300 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface MetricGridProps {
  metrics: {
    label: string;
    value: string | number;
    unit?: string;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }[];
}

export const MetricGrid: React.FC<MetricGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.sm} text-center`}
        >
          {metric.icon && (
            <div className="text-3xl mb-2 text-blue-400">{metric.icon}</div>
          )}
          <div className="text-2xl font-bold text-white">
            {metric.value}
            {metric.unit && <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>}
          </div>
          <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
          {metric.trend && (
            <div className={`text-xs mt-2 ${
              metric.trend === 'up' ? 'text-green-400' :
              metric.trend === 'down' ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

interface TimelineProps {
  events: {
    title: string;
    description: string;
    time?: string;
    status?: 'completed' | 'current' | 'upcoming';
  }[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700/50" />
      <div className="space-y-6">
        {events.map((event, index) => {
          const statusColors = {
            completed: 'bg-green-500',
            current: 'bg-blue-500 ring-4 ring-blue-500/30',
            upcoming: 'bg-gray-600'
          };
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <div className={`w-8 h-8 rounded-full ${statusColors[event.status || 'upcoming']} flex items-center justify-center z-10`}>
                <span className="text-white text-sm font-medium">{index + 1}</span>
              </div>
              <div className="flex-1 -mt-1">
                <h4 className="font-medium text-white">{event.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                {event.time && (
                  <span className="text-xs text-gray-500 mt-2 inline-block">{event.time}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

interface ComparisonTableProps {
  headers: string[];
  rows: {
    label: string;
    values: (string | boolean | React.ReactNode)[];
    highlight?: boolean;
  }[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-gray-400 pb-4">Feature</th>
            {headers.map((header, index) => (
              <th key={index} className="text-center text-sm font-medium text-gray-400 pb-4 px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/50">
          {rows.map((row, rowIndex) => (
            <motion.tr
              key={rowIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIndex * 0.05 }}
              className={row.highlight ? 'bg-blue-500/5' : ''}
            >
              <td className="py-3 text-sm text-gray-300">{row.label}</td>
              {row.values.map((value, colIndex) => (
                <td key={colIndex} className="py-3 px-4 text-center">
                  {typeof value === 'boolean' ? (
                    value ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-gray-600">×</span>
                    )
                  ) : (
                    <span className="text-sm text-gray-400">{value}</span>
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};