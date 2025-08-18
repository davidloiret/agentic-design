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

interface ZeroTrustAgentArchitectureDetailsProps {
  selectedTechnique: any;
}

export const ZeroTrustAgentArchitectureDetails: React.FC<ZeroTrustAgentArchitectureDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Identity Verification', detail: 'Continuous agent identity validation' },
      { num: '2', action: 'Microsegmentation', detail: 'Network isolation per agent context' },
      { num: '3', action: 'Least Privilege', detail: 'Minimal access rights enforcement' },
      { num: '4', action: 'Continuous Monitoring', detail: 'Real-time behavior analysis' },
      { num: '5', action: 'Dynamic Policies', detail: 'Risk-based access adaptation' }
    ],
    example: 'identity_verification → microsegmentation → least_privilege → continuous_monitoring → dynamic_policies'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Verify every agent request regardless of source', icon: '✅' },
    { type: 'do', text: 'Implement microsegmentation for agent isolation', icon: '✅' },
    { type: 'do', text: 'Apply least privilege principle to all agent access', icon: '✅' },
    { type: 'do', text: 'Monitor agent behavior continuously for anomalies', icon: '✅' },
    { type: 'do', text: 'Use encrypted communication for all agent interactions', icon: '✅' },
    { type: 'dont', text: 'Trust agents based on network location alone', icon: '❌' },
    { type: 'dont', text: 'Grant broad access permissions by default', icon: '❌' },
    { type: 'dont', text: 'Skip re-authentication for sensitive operations', icon: '❌' },
    { type: 'dont', text: 'Ignore behavioral anomalies in trusted agents', icon: '❌' },
    { type: 'dont', text: 'Use static security policies across all contexts', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Enterprise AI systems',
      'Cloud-based agent deployments',
      'Distributed multi-agent environments',
      'High-security requirements'
    ],
    avoidWhen: [
      'Simple single-agent applications',
      'Isolated development environments',
      'Low-risk internal tools',
      'Performance-critical real-time systems'
    ]
  };

  const keyMetrics = [
    { metric: 'Security Incident Reduction', measure: '% decrease in security breaches' },
    { metric: 'Mean Time to Detection (MTTD)', measure: 'Time to identify threats' },
    { metric: 'False Positive Rate', measure: '% legitimate activities flagged' },
    { metric: 'Access Decision Latency', measure: 'Time for authorization decisions' },
    { metric: 'Policy Compliance', measure: '% adherence to security policies' },
    { metric: 'Agent Productivity Impact', measure: 'Performance degradation from security' }
  ];

  const topUseCases = [
    'Enterprise AI Platform: Multi-tenant isolation, dynamic access control, continuous verification',
    'Cloud AI Services: Container security, API protection, threat detection and response',
    'Financial AI Systems: Regulatory compliance, fraud prevention, sensitive data protection',
    'Healthcare AI: HIPAA compliance, patient data protection, audit trail maintenance',
    'Government AI: Classified data handling, security clearance enforcement, threat monitoring'
  ];

  const references = [
    {
      title: 'Standards & Frameworks',
      items: [
        { title: 'NIST Zero Trust Architecture (SP 800-207)', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
        { title: 'CISA Zero Trust Maturity Model', url: 'https://www.cisa.gov/zero-trust-maturity-model' },
        { title: 'Forrester Zero Trust eXtended (ZTX) Framework', url: 'https://www.forrester.com/report/the-zero-trust-extended-ztx-ecosystem/' },
        { title: 'Google BeyondCorp Zero Trust Model', url: 'https://cloud.google.com/beyondcorp' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Zero Trust Architecture Guide', url: 'https://docs.microsoft.com/en-us/security/zero-trust/' },
        { title: 'AWS Zero Trust Architecture Whitepaper', url: 'https://aws.amazon.com/architecture/zero-trust/' },
        { title: 'Google Cloud Zero Trust Implementation', url: 'https://cloud.google.com/security/zero-trust' },
        { title: 'Okta Zero Trust Implementation Guide', url: 'https://www.okta.com/zero-trust/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Istio - Service Mesh for Zero Trust', url: 'https://github.com/istio/istio' },
        { title: 'Open Policy Agent - Policy Engine', url: 'https://github.com/open-policy-agent/opa' },
        { title: 'Cilium - eBPF-based Networking and Security', url: 'https://github.com/cilium/cilium' },
        { title: 'Pomerium - Identity-Aware Proxy', url: 'https://github.com/pomerium/pomerium' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Zero Trust Consortium', url: 'https://zerotrust.org/' },
        { title: 'SANS Zero Trust Community', url: 'https://www.sans.org/blog/what-is-zero-trust/' },
        { title: 'Reddit Zero Trust Security', url: 'https://reddit.com/r/cybersecurity' },
        { title: 'Cloud Security Alliance Zero Trust Working Group', url: 'https://cloudsecurityalliance.org/working-groups/zero-trust/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Never trust, always verify approach for agent security with continuous verification and least privilege access"
        why="Eliminates implicit trust, reduces attack surface, enables secure distributed deployments, and improves threat detection"
        keyInsight="Continuous verification + microsegmentation + least privilege + dynamic policies → secure agent ecosystem"
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

export default ZeroTrustAgentArchitectureDetails;