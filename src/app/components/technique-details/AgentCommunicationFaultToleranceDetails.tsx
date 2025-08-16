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

interface AgentCommunicationFaultToleranceDetailsProps {
  selectedTechnique: any;
}

export const AgentCommunicationFaultToleranceDetails: React.FC<AgentCommunicationFaultToleranceDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Protocol Setup', detail: 'Implement MCP/A2A/ACP with message delivery guarantees' },
      { num: '2', action: 'Circuit Breakers', detail: 'Deploy per-agent-pair circuit breakers with thresholds' },
      { num: '3', action: 'Retry Logic', detail: 'Configure exponential backoff with jitter and dead letter queues' },
      { num: '4', action: 'Route Discovery', detail: 'Enable dynamic topology adaptation and alternative routing' },
      { num: '5', action: 'Monitor Health', detail: 'Implement real-time communication health monitoring' }
    ],
    example: 'agent_message → protocol_send → failure_detection → circuit_breaker → retry_backoff → alternative_route → success'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use protocol-agnostic fault tolerance (MCP/A2A/ACP/ANP)', icon: '✅' },
    { type: 'do', text: 'Implement circuit breakers with 3-5 failure threshold per minute', icon: '✅' },
    { type: 'do', text: 'Use exponential backoff with jitter to prevent thundering herd', icon: '✅' },
    { type: 'do', text: 'Enable message persistence with dead letter queues', icon: '✅' },
    { type: 'do', text: 'Support both synchronous and asynchronous communication patterns', icon: '✅' },
    { type: 'dont', text: 'Rely on single communication path without redundancy', icon: '❌' },
    { type: 'dont', text: 'Ignore message ordering guarantees in distributed scenarios', icon: '❌' },
    { type: 'dont', text: 'Skip authentication and encryption for agent communication', icon: '❌' },
    { type: 'dont', text: 'Use static routing without dynamic topology adaptation', icon: '❌' },
    { type: 'dont', text: 'Forget to implement timeout and rate limiting mechanisms', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Multi-agent collaborative systems',
      'Cross-platform agent workflows',
      'Enterprise agent networks',
      'Mission-critical agent coordination'
    ],
    avoidWhen: [
      'Single-agent applications',
      'Local-only agent systems',
      'Simple request-response patterns',
      'Latency-critical real-time systems'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Message Delivery Rate', measure: '% successful message delivery (target: 99.94%)' },
    { metric: 'Circuit Breaker Efficiency', measure: '% failures prevented from cascading' },
    { metric: 'Recovery Time', measure: 'Seconds to restore communication after failure' },
    { metric: 'Alternative Route Success', measure: '% messages delivered via backup paths' },
    { metric: 'Protocol Overhead', measure: '% additional latency for fault tolerance' },
    { metric: 'Network Partition Tolerance', measure: 'Time to detect and adapt to partitions' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Enterprise AI Orchestration: Coordinate 100+ agents across departments with 99.94% delivery rate',
    'Distributed Research Systems: Route analysis tasks between specialized agents with fallback paths',
    'Manufacturing Control: Maintain factory agent coordination during network instability',
    'Financial Trading Networks: Ensure market data flow between trading agents with sub-second recovery',
    'Healthcare AI Networks: Coordinate diagnostic agents with strict reliability requirements'
  ];

  const references = [
    {
      title: 'Core Academic Research (2024-2025)',
      items: [
        { title: 'A Survey of Agent Interoperability Protocols: MCP, ACP, A2A, and ANP (arXiv 2024)', url: 'https://arxiv.org/abs/2505.02279' },
        { title: 'Advancing Multi-Agent Systems Through Model Context Protocol: Architecture and Applications (arXiv 2024)', url: 'https://arxiv.org/html/2504.21030v1' },
        { title: 'Fault Tolerance in Distributed Systems Using Deep Learning Approaches (PLOS ONE 2024)', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0310657' },
        { title: 'Designing Resilient Distributed Systems: Fault Tolerance Strategies and Insights (ResearchGate 2025)', url: 'https://www.researchgate.net/publication/389533767_Designing_Resilient_Distributed_Systems_Fault_Tolerance_Strategies_and_Insights' }
      ]
    },
    {
      title: 'Communication Protocols & Standards',
      items: [
        { title: 'Model Context Protocol (MCP): Official Specification and Implementation Guide', url: 'https://spec.modelcontextprotocol.io/' },
        { title: 'Agent-to-Agent Protocol (A2A): Google Cross-Platform Specification', url: 'https://docs.google.com/document/d/1OnBcd4ZQZB7WP9oQQG4ZA5TSnA8WFaIKWDUJhpJ1z7E' },
        { title: 'AWS Open Source: Open Protocols for Agent Interoperability on MCP', url: 'https://aws.amazon.com/blogs/opensource/open-protocols-for-agent-interoperability-part-1-inter-agent-communication-on-mcp/' },
        { title: 'Circuit Breaker Pattern for Microservices Communication Resilience', url: 'https://microservices.io/patterns/reliability/circuit-breaker.html' }
      ]
    },
    {
      title: 'Fault Tolerance Patterns & Implementation',
      items: [
        { title: 'Fault‐tolerance Approaches for Distributed Computing: Systematic Review (Wiley 2024)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/cpe.8081' },
        { title: 'Circuit Breaker Pattern in Microservices: Ensuring Resilience (Medium 2024)', url: 'https://medium.com/@VAISHAK_CP/circuit-breaker-pattern-in-microservices-ensuring-resilience-and-reliability-a80567aabe98' },
        { title: 'Building Resilient Apps with Circuit Breaker Pattern (Sean Coughlin 2024)', url: 'https://blog.seancoughlin.me/building-resilient-applications-with-circuit-breaker-pattern' },
        { title: 'Secretarium: Engineering Resilience - Redefining Fault Tolerance', url: 'https://secretarium.com/articles/engineering-resilience-redefining-fault-tolerance' }
      ]
    },
    {
      title: 'Industry Applications & Tools',
      items: [
        { title: 'Data Science Dojo: Agentic AI Communication Protocols - Multi-Agent Systems Backbone', url: 'https://datasciencedojo.com/blog/agentic-ai-communication-protocols/' },
        { title: 'Agent Development Kit: Enhancing Multi-Agent Systems with A2A and MCP (Medium)', url: 'https://medium.com/@rubenszimbres/agent-development-kit-enhancing-multi-agents-systems-with-a2a-protocol-and-mcp-server-535547b21f9d' },
        { title: 'MarkTechPost: Deep Technical Dive into Next-Generation Interoperability Protocols', url: 'https://www.marktechpost.com/2025/05/09/a-deep-technical-dive-into-next-generation-interoperability-protocols-model-context-protocol-mcp-agent-communication-protocol-acp-agent-to-agent-protocol-a2a-and-agent-network-protocol-anp/' },
        { title: 'Computer.org: AI Agents in Ensuring Distributed System Reliability', url: 'https://www.computer.org/publications/tech-news/trends/ai-ensuring-distributed-system-reliability/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Comprehensive fault tolerance mechanisms for agent-to-agent communication using modern protocols"
        why="Prevents cascading failures, enables network partition tolerance, achieves 99.94% message delivery reliability"
        keyInsight="Protocol-agnostic resilience (MCP/A2A/ACP/ANP) + circuit breakers + dynamic routing = robust agent communication"
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

export default AgentCommunicationFaultToleranceDetails;