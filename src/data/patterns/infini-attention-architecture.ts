import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const infiniAttentionArchitecturePattern: PatternScenario = {
  id: 'infini-attention-architecture',
  title: 'Infini-Attention Architecture Pattern',
  description: 'Infinite context transformer architecture using compressive memory and dual attention mechanisms achieving 114x memory efficiency for processing million-token sequences',
  initialNodes: [
    // Infinite context challenge
    {
      id: 'infinite-context-challenge',
      position: { x: 400, y: 50 },
      data: { label: '♾️ Infinite Context Challenge\n"How to process million-token\nsequences with bounded memory\nand linear complexity?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Infini-attention framework
    {
      id: 'infini-attention-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ Infini-Attention Framework\n"Bounded infinite context:\n• Compressive memory\n• Dual attention paths\n• Linear complexity\n• State reuse"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Compressive memory
    {
      id: 'compressive-memory',
      position: { x: 200, y: 350 },
      data: { label: '💾 Compressive Memory\n"Fixed-size storage:\n• Associative matrix\n• KV state retention\n• Historical context\n• Constant parameters"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Memory consolidation
    {
      id: 'memory-consolidation',
      position: { x: 50, y: 500 },
      data: { label: '🔄 Memory Consolidation\n"State preservation:\n• Old KV states saved\n• Context accumulation\n• Selective updates\n• Information reservoir"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Dual attention mechanism
    {
      id: 'dual-attention-mechanism',
      position: { x: 600, y: 350 },
      data: { label: '👁️‍🗨️ Dual Attention\n"Parallel processing:\n• Local masked attention\n• Linear global attention\n• Single block integration\n• Range modeling"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Linear attention
    {
      id: 'linear-attention',
      position: { x: 750, y: 500 },
      data: { label: '📐 Linear Attention\n"Complexity reduction:\n• O(n) vs O(n²)\n• Memory retrieval\n• Query-based access\n• Efficient lookup"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // State reuse mechanism
    {
      id: 'state-reuse-mechanism',
      position: { x: 400, y: 650 },
      data: { label: '♻️ State Reuse\n"Efficiency optimization:\n• Query/Key/Value sharing\n• Computation savings\n• Plug-and-play design\n• Minimal parameters"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Gating mechanism
    {
      id: 'gating-mechanism',
      position: { x: 200, y: 800 },
      data: { label: '🚪 Gating Mechanism\n"Balance control:\n• β parameter\n• Local/global mixing\n• Task adaptation\n• Context weighting"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Attention head types
    {
      id: 'attention-head-types',
      position: { x: 600, y: 800 },
      data: { label: '🎯 Head Specialization\n"Task distribution:\n• Specialized heads\n• Mixer heads\n• Local focus\n• Memory retrieval"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 210 },
    },

    // Streaming processing
    {
      id: 'streaming-processing',
      position: { x: 200, y: 950 },
      data: { label: '🌊 Streaming Processing\n"Continuous handling:\n• Segment-by-segment\n• Memory updates\n• Infinite sequences\n• Bounded resources"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      position: { x: 600, y: 950 },
      data: { label: '📊 Performance Metrics\n"Breakthrough results:\n• 114x memory reduction\n• 1M token handling\n• SOTA summarization\n• Linear scaling"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Practical applications
    {
      id: 'practical-applications',
      position: { x: 400, y: 1100 },
      data: { label: '🚀 Practical Applications\n"Real-world impact:\n• Gemini 1.5 enabler\n• Book summarization\n• Passkey retrieval\n• Long-context tasks"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core infini principle
    {
      id: 'infini-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Infini-Attention Principle\n"Compressive memory enables infinite context with bounded resources\nDual attention paths balance local and global dependencies\nLinear complexity makes million-token processing practical"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'infinite-context-challenge',
      target: 'infini-attention-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements components
    {
      id: 'e2',
      source: 'infini-attention-framework',
      target: 'compressive-memory',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'infini-attention-framework',
      target: 'dual-attention-mechanism',
      ...edgeStyle,
      label: 'utilizes'
    },
    {
      id: 'e4',
      source: 'infini-attention-framework',
      target: 'state-reuse-mechanism',
      ...edgeStyle,
      label: 'optimizes via'
    },

    // Memory connections
    {
      id: 'e5',
      source: 'compressive-memory',
      target: 'memory-consolidation',
      ...edgeStyle,
      label: 'performs'
    },

    // Attention connections
    {
      id: 'e6',
      source: 'dual-attention-mechanism',
      target: 'linear-attention',
      ...edgeStyle,
      label: 'includes'
    },

    // State reuse flows
    {
      id: 'e7',
      source: 'state-reuse-mechanism',
      target: 'gating-mechanism',
      ...edgeStyle,
      label: 'controlled by'
    },
    {
      id: 'e8',
      source: 'state-reuse-mechanism',
      target: 'attention-head-types',
      ...edgeStyle,
      label: 'enables'
    },

    // Memory and attention integration
    {
      id: 'e9',
      source: 'memory-consolidation',
      target: 'gating-mechanism',
      ...edgeStyle,
      label: 'balanced via'
    },
    {
      id: 'e10',
      source: 'linear-attention',
      target: 'attention-head-types',
      ...edgeStyle,
      label: 'specialized into'
    },

    // Processing flow
    {
      id: 'e11',
      source: 'gating-mechanism',
      target: 'streaming-processing',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e12',
      source: 'attention-head-types',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'achieves'
    },

    // Performance connections
    {
      id: 'e13',
      source: 'streaming-processing',
      target: 'practical-applications',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e14',
      source: 'performance-metrics',
      target: 'practical-applications',
      ...edgeStyle,
      label: 'validates'
    },

    // Applications prove principle
    {
      id: 'e15',
      source: 'practical-applications',
      target: 'infini-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Infinite Context Challenge",
      description: "How can transformers process million-token sequences when traditional attention has quadratic O(n²) complexity and unbounded memory requirements?",
      activeNodes: ['infinite-context-challenge'],
      activeEdges: []
    },
    {
      title: "Infini-Attention Framework Introduction",
      description: "Framework addresses challenge through compressive memory for bounded storage, dual attention paths for range modeling, and linear complexity with efficient state reuse.",
      activeNodes: ['infini-attention-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Compressive Memory and Dual Attention",
      description: "Fixed-size compressive memory stores old KV states in associative matrix maintaining historical context, while dual mechanism combines local masked and linear global attention in single block.",
      activeNodes: ['compressive-memory', 'memory-consolidation', 'dual-attention-mechanism', 'linear-attention'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "State Reuse and Gating Control",
      description: "State reuse mechanism shares Query/Key/Value states for computation savings with minimal parameters, controlled by β gating parameter balancing local/global context mixing.",
      activeNodes: ['state-reuse-mechanism', 'gating-mechanism', 'attention-head-types'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Streaming Processing and Performance",
      description: "Segment-by-segment streaming enables infinite sequence processing with bounded resources, achieving 114x memory reduction and 1M token handling capability.",
      activeNodes: ['streaming-processing', 'performance-metrics'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Practical Applications and Validation",
      description: "Powers Gemini 1.5's million-token window, achieves SOTA on 500K book summarization, proving compressive memory with dual attention enables infinite context with linear complexity.",
      activeNodes: ['practical-applications', 'infini-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};