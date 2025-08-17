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

interface PrivilegeCompromiseMitigationDetailsProps {
  selectedTechnique: any;
}

export const PrivilegeCompromiseMitigationDetails: React.FC<PrivilegeCompromiseMitigationDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Separate Identity', detail: 'Agent identity ≠ user identity' },
      { num: '2', action: 'Apply RBAC', detail: 'Role-based permissions, not user-based' },
      { num: '3', action: 'Least Privilege', detail: 'Minimal permissions for each operation' },
      { num: '4', action: 'Dynamic De-escalation', detail: 'Reduce privileges based on context' },
      { num: '5', action: 'Zero Trust', detail: 'Verify every action, trust nothing' }
    ],
    example: 'identity_separation → role_assignment → permission_check → context_evaluation → access_decision'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement strict identity separation between agents and users', icon: '✅' },
    { type: 'do', text: 'Use time-based privilege expiration and renewal', icon: '✅' },
    { type: 'do', text: 'Apply context-aware permission boundaries', icon: '✅' },
    { type: 'do', text: 'Monitor privilege usage patterns for anomalies', icon: '✅' },
    { type: 'do', text: 'Require multi-factor approval for high-value operations', icon: '✅' },
    { type: 'dont', text: 'Let agents inherit full user privileges automatically', icon: '❌' },
    { type: 'dont', text: 'Grant permanent elevated permissions', icon: '❌' },
    { type: 'dont', text: 'Skip privilege checks for "trusted" operations', icon: '❌' },
    { type: 'dont', text: 'Allow privilege accumulation over time', icon: '❌' },
    { type: 'dont', text: 'Ignore unusual privilege escalation patterns', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Enterprise AI deployments',
      'Multi-user platforms',
      'Sensitive data access',
      'Compliance-regulated systems'
    ],
    avoidWhen: [
      'Single-user local systems',
      'Read-only applications',
      'Isolated environments',
      'Non-privileged operations only'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Escalation Attempts', measure: 'Unauthorized privilege requests/day' },
    { metric: 'Privilege Lifetime', measure: 'Average minutes before de-escalation' },
    { metric: 'Approval Rate', measure: '% high-risk operations approved' },
    { metric: 'Identity Violations', measure: 'Agent impersonation attempts' },
    { metric: 'Compliance Score', measure: '% operations within policy' },
    { metric: 'Audit Trail', measure: 'Complete privilege history coverage' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Financial Systems: Prevent unauthorized trades, transfers, or account access',
    'Healthcare AI: Ensure PHI access follows minimum necessary principle',
    'Enterprise Automation: Control system administration without full admin rights',
    'Government AI: Maintain clearance levels and need-to-know restrictions',
    'Cloud Platforms: Prevent lateral movement and resource abuse in multi-tenant systems'
  ];

  const references = [
    {
      title: 'Standards & Frameworks',
      items: [
        { title: 'OWASP ASI - Privilege Compromise Threats (2025)', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/' },
        { title: 'NIST SP 800-53 - Access Control (AC) Family', url: 'https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/release-search' },
        { title: 'ISO/IEC 27001:2022 - Access Control Requirements', url: 'https://www.iso.org/standard/82875.html' },
        { title: 'CIS Controls v8 - Control 6: Access Control Management', url: 'https://www.cisecurity.org/controls/access-control-management' }
      ]
    },
    {
      title: 'Zero Trust Architecture',
      items: [
        { title: 'NIST SP 800-207 - Zero Trust Architecture', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
        { title: 'Google BeyondCorp - Zero Trust Enterprise Security', url: 'https://cloud.google.com/beyondcorp' },
        { title: 'Microsoft Zero Trust Deployment Guide', url: 'https://learn.microsoft.com/en-us/security/zero-trust/' },
        { title: 'Forrester Zero Trust Extended (ZTX) Framework', url: 'https://www.forrester.com/report/the-zero-trust-extended-ztx-ecosystem/RES137210' }
      ]
    },
    {
      title: 'RBAC & Identity Management',
      items: [
        { title: 'RBAC on Kubernetes - Production Patterns', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
        { title: 'AWS IAM Best Practices - Least Privilege', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
        { title: 'HashiCorp Vault - Dynamic Secrets & Identity', url: 'https://www.vaultproject.io/docs/secrets/identity' },
        { title: 'Okta - Adaptive MFA and Context-aware Access', url: 'https://www.okta.com/products/adaptive-multi-factor-authentication/' }
      ]
    },
    {
      title: 'Implementation Patterns',
      items: [
        { title: 'OWASP - Least Privilege Principle Implementation', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html' },
        { title: 'IEEE P2660.1 - Industrial Agent Security Standards', url: 'https://standards.ieee.org/ieee/2660.1/7513/' },
        { title: 'Just-In-Time Access Patterns (Microsoft)', url: 'https://learn.microsoft.com/en-us/azure/active-directory/privileged-identity-management/' },
        { title: 'Temporal - Workflow Identity and Authorization', url: 'https://docs.temporal.io/security' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Prevents privilege escalation through RBAC, identity separation, and dynamic de-escalation"
        why="Agent privilege inheritance enables lateral movement; strict boundaries prevent compromise"
        keyInsight="Separate identity + least privilege + time limits + zero trust = secure operations"
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

export default PrivilegeCompromiseMitigationDetails;