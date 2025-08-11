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

              {/* Overview header block */}
              {selectedTechnique.id !== 'sequential-chaining' ? (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    What is {selectedTechnique.name}?
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
              ) : (
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
              )}

              {/* How it Works (generic) or additional sections for sequential chaining */}
              {selectedTechnique.id !== 'sequential-chaining' && (
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

              {/* KPIs / Success Metrics (sequential-chaining specific content sits well for all) */}
              {selectedTechnique.id === 'sequential-chaining' && (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                    KPIs / Success Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: '🎯', label: 'Task success rate', desc: 'Pass/fail by acceptance tests per step and end-to-end' },
                      { icon: '✅', label: 'Factuality/accuracy', desc: 'Human or automated evals on grounded fields' },
                      { icon: '⏱️', label: 'Latency per step / E2E', desc: 'P50/P95 timings to identify bottlenecks' },
                      { icon: '💲', label: 'Cost per run', desc: 'Input+output tokens × model rate across steps' },
                      { icon: '🧱', label: 'Error containment', desc: 'Rate of failures recovered via retries/fallbacks' },
                      { icon: '🧪', label: 'Step regression score', desc: 'A/B deltas when updating individual steps' },
                    ].map((m) => (
                      <div key={m.label} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
                        <div className="text-2xl mb-2">{m.icon}</div>
                        <div className="text-sm font-semibold text-white">{m.label}</div>
                        <div className="text-xs text-gray-400">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Token / Resource Usage (sequential-chaining only) */}
              {selectedTechnique.id === 'sequential-chaining' && (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                    Token / Resource Usage
                  </h2>
                  <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-3 text-sm text-gray-300">
                    <p>Estimate cost as sum of per-step input/output tokens × model rates. Control growth by passing only distilled fields, not full transcripts.</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Minimize carry-over: keep interfaces compact (IDs, keys, summaries).</li>
                      <li>Use JSON mode and response formatting to avoid verbose prose.</li>
                      <li>Cache stable intermediate results; memoize deterministic steps.</li>
                      <li>Batch small requests where feasible; prefer smaller models upstream.</li>
                    </ul>
                  </div>
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
                        <a href="https://temporal.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Temporal (workflow engine)</a>
                        <a href="https://www.prefect.io/" target="_blank" rel="noreferrer" className="block text-blue-400 hover:text-blue-300 transition-colors">• Prefect</a>
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