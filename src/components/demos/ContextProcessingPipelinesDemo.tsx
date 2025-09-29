'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Activity, CheckCircle, AlertTriangle, XCircle, FileText, Image, Music, Video, Database, Zap } from 'lucide-react';

type Phase = 'idle' | 'ingestion' | 'validation' | 'transform' | 'integration' | 'output' | 'complete';
type DataType = 'text' | 'image' | 'audio' | 'video' | 'structured';
type StageStatus = 'pending' | 'processing' | 'passed' | 'warning' | 'failed';

interface Context {
  id: string;
  name: string;
  type: DataType;
  source: string;
  status: StageStatus;
  ingestionStatus: StageStatus;
  validationStatus: StageStatus;
  transformStatus: StageStatus;
  integrationStatus: StageStatus;
  qualityScore?: number;
  issues?: string[];
}

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  processed: number;
  total: number;
}

interface QualityMetrics {
  overallQuality: number;
  dataIntegrity: number;
  crossModalAccuracy: number;
  errorRate: number;
}

const initialContexts: Context[] = [
  { id: 'c1', name: 'Research_Paper.pdf', type: 'text', source: 'Document', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c2', name: 'Product_Image.jpg', type: 'image', source: 'Media', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c3', name: 'Interview_Audio.mp3', type: 'audio', source: 'Media', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c4', name: 'Tutorial_Video.mp4', type: 'video', source: 'Media', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c5', name: 'Customer_Data.json', type: 'structured', source: 'Database', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c6', name: 'Sales_Report.csv', type: 'structured', source: 'Database', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c7', name: 'Meeting_Notes.txt', type: 'text', source: 'Document', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' },
  { id: 'c8', name: 'Diagram_Chart.png', type: 'image', source: 'Media', status: 'pending', ingestionStatus: 'pending', validationStatus: 'pending', transformStatus: 'pending', integrationStatus: 'pending' }
];

export default function ContextProcessingPipelinesDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentContext, setCurrentContext] = useState<Context | null>(null);
  const [currentStage, setCurrentStage] = useState<string>('');

  const [contexts, setContexts] = useState<Context[]>(initialContexts);

  const [stages, setStages] = useState<PipelineStage[]>([
    { id: 'ingestion', name: 'Ingestion', description: 'Multi-modal input processing', status: 'pending', processed: 0, total: 8 },
    { id: 'validation', name: 'Validation', description: 'Quality assessment & checking', status: 'pending', processed: 0, total: 8 },
    { id: 'transform', name: 'Transform', description: 'Normalization & standardization', status: 'pending', processed: 0, total: 8 },
    { id: 'integration', name: 'Integration', description: 'Cross-modal fusion', status: 'pending', processed: 0, total: 8 },
    { id: 'output', name: 'Output', description: 'Structured delivery', status: 'pending', processed: 0, total: 8 }
  ]);

  const [metrics, setMetrics] = useState<QualityMetrics>({
    overallQuality: 0,
    dataIntegrity: 0,
    crossModalAccuracy: 0,
    errorRate: 0
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Ingestion Phase
    if (phase === 'ingestion') {
      setStages(prev => prev.map(s => s.id === 'ingestion' ? { ...s, status: 'active' } : s));
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          setStages(prev => prev.map(s => s.id === 'ingestion' ? { ...s, status: 'completed' } : s));
          timeouts.push(setTimeout(() => setPhase('validation'), 200));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext({ ...context, status: 'processing' });
        setCurrentStage('ingestion');

        timeouts.push(setTimeout(() => {
          setContexts(prev => prev.map(c =>
            c.id === context.id ? { ...c, ingestionStatus: 'passed', status: 'passed' } : c
          ));
          setStages(prev => prev.map(s =>
            s.id === 'ingestion' ? { ...s, processed: s.processed + 1 } : s
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 80));
        }, 100));
      };

      processNext();
    }

    // Validation Phase
    if (phase === 'validation') {
      setStages(prev => prev.map(s => s.id === 'validation' ? { ...s, status: 'active' } : s));
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          setStages(prev => prev.map(s => s.id === 'validation' ? { ...s, status: 'completed' } : s));
          timeouts.push(setTimeout(() => setPhase('transform'), 200));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext({ ...context, status: 'processing' });
        setCurrentStage('validation');

        timeouts.push(setTimeout(() => {
          // Most pass validation, but 10-15% may have warnings
          const qualityScore = 75 + Math.random() * 25;
          const hasWarning = qualityScore < 85;
          const validationStatus: StageStatus = hasWarning ? 'warning' : 'passed';
          const issues = hasWarning ? ['Minor formatting inconsistency'] : undefined;

          setContexts(prev => prev.map(c =>
            c.id === context.id ? { ...c, validationStatus, qualityScore, issues } : c
          ));
          setStages(prev => prev.map(s =>
            s.id === 'validation' ? { ...s, processed: s.processed + 1 } : s
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 100));
        }, 120));
      };

      processNext();
    }

    // Transform Phase
    if (phase === 'transform') {
      setStages(prev => prev.map(s => s.id === 'transform' ? { ...s, status: 'active' } : s));
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          setStages(prev => prev.map(s => s.id === 'transform' ? { ...s, status: 'completed' } : s));
          timeouts.push(setTimeout(() => setPhase('integration'), 200));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext({ ...context, status: 'processing' });
        setCurrentStage('transform');

        timeouts.push(setTimeout(() => {
          // Transform almost always succeeds
          setContexts(prev => prev.map(c =>
            c.id === context.id ? { ...c, transformStatus: 'passed' } : c
          ));
          setStages(prev => prev.map(s =>
            s.id === 'transform' ? { ...s, processed: s.processed + 1 } : s
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 90));
        }, 110));
      };

      processNext();
    }

    // Integration Phase
    if (phase === 'integration') {
      setStages(prev => prev.map(s => s.id === 'integration' ? { ...s, status: 'active' } : s));
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          setStages(prev => prev.map(s => s.id === 'integration' ? { ...s, status: 'completed' } : s));
          timeouts.push(setTimeout(() => setPhase('output'), 200));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext({ ...context, status: 'processing' });
        setCurrentStage('integration');

        timeouts.push(setTimeout(() => {
          // Integration usually succeeds
          setContexts(prev => prev.map(c =>
            c.id === context.id ? { ...c, integrationStatus: 'passed' } : c
          ));
          setStages(prev => prev.map(s =>
            s.id === 'integration' ? { ...s, processed: s.processed + 1 } : s
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 100));
        }, 120));
      };

      processNext();
    }

    // Output Phase
    if (phase === 'output') {
      setStages(prev => prev.map(s => s.id === 'output' ? { ...s, status: 'active' } : s));

      timeouts.push(setTimeout(() => {
        setStages(prev => prev.map(s => s.id === 'output' ? { ...s, status: 'completed', processed: 8 } : s));

        // Calculate final metrics
        const avgQuality = contexts.reduce((sum, c) => sum + (c.qualityScore || 90), 0) / contexts.length;
        const warningCount = contexts.filter(c => c.validationStatus === 'warning').length;
        const errorRate = (warningCount / contexts.length) * 100;

        setMetrics({
          overallQuality: avgQuality,
          dataIntegrity: 98 + Math.random() * 2,
          crossModalAccuracy: 95 + Math.random() * 4,
          errorRate
        });

        timeouts.push(setTimeout(() => {
          setPhase('complete');
          setIsRunning(false);
        }, 600));
      }, 800));
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('ingestion');
    setCurrentContext(null);
    setCurrentStage('');

    setContexts(initialContexts);

    setStages([
      { id: 'ingestion', name: 'Ingestion', description: 'Multi-modal input processing', status: 'pending', processed: 0, total: 8 },
      { id: 'validation', name: 'Validation', description: 'Quality assessment & checking', status: 'pending', processed: 0, total: 8 },
      { id: 'transform', name: 'Transform', description: 'Normalization & standardization', status: 'pending', processed: 0, total: 8 },
      { id: 'integration', name: 'Integration', description: 'Cross-modal fusion', status: 'pending', processed: 0, total: 8 },
      { id: 'output', name: 'Output', description: 'Structured delivery', status: 'pending', processed: 0, total: 8 }
    ]);

    setMetrics({
      overallQuality: 0,
      dataIntegrity: 0,
      crossModalAccuracy: 0,
      errorRate: 0
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentContext(null);
    setCurrentStage('');

    setContexts(initialContexts);

    setStages([
      { id: 'ingestion', name: 'Ingestion', description: 'Multi-modal input processing', status: 'pending', processed: 0, total: 8 },
      { id: 'validation', name: 'Validation', description: 'Quality assessment & checking', status: 'pending', processed: 0, total: 8 },
      { id: 'transform', name: 'Transform', description: 'Normalization & standardization', status: 'pending', processed: 0, total: 8 },
      { id: 'integration', name: 'Integration', description: 'Cross-modal fusion', status: 'pending', processed: 0, total: 8 },
      { id: 'output', name: 'Output', description: 'Structured delivery', status: 'pending', processed: 0, total: 8 }
    ]);

    setMetrics({
      overallQuality: 0,
      dataIntegrity: 0,
      crossModalAccuracy: 0,
      errorRate: 0
    });
  };

  const getTypeIcon = (type: DataType) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'structured': return <Database className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: StageStatus) => {
    switch (status) {
      case 'processing': return <Activity className="w-3 h-3 text-blue-400 animate-spin" />;
      case 'passed': return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
      case 'failed': return <XCircle className="w-3 h-3 text-red-400" />;
      default: return null;
    }
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'ingestion': return 'Ingesting multi-modal data sources...';
      case 'validation': return 'Validating quality and consistency...';
      case 'transform': return 'Transforming and normalizing data...';
      case 'integration': return 'Integrating cross-modal contexts...';
      case 'output': return 'Delivering structured output...';
      case 'complete': return 'Pipeline Complete';
      default: return 'Ready to process';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Context Processing Pipelines</h3>
            <p className="text-sm text-gray-400">Multi-stage Transformation Workflows</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Start Pipeline
            </button>
          )}
          {(phase === 'complete' || isRunning) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Phase Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-indigo-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              stage.status === 'active' ? 'bg-indigo-500/10 border-indigo-500/50' :
              stage.status === 'completed' ? 'bg-green-500/10 border-green-500/50' :
              'bg-slate-800/50 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1 rounded ${
                stage.status === 'active' ? 'bg-indigo-500/20 text-indigo-400' :
                stage.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                'bg-slate-700 text-gray-400'
              }`}>
                <Zap className="w-3 h-3" />
              </div>
              <div className="text-xs font-semibold text-white">{stage.name}</div>
            </div>
            <div className="text-xs text-gray-400 mb-2">{stage.description}</div>
            <div className="text-xs font-medium text-white">
              {stage.processed}/{stage.total} processed
            </div>
          </div>
        ))}
      </div>

      {/* Current Context Display */}
      {currentContext && (
        <div className="mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon(currentContext.type)}
            <h4 className="font-semibold text-white">Processing Context</h4>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{currentContext.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                Type: {currentContext.type} • Source: {currentContext.source} • Stage: {currentStage}
              </div>
            </div>
            <Activity className="w-5 h-5 text-cyan-400 animate-spin" />
          </div>
        </div>
      )}

      {/* Contexts Table */}
      <div className="mb-6 bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-300 font-semibold">Context</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Type</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Ingest</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Validate</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Transform</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Integrate</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Quality</th>
              </tr>
            </thead>
            <tbody>
              {contexts.map((context) => (
                <tr
                  key={context.id}
                  className="border-t border-slate-700 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(context.type)}
                      <span className="text-white font-medium">{context.name}</span>
                    </div>
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className="text-gray-300 capitalize">{context.type}</span>
                  </td>
                  <td className="text-center px-3 py-2">
                    {getStatusIcon(context.ingestionStatus)}
                  </td>
                  <td className="text-center px-3 py-2">
                    {getStatusIcon(context.validationStatus)}
                  </td>
                  <td className="text-center px-3 py-2">
                    {getStatusIcon(context.transformStatus)}
                  </td>
                  <td className="text-center px-3 py-2">
                    {getStatusIcon(context.integrationStatus)}
                  </td>
                  <td className="text-center px-3 py-2">
                    {context.qualityScore ? (
                      <span className={`font-medium ${
                        context.qualityScore >= 90 ? 'text-green-400' :
                        context.qualityScore >= 80 ? 'text-yellow-400' :
                        'text-orange-400'
                      }`}>
                        {context.qualityScore.toFixed(0)}%
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quality Metrics */}
      {(phase === 'complete') && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30">
            <div className="text-xs text-gray-400 mb-1">Overall Quality</div>
            <div className="text-2xl font-bold text-green-400">{metrics.overallQuality.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Average score</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="text-xs text-gray-400 mb-1">Data Integrity</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.dataIntegrity.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">No corruption</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/30">
            <div className="text-xs text-gray-400 mb-1">Cross-Modal Accuracy</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.crossModalAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Integration success</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/30">
            <div className="text-xs text-gray-400 mb-1">Error Rate</div>
            <div className="text-2xl font-bold text-orange-400">{metrics.errorRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Warnings/failures</div>
          </div>
        </div>
      )}
    </div>
  );
}