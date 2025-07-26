'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, FileText, Image, Volume2, Brain, Zap, Eye, Layers, Target, Lightbulb, MessageSquare, Clock, ArrowRight } from 'lucide-react';

interface ModalityInput {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video';
  content: string;
  confidence: number;
  features: string[];
  status: 'idle' | 'processing' | 'analyzed' | 'aligned' | 'fused';
  icon: React.ComponentType<any>;
}

interface ProcessingStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  duration: number;
  outputs: string[];
}

interface AttentionWeight {
  modality: string;
  weight: number;
  reasoning: string;
}

interface CrossModalInsight {
  id: string;
  description: string;
  confidence: number;
  contributingModalities: string[];
  type: 'correlation' | 'contradiction' | 'enhancement' | 'context';
}

const modalityInputs: ModalityInput[] = [
  {
    id: 'text-input',
    type: 'text',
    content: 'A user asking about a red sports car in a parking lot with engine noise',
    confidence: 95,
    features: ['automotive', 'color:red', 'location:parking', 'vehicle:sports-car'],
    status: 'idle',
    icon: FileText
  },
  {
    id: 'image-input',
    type: 'image',
    content: 'Image showing a red Ferrari in an outdoor parking area with people nearby',
    confidence: 89,
    features: ['vehicle:ferrari', 'color:red', 'setting:outdoor', 'people:present', 'brand:ferrari'],
    status: 'idle',
    icon: Image
  },
  {
    id: 'audio-input',
    type: 'audio',
    content: 'Audio containing V8 engine sound, ambient parking lot noise, and distant conversation',
    confidence: 82,
    features: ['engine:v8', 'ambient:parking', 'conversation:distant', 'acoustics:outdoor'],
    status: 'idle',
    icon: Volume2
  }
];

const processingStages: ProcessingStage[] = [
  {
    id: 'analysis',
    name: 'Multimodal Analysis',
    description: 'Extract features and semantic meaning from each input modality',
    status: 'pending',
    duration: 2000,
    outputs: ['Text features extracted', 'Visual objects detected', 'Audio patterns identified']
  },
  {
    id: 'alignment',
    name: 'Cross-Modal Alignment',
    description: 'Align semantic concepts across modalities in shared embedding space',
    status: 'pending',
    duration: 1800,
    outputs: ['Semantic alignment completed', 'Concept mapping established', 'Cross-references identified']
  },
  {
    id: 'fusion',
    name: 'Context Fusion',
    description: 'Integrate aligned features into unified contextual representation',
    status: 'pending',
    duration: 1500,
    outputs: ['Unified context vector created', 'Multimodal relationships mapped', 'Contextual coherence verified']
  },
  {
    id: 'attention',
    name: 'Attention Weighting',
    description: 'Dynamically weight importance of each modality for current context',
    status: 'pending',
    duration: 1200,
    outputs: ['Attention weights calculated', 'Modality importance ranked', 'Task-specific focus applied']
  },
  {
    id: 'reasoning',
    name: 'Cross-Modal Reasoning',
    description: 'Generate insights by reasoning across multiple modalities simultaneously',
    status: 'pending',
    duration: 2200,
    outputs: ['Cross-modal inferences generated', 'Multimodal insights derived', 'Reasoning chains established']
  },
  {
    id: 'synthesis',
    name: 'Response Synthesis',
    description: 'Create coherent multimodal response incorporating all insights',
    status: 'pending',
    duration: 1600,
    outputs: ['Response structure defined', 'Multimodal elements integrated', 'Output format optimized']
  }
];

export const MultimodalContextIntegrationDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [modalities, setModalities] = useState<ModalityInput[]>(modalityInputs);
  const [stages, setStages] = useState<ProcessingStage[]>(processingStages);
  const [attentionWeights, setAttentionWeights] = useState<AttentionWeight[]>([]);
  const [crossModalInsights, setCrossModalInsights] = useState<CrossModalInsight[]>([]);
  const [processingLog, setProcessingLog] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [contextVector, setContextVector] = useState({
    size: 0,
    coherence: 0,
    richness: 0
  });

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setCurrentStageIndex(0);
    setModalities(modalityInputs);
    setStages(processingStages);
    setAttentionWeights([]);
    setCrossModalInsights([]);
    setProcessingLog([]);
    setOverallProgress(0);
    setContextVector({ size: 0, coherence: 0, richness: 0 });
  }, []);

  const updateModalityStatus = (modalityId: string, status: ModalityInput['status']) => {
    setModalities(prev => prev.map(m => 
      m.id === modalityId ? { ...m, status } : m
    ));
  };

  const updateStageStatus = (stageIndex: number, status: ProcessingStage['status']) => {
    setStages(prev => prev.map((stage, index) => 
      index === stageIndex ? { ...stage, status } : stage
    ));
  };

  const addLogEntry = (message: string) => {
    setProcessingLog(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const runProcessingSimulation = useCallback(async () => {
    if (!isRunning || currentStageIndex >= stages.length) return;

    const currentStage = stages[currentStageIndex];
    updateStageStatus(currentStageIndex, 'active');
    addLogEntry(`Starting: ${currentStage.name}`);

    switch (currentStageIndex) {
      case 0: // Analysis
        addLogEntry('Analyzing input modalities...');
        modalities.forEach((modality, index) => {
          setTimeout(() => {
            updateModalityStatus(modality.id, 'processing');
            addLogEntry(`Processing ${modality.type} input: ${modality.confidence}% confidence`);
            setTimeout(() => {
              updateModalityStatus(modality.id, 'analyzed');
            }, 500);
          }, index * 400);
        });
        break;

      case 1: // Alignment
        addLogEntry('Aligning semantic concepts across modalities...');
        modalities.forEach(modality => {
          updateModalityStatus(modality.id, 'aligned');
        });
        addLogEntry('Cross-modal semantic alignment completed');
        break;

      case 2: // Fusion
        addLogEntry('Fusing multimodal features into unified context...');
        modalities.forEach(modality => {
          updateModalityStatus(modality.id, 'fused');
        });
        setContextVector({
          size: 2048,
          coherence: 94,
          richness: 87
        });
        addLogEntry('Unified context vector created (2048 dimensions)');
        break;

      case 3: // Attention
        addLogEntry('Calculating dynamic attention weights...');
        setAttentionWeights([
          { modality: 'Visual', weight: 0.45, reasoning: 'Primary vehicle identification source' },
          { modality: 'Text', weight: 0.35, reasoning: 'Context and intent clarification' },
          { modality: 'Audio', weight: 0.20, reasoning: 'Supporting environmental context' }
        ]);
        addLogEntry('Attention weights computed based on task requirements');
        break;

      case 4: // Reasoning
        addLogEntry('Generating cross-modal insights...');
        setCrossModalInsights([
          {
            id: 'vehicle-confirmation',
            description: 'Visual and textual inputs confirm red sports car identification',
            confidence: 92,
            contributingModalities: ['text', 'image'],
            type: 'correlation'
          },
          {
            id: 'engine-audio-match',
            description: 'Audio signature matches high-performance vehicle characteristics',
            confidence: 85,
            contributingModalities: ['audio', 'image'],
            type: 'enhancement'
          },
          {
            id: 'location-context',
            description: 'Parking environment consistent across all modalities',
            confidence: 88,
            contributingModalities: ['text', 'image', 'audio'],
            type: 'context'
          }
        ]);
        addLogEntry('Cross-modal reasoning generated 3 key insights');
        break;

      case 5: // Synthesis
        addLogEntry('Synthesizing multimodal response...');
        addLogEntry('Integrating visual, textual, and auditory elements');
        addLogEntry('Response coherence optimized for multimodal delivery');
        break;
    }

    await new Promise(resolve => setTimeout(resolve, currentStage.duration));

    updateStageStatus(currentStageIndex, 'completed');
    addLogEntry(`Completed: ${currentStage.name}`);
    
    const newProgress = ((currentStageIndex + 1) / stages.length) * 100;
    setOverallProgress(newProgress);

    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    } else {
      setIsRunning(false);
      addLogEntry('Multimodal context integration completed successfully');
    }
  }, [isRunning, currentStageIndex, stages, modalities]);

  useEffect(() => {
    if (isRunning) {
      runProcessingSimulation();
    }
  }, [isRunning, runProcessingSimulation]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStageIndex(0);
  };

  const pauseDemo = () => {
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Multimodal Context Integration</h2>
          <p className="text-gray-400">Seamless integration and processing of text, visual, and audio inputs</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            disabled={!isRunning && currentStageIndex >= stages.length}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Processing Progress</span>
          <span className="text-sm text-gray-400">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Modalities */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Input Modalities
            </h3>
            
            <div className="space-y-3">
              {modalities.map((modality) => (
                <div
                  key={modality.id}
                  className={`p-3 rounded-lg border transition-all ${
                    modality.status === 'idle'
                      ? 'border-gray-600 bg-gray-700/30'
                      : modality.status === 'processing'
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : modality.status === 'analyzed'
                      ? 'border-blue-500 bg-blue-500/10'
                      : modality.status === 'aligned'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-green-500 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <modality.icon className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm capitalize">{modality.type} Input</div>
                      <div className="text-xs text-gray-400">Confidence: {modality.confidence}%</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      modality.status === 'idle'
                        ? 'bg-gray-600 text-gray-300'
                        : modality.status === 'processing'
                        ? 'bg-yellow-600 text-yellow-100'
                        : modality.status === 'analyzed'
                        ? 'bg-blue-600 text-blue-100'
                        : modality.status === 'aligned'
                        ? 'bg-purple-600 text-purple-100'
                        : 'bg-green-600 text-green-100'
                    }`}>
                      {modality.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-gray-300 mb-2">{modality.content}</div>
                  
                  <div className="flex flex-wrap gap-1">
                    {modality.features.slice(0, 3).map(feature => (
                      <span key={feature} className="text-xs px-1 py-0.5 bg-gray-700 rounded text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context Vector */}
          {contextVector.size > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Unified Context
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vector Size:</span>
                  <span className="font-medium text-purple-400">{contextVector.size} dimensions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Coherence:</span>
                  <span className="font-medium text-blue-400">{contextVector.coherence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Richness:</span>
                  <span className="font-medium text-green-400">{contextVector.richness}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Pipeline */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Processing Pipeline
            </h3>
            
            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className={`p-3 rounded-lg border transition-all ${
                    stage.status === 'pending'
                      ? 'border-gray-600 bg-gray-700/30'
                      : stage.status === 'active'
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-green-500 bg-green-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{stage.name}</div>
                      <div className="text-xs text-gray-400">{stage.description}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      stage.status === 'pending'
                        ? 'bg-gray-600 text-gray-300'
                        : stage.status === 'active'
                        ? 'bg-yellow-600 text-yellow-100'
                        : 'bg-green-600 text-green-100'
                    }`}>
                      {stage.status.toUpperCase()}
                    </span>
                  </div>

                  {stage.status !== 'pending' && (
                    <div className="space-y-1">
                      {stage.outputs.map((output, idx) => (
                        <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          {output}
                        </div>
                      ))}
                    </div>
                  )}

                  {stage.status === 'active' && (
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-yellow-400 animate-pulse" />
                      <div className="text-xs text-yellow-400">Processing...</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Processing Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-400" />
              Processing Log
            </h3>
            
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
              {processingLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {processingLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for processing to start...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insights & Results */}
        <div className="space-y-6">
          {/* Attention Weights */}
          {attentionWeights.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Attention Weights
              </h3>
              
              <div className="space-y-3">
                {attentionWeights.map((weight, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{weight.modality}</span>
                      <span className="text-sm text-cyan-400">{Math.round(weight.weight * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${weight.weight * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400">{weight.reasoning}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cross-Modal Insights */}
          {crossModalInsights.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Cross-Modal Insights
              </h3>
              
              <div className="space-y-3">
                {crossModalInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-3 rounded-lg border ${
                      insight.type === 'correlation'
                        ? 'border-blue-500/30 bg-blue-500/5'
                        : insight.type === 'enhancement'
                        ? 'border-green-500/30 bg-green-500/5'
                        : insight.type === 'contradiction'
                        ? 'border-red-500/30 bg-red-500/5'
                        : 'border-purple-500/30 bg-purple-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        insight.type === 'correlation'
                          ? 'bg-blue-600 text-blue-100'
                          : insight.type === 'enhancement'
                          ? 'bg-green-600 text-green-100'
                          : insight.type === 'contradiction'
                          ? 'bg-red-600 text-red-100'
                          : 'bg-purple-600 text-purple-100'
                      }`}>
                        {insight.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{insight.confidence}% confidence</span>
                    </div>
                    
                    <div className="text-sm text-gray-300 mb-2">{insight.description}</div>
                    
                    <div className="flex flex-wrap gap-1">
                      {insight.contributingModalities.map(modality => (
                        <span key={modality} className="text-xs px-1 py-0.5 bg-gray-700 rounded text-gray-300">
                          {modality}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Output Preview */}
          {currentStageIndex >= stages.length - 1 && !isRunning && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                Multimodal Response
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-700/30 rounded border-l-4 border-blue-500">
                  <div className="font-medium text-blue-400 mb-1">Text Response</div>
                  <div className="text-gray-300">I can see a red Ferrari sports car parked in an outdoor lot. The V8 engine sound in the audio confirms it's a high-performance vehicle.</div>
                </div>
                
                <div className="p-3 bg-gray-700/30 rounded border-l-4 border-green-500">
                  <div className="font-medium text-green-400 mb-1">Visual Enhancement</div>
                  <div className="text-gray-300">Object detection highlights: Vehicle make/model, color verification, parking environment context</div>
                </div>
                
                <div className="p-3 bg-gray-700/30 rounded border-l-4 border-purple-500">
                  <div className="font-medium text-purple-400 mb-1">Audio Context</div>
                  <div className="text-gray-300">Engine audio analysis confirms high-performance characteristics matching visual identification</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultimodalContextIntegrationDemo;