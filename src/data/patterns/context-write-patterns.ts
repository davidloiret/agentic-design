import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextWritePatternsPattern: PatternScenario = {
  id: 'context-write-patterns',
  title: 'Context Write Patterns',
  description: 'Strategies for updating and managing LLM context memory through append, overwrite, merge, and compression techniques enabling efficient long-term conversation management',
  initialNodes: [
    // Context update challenge
    {
      id: 'context-update-challenge',
      position: { x: 400, y: 50 },
      data: { label: '📝 Context Update Challenge\n"How to efficiently update LLM memory\nwhile preserving important information\nand managing token limits?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Write patterns framework
    {
      id: 'write-patterns-framework',
      position: { x: 400, y: 200 },
      data: { label: '🔄 Write Patterns Framework\n"Memory update strategies:\n• Append patterns\n• Overwrite patterns\n• Merge strategies\n• Compression techniques"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Append pattern
    {
      id: 'append-pattern',
      position: { x: 200, y: 350 },
      data: { label: '➕ Append Pattern\n"Sequential addition:\n• ConversationBufferMemory\n• FIFO queue management\n• Linear growth\n• Full history retention"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Append implementation
    {
      id: 'append-implementation',
      position: { x: 50, y: 500 },
      data: { label: '📚 Buffer Implementation\n"Memory storage:\n• save_context() method\n• Message accumulation\n• Token count tracking\n• Overflow handling"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 210 },
    },

    // Overwrite pattern
    {
      id: 'overwrite-pattern',
      position: { x: 600, y: 350 },
      data: { label: '✏️ Overwrite Pattern\n"Replace strategy:\n• Fixed-size memory\n• Segment processing\n• State replacement\n• Constant cost"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Window memory
    {
      id: 'window-memory',
      position: { x: 750, y: 500 },
      data: { label: '🪟 Window Memory\n"Recent context:\n• BufferWindowMemory\n• Last k messages\n• Sliding window\n• Bounded tokens"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Merge patterns
    {
      id: 'merge-patterns',
      position: { x: 200, y: 650 },
      data: { label: '🔀 Merge Patterns\n"Hierarchical combination:\n• HOMER approach\n• Divide-and-conquer\n• Context merging\n• Multi-level aggregation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Summary memory
    {
      id: 'summary-memory',
      position: { x: 50, y: 800 },
      data: { label: '📋 Summary Memory\n"Condensed history:\n• ConversationSummaryMemory\n• LLM-powered summarization\n• Progressive compression\n• Token optimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Compression strategies
    {
      id: 'compression-strategies',
      position: { x: 600, y: 650 },
      data: { label: '🗜️ Compression Strategies\n"Size reduction:\n• Recursive summarization\n• Importance scoring\n• Semantic compression\n• Auto-compaction"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Hybrid buffer
    {
      id: 'hybrid-buffer',
      position: { x: 750, y: 800 },
      data: { label: '🔄 Hybrid Buffer\n"Combined approach:\n• SummaryBufferMemory\n• Recent messages raw\n• Old messages summarized\n• Dynamic threshold"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Write optimization
    {
      id: 'write-optimization',
      position: { x: 400, y: 950 },
      data: { label: '⚡ Write Optimization\n"Performance tuning:\n• Batch updates\n• Lazy evaluation\n• Cache invalidation\n• Memory pooling"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // RL-based updates
    {
      id: 'rl-based-updates',
      position: { x: 200, y: 1100 },
      data: { label: '🤖 RL-Based Updates\n"Intelligent selection:\n• DAPO algorithm\n• Reward-based retention\n• Dynamic prioritization\n• Adaptive learning"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 230 },
    },

    // Persistence layer
    {
      id: 'persistence-layer',
      position: { x: 600, y: 1100 },
      data: { label: '💾 Persistence Layer\n"Long-term storage:\n• Vector databases\n• SQL storage\n• External services\n• Session recovery"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Core write principle
    {
      id: 'write-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Write Principle\n"Efficient memory updates balance retention and compression\nMultiple write patterns enable flexible context management\nIntelligent strategies optimize for both performance and relevance"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'context-update-challenge',
      target: 'write-patterns-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements patterns
    {
      id: 'e2',
      source: 'write-patterns-framework',
      target: 'append-pattern',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'write-patterns-framework',
      target: 'overwrite-pattern',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e4',
      source: 'write-patterns-framework',
      target: 'merge-patterns',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e5',
      source: 'write-patterns-framework',
      target: 'compression-strategies',
      ...edgeStyle,
      label: 'applies'
    },

    // Pattern implementations
    {
      id: 'e6',
      source: 'append-pattern',
      target: 'append-implementation',
      ...edgeStyle,
      label: 'uses'
    },
    {
      id: 'e7',
      source: 'overwrite-pattern',
      target: 'window-memory',
      ...edgeStyle,
      label: 'creates'
    },

    // Merge and compression details
    {
      id: 'e8',
      source: 'merge-patterns',
      target: 'summary-memory',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e9',
      source: 'compression-strategies',
      target: 'hybrid-buffer',
      ...edgeStyle,
      label: 'produces'
    },

    // Cross-pattern connections
    {
      id: 'e10',
      source: 'summary-memory',
      target: 'hybrid-buffer',
      ...edgeStyle,
      label: 'combines with'
    },
    {
      id: 'e11',
      source: 'window-memory',
      target: 'hybrid-buffer',
      ...edgeStyle,
      label: 'integrates'
    },

    // Optimization layer
    {
      id: 'e12',
      source: 'hybrid-buffer',
      target: 'write-optimization',
      ...edgeStyle,
      label: 'optimizes via'
    },
    {
      id: 'e13',
      source: 'append-implementation',
      target: 'write-optimization',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Advanced techniques
    {
      id: 'e14',
      source: 'write-optimization',
      target: 'rl-based-updates',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e15',
      source: 'write-optimization',
      target: 'persistence-layer',
      ...edgeStyle,
      label: 'persists to'
    },

    // Techniques prove principle
    {
      id: 'e16',
      source: 'rl-based-updates',
      target: 'write-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e17',
      source: 'persistence-layer',
      target: 'write-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Update Challenge",
      description: "How can we efficiently update LLM memory to preserve important information while managing token limits and computational costs in long-running conversations?",
      activeNodes: ['context-update-challenge'],
      activeEdges: []
    },
    {
      title: "Write Patterns Framework Introduction",
      description: "Comprehensive framework addresses challenge through multiple memory update strategies: append patterns for full history, overwrite for bounded memory, merge for hierarchical combination, and compression for optimization.",
      activeNodes: ['write-patterns-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Append and Overwrite Patterns",
      description: "Append pattern uses ConversationBufferMemory for sequential addition with linear growth, while overwrite pattern implements fixed-size memory with segment processing and constant computational cost.",
      activeNodes: ['append-pattern', 'append-implementation', 'overwrite-pattern', 'window-memory'],
      activeEdges: ['e2', 'e3', 'e6', 'e7']
    },
    {
      title: "Merge Patterns and Compression Strategies",
      description: "HOMER hierarchical merging uses divide-and-conquer for multi-level aggregation, while compression strategies apply recursive summarization, importance scoring, and semantic compression for token optimization.",
      activeNodes: ['merge-patterns', 'summary-memory', 'compression-strategies', 'hybrid-buffer'],
      activeEdges: ['e4', 'e5', 'e8', 'e9', 'e10', 'e11']
    },
    {
      title: "Write Optimization and Advanced Techniques",
      description: "Optimization layer implements batch updates, lazy evaluation, and memory pooling, enabling RL-based updates with DAPO algorithm for intelligent retention and adaptive learning.",
      activeNodes: ['write-optimization', 'rl-based-updates', 'persistence-layer'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    },
    {
      title: "Context Write Principle Validation",
      description: "Multiple write patterns enable flexible memory management, with intelligent strategies balancing retention and compression, proving efficient updates optimize both performance and relevance in long-term conversations.",
      activeNodes: ['write-principle'],
      activeEdges: ['e16', 'e17']
    }
  ]
};