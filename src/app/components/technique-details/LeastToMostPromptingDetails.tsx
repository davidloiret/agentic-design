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

interface LeastToMostPromptingDetailsProps {
  selectedTechnique: any;
}

export const LeastToMostPromptingDetails: React.FC<LeastToMostPromptingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Problem Decomposition', detail: 'Break complex problem into simpler subproblems' },
      { num: '2', action: 'Sequential Solving', detail: 'Solve subproblems from simplest to most complex' },
      { num: '3', action: 'Solution Building', detail: 'Use previous solutions to inform next steps' },
      { num: '4', action: 'Context Accumulation', detail: 'Maintain growing context of solved parts' },
      { num: '5', action: 'Final Integration', detail: 'Combine all solutions into complete answer' }
    ],
    example: 'Complex Problem → [Sub1, Sub2, Sub3] → Solve Sub1 → Use Sub1 in Sub2 → Use Sub1+Sub2 in Sub3 → Final Answer'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Decompose into truly independent subproblems first', icon: '✅' },
    { type: 'do', text: 'Solve subproblems in strict order of dependency', icon: '✅' },
    { type: 'do', text: 'Explicitly pass previous solutions to next steps', icon: '✅' },
    { type: 'do', text: 'Validate each subproblem solution before proceeding', icon: '✅' },
    { type: 'do', text: 'Use clear problem reduction prompts and examples', icon: '✅' },
    { type: 'dont', text: 'Skip the decomposition step (jump to complex reasoning)', icon: '❌' },
    { type: 'dont', text: 'Solve subproblems out of logical dependency order', icon: '❌' },
    { type: 'dont', text: 'Lose context between subproblem solving steps', icon: '❌' },
    { type: 'dont', text: 'Use when problems cannot be meaningfully decomposed', icon: '❌' },
    { type: 'dont', text: 'Over-decompose into trivial or atomic steps', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex problems with clear hierarchical structure',
      'Multi-step reasoning with dependencies',
      'Mathematical proofs and derivations',
      'Programming problems with modular solutions',
      'Compositional reasoning tasks'
    ],
    avoidWhen: [
      'Simple problems solvable in one step',
      'Highly interconnected problems without clear decomposition',
      'Real-time applications requiring immediate answers',
      'Problems where context accumulation hurts performance',
      'When Chain-of-Thought is sufficient'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Decomposition Quality', measure: 'Appropriateness and completeness of problem breakdown' },
    { metric: 'Subproblem Accuracy', measure: 'Correctness of individual subproblem solutions' },
    { metric: 'Context Preservation', measure: 'Effective use of previous solutions in later steps' },
    { metric: 'Final Solution Quality', measure: 'Accuracy vs direct problem solving approaches' },
    { metric: 'Efficiency Gain', measure: 'Performance improvement over standard prompting' },
    { metric: 'Generalization', measure: 'Success across different problem types and domains' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Mathematical Problem Solving: Complex equation → Break into steps → Solve algebraically → Combine for final answer',
    'Code Generation: Large program → Decompose into functions → Implement each function → Integrate into working code',
    'Essay Writing: Complex topic → Outline main points → Develop each argument → Synthesize into coherent essay',
    'Data Analysis: Complex dataset → Break into analysis components → Solve each analysis → Integrate insights',
    'Strategic Planning: Business challenge → Identify key areas → Develop solutions for each → Create comprehensive strategy'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Decomposed Prompting: A Modular Approach for Solving Complex Tasks (Khot et al., 2022)', url: 'https://arxiv.org/abs/2210.02406' },
        { title: 'Maieutic Prompting: Logically Consistent Reasoning (Jung et al., 2022)', url: 'https://arxiv.org/abs/2205.11822' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google AI Least-to-Most Prompting Guide', url: 'https://ai.googleblog.com/2022/05/least-to-most-prompting-enables-complex.html' },
        { title: 'OpenAI Advanced Prompting Techniques', url: 'https://platform.openai.com/docs/guides/prompt-engineering/strategy-split-complex-tasks-into-simpler-subtasks' },
        { title: 'Anthropic Prompt Engineering: Problem Decomposition', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts' },
        { title: 'Prompt Engineering Guide: Least-to-Most', url: 'https://www.promptingguide.ai/techniques/least_to_most' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Sequential Chains for Decomposition', url: 'https://python.langchain.com/docs/modules/chains/' },
        { title: 'DSPy Modular Programming with LMs', url: 'https://dspy-docs.vercel.app/docs/building-blocks/modules' },
        { title: 'Microsoft Guidance: Structured Generation', url: 'https://github.com/microsoft/guidance' },
        { title: 'OpenAI Function Calling for Step-by-Step Solutions', url: 'https://platform.openai.com/docs/guides/function-calling' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Advanced Prompting', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'LangChain Discord - Sequential Reasoning', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Prompting Research', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Problem Decomposition', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Problem decomposition strategy that solves complex tasks by breaking them into simpler subproblems solved sequentially"
        why="Enables tackling complex problems by building solutions incrementally from simple to complex components"
        keyInsight="Decompose complex problem → Solve simplest first → Use previous solutions → Build up to final answer"
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

export default LeastToMostPromptingDetails;