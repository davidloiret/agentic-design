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

interface NaiveRagDetailsProps {
  selectedTechnique: any;
}

export const NaiveRagDetails: React.FC<NaiveRagDetailsProps> = ({ selectedTechnique }) => {
  // Quick Implementation Recipe
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Index', detail: 'Create vector embeddings of knowledge base' },
      { num: '2', action: 'Retrieve', detail: 'Find top-k relevant documents via similarity' },
      { num: '3', action: 'Concatenate', detail: 'Append retrieved docs to query prompt' },
      { num: '4', action: 'Generate', detail: 'Submit combined prompt to LLM' },
      { num: '5', action: 'Return', detail: 'Output generated response directly' }
    ],
    example: 'query → vector_search → concat_context → llm_generate → response'
  };

  // Combined Do's and Don'ts
  const dosAndDonts = [
    { type: 'do', text: 'Use semantic embeddings (e.g., sentence-transformers)', icon: '✅' },
    { type: 'do', text: 'Implement basic chunking strategy (fixed size 512-1024 tokens)', icon: '✅' },
    { type: 'do', text: 'Set clear top-k retrieval limits (typically 3-5 documents)', icon: '✅' },
    { type: 'do', text: 'Include document metadata and source attribution', icon: '✅' },
    { type: 'do', text: 'Use FAISS or similar for efficient vector search', icon: '✅' },
    { type: 'dont', text: 'Skip query preprocessing or normalization', icon: '❌' },
    { type: 'dont', text: 'Retrieve too many documents (causes context pollution)', icon: '❌' },
    { type: 'dont', text: 'Ignore relevance scoring thresholds', icon: '❌' },
    { type: 'dont', text: 'Concatenate without clear document boundaries', icon: '❌' },
    { type: 'dont', text: 'Expect sophisticated reasoning from basic approach', icon: '❌' }
  ];

  // When to Use vs When to Avoid
  const usageGuide = {
    useWhen: [
      'Simple Q&A over documents',
      'Proof-of-concept RAG systems',
      'Limited technical complexity allowed',
      'Small to medium knowledge bases',
      'Straightforward factual queries'
    ],
    avoidWhen: [
      'Complex multi-hop reasoning required',
      'High-accuracy critical applications',
      'Large-scale production systems',
      'Noisy or contradictory knowledge bases',
      'Real-time performance requirements'
    ]
  };

  // Key Metrics
  const keyMetrics = [
    { metric: 'Retrieval Accuracy', measure: 'Relevant docs in top-k (Recall@k)' },
    { metric: 'Answer Quality', measure: 'BLEU/ROUGE scores vs ground truth' },
    { metric: 'Response Time', measure: 'End-to-end latency (retrieval + generation)' },
    { metric: 'Context Utilization', measure: '% of retrieved context used in response' },
    { metric: 'Hallucination Rate', measure: '% responses with unsupported claims' },
    { metric: 'Source Attribution', measure: '% responses with correct source citations' }
  ];

  // Top Use Cases
  const topUseCases = [
    'Document Q&A: Simple factual questions over company documents or knowledge bases',
    'FAQ Systems: Automated responses to frequently asked questions using existing documentation',
    'Research Assistance: Basic information retrieval from academic papers or research collections', 
    'Customer Support: Level 1 support queries answerable from documentation and manuals',
    'Educational Tools: Simple question-answering over textbooks and educational materials'
  ];

  const references = [
    {
      title: 'Foundational Papers',
      items: [
        { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)', url: 'https://arxiv.org/abs/2005.11401' },
        { title: 'Dense Passage Retrieval for Open-Domain Question Answering (Karpukhin et al., 2020)', url: 'https://arxiv.org/abs/2004.04906' },
        { title: 'RAG vs FiD: Comparing Retrieval-Augmented Generation Models (Izacard & Grave, 2021)', url: 'https://arxiv.org/abs/2007.01282' },
        { title: 'Leveraging Passage Retrieval with Generative Models (Izacard et al., 2022)', url: 'https://arxiv.org/abs/2104.07567' }
      ]
    },
    {
      title: 'Comprehensive Surveys',
      items: [
        { title: 'Retrieval-Augmented Generation for Large Language Models: A Survey (Gao et al., 2023)', url: 'https://arxiv.org/abs/2312.10997' },
        { title: 'A Comprehensive Survey of RAG: Evolution and Future Directions (Gupta et al., 2024)', url: 'https://arxiv.org/abs/2410.12837' },
        { title: 'Retrieval-Augmented Generation for AI-Generated Content: A Survey (Li et al., 2024)', url: 'https://arxiv.org/abs/2402.19473' },
        { title: 'RAG and RAU: A Survey on Retrieval-Augmented Language Model (Zhao et al., 2024)', url: 'https://arxiv.org/abs/2404.19543' }
      ]
    },
    {
      title: 'Implementation Resources',
      items: [
        { title: 'LangChain RAG Tutorial - Basic Implementation', url: 'https://python.langchain.com/docs/tutorials/rag/' },
        { title: 'Hugging Face RAG Documentation and Examples', url: 'https://huggingface.co/docs/transformers/model_doc/rag' },
        { title: 'OpenAI RAG Implementation Guide', url: 'https://platform.openai.com/docs/assistants/tools/knowledge-retrieval' },
        { title: 'LlamaIndex Basic RAG Pipeline Tutorial', url: 'https://docs.llamaindex.ai/en/stable/getting_started/starter_example/' }
      ]
    },
    {
      title: 'Vector Database Solutions',
      items: [
        { title: 'FAISS - Facebook AI Similarity Search Library', url: 'https://github.com/facebookresearch/faiss' },
        { title: 'Pinecone Vector Database Documentation', url: 'https://docs.pinecone.io/docs/overview' },
        { title: 'Weaviate Vector Search Engine', url: 'https://weaviate.io/developers/weaviate' },
        { title: 'Chroma - Open-source Embedding Database', url: 'https://docs.trychroma.com/' }
      ]
    },
    {
      title: 'Embedding Models & Evaluation',
      items: [
        { title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT (Reimers & Gurevych, 2019)', url: 'https://arxiv.org/abs/1908.10084' },
        { title: 'Text and Code Embeddings by Contrastive Pre-Training (OpenAI, 2022)', url: 'https://arxiv.org/abs/2201.10005' },
        { title: 'MTEB: Massive Text Embedding Benchmark (Muennighoff et al., 2022)', url: 'https://arxiv.org/abs/2210.07316' },
        { title: 'BGE: BAAI General Embedding Model Documentation', url: 'https://github.com/FlagOpen/FlagEmbedding' }
      ]
    },
    {
      title: 'Evaluation Frameworks',
      items: [
        { title: 'RAGAS: Evaluation Framework for RAG Applications', url: 'https://github.com/explodinggradients/ragas' },
        { title: 'TruLens: Evaluation and Tracking for LLM Applications', url: 'https://www.trulens.org/' },
        { title: 'LangSmith: LLM Application Testing and Monitoring', url: 'https://docs.smith.langchain.com/' },
        { title: 'DeepEval: Unit Testing for LLM Applications', url: 'https://github.com/confident-ai/deepeval' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Simple retrieve-then-read pipeline: query → retrieve documents → concatenate → generate"
        why="Provides external knowledge access with minimal complexity - foundational approach established by Lewis et al. (2020)"
        keyInsight="Direct concatenation of top-k retrieved documents to query prompt - no optimization or post-processing"
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

export default NaiveRagDetails;