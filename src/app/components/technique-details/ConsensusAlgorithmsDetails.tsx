'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const ConsensusAlgorithmsDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-orange-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed mb-3">
            Mechanisms that enable a set of nodes or agents to agree on a single value or ordered
            sequence of decisions despite failures or adversarial behavior. Families include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm">
            <li><span className="font-medium">Crash Fault Tolerant (CFT)</span>: leader-based log replication (e.g., Raft, Paxos) for state machine replication.</li>
            <li><span className="font-medium">Byzantine Fault Tolerant (BFT)</span>: tolerates malicious nodes via quorum certificates (e.g., PBFT, HotStuff, Tendermint).</li>
            <li><span className="font-medium">Probabilistic/Sampling</span>: repeated randomized voting leading to metastable consensus (e.g., Avalanche).</li>
            <li><span className="font-medium">DAG-based pipelines</span>: decouple mempool/ordering to improve throughput and latency (e.g., Narwhal/Tusk/Bullshark).
            </li>
          </ul>
          <p className="text-gray-400 text-sm mt-3">
            In multi-agent LLM systems, lighter-weight consensus (majority vote, confidence-weighted vote, LLM-as-judge)
            is often used for decision aggregation; for authoritative shared state or external effects, adopt proven
            distributed consensus with explicit safety/finality guarantees.
          </p>
        </div>
      </section>

      {/* Workflow / Steps */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Workflow / Steps
        </h2>
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
            <li><span className="font-medium">Define failure model</span>: crash-only (CFT) vs Byzantine (BFT); synchrony assumptions and quorum sizes.</li>
            <li><span className="font-medium">Membership</span>: fixed committee or dynamic validator set; staking/weighting rules where applicable.</li>
            <li><span className="font-medium">Proposal</span>: a leader or proposer suggests the next value/block.</li>
            <li><span className="font-medium">Voting</span>: peers validate and vote; quorum certificates accumulate.</li>
            <li><span className="font-medium">Commit/Finality</span>: once safety conditions are met, the value is irrevocably committed.</li>
            <li><span className="font-medium">Recovery</span>: handle leader changes/view changes, timeouts, and reconfiguration.</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
              <div className="text-gray-300 text-sm font-semibold mb-2">CFT (Raft)</div>
              <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                <li>Leader election (terms, majority votes)</li>
                <li>Log append, majority ack</li>
                <li>Commit index advances, apply to state machine</li>
              </ul>
            </div>
            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
              <div className="text-gray-300 text-sm font-semibold mb-2">BFT (HotStuff/Tendermint)</div>
              <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                <li>Propose → vote (prevote/precommit or QC)</li>
                <li>Form quorum certificate (≥ 2f + 1)</li>
                <li>Commit with chained QCs; rotate leader on timeout</li>
              </ul>
            </div>
            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
              <div className="text-gray-300 text-sm font-semibold mb-2">Probabilistic (Avalanche)</div>
              <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                <li>Repeated random sampling of peers</li>
                <li>Preference updates; confidence accumulates</li>
                <li>Metastable convergence to final preference</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-green-500 rounded-full"></div>
          Best Practices
        </h2>
        <div className="grid gap-3">
          {[
            'Choose the protocol family that matches faults and trust: Raft/Paxos for CFT clusters; BFT (HotStuff/Tendermint) for adversarial settings; Avalanche for probabilistic, high-throughput environments.',
            'Size quorums correctly (e.g., majority in CFT; 2f+1 in BFT) and document safety invariants and finality conditions.',
            'Use timeouts, backoff, and view-change/leader-rotation; avoid assuming synchrony.',
            'Instrument consensus: proposal rates, vote rates, time-to-finality, fork/reorg metrics, participation, message drops.',
            'Run chaos/Jepsen-style tests, network partitions, clock skews, and byzantine scenarios; fuzz inputs and serialization.',
            'For PoS, align incentives and slashing; monitor validator concentration and Nakamoto coefficient.',
            'Separate data dissemination from ordering (e.g., DAG mempool like Narwhal) for throughput; batch and aggregate signatures (BLS) where available.',
            'Plan safe upgrades: rolling key rotations, parameter changes, and replay protection; keep snapshots and state checkpoints.',
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
              <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* When NOT to Use */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-red-500 rounded-full"></div>
          When NOT to Use
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Single-writer, centralized systems where a primary database provides required durability and availability.</li>
            <li>Ultra-low-latency critical paths that cannot tolerate network round trips or quorum waits.</li>
            <li>Small teams lacking operational maturity for validator operations, key management, and upgrades.</li>
            <li>Tasks that only need heuristic aggregation in LLM agents (use voting/judge rather than full distributed consensus).</li>
          </ul>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
          Common Pitfalls
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Misconfigured quorum sizes or assuming synchrony, leading to safety or liveness violations.</li>
            <li>O(n^2) message storms and bandwidth exhaustion in large committees without aggregation.</li>
            <li>Leader stickiness or slow leader causing throughput collapse; lack of responsive view changes.</li>
            <li>Stake/validator centralization, correlated failures, or key compromise increasing reorg risk.</li>
            <li>Insufficient monitoring of reorg/fork rates, participation, and finality; blind to safety incidents.</li>
          </ul>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Safety (no two different commits) and liveness under stated assumptions',
            'Deterministic finality (BFT) vs probabilistic finality (sampling/PoW)',
            'Leader-based vs leaderless; pipelining and chained quorum certificates',
            'Quorum sizes and weighting (stake- or identity-based)',
            'Partial synchrony tolerance and view-change responsiveness',
            'Signature aggregation and batching for scalability',
          ].map((feat) => (
            <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* KPIs / Success Metrics */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          KPIs / Success Metrics
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Throughput (TPS) and end-to-end latency; time-to-first-block and time-to-finality (p50/p95).</li>
            <li>Fork/reorg rate; finality reversion probability; view-change frequency and duration.</li>
            <li>Validator participation, vote weight distribution, and Nakamoto coefficient.</li>
            <li>Message complexity and bandwidth per validator; CPU utilization and signature verification rate.</li>
          </ul>
        </div>
      </section>

      {/* Token / Resource Usage */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
          Token / Resource Usage
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li><span className="font-medium">PoS/BFT</span>: stake capital at risk (slashing), network I/O for votes/QCs, CPU for signature checks; O(n)–O(n^2) messaging depending on protocol.</li>
            <li><span className="font-medium">PoW</span>: substantial energy/computation costs; not commonly used in new systems due to efficiency concerns.</li>
            <li><span className="font-medium">Avalanche</span>: small constant sampling (k) per round; many short rounds; bandwidth dominated by gossip.</li>
            <li><span className="font-medium">DAG mempools</span> (Narwhal/Tusk): higher steady-state bandwidth and memory to sustain pipelining; improved throughput and latency.</li>
          </ul>
        </div>
      </section>

      {/* Best Use Cases */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
          Best Use Cases
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li><span className="font-medium">CFT</span>: control planes and metadata stores (etcd, Kubernetes), configuration/state replication.</li>
            <li><span className="font-medium">BFT</span>: permissioned ledgers and high-value state transitions needing deterministic finality.</li>
            <li><span className="font-medium">PoS public chains</span>: decentralized networks prioritizing energy efficiency and economic security.</li>
            <li><span className="font-medium">Probabilistic sampling</span>: high-throughput/low-latency asset networks with large validator sets.</li>
            <li><span className="font-medium">LLM multi-agent</span>: committee voting, confidence-weighted aggregation, or judge arbitration for answer selection; use strong consensus for shared durable state.</li>
          </ul>
        </div>
      </section>

      {/* References & Further Reading */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
          References & Further Reading
        </h2>
        <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Academic Papers</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://lamport.azurewebsites.net/pubs/paxos-simple.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Paxos Made Simple — Lamport (2001)</a></li>
              <li><a href="https://raft.github.io/raft.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">In Search of an Understandable Consensus Algorithm (Raft) — Ongaro & Ousterhout (2014)</a></li>
              <li><a href="https://pmg.csail.mit.edu/papers/osdi99.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Practical Byzantine Fault Tolerance (PBFT) — Castro & Liskov (1999)</a></li>
              <li><a href="https://arxiv.org/abs/1803.05069" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HotStuff: BFT Consensus with Linearity — Yin et al. (2019)</a></li>
              <li><a href="https://atrium.lib.uoguelph.ca/server/api/core/bitstreams/1f7c8d44-1ab4-4f6f-9a07-1a4f0a8c1b3a/content" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Latest Gossip on BFT Consensus (Tendermint) — Buchman (2016)</a></li>
              <li><a href="https://arxiv.org/abs/2105.11827" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Narwhal and Tusk: DAG-based Mempool and Efficient BFT Consensus — Danezis et al. (2022)</a></li>
              <li><a href="https://ipfs.io/ipfs/QmUy4jh5mGNZvL2JReVRPXGi3g5UpFBXtFQGYYZf2ikLiA" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Snowflake to Avalanche: A Novel Metastable Consensus — Team Rocket (2018)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://raft.github.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Raft Guide and Visualizations</a></li>
              <li><a href="https://docs.cometbft.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CometBFT (Tendermint Core) Documentation</a></li>
              <li><a href="https://github.com/ethereum/consensus-specs" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ethereum Proof-of-Stake Consensus Specs</a></li>
              <li><a href="https://docs.avax.network/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Avalanche Developer Docs</a></li>
              <li><a href="https://aptos.dev/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Aptos (HotStuff-derived) Docs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://github.com/etcd-io/etcd/tree/main/raft" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">etcd Raft (Go)</a></li>
              <li><a href="https://github.com/hashicorp/raft" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HashiCorp Raft</a></li>
              <li><a href="https://github.com/cometbft/cometbft" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CometBFT (Tendermint Core)</a></li>
              <li><a href="https://github.com/ava-labs/avalanchego" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AvalancheGo</a></li>
              <li><a href="https://besu.hyperledger.org/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hyperledger Besu (Ethereum PoS)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://ethresear.ch/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ethereum Research Forum (finality, fork choice)</a></li>
              <li><a href="https://groups.google.com/g/raft-dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">raft-dev Google Group</a></li>
              <li><a href="https://forum.cosmos.network/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Cosmos/CometBFT Forum</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};