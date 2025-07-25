import { Technique } from './types';

export const memoryManagementTechniques: Technique[] = [
  {
    id: 'latent-memory-networks',
    name: 'Latent Memory Networks',
    abbr: 'LMN',
    icon: '🧬',
    color: 'from-violet-500 to-purple-600',
    category: 'memory-management',
    description: 'Store reasoning patterns and knowledge in continuous latent space representations',
    features: [
      'Continuous latent space encoding',
      'Pattern-based memory storage',
      'Abstract reasoning preservation',
      'Semantic similarity retrieval',
      'Efficient memory compression',
      'Cross-domain knowledge transfer'
    ],
    useCases: ['knowledge-reasoning', 'cross-domain-transfer', 'pattern-recognition', 'semantic-memory'],
    complexity: 'high',
    example: 'Scientific Knowledge Storage:\n\nTraditional Approach:\n"The mitochondria is the powerhouse of the cell"\n"ATP synthesis occurs in mitochondria"\n"Cellular respiration produces ATP"\n\nLatent Memory Network:\n• Encodes knowledge as dense vectors in latent space\n• Stores abstract relationships: [energy_production] ↔ [cellular_organelles]\n• Enables queries like "What produces energy?" → retrieves mitochondria concept\n• Cross-domain transfer: Energy production patterns apply to batteries, engines\n\nAdvantages:\n• 80% memory compression vs text storage\n• Semantic relationships preserved\n• Enables analogical reasoning\n• Generalizes across similar concepts'
  },
  {
    id: 'adaptive-context-depth',
    name: 'Adaptive Context Depth',
    abbr: 'ACD',
    icon: '📊',
    color: 'from-cyan-500 to-blue-600',
    category: 'memory-management',
    description: 'Dynamically adjust memory depth and context complexity based on task requirements',
    features: [
      'Dynamic depth adjustment',
      'Complexity-aware memory allocation',
      'Real-time resource optimization',
      'Task-specific context sizing',
      'Automated difficulty assessment',
      'Energy-efficient processing'
    ],
    useCases: ['resource-optimization', 'real-time-systems', 'adaptive-ai', 'context-management'],
    complexity: 'high',
    example: 'Dynamic Context Management:\n\nSimple Query: "What\'s 2+2?"\n→ Context Depth: 1 (immediate calculation)\n→ Memory Usage: 50 tokens\n→ Processing Time: 10ms\n\nComplex Query: "Analyze geopolitical implications of renewable energy adoption"\n→ Context Depth: 5 (multi-step reasoning)\n→ Memory Usage: 2000 tokens\n→ Processing Time: 500ms\n→ Includes: Historical data, economic models, political patterns\n\nAdaptive Benefits:\n• 70% reduction in unnecessary computation\n• Optimal resource allocation per task\n• Real-time adjustment based on complexity\n• Maintains quality while reducing costs'
  },
  {
    id: 'latent-knowledge-retrieval',
    name: 'Latent Knowledge Retrieval',
    abbr: 'LKR',
    icon: '🔍',
    color: 'from-purple-500 to-indigo-600',
    category: 'memory-management',
    description: 'Retrieve information based on abstract reasoning patterns rather than explicit queries',
    features: [
      'Pattern-based knowledge access',
      'Implicit reasoning integration',
      'Contextual relevance scoring',
      'Abstract concept matching',
      'Dynamic knowledge synthesis',
      'Latent space navigation'
    ],
    useCases: ['creative-problem-solving', 'research-discovery', 'pattern-recognition', 'intuitive-reasoning'],
    complexity: 'high',
    example: 'Creative Writing Assistant:\n\nTask: "Write about loneliness in a bustling city"\n\nLatent Retrieval Process:\n• Abstract pattern: "isolation amid crowd"\n• Retrieved concepts:\n  - Urban architecture creating barriers\n  - Social media creating shallow connections\n  - Economic pressures reducing leisure time\n  - Anonymous transportation systems\n• Synthesis: Creates narrative weaving together urbanization, technology, and human psychology\n\nResult: Rich, nuanced exploration beyond simple keyword matching'
  },
  {
    id: 'context-compression-advanced',
    name: 'Advanced Context Compression',
    abbr: 'ACC',
    icon: '🗜️',
    color: 'from-blue-500 to-indigo-600',
    category: 'memory-management',
    description: 'Advanced techniques for compressing and optimizing context information while preserving semantic meaning',
    features: [
      'Token-level compression algorithms',
      'Semantic-preserving reduction',
      'Hierarchical context summarization',
      'Attention-based context pruning',
      'Dynamic compression ratios',
      'Quality-aware compression metrics'
    ],
    useCases: ['long-document-processing', 'memory-optimization', 'cost-reduction', 'real-time-systems', 'mobile-deployment'],
    complexity: 'high',
    example: 'Long Document Analysis:\n\nOriginal Context: 50,000 tokens (research paper)\nCompression Process:\n\n1. Semantic Analysis:\n   • Identify key concepts and relationships\n   • Score paragraph importance (0.1-1.0)\n   • Detect redundant information patterns\n\n2. Hierarchical Compression:\n   • Level 1: Remove low-importance sentences (20% reduction)\n   • Level 2: Abstractive summarization of paragraphs (40% reduction)\n   • Level 3: Concept-based compression (60% reduction)\n   • Level 4: Core insight extraction (80% reduction)\n\n3. Quality Preservation:\n   • Maintain key technical terms\n   • Preserve logical flow and conclusions\n   • Retain critical numerical data\n   • Keep essential citations and references\n\nResult: 10,000 tokens (80% compression) with 95% semantic fidelity\n\nBenefits:\n• 5x faster processing time\n• 80% cost reduction in API calls\n• Maintained answer accuracy for downstream tasks\n• Enabled processing within context window limits'
  },
  {
    id: 'multimodal-context-integration',
    name: 'Multimodal Context Integration',
    abbr: 'MCI',
    icon: '🎭',
    color: 'from-red-500 to-orange-600',
    category: 'memory-management',
    description: 'Seamless integration and processing of text, image, audio, and structured data within unified context frameworks',
    features: [
      'Cross-modal context alignment',
      'Unified representation spaces',
      'Modal-specific optimization',
      'Semantic bridge construction',
      'Temporal synchronization',
      'Quality-aware modal weighting'
    ],
    useCases: ['medical-diagnosis', 'multimedia-analysis', 'robotics', 'educational-systems', 'creative-applications'],
    complexity: 'high',
    example: 'Medical Diagnosis System:\n\nPatient Case: 45-year-old with chest pain\n\nMultimodal Context Assembly:\n\n1. Text Modality:\n   • Patient history: "Chest pain for 3 days, family history of heart disease"\n   • Symptom description: "Sharp pain, worse with breathing"\n   • Medical records: Previous ECGs, lab results, medications\n   • Context weight: 35%\n\n2. Image Modality:\n   • Chest X-ray: High-resolution DICOM images\n   • ECG traces: 12-lead electrocardiogram data\n   • Previous imaging: Comparison studies from 6 months ago\n   • Context weight: 40%\n\n3. Structured Data:\n   • Vital signs: BP 140/90, HR 88, Temp 98.6°F\n   • Lab results: Troponin 0.8, CRP elevated\n   • Diagnostic codes: ICD-10 R06.02 (shortness of breath)\n   • Context weight: 20%\n\n4. Temporal Data:\n   • Symptom timeline: Pain onset, progression patterns\n   • Treatment response: Medication effectiveness over time\n   • Physiological trends: Heart rate variability patterns\n   • Context weight: 5%\n\n5. Cross-Modal Integration:\n   • Align ECG findings with chest pain descriptions\n   • Correlate X-ray patterns with symptom severity\n   • Bridge lab values with clinical presentation\n   • Synchronize temporal patterns across modalities\n\n6. Unified Context Generation:\n   • Creates coherent narrative combining all modalities\n   • Highlights modal agreements and discrepancies\n   • Weights information based on diagnostic relevance\n   • Generates uncertainty estimates for missing data\n\nDiagnostic Output:\n• Primary hypothesis: Pericarditis (85% confidence)\n• Alternative diagnoses: Pleuritis (65%), Muscle strain (40%)\n• Recommended actions: Echocardiogram, anti-inflammatory trial\n• Evidence quality: High (multimodal concordance)\n\nAdvantages:\n• 35% improvement in diagnostic accuracy vs text-only\n• Reduced diagnostic uncertainty through modal correlation\n• Comprehensive evidence synthesis across data types\n• Enhanced clinical decision support capabilities'
  },
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