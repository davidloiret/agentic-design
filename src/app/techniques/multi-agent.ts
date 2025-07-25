import { Technique } from './types';

export const multiAgentTechniques: Technique[] = [
  {
    id: 'a2a-protocol',
    name: 'A2A Protocol (Agent2Agent)',
    abbr: 'A2A',
    icon: '🤝',
    color: 'from-blue-600 to-cyan-600',
    category: 'multi-agent',
    description: 'Open standard for AI agent interoperability enabling seamless collaboration across platforms',
    features: [
      'Universal interoperability',
      'Enterprise-grade security', 
      'Multi-modal communication',
      'Long-running task support',
      'Real-time state updates',
      'Cross-platform compatibility'
    ],
    useCases: ['cross-platform-collaboration', 'agent-ecosystems', 'enterprise-integration', 'multi-vendor-systems'],
    complexity: 'high',
    example: 'A2A Protocol Workflow:\n\n1. **Capability Discovery**:\n   • Client agent fetches Agent Card from remote agent\n   • Discovers available capabilities and supported formats\n   • JSON format: { "name": "DataAnalyzer", "capabilities": ["analysis", "visualization"] }\n\n2. **Task Initiation**:\n   • Client sends initial message with unique Task ID\n   • Remote agent acknowledges and begins processing\n   • Task lifecycle: initiated → processing → completed/failed\n\n3. **Real-time Collaboration**:\n   • Agents exchange messages with context and artifacts\n   • Support for text, audio, video streaming\n   • State updates via Server-Sent Events (SSE)\n\n4. **Cross-Platform Integration**:\n   • Research agent (Platform A) + Visualization agent (Platform B)\n   • Seamless data exchange via standardized protocol\n   • Enterprise authentication and authorization\n\nReal-world Impact:\n• Enables true multi-agent ecosystems\n• Reduces vendor lock-in\n• Accelerates agent adoption in enterprises\n• Standardizes agent communication patterns'
  },
  {
    id: 'agent-orchestration',
    name: 'Agent Orchestration',
    abbr: '',
    icon: '🎭',
    color: 'from-purple-600 to-blue-600',
    category: 'multi-agent',
    description: 'Central coordination of multiple AI agents for complex task execution',
    features: [
      'Centralized coordination',
      'Task delegation',
      'Resource allocation',
      'Workflow management',
      'Performance monitoring',
      'Error handling'
    ],
    useCases: ['complex-workflows', 'enterprise-automation', 'multi-step-processes', 'resource-optimization'],
    complexity: 'high',
    example: 'E-commerce Order Processing:\n\nOrchestrator receives order → Delegates to:\n• Inventory Agent: Check stock availability\n• Payment Agent: Process payment\n• Shipping Agent: Calculate delivery options\n• Notification Agent: Send confirmation\n\nOrchestrator coordinates timing, handles failures, and ensures complete order fulfillment'
  },
  {
    id: 'peer-collaboration',
    name: 'Peer Collaboration',
    abbr: '',
    icon: '👥',
    color: 'from-green-600 to-blue-600',
    category: 'multi-agent',
    description: 'Decentralized collaboration between equal agents without central authority',
    features: [
      'Peer-to-peer communication',
      'Consensus mechanisms',
      'Shared decision making',
      'Load distribution',
      'Fault tolerance',
      'Self-organization'
    ],
    useCases: ['distributed-problem-solving', 'consensus-building', 'peer-review', 'collaborative-research'],
    complexity: 'high', 
    example: 'Research Paper Review:\n\n3 Peer Agents collaborate:\n• Agent A: Reviews methodology\n• Agent B: Evaluates results\n• Agent C: Assesses conclusions\n\nEach agent shares findings, discusses disagreements, and reaches consensus on final evaluation'
  },
  {
    id: 'hierarchical-coordination',
    name: 'Hierarchical Coordination',
    abbr: '',
    icon: '🏛️',
    color: 'from-indigo-600 to-purple-600',
    category: 'multi-agent',
    description: 'Multi-level agent coordination with supervisory and subordinate relationships',
    features: [
      'Multi-level hierarchy',
      'Authority delegation',
      'Escalation procedures',
      'Performance oversight',
      'Resource authorization',
      'Policy enforcement'
    ],
    useCases: ['organizational-workflows', 'management-systems', 'approval-processes', 'complex-operations'],
    complexity: 'high',
    example: 'Corporate Decision Making:\n\nCEO Agent (Level 1)\n├─ Department Manager Agents (Level 2)\n│  ├─ Team Lead Agents (Level 3)\n│  └─ Worker Agents (Level 4)\n\nDecisions flow up hierarchy, approvals flow down, with appropriate authority levels'
  },
  {
    id: 'consensus-algorithms',
    name: 'Consensus Algorithms',
    abbr: '',
    icon: '⚖️',
    color: 'from-orange-600 to-red-600',
    category: 'multi-agent',
    description: 'Distributed agreement mechanisms for multi-agent decision making',
    features: [
      'Byzantine fault tolerance',
      'Voting mechanisms', 
      'Conflict resolution',
      'Agreement protocols',
      'Distributed consensus',
      'Finality guarantees'
    ],
    useCases: ['distributed-systems', 'blockchain-networks', 'multi-agent-voting', 'fault-tolerant-systems'],
    complexity: 'high',
    example: 'Multi-Agent Investment Decision:\n\n5 Investment Agents vote on stock purchase:\n• Agent A: BUY (confidence: 85%)\n• Agent B: BUY (confidence: 78%)\n• Agent C: HOLD (confidence: 60%)\n• Agent D: BUY (confidence: 92%)\n• Agent E: SELL (confidence: 45%)\n\nConsensus algorithm weights by confidence → Final decision: BUY'
  },
  {
    id: 'agent-to-agent',
    name: 'Agent-to-Agent Communication',
    abbr: '',
    icon: '💬',
    color: 'from-cyan-600 to-blue-600',
    category: 'multi-agent',
    description: 'Direct communication protocols between AI agents',
    features: [
      'Direct messaging',
      'Protocol negotiation',
      'Message formatting',
      'Authentication',
      'Error handling',
      'State synchronization'
    ],
    useCases: ['peer-communication', 'data-exchange', 'coordination-protocols', 'distributed-collaboration'],
    complexity: 'medium',
    example: 'Agent Communication Protocol:\n\nMessage Format:\n{\n  "from": "agent-1",\n  "to": "agent-2", \n  "type": "task-request",\n  "payload": { "task": "analyze-data", "data": "..." },\n  "timestamp": "2025-01-01T00:00:00Z"\n}\n\nResponse handling, acknowledgments, and error recovery'
  },
  {
    id: 'message-passing',
    name: 'Message Passing',
    abbr: '',
    icon: '📬',
    color: 'from-teal-600 to-green-600',
    category: 'multi-agent',
    description: 'Asynchronous message exchange system for agent communication',
    features: [
      'Asynchronous delivery',
      'Message queuing',
      'Delivery guarantees',
      'Message ordering',
      'Persistence',
      'Routing'
    ],
    useCases: ['async-communication', 'event-driven-systems', 'workflow-coordination', 'notification-systems'],
    complexity: 'medium',
    example: 'Event-Driven Processing:\n\nOrder Agent → Message Queue → [Payment Agent, Inventory Agent, Shipping Agent]\n\nMessages processed asynchronously with delivery confirmations and retry mechanisms'
  },
  {
    id: 'pub-sub-patterns',
    name: 'Publish-Subscribe Patterns',
    abbr: '',
    icon: '📡',
    color: 'from-yellow-600 to-orange-600',
    category: 'multi-agent',
    description: 'Event-driven communication where agents publish events and subscribe to topics',
    features: [
      'Topic-based routing',
      'Event broadcasting',
      'Subscriber management',
      'Message filtering',
      'Scalable distribution',
      'Decoupled communication'
    ],
    useCases: ['event-systems', 'notification-broadcasting', 'real-time-updates', 'distributed-events'],
    complexity: 'medium',
    example: 'Market Data Distribution:\n\nMarket Data Agent publishes to "stock-prices" topic\n↓\nSubscribers: Trading Agent, Analysis Agent, Alert Agent\n\nEach subscriber receives relevant price updates automatically'
  },
  {
    id: 'gossip-protocols',
    name: 'Gossip Protocols',
    abbr: '',
    icon: '🗣️',
    color: 'from-pink-600 to-purple-600',
    category: 'multi-agent',
    description: 'Epidemic-style information dissemination between agents',
    features: [
      'Epidemic spreading',
      'Fault tolerance',
      'Eventual consistency',
      'Scalable distribution',
      'Self-healing',
      'Probabilistic delivery'
    ],
    useCases: ['distributed-consensus', 'information-spreading', 'network-maintenance', 'fault-recovery'],
    complexity: 'high',
    example: 'Network Status Propagation:\n\nAgent A learns of system update → Randomly shares with 3 neighbors\n→ Each neighbor shares with 3 more → Information spreads exponentially\n\nEnsures all agents eventually receive updates despite individual failures'
  },
  {
    id: 'actor-frameworks',
    name: 'Actor Frameworks',
    abbr: '',
    icon: '🎬',
    color: 'from-red-600 to-pink-600',
    category: 'multi-agent',
    description: 'Actor model implementation for concurrent agent execution',
    features: [
      'Actor isolation',
      'Message-based communication',
      'Supervision trees',
      'Fault recovery',
      'Location transparency',
      'Scalable concurrency'
    ],
    useCases: ['concurrent-systems', 'fault-tolerant-applications', 'distributed-computing', 'real-time-processing'],
    complexity: 'high',
    example: 'Customer Service System:\n\nSupervisor Actor\n├─ Chat Agent Actors (handle conversations)\n├─ Escalation Agent Actor (complex issues)\n└─ Analytics Agent Actor (track metrics)\n\nEach actor processes messages independently with supervision and restart capabilities'
  },
  {
    id: 'distributed-coordination',
    name: 'Distributed Coordination',
    abbr: '',
    icon: '🗺️',
    color: 'from-gray-600 to-blue-600',
    category: 'multi-agent',
    description: 'Coordination mechanisms for agents across distributed systems',
    features: [
      'Distributed consensus',
      'Leader election',
      'Distributed locks',
      'Coordination protocols',
      'Failure detection',
      'Network partitioning'
    ],
    useCases: ['distributed-systems', 'cluster-management', 'resource-coordination', 'system-reliability'],
    complexity: 'high',
    example: 'Distributed Task Processing:\n\nTask coordination across 5 data centers:\n• Leader election for task assignment\n• Distributed locks for resource access\n• Failure detection and recovery\n• Network partition handling\n\nEnsures tasks complete even with node failures or network issues'
  }
]; 