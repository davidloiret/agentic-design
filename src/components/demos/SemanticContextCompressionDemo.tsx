'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'lattice-learning' | 'concept-abstraction' | 'lossy-compression' | 'cross-modal-fusion' | 'fidelity-validation' | 'complete';
type ConceptStatus = 'pending' | 'analyzing' | 'abstracting' | 'compressing' | 'compressed' | 'fused';

interface Concept {
  id: string;
  name: string;
  content: string;
  originalTokens: number;
  compressedTokens: number;
  level: number; // 0=atomic, 1=basic, 2=abstract, 3=high-level
  parent?: string;
  children: string[];
  relatedTo: string[];
  modality: 'text' | 'image' | 'audio' | 'video' | 'multi';
  status: ConceptStatus;
  semanticWeight: number;
}

interface Relationship {
  from: string;
  to: string;
  type: 'hierarchical' | 'causal' | 'semantic' | 'cross-modal';
  strength: number;
  preserved: boolean;
}

interface Metrics {
  compressionRatio: number;
  semanticFidelity: number;
  crossModalConsistency: number;
  conceptPreservation: number;
  relationshipIntegrity: number;
  reconstructionQuality: number;
}

const initialConcepts: Concept[] = [
  // Level 0 - Atomic concepts
  { id: 'c1', name: 'Neural Networks', content: 'Artificial neural networks are computing systems...', originalTokens: 280, compressedTokens: 280, level: 0, children: [], relatedTo: ['c2', 'c3'], modality: 'text', status: 'pending', semanticWeight: 0.9 },
  { id: 'c2', name: 'Training Process', content: 'Training involves feeding data through the network...', originalTokens: 320, compressedTokens: 320, level: 0, children: [], relatedTo: ['c1', 'c4'], modality: 'text', status: 'pending', semanticWeight: 0.85 },
  { id: 'c3', name: 'Architecture Diagrams', content: '[Visual representation of neural network layers]', originalTokens: 150, compressedTokens: 150, level: 0, children: [], relatedTo: ['c1'], modality: 'image', status: 'pending', semanticWeight: 0.7 },
  { id: 'c4', name: 'Backpropagation', content: 'Backpropagation computes gradients for weight updates...', originalTokens: 290, compressedTokens: 290, level: 0, children: [], relatedTo: ['c2', 'c5'], modality: 'text', status: 'pending', semanticWeight: 0.88 },
  { id: 'c5', name: 'Loss Functions', content: 'Loss functions measure prediction error...', originalTokens: 260, compressedTokens: 260, level: 0, children: [], relatedTo: ['c4', 'c6'], modality: 'text', status: 'pending', semanticWeight: 0.82 },
  { id: 'c6', name: 'Training Visualization', content: '[Video showing loss curve over epochs]', originalTokens: 180, compressedTokens: 180, level: 0, children: [], relatedTo: ['c5', 'c2'], modality: 'video', status: 'pending', semanticWeight: 0.65 },
  { id: 'c7', name: 'Activation Functions', content: 'Activation functions introduce non-linearity...', originalTokens: 240, compressedTokens: 240, level: 0, children: [], relatedTo: ['c1', 'c8'], modality: 'text', status: 'pending', semanticWeight: 0.78 },
  { id: 'c8', name: 'Code Examples', content: 'Python implementation of neural network...', originalTokens: 380, compressedTokens: 380, level: 0, children: [], relatedTo: ['c7', 'c1'], modality: 'text', status: 'pending', semanticWeight: 0.75 },
];

const initialRelationships: Relationship[] = [
  { from: 'c1', to: 'c2', type: 'hierarchical', strength: 0.9, preserved: false },
  { from: 'c2', to: 'c4', type: 'causal', strength: 0.95, preserved: false },
  { from: 'c4', to: 'c5', type: 'causal', strength: 0.88, preserved: false },
  { from: 'c1', to: 'c3', type: 'cross-modal', strength: 0.85, preserved: false },
  { from: 'c2', to: 'c6', type: 'cross-modal', strength: 0.75, preserved: false },
  { from: 'c1', to: 'c7', type: 'semantic', strength: 0.82, preserved: false },
  { from: 'c7', to: 'c8', type: 'semantic', strength: 0.78, preserved: false },
];

export default function SemanticContextCompressionDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);
  const [relationships, setRelationships] = useState<Relationship[]>(initialRelationships);
  const [metrics, setMetrics] = useState<Metrics>({
    compressionRatio: 1.0,
    semanticFidelity: 100,
    crossModalConsistency: 100,
    conceptPreservation: 100,
    relationshipIntegrity: 100,
    reconstructionQuality: 100,
  });

  const totalOriginalTokens = initialConcepts.reduce((sum, c) => sum + c.originalTokens, 0);
  const totalCompressedTokens = concepts.reduce((sum, c) => sum + c.compressedTokens, 0);

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('lattice-learning'), 100));
    }

    else if (phase === 'lattice-learning') {
      let conceptIndex = 0;

      const analyzeConcept = () => {
        if (conceptIndex >= initialConcepts.length) {
          timeouts.push(setTimeout(() => setPhase('concept-abstraction'), 300));
          return;
        }

        const concept = initialConcepts[conceptIndex];

        setConcepts(prev => prev.map(c =>
          c.id === concept.id
            ? { ...c, status: 'analyzing' as ConceptStatus }
            : c
        ));

        conceptIndex++;
        timeouts.push(setTimeout(analyzeConcept, 150));
      };

      analyzeConcept();
    }

    else if (phase === 'concept-abstraction') {
      // Create higher-level abstract concepts
      const abstractConcepts: Concept[] = [
        {
          id: 'c-abstract-1',
          name: 'Deep Learning Fundamentals',
          content: '[Abstract: Neural architectures and training]',
          originalTokens: 850,
          compressedTokens: 420,
          level: 2,
          children: ['c1', 'c2', 'c3'],
          relatedTo: [],
          modality: 'multi',
          status: 'abstracting',
          semanticWeight: 0.95,
        },
        {
          id: 'c-abstract-2',
          name: 'Optimization Methods',
          content: '[Abstract: Gradient-based optimization]',
          originalTokens: 550,
          compressedTokens: 280,
          level: 2,
          children: ['c4', 'c5'],
          relatedTo: [],
          modality: 'text',
          status: 'abstracting',
          semanticWeight: 0.92,
        },
        {
          id: 'c-abstract-3',
          name: 'Implementation Details',
          content: '[Abstract: Practical implementation]',
          originalTokens: 620,
          compressedTokens: 310,
          level: 2,
          children: ['c7', 'c8'],
          relatedTo: [],
          modality: 'text',
          status: 'abstracting',
          semanticWeight: 0.88,
        },
      ];

      setConcepts(prev => {
        const updated = prev.map(c => ({
          ...c,
          parent: abstractConcepts.find(ac => ac.children.includes(c.id))?.id,
          status: 'abstracting' as ConceptStatus,
        }));
        return [...updated, ...abstractConcepts];
      });

      timeouts.push(setTimeout(() => setPhase('lossy-compression'), 500));
    }

    else if (phase === 'lossy-compression') {
      let conceptIndex = 0;
      const allConcepts = concepts;

      const compressConcept = () => {
        if (conceptIndex >= allConcepts.length) {
          timeouts.push(setTimeout(() => setPhase('cross-modal-fusion'), 300));
          return;
        }

        const concept = allConcepts[conceptIndex];

        setConcepts(prev => prev.map(c => {
          if (c.id !== concept.id) return c;

          let compressionFactor = 1.0;

          // Abstract concepts compress better
          if (c.level === 2) {
            compressionFactor = 0.50; // 50% compression
          }
          // High semantic weight preserves more
          else if (c.semanticWeight > 0.85) {
            compressionFactor = 0.65; // 35% compression
          }
          // Visual/audio content compresses more
          else if (c.modality === 'image' || c.modality === 'audio' || c.modality === 'video') {
            compressionFactor = 0.40; // 60% compression
          }
          else {
            compressionFactor = 0.55; // 45% compression
          }

          return {
            ...c,
            status: 'compressing' as ConceptStatus,
            compressedTokens: Math.floor(c.originalTokens * compressionFactor),
          };
        }));

        timeouts.push(setTimeout(() => {
          setConcepts(prev => prev.map(c =>
            c.id === concept.id
              ? { ...c, status: 'compressed' as ConceptStatus }
              : c
          ));
        }, 100));

        conceptIndex++;
        timeouts.push(setTimeout(compressConcept, 180));
      };

      compressConcept();
    }

    else if (phase === 'cross-modal-fusion') {
      const multiModalConcepts = concepts.filter(c => c.modality === 'image' || c.modality === 'video');

      let conceptIndex = 0;
      const fuseConcept = () => {
        if (conceptIndex >= multiModalConcepts.length) {
          // Mark high-strength relationships as preserved
          setRelationships(prev => prev.map(r => ({
            ...r,
            preserved: r.strength > 0.75,
          })));

          timeouts.push(setTimeout(() => setPhase('fidelity-validation'), 300));
          return;
        }

        const concept = multiModalConcepts[conceptIndex];

        setConcepts(prev => prev.map(c =>
          c.id === concept.id
            ? { ...c, status: 'fused' as ConceptStatus }
            : c
        ));

        conceptIndex++;
        timeouts.push(setTimeout(fuseConcept, 200));
      };

      fuseConcept();
    }

    else if (phase === 'fidelity-validation') {
      const currentTotalCompressed = concepts.reduce((sum, c) => sum + c.compressedTokens, 0);
      const compressionRatio = totalOriginalTokens / currentTotalCompressed;

      const highSemanticConcepts = concepts.filter(c => c.semanticWeight > 0.8).length;
      const totalConcepts = concepts.length;
      const conceptPreservation = (highSemanticConcepts / totalConcepts) * 100;

      const preservedRelationships = relationships.filter(r => r.preserved).length;
      const relationshipIntegrity = (preservedRelationships / relationships.length) * 100;

      const crossModalConcepts = concepts.filter(c => c.modality !== 'text');
      const fusedConcepts = crossModalConcepts.filter(c => c.status === 'fused');
      const crossModalConsistency = crossModalConcepts.length > 0
        ? (fusedConcepts.length / crossModalConcepts.length) * 100
        : 100;

      // Semantic fidelity based on compression ratio and concept weights
      const avgRetentionRatio = concepts.reduce((sum, c) => sum + (c.compressedTokens / c.originalTokens), 0) / concepts.length;
      const semanticFidelity = Math.min(100, avgRetentionRatio * 150);

      const reconstructionQuality = (semanticFidelity * 0.4) + (relationshipIntegrity * 0.3) + (conceptPreservation * 0.3);

      setMetrics({
        compressionRatio,
        semanticFidelity,
        crossModalConsistency,
        conceptPreservation,
        relationshipIntegrity,
        reconstructionQuality,
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
    setConcepts(initialConcepts);
    setRelationships(initialRelationships);
    setMetrics({
      compressionRatio: 1.0,
      semanticFidelity: 100,
      crossModalConsistency: 100,
      conceptPreservation: 100,
      relationshipIntegrity: 100,
      reconstructionQuality: 100,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setConcepts(initialConcepts);
    setRelationships(initialRelationships);
    setMetrics({
      compressionRatio: 1.0,
      semanticFidelity: 100,
      crossModalConsistency: 100,
      conceptPreservation: 100,
      relationshipIntegrity: 100,
      reconstructionQuality: 100,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'lattice-learning', 'concept-abstraction', 'lossy-compression', 'cross-modal-fusion', 'fidelity-validation', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: ConceptStatus): string => {
    switch (status) {
      case 'analyzing': return 'text-blue-400';
      case 'abstracting': return 'text-purple-400';
      case 'compressing': return 'text-yellow-400';
      case 'compressed': return 'text-green-400';
      case 'fused': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getModalityColor = (modality: string): string => {
    switch (modality) {
      case 'text': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'image': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'audio': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'video': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'multi': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getLevelLabel = (level: number): string => {
    switch (level) {
      case 0: return 'Atomic';
      case 1: return 'Basic';
      case 2: return 'Abstract';
      case 3: return 'High-Level';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Semantic Context Compression</h3>
          <p className="text-gray-400 text-sm">
            AI-driven semantic compression using information lattice learning and lossy compression
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
          {(['lattice-learning', 'concept-abstraction', 'lossy-compression', 'cross-modal-fusion', 'fidelity-validation'] as const).map((p) => {
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
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-300">Compression Overview</h4>
                <div className="text-xs text-gray-500">
                  {totalCompressedTokens} / {totalOriginalTokens} tokens
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs text-gray-400 mb-2">Token Reduction</div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-green-500/60 transition-all duration-500"
                      style={{ width: `${100 - (totalCompressedTokens / totalOriginalTokens) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Saved</span>
                    <span className="text-green-400 font-mono">
                      {totalOriginalTokens - totalCompressedTokens} tokens ({((1 - totalCompressedTokens / totalOriginalTokens) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-xs text-gray-400 mb-2">Semantic Relationships</div>
                  <div className="space-y-1">
                    {relationships.map((rel) => (
                      <div key={`${rel.from}-${rel.to}`} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 truncate">
                          {concepts.find(c => c.id === rel.from)?.name} → {concepts.find(c => c.id === rel.to)?.name}
                        </span>
                        <span className={`ml-2 ${rel.preserved ? 'text-green-400' : 'text-gray-500'}`}>
                          {rel.preserved ? '✓' : '○'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
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
                        ? metrics.semanticFidelity >= 85 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.semanticFidelity > 0 ? `${metrics.semanticFidelity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Cross-Modal Consistency</span>
                    <span className={`text-sm font-mono ${
                      metrics.crossModalConsistency > 0 ? 'text-cyan-400' : 'text-gray-500'
                    }`}>
                      {metrics.crossModalConsistency > 0 ? `${metrics.crossModalConsistency.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Concept Preservation</span>
                    <span className={`text-sm font-mono ${
                      metrics.conceptPreservation > 0 ? 'text-purple-400' : 'text-gray-500'
                    }`}>
                      {metrics.conceptPreservation > 0 ? `${metrics.conceptPreservation.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Relationship Integrity</span>
                    <span className={`text-sm font-mono ${
                      metrics.relationshipIntegrity > 0
                        ? metrics.relationshipIntegrity >= 80 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.relationshipIntegrity > 0 ? `${metrics.relationshipIntegrity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Reconstruction Quality</span>
                    <span className={`text-sm font-mono ${
                      metrics.reconstructionQuality > 0
                        ? metrics.reconstructionQuality >= 85 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.reconstructionQuality > 0 ? `${metrics.reconstructionQuality.toFixed(1)}` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Information Lattice</h4>
            <div className="space-y-2 max-h-[700px] overflow-y-auto">
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  className={`p-3 rounded-lg border ${
                    concept.status === 'fused'
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : concept.status === 'compressed'
                      ? 'bg-green-500/10 border-green-500/30'
                      : concept.status === 'compressing'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : concept.status === 'abstracting'
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : concept.status === 'analyzing'
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  style={{ marginLeft: `${concept.level * 20}px` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white mb-1">{concept.name}</div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getModalityColor(concept.modality)}`}>
                          {concept.modality}
                        </span>
                        <span className="text-xs text-gray-400">
                          L{concept.level} ({getLevelLabel(concept.level)})
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs ${getStatusColor(concept.status)}`}>
                      {concept.status === 'pending' ? 'Pending' :
                       concept.status === 'analyzing' ? '⟳ Analyze' :
                       concept.status === 'abstracting' ? '⟳ Abstract' :
                       concept.status === 'compressing' ? '⟳ Compress' :
                       concept.status === 'compressed' ? '✓ Done' : '✓ Fused'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Original Tokens</span>
                      <span className="text-blue-400 font-mono">{concept.originalTokens}</span>
                    </div>
                    {concept.status !== 'pending' && (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Compressed Tokens</span>
                          <span className="text-green-400 font-mono">{concept.compressedTokens}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Reduction</span>
                          <span className="text-green-400 font-mono">
                            {((1 - concept.compressedTokens / concept.originalTokens) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Semantic Weight</span>
                      <span className={`font-mono ${
                        concept.semanticWeight > 0.85 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {(concept.semanticWeight * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Semantic Compression Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Compressed {totalOriginalTokens} tokens → {totalCompressedTokens} tokens ({metrics.compressionRatio.toFixed(2)}x ratio)</div>
              <div>• Built information lattice with {concepts.length} concepts across {Math.max(...concepts.map(c => c.level)) + 1} hierarchical levels</div>
              <div>• Preserved {relationships.filter(r => r.preserved).length}/{relationships.length} semantic relationships ({metrics.relationshipIntegrity.toFixed(1)}%)</div>
              <div>• Cross-modal fusion: {metrics.crossModalConsistency.toFixed(1)}% consistency with multi-modal alignment</div>
              <div>• Achieved {metrics.semanticFidelity.toFixed(1)}% semantic fidelity with {metrics.reconstructionQuality.toFixed(1)} reconstruction quality</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}