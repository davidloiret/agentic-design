'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, CheckCircle, Clock, AlertCircle, Loader, Package, Filter, Zap, Shield, Send, FileText, Database, Globe, Lock } from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  processingTime: number;
  validator?: (input: any) => boolean;
  transformer: (input: any) => any;
}

interface PipelineData {
  id: string;
  stage: string;
  input: any;
  output: any;
  status: 'pending' | 'processing' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
  error?: string;
}

interface PipelineMetrics {
  totalProcessed: number;
  averageLatency: number;
  successRate: number;
  throughput: number;
  bottleneck?: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'ingestion',
    name: 'Data Ingestion',
    icon: <Database className="w-4 h-4" />,
    color: 'text-blue-400',
    description: 'Collect and validate raw input data',
    processingTime: 800,
    validator: (input) => input && typeof input === 'object',
    transformer: (input) => ({
      ...input,
      timestamp: Date.now(),
      source: 'user-input',
      validated: true
    })
  },
  {
    id: 'preprocessing',
    name: 'Preprocessing',
    icon: <Filter className="w-4 h-4" />,
    color: 'text-purple-400',
    description: 'Clean and normalize data format',
    processingTime: 1200,
    transformer: (input) => ({
      ...input,
      normalized: true,
      cleaned: true,
      tokens: input.text ? input.text.split(' ').length : 0,
      language: 'en'
    })
  },
  {
    id: 'analysis',
    name: 'Analysis',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-yellow-400',
    description: 'Extract insights and patterns',
    processingTime: 1500,
    transformer: (input) => ({
      ...input,
      sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
      confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
      keywords: ['pipeline', 'processing', 'agents'],
      entities: ['user', 'system', 'data']
    })
  },
  {
    id: 'enrichment',
    name: 'Enrichment',
    icon: <Globe className="w-4 h-4" />,
    color: 'text-green-400',
    description: 'Add contextual information',
    processingTime: 1000,
    transformer: (input) => ({
      ...input,
      context: {
        domain: 'technology',
        category: 'ai-systems',
        relevance: 0.85
      },
      metadata: {
        version: '1.0',
        pipeline: 'sequential',
        enhanced: true
      }
    })
  },
  {
    id: 'validation',
    name: 'Validation',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-red-400',
    description: 'Verify output quality and safety',
    processingTime: 600,
    validator: (input) => input.confidence > 0.6,
    transformer: (input) => ({
      ...input,
      validated: true,
      qualityScore: 0.92,
      safetyCheck: 'passed',
      compliance: ['GDPR', 'CCPA']
    })
  },
  {
    id: 'output',
    name: 'Output Formatting',
    icon: <Send className="w-4 h-4" />,
    color: 'text-cyan-400',
    description: 'Format and deliver final result',
    processingTime: 400,
    transformer: (input) => ({
      result: {
        summary: 'Processing completed successfully',
        data: input,
        format: 'json',
        ready: true
      },
      timestamp: Date.now(),
      status: 'delivered'
    })
  }
];

const SAMPLE_INPUTS = [
  {
    id: 'text-analysis',
    name: 'Text Analysis',
    data: {
      text: 'Analyze this customer feedback for sentiment and key topics',
      type: 'feedback',
      priority: 'high'
    }
  },
  {
    id: 'document-processing',
    name: 'Document Processing',
    data: {
      document: 'contract.pdf',
      pages: 12,
      type: 'legal',
      action: 'extract-entities'
    }
  },
  {
    id: 'image-pipeline',
    name: 'Image Recognition',
    data: {
      image: 'product.jpg',
      resolution: '1920x1080',
      type: 'product-photo',
      task: 'classify'
    }
  },
  {
    id: 'data-transformation',
    name: 'Data Transformation',
    data: {
      dataset: 'sales_q4.csv',
      rows: 10000,
      columns: 25,
      operation: 'aggregate'
    }
  }
];

export default function SequentialPipelineDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedInputIndex, setSelectedInputIndex] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [pipelineData, setPipelineData] = useState<PipelineData[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics>({
    totalProcessed: 0,
    averageLatency: 0,
    successRate: 100,
    throughput: 0,
    bottleneck: undefined
  });
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [currentData, setCurrentData] = useState<any>(null);
  const [stageStatuses, setStageStatuses] = useState<Record<string, 'idle' | 'processing' | 'completed' | 'error'>>({});

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const processStage = useCallback(async (stage: PipelineStage, inputData: any, stageIndex: number) => {
    const stageData: PipelineData = {
      id: `pipeline-${Date.now()}-${stage.id}`,
      stage: stage.id,
      input: inputData,
      output: null,
      status: 'processing',
      startTime: Date.now()
    };

    // Update stage status
    setStageStatuses(prev => ({ ...prev, [stage.id]: 'processing' }));
    setPipelineData(prev => [...prev, { ...stageData }]);

    addLog('process', `${stage.name} started processing`);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, stage.processingTime / speed));

    // Validate if validator exists
    if (stage.validator && !stage.validator(inputData)) {
      stageData.status = 'error';
      stageData.error = 'Validation failed';
      stageData.endTime = Date.now();

      setStageStatuses(prev => ({ ...prev, [stage.id]: 'error' }));
      setPipelineData(prev => prev.map(d =>
        d.id === stageData.id ? { ...stageData } : d
      ));

      addLog('error', `${stage.name} validation failed`);
      throw new Error(`${stage.name} validation failed`);
    }

    // Transform data
    const outputData = stage.transformer(inputData);

    stageData.output = outputData;
    stageData.status = 'completed';
    stageData.endTime = Date.now();

    setStageStatuses(prev => ({ ...prev, [stage.id]: 'completed' }));
    setPipelineData(prev => prev.map(d =>
      d.id === stageData.id ? { ...stageData } : d
    ));

    addLog('success', `${stage.name} completed in ${stageData.endTime - stageData.startTime}ms`);

    return outputData;
  }, [speed, addLog]);

  const runPipeline = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    const input = SAMPLE_INPUTS[selectedInputIndex];

    // Reset state
    setPipelineData([]);
    setCurrentStageIndex(-1);
    setStageStatuses({});
    setLogs([]);
    setCurrentData(input.data);

    addLog('start', `🚀 Starting pipeline: ${input.name}`);
    addLog('info', `Input: ${JSON.stringify(input.data).substring(0, 100)}...`);

    let data = input.data;
    const startTime = Date.now();
    let stageTimes: Record<string, number> = {};

    try {
      for (let i = 0; i < PIPELINE_STAGES.length; i++) {
        setCurrentStageIndex(i);
        const stage = PIPELINE_STAGES[i];

        const stageStart = Date.now();
        data = await processStage(stage, data, i);
        const stageEnd = Date.now();

        stageTimes[stage.id] = stageEnd - stageStart;
        setCurrentData(data);

        // Add slight delay between stages
        if (i < PIPELINE_STAGES.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200 / speed));
        }
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Find bottleneck (slowest stage)
      const bottleneck = Object.entries(stageTimes).reduce((a, b) =>
        stageTimes[a[0]] > stageTimes[b[0]] ? a : b
      )[0];

      // Update metrics
      setMetrics(prev => ({
        totalProcessed: prev.totalProcessed + 1,
        averageLatency: totalTime,
        successRate: ((prev.totalProcessed * prev.successRate / 100 + 1) / (prev.totalProcessed + 1)) * 100,
        throughput: 1000 / totalTime,
        bottleneck: PIPELINE_STAGES.find(s => s.id === bottleneck)?.name
      }));

      addLog('complete', `✅ Pipeline completed successfully in ${totalTime}ms`);
      addLog('result', `Output: ${JSON.stringify(data).substring(0, 150)}...`);

    } catch (error) {
      addLog('error', `❌ Pipeline failed: ${error}`);

      setMetrics(prev => ({
        ...prev,
        totalProcessed: prev.totalProcessed + 1,
        successRate: (prev.totalProcessed * prev.successRate / 100) / (prev.totalProcessed + 1) * 100
      }));
    }

    setCurrentStageIndex(-1);
    setIsRunning(false);
  }, [isRunning, selectedInputIndex, speed, processStage, addLog]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentStageIndex(-1);
    setPipelineData([]);
    setStageStatuses({});
    setLogs([]);
    setCurrentData(null);
    setMetrics({
      totalProcessed: 0,
      averageLatency: 0,
      successRate: 100,
      throughput: 0,
      bottleneck: undefined
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            Sequential Pipeline Agents Demo
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Watch specialized agents process data through a linear pipeline
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedInputIndex}
            onChange={(e) => setSelectedInputIndex(Number(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white"
            disabled={isRunning}
          >
            {SAMPLE_INPUTS.map((input, idx) => (
              <option key={idx} value={idx}>{input.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Speed:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-400 w-12">{speed}x</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runPipeline}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Pipeline
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-sm font-semibold text-white mb-4">Pipeline Stages</h4>

        <div className="flex items-center justify-between relative">
          {/* Connection line */}
          <div className="absolute top-8 left-12 right-12 h-0.5 bg-gray-700" />

          {PIPELINE_STAGES.map((stage, idx) => (
            <div key={stage.id} className="relative flex flex-col items-center">
              {/* Stage node */}
              <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                currentStageIndex === idx ? 'bg-purple-900 ring-4 ring-purple-500 animate-pulse' :
                stageStatuses[stage.id] === 'completed' ? 'bg-green-900' :
                stageStatuses[stage.id] === 'error' ? 'bg-red-900' :
                stageStatuses[stage.id] === 'processing' ? 'bg-yellow-900' :
                'bg-gray-800'
              }`}>
                <span className={`${stage.color}`}>
                  {stageStatuses[stage.id] === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : stageStatuses[stage.id] === 'error' ? (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  ) : stageStatuses[stage.id] === 'processing' ? (
                    <Loader className="w-6 h-6 text-yellow-400 animate-spin" />
                  ) : (
                    stage.icon
                  )}
                </span>
              </div>

              {/* Stage info */}
              <div className="mt-3 text-center">
                <div className="text-xs font-semibold text-white">{stage.name}</div>
                <div className="text-xs text-gray-500 mt-1 max-w-[100px]">
                  {stage.description}
                </div>
              </div>

              {/* Stage number */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-300">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Data flow indicator */}
        {currentStageIndex >= 0 && (
          <div className="mt-6 p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Current Data:</div>
            <pre className="text-xs text-gray-300 overflow-x-auto max-h-24 overflow-y-auto">
              {JSON.stringify(currentData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Processed</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.totalProcessed}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Avg Latency</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.averageLatency > 0 ? `${Math.round(metrics.averageLatency)}ms` : '-'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.successRate.toFixed(1)}%</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Throughput</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.throughput > 0 ? `${metrics.throughput.toFixed(2)}/s` : '-'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-gray-400">Bottleneck</span>
          </div>
          <div className="text-sm font-bold text-white truncate">
            {metrics.bottleneck || 'None'}
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-64 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">Pipeline Logs</h4>
        </div>

        <div className="space-y-1 font-mono text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-gray-600">{log.timestamp}</span>
              <span className={`font-semibold ${
                log.type === 'start' ? 'text-blue-400' :
                log.type === 'process' ? 'text-purple-400' :
                log.type === 'success' ? 'text-green-400' :
                log.type === 'error' ? 'text-red-400' :
                log.type === 'complete' ? 'text-cyan-400' :
                log.type === 'result' ? 'text-yellow-400' :
                'text-gray-400'
              }`}>
                [{log.type.toUpperCase()}]
              </span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}