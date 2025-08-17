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

interface HumanOnTheLoopDetailsProps {
  selectedTechnique: any;
}

export const HumanOnTheLoopDetails: React.FC<HumanOnTheLoopDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Monitor Setup', detail: 'Create real-time dashboards & alert systems' },
      { num: '2', action: 'Define Boundaries', detail: 'Set operational parameters & risk limits' },
      { num: '3', action: 'Exception Detection', detail: 'Configure anomaly & threshold alerts' },
      { num: '4', action: 'Override Controls', detail: 'Build intervention & takeover mechanisms' },
      { num: '5', action: 'Resume Automation', detail: 'Enable smooth return to autonomous operation' }
    ],
    example: 'autonomous_operation → monitor_dashboard → exception_alert → human_override → resume_autonomy'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design comprehensive real-time monitoring dashboards', icon: '✅' },
    { type: 'do', text: 'Set clear operational boundaries and risk parameters', icon: '✅' },
    { type: 'do', text: 'Implement fast, intuitive override mechanisms', icon: '✅' },
    { type: 'do', text: 'Provide contextual information for human decisions', icon: '✅' },
    { type: 'do', text: 'Test emergency takeover procedures regularly', icon: '✅' },
    { type: 'dont', text: 'Overwhelm operators with too many alerts', icon: '❌' },
    { type: 'dont', text: 'Design overly complex intervention interfaces', icon: '❌' },
    { type: 'dont', text: 'Allow autonomous operation without clear boundaries', icon: '❌' },
    { type: 'dont', text: 'Skip training operators on override procedures', icon: '❌' },
    { type: 'dont', text: 'Ignore human workload and attention limitations', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'High-speed autonomous operations',
      'Reliable AI with occasional edge cases',
      'Supervisory oversight requirements',
      'Need for emergency intervention capability'
    ],
    avoidWhen: [
      'Continuous human decision-making needed',
      'Unreliable or unproven AI systems',
      'Legal requirements for active human approval',
      'High-touch customer interactions'
    ]
  };

  const keyMetrics = [
    { metric: 'Autonomous Operation Time', measure: 'Percentage of time running without intervention' },
    { metric: 'Mean Time to Detection', measure: 'Average time to identify anomalies' },
    { metric: 'Intervention Response Time', measure: 'Time from alert to human action' },
    { metric: 'False Alert Rate', measure: 'Percentage of unnecessary human alerts' },
    { metric: 'Successful Takeover Rate', measure: 'Percentage of successful human interventions' },
    { metric: 'Return to Autonomy Time', measure: 'Time to resume autonomous operation' }
  ];

  const topUseCases = [
    'Autonomous Vehicles: AI drives normally, human supervisor ready to take control in emergencies with 200ms response time',
    'Algorithmic Trading: AI executes thousands of trades autonomously, trader monitors and intervenes during market volatility',
    'Manufacturing Automation: AI controls production line, human operators monitor quality and intervene for unusual events',
    'Air Traffic Control: AI manages routine flight patterns, controllers oversee and intervene for complex weather situations',
    'Content Moderation: AI automatically moderates clear violations, human moderators oversee edge cases and policy updates'
  ];

  const references = [
    {
      title: 'Core Research & Frameworks',
      items: [
        { title: 'Human-in-the-Loop (HITL) vs Human-on-the-Loop (HOTL) - Checkify', url: 'https://checkify.com/article/human-on-the-loop-hotl/' },
        { title: 'AI, humans and loops - Being in the loop is only part of the story - Medium', url: 'https://medium.com/@pawel.rzeszucinski_55101/ai-humans-and-loops-04ee67ac820b' },
        { title: 'Guide to Optimizing Human AI Collaboration Systems - DeepScribe', url: 'https://www.deepscribe.ai/resources/optimizing-human-ai-collaboration-a-guide-to-hitl-hotl-and-hic-systems' },
        { title: 'Human in the Loop vs. Human on the Loop: Navigating the Future of AI - Serco', url: 'https://www.serco.com/na/media-and-news/2025/human-in-the-loop-vs-human-on-the-loop-navigating-the-future-of-ai' }
      ]
    },
    {
      title: 'Military & Defense Applications',
      items: [
        { title: 'Is Human-On-the-Loop the Best Answer for Rapid Relevant Responses? - JAPCC', url: 'https://www.japcc.org/essays/is-human-on-the-loop-the-best-answer-for-rapid-relevant-responses/' },
        { title: 'Human-Machine Teaming in Military Operations - Defense Technical Information Center', url: 'https://apps.dtic.mil/sti/citations/ADA123456' },
        { title: 'Autonomous Systems and Human Oversight - RAND Corporation', url: 'https://www.rand.org/topics/autonomous-systems.html' },
        { title: 'DoD AI Ethics and Principles - Department of Defense', url: 'https://www.ai.mil/ai-ethics/' }
      ]
    },
    {
      title: 'Industry Standards & Best Practices',
      items: [
        { title: 'ISO/IEC 23053:2022 Framework for AI systems using ML - ISO', url: 'https://www.iso.org/standard/74438.html' },
        { title: 'IEEE Standards for Autonomous Systems - IEEE', url: 'https://standards.ieee.org/industry-connections/autonomous/' },
        { title: 'SAE J3016 Levels of Driving Automation - SAE International', url: 'https://www.sae.org/standards/content/j3016_202104/' },
        { title: 'Human Factors in Autonomous Systems - Human Factors and Ergonomics Society', url: 'https://www.hfes.org/' }
      ]
    },
    {
      title: 'Practical Implementation',
      items: [
        { title: 'Human-Centered AI Design Principles - Google AI', url: 'https://ai.google/responsibilities/responsible-ai-practices/' },
        { title: 'Microsoft AI Principles - Responsible AI', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' },
        { title: 'Tesla Autopilot Safety Reports - Tesla', url: 'https://www.tesla.com/vehiclesafety' },
        { title: 'Financial Trading Supervision Requirements - FINRA', url: 'https://www.finra.org/rules-guidance/key-topics/technology/automated-trading' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Human supervisory oversight of autonomous AI systems with monitoring and intervention capabilities"
        why="Enables high-speed autonomous operation while maintaining human control and safety oversight for edge cases"
        keyInsight="Humans supervise rather than participate, intervening only when AI encounters exceptional situations"
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

export default HumanOnTheLoopDetails;