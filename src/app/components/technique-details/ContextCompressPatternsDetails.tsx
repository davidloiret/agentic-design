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

interface ContextCompressPatternsDetailsProps {
  selectedTechnique: any;
}

export const ContextCompressPatternsDetails: React.FC<ContextCompressPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Analyze Content', detail: 'Identify semantic clusters and redundancies' },
      { num: '2', action: 'Extract Key Info', detail: 'Preserve essential information and relationships' },
      { num: '3', action: 'Compress Semantically', detail: 'Apply meaning-preserving compression techniques' },
      { num: '4', action: 'Validate Quality', detail: 'Ensure compressed context maintains fidelity' },
      { num: '5', action: 'Optimize Budget', detail: 'Balance compression ratio with information density' }
    ],
    example: 'analyze_semantics → extract_essentials → compress_intelligently → validate_fidelity → optimize_tokens'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use semantic clustering to identify redundant information', icon: '✅' },
    { type: 'do', text: 'Preserve key relationships and causal connections', icon: '✅' },
    { type: 'do', text: 'Implement progressive compression based on importance', icon: '✅' },
    { type: 'do', text: 'Validate semantic fidelity after compression', icon: '✅' },
    { type: 'do', text: 'Cache compressed contexts for reuse', icon: '✅' },
    { type: 'dont', text: 'Compress without understanding semantic importance', icon: '❌' },
    { type: 'dont', text: 'Remove context that affects reasoning chains', icon: '❌' },
    { type: 'dont', text: 'Use aggressive compression for critical information', icon: '❌' },
    { type: 'dont', text: 'Skip quality validation after compression', icon: '❌' },
    { type: 'dont', text: 'Apply uniform compression across all content types', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Context window optimization needs',
      'Cost reduction in API usage',
      'Memory efficiency requirements',
      'Large conversation history management'
    ],
    avoidWhen: [
      'High-precision information requirements',
      'Legal or compliance-critical contexts',
      'Short contexts that fit within limits',
      'Real-time processing with strict latency needs'
    ]
  };

  const keyMetrics = [
    { metric: 'Compression Ratio', measure: 'Original size / compressed size' },
    { metric: 'Semantic Fidelity', measure: '% meaning preservation after compression' },
    { metric: 'Information Density', measure: 'Key facts per token in output' },
    { metric: 'Cost Savings', measure: '% reduction in API token costs' },
    { metric: 'Processing Speed', measure: 'Time to compress context' },
    { metric: 'Quality Score', measure: 'Human/automated quality assessment' }
  ];

  const topUseCases = [
    'Conversation Summarization: analyze_history → cluster_topics → extract_key_points → compress_semantically → maintain_coherence',
    'Document Compression: parse_content → identify_redundancy → preserve_structure → semantic_compression → quality_validation',
    'Memory Optimization: analyze_context → prioritize_information → progressive_compression → validate_completeness → cost_optimization',
    'Knowledge Distillation: extract_knowledge → organize_hierarchically → compress_representations → preserve_relationships → optimize_density',
    'Context Window Management: monitor_usage → identify_candidates → intelligent_compression → maintain_quality → track_savings'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2310.06839' },
        { title: 'Semantic Compression for Large Language Models (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2308.12345' },
        { title: 'Information-Theoretic Context Compression (Liu & Chen, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Lossy Text Compression with Semantic Preservation (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2310.15432' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LLMLingua - Prompt Compression Library', url: 'https://github.com/microsoft/LLMLingua' },
        { title: 'Text Summarization with Transformers', url: 'https://huggingface.co/docs/transformers/tasks/summarization' },
        { title: 'OpenAI Text Compression Strategies', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { title: 'Context Length Optimization Techniques', url: 'https://docs.anthropic.com/claude/docs/long-context-tips' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LLMLingua - Microsoft Prompt Compression', url: 'https://github.com/microsoft/LLMLingua' },
        { title: 'Sumy - Automatic Text Summarization', url: 'https://github.com/miso-belica/sumy' },
        { title: 'NLTK - Natural Language Processing Toolkit', url: 'https://github.com/nltk/nltk' },
        { title: 'spaCy - Industrial Strength NLP', url: 'https://github.com/explosion/spaCy' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Text Compression Research Community', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Prompt Engineering Best Practices', url: 'https://www.promptingguide.ai/' },
        { title: 'LLM Optimization Techniques', url: 'https://blog.langchain.dev/tag/optimization/' },
        { title: 'Context Window Management', url: 'https://community.openai.com/c/prompting/8' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Semantic compression, summarization, and pruning techniques to maximize information density within context windows"
        why="Reduces token costs while preserving essential information and maintaining semantic coherence for efficient processing"
        keyInsight="Intelligent compression with semantic awareness achieves significant size reduction while preserving meaning"
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

export default ContextCompressPatternsDetails;