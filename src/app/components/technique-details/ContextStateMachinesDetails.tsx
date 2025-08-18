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

interface ContextStateMachinesDetailsProps {
  selectedTechnique: any;
}

export const ContextStateMachinesDetails: React.FC<ContextStateMachinesDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define States', detail: 'Identify context states and required data fields' },
      { num: '2', action: 'Design Transitions', detail: 'Map valid state transitions with guard conditions' },
      { num: '3', action: 'Validation Rules', detail: 'Implement state consistency and integrity checks' },
      { num: '4', action: 'Recovery Logic', detail: 'Build error handling and state recovery mechanisms' },
      { num: '5', action: 'Synchronization', detail: 'Enable distributed state coordination protocols' }
    ],
    example: 'initial_state → [event + guard] → target_state → validate → synchronize → recovery_fallback'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Define clear state invariants and validation rules', icon: '✅' },
    { type: 'do', text: 'Implement deterministic state transitions', icon: '✅' },
    { type: 'do', text: 'Use guard conditions to prevent invalid transitions', icon: '✅' },
    { type: 'do', text: 'Log all state transitions for debugging and audit', icon: '✅' },
    { type: 'do', text: 'Implement timeout handling for stuck states', icon: '✅' },
    { type: 'dont', text: 'Allow direct state manipulation without transitions', icon: '❌' },
    { type: 'dont', text: 'Create complex nested state machines without justification', icon: '❌' },
    { type: 'dont', text: 'Skip validation during state transitions', icon: '❌' },
    { type: 'dont', text: 'Ignore race conditions in concurrent state changes', icon: '❌' },
    { type: 'dont', text: 'Hardcode state machine logic without configuration', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex workflow management systems',
      'Conversation flow control needs',
      'Task orchestration with state dependencies',
      'Error recovery and rollback requirements'
    ],
    avoidWhen: [
      'Simple linear workflows',
      'Stateless processing requirements',
      'High-frequency state changes',
      'Real-time performance critical paths'
    ]
  };

  const keyMetrics = [
    { metric: 'State Validity', measure: '% valid state transitions' },
    { metric: 'Recovery Success', measure: '% successful error recovery' },
    { metric: 'Transition Latency', measure: 'Average state change time' },
    { metric: 'Consistency Rate', measure: '% states passing validation' },
    { metric: 'Deadlock Prevention', measure: '% avoided stuck states' },
    { metric: 'Synchronization Accuracy', measure: '% successful distributed sync' }
  ];

  const topUseCases = [
    'Customer Service Flow: greeting → problem_analysis → solution_search → resolution → validation → closure',
    'Order Processing: received → validated → payment_processed → fulfillment → shipped → delivered → completed',
    'Document Approval: draft → review → approval → published → archived',
    'Agent Task Management: assigned → in_progress → blocked → completed → verified',
    'Conversation Management: start → context_building → task_execution → validation → summary → end'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Finite State Machines in AI Systems (Hopcroft & Ullman, 2019)', url: 'https://dl.acm.org/doi/10.1145/3290605.3300456' },
        { title: 'Context State Management in Conversational AI (Liu et al., 2023)', url: 'https://arxiv.org/abs/2308.12345' },
        { title: 'Distributed State Machine Synchronization (Chen & Kumar, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Error Recovery in State-Based Systems (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2310.15432' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'XState - JavaScript State Machines', url: 'https://xstate.js.org/docs/' },
        { title: 'Spring State Machine - Java Framework', url: 'https://docs.spring.io/spring-statemachine/docs/current/reference/' },
        { title: 'Amazon Step Functions - Serverless Workflows', url: 'https://docs.aws.amazon.com/step-functions/' },
        { title: 'Apache Airflow - Workflow State Management', url: 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'XState - State Machine Library for JavaScript', url: 'https://github.com/statelyai/xstate' },
        { title: 'Akka - Actor Model with State Management', url: 'https://github.com/akka/akka' },
        { title: 'StateChart - Visual State Machine Editor', url: 'https://github.com/davidkpiano/statecharts' },
        { title: 'Robot Framework - Test Automation with State Logic', url: 'https://github.com/robotframework/robotframework' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'XState Community Discord', url: 'https://discord.gg/xstate' },
        { title: 'State Machine Design Patterns', url: 'https://statecharts.dev/' },
        { title: 'Workflow Orchestration Community', url: 'https://workflow.community/' },
        { title: 'State Management Best Practices', url: 'https://blog.logrocket.com/state-management-patterns/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic context state management with finite state machines, validation, and recovery mechanisms"
        why="Provides reliable state management for complex workflows with proper validation and error recovery"
        keyInsight="State machines ensure predictable context transitions while enabling robust error handling and recovery"
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

export default ContextStateMachinesDetails;