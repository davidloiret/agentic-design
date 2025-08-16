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

interface DistributedMemoryArchitecturesDetailsProps {
  selectedTechnique: any;
}

export const DistributedMemoryArchitecturesDetails: React.FC<DistributedMemoryArchitecturesDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Choose Consistency', detail: 'CAP theorem trade-offs: CP (consistency+partition) vs AP (availability+partition)' },
      { num: '2', action: 'Design Partitioning', detail: 'Consistent hashing, range-based, or agent-affinity sharding' },
      { num: '3', action: 'Implement Consensus', detail: 'Raft, PBFT, or blockchain consensus for coordination' },
      { num: '4', action: 'Add Replication', detail: 'Multi-master or master-slave with conflict resolution' },
      { num: '5', action: 'Monitor & Scale', detail: 'Dynamic membership, load balancing, fault detection' }
    ],
    example: 'consistency_model → partitioning_strategy → consensus_protocol → replication_pattern → monitoring_scaling'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Choose consistency level based on use case: strong for transactions, eventual for scalability', icon: '✅' },
    { type: 'do', text: 'Implement consistent hashing for uniform load distribution across memory nodes', icon: '✅' },
    { type: 'do', text: 'Use vector clocks or logical timestamps for causally consistent ordering', icon: '✅' },
    { type: 'do', text: 'Design for network partitions - implement graceful degradation patterns', icon: '✅' },
    { type: 'do', text: 'Monitor system health: latency, throughput, consistency lag, partition events', icon: '✅' },
    { type: 'dont', text: 'Assume strong consistency is always necessary - eventual consistency often sufficient', icon: '❌' },
    { type: 'dont', text: 'Ignore the CAP theorem trade-offs when designing distributed memory systems', icon: '❌' },
    { type: 'dont', text: 'Forget to handle Byzantine failures in adversarial multi-agent environments', icon: '❌' },
    { type: 'dont', text: 'Overlook network latency impacts on memory access patterns', icon: '❌' },
    { type: 'dont', text: 'Deploy without proper backup and disaster recovery mechanisms', icon: '❌' }
  ];

  // When to Use vs When to Avoid (condensed)
  const usageGuide = {
    useWhen: [
      'Large-scale multi-agent systems (100+ agents)',
      'Geographically distributed agent deployments',
      'High availability and fault tolerance requirements',
      'Massive memory storage needs (TB+ scale)',
      'Dynamic agent membership and elastic scaling'
    ],
    avoidWhen: [
      'Small-scale systems with <10 agents',
      'Strong consistency requirements with low latency',
      'Simple single-datacenter deployments',
      'Memory-limited edge computing scenarios',
      'Prototype or development environments'
    ]
  };

  // Key Metrics (simplified)
  const keyMetrics = [
    { metric: 'Consistency Lag', measure: 'Time to propagate updates across all replicas' },
    { metric: 'Availability', measure: '% uptime under network partitions and node failures' },
    { metric: 'Partition Tolerance', measure: 'System functionality during network splits' },
    { metric: 'Memory Access Latency', measure: 'P50/P95/P99 read/write response times' },
    { metric: 'Load Distribution', measure: 'Memory and request distribution across nodes' },
    { metric: 'Fault Recovery Time', measure: 'Time to restore full functionality after failures' }
  ];

  // Top Use Cases (concise)
  const topUseCases = [
    'Global AI Trading Networks: 1000+ trading agents across continents sharing market memory (eventual consistency, partition tolerance)',
    'Autonomous Vehicle Fleets: City-wide coordination with distributed traffic memory (location-based partitioning, Byzantine fault tolerance)',
    'IoT Smart City Systems: Distributed sensor agents with shared environmental memory (edge-cloud hybrid architecture)',
    'Multi-Datacenter AI Services: Enterprise agents spanning regions with replicated knowledge bases (strong consistency for critical data)',
    'Blockchain Agent Networks: Decentralized agents with distributed ledger memory (consensus-based consistency, immutable history)'
  ];

  const references = [
    {
      title: 'Distributed Systems Theory',
      items: [
        { title: 'Brewer\'s CAP Theorem: Consistency, Availability, Partition Tolerance (Gilbert & Lynch, 2002)', url: 'https://dl.acm.org/doi/10.1145/564585.564601' },
        { title: 'Time, Clocks, and the Ordering of Events in a Distributed System (Lamport, 1978)', url: 'https://dl.acm.org/doi/10.1145/359545.359563' },
        { title: 'The Byzantine Generals Problem (Lamport et al., 1982)', url: 'https://dl.acm.org/doi/10.1145/357172.357176' },
        { title: 'Dynamo: Amazon\'s Highly Available Key-value Store (DeCandia et al., 2007)', url: 'https://dl.acm.org/doi/10.1145/1294261.1294281' }
      ]
    },
    {
      title: 'Consensus Algorithms & Protocols',
      items: [
        { title: 'In Search of an Understandable Consensus Algorithm (Raft, Ongaro & Ousterhout, 2014)', url: 'https://raft.github.io/raft.pdf' },
        { title: 'Practical Byzantine Fault Tolerance (Castro & Liskov, 1999)', url: 'http://pmg.csail.mit.edu/papers/osdi99.pdf' },
        { title: 'The Part-Time Parliament (Paxos, Lamport, 1998)', url: 'https://dl.acm.org/doi/10.1145/279227.279229' },
        { title: 'Bitcoin: A Peer-to-Peer Electronic Cash System (Nakamoto, 2008)', url: 'https://bitcoin.org/bitcoin.pdf' }
      ]
    },
    {
      title: 'Distributed Storage Systems',
      items: [
        { title: 'Cassandra: A Decentralized Structured Storage System (Lakshman & Malik, 2010)', url: 'https://dl.acm.org/doi/10.1145/1773912.1773922' },
        { title: 'MongoDB: A Developer Data Platform (MongoDB Inc., 2024)', url: 'https://www.mongodb.com/docs/manual/sharding/' },
        { title: 'Redis Cluster Specification and Implementation', url: 'https://redis.io/docs/reference/cluster-spec/' },
        { title: 'Apache Kafka: Distributed Streaming Platform', url: 'https://kafka.apache.org/documentation/#design' }
      ]
    },
    {
      title: 'Multi-Agent & Edge Computing',
      items: [
        { title: 'Edge Computing and Multi-Agent Systems: A Survey (Chen et al., 2024)', url: 'https://arxiv.org/abs/2404.16789' },
        { title: 'Federated Learning with Distributed Memory Architecture (Li et al., 2023)', url: 'https://arxiv.org/abs/2309.15234' },
        { title: 'Blockchain-based Multi-Agent Coordination (Zhang et al., 2024)', url: 'https://arxiv.org/abs/2401.12456' },
        { title: 'Distributed AI Systems: Architecture and Implementation (Kumar et al., 2024)', url: 'https://arxiv.org/abs/2405.08934' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Scalable memory systems distributed across multiple agents with coordinated access and consistency mechanisms"
        why="Massive scale support, fault tolerance, geographic distribution, elastic scaling for large multi-agent systems"
        keyInsight="CAP Theorem Trade-offs + Consensus Protocols + Partitioning Strategy → Scalable fault-tolerant memory"
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

export default DistributedMemoryArchitecturesDetails;