import { Flashcard } from '../learning-content';

// Core Agent Concepts Flashcards
export const coreAgentConceptsFlashcards: Flashcard[] = [
  {
    id: 'agent-definition',
    front: 'What distinguishes an AI agent from a simple LLM?',
    back: 'AI agents have: 1) Goal-directed behavior, 2) Autonomy in decision-making, 3) Environmental awareness, 4) Tool use capability, 5) Memory and state management, 6) Learning and adaptation abilities',
    topic: 'fundamentals',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-components',
    front: 'What are the five core components of an agent architecture?',
    back: '1) Perception Module (understanding environment), 2) Reasoning Engine (decision making), 3) Memory System (storing/retrieving information), 4) Action Executor (interacting with tools), 5) Learning Module (improving over time)',
    topic: 'architecture',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-types',
    front: 'Name and describe three types of AI agents',
    back: '1) Reactive Agents: Simple stimulus-response, no memory. 2) Deliberative Agents: Planning with world models. 3) Learning Agents: Improve through experience. Others include Hybrid, Multi-Agent Systems, and Cognitive Architectures',
    topic: 'types',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-memory-types',
    front: 'What are the three main types of memory in agent systems?',
    back: '1) Working Memory: Short-term, limited capacity for current tasks. 2) Long-term Memory: Persistent storage of knowledge and experiences. 3) Episodic Memory: Specific interaction histories and events',
    topic: 'memory',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-autonomy-levels',
    front: 'What are the five levels of agent autonomy?',
    back: 'Level 0: Basic prompting, Level 1: Prompt chaining, Level 2: Tool-augmented LLMs, Level 3: ReAct agents with reasoning, Level 4: Fully autonomous with learning, Level 5: Multi-agent systems',
    topic: 'fundamentals',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-challenges',
    front: 'What are four key challenges in building production agents?',
    back: '1) Reliability and consistency with non-deterministic outputs, 2) Context management with limited windows, 3) Cost and performance optimization, 4) Safety and control boundaries',
    topic: 'production',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  }
];

// Reasoning Patterns Flashcards
export const reasoningPatternsFlashcards: Flashcard[] = [
  {
    id: 'cot-definition',
    front: 'What is Chain of Thought (CoT) prompting?',
    back: 'A prompting technique that improves reasoning by adding phrases like "Let\'s think step by step" to make the model show intermediate reasoning steps, typically improving accuracy by 10-40% on complex tasks',
    topic: 'reasoning',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'tot-vs-cot',
    front: 'How does Tree of Thoughts differ from Chain of Thought?',
    back: 'ToT explores multiple reasoning paths with backtracking capability, while CoT follows a single linear path. ToT uses beam search or BFS/DFS to systematically explore solution spaces',
    topic: 'reasoning',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'got-concept',
    front: 'What is Graph of Thought (GoT)?',
    back: 'GoT enables non-linear reasoning where thoughts can connect in arbitrary ways, allowing merging, splitting, and cycles. It builds a graph structure of interconnected reasoning steps',
    topic: 'reasoning',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'react-pattern',
    front: 'What is the ReAct pattern?',
    back: 'ReAct interleaves Reasoning and Acting, alternating between thinking about what to do and taking actions. Format: Thought → Action → Observation → repeat until solution',
    topic: 'reasoning',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'self-consistency',
    front: 'How does self-consistency improve CoT?',
    back: 'Self-consistency generates multiple reasoning chains with different random seeds (temperature > 0), then selects the most common answer through majority voting, significantly improving accuracy',
    topic: 'reasoning',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'least-to-most',
    front: 'What is least-to-most prompting?',
    back: 'A technique that decomposes complex problems into simpler subproblems, solves them in order of increasing complexity, using solutions of simpler problems to solve harder ones',
    topic: 'reasoning',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'reflexion-pattern',
    front: 'How does the Reflexion pattern work?',
    back: 'Reflexion adds self-reflection: 1) Generate solution, 2) Evaluate solution, 3) Generate reflection on failures, 4) Retry with reflection history, iterating until satisfactory',
    topic: 'reasoning',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'reasoning-selection',
    front: 'When should you use ToT over CoT?',
    back: 'Use ToT for: puzzles, game playing, problems with multiple valid paths, when backtracking is needed. Use CoT for: mathematical problems, sequential reasoning, when a single path suffices',
    topic: 'reasoning',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  }
];

// Chaining Patterns Flashcards
export const chainingPatternsFlashcards: Flashcard[] = [
  {
    id: 'sequential-chain',
    front: 'What is sequential chaining?',
    back: 'Agents execute one after another in predetermined order, passing results forward. Best for: ETL pipelines, document processing, multi-stage analysis',
    topic: 'chaining',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'parallel-chain',
    front: 'When should you use parallel chaining?',
    back: 'Use parallel chaining when tasks are independent and can run simultaneously. Benefits: reduced latency, better resource utilization. Examples: map-reduce, scatter-gather',
    topic: 'chaining',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'conditional-chain',
    front: 'What is conditional chaining?',
    back: 'Execution path determined by runtime conditions. Includes if-else chains, switch-case patterns, and dynamic routing based on data characteristics or results',
    topic: 'chaining',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'hierarchical-chain',
    front: 'Describe hierarchical chaining',
    back: 'Nested agent structures with parent-child relationships. Examples: supervisor-worker, recursive decomposition, delegation chains. Enables multi-level coordination',
    topic: 'chaining',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'map-reduce-pattern',
    front: 'How does map-reduce work in agent chaining?',
    back: 'Map phase: divide data among parallel agents for processing. Reduce phase: combine/aggregate results from all mappers into final output',
    topic: 'chaining',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'feedback-loop',
    front: 'What is a feedback loop chain?',
    back: 'Primary agent generates output, feedback agent evaluates it, primary agent refines based on feedback. Continues until quality threshold met or max iterations reached',
    topic: 'chaining',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'checkpointing',
    front: 'Why use checkpointing in chains?',
    back: 'Checkpointing saves intermediate states, enabling: 1) Recovery from failures without full restart, 2) Debugging specific stages, 3) Partial re-execution, 4) Progress monitoring',
    topic: 'chaining',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  }
];

// RAG Patterns Flashcards
export const ragPatternsFlashcards: Flashcard[] = [
  {
    id: 'rag-basics',
    front: 'What are the three phases of RAG?',
    back: '1) Indexing Phase: Chunk documents → Create embeddings → Store in vector DB. 2) Retrieval Phase: Embed query → Search → Rank results. 3) Generation Phase: Augment prompt → Generate response',
    topic: 'rag',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'naive-vs-advanced',
    front: 'How does Advanced RAG improve on Naive RAG?',
    back: 'Advanced RAG adds: Query enhancement (expansion, decomposition), Hybrid retrieval (dense + sparse), Re-ranking, Context compression, Citation tracking',
    topic: 'rag',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'self-rag',
    front: 'What makes Self-RAG unique?',
    back: 'Self-RAG adds reflection: Decides if retrieval needed, Assesses retrieval quality, Critiques its own responses, Adapts retrieval strategy, Provides confidence scores',
    topic: 'rag',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'corrective-rag',
    front: 'What is CRAG (Corrective RAG)?',
    back: 'CRAG actively corrects errors: Evaluates retrieval quality (correct/incorrect/ambiguous), Falls back to web search, Resolves contradictions, Fills knowledge gaps',
    topic: 'rag',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'graph-rag',
    front: 'When should you use Graph RAG?',
    back: 'Use Graph RAG for: Complex entity relationships, Multi-hop reasoning, Path-based queries, Aggregation queries. Builds knowledge graphs for structured retrieval',
    topic: 'rag',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'hyde-technique',
    front: 'What is HyDE in RAG?',
    back: 'Hypothetical Document Embeddings: Generate a hypothetical answer to the query, embed it, use for retrieval. Helps bridge vocabulary gaps between queries and documents',
    topic: 'rag',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'hybrid-retrieval',
    front: 'What is hybrid retrieval in RAG?',
    back: 'Combines multiple retrieval methods: Dense (semantic/embedding), Sparse (BM25/TF-IDF), Metadata filtering. Results merged using reciprocal rank fusion',
    topic: 'rag',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'chunking-strategies',
    front: 'What are three document chunking strategies?',
    back: '1) Fixed-size: Simple character/token splits, 2) Semantic: Split by meaning units, 3) Sliding window: Overlapping chunks for context preservation',
    topic: 'rag',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  }
];

// Multi-Agent Collaboration Flashcards
export const multiAgentFlashcards: Flashcard[] = [
  {
    id: 'mas-benefits',
    front: 'What are the key benefits of multi-agent systems?',
    back: 'Parallel processing, Specialization of agents, Fault tolerance through redundancy, Scalability, Emergent problem-solving capabilities beyond individual agents',
    topic: 'multi-agent',
    difficulty: 'easy',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'supervisor-worker',
    front: 'How does the supervisor-worker pattern work?',
    back: 'Supervisor decomposes tasks, assigns to workers based on capabilities, monitors execution, handles failures, aggregates results. Workers execute assigned tasks and report back',
    topic: 'multi-agent',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'peer-collaboration',
    front: 'What enables peer-to-peer agent collaboration?',
    back: 'Peer discovery mechanisms, Capability advertisement, Negotiation protocols, Shared workspaces, Consensus mechanisms, No central authority required',
    topic: 'multi-agent',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'blackboard-pattern',
    front: 'What is the blackboard pattern?',
    back: 'Shared knowledge space where agents (knowledge sources) contribute solutions. Controller selects which agent acts next based on blackboard state. Enables opportunistic problem solving',
    topic: 'multi-agent',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'consensus-types',
    front: 'Name three consensus mechanisms for multi-agent systems',
    back: '1) Voting (simple majority, weighted, ranked choice), 2) Byzantine Fault Tolerant (PBFT), 3) Swarm consensus (pheromone-based emergence)',
    topic: 'multi-agent',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'contract-net',
    front: 'How does the Contract Net Protocol work?',
    back: 'Manager broadcasts task (CFP), Contractors submit bids, Manager evaluates and awards contract to best bidder, Contractor executes and reports results',
    topic: 'multi-agent',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'stigmergic-coordination',
    front: 'What is stigmergic coordination?',
    back: 'Indirect coordination through environment modification (like ant pheromones). Agents leave traces that others sense and respond to, creating emergent coordination without direct communication',
    topic: 'multi-agent',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fipa-acl',
    front: 'What are common FIPA-ACL performatives?',
    back: 'inform (share info), request (ask for action), query (ask question), propose (suggest), accept/reject-proposal, agree/refuse, subscribe (register for updates)',
    topic: 'multi-agent',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  }
];

// Production and Optimization Flashcards
export const productionPatternsFlashcards: Flashcard[] = [
  {
    id: 'agent-observability',
    front: 'What metrics should you monitor in production agent systems?',
    back: 'Latency (per step), Token usage, Tool call frequency, Error rates, Success/failure ratios, Cost per request, Context window usage, Cache hit rates',
    topic: 'production',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'agent-safety',
    front: 'What are key safety considerations for production agents?',
    back: 'Input validation, Output sanitization, Rate limiting, Sandboxed execution, Audit logging, Human oversight hooks, Boundary enforcement, Rollback capabilities',
    topic: 'production',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'cost-optimization',
    front: 'How can you optimize agent costs?',
    back: 'Caching frequent queries, Batching similar requests, Using smaller models when possible, Semantic compression, Staged retrieval, Async processing, Token budget management',
    topic: 'production',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'fault-tolerance',
    front: 'What fault tolerance patterns apply to agents?',
    back: 'Retry with exponential backoff, Circuit breakers, Fallback strategies, Checkpointing, Redundant agents, Graceful degradation, Health checks',
    topic: 'production',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'evaluation-metrics',
    front: 'What metrics evaluate agent effectiveness?',
    back: 'Task success rate, Reasoning validity, Response coherence, Factual accuracy, Hallucination rate, User satisfaction, Time to solution, Resource efficiency',
    topic: 'production',
    difficulty: 'medium',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'scaling-strategies',
    front: 'How do you scale multi-agent systems?',
    back: 'Horizontal scaling (more agents), Load balancing, Distributed state management, Event-driven architecture, Microservices pattern, Container orchestration, Queue-based decoupling',
    topic: 'production',
    difficulty: 'hard',
    reviewCount: 0,
    correctCount: 0
  }
];

// Combine all flashcard sets
export const allAgenticPatternsFlashcards = [
  ...coreAgentConceptsFlashcards,
  ...reasoningPatternsFlashcards,
  ...chainingPatternsFlashcards,
  ...ragPatternsFlashcards,
  ...multiAgentFlashcards,
  ...productionPatternsFlashcards
];