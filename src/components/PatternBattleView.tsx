'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PatternCard } from './PatternCard';
import { PatternGameEngine } from '@/utils/pattern-game-engine';
import { PlayerManager } from '@/utils/player-manager';
import { AIOpponent } from '@/data/ai-challenges';
import { GameState, GameCard, Player, AIChallenge } from '@/types/pattern-game';
import { PatternCard as PatternCardType } from '@/types/pattern-cards';
import { 
  Zap, Shield, Heart, Brain, Activity, Clock, 
  ChevronRight, X, Trophy, Coins
} from 'lucide-react';

interface PatternBattleViewProps {
  player: Player;
  challenge: AIChallenge;
  playerDeck: PatternCardType[];
  opponentDeck: PatternCardType[];
  onBattleEnd: (result: any) => void;
}

export const PatternBattleView: React.FC<PatternBattleViewProps> = ({
  player,
  challenge,
  playerDeck,
  opponentDeck,
  onBattleEnd
}) => {
  const [gameEngine, setGameEngine] = useState<PatternGameEngine | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
  const [selectedAction, setSelectedAction] = useState<'play' | 'attack' | 'ability' | null>(null);
  const [targetPosition, setTargetPosition] = useState<number | null>(null);
  const [aiOpponent] = useState(new AIOpponent(challenge.difficulty));
  const [turnTimer, setTurnTimer] = useState(60);
  const [animatingAction, setAnimatingAction] = useState(false);

  useEffect(() => {
    const engine = new PatternGameEngine(
      player,
      { ...player, id: 'opponent', name: challenge.name },
      playerDeck,
      opponentDeck
    );
    setGameEngine(engine);
    setGameState(engine.getGameState());
  }, []);

  useEffect(() => {
    if (!gameState || gameState.currentTurn !== 'opponent' || gameState.phase === 'gameOver') return;

    const aiTurnDelay = setTimeout(() => {
      executeAITurn();
    }, 1500);

    return () => clearTimeout(aiTurnDelay);
  }, [gameState?.currentTurn, gameState?.phase]);

  useEffect(() => {
    if (!gameState || gameState.currentTurn !== 'player' || gameState.phase === 'gameOver') return;

    const timer = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
          handleEndTurn();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState?.currentTurn, gameState?.turnNumber]);

  const executeAITurn = async () => {
    if (!gameEngine || !gameState) return;

    let actionsTaken = 0;
    const maxActions = 3;

    while (actionsTaken < maxActions) {
      const action = aiOpponent.getNextAction(gameState);
      
      if (action.type === 'end_turn') break;

      setAnimatingAction(true);
      const success = gameEngine.executeAction(action);
      
      if (success) {
        setGameState(gameEngine.getGameState());
        await new Promise(resolve => setTimeout(resolve, 1000));
        actionsTaken++;
      } else {
        break;
      }
      setAnimatingAction(false);
    }

    gameEngine.executeAction({ type: 'end_turn', playerId: 'opponent' });
    setGameState(gameEngine.getGameState());
    setTurnTimer(60);
  };

  const handleCardClick = (card: GameCard, source: 'hand' | 'field') => {
    if (gameState?.currentTurn !== 'player' || animatingAction) return;

    if (source === 'hand') {
      setSelectedCard(card);
      setSelectedAction('play');
    } else if (source === 'field' && !card.exhausted) {
      setSelectedCard(card);
      setSelectedAction(null);
    }
  };

  const handleFieldPositionClick = (position: number, owner: 'player' | 'opponent') => {
    if (!selectedCard || !selectedAction || !gameEngine) return;

    if (selectedAction === 'play' && owner === 'player') {
      const action = {
        type: 'play_card' as const,
        playerId: 'player' as const,
        data: {
          cardId: selectedCard.id,
          toPosition: position
        }
      };

      if (gameEngine.executeAction(action)) {
        setGameState(gameEngine.getGameState());
        setSelectedCard(null);
        setSelectedAction(null);
      }
    }
  };

  const handleAttack = (target: GameCard) => {
    if (!selectedCard || !gameEngine || selectedCard.exhausted) return;

    const action = {
      type: 'attack' as const,
      playerId: 'player' as const,
      data: {
        cardId: selectedCard.id,
        targetId: target.id
      }
    };

    setAnimatingAction(true);
    if (gameEngine.executeAction(action)) {
      setGameState(gameEngine.getGameState());
      setTimeout(() => setAnimatingAction(false), 500);
    } else {
      setAnimatingAction(false);
    }
    
    setSelectedCard(null);
    setSelectedAction(null);
  };

  const handleUseAbility = (abilityIndex: number) => {
    if (!selectedCard || !gameEngine) return;

    const action = {
      type: 'use_ability' as const,
      playerId: 'player' as const,
      data: {
        cardId: selectedCard.id,
        abilityIndex
      }
    };

    if (gameEngine.executeAction(action)) {
      setGameState(gameEngine.getGameState());
      setSelectedCard(null);
      setSelectedAction(null);
    }
  };

  const handleEndTurn = () => {
    if (!gameEngine || gameState?.currentTurn !== 'player') return;

    gameEngine.executeAction({ type: 'end_turn', playerId: 'player' });
    setGameState(gameEngine.getGameState());
    setSelectedCard(null);
    setSelectedAction(null);
  };

  const handleSurrender = () => {
    if (!gameEngine) return;

    gameEngine.executeAction({ type: 'surrender', playerId: 'player' });
    const finalState = gameEngine.getGameState();
    setGameState(finalState);
    
    const result = gameEngine.getBattleResult();
    if (result) {
      onBattleEnd(result);
    }
  };

  useEffect(() => {
    if (gameState?.phase === 'gameOver' && gameEngine) {
      const result = gameEngine.getBattleResult();
      if (result) {
        setTimeout(() => onBattleEnd(result), 2000);
      }
    }
  }, [gameState?.phase]);

  if (!gameState) return <div>Loading battle...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Battle Header */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-400">Turn {gameState.turnNumber}</div>
              <div className="text-2xl font-bold text-blue-400">{turnTimer}s</div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div>
              <div className="text-sm text-gray-400">Current Turn</div>
              <div className="text-lg font-semibold">
                {gameState.currentTurn === 'player' ? player.name : challenge.name}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {gameState.currentTurn === 'player' && (
              <button
                onClick={handleEndTurn}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                End Turn
              </button>
            )}
            <button
              onClick={handleSurrender}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition-colors"
            >
              Surrender
            </button>
          </div>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="max-w-7xl mx-auto grid grid-rows-3 gap-4 h-[calc(100vh-200px)]">
        {/* Opponent Side */}
        <div className="space-y-4">
          {/* Opponent Info */}
          <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <div className="font-semibold">{challenge.name}</div>
                <div className="text-sm text-gray-400">{challenge.difficulty} AI</div>
              </div>
            </div>
            <div className="flex gap-4">
              <ResourceDisplay 
                icon={<Activity className="w-4 h-4" />}
                current={gameState.resources.opponent.memory}
                max={gameState.resources.opponent.maxMemory}
                color="blue"
              />
              <ResourceDisplay 
                icon={<Zap className="w-4 h-4" />}
                current={gameState.resources.opponent.computation}
                max={gameState.resources.opponent.maxComputation}
                color="yellow"
              />
            </div>
          </div>

          {/* Opponent Hand (face down) */}
          <div className="flex justify-center gap-2">
            {gameState.board.opponent.hand.map((_, index) => (
              <div
                key={index}
                className="w-20 h-28 bg-purple-900/30 border-2 border-purple-700/50 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Battlefield */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 rounded-xl" />
          
          {/* Opponent Field */}
          <div className="flex justify-center gap-3 mb-8">
            {gameState.board.opponent.field.map((card, index) => (
              <FieldSlot
                key={index}
                card={card}
                position={index}
                owner="opponent"
                onClick={() => card && selectedCard && handleAttack(card)}
                isValidTarget={!!selectedCard && !selectedCard.exhausted && gameState.currentTurn === 'player'}
              />
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

          {/* Player Field */}
          <div className="flex justify-center gap-3 mt-8">
            {gameState.board.player.field.map((card, index) => (
              <FieldSlot
                key={index}
                card={card}
                position={index}
                owner="player"
                onClick={() => handleFieldPositionClick(index, 'player')}
                isValidTarget={selectedAction === 'play'}
                onCardClick={(card) => handleCardClick(card, 'field')}
              />
            ))}
          </div>
        </div>

        {/* Player Side */}
        <div className="space-y-4">
          {/* Player Hand */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-2">
            {gameState.board.player.hand.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -20 }}
                className={`cursor-pointer transition-all ${
                  selectedCard?.id === card.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => handleCardClick(card, 'hand')}
              >
                <PatternCard pattern={card} size="small" isInteractive={false} />
              </motion.div>
            ))}
          </div>

          {/* Player Info */}
          <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400" />
              <div>
                <div className="font-semibold">{player.name}</div>
                <div className="text-sm text-gray-400">Level {player.level}</div>
              </div>
            </div>
            <div className="flex gap-4">
              <ResourceDisplay 
                icon={<Activity className="w-4 h-4" />}
                current={gameState.resources.player.memory}
                max={gameState.resources.player.maxMemory}
                color="blue"
              />
              <ResourceDisplay 
                icon={<Zap className="w-4 h-4" />}
                current={gameState.resources.player.computation}
                max={gameState.resources.player.maxComputation}
                color="yellow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      {selectedCard && gameState.board.player.field.includes(selectedCard) && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl">
          <div className="flex gap-3">
            {selectedCard.abilities.map((ability, index) => (
              <button
                key={index}
                onClick={() => handleUseAbility(index)}
                disabled={gameState.resources.player.computation < 1 || selectedCard.exhausted}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg transition-colors"
              >
                {ability.name} (1 <Zap className="w-4 h-4 inline" />)
              </button>
            ))}
            <button
              onClick={() => setSelectedCard(null)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Victory/Defeat Overlay */}
      {gameState.phase === 'gameOver' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center"
          >
            <h2 className={`text-4xl font-bold mb-4 ${
              gameState.winner === 'player' ? 'text-green-400' : 'text-red-400'
            }`}>
              {gameState.winner === 'player' ? 'Victory!' : 'Defeat'}
            </h2>
            <p className="text-gray-400 mb-6">
              {gameState.winner === 'player' 
                ? 'Congratulations! You have defeated the AI challenge.'
                : 'Better luck next time. Keep practicing!'}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const FieldSlot: React.FC<{
  card: GameCard | null;
  position: number;
  owner: 'player' | 'opponent';
  onClick: () => void;
  isValidTarget: boolean;
  onCardClick?: (card: GameCard) => void;
}> = ({ card, position, owner, onClick, isValidTarget, onCardClick }) => {
  if (!card) {
    return (
      <div
        onClick={onClick}
        className={`w-32 h-44 border-2 border-dashed rounded-lg transition-all ${
          isValidTarget 
            ? 'border-green-400 bg-green-400/10 cursor-pointer hover:bg-green-400/20' 
            : 'border-gray-700 bg-gray-800/20'
        }`}
      />
    );
  }

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      onClick={() => onCardClick?.(card)}
    >
      <div className={`
        w-32 h-44 bg-gray-800 border-2 rounded-lg p-3 cursor-pointer
        ${card.exhausted ? 'opacity-50 border-gray-600' : 'border-gray-600'}
        ${isValidTarget ? 'ring-2 ring-red-400' : ''}
      `}>
        <div className="text-center">
          <div className="font-bold text-sm mb-1">{card.name}</div>
          <div className="text-xs text-gray-400 mb-2">{card.type}</div>
          
          <div className="flex justify-around mb-2">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold">{card.currentAttack}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold">{card.currentHealth}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            {card.abilities[0]?.name}
          </div>
        </div>

        {card.exhausted && (
          <div className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center">
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ResourceDisplay: React.FC<{
  icon: React.ReactNode;
  current: number;
  max: number;
  color: 'blue' | 'yellow';
}> = ({ icon, current, max, color }) => {
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-400',
    yellow: 'text-yellow-400 bg-yellow-400'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={colorClasses[color]}>{icon}</div>
      <div className="text-sm">
        <span className="font-bold">{current}</span>
        <span className="text-gray-500">/{max}</span>
      </div>
    </div>
  );
};