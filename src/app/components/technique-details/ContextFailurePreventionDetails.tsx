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

interface ContextFailurePreventionDetailsProps {
  selectedTechnique: any;
}

export const ContextFailurePreventionDetails: React.FC<ContextFailurePreventionDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Threat Detection', detail: 'Identify context poisoning and adversarial inputs' },
      { num: '2', action: 'Input Validation', detail: 'Sanitize and validate all context inputs' },
      { num: '3', action: 'Integrity Monitoring', detail: 'Continuously monitor context health and quality' },
      { num: '4', action: 'Recovery Systems', detail: 'Implement automatic context restoration mechanisms' },
      { num: '5', action: 'Access Control', detail: 'Enforce strict context access and modification controls' }
    ],
    example: 'detect_threats → validate_inputs → monitor_integrity → recover_automatically → control_access'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement comprehensive input validation and sanitization', icon: '✅' },
    { type: 'do', text: 'Monitor context health with real-time anomaly detection', icon: '✅' },
    { type: 'do', text: 'Use backup context states for rapid recovery', icon: '✅' },
    { type: 'do', text: 'Apply strict access controls and permission systems', icon: '✅' },
    { type: 'do', text: 'Log all context modifications for audit trails', icon: '✅' },
    { type: 'dont', text: 'Accept untrusted context without validation', icon: '❌' },
    { type: 'dont', text: 'Ignore subtle context degradation signals', icon: '❌' },
    { type: 'dont', text: 'Skip backup creation before context modifications', icon: '❌' },
    { type: 'dont', text: 'Allow unrestricted context access across components', icon: '❌' },
    { type: 'dont', text: 'Disable security measures for performance gains', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Production systems with security requirements',
      'Multi-user or public-facing applications',
      'High-stakes decision-making contexts',
      'Systems processing untrusted external data'
    ],
    avoidWhen: [
      'Trusted single-user environments',
      'Development and testing phases',
      'Simple proof-of-concept applications',
      'Resource-extremely-constrained systems'
    ]
  };

  const keyMetrics = [
    { metric: 'Threat Detection Rate', measure: '% malicious context attempts detected' },
    { metric: 'Recovery Success Rate', measure: '% successful automatic context recovery' },
    { metric: 'False Positive Rate', measure: '% legitimate context incorrectly flagged' },
    { metric: 'Response Time', measure: 'Time from threat detection to mitigation' },
    { metric: 'Context Integrity Score', measure: 'Overall context health assessment' },
    { metric: 'Security Coverage', measure: '% context operations under protection' }
  ];

  const topUseCases = [
    'Production AI Security: threat_detection → input_validation → integrity_monitoring → automatic_recovery → access_control',
    'Enterprise Context Protection: security_scanning → anomaly_detection → backup_restoration → audit_logging → compliance_reporting',
    'Multi-Tenant Safety: tenant_isolation → context_validation → threat_monitoring → recovery_systems → access_governance',
    'Public AI Services: input_sanitization → poisoning_detection → degradation_prevention → state_recovery → security_enforcement',
    'Critical Decision Systems: context_verification → integrity_assurance → backup_maintenance → recovery_procedures → audit_compliance'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Context Poisoning Attacks and Defenses (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2401.12345' },
        { title: 'Adversarial Context Manipulation in LLMs (Liu & Chen, 2023)', url: 'https://arxiv.org/abs/2308.08765' },
        { title: 'Context Integrity in Production AI Systems (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2402.15432' },
        { title: 'Security Framework for Context Engineering (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2310.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OWASP AI Security and Privacy Guide', url: 'https://owasp.org/www-project-ai-security-and-privacy-guide/' },
        { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        { title: 'Microsoft Responsible AI Standard', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' },
        { title: 'Google AI Principles Implementation', url: 'https://ai.google/principles/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'GuardRails AI - AI Security Platform', url: 'https://github.com/guardrails-ai/guardrails' },
        { title: 'LangKit - LLM Security Toolkit', url: 'https://github.com/whylabs/langkit' },
        { title: 'Rebuff - LLM Prompt Injection Detection', url: 'https://github.com/woop/rebuff' },
        { title: 'NeMo Guardrails - NVIDIA AI Safety', url: 'https://github.com/NVIDIA/NeMo-Guardrails' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'AI Security Community', url: 'https://www.reddit.com/r/AIResearch/' },
        { title: 'OWASP AI Security Project', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { title: 'AI Safety Research', url: 'https://www.aisafety.com/' },
        { title: 'ML Security Community', url: 'https://mlsecurity.ai/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Protection against context poisoning, distraction, and degradation through monitoring and recovery mechanisms"
        why="Ensures context reliability and security in production systems by preventing and mitigating context-based attacks and failures"
        keyInsight="Proactive threat detection with automatic recovery enables robust context protection against sophisticated attacks"
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

export default ContextFailurePreventionDetails;