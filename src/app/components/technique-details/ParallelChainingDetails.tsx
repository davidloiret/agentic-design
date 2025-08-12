'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface ParallelChainingDetailsProps {
  selectedTechnique: any;
}

export const ParallelChainingDetails: React.FC<ParallelChainingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Decompose task into independent parallel branches with clear input specifications.',
    'Design prompts for each branch with consistent output schemas (JSON preferred).',
    'Execute branches concurrently with timeout and error handling per worker.',
    'Implement aggregation strategy: voting, weighted scoring, or heuristic merging.',
    'Validate merged output and provide fallback mechanisms for partial results.'
  ];

  const bestPractices = [
    'Cap fan-out and enforce per-run token budgets with guardrails to prevent cost explosion.',
    'Use timeouts and gracefully handle partial results to bound latency and cost.',
    'Prefer smaller/cheaper models for parallel legs; reserve strongest model for final merge.',
    'Batch requests where supported; deduplicate prompts; share context via IDs not full text.',
    'Implement backoff for rate limits and use queuing/backpressure for high-throughput scenarios.',
    'Cache stable or reusable worker results across runs to improve efficiency.',
    'Monitor agreement scores and useful-result ratios to optimize parallel branch design.'
  ];

  const whenNotToUse = [
    'Tasks where branches have strong dependencies and cannot be parallelized effectively.',
    'Simple problems where sequential processing is sufficient and parallel overhead is unjustified.',
    'Rate-limited scenarios where concurrent requests would cause throttling or increased costs.',
    'Cases where result diversity is undesirable and consistency is more important than speed.'
  ];

  const commonPitfalls = [
    'Poor branch decomposition leading to redundant work or missing coverage.',
    'Inadequate aggregation strategy causing loss of quality or important information.',
    'Ignoring rate limits and burst capacity, causing throttling or failed requests.',
    'Over-parallelization leading to diminishing returns and unnecessary cost increases.',
    'Insufficient error handling for partial failures leaving gaps in final results.',
    'Poor result merging causing inconsistencies or conflicts in final output.'
  ];

  const keyFeatures = [
    'Concurrent execution with fan-out/fan-in architecture for reduced latency',
    'Multiple aggregation strategies: voting, scoring, and intelligent merging',
    'Timeout handling and graceful degradation with partial results',
    'Rate limit awareness and backpressure management for high throughput',
    'Flexible branch design allowing different models and prompting strategies',
    'Comprehensive monitoring of agreement scores and worker success rates'
  ];

  const kpiMetrics = [
    'Wall-clock speedup: Speedup vs sequential baseline for same task quality.',
    'Throughput: Tasks per minute at target concurrency (P50/P95).',
    'Agreement score: Consensus/majority agreement or pairwise similarity.',
    'Useful-result ratio: Valid/non-empty worker outputs divided by total.',
    'Tail latency: P95 time-to-aggregate with partials tolerated.',
    'Cost per run: Sum of all worker tokens + merge cost.'
  ];

  const tokenUsage = [
    'Total tokens scale with fan-out: sum of all parallel worker inputs/outputs plus aggregation. Plan for burst concurrency within rate limits and budgets.',
    'Cap fan-out and enforce per-run token budgets with guardrails.',
    'Use timeouts and accept partial results to bound cost and latency.',
    'Prefer smaller/cheaper models for parallel legs; reserve strongest model for final merge.',
    'Batch where supported; deduplicate prompts; share context via IDs rather than full text.',
    'Implement backoff for rate limits and use queuing/backpressure.',
    'Cache stable or reusable worker results across runs.'
  ];

  const bestUseCases = [
    'Multi-perspective analysis requiring diverse viewpoints on the same problem.',
    'High-throughput processing where latency reduction justifies increased resource usage.',
    'Consensus building tasks where multiple opinions need to be synthesized.',
    'Creative tasks benefiting from diverse approaches and idea generation.',
    'Quality assurance scenarios using multiple validators or reviewers.',
    'Research synthesis combining insights from multiple specialized perspectives.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)', url: 'https://arxiv.org/abs/2212.08073' },
        { title: 'Training Language Models to Follow Instructions with Human Feedback (Ouyang et al., 2022)', url: 'https://arxiv.org/abs/2203.02155' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Parallel Processing with LCEL', url: 'https://python.langchain.com/docs/expression_language/how_to/parallel' },
        { title: 'OpenAI Batch API for Parallel Processing', url: 'https://platform.openai.com/docs/guides/batch' },
        { title: 'Anthropic Parallel Request Patterns', url: 'https://docs.anthropic.com/claude/docs/parallel-processing' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain RunnableParallel for concurrent execution', url: '#' },
        { title: 'asyncio and aiohttp for Python async processing', url: '#' },
        { title: 'Promise.all() for JavaScript parallel processing', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Parallel processing patterns', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Parallel prompting strategies', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Batch processing discussions', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-green-500/10 to-blue-500/10"
        borderClass="border-green-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Parallel chaining executes multiple independent prompts concurrently, then merges results via aggregation 
          strategies (e.g., majority vote, weighted scoring, map-reduce, or heuristic merge). It trades higher burst 
          resource usage for lower wall-clock latency and broader coverage.
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
            <div className="text-sm font-medium text-white">Higher burst usage</div>
          </div>
        </div>
      </TechniqueSection>

      {/* Workflow / Steps */}
      <ListSection
        title="Workflow / Steps"
        items={workflowSteps}
        colorClass="bg-purple-500"
        ordered={true}
      />

      {/* Best Practices */}
      <BestPracticesSection practices={bestPractices} />

      {/* When NOT to Use */}
      <ListSection
        title="When NOT to Use"
        items={whenNotToUse}
        colorClass="bg-red-500"
      />

      {/* Common Pitfalls */}
      <ListSection
        title="Common Pitfalls"
        items={commonPitfalls}
        colorClass="bg-amber-500"
      />

      {/* Key Features */}
      <KeyFeaturesSection features={keyFeatures} />

      {/* KPIs / Success Metrics */}
      <ListSection
        title="KPIs / Success Metrics"
        items={kpiMetrics}
        colorClass="bg-emerald-500"
      />

      {/* Token / Resource Usage */}
      <ListSection
        title="Token / Resource Usage"
        items={tokenUsage}
        colorClass="bg-indigo-500"
      />

      {/* Best Use Cases */}
      <ListSection
        title="Best Use Cases"
        items={bestUseCases}
        colorClass="bg-fuchsia-500"
      />

      {/* References & Further Reading */}
      <ReferencesSection categories={references} />
    </>
  );
};

export default ParallelChainingDetails;