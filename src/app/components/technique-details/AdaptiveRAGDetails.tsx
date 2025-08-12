'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface AdaptiveRAGDetailsProps {
  selectedTechnique: any;
}

export const AdaptiveRAGDetails: React.FC<AdaptiveRAGDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Ingest query and context: user intent, domain, recency needs, access policy, session history.',
    'Route: classify complexity/freshness/domain; pick strategy (no-retrieval, single-pass, multi-hop) and components (retrievers, filters, reranker, compression).',
    'Retrieve: run hybrid search (semantic + lexical), apply filters (source, time), deduplicate, then cross-encode rerank.',
    'Prepare context: compress adaptively (extractive summaries/snippets), attach provenance, enforce token budgets.',
    'Generate: produce answer with instructions; assess faithfulness/uncertainty; if low-confidence or missing evidence, refine via query rewrite, scope expansion, or another hop.',
    'Finalize: produce answer with citations and structured output; log metrics and router decisions for evaluation.'
  ];

  const bestPractices = [
    'Start with a strong static RAG baseline; add routing only where it measurably helps (A/B by query cohorts).',
    'Use hybrid retrieval (BM25/keyword + embeddings) and a cross-encoder reranker; cap top_k before rerank.',
    'Train/calibrate the router with offline labels (easy/moderate/hard, freshness needed) and monitor drift.',
    'Adopt adaptive compression (extractive summaries, answer-focused snippets) to control tokens.',
    'Bound refinement loops (max hops/turns) and implement early-exit on high confidence with adequate citations.',
    'Apply temporal and source filters; enforce provenance and citation coverage in prompts/outputs.',
    'Log router decisions, retrieval quality, and generation metrics for continuous evaluation and improvement.'
  ];

  const whenNotToUse = [
    'Simple queries with stable knowledge where static RAG consistently performs well.',
    'Domains lacking sufficient training data to calibrate routing decisions effectively.',
    'Cost-sensitive applications where routing overhead exceeds the accuracy benefits.',
    'Real-time systems with strict latency constraints that cannot accommodate routing logic.'
  ];

  const commonPitfalls = [
    'Over-engineering the router without validating it improves performance on actual user queries.',
    'Insufficient routing training data leading to poor classification and suboptimal strategy selection.',
    'Complex routing logic that becomes a maintenance burden and source of bugs.',
    'Ignoring the computational overhead of routing, especially for high-throughput applications.',
    'Poor fallback handling when adaptive components fail or produce low-quality results.'
  ];

  const keyFeatures = [
    'Query-adaptive routing to optimal retrieval and generation strategies',
    'Hybrid search combining semantic and lexical retrieval methods',
    'Dynamic context compression based on query complexity and token budgets',
    'Multi-hop retrieval with iterative refinement for complex queries',
    'Uncertainty-based confidence assessment and adaptive response generation',
    'Comprehensive logging and metrics for continuous system improvement'
  ];

  const kpiMetrics = [
    'Answer quality improvements over static RAG baseline across query complexity tiers.',
    'Router accuracy: correct strategy selection rate vs. ground truth annotations.',
    'Retrieval precision and recall at different confidence thresholds.',
    'End-to-end latency and cost efficiency compared to always-complex strategies.',
    'Citation coverage: percentage of claims supported by retrieved evidence.',
    'User satisfaction scores segmented by query type and complexity.'
  ];

  const tokenUsage = [
    'Variable cost depending on routing decisions: no-retrieval < single-pass < multi-hop.',
    'Router overhead is typically 100-500 tokens for classification and strategy selection.',
    'Context compression reduces token usage by 20-60% compared to naive full-document inclusion.',
    'Multi-hop refinement can multiply costs 2-5x but improves quality on complex queries.',
    'Monitor cost distribution across query types to optimize routing thresholds.'
  ];

  const bestUseCases = [
    'Enterprise knowledge bases with varying query complexity and freshness requirements.',
    'Customer support systems handling both simple FAQs and complex troubleshooting.',
    'Research and analysis applications requiring adaptive depth based on topic complexity.',
    'Multi-domain RAG systems where different strategies work better for different domains.',
    'High-volume applications where routing can significantly optimize cost and latency.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Adaptive Retrieval and Scalable Indexing for k-NN Models (Izacard et al., 2023)', url: 'https://arxiv.org/abs/2305.15763' },
        { title: 'Active Retrieval Augmented Generation (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2305.06983' },
        { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain: Adaptive RAG with Routing', url: 'https://python.langchain.com/docs/use_cases/question_answering/how_to/routing' },
        { title: 'LlamaIndex: Query Routing and Strategy Selection', url: 'https://docs.llamaindex.ai/en/stable/module_guides/querying/router/' },
        { title: 'Haystack: Adaptive Pipelines', url: 'https://haystack.deepset.ai/tutorials/adaptive-rag' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LangChain Router Chains and conditional execution', url: '#' },
        { title: 'LlamaIndex Query Engines with adaptive components', url: '#' },
        { title: 'Haystack Pipeline routing and decision nodes', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'r/MachineLearning - RAG adaptation discussions', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'LangChain Community - Adaptive RAG patterns', url: 'https://discord.gg/langchain' },
        { title: 'Hugging Face Forums - Retrieval strategy discussions', url: 'https://discuss.huggingface.co/' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-green-500/10 to-emerald-500/10"
        borderClass="border-emerald-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed">
          Adaptive RAG uses a lightweight router to analyze each query (complexity, domain, freshness, safety) and dynamically
          choose the retrieval and generation strategy: no-retrieval for easy questions, single-pass hybrid retrieval for
          moderate ones, and multi-hop retrieval + reflection/refinement for complex tasks. It adjusts sources, filters,
          rerankers, and context compression based on real-time signals like uncertainty, coverage, and citation quality to
          balance accuracy, latency, and cost.
        </p>
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

export default AdaptiveRAGDetails;