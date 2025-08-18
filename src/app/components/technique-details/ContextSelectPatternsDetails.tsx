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

interface ContextSelectPatternsDetailsProps {
  selectedTechnique: any;
}

export const ContextSelectPatternsDetails: React.FC<ContextSelectPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Task Analysis', detail: 'Extract context requirements from task specifications' },
      { num: '2', action: 'Semantic Search', detail: 'Perform similarity-based context retrieval' },
      { num: '3', action: 'Ranking & Scoring', detail: 'Apply relevance scoring and prioritization' },
      { num: '4', action: 'Assembly', detail: 'Dynamically compose selected context components' },
      { num: '5', action: 'Optimization', detail: 'Optimize for token budget and quality balance' }
    ],
    example: 'analyze_task → semantic_search → rank_relevance → assemble_context → optimize_budget'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use vector embeddings for semantic similarity matching', icon: '✅' },
    { type: 'do', text: 'Implement hybrid search combining semantic + keyword', icon: '✅' },
    { type: 'do', text: 'Cache frequently accessed context patterns', icon: '✅' },
    { type: 'do', text: 'Use relevance scoring with multiple criteria', icon: '✅' },
    { type: 'do', text: 'Implement dynamic context assembly based on task complexity', icon: '✅' },
    { type: 'dont', text: 'Rely solely on keyword matching for context selection', icon: '❌' },
    { type: 'dont', text: 'Select context without considering task relevance', icon: '❌' },
    { type: 'dont', text: 'Ignore token budget constraints during selection', icon: '❌' },
    { type: 'dont', text: 'Use static context selection for dynamic tasks', icon: '❌' },
    { type: 'dont', text: 'Skip quality assessment of retrieved context', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Knowledge-intensive applications',
      'Dynamic context curation needs',
      'Enterprise RAG implementations',
      'Intelligent search and retrieval systems'
    ],
    avoidWhen: [
      'Static context requirements',
      'Simple predefined knowledge bases',
      'High-latency sensitive applications',
      'Limited computational resources'
    ]
  };

  const keyMetrics = [
    { metric: 'Relevance Precision', measure: '% selected context actually relevant' },
    { metric: 'Context Coverage', measure: '% task requirements covered by selection' },
    { metric: 'Selection Speed', measure: 'Time to complete context assembly' },
    { metric: 'Token Efficiency', measure: 'Information density per token used' },
    { metric: 'Cache Hit Rate', measure: '% contexts served from cache' },
    { metric: 'Quality Score', measure: 'Human/automated quality assessment' }
  ];

  const topUseCases = [
    'Enterprise RAG: analyze_query → search_knowledge_base → rank_documents → assemble_context → optimize_tokens',
    'Research Assistant: identify_topics → semantic_retrieval → source_ranking → context_fusion → knowledge_synthesis',
    'Customer Support: analyze_issue → retrieve_solutions → score_relevance → compose_response → quality_check',
    'Code Assistant: parse_requirements → search_codebase → rank_examples → assemble_context → generate_solution',
    'Content Curation: understand_intent → multi_source_search → relevance_filtering → context_assembly → presentation_optimization'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' },
        { title: 'ColBERT: Efficient and Effective Passage Search (Khattab & Zaharia, 2020)', url: 'https://arxiv.org/abs/2004.12832' },
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Learning Dense Representations for Entity Retrieval (Yamada et al., 2019)', url: 'https://arxiv.org/abs/1909.10506' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Pinecone Vector Database - Semantic Search', url: 'https://docs.pinecone.io/' },
        { title: 'Weaviate - Vector Search Engine', url: 'https://weaviate.io/developers/weaviate' },
        { title: 'Elasticsearch - Search and Analytics Engine', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/' },
        { title: 'Qdrant - Vector Similarity Search Engine', url: 'https://qdrant.tech/documentation/' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'FAISS - Facebook AI Similarity Search', url: 'https://github.com/facebookresearch/faiss' },
        { title: 'Annoy - Approximate Nearest Neighbors', url: 'https://github.com/spotify/annoy' },
        { title: 'Sentence Transformers - Dense Vector Representations', url: 'https://github.com/UKPLab/sentence-transformers' },
        { title: 'Haystack - End-to-End NLP Framework', url: 'https://github.com/deepset-ai/haystack' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Vector Database Community', url: 'https://www.reddit.com/r/VectorDatabase/' },
        { title: 'Information Retrieval Community', url: 'https://sigir.org/' },
        { title: 'Semantic Search Best Practices', url: 'https://github.com/pinecone-io/examples' },
        { title: 'RAG Implementation Patterns', url: 'https://blog.langchain.dev/tag/rag/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Dynamic retrieval and assembly of relevant context through RAG, semantic search, and intelligent context curation"
        why="Enables precise context selection from large knowledge bases with optimal relevance and token efficiency"
        keyInsight="Semantic similarity with intelligent ranking delivers contextually relevant information within token constraints"
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

export default ContextSelectPatternsDetails;