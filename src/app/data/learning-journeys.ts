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
  totalXpReward: 2500,
  chapters: [
    {
      id: 'prompting-fundamentals',
      title: 'Prompting Fundamentals',
      description: 'Master the basics of prompt engineering',
      order: 1,
      xpReward: 300,
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
      xpReward: 400,
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
      xpReward: 500,
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
      xpReward: 600,
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

export const allJourneys = [
  promptingJourney,
  agenticPatternsJourney,
  redTeamingJourney
];