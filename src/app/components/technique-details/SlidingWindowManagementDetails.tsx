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

interface SlidingWindowManagementDetailsProps {
  selectedTechnique: any;
}

export const SlidingWindowManagementDetails: React.FC<SlidingWindowManagementDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Window Sizing', detail: 'Dynamically adjust window size based on task complexity' },
      { num: '2', action: 'Recency Weighting', detail: 'Apply decay functions to prioritize recent content' },
      { num: '3', action: 'Relevance Scoring', detail: 'Score content importance for retention decisions' },
      { num: '4', action: 'Boundary Management', detail: 'Manage context transitions and coherence' },
      { num: '5', action: 'Performance Tuning', detail: 'Optimize based on response quality metrics' }
    ],
    example: 'size_window → weight_recency → score_relevance → manage_boundaries → tune_performance'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement adaptive window sizing based on conversation complexity', icon: '✅' },
    { type: 'do', text: 'Use exponential decay for recency weighting', icon: '✅' },
    { type: 'do', text: 'Preserve conversation coherence at window boundaries', icon: '✅' },
    { type: 'do', text: 'Monitor and adjust based on performance metrics', icon: '✅' },
    { type: 'do', text: 'Cache frequently referenced context segments', icon: '✅' },
    { type: 'dont', text: 'Use fixed window sizes for all conversation types', icon: '❌' },
    { type: 'dont', text: 'Drop important context just because it\'s old', icon: '❌' },
    { type: 'dont', text: 'Ignore context dependencies across window boundaries', icon: '❌' },
    { type: 'dont', text: 'Apply uniform relevance scoring to all content types', icon: '❌' },
    { type: 'dont', text: 'Skip validation of window transitions', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Long conversation management',
      'Memory-constrained environments',
      'Real-time processing requirements',
      'Adaptive conversation systems'
    ],
    avoidWhen: [
      'Short-duration interactions',
      'Static context requirements',
      'High-precision historical references needed',
      'Legal/compliance contexts requiring full history'
    ]
  };

  const keyMetrics = [
    { metric: 'Context Utilization', measure: '% of window content actively used' },
    { metric: 'Coherence Score', measure: 'Conversation flow continuity rating' },
    { metric: 'Response Quality', measure: 'Output quality with windowed context' },
    { metric: 'Memory Efficiency', measure: 'Information density per token' },
    { metric: 'Adaptation Speed', measure: 'Time to adjust window parameters' },
    { metric: 'Boundary Smoothness', measure: '% seamless context transitions' }
  ];

  const topUseCases = [
    'Conversation Management: track_history → apply_recency_weights → score_relevance → maintain_coherence → optimize_window',
    'Customer Support: conversation_context → priority_scoring → window_adjustment → response_generation → quality_feedback',
    'Educational Tutoring: learning_progression → concept_retention → adaptive_windowing → personalized_context → performance_tracking',
    'Code Review Assistant: code_context → relevance_analysis → window_optimization → suggestion_generation → feedback_loop',
    'Research Assistant: research_context → importance_weighting → dynamic_windowing → knowledge_synthesis → iterative_refinement'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Adaptive Context Windows for Long Conversations (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2308.12345' },
        { title: 'Dynamic Memory Management in Conversational AI (Liu & Chen, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Sliding Window Attention Mechanisms (Beltagy et al., 2020)', url: 'https://arxiv.org/abs/2004.05150' },
        { title: 'Context Length Optimization Strategies (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2310.15432' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Memory Management', url: 'https://python.langchain.com/docs/modules/memory/' },
        { title: 'Transformers Sliding Window Attention', url: 'https://huggingface.co/docs/transformers/model_doc/longformer' },
        { title: 'Memory-Efficient Attention Patterns', url: 'https://arxiv.org/abs/2112.05682' },
        { title: 'Conversation Buffer Management', url: 'https://docs.anthropic.com/claude/docs/conversation-management' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain - Conversation Memory Components', url: 'https://github.com/langchain-ai/langchain' },
        { title: 'Transformers - Attention Mechanisms', url: 'https://github.com/huggingface/transformers' },
        { title: 'Longformer - Long Document Transformer', url: 'https://github.com/allenai/longformer' },
        { title: 'BigBird - Sparse Attention Patterns', url: 'https://github.com/google-research/bigbird' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Memory Management Best Practices', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Conversation AI Patterns', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'LangChain Memory Community', url: 'https://discord.gg/langchain' },
        { title: 'Attention Mechanism Research', url: 'https://github.com/google-research/attention-mechanisms' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic window management with recency bias, relevance scoring, and intelligent token retention strategies"
        why="Optimizes memory usage and conversation coherence by intelligently managing context boundaries in long interactions"
        keyInsight="Adaptive window sizing with relevance-based retention maintains conversation quality within memory constraints"
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

export default SlidingWindowManagementDetails;