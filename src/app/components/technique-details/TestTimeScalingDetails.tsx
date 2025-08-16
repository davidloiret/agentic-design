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

interface TestTimeScalingDetailsProps {
  selectedTechnique: any;
}

export const TestTimeScalingDetails: React.FC<TestTimeScalingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Generate', detail: 'Create multiple reasoning paths or solutions' },
      { num: '2', action: 'Verify', detail: 'Use verification model or self-consistency checks' },
      { num: '3', action: 'Rank', detail: 'Score and rank solutions by quality/confidence' },
      { num: '4', action: 'Select', detail: 'Choose best solution or aggregate top candidates' },
      { num: '5', action: 'Scale', detail: 'Increase compute budget for better performance' }
    ],
    example: 'query → multiple_attempts → verification/ranking → best_solution + increased_compute'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use process-based verification over outcome-only evaluation', icon: '✅' },
    { type: 'do', text: 'Implement majority voting and self-consistency checks', icon: '✅' },
    { type: 'do', text: 'Scale compute allocation based on problem difficulty', icon: '✅' },
    { type: 'do', text: 'Use search algorithms and tree-based reasoning', icon: '✅' },
    { type: 'do', text: 'Monitor latency vs accuracy trade-offs carefully', icon: '✅' },
    { type: 'do', text: 'Implement early stopping for confident solutions', icon: '✅' },
    { type: 'dont', text: 'Apply uniform compute to all problems regardless of difficulty', icon: '❌' },
    { type: 'dont', text: 'Ignore verification quality and just generate more samples', icon: '❌' },
    { type: 'dont', text: 'Use test-time scaling without proper evaluation frameworks', icon: '❌' },
    { type: 'dont', text: 'Scale compute without considering inference cost budgets', icon: '❌' },
    { type: 'dont', text: 'Rely solely on quantity without improving reasoning quality', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex reasoning tasks requiring multiple solution paths',
      'High-stakes decisions where accuracy is prioritized over speed',
      'Problems where verification is easier than generation',
      'Tasks with clear objective evaluation criteria',
      'Applications with flexible inference time budgets'
    ],
    avoidWhen: [
      'Simple tasks with straightforward solutions',
      'Real-time applications with strict latency requirements',
      'Problems without reliable verification methods',
      'Cost-sensitive applications with tight budgets',
      'Tasks where first attempt is typically sufficient'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Accuracy@K', measure: 'Best performance among K attempts' },
    { metric: 'Compute Efficiency', measure: 'Performance gain per unit compute' },
    { metric: 'Verification Accuracy', measure: 'Quality of solution ranking/selection' },
    { metric: 'Latency Scaling', measure: 'Inference time vs compute allocation' },
    { metric: 'Pass@K Rate', measure: 'Success rate within K attempts' },
    { metric: 'Cost-Performance Ratio', measure: 'Accuracy improvement per dollar spent' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Mathematical Reasoning: Multiple solution paths for complex proofs and problem solving',
    'Code Generation: Generate and verify multiple implementations to find optimal solutions',
    'Scientific Discovery: Explore multiple hypotheses and experimental designs',
    'Strategic Planning: Evaluate multiple scenarios and decision pathways',
    'Creative Problem Solving: Generate diverse solutions and select most promising approaches',
    'Competitive Programming: Systematic solution exploration with verification'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Training Verifiers to Solve Math Word Problems (Cobbe et al., 2021)', url: 'https://arxiv.org/abs/2110.14168' },
        { title: 'Let\'s Verify Step by Step (Lightman et al., 2023)', url: 'https://arxiv.org/abs/2305.20050' },
        { title: 'Scaling Laws for Reward Model Overoptimization (Gao et al., 2022)', url: 'https://arxiv.org/abs/2210.10760' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' }
      ]
    },
    {
      title: 'Test-Time Scaling Methods',
      items: [
        { title: 'Scaling Laws for Neural Language Models (Kaplan et al., 2020)', url: 'https://arxiv.org/abs/2001.08361' },
        { title: 'Training Compute-Optimal Large Language Models (Hoffmann et al., 2022)', url: 'https://arxiv.org/abs/2203.15556' },
        { title: 'Large Language Models Can Self-Improve (Huang et al., 2022)', url: 'https://arxiv.org/abs/2210.11610' },
        { title: 'STaR: Bootstrapping Reasoning With Reasoning (Zelikman et al., 2022)', url: 'https://arxiv.org/abs/2203.14465' }
      ]
    },
    {
      title: 'Verification & Process Supervision',
      items: [
        { title: 'Process Supervision for Reliable Reasoning (OpenAI, 2023)', url: 'https://openai.com/research/improving-mathematical-reasoning-with-process-supervision' },
        { title: 'Let\'s Verify Step by Step - Process vs Outcome Supervision (OpenAI, 2023)', url: 'https://arxiv.org/abs/2305.20050' },
        { title: 'Training Verifiers to Solve Math Word Problems (Cobbe et al., 2021)', url: 'https://arxiv.org/abs/2110.14168' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' }
      ]
    },
    {
      title: 'Search & Tree-Based Reasoning',
      items: [
        { title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)', url: 'https://arxiv.org/abs/2305.10601' },
        { title: 'Graph of Thoughts: Solving Elaborate Problems with Large Language Models (Besta et al., 2023)', url: 'https://arxiv.org/abs/2308.09687' },
        { title: 'AlphaCode: Competition-Level Code Generation with Search (Li et al., 2022)', url: 'https://arxiv.org/abs/2203.07814' },
        { title: 'Learning to Search with Language Models (Beurer-Kellner et al., 2023)', url: 'https://arxiv.org/abs/2305.14992' }
      ]
    },
    {
      title: 'Self-Consistency & Majority Voting',
      items: [
        { title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Complex Reasoning: The Divide and Conquer Approach (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2210.00720' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' },
        { title: 'Universal Self-Consistency for Large Language Model Generation (Chen et al., 2023)', url: 'https://arxiv.org/abs/2311.17311' }
      ]
    },
    {
      title: 'Recent Advances (2023-2024)',
      items: [
        { title: 'Quiet-STaR: Language Models Can Teach Themselves to Think Before Speaking (Zelikman et al., 2024)', url: 'https://arxiv.org/abs/2403.09629' },
        { title: 'Rest-of-World Latent Search (RoWLS) for Test-Time Scaling (Chen et al., 2024)', url: 'https://arxiv.org/abs/2403.11943' },
        { title: 'Test-Time Training for Large Language Models (Liu et al., 2024)', url: 'https://arxiv.org/abs/2404.14294' },
        { title: 'Inference-Time Scaling Laws for Large Language Models (Snell et al., 2024)', url: 'https://arxiv.org/abs/2405.03810' }
      ]
    },
    {
      title: 'Mathematical & Scientific Reasoning',
      items: [
        { title: 'Solving Quantitative Reasoning Problems with Language Models (Lewkowycz et al., 2022)', url: 'https://arxiv.org/abs/2206.14858' },
        { title: 'MATH: Measuring Mathematical Problem Solving (Hendrycks et al., 2021)', url: 'https://arxiv.org/abs/2103.03874' },
        { title: 'Competition-Level Mathematics with AlphaGeometry (Trinh et al., 2024)', url: 'https://arxiv.org/abs/2401.02884' },
        { title: 'FunSearch: Making New Discoveries in Mathematical Sciences (Romera-Paredes et al., 2023)', url: 'https://www.nature.com/articles/s41586-023-06924-6' }
      ]
    },
    {
      title: 'Code Generation & Programming',
      items: [
        { title: 'CodeT5: Identifier-aware Unified Pre-trained Encoder-Decoder Models (Wang et al., 2021)', url: 'https://arxiv.org/abs/2109.00859' },
        { title: 'Competition-Level Code Generation with AlphaCode (Li et al., 2022)', url: 'https://arxiv.org/abs/2203.07814' },
        { title: 'Code as Policies: Language Model Programs for Embodied Control (Liang et al., 2022)', url: 'https://arxiv.org/abs/2209.07753' },
        { title: 'Self-Debugging: Teaching Language Models to Debug Programs (Chen et al., 2023)', url: 'https://arxiv.org/abs/2304.05128' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'OpenAI Process Supervision Implementation', url: 'https://github.com/openai/prm800k' },
        { title: 'Anthropic Constitutional AI Framework', url: 'https://github.com/anthropics/ConstitutionalAI' },
        { title: 'Hugging Face Transformers - Generation Strategies', url: 'https://huggingface.co/docs/transformers/generation_strategies' },
        { title: 'Tree of Thoughts Implementation', url: 'https://github.com/princeton-nlp/tree-of-thought-llm' }
      ]
    },
    {
      title: 'Evaluation & Benchmarks',
      items: [
        { title: 'GSM8K: Grade School Math Word Problems Dataset', url: 'https://github.com/openai/grade-school-math' },
        { title: 'MATH Dataset: Competition Mathematics Problems', url: 'https://github.com/hendrycks/math' },
        { title: 'HumanEval: Hand-Written Evaluation for Code Generation', url: 'https://github.com/openai/human-eval' },
        { title: 'MMLU: Measuring Massive Multitask Language Understanding', url: 'https://github.com/hendrycks/test' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain: Test-Time Generation Strategies', url: 'https://python.langchain.com/docs/modules/model_io/output_parsers/retry' },
        { title: 'Guidance: Controllable Generation Framework', url: 'https://github.com/guidance-ai/guidance' },
        { title: 'vLLM: High-Throughput and Memory-Efficient Inference', url: 'https://github.com/vllm-project/vllm' },
        { title: 'DeepSpeed: Distributed Training and Inference', url: 'https://github.com/microsoft/DeepSpeed' }
      ]
    },
    {
      title: 'Research Communities',
      items: [
        { title: 'OpenAI Research - Reasoning and Verification', url: 'https://openai.com/research' },
        { title: 'Anthropic Research - Constitutional AI and Safety', url: 'https://www.anthropic.com/research' },
        { title: 'DeepMind - Mathematical Reasoning Research', url: 'https://deepmind.com/research' },
        { title: 'AI2 Allen Institute - Reasoning Benchmarks', url: 'https://allenai.org/research' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Allocate additional compute at inference time to improve performance through multiple attempts and verification"
        why="Enables better accuracy on complex tasks, flexible compute allocation, and performance scaling without retraining"
        keyInsight="More inference-time compute can substitute for larger models or more training data on reasoning tasks"
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

export default TestTimeScalingDetails;