'use client';
import React, { useState } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPromptPage } from './AuthPromptPage';
import CodeSandbox from '../../components/CodeSandbox';
import { InteractivePatternFlow } from '../../components/InteractivePatternFlow';
import { RemotionPlayer } from '../../components/RemotionPlayer';
import FeedbackChainingDemo from '../../components/demos/FeedbackChainingDemo';
import HierarchicalChainingDemo from '../../components/demos/HierarchicalChainingDemo';
import IterativeRefinementDemo from '../../components/demos/IterativeRefinementDemo';
import ParallelSynthesisDemo from '../../components/demos/ParallelSynthesisDemo';
import DynamicRoutingDemo from '../../components/demos/DynamicRoutingDemo';
import DynamicContextAssemblyDemo from '../../components/demos/DynamicContextAssemblyDemo';
import MessageQueuingDemo from '../../components/demos/MessageQueuingDemo';
import LatentMemoryNetworksDemo from '../../components/demos/LatentMemoryNetworksDemo';
import AdaptiveContextDepthDemo from '../../components/demos/AdaptiveContextDepthDemo';
import LatentKnowledgeRetrievalDemo from '../../components/demos/LatentKnowledgeRetrievalDemo';
import AdvancedContextCompressionDemo from '../../components/demos/AdvancedContextCompressionDemo';
import MultimodalContextIntegrationDemo from '../../components/demos/MultimodalContextIntegrationDemo';
import SlidingWindowDemo from '../../components/demos/SlidingWindowDemo';
import HierarchicalMemoryDemo from '../../components/demos/HierarchicalMemoryDemo';
import AttentionMechanismsDemo from '../../components/demos/AttentionMechanismsDemo';
import MemoryConsolidationDemo from '../../components/demos/MemoryConsolidationDemo';
import WorkingMemoryPatternsDemo from '../../components/demos/WorkingMemoryPatternsDemo';
import ContextCompressionDemo from '../../components/demos/ContextCompressionDemo';
import ContentBasedRoutingDemo from '../../components/demos/ContentBasedRoutingDemo';
import CapabilityRoutingDemo from '../../components/demos/CapabilityRoutingDemo';
import LoadBalancingDemo from '../../components/demos/LoadBalancingDemo';
import GeographicRoutingDemo from '../../components/demos/GeographicRoutingDemo';
import MapReduceDemo from '../../components/demos/MapReduceDemo';
import ScatterGatherDemo from '../../components/demos/ScatterGatherDemo';
import ForkJoinDemo from '../../components/demos/ForkJoinDemo';
import AsyncAwaitDemo from '../../components/demos/AsyncAwaitDemo';
import SelfCritiqueDemo from '../../components/demos/SelfCritiqueDemo';
import ToolUseDemo from '../../components/demos/ToolUseDemo';
import CodeExecutionDemo from '../../components/demos/CodeExecutionDemo';
import HierarchicalPlanningDemo from '../../components/demos/HierarchicalPlanningDemo';
import GoalDecompositionDemo from '../../components/demos/GoalDecompositionDemo';
import ConstraintSatisfactionDemo from '../../components/demos/ConstraintSatisfactionDemo';
import ScenarioPlanningDemo from '../../components/demos/ScenarioPlanningDemo';
import SequentialChainingDemo from '../../components/demos/SequentialChainingDemo';
import ParallelChainingDemo from '../../components/demos/ParallelChainingDemo';
import ConditionalChainingDemo from '../../components/demos/ConditionalChainingDemo';
import { patternExamples, type PatternId, type LanguageType } from '../pattern-examples';
import { patternScenarios } from '../../data/patterns';

interface TechniqueDetailsProps {
  selectedTechnique: any;
  categories: any[];
  useCases: any[];
  detailsTab?: 'overview' | 'flow' | 'interactive' | 'code';
  setDetailsTab?: (tab: 'overview' | 'flow' | 'interactive' | 'code') => void;
  selectedLanguage?: LanguageType;
  setSelectedLanguage?: (lang: LanguageType) => void;
}

export const TechniqueDetails = ({
  selectedTechnique,
  categories,
  useCases,
  detailsTab: propDetailsTab,
  setDetailsTab: propSetDetailsTab,
  selectedLanguage: propSelectedLanguage,
  setSelectedLanguage: propSetSelectedLanguage,
}: TechniqueDetailsProps) => {
  const [localDetailsTab, setLocalDetailsTab] = useState<'overview' | 'flow' | 'interactive' | 'code'>('overview');
  const [localSelectedLanguage, setLocalSelectedLanguage] = useState<LanguageType>('typescript');
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const detailsTab = propDetailsTab || localDetailsTab;
  const setDetailsTab = propSetDetailsTab || setLocalDetailsTab;
  const selectedLanguage = propSelectedLanguage || localSelectedLanguage;
  const setSelectedLanguage = propSetSelectedLanguage || setLocalSelectedLanguage;

  // Handle tab switching with auth checks
  const handleTabChange = (tab: 'overview' | 'flow' | 'interactive' | 'code') => {
    // Check if user is trying to access protected content
    if ((tab === 'interactive' || tab === 'code') && !user) {
      // Don't switch tab, let the content section handle showing auth prompt
      setDetailsTab(tab);
      return;
    }
    setDetailsTab(tab);
  };
  if (!selectedTechnique) {
    return (
      <div className="lg:col-span-3">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 shadow-2xl flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Select a technique to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 lg:p-6 border-b border-gray-700/30">
          <div className="flex items-start gap-4 lg:gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 lg:w-16 lg:h-16 bg-gray-800/60 rounded-2xl flex items-center justify-center text-2xl lg:text-2xl">
                {selectedTechnique.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-2xl font-semibold text-white mb-2">
                    {selectedTechnique.name}
                    {selectedTechnique.abbr && (
                      <span className="text-lg lg:text-lg ml-2 text-gray-400 font-normal">({selectedTechnique.abbr})</span>
                    )}
                  </h1>
                  <p className="text-gray-300 text-base lg:text-base leading-relaxed mb-4">{selectedTechnique.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className={`inline-flex items-center px-3 lg:px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${selectedTechnique.color} text-white`}>
                      Complexity: {selectedTechnique.complexity}
                    </span>
                    <span className="inline-flex items-center px-3 lg:px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/60 text-gray-200">
                      {categories.find(c => c.id === selectedTechnique.category)?.name || 'Pattern'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="border-b border-gray-700/30">
          {/* Desktop tabs */}
          <div className="hidden md:flex gap-6 px-6">
            <button
              onClick={() => handleTabChange('overview')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'overview'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => handleTabChange('flow')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'flow'
                  ? 'text-orange-400 border-orange-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <GitBranch className="w-4 h-4 inline mr-2" />
              Flow Visualization
            </button>
            <button
              onClick={() => handleTabChange('interactive')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'interactive'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Interactive Demo
            </button>
            <button
              onClick={() => handleTabChange('code')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'code'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Playground
            </button>
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTabChange('overview')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-1" />
                Overview
              </button>
              <button
                onClick={() => handleTabChange('flow')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'flow'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <GitBranch className="w-4 h-4 inline mr-1" />
                Flow
              </button>
              <button
                onClick={() => handleTabChange('interactive')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'interactive'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Play className="w-4 h-4 inline mr-1" />
                Demo
              </button>
              <button
                onClick={() => handleTabChange('code')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'code'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                Code
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 lg:p-6">
          {detailsTab === 'overview' ? (
            <div className="space-y-8">
              {/* Video Explanation - For Chain of Thought, Chain of Debates, and Sequential Chaining */}
              {(selectedTechnique.id === 'cot' || selectedTechnique.id === 'cod' || selectedTechnique.id === 'sequential-chaining') && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                    Video Explanation
                  </h2>
                  <div className="mb-8">
                    <RemotionPlayer 
                      key={selectedTechnique.id}
                      compositionId={
                        selectedTechnique.id === 'cot' ? "ChainOfThoughtWithAudio" : 
                        selectedTechnique.id === 'cod' ? "ChainOfDebatesWithAudio" :
                        selectedTechnique.id === 'sequential-chaining' ? "ProfessionalSequentialChaining" :
                        "SequentialChainingWithAudio"
                      } 
                      className="w-full"
                      audioPath={
                        selectedTechnique.id === 'cot' ? "/audio/cot/" : 
                        selectedTechnique.id === 'cod' ? "/audio/cod/" :
                        selectedTechnique.id === 'sequential-chaining' ? "/audio/sequential-chaining/" :
                        "/audio/sequential-chaining/"
                      }
                    />
                  </div>
                </section>
              )}

              {/* Overview header block (technique-specific) */}
              {selectedTechnique.id === 'function-calling' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism (short conceptual overview)
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed">
                        Model selects a tool by name and emits JSON args per schema; orchestrator validates, executes external calls, and returns structured results for synthesis.
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
                        <li>Define JSON schemas and register tools with descriptions.</li>
                        <li>Plan call(s) → model outputs function name + args.</li>
                        <li>Validate/sanitize args; enrich defaults; prompt for missing requireds.</li>
                        <li>Execute with timeouts, retries, idempotency; parallelize when safe.</li>
                        <li>Normalize results; redact secrets; log audit trail.</li>
                        <li>Return results to model; optionally chain further calls.</li>
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
                        'Tight schemas (enums/ranges/formats); hard-fail on validation errors.',
                        'Small, composable tools; clear names and examples.',
                        'Auth scoping and ACL per tool; never expose raw secrets.',
                        'Timeouts, retries with jitter, and circuit breakers.',
                        'Parallelize independent calls; cap concurrency and handle rate limits.',
                        'Idempotency for writes; dedupe by request key.',
                        'Structured logging and PII redaction.',
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
                        <li>Question is answerable from model knowledge with acceptable quality.</li>
                        <li>Hard real-time paths where tool overhead breaks SLOs.</li>
                        <li>High-risk, irreversible actions without human review.</li>
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
                        <li>Hallucinated tool names/params due to vague descriptions.</li>
                        <li>Non-idempotent writes retried after timeouts.</li>
                        <li>Unbounded parallelism → rate limits/cost spikes.</li>
                        <li>Secrets/PII leakage in prompts, outputs, or logs.</li>
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
                        'Schema-based tool registry',
                        'Automatic parameter validation',
                        'Parallel execution controls',
                        'Timeouts/retries/circuit breakers',
                        'Idempotency & deduplication',
                        'Role/tenant-scoped permissions',
                        'Structured logging & auditability',
                        'Result normalization',
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
                        <li>Tool-call success rate; validation error rate; retry/fallback rate.</li>
                        <li>Task completion rate and quality uplift vs. no-tools baseline.</li>
                        <li>Latency p50/p95 and parallel efficiency; cost per task.</li>
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
                        <li>Prompt: registry context + planning; Output: args JSON + synthesis.</li>
                        <li>External: API costs/egress/compute; cache common reads.</li>
                        <li>Heuristics: reason-first, call-if-needed; cap tool calls per turn.</li>
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
                        <li>Real-time retrieval and CRUD over business systems.</li>
                        <li>Research + calculation + scheduling + messaging assistants.</li>
                        <li>Enterprise automations with audit and least-privilege access.</li>
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
                          <li>ReAct (2022)</li>
                          <li>Toolformer (2023)</li>
                          <li>Gorilla (2023)</li>
                          <li>API-Bank / ToolBench (2023)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>OpenAI function calling/tool calls</li>
                          <li>Anthropic tool use (function_calls XML)</li>
                          <li>Google/Vertex function calling</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>Model Context Protocol (MCP)</li>
                          <li>LangChain tools</li>
                          <li>Semantic Kernel functions</li>
                          <li>LlamaIndex tools</li>
                          <li>Pydantic / JSON Schema validators</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>Engineering blogs on safe tool use & orchestration</li>
                          <li>Open-source agent repos with function calling</li>
                          <li>Conference talks and workshops</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'api-integration' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism (short conceptual overview)
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed">
                        Securely authenticate, construct requests, respect rate limits, handle pagination and errors with retries/circuit breakers, validate and normalize responses, and emit structured results with full observability.
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
                        <li>Discover API contract and scopes (OpenAPI/GraphQL schema) and define typed models.</li>
                        <li>Configure secrets and auth: API Key, OAuth2 (client credentials, auth code + refresh), HMAC/signing as needed.</li>
                        <li>Build request: method, path/query/body, headers; include correlation/request IDs.</li>
                        <li>Send with timeouts, retries (exponential backoff + jitter), and circuit breakers; honor rate limits.</li>
                        <li>Handle pagination/streaming; aggregate pages or process incrementally.</li>
                        <li>Validate and normalize response schemas; redact PII/secrets; map provider errors to typed errors.</li>
                        <li>Cache idempotent reads; deduplicate in-flight requests; enforce idempotency keys for writes.</li>
                        <li>Emit metrics, structured logs, and traces; surface actionable error messages.</li>
                        <li>Write contract tests and sandbox/integration tests; pin versions; monitor drifts.</li>
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
                        'Use typed clients and schema validators (OpenAPI/GraphQL → types + runtime validation).',
                        'Separate auth from transport; rotate/refresh tokens automatically with safe storage.',
                        'Honor Retry-After and provider-specific rate-limit headers; centralize throttling.',
                        'Design idempotent writes and provide idempotency keys; avoid duplicate side effects.',
                        'Implement robust error taxonomy (retryable, fatal, user-correctable).',
                        'Prefer incremental pagination and backpressure for large result sets.',
                        'Cache-safe GETs with short TTLs; invalidate on writes or use ETags/If-None-Match.',
                        'Encrypt secrets in transit and at rest; never log credentials or sensitive payloads.',
                        'Add SLOs per endpoint and per operation; alert on error/latency/cost anomalies.',
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
                        <li>Answer is reliably in-model and timeliness/accuracy needs are met without external calls.</li>
                        <li>Hard real-time paths where network latency jeopardizes SLAs.</li>
                        <li>Unstable or non-compliant third parties where reliability/compliance risks outweigh benefits.</li>
                        <li>Highly sensitive data without a compliant processing path or DPA in place.</li>
                        <li>Unbounded cost exposure from per-call pricing without budget controls.</li>
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
                        <li>Ignoring provider rate limits or Retry-After headers leading to throttling or bans.</li>
                        <li>Retrying non-idempotent writes and causing duplicated side effects.</li>
                        <li>Poor pagination handling (missing pages, duplicates, memory blowups).</li>
                        <li>Schema drift and silent parse failures due to weak validation.</li>
                        <li>Leaking secrets/PII in prompts, URLs, logs, or error messages.</li>
                        <li>Naive timezones/locale/number parsing causing subtle data bugs.</li>
                        <li>Unbounded concurrency → rate-limit storms and cost spikes.</li>
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
                        'Typed client with OpenAPI/GraphQL codegen',
                        'Auth: API key, OAuth2 (+ PKCE/refresh), HMAC/signatures',
                        'Automatic retries, backoff + jitter, circuit breakers',
                        'Rate-limiters with per-key/tenant quotas',
                        'Pagination/streaming helpers and result aggregation',
                        'Response validation and normalization layer',
                        'Idempotency keys and request de-duplication',
                        'Caching with ETags/conditional requests',
                        'Structured logging, tracing, metrics, and alerting',
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
                        <li>Request success rate; 4xx/5xx rates per endpoint; retry/fallback rates.</li>
                        <li>Latency p50/p95; end-to-end time including pagination.</li>
                        <li>Cost per successful operation; cache hit ratio; duplicate suppression rate.</li>
                        <li>Rate-limit violation rate; token refresh success rate; auth error rate.</li>
                        <li>Data freshness (staleness minutes) and schema drift incidents.</li>
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
                        <li>Prompt tokens: request planning + minimal response schemas; response tokens: summarization/normalization only.</li>
                        <li>External costs dominate for large responses; prefer selective fields and server-side filtering.</li>
                        <li>Cap parallel calls; batch where supported; use streaming to avoid large in-memory buffers.</li>
                        <li>Cache common reads to reduce both token and API spend.</li>
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
                        <li>Live data retrieval: finance, weather, inventory, logistics.</li>
                        <li>Transactional operations: CRM/ERP updates with audit and idempotency.</li>
                        <li>Data enrichment and aggregation across multiple providers.</li>
                        <li>Search/fetch with post-processing and summarization.
                        </li>
                        <li>Long-running workflows with checkpoints and retries.</li>
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
                          <li>ReAct (2022)</li>
                          <li>Toolformer (2023)</li>
                          <li>Gorilla / APIBench (2023–2024)</li>
                          <li>Self-RAG / Corrective RAG for tool/retrieval decisions (2023–2024)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>OpenAPI/Swagger design and codegen workflows</li>
                          <li>OAuth 2.0 + OIDC basics, PKCE, token refresh best practices</li>
                          <li>HTTP Semantics and conditional requests (RFC 9110/9111)</li>
                          <li>Retry with exponential backoff and jitter; circuit breaker patterns</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>OpenAPI generators (openapi-generator, Swagger Codegen)</li>
                          <li>HTTP clients: Axios/Fetch, Requests/HTTPX, Got</li>
                          <li>Validation: Zod, Ajv, Pydantic</li>
                          <li>Auth: oauthlib, simple-oauth2, passport, next-auth</li>
                          <li>LangChain/LlamaIndex tool adapters</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>Engineering blogs on resilient API clients and rate limiting</li>
                          <li>Provider status pages and best practice docs</li>
                          <li>Conference talks on reliability patterns and observability</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'sequential-chaining' ? (
                <> 
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Sequential chaining executes prompts in a linear pipeline where each step specializes in one task and passes a structured output to the next step. This isolates errors, preserves context, and improves quality compared to a single monolithic prompt.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔗</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Linear pipeline</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧩</div>
                          <div className="text-xs text-gray-400 mb-1">Modularity</div>
                          <div className="text-sm font-medium text-white">Step specialization</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Quality</div>
                          <div className="text-sm font-medium text-white">Error isolation</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Transparent stages</div>
                        </div>
                      </div>
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
                        <li>Decompose task into stages with clear inputs/outputs.</li>
                        <li>Design prompts per stage with schemas for structured outputs (JSON when possible).</li>
                        <li>Execute step N → validate/normalize output → pass to step N+1.</li>
                        <li>Add guardrails: retries, fallbacks, and assertions per step.</li>
                        <li>Aggregate and polish final output; log metrics for each stage.</li>
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
                        'Use strict output schemas and validate between steps',
                        'Keep step prompts focused; avoid mixing objectives',
                        'Annotate provenance: which step produced which field',
                        'Implement per-step retries with jitter; cap total cost',
                        'Cache deterministic sub-steps to reduce tokens',
                        'Version steps independently; A/B test in isolation',
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
                        <li>Highly parallel tasks with minimal dependencies → prefer Parallel Chaining.</li>
                        <li>Dynamic branching requirements → prefer Conditional Chaining or routers.</li>
                        <li>Hard real-time latency constraints where multi-step overhead is unacceptable.</li>
                        <li>Single-shot tasks that do not benefit from decomposition.</li>
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
                        <li>Context bloat from passing entire transcripts instead of distilled fields.</li>
                        <li>Error propagation when downstream steps trust unvalidated upstream outputs.</li>
                        <li>Over-fragmentation into too many steps causing latency and cost spikes.</li>
                        <li>Ambiguous interfaces between steps; missing contracts and schemas.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'parallel-chaining' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Parallel chaining executes multiple independent prompts concurrently, then merges results via aggregation strategies (e.g., majority vote, weighted scoring, map-reduce, or heuristic merge). It trades higher burst resource usage for lower wall-clock latency and broader coverage.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Concurrent fan-out/fan-in</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Aggregation</div>
                          <div className="text-sm font-medium text-white">Voting/merging strategies</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⏱️</div>
                          <div className="text-xs text-gray-400 mb-1">Latency</div>
                          <div className="text-sm font-medium text-white">Lower wall-clock time</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">💸</div>
                          <div className="text-xs text-gray-400 mb-1">Cost</div>
                          <div className="text-sm font-medium text-white">Higher burst tokens</div>
                        </div>
                      </div>
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
                        <li>Decompose into independent subproblems with minimal shared state.</li>
                        <li>Define schemas and quality criteria per worker; set timeouts and budgets.</li>
                        <li>Dispatch workers concurrently with capped fan-out and backpressure.</li>
                        <li>Collect partials as they finish; validate and score each result.</li>
                        <li>Aggregate via majority vote, weighted scoring, merge heuristics, or map-reduce.</li>
                        <li>Resolve conflicts, deduplicate, and synthesize final output.</li>
                        <li>Emit metrics (speedup, agreement, cost) and persist artifacts for audit.</li>
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
                        'Maximize independence; avoid hidden cross-step dependencies',
                        'Cap concurrency and implement rate-limit-aware backoff',
                        'Use strict schemas and quality scoring per worker output',
                        'Set timeouts and circuit breakers; tolerate partial completion',
                        'Choose aggregation strategy aligned to task (vote, rank, merge)',
                        'Deduplicate and contradiction-check before synthesis',
                        'Use smaller/cheaper models for breadth; reserve strongest model for final merge',
                        'Cache and reuse stable results across runs',
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
                        <li>Tasks with strong sequential dependencies or shared evolving state.</li>
                        <li>Strict ordering/causality requirements where merge is ill-defined.</li>
                        <li>Very small tasks where fan-out overhead exceeds benefit.</li>
                        <li>Severe rate-limit or budget constraints that preclude burst concurrency.</li>
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
                        <li>Unbounded fan-out causing cost spikes and rate-limit errors.</li>
                        <li>Naive aggregation that amplifies hallucinations or duplicates.</li>
                        <li>Hidden coupling between workers leading to inconsistent outputs.</li>
                        <li>Missing timeouts or backpressure creating head-of-line blocking.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'parallel-synthesis' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Parallel synthesis orchestrates multiple heterogeneous analysis streams in parallel and combines their outputs through
                        weighted aggregation, conflict resolution, deduplication, and consensus building. Each stream is scored for reliability
                        and relevance; a synthesis stage reconciles contradictions and produces a single, coherent output with traceable provenance.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Fan-out streams, fan-in synthesis</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Aggregation</div>
                          <div className="text-sm font-medium text-white">Weighted merge + consensus</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Quality</div>
                          <div className="text-sm font-medium text-white">Per-stream scoring & validation</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧩</div>
                          <div className="text-xs text-gray-400 mb-1">Conflicts</div>
                          <div className="text-sm font-medium text-white">Resolution & provenance</div>
                        </div>
                      </div>
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
                        <li>Define streams: identify complementary perspectives (e.g., quantitative data, competitive intel, expert interviews).</li>
                        <li>Specify schemas and scoring: structure outputs and define confidence/reliability scoring per stream.</li>
                        <li>Execute in parallel: dispatch all streams with timeouts, budgets, and capped concurrency.</li>
                        <li>Validate results: schema-check, deduplicate, and compute quality scores for each output.</li>
                        <li>Resolve conflicts: apply weighted reconciliation, tie-breakers, and escalation rules.</li>
                        <li>Synthesize: merge normalized outputs into a unified artifact with citations/provenance.</li>
                        <li>Report metrics: capture agreement, coverage, latency, and cost; persist artifacts for audit.</li>
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
                        'Design streams to be maximally independent; minimize hidden shared state',
                        'Use strict output schemas and include per-claim confidence + source attribution',
                        'Calibrate stream weights using validation data; prefer reliability over verbosity',
                        'Cap fan-out and add backpressure; fail fast on low-signal streams',
                        'Normalize terminology and units before merging to reduce false conflicts',
                        'Apply contradiction checks and run a final consistency pass',
                        'Use smaller models for breadth collection; reserve strongest model for final synthesis',
                        'Cache stable sub-results and reuse to control cost',
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
                        <li>Tasks with strong sequential dependencies or evolving shared state.</li>
                        <li>Problems where a single ground-truth source dominates and parallel diversity adds noise.</li>
                        <li>Ultra-low-latency contexts where fan-out overhead violates SLAs.</li>
                        <li>Severe rate-limit/budget constraints that preclude burst concurrency.</li>
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
                        <li>Unbounded fan-out causing token/cost spikes and rate-limit errors.</li>
                        <li>Naive majority voting that amplifies duplicated hallucinations.</li>
                        <li>Inconsistent schemas leading to merge failures and silent field loss.</li>
                        <li>Missing provenance, making audits and conflict investigation impossible.</li>
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
                        'Multi-stream execution (heterogeneous modalities supported)',
                        'Quality-weighted aggregation and consensus strategies',
                        'Conflict detection and resolution with tie-break rules',
                        'Deduplication, normalization, and terminology alignment',
                        'Provenance and citation tracking',
                        'Pluggable scoring functions and evaluators',
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Agreement rate between streams (e.g., pairwise or Fleiss’ kappa).</li>
                        <li>Coverage/recall of key facts vs. gold reference set.</li>
                        <li>Synthesis quality score (human rubric or model-as-judge).</li>
                        <li>Time-to-synthesis (wall-clock) vs. single-stream baseline.</li>
                        <li>Token per correct fact / cost per accepted unit.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Front-loaded burst tokens proportional to number of streams.</li>
                        <li>Lower wall-clock latency vs. sequential, higher instantaneous concurrency.</li>
                        <li>Amortize cost by caching stable streams and reusing across runs.</li>
                        <li>Consider memory and queue limits; apply rate-limit-aware backoff.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Research synthesis across heterogeneous sources.</li>
                        <li>Due diligence and market/competitive analysis.</li>
                        <li>Incident postmortems combining logs, metrics, and interviews.</li>
                        <li>Comprehensive reports requiring multiple perspectives.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2023)</li>
                          <li>Tree of Thoughts: Deliberate Problem Solving with LLMs (Yao et al., 2023)</li>
                          <li>Graph of Thoughts: Solving Problems with Large Language Models (Besta et al., 2023)</li>
                          <li>Multi-Agent Debate / Deliberate Decoding (various, 2023–2024)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Map-reduce and ensemble patterns for RAG pipelines</li>
                          <li>Weighted voting and rubric-based evaluators</li>
                          <li>Conflict resolution playbooks and provenance logging</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangChain (map_reduce, refine, ensemble retrievers)</li>
                          <li>LlamaIndex (composers, aggregators)</li>
                          <li>DSPy (self-consistency, evaluators)</li>
                          <li>Ray/Celery/Temporal for parallel orchestration</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Open-source forums on multi-agent and ensemble methods</li>
                          <li>LLM ops communities on evaluation and benchmarking</li>
                          <li>Papers with Code collections for reasoning ensembles</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'map-reduce' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Map-Reduce executes computation in two stages over partitioned data: a mapping stage that transforms each shard
                        into key–value pairs independently and a reducing stage that aggregates values per key. The shuffle/sort barrier
                        groups identical keys between stages. This enables parallelism, data locality, and fault-tolerant re-execution. In
                        LLM pipelines, the pattern often appears as per-chunk analysis (map) followed by a structured consolidation (reduce).
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🗺️</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Map → Shuffle/Sort → Reduce</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧩</div>
                          <div className="text-xs text-gray-400 mb-1">Units</div>
                          <div className="text-sm font-medium text-white">Key–value records</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Reliability</div>
                          <div className="text-sm font-medium text-white">Deterministic, retry-safe</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📦</div>
                          <div className="text-xs text-gray-400 mb-1">Locality</div>
                          <div className="text-sm font-medium text-white">Compute near data</div>
                        </div>
                      </div>
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
                        <li>Partition source data into balanced shards; assign stable IDs and boundaries.</li>
                        <li>Map: transform each record/shard to key–value pairs; validate and emit.</li>
                        <li>Optional combine: locally aggregate to reduce shuffle volume.</li>
                        <li>Shuffle/Sort: group all values by key with consistent hashing/partitioning.</li>
                        <li>Reduce: aggregate grouped values into final records; enforce schemas.</li>
                        <li>Write outputs; record metrics, lineage, and checkpoints.</li>
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
                        'Use deterministic, idempotent mappers and reducers; enable safe retries.',
                        'Design partitioners for even load; mitigate skew with salting or dynamic repartition.',
                        'Add combiners for associative/commutative aggregates to cut shuffle bytes.',
                        'Schema all emissions; validate at boundaries; prefer compact binary for IO-heavy paths.',
                        'Cap concurrency and enable backpressure; monitor queue depths and spill-to-disk.',
                        'Handle stragglers: speculative execution and bounded retries with jitter.',
                        'Exploit data locality; colocate compute with storage where possible.',
                        'For LLM map-reduce summarization, keep chunk sizes stable and aggregate with structure-aware prompts.'
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
                        <li>Small datasets where single-node processing is simpler and faster.</li>
                        <li>Interactive, low-latency queries; prefer indexed stores or streaming engines.</li>
                        <li>Algorithms with heavy cross-shard dependencies or iterative random access.</li>
                        <li>Real-time streaming with sliding windows; prefer stream processors.</li>
                        <li>Complex multi-stage DAGs with rich joins; prefer Spark/Beam/Ray pipelines.</li>
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
                        <li>Data skew creating hot reducers and long-tail stragglers.</li>
                        <li>Exploding shuffle volume due to missing combiners or verbose keys.</li>
                        <li>Stateful, non-deterministic mappers hindering reproducibility and retries.</li>
                        <li>Mis-sized partitions causing underutilization or memory pressure.</li>
                        <li>LLM summarization: token blow-up from inconsistent chunking or verbose map outputs.</li>
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
                        'Horizontal parallelism with deterministic aggregation',
                        'Fault tolerance via retryable tasks and checkpointing',
                        'Data locality and spill-to-disk for large shuffles',
                        'Combiners and partitioners for IO and load efficiency',
                        'Elastic scaling and speculative execution',
                        'LLM adaptation: per-chunk analysis with structured reduce'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>End-to-end throughput and time-to-completion vs. baseline.</li>
                        <li>Shuffle bytes per processed GB; combine effectiveness ratio.</li>
                        <li>Skew index (p95/p50 task duration) and straggler rate.</li>
                        <li>Failure/retry counts; speculative execution hit rate.</li>
                        <li>For LLM: quality score of reduce output, agreement across maps, cost per accepted unit.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Map stage: tokens scale with number of chunks × chunk size; cap concurrency to respect rate limits.</li>
                        <li>Reduce stage: smaller token footprint with structure-aware consolidation; avoid full re-prompt of all maps.</li>
                        <li>Infra: monitor CPU, memory, and disk during shuffle; compress intermediates where possible.</li>
                        <li>Cache stable map outputs to amortize cost across runs.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Large-scale log processing, ETL, and analytics over massive datasets.</li>
                        <li>Counting, aggregations, and histogram-style workloads.</li>
                        <li>Document corpus summarization or extraction with LLM map → reduce.</li>
                        <li>Preprocessing pipelines that benefit from per-record independence.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat, 2004)</li>
                          <li>Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Clusters (Zaharia et al., 2012)</li>
                          <li>Skew handling and speculative execution studies (various, 2010–2016)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Hadoop MapReduce design patterns and tuning guides</li>
                          <li>Spark map/aggregate/reduceByKey best practices</li>
                          <li>LLM map_reduce summarization patterns (LangChain, LlamaIndex)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Apache Hadoop, Apache Spark, Apache Beam</li>
                          <li>Ray, Dask for Python-native distributed compute</li>
                          <li>LangChain (map_reduce), LlamaIndex (tree/summary aggregators)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Apache Hadoop and Spark user/dev mailing lists</li>
                          <li>Ray discourse and Dask community forums</li>
                          <li>LangChain and LlamaIndex community channels</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'scatter-gather' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Scatter-Gather executes parallel fan-out to multiple providers or services, applies per-branch timeouts and
                        budgets, then aggregates, normalizes, and reconciles partial results into a single coherent response. It
                        improves coverage and latency by racing sources, tolerating partial failures, and merging overlapping or
                        conflicting answers with deterministic policies.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📡</div>
                          <div className="text-xs text-gray-400 mb-1">Fan-out</div>
                          <div className="text-sm font-medium text-white">Concurrent requests</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⏱️</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Timeouts & budgets</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧰</div>
                          <div className="text-xs text-gray-400 mb-1">Aggregation</div>
                          <div className="text-sm font-medium text-white">Normalize & merge</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Resilience</div>
                          <div className="text-sm font-medium text-white">Partial results tolerant</div>
                        </div>
                      </div>
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
                        <li>Plan fan-out set: select providers/services and define per-branch SLAs and budgets.</li>
                        <li>Prepare branch prompts/queries with consistent schemas; attach correlation IDs and cancellation tokens.</li>
                        <li>Dispatch concurrently with bounded concurrency; apply per-branch deadlines and retries with jitter.</li>
                        <li>Collect responses and errors as streams; short-circuit on confidence thresholds when applicable.</li>
                        <li>Normalize outputs to a common schema; score sources by trust, freshness, and latency.</li>
                        <li>Reconcile conflicts with deterministic merge policy (e.g., trust-weighted, recency-first, majority vote).</li>
                        <li>De-duplicate overlapping entities; enrich with cached or previously known facts.</li>
                        <li>Compose final result; include provenance and partial-result annotations when relevant.</li>
                        <li>Emit observability: per-branch timings, timeouts, error classes, merge decisions, and quality metrics.</li>
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
                        'Cap parallelism; use bulkheads and per-target rate limits to protect upstreams.',
                        'Set hard timeouts and budgets per branch; prefer hedged requests for tail tolerance.',
                        'Design stable, versioned response schemas; validate at the aggregator boundary.',
                        'Implement deterministic merge rules; log decisions and confidence for auditability.',
                        'Return partial results with provenance rather than failing the whole request.',
                        'Use correlation IDs and structured tracing across all branches.',
                        'Cache invariant sub-queries and hot results; pre-warm for common intents.',
                        'Fail fast on authentication/validation errors; retry only on transient failures with backoff + jitter.',
                        'Continuously evaluate source quality; down-weight noisy or stale providers.',
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
                        <li>Tasks with strong cross-branch dependencies that require sequential coordination.</li>
                        <li>Strict consistency requirements where conflicting sources cannot be reconciled reliably.</li>
                        <li>Ultra-low-latency paths where fan-out overhead exceeds benefit.</li>
                        <li>Highly rate-limited or costly providers where parallel calls would breach quotas or budgets.</li>
                        <li>Single high-quality authoritative source already meets requirements.</li>
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
                        <li>Unbounded fan-out causing thundering herds, timeouts, or quota violations.</li>
                        <li>Inconsistent schemas that break aggregation and downstream assumptions.</li>
                        <li>Letting slowest branches dictate p95 latency due to missing per-branch deadlines.</li>
                        <li>Retry storms without jitter/backoff; cascading failures without circuit breakers.</li>
                        <li>Non-deterministic merge logic undermining reproducibility and evaluation.</li>
                        <li>Missing observability: lack of per-branch metrics, traces, and provenance.</li>
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
                        'Parallel fan-out with bounded concurrency',
                        'Per-branch timeout, budget, and retry policies',
                        'Partial-result tolerance with provenance',
                        'Deterministic merge and de-duplication strategies',
                        'Source weighting by trust, freshness, performance',
                        'Comprehensive tracing, metrics, and logging',
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>p50/p95 end-to-end latency and aggregation window utilization.</li>
                        <li>Completion rate, timeout rate, and partial-result ratio.</li>
                        <li>Merge conflict rate and resolution distribution.</li>
                        <li>Cost per request (tokens, API spend) vs. quality improvement.</li>
                        <li>Source reliability score and contribution weighting over time.</li>
                        <li>Quality metrics: accuracy/recall vs. single-source baseline.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Tokens scale approximately with number of branches × average prompt/response size.</li>
                        <li>Set per-branch token caps; prefer concise prompts and structured responses for merging.</li>
                        <li>Use streaming and early stopping based on confidence thresholds to save tokens.</li>
                        <li>Cache invariant sub-queries; reuse results across sessions to amortize cost.</li>
                        <li>Monitor CPU, memory, and connection pools under peak concurrency.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Microservices orchestration: product search across inventory, pricing, reviews, recommendations.</li>
                        <li>Meta-search and aggregation across multiple external providers/APIs.</li>
                        <li>RAG pipelines querying multiple indices/tools and synthesizing answers.</li>
                        <li>Price comparison, travel planning, and marketplace data federation.</li>
                        <li>Ensemble question answering with diverse specialist models.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Tail at Scale (Dean & Barroso) — latency tail mitigation strategies</li>
                          <li>Hedged and Tied Requests for Reduced Tail Latency (Dean et al.)</li>
                          <li>Enterprise Integration Patterns — Scatter-Gather and Aggregator patterns</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Service resilience: timeouts, retries, circuit breakers, bulkheads</li>
                          <li>Deterministic aggregation and conflict resolution playbooks</li>
                          <li>Observability: distributed tracing, structured logging, SLOs</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Promise.all/asyncio.gather/RxJS forkJoin for concurrency</li>
                          <li>Ray, Celery, Temporal for workflow orchestration</li>
                          <li>LangChain (parallel tool calls), LlamaIndex (multi-retriever, aggregators)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Microservices and SRE communities on tail latency and resilience</li>
                          <li>LLM ops forums on ensemble methods and evaluation</li>
                          <li>Architecture discussions on aggregation patterns and data federation</li>
                        </ul>
                      </div>
                    </div>
                </section>
                </>
              ) : selectedTechnique.id === 'fork-join' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Fork-Join recursively decomposes a problem into independent subtasks (fork), executes them in parallel on a
                        bounded worker pool with work-stealing for load balance, then synchronizes and combines partial results (join)
                        bottom-up. Ideal for divide-and-conquer algorithms where results compose deterministically.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🍴</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Fork → Process → Join</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🌳</div>
                          <div className="text-xs text-gray-400 mb-1">Structure</div>
                          <div className="text-sm font-medium text-white">Task tree (DAG)</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Merge</div>
                          <div className="text-sm font-medium text-white">Deterministic combine</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚖️</div>
                          <div className="text-xs text-gray-400 mb-1">Scheduling</div>
                          <div className="text-sm font-medium text-white">Work-stealing</div>
                        </div>
                      </div>
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
                        <li>Choose a divide-and-conquer strategy and define base case and merge function.</li>
                        <li>Set a granularity threshold (cut-off) where tasks switch to sequential processing.</li>
                        <li>Fork: split input into independent subtasks and submit to a bounded worker pool.</li>
                        <li>Process: execute subtasks in parallel; prefer immutable inputs to avoid shared state.</li>
                        <li>Join: wait for child tasks; deterministically merge partial results bottom-up.</li>
                        <li>Handle timeouts/cancellation; propagate failures with context and fallbacks.</li>
                        <li>Collect metrics (speedup, efficiency) and validate output against invariants.</li>
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
                        'Pick a task size that amortizes scheduling overhead; use an adaptive cut-off (e.g., size ≤ K).',
                        'Use work-stealing pools to minimize idle time and mitigate skew/hotspots.',
                        'Keep child tasks independent; avoid shared mutable state and global locks.',
                        'Make merges associative/commutative when possible to simplify joins and retries.',
                        'Bound parallelism; cap queue depth; apply backpressure under load.',
                        'Prefer immutable inputs and pure functions; copy-on-write for large structures.',
                        'Short-circuit on early termination conditions; propagate cancellation promptly.',
                        'Record provenance of partials for debuggability and test merges with property-based checks.'
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
                        <li>Strong inter-task dependencies or shared evolving state makes joins ill-defined.</li>
                        <li>Very small problem sizes where fork/scheduling overhead dominates compute.</li>
                        <li>Workloads dominated by a single serial bottleneck (Amdahl-limited).</li>
                        <li>Heavy I/O contention on a single resource (disk/network) without parallel lanes.</li>
                        <li>Strict order/causality requirements that conflict with parallel execution.</li>
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
                        <li>Oversplitting into too many tiny tasks → scheduler/queue overhead and GC pressure.</li>
                        <li>Unbalanced partitions causing stragglers; no work-stealing or poor cut-off.</li>
                        <li>Hidden shared state causing contention, deadlocks, or non-deterministic results.</li>
                        <li>Blocking joins on the main/UI thread; missing timeouts and cancellation.</li>
                        <li>Memory blow-up from retaining full intermediates instead of streaming merges.</li>
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
                        'Recursive task decomposition with deterministic merge semantics',
                        'Work-stealing scheduler for dynamic load balancing',
                        'Bounded parallelism with backpressure and queue caps',
                        'Cancellation/timeout-aware joins and failure propagation',
                        'Immutability-first design to minimize contention',
                        'Traceable task tree with provenance for debugging'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Speedup vs. sequential baseline and parallel efficiency (% of ideal).</li>
                        <li>Thread/worker utilization and steal rate; p95 task queue wait.</li>
                        <li>Load imbalance index (p95/p50 task duration) and straggler rate.</li>
                        <li>Join wait time p95/p99 and failure/cancellation propagation latency.</li>
                        <li>Memory/GC overhead from intermediates; tasks created per unit of work.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>In LLM workflows, tokens scale with fan-out breadth × per-branch context; cap concurrency.</li>
                        <li>Prefer small/fast models for leaf subtasks; reserve strongest model for the final merge.</li>
                        <li>Pass distilled context to children (IDs/summaries) rather than full transcripts.</li>
                        <li>Cache stable sub-results; reuse intermediates to amortize cost across runs.</li>
                        <li>Monitor CPU, memory, and queue depths; apply backpressure and adaptive cut-offs.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Parallel sorting/search (merge sort, quicksort, k-ary search trees).</li>
                        <li>Divide-and-conquer math (FFT, Strassen-like block ops, parallel reductions).</li>
                        <li>Graph/tree traversals and hierarchical computations.</li>
                        <li>Batch document or chunk processing with deterministic synthesis/merge.</li>
                        <li>Simulation/Monte Carlo tasks with independent trials and aggregate metrics.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Cilk and Work-Stealing Scheduling (Blumofe & Leiserson, 1999)</li>
                          <li>The Java Fork/Join Framework (Lea, 2000–2011)</li>
                          <li>Parallelism in Practice: Amdahl and Gustafson considerations</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Java `ForkJoinPool` design and tuning (common pool vs. custom pools)</li>
                          <li>.NET Task Parallel Library: Parallel.Invoke/Tasks with work-stealing schedulers</li>
                          <li>Python `concurrent.futures` and `multiprocessing` pools with chunking</li>
                          <li>Ray/Dask: task graphs with actor pools and backpressure</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Java Fork/Join, Cilk/TBB, OpenMP tasks</li>
                          <li>Python Ray, Dask; Node.js Promise.all/RxJS forkJoin</li>
                          <li>Workflow engines: Temporal, Airflow (task DAGs)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Java Concurrency in Practice and Fork/Join tuning threads</li>
                          <li>Ray, Dask, and concurrency forums on task granularity and scheduling</li>
                          <li>StackOverflow Q&A on deadlocks, work-stealing, and join barriers</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'async-await' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Async-await provides non-blocking concurrency by suspending a task at await points while the runtime progresses
                        other work. It builds on promises/futures to coordinate multiple I/O-bound operations with linear, readable flow
                        and structured error handling across languages (JavaScript/TypeScript, Python asyncio, Rust tokio, C#/.NET).
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⏳</div>
                          <div className="text-xs text-gray-400 mb-1">Execution</div>
                          <div className="text-sm font-medium text-white">Non-blocking awaits</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🤝</div>
                          <div className="text-xs text-gray-400 mb-1">Coordination</div>
                          <div className="text-sm font-medium text-white">Promise/Future based</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧵</div>
                          <div className="text-xs text-gray-400 mb-1">Model</div>
                          <div className="text-sm font-medium text-white">Event loop + tasks</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Errors</div>
                          <div className="text-sm font-medium text-white">try/catch semantics</div>
                        </div>
                      </div>
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
                        <li>Define async function boundaries; ensure callers are async-capable.</li>
                        <li>Wrap I/O or long-running operations as promises/futures or async coroutines.</li>
                        <li>Compose concurrency via Promise.all/Task.WhenAll/asyncio.gather/join handles.</li>
                        <li>Propagate and handle errors with try/catch and per-branch guards.</li>
                        <li>Apply timeouts, cancellation tokens, and resource limits.</li>
                        <li>Aggregate results, normalize types, and return a single awaited value.</li>
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
                        'Prefer await for readability; fan-out using Promise.all/gather for independent I/O.',
                        'Always bound concurrency (p-limit, semaphores, pools) to protect services.',
                        'Use timeouts and cancellation (AbortController/.NET CancellationToken/asyncio timeouts).',
                        'Isolate retries and fallbacks; never wrap large batches in a single try/catch.',
                        'Surface partial results with Promise.allSettled/gather(return_exceptions=True).',
                        'Avoid blocking calls in async contexts; keep CPU work off the event loop.',
                        'Propagate structured errors; enrich with context and correlation IDs.',
                        'Log p50/p95 latencies and error categories; add backoff for transient failures.'
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
                        <li>CPU-bound workloads without offloading threads/workers — use worker pools instead.</li>
                        <li>Tight low-latency loops where scheduling overhead dominates.</li>
                        <li>Global ordering/causality requirements that conflict with concurrent execution.</li>
                        <li>Heavy shared-state mutation leading to contention; prefer message passing.</li>
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
                        <li>Unbounded parallel awaits → throttling, rate-limit errors, or service overload.</li>
                        <li>Swallowing exceptions inside Promise.all causing silent partial failures.</li>
                        <li>Blocking synchronous APIs inside async code (e.g., fs.readFileSync / CPU loops).</li>
                        <li>Leaking tasks on timeout/cancel; not wiring cancellation to in-flight I/O.</li>
                        <li>Deadlocks from awaiting in wrong context (legacy sync-over-async patterns).</li>
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
                        'Linear syntax over async control flow (try/catch/finally).',
                        'Promise/future composition: all, allSettled, race, any; gather/join.',
                        'Cancellation & timeouts with tokens, signals, or scopes.',
                        'Non-blocking I/O with event loop or reactor-based runtimes.',
                        'Backpressure via pools/semaphores; bounded concurrency.',
                        'Cross-language availability: JS/TS, Python, C#, Rust, Swift.'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>End-to-end latency (p50/p95/p99) and tail amplification under concurrency.</li>
                        <li>Throughput (req/s) vs. concurrency level; success/error rate per class.</li>
                        <li>Queue depth and time-in-queue; timeout/cancellation ratio.</li>
                        <li>External rate-limit/backoff events; retry success vs. cost.</li>
                        <li>Resource usage: CPU, memory, open file/socket descriptors.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-2 text-sm text-gray-300">
                      <p>Async-await itself doesn’t consume model tokens; it manages concurrency. In LLM workflows, tokens scale with the number of parallel model calls and context size.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Bound parallel LLM calls to avoid burst token spikes and rate limits.</li>
                        <li>Use streaming or pagination to cap memory; avoid retaining full responses.</li>
                        <li>Prefer shared references/IDs over duplicating large prompts across tasks.</li>
                        <li>Apply per-call budgets, backoff, and caching to amortize repeated queries.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Concurrent API/data fetches for dashboards or orchestration.</li>
                        <li>Fan-out I/O tasks with independent results and aggregation.</li>
                        <li>LLM tool calls executed in parallel with bounded concurrency.</li>
                        <li>Background task runners that compose timeouts and cancellation.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Communicating Sequential Processes (Hoare, 1978)</li>
                          <li>Structured Concurrency principles (Klabnik et al., community writings)</li>
                          <li>Actor model and async scheduling references</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li><a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await">MDN: Async/Await</a></li>
                          <li><a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer" href="https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/async/">.NET C#: async/await</a></li>
                          <li><a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer" href="https://docs.python.org/3/library/asyncio-task.html">Python asyncio: Tasks & gather</a></li>
                          <li><a className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer" href="https://rust-lang.github.io/async-book/">Rust Async Book</a></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>JavaScript/TypeScript: p-limit, Bluebird utilities, RxJS interop</li>
                          <li>Python: Trio, AnyIO, aiohttp, tenacity (retries)</li>
                          <li>Rust: tokio, async-std, futures, reqwest</li>
                          <li>.NET: Task Parallel Library, Polly (retries), IAsyncEnumerable</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>StackOverflow: async/await best practices and pitfalls</li>
                          <li>Rust Async Working Group notes and Zulip discussions</li>
                          <li>Python asyncio and Trio discourse forums</li>
                          <li>Node.js community notes on event loop and performance</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'content-based-routing' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Content-Based Routing inspects the payload itself (text, code, structured data, or media metadata) to
                        classify intent/topic and select a specialized handler or path. The router can be rule-based, embeddings +
                        classifier, or a lightweight LLM gate. Decisions should include confidence, rationale, and a safe default.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔀</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Route by content</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Policy</div>
                          <div className="text-sm font-medium text-white">Rules/Embeddings/LLM gate</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧬</div>
                          <div className="text-xs text-gray-400 mb-1">Modality</div>
                          <div className="text-sm font-medium text-white">Text/Code/Data/Media</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📉</div>
                          <div className="text-xs text-gray-400 mb-1">Confidence</div>
                          <div className="text-sm font-medium text-white">Thresholds & fallback</div>
                        </div>
                      </div>
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
                        <li>Define taxonomy and handlers (e.g., Text, Code, Data, Media) with consistent I/O contracts.</li>
                        <li>Extract routing features: modality detection, keywords, entities, embeddings, metadata, risk/sensitivity.</li>
                        <li>Select policy: rules, embedding similarity + thresholds, classical classifier, or small LLM gate.</li>
                        <li>Calibrate confidence per class; set thresholds and a safe default route.</li>
                        <li>Make decision; on low confidence, default/hold for review. Optionally shadow top-2 for evaluation.</li>
                        <li>Execute handler pipeline; validate outputs against schema; normalize for downstream.</li>
                        <li>Log features, decision, confidence, and outcomes for audit, drift, and continuous evaluation.</li>
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
                        'Start with a clear taxonomy; avoid overlapping categories and document examples per class',
                        'Prefer lightweight policies (rules/embeddings/small model) to minimize latency and cost',
                        'Calibrate thresholds by class; measure precision/recall and misroute costs explicitly',
                        'Always provide a safe default route and human-in-the-loop for ambiguous/high-risk items',
                        'Standardize schemas across handlers so results are comparable and mergeable',
                        'Cache invariant features (embeddings, metadata) and reuse across requests',
                        'Continuously evaluate with labeled sets; monitor drift and re-tune thresholds',
                        'Log rationale/features for explainability and compliance audits'
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
                        <li>Homogeneous workloads where one well-tuned path suffices.</li>
                        <li>Ultra-low latency constraints that cannot afford routing overhead.</li>
                        <li>No labeled data or feedback loop to calibrate/evaluate routing quality.</li>
                        <li>High regulatory risk without explainability, logging, and fallback procedures.</li>
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
                        <li>Overlapping/ambiguous classes causing unstable decisions and thrashing.</li>
                        <li>Uncalibrated thresholds leading to high misroute rates.</li>
                        <li>Brittle regex/rules that break on phrasing or multilingual inputs.</li>
                        <li>Schema sprawl across handlers; difficult to aggregate and evaluate.</li>
                        <li>Ignoring drift; performance degrades as content distribution shifts.</li>
                        <li>Routing on full documents instead of distilled signals → token/cost bloat.</li>
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
                        'Automatic modality and intent/topic classification',
                        'Embeddings-based similarity with class exemplars',
                        'Confidence scoring, thresholds, and safe defaults',
                        'Pluggable policies: rules, ML classifiers, or LLM gate',
                        'Explainability via features/rationale logging',
                        'Standardized I/O contracts across handlers',
                        'Drift detection and periodic re-calibration',
                        'Optional shadow routing for evaluation'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Routing accuracy/precision/recall by class; misroute rate.</li>
                        <li>Confusion matrix stability and top-2 agreement rate.</li>
                        <li>Handler success/quality and downstream task completion.</li>
                        <li>Routing latency overhead (P50/P95) and throughput.</li>
                        <li>Cost per routed item and savings vs. single-path baseline.</li>
                        <li>Low-confidence/default rate and human override rate.</li>
                        <li>Drift indicators (feature/class distribution shifts).</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Total ≈ router tokens + handler pipeline tokens; keep router lightweight.</li>
                        <li>Prefer rules or embeddings + small model; reserve strongest models for handlers.</li>
                        <li>Batch classification; cache embeddings and invariant features.</li>
                        <li>Route using distilled signals (summaries, IDs) rather than raw documents.</li>
                        <li>Reuse retrievals and pre/post-processing across handlers when possible.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Customer support email/chat triage to specialized queues.</li>
                        <li>Content moderation and policy-specific escalation.</li>
                        <li>Document processing: invoices vs. contracts vs. forms.</li>
                        <li>Code vs. natural language vs. data pipeline routing.</li>
                        <li>Query type detection for RAG/agent selection.</li>
                        <li>Media workflows based on metadata and transcripts.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Enterprise Integration Patterns: Content-Based Router (Hohpe & Woolf, 2003)</li>
                          <li>Routing Networks for Multi-Task Learning (Rosenbaum et al., 2017)</li>
                          <li>Mixture-of-Experts and gating for conditional computation (Shazeer et al., 2017; Fedus et al., 2021)</li>
                          <li>Routing/skill selection in LLM systems and Mixture-of-Agents (2023–2024)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Enterprise Integration Patterns: Content-Based Router</li>
                          <li>AWS SNS/SQS message filtering and routing patterns</li>
                          <li>Kafka Streams/KSQL content-based routing examples</li>
                          <li>LangGraph decision routers and conditional edges</li>
                          <li>LangChain RouterChain / MultiPromptRouter patterns</li>
                          <li>LlamaIndex RouterQueryEngine / selector components</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph, LangChain, LlamaIndex routing components</li>
                          <li>Kafka, RabbitMQ, NATS for message routing</li>
                          <li>JSONLogic, JSONPath/JMESPath for rule evaluation</li>
                          <li>Vector DBs and embedding services for similarity</li>
                          <li>Feature stores and evaluators (MLflow, Evidently)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Enterprise Integration Patterns community resources</li>
                          <li>Cloud provider architecture blogs on routing</li>
                          <li>Kafka and streaming communities (meetups, forums)</li>
                          <li>LangChain/LangGraph forums and OSS discussions</li>
                          <li>MLOps communities on evaluation and drift</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'dynamic-routing' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Dynamic Routing analyzes the input, user/context, and system state to select the best processing path at runtime. 
                        A router (rules, feature scorer/classifier, or a lightweight LLM gate) produces a route decision with confidence, 
                        optional alternatives, and a safe default. Policies can adapt to budgets, SLAs, and drift.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔀</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Route to optimal path</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Policy</div>
                          <div className="text-sm font-medium text-white">Rules/ML/LLM gate</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📉</div>
                          <div className="text-xs text-gray-400 mb-1">Confidence</div>
                          <div className="text-sm font-medium text-white">Thresholds & fallback</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚙️</div>
                          <div className="text-xs text-gray-400 mb-1">Adaptation</div>
                          <div className="text-sm font-medium text-white">Budgets & drift-aware</div>
                        </div>
                      </div>
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
                        <li>Define routing objectives, candidate paths, and consistent I/O contracts per path.</li>
                        <li>Extract routing features (content type, complexity, user profile, channel, recency, budget/SLA, risk).</li>
                        <li>Score paths with a policy (rules, classifier, small LLM gate); compute confidence.</li>
                        <li>Select path; if low confidence, use safe default or fallback. Optionally shadow top-2 for evaluation.</li>
                        <li>Execute selected branch; validate outputs against schema; optionally merge if multiple were explored.</li>
                        <li>Log features, decision, confidence, and per-branch metrics for monitoring/audit.</li>
                        <li>Periodically evaluate, recalibrate thresholds, and update policy using labeled or feedback data.</li>
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
                        'Decouple router policy from branch implementations; version and A/B test independently',
                        'Standardize schemas across branches; keep inputs/outputs compatible for optional merging',
                        'Calibrate confidence; set thresholds and always provide a safe default route',
                        'Prefer lightweight policies (rules/small model) to minimize router latency and cost',
                        'Apply budgets and backpressure; cap exploration and avoid thrashing between paths',
                        'Enable shadow mode before full rollout; log features/decisions for audit and drift detection',
                        'Cache invariant artifacts (retrievals, profiles) and reuse across runs',
                        'Introduce human-in-the-loop for high-stakes or low-confidence cases'
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
                        <li>Homogeneous tasks where a single well-tuned path suffices.</li>
                        <li>Very small workloads where router overhead outweighs benefits.</li>
                        <li>Hard real-time ultra-low latency contexts that cannot afford routing/gating.</li>
                        <li>Insufficient data to calibrate/evaluate routing reliability.</li>
                        <li>Safety-critical scenarios without rigorous evaluation and fallback procedures.</li>
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
                        <li>Overfitted router prompts/policies that don’t generalize; unstable decisions.</li>
                        <li>Inconsistent schemas between branches leading to brittle integrations.</li>
                        <li>Missing default/fallback path causing drops or poor UX on low confidence.</li>
                        <li>Exploring multiple branches in production without caps → cost spikes.</li>
                        <li>Thrashing between paths due to jittery thresholds or poorly chosen features.</li>
                        <li>Insufficient logging and no drift detection; hard to audit or improve.</li>
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
                        'Context-aware, multi-criteria decision logic',
                        'Confidence scoring, thresholds, and safe default fallback',
                        'Top-k/shadow routing and staged rollouts',
                        'Budget/SLA-aware path selection',
                        'Pluggable policies: rules, ML classifiers, or LLM gate',
                        'Decision logging, explainability, and audit trails',
                        'Drift detection and online calibration',
                        'Optional merge/rejoin after specialized branches'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Routing accuracy vs. oracle/evaluator; misroute rate.</li>
                        <li>Calibration quality (ECE/Brier score); threshold precision/recall.</li>
                        <li>Fallback/default rate and low-confidence frequency.</li>
                        <li>Per-branch success/quality and user satisfaction.</li>
                        <li>Cost per task and savings vs. single-path baseline.</li>
                        <li>Routing latency overhead (P50/P95) and tail behavior.</li>
                        <li>Drift indicators (feature/decision distribution shifts); re-route/override rate.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Total ≈ router tokens + selected-branch tokens (+ optional shadow/merge).</li>
                        <li>Prefer rules or a small model for routing; reserve strongest models for branches.</li>
                        <li>Cache precomputed features and invariant artifacts; pass distilled context, not full transcripts.</li>
                        <li>Avoid top-k exploration in production; use sampling/shadow for evaluation only.</li>
                        <li>Apply backpressure and per-run budgets; cap retries and exploration.</li>
                        <li>Batch where possible and deduplicate prompts; share context by ID/reference.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Customer support triage across intents/severity to specialized agents.</li>
                        <li>Personalization by audience/channel/tone with targeted prompt paths.</li>
                        <li>Knowledge workflows choosing retrieval-heavy vs. expert synthesis paths.</li>
                        <li>Quality gating: route to evaluator/refiner only when needed.</li>
                        <li>Tool/agent selection and delegation based on task capability fit.</li>
                        <li>Cost-aware model selection (small vs. large model gating).</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Switch Transformers / Mixture-of-Experts routing</li>
                          <li>Routing Transformers and attention routing variants</li>
                          <li>LLM Router/Gating for MoE and Mixture-of-Agents (2023–2024)</li>
                          <li>Calibration and confidence estimation for decision systems</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph decision routers and conditional edges</li>
                          <li>LangChain router chains and LLMRouter patterns</li>
                          <li>LlamaIndex decision routers and selectors</li>
                          <li>DSPy gating and evaluator-driven policies</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph, LangChain, LlamaIndex routing components</li>
                          <li>Feature stores and evaluators (MLflow, Evidently) for calibration</li>
                          <li>Rule engines (JSONLogic, Semgrep-like policies) for lightweight routing</li>
                          <li>Workflow orchestrators (Temporal, Ray) with gating hooks</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Papers with Code collections on MoE and routing</li>
                          <li>Open-source forums on LLM systems and LangGraph communities</li>
                          <li>LLM ops communities on evaluation, calibration, and drift</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'dynamic-context-assembly' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Dynamic Context Assembly composes the optimal context window at runtime by analyzing the query,
                        scoring candidate sources (relevance, quality, freshness, diversity, risk), allocating a token budget
                        across sources, and assembling a deduplicated, compressed, and ordered context for generation.
                        The assembly adapts during generation using utilization signals and feedback.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Analysis</div>
                          <div className="text-sm font-medium text-white">Intent & domain detection</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📊</div>
                          <div className="text-xs text-gray-400 mb-1">Scoring</div>
                          <div className="text-sm font-medium text-white">Relevance × quality × freshness</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧱</div>
                          <div className="text-xs text-gray-400 mb-1">Budgeting</div>
                          <div className="text-sm font-medium text-white">Token allocation per source</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧹</div>
                          <div className="text-xs text-gray-400 mb-1">Normalization</div>
                          <div className="text-sm font-medium text-white">Dedup + compression + ordering</div>
                        </div>
                      </div>
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
                        <li>Parse query for domains, intent, complexity, time-sensitivity, and constraints.</li>
                        <li>Enumerate candidate sources (KB, vector DB, docs, APIs, logs) with metadata and costs.</li>
                        <li>Score candidates on relevance, quality, freshness, coverage, risk; calibrate scores.</li>
                        <li>Allocate token budget across sources; set per-source caps and ordering policy.</li>
                        <li>Retrieve top chunks; deduplicate semantically; compress while preserving salience.</li>
                        <li>Assemble context with clear sectioning and provenance; include task-specific hints.</li>
                        <li>Generate; monitor utilization and citations; adapt weights or re-pull on gaps.</li>
                        <li>Log features, decisions, budgets, and outcomes; feed back to improve scoring.</li>
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
                        'Maintain a typed source registry with SLAs, costs, freshness, and compliance tags.',
                        'Use calibrated scorers (BM25/embedding + rerankers) and combine with quality/freshness weights.',
                        'Budget first: decide token allocation and per-source caps before retrieval.',
                        'Normalize: deduplicate semantically, remove boilerplate, and compress with salience-aware summaries.',
                        'Keep provenance (source, chunk id, timestamp) and surface citations in outputs.',
                        'Cache frequent queries and intermediate retrievals; invalidate with freshness rules.',
                        'Introduce diversity constraints to avoid near-duplicate evidence; prefer complementary sources.',
                        'Guardrails: PII/compliance filters pre- and post-assembly; enforce allow/deny by region/role.',
                        'Online evaluation loop using labeled queries and rubric-based graders; close the feedback cycle.',
                        'Shadow new assembly policies before rollout; compare cost/quality vs. current baseline.'
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
                        <li>Simple, single-source tasks where retrieval + direct prompting suffices.</li>
                        <li>Strict real-time constraints that cannot afford retrieval and reranking overhead.</li>
                        <li>Scenarios with tight compliance boundaries prohibiting cross-source mixing.</li>
                        <li>When high determinism is required and dynamic inputs may reduce reproducibility.</li>
                        <li>Very small contexts where assembly overhead outweighs benefit.</li>
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
                        <li>Overfilling the window with redundant or low-salience chunks (“context stuffing”).</li>
                        <li>Ignoring deduplication and normalization → diluted signals and higher cost.</li>
                        <li>Using stale content due to missing freshness policies or cache invalidation.</li>
                        <li>Uncalibrated scores; heavy reliance on a single similarity metric.</li>
                        <li>No provenance or citations; harder to audit, recover, or debug hallucinations.</li>
                        <li>Unbounded token growth without strict per-source caps and global budgets.</li>
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
                        'Multi-source fusion with calibrated relevance/quality/freshness weighting',
                        'Budgeted token allocation and ordering policy',
                        'Semantic deduplication, normalization, and compression',
                        'Adaptive assembly with utilization feedback during generation',
                        'Caching, prewarming, and freshness-aware invalidation',
                        'Provenance, citations, and explainable assembly rationale',
                        'Compliance and safety filtering pre/post assembly'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Relevance coverage and answer quality vs. evaluator/oracle.</li>
                        <li>Source utilization efficiency and marginal benefit per token.</li>
                        <li>Novelty/diversity score; reduction in redundancy.</li>
                        <li>Token efficiency (quality per 1K tokens) and total cost per answer.</li>
                        <li>Latency overhead of assembly (P50/P95) and generation completion rate.</li>
                        <li>Hallucination rate and citation accuracy/consistency.</li>
                        <li>Freshness adherence and SLA compliance for time-sensitive queries.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Total ≈ query analysis + scoring + retrieval + assembled context + generation.</li>
                        <li>Use small, fast models for scoring/reranking; reserve large models for generation.</li>
                        <li>Set strict per-source caps and global budgets; prefer compression over dropping sources.</li>
                        <li>Exploit caching and prefetch for hot queries; stream retrieval to overlap with scoring.</li>
                        <li>Prefer rerankers to reduce k before assembly; adjust chunk size for salience density.</li>
                        <li>Throttle concurrency and apply backpressure; avoid explosive fan-out across sources.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Multi-domain question answering and enterprise knowledge synthesis.</li>
                        <li>Research assistants comparing papers, standards, and reports across sources.</li>
                        <li>Analyst copilots needing balanced evidence and citations.</li>
                        <li>Customer support with product docs, tickets, and policy KBs.</li>
                        <li>Compliance/policy answering requiring provenance and freshness.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Retrieval-Augmented Generation (Lewis et al., 2020)</li>
                          <li>Self-RAG and feedback-aware retrieval (Asai et al., 2023)</li>
                          <li>HyDE: Hypothetical Document Embeddings (Gao et al., 2022)</li>
                          <li>Fusion-in-Decoder and reranking techniques for open-domain QA</li>
                          <li>Mixture-of-Experts routing and gating for conditional computation</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Multi-source RAG orchestration and context assembly patterns</li>
                          <li>LangGraph/LangChain routing + RAG pipelines with rerankers</li>
                          <li>LlamaIndex QueryEngine + Node PostProcessors for compression</li>
                          <li>DSPy pipelines with retrieval, rerank, and adaptive prompting</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph, LangChain, LlamaIndex, DSPy, Haystack</li>
                          <li>Vector DBs: FAISS, Pinecone, Weaviate, Milvus, Vectara</li>
                          <li>Rerankers: Cohere Rerank, ColBERT, cross-encoders</li>
                          <li>Compression: token/semantic compressors and TL;DR summarizers</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>RAG surveys and best practices (2023–2025)</li>
                          <li>LlamaIndex and LangChain community forums</li>
                          <li>LLM ops groups on evaluation, routing, and context optimization</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'capability-routing' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Capability Routing assigns each task to the best-suited agent or compute node using a capability model
                        (skills, tools, models, hardware) and live performance/availability signals. A router computes a
                        multi-objective score (fit × quality × cost × SLA) and selects the assignee with safe fallbacks.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="text-xs text-gray-400 mb-1">Matching</div>
                          <div className="text-sm font-medium text-white">Skills ⇄ Task requirements</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Scoring</div>
                          <div className="text-sm font-medium text-white">Multi-objective (quality/cost/SLA)</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="text-xs text-gray-400 mb-1">Signals</div>
                          <div className="text-sm font-medium text-white">Utilization & availability aware</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Safety</div>
                          <div className="text-sm font-medium text-white">Fallbacks & guardrails</div>
                        </div>
                      </div>
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
                        <li>Define capability schema (skills/tools/models/hardware) with levels and recency.</li>
                        <li>Extract task requirements (domain, modality, complexity, SLA, risk) into structured features.</li>
                        <li>Score candidates using a weighted function (capability fit × historical quality × freshness).</li>
                        <li>Apply live signals: utilization, queue length, health, cost, and data locality/compliance.</li>
                        <li>Select primary assignee; set fallback/backup; emit rationale and confidence.</li>
                        <li>Execute; validate outputs with schema/rubric; auto-escalate on failure or low score.</li>
                        <li>Log decisions and outcomes; update capability profiles and weights via feedback.</li>
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
                        'Maintain a normalized skill matrix with evidence (evaluations, recency, provenance).',
                        'Use multi-objective scoring with explicit weights for quality, cost, latency, and risk.',
                        'Continuously calibrate using labeled tasks and post-task evaluations; retrain weights periodically.',
                        'Incorporate availability/utilization to prevent hotspots and reduce queue time.',
                        'Provide a safe default/fallback and escalation policy; avoid dead-ends.',
                        'Version capability profiles; expire stale skills and penalize outdated evidence.',
                        'Isolate sensitive tasks with compliance constraints (geo, PII, model policy).',
                        'Log features, rationale, confidence, and outcomes for audit and drift detection.'
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
                        <li>Uniform tasks where a single well-tuned path performs consistently well.</li>
                        <li>No reliable capability metadata or evaluation history to inform matching.</li>
                        <li>Very small teams/systems where manual routing is simpler and cheaper.</li>
                        <li>Hard real-time micro-latency contexts where scoring overhead is unacceptable.</li>
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
                        <li>Stale capability profiles; skills drift without decay/recency tracking.</li>
                        <li>Ignoring utilization causing hotspots, starvation, or thrashing.</li>
                        <li>Opaque scoring; no rationale/confidence, hard to debug misroutes.</li>
                        <li>Bias in assignments (e.g., always routing “hard” tasks to the same agents) without fairness guards.</li>
                        <li>No safe fallback or escalation, leading to dropped or stuck tasks.</li>
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
                        'Structured skill/capability matrix with levels and evidence',
                        'Multi-objective matching: quality, cost, latency, risk',
                        'Utilization-, health-, and queue-aware routing',
                        'Compliance-aware constraints (region, policy, data class)',
                        'Rationale and confidence per decision',
                        'Learning loop from outcomes and evaluator scores',
                        'Shadow/AB routing for evaluation before rollout',
                        'Fairness and anti-starvation safeguards'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Assignment accuracy vs. oracle/evaluator; misroute rate.</li>
                        <li>Task success/quality score deltas by assignee type.</li>
                        <li>Latency impact: routing overhead and end-to-end P50/P95.</li>
                        <li>Cost per task vs. baseline; cost-to-quality efficiency.</li>
                        <li>Utilization balance and queue times; starvation rate.</li>
                        <li>Fallback/escalation frequency and recovery time.</li>
                        <li>Fairness metrics: workload distribution, diversity of assignments.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Keep router light: rules or small model; avoid large-model gating on hot paths.</li>
                        <li>Cache capability vectors/scores; update incrementally on events, not per-request recompute.</li>
                        <li>Pass distilled features or IDs to router; avoid full transcripts/documents.</li>
                        <li>Batch scoring where feasible; reuse embeddings and invariant features.</li>
                        <li>Monitor router token share vs. task tokens; cap exploration/shadow cost.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Customer support routing to domain specialists (billing, tech, legal).</li>
                        <li>Code tasks matched to language/framework experts or tools.</li>
                        <li>ML/compute workloads mapped to optimal hardware (GPU, CPU, memory-optimized, edge).</li>
                        <li>Document/data processing assigned to OCR, NLP, or analytics specialists.</li>
                        <li>Compliance-sensitive flows routed to approved regions/models.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Mixture-of-Experts and router/gating (Switch Transformers; GShard; GLaM)</li>
                          <li>Routing Transformers and conditional computation</li>
                          <li>Mixture-of-Agents and skill routing for LLM systems (2023–2024)</li>
                          <li>Scheduling and assignment under constraints (multi-objective optimization)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph decision routers, selectors, and conditional edges</li>
                          <li>LangChain RouterChain / MultiPromptRouter</li>
                          <li>LlamaIndex RouterQueryEngine / agent selectors</li>
                          <li>Scheduling with Kubernetes queues/priority and autoscaling hooks</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>LangGraph, LangChain, LlamaIndex routing components</li>
                          <li>Feature stores and evaluators (MLflow, Evidently) for calibration</li>
                          <li>Workflow/scheduling: Temporal, Airflow, Ray, Kubernetes</li>
                          <li>Rule engines (JSONLogic) and vector DBs for similarity matching</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Papers with Code collections on MoE and routing</li>
                          <li>Open-source forums for multi-agent systems and orchestration</li>
                          <li>MLOps and platform engineering communities on scheduling/SLAs</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'load-balancing' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Load Balancing continuously distributes incoming requests across a pool of workers based on live signals
                        such as utilization, queue length, health, latency, error rate, and cost. It selects a routing strategy
                        (e.g., round-robin, least-loaded, weighted, power-of-two choices, consistent hashing) and enforces
                        backpressure, retries with jitter, circuit breakers, and graceful draining for resilient traffic shaping.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚖️</div>
                          <div className="text-xs text-gray-400 mb-1">Goal</div>
                          <div className="text-sm font-medium text-white">Even distribution & SLOs</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📊</div>
                          <div className="text-xs text-gray-400 mb-1">Signals</div>
                          <div className="text-sm font-medium text-white">Utilization, queues, health</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧮</div>
                          <div className="text-xs text-gray-400 mb-1">Strategy</div>
                          <div className="text-sm font-medium text-white">Least-load, P2C, weighted</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Resilience</div>
                          <div className="text-sm font-medium text-white">Retries, CBs, shedding</div>
                        </div>
                      </div>
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
                        <li>Ingest request with metadata (tenant, affinity key, SLA, size).</li>
                        <li>Fetch live signals: health, utilization, queue depth, recent latency/error rates.</li>
                        <li>Classify workload if needed (CPU/GPU/IO heavy; stateful vs stateless; stickiness).</li>
                        <li>Select strategy and candidate pool (filters by capability/region/policy).</li>
                        <li>Choose target: least-loaded or power-of-two sampling; respect weights and stickiness.</li>
                        <li>Enforce backpressure: queue caps, request shedding, timeouts, and hedged requests if appropriate.</li>
                        <li>Monitor execution; retry with jitter on safe/idempotent operations; avoid retry storms.</li>
                        <li>Continuously rebalance and scale: slow-start new nodes; drain unhealthy nodes gracefully.</li>
                        <li>Emit metrics, traces, and decision rationale for observability and tuning.</li>
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
                        'Prefer power-of-two choices or least-loaded over naive round-robin for hot-spot avoidance.',
                        'Use active + passive health checks; treat signals as stale quickly and decay aggressively.',
                        'Implement backpressure: bounded queues, request shedding, and circuit breakers.',
                        'Apply retries with jitter and caps; only retry idempotent operations.',
                        'Enable slow-start/warmup for new nodes to prevent instant saturation.',
                        'Align autoscaling signals with balancing signals (utilization, queue time, P95 latency).',
                        'Use sticky sessions only when necessary; bound stickiness duration to avoid hotspots.',
                        'Segment pools by capability/region/compliance; use consistent hashing for cache locality.',
                        'Continuously watch tails (P95/P99); optimize for tail at scale, not just averages.',
                        'Record decision features and outcomes; run shadow/AB routing to validate changes.'
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
                        <li>Single-worker or trivially small deployments where static routing is simpler.</li>
                        <li>Strong state affinity without session persistence; prefer capability/state routing.</li>
                        <li>Strictly ordered or transactional workflows that require in-order processing.</li>
                        <li>Offline batch pipelines where a scheduler is more appropriate than online balancing.</li>
                        <li>Regulatory/data-locality constraints that dominate over distribution fairness.</li>
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
                        <li>Optimizing for averages while P99 latency breaches SLAs (tail blindness).</li>
                        <li>Thrashing due to over-reactive rebalancing or stale health metrics.</li>
                        <li>Unbounded retries creating retry storms and cascading failures.</li>
                        <li>Sticky sessions pinning traffic to unhealthy nodes causing hotspots.</li>
                        <li>No slow-start; instantly flooding newly scaled instances.</li>
                        <li>Inconsistent hashing keys causing poor cache locality or skew.</li>
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
                        'Real-time health and utilization aware routing',
                        'Weighted policies, least-connections/latency, power-of-two choices',
                        'Sticky sessions and consistent hashing for cache/data locality',
                        'Backpressure: bounded queues, shedding, circuit breakers',
                        'Slow-start, graceful drain, and autoscaling integration',
                        'Observability: decision logs, traces, and SLO dashboards'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Latency: P50/P95/P99 end-to-end and per-tier.</li>
                        <li>Throughput and saturation point at target SLOs.</li>
                        <li>Error rate and retry rate; circuit-breaker open frequency.</li>
                        <li>Utilization balance: standard deviation across nodes/pools.</li>
                        <li>Queue wait time and shed/drop rate under load.</li>
                        <li>Failover time to recovery and success of hedged requests.</li>
                        <li>Cost per request vs. baseline; scale event efficiency.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Keep the router lightweight. Prefer metrics/rules or small models for gating. Avoid passing full payloads through the router; use IDs/features.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Batch and sample health signals; bound telemetry cost with histograms/sketches.</li>
                        <li>Cache node stats; refresh on intervals/events rather than per-request.</li>
                        <li>Use consistent keys for stickiness; cap session duration and memory overhead.</li>
                        <li>Record minimal decision features for analytics; ship full traces only on sampled requests.</li>
                        <li>In AI inference, route with cheap heuristics; reserve strong models for execution, not gating.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>High-traffic APIs and microservices with variable load.</li>
                        <li>Multi-model inference and GPU/CPU pools (Ray Serve, vLLM, Triton, KServe).</li>
                        <li>Background job processing across workers (Celery, Sidekiq, Arq, RQ).</li>
                        <li>Event streaming consumers with partition rebalancing.</li>
                        <li>Multi-region/zone deployments with zone-aware balancing.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li><a href="https://research.google/pubs/pub40801/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Tail at Scale (Dean & Barroso, 2013)</a></li>
                          <li><a href="https://www.eecs.harvard.edu/~michaelm/NEWWORK/postscripts/handbook2001.pdf" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">The Power of Two Choices in Randomized Load Balancing</a></li>
                          <li><a href="https://research.google/pubs/pub44824/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Maglev: A Fast and Reliable Software Network Load Balancer (2016)</a></li>
                          <li><a href="https://dl.acm.org/doi/10.1145/258533.258660" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Consistent Hashing and Random Trees (Karger et al., 1997)</a></li>
                          <li><a href="https://dl.acm.org/doi/10.1145/1101779.1101781" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Join-Shortest-Queue with Limited Sampling</a></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li><a href="https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NGINX: HTTP Load Balancing</a></li>
                          <li><a href="https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/overview" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Envoy: Load Balancing Overview</a></li>
                          <li><a href="https://www.haproxy.com/documentation/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">HAProxy: Configuration & Tuning Guide</a></li>
                          <li><a href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes: Services and Load Balancing</a></li>
                          <li><a href="https://istio.io/latest/docs/tasks/traffic-management/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Istio: Traffic Management</a></li>
                          <li><a href="https://docs.ray.io/en/latest/serve/index.html" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Ray Serve: Scalable Model Serving</a></li>
                          <li><a href="https://docs.vllm.ai/en/latest/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">vLLM: High-throughput LLM Serving</a></li>
                          <li><a href="https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">NVIDIA Triton Inference Server</a></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>NGINX, Envoy, HAProxy, Traefik</li>
                          <li>Kubernetes, Istio, Linkerd</li>
                          <li>Ray Serve, vLLM, Triton, KServe/Seldon</li>
                          <li>OpenTelemetry for metrics/traces</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li><a href="https://discuss.kubernetes.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Kubernetes Discuss</a></li>
                          <li><a href="https://www.reddit.com/r/devops/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/devops</a></li>
                          <li><a href="https://www.reddit.com/r/kubernetes/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">r/kubernetes</a></li>
                          <li><a href="https://cloud-native.slack.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CNCF Slack</a></li>
                          <li><a href="https://discuss.istio.io/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Istio Discuss</a></li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'geographic-routing' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Geographic Routing directs requests to regions based on user location, regulatory constraints, and performance.
                        A policy combines geolocation, compliance/data-sovereignty, latency, capacity, and language/culture to choose an in-region
                        or nearest-compliant endpoint with safe fallbacks and monitored failover.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🌍</div>
                          <div className="text-xs text-gray-400 mb-1">Scope</div>
                          <div className="text-sm font-medium text-white">Region/locale aware</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛡️</div>
                          <div className="text-xs text-gray-400 mb-1">Compliance</div>
                          <div className="text-sm font-medium text-white">Data residency & laws</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="text-xs text-gray-400 mb-1">Performance</div>
                          <div className="text-sm font-medium text-white">Latency & capacity</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🗣️</div>
                          <div className="text-xs text-gray-400 mb-1">Localization</div>
                          <div className="text-sm font-medium text-white">Language & culture</div>
                        </div>
                      </div>
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
                        <li>Detect user region via IP/geolocation, explicit locale, tenant policy, or account residency.</li>
                        <li>Evaluate compliance: data residency, cross-border transfer rules, sector regulations (GDPR, CCPA/CPRA, LGPD, PDPA, HIPAA, FIN, etc.).</li>
                        <li>Compute performance signals: nearest PoP/edge, regional latency, capacity/health, cost, cache proximity.</li>
                        <li>Apply sovereignty constraints and business rules (allowed regions, model/provider allowlist, language variants).</li>
                        <li>Select primary region; choose fallback/secondary with rationale and confidence.</li>
                        <li>Execute in-region pipeline; localize language, formatting, and content where applicable.</li>
                        <li>Log routing decision, signals, and outcomes; monitor compliance and tail latency; auto-failover on degradation.</li>
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
                        'Prefer in-region processing; avoid unnecessary cross-border transfers.',
                        'Maintain an up-to-date regulation catalog and provider region capabilities; version policies.',
                        'Separate routing policy from execution; support dry-run/shadow to validate changes.',
                        'Localize language, date/number formats, currencies, and cultural norms.',
                        'Use edge/CDN for static assets and cache warm paths by region.',
                        'Encrypt in transit and at rest; minimize PII; tokenize where possible.',
                        'Plan regional failover, health checks, and controlled degradation paths.',
                        'Record rationales and evidence for audit (region, rules matched, signals).'
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
                        <li>Single-region apps without legal or performance requirements.</li>
                        <li>Hard real-time micro-latency flows where routing checks dominate cost.</li>
                        <li>No reliable geolocation or residency signals and low compliance risk.</li>
                        <li>Data cannot be segmented by region and must remain globally consistent without sharding.</li>
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
                        <li>Stale regulation maps or provider region catalogs causing non-compliant routes.</li>
                        <li>Ignoring language/cultural localization after routing.</li>
                        <li>Failover loops or partial compliance when secondary regions differ in policy support.</li>
                        <li>Leaking PII across borders via logs, traces, or caches.</li>
                        <li>Optimizing for average latency while P95/P99 regress in some locales.</li>
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
                        'Location-aware routing with sovereignty constraints',
                        'Compliance scoring and explainable rationale',
                        'Latency/capacity aware selection and health-based failover',
                        'Localization hooks (language, formatting, content rules)',
                        'Edge/CDN integration and cache locality',
                        'Decision logs, audits, and drift monitoring'
                      ].map((f) => (
                        <div key={f} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm">{f}</div>
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
                        <li>Compliance score and data residency adherence rate.</li>
                        <li>End-to-end latency by region (P50/P95/P99) and variance across locales.</li>
                        <li>Failover frequency, time-to-recovery, and success rate.</li>
                        <li>Localization quality/satisfaction, language coverage, and error rate.</li>
                        <li>Cache hit ratio and cost per request by region.</li>
                        <li>Misroute rate and override/appeal rate.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Router overhead is small: geolocation lookup + rules evaluation; avoid sending payloads through the router.</li>
                        <li>Maintain a cached regulation/provider capability map; refresh periodically, not per-request.</li>
                        <li>Leverage CDN/edge caching; avoid duplicate generation across regions by using cache keys and IDs.</li>
                        <li>Reserve expensive models for localized execution; keep routing policies rule-based or small-model.</li>
                        <li>Account for multi-region storage/replication costs when enforcing residency.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Global consumer apps requiring localization and low latency.</li>
                        <li>Regulated industries: healthcare, finance, government, education.</li>
                        <li>Multi-region SaaS with tenant residency commitments.</li>
                        <li>CDN-backed media/content delivery with regional personalization.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Academic Papers</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Data sovereignty and cross-border data flow studies (2018–2024)</li>
                          <li>Edge/geo-distributed systems and latency optimization</li>
                          <li>Compliance-aware scheduling in distributed systems</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Implementation Guides</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>AWS: Multi-Region, Data Residency, CloudFront Geo restriction/geolocation</li>
                          <li>GCP/Azure: Regional services, Sovereign/Confidential clouds</li>
                          <li>CDN: Cloudflare Workers/Rulesets, Fastly Compute@Edge, Akamai</li>
                          <li>Policy engines: OPA/Rego for compliance gates</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Tools & Libraries</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>MaxMind/GeoIP, ipinfo.io for geolocation</li>
                          <li>Cloud provider region/latency APIs and health checks</li>
                          <li>OPA/Rego, JSONLogic for routing policy</li>
                          <li>OpenTelemetry for audits/metrics/traces</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700/40">
                        <h3 className="text-white font-medium mb-2">Community & Discussions</h3>
                        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                          <li>Cloud architecture blogs on multi-region/residency</li>
                          <li>r/devops, r/kubernetes, and CDN provider communities</li>
                          <li>Security/Privacy forums on data protection and residency</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'conditional-chaining' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Conditional chaining evaluates context to dynamically select the most appropriate prompt path. A lightweight router (classifier, rules, or scoring function) chooses a specialized branch; results may optionally merge downstream. This enables personalization, decision trees, and adaptive workflows while conserving resources.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔀</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Branch on conditions</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="text-xs text-gray-400 mb-1">Specialization</div>
                          <div className="text-sm font-medium text-white">Targeted prompts per path</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Explicit routing policy</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧩</div>
                          <div className="text-xs text-gray-400 mb-1">Merging</div>
                          <div className="text-sm font-medium text-white">Optional merge/rejoin</div>
                        </div>
                      </div>
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
                        <li>Define routing objectives and branches with consistent I/O schemas.</li>
                        <li>Implement router: rules, heuristic scores, or LLM classifier with confidence.</li>
                        <li>Evaluate conditions and select branch (with default/fallback on low confidence).</li>
                        <li>Execute specialized branch prompts; validate outputs against schema.</li>
                        <li>Optionally merge/rejoin branches with normalization and conflict checks.</li>
                        <li>Emit decision logs, confidence, and per-branch metrics for monitoring.</li>
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
                        'Decouple router policy from branch implementations; version and test independently',
                        'Calibrate router confidence; define thresholds and safe default branch',
                        'Standardize output schemas across branches to enable merging and analytics',
                        'Add guardrails: low-confidence fallback, human-in-the-loop, and retries',
                        'Keep branches minimal and specialized; avoid redundant logic',
                        'Log routing features/decisions for auditability and drift detection',
                        'Regularly evaluate routing accuracy and branch health with labeled samples',
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
                        <li>Homogeneous tasks where a single well-crafted prompt performs well.</li>
                        <li>Hard real-time SLAs where routing overhead jeopardizes latency budgets.</li>
                        <li>Insufficient data to train/calibrate a reliable router or thresholds.</li>
                        <li>High maintenance cost from many branches outweighs benefit.</li>
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
                        <li>Inconsistent branch outputs and missing normalization across paths.</li>
                        <li>No safe default or fallback, causing drops or poor UX on low confidence.</li>
                        <li>Overfitting router prompts that don’t generalize; routing drift over time.</li>
                        <li>Thrashing between branches due to unstable conditions or thresholds.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'feedback-chaining' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Feedback chaining runs an iterative loop: generate → evaluate → improve, repeating until a target quality threshold or stop condition is met. An evaluator (rules, rubric, or model-as-judge) produces specific feedback that drives focused revisions, enabling convergence to higher quality outputs.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔄</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Looped iterations</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧪</div>
                          <div className="text-xs text-gray-400 mb-1">Evaluation</div>
                          <div className="text-sm font-medium text-white">Rubrics & scoring</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="text-xs text-gray-400 mb-1">Convergence</div>
                          <div className="text-sm font-medium text-white">Stop when target met</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧭</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Feedback-driven edits</div>
                        </div>
                      </div>
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
                        <li>Generate initial draft/output from the task brief and constraints.</li>
                        <li>Evaluate with a rubric: score criteria (e.g., accuracy, style, completeness) and extract actionable feedback.</li>
                        <li>If score &lt; target: produce an improvement plan (bulleted, concrete changes).</li>
                        <li>Revise using the plan; keep hard constraints and previous strengths.</li>
                        <li>Track metrics per iteration (score, deltas, tokens, time); prevent regressions.</li>
                        <li>Stop on convergence (score ≥ target, marginal gain &lt; epsilon) or max iterations.</li>
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
                        'Separate generator and judge models (or seeds) to reduce bias; use deterministic judge settings',
                        'Use explicit rubrics with weighted criteria and structured JSON feedback',
                        'Make feedback prescriptive (what to add/remove/clarify), not generic platitudes',
                        'Cap iterations and implement early stopping on small score deltas',
                        'Carry forward constraints and validated facts to avoid regressions',
                        'Log per-iteration artifacts for auditability and offline analysis',
                        'Occasionally inject diversity (n-best or temperature bursts) if stuck below target',
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
                        <li>Hard real-time latency budgets where multiple passes are unacceptable.</li>
                        <li>No objective rubric or ground truth—risk of endless subjective polishing.</li>
                        <li>Single-shot tasks that do not benefit from iterative refinement.</li>
                        <li>Tasks with minimal quality gain per iteration (quickly hits diminishing returns).</li>
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
                        <li>Oscillation with no convergence due to vague or conflicting feedback.</li>
                        <li>Judge leakage: evaluator sees gold answers or overfits phrasing.</li>
                        <li>Using the same model/config for both judge and generator causing confirmation bias.</li>
                        <li>Token bloat by re-sending entire history instead of distilled state.</li>
                        <li>Regression of previously correct details when revising without guardrails.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'hierarchical-chaining' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Hierarchical chaining decomposes a high-level goal into a tree of parent→child tasks. Parents define
                        contracts and acceptance criteria; children inherit scoped context and produce structured outputs that
                        roll up to their parents. Independent siblings can execute in parallel, while aggregation and validation
                        happen at each level to ensure consistency and quality.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🏗️</div>
                          <div className="text-xs text-gray-400 mb-1">Structure</div>
                          <div className="text-sm font-medium text-white">Tree of tasks</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧬</div>
                          <div className="text-xs text-gray-400 mb-1">Inheritance</div>
                          <div className="text-sm font-medium text-white">Scoped context</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">⚖️</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Per-level gates</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔀</div>
                          <div className="text-xs text-gray-400 mb-1">Execution</div>
                          <div className="text-sm font-medium text-white">Parallel siblings</div>
                        </div>
                      </div>
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
                        <li>Define the root goal, constraints, and objective metrics.</li>
                        <li>Design the task tree: levels, node responsibilities, and dependencies.</li>
                        <li>Specify strict input/output contracts per node with JSON schemas.</li>
                        <li>Scope context inheritance: pass distilled fields and references, not full transcripts.</li>
                        <li>Choose execution policy: depth-first for fast verticals, breadth-first for coverage; parallelize independent siblings.</li>
                        <li>Validate and aggregate child outputs at the parent; normalize and resolve conflicts.</li>
                        <li>Apply per-node gates: retries, fallbacks, and escalation on validation failures.</li>
                        <li>Emit per-level metrics and artifacts; cache reusable subtree results.</li>
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
                        'Keep node contracts stable and versioned; evolve leaves more often than trunks.',
                        'Use schemas and validators at every boundary; reject/repair before roll-up.',
                        'Constrain inheritance: pass IDs, summaries, and facts instead of raw text.',
                        'Parallelize siblings with bounded fan-out; prioritize critical-path nodes.',
                        'Design aggregation strategies per parent (rank/merge, scoring, or map-reduce).',
                        'Cache deterministic subtrees and reuse across runs to cut cost/latency.',
                        'Surface provenance in roll-ups: include child IDs and confidence per field.',
                        'Automate acceptance gates with rubrics and model-as-judge where appropriate.',
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
                        <li>Simple tasks solvable by a single prompt or shallow sequence.</li>
                        <li>Strict real-time SLAs where tree orchestration adds unacceptable latency.</li>
                        <li>Highly interdependent subtasks that resist clean parent→child contracts.</li>
                        <li>Very deep hierarchies that exceed context budgets or complicate debugging.</li>
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
                        <li>Context leakage by passing full transcripts down the tree.</li>
                        <li>Inconsistent child schemas causing brittle aggregation at parents.</li>
                        <li>Cycles or hidden dependencies that break hierarchical assumptions.</li>
                        <li>Over-decomposition inflating cost/latency without quality gains.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'iterative-refinement' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Iterative refinement improves an output through multiple focused passes: generate a baseline, evaluate against a rubric, plan targeted changes, and revise. Each cycle concentrates on a specific dimension (e.g., structure, content, style, correctness), with early stopping when gains diminish or targets are reached.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔁</div>
                          <div className="text-xs text-gray-400 mb-1">Flow</div>
                          <div className="text-sm font-medium text-white">Generate → Evaluate → Revise</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <div className="text-xs text-gray-400 mb-1">Focus</div>
                          <div className="text-sm font-medium text-white">One quality axis per pass</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📏</div>
                          <div className="text-xs text-gray-400 mb-1">Control</div>
                          <div className="text-sm font-medium text-white">Rubrics & thresholds</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛑</div>
                          <div className="text-xs text-gray-400 mb-1">End</div>
                          <div className="text-sm font-medium text-white">Convergence/stop rules</div>
                        </div>
                      </div>
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
                        <li>Create an initial draft/output from the task brief and constraints.</li>
                        <li>Define an explicit rubric with weighted criteria and target thresholds.</li>
                        <li>Evaluate the output and extract actionable, prescriptive feedback.</li>
                        <li>Formulate a concise improvement plan (diffs/edits, not generic advice).</li>
                        <li>Revise with constraints preserved; avoid regressing validated facts.</li>
                        <li>Track per-iteration metrics (score, deltas, tokens, time).</li>
                        <li>Early stop on small deltas or when target is met; cap max iterations.</li>
                        <li>Optionally inject diversity (n-best) only when stuck below target.</li>
                        <li>Finalize and record provenance of changes and acceptance artifacts.</li>
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
                        'Separate generator and judge (or use different seeds) to reduce confirmation bias.',
                        'Use structured rubrics and JSON feedback; include rationale and suggested edits.',
                        'Prefer diff-based edits and carry forward validated facts and constraints.',
                        'Truncate history aggressively; pass distilled state instead of full transcripts.',
                        'Implement early stopping and max-iteration caps to avoid diminishing returns.',
                        'Guard against regressions with checks, acceptance tests, or fact locks.',
                        'Use cheaper models for judging when possible; reserve strongest model for final pass.',
                        'Log artifacts per iteration for audit and offline analysis.'
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
                        <li>Hard real-time SLAs where multi-pass latency is unacceptable.</li>
                        <li>No objective rubric or ground truth; risk of endless subjective polishing.</li>
                        <li>Tasks with minimal quality gain after a single revision.</li>
                        <li>Deterministic transformations better handled by tools or rules.</li>
                        <li>Strict cost ceilings that preclude multiple evaluation passes.</li>
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
                        <li>Oscillation with no convergence due to vague or conflicting feedback.</li>
                        <li>Regressions of previously correct details when revising without guards.</li>
                        <li>Token bloat from passing full history rather than distilled state.</li>
                        <li>Judge/generator coupling causing biased evaluations.</li>
                        <li>Optimizing to the rubric while neglecting holistic quality.</li>
                        <li>Undefined or weak stop conditions leading to cost creep.</li>
                      </ul>
                    </div>
                  </section>
                </>
              ) : selectedTechnique.id === 'self-critique' ? (
                <>
                  {/* Core Mechanism (short conceptual overview) */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed mb-4">
                        Self-critique is a deliberate loop where the model generates an initial answer, evaluates it against an explicit rubric, identifies issues with evidence, proposes concrete edits, and produces a refined answer with calibrated confidence. Separating the generator and the judge (or using different seeds) reduces confirmation bias.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🧪</div>
                          <div className="text-xs text-gray-400 mb-1">Evaluation</div>
                          <div className="text-sm font-medium text-white">Rubric-based judging</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🛠️</div>
                          <div className="text-xs text-gray-400 mb-1">Editing</div>
                          <div className="text-sm font-medium text-white">Diff/instruction edits</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">🔍</div>
                          <div className="text-xs text-gray-400 mb-1">Quality</div>
                          <div className="text-sm font-medium text-white">Error + gap detection</div>
                        </div>
                        <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                          <div className="text-2xl mb-2">📊</div>
                          <div className="text-xs text-gray-400 mb-1">Confidence</div>
                          <div className="text-sm font-medium text-white">Calibration & stop rules</div>
                        </div>
                      </div>
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
                        <li>Produce a baseline answer from the task brief and constraints.</li>
                        <li>Define or load a rubric with weighted criteria (accuracy, completeness, clarity, relevance, safety, etc.).</li>
                        <li>Judge the answer: cite issues with evidence, rate each criterion, and compute an overall score.</li>
                        <li>Propose a concise improvement plan (diffs/instructions) tied to rubric findings.</li>
                        <li>Revise, preserving validated facts and constraints; avoid regressions.</li>
                        <li>Calibrate confidence; decide to stop based on thresholds or small deltas.</li>
                        <li>Emit artifacts: scores, rationale, applied edits, and provenance.</li>
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
                        'Separate generator and judge (different model/tier, or different seed/settings).',
                        'Use structured rubrics with weights; return JSON scores + rationales.',
                        'Prefer diff/instruction-style edits; lock validated facts to prevent regressions.',
                        'Aggressively truncate history; pass distilled state (facts, constraints, last diff).',
                        'Enable early stopping; cap max iterations; log deltas per pass.',
                        'Use retrieval/grounding when judging factual claims; flag unverifiable statements.',
                        'Track calibration (confidence vs. actual success) and re-tune thresholds.',
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
                        <li>Hard real-time tasks where multi-pass latency is unacceptable.</li>
                        <li>No objective rubric or ground truth (risk of endless subjective polishing).</li>
                        <li>Deterministic transformations better handled by tools/compilers/linters.</li>
                        <li>Tasks with minimal quality gain after a single revision.</li>
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
                        <li>Judge/generator coupling causing confirmation bias.</li>
                        <li>Overfitting to the rubric while degrading holistic quality.</li>
                        <li>Token bloat from verbose rationales and full-history resends.</li>
                        <li>Regression of previously correct details due to unguarded edits.</li>
                        <li>Oscillation without convergence from vague/conflicting feedback.</li>
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
                        'Rubric-based multi-criteria evaluation with weighted scoring.',
                        'Evidence-linked critiques and actionable edit plans.',
                        'Diff/instruction-style revisions with fact locking.',
                        'Confidence scoring and calibration tracking.',
                        'Early stopping and iteration caps to control cost.',
                        'Optional retrieval/grounding for factual verification.',
                      ].map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* KPIs / Success Metrics */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                      KPIs / Success Metrics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { icon: '📈', label: 'Quality gain per iter', desc: 'Δ rubric score per iteration until convergence' },
                        { icon: '🔁', label: 'Convergence iterations', desc: 'Average iterations to hit target or stop' },
                        { icon: '🧪', label: 'Judge consistency', desc: 'Inter-rater/self-consistency across runs' },
                        { icon: '🎯', label: 'Target attainment rate', desc: 'Share of runs ≥ target threshold' },
                        { icon: '💲', label: 'Cost per improvement point', desc: 'Tokens per +1 rubric point or acceptance' },
                        { icon: '🛑', label: 'Early stop rate', desc: 'Runs halted due to small deltas or caps' },
                      ].map((m) => (
                        <div key={m.label} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
                          <div className="text-2xl mb-2">{m.icon}</div>
                          <div className="text-sm font-semibold text-white">{m.label}</div>
                          <div className="text-xs text-gray-400">{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Total cost ≈ Σ over iterations of (generator tokens + evaluator tokens + revision tokens). Optimize for early convergence and lightweight judges.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use small/cheap model for judging when feasible; reserve strongest model for final acceptance.</li>
                        <li>Truncate history; pass distilled state (facts, constraints, last diff).</li>
                        <li>Enable early stopping on small score deltas; cap max iterations.</li>
                        <li>Cache stable sub-artifacts (retrieved docs, validated sections) across iterations.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                      {[
                        'Content QA and editing',
                        'Code review and reasoning trace checks',
                        'Safety/robustness evaluation and red-team hardening',
                        'Academic and analytical writing improvement',
                        'Data pipeline/report validation',
                        'Policy/criteria compliance checks',
                      ].map((uc) => (
                        <div key={uc} className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg text-sm">
                          <span className="text-base">✅</span>
                          <span className="text-gray-300 font-medium">{uc}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Academic Papers */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="text-orange-400">📚</span>
                            Academic Papers
                          </h4>
                          <div className="space-y-2 text-sm">
                            <a href="https://arxiv.org/abs/2303.17651" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Self-Refine: Iterative Refinement with Feedback (Shinn et al., 2023)</a>
                            <a href="https://arxiv.org/abs/2310.04406" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• RLAIF: Reinforcement Learning from AI Feedback (2023)</a>
                            <a href="https://arxiv.org/abs/2402.14972" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DERA: Deliberate Reasoning with Iterative Improvement (2024)</a>
                            <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Constitutional AI: Self-critique & principle-based revision (Anthropic, 2022)</a>
                          </div>
                        </div>

                        {/* Implementation Guides */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="text-green-400">🛠️</span>
                            Implementation Guides
                          </h4>
                          <div className="space-y-2 text-sm">
                            <a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• OpenAI Cookbook: Reliable LLM patterns</a>
                            <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Anthropic Claude: Prompting & tooling</a>
                            <a href="https://www.promptingguide.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Prompting Guide: Patterns & anti-patterns</a>
                          </div>
                        </div>

                        {/* Tools & Libraries */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="text-purple-400">⚙️</span>
                            Tools & Libraries
                          </h4>
                          <div className="space-y-2 text-sm">
                            <a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangChain</a>
                            <a href="https://www.llamaindex.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LlamaIndex</a>
                            <a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DSPy</a>
                            <a href="https://github.com/microsoft/guidance" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Guidance</a>
                          </div>
                        </div>

                        {/* Community & Discussions */}
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="text-cyan-400">👥</span>
                            Community & Discussions
                          </h4>
                          <div className="space-y-2 text-sm">
                            <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• r/MachineLearning</a>
                            <a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangChain Discord</a>
                            <a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Awesome prompts & resources</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    {selectedTechnique.name}
                  </h2>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                    <p className="text-gray-200 text-base leading-relaxed mb-6">
                      {selectedTechnique.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">{selectedTechnique.icon}</div>
                        <div className="text-sm text-gray-400 mb-1">Pattern Type</div>
                        <div className="text-sm font-medium text-white">
                          {categories.find(c => c.id === selectedTechnique.category)?.name || 'Design Pattern'}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">
                          {selectedTechnique.complexity === 'low' ? '🟢' : 
                           selectedTechnique.complexity === 'medium' ? '🟡' : '🔴'}
                        </div>
                        <div className="text-sm text-gray-400 mb-1">Complexity</div>
                        <div className="text-sm font-medium text-white capitalize">
                          {selectedTechnique.complexity}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">🎯</div>
                        <div className="text-sm text-gray-400 mb-1">Use Cases</div>
                        <div className="text-sm font-medium text-white">
                          {selectedTechnique.useCases.length} scenarios
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">⚡</div>
                        <div className="text-sm text-gray-400 mb-1">Features</div>
                        <div className="text-sm font-medium text-white">
                          {selectedTechnique.features?.length || 0} features
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* How it Works (generic) - removed globally per spec */}

              {/* Key Features */}
              {selectedTechnique.id !== 'load-balancing' && selectedTechnique.id !== 'self-critique' && (
              <section>
                <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Key Features
                </h2>
                <div className="grid gap-3">
                  {selectedTechnique.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {/* KPIs / Success Metrics */}
              {(selectedTechnique.id === 'sequential-chaining' || selectedTechnique.id === 'parallel-chaining' || selectedTechnique.id === 'conditional-chaining' || selectedTechnique.id === 'feedback-chaining' || selectedTechnique.id === 'hierarchical-chaining' || selectedTechnique.id === 'iterative-refinement') && (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                    KPIs / Success Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(selectedTechnique.id === 'sequential-chaining'
                      ? [
                          { icon: '🎯', label: 'Task success rate', desc: 'Pass/fail by acceptance tests per step and end-to-end' },
                          { icon: '✅', label: 'Factuality/accuracy', desc: 'Human or automated evals on grounded fields' },
                          { icon: '⏱️', label: 'Latency per step / E2E', desc: 'P50/P95 timings to identify bottlenecks' },
                          { icon: '💲', label: 'Cost per run', desc: 'Input+output tokens × model rate across steps' },
                          { icon: '🧱', label: 'Error containment', desc: 'Rate of failures recovered via retries/fallbacks' },
                          { icon: '🧪', label: 'Step regression score', desc: 'A/B deltas when updating individual steps' },
                        ]
                      : selectedTechnique.id === 'parallel-chaining'
                      ? [
                          { icon: '⚡', label: 'Wall-clock speedup', desc: 'Speedup vs sequential baseline for same task quality' },
                          { icon: '📈', label: 'Throughput', desc: 'Tasks per minute at target concurrency (P50/P95)' },
                          { icon: '🤝', label: 'Agreement score', desc: 'Consensus/majority agreement or pairwise similarity' },
                          { icon: '✅', label: 'Useful-result ratio', desc: 'Valid/non-empty worker outputs divided by total' },
                          { icon: '⏱️', label: 'Tail latency', desc: 'P95 time-to-aggregate with partials tolerated' },
                          { icon: '💲', label: 'Cost per run', desc: 'Sum of all worker tokens + merge cost' },
                        ]
                      : selectedTechnique.id === 'conditional-chaining'
                      ? [
                          { icon: '🧭', label: 'Routing accuracy', desc: 'Agreement with oracle labels or evaluator on correct branch' },
                          { icon: '📊', label: 'Confidence calibration', desc: 'Calibration error (ECE) and threshold quality' },
                          { icon: '🧰', label: 'Fallback/default rate', desc: 'Share of low-confidence routes using default path' },
                          { icon: '🎯', label: 'Per-branch success', desc: 'Quality/acceptance metrics segmented by branch' },
                          { icon: '⏱️', label: 'Routing overhead', desc: 'Added latency from router vs direct execution' },
                          { icon: '💲', label: 'Cost per run', desc: 'Router tokens + branch tokens + optional merge' },
                        ]
                      : selectedTechnique.id === 'hierarchical-chaining'
                      ? [
                          { icon: '🧩', label: 'Decomposition quality', desc: 'Rubric score for task-tree design and coverage' },
                          { icon: '✅', label: 'Node success rate', desc: 'Share of nodes passing validation/acceptance gates' },
                          { icon: '🔗', label: 'Aggregation consistency', desc: 'Conflict rate and repair frequency at parents' },
                          { icon: '⚡', label: 'Critical-path latency', desc: 'P50/P95 along deepest required path' },
                          { icon: '💸', label: 'Cost per level / total', desc: 'Token spend segmented by depth and subtree' },
                          { icon: '♻️', label: 'Subtree reuse hit-rate', desc: 'Cache hits for deterministic nodes across runs' },
                        ]
                      : [
                          { icon: '📈', label: 'Quality gain per iter', desc: 'Δ score per iteration until convergence' },
                          { icon: '🔁', label: 'Convergence iterations', desc: 'Avg iterations to reach target or stop' },
                          { icon: '🧪', label: 'Judge consistency', desc: 'Inter-rater or self-consistency of evaluator' },
                          { icon: '🎯', label: 'Target attainment rate', desc: 'Share of runs achieving target threshold' },
                          { icon: '💲', label: 'Cost per improvement point', desc: 'Tokens per +1 score or per acceptance' },
                          { icon: '🛑', label: 'Early stop rate', desc: 'Runs halted due to small deltas or max-iter cap' },
                        ]).map((m) => (
                      <div key={m.label} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
                        <div className="text-2xl mb-2">{m.icon}</div>
                        <div className="text-sm font-semibold text-white">{m.label}</div>
                        <div className="text-xs text-gray-400">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Token / Resource Usage */}
              {(selectedTechnique.id === 'sequential-chaining' || selectedTechnique.id === 'parallel-chaining' || selectedTechnique.id === 'conditional-chaining' || selectedTechnique.id === 'feedback-chaining' || selectedTechnique.id === 'hierarchical-chaining' || selectedTechnique.id === 'iterative-refinement') && (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                    Token / Resource Usage
                  </h2>
                  {selectedTechnique.id === 'sequential-chaining' ? (
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Estimate cost as sum of per-step input/output tokens × model rates. Control growth by passing only distilled fields, not full transcripts.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Minimize carry-over: keep interfaces compact (IDs, keys, summaries).</li>
                        <li>Use JSON mode and response formatting to avoid verbose prose.</li>
                        <li>Cache stable intermediate results; memoize deterministic steps.</li>
                        <li>Batch small requests where feasible; prefer smaller models upstream.</li>
                      </ul>
                    </div>
                  ) : selectedTechnique.id === 'parallel-chaining' ? (
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Total tokens scale with fan-out: sum of all parallel worker inputs/outputs plus aggregation. Plan for burst concurrency within rate limits and budgets.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Cap fan-out and enforce per-run token budgets with guardrails.</li>
                        <li>Use timeouts and accept partial results to bound cost and latency.</li>
                        <li>Prefer smaller/cheaper models for parallel legs; reserve strongest model for final merge.</li>
                        <li>Batch where supported; deduplicate prompts; share context via IDs rather than full text.</li>
                        <li>Implement backoff for rate limits and use queuing/backpressure.</li>
                        <li>Cache stable or reusable worker results across runs.</li>
                      </ul>
                    </div>
                  ) : selectedTechnique.id === 'conditional-chaining' ? (
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Total cost = router tokens + selected-branch tokens (+ optional merge). Use lightweight routing to minimize overhead and prefer cheap models for gating.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use small/cheap model or rules for routing; reserve strong model for complex branches.</li>
                        <li>Define a safe default branch for low-confidence cases; avoid exploring multiple branches unless top-k is justified.</li>
                        <li>Standardize branch schemas to enable efficient merging without verbose reparsing.</li>
                        <li>Cache branch-invariant artifacts (retrieved docs, profiles) and reuse across runs.</li>
                        <li>Log routing distributions to detect cost drift and rebalance thresholds.</li>
                      </ul>
                    </div>
                  ) : selectedTechnique.id === 'hierarchical-chaining' ? (
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Total cost ≈ sum over nodes on the executed tree (critical path + parallel siblings + aggregation). Control explosion by constraining inheritance and reusing deterministic subtrees.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Pass references and summaries between levels; avoid raw documents.</li>
                        <li>Batch sibling nodes where possible; cap per-level fan-out.</li>
                        <li>Select model tiers by level complexity; reserve strongest model for root/aggregation.</li>
                        <li>Cache validated child outputs and roll-ups; reuse across runs and branches.</li>
                        <li>Hoist invariant context to ancestors; keep leaf prompts minimal.</li>
                        <li>Track per-level cost/latency to refine the tree and prune low-value nodes.</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                      <p>Total cost ≈ Σ over iterations of (generator tokens + evaluator tokens + revision tokens). Expect diminishing returns; optimize for early convergence.</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use a lightweight evaluator where possible; reserve strongest model for final acceptance.</li>
                        <li>Truncate history aggressively: pass distilled state (facts, constraints, last diff) instead of full transcripts.</li>
                        <li>Enable early stopping on small score deltas; cap max iterations.</li>
                        <li>Consider n-best only when stuck; otherwise prefer single-trajectory refinement.</li>
                        <li>Cache stable sub-artifacts (retrieved docs, validated sections) across iterations.</li>
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Best Use Cases */}
              {selectedTechnique.id !== 'load-balancing' && selectedTechnique.id !== 'self-critique' && (
              <section>
                <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Best Use Cases
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {selectedTechnique.useCases.map((useCaseId: string) => {
                    const useCase = useCases.find(uc => uc.id === useCaseId);
                    return (
                      <div
                        key={useCaseId}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg text-sm"
                      >
                        <span className="text-base">{useCase?.icon}</span>
                        <span className="text-gray-300 font-medium">{useCase?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
              )}

              {/* References & Further Reading */}
              {selectedTechnique.id !== 'load-balancing' && selectedTechnique.id !== 'self-critique' && (
              <section>
                <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  References & Further Reading
                </h2>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Academic Papers */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-orange-400">📚</span>
                        Academic Papers
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Chain-of-Thought Prompting (Wei et al., 2022)</a>
                        <a href="https://arxiv.org/abs/2203.11171" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Self-Consistency for CoT (Wang et al., 2022)</a>
                        <a href="https://arxiv.org/abs/2305.10601" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Tree of Thoughts (Yao et al., 2023)</a>
                        <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• ReAct: Synergizing Reasoning and Acting (2022)</a>
                        {selectedTechnique.id === 'iterative-refinement' && (
                          <>
                            <a href="https://arxiv.org/abs/2303.17651" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Self-Refine: Iterative Refinement with Feedback (Shinn et al., 2023)</a>
                            <a href="https://arxiv.org/abs/2310.04406" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• RLAIF: Reinforcement Learning from AI Feedback (2023)</a>
                            <a href="https://arxiv.org/abs/2402.14972" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DERA: Deliberate Reasoning with Iterative Improvement (2024)</a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Implementation Guides */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-green-400">🛠️</span>
                        Implementation Guides
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="https://cookbook.openai.com/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• OpenAI Cookbook: Reliable LLM patterns</a>
                        <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Anthropic Claude: Prompting & tooling</a>
                        <a href="https://www.promptingguide.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Prompting Guide: Patterns & anti-patterns</a>
                        {selectedTechnique.id === 'iterative-refinement' && (
                          <>
                            <a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DSPy: Programmatic optimization and refinement loops</a>
                            <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangGraph: Iterative agent workflows</a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tools & Libraries */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-purple-400">⚙️</span>
                        Tools & Libraries
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="https://python.langchain.com/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangChain</a>
                        <a href="https://www.llamaindex.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LlamaIndex</a>
                        <a href="https://dspy.ai/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DSPy</a>
                        <a href="https://github.com/microsoft/guidance" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Guidance</a>
                        <a href="https://temporal.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Temporal (workflow engine)</a>
                        <a href="https://www.prefect.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Prefect</a>
                        {selectedTechnique.id === 'iterative-refinement' && (
                          <>
                            <a href="https://github.com/stanfordnlp/dspy" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DSPy optimize: Iterative program search</a>
                            <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangGraph iterative controllers</a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Community Resources */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-cyan-400">👥</span>
                        Community & Discussions
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• r/MachineLearning</a>
                        <a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• LangChain Discord</a>
                        <a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Awesome prompts & resources</a>
                        {selectedTechnique.id === 'iterative-refinement' && (
                          <>
                            <a href="https://discord.gg/dspy" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• DSPy Community</a>
                            <a href="https://community.openai.com/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• OpenAI Community: Prompting and evaluation</a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              )}

            </div>
          ) : detailsTab === 'flow' ? (
            <div className="space-y-6">
              {/* Flow Visualization */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  Step-by-Step 2 Flow Visualization
                </h2>
                <div className="bg-gray-900/60 rounded-xl border border-gray-700/30">
                  <div className="bg-gray-900/60 px-4 py-3 border-b border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">
                        Interactive flow diagram showing the execution pattern
                      </span>
                      <span className="text-xs text-gray-500">
                        {patternScenarios[selectedTechnique.id] ? 'Flow diagram available' : 'Flow coming soon'}
                      </span>
                    </div>
                  </div>
                  {patternScenarios[selectedTechnique.id] ? (
                    <InteractivePatternFlow 
                      scenario={patternScenarios[selectedTechnique.id]}
                      height={500}
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <GitBranch className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Flow Visualization Coming Soon</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        We&apos;re creating an interactive flow diagram for this technique. 
                        Check back soon or explore other techniques with available flows.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : detailsTab === 'interactive' ? (
            !user ? (
              <div className="min-h-screen bg-gray-950 relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
                  {/* Hero Section */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-8">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
                      Interactive Demonstrations
                    </h1>
                    
                    <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                      Experience hands-on demonstrations and interactive learning for AI design patterns
                    </p>

                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                        <span className="text-2xl font-semibold text-blue-400">Sign in to access interactive demos!</span>
                      </div>
                      <p className="text-gray-300 text-lg">
                        Create your free account to explore interactive pattern demonstrations.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/auth/register')}
                        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Exploring Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                      
                      <button
                        onClick={() => router.push('/auth/login')}
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-xl border border-gray-700 transition-colors duration-200"
                      >
                        Already have an account? Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              {/* Interactive Demos */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Interactive Demonstrations
                </h2>
                <div className="bg-gray-900/60 rounded-xl border border-gray-700/30">
                  <div className="bg-gray-900/60 px-4 py-3 border-b border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">
                        {selectedTechnique.id === 'feedback-chaining' 
                          ? 'Interactive feedback loop demonstration'
                          : selectedTechnique.id === 'hierarchical-chaining'
                          ? 'Interactive project management simulation'
                          : selectedTechnique.id === 'capability-routing'
                          ? 'Interactive capability-based routing simulation'
                          : selectedTechnique.id === 'load-balancing'
                          ? 'Interactive load balancing and distribution simulation'
                          : selectedTechnique.id === 'geographic-routing'
                          ? 'Interactive geographic routing and compliance simulation'
                          : selectedTechnique.id === 'map-reduce'
                          ? 'Interactive distributed computing and data processing simulation'
                          : selectedTechnique.id === 'scatter-gather'
                          ? 'Interactive scatter-gather service orchestration simulation'
                          : selectedTechnique.id === 'fork-join'
                          ? 'Interactive fork-join recursive decomposition simulation'
                          : selectedTechnique.id === 'async-await'
                          ? 'Interactive async-await promise coordination simulation'
                          : selectedTechnique.id === 'self-critique'
                          ? 'Interactive self-critique quality assessment simulation'
                          : selectedTechnique.id === 'function-calling'
                          ? 'Interactive function calling and tool use simulation'
                          : selectedTechnique.id === 'code-execution'
                          ? 'Interactive code generation, validation, and execution simulation'
                          : selectedTechnique.id === 'hierarchical-planning'
                          ? 'Interactive hierarchical goal decomposition and project planning simulation'
                          : selectedTechnique.id === 'goal-decomposition'
                          ? 'Interactive goal breakdown, SMART criteria evaluation, and progress tracking simulation'
                          : selectedTechnique.id === 'constraint-satisfaction'
                          ? 'Interactive constraint satisfaction problem solving with multiple algorithms and optimization'
                          : selectedTechnique.id === 'scenario-planning'
                          ? 'Interactive strategic scenario planning with real-world AI system design contexts and adaptive strategies'
                          : selectedTechnique.id === 'context-compression-advanced'
                          ? 'Interactive multi-agent compression coordination with semantic preservation and dynamic optimization'
                          : selectedTechnique.id === 'multimodal-context-integration'
                          ? 'Interactive multimodal context processing with text, visual, and audio input integration'
                          : selectedTechnique.id === 'sliding-window'
                          ? 'Interactive sliding window memory management with automatic eviction and real-time processing'
                          : selectedTechnique.id === 'hierarchical-memory'
                          ? 'Interactive multi-tier memory system with intelligent promotion policies and retention management'
                          : selectedTechnique.id === 'attention-mechanisms'
                          ? 'Interactive attention scoring demonstration with semantic similarity, temporal relevance, and contextual importance'
                          : selectedTechnique.id === 'memory-consolidation'
                          ? 'Interactive memory consolidation process with pattern extraction, redundancy removal, and schema formation'
                          : selectedTechnique.id === 'working-memory-patterns'
                          ? 'Interactive working memory simulation with capacity management, attention control, and interference suppression'
                          : selectedTechnique.id === 'context-compression'
                          ? 'Interactive context compression demo with lossy/lossless options, semantic preservation, and compression metrics'
                          : 'Hands-on demonstration of the technique'
                        }
                      </span>
                      <span className="text-xs text-gray-500">
                        {selectedTechnique.id === 'feedback-chaining' || selectedTechnique.id === 'hierarchical-chaining' || selectedTechnique.id === 'iterative-refinement' || selectedTechnique.id === 'parallel-synthesis' || selectedTechnique.id === 'dynamic-routing' || selectedTechnique.id === 'dynamic-context-assembly' || selectedTechnique.id === 'message-queuing' || selectedTechnique.id === 'latent-memory-networks' || selectedTechnique.id === 'adaptive-context-depth' || selectedTechnique.id === 'latent-knowledge-retrieval' || selectedTechnique.id === 'context-compression-advanced' || selectedTechnique.id === 'multimodal-context-integration' || selectedTechnique.id === 'sliding-window' || selectedTechnique.id === 'hierarchical-memory' || selectedTechnique.id === 'attention-mechanisms' || selectedTechnique.id === 'memory-consolidation' || selectedTechnique.id === 'working-memory-patterns' || selectedTechnique.id === 'context-compression' || selectedTechnique.id === 'content-based-routing' || selectedTechnique.id === 'capability-routing' || selectedTechnique.id === 'load-balancing' || selectedTechnique.id === 'geographic-routing' || selectedTechnique.id === 'map-reduce' || selectedTechnique.id === 'scatter-gather' || selectedTechnique.id === 'fork-join' || selectedTechnique.id === 'async-await' || selectedTechnique.id === 'self-critique' || selectedTechnique.id === 'function-calling' || selectedTechnique.id === 'code-execution' || selectedTechnique.id === 'hierarchical-planning' || selectedTechnique.id === 'goal-decomposition' || selectedTechnique.id === 'constraint-satisfaction' || selectedTechnique.id === 'scenario-planning' || selectedTechnique.id === 'sequential-chaining' || selectedTechnique.id === 'parallel-chaining' || selectedTechnique.id === 'conditional-chaining' ? 'Interactive demo available' : 'Demo coming soon'}
                      </span>
                    </div>
                  </div>
                  {selectedTechnique.id === 'feedback-chaining' ? (
                    <FeedbackChainingDemo />
                  ) : selectedTechnique.id === 'hierarchical-chaining' ? (
                    <HierarchicalChainingDemo />
                  ) : selectedTechnique.id === 'iterative-refinement' ? (
                    <IterativeRefinementDemo />
                  ) : selectedTechnique.id === 'parallel-synthesis' ? (
                    <ParallelSynthesisDemo />
                  ) : selectedTechnique.id === 'dynamic-routing' ? (
                    <DynamicRoutingDemo />
                  ) : selectedTechnique.id === 'dynamic-context-assembly' ? (
                    <DynamicContextAssemblyDemo />
                  ) : selectedTechnique.id === 'message-queuing' ? (
                    <MessageQueuingDemo />
                  ) : selectedTechnique.id === 'latent-memory-networks' ? (
                    <LatentMemoryNetworksDemo />
                  ) : selectedTechnique.id === 'adaptive-context-depth' ? (
                    <AdaptiveContextDepthDemo />
                  ) : selectedTechnique.id === 'latent-knowledge-retrieval' ? (
                    <LatentKnowledgeRetrievalDemo />
                  ) : selectedTechnique.id === 'context-compression-advanced' ? (
                    <AdvancedContextCompressionDemo />
                  ) : selectedTechnique.id === 'multimodal-context-integration' ? (
                    <MultimodalContextIntegrationDemo />
                  ) : selectedTechnique.id === 'sliding-window' ? (
                    <SlidingWindowDemo />
                  ) : selectedTechnique.id === 'hierarchical-memory' ? (
                    <HierarchicalMemoryDemo />
                  ) : selectedTechnique.id === 'attention-mechanisms' ? (
                    <AttentionMechanismsDemo />
                  ) : selectedTechnique.id === 'memory-consolidation' ? (
                    <MemoryConsolidationDemo />
                  ) : selectedTechnique.id === 'working-memory-patterns' ? (
                    <WorkingMemoryPatternsDemo />
                  ) : selectedTechnique.id === 'context-compression' ? (
                    <ContextCompressionDemo />
                  ) : selectedTechnique.id === 'content-based-routing' ? (
                    <ContentBasedRoutingDemo />
                  ) : selectedTechnique.id === 'capability-routing' ? (
                    <CapabilityRoutingDemo />
                  ) : selectedTechnique.id === 'load-balancing' ? (
                    <LoadBalancingDemo />
                  ) : selectedTechnique.id === 'geographic-routing' ? (
                    <GeographicRoutingDemo />
                  ) : selectedTechnique.id === 'map-reduce' ? (
                    <MapReduceDemo />
                  ) : selectedTechnique.id === 'scatter-gather' ? (
                    <ScatterGatherDemo />
                  ) : selectedTechnique.id === 'fork-join' ? (
                    <ForkJoinDemo />
                  ) : selectedTechnique.id === 'async-await' ? (
                    <AsyncAwaitDemo />
                  ) : selectedTechnique.id === 'self-critique' ? (
                    <SelfCritiqueDemo />
                  ) : selectedTechnique.id === 'function-calling' ? (
                    <ToolUseDemo />
                  ) : selectedTechnique.id === 'code-execution' ? (
                    <CodeExecutionDemo />
                  ) : selectedTechnique.id === 'hierarchical-planning' ? (
                    <HierarchicalPlanningDemo />
                  ) : selectedTechnique.id === 'goal-decomposition' ? (
                    <GoalDecompositionDemo />
                  ) : selectedTechnique.id === 'constraint-satisfaction' ? (
                    <ConstraintSatisfactionDemo />
                  ) : selectedTechnique.id === 'scenario-planning' ? (
                    <ScenarioPlanningDemo />
                  ) : selectedTechnique.id === 'sequential-chaining' ? (
                    <SequentialChainingDemo />
                  ) : selectedTechnique.id === 'parallel-chaining' ? (
                    <ParallelChainingDemo />
                  ) : selectedTechnique.id === 'conditional-chaining' ? (
                    <ConditionalChainingDemo />
                  ) : (
                    <div className="p-8 text-center">
                      <Play className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Interactive Demo Coming Soon</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        We&apos;re working on an interactive hands-on demonstration for this technique. 
                        Check back soon or explore other techniques with available demos.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )
          ) : (
            !user ? (
              <div className="min-h-screen bg-gray-950 relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-blue-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
                  {/* Hero Section */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl shadow-2xl mb-8">
                      <Code className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
                      Code Playground
                    </h1>
                    
                    <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                      Access live code examples and interactive programming environments for AI design patterns
                    </p>

                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-6 h-6 text-green-400" />
                        <span className="text-2xl font-semibold text-green-400">Sign in to access the code playground!</span>
                      </div>
                      <p className="text-gray-300 text-lg">
                        Create your free account to explore live code examples and interactive environments.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/auth/register')}
                        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Code className="w-5 h-5" />
                        <span>Start Coding Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                      
                      <button
                        onClick={() => router.push('/auth/login')}
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-xl border border-gray-700 transition-colors duration-200"
                      >
                        Already have an account? Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Code Playground
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  {(['typescript', 'python', 'rust'] as LanguageType[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`flex-1 sm:flex-none px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                        selectedLanguage === lang
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Code Sandbox */}
              {patternExamples[selectedTechnique.id as PatternId] ? (
                <CodeSandbox
                  patternId={selectedTechnique.id}
                  initialCode={patternExamples[selectedTechnique.id as PatternId][selectedLanguage]}
                  language={selectedLanguage}
                  onCodeChange={(code) => {
                    console.log('Code changed:', code);
                  }}
                />
              ) : (
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700/30 text-center">
                  <Code className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Code examples coming soon for this pattern</p>
                </div>
              )}
            </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};