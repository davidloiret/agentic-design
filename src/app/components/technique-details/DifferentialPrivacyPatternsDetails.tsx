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

interface DifferentialPrivacyPatternsDetailsProps {
  selectedTechnique: any;
}

export const DifferentialPrivacyPatternsDetails: React.FC<DifferentialPrivacyPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Privacy Budget', detail: 'Define epsilon (ε) privacy parameter' },
      { num: '2', action: 'Sensitivity Analysis', detail: 'Calculate query sensitivity bounds' },
      { num: '3', action: 'Noise Mechanism', detail: 'Apply Laplace/Gaussian noise injection' },
      { num: '4', action: 'Composition', detail: 'Track cumulative privacy expenditure' },
      { num: '5', action: 'Utility Validation', detail: 'Verify statistical utility preservation' }
    ],
    example: 'privacy_budget → sensitivity_analysis → noise_injection → composition_tracking → utility_validation'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Set appropriate epsilon values for privacy requirements', icon: '✅' },
    { type: 'do', text: 'Use proven noise mechanisms (Laplace, Gaussian, Exponential)', icon: '✅' },
    { type: 'do', text: 'Track privacy budget expenditure across all queries', icon: '✅' },
    { type: 'do', text: 'Apply post-processing invariance for utility improvements', icon: '✅' },
    { type: 'do', text: 'Validate statistical utility after noise injection', icon: '✅' },
    { type: 'dont', text: 'Use the same noise instance across multiple queries', icon: '❌' },
    { type: 'dont', text: 'Exceed privacy budget without proper composition', icon: '❌' },
    { type: 'dont', text: 'Ignore sensitivity bounds for unbounded queries', icon: '❌' },
    { type: 'dont', text: 'Apply differential privacy to already aggregated data', icon: '❌' },
    { type: 'dont', text: 'Skip formal privacy analysis for custom mechanisms', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Sensitive data processing',
      'Statistical analysis publication',
      'Federated learning systems',
      'Regulatory compliance requirements'
    ],
    avoidWhen: [
      'Public data analysis',
      'Single-user private datasets',
      'Perfect accuracy requirements',
      'Non-statistical computations'
    ]
  };

  const keyMetrics = [
    { metric: 'Privacy Guarantee', measure: 'Epsilon (ε) differential privacy level' },
    { metric: 'Statistical Utility', measure: '% accuracy preservation post-noise' },
    { metric: 'Privacy Budget Usage', measure: 'Cumulative ε consumption rate' },
    { metric: 'Query Sensitivity', measure: 'Maximum individual contribution' },
    { metric: 'Composition Efficiency', measure: 'Privacy cost optimization' },
    { metric: 'Noise Calibration Accuracy', measure: 'Correct noise scale application' }
  ];

  const topUseCases = [
    'Healthcare Analytics: Patient record analysis with HIPAA compliance and privacy guarantees',
    'Census Data: Population statistics publication with individual privacy protection',
    'Financial Research: Transaction pattern analysis without customer identification',
    'Education Analytics: Student performance studies with privacy preservation',
    'Location Services: Aggregate mobility insights without individual tracking'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Differential Privacy (Dwork, 2006) - Original Paper', url: 'https://link.springer.com/chapter/10.1007/11787006_1' },
        { title: 'The Algorithmic Foundations of Differential Privacy (Dwork & Roth)', url: 'https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf' },
        { title: 'Deep Learning with Differential Privacy (Abadi et al., 2016)', url: 'https://arxiv.org/abs/1607.00133' },
        { title: 'Composition Theorems for Differential Privacy (Kairouz et al.)', url: 'https://arxiv.org/abs/1311.0776' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google Differential Privacy Library', url: 'https://github.com/google/differential-privacy' },
        { title: 'Apple Differential Privacy Technical Overview', url: 'https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf' },
        { title: 'Microsoft SmartNoise - Differential Privacy Platform', url: 'https://github.com/opendp/smartnoise-core' },
        { title: 'OpenMined PyDP - Python Differential Privacy', url: 'https://github.com/openmined/PyDP' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'IBM Diffprivlib - Python Library', url: 'https://github.com/IBM/differential-privacy-library' },
        { title: 'TensorFlow Privacy - DP Machine Learning', url: 'https://github.com/tensorflow/privacy' },
        { title: 'Opacus - PyTorch Differential Privacy', url: 'https://github.com/pytorch/opacus' },
        { title: 'PipelineDP - Go/Python DP Framework', url: 'https://github.com/google/differential-privacy/tree/main/pipelinedp' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Theory and Practice of Differential Privacy Workshop', url: 'https://tpdp.journalprivacyconfidentiality.org/' },
        { title: 'Privacy in Statistical Databases Conference', url: 'https://www.springer.com/series/558' },
        { title: 'OpenMined Privacy Community', url: 'https://www.openmined.org/' },
        { title: 'Differential Privacy Google Group', url: 'https://groups.google.com/g/differential-privacy' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Privacy-preserving data processing with mathematical privacy guarantees through controlled noise injection"
        why="Provides formal privacy guarantees, enables safe data sharing, supports regulatory compliance, and maintains statistical utility"
        keyInsight="Calibrated noise + sensitivity bounds + privacy budget → mathematically guaranteed privacy"
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

export default DifferentialPrivacyPatternsDetails;