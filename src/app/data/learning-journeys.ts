// Comprehensive Learning Journeys for AI Engineering Mastery
// Three distinct paths: Prompting, Agentic Patterns, and AI Red Teaming

export interface Journey {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalXpReward: number;
  chapters: Chapter[];
  prerequisites?: string[];
  badge?: Badge;
  isLocked?: boolean;
  unlockRequirements?: {
    level?: number;
    completedJourneys?: string[];
    achievements?: string[];
  };
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isLocked?: boolean;
  unlockAfter?: string; // chapter id to complete before this
  xpReward: number;
  estimatedTime: number; // in minutes
  badge?: Badge;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'flashcard' | 'quiz' | 'code' | 'pattern-select' | 'case-study' | 'sandbox';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  estimatedTime: number; // in minutes
  content?: any; // Different content based on type
  challenges?: string[]; // IDs of challenges
  completed?: boolean;
  score?: number;
  achievements?: string[]; // achievements that can be unlocked
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  xpBonus?: number;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  requirement: {
    type: 'xp' | 'chapters_completed' | 'perfect_scores' | 'streak' | 'time_limit';
    value: number;
  };
  rewards: {
    xp?: number;
    badges?: string[];
    unlocks?: string[]; // journey or chapter IDs
  };
}

// Journey 1: Master Prompting
export const promptingJourney: Journey = {
  id: 'master-prompting',
  title: 'Master Prompting',
  description: 'Learn the art and science of crafting effective prompts, from basics to advanced techniques',
  icon: 'MessageSquare',
  color: 'blue',
  totalXpReward: 1260,
  chapters: [
    {
      id: 'prompting-fundamentals',
      title: 'Prompting Fundamentals',
      description: 'Master the basics of prompt engineering',
      order: 1,
      xpReward: 150,
      estimatedTime: 45,
      lessons: [
        {
          id: 'what-is-prompting',
          title: 'Introduction to Prompt Engineering',
          description: 'Understand what prompts are and why they matter',
          type: 'theory',
          difficulty: 'beginner',
          xpReward: 50,
          estimatedTime: 10,
        },
        {
          id: 'prompt-components',
          title: 'Anatomy of a Good Prompt',
          description: 'Learn the key components that make prompts effective',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 40,
          estimatedTime: 15,
          challenges: ['prompt-components-flashcards']
        },
        {
          id: 'basic-techniques-quiz',
          title: 'Basic Prompting Techniques Quiz',
          description: 'Test your understanding of fundamental concepts',
          type: 'quiz',
          difficulty: 'beginner',
          xpReward: 60,
          estimatedTime: 20,
          challenges: ['basic-prompting-quiz']
        }
      ]
    },
    {
      id: 'prompt-patterns',
      title: 'Essential Prompt Patterns',
      description: 'Learn proven patterns for consistent results',
      order: 2,
      xpReward: 280,
      estimatedTime: 60,
      unlockAfter: 'prompting-fundamentals',
      lessons: [
        {
          id: 'zero-shot-prompting',
          title: 'Zero-Shot Prompting',
          description: 'Master prompting without examples',
          type: 'theory',
          difficulty: 'beginner',
          xpReward: 60,
          estimatedTime: 15,
        },
        {
          id: 'few-shot-prompting',
          title: 'Few-Shot Learning',
          description: 'Leverage examples for better results',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['implement-few-shot']
        },
        {
          id: 'chain-of-thought',
          title: 'Chain of Thought Prompting',
          description: 'Guide AI through step-by-step reasoning',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 120,
          estimatedTime: 35,
          challenges: ['implement-cot-prompt']
        }
      ]
    },
    {
      id: 'advanced-prompting',
      title: 'Advanced Prompting Techniques',
      description: 'Master sophisticated prompting strategies',
      order: 3,
      xpReward: 350,
      estimatedTime: 90,
      unlockAfter: 'prompt-patterns',
      lessons: [
        {
          id: 'role-prompting',
          title: 'Role-Based Prompting',
          description: 'Assign personas and expertise for better outputs',
          type: 'pattern-select',
          difficulty: 'intermediate',
          xpReward: 80,
          estimatedTime: 25,
          challenges: ['role-prompting-scenarios']
        },
        {
          id: 'prompt-chaining',
          title: 'Prompt Chaining & Orchestration',
          description: 'Connect multiple prompts for complex tasks',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 45,
          challenges: ['build-prompt-chain']
        },
        {
          id: 'self-consistency',
          title: 'Self-Consistency & Verification',
          description: 'Implement verification and consistency checks',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 120,
          estimatedTime: 40,
          challenges: ['implement-self-consistency']
        }
      ]
    },
    {
      id: 'prompt-optimization',
      title: 'Prompt Optimization & Testing',
      description: 'Learn to measure and improve prompt performance',
      order: 4,
      xpReward: 480,
      estimatedTime: 120,
      unlockAfter: 'advanced-prompting',
      badge: {
        id: 'prompt-engineer',
        name: 'Prompt Engineer',
        description: 'Master of prompt crafting and optimization',
        icon: 'Award',
        rarity: 'epic'
      },
      lessons: [
        {
          id: 'prompt-metrics',
          title: 'Measuring Prompt Effectiveness',
          description: 'Learn key metrics for prompt evaluation',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 100,
          estimatedTime: 30,
        },
        {
          id: 'a-b-testing',
          title: 'A/B Testing Prompts',
          description: 'Systematically compare prompt variations',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['implement-prompt-testing']
        },
        {
          id: 'prompt-templates',
          title: 'Building Reusable Prompt Templates',
          description: 'Create scalable prompt systems',
          type: 'sandbox',
          difficulty: 'expert',
          xpReward: 200,
          estimatedTime: 60,
          challenges: ['build-prompt-library']
        }
      ]
    }
  ]
};

// Journey 2: Master Agentic Patterns
export const agenticPatternsJourney: Journey = {
  id: 'master-agentic-patterns',
  title: 'Master Agentic Patterns',
  description: 'Build sophisticated AI agents using proven architectural patterns',
  icon: 'Brain',
  color: 'purple',
  totalXpReward: 3500,
  chapters: [
    {
      id: 'agent-fundamentals',
      title: 'AI Agent Fundamentals',
      description: 'Understand the core concepts of AI agents',
      order: 1,
      xpReward: 350,
      estimatedTime: 60,
      lessons: [
        {
          id: 'what-are-agents',
          title: 'Introduction to AI Agents',
          description: 'Learn what makes an AI system "agentic"',
          type: 'theory',
          difficulty: 'beginner',
          xpReward: 60,
          estimatedTime: 15,
        },
        {
          id: 'agent-components',
          title: 'Core Agent Components',
          description: 'Understand memory, tools, planning, and execution',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 50,
          estimatedTime: 20,
          challenges: ['agent-components-flashcards']
        },
        {
          id: 'agent-fundamentals-quiz',
          title: 'AI Agent Fundamentals Quiz',
          description: 'Test your understanding of AI agent concepts',
          type: 'quiz',
          difficulty: 'beginner',
          xpReward: 80,
          estimatedTime: 15,
          challenges: ['agent-fundamentals-quiz']
        },
        {
          id: 'simple-agent',
          title: 'Build Your First Agent',
          description: 'Create a basic reactive agent',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 140,
          estimatedTime: 45,
          challenges: ['build-simple-agent']
        }
      ]
    },
    {
      id: 'agent-architectures',
      title: 'Agent Architectures',
      description: 'Explore different architectural patterns for AI agents',
      order: 2,
      xpReward: 450,
      estimatedTime: 90,
      unlockAfter: 'agent-fundamentals',
      lessons: [
        {
          id: 'architecture-patterns',
          title: 'Common Agent Architectures',
          description: 'Learn about BDI, Subsumption, Hybrid, and other architectures',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 60,
          estimatedTime: 25,
          challenges: ['agent-architectures-flashcards']
        },
        {
          id: 'architecture-quiz',
          title: 'Agent Architectures Quiz',
          description: 'Test your knowledge of different agent architectures',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 90,
          estimatedTime: 20,
          challenges: ['agent-architectures-quiz']
        },
        {
          id: 'implement-bdi',
          title: 'Implement a BDI Agent',
          description: 'Build a Belief-Desire-Intention agent',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 45,
          challenges: ['implement-bdi-agent']
        }
      ]
    },
    {
      id: 'reasoning-patterns',
      title: 'Advanced Reasoning Patterns',
      description: 'Implement sophisticated reasoning techniques',
      order: 3,
      xpReward: 500,
      estimatedTime: 120,
      unlockAfter: 'agent-architectures',
      lessons: [
        {
          id: 'react-pattern',
          title: 'ReAct: Reasoning and Acting',
          description: 'Combine reasoning with action execution',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 150,
          estimatedTime: 40,
          challenges: ['implement-react-agent']
        },
        {
          id: 'tree-of-thoughts',
          title: 'Tree of Thoughts Implementation',
          description: 'Build agents that explore multiple reasoning paths',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['implement-tot-agent']
        },
        {
          id: 'graph-of-thought',
          title: 'Graph of Thought Architecture',
          description: 'Create non-linear reasoning systems',
          type: 'code',
          difficulty: 'expert',
          xpReward: 200,
          estimatedTime: 60,
          challenges: ['implement-got-system']
        }
      ]
    },
    {
      id: 'multi-agent-systems',
      title: 'Multi-Agent Orchestration',
      description: 'Build systems with multiple cooperating agents',
      order: 4,
      xpReward: 600,
      estimatedTime: 150,
      unlockAfter: 'reasoning-patterns',
      lessons: [
        {
          id: 'agent-communication',
          title: 'Inter-Agent Communication',
          description: 'Design protocols for agent collaboration',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 100,
          estimatedTime: 30,
        },
        {
          id: 'delegation-patterns',
          title: 'Task Delegation Patterns',
          description: 'Implement hierarchical agent systems',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['build-delegation-system']
        },
        {
          id: 'consensus-mechanisms',
          title: 'Agent Consensus & Voting',
          description: 'Build democratic multi-agent decisions',
          type: 'code',
          difficulty: 'expert',
          xpReward: 220,
          estimatedTime: 70,
          challenges: ['implement-consensus']
        }
      ]
    },
    {
      id: 'production-agents',
      title: 'Production-Ready Agents',
      description: 'Build robust, scalable agent systems',
      order: 4,
      xpReward: 800,
      estimatedTime: 180,
      unlockAfter: 'multi-agent-systems',
      badge: {
        id: 'agent-architect',
        name: 'Agent Architect',
        description: 'Master of agentic system design',
        icon: 'Trophy',
        rarity: 'legendary'
      },
      lessons: [
        {
          id: 'agent-memory',
          title: 'Advanced Memory Systems',
          description: 'Implement long-term and working memory',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 200,
          estimatedTime: 60,
          challenges: ['build-memory-system']
        },
        {
          id: 'tool-integration',
          title: 'Tool Use & Function Calling',
          description: 'Integrate external tools and APIs',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['implement-tool-use']
        },
        {
          id: 'agent-monitoring',
          title: 'Monitoring & Debugging Agents',
          description: 'Build observability into agent systems',
          type: 'case-study',
          difficulty: 'expert',
          xpReward: 220,
          estimatedTime: 70,
          challenges: ['agent-monitoring-case']
        }
      ]
    }
  ]
};

// Journey 3: Master AI Red Teaming
export const redTeamingJourney: Journey = {
  id: 'master-red-teaming',
  title: 'Master AI Red Teaming',
  description: 'Learn to evaluate, test, and improve AI system safety and robustness',
  icon: 'Shield',
  color: 'red',
  totalXpReward: 4000,
  unlockRequirements: {
    level: 5,
    completedJourneys: ['master-prompting']
  },
  chapters: [
    {
      id: 'red-team-basics',
      title: 'Red Teaming Fundamentals',
      description: 'Understand the principles of AI safety testing',
      order: 1,
      xpReward: 400,
      estimatedTime: 75,
      lessons: [
        {
          id: 'what-is-red-teaming',
          title: 'Introduction to AI Red Teaming',
          description: 'Learn the goals and methods of red teaming',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 80,
          estimatedTime: 20,
        },
        {
          id: 'threat-modeling',
          title: 'AI Threat Modeling',
          description: 'Identify potential vulnerabilities and attack vectors',
          type: 'pattern-select',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['threat-modeling-exercise']
        },
        {
          id: 'basic-probing',
          title: 'Basic Prompt Injection',
          description: 'Learn fundamental testing techniques',
          type: 'sandbox',
          difficulty: 'intermediate',
          xpReward: 120,
          estimatedTime: 40,
          challenges: ['basic-injection-sandbox']
        }
      ]
    },
    {
      id: 'adversarial-prompting',
      title: 'Adversarial Prompting Techniques',
      description: 'Master advanced techniques for finding vulnerabilities',
      order: 2,
      xpReward: 600,
      estimatedTime: 120,
      unlockAfter: 'red-team-basics',
      lessons: [
        {
          id: 'jailbreaking',
          title: 'Jailbreaking Techniques',
          description: 'Learn methods to bypass safety measures',
          type: 'case-study',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 40,
          challenges: ['jailbreak-case-studies']
        },
        {
          id: 'indirect-injection',
          title: 'Indirect Prompt Injection',
          description: 'Exploit third-party content vulnerabilities',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['implement-indirect-injection']
        },
        {
          id: 'multi-turn-attacks',
          title: 'Multi-Turn Attack Strategies',
          description: 'Develop sophisticated conversation-based attacks',
          type: 'sandbox',
          difficulty: 'expert',
          xpReward: 200,
          estimatedTime: 60,
          challenges: ['multi-turn-sandbox']
        }
      ]
    },
    {
      id: 'defensive-techniques',
      title: 'Building Robust Defenses',
      description: 'Learn to protect AI systems from attacks',
      order: 3,
      xpReward: 700,
      estimatedTime: 150,
      unlockAfter: 'adversarial-prompting',
      lessons: [
        {
          id: 'input-validation',
          title: 'Advanced Input Validation',
          description: 'Build robust input filtering systems',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 160,
          estimatedTime: 45,
          challenges: ['build-input-validator']
        },
        {
          id: 'output-monitoring',
          title: 'Output Monitoring & Filtering',
          description: 'Detect and prevent harmful outputs',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 50,
          challenges: ['implement-output-monitor']
        },
        {
          id: 'defense-in-depth',
          title: 'Defense in Depth Strategies',
          description: 'Layer multiple security measures',
          type: 'case-study',
          difficulty: 'expert',
          xpReward: 220,
          estimatedTime: 70,
          challenges: ['defense-architecture-case']
        }
      ]
    },
    {
      id: 'automated-testing',
      title: 'Automated Red Team Systems',
      description: 'Build systems that automatically test AI safety',
      order: 4,
      xpReward: 900,
      estimatedTime: 200,
      unlockAfter: 'defensive-techniques',
      badge: {
        id: 'ai-guardian',
        name: 'AI Guardian',
        description: 'Expert in AI safety and security',
        icon: 'Shield',
        rarity: 'mythic',
        xpBonus: 500
      },
      lessons: [
        {
          id: 'fuzzing-systems',
          title: 'AI Fuzzing Frameworks',
          description: 'Build automated vulnerability discovery',
          type: 'code',
          difficulty: 'expert',
          xpReward: 250,
          estimatedTime: 70,
          challenges: ['build-ai-fuzzer']
        },
        {
          id: 'benchmark-creation',
          title: 'Safety Benchmark Design',
          description: 'Create comprehensive evaluation suites',
          type: 'code',
          difficulty: 'expert',
          xpReward: 220,
          estimatedTime: 60,
          challenges: ['design-safety-benchmark']
        },
        {
          id: 'red-team-automation',
          title: 'Full Red Team Automation',
          description: 'Build end-to-end testing pipelines',
          type: 'sandbox',
          difficulty: 'expert',
          xpReward: 300,
          estimatedTime: 90,
          challenges: ['automated-red-team-system']
        }
      ]
    }
  ]
};

// Gamification Elements
export const achievements = {
  // Journey Completion
  promptMaster: {
    id: 'prompt-master',
    name: 'Prompt Master',
    description: 'Complete the Master Prompting journey',
    icon: 'MessageSquare',
    xpReward: 500,
    rarity: 'epic'
  },
  agentArchitect: {
    id: 'agent-architect', 
    name: 'Agent Architect',
    description: 'Complete the Master Agentic Patterns journey',
    icon: 'Brain',
    xpReward: 750,
    rarity: 'legendary'
  },
  aiGuardian: {
    id: 'ai-guardian',
    name: 'AI Guardian',
    description: 'Complete the Master AI Red Teaming journey',
    icon: 'Shield',
    xpReward: 1000,
    rarity: 'mythic'
  },
  
  // Speed Achievements
  speedrunner: {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Complete a chapter in under 30 minutes',
    icon: 'Zap',
    xpReward: 200,
    rarity: 'rare'
  },
  
  // Perfection Achievements
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% on 10 quizzes',
    icon: 'Star',
    xpReward: 300,
    rarity: 'epic'
  },
  
  // Streak Achievements
  consistent: {
    id: 'consistent',
    name: 'Consistent Learner',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    xpReward: 150,
    rarity: 'rare'
  },
  dedicated: {
    id: 'dedicated',
    name: 'Dedicated Scholar',
    description: 'Maintain a 30-day learning streak',
    icon: 'Flame',
    xpReward: 500,
    rarity: 'legendary'
  },
  
  // Special Achievements
  polymath: {
    id: 'polymath',
    name: 'AI Polymath',
    description: 'Complete all three journeys',
    icon: 'Trophy',
    xpReward: 2000,
    rarity: 'mythic'
  },
  earlyBird: {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete lessons before 8 AM',
    icon: 'Sun',
    xpReward: 100,
    rarity: 'common'
  },
  nightOwl: {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete lessons after midnight',
    icon: 'Moon',
    xpReward: 100,
    rarity: 'common'
  }
};

// Leaderboard Categories
export const leaderboardCategories = [
  { id: 'overall', name: 'Overall XP', icon: 'Trophy' },
  { id: 'weekly', name: 'Weekly Progress', icon: 'TrendingUp' },
  { id: 'streaks', name: 'Longest Streaks', icon: 'Flame' },
  { id: 'perfection', name: 'Perfect Scores', icon: 'Star' },
  { id: 'speed', name: 'Fastest Completions', icon: 'Zap' }
];

// Journey Progression Rules
export const progressionRules = {
  chapterUnlock: 'complete_previous', // or 'xp_threshold', 'time_gate'
  lessonOrder: 'sequential', // or 'free'
  retryPolicy: 'unlimited', // or 'limited', 'time_penalty'
  scoreWeighting: {
    quiz: 1.0,
    code: 1.5,
    caseStudy: 2.0,
    sandbox: 2.5
  }
};

// Journey 4: Master Knowledge Representation
export const knowledgeRepresentationJourney: Journey = {
  id: 'master-knowledge-representation',
  title: 'Master Knowledge Representation',
  description: 'Build foundational understanding of how to structure and represent knowledge in AI systems',
  icon: 'Brain',
  color: 'green',
  totalXpReward: 5520,
  chapters: [
    {
      id: 'set-theory-basics',
      title: 'Set Theory Basics',
      description: 'Master the fundamentals of sets and set operations',
      order: 1,
      xpReward: 620,
      estimatedTime: 185,
      lessons: [
        {
          id: 'what-are-sets',
          title: 'Introduction to Sets',
          description: 'Understand what sets are and their core properties',
          type: 'theory',
          difficulty: 'beginner',
          xpReward: 50,
          estimatedTime: 15,
        },
        {
          id: 'set-notation-flashcards',
          title: 'Set Notation & Terminology',
          description: 'Learn standard set notation and terminology',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 60,
          estimatedTime: 20,
          challenges: ['set-notation-flashcards']
        },
        {
          id: 'set-operations',
          title: 'Set Operations',
          description: 'Master union, intersection, difference, and complement',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['set-operations-flashcards']
        },
        {
          id: 'set-theory-quiz',
          title: 'Set Theory Fundamentals Quiz',
          description: 'Test your understanding of basic set theory',
          type: 'quiz',
          difficulty: 'beginner',
          xpReward: 80,
          estimatedTime: 30,
          challenges: ['set-theory-fundamentals-quiz']
        },
        {
          id: 'subsets-powersets-theory',
          title: 'Subsets and Power Sets: Theory',
          description: 'Understand subset relationships and the power set concept',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 90,
          estimatedTime: 35,
        },
        {
          id: 'subsets-powersets',
          title: 'Subsets and Power Sets: Implementation',
          description: 'Implement power set generation and subset operations',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 40,
          challenges: ['implement-powerset']
        },
        {
          id: 'cartesian-products-theory',
          title: 'Cartesian Products: Theory',
          description: 'Understand how sets combine to form ordered pairs and products',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 70,
          estimatedTime: 20,
        },
        {
          id: 'cartesian-products',
          title: 'Cartesian Products: Implementation',
          description: 'Implement Cartesian product operations in code',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 45,
          challenges: ['cartesian-product-challenge']
        }
      ]
    },
    {
      id: 'graph-theory-fundamentals',
      title: 'Graph Theory Fundamentals',
      description: 'Learn how graphs represent relationships and structures',
      order: 2,
      xpReward: 580,
      estimatedTime: 190,
      unlockAfter: 'set-theory-basics',
      lessons: [
        {
          id: 'what-are-graphs',
          title: 'Introduction to Graphs',
          description: 'Understand vertices, edges, and basic graph concepts',
          type: 'theory',
          difficulty: 'beginner',
          xpReward: 60,
          estimatedTime: 20,
        },
        {
          id: 'graph-types',
          title: 'Types of Graphs',
          description: 'Learn directed, undirected, weighted, and special graphs',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['graph-types-flashcards']
        },
        {
          id: 'graph-terminology',
          title: 'Graph Terminology',
          description: 'Master degree, paths, cycles, and connectivity',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 80,
          estimatedTime: 30,
          challenges: ['graph-terminology-flashcards']
        },
        {
          id: 'graph-representations',
          title: 'Graph Representations',
          description: 'Implement adjacency matrix and adjacency list',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 120,
          estimatedTime: 50,
          challenges: ['implement-graph-representations']
        },
        {
          id: 'graph-algorithms-basics',
          title: 'Basic Graph Algorithms',
          description: 'Learn traversal and shortest path algorithms',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 60,
          challenges: ['graph-traversal-challenge']
        },
        {
          id: 'graph-theory-quiz',
          title: 'Graph Theory Mastery Quiz',
          description: 'Test your complete graph theory knowledge',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 35,
          challenges: ['graph-theory-quiz']
        }
      ]
    },
    {
      id: 'logic-and-relations',
      title: 'Logic and Relations',
      description: 'Master logical reasoning and relational structures',
      order: 3,
      xpReward: 720,
      estimatedTime: 180,
      unlockAfter: 'graph-theory-fundamentals',
      lessons: [
        {
          id: 'propositional-logic',
          title: 'Propositional Logic Basics',
          description: 'Learn logical operators and truth tables',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['propositional-logic-flashcards']
        },
        {
          id: 'first-order-logic',
          title: 'First-Order Logic & Predicates',
          description: 'Master quantifiers, predicates, and formal reasoning',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 90,
          estimatedTime: 35,
        },
        {
          id: 'logic-quiz',
          title: 'Logic Fundamentals Quiz',
          description: 'Test your understanding of logical reasoning',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['logic-fundamentals-quiz']
        },
        {
          id: 'relations-basics',
          title: 'Relations and Their Properties',
          description: 'Learn reflexive, symmetric, and transitive relations',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 80,
          estimatedTime: 30,
          challenges: ['relations-properties-flashcards']
        },
        {
          id: 'relations-theory',
          title: 'Relations: Modeling Connections and Structure',
          description: 'Master binary relations, equivalence classes, and partial orders',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 40,
        },
        {
          id: 'equivalence-relations',
          title: 'Equivalence Relations',
          description: 'Implement equivalence classes and Union-Find algorithm',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 130,
          estimatedTime: 50,
          challenges: ['equivalence-relations-challenge']
        },
        {
          id: 'logic-programming',
          title: 'Logic-Based Knowledge Systems',
          description: 'Build a rule-based reasoning system with forward/backward chaining',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 60,
          challenges: ['build-logic-system']
        }
      ]
    },
    {
      id: 'linear-algebra-foundations',
      title: 'Linear Algebra Foundations',
      description: 'Master vectors and matrices - the mathematical foundation of all modern AI',
      order: 4,
      xpReward: 680,
      estimatedTime: 210,
      unlockAfter: 'logic-and-relations',
      lessons: [
        {
          id: 'vector-spaces-theory',
          title: 'Vectors and Vector Spaces: The Foundation of AI',
          description: 'Master vectors - the data structure that powers every neural network, embedding, and machine learning algorithm',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 40,
        },
        {
          id: 'vectors-flashcards',
          title: 'Vector Operations & Concepts',
          description: 'Master vector terminology: dot products, norms, orthogonality, and vector spaces',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['vectors-flashcards']
        },
        {
          id: 'vector-operations-challenge',
          title: 'Implement Core Vector Operations',
          description: 'Build the essential vector operations from scratch: dot product, norms, distances, cosine similarity',
          type: 'code',
          difficulty: 'intermediate',
          xpReward: 130,
          estimatedTime: 50,
          challenges: ['vector-operations-challenge']
        },
        {
          id: 'matrix-operations-theory',
          title: 'Matrices and Transformations: Neural Networks Revealed',
          description: 'Understand how matrix multiplication powers every layer of every neural network, and why linear algebra is the language of AI',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 110,
          estimatedTime: 45,
        },
        {
          id: 'matrix-neural-network-challenge',
          title: 'Build a Neural Network Layer with Matrices',
          description: 'Implement matrix operations and build a complete neural network layer with forward and backward passes',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 170,
          estimatedTime: 70,
          challenges: ['matrix-neural-network-challenge']
        },
        {
          id: 'linear-algebra-mastery-quiz',
          title: 'Linear Algebra Mastery Quiz',
          description: 'Test your understanding of vectors, matrices, and their role in AI',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 35,
          challenges: ['linear-algebra-quiz']
        }
      ]
    },
    {
      id: 'probability-statistics-fundamentals',
      title: 'Probability and Statistics',
      description: 'Master probability, statistics, and uncertainty reasoning - the foundation of modern ML',
      order: 5,
      xpReward: 750,
      estimatedTime: 210,
      unlockAfter: 'linear-algebra-foundations',
      badge: {
        id: 'knowledge-architect',
        name: 'Knowledge Architect',
        description: 'Master of knowledge representation foundations',
        icon: 'Award',
        rarity: 'legendary'
      },
      lessons: [
        {
          id: 'probability-basics',
          title: 'Probability Fundamentals',
          description: 'Learn probability theory and basic concepts',
          type: 'flashcard',
          difficulty: 'beginner',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['probability-basics-flashcards']
        },
        {
          id: 'probability-distributions-theory',
          title: 'Probability Distributions: The Mathematics of Uncertainty in AI',
          description: 'Master distributions (Bernoulli, Categorical, Gaussian) and how they power all ML models',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 120,
          estimatedTime: 50,
        },
        {
          id: 'distributions-flashcards',
          title: 'Probability Distributions Concepts',
          description: 'Master distribution terminology: uniform, normal, Bernoulli, and continuous vs discrete distributions',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 80,
          estimatedTime: 30,
          challenges: ['distributions-flashcards']
        },
        {
          id: 'conditional-probability-quiz',
          title: 'Conditional Probability and Bayes Theorem Quiz',
          description: 'Test your understanding of conditional probability and Bayesian reasoning',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 90,
          estimatedTime: 30,
          challenges: ['conditional-probability-quiz']
        },
        {
          id: 'statistical-inference-theory',
          title: 'Statistical Inference and Machine Learning',
          description: 'Master hypothesis testing, confidence intervals, bias-variance tradeoff, and Bayesian inference',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 120,
          estimatedTime: 50,
        },
        {
          id: 'bayesian-networks-challenge',
          title: 'Build a Bayesian Network',
          description: 'Implement probabilistic graphical model for reasoning under uncertainty',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 170,
          estimatedTime: 70,
          challenges: ['bayesian-network-challenge']
        },
        {
          id: 'probability-mastery-quiz',
          title: 'Probability and Statistics Mastery Quiz',
          description: 'Test your complete understanding of probabilistic reasoning and statistical inference',
          type: 'quiz',
          difficulty: 'advanced',
          xpReward: 100,
          estimatedTime: 35,
          challenges: ['probability-statistics-quiz']
        }
      ]
    },
    {
      id: 'ontologies-semantic-web',
      title: 'Ontologies & Semantic Web',
      description: 'Master ontologies, RDF, OWL, and the Semantic Web - formal knowledge representation at scale',
      order: 6,
      xpReward: 680,
      estimatedTime: 190,
      unlockAfter: 'probability-statistics-fundamentals',
      lessons: [
        {
          id: 'ontologies-introduction',
          title: 'Introduction to Ontologies, RDF, and OWL',
          description: 'Understand how ontologies enable machines to understand meaning through formal semantics',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 90,
          estimatedTime: 45,
        },
        {
          id: 'ontology-engineering',
          title: 'Ontology Engineering: Building Production Knowledge Systems',
          description: 'Learn the lifecycle, best practices, and patterns for building production-quality ontologies',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 40,
        },
        {
          id: 'ontologies-flashcards',
          title: 'Ontologies & Semantic Web Concepts',
          description: 'Master RDF, RDFS, OWL, and triple store terminology',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['ontologies-flashcards']
        },
        {
          id: 'ontologies-quiz',
          title: 'Ontologies & Semantic Web Mastery Quiz',
          description: 'Test your understanding of ontologies, RDF, OWL, and reasoning',
          type: 'quiz',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['ontologies-quiz']
        },
        {
          id: 'rdf-triple-store-challenge',
          title: 'Build an RDF Triple Store',
          description: 'Implement an RDF triple store with SPARQL-like queries and RDFS reasoning',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 60,
          challenges: ['rdf-triple-store-challenge']
        },
        {
          id: 'ontology-reasoning-challenge',
          title: 'Build an Ontology-Based Reasoning System',
          description: 'Implement OWL reasoning with consistency checking and automatic classification',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 170,
          estimatedTime: 70,
          challenges: ['ontology-reasoning-challenge']
        }
      ]
    },
    {
      id: 'knowledge-graphs',
      title: 'Knowledge Graphs',
      description: 'Master knowledge graphs and embeddings - the foundation of modern enterprise AI',
      order: 7,
      xpReward: 710,
      estimatedTime: 195,
      unlockAfter: 'ontologies-semantic-web',
      lessons: [
        {
          id: 'knowledge-graphs-introduction',
          title: 'Knowledge Graphs: Representing the World at Scale',
          description: 'Understand how knowledge graphs power Google, Amazon, and modern AI systems',
          type: 'theory',
          difficulty: 'intermediate',
          xpReward: 100,
          estimatedTime: 40,
        },
        {
          id: 'knowledge-graph-embeddings',
          title: 'Knowledge Graph Embeddings: Machine Learning Meets Symbolic Knowledge',
          description: 'Master TransE, DistMult, ComplEx, and RotatE for link prediction and reasoning',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 120,
          estimatedTime: 50,
        },
        {
          id: 'knowledge-graphs-flashcards',
          title: 'Knowledge Graph Concepts',
          description: 'Master KG construction, embeddings, and link prediction terminology',
          type: 'flashcard',
          difficulty: 'intermediate',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['knowledge-graphs-flashcards']
        },
        {
          id: 'knowledge-graphs-quiz',
          title: 'Knowledge Graphs Mastery Quiz',
          description: 'Test your understanding of KGs, embeddings, and production systems',
          type: 'quiz',
          difficulty: 'advanced',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['knowledge-graphs-quiz']
        },
        {
          id: 'build-knowledge-graph-challenge',
          title: 'Build a Knowledge Graph from Scratch',
          description: 'Implement entity management, relationship storage, and multi-hop path finding',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 150,
          estimatedTime: 60,
          challenges: ['build-knowledge-graph-challenge']
        },
        {
          id: 'transe-implementation-challenge',
          title: 'Implement TransE for Link Prediction',
          description: 'Build TransE embeddings in PyTorch with training loop and evaluation metrics',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 170,
          estimatedTime: 70,
          challenges: ['transe-implementation-challenge']
        }
      ]
    },
    {
      id: 'neural-symbolic-ai',
      title: 'Neural-Symbolic AI',
      description: 'Master the frontier of AI: combining neural learning with symbolic reasoning',
      order: 8,
      xpReward: 780,
      estimatedTime: 210,
      unlockAfter: 'knowledge-graphs',
      badge: {
        id: 'neuro-symbolic-master',
        name: 'Neuro-Symbolic AI Master',
        description: 'Mastered the complete spectrum of knowledge representation from symbolic logic to neural-symbolic hybrid systems',
        icon: 'Award',
        rarity: 'legendary'
      },
      lessons: [
        {
          id: 'neuro-symbolic-overview',
          title: 'Neural-Symbolic AI: Combining Learning with Reasoning',
          description: 'Understand RAG, knowledge distillation, and hybrid systems that power modern AI',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 120,
          estimatedTime: 45,
        },
        {
          id: 'graph-neural-networks',
          title: 'Graph Neural Networks: Deep Learning on Knowledge Graphs',
          description: 'Master GNNs, message passing, and production systems from Pinterest to Google Maps',
          type: 'theory',
          difficulty: 'advanced',
          xpReward: 130,
          estimatedTime: 50,
        },
        {
          id: 'neural-symbolic-flashcards',
          title: 'Neural-Symbolic AI & GNN Concepts',
          description: 'Master RAG, GNN, message passing, and hybrid AI terminology',
          type: 'flashcard',
          difficulty: 'advanced',
          xpReward: 70,
          estimatedTime: 25,
          challenges: ['neural-symbolic-flashcards']
        },
        {
          id: 'neural-symbolic-quiz',
          title: 'Neural-Symbolic AI Mastery Quiz',
          description: 'Test your understanding of RAG, GNNs, and neuro-symbolic systems',
          type: 'quiz',
          difficulty: 'advanced',
          xpReward: 100,
          estimatedTime: 30,
          challenges: ['neural-symbolic-quiz']
        },
        {
          id: 'build-gnn-challenge',
          title: 'Build a Graph Neural Network from Scratch',
          description: 'Implement GCN layers, message passing, and semi-supervised node classification',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 75,
          challenges: ['build-gnn-challenge']
        },
        {
          id: 'rag-with-kg-challenge',
          title: 'Build a RAG System with Knowledge Graph Retrieval',
          description: 'Implement production RAG pipeline with KG backend, multi-hop retrieval, and citations',
          type: 'code',
          difficulty: 'advanced',
          xpReward: 180,
          estimatedTime: 75,
          challenges: ['rag-with-kg-challenge']
        }
      ]
    }
  ]
};

export const allJourneys = [
  promptingJourney,
  agenticPatternsJourney,
  redTeamingJourney,
  knowledgeRepresentationJourney
];