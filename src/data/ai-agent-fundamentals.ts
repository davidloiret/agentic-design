export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relatedConcepts?: string[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  conceptsCovered: string[];
}

export interface LearningCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
}

export const aiAgentFundamentals: LearningCategory[] = [
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    description: 'Fundamental concepts of AI agents and their components',
    icon: 'Brain',
    color: 'blue',
    flashcards: [
      {
        id: 'fc-1',
        category: 'core-concepts',
        front: 'What is an AI Agent?',
        back: 'An AI agent is an autonomous entity that perceives its environment through sensors, processes information using AI models, and takes actions to achieve specific goals. It combines perception, reasoning, planning, and action capabilities.',
        difficulty: 'beginner',
        tags: ['agent', 'definition', 'basics'],
        relatedConcepts: ['autonomy', 'perception-action loop', 'goal-directed behavior']
      },
      {
        id: 'fc-2',
        category: 'core-concepts',
        front: 'What are the key components of an AI Agent?',
        back: '1. Perception Module: Gathers and processes environmental data\n2. Memory/Knowledge Base: Stores information and past experiences\n3. Reasoning Engine: Makes decisions based on goals and observations\n4. Planning Module: Creates action sequences to achieve goals\n5. Action/Execution Module: Carries out planned actions',
        difficulty: 'beginner',
        tags: ['components', 'architecture'],
        relatedConcepts: ['perception', 'memory', 'reasoning', 'planning', 'execution']
      },
      {
        id: 'fc-3',
        category: 'core-concepts',
        front: 'What is the difference between a Reactive Agent and a Deliberative Agent?',
        back: 'Reactive Agents: Respond immediately to stimuli without planning, using condition-action rules. Fast but limited.\n\nDeliberative Agents: Build internal models, plan actions, and reason about consequences. More flexible but computationally intensive.',
        difficulty: 'intermediate',
        tags: ['agent-types', 'reactive', 'deliberative'],
        relatedConcepts: ['hybrid architectures', 'BDI agents']
      },
      {
        id: 'fc-4',
        category: 'core-concepts',
        front: 'What is the Perception-Action Loop?',
        back: 'The continuous cycle where an agent:\n1. Perceives the environment through sensors\n2. Processes the sensory data\n3. Updates its internal state/beliefs\n4. Decides on actions based on goals\n5. Executes actions that affect the environment\n6. Returns to step 1',
        difficulty: 'beginner',
        tags: ['perception', 'action', 'control-loop'],
        relatedConcepts: ['OODA loop', 'sense-think-act']
      },
      {
        id: 'fc-5',
        category: 'core-concepts',
        front: 'What is Agent Autonomy?',
        back: 'The ability of an agent to operate independently without continuous human intervention. Includes:\n- Self-directed goal pursuit\n- Independent decision-making\n- Adaptation to changing conditions\n- Self-monitoring and error recovery',
        difficulty: 'intermediate',
        tags: ['autonomy', 'independence'],
        relatedConcepts: ['levels of autonomy', 'human-in-the-loop']
      }
    ],
    quizQuestions: [
      {
        id: 'q-1',
        category: 'core-concepts',
        question: 'Which of the following is NOT a typical component of an AI agent architecture?',
        options: [
          { id: 'a', text: 'Perception module', isCorrect: false },
          { id: 'b', text: 'Database management system', isCorrect: true },
          { id: 'c', text: 'Planning module', isCorrect: false },
          { id: 'd', text: 'Action execution module', isCorrect: false }
        ],
        explanation: 'While agents may use databases, a database management system is not a core architectural component. The essential components are perception, reasoning, planning, and action modules.',
        difficulty: 'beginner',
        tags: ['components', 'architecture'],
        conceptsCovered: ['agent components', 'agent architecture']
      },
      {
        id: 'q-2',
        category: 'core-concepts',
        question: 'What best describes the main advantage of reactive agents over deliberative agents?',
        options: [
          { id: 'a', text: 'Better long-term planning capabilities', isCorrect: false },
          { id: 'b', text: 'Faster response time to environmental changes', isCorrect: true },
          { id: 'c', text: 'More sophisticated reasoning abilities', isCorrect: false },
          { id: 'd', text: 'Better memory utilization', isCorrect: false }
        ],
        explanation: 'Reactive agents respond immediately to stimuli without complex planning, making them much faster than deliberative agents that need to reason and plan before acting.',
        difficulty: 'intermediate',
        tags: ['agent-types', 'reactive', 'performance'],
        conceptsCovered: ['reactive agents', 'agent comparison']
      }
    ]
  },
  {
    id: 'agent-architectures',
    title: 'Agent Architectures',
    description: 'Different architectural patterns for building AI agents',
    icon: 'Layers',
    color: 'purple',
    flashcards: [
      {
        id: 'fc-6',
        category: 'agent-architectures',
        front: 'What is the BDI (Belief-Desire-Intention) Architecture?',
        back: 'A deliberative agent architecture based on:\n- Beliefs: Agent\'s knowledge about the world\n- Desires: Goals the agent wants to achieve\n- Intentions: Committed plans to achieve desires\n\nThe agent continuously updates beliefs, selects desires to pursue, and forms intentions to act.',
        difficulty: 'advanced',
        tags: ['BDI', 'architecture', 'deliberative'],
        relatedConcepts: ['practical reasoning', 'goal management']
      },
      {
        id: 'fc-7',
        category: 'agent-architectures',
        front: 'What is a Subsumption Architecture?',
        back: 'A reactive architecture where behaviors are organized in layers:\n- Lower layers handle basic survival behaviors\n- Higher layers handle more complex goals\n- Lower layers can override higher ones\n- No central control or world model\n\nDeveloped by Rodney Brooks for robotics.',
        difficulty: 'advanced',
        tags: ['subsumption', 'reactive', 'robotics'],
        relatedConcepts: ['behavior-based robotics', 'emergent behavior']
      },
      {
        id: 'fc-8',
        category: 'agent-architectures',
        front: 'What is a Hybrid Agent Architecture?',
        back: 'Combines reactive and deliberative components:\n- Reactive layer: Fast responses to immediate threats/opportunities\n- Deliberative layer: Long-term planning and goal management\n- Middle layer: Coordinates between reactive and deliberative\n\nExamples: 3T, InteRRaP, TouringMachines',
        difficulty: 'intermediate',
        tags: ['hybrid', 'architecture'],
        relatedConcepts: ['layered architectures', '3T architecture']
      },
      {
        id: 'fc-9',
        category: 'agent-architectures',
        front: 'What is the SOAR Cognitive Architecture?',
        back: 'A general cognitive architecture for creating intelligent agents:\n- All knowledge as production rules\n- Working memory for current state\n- Long-term memory (procedural, semantic, episodic)\n- Decision cycle: propose, evaluate, apply\n- Learning through chunking and reinforcement',
        difficulty: 'advanced',
        tags: ['SOAR', 'cognitive', 'architecture'],
        relatedConcepts: ['production systems', 'cognitive modeling']
      }
    ],
    quizQuestions: [
      {
        id: 'q-3',
        category: 'agent-architectures',
        question: 'In the BDI architecture, what represents the agent\'s committed courses of action?',
        options: [
          { id: 'a', text: 'Beliefs', isCorrect: false },
          { id: 'b', text: 'Desires', isCorrect: false },
          { id: 'c', text: 'Intentions', isCorrect: true },
          { id: 'd', text: 'Perceptions', isCorrect: false }
        ],
        explanation: 'Intentions in BDI represent the plans or courses of action that the agent has committed to executing to achieve its desires (goals).',
        difficulty: 'intermediate',
        tags: ['BDI', 'architecture'],
        conceptsCovered: ['BDI architecture', 'agent commitments']
      },
      {
        id: 'q-4',
        category: 'agent-architectures',
        question: 'Which architecture is best suited for a robot that needs both quick reflexes and long-term planning?',
        options: [
          { id: 'a', text: 'Pure reactive architecture', isCorrect: false },
          { id: 'b', text: 'Pure deliberative architecture', isCorrect: false },
          { id: 'c', text: 'Hybrid architecture', isCorrect: true },
          { id: 'd', text: 'Subsumption architecture', isCorrect: false }
        ],
        explanation: 'Hybrid architectures combine reactive components for quick responses with deliberative components for planning, making them ideal for agents needing both capabilities.',
        difficulty: 'beginner',
        tags: ['hybrid', 'architecture-selection'],
        conceptsCovered: ['hybrid architecture', 'architecture comparison']
      }
    ]
  },
  {
    id: 'perception-sensing',
    title: 'Perception & Sensing',
    description: 'How agents perceive and understand their environment',
    icon: 'Eye',
    color: 'green',
    flashcards: [
      {
        id: 'fc-10',
        category: 'perception-sensing',
        front: 'What is Sensor Fusion in AI Agents?',
        back: 'The process of combining data from multiple sensors to create a more accurate and complete understanding of the environment. Benefits:\n- Redundancy and reliability\n- Complementary information\n- Reduced uncertainty\n- Better spatial/temporal coverage',
        difficulty: 'intermediate',
        tags: ['sensor-fusion', 'perception'],
        relatedConcepts: ['Kalman filter', 'multi-modal perception']
      },
      {
        id: 'fc-11',
        category: 'perception-sensing',
        front: 'What is the difference between Active and Passive Perception?',
        back: 'Passive Perception: Agent observes without influencing the environment (e.g., camera, microphone)\n\nActive Perception: Agent actively controls sensing to gather information (e.g., moving camera, sending sonar pulses, asking questions)',
        difficulty: 'intermediate',
        tags: ['perception', 'active-sensing'],
        relatedConcepts: ['sensor control', 'information gathering']
      },
      {
        id: 'fc-12',
        category: 'perception-sensing',
        front: 'What is Perceptual Aliasing?',
        back: 'When different states in the environment appear identical to the agent\'s sensors. Problems:\n- Agent cannot distinguish between different situations\n- May take inappropriate actions\n\nSolutions:\n- Use memory/history\n- Active perception\n- Better sensors',
        difficulty: 'advanced',
        tags: ['perception', 'aliasing', 'challenges'],
        relatedConcepts: ['state estimation', 'partially observable environments']
      }
    ],
    quizQuestions: [
      {
        id: 'q-5',
        category: 'perception-sensing',
        question: 'What is the main advantage of sensor fusion in AI agents?',
        options: [
          { id: 'a', text: 'Reduces the cost of sensors', isCorrect: false },
          { id: 'b', text: 'Provides more accurate and reliable environmental understanding', isCorrect: true },
          { id: 'c', text: 'Eliminates the need for expensive sensors', isCorrect: false },
          { id: 'd', text: 'Simplifies the agent architecture', isCorrect: false }
        ],
        explanation: 'Sensor fusion combines multiple sensor inputs to create a more accurate, complete, and reliable understanding of the environment than any single sensor could provide.',
        difficulty: 'intermediate',
        tags: ['sensor-fusion', 'perception'],
        conceptsCovered: ['sensor fusion', 'multi-sensor systems']
      }
    ]
  },
  {
    id: 'planning-reasoning',
    title: 'Planning & Reasoning',
    description: 'How agents make decisions and plan actions',
    icon: 'GitBranch',
    color: 'orange',
    flashcards: [
      {
        id: 'fc-13',
        category: 'planning-reasoning',
        front: 'What is the difference between Classical and Contingency Planning?',
        back: 'Classical Planning: Assumes complete knowledge, deterministic actions, and static environment. Creates linear sequence of actions.\n\nContingency Planning: Handles uncertainty by creating conditional plans with branches for different possible outcomes.',
        difficulty: 'intermediate',
        tags: ['planning', 'uncertainty'],
        relatedConcepts: ['STRIPS', 'conditional planning']
      },
      {
        id: 'fc-14',
        category: 'planning-reasoning',
        front: 'What is Means-Ends Analysis?',
        back: 'A planning strategy that:\n1. Compares current state with goal state\n2. Identifies the biggest difference\n3. Finds actions that reduce this difference\n4. Recursively applies to sub-goals\n\nUsed in GPS (General Problem Solver) and many planning systems.',
        difficulty: 'intermediate',
        tags: ['planning', 'problem-solving'],
        relatedConcepts: ['GPS', 'backward chaining']
      },
      {
        id: 'fc-15',
        category: 'planning-reasoning',
        front: 'What is Hierarchical Task Network (HTN) Planning?',
        back: 'Planning approach that decomposes high-level tasks into subtasks:\n- Tasks organized in hierarchy\n- Abstract tasks decomposed into concrete actions\n- Uses domain knowledge about task decomposition\n- More efficient than classical planning for complex domains',
        difficulty: 'advanced',
        tags: ['HTN', 'planning', 'hierarchical'],
        relatedConcepts: ['task decomposition', 'SHOP planner']
      }
    ],
    quizQuestions: [
      {
        id: 'q-6',
        category: 'planning-reasoning',
        question: 'Which planning approach is most suitable for an agent operating in an uncertain environment?',
        options: [
          { id: 'a', text: 'Classical STRIPS planning', isCorrect: false },
          { id: 'b', text: 'Contingency planning', isCorrect: true },
          { id: 'c', text: 'Linear planning', isCorrect: false },
          { id: 'd', text: 'Static planning', isCorrect: false }
        ],
        explanation: 'Contingency planning creates conditional plans with branches for different possible outcomes, making it suitable for uncertain environments where actions may have multiple possible results.',
        difficulty: 'intermediate',
        tags: ['planning', 'uncertainty'],
        conceptsCovered: ['contingency planning', 'planning under uncertainty']
      }
    ]
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Coordination and interaction between multiple agents',
    icon: 'Users',
    color: 'red',
    flashcards: [
      {
        id: 'fc-16',
        category: 'multi-agent-systems',
        front: 'What is Agent Communication Language (ACL)?',
        back: 'Standardized languages for agent communication:\n- FIPA-ACL: Defines performatives (inform, request, propose)\n- KQML: Knowledge Query and Manipulation Language\n- Includes: Message type, sender, receiver, content, ontology\n- Enables semantic understanding between agents',
        difficulty: 'advanced',
        tags: ['communication', 'ACL', 'FIPA'],
        relatedConcepts: ['speech acts', 'ontologies']
      },
      {
        id: 'fc-17',
        category: 'multi-agent-systems',
        front: 'What is the Contract Net Protocol?',
        back: 'A protocol for task allocation in multi-agent systems:\n1. Manager announces task (call for proposals)\n2. Contractors submit bids\n3. Manager evaluates and awards contract\n4. Contractor executes and reports results\n\nUsed for dynamic task distribution and load balancing.',
        difficulty: 'intermediate',
        tags: ['protocols', 'coordination', 'task-allocation'],
        relatedConcepts: ['auction mechanisms', 'task distribution']
      },
      {
        id: 'fc-18',
        category: 'multi-agent-systems',
        front: 'What is Stigmergy in Multi-Agent Systems?',
        back: 'Indirect coordination through environment modification:\n- Agents leave traces in environment\n- Other agents react to these traces\n- No direct communication needed\n- Examples: Ant pheromone trails, shared blackboards\n- Enables emergent collective behavior',
        difficulty: 'advanced',
        tags: ['stigmergy', 'coordination', 'emergence'],
        relatedConcepts: ['swarm intelligence', 'ant colony optimization']
      }
    ],
    quizQuestions: [
      {
        id: 'q-7',
        category: 'multi-agent-systems',
        question: 'In the Contract Net Protocol, who is responsible for evaluating bids?',
        options: [
          { id: 'a', text: 'The contractor agents', isCorrect: false },
          { id: 'b', text: 'The manager agent', isCorrect: true },
          { id: 'c', text: 'A central coordinator', isCorrect: false },
          { id: 'd', text: 'All agents vote together', isCorrect: false }
        ],
        explanation: 'In the Contract Net Protocol, the manager agent announces tasks, receives bids from contractors, evaluates these bids, and awards contracts.',
        difficulty: 'beginner',
        tags: ['contract-net', 'protocols'],
        conceptsCovered: ['Contract Net Protocol', 'task allocation']
      }
    ]
  },
  {
    id: 'learning-adaptation',
    title: 'Learning & Adaptation',
    description: 'How agents learn and adapt over time',
    icon: 'TrendingUp',
    color: 'teal',
    flashcards: [
      {
        id: 'fc-19',
        category: 'learning-adaptation',
        front: 'What is Reinforcement Learning in AI Agents?',
        back: 'Learning through interaction with environment:\n- Agent takes actions and receives rewards/penalties\n- Goal: Maximize cumulative reward\n- Key concepts: States, actions, rewards, policy\n- Algorithms: Q-learning, SARSA, Actor-Critic\n- Balances exploration vs exploitation',
        difficulty: 'intermediate',
        tags: ['reinforcement-learning', 'learning'],
        relatedConcepts: ['Q-learning', 'policy gradient', 'exploration-exploitation']
      },
      {
        id: 'fc-20',
        category: 'learning-adaptation',
        front: 'What is Transfer Learning for Agents?',
        back: 'Applying knowledge from one domain to another:\n- Speeds up learning in new environments\n- Types: Task transfer, domain transfer, behavioral transfer\n- Challenges: Negative transfer, domain mapping\n- Useful for agents facing similar but not identical tasks',
        difficulty: 'advanced',
        tags: ['transfer-learning', 'adaptation'],
        relatedConcepts: ['domain adaptation', 'meta-learning']
      },
      {
        id: 'fc-21',
        category: 'learning-adaptation',
        front: 'What is Online vs Offline Learning for Agents?',
        back: 'Online Learning: Agent learns during operation, adapting in real-time to new experiences.\n\nOffline Learning: Agent learns from pre-collected data before deployment.\n\nHybrid: Initial offline training followed by online adaptation.',
        difficulty: 'beginner',
        tags: ['learning', 'online', 'offline'],
        relatedConcepts: ['continual learning', 'batch learning']
      }
    ],
    quizQuestions: [
      {
        id: 'q-8',
        category: 'learning-adaptation',
        question: 'What is the main challenge in reinforcement learning known as the "exploration-exploitation tradeoff"?',
        options: [
          { id: 'a', text: 'Choosing between different reward functions', isCorrect: false },
          { id: 'b', text: 'Balancing trying new actions vs using known good actions', isCorrect: true },
          { id: 'c', text: 'Deciding when to stop learning', isCorrect: false },
          { id: 'd', text: 'Selecting the right learning rate', isCorrect: false }
        ],
        explanation: 'The exploration-exploitation tradeoff involves balancing between exploring new actions to discover potentially better strategies and exploiting known good actions to maximize immediate rewards.',
        difficulty: 'intermediate',
        tags: ['reinforcement-learning', 'exploration-exploitation'],
        conceptsCovered: ['exploration vs exploitation', 'RL fundamentals']
      }
    ]
  }
];