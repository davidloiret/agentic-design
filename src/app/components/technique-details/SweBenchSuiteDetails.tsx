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

interface SweBenchSuiteDetailsProps {
  selectedTechnique: any;
}

export const SweBenchSuiteDetails: React.FC<SweBenchSuiteDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Install SWE-bench evaluation framework and dependencies' },
      { num: '2', action: 'Select', detail: 'Choose variant: SWE-bench (2,294 issues), Verified (500), Live (1,319), or Multimodal (517)' },
      { num: '3', action: 'Configure', detail: 'Set up GitHub repository access and test environment' },
      { num: '4', action: 'Evaluate', detail: 'Run agent on real GitHub issues from 12+ popular Python repositories' },
      { num: '5', action: 'Assess', detail: 'Measure patch generation success and functional correctness' }
    ],
    example: 'swe_bench = SWEBench(variant="verified", repos=["django", "flask"], model=coding_agent, timeout=1800)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use SWE-bench Verified (500 issues) for reliable human-validated evaluation', icon: '✅' },
    { type: 'do', text: 'Test on multiple repository types (Django, Flask, Requests, Matplotlib, etc.)', icon: '✅' },
    { type: 'do', text: 'Monitor for data contamination - many issues predate model training cutoffs', icon: '✅' },
    { type: 'do', text: 'Include multimodal variant (517 issues) for visual debugging tasks', icon: '✅' },
    { type: 'do', text: 'Use SWE-bench Live for contamination-free evaluation with post-2024 issues', icon: '✅' },
    { type: 'dont', text: 'Rely solely on original SWE-bench - 32.67% have solution leakage issues', icon: '❌' },
    { type: 'dont', text: 'Ignore patch correctness validation - weak test cases affect 31% of results', icon: '❌' },
    { type: 'dont', text: 'Skip repository-specific setup requirements and dependency management', icon: '❌' },
    { type: 'dont', text: 'Assume high scores without validating actual problem-solving capability', icon: '❌' },
    { type: 'dont', text: 'Overlook visual elements in multimodal issues requiring image interpretation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evaluating coding agents on real-world software engineering tasks',
      'Benchmarking GitHub issue resolution capabilities',
      'Testing automated patch generation and bug fixing',
      'Assessing multi-repository code understanding',
      'Research on LLM software engineering performance'
    ],
    avoidWhen: [
      'Simple coding task evaluation (use HumanEval instead)',
      'Non-Python programming language assessment',
      'Rapid prototyping evaluation without full repository context',
      'Educational coding exercises rather than real bugs',
      'Time-sensitive evaluations (can take hours per issue)'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: '% Resolved (Primary)', measure: 'Percentage of GitHub issues successfully resolved with working patches' },
    { metric: 'Pass@k Success Rate', measure: 'Success rate across k attempts (typically k=1)' },
    { metric: 'Functional Correctness', measure: 'Patches that actually fix the issue without breaking existing tests' },
    { metric: 'Repository Coverage', measure: 'Performance across 12+ diverse Python repositories' },
    { metric: 'Solution Quality', measure: 'Patch elegance, maintainability, and adherence to coding standards' },
    { metric: 'Time to Resolution', measure: 'Average time taken to generate working patches' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Industry Standard Evaluation: Primary benchmark for coding LLMs like Claude 3.5 Sonnet (49% on Verified)',
    'Academic Research: Princeton/CMU framework for LLM software engineering capability assessment',
    'Production Readiness Testing: Validating AI coding assistants on real GitHub issues before deployment',
    'Automated Debugging: Testing AI agents\' ability to understand, analyze, and fix complex software bugs',
    'Multi-Repository Assessment: Evaluating code understanding across Django, Flask, Matplotlib, Requests, and more'
  ];

  const references = [
    {
      title: 'Original SWE-bench Research',
      items: [
        { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (arXiv:2310.06770)', url: 'https://arxiv.org/abs/2310.06770' },
        { title: 'Princeton Language and Intelligence - SWE-bench Blog', url: 'https://pli.princeton.edu/blog/2023/swe-bench-can-language-models-resolve-real-world-github-issues' },
        { title: 'SWE-bench GitHub Repository', url: 'https://github.com/princeton-nlp/SWE-bench' },
        { title: 'SWE-bench Hugging Face Dataset', url: 'https://huggingface.co/datasets/princeton-nlp/SWE-bench' }
      ]
    },
    {
      title: 'SWE-bench Variants & Extensions',
      items: [
        { title: 'Introducing SWE-bench Verified - OpenAI (2024)', url: 'https://openai.com/index/introducing-swe-bench-verified/' },
        { title: 'SWE-bench Multimodal: Visual Software Domains (arXiv:2410.03859)', url: 'https://arxiv.org/abs/2410.03859' },
        { title: 'SWE-Bench+: Enhanced Coding Benchmark (arXiv:2410.06992)', url: 'https://arxiv.org/abs/2410.06992' },
        { title: 'SWE-bench Live Leaderboard', url: 'https://swe-bench-live.github.io/' }
      ]
    },
    {
      title: 'Performance Analysis & Criticism',
      items: [
        { title: 'The SWE-Bench Illusion: When LLMs Remember Instead of Reason (arXiv:2506.12286)', url: 'https://arxiv.org/abs/2506.12286' },
        { title: 'Claude 3.5 Sonnet SWE-bench Performance - Anthropic', url: 'https://www.anthropic.com/research/swe-bench-sonnet' },
        { title: 'Cognition SWE-bench Technical Report', url: 'https://cognition.ai/blog/swe-bench-technical-report' },
        { title: 'All-Hands.dev: LLM Evaluation on SWE-bench at 30x Speed', url: 'https://www.all-hands.dev/blog/evaluation-of-llms-as-coding-agents-on-swe-bench-at-30x-speed' }
      ]
    },
    {
      title: 'Official Leaderboards & Tools',
      items: [
        { title: 'SWE-bench Official Leaderboards', url: 'https://www.swebench.com/' },
        { title: 'SWE-bench Results Viewer', url: 'https://www.swebench.com/viewer.html' },
        { title: 'SWE-bench Multimodal Evaluation', url: 'https://www.swebench.com/multimodal.html' },
        { title: 'SWE-bench Documentation', url: 'https://www.swebench.com/SWE-bench/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive software engineering benchmark suite evaluating LLM agents on real GitHub issues across multiple variants"
        why="Industry standard for testing automated coding capabilities using 2,294+ authentic software bugs from popular Python repositories"
        keyInsight="Claude 3.5 Sonnet achieves 49% on Verified (500 issues) while original benchmark has 32.67% solution leakage - variant selection critical"
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

export default SweBenchSuiteDetails;