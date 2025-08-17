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

interface ConstitutionalAiEvaluationDetailsProps {
  selectedTechnique: any;
}

export const ConstitutionalAiEvaluationDetails: React.FC<ConstitutionalAiEvaluationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Constitution', detail: 'Define principles & rules for AI behavior' },
      { num: '2', action: 'Classifiers', detail: 'Train input/output constitutional classifiers' },
      { num: '3', action: 'Red Team', detail: 'Conduct extensive adversarial testing' },
      { num: '4', action: 'Evaluate', detail: 'Measure jailbreak resistance & harmlessness' },
      { num: '5', action: 'Deploy', detail: 'Guard production systems with classifiers' }
    ],
    example: 'constitution → classifier_training → red_team_testing → jailbreak_eval → production_deploy'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use both input and output classifiers for comprehensive protection', icon: '✅' },
    { type: 'do', text: 'Conduct extensive red team testing (3000+ hours)', icon: '✅' },
    { type: 'do', text: 'Test against synthetic and human-generated jailbreaks', icon: '✅' },
    { type: 'do', text: 'Balance safety with usability (monitor over-refusal rates)', icon: '✅' },
    { type: 'do', text: 'Use constitutional principles for transparent AI alignment', icon: '✅' },
    { type: 'dont', text: 'Rely solely on base model safety without additional protection', icon: '❌' },
    { type: 'dont', text: 'Skip evaluation of computational overhead costs', icon: '❌' },
    { type: 'dont', text: 'Ignore edge cases and creative jailbreak attempts', icon: '❌' },
    { type: 'dont', text: 'Deploy without measuring over-refusal impact on users', icon: '❌' },
    { type: 'dont', text: 'Assume classifiers prevent all universal jailbreaks', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Production AI safety requirements',
      'High-stakes deployment scenarios',
      'Public-facing AI applications',
      'Regulatory compliance needs'
    ],
    avoidWhen: [
      'Internal development tools only',
      'Non-safety-critical applications',
      'Resource-constrained environments',
      'Research-only systems'
    ]
  };

  const keyMetrics = [
    { metric: 'Jailbreak Success Rate', measure: 'Percentage of successful attacks (target <5%)' },
    { metric: 'Over-refusal Rate', measure: 'False positive safety blocks (target <1%)' },
    { metric: 'Constitutional Adherence', measure: 'Compliance with defined principles (0-10)' },
    { metric: 'Red Team Resistance', measure: 'Performance against human adversaries' },
    { metric: 'Computational Overhead', measure: 'Additional processing cost (+20-30%)' },
    { metric: 'Universal Jailbreak Detection', measure: 'Cross-query attack prevention' }
  ];

  const topUseCases = [
    'Enterprise AI Safety: Production chatbots with 95%+ jailbreak resistance for customer service',
    'Educational AI Platforms: Safe AI tutors preventing harmful content generation for students',
    'Healthcare AI Systems: Constitutional compliance for medical advice and patient interaction',
    'Content Moderation: AI moderators with robust adversarial attack resistance',
    'Government AI Services: Public-facing AI with transparency and constitutional alignment'
  ];

  const references = [
    {
      title: 'Core Anthropic Research',
      items: [
        { title: 'Constitutional AI: Harmlessness from AI Feedback - Anthropic (2022)', url: 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback' },
        { title: 'Constitutional Classifiers: Defending against universal jailbreaks - Anthropic (2024)', url: 'https://www.anthropic.com/research/constitutional-classifiers' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (arXiv:2212.08073)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Collective Constitutional AI: Aligning with Public Input - Anthropic', url: 'https://www.anthropic.com/research/collective-constitutional-ai-aligning-a-language-model-with-public-input' }
      ]
    },
    {
      title: 'Technical Implementation',
      items: [
        { title: 'Mitigate jailbreaks and prompt injections - Anthropic Documentation', url: 'https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks' },
        { title: 'Constitutional Classifiers Public Demo - Jailbreak Challenge', url: 'https://www.anthropic.com/research/constitutional-classifiers' },
        { title: 'Progress from our Frontier Red Team - Anthropic (2024)', url: 'https://www.anthropic.com/research/progress-from-our-frontier-red-team' },
        { title: 'Anthropic Safety Research Hub', url: 'https://www.anthropic.com/research' }
      ]
    },
    {
      title: 'Industry Analysis & News',
      items: [
        { title: 'Anthropics Constitutional Classifiers vs. AI Jailbreakers - Prompt Engineering', url: 'https://promptengineering.org/anthropics-constitutional-classifiers-vs-ai-jailbreakers/' },
        { title: 'Anthropic Introduces Constitutional Classifiers - MarkTechPost', url: 'https://www.marktechpost.com/2025/02/03/anthropic-introduces-constitutional-classifiers-a-measured-ai-approach-to-defending-against-universal-jailbreaks/' },
        { title: 'Anthropic Dares You To Try To Jailbreak Claude AI - BGR', url: 'https://www.bgr.com/tech/anthropic-dares-you-to-try-to-jailbreak-claude-ai/' },
        { title: 'Anthropic challenges users to jailbreak AI model - Techzine Global', url: 'https://www.techzine.eu/news/applications/128391/anthropic-challenges-users-to-jailbreak-ai-model/' }
      ]
    },
    {
      title: 'Research Community',
      items: [
        { title: 'AI Alignment Forum - Constitutional AI Discussions', url: 'https://www.alignmentforum.org/tag/constitutional-ai' },
        { title: 'LessWrong - Constitutional AI Research', url: 'https://www.lesswrong.com/tag/constitutional-ai' },
        { title: 'AI Safety Research - Constitutional Approaches', url: 'https://aisafety.info/' },
        { title: 'Partnership on AI - Safety Guidelines', url: 'https://www.partnershiponai.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Anthropic's framework for evaluating AI safety through constitutional principles with jailbreak resistance testing"
        why="Provides robust defense against adversarial attacks while maintaining transparent, principle-based AI alignment"
        keyInsight="Constitutional Classifiers achieve 95.6% jailbreak blocking vs 14% baseline with only 0.38% over-refusal"
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

export default ConstitutionalAiEvaluationDetails;