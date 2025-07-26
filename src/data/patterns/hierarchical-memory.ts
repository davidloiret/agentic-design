import { PatternScenario } from './types';

export const hierarchicalMemoryPattern: PatternScenario = {
  id: 'hierarchical-memory',
  title: 'Hierarchical Memory Management',
  description: 'Multi-tier memory architecture with intelligent promotion/demotion policies, mimicking human memory systems for optimal information retention and retrieval.',
  steps: [
    {
      id: 'input-processing',
      title: 'Input Processing & Classification',
      description: 'Analyze incoming information and classify for appropriate memory tier placement',
      input: 'Raw information (messages, data, events)',
      output: 'Classified information with importance scores',
      activeNodes: ['input-processor', 'content-classifier', 'importance-scorer'],
      activeEdges: ['input-to-classifier', 'classifier-to-scorer']
    },
    {
      id: 'working-memory-storage',
      title: 'Working Memory Storage',
      description: 'Store immediate, actively used information in high-speed working memory',
      input: 'Recent interactions and active context',
      output: 'Working memory entries with access tracking',
      activeNodes: ['working-memory', 'access-tracker', 'recency-monitor'],
      activeEdges: ['scorer-to-working', 'working-to-tracker']
    },
    {
      id: 'short-term-promotion',
      title: 'Short-term Memory Promotion',
      description: 'Promote frequently accessed or important items to short-term storage',
      input: 'Working memory items with high access frequency',
      output: 'Short-term memory entries with retention timers',
      activeNodes: ['promotion-engine', 'short-term-memory', 'retention-manager'],
      activeEdges: ['tracker-to-promotion', 'promotion-to-short-term']
    },
    {
      id: 'medium-term-consolidation',
      title: 'Medium-term Consolidation',
      description: 'Consolidate important patterns and insights into medium-term storage',
      input: 'Short-term items with proven importance over time',
      output: 'Consolidated knowledge patterns and connections',
      activeNodes: ['consolidation-engine', 'medium-term-memory', 'pattern-detector'],
      activeEdges: ['short-term-to-consolidation', 'consolidation-to-medium-term']
    },
    {
      id: 'long-term-encoding',
      title: 'Long-term Knowledge Encoding',
      description: 'Encode core knowledge and learned patterns into permanent storage',
      input: 'Medium-term patterns with persistent value',
      output: 'Permanent knowledge base with semantic relationships',
      activeNodes: ['encoding-engine', 'long-term-memory', 'semantic-indexer'],
      activeEdges: ['medium-term-to-encoding', 'encoding-to-long-term']
    },
    {
      id: 'retrieval-coordination',
      title: 'Cross-tier Retrieval',
      description: 'Coordinate information retrieval across all memory hierarchies',
      input: 'Query for information across memory tiers',
      output: 'Ranked results from all memory levels',
      activeNodes: ['retrieval-coordinator', 'query-processor', 'result-merger'],
      activeEdges: ['coordinator-to-processor', 'processor-to-merger']
    },
    {
      id: 'memory-maintenance',
      title: 'Memory Maintenance & Optimization',
      description: 'Perform garbage collection, defragmentation, and policy optimization',
      input: 'Memory state analysis and performance metrics',
      output: 'Optimized memory hierarchy with updated policies',
      activeNodes: ['maintenance-service', 'garbage-collector', 'policy-optimizer'],
      activeEdges: ['maintenance-to-gc', 'gc-to-optimizer']
    }
  ],
  initialNodes: [
    {
      id: 'input-processor',
      type: 'input',
      position: { x: 50, y: 150 },
      data: {
        label: 'Input Processor',
        description: 'Receives and preprocesses all incoming information',
        type: 'input',
        status: 'idle'
      }
    },
    {
      id: 'content-classifier',
      type: 'default',
      position: { x: 250, y: 150 },
      data: {
        label: 'Content Classifier',
        description: 'Analyzes and categorizes information types',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'importance-scorer',
      type: 'default',
      position: { x: 450, y: 150 },
      data: {
        label: 'Importance Scorer',
        description: 'Assigns relevance and importance scores',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'working-memory',
      type: 'default',
      position: { x: 150, y: 300 },
      data: {
        label: 'Working Memory',
        description: 'Level 1: Recent interactions (50 items, 5 min retention)',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'access-tracker',
      type: 'default',
      position: { x: 350, y: 300 },
      data: {
        label: 'Access Tracker',
        description: 'Monitors access frequency and patterns',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'recency-monitor',
      type: 'default',
      position: { x: 550, y: 300 },
      data: {
        label: 'Recency Monitor',
        description: 'Tracks temporal relevance and decay',
        type: 'monitor',
        status: 'idle'
      }
    },
    {
      id: 'promotion-engine',
      type: 'default',
      position: { x: 250, y: 450 },
      data: {
        label: 'Promotion Engine',
        description: 'Manages tier promotions based on importance',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'short-term-memory',
      type: 'default',
      position: { x: 150, y: 600 },
      data: {
        label: 'Short-term Memory',
        description: 'Level 2: Important items (200 items, 1 week retention)',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'retention-manager',
      type: 'default',
      position: { x: 350, y: 600 },
      data: {
        label: 'Retention Manager',
        description: 'Manages retention policies and timers',
        type: 'manager',
        status: 'idle'
      }
    },
    {
      id: 'consolidation-engine',
      type: 'default',
      position: { x: 550, y: 600 },
      data: {
        label: 'Consolidation Engine',
        description: 'Consolidates patterns and relationships',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'medium-term-memory',
      type: 'default',
      position: { x: 150, y: 750 },
      data: {
        label: 'Medium-term Memory',
        description: 'Level 3: Key insights (500 items, 1 month retention)',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'pattern-detector',
      type: 'default',
      position: { x: 350, y: 750 },
      data: {
        label: 'Pattern Detector',
        description: 'Identifies recurring patterns and themes',
        type: 'analyzer',
        status: 'idle'
      }
    },
    {
      id: 'encoding-engine',
      type: 'default',
      position: { x: 550, y: 750 },
      data: {
        label: 'Encoding Engine',
        description: 'Encodes knowledge for permanent storage',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'long-term-memory',
      type: 'default',
      position: { x: 150, y: 900 },
      data: {
        label: 'Long-term Memory',
        description: 'Level 4: Core knowledge (unlimited, permanent)',
        type: 'storage',
        status: 'idle'
      }
    },
    {
      id: 'semantic-indexer',
      type: 'default',
      position: { x: 350, y: 900 },
      data: {
        label: 'Semantic Indexer',
        description: 'Creates semantic relationships and indexes',
        type: 'indexer',
        status: 'idle'
      }
    },
    {
      id: 'retrieval-coordinator',
      type: 'default',
      position: { x: 750, y: 450 },
      data: {
        label: 'Retrieval Coordinator',
        description: 'Coordinates cross-tier information retrieval',
        type: 'coordinator',
        status: 'idle'
      }
    },
    {
      id: 'query-processor',
      type: 'default',
      position: { x: 750, y: 600 },
      data: {
        label: 'Query Processor',
        description: 'Processes and routes retrieval queries',
        type: 'processor',
        status: 'idle'
      }
    },
    {
      id: 'result-merger',
      type: 'default',
      position: { x: 750, y: 750 },
      data: {
        label: 'Result Merger',
        description: 'Merges and ranks results from all tiers',
        type: 'merger',
        status: 'idle'
      }
    },
    {
      id: 'maintenance-service',
      type: 'default',
      position: { x: 950, y: 450 },
      data: {
        label: 'Maintenance Service',
        description: 'Manages overall memory health and optimization',
        type: 'service',
        status: 'idle'
      }
    },
    {
      id: 'garbage-collector',
      type: 'default',
      position: { x: 950, y: 600 },
      data: {
        label: 'Garbage Collector',
        description: 'Removes expired and unused memory entries',
        type: 'collector',
        status: 'idle'
      }
    },
    {
      id: 'policy-optimizer',
      type: 'default',
      position: { x: 950, y: 750 },
      data: {
        label: 'Policy Optimizer',
        description: 'Optimizes retention and promotion policies',
        type: 'optimizer',
        status: 'idle'
      }
    },
    {
      id: 'memory-interface',
      type: 'output',
      position: { x: 550, y: 1050 },
      data: {
        label: 'Memory Interface',
        description: 'Provides unified access to hierarchical memory',
        type: 'output',
        status: 'idle'
      }
    }
  ],
  initialEdges: [
    {
      id: 'input-to-classifier',
      source: 'input-processor',
      target: 'content-classifier',
      type: 'smoothstep',
      label: 'raw data'
    },
    {
      id: 'classifier-to-scorer',
      source: 'content-classifier',
      target: 'importance-scorer',
      type: 'smoothstep',
      label: 'classified content'
    },
    {
      id: 'scorer-to-working',
      source: 'importance-scorer',
      target: 'working-memory',
      type: 'smoothstep',
      label: 'scored items'
    },
    {
      id: 'working-to-tracker',
      source: 'working-memory',
      target: 'access-tracker',
      type: 'smoothstep',
      label: 'access patterns'
    },
    {
      id: 'working-to-recency',
      source: 'working-memory',
      target: 'recency-monitor',
      type: 'smoothstep',
      label: 'temporal data'
    },
    {
      id: 'tracker-to-promotion',
      source: 'access-tracker',
      target: 'promotion-engine',
      type: 'smoothstep',
      label: 'access metrics'
    },
    {
      id: 'recency-to-promotion',
      source: 'recency-monitor',
      target: 'promotion-engine',
      type: 'smoothstep',
      label: 'recency scores'
    },
    {
      id: 'promotion-to-short-term',
      source: 'promotion-engine',
      target: 'short-term-memory',
      type: 'smoothstep',
      label: 'promoted items'
    },
    {
      id: 'short-term-to-retention',
      source: 'short-term-memory',
      target: 'retention-manager',
      type: 'smoothstep',
      label: 'retention data'
    },
    {
      id: 'short-term-to-consolidation',
      source: 'short-term-memory',
      target: 'consolidation-engine',
      type: 'smoothstep',
      label: 'consolidation candidates'
    },
    {
      id: 'consolidation-to-medium-term',
      source: 'consolidation-engine',
      target: 'medium-term-memory',
      type: 'smoothstep',
      label: 'consolidated knowledge'
    },
    {
      id: 'medium-term-to-pattern',
      source: 'medium-term-memory',
      target: 'pattern-detector',
      type: 'smoothstep',
      label: 'pattern analysis'
    },
    {
      id: 'medium-term-to-encoding',
      source: 'medium-term-memory',
      target: 'encoding-engine',
      type: 'smoothstep',
      label: 'encoding candidates'
    },
    {
      id: 'encoding-to-long-term',
      source: 'encoding-engine',
      target: 'long-term-memory',
      type: 'smoothstep',
      label: 'encoded knowledge'
    },
    {
      id: 'long-term-to-indexer',
      source: 'long-term-memory',
      target: 'semantic-indexer',
      type: 'smoothstep',
      label: 'indexing requests'
    },
    {
      id: 'working-to-retrieval',
      source: 'working-memory',
      target: 'retrieval-coordinator',
      type: 'smoothstep',
      label: 'L1 access'
    },
    {
      id: 'short-term-to-retrieval',
      source: 'short-term-memory',
      target: 'retrieval-coordinator',
      type: 'smoothstep',
      label: 'L2 access'
    },
    {
      id: 'medium-term-to-retrieval',
      source: 'medium-term-memory',
      target: 'retrieval-coordinator',
      type: 'smoothstep',
      label: 'L3 access'
    },
    {
      id: 'long-term-to-retrieval',
      source: 'long-term-memory',
      target: 'retrieval-coordinator',
      type: 'smoothstep',
      label: 'L4 access'
    },
    {
      id: 'coordinator-to-processor',
      source: 'retrieval-coordinator',
      target: 'query-processor',
      type: 'smoothstep',
      label: 'query routing'
    },
    {
      id: 'processor-to-merger',
      source: 'query-processor',
      target: 'result-merger',
      type: 'smoothstep',
      label: 'tier results'
    },
    {
      id: 'maintenance-to-gc',
      source: 'maintenance-service',
      target: 'garbage-collector',
      type: 'smoothstep',
      label: 'cleanup triggers'
    },
    {
      id: 'gc-to-optimizer',
      source: 'garbage-collector',
      target: 'policy-optimizer',
      type: 'smoothstep',
      label: 'optimization data'
    },
    {
      id: 'merger-to-interface',
      source: 'result-merger',
      target: 'memory-interface',
      type: 'smoothstep',
      label: 'unified results'
    },
    {
      id: 'indexer-to-interface',
      source: 'semantic-indexer',
      target: 'memory-interface',
      type: 'smoothstep',
      label: 'indexed access'
    }
  ]
};