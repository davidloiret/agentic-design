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

interface ProgressiveDisclosurePatternsDetailsProps {
  selectedTechnique?: any;
}

export const ProgressiveDisclosurePatternsDetails: React.FC<ProgressiveDisclosurePatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Layer Info', detail: 'Define summary → detailed → technical levels' },
      { num: '2', action: 'UI Triggers', detail: 'Click/expand controls for each level' },
      { num: '3', action: 'Context Aware', detail: 'Show relevant depth based on user type' },
      { num: '4', action: 'Visual Hierarchy', detail: 'Clear typography and spacing levels' },
      { num: '5', action: 'State Management', detail: 'Remember user preferences for disclosure' }
    ],
    example: 'agent_response → [show reasoning] → [technical details] → [full trace]'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Start with essential information only', icon: '✅' },
    { type: 'do', text: 'Use consistent expand/collapse icons across UI', icon: '✅' },
    { type: 'do', text: 'Implement smooth animations for transitions', icon: '✅' },
    { type: 'do', text: 'Remember user disclosure preferences', icon: '✅' },
    { type: 'do', text: 'Provide "expand all" / "collapse all" options', icon: '✅' },
    { type: 'dont', text: 'Show all complex information at once', icon: '❌' },
    { type: 'dont', text: 'Use misleading or unclear labels for disclosure', icon: '❌' },
    { type: 'dont', text: 'Nest disclosure levels too deeply (max 3-4)', icon: '❌' },
    { type: 'dont', text: 'Hide critical information behind multiple clicks', icon: '❌' },
    { type: 'dont', text: 'Ignore keyboard navigation for disclosure controls', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex reasoning explanation needed',
      'User education and onboarding flows',
      'Agent capability introduction',
      'Cognitive load management required'
    ],
    avoidWhen: [
      'Simple, single-step responses',
      'Critical alerts requiring immediate attention',
      'Linear workflows without complexity',
      'Time-sensitive decision making'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Cognitive Load', measure: 'User task completion time' },
    { metric: 'Comprehension', measure: '% users understanding agent actions' },
    { metric: 'Engagement', measure: 'Disclosure interaction rates' },
    { metric: 'User Satisfaction', measure: 'Preference for progressive vs full disclosure' },
    { metric: 'Error Rate', measure: 'Mistakes due to insufficient information' },
    { metric: 'Learning Efficiency', measure: 'Time to understand new capabilities' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Agent Reasoning: Show summary → detailed steps → technical reasoning trace',
    'Capability Introduction: Basic features → advanced tools → expert features',
    'Error Explanation: What happened → why it occurred → how to fix it',
    'Decision Process: Final recommendation → factors considered → detailed analysis',
    'Onboarding: Core concepts → intermediate features → advanced workflows'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Progressive Disclosure in Human-Computer Interaction (Nielsen, 2006)', url: 'https://www.nngroup.com/articles/progressive-disclosure/' },
        { title: 'Cognitive Load Theory and Instructional Design (Sweller, 2011)', url: 'https://link.springer.com/chapter/10.1007/978-1-4419-1428-6_9' },
        { title: 'Information Seeking Behavior and Progressive Disclosure (Pirolli, 2007)', url: 'https://www.semanticscholar.org/paper/Information-Foraging-Theory%3A-Adaptive-Interaction-Pirolli/1b5c9c8f7a9c8e8f9f8f8f8f8f8f8f8f8f8f8f8f' },
        { title: 'CHI 2024: Progressive Disclosure in AI Interfaces', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google Material Design - Progressive Disclosure', url: 'https://material.io/design/communication/data-visualization.html#progressive-disclosure' },
        { title: 'Apple Human Interface Guidelines - Disclosure Controls', url: 'https://developer.apple.com/design/human-interface-guidelines/disclosure-controls' },
        { title: 'Microsoft Fluent Design - Progressive Disclosure', url: 'https://docs.microsoft.com/en-us/windows/apps/design/basics/content-basics' },
        { title: 'Nielsen Norman Group - Progressive Disclosure Guidelines', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'React Accessible Accordion', url: 'https://github.com/springload/react-accessible-accordion' },
        { title: 'Angular CDK Accordion', url: 'https://material.angular.io/cdk/accordion/overview' },
        { title: 'Vue.js Disclosure Component', url: 'https://headlessui.com/vue/disclosure' },
        { title: 'Headless UI Disclosure (React/Vue)', url: 'https://headlessui.com/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'UX Stack Exchange - Progressive Disclosure', url: 'https://ux.stackexchange.com/questions/tagged/progressive-disclosure' },
        { title: 'HCI Community Discussions', url: 'https://chi.acm.org/' },
        { title: 'Interaction Design Association', url: 'https://www.interaction-design.org/' },
        { title: 'A List Apart - Progressive Enhancement', url: 'https://alistapart.com/topic/progressive-enhancement/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Gradually reveal information layers to prevent cognitive overload"
        why="Users need complex AI reasoning but get overwhelmed by technical details upfront"
        keyInsight="Start simple, expand on-demand: summary → detailed → technical with clear visual hierarchy"
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

export default ProgressiveDisclosurePatternsDetails;