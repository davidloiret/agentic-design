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

interface EuAiActFrameworkDetailsProps {
  selectedTechnique: any;
}

export const EuAiActFrameworkDetails: React.FC<EuAiActFrameworkDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Classify', detail: 'Determine AI system risk level: Prohibited, High-Risk, Limited Risk, or Minimal Risk' },
      { num: '2', action: 'Assess', detail: 'For GPAI models >10^25 FLOPs: notify EU Commission within 2 weeks' },
      { num: '3', action: 'Evaluate', detail: 'Conduct adversarial testing and red teaming per standardized protocols' },
      { num: '4', action: 'Secure', detail: 'Implement cybersecurity protections and systematic risk mitigation' },
      { num: '5', action: 'Document', detail: 'Maintain compliance records and report serious incidents to AI Office' }
    ],
    example: 'eu_compliance = EUAIAct(system=ai_agent, flops=compute_threshold, risk_level="high", red_team=True)'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Classify AI systems using 4-tier risk framework (Prohibited/High/Limited/Minimal)', icon: '✅' },
    { type: 'do', text: 'Notify EU Commission within 2 weeks if GPAI model exceeds 10^25 FLOPs threshold', icon: '✅' },
    { type: 'do', text: 'Conduct mandatory adversarial testing and red teaming for systemic risk models', icon: '✅' },
    { type: 'do', text: 'Implement comprehensive cybersecurity protections against data/model poisoning', icon: '✅' },
    { type: 'do', text: 'Maintain technical documentation and transparency for high-risk systems', icon: '✅' },
    { type: 'dont', text: 'Deploy prohibited AI systems (social scoring, manipulation, biometric categorization)', icon: '❌' },
    { type: 'dont', text: 'Skip Code of Practice compliance for GPAI models (voluntary but recommended)', icon: '❌' },
    { type: 'dont', text: 'Ignore serious incident reporting requirements to AI Office', icon: '❌' },
    { type: 'dont', text: 'Underestimate implementation timeline - full enforcement starts August 2026', icon: '❌' },
    { type: 'dont', text: 'Deploy without proper AI literacy training for users and stakeholders', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'AI agent deployment in EU market or serving EU citizens',
      'GPAI models exceeding 10^25 FLOPs computational threshold',
      'High-risk AI systems in regulated sectors (healthcare, finance, transport)',
      'Regulatory compliance assessment for AI agent frameworks',
      'International AI governance alignment and best practices'
    ],
    avoidWhen: [
      'Non-EU deployments without EU citizen impact',
      'Minimal risk AI systems (games, spam filters, basic applications)',
      'Internal R&D without market deployment',
      'Academic research under specific exemptions',
      'Legacy systems with extended transition periods (until August 2027)'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Risk Classification Accuracy', measure: 'Correct categorization into Prohibited/High/Limited/Minimal risk tiers' },
    { metric: 'GPAI Model Compliance', measure: '11 global providers currently exceed 10^25 FLOPs threshold' },
    { metric: 'Red Teaming Coverage', measure: 'Systematic adversarial testing documenting risk identification and mitigation' },
    { metric: 'Cybersecurity Protection', measure: 'Defense against data poisoning, model evasion, adversarial attacks' },
    { metric: 'Incident Response Rate', measure: 'Timely reporting of serious incidents to EU AI Office' },
    { metric: 'Transparency Compliance', measure: 'User awareness of AI interaction and technical documentation quality' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Regulatory Compliance: Mandatory framework for AI agents serving EU market since August 2024',
    'GPAI Model Evaluation: 11 global providers must comply with 10^25 FLOPs threshold requirements',
    'Enterprise Risk Management: Systematic classification and mitigation for high-risk AI systems',
    'Cybersecurity Assessment: Comprehensive protection against AI-specific attack vectors and vulnerabilities',
    'International Standards: Reference framework influencing global AI governance and regulatory alignment'
  ];

  const references = [
    {
      title: 'Official EU AI Act Resources',
      items: [
        { title: 'EU AI Act Official Text (August 2024)', url: 'https://artificialintelligenceact.eu/' },
        { title: 'European Commission - AI Regulatory Framework', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
        { title: 'EU Parliament: AI Act First Regulation on Artificial Intelligence', url: 'https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence' },
        { title: 'High-level Summary of the AI Act', url: 'https://artificialintelligenceact.eu/high-level-summary/' }
      ]
    },
    {
      title: 'GPAI Models & 10^25 FLOPs Requirements',
      items: [
        { title: 'Overview of Guidelines for GPAI Models', url: 'https://artificialintelligenceact.eu/gpai-guidelines-overview/' },
        { title: 'Providers of General-Purpose AI Models - Who Qualifies', url: 'https://artificialintelligenceact.eu/providers-of-general-purpose-ai-models-what-we-know-about-who-will-qualify/' },
        { title: 'European Commission Guidelines for GPAI Model Providers', url: 'https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250724-european-commission-issues-guidelines-for-providers-of-general-purpose-ai-models' },
        { title: 'General-Purpose AI Models FAQ', url: 'https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers' }
      ]
    },
    {
      title: 'Legal Analysis & Implementation',
      items: [
        { title: 'OpenAI: EU AI Act Primer for Providers and Deployers', url: 'https://openai.com/global-affairs/a-primer-on-the-eu-ai-act/' },
        { title: 'WilmerHale: Navigating Generative AI Under EU AI Act', url: 'https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20241002-navigating-generative-ai-under-the-european-unions-artificial-intelligence-act' },
        { title: 'Vinson & Elkins: Build Once, Comply Twice Analysis', url: 'https://www.velaw.com/insights/build-once-comply-twice-the-eu-ai-acts-next-phase-is-around-the-corner/' },
        { title: 'EU AI Act Compliance Checker Tool', url: 'https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/' }
      ]
    },
    {
      title: 'Red Teaming & Cybersecurity Requirements',
      items: [
        { title: 'Red Teaming AI Policy and EU AI Act (arXiv:2506.01931)', url: 'https://arxiv.org/abs/2506.01931' },
        { title: 'AI Red Teaming Regulations and Standards', url: 'https://www.pillar.security/blog/ai-red-teaming-regulations-and-standards' },
        { title: 'Prompt Security: EU AI Act Overview', url: 'https://www.prompt.security/eu-ai-act' },
        { title: 'Cyber Defense Magazine: EU AI Act Security Perspective', url: 'https://www.cyberdefensemagazine.com/preparing-for-eu-ai-act-from-a-security-perspective/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="European Union regulatory framework for AI agent evaluation with risk-based classification, GPAI model requirements, and mandatory compliance for deployment in EU"
        why="Comprehensive legal framework classifying AI systems into 4 risk tiers with specific obligations for systemic risk models exceeding 10^25 FLOPs"
        keyInsight="11 global providers exceed GPAI threshold - mandatory red teaming, cybersecurity protection, and 2-week notification required since August 2024"
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

export default EuAiActFrameworkDetails;