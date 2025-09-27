'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, RefreshCw, TrendingUp, Shield, Zap, Database, ArrowRight, AlertCircle, Filter } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
  source: string;
  relevanceScore: number;
  qualityScore?: number;
  correctionAttempt?: number;
}

interface QualityAssessment {
  overallQuality: 'good' | 'poor' | 'ambiguous';
  score: number;
  issues: string[];
  recommendations: string[];
}

interface CorrectionStrategy {
  type: 'query-rewrite' | 'source-expansion' | 'filtering' | 'web-search';
  description: string;
  applied: boolean;
  success: boolean;
}

interface RetrievalAttempt {
  attemptNumber: number;
  query: string;
  documents: Document[];
  assessment: QualityAssessment;
  correctionApplied?: CorrectionStrategy;
}

export default function CRAGDemo() {
  const [originalQuery] = useState('What are the latest advances in quantum computing error correction?');
  const [currentQuery, setCurrentQuery] = useState(originalQuery);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<'idle' | 'retrieving' | 'assessing' | 'correcting' | 'finalizing' | 'complete'>('idle');

  const [retrievalAttempts, setRetrievalAttempts] = useState<RetrievalAttempt[]>([]);
  const [currentDocuments, setCurrentDocuments] = useState<Document[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const [correctionStrategies, setCorrectionStrategies] = useState<CorrectionStrategy[]>([]);

  // Simulated knowledge base with varying quality
  const knowledgeBase = {
    poor: [
      {
        id: 'poor1',
        title: 'Introduction to Quantum Computing',
        content: 'Quantum computing uses qubits instead of classical bits. It has potential applications in cryptography and optimization.',
        source: 'Basic Tutorial 2019',
        relevanceScore: 0.3
      },
      {
        id: 'poor2',
        title: 'Classical Error Correction',
        content: 'Error correction in classical computing involves parity checks and redundancy. Hamming codes are commonly used.',
        source: 'CS Textbook 2018',
        relevanceScore: 0.25
      },
      {
        id: 'poor3',
        title: 'Quantum Mechanics Basics',
        content: 'Quantum mechanics describes the behavior of matter at atomic scales. Superposition and entanglement are key concepts.',
        source: 'Physics Guide 2020',
        relevanceScore: 0.2
      }
    ],
    medium: [
      {
        id: 'med1',
        title: 'Quantum Error Correction Overview',
        content: 'Quantum error correction protects quantum information from decoherence and noise. Surface codes and stabilizer codes are important approaches.',
        source: 'Quantum Review 2022',
        relevanceScore: 0.6
      },
      {
        id: 'med2',
        title: 'Shor\'s Code',
        content: 'Shor\'s code was one of the first quantum error correction codes, capable of correcting arbitrary single-qubit errors using 9 physical qubits.',
        source: 'Quantum Algorithms 2021',
        relevanceScore: 0.55
      }
    ],
    good: [
      {
        id: 'good1',
        title: 'Recent Advances in Topological Quantum Error Correction',
        content: 'In 2024, researchers achieved breakthrough error rates below 0.1% using topological quantum error correction with surface codes on superconducting qubits. The implementation uses real-time decoding with machine learning optimizations.',
        source: 'Nature Quantum 2024',
        relevanceScore: 0.95
      },
      {
        id: 'good2',
        title: 'Google\'s Willow Chip Error Correction',
        content: 'Google\'s Willow quantum chip demonstrated exponential error reduction with increasing qubit count. The system achieved below-threshold error rates, marking a significant milestone toward fault-tolerant quantum computing.',
        source: 'Google Quantum AI 2024',
        relevanceScore: 0.92
      },
      {
        id: 'good3',
        title: 'LDPC Codes for Quantum Computing',
        content: 'Low-density parity-check (LDPC) codes show promise for quantum error correction with better scaling properties than surface codes. Recent implementations achieved 10x improvement in logical error rates.',
        source: 'Quantum Science 2024',
        relevanceScore: 0.88
      }
    ],
    web: [
      {
        id: 'web1',
        title: 'IBM Quantum Network Updates',
        content: 'IBM\'s latest quantum processors implement advanced error mitigation techniques including zero-noise extrapolation and probabilistic error cancellation, achieving 100x improvement in result quality.',
        source: 'IBM Research Blog 2024',
        relevanceScore: 0.85
      },
      {
        id: 'web2',
        title: 'Quantum Error Correction Roadmap',
        content: 'Industry roadmap projects fault-tolerant quantum computers with 1000+ logical qubits by 2030, enabled by advances in error correction including cat codes and bosonic codes.',
        source: 'Quantum Industry Report 2024',
        relevanceScore: 0.80
      }
    ]
  };

  const performInitialRetrieval = (query: string): Document[] => {
    // Simulate poor initial retrieval
    const docs = [...knowledgeBase.poor];

    // Add low quality scores
    return docs.map(doc => ({
      ...doc,
      qualityScore: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
      correctionAttempt: 0
    }));
  };

  const assessQuality = (docs: Document[]): QualityAssessment => {
    const avgRelevance = docs.reduce((acc, doc) => acc + doc.relevanceScore, 0) / docs.length;
    const avgQuality = docs.reduce((acc, doc) => acc + (doc.qualityScore || 0), 0) / docs.length;
    const combinedScore = (avgRelevance + avgQuality) / 2;

    const issues: string[] = [];
    const recommendations: string[] = [];

    if (avgRelevance < 0.5) {
      issues.push('Low relevance scores detected');
      recommendations.push('Query expansion or reformulation needed');
    }

    if (avgQuality < 0.5) {
      issues.push('Poor document quality');
      recommendations.push('Search additional sources');
    }

    const hasRecentInfo = docs.some(doc => doc.source.includes('2024'));
    if (!hasRecentInfo) {
      issues.push('No recent information found');
      recommendations.push('Include web search for latest updates');
    }

    const hasSpecificInfo = docs.some(doc =>
      doc.content.toLowerCase().includes('error correction') ||
      doc.content.toLowerCase().includes('quantum')
    );
    if (!hasSpecificInfo) {
      issues.push('Missing domain-specific content');
      recommendations.push('Refine query with technical terms');
    }

    let overallQuality: 'good' | 'poor' | 'ambiguous';
    if (combinedScore > 0.7) {
      overallQuality = 'good';
    } else if (combinedScore < 0.4) {
      overallQuality = 'poor';
    } else {
      overallQuality = 'ambiguous';
    }

    return {
      overallQuality,
      score: combinedScore,
      issues,
      recommendations
    };
  };

  const applyCorrection = (
    strategy: CorrectionStrategy['type'],
    currentDocs: Document[],
    query: string,
    attemptNum: number
  ): { newQuery: string; newDocs: Document[] } => {
    let newQuery = query;
    let newDocs: Document[] = [];

    switch (strategy) {
      case 'query-rewrite':
        // Expand and refine the query
        newQuery = `${query} topological codes surface codes LDPC 2024 latest breakthroughs`;
        // Get better documents
        newDocs = [
          ...knowledgeBase.medium,
          ...knowledgeBase.good.slice(0, 2)
        ].map(doc => ({
          ...doc,
          qualityScore: Math.random() * 0.3 + 0.6, // 0.6 to 0.9
          correctionAttempt: attemptNum
        }));
        break;

      case 'source-expansion':
        // Keep original query but search more sources
        newDocs = [
          ...currentDocs.filter(d => d.relevanceScore > 0.3),
          ...knowledgeBase.medium,
          ...knowledgeBase.good.slice(0, 1)
        ].map(doc => ({
          ...doc,
          qualityScore: Math.random() * 0.2 + 0.7, // 0.7 to 0.9
          correctionAttempt: attemptNum
        }));
        break;

      case 'filtering':
        // Remove low quality and add high quality
        const filtered = currentDocs.filter(d => d.relevanceScore > 0.4);
        newDocs = [
          ...filtered,
          ...knowledgeBase.good
        ].map(doc => ({
          ...doc,
          qualityScore: Math.random() * 0.2 + 0.75, // 0.75 to 0.95
          correctionAttempt: attemptNum
        }));
        break;

      case 'web-search':
        // Add web search results
        newDocs = [
          ...currentDocs.filter(d => d.relevanceScore > 0.5).slice(0, 2),
          ...knowledgeBase.good,
          ...knowledgeBase.web
        ].map(doc => ({
          ...doc,
          qualityScore: Math.random() * 0.15 + 0.8, // 0.8 to 0.95
          correctionAttempt: attemptNum
        }));
        break;
    }

    // Sort by relevance
    newDocs.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return { newQuery, newDocs: newDocs.slice(0, 5) };
  };

  const generateResponse = (docs: Document[]): string => {
    const highQualityDocs = docs.filter(d => d.relevanceScore > 0.7);

    if (highQualityDocs.length >= 3) {
      return `Based on the latest research and corrected retrieval:

**Recent Advances in Quantum Error Correction (2024):**

1. **Topological Quantum Error Correction**: Breakthrough achievement with error rates below 0.1% using surface codes on superconducting qubits, incorporating real-time ML-optimized decoding.

2. **Google's Willow Chip**: Demonstrated exponential error reduction with increasing qubit count, achieving below-threshold error rates - a critical milestone for fault-tolerant quantum computing.

3. **LDPC Codes**: Show 10x improvement in logical error rates with better scaling properties than traditional surface codes.

4. **Error Mitigation Techniques**: IBM's implementation of zero-noise extrapolation and probabilistic error cancellation achieved 100x improvement in result quality.

5. **Industry Outlook**: Roadmap projects 1000+ logical qubit systems by 2030, enabled by advances in cat codes and bosonic codes.

*This response was generated after ${docs[0].correctionAttempt || 0} correction cycles to ensure accuracy and relevance.*`;
    } else {
      return `Based on available information:

Quantum error correction is a critical component for building practical quantum computers. Current approaches include surface codes, stabilizer codes, and topological codes. Recent developments focus on reducing error rates and improving scalability.

*Note: Initial retrieval quality was improved through corrective measures, but some information gaps remain.*`;
    }
  };

  const runCRAGPipeline = async () => {
    setIsProcessing(true);
    setRetrievalAttempts([]);
    setCorrectionStrategies([]);
    setCurrentDocuments([]);
    setFinalResponse('');

    // Attempt 1: Initial retrieval (intentionally poor)
    setCurrentStage('retrieving');
    await new Promise(resolve => setTimeout(resolve, 800));

    const initialDocs = performInitialRetrieval(originalQuery);
    setCurrentDocuments(initialDocs);

    // Assess quality
    setCurrentStage('assessing');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const initialAssessment = assessQuality(initialDocs);

    const attempt1: RetrievalAttempt = {
      attemptNumber: 1,
      query: originalQuery,
      documents: initialDocs,
      assessment: initialAssessment
    };
    setRetrievalAttempts([attempt1]);

    // Since quality is poor, apply corrections
    if (initialAssessment.overallQuality === 'poor' || initialAssessment.overallQuality === 'ambiguous') {
      setCurrentStage('correcting');

      // Define correction strategies
      const strategies: CorrectionStrategy[] = [
        {
          type: 'query-rewrite',
          description: 'Expand query with technical terms and temporal constraints',
          applied: false,
          success: false
        },
        {
          type: 'source-expansion',
          description: 'Search additional academic and industry sources',
          applied: false,
          success: false
        },
        {
          type: 'web-search',
          description: 'Include latest web results for recent developments',
          applied: false,
          success: false
        }
      ];
      setCorrectionStrategies(strategies);

      // Apply corrections iteratively
      let currentAttempt = 1;
      let lastDocs = initialDocs;
      let lastQuery = originalQuery;
      let lastAssessment = initialAssessment;

      for (const strategy of strategies) {
        if (lastAssessment.overallQuality === 'good') break;

        await new Promise(resolve => setTimeout(resolve, 1200));

        // Apply correction
        const { newQuery, newDocs } = applyCorrection(
          strategy.type,
          lastDocs,
          lastQuery,
          currentAttempt + 1
        );

        setCurrentQuery(newQuery);
        setCurrentDocuments(newDocs);

        // Reassess
        setCurrentStage('assessing');
        await new Promise(resolve => setTimeout(resolve, 800));

        const newAssessment = assessQuality(newDocs);

        // Update strategy status
        strategy.applied = true;
        strategy.success = newAssessment.score > lastAssessment.score;
        setCorrectionStrategies([...strategies]);

        // Record attempt
        const newAttempt: RetrievalAttempt = {
          attemptNumber: currentAttempt + 1,
          query: newQuery,
          documents: newDocs,
          assessment: newAssessment,
          correctionApplied: strategy
        };
        setRetrievalAttempts(prev => [...prev, newAttempt]);

        lastDocs = newDocs;
        lastQuery = newQuery;
        lastAssessment = newAssessment;
        currentAttempt++;

        // If quality is good enough, stop
        if (newAssessment.overallQuality === 'good' || currentAttempt >= 3) {
          break;
        }

        setCurrentStage('correcting');
      }
    }

    // Generate final response
    setCurrentStage('finalizing');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = generateResponse(currentDocuments);
    setFinalResponse(response);

    setCurrentStage('complete');
    setIsProcessing(false);
  };

  const getQualityColor = (quality: QualityAssessment['overallQuality']) => {
    switch (quality) {
      case 'good': return 'text-green-400 bg-green-500/20';
      case 'ambiguous': return 'text-yellow-400 bg-yellow-500/20';
      case 'poor': return 'text-red-400 bg-red-500/20';
    }
  };

  const getQualityIcon = (quality: QualityAssessment['overallQuality']) => {
    switch (quality) {
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'ambiguous': return <AlertCircle className="w-5 h-5" />;
      case 'poor': return <XCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Corrective RAG (CRAG) Demo</h2>

      {/* Query Input */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={originalQuery}
            readOnly
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
          />
          <button
            onClick={runCRAGPipeline}
            disabled={isProcessing}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Run CRAG'}
          </button>
        </div>
        {currentQuery !== originalQuery && (
          <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-500/30 rounded">
            <div className="text-xs text-yellow-400">Query rewritten to:</div>
            <div className="text-sm text-white mt-1">{currentQuery}</div>
          </div>
        )}
      </div>

      {/* Current Stage */}
      {currentStage !== 'idle' && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">CRAG Pipeline Status</h3>
          <div className="flex items-center gap-2 mb-4">
            {['retrieving', 'assessing', 'correcting', 'finalizing', 'complete'].map((stage, idx) => (
              <React.Fragment key={stage}>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  currentStage === stage
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : currentStage === 'complete' ||
                      ['retrieving', 'assessing', 'correcting', 'finalizing'].indexOf(currentStage) > idx
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-700 text-gray-500'
                }`}>
                  {stage === 'retrieving' && <Search className="w-4 h-4" />}
                  {stage === 'assessing' && <Shield className="w-4 h-4" />}
                  {stage === 'correcting' && <RefreshCw className="w-4 h-4" />}
                  {stage === 'finalizing' && <Zap className="w-4 h-4" />}
                  {stage === 'complete' && <CheckCircle className="w-4 h-4" />}
                  <span className="text-xs capitalize">{stage}</span>
                </div>
                {idx < 4 && <ArrowRight className="w-4 h-4 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Retrieval Attempts */}
      {retrievalAttempts.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Retrieval Attempts & Quality Assessment</h3>
          <div className="space-y-4">
            {retrievalAttempts.map(attempt => (
              <div key={attempt.attemptNumber} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      Attempt {attempt.attemptNumber}
                    </span>
                    {attempt.correctionApplied && (
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {attempt.correctionApplied.type.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${getQualityColor(attempt.assessment.overallQuality)}`}>
                    {getQualityIcon(attempt.assessment.overallQuality)}
                    <span className="text-sm font-medium capitalize">
                      {attempt.assessment.overallQuality}
                    </span>
                    <span className="text-xs">
                      ({Math.round(attempt.assessment.score * 100)}%)
                    </span>
                  </div>
                </div>

                {/* Issues and Recommendations */}
                {attempt.assessment.issues.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-red-900/20 rounded p-2">
                      <div className="text-xs font-semibold text-red-400 mb-1">Issues Detected:</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {attempt.assessment.issues.map((issue, idx) => (
                          <li key={idx}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 rounded p-2">
                      <div className="text-xs font-semibold text-blue-400 mb-1">Corrections Applied:</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {attempt.assessment.recommendations.map((rec, idx) => (
                          <li key={idx}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Retrieved Documents */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {attempt.documents.map(doc => (
                    <div key={doc.id} className="bg-gray-700/50 rounded p-2">
                      <div className="text-xs font-medium text-white truncate">{doc.title}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">{doc.source}</span>
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          doc.relevanceScore > 0.7
                            ? 'bg-green-500/20 text-green-400'
                            : doc.relevanceScore > 0.4
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {Math.round(doc.relevanceScore * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Correction Strategies */}
      {correctionStrategies.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2" />
            Correction Strategies Applied
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {correctionStrategies.map((strategy, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  strategy.applied
                    ? strategy.success
                      ? 'bg-green-900/20 border-green-500/30'
                      : 'bg-yellow-900/20 border-yellow-500/30'
                    : 'bg-gray-700 border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {strategy.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  {strategy.applied && (
                    strategy.success ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )
                  )}
                </div>
                <div className="text-xs text-gray-300">{strategy.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Response */}
      {finalResponse && (
        <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-500/30 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Corrected Response
          </h3>
          <div className="text-white whitespace-pre-wrap">{finalResponse}</div>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎯 CRAG Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-400 mb-2">Automatic Quality Detection</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Relevance scoring</li>
              <li>• Content quality assessment</li>
              <li>• Temporal relevance check</li>
              <li>• Domain specificity validation</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">Correction Strategies</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Query reformulation</li>
              <li>• Source expansion</li>
              <li>• Quality filtering</li>
              <li>• Web search integration</li>
            </ul>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">Iterative Improvement</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Multiple retrieval attempts</li>
              <li>• Progressive quality enhancement</li>
              <li>• Strategy effectiveness tracking</li>
              <li>• Convergence to optimal results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}