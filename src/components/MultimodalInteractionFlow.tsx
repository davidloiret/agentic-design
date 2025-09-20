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
  Mic,
  Eye,
  Hand,
  Type,
  Vibrate,
  Focus,
  Zap,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Info,
  Users,
  Globe
} from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';
import {
  multimodalInteractionPatterns,
  MultimodalInteractionPattern,
  InteractionStep,
  ModalityConfig
} from '../data/patterns/multimodal-interaction-patterns';

interface FlowNode extends Node {
  data: {
    label: string;
    type: 'input' | 'processing' | 'fusion' | 'output' | 'feedback';
    modality?: string;
    icon?: React.ReactNode;
    description?: string;
    reliability?: number;
    latency?: number;
  };
}

interface MultimodalInteractionFlowProps {
  height?: number;
}

const getModalityIcon = (modalityType: string) => {
  switch (modalityType) {
    case 'voice': return <Mic className="w-4 h-4" />;
    case 'visual': return <Eye className="w-4 h-4" />;
    case 'gesture': return <Hand className="w-4 h-4" />;
    case 'text': return <Type className="w-4 h-4" />;
    case 'haptic': return <Vibrate className="w-4 h-4" />;
    case 'gaze': return <Focus className="w-4 h-4" />;
    default: return <Settings className="w-4 h-4" />;
  }
};

const getStepTypeIcon = (stepType: string) => {
  switch (stepType) {
    case 'input': return <Settings className="w-4 h-4" />;
    case 'processing': return <Zap className="w-4 h-4" />;
    case 'fusion': return <BarChart3 className="w-4 h-4" />;
    case 'output': return <CheckCircle className="w-4 h-4" />;
    case 'feedback': return <AlertCircle className="w-4 h-4" />;
    default: return <Settings className="w-4 h-4" />;
  }
};

const createFlowNodes = (pattern: MultimodalInteractionPattern): FlowNode[] => {
  const nodeConfigs = {
    'cross-modal-attention-fusion': [
      { id: 'input-voice', label: 'Voice Input', type: 'input', x: 100, y: 50, modality: 'voice' },
      { id: 'input-visual', label: 'Visual Input', type: 'input', x: 100, y: 150, modality: 'visual' },
      { id: 'input-gesture', label: 'Gesture Input', type: 'input', x: 100, y: 250, modality: 'gesture' },
      { id: 'input-text', label: 'Text Input', type: 'input', x: 100, y: 350, modality: 'text' },

      { id: 'speech-encoder', label: 'Speech Encoder', type: 'processing', x: 300, y: 50, modality: 'voice' },
      { id: 'vision-encoder', label: 'Vision Encoder', type: 'processing', x: 300, y: 150, modality: 'visual' },
      { id: 'gesture-encoder', label: 'Gesture Encoder', type: 'processing', x: 300, y: 250, modality: 'gesture' },
      { id: 'text-encoder', label: 'Text Encoder', type: 'processing', x: 300, y: 350, modality: 'text' },

      { id: 'attention-mechanism', label: 'Cross-Modal Attention', type: 'fusion', x: 500, y: 150 },
      { id: 'cross-modal-transformer', label: 'Multi-Modal Transformer', type: 'fusion', x: 500, y: 250 },

      { id: 'context-integrator', label: 'Context Integration', type: 'processing', x: 700, y: 100 },
      { id: 'memory-bank', label: 'Memory Bank', type: 'processing', x: 700, y: 200 },
      { id: 'temporal-processor', label: 'Temporal Processing', type: 'processing', x: 700, y: 300 },

      { id: 'response-generator', label: 'Response Generator', type: 'output', x: 900, y: 150 },
      { id: 'output-speech', label: 'Speech Output', type: 'output', x: 1100, y: 50, modality: 'voice' },
      { id: 'output-visual', label: 'Visual Output', type: 'output', x: 1100, y: 150, modality: 'visual' },
      { id: 'output-gesture', label: 'Gesture Output', type: 'output', x: 1100, y: 250, modality: 'gesture' },

      { id: 'feedback-processor', label: 'Feedback Processor', type: 'feedback', x: 500, y: 400 },
      { id: 'user-model', label: 'User Model', type: 'feedback', x: 700, y: 400 },
      { id: 'adaptation-engine', label: 'Adaptation Engine', type: 'feedback', x: 900, y: 400 }
    ],
    'adaptive-interface-orchestration': [
      { id: 'context-sensors', label: 'Context Sensors', type: 'input', x: 100, y: 100 },
      { id: 'user-monitor', label: 'User Monitor', type: 'input', x: 100, y: 200 },
      { id: 'device-detector', label: 'Device Detector', type: 'input', x: 100, y: 300 },

      { id: 'modality-selector', label: 'Modality Selector', type: 'processing', x: 350, y: 150 },
      { id: 'preference-engine', label: 'Preference Engine', type: 'processing', x: 350, y: 250 },
      { id: 'context-analyzer', label: 'Context Analyzer', type: 'processing', x: 350, y: 350 },

      { id: 'interface-builder', label: 'Interface Builder', type: 'fusion', x: 600, y: 100 },
      { id: 'modality-coordinator', label: 'Modality Coordinator', type: 'fusion', x: 600, y: 200 },
      { id: 'resource-manager', label: 'Resource Manager', type: 'fusion', x: 600, y: 300 },

      { id: 'interaction-engine', label: 'Interaction Engine', type: 'output', x: 850, y: 150 },
      { id: 'output-coordinators', label: 'Output Coordinators', type: 'output', x: 850, y: 250 },
      { id: 'feedback-systems', label: 'Feedback Systems', type: 'output', x: 850, y: 350 },

      { id: 'learning-engine', label: 'Learning Engine', type: 'feedback', x: 1100, y: 100 },
      { id: 'performance-analyzer', label: 'Performance Analyzer', type: 'feedback', x: 1100, y: 200 },
      { id: 'adaptation-model', label: 'Adaptation Model', type: 'feedback', x: 1100, y: 300 }
    ],
    'gesture-voice-coordination': [
      { id: 'gesture-capture', label: 'Gesture Capture', type: 'input', x: 100, y: 100, modality: 'gesture' },
      { id: 'voice-capture', label: 'Voice Capture', type: 'input', x: 100, y: 200, modality: 'voice' },
      { id: 'sync-manager', label: 'Sync Manager', type: 'input', x: 100, y: 300 },

      { id: 'gesture-parser', label: 'Gesture Parser', type: 'processing', x: 350, y: 100, modality: 'gesture' },
      { id: 'voice-parser', label: 'Voice Parser', type: 'processing', x: 350, y: 200, modality: 'voice' },
      { id: 'intent-analyzer', label: 'Intent Analyzer', type: 'processing', x: 350, y: 300 },

      { id: 'fusion-engine', label: 'Fusion Engine', type: 'fusion', x: 600, y: 150 },
      { id: 'disambiguator', label: 'Disambiguator', type: 'fusion', x: 600, y: 250 },
      { id: 'confidence-calculator', label: 'Confidence Calculator', type: 'fusion', x: 600, y: 350 },

      { id: 'action-executor', label: 'Action Executor', type: 'output', x: 850, y: 150 },
      { id: 'feedback-generator', label: 'Feedback Generator', type: 'output', x: 850, y: 250, modality: 'visual' },
      { id: 'error-handler', label: 'Error Handler', type: 'output', x: 850, y: 350 },

      { id: 'learning-system', label: 'Learning System', type: 'feedback', x: 1100, y: 150 },
      { id: 'user-profiler', label: 'User Profiler', type: 'feedback', x: 1100, y: 250 },
      { id: 'adaptation-engine-gv', label: 'Adaptation Engine', type: 'feedback', x: 1100, y: 350 }
    ]
  };

  const configs = nodeConfigs[pattern.id as keyof typeof nodeConfigs] || [];

  return configs.map(config => {
    const modality = pattern.modalities.find(m => m.type === config.modality);

    return {
      id: config.id,
      type: 'default',
      position: { x: config.x, y: config.y },
      data: {
        label: config.label,
        type: config.type,
        modality: config.modality,
        icon: config.modality ? getModalityIcon(config.modality) : getStepTypeIcon(config.type),
        description: modality?.description || `${config.type} processing stage`,
        reliability: modality?.reliability,
        latency: modality?.processingLatency
      },
      style: {
        backgroundColor: '#374151',
        borderColor: '#6b7280',
        color: '#d1d5db',
        border: '2px solid #6b7280',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '11px',
        width: 140,
        height: 60
      }
    };
  });
};

const createFlowEdges = (pattern: MultimodalInteractionPattern): Edge[] => {
  const edgeConfigs = {
    'cross-modal-attention-fusion': [
      { id: 'sync-inputs', source: 'input-voice', target: 'speech-encoder' },
      { id: 'visual-encode', source: 'input-visual', target: 'vision-encoder' },
      { id: 'gesture-encode', source: 'input-gesture', target: 'gesture-encoder' },
      { id: 'text-encode', source: 'input-text', target: 'text-encoder' },

      { id: 'speech-to-attention', source: 'speech-encoder', target: 'attention-mechanism' },
      { id: 'vision-to-attention', source: 'vision-encoder', target: 'attention-mechanism' },
      { id: 'gesture-to-attention', source: 'gesture-encoder', target: 'cross-modal-transformer' },
      { id: 'text-to-attention', source: 'text-encoder', target: 'cross-modal-transformer' },

      { id: 'attention-to-context', source: 'attention-mechanism', target: 'context-integrator' },
      { id: 'transformer-to-memory', source: 'cross-modal-transformer', target: 'memory-bank' },
      { id: 'memory-to-temporal', source: 'memory-bank', target: 'temporal-processor' },

      { id: 'context-to-response', source: 'context-integrator', target: 'response-generator' },
      { id: 'temporal-to-response', source: 'temporal-processor', target: 'response-generator' },

      { id: 'response-to-speech', source: 'response-generator', target: 'output-speech' },
      { id: 'response-to-visual', source: 'response-generator', target: 'output-visual' },
      { id: 'response-to-gesture', source: 'response-generator', target: 'output-gesture' },

      { id: 'feedback-loop', source: 'output-speech', target: 'feedback-processor' },
      { id: 'user-modeling', source: 'feedback-processor', target: 'user-model' },
      { id: 'adaptation', source: 'user-model', target: 'adaptation-engine' }
    ],
    'adaptive-interface-orchestration': [
      { id: 'context-to-selector', source: 'context-sensors', target: 'modality-selector' },
      { id: 'user-to-preference', source: 'user-monitor', target: 'preference-engine' },
      { id: 'device-to-analyzer', source: 'device-detector', target: 'context-analyzer' },

      { id: 'selector-to-builder', source: 'modality-selector', target: 'interface-builder' },
      { id: 'preference-to-coordinator', source: 'preference-engine', target: 'modality-coordinator' },
      { id: 'analyzer-to-resource', source: 'context-analyzer', target: 'resource-manager' },

      { id: 'builder-to-interaction', source: 'interface-builder', target: 'interaction-engine' },
      { id: 'coordinator-to-output', source: 'modality-coordinator', target: 'output-coordinators' },
      { id: 'resource-to-feedback', source: 'resource-manager', target: 'feedback-systems' },

      { id: 'interaction-to-learning', source: 'interaction-engine', target: 'learning-engine' },
      { id: 'output-to-performance', source: 'output-coordinators', target: 'performance-analyzer' },
      { id: 'feedback-to-adaptation', source: 'feedback-systems', target: 'adaptation-model' }
    ],
    'gesture-voice-coordination': [
      { id: 'gesture-sync', source: 'gesture-capture', target: 'sync-manager' },
      { id: 'voice-sync', source: 'voice-capture', target: 'sync-manager' },

      { id: 'gesture-parse', source: 'gesture-capture', target: 'gesture-parser' },
      { id: 'voice-parse', source: 'voice-capture', target: 'voice-parser' },
      { id: 'sync-intent', source: 'sync-manager', target: 'intent-analyzer' },

      { id: 'gesture-fusion', source: 'gesture-parser', target: 'fusion-engine' },
      { id: 'voice-fusion', source: 'voice-parser', target: 'fusion-engine' },
      { id: 'intent-disambiguate', source: 'intent-analyzer', target: 'disambiguator' },
      { id: 'fusion-confidence', source: 'fusion-engine', target: 'confidence-calculator' },

      { id: 'execute-action', source: 'confidence-calculator', target: 'action-executor' },
      { id: 'generate-feedback', source: 'action-executor', target: 'feedback-generator' },
      { id: 'handle-errors', source: 'disambiguator', target: 'error-handler' },

      { id: 'learn-patterns', source: 'action-executor', target: 'learning-system' },
      { id: 'profile-user', source: 'feedback-generator', target: 'user-profiler' },
      { id: 'adapt-system', source: 'learning-system', target: 'adaptation-engine-gv' }
    ]
  };

  const configs = edgeConfigs[pattern.id as keyof typeof edgeConfigs] || [];

  return configs.map(config => ({
    id: config.id,
    source: config.source,
    target: config.target,
    style: {
      stroke: '#6b7280',
      strokeWidth: 2,
    },
    animated: false
  }));
};

const stepColors = {
  input: '#3b82f6',
  processing: '#f59e0b',
  fusion: '#8b5cf6',
  output: '#10b981',
  feedback: '#ef4444',
  active: '#06b6d4'
};

export const MultimodalInteractionFlow: React.FC<MultimodalInteractionFlowProps> = ({
  height = 600
}) => {
  const [selectedPattern, setSelectedPattern] = useState<MultimodalInteractionPattern>(multimodalInteractionPatterns[0]);
  const [nodes, setNodes, onNodesChange] = useNodesState(createFlowNodes(selectedPattern));
  const [edges, setEdges, onEdgesChange] = useEdgesState(createFlowEdges(selectedPattern));
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const { trackDemo } = usePlausible();

  const resetFlow = useCallback(() => {
    trackDemo(selectedPattern.id, 'reset');
    setCurrentStep(-1);
    setIsPlaying(false);
    setNodes(createFlowNodes(selectedPattern));
    setEdges(createFlowEdges(selectedPattern));
  }, [selectedPattern, setNodes, setEdges, trackDemo]);

  const updateVisualizationForStep = useCallback((step: InteractionStep) => {
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
    if (currentStep < selectedPattern.interactionFlow.length - 1) {
      const newStep = currentStep + 1;
      trackDemo(selectedPattern.id, 'step', {
        step: newStep + 1,
        total_steps: selectedPattern.interactionFlow.length,
        step_title: selectedPattern.interactionFlow[newStep].title
      });
      setCurrentStep(newStep);
      updateVisualizationForStep(selectedPattern.interactionFlow[newStep]);
    } else {
      trackDemo(selectedPattern.id, 'complete');
      setIsPlaying(false);
    }
  }, [currentStep, selectedPattern.interactionFlow, updateVisualizationForStep, trackDemo, selectedPattern.id]);

  const prevStep = useCallback(() => {
    if (currentStep > -1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      if (newStep >= 0) {
        updateVisualizationForStep(selectedPattern.interactionFlow[newStep]);
      } else {
        resetFlow();
      }
    }
  }, [currentStep, selectedPattern.interactionFlow, updateVisualizationForStep, resetFlow]);

  const togglePlayback = useCallback(() => {
    const newPlayingState = !isPlaying;
    trackDemo(selectedPattern.id, newPlayingState ? 'play' : 'pause', {
      current_step: currentStep + 1,
      total_steps: selectedPattern.interactionFlow.length
    });
    setIsPlaying(newPlayingState);
  }, [isPlaying, selectedPattern.id, trackDemo, currentStep, selectedPattern.interactionFlow.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < selectedPattern.interactionFlow.length - 1) {
      const currentStepData = selectedPattern.interactionFlow[currentStep + 1];
      interval = setTimeout(nextStep, currentStepData?.duration || 2000);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, nextStep, selectedPattern.interactionFlow]);

  useEffect(() => {
    resetFlow();
  }, [selectedPattern, resetFlow]);

  const currentStepData = currentStep >= 0 ? selectedPattern.interactionFlow[currentStep] : null;
  const currentScenario = selectedPattern.scenarios[selectedScenario];

  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Header Controls */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="text-3xl mr-3">🤝</span>
              Multimodal Interaction Patterns
            </h2>
            <p className="text-gray-400 text-sm">Advanced agent interaction patterns integrating voice, visual, gesture, and text communication seamlessly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interaction Pattern</label>
            <select
              value={selectedPattern.id}
              onChange={(e) => {
                const pattern = multimodalInteractionPatterns.find(p => p.id === e.target.value);
                if (pattern) setSelectedPattern(pattern);
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {multimodalInteractionPatterns.map((pattern) => (
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
              disabled={currentStep >= selectedPattern.interactionFlow.length - 1}
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
            fitViewOptions={{ padding: 0.1 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Background color="#374151" />
            <Controls className="bg-slate-700 border-slate-600" />

            {/* Pattern Info Panel */}
            <Panel position="top-left" className="bg-slate-800/95 p-4 rounded-lg m-4 max-w-sm">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{selectedPattern.icon}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm">{selectedPattern.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      selectedPattern.complexity === 'basic' ? 'bg-green-900/40 border-green-500 text-green-400' :
                      selectedPattern.complexity === 'intermediate' ? 'bg-yellow-900/40 border-yellow-500 text-yellow-400' :
                      'bg-red-900/40 border-red-500 text-red-400'
                    }`}>
                      {selectedPattern.complexity}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-blue-900/40 border-blue-500 text-blue-400">
                      {selectedPattern.category}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-300 mb-3">{selectedPattern.description}</p>

              {/* Modalities */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-300 mb-2">Active Modalities</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedPattern.modalities.map((modality) => (
                    <div key={modality.id} className="flex items-center text-xs bg-gray-700/50 px-2 py-1 rounded">
                      {getModalityIcon(modality.type)}
                      <span className="ml-1">{modality.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Progress */}
              <div className="mb-3">
                <div className="text-xs text-slate-300 mb-1">
                  Step {Math.max(0, currentStep + 1)} of {selectedPattern.interactionFlow.length}
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / selectedPattern.interactionFlow.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Step Info */}
              {currentStepData && (
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex items-center mb-2">
                    {getStepTypeIcon(currentStepData.type)}
                    <h4 className="font-medium text-white ml-2 text-sm">{currentStepData.title}</h4>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{currentStepData.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {currentStepData.techniques.slice(0, 3).map((technique, index) => (
                      <span key={index} className="text-xs bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Panel>

            {/* Fusion Strategy Panel */}
            <Panel position="top-right" className="bg-slate-800/95 p-3 rounded-lg m-4 max-w-xs">
              <h4 className="font-medium text-white mb-2 text-sm flex items-center">
                <BarChart3 className="w-4 h-4 mr-1" />
                Fusion Strategy
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-400">Type:</span>
                  <span className="text-xs text-white ml-1">{selectedPattern.fusionStrategy.type}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Mechanism:</span>
                  <p className="text-xs text-gray-300">{selectedPattern.fusionStrategy.mechanism}</p>
                </div>
                <p className="text-xs text-gray-300">{selectedPattern.fusionStrategy.description}</p>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Side Panel */}
        {showDetails && (
          <div className="w-96 bg-slate-800 border-l border-slate-600 p-4 overflow-y-auto" style={{ height: `${height}px` }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Interaction Details</h4>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Current Scenario */}
            <div className="mb-6">
              <h5 className="font-medium text-blue-400 mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Current Scenario
              </h5>
              <div className="bg-slate-900 p-3 rounded-md">
                <h6 className="text-sm font-medium text-white mb-1">{currentScenario.title}</h6>
                <p className="text-xs text-gray-300 mb-2">{currentScenario.description}</p>
                <div className="text-xs space-y-1">
                  <div>
                    <span className="text-gray-400">Context: </span>
                    <span className="text-blue-300">{currentScenario.context}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">User Goal: </span>
                    <span className="text-green-300">{currentScenario.userGoal}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Example: </span>
                    <span className="text-purple-300">{currentScenario.realWorldExample}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modality Usage */}
            <div className="mb-6">
              <h5 className="font-medium text-purple-400 mb-2">Modality Usage</h5>
              <div className="space-y-2">
                {Object.entries(currentScenario.modalityUsage).map(([modalityId, usage]) => {
                  const modality = selectedPattern.modalities.find(m => m.id === modalityId);
                  return (
                    <div key={modalityId} className="bg-slate-900 p-2 rounded-md">
                      <div className="flex items-center mb-1">
                        {modality && getModalityIcon(modality.type)}
                        <span className="text-sm font-medium text-white ml-2">
                          {modality?.name || modalityId}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">{usage}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Step Technical Details */}
            {currentStepData && (
              <div className="mb-6">
                <h5 className="font-medium text-orange-400 mb-2">Step Details</h5>
                <div className="bg-slate-900 p-3 rounded-md space-y-2">
                  <div>
                    <span className="text-xs text-gray-400">Type: </span>
                    <span className="text-xs text-white">{currentStepData.type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Complexity: </span>
                    <span className={`text-xs ${
                      currentStepData.complexity === 'simple' ? 'text-green-400' :
                      currentStepData.complexity === 'moderate' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {currentStepData.complexity}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Duration: </span>
                    <span className="text-xs text-white">{currentStepData.duration}ms</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Techniques: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentStepData.techniques.map((technique, index) => (
                        <span key={index} className="text-xs bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded">
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pattern Applications */}
            <div className="mb-6">
              <h5 className="font-medium text-green-400 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Applications
              </h5>
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
                  <AlertCircle className="w-4 h-4 mr-1" />
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

export default MultimodalInteractionFlow;