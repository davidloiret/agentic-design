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

interface AmbientAgentPatternsDetailsProps {
  selectedTechnique: any;
}

export const AmbientAgentPatternsDetails: React.FC<AmbientAgentPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Event Stream', detail: 'Listen to ambient signals continuously' },
      { num: '2', action: 'State Management', detail: 'Persistent tracking with stateful workflows' },
      { num: '3', action: 'Human Interaction', detail: 'Notify/Question/Review patterns' },
      { num: '4', action: 'Concurrent Tasks', detail: 'Multiple simultaneous operations' },
      { num: '5', action: 'Long-term Memory', detail: 'Learning and adaptation over time' }
    ],
    example: 'ambient_signals → event_detection → selective_interaction → concurrent_processing → memory_update'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Listen to ambient signals continuously for opportunities', icon: '✅' },
    { type: 'do', text: 'Use Notify/Question/Review interaction patterns', icon: '✅' },
    { type: 'do', text: 'Handle multiple concurrent tasks simultaneously', icon: '✅' },
    { type: 'do', text: 'Build persistent state with stateful workflows', icon: '✅' },
    { type: 'do', text: 'Save user attention for when it matters most', icon: '✅' },
    { type: 'dont', text: 'Require constant human input for every decision', icon: '❌' },
    { type: 'dont', text: 'Block on human feedback for routine operations', icon: '❌' },
    { type: 'dont', text: 'Create notification fatigue with non-critical alerts', icon: '❌' },
    { type: 'dont', text: 'Lose conversational context between interactions', icon: '❌' },
    { type: 'dont', text: 'Ignore the ambient nature - wait only for explicit triggers', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Long-running background processes',
      'Email management and triage',
      'Continuous monitoring workflows',
      'Multi-task coordination scenarios'
    ],
    avoidWhen: [
      'Single-shot query-response needs',
      'Real-time interactive conversations',
      'Simple automation without ambient signals',
      'Stateless operation requirements'
    ]
  };

  const keyMetrics = [
    { metric: 'Signal Detection Rate', measure: '% ambient events correctly identified' },
    { metric: 'Human Interaction Quality', measure: 'Notify/Question/Review effectiveness' },
    { metric: 'Task Concurrency', measure: 'Simultaneous operations handled' },
    { metric: 'State Persistence', measure: 'Context retention across sessions' },
    { metric: 'Attention Efficiency', measure: 'Valuable vs noise interactions ratio' },
    { metric: 'Long-term Learning', measure: 'Adaptation improvement over time' }
  ];

  const topUseCases = [
    'AI Email Assistant: background triage, priority detection, draft suggestions',
    'Project Management: task monitoring, deadline tracking, team coordination',
    'Customer Support: ticket routing, sentiment analysis, escalation triggers',
    'Content Moderation: continuous monitoring, policy violation detection',
    'System Operations: health monitoring, anomaly detection, automated responses'
  ];

  const references = [
    {
      title: 'LangChain Resources',
      items: [
        { title: 'Introducing Ambient Agents - LangChain Blog', url: 'https://blog.langchain.com/introducing-ambient-agents/' },
        { title: 'LangChain Academy - Ambient Agents Course', url: 'https://academy.langchain.com/courses/ambient-agents' },
        { title: 'LangGraph Documentation - Persistent State & Human-in-Loop', url: 'https://langchain-ai.github.io/langgraph/' },
        { title: 'LangChain AI Email Assistant Template', url: 'https://github.com/langchain-ai/email-assistant' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Building Ambient Agents with LangGraph', url: 'https://python.langchain.com/docs/tutorials/agents/' },
        { title: 'Human-in-the-Loop Workflows', url: 'https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/' },
        { title: 'Persistent State Management in LangGraph', url: 'https://langchain-ai.github.io/langgraph/how-tos/persistence/' },
        { title: 'Event-Driven Agent Architecture Patterns', url: 'https://python.langchain.com/docs/tutorials/chatbots/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangGraph - Multi-Actor Applications Framework', url: 'https://github.com/langchain-ai/langgraph' },
        { title: 'LangChain - Agent and Chain Framework', url: 'https://github.com/langchain-ai/langchain' },
        { title: 'LangSmith - Agent Monitoring and Observability', url: 'https://smith.langchain.com/' },
        { title: 'LangServe - Agent Deployment Framework', url: 'https://github.com/langchain-ai/langserve' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Discord Community', url: 'https://discord.gg/langchain' },
        { title: 'LangChain GitHub Discussions', url: 'https://github.com/langchain-ai/langchain/discussions' },
        { title: 'LangGraph Twitter Community', url: 'https://twitter.com/LangChainAI' },
        { title: 'Ambient Agents Use Cases & Examples', url: 'https://docs.langchain.com/docs/use-cases/agents' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Agents that respond to ambient signals and demand user input only when they detect important opportunities or require feedback"
        why="Saves user attention for when it matters most, enables multiple concurrent tasks, mimics natural human communication"
        keyInsight="Event stream listening + selective human interaction → long-term learning with persistent state"
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

export default AmbientAgentPatternsDetails;