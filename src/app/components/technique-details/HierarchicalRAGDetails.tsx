'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface HierarchicalRAGDetailsProps {
  selectedTechnique: any;
}

export const HierarchicalRAGDetails: React.FC<HierarchicalRAGDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Ingest & structure: parse documents into a tree (headings → sections → paragraphs/sentences); attach provenance and timestamps.',
    'Index per level: compute embeddings and optional summaries for each node; store parent–child links and section titles.',
    'Coarse retrieval: retrieve top parent nodes (documents/sections) using hybrid search; ensure coverage of major facets.',
    'Drill-down: within selected parents, retrieve child nodes (paragraphs/sentences) and re‑rank locally with cross‑encoders.',
    'Context assembly: deduplicate and pack evidence with citations; prefer extractive spans and concise summaries.',
    'Generate: prompt the LLM with the curated context; enforce citation and formatting requirements.',
    'Optional verify/refine: assess faithfulness/coverage; if low confidence, expand breadth/depth or reformulate query.'
  ];

  const bestPractices = [
    'Use structural chunking aligned to headings; include section titles and hierarchy metadata.',
    'Summarize parent nodes (short, information-dense) to improve coarse recall and reduce drill‑down breadth.',
    'Combine hybrid retrieval (BM25 + vectors) with cross‑encoder/LLM rerankers; cap k before rerank.',
    'Enforce provenance and citation coverage; prefer extractive spans over long free‑text summaries.',
    'Bound depth and children-per-parent; adopt early‑exit on high confidence to control tokens/latency.',
    'Incremental indexing and freshness policies; track data lag and invalidate stale nodes.',
    'Monitor retrieval distribution across hierarchy levels to optimize performance and coverage.'
  ];

  const whenNotToUse = [
    'Simple, flat documents where hierarchical structure adds unnecessary complexity.',
    'Real-time applications that cannot afford the overhead of multi-level retrieval.',
    'Domains where document structure is inconsistent or poorly defined.',
    'Use cases where fine-grained retrieval precision is not critical for answer quality.'
  ];

  const commonPitfalls = [
    'Poor structural parsing leading to incorrect hierarchy and broken parent-child relationships.',
    'Over-drilling into too many child nodes causing context explosion and relevance dilution.',
    'Inadequate parent-level summaries resulting in poor coarse retrieval coverage.',
    'Ignoring hierarchy metadata in ranking, treating all levels as equivalent.',
    'Insufficient freshness tracking leading to stale hierarchical indexes.',
    'Complex hierarchy management becoming a maintenance burden over time.'
  ];

  const keyFeatures = [
    'Multi-level document structuring with parent-child relationship preservation',
    'Coarse-to-fine retrieval strategy for efficient context discovery',
    'Level-aware reranking with cross-encoder models for precision',
    'Hierarchical summarization for compact context representation',
    'Citation tracking across multiple document levels and sections',
    'Adaptive depth control based on query complexity and confidence'
  ];

  const kpiMetrics = [
    'Retrieval coverage: proportion of relevant information captured at each hierarchy level.',
    'Context efficiency: information density and relevance per token in assembled context.',
    'Citation accuracy: correctness of source attribution across hierarchical levels.',
    'Query response quality: answer completeness and factual accuracy improvements.',
    'Retrieval precision: relevance of retrieved nodes at coarse and fine levels.',
    'Processing efficiency: time and computational cost per hierarchy level traversed.'
  ];

  const tokenUsage = [
    'Variable cost depending on hierarchy depth and breadth of retrieval.',
    'Parent-level summaries reduce token usage by 40-70% compared to full-text retrieval.',
    'Drill-down expansion can increase context size by 2-5x for complex queries.',
    'Cross-encoder reranking adds computational overhead but improves token efficiency.',
    'Monitor depth/breadth distribution and implement adaptive limits to control costs.'
  ];

  const bestUseCases = [
    'Large-scale document collections with clear hierarchical structure (manuals, reports, books).',
    'Technical documentation requiring both overview and detailed information retrieval.',
    'Legal and regulatory documents with complex sectional organization.',
    'Academic papers and research requiring multi-granularity information access.',
    'Enterprise knowledge bases with structured content hierarchies.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Hierarchical Text-Conditional Image Generation with CLIP Latents (Ramesh et al., 2022)', url: 'https://arxiv.org/abs/2204.06125' },
        { title: 'Learning Dense Representations for Entity Retrieval (Gillick et al., 2019)', url: 'https://arxiv.org/abs/1909.10506' },
        { title: 'Efficient Passage Retrieval with Hashing for Open-domain Question Answering', url: 'https://arxiv.org/abs/2106.00882' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LlamaIndex Hierarchical Node Parser', url: 'https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/modules/#hierarchicalnodeparser' },
        { title: 'LangChain Parent-Child Document Splitting', url: 'https://python.langchain.com/docs/modules/data_connection/document_transformers/parent_document_retriever' },
        { title: 'Haystack Hierarchical Document Processing', url: 'https://haystack.deepset.ai/tutorials/hierarchical-document-processing' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LlamaIndex with hierarchical node parsers and retrievers', url: '#' },
        { title: 'LangChain parent-child document retrieval systems', url: '#' },
        { title: 'Elasticsearch with nested document support', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LlamaIndex Community - Hierarchical retrieval patterns', url: 'https://discord.gg/dGcwcsnxhU' },
        { title: 'r/MachineLearning - Hierarchical document processing', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'LangChain Community - Document structuring discussions', url: 'https://discord.gg/langchain' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism"
        colorClass="bg-blue-500"
        gradient="from-amber-500/10 to-orange-500/10"
        borderClass="border-amber-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed">
          Hierarchical RAG organizes knowledge into multiple granularity levels (document → section → paragraph → sentence).
          Queries first retrieve coarse summaries at higher levels, then drill down into finer nodes to assemble compact,
          citation-ready context. Parent–child metadata and level-aware reranking preserve structure and improve faithfulness
          while controlling token budgets.
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

export default HierarchicalRAGDetails;