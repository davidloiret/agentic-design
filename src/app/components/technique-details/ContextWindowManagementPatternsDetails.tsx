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

interface ContextWindowManagementPatternsDetailsProps {
  selectedTechnique?: any;
}

export const ContextWindowManagementPatternsDetails: React.FC<ContextWindowManagementPatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Token Tracking', detail: 'Real-time counting of input/output tokens' },
      { num: '2', action: 'Usage Meters', detail: 'Visual progress bars showing context consumption' },
      { num: '3', action: 'Priority Controls', detail: 'Pin important messages, compress or remove others' },
      { num: '4', action: 'Smart Compression', detail: 'Summarize old conversations while preserving key info' },
      { num: '5', action: 'Auto-Management', detail: 'Proactive suggestions when approaching limits' }
    ],
    example: 'Token meter (75% full) → Warning → Pin key messages → Compress old → Continue conversation'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Show real-time token usage with clear visual indicators', icon: '✅' },
    { type: 'do', text: 'Allow users to pin critical messages and context', icon: '✅' },
    { type: 'do', text: 'Provide reversible compression and smart summarization', icon: '✅' },
    { type: 'do', text: 'Warn users before approaching token limits', icon: '✅' },
    { type: 'do', text: 'Implement sliding window management for long conversations', icon: '✅' },
    { type: 'dont', text: 'Let conversations fail without warning', icon: '❌' },
    { type: 'dont', text: 'Remove context without user awareness or control', icon: '❌' },
    { type: 'dont', text: 'Hide token consumption and usage patterns', icon: '❌' },
    { type: 'dont', text: 'Lose critical context during compression', icon: '❌' },
    { type: 'dont', text: 'Make context management too complex for users', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Long conversations and sessions',
      'Document analysis with large context',
      'Multi-turn reasoning tasks',
      'Cost-sensitive applications'
    ],
    avoidWhen: [
      'Single-turn question answering',
      'Short conversational interactions',
      'Stateless API calls',
      'Simple tool usage scenarios'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Context Efficiency', measure: '% of useful tokens vs total consumed' },
    { metric: 'Compression Ratio', measure: 'Token reduction from smart compression' },
    { metric: 'User Satisfaction', measure: 'Preference for auto vs manual context management' },
    { metric: 'Conversation Length', measure: 'Extended interactions enabled by management' },
    { metric: 'Error Prevention', measure: 'Reduction in context overflow failures' },
    { metric: 'Cost Optimization', measure: 'Token cost savings from efficient management' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Document Analysis: Manage large PDF context while maintaining conversation history',
    'Code Review: Pin critical code sections, compress older discussion threads',
    'Research Tasks: Retain key findings while processing multiple source documents',
    'Customer Support: Maintain conversation context while accessing knowledge base',
    'Creative Writing: Preserve character/plot details while developing long narratives'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Attention Is All You Need - Transformer Context Limits (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'CHI 2024: Context Management in Conversational AI Interfaces', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' },
        { title: 'Longformer: The Long-Document Transformer (Beltagy et al., 2020)', url: 'https://arxiv.org/abs/2004.05150' },
        { title: 'Memory-Efficient Transformers via Top-k Attention (Rabe & Staats, 2021)', url: 'https://arxiv.org/abs/2106.06899' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Token Counting and Management Best Practices', url: 'https://platform.openai.com/docs/guides/text-generation/managing-tokens' },
        { title: 'Anthropic Claude Context Window Optimization', url: 'https://docs.anthropic.com/en/docs/build-with-claude/token-counting' },
        { title: 'Google AI Context Management Strategies', url: 'https://ai.google.dev/gemini-api/docs/context-caching' },
        { title: 'LangChain Memory and Context Management', url: 'https://python.langchain.com/docs/modules/memory/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'tiktoken - OpenAI Token Counting Library', url: 'https://github.com/openai/tiktoken' },
        { title: 'LangChain Token Counting Utils', url: 'https://python.langchain.com/docs/modules/callbacks/token_counting' },
        { title: 'Transformers Tokenizer Library', url: 'https://huggingface.co/docs/transformers/tokenizer_summary' },
        { title: 'GPT Token Counter Web Tool', url: 'https://platform.openai.com/tokenizer' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Context Management', url: 'https://community.openai.com/c/api/20' },
        { title: 'LangChain Discord - Memory Patterns', url: 'https://discord.gg/langchain' },
        { title: 'Reddit r/MachineLearning - Context Window Discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Stack Overflow - Token Management Questions', url: 'https://stackoverflow.com/questions/tagged/openai-api+tokens' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Visual interfaces for managing LLM token limits and conversation context"
        why="Context windows have hard limits that can break conversations and waste tokens without proper management"
        keyInsight="Show token usage in real-time + let users prioritize context + auto-compress when needed"
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

export default ContextWindowManagementPatternsDetails;