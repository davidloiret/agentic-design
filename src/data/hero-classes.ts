import { HeroClass } from '@/types/hearthstone-battle';

export const heroClasses: HeroClass[] = [
  {
    id: 'architect',
    name: 'System Architect',
    description: 'Master of structure and defensive patterns',
    startingHealth: 30,
    icon: '🏗️',
    heroPower: {
      name: 'Fortify',
      description: 'Give a friendly minion +0/+2',
      cost: 2,
      effect: {
        type: 'buff',
        target: 'self',
        value: 2
      }
    }
  },
  {
    id: 'analyst',
    name: 'Data Analyst',
    description: 'Specializes in drawing and discovery',
    startingHealth: 30,
    icon: '📊',
    heroPower: {
      name: 'Analyze',
      description: 'Draw a card',
      cost: 2,
      effect: {
        type: 'draw',
        target: 'self',
        value: 1
      }
    }
  },
  {
    id: 'engineer',
    name: 'ML Engineer',
    description: 'Aggressive patterns with direct damage',
    startingHealth: 30,
    icon: '⚡',
    heroPower: {
      name: 'Compute',
      description: 'Deal 2 damage to any target',
      cost: 2,
      effect: {
        type: 'damage',
        target: 'enemy',
        value: 2
      }
    }
  },
  {
    id: 'researcher',
    name: 'AI Researcher',
    description: 'Complex combos and spell synergies',
    startingHealth: 30,
    icon: '🔬',
    heroPower: {
      name: 'Experiment',
      description: 'Add a random spell to your hand',
      cost: 2,
      effect: {
        type: 'discover',
        target: 'self'
      }
    }
  },
  {
    id: 'optimizer',
    name: 'Performance Optimizer',
    description: 'Buffs and enhancement focused',
    startingHealth: 30,
    icon: '🚀',
    heroPower: {
      name: 'Optimize',
      description: 'Give all friendly minions +1/+1',
      cost: 3,
      effect: {
        type: 'buff',
        target: 'allFriendly',
        value: 1
      }
    }
  },
  {
    id: 'guardian',
    name: 'Security Guardian',
    description: 'Healing and protection patterns',
    startingHealth: 30,
    icon: '🛡️',
    heroPower: {
      name: 'Restore',
      description: 'Restore 3 Health to your hero',
      cost: 2,
      effect: {
        type: 'heal',
        target: 'hero',
        value: 3
      }
    }
  }
];