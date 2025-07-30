'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { HearthstoneEngine } from '@/utils/hearthstone-engine';
import { 
  BattleState, BattleCard, PlayerState, HeroClass, 
  BATTLE_CONSTANTS, Animation 
} from '@/types/hearthstone-battle';
import { PatternCard } from '@/types/pattern-cards';
import { 
  Heart, Shield, Zap, Swords, Sparkles, Clock,
  ChevronRight, X, Flame, Snowflake, Star, Trophy,
  ShieldCheck, Wind, Eye, Skull
} from 'lucide-react';

interface HearthstoneBattleProps {
  playerDeck: PatternCard[];
  opponentDeck: PatternCard[];
  playerHero: HeroClass;
  opponentHero: HeroClass;
  onBattleEnd: (winner: 'player1' | 'player2') => void;
}

export const HearthstoneBattle: React.FC<HearthstoneBattleProps> = ({
  playerDeck,
  opponentDeck,
  playerHero,
  opponentHero,
  onBattleEnd
}) => {
  const [engine] = useState(() => new HearthstoneEngine(
    playerDeck, 
    opponentDeck, 
    playerHero, 
    opponentHero
  ));
  const [battleState, setBattleState] = useState<BattleState>(engine.getState());
  const [selectedCard, setSelectedCard] = useState<BattleCard | null>(null);
  const [validTargets, setValidTargets] = useState<string[]>([]);
  const [isTargeting, setIsTargeting] = useState(false);
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [hoveredCard, setHoveredCard] = useState<BattleCard | null>(null);
  const [draggedCard, setDraggedCard] = useState<BattleCard | null>(null);
  const [previewCard, setPreviewCard] = useState<BattleCard | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [targetingArrow, setTargetingArrow] = useState<{ start: { x: number, y: number }, end: { x: number, y: number } } | null>(null);
  const animationQueue = useRef<Animation[]>([]);

  useEffect(() => {
    if (battleState.phase === 'mulligan') {
      // Auto-complete mulligan after delay
      setTimeout(() => {
        engine.executeAction({
          type: 'mulligan',
          playerId: 'player1',
          timestamp: Date.now(),
          data: {}
        });
        engine.executeAction({
          type: 'mulligan',
          playerId: 'player2',
          timestamp: Date.now(),
          data: {}
        });
        updateState();
      }, 2000);
    }
  }, [battleState.phase]);

  useEffect(() => {
    // Turn timer
    if (battleState.phase === 'playing' && battleState.currentPlayer === 'player1') {
      const timer = setInterval(() => {
        setBattleState(prev => ({
          ...prev,
          turnTimeRemaining: Math.max(0, prev.turnTimeRemaining - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [battleState.currentPlayer, battleState.turnNumber]);

  useEffect(() => {
    if (battleState.turnTimeRemaining === 0 && battleState.currentPlayer === 'player1') {
      handleEndTurn();
    }
  }, [battleState.turnTimeRemaining]);

  useEffect(() => {
    // AI turn
    if (battleState.currentPlayer === 'player2' && battleState.phase === 'playing') {
      setTimeout(() => executeAITurn(), 1000);
    }
  }, [battleState.currentPlayer, battleState.phase]);

  useEffect(() => {
    if (battleState.phase === 'ended' && battleState.winner) {
      console.log('Battle ended! Winner:', battleState.winner);
      // Don't call onBattleEnd immediately - let the victory screen show first
      // onBattleEnd(battleState.winner);
    }
  }, [battleState.phase, battleState.winner]);

  const updateState = () => {
    setBattleState(engine.getState());
    const newAnimations = engine.getAnimations();
    if (newAnimations.length > 0) {
      animationQueue.current.push(...newAnimations);
      processAnimations();
    }
  };

  const processAnimations = async () => {
    while (animationQueue.current.length > 0) {
      const anim = animationQueue.current.shift()!;
      setAnimations(prev => [...prev, anim]);
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, anim.duration));
      
      // Remove this specific animation
      setAnimations(prev => prev.filter(a => a !== anim));
    }
  };

  const executeAITurn = () => {
    const state = engine.getState();
    const ai = state.player2;
    
    // Play cards
    ai.hand.forEach(card => {
      if (ai.mana >= card.cost) {
        if (card.cardType === 'minion') {
          const emptySlot = ai.board.findIndex(slot => slot === null);
          if (emptySlot !== -1) {
            engine.executeAction({
              type: 'play_card',
              playerId: 'player2',
              timestamp: Date.now(),
              data: { cardId: card.id, position: emptySlot }
            });
            updateState();
          }
        }
      }
    });

    // Attack with minions
    ai.board.forEach(minion => {
      if (minion && minion.canAttack && !minion.hasAttacked) {
        const playerBoard = state.player1.board.filter(m => m !== null);
        const hasTaunts = playerBoard.some(m => m && m.hasTaunt);
        
        if (hasTaunts) {
          // Must attack a taunt
          const taunts = playerBoard.filter(m => m && m.hasTaunt);
          if (taunts.length > 0) {
            engine.executeAction({
              type: 'attack',
              playerId: 'player2',
              timestamp: Date.now(),
              data: { cardId: minion.id, targetId: taunts[0]!.id }
            });
          }
        } else if (playerBoard.length > 0) {
          // Attack a minion
          engine.executeAction({
            type: 'attack',
            playerId: 'player2',
            timestamp: Date.now(),
            data: { cardId: minion.id, targetId: playerBoard[0]!.id }
          });
        } else {
          // Attack hero
          engine.executeAction({
            type: 'attack',
            playerId: 'player2',
            timestamp: Date.now(),
            data: { cardId: minion.id, targetId: 'hero' }
          });
        }
        updateState();
      }
    });

    // End turn
    setTimeout(() => {
      engine.executeAction({
        type: 'end_turn',
        playerId: 'player2',
        timestamp: Date.now(),
        data: {}
      });
      updateState();
    }, 1500);
  };

  const handleCardClick = (card: BattleCard, location: 'hand' | 'board') => {
    if (battleState.currentPlayer !== 'player1') return;

    if (location === 'hand') {
      if (battleState.player1.mana >= card.cost) {
        setSelectedCard(card);
        if (card.cardType === 'spell' && card.battlecry?.target !== 'self') {
          setIsTargeting(true);
          // Set valid targets based on spell
          setValidTargets(getValidTargetsForEffect(card.battlecry!));
        }
      }
    } else if (location === 'board' && card.canAttack && !card.hasAttacked) {
      setSelectedCard(card);
      setIsTargeting(true);
      setValidTargets(getValidAttackTargets());
    }
  };
  
  const handleCardDragStart = (card: BattleCard) => {
    if (battleState.currentPlayer !== 'player1') return;
    if (battleState.player1.mana >= card.cost) {
      setDraggedCard(card);
      setSelectedCard(card);
    }
  };
  
  const handleCardDragEnd = () => {
    setDraggedCard(null);
    setHoveredSlot(null);
    if (!hoveredSlot && selectedCard?.cardType === 'minion') {
      setSelectedCard(null);
    }
  };
  
  const handleSlotDrop = (position: number) => {
    if (!draggedCard || draggedCard.cardType !== 'minion') return;
    if (battleState.player1.board[position] !== null) return;
    
    engine.executeAction({
      type: 'play_card',
      playerId: 'player1',
      timestamp: Date.now(),
      data: { cardId: draggedCard.id, position }
    });
    
    setDraggedCard(null);
    setSelectedCard(null);
    setHoveredSlot(null);
    updateState();
  };

  const getValidTargetsForEffect = (effect: any): string[] => {
    const targets: string[] = [];
    
    switch (effect.target) {
      case 'enemy':
      case 'randomEnemy':
        battleState.player2.board.forEach(m => {
          if (m) targets.push(m.id);
        });
        targets.push('enemy-hero');
        break;
      case 'allFriendly':
      case 'self':
        battleState.player1.board.forEach(m => {
          if (m) targets.push(m.id);
        });
        break;
    }
    
    return targets;
  };

  const getValidAttackTargets = (): string[] => {
    const targets: string[] = [];
    const enemyBoard = battleState.player2.board.filter(m => m !== null);
    const hasTaunts = enemyBoard.some(m => m && m.hasTaunt);
    
    if (hasTaunts) {
      // Can only attack taunts
      enemyBoard.forEach(m => {
        if (m && m.hasTaunt) {
          targets.push(m.id);
        }
      });
    } else {
      // Can attack any enemy minion or hero
      enemyBoard.forEach(m => {
        if (m) {
          targets.push(m.id);
        }
      });
      targets.push('enemy-hero');
    }
    
    return targets;
  };

  const handleBoardClick = (position: number) => {
    if (!selectedCard || selectedCard.cardType !== 'minion') return;
    if (battleState.player1.board[position] !== null) return;

    engine.executeAction({
      type: 'play_card',
      playerId: 'player1',
      timestamp: Date.now(),
      data: { cardId: selectedCard.id, position }
    });
    
    setSelectedCard(null);
    updateState();
  };

  const handleTargetClick = (targetId: string) => {
    if (!selectedCard || !isTargeting) return;
    if (!validTargets.includes(targetId)) return;

    if (selectedCard.cardType === 'spell') {
      engine.executeAction({
        type: 'play_card',
        playerId: 'player1',
        timestamp: Date.now(),
        data: { cardId: selectedCard.id, targetId }
      });
    } else {
      engine.executeAction({
        type: 'attack',
        playerId: 'player1',
        timestamp: Date.now(),
        data: { cardId: selectedCard.id, targetId: targetId === 'enemy-hero' ? 'hero' : targetId }
      });
    }

    setSelectedCard(null);
    setIsTargeting(false);
    setValidTargets([]);
    updateState();
  };

  const handleHeroPower = () => {
    if (battleState.currentPlayer !== 'player1') return;
    if (battleState.player1.heroPowerUsed) return;
    if (battleState.player1.mana < battleState.player1.heroPowerCost) return;

    engine.executeAction({
      type: 'hero_power',
      playerId: 'player1',
      timestamp: Date.now(),
      data: {}
    });
    
    updateState();
  };

  const handleEndTurn = () => {
    if (battleState.currentPlayer !== 'player1') return;

    engine.executeAction({
      type: 'end_turn',
      playerId: 'player1',
      timestamp: Date.now(),
      data: {}
    });
    
    setSelectedCard(null);
    setIsTargeting(false);
    setValidTargets([]);
    updateState();
  };

  if (battleState.phase === 'mulligan') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Preparing Battle...</h2>
          <div className="text-xl text-gray-300">Drawing starting hands</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30" />
        {animations.map((anim, idx) => (
          <AnimationEffect key={idx} animation={anim} />
        ))}
      </div>

      {/* Battle UI */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Opponent Area */}
        <div className="h-[25%] min-h-[180px]">
          <PlayerArea 
            player={battleState.player2} 
            hero={opponentHero}
            isOpponent={true}
            isCurrentTurn={battleState.currentPlayer === 'player2'}
            onCardClick={() => {}}
            onHeroClick={() => handleTargetClick('enemy-hero')}
            validTargets={validTargets}
            onCardPreview={setPreviewCard}
          />
        </div>

        {/* Battlefield */}
        <div className="flex-1 relative">
          <Battlefield
            playerBoard={battleState.player1.board}
            opponentBoard={battleState.player2.board}
            onPlayerCardClick={(card) => handleCardClick(card, 'board')}
            onOpponentCardClick={(card) => handleTargetClick(card.id)}
            onEmptySlotClick={handleBoardClick}
            validTargets={validTargets}
            selectedCard={selectedCard}
            handleSlotDrop={handleSlotDrop}
            setHoveredSlot={setHoveredSlot}
            hoveredSlot={hoveredSlot}
            onCardPreview={setPreviewCard}
          />
          
          {/* Turn indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <TurnIndicator 
              currentPlayer={battleState.currentPlayer}
              turnNumber={battleState.turnNumber}
              timeRemaining={battleState.turnTimeRemaining}
              onEndTurn={handleEndTurn}
            />
          </div>
        </div>

        {/* Player Area */}
        <div className="h-[35%] min-h-[240px] overflow-visible relative z-10">
          <PlayerArea 
            player={battleState.player1} 
            hero={playerHero}
            isOpponent={false}
            isCurrentTurn={battleState.currentPlayer === 'player1'}
            onCardClick={(card) => handleCardClick(card, 'hand')}
            onHeroClick={() => {}}
            onHeroPower={handleHeroPower}
            validTargets={validTargets}
            handleCardDragStart={handleCardDragStart}
            handleCardDragEnd={handleCardDragEnd}
            onCardPreview={setPreviewCard}
          />
        </div>
      </div>

      {/* Card hover preview */}
      {hoveredCard && (
        <CardPreview card={hoveredCard} />
      )}
      
      {/* Targeting mode indicator */}
      {isTargeting && selectedCard && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <Swords className="w-5 h-5 animate-pulse" />
            <span className="font-bold">Choose a target for {selectedCard.name}</span>
            <button
              onClick={() => {
                setSelectedCard(null);
                setIsTargeting(false);
                setValidTargets([]);
              }}
              className="ml-2 hover:bg-red-700 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
      
      {/* Targeting Arrow */}
      {isTargeting && targetingArrow && (
        <TargetingArrow start={targetingArrow.start} end={targetingArrow.end} />
      )}

      {/* Victory/Defeat screen */}
      {/* Card Preview Modal */}
      <AnimatePresence>
        {previewCard && (
          <CardPreview 
            card={previewCard}
            onClose={() => setPreviewCard(null)}
          />
        )}
      </AnimatePresence>

      {battleState.phase === 'ended' && battleState.winner && (
        <VictoryScreen 
          winner={battleState.winner} 
          onContinue={() => onBattleEnd(battleState.winner!)}
        />
      )}
    </div>
  );
};

const PlayerArea: React.FC<{
  player: PlayerState;
  hero: HeroClass;
  isOpponent: boolean;
  isCurrentTurn: boolean;
  onCardClick: (card: BattleCard) => void;
  onHeroClick: () => void;
  onHeroPower?: () => void;
  validTargets: string[];
  handleCardDragStart?: (card: BattleCard) => void;
  handleCardDragEnd?: () => void;
  onCardPreview: (card: BattleCard) => void;
}> = ({ player, hero, isOpponent, isCurrentTurn, onCardClick, onHeroClick, onHeroPower, validTargets, handleCardDragStart, handleCardDragEnd, onCardPreview }) => {
  return (
    <div className={`p-4 h-full flex flex-col overflow-visible ${isCurrentTurn ? 'bg-yellow-500/10' : ''}`}>
      <div className="flex items-center justify-between flex-shrink-0">
        {/* Hero Portrait */}
        <div 
          className={`relative ${validTargets.includes('enemy-hero') ? 'cursor-pointer' : ''}`}
          onClick={onHeroClick}
        >
          <HeroPortrait 
            hero={hero} 
            health={player.health} 
            armor={player.armor}
            isTargetable={validTargets.includes('enemy-hero')}
            isOpponent={isOpponent}
          />
          {!isOpponent && onHeroPower && (
            <button
              onClick={onHeroPower}
              disabled={player.heroPowerUsed || player.mana < player.heroPowerCost}
              className={`
                absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
                ${player.heroPowerUsed || player.mana < player.heroPowerCost
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
                }
                flex items-center justify-center transition-all
              `}
            >
              <Zap className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        {/* Mana Crystals */}
        <div className="flex-1 mx-8">
          <ManaCrystals 
            current={player.mana} 
            max={player.maxMana}
            overloaded={player.overloadedMana}
          />
        </div>

        {/* Deck & Fatigue */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{player.deck.length}</div>
          <div className="text-xs text-gray-400">Deck</div>
          {player.fatigueDamage > 0 && (
            <div className="text-xs text-red-400 mt-1">
              Fatigue: {player.fatigueDamage}
            </div>
          )}
        </div>
      </div>

      {/* Hand */}
      {!isOpponent && (
        <div className="flex-1 flex items-end pb-8 overflow-visible">
          <div className="w-full flex justify-center items-end gap-1 px-4 relative" style={{ minHeight: '200px', paddingBottom: '40px' }}>
            {player.hand.map((card, idx) => (
              <HandCard
                key={card.id}
                card={card}
                index={idx}
                totalCards={player.hand.length}
                onClick={() => onCardClick(card)}
                canPlay={player.mana >= card.cost && isCurrentTurn}
                onDragStart={() => handleCardDragStart?.(card)}
                onDragEnd={() => handleCardDragEnd?.()}
                onPreview={onCardPreview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Battlefield: React.FC<{
  playerBoard: (BattleCard | null)[];
  opponentBoard: (BattleCard | null)[];
  onPlayerCardClick: (card: BattleCard) => void;
  onOpponentCardClick: (card: BattleCard) => void;
  onEmptySlotClick: (position: number) => void;
  validTargets: string[];
  selectedCard: BattleCard | null;
  handleSlotDrop?: (position: number) => void;
  setHoveredSlot?: (slot: number | null) => void;
  hoveredSlot?: number | null;
  onCardPreview: (card: BattleCard) => void;
}> = ({ 
  playerBoard, 
  opponentBoard, 
  onPlayerCardClick, 
  onOpponentCardClick, 
  onEmptySlotClick,
  validTargets,
  selectedCard,
  handleSlotDrop,
  setHoveredSlot,
  hoveredSlot,
  onCardPreview
}) => {
  return (
    <div className="h-full relative">
      {/* Center line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Opponent side */}
      <div className="h-1/2 flex items-end justify-center pb-4">
        <div className="flex gap-3">
          {opponentBoard.map((card, idx) => (
            <BoardSlot
              key={idx}
              card={card}
              position={idx}
              onClick={() => card && onOpponentCardClick(card)}
              isValidTarget={card ? validTargets.includes(card.id) : false}
              isEnemy={true}
              onCardPreview={onCardPreview}
            />
          ))}
        </div>
      </div>

      {/* Player side */}
      <div className="h-1/2 flex items-start justify-center pt-4">
        <div className="flex gap-3">
          {playerBoard.map((card, idx) => (
            <BoardSlot
              key={idx}
              card={card}
              position={idx}
              onClick={() => card ? onPlayerCardClick(card) : onEmptySlotClick(idx)}
              isValidTarget={!card && selectedCard?.cardType === 'minion'}
              isEnemy={false}
              canAttack={card?.canAttack && !card?.hasAttacked}
              onDrop={() => handleSlotDrop?.(idx)}
              onDragEnter={() => setHoveredSlot?.(idx)}
              onDragLeave={() => setHoveredSlot?.(null)}
              isHovered={hoveredSlot === idx}
              onCardPreview={onCardPreview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BoardSlot: React.FC<{
  card: BattleCard | null;
  position: number;
  onClick: () => void;
  isValidTarget: boolean;
  isEnemy: boolean;
  canAttack?: boolean;
  onDrop?: () => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  isHovered?: boolean;
  onCardPreview: (card: BattleCard) => void;
}> = ({ card, position, onClick, isValidTarget, isEnemy, canAttack, onDrop, onDragEnter, onDragLeave, isHovered, onCardPreview }) => {
  if (!card) {
    return (
      <div
        data-board-slot={position}
        onClick={onClick}
        onDrop={(e) => {
          e.preventDefault();
          onDrop?.();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => onDragEnter?.()}
        onDragLeave={() => onDragLeave?.()}
        className={`
          w-24 h-32 border-2 border-dashed rounded-lg transition-all
          ${isValidTarget || isHovered
            ? 'border-green-400 bg-green-400/20 cursor-pointer hover:bg-green-400/30' 
            : 'border-gray-600 bg-gray-800/20'
          }
        `}
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onCardPreview(card);
      }}
      className={`
        relative cursor-pointer
        ${isValidTarget ? 'ring-2 ring-red-400 ring-offset-2 ring-offset-transparent animate-pulse' : ''}
        ${canAttack && !isEnemy ? 'ring-2 ring-green-400 animate-pulse' : ''}
      `}
    >
      <MinionCard card={card} isEnemy={isEnemy} />
      
      {/* Attack ready indicator */}
      {canAttack && !isEnemy && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <Swords className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

const MinionCard: React.FC<{
  card: BattleCard;
  isEnemy: boolean;
}> = ({ card, isEnemy }) => {
  const totalAttack = card.attack + card.attackBuff + card.tempAttackBuff;
  const isBuffed = card.attackBuff > 0 || card.healthBuff > 0;
  const isDamaged = card.health < card.maxHealth;
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    const handleAttackStart = (e: CustomEvent) => {
      if (e.detail.cardId === card.id) {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500);
      }
    };
    
    window.addEventListener('attackAnimation' as any, handleAttackStart);
    return () => window.removeEventListener('attackAnimation' as any, handleAttackStart);
  }, [card.id]);

  return (
    <motion.div 
      data-card-id={card.id}
      animate={{ opacity: isAttacking ? 0.3 : 1 }}
      className={`
        w-24 h-32 bg-gradient-to-b rounded-lg relative overflow-hidden
        ${getRarityGradient(card.rarity)}
        ${card.isFrozen ? 'opacity-70' : ''}
        ${card.hasTaunt ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent' : 'border-2 border-gray-700'}
      `}
    >
      {/* Card art placeholder */}
      <div className="h-16 bg-gray-800/50 flex items-center justify-center">
        <span className="text-2xl">{getCardIcon(card)}</span>
      </div>
      
      {/* Name */}
      <div className="px-2 py-1">
        <div className="text-xs font-medium text-white truncate">{card.name}</div>
      </div>
      
      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-1">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
          ${isBuffed ? 'bg-green-600' : 'bg-yellow-600'}
        `}>
          {totalAttack}
        </div>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
          ${isDamaged ? 'bg-red-600' : 'bg-red-500'}
        `}>
          {card.health}
        </div>
      </div>

      {/* Special indicators */}
      {card.hasTaunt && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-yellow-400 rounded-full p-1"
          >
            <Shield className="w-4 h-4 text-yellow-900" />
          </motion.div>
        </div>
      )}
      {card.hasDivineShield && (
        <div className="absolute inset-0 border-2 border-yellow-300 rounded-lg animate-pulse" />
      )}
      {card.hasStealth && (
        <div className="absolute inset-0 bg-gray-900/40" />
      )}
      {card.isFrozen && (
        <Snowflake className="absolute top-1 right-1 w-4 h-4 text-blue-300" />
      )}
      
      {/* Keyword badges above stats */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-wrap gap-0.5 justify-center px-1 z-10">
        {card.hasCharge && (
          <div className="bg-red-500/90 rounded px-1 text-[10px] text-white font-bold">
            ⚡
          </div>
        )}
        {card.hasWindfury && (
          <div className="bg-cyan-500/90 rounded px-1 text-[10px] text-white font-bold">
            🌪️
          </div>
        )}
        {card.hasLifesteal && (
          <div className="bg-purple-500/90 rounded px-1 text-[10px] text-white font-bold">
            💜
          </div>
        )}
        {card.isPoisonous && (
          <div className="bg-green-500/90 rounded px-1 text-[10px] text-white font-bold">
            ☠️
          </div>
        )}
        {card.keywords?.battlecry && (
          <div className="bg-amber-500/90 rounded px-1 text-[10px] text-white font-bold">
            ✨
          </div>
        )}
        {card.keywords?.deathrattle && (
          <div className="bg-gray-600/90 rounded px-1 text-[10px] text-white font-bold">
            💀
          </div>
        )}
        {card.keywords?.spell_damage && card.keywords.spell_damage > 0 && (
          <div className="bg-purple-600/90 rounded px-1 text-[10px] text-white font-bold">
            +{card.keywords.spell_damage}
          </div>
        )}
      </div>
      {card.isPoisonous && (
        <div className="absolute top-1 left-1 w-4 h-4 bg-green-600 rounded-full" />
      )}
    </motion.div>
  );
};

const HandCard: React.FC<{
  card: BattleCard;
  index: number;
  totalCards: number;
  onClick: () => void;
  canPlay: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onPreview: (card: BattleCard) => void;
}> = ({ card, index, totalCards, onClick, canPlay, onDragStart, onDragEnd, onPreview }) => {
  const rotation = (index - (totalCards - 1) / 2) * 5;
  const yOffset = Math.abs(index - (totalCards - 1) / 2) * 5;
  const dragControls = useDragControls();

  return (
    <motion.div
      drag={canPlay && card.cardType === 'minion'}
      dragControls={dragControls}
      dragSnapToOrigin
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onContextMenu={(e) => {
        e.preventDefault();
        onPreview(card);
      }}
      initial={false}
      style={{
        transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
        position: 'relative',
        zIndex: 1
      }}
      whileHover={{ 
        scale: 1.3, 
        rotate: 0, 
        y: -120,
        zIndex: 100,
        transition: { duration: 0.2 }
      }}
      whileDrag={{
        scale: 1.15,
        rotate: 0,
        zIndex: 100,
        cursor: 'grabbing'
      }}
      onClick={onClick}
      className={`
        transition-all
        ${canPlay ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'}
        ${!canPlay ? 'opacity-50' : ''}
      `}
    >
      <div 
        data-card-id={card.id}
        className={`
          w-24 h-36 bg-gradient-to-b rounded-lg border-2 p-2
          ${getRarityGradient(card.rarity)}
          ${canPlay ? 'border-green-400 shadow-lg shadow-green-400/50' : 'border-gray-700'}
        `}
      >
        {/* Mana cost */}
        <div className="absolute -top-1.5 -left-1.5 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm text-white border-2 border-blue-400">
          {card.cost}
        </div>

        {/* Card content */}
        <div className="h-full flex flex-col">
          <div className="text-[10px] font-bold text-white text-center mb-1 line-clamp-1">{card.name}</div>
          <div className="flex-1 bg-gray-800/50 rounded p-1 mb-1 flex items-center justify-center">
            <div className="text-lg">{getCardIcon(card)}</div>
          </div>
          <div className="text-[9px] text-gray-300 text-center line-clamp-2 leading-tight px-1">{card.description}</div>
          
          {/* Stats for minions */}
          {card.cardType === 'minion' && (
            <div className="flex justify-between mt-1 px-1">
              <div className="w-5 h-5 bg-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">
                {card.attack}
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {card.health}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const HeroPortrait: React.FC<{
  hero: HeroClass;
  health: number;
  armor: number;
  isTargetable: boolean;
  isOpponent?: boolean;
}> = ({ hero, health, armor, isTargetable, isOpponent }) => {
  return (
    <motion.div 
      data-hero-id={isOpponent ? 'enemy-hero' : 'hero'}
      whileHover={isTargetable ? { scale: 1.05 } : {}}
      whileTap={isTargetable ? { scale: 0.95 } : {}}
      className={`
        relative w-36 h-36 group
        ${isTargetable ? 'cursor-crosshair' : ''}
      `}
    >
      {/* Portrait frame */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-1">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
            {/* Hero background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Hero icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl filter drop-shadow-lg">{hero.icon}</span>
            </div>
            
            {/* Targetable glow */}
            {isTargetable && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full border-4 border-red-500 shadow-lg shadow-red-500/50" 
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Health orb */}
      <motion.div 
        className="absolute -bottom-2 right-0 w-14 h-14"
        whileHover={{ scale: 1.1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg" />
          <div className="absolute inset-0.5 bg-gradient-to-br from-red-500 to-red-700 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl drop-shadow-md">{health}</span>
          </div>
        </div>
      </motion.div>
      
      {/* Armor shield */}
      {armor > 0 && (
        <motion.div 
          className="absolute -bottom-2 left-0 w-14 h-14"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="relative w-full h-full">
            <Shield className="absolute inset-0 w-full h-full text-gray-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg drop-shadow-md">{armor}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ManaCrystals: React.FC<{
  current: number;
  max: number;
  overloaded: number;
}> = ({ current, max, overloaded }) => {
  return (
    <div className="flex gap-1 justify-center items-center">
      {Array.from({ length: BATTLE_CONSTANTS.MAX_MANA }).map((_, i) => (
        <div
          key={i}
          className={`
            relative w-10 h-10 transition-all duration-300
            ${i < max ? 'scale-100' : 'scale-75 opacity-30'}
          `}
        >
          {/* Crystal background */}
          <div className={`
            absolute inset-0 rounded-full
            ${i < max 
              ? 'bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-2 border-blue-500/50' 
              : 'bg-gray-800/50 border border-gray-700'
            }
            ${i < overloaded ? 'bg-red-900/50 border-red-600' : ''}
          `} />
          
          {/* Crystal fill */}
          {i < current && i < max && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/50"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
            </motion.div>
          )}
          
          {/* Crystal shine effect */}
          {i < max && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm" />
            </div>
          )}
        </div>
      ))}
      
      {/* Mana counter */}
      <div className="ml-2 text-center">
        <div className="text-2xl font-bold text-cyan-400">{current}</div>
        <div className="text-xs text-gray-400">/{max}</div>
      </div>
    </div>
  );
};

const TurnIndicator: React.FC<{
  currentPlayer: 'player1' | 'player2';
  turnNumber: number;
  timeRemaining: number;
  onEndTurn: () => void;
}> = ({ currentPlayer, turnNumber, timeRemaining, onEndTurn }) => {
  return (
    <div className="relative">
      {/* Turn banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute -top-20 left-1/2 transform -translate-x-1/2"
      >
        {currentPlayer === 'player1' ? (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-2 rounded-full font-bold text-lg shadow-lg">
            YOUR TURN
          </div>
        ) : (
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-2 rounded-full font-bold text-lg shadow-lg">
            OPPONENT'S TURN
          </div>
        )}
      </motion.div>
      
      {/* Main turn indicator */}
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur rounded-2xl px-8 py-4 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Turn</div>
            <div className="text-3xl font-bold text-white">{turnNumber}</div>
          </div>
          
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
          
          {/* Timer with circular progress */}
          <div className="relative">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(156, 163, 175, 0.3)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={timeRemaining < 10 ? '#ef4444' : '#10b981'}
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(timeRemaining / BATTLE_CONSTANTS.TURN_TIME) * 176} 176`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-2xl font-bold ${timeRemaining < 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {timeRemaining}
              </div>
            </div>
          </div>
          
          {currentPlayer === 'player1' && (
            <>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEndTurn}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold text-white shadow-lg transition-all flex items-center gap-3"
              >
                End Turn
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CardPreview: React.FC<{ card: BattleCard; onClose: () => void }> = ({ card, onClose }) => {
  const totalAttack = card.attack + card.attackBuff + card.tempAttackBuff;
  const isDamaged = card.health < card.maxHealth;
  const isBuffed = card.attackBuff > 0 || card.healthBuff > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-gray-600 rounded-2xl p-6 w-80 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">{card.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getRarityColor(card.rarity)}`}>
                {card.rarity.toUpperCase()}
              </span>
              <span className="text-gray-400">{card.type} • {card.element}</span>
            </div>
            <div className="text-sm text-gray-400 mt-1">Level {card.level}</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                ${card.cardType === 'minion' ? 'bg-blue-600' : 'bg-purple-600'}
              `}>
                {card.cost}
              </div>
            </div>
          </div>
        </div>

        {/* Card Art Area */}
        <div className="h-32 bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
          <span className="text-6xl">{getCardIcon(card)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{card.description}</p>

        {/* Stats for minions */}
        {card.cardType === 'minion' && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
              ${isBuffed ? 'bg-green-600' : 'bg-yellow-600'}
            `}>
              {totalAttack}
            </div>
            <span className="text-gray-400 text-2xl">⚔️</span>
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
              ${isDamaged ? 'bg-red-600' : 'bg-red-500'}
            `}>
              {card.health}
            </div>
          </div>
        )}

        {/* Keywords */}
        {card.keywords && Object.keys(card.keywords).filter(key => card.keywords![key as keyof typeof card.keywords]).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {card.keywords.taunt && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-600/30 border border-yellow-600/50 rounded">
                  <Shield className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-semibold">Taunt</span>
                </div>
              )}
              {card.keywords.divineShield && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400/30 border border-yellow-400/50 rounded">
                  <ShieldCheck className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs text-yellow-300 font-semibold">Divine Shield</span>
                </div>
              )}
              {card.keywords.charge && (
                <div className="flex items-center gap-1 px-2 py-1 bg-red-600/30 border border-red-600/50 rounded">
                  <Zap className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-red-400 font-semibold">Charge</span>
                </div>
              )}
              {card.keywords.windfury && (
                <div className="flex items-center gap-1 px-2 py-1 bg-cyan-600/30 border border-cyan-600/50 rounded">
                  <Wind className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-semibold">Windfury</span>
                </div>
              )}
              {card.keywords.lifesteal && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-600/30 border border-purple-600/50 rounded">
                  <Heart className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-400 font-semibold">Lifesteal</span>
                </div>
              )}
              {card.keywords.stealth && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400 font-semibold">Stealth</span>
                </div>
              )}
              {card.keywords.rush && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-600/30 border border-orange-600/50 rounded">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-xs text-orange-400 font-semibold">Rush</span>
                </div>
              )}
              {card.keywords.poisonous && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-600/30 border border-green-600/50 rounded">
                  <Skull className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">Poisonous</span>
                </div>
              )}
              {card.keywords.battlecry && (
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-600/30 border border-amber-600/50 rounded">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-amber-400 font-semibold">Battlecry</span>
                </div>
              )}
              {card.keywords.deathrattle && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-600/30 border border-gray-600/50 rounded">
                  <Skull className="w-3 h-3 text-gray-300" />
                  <span className="text-xs text-gray-300 font-semibold">Deathrattle</span>
                </div>
              )}
              {card.keywords.spell_damage && card.keywords.spell_damage > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-700/30 border border-purple-700/50 rounded">
                  <Zap className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-500 font-semibold">Spell Power +{card.keywords.spell_damage}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Abilities */}
        {card.abilities && card.abilities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Abilities</h4>
            <div className="space-y-2">
              {card.abilities.slice(0, 3).map((ability, idx) => (
                <div key={idx} className="bg-gray-700/30 rounded-lg p-2">
                  <div className="flex items-start gap-2">
                    <Zap className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="text-xs font-medium text-blue-400 mb-0.5">
                        {ability.name}
                      </h5>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {ability.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close instruction */}
        <div className="text-center text-xs text-gray-500 mt-4">
          Click anywhere to close
        </div>
      </motion.div>
    </motion.div>
  );
};

const VictoryScreen: React.FC<{ 
  winner: 'player1' | 'player2';
  onContinue?: () => void;
}> = ({ winner, onContinue }) => {
  const isVictory = winner === 'player1';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {isVictory ? (
          <>
            {/* Victory rays */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[150%] h-[150%] bg-gradient-conic from-yellow-400/20 via-transparent to-yellow-400/20" />
            </motion.div>
            
            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  scale: 0
                }}
                animate={{ 
                  y: -50,
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {/* Defeat smoke */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
            />
            
            {/* Falling embers */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
                className="absolute w-2 h-2 bg-red-500 rounded-full opacity-60"
              />
            ))}
          </>
        )}
      </div>
      
      {/* Main content */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3
        }}
        className="relative z-10 text-center"
      >
        {/* Victory/Defeat text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {isVictory ? (
            <div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-8"
              >
                <Trophy className="w-32 h-32 text-yellow-400 mx-auto filter drop-shadow-2xl" />
              </motion.div>
              
              <motion.h1
                className="text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent filter drop-shadow-lg"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              >
                VICTORY!
              </motion.h1>
            </div>
          ) : (
            <div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
                className="mb-8"
              >
                <X className="w-32 h-32 text-red-500 mx-auto filter drop-shadow-2xl" />
              </motion.div>
              
              <motion.h1
                className="text-8xl font-bold mb-4 text-red-500 filter drop-shadow-lg"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                DEFEAT
              </motion.h1>
            </div>
          )}
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`text-2xl font-medium ${
            isVictory ? 'text-yellow-200' : 'text-gray-400'
          }`}
        >
          {isVictory ? 'Well played, champion!' : 'The battle is lost...'}
        </motion.p>
        
        {/* Stats or continue button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={() => onContinue?.()}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105
              ${isVictory 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }
            `}
          >
            Continue
          </button>
        </motion.div>
        
        {/* Confetti for victory */}
        {isVictory && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  scale: [0, 1, 1, 0],
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className={`absolute w-3 h-3 ${
                  ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 5)]
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const AnimationEffect: React.FC<{ animation: Animation }> = ({ animation }) => {
  if (animation.type === 'attack') {
    return (
      <AttackAnimation
        sourceId={animation.sourceId}
        targetId={animation.targetId}
        duration={animation.duration}
      />
    );
  }
  
  if (animation.type === 'damage') {
    return (
      <DamageAnimation
        targetId={animation.targetId}
        value={animation.value || 0}
        duration={animation.duration}
      />
    );
  }
  
  if (animation.type === 'spell_cast') {
    return (
      <SpellAnimation
        sourceId={animation.sourceId}
        targetId={animation.targetId}
        duration={animation.duration}
      />
    );
  }
  
  if (animation.type === 'card_played') {
    return (
      <CardPlayAnimation
        sourceId={animation.sourceId}
        targetPosition={animation.targetPosition}
        duration={animation.duration}
      />
    );
  }
  
  if (animation.type === 'draw') {
    return (
      <DrawAnimation
        cardId={animation.targetId}
        duration={animation.duration}
      />
    );
  }
  
  if (animation.type === 'death') {
    return (
      <DeathAnimation
        cardId={animation.targetId}
        duration={animation.duration}
      />
    );
  }
  
  return null;
};

const AttackAnimation: React.FC<{
  sourceId: string;
  targetId?: string;
  duration: number;
}> = ({ sourceId, targetId, duration }) => {
  const [sourcePos, setSourcePos] = useState<{ x: number; y: number } | null>(null);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  const [sourceEl, setSourceEl] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Get positions of source and target elements
    const source = document.querySelector(`[data-card-id="${sourceId}"]`) as HTMLElement;
    const targetEl = targetId === 'hero' || targetId === 'enemy-hero' 
      ? document.querySelector(`[data-hero-id="${targetId}"]`)
      : document.querySelector(`[data-card-id="${targetId}"]`);
    
    if (source && targetEl) {
      setSourceEl(source);
      const sourceRect = source.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      
      setSourcePos({
        x: sourceRect.left + sourceRect.width / 2,
        y: sourceRect.top + sourceRect.height / 2
      });
      
      setTargetPos({
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
      });
      
      // Dispatch event to hide the attacking card
      window.dispatchEvent(new CustomEvent('attackAnimation', { detail: { cardId: sourceId } }));
    }
  }, [sourceId, targetId]);
  
  if (!sourcePos || !targetPos || !sourceEl) return null;
  
  // Calculate angle and distance for the punch
  const dx = targetPos.x - sourcePos.x;
  const dy = targetPos.y - sourcePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  
  // Calculate midpoint for the punch
  const punchDistance = Math.min(distance * 0.8, distance - 50);
  const punchX = sourcePos.x + Math.cos(angle) * punchDistance;
  const punchY = sourcePos.y + Math.sin(angle) * punchDistance;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Attacking card motion */}
      <motion.div
        initial={{ 
          x: sourcePos.x,
          y: sourcePos.y,
          scale: 1
        }}
        animate={{ 
          x: [sourcePos.x, punchX, sourcePos.x],
          y: [sourcePos.y, punchY, sourcePos.y],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: duration / 1000,
          times: [0, 0.4, 1],
          ease: "easeInOut"
        }}
        className="absolute"
        style={{ 
          width: '96px',
          height: '144px',
          marginLeft: '-48px',
          marginTop: '-72px',
          transform: `rotate(${angle * 180 / Math.PI + 90}deg)`
        }}
      >
        {/* Clone of attacking card */}
        <div 
          className="w-full h-full bg-gradient-to-br from-yellow-400/80 to-orange-500/80 rounded-lg shadow-2xl"
          style={{
            backgroundImage: sourceEl ? `url(${getComputedStyle(sourceEl).backgroundImage})` : undefined
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Swords className="w-12 h-12 text-white/80" />
          </div>
        </div>
      </motion.div>
      
      {/* Impact effect at contact point */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: targetPos.x,
          y: targetPos.y
        }}
        animate={{ 
          opacity: [0, 0, 1, 0],
          scale: [0, 0, 1.5, 2]
        }}
        transition={{ 
          duration: duration / 1000,
          times: [0, 0.35, 0.4, 1]
        }}
        className="absolute"
        style={{ 
          width: '150px',
          height: '150px',
          marginLeft: '-75px',
          marginTop: '-75px'
        }}
      >
        {/* Impact burst */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-xl animate-ping" />
          <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-2xl" />
          {/* Impact stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos(i * Math.PI / 3) * 60,
                y: Math.sin(i * Math.PI / 3) * 60,
                rotate: 360
              }}
              transition={{ 
                duration: 0.5,
                delay: (duration / 1000) * 0.35
              }}
              className="absolute top-1/2 left-1/2 w-4 h-4"
              style={{ marginLeft: '-8px', marginTop: '-8px' }}
            >
              <Star className="w-full h-full text-yellow-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Screen shake effect */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [0, -5, 5, -3, 3, 0],
          y: [0, -3, 3, -2, 2, 0]
        }}
        transition={{ 
          duration: 0.3,
          delay: (duration / 1000) * 0.35
        }}
        className="fixed inset-0"
      />
    </div>
  );
};

const DamageAnimation: React.FC<{
  targetId: string;
  value: number;
  duration: number;
}> = ({ targetId, value, duration }) => {
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    const targetEl = targetId === 'hero' || targetId === 'enemy-hero'
      ? document.querySelector(`[data-hero-id="${targetId}"]`)
      : document.querySelector(`[data-card-id="${targetId}"]`);
    
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [targetId]);
  
  if (!targetPos) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Damage number */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0.5,
          x: targetPos.x,
          y: targetPos.y
        }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.5, 1.2, 1],
          y: [targetPos.y, targetPos.y - 50, targetPos.y - 80]
        }}
        transition={{ duration: duration / 1000 }}
        className="absolute text-6xl font-bold text-red-500 drop-shadow-lg"
        style={{ 
          marginLeft: '-30px',
          marginTop: '-30px'
        }}
      >
        -{value}
      </motion.div>
      
      {/* Hit effect */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: targetPos.x,
          y: targetPos.y
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 1.5]
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
        style={{ 
          width: '80px',
          height: '80px',
          marginLeft: '-40px',
          marginTop: '-40px'
        }}
      >
        <div className="w-full h-full rounded-full bg-red-500/40 blur-md" />
      </motion.div>
    </div>
  );
};

const SpellAnimation: React.FC<{
  sourceId: string;
  targetId?: string;
  duration: number;
}> = ({ sourceId, targetId, duration }) => {
  const [sourcePos, setSourcePos] = useState<{ x: number; y: number } | null>(null);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    // For spells, source is usually the player's hero or hand
    const sourceEl = document.querySelector(`[data-card-id="${sourceId}"]`) ||
                    document.querySelector(`[data-hero-id="player1"]`);
    const targetEl = targetId 
      ? (targetId === 'hero' || targetId === 'enemy-hero'
        ? document.querySelector(`[data-hero-id="${targetId}"]`)
        : document.querySelector(`[data-card-id="${targetId}"]`))
      : null;
    
    if (sourceEl) {
      const sourceRect = sourceEl.getBoundingClientRect();
      setSourcePos({
        x: sourceRect.left + sourceRect.width / 2,
        y: sourceRect.top + sourceRect.height / 2
      });
    }
    
    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      setTargetPos({
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
      });
    } else {
      // Default to center of screen for untargeted spells
      setTargetPos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }
  }, [sourceId, targetId]);
  
  if (!sourcePos || !targetPos) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Spell projectile */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: sourcePos.x,
          y: sourcePos.y
        }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1, 1, 2],
          x: targetPos.x,
          y: targetPos.y
        }}
        transition={{ 
          duration: duration / 1000,
          ease: "easeOut"
        }}
        className="absolute"
        style={{ 
          width: '60px',
          height: '60px',
          marginLeft: '-30px',
          marginTop: '-30px'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <Sparkles className="w-full h-full text-purple-400 drop-shadow-lg" />
        </motion.div>
      </motion.div>
      
      {/* Spell impact */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: targetPos.x,
          y: targetPos.y
        }}
        animate={{ 
          opacity: [0, 0, 1, 0],
          scale: [0, 0, 2, 3]
        }}
        transition={{ 
          duration: duration / 1000,
          times: [0, 0.7, 0.8, 1]
        }}
        className="absolute"
        style={{ 
          width: '150px',
          height: '150px',
          marginLeft: '-75px',
          marginTop: '-75px'
        }}
      >
        <div className="w-full h-full rounded-full bg-purple-400/30 blur-xl" />
      </motion.div>
    </div>
  );
};

const CardPlayAnimation: React.FC<{
  sourceId: string;
  targetPosition?: number;
  duration: number;
}> = ({ sourceId, targetPosition, duration }) => {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    // Find the card in hand
    const cardEl = document.querySelector(`[data-card-id="${sourceId}"]`);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      setStartPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    
    // Find target board position
    const boardSlots = document.querySelectorAll('[data-board-slot]');
    if (targetPosition !== undefined && boardSlots[targetPosition]) {
      const targetRect = boardSlots[targetPosition].getBoundingClientRect();
      setEndPos({
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
      });
    } else {
      // Default to center of board
      setEndPos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }
  }, [sourceId, targetPosition]);
  
  if (!startPos || !endPos) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Card flying to board */}
      <motion.div
        initial={{ 
          x: startPos.x,
          y: startPos.y,
          scale: 1,
          rotate: 0
        }}
        animate={{ 
          x: endPos.x,
          y: endPos.y,
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: duration / 1000,
          ease: "easeInOut"
        }}
        className="absolute"
        style={{ 
          width: '96px',
          height: '144px',
          marginLeft: '-48px',
          marginTop: '-72px'
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg" />
      </motion.div>
      
      {/* Glow effect on placement */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: endPos.x,
          y: endPos.y
        }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 2, 2.5]
        }}
        transition={{ 
          duration: 0.5,
          delay: (duration / 1000) * 0.8
        }}
        className="absolute"
        style={{ 
          width: '150px',
          height: '150px',
          marginLeft: '-75px',
          marginTop: '-75px'
        }}
      >
        <div className="w-full h-full rounded-full bg-yellow-400/30 blur-xl" />
      </motion.div>
    </div>
  );
};

const DrawAnimation: React.FC<{
  cardId: string;
  duration: number;
}> = ({ cardId, duration }) => {
  const [deckPos, setDeckPos] = useState<{ x: number; y: number } | null>(null);
  const [handPos, setHandPos] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    // Find deck position (right side of screen)
    setDeckPos({
      x: window.innerWidth - 50,
      y: window.innerHeight - 100
    });
    
    // Find hand position (bottom center)
    setTimeout(() => {
      const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        setHandPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      } else {
        setHandPos({
          x: window.innerWidth / 2,
          y: window.innerHeight - 100
        });
      }
    }, 50);
  }, [cardId]);
  
  if (!deckPos || !handPos) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Card drawing from deck */}
      <motion.div
        initial={{ 
          x: deckPos.x,
          y: deckPos.y,
          scale: 0.5,
          rotate: 0,
          opacity: 0
        }}
        animate={{ 
          x: handPos.x,
          y: handPos.y,
          scale: [0.5, 1.2, 1],
          rotate: [0, -10, 0],
          opacity: [0, 1, 1]
        }}
        transition={{ 
          duration: duration / 1000,
          ease: "easeOut"
        }}
        className="absolute"
        style={{ 
          width: '96px',
          height: '144px',
          marginLeft: '-48px',
          marginTop: '-72px'
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg">
          <div className="w-full h-full flex items-center justify-center">
            <Star className="w-12 h-12 text-white" />
          </div>
        </div>
      </motion.div>
      
      {/* Trail effect */}
      <motion.div
        initial={{ 
          opacity: 0,
          scaleX: 0
        }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scaleX: [0, 1, 1]
        }}
        transition={{ 
          duration: duration / 1000
        }}
        className="absolute"
        style={{
          left: Math.min(deckPos.x, handPos.x),
          top: Math.min(deckPos.y, handPos.y),
          width: Math.abs(handPos.x - deckPos.x),
          height: 2,
          background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)',
          transformOrigin: 'left center'
        }}
      />
    </div>
  );
};

const DeathAnimation: React.FC<{
  cardId: string;
  duration: number;
}> = ({ cardId, duration }) => {
  const [cardPos, setCardPos] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      setCardPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [cardId]);
  
  if (!cardPos) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Death explosion */}
      <motion.div
        initial={{ 
          opacity: 1,
          scale: 1,
          x: cardPos.x,
          y: cardPos.y
        }}
        animate={{ 
          opacity: [1, 1, 0],
          scale: [1, 1.5, 2],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: duration / 1000
        }}
        className="absolute"
        style={{ 
          width: '120px',
          height: '120px',
          marginLeft: '-60px',
          marginTop: '-60px'
        }}
      >
        <X className="w-full h-full text-red-500 drop-shadow-lg" />
      </motion.div>
      
      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 1,
            scale: 0,
            x: cardPos.x,
            y: cardPos.y
          }}
          animate={{ 
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            x: cardPos.x + (Math.cos(i * Math.PI / 4) * 100),
            y: cardPos.y + (Math.sin(i * Math.PI / 4) * 100)
          }}
          transition={{ 
            duration: duration / 1000,
            ease: "easeOut"
          }}
          className="absolute w-4 h-4 bg-red-500 rounded-full"
        />
      ))}
      
      {/* Fade to black effect */}
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0,
          x: cardPos.x,
          y: cardPos.y
        }}
        animate={{ 
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 2]
        }}
        transition={{ 
          duration: duration / 1000
        }}
        className="absolute"
        style={{ 
          width: '150px',
          height: '150px',
          marginLeft: '-75px',
          marginTop: '-75px'
        }}
      >
        <div className="w-full h-full rounded-full bg-black/60 blur-xl" />
      </motion.div>
    </div>
  );
};

const TargetingArrow: React.FC<{ start: { x: number, y: number }, end: { x: number, y: number } }> = ({ start, end }) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);
  
  return (
    <svg 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="20"
          markerHeight="14"
          refX="20"
          refY="7"
          orient="auto"
        >
          <polygon
            points="0 0, 20 7, 0 14"
            fill="red"
            className="animate-pulse"
          />
        </marker>
      </defs>
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="red"
        strokeWidth="4"
        markerEnd="url(#arrowhead)"
        className="animate-pulse"
        strokeDasharray="10,5"
      />
    </svg>
  );
};

// Helper functions
const getRarityGradient = (rarity: string) => {
  const gradients = {
    common: 'from-gray-600 to-gray-800',
    uncommon: 'from-green-600 to-green-800',
    rare: 'from-blue-600 to-blue-800',
    epic: 'from-purple-600 to-purple-800',
    legendary: 'from-amber-600 to-amber-800'
  };
  return gradients[rarity as keyof typeof gradients] || gradients.common;
};

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'bg-gray-600 text-gray-100',
    uncommon: 'bg-green-600 text-green-100',
    rare: 'bg-blue-600 text-blue-100',
    epic: 'bg-purple-600 text-purple-100',
    legendary: 'bg-amber-600 text-amber-100'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

const getCardIcon = (card: BattleCard) => {
  const icons: Record<string, string> = {
    behavioral: '🧠',
    structural: '🏗️',
    creational: '✨',
    cognitive: '🤔',
    architectural: '🏛️'
  };
  return icons[card.type] || '🎯';
};