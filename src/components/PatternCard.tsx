'use client';

import React from 'react';
import { PatternCard as PatternCardType, PatternRarity } from '@/types/pattern-cards';
import { motion } from 'framer-motion';

interface PatternCardProps {
  pattern: PatternCardType;
  isInteractive?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const rarityColors: Record<PatternRarity, string> = {
  common: 'from-gray-400 to-gray-600',
  uncommon: 'from-green-400 to-green-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500'
};

const rarityGlow: Record<PatternRarity, string> = {
  common: '',
  uncommon: 'shadow-green-500/30',
  rare: 'shadow-blue-500/40',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/60'
};

const typeIcons: Record<string, string> = {
  behavioral: '🧠',
  structural: '🏗️',
  creational: '✨',
  cognitive: '💭',
  architectural: '🏛️'
};

const elementColors: Record<string, string> = {
  logic: 'bg-blue-500',
  memory: 'bg-purple-500',
  flow: 'bg-green-500',
  communication: 'bg-yellow-500',
  computation: 'bg-red-500'
};

export const PatternCard: React.FC<PatternCardProps> = ({ 
  pattern, 
  isInteractive = true, 
  onClick,
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-48 h-64',
    medium: 'w-64 h-80',
    large: 'w-80 h-96'
  };

  const statBarWidth = (value: number) => `${Math.min(100, Math.max(0, value))}%`;

  return (
    <motion.div
      className={`${sizeClasses[size]} relative cursor-pointer transform-gpu`}
      whileHover={isInteractive ? { scale: 1.05, rotateY: 5 } : {}}
      whileTap={isInteractive ? { scale: 0.95 } : {}}
      onClick={onClick}
      initial={{ rotateY: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`
        w-full h-full rounded-xl overflow-hidden
        bg-gradient-to-br ${rarityColors[pattern.rarity]}
        shadow-2xl ${rarityGlow[pattern.rarity]}
        border-2 border-white/20
        relative
      `}>
        {/* Card Header */}
        <div className="absolute top-0 left-0 right-0 p-3 bg-black/30 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{pattern.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{typeIcons[pattern.type]}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${elementColors[pattern.element]}`}>
                  {pattern.element}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-300 text-sm font-bold">Lv.{pattern.level}</div>
              <div className="text-xs text-white/70">{pattern.rarity}</div>
            </div>
          </div>
        </div>

        {/* Card Image Area */}
        <div className="absolute top-20 left-4 right-4 h-24 bg-black/20 rounded-lg flex items-center justify-center">
          <div className="text-4xl opacity-50">
            {pattern.image || typeIcons[pattern.type]}
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-24 left-4 right-4 space-y-1">
          {Object.entries(pattern.stats).slice(0, 3).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-2">
              <span className="text-xs text-white/80 w-16 capitalize">{stat}</span>
              <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-white/80 to-white/40 transition-all duration-300"
                  style={{ width: statBarWidth(value) }}
                />
              </div>
              <span className="text-xs text-white/80 w-8 text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Abilities Section */}
        <div className="absolute bottom-2 left-4 right-4">
          <div className="bg-black/30 rounded-lg p-2">
            {pattern.abilities.slice(0, 2).map((ability, idx) => (
              <div key={idx} className="text-xs text-white/90">
                <span className="font-semibold">{ability.name}:</span>
                <span className="ml-1 text-white/70">{ability.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership/Discovery Status */}
        {!pattern.owned && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-xl font-bold">
                {pattern.discovered ? 'Not Owned' : 'Undiscovered'}
              </div>
              {pattern.discovered && (
                <div className="text-white/70 text-sm mt-1">Click to learn more</div>
              )}
            </div>
          </div>
        )}

        {/* Experience Bar */}
        {pattern.owned && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
              style={{ width: `${(pattern.experience / pattern.maxExperience) * 100}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};