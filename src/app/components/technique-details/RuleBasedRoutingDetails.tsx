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

interface RuleBasedRoutingDetailsProps {
  selectedTechnique: any;
}

export const RuleBasedRoutingDetails: React.FC<RuleBasedRoutingDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define', detail: 'Create routing rules and conditions' },
      { num: '2', action: 'Extract', detail: 'Parse keywords/patterns from input' },
      { num: '3', action: 'Match', detail: 'Apply if-else/switch logic' },
      { num: '4', action: 'Validate', detail: 'Check rule precedence and conflicts' },
      { num: '5', action: 'Execute', detail: 'Route to deterministic handler' }
    ],
    example: 'if (query.contains("refund")) route("billing_agent") else if (priority == "urgent") route("escalation_handler")'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Order rules from most specific to general', icon: '✅' },
    { type: 'do', text: 'Implement fallback/default routes', icon: '✅' },
    { type: 'do', text: 'Version control your rule definitions', icon: '✅' },
    { type: 'do', text: 'Log routing decisions for debugging', icon: '✅' },
    { type: 'do', text: 'Combine with AI for hybrid workflows', icon: '✅' },
    { type: 'dont', text: 'Create overlapping or conflicting rules', icon: '❌' },
    { type: 'dont', text: 'Hardcode rules without config management', icon: '❌' },
    { type: 'dont', text: 'Ignore edge cases and exceptions', icon: '❌' },
    { type: 'dont', text: 'Over-complicate with too many conditions', icon: '❌' },
    { type: 'dont', text: 'Skip validation and testing of rules', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Deterministic routing is required',
      'Compliance/audit trails needed',
      'Low-latency decisions critical',
      'Clear, stable routing patterns'
    ],
    avoidWhen: [
      'Complex semantic understanding needed',
      'Patterns frequently change',
      'Handling ambiguous queries',
      'Natural language nuance matters'
    ]
  };

  const keyMetrics = [
    { metric: 'Rule Coverage', measure: '% queries matched by rules' },
    { metric: 'Decision Latency', measure: 'Time to route (usually <5ms)' },
    { metric: 'Rule Conflicts', measure: 'Number of overlapping rules' },
    { metric: 'Fallback Rate', measure: '% routed to default handler' },
    { metric: 'Rule Maintenance', measure: 'Changes per month' },
    { metric: 'Accuracy', measure: '% correctly routed vs manual' }
  ];

  const topUseCases = [
    'Priority Escalation: if urgency="critical" AND type="security" → security_team',
    'Department Routing: switch(category) { case "billing": finance_agent; case "tech": it_support }',
    'Compliance Workflows: regulated industries requiring deterministic, auditable paths',
    'Load Distribution: round-robin or weighted routing based on agent availability',
    'Hybrid Orchestration: rules for known patterns + AI fallback for complex cases'
  ];

  const references = [
    {
      title: 'Academic Papers & Research',
      items: [
        { title: 'AI Agent Orchestration Patterns - Microsoft Azure Architecture', url: 'https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns' },
        { title: 'Deterministic vs Dynamic Process Orchestration in AI (2024)', url: 'https://camunda.com/blog/2024/02/operationalize-ai-deterministic-and-non-deterministic-process-orchestration/' },
        { title: 'AI Agents and Deterministic Workflows: A Spectrum - deepset', url: 'https://www.deepset.ai/blog/ai-agents-and-deterministic-workflows-a-spectrum' },
        { title: 'Agentic AI Design Patterns & Real-World Examples (2024)', url: 'https://research.aimultiple.com/agentic-ai-design-patterns/' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Ultimate Guide to AI Agent Routing - Botpress', url: 'https://botpress.com/blog/ai-agent-routing' },
        { title: 'Workflows & Agents Tutorial - LangGraph', url: 'https://langchain-ai.github.io/langgraph/tutorials/workflows/' },
        { title: 'Agentic Workflows Architecture - Orkes', url: 'https://orkes.io/blog/what-are-agentic-workflows/' },
        { title: 'Building Scalable AI: Workflows vs Agents', url: 'https://towardsdatascience.com/a-developers-guide-to-building-scalable-ai-workflows-vs-agents/' }
      ]
    },
    {
      title: 'Tools & Frameworks',
      items: [
        { title: 'Apache Airflow - Workflow Orchestration', url: 'https://airflow.apache.org/' },
        { title: 'Temporal - Durable Workflow Execution', url: 'https://temporal.io/' },
        { title: 'Camunda - Process Orchestration Platform', url: 'https://camunda.com/' },
        { title: 'n8n - Workflow Automation Tool', url: 'https://n8n.io/' }
      ]
    },
    {
      title: 'Industry Reports & Best Practices',
      items: [
        { title: 'Seizing the Agentic AI Advantage - McKinsey', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage' },
        { title: 'Rise of Agentic AI - Capgemini Report', url: 'https://www.capgemini.com/wp-content/uploads/2024/07/Final-Web-Version-Report-AI-Agents.pdf' },
        { title: 'Agentic Workflows Patterns - Weaviate', url: 'https://weaviate.io/blog/what-are-agentic-workflows' },
        { title: '9 Agentic AI Workflow Patterns (2024) - MarkTechPost', url: 'https://www.marktechpost.com/2024/08/09/9-agentic-ai-workflow-patterns-transforming-ai-agents-in-2025/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Deterministic routing using predefined rules, conditions, and decision trees"
        why="Provides traceable, auditable, ultra-fast routing decisions with guaranteed outcomes"
        keyInsight="If-else chains + pattern matching + config management = predictable agent orchestration"
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

export default RuleBasedRoutingDetails;