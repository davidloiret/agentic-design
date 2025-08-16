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

interface SequentialChainingDetailsProps {
  selectedTechnique: any;
}

export const SequentialChainingDetails: React.FC<SequentialChainingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decompose', detail: 'Break task into focused stages' },
      { num: '2', action: 'Define I/O', detail: 'JSON schemas for each stage' },
      { num: '3', action: 'Chain', detail: 'Output[N] → Input[N+1]' },
      { num: '4', action: 'Validate', detail: 'Assert & retry at each step' },
      { num: '5', action: 'Monitor', detail: 'Log latency, cost, errors' }
    ],
    example: 'analyze_doc → extract_data → validate → transform → summarize'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use JSON/structured outputs between stages', icon: '✅' },
    { type: 'do', text: 'Cache deterministic stage outputs (huge cost savings)', icon: '✅' },
    { type: 'do', text: 'Use cache keys based on input hash + prompt version', icon: '✅' },
    { type: 'do', text: 'Implement circuit breakers & retries', icon: '✅' },
    { type: 'do', text: 'Set TTL for cached steps based on data freshness needs', icon: '✅' },
    { type: 'dont', text: 'Pass verbose prose between stages', icon: '❌' },
    { type: 'dont', text: 'Cache non-deterministic or time-sensitive steps', icon: '❌' },
    { type: 'dont', text: 'Skip cache invalidation on prompt changes', icon: '❌' },
    { type: 'dont', text: 'Ignore partial outputs/refusals', icon: '❌' },
    { type: 'dont', text: 'Let errors cascade unchecked', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multi-step workflows (3+ stages)',
      'Complex reasoning tasks',
      'Need error isolation',
      'Different models per stage'
    ],
    avoidWhen: [
      'Simple single-step tasks',
      'Real-time/low-latency needs',
      'Tightly coupled logic',
      'Limited API budget'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Success Rate', measure: 'Per-stage & E2E completion' },
    { metric: 'Latency', measure: 'P50/P95 per stage' },
    { metric: 'Cost', measure: 'Σ(tokens × model_rate)' },
    { metric: 'Error Recovery', measure: '% failures handled' },
    { metric: 'Cache Hit Rate', measure: '% reused computations' },
    { metric: 'Cost Savings', measure: '$ saved via caching' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Document Analysis: parse → extract → analyze → summarize (cache parsing)',
    'Content Creation: research → outline → draft → edit (cache research)',
    'Data Pipeline: validate → transform → enrich → aggregate (cache transforms)',
    'Decision Flow: gather → evaluate → score → recommend (cache gathering)',
    'Report Generation: fetch → process → format → deliver (cache all but delivery)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Prompt Chaining - Survey of Prompt Engineering Methods (2024)', url: 'https://arxiv.org/abs/2402.07927' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Sequential Chains Documentation', url: 'https://python.langchain.com/api_reference/langchain/chains/langchain.chains.sequential.SequentialChain.html' },
        { title: 'OpenAI Structured Outputs and Prompt Engineering', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
        { title: 'Anthropic Claude Chain Complex Prompts Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts' },
        { title: 'LangChain Expression Language (LCEL) - Modern Chaining', url: 'https://python.langchain.com/docs/how_to/sequence/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Python - SequentialChain Implementation', url: 'https://github.com/langchain-ai/langchain/tree/master/libs/langchain/langchain/chains' },
        { title: 'LlamaIndex Sequential Query Pipelines', url: 'https://docs.llamaindex.ai/en/stable/module_guides/querying/pipeline/' },
        { title: 'Haystack Pipeline Components', url: 'https://docs.haystack.deepset.ai/docs/pipelines' },
        { title: 'LangGraph - Stateful Multi-Actor Applications', url: 'https://langchain-ai.github.io/langgraph/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Prompt Engineering', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'Anthropic Discord - Claude Developers', url: 'https://discord.gg/anthropic' },
        { title: 'Prompt Engineering Guide - Chaining Techniques', url: 'https://www.promptingguide.ai/techniques/prompt_chaining' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Break complex tasks into linear pipeline of focused steps"
        why="Reduces model cognitive load, isolates errors, enables tool integration & step caching"
        keyInsight="Output[N] → Input[N+1] with structured data (JSON) - each step cacheable"
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

export default SequentialChainingDetails;