'use client';

import React, { useState, useEffect } from 'react';
import { PatternGameView } from './PatternGameView';
import { PatternBattleView } from './PatternBattleView';
import { UnifiedPatternLayout } from './UnifiedPatternLayout';
import { PlayerManager } from '@/utils/player-manager';
import { aiChallenges } from '@/data/ai-challenges';
import { patternCardsData } from '@/data/pattern-cards-data';
import { Player, AIChallenge, BattleResult } from '@/types/pattern-game';
import { PatternCard, PatternDeck } from '@/types/pattern-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Swords, Package, User, LogOut, 
  Coins, Gem, Lock, CheckCircle, Star
} from 'lucide-react';

type GameMode = 'menu' | 'collection' | 'challenges' | 'battle' | 'profile';

export const PatternCardGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [player, setPlayer] = useState<Player | null>(null);
  const [patterns, setPatterns] = useState<PatternCard[]>(patternCardsData);
  const [challenges, setChallenges] = useState(aiChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<AIChallenge | null>(null);
  const [playerDecks, setPlayerDecks] = useState<PatternDeck[]>([]);
  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const savedPlayer = PlayerManager.loadPlayer();
    if (savedPlayer) {
      setPlayer(savedPlayer);
    } else {
      setShowNewPlayerForm(true);
    }

    const savedPatterns = localStorage.getItem('gamePatterns');
    if (savedPatterns) {
      setPatterns(JSON.parse(savedPatterns));
    }

    const savedChallenges = localStorage.getItem('gameChallenges');
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    }
  }, []);

  useEffect(() => {
    if (player) {
      PlayerManager.savePlayer(player);
    }
  }, [player]);

  useEffect(() => {
    localStorage.setItem('gamePatterns', JSON.stringify(patterns));
  }, [patterns]);

  useEffect(() => {
    localStorage.setItem('gameChallenges', JSON.stringify(challenges));
  }, [challenges]);

  const createNewPlayer = () => {
    if (!playerName.trim()) return;
    
    const newPlayer = PlayerManager.createNewPlayer(playerName);
    newPlayer.unlockedPatterns = ['working-memory', 'scratch-pad', 'attention-mechanism'];
    setPlayer(newPlayer);
    setShowNewPlayerForm(false);
    
    setPatterns(patterns.map(p => ({
      ...p,
      owned: newPlayer.unlockedPatterns.includes(p.id),
      discovered: newPlayer.unlockedPatterns.includes(p.id)
    })));
  };

  const startChallenge = (challenge: AIChallenge) => {
    if (!player || player.level < challenge.requiredLevel) return;
    
    setSelectedChallenge(challenge);
    setGameMode('battle');
  };

  const handleBattleEnd = (result: BattleResult) => {
    if (!player || !selectedChallenge) return;

    const { leveledUp, newLevel } = PlayerManager.addExperience(player, result.experienceGained);
    player.currency.coins += result.coinsEarned;
    PlayerManager.recordBattle(player, result.winner === 'player');

    if (result.winner === 'player' && !selectedChallenge.completed) {
      setChallenges(challenges.map(c => 
        c.id === selectedChallenge.id ? { ...c, completed: true } : c
      ));

      selectedChallenge.rewards.patterns?.forEach(patternId => {
        PlayerManager.unlockPattern(player, patternId);
        setPatterns(patterns.map(p => 
          p.id === patternId ? { ...p, owned: true, discovered: true } : p
        ));
      });
    }

    setPlayer({ ...player });
    setSelectedChallenge(null);
    setGameMode('menu');
  };

  const getPlayerDeck = (): PatternCard[] => {
    return patterns.filter(p => p.owned && player?.unlockedPatterns.includes(p.id));
  };

  const getOpponentDeck = (cardIds: string[]): PatternCard[] => {
    return cardIds.map(id => patterns.find(p => p.id === id)!).filter(Boolean);
  };

  if (showNewPlayerForm) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Pattern Card Battle</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mb-6"
            onKeyPress={(e) => e.key === 'Enter' && createNewPlayer()}
          />
          <button
            onClick={createNewPlayer}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
          >
            Start Playing
          </button>
        </motion.div>
      </div>
    );
  }

  if (!player) return <div>Loading...</div>;

  if (gameMode === 'battle' && selectedChallenge) {
    return (
      <PatternBattleView
        player={player}
        challenge={selectedChallenge}
        playerDeck={getPlayerDeck()}
        opponentDeck={getOpponentDeck(selectedChallenge.opponentDeck)}
        onBattleEnd={handleBattleEnd}
      />
    );
  }

  if (gameMode === 'collection') {
    return (
      <UnifiedPatternLayout
        currentView="collection"
        title="Pattern Collection"
        subtitle="Browse and manage your pattern cards"
        onBack={() => setGameMode('menu')}
        player={player ? {
          name: player.name,
          level: player.level,
          coins: player.currency.coins
        } : undefined}
      >
        <PatternGameView />
      </UnifiedPatternLayout>
    );
  }

  if (gameMode === 'challenges') {
    return (
      <UnifiedPatternLayout
        currentView="game"
        title="AI Challenges"
        subtitle="Test your patterns against AI opponents"
        onBack={() => setGameMode('menu')}
        player={player ? {
          name: player.name,
          level: player.level,
          coins: player.currency.coins
        } : undefined}
        className="p-8"
      >
        <div className="max-w-6xl mx-auto">
          
          <div className="grid gap-4">
            {challenges.map(challenge => {
              const isLocked = player.level < challenge.requiredLevel;
              const isCompleted = challenge.completed;
              
              return (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: isLocked ? 1 : 1.02 }}
                  className={`
                    bg-gray-800/50 border rounded-xl p-6 transition-all
                    ${isLocked ? 'border-gray-700 opacity-50' : 'border-gray-600 hover:border-gray-500 cursor-pointer'}
                    ${isCompleted ? 'border-green-700/50' : ''}
                  `}
                  onClick={() => !isLocked && startChallenge(challenge)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{challenge.name}</h3>
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {isLocked && <Lock className="w-5 h-5 text-gray-500" />}
                      </div>
                      <p className="text-gray-400 mb-3">{challenge.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-gray-500">
                          Required Level: {challenge.requiredLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className="text-sm text-gray-400 mb-2">Rewards:</div>
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">{challenge.rewards.experience} XP</span>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">{challenge.rewards.coins}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </UnifiedPatternLayout>
    );
  }

  if (gameMode === 'profile') {
    return (
      <UnifiedPatternLayout
        currentView="game"
        title="Player Profile"
        subtitle="View your progress and achievements"
        onBack={() => setGameMode('menu')}
        player={player ? {
          name: player.name,
          level: player.level,
          coins: player.currency.coins
        } : undefined}
        className="p-8"
      >
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{player.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-lg text-gray-400">
                    Level {player.level} • {PlayerManager.getPlayerRank(player.level)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">{player.currency.coins}</span>
                    <Gem className="w-5 h-5 text-purple-400 ml-2" />
                    <span className="text-white">{player.currency.gems}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white">
                    {player.experience} / {player.experienceToNextLevel}
                  </span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${(player.experience / player.experienceToNextLevel) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Battle Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wins</span>
                      <span className="text-green-400">{player.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Losses</span>
                      <span className="text-red-400">{player.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-white">{PlayerManager.getWinRate(player).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Collection</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Patterns Owned</span>
                      <span className="text-white">{patterns.filter(p => p.owned).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Deck Slots</span>
                      <span className="text-white">{PlayerManager.getDeckSlots(player.level)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Challenges Completed</span>
                      <span className="text-white">{challenges.filter(c => c.completed).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UnifiedPatternLayout>
    );
  }

  return (
    <UnifiedPatternLayout
      currentView="game"
      title="Pattern Card Battle"
      subtitle="Master AI patterns through strategic card battles"
      className="p-8"
    >
      <div className="max-w-4xl w-full mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <MenuCard
            title="Collection"
            description="View and manage your pattern cards"
            icon={<Package className="w-8 h-8" />}
            onClick={() => setGameMode('collection')}
            color="blue"
          />
          <MenuCard
            title="AI Challenges"
            description="Battle against AI opponents"
            icon={<Swords className="w-8 h-8" />}
            onClick={() => setGameMode('challenges')}
            color="purple"
          />
          <MenuCard
            title="Profile"
            description="View your stats and progress"
            icon={<User className="w-8 h-8" />}
            onClick={() => setGameMode('profile')}
            color="green"
          />
          <MenuCard
            title="Logout"
            description="Save and exit the game"
            icon={<LogOut className="w-8 h-8" />}
            onClick={() => {
              setPlayer(null);
              setShowNewPlayerForm(true);
            }}
            color="red"
          />
        </div>
      </div>
    </UnifiedPatternLayout>
  );
};

const MenuCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: 'blue' | 'purple' | 'green' | 'red';
}> = ({ title, description, icon, onClick, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        bg-gradient-to-br ${colorClasses[color]} 
        rounded-xl p-8 text-white text-left transition-all
        shadow-lg hover:shadow-xl
      `}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </motion.button>
  );
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-900/50 text-green-400';
    case 'medium': return 'bg-yellow-900/50 text-yellow-400';
    case 'hard': return 'bg-red-900/50 text-red-400';
    case 'expert': return 'bg-purple-900/50 text-purple-400';
    default: return 'bg-gray-700 text-gray-400';
  }
};