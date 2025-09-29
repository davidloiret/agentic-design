'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Settings, Search, CheckCircle, Clock, Loader, AlertCircle, Zap } from 'lucide-react';

type AgentStatus = 'idle' | 'thinking' | 'processing' | 'searching' | 'analyzing' | 'completed' | 'error';
type PhaseType = 'idle' | 'document-processing' | 'data-analysis' | 'search-operation' | 'complete';

interface ActivityLog {
  id: string;
  timestamp: number;
  status: AgentStatus;
  activity: string;
  duration: number;
  details?: string;
}

interface AgentTask {
  id: string;
  name: string;
  status: AgentStatus;
  progress: number;
  currentActivity: string;
  estimatedTime: number;
  elapsedTime: number;
  activityLogs: ActivityLog[];
}

interface StatusMetrics {
  statusClarity: number;
  updateLatency: number;
  progressAccuracy: number;
  userInterruptions: number;
  errorRecovery: number;
  trustBuilding: number;
}

const AgentStatusActivityPatternsDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [metrics, setMetrics] = useState<StatusMetrics>({
    statusClarity: 0,
    updateLatency: 0,
    progressAccuracy: 0,
    userInterruptions: 0,
    errorRecovery: 0,
    trustBuilding: 0,
  });

  const initialTasks: AgentTask[] = [
    {
      id: 'task-1',
      name: 'Document Processing',
      status: 'idle',
      progress: 0,
      currentActivity: 'Waiting to start',
      estimatedTime: 12,
      elapsedTime: 0,
      activityLogs: [],
    },
    {
      id: 'task-2',
      name: 'Data Analysis',
      status: 'idle',
      progress: 0,
      currentActivity: 'Waiting to start',
      estimatedTime: 15,
      elapsedTime: 0,
      activityLogs: [],
    },
    {
      id: 'task-3',
      name: 'Search Operation',
      status: 'idle',
      progress: 0,
      currentActivity: 'Waiting to start',
      estimatedTime: 8,
      elapsedTime: 0,
      activityLogs: [],
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('document-processing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'document-processing') {
      setTasks(initialTasks);

      const stages = [
        { status: 'thinking' as AgentStatus, activity: 'Analyzing document structure', progress: 15, duration: 2 },
        { status: 'processing' as AgentStatus, activity: 'Parsing PDF content', progress: 40, duration: 3 },
        { status: 'analyzing' as AgentStatus, activity: 'Extracting key information', progress: 70, duration: 4 },
        { status: 'processing' as AgentStatus, activity: 'Generating summary', progress: 90, duration: 2 },
        { status: 'completed' as AgentStatus, activity: 'Document processed successfully', progress: 100, duration: 1 },
      ];

      let stageIndex = 0;
      let elapsedTime = 0;

      const processTask = () => {
        if (stageIndex < stages.length) {
          const stage = stages[stageIndex];

          const log: ActivityLog = {
            id: `log-1-${stageIndex}`,
            timestamp: Date.now(),
            status: stage.status,
            activity: stage.activity,
            duration: stage.duration,
          };

          setTasks(prev => prev.map(t =>
            t.id === 'task-1'
              ? {
                  ...t,
                  status: stage.status,
                  progress: stage.progress,
                  currentActivity: stage.activity,
                  elapsedTime: elapsedTime,
                  activityLogs: [...t.activityLogs, log],
                }
              : t
          ));

          elapsedTime += stage.duration;
          stageIndex++;

          if (stageIndex < stages.length) {
            setTimeout(processTask, stage.duration * 1000);
          } else {
            setTimeout(() => setPhase('data-analysis'), 500);
          }
        }
      };

      processTask();
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'data-analysis') {
      const stages = [
        { status: 'thinking' as AgentStatus, activity: 'Planning analysis strategy', progress: 10, duration: 1.5 },
        { status: 'processing' as AgentStatus, activity: 'Loading dataset (2.3GB)', progress: 30, duration: 3 },
        { status: 'analyzing' as AgentStatus, activity: 'Computing statistical models', progress: 60, duration: 5 },
        { status: 'processing' as AgentStatus, activity: 'Generating visualizations', progress: 85, duration: 3 },
        { status: 'completed' as AgentStatus, activity: 'Analysis complete', progress: 100, duration: 1 },
      ];

      let stageIndex = 0;
      let elapsedTime = 0;

      const processTask = () => {
        if (stageIndex < stages.length) {
          const stage = stages[stageIndex];

          const log: ActivityLog = {
            id: `log-2-${stageIndex}`,
            timestamp: Date.now(),
            status: stage.status,
            activity: stage.activity,
            duration: stage.duration,
          };

          setTasks(prev => prev.map(t =>
            t.id === 'task-2'
              ? {
                  ...t,
                  status: stage.status,
                  progress: stage.progress,
                  currentActivity: stage.activity,
                  elapsedTime: elapsedTime,
                  activityLogs: [...t.activityLogs, log],
                }
              : t
          ));

          elapsedTime += stage.duration;
          stageIndex++;

          if (stageIndex < stages.length) {
            setTimeout(processTask, stage.duration * 1000);
          } else {
            setTimeout(() => setPhase('search-operation'), 500);
          }
        }
      };

      processTask();
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'search-operation') {
      const stages = [
        { status: 'thinking' as AgentStatus, activity: 'Formulating search query', progress: 12, duration: 1 },
        { status: 'searching' as AgentStatus, activity: 'Querying 5 data sources', progress: 35, duration: 2 },
        { status: 'processing' as AgentStatus, activity: 'Filtering 10,247 results', progress: 60, duration: 2 },
        { status: 'analyzing' as AgentStatus, activity: 'Ranking by relevance', progress: 85, duration: 2 },
        { status: 'completed' as AgentStatus, activity: 'Search completed', progress: 100, duration: 1 },
      ];

      let stageIndex = 0;
      let elapsedTime = 0;

      const processTask = () => {
        if (stageIndex < stages.length) {
          const stage = stages[stageIndex];

          const log: ActivityLog = {
            id: `log-3-${stageIndex}`,
            timestamp: Date.now(),
            status: stage.status,
            activity: stage.activity,
            duration: stage.duration,
          };

          setTasks(prev => prev.map(t =>
            t.id === 'task-3'
              ? {
                  ...t,
                  status: stage.status,
                  progress: stage.progress,
                  currentActivity: stage.activity,
                  elapsedTime: elapsedTime,
                  activityLogs: [...t.activityLogs, log],
                }
              : t
          ));

          elapsedTime += stage.duration;
          stageIndex++;

          if (stageIndex < stages.length) {
            setTimeout(processTask, stage.duration * 1000);
          } else {
            setTimeout(() => {
              setMetrics({
                statusClarity: 94,
                updateLatency: 85,
                progressAccuracy: 91,
                userInterruptions: 3,
                errorRecovery: 98,
                trustBuilding: 92,
              });
              setPhase('complete');
            }, 500);
          }
        }
      };

      processTask();
    }
  }, [phase]);

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'thinking': return <Brain className="w-5 h-5 text-purple-400 animate-pulse" />;
      case 'processing': return <Settings className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'searching': return <Search className="w-5 h-5 text-yellow-400 animate-bounce" />;
      case 'analyzing': return <Zap className="w-5 h-5 text-orange-400 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: AgentStatus): string => {
    switch (status) {
      case 'thinking': return 'bg-purple-600';
      case 'processing': return 'bg-blue-600';
      case 'searching': return 'bg-yellow-600';
      case 'analyzing': return 'bg-orange-600';
      case 'completed': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-slate-700';
    }
  };

  const getStatusBorder = (status: AgentStatus): string => {
    switch (status) {
      case 'thinking': return 'border-purple-500';
      case 'processing': return 'border-blue-500';
      case 'searching': return 'border-yellow-500';
      case 'analyzing': return 'border-orange-500';
      case 'completed': return 'border-green-500';
      case 'error': return 'border-red-500';
      default: return 'border-slate-600';
    }
  };

  const getStatusLabel = (status: AgentStatus): string => {
    switch (status) {
      case 'thinking': return 'Thinking';
      case 'processing': return 'Processing';
      case 'searching': return 'Searching';
      case 'analyzing': return 'Analyzing';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      default: return 'Idle';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing agent status monitoring...';
      case 'document-processing': return 'Task 1: Document Processing - Parsing → Analysis → Summarization';
      case 'data-analysis': return 'Task 2: Data Analysis - Loading → Computing → Visualizing';
      case 'search-operation': return 'Task 3: Search Operation - Querying → Filtering → Ranking';
      case 'complete': return 'All tasks completed with real-time status tracking';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <Loader className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Agent Status & Activity Monitor</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['document-processing', 'data-analysis', 'search-operation'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['data-analysis', 'search-operation', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['search-operation', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                phase === 'complete' && idx === 2 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 2 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-slate-800/50 backdrop-blur-sm border-2 rounded-xl p-6 transition-all duration-300 ${getStatusBorder(task.status)}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{task.name}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(task.status)} text-white`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{task.currentActivity}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'error' ? 'bg-red-500' :
                        task.status === 'thinking' ? 'bg-purple-500' :
                        task.status === 'processing' ? 'bg-blue-500' :
                        task.status === 'searching' ? 'bg-yellow-500' :
                        task.status === 'analyzing' ? 'bg-orange-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Elapsed Time</div>
                    <div className="text-lg font-semibold text-white">{task.elapsedTime.toFixed(1)}s</div>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Estimated Time</div>
                    <div className="text-lg font-semibold text-white">{task.estimatedTime}s</div>
                  </div>
                </div>

                {task.activityLogs.length > 0 && (
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-xs text-gray-400 mb-3 uppercase font-semibold flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Activity Log
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {task.activityLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-3 p-2 bg-slate-900/30 rounded">
                          <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                          <div className="flex-1">
                            <div className="text-xs text-white">{log.activity}</div>
                            <div className="text-xs text-gray-500">{log.duration}s</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Status Pattern Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Status Clarity</div>
              <div className="text-2xl font-bold text-green-400">{metrics.statusClarity}%</div>
              <div className="text-xs text-gray-500 mt-1">User understanding</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Update Latency</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.updateLatency}ms</div>
              <div className="text-xs text-gray-500 mt-1">State change to UI</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Progress Accuracy</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.progressAccuracy}%</div>
              <div className="text-xs text-gray-500 mt-1">Estimation vs actual</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">User Interruptions</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.userInterruptions}%</div>
              <div className="text-xs text-gray-500 mt-1">Unnecessary interventions</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Error Recovery</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.errorRecovery}%</div>
              <div className="text-xs text-gray-500 mt-1">Failed state handling</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Trust Building</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.trustBuilding}%</div>
              <div className="text-xs text-gray-500 mt-1">User confidence</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="text-sm text-blue-300">
              <strong>Status Monitoring Summary:</strong> Successfully tracked 3 agent tasks with real-time status updates
              across 15 activity stages (5 per task). Achieved {metrics.statusClarity}% status clarity with {metrics.updateLatency}ms
              update latency. Progress estimation accuracy of {metrics.progressAccuracy}% with only {metrics.userInterruptions}%
              user interruptions. {metrics.errorRecovery}% error recovery rate and {metrics.trustBuilding}% trust building
              through transparent status communication.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentStatusActivityPatternsDemo;