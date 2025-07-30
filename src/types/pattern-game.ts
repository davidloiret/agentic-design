import { PatternCard } from './pattern-cards';

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  wins: number;
  losses: number;
  currentDeckId: string;
  unlockedPatterns: string[];
  currency: {
    coins: number;
    gems: number;
  };
}

export interface GameCard extends PatternCard {
  currentHealth?: number;
  currentAttack?: number;
  currentDefense?: number;
  exhausted?: boolean;
  buffed?: boolean;
  debuffed?: boolean;
  position?: number;
}

export interface GameState {
  id: string;
  players: {
    player: Player;
    opponent: Player;
  };
  currentTurn: 'player' | 'opponent';
  turnNumber: number;
  phase: 'mulligan' | 'main' | 'combat' | 'end' | 'gameOver';
  board: {
    player: {
      field: (GameCard | null)[];
      hand: GameCard[];
      deck: GameCard[];
      graveyard: GameCard[];
    };
    opponent: {
      field: (GameCard | null)[];
      hand: GameCard[];
      deck: GameCard[];
      graveyard: GameCard[];
    };
  };
  resources: {
    player: {
      memory: number;
      maxMemory: number;
      computation: number;
      maxComputation: number;
    };
    opponent: {
      memory: number;
      maxMemory: number;
      computation: number;
      maxComputation: number;
    };
  };
  winner?: 'player' | 'opponent';
  turnTimer?: number;
}

export interface AIChallenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  requiredLevel: number;
  rewards: {
    experience: number;
    coins: number;
    patterns?: string[];
  };
  opponentDeck: string[];
  specialRules?: string[];
  completed: boolean;
}

export interface GameAction {
  type: 'play_card' | 'attack' | 'use_ability' | 'end_turn' | 'surrender';
  playerId: 'player' | 'opponent';
  data?: {
    cardId?: string;
    targetId?: string;
    fromPosition?: number;
    toPosition?: number;
    abilityIndex?: number;
  };
}

export interface GameEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'draw' | 'discard' | 'summon';
  target: 'self' | 'opponent' | 'all' | 'field';
  value: number;
  duration?: number;
}

export interface BattleResult {
  winner: 'player' | 'opponent';
  experienceGained: number;
  coinsEarned: number;
  patternsUnlocked: string[];
  playerLevelUp: boolean;
  statistics: {
    turnsPlayed: number;
    cardsPlayed: number;
    damageDealt: number;
    healingDone: number;
  };
}