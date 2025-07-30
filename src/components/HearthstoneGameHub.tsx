'use client';

import React, { useState, useEffect } from 'react';
import { HearthstoneBattle } from './HearthstoneBattle';
import { PatternDeckBuilder } from './PatternDeckBuilder';
import { heroClasses } from '@/data/hero-classes';
import { patternCardsData } from '@/data/pattern-cards-data';
import { PatternCard, PatternDeck } from '@/types/pattern-cards';
import { HeroClass } from '@/types/hearthstone-battle';
import { motion } from 'framer-motion';
import { 
  Swords, Package, Trophy, Users, Bot, 
  Star, Zap, Shield, ChevronRight, ArrowLeft
} from 'lucide-react';

type GameMode = 'menu' | 'deck-builder' | 'hero-select' | 'matchmaking' | 'battle';

export const HearthstoneGameHub: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [ownedPatterns, setOwnedPatterns] = useState<PatternCard[]>([]);
  const [playerDecks, setPlayerDecks] = useState<PatternDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<PatternDeck | null>(null);
  const [selectedHero, setSelectedHero] = useState<HeroClass | null>(null);
  const [battleType, setBattleType] = useState<'pvp' | 'ai' | null>(null);
  const [playerStats, setPlayerStats] = useState({
    wins: 0,
    losses: 0,
    rank: 'Bronze'
  });

  useEffect(() => {
    // Load owned patterns from localStorage (set by learning hub)
    const savedPatterns = localStorage.getItem('patternCards');
    if (savedPatterns) {
      const patterns = JSON.parse(savedPatterns);
      setOwnedPatterns(patterns.filter((p: PatternCard) => p.owned));
    } else {
      // Give some starter cards if none owned
      const starters = patternCardsData.filter(p => 
        ['working-memory', 'scratch-pad', 'attention-mechanism', 'cot-pattern'].includes(p.id)
      );
      setOwnedPatterns(starters);
    }

    // Load decks
    const savedDecks = localStorage.getItem('battleDecks');
    if (savedDecks) {
      setPlayerDecks(JSON.parse(savedDecks));
    }

    // Load stats
    const savedStats = localStorage.getItem('battleStats');
    if (savedStats) {
      setPlayerStats(JSON.parse(savedStats));
    }
  }, []);

  const handleDeckSave = (deck: PatternDeck) => {
    const newDecks = [...playerDecks.filter(d => d.id !== deck.id), deck];
    setPlayerDecks(newDecks);
    localStorage.setItem('battleDecks', JSON.stringify(newDecks));
  };

  const handleDeckDelete = (deckId: string) => {
    const newDecks = playerDecks.filter(d => d.id !== deckId);
    setPlayerDecks(newDecks);
    localStorage.setItem('battleDecks', JSON.stringify(newDecks));
  };

  const handleDeckSelect = (deck: PatternDeck) => {
    setSelectedDeck(deck);
    setGameMode('hero-select');
  };

  const handleHeroSelect = (hero: HeroClass) => {
    setSelectedHero(hero);
    setGameMode('matchmaking');
  };

  const handleBattleEnd = (winner: 'player1' | 'player2') => {
    const newStats = { ...playerStats };
    if (winner === 'player1') {
      newStats.wins++;
    } else {
      newStats.losses++;
    }
    
    // Update rank based on wins
    if (newStats.wins >= 50) newStats.rank = 'Legend';
    else if (newStats.wins >= 30) newStats.rank = 'Diamond';
    else if (newStats.wins >= 20) newStats.rank = 'Platinum';
    else if (newStats.wins >= 10) newStats.rank = 'Gold';
    else if (newStats.wins >= 5) newStats.rank = 'Silver';
    
    setPlayerStats(newStats);
    localStorage.setItem('battleStats', JSON.stringify(newStats));
    setGameMode('menu');
  };

  const startBattle = () => {
    if (!selectedDeck || !selectedHero) return;
    
    // Get deck cards
    const deckCards = selectedDeck.cards
      .map(cardId => ownedPatterns.find(p => p.id === cardId))
      .filter(Boolean) as PatternCard[];
    
    // Create AI deck with same size as player deck
    const playerDeckSize = deckCards.length;
    const aiDeck = [...patternCardsData].sort(() => Math.random() - 0.5).slice(0, playerDeckSize);
    const aiHero = heroClasses[Math.floor(Math.random() * heroClasses.length)];
    
    setGameMode('battle');
  };

  if (gameMode === 'battle' && selectedDeck && selectedHero) {
    const deckCards = selectedDeck.cards
      .map(cardId => ownedPatterns.find(p => p.id === cardId))
      .filter(Boolean) as PatternCard[];
    
    const aiDeck = [...patternCardsData].sort(() => Math.random() - 0.5).slice(0, deckCards.length);
    const aiHero = heroClasses[Math.floor(Math.random() * heroClasses.length)];

    return (
      <HearthstoneBattle
        playerDeck={deckCards}
        opponentDeck={aiDeck}
        playerHero={selectedHero}
        opponentHero={aiHero}
        onBattleEnd={handleBattleEnd}
      />
    );
  }

  if (gameMode === 'deck-builder') {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Deck Builder</h2>
            <button
              onClick={() => setGameMode('menu')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </button>
          </div>
          
          <PatternDeckBuilder
            availablePatterns={ownedPatterns}
            decks={playerDecks}
            onSaveDeck={handleDeckSave}
            onDeleteDeck={handleDeckDelete}
            maxDeckSize={Math.min(ownedPatterns.length, 10)}
          />
        </div>
      </div>
    );
  }

  if (gameMode === 'hero-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setGameMode('menu')}
            className="mb-8 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <h2 className="text-4xl font-bold text-white text-center mb-12">Choose Your Hero</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {heroClasses.map(hero => (
              <motion.div
                key={hero.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleHeroSelect(hero)}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition-all"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{hero.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{hero.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{hero.description}</p>
                  
                  <div className="bg-purple-900/30 rounded-lg p-3">
                    <div className="text-purple-300 font-medium mb-1">Hero Power</div>
                    <div className="text-white text-sm font-semibold">{hero.heroPower.name}</div>
                    <div className="text-gray-400 text-xs mt-1">{hero.heroPower.description}</div>
                    <div className="text-blue-400 text-sm mt-2">Cost: {hero.heroPower.cost} Mana</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === 'matchmaking') {
    setTimeout(() => startBattle(), 2000);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-400 mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold text-white mb-4">Finding Opponent...</h2>
          <p className="text-gray-300">Preparing your battle arena</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Pattern Card Battle Arena
          </h1>
          <p className="text-xl text-gray-300">
            Use your earned pattern cards from the Learning Hub to battle!
          </p>
        </div>

        {/* Player Stats */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 mb-8">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{playerStats.rank}</div>
              <div className="text-gray-400 text-sm">Current Rank</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">{playerStats.wins}</div>
              <div className="text-gray-400 text-sm">Wins</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">{playerStats.losses}</div>
              <div className="text-gray-400 text-sm">Losses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">
                {playerStats.wins + playerStats.losses > 0 
                  ? Math.round((playerStats.wins / (playerStats.wins + playerStats.losses)) * 100) 
                  : 0}%
              </div>
              <div className="text-gray-400 text-sm">Win Rate</div>
            </div>
          </div>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Play Mode */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-8 cursor-pointer"
            onClick={() => {
              if (playerDecks.length === 0) {
                alert('Create a deck first!');
                setGameMode('deck-builder');
              } else {
                setSelectedDeck(playerDecks[0]);
                setGameMode('hero-select');
              }
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <Swords className="w-12 h-12 text-white" />
              <ChevronRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Battle</h3>
            <p className="text-white/80">Jump into a match with your custom deck</p>
          </motion.div>

          {/* Deck Builder */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 cursor-pointer"
            onClick={() => setGameMode('deck-builder')}
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-12 h-12 text-white" />
              <ChevronRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Deck Builder</h3>
            <p className="text-white/80">Create and manage your battle decks</p>
          </motion.div>

          {/* Collection */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-8 cursor-pointer"
            onClick={() => window.location.href = '/pattern-cards'}
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="w-12 h-12 text-white" />
              <div className="text-white">
                <span className="text-2xl font-bold">{ownedPatterns.length}</span>
                <span className="text-sm ml-1">cards</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Collection</h3>
            <p className="text-white/80">View your earned pattern cards</p>
          </motion.div>

          {/* Learning Hub */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 cursor-pointer"
            onClick={() => window.location.href = '/learning-hub'}
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-12 h-12 text-white" />
              <ChevronRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Learning Hub</h3>
            <p className="text-white/80">Earn more pattern cards by learning</p>
          </motion.div>
        </div>

        {/* Quick Play Decks */}
        {playerDecks.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Your Decks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {playerDecks.map(deck => (
                <motion.div
                  key={deck.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDeckSelect(deck)}
                  className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-all"
                >
                  <h4 className="font-bold text-white mb-2">{deck.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{deck.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cards: {deck.cards.length}/{deck.maxSize || 10}</span>
                    <button className="text-purple-400 hover:text-purple-300">
                      Play →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};