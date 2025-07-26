import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const advancedContextCompressionPattern: PatternScenario = {
  id: 'context-compression-advanced',
  title: 'Advanced Context Compression in Multi-Agent Systems',
  description: 'Sophisticated compression coordination across multiple AI agents with semantic preservation and quality optimization',
  steps: [
    {
      id: 'step-1',
      title: 'Input Analysis & Agent Distribution',
      description: 'System receives large context corpus and intelligently distributes content to specialized compression agents',
      input: 'Research Corpus: 100,000 tokens\\nMulti-domain content requiring specialized handling',
      activeNodes: ['input-corpus', 'content-analyzer', 'distribution-engine'],
      activeEdges: ['corpus-to-analyzer', 'analyzer-to-distribution'],
      nodeUpdates: {
        'input-corpus': {
          data: { label: 'Input Corpus\\n100,000 tokens\\nMulti-domain research content' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'content-analyzer': {
          data: { label: 'Content Analyzer\\nClassifying content types\\nDetermining optimal distribution' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'distribution-engine': {
          data: { label: 'Distribution Engine\\nAllocating content to agents\\nBased on specialization' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Agent-Specific Compression Profiling',
      description: 'Each specialized agent applies domain-optimized compression techniques',
      activeNodes: ['distribution-engine', 'literature-agent', 'data-agent', 'methodology-agent', 'synthesis-agent', 'validation-agent'],
      activeEdges: ['dist-to-lit', 'dist-to-data', 'dist-to-method', 'dist-to-synth', 'dist-to-valid'],
      nodeUpdates: {
        'literature-agent': {
          data: { label: 'Literature Agent\\n25K tokens allocated\\nCitation compression\\nConcept graph preservation' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'data-agent': {
          data: { label: 'Data Agent\\n30K tokens allocated\\nStatistical summarization\\nNumerical precision control' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'methodology-agent': {
          data: { label: 'Methodology Agent\\n20K tokens allocated\\nProcess distillation\\nCritical path preservation' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'synthesis-agent': {
          data: { label: 'Synthesis Agent\\n15K tokens allocated\\nInsight abstraction\\nLogical flow compression' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'validation-agent': {
          data: { label: 'Validation Agent\\n10K tokens allocated\\nReference validation\\nQuality scoring' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Semantic Preservation Analysis',
      description: 'Cross-agent validation ensures semantic fidelity while optimizing compression ratios',
      activeNodes: ['literature-agent', 'data-agent', 'methodology-agent', 'synthesis-agent', 'validation-agent', 'semantic-validator', 'quality-monitor'],
      activeEdges: ['lit-to-validator', 'data-to-validator', 'method-to-validator', 'synth-to-validator', 'valid-to-validator'],
      nodeUpdates: {
        'semantic-validator': {
          data: { label: 'Semantic Validator\\nCross-checking meaning preservation\\nValidating concept relationships' },
          style: { ...nodeStyle, background: '#ec4899' }
        },
        'quality-monitor': {
          data: { label: 'Quality Monitor\\nReal-time quality scoring\\nCompression ratio tracking\\nFidelity measurement' },
          style: { ...nodeStyle, background: '#06b6d4' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Dynamic Compression Optimization',
      description: 'System adjusts compression ratios based on real-time quality metrics',
      activeNodes: ['quality-monitor', 'optimization-engine', 'literature-agent', 'data-agent', 'methodology-agent', 'synthesis-agent'],
      activeEdges: ['monitor-to-optimizer', 'optimizer-feedback'],
      nodeUpdates: {
        'optimization-engine': {
          data: { label: 'Optimization Engine\\nAdjusting compression ratios\\nLit: 76% → Data: 76%\\nMethod: 72.5% → Synth: 68%' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'literature-agent': {
          data: { label: 'Literature Agent\\nOptimized: 76% compression\\nQuality: 96%\\nOutput: 6K tokens' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'data-agent': {
          data: { label: 'Data Agent\\nOptimized: 76% compression\\nQuality: 95%\\nOutput: 7.2K tokens' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'methodology-agent': {
          data: { label: 'Methodology Agent\\nOptimized: 72.5% compression\\nQuality: 94%\\nOutput: 5.5K tokens' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'synthesis-agent': {
          data: { label: 'Synthesis Agent\\nOptimized: 68% compression\\nQuality: 93%\\nOutput: 4.8K tokens' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Cross-Agent Context Sharing',
      description: 'Agents share essential context while eliminating redundancy across the network',
      activeNodes: ['literature-agent', 'data-agent', 'methodology-agent', 'synthesis-agent', 'validation-agent', 'context-deduplicator', 'shared-context-pool'],
      activeEdges: ['agents-to-dedup', 'dedup-to-pool'],
      nodeUpdates: {
        'context-deduplicator': {
          data: { label: 'Context Deduplicator\\nEliminating redundancy\\n15% deduplication achieved\\nPreserving unique insights' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'shared-context-pool': {
          data: { label: 'Shared Context Pool\\n2K tokens shared context\\n95% quality score\\nOptimal cross-agent access' },
          style: { ...nodeStyle, background: '#06b6d4' }
        },
        'validation-agent': {
          data: { label: 'Validation Agent\\nOptimized: 65% compression\\nQuality: 92%\\nOutput: 3.5K tokens' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-6',
      title: 'Final Quality Assessment & Output',
      description: 'System delivers final compressed context with comprehensive quality metrics',
      activeNodes: ['shared-context-pool', 'final-validator', 'output-assembler', 'compressed-output'],
      activeEdges: ['pool-to-final', 'final-to-assembler', 'assembler-to-output'],
      output: 'Advanced Context Compression Complete\\n\\nCompression Results:\\n• Total Input: 100,000 tokens\\n• Total Output: 27,000 tokens\\n• Overall Compression: 73% reduction\\n• Average Quality: 94% semantic fidelity\\n\\nAgent Performance:\\n• Literature Agent: 76% compression, 96% quality\\n• Data Agent: 76% compression, 95% quality\\n• Methodology Agent: 72.5% compression, 94% quality\\n• Synthesis Agent: 68% compression, 93% quality\\n• Validation Agent: 65% compression, 92% quality\\n\\nSystem Benefits:\\n• Processing Speed: 5.6x improvement\\n• API Cost Reduction: 73%\\n• Memory Efficiency: 78% improvement\\n• Context Window Utilization: 35% (vs 95% uncompressed)\\n• Cross-Agent Deduplication: 15% redundancy eliminated\\n• Shared Context Quality: 95%\\n\\nQuality Preservation:\\n• Key Concept Retention: 99%\\n• Logical Flow Preservation: 95%\\n• Cross-Agent Coherence: 93%\\n• Reference Accuracy: 97%\\n• Statistical Significance: Maintained\\n\\nInnovation: Enables processing 3.7x larger documents\\nwithin same resource constraints while maintaining\\nhigh-quality outputs across all domains',
      nodeUpdates: {
        'final-validator': {
          data: { label: 'Final Validator\\nQuality verification complete\\n94% semantic fidelity\\nAll targets achieved' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'output-assembler': {
          data: { label: 'Output Assembler\\nIntegrating agent outputs\\nFinal optimization pass\\nAssembling deliverable' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'compressed-output': {
          data: { label: 'Compressed Output\\n27,000 tokens (73% reduction)\\n94% semantic fidelity\\n5.6x processing improvement' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    // Input Processing
    {
      id: 'input-corpus',
      position: { x: 100, y: 300 },
      data: { label: 'Input Corpus\\n100,000 token research content' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'content-analyzer',
      position: { x: 350, y: 200 },
      data: { label: 'Content Analyzer\\nClassifies content types and domains' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'distribution-engine',
      position: { x: 350, y: 400 },
      data: { label: 'Distribution Engine\\nAllocates content to specialized agents' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Compression Agents
    {
      id: 'literature-agent',
      position: { x: 650, y: 100 },
      data: { label: 'Literature Agent\\nAcademic papers and citations' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'data-agent',
      position: { x: 650, y: 200 },
      data: { label: 'Data Agent\\nDatasets and statistical content' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'methodology-agent',
      position: { x: 650, y: 300 },
      data: { label: 'Methodology Agent\\nProcedures and protocols' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'synthesis-agent',
      position: { x: 650, y: 400 },
      data: { label: 'Synthesis Agent\\nConclusions and insights' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },
    {
      id: 'validation-agent',
      position: { x: 650, y: 500 },
      data: { label: 'Validation Agent\\nQuality checks and references' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 150 }
    },

    // Quality & Optimization
    {
      id: 'semantic-validator',
      position: { x: 950, y: 250 },
      data: { label: 'Semantic Validator\\nCross-agent meaning preservation' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'quality-monitor',
      position: { x: 950, y: 350 },
      data: { label: 'Quality Monitor\\nReal-time compression metrics' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'optimization-engine',
      position: { x: 1200, y: 300 },
      data: { label: 'Optimization Engine\\nDynamic ratio adjustment' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Context Sharing
    {
      id: 'context-deduplicator',
      position: { x: 950, y: 450 },
      data: { label: 'Context Deduplicator\\nRedundancy elimination' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'shared-context-pool',
      position: { x: 1200, y: 450 },
      data: { label: 'Shared Context Pool\\nCross-agent context sharing' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },

    // Final Processing
    {
      id: 'final-validator',
      position: { x: 1450, y: 300 },
      data: { label: 'Final Validator\\nComprehensive quality check' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    },
    {
      id: 'output-assembler',
      position: { x: 1450, y: 450 },
      data: { label: 'Output Assembler\\nFinal integration and optimization' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'compressed-output',
      position: { x: 1700, y: 375 },
      data: { label: 'Compressed Output\\nOptimized context delivery' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 160 }
    }
  ],
  initialEdges: [
    // Input flow
    {
      id: 'corpus-to-analyzer',
      source: 'input-corpus',
      target: 'content-analyzer',
      style: edgeStyle
    },
    {
      id: 'analyzer-to-distribution',
      source: 'content-analyzer',
      target: 'distribution-engine',
      style: edgeStyle
    },

    // Distribution to agents
    {
      id: 'dist-to-lit',
      source: 'distribution-engine',
      target: 'literature-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'dist-to-data',
      source: 'distribution-engine',
      target: 'data-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'dist-to-method',
      source: 'distribution-engine',
      target: 'methodology-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'dist-to-synth',
      source: 'distribution-engine',
      target: 'synthesis-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'dist-to-valid',
      source: 'distribution-engine',
      target: 'validation-agent',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Agents to validation
    {
      id: 'lit-to-validator',
      source: 'literature-agent',
      target: 'semantic-validator',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'data-to-validator',
      source: 'data-agent',
      target: 'semantic-validator',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'method-to-validator',
      source: 'methodology-agent',
      target: 'quality-monitor',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'synth-to-validator',
      source: 'synthesis-agent',
      target: 'quality-monitor',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'valid-to-validator',
      source: 'validation-agent',
      target: 'quality-monitor',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Quality monitoring to optimization
    {
      id: 'monitor-to-optimizer',
      source: 'quality-monitor',
      target: 'optimization-engine',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'validator-to-optimizer',
      source: 'semantic-validator',
      target: 'optimization-engine',
      style: edgeStyle
    },

    // Optimization feedback
    {
      id: 'optimizer-feedback',
      source: 'optimization-engine',
      target: 'literature-agent',
      style: { ...edgeStyle, strokeDasharray: '3,3' }
    },

    // Context sharing
    {
      id: 'agents-to-dedup',
      source: 'literature-agent',
      target: 'context-deduplicator',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'data-to-dedup',
      source: 'data-agent',
      target: 'context-deduplicator',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'method-to-dedup',
      source: 'methodology-agent',
      target: 'context-deduplicator',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'synth-to-dedup',
      source: 'synthesis-agent',
      target: 'context-deduplicator',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'valid-to-dedup',
      source: 'validation-agent',
      target: 'context-deduplicator',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'dedup-to-pool',
      source: 'context-deduplicator',
      target: 'shared-context-pool',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Final processing
    {
      id: 'pool-to-final',
      source: 'shared-context-pool',
      target: 'final-validator',
      style: edgeStyle
    },
    {
      id: 'optimizer-to-final',
      source: 'optimization-engine',
      target: 'final-validator',
      style: edgeStyle
    },
    {
      id: 'final-to-assembler',
      source: 'final-validator',
      target: 'output-assembler',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'pool-to-assembler',
      source: 'shared-context-pool',
      target: 'output-assembler',
      style: edgeStyle
    },
    {
      id: 'assembler-to-output',
      source: 'output-assembler',
      target: 'compressed-output',
      style: { ...edgeStyle, strokeWidth: 4 }
    },

    // Quality feedback loops
    {
      id: 'final-feedback',
      source: 'final-validator',
      target: 'optimization-engine',
      style: { ...edgeStyle, strokeDasharray: '8,8' }
    }
  ]
};