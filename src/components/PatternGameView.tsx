'use client';

import React, { useState, useEffect } from 'react';
import { PatternCollection } from './PatternCollection';
import { PatternDeckBuilder } from './PatternDeckBuilder';
import { PatternCard as PatternCardType, PatternDeck } from '@/types/pattern-cards';
import { patternCardsData } from '@/data/pattern-cards-data';
import { motion } from 'framer-motion';
import { Sparkles, Package, Layers, Brain, TrendingUp, Activity } from 'lucide-react';

type ViewMode = 'collection' | 'decks' | 'discover';

// Metric Card Component matching the app style
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
        <div className="text-blue-400">{icon}</div>
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

export const PatternGameView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('collection');
  const [patterns, setPatterns] = useState<PatternCardType[]>(patternCardsData);
  const [decks, setDecks] = useState<PatternDeck[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<PatternCardType | null>(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedPatterns = localStorage.getItem('patternCards');
    const savedDecks = localStorage.getItem('patternDecks');
    
    if (savedPatterns) {
      setPatterns(JSON.parse(savedPatterns));
    }
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('patternCards', JSON.stringify(patterns));
  }, [patterns]);

  useEffect(() => {
    localStorage.setItem('patternDecks', JSON.stringify(decks));
  }, [decks]);

  const handlePatternClick = (pattern: PatternCardType) => {
    setSelectedPattern(pattern);
  };

  const handleSaveDeck = (deck: PatternDeck) => {
    const existingIndex = decks.findIndex(d => d.id === deck.id);
    if (existingIndex >= 0) {
      const newDecks = [...decks];
      newDecks[existingIndex] = deck;
      setDecks(newDecks);
    } else {
      setDecks([...decks, deck]);
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks(decks.filter(d => d.id !== deckId));
  };

  const handleDiscoverPattern = (patternId: string) => {
    setPatterns(patterns.map(p => 
      p.id === patternId ? { ...p, discovered: true } : p
    ));
  };

  const stats = {
    totalPatterns: patterns.length,
    discoveredPatterns: patterns.filter(p => p.discovered).length,
    ownedPatterns: patterns.filter(p => p.owned).length,
    totalDecks: decks.length,
    averageLevel: Math.round(patterns.filter(p => p.owned).reduce((sum, p) => sum + p.level, 0) / (patterns.filter(p => p.owned).length || 1))
  };

  const getTabClasses = (tabId: ViewMode, isActive: boolean) => {
    const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2';
    
    if (!isActive) {
      return `${baseClasses} bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 border border-gray-700/50`;
    }

    const colorMap = {
      'collection': 'bg-blue-500 text-white',
      'decks': 'bg-purple-500 text-white',
      'discover': 'bg-amber-500 text-white'
    };

    return `${baseClasses} ${colorMap[tabId]}`;
  };

  return (
    <div className="w-full max-w-none space-y-6">
      {/* Header */}
      <div className="text-center p-6">
        <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Pattern Cards Collection
        </h1>
        <p className="text-gray-400">
          Collect, master, and organize AI design patterns in a gamified experience
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-6">
        <MetricCard 
          title="Total Patterns" 
          value={stats.totalPatterns} 
          icon={<Package className="w-4 h-4" />} 
        />
        <MetricCard 
          title="Discovered" 
          value={stats.discoveredPatterns} 
          change={Math.round((stats.discoveredPatterns / stats.totalPatterns) * 100)} 
          icon={<Sparkles className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Owned" 
          value={stats.ownedPatterns} 
          change={Math.round((stats.ownedPatterns / stats.totalPatterns) * 100)} 
          icon={<TrendingUp className="w-4 h-4" />} 
          trend="up" 
        />
        <MetricCard 
          title="Decks Created" 
          value={stats.totalDecks} 
          icon={<Layers className="w-4 h-4" />} 
        />
        <MetricCard 
          title="Average Level" 
          value={stats.averageLevel} 
          icon={<Activity className="w-4 h-4" />} 
          trend="up" 
        />
      </div>

      {/* View Mode Tabs */}
      <div className="flex justify-center gap-3 px-6">
        <button
          onClick={() => setViewMode('collection')}
          className={getTabClasses('collection', viewMode === 'collection')}
        >
          <Package className="w-5 h-5" />
          Collection
        </button>
        <button
          onClick={() => setViewMode('decks')}
          className={getTabClasses('decks', viewMode === 'decks')}
        >
          <Layers className="w-5 h-5" />
          Deck Builder
        </button>
        <button
          onClick={() => setViewMode('discover')}
          className={getTabClasses('discover', viewMode === 'discover')}
        >
          <Sparkles className="w-5 h-5" />
          Discover
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-800/20 rounded-xl">
        {viewMode === 'collection' && (
          <PatternCollection 
            patterns={patterns.filter(p => p.discovered)} 
            onPatternClick={handlePatternClick}
          />
        )}
        
        {viewMode === 'decks' && (
          <PatternDeckBuilder
            availablePatterns={patterns}
            decks={decks}
            onSaveDeck={handleSaveDeck}
            onDeleteDeck={handleDeleteDeck}
          />
        )}
        
        {viewMode === 'discover' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Discover New Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patterns.filter(p => !p.discovered).map(pattern => (
                <motion.div
                  key={pattern.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer hover:bg-gray-800/50 transition-all"
                  onClick={() => handleDiscoverPattern(pattern.id)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">❓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Unknown Pattern</h3>
                    <p className="text-gray-400 text-sm mb-4">Click to discover this {pattern.rarity} pattern</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white text-sm font-medium transition-colors">
                      <Sparkles className="w-4 h-4" />
                      Discover
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {patterns.filter(p => !p.discovered).length === 0 && (
              <div className="text-center py-20">
                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">All patterns have been discovered!</p>
                <p className="text-gray-500 text-sm mt-2">Check your collection to view all patterns</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPattern(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 border border-gray-700/50 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">{selectedPattern.name}</h2>
            <p className="text-gray-300 mb-6">{selectedPattern.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Stats</h3>
                {Object.entries(selectedPattern.stats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 capitalize">{stat}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Abilities</h3>
                {selectedPattern.abilities.map((ability, idx) => (
                  <div key={idx} className="mb-3">
                    <p className="text-sm font-medium text-blue-400">{ability.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedPattern.synergies && selectedPattern.synergies.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Synergies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPattern.synergies.map(synergy => (
                    <span key={synergy} className="px-3 py-1 bg-green-900/30 border border-green-700/50 text-green-400 rounded-lg text-sm">
                      {synergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedPattern(null)}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};