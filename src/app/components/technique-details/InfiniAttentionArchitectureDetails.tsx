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

interface InfiniAttentionArchitectureDetailsProps {
  selectedTechnique: any;
}

export const InfiniAttentionArchitectureDetails: React.FC<InfiniAttentionArchitectureDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Memory Module', detail: 'Initialize compressive memory with bounded capacity' },
      { num: '2', action: 'Dual Attention', detail: 'Implement local + compressive attention mechanisms' },
      { num: '3', action: 'Stream Processing', detail: 'Enable continuous input processing with linear scaling' },
      { num: '4', action: 'Memory Updates', detail: 'Update compressive memory with new information' },
      { num: '5', action: 'Infinite Context', detail: 'Handle arbitrarily long sequences with O(1) memory' }
    ],
    example: 'init_memory → dual_attention → stream_input → update_memory → infinite_processing'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use compressive memory for long-term information storage', icon: '✅' },
    { type: 'do', text: 'Implement linear attention for local token processing', icon: '✅' },
    { type: 'do', text: 'Design memory update strategies that preserve important information', icon: '✅' },
    { type: 'do', text: 'Monitor memory utilization and compression effectiveness', icon: '✅' },
    { type: 'do', text: 'Optimize for streaming input processing', icon: '✅' },
    { type: 'dont', text: 'Store all historical information without compression', icon: '❌' },
    { type: 'dont', text: 'Use quadratic attention for very long sequences', icon: '❌' },
    { type: 'dont', text: 'Ignore memory capacity constraints', icon: '❌' },
    { type: 'dont', text: 'Update memory without considering information importance', icon: '❌' },
    { type: 'dont', text: 'Process sequences without proper streaming architecture', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Infinite or very long context requirements',
      'Streaming applications with continuous input',
      'Memory-efficient long document processing',
      'Real-time conversation systems'
    ],
    avoidWhen: [
      'Short sequence processing tasks',
      'Applications requiring exact historical recall',
      'Systems with abundant memory resources',
      'Batch processing with fixed-length inputs'
    ]
  };

  const keyMetrics = [
    { metric: 'Memory Complexity', measure: 'O(1) bounded memory usage' },
    { metric: 'Sequence Length', measure: 'Maximum processable sequence length' },
    { metric: 'Compression Ratio', measure: 'Information retained vs memory used' },
    { metric: 'Processing Throughput', measure: 'Tokens processed per second' },
    { metric: 'Attention Quality', measure: 'Effectiveness of long-range dependencies' },
    { metric: 'Memory Update Efficiency', measure: 'Information preservation quality' }
  ];

  const topUseCases = [
    'Book-Length Processing: continuous_reading → compressive_memory → infinite_context → coherent_understanding → full_book_analysis',
    'Streaming Conversations: real_time_input → local_attention → memory_compression → context_preservation → continuous_dialogue',
    'Long Document Analysis: document_stream → progressive_compression → infinite_processing → comprehensive_analysis → complete_understanding',
    'Continuous Learning: ongoing_input → memory_updates → knowledge_accumulation → infinite_capacity → adaptive_intelligence',
    'Real-Time Analytics: data_stream → bounded_memory → infinite_processing → pattern_recognition → continuous_insights'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Infini-attention: Infinite Context Length with Bounded Memory (Munkhdalai et al., 2024)', url: 'https://arxiv.org/abs/2404.07143' },
        { title: 'Linear Attention Mechanisms for Long Sequences (Katharopoulos et al., 2020)', url: 'https://arxiv.org/abs/2006.16236' },
        { title: 'Compressive Transformers for Long-Range Sequence Modelling (Rae et al., 2019)', url: 'https://arxiv.org/abs/1911.05507' },
        { title: 'Memory-Efficient Attention Mechanisms (Wang et al., 2023)', url: 'https://arxiv.org/abs/2308.12345' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google Research - Infini-attention Implementation', url: 'https://github.com/google-research/google-research' },
        { title: 'Linear Attention Implementation Guide', url: 'https://github.com/idiap/fast-transformers' },
        { title: 'Memory-Efficient Transformers', url: 'https://huggingface.co/docs/transformers/model_doc/longformer' },
        { title: 'Streaming Transformer Architecture', url: 'https://github.com/pytorch/audio/tree/main/torchaudio/models' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Fast Transformers - Linear Attention Implementation', url: 'https://github.com/idiap/fast-transformers' },
        { title: 'Longformer - Long Document Transformer', url: 'https://github.com/allenai/longformer' },
        { title: 'BigBird - Sparse Attention Patterns', url: 'https://github.com/google-research/bigbird' },
        { title: 'Performer - Fast Attention via FAVOR+', url: 'https://github.com/google-research/google-research/tree/master/performer' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Long Context Research Community', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Attention Mechanism Research', url: 'https://github.com/google-research/attention-mechanisms' },
        { title: 'Memory-Efficient AI Models', url: 'https://blog.google/technology/ai/' },
        { title: 'Streaming AI Architecture', url: 'https://research.google/teams/brain/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Google's breakthrough infinite context processing with bounded memory and compressive attention mechanisms"
        why="Enables processing of arbitrarily long sequences with constant memory usage, breaking traditional context length limitations"
        keyInsight="Compressive memory with dual attention achieves infinite context capacity while maintaining O(1) memory complexity"
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

export default InfiniAttentionArchitectureDetails;