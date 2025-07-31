import type { GameMode, GameStatus, GamePhase } from '../../domain/entity/game-room.entity';

export class GameRoomResponseDto {
  id!: string;
  hostPlayerId!: string;
  guestPlayerId?: string;
  mode!: GameMode;
  status!: GameStatus;
  phase!: GamePhase;
  currentTurn!: string;
  turnNumber!: number;
  turnTimer?: number;
  gameState!: any;
  gameSettings?: {
    maxTurnTime: number;
    deckSize: number;
    maxHandSize: number;
  };
  winnerId?: string;
  winCondition?: string;
  createdAt!: Date;
  updatedAt!: Date;
  completedAt?: Date;
}

export class PlayerStatsResponseDto {
  id!: string;
  userId!: string;
  level!: number;
  experience!: number;
  experienceToNextLevel!: number;
  wins!: number;
  losses!: number;
  draws!: number;
  totalGames!: number;
  winRate!: number;
  currentRank!: string;
  rankPoints!: number;
  currency!: {
    coins: number;
    gems: number;
  };
  unlockedPatterns!: string[];
  achievements!: string[];
  statistics?: {
    totalDamageDealt: number;
    totalHealingDone: number;
    cardsPlayed: number;
    abilitiesUsed: number;
    longestWinStreak: number;
    currentWinStreak: number;
    favoritePattern?: string;
  };
  lastActiveAt!: Date;
}