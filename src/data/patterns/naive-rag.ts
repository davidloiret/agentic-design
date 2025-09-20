import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const naiveRagPattern: PatternScenario = {
  id: 'naive-rag',
  title: 'Naive RAG (Retrieve-Augmented Generation)',
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
      id: 'simple-chunking',
      position: { x: 150, y: 250 },
      data: { label: '✂️ Simple Chunking\nBasic text splitting\n(no semantic awareness)' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'basic-embedding',
      position: { x: 150, y: 350 },
      data: { label: '🔢 Basic Embedding\nStandard embeddings\n(no optimization)' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'vector-storage',
      position: { x: 150, y: 450 },
      data: { label: '💾 Vector Storage\nSimple vector database\n(minimal metadata)' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'inference-phase-header',
      position: { x: 550, y: 50 },
      data: { label: '🔍 INFERENCE PHASE\n(Per query)' },
      style: { ...nodeStyle, background: '#374151', color: '#ffffff', minWidth: 200 },
    },
    {
      id: 'user-query',
      position: { x: 550, y: 150 },
      data: { label: '❓ User Query\n"What are the side effects\nof Metformin?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'query-embedding',
      position: { x: 550, y: 250 },
      data: { label: '🔢 Query Embedding\nConvert query to\nvector representation' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'simple-search',
      position: { x: 550, y: 350 },
      data: { label: '🔍 Simple Vector Search\nBasic cosine similarity\n(top-k retrieval)' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'retrieved-docs',
      position: { x: 550, y: 450 },
      data: { label: '📄 Retrieved Docs\n"Metformin: GI upset,\nlactic acidosis risk,\nB12 deficiency..."' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'basic-context',
      position: { x: 550, y: 550 },
      data: { label: '📋 Basic Context Prep\nSimple concatenation\nquery + documents' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'llm-generation',
      position: { x: 550, y: 650 },
      data: { label: '🤖 LLM Generation\nGenerate answer using\nbasic prompt template' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'final-answer',
      position: { x: 550, y: 750 },
      data: { label: '✅ Final Answer\n"Metformin side effects:\n• Nausea, diarrhea\n• Rare: lactic acidosis\n• Long-term: B12 deficiency"' },
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
      target: 'simple-chunking',
      ...edgeStyle,
      label: 'chunk'
    },
    {
      id: 'indexing-e2',
      source: 'simple-chunking',
      target: 'basic-embedding',
      ...edgeStyle,
      label: 'embed'
    },
    {
      id: 'indexing-e3',
      source: 'basic-embedding',
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
      target: 'query-embedding',
      ...edgeStyle,
      label: 'encode'
    },
    {
      id: 'inference-e2',
      source: 'query-embedding',
      target: 'simple-search',
      ...edgeStyle,
      label: 'search'
    },
    {
      id: 'inference-e3',
      source: 'simple-search',
      target: 'retrieved-docs',
      ...edgeStyle,
      label: 'top-k'
    },
    {
      id: 'inference-e4',
      source: 'retrieved-docs',
      target: 'basic-context',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'inference-e5',
      source: 'basic-context',
      target: 'llm-generation',
      ...edgeStyle,
      label: 'prompt'
    },
    {
      id: 'inference-e6',
      source: 'llm-generation',
      target: 'final-answer',
      ...edgeStyle,
      label: 'generate'
    },
    {
      id: 'cross-phase',
      source: 'vector-storage',
      target: 'simple-search',
      ...edgeStyle,
      label: 'query index',
      style: { ...edgeStyle.style, strokeDasharray: '5,5', stroke: '#9ca3af' }
    },
  ],
  steps: [
    {
      title: "Basic Document Indexing",
      description: "One-time setup: Documents are collected, split using simple text chunking, embedded with standard models, and stored in basic vector database.",
      activeNodes: ['indexing-phase-header', 'document-collection', 'simple-chunking', 'basic-embedding', 'vector-storage'],
      activeEdges: ['indexing-header', 'indexing-e1', 'indexing-e2', 'indexing-e3']
    },
    {
      title: "Query Encoding",
      description: "User query about Metformin is converted to vector representation using the same embedding model used for indexing documents.",
      activeNodes: ['inference-phase-header', 'user-query', 'query-embedding'],
      activeEdges: ['inference-header', 'inference-e1']
    },
    {
      title: "Simple Vector Search",
      description: "Basic cosine similarity search retrieves top-k most similar document chunks from the vector database without any ranking optimization.",
      activeNodes: ['simple-search', 'vector-storage'],
      activeEdges: ['inference-e2', 'cross-phase']
    },
    {
      title: "Basic Context Assembly",
      description: "Retrieved documents are simply concatenated with the original query using a basic prompt template without curation or optimization.",
      activeNodes: ['retrieved-docs', 'basic-context'],
      activeEdges: ['inference-e3', 'inference-e4']
    },
    {
      title: "Direct Generation",
      description: "LLM generates response using the basic prompt and context without validation, re-ranking, or post-processing steps.",
      activeNodes: ['llm-generation', 'final-answer'],
      activeEdges: ['inference-e5', 'inference-e6']
    }
  ]
};