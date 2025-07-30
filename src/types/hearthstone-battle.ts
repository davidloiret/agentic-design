import { PatternCard } from './pattern-cards';

export interface HeroClass {
  id: string;
  name: string;
  description: string;
  heroPower: HeroPower;
  startingHealth: number;
  icon: string;
}

export interface HeroPower {
  name: string;
  description: string;
  cost: number;
  effect: CardEffect;
  cooldown?: number;
}

export interface BattleCard extends PatternCard {
  // Battle-specific stats
  cost: number;              // Mana cost to play
  attack: number;            // Attack power
  health: number;            // Current health
  maxHealth: number;         // Maximum health
  
  // Card types
  cardType: 'minion' | 'spell' | 'weapon';
  
  // Battle states
  canAttack: boolean;
  hasAttacked: boolean;
  isFrozen: boolean;
  hasTaunt: boolean;
  hasCharge: boolean;        // Can attack immediately
  hasDivineShield: boolean;
  hasWindfury: boolean;      // Can attack twice
  hasStealth: boolean;
  hasLifesteal: boolean;
  isPoisonous: boolean;
  
  // Buffs/Debuffs
  attackBuff: number;
  healthBuff: number;
  tempAttackBuff: number;    // Lasts until end of turn
  
  // Special effects
  battlecry?: CardEffect;    // When played
  deathrattle?: CardEffect;  // When dies
  endOfTurn?: CardEffect;    // At end of your turn
  startOfTurn?: CardEffect;  // At start of your turn
  onDamaged?: CardEffect;    // When this takes damage
  onAttack?: CardEffect;     // When this attacks
}

export interface CardEffect {
  type: 'damage' | 'heal' | 'draw' | 'summon' | 'buff' | 'debuff' | 
        'destroy' | 'freeze' | 'silence' | 'discover' | 'transform' |
        'addMana' | 'directDamage' | 'aoe';
  target: 'self' | 'enemy' | 'allEnemies' | 'allFriendly' | 'all' | 
          'randomEnemy' | 'randomFriendly' | 'hero' | 'enemyHero';
  value?: number;
  duration?: number;
  condition?: string;
  additionalEffects?: CardEffect[];
}

export interface BattleState {
  // Players
  player1: PlayerState;
  player2: PlayerState;
  
  // Turn management
  currentPlayer: 'player1' | 'player2';
  turnNumber: number;
  turnTimeRemaining: number;
  
  // Game state
  phase: 'mulligan' | 'playing' | 'combat' | 'ended';
  winner?: 'player1' | 'player2';
  
  // Battle log
  history: BattleAction[];
  animations: Animation[];
}

export interface PlayerState {
  // Hero info
  hero: HeroClass;
  health: number;
  armor: number;
  
  // Resources
  mana: number;
  maxMana: number;
  overloadedMana: number;    // Locked next turn
  temporaryMana: number;     // Extra mana this turn only
  
  // Cards
  deck: BattleCard[];
  hand: BattleCard[];
  board: (BattleCard | null)[];  // 7 slots max
  graveyard: BattleCard[];
  
  // Hero power
  heroPowerUsed: boolean;
  heroPowerCost: number;
  
  // Status
  fatigueDamage: number;     // Increases when drawing from empty deck
  spellDamage: number;       // Bonus spell damage
  weaponAttack: number;
  weaponDurability: number;
  
  // Secrets (if implemented)
  secrets: BattleCard[];
}

export interface BattleAction {
  type: 'play_card' | 'attack' | 'hero_power' | 'end_turn' | 
        'discover' | 'target' | 'mulligan';
  playerId: 'player1' | 'player2';
  timestamp: number;
  data: {
    cardId?: string;
    targetId?: string;
    position?: number;
    choice?: number;
  };
}

export interface Animation {
  type: 'card_played' | 'attack' | 'damage' | 'heal' | 'death' | 
        'draw' | 'buff' | 'spell_cast';
  sourceId?: string;
  targetId?: string;
  targetPosition?: number;
  value?: number;
  duration: number;
}

export interface DeckRequirements {
  minCards: number;
  maxCards: number;
  maxCopiesPerCard: number;
  heroClass?: string;
}

export const BATTLE_CONSTANTS = {
  MAX_HAND_SIZE: 10,
  MAX_BOARD_SIZE: 7,
  MAX_MANA: 10,
  STARTING_HAND_SIZE: 3,
  MULLIGAN_TIME: 20,
  TURN_TIME: 75,
  STARTING_HEALTH: 30,
  FATIGUE_DAMAGE_START: 1,
  MAX_SECRETS: 5
};