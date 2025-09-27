'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Database, FileText, Cpu, CheckCircle, AlertCircle, BookOpen, Zap, Filter, Shuffle, Target, TrendingUp } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
  metadata: {
    source: string;
    date: string;
    relevance?: number;
    category?: string;
  };
  embedding?: number[];
}

interface RetrievalResult {
  document: Document;
  score: number;
  snippet: string;
  rerankedScore?: number;
  reason?: string;
}

interface QueryExpansion {
  original: string;
  expanded: string[];
  synonyms: string[];
  related: string[];
}

interface RAGStep {
  step: 'idle' | 'query-expansion' | 'indexing' | 'embedding' | 'retrieving' | 'reranking' | 'context-curation' | 'generating' | 'complete';
  description: string;
  progress: number;
}

export default function ARAGDemo() {
  const [query] = useState('How do neural networks learn?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReranking, setIsReranking] = useState(false);
  const [currentStep, setCurrentStep] = useState<RAGStep>({
    step: 'idle',
    description: 'Ready to process advanced query',
    progress: 0
  });

  const [documents] = useState<Document[]>([
    {
      id: 'doc1',
      title: 'Introduction to Machine Learning',
      content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves. The primary aim is to allow computers to learn automatically without human intervention.',
      metadata: { source: 'ML Textbook', date: '2024-01-15', category: 'fundamentals' }
    },
    {
      id: 'doc2',
      title: 'Neural Networks Explained',
      content: 'Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes or neurons that process information using connectionist approaches. Deep learning networks are neural networks with multiple layers that progressively extract higher-level features from raw input. The learning process involves adjusting weights through backpropagation.',
      metadata: { source: 'AI Research Paper', date: '2024-02-20', category: 'neural-networks' }
    },
    {
      id: 'doc3',
      title: 'Backpropagation Algorithm',
      content: 'Backpropagation is a method used to train artificial neural networks through gradient descent. It calculates the gradient of the loss function with respect to the network weights. The algorithm propagates errors backward through the network, adjusting weights to minimize the loss. This iterative process allows neural networks to learn complex patterns.',
      metadata: { source: 'Deep Learning Guide', date: '2024-03-05', category: 'algorithms' }
    },
    {
      id: 'doc4',
      title: 'Gradient Descent Optimization',
      content: 'Gradient descent is an optimization algorithm used to minimize the cost function in machine learning models. It iteratively adjusts parameters in the direction of steepest descent. Learning rate controls the step size, while momentum helps avoid local minima. Stochastic gradient descent uses random samples for faster computation.',
      metadata: { source: 'Optimization Theory', date: '2024-02-10', category: 'optimization' }
    },
    {
      id: 'doc5',
      title: 'Deep Learning Architectures',
      content: 'Deep learning architectures include convolutional neural networks (CNNs) for image processing, recurrent neural networks (RNNs) for sequential data, and transformers for natural language processing. Each architecture learns hierarchical representations through multiple layers. Training involves forward propagation, loss calculation, and weight updates via backpropagation.',
      metadata: { source: 'DL Architecture Book', date: '2024-01-25', category: 'architectures' }
    },
    {
      id: 'doc6',
      title: 'Transfer Learning',
      content: 'Transfer learning leverages pre-trained models to solve new tasks with limited data. Neural networks trained on large datasets can transfer learned features to related domains. This approach reduces training time and improves performance. Fine-tuning adjusts the pre-trained weights for specific tasks.',
      metadata: { source: 'Transfer Learning Paper', date: '2024-03-15', category: 'techniques' }
    },
    {
      id: 'doc7',
      title: 'Regularization Techniques',
      content: 'Regularization prevents overfitting in neural networks. Dropout randomly deactivates neurons during training. L1 and L2 regularization add penalty terms to the loss function. Batch normalization stabilizes learning by normalizing inputs. These techniques help networks generalize better to unseen data.',
      metadata: { source: 'ML Best Practices', date: '2024-02-28', category: 'techniques' }
    }
  ]);

  const [queryExpansion, setQueryExpansion] = useState<QueryExpansion | null>(null);
  const [indexedDocuments, setIndexedDocuments] = useState<Document[]>([]);
  const [retrievedDocuments, setRetrievedDocuments] = useState<RetrievalResult[]>([]);
  const [rerankedDocuments, setRerankedDocuments] = useState<RetrievalResult[]>([]);
  const [curatedContext, setCuratedContext] = useState<string>('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [metrics, setMetrics] = useState({
    documentsIndexed: 0,
    embeddingsDone: 0,
    retrievalTime: 0,
    rerankingTime: 0,
    curationTime: 0,
    generationTime: 0,
    totalLatency: 0,
    precisionImprovement: 0
  });

  const startTimeRef = useRef<number>(0);

  const expandQuery = (originalQuery: string): QueryExpansion => {
    // Simulate query expansion with synonyms and related terms
    const expansion: QueryExpansion = {
      original: originalQuery,
      expanded: [],
      synonyms: [],
      related: []
    };

    if (originalQuery.toLowerCase().includes('neural networks')) {
      expansion.synonyms = ['neural nets', 'artificial neural networks', 'ANNs', 'deep networks'];
      expansion.related = ['deep learning', 'machine learning', 'artificial intelligence'];
    }

    if (originalQuery.toLowerCase().includes('learn')) {
      expansion.synonyms = ['train', 'adapt', 'optimize', 'improve'];
      expansion.related = ['backpropagation', 'gradient descent', 'weight adjustment', 'training process'];
    }

    expansion.expanded = [
      originalQuery,
      `${originalQuery} backpropagation gradient descent`,
      `${originalQuery} weight adjustment training`,
      `neural network learning process algorithms`
    ];

    return expansion;
  };

  const simulateEmbedding = (text: string): number[] => {
    // Enhanced embedding simulation with semantic understanding
    const words = text.toLowerCase().split(' ');
    const embedding = new Array(256).fill(0);

    // Semantic weights for key concepts
    const semanticWeights: { [key: string]: number } = {
      'neural': 10, 'network': 10, 'learn': 8, 'training': 8,
      'backpropagation': 9, 'gradient': 7, 'weight': 6, 'layer': 6,
      'deep': 5, 'optimization': 5, 'descent': 5
    };

    words.forEach((word, idx) => {
      const weight = semanticWeights[word] || 1;
      const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      embedding[hash % 256] += weight / words.length;
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

  const rerankDocuments = (docs: RetrievalResult[], query: string): RetrievalResult[] => {
    // Simulate advanced reranking with cross-encoder and relevance feedback
    // This is the KEY DIFFERENCE from Naive RAG - we rerank based on semantic understanding
    return docs.map((doc, idx) => {
      let rerankedScore = doc.score;
      let boostAmount = 0;
      let reasons: string[] = [];

      // 1. Cross-encoder simulation: Deep semantic matching
      const queryTerms = query.toLowerCase().split(' ');
      const contentLower = doc.document.content.toLowerCase();
      let semanticScore = 0;

      // Check for exact phrase matches (higher weight)
      if (contentLower.includes('neural network') && contentLower.includes('learn')) {
        semanticScore += 0.25;
        boostAmount += 0.25;
        reasons.push('Exact phrase match');
      }

      // Term proximity analysis
      queryTerms.forEach(term => {
        if (contentLower.includes(term)) {
          semanticScore += 0.05;
        }
      });

      if (semanticScore > 0.2) {
        rerankedScore += semanticScore;
        boostAmount += semanticScore;
        if (!reasons.includes('Exact phrase match')) {
          reasons.push('High semantic relevance');
        }
      }

      // 2. Category-specific boosting
      if (doc.document.metadata.category === 'neural-networks' && query.includes('neural')) {
        rerankedScore += 0.15;
        boostAmount += 0.15;
        reasons.push('Category alignment');
      } else if (doc.document.metadata.category === 'algorithms' && query.includes('learn')) {
        rerankedScore += 0.10;
        boostAmount += 0.10;
        reasons.push('Algorithm relevance');
      }

      // 3. Contextual relevance (simulates BERT-like understanding)
      const hasBackprop = contentLower.includes('backpropagation');
      const hasGradient = contentLower.includes('gradient');
      const hasWeights = contentLower.includes('weight');

      if ((hasBackprop || hasGradient) && hasWeights) {
        rerankedScore += 0.12;
        boostAmount += 0.12;
        reasons.push('Technical depth match');
      }

      // 4. Recency and authority scoring
      const docDate = new Date(doc.document.metadata.date);
      const daysSince = (Date.now() - docDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 30) {
        rerankedScore += 0.03;
        boostAmount += 0.03;
        reasons.push('Recent content');
      }

      // 5. Position decay penalty (original low-ranked docs get slight penalty)
      if (idx > 2) {
        rerankedScore -= 0.05;
        boostAmount -= 0.05;
        reasons.push('Position adjustment');
      }

      const finalReason = reasons.length > 0 ? reasons.join(' + ') : 'Base retrieval score';

      return {
        ...doc,
        rerankedScore: Math.min(1, Math.max(0, rerankedScore)),
        reason: finalReason
      };
    }).sort((a, b) => (b.rerankedScore || 0) - (a.rerankedScore || 0));
  };

  const curateContext = (docs: RetrievalResult[]): string => {
    // Advanced context curation with deduplication and relevance filtering
    const seen = new Set<string>();
    const curated: string[] = [];

    docs.forEach(doc => {
      const sentences = doc.document.content.split('. ');
      sentences.forEach(sentence => {
        const normalized = sentence.toLowerCase().trim();
        if (!seen.has(normalized) && sentence.length > 20) {
          seen.add(normalized);
          curated.push(sentence);
        }
      });
    });

    // Sort by relevance and take most informative sentences
    return curated.slice(0, 5).join('. ') + '.';
  };

  const processAdvancedRAGPipeline = async (userQuery: string) => {
    setIsProcessing(true);
    startTimeRef.current = Date.now();
    setRetrievedDocuments([]);
    setRerankedDocuments([]);
    setCuratedContext('');
    setGeneratedResponse('');

    // Step 1: Query Expansion
    setCurrentStep({
      step: 'query-expansion',
      description: 'Expanding query with synonyms and related terms...',
      progress: 12
    });

    await new Promise(resolve => setTimeout(resolve, 600));
    const expansion = expandQuery(userQuery);
    setQueryExpansion(expansion);

    // Step 2: Indexing with metadata
    setCurrentStep({
      step: 'indexing',
      description: 'Indexing documents with metadata enrichment...',
      progress: 25
    });

    await new Promise(resolve => setTimeout(resolve, 700));
    const indexed = documents.map(doc => ({
      ...doc,
      embedding: simulateEmbedding(doc.content)
    }));
    setIndexedDocuments(indexed);
    setMetrics(prev => ({ ...prev, documentsIndexed: indexed.length }));

    // Step 3: Multi-query embedding
    setCurrentStep({
      step: 'embedding',
      description: 'Creating multi-query embeddings...',
      progress: 38
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    const queryEmbeddings = expansion.expanded.map(q => simulateEmbedding(q));
    setMetrics(prev => ({ ...prev, embeddingsDone: queryEmbeddings.length }));

    // Step 4: Hybrid retrieval
    setCurrentStep({
      step: 'retrieving',
      description: 'Performing hybrid retrieval with multiple strategies...',
      progress: 50
    });

    const retrievalStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate similarities for each expanded query
    const allResults: RetrievalResult[] = [];
    queryEmbeddings.forEach(qEmbed => {
      const similarities = indexed.map(doc => ({
        document: doc,
        score: cosineSimilarity(qEmbed, doc.embedding || []),
        snippet: doc.content.substring(0, 150) + '...'
      }));
      allResults.push(...similarities);
    });

    // Deduplicate and take top K
    const uniqueResults = new Map<string, RetrievalResult>();
    allResults.forEach(result => {
      const existing = uniqueResults.get(result.document.id);
      if (!existing || result.score > existing.score) {
        uniqueResults.set(result.document.id, result);
      }
    });

    const topDocs = Array.from(uniqueResults.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setRetrievedDocuments(topDocs);
    const retrievalTime = Date.now() - retrievalStart;
    setMetrics(prev => ({ ...prev, retrievalTime }));

    // Step 5: Reranking - THE KEY DIFFERENTIATOR FROM NAIVE RAG
    setCurrentStep({
      step: 'reranking',
      description: '🔄 Reranking with cross-encoder (KEY DIFFERENCE from Naive RAG)...',
      progress: 63
    });

    const rerankStart = Date.now();
    setIsReranking(true);
    await new Promise(resolve => setTimeout(resolve, 1200)); // Longer to show it's doing more work

    const reranked = rerankDocuments(topDocs, userQuery);
    setRerankedDocuments(reranked);
    setIsReranking(false);

    const rerankingTime = Date.now() - rerankStart;
    const precisionImprovement = ((reranked[0]?.rerankedScore || 0) - (reranked[0]?.score || 0)) * 100;
    setMetrics(prev => ({ ...prev, rerankingTime, precisionImprovement }));

    // Step 6: Context Curation
    setCurrentStep({
      step: 'context-curation',
      description: 'Curating and deduplicating context...',
      progress: 75
    });

    const curationStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 500));

    const curated = curateContext(reranked.slice(0, 3));
    setCuratedContext(curated);

    const curationTime = Date.now() - curationStart;
    setMetrics(prev => ({ ...prev, curationTime }));

    // Step 7: Generate response
    setCurrentStep({
      step: 'generating',
      description: 'Generating response with curated context...',
      progress: 88
    });

    const generationStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = generateAdvancedResponse(userQuery, curated, reranked);

    // Simulate streaming
    for (let i = 0; i <= response.length; i += 8) {
      setGeneratedResponse(response.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, 40));
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
      description: 'Advanced RAG pipeline complete!',
      progress: 100
    });

    setIsProcessing(false);
  };

  const generateAdvancedResponse = (query: string, context: string, docs: RetrievalResult[]): string => {
    return `Based on comprehensive analysis of multiple sources with advanced retrieval and reranking:

Neural networks learn through a sophisticated process involving multiple key mechanisms. According to ${docs[0].document.title} (relevance: ${Math.round((docs[0].rerankedScore || 0) * 100)}%), the learning process fundamentally involves adjusting weights through backpropagation, which calculates gradients of the loss function with respect to network parameters.

The core learning algorithm, as detailed in ${docs[1].document.title}, uses gradient descent optimization to iteratively minimize the cost function. This process propagates errors backward through the network layers, allowing the system to learn complex patterns from data.

Key aspects of neural network learning include:
1. Forward propagation of inputs through layers
2. Loss calculation comparing predictions to targets
3. Backward propagation of error gradients
4. Weight updates proportional to gradients and learning rate
5. Iterative refinement through multiple training epochs

Modern techniques like transfer learning and regularization, mentioned in our curated sources, enhance the learning process by leveraging pre-trained knowledge and preventing overfitting.

This response synthesizes information from ${docs.length} documents with an average relevance score of ${Math.round(docs.reduce((acc, d) => acc + (d.rerankedScore || 0), 0) / docs.length * 100)}%.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      processAdvancedRAGPipeline(query);
    }
  };

  const getStepIcon = (step: RAGStep['step']) => {
    switch (step) {
      case 'query-expansion': return <Target className="w-5 h-5" />;
      case 'indexing': return <Database className="w-5 h-5" />;
      case 'embedding': return <Zap className="w-5 h-5" />;
      case 'retrieving': return <Search className="w-5 h-5" />;
      case 'reranking': return <Shuffle className="w-5 h-5" />;
      case 'context-curation': return <Filter className="w-5 h-5" />;
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
      <h2 className="text-2xl font-bold text-white mb-6">Advanced RAG Demo</h2>

      {/* Query Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            placeholder="Ask about neural networks, deep learning, or AI..."
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

      {/* Advanced RAG Pipeline Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Advanced RAG Pipeline Status</h3>
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

        {/* Query Expansion Display */}
        {queryExpansion && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <div className="text-sm font-medium text-white mb-2">Query Expansion</div>
            <div className="text-xs space-y-1">
              <div className="text-gray-300">
                <span className="text-gray-400">Original:</span> {queryExpansion.original}
              </div>
              {queryExpansion.synonyms.length > 0 && (
                <div className="text-gray-300">
                  <span className="text-gray-400">Synonyms:</span> {queryExpansion.synonyms.join(', ')}
                </div>
              )}
              {queryExpansion.related.length > 0 && (
                <div className="text-gray-300">
                  <span className="text-gray-400">Related:</span> {queryExpansion.related.join(', ')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Retrieved and Reranked Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Initial Retrieved Documents */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Initial Retrieved Documents
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
                    <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {Math.round(result.score * 100)}% match
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Category: {result.document.metadata.category}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reranked Documents */}
        <div className={`bg-gray-800 rounded-lg p-6 relative ${isReranking ? 'animate-pulse' : ''}`}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Reranked Documents (Cross-Encoder)
            {isReranking && (
              <span className="ml-2 text-xs text-yellow-400 animate-pulse">
                🔄 Reranking in progress...
              </span>
            )}
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {rerankedDocuments.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                Reranking will appear here after retrieval.
              </div>
            ) : (
              rerankedDocuments.map((result, idx) => {
                const improvement = (result.rerankedScore || 0) - result.score;
                const isImproved = improvement > 0;
                const isDemoted = improvement < 0;

                return (
                  <div key={result.document.id} className={`rounded p-3 transition-all duration-500 ${
                    idx === 0 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-white text-sm">
                        {idx + 1}. {result.document.title}
                      </div>
                      <div className="flex gap-2">
                        <div className={`text-xs px-2 py-1 rounded ${
                          idx === 0 ? 'bg-green-500/30 text-green-300 font-semibold' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {Math.round((result.rerankedScore || 0) * 100)}% final
                        </div>
                        {isImproved && (
                          <div className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded flex items-center">
                            ↑ +{Math.round(improvement * 100)}%
                          </div>
                        )}
                        {isDemoted && (
                          <div className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded flex items-center">
                            ↓ {Math.round(improvement * 100)}%
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      <span className="text-gray-400">Reranking factors:</span> {result.reason}
                    </div>
                    {idx === 0 && (
                      <div className="text-xs text-green-400 mt-2 font-medium">
                        ✨ Best match after semantic reranking
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Curated Context */}
      {curatedContext && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Curated Context (Deduplicated & Filtered)
          </h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-300 leading-relaxed">{curatedContext}</div>
          </div>
        </div>
      )}

      {/* Generated Response */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          Generated Response
        </h3>
        <div className="bg-gray-700 rounded-lg p-4 min-h-[150px]">
          {generatedResponse ? (
            <div className="text-white whitespace-pre-wrap">{generatedResponse}</div>
          ) : (
            <div className="text-gray-400 text-center">
              Enhanced response will appear here after advanced RAG processing...
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Advanced Performance Metrics</h3>

        {/* Precision Comparison Banner */}
        {metrics.precisionImprovement > 0 && (
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white">
                <span className="font-semibold">Precision Improvement over Naive RAG:</span>
                <span className="ml-2 text-2xl font-bold text-green-400">+{metrics.precisionImprovement.toFixed(1)}%</span>
              </div>
              <div className="text-xs text-gray-300">
                <div>Naive RAG: Simple cosine similarity</div>
                <div>Advanced RAG: Cross-encoder reranking + query expansion</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Docs Indexed</div>
            <div className="text-xl font-bold text-white">{metrics.documentsIndexed}</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Query Embeddings</div>
            <div className="text-xl font-bold text-white">{metrics.embeddingsDone}</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Retrieval Time</div>
            <div className="text-xl font-bold text-white">{metrics.retrievalTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Reranking Time</div>
            <div className="text-xl font-bold text-white">{metrics.rerankingTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Curation Time</div>
            <div className="text-xl font-bold text-white">{metrics.curationTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Generation Time</div>
            <div className="text-xl font-bold text-white">{metrics.generationTime}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Total Latency</div>
            <div className="text-xl font-bold text-white">{metrics.totalLatency}ms</div>
          </div>
          <div className="bg-gray-700 rounded p-3">
            <div className="text-xs text-gray-400">Precision Boost</div>
            <div className="text-xl font-bold text-green-400">+{metrics.precisionImprovement.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Key Differences from Naive RAG */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-6 mt-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">🚀 Key Advantages Over Naive RAG</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">Naive RAG Limitations</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Single query embedding</li>
              <li>• Basic cosine similarity only</li>
              <li>• No query understanding</li>
              <li>• Fixed retrieval ranking</li>
              <li>• May retrieve irrelevant docs</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Advanced RAG Benefits</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>✓ Query expansion with synonyms</li>
              <li>✓ Multi-query embeddings</li>
              <li>✓ Semantic reranking (cross-encoder)</li>
              <li>✓ Context-aware scoring</li>
              <li>✓ 6-15% precision improvement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-800 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">How Advanced RAG Works</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: 'Query Expansion',
              description: 'Enhance query with synonyms & related terms',
              detail: 'Naive RAG misses this'
            },
            {
              icon: <Search className="w-6 h-6" />,
              title: 'Hybrid Retrieval',
              description: 'Multi-strategy document retrieval',
              detail: 'vs. single embedding'
            },
            {
              icon: <Shuffle className="w-6 h-6" />,
              title: 'Reranking',
              description: 'Cross-encoder relevance optimization',
              detail: 'Key differentiator'
            },
            {
              icon: <Filter className="w-6 h-6" />,
              title: 'Context Curation',
              description: 'Deduplicate and filter context',
              detail: 'Better quality'
            }
          ].map((step, idx) => (
            <div key={idx} className="text-center">
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 ${
                idx === 2 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {step.icon}
              </div>
              <div className="text-sm font-medium text-white mb-1">{step.title}</div>
              <div className="text-xs text-gray-400">{step.description}</div>
              <div className="text-xs text-blue-400 mt-1 font-medium">{step.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}