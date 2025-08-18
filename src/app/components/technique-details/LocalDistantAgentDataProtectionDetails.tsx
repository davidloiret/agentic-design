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

interface LocalDistantAgentDataProtectionDetailsProps {
  selectedTechnique: any;
}

export const LocalDistantAgentDataProtectionDetails: React.FC<LocalDistantAgentDataProtectionDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Local Agent Setup', detail: 'Deploy on-device processing agents with data isolation' },
      { num: '2', action: 'Privacy Mechanisms', detail: 'Implement differential privacy and anonymization' },
      { num: '3', action: 'Distant Aggregator', detail: 'Configure federated learning coordination agent' },
      { num: '4', action: 'Secure Communication', detail: 'Establish encrypted channels between agents' },
      { num: '5', action: 'Privacy Verification', detail: 'Validate anonymization and privacy guarantees' }
    ],
    example: 'local_agent_setup → privacy_mechanisms → distant_aggregator → secure_communication → privacy_verification'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Keep raw sensitive data isolated on local processing agents', icon: '✅' },
    { type: 'do', text: 'Apply differential privacy noise before any data transmission', icon: '✅' },
    { type: 'do', text: 'Implement individualized privacy budgets per agent', icon: '✅' },
    { type: 'do', text: 'Use secure multi-party computation for aggregation', icon: '✅' },
    { type: 'do', text: 'Verify privacy guarantees before accepting model updates', icon: '✅' },
    { type: 'dont', text: 'Transmit raw data between local and distant agents', icon: '❌' },
    { type: 'dont', text: 'Use fixed privacy parameters across all agents', icon: '❌' },
    { type: 'dont', text: 'Skip anonymization verification for model updates', icon: '❌' },
    { type: 'dont', text: 'Allow direct communication between local agents', icon: '❌' },
    { type: 'dont', text: 'Ignore privacy budget depletion warnings', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-party sensitive data collaboration',
      'Regulatory compliance requirements (HIPAA, GDPR)',
      'Cross-organizational AI development',
      'Privacy-critical applications'
    ],
    avoidWhen: [
      'Single-organization deployments',
      'Public dataset processing',
      'Real-time low-latency requirements',
      'Non-sensitive data applications'
    ]
  };

  const keyMetrics = [
    { metric: 'Privacy Budget Usage', measure: '% of epsilon consumed across all agents' },
    { metric: 'Re-identification Risk', measure: 'Probability of data re-identification (<0.001% target)' },
    { metric: 'Model Accuracy Trade-off', measure: '% accuracy vs centralized approach' },
    { metric: 'Local Processing Latency', measure: 'On-device computation time (ms)' },
    { metric: 'Federated Convergence', measure: 'Rounds needed for model convergence' },
    { metric: 'Communication Overhead', measure: '% reduction vs raw data sharing' }
  ];

  const topUseCases = [
    'Healthcare: Multi-hospital federated learning with patient data isolation and differential privacy',
    'Finance: Cross-bank fraud detection with transaction anonymization and secure aggregation',
    'Smart Cities: Traffic optimization using citizen data with local processing and privacy preservation',
    'Manufacturing: Industrial IoT collaboration with proprietary data protection and federated insights',
    'Research: Multi-institution studies with sensitive data anonymization and privacy-preserving analysis'
  ];

  const references = [
    {
      title: 'Federated Learning & Differential Privacy',
      items: [
        { title: 'Differentially Private Federated Learning: A Systematic Review (ArXiv 2024)', url: 'https://arxiv.org/abs/2405.08299' },
        { title: 'Federated Learning with Formal Differential Privacy Guarantees (Google Research)', url: 'https://research.google/blog/federated-learning-with-formal-differential-privacy-guarantees/' },
        { title: 'Adaptive Differential Privacy in Federated Learning (ArXiv 2024)', url: 'https://arxiv.org/abs/2401.02453' },
        { title: 'Using Decentralized Aggregation for Federated Learning with Differential Privacy', url: 'https://arxiv.org/abs/2311.16008' }
      ]
    },
    {
      title: 'Privacy-Preserving Techniques',
      items: [
        { title: 'AI-Driven Anonymization: Protecting Personal Data Privacy (ArXiv 2024)', url: 'https://arxiv.org/abs/2402.17191' },
        { title: 'Federated Learning with Individualized Privacy Through Client Sampling', url: 'https://arxiv.org/abs/2501.17634' },
        { title: 'Advanced Artificial Intelligence with Federated Learning (Scientific Reports 2025)', url: 'https://www.nature.com/articles/s41598-025-88843-2' },
        { title: 'Enhancing Convergence of FL Aggregation Strategies with Limited Data', url: 'https://arxiv.org/abs/2501.15949' }
      ]
    },
    {
      title: 'Agentic AI Systems',
      items: [
        { title: 'AgentAI: Comprehensive Survey on Autonomous Agents (ScienceDirect 2024)', url: 'https://www.sciencedirect.com/science/article/pii/S0957417425020238' },
        { title: 'The Role of Agentic AI in Shaping Smart Future (ScienceDirect 2025)', url: 'https://www.sciencedirect.com/science/article/pii/S2590005625000268' },
        { title: 'Agentic AI, Edge AI and Distributed Intelligence (RCR Wireless)', url: 'https://www.rcrwireless.com/20250205/ai-infrastructure/agentic-edge-ai-distributed-intelligence' },
        { title: 'Learn Agentic AI using Dapr Cloud Design Patterns (GitHub)', url: 'https://github.com/panaversity/learn-agentic-ai' }
      ]
    },
    {
      title: 'Regulatory & Compliance',
      items: [
        { title: 'TechDispatch Federated Learning (European Data Protection Supervisor 2025)', url: 'https://www.edps.europa.eu/data-protection/our-work/publications/techdispatch/2025-06-10-techdispatch-12025-federated-learning_en' },
        { title: 'Minding Mindful Machines: AI Agents Data Protection (Future of Privacy Forum)', url: 'https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/' },
        { title: 'Federated Learning for Breast Cancer Diagnosis (Scientific Reports 2025)', url: 'https://www.nature.com/articles/s41598-025-95858-2' },
        { title: 'Overview of Security and Privacy in Federated Learning (Artificial Intelligence Review)', url: 'https://link.springer.com/article/10.1007/s10462-024-10846-8' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Distributed architecture where local agents process sensitive data on-device while distant agents coordinate federated learning through advanced anonymization and differential privacy"
        why="Enables multi-party AI collaboration without exposing raw sensitive data, meeting regulatory compliance while maintaining model effectiveness"
        keyInsight="Local isolation + differential privacy + federated aggregation → privacy-preserving agentic AI with <0.001% re-identification risk"
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

export default LocalDistantAgentDataProtectionDetails;