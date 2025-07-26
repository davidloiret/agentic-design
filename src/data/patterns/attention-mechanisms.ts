import { PatternScenario } from './types';

export const attentionMechanismsPattern: PatternScenario = {
  id: 'attention-mechanisms',
  title: 'Attention Mechanisms',
  description: 'Selective focus on relevant information through dynamic attention scoring, enabling efficient processing by prioritizing the most contextually important data.',
  steps: [
    {
      id: 'query-processing',
      title: 'Query Processing & Intent Analysis',
      description: 'Process incoming query and extract intent, keywords, and context requirements',
      input: 'User query or system request',
      output: 'Structured query representation with intent and keywords',
      activeNodes: ['query-processor', 'intent-analyzer', 'keyword-extractor'],
      activeEdges: ['query-to-intent', 'intent-to-keywords']
    },
    {
      id: 'memory-scanning',
      title: 'Memory Content Scanning',
      description: 'Scan available memory content and prepare candidate information for attention scoring',
      input: 'Query representation + Available memory items',
      output: 'Candidate information pool with metadata',
      activeNodes: ['memory-scanner', 'content-indexer', 'candidate-pool'],
      activeEdges: ['keywords-to-scanner', 'scanner-to-indexer', 'indexer-to-pool']
    },
    {
      id: 'attention-scoring',
      title: 'Multi-dimensional Attention Scoring',
      description: 'Calculate attention scores using semantic similarity, temporal relevance, and contextual importance',
      input: 'Query + Candidate information items',
      output: 'Attention scores for each candidate item',
      activeNodes: ['similarity-calculator', 'temporal-scorer', 'context-scorer', 'attention-aggregator'],
      activeEdges: ['pool-to-similarity', 'pool-to-temporal', 'pool-to-context', 'scorers-to-aggregator']
    },
    {
      id: 'attention-weighting',
      title: 'Dynamic Attention Weighting',
      description: 'Apply softmax normalization and dynamic weighting based on query complexity and context',
      input: 'Raw attention scores + Query complexity metrics',
      output: 'Normalized attention weights (sum to 1.0)',
      activeNodes: ['attention-aggregator', 'softmax-normalizer', 'weight-adjuster'],
      activeEdges: ['aggregator-to-softmax', 'softmax-to-adjuster']
    },
    {
      id: 'selective-attention',
      title: 'Selective Information Filtering',
      description: 'Filter and prioritize information based on attention weights and threshold values',
      input: 'Attention weights + Information candidates',
      output: 'Filtered high-attention information subset',
      activeNodes: ['weight-adjuster', 'attention-filter', 'priority-ranker'],
      activeEdges: ['adjuster-to-filter', 'filter-to-ranker']
    },
    {
      id: 'context-assembly',
      title: 'Contextual Information Assembly',
      description: 'Assemble selected information into coherent context maintaining attention-based ordering',
      input: 'Prioritized information + Attention weights',
      output: 'Structured context with attention-weighted information',
      activeNodes: ['priority-ranker', 'context-assembler', 'attention-tracker'],
      activeEdges: ['ranker-to-assembler', 'assembler-to-tracker']
    },
    {
      id: 'attention-output',
      title: 'Attention-guided Output Generation',
      description: 'Generate response using attention-weighted context with focus preservation',
      input: 'Structured context + Original query',
      output: 'Contextually relevant response with attention metadata',
      activeNodes: ['attention-tracker', 'response-generator', 'attention-interface'],
      activeEdges: ['tracker-to-generator', 'generator-to-interface']
    }
  ],
  initialNodes: [
    {
      id: 'query-processor',
      type: 'input',
      position: { x: 50, y: 150 },
      data: {
        label: 'Query Processor',
        description: 'Processes incoming queries and requests',
        type: 'input',
        status: 'idle'
      }
    },
    {
      id: 'intent-analyzer',
      type: 'default',
      position: { x: 250, y: 150 },
      data: {
        label: 'Intent Analyzer',
        description: 'Analyzes query intent and context requirements',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'keyword-extractor',
      type: 'default',
      position: { x: 450, y: 150 },
      data: {
        label: 'Keyword Extractor',
        description: 'Extracts key terms and concepts from query',
        type: 'extractor',
        status: 'idle'
      }
    },
    {
      id: 'memory-scanner',
      type: 'default',
      position: { x: 150, y: 300 },
      data: {
        label: 'Memory Scanner',
        description: 'Scans available memory for relevant information',
        type: 'scanner',
        status: 'idle'
      }
    },
    {
      id: 'content-indexer',
      type: 'default',
      position: { x: 350, y: 300 },
      data: {
        label: 'Content Indexer',
        description: 'Indexes and categorizes memory content',
        type: 'indexer',
        status: 'idle'
      }
    },
    {
      id: 'candidate-pool',
      type: 'default',
      position: { x: 550, y: 300 },
      data: {
        label: 'Candidate Pool',
        description: 'Pool of candidate information for attention scoring',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'similarity-calculator',
      type: 'default',
      position: { x: 100, y: 450 },
      data: {
        label: 'Similarity Calculator',
        description: 'Calculates semantic similarity scores',
        type: 'calculator',
        status: 'idle'
      }
    },
    {
      id: 'temporal-scorer',
      type: 'default',
      position: { x: 300, y: 450 },
      data: {
        label: 'Temporal Scorer',
        description: 'Scores based on temporal relevance and recency',
        type: 'scorer',
        status: 'idle'
      }
    },
    {
      id: 'context-scorer',
      type: 'default',
      position: { x: 500, y: 450 },
      data: {
        label: 'Context Scorer',
        description: 'Evaluates contextual importance and relevance',
        type: 'scorer',
        status: 'idle'
      }
    },
    {
      id: 'attention-aggregator',
      type: 'default',
      position: { x: 300, y: 600 },
      data: {
        label: 'Attention Aggregator',
        description: 'Combines multi-dimensional attention scores',
        type: 'aggregator',
        status: 'idle'
      }
    },
    {
      id: 'softmax-normalizer',
      type: 'default',
      position: { x: 500, y: 600 },
      data: {
        label: 'Softmax Normalizer',
        description: 'Normalizes attention scores using softmax function',
        type: 'normalizer',
        status: 'idle'
      }
    },
    {
      id: 'weight-adjuster',
      type: 'default',
      position: { x: 700, y: 600 },
      data: {
        label: 'Weight Adjuster',
        description: 'Dynamically adjusts weights based on context',
        type: 'adjuster',
        status: 'idle'
      }
    },
    {
      id: 'attention-filter',
      type: 'default',
      position: { x: 500, y: 750 },
      data: {
        label: 'Attention Filter',
        description: 'Filters information based on attention thresholds',
        type: 'filter',
        status: 'idle'
      }
    },
    {
      id: 'priority-ranker',
      type: 'default',
      position: { x: 700, y: 750 },
      data: {
        label: 'Priority Ranker',
        description: 'Ranks information by attention priority',
        type: 'ranker',
        status: 'idle'
      }
    },
    {
      id: 'context-assembler',
      type: 'default',
      position: { x: 500, y: 900 },
      data: {
        label: 'Context Assembler',
        description: 'Assembles filtered context maintaining attention order',
        type: 'assembler',
        status: 'idle'
      }
    },
    {
      id: 'attention-tracker',
      type: 'default',
      position: { x: 700, y: 900 },
      data: {
        label: 'Attention Tracker',
        description: 'Tracks attention patterns and focus areas',
        type: 'tracker',
        status: 'idle'
      }
    },
    {
      id: 'response-generator',
      type: 'default',
      position: { x: 500, y: 1050 },
      data: {
        label: 'Response Generator',
        description: 'Generates responses using attention-weighted context',
        type: 'generator',
        status: 'idle'
      }
    },
    {
      id: 'attention-interface',
      type: 'output',
      position: { x: 700, y: 1050 },
      data: {
        label: 'Attention Interface',
        description: 'Provides attention-enhanced responses and metadata',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'query-to-intent',
      source: 'query-processor',
      target: 'intent-analyzer',
      type: 'smoothstep',
      label: 'raw query'
    },
    {
      id: 'intent-to-keywords',
      source: 'intent-analyzer',
      target: 'keyword-extractor',
      type: 'smoothstep',
      label: 'intent analysis'
    },
    {
      id: 'keywords-to-scanner',
      source: 'keyword-extractor',
      target: 'memory-scanner',
      type: 'smoothstep',
      label: 'keywords'
    },
    {
      id: 'scanner-to-indexer',
      source: 'memory-scanner',
      target: 'content-indexer',
      type: 'smoothstep',
      label: 'scanned content'
    },
    {
      id: 'indexer-to-pool',
      source: 'content-indexer',
      target: 'candidate-pool',
      type: 'smoothstep',
      label: 'indexed items'
    },
    {
      id: 'pool-to-similarity',
      source: 'candidate-pool',
      target: 'similarity-calculator',
      type: 'smoothstep',
      label: 'candidates'
    },
    {
      id: 'pool-to-temporal',
      source: 'candidate-pool',
      target: 'temporal-scorer',
      type: 'smoothstep',
      label: 'candidates'
    },
    {
      id: 'pool-to-context',
      source: 'candidate-pool',
      target: 'context-scorer',
      type: 'smoothstep',
      label: 'candidates'
    },
    {
      id: 'similarity-to-aggregator',
      source: 'similarity-calculator',
      target: 'attention-aggregator',
      type: 'smoothstep',
      label: 'similarity scores'
    },
    {
      id: 'temporal-to-aggregator',
      source: 'temporal-scorer',
      target: 'attention-aggregator',
      type: 'smoothstep',
      label: 'temporal scores'
    },
    {
      id: 'context-to-aggregator',
      source: 'context-scorer',
      target: 'attention-aggregator',
      type: 'smoothstep',
      label: 'context scores'
    },
    {
      id: 'aggregator-to-softmax',
      source: 'attention-aggregator',
      target: 'softmax-normalizer',
      type: 'smoothstep',
      label: 'raw scores'
    },
    {
      id: 'softmax-to-adjuster',
      source: 'softmax-normalizer',
      target: 'weight-adjuster',
      type: 'smoothstep',
      label: 'normalized weights'
    },
    {
      id: 'adjuster-to-filter',
      source: 'weight-adjuster',
      target: 'attention-filter',
      type: 'smoothstep',
      label: 'adjusted weights'
    },
    {
      id: 'filter-to-ranker',
      source: 'attention-filter',
      target: 'priority-ranker',
      type: 'smoothstep',
      label: 'filtered items'
    },
    {
      id: 'ranker-to-assembler',
      source: 'priority-ranker',
      target: 'context-assembler',
      type: 'smoothstep',
      label: 'ranked context'
    },
    {
      id: 'assembler-to-tracker',
      source: 'context-assembler',
      target: 'attention-tracker',
      type: 'smoothstep',
      label: 'assembled context'
    },
    {
      id: 'tracker-to-generator',
      source: 'attention-tracker',
      target: 'response-generator',
      type: 'smoothstep',
      label: 'attention data'
    },
    {
      id: 'generator-to-interface',
      source: 'response-generator',
      target: 'attention-interface',
      type: 'smoothstep',
      label: 'enhanced response'
    }
  ]
};