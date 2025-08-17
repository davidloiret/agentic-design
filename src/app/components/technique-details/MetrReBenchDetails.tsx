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

interface MetrReBenchDetailsProps {
  selectedTechnique: any;
}

export const MetrReBenchDetails: React.FC<MetrReBenchDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Deploy 7 ML research engineering environments with GPU access' },
      { num: '2', action: 'Configure', detail: 'Set time budgets (2h, 8h, 32h) and scoring functions' },
      { num: '3', action: 'Evaluate', detail: 'Run agents on scaling laws, GPU kernels, and ML optimization tasks' },
      { num: '4', action: 'Compare', detail: 'Benchmark against 71 human expert attempts (61 distinct experts)' },
      { num: '5', action: 'Analyze', detail: 'Assess R&D automation capabilities vs human performance' }
    ],
    example: 're_bench = REBench(environments=7, experts=71, models=[claude_3.5, o1_preview], budget="8h")'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all 7 environments for comprehensive R&D capability assessment', icon: '✅' },
    { type: 'do', text: 'Compare performance at multiple time budgets (2h, 8h, 32h)', icon: '✅' },
    { type: 'do', text: 'Focus on open-ended research engineering tasks, not classical ML', icon: '✅' },
    { type: 'do', text: 'Provide GPU access for kernel optimization and scaling experiments', icon: '✅' },
    { type: 'do', text: 'Use human expert baselines from 61 distinct researchers', icon: '✅' },
    { type: 'dont', text: 'Expect agents to outperform humans on extended time budgets (32h)', icon: '❌' },
    { type: 'dont', text: 'Focus only on short-term performance - humans show better scaling', icon: '❌' },
    { type: 'dont', text: 'Use publicly available solutions - benchmark designed to avoid this', icon: '❌' },
    { type: 'dont', text: 'Skip safety considerations for R&D automation capabilities', icon: '❌' },
    { type: 'dont', text: 'Ignore the 10x speed advantage agents have in solution generation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating frontier AI R&D automation capabilities',
      'Measuring research engineering vs classical ML skills',
      'Assessing AI safety risks from autonomous R&D',
      'Comparing agent performance against human experts',
      'Research on AI-driven scientific discovery'
    ],
    avoidWhen: [
      'Standard ML benchmarking with public solutions',
      'Classical machine learning task evaluation',
      'Short-term capability assessment only',
      'Environments without GPU/compute resources',
      'Non-research engineering skill evaluation'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Expert Success Rate', measure: '82% of human experts achieved non-zero scores' },
    { metric: 'Strong Solution Match', measure: '24% of experts matched or exceeded reference solutions' },
    { metric: 'Short-term Agent Advantage', measure: '4x higher scores than humans at 2-hour budget' },
    { metric: 'Long-term Human Advantage', measure: '2x human scores vs top agents at 32-hour budget' },
    { metric: 'Solution Generation Speed', measure: 'Agents generate/test solutions 10x faster than humans' },
    { metric: 'Cost Efficiency', measure: 'Much lower cost per solution attempt for AI agents' }
  ];

  // Top Use Cases
  const topUseCases = [
    'AI Safety Research: Evaluating R&D automation risks as highlighted in frontier AI safety policies',
    'Research Capability Assessment: Measuring agent performance on scaling laws, GPU kernel optimization',
    'Human-AI Comparison: Direct benchmarking against 71 expert attempts across multiple time budgets',
    'Autonomous R&D Evaluation: Testing frontier models (Claude 3.5 Sonnet, o1-preview) on research tasks',
    'Policy and Governance: Supporting White House NSM and EU AI Act evaluations for R&D capabilities'
  ];

  const references = [
    {
      title: 'Official METR RE-Bench Resources',
      items: [
        { title: 'RE-Bench: Evaluating Frontier AI R&D Capabilities (arXiv:2411.15114)', url: 'https://arxiv.org/abs/2411.15114' },
        { title: 'METR Blog: Evaluating R&D Capabilities of LLMs', url: 'https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/' },
        { title: 'METR AI R&D Evaluation Report (PDF)', url: 'https://metr.org/AI_R_D_Evaluation_Report.pdf' },
        { title: 'RE-Bench ResearchGate Publication', url: 'https://www.researchgate.net/publication/386094151_RE-Bench_Evaluating_frontier_AI_RD_capabilities_of_language_model_agents_against_human_experts' }
      ]
    },
    {
      title: 'Conference & Academic Recognition',
      items: [
        { title: 'ICML 2025 Poster: RE-Bench', url: 'https://icml.cc/virtual/2025/poster/46519' },
        { title: 'OpenReview: RE-Bench Discussion', url: 'https://openreview.net/forum?id=3rB0bVU6z6' },
        { title: 'Hugging Face Paper Page', url: 'https://huggingface.co/papers/2411.15114' },
        { title: 'Hacker News Discussion: RE-Bench', url: 'https://news.ycombinator.com/item?id=42561512' }
      ]
    },
    {
      title: 'Related METR Research',
      items: [
        { title: 'METR: Measuring Autonomous AI Capabilities', url: 'https://metr.org/measuring-autonomous-ai-capabilities/' },
        { title: 'KernelBench: GPU Kernel Engineering (arXiv:2502.10517)', url: 'https://arxiv.org/abs/2502.10517' },
        { title: 'METR Blog: Measuring Automated Kernel Engineering', url: 'https://metr.org/blog/2025-02-14-measuring-automated-kernel-engineering/' },
        { title: 'Apollo Research: Forecasting Frontier Agent Capabilities', url: 'https://www.apolloresearch.ai/blog/forecasting-frontier-language-model-agent-capabilities' }
      ]
    },
    {
      title: 'Policy & Safety Context',
      items: [
        { title: 'White House National Security Memorandum on AI', url: 'https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/' },
        { title: 'EU Artificial Intelligence Act', url: 'https://artificialintelligenceact.eu/' },
        { title: 'NVIDIA: GPU Kernel Generation with DeepSeek-R1', url: 'https://developer.nvidia.com/blog/automating-gpu-kernel-generation-with-deepseek-r1-and-inference-time-scaling/' },
        { title: 'LessWrong: Forecasting Frontier Agent Capabilities', url: 'https://www.lesswrong.com/posts/bc5ohMwAyshdwJkDt/forecasting-frontier-language-model-agent-capabilities' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="METR's benchmark comparing frontier AI agents against 71 human experts across 7 ML research engineering environments"
        why="Evaluates R&D automation capabilities highlighted as key risk in frontier AI safety policies"
        keyInsight="Agents achieve 4x human performance at 2h budget but humans outperform 2x at 32h - time scaling matters"
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

export default MetrReBenchDetails;