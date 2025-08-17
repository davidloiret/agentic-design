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

interface GraphOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const GraphOfThoughtDetails: React.FC<GraphOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Graph Init', detail: 'Create nodes (thoughts) & edges (dependencies)' },
      { num: '2', action: 'Expand', detail: 'Generate successor thoughts from frontier' },
      { num: '3', action: 'Evaluate', detail: 'Score nodes/subgraphs with evaluators' },
      { num: '4', action: 'Merge', detail: 'Connect compatible paths, resolve conflicts' },
      { num: '5', action: 'Distill', detail: 'Extract coherent solution from best subgraph' }
    ],
    example: 'Problem → [Node A ← Node B → Node C] → Merge paths → Synthesize solution'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use explicit dependency tracking between thoughts', icon: '✅' },
    { type: 'do', text: 'Implement robust cycle detection & deduplication', icon: '✅' },
    { type: 'do', text: 'Design evaluators for scoring subgraphs not just nodes', icon: '✅' },
    { type: 'do', text: 'Cache intermediate results & maintain visited states', icon: '✅' },
    { type: 'do', text: 'Enable cross-path synthesis & conflict resolution', icon: '✅' },
    { type: 'dont', text: 'Allow unlimited graph expansion (combinatorial explosion)', icon: '❌' },
    { type: 'dont', text: 'Merge incompatible branches without conflict checks', icon: '❌' },
    { type: 'dont', text: 'Skip thought granularity planning (too coarse/fine)', icon: '❌' },
    { type: 'dont', text: 'Use weak evaluators that mis-rank solution paths', icon: '❌' },
    { type: 'dont', text: 'Ignore token costs from graph exploration overhead', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex problems with interdependent sub-goals',
      'Research synthesis from conflicting sources',
      'Multi-constraint optimization problems',
      'Strategic planning with trade-offs',
      'When path merging creates synergies'
    ],
    avoidWhen: [
      'Simple linear reasoning tasks',
      'Strict latency/cost constraints',
      'Domains without reliable evaluators',
      'When Tree-of-Thought suffices',
      'Real-time applications'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Solution Quality', measure: 'Accuracy vs linear/tree baselines' },
    { metric: 'Graph Efficiency', measure: 'Useful nodes / total explored nodes' },
    { metric: 'Synthesis Quality', measure: 'Coherence of merged solution paths' },
    { metric: 'Dependency Accuracy', measure: 'Correctness of thought relationships' },
    { metric: 'Exploration Cost', measure: 'Tokens per node + evaluation overhead' },
    { metric: 'Convergence Rate', measure: 'Steps to reach stable solution' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Research Analysis: Node[Theory A] ← Node[Evidence 1] → Node[Synthesis] ← Node[Theory B]',
    'Strategic Planning: Connect market analysis → product strategy → resource allocation → risk assessment',
    'System Design: Link requirements → architecture → implementation → validation with feedback loops',
    'Policy Analysis: Map stakeholder interests → regulatory constraints → implementation options → outcomes',
    'Creative Problem-Solving: Merge diverse solution approaches through cross-pollination nodes'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Graph of Thoughts: Solving Elaborate Problems with Large Language Models (Besta et al., 2023)', url: 'https://arxiv.org/abs/2308.09687' },
        { title: 'Graph-of-Thought for Complex and Dynamic Business Problems (Li, 2024)', url: 'https://arxiv.org/abs/2401.06801' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'SPCL: Graph-of-Thoughts Official Implementation', url: 'https://github.com/spcl/graph-of-thoughts' },
        { title: 'LangGraph: Graph-based LLM Workflows', url: 'https://python.langchain.com/docs/langgraph' },
        { title: 'DSPy: Programming with Language Models', url: 'https://dspy-docs.vercel.app/' },
        { title: 'NetworkX: Graph Analysis Library for Python', url: 'https://networkx.org/documentation/stable/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain/LangGraph for graph-based reasoning workflows', url: 'https://python.langchain.com/docs/langgraph' },
        { title: 'NetworkX for graph operations and algorithms', url: 'https://networkx.org/' },
        { title: 'LlamaIndex Workflows for complex reasoning pipelines', url: 'https://docs.llamaindex.ai/en/stable/module_guides/workflow/' },
        { title: 'Guardrails for structured validation and evaluation', url: 'https://github.com/guardrails-ai/guardrails' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'SPCL Graph-of-Thoughts: Issues & Discussions', url: 'https://github.com/spcl/graph-of-thoughts/issues' },
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'Hugging Face Forums: Advanced Reasoning', url: 'https://discuss.huggingface.co/' },
        { title: 'OpenAI Developer Community - Complex Reasoning', url: 'https://community.openai.com/c/prompting/8' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Non-linear reasoning network with nodes (thoughts) and edges (dependencies) enabling cross-path synthesis"
        why="Supports complex interdependent problems through backtracking, merging, and conflict resolution"
        keyInsight="Thoughts as graph nodes → Explicit dependencies → Cross-path merging → Coherent synthesis"
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

export default GraphOfThoughtDetails;