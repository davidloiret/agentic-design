import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryBlockArchitecturePattern: PatternScenario = {
  id: 'memory-block-architecture',
  title: 'Memory Block Architecture Pattern',
  description: 'Hierarchical memory systems using block-based processing, recurrent states, and gated mechanisms enabling efficient long-sequence modeling with segment-level memory management',
  initialNodes: [
    // Memory architecture challenge
    {
      id: 'memory-architecture-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🧩 Memory Architecture Challenge\n"How to maintain memory across\nlong sequences while avoiding\nquadratic complexity and vanishing gradients?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 340 },
    },

    // Memory block framework
    {
      id: 'memory-block-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏛️ Memory Block Framework\n"Segment-based processing:\n• Block recurrence\n• Hierarchical memory\n• Gated mechanisms\n• State propagation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // LSTM memory cells
    {
      id: 'lstm-memory-cells',
      position: { x: 200, y: 350 },
      data: { label: '🔒 LSTM Memory Cells\n"Gated architecture:\n• Input gate\n• Forget gate\n• Output gate\n• Cell state"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Gate mechanisms
    {
      id: 'gate-mechanisms',
      position: { x: 50, y: 500 },
      data: { label: '🚪 Gate Mechanisms\n"Selective memory:\n• Information filtering\n• State updates\n• Multiplicative units\n• Gradient flow control"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // RMT architecture
    {
      id: 'rmt-architecture',
      position: { x: 600, y: 350 },
      data: { label: '🔁 RMT Architecture\n"Recurrent Memory Transformer:\n• Memory tokens\n• Segment processing\n• BPTT training\n• State passing"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 270 },
    },

    // Memory token system
    {
      id: 'memory-token-system',
      position: { x: 750, y: 500 },
      data: { label: '🎫 Memory Tokens\n"Special tokens:\n• Reserved capacity\n• Cross-segment info\n• Gradient flow\n• State persistence"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 210 },
    },

    // HMT hierarchy
    {
      id: 'hmt-hierarchy',
      position: { x: 400, y: 650 },
      data: { label: '📚 HMT Hierarchy\n"Hierarchical Memory Transformer:\n• Multi-level storage\n• Token preservation\n• Memory recall\n• 13% better than RMT"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 290 },
    },

    // Block recurrent cells
    {
      id: 'block-recurrent-cells',
      position: { x: 200, y: 800 },
      data: { label: '🧱 Block Recurrent Cells\n"Hybrid processing:\n• Self-attention blocks\n• Cross-attention\n• LSTM-style gates\n• Recurrent states"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Associative memory
    {
      id: 'associative-memory',
      position: { x: 600, y: 800 },
      data: { label: '🌐 Associative Memory\n"ARMT approach:\n• Association matrices\n• Layerwise organization\n• Constant complexity\n• Hierarchical shifting"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Segment processing
    {
      id: 'segment-processing',
      position: { x: 200, y: 950 },
      data: { label: '📦 Segment Processing\n"Chunked computation:\n• Sequence splitting\n• Local attention\n• Memory passing\n• Linear complexity"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Memory persistence
    {
      id: 'memory-persistence',
      position: { x: 600, y: 950 },
      data: { label: '💾 Memory Persistence\n"State management:\n• Cross-segment storage\n• Gradient propagation\n• Information retention\n• Context preservation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Performance benefits
    {
      id: 'performance-benefits',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Performance Benefits\n"Efficiency gains:\n• Linear complexity\n• No gradient vanishing\n• Unlimited sequence length\n• Better long-range modeling"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Core memory principle
    {
      id: 'memory-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Memory Block Principle\n"Block-based recurrence enables efficient long-sequence processing\nHierarchical memory organization improves information retention\nGated mechanisms control memory flow and gradient propagation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'memory-architecture-challenge',
      target: 'memory-block-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements components
    {
      id: 'e2',
      source: 'memory-block-framework',
      target: 'lstm-memory-cells',
      ...edgeStyle,
      label: 'originates from'
    },
    {
      id: 'e3',
      source: 'memory-block-framework',
      target: 'rmt-architecture',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e4',
      source: 'memory-block-framework',
      target: 'hmt-hierarchy',
      ...edgeStyle,
      label: 'advances to'
    },

    // LSTM connections
    {
      id: 'e5',
      source: 'lstm-memory-cells',
      target: 'gate-mechanisms',
      ...edgeStyle,
      label: 'controls via'
    },

    // RMT connections
    {
      id: 'e6',
      source: 'rmt-architecture',
      target: 'memory-token-system',
      ...edgeStyle,
      label: 'uses'
    },

    // HMT connections
    {
      id: 'e7',
      source: 'hmt-hierarchy',
      target: 'block-recurrent-cells',
      ...edgeStyle,
      label: 'incorporates'
    },
    {
      id: 'e8',
      source: 'hmt-hierarchy',
      target: 'associative-memory',
      ...edgeStyle,
      label: 'extends with'
    },

    // Gate and token flows
    {
      id: 'e9',
      source: 'gate-mechanisms',
      target: 'block-recurrent-cells',
      ...edgeStyle,
      label: 'integrated in'
    },
    {
      id: 'e10',
      source: 'memory-token-system',
      target: 'associative-memory',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Processing flows
    {
      id: 'e11',
      source: 'block-recurrent-cells',
      target: 'segment-processing',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e12',
      source: 'associative-memory',
      target: 'memory-persistence',
      ...edgeStyle,
      label: 'maintains'
    },

    // Performance connections
    {
      id: 'e13',
      source: 'segment-processing',
      target: 'performance-benefits',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e14',
      source: 'memory-persistence',
      target: 'performance-benefits',
      ...edgeStyle,
      label: 'contributes to'
    },

    // Benefits validate principle
    {
      id: 'e15',
      source: 'performance-benefits',
      target: 'memory-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Memory Architecture Challenge",
      description: "How can models maintain memory across long sequences while avoiding quadratic complexity, vanishing gradients, and limited context windows?",
      activeNodes: ['memory-architecture-challenge'],
      activeEdges: []
    },
    {
      title: "Memory Block Framework Introduction",
      description: "Segment-based processing framework addresses challenge through block recurrence, hierarchical memory organization, gated mechanisms, and efficient state propagation across sequences.",
      activeNodes: ['memory-block-framework'],
      activeEdges: ['e1']
    },
    {
      title: "LSTM Foundation and RMT Evolution",
      description: "LSTM memory cells with input/forget/output gates pioneered selective memory, evolved into RMT using special memory tokens for segment processing with BPTT training.",
      activeNodes: ['lstm-memory-cells', 'gate-mechanisms', 'rmt-architecture', 'memory-token-system'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Hierarchical Memory Transformer Advancement",
      description: "HMT improves RMT by 13% through multi-level storage, token preservation, and memory recall, incorporating block recurrent cells with LSTM-style gates and associative memory matrices.",
      activeNodes: ['hmt-hierarchy', 'block-recurrent-cells', 'associative-memory'],
      activeEdges: ['e4', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Segment Processing and Memory Persistence",
      description: "Chunked computation splits sequences for local attention with memory passing between segments, maintaining cross-segment storage and gradient propagation for context preservation.",
      activeNodes: ['segment-processing', 'memory-persistence'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Performance Benefits and Validation",
      description: "Achieves linear complexity with unlimited sequence length, no gradient vanishing, and better long-range modeling, proving block-based recurrence with hierarchical memory enables efficient processing.",
      activeNodes: ['performance-benefits', 'memory-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};