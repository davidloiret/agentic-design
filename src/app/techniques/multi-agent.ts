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
    id: 'agent-communication-protocols',
    name: 'Agent Communication Protocols',
    abbr: 'ACP',
    icon: '📡',
    color: 'from-teal-600 to-green-600',
    category: 'multi-agent',
    description: 'Standardized communication mechanisms for agent interaction including message passing, publish-subscribe, and event-driven patterns',
    features: [
      'Asynchronous messaging',
      'Topic-based routing',
      'Message queuing',
      'Event broadcasting',
      'Delivery guarantees',
      'Subscriber management',
      'Message filtering',
      'Scalable distribution'
    ],
    useCases: ['async-communication', 'event-driven-systems', 'workflow-coordination', 'notification-systems', 'real-time-updates'],
    complexity: 'medium',
    example: 'Multi-Protocol Agent Communication:\n\n**Message Passing Pattern:**\n• Order Agent → Message Queue → [Payment, Inventory, Shipping]\n• Asynchronous processing with delivery confirmations\n• Retry mechanisms for failed messages\n\n**Publish-Subscribe Pattern:**\n• Market Data Agent publishes to "stock-prices" topic\n• Subscribers: Trading Agent, Analysis Agent, Alert Agent\n• Real-time price updates to all interested parties\n\n**Event-Driven Coordination:**\n• User action triggers cascade of events\n• Multiple agents respond to relevant events\n• Loose coupling between event producers/consumers\n\n**Protocol Features:**\n• JSON message format with metadata\n• Topic-based routing and filtering\n• Guaranteed delivery and ordering\n• Scalable to thousands of agents'
  },
  {
    id: 'supervisor-worker-pattern',
    name: 'Supervisor-Worker Pattern',
    abbr: 'SVW',
    icon: '👨‍💼',
    color: 'from-indigo-600 to-blue-600',
    category: 'multi-agent',
    description: 'Orchestrator-worker architecture where a lead agent coordinates specialized subagents for parallel task execution',
    features: [
      'Dynamic task decomposition',
      'Parallel subagent coordination',
      'Intelligent workload distribution',
      'Real-time strategy adjustment',
      'Centralized quality control',
      'Scalable agent spawning'
    ],
    useCases: ['research-orchestration', 'complex-analysis', 'parallel-processing', 'dynamic-workflows'],
    complexity: 'high',
    example: 'Research Query Processing:\n\n**Supervisor Agent:**\n• Analyzes query: "Impact of AI on healthcare"\n• Decomposes into 4 parallel tasks:\n  - Medical applications research\n  - Regulatory implications analysis\n  - Economic impact assessment\n  - Ethical considerations review\n\n**Worker Agents (Parallel):**\n• MedAgent: Searches medical databases, clinical trials\n• RegAgent: Reviews FDA guidelines, compliance requirements\n• EconAgent: Analyzes cost-benefit data, market reports\n• EthicsAgent: Examines bias, privacy, accountability issues\n\n**Coordination:**\n• Each worker operates in separate context window\n• Supervisor monitors progress, adjusts strategies\n• Can spawn additional workers if needed\n• Final synthesis of all findings\n\n**Performance:** 90% improvement over single-agent systems'
  },
  {
    id: 'shared-scratchpad-collaboration',
    name: 'Shared Scratchpad Collaboration',
    abbr: 'SSC',
    icon: '📝',
    color: 'from-green-600 to-teal-600',
    category: 'multi-agent',
    description: 'Multiple agents collaborate transparently on a common workspace with shared visibility of all work',
    features: [
      'Transparent collaboration',
      'Shared state management',
      'Real-time work visibility',
      'Collaborative refinement',
      'Progressive building',
      'Cross-agent learning'
    ],
    useCases: ['collaborative-writing', 'problem-solving', 'brainstorming', 'peer-review'],
    complexity: 'medium',
    example: 'Collaborative Document Creation:\n\n**Shared Workspace:**\n```\nDocument: "AI Safety Guidelines"\nSection 1: [ResearchAgent] Technical foundations...\nSection 2: [PolicyAgent] Regulatory framework...\nSection 3: [EthicsAgent] Ethical considerations...\nReview Notes: [ReviewAgent] Suggestions for improvement...\n```\n\n**Agent Interactions:**\n• ResearchAgent adds technical content\n• PolicyAgent sees research, adds regulatory context\n• EthicsAgent reviews both, adds ethical framework\n• ReviewAgent provides overall critique and suggestions\n• All agents can see and build upon each other\'s work\n\n**Benefits:**\n• No information silos\n• Natural collaboration flow\n• Iterative improvement\n• Transparent decision-making'
  },
  {
    id: 'sequential-pipeline-agents',
    name: 'Sequential Pipeline Agents',
    abbr: 'SPA',
    icon: '🔄',
    color: 'from-purple-600 to-pink-600',
    category: 'multi-agent',
    description: 'Specialized agents process tasks in a linear pipeline where each agent\'s output becomes the next agent\'s input',
    features: [
      'Linear workflow processing',
      'Specialized agent roles',
      'Output-input chaining',
      'Quality checkpoints',
      'Stage-specific optimization',
      'Error isolation'
    ],
    useCases: ['content-production', 'data-processing', 'quality-assurance', 'multi-stage-analysis'],
    complexity: 'medium',
    example: 'Content Creation Pipeline:\n\n**Stage 1: Research Agent**\n• Input: Topic "Quantum Computing"\n• Tools: Academic databases, news APIs\n• Output: Research summary with key findings\n\n**Stage 2: Content Agent**\n• Input: Research summary\n• Tools: Writing frameworks, style guides\n• Output: First draft article\n\n**Stage 3: Editor Agent**\n• Input: First draft\n• Tools: Grammar checkers, style validators\n• Output: Edited article with improvements\n\n**Stage 4: Fact-Check Agent**\n• Input: Edited article\n• Tools: Verification databases, citation tools\n• Output: Verified, publication-ready content\n\n**Advantages:**\n• Each agent optimized for specific task\n• Clear quality gates between stages\n• Easy to debug and improve individual stages'
  },
  {
    id: 'concurrent-orchestration',
    name: 'Concurrent Orchestration',
    abbr: 'CO',
    icon: '⚡',
    color: 'from-yellow-600 to-orange-600',
    category: 'multi-agent',
    description: 'Multiple agents work simultaneously on the same task to provide diverse perspectives and parallel processing power',
    features: [
      'Simultaneous processing',
      'Diverse perspectives',
      'Ensemble reasoning',
      'Parallel brainstorming',
      'Result aggregation',
      'Consensus building'
    ],
    useCases: ['brainstorming', 'decision-making', 'creative-generation', 'risk-assessment'],
    complexity: 'medium',
    example: 'Investment Decision Analysis:\n\n**Problem:** Should we invest in Company X?\n\n**Concurrent Agents:**\n• **FinancialAgent:** Analyzes balance sheets, cash flow, ratios\n• **MarketAgent:** Examines industry trends, competition, growth\n• **RiskAgent:** Evaluates regulatory risks, market volatility\n• **TechAgent:** Assesses technology stack, innovation potential\n\n**Parallel Processing:**\n• All agents work simultaneously on same data\n• Each applies different analytical framework\n• Independent conclusions reached\n\n**Aggregation:**\n• Collect all perspectives: Financial (Buy), Market (Hold), Risk (Sell), Tech (Buy)\n• Synthesis agent weighs factors and confidence levels\n• Final recommendation with reasoning from all angles\n\n**Benefits:**\n• Comprehensive analysis\n• Reduced blind spots\n• Higher confidence decisions'
  },
  {
    id: 'handoff-orchestration',
    name: 'Handoff Orchestration',
    abbr: 'HO',
    icon: '🤝',
    color: 'from-teal-600 to-cyan-600',
    category: 'multi-agent',
    description: 'Dynamic delegation where agents intelligently transfer control based on context and specialized capabilities',
    features: [
      'Context-aware routing',
      'Dynamic delegation',
      'Capability matching',
      'Seamless transitions',
      'Full control transfer',
      'Intelligent escalation'
    ],
    useCases: ['customer-support', 'technical-troubleshooting', 'escalation-workflows', 'expertise-routing'],
    complexity: 'medium',
    example: 'Customer Support System:\n\n**Initial Contact:**\n• **TierOneAgent:** General support, FAQ handling\n• Query: "My database connection keeps failing"\n• Assessment: Technical issue requiring specialization\n\n**Dynamic Handoff:**\n• Analysis: Keywords "database", "connection", "failing"\n• Routing decision: Transfer to DatabaseSpecialist\n• Context transfer: Customer info, issue description, attempted solutions\n\n**Specialist Handling:**\n• **DatabaseAgent:** Takes full control\n• Accesses specialized tools: DB logs, connection diagnostics\n• Deeper investigation and resolution\n\n**Escalation if Needed:**\n• If complex: Hand off to SeniorDBAAgent\n• If resolved: Hand back to TierOneAgent for follow-up\n\n**Benefits:**\n• Right expertise at right time\n• Efficient resource utilization\n• Better customer outcomes'
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
    abbr: 'HC',
    icon: '🏛️',
    color: 'from-indigo-600 to-purple-600',
    category: 'multi-agent',
    description: 'Multi-level agent coordination with supervisory relationships, centralized orchestration, and authority delegation',
    features: [
      'Multi-level hierarchy',
      'Centralized coordination',
      'Authority delegation',
      'Task delegation',
      'Resource allocation',
      'Escalation procedures',
      'Performance oversight',
      'Workflow management'
    ],
    useCases: ['organizational-workflows', 'enterprise-automation', 'complex-workflows', 'management-systems', 'approval-processes', 'multi-step-processes'],
    complexity: 'high',
    example: 'Enterprise Automation System:\n\n**Level 1: Executive Agent (CEO)**\n• Strategic oversight and resource authorization\n• Monitors overall system performance\n• Handles high-level policy decisions\n\n**Level 2: Department Managers**\n• Operations Manager: Coordinates daily workflows\n• Quality Manager: Ensures output standards\n• Resource Manager: Allocates computational resources\n\n**Level 3: Team Lead Agents**\n• Data Processing Lead: Manages data ingestion team\n• Analysis Lead: Coordinates analytical workflows\n• Output Lead: Oversees final deliverable generation\n\n**Level 4: Worker Agents**\n• Specialized task execution (ETL, ML, reporting)\n• Report status up hierarchy\n• Request resources through proper channels\n\n**E-commerce Example:**\nOrchestrator receives order → Delegates to:\n• Inventory Agent: Check stock availability\n• Payment Agent: Process payment\n• Shipping Agent: Calculate delivery options\n• Notification Agent: Send confirmation\n\nCoordinates timing, handles failures, ensures fulfillment'
  },
  // {
  //   id: 'consensus-algorithms',
  //   name: 'Consensus Algorithms',
  //   abbr: '',
  //   icon: '⚖️',
  //   color: 'from-orange-600 to-red-600',
  //   category: 'multi-agent',
  //   description: 'Distributed agreement mechanisms for multi-agent decision making',
  //   features: [
  //     'Byzantine fault tolerance',
  //     'Voting mechanisms', 
  //     'Conflict resolution',
  //     'Agreement protocols',
  //     'Distributed consensus',
  //     'Finality guarantees'
  //   ],
  //   useCases: ['distributed-systems', 'blockchain-networks', 'multi-agent-voting', 'fault-tolerant-systems'],
  //   complexity: 'high',
  //   example: 'Multi-Agent Investment Decision:\n\n5 Investment Agents vote on stock purchase:\n• Agent A: BUY (confidence: 85%)\n• Agent B: BUY (confidence: 78%)\n• Agent C: HOLD (confidence: 60%)\n• Agent D: BUY (confidence: 92%)\n• Agent E: SELL (confidence: 45%)\n\nConsensus algorithm weights by confidence → Final decision: BUY'
  // },
]; 