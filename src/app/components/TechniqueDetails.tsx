import React from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play } from 'lucide-react';
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
  detailsTab: 'overview' | 'flow' | 'interactive' | 'code';
  setDetailsTab: (tab: 'overview' | 'flow' | 'interactive' | 'code') => void;
  selectedLanguage: LanguageType;
  setSelectedLanguage: (lang: LanguageType) => void;
}

export const TechniqueDetails = ({
  selectedTechnique,
  categories,
  useCases,
  detailsTab,
  setDetailsTab,
  selectedLanguage,
  setSelectedLanguage,
}: TechniqueDetailsProps) => {
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
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 border-b border-gray-700/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-800/60 rounded-2xl flex items-center justify-center text-2xl">
                {selectedTechnique.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {selectedTechnique.name}
                    {selectedTechnique.abbr && (
                      <span className="text-lg ml-2 text-gray-400 font-normal">({selectedTechnique.abbr})</span>
                    )}
                  </h1>
                  <p className="text-gray-300 text-base leading-relaxed mb-3">{selectedTechnique.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${selectedTechnique.color} text-white`}>
                      Complexity: {selectedTechnique.complexity}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800/60 text-gray-200">
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
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setDetailsTab('overview')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'overview'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setDetailsTab('flow')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'flow'
                  ? 'text-orange-400 border-orange-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <GitBranch className="w-4 h-4 inline mr-2" />
              Flow Visualization
            </button>
            <button
              onClick={() => setDetailsTab('interactive')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'interactive'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Interactive Demo
            </button>
            <button
              onClick={() => setDetailsTab('code')}
              className={`py-4 px-2 font-medium transition-all border-b-2 ${
                detailsTab === 'code'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Playground
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6">
          {detailsTab === 'overview' ? (
            <div className="space-y-8">
              {/* Video Explanation - Only for Chain of Thought */}
              {selectedTechnique.id === 'cot' && (
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                    Video Explanation
                  </h2>
                  <div className="mb-8">
                    <RemotionPlayer 
                      compositionId="ChainOfThoughtWithAudio" 
                      className="w-full"
                    />
                  </div>
                </section>
              )}

              {/* What is this pattern? */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  What is {selectedTechnique.name}?
                </h2>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                  <p className="text-gray-200 text-base leading-relaxed mb-4">
                    {selectedTechnique.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-2xl mb-2">{selectedTechnique.icon}</div>
                      <div className="text-sm text-gray-400">Pattern Type</div>
                      <div className="text-sm font-medium text-white">
                        {categories.find(c => c.id === selectedTechnique.category)?.name || 'Design Pattern'}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-2xl mb-2">
                        {selectedTechnique.complexity === 'low' ? '🟢' : 
                         selectedTechnique.complexity === 'medium' ? '🟡' : '🔴'}
                      </div>
                      <div className="text-sm text-gray-400">Complexity</div>
                      <div className="text-sm font-medium text-white capitalize">
                        {selectedTechnique.complexity}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-sm text-gray-400">Use Cases</div>
                      <div className="text-sm font-medium text-white">
                        {selectedTechnique.useCases.length} scenarios
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="text-sm text-gray-400">Features</div>
                      <div className="text-sm font-medium text-white">
                        {selectedTechnique.features?.length || 0} features
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How it Works */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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

              {/* Key Features */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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

              {/* Best Use Cases */}
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Self-Consistency Improves Chain of Thought Reasoning
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Tree of Thoughts: Deliberate Problem Solving with Large Language Models
                        </a>
                      </div>
                    </div>

                    {/* Implementation Guides */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-green-400">🛠️</span>
                        Implementation Guides
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • OpenAI Cookbook - Techniques for improving reliability
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Anthropic Constitutional AI Research
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Best Practices for Prompt Engineering
                        </a>
                      </div>
                    </div>

                    {/* Tools & Libraries */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-purple-400">⚙️</span>
                        Tools & Libraries
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • LangChain - Framework for developing applications
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • Guidance - Language model programming framework
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • DSPy - Programming framework for LMs
                        </a>
                      </div>
                    </div>

                    {/* Community Resources */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="text-cyan-400">👥</span>
                        Community & Discussions
                      </h4>
                      <div className="space-y-2 text-sm">
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • r/MachineLearning - Pattern discussions
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • AI Safety Forum - Reasoning techniques
                        </a>
                        <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                          • GitHub - Awesome Prompt Engineering
                        </a>
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
                  Step-by-Step Flow Visualization
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
                          : 'Hands-on demonstration of the technique'
                        }
                      </span>
                      <span className="text-xs text-gray-500">
                        {selectedTechnique.id === 'feedback-chaining' || selectedTechnique.id === 'hierarchical-chaining' || selectedTechnique.id === 'iterative-refinement' || selectedTechnique.id === 'parallel-synthesis' || selectedTechnique.id === 'dynamic-routing' || selectedTechnique.id === 'dynamic-context-assembly' || selectedTechnique.id === 'message-queuing' || selectedTechnique.id === 'latent-memory-networks' || selectedTechnique.id === 'adaptive-context-depth' || selectedTechnique.id === 'latent-knowledge-retrieval' || selectedTechnique.id === 'context-compression-advanced' || selectedTechnique.id === 'multimodal-context-integration' || selectedTechnique.id === 'sliding-window' || selectedTechnique.id === 'hierarchical-memory' || selectedTechnique.id === 'attention-mechanisms' || selectedTechnique.id === 'memory-consolidation' || selectedTechnique.id === 'working-memory-patterns' || selectedTechnique.id === 'content-based-routing' || selectedTechnique.id === 'capability-routing' || selectedTechnique.id === 'load-balancing' || selectedTechnique.id === 'geographic-routing' || selectedTechnique.id === 'map-reduce' || selectedTechnique.id === 'scatter-gather' || selectedTechnique.id === 'fork-join' || selectedTechnique.id === 'async-await' || selectedTechnique.id === 'self-critique' || selectedTechnique.id === 'function-calling' || selectedTechnique.id === 'code-execution' || selectedTechnique.id === 'hierarchical-planning' || selectedTechnique.id === 'goal-decomposition' || selectedTechnique.id === 'constraint-satisfaction' || selectedTechnique.id === 'scenario-planning' || selectedTechnique.id === 'sequential-chaining' || selectedTechnique.id === 'parallel-chaining' || selectedTechnique.id === 'conditional-chaining' ? 'Interactive demo available' : 'Demo coming soon'}
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
          ) : (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Code Playground
                </h2>
                <div className="flex gap-2">
                  {(['typescript', 'python', 'rust'] as LanguageType[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
          )}
        </div>
      </div>
    </div>
  );
};