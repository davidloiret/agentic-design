'use client';

import React, { useState, useEffect } from 'react';
import {
  GitBranch, Activity, TrendingUp, AlertTriangle, CheckCircle,
  Info, ChevronRight, ChevronDown, Eye, EyeOff, Lightbulb,
  Brain, Target, Layers, BarChart3, Shuffle, Zap, Book,
  FileText, Database, Link, ArrowRight, Circle, Square, Settings
} from 'lucide-react';

// Types
type NodeType = 'decision' | 'evidence' | 'conclusion' | 'hypothesis' | 'action';
type ConfidenceLevel = 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
type ReasoningPhase = 'input' | 'analysis' | 'synthesis' | 'decision' | 'output';

interface ReasoningNode {
  id: string;
  type: NodeType;
  label: string;
  description?: string;
  confidence: number;
  weight: number;
  sources: Source[];
  children: ReasoningNode[];
  expanded: boolean;
  highlighted: boolean;
  metadata?: {
    alternatives?: string[];
    risks?: string[];
    assumptions?: string[];
  };
}

interface Source {
  id: string;
  name: string;
  type: 'data' | 'model' | 'rule' | 'knowledge' | 'user';
  reliability: number;
  contribution: number;
  url?: string;
}

interface ReasoningPath {
  id: string;
  name: string;
  probability: number;
  nodes: string[];
  outcome: string;
  selected: boolean;
}

interface VisualConfig {
  showConfidence: boolean;
  showSources: boolean;
  showAlternatives: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  detailLevel: 'simple' | 'moderate' | 'detailed';
}

const VisualReasoningPatternsDemo = () => {
  const [currentPhase, setCurrentPhase] = useState<ReasoningPhase>('input');
  const [reasoningTree, setReasoningTree] = useState<ReasoningNode>({
    id: 'root',
    type: 'hypothesis',
    label: 'Medical Diagnosis Analysis',
    description: 'Analyzing patient symptoms to determine diagnosis',
    confidence: 0.85,
    weight: 1.0,
    sources: [
      { id: 's1', name: 'Patient History', type: 'data', reliability: 0.95, contribution: 0.3 },
      { id: 's2', name: 'Lab Results', type: 'data', reliability: 0.98, contribution: 0.4 },
      { id: 's3', name: 'Clinical Guidelines', type: 'knowledge', reliability: 0.92, contribution: 0.3 }
    ],
    expanded: true,
    highlighted: false,
    children: [
      {
        id: 'node-1',
        type: 'evidence',
        label: 'Symptom Analysis',
        description: 'Elevated temperature, fatigue, respiratory issues',
        confidence: 0.88,
        weight: 0.35,
        sources: [
          { id: 's4', name: 'Vital Signs', type: 'data', reliability: 0.99, contribution: 0.5 },
          { id: 's5', name: 'Patient Report', type: 'user', reliability: 0.75, contribution: 0.5 }
        ],
        expanded: true,
        highlighted: false,
        children: [
          {
            id: 'node-1-1',
            type: 'decision',
            label: 'Viral Infection',
            confidence: 0.72,
            weight: 0.4,
            sources: [],
            expanded: false,
            highlighted: false,
            children: [],
            metadata: {
              alternatives: ['Bacterial Infection', 'Allergic Reaction'],
              assumptions: ['No recent travel', 'No known exposures']
            }
          },
          {
            id: 'node-1-2',
            type: 'decision',
            label: 'Bacterial Infection',
            confidence: 0.45,
            weight: 0.3,
            sources: [],
            expanded: false,
            highlighted: false,
            children: [],
            metadata: {
              risks: ['Antibiotic resistance', 'Delayed treatment']
            }
          }
        ]
      },
      {
        id: 'node-2',
        type: 'evidence',
        label: 'Lab Test Results',
        description: 'Blood work and culture analysis',
        confidence: 0.92,
        weight: 0.45,
        sources: [
          { id: 's6', name: 'Blood Panel', type: 'data', reliability: 0.97, contribution: 0.6 },
          { id: 's7', name: 'Culture Results', type: 'data', reliability: 0.95, contribution: 0.4 }
        ],
        expanded: true,
        highlighted: false,
        children: [
          {
            id: 'node-2-1',
            type: 'conclusion',
            label: 'Elevated White Blood Cells',
            confidence: 0.95,
            weight: 0.5,
            sources: [],
            expanded: false,
            highlighted: false,
            children: []
          },
          {
            id: 'node-2-2',
            type: 'conclusion',
            label: 'Positive Culture',
            confidence: 0.88,
            weight: 0.5,
            sources: [],
            expanded: false,
            highlighted: false,
            children: []
          }
        ]
      },
      {
        id: 'node-3',
        type: 'action',
        label: 'Recommended Treatment',
        description: 'Based on diagnosis confidence',
        confidence: 0.78,
        weight: 0.2,
        sources: [
          { id: 's8', name: 'Treatment Protocol', type: 'rule', reliability: 0.90, contribution: 0.7 },
          { id: 's9', name: 'Drug Database', type: 'knowledge', reliability: 0.95, contribution: 0.3 }
        ],
        expanded: false,
        highlighted: false,
        children: []
      }
    ]
  });

  const [paths, setPaths] = useState<ReasoningPath[]>([
    {
      id: 'path-1',
      name: 'Viral Diagnosis Path',
      probability: 0.72,
      nodes: ['root', 'node-1', 'node-1-1', 'node-3'],
      outcome: 'Antiviral treatment recommended',
      selected: true
    },
    {
      id: 'path-2',
      name: 'Bacterial Diagnosis Path',
      probability: 0.45,
      nodes: ['root', 'node-1', 'node-1-2', 'node-3'],
      outcome: 'Antibiotic treatment recommended',
      selected: false
    },
    {
      id: 'path-3',
      name: 'Conservative Observation',
      probability: 0.15,
      nodes: ['root', 'node-2'],
      outcome: 'Monitor and retest in 48 hours',
      selected: false
    }
  ]);

  const [visualConfig, setVisualConfig] = useState<VisualConfig>({
    showConfidence: true,
    showSources: true,
    showAlternatives: false,
    animationSpeed: 'normal',
    detailLevel: 'moderate'
  });

  const [selectedNode, setSelectedNode] = useState<ReasoningNode | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [compareMode, setCompareMode] = useState(false);

  // Animation simulation
  useEffect(() => {
    const speeds = { slow: 100, normal: 50, fast: 20 };
    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 100);
    }, speeds[visualConfig.animationSpeed]);

    return () => clearInterval(timer);
  }, [visualConfig.animationSpeed]);

  // Phase progression
  useEffect(() => {
    const phases: ReasoningPhase[] = ['input', 'analysis', 'synthesis', 'decision', 'output'];
    const timer = setTimeout(() => {
      const currentIndex = phases.indexOf(currentPhase);
      if (currentIndex < phases.length - 1) {
        setCurrentPhase(phases[currentIndex + 1]);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  const toggleNodeExpansion = (nodeId: string) => {
    const updateNode = (node: ReasoningNode): ReasoningNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      return {
        ...node,
        children: node.children.map(updateNode)
      };
    };
    setReasoningTree(updateNode(reasoningTree));
  };

  const highlightPath = (pathId: string) => {
    setPaths(prev => prev.map(p => ({
      ...p,
      selected: p.id === pathId
    })));

    const selectedPath = paths.find(p => p.id === pathId);
    if (selectedPath) {
      const highlightNodes = (node: ReasoningNode): ReasoningNode => ({
        ...node,
        highlighted: selectedPath.nodes.includes(node.id),
        children: node.children.map(highlightNodes)
      });
      setReasoningTree(highlightNodes(reasoningTree));
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-blue-400';
    if (confidence >= 0.4) return 'text-yellow-400';
    if (confidence >= 0.2) return 'text-orange-400';
    return 'text-red-400';
  };

  const getNodeIcon = (type: NodeType) => {
    const icons = {
      decision: <Target className="w-4 h-4" />,
      evidence: <Database className="w-4 h-4" />,
      conclusion: <CheckCircle className="w-4 h-4" />,
      hypothesis: <Lightbulb className="w-4 h-4" />,
      action: <Zap className="w-4 h-4" />
    };
    return icons[type];
  };

  const renderNode = (node: ReasoningNode, depth: number = 0) => {
    const marginLeft = depth * 24;

    return (
      <div key={node.id} className="mb-2">
        <div
          className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer
            ${node.highlighted ? 'bg-blue-500/20 border border-blue-400' : 'bg-gray-700/50 hover:bg-gray-700'}
            ${selectedNode?.id === node.id ? 'ring-2 ring-blue-400' : ''}`}
          style={{ marginLeft }}
          onClick={() => setSelectedNode(node)}
        >
          {/* Expand/Collapse */}
          {node.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeExpansion(node.id);
              }}
              className="text-gray-400 hover:text-gray-300"
            >
              {node.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}

          {/* Node Icon */}
          <span className={getConfidenceColor(node.confidence)}>
            {getNodeIcon(node.type)}
          </span>

          {/* Node Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-100">{node.label}</span>
              {visualConfig.showConfidence && (
                <span className={`text-xs px-2 py-0.5 rounded ${getConfidenceColor(node.confidence)} bg-gray-800`}>
                  {Math.round(node.confidence * 100)}%
                </span>
              )}
              <span className="text-xs text-gray-500">Weight: {(node.weight * 100).toFixed(0)}%</span>
            </div>

            {node.description && visualConfig.detailLevel !== 'simple' && (
              <p className="text-sm text-gray-400 mb-2">{node.description}</p>
            )}

            {/* Sources */}
            {visualConfig.showSources && node.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {node.sources.map(source => (
                  <div key={source.id} className="flex items-center gap-1 text-xs bg-gray-800 rounded px-2 py-1">
                    <Book className="w-3 h-3 text-blue-400" />
                    <span className="text-gray-300">{source.name}</span>
                    <span className="text-gray-500">({Math.round(source.reliability * 100)}%)</span>
                  </div>
                ))}
              </div>
            )}

            {/* Metadata */}
            {visualConfig.showAlternatives && node.metadata && (
              <div className="mt-2 space-y-1">
                {node.metadata.alternatives && (
                  <div className="text-xs text-gray-500">
                    <span className="text-yellow-400">Alternatives:</span> {node.metadata.alternatives.join(', ')}
                  </div>
                )}
                {node.metadata.risks && (
                  <div className="text-xs text-gray-500">
                    <span className="text-red-400">Risks:</span> {node.metadata.risks.join(', ')}
                  </div>
                )}
                {node.metadata.assumptions && (
                  <div className="text-xs text-gray-500">
                    <span className="text-blue-400">Assumptions:</span> {node.metadata.assumptions.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Confidence Bar */}
          {visualConfig.showConfidence && (
            <div className="w-20">
              <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    node.confidence >= 0.7 ? 'bg-green-400' :
                    node.confidence >= 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${node.confidence * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Render Children */}
        {node.expanded && node.children.map(child => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Visual Reasoning Patterns Demo</h2>
        <p className="text-gray-400">Visual representation of agent reasoning and decision-making processes</p>
      </div>

      {/* Phase Indicator */}
      <div className="mb-6 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">Reasoning Phase</h3>
          <div className="flex gap-2">
            {(['input', 'analysis', 'synthesis', 'decision', 'output'] as ReasoningPhase[]).map((phase) => (
              <div
                key={phase}
                className={`px-3 py-1 rounded text-xs capitalize transition-all
                  ${currentPhase === phase ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                {phase}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${animationProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decision Tree */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-400" />
              Reasoning Tree
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-3 py-1 rounded text-sm transition-all
                  ${compareMode ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Shuffle className="w-4 h-4 inline mr-1" />
                Compare
              </button>
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {renderNode(reasoningTree)}
          </div>
        </div>

        {/* Controls & Details */}
        <div className="space-y-6">
          {/* Visual Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              Display Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Show Confidence</span>
                <button
                  onClick={() => setVisualConfig(prev => ({ ...prev, showConfidence: !prev.showConfidence }))}
                  className={`w-10 h-5 rounded-full transition-all
                    ${visualConfig.showConfidence ? 'bg-blue-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all
                    ${visualConfig.showConfidence ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Show Sources</span>
                <button
                  onClick={() => setVisualConfig(prev => ({ ...prev, showSources: !prev.showSources }))}
                  className={`w-10 h-5 rounded-full transition-all
                    ${visualConfig.showSources ? 'bg-blue-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all
                    ${visualConfig.showSources ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Show Alternatives</span>
                <button
                  onClick={() => setVisualConfig(prev => ({ ...prev, showAlternatives: !prev.showAlternatives }))}
                  className={`w-10 h-5 rounded-full transition-all
                    ${visualConfig.showAlternatives ? 'bg-blue-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all
                    ${visualConfig.showAlternatives ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </label>
              <div>
                <label className="text-sm text-gray-300 block mb-1">Detail Level</label>
                <select
                  value={visualConfig.detailLevel}
                  onChange={(e) => setVisualConfig(prev => ({
                    ...prev,
                    detailLevel: e.target.value as 'simple' | 'moderate' | 'detailed'
                  }))}
                  className="w-full bg-gray-700 text-gray-100 rounded px-3 py-1 text-sm"
                >
                  <option value="simple">Simple</option>
                  <option value="moderate">Moderate</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reasoning Paths */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Reasoning Paths
            </h3>
            <div className="space-y-3">
              {paths.map(path => (
                <button
                  key={path.id}
                  onClick={() => highlightPath(path.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all
                    ${path.selected ? 'bg-blue-500/20 border border-blue-400' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100 text-sm">{path.name}</span>
                    <span className={`text-sm ${getConfidenceColor(path.probability)}`}>
                      {Math.round(path.probability * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{path.outcome}</p>
                  {path.selected && (
                    <div className="mt-2 flex gap-1">
                      {path.nodes.map((nodeId, i) => (
                        <React.Fragment key={nodeId}>
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          {i < path.nodes.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-500" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-yellow-400" />
                Node Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-500">Type</span>
                  <p className="text-gray-100 capitalize">{selectedNode.type}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Label</span>
                  <p className="text-gray-100">{selectedNode.label}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          selectedNode.confidence >= 0.7 ? 'bg-green-400' :
                          selectedNode.confidence >= 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${selectedNode.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">
                      {Math.round(selectedNode.confidence * 100)}%
                    </span>
                  </div>
                </div>
                {selectedNode.sources.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-500">Evidence Sources</span>
                    <div className="mt-1 space-y-1">
                      {selectedNode.sources.map(source => (
                        <div key={source.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-300">{source.name}</span>
                          <span className="text-gray-500">{Math.round(source.contribution * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confidence Overview */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-400" />
          Confidence Distribution
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { level: 'Very Low', range: '0-20%', count: 0, color: 'bg-red-400' },
            { level: 'Low', range: '20-40%', count: 1, color: 'bg-orange-400' },
            { level: 'Medium', range: '40-60%', count: 1, color: 'bg-yellow-400' },
            { level: 'High', range: '60-80%', count: 2, color: 'bg-blue-400' },
            { level: 'Very High', range: '80-100%', count: 4, color: 'bg-green-400' }
          ].map(bucket => (
            <div key={bucket.level} className="text-center">
              <div className="h-20 flex items-end justify-center mb-2">
                <div
                  className={`w-full ${bucket.color} rounded-t transition-all`}
                  style={{ height: `${bucket.count * 20}px` }}
                />
              </div>
              <p className="text-xs text-gray-400">{bucket.level}</p>
              <p className="text-xs text-gray-500">{bucket.range}</p>
              <p className="text-sm text-gray-100">{bucket.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">8</div>
          <div className="text-sm text-gray-400">Decision Nodes</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">85%</div>
          <div className="text-sm text-gray-400">Avg Confidence</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">9</div>
          <div className="text-sm text-gray-400">Evidence Sources</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">3</div>
          <div className="text-sm text-gray-400">Alternative Paths</div>
        </div>
      </div>
    </div>
  );
};

export default VisualReasoningPatternsDemo;