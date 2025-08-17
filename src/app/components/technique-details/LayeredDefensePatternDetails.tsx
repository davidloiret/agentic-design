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

interface LayeredDefensePatternDetailsProps {
  selectedTechnique: any;
}

export const LayeredDefensePatternDetails: React.FC<LayeredDefensePatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'External Layer', detail: 'API gateway with rate limiting & auth' },
      { num: '2', action: 'Application Layer', detail: 'Content filtering & PII detection' },
      { num: '3', action: 'Model Layer', detail: 'Constitutional AI & refusal mechanisms' },
      { num: '4', action: 'Monitor', detail: 'Log decisions at each layer' },
      { num: '5', action: 'Coordinate', detail: 'Ensure layers complement, not conflict' }
    ],
    example: 'request → auth_check → content_filter → model_safety → response_validation'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement fail-safe defaults at each layer', icon: '✅' },
    { type: 'do', text: 'Use defense-in-depth with independent failure modes', icon: '✅' },
    { type: 'do', text: 'Log security events for audit and improvement', icon: '✅' },
    { type: 'do', text: 'Test layers both independently and integrated', icon: '✅' },
    { type: 'do', text: 'Document what each layer protects against', icon: '✅' },
    { type: 'dont', text: 'Rely on a single layer for critical security', icon: '❌' },
    { type: 'dont', text: 'Create overlapping rules that conflict', icon: '❌' },
    { type: 'dont', text: 'Skip monitoring of bypass attempts', icon: '❌' },
    { type: 'dont', text: 'Ignore performance impact of multiple layers', icon: '❌' },
    { type: 'dont', text: 'Forget to update all layers when threats evolve', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'High-stakes AI applications',
      'Regulatory compliance required',
      'Public-facing systems',
      'Handling sensitive data'
    ],
    avoidWhen: [
      'Low-risk internal tools',
      'Extreme latency constraints',
      'Simple single-purpose bots',
      'Resource-constrained edge devices'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Block Rate', measure: 'Threats stopped per layer' },
    { metric: 'False Positives', measure: '% legitimate requests blocked' },
    { metric: 'Latency Impact', measure: 'ms added per layer' },
    { metric: 'Bypass Attempts', measure: 'Attacks reaching deeper layers' },
    { metric: 'Coverage', measure: '% of OWASP Top 10 addressed' },
    { metric: 'MTTR', measure: 'Time to update defenses' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Financial AI: External (DDoS) → App (fraud detection) → Model (compliance)',
    'Healthcare Bot: External (HIPAA auth) → App (PHI filtering) → Model (medical safety)',
    'Legal Assistant: External (client auth) → App (privilege checks) → Model (ethical bounds)',
    'HR Platform: External (employee verification) → App (PII protection) → Model (bias prevention)',
    'Educational AI: External (age verification) → App (content filtering) → Model (safety guidelines)'
  ];

  const references = [
    {
      title: 'Academic Papers & Standards',
      items: [
        { title: 'Designing Multi-layered Runtime Guardrails for Foundation Model Based Agents (ArXiv:2408.02205v3, 2024)', url: 'https://arxiv.org/abs/2408.02205' },
        { title: 'NIST AI Risk Management Framework: Generative AI Profile (NIST AI 600-1, July 2024)', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf' },
        { title: 'Current State of LLM Risks and AI Guardrails (ArXiv:2406.12934, June 2024)', url: 'https://arxiv.org/abs/2406.12934' },
        { title: 'Swiss Cheese Model in Healthcare Safety Systems (Reason, 2000)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1117770/' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'OWASP Top 10 for LLM Applications 2025 - Layered Security', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' },
        { title: 'AWS Well-Architected Framework - Security Pillar Defense in Depth', url: 'https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/defense-in-depth.html' },
        { title: 'Google Cloud AI Platform Security Best Practices', url: 'https://cloud.google.com/ai-platform/prediction/docs/security-best-practices' },
        { title: 'Azure AI Security Baseline - Layered Defenses', url: 'https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/ai-security-baseline' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'Guardrails AI - Open Source LLM Security Framework', url: 'https://github.com/guardrails-ai/guardrails' },
        { title: 'NeMo Guardrails by NVIDIA - Programmable Guardrails', url: 'https://github.com/NVIDIA/NeMo-Guardrails' },
        { title: 'LangChain Security Modules - Multi-layer Implementation', url: 'https://python.langchain.com/docs/guides/safety/' },
        { title: 'MLflow AI Gateway - Security Layer Management', url: 'https://mlflow.org/docs/latest/llms/gateway/index.html' }
      ]
    },
    {
      title: 'Industry Resources',
      items: [
        { title: 'NIST AI Safety Institute - Agent Security Guidelines', url: 'https://www.nist.gov/artificial-intelligence/ai-safety-institute' },
        { title: 'UK AISI Agent Safety Evaluations', url: 'https://www.gov.uk/government/publications/ai-safety-institute-approach-to-evaluations' },
        { title: 'Anthropic Constitutional AI Papers - Model Layer Safety', url: 'https://www.anthropic.com/constitutional-ai-documents' },
        { title: 'OpenAI Safety Best Practices - Defense in Depth', url: 'https://platform.openai.com/docs/guides/safety-best-practices' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multiple independent security layers (External → Application → Model) creating defense-in-depth"
        why="Single layer failures don't compromise system; each layer catches different threat types"
        keyInsight="Swiss Cheese Model - holes in different layers don't align, preventing complete breach"
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

export default LayeredDefensePatternDetails;