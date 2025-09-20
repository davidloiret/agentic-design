import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextLifecycleManagementPattern: PatternScenario = {
  id: 'context-lifecycle-management',
  title: 'Context Lifecycle Management Pattern',
  description: 'Comprehensive framework for managing LLM context through initialization, evolution, persistence, pruning, and expiration phases ensuring optimal memory usage and conversation coherence',
  initialNodes: [
    // Context management challenge
    {
      id: 'context-management-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔄 Context Management Challenge\n"How to manage LLM context state\nacross sessions while handling\nmemory limits and costs?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Context lifecycle framework
    {
      id: 'context-lifecycle-framework',
      position: { x: 400, y: 200 },
      data: { label: '⚙️ Context Lifecycle Framework\n"Complete lifecycle management:\n• 6 lifecycle phases\n• Memory optimization\n• State persistence"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Phase 1: Initialization
    {
      id: 'initialization-phase',
      position: { x: 200, y: 350 },
      data: { label: '🚀 Phase 1: Initialization\n"Context setup:\n• Session creation\n• Capability negotiation\n• Memory allocation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Static context
    {
      id: 'static-context',
      position: { x: 50, y: 500 },
      data: { label: '📌 Static Context\n"Immutable data:\n• User metadata\n• System prompts\n• Tool configurations"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },

    // Phase 2: Evolution
    {
      id: 'evolution-phase',
      position: { x: 600, y: 350 },
      data: { label: '📈 Phase 2: Evolution\n"Active operation:\n• Message accumulation\n• Context expansion\n• State updates"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Dynamic context
    {
      id: 'dynamic-context',
      position: { x: 750, y: 500 },
      data: { label: '🔄 Dynamic Context\n"Mutable state:\n• Conversation history\n• Session variables\n• Retrieved documents"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    // Phase 3: Persistence
    {
      id: 'persistence-phase',
      position: { x: 200, y: 650 },
      data: { label: '💾 Phase 3: Persistence\n"State management:\n• Short-term memory\n• Long-term storage\n• Cross-session data"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Memory types
    {
      id: 'memory-types',
      position: { x: 200, y: 800 },
      data: { label: '🧠 Memory Types\n"Storage patterns:\n• Thread-scoped checkpoints\n• LangGraph store\n• External databases"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Phase 4: Pruning
    {
      id: 'pruning-phase',
      position: { x: 600, y: 650 },
      data: { label: '✂️ Phase 4: Pruning\n"Context optimization:\n• Sliding window\n• Summarization\n• Relevance filtering"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Pruning strategies
    {
      id: 'pruning-strategies',
      position: { x: 600, y: 800 },
      data: { label: '🎯 Pruning Strategies\n"Optimization methods:\n• FIFO/LIFO removal\n• Importance scoring\n• Semantic compression"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Phase 5: Refresh
    {
      id: 'refresh-phase',
      position: { x: 400, y: 950 },
      data: { label: '🔃 Phase 5: Refresh\n"Context renewal:\n• Cache invalidation\n• Data updates\n• TTL management"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Phase 6: Expiration
    {
      id: 'expiration-phase',
      position: { x: 400, y: 1100 },
      data: { label: '⏰ Phase 6: Expiration\n"Lifecycle completion:\n• Session termination\n• Memory cleanup\n• State archival"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Optimization benefits
    {
      id: 'optimization-benefits',
      position: { x: 200, y: 1250 },
      data: { label: '📊 Optimization Results\n"Performance gains:\n• 60% response time reduction\n• 70% database load reduction\n• Token cost optimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Core lifecycle principle
    {
      id: 'lifecycle-principle',
      position: { x: 600, y: 1250 },
      data: { label: '🎯 Context Lifecycle Principle\n"Stateless LLMs require stateful management\nProper lifecycle phases ensure coherent conversations\nOptimized context enables scalable AI applications"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 370 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'context-management-challenge',
      target: 'context-lifecycle-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements phases
    {
      id: 'e2',
      source: 'context-lifecycle-framework',
      target: 'initialization-phase',
      ...edgeStyle,
      label: 'Phase 1'
    },
    {
      id: 'e3',
      source: 'context-lifecycle-framework',
      target: 'evolution-phase',
      ...edgeStyle,
      label: 'Phase 2'
    },

    // Initialization includes static context
    {
      id: 'e4',
      source: 'initialization-phase',
      target: 'static-context',
      ...edgeStyle,
      label: 'establishes'
    },

    // Evolution includes dynamic context
    {
      id: 'e5',
      source: 'evolution-phase',
      target: 'dynamic-context',
      ...edgeStyle,
      label: 'manages'
    },

    // Evolution leads to persistence
    {
      id: 'e6',
      source: 'evolution-phase',
      target: 'persistence-phase',
      ...edgeStyle,
      label: 'requires'
    },

    // Persistence includes memory types
    {
      id: 'e7',
      source: 'persistence-phase',
      target: 'memory-types',
      ...edgeStyle,
      label: 'implements'
    },

    // Evolution also leads to pruning
    {
      id: 'e8',
      source: 'dynamic-context',
      target: 'pruning-phase',
      ...edgeStyle,
      label: 'triggers'
    },

    // Pruning includes strategies
    {
      id: 'e9',
      source: 'pruning-phase',
      target: 'pruning-strategies',
      ...edgeStyle,
      label: 'applies'
    },

    // Pruning leads to refresh
    {
      id: 'e10',
      source: 'pruning-phase',
      target: 'refresh-phase',
      ...edgeStyle,
      label: 'enables'
    },

    // Memory types also connect to refresh
    {
      id: 'e11',
      source: 'memory-types',
      target: 'refresh-phase',
      ...edgeStyle,
      label: 'updates via'
    },

    // Refresh leads to expiration
    {
      id: 'e12',
      source: 'refresh-phase',
      target: 'expiration-phase',
      ...edgeStyle,
      label: 'eventually'
    },

    // Expiration produces benefits
    {
      id: 'e13',
      source: 'expiration-phase',
      target: 'optimization-benefits',
      ...edgeStyle,
      label: 'achieves'
    },

    // Benefits demonstrate principle
    {
      id: 'e14',
      source: 'optimization-benefits',
      target: 'lifecycle-principle',
      ...edgeStyle,
      label: 'proves',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },

    // Expiration also demonstrates principle
    {
      id: 'e15',
      source: 'expiration-phase',
      target: 'lifecycle-principle',
      ...edgeStyle,
      label: 'completes',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Management Challenge",
      description: "How can we manage stateless LLM context across sessions while handling memory limits, maintaining coherence, and controlling costs?",
      activeNodes: ['context-management-challenge'],
      activeEdges: []
    },
    {
      title: "Context Lifecycle Framework Introduction",
      description: "Comprehensive framework addresses challenge through 6 lifecycle phases managing complete context evolution from initialization through expiration.",
      activeNodes: ['context-lifecycle-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Phase 1-2: Initialization and Evolution",
      description: "Initialization establishes static context (user metadata, system prompts) while Evolution phase manages dynamic context accumulation (conversation history, session variables).",
      activeNodes: ['initialization-phase', 'static-context', 'evolution-phase', 'dynamic-context'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Phase 3: Persistence and Memory Management",
      description: "Persistence phase implements storage patterns: thread-scoped checkpoints for short-term memory, LangGraph store for long-term, external databases for cross-session data.",
      activeNodes: ['persistence-phase', 'memory-types'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Phase 4: Context Pruning and Optimization",
      description: "Pruning phase optimizes context through sliding windows, summarization, and relevance filtering using FIFO/LIFO removal, importance scoring, and semantic compression strategies.",
      activeNodes: ['pruning-phase', 'pruning-strategies'],
      activeEdges: ['e8', 'e9']
    },
    {
      title: "Phase 5-6: Refresh, Expiration, and Lifecycle Completion",
      description: "Refresh phase manages cache invalidation and TTL, Expiration handles session termination and cleanup, achieving 60% response time and 70% database load reduction, proving stateless LLMs require stateful management.",
      activeNodes: ['refresh-phase', 'expiration-phase', 'optimization-benefits', 'lifecycle-principle'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};