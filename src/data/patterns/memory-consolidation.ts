import { PatternScenario } from './types';

export const memoryConsolidationPattern: PatternScenario = {
  id: 'memory-consolidation',
  title: 'Memory Consolidation',
  description: 'Process of strengthening and organizing memories over time through pattern extraction, redundancy removal, importance weighting, and schema formation.',
  steps: [
    {
      id: 'memory-collection',
      title: 'Raw Memory Collection',
      description: 'Gather raw interaction events and episodic memories from various sources for consolidation processing',
      input: 'Stream of raw memory items, interactions, and experiences',
      output: 'Collected memory buffer with temporal ordering',
      activeNodes: ['memory-collector', 'temporal-organizer', 'raw-memory-buffer'],
      activeEdges: ['input-to-collector', 'collector-to-organizer', 'organizer-to-buffer']
    },
    {
      id: 'pattern-extraction',
      title: 'Pattern Identification & Extraction',
      description: 'Analyze memories to identify recurring patterns, themes, and structural similarities across events',
      input: 'Raw memory buffer with temporal sequences',
      output: 'Extracted patterns and thematic clusters',
      activeNodes: ['pattern-analyzer', 'theme-detector', 'similarity-engine', 'pattern-extractor'],
      activeEdges: ['buffer-to-analyzer', 'analyzer-to-detector', 'detector-to-similarity', 'similarity-to-extractor']
    },
    {
      id: 'redundancy-analysis',
      title: 'Redundancy Detection & Removal',
      description: 'Identify duplicate or highly similar memories and merge them to reduce storage overhead',
      input: 'Pattern clusters and similar memory groups',
      output: 'Deduplicated memory set with merged representations',
      activeNodes: ['redundancy-detector', 'similarity-comparator', 'merge-engine', 'deduplication-filter'],
      activeEdges: ['extractor-to-detector', 'detector-to-comparator', 'comparator-to-merger', 'merger-to-filter']
    },
    {
      id: 'importance-weighting',
      title: 'Importance Scoring & Weighting',
      description: 'Assign importance scores based on frequency, recency, emotional significance, and utility',
      input: 'Deduplicated memories with basic metadata',
      output: 'Weighted memories with importance scores',
      activeNodes: ['importance-scorer', 'frequency-analyzer', 'recency-evaluator', 'significance-assessor'],
      activeEdges: ['filter-to-scorer', 'scorer-to-frequency', 'scorer-to-recency', 'scorer-to-significance']
    },
    {
      id: 'schema-formation',
      title: 'Knowledge Schema Construction',
      description: 'Organize weighted memories into coherent knowledge structures and conceptual schemas',
      input: 'Importance-weighted memory patterns',
      output: 'Structured knowledge schemas and memory hierarchies',
      activeNodes: ['schema-builder', 'concept-organizer', 'hierarchy-constructor', 'knowledge-structurer'],
      activeEdges: ['significance-to-builder', 'builder-to-organizer', 'organizer-to-constructor', 'constructor-to-structurer']
    },
    {
      id: 'consolidation-integration',
      title: 'Memory Integration & Storage',
      description: 'Integrate consolidated schemas into long-term memory with appropriate retrieval indices',
      input: 'Structured knowledge schemas and hierarchies',
      output: 'Consolidated long-term memory with retrieval metadata',
      activeNodes: ['integration-engine', 'index-builder', 'long-term-storage', 'retrieval-optimizer'],
      activeEdges: ['structurer-to-integration', 'integration-to-indexer', 'indexer-to-storage', 'storage-to-optimizer']
    },
    {
      id: 'validation-feedback',
      title: 'Consolidation Validation & Feedback',
      description: 'Validate consolidation quality and provide feedback for continuous improvement',
      input: 'Consolidated memory structures and performance metrics',
      output: 'Quality assessment and optimization recommendations',
      activeNodes: ['quality-validator', 'performance-monitor', 'feedback-generator', 'consolidation-interface'],
      activeEdges: ['optimizer-to-validator', 'validator-to-monitor', 'monitor-to-feedback', 'feedback-to-interface']
    }
  ],
  initialNodes: [
    {
      id: 'memory-collector',
      type: 'input',
      position: { x: 50, y: 150 },
      data: {
        label: 'Memory Collector',
        description: 'Collects raw memory items from various sources',
        type: 'input',
        status: 'idle'
      }
    },
    {
      id: 'temporal-organizer',
      type: 'default',
      position: { x: 250, y: 150 },
      data: {
        label: 'Temporal Organizer',
        description: 'Organizes memories by temporal sequence',
        type: 'organizer',
        status: 'idle'
      }
    },
    {
      id: 'raw-memory-buffer',
      type: 'default',
      position: { x: 450, y: 150 },
      data: {
        label: 'Raw Memory Buffer',
        description: 'Temporary storage for raw memory items',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'pattern-analyzer',
      type: 'default',
      position: { x: 150, y: 300 },
      data: {
        label: 'Pattern Analyzer',
        description: 'Analyzes memories for recurring patterns',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'theme-detector',
      type: 'default',
      position: { x: 350, y: 300 },
      data: {
        label: 'Theme Detector',
        description: 'Detects thematic similarities across memories',
        type: 'detector',
        status: 'idle'
      }
    },
    {
      id: 'similarity-engine',
      type: 'default',
      position: { x: 550, y: 300 },
      data: {
        label: 'Similarity Engine',
        description: 'Computes semantic and structural similarities',
        type: 'engine',
        status: 'idle'
      }
    },
    {
      id: 'pattern-extractor',
      type: 'default',
      position: { x: 750, y: 300 },
      data: {
        label: 'Pattern Extractor',
        description: 'Extracts and codifies identified patterns',
        type: 'extractor',
        status: 'idle'
      }
    },
    {
      id: 'redundancy-detector',
      type: 'default',
      position: { x: 100, y: 450 },
      data: {
        label: 'Redundancy Detector',
        description: 'Identifies duplicate and similar memories',
        type: 'detector',
        status: 'idle'
      }
    },
    {
      id: 'similarity-comparator',
      type: 'default',
      position: { x: 300, y: 450 },
      data: {
        label: 'Similarity Comparator',
        description: 'Compares memories for redundancy assessment',
        type: 'comparator',
        status: 'idle'
      }
    },
    {
      id: 'merge-engine',
      type: 'default',
      position: { x: 500, y: 450 },
      data: {
        label: 'Merge Engine',
        description: 'Merges redundant memories into unified representations',
        type: 'engine',
        status: 'idle'
      }
    },
    {
      id: 'deduplication-filter',
      type: 'default',
      position: { x: 700, y: 450 },
      data: {
        label: 'Deduplication Filter',
        description: 'Filters out redundant memory duplicates',
        type: 'filter',
        status: 'idle'
      }
    },
    {
      id: 'importance-scorer',
      type: 'default',
      position: { x: 200, y: 600 },
      data: {
        label: 'Importance Scorer',
        description: 'Assigns importance scores to memories',
        type: 'scorer',
        status: 'idle'
      }
    },
    {
      id: 'frequency-analyzer',
      type: 'default',
      position: { x: 400, y: 600 },
      data: {
        label: 'Frequency Analyzer',
        description: 'Analyzes access frequency patterns',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'recency-evaluator',
      type: 'default',
      position: { x: 600, y: 600 },
      data: {
        label: 'Recency Evaluator',
        description: 'Evaluates temporal recency of memories',
        type: 'evaluator',
        status: 'idle'
      }
    },
    {
      id: 'significance-assessor',
      type: 'default',
      position: { x: 800, y: 600 },
      data: {
        label: 'Significance Assessor',
        description: 'Assesses emotional and contextual significance',
        type: 'assessor',
        status: 'idle'
      }
    },
    {
      id: 'schema-builder',
      type: 'default',
      position: { x: 150, y: 750 },
      data: {
        label: 'Schema Builder',
        description: 'Constructs knowledge schemas from patterns',
        type: 'builder',
        status: 'idle'
      }
    },
    {
      id: 'concept-organizer',
      type: 'default',
      position: { x: 350, y: 750 },
      data: {
        label: 'Concept Organizer',
        description: 'Organizes concepts into coherent structures',
        type: 'organizer',
        status: 'idle'
      }
    },
    {
      id: 'hierarchy-constructor',
      type: 'default',
      position: { x: 550, y: 750 },
      data: {
        label: 'Hierarchy Constructor',
        description: 'Builds hierarchical knowledge structures',
        type: 'constructor',
        status: 'idle'
      }
    },
    {
      id: 'knowledge-structurer',
      type: 'default',
      position: { x: 750, y: 750 },
      data: {
        label: 'Knowledge Structurer',
        description: 'Structures knowledge for optimal retrieval',
        type: 'structurer',
        status: 'idle'
      }
    },
    {
      id: 'integration-engine',
      type: 'default',
      position: { x: 200, y: 900 },
      data: {
        label: 'Integration Engine',
        description: 'Integrates schemas into long-term memory',
        type: 'engine',
        status: 'idle'
      }
    },
    {
      id: 'index-builder',
      type: 'default',
      position: { x: 400, y: 900 },
      data: {
        label: 'Index Builder',
        description: 'Builds retrieval indices for consolidated memories',
        type: 'builder',
        status: 'idle'
      }
    },
    {
      id: 'long-term-storage',
      type: 'default',
      position: { x: 600, y: 900 },
      data: {
        label: 'Long-term Storage',
        description: 'Stores consolidated memories persistently',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'retrieval-optimizer',
      type: 'default',
      position: { x: 800, y: 900 },
      data: {
        label: 'Retrieval Optimizer',
        description: 'Optimizes memory retrieval performance',
        type: 'optimizer',
        status: 'idle'
      }
    },
    {
      id: 'quality-validator',
      type: 'default',
      position: { x: 250, y: 1050 },
      data: {
        label: 'Quality Validator',
        description: 'Validates consolidation quality and coherence',
        type: 'validator',
        status: 'idle'
      }
    },
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 450, y: 1050 },
      data: {
        label: 'Performance Monitor',
        description: 'Monitors consolidation performance metrics',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'feedback-generator',
      type: 'default',
      position: { x: 650, y: 1050 },
      data: {
        label: 'Feedback Generator',
        description: 'Generates improvement feedback and recommendations',
        type: 'generator',
        status: 'idle'
      }
    },
    {
      id: 'consolidation-interface',
      type: 'output',
      position: { x: 850, y: 1050 },
      data: {
        label: 'Consolidation Interface',
        description: 'Provides consolidated memory access and feedback',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'input-to-collector',
      source: 'memory-collector',
      target: 'temporal-organizer',
      type: 'smoothstep',
      label: 'raw memories'
    },
    {
      id: 'collector-to-organizer',
      source: 'temporal-organizer',
      target: 'raw-memory-buffer',
      type: 'smoothstep',
      label: 'temporal sequence'
    },
    {
      id: 'organizer-to-buffer',
      source: 'raw-memory-buffer',
      target: 'pattern-analyzer',
      type: 'smoothstep',
      label: 'organized memories'
    },
    {
      id: 'buffer-to-analyzer',
      source: 'pattern-analyzer',
      target: 'theme-detector',
      type: 'smoothstep',
      label: 'pattern candidates'
    },
    {
      id: 'analyzer-to-detector',
      source: 'theme-detector',
      target: 'similarity-engine',
      type: 'smoothstep',
      label: 'thematic groups'
    },
    {
      id: 'detector-to-similarity',
      source: 'similarity-engine',
      target: 'pattern-extractor',
      type: 'smoothstep',
      label: 'similarity scores'
    },
    {
      id: 'similarity-to-extractor',
      source: 'pattern-extractor',
      target: 'redundancy-detector',
      type: 'smoothstep',
      label: 'extracted patterns'
    },
    {
      id: 'extractor-to-detector',
      source: 'redundancy-detector',
      target: 'similarity-comparator',
      type: 'smoothstep',
      label: 'redundancy candidates'
    },
    {
      id: 'detector-to-comparator',
      source: 'similarity-comparator',
      target: 'merge-engine',
      type: 'smoothstep',
      label: 'similarity analysis'
    },
    {
      id: 'comparator-to-merger',
      source: 'merge-engine',
      target: 'deduplication-filter',
      type: 'smoothstep',
      label: 'merged memories'
    },
    {
      id: 'merger-to-filter',
      source: 'deduplication-filter',
      target: 'importance-scorer',
      type: 'smoothstep',
      label: 'unique memories'
    },
    {
      id: 'filter-to-scorer',
      source: 'importance-scorer',
      target: 'frequency-analyzer',
      type: 'smoothstep',
      label: 'scoring targets'
    },
    {
      id: 'scorer-to-frequency',
      source: 'importance-scorer',
      target: 'recency-evaluator',
      type: 'smoothstep',
      label: 'scoring targets'
    },
    {
      id: 'scorer-to-recency',
      source: 'importance-scorer',
      target: 'significance-assessor',
      type: 'smoothstep',
      label: 'scoring targets'
    },
    {
      id: 'scorer-to-significance',
      source: 'frequency-analyzer',
      target: 'schema-builder',
      type: 'smoothstep',
      label: 'frequency weights'
    },
    {
      id: 'frequency-to-builder',
      source: 'recency-evaluator',
      target: 'schema-builder',
      type: 'smoothstep',
      label: 'recency weights'
    },
    {
      id: 'recency-to-builder',
      source: 'significance-assessor',
      target: 'schema-builder',
      type: 'smoothstep',
      label: 'significance weights'
    },
    {
      id: 'significance-to-builder',
      source: 'schema-builder',
      target: 'concept-organizer',
      type: 'smoothstep',
      label: 'schema blueprints'
    },
    {
      id: 'builder-to-organizer',
      source: 'concept-organizer',
      target: 'hierarchy-constructor',
      type: 'smoothstep',
      label: 'organized concepts'
    },
    {
      id: 'organizer-to-constructor',
      source: 'hierarchy-constructor',
      target: 'knowledge-structurer',
      type: 'smoothstep',
      label: 'knowledge hierarchies'
    },
    {
      id: 'constructor-to-structurer',
      source: 'knowledge-structurer',
      target: 'integration-engine',
      type: 'smoothstep',
      label: 'structured knowledge'
    },
    {
      id: 'structurer-to-integration',
      source: 'integration-engine',
      target: 'index-builder',
      type: 'smoothstep',
      label: 'integration plan'
    },
    {
      id: 'integration-to-indexer',
      source: 'index-builder',
      target: 'long-term-storage',
      type: 'smoothstep',
      label: 'retrieval indices'
    },
    {
      id: 'indexer-to-storage',
      source: 'long-term-storage',
      target: 'retrieval-optimizer',
      type: 'smoothstep',
      label: 'stored memories'
    },
    {
      id: 'storage-to-optimizer',
      source: 'retrieval-optimizer',
      target: 'quality-validator',
      type: 'smoothstep',
      label: 'optimization metrics'
    },
    {
      id: 'optimizer-to-validator',
      source: 'quality-validator',
      target: 'performance-monitor',
      type: 'smoothstep',
      label: 'quality assessment'
    },
    {
      id: 'validator-to-monitor',
      source: 'performance-monitor',
      target: 'feedback-generator',
      type: 'smoothstep',
      label: 'performance data'
    },
    {
      id: 'monitor-to-feedback',
      source: 'feedback-generator',
      target: 'consolidation-interface',
      type: 'smoothstep',
      label: 'feedback report'
    },
    {
      id: 'feedback-to-interface',
      source: 'consolidation-interface',
      target: 'memory-collector',
      type: 'smoothstep',
      label: 'optimization feedback',
      style: { strokeDasharray: '5,5' }
    }
  ]
};