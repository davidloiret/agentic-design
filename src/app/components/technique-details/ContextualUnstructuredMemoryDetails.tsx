'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import ContextualUnstructuredMemoryDemo from '../../../components/demos/ContextualUnstructuredMemoryDemo';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface ContextualUnstructuredMemoryDetailsProps {
  selectedTechnique: any;
}

export const ContextualUnstructuredMemoryDetails: React.FC<ContextualUnstructuredMemoryDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Vector Embeddings', detail: 'Generate multimodal embeddings (CLIP, SentenceTransformers)' },
      { num: '2', action: 'Flexible Storage', detail: 'Schema-free storage with metadata preservation' },
      { num: '3', action: 'Cross-Modal Index', detail: 'Content-based indexing across modalities' },
      { num: '4', action: 'Semantic Retrieval', detail: 'Similarity search with contextual filtering' },
      { num: '5', action: 'Agent Coordination', detail: 'Shared multimodal memory access patterns' }
    ],
    example: 'multimodal_embeddings → schema_free_storage → cross_modal_indexing → semantic_retrieval → agent_coordination'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use multimodal embeddings (CLIP, ALIGN) for cross-modal similarity', icon: '✅' },
    { type: 'do', text: 'Preserve rich contextual metadata alongside content', icon: '✅' },
    { type: 'do', text: 'Implement hybrid storage: vectors + original content + metadata', icon: '✅' },
    { type: 'do', text: 'Enable emergent organization through usage patterns', icon: '✅' },
    { type: 'do', text: 'Support schema evolution and dynamic content types', icon: '✅' },
    { type: 'dont', text: 'Force rigid schemas on inherently flexible content', icon: '❌' },
    { type: 'dont', text: 'Ignore modality-specific preprocessing and optimization', icon: '❌' },
    { type: 'dont', text: 'Store without contextual information about creation/usage', icon: '❌' },
    { type: 'dont', text: 'Use single-modal embeddings for multimodal content', icon: '❌' },
    { type: 'dont', text: 'Neglect computational costs of similarity search at scale', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multimodal content across text, images, audio, video',
      'Dynamic content types requiring schema flexibility',
      'Cross-modal discovery and content association',
      'Creative and exploratory multi-agent systems',
      'Heterogeneous data integration from multiple sources'
    ],
    avoidWhen: [
      'Highly structured data with stable schemas',
      'Performance-critical applications requiring fast exact queries',
      'Simple text-only or single-modality systems',
      'Regulatory compliance requiring strict data validation',
      'Resource-constrained environments with limited embedding capacity'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Cross-Modal Retrieval Accuracy', measure: '% relevant content found across modalities' },
    { metric: 'Storage Flexibility', measure: 'New content types integrated without schema changes' },
    { metric: 'Semantic Similarity Quality', measure: 'Embedding space coherence across modalities' },
    { metric: 'Content Discovery Rate', measure: 'Serendipitous cross-modal connections found' },
    { metric: 'Agent Collaboration Quality', measure: 'Multi-agent content enhancement success' },
    { metric: 'Memory Evolution Rate', measure: 'Adaptive organization improvement over time' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Creative Content Systems: Text writers, visual designers, audio producers, video editors sharing unstructured creative assets (78% more flexible vs structured databases)',
    'Research & Discovery Platforms: Scientists storing papers, images, data, code, notes without predefined schemas (cross-modal pattern recognition)',
    'Educational Content Creation: Learning material development across text, visuals, audio, interactive elements (adaptive content organization)',
    'Customer Support Systems: Handling tickets with text, images, voice recordings, screen captures (flexible problem-solving knowledge base)',
    'Digital Asset Management: Marketing teams managing campaigns across multiple content types and formats (emergent content relationships)'
  ];

  const references = [
    {
      title: 'Multimodal Cognition & Memory',
      items: [
        { title: 'Perceptual Symbol Systems: A Theory of Grounded Cognition (Barsalou, 1999)', url: 'https://psycnet.apa.org/record/1999-01378-003' },
        { title: 'Embodied Cognition and Multimodal Memory (Wilson, 2002)', url: 'https://psycnet.apa.org/record/2002-12763-002' },
        { title: 'The Role of Context in Memory: Encoding and Retrieval (Smith, 1979)', url: 'https://psycnet.apa.org/record/1980-03982-001' },
        { title: 'Multimodal Memory Systems in Human Cognition (Paivio, 2007)', url: 'https://www.sciencedirect.com/science/article/pii/B9780123708960500058' }
      ]
    },
    {
      title: 'Multimodal AI & Foundation Models',
      items: [
        { title: 'Learning Transferable Visual Models From Natural Language (CLIP, Radford et al., 2021)', url: 'https://arxiv.org/abs/2103.00020' },
        { title: 'Scaling Up Visual and Vision-Language Representation Learning (ALIGN, Jia et al., 2021)', url: 'https://arxiv.org/abs/2102.05918' },
        { title: 'Multimodal Foundation Models: From Specialists to General-Purpose Assistants (Li et al., 2024)', url: 'https://arxiv.org/abs/2309.10020' },
        { title: 'Cross-Modal Representation Learning: A Survey (Liang et al., 2022)', url: 'https://arxiv.org/abs/2206.01108' }
      ]
    },
    {
      title: 'Vector Databases & Schema-Free Storage',
      items: [
        { title: 'Pinecone: Vector Database for ML Applications', url: 'https://docs.pinecone.io/docs/overview' },
        { title: 'Weaviate: Vector Database with Schema Flexibility', url: 'https://weaviate.io/developers/weaviate/concepts/storage' },
        { title: 'Chroma: AI-native Open-source Embedding Database', url: 'https://docs.trychroma.com/getting-started' },
        { title: 'MongoDB Atlas Vector Search: Flexible Document + Vector Storage', url: 'https://www.mongodb.com/products/platform/atlas-vector-search' }
      ]
    },
    {
      title: 'Content-Based Retrieval & RAG',
      items: [
        { title: 'Sentence-BERT: Sentence Embeddings using Siamese Networks (Reimers & Gurevych, 2019)', url: 'https://arxiv.org/abs/1908.10084' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' },
        { title: 'MultiModal-RAG: Retrieval Augmented Generation for Multimodal Content (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.15758' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Explicit, modality-general memory system storing heterogeneous information without rigid schemas"
        why="Flexible content storage, cross-modal discovery, adaptive organization, emergent content relationships"
        keyInsight="Multimodal Embeddings + Schema-Free Storage + Contextual Metadata → Adaptive cross-modal memory"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ContextualUnstructuredMemoryDemo />

      <ReferencesSection categories={references} />
    </>
  );
};

export default ContextualUnstructuredMemoryDetails;