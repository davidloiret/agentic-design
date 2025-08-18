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

interface CrossPlatformAgentUxDetailsProps {
  selectedTechnique: any;
}

export const CrossPlatformAgentUxDetails: React.FC<CrossPlatformAgentUxDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design System', detail: 'Unified colors, typography, layouts' },
      { num: '2', action: 'State Sync', detail: 'Real-time cross-device synchronization' },
      { num: '3', action: 'Platform Adaptation', detail: 'Device-specific optimizations' },
      { num: '4', action: 'Context Transfer', detail: 'Seamless device switching' },
      { num: '5', action: 'Feature Parity', detail: 'Consistent capabilities across platforms' }
    ],
    example: 'design_system → state_sync → platform_adaptation → context_transfer → feature_parity'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Maintain visual consistency across all platforms', icon: '✅' },
    { type: 'do', text: 'Adapt interactions to platform conventions (gestures, navigation)', icon: '✅' },
    { type: 'do', text: 'Sync agent state and conversation history in real-time', icon: '✅' },
    { type: 'do', text: 'Preserve context when users switch between devices', icon: '✅' },
    { type: 'do', text: 'Optimize for each platform\'s strengths and capabilities', icon: '✅' },
    { type: 'dont', text: 'Create completely different experiences per platform', icon: '❌' },
    { type: 'dont', text: 'Ignore platform-specific interaction patterns', icon: '❌' },
    { type: 'dont', text: 'Lose conversation state during device transitions', icon: '❌' },
    { type: 'dont', text: 'Force mobile interfaces to match desktop layouts', icon: '❌' },
    { type: 'dont', text: 'Sacrifice performance for visual consistency', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Multi-device user workflows',
      'Consumer-facing applications',
      'Enterprise productivity tools',
      'Mobile-first agent experiences'
    ],
    avoidWhen: [
      'Single-platform specialized tools',
      'Resource-constrained environments',
      'Platform-specific features required',
      'Simple single-purpose applications'
    ]
  };

  const keyMetrics = [
    { metric: 'Cross-Device Usage', measure: '% users active on multiple platforms' },
    { metric: 'Context Transfer Success', measure: 'Seamless device switching rate' },
    { metric: 'Platform Consistency Score', measure: 'UI/UX uniformity rating' },
    { metric: 'Feature Parity', measure: 'Capability availability across platforms' },
    { metric: 'Sync Performance', measure: 'Real-time state synchronization latency' },
    { metric: 'User Satisfaction', measure: 'Cross-platform experience rating' }
  ];

  const topUseCases = [
    'Personal Assistant: mobile voice → desktop detailed responses → tablet visual review',
    'Enterprise Tools: mobile field work → desktop analysis → tablet presentations',
    'Customer Support: phone initial contact → web detailed troubleshooting → app follow-up',
    'E-commerce: mobile browsing → desktop purchasing → tablet order tracking',
    'Education: mobile quick questions → desktop study sessions → tablet interactive content'
  ];

  const references = [
    {
      title: 'Design Systems',
      items: [
        { title: 'Material Design - Cross-Platform Guidelines', url: 'https://material.io/design/platform-guidance/cross-platform-adaptation.html' },
        { title: 'Apple Human Interface Guidelines - Multi-Platform Design', url: 'https://developer.apple.com/design/human-interface-guidelines/' },
        { title: 'Microsoft Fluent Design - Cross-Device Experiences', url: 'https://www.microsoft.com/design/fluent/' },
        { title: 'IBM Carbon Design System - Multi-Platform Components', url: 'https://carbondesignsystem.com/guidelines/2x-grid/overview/' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'React Native - Cross-Platform Development', url: 'https://reactnative.dev/docs/getting-started' },
        { title: 'Flutter - Multi-Platform UI Framework', url: 'https://flutter.dev/docs' },
        { title: 'Electron - Desktop App Development', url: 'https://www.electronjs.org/docs/latest/' },
        { title: 'Progressive Web Apps - Cross-Platform Web Standards', url: 'https://web.dev/progressive-web-apps/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Expo - React Native Platform', url: 'https://github.com/expo/expo' },
        { title: 'Ionic - Cross-Platform Mobile Framework', url: 'https://github.com/ionic-team/ionic-framework' },
        { title: 'Xamarin - Microsoft Cross-Platform Development', url: 'https://github.com/xamarin/Xamarin.Forms' },
        { title: 'Cordova - Hybrid Mobile App Platform', url: 'https://github.com/apache/cordova' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Cross-Platform Development Reddit', url: 'https://reddit.com/r/crossplatform' },
        { title: 'UX Stack Exchange - Multi-Platform Design', url: 'https://ux.stackexchange.com/questions/tagged/cross-platform' },
        { title: 'Designer Hangout - Cross-Platform UX Community', url: 'https://designerhangout.co/' },
        { title: 'Mobile UX Planet - Platform Design Articles', url: 'https://uxplanet.org/tagged/mobile-ux' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Consistent agent experiences across desktop, mobile, and web with seamless synchronization and platform-optimized adaptation"
        why="Enables fluid multi-device workflows, maintains user context, and leverages each platform's unique strengths"
        keyInsight="Design consistency + platform adaptation + real-time sync → unified cross-device experience"
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

export default CrossPlatformAgentUxDetails;