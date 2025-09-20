import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextSelectPatternsPattern: PatternScenario = {
  id: 'context-select-patterns',
  title: 'Context Select Patterns',
  description: 'Strategic retrieval and filtering techniques for selecting optimal context including semantic search, query routing, reranking, and adaptive selection enabling precise LLM responses',
  initialNodes: [
    // Context selection challenge
    {
      id: 'context-selection-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Context Selection Challenge\n"How to retrieve the most relevant\ncontext from vast knowledge bases\nwhile minimizing noise and cost?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Selection patterns framework
    {
      id: 'selection-patterns-framework',
      position: { x: 400, y: 200 },
      data: { label: '🔍 Selection Patterns Framework\n"Multi-stage retrieval:\n• Semantic search\n• Query routing\n• Reranking\n• Adaptive filtering"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Semantic search
    {
      id: 'semantic-search',
      position: { x: 200, y: 350 },
      data: { label: '🔢 Semantic Search\n"Embedding-based retrieval:\n• Top-k similarity\n• Vector databases\n• Cosine distance\n• Fast dot products"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Hybrid search
    {
      id: 'hybrid-search',
      position: { x: 50, y: 500 },
      data: { label: '🔀 Hybrid Search\n"Combined approaches:\n• Keyword + semantic\n• BM25 + embeddings\n• Metadata filtering\n• Score fusion"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Query routing
    {
      id: 'query-routing',
      position: { x: 600, y: 350 },
      data: { label: '🚦 Query Routing\n"Intelligent dispatch:\n• LLM selector\n• Keyword matching\n• Intent classification\n• Multi-retriever"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },

    // Route selection
    {
      id: 'route-selection',
      position: { x: 750, y: 500 },
      data: { label: '📋 Route Selection\n"Router types:\n• Metadata-based\n• Semantic similarity\n• Tool selection\n• Index selection"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Two-stage retrieval
    {
      id: 'two-stage-retrieval',
      position: { x: 400, y: 650 },
      data: { label: '2️⃣ Two-Stage Retrieval\n"Precision enhancement:\n• Stage 1: k=40 candidates\n• Stage 2: Rerank to top-5\n• Cross-encoder scoring\n• LLM-based filtering"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Contextual compression
    {
      id: 'contextual-compression',
      position: { x: 200, y: 800 },
      data: { label: '📦 Contextual Compression\n"Relevance extraction:\n• Document filtering\n• Segment extraction\n• LLMChainExtractor\n• EmbeddingsFilter"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // MMR selection
    {
      id: 'mmr-selection',
      position: { x: 600, y: 800 },
      data: { label: '🎯 MMR Selection\n"Diversity optimization:\n• Maximum Marginal Relevance\n• Relevance + diversity\n• Redundancy reduction\n• Balanced perspectives"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },

    // Parent-child retrieval
    {
      id: 'parent-child-retrieval',
      position: { x: 200, y: 950 },
      data: { label: '👨‍👦 Parent-Child Retrieval\n"Adaptive context:\n• Small chunk search\n• Parent node expansion\n• Auto-merging\n• Context enrichment"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Self-query retrieval
    {
      id: 'self-query-retrieval',
      position: { x: 600, y: 950 },
      data: { label: '🤖 Self-Query Retrieval\n"Query decomposition:\n• Semantic components\n• Metadata filters\n• Structured queries\n• Combined search"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Node post-processing
    {
      id: 'node-post-processing',
      position: { x: 400, y: 1100 },
      data: { label: '⚙️ Node Post-Processing\n"Final refinement:\n• Transformation\n• Filtering\n• Re-ranking\n• Score calibration"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Core selection principle
    {
      id: 'selection-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Selection Principle\n"Multi-stage retrieval optimizes relevance and diversity\nIntelligent routing adapts to query characteristics\nAdaptive selection balances precision with context richness"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'context-selection-challenge',
      target: 'selection-patterns-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements patterns
    {
      id: 'e2',
      source: 'selection-patterns-framework',
      target: 'semantic-search',
      ...edgeStyle,
      label: 'starts with'
    },
    {
      id: 'e3',
      source: 'selection-patterns-framework',
      target: 'query-routing',
      ...edgeStyle,
      label: 'routes via'
    },
    {
      id: 'e4',
      source: 'selection-patterns-framework',
      target: 'two-stage-retrieval',
      ...edgeStyle,
      label: 'enhances with'
    },

    // Search pattern details
    {
      id: 'e5',
      source: 'semantic-search',
      target: 'hybrid-search',
      ...edgeStyle,
      label: 'combines with'
    },
    {
      id: 'e6',
      source: 'query-routing',
      target: 'route-selection',
      ...edgeStyle,
      label: 'selects'
    },

    // Two-stage connections
    {
      id: 'e7',
      source: 'hybrid-search',
      target: 'two-stage-retrieval',
      ...edgeStyle,
      label: 'feeds into'
    },
    {
      id: 'e8',
      source: 'route-selection',
      target: 'two-stage-retrieval',
      ...edgeStyle,
      label: 'directs to'
    },

    // Refinement techniques
    {
      id: 'e9',
      source: 'two-stage-retrieval',
      target: 'contextual-compression',
      ...edgeStyle,
      label: 'compresses via'
    },
    {
      id: 'e10',
      source: 'two-stage-retrieval',
      target: 'mmr-selection',
      ...edgeStyle,
      label: 'diversifies with'
    },

    // Advanced retrieval patterns
    {
      id: 'e11',
      source: 'contextual-compression',
      target: 'parent-child-retrieval',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e12',
      source: 'mmr-selection',
      target: 'self-query-retrieval',
      ...edgeStyle,
      label: 'enhances'
    },

    // Post-processing flow
    {
      id: 'e13',
      source: 'parent-child-retrieval',
      target: 'node-post-processing',
      ...edgeStyle,
      label: 'processes'
    },
    {
      id: 'e14',
      source: 'self-query-retrieval',
      target: 'node-post-processing',
      ...edgeStyle,
      label: 'refines'
    },

    // Post-processing validates principle
    {
      id: 'e15',
      source: 'node-post-processing',
      target: 'selection-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Selection Challenge",
      description: "How can we retrieve the most relevant context from vast knowledge bases while minimizing noise, computational cost, and irrelevant information that degrades LLM performance?",
      activeNodes: ['context-selection-challenge'],
      activeEdges: []
    },
    {
      title: "Selection Patterns Framework",
      description: "Multi-stage retrieval framework addresses challenge through semantic search for initial retrieval, query routing for intelligent dispatch, reranking for precision, and adaptive filtering for optimal context.",
      activeNodes: ['selection-patterns-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Semantic Search and Query Routing",
      description: "Semantic search uses top-k embedding similarity with vector databases for fast retrieval, while query routing intelligently dispatches to specialized retrievers based on intent and metadata.",
      activeNodes: ['semantic-search', 'hybrid-search', 'query-routing', 'route-selection'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Two-Stage Retrieval Enhancement",
      description: "Two-stage process retrieves k=40 candidates in stage 1, then reranks to top-5 using cross-encoder scoring or LLM-based filtering, significantly improving relevance over single-stage retrieval.",
      activeNodes: ['two-stage-retrieval'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Contextual Compression and Diversity",
      description: "Contextual compression extracts only relevant segments using LLMChainExtractor or EmbeddingsFilter, while MMR selection balances relevance with diversity to reduce redundancy and provide balanced perspectives.",
      activeNodes: ['contextual-compression', 'mmr-selection'],
      activeEdges: ['e9', 'e10']
    },
    {
      title: "Advanced Retrieval and Post-Processing",
      description: "Parent-child retrieval enables small chunk search with parent expansion, self-query decomposes queries into semantic and metadata components, with node post-processing applying final transformations, proving multi-stage retrieval optimizes relevance and diversity.",
      activeNodes: ['parent-child-retrieval', 'self-query-retrieval', 'node-post-processing', 'selection-principle'],
      activeEdges: ['e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};