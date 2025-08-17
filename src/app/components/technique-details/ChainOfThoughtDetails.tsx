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

interface ChainOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const ChainOfThoughtDetails: React.FC<ChainOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Prompt Setup', detail: 'Add "Let\'s think step by step" trigger' },
      { num: '2', action: 'Examples', detail: 'Provide 2-3 reasoning examples' },
      { num: '3', action: 'Structure', detail: 'Number each reasoning step clearly' },
      { num: '4', action: 'Verify', detail: 'Check logical flow & calculations' },
      { num: '5', action: 'Conclude', detail: 'State final answer explicitly' }
    ],
    example: 'Problem → Step 1: [reasoning] → Step 2: [reasoning] → Answer: [result]'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use consistent step numbering (Step 1, Step 2, etc.)', icon: '✅' },
    { type: 'do', text: 'Include verification steps for calculations', icon: '✅' },
    { type: 'do', text: 'Provide diverse few-shot examples', icon: '✅' },
    { type: 'do', text: 'Break complex problems into sub-problems', icon: '✅' },
    { type: 'do', text: 'Use clear reasoning triggers ("Let\'s think...")', icon: '✅' },
    { type: 'dont', text: 'Skip intermediate steps for "obvious" calculations', icon: '❌' },
    { type: 'dont', text: 'Use CoT for simple, direct questions', icon: '❌' },
    { type: 'dont', text: 'Ignore token cost increase (2-5x overhead)', icon: '❌' },
    { type: 'dont', text: 'Make reasoning steps too verbose or redundant', icon: '❌' },
    { type: 'dont', text: 'Forget to validate logical consistency', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex mathematical problems',
      'Multi-step logical reasoning',
      'Decision-making with trade-offs',
      'Educational/explainable AI',
      'When accuracy > speed'
    ],
    avoidWhen: [
      'Simple factual questions',
      'Real-time/low-latency needs',
      'Creative/subjective tasks',
      'Tight token budgets',
      'When implicit reasoning works'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Reasoning Accuracy', measure: 'Correct final answers vs baseline' },
    { metric: 'Step Correctness', measure: 'Valid intermediate reasoning steps' },
    { metric: 'Token Efficiency', measure: 'Accuracy gain per token increase' },
    { metric: 'Interpretability', measure: 'Human rating of reasoning clarity' },
    { metric: 'Consistency Rate', measure: 'Agreement across multiple chains' },
    { metric: 'Error Attribution', measure: 'Ability to identify wrong steps' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Math Word Problems: "If a train travels 60 mph for 2 hours..." → step-by-step calculation',
    'Logic Puzzles: Multi-conditional problems requiring systematic elimination',
    'Code Debugging: Trace execution path step-by-step to find errors',
    'Financial Analysis: Break down ROI calculations with intermediate steps',
    'Medical Diagnosis: Systematic symptom analysis → differential diagnosis'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Large Language Models are Zero-Shot Reasoners (Kojima et al., 2022)', url: 'https://arxiv.org/abs/2205.11916' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Cookbook: Chain-of-Thought Prompting Techniques', url: 'https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md' },
        { title: 'Anthropic Claude Chain of Thought Best Practices', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts' },
        { title: 'Google AI: Chain-of-Thought Prompting Guide', url: 'https://ai.google.dev/docs/prompt_best_practices' },
        { title: 'Prompt Engineering Guide - CoT Techniques', url: 'https://www.promptingguide.ai/techniques/cot' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain CoT Chains Implementation', url: 'https://python.langchain.com/docs/modules/chains/' },
        { title: 'DSPy Framework for Programmatic CoT', url: 'https://dspy-docs.vercel.app/' },
        { title: 'Guidance Library for Structured Reasoning', url: 'https://github.com/guidance-ai/guidance' },
        { title: 'OpenAI API with Structured Outputs for CoT', url: 'https://platform.openai.com/docs/guides/structured-outputs' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Prompt Engineering', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Chain of Thought discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Anthropic Discord - Claude Developers', url: 'https://discord.gg/anthropic' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Generate explicit step-by-step reasoning before final answer"
        why="Makes reasoning transparent, improves accuracy on complex problems, enables error detection"
        keyInsight="Add 'Let's think step by step' trigger + numbered reasoning steps → 2-5x accuracy gain"
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

export default ChainOfThoughtDetails;