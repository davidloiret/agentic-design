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

interface DataAnonymizationPatternsDetailsProps {
  selectedTechnique: any;
}

export const DataAnonymizationPatternsDetails: React.FC<DataAnonymizationPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Data Classification', detail: 'Identify PII, quasi-identifiers, sensitive attributes' },
      { num: '2', action: 'Anonymization Method', detail: 'K-anonymity, L-diversity, T-closeness selection' },
      { num: '3', action: 'Synthetic Generation', detail: 'GAN-based or statistical synthetic data' },
      { num: '4', action: 'Federated Processing', detail: 'Distributed anonymization across agents' },
      { num: '5', action: 'Utility Validation', detail: 'Privacy-utility trade-off assessment' }
    ],
    example: 'data_classification → anonymization_method → synthetic_generation → federated_processing → utility_validation'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement k-anonymity with minimum k=5 for basic protection', icon: '✅' },
    { type: 'do', text: 'Use synthetic data generation for high-risk PII scenarios', icon: '✅' },
    { type: 'do', text: 'Apply federated anonymization for multi-agent environments', icon: '✅' },
    { type: 'do', text: 'Combine multiple techniques (L-diversity + T-closeness)', icon: '✅' },
    { type: 'do', text: 'Regular re-identification risk assessment and testing', icon: '✅' },
    { type: 'dont', text: 'Rely solely on data masking without anonymization models', icon: '❌' },
    { type: 'dont', text: 'Use simple generalization that destroys data utility', icon: '❌' },
    { type: 'dont', text: 'Ignore quasi-identifier combinations for re-identification', icon: '❌' },
    { type: 'dont', text: 'Apply anonymization after data has been widely distributed', icon: '❌' },
    { type: 'dont', text: 'Skip validation of synthetic data statistical properties', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-agent federated learning',
      'Cross-organizational data sharing',
      'Public dataset publication',
      'Regulatory compliance requirements'
    ],
    avoidWhen: [
      'Already encrypted data at rest',
      'Internal single-agent processing',
      'Public domain datasets',
      'Real-time streaming requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Re-identification Risk', measure: 'Probability of individual identification' },
    { metric: 'Data Utility Preservation', measure: '% statistical accuracy maintained' },
    { metric: 'K-Anonymity Level', measure: 'Minimum group size for indistinguishability' },
    { metric: 'L-Diversity Score', measure: 'Sensitive attribute value diversity' },
    { metric: 'T-Closeness Threshold', measure: 'Distribution similarity to population' },
    { metric: 'Synthetic Data Fidelity', measure: 'Statistical similarity to original data' }
  ];

  const topUseCases = [
    'Healthcare AI: Patient record anonymization for multi-hospital federated learning',
    'Financial Agents: Transaction pattern analysis with customer privacy protection',
    'Smart City: Citizen mobility data sharing across government agencies',
    'Research Collaboration: Academic dataset sharing with privacy guarantees',
    'Insurance Analytics: Claims data anonymization for regulatory compliance'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'K-Anonymity: A Model for Protecting Privacy (Sweeney, 2002)', url: 'https://dataprivacylab.org/dataprivacy/projects/kanonymity/paper3.pdf' },
        { title: 'L-Diversity: Privacy Beyond K-Anonymity (Machanavajjhala et al., 2007)', url: 'https://www.cs.cornell.edu/~arb/papers/l-diversity.pdf' },
        { title: 'T-Closeness: Privacy Beyond K-Anonymity and L-Diversity (Li et al., 2007)', url: 'https://www.cs.purdue.edu/homes/ninghui/papers/t_closeness_icde07.pdf' },
        { title: 'Anonymizing Data for Privacy-Preserving Federated Learning (Liu et al., 2020)', url: 'https://arxiv.org/abs/2002.09096' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google AI - Federated Learning for Mobile Keyboard Prediction', url: 'https://ai.googleblog.com/2017/04/federated-learning-collaborative.html' },
        { title: 'Microsoft Presidio - Data Protection and Anonymization', url: 'https://github.com/microsoft/presidio' },
        { title: 'IBM Federated Learning Framework', url: 'https://github.com/IBM/federated-learning-lib' },
        { title: 'AWS Comprehend - PII Detection and Redaction', url: 'https://aws.amazon.com/comprehend/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'ARX - Open Source Data Anonymization Tool', url: 'https://github.com/arx-deidentifier/arx' },
        { title: 'Amnesia - K-Anonymity Tool', url: 'https://amnesia.openaire.eu/' },
        { title: 'DataSynthesizer - Synthetic Data Generation', url: 'https://github.com/DataResponsibly/DataSynthesizer' },
        { title: 'SDV (Synthetic Data Vault) - Python Library', url: 'https://github.com/sdv-dev/SDV' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'International Association of Privacy Professionals (IAPP)', url: 'https://iapp.org/' },
        { title: 'Privacy Engineering Research at CMU', url: 'https://www.cylab.cmu.edu/research/privacy-engineering.html' },
        { title: 'OpenMined - Privacy-Preserving AI Community', url: 'https://www.openmined.org/' },
        { title: 'NIST Privacy Engineering Program', url: 'https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive data anonymization techniques including K-anonymity, L-diversity, T-closeness, and synthetic data generation for agentic systems"
        why="Protects individual privacy, enables safe data sharing, supports federated learning, and ensures regulatory compliance"
        keyInsight="Multi-layered anonymization + synthetic generation + federated processing → privacy-preserving agent collaboration"
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

export default DataAnonymizationPatternsDetails;