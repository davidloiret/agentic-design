'use client';

import React, { useState } from 'react';
import { PatternCard } from './PatternCard';
import { PatternCard as PatternCardType, PatternRarity, PatternType } from '@/types/pattern-cards';
import { motion, AnimatePresence } from 'framer-motion';

interface PatternCollectionProps {
  patterns: PatternCardType[];
  onPatternClick?: (pattern: PatternCardType) => void;
}

export const PatternCollection: React.FC<PatternCollectionProps> = ({ 
  patterns, 
  onPatternClick 
}) => {
  const [selectedRarity, setSelectedRarity] = useState<PatternRarity | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PatternType | 'all'>('all');
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'rarity'>('name');

  const rarities: (PatternRarity | 'all')[] = ['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'];
  const types: (PatternType | 'all')[] = ['all', 'behavioral', 'structural', 'creational', 'cognitive', 'architectural'];

  const filteredPatterns = patterns
    .filter(p => selectedRarity === 'all' || p.rarity === selectedRarity)
    .filter(p => selectedType === 'all' || p.type === selectedType)
    .filter(p => !showOnlyOwned || p.owned)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'level':
          return b.level - a.level;
        case 'rarity':
          const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        default:
          return 0;
      }
    });

  const stats = {
    total: patterns.length,
    owned: patterns.filter(p => p.owned).length,
    discovered: patterns.filter(p => p.discovered).length
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Pattern Collection</h1>
          <div className="flex gap-6 text-white/80">
            <div>
              <span className="text-2xl font-bold text-white">{stats.owned}</span>
              <span className="ml-2">Owned</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.discovered}</span>
              <span className="ml-2">Discovered</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">{stats.total}</span>
              <span className="ml-2">Total</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Rarity Filter */}
          <div className="flex gap-2 items-center">
            <span className="text-white/70 mr-4">Rarity:</span>
            {rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedRarity === rarity 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 items-center">
            <span className="text-white/70 mr-4">Type:</span>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedType === type 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={showOnlyOwned}
                onChange={(e) => setShowOnlyOwned(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-800 border-gray-600"
              />
              Show only owned
            </label>

            <div className="flex items-center gap-2">
              <span className="text-white/70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-700"
              >
                <option value="name">Name</option>
                <option value="level">Level</option>
                <option value="rarity">Rarity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pattern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <PatternCard
                  pattern={pattern}
                  size="small"
                  onClick={() => onPatternClick?.(pattern)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPatterns.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No patterns found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};