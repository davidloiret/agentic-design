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

interface ReflectiveMctsDetailsProps {
  selectedTechnique: any;
}

export const ReflectiveMctsDetails: React.FC<ReflectiveMctsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Selection', detail: 'Navigate tree using UCB1 + reflection score' },
      { num: '2', action: 'Expansion', detail: 'Generate new child nodes with reasoning' },
      { num: '3', action: 'Simulation', detail: 'Rollout with reflective policy evaluation' },
      { num: '4', action: 'Reflection', detail: 'Analyze path quality & reasoning errors' },
      { num: '5', action: 'Backpropagation', detail: 'Update values with reflection insights' }
    ],
    example: 'UCB1 selection → Expand with reasoning → Simulate → Reflect on mistakes → Update tree'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Integrate reflection into all MCTS phases', icon: '✅' },
    { type: 'do', text: 'Use domain-specific reflection criteria', icon: '✅' },
    { type: 'do', text: 'Balance exploration vs reflection overhead', icon: '✅' },
    { type: 'do', text: 'Maintain separate reflection and value networks', icon: '✅' },
    { type: 'do', text: 'Cache reflection results for similar states', icon: '✅' },
    { type: 'dont', text: 'Add reflection without clear quality metrics', icon: '❌' },
    { type: 'dont', text: 'Reflect on every node (computational explosion)', icon: '❌' },
    { type: 'dont', text: 'Use shallow reflection that misses key insights', icon: '❌' },
    { type: 'dont', text: 'Ignore reflection feedback in future selections', icon: '❌' },
    { type: 'dont', text: 'Apply uniform reflection depth regardless of uncertainty', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex strategic domains with long-term consequences',
      'Problems requiring error correction and learning',
      'When simulation quality matters more than speed',
      'Domains with clear reflection criteria',
      'Multi-step reasoning with compounding errors'
    ],
    avoidWhen: [
      'Simple search problems with clear evaluation',
      'Real-time applications with strict latency limits',
      'Domains lacking meaningful reflection signals',
      'When standard MCTS already performs well',
      'Highly stochastic environments'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Solution Quality', measure: 'Performance vs standard MCTS baseline' },
    { metric: 'Reflection Accuracy', measure: 'Correctness of path quality assessments' },
    { metric: 'Search Efficiency', measure: 'Quality improvement per simulation' },
    { metric: 'Error Correction Rate', measure: 'Recovery from poor initial paths' },
    { metric: 'Computational Overhead', measure: 'Additional cost vs quality gains' },
    { metric: 'Learning Transfer', measure: 'Reflection knowledge reuse across problems' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Strategic Game AI: Chess/Go with position evaluation reflection → Identify weak moves → Improve future selections',
    'Code Generation: Generate solution → Reflect on bugs/efficiency → Backpropagate insights → Better code paths',
    'Mathematical Reasoning: Explore proof steps → Reflect on logical validity → Correct reasoning errors → Stronger proofs',
    'Business Strategy: Evaluate strategic options → Reflect on risk/assumptions → Update decision criteria → Optimal strategy',
    'Research Planning: Design experiments → Reflect on methodology flaws → Improve research design → Better outcomes'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Monte Carlo Tree Search: A Review (Browne et al., 2012)', url: 'https://ieeexplore.ieee.org/document/6145622' },
        { title: 'Mastering the Game of Go with Deep Neural Networks (Silver et al., 2016)', url: 'https://www.nature.com/articles/nature16961' },
        { title: 'Self-Reflective Monte Carlo Tree Search (Liu et al., 2023)', url: 'https://arxiv.org/abs/2307.15024' },
        { title: 'Reflection-Augmented Tree Search for Strategic Planning (Chen et al., 2024)', url: 'https://arxiv.org/abs/2401.08765' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI MCTS Integration with Language Models', url: 'https://platform.openai.com/docs/guides/reasoning' },
        { title: 'DeepMind AlphaZero MCTS Architecture', url: 'https://deepmind.com/blog/article/alphazero-shedding-new-light-grand-games-chess-shogi-and-go' },
        { title: 'Python MCTS Implementation with Reflection', url: 'https://github.com/int8/monte-carlo-tree-search' },
        { title: 'LangChain Tree-based Reasoning Workflows', url: 'https://python.langchain.com/docs/expression_language/how_to/graph' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'python-mcts: Monte Carlo Tree Search Library', url: 'https://github.com/pbsinclair42/MCTS' },
        { title: 'OpenSpiel: Multi-agent Reinforcement Learning', url: 'https://github.com/deepmind/open_spiel' },
        { title: 'Gymnasium: Reinforcement Learning Environments', url: 'https://gymnasium.farama.org/' },
        { title: 'Ray RLlib: Scalable RL with MCTS Support', url: 'https://docs.ray.io/en/latest/rllib/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'r/MachineLearning - MCTS Research Discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'AI Stack Exchange - Monte Carlo Methods', url: 'https://ai.stackexchange.com/questions/tagged/monte-carlo-tree-search' },
        { title: 'OpenAI Developer Forum - Advanced Reasoning', url: 'https://community.openai.com/c/prompting/8' },
        { title: 'DeepMind Research Community', url: 'https://deepmind.com/research' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Monte Carlo Tree Search enhanced with reflective analysis at each phase for improved decision quality"
        why="Combines systematic tree search with self-reflection to identify and correct reasoning errors during exploration"
        keyInsight="Select with reflection → Expand reasoning → Simulate with quality assessment → Reflect on errors → Backpropagate insights"
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

export default ReflectiveMctsDetails;