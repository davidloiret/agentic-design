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

interface EmbeddingBasedRoutingDetailsProps {
  selectedTechnique: any;
}

export const EmbeddingBasedRoutingDetails: React.FC<EmbeddingBasedRoutingDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Embed', detail: 'Convert query to vector representation' },
      { num: '2', action: 'Compare', detail: 'Calculate similarity to route embeddings' },
      { num: '3', action: 'Select', detail: 'Choose route with highest similarity' },
      { num: '4', action: 'Threshold', detail: 'Verify similarity meets minimum' },
      { num: '5', action: 'Route', detail: 'Direct to matched handler/agent' }
    ],
    example: 'query_embedding = encode(query) → similarities = cosine_sim(query_embedding, route_embeddings) → if max(similarities) > 0.85: route()'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use same embedding model for queries and routes', icon: '✅' },
    { type: 'do', text: 'Normalize embeddings for consistent cosine similarity', icon: '✅' },
    { type: 'do', text: 'Set appropriate similarity thresholds through testing', icon: '✅' },
    { type: 'do', text: 'Cache embeddings for frequently used routes', icon: '✅' },
    { type: 'do', text: 'Monitor embedding drift and update periodically', icon: '✅' },
    { type: 'dont', text: 'Mix different embedding models without retraining', icon: '❌' },
    { type: 'dont', text: 'Use cosine similarity blindly without validation', icon: '❌' },
    { type: 'dont', text: 'Ignore magnitude when it carries meaning', icon: '❌' },
    { type: 'dont', text: 'Skip normalization if model expects it', icon: '❌' },
    { type: 'dont', text: 'Use fixed thresholds across all route types', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Semantic understanding is crucial',
      'Routes have fuzzy boundaries',
      'Need language-agnostic routing',
      'High-dimensional intent spaces'
    ],
    avoidWhen: [
      'Exact keyword matching suffices',
      'Embedding computation is costly',
      'Routes require strict boundaries',
      'Low-latency requirements (<10ms)'
    ]
  };

  const keyMetrics = [
    { metric: 'Similarity Score', measure: 'Distribution of route matches' },
    { metric: 'Embedding Latency', measure: 'Time to generate vectors' },
    { metric: 'Route Precision', measure: '% correctly routed queries' },
    { metric: 'Route Recall', measure: '% of queries finding a route' },
    { metric: 'Cache Hit Rate', measure: '% embeddings served from cache' },
    { metric: 'Threshold Effectiveness', measure: 'False positive/negative rates' }
  ];

  const topUseCases = [
    'Semantic Search: query → embed → find most similar documents/FAQs',
    'Intent Classification: user input → embed → match to intent clusters',
    'Multi-lingual Support: translate meaning, not words → unified routing',
    'Knowledge Base Navigation: question → embed → relevant article section',
    'Dynamic Tool Selection: task description → embed → appropriate tool match'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Is Cosine-Similarity of Embeddings Really About Similarity? (2024)', url: 'https://arxiv.org/abs/2403.05440' },
        { title: 'Semantic Routing for Enhanced Performance of LLM-Assisted Networks (2024)', url: 'https://arxiv.org/abs/2404.15869' },
        { title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks', url: 'https://arxiv.org/abs/1908.10084' },
        { title: 'Efficient Natural Language Response Suggestion for Smart Reply', url: 'https://arxiv.org/abs/1705.00652' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Semantic Router Documentation - Aurelio Labs', url: 'https://github.com/aurelio-labs/semantic-router' },
        { title: 'Vector Similarity Explained - Pinecone', url: 'https://www.pinecone.io/learn/vector-similarity/' },
        { title: 'Semantic-Router Integration - Qdrant', url: 'https://qdrant.tech/documentation/frameworks/semantic-router/' },
        { title: 'LLM Semantic Router - Red Hat Developer', url: 'https://developers.redhat.com/articles/2024/05/20/llm-semantic-router-intelligent-request-routing' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Semantic Router - Superfast AI Decision Making', url: 'https://github.com/aurelio-labs/semantic-router' },
        { title: 'Sentence Transformers - State-of-the-art Embeddings', url: 'https://www.sbert.net/' },
        { title: 'FAISS - Efficient Similarity Search', url: 'https://github.com/facebookresearch/faiss' },
        { title: 'ChromaDB - Embedding Database', url: 'https://www.trychroma.com/' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Netflix Study on Cosine Similarity Limitations', url: 'https://bdtechtalks.com/2024/03/21/netflix-cosine-similarity-embedding-models/' },
        { title: 'Why You MUST Know Semantic Router in 2024', url: 'https://medium.com/@learn-simplified/llm-apps-why-you-must-know-semantic-router-in-2024-part-1-bfbda81374c5' },
        { title: 'Vector Database Similarity Metrics - Zilliz', url: 'https://zilliz.com/blog/similarity-metrics-for-vector-search' },
        { title: 'Hugging Face Sentence Transformers Forum', url: 'https://discuss.huggingface.co/c/sentence-transformers/17' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Route requests by comparing vector embeddings in semantic space"
        why="Captures meaning beyond keywords, enabling fuzzy matching and cross-lingual routing"
        keyInsight="Same embedding model + cosine similarity + smart thresholds = semantic routing"
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

export default EmbeddingBasedRoutingDetails;