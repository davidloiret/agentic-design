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

interface TreeOfThoughtDetailsProps {
  selectedTechnique: any;
}

export const TreeOfThoughtDetails: React.FC<TreeOfThoughtDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Tree', detail: 'Set branching factor K & max depth' },
      { num: '2', action: 'Generate', detail: 'Create K candidate thoughts per node' },
      { num: '3', action: 'Evaluate', detail: 'Score each candidate (rubrics/verifier)' },
      { num: '4', action: 'Prune', detail: 'Keep top candidates, discard weak paths' },
      { num: '5', action: 'Search', detail: 'BFS/DFS/beam until solution found' }
    ],
    example: 'Problem → [Branch 1, Branch 2, Branch 3] → Evaluate → Prune → Expand best → Solution'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use small branching factor (K=3-5) to control costs', icon: '✅' },
    { type: 'do', text: 'Implement explicit evaluation criteria/rubrics', icon: '✅' },
    { type: 'do', text: 'Cache and deduplicate equivalent states', icon: '✅' },
    { type: 'do', text: 'Set budget limits (max tokens/time) with fallbacks', icon: '✅' },
    { type: 'do', text: 'Use beam search for balanced exploration', icon: '✅' },
    { type: 'dont', text: 'Allow unlimited branching (combinatorial explosion)', icon: '❌' },
    { type: 'dont', text: 'Skip evaluation steps (leads to random exploration)', icon: '❌' },
    { type: 'dont', text: 'Use for simple problems (overkill vs CoT)', icon: '❌' },
    { type: 'dont', text: 'Ignore cycles/loops in reasoning paths', icon: '❌' },
    { type: 'dont', text: 'Over-prune early promising paths', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex problems with multiple solution paths',
      'Strategic planning requiring lookahead',
      'Creative tasks needing exploration',
      'Puzzles with critical early decisions',
      'When backtracking adds value'
    ],
    avoidWhen: [
      'Simple linear reasoning tasks',
      'Real-time/low-latency requirements',
      'Tight computational budgets',
      'Tasks without clear evaluation criteria',
      'When CoT already works well'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Solution Quality', measure: 'Accuracy vs CoT baseline' },
    { metric: 'Search Efficiency', measure: 'Nodes explored per solution' },
    { metric: 'Token Cost', measure: 'Total tokens vs linear approaches' },
    { metric: 'Path Diversity', measure: 'Unique reasoning strategies explored' },
    { metric: 'Evaluation Accuracy', measure: 'Pruning quality (keep good, discard bad)' },
    { metric: 'Budget Utilization', measure: '% of max depth/tokens used' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Game of 24: Explore different operator combinations → evaluate validity → prune impossible paths',
    'Strategic Planning: Generate scenario branches → assess outcomes → select optimal strategy',
    'Creative Writing: Develop plot alternatives → evaluate narrative coherence → pursue best storylines',
    'Math Puzzles: Try multiple solution approaches → verify correctness → backtrack if needed',
    'Code Architecture: Explore design patterns → evaluate trade-offs → select best approach'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'When Tree of Thoughts Succeeds: Larger Models Excel in Generation (Chen et al., 2024)', url: 'https://arxiv.org/abs/2410.17820' },
        { title: 'Tree of Thoughts for Multi-step Problem Solving (Hulbert, 2023)', url: 'https://arxiv.org/abs/2305.08291' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Hugging Face: Understanding and Implementing Tree of Thoughts', url: 'https://huggingface.co/blog/sadhaklal/tree-of-thoughts' },
        { title: 'Deepgram: Tree-of-Thoughts Prompting Guide', url: 'https://deepgram.com/learn/tree-of-thoughts-prompting' },
        { title: 'Prompt Engineering Guide: Tree of Thoughts', url: 'https://www.promptingguide.ai/techniques/tot' },
        { title: 'GeeksforGeeks: Tree-of-Thought Prompting Explained', url: 'https://www.geeksforgeeks.org/artificial-intelligence/tree-of-thought-tot-prompting/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Princeton NLP: tree-of-thought-llm (Official Implementation)', url: 'https://github.com/princeton-nlp/tree-of-thought-llm' },
        { title: 'LangGraph: Graph-based Reasoning Workflows', url: 'https://python.langchain.com/docs/expression_language/how_to/graph' },
        { title: 'Microsoft Guidance: Structured Generation Library', url: 'https://github.com/microsoft/guidance' },
        { title: 'DSPy: Programming with Language Models', url: 'https://dspy-docs.vercel.app/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Community - Reasoning Techniques', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'Hugging Face Forums: Reasoning & Prompting', url: 'https://discuss.huggingface.co/' },
        { title: 'r/MachineLearning - Tree of Thoughts Discussions', url: 'https://www.reddit.com/r/MachineLearning/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Explore multiple reasoning paths through branching tree structure with evaluation and pruning"
        why="Enables backtracking, lookahead, and exploration of alternatives for complex problem-solving"
        keyInsight="Generate K candidates → Evaluate → Prune weak paths → Expand promising ones → Repeat until solution"
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

export default TreeOfThoughtDetails;