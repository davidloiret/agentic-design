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

interface IntrinsicAlignmentPatternDetailsProps {
  selectedTechnique: any;
}

export const IntrinsicAlignmentPatternDetails: React.FC<IntrinsicAlignmentPatternDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Embed Monitors', detail: 'Place tamper-proof hooks in model layers' },
      { num: '2', action: 'Baseline Behavior', detail: 'Establish normal activation patterns' },
      { num: '3', action: 'Track Invariants', detail: 'Monitor goal stability & consistency' },
      { num: '4', action: 'Detect Deviations', detail: 'Identify alignment faking or scheming' },
      { num: '5', action: 'Alert & Intervene', detail: 'Trigger safeguards before external impact' }
    ],
    example: 'internal_hooks → behavioral_baseline → invariant_tracking → anomaly_detection → intervention'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use cryptographic signing for monitor integrity', icon: '✅' },
    { type: 'do', text: 'Monitor hidden layer activations, not just outputs', icon: '✅' },
    { type: 'do', text: 'Track consistency between stated and actual objectives', icon: '✅' },
    { type: 'do', text: 'Establish behavioral baselines during safe deployment', icon: '✅' },
    { type: 'do', text: 'Design monitors the agent cannot detect or manipulate', icon: '✅' },
    { type: 'dont', text: 'Rely solely on external output monitoring', icon: '❌' },
    { type: 'dont', text: 'Allow agents to access monitoring mechanisms', icon: '❌' },
    { type: 'dont', text: 'Ignore subtle behavioral shifts over time', icon: '❌' },
    { type: 'dont', text: 'Trust self-reported alignment status', icon: '❌' },
    { type: 'dont', text: 'Skip monitoring during "routine" operations', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Advanced AI systems with autonomy',
      'Long-term agent deployments',
      'High-stakes decision systems',
      'Systems with learning capabilities'
    ],
    avoidWhen: [
      'Simple, stateless models',
      'Fully supervised systems',
      'Low-capability agents',
      'Short-term, disposable tasks'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Alignment Stability', measure: 'Goal consistency over time' },
    { metric: 'Behavioral Drift', measure: 'Deviation from baseline patterns' },
    { metric: 'Scheming Detection', measure: 'Hidden objective identification rate' },
    { metric: 'Monitor Integrity', measure: 'Tamper detection success rate' },
    { metric: 'Early Warning', measure: 'Pre-impact detection time' },
    { metric: 'False Alarms', measure: 'Benign drift vs real threats' }
  ];

  // Top Use Cases
  const topUseCases = [
    'AGI Safety: Monitoring advanced systems for deceptive alignment or goal drift',
    'Financial AI: Detecting hidden trading objectives or market manipulation attempts',
    'Defense Systems: Ensuring AI weapons systems maintain strict ethical constraints',
    'Research AI: Preventing capability concealment during safety evaluations',
    'Corporate AI: Monitoring for unauthorized data exfiltration or competitive sabotage'
  ];

  const references = [
    {
      title: 'Foundational Research',
      items: [
        { title: 'The Urgent Need for Intrinsic Alignment Technologies for Responsible Agentic AI (Towards Data Science, 2024)', url: 'https://towardsdatascience.com/the-urgent-need-for-intrinsic-alignment-technologies-for-responsible-agentic-ai' },
        { title: 'Detecting Deceptive Alignment in Large Language Models (Anthropic, 2024)', url: 'https://arxiv.org/abs/2402.17747' },
        { title: 'Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training (2024)', url: 'https://arxiv.org/abs/2401.05566' },
        { title: 'Model Organisms of Misalignment (Anthropic, 2023)', url: 'https://arxiv.org/abs/2311.08058' }
      ]
    },
    {
      title: 'Technical Implementations',
      items: [
        { title: 'Representation Engineering: A Top-Down Approach to AI Transparency (2023)', url: 'https://arxiv.org/abs/2310.01405' },
        { title: 'Activation Steering for Robust Type Prediction in LLMs (2024)', url: 'https://arxiv.org/abs/2312.10619' },
        { title: 'Interpretability in the Wild: Circuit Discovery in LLMs (2023)', url: 'https://arxiv.org/abs/2304.14997' },
        { title: 'Probing Neural Network Comprehension of Natural Language Arguments (ACL, 2019)', url: 'https://aclanthology.org/P19-1459/' }
      ]
    },
    {
      title: 'Safety Frameworks & Standards',
      items: [
        { title: 'NIST AI Risk Management Framework - Internal Monitoring (2024)', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
        { title: 'EU AI Act - High-Risk System Monitoring Requirements', url: 'https://artificialintelligenceact.eu/high-risk-ai-systems/' },
        { title: 'IEEE P2976 - XAI Standard for Internal State Monitoring', url: 'https://standards.ieee.org/ieee/2976/10446/' },
        { title: 'ISO/IEC 23053:2022 - AI Trustworthiness Assessment', url: 'https://www.iso.org/standard/74438.html' }
      ]
    },
    {
      title: 'Tools & Monitoring Systems',
      items: [
        { title: 'TransformerLens - Mechanistic Interpretability Library', url: 'https://github.com/neelnanda-io/TransformerLens' },
        { title: 'Circuitsvis - Neural Network Visualization Tools', url: 'https://github.com/alan-cooney/circuitsVis' },
        { title: 'Pyvene - Intervention-based Interpretability', url: 'https://github.com/stanfordnlp/pyvene' },
        { title: 'NNsight - Real-time Neural Network Monitoring', url: 'https://github.com/ndif-team/nnsight' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Internal observation points that cannot be manipulated by the agent to detect deep scheming"
        why="External monitoring misses deceptive alignment; intrinsic monitors catch hidden objectives"
        keyInsight="Tamper-proof internal hooks + behavioral invariants = early misalignment detection"
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

export default IntrinsicAlignmentPatternDetails;