'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';

export const PeerCollaborationDetails = () => {
  return (
    <>
      {/* Core Mechanism */}
      <section>
        <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Core Mechanism
        </h2>
        <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-xl p-6">
          <p className="text-gray-200 text-base leading-relaxed">
            Decentralized cooperation among equal-role LLM agents communicating peer-to-peer. Peers propose, critique, and
            reconcile answers via voting, self-consistency, or a judge/arbiter, optionally sharing artifacts in a
            blackboard or shared memory. No single permanent controller is required; coordination emerges through
            structured rounds and consensus rules.
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
            <li>Team setup: define number of peers, diverse personas/capabilities, shared tools/memory.</li>
            <li>Goal + context: normalize task, constraints, and evaluation rubric.</li>
            <li>Proposal round: each peer generates an initial solution with rationale and confidence.</li>
            <li>Critique/debate rounds: peers cross-examine and refine; enforce max rounds and turn limits.</li>
            <li>Aggregation: select via majority vote, confidence-weighted vote, self-consistency, or LLM-as-judge.</li>
            <li>Synthesis: one peer (or meta-agent) composes the final answer using winning evidence.</li>
            <li>Verification: optional tests/tool checks; retry with counterfactuals if criteria not met.</li>
            <li>Logging: persist traces, costs, decisions, and dissent for audit and learning.</li>
          </ol>
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
            'Maximize diversity: vary roles/prompts/tools or even base models to reduce correlated errors.',
            'Use structured message schemas (role, claim, evidence, confidence) for parsable debates.',
            'Bound tokens and rounds; add explicit stop criteria to avoid ping-pong loops.',
            'Calibrate confidence and prefer confidence-weighted or judge-mediated selection for hard tasks.',
            'Have an impartial arbiter (LLM-as-a-judge) only for tie-breaks; validate with spot human evals.',
            'Summarize between rounds to compress context; cache retrieved evidence across peers.',
            'Isolate tools and sandbox effects; enforce safety filters on inputs/outputs.',
            'Instrument traces, costs, and agreement metrics; regression-test with benchmark suites.',
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
            <li>Simple or deterministic tasks where a single agent meets quality and SLOs.</li>
            <li>Hard real-time paths with strict latency budgets or tight cost ceilings.</li>
            <li>High-stakes writes (payments, policy changes) requiring single-source-of-truth authority.</li>
            <li>Homogeneous peers (same prompt/model) that offer little diversity benefit.</li>
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
            <li>Echo chambers and self-reinforcement; mode collapse toward incorrect majority answers.</li>
            <li>Unbounded token growth from many peers/rounds without compression.</li>
            <li>Noisy or biased judges; selection overfits to writing style rather than correctness.</li>
            <li>Shared-memory races or stale context causing contradictions between peers.</li>
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
            'Peer-to-peer messaging with typed arguments and artifacts',
            'Critique/debate mechanisms and cross-examination',
            'Consensus selection: majority, confidence-weighted, self-consistency, judge',
            'Shared blackboard or memory with concurrency controls',
            'Fault tolerance: drop or replace failing peers',
            'Pluggable frameworks (AutoGen, LangGraph, Swarm, CrewAI, AgentScope)',
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
            <li>Task success rate vs single-agent baseline; win rate on human/LLM judged comparisons.</li>
            <li>Tokens and cost per successful task; peers × rounds; latency p50/p95.</li>
            <li>Agreement with ground truth; disagreement entropy and diversity score.</li>
            <li>Failure taxonomy: deadlocks, contradictions, tool errors; MTTR with retries.</li>
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
            <li>Cap peers and rounds; summarize between rounds to control context growth.</li>
            <li>Use small models for critique/voting; reserve larger models for synthesis/verification.</li>
            <li>Parallelize peer turns; cache shared evidence and retrieved chunks.</li>
            <li>Set explicit token budgets per round and per conversation.</li>
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
            <li>Program repair and code reasoning (e.g., SWE-bench Verified), multi-perspective code review.</li>
            <li>Math and logical reasoning (e.g., GSM8K-like tasks) with self-consistency and debate.</li>
            <li>Research synthesis, policy analysis, red teaming, and safety alignment reviews.</li>
            <li>Planning under uncertainty with tool calls and evidence aggregation.</li>
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
              <li><a href="https://arxiv.org/abs/2308.08155" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2303.05431" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CAMEL: Communicative Agents for Role-Playing (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Tree of Thoughts: Deliberate Problem Solving with LLMs (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2303.11366" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Reflexion: Language Agents with Verbal Reinforcement Learning (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2306.05685" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLM-as-a-Judge: Reliable Evaluation via Pairwise Comparison (2023)</a></li>
              <li><a href="https://arxiv.org/abs/2203.11171" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Self-Consistency Improves Chain-of-Thought Reasoning (2022)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen Framework Docs</a></li>
              <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph Documentation</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm (GitHub)</a></li>
              <li><a href="https://docs.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI Documentation</a></li>
              <li><a href="https://arxiv.org/abs/2402.14034" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentScope: Flexible Multi-Agent Platform (2024)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen</a></li>
              <li><a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a></li>
              <li><a href="https://www.crewai.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
              <li><a href="https://github.com/openai/swarm" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">OpenAI Swarm</a></li>
              <li><a href="https://github.com/modelscope/agentscope" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentScope</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li><a href="https://www.swebench.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">SWE-bench (incl. Verified) benchmark</a></li>
              <li><a href="https://arxiv.org/abs/2308.09790" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AgentBench: Evaluating LLMs as Agents (2023)</a></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};