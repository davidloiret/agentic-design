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

interface ForestOfThoughtsDetailsProps {
  selectedTechnique: any;
}

export const ForestOfThoughtsDetails: React.FC<ForestOfThoughtsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Generate Trees', detail: 'Create multiple independent reasoning trees' },
      { num: '2', action: 'Diversify', detail: 'Ensure different starting points & strategies' },
      { num: '3', action: 'Evaluate', detail: 'Score each tree for quality & validity' },
      { num: '4', action: 'Cross-Validate', detail: 'Compare solutions across trees' },
      { num: '5', action: 'Select Best', detail: 'Choose optimal path or consensus' }
    ],
    example: 'Problem → [Tree1: Strategy A, Tree2: Strategy B, Tree3: Strategy C] → Evaluate → Best Solution'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Generate trees with different starting assumptions', icon: '✅' },
    { type: 'do', text: 'Use diverse reasoning strategies per tree', icon: '✅' },
    { type: 'do', text: 'Implement robust cross-tree validation', icon: '✅' },
    { type: 'do', text: 'Set limits on forest size (typically 3-7 trees)', icon: '✅' },
    { type: 'do', text: 'Cache tree results to avoid redundant computation', icon: '✅' },
    { type: 'dont', text: 'Generate too many similar trees (redundancy)', icon: '❌' },
    { type: 'dont', text: 'Skip diversity checks between trees', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited tree generation (cost explosion)', icon: '❌' },
    { type: 'dont', text: 'Use same evaluation criteria for all trees', icon: '❌' },
    { type: 'dont', text: 'Ignore computational overhead vs single ToT', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'High-stakes decisions requiring robustness',
      'Problems with multiple valid approaches',
      'When single tree might miss solutions',
      'Complex creative problem-solving',
      'Risk-sensitive applications'
    ],
    avoidWhen: [
      'Simple problems with clear solutions',
      'Tight computational budgets',
      'Real-time/low-latency requirements',
      'When Tree-of-Thought suffices',
      'Highly constrained solution spaces'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Solution Diversity', measure: 'Unique approaches across trees' },
    { metric: 'Consensus Rate', measure: 'Agreement between tree solutions' },
    { metric: 'Error Tolerance', measure: 'Robustness to individual tree failures' },
    { metric: 'Computational Efficiency', measure: 'Quality improvement per additional tree' },
    { metric: 'Coverage Completeness', measure: 'Solution space exploration breadth' },
    { metric: 'Best Path Selection', measure: 'Accuracy of optimal tree identification' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Investment Analysis: Tree1(Technical), Tree2(Fundamental), Tree3(Sentiment) → Consensus decision',
    'Medical Diagnosis: Multiple specialist perspectives → Cross-validate symptoms → Robust conclusion',
    'Strategic Planning: Different scenario trees → Stress-test strategies → Optimal approach',
    'Research Validation: Approach problem from multiple angles → Verify findings → Reliable results',
    'Creative Design: Generate diverse concept trees → Evaluate aesthetics/function → Best design'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Graph of Thoughts: Solving Elaborate Problems with Large Language Models (Besta et al., 2023)', url: 'https://arxiv.org/abs/2308.09687' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangGraph: Multi-Agent Reasoning Workflows', url: 'https://python.langchain.com/docs/langgraph' },
        { title: 'DSPy: Programming with Language Models', url: 'https://dspy-docs.vercel.app/' },
        { title: 'OpenAI Function Calling for Multi-Path Reasoning', url: 'https://platform.openai.com/docs/guides/function-calling' },
        { title: 'Anthropic Constitutional AI Implementation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/constitutional-ai' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Multi-Agent Systems', url: 'https://python.langchain.com/docs/modules/agents/' },
        { title: 'AutoGen: Multi-Agent Conversation Framework', url: 'https://github.com/microsoft/autogen' },
        { title: 'CrewAI: Multi-Agent Orchestration', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'Guidance: Structured Generation Library', url: 'https://github.com/guidance-ai/guidance' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord - Multi-Agent Development', url: 'https://discord.gg/langchain' },
        { title: 'OpenAI Developer Forum - Advanced Reasoning', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'r/MachineLearning - Forest Reasoning Discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Anthropic Discord - Constitutional AI', url: 'https://discord.gg/anthropic' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Generate multiple independent reasoning trees to enhance diversity and robustness"
        why="Provides error tolerance, solution diversity, and cross-validation for complex problems"
        keyInsight="Multiple trees → Different strategies → Cross-validate → Robust consensus or best path"
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

export default ForestOfThoughtsDetails;