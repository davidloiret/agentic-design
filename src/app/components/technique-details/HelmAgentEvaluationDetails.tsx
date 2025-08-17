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

interface HelmAgentEvaluationDetailsProps {
  selectedTechnique: any;
}

export const HelmAgentEvaluationDetails: React.FC<HelmAgentEvaluationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Install', detail: 'pip install crfm-helm for holistic evaluation framework' },
      { num: '2', action: 'Configure', detail: 'Set up scenarios across 16 core domains with 7 metrics' },
      { num: '3', action: 'Evaluate', detail: 'Run comprehensive assessment including multimodal and tool use' },
      { num: '4', action: 'Analyze', detail: 'Review holistic metrics beyond accuracy (fairness, robustness, etc.)' },
      { num: '5', action: 'Compare', detail: 'Benchmark against 30+ models with standardized evaluation' }
    ],
    example: 'helm-run --model gpt-4 --scenarios core --metrics all --output evaluation_report.json'
  };

  // The 7 Core Metrics in Detail
  const sevenMetrics = [
    { num: '1', name: 'Accuracy', description: 'Traditional performance measurement across task scenarios' },
    { num: '2', name: 'Calibration', description: 'Whether the model knows what it doesn\'t know - confidence alignment' },
    { num: '3', name: 'Robustness', description: 'Performance under perturbations (e.g., typos, input variations)' },
    { num: '4', name: 'Fairness', description: 'Performance consistency across different groups and demographics' },
    { num: '5', name: 'Bias', description: 'Systematic unfairness detection in model outputs and decisions' },
    { num: '6', name: 'Toxicity', description: 'Generation of harmful, offensive, or dangerous content' },
    { num: '7', name: 'Efficiency', description: 'Computational resource usage and inference speed optimization' }
  ];

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Evaluate across all 7 metrics, not just accuracy for holistic assessment', icon: '✅' },
    { type: 'do', text: 'Use standardized scenarios (16 core + 26 targeted) for consistency', icon: '✅' },
    { type: 'do', text: 'Include multimodal and tool use capabilities in evaluation', icon: '✅' },
    { type: 'do', text: 'Test robustness with perturbations and fairness across groups', icon: '✅' },
    { type: 'do', text: 'Leverage HELM Lite for streamlined yet comprehensive evaluation', icon: '✅' },
    { type: 'dont', text: 'Focus solely on accuracy - other metrics reveal critical trade-offs', icon: '❌' },
    { type: 'dont', text: 'Skip calibration testing if model exposes probability outputs', icon: '❌' },
    { type: 'dont', text: 'Ignore efficiency metrics for production deployment decisions', icon: '❌' },
    { type: 'dont', text: 'Use custom scenarios without standardized comparison baselines', icon: '❌' },
    { type: 'dont', text: 'Overlook bias and toxicity assessment for responsible deployment', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Comprehensive model comparison across multiple dimensions',
      'Academic research requiring standardized evaluation',
      'Enterprise deployment decisions needing holistic assessment',
      'Responsible AI evaluation including bias and toxicity',
      'Multi-modal agent capability assessment'
    ],
    avoidWhen: [
      'Quick single-metric performance checks',
      'Domain-specific benchmarks outside HELM scenarios',
      'Real-time evaluation needs (computationally intensive)',
      'Custom evaluation scenarios without standardization needs',
      'Budget-constrained evaluation (requires significant compute)'
    ]
  };

  // Key Metrics (Extended for Agent Evaluation)
  const keyMetrics = [
    { metric: 'Holistic Score', measure: 'Aggregate performance across all 7 dimensions' },
    { metric: 'Scenario Coverage', measure: 'Performance across 16 core + 26 targeted scenarios' },
    { metric: 'Trade-off Analysis', measure: 'Correlation patterns between different metrics' },
    { metric: 'Multimodal Capability', measure: 'Text-to-image and vision-language performance' },
    { metric: 'Tool Use Proficiency', measure: 'External API integration and plugin effectiveness' },
    { metric: 'Simulation Environment Success', measure: 'End-to-end task completion in realistic settings' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Academic Model Comparison: Standardized evaluation across 30+ models with transparent methodology',
    'Enterprise AI Selection: Holistic assessment beyond accuracy for responsible deployment decisions',
    'Responsible AI Development: Comprehensive bias, fairness, and toxicity evaluation frameworks',
    'Multimodal Agent Testing: Vision-language and tool use capability assessment for complex applications',
    'Research Benchmarking: Reproducible evaluation framework for foundation model research publications'
  ];

  const references = [
    {
      title: 'Official HELM Resources',
      items: [
        { title: 'HELM GitHub Repository (Stanford CRFM)', url: 'https://github.com/stanford-crfm/helm' },
        { title: 'Holistic Evaluation of Language Models (arXiv:2211.09110)', url: 'https://arxiv.org/abs/2211.09110' },
        { title: 'HELM Official Website', url: 'https://crfm.stanford.edu/helm/' },
        { title: 'HELM Documentation', url: 'https://crfm-helm.readthedocs.io/en/latest/' }
      ]
    },
    {
      title: 'HELM Extensions & Updates',
      items: [
        { title: 'HELM Lite: Lightweight Yet Broad Benchmark (Stanford CRFM 2023)', url: 'https://crfm.stanford.edu/2023/12/19/helm-lite.html' },
        { title: 'MedHELM: Medical Domain Evaluation Extension', url: 'https://github.com/stanford-crfm/helm/blob/main/docs/medhelm.md' },
        { title: 'Everything About HELM - Comprehensive Guide (Medium)', url: 'https://prajnaaiwisdom.medium.com/everything-you-need-to-know-about-helm-the-stanford-holistic-evaluation-of-language-models-f921b61160f3' },
        { title: 'HELM Installation and Setup Guide', url: 'https://github.com/stanford-crfm/helm/blob/main/docs/installation.md' }
      ]
    },
    {
      title: 'Research & Analysis',
      items: [
        { title: 'Holistic Evaluation Paper (OpenReview)', url: 'https://openreview.net/forum?id=iO4LZibEqW' },
        { title: 'HELM Research Paper (ResearchGate)', url: 'https://www.researchgate.net/publication/371046714_Holistic_Evaluation_of_Language_Models' },
        { title: 'HELM Paper (Annals of NY Academy of Sciences)', url: 'https://nyaspubs.onlinelibrary.wiley.com/doi/abs/10.1111/nyas.15007' },
        { title: 'Stanford CRFM Research Publications', url: 'https://crfm.stanford.edu/research.html' }
      ]
    },
    {
      title: 'Enterprise & Industry Applications',
      items: [
        { title: 'HELM Enterprise LLM Evaluation (Snorkel AI)', url: 'https://snorkel.ai/blog/crfm-s-helm-and-enterprise-llm-evaluation-beyond-accuracy/' },
        { title: 'HELM Glossary and Overview (Klu.ai)', url: 'https://klu.ai/glossary/helm-eval' },
        { title: 'Emergence AI Appropriateness Evaluation Model', url: 'https://www.emergence.ai/blog/emergence-appropriateness-evaluation' },
        { title: 'Center for Research on Foundation Models', url: 'https://crfm.stanford.edu/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Stanford CRFM's holistic framework evaluating agents across 7 metrics and 42 scenarios"
        why="Moves beyond accuracy to comprehensive assessment including fairness, robustness, and efficiency trade-offs"
        keyInsight="Reveals critical trade-offs between metrics and ensures non-accuracy dimensions aren't second-class citizens"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      {/* The 7 Core Metrics Section */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          The 7 Core Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sevenMetrics.map((metric) => (
            <div key={metric.num} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {metric.num}
                </div>
                <h3 className="font-semibold text-white text-sm leading-tight">{metric.name}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed ml-11">{metric.description}</p>
            </div>
          ))}
        </div>
      </section>

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

export default HelmAgentEvaluationDetails;