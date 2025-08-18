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

interface ErrorHandlingRecoveryPatternsDetailsProps {
  selectedTechnique?: any;
}

export const ErrorHandlingRecoveryPatternsDetails: React.FC<ErrorHandlingRecoveryPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Error Classification', detail: 'Categorize errors by severity, recoverability, and user impact' },
      { num: '2', action: 'Display Strategy', detail: 'Choose appropriate modality: inline, tooltip, modal, or banner' },
      { num: '3', action: 'Message Structure', detail: 'Problem + Cause + Solution with progressive disclosure' },
      { num: '4', action: 'Recovery Mechanisms', detail: 'Automatic retry, context preservation, and manual recovery' },
      { num: '5', action: 'Prevention Patterns', detail: 'Input validation, confirmation dialogs, and undo capabilities' }
    ],
    example: 'agent_failure → classify_error → context_preserved → recovery_options → user_choice'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use clear, jargon-free language for error messages', icon: '✅' },
    { type: 'do', text: 'Provide specific actionable solutions, not generic advice', icon: '✅' },
    { type: 'do', text: 'Preserve user context and work during error recovery', icon: '✅' },
    { type: 'do', text: 'Implement progressive disclosure for technical details', icon: '✅' },
    { type: 'do', text: 'Use consistent visual design for error states', icon: '✅' },
    { type: 'dont', text: 'Blame users or use negative language in error messages', icon: '❌' },
    { type: 'dont', text: 'Show technical stack traces or error codes to end users', icon: '❌' },
    { type: 'dont', text: 'Use error dialogs for non-critical validation messages', icon: '❌' },
    { type: 'dont', text: 'Leave users stranded without clear next steps', icon: '❌' },
    { type: 'dont', text: 'Hide errors or fail silently without user notification', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Production systems with high user dependency',
      'Critical workflows requiring reliability',
      'Complex agent operations prone to failure',
      'Systems handling sensitive or valuable data'
    ],
    avoidWhen: [
      'Simple prototype or demonstration systems',
      'Internal tools with technical users only',
      'Low-stakes experimental applications',
      'Systems with 100% reliable operations'
    ]
  };

  const keyMetrics = [
    { metric: 'Error Recovery Rate', measure: '% of errors successfully resolved automatically' },
    { metric: 'User Error Resolution', measure: 'Time from error to successful user resolution' },
    { metric: 'Context Preservation', measure: '% of user work preserved during error recovery' },
    { metric: 'Error Comprehension', measure: 'User understanding of error cause and solution' },
    { metric: 'Prevention Effectiveness', measure: 'Reduction in preventable errors over time' },
    { metric: 'Support Ticket Reduction', measure: 'Decrease in error-related support requests' }
  ];

  const topUseCases = [
    'Agent Communication Failures: Network timeouts with automatic retry and manual override',
    'Input Validation Errors: Real-time feedback with correction suggestions',
    'System Resource Limitations: Graceful degradation with alternative options',
    'Permission/Authentication Issues: Clear explanations with resolution paths',
    'Data Processing Errors: Context preservation with partial result recovery'
  ];

  const references = [
    {
      title: 'Academic Papers & Research',
      items: [
        { title: 'Error Message Design in Human-Computer Interaction (Shneiderman & Plaisant, 2019)', url: 'https://www.cs.umd.edu/users/ben/goldenrules.html' },
        { title: 'Designing Better Error Messages (Nielsen, 2001)', url: 'https://www.nngroup.com/articles/error-message-guidelines/' },
        { title: 'Recovery from Errors in Human-Computer Interaction (Lewis, 2006)', url: 'https://dl.acm.org/doi/10.1145/1142405.1142416' },
        { title: 'CHI 2023: Error Handling in AI Systems', url: 'https://dl.acm.org/doi/proceedings/10.1145/3544548' },
        { title: 'Error Prevention and Recovery in Interactive Systems (Reason, 2016)', url: 'https://www.taylorfrancis.com/books/mono/10.4324/9781315543543/human-error-james-reason' }
      ]
    },
    {
      title: 'Industry Guidelines & Standards',
      items: [
        { title: 'Apple Human Interface Guidelines - Error Handling', url: 'https://developer.apple.com/design/human-interface-guidelines/error-handling' },
        { title: 'Google Material Design - Error States', url: 'https://material.io/design/communication/confirmation-acknowledgement.html#errors' },
        { title: 'Microsoft Fluent Design - Error Patterns', url: 'https://docs.microsoft.com/en-us/windows/apps/design/controls/infobar' },
        { title: 'W3C Web Content Accessibility Guidelines - Error Handling', url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html' },
        { title: 'ISO 9241-110 Dialogue Principles - Error Management', url: 'https://www.iso.org/standard/38009.html' }
      ]
    },
    {
      title: 'UX Design Frameworks',
      items: [
        { title: 'Error Message Design Principles (Mailchimp UX)', url: 'https://ux.mailchimp.com/patterns/messaging' },
        { title: 'Atlassian Design System - Error Messages', url: 'https://atlassian.design/components/banner/examples' },
        { title: 'Salesforce Lightning Design System - Error Handling', url: 'https://www.lightningdesignsystem.com/guidelines/messaging/error/' },
        { title: 'Shopify Polaris - Error States', url: 'https://polaris.shopify.com/patterns/error-messages' },
        { title: 'IBM Carbon Design System - Notifications', url: 'https://carbondesignsystem.com/patterns/notification-pattern/' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'React Error Boundary Patterns', url: 'https://reactjs.org/docs/error-boundaries.html' },
        { title: 'Vue.js Error Handling Guide', url: 'https://vuejs.org/guide/best-practices/production-deployment.html#tracking-runtime-errors' },
        { title: 'Angular Error Handling Best Practices', url: 'https://angular.io/guide/error-handling' },
        { title: 'Error Monitoring with Sentry', url: 'https://docs.sentry.io/platforms/javascript/guides/react/' },
        { title: 'Resilience Patterns for Distributed Systems', url: 'https://docs.microsoft.com/en-us/azure/architecture/patterns/category/resiliency' }
      ]
    },
    {
      title: 'Error Communication Research',
      items: [
        { title: 'Plain Language Guidelines (plainlanguage.gov)', url: 'https://www.plainlanguage.gov/guidelines/' },
        { title: 'Cognitive Load Theory in Error Messages (Sweller, 2011)', url: 'https://link.springer.com/article/10.1007/s10648-010-9133-4' },
        { title: 'Error Message Comprehension Studies (Wogalter, 2006)', url: 'https://www.taylorfrancis.com/books/edit/10.1201/9781420043822/handbook-warnings-michael-wogalter' },
        { title: 'User Mental Models in Error Recovery (Norman, 2013)', url: 'https://mitpress.mit.edu/books/design-everyday-things' },
        { title: 'Error Prevention in User Interface Design (Constantine, 2009)', url: 'https://www.researchgate.net/publication/220879043_Software_for_Use_A_Practical_Guide_to_the_Models_and_Methods_of_Usage-Centered_Design' }
      ]
    },
    {
      title: 'Accessibility & Error Handling',
      items: [
        { title: 'WCAG 2.1 Success Criterion 3.3.1 Error Identification', url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html' },
        { title: 'WCAG 2.1 Success Criterion 3.3.3 Error Suggestion', url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html' },
        { title: 'Screen Reader Compatible Error Messages', url: 'https://webaim.org/techniques/formvalidation/' },
        { title: 'Cognitive Accessibility and Error Recovery', url: 'https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-context/' },
        { title: 'ARIA Live Regions for Dynamic Error Updates', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive error communication and recovery interfaces for graceful failure handling"
        why="Agent system failures need clear communication and effective recovery paths to maintain user trust"
        keyInsight="Use three-element structure: Problem + Cause + Solution with context preservation and progressive disclosure"
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

export default ErrorHandlingRecoveryPatternsDetails;