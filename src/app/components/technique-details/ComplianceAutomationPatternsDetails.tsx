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

interface ComplianceAutomationPatternsDetailsProps {
  selectedTechnique: any;
}

export const ComplianceAutomationPatternsDetails: React.FC<ComplianceAutomationPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Data Classification', detail: 'Automated regulatory data categorization' },
      { num: '2', action: 'Policy Mapping', detail: 'Framework requirements to controls' },
      { num: '3', action: 'Real-time Enforcement', detail: 'Continuous compliance checking' },
      { num: '4', action: 'Audit Trail Generation', detail: 'Comprehensive activity logging' },
      { num: '5', action: 'Report Automation', detail: 'Regulatory submission preparation' }
    ],
    example: 'data_classification → policy_mapping → enforcement_engine → audit_logging → compliance_reporting'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement automated data classification for multiple regulations', icon: '✅' },
    { type: 'do', text: 'Create comprehensive audit trails for all data operations', icon: '✅' },
    { type: 'do', text: 'Use policy engines for real-time compliance enforcement', icon: '✅' },
    { type: 'do', text: 'Maintain up-to-date regulatory framework mappings', icon: '✅' },
    { type: 'do', text: 'Generate automated compliance reports and dashboards', icon: '✅' },
    { type: 'dont', text: 'Rely on manual compliance processes for critical data', icon: '❌' },
    { type: 'dont', text: 'Skip consent verification for personal data processing', icon: '❌' },
    { type: 'dont', text: 'Ignore cross-border data transfer restrictions', icon: '❌' },
    { type: 'dont', text: 'Delay regulatory change implementation', icon: '❌' },
    { type: 'dont', text: 'Store compliance logs without encryption', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Regulated industries (healthcare, finance)',
      'Enterprise AI deployments',
      'International data processing',
      'Multi-regulatory environments'
    ],
    avoidWhen: [
      'Simple internal applications',
      'Non-regulated data processing',
      'Prototype development phases',
      'Single-jurisdiction deployments'
    ]
  };

  const keyMetrics = [
    { metric: 'Compliance Score', measure: '% adherence to regulatory frameworks' },
    { metric: 'Audit Finding Reduction', measure: 'Decrease in compliance violations' },
    { metric: 'Automation Coverage', measure: '% compliance processes automated' },
    { metric: 'Response Time', measure: 'Time to address regulatory changes' },
    { metric: 'Data Subject Rights', measure: 'Fulfillment rate for user requests' },
    { metric: 'Cross-Border Compliance', measure: 'International transfer compliance rate' }
  ];

  const topUseCases = [
    'Healthcare AI: HIPAA compliance, PHI protection, minimum necessary access enforcement',
    'Financial Services: SOX controls, PCI DSS compliance, anti-money laundering monitoring',
    'EU Operations: GDPR data processing, consent management, right to erasure automation',
    'Multi-National: Cross-border transfers, adequacy decisions, binding corporate rules',
    'Government: FedRAMP compliance, security controls, continuous monitoring requirements'
  ];

  const references = [
    {
      title: 'Regulatory Frameworks',
      items: [
        { title: 'GDPR - General Data Protection Regulation Official Text', url: 'https://gdpr.eu/tag/gdpr/' },
        { title: 'HIPAA Security Rule - HHS.gov', url: 'https://www.hhs.gov/hipaa/for-professionals/security/' },
        { title: 'SOX Section 404 - SEC Compliance Guide', url: 'https://www.sec.gov/rules/final/33-8238.htm' },
        { title: 'CCPA - California Consumer Privacy Act', url: 'https://oag.ca.gov/privacy/ccpa' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'NIST Privacy Framework Implementation Guide', url: 'https://www.nist.gov/privacy-framework' },
        { title: 'AWS Compliance Center - Multi-Framework Guide', url: 'https://aws.amazon.com/compliance/' },
        { title: 'Microsoft Compliance Manager', url: 'https://docs.microsoft.com/en-us/microsoft-365/compliance/' },
        { title: 'Google Cloud Compliance Resource Center', url: 'https://cloud.google.com/security/compliance' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Open Policy Agent (OPA) - Policy Engine', url: 'https://github.com/open-policy-agent/opa' },
        { title: 'HashiCorp Sentinel - Policy as Code', url: 'https://www.hashicorp.com/sentinel' },
        { title: 'Apache Ranger - Data Governance Framework', url: 'https://github.com/apache/ranger' },
        { title: 'Privacera - Data Security Governance Platform', url: 'https://privacera.com/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'IAPP - International Association of Privacy Professionals', url: 'https://iapp.org/' },
        { title: 'ISACA - Information Systems Audit Control Association', url: 'https://www.isaca.org/' },
        { title: 'GDPR.eu Community Forum', url: 'https://gdpr.eu/forum/' },
        { title: 'Reddit Privacy & Compliance Community', url: 'https://reddit.com/r/privacy' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Automated GDPR, HIPAA, SOX, and multi-regulatory compliance enforcement with real-time monitoring"
        why="Ensures regulatory adherence, reduces manual compliance work, prevents violations, and enables audit readiness"
        keyInsight="Automated classification + policy enforcement + audit trails → continuous regulatory compliance"
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

export default ComplianceAutomationPatternsDetails;