import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const multimodalRagPattern: PatternScenario = {
  id: 'multimodal-rag',
  title: 'Multimodal RAG (Multi-Source Retrieval-Augmented Generation)',
  initialNodes: [
    {
      id: 'user-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ Multimodal Query\n"Explain the surgical\nprocedure shown in\nthis medical image"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'query-analysis',
      position: { x: 400, y: 150 },
      data: { label: '🔍 Query Analysis\nDetected modalities needed:\n✓ Image analysis\n✓ Medical text\n✓ Video procedures' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'text-retrieval',
      position: { x: 100, y: 250 },
      data: { label: '📝 Text Retrieval\nMedical textbooks\nSurgical protocols\nProcedure descriptions' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'image-retrieval',
      position: { x: 300, y: 250 },
      data: { label: '🖼️ Image Retrieval\nSimilar surgical images\nAnatomical diagrams\nStep-by-step visuals' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'video-retrieval',
      position: { x: 500, y: 250 },
      data: { label: '🎥 Video Retrieval\nSurgical recordings\nProcedural videos\nEducational content' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'structured-data',
      position: { x: 700, y: 250 },
      data: { label: '📊 Structured Data\nSurgical databases\nPatient outcomes\nComplications data' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'multimodal-encoding',
      position: { x: 400, y: 350 },
      data: { label: '🔢 Multimodal Encoding\nText → embeddings\nImages → CLIP vectors\nVideo → temporal features' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'cross-modal-fusion',
      position: { x: 400, y: 450 },
      data: { label: '🔗 Cross-Modal Fusion\nAlign text descriptions\nwith visual content\n+ temporal sequences' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'relevance-ranking',
      position: { x: 400, y: 550 },
      data: { label: '📊 Relevance Ranking\nScore cross-modal\nrelevance to query\nimage + context' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'multimodal-context',
      position: { x: 400, y: 650 },
      data: { label: '🌐 Multimodal Context\nText: "Laparoscopic procedure"\nImage: Similar cases\nVideo: Key steps' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'multimodal-generation',
      position: { x: 400, y: 750 },
      data: { label: '🤖 Multimodal Generation\nGenerate text response\nreferencing visual\nand procedural context' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'final-answer',
      position: { x: 400, y: 850 },
      data: { label: '✅ Rich Multimodal Answer\n"This shows laparoscopic\nsurgery. Based on similar\ncases, typical duration\nis 45-60 minutes..."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'user-query',
      target: 'query-analysis',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2a',
      source: 'query-analysis',
      target: 'text-retrieval',
      ...edgeStyle,
      label: 'text'
    },
    {
      id: 'e2b',
      source: 'query-analysis',
      target: 'image-retrieval',
      ...edgeStyle,
      label: 'images'
    },
    {
      id: 'e2c',
      source: 'query-analysis',
      target: 'video-retrieval',
      ...edgeStyle,
      label: 'videos'
    },
    {
      id: 'e2d',
      source: 'query-analysis',
      target: 'structured-data',
      ...edgeStyle,
      label: 'data'
    },
    {
      id: 'e3a',
      source: 'text-retrieval',
      target: 'multimodal-encoding',
      ...edgeStyle,
      label: 'text docs'
    },
    {
      id: 'e3b',
      source: 'image-retrieval',
      target: 'multimodal-encoding',
      ...edgeStyle,
      label: 'images'
    },
    {
      id: 'e3c',
      source: 'video-retrieval',
      target: 'multimodal-encoding',
      ...edgeStyle,
      label: 'videos'
    },
    {
      id: 'e3d',
      source: 'structured-data',
      target: 'multimodal-encoding',
      ...edgeStyle,
      label: 'data'
    },
    {
      id: 'e4',
      source: 'multimodal-encoding',
      target: 'cross-modal-fusion',
      ...edgeStyle,
      label: 'encode'
    },
    {
      id: 'e5',
      source: 'cross-modal-fusion',
      target: 'relevance-ranking',
      ...edgeStyle,
      label: 'fuse'
    },
    {
      id: 'e6',
      source: 'relevance-ranking',
      target: 'multimodal-context',
      ...edgeStyle,
      label: 'rank'
    },
    {
      id: 'e7',
      source: 'multimodal-context',
      target: 'multimodal-generation',
      ...edgeStyle,
      label: 'contextualize'
    },
    {
      id: 'e8',
      source: 'multimodal-generation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'generate'
    },
  ],
  steps: [
    {
      title: "Multimodal Query Analysis",
      description: "Query about surgical image is analyzed to determine required modalities: medical text for procedures, similar images, instructional videos, and outcome data.",
      activeNodes: ['user-query', 'query-analysis'],
      activeEdges: ['e1']
    },
    {
      title: "Parallel Multimodal Retrieval",
      description: "System simultaneously retrieves from multiple modality-specific sources: text databases, image collections, video libraries, and structured medical data.",
      activeNodes: ['text-retrieval', 'image-retrieval', 'video-retrieval', 'structured-data'],
      activeEdges: ['e2a', 'e2b', 'e2c', 'e2d']
    },
    {
      title: "Cross-Modal Encoding & Alignment",
      description: "Different modalities encoded into compatible vector spaces: text embeddings, CLIP image vectors, video temporal features, aligned for comparison.",
      activeNodes: ['multimodal-encoding', 'cross-modal-fusion'],
      activeEdges: ['e3a', 'e3b', 'e3c', 'e3d', 'e4']
    },
    {
      title: "Multimodal Relevance Assessment",
      description: "Cross-modal relevance scoring considers how well text descriptions match visual content and procedural context from multiple sources.",
      activeNodes: ['relevance-ranking', 'multimodal-context'],
      activeEdges: ['e5', 'e6']
    },
    {
      title: "Rich Multimodal Response",
      description: "Final answer integrates insights from all modalities: textbook knowledge, visual similarity, procedural videos, and statistical outcomes data.",
      activeNodes: ['multimodal-generation', 'final-answer'],
      activeEdges: ['e7', 'e8']
    }
  ]
};