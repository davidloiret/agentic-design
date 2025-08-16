'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface GraphRAGDetailsProps {
  selectedTechnique: any;
}

export const GraphRAGDetails: React.FC<GraphRAGDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Extract & Build', detail: 'NER/RE to extract entities and relations, build knowledge graph' },
      { num: '2', action: 'Index & Store', detail: 'Create graph indexes and hybrid text-vector search capabilities' },
      { num: '3', action: 'Query & Map', detail: 'Parse query entities and map to graph nodes' },
      { num: '4', action: 'Traverse & Retrieve', detail: 'Multi-hop graph traversal with bounded expansion' },
      { num: '5', action: 'Assemble & Generate', detail: 'Serialize graph context and generate response' }
    ],
    example: 'query → entity_linking → graph_traversal → subgraph_assembly → llm_generation → response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement community detection algorithms for large-scale graph summarization', icon: '✅' },
    { type: 'do', text: 'Use hierarchical indexing with global and local community summaries', icon: '✅' },
    { type: 'do', text: 'Apply entity resolution and deduplication to maintain graph quality', icon: '✅' },
    { type: 'do', text: 'Combine vector search with graph traversal for hybrid retrieval', icon: '✅' },
    { type: 'do', text: 'Implement bounded traversal with explicit hop limits (1-3 hops)', icon: '✅' },
    { type: 'dont', text: 'Allow uncontrolled graph traversal that leads to context explosion', icon: '❌' },
    { type: 'dont', text: 'Skip entity linking validation and confidence scoring', icon: '❌' },
    { type: 'dont', text: 'Neglect graph maintenance and consistency validation', icon: '❌' },
    { type: 'dont', text: 'Create overly complex schemas that hinder query performance', icon: '❌' },
    { type: 'dont', text: 'Ignore provenance tracking for graph edges and entity sources', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex multi-hop reasoning requiring entity relationship understanding',
      'Knowledge-intensive domains with rich interconnected information',
      'Enterprise data with well-defined entity schemas and relationships',
      'Fact-checking and verification requiring structured evidence paths',
      'Large-scale knowledge bases needing hierarchical summarization'
    ],
    avoidWhen: [
      'Simple factual queries adequately served by document-based RAG',
      'Domains with poor entity extraction and relation modeling quality',
      'Real-time applications with strict latency requirements',
      'Small datasets where graph complexity exceeds retrieval benefits',
      'Applications lacking well-defined entity schemas or ontologies'
    ]
  };

  const keyMetrics = [
    { metric: 'Graph Construction Quality', measure: 'Precision/recall of extracted entities and relations' },
    { metric: 'Community Detection Accuracy', measure: 'Coherence and relevance of detected communities' },
    { metric: 'Retrieval Relevance', measure: 'Proportion of relevant subgraphs in query results' },
    { metric: 'Multi-hop Reasoning', measure: 'Accuracy of complex relationship inference' },
    { metric: 'Context Completeness', measure: 'Coverage of relevant graph neighborhoods' },
    { metric: 'Query Response Time', measure: 'End-to-end latency including graph operations' }
  ];

  const topUseCases = [
    'Biomedical Research: Drug-disease-gene relationship exploration with scientific literature integration',
    'Financial Analysis: Company-industry-market relationship modeling for investment research',
    'Legal Research: Case law relationship mapping with precedent and citation analysis',
    'Enterprise Knowledge: Organizational relationship modeling with department and project connections',
    'Academic Research: Citation networks and research collaboration graph analysis'
  ];

  const references = [
    {
      title: 'Foundational Papers & Microsoft GraphRAG',
      items: [
        { title: 'From Local to Global: A Graph RAG Approach to Query-Focused Summarization (Edge et al., 2024)', url: 'https://arxiv.org/abs/2404.16130' },
        { title: 'GraphRAG: Unlocking LLM Discovery on Narrative Private Data (Microsoft Research, 2024)', url: 'https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Knowledge Graph-Enhanced Large Language Models via Path Selection (Wang et al., 2023)', url: 'https://arxiv.org/abs/2308.12050' }
      ]
    },
    {
      title: 'Community Detection & Graph Algorithms',
      items: [
        { title: 'Leiden Algorithm for Community Detection in Large Networks (Traag et al., 2019)', url: 'https://arxiv.org/abs/1810.08473' },
        { title: 'Fast Unfolding of Communities in Large Networks (Blondel et al., 2008)', url: 'https://arxiv.org/abs/0803.0476' },
        { title: 'Graph Neural Networks: A Review of Methods and Applications (Zhou et al., 2020)', url: 'https://arxiv.org/abs/1812.08434' },
        { title: 'Network Analysis and Graph Theory in Python (NetworkX Documentation)', url: 'https://networkx.org/documentation/stable/' }
      ]
    },
    {
      title: 'Knowledge Graph Construction & NER/RE',
      items: [
        { title: 'REBEL: Relation Extraction By End-to-end Language generation (Huguet Cabot & Navigli, 2021)', url: 'https://arxiv.org/abs/2104.07650' },
        { title: 'spaCy: Industrial-Strength Natural Language Processing', url: 'https://spacy.io/' },
        { title: 'OpenIE: Open Information Extraction (Banko et al., 2007)', url: 'https://aclanthology.org/P07-1047/' },
        { title: 'Stanford CoreNLP: A Java suite of core NLP tools', url: 'https://stanfordnlp.github.io/CoreNLP/' }
      ]
    },
    {
      title: 'Graph Database & Storage Solutions',
      items: [
        { title: 'Neo4j Graph Database: Developer Guide and Best Practices', url: 'https://neo4j.com/developer/' },
        { title: 'ArangoDB Multi-Model Database with Graph Capabilities', url: 'https://www.arangodb.com/' },
        { title: 'Amazon Neptune: Fully Managed Graph Database Service', url: 'https://aws.amazon.com/neptune/' },
        { title: 'TigerGraph: Scalable Graph Analytics Platform', url: 'https://www.tigergraph.com/' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'Microsoft GraphRAG Official Implementation and Documentation', url: 'https://github.com/microsoft/graphrag' },
        { title: 'LangChain Graph RAG Integration and Examples', url: 'https://python.langchain.com/docs/use_cases/graph/graph_rag' },
        { title: 'LlamaIndex Knowledge Graph Implementation', url: 'https://docs.llamaindex.ai/en/stable/examples/index_structs/knowledge_graph/' },
        { title: 'Neo4j Vector Search and Graph RAG Tutorial', url: 'https://neo4j.com/developer/graph-data-science/applied-graph-ml/applied-graph-ml-rag/' }
      ]
    },
    {
      title: 'Evaluation & Benchmarking',
      items: [
        { title: 'HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering', url: 'https://arxiv.org/abs/1809.09600' },
        { title: 'ComplexWebQuestions: Multi-hop Question Answering over Knowledge Graphs', url: 'https://arxiv.org/abs/1803.06643' },
        { title: 'KGQA: Knowledge Graph Question Answering Benchmark', url: 'https://github.com/salesforce/WikiTableQuestions' },
        { title: 'Graph-based RAG Evaluation Metrics and Frameworks', url: 'https://github.com/explodinggradients/ragas' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Knowledge graph-based RAG with community detection and hierarchical summarization for large-scale reasoning"
        why="Enables complex multi-hop reasoning and relationship understanding through structured graph traversal"
        keyInsight="Microsoft's approach uses community detection algorithms to create hierarchical summaries for global and local reasoning"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default GraphRAGDetails;