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

interface AgentStatusActivityPatternsDetailsProps {
  selectedTechnique?: any;
}

export const AgentStatusActivityPatternsDetails: React.FC<AgentStatusActivityPatternsDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Status States', detail: 'Define thinking, processing, waiting, completed states' },
      { num: '2', action: 'Visual Indicators', detail: 'Animated icons, progress bars, and status badges' },
      { num: '3', action: 'Real-time Updates', detail: 'WebSocket or polling for live status changes' },
      { num: '4', action: 'Progress Tracking', detail: 'Show percentage complete and time estimates' },
      { num: '5', action: 'Activity Logs', detail: 'Timestamped history of agent actions' }
    ],
    example: 'Thinking 🧠 → Processing ⚙️ → Searching 🔍 → Completed ✅'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Show status updates within 100ms of state changes', icon: '✅' },
    { type: 'do', text: 'Use consistent icons and animations across all states', icon: '✅' },
    { type: 'do', text: 'Provide meaningful descriptions of current activities', icon: '✅' },
    { type: 'do', text: 'Display progress bars for long-running tasks', icon: '✅' },
    { type: 'do', text: 'Include estimated completion times when possible', icon: '✅' },
    { type: 'dont', text: 'Use generic "loading" states without context', icon: '❌' },
    { type: 'dont', text: 'Show rapid status flickering or jumpy animations', icon: '❌' },
    { type: 'dont', text: 'Hide critical error states from the user', icon: '❌' },
    { type: 'dont', text: 'Leave users guessing what the agent is doing', icon: '❌' },
    { type: 'dont', text: 'Overwhelm with too many simultaneous status indicators', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Long-running agent tasks (>2 seconds)',
      'Multi-step workflows with dependencies',
      'Background processing tasks',
      'Users need progress visibility'
    ],
    avoidWhen: [
      'Instant responses (<500ms)',
      'Simple confirmation actions',
      'Static information displays',
      'Single-step operations'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Status Clarity', measure: 'User understanding of agent activity' },
    { metric: 'Update Latency', measure: 'Time between state change and UI update' },
    { metric: 'Progress Accuracy', measure: 'Estimation vs actual completion time' },
    { metric: 'User Interruptions', measure: 'Frequency of unnecessary user interventions' },
    { metric: 'Error Recovery', measure: 'Success rate of handling failed states' },
    { metric: 'Trust Building', measure: 'User confidence in agent reliability' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Document Processing: Show parsing → analysis → summarization → completion stages',
    'Data Analysis: Display loading → processing → calculating → visualizing status',
    'Search Operations: Indicate querying → filtering → ranking → presenting results',
    'Background Tasks: Monitor email sync, backup, or cleanup operations',
    'Multi-Agent Systems: Track status of multiple agents working in parallel'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Real-time Status Indicators in Human-Computer Interaction (Nielsen, 2006)', url: 'https://www.nngroup.com/articles/response-times-3-important-limits/' },
        { title: 'CHI 2024: Trust and Transparency in AI Agent Status Communication', url: 'https://dl.acm.org/doi/proceedings/10.1145/3613904' },
        { title: 'Progress Indicators and User Perception (Myers, 1985)', url: 'https://dl.acm.org/doi/10.1145/3638.3643' },
        { title: 'Feedback and Human Performance in Computer Systems (Wickens, 1984)', url: 'https://www.semanticscholar.org/paper/Feedback-and-Human-Performance-Wickens' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Google Material Design - Progress Indicators', url: 'https://material.io/components/progress-indicators' },
        { title: 'Apple Human Interface Guidelines - Activity Indicators', url: 'https://developer.apple.com/design/human-interface-guidelines/activity-indicators' },
        { title: 'Microsoft Fluent Design - Progress Controls', url: 'https://docs.microsoft.com/en-us/windows/apps/design/controls/progress-controls' },
        { title: 'W3C Accessibility Guidelines - Status Messages', url: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'React Spinners - Loading Animations', url: 'https://github.com/davidhu2000/react-spinners' },
        { title: 'Lottie - Complex Status Animations', url: 'https://airbnb.io/lottie/' },
        { title: 'Framer Motion - Smooth Status Transitions', url: 'https://www.framer.com/motion/' },
        { title: 'Socket.IO - Real-time Status Updates', url: 'https://socket.io/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'UX Stack Exchange - Progress Indicators', url: 'https://ux.stackexchange.com/questions/tagged/progress-indicator' },
        { title: 'Design Systems Slack - Status Patterns', url: 'https://design-systems.slack.com/' },
        { title: 'Frontend Developer Discussions on Status UX', url: 'https://dev.to/t/ux' },
        { title: 'Accessibility in Status Communication', url: 'https://webaim.org/discussion/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Real-time visual indicators showing agent activities and operational status"
        why="Users need transparency about agent progress to build trust and know when intervention is needed"
        keyInsight="Show not just that agent is working, but specifically what it's doing and how long it might take"
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

export default AgentStatusActivityPatternsDetails;