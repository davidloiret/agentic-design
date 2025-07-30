import { PatternCard, PatternRarity, PatternType, PatternElement } from '@/types/pattern-cards';

export const patternCardsData: PatternCard[] = [
  {
    id: 'cot-pattern',
    name: 'Chain of Thought',
    description: 'Break down complex problems into sequential reasoning steps',
    rarity: 'rare',
    type: 'cognitive',
    element: 'logic',
    stats: {
      complexity: 65,
      effectiveness: 85,
      flexibility: 70,
      performance: 60,
      scalability: 75
    },
    abilities: [
      {
        name: 'Sequential Analysis',
        description: 'Process problems step-by-step with clear reasoning'
      },
      {
        name: 'Thought Tracing',
        description: 'Track and visualize the reasoning process'
      }
    ],
    evolution: {
      to: ['tree-of-thought', 'graph-of-thought']
    },
    synergies: ['self-reflection', 'working-memory'],
    weaknesses: ['parallel-processing'],
    discovered: true,
    owned: true,
    level: 15,
    experience: 450,
    maxExperience: 1000
  },
  {
    id: 'tree-of-thought',
    name: 'Tree of Thought',
    description: 'Explore multiple reasoning branches simultaneously',
    rarity: 'epic',
    type: 'cognitive',
    element: 'logic',
    stats: {
      complexity: 80,
      effectiveness: 90,
      flexibility: 85,
      performance: 55,
      scalability: 70
    },
    abilities: [
      {
        name: 'Branch Exploration',
        description: 'Evaluate multiple solution paths in parallel'
      },
      {
        name: 'Pruning',
        description: 'Eliminate ineffective branches early'
      },
      {
        name: 'Best Path Selection',
        description: 'Choose optimal solution from explored branches'
      }
    ],
    evolution: {
      from: 'cot-pattern',
      to: ['graph-of-thought']
    },
    synergies: ['monte-carlo', 'beam-search'],
    weaknesses: ['memory-intensive'],
    discovered: true,
    owned: false,
    level: 1,
    experience: 0,
    maxExperience: 1500
  },
  {
    id: 'working-memory',
    name: 'Working Memory',
    description: 'Maintain active context for complex operations',
    rarity: 'common',
    type: 'behavioral',
    element: 'memory',
    stats: {
      complexity: 45,
      effectiveness: 70,
      flexibility: 80,
      performance: 75,
      scalability: 60
    },
    abilities: [
      {
        name: 'Context Retention',
        description: 'Keep relevant information readily accessible'
      },
      {
        name: 'Quick Recall',
        description: 'Rapidly access stored information'
      }
    ],
    synergies: ['cot-pattern', 'attention-mechanism'],
    weaknesses: ['capacity-limited'],
    discovered: true,
    owned: true,
    level: 8,
    experience: 320,
    maxExperience: 500
  },
  {
    id: 'reflection-pattern',
    name: 'Self-Reflection',
    description: 'Analyze and improve own outputs iteratively',
    rarity: 'uncommon',
    type: 'cognitive',
    element: 'logic',
    stats: {
      complexity: 55,
      effectiveness: 80,
      flexibility: 75,
      performance: 65,
      scalability: 70
    },
    abilities: [
      {
        name: 'Output Analysis',
        description: 'Critically evaluate generated responses'
      },
      {
        name: 'Iterative Improvement',
        description: 'Refine outputs based on self-critique'
      }
    ],
    evolution: {
      to: ['meta-reflection', 'recursive-reflection']
    },
    synergies: ['cot-pattern', 'critic-pattern'],
    discovered: true,
    owned: true,
    level: 12,
    experience: 800,
    maxExperience: 1000
  },
  {
    id: 'react-pattern',
    name: 'ReAct',
    description: 'Combine reasoning with action for dynamic problem solving',
    rarity: 'rare',
    type: 'behavioral',
    element: 'flow',
    stats: {
      complexity: 70,
      effectiveness: 88,
      flexibility: 85,
      performance: 70,
      scalability: 75
    },
    abilities: [
      {
        name: 'Thought-Action Loop',
        description: 'Alternate between thinking and acting'
      },
      {
        name: 'Environmental Interaction',
        description: 'Take actions based on reasoning'
      },
      {
        name: 'Adaptive Planning',
        description: 'Adjust strategy based on action results'
      }
    ],
    synergies: ['tool-use', 'planning-pattern'],
    weaknesses: ['sequential-bottleneck'],
    discovered: true,
    owned: false,
    level: 1,
    experience: 0,
    maxExperience: 1200
  },
  {
    id: 'multiagent-debate',
    name: 'Multi-Agent Debate',
    description: 'Multiple agents discuss to reach consensus',
    rarity: 'epic',
    type: 'structural',
    element: 'communication',
    stats: {
      complexity: 85,
      effectiveness: 92,
      flexibility: 75,
      performance: 45,
      scalability: 80
    },
    abilities: [
      {
        name: 'Perspective Diversity',
        description: 'Generate multiple viewpoints on problems'
      },
      {
        name: 'Consensus Building',
        description: 'Reach agreement through structured debate'
      },
      {
        name: 'Conflict Resolution',
        description: 'Resolve disagreements constructively'
      }
    ],
    synergies: ['voting-pattern', 'role-play'],
    weaknesses: ['coordination-overhead'],
    discovered: false,
    owned: false,
    level: 1,
    experience: 0,
    maxExperience: 2000
  },
  {
    id: 'memory-palace',
    name: 'Memory Palace',
    description: 'Spatial organization of information for enhanced recall',
    rarity: 'legendary',
    type: 'cognitive',
    element: 'memory',
    stats: {
      complexity: 90,
      effectiveness: 95,
      flexibility: 80,
      performance: 60,
      scalability: 85
    },
    abilities: [
      {
        name: 'Spatial Encoding',
        description: 'Map information to spatial locations'
      },
      {
        name: 'Perfect Recall',
        description: 'Retrieve any stored information instantly'
      },
      {
        name: 'Infinite Expansion',
        description: 'Continuously add new memory rooms'
      },
      {
        name: 'Cross-Reference',
        description: 'Link related memories across locations'
      }
    ],
    evolution: {
      from: 'working-memory'
    },
    synergies: ['knowledge-graph', 'semantic-memory'],
    discovered: false,
    owned: false,
    level: 1,
    experience: 0,
    maxExperience: 3000
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo Tree Search',
    description: 'Probabilistic exploration of solution spaces',
    rarity: 'rare',
    type: 'architectural',
    element: 'computation',
    stats: {
      complexity: 75,
      effectiveness: 85,
      flexibility: 70,
      performance: 50,
      scalability: 90
    },
    abilities: [
      {
        name: 'Random Sampling',
        description: 'Explore solution space through random walks'
      },
      {
        name: 'Statistical Evaluation',
        description: 'Use statistics to guide exploration'
      },
      {
        name: 'Convergence',
        description: 'Gradually focus on promising areas'
      }
    ],
    synergies: ['tree-of-thought', 'exploration-exploitation'],
    discovered: true,
    owned: false,
    level: 1,
    experience: 0,
    maxExperience: 1300
  },
  {
    id: 'attention-mechanism',
    name: 'Attention Mechanism',
    description: 'Focus computational resources on relevant information',
    rarity: 'uncommon',
    type: 'structural',
    element: 'flow',
    stats: {
      complexity: 60,
      effectiveness: 82,
      flexibility: 88,
      performance: 78,
      scalability: 85
    },
    abilities: [
      {
        name: 'Selective Focus',
        description: 'Concentrate on most relevant inputs'
      },
      {
        name: 'Dynamic Weighting',
        description: 'Adjust importance of different inputs'
      }
    ],
    evolution: {
      to: ['multi-head-attention', 'cross-attention']
    },
    synergies: ['working-memory', 'transformer-pattern'],
    discovered: true,
    owned: true,
    level: 20,
    experience: 1800,
    maxExperience: 2000
  },
  {
    id: 'scratch-pad',
    name: 'Scratch Pad',
    description: 'External memory for intermediate calculations',
    rarity: 'common',
    type: 'behavioral',
    element: 'memory',
    stats: {
      complexity: 35,
      effectiveness: 65,
      flexibility: 90,
      performance: 85,
      scalability: 70
    },
    abilities: [
      {
        name: 'Note Taking',
        description: 'Record intermediate thoughts and calculations'
      },
      {
        name: 'Reference Back',
        description: 'Retrieve previous notes when needed'
      }
    ],
    synergies: ['cot-pattern', 'working-memory'],
    discovered: true,
    owned: true,
    level: 5,
    experience: 200,
    maxExperience: 400
  }
];