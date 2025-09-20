import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hierarchicalContextArchitecturePattern: PatternScenario = {
  id: 'hierarchical-context-architecture',
  title: 'Hierarchical Context Architecture Pattern',
  description: 'Multi-layered memory system inspired by OS architecture enabling LLMs to overcome context limitations through hierarchical storage, self-directed memory operations, and intelligent routing',
  initialNodes: [
    // Context limitation challenge
    {
      id: 'context-limitation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🧠 Context Window Challenge\n"How to enable infinite context\nfor LLMs with fixed windows\nwhile maintaining performance?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Hierarchical architecture solution
    {
      id: 'hierarchical-architecture',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ Hierarchical Context Architecture\n"OS-inspired memory tiers:\n• Main context (RAM-like)\n• External context (Disk-like)\n• Self-directed management"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Layer 1: Working Memory
    {
      id: 'working-memory-layer',
      position: { x: 200, y: 350 },
      data: { label: '💾 Layer 1: Working Memory\n"Active context (2-8K tokens):\n• System instructions\n• Current conversation\n• FIFO message queue"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Main context components
    {
      id: 'main-context-components',
      position: { x: 50, y: 500 },
      data: { label: '📝 Main Context Components\n"Core memory segments:\n• System prompts (read-only)\n• Working context (read-write)\n• Recent messages (FIFO)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Layer 2: Short-Term Memory
    {
      id: 'short-term-memory-layer',
      position: { x: 600, y: 350 },
      data: { label: '🔄 Layer 2: Short-Term Memory\n"Session memory (10-50K tokens):\n• Thread checkpoints\n• Recent interactions\n• Episodic storage"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 260 },
    },

    // Recall storage
    {
      id: 'recall-storage',
      position: { x: 750, y: 500 },
      data: { label: '📚 Recall Storage\n"Complete event history:\n• All past conversations\n• Searchable index\n• Fast retrieval"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Layer 3: Long-Term Memory
    {
      id: 'long-term-memory-layer',
      position: { x: 400, y: 650 },
      data: { label: '🗄️ Layer 3: Long-Term Memory\n"Persistent storage (unlimited):\n• Archival database\n• Vector embeddings\n• Graph relationships"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Memory consolidation
    {
      id: 'memory-consolidation',
      position: { x: 200, y: 800 },
      data: { label: '🔀 Memory Consolidation\n"Extraction & update:\n• Fact extraction\n• Duplicate detection\n• Semantic compression"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Index-based routing
    {
      id: 'index-based-routing',
      position: { x: 600, y: 800 },
      data: { label: '🎯 Index-Based Routing\n"Efficient navigation:\n• Positional encoding\n• Semantic pointers\n• Layer-by-layer retrieval"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 210 },
    },

    // Self-directed operations
    {
      id: 'self-directed-operations',
      position: { x: 200, y: 950 },
      data: { label: '🤖 Self-Directed Operations\n"Autonomous management:\n• Memory pressure handling\n• Context swapping\n• Priority-based eviction"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      position: { x: 600, y: 950 },
      data: { label: '📊 Performance Impact\n"Measured improvements:\n• 26% accuracy gain\n• 91% lower latency\n• 90% token reduction"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Core hierarchical principle
    {
      id: 'hierarchical-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Hierarchical Context Principle\n"OS-inspired memory tiers overcome context limitations\nSelf-directed operations enable intelligent data movement\nMulti-layer architecture achieves infinite virtual context"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Challenge addressed by architecture
    {
      id: 'e1',
      source: 'context-limitation-challenge',
      target: 'hierarchical-architecture',
      ...edgeStyle,
      label: 'solved by'
    },

    // Architecture implements layers
    {
      id: 'e2',
      source: 'hierarchical-architecture',
      target: 'working-memory-layer',
      ...edgeStyle,
      label: 'Layer 1'
    },
    {
      id: 'e3',
      source: 'hierarchical-architecture',
      target: 'short-term-memory-layer',
      ...edgeStyle,
      label: 'Layer 2'
    },
    {
      id: 'e4',
      source: 'hierarchical-architecture',
      target: 'long-term-memory-layer',
      ...edgeStyle,
      label: 'Layer 3'
    },

    // Working memory details
    {
      id: 'e5',
      source: 'working-memory-layer',
      target: 'main-context-components',
      ...edgeStyle,
      label: 'includes'
    },

    // Short-term memory details
    {
      id: 'e6',
      source: 'short-term-memory-layer',
      target: 'recall-storage',
      ...edgeStyle,
      label: 'stores in'
    },

    // Memory flow connections
    {
      id: 'e7',
      source: 'working-memory-layer',
      target: 'short-term-memory-layer',
      ...edgeStyle,
      label: 'overflows to'
    },
    {
      id: 'e8',
      source: 'short-term-memory-layer',
      target: 'long-term-memory-layer',
      ...edgeStyle,
      label: 'archives to'
    },

    // Long-term memory operations
    {
      id: 'e9',
      source: 'long-term-memory-layer',
      target: 'memory-consolidation',
      ...edgeStyle,
      label: 'consolidates via'
    },
    {
      id: 'e10',
      source: 'long-term-memory-layer',
      target: 'index-based-routing',
      ...edgeStyle,
      label: 'retrieves via'
    },

    // Routing back to working memory
    {
      id: 'e11',
      source: 'index-based-routing',
      target: 'working-memory-layer',
      ...edgeStyle,
      label: 'loads into',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Self-directed management
    {
      id: 'e12',
      source: 'main-context-components',
      target: 'self-directed-operations',
      ...edgeStyle,
      label: 'triggers'
    },
    {
      id: 'e13',
      source: 'self-directed-operations',
      target: 'memory-consolidation',
      ...edgeStyle,
      label: 'initiates'
    },

    // Performance results
    {
      id: 'e14',
      source: 'index-based-routing',
      target: 'performance-metrics',
      ...edgeStyle,
      label: 'achieves'
    },

    // Metrics demonstrate principle
    {
      id: 'e15',
      source: 'performance-metrics',
      target: 'hierarchical-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Window Limitation Challenge",
      description: "How can LLMs with fixed context windows (2K-128K tokens) handle conversations and tasks requiring unlimited context while maintaining fast performance and low costs?",
      activeNodes: ['context-limitation-challenge'],
      activeEdges: []
    },
    {
      title: "Hierarchical Context Architecture Solution",
      description: "OS-inspired multi-tier memory system addresses challenge through hierarchical storage layers mimicking RAM/disk architecture with self-directed memory management capabilities.",
      activeNodes: ['hierarchical-architecture'],
      activeEdges: ['e1']
    },
    {
      title: "Three-Layer Memory Hierarchy",
      description: "Architecture implements three distinct layers: Working Memory (2-8K active tokens), Short-Term Memory (10-50K session storage), and Long-Term Memory (unlimited persistent storage).",
      activeNodes: ['working-memory-layer', 'short-term-memory-layer', 'long-term-memory-layer'],
      activeEdges: ['e2', 'e3', 'e4', 'e7', 'e8']
    },
    {
      title: "Working Memory and Main Context Components",
      description: "Layer 1 contains system instructions (read-only), working context (read-write key facts), and FIFO message queue managing recent conversations within token limits.",
      activeNodes: ['main-context-components', 'recall-storage'],
      activeEdges: ['e5', 'e6']
    },
    {
      title: "Memory Consolidation and Intelligent Routing",
      description: "System performs automatic fact extraction, duplicate detection, and semantic compression while index-based routing enables efficient layer-by-layer retrieval without exhaustive search.",
      activeNodes: ['memory-consolidation', 'index-based-routing'],
      activeEdges: ['e9', 'e10', 'e11']
    },
    {
      title: "Self-Directed Operations and Performance Impact",
      description: "Autonomous memory pressure handling and context swapping achieve 26% accuracy gain, 91% latency reduction, and 90% token savings, proving OS-inspired tiers enable infinite virtual context.",
      activeNodes: ['self-directed-operations', 'performance-metrics', 'hierarchical-principle'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    }
  ]
};