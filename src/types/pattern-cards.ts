export type PatternRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type PatternType = 'behavioral' | 'structural' | 'creational' | 'cognitive' | 'architectural';
export type PatternElement = 'logic' | 'memory' | 'flow' | 'communication' | 'computation';

export interface PatternStats {
  complexity: number;      // 1-100
  effectiveness: number;   // 1-100
  flexibility: number;     // 1-100
  performance: number;     // 1-100
  scalability: number;     // 1-100
}

export interface PatternAbility {
  name: string;
  description: string;
  cooldown?: number;
  cost?: number;
}

export interface PatternCard {
  id: string;
  name: string;
  description: string;
  image?: string;
  rarity: PatternRarity;
  type: PatternType;
  element: PatternElement;
  stats: PatternStats;
  abilities: PatternAbility[];
  evolution?: {
    from?: string;
    to?: string[];
    requirements?: string[];
  };
  synergies?: string[];
  weaknesses?: string[];
  discovered: boolean;
  owned: boolean;
  level: number;
  experience: number;
  maxExperience: number;
  
  // Hearthstone-style mechanics
  keywords?: {
    taunt?: boolean;
    divineShield?: boolean;
    charge?: boolean;
    windfury?: boolean;
    stealth?: boolean;
    lifesteal?: boolean;
    poisonous?: boolean;
    rush?: boolean;
    reborn?: boolean;
    deathrattle?: boolean;
    battlecry?: boolean;
    discover?: boolean;
    spell_damage?: number;
  };
}

export interface PatternDeck {
  id: string;
  name: string;
  description: string;
  cards: string[]; // Pattern IDs
  maxSize: number;
  createdAt: Date;
  lastModified: Date;
}

export interface PatternCollection {
  discoveredPatterns: Set<string>;
  ownedPatterns: Map<string, PatternCard>;
  decks: PatternDeck[];
  stats: {
    totalDiscovered: number;
    totalOwned: number;
    favoritePattern?: string;
    strongestPattern?: string;
  };
}