import { Technique } from './types';

export const memoryManagementTechniques: Technique[] = [
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    abbr: '',
    icon: '🪟',
    color: 'from-pink-500 to-red-500',
    category: 'memory-management',
    description: 'Maintains fixed-size memory window of recent information',
    features: [
      'Fixed memory size',
      'Automatic cleanup',
      'Recency bias',
      'Efficient access'
    ],
    useCases: ['conversation-history', 'real-time-data', 'streaming-analysis', 'resource-limited'],
    complexity: 'low',
    example: 'Conversation Memory (Window Size: 10):\n\nMessages 1-10: [Stored in memory]\nNew message 11 arrives\n→ Remove message 1\n→ Store message 11\nMemory now contains messages 2-11\n\nAdvantage: Constant memory usage\nTrade-off: Older context is lost'
  },
  {
    id: 'hierarchical-memory',
    name: 'Hierarchical Memory',
    abbr: '',
    icon: '🗂️',
    color: 'from-red-500 to-orange-500',
    category: 'memory-management',
    description: 'Multi-level memory structure with different retention policies',
    features: [
      'Multi-tier storage',
      'Importance-based retention',
      'Automatic promotion/demotion',
      'Efficient retrieval'
    ],
    useCases: ['long-term-memory', 'knowledge-systems', 'personal-assistants', 'learning-systems'],
    complexity: 'high',
    example: 'Memory Hierarchy:\n\nLevel 1 (Working): Recent 50 interactions\nLevel 2 (Short-term): Important items from last week\nLevel 3 (Medium-term): Key insights from last month  \nLevel 4 (Long-term): Core facts and learned patterns\n\nAutomatic promotion based on access frequency and importance scores'
  },
  {
    id: 'attention-mechanisms',
    name: 'Attention Mechanisms',
    abbr: '',
    icon: '👁️',
    color: 'from-orange-500 to-yellow-500',
    category: 'memory-management',
    description: 'Selective focus on relevant information for current context',
    features: [
      'Relevance scoring',
      'Dynamic attention',
      'Context awareness',
      'Efficient processing'
    ],
    useCases: ['information-retrieval', 'context-selection', 'relevance-ranking', 'cognitive-modeling'],
    complexity: 'high',
    example: 'Query: "What was the weather like during our Paris trip?"\n\nAttention Scores:\n• "Paris vacation photos" (0.9)\n• "Weather forecast Paris" (0.95)\n• "Flight to Paris" (0.7)\n• "Lunch in Paris restaurant" (0.3)\n• "Weather app download" (0.2)\n\nSelected Context: High-attention items for response'
  },
  {
    id: 'memory-consolidation',
    name: 'Memory Consolidation',
    abbr: '',
    icon: '🧠',
    color: 'from-yellow-500 to-green-500',
    category: 'memory-management',
    description: 'Process of strengthening and organizing memories over time',
    features: [
      'Pattern extraction',
      'Redundancy removal',
      'Importance weighting',
      'Schema formation'
    ],
    useCases: ['learning-systems', 'knowledge-distillation', 'memory-optimization', 'pattern-recognition'],
    complexity: 'high',
    example: 'Weekly Memory Consolidation:\n\nRaw memories: 1000 interaction events\n↓\nPattern extraction: Identify common themes\n↓\nRedundancy removal: Merge similar events\n↓\nImportance weighting: Score by relevance\n↓\nSchema formation: Create knowledge structures\n↓\nConsolidated memory: 50 meaningful patterns'
  },
  {
    id: 'working-memory-patterns',
    name: 'Working Memory Patterns',
    abbr: 'WMP',
    icon: '🧮',
    color: 'from-amber-500 to-orange-500',
    category: 'memory-management',
    description: 'Short-term context management for active cognitive processing',
    features: [
      'Limited capacity management',
      'Active information maintenance',
      'Priority-based retention',
      'Real-time context updates'
    ],
    useCases: ['active-reasoning', 'multi-step-tasks', 'context-switching', 'cognitive-load-management'],
    complexity: 'medium',
    example: 'Multi-Step Problem Solving:\n\nWorking Memory State:\n┌─────────────────────────────┐\n│ Current Goal: Calculate ROI │\n│ Sub-goals: [Get costs, Get revenue, Apply formula] │\n│ Active Data: │\n│  • Revenue: $150K │\n│  • Costs: $100K │\n│  • Formula: (Rev-Cost)/Cost │\n│ Next Action: Apply formula │\n└─────────────────────────────┘\n\nCapacity: 7±2 items maintained simultaneously\nUpdate: Replace completed sub-goals with new ones'
  },
  {
    id: 'context-compression',
    name: 'Context Compression',
    abbr: 'CC',
    icon: '🗜️',
    color: 'from-purple-500 to-pink-500',
    category: 'memory-management',
    description: 'Efficient storage and retrieval of contextual information through compression techniques',
    features: [
      'Information distillation',
      'Semantic compression',
      'Lossy and lossless options',
      'Context reconstruction'
    ],
    useCases: ['long-conversations', 'memory-optimization', 'storage-efficiency', 'context-handoffs'],
    complexity: 'high',
    example: 'Conversation Compression:\n\nOriginal Context (2000 tokens):\nUser: "I need help planning my daughter\'s birthday party..."\n[Multiple exchanges about venue, guests, food, activities]\n\nCompressed Context (200 tokens):\n{\n  "event": "daughter_birthday_party",\n  "key_decisions": {\n    "venue": "backyard",\n    "guests": 15,\n    "theme": "unicorn",\n    "date": "2024-03-15"\n  },\n  "preferences": ["outdoor_activities", "homemade_cake"],\n  "constraints": ["budget_$300", "no_allergies"]\n}\n\nCompression ratio: 90% reduction while preserving essential context'
  }
];