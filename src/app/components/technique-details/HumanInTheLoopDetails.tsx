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

interface HumanInTheLoopDetailsProps {
  selectedTechnique: any;
}

export const HumanInTheLoopDetails: React.FC<HumanInTheLoopDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Triggers', detail: 'Set confidence thresholds & intervention points' },
      { num: '2', action: 'Design Interface', detail: 'Create human-friendly decision interfaces' },
      { num: '3', action: 'Route Decisions', detail: 'Channel complex cases to domain experts' },
      { num: '4', action: 'Capture Feedback', detail: 'Record human decisions & reasoning' },
      { num: '5', action: 'Learn & Adapt', detail: 'Update AI models from human expertise' }
    ],
    example: 'confidence_check → human_escalation → expert_decision → feedback_capture → model_update'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Set clear confidence thresholds for human escalation', icon: '✅' },
    { type: 'do', text: 'Design intuitive interfaces for human decision-makers', icon: '✅' },
    { type: 'do', text: 'Capture reasoning behind human decisions for learning', icon: '✅' },
    { type: 'do', text: 'Route decisions to appropriate domain experts', icon: '✅' },
    { type: 'do', text: 'Implement active learning from human feedback', icon: '✅' },
    { type: 'dont', text: 'Escalate every decision to humans (automation defeats purpose)', icon: '❌' },
    { type: 'dont', text: 'Ignore human feedback in model improvement cycles', icon: '❌' },
    { type: 'dont', text: 'Overload humans with too many simultaneous decisions', icon: '❌' },
    { type: 'dont', text: 'Skip validation of human decision quality', icon: '❌' },
    { type: 'dont', text: 'Use HITL where HOTL supervision would suffice', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-stakes decisions requiring human judgment',
      'Complex cases with ambiguous outcomes',
      'Safety-critical applications',
      'Regulatory compliance requirements'
    ],
    avoidWhen: [
      'High-volume, low-stakes decisions',
      'Time-critical autonomous operations',
      'Well-defined rule-based processes',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Escalation Rate', measure: 'Percentage of decisions requiring human input' },
    { metric: 'Human Decision Quality', measure: 'Accuracy and consistency of human choices' },
    { metric: 'Response Time', measure: 'Time from escalation to human decision' },
    { metric: 'Learning Efficiency', measure: 'AI improvement from human feedback' },
    { metric: 'Cost per Decision', measure: 'Total cost including human expert time' },
    { metric: 'User Satisfaction', measure: 'Satisfaction with human-AI collaboration' }
  ];

  const topUseCases = [
    'Medical Diagnosis: AI screens routine cases, escalates complex symptoms to doctors with 95% accuracy improvement',
    'Legal Document Review: AI processes standard contracts, routes complex clauses to lawyers reducing review time by 60%',
    'Content Moderation: AI handles clear violations, escalates nuanced cases to human moderators with 98% policy compliance',
    'Financial Fraud Detection: AI flags suspicious transactions, routes complex patterns to analysts with 40% false positive reduction',
    'Autonomous Vehicle Safety: AI handles normal driving, immediately transfers control to human drivers in emergency situations'
  ];

  const references = [
    {
      title: 'Foundational Research Papers',
      items: [
        { title: 'Human-in-the-loop machine learning: a state of the art - Artificial Intelligence Review (2022)', url: 'https://link.springer.com/article/10.1007/s10462-022-10246-w' },
        { title: 'Human-In-The-Loop Machine Learning for Safe and Ethical Autonomous Vehicles (arXiv:2408.12548)', url: 'https://arxiv.org/abs/2408.12548' },
        { title: 'Human-in-the-loop machine learning: Reconceptualizing the role of the user - ScienceDirect (2023)', url: 'https://www.sciencedirect.com/science/article/pii/S2542660523003712' },
        { title: 'Human-in-the-Loop Reinforcement Learning: A Survey - JAIR (2024)', url: 'https://jair.org/index.php/jair/article/view/15348' }
      ]
    },
    {
      title: 'Technical Implementation Guides',
      items: [
        { title: 'What Is Human In The Loop (HITL)? - IBM Think', url: 'https://www.ibm.com/think/topics/human-in-the-loop' },
        { title: 'Human in the Loop Machine Learning: The Key to Better Models - Label Your Data (2025)', url: 'https://labelyourdata.com/articles/human-in-the-loop-in-machine-learning' },
        { title: 'What is human in the loop? Definition, Benefits, and Examples - Infobip', url: 'https://www.infobip.com/glossary/human-in-the-loop' },
        { title: 'Human-in-the-Loop: Why Oversight Is Essential - Brainsquawk.ai', url: 'https://brainsquawk.ai/human-in-the-loop-why-oversight-is-essential-but-complicated-in-ai-systems/' }
      ]
    },
    {
      title: 'Industry Applications & Case Studies',
      items: [
        { title: 'Applications, Challenges, and Future Directions of Human-in-the-Loop Learning (2024)', url: 'https://www.researchgate.net/publication/380628365_Applications_Challenges_and_Future_Directions_of_Human-in-the-Loop_Learning' },
        { title: 'Human in the Loop: How AI is Redefining Insights in 2025 - RivalTech', url: 'https://www.rivaltech.com/blog/human-in-the-loop-ai' },
        { title: 'Human-in-the-Loop Approach: Bridging AI & Human Expertise - ThoughtSpot', url: 'https://www.thoughtspot.com/data-trends/artificial-intelligence/human-in-the-loop' },
        { title: 'Humans in the Loop | Human-in-the-Loop pipelines for AI', url: 'https://humansintheloop.org/' }
      ]
    },
    {
      title: 'Academic Research & Standards',
      items: [
        { title: 'A survey of human-in-the-loop for machine learning - ScienceDirect (2022)', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0167739X22001790' },
        { title: 'Formalising Human-in-the-Loop: Computational Reductions - arXiv (2024)', url: 'https://arxiv.org/html/2505.10426' },
        { title: 'Human in the Loop? Research Project - HIIG Institute', url: 'https://www.hiig.de/en/project/human-in-the-loop/' },
        { title: 'What Is Human-in-the-Loop? A Simple Guide - CareerFoundry', url: 'https://careerfoundry.com/en/blog/data-analytics/human-in-the-loop/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Strategic integration of human judgment at critical decision points in AI workflows with active participation"
        why="Combines AI efficiency with human expertise for complex decisions, ensuring safety and quality in high-stakes scenarios"
        keyInsight="Humans actively participate in decision-making process, providing continuous feedback that improves AI performance"
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

export default HumanInTheLoopDetails;