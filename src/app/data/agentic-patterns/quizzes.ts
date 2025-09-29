// import { Quiz } from '../learning-content';

// Agent Fundamentals Quiz
export const agentFundamentalsQuiz = {
  id: 'agent-fundamentals-quiz',
  title: 'AI Agent Fundamentals',
  description: 'Test your understanding of core agent concepts and architectures',
  questions: [
    {
      id: 'q1',
      question: 'Which of the following is NOT a characteristic of an AI agent?',
      options: [
        'Goal-directed behavior',
        'Environmental awareness',
        'Always requires human supervision',
        'Memory and state management'
      ],
      correctAnswer: 2,
      explanation: 'AI agents are designed for autonomy and can operate without constant human supervision, though they may have oversight mechanisms.',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'What is the primary purpose of the perception module in an agent?',
      options: [
        'To execute actions in the environment',
        'To gather and interpret environmental data',
        'To store long-term memories',
        'To generate responses to users'
      ],
      correctAnswer: 1,
      explanation: 'The perception module is responsible for gathering raw sensory data from the environment and processing it into a form the agent can understand.',
      difficulty: 'easy'
    },
    {
      id: 'q3',
      question: 'Which agent type combines reactive and deliberative approaches?',
      options: [
        'Learning agents',
        'Reactive agents',
        'Hybrid agents',
        'Cognitive agents'
      ],
      correctAnswer: 2,
      explanation: 'Hybrid agents combine fast reactive responses for immediate situations with deliberative planning for complex problems.',
      difficulty: 'medium'
    },
    {
      id: 'q4',
      question: 'In production agent systems, what is the main purpose of implementing circuit breakers?',
      options: [
        'To increase processing speed',
        'To prevent cascading failures when external services fail',
        'To reduce memory usage',
        'To improve response accuracy'
      ],
      correctAnswer: 1,
      explanation: 'Circuit breakers prevent cascading failures by stopping requests to failing services after a threshold, allowing the system to recover.',
      difficulty: 'hard'
    },
    {
      id: 'q5',
      question: 'What distinguishes Level 4 autonomous agents from Level 3 ReAct agents?',
      options: [
        'Ability to use tools',
        'Reasoning capabilities',
        'Long-term goals and learning abilities',
        'Memory systems'
      ],
      correctAnswer: 2,
      explanation: 'Level 4 agents add persistent memory, learning from experience, and pursuit of long-term goals beyond the reasoning-acting loops of Level 3.',
      difficulty: 'medium'
    },
    {
      id: 'q6',
      question: 'Which memory type would an agent use to remember a specific user interaction from last week?',
      options: [
        'Working memory',
        'Semantic memory',
        'Episodic memory',
        'Procedural memory'
      ],
      correctAnswer: 2,
      explanation: 'Episodic memory stores specific events and interactions with temporal context, perfect for remembering particular user sessions.',
      difficulty: 'medium'
    }
  ]
};

// Reasoning Patterns Quiz
export const reasoningPatternsQuiz = {
  id: 'reasoning-patterns-quiz',
  title: 'Advanced Reasoning Patterns',
  description: 'Evaluate your knowledge of reasoning patterns from CoT to GoT',
  questions: [
    {
      id: 'q1',
      question: 'What is the typical accuracy improvement from Chain of Thought on mathematical tasks?',
      options: [
        '5-10%',
        '10-40%',
        '50-70%',
        '70-90%'
      ],
      correctAnswer: 1,
      explanation: 'Chain of Thought typically improves mathematical reasoning accuracy by 10-40%, with complex multi-step problems showing the greatest gains.',
      difficulty: 'medium'
    },
    {
      id: 'q2',
      question: 'Which reasoning pattern allows backtracking when a solution path fails?',
      options: [
        'Chain of Thought',
        'ReAct',
        'Tree of Thoughts',
        'Self-consistency'
      ],
      correctAnswer: 2,
      explanation: 'Tree of Thoughts maintains multiple reasoning paths and can backtrack to explore alternative branches when current paths fail.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'In the ReAct pattern, what follows an Action?',
      options: [
        'Another Action',
        'A Thought',
        'An Observation',
        'A Conclusion'
      ],
      correctAnswer: 2,
      explanation: 'ReAct follows the pattern: Thought → Action → Observation, where observations provide feedback about action results.',
      difficulty: 'easy'
    },
    {
      id: 'q4',
      question: 'What is the main advantage of Graph of Thought over Tree of Thoughts?',
      options: [
        'Faster execution',
        'Lower token usage',
        'Non-linear connections and thought merging',
        'Better for simple problems'
      ],
      correctAnswer: 2,
      explanation: 'Graph of Thought allows arbitrary connections between thoughts, enabling non-linear reasoning, thought merging, and complex interdependencies.',
      difficulty: 'hard'
    },
    {
      id: 'q5',
      question: 'How does self-consistency improve Chain of Thought reasoning?',
      options: [
        'By using better prompts',
        'By sampling multiple reasoning paths and voting',
        'By adding more examples',
        'By using larger models'
      ],
      correctAnswer: 1,
      explanation: 'Self-consistency generates multiple reasoning chains with different random seeds, then selects the most common answer through majority voting.',
      difficulty: 'medium'
    },
    {
      id: 'q6',
      question: 'When should you use least-to-most prompting?',
      options: [
        'For simple factual questions',
        'For problems that decompose into increasingly complex subproblems',
        'For creative writing tasks',
        'For all reasoning tasks'
      ],
      correctAnswer: 1,
      explanation: 'Least-to-most prompting excels when problems can be decomposed into subproblems of increasing complexity, building solutions progressively.',
      difficulty: 'hard'
    }
  ]
};

// Chaining Patterns Quiz
export const chainingPatternsQuiz = {
  id: 'chaining-patterns-quiz',
  title: 'Agent Chaining and Orchestration',
  description: 'Test your understanding of agent chaining patterns and workflows',
  questions: [
    {
      id: 'q1',
      question: 'Which chaining pattern is best for independent tasks that can run simultaneously?',
      options: [
        'Sequential chaining',
        'Parallel chaining',
        'Conditional chaining',
        'Hierarchical chaining'
      ],
      correctAnswer: 1,
      explanation: 'Parallel chaining executes multiple independent agents simultaneously, reducing total execution time.',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'What is the primary benefit of checkpointing in agent chains?',
      options: [
        'Faster execution',
        'Recovery from failures without full restart',
        'Better accuracy',
        'Lower cost'
      ],
      correctAnswer: 1,
      explanation: 'Checkpointing saves intermediate states, allowing recovery from the last successful checkpoint rather than restarting the entire chain.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'In the supervisor-worker pattern, who decides task allocation?',
      options: [
        'Workers bid for tasks',
        'Random assignment',
        'The supervisor assigns based on worker capabilities',
        'First available worker takes the task'
      ],
      correctAnswer: 2,
      explanation: 'The supervisor analyzes tasks and worker capabilities to make optimal task assignments.',
      difficulty: 'medium'
    },
    {
      id: 'q4',
      question: 'What is the map-reduce pattern in agent chaining?',
      options: [
        'Sequential processing of data',
        'Conditional routing based on data type',
        'Parallel processing (map) followed by aggregation (reduce)',
        'Recursive problem decomposition'
      ],
      correctAnswer: 2,
      explanation: 'Map-reduce divides data among parallel agents (map phase) then combines their results (reduce phase).',
      difficulty: 'medium'
    },
    {
      id: 'q5',
      question: 'Which pattern uses runtime conditions to determine execution path?',
      options: [
        'Sequential chaining',
        'Parallel chaining',
        'Conditional chaining',
        'Feedback loop chaining'
      ],
      correctAnswer: 2,
      explanation: 'Conditional chaining evaluates conditions at runtime to determine which agent or path to execute next.',
      difficulty: 'easy'
    },
    {
      id: 'q6',
      question: 'In a feedback loop chain, what determines when to stop iterating?',
      options: [
        'Fixed number of iterations only',
        'Quality threshold or max iterations',
        'User intervention',
        'Random termination'
      ],
      correctAnswer: 1,
      explanation: 'Feedback loops continue until either a quality threshold is met or maximum iterations are reached.',
      difficulty: 'medium'
    }
  ]
};

// RAG Patterns Quiz
export const ragPatternsQuiz = {
  id: 'rag-patterns-quiz',
  title: 'Retrieval-Augmented Generation Patterns',
  description: 'Assess your knowledge of RAG patterns and techniques',
  questions: [
    {
      id: 'q1',
      question: 'What are the three main phases of a RAG pipeline?',
      options: [
        'Query, Search, Response',
        'Indexing, Retrieval, Generation',
        'Embedding, Matching, Answering',
        'Chunk, Store, Retrieve'
      ],
      correctAnswer: 1,
      explanation: 'RAG consists of Indexing (offline document processing), Retrieval (finding relevant content), and Generation (creating responses).',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'What is the main advantage of Self-RAG over standard RAG?',
      options: [
        'Faster retrieval',
        'Self-reflection and correction capabilities',
        'Lower cost',
        'Simpler implementation'
      ],
      correctAnswer: 1,
      explanation: 'Self-RAG adds self-reflection to evaluate retrieval quality, critique responses, and make corrections.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'What does CRAG do when retrieval quality is evaluated as "incorrect"?',
      options: [
        'Uses the retrieved documents anyway',
        'Falls back to web search',
        'Asks the user for clarification',
        'Generates without context'
      ],
      correctAnswer: 1,
      explanation: 'When CRAG evaluates retrieval as incorrect, it discards the documents and falls back to web search for better information.',
      difficulty: 'hard'
    },
    {
      id: 'q4',
      question: 'What is HyDE in the context of RAG?',
      options: [
        'High-Density Embeddings',
        'Hypothetical Document Embeddings',
        'Hybrid Dense Extraction',
        'Hierarchical Data Encoding'
      ],
      correctAnswer: 1,
      explanation: 'HyDE generates a hypothetical answer to the query, embeds it, and uses it for retrieval to bridge vocabulary gaps.',
      difficulty: 'medium'
    },
    {
      id: 'q5',
      question: 'When should you use Graph RAG instead of vector-based RAG?',
      options: [
        'For all queries',
        'For simple factual questions',
        'For complex entity relationships and multi-hop reasoning',
        'When speed is critical'
      ],
      correctAnswer: 2,
      explanation: 'Graph RAG excels at handling complex queries involving entity relationships and multi-hop reasoning through knowledge graphs.',
      difficulty: 'hard'
    },
    {
      id: 'q6',
      question: 'What is hybrid retrieval in RAG?',
      options: [
        'Using multiple LLMs',
        'Combining semantic and keyword-based search',
        'Retrieving from multiple databases',
        'Using both local and cloud storage'
      ],
      correctAnswer: 1,
      explanation: 'Hybrid retrieval combines dense (semantic/embedding) and sparse (BM25/TF-IDF) retrieval methods for better coverage.',
      difficulty: 'medium'
    }
  ]
};

// Multi-Agent Collaboration Quiz
export const multiAgentQuiz = {
  id: 'multi-agent-quiz',
  title: 'Multi-Agent Systems and Collaboration',
  description: 'Test your understanding of multi-agent patterns and coordination',
  questions: [
    {
      id: 'q1',
      question: 'What is the main advantage of multi-agent systems over single agents?',
      options: [
        'Always faster execution',
        'Lower cost',
        'Parallel processing and specialization',
        'Simpler implementation'
      ],
      correctAnswer: 2,
      explanation: 'Multi-agent systems enable parallel processing, agent specialization, and collective intelligence beyond individual capabilities.',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: 'In the blackboard pattern, who decides which agent acts next?',
      options: [
        'The agents vote',
        'Random selection',
        'The controller based on blackboard state',
        'First available agent'
      ],
      correctAnswer: 2,
      explanation: 'The blackboard controller examines the current state and selects the most appropriate knowledge source (agent) to contribute next.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'What percentage of agents can be faulty in Byzantine Fault Tolerant consensus?',
      options: [
        'Less than 10%',
        'Less than 25%',
        'Less than 33%',
        'Less than 50%'
      ],
      correctAnswer: 2,
      explanation: 'Byzantine Fault Tolerance can handle up to (n-1)/3 faulty agents, or approximately 33% of the total.',
      difficulty: 'hard'
    },
    {
      id: 'q4',
      question: 'What is stigmergic coordination?',
      options: [
        'Direct message passing between agents',
        'Central coordinator managing all agents',
        'Indirect coordination through environment modifications',
        'Voting-based decision making'
      ],
      correctAnswer: 2,
      explanation: 'Stigmergic coordination works through agents modifying the environment (like pheromone trails) which other agents sense and respond to.',
      difficulty: 'hard'
    },
    {
      id: 'q5',
      question: 'In the Contract Net Protocol, what is a CFP?',
      options: [
        'Certified Final Product',
        'Call for Proposals',
        'Contract Fulfillment Process',
        'Collaborative Feature Planning'
      ],
      correctAnswer: 1,
      explanation: 'CFP (Call for Proposals) is broadcast by the manager to announce a task and request bids from potential contractors.',
      difficulty: 'medium'
    },
    {
      id: 'q6',
      question: 'What enables emergent behavior in multi-agent systems?',
      options: [
        'Central planning',
        'Complex individual rules',
        'Simple local rules leading to complex collective behavior',
        'Direct coordination protocols'
      ],
      correctAnswer: 2,
      explanation: 'Emergent behavior arises from simple local rules and interactions that create complex collective patterns not explicitly programmed.',
      difficulty: 'hard'
    }
  ]
};

// Production and Advanced Topics Quiz
export const productionAdvancedQuiz = {
  id: 'production-advanced-quiz',
  title: 'Production Systems and Advanced Topics',
  description: 'Test your knowledge of production-ready agent systems',
  questions: [
    {
      id: 'q1',
      question: 'Which metric is most important for measuring agent reasoning quality?',
      options: [
        'Response time',
        'Token usage',
        'Reasoning validity score',
        'Cache hit rate'
      ],
      correctAnswer: 2,
      explanation: 'Reasoning validity score measures how logically sound each reasoning step is, directly impacting answer quality.',
      difficulty: 'medium'
    },
    {
      id: 'q2',
      question: 'What is the primary purpose of semantic compression in production RAG?',
      options: [
        'Reduce storage costs',
        'Fit more context into limited windows',
        'Improve retrieval speed',
        'Enhance security'
      ],
      correctAnswer: 1,
      explanation: 'Semantic compression reduces token usage while preserving meaning, allowing more context within model limits.',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'Which pattern helps prevent cascading failures in agent systems?',
      options: [
        'Checkpointing',
        'Circuit breaker',
        'Caching',
        'Load balancing'
      ],
      correctAnswer: 1,
      explanation: 'Circuit breakers detect failures and stop requests to failing services, preventing cascade effects.',
      difficulty: 'hard'
    },
    {
      id: 'q4',
      question: 'What is the main challenge with evaluating non-deterministic agent systems?',
      options: [
        'High cost',
        'Slow execution',
        'Inconsistent outputs making testing difficult',
        'Complex implementation'
      ],
      correctAnswer: 2,
      explanation: 'Non-deterministic outputs mean the same input can produce different valid results, complicating traditional testing.',
      difficulty: 'hard'
    },
    {
      id: 'q5',
      question: 'Which technique reduces costs in production agent systems?',
      options: [
        'Always using the largest model',
        'Adaptive model selection based on task complexity',
        'Avoiding caching',
        'Sequential processing only'
      ],
      correctAnswer: 1,
      explanation: 'Adaptive model selection uses smaller, cheaper models for simple tasks and larger models only when necessary.',
      difficulty: 'medium'
    },
    {
      id: 'q6',
      question: 'What is the recommended approach for agent observability?',
      options: [
        'Log everything possible',
        'No logging to save resources',
        'Structured logging with tracing and key metrics',
        'Only log errors'
      ],
      correctAnswer: 2,
      explanation: 'Structured logging with distributed tracing and key metrics provides visibility without overwhelming the system.',
      difficulty: 'medium'
    }
  ]
};

// Combine all quizzes
export const allAgenticPatternsQuizzes = [
  agentFundamentalsQuiz,
  reasoningPatternsQuiz,
  chainingPatternsQuiz,
  ragPatternsQuiz,
  multiAgentQuiz,
  productionAdvancedQuiz
];