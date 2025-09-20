import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const slidingWindowManagementPattern: PatternScenario = {
  id: 'sliding-window-management',
  title: 'Sliding Window Management Pattern',
  description: 'Efficient context management using fixed-size sliding windows, rolling buffer caches, and FIFO eviction achieving linear complexity while maintaining relevant conversation history',
  initialNodes: [
    // Window management challenge
    {
      id: 'window-management-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🪟 Window Management Challenge\n"How to handle long contexts\nwithout quadratic complexity\nwhile preserving relevance?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Sliding window framework
    {
      id: 'sliding-window-framework',
      position: { x: 400, y: 200 },
      data: { label: '🔄 Sliding Window Framework\n"Fixed-size attention:\n• Local context focus\n• Linear complexity O(n×w)\n• Rolling buffer cache\n• FIFO eviction"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Sliding window attention
    {
      id: 'sliding-window-attention',
      position: { x: 200, y: 350 },
      data: { label: '🎯 Sliding Window Attention\n"Local attention pattern:\n• Window size w = 4096\n• Attends to ½w each side\n• O(n×w) complexity\n• 2x speed improvement"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Mistral implementation
    {
      id: 'mistral-implementation',
      position: { x: 50, y: 500 },
      data: { label: '🌬️ Mistral SWA\n"Optimized attention:\n• 4K window size\n• 131K theoretical span\n• FlashAttention\n• xFormers integration"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 210 },
    },

    // Buffer window memory
    {
      id: 'buffer-window-memory',
      position: { x: 600, y: 350 },
      data: { label: '📋 Buffer Window Memory\n"Conversation management:\n• Last k interactions\n• FIFO eviction\n• Token limit control\n• Latency reduction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // LangChain implementation
    {
      id: 'langchain-implementation',
      position: { x: 750, y: 500 },
      data: { label: '🦜 LangChain Buffer\n"ConversationBufferWindowMemory:\n• Fixed k messages\n• Automatic pruning\n• Cost optimization\n• Context preservation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 260 },
    },

    // Rolling buffer cache
    {
      id: 'rolling-buffer-cache',
      position: { x: 400, y: 650 },
      data: { label: '🔄 Rolling Buffer Cache\n"Circular storage:\n• Position: i mod W\n• Overwrites old values\n• 8x memory reduction\n• Fixed cache size"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Layered attention
    {
      id: 'layered-attention',
      position: { x: 200, y: 800 },
      data: { label: '📈 Layered Attention\n"Extended receptive field:\n• Layer k: W tokens\n• Layer k-1: 2×W tokens\n• Total: l×W span\n• Stacked transformers"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // FIFO eviction strategy
    {
      id: 'fifo-eviction',
      position: { x: 600, y: 800 },
      data: { label: '🚶 FIFO Eviction\n"First-In-First-Out:\n• Drop oldest messages\n• Maintain recency\n• Prevent overflow\n• Simple implementation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 210 },
    },

    // Performance benefits
    {
      id: 'performance-benefits',
      position: { x: 200, y: 950 },
      data: { label: '⚡ Performance Benefits\n"Optimization gains:\n• 2x speed at 16K seq\n• 8x cache reduction\n• Linear complexity\n• 50% memory savings"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Context preservation
    {
      id: 'context-preservation',
      position: { x: 600, y: 950 },
      data: { label: '📋 Context Preservation\n"Relevance maintenance:\n• Recent interactions\n• Critical information\n• Conversation flow\n• Quality retention"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Trade-offs
    {
      id: 'trade-offs',
      position: { x: 400, y: 1100 },
      data: { label: '⚖️ Trade-offs\n"Considerations:\n• Local context focus\n• Distant interactions lost\n• Window size tuning\n• Task dependency"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Core window principle
    {
      id: 'window-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Sliding Window Principle\n"Fixed-size windows enable linear complexity scaling\nRolling buffers optimize memory without quality loss\nLocal attention patterns sufficient for most contexts"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'window-management-challenge',
      target: 'sliding-window-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements patterns
    {
      id: 'e2',
      source: 'sliding-window-framework',
      target: 'sliding-window-attention',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'sliding-window-framework',
      target: 'buffer-window-memory',
      ...edgeStyle,
      label: 'manages'
    },
    {
      id: 'e4',
      source: 'sliding-window-framework',
      target: 'rolling-buffer-cache',
      ...edgeStyle,
      label: 'utilizes'
    },

    // Implementation details
    {
      id: 'e5',
      source: 'sliding-window-attention',
      target: 'mistral-implementation',
      ...edgeStyle,
      label: 'exemplified by'
    },
    {
      id: 'e6',
      source: 'buffer-window-memory',
      target: 'langchain-implementation',
      ...edgeStyle,
      label: 'implemented in'
    },

    // Cache and attention connections
    {
      id: 'e7',
      source: 'rolling-buffer-cache',
      target: 'layered-attention',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e8',
      source: 'rolling-buffer-cache',
      target: 'fifo-eviction',
      ...edgeStyle,
      label: 'applies'
    },

    // Implementation flows
    {
      id: 'e9',
      source: 'mistral-implementation',
      target: 'layered-attention',
      ...edgeStyle,
      label: 'extends via'
    },
    {
      id: 'e10',
      source: 'langchain-implementation',
      target: 'fifo-eviction',
      ...edgeStyle,
      label: 'uses'
    },

    // Benefits connections
    {
      id: 'e11',
      source: 'layered-attention',
      target: 'performance-benefits',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e12',
      source: 'fifo-eviction',
      target: 'context-preservation',
      ...edgeStyle,
      label: 'maintains'
    },

    // Trade-offs analysis
    {
      id: 'e13',
      source: 'performance-benefits',
      target: 'trade-offs',
      ...edgeStyle,
      label: 'balanced against'
    },
    {
      id: 'e14',
      source: 'context-preservation',
      target: 'trade-offs',
      ...edgeStyle,
      label: 'considers'
    },

    // Trade-offs validate principle
    {
      id: 'e15',
      source: 'trade-offs',
      target: 'window-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Window Management Challenge",
      description: "How can we efficiently handle long contexts without quadratic O(n²) complexity while preserving relevant conversation history and maintaining model quality?",
      activeNodes: ['window-management-challenge'],
      activeEdges: []
    },
    {
      title: "Sliding Window Framework",
      description: "Fixed-size attention framework addresses challenge through local context focus, linear O(n×w) complexity scaling, rolling buffer caches, and FIFO eviction strategies.",
      activeNodes: ['sliding-window-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Sliding Window Attention and Buffer Memory",
      description: "SWA implements local attention with window size w=4096 attending ½w tokens each side, while buffer memory maintains last k interactions with automatic FIFO pruning for token control.",
      activeNodes: ['sliding-window-attention', 'mistral-implementation', 'buffer-window-memory', 'langchain-implementation'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Rolling Buffer Cache Implementation",
      description: "Circular storage uses position i mod W for cache management, overwriting old values to achieve 8x memory reduction while maintaining fixed cache size for efficient inference.",
      activeNodes: ['rolling-buffer-cache'],
      activeEdges: ['e4']
    },
    {
      title: "Layered Attention and FIFO Eviction",
      description: "Stacked transformers extend receptive field to l×W span through layered attention, while FIFO eviction drops oldest messages maintaining recency and preventing overflow.",
      activeNodes: ['layered-attention', 'fifo-eviction'],
      activeEdges: ['e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Performance Benefits and Trade-offs",
      description: "Achieves 2x speed at 16K sequences with 8x cache reduction and 50% memory savings, balanced against local focus limitations, proving fixed-size windows enable linear scaling with sufficient context for most tasks.",
      activeNodes: ['performance-benefits', 'context-preservation', 'trade-offs', 'window-principle'],
      activeEdges: ['e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};