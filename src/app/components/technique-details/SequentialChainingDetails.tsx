'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface SequentialChainingDetailsProps {
  selectedTechnique: any;
}

export const SequentialChainingDetails: React.FC<SequentialChainingDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Decompose task into stages with clear inputs/outputs.',
    'Design prompts per stage with schemas for structured outputs (JSON when possible).',
    'Execute step N → validate/normalize output → pass to step N+1.',
    'Add guardrails: retries, fallbacks, and assertions per step.',
    'Aggregate and polish final output; log metrics for each stage.'
  ];

  const bestPractices = [
    'Keep stage interfaces narrow: pass structured data (JSON/IDs) rather than prose.',
    'Validate outputs per stage with schemas/assertions; fail fast on malformed data.',
    'Use smaller/cheaper models for simple steps; reserve powerful models for complex reasoning.',
    'Implement retries with exponential backoff and circuit breakers for external dependencies.',
    'Log intermediate outputs for debugging; instrument latency and cost per stage.',
    'Design for graceful degradation: allow partial results when downstream stages fail.',
    'Cache deterministic stage outputs to improve performance and reduce costs.'
  ];

  const whenNotToUse = [
    'Simple, single-step tasks that don\'t benefit from decomposition.',
    'Highly interactive or real-time scenarios where latency must be minimized.',
    'Tasks where stages are tightly coupled and difficult to decompose cleanly.',
    'Resource-constrained environments where multiple model calls are prohibitive.'
  ];

  const commonPitfalls = [
    'Poor stage decomposition leading to tight coupling and error propagation.',
    'Overly verbose inter-stage communication causing token and latency bloat.',
    'Insufficient validation between stages allowing errors to compound.',
    'Missing fallback strategies when individual stages fail or timeout.',
    'Inadequate logging making it difficult to diagnose chain failures.',
    'Over-engineering with too many stages for simple tasks.'
  ];

  const keyFeatures = [
    'Linear pipeline with specialized stages for focused task execution',
    'Structured inter-stage communication with validation and error handling',
    'Modular design enabling independent testing and optimization of each stage',
    'Graceful error containment preventing single-point failures from cascading',
    'Transparent execution flow with comprehensive logging and monitoring',
    'Flexible model selection allowing cost optimization per stage complexity'
  ];

  const kpiMetrics = [
    'Task success rate: Pass/fail by acceptance tests per step and end-to-end.',
    'Factuality/accuracy: Human or automated evals on grounded fields.',
    'Latency per step / E2E: P50/P95 timings to identify bottlenecks.',
    'Cost per run: Input+output tokens × model rate across steps.',
    'Error containment: Rate of failures recovered via retries/fallbacks.',
    'Step regression score: A/B deltas when updating individual steps.'
  ];

  const tokenUsage = [
    'Estimate cost as sum of per-step input/output tokens × model rates. Control growth by passing only distilled fields, not full transcripts.',
    'Minimize carry-over: keep interfaces compact (IDs, keys, summaries).',
    'Use JSON mode and response formatting to avoid verbose prose.',
    'Cache stable intermediate results; memoize deterministic steps.',
    'Batch small requests where feasible; prefer smaller models upstream.'
  ];

  const bestUseCases = [
    'Complex multi-step analysis requiring specialized processing at each stage.',
    'Content generation workflows with distinct phases (research → outline → draft → edit).',
    'Data processing pipelines with validation, transformation, and enrichment steps.',
    'Decision-making processes requiring systematic evaluation of criteria.',
    'Document processing workflows with parsing, analysis, and summarization stages.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2022)', url: 'https://arxiv.org/abs/2201.11903' },
        { title: 'Self-Consistency Improves Chain of Thought Reasoning (Wang et al., 2022)', url: 'https://arxiv.org/abs/2203.11171' },
        { title: 'Least-to-Most Prompting Enables Complex Reasoning (Zhou et al., 2022)', url: 'https://arxiv.org/abs/2205.10625' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain Sequential Chains Documentation', url: 'https://python.langchain.com/docs/modules/chains/' },
        { title: 'OpenAI Chain Prompting Best Practices', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { title: 'Anthropic Claude Chain Implementation Guide', url: 'https://docs.anthropic.com/claude/docs/chain-prompts' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain SequentialChain and custom chain implementations', url: '#' },
        { title: 'LlamaIndex query pipelines with sequential processing', url: '#' },
        { title: 'Haystack sequential pipeline components', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LangChain Community - Chain patterns and best practices', url: 'https://discord.gg/langchain' },
        { title: 'r/MachineLearning - Prompt chaining discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'OpenAI Community - Sequential prompting techniques', url: 'https://community.openai.com/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-blue-500/10 to-purple-500/10"
        borderClass="border-blue-500/20"
      >
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

export default SequentialChainingDetails;