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

interface TestTimeComputeScalingDetailsProps {
  selectedTechnique: any;
}

export const TestTimeComputeScalingDetails: React.FC<TestTimeComputeScalingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Difficulty Assessment', detail: 'Estimate problem complexity & required compute' },
      { num: '2', action: 'Resource Allocation', detail: 'Scale tokens/time/iterations based on difficulty' },
      { num: '3', action: 'Adaptive Search', detail: 'Use more search/reasoning for harder problems' },
      { num: '4', action: 'Quality Monitoring', detail: 'Track solution quality vs compute spent' },
      { num: '5', action: 'Dynamic Adjustment', detail: 'Increase compute if quality insufficient' }
    ],
    example: 'Easy: 100 tokens → Medium: 500 tokens → Hard: 2000 tokens + search'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement difficulty detection heuristics early', icon: '✅' },
    { type: 'do', text: 'Use progressive compute allocation (start small)', icon: '✅' },
    { type: 'do', text: 'Monitor quality-to-compute efficiency ratios', icon: '✅' },
    { type: 'do', text: 'Set maximum compute budgets to prevent runaway', icon: '✅' },
    { type: 'do', text: 'Cache intermediate results for reuse', icon: '✅' },
    { type: 'dont', text: 'Use fixed compute regardless of problem difficulty', icon: '❌' },
    { type: 'dont', text: 'Scale linearly without diminishing returns analysis', icon: '❌' },
    { type: 'dont', text: 'Ignore early quality signals (continue bad paths)', icon: '❌' },
    { type: 'dont', text: 'Allocate maximum compute to trivial problems', icon: '❌' },
    { type: 'dont', text: 'Skip difficulty calibration on diverse problem sets', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Problems with variable complexity levels',
      'Quality is more important than speed',
      'When compute budget allows scaling',
      'Diverse problem domains requiring adaptation',
      'Performance optimization scenarios'
    ],
    avoidWhen: [
      'Uniform difficulty problems',
      'Strict real-time constraints',
      'Limited computational resources',
      'Simple classification tasks',
      'When speed matters more than quality'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Quality-Compute Efficiency', measure: 'Performance improvement per additional compute unit' },
    { metric: 'Difficulty Prediction Accuracy', measure: 'Correct identification of problem complexity' },
    { metric: 'Resource Utilization', measure: 'Optimal allocation vs over/under-provisioning' },
    { metric: 'Scaling Law Adherence', measure: 'Performance gains following predicted scaling curves' },
    { metric: 'Early Stopping Effectiveness', measure: 'Quality threshold achievement speed' },
    { metric: 'Cost-Benefit Ratio', measure: 'Solution value vs computational expense' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Mathematical Problem Solving: Easy algebra (50 tokens) → Complex proofs (2000+ tokens + verification)',
    'Code Generation: Simple functions (200 tokens) → Complex algorithms (1000+ tokens + testing)',
    'Research Analysis: Basic queries (100 tokens) → Deep synthesis (1500+ tokens + cross-referencing)',
    'Creative Writing: Short responses (150 tokens) → Detailed narratives (1000+ tokens + revision)',
    'Strategic Planning: Quick decisions (200 tokens) → Comprehensive strategies (2000+ tokens + scenario analysis)'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Scaling Laws for Neural Language Models (Kaplan et al., 2020)', url: 'https://arxiv.org/abs/2001.08361' },
        { title: 'Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)', url: 'https://arxiv.org/abs/2203.15556' },
        { title: 'Let\'s Verify Step by Step (Lightman et al., 2023)', url: 'https://arxiv.org/abs/2305.20050' },
        { title: 'STaR: Bootstrapping Reasoning With Reasoning (Zelikman et al., 2022)', url: 'https://arxiv.org/abs/2203.14465' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OpenAI Model Scaling and Performance Optimization', url: 'https://platform.openai.com/docs/guides/performance-optimization' },
        { title: 'Anthropic Constitutional AI Scaling Methods', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
        { title: 'Google Palm 2 Technical Report: Scaling Insights', url: 'https://ai.google/research/pubs/pub52311' },
        { title: 'Microsoft Azure OpenAI Scaling Best Practices', url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Adaptive Prompting and Scaling', url: 'https://python.langchain.com/docs/modules/model_io/prompts/prompt_templates/' },
        { title: 'DSPy Automatic Optimization and Scaling', url: 'https://dspy-docs.vercel.app/docs/building-blocks/optimizers' },
        { title: 'OpenAI Evals: Performance Benchmarking Framework', url: 'https://github.com/openai/evals' },
        { title: 'Weights & Biases: Experiment Tracking for Scaling', url: 'https://wandb.ai/site/llm-training' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OpenAI Developer Forum - Scaling Strategies', url: 'https://community.openai.com/c/api/20' },
        { title: 'Anthropic Discord - Performance Optimization', url: 'https://discord.gg/anthropic' },
        { title: 'r/MachineLearning - Scaling Laws Research', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'Hugging Face Forums - Model Performance Optimization', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic allocation of computational resources based on problem difficulty and quality requirements"
        why="Optimizes performance-cost trade-offs by investing more compute in harder problems while saving resources on easier ones"
        keyInsight="Assess difficulty → Scale compute allocation → Monitor quality gains → Adjust resources dynamically"
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

export default TestTimeComputeScalingDetails;