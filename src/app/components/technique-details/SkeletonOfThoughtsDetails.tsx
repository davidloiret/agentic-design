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

interface SkeletonOfThoughtsDetailsProps {
  selectedTechnique: any;
}

export const SkeletonOfThoughtsDetails: React.FC<SkeletonOfThoughtsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Skeleton Generation', detail: 'Create high-level structure with key points' },
      { num: '2', action: 'Parallel Expansion', detail: 'Develop each skeleton point independently' },
      { num: '3', action: 'Content Integration', detail: 'Combine expanded sections into coherent whole' },
      { num: '4', action: 'Consistency Check', detail: 'Ensure logical flow and coherence' },
      { num: '5', action: 'Final Synthesis', detail: 'Polish and refine complete response' }
    ],
    example: 'Problem → [Point 1, Point 2, Point 3] → Expand each in parallel → Integrate → Final answer'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Create comprehensive skeleton covering all key aspects', icon: '✅' },
    { type: 'do', text: 'Ensure skeleton points are logically ordered', icon: '✅' },
    { type: 'do', text: 'Use parallel processing to expand multiple points', icon: '✅' },
    { type: 'do', text: 'Maintain consistency across parallel expansions', icon: '✅' },
    { type: 'do', text: 'Validate final integration for coherence', icon: '✅' },
    { type: 'dont', text: 'Create skeleton without clear logical structure', icon: '❌' },
    { type: 'dont', text: 'Expand points sequentially when parallel is possible', icon: '❌' },
    { type: 'dont', text: 'Ignore contradictions between parallel sections', icon: '❌' },
    { type: 'dont', text: 'Skip integration step (fragmented response)', icon: '❌' },
    { type: 'dont', text: 'Over-decompose into trivial skeleton points', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-part responses or analyses',
      'When parallel processing can accelerate reasoning',
      'Structured writing or presentation tasks',
      'Problems with independent sub-components',
      'When consistency across sections is crucial'
    ],
    avoidWhen: [
      'Simple, single-concept questions',
      'Highly sequential reasoning tasks',
      'When parallel processing is not beneficial',
      'Real-time applications requiring immediate response',
      'Problems requiring deep, interconnected reasoning'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Skeleton Completeness', measure: 'Coverage of all essential aspects in structure' },
    { metric: 'Parallel Efficiency', measure: 'Speed improvement from concurrent expansion' },
    { metric: 'Integration Quality', measure: 'Coherence and flow of combined sections' },
    { metric: 'Consistency Score', measure: 'Logical alignment across parallel developments' },
    { metric: 'Structure Clarity', measure: 'Logical organization and progression' },
    { metric: 'Response Completeness', measure: 'Thoroughness of final synthesized answer' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Essay Writing: Outline main arguments → Develop each argument in parallel → Integrate into coherent essay',
    'Technical Documentation: Structure sections → Write each section independently → Combine into manual',
    'Business Analysis: Framework components → Analyze each component → Synthesize comprehensive assessment',
    'Research Report: Key findings outline → Elaborate each finding → Integrate into cohesive report',
    'Strategic Planning: Plan components → Develop each strategy area → Combine into unified strategy'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Skeleton-of-Thought: Large Language Models Can Do Parallel Decoding (Ning et al., 2023)', url: 'https://arxiv.org/abs/2307.15337' },
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Parallel Context Windows for Large Language Models (Chen et al., 2023)', url: 'https://arxiv.org/abs/2305.09757' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Research: Skeleton-of-Thought Implementation', url: 'https://github.com/microsoft/unilm/tree/master/SoT' },
        { title: 'OpenAI Parallel Processing Techniques', url: 'https://platform.openai.com/docs/guides/production-best-practices' },
        { title: 'LangChain Parallel Chain Execution', url: 'https://python.langchain.com/docs/expression_language/how_to/parallel' },
        { title: 'Anthropic Structured Generation Patterns', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/structure-outputs' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain RunnableParallel for Concurrent Execution', url: 'https://python.langchain.com/docs/expression_language/primitives/parallel' },
        { title: 'OpenAI Batch API for Parallel Processing', url: 'https://platform.openai.com/docs/guides/batch' },
        { title: 'AsyncIO for Python Parallel Execution', url: 'https://docs.python.org/3/library/asyncio.html' },
        { title: 'Ray: Distributed Computing for Parallel LLM Tasks', url: 'https://docs.ray.io/en/latest/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Parallel Execution Patterns', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Parallel Processing', url: 'https://community.openai.com/c/api/20' },
        { title: 'r/MachineLearning - Parallel Reasoning Research', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Structured Generation', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Structured reasoning that creates a high-level skeleton then expands each component in parallel for efficient processing"
        why="Accelerates complex response generation through parallel development while maintaining logical structure and coherence"
        keyInsight="Create skeleton structure → Expand points in parallel → Integrate sections → Ensure consistency → Final synthesis"
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

export default SkeletonOfThoughtsDetails;