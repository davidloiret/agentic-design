import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextCompressPatternsPattern: PatternScenario = {
  id: 'context-compress-patterns',
  title: 'Context Compress Patterns',
  description: 'Advanced compression techniques reducing prompt size while preserving key information through token pruning, extractive/abstractive summarization, and contextual filtering achieving up to 20x compression',
  initialNodes: [
    // Compression challenge
    {
      id: 'compression-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🗜️ Compression Challenge\n"How to reduce context size\nwhile preserving critical information\nand maintaining LLM performance?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Compression framework
    {
      id: 'compression-framework',
      position: { x: 400, y: 200 },
      data: { label: '📦 Compression Framework\n"Multi-technique approach:\n• Token classification\n• Document filtering\n• Summarization\n• Embeddings reduction"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // LLMLingua approach
    {
      id: 'llmlingua-approach',
      position: { x: 200, y: 350 },
      data: { label: '🔬 LLMLingua\n"Token-level compression:\n• 20x compression ratio\n• Minimal performance loss\n• Bidirectional context\n• Token classification"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // LongLLMLingua
    {
      id: 'longllmlingua',
      position: { x: 50, y: 500 },
      data: { label: '📜 LongLLMLingua\n"Long context optimization:\n• 17.1% performance gain\n• 4x compression\n• Position bias mitigation\n• 94% cost reduction"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Extractive compression
    {
      id: 'extractive-compression',
      position: { x: 600, y: 350 },
      data: { label: '✂️ Extractive Compression\n"Key phrase selection:\n• Direct extraction\n• Original wording\n• Sentence compilation\n• LLMChainExtractor"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Abstractive compression
    {
      id: 'abstractive-compression',
      position: { x: 750, y: 500 },
      data: { label: '✍️ Abstractive Compression\n"Rephrasing approach:\n• New phrase generation\n• Coherent narrative\n• Semantic preservation\n• Style adaptation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Contextual compression retriever
    {
      id: 'contextual-compression-retriever',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Contextual Compression\n"Query-aware filtering:\n• Document compressor\n• Base retriever wrapper\n• Relevance extraction\n• Dynamic compression"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Embeddings filter
    {
      id: 'embeddings-filter',
      position: { x: 200, y: 800 },
      data: { label: '🔢 Embeddings Filter\n"Similarity-based:\n• Fast filtering\n• Cosine similarity\n• Threshold cutoff\n• No LLM calls"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Document pipeline
    {
      id: 'document-pipeline',
      position: { x: 600, y: 800 },
      data: { label: '⚙️ Document Pipeline\n"Sequential processing:\n• Text splitting\n• Redundancy removal\n• Relevance filtering\n• Reranking"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Token pruning
    {
      id: 'token-pruning',
      position: { x: 200, y: 950 },
      data: { label: '✂️ Token Pruning\n"Selective removal:\n• Importance scoring\n• Attention weights\n• Redundancy detection\n• Preserve key tokens"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Cohere rerank
    {
      id: 'cohere-rerank',
      position: { x: 600, y: 950 },
      data: { label: '🏆 Cohere Rerank\n"Advanced reordering:\n• Cross-encoder scoring\n• Listwise ranking\n• API-based\n• High precision"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Compression metrics
    {
      id: 'compression-metrics',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Performance Metrics\n"Compression results:\n• 1.4x-2.6x speedup\n• 20x compression possible\n• 21.4% accuracy gain\n• 94% cost reduction"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core compression principle
    {
      id: 'compression-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Compression Principle\n"Natural language redundancy enables aggressive compression\nQuery-aware filtering preserves task-specific information\nMulti-stage pipelines balance speed with accuracy"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'compression-challenge',
      target: 'compression-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements approaches
    {
      id: 'e2',
      source: 'compression-framework',
      target: 'llmlingua-approach',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'compression-framework',
      target: 'extractive-compression',
      ...edgeStyle,
      label: 'applies'
    },
    {
      id: 'e4',
      source: 'compression-framework',
      target: 'contextual-compression-retriever',
      ...edgeStyle,
      label: 'utilizes'
    },

    // LLMLingua variants
    {
      id: 'e5',
      source: 'llmlingua-approach',
      target: 'longllmlingua',
      ...edgeStyle,
      label: 'extends to'
    },

    // Compression types
    {
      id: 'e6',
      source: 'extractive-compression',
      target: 'abstractive-compression',
      ...edgeStyle,
      label: 'complements'
    },

    // Contextual compression components
    {
      id: 'e7',
      source: 'contextual-compression-retriever',
      target: 'embeddings-filter',
      ...edgeStyle,
      label: 'uses'
    },
    {
      id: 'e8',
      source: 'contextual-compression-retriever',
      target: 'document-pipeline',
      ...edgeStyle,
      label: 'orchestrates'
    },

    // Pipeline connections
    {
      id: 'e9',
      source: 'embeddings-filter',
      target: 'token-pruning',
      ...edgeStyle,
      label: 'combines with'
    },
    {
      id: 'e10',
      source: 'document-pipeline',
      target: 'cohere-rerank',
      ...edgeStyle,
      label: 'integrates'
    },

    // Technical flows
    {
      id: 'e11',
      source: 'longllmlingua',
      target: 'token-pruning',
      ...edgeStyle,
      label: 'performs'
    },
    {
      id: 'e12',
      source: 'abstractive-compression',
      target: 'document-pipeline',
      ...edgeStyle,
      label: 'feeds into'
    },

    // Metrics collection
    {
      id: 'e13',
      source: 'token-pruning',
      target: 'compression-metrics',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e14',
      source: 'cohere-rerank',
      target: 'compression-metrics',
      ...edgeStyle,
      label: 'contributes to'
    },

    // Metrics validate principle
    {
      id: 'e15',
      source: 'compression-metrics',
      target: 'compression-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Compression Challenge",
      description: "How can we dramatically reduce context size to lower computational costs and latency while preserving critical information needed for accurate LLM responses?",
      activeNodes: ['compression-challenge'],
      activeEdges: []
    },
    {
      title: "Compression Framework Overview",
      description: "Multi-technique framework addresses challenge through token classification for granular control, document filtering for relevance, summarization for condensation, and embeddings reduction for efficiency.",
      activeNodes: ['compression-framework'],
      activeEdges: ['e1']
    },
    {
      title: "LLMLingua Token-Level Compression",
      description: "LLMLingua achieves 20x compression with minimal loss using bidirectional context and token classification, while LongLLMLingua extends this for long contexts achieving 17.1% performance gains with 94% cost reduction.",
      activeNodes: ['llmlingua-approach', 'longllmlingua'],
      activeEdges: ['e2', 'e5']
    },
    {
      title: "Extractive vs Abstractive Compression",
      description: "Extractive compression selects key phrases maintaining original wording using LLMChainExtractor, while abstractive compression generates new coherent narratives preserving semantics with style adaptation.",
      activeNodes: ['extractive-compression', 'abstractive-compression'],
      activeEdges: ['e3', 'e6']
    },
    {
      title: "Contextual Compression and Filtering",
      description: "Query-aware contextual compression wraps retrievers with document compressors for dynamic filtering, using embeddings filters for fast similarity-based selection without expensive LLM calls.",
      activeNodes: ['contextual-compression-retriever', 'embeddings-filter', 'document-pipeline'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Advanced Techniques and Performance",
      description: "Token pruning with importance scoring combines with Cohere reranking for high precision, achieving 1.4x-2.6x speedup, 21.4% accuracy gains, proving natural language redundancy enables aggressive compression while multi-stage pipelines balance speed with accuracy.",
      activeNodes: ['token-pruning', 'cohere-rerank', 'compression-metrics', 'compression-principle'],
      activeEdges: ['e9', 'e10', 'e11', 'e12', 'e13', 'e14', 'e15']
    }
  ]
};