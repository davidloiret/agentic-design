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

interface PeerCollaborationDetailsProps {
  selectedTechnique: any;
}

export const PeerCollaborationDetails: React.FC<PeerCollaborationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Network Design', detail: 'Define peer-to-peer communication topology and protocols' },
      { num: '2', action: 'Consensus Rules', detail: 'Implement voting, reputation, and agreement mechanisms' },
      { num: '3', action: 'Self-Organization', detail: 'Enable dynamic role assignment and task distribution' },
      { num: '4', action: 'Conflict Resolution', detail: 'Add negotiation and dispute resolution protocols' },
      { num: '5', action: 'Adaptive Learning', detail: 'Implement collective intelligence and knowledge sharing' }
    ],
    example: 'AgentA ↔ AgentB ↔ AgentC → Consensus → Collective Decision'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement robust consensus mechanisms for critical decisions', icon: '✅' },
    { type: 'do', text: 'Enable dynamic topology adaptation based on agent performance', icon: '✅' },
    { type: 'do', text: 'Use reputation systems to weight agent contributions', icon: '✅' },
    { type: 'do', text: 'Design fault-tolerant protocols for agent failures', icon: '✅' },
    { type: 'do', text: 'Implement privacy-preserving communication when needed', icon: '✅' },
    { type: 'do', text: 'Enable emergent behavior through local interaction rules', icon: '✅' },
    { type: 'dont', text: 'Create single points of failure in the peer network', icon: '❌' },
    { type: 'dont', text: 'Allow unchecked consensus manipulation by malicious agents', icon: '❌' },
    { type: 'dont', text: 'Ignore network partition and Byzantine fault scenarios', icon: '❌' },
    { type: 'dont', text: 'Use synchronous protocols that block on slow peers', icon: '❌' },
    { type: 'dont', text: 'Neglect scalability limits in peer-to-peer architectures', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Distributed problem-solving across organizations',
      'Consensus-building without central authority',
      'Research collaboration and peer review processes',
      'Decentralized decision-making scenarios',
      'Systems requiring fault tolerance and resilience',
      'Cross-domain knowledge integration tasks'
    ],
    avoidWhen: [
      'Tasks requiring strict hierarchical control',
      'Time-critical decisions needing immediate response',
      'Simple problems solvable by single agents',
      'Scenarios with well-defined optimal solutions',
      'Environments with unreliable network connectivity'
    ]
  };

  const keyMetrics = [
    { metric: 'Consensus Quality', measure: 'Agreement strength and decision confidence' },
    { metric: 'Network Resilience', measure: 'Performance under node failures and attacks' },
    { metric: 'Convergence Time', measure: 'Speed of reaching collaborative decisions' },
    { metric: 'Knowledge Diversity', measure: 'Variety of perspectives and solutions generated' },
    { metric: 'Scalability Factor', measure: 'Performance degradation with network size' },
    { metric: 'Byzantine Tolerance', measure: 'Robustness against malicious agents' }
  ];

  const topUseCases = [
    'Scientific Research Collaboration: Distributed peer review with consensus-based evaluation and knowledge synthesis across institutions',
    'Blockchain Consensus: Decentralized validation with Byzantine fault tolerance and proof-of-stake mechanisms for secure transactions',
    'Distributed Software Development: Peer-based code review, collaborative debugging, and consensus-driven architecture decisions',
    'Supply Chain Coordination: Multi-party consensus for logistics, quality control, and compliance across organizational boundaries',
    'Autonomous Vehicle Networks: Peer-to-peer coordination for traffic management, route optimization, and safety consensus'
  ];

  const references = [
    {
      title: 'Recent Academic Research (2023-2025)',
      items: [
        { title: 'Multi-Agent Collaboration Mechanisms: A Survey of LLMs (Tran et al., 2025)', url: 'https://arxiv.org/html/2501.06322v1' },
        { title: 'Exploring Collaboration Mechanisms for LLM Agents: A Social Psychology View (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2310.02124' },
        { title: 'AgentNet: Decentralized Evolutionary Coordination for LLM-based Multi-Agent Systems (Yang et al., 2024)', url: 'https://arxiv.org/html/2504.00587v1' },
        { title: 'Multi-Agent Coordination across Diverse Applications: A Survey (2025)', url: 'https://arxiv.org/html/2502.14743v2' }
      ]
    },
    {
      title: 'Decentralized Systems & Blockchain (2024-2025)',
      items: [
        { title: 'Web 4.0: Frameworks for Autonomous AI Agents and Decentralized Enterprise Coordination (2025)', url: 'https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2025.1591907/full' },
        { title: 'AI Agents Meet Blockchain: A Survey on Secure and Scalable Collaboration (2025)', url: 'https://www.mdpi.com/1999-5903/17/2/57' },
        { title: 'Blockchain Security Enhancement: Hybrid Consensus Algorithms and ML Techniques (2024)', url: 'https://www.nature.com/articles/s41598-024-51578-7' },
        { title: 'Multi-Agent Systems and Blockchain: Systematic Literature Review', url: 'https://link.springer.com/chapter/10.1007/978-3-319-94580-4_9' }
      ]
    },
    {
      title: 'Consensus Mechanisms & Protocols',
      items: [
        { title: 'Practical Byzantine Fault Tolerance (PBFT) - Original Castro & Liskov Paper', url: 'https://pmg.csail.mit.edu/papers/osdi99.pdf' },
        { title: 'Ethereum 2.0 Proof-of-Stake Consensus Specification', url: 'https://github.com/ethereum/consensus-specs' },
        { title: 'IPFS - Peer-to-Peer Distributed File System', url: 'https://ipfs.tech/' },
        { title: 'BitTorrent Protocol - Decentralized Peer-to-Peer Network', url: 'https://www.bittorrent.org/beps/bep_0003.html' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'Holochain - Agent-Centric Distributed Computing', url: 'https://holochain.org/' },
        { title: 'Swarm - Ethereum Decentralized Storage and Communication', url: 'https://www.ethswarm.org/' },
        { title: 'LibP2P - Peer-to-Peer Networking Stack', url: 'https://libp2p.io/' },
        { title: 'Hyperledger Fabric - Enterprise Blockchain Framework', url: 'https://hyperledger-fabric.readthedocs.io/' }
      ]
    },
    {
      title: 'Social Psychology & Collaboration Research',
      items: [
        { title: 'ACL 2024 - Collaboration Mechanisms for LLM Agents (Social Psychology View)', url: 'https://aclanthology.org/2024.acl-long.782/' },
        { title: 'MIT Research - Collective Intelligence and Human-AI Collaboration', url: 'https://cci.mit.edu/' },
        { title: 'Stanford HAI - Human-Centered AI Research', url: 'https://hai.stanford.edu/' },
        { title: 'Future Internet Special Issue - Multi-Agent Systems and Collaboration (2025)', url: 'https://www.mdpi.com/journal/futureinternet/special_issues/multi_agent_systems' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Decentralized collaboration between equal agents without central authority using peer-to-peer communication"
        why="Eliminates single points of failure, enables cross-organizational cooperation, harnesses collective intelligence, and provides Byzantine fault tolerance"
        keyInsight="P2P topology + consensus mechanisms + self-organization = resilient distributed intelligence"
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

export default PeerCollaborationDetails;