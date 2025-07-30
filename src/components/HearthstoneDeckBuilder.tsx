'use client';

import React, { useState } from 'react';
import { PatternCard as PatternCardType, PatternDeck, PatternRarity } from '@/types/pattern-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Copy, Search, Filter } from 'lucide-react';

interface HearthstoneDeckBuilderProps {
  availablePatterns: PatternCardType[];
  decks: PatternDeck[];
  onSaveDeck: (deck: PatternDeck) => void;
  onDeleteDeck: (deckId: string) => void;
}

interface DeckCard {
  patternId: string;
  count: number;
}

const DECK_SIZE = 30;
const MAX_COPIES = 2;
const MAX_LEGENDARY_COPIES = 1;

export const HearthstoneDeckBuilder: React.FC<HearthstoneDeckBuilderProps> = ({
  availablePatterns,
  decks,
  onSaveDeck,
  onDeleteDeck
}) => {
  const [selectedDeck, setSelectedDeck] = useState<PatternDeck | null>(null);
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [deckCards, setDeckCards] = useState<DeckCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<PatternRarity | 'all'>('all');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const getTotalCards = () => {
    return deckCards.reduce((total, card) => total + card.count, 0);
  };

  const getCardCount = (patternId: string) => {
    const card = deckCards.find(c => c.patternId === patternId);
    return card ? card.count : 0;
  };

  const canAddCard = (pattern: PatternCardType) => {
    if (getTotalCards() >= DECK_SIZE) return false;
    
    const currentCount = getCardCount(pattern.id);
    const maxAllowed = pattern.rarity === 'legendary' ? MAX_LEGENDARY_COPIES : MAX_COPIES;
    
    return currentCount < maxAllowed;
  };

  const handleAddCard = (pattern: PatternCardType) => {
    if (!canAddCard(pattern)) return;

    const existingCard = deckCards.find(c => c.patternId === pattern.id);
    
    if (existingCard) {
      setDeckCards(deckCards.map(c => 
        c.patternId === pattern.id 
          ? { ...c, count: c.count + 1 }
          : c
      ));
    } else {
      setDeckCards([...deckCards, { patternId: pattern.id, count: 1 }]);
    }
  };

  const handleRemoveCard = (patternId: string) => {
    const card = deckCards.find(c => c.patternId === patternId);
    if (!card) return;

    if (card.count > 1) {
      setDeckCards(deckCards.map(c => 
        c.patternId === patternId 
          ? { ...c, count: c.count - 1 }
          : c
      ));
    } else {
      setDeckCards(deckCards.filter(c => c.patternId !== patternId));
    }
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedDeck(null);
    setDeckCards([]);
    setDeckName('New Deck');
    setDeckDescription('');
  };

  const handleSelectDeck = (deck: PatternDeck) => {
    setSelectedDeck(deck);
    setDeckName(deck.name);
    setDeckDescription(deck.description);
    
    // Convert deck cards to DeckCard format
    const cardCounts: { [key: string]: number } = {};
    deck.cards.forEach(cardId => {
      cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
    });
    
    setDeckCards(Object.entries(cardCounts).map(([patternId, count]) => ({
      patternId,
      count
    })));
    
    setIsCreatingNew(false);
  };

  const handleSaveDeck = () => {
    if (!deckName.trim() || getTotalCards() !== DECK_SIZE) return;

    // Convert DeckCard format to array of card IDs
    const cards: string[] = [];
    deckCards.forEach(({ patternId, count }) => {
      for (let i = 0; i < count; i++) {
        cards.push(patternId);
      }
    });

    const deck: PatternDeck = {
      id: selectedDeck?.id || `deck-${Date.now()}`,
      name: deckName,
      description: deckDescription,
      cards,
      maxSize: DECK_SIZE,
      createdAt: selectedDeck?.createdAt || new Date(),
      lastModified: new Date()
    };

    onSaveDeck(deck);
    setSelectedDeck(deck);
    setIsCreatingNew(false);
  };

  const handleCopyDeck = (deck: PatternDeck) => {
    const copiedDeck: PatternDeck = {
      ...deck,
      id: `deck-${Date.now()}`,
      name: `${deck.name} (Copy)`,
      createdAt: new Date(),
      lastModified: new Date()
    };
    
    onSaveDeck(copiedDeck);
    handleSelectDeck(copiedDeck);
  };

  const filteredPatterns = availablePatterns
    .filter(p => p.owned)
    .filter(p => filterRarity === 'all' || p.rarity === filterRarity)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedDeckCards = [...deckCards].sort((a, b) => {
    const patternA = availablePatterns.find(p => p.id === a.patternId);
    const patternB = availablePatterns.find(p => p.id === b.patternId);
    if (!patternA || !patternB) return 0;
    
    // Sort by cost (derived from complexity)
    const costA = Math.ceil(patternA.stats.complexity / 15);
    const costB = Math.ceil(patternB.stats.complexity / 15);
    
    return costA - costB;
  });

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Panel - Deck List */}
      <div className="w-80 bg-gray-800 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Decks</h2>
          <button
            onClick={handleCreateNew}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-3">
          {decks.map(deck => (
            <motion.div
              key={deck.id}
              whileHover={{ scale: 1.02 }}
              className={`
                p-4 rounded-lg cursor-pointer transition-all
                ${selectedDeck?.id === deck.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }
              `}
              onClick={() => handleSelectDeck(deck)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{deck.name}</h3>
                  <p className="text-sm opacity-70 mt-1">{deck.description || 'No description'}</p>
                  <p className="text-xs mt-2">{deck.cards.length}/{DECK_SIZE} cards</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyDeck(deck);
                    }}
                    className="p-1.5 hover:bg-gray-600 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this deck?')) {
                        onDeleteDeck(deck.id);
                        if (selectedDeck?.id === deck.id) {
                          setSelectedDeck(null);
                          setDeckCards([]);
                        }
                      }
                    }}
                    className="p-1.5 hover:bg-red-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Current Deck */}
      <div className="flex-1 bg-gray-850 p-6 overflow-y-auto">
        {(selectedDeck || isCreatingNew) ? (
          <>
            <div className="mb-6">
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="text-3xl font-bold bg-transparent text-white border-b-2 border-gray-700 focus:border-blue-500 outline-none pb-2 mb-4 w-full"
              />
              <textarea
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
                placeholder="Deck description..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg resize-none h-20"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-2xl font-bold">{getTotalCards()}</span>
                <span className="text-gray-400">/{DECK_SIZE} cards</span>
              </div>
              <button
                onClick={handleSaveDeck}
                disabled={getTotalCards() !== DECK_SIZE}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Deck
              </button>
            </div>

            <div className="space-y-2">
              {sortedDeckCards.map(({ patternId, count }) => {
                const pattern = availablePatterns.find(p => p.id === patternId);
                if (!pattern) return null;

                const cost = Math.ceil(pattern.stats.complexity / 15);
                
                return (
                  <motion.div
                    key={patternId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                      {cost}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{pattern.name}</span>
                        {count > 1 && (
                          <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                            x{count}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {pattern.rarity} • {pattern.type}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveCard(patternId)}
                      className="p-2 hover:bg-red-600 rounded transition-colors text-gray-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {getTotalCards() < DECK_SIZE && (
              <div className="mt-8 text-center text-gray-500">
                Add {DECK_SIZE - getTotalCards()} more cards to complete your deck
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-xl mb-4">Select a deck to edit</p>
              <p>or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Card Collection */}
      <div className="w-96 bg-gray-800 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">Collection</h3>
        
        {/* Search and Filter */}
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cards..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'] as const).map(rarity => (
              <button
                key={rarity}
                onClick={() => setFilterRarity(rarity)}
                className={`
                  px-3 py-1 rounded text-sm capitalize transition-colors
                  ${filterRarity === rarity 
                    ? getRarityColor(rarity) 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
              >
                {rarity}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredPatterns.map(pattern => {
            const cost = Math.ceil(pattern.stats.complexity / 15);
            const cardCount = getCardCount(pattern.id);
            const canAdd = canAddCard(pattern);
            
            return (
              <motion.div
                key={pattern.id}
                whileHover={{ scale: canAdd ? 1.05 : 1 }}
                onClick={() => canAdd && handleAddCard(pattern)}
                className={`
                  relative p-3 rounded-lg border-2 transition-all
                  ${canAdd 
                    ? 'cursor-pointer hover:shadow-lg' 
                    : 'opacity-50 cursor-not-allowed'
                  }
                  ${getRarityBorder(pattern.rarity)}
                `}
                style={{
                  background: `linear-gradient(135deg, ${getRarityGradientColors(pattern.rarity)})`
                }}
              >
                <div className="absolute top-1 left-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {cost}
                </div>
                
                {cardCount > 0 && (
                  <div className="absolute top-1 right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {cardCount}
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="font-medium text-white text-sm mb-1">{pattern.name}</h4>
                  <p className="text-xs text-gray-300 capitalize">{pattern.type}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getRarityColor = (rarity: string) => {
  const colors: Record<string, string> = {
    common: 'bg-gray-600 text-white',
    uncommon: 'bg-green-600 text-white',
    rare: 'bg-blue-600 text-white',
    epic: 'bg-purple-600 text-white',
    legendary: 'bg-orange-600 text-white',
    all: 'bg-gray-600 text-white'
  };
  return colors[rarity] || colors.common;
};

const getRarityBorder = (rarity: string) => {
  const borders: Record<string, string> = {
    common: 'border-gray-600',
    uncommon: 'border-green-600',
    rare: 'border-blue-600',
    epic: 'border-purple-600',
    legendary: 'border-orange-600'
  };
  return borders[rarity] || borders.common;
};

const getRarityGradientColors = (rarity: string) => {
  const gradients: Record<string, string> = {
    common: '#374151, #1f2937',
    uncommon: '#059669, #047857',
    rare: '#2563eb, #1d4ed8',
    epic: '#7c3aed, #6d28d9',
    legendary: '#f59e0b, #d97706'
  };
  return gradients[rarity] || gradients.common;
};