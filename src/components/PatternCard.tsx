'use client';

import React from 'react';
import { PatternCard as PatternCardType, PatternRarity } from '@/types/pattern-cards';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Star, Lock, HelpCircle } from 'lucide-react';

interface PatternCardProps {
  pattern: PatternCardType;
  isInteractive?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const rarityColors: Record<PatternRarity, {
  bg: string;
  border: string;
  text: string;
  icon: string;
}> = {
  common: {
    bg: 'bg-gray-800/30',
    border: 'border-gray-700/50',
    text: 'text-gray-400',
    icon: 'text-gray-500'
  },
  uncommon: {
    bg: 'bg-green-900/20',
    border: 'border-green-700/50',
    text: 'text-green-400',
    icon: 'text-green-500'
  },
  rare: {
    bg: 'bg-blue-900/20',
    border: 'border-blue-700/50',
    text: 'text-blue-400',
    icon: 'text-blue-500'
  },
  epic: {
    bg: 'bg-purple-900/20',
    border: 'border-purple-700/50',
    text: 'text-purple-400',
    icon: 'text-purple-500'
  },
  legendary: {
    bg: 'bg-amber-900/20',
    border: 'border-amber-700/50',
    text: 'text-amber-400',
    icon: 'text-amber-500'
  }
};

const typeIcons: Record<string, React.ComponentType<any>> = {
  behavioral: Brain,
  structural: Shield,
  creational: Star,
  cognitive: Brain,
  architectural: Shield
};

export const PatternCard: React.FC<PatternCardProps> = ({ 
  pattern, 
  isInteractive = true, 
  onClick,
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-72',
    medium: 'w-80',
    large: 'w-96'
  };

  const rarity = rarityColors[pattern.rarity];
  const TypeIcon = typeIcons[pattern.type] || Brain;

  return (
    <motion.div
      className={`${sizeClasses[size]} cursor-pointer`}
      whileHover={isInteractive ? { y: -4 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className={`
        ${rarity.bg} backdrop-blur-sm ${rarity.border} border rounded-xl
        hover:bg-gray-800/50 transition-all duration-200
        overflow-hidden h-full
      `}>
        {/* Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TypeIcon className={`w-5 h-5 ${rarity.icon}`} />
                <span className={`text-xs font-medium ${rarity.text} uppercase tracking-wider`}>
                  {pattern.rarity}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {pattern.name}
              </h3>
              <p className="text-sm text-gray-400 capitalize">
                {pattern.type} • {pattern.element}
              </p>
            </div>
            <div className="text-right">
              <div className="text-amber-400 font-bold text-sm">Lv.{pattern.level}</div>
              {pattern.owned && (
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((pattern.experience / pattern.maxExperience) * 100)}% XP
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 line-clamp-2 mb-3">
            {pattern.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {Object.entries(pattern.stats).slice(0, 3).map(([stat, value]) => (
              <div key={stat} className="text-center">
                <div className="text-xs text-gray-500 capitalize mb-1">{stat}</div>
                <div className="relative">
                  <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${rarity.text} opacity-60`}
                      style={{ 
                        background: `linear-gradient(to right, currentColor, currentColor)`,
                        width: `${value}%` 
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-300 font-mono mt-1">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities Section */}
        <div className="px-5 pb-5">
          <div className="space-y-2">
            {pattern.abilities.slice(0, 2).map((ability, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-lg p-2.5 border border-gray-700/30">
                <div className="flex items-start gap-2">
                  <Zap className={`w-3 h-3 ${rarity.icon} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-medium ${rarity.text} mb-0.5`}>
                      {ability.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {ability.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-5 py-3 bg-gray-900/20 border-t border-gray-700/30">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {pattern.synergies?.slice(0, 2).map(synergy => (
                <span key={synergy} className="text-xs px-2 py-0.5 bg-gray-800/50 rounded text-gray-400">
                  {synergy}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {pattern.owned ? (
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : pattern.discovered ? (
                <Lock className="w-4 h-4 text-gray-500" />
              ) : (
                <HelpCircle className="w-4 h-4 text-gray-600" />
              )}
            </div>
          </div>
        </div>

        {/* Lock overlay for unowned cards */}
        {!pattern.owned && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-6">
              <div className="mb-3">
                {pattern.discovered ? (
                  <Lock className="w-8 h-8 text-gray-400 mx-auto" />
                ) : (
                  <HelpCircle className="w-8 h-8 text-gray-500 mx-auto" />
                )}
              </div>
              <p className="text-white font-medium text-sm">
                {pattern.discovered ? 'Locked' : 'Undiscovered'}
              </p>
              {pattern.discovered && (
                <p className="text-gray-400 text-xs mt-1">
                  Complete more patterns to unlock
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};