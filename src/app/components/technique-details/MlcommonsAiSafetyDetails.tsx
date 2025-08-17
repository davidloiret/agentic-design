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

interface MlcommonsAiSafetyDetailsProps {
  selectedTechnique: any;
}

export const MlcommonsAiSafetyDetails: React.FC<MlcommonsAiSafetyDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Install', detail: 'pip install modelbench' },
      { num: '2', action: 'Configure', detail: 'Set up model endpoints & credentials' },
      { num: '3', action: 'Select', detail: 'Choose hazard categories to test' },
      { num: '4', action: 'Run', detail: 'Execute benchmark against SUT' },
      { num: '5', action: 'Analyze', detail: 'Review safety scores & violations' }
    ],
    example: 'modelbench run --model gpt-4 --hazards all --output safety_report.json'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all 13 hazard categories for comprehensive assessment', icon: '✅' },
    { type: 'do', text: 'Use hidden test sets to prevent overfitting to known prompts', icon: '✅' },
    { type: 'do', text: 'Establish baseline with reference models before deployment', icon: '✅' },
    { type: 'do', text: 'Implement continuous monitoring with periodic re-testing', icon: '✅' },
    { type: 'do', text: 'Document safety policies and incident response procedures', icon: '✅' },
    { type: 'dont', text: 'Rely solely on v0.5 POC results for production decisions', icon: '❌' },
    { type: 'dont', text: 'Skip testing in multiple languages for global deployment', icon: '❌' },
    { type: 'dont', text: 'Ignore contextual factors affecting safety assessment', icon: '❌' },
    { type: 'dont', text: 'Assume benchmark results guarantee complete safety', icon: '❌' },
    { type: 'dont', text: 'Use only automated assessment without human review', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Pre-deployment safety validation',
      'Regulatory compliance requirements',
      'Comparing model safety performance',
      'Establishing safety baselines',
      'Multi-language deployment planning'
    ],
    avoidWhen: [
      'Multi-modal model assessment (not supported)',
      'Agent-based systems evaluation',
      'Real-time safety monitoring only',
      'Non-English only deployment (v1.0 limited)',
      'Specialized domain-specific safety needs'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Overall Safety Score', measure: '5-point scale (Poor to Excellent)' },
    { metric: 'Per-Hazard Performance', measure: '% violations per category' },
    { metric: 'Violation Rate', measure: 'Harmful responses / total prompts' },
    { metric: 'Reference Model Comparison', measure: 'Relative safety vs baseline' },
    { metric: 'Hidden Test Performance', measure: 'Safety on undisclosed prompts' },
    { metric: 'Language Parity', measure: 'Consistency across supported languages' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Model Safety Certification: Pre-deployment validation for chat-based LLMs with standardized scoring',
    'Regulatory Compliance: EU AI Act, NIST frameworks requiring documented safety assessment',
    'Model Comparison: Objective safety benchmarking across different LLM providers and versions',
    'Continuous Monitoring: Periodic re-evaluation to detect safety regression over time',
    'Multi-language Safety: Validation across English, French, Chinese, Hindi deployments'
  ];

  const references = [
    {
      title: 'Official MLCommons Resources',
      items: [
        { title: 'MLCommons AI Safety Benchmark v1.0 Release', url: 'https://mlcommons.org/ai-safety/' },
        { title: 'Introducing v0.5 of the AI Safety Benchmark (arXiv:2404.12241)', url: 'https://arxiv.org/abs/2404.12241' },
        { title: 'MLCommons AI Safety Working Group Progress Report', url: 'https://mlcommons.org/2024/07/mlc-ais-v1-0-progress/' },
        { title: 'ModelBench Tool Documentation', url: 'https://github.com/mlcommons/modelgauge' }
      ]
    },
    {
      title: 'Academic Research & Validation',
      items: [
        { title: 'AI Safety Benchmark Taxonomy Development (MLCommons 2024)', url: 'https://arxiv.org/html/2404.12241v1' },
        { title: 'Safetywashing: Do AI Safety Benchmarks Actually Measure Safety Progress? (NeurIPS 2024)', url: 'https://arxiv.org/abs/2407.21792' },
        { title: 'HELM Framework Integration for Safety Assessment', url: 'https://crfm.stanford.edu/helm/' },
        { title: 'Industry Standards for AI Safety Evaluation (IEEE 2024)', url: 'https://standards.ieee.org/ieee/2857/7835/' }
      ]
    },
    {
      title: 'Implementation & Tools',
      items: [
        { title: 'ModelBench GitHub Repository', url: 'https://github.com/mlcommons/modelgauge' },
        { title: 'MLCommons AI Safety Platform', url: 'https://modelbench.ai/' },
        { title: 'OpenAI Safety Evaluation Integration Guide', url: 'https://platform.openai.com/docs/guides/safety-best-practices' },
        { title: 'Anthropic Constitutional AI Safety Testing', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback' }
      ]
    },
    {
      title: 'Regulatory & Standards',
      items: [
        { title: 'NIST AI Risk Management Framework Integration', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        { title: 'EU AI Act Safety Assessment Requirements', url: 'https://artificialintelligenceact.eu/' },
        { title: 'ISO/IEC 23053:2022 Framework for AI Risk Management', url: 'https://www.iso.org/standard/74438.html' },
        { title: 'Partnership on AI Safety Tenets', url: 'https://partnershiponai.org/tenets/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Standardized safety assessment across 13 hazard categories with 5-point grading system"
        why="Provides objective, reproducible safety evaluation for regulatory compliance and deployment decisions"
        keyInsight="Industry-standard benchmark with hidden test sets and multi-language support for comprehensive safety validation"
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

export default MlcommonsAiSafetyDetails;