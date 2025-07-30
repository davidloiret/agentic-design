import { AIChallenge } from '@/types/pattern-game';

export const aiChallenges: AIChallenge[] = [
  {
    id: 'challenge-tutorial',
    name: 'Tutorial: Basic Patterns',
    description: 'Learn the basics of pattern card battles',
    difficulty: 'easy',
    requiredLevel: 1,
    rewards: {
      experience: 100,
      coins: 50,
      patterns: ['scratch-pad']
    },
    opponentDeck: ['working-memory', 'scratch-pad', 'attention-mechanism'],
    specialRules: ['Opponent plays predictably'],
    completed: false
  },
  {
    id: 'challenge-memory-master',
    name: 'Memory Master',
    description: 'Defeat an opponent specializing in memory patterns',
    difficulty: 'easy',
    requiredLevel: 3,
    rewards: {
      experience: 200,
      coins: 100,
      patterns: ['working-memory']
    },
    opponentDeck: ['working-memory', 'scratch-pad', 'attention-mechanism', 'working-memory'],
    completed: false
  },
  {
    id: 'challenge-logical-thinking',
    name: 'Logical Reasoning',
    description: 'Face an AI that excels at logical reasoning patterns',
    difficulty: 'medium',
    requiredLevel: 5,
    rewards: {
      experience: 300,
      coins: 150,
      patterns: ['cot-pattern']
    },
    opponentDeck: ['cot-pattern', 'reflection-pattern', 'working-memory', 'attention-mechanism'],
    completed: false
  },
  {
    id: 'challenge-adaptive-ai',
    name: 'Adaptive Intelligence',
    description: 'Battle against an AI that learns and adapts its strategy',
    difficulty: 'medium',
    requiredLevel: 8,
    rewards: {
      experience: 400,
      coins: 200,
      patterns: ['react-pattern']
    },
    opponentDeck: ['react-pattern', 'cot-pattern', 'reflection-pattern', 'attention-mechanism', 'working-memory'],
    completed: false
  },
  {
    id: 'challenge-tree-explorer',
    name: 'Branch Explorer',
    description: 'Overcome an AI that explores multiple solution paths',
    difficulty: 'hard',
    requiredLevel: 12,
    rewards: {
      experience: 600,
      coins: 300,
      patterns: ['tree-of-thought']
    },
    opponentDeck: ['tree-of-thought', 'monte-carlo', 'cot-pattern', 'react-pattern', 'attention-mechanism'],
    specialRules: ['Opponent starts with +1 Memory'],
    completed: false
  },
  {
    id: 'challenge-probabilistic',
    name: 'Probability Master',
    description: 'Defeat an AI that uses probabilistic reasoning',
    difficulty: 'hard',
    requiredLevel: 15,
    rewards: {
      experience: 800,
      coins: 400,
      patterns: ['monte-carlo']
    },
    opponentDeck: ['monte-carlo', 'tree-of-thought', 'react-pattern', 'reflection-pattern', 'attention-mechanism'],
    specialRules: ['Random effects are more powerful'],
    completed: false
  },
  {
    id: 'challenge-multiagent',
    name: 'Consensus Builder',
    description: 'Face multiple AI personalities working together',
    difficulty: 'expert',
    requiredLevel: 20,
    rewards: {
      experience: 1200,
      coins: 600,
      patterns: ['multiagent-debate']
    },
    opponentDeck: ['multiagent-debate', 'tree-of-thought', 'monte-carlo', 'react-pattern', 'cot-pattern'],
    specialRules: ['Opponent draws 2 cards per turn'],
    completed: false
  },
  {
    id: 'challenge-memory-palace',
    name: 'The Grand Archive',
    description: 'Challenge the keeper of the legendary Memory Palace',
    difficulty: 'expert',
    requiredLevel: 25,
    rewards: {
      experience: 2000,
      coins: 1000,
      patterns: ['memory-palace']
    },
    opponentDeck: ['memory-palace', 'multiagent-debate', 'tree-of-thought', 'monte-carlo', 'attention-mechanism'],
    specialRules: ['Opponent has perfect information', 'No hand size limit for opponent'],
    completed: false
  }
];

export class AIOpponent {
  private difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  
  constructor(difficulty: 'easy' | 'medium' | 'hard' | 'expert') {
    this.difficulty = difficulty;
  }

  getNextAction(gameState: any): any {
    const difficultyMultiplier = {
      easy: 0.3,
      medium: 0.6,
      hard: 0.85,
      expert: 0.95
    };

    const shouldMakeOptimalMove = Math.random() < difficultyMultiplier[this.difficulty];

    if (!shouldMakeOptimalMove && this.difficulty !== 'expert') {
      return this.getRandomAction(gameState);
    }

    return this.getOptimalAction(gameState);
  }

  private getRandomAction(gameState: any): any {
    const possibleActions = this.getAllPossibleActions(gameState);
    if (possibleActions.length === 0) {
      return { type: 'end_turn', playerId: 'opponent' };
    }
    return possibleActions[Math.floor(Math.random() * possibleActions.length)];
  }

  private getOptimalAction(gameState: any): any {
    const hand = gameState.board.opponent.hand;
    const field = gameState.board.opponent.field;
    const resources = gameState.resources.opponent;

    // Try to play cards first
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      const memoryCost = Math.ceil(card.stats.complexity / 20);
      
      if (resources.memory >= memoryCost) {
        const emptyPosition = field.findIndex(slot => slot === null);
        if (emptyPosition !== -1) {
          return {
            type: 'play_card',
            playerId: 'opponent',
            data: {
              cardId: card.id,
              toPosition: emptyPosition
            }
          };
        }
      }
    }

    // Try to attack
    const attackers = field.filter(card => card && !card.exhausted);
    const targets = gameState.board.player.field.filter(card => card !== null);

    if (attackers.length > 0 && targets.length > 0) {
      const strongestAttacker = attackers.reduce((best, current) => 
        current.currentAttack > best.currentAttack ? current : best
      );
      const weakestTarget = targets.reduce((weakest, current) => 
        current.currentHealth < weakest.currentHealth ? current : weakest
      );

      return {
        type: 'attack',
        playerId: 'opponent',
        data: {
          cardId: strongestAttacker.id,
          targetId: weakestTarget.id
        }
      };
    }

    // Use abilities if possible
    const abilityUsers = field.filter(card => card && !card.exhausted && card.abilities.length > 0);
    if (abilityUsers.length > 0 && resources.computation >= 1) {
      return {
        type: 'use_ability',
        playerId: 'opponent',
        data: {
          cardId: abilityUsers[0].id,
          abilityIndex: 0
        }
      };
    }

    return { type: 'end_turn', playerId: 'opponent' };
  }

  private getAllPossibleActions(gameState: any): any[] {
    const actions: any[] = [];
    const hand = gameState.board.opponent.hand;
    const field = gameState.board.opponent.field;
    const resources = gameState.resources.opponent;

    // Add possible card plays
    hand.forEach(card => {
      const memoryCost = Math.ceil(card.stats.complexity / 20);
      if (resources.memory >= memoryCost) {
        field.forEach((slot, index) => {
          if (slot === null) {
            actions.push({
              type: 'play_card',
              playerId: 'opponent',
              data: { cardId: card.id, toPosition: index }
            });
          }
        });
      }
    });

    // Add possible attacks
    field.forEach(attacker => {
      if (attacker && !attacker.exhausted) {
        gameState.board.player.field.forEach(target => {
          if (target) {
            actions.push({
              type: 'attack',
              playerId: 'opponent',
              data: { cardId: attacker.id, targetId: target.id }
            });
          }
        });
      }
    });

    return actions;
  }
}