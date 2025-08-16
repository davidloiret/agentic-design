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

interface AdvancedRagDetailsProps {
  selectedTechnique: any;
}

export const AdvancedRagDetails: React.FC<AdvancedRagDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Pre-process', detail: 'Query expansion, rewriting, routing' },
      { num: '2', action: 'Multi-retrieve', detail: 'Multiple retrieval strategies and sources' },
      { num: '3', action: 'Rerank', detail: 'Neural rerankers (BGE, Cohere, etc.)' },
      { num: '4', action: 'Filter', detail: 'Relevance scoring and context selection' },
      { num: '5', action: 'Generate', detail: 'Context-optimized generation with citations' }
    ],
    example: 'expand_query → multi_retrieve → neural_rerank → filter_context → generate_with_citations'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement query expansion (HyDE, query2doc)', icon: '✅' },
    { type: 'do', text: 'Use neural rerankers (BGE-reranker, Cohere rerank)', icon: '✅' },
    { type: 'do', text: 'Apply sentence window retrieval for context preservation', icon: '✅' },
    { type: 'do', text: 'Implement relevance filtering with confidence thresholds', icon: '✅' },
    { type: 'do', text: 'Use multiple embedding models for retrieval diversity', icon: '✅' },
    { type: 'dont', text: 'Skip query preprocessing and expansion', icon: '❌' },
    { type: 'dont', text: 'Rely solely on semantic similarity for ranking', icon: '❌' },
    { type: 'dont', text: 'Ignore document quality and freshness signals', icon: '❌' },
    { type: 'dont', text: 'Over-retrieve without proper filtering mechanisms', icon: '❌' },
    { type: 'dont', text: 'Neglect context window optimization', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Production RAG systems requiring high accuracy',
      'Complex queries needing contextual understanding',
      'Large knowledge bases with noisy content',
      'Multi-domain or heterogeneous data sources',
      'Applications requiring source attribution'
    ],
    avoidWhen: [
      'Simple factual Q&A with clean data',
      'Resource-constrained environments',
      'Real-time applications (<100ms latency)',
      'Small knowledge bases with high-quality content',
      'Proof-of-concept or prototype systems'
    ]
  };

  const keyMetrics = [
    { metric: 'Retrieval Precision', measure: 'Relevant docs in top-k after reranking' },
    { metric: 'Answer Faithfulness', measure: 'Generated content grounded in retrieved docs' },
    { metric: 'Context Relevance', measure: 'Retrieved context relevance to query' },
    { metric: 'Reranking Effectiveness', measure: 'NDCG@k improvement vs base retrieval' },
    { metric: 'Query Understanding', measure: 'Semantic similarity after expansion/rewriting' },
    { metric: 'End-to-End Latency', measure: 'Including pre-processing and reranking overhead' }
  ];

  const topUseCases = [
    'Enterprise Search: Complex queries over large corporate knowledge bases with reranking',
    'Legal Research: Multi-hop reasoning over case law with query expansion and relevance filtering',
    'Medical Q&A: Clinical queries with domain-specific rerankers and confidence scoring',
    'Technical Documentation: Developer queries with code-aware retrieval and context optimization',
    'Research Assistant: Academic queries with citation tracking and multi-source retrieval'
  ];

  const references = [
    {
      title: 'Advanced RAG Surveys & Frameworks',
      items: [
        { title: 'Retrieval-Augmented Generation for Large Language Models: A Survey (Gao et al., 2023)', url: 'https://arxiv.org/abs/2312.10997' },
        { title: 'Seven Failure Points When Engineering a Retrieval Augmented Generation System (Barnett et al., 2024)', url: 'https://arxiv.org/abs/2401.05856' },
        { title: 'RAG vs Fine-tuning: Pipelines, Tradeoffs, and a Case Study (Ovadia et al., 2023)', url: 'https://arxiv.org/abs/2401.08406' },
        { title: 'A Comprehensive Survey of RAG: Evolution and Future Directions (Gupta et al., 2024)', url: 'https://arxiv.org/abs/2410.12837' }
      ]
    },
    {
      title: 'Query Enhancement & Preprocessing',
      items: [
        { title: 'Hypothetical Document Embeddings (HyDE) for Retrieval (Gao et al., 2022)', url: 'https://arxiv.org/abs/2212.10496' },
        { title: 'Query2doc: Query Expansion with Large Language Models (Wang et al., 2023)', url: 'https://arxiv.org/abs/2303.07678' },
        { title: 'Rewrite-Retrieve-Read: Multi-Query Document Retrieval (Ma et al., 2023)', url: 'https://arxiv.org/abs/2305.14283' },
        { title: 'Active Retrieval Augmented Generation (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2305.06983' }
      ]
    },
    {
      title: 'Neural Reranking & Relevance Scoring',
      items: [
        { title: 'BGE M3-Embedding: Multi-Lingual, Multi-Functionality, Multi-Granularity (Chen et al., 2024)', url: 'https://arxiv.org/abs/2402.03216' },
        { title: 'FlagEmbedding: Dense Retrieval and Retrieval-augmented LLMs (BAAI, 2023)', url: 'https://github.com/FlagOpen/FlagEmbedding' },
        { title: 'RankLLaMA: Reranking with Large Language Models (Ma et al., 2023)', url: 'https://arxiv.org/abs/2309.15088' },
        { title: 'Cohere Rerank API Documentation and Best Practices', url: 'https://docs.cohere.com/docs/reranking' }
      ]
    },
    {
      title: 'Context Optimization & Chunking',
      items: [
        { title: 'Lost in the Middle: How Language Models Use Long Contexts (Liu et al., 2023)', url: 'https://arxiv.org/abs/2307.03172' },
        { title: 'LongLLMLingua: Accelerating Large Language Model Inference via Prompt Compression (Jiang et al., 2023)', url: 'https://arxiv.org/abs/2310.06839' },
        { title: 'Sentence Window Retrieval: LlamaIndex Implementation', url: 'https://docs.llamaindex.ai/en/stable/examples/node_postprocessor/SentenceWindowNodePostprocessor/' },
        { title: 'Recursive Character Text Splitter: LangChain Documentation', url: 'https://python.langchain.com/docs/how_to/recursive_text_splitter/' }
      ]
    },
    {
      title: 'Implementation Frameworks & Tools',
      items: [
        { title: 'LlamaIndex Advanced RAG Techniques Documentation', url: 'https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/' },
        { title: 'LangChain Multi-Vector Retriever Implementation', url: 'https://python.langchain.com/docs/how_to/multi_vector/' },
        { title: 'Haystack Advanced Retrieval Pipelines', url: 'https://docs.haystack.deepset.ai/docs/retrieval_augmentation' },
        { title: 'Weaviate Hybrid Search (Dense + Sparse) Documentation', url: 'https://weaviate.io/developers/weaviate/search/hybrid' }
      ]
    },
    {
      title: 'Evaluation & Benchmarking',
      items: [
        { title: 'RAGAS: Automated Evaluation of RAG Applications', url: 'https://github.com/explodinggradients/ragas' },
        { title: 'BEIR: Heterogeneous Benchmark for Information Retrieval (Thakur et al., 2021)', url: 'https://arxiv.org/abs/2104.08663' },
        { title: 'RGB: A Comprehensive Evaluation Benchmark for RAG Systems (Chen et al., 2024)', url: 'https://arxiv.org/abs/2309.01431' },
        { title: 'TruLens for RAG: Evaluation and Observability Framework', url: 'https://www.trulens.org/trulens_eval/getting_started/quickstarts/quickstart/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Enhanced retrieval pipeline with query preprocessing, multi-stage retrieval, neural reranking, and context optimization"
        why="Addresses limitations of naive RAG through query understanding, relevance scoring, and context quality optimization"
        keyInsight="Pre-retrieval optimization + post-retrieval processing significantly improves accuracy and relevance"
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

export default AdvancedRagDetails;