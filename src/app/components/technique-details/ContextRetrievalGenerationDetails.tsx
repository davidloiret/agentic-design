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

interface ContextRetrievalGenerationDetailsProps {
  selectedTechnique: any;
}

export const ContextRetrievalGenerationDetails: React.FC<ContextRetrievalGenerationDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Context', detail: 'Define retrieval scope and generation targets' },
      { num: '2', action: 'Build Index', detail: 'Create searchable knowledge representations' },
      { num: '3', action: 'Retrieve', detail: 'Fetch relevant context using semantic/keyword search' },
      { num: '4', action: 'Assemble', detail: 'Dynamically compose context with prompts' },
      { num: '5', action: 'Generate', detail: 'Use augmented context for informed responses' }
    ],
    example: 'query → retrieve_docs → rank_relevance → compose_context → generate_response'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use semantic embeddings for context retrieval', icon: '✅' },
    { type: 'do', text: 'Implement relevance scoring and ranking', icon: '✅' },
    { type: 'do', text: 'Cache retrieved contexts for similar queries', icon: '✅' },
    { type: 'do', text: 'Use hybrid search (semantic + keyword)', icon: '✅' },
    { type: 'do', text: 'Implement context window management', icon: '✅' },
    { type: 'dont', text: 'Include irrelevant or outdated context', icon: '❌' },
    { type: 'dont', text: 'Overwhelm models with excessive context', icon: '❌' },
    { type: 'dont', text: 'Ignore context freshness and accuracy', icon: '❌' },
    { type: 'dont', text: 'Skip relevance validation', icon: '❌' },
    { type: 'dont', text: 'Use static context for dynamic queries', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Need external knowledge integration',
      'Domain-specific question answering',
      'Document-based reasoning tasks',
      'Real-time information requirements'
    ],
    avoidWhen: [
      'Simple factual queries',
      'Creative writing tasks',
      'High-latency sensitive applications',
      'Limited external knowledge sources'
    ]
  };

  const keyMetrics = [
    { metric: 'Retrieval Precision', measure: '% relevant docs retrieved' },
    { metric: 'Retrieval Recall', measure: '% relevant docs found' },
    { metric: 'Context Relevance', measure: 'Human/automated relevance scores' },
    { metric: 'Response Quality', measure: 'Accuracy with vs without context' },
    { metric: 'Latency', measure: 'Retrieval + generation time' },
    { metric: 'Context Utilization', measure: '% of context actually used' }
  ];

  const topUseCases = [
    'Question Answering: retrieve → rank → augment → answer (RAG systems)',
    'Document Analysis: index → search → extract → synthesize (legal/research)',
    'Technical Support: knowledge_base → match_issue → provide_solution',
    'Content Creation: research → gather_sources → synthesize → generate',
    'Decision Support: retrieve_policies → analyze_context → recommend_actions'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' },
        { title: 'FiD: Leveraging Passage Retrieval with Generative Models (Izacard & Grave, 2021)', url: 'https://arxiv.org/abs/2007.01282' },
        { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique (Asai et al., 2023)', url: 'https://arxiv.org/abs/2310.11511' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'LangChain RAG Tutorial and Best Practices', url: 'https://python.langchain.com/docs/tutorials/rag/' },
        { title: 'OpenAI Embeddings and Retrieval Guide', url: 'https://platform.openai.com/docs/guides/embeddings' },
        { title: 'Anthropic Context Engineering Best Practices', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags' },
        { title: 'Pinecone Vector Database RAG Implementation', url: 'https://docs.pinecone.io/guides/get-started/build-sample-application' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'LlamaIndex - Data Framework for LLM Applications', url: 'https://github.com/run-llama/llama_index' },
        { title: 'ChromaDB - Open-source Embedding Database', url: 'https://github.com/chroma-core/chroma' },
        { title: 'FAISS - Facebook AI Similarity Search', url: 'https://github.com/facebookresearch/faiss' },
        { title: 'Weaviate - Vector Search Engine', url: 'https://github.com/weaviate/weaviate' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'LlamaIndex Discord Community', url: 'https://discord.gg/dGcwcsnxhU' },
        { title: 'Pinecone Community Forum', url: 'https://community.pinecone.io/' },
        { title: 'ChromaDB Community Discord', url: 'https://discord.gg/MMeYNTmh3x' },
        { title: 'RAG Papers Collection', url: 'https://github.com/hymie122/RAG-Survey' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Retrieve relevant external knowledge and dynamically compose context for informed generation"
        why="Enables access to up-to-date information, domain expertise, and factual grounding beyond training data"
        keyInsight="Semantic retrieval + dynamic assembly = context-aware responses with verifiable sources"
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

export default ContextRetrievalGenerationDetails;