'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'task-analysis' | 'semantic-search' | 'ranking-scoring' | 'assembly' | 'optimization' | 'complete';
type DocumentStatus = 'idle' | 'searching' | 'ranked' | 'selected' | 'filtered';

interface Document {
  id: string;
  title: string;
  category: string;
  content: string;
  embedding: number[];
  similarityScore: number;
  relevanceScore: number;
  tokensCount: number;
  status: DocumentStatus;
  cached: boolean;
}

interface TaskRequirement {
  id: string;
  requirement: string;
  covered: boolean;
}

interface AssembledContext {
  documents: string[];
  totalTokens: number;
  coverage: number;
}

interface Metrics {
  relevancePrecision: number;
  contextCoverage: number;
  selectionSpeedMs: number;
  tokenEfficiency: number;
  cacheHitRate: number;
  qualityScore: number;
}

const initialDocuments: Document[] = [
  { id: 'doc-1', title: 'RAG Architecture Fundamentals', category: 'RAG', content: 'RAG combines retrieval with generation...', embedding: [0.9, 0.8, 0.7], similarityScore: 0, relevanceScore: 0, tokensCount: 450, status: 'idle', cached: true },
  { id: 'doc-2', title: 'Customer Support Best Practices', category: 'Support', content: 'Effective customer support requires...', embedding: [0.8, 0.9, 0.6], similarityScore: 0, relevanceScore: 0, tokensCount: 380, status: 'idle', cached: false },
  { id: 'doc-3', title: 'Vector Database Integration', category: 'RAG', content: 'Vector databases store embeddings...', embedding: [0.85, 0.75, 0.8], similarityScore: 0, relevanceScore: 0, tokensCount: 520, status: 'idle', cached: false },
  { id: 'doc-4', title: 'Semantic Search Implementation', category: 'Search', content: 'Semantic search uses embeddings...', embedding: [0.88, 0.82, 0.75], similarityScore: 0, relevanceScore: 0, tokensCount: 410, status: 'idle', cached: true },
  { id: 'doc-5', title: 'Query Understanding Techniques', category: 'Search', content: 'Understanding user intent is crucial...', embedding: [0.7, 0.85, 0.65], similarityScore: 0, relevanceScore: 0, tokensCount: 340, status: 'idle', cached: false },
  { id: 'doc-6', title: 'Context Assembly Strategies', category: 'RAG', content: 'Dynamic context assembly optimizes...', embedding: [0.9, 0.78, 0.82], similarityScore: 0, relevanceScore: 0, tokensCount: 480, status: 'idle', cached: false },
  { id: 'doc-7', title: 'Token Budget Optimization', category: 'Optimization', content: 'Managing token budgets effectively...', embedding: [0.75, 0.7, 0.9], similarityScore: 0, relevanceScore: 0, tokensCount: 390, status: 'idle', cached: false },
  { id: 'doc-8', title: 'Multi-Source Knowledge Fusion', category: 'RAG', content: 'Combining multiple knowledge sources...', embedding: [0.82, 0.8, 0.68], similarityScore: 0, relevanceScore: 0, tokensCount: 430, status: 'idle', cached: false },
];

const taskRequirements: TaskRequirement[] = [
  { id: 'req-1', requirement: 'RAG architecture overview', covered: false },
  { id: 'req-2', requirement: 'Customer support integration', covered: false },
  { id: 'req-3', requirement: 'Semantic search setup', covered: false },
  { id: 'req-4', requirement: 'Context optimization', covered: false },
];

const queryEmbedding = [0.87, 0.83, 0.75];

export default function ContextSelectPatternsDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [requirements, setRequirements] = useState<TaskRequirement[]>(taskRequirements);
  const [assembledContext, setAssembledContext] = useState<AssembledContext>({ documents: [], totalTokens: 0, coverage: 0 });
  const [tokenBudget] = useState({ current: 0, limit: 2000 });
  const [metrics, setMetrics] = useState<Metrics>({
    relevancePrecision: 0,
    contextCoverage: 0,
    selectionSpeedMs: 0,
    tokenEfficiency: 0,
    cacheHitRate: 0,
    qualityScore: 0,
  });
  const [query] = useState('How to implement RAG for customer support?');

  const cosineSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];
    const startTime = Date.now();

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('task-analysis'), 100));
    }

    else if (phase === 'task-analysis') {
      let reqIndex = 0;

      const analyzeRequirement = () => {
        if (reqIndex >= taskRequirements.length) {
          timeouts.push(setTimeout(() => setPhase('semantic-search'), 400));
          return;
        }

        const req = taskRequirements[reqIndex];
        setRequirements(prev => prev.map(r =>
          r.id === req.id ? { ...r, covered: false } : r
        ));

        reqIndex++;
        timeouts.push(setTimeout(analyzeRequirement, 150));
      };

      analyzeRequirement();
    }

    else if (phase === 'semantic-search') {
      let docIndex = 0;

      const searchDocument = () => {
        if (docIndex >= initialDocuments.length) {
          timeouts.push(setTimeout(() => setPhase('ranking-scoring'), 300));
          return;
        }

        const doc = initialDocuments[docIndex];
        const similarity = cosineSimilarity(queryEmbedding, doc.embedding);

        setDocuments(prev => prev.map(d =>
          d.id === doc.id
            ? { ...d, status: 'searching', similarityScore: similarity }
            : d
        ));

        docIndex++;
        timeouts.push(setTimeout(searchDocument, 150));
      };

      searchDocument();
    }

    else if (phase === 'ranking-scoring') {
      const scoredDocs = documents.map(doc => {
        const categoryBonus = doc.category === 'RAG' ? 0.15 : doc.category === 'Support' ? 0.1 : 0.05;
        const cacheBonus = doc.cached ? 0.05 : 0;
        const relevanceScore = Math.min(0.99, doc.similarityScore + categoryBonus + cacheBonus);

        return { ...doc, relevanceScore, status: 'ranked' as DocumentStatus };
      });

      scoredDocs.sort((a, b) => b.relevanceScore - a.relevanceScore);

      let docIndex = 0;
      const rankDocument = () => {
        if (docIndex >= scoredDocs.length) {
          timeouts.push(setTimeout(() => setPhase('assembly'), 300));
          return;
        }

        const doc = scoredDocs[docIndex];

        setDocuments(prev => {
          const newDocs = [...prev];
          const idx = newDocs.findIndex(d => d.id === doc.id);
          if (idx !== -1) {
            newDocs[idx] = { ...doc };
          }
          return newDocs;
        });

        docIndex++;
        timeouts.push(setTimeout(rankDocument, 120));
      };

      rankDocument();
    }

    else if (phase === 'assembly') {
      const sortedDocs = [...documents].sort((a, b) => b.relevanceScore - a.relevanceScore);
      const selected: Document[] = [];
      let totalTokens = 0;
      const budget = tokenBudget.limit;

      for (const doc of sortedDocs) {
        if (totalTokens + doc.tokensCount <= budget && doc.relevanceScore > 0.75) {
          selected.push(doc);
          totalTokens += doc.tokensCount;
        }
      }

      let selectIndex = 0;
      const selectDocument = () => {
        if (selectIndex >= selected.length) {
          const selectedIds = selected.map(d => d.id);
          const coverage = (selected.length / taskRequirements.length) * 100;

          setAssembledContext({
            documents: selectedIds,
            totalTokens,
            coverage,
          });

          setDocuments(prev => prev.map(d =>
            selectedIds.includes(d.id) ? { ...d, status: 'selected' } : { ...d, status: 'filtered' }
          ));

          const coveredReqs = taskRequirements.map((req, idx) => {
            const isCovered = idx < selected.length;
            return { ...req, covered: isCovered };
          });
          setRequirements(coveredReqs);

          timeouts.push(setTimeout(() => setPhase('optimization'), 300));
          return;
        }

        const doc = selected[selectIndex];
        setDocuments(prev => prev.map(d =>
          d.id === doc.id ? { ...d, status: 'selected' } : d
        ));

        selectIndex++;
        timeouts.push(setTimeout(selectDocument, 150));
      };

      selectDocument();
    }

    else if (phase === 'optimization') {
      const selectedDocs = documents.filter(d => d.status === 'selected');
      const totalTokens = selectedDocs.reduce((sum, d) => sum + d.tokensCount, 0);
      const relevantCount = selectedDocs.filter(d => d.relevanceScore > 0.8).length;
      const relevancePrecision = (relevantCount / selectedDocs.length) * 100;
      const contextCoverage = requirements.filter(r => r.covered).length / requirements.length * 100;
      const selectionSpeedMs = Date.now() - startTime;
      const tokenEfficiency = (selectedDocs.length / totalTokens) * 1000;
      const cacheHits = selectedDocs.filter(d => d.cached).length;
      const cacheHitRate = (cacheHits / selectedDocs.length) * 100;
      const qualityScore = (relevancePrecision * 0.4 + contextCoverage * 0.3 + tokenEfficiency * 0.3);

      setMetrics({
        relevancePrecision,
        contextCoverage,
        selectionSpeedMs,
        tokenEfficiency,
        cacheHitRate,
        qualityScore,
      });

      timeouts.push(setTimeout(() => setPhase('complete'), 400));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setDocuments(initialDocuments);
    setRequirements(taskRequirements);
    setAssembledContext({ documents: [], totalTokens: 0, coverage: 0 });
    setMetrics({
      relevancePrecision: 0,
      contextCoverage: 0,
      selectionSpeedMs: 0,
      tokenEfficiency: 0,
      cacheHitRate: 0,
      qualityScore: 0,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setDocuments(initialDocuments);
    setRequirements(taskRequirements);
    setAssembledContext({ documents: [], totalTokens: 0, coverage: 0 });
    setMetrics({
      relevancePrecision: 0,
      contextCoverage: 0,
      selectionSpeedMs: 0,
      tokenEfficiency: 0,
      cacheHitRate: 0,
      qualityScore: 0,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'task-analysis', 'semantic-search', 'ranking-scoring', 'assembly', 'optimization', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: DocumentStatus): string => {
    switch (status) {
      case 'searching': return 'text-blue-400';
      case 'ranked': return 'text-purple-400';
      case 'selected': return 'text-green-400';
      case 'filtered': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'RAG': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Support': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Search': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Optimization': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Context Select Patterns</h3>
          <p className="text-gray-400 text-sm">
            Dynamic retrieval and assembly through RAG, semantic search, and intelligent curation
          </p>
        </div>

        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-xs text-gray-400 mb-1">Query</div>
          <div className="text-sm text-white font-medium">{query}</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Selection
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['task-analysis', 'semantic-search', 'ranking-scoring', 'assembly', 'optimization'] as const).map((p) => {
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
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Task Requirements</h4>
              <div className="space-y-2">
                {requirements.map((req) => (
                  <div
                    key={req.id}
                    className={`p-3 rounded-lg border ${
                      req.covered
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{req.requirement}</span>
                      <span className={`text-xs ${req.covered ? 'text-green-400' : 'text-gray-500'}`}>
                        {req.covered ? '✓ Covered' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Context Assembly</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Token Budget</span>
                    <span className="text-xs text-gray-500">
                      {assembledContext.totalTokens} / {tokenBudget.limit}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500/60 transition-all duration-500"
                      style={{ width: `${(assembledContext.totalTokens / tokenBudget.limit) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Documents Selected</span>
                    <span className="text-sm font-mono text-blue-400">
                      {assembledContext.documents.length}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Coverage</span>
                    <span className="text-sm font-mono text-green-400">
                      {assembledContext.coverage > 0 ? `${assembledContext.coverage.toFixed(0)}%` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Selection Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Relevance Precision</span>
                    <span className={`text-sm font-mono ${
                      metrics.relevancePrecision > 0
                        ? metrics.relevancePrecision >= 85 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.relevancePrecision > 0 ? `${metrics.relevancePrecision.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Token Efficiency</span>
                    <span className={`text-sm font-mono ${
                      metrics.tokenEfficiency > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.tokenEfficiency > 0 ? metrics.tokenEfficiency.toFixed(2) : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Selection Speed</span>
                    <span className={`text-sm font-mono ${
                      metrics.selectionSpeedMs > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.selectionSpeedMs > 0 ? `${metrics.selectionSpeedMs}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Cache Hit Rate</span>
                    <span className={`text-sm font-mono ${
                      metrics.cacheHitRate > 0 ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {metrics.cacheHitRate > 0 ? `${metrics.cacheHitRate.toFixed(0)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Quality Score</span>
                    <span className={`text-sm font-mono ${
                      metrics.qualityScore > 0
                        ? metrics.qualityScore >= 85 ? 'text-green-400' : 'text-yellow-400'
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
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Knowledge Base Documents</h4>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 rounded-lg border ${
                    doc.status === 'selected'
                      ? 'bg-green-500/10 border-green-500/30'
                      : doc.status === 'filtered'
                      ? 'bg-slate-800/50 border-slate-700/50'
                      : doc.status === 'ranked'
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : doc.status === 'searching'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{doc.title}</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryColor(doc.category)}`}>
                          {doc.category}
                        </span>
                        {doc.cached && (
                          <span className="text-xs text-green-400">⚡ Cached</span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs ${getStatusColor(doc.status)}`}>
                      {doc.status === 'idle' ? 'Idle' :
                       doc.status === 'searching' ? '⟳ Search' :
                       doc.status === 'ranked' ? '⬆ Ranked' :
                       doc.status === 'selected' ? '✓ Selected' : '✗ Filtered'}
                    </span>
                  </div>

                  {doc.similarityScore > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Similarity</span>
                        <span className="text-blue-400 font-mono">{(doc.similarityScore * 100).toFixed(1)}%</span>
                      </div>
                      {doc.relevanceScore > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Relevance</span>
                          <span className="text-purple-400 font-mono">{(doc.relevanceScore * 100).toFixed(1)}%</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Tokens</span>
                        <span className="text-gray-500 font-mono">{doc.tokensCount}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Context Selection Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Selected {assembledContext.documents.length} documents from knowledge base (8 total)</div>
              <div>• Achieved {metrics.relevancePrecision.toFixed(1)}% relevance precision with {metrics.contextCoverage.toFixed(0)}% task coverage</div>
              <div>• Token efficiency: {metrics.tokenEfficiency.toFixed(2)} docs/1K tokens ({assembledContext.totalTokens}/{tokenBudget.limit} used)</div>
              <div>• Selection completed in {metrics.selectionSpeedMs}ms with {metrics.cacheHitRate.toFixed(0)}% cache hit rate</div>
              <div>• Overall quality score: {metrics.qualityScore.toFixed(1)}/100</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}