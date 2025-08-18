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

interface AdaptiveInterfacePatternsDetailsProps {
  selectedTechnique?: any;
}

export const AdaptiveInterfacePatternsDetails: React.FC<AdaptiveInterfacePatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Context Detection', detail: 'Monitor user behavior, environment, and intent signals' },
      { num: '2', action: 'Adaptation Engine', detail: 'Real-time analysis and interface adjustment decisions' },
      { num: '3', action: 'Dynamic UI', detail: 'Flexible components that adapt layout, style, and content' },
      { num: '4', action: 'Learning Loop', detail: 'Capture feedback and improve adaptation accuracy' },
      { num: '5', action: 'User Control', detail: 'Override settings and adaptation preferences' }
    ],
    example: 'user_stressed → simplify_interface + reduce_options + gentle_tone'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Start with explicit user preferences and consent', icon: '✅' },
    { type: 'do', text: 'Provide clear adaptation explanations and controls', icon: '✅' },
    { type: 'do', text: 'Use multiple signals for robust context detection', icon: '✅' },
    { type: 'do', text: 'Implement graceful fallbacks for adaptation failures', icon: '✅' },
    { type: 'do', text: 'Allow users to override any automatic adaptation', icon: '✅' },
    { type: 'dont', text: 'Adapt too frequently or dramatically without warning', icon: '❌' },
    { type: 'dont', text: 'Use sensitive data without explicit consent', icon: '❌' },
    { type: 'dont', text: 'Hide adaptation logic completely from users', icon: '❌' },
    { type: 'dont', text: 'Assume adaptation preferences transfer between contexts', icon: '❌' },
    { type: 'dont', text: 'Sacrifice core functionality for adaptive features', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Users have diverse needs and contexts',
      'Long-term user engagement required',
      'Complex interfaces with many options',
      'Accessibility and inclusion are priorities'
    ],
    avoidWhen: [
      'Simple, single-purpose interfaces',
      'Highly regulated environments requiring consistency',
      'Privacy-sensitive contexts without consent mechanisms',
      'Time-critical applications where stability is crucial'
    ]
  };

  const keyMetrics = [
    { metric: 'Adaptation Accuracy', measure: '% of appropriate interface adjustments' },
    { metric: 'User Satisfaction', measure: 'Preference for adaptive vs static interface' },
    { metric: 'Task Completion', measure: 'Efficiency gains from personalization' },
    { metric: 'Error Reduction', measure: 'Mistakes prevented by context-aware adaptations' },
    { metric: 'Engagement', measure: 'Time spent and feature usage with adaptations' },
    { metric: 'Override Rate', measure: '% of adaptations manually reversed by users' }
  ];

  const topUseCases = [
    'Intent Detection: Adapt interface complexity based on user goals (quick vs detailed)',
    'Accessibility: Real-time adjustments for visual, motor, or cognitive needs',
    'Environmental Context: Interface changes for lighting, noise, device orientation',
    'Cognitive Load: Simplify during stress, expand during focused work sessions',
    'Expertise Level: Progressive feature exposure as user proficiency increases'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Context-Aware User Interfaces: A Survey (Dey & Abowd, 2000)', url: 'https://www.semanticscholar.org/paper/Towards-a-Better-Understanding-of-Context-and-Dey-Abowd/40d9b33f8c7e8f8f8f8f8f8f8f8f8f8f8f8f8f8f' },
        { title: 'Adaptive User Interfaces: Principles and Practice (Langley, 1999)', url: 'https://www.aaai.org/Papers/AAAI/1999/AAAI99-111.pdf' },
        { title: 'SELF-RAG: Learning to Retrieve, Generate and Critique (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' },
        { title: 'CHI 2024: Adaptive Interfaces for Human-AI Collaboration', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Adaptive UI Framework', url: 'https://docs.microsoft.com/en-us/windows/apps/design/input/custom-text-input' },
        { title: 'Google Material Design - Adaptive UI', url: 'https://material.io/design/layout/responsive-layout-grid.html' },
        { title: 'Apple Dynamic Type and Accessibility', url: 'https://developer.apple.com/accessibility/ios/' },
        { title: 'W3C User Agent Accessibility Guidelines', url: 'https://www.w3.org/WAI/UA/UAAG20/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'React Adaptive UI Components', url: 'https://github.com/adaptive-ui/react-adaptive-ui' },
        { title: 'TensorFlow.js for Client-side ML', url: 'https://www.tensorflow.org/js' },
        { title: 'MediaQuery React Hook', url: 'https://github.com/contra/react-responsive' },
        { title: 'Intersection Observer API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API' }
      ]
    },
    {
      title: 'Real-World Examples',
      items: [
        { title: 'Salesforce Einstein AI Adaptations', url: 'https://trailhead.salesforce.com/en/content/learn/modules/einstein-platform-basics' },
        { title: 'Netflix Adaptive Streaming Interface', url: 'https://netflixtechblog.com/artwork-personalization-c589f074ad76' },
        { title: 'Microsoft Office Adaptive Ribbon', url: 'https://docs.microsoft.com/en-us/office/dev/add-ins/design/add-in-commands' },
        { title: 'Google Assistant Adaptive Responses', url: 'https://developers.google.com/assistant/conversational/overview' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic UI/UX adaptation and creation based on user context, behavior, and real-time needs"
        why="One-size-fits-all interfaces fail to serve diverse users with varying contexts and abilities"
        keyInsight="Combine multiple signals (intent, environment, accessibility needs) for intelligent interface personalization"
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

export default AdaptiveInterfacePatternsDetails;