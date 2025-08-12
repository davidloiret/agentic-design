'use client';

import React from 'react';
import TechniqueSection from './TechniqueSection';
import BestPracticesSection from './BestPracticesSection';
import ListSection from './ListSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ReferencesSection from './ReferencesSection';

interface GraphRAGDetailsProps {
  selectedTechnique: any;
}

export const GraphRAGDetails: React.FC<GraphRAGDetailsProps> = ({ selectedTechnique }) => {
  const workflowSteps = [
    'Ingestion: NER/RE to extract entities and relations; canonicalize with ontology/schema; de‑duplicate.',
    'Graph construction: upsert nodes/edges; attach provenance, timestamps, and confidence scores.',
    'Indexing: build graph indexes (IDs, labels, adjacency), hybrid text/vector indexes for nodes/docs.',
    'Query understanding: detect entities/intent; map to node IDs; choose traversal strategy.',
    'Retrieval: bounded multi‑hop traversal + neighborhood expansion; optional hybrid re‑rank.',
    'Context assembly: summarize paths, merge evidence, dedupe, and format as factual statements.',
    'Generation: prompt LLM with query + structured graph context; optionally cite sources.',
    'Post‑processing: verify/critique, add citations, cache results, and update feedback signals.'
  ];

  const bestPractices = [
    'Keep traversals shallow by default (1–2 hops) with explicit caps; expand only on uncertainty.',
    'Preserve provenance on every node/edge; make citations first‑class in prompts and outputs.',
    'Combine graph traversal with vector search for recall, then re‑rank on path relevance.',
    'Normalize schemas and entity IDs; resolve aliases; prevent node duplication at ingest.',
    'Continuously validate graph quality (consistency rules, temporal sanity, schema constraints).',
    'Introduce caching at multiple layers: entity mapping, subgraph retrieval, and context summaries.',
    'Implement access controls and privacy filters at the graph level for sensitive data.'
  ];

  const whenNotToUse = [
    'Simple factual queries where document-based RAG provides sufficient context.',
    'Domains where entity extraction and relation modeling are unreliable or low-quality.',
    'Real-time applications that cannot afford the overhead of graph traversal and assembly.',
    'Use cases where the complexity of graph maintenance exceeds the retrieval benefits.'
  ];

  const commonPitfalls = [
    'Poor entity resolution leading to fragmented or duplicate nodes in the graph.',
    'Uncontrolled traversal explosion causing performance issues and irrelevant context.',
    'Low-quality relation extraction creating noisy or incorrect graph connections.',
    'Inadequate schema design leading to inconsistent or hard-to-query graph structures.',
    'Neglecting graph maintenance, resulting in stale or inconsistent knowledge over time.'
  ];

  const keyFeatures = [
    'Knowledge graph construction from unstructured text and documents',
    'Multi-hop traversal with bounded expansion for contextual retrieval',
    'Entity and relation extraction with confidence scoring and provenance',
    'Hybrid text-vector indexing for efficient graph search and retrieval',
    'Path-based evidence assembly with structured context generation',
    'Schema normalization and entity resolution for consistent knowledge representation'
  ];

  const kpiMetrics = [
    'Graph quality: precision/recall of extracted entities and relations vs. gold standard.',
    'Retrieval relevance: proportion of retrieved subgraphs that contain query-relevant information.',
    'Answer accuracy: factual correctness and completeness compared to ground truth.',
    'Path coherence: logical consistency and relevance of multi-hop reasoning chains.',
    'Citation coverage: percentage of generated claims supported by graph evidence.',
    'Query response time: end-to-end latency including graph traversal and context assembly.'
  ];

  const tokenUsage = [
    'Variable cost depending on subgraph size and path complexity.',
    'Entity linking and graph traversal add 200-1000 tokens for context assembly.',
    'Path serialization can consume significant tokens for complex multi-hop queries.',
    'Context compression through summarization reduces token usage by 30-60%.',
    'Monitor subgraph size distribution and implement traversal limits to control costs.'
  ];

  const bestUseCases = [
    'Knowledge-intensive domains requiring explicit entity and relation modeling.',
    'Multi-hop reasoning tasks where document fragments lack sufficient context.',
    'Enterprise knowledge graphs with complex interconnected information.',
    'Fact-checking and verification applications needing structured evidence paths.',
    'Research and analysis requiring comprehensive entity relationship exploration.'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Microsoft GraphRAG: A Modular Graph-based Retrieval-Augmented Generation System', url: 'https://arxiv.org/abs/2404.16130' },
        { title: 'Knowledge Graph-Enhanced Large Language Models via Path Selection (Wang et al., 2023)', url: 'https://arxiv.org/abs/2308.12050' },
        { title: 'Reasoning on Graphs: Faithful and Interpretable Large Language Model Reasoning (Luo et al., 2023)', url: 'https://arxiv.org/abs/2310.01061' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft GraphRAG Official Implementation', url: 'https://github.com/microsoft/graphrag' },
        { title: 'LangChain Graph RAG Implementation', url: 'https://python.langchain.com/docs/use_cases/graph/graph_rag' },
        { title: 'Neo4j Knowledge Graph RAG Tutorial', url: 'https://neo4j.com/developer/graph-data-science/applied-graph-ml/applied-graph-ml-rag/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Neo4j graph database with vector search capabilities', url: '#' },
        { title: 'NetworkX for graph processing and analysis in Python', url: '#' },
        { title: 'SpaCy and REBEL for entity and relation extraction', url: '#' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Neo4j Community Forum - Graph RAG discussions', url: 'https://community.neo4j.com/' },
        { title: 'r/MachineLearning - Graph-based retrieval', url: 'https://www.reddit.com/r/MachineLearning/' },
        { title: 'LangChain Community - Graph RAG implementations', url: 'https://discord.gg/langchain' }
      ]
    }
  ];

  return (
    <>
      {/* Core Mechanism */}
      <TechniqueSection
        title="Core Mechanism (short conceptual overview)"
        colorClass="bg-blue-500"
        gradient="from-blue-500/10 to-purple-500/10"
        borderClass="border-blue-500/20"
      >
        <p className="text-gray-200 text-base leading-relaxed">
          Retrieval‑augmented generation over a knowledge graph. The system extracts entities/relations, retrieves a
          relevant subgraph via graph traversal (often 1–2 hops plus neighborhood expansion), serializes salient facts/paths,
          and conditions the LLM on that structured context to produce grounded, relation‑aware answers.
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

export default GraphRAGDetails;