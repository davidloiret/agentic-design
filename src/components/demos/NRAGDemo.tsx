'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Database, FileText, Cpu, CheckCircle, AlertCircle, BookOpen, Zap } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
  metadata: {
    source: string;
    date: string;
    relevance?: number;
  };
  embedding?: number[];
}

interface RetrievalResult {
  document: Document;
  score: number;
  snippet: string;
}

interface RAGStep {
  step: 'idle' | 'indexing' | 'embedding' | 'retrieving' | 'generating' | 'complete';
  description: string;
  progress: number;
}

export default function NRAGDemo() {
  const [query, setQuery] = useState('What is machine learning?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<RAGStep>({
    step: 'idle',
    description: 'Ready to process query',
    progress: 0
  });

  const [documents] = useState<Document[]>([
    {
      id: 'doc1',
      title: 'Introduction to Machine Learning',
      content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves. The primary aim is to allow computers to learn automatically without human intervention.',
      metadata: { source: 'ML Textbook', date: '2024-01-15' }
    },
    {
      id: 'doc2',
      title: 'Neural Networks Explained',
      content: 'Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes or neurons that process information using connectionist approaches. Deep learning networks are neural networks with multiple layers that progressively extract higher-level features from raw input.',
      metadata: { source: 'AI Research Paper', date: '2024-02-20' }
    },
    {
      id: 'doc3',
      title: 'Natural Language Processing',
      content: 'Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and manipulate human language. NLP draws from many disciplines including computer science and computational linguistics to bridge the gap between human communication and computer understanding.',
      metadata: { source: 'NLP Guide', date: '2024-03-10' }
    },
    {
      id: 'doc4',
      title: 'Computer Vision Fundamentals',
      content: 'Computer vision is a field of AI that trains computers to interpret and understand the visual world. Using digital images from cameras and videos and deep learning models, machines can accurately identify and classify objects and react to what they see.',
      metadata: { source: 'CV Handbook', date: '2024-01-25' }
    },
    {
      id: 'doc5',
      title: 'Reinforcement Learning',
      content: 'Reinforcement learning is an area of machine learning concerned with how intelligent agents ought to take actions in an environment to maximize cumulative reward. The agent learns to achieve a goal in an uncertain, potentially complex environment through trial and error.',
      metadata: { source: 'RL Tutorial', date: '2024-02-15' }
    }
  ]);

  const [indexedDocuments, setIndexedDocuments] = useState<Document[]>([]);
  const [retrievedDocuments, setRetrievedDocuments] = useState<RetrievalResult[]>([]);
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [metrics, setMetrics] = useState({
    documentsIndexed: 0,
    embeddingsDone: 0,
    retrievalTime: 0,
    generationTime: 0,
    totalLatency: 0
  });

  const startTimeRef = useRef<number>(0);

  const simulateEmbedding = (text: string): number[] => {
    // Simulate embedding generation (in reality, this would use a model like BERT or OpenAI embeddings)
    const words = text.toLowerCase().split(' ');
    const embedding = new Array(128).fill(0);

    // Simple hash-based pseudo-embedding for demo
    words.forEach((word, idx) => {
      const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      embedding[hash % 128] += 1 / words.length;
    });

    return embedding;
  };

  const cosineSimilarity = (vec1: number[], vec2: number[]): number => {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  };

  const processRAGPipeline = async (userQuery: string) => {
    setIsProcessing(true);
    startTimeRef.current = Date.now();
    setRetrievedDocuments([]);
    setGeneratedResponse('');

    // Step 1: Indexing
    setCurrentStep({
      step: 'indexing',
      description: 'Indexing documents into vector database...',
      progress: 20
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    const indexed = documents.map(doc => ({
      ...doc,
      embedding: simulateEmbedding(doc.content)
    }));
    setIndexedDocuments(indexed);
    setMetrics(prev => ({ ...prev, documentsIndexed: indexed.length }));

    // Step 2: Create query embedding
    setCurrentStep({
      step: 'embedding',
      description: 'Creating query embedding vector...',
      progress: 40
    });

    await new Promise(resolve => setTimeout(resolve, 600));

    const queryEmbedding = simulateEmbedding(userQuery);
    setMetrics(prev => ({ ...prev, embeddingsDone: prev.embeddingsDone + 1 }));

    // Step 3: Retrieve relevant documents
    setCurrentStep({
      step: 'retrieving',
      description: 'Retrieving relevant documents...',
      progress: 60
    });

    const retrievalStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 700));

    // Calculate similarity scores and retrieve top K documents
    const similarities = indexed.map(doc => ({
      document: doc,
      score: cosineSimilarity(queryEmbedding, doc.embedding || []),
      snippet: doc.content.substring(0, 150) + '...'
    }));

    // Sort by relevance and take top 3
    const topDocs = similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(result => ({
        ...result,
        document: {
          ...result.document,
          metadata: {
            ...result.document.metadata,
            relevance: Math.round(result.score * 100)
          }
        }
      }));

    setRetrievedDocuments(topDocs);
    const retrievalTime = Date.now() - retrievalStart;
    setMetrics(prev => ({ ...prev, retrievalTime }));

    // Step 4: Generate response
    setCurrentStep({
      step: 'generating',
      description: 'Generating response with context...',
      progress: 80
    });

    const generationStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate response generation based on retrieved context
    const context = topDocs.map(doc => doc.document.content).join(' ');
    const response = generateResponse(userQuery, context, topDocs);

    // Simulate streaming response
    for (let i = 0; i <= response.length; i += 10) {
      setGeneratedResponse(response.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setGeneratedResponse(response);

    const generationTime = Date.now() - generationStart;
    const totalLatency = Date.now() - startTimeRef.current;

    setMetrics(prev => ({
      ...prev,
      generationTime,
      totalLatency
    }));

    // Complete
    setCurrentStep({
      step: 'complete',
      description: 'RAG pipeline complete!',
      progress: 100
    });

    setIsProcessing(false);
  };

  const generateResponse = (query: string, context: string, docs: RetrievalResult[]): string => {
    const queryLower = query.toLowerCase();

    // Simulate intelligent response generation based on query and context
    if (queryLower.includes('machine learning') || queryLower.includes('ml')) {
      return `Based on the retrieved documents, machine learning is a subset of artificial intelligence that enables systems to learn from experience. ${docs[0].document.title} explains that ML focuses on developing programs that can access data and learn automatically without explicit programming. This foundational concept is essential for understanding modern AI systems.`;
    } else if (queryLower.includes('neural') || queryLower.includes('network')) {
      return `According to the retrieved information, neural networks are computing systems inspired by biological neural networks. ${docs[0].document.title} describes them as interconnected nodes that process information using connectionist approaches. Deep learning networks extend this concept with multiple layers for feature extraction.`;
    } else if (queryLower.includes('nlp') || queryLower.includes('language')) {
      return `The retrieved documents indicate that Natural Language Processing (NLP) is a branch of AI focused on computer understanding of human language. ${docs[0].document.title} notes that NLP bridges the gap between human communication and computer understanding, drawing from computer science and computational linguistics.`;
    } else if (queryLower.includes('vision') || queryLower.includes('image')) {
      return `Based on the context, computer vision is an AI field that trains computers to interpret visual information. ${docs[0].document.title} explains how CV systems use digital images and deep learning to identify and classify objects, enabling machines to react to visual input.`;
    } else if (queryLower.includes('reinforcement')) {
      return `The retrieved information shows that reinforcement learning involves intelligent agents taking actions to maximize cumulative reward. ${docs[0].document.title} describes how RL agents learn through trial and error in uncertain environments to achieve specific goals.`;
    } else {
      // Generic response using top retrieved document
      return `Based on your query about "${query}", I found relevant information in ${docs[0].document.title}. ${docs[0].snippet} This information comes from ${docs[0].document.metadata.source} and has a ${docs[0].document.metadata.relevance}% relevance score to your query.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      processRAGPipeline(query);
    }
  };

  const getStepIcon = (step: RAGStep['step']) => {
    switch (step) {
      case 'indexing': return <Database className="w-5 h-5" />;
      case 'embedding': return <Zap className="w-5 h-5" />;
      case 'retrieving': return <Search className="w-5 h-5" />;
      case 'generating': return <Cpu className="w-5 h-5" />;
      case 'complete': return <CheckCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStepColor = (step: RAGStep['step']) => {
    if (step === 'complete') return 'text-green-400 bg-green-500/20';
    if (step === 'idle') return 'text-gray-400 bg-gray-700';
    return 'text-blue-400 bg-blue-500/20';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Naive RAG Demo</h2>

      {/* Query Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about AI, machine learning, or neural networks..."
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            disabled={isProcessing}
            readOnly
          />
          <button
            type="submit"
            disabled={isProcessing || !query.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Search'}
          </button>
        </div>
      </form>

      {/* RAG Pipeline Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">RAG Pipeline Status</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${getStepColor(currentStep.step)}`}>
            {getStepIcon(currentStep.step)}
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">{currentStep.description}</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentStep.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Corpus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Document Corpus
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {documents.map(doc => (
              <div key={doc.id} className="bg-gray-700 rounded p-3">
                <div className="font-medium text-white text-sm">{doc.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {doc.metadata.source} • {doc.metadata.date}
                </div>
                <div className="text-xs text-gray-300 mt-2 line-clamp-2">
                  {doc.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-400">
            Total documents: {documents.length}
          </div>
        </div>

        {/* Retrieved Documents */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Retrieved Documents
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {retrievedDocuments.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No documents retrieved yet. Submit a query to start.
              </div>
            ) : (
              retrievedDocuments.map((result, idx) => (
                <div key={result.document.id} className="bg-gray-700 rounded p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-white text-sm">
                      {idx + 1}. {result.document.title}
                    </div>
                    <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                      {result.document.metadata.relevance}% match
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mt-2">
                    {result.snippet}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Score: {result.score.toFixed(4)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Generated Response */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          Generated Response
        </h3>
        <div className="bg-gray-700 rounded-lg p-4 min-h-[100px]">
          {generatedResponse ? (
            <div className="text-white whitespace-pre-wrap">{generatedResponse}</div>
          ) : (
            <div className="text-gray-400 text-center">
              Response will appear here after RAG processing...
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Docs Indexed</div>
            <div className="text-xl font-bold text-white">{metrics.documentsIndexed}</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Embeddings</div>
            <div className="text-xl font-bold text-white">{metrics.embeddingsDone}</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Retrieval Time</div>
            <div className="text-xl font-bold text-white">{metrics.retrievalTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Generation Time</div>
            <div className="text-xl font-bold text-white">{metrics.generationTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Total Latency</div>
            <div className="text-xl font-bold text-white">{metrics.totalLatency}ms</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-800 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">How Naive RAG Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: <Database className="w-6 h-6" />, title: 'Index Documents', description: 'Store documents in vector database' },
            { icon: <Zap className="w-6 h-6" />, title: 'Create Embeddings', description: 'Convert text to vector representations' },
            { icon: <Search className="w-6 h-6" />, title: 'Retrieve Context', description: 'Find relevant documents via similarity' },
            { icon: <Cpu className="w-6 h-6" />, title: 'Generate Response', description: 'Create answer using retrieved context' }
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-blue-500/20 text-blue-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                {step.icon}
              </div>
              <div className="text-sm font-medium text-white mb-1">{step.title}</div>
              <div className="text-xs text-gray-400">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}