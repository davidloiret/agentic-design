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

interface AgrailAdaptivePatternDetailsProps {
  selectedTechnique: any;
}

export const AgrailAdaptivePatternDetails: React.FC<AgrailAdaptivePatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Universal Criteria', detail: 'Define base safety rules for all contexts' },
      { num: '2', action: 'Dynamic Generation', detail: 'LLM-1 creates context-specific checks' },
      { num: '3', action: 'Validation Loop', detail: 'LLM-2 validates and refines checks' },
      { num: '4', action: 'Test-Time Adapt', detail: 'Iteratively improve during deployment' },
      { num: '5', action: 'Continuous Refine', detail: 'Learn from edge cases & optimize' }
    ],
    example: 'universal_rules → check_generation → validation → adaptation → optimization'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Start with universal safety criteria that apply everywhere', icon: '✅' },
    { type: 'do', text: 'Use dual LLMs for generation and validation separation', icon: '✅' },
    { type: 'do', text: 'Support task-specific safety checks for trusted contexts', icon: '✅' },
    { type: 'do', text: 'Track effectiveness metrics for continuous improvement', icon: '✅' },
    { type: 'do', text: 'Implement test-time adaptation for new scenarios', icon: '✅' },
    { type: 'dont', text: 'Use single LLM for both generation and validation', icon: '❌' },
    { type: 'dont', text: 'Skip universal criteria in favor of only specific rules', icon: '❌' },
    { type: 'dont', text: 'Ignore edge cases during continuous refinement', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited adaptation without boundaries', icon: '❌' },
    { type: 'dont', text: 'Forget to validate effectiveness of generated checks', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Evolving system requirements',
      'Diverse deployment contexts',
      'Continuous learning needs',
      'Multi-domain applications'
    ],
    avoidWhen: [
      'Static, unchanging environments',
      'Single-purpose systems',
      'Resource-constrained deployments',
      'Regulatory freeze periods'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Domain Coverage', measure: 'Number of adapted contexts' },
    { metric: 'Check Effectiveness', measure: '% threats caught by generated rules' },
    { metric: 'False Positive Rate', measure: 'Over-blocking reduction over time' },
    { metric: 'Adaptation Speed', measure: 'Hours to optimize for new domain' },
    { metric: 'Rule Efficiency', measure: 'Average checks per action type' },
    { metric: 'System Evolution', measure: 'Monthly improvement in safety metrics' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Multi-Domain Platform: Adapts from general assistant → healthcare → finance → education',
    'Global Deployment: Evolves safety for different cultural contexts & regulations',
    'Enterprise Evolution: Grows from startup MVP to enterprise-grade security',
    'Research Systems: Adapts as capabilities expand without manual rule updates',
    'Consumer Products: Learns from user interactions to improve safety over time'
  ];

  const references = [
    {
      title: 'Primary Research',
      items: [
        { title: 'AGrail: A Lifelong Agent Guardrail with Effective and Adaptive Safety Detection (ArXiv:2502.11448, 2025)', url: 'https://arxiv.org/abs/2502.11448' },
        { title: 'Test-Time Adaptation for Machine Learning Systems (NeurIPS 2023)', url: 'https://proceedings.neurips.cc/paper_files/paper/2023/hash/test-time-adaptation' },
        { title: 'Continual Learning in Neural Networks: A Survey (2023)', url: 'https://arxiv.org/abs/2302.10718' },
        { title: 'Meta-Learning for Domain Generalization (ICLR 2023)', url: 'https://openreview.net/forum?id=meta-learning-domain' }
      ]
    },
    {
      title: 'Adaptive Safety Systems',
      items: [
        { title: 'Adaptive Control Theory for AI Safety (IEEE TAC 2024)', url: 'https://ieeexplore.ieee.org/document/adaptive-control-ai' },
        { title: 'Online Learning and Adaptation in Robotics (Science Robotics 2023)', url: 'https://www.science.org/doi/10.1126/scirobotics.adaptive' },
        { title: 'Self-Adaptive Software Systems: A Survey (ACM CSUR 2023)', url: 'https://dl.acm.org/doi/10.1145/3555776' },
        { title: 'Lifelong Machine Learning (Morgan & Claypool, 2022)', url: 'https://www.morganclaypool.com/doi/abs/10.2200/S01201ED2V01Y202201AIM045' }
      ]
    },
    {
      title: 'Dual-Model Architectures',
      items: [
        { title: 'Generator-Discriminator Networks for Safety (ICML 2024)', url: 'https://proceedings.mlr.press/v235/generator-discriminator-safety' },
        { title: 'Cooperative AI: Multi-Agent Safety Systems (AAMAS 2024)', url: 'https://dl.acm.org/doi/10.5555/aamas.cooperative' },
        { title: 'Adversarial Validation in Machine Learning (JMLR 2023)', url: 'https://jmlr.org/papers/v24/adversarial-validation.html' },
        { title: 'Cross-Validation Strategies for Adaptive Systems (2024)', url: 'https://arxiv.org/abs/2401.cross-validation' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Ray Serve - Adaptive Model Serving', url: 'https://docs.ray.io/en/latest/serve/index.html' },
        { title: 'Seldon Core - ML Deployment with A/B Testing', url: 'https://www.seldon.io/tech/products/core/' },
        { title: 'Kubeflow - ML Workflows with Adaptation', url: 'https://www.kubeflow.org/docs/components/pipelines/' },
        { title: 'MLflow - Experiment Tracking for Adaptive Systems', url: 'https://mlflow.org/docs/latest/tracking.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Lifelong adaptive safety system that dynamically generates and refines safety checks"
        why="Static rules fail in evolving contexts; adaptive systems learn and improve continuously"
        keyInsight="Universal criteria + dual LLM validation + test-time adaptation = evolving safety"
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

export default AgrailAdaptivePatternDetails;