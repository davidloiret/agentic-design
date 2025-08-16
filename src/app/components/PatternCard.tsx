'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  Clock, 
  Users, 
  ChevronRight, 
  Sparkles,
  BarChart,
  Play,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { DesignSystem, getComplexityColor, getCategoryColor } from '@/lib/design-system';

interface PatternCardProps {
  pattern: {
    id: string;
    name: string;
    description: string;
    category: string;
    complexity: 'low' | 'medium' | 'high' | 'expert';
    estimatedTime?: number; // in minutes
    userCount?: number;
    completionRate?: number; // 0-100
    icon?: string;
    tags?: string[];
  };
  index?: number;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  progress?: number; // 0-100
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  index = 0,
  onBookmark,
  isBookmarked = false,
  progress = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const complexityColor = getComplexityColor(pattern.complexity);
  const categoryColor = getCategoryColor(pattern.category);
  
  // Map complexity to visual representation
  const complexityLevel = {
    low: 25,
    medium: 50,
    high: 75,
    expert: 100
  }[pattern.complexity] || 50;
  
  const formatUserCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.hover} ${DesignSystem.components.card.padding.md} h-full flex flex-col`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColor.light} ${categoryColor.border} border flex items-center justify-center text-2xl`}>
              {pattern.icon || '🔮'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-lg truncate">
                {pattern.name}
              </h3>
              <p className={`text-sm ${categoryColor.text} capitalize`}>
                {pattern.category.replace('-', ' ')}
              </p>
            </div>
          </div>
          
          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookmark?.(pattern.id);
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {pattern.description}
        </p>
        
        {/* Progress Bar (if applicable) */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
        
        {/* Complexity Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Complexity</span>
            <span className={complexityColor.text}>{pattern.complexity}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  (i + 1) * 25 <= complexityLevel
                    ? `bg-gradient-to-r ${complexityColor.background}`
                    : 'bg-gray-700/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          {pattern.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{pattern.estimatedTime} min</span>
            </div>
          )}
          {pattern.userCount && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{formatUserCount(pattern.userCount)}</span>
            </div>
          )}
          {pattern.completionRate !== undefined && (
            <div className="flex items-center gap-1">
              <BarChart className="w-3.5 h-3.5" />
              <span>{pattern.completionRate}%</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        {pattern.tags && pattern.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {pattern.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {pattern.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-500 text-xs">
                +{pattern.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/patterns/${pattern.category}/${pattern.id}`}
            className={`flex-1 ${DesignSystem.components.button.base} ${DesignSystem.components.button.primary} ${DesignSystem.components.button.sizes.sm}`}
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </Link>
          <button
            className={`${DesignSystem.components.button.base} ${DesignSystem.components.button.secondary} ${DesignSystem.components.button.sizes.sm}`}
            onClick={(e) => {
              e.preventDefault();
              // Preview functionality
            }}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
        
        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{
            background: isHovered 
              ? `radial-gradient(circle at center, ${complexityColor.primary}10 0%, transparent 70%)`
              : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* New/Featured Badge */}
        {Math.random() > 0.8 && (
          <div className="absolute -top-2 -right-2">
            <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
              New
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Skeleton loader for pattern cards
export const PatternCardSkeleton: React.FC = () => {
  return (
    <div className={`${DesignSystem.components.card.base} ${DesignSystem.components.card.padding.md} animate-pulse`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-gray-700/50 rounded-xl" />
          <div className="flex-1">
            <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-700/50 rounded w-1/2" />
          </div>
        </div>
        <div className="w-9 h-9 bg-gray-700/50 rounded-lg" />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-700/50 rounded" />
        <div className="h-4 bg-gray-700/50 rounded w-5/6" />
      </div>
      
      <div className="h-2 bg-gray-700/50 rounded mb-4" />
      
      <div className="flex gap-2">
        <div className="h-9 bg-gray-700/50 rounded-lg flex-1" />
        <div className="h-9 bg-gray-700/50 rounded-lg w-20" />
      </div>
    </div>
  );
};