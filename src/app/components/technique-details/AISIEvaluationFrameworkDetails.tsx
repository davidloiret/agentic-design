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

interface AISIEvaluationFrameworkDetailsProps {
  selectedTechnique: any;
}

export const AISIEvaluationFrameworkDetails: React.FC<AISIEvaluationFrameworkDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Risk Model', detail: 'Define threat scenarios & capability thresholds' },
      { num: '2', action: 'Tier Testing', detail: 'Automated → Manual → Expert red-teaming' },
      { num: '3', action: 'Evaluate', detail: 'Capability, misuse, societal impact assessment' },
      { num: '4', action: 'Threshold', detail: 'Compare results against safety thresholds' },
      { num: '5', action: 'Decision', detail: 'Deploy, mitigate, or restrict based on assessment' }
    ],
    example: 'preregister → tier_1_auto → tier_2_manual → tier_3_expert → safety_decision'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Preregister evaluation design before testing', icon: '✅' },
    { type: 'do', text: 'Use three-tier progressive evaluation system', icon: '✅' },
    { type: 'do', text: 'Combine automated and expert red-teaming', icon: '✅' },
    { type: 'do', text: 'Test for capability thresholds indicating severe risks', icon: '✅' },
    { type: 'do', text: 'Implement rigorous information security protocols', icon: '✅' },
    { type: 'dont', text: 'Rely solely on automated evaluations for high-risk models', icon: '❌' },
    { type: 'dont', text: 'Skip expert red-teaming for frontier systems', icon: '❌' },
    { type: 'dont', text: 'Ignore societal impact and misuse potential', icon: '❌' },
    { type: 'dont', text: 'Deploy without meeting safety threshold requirements', icon: '❌' },
    { type: 'dont', text: 'Overlook international coordination standards', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Frontier AI model deployment',
      'Government compliance requirements',
      'International safety coordination',
      'High-capability system assessment'
    ],
    avoidWhen: [
      'Low-risk AI applications',
      'Non-frontier model evaluation',
      'Simple automation tasks',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Capability Score', measure: 'Autonomous capability assessment (0-100%)' },
    { metric: 'Misuse Potential', measure: 'Risk of malicious use exploitation' },
    { metric: 'Safety Threshold', measure: 'Pass/fail against predefined limits' },
    { metric: 'Expert Assessment', measure: 'Red-team evaluation outcomes' },
    { metric: 'Societal Impact', measure: 'Broad societal risk evaluation' },
    { metric: 'Compliance Rate', measure: 'International standard adherence' }
  ];

  const topUseCases = [
    'Frontier AI Safety Assessment: GPT-5/Claude-4 level models requiring government approval',
    'International Coordination: Multi-country safety evaluation protocols (UK-US-EU)',
    'Regulatory Compliance: Meeting AI Safety Institute requirements for deployment',
    'Capability Threshold Testing: Identifying dangerous autonomous capabilities',
    'Red-team Security Assessment: Expert-led adversarial testing for misuse prevention'
  ];

  const references = [
    {
      title: 'Official AISI Publications',
      items: [
        { title: 'Early lessons from evaluating frontier AI systems - AISI (2024)', url: 'https://www.aisi.gov.uk/work/early-lessons-from-evaluating-frontier-ai-systems' },
        { title: 'Conference on frontier AI safety frameworks - AISI (2024)', url: 'https://www.aisi.gov.uk/work/conference-on-frontier-ai-safety-frameworks' },
        { title: 'AISI Inspect Tool - Open Source AI Safety Evaluations', url: 'https://github.com/UKGovernmentBEIS/inspect_ai' },
        { title: 'Frontier AI Safety Commitments - AI Seoul Summit 2024', url: 'https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024' }
      ]
    },
    {
      title: 'International Network & Standards',
      items: [
        { title: 'International Network of AI Safety Institutes - US Commerce Dept (2024)', url: 'https://www.commerce.gov/news/fact-sheets/2024/11/fact-sheet-us-department-commerce-us-department-state-launch-international' },
        { title: 'AI Safety Institute International Network - CSIS Analysis (2024)', url: 'https://www.csis.org/analysis/ai-safety-institute-international-network-next-steps-and-recommendations' },
        { title: 'Progress Update: Advancing Frontier AI Safety - Frontier Model Forum (2024)', url: 'https://www.frontiermodelforum.org/updates/progress-update-advancing-frontier-ai-safety-in-2024-and-beyond/' },
        { title: 'AI Safety Fund - $1M Research Collaboration (2024)', url: 'https://www.aisafetyfund.org/' }
      ]
    },
    {
      title: 'Research & Technical Implementation',
      items: [
        { title: 'Preregistration for AI Safety Evaluations - Research Methodology', url: 'https://arxiv.org/abs/2405.13568' },
        { title: 'Capability Thresholds for AI Safety - Technical Framework', url: 'https://arxiv.org/abs/2404.12590' },
        { title: 'Expert Red-teaming of Frontier AI Systems - Best Practices', url: 'https://arxiv.org/abs/2406.01849' },
        { title: 'AI Agent Evaluation in Sandbox Environments - AISI Technical Report', url: 'https://www.aisi.gov.uk/research/agent-evaluation' }
      ]
    },
    {
      title: 'Policy & Governance',
      items: [
        { title: 'AI Safety Institute Global Landscape - All Tech Is Human (2024)', url: 'https://alltechishuman.org/all-tech-is-human-blog/the-global-landscape-of-ai-safety-institutes' },
        { title: '2025 AI Safety Index - Future of Life Institute', url: 'https://futureoflife.org/ai-safety-index-summer-2025/' },
        { title: 'AI Safety Institute - Wikipedia Overview', url: 'https://en.wikipedia.org/wiki/AI_Safety_Institute' },
        { title: 'UK AI Security Institute - Name Change Announcement (Feb 2025)', url: 'https://www.aisi.gov.uk/news/ai-security-institute' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Government-standard evaluation framework for frontier AI systems with three-tier progressive testing"
        why="Ensures systematic safety assessment before deployment, enables international coordination, prevents high-risk AI misuse"
        keyInsight="Capability thresholds + Expert red-teaming + Preregistered evaluation = Safe frontier AI deployment"
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

export default AISIEvaluationFrameworkDetails;