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

interface GaiaBenchmarkDetailsProps {
  selectedTechnique: any;
}

export const GaiaBenchmarkDetails: React.FC<GaiaBenchmarkDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Install GAIA benchmark framework and configure evaluation environment' },
      { num: '2', action: 'Select', detail: 'Choose difficulty level (Level 1: <5 steps, Level 2: 5-10 steps, Level 3: up to 50 steps)' },
      { num: '3', action: 'Configure', detail: 'Enable tool access: web browsing, file handling, multimodal processing' },
      { num: '4', action: 'Evaluate', detail: 'Run agent on 466 questions requiring reasoning, multimodality, and tool use' },
      { num: '5', action: 'Analyze', detail: 'Compare performance against human baseline (92%) and current SOTA (65%)' }
    ],
    example: 'gaia_eval = GAIA(agent=ai_assistant, levels=[1,2,3], tools=[web_browser, file_handler], timeout=3600)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all three difficulty levels for comprehensive capability assessment', icon: '✅' },
    { type: 'do', text: 'Enable full tool suite: web browsing, file handling, multimodal understanding', icon: '✅' },
    { type: 'do', text: 'Focus on real-world tasks requiring multi-step reasoning and coordination', icon: '✅' },
    { type: 'do', text: 'Validate against human performance baseline of 92% accuracy', icon: '✅' },
    { type: 'do', text: 'Use development set (166 questions) for model tuning and validation set for final eval', icon: '✅' },
    { type: 'dont', text: 'Expect high scores without proper tool integration - GPT-4 achieves only 15%', icon: '❌' },
    { type: 'dont', text: 'Skip multimodal components - questions include images and spreadsheets', icon: '❌' },
    { type: 'dont', text: 'Attempt brute-force approaches - answers require full task execution', icon: '❌' },
    { type: 'dont', text: 'Ignore Level 3 questions - they test advanced long-term planning capabilities', icon: '❌' },
    { type: 'dont', text: 'Train on test questions - answers are withheld to maintain benchmark integrity', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating general-purpose AI assistant capabilities',
      'Testing real-world reasoning and tool use proficiency',
      'Assessing multimodal understanding and web browsing skills',
      'Benchmarking against human-level general intelligence',
      'Research on fundamental AI abilities and limitations'
    ],
    avoidWhen: [
      'Domain-specific task evaluation (use specialized benchmarks)',
      'Simple question-answering without tool requirements',
      'Performance testing without multimodal capabilities',
      'Rapid evaluation needs (questions can take up to 50 human steps)',
      'Systems without web access or file handling capabilities'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Overall Accuracy', measure: 'Primary metric: percentage of correctly answered questions across all levels' },
    { metric: 'Level-wise Performance', measure: 'Breakdown by difficulty: Level 1 (simple), Level 2 (moderate), Level 3 (complex)' },
    { metric: 'Human-AI Gap', measure: 'Current gap: 27% (Human 92% vs h2oGPTe 65%)' },
    { metric: 'Tool Use Effectiveness', measure: 'Success rate in web browsing, file handling, and multimodal tasks' },
    { metric: 'Multi-step Reasoning', measure: 'Ability to coordinate reasoning across 5-50 steps depending on level' },
    { metric: 'Task Completion Rate', measure: 'Percentage of tasks completed vs. partial solutions or failures' }
  ];

  // Top Use Cases
  const topUseCases = [
    'AGI Capability Assessment: H2O.ai h2oGPTe achieves 65% - first C grade on general intelligence test',
    'Industry Benchmarking: Standard for evaluating general AI assistants vs specialized chatbots',
    'Academic Research: Meta/HuggingFace/AutoGPT collaboration for fundamental AI ability measurement',
    'Tool Integration Testing: Comprehensive evaluation of web browsing, file handling, and multimodal reasoning',
    'Real-world Task Simulation: 466 carefully designed questions reflecting authentic assistant scenarios'
  ];

  const references = [
    {
      title: 'Original GAIA Research & Framework',
      items: [
        { title: 'GAIA: a benchmark for General AI Assistants (arXiv:2311.12983)', url: 'https://arxiv.org/abs/2311.12983' },
        { title: 'Meta AI Research - GAIA Benchmark Publication', url: 'https://ai.meta.com/research/publications/gaia-a-benchmark-for-general-ai-assistants/' },
        { title: 'GAIA Benchmark HTML Version (ar5iv)', url: 'https://ar5iv.labs.arxiv.org/html/2311.12983' },
        { title: 'GAIA Paper on Hugging Face', url: 'https://huggingface.co/papers/2311.12983' }
      ]
    },
    {
      title: 'Official Leaderboards & Evaluation',
      items: [
        { title: 'GAIA Benchmark Official Leaderboard', url: 'https://huggingface.co/spaces/gaia-benchmark/leaderboard' },
        { title: 'HAL Princeton GAIA Leaderboard', url: 'https://hal.cs.princeton.edu/gaia' },
        { title: 'UK Government BEIS GAIA Implementation', url: 'https://ukgovernmentbeis.github.io/inspect_evals/evals/assistants/gaia/' },
        { title: 'GAIA Benchmark OpenReview Forum', url: 'https://openreview.net/forum?id=fibxvahvs3' }
      ]
    },
    {
      title: 'H2O.ai Performance & Analysis',
      items: [
        { title: 'H2O.ai Tops GAIA Leaderboard: New Era of AI Agents', url: 'https://h2o.ai/blog/2024/h2o-ai-tops-gaia-leaderboard/' },
        { title: 'H2O.ai Achieves 75% on GAIA - First C Grade (2025)', url: 'https://h2o.ai/blog/2025/h2o-ai-tops-the-general-ai-assistant-test/' },
        { title: 'AI Only 30% Away from Human-Level General Intelligence', url: 'https://www.businesswire.com/news/home/20241223840924/en/AI-is-Only-30-Away-From-Matching-Human-Level-General-Intelligence-on-GAIA-Benchmark' },
        { title: 'Yahoo Finance: GAIA Benchmark Milestone Coverage', url: 'https://finance.yahoo.com/news/ai-only-30-away-matching-221400245.html' }
      ]
    },
    {
      title: 'Analysis & Industry Coverage',
      items: [
        { title: 'Towards Data Science: GAIA - The LLM Agent Benchmark Everyone\'s Talking About', url: 'https://towardsdatascience.com/gaia-the-llm-agent-benchmark-everyones-talking-about/' },
        { title: 'VentureBeat: GAIA Benchmark Next-Gen AI Challenges', url: 'https://venturebeat.com/ai/the-gaia-benchmark-next-gen-ai-faces-off-against-real-world-challenges/' },
        { title: 'MarkTechPost: GAIA Defining Next Milestone in General AI', url: 'https://www.marktechpost.com/2023/11/28/this-ai-research-introduces-gaia-a-benchmark-defining-the-next-milestone-in-general-ai-proficiency/' },
        { title: 'WorkOS: GAIA Benchmark for Evaluating Intelligent Agents', url: 'https://workos.com/blog/gaia-benchmark-evaluating-intelligent-agents' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Real-world question benchmark requiring fundamental abilities like reasoning, multi-modality, web browsing, and tool-use proficiency"
        why="Conceptually simple for humans yet challenging for AI - tests gap between human (92%) and current best AI (65%) performance"
        keyInsight="H2O.ai h2oGPTe leads at 65% accuracy, outperforming Google (49%), Microsoft (38%) - first to achieve C-grade on general intelligence"
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

export default GaiaBenchmarkDetails;