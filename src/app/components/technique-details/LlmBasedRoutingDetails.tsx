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

interface LlmBasedRoutingDetailsProps {
  selectedTechnique: any;
}

export const LlmBasedRoutingDetails: React.FC<LlmBasedRoutingDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Analyze', detail: 'Prompt LLM to classify intent/category' },
      { num: '2', action: 'Extract', detail: 'Parse structured output (JSON/enum)' },
      { num: '3', action: 'Map', detail: 'Route decision → handler/agent' },
      { num: '4', action: 'Execute', detail: 'Invoke selected workflow' },
      { num: '5', action: 'Monitor', detail: 'Track routing accuracy & latency' }
    ],
    example: 'analyze_query → "category: booking" → booking_agent.invoke(query)'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use structured outputs (JSON mode) for deterministic parsing', icon: '✅' },
    { type: 'do', text: 'Provide clear examples in routing prompt', icon: '✅' },
    { type: 'do', text: 'Implement fallback routes for unclear classifications', icon: '✅' },
    { type: 'do', text: 'Cache routing decisions for identical queries', icon: '✅' },
    { type: 'do', text: 'Use temperature=0 for consistent routing', icon: '✅' },
    { type: 'dont', text: 'Rely on free-form text parsing for routing', icon: '❌' },
    { type: 'dont', text: 'Skip validation of LLM routing output', icon: '❌' },
    { type: 'dont', text: 'Use high temperature for routing decisions', icon: '❌' },
    { type: 'dont', text: 'Ignore edge cases and ambiguous inputs', icon: '❌' },
    { type: 'dont', text: 'Route without confidence thresholds', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex intent classification needed',
      'Natural language understanding required',
      'Dynamic routing rules that evolve',
      'Multi-dimensional routing criteria'
    ],
    avoidWhen: [
      'Simple keyword-based routing suffices',
      'Ultra-low latency requirements (<100ms)',
      'Deterministic routing is mandatory',
      'Cost constraints are tight'
    ]
  };

  const keyMetrics = [
    { metric: 'Routing Accuracy', measure: '% correctly routed queries' },
    { metric: 'Classification Time', measure: 'P50/P95 routing latency' },
    { metric: 'Ambiguity Rate', measure: '% queries needing clarification' },
    { metric: 'Cost per Route', measure: 'LLM tokens × price' },
    { metric: 'Fallback Rate', measure: '% routed to default handler' },
    { metric: 'Cache Hit Rate', measure: '% reused routing decisions' }
  ];

  const topUseCases = [
    'Customer Support: analyze intent → route to sales/tech/billing specialist',
    'Multi-Tool Agents: parse request → select appropriate tool/API',
    'Document Processing: classify type → apply correct parser/workflow',
    'Query Routing: understand complexity → route to fast/powerful model',
    'Workflow Selection: analyze task → choose sequential/parallel execution'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'RouteLLM: Learning to Route LLMs with Preference Data (2024)', url: 'https://arxiv.org/abs/2406.18665' },
        { title: 'Building Effective Agents - Anthropic (2024)', url: 'https://www.anthropic.com/research/building-effective-agents' },
        { title: 'A Survey on LLM-based Multi-Agent Systems (2024)', url: 'https://link.springer.com/article/10.1007/s44336-024-00009-2' },
        { title: 'Survey of Prompt Engineering Methods (2024)', url: 'https://arxiv.org/abs/2402.07927' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Routing Documentation', url: 'https://python.langchain.com/docs/how_to/routing/' },
        { title: 'OpenAI Structured Outputs for Routing', url: 'https://platform.openai.com/docs/guides/structured-outputs' },
        { title: 'Google ADK Agent Routing', url: 'https://google.github.io/adk-docs/' },
        { title: 'LangGraph Conditional Edges', url: 'https://langchain-ai.github.io/langgraph/how-tos/branching/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'RouteLLM Framework - Cost-Effective LLM Routing', url: 'https://github.com/lm-sys/RouteLLM' },
        { title: 'LangChain RunnableBranch', url: 'https://api.python.langchain.com/en/latest/runnables/langchain_core.runnables.branch.RunnableBranch.html' },
        { title: 'LlamaIndex Router Query Engine', url: 'https://docs.llamaindex.ai/en/stable/module_guides/querying/router/' },
        { title: 'Semantic Router Library', url: 'https://github.com/aurelio-labs/semantic-router' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LMSYS RouteLLM Blog Post', url: 'https://lmsys.org/blog/2024-07-01-routellm/' },
        { title: 'IBM Research - LLM Routing for Quality', url: 'https://research.ibm.com/blog/LLM-routers' },
        { title: 'LangChain Discord - Routing Discussions', url: 'https://discord.gg/langchain' },
        { title: 'Reddit r/LocalLLaMA - Routing Strategies', url: 'https://www.reddit.com/r/LocalLLaMA/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Use LLM to analyze input and determine routing path dynamically"
        why="Handles complex, nuanced routing decisions that simple rules can't capture"
        keyInsight="Prompt engineering + structured outputs = reliable intent classification"
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

export default LlmBasedRoutingDetails;