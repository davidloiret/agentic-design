import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const semanticContextCompressionPattern: PatternScenario = {
  id: 'semantic-context-compression',
  title: 'Semantic Context Compression Pattern',
  description: 'Meaning-preserving compression using semantic chunking, similarity clustering, and discourse segmentation achieving 6-8x compression while maintaining semantic fidelity',
  initialNodes: [
    // Semantic compression challenge
    {
      id: 'semantic-compression-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🧩 Semantic Compression Challenge\n"How to compress context 6-8x\nwhile preserving semantic meaning\nand discourse coherence?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // Semantic compression framework
    {
      id: 'semantic-compression-framework',
      position: { x: 400, y: 200 },
      data: { label: '🎯 Semantic Compression Framework\n"Meaning-based reduction:\n• Semantic chunking\n• Similarity clustering\n• Topic segmentation\n• Information density"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 290 },
    },

    // Semantic chunking
    {
      id: 'semantic-chunking',
      position: { x: 200, y: 350 },
      data: { label: '🗺️ Semantic Chunking\n"Meaning units:\n• Sentence embeddings\n• Cosine similarity\n• Breakpoint detection\n• Coherent segments"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // Late chunking technique
    {
      id: 'late-chunking',
      position: { x: 50, y: 500 },
      data: { label: '🕰️ Late Chunking\n"Context-aware splitting:\n• 8192 token windows\n• Paragraph-sized chunks\n• Long-context models\n• Optimal sizing"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Similarity clustering
    {
      id: 'similarity-clustering',
      position: { x: 600, y: 350 },
      data: { label: '🌐 Similarity Clustering\n"Topic detection:\n• Graph-based clustering\n• Spectral clustering\n• Agglomerative methods\n• Centroid selection"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 },
    },

    // ChunkKV approach
    {
      id: 'chunkkv-approach',
      position: { x: 750, y: 500 },
      data: { label: '📦 ChunkKV Method\n"Semantic preservation:\n• Group tokens as units\n• Preserve/discard whole\n• Lower L1 loss\n• Better attention patterns"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Discourse segmentation
    {
      id: 'discourse-segmentation',
      position: { x: 400, y: 650 },
      data: { label: '📜 Discourse Segmentation\n"Hierarchical structure:\n• Topic boundaries\n• Clique detection\n• Sequential topics\n• Coherent themes"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 260 },
    },

    // Information density
    {
      id: 'information-density',
      position: { x: 200, y: 800 },
      data: { label: '📏 Information Density\n"Compression metrics:\n• 6:1 compression ratio\n• 6x semantic density\n• SrCr metric\n• ERE/SRE scores"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Meaning preservation
    {
      id: 'meaning-preservation',
      position: { x: 600, y: 800 },
      data: { label: '🔒 Meaning Preservation\n"Semantic fidelity:\n• Key information retained\n• Intent preservation\n• Context relationships\n• Reasoning capability"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Recursive chunking
    {
      id: 'recursive-chunking',
      position: { x: 200, y: 950 },
      data: { label: '🔁 Recursive Chunking\n"Optimal splitting:\n• 30-50% better precision\n• 10-20% overlap\n• Decision-critical context\n• Adaptive boundaries"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },

    // Embedding optimization
    {
      id: 'embedding-optimization',
      position: { x: 600, y: 950 },
      data: { label: '🎯 Embedding Optimization\n"Vector quality:\n• MiniLM/SBERT models\n• Normalized embeddings\n• Context windows\n• CLIP for multimodal"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Performance results
    {
      id: 'performance-results',
      position: { x: 400, y: 1100 },
      data: { label: '📊 Performance Results\n"Compression achievements:\n• 6-8x text reduction\n• 94% meaning retained\n• 2x retrieval precision\n• Lower inference cost"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Core semantic principle
    {
      id: 'semantic-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Semantic Compression Principle\n"Meaning-aware compression outperforms naive truncation\nSemantic boundaries preserve discourse coherence\nInformation density optimization enables extreme compression"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'semantic-compression-challenge',
      target: 'semantic-compression-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements techniques
    {
      id: 'e2',
      source: 'semantic-compression-framework',
      target: 'semantic-chunking',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'semantic-compression-framework',
      target: 'similarity-clustering',
      ...edgeStyle,
      label: 'applies'
    },
    {
      id: 'e4',
      source: 'semantic-compression-framework',
      target: 'discourse-segmentation',
      ...edgeStyle,
      label: 'utilizes'
    },

    // Chunking techniques
    {
      id: 'e5',
      source: 'semantic-chunking',
      target: 'late-chunking',
      ...edgeStyle,
      label: 'advances to'
    },

    // Clustering approaches
    {
      id: 'e6',
      source: 'similarity-clustering',
      target: 'chunkkv-approach',
      ...edgeStyle,
      label: 'enables'
    },

    // Segmentation connections
    {
      id: 'e7',
      source: 'discourse-segmentation',
      target: 'information-density',
      ...edgeStyle,
      label: 'optimizes'
    },
    {
      id: 'e8',
      source: 'discourse-segmentation',
      target: 'meaning-preservation',
      ...edgeStyle,
      label: 'maintains'
    },

    // Advanced techniques
    {
      id: 'e9',
      source: 'late-chunking',
      target: 'recursive-chunking',
      ...edgeStyle,
      label: 'combines with'
    },
    {
      id: 'e10',
      source: 'chunkkv-approach',
      target: 'embedding-optimization',
      ...edgeStyle,
      label: 'enhanced by'
    },

    // Preservation flows
    {
      id: 'e11',
      source: 'information-density',
      target: 'recursive-chunking',
      ...edgeStyle,
      label: 'guides'
    },
    {
      id: 'e12',
      source: 'meaning-preservation',
      target: 'embedding-optimization',
      ...edgeStyle,
      label: 'requires'
    },

    // Performance connections
    {
      id: 'e13',
      source: 'recursive-chunking',
      target: 'performance-results',
      ...edgeStyle,
      label: 'achieves'
    },
    {
      id: 'e14',
      source: 'embedding-optimization',
      target: 'performance-results',
      ...edgeStyle,
      label: 'contributes to'
    },

    // Results validate principle
    {
      id: 'e15',
      source: 'performance-results',
      target: 'semantic-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Semantic Compression Challenge",
      description: "How can we compress context 6-8x while preserving semantic meaning, discourse coherence, and the information necessary for complex reasoning tasks?",
      activeNodes: ['semantic-compression-challenge'],
      activeEdges: []
    },
    {
      title: "Semantic Compression Framework",
      description: "Meaning-based reduction framework addresses challenge through semantic chunking for coherent units, similarity clustering for topic detection, and discourse segmentation maintaining information density.",
      activeNodes: ['semantic-compression-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Semantic Chunking and Clustering",
      description: "Semantic chunking uses sentence embeddings and cosine similarity for breakpoint detection, while similarity clustering applies graph-based and spectral methods for topic detection and centroid selection.",
      activeNodes: ['semantic-chunking', 'late-chunking', 'similarity-clustering', 'chunkkv-approach'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Discourse Segmentation and Preservation",
      description: "Hierarchical discourse segmentation identifies topic boundaries through clique detection maintaining coherent themes, optimizing information density to 6x semantic density while preserving key information and intent.",
      activeNodes: ['discourse-segmentation', 'information-density', 'meaning-preservation'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Advanced Optimization Techniques",
      description: "Recursive chunking with 10-20% overlap achieves 30-50% better precision, while embedding optimization using MiniLM/SBERT models with normalized vectors ensures quality representations.",
      activeNodes: ['recursive-chunking', 'embedding-optimization'],
      activeEdges: ['e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Performance Results and Validation",
      description: "Achieves 6-8x text reduction with 94% meaning retention and 2x retrieval precision, proving meaning-aware compression with semantic boundaries outperforms naive truncation while enabling extreme compression.",
      activeNodes: ['performance-results', 'semantic-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};