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

interface SecureMultiPartyComputationDetailsProps {
  selectedTechnique: any;
}

export const SecureMultiPartyComputationDetails: React.FC<SecureMultiPartyComputationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Secret Sharing', detail: 'Distribute data across multiple parties' },
      { num: '2', action: 'Protocol Setup', detail: 'Establish cryptographic protocols' },
      { num: '3', action: 'Private Computation', detail: 'Execute operations on encrypted data' },
      { num: '4', action: 'Result Aggregation', detail: 'Combine partial results securely' },
      { num: '5', action: 'Verification', detail: 'Cryptographic proof of correctness' }
    ],
    example: 'secret_sharing → protocol_setup → private_computation → result_aggregation → verification'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use proven cryptographic protocols (Shamir, BGW, GMW)', icon: '✅' },
    { type: 'do', text: 'Implement secure channels for all party communications', icon: '✅' },
    { type: 'do', text: 'Verify computational integrity with cryptographic proofs', icon: '✅' },
    { type: 'do', text: 'Plan for party dropout and recovery mechanisms', icon: '✅' },
    { type: 'do', text: 'Use threshold schemes to prevent single points of failure', icon: '✅' },
    { type: 'dont', text: 'Trust parties to follow protocols without verification', icon: '❌' },
    { type: 'dont', text: 'Ignore performance implications of cryptographic overhead', icon: '❌' },
    { type: 'dont', text: 'Use insecure random number generation for secrets', icon: '❌' },
    { type: 'dont', text: 'Skip security analysis for custom protocol modifications', icon: '❌' },
    { type: 'dont', text: 'Assume all parties have equal computational resources', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-organization data analysis',
      'Competitive intelligence sharing',
      'Privacy-preserving federated learning',
      'Regulatory compliance requirements'
    ],
    avoidWhen: [
      'Single-party data processing',
      'Public data computations',
      'Real-time low-latency requirements',
      'Simple aggregation tasks'
    ]
  };

  const keyMetrics = [
    { metric: 'Privacy Preservation', measure: 'Zero data leakage guarantee' },
    { metric: 'Computation Accuracy', measure: 'Correctness of results vs. plaintext' },
    { metric: 'Protocol Efficiency', measure: 'Communication rounds and bandwidth' },
    { metric: 'Scalability', measure: 'Performance with increasing parties' },
    { metric: 'Security Proofs', measure: 'Cryptographic security guarantees' },
    { metric: 'Fault Tolerance', measure: 'Resilience to party failures' }
  ];

  const topUseCases = [
    'Banking Consortium: Joint fraud detection without sharing customer data',
    'Healthcare Research: Multi-hospital studies preserving patient privacy',
    'Supply Chain: Collaborative analytics without revealing trade secrets',
    'Ad Tech: Privacy-preserving audience measurement and attribution',
    'Government: Inter-agency intelligence sharing with classification protection'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Secure Multiparty Computation: Theory and Practice (Evans et al.)', url: 'https://www.cs.virginia.edu/~evans/pragmaticmpc/' },
        { title: 'BGW Protocol - Secure Multiparty Computation (Ben-Or et al., 1988)', url: 'https://dl.acm.org/doi/10.1145/62212.62213' },
        { title: 'GMW Protocol - How to Play Any Mental Game (Goldreich et al., 1987)', url: 'https://dl.acm.org/doi/10.1145/28395.28420' },
        { title: 'Practical Secure Computation Survey (Lindell & Pinkas, 2009)', url: 'https://eprint.iacr.org/2008/197.pdf' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft SEAL - Homomorphic Encryption Library', url: 'https://github.com/microsoft/SEAL' },
        { title: 'Google Private Join and Compute', url: 'https://github.com/google/private-join-and-compute' },
        { title: 'Facebook CrypTen - Secure Multi-Party ML', url: 'https://github.com/facebookresearch/CrypTen' },
        { title: 'IBM Federated Learning - Privacy Preserving ML', url: 'https://github.com/IBM/federated-learning-lib' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'MP-SPDZ - Versatile MPC Framework', url: 'https://github.com/data61/MP-SPDZ' },
        { title: 'ABY Framework - Mixed Protocol MPC', url: 'https://github.com/encryptogroup/ABY' },
        { title: 'MOTION - Mixed-Protocol Framework', url: 'https://github.com/encryptogroup/MOTION' },
        { title: 'PySyft - Privacy Preserving ML', url: 'https://github.com/openmined/pysyft' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'IACR ePrint Archive - Cryptography Papers', url: 'https://eprint.iacr.org/' },
        { title: 'Real World Crypto Symposium', url: 'https://rwc.iacr.org/' },
        { title: 'OpenMined Community - Privacy ML', url: 'https://www.openmined.org/' },
        { title: 'Privacy Preserving ML Workshop (PPML)', url: 'https://ppml-workshop.github.io/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Privacy-preserving collaboration between multiple agents without revealing private data through cryptographic protocols"
        why="Enables secure data collaboration, maintains competitive advantages, ensures regulatory compliance, and builds trust"
        keyInsight="Secret sharing + homomorphic computation + cryptographic proofs → secure multi-party analysis"
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

export default SecureMultiPartyComputationDetails;