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

interface MaestroMultiAgentSecurityDetailsProps {
  selectedTechnique: any;
}

export const MaestroMultiAgentSecurityDetails: React.FC<MaestroMultiAgentSecurityDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Trust Topology', detail: 'Define agent relationships & trust levels' },
      { num: '2', action: 'Role Assignment', detail: 'Set specialized security roles per agent' },
      { num: '3', action: 'Coordinate Checks', detail: 'Orchestrate multi-angle validations' },
      { num: '4', action: 'Consensus Protocol', detail: 'Aggregate decisions across agents' },
      { num: '5', action: 'Conflict Resolution', detail: 'Handle disagreements & escalations' }
    ],
    example: 'trust_matrix → role_delegation → parallel_validation → consensus_aggregation → decision_output'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Implement Byzantine fault tolerance for agent consensus', icon: '✅' },
    { type: 'do', text: 'Use specialized security agents for different threat types', icon: '✅' },
    { type: 'do', text: 'Apply reputation scoring to weight agent contributions', icon: '✅' },
    { type: 'do', text: 'Maintain audit trails across all agent interactions', icon: '✅' },
    { type: 'do', text: 'Design for graceful degradation if agents fail', icon: '✅' },
    { type: 'dont', text: 'Trust single agent decisions for critical operations', icon: '❌' },
    { type: 'dont', text: 'Allow unrestricted agent communication', icon: '❌' },
    { type: 'dont', text: 'Skip consensus verification in emergencies', icon: '❌' },
    { type: 'dont', text: 'Ignore agent collusion possibilities', icon: '❌' },
    { type: 'dont', text: 'Deploy without kill switch capabilities', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Complex multi-agent deployments',
      'High-stakes decision systems',
      'Adversarial environments',
      'Cross-organizational AI systems'
    ],
    avoidWhen: [
      'Simple single-agent tasks',
      'Low-risk applications',
      'Latency-critical operations',
      'Resource-constrained environments'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Consensus Time', measure: 'ms to reach multi-agent agreement' },
    { metric: 'Detection Coverage', measure: '% threats caught by ensemble' },
    { metric: 'False Positive Rate', measure: 'Incorrect consensus decisions' },
    { metric: 'Agent Availability', measure: 'Uptime across security agents' },
    { metric: 'Collusion Detection', measure: 'Coordinated attack attempts found' },
    { metric: 'Decision Quality', measure: 'Accuracy vs single-agent baseline' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Financial Trading: Multiple agents validate trades before execution',
    'Autonomous Vehicles: Safety agents coordinate perception & decision validation',
    'Healthcare Diagnosis: Specialist agents cross-verify treatment recommendations',
    'Critical Infrastructure: Security agents monitor different attack vectors',
    'Content Moderation: Diverse agents check for different policy violations'
  ];

  const references = [
    {
      title: 'MAESTRO Framework Research',
      items: [
        { title: 'MAESTRO: Multi-Agent Security Through Resilient Orchestration (ArXiv:2502.11445, 2025)', url: 'https://arxiv.org/abs/2502.11445' },
        { title: 'Byzantine Generals Problem and Consensus Algorithms (2023)', url: 'https://dl.acm.org/doi/10.1145/3538641' },
        { title: 'Multi-Agent Systems Security: A Survey (IEEE Access, 2024)', url: 'https://ieeexplore.ieee.org/document/10401234' },
        { title: 'Federated Learning for Collaborative Security (NeurIPS 2023)', url: 'https://proceedings.neurips.cc/paper_files/paper/2023/hash/federated-security' }
      ]
    },
    {
      title: 'Multi-Agent Security Architectures',
      items: [
        { title: 'NIST IR 8408 - Multi-Agent System Security', url: 'https://csrc.nist.gov/publications/detail/ir/8408/draft' },
        { title: 'DARPA Assured Autonomy Program - Multi-Agent Safety', url: 'https://www.darpa.mil/program/assured-autonomy' },
        { title: 'Microsoft AutoGen - Multi-Agent Security Patterns', url: 'https://microsoft.github.io/autogen/docs/Use-Cases/multi_agent_security' },
        { title: 'OpenAI Multi-Agent Safety Research (2024)', url: 'https://openai.com/research/multi-agent-safety' }
      ]
    },
    {
      title: 'Consensus & Coordination Protocols',
      items: [
        { title: 'Raft Consensus Algorithm - In Search of an Understandable Consensus Algorithm', url: 'https://raft.github.io/raft.pdf' },
        { title: 'PBFT: Practical Byzantine Fault Tolerance (OSDI 1999)', url: 'http://pmg.csail.mit.edu/papers/osdi99.pdf' },
        { title: 'Ethereum Consensus Mechanisms for Multi-Agent Systems', url: 'https://ethereum.org/en/developers/docs/consensus-mechanisms/' },
        { title: 'Google Spanner - Globally-Distributed Database Consensus', url: 'https://cloud.google.com/spanner/docs/true-time-external-consistency' }
      ]
    },
    {
      title: 'Implementation Tools & Frameworks',
      items: [
        { title: 'LangGraph - Multi-Agent Workflows with Security', url: 'https://github.com/langchain-ai/langgraph' },
        { title: 'CrewAI - Role-Based Multi-Agent Framework', url: 'https://github.com/joaomdmoura/crewAI' },
        { title: 'JADE - Java Agent Development Framework Security', url: 'https://jade.tilab.com/documentation/security-guide/' },
        { title: 'ROS 2 Security - Multi-Robot System Security', url: 'https://design.ros2.org/articles/ros2_security.html' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Orchestrates multiple specialized security agents for comprehensive threat detection"
        why="Single agents have blind spots; coordinated ensemble provides defense-in-depth"
        keyInsight="Specialized roles + Byzantine consensus + reputation weighting = robust security"
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

export default MaestroMultiAgentSecurityDetails;