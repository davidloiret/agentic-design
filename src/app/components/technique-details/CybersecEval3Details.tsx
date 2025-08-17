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

interface CybersecEval3DetailsProps {
  selectedTechnique: any;
}

export const CybersecEval3Details: React.FC<CybersecEval3DetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Setup', detail: 'Install CybersecEval 3 framework and dependencies' },
      { num: '2', action: 'Configure', detail: 'Set up 8 risk assessment categories for evaluation' },
      { num: '3', action: 'Test', detail: 'Run autonomous and multi-agent security scenarios' },
      { num: '4', action: 'Guard', detail: 'Deploy Llama Guard 3 for risk mitigation' },
      { num: '5', action: 'Analyze', detail: 'Review offensive/defensive capability assessments' }
    ],
    example: 'cybersec_eval = CybersecEval3(model=llm, risks=all_8, guardrails=llama_guard_3)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Test across all 8 risk categories for comprehensive security assessment', icon: '✅' },
    { type: 'do', text: 'Deploy Llama Guard 3 to detect and block cyberattack aid requests', icon: '✅' },
    { type: 'do', text: 'Evaluate both autonomous and multi-agent offensive capabilities', icon: '✅' },
    { type: 'do', text: 'Monitor for social engineering and spear-phishing attack generation', icon: '✅' },
    { type: 'do', text: 'Assess vulnerability discovery and exploitation capabilities', icon: '✅' },
    { type: 'dont', text: 'Deploy models without proper guardrails and monitoring systems', icon: '❌' },
    { type: 'dont', text: 'Ignore third-party risks from autonomous offensive operations', icon: '❌' },
    { type: 'dont', text: 'Skip evaluation of manual cyber-operation scaling capabilities', icon: '❌' },
    { type: 'dont', text: 'Overlook application developer and end-user security risks', icon: '❌' },
    { type: 'dont', text: 'Assume offensive capabilities won\'t be misused without mitigation', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Security assessment of autonomous LLM agents',
      'Evaluating cybersecurity risks in multi-agent systems',
      'Pre-deployment security validation for LLMs',
      'Implementing guardrails and risk mitigation strategies',
      'Research on offensive and defensive AI capabilities'
    ],
    avoidWhen: [
      'General performance benchmarking (non-security focused)',
      'Models without cybersecurity risk considerations',
      'Environments without proper security monitoring',
      'Academic research without ethical oversight',
      'Systems not requiring autonomous security evaluation'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Third-Party Risk Score', measure: 'Assessment across 4 offensive capability categories' },
    { metric: 'Developer/End-User Risk', measure: 'Security risks to application developers and users' },
    { metric: 'Autonomous Hacking Capability', measure: 'Success rate in autonomous cyber operation challenges' },
    { metric: 'Vulnerability Discovery Rate', measure: 'Effectiveness at finding and exploiting software vulnerabilities' },
    { metric: 'Social Engineering Success', measure: 'Ability to generate persuasive spear-phishing attacks' },
    { metric: 'Guardrail Effectiveness', measure: 'Llama Guard 3 detection and blocking success rate' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Security Research: Evaluating Llama 3 405B vulnerability discovery capabilities (23% better than GPT-4 Turbo)',
    'Risk Mitigation: Deploying Llama Guard 3 to detect and block cyberattack aid requests in production',
    'Autonomous Agent Security: Testing multi-agent frameworks for offensive cyber operation capabilities',
    'Social Engineering Assessment: Evaluating spear-phishing attack generation and personalized deception risks',
    'Enterprise Security: Pre-deployment cybersecurity validation for LLM-based applications and services'
  ];

  const references = [
    {
      title: 'Official CybersecEval 3 Resources',
      items: [
        { title: 'CybersecEval 3: Advancing Cybersecurity Evaluation (arXiv:2408.01605)', url: 'https://arxiv.org/abs/2408.01605' },
        { title: 'CybersecEval 3 HTML Version', url: 'https://arxiv.org/html/2408.01605' },
        { title: 'Meta AI Research Publication', url: 'https://ai.meta.com/research/publications/cyberseceval-3-advancing-the-evaluation-of-cybersecurity-risks-and-capabilities-in-large-language-models/' },
        { title: 'CybersecEval 3 ResearchGate Publication', url: 'https://www.researchgate.net/publication/382884750_CYBERSECEVAL_3_Advancing_the_Evaluation_of_Cybersecurity_Risks_and_Capabilities_in_Large_Language_Models' }
      ]
    },
    {
      title: 'Implementation & Evaluation Tools',
      items: [
        { title: 'UK Government BEIS Inspect Evals Implementation', url: 'https://github.com/UKGovernmentBEIS/inspect_evals/tree/main/src/inspect_evals/cyberseceval_3' },
        { title: 'SCRAM: CybersecEval 3 Security Risk Evaluation', url: 'https://www.scram-pra.org/cyberseceval3.html' },
        { title: 'EmergentMind: CybersecEval 3 Analysis', url: 'https://www.emergentmind.com/papers/2408.01605' },
        { title: 'ADS Astrophysics: CybersecEval 3 Abstract', url: 'https://ui.adsabs.harvard.edu/abs/2024arXiv240801605W/abstract' }
      ]
    },
    {
      title: 'Related CybersecEval Research',
      items: [
        { title: 'CybersecEval 2: Wide-Ranging Cybersecurity Suite (arXiv:2404.13161)', url: 'https://arxiv.org/abs/2404.13161' },
        { title: 'Rethinking CyberSecEval: LLM-Aided Evaluation Critique', url: 'https://arxiv.org/abs/2411.08813' },
        { title: 'CyberMetric: Cybersecurity Knowledge Benchmark (arXiv:2402.07688)', url: 'https://arxiv.org/abs/2402.07688' },
        { title: 'Literature Review: CybersecEval 3 Analysis', url: 'https://www.themoonlight.io/en/review/cyberseceval-3-advancing-the-evaluation-of-cybersecurity-risks-and-capabilities-in-large-language-models' }
      ]
    },
    {
      title: 'Industry Analysis & Coverage',
      items: [
        { title: 'VentureBeat: Top 5 Strategies to Combat Weaponized LLMs', url: 'https://venturebeat.com/security/top-five-strategies-from-metas-cyberseceval-3-to-combat-weaponized-llms/' },
        { title: 'AZoAI: CybersecEval 3 Security Benchmark Analysis', url: 'https://www.azoai.com/news/20240805/CYBERSECEVAL-3-Security-Benchmark-Evaluates-Risks-in-LLMs.aspx' },
        { title: 'Meta Llama Guard 3 Documentation', url: 'https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-guard-3/' },
        { title: 'AI Safety and Security Best Practices', url: 'https://ai.meta.com/responsible-ai/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Meta's comprehensive cybersecurity benchmark evaluating 8 risks across autonomous and multi-agent scenarios"
        why="Assesses offensive capabilities including social engineering, vulnerability discovery, and autonomous cyber operations"
        keyInsight="Llama 3 405B outperforms GPT-4 Turbo by 23% in vulnerability exploitation while requiring Llama Guard 3 mitigation"
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

export default CybersecEval3Details;