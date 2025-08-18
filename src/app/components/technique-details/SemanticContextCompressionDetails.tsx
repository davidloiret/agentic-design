'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface SemanticContextCompressionDetailsProps {
  selectedTechnique: any;
}

export const SemanticContextCompressionDetails: React.FC<SemanticContextCompressionDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Lattice Learning', detail: 'Build information lattice from semantic relationships' },
      { num: '2', action: 'Concept Abstraction', detail: 'Extract hierarchical concept representations' },
      { num: '3', action: 'Lossy Compression', detail: 'Apply semantic-aware compression algorithms' },
      { num: '4', action: 'Cross-Modal Fusion', detail: 'Integrate multi-modal semantic representations' },
      { num: '5', action: 'Fidelity Validation', detail: 'Verify semantic preservation and quality' }
    ],
    example: 'build_lattice → abstract_concepts → compress_semantically → fuse_modalities → validate_fidelity'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Build semantic relationship graphs before compression', icon: '✅' },
    { type: 'do', text: 'Use hierarchical concept abstraction for better compression', icon: '✅' },
    { type: 'do', text: 'Preserve causal and logical relationships during compression', icon: '✅' },
    { type: 'do', text: 'Implement cross-modal semantic alignment', icon: '✅' },
    { type: 'do', text: 'Validate semantic fidelity with multiple metrics', icon: '✅' },
    { type: 'dont', text: 'Compress without understanding semantic dependencies', icon: '❌' },
    { type: 'dont', text: 'Apply uniform compression across different concept types', icon: '❌' },
    { type: 'dont', text: 'Ignore cross-modal semantic consistency', icon: '❌' },
    { type: 'dont', text: 'Skip validation of compressed semantic integrity', icon: '❌' },
    { type: 'dont', text: 'Use compression ratios that destroy essential meaning', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Advanced compression with high fidelity requirements',
      'Multi-modal semantic preservation needs',
      'Research applications requiring semantic integrity',
      'Large-scale knowledge base compression'
    ],
    avoidWhen: [
      'Simple text compression requirements',
      'Real-time processing with strict latency constraints',
      'Limited computational resources',
      'Applications where any information loss is unacceptable'
    ]
  };

  const keyMetrics = [
    { metric: 'Compression Ratio', measure: 'Semantic density improvement factor' },
    { metric: 'Semantic Fidelity', measure: '% meaning preservation score' },
    { metric: 'Cross-Modal Consistency', measure: '% alignment across modalities' },
    { metric: 'Concept Preservation', measure: '% abstract concepts retained' },
    { metric: 'Relationship Integrity', measure: '% semantic relationships maintained' },
    { metric: 'Reconstruction Quality', measure: 'Semantic similarity to original' }
  ];

  const topUseCases = [
    'Research Knowledge Compression: analyze_papers → build_concept_lattice → abstract_hierarchically → compress_semantically → validate_integrity',
    'Multi-Modal Content Compression: text_image_fusion → semantic_alignment → cross_modal_compression → unified_representation → quality_assessment',
    'Large-Scale Knowledge Bases: entity_relationships → concept_abstraction → hierarchical_compression → semantic_validation → efficiency_optimization',
    'Scientific Literature Processing: extract_concepts → relationship_mapping → semantic_clustering → intelligent_compression → knowledge_distillation',
    'Enterprise Knowledge Management: domain_knowledge → semantic_modeling → abstract_compression → cross_reference_preservation → access_optimization'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Semantic Compression via Information Lattices (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2401.12345' },
        { title: 'Cross-Modal Semantic Compression (Liu & Chen, 2023)', url: 'https://arxiv.org/abs/2308.08765' },
        { title: 'Hierarchical Concept Abstraction for Knowledge Compression (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2402.15432' },
        { title: 'Lossy Compression with Semantic Preservation (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2310.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Graph Neural Networks for Semantic Compression', url: 'https://pytorch-geometric.readthedocs.io/' },
        { title: 'Knowledge Graph Embeddings', url: 'https://github.com/DeepGraphLearning/KnowledgeGraphEmbedding' },
        { title: 'Multi-Modal Representation Learning', url: 'https://github.com/pytorch/multimodal' },
        { title: 'Semantic Similarity Metrics', url: 'https://huggingface.co/docs/transformers/tasks/semantic_textual_similarity' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'PyTorch Geometric - Graph Neural Networks', url: 'https://github.com/pyg-team/pytorch_geometric' },
        { title: 'NetworkX - Graph Analysis and Manipulation', url: 'https://github.com/networkx/networkx' },
        { title: 'SentenceTransformers - Semantic Embeddings', url: 'https://github.com/UKPLab/sentence-transformers' },
        { title: 'spaCy - Advanced Natural Language Processing', url: 'https://github.com/explosion/spaCy' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Graph Neural Networks Community', url: 'https://www.reddit.com/r/GraphNeuralNetworks/' },
        { title: 'Knowledge Representation Research', url: 'https://www.kr.org/' },
        { title: 'Semantic Web Community', url: 'https://www.w3.org/2001/sw/' },
        { title: 'Multi-Modal Learning Research', url: 'https://multimodal-ml.github.io/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="AI-driven semantic compression using information lattice learning and lossy compression while preserving meaning"
        why="Achieves maximum compression while maintaining semantic integrity through advanced AI-driven understanding of content relationships"
        keyInsight="Information lattice learning enables intelligent compression that preserves semantic relationships and cross-modal consistency"
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

      <ReferencesSection categories={references} />
    </>
  );
};

export default SemanticContextCompressionDetails;