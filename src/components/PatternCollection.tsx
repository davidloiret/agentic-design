'use client';

import React, { useState } from 'react';
import { PatternCard } from './PatternCard';
import { PatternCard as PatternCardType, PatternRarity, PatternType } from '@/types/pattern-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, TrendingUp, Package, Search } from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

interface PatternCollectionProps {
  patterns: PatternCardType[];
  onPatternClick?: (pattern: PatternCardType) => void;
}

export const PatternCollection: React.FC<PatternCollectionProps> = ({
  patterns,
  onPatternClick
}) => {
  const { trackEvent } = usePlausible();
  const [selectedRarity, setSelectedRarity] = useState<PatternRarity | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PatternType | 'all'>('all');
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'rarity'>('name');
  const [searchQuery, setSearchQuery] = useState('');

  const rarities: (PatternRarity | 'all')[] = ['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'];
  const types: (PatternType | 'all')[] = ['all', 'behavioral', 'structural', 'creational', 'cognitive', 'architectural'];

  const filteredPatterns = patterns
    .filter(p => selectedRarity === 'all' || p.rarity === selectedRarity)
    .filter(p => selectedType === 'all' || p.type === selectedType)
    .filter(p => !showOnlyOwned || p.owned)
    .filter(p => searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  const getButtonClasses = (isActive: boolean, colorClass: string) => {
    return `
      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
      ${isActive 
        ? `${colorClass} text-white` 
        : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50'
      }
    `;
  };

  const rarityColorMap: Record<PatternRarity | 'all', string> = {
    'all': 'bg-blue-500',
    'common': 'bg-gray-500',
    'uncommon': 'bg-green-500',
    'rare': 'bg-blue-500',
    'epic': 'bg-purple-500',
    'legendary': 'bg-amber-500'
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Patterns</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Owned</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.owned}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div className="mt-2">
            <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${(stats.owned / stats.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Discovered</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.discovered}</p>
            </div>
            <Search className="w-8 h-8 text-purple-400" />
          </div>
          <div className="mt-2">
            <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-400 transition-all duration-500"
                style={{ width: `${(stats.discovered / stats.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-sm font-semibold text-white">Filters</h3>
        </div>
        
        {/* Rarity Filter */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Rarity</p>
          <div className="flex flex-wrap gap-2">
            {rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={getButtonClasses(
                  selectedRarity === rarity,
                  rarityColorMap[rarity]
                )}
              >
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Type</p>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={getButtonClasses(
                  selectedType === type,
                  'bg-blue-500'
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyOwned}
              onChange={(e) => setShowOnlyOwned(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-400">Show only owned</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
            <option value="rarity">Sort by Rarity</option>
          </select>
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        <AnimatePresence mode="popLayout">
          {filteredPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                layout: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              <PatternCard
                pattern={pattern}
                size="small"
                onClick={() => {
                  trackEvent('Pattern Card Click', {
                    pattern_name: pattern.name,
                    pattern_type: pattern.type,
                    pattern_rarity: pattern.rarity,
                    pattern_level: pattern.level,
                    owned: pattern.owned
                  });
                  onPatternClick?.(pattern);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPatterns.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">No patterns found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};