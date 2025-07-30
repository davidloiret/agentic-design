// AI Agent Fundamentals Learning Content
// Flashcards and Quizzes for the Learning Hub

import { QuizQuestion, Flashcard } from './learning-content';

// ================================
// AI AGENT FUNDAMENTALS FLASHCARDS
// ================================

export const agentComponentsFlashcards: Flashcard[] = [
  {
    id: 'agent-def-1',
    front: 'What is an AI Agent?',
    back: 'An AI agent is an autonomous entity that perceives its environment through sensors, processes information using AI models, and takes actions to achieve specific goals. It combines perception, reasoning, planning, and action capabilities.',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-components-1',
    front: 'What are the 5 key components of an AI Agent?',
    back: '1. Perception Module: Gathers and processes environmental data\n2. Memory/Knowledge Base: Stores information and past experiences\n3. Reasoning Engine: Makes decisions based on goals and observations\n4. Planning Module: Creates action sequences to achieve goals\n5. Action/Execution Module: Carries out planned actions',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-types-1',
    front: 'What is the difference between Reactive and Deliberative Agents?',
    back: 'Reactive Agents: Respond immediately to stimuli without planning, using condition-action rules. Fast but limited.\n\nDeliberative Agents: Build internal models, plan actions, and reason about consequences. More flexible but computationally intensive.',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'perception-action-1',
    front: 'What is the Perception-Action Loop?',
    back: 'The continuous cycle where an agent:\n1. Perceives the environment through sensors\n2. Processes the sensory data\n3. Updates its internal state/beliefs\n4. Decides on actions based on goals\n5. Executes actions that affect the environment\n6. Returns to step 1',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-autonomy-1',
    front: 'What defines Agent Autonomy?',
    back: 'The ability of an agent to operate independently without continuous human intervention. Includes:\n- Self-directed goal pursuit\n- Independent decision-making\n- Adaptation to changing conditions\n- Self-monitoring and error recovery',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-environment-1',
    front: 'What types of environments can agents operate in?',
    back: '1. Fully vs Partially Observable: Can agent see entire state?\n2. Deterministic vs Stochastic: Are outcomes predictable?\n3. Static vs Dynamic: Does environment change while agent thinks?\n4. Discrete vs Continuous: Finite or infinite states/actions?\n5. Single vs Multi-agent: How many agents are present?',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-goals-1',
    front: 'What are the different types of agent goals?',
    back: '1. Achievement Goals: Reach a specific state (e.g., win a game)\n2. Maintenance Goals: Keep conditions true (e.g., stay safe)\n3. Optimization Goals: Maximize/minimize metrics (e.g., profit)\n4. Query Goals: Gather information\n5. Procedural Goals: Follow specific procedures',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-memory-1',
    front: 'What types of memory do AI agents use?',
    back: '1. Working Memory: Current context and active information\n2. Episodic Memory: Past experiences and events\n3. Semantic Memory: General knowledge and facts\n4. Procedural Memory: How to perform tasks\n5. Sensory Memory: Recent perceptual data',
    difficulty: 'hard',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-tools-1',
    front: 'What are Tools in the context of AI Agents?',
    back: 'Tools are external capabilities agents can invoke:\n- APIs for data retrieval\n- Calculators for computation\n- Search engines for information\n- Code interpreters for execution\n- Databases for storage\n\nTools extend agent capabilities beyond language processing.',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-planning-1',
    front: 'What planning strategies do agents use?',
    back: '1. Forward Planning: Start from current state, plan to goal\n2. Backward Planning: Start from goal, work backwards\n3. Hierarchical Planning: Break down into sub-tasks\n4. Conditional Planning: Plan for different scenarios\n5. Continuous Planning: Adjust plans during execution',
    difficulty: 'hard',
    topic: 'AI Agent Fundamentals',
    reviewCount: 0,
    correctCount: 0
  }
];

// ================================
// AI AGENT FUNDAMENTALS QUIZZES
// ================================

export const agentFundamentalsQuiz: QuizQuestion[] = [
  {
    id: 'agent-basics-1',
    question: 'Which of the following is NOT a core component of an AI agent architecture?',
    options: [
      'Perception module for gathering environmental data',
      'Database management system for storing all data',
      'Planning module for creating action sequences',
      'Reasoning engine for decision making'
    ],
    correctAnswer: 1,
    explanation: 'While agents may use databases, a database management system is not a core architectural component. The essential components are perception, memory/knowledge base, reasoning, planning, and action modules.',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-basics-2',
    question: 'What is the main advantage of reactive agents over deliberative agents?',
    options: [
      'Better long-term planning capabilities',
      'Faster response time to environmental changes',
      'More sophisticated reasoning abilities',
      'Better memory utilization'
    ],
    correctAnswer: 1,
    explanation: 'Reactive agents respond immediately to stimuli without complex planning, making them much faster than deliberative agents that need to reason and plan before acting.',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-basics-3',
    question: 'In which type of environment would a chess-playing agent operate?',
    options: [
      'Fully observable, deterministic, static, discrete',
      'Partially observable, stochastic, dynamic, continuous',
      'Fully observable, stochastic, dynamic, discrete',
      'Partially observable, deterministic, static, continuous'
    ],
    correctAnswer: 0,
    explanation: 'Chess is fully observable (all pieces visible), deterministic (moves have predictable outcomes), static (board doesn\'t change during thinking), and discrete (finite positions and moves).',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-memory-quiz-1',
    question: 'Which type of memory would an agent use to remember how it solved a similar problem last week?',
    options: [
      'Working memory',
      'Episodic memory',
      'Semantic memory',
      'Sensory memory'
    ],
    correctAnswer: 1,
    explanation: 'Episodic memory stores past experiences and events, including when and how specific problems were solved. This is different from semantic memory (general facts) or procedural memory (how to do things).',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-planning-quiz-1',
    question: 'When would hierarchical planning be most appropriate?',
    options: [
      'For simple, single-step tasks',
      'For complex tasks that can be broken into subtasks',
      'When the environment is completely unpredictable',
      'When no planning is needed'
    ],
    correctAnswer: 1,
    explanation: 'Hierarchical planning excels at handling complex tasks by decomposing them into manageable subtasks, each of which can be planned and executed separately.',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-tools-quiz-1',
    question: 'What is the primary purpose of giving AI agents access to tools?',
    options: [
      'To make them slower and more deliberate',
      'To extend their capabilities beyond language processing',
      'To reduce their memory requirements',
      'To eliminate the need for planning'
    ],
    correctAnswer: 1,
    explanation: 'Tools extend agent capabilities by allowing them to perform actions they couldn\'t do with language alone - like calculations, web searches, code execution, or database queries.',
    difficulty: 'easy',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-perception-quiz-1',
    question: 'What is "perceptual aliasing" in AI agents?',
    options: [
      'When an agent has multiple sensors',
      'When different states appear identical to the agent\'s sensors',
      'When sensors provide too much information',
      'When perception is faster than action'
    ],
    correctAnswer: 1,
    explanation: 'Perceptual aliasing occurs when different environmental states appear identical through the agent\'s sensors, making it impossible to distinguish between different situations without additional context or memory.',
    difficulty: 'hard',
    topic: 'AI Agent Fundamentals'
  },
  {
    id: 'agent-multiagent-quiz-1',
    question: 'In a multi-agent system, what is the main challenge agents face?',
    options: [
      'Running out of memory',
      'Processing speed limitations',
      'Coordinating actions and avoiding conflicts with other agents',
      'Understanding natural language'
    ],
    correctAnswer: 2,
    explanation: 'In multi-agent systems, the primary challenge is coordination - agents must work together, avoid conflicts, share resources, and sometimes compete while pursuing their individual or collective goals.',
    difficulty: 'medium',
    topic: 'AI Agent Fundamentals'
  }
];

// ================================
// AGENT ARCHITECTURES FLASHCARDS
// ================================

export const agentArchitecturesFlashcards: Flashcard[] = [
  {
    id: 'bdi-arch-1',
    front: 'What is the BDI (Belief-Desire-Intention) Architecture?',
    back: 'A deliberative agent architecture based on:\n- Beliefs: Agent\'s knowledge about the world\n- Desires: Goals the agent wants to achieve\n- Intentions: Committed plans to achieve desires\n\nThe agent continuously updates beliefs, selects desires to pursue, and forms intentions to act.',
    difficulty: 'hard',
    topic: 'Agent Architectures',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'subsumption-arch-1',
    front: 'What is a Subsumption Architecture?',
    back: 'A reactive architecture where behaviors are organized in layers:\n- Lower layers handle basic survival behaviors\n- Higher layers handle more complex goals\n- Lower layers can override higher ones\n- No central control or world model\n\nDeveloped by Rodney Brooks for robotics.',
    difficulty: 'hard',
    topic: 'Agent Architectures',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'hybrid-arch-1',
    front: 'What is a Hybrid Agent Architecture?',
    back: 'Combines reactive and deliberative components:\n- Reactive layer: Fast responses to immediate threats/opportunities\n- Deliberative layer: Long-term planning and goal management\n- Middle layer: Coordinates between reactive and deliberative\n\nExamples: 3T, InteRRaP, TouringMachines',
    difficulty: 'medium',
    topic: 'Agent Architectures',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'soar-arch-1',
    front: 'What is the SOAR Cognitive Architecture?',
    back: 'A general cognitive architecture for creating intelligent agents:\n- All knowledge as production rules\n- Working memory for current state\n- Long-term memory (procedural, semantic, episodic)\n- Decision cycle: propose, evaluate, apply\n- Learning through chunking and reinforcement',
    difficulty: 'hard',
    topic: 'Agent Architectures',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'blackboard-arch-1',
    front: 'What is a Blackboard Architecture?',
    back: 'A problem-solving architecture with three components:\n- Blackboard: Shared memory space for partial solutions\n- Knowledge Sources: Specialized modules that contribute solutions\n- Control: Determines which knowledge source to apply\n\nUseful for complex problems requiring diverse expertise.',
    difficulty: 'medium',
    topic: 'Agent Architectures',
    reviewCount: 0,
    correctCount: 0
  }
];

// ================================
// AGENT ARCHITECTURES QUIZZES
// ================================

export const agentArchitecturesQuiz: QuizQuestion[] = [
  {
    id: 'arch-quiz-1',
    question: 'In the BDI architecture, what represents the agent\'s committed courses of action?',
    options: [
      'Beliefs',
      'Desires',
      'Intentions',
      'Perceptions'
    ],
    correctAnswer: 2,
    explanation: 'Intentions in BDI represent the plans or courses of action that the agent has committed to executing to achieve its desires (goals).',
    difficulty: 'medium',
    topic: 'Agent Architectures'
  },
  {
    id: 'arch-quiz-2',
    question: 'Which architecture is best suited for a robot that needs both quick reflexes and long-term planning?',
    options: [
      'Pure reactive architecture',
      'Pure deliberative architecture',
      'Hybrid architecture',
      'Subsumption architecture only'
    ],
    correctAnswer: 2,
    explanation: 'Hybrid architectures combine reactive components for quick responses with deliberative components for planning, making them ideal for agents needing both capabilities.',
    difficulty: 'easy',
    topic: 'Agent Architectures'
  },
  {
    id: 'arch-quiz-3',
    question: 'In a Subsumption Architecture, which layer typically has the highest priority?',
    options: [
      'The top layer with complex behaviors',
      'The middle coordination layer',
      'The bottom layer with survival behaviors',
      'All layers have equal priority'
    ],
    correctAnswer: 2,
    explanation: 'In Subsumption Architecture, lower layers handling basic survival behaviors can suppress or override higher layers, ensuring the agent\'s basic needs are always met first.',
    difficulty: 'medium',
    topic: 'Agent Architectures'
  },
  {
    id: 'arch-quiz-4',
    question: 'What is the main advantage of the Blackboard Architecture?',
    options: [
      'It\'s the fastest architecture',
      'It allows multiple specialized modules to collaborate on complex problems',
      'It requires the least memory',
      'It works without any planning'
    ],
    correctAnswer: 1,
    explanation: 'Blackboard Architecture excels at integrating diverse knowledge sources, allowing different specialized modules to contribute their expertise to solve complex problems collaboratively.',
    difficulty: 'medium',
    topic: 'Agent Architectures'
  }
];

// Export all content
export const aiAgentLearningContent = {
  flashcards: {
    'agent-components-flashcards': agentComponentsFlashcards,
    'agent-architectures-flashcards': agentArchitecturesFlashcards
  },
  quizzes: {
    'agent-fundamentals-quiz': agentFundamentalsQuiz,
    'agent-architectures-quiz': agentArchitecturesQuiz
  }
};