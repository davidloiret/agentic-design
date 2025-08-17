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

interface NistAriaDetailsProps {
  selectedTechnique: any;
}

export const NistAriaDetails: React.FC<NistAriaDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Prepare', detail: 'Document models, approaches, mitigations, and governance processes' },
      { num: '2', action: 'Submit', detail: 'Apply through NIST ARIA portal with required documentation' },
      { num: '3', action: 'Layer 1', detail: 'Complete model testing and technical evaluation' },
      { num: '4', action: 'Layer 2', detail: 'Undergo red-teaming and adversarial assessment' },
      { num: '5', action: 'Layer 3', detail: 'Participate in field testing in realistic settings' }
    ],
    example: 'aria_submission = NistAria(model=llm, docs=governance, layers=[testing, red_team, field])'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Provide comprehensive documentation of governance processes and mitigations', icon: '✅' },
    { type: 'do', text: 'Focus on contextual robustness beyond just performance metrics', icon: '✅' },
    { type: 'do', text: 'Prepare for three-layer evaluation: testing, red-teaming, field studies', icon: '✅' },
    { type: 'do', text: 'Align with AI Risk Management Framework (AI RMF) principles', icon: '✅' },
    { type: 'do', text: 'Submit through official NIST ARIA portal with proper application', icon: '✅' },
    { type: 'dont', text: 'Expect evaluation focused only on technical performance accuracy', icon: '❌' },
    { type: 'dont', text: 'Skip documentation requirements - they impact final scoring', icon: '❌' },
    { type: 'dont', text: 'Ignore societal impact considerations in evaluation design', icon: '❌' },
    { type: 'dont', text: 'Submit without proper governance and risk mitigation documentation', icon: '❌' },
    { type: 'dont', text: 'Treat this as traditional benchmark - focuses on real-world robustness', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Government and regulatory compliance requirements',
      'Large language model deployment validation',
      'Establishing trustworthy AI credentials',
      'Pre-deployment risk assessment needs',
      'AI Safety Institute collaboration opportunities'
    ],
    avoidWhen: [
      'Early-stage prototype or research models',
      'Non-LLM AI systems (outside current scope)',
      'Quick technical performance benchmarking only',
      'Private internal evaluations without regulatory needs',
      'Models not ready for real-world deployment scenarios'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Contextual Robustness Index (CoRIx)', measure: 'Overall score indicating deployment condition robustness' },
    { metric: 'Technical Robustness', measure: 'Model performance across varied conditions' },
    { metric: 'Societal Impact Assessment', measure: 'Real-world deployment safety and trustworthiness' },
    { metric: 'Documentation Completeness', measure: 'Quality of governance and mitigation documentation' },
    { metric: 'Red Team Resistance', measure: 'Performance under adversarial testing conditions' },
    { metric: 'Field Testing Success', measure: 'Effectiveness in realistic deployment scenarios' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Government AI Deployment: Federal agencies evaluating LLMs for mission-critical applications',
    'Regulatory Compliance: Organizations meeting AI governance requirements for trustworthy deployment',
    'Enterprise Risk Assessment: Large corporations validating AI systems before public deployment',
    'AI Safety Certification: Establishing credentials for safe and responsible AI system operation',
    'Research Validation: Academic institutions testing AI systems for societal impact assessment'
  ];

  const references = [
    {
      title: 'Official NIST ARIA Resources',
      items: [
        { title: 'NIST ARIA Program Official Website', url: 'https://ai-challenges.nist.gov/aria' },
        { title: 'NIST ARIA Program Launch Announcement (May 2024)', url: 'https://www.nist.gov/news-events/news/2024/05/nist-launches-aria-new-program-advance-sociotechnical-testing-and' },
        { title: 'ARIA 0.1 Pilot Evaluation Plan (PDF)', url: 'https://ai-challenges.nist.gov/aria/docs/evaluation_plan.pdf' },
        { title: 'ARIA Program Companion Document', url: 'https://ai-challenges.nist.gov/aria/docs/ARIA_Program_Companion_Document_Dec20.pdf' }
      ]
    },
    {
      title: 'NIST AI Framework & Guidelines',
      items: [
        { title: 'NIST AI Risk Management Framework (AI RMF 1.0)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        { title: 'NIST AI Test, Evaluation, Validation and Verification (TEVV)', url: 'https://www.nist.gov/ai-test-evaluation-validation-and-verification-tevv' },
        { title: 'NIST Artificial Intelligence Main Page', url: 'https://www.nist.gov/artificial-intelligence' },
        { title: 'ARIA Resources Library', url: 'https://ai-challenges.nist.gov/aria/library' }
      ]
    },
    {
      title: 'AI Safety Institute & Policy',
      items: [
        { title: 'U.S. AI Safety Institute (AISI)', url: 'https://www.nist.gov/artificial-intelligence/artificial-intelligence-safety-institute' },
        { title: 'AI Safety Institute Consortium', url: 'https://www.nist.gov/artificial-intelligence/artificial-intelligence-safety-institute-consortium' },
        { title: 'Executive Order on Safe, Secure, and Trustworthy AI', url: 'https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/' },
        { title: 'NIST AI Standards and Guidelines', url: 'https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering/collaboration-space/focus-areas/ai' }
      ]
    },
    {
      title: 'Industry Analysis & Coverage',
      items: [
        { title: 'Industrial Cyber: NIST ARIA Program Analysis', url: 'https://industrialcyber.co/ai/nist-launches-aria-program-to-assess-societal-impacts-ensure-trustworthy-ai-systems/' },
        { title: 'Complex Discovery: NIST ARIA Program Overview', url: 'https://complexdiscovery.com/nist-launches-aria-program-to-assess-ai-risks-and-impacts-in-real-world-scenarios/' },
        { title: 'Help Net Security: NIST ARIA Evaluation Framework', url: 'https://www.helpnetsecurity.com/2024/05/30/nist-aria/' },
        { title: 'Northwestern CASMI: ARIA Evaluation Analysis', url: 'https://casmi.northwestern.edu/news/articles/2024/the-new-dawn-of-ai-evaluation-nists-aria.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="NIST's official government framework for AI risk assessment through three-layer evaluation process"
        why="Operationalizes AI Risk Management Framework for real-world testing beyond laboratory performance metrics"
        keyInsight="Moves from technical accuracy to contextual robustness with CoRIx scoring for deployment readiness"
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

export default NistAriaDetails;