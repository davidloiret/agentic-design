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

interface IdentityAccessManagementDetailsProps {
  selectedTechnique: any;
}

export const IdentityAccessManagementDetails: React.FC<IdentityAccessManagementDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Identity Registration', detail: 'Agent certificates & unique identity creation' },
      { num: '2', action: 'Authentication', detail: 'Multi-factor verification & certificate validation' },
      { num: '3', action: 'Authorization', detail: 'Role-based permissions & policy evaluation' },
      { num: '4', action: 'Access Control', detail: 'Dynamic risk assessment & monitoring' },
      { num: '5', action: 'Audit & Compliance', detail: 'Activity logging & continuous verification' }
    ],
    example: 'identity_registration → authentication_flow → authorization_check → access_control → audit_logging'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use certificate-based authentication for agents', icon: '✅' },
    { type: 'do', text: 'Implement continuous risk-based authentication', icon: '✅' },
    { type: 'do', text: 'Apply principle of least privilege access', icon: '✅' },
    { type: 'do', text: 'Maintain comprehensive audit trails', icon: '✅' },
    { type: 'do', text: 'Integrate with existing SSO/identity providers', icon: '✅' },
    { type: 'dont', text: 'Use static API keys for long-term access', icon: '❌' },
    { type: 'dont', text: 'Skip identity verification for internal agents', icon: '❌' },
    { type: 'dont', text: 'Grant broad permissions without justification', icon: '❌' },
    { type: 'dont', text: 'Ignore failed authentication patterns', icon: '❌' },
    { type: 'dont', text: 'Store credentials in plain text', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Enterprise AI systems',
      'Multi-tenant platforms',
      'Cloud service deployments',
      'API security requirements'
    ],
    avoidWhen: [
      'Single-user desktop applications',
      'Proof-of-concept prototypes',
      'Internal development tools',
      'Low-security environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Authentication Success Rate', measure: '% successful identity verifications' },
    { metric: 'Authorization Latency', measure: 'Time for access decisions (ms)' },
    { metric: 'Identity Lifecycle Automation', measure: '% automated provisioning/deprovisioning' },
    { metric: 'Privileged Access Violations', measure: 'Unauthorized elevation attempts' },
    { metric: 'Audit Completeness', measure: '% actions with complete logs' },
    { metric: 'Risk Assessment Accuracy', measure: 'Correct threat identification rate' }
  ];

  const topUseCases = [
    'Enterprise AI Platform: SSO integration, role-based agent permissions, audit compliance',
    'Multi-Tenant SaaS: Tenant isolation, API key management, usage tracking',
    'Cloud AI Services: Certificate-based authentication, OAuth integration, federated identity',
    'Financial AI Systems: Privileged access management, step-up authentication, regulatory compliance',
    'Healthcare AI: HIPAA-compliant access, user attribution, minimum necessary access'
  ];

  const references = [
    {
      title: 'Standards & Guidelines',
      items: [
        { title: 'NIST Digital Identity Guidelines (SP 800-63)', url: 'https://pages.nist.gov/800-63-3/' },
        { title: 'OAuth 2.0 Security Best Current Practice', url: 'https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics' },
        { title: 'OpenID Connect Core 1.0', url: 'https://openid.net/specs/openid-connect-core-1_0.html' },
        { title: 'FIDO Alliance Authentication Standards', url: 'https://fidoalliance.org/specifications/' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Entra ID (Azure AD) Documentation', url: 'https://docs.microsoft.com/en-us/azure/active-directory/' },
        { title: 'AWS IAM Best Practices Guide', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
        { title: 'Google Cloud Identity & Access Management', url: 'https://cloud.google.com/iam/docs' },
        { title: 'Okta Identity and Access Management', url: 'https://developer.okta.com/docs/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Keycloak - Open Source Identity Management', url: 'https://github.com/keycloak/keycloak' },
        { title: 'Auth0 by Okta - Identity Platform', url: 'https://github.com/auth0' },
        { title: 'FusionAuth - Modern Identity Platform', url: 'https://github.com/FusionAuth/fusionauth' },
        { title: 'Ory - Open Source Identity Infrastructure', url: 'https://github.com/ory' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'OWASP Identity Management Security', url: 'https://owasp.org/www-project-application-security-verification-standard/' },
        { title: 'Identity Management Institute', url: 'https://identitymanagementinstitute.org/' },
        { title: 'Cloud Security Alliance Identity Working Group', url: 'https://cloudsecurityalliance.org/' },
        { title: 'Reddit Identity and Access Management', url: 'https://reddit.com/r/ITSecurity' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Secure agent authentication, authorization, and identity verification with comprehensive access control"
        why="Ensures secure agent interactions, prevents unauthorized access, maintains audit trails, and enables compliance"
        keyInsight="Certificate-based identity + risk-based authentication + role-based authorization → secure agent ecosystem"
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

export default IdentityAccessManagementDetails;