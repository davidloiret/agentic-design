'use client';

import React, { useState } from 'react';
import { PatternCard as PatternCardType, PatternDeck } from '@/types/pattern-cards';
import { PatternCard } from './PatternCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Edit2, X } from 'lucide-react';

interface PatternDeckBuilderProps {
  availablePatterns: PatternCardType[];
  decks: PatternDeck[];
  onSaveDeck: (deck: PatternDeck) => void;
  onDeleteDeck: (deckId: string) => void;
  maxDeckSize?: number;
}

export const PatternDeckBuilder: React.FC<PatternDeckBuilderProps> = ({
  availablePatterns,
  decks,
  onSaveDeck,
  onDeleteDeck,
  maxDeckSize = 10
}) => {
  const [selectedDeck, setSelectedDeck] = useState<PatternDeck | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedDeck(null);
    setSelectedCards([]);
    setDeckName('');
    setDeckDescription('');
  };

  const handleSelectDeck = (deck: PatternDeck) => {
    setSelectedDeck(deck);
    setSelectedCards([...deck.cards]);
    setDeckName(deck.name);
    setDeckDescription(deck.description);
    setIsCreatingNew(false);
    setEditingDeckId(deck.id);
  };

  const handleAddCard = (patternId: string) => {
    if (selectedCards.length < maxDeckSize && !selectedCards.includes(patternId)) {
      setSelectedCards([...selectedCards, patternId]);
    }
  };

  const handleRemoveCard = (patternId: string) => {
    setSelectedCards(selectedCards.filter(id => id !== patternId));
  };

  const handleSaveDeck = () => {
    if (!deckName.trim()) return;

    const deck: PatternDeck = {
      id: editingDeckId || `deck-${Date.now()}`,
      name: deckName,
      description: deckDescription,
      cards: selectedCards,
      maxSize: maxDeckSize,
      createdAt: editingDeckId ? selectedDeck!.createdAt : new Date(),
      lastModified: new Date()
    };

    onSaveDeck(deck);
    setSelectedDeck(deck);
    setIsCreatingNew(false);
    setEditingDeckId(null);
  };

  const selectedPatterns = selectedCards
    .map(id => availablePatterns.find(p => p.id === id))
    .filter(Boolean) as PatternCardType[];

  const availableForDeck = availablePatterns.filter(p => p.owned);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Deck Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deck List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Your Decks</h2>
                <button
                  onClick={handleCreateNew}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  aria-label="Create new deck"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="space-y-2">
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
                      <div>
                        <h3 className="font-medium">{deck.name}</h3>
                        <p className="text-sm opacity-70">{deck.cards.length}/{deck.maxSize} cards</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDeck(deck.id);
                        }}
                        className="p-1 hover:bg-red-600 rounded transition-colors"
                        aria-label="Delete deck"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isCreatingNew && (
                <div className="mt-4 p-4 bg-blue-900 rounded-lg">
                  <p className="text-white text-sm">Creating new deck...</p>
                </div>
              )}
            </div>
          </div>

          {/* Deck Editor */}
          <div className="lg:col-span-2">
            {(selectedDeck || isCreatingNew) && (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="mb-6">
                  <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Deck Name"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-3"
                  />
                  <textarea
                    value={deckDescription}
                    onChange={(e) => setDeckDescription(e.target.value)}
                    placeholder="Deck Description"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg h-20 resize-none"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Current Deck ({selectedCards.length}/{maxDeckSize})
                    </h3>
                    <button
                      onClick={handleSaveDeck}
                      disabled={!deckName.trim() || selectedCards.length === 0}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Deck
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <AnimatePresence>
                      {selectedPatterns.map((pattern, index) => (
                        <motion.div
                          key={pattern.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.05 }}
                          className="relative"
                        >
                          <PatternCard pattern={pattern} size="small" isInteractive={false} />
                          <button
                            onClick={() => handleRemoveCard(pattern.id)}
                            className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                            aria-label="Remove card from deck"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Available Patterns</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {availableForDeck
                      .filter(p => !selectedCards.includes(p.id))
                      .map(pattern => (
                        <motion.div
                          key={pattern.id}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleAddCard(pattern.id)}
                          className="cursor-pointer"
                        >
                          <PatternCard pattern={pattern} size="small" />
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {!selectedDeck && !isCreatingNew && (
              <div className="bg-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Select a deck to edit or create a new one
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};