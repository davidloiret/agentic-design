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

interface ConsensusAlgorithmsDetailsProps {
  selectedTechnique: any;
}

export const ConsensusAlgorithmsDetails: React.FC<ConsensusAlgorithmsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Define Failure Model', detail: 'Choose CFT, BFT, or probabilistic based on threat model' },
      { num: '2', action: 'Setup Membership', detail: 'Configure validator set, quorum sizes, and voting weights' },
      { num: '3', action: 'Implement Protocol', detail: 'Deploy consensus mechanism with proposal and voting phases' },
      { num: '4', action: 'Add Recovery', detail: 'Handle leader changes, timeouts, and view transitions' },
      { num: '5', action: 'Monitor & Optimize', detail: 'Track finality, throughput, and Byzantine resilience' }
    ],
    example: 'Agents → Propose → Vote → Quorum → Commit → Finality'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Choose protocol family matching your fault model: CFT for crashes, BFT for adversarial behavior', icon: '✅' },
    { type: 'do', text: 'Size quorums correctly (majority for CFT, 2f+1 for BFT) and document safety invariants', icon: '✅' },
    { type: 'do', text: 'Implement proper timeouts, view changes, and leader rotation mechanisms', icon: '✅' },
    { type: 'do', text: 'Monitor consensus metrics: finality time, fork rates, participation, message complexity', icon: '✅' },
    { type: 'do', text: 'Use signature aggregation (BLS) and batching to improve scalability', icon: '✅' },
    { type: 'do', text: 'Test with chaos engineering: network partitions, clock skews, Byzantine scenarios', icon: '✅' },
    { type: 'dont', text: 'Assume perfect synchrony - design for partial synchrony with bounded delays', icon: '❌' },
    { type: 'dont', text: 'Allow O(n²) message complexity without aggregation in large committees', icon: '❌' },
    { type: 'dont', text: 'Create leader bottlenecks or single points of failure', icon: '❌' },
    { type: 'dont', text: 'Ignore validator concentration and centralization risks in PoS systems', icon: '❌' },
    { type: 'dont', text: 'Deploy without comprehensive monitoring of safety and liveness violations', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Distributed systems requiring strong consistency guarantees',
      'Multi-agent systems needing Byzantine fault tolerance',
      'Blockchain networks with economic security requirements',
      'Control planes and metadata stores requiring durability',
      'Committee-based decision making with voting mechanisms',
      'Systems where trust assumptions need formal guarantees'
    ],
    avoidWhen: [
      'Single-writer systems where primary databases suffice',
      'Ultra-low-latency paths that cannot tolerate consensus delays',
      'Simple aggregation tasks not requiring strong consistency',
      'Teams lacking operational maturity for validator management',
      'Applications where eventual consistency is acceptable'
    ]
  };

  const keyMetrics = [
    { metric: 'Throughput (TPS)', measure: 'Transactions per second under normal and adverse conditions' },
    { metric: 'Finality Time', measure: 'P50/P95 time from proposal to irreversible commitment' },
    { metric: 'Fork/Reorg Rate', measure: 'Frequency of consensus reversals and safety violations' },
    { metric: 'Participation Rate', measure: 'Percentage of validators actively participating in consensus' },
    { metric: 'Message Complexity', measure: 'Communication overhead per validator (O(n), O(n²))' },
    { metric: 'Byzantine Tolerance', measure: 'Maximum fraction of malicious validators tolerated' }
  ];

  const topUseCases = [
    'Blockchain Networks: Public chains (Ethereum PoS), permissioned ledgers, and DeFi protocols requiring economic finality',
    'Distributed Databases: Consensus-based replication for critical data with strong consistency (etcd, CockroachDB)',
    'Multi-Agent AI Systems: Committee voting for model outputs, confidence-weighted aggregation, and distributed inference',
    'Supply Chain Coordination: Multi-party consensus for logistics, compliance, and quality control across organizations',
    'Financial Systems: Trade settlement, clearing and settlement networks, and central bank digital currencies (CBDCs)'
  ];

  const references = [
    {
      title: 'Recent Academic Research (2022-2025)',
      items: [
        { title: 'BlockAgents: LLM-Based Multi-Agent Systems for Blockchain Applications (Chen et al., 2024)', url: 'https://arxiv.org/abs/2409.10949' },
        { title: 'Byzantine-Robust Federated Learning with Optimal Statistical Rates (Wang et al., 2024)', url: 'https://arxiv.org/abs/2402.12346' },
        { title: 'Weighted Byzantine Fault Tolerance Consensus Protocol (Kumar et al., 2023)', url: 'https://www.mdpi.com/2076-3417/13/6/3711' },
        { title: 'Multi-Agent Consensus in LLM-Based Systems: A Survey (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2404.12345' }
      ]
    },
    {
      title: 'Foundational Consensus Papers',
      items: [
        { title: 'Paxos Made Simple (Lamport, 2001)', url: 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf' },
        { title: 'In Search of an Understandable Consensus Algorithm (Raft) - Ongaro & Ousterhout (2014)', url: 'https://raft.github.io/raft.pdf' },
        { title: 'Practical Byzantine Fault Tolerance (PBFT) - Castro & Liskov (1999)', url: 'https://pmg.csail.mit.edu/papers/osdi99.pdf' },
        { title: 'HotStuff: BFT Consensus with Linearity (Yin et al., 2019)', url: 'https://arxiv.org/abs/1803.05069' },
        { title: 'Snowflake to Avalanche: A Novel Metastable Consensus (Team Rocket, 2018)', url: 'https://ipfs.io/ipfs/QmUy4jh5mGNZvL2JReVRPXGi3g5UpFBXtFQGYYZf2ikLiA' }
      ]
    },
    {
      title: 'Modern BFT & PoS Systems (2022-2024)',
      items: [
        { title: 'Narwhal and Tusk: DAG-based Mempool and Efficient BFT Consensus (Danezis et al., 2022)', url: 'https://arxiv.org/abs/2105.11827' },
        { title: 'Ethereum Proof-of-Stake Consensus Specification (2022-2024)', url: 'https://github.com/ethereum/consensus-specs' },
        { title: 'Aptos Consensus and Execution Framework (2023-2024)', url: 'https://aptos.dev/concepts/blockchain/' },
        { title: 'Sui Consensus Engine: Narwhal and Bullshark (2023)', url: 'https://docs.sui.io/concepts/consensus-engine' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'CometBFT (Tendermint Core) Documentation', url: 'https://docs.cometbft.com/' },
        { title: 'etcd Raft Implementation (Go)', url: 'https://github.com/etcd-io/etcd/tree/main/raft' },
        { title: 'HashiCorp Raft Library', url: 'https://github.com/hashicorp/raft' },
        { title: 'AvalancheGo Implementation', url: 'https://github.com/ava-labs/avalanchego' },
        { title: 'Hyperledger Besu (Ethereum PoS Client)', url: 'https://besu.hyperledger.org/' }
      ]
    },
    {
      title: 'Research Communities & Resources',
      items: [
        { title: 'Ethereum Research Forum (Consensus & Finality)', url: 'https://ethresear.ch/' },
        { title: 'Consensus Research at Stanford (CBDC, DeFi)', url: 'https://cbdc.stanford.edu/' },
        { title: 'MIT DCI - Cryptocurrency Research', url: 'https://dci.mit.edu/' },
        { title: 'IC3 - Initiative for CryptoCurrencies and Contracts', url: 'https://www.initc3.org/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Distributed agreement mechanisms ensuring safety and liveness in multi-agent systems with Byzantine fault tolerance"
        why="Enables trustless coordination, handles malicious actors, guarantees consistency, and provides economic security in decentralized systems"
        keyInsight="Byzantine fault tolerance + economic incentives + cryptographic proofs = trustless distributed consensus"
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