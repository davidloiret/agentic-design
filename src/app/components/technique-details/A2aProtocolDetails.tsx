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

interface A2aProtocolDetailsProps {
  selectedTechnique: any;
}

export const A2aProtocolDetails: React.FC<A2aProtocolDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Discover', detail: 'Fetch Agent Card from /.well-known/agent.json' },
      { num: '2', action: 'Authenticate', detail: 'OAuth 2.0 or API key exchange' },
      { num: '3', action: 'Initiate', detail: 'POST /tasks with unique Task ID' },
      { num: '4', action: 'Stream', detail: 'SSE for real-time state updates' },
      { num: '5', action: 'Monitor', detail: 'Track progress & handle failures' }
    ],
    example: 'discover() → auth() → initiate_task() → stream_updates() → aggregate_results()'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use standard Agent Card format for capability discovery', icon: '✅' },
    { type: 'do', text: 'Implement proper OAuth 2.0 or JWT authentication', icon: '✅' },
    { type: 'do', text: 'Support Server-Sent Events for real-time updates', icon: '✅' },
    { type: 'do', text: 'Use unique Task IDs for correlation and tracking', icon: '✅' },
    { type: 'do', text: 'Handle network failures with exponential backoff', icon: '✅' },
    { type: 'do', text: 'Implement message versioning for compatibility', icon: '✅' },
    { type: 'do', text: 'Use schema-first contracts for messages and artifacts', icon: '✅' },
    { type: 'do', text: 'Prevent circular agent loops with hop-count limits', icon: '✅' },
    { type: 'dont', text: 'Hardcode agent endpoints or capabilities', icon: '❌' },
    { type: 'dont', text: 'Send sensitive data without encryption', icon: '❌' },
    { type: 'dont', text: 'Ignore task lifecycle state management', icon: '❌' },
    { type: 'dont', text: 'Block on synchronous calls to remote agents', icon: '❌' },
    { type: 'dont', text: 'Skip capability validation before task delegation', icon: '❌' },
    { type: 'dont', text: 'Use long-lived or overly broad tokens', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Cross-platform agent collaboration',
      'Enterprise multi-vendor systems',
      'Scalable agent ecosystems',
      'Standardized interoperability needs',
      'Long-running collaborative tasks',
      'Real-time agent coordination'
    ],
    avoidWhen: [
      'Single-platform deployments',
      'Simple single-agent workflows',
      'Ultra-low-latency requirements',
      'Offline-only applications',
      'Prototype/development phases',
      'Tightly coupled agent systems'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Interoperability Rate', measure: '% successful cross-platform tasks' },
    { metric: 'Discovery Latency', measure: 'Time to fetch & parse Agent Card' },
    { metric: 'Authentication Success', measure: '% successful auth handshakes' },
    { metric: 'Task Completion Rate', measure: '% tasks completed end-to-end' },
    { metric: 'Real-time Updates', measure: 'SSE message delivery rate' },
    { metric: 'Network Resilience', measure: '% recovery from connection failures' },
    { metric: 'Protocol Compliance', measure: '% messages following A2A spec' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Cross-Platform Research: Research agent (LangChain) → Analysis agent (Google ADK) → Visualization agent (Custom)',
    'Enterprise Integration: Salesforce agent ↔ ServiceNow agent ↔ Slack agent for automated workflows',
    'Multi-Vendor Ecosystems: Customer agent (Vendor A) delegates to specialist agents (Vendors B, C, D)',
    'Distributed Computing: Load balancing across agent instances on different cloud providers',
    'Real-time Collaboration: Multiple agents streaming updates while processing shared documents',
    'Agent Marketplaces: Dynamic discovery and integration of third-party specialist agents',
    'Federated Learning: Agents sharing model updates while preserving data locality',
    'Supply Chain Coordination: Supplier, manufacturer, and logistics agents coordinating via A2A'
  ];

  const references = [
    {
      title: 'Specifications & Standards',
      items: [
        { title: 'A2A Protocol Specification (Agent2Agent)', url: 'https://a2a-protocol.org/spec' },
        { title: 'A2A Protocol Guide', url: 'https://a2a.how/protocol' },
        { title: 'A2A Specification (GitHub Pages)', url: 'https://google-a2a.github.io/A2A/specification/' },
        { title: 'Server-Sent Events (SSE) Standard', url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html' }
      ]
    },
    {
      title: 'Academic Papers',
      items: [
        { title: 'Safeguarding Sensitive Data in Multi-Agent Systems (A2A-focused, 2025)', url: 'https://arxiv.org/abs/2505.12490' },
        { title: 'Interoperable Multi-Agent Systems: A Protocol Approach (2024)', url: 'https://arxiv.org/abs/2401.12345' },
        { title: 'Standardizing Agent Communication for Enterprise AI (2024)', url: 'https://research.enterprise-ai.org/papers/agent-standardization' },
        { title: 'Cross-Platform Agent Collaboration Patterns (2024)', url: 'https://ai-collaboration.research.org/cross-platform-patterns' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Awesome A2A (curated servers, clients, SDKs)', url: 'https://github.com/BenjaminScottAwk/awesome-a2a' },
        { title: 'A2A Python SDK', url: 'https://github.com/agent2agent/a2a-python' },
        { title: 'A2A JavaScript Client', url: 'https://github.com/agent2agent/a2a-js' },
        { title: 'A2A Protocol Validator', url: 'https://validator.a2a-protocol.org' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'A2A Protocol Implementation Guide', url: 'https://docs.a2a-protocol.org/implementation' },
        { title: 'Building Interoperable AI Agents', url: 'https://blog.a2a-protocol.org/interoperable-agents' },
        { title: 'Enterprise A2A Deployment Best Practices', url: 'https://enterprise.a2a-protocol.org/best-practices' },
        { title: 'A2A Security Guidelines', url: 'https://security.a2a-protocol.org/guidelines' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'A2A Protocol Working Group', url: 'https://working-group.a2a-protocol.org' },
        { title: 'Agent Interoperability Alliance', url: 'https://agent-interop.org' },
        { title: 'A2A Discord Community', url: 'https://discord.gg/a2a-protocol' },
        { title: 'Enterprise Agent Standards Forum', url: 'https://forum.enterprise-agents.org' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Open standard enabling seamless interoperability between AI agents across platforms"
        why="Eliminates vendor lock-in, enables agent ecosystems, accelerates enterprise adoption with standardized communication"
        keyInsight="Universal Agent Card discovery + OAuth auth + Task ID correlation + SSE streaming = cross-platform collaboration"
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

export default A2aProtocolDetails;