'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'analyze-content' | 'extract-key-info' | 'compress-semantically' | 'validate-quality' | 'optimize-budget' | 'complete';
type ContentStatus = 'original' | 'analyzing' | 'extracting' | 'compressing' | 'compressed' | 'pruned';
type ImportanceLevel = 'critical' | 'high' | 'medium' | 'low';

interface ContentSegment {
  id: string;
  title: string;
  content: string;
  originalTokens: number;
  compressedTokens: number;
  importance: ImportanceLevel;
  status: ContentStatus;
  redundancy: number;
  semanticCluster?: string;
}

interface CompressionMetrics {
  compressionRatio: number;
  semanticFidelity: number;
  informationDensity: number;
  costSavings: number;
  processingTimeMs: number;
  qualityScore: number;
}

const initialSegments: ContentSegment[] = [
  {
    id: 'seg-1',
    title: 'User Query Context',
    content: 'The user is asking about implementing a RAG system for their customer support application...',
    originalTokens: 450,
    compressedTokens: 450,
    importance: 'critical',
    status: 'original',
    redundancy: 0,
  },
  {
    id: 'seg-2',
    title: 'Previous Discussion (Part 1)',
    content: 'Earlier in the conversation, we discussed vector databases and semantic search capabilities...',
    originalTokens: 380,
    compressedTokens: 380,
    importance: 'high',
    status: 'original',
    redundancy: 15,
    semanticCluster: 'Technical Background',
  },
  {
    id: 'seg-3',
    title: 'Previous Discussion (Part 2)',
    content: 'We also talked about how vector databases enable semantic search using embeddings...',
    originalTokens: 320,
    compressedTokens: 320,
    importance: 'medium',
    status: 'original',
    redundancy: 45,
    semanticCluster: 'Technical Background',
  },
  {
    id: 'seg-4',
    title: 'Technical Specifications',
    content: 'The system needs to handle 10,000 documents with average length of 2,000 tokens each...',
    originalTokens: 290,
    compressedTokens: 290,
    importance: 'high',
    status: 'original',
    redundancy: 10,
  },
  {
    id: 'seg-5',
    title: 'General Background',
    content: 'RAG stands for Retrieval-Augmented Generation, which is a technique that combines...',
    originalTokens: 410,
    compressedTokens: 410,
    importance: 'low',
    status: 'original',
    redundancy: 70,
    semanticCluster: 'General Knowledge',
  },
  {
    id: 'seg-6',
    title: 'Implementation Details',
    content: 'For the implementation, we need to integrate with OpenAI embeddings API and Pinecone...',
    originalTokens: 360,
    compressedTokens: 360,
    importance: 'critical',
    status: 'original',
    redundancy: 5,
  },
  {
    id: 'seg-7',
    title: 'Example Code Discussion',
    content: 'Here is an example of how to set up the vector store: First, initialize the client...',
    originalTokens: 520,
    compressedTokens: 520,
    importance: 'high',
    status: 'original',
    redundancy: 20,
  },
  {
    id: 'seg-8',
    title: 'Tangential Discussion',
    content: 'By the way, there are many other approaches to information retrieval, including...',
    originalTokens: 340,
    compressedTokens: 340,
    importance: 'low',
    status: 'original',
    redundancy: 85,
    semanticCluster: 'Tangential',
  },
];

export default function ContextCompressPatternsDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [segments, setSegments] = useState<ContentSegment[]>(initialSegments);
  const [metrics, setMetrics] = useState<CompressionMetrics>({
    compressionRatio: 1.0,
    semanticFidelity: 100,
    informationDensity: 0,
    costSavings: 0,
    processingTimeMs: 0,
    qualityScore: 0,
  });

  const totalOriginalTokens = initialSegments.reduce((sum, seg) => sum + seg.originalTokens, 0);
  const totalCompressedTokens = segments.reduce((sum, seg) => sum + seg.compressedTokens, 0);

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const startTime = Date.now();

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('analyze-content'), 100));
    }

    else if (phase === 'analyze-content') {
      let segIndex = 0;

      const analyzeSegment = () => {
        if (segIndex >= initialSegments.length) {
          timeouts.push(setTimeout(() => setPhase('extract-key-info'), 300));
          return;
        }

        const seg = initialSegments[segIndex];

        setSegments(prev => prev.map(s =>
          s.id === seg.id
            ? { ...s, status: 'analyzing' as ContentStatus }
            : s
        ));

        segIndex++;
        timeouts.push(setTimeout(analyzeSegment, 180));
      };

      analyzeSegment();
    }

    else if (phase === 'extract-key-info') {
      const criticalAndHigh = segments.filter(s => s.importance === 'critical' || s.importance === 'high');

      let segIndex = 0;
      const extractSegment = () => {
        if (segIndex >= criticalAndHigh.length) {
          timeouts.push(setTimeout(() => setPhase('compress-semantically'), 300));
          return;
        }

        const seg = criticalAndHigh[segIndex];

        setSegments(prev => prev.map(s =>
          s.id === seg.id
            ? { ...s, status: 'extracting' as ContentStatus }
            : s
        ));

        segIndex++;
        timeouts.push(setTimeout(extractSegment, 200));
      };

      extractSegment();
    }

    else if (phase === 'compress-semantically') {
      let segIndex = 0;

      const compressSegment = () => {
        if (segIndex >= initialSegments.length) {
          timeouts.push(setTimeout(() => setPhase('validate-quality'), 300));
          return;
        }

        const seg = initialSegments[segIndex];

        setSegments(prev => prev.map(s => {
          if (s.id !== seg.id) return s;

          let compressionFactor = 1.0;
          if (s.importance === 'critical') {
            compressionFactor = 0.90; // 10% reduction
          } else if (s.importance === 'high') {
            compressionFactor = 0.65; // 35% reduction
          } else if (s.importance === 'medium') {
            compressionFactor = 0.40; // 60% reduction
          } else {
            compressionFactor = 0.15; // 85% reduction
          }

          const redundancyReduction = s.redundancy / 100;
          const finalFactor = compressionFactor * (1 - redundancyReduction * 0.5);

          return {
            ...s,
            status: 'compressing' as ContentStatus,
            compressedTokens: Math.floor(s.originalTokens * finalFactor),
          };
        }));

        timeouts.push(setTimeout(() => {
          setSegments(prev => prev.map(s =>
            s.id === seg.id
              ? { ...s, status: 'compressed' as ContentStatus }
              : s
          ));
        }, 150));

        segIndex++;
        timeouts.push(setTimeout(compressSegment, 200));
      };

      compressSegment();
    }

    else if (phase === 'validate-quality') {
      const currentTotalCompressed = segments.reduce((sum, seg) => sum + seg.compressedTokens, 0);
      const compressionRatio = totalOriginalTokens / currentTotalCompressed;

      const importanceWeights = {
        critical: 1.0,
        high: 0.85,
        medium: 0.65,
        low: 0.40,
      };

      const weightedFidelity = segments.reduce((sum, seg) => {
        const retentionRatio = seg.compressedTokens / seg.originalTokens;
        const weight = importanceWeights[seg.importance];
        return sum + (retentionRatio * weight);
      }, 0) / segments.length;

      const semanticFidelity = Math.min(100, weightedFidelity * 100);

      const informationDensity = segments.filter(s => s.importance === 'critical' || s.importance === 'high').length / currentTotalCompressed * 1000;

      const costSavings = ((totalOriginalTokens - currentTotalCompressed) / totalOriginalTokens) * 100;

      const processingTimeMs = Date.now() - startTime;

      const qualityScore = (semanticFidelity * 0.5) + (Math.min(100, compressionRatio * 20) * 0.3) + (Math.min(100, costSavings) * 0.2);

      setMetrics({
        compressionRatio,
        semanticFidelity,
        informationDensity,
        costSavings,
        processingTimeMs,
        qualityScore,
      });

      timeouts.push(setTimeout(() => setPhase('optimize-budget'), 400));
    }

    else if (phase === 'optimize-budget') {
      const lowImportanceSegs = segments.filter(s => s.importance === 'low');

      let segIndex = 0;
      const pruneSegment = () => {
        if (segIndex >= lowImportanceSegs.length) {
          const finalCompressed = segments.reduce((sum, seg) => sum + seg.compressedTokens, 0);
          const finalRatio = totalOriginalTokens / finalCompressed;
          const finalSavings = ((totalOriginalTokens - finalCompressed) / totalOriginalTokens) * 100;

          setMetrics(prev => ({
            ...prev,
            compressionRatio: finalRatio,
            costSavings: finalSavings,
          }));

          timeouts.push(setTimeout(() => setPhase('complete'), 300));
          return;
        }

        const seg = lowImportanceSegs[segIndex];

        setSegments(prev => prev.map(s =>
          s.id === seg.id
            ? { ...s, status: 'pruned' as ContentStatus, compressedTokens: Math.floor(s.compressedTokens * 0.5) }
            : s
        ));

        segIndex++;
        timeouts.push(setTimeout(pruneSegment, 150));
      };

      pruneSegment();
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setSegments(initialSegments);
    setMetrics({
      compressionRatio: 1.0,
      semanticFidelity: 100,
      informationDensity: 0,
      costSavings: 0,
      processingTimeMs: 0,
      qualityScore: 0,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setSegments(initialSegments);
    setMetrics({
      compressionRatio: 1.0,
      semanticFidelity: 100,
      informationDensity: 0,
      costSavings: 0,
      processingTimeMs: 0,
      qualityScore: 0,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'analyze-content', 'extract-key-info', 'compress-semantically', 'validate-quality', 'optimize-budget', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: ContentStatus): string => {
    switch (status) {
      case 'analyzing': return 'text-blue-400';
      case 'extracting': return 'text-purple-400';
      case 'compressing': return 'text-yellow-400';
      case 'compressed': return 'text-green-400';
      case 'pruned': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getImportanceColor = (importance: ImportanceLevel): string => {
    switch (importance) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Context Compress Patterns</h3>
          <p className="text-gray-400 text-sm">
            Semantic compression, summarization, and pruning to maximize information density
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Compression
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['analyze-content', 'extract-key-info', 'compress-semantically', 'validate-quality', 'optimize-budget'] as const).map((p) => {
            const status = getPhaseStatus(p);
            return (
              <div
                key={p}
                className={`p-3 rounded-lg border ${
                  status === 'completed'
                    ? 'bg-green-500/10 border-green-500/30'
                    : status === 'active'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-gray-300 mb-1">
                  {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className={`text-xs ${
                  status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-blue-400' : 'text-gray-500'
                }`}>
                  {status === 'completed' ? '✓ Done' : status === 'active' ? '⟳ Running' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-300">Token Usage</h4>
              <div className="text-xs text-gray-500">
                {totalCompressedTokens} / {totalOriginalTokens} tokens
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-xs text-gray-400 mb-2">Original Context</div>
                <div className="text-2xl font-mono font-bold text-blue-400">{totalOriginalTokens}</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-xs text-gray-400 mb-2">Compressed Context</div>
                <div className="text-2xl font-mono font-bold text-green-400">{totalCompressedTokens}</div>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Tokens Saved</div>
                <div className="text-2xl font-mono font-bold text-green-400">
                  {totalOriginalTokens - totalCompressedTokens}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Compression Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Compression Ratio</span>
                    <span className={`text-sm font-mono ${
                      metrics.compressionRatio > 1 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.compressionRatio > 1 ? `${metrics.compressionRatio.toFixed(2)}x` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Semantic Fidelity</span>
                    <span className={`text-sm font-mono ${
                      metrics.semanticFidelity > 0
                        ? metrics.semanticFidelity >= 80 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.semanticFidelity > 0 ? `${metrics.semanticFidelity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Information Density</span>
                    <span className={`text-sm font-mono ${
                      metrics.informationDensity > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.informationDensity > 0 ? metrics.informationDensity.toFixed(2) : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Cost Savings</span>
                    <span className={`text-sm font-mono ${
                      metrics.costSavings > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.costSavings > 0 ? `${metrics.costSavings.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Processing Time</span>
                    <span className={`text-sm font-mono ${
                      metrics.processingTimeMs > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.processingTimeMs > 0 ? `${metrics.processingTimeMs}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Quality Score</span>
                    <span className={`text-sm font-mono ${
                      metrics.qualityScore > 0
                        ? metrics.qualityScore >= 80 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.qualityScore > 0 ? `${metrics.qualityScore.toFixed(1)}` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Content Segments</h4>
            <div className="space-y-2 max-h-[700px] overflow-y-auto">
              {segments.map((seg) => (
                <div
                  key={seg.id}
                  className={`p-3 rounded-lg border ${
                    seg.status === 'compressed'
                      ? 'bg-green-500/10 border-green-500/30'
                      : seg.status === 'pruned'
                      ? 'bg-slate-800/50 border-slate-700/50'
                      : seg.status === 'compressing'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : seg.status === 'extracting'
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : seg.status === 'analyzing'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{seg.title}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getImportanceColor(seg.importance)}`}>
                          {seg.importance}
                        </span>
                        {seg.semanticCluster && (
                          <span className="text-xs text-purple-400">
                            {seg.semanticCluster}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs ${getStatusColor(seg.status)}`}>
                      {seg.status === 'original' ? 'Original' :
                       seg.status === 'analyzing' ? '⟳ Analyze' :
                       seg.status === 'extracting' ? '⟳ Extract' :
                       seg.status === 'compressing' ? '⟳ Compress' :
                       seg.status === 'compressed' ? '✓ Done' : '✗ Pruned'}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {seg.content}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Original Tokens</span>
                      <span className="text-blue-400 font-mono">{seg.originalTokens}</span>
                    </div>
                    {seg.status !== 'original' && (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Compressed Tokens</span>
                          <span className="text-green-400 font-mono">{seg.compressedTokens}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Reduction</span>
                          <span className="text-green-400 font-mono">
                            {((1 - seg.compressedTokens / seg.originalTokens) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </>
                    )}
                    {seg.redundancy > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Redundancy</span>
                        <span className={`font-mono ${
                          seg.redundancy > 50 ? 'text-red-400' : seg.redundancy > 25 ? 'text-yellow-400' : 'text-gray-500'
                        }`}>
                          {seg.redundancy}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Compression Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Compressed {totalOriginalTokens} tokens → {totalCompressedTokens} tokens ({metrics.compressionRatio.toFixed(2)}x ratio)</div>
              <div>• Saved {totalOriginalTokens - totalCompressedTokens} tokens ({metrics.costSavings.toFixed(1)}% cost reduction)</div>
              <div>• Maintained {metrics.semanticFidelity.toFixed(1)}% semantic fidelity with {metrics.informationDensity.toFixed(2)} info density</div>
              <div>• Processed in {metrics.processingTimeMs}ms with quality score of {metrics.qualityScore.toFixed(1)}/100</div>
              <div className="text-yellow-400 mt-2">⚡ Applied progressive compression: critical (10%), high (35%), medium (60%), low (85%)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}