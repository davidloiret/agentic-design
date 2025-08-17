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

interface MlrBenchDetailsProps {
  selectedTechnique: any;
}

export const MlrBenchDetails: React.FC<MlrBenchDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Clone', detail: 'git clone MLR-Bench repository from GitHub' },
      { num: '2', action: 'Setup', detail: 'Install dependencies and configure MLR-Agent scaffold' },
      { num: '3', action: 'Select', detail: 'Choose from 201 research tasks across 9 ML domains' },
      { num: '4', action: 'Execute', detail: 'Run agent through 4-stage research pipeline' },
      { num: '5', action: 'Evaluate', detail: 'Use MLR-Judge for automated assessment' }
    ],
    example: 'python run_mlr_bench.py --task llm_safety --agent claude_code --stages all'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all 9 ML research domains for comprehensive assessment', icon: '✅' },
    { type: 'do', text: 'Use MLR-Judge automated evaluation with structured review rubrics', icon: '✅' },
    { type: 'do', text: 'Follow the complete 4-stage research pipeline (idea → code → analysis → paper)', icon: '✅' },
    { type: 'do', text: 'Validate results with human expert reviewers from major conferences', icon: '✅' },
    { type: 'do', text: 'Focus on coding agent capabilities - major bottleneck identified', icon: '✅' },
    { type: 'dont', text: 'Skip proper environment setup for research task execution', icon: '❌' },
    { type: 'dont', text: 'Ignore coding failures - they prevent downstream research quality', icon: '❌' },
    { type: 'dont', text: 'Rely only on automated evaluation without human validation', icon: '❌' },
    { type: 'dont', text: 'Test on single domain - research requires cross-domain capabilities', icon: '❌' },
    { type: 'dont', text: 'Overlook novelty and significance in favor of technical soundness only', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating AI research automation capabilities',
      'Testing scientific discovery and innovation potential',
      'Benchmarking against real-world research tasks',
      'Assessing complete research pipeline performance',
      'Academic and industry R&D agent development'
    ],
    avoidWhen: [
      'Simple coding or data analysis tasks only',
      'Non-research domain evaluation',
      'Quick capability demonstration needs',
      'Resource-constrained environments (requires full research stack)',
      'Domains outside core ML research areas'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Overall Research Quality', measure: 'Composite score across 5 evaluation dimensions' },
    { metric: 'Stage-wise Performance', measure: 'Success rate in idea, code, analysis, writing stages' },
    { metric: 'Domain-specific Scores', measure: 'Performance across 9 ML research areas' },
    { metric: 'MLR-Judge Alignment', measure: 'Correlation with human expert reviewers' },
    { metric: 'Innovation Index', measure: 'Novelty and significance of generated research' },
    { metric: 'Technical Soundness', measure: 'Code quality and experimental validity' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Research Automation Assessment: Evaluating AI agents on complete ML research pipeline from idea to publication',
    'Scientific Discovery Benchmarking: Testing innovation capabilities across LLMs, AI4Science, ML Theory domains',
    'Academic Agent Development: Building AI researchers capable of conducting workshop-level research',
    'Research Productivity Tools: Measuring effectiveness of AI assistance in scientific research workflows',
    'Conference Review Simulation: Training agents to conduct peer review and research evaluation'
  ];

  const references = [
    {
      title: 'Official Paper & Resources',
      items: [
        { title: 'MLR-Bench: Evaluating AI Agents on Open-Ended Machine Learning Research (arXiv:2505.19955)', url: 'https://arxiv.org/abs/2505.19955' },
        { title: 'MLR-Bench HTML Version', url: 'https://arxiv.org/html/2505.19955' },
        { title: 'Literature Review by AI Paper Reviews', url: 'https://www.themoonlight.io/en/review/mlr-bench-evaluating-ai-agents-on-open-ended-machine-learning-research' },
        { title: 'MLR-Bench GitHub Repository (Open Source)', url: 'https://github.com/mlr-bench/mlr-bench' }
      ]
    },
    {
      title: 'Related Research Benchmarks',
      items: [
        { title: 'ML-Bench: Repository-Level Machine Learning Tasks (ICLR 2025)', url: 'https://arxiv.org/abs/2311.09835' },
        { title: 'EXP-Bench: Can AI Conduct AI Research Experiments?', url: 'https://arxiv.org/abs/2505.24785' },
        { title: 'MLRC-Bench: Machine Learning Research Challenges', url: 'https://arxiv.org/abs/2504.09702' },
        { title: 'ResearchTown: Human Research Community Simulator', url: 'https://arxiv.org/abs/2412.17767' }
      ]
    },
    {
      title: 'Conference & Workshop Sources',
      items: [
        { title: 'NeurIPS Workshop Papers Database', url: 'https://nips.cc/Conferences/2024/Schedule?type=Workshop' },
        { title: 'ICLR Workshop Proceedings', url: 'https://iclr.cc/Conferences/2024/Schedule?type=Workshop' },
        { title: 'ICML Workshop Papers', url: 'https://icml.cc/Conferences/2024/Schedule?type=Workshop' },
        { title: 'Machine Learning Research Best Practices (MLSys)', url: 'https://mlsys.org/Conferences/2024' }
      ]
    },
    {
      title: 'Evaluation & Review Standards',
      items: [
        { title: 'OpenReview Platform for Scientific Peer Review', url: 'https://openreview.net/' },
        { title: 'Guidelines for Reproducible Research (Nature)', url: 'https://www.nature.com/articles/d41586-019-01506-x' },
        { title: 'ML Conference Review Criteria (NeurIPS)', url: 'https://nips.cc/Conferences/2024/CallForPapers' },
        { title: 'Scientific Writing and Review Standards (IEEE)', url: 'https://www.ieee.org/conferences/publishing/templates.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive benchmark with 201 real-world ML research tasks from top-tier conferences"
        why="Evaluates complete research pipeline from idea generation to paper writing with automated and human validation"
        keyInsight="Current SOTA models excel at ideas and writing but struggle with coding, limiting scientific innovation"
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

export default MlrBenchDetails;