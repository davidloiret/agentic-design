'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Eye,
  Brain,
  CheckCircle,
  Target,
  Layers,
  Zap,
  ArrowRight,
  AlertTriangle,
  Info
} from 'lucide-react';
import { visualReasoningPatterns, VisualReasoningPattern, VisualReasoningStep } from '../data/patterns/visual-reasoning-patterns';
import { usePlausible } from '@/hooks/usePlausible';

interface FlowNode extends Node {
  data: {
    label: string;
    type: 'input' | 'process' | 'output' | 'decision';
    icon?: React.ReactNode;
    description?: string;
  };
}

interface VisualReasoningFlowProps {
  height?: number;
}

const createFlowNodes = (pattern: VisualReasoningPattern): FlowNode[] => {
  type NodeConfig = {
    id: string;
    label: string;
    type: 'input' | 'process' | 'output' | 'decision';
    x: number;
    y: number;
    icon: React.ReactNode;
    description: string;
  };
  
  const nodeConfigs: Record<string, NodeConfig[]> = {
    'visual-chain-of-thought': [
      { id: 'visual-input', label: 'Visual Input', type: 'input', x: 100, y: 50, icon: <Eye className="w-4 h-4" />, description: 'Raw image/video input' },
      { id: 'perception-model', label: 'Visual Perception', type: 'process', x: 300, y: 50, icon: <Target className="w-4 h-4" />, description: 'Object detection and scene parsing' },
      { id: 'attention-mechanism', label: 'Visual Attention', type: 'process', x: 500, y: 50, icon: <Eye className="w-4 h-4" />, description: 'Focus on relevant visual regions' },
      { id: 'llm-reasoning', label: 'LLM Reasoning', type: 'process', x: 300, y: 200, icon: <Brain className="w-4 h-4" />, description: 'Step-by-step logical reasoning' },
      { id: 'cross-modal-verifier', label: 'Cross-Modal Verifier', type: 'decision', x: 500, y: 200, icon: <CheckCircle className="w-4 h-4" />, description: 'Verify consistency across modalities' },
      { id: 'output', label: 'Verified Output', type: 'output', x: 700, y: 125, icon: <CheckCircle className="w-4 h-4" />, description: 'Final answer with rationale' }
    ],
    'visual-attention-mechanisms': [
      { id: 'image-input', label: 'Image Input', type: 'input', x: 100, y: 100, icon: <Eye className="w-4 h-4" />, description: 'Raw visual input' },
      { id: 'feature-extractor', label: 'Feature Extraction', type: 'process', x: 300, y: 100, icon: <Layers className="w-4 h-4" />, description: 'CNN feature maps' },
      { id: 'query-encoder', label: 'Query Encoder', type: 'process', x: 300, y: 200, icon: <Brain className="w-4 h-4" />, description: 'Task context encoding' },
      { id: 'attention-calculator', label: 'Attention Weights', type: 'process', x: 500, y: 150, icon: <Target className="w-4 h-4" />, description: 'Spatial attention computation' },
      { id: 'feature-aggregator', label: 'Feature Aggregation', type: 'process', x: 700, y: 150, icon: <Layers className="w-4 h-4" />, description: 'Weighted feature fusion' },
      { id: 'reasoning-module', label: 'Reasoning Module', type: 'process', x: 900, y: 150, icon: <Brain className="w-4 h-4" />, description: 'Task-specific reasoning' },
      { id: 'output-decoder', label: 'Output', type: 'output', x: 1100, y: 150, icon: <CheckCircle className="w-4 h-4" />, description: 'Final task output' }
    ],
    'multimodal-reasoning-synthesis': [
      { id: 'visual-encoder', label: 'Visual Encoder', type: 'process', x: 100, y: 50, icon: <Eye className="w-4 h-4" />, description: 'Vision Transformer encoding' },
      { id: 'text-encoder', label: 'Text Encoder', type: 'process', x: 100, y: 150, icon: <Brain className="w-4 h-4" />, description: 'Language model encoding' },
      { id: 'alignment-module', label: 'Modal Alignment', type: 'process', x: 300, y: 100, icon: <Layers className="w-4 h-4" />, description: 'Cross-modal alignment' },
      { id: 'fusion-transformer', label: 'Fusion Transformer', type: 'process', x: 500, y: 100, icon: <Zap className="w-4 h-4" />, description: 'Multi-modal fusion' },
      { id: 'modal-gates', label: 'Modal Gates', type: 'decision', x: 500, y: 200, icon: <Target className="w-4 h-4" />, description: 'Gated fusion control' },
      { id: 'reasoning-engine', label: 'Reasoning Engine', type: 'process', x: 700, y: 100, icon: <Brain className="w-4 h-4" />, description: 'Complex reasoning' },
      { id: 'knowledge-base', label: 'Knowledge Base', type: 'process', x: 700, y: 200, icon: <Layers className="w-4 h-4" />, description: 'External knowledge' },
      { id: 'text-generator', label: 'Text Generator', type: 'output', x: 900, y: 50, icon: <Brain className="w-4 h-4" />, description: 'Text response generation' },
      { id: 'visual-annotator', label: 'Visual Annotator', type: 'output', x: 900, y: 150, icon: <Eye className="w-4 h-4" />, description: 'Visual annotations' },
      { id: 'explanation-module', label: 'Explanation Module', type: 'output', x: 900, y: 250, icon: <Info className="w-4 h-4" />, description: 'Reasoning explanations' }
    ]
  };

  const configs = nodeConfigs[pattern.id as keyof typeof nodeConfigs] || [];

  return configs.map((config: NodeConfig) => ({
    id: config.id,
    type: 'default',
    position: { x: config.x, y: config.y },
    data: {
      label: config.label,
      type: config.type,
      icon: config.icon,
      description: config.description
    },
    style: {
      backgroundColor: '#374151',
      borderColor: '#6b7280',
      color: '#d1d5db',
      border: '2px solid #6b7280',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      width: 140,
      height: 60
    }
  }));
};

const createFlowEdges = (pattern: VisualReasoningPattern): Edge[] => {
  const edgeConfigs = {
    'visual-chain-of-thought': [
      { id: 'input-to-perception', source: 'visual-input', target: 'perception-model', label: 'visual data' },
      { id: 'perception-to-attention', source: 'perception-model', target: 'attention-mechanism', label: 'features' },
      { id: 'attention-to-llm', source: 'attention-mechanism', target: 'llm-reasoning', label: 'attended features' },
      { id: 'llm-to-verifier', source: 'llm-reasoning', target: 'cross-modal-verifier', label: 'reasoning' },
      { id: 'verifier-to-output', source: 'cross-modal-verifier', target: 'output', label: 'verified result' },
      { id: 'feedback-loop', source: 'cross-modal-verifier', target: 'llm-reasoning', label: 'feedback' },
      { id: 'verification-loop', source: 'perception-model', target: 'cross-modal-verifier', label: 'visual context' }
    ],
    'visual-attention-mechanisms': [
      { id: 'input-to-features', source: 'image-input', target: 'feature-extractor', label: 'raw image' },
      { id: 'features-to-attention', source: 'feature-extractor', target: 'attention-calculator', label: 'feature maps' },
      { id: 'query-to-attention', source: 'query-encoder', target: 'attention-calculator', label: 'query context' },
      { id: 'attention-to-aggregation', source: 'attention-calculator', target: 'feature-aggregator', label: 'weights' },
      { id: 'aggregation-to-reasoning', source: 'feature-aggregator', target: 'reasoning-module', label: 'attended features' },
      { id: 'reasoning-to-output', source: 'reasoning-module', target: 'output-decoder', label: 'reasoning result' }
    ],
    'multimodal-reasoning-synthesis': [
      { id: 'visual-to-alignment', source: 'visual-encoder', target: 'alignment-module', label: 'visual embeddings' },
      { id: 'text-to-alignment', source: 'text-encoder', target: 'alignment-module', label: 'text embeddings' },
      { id: 'alignment-to-fusion', source: 'alignment-module', target: 'fusion-transformer', label: 'aligned features' },
      { id: 'fusion-internal', source: 'fusion-transformer', target: 'modal-gates', label: 'fused representation' },
      { id: 'fusion-to-reasoning', source: 'fusion-transformer', target: 'reasoning-engine', label: 'multimodal features' },
      { id: 'knowledge-integration', source: 'knowledge-base', target: 'reasoning-engine', label: 'external knowledge' },
      { id: 'reasoning-to-generators', source: 'reasoning-engine', target: 'text-generator', label: 'reasoning output' },
      { id: 'reasoning-to-visual', source: 'reasoning-engine', target: 'visual-annotator', label: 'visual output' },
      { id: 'explanation-links', source: 'reasoning-engine', target: 'explanation-module', label: 'explanations' }
    ]
  };

  const configs = edgeConfigs[pattern.id as keyof typeof edgeConfigs] || [];

  return configs.map(config => ({
    id: config.id,
    source: config.source,
    target: config.target,
    label: config.label,
    style: {
      stroke: '#6b7280',
      strokeWidth: 2,
    },
    animated: false,
    labelStyle: {
      fontSize: '10px',
      color: '#9ca3af'
    }
  }));
};

const stepColors = {
  active: '#3b82f6',
  completed: '#10b981',
  pending: '#6b7280',
  see: '#8b5cf6',
  think: '#f59e0b',
  confirm: '#10b981',
  process: '#3b82f6',
  validate: '#ef4444'
};

const getStepIcon = (type: string) => {
  switch (type) {
    case 'see': return <Eye className="w-4 h-4" />;
    case 'think': return <Brain className="w-4 h-4" />;
    case 'confirm': return <CheckCircle className="w-4 h-4" />;
    case 'process': return <Zap className="w-4 h-4" />;
    case 'validate': return <Target className="w-4 h-4" />;
    default: return <ArrowRight className="w-4 h-4" />;
  }
};

export const VisualReasoningFlow: React.FC<VisualReasoningFlowProps> = ({
  height = 600
}) => {
  const { trackEvent } = usePlausible();
  const [selectedPattern, setSelectedPattern] = useState<VisualReasoningPattern>(visualReasoningPatterns[0]);
  const [nodes, setNodes, onNodesChange] = useNodesState(createFlowNodes(selectedPattern));
  const [edges, setEdges, onEdgesChange] = useEdgesState(createFlowEdges(selectedPattern));
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState(0);

  const resetFlow = useCallback(() => {
    trackEvent('Visual Flow Interaction', {
      action: 'reset_flow',
      pattern_id: selectedPattern.id,
      current_step: currentStep,
      total_steps: selectedPattern.steps.length
    });

    setCurrentStep(-1);
    setIsPlaying(false);
    setNodes(createFlowNodes(selectedPattern));
    setEdges(createFlowEdges(selectedPattern));
  }, [selectedPattern, setNodes, setEdges, trackEvent, currentStep]);

  const updateVisualizationForStep = useCallback((step: VisualReasoningStep) => {
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        const isActive = step.activeNodes.includes(node.id);
        const stepColor = stepColors[step.type] || stepColors.active;

        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: isActive ? stepColor : '#374151',
            borderColor: isActive ? stepColor : '#6b7280',
            border: isActive ? `3px solid ${stepColor}` : '2px solid #6b7280',
            opacity: isActive ? 1 : 0.6,
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }
        };
      });
    });

    setEdges((prevEdges) => {
      return prevEdges.map((edge) => {
        const isActive = step.activeEdges.includes(edge.id);
        const stepColor = stepColors[step.type] || stepColors.active;

        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: isActive ? stepColor : '#6b7280',
            strokeWidth: isActive ? 3 : 2,
            opacity: isActive ? 1 : 0.4,
          },
          animated: isActive
        };
      });
    });
  }, [setNodes, setEdges]);

  const nextStep = useCallback(() => {
    if (currentStep < selectedPattern.steps.length - 1) {
      const newStep = currentStep + 1;

      trackEvent('Visual Flow Interaction', {
        action: 'next_step',
        pattern_id: selectedPattern.id,
        from_step: currentStep,
        to_step: newStep,
        total_steps: selectedPattern.steps.length
      });

      setCurrentStep(newStep);
      updateVisualizationForStep(selectedPattern.steps[newStep]);
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, selectedPattern.steps, updateVisualizationForStep, trackEvent, selectedPattern.id]);

  const prevStep = useCallback(() => {
    if (currentStep > -1) {
      const newStep = currentStep - 1;

      trackEvent('Visual Flow Interaction', {
        action: 'prev_step',
        pattern_id: selectedPattern.id,
        from_step: currentStep,
        to_step: newStep,
        total_steps: selectedPattern.steps.length
      });

      setCurrentStep(newStep);
      if (newStep >= 0) {
        updateVisualizationForStep(selectedPattern.steps[newStep]);
      } else {
        resetFlow();
      }
    }
  }, [currentStep, selectedPattern.steps, updateVisualizationForStep, resetFlow, trackEvent, selectedPattern.id]);

  const togglePlayback = useCallback(() => {
    trackEvent('Visual Flow Interaction', {
      action: isPlaying ? 'pause_playback' : 'start_playback',
      pattern_id: selectedPattern.id,
      current_step: currentStep,
      total_steps: selectedPattern.steps.length
    });

    setIsPlaying(!isPlaying);
  }, [isPlaying, trackEvent, selectedPattern.id, currentStep, selectedPattern.steps.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < selectedPattern.steps.length - 1) {
      const currentStepData = selectedPattern.steps[currentStep + 1];
      interval = setTimeout(nextStep, currentStepData?.duration || 2000);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, nextStep, selectedPattern.steps]);

  useEffect(() => {
    resetFlow();
  }, [selectedPattern, resetFlow]);

  const currentStepData = currentStep >= 0 ? selectedPattern.steps[currentStep] : null;
  const currentScenario = selectedPattern.scenarios[selectedScenario];

  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Header Controls */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-3xl mr-3">👁️</span>
              Visual Reasoning Patterns Flow
            </h2>
            <p className="text-gray-400 text-sm">Interactive visualization of visual reasoning patterns and their processing flows</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Pattern</label>
            <select
              value={selectedPattern.id}
              onChange={(e) => {
                const pattern = visualReasoningPatterns.find(p => p.id === e.target.value);
                if (pattern) setSelectedPattern(pattern);
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {visualReasoningPatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.icon} {pattern.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedPattern.scenarios.map((scenario, index) => (
                <option key={scenario.id} value={index}>
                  {scenario.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={togglePlayback}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={prevStep}
              disabled={currentStep <= -1}
              className="p-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-md transition-colors"
              title="Previous Step"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep >= selectedPattern.steps.length - 1}
              className="p-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-md transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={resetFlow}
              className="p-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Flow Diagram */}
        <div className="flex-1" style={{ height: `${height}px` }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Background color="#374151" />
            <Controls className="bg-slate-700 border-slate-600" />

            {/* Pattern Info Panel */}
            <Panel position="top-left" className="bg-slate-800/95 p-4 rounded-lg m-4 max-w-md">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{selectedPattern.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{selectedPattern.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedPattern.complexity === 'basic' ? 'bg-green-900/40 border-green-500 text-green-400' :
                    selectedPattern.complexity === 'intermediate' ? 'bg-yellow-900/40 border-yellow-500 text-yellow-400' :
                    'bg-red-900/40 border-red-500 text-red-400'
                  }`}>
                    {selectedPattern.complexity}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{selectedPattern.description}</p>

              {/* Step Progress */}
              <div className="mb-3">
                <div className="text-xs text-slate-300 mb-1">
                  Step {Math.max(0, currentStep + 1)} of {selectedPattern.steps.length}
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / selectedPattern.steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Step Info */}
              {currentStepData && (
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex items-center mb-2">
                    {getStepIcon(currentStepData.type)}
                    <h4 className="font-medium text-white ml-2">{currentStepData.title}</h4>
                  </div>
                  <p className="text-xs text-gray-300">{currentStepData.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentStepData.techniques.map((technique, index) => (
                      <span key={index} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Panel>
          </ReactFlow>
        </div>

        {/* Side Panel */}
        {showDetails && (
          <div className="w-96 bg-slate-800 border-l border-slate-600 p-4 overflow-y-auto" style={{ height: `${height}px` }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Pattern Details</h4>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Current Scenario */}
            <div className="mb-6">
              <h5 className="font-medium text-blue-400 mb-2">Current Scenario</h5>
              <div className="bg-slate-900 p-3 rounded-md">
                <h6 className="text-sm font-medium text-white mb-1">{currentScenario.title}</h6>
                <p className="text-xs text-gray-300 mb-2">{currentScenario.description}</p>
                <div className="text-xs">
                  <span className="text-gray-400">Question: </span>
                  <span className="text-blue-300">{currentScenario.question}</span>
                </div>
              </div>
            </div>

            {/* Step Details */}
            {currentStepData && (
              <div className="mb-6">
                <h5 className="font-medium text-purple-400 mb-2">Current Step</h5>
                <div className="bg-slate-900 p-3 rounded-md space-y-2">
                  {currentStepData.input && (
                    <div>
                      <span className="text-xs text-green-400">Input: </span>
                      <span className="text-xs text-gray-300">{currentStepData.input}</span>
                    </div>
                  )}
                  {currentStepData.output && (
                    <div>
                      <span className="text-xs text-orange-400">Output: </span>
                      <span className="text-xs text-gray-300">{currentStepData.output}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pattern Applications */}
            <div className="mb-6">
              <h5 className="font-medium text-green-400 mb-2">Applications</h5>
              <div className="space-y-1">
                {selectedPattern.applications.slice(0, 4).map((app, index) => (
                  <div key={index} className="text-xs text-gray-300 bg-slate-900 p-2 rounded">
                    {app}
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages & Limitations */}
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-green-400 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Advantages
                </h5>
                <div className="space-y-1">
                  {selectedPattern.advantages.slice(0, 3).map((advantage, index) => (
                    <div key={index} className="text-xs text-gray-300">
                      • {advantage}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-orange-400 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Limitations
                </h5>
                <div className="space-y-1">
                  {selectedPattern.limitations.slice(0, 3).map((limitation, index) => (
                    <div key={index} className="text-xs text-gray-300">
                      • {limitation}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Show panel button when hidden */}
      {!showDetails && (
        <button
          onClick={() => setShowDetails(true)}
          className="absolute top-20 right-4 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-md text-sm z-10"
        >
          Show Details
        </button>
      )}
    </div>
  );
};

export default VisualReasoningFlow;