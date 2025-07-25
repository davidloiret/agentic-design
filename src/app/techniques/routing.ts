import { Technique } from './types';

export const routingTechniques: Technique[] = [
  {
    id: 'dynamic-routing',
    name: 'Dynamic Routing',
    abbr: '',
    icon: '🎛️',
    color: 'from-emerald-500 to-cyan-500',
    category: 'routing',
    description: 'Routes prompts based on real-time analysis and context evaluation',
    features: [
      'Context-aware decision making',
      'Real-time path adaptation',
      'Multi-criteria routing logic',
      'Dynamic priority adjustment'
    ],
    useCases: ['intelligent-workflows', 'adaptive-systems', 'personalization', 'resource-optimization'],
    complexity: 'high',
    example: 'Content Generation Router:\n\nInput: "Create marketing content"\n↓\nContext Analysis:\n• Audience: Technical professionals\n• Channel: LinkedIn\n• Goal: Lead generation\n• Brand voice: Professional\n↓\nRoute Decision: Technical Content Chain\n↓\nSelected Path: Technical whitepaper template\nwith LinkedIn optimization\nand lead capture elements'
  },
  {
    id: 'content-based-routing',
    name: 'Content-Based Routing',
    abbr: 'CBR',
    icon: '📄',
    color: 'from-blue-500 to-cyan-500',
    category: 'routing',
    description: 'Routes requests based on content analysis and classification',
    features: [
      'Automatic content classification',
      'Topic-based routing decisions',
      'Multi-modal content analysis',
      'Dynamic routing rules'
    ],
    useCases: ['content-moderation', 'customer-support', 'document-processing', 'media-routing'],
    complexity: 'medium',
    example: 'Input: Customer email about billing issue\n\nContent Analysis:\n• Keywords: "charge", "incorrect", "refund"\n• Sentiment: Frustrated\n• Category: Billing\n• Priority: High\n\nRouting Decision: → Billing Specialist Agent\nwith escalation flag and customer context'
  },
  {
    id: 'capability-routing',
    name: 'Capability Routing',
    abbr: '',
    icon: '🎯',
    color: 'from-cyan-500 to-blue-500',
    category: 'routing',
    description: 'Routes tasks to agents based on their specialized capabilities',
    features: [
      'Capability matching algorithms',
      'Skill-based assignment',
      'Performance-aware routing',
      'Load balancing by expertise'
    ],
    useCases: ['task-assignment', 'expert-systems', 'specialized-processing', 'skill-matching'],
    complexity: 'high',
    example: 'Task: "Debug Python machine learning code"\n\nCapability Analysis:\n• Required skills: Python, ML, debugging\n• Agent A: Python (9/10), ML (7/10), Debug (8/10)\n• Agent B: Python (6/10), ML (9/10), Debug (5/10)\n• Agent C: Python (8/10), ML (6/10), Debug (9/10)\n\nRouting: Agent A (highest combined score: 8.0)'
  },
  {
    id: 'load-balancing',
    name: 'Load Balancing',
    abbr: '',
    icon: '⚖️',
    color: 'from-green-500 to-cyan-500',
    category: 'routing',
    description: 'Distributes workload evenly across available processing resources',
    features: [
      'Real-time load monitoring',
      'Dynamic resource allocation',
      'Queue management',
      'Performance optimization'
    ],
    useCases: ['high-volume-processing', 'resource-optimization', 'system-scaling', 'performance-tuning'],
    complexity: 'medium',
    example: 'Current System Load:\n• Server A: 45% CPU, 12 active tasks\n• Server B: 78% CPU, 18 active tasks  \n• Server C: 23% CPU, 6 active tasks\n\nNew Request: Complex analysis task\nRouting Decision: → Server C (lowest load)\nwith monitoring for potential redistribution'
  },
  {
    id: 'geographic-routing',
    name: 'Geographic Routing',
    abbr: '',
    icon: '🌍',
    color: 'from-green-500 to-teal-500',
    category: 'routing',
    description: 'Route requests based on geographic location and regional optimization',
    features: [
      'Location-based routing',
      'Regional processing optimization',
      'Latency minimization',
      'Compliance with data sovereignty',
      'Cultural and language adaptation',
      'Regional resource utilization'
    ],
    useCases: ['global-applications', 'cdn-optimization', 'compliance', 'localization'],
    complexity: 'medium',
    example: 'Global Customer Service:\n\nIncoming Request: User from Germany asking for support\n\nGeographic Routing Decision:\n• Route to EU data center (GDPR compliance)\n• Select German-speaking agent or German language model\n• Apply EU-specific business rules and policies\n• Use regional knowledge base with local regulations\n• Optimize for European timezone and cultural context\n\nResult: Culturally appropriate, compliant, and low-latency service'
  },
  {
    id: 'dynamic-context-assembly',
    name: 'Dynamic Context Assembly',
    abbr: 'DCA',
    icon: '🔧',
    color: 'from-indigo-500 to-purple-600',
    category: 'routing',
    description: 'Intelligent, real-time composition of context from multiple sources based on query analysis and relevance scoring',
    features: [
      'Multi-source context fusion',
      'Real-time relevance scoring',
      'Adaptive context selection',
      'Contextual routing mechanisms',
      'Quality-based prioritization',
      'Dynamic context window optimization'
    ],
    useCases: ['multi-domain-qa', 'research-assistance', 'expert-systems', 'personalized-ai', 'knowledge-synthesis'],
    complexity: 'high',
    example: 'Multi-Domain Research Query:\n\nQuery: "How do quantum computing advances affect cryptocurrency security?"\n\nDynamic Assembly Process:\n\n1. Query Analysis:\n   • Primary domains: Quantum computing, Cryptography, Blockchain\n   • Intent: Impact analysis, Security implications\n   • Complexity: High (requires expert knowledge)\n   • Time sensitivity: Medium\n\n2. Source Identification & Scoring:\n   • Recent quantum computing papers (relevance: 0.95)\n   • Cryptocurrency security research (relevance: 0.92)\n   • Post-quantum cryptography standards (relevance: 0.88)\n   • Industry reports on quantum threats (relevance: 0.85)\n   • General blockchain documentation (relevance: 0.60)\n\n3. Context Assembly Strategy:\n   • Allocate 40% context window to quantum computing advances\n   • Allocate 35% to current cryptographic methods in crypto\n   • Allocate 20% to post-quantum cryptography solutions\n   • Allocate 5% to implementation timelines\n\n4. Real-time Optimization:\n   • Monitor response quality during generation\n   • Adjust source weights based on utilization\n   • Cache frequently accessed combinations\n   • Update assembly rules based on feedback\n\nResult: Contextually rich, multi-domain response with balanced technical depth\n\nAdvantages:\n• Optimized context utilization (98% relevance score)\n• Reduced information overload\n• Adaptive to query complexity\n• Improved response coherence across domains'
  }
];