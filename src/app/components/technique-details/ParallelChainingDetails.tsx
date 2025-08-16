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

interface ParallelChainingDetailsProps {
  selectedTechnique: any;
}

export const ParallelChainingDetails: React.FC<ParallelChainingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Decompose', detail: 'Identify independent sub-tasks' },
      { num: '2', action: 'Design I/O', detail: 'Consistent schemas for branches' },
      { num: '3', action: 'Execute', detail: 'Run branches concurrently' },
      { num: '4', action: 'Aggregate', detail: 'Vote/merge/synthesize results' },
      { num: '5', action: 'Monitor', detail: 'Track latency, cost, agreement' }
    ],
    example: 'search_news AND search_social AND search_web → aggregate → synthesize'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use structured outputs (JSON) for consistent aggregation', icon: '✅' },
    { type: 'do', text: 'Implement timeouts and partial result handling', icon: '✅' },
    { type: 'do', text: 'Use smaller models for parallel branches, stronger for merge', icon: '✅' },
    { type: 'do', text: 'Batch requests and respect rate limits', icon: '✅' },
    { type: 'do', text: 'Cache results from deterministic branches', icon: '✅' },
    { type: 'dont', text: 'Parallelize dependent tasks', icon: '❌' },
    { type: 'dont', text: 'Ignore rate limits or burst capacity', icon: '❌' },
    { type: 'dont', text: 'Over-parallelize simple tasks', icon: '❌' },
    { type: 'dont', text: 'Skip error handling for partial failures', icon: '❌' },
    { type: 'dont', text: 'Use verbose unstructured data between stages', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multiple independent lookups (APIs, DBs)',
      'Multi-perspective analysis tasks',
      'I/O-bound operations with latency',
      'Consensus-building scenarios'
    ],
    avoidWhen: [
      'Sequential dependencies exist',
      'Simple single-step tasks',
      'Strict rate limits apply',
      'Consistency > speed requirements'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Wall-clock Speedup', measure: 'Time vs sequential baseline' },
    { metric: 'Throughput', measure: 'Tasks/minute at concurrency' },
    { metric: 'Agreement Score', measure: '% consensus among branches' },
    { metric: 'Cost Efficiency', measure: 'Total tokens × model rates' },
    { metric: 'Success Rate', measure: '% completed branches' },
    { metric: 'P95 Latency', measure: 'Tail completion time' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Multi-Source Research: news + academic + social → synthesize findings',
    'Content Generation: headline + body + image + CTA → complete email',
    'Data Validation: format + business rules + external APIs → pass/fail',
    'Creative Ideation: 3 models generate options → select best',
    'Travel Planning: flights + hotels + events + restaurants → itinerary'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'A Systematic Survey of Prompt Engineering in Large Language Models (Sahoo et al., 2024)', url: 'https://arxiv.org/abs/2402.07927' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain - How to Invoke Runnables in Parallel', url: 'https://python.langchain.com/docs/how_to/parallel/' },
        { title: 'OpenAI Batch API Documentation', url: 'https://platform.openai.com/docs/guides/batch' },
        { title: 'Anthropic Message Batches API', url: 'https://docs.anthropic.com/en/docs/build-with-claude/message-batches' },
        { title: 'Google ADK Multi-Agent Systems', url: 'https://google.github.io/adk-docs/agents/multi-agents/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain RunnableParallel Documentation', url: 'https://api.python.langchain.com/en/latest/runnables/langchain_core.runnables.base.RunnableParallel.html' },
        { title: 'Python asyncio Documentation', url: 'https://docs.python.org/3/library/asyncio.html' },
        { title: 'JavaScript Promise.all() Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all' },
        { title: 'LangGraph for Stateful Applications', url: 'https://langchain-ai.github.io/langgraph/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum', url: 'https://community.openai.com/' },
        { title: 'Anthropic Discord', url: 'https://discord.gg/anthropic' },
        { title: 'r/LocalLLaMA - Parallel Processing Discussions', url: 'https://www.reddit.com/r/LocalLLaMA/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Execute multiple independent tasks concurrently to reduce latency"
        why="Drastically reduces wall-clock time for I/O-bound operations, enables multi-perspective analysis"
        keyInsight="Fan-out independent tasks → aggregate results with voting/merging/synthesis strategies"
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

export default ParallelChainingDetails;