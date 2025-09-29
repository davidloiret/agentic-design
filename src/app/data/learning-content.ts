// Comprehensive Learning Content for Agentic Design Patterns
// Based on all available patterns in the system

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface TheoryLesson {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xpReward: number;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      examples?: Array<{
        code: string;
        language?: string;
        explanation?: string;
      }>;
      codeExamples?: Array<{
        code: string;
        language?: string;
        explanation?: string;
      }>;
      visualizations?: Array<{
        type: string;
        data?: any;
        config?: any;
      }>;
    }>;
    keyTakeaways?: string[];
    practiceQuestions?: Array<{
      question: string;
      hint: string;
      answer: string;
      difficulty?: 'easy' | 'medium' | 'hard' | 'intermediate' | 'advanced';
    }>;
    practicalExample?: {
      title: string;
      scenario: string;
      challenge: string;
      approach?: string;
      implementation?: string;
      metrics?: any;
    };
    quiz?: Array<{
      question: string;
      options: string[];
      correct?: number;
      correctAnswer?: number;
      explanation?: string;
    }>;
    exercises?: Array<{
      title: string;
      difficulty?: string;
      description: string;
      hints?: string[];
    }>;
    resources?: Array<{
      type: string;
      title: string;
      url?: string;
      description?: string;
    }>;
    references?: string[];
  };
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  lastReviewed?: Date;
  reviewCount: number;
  correctCount: number;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  template: string;
  solution: string;
  tests: {
    input: any;
    expectedOutput: any;
    description: string;
  }[];
  hints: string[];
  estimatedTime?: number;
  tags?: string[];
  objectives?: string[];
  validationCriteria?: string[];
}

export interface PatternSelectionChallenge {
  id: string;
  scenario: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: {
    pattern: string;
    explanation: string;
  }[];
  correctAnswer: number;
  explanation: string;
}

// ================================
// REASONING TECHNIQUES QUIZZES
// ================================

export const reasoningTechniquesQuiz: QuizQuestion[] = [
  {
    id: 'cot-basics-1',
    question: 'What is the primary advantage of Chain of Thought (CoT) reasoning?',
    options: [
      'It reduces computational cost',
      'It makes responses shorter',
      'It breaks down complex problems into manageable steps',
      'It eliminates the need for examples'
    ],
    correctAnswer: 2,
    explanation: 'Chain of Thought reasoning excels at breaking complex problems into intermediate reasoning steps, making the process transparent and often more accurate.',
    difficulty: 'easy',
    topic: 'Chain of Thought'
  },
  {
    id: 'tot-vs-cot-1',
    question: 'When would you choose Tree of Thought (ToT) over Chain of Thought (CoT)?',
    options: [
      'For simple linear problems',
      'When you need to explore multiple solution paths and backtrack',
      'When computational resources are limited',
      'For generating shorter responses'
    ],
    correctAnswer: 1,
    explanation: 'Tree of Thought is ideal when problems require exploring multiple approaches, evaluating alternatives, and potentially backtracking when paths fail - like strategic planning or complex mathematical proofs.',
    difficulty: 'medium',
    topic: 'Tree of Thoughts'
  },
  {
    id: 'lrt-efficiency-1',
    question: 'What makes Latent Recurrent Thinking (LRT) more efficient than traditional Chain of Thought?',
    options: [
      'It uses fewer neural network parameters',
      'It performs reasoning in latent space without generating intermediate tokens',
      'It requires less training data',
      'It only works on simple problems'
    ],
    correctAnswer: 1,
    explanation: 'LRT achieves up to 60% reduction in computational overhead by performing iterative reasoning within continuous latent space without explicit token generation, mimicking human intuitive thinking.',
    difficulty: 'hard',
    topic: 'Latent Recurrent Thinking'
  },
  {
    id: 'got-structure-1',
    question: 'How does Graph of Thought (GoT) differ from linear reasoning approaches?',
    options: [
      'It only works with numerical data',
      'It represents thoughts as vertices with dependencies as edges',
      'It requires more computational power',
      'It cannot handle complex problems'
    ],
    correctAnswer: 1,
    explanation: 'Graph of Thought creates a non-linear network where thoughts are vertices and their relationships are edges, enabling synergistic idea combination and complex feedback loops.',
    difficulty: 'medium',
    topic: 'Graph of Thought'
  },
  {
    id: 'react-cycle-1',
    question: 'What is the correct sequence in a ReAct agent cycle?',
    options: [
      'Act → Think → Observe → Repeat',
      'Think → Act → Observe → Repeat',
      'Observe → Think → Act → Repeat',
      'Think → Observe → Act → Repeat'
    ],
    correctAnswer: 1,
    explanation: 'ReAct follows Think (reasoning about what to do) → Act (taking action) → Observe (analyzing results) → Repeat cycle, combining reasoning with acting.',
    difficulty: 'easy',
    topic: 'ReAct Pattern'
  },
  {
    id: 'neuro-symbolic-1',
    question: 'What is the main benefit of Neuro-Symbolic Reasoning?',
    options: [
      'Faster training times',
      'Combines neural learning flexibility with symbolic logic rigor',
      'Requires less memory',
      'Works only on text data'
    ],
    correctAnswer: 1,
    explanation: 'Neuro-Symbolic Reasoning combines the pattern learning capabilities of neural networks with the logical consistency and interpretability of symbolic systems.',
    difficulty: 'hard',
    topic: 'Neuro-Symbolic Reasoning'
  },
  {
    id: 'hybrid-reasoning-1',
    question: 'When is Hybrid Reasoning Fusion most beneficial?',
    options: [
      'For simple classification tasks',
      'When you need multiple reasoning paradigms for robust conclusions',
      'Only for mathematical problems',
      'When computational resources are unlimited'
    ],
    correctAnswer: 1,
    explanation: 'Hybrid Reasoning Fusion excels when problems benefit from multiple perspectives - combining statistical, symbolic, case-based, and causal reasoning for more robust decisions.',
    difficulty: 'hard',
    topic: 'Hybrid Reasoning Fusion'
  }
];

// ================================
// PROMPT CHAINING QUIZZES
// ================================

export const promptChainingQuiz: QuizQuestion[] = [
  {
    id: 'sequential-chaining-1',
    question: 'What is the key characteristic of Sequential Chaining?',
    options: [
      'All prompts run simultaneously',
      'Each prompt output feeds the next prompt input in linear order',
      'Prompts can be executed in any order',
      'It only works with two prompts'
    ],
    correctAnswer: 1,
    explanation: 'Sequential Chaining creates a linear workflow where each step depends on the output of the previous step, like an assembly line process.',
    difficulty: 'easy',
    topic: 'Sequential Chaining'
  },
  {
    id: 'parallel-chaining-1',
    question: 'When is Parallel Chaining most effective?',
    options: [
      'When tasks are dependent on each other',
      'When you can process multiple independent tasks simultaneously',
      'Only for simple tasks',
      'When you have limited computational resources'
    ],
    correctAnswer: 1,
    explanation: 'Parallel Chaining excels when you have independent tasks that can be processed simultaneously, like gathering different types of research data or analyzing multiple aspects of a problem.',
    difficulty: 'medium',
    topic: 'Parallel Chaining'
  },
  {
    id: 'conditional-chaining-1',
    question: 'What makes Conditional Chaining different from Sequential Chaining?',
    options: [
      'It\'s faster to execute',
      'It routes execution through different paths based on conditions',
      'It uses fewer resources',
      'It only works with text data'
    ],
    correctAnswer: 1,
    explanation: 'Conditional Chaining dynamically selects different execution paths based on conditions, like routing customer queries to appropriate specialist agents.',
    difficulty: 'medium',
    topic: 'Conditional Chaining'
  },
  {
    id: 'feedback-chaining-1',
    question: 'What is the main purpose of Feedback Chaining?',
    options: [
      'To speed up processing',
      'To create iterative improvement loops where outputs become inputs',
      'To reduce computational costs',
      'To handle multiple users simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Feedback Chaining creates loops where outputs are fed back as inputs for continuous refinement until quality thresholds are met.',
    difficulty: 'medium',
    topic: 'Feedback Chaining'
  },
  {
    id: 'hierarchical-chaining-1',
    question: 'How does Hierarchical Chaining organize prompts?',
    options: [
      'In random order',
      'In a flat sequence',
      'In parent-child relationships with multiple levels',
      'Only in pairs'
    ],
    correctAnswer: 2,
    explanation: 'Hierarchical Chaining creates multi-level structures where high-level tasks decompose into sub-tasks, like generating a business plan with sections and subsections.',
    difficulty: 'medium',
    topic: 'Hierarchical Chaining'
  }
];

// ================================
// ROUTING TECHNIQUES QUIZZES
// ================================

export const routingTechniquesQuiz: QuizQuestion[] = [
  {
    id: 'dynamic-routing-1',
    question: 'What enables Dynamic Routing to make intelligent decisions?',
    options: [
      'Pre-defined static rules',
      'Real-time context analysis and adaptation',
      'Random selection',
      'User preferences only'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic Routing analyzes context in real-time, considering factors like audience, channel, goals, and brand voice to select optimal processing paths.',
    difficulty: 'medium',
    topic: 'Dynamic Routing'
  },
  {
    id: 'content-based-routing-1',
    question: 'How does Content-Based Routing make routing decisions?',
    options: [
      'Based on user location',
      'Based on content analysis and classification',
      'Based on time of day',
      'Based on system load'
    ],
    correctAnswer: 1,
    explanation: 'Content-Based Routing analyzes the content itself - keywords, sentiment, category, and topic - to route requests to appropriate handlers.',
    difficulty: 'easy',
    topic: 'Content-Based Routing'
  },
  {
    id: 'capability-routing-1',
    question: 'What is the primary factor in Capability Routing decisions?',
    options: [
      'Geographic location',
      'Time constraints',
      'Agent skills and expertise matching',
      'Cost considerations'
    ],
    correctAnswer: 2,
    explanation: 'Capability Routing matches tasks to agents based on specialized skills and capabilities, ensuring the most qualified agent handles each task.',
    difficulty: 'medium',
    topic: 'Capability Routing'
  },
  {
    id: 'load-balancing-1',
    question: 'What is the main goal of Load Balancing in routing?',
    options: [
      'Reduce processing quality',
      'Distribute workload evenly across resources',
      'Increase response time',
      'Handle only simple requests'
    ],
    correctAnswer: 1,
    explanation: 'Load Balancing distributes tasks across available resources to optimize performance, prevent overload, and maintain system responsiveness.',
    difficulty: 'easy',
    topic: 'Load Balancing'
  },
  {
    id: 'geographic-routing-1',
    question: 'Why is Geographic Routing important for global applications?',
    options: [
      'It reduces development costs',
      'It provides compliance, localization, and latency optimization',
      'It simplifies the codebase',
      'It only works with text data'
    ],
    correctAnswer: 1,
    explanation: 'Geographic Routing ensures compliance with local laws (like GDPR), provides culturally appropriate responses, and minimizes latency through regional processing.',
    difficulty: 'medium',
    topic: 'Geographic Routing'
  }
];

// ================================
// TOOL USE QUIZZES
// ================================

export const toolUseQuiz: QuizQuestion[] = [
  {
    id: 'function-calling-1',
    question: 'What makes Function Calling different from regular text generation?',
    options: [
      'It generates longer responses',
      'It provides structured interface for invoking external functions',
      'It works faster',
      'It only handles mathematical operations'
    ],
    correctAnswer: 1,
    explanation: 'Function Calling provides a structured, schema-based interface for AI to invoke external functions with proper parameter validation and error handling.',
    difficulty: 'easy',
    topic: 'Function Calling'
  },
  {
    id: 'code-execution-1',
    question: 'What are the key safety considerations for Code Execution?',
    options: [
      'Code should run with full system privileges',
      'Execution should happen in sandboxed environments with resource limits',
      'Only simple calculations are allowed',
      'Internet access should always be enabled'
    ],
    correctAnswer: 1,
    explanation: 'Code Execution requires safe sandboxed environments with resource management to prevent security issues while enabling powerful computational capabilities.',
    difficulty: 'medium',
    topic: 'Code Execution'
  },
  {
    id: 'mcp-protocol-1',
    question: 'What problem does Model Context Protocol (MCP) solve?',
    options: [
      'Reduces model size',
      'Enables standardized context sharing between models and tools',
      'Increases processing speed',
      'Simplifies user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'MCP provides a standardized protocol for sharing context and capabilities between different AI models and tools, enabling seamless handoffs and interoperability.',
    difficulty: 'hard',
    topic: 'Model Context Protocol'
  },
  {
    id: 'api-integration-1',
    question: 'What are essential components of robust API Integration?',
    options: [
      'Only basic GET requests',
      'Authentication, rate limiting, error handling, and response parsing',
      'Just JSON parsing',
      'Manual request construction only'
    ],
    correctAnswer: 1,
    explanation: 'Robust API Integration requires authentication handling, rate limiting management, comprehensive error handling, and proper response parsing for reliable operation.',
    difficulty: 'medium',
    topic: 'API Integration'
  }
];

// ================================
// WORKFLOW ORCHESTRATION QUIZZES
// ================================

export const workflowOrchestrationQuiz: QuizQuestion[] = [
  {
    id: 'event-driven-1',
    question: 'What are the benefits of Event-Driven Orchestration?',
    options: [
      'Simpler code structure',
      'Asynchronous processing, scalability, and fault tolerance',
      'Faster single-threaded execution',
      'Reduced memory usage'
    ],
    correctAnswer: 1,
    explanation: 'Event-Driven Orchestration enables asynchronous processing, automatic scaling, fault tolerance through event replay, and decoupled system architecture.',
    difficulty: 'medium',
    topic: 'Event-Driven Orchestration'
  },
  {
    id: 'actor-model-1',
    question: 'What is a key advantage of the Actor Model for coordination?',
    options: [
      'Shared memory access',
      'Synchronous message passing',
      'Fault isolation and asynchronous communication',
      'Single-threaded execution'
    ],
    correctAnswer: 2,
    explanation: 'The Actor Model provides fault isolation (actor crashes don\'t affect others) and asynchronous message passing, enabling highly scalable and resilient systems.',
    difficulty: 'medium',
    topic: 'Actor Model Coordination'
  },
  {
    id: 'federated-orchestration-1',
    question: 'Why is Federated Orchestration important for healthcare and financial networks?',
    options: [
      'It\'s cheaper to implement',
      'It enables collaborative AI while preserving data privacy',
      'It requires less computational power',
      'It works only with small datasets'
    ],
    correctAnswer: 1,
    explanation: 'Federated Orchestration allows institutions to collaboratively train AI models while keeping sensitive data local, maintaining privacy and regulatory compliance.',
    difficulty: 'hard',
    topic: 'Federated Orchestration'
  },
  {
    id: 'progressive-enhancement-1',
    question: 'How does Progressive Enhancement improve user experience?',
    options: [
      'By making systems slower',
      'By providing immediate results that improve over time',
      'By requiring more user input',
      'By reducing functionality'
    ],
    correctAnswer: 1,
    explanation: 'Progressive Enhancement provides immediate baseline results and continuously improves quality based on available resources and time, avoiding "all or nothing" waiting periods.',
    difficulty: 'medium',
    topic: 'Progressive Enhancement'
  }
];

// ================================
// PLANNING & EXECUTION QUIZZES
// ================================

export const planningExecutionQuiz: QuizQuestion[] = [
  {
    id: 'hierarchical-planning-1',
    question: 'What is the main advantage of Hierarchical Planning?',
    options: [
      'It\'s simpler to implement',
      'It breaks complex goals into manageable hierarchical sub-tasks',
      'It requires fewer resources',
      'It only works for simple problems'
    ],
    correctAnswer: 1,
    explanation: 'Hierarchical Planning decomposes complex goals into multiple levels of sub-tasks, making large projects manageable with clear dependencies and resource allocation.',
    difficulty: 'medium',
    topic: 'Hierarchical Planning'
  },
  {
    id: 'constraint-satisfaction-1',
    question: 'When is Constraint Satisfaction most valuable?',
    options: [
      'For unconstrained optimization',
      'When solutions must satisfy multiple competing requirements',
      'Only for mathematical problems',
      'When there are no limitations'
    ],
    correctAnswer: 1,
    explanation: 'Constraint Satisfaction excels when solutions must balance multiple competing requirements like time, resources, quality, and regulations.',
    difficulty: 'medium',
    topic: 'Constraint Satisfaction'
  },
  {
    id: 'scenario-planning-1',
    question: 'Why is Scenario Planning important for strategic decisions?',
    options: [
      'It predicts the future accurately',
      'It prepares for multiple possible futures with contingency plans',
      'It reduces planning time',
      'It eliminates all risks'
    ],
    correctAnswer: 1,
    explanation: 'Scenario Planning develops strategies for multiple possible futures, ensuring organizations are prepared for various outcomes with appropriate contingency plans.',
    difficulty: 'medium',
    topic: 'Scenario Planning'
  },
  {
    id: 'adaptive-complexity-1',
    question: 'How does Adaptive Complexity Scaling optimize performance?',
    options: [
      'By using the same approach for all problems',
      'By adjusting planning depth based on task complexity and resources',
      'By always using maximum computational power',
      'By simplifying all problems'
    ],
    correctAnswer: 1,
    explanation: 'Adaptive Complexity Scaling dynamically adjusts reasoning depth and resource allocation based on task complexity, optimizing the trade-off between quality and efficiency.',
    difficulty: 'hard',
    topic: 'Adaptive Complexity Scaling'
  }
];

// ================================
// COMPREHENSIVE FLASHCARDS
// ================================

export const reasoningTechniquesFlashcards: Flashcard[] = [
  {
    id: 'fc-cot-definition',
    front: 'What is Chain of Thought (CoT) reasoning?',
    back: 'A technique that breaks down complex problems into step-by-step intermediate reasoning steps, making the problem-solving process transparent and often more accurate. Example: "Let\'s think step by step" followed by numbered reasoning steps.',
    difficulty: 'easy',
    topic: 'Chain of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-tot-definition',
    front: 'What is Tree of Thought (ToT) reasoning?',
    back: 'An advanced reasoning approach that explores multiple reasoning paths through branching and backtracking. It creates a tree structure where each node represents a thought state, allowing exploration of alternatives and revision of strategies when paths fail.',
    difficulty: 'medium',
    topic: 'Tree of Thoughts',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-lrt-definition',
    front: 'What is Latent Recurrent Thinking (LRT)?',
    back: 'An efficient reasoning method that performs iterative reasoning within continuous latent space without generating intermediate tokens. It achieves 60% reduction in computational overhead while mimicking human intuitive thinking processes.',
    difficulty: 'hard',
    topic: 'Latent Recurrent Thinking',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-got-definition',
    front: 'What is Graph of Thought (GoT)?',
    back: 'A non-linear reasoning approach where thoughts are represented as vertices and their dependencies as edges. It enables synergistic idea combination, feedback loops, and complex network distillation for superior problem-solving.',
    difficulty: 'hard',
    topic: 'Graph of Thought',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-react-definition',
    front: 'What is the ReAct pattern?',
    back: 'ReAct (Reasoning and Acting) combines reasoning with acting through external tool use. It follows a Think → Act → Observe cycle, enabling agents to interact with environments and adapt strategies based on feedback.',
    difficulty: 'medium',
    topic: 'ReAct Pattern',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-self-correction',
    front: 'What is Self-Correction in AI reasoning?',
    back: 'A process where AI systems iteratively evaluate and refine their own outputs. It includes identifying errors, ambiguities, and gaps, then generating improved versions through systematic revision.',
    difficulty: 'medium',
    topic: 'Self-Correction',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-neuro-symbolic',
    front: 'What is Neuro-Symbolic Reasoning?',
    back: 'A hybrid approach that combines neural network learning with symbolic logic. The neural component learns patterns from data while the symbolic component ensures logical consistency and provides interpretable reasoning chains.',
    difficulty: 'hard',
    topic: 'Neuro-Symbolic Reasoning',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-hybrid-reasoning',
    front: 'What is Hybrid Reasoning Fusion?',
    back: 'A meta-reasoning approach that seamlessly integrates multiple reasoning paradigms (statistical, symbolic, case-based, causal) for optimal problem-solving. It uses confidence-weighted fusion and dynamic paradigm switching.',
    difficulty: 'hard',
    topic: 'Hybrid Reasoning Fusion',
    reviewCount: 0,
    correctCount: 0
  }
];

export const promptChainingFlashcards: Flashcard[] = [
  {
    id: 'fc-sequential-chaining',
    front: 'What is Sequential Chaining?',
    back: 'A linear workflow pattern where prompts are executed in sequence, with each output feeding the next input. Perfect for multi-step processes like content creation pipelines: Research → Analysis → Writing → Editing.',
    difficulty: 'easy',
    topic: 'Sequential Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-parallel-chaining',
    front: 'What is Parallel Chaining?',
    back: 'Simultaneous execution of multiple independent prompts with result aggregation. Ideal for research, analysis, and consensus-building where different aspects can be processed concurrently.',
    difficulty: 'medium',
    topic: 'Parallel Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-conditional-chaining',
    front: 'What is Conditional Chaining?',
    back: 'Dynamic routing through different prompt paths based on conditions. Uses branching logic to adapt workflows - like routing customer queries to technical, billing, or general support based on classification.',
    difficulty: 'medium',
    topic: 'Conditional Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-feedback-chaining',
    front: 'What is Feedback Chaining?',
    back: 'Creates iterative improvement loops where outputs are fed back as inputs for refinement. Continues until quality thresholds are met or maximum iterations reached.',
    difficulty: 'medium',
    topic: 'Feedback Chaining',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-hierarchical-chaining',
    front: 'What is Hierarchical Chaining?',
    back: 'Organizes prompts in multi-level parent-child relationships. High-level tasks decompose into sub-tasks with context inheritance, perfect for complex projects like business plan generation.',
    difficulty: 'medium',
    topic: 'Hierarchical Chaining',
    reviewCount: 0,
    correctCount: 0
  }
];

export const routingTechniquesFlashcards: Flashcard[] = [
  {
    id: 'fc-dynamic-routing',
    front: 'What is Dynamic Routing?',
    back: 'Real-time routing decisions based on context analysis. Considers factors like audience, channel, goals, and brand voice to select optimal processing paths. Adapts to changing conditions automatically.',
    difficulty: 'medium',
    topic: 'Dynamic Routing',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-content-based-routing',
    front: 'What is Content-Based Routing?',
    back: 'Routes requests based on content analysis and classification. Analyzes keywords, sentiment, topic, and category to direct content to appropriate handlers or specialists.',
    difficulty: 'easy',
    topic: 'Content-Based Routing',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-capability-routing',
    front: 'What is Capability Routing?',
    back: 'Routes tasks to agents based on their specialized capabilities and skills. Uses capability matching algorithms to ensure optimal agent-task assignments based on expertise and performance.',
    difficulty: 'medium',
    topic: 'Capability Routing',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-load-balancing',
    front: 'What is Load Balancing in routing?',
    back: 'Distributes workload evenly across available processing resources. Monitors real-time load and dynamically allocates tasks to prevent overload and optimize performance.',
    difficulty: 'easy',
    topic: 'Load Balancing',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-geographic-routing',
    front: 'Geographic Routing — core idea',
    back: 'Route by user region to meet data residency/compliance, reduce latency, and localize content. Prefer in-region processing with compliant fallbacks and audited rationale.',
    difficulty: 'medium',
    topic: 'Geographic Routing',
    reviewCount: 0,
    correctCount: 0
  }
];

export const toolUseFlashcards: Flashcard[] = [
  {
    id: 'fc-function-calling',
    front: 'What is Function Calling in AI?',
    back: 'A structured interface for AI to invoke external functions and APIs. Uses schema-based definitions with parameter validation, return value handling, and error management.',
    difficulty: 'easy',
    topic: 'Function Calling',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-code-execution',
    front: 'What is Code Execution in AI systems?',
    back: 'Dynamic generation and execution of code to solve computational problems. Requires safe sandboxed environments with resource management for security and reliability.',
    difficulty: 'medium',
    topic: 'Code Execution',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-api-integration',
    front: 'What is API Integration for AI?',
    back: 'Seamless integration with external APIs and web services. Includes authentication handling, rate limiting management, response parsing, and comprehensive error handling.',
    difficulty: 'medium',
    topic: 'API Integration',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-mcp-protocol',
    front: 'What is Model Context Protocol (MCP)?',
    back: 'A standardized protocol for sharing context and capabilities between AI models and tools. Enables cross-model interoperability, session state management, and seamless handoffs.',
    difficulty: 'hard',
    topic: 'Model Context Protocol',
    reviewCount: 0,
    correctCount: 0
  }
];

export const workflowOrchestrationFlashcards: Flashcard[] = [
  {
    id: 'fc-event-driven-orchestration',
    front: 'What is Event-Driven Orchestration?',
    back: 'Asynchronous task distribution through event streaming. Provides automatic scaling, fault tolerance through event replay, and decoupled architecture for distributed processing.',
    difficulty: 'medium',
    topic: 'Event-Driven Orchestration',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-actor-model',
    front: 'What is the Actor Model for coordination?',
    back: 'Asynchronous message-passing coordination between independent actors. Provides fault isolation, location transparency, and supervision hierarchies for scalable systems.',
    difficulty: 'medium',
    topic: 'Actor Model Coordination',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-federated-orchestration',
    front: 'What is Federated Orchestration?',
    back: 'Coordinates AI processing across distributed devices while preserving data privacy. Enables collaborative model training without sharing raw data, perfect for healthcare and financial networks.',
    difficulty: 'hard',
    topic: 'Federated Orchestration',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-progressive-enhancement',
    front: 'What is Progressive Enhancement?',
    back: 'Incrementally improves AI output quality based on available resources and time. Provides immediate baseline results that continuously improve, avoiding "all or nothing" waiting periods.',
    difficulty: 'medium',
    topic: 'Progressive Enhancement',
    reviewCount: 0,
    correctCount: 0
  }
];

export const planningExecutionFlashcards: Flashcard[] = [
  {
    id: 'fc-hierarchical-planning',
    front: 'What is Hierarchical Planning?',
    back: 'Decomposes high-level goals into hierarchical sub-tasks with multi-level abstraction. Each level has specific tasks, timelines, and dependencies for managing complex projects.',
    difficulty: 'medium',
    topic: 'Hierarchical Planning',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-goal-decomposition',
    front: 'What is Goal Decomposition?',
    back: 'Breaks down complex goals into manageable SMART sub-goals with dependency analysis, priority assignment, and progress tracking for systematic achievement.',
    difficulty: 'easy',
    topic: 'Goal Decomposition',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-constraint-satisfaction',
    front: 'What is Constraint Satisfaction?',
    back: 'Plans solutions within specified constraints and limitations. Uses constraint modeling, solution space exploration, and optimization algorithms for resource allocation and scheduling.',
    difficulty: 'medium',
    topic: 'Constraint Satisfaction',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-scenario-planning',
    front: 'What is Scenario Planning?',
    back: 'Develops plans for multiple possible future scenarios with probability assessment and contingency planning. Essential for strategic planning and risk management.',
    difficulty: 'medium',
    topic: 'Scenario Planning',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fc-adaptive-complexity',
    front: 'What is Adaptive Complexity Scaling?',
    back: 'Dynamically adjusts planning complexity based on task difficulty and available resources. Optimizes the trade-off between solution quality and computational efficiency.',
    difficulty: 'hard',
    topic: 'Adaptive Complexity Scaling',
    reviewCount: 0,
    correctCount: 0
  }
];

// ================================
// ADVANCED PATTERN SELECTION CHALLENGES
// ================================

export const advancedPatternSelectionChallenges: PatternSelectionChallenge[] = [
  {
    id: 'pattern-challenge-1',
    scenario: 'Scientific Research Assistant',
    description: 'Build an AI system that helps researchers analyze complex scientific papers, explore multiple hypotheses, and synthesize findings from different studies with contradictory results.',
    difficulty: 'hard',
    options: [
      {
        pattern: 'Chain of Thought',
        explanation: 'Good for linear analysis but struggles with contradictory information and multiple hypotheses'
      },
      {
        pattern: 'Graph of Thought',
        explanation: 'Excellent for non-linear exploration of complex relationships and synthesizing contradictory findings'
      },
      {
        pattern: 'Sequential Chaining',
        explanation: 'Too rigid for exploratory research with uncertain paths'
      },
      {
        pattern: 'Simple Function Calling',
        explanation: 'Lacks the reasoning complexity needed for scientific synthesis'
      }
    ],
    correctAnswer: 1,
    explanation: 'Graph of Thought excels at handling complex, non-linear relationships between ideas. It can represent contradictory findings as different nodes, explore multiple hypotheses simultaneously, and synthesize insights through network analysis - perfect for scientific research synthesis.'
  },
  {
    id: 'pattern-challenge-2',
    scenario: 'Global E-commerce Platform',
    description: 'Design an AI system for a global e-commerce platform that handles customer support in 20+ languages, routes queries based on complexity and region, and integrates with multiple payment and shipping APIs.',
    difficulty: 'hard',
    options: [
      {
        pattern: 'Geographic + Capability Routing',
        explanation: 'Perfect combination for global scale with regional compliance and skill-based assignment'
      },
      {
        pattern: 'Simple Content-Based Routing',
        explanation: 'Too basic for multi-region, multi-language, multi-API complexity'
      },
      {
        pattern: 'ReAct Pattern',
        explanation: 'Good for tool use but doesn\'t address routing and scaling challenges'
      },
      {
        pattern: 'Tree of Thoughts',
        explanation: 'Overkill for customer service routing decisions'
      }
    ],
    correctAnswer: 0,
    explanation: 'Geographic Routing handles regional compliance (GDPR, local laws) and language localization, while Capability Routing ensures queries go to agents with appropriate skills (technical, billing, language proficiency). This combination scales globally while maintaining quality.'
  },
  {
    id: 'pattern-challenge-3',
    scenario: 'Medical Diagnosis Assistant',
    description: 'Create an AI system that assists doctors with diagnosis by analyzing patient symptoms, medical history, lab results, and imaging data while ensuring logical consistency and explainable reasoning.',
    difficulty: 'hard',
    options: [
      {
        pattern: 'Neuro-Symbolic Reasoning',
        explanation: 'Ideal combination of pattern recognition with medical knowledge rules and explainable logic'
      },
      {
        pattern: 'Pure Neural Networks',
        explanation: 'Good at pattern recognition but lacks explainability and logical consistency'
      },
      {
        pattern: 'Chain of Thought',
        explanation: 'Provides reasoning steps but may lack medical knowledge constraints'
      },
      {
        pattern: 'Function Calling',
        explanation: 'Good for data access but doesn\'t provide diagnostic reasoning'
      }
    ],
    correctAnswer: 0,
    explanation: 'Neuro-Symbolic Reasoning combines neural networks\' pattern recognition (learning from medical data) with symbolic logic (medical knowledge rules). This ensures both accuracy and explainability - critical for medical applications where decisions must be justified.'
  },
  {
    id: 'pattern-challenge-4',
    scenario: 'Real-time Trading System',
    description: 'Build an AI trading system that processes market data streams, makes split-second decisions, adapts to changing market conditions, and manages risk across multiple asset classes.',
    difficulty: 'hard',
    options: [
      {
        pattern: 'Event-Driven + Adaptive Complexity Scaling',
        explanation: 'Perfect for real-time processing with dynamic complexity adjustment based on market conditions'
      },
      {
        pattern: 'Hierarchical Planning',
        explanation: 'Too slow for split-second trading decisions'
      },
      {
        pattern: 'Tree of Thoughts',
        explanation: 'Too computationally expensive for real-time trading'
      },
      {
        pattern: 'Sequential Chaining',
        explanation: 'Too rigid and slow for dynamic market conditions'
      }
    ],
    correctAnswer: 0,
    explanation: 'Event-Driven architecture handles real-time market data streams efficiently, while Adaptive Complexity Scaling adjusts reasoning depth based on market volatility - simple decisions in stable markets, complex analysis during volatility.'
  },
  {
    id: 'pattern-challenge-5',
    scenario: 'Smart City Traffic Management',
    description: 'Design an AI system that optimizes traffic flow across a city, coordinates traffic lights, handles emergency vehicle routing, and adapts to special events and weather conditions.',
    difficulty: 'hard',
    options: [
      {
        pattern: 'Federated Orchestration + Constraint Satisfaction',
        explanation: 'Excellent for coordinating distributed traffic systems while optimizing within constraints'
      },
      {
        pattern: 'Simple Function Calling',
        explanation: 'Too basic for complex city-wide coordination'
      },
      {
        pattern: 'Graph of Thought',
        explanation: 'Good for complex reasoning but not optimal for real-time coordination'
      },
      {
        pattern: 'Content-Based Routing',
        explanation: 'Designed for content classification, not traffic management'
      }
    ],
    correctAnswer: 0,
    explanation: 'Federated Orchestration coordinates multiple traffic control systems across the city while preserving local autonomy. Constraint Satisfaction optimizes traffic flow within physical constraints (road capacity, signal timing limits, emergency priorities).'
  },
  {
    id: 'pattern-challenge-6',
    scenario: 'Educational Content Personalization',
    description: 'Create an AI system that personalizes learning content for students, adapts difficulty based on progress, identifies knowledge gaps, and provides multiple learning paths for different learning styles.',
    difficulty: 'medium',
    options: [
      {
        pattern: 'Conditional Chaining + Progressive Enhancement',
        explanation: 'Perfect for adaptive learning paths with gradually improving content quality'
      },
      {
        pattern: 'Linear Sequential Processing',
        explanation: 'Too rigid for personalized learning paths'
      },
      {
        pattern: 'Pure Load Balancing',
        explanation: 'Focuses on resource distribution, not personalization'
      },
      {
        pattern: 'Static Content Routing',
        explanation: 'Doesn\'t adapt to student progress and needs'
      }
    ],
    correctAnswer: 0,
    explanation: 'Conditional Chaining adapts learning paths based on student performance, learning style, and knowledge gaps. Progressive Enhancement starts with basic content and gradually adds complexity and detail as the student progresses.'
  }
];

// ================================
// ADVANCED CODE CHALLENGES
// ================================

export const advancedCodeChallenges: CodeChallenge[] = [
  {
    id: 'implement-tot-reasoning',
    title: 'Implement Tree of Thought Reasoning',
    description: 'Create a Tree of Thought implementation that explores multiple reasoning paths for complex problem-solving with backtracking capabilities.',
    difficulty: 'hard',
    topic: 'Tree of Thoughts',
    template: `class TreeOfThoughtNode:
    def __init__(self, state, parent=None, depth=0):
        self.state = state
        self.parent = parent
        self.children = []
        self.depth = depth
        self.score = None
        self.is_solution = False
    
    def add_child(self, child_state):
        child = TreeOfThoughtNode(child_state, self, self.depth + 1)
        self.children.append(child)
        return child

class TreeOfThoughtSolver:
    def __init__(self, max_depth=5, beam_width=3):
        self.max_depth = max_depth
        self.beam_width = beam_width
    
    def solve(self, initial_state, goal_check_fn, generate_children_fn, evaluate_fn):
        """
        Solve a problem using Tree of Thought reasoning.
        
        Args:
            initial_state: Starting state
            goal_check_fn: Function to check if state is solution
            generate_children_fn: Function to generate child states
            evaluate_fn: Function to evaluate state quality (0-1)
            
        Returns:
            Best solution path and final state
        """
        # Your implementation here
        pass`,
    solution: `class TreeOfThoughtNode:
    def __init__(self, state, parent=None, depth=0):
        self.state = state
        self.parent = parent
        self.children = []
        self.depth = depth
        self.score = None
        self.is_solution = False
    
    def add_child(self, child_state):
        child = TreeOfThoughtNode(child_state, self, self.depth + 1)
        self.children.append(child)
        return child
    
    def get_path(self):
        path = []
        node = self
        while node:
            path.append(node.state)
            node = node.parent
        return list(reversed(path))

class TreeOfThoughtSolver:
    def __init__(self, max_depth=5, beam_width=3):
        self.max_depth = max_depth
        self.beam_width = beam_width
    
    def solve(self, initial_state, goal_check_fn, generate_children_fn, evaluate_fn):
        root = TreeOfThoughtNode(initial_state)
        
        # Best-first search with beam search pruning
        frontier = [root]
        best_solution = None
        best_score = -1
        
        while frontier:
            # Sort by score and take top beam_width nodes
            frontier.sort(key=lambda x: x.score or 0, reverse=True)
            frontier = frontier[:self.beam_width]
            
            current = frontier.pop(0)
            
            # Check if current state is a solution
            if goal_check_fn(current.state):
                current.is_solution = True
                current_score = evaluate_fn(current.state)
                if current_score > best_score:
                    best_solution = current
                    best_score = current_score
                continue
            
            # Don't expand beyond max depth
            if current.depth >= self.max_depth:
                continue
            
            # Generate children and add to frontier
            children_states = generate_children_fn(current.state)
            for child_state in children_states:
                child = current.add_child(child_state)
                child.score = evaluate_fn(child_state)
                frontier.append(child)
        
        if best_solution:
            return {
                "solution_path": best_solution.get_path(),
                "final_state": best_solution.state,
                "score": best_score,
                "nodes_explored": self._count_nodes(root)
            }
        else:
            return {"solution_path": None, "final_state": None, "score": 0, "nodes_explored": self._count_nodes(root)}
    
    def _count_nodes(self, root):
        count = 1
        for child in root.children:
            count += self._count_nodes(child)
        return count`,
    tests: [
      {
        input: {
          initial_state: {"current": 0, "target": 10, "moves": []},
          goal_check: "lambda state: state['current'] == state['target']",
          generate_children: "lambda state: [{'current': state['current'] + i, 'target': state['target'], 'moves': state['moves'] + [f'+{i}']} for i in [1, 2, 3] if state['current'] + i <= state['target']]",
          evaluate: "lambda state: 1.0 - abs(state['current'] - state['target']) / state['target']"
        },
                 expectedOutput: {"solution_found": true, "path_length": 4},
        description: "Simple number reaching game"
      }
    ],
    hints: [
      "Use best-first search with beam search pruning",
      "Implement backtracking by maintaining parent pointers",
      "Evaluate each node to guide search direction",
      "Limit search depth to prevent infinite exploration"
    ]
  },
  {
    id: 'implement-react-agent',
    title: 'Build Advanced ReAct Agent',
    description: 'Create a sophisticated ReAct agent that can use multiple tools, handle errors gracefully, and learn from previous interactions.',
    difficulty: 'hard',
    topic: 'ReAct Pattern',
    template: `class ReActAgent:
    def __init__(self, tools, max_iterations=10):
        self.tools = tools
        self.max_iterations = max_iterations
        self.interaction_history = []
        self.tool_success_rates = {}
    
    def solve(self, query: str) -> dict:
        """
        Solve a query using ReAct pattern with tool use and learning.
        
        Args:
            query: The question or task to solve
            
        Returns:
            Dictionary with solution, reasoning trace, and metadata
        """
        # Your implementation here
        pass
    
    def _think(self, query: str, context: list) -> str:
        """Generate reasoning about what to do next"""
        # Your implementation here
        pass
    
    def _act(self, action: str, parameters: dict) -> dict:
        """Execute an action using available tools"""
        # Your implementation here
        pass
    
    def _observe(self, action_result: dict) -> str:
        """Analyze and interpret action results"""
        # Your implementation here
        pass`,
    solution: `import json
import random

class ReActAgent:
    def __init__(self, tools, max_iterations=10):
        self.tools = tools
        self.max_iterations = max_iterations
        self.interaction_history = []
        self.tool_success_rates = {tool: 0.5 for tool in tools.keys()}
    
    def solve(self, query: str) -> dict:
        reasoning_trace = []
        context = []
        
        for iteration in range(self.max_iterations):
            # THINK phase
            thought = self._think(query, context)
            reasoning_trace.append(f"THOUGHT {iteration + 1}: {thought}")
            
            # Determine if we have enough information to answer
            if "final answer" in thought.lower() or iteration == self.max_iterations - 1:
                final_answer = self._generate_final_answer(query, context)
                reasoning_trace.append(f"FINAL ANSWER: {final_answer}")
                
                                 self._learn_from_interaction(query, reasoning_trace, true)
                 
                 return {
                     "answer": final_answer,
                     "reasoning_trace": reasoning_trace,
                     "iterations": iteration + 1,
                     "tools_used": list(set([step.split(":")[0] for step in reasoning_trace if "ACTION" in step])),
                     "success": true
                 }
            
            # ACT phase
            action, parameters = self._extract_action_from_thought(thought)
            if action:
                reasoning_trace.append(f"ACTION {iteration + 1}: {action} with {parameters}")
                
                action_result = self._act(action, parameters)
                reasoning_trace.append(f"OBSERVATION {iteration + 1}: {action_result}")
                
                # OBSERVE phase
                observation = self._observe(action_result)
                context.append({
                    "thought": thought,
                    "action": action,
                    "result": action_result,
                    "observation": observation
                })
            else:
                # If no action extracted, try to reason further
                context.append({"thought": thought, "action": None, "result": None})
        
                 # If we reach here, we didn't find a complete answer
         self._learn_from_interaction(query, reasoning_trace, false)
         
         return {
             "answer": "Unable to provide a complete answer with available information.",
             "reasoning_trace": reasoning_trace,
             "iterations": self.max_iterations,
             "tools_used": [],
             "success": false
         }
    
    def _think(self, query: str, context: list) -> str:
        if not context:
            return f"I need to solve: {query}. Let me think about what information or tools I need."
        
        last_context = context[-1]
        if last_context["action"] and last_context["result"]:
            if last_context["result"].get("success", False):
                return f"Good, the {last_context['action']} was successful. Let me analyze the results and decide next steps."
            else:
                return f"The {last_context['action']} failed. Let me try a different approach."
        
        # Check if we have enough information
        if len(context) >= 2:
            return "I have gathered some information. Let me see if I can provide a final answer."
        
        return "I need more information. Let me try another approach."
    
    def _extract_action_from_thought(self, thought: str) -> tuple:
        """Extract action and parameters from thought"""
        thought_lower = thought.lower()
        
        if "search" in thought_lower:
            return "search", {"query": "relevant search terms"}
        elif "calculate" in thought_lower or "math" in thought_lower:
            return "calculator", {"expression": "mathematical expression"}
        elif "weather" in thought_lower:
            return "weather", {"location": "location name"}
        elif "final answer" in thought_lower:
            return None, {}
        else:
            # Try to use the most successful tool
            best_tool = max(self.tool_success_rates.keys(), key=lambda x: self.tool_success_rates[x])
            return best_tool, {"query": "general query"}
    
    def _act(self, action: str, parameters: dict) -> dict:
        if action not in self.tools:
            return {"success": False, "error": f"Tool {action} not available", "data": None}
        
        try:
            # Simulate tool execution
            result = self.tools[action](parameters)
            success = result is not None
            
            # Update success rate
            current_rate = self.tool_success_rates[action]
            self.tool_success_rates[action] = current_rate * 0.9 + (1.0 if success else 0.0) * 0.1
            
                         return {"success": success, "data": result, "error": None}
         except Exception as e:
             # Update success rate for failure
             current_rate = self.tool_success_rates[action]
             self.tool_success_rates[action] = current_rate * 0.9
             
             return {"success": false, "error": str(e), "data": None}
    
    def _observe(self, action_result: dict) -> str:
        if action_result["success"]:
            return f"Successfully obtained: {action_result['data']}"
        else:
            return f"Action failed with error: {action_result['error']}"
    
    def _generate_final_answer(self, query: str, context: list) -> str:
        if not context:
            return "I don't have enough information to answer this query."
        
        successful_results = [ctx for ctx in context if ctx.get("result", {}).get("success", False)]
        if successful_results:
            return f"Based on my analysis: {successful_results[-1]['result']['data']}"
        else:
            return "I encountered difficulties gathering the necessary information to answer this query."
    
    def _learn_from_interaction(self, query: str, trace: list, success: bool):
        self.interaction_history.append({
            "query": query,
            "trace": trace,
            "success": success,
            "timestamp": "current_time"
        })
        # Keep only last 100 interactions
        if len(self.interaction_history) > 100:
            self.interaction_history.pop(0)`,
    tests: [
      {
        input: {
          query: "What is 15 + 27?",
          tools: {"calculator": "lambda params: '42'", "search": "lambda params: 'search results'"}
        },
                 expectedOutput: {"success": true, "answer_contains": "42"},
        description: "Simple calculation task"
      }
    ],
    hints: [
      "Implement the Think-Act-Observe cycle iteratively",
      "Track tool success rates for learning",
      "Handle errors gracefully and try alternative approaches",
      "Maintain context across iterations for coherent reasoning"
    ]
  },
  {
    id: 'implement-dynamic-routing',
    title: 'Build Dynamic Routing System',
    description: 'Create a dynamic routing system that analyzes context in real-time and selects optimal processing paths.',
    difficulty: 'medium',
    topic: 'Dynamic Routing',
    template: `class DynamicRouter:
    def __init__(self):
        self.routes = {}
        self.performance_metrics = {}
        self.context_analyzers = []
    
    def add_route(self, route_id: str, handler, conditions: dict):
        """Add a processing route with conditions"""
        # Your implementation here
        pass
    
    def add_context_analyzer(self, analyzer_fn):
        """Add a function that analyzes context and returns features"""
        # Your implementation here
        pass
    
    def route(self, request: dict) -> dict:
        """
        Analyze request context and route to optimal handler.
        
        Args:
            request: Dictionary containing request data and context
            
        Returns:
            Processing result with routing decision metadata
        """
        # Your implementation here
        pass`,
    solution: `import time
from typing import Dict, List, Callable, Any

class DynamicRouter:
    def __init__(self):
        self.routes = {}
        self.performance_metrics = {}
        self.context_analyzers = []
    
    def add_route(self, route_id: str, handler: Callable, conditions: Dict[str, Any]):
        """Add a processing route with conditions"""
        self.routes[route_id] = {
            'handler': handler,
            'conditions': conditions,
            'usage_count': 0,
            'avg_response_time': 0,
            'success_rate': 1.0
        }
        self.performance_metrics[route_id] = []
    
    def add_context_analyzer(self, analyzer_fn: Callable):
        """Add a function that analyzes context and returns features"""
        self.context_analyzers.append(analyzer_fn)
    
    def route(self, request: Dict) -> Dict:
        start_time = time.time()
        
        # Analyze context using all analyzers
        context_features = self._analyze_context(request)
        
        # Find matching routes
        matching_routes = self._find_matching_routes(context_features)
        
        if not matching_routes:
            return {
                'result': 'No matching routes found',
                'route_used': None,
                'context_features': context_features,
                'success': False
            }
        
        # Select best route based on conditions and performance
        best_route_id = self._select_best_route(matching_routes, context_features)
        best_route = self.routes[best_route_id]
        
        # Execute handler
        try:
            result = best_route['handler'](request, context_features)
            success = True
            
            # Update performance metrics
            execution_time = time.time() - start_time
            self._update_metrics(best_route_id, execution_time, success)
            
            return {
                'result': result,
                'route_used': best_route_id,
                'context_features': context_features,
                'execution_time': execution_time,
                'success': True
            }
            
        except Exception as e:
            execution_time = time.time() - start_time
            self._update_metrics(best_route_id, execution_time, False)
            
            return {
                'result': f'Error: {str(e)}',
                'route_used': best_route_id,
                'context_features': context_features,
                'execution_time': execution_time,
                'success': False
            }
    
    def _analyze_context(self, request: Dict) -> Dict:
        """Run all context analyzers and combine features"""
        features = {}
        
        for analyzer in self.context_analyzers:
            try:
                analyzer_features = analyzer(request)
                features.update(analyzer_features)
            except Exception as e:
                features[f'analyzer_error_{len(features)}'] = str(e)
        
        return features
    
    def _find_matching_routes(self, context_features: Dict) -> List[str]:
        """Find routes whose conditions match the context"""
        matching = []
        
        for route_id, route_info in self.routes.items():
            conditions = route_info['conditions']
            
            if self._check_conditions(conditions, context_features):
                matching.append(route_id)
        
        return matching
    
    def _check_conditions(self, conditions: Dict, features: Dict) -> bool:
        """Check if context features satisfy route conditions"""
        for key, expected_value in conditions.items():
            if key not in features:
                return False
            
            feature_value = features[key]
            
            # Handle different condition types
            if isinstance(expected_value, str):
                if feature_value != expected_value:
                    return False
            elif isinstance(expected_value, dict):
                # Range conditions: {'min': 0, 'max': 100}
                if 'min' in expected_value and feature_value < expected_value['min']:
                    return False
                if 'max' in expected_value and feature_value > expected_value['max']:
                    return False
            elif isinstance(expected_value, list):
                # Must be one of the values
                if feature_value not in expected_value:
                    return False
        
        return True
    
    def _select_best_route(self, matching_routes: List[str], context_features: Dict) -> str:
        """Select the best route based on performance and context"""
        if len(matching_routes) == 1:
            return matching_routes[0]
        
        # Score each route
        best_route = None
        best_score = -1
        
        for route_id in matching_routes:
            route_info = self.routes[route_id]
            
            # Calculate score based on success rate and response time
            success_score = route_info['success_rate'] * 0.6
            speed_score = max(0, (1000 - route_info['avg_response_time']) / 1000) * 0.3
            usage_score = min(route_info['usage_count'] / 100, 1.0) * 0.1  # Prefer proven routes
            
            total_score = success_score + speed_score + usage_score
            
            if total_score > best_score:
                best_score = total_score
                best_route = route_id
        
        return best_route or matching_routes[0]
    
    def _update_metrics(self, route_id: str, execution_time: float, success: bool):
        """Update performance metrics for a route"""
        route_info = self.routes[route_id]
        
        # Update usage count
        route_info['usage_count'] += 1
        
        # Update average response time
        current_avg = route_info['avg_response_time']
        usage_count = route_info['usage_count']
        route_info['avg_response_time'] = (current_avg * (usage_count - 1) + execution_time * 1000) / usage_count
        
        # Update success rate
        current_success_rate = route_info['success_rate']
        route_info['success_rate'] = (current_success_rate * (usage_count - 1) + (1.0 if success else 0.0)) / usage_count
        
        # Store detailed metrics
        self.performance_metrics[route_id].append({
            'timestamp': time.time(),
            'execution_time': execution_time,
            'success': success
        })
        
        # Keep only last 100 metrics per route
        if len(self.performance_metrics[route_id]) > 100:
            self.performance_metrics[route_id].pop(0)`,
    tests: [
      {
        input: {
          request: {"type": "technical", "priority": "high", "language": "en"},
          routes_setup: [
            {"id": "tech_expert", "conditions": {"type": "technical", "priority": ["high", "medium"]}},
            {"id": "general_support", "conditions": {"type": ["general", "billing"]}}
          ]
        },
                 expectedOutput: {"route_used": "tech_expert", "success": true},
        description: "Technical query routing"
      }
    ],
    hints: [
      "Implement flexible condition matching for different data types",
      "Track performance metrics to improve routing decisions",
      "Use scoring system to select best route among multiple matches",
      "Handle edge cases like no matching routes gracefully"
    ]
  }
];

// ================================
// COMBINED EXPORTS
// ================================

export const allFlashcards: Flashcard[] = [
  ...reasoningTechniquesFlashcards,
  ...promptChainingFlashcards,
  ...routingTechniquesFlashcards,
  ...toolUseFlashcards,
  ...workflowOrchestrationFlashcards,
  ...planningExecutionFlashcards
];

export const allQuizQuestions: QuizQuestion[] = [
  ...reasoningTechniquesQuiz,
  ...promptChainingQuiz,
  ...routingTechniquesQuiz,
  ...toolUseQuiz,
  ...workflowOrchestrationQuiz,
  ...planningExecutionQuiz
];

// Import AI Agent learning content
import {
  agentComponentsFlashcards,
  agentArchitecturesFlashcards,
  agentFundamentalsQuiz,
  agentArchitecturesQuiz
} from './ai-agent-learning-content';

// Import Knowledge Representation content
import {
  setNotationFlashcards,
  setOperationsFlashcards,
  graphTypesFlashcards,
  graphTerminologyFlashcards,
  propositionalLogicFlashcards,
  relationsPropertiesFlashcards,
  vectorsFlashcards,
  probabilityBasicsFlashcards,
  distributionsFlashcards,
  ontologiesFlashcards,
  knowledgeGraphsFlashcards,
  neuralSymbolicFlashcards,
  setTheoryQuiz,
  graphTheoryQuiz,
  logicQuiz,
  linearAlgebraQuiz,
  probabilityQuiz,
  ontologiesQuiz,
  knowledgeGraphsQuiz,
  neuralSymbolicQuiz,
  knowledgeRepresentationCodeChallenges
} from './knowledge-representation';

// Import Master Prompting content
import {
  promptComponentsFlashcards,
  zeroShotPromptingFlashcards,
  fewShotPromptingFlashcards,
  chainOfThoughtFlashcards,
  advancedTechniquesFlashcards,
  commonPitfallsFlashcards,
  basicPromptingQuiz,
  promptPatternsQuiz,
  advancedPromptingQuiz,
  optimizationTestingQuiz,
  practicalApplicationQuiz,
  allPromptingCodeChallenges
} from './master-prompting';

import {
  redTeamFundamentalsFlashcards,
  redTeamOperationsFlashcards,
  redTeamFundamentalsQuiz,
  promptInjectionQuiz,
  adversarialTestingQuiz,
  securityFrameworksQuiz,
  defenseMechanismsQuiz,
  advancedRedTeamingQuiz,
  promptInjectionChallenge,
  adversarialGeneratorChallenge,
  securityEvaluationChallenge,
  defensiveSystemChallenge,
  allRedTeamingCodeChallenges
} from './ai-red-teaming';

// ================================
// KNOWLEDGE REPRESENTATION CONTENT
// ================================

// Re-export for backward compatibility
export {
  setNotationFlashcards,
  setOperationsFlashcards,
  graphTypesFlashcards,
  graphTerminologyFlashcards,
  propositionalLogicFlashcards,
  relationsPropertiesFlashcards,
  vectorsFlashcards,
  probabilityBasicsFlashcards,
  distributionsFlashcards,
  setTheoryQuiz,
  graphTheoryQuiz,
  logicQuiz,
  linearAlgebraQuiz,
  probabilityQuiz
};

export const learningContent = {
  quizzes: {
    reasoningTechniques: reasoningTechniquesQuiz,
    promptChaining: promptChainingQuiz,
    routingTechniques: routingTechniquesQuiz,
    toolUse: toolUseQuiz,
    workflowOrchestration: workflowOrchestrationQuiz,
    planningExecution: planningExecutionQuiz,
    agentFundamentals: agentFundamentalsQuiz,
    agentArchitectures: agentArchitecturesQuiz,
    setTheoryFundamentals: setTheoryQuiz,
    graphTheory: graphTheoryQuiz,
    logicFundamentals: logicQuiz,
    linearAlgebra: linearAlgebraQuiz,
    conditionalProbability: probabilityQuiz,
    ontologies: ontologiesQuiz,
    knowledgeGraphs: knowledgeGraphsQuiz,
    neuralSymbolic: neuralSymbolicQuiz,
    basicPrompting: basicPromptingQuiz,
    promptPatterns: promptPatternsQuiz,
    advancedPrompting: advancedPromptingQuiz,
    optimizationTesting: optimizationTestingQuiz,
    practicalApplication: practicalApplicationQuiz,
    redTeamFundamentals: redTeamFundamentalsQuiz,
    promptInjection: promptInjectionQuiz,
    adversarialTesting: adversarialTestingQuiz,
    securityFrameworks: securityFrameworksQuiz,
    defenseMechanisms: defenseMechanismsQuiz,
    advancedRedTeaming: advancedRedTeamingQuiz,
    all: allQuizQuestions
  },
  flashcards: {
    reasoningTechniques: reasoningTechniquesFlashcards,
    promptChaining: promptChainingFlashcards,
    routingTechniques: routingTechniquesFlashcards,
    toolUse: toolUseFlashcards,
    workflowOrchestration: workflowOrchestrationFlashcards,
    planningExecution: planningExecutionFlashcards,
    agentComponents: agentComponentsFlashcards,
    agentArchitectures: agentArchitecturesFlashcards,
    setNotation: setNotationFlashcards,
    setOperations: setOperationsFlashcards,
    graphTypes: graphTypesFlashcards,
    graphTerminology: graphTerminologyFlashcards,
    propositionalLogic: propositionalLogicFlashcards,
    relationsProperties: relationsPropertiesFlashcards,
    vectors: vectorsFlashcards,
    probabilityBasics: probabilityBasicsFlashcards,
    distributions: distributionsFlashcards,
    ontologies: ontologiesFlashcards,
    knowledgeGraphs: knowledgeGraphsFlashcards,
    neuralSymbolic: neuralSymbolicFlashcards,
    promptComponents: promptComponentsFlashcards,
    zeroShotPrompting: zeroShotPromptingFlashcards,
    fewShotPrompting: fewShotPromptingFlashcards,
    chainOfThought: chainOfThoughtFlashcards,
    advancedTechniques: advancedTechniquesFlashcards,
    commonPitfalls: commonPitfallsFlashcards,
    redTeamFundamentals: redTeamFundamentalsFlashcards,
    redTeamOperations: redTeamOperationsFlashcards,
    all: allFlashcards
  },
  codeChallenges: [...advancedCodeChallenges, ...knowledgeRepresentationCodeChallenges, ...allPromptingCodeChallenges, ...allRedTeamingCodeChallenges],
  patternSelectionChallenges: advancedPatternSelectionChallenges
}; 