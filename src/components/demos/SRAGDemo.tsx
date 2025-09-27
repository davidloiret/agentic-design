'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Brain, CheckCircle, XCircle, AlertCircle, RefreshCw, Sparkles, Shield, Award, TrendingUp, Info, Zap } from 'lucide-react';

interface ReflectionToken {
  type: 'RETRIEVE' | 'NO_RETRIEVE' | 'RELEVANT' | 'IRRELEVANT' | 'SUPPORTED' | 'NOT_SUPPORTED' | 'USEFUL' | 'NOT_USEFUL';
  confidence: number;
  reasoning: string;
  timestamp: number;
}

interface RetrievalDecision {
  shouldRetrieve: boolean;
  confidence: number;
  reasoning: string;
  factors: {
    queryComplexity: number;
    knowledgeGap: number;
    contextSufficiency: number;
  };
}

interface Document {
  id: string;
  title: string;
  content: string;
  relevanceScore: number;
  qualityScore?: number;
  isUseful?: boolean;
}

interface GenerationSegment {
  text: string;
  isSupported: boolean;
  supportingDocs: string[];
  confidence: number;
}

interface SelfRAGState {
  stage: 'idle' | 'analyzing' | 'deciding' | 'retrieving' | 'evaluating' | 'generating' | 'reflecting' | 'complete';
  currentQuery: string;
  retrievalDecision: RetrievalDecision | null;
  retrievedDocs: Document[];
  reflectionTokens: ReflectionToken[];
  generatedSegments: GenerationSegment[];
  finalResponse: string;
  overallQuality: number;
}

export default function SRAGDemo() {
  const [query] = useState('What are the key innovations in transformer architecture and how do they improve upon RNNs?');
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState<SelfRAGState>({
    stage: 'idle',
    currentQuery: query,
    retrievalDecision: null,
    retrievedDocs: [],
    reflectionTokens: [],
    generatedSegments: [],
    finalResponse: '',
    overallQuality: 0
  });

  const [showReflectionDetails, setShowReflectionDetails] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const knowledgeBase = [
    {
      id: 'doc1',
      title: 'Attention Is All You Need',
      content: 'Transformers eliminate recurrence and rely entirely on self-attention mechanisms to compute representations. The key innovation is the multi-head attention mechanism that allows the model to attend to different positions simultaneously. Unlike RNNs, transformers process sequences in parallel, leading to significant speedups in training.'
    },
    {
      id: 'doc2',
      title: 'RNN Limitations',
      content: 'Recurrent Neural Networks process sequences sequentially, which creates a bottleneck for long sequences. They suffer from vanishing gradients and have difficulty capturing long-range dependencies. The sequential nature prevents parallelization during training.'
    },
    {
      id: 'doc3',
      title: 'Self-Attention Mechanism',
      content: 'Self-attention computes a weighted sum of all positions in a sequence, allowing direct connections between any two positions regardless of distance. This mechanism uses Query, Key, and Value matrices to determine attention weights. The computational complexity is O(n²) but enables capturing global dependencies.'
    },
    {
      id: 'doc4',
      title: 'Positional Encoding',
      content: 'Since transformers lack inherent sequence order awareness, positional encodings are added to input embeddings. These can be learned or fixed (sinusoidal). They provide the model with information about the relative or absolute position of tokens in the sequence.'
    },
    {
      id: 'doc5',
      title: 'Transformer Efficiency',
      content: 'Transformers achieve better performance than RNNs on many NLP tasks due to parallel processing and better gradient flow. Training time is significantly reduced. The architecture scales better with increased model size and data.'
    }
  ];

  const analyzeQueryComplexity = (q: string): RetrievalDecision => {
    // Simulate analyzing if retrieval is needed
    const keywords = ['how', 'why', 'what', 'explain', 'compare', 'innovations', 'technical'];
    const hasComplexKeywords = keywords.some(k => q.toLowerCase().includes(k));

    const queryLength = q.split(' ').length;
    const queryComplexity = Math.min(1, (queryLength / 20) + (hasComplexKeywords ? 0.3 : 0));

    // Check if the model has sufficient internal knowledge
    const technicalTerms = ['transformer', 'rnn', 'attention', 'architecture'];
    const technicalCount = technicalTerms.filter(term =>
      q.toLowerCase().includes(term)
    ).length;

    const knowledgeGap = technicalCount > 2 ? 0.8 : technicalCount > 1 ? 0.5 : 0.2;
    const contextSufficiency = Math.random() * 0.3 + 0.2; // Simulate current context

    const shouldRetrieve = (queryComplexity + knowledgeGap - contextSufficiency) > 0.6;
    const confidence = Math.min(0.95, Math.max(0.6, queryComplexity + knowledgeGap));

    return {
      shouldRetrieve,
      confidence,
      reasoning: shouldRetrieve
        ? `Query requires detailed technical information about ${technicalCount} concepts. External retrieval will improve response quality.`
        : 'Query can be answered with current model knowledge. Retrieval not necessary.',
      factors: {
        queryComplexity,
        knowledgeGap,
        contextSufficiency
      }
    };
  };

  const performRetrieval = (q: string): Document[] => {
    // Simulate retrieval with relevance scoring
    return knowledgeBase.map(doc => {
      let relevanceScore = 0;
      const queryTerms = q.toLowerCase().split(' ');
      const docContent = doc.content.toLowerCase();

      // Calculate relevance
      queryTerms.forEach(term => {
        if (docContent.includes(term)) {
          relevanceScore += 0.1;
        }
      });

      // Boost for specific relevant documents
      if (q.includes('transformer') && doc.title.includes('Transformer')) {
        relevanceScore += 0.3;
      }
      if (q.includes('RNN') && doc.title.includes('RNN')) {
        relevanceScore += 0.25;
      }
      if (q.includes('innovations') && doc.title.includes('Attention')) {
        relevanceScore += 0.35;
      }

      return {
        ...doc,
        relevanceScore: Math.min(1, relevanceScore + Math.random() * 0.2)
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
  };

  const evaluateRetrievalQuality = (docs: Document[]): ReflectionToken[] => {
    const tokens: ReflectionToken[] = [];

    docs.forEach(doc => {
      // Evaluate relevance
      const isRelevant = doc.relevanceScore > 0.5;
      tokens.push({
        type: isRelevant ? 'RELEVANT' : 'IRRELEVANT',
        confidence: doc.relevanceScore,
        reasoning: isRelevant
          ? `Document "${doc.title}" directly addresses the query topics`
          : `Document "${doc.title}" has limited relevance to the query`,
        timestamp: Date.now()
      });

      // Evaluate usefulness
      const isUseful = doc.relevanceScore > 0.6 && Math.random() > 0.2;
      tokens.push({
        type: isUseful ? 'USEFUL' : 'NOT_USEFUL',
        confidence: isUseful ? 0.85 : 0.4,
        reasoning: isUseful
          ? `Contains specific information about ${doc.title.includes('Transformer') ? 'transformers' : 'related concepts'}`
          : 'Information is too general or already known',
        timestamp: Date.now()
      });
    });

    return tokens;
  };

  const generateWithReflection = (docs: Document[], q: string): GenerationSegment[] => {
    const segments: GenerationSegment[] = [];

    // Generate response segments with support evaluation
    segments.push({
      text: 'Transformer architecture introduces several key innovations over RNNs:',
      isSupported: true,
      supportingDocs: [docs[0]?.id || 'doc1'],
      confidence: 0.95
    });

    segments.push({
      text: '1. **Self-Attention Mechanism**: Unlike RNNs that process sequences sequentially, transformers use self-attention to process all positions simultaneously, enabling parallel computation.',
      isSupported: true,
      supportingDocs: [docs[0]?.id || 'doc1', docs[2]?.id || 'doc3'],
      confidence: 0.92
    });

    segments.push({
      text: '2. **Elimination of Recurrence**: This removes the sequential bottleneck of RNNs, allowing much faster training and better handling of long sequences.',
      isSupported: true,
      supportingDocs: [docs[1]?.id || 'doc2'],
      confidence: 0.88
    });

    segments.push({
      text: '3. **Multi-Head Attention**: Enables the model to attend to different representation subspaces simultaneously, capturing various types of relationships.',
      isSupported: true,
      supportingDocs: [docs[0]?.id || 'doc1'],
      confidence: 0.90
    });

    segments.push({
      text: '4. **Better Gradient Flow**: The direct connections between positions prevent vanishing gradient problems common in RNNs.',
      isSupported: docs.length > 2,
      supportingDocs: docs.length > 2 ? [docs[1]?.id || 'doc2'] : [],
      confidence: docs.length > 2 ? 0.85 : 0.65
    });

    return segments;
  };

  const calculateOverallQuality = (tokens: ReflectionToken[], segments: GenerationSegment[]): number => {
    const relevantTokens = tokens.filter(t => t.type === 'RELEVANT').length;
    const usefulTokens = tokens.filter(t => t.type === 'USEFUL').length;
    const supportedSegments = segments.filter(s => s.isSupported).length;

    const relevanceScore = relevantTokens / Math.max(1, tokens.filter(t => t.type === 'RELEVANT' || t.type === 'IRRELEVANT').length);
    const usefulnessScore = usefulTokens / Math.max(1, tokens.filter(t => t.type === 'USEFUL' || t.type === 'NOT_USEFUL').length);
    const supportScore = supportedSegments / Math.max(1, segments.length);

    return (relevanceScore * 0.3 + usefulnessScore * 0.3 + supportScore * 0.4);
  };

  const runSelfRAGPipeline = async () => {
    setIsProcessing(true);
    setState(prev => ({ ...prev, stage: 'analyzing' }));

    // Step 1: Analyze query and decide on retrieval
    await new Promise(resolve => setTimeout(resolve, 800));
    const decision = analyzeQueryComplexity(query);
    setState(prev => ({
      ...prev,
      stage: 'deciding',
      retrievalDecision: decision,
      reflectionTokens: [{
        type: decision.shouldRetrieve ? 'RETRIEVE' : 'NO_RETRIEVE',
        confidence: decision.confidence,
        reasoning: decision.reasoning,
        timestamp: Date.now()
      }]
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    let retrievedDocs: Document[] = [];
    let evaluationTokens: ReflectionToken[] = [];

    if (decision.shouldRetrieve) {
      // Step 2: Perform retrieval
      setState(prev => ({ ...prev, stage: 'retrieving' }));
      await new Promise(resolve => setTimeout(resolve, 1200));

      retrievedDocs = performRetrieval(query);
      setState(prev => ({
        ...prev,
        retrievedDocs
      }));

      // Step 3: Evaluate retrieval quality
      setState(prev => ({ ...prev, stage: 'evaluating' }));
      await new Promise(resolve => setTimeout(resolve, 1000));

      evaluationTokens = evaluateRetrievalQuality(retrievedDocs);
      setState(prev => ({
        ...prev,
        reflectionTokens: [...prev.reflectionTokens, ...evaluationTokens]
      }));
    }

    // Step 4: Generate response with reflection
    setState(prev => ({ ...prev, stage: 'generating' }));
    await new Promise(resolve => setTimeout(resolve, 1500));

    const segments = generateWithReflection(retrievedDocs, query);
    setState(prev => ({
      ...prev,
      generatedSegments: segments
    }));

    // Step 5: Final reflection and quality assessment
    setState(prev => ({ ...prev, stage: 'reflecting' }));
    await new Promise(resolve => setTimeout(resolve, 800));

    // Add generation support tokens
    const supportTokens: ReflectionToken[] = segments.map(seg => ({
      type: seg.isSupported ? 'SUPPORTED' : 'NOT_SUPPORTED',
      confidence: seg.confidence,
      reasoning: seg.isSupported
        ? `Statement supported by ${seg.supportingDocs.length} document(s)`
        : 'Statement based on model knowledge without retrieval support',
      timestamp: Date.now()
    }));

    const finalResponse = segments.map(s => s.text).join('\n\n');
    const overallQuality = calculateOverallQuality([...evaluationTokens, ...supportTokens], segments);

    setState(prev => ({
      ...prev,
      stage: 'complete',
      reflectionTokens: [...prev.reflectionTokens, ...supportTokens],
      finalResponse,
      overallQuality
    }));

    setIsProcessing(false);
  };

  const getStageIcon = (stage: SelfRAGState['stage']) => {
    switch (stage) {
      case 'analyzing': return <Brain className="w-5 h-5" />;
      case 'deciding': return <AlertCircle className="w-5 h-5" />;
      case 'retrieving': return <Search className="w-5 h-5" />;
      case 'evaluating': return <Shield className="w-5 h-5" />;
      case 'generating': return <Sparkles className="w-5 h-5" />;
      case 'reflecting': return <RefreshCw className="w-5 h-5" />;
      case 'complete': return <CheckCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStageColor = (stage: SelfRAGState['stage']) => {
    switch (stage) {
      case 'complete': return 'text-green-400 bg-green-500/20';
      case 'idle': return 'text-gray-400 bg-gray-700';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  const getTokenColor = (type: ReflectionToken['type']) => {
    switch (type) {
      case 'RETRIEVE':
      case 'RELEVANT':
      case 'SUPPORTED':
      case 'USEFUL':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'NO_RETRIEVE':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Self-RAG Demo</h2>

      {/* Query Input */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            readOnly
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
          />
          <button
            onClick={runSelfRAGPipeline}
            disabled={isProcessing}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Run Self-RAG'}
          </button>
        </div>
      </div>

      {/* Self-RAG Pipeline Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Self-Reflective RAG Pipeline
        </h3>

        {/* Current Stage */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${getStageColor(state.stage)}`}>
            {getStageIcon(state.stage)}
          </div>
          <div className="flex-1">
            <div className="text-white font-medium capitalize">
              {state.stage === 'idle' ? 'Ready to process' :
               state.stage === 'complete' ? 'Pipeline complete!' :
               `${state.stage.charAt(0).toUpperCase() + state.stage.slice(1)}...`}
            </div>
            {state.stage !== 'idle' && state.stage !== 'complete' && (
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500 animate-pulse"
                  style={{ width: '60%' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Retrieval Decision */}
        {state.retrievalDecision && (
          <div className={`p-4 rounded-lg border ${
            state.retrievalDecision.shouldRetrieve
              ? 'bg-blue-900/30 border-blue-500/30'
              : 'bg-yellow-900/30 border-yellow-500/30'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-white">
                Retrieval Decision: {state.retrievalDecision.shouldRetrieve ? 'RETRIEVE' : 'NO RETRIEVAL NEEDED'}
              </div>
              <div className="text-xs px-2 py-1 bg-gray-700 rounded">
                {Math.round(state.retrievalDecision.confidence * 100)}% confidence
              </div>
            </div>
            <div className="text-xs text-gray-300 mb-2">{state.retrievalDecision.reasoning}</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-gray-400">Query Complexity</div>
                <div className="text-white font-medium">
                  {Math.round(state.retrievalDecision.factors.queryComplexity * 100)}%
                </div>
              </div>
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-gray-400">Knowledge Gap</div>
                <div className="text-white font-medium">
                  {Math.round(state.retrievalDecision.factors.knowledgeGap * 100)}%
                </div>
              </div>
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-gray-400">Context Sufficiency</div>
                <div className="text-white font-medium">
                  {Math.round(state.retrievalDecision.factors.contextSufficiency * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reflection Tokens */}
      {state.reflectionTokens.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" />
              Reflection Tokens
            </h3>
            <button
              onClick={() => setShowReflectionDetails(!showReflectionDetails)}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              {showReflectionDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.reflectionTokens.map((token, idx) => (
              <div
                key={idx}
                className={`px-3 py-1 rounded-lg border text-xs font-medium ${getTokenColor(token.type)}`}
                title={token.reasoning}
              >
                {token.type} ({Math.round(token.confidence * 100)}%)
              </div>
            ))}
          </div>

          {showReflectionDetails && (
            <div className="mt-4 space-y-2">
              {state.reflectionTokens.slice(-3).map((token, idx) => (
                <div key={idx} className="bg-gray-700/50 rounded p-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className={`font-medium ${
                      token.type.includes('NOT') || token.type.includes('IRRELEVANT')
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}>
                      {token.type}
                    </span>
                    <span className="text-gray-400">
                      {Math.round(token.confidence * 100)}%
                    </span>
                  </div>
                  <div className="text-gray-300 mt-1">{token.reasoning}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Retrieved Documents */}
      {state.retrievedDocs.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Retrieved & Evaluated Documents
          </h3>
          <div className="space-y-3">
            {state.retrievedDocs.map(doc => {
              const relevanceToken = state.reflectionTokens.find(
                t => (t.type === 'RELEVANT' || t.type === 'IRRELEVANT') &&
                     t.reasoning.includes(doc.title)
              );
              const usefulToken = state.reflectionTokens.find(
                t => (t.type === 'USEFUL' || t.type === 'NOT_USEFUL') &&
                     t.reasoning.includes(doc.title.split(' ')[0])
              );

              return (
                <div key={doc.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-white">{doc.title}</div>
                    <div className="flex gap-2">
                      <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {Math.round(doc.relevanceScore * 100)}% relevant
                      </div>
                      {relevanceToken && (
                        <div className={`text-xs px-2 py-1 rounded ${
                          relevanceToken.type === 'RELEVANT'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {relevanceToken.type === 'RELEVANT' ? '✓' : '✗'} Relevant
                        </div>
                      )}
                      {usefulToken && (
                        <div className={`text-xs px-2 py-1 rounded ${
                          usefulToken.type === 'USEFUL'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {usefulToken.type === 'USEFUL' ? '✓' : '○'} Useful
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 line-clamp-2">{doc.content}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Generated Response with Support Indicators */}
      {state.generatedSegments.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Generated Response with Support Evaluation
          </h3>
          <div className="space-y-3">
            {state.generatedSegments.map((segment, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  segment.isSupported
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-yellow-900/20 border-yellow-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-sm text-white flex-1">{segment.text}</div>
                  <div className="flex items-center gap-2 ml-2">
                    {segment.isSupported ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-xs text-gray-400">
                      {Math.round(segment.confidence * 100)}%
                    </span>
                  </div>
                </div>
                {segment.supportingDocs.length > 0 && (
                  <div className="text-xs text-gray-400">
                    Supported by: {segment.supportingDocs.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overall Quality Score */}
      {state.stage === 'complete' && (
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Self-RAG Quality Assessment
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-white">
              {Math.round(state.overallQuality * 100)}%
            </div>
            <div className="text-sm text-gray-300">
              <div>✓ Adaptive retrieval decision</div>
              <div>✓ Quality evaluation at each step</div>
              <div>✓ Response verification with sources</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded p-3">
              <div className="text-xs text-gray-400">Retrieval Quality</div>
              <div className="text-lg font-semibold text-green-400">
                {state.reflectionTokens.filter(t => t.type === 'RELEVANT').length}/
                {state.retrievedDocs.length} Relevant
              </div>
            </div>
            <div className="bg-gray-800/50 rounded p-3">
              <div className="text-xs text-gray-400">Response Support</div>
              <div className="text-lg font-semibold text-blue-400">
                {state.generatedSegments.filter(s => s.isSupported).length}/
                {state.generatedSegments.length} Supported
              </div>
            </div>
            <div className="bg-gray-800/50 rounded p-3">
              <div className="text-xs text-gray-400">Confidence Level</div>
              <div className="text-lg font-semibold text-purple-400">
                {Math.round(
                  state.generatedSegments.reduce((acc, s) => acc + s.confidence, 0) /
                  state.generatedSegments.length * 100
                )}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gray-800 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          🎯 Self-RAG Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">
              Adaptive Retrieval Decision
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Analyzes query complexity</li>
              <li>• Assesses knowledge gaps</li>
              <li>• Determines if retrieval is needed</li>
              <li>• Saves computation when unnecessary</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">
              Reflection Tokens
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• RETRIEVE/NO_RETRIEVE decision</li>
              <li>• RELEVANT/IRRELEVANT evaluation</li>
              <li>• SUPPORTED/NOT_SUPPORTED verification</li>
              <li>• USEFUL/NOT_USEFUL assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}