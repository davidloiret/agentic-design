'use client';

import React, { useState, useEffect } from 'react';
import { PatternCollection } from './PatternCollection';
import { PatternDeckBuilder } from './PatternDeckBuilder';
import { PatternCard as PatternCardType, PatternDeck, PatternCollection as Collection } from '@/types/pattern-cards';
import { patternCardsData } from '@/data/pattern-cards-data';
import { motion } from 'framer-motion';
import { Sparkles, Package, Layers } from 'lucide-react';

type ViewMode = 'collection' | 'decks' | 'discover';

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
    totalDecks: decks.length
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Pattern Cards Collection</h1>
              <div className="flex gap-6 text-sm text-gray-400">
                <span>Discovered: {stats.discoveredPatterns}/{stats.totalPatterns}</span>
                <span>Owned: {stats.ownedPatterns}</span>
                <span>Decks: {stats.totalDecks}</span>
              </div>
            </div>
            
            {/* View Mode Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('collection')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${viewMode === 'collection' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                <Package className="w-5 h-5" />
                Collection
              </button>
              <button
                onClick={() => setViewMode('decks')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${viewMode === 'decks' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                <Layers className="w-5 h-5" />
                Deck Builder
              </button>
              <button
                onClick={() => setViewMode('discover')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
                  ${viewMode === 'discover' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                <Sparkles className="w-5 h-5" />
                Discover
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
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
          <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Discover New Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patterns.filter(p => !p.discovered).map(pattern => (
                <motion.div
                  key={pattern.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-6 cursor-pointer"
                  onClick={() => handleDiscoverPattern(pattern.id)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">❓</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Unknown Pattern</h3>
                    <p className="text-gray-400 text-sm mb-4">Click to discover this pattern</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                      Discover
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {patterns.filter(p => !p.discovered).length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">All patterns have been discovered!</p>
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
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPattern(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">{selectedPattern.name}</h2>
            <p className="text-gray-300 mb-6">{selectedPattern.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Stats</h3>
                {Object.entries(selectedPattern.stats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 capitalize">{stat}:</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Abilities</h3>
                {selectedPattern.abilities.map((ability, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm font-medium text-white">{ability.name}</p>
                    <p className="text-xs text-gray-400">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedPattern.synergies && selectedPattern.synergies.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-white mb-2">Synergies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPattern.synergies.map(synergy => (
                    <span key={synergy} className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                      {synergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedPattern(null)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};