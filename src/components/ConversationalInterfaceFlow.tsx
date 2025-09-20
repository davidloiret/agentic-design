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
  Bot,
  MessageSquare,
  Mic,
  Eye,
  Hand,
  Settings,
  Brain,
  Zap,
  Target,
  Users,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Info,
  BarChart3
} from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';
import {
  advancedConversationalInterfacePatterns,
  ConversationalInterfacePattern,
  ConversationalStep,
  InterfaceComponent
} from '../data/patterns/advanced-conversational-interface-patterns';

interface FlowNode extends Node {
  data: {
    label: string;
    type: 'input' | 'output' | 'navigation' | 'feedback' | 'context';
    modality?: string;
    icon?: React.ReactNode;
    description?: string;
    responsiveness?: number;
    accessibility?: number;
  };
}

interface ConversationalInterfaceFlowProps {
  height?: number;
}

const getModalityIcon = (modalityType: string) => {
  switch (modalityType) {
    case 'text': return <MessageSquare className="w-4 h-4" />;
    case 'voice': return <Mic className="w-4 h-4" />;
    case 'visual': return <Eye className="w-4 h-4" />;
    case 'haptic': return <Hand className="w-4 h-4" />;
    case 'multimodal': return <Settings className="w-4 h-4" />;
    default: return <Bot className="w-4 h-4" />;
  }
};

const getStepTypeIcon = (stepType: string) => {
  switch (stepType) {
    case 'initiation': return <Zap className="w-4 h-4" />;
    case 'dialogue': return <MessageSquare className="w-4 h-4" />;
    case 'task-execution': return <Settings className="w-4 h-4" />;
    case 'completion': return <CheckCircle className="w-4 h-4" />;
    case 'recovery': return <AlertCircle className="w-4 h-4" />;
    default: return <Bot className="w-4 h-4" />;
  }
};

const createFlowNodes = (pattern: ConversationalInterfacePattern): FlowNode[] => {
  const nodeConfigs = {
    'agent-driven-conversational-interface': [
      { id: 'user-context', label: 'User Context', type: 'input', x: 100, y: 100, modality: 'multimodal' },
      { id: 'proactive-agent', label: 'Proactive Agent Core', type: 'context', x: 350, y: 50, modality: 'multimodal' },
      { id: 'contextual-memory', label: 'Contextual Memory', type: 'context', x: 350, y: 150, modality: 'text' },

      { id: 'intent-prediction', label: 'Intent Prediction', type: 'context', x: 600, y: 100, modality: 'multimodal' },
      { id: 'conversation-initiation', label: 'Conversation Initiation', type: 'output', x: 850, y: 50, modality: 'text' },

      { id: 'guided-dialogue', label: 'Guided Dialogue', type: 'navigation', x: 600, y: 250, modality: 'text' },
      { id: 'task-orchestrator', label: 'Task Orchestrator', type: 'navigation', x: 350, y: 300, modality: 'multimodal' },

      { id: 'multi-tool-coord', label: 'Multi-Tool Coordination', type: 'context', x: 600, y: 400, modality: 'multimodal' },
      { id: 'background-processing', label: 'Background Processing', type: 'context', x: 850, y: 350, modality: 'multimodal' },

      { id: 'adaptive-interface', label: 'Adaptive Interface', type: 'output', x: 350, y: 500, modality: 'visual' },
      { id: 'progress-feedback', label: 'Progress Feedback', type: 'feedback', x: 600, y: 550, modality: 'visual' },
      { id: 'learning-integration', label: 'Learning Integration', type: 'feedback', x: 850, y: 500, modality: 'multimodal' }
    ],
    'multimodal-conversation-interface': [
      { id: 'voice-input', label: 'Voice Input', type: 'input', x: 100, y: 50, modality: 'voice' },
      { id: 'text-input', label: 'Text Input', type: 'input', x: 100, y: 150, modality: 'text' },
      { id: 'gesture-input', label: 'Gesture Input', type: 'input', x: 100, y: 250, modality: 'visual' },
      { id: 'haptic-input', label: 'Haptic Input', type: 'input', x: 100, y: 350, modality: 'haptic' },

      { id: 'input-synchronizer', label: 'Input Synchronizer', type: 'context', x: 350, y: 150 },
      { id: 'modal-fusion', label: 'Modal Fusion Engine', type: 'context', x: 350, y: 250 },

      { id: 'context-interpreter', label: 'Context Interpreter', type: 'navigation', x: 600, y: 150 },
      { id: 'semantic-analyzer', label: 'Semantic Analyzer', type: 'navigation', x: 600, y: 250 },

      { id: 'response-coordinator', label: 'Response Coordinator', type: 'output', x: 850, y: 100 },
      { id: 'voice-output', label: 'Voice Output', type: 'output', x: 1100, y: 50, modality: 'voice' },
      { id: 'visual-output', label: 'Visual Output', type: 'output', x: 1100, y: 150, modality: 'visual' },
      { id: 'haptic-output', label: 'Haptic Output', type: 'output', x: 1100, y: 250, modality: 'haptic' },

      { id: 'feedback-collector', label: 'Feedback Collector', type: 'feedback', x: 600, y: 400 },
      { id: 'preference-updater', label: 'Preference Updater', type: 'feedback', x: 850, y: 400 }
    ],
    'contextual-adaptive-interface': [
      { id: 'environmental-sensors', label: 'Environmental Sensors', type: 'input', x: 100, y: 100 },
      { id: 'user-behavior', label: 'User Behavior Monitor', type: 'input', x: 100, y: 200 },
      { id: 'device-context', label: 'Device Context', type: 'input', x: 100, y: 300 },

      { id: 'context-analyzer', label: 'Context Analyzer', type: 'context', x: 350, y: 150, modality: 'multimodal' },
      { id: 'preference-learner', label: 'Preference Learner', type: 'context', x: 350, y: 250, modality: 'text' },

      { id: 'adaptation-planner', label: 'Adaptation Planner', type: 'navigation', x: 600, y: 100 },
      { id: 'rule-engine', label: 'Rule Engine', type: 'navigation', x: 600, y: 200 },
      { id: 'ml-predictor', label: 'ML Predictor', type: 'navigation', x: 600, y: 300 },

      { id: 'adaptation-engine', label: 'Adaptation Engine', type: 'output', x: 850, y: 150, modality: 'multimodal' },
      { id: 'dynamic-ui', label: 'Dynamic UI Generator', type: 'output', x: 850, y: 250, modality: 'visual' },

      { id: 'interaction-monitor', label: 'Interaction Monitor', type: 'feedback', x: 1100, y: 100 },
      { id: 'model-updater', label: 'Model Updater', type: 'feedback', x: 1100, y: 200 },
      { id: 'performance-tracker', label: 'Performance Tracker', type: 'feedback', x: 1100, y: 300 }
    ]
  };

  const configs = nodeConfigs[pattern.id as keyof typeof nodeConfigs] || [];

  return configs.map(config => {
    const component = pattern.interfaceComponents.find(c => c.name.toLowerCase().includes(config.label.toLowerCase().split(' ')[0]));

    return {
      id: config.id,
      type: 'default',
      position: { x: config.x, y: config.y },
      data: {
        label: config.label,
        type: config.type,
        modality: config.modality,
        icon: config.modality ? getModalityIcon(config.modality) : getStepTypeIcon(config.type),
        description: component?.description || `${config.type} component`,
        responsiveness: component?.responsiveness,
        accessibility: component?.accessibility
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

const createFlowEdges = (pattern: ConversationalInterfacePattern): Edge[] => {
  const edgeConfigs = {
    'agent-driven-conversational-interface': [
      { id: 'context-to-agent', source: 'user-context', target: 'proactive-agent' },
      { id: 'context-to-memory', source: 'user-context', target: 'contextual-memory' },
      { id: 'agent-to-prediction', source: 'proactive-agent', target: 'intent-prediction' },
      { id: 'memory-to-prediction', source: 'contextual-memory', target: 'intent-prediction' },
      { id: 'prediction-to-initiation', source: 'intent-prediction', target: 'conversation-initiation' },

      { id: 'agent-to-dialogue', source: 'proactive-agent', target: 'guided-dialogue' },
      { id: 'memory-to-orchestrator', source: 'contextual-memory', target: 'task-orchestrator' },
      { id: 'dialogue-to-orchestrator', source: 'guided-dialogue', target: 'task-orchestrator' },

      { id: 'orchestrator-to-coordination', source: 'task-orchestrator', target: 'multi-tool-coord' },
      { id: 'coordination-to-processing', source: 'multi-tool-coord', target: 'background-processing' },

      { id: 'orchestrator-to-interface', source: 'task-orchestrator', target: 'adaptive-interface' },
      { id: 'processing-to-feedback', source: 'background-processing', target: 'progress-feedback' },
      { id: 'interface-to-learning', source: 'adaptive-interface', target: 'learning-integration' },
      { id: 'feedback-to-memory', source: 'progress-feedback', target: 'contextual-memory' }
    ],
    'multimodal-conversation-interface': [
      { id: 'voice-sync', source: 'voice-input', target: 'input-synchronizer' },
      { id: 'text-sync', source: 'text-input', target: 'input-synchronizer' },
      { id: 'gesture-sync', source: 'gesture-input', target: 'input-synchronizer' },
      { id: 'haptic-sync', source: 'haptic-input', target: 'input-synchronizer' },

      { id: 'sync-to-fusion', source: 'input-synchronizer', target: 'modal-fusion' },
      { id: 'fusion-to-context', source: 'modal-fusion', target: 'context-interpreter' },
      { id: 'fusion-to-semantic', source: 'modal-fusion', target: 'semantic-analyzer' },

      { id: 'context-to-coordinator', source: 'context-interpreter', target: 'response-coordinator' },
      { id: 'semantic-to-coordinator', source: 'semantic-analyzer', target: 'response-coordinator' },

      { id: 'coord-to-voice', source: 'response-coordinator', target: 'voice-output' },
      { id: 'coord-to-visual', source: 'response-coordinator', target: 'visual-output' },
      { id: 'coord-to-haptic', source: 'response-coordinator', target: 'haptic-output' },

      { id: 'voice-feedback', source: 'voice-output', target: 'feedback-collector' },
      { id: 'visual-feedback', source: 'visual-output', target: 'feedback-collector' },
      { id: 'feedback-to-preference', source: 'feedback-collector', target: 'preference-updater' },
      { id: 'preference-to-fusion', source: 'preference-updater', target: 'modal-fusion' }
    ],
    'contextual-adaptive-interface': [
      { id: 'env-to-analyzer', source: 'environmental-sensors', target: 'context-analyzer' },
      { id: 'behavior-to-analyzer', source: 'user-behavior', target: 'context-analyzer' },
      { id: 'device-to-analyzer', source: 'device-context', target: 'context-analyzer' },
      { id: 'behavior-to-learner', source: 'user-behavior', target: 'preference-learner' },

      { id: 'analyzer-to-planner', source: 'context-analyzer', target: 'adaptation-planner' },
      { id: 'analyzer-to-rules', source: 'context-analyzer', target: 'rule-engine' },
      { id: 'learner-to-predictor', source: 'preference-learner', target: 'ml-predictor' },

      { id: 'planner-to-engine', source: 'adaptation-planner', target: 'adaptation-engine' },
      { id: 'rules-to-engine', source: 'rule-engine', target: 'adaptation-engine' },
      { id: 'predictor-to-engine', source: 'ml-predictor', target: 'adaptation-engine' },

      { id: 'engine-to-ui', source: 'adaptation-engine', target: 'dynamic-ui' },
      { id: 'ui-to-monitor', source: 'dynamic-ui', target: 'interaction-monitor' },
      { id: 'monitor-to-updater', source: 'interaction-monitor', target: 'model-updater' },
      { id: 'monitor-to-tracker', source: 'interaction-monitor', target: 'performance-tracker' },
      { id: 'updater-to-learner', source: 'model-updater', target: 'preference-learner' }
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
  initiation: '#3b82f6',
  dialogue: '#f59e0b',
  'task-execution': '#8b5cf6',
  completion: '#10b981',
  recovery: '#ef4444',
  active: '#06b6d4'
};

export const ConversationalInterfaceFlow: React.FC<ConversationalInterfaceFlowProps> = ({
  height = 600
}) => {
  const [selectedPattern, setSelectedPattern] = useState<ConversationalInterfacePattern>(advancedConversationalInterfacePatterns[0]);
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

  const updateVisualizationForStep = useCallback((step: ConversationalStep) => {
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
              <span className="text-3xl mr-3">💬</span>
              Advanced Conversational Interface Patterns
            </h2>
            <p className="text-gray-400 text-sm">Advanced conversational UI/UX patterns that move beyond traditional chatbots to agent-driven, multimodal experiences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interface Pattern</label>
            <select
              value={selectedPattern.id}
              onChange={(e) => {
                const pattern = advancedConversationalInterfacePatterns.find(p => p.id === e.target.value);
                if (pattern) setSelectedPattern(pattern);
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {advancedConversationalInterfacePatterns.map((pattern) => (
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

              {/* Interface Components */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-300 mb-2">Core Components</h4>
                <div className="space-y-1">
                  {selectedPattern.interfaceComponents.slice(0, 3).map((component) => (
                    <div key={component.id} className="flex items-center text-xs bg-gray-700/50 px-2 py-1 rounded">
                      {getModalityIcon(component.modality)}
                      <span className="ml-1">{component.name}</span>
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
                    {currentStepData.patterns.slice(0, 3).map((pattern, index) => (
                      <span key={index} className="text-xs bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded">
                        {pattern}
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
              <h5 className="font-medium text-blue-400 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-1" />
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

            {/* Interface Elements */}
            <div className="mb-6">
              <h5 className="font-medium text-purple-400 mb-2">Interface Elements</h5>
              <div className="space-y-2">
                {Object.entries(currentScenario.interfaceElements).map(([elementId, usage]) => {
                  const component = selectedPattern.interfaceComponents.find(c => c.id === elementId);
                  return (
                    <div key={elementId} className="bg-slate-900 p-2 rounded-md">
                      <div className="flex items-center mb-1">
                        {component && getModalityIcon(component.modality)}
                        <span className="text-sm font-medium text-white ml-2">
                          {component?.name || elementId}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">{usage}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Design Patterns */}
            <div className="mb-6">
              <h5 className="font-medium text-orange-400 mb-2 flex items-center">
                <BarChart3 className="w-4 h-4 mr-1" />
                Design Patterns
              </h5>
              <div className="space-y-2">
                {selectedPattern.designPatterns.slice(0, 3).map((pattern, index) => (
                  <div key={index} className="bg-slate-900 p-2 rounded-md">
                    <h6 className="text-sm font-medium text-white mb-1">{pattern.name}</h6>
                    <p className="text-xs text-gray-300 mb-1">{pattern.description}</p>
                    <div className="text-xs text-gray-400">
                      Benefits: {pattern.benefits.slice(0, 2).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Techniques */}
            <div className="mb-6">
              <h5 className="font-medium text-green-400 mb-2">Key Techniques</h5>
              <div className="flex flex-wrap gap-1">
                {selectedPattern.keyTechniques.map((technique, index) => (
                  <span key={index} className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">
                    {technique}
                  </span>
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

export default ConversationalInterfaceFlow;