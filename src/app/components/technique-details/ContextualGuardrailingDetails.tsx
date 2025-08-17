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

interface ContextualGuardrailingDetailsProps {
  selectedTechnique: any;
}

export const ContextualGuardrailingDetails: React.FC<ContextualGuardrailingDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Context Detection', detail: 'Analyze user, role, location, time, data' },
      { num: '2', action: 'Rule Mapping', detail: 'Match context to guardrail configurations' },
      { num: '3', action: 'Dynamic Rules', detail: 'Apply if-this-then-that conditional logic' },
      { num: '4', action: 'Enforcement', detail: 'Adjust permissions & constraints in real-time' },
      { num: '5', action: 'Audit', detail: 'Log decisions for compliance & optimization' }
    ],
    example: 'context_analysis → rule_selection → dynamic_enforcement → audit_logging'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Start simple and add complexity based on actual patterns', icon: '✅' },
    { type: 'do', text: 'Design rules to be explainable and auditable', icon: '✅' },
    { type: 'do', text: 'Use versioning for safe rule updates and rollbacks', icon: '✅' },
    { type: 'do', text: 'Implement comprehensive context detection across dimensions', icon: '✅' },
    { type: 'do', text: 'Cache context decisions for performance optimization', icon: '✅' },
    { type: 'dont', text: 'Create overly complex rules that are hard to debug', icon: '❌' },
    { type: 'dont', text: 'Apply same rules uniformly across all contexts', icon: '❌' },
    { type: 'dont', text: 'Skip audit logging for context-based decisions', icon: '❌' },
    { type: 'dont', text: 'Ignore performance impact of rule evaluation', icon: '❌' },
    { type: 'dont', text: 'Forget to test edge cases and rule interactions', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Multi-tenant applications',
      'Role-based security needs',
      'Regulatory compliance varies by context',
      'Dynamic risk environments'
    ],
    avoidWhen: [
      'Simple single-context apps',
      'Uniform security requirements',
      'Performance-critical paths',
      'Limited rule management resources'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Context Accuracy', measure: '% correct context identification' },
    { metric: 'Rule Hit Rate', measure: 'Rules triggered per context' },
    { metric: 'Decision Latency', measure: 'ms for context + rule evaluation' },
    { metric: 'Compliance Rate', measure: '% requests meeting policies' },
    { metric: 'Rule Effectiveness', measure: 'Security incidents prevented' },
    { metric: 'User Friction', measure: 'False positive restriction rate' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Healthcare: PHI access (role + location + time) → HIPAA-compliant restrictions',
    'Finance: Trading operations (user level + time + amount) → approval workflows',
    'Enterprise: Remote access (location + device + sensitivity) → tool restrictions',
    'Education: Student data (role + purpose + consent) → privacy guardrails',
    'Government: Classified systems (clearance + need-to-know + location) → access control'
  ];

  const references = [
    {
      title: 'Academic Papers & Research',
      items: [
        { title: 'Invariant Labs - Contextual Security Layer for Agentic Era (2024)', url: 'https://invariantlabs.ai/blog/guardrails' },
        { title: 'Context-Aware Access Control: A Survey (IEEE Access, 2023)', url: 'https://ieeexplore.ieee.org/document/9956432' },
        { title: 'Dynamic Security Policies for Cloud Computing (ACM Computing Surveys, 2023)', url: 'https://dl.acm.org/doi/10.1145/3571156' },
        { title: 'Adaptive Security in Multi-tenant Systems (USENIX Security, 2024)', url: 'https://www.usenix.org/conference/usenixsecurity24' }
      ]
    },
    {
      title: 'Standards & Guidelines',
      items: [
        { title: 'OWASP Agentic Security Initiative - Threats and Mitigations (2025)', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/' },
        { title: 'NIST SP 800-162 - Guide to Attribute Based Access Control', url: 'https://csrc.nist.gov/publications/detail/sp/800-162/final' },
        { title: 'ISO/IEC 29146:2016 - Access Management Framework', url: 'https://www.iso.org/standard/45169.html' },
        { title: 'Cloud Security Alliance - Dynamic Authorization Management', url: 'https://cloudsecurityalliance.org/research/dynamic-authorization' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Open Policy Agent (OPA) - Policy-based Control', url: 'https://www.openpolicyagent.org/' },
        { title: 'Google Zanzibar - Global Authorization System', url: 'https://research.google/pubs/pub48190/' },
        { title: 'AWS IAM Policy Conditions - Context-based Access', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html' },
        { title: 'Microsoft Conditional Access - Azure AD', url: 'https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Casbin - Authorization Library with RBAC, ABAC Support', url: 'https://casbin.org/' },
        { title: 'Oso - Authorization Framework for Context-aware Policies', url: 'https://www.osohq.com/' },
        { title: 'SpiceDB - Zanzibar-inspired Permission System', url: 'https://authzed.com/spicedb' },
        { title: 'Permit.io - Full-stack Authorization Platform', url: 'https://www.permit.io/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic guardrails that adapt based on context (user, role, data, time, location)"
        why="Static rules fail in complex environments; context-aware security enables precise control"
        keyInsight="IF-THIS-THEN-THAT logic creates adaptive security without sacrificing usability"
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

export default ContextualGuardrailingDetails;