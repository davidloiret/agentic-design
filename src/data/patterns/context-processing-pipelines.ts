import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextProcessingPipelinesPattern: PatternScenario = {
  id: 'context-processing-pipelines',
  title: 'Context Processing Pipelines Pattern',
  description: 'Multi-stage RAG pipeline optimizing context through chunking, embedding, filtering, retrieval, reranking, and metadata enhancement for superior LLM performance',
  initialNodes: [
    // Context optimization challenge
    {
      id: 'context-optimization-challenge',
      position: { x: 400, y: 50 },
      data: { label: '📚 Context Optimization Challenge\n"How to provide relevant context\nto LLMs from massive datasets\nwhile managing token limits?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Context processing pipeline
    {
      id: 'context-processing-pipeline',
      position: { x: 400, y: 200 },
      data: { label: '⚙️ Context Processing Pipeline\n"Multi-stage optimization:\n• Intelligent chunking\n• Two-stage retrieval\n• Quality enhancement"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Stage 1: Data preprocessing
    {
      id: 'data-preprocessing',
      position: { x: 200, y: 350 },
      data: { label: '🔧 Data Preprocessing\n"Foundation preparation:\n• Clean formatting\n• Structure extraction\n• Metadata generation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    // Stage 2: Chunking strategies
    {
      id: 'chunking-strategies',
      position: { x: 600, y: 350 },
      data: { label: '✂️ Chunking Strategies\n"Optimal segmentation:\n• Semantic chunking\n• Recursive splitting\n• Agentic chunking"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Chunking details
    {
      id: 'chunking-details',
      position: { x: 600, y: 500 },
      data: { label: '📏 Chunk Optimization\n"Balancing factors:\n• Size: 1000-2000 tokens\n• Overlap: 10-20%\n• Semantic boundaries"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Stage 3: Embedding generation
    {
      id: 'embedding-generation',
      position: { x: 200, y: 500 },
      data: { label: '🔢 Embedding Generation\n"Vector representation:\n• Dense embeddings\n• Semantic capture\n• Similarity search enabled"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Stage 4: Two-stage retrieval
    {
      id: 'two-stage-retrieval',
      position: { x: 400, y: 650 },
      data: { label: '🎯 Two-Stage Retrieval\n"Precision enhancement:\n• Stage 1: Vector search (top-k)\n• Stage 2: Reranking\n• Optimal relevance"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Initial retrieval
    {
      id: 'initial-retrieval',
      position: { x: 200, y: 800 },
      data: { label: '🔍 Initial Retrieval\n"Fast vector search:\n• Top-50 candidates\n• Cosine similarity\n• Low latency"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },

    // Reranking stage
    {
      id: 'reranking-stage',
      position: { x: 400, y: 800 },
      data: { label: '🏆 Reranking Stage\n"Quality refinement:\n• Cross-encoder models\n• LLM-based scoring\n• Top-10 selection"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Metadata filtering
    {
      id: 'metadata-filtering',
      position: { x: 600, y: 800 },
      data: { label: '🏷️ Metadata Filtering\n"Precision targeting:\n• Date ranges\n• Source filtering\n• Category matching"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },

    // Context enhancement
    {
      id: 'context-enhancement',
      position: { x: 200, y: 950 },
      data: { label: '✨ Context Enhancement\n"Quality improvement:\n• Global document context\n• Chunk expansion\n• Semantic compression"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Final context assembly
    {
      id: 'final-context-assembly',
      position: { x: 600, y: 950 },
      data: { label: '📦 Final Context Assembly\n"Optimized output:\n• Relevance ordered\n• Token budget managed\n• Metadata enriched"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Core pipeline principle
    {
      id: 'pipeline-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Context Pipeline Principle\n"Quality retrieval outweighs model strength\nMulti-stage processing ensures precision\nOptimized context enables superior generation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Challenge addressed by pipeline
    {
      id: 'e1',
      source: 'context-optimization-challenge',
      target: 'context-processing-pipeline',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Pipeline implements preprocessing and chunking
    {
      id: 'e2',
      source: 'context-processing-pipeline',
      target: 'data-preprocessing',
      ...edgeStyle,
      label: 'starts with'
    },
    {
      id: 'e3',
      source: 'context-processing-pipeline',
      target: 'chunking-strategies',
      ...edgeStyle,
      label: 'implements'
    },

    // Preprocessing leads to embedding
    {
      id: 'e4',
      source: 'data-preprocessing',
      target: 'embedding-generation',
      ...edgeStyle,
      label: 'prepares for'
    },

    // Chunking includes details
    {
      id: 'e5',
      source: 'chunking-strategies',
      target: 'chunking-details',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Both feed into two-stage retrieval
    {
      id: 'e6',
      source: 'embedding-generation',
      target: 'two-stage-retrieval',
      ...edgeStyle,
      label: 'enables'
    },
    {
      id: 'e7',
      source: 'chunking-details',
      target: 'two-stage-retrieval',
      ...edgeStyle,
      label: 'feeds into'
    },

    // Two-stage retrieval breakdown
    {
      id: 'e8',
      source: 'two-stage-retrieval',
      target: 'initial-retrieval',
      ...edgeStyle,
      label: 'Stage 1'
    },
    {
      id: 'e9',
      source: 'two-stage-retrieval',
      target: 'reranking-stage',
      ...edgeStyle,
      label: 'Stage 2'
    },
    {
      id: 'e10',
      source: 'two-stage-retrieval',
      target: 'metadata-filtering',
      ...edgeStyle,
      label: 'applies'
    },

    // Retrieval stages flow
    {
      id: 'e11',
      source: 'initial-retrieval',
      target: 'reranking-stage',
      ...edgeStyle,
      label: 'candidates to'
    },
    {
      id: 'e12',
      source: 'metadata-filtering',
      target: 'reranking-stage',
      ...edgeStyle,
      label: 'refines'
    },

    // Enhancement and assembly
    {
      id: 'e13',
      source: 'reranking-stage',
      target: 'context-enhancement',
      ...edgeStyle,
      label: 'enhances'
    },
    {
      id: 'e14',
      source: 'context-enhancement',
      target: 'final-context-assembly',
      ...edgeStyle,
      label: 'assembles'
    },

    // Assembly demonstrates principle
    {
      id: 'e15',
      source: 'final-context-assembly',
      target: 'pipeline-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Optimization Challenge",
      description: "How can we provide the most relevant context to LLMs from massive datasets while managing token limits and maintaining semantic coherence?",
      activeNodes: ['context-optimization-challenge'],
      activeEdges: []
    },
    {
      title: "Context Processing Pipeline Introduction",
      description: "Multi-stage pipeline addresses challenge through intelligent chunking, two-stage retrieval, and quality enhancement, optimizing every aspect of context preparation.",
      activeNodes: ['context-processing-pipeline'],
      activeEdges: ['e1']
    },
    {
      title: "Data Preprocessing and Chunking Strategies",
      description: "Pipeline begins with clean formatting and structure extraction, then applies semantic chunking (1000-2000 tokens, 10-20% overlap) preserving semantic boundaries for optimal retrieval.",
      activeNodes: ['data-preprocessing', 'chunking-strategies', 'chunking-details'],
      activeEdges: ['e2', 'e3', 'e5']
    },
    {
      title: "Embedding Generation and Vector Preparation",
      description: "Preprocessed chunks converted to dense vector embeddings capturing semantic meaning, enabling fast similarity search and retrieval operations.",
      activeNodes: ['embedding-generation'],
      activeEdges: ['e4']
    },
    {
      title: "Two-Stage Retrieval System",
      description: "Precision enhancement through two stages: initial vector search retrieves top-50 candidates via cosine similarity, then reranking selects top-10 using cross-encoders or LLM scoring.",
      activeNodes: ['two-stage-retrieval', 'initial-retrieval', 'reranking-stage', 'metadata-filtering'],
      activeEdges: ['e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Context Enhancement and Final Assembly",
      description: "Selected chunks enhanced with global document context, chunk expansion, and semantic compression, then assembled into optimized output managing token budget, proving quality retrieval outweighs model strength.",
      activeNodes: ['context-enhancement', 'final-context-assembly', 'pipeline-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};