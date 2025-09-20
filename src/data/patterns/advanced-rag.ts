import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const advancedRagPattern: PatternScenario = {
  id: 'advanced-rag',
  title: 'Advanced RAG (Enhanced Retrieve-Augmented Generation)',
  description: 'An enhanced retrieval-augmented generation system with improved indexing, query processing, and generation capabilities',
  initialNodes: [
    {
      id: 'indexing-phase-header',
      position: { x: 150, y: 50 },
      data: { label: '📚 INDEXING PHASE\n(One-time setup)' },
      style: { ...nodeStyle, background: '#374151', color: '#ffffff', minWidth: 200 },
    },
    {
      id: 'document-collection',
      position: { x: 150, y: 150 },
      data: { label: '📄 Document Collection\nMedical papers, studies,\ndrug databases' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'document-chunking',
      position: { x: 150, y: 250 },
      data: { label: '✂️ Document Chunking\nSplit into 500-token\nsemantic chunks' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'embedding-creation',
      position: { x: 150, y: 350 },
      data: { label: '🔢 Embedding Creation\nGenerate dense vectors\nfor each chunk' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'vector-storage',
      position: { x: 150, y: 450 },
      data: { label: '💾 Vector Storage\nStore in vector database\nwith metadata' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'inference-phase-header',
      position: { x: 650, y: 50 },
      data: { label: '🔍 INFERENCE PHASE\n(Per query)' },
      style: { ...nodeStyle, background: '#374151', color: '#ffffff', minWidth: 200 },
    },
    {
      id: 'user-query',
      position: { x: 650, y: 150 },
      data: { label: '❓ User Query\n"Best treatments for\nType 2 diabetes?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'query-expansion',
      position: { x: 650, y: 250 },
      data: { label: '🔍 Query Expansion\n+ "metformin"\n+ "insulin therapy"\n+ "lifestyle changes"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'multi-vector-search',
      position: { x: 650, y: 350 },
      data: { label: '🎯 Multi-Vector Search\nDense + Sparse\nHybrid retrieval' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'initial-retrieval',
      position: { x: 650, y: 450 },
      data: { label: '📚 Initial Retrieval\n50 candidate documents\nfrom vector database' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'reranking',
      position: { x: 650, y: 550 },
      data: { label: '📊 Re-ranking\nCross-encoder scores\nTop 10 most relevant' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'context-curation',
      position: { x: 650, y: 650 },
      data: { label: '✂️ Context Curation\nRemove contradictions\nSummarize key points' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'enhanced-prompt',
      position: { x: 650, y: 750 },
      data: { label: '📝 Enhanced Prompt\nStructured context +\nOriginal query' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'llm-generation',
      position: { x: 650, y: 850 },
      data: { label: '🤖 LLM Generation\nGenerate comprehensive\ntreatment plan' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'answer-validation',
      position: { x: 650, y: 950 },
      data: { label: '✅ Answer Validation\nFact-check against\nsource documents' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'final-answer',
      position: { x: 650, y: 1050 },
      data: { label: '🎯 Final Answer\n"Type 2 diabetes treatment:\n1. Metformin (first-line)\n2. Lifestyle modifications\n3. Insulin if needed"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
  ],
  initialEdges: [
    {
      id: 'indexing-header',
      source: 'indexing-phase-header',
      target: 'document-collection',
      ...edgeStyle,
      label: 'start'
    },
    {
      id: 'indexing-e1',
      source: 'document-collection',
      target: 'document-chunking',
      ...edgeStyle,
      label: 'chunk'
    },
    {
      id: 'indexing-e2',
      source: 'document-chunking',
      target: 'embedding-creation',
      ...edgeStyle,
      label: 'embed'
    },
    {
      id: 'indexing-e3',
      source: 'embedding-creation',
      target: 'vector-storage',
      ...edgeStyle,
      label: 'store'
    },
    {
      id: 'inference-header',
      source: 'inference-phase-header',
      target: 'user-query',
      ...edgeStyle,
      label: 'start'
    },
    {
      id: 'inference-e1',
      source: 'user-query',
      target: 'query-expansion',
      ...edgeStyle,
      label: 'expand'
    },
    {
      id: 'inference-e2',
      source: 'query-expansion',
      target: 'multi-vector-search',
      ...edgeStyle,
      label: 'search'
    },
    {
      id: 'inference-e3',
      source: 'multi-vector-search',
      target: 'initial-retrieval',
      ...edgeStyle,
      label: 'retrieve'
    },
    {
      id: 'inference-e4',
      source: 'initial-retrieval',
      target: 'reranking',
      ...edgeStyle,
      label: 'rank'
    },
    {
      id: 'inference-e5',
      source: 'reranking',
      target: 'context-curation',
      ...edgeStyle,
      label: 'curate'
    },
    {
      id: 'inference-e6',
      source: 'context-curation',
      target: 'enhanced-prompt',
      ...edgeStyle,
      label: 'structure'
    },
    {
      id: 'inference-e7',
      source: 'enhanced-prompt',
      target: 'llm-generation',
      ...edgeStyle,
      label: 'generate'
    },
    {
      id: 'inference-e8',
      source: 'llm-generation',
      target: 'answer-validation',
      ...edgeStyle,
      label: 'validate'
    },
    {
      id: 'inference-e9',
      source: 'answer-validation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'finalize'
    },
    {
      id: 'cross-phase',
      source: 'vector-storage',
      target: 'initial-retrieval',
      ...edgeStyle,
      label: 'query index',
      style: { ...edgeStyle, strokeDasharray: '5,5', stroke: '#9ca3af' }
    },
  ],
  steps: [
    {
      title: "Document Indexing Phase",
      description: "One-time setup: Medical documents are collected, chunked into semantic pieces, embedded into vectors, and stored in vector database with metadata.",
      activeNodes: ['indexing-phase-header', 'document-collection', 'document-chunking', 'embedding-creation', 'vector-storage'],
      activeEdges: ['indexing-header', 'indexing-e1', 'indexing-e2', 'indexing-e3']
    },
    {
      title: "Query Processing",
      description: "User query about diabetes treatment is expanded with related medical terms to capture comprehensive treatment options and approaches.",
      activeNodes: ['inference-phase-header', 'user-query', 'query-expansion'],
      activeEdges: ['inference-header', 'inference-e1']
    },
    {
      title: "Hybrid Retrieval",
      description: "Multi-vector search combines dense semantic matching with sparse keyword search to retrieve 50 most relevant document chunks from the indexed database.",
      activeNodes: ['multi-vector-search', 'initial-retrieval', 'vector-storage'],
      activeEdges: ['inference-e2', 'inference-e3', 'cross-phase']
    },
    {
      title: "Intelligent Re-ranking",
      description: "Cross-encoder model scores all 50 candidates for query relevance, selecting top 10 most contextually appropriate medical documents.",
      activeNodes: ['reranking'],
      activeEdges: ['inference-e4']
    },
    {
      title: "Context Curation",
      description: "Retrieved medical content is processed to remove contradictions, eliminate redundancy, and structure key treatment recommendations.",
      activeNodes: ['context-curation'],
      activeEdges: ['inference-e5']
    },
    {
      title: "Enhanced Generation & Validation",
      description: "LLM generates comprehensive treatment plan from curated context, then validates the response against source documents to prevent medical misinformation.",
      activeNodes: ['enhanced-prompt', 'llm-generation', 'answer-validation', 'final-answer'],
      activeEdges: ['inference-e6', 'inference-e7', 'inference-e8', 'inference-e9']
    }
  ]
};