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
    color: 'from-emerald-500 to-green-500',
    category: 'routing',
    description: 'Routes requests based on geographic location and regional requirements',
    features: [
      'Location-aware routing',
      'Regional compliance handling',
      'Latency optimization',
      'Data sovereignty compliance'
    ],
    useCases: ['global-services', 'compliance', 'latency-optimization', 'regional-customization'],
    complexity: 'high',
    example: 'User Request from Germany:\n\nLocation Analysis:\n• IP Geolocation: Frankfurt, DE\n• Regulatory: GDPR compliance required\n• Language: German preferred\n• Data residency: EU required\n\nRouting: → EU Frankfurt Data Center\nwith GDPR-compliant processing pipeline'
  }
];