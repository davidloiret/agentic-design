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
              {selectedTechnique.id === 'sequential-chaining' ? (
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

              {/* How it Works (generic) */}
              {selectedTechnique.id !== 'sequential-chaining' && selectedTechnique.id !== 'parallel-chaining' && selectedTechnique.id !== 'conditional-chaining' && selectedTechnique.id !== 'feedback-chaining' && (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                    How it Works
                  </h2>
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
                    <p className="text-gray-200 text-base leading-relaxed mb-6">
                      {selectedTechnique.name} works by following a structured approach that enhances reasoning and problem-solving capabilities. 
                      This pattern is essential because it provides a systematic way to handle complex tasks that require multiple steps, 
                      validation, or different approaches to achieve optimal results.
                    </p>
                    
                    {/* Pattern Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-2xl mb-2">🧠</div>
                        <h4 className="font-semibold text-white mb-2">Enhanced Reasoning</h4>
                        <p className="text-sm text-gray-300">Breaks down complex problems into manageable steps</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-white mb-2">Better Accuracy</h4>
                        <p className="text-sm text-gray-300">Reduces errors through systematic validation</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-white mb-2">Transparency</h4>
                        <p className="text-sm text-gray-300">Makes the reasoning process visible and understandable</p>
                      </div>
                    </div>

                    {/* Why We Need This Pattern */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="text-amber-400">💡</span>
                        Why This Pattern Matters
                      </h4>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Traditional approaches often jump directly to conclusions, missing important intermediate steps. 
                        This pattern ensures thorough analysis, reduces hallucinations, and provides confidence in the results 
                        by making each step of the reasoning process explicit and verifiable.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Key Features */}
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