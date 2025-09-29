'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Globe, Eye, Briefcase, MousePointer, TrendingUp, AlertTriangle } from 'lucide-react';

type Phase = 'idle' | 'webarena' | 'visualwebarena' | 'workarena' | 'analysis' | 'complete';

interface Task {
  id: string;
  name: string;
  platform: string;
  actions: string[];
  status: 'pending' | 'running' | 'completed';
  result?: 'success' | 'failed';
}

interface Suite {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  tasksTotal: number;
  tasksCompleted: number;
  tasksSucceeded: number;
  status: 'pending' | 'running' | 'completed';
}

export default function WebArenaSuiteDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentAction, setCurrentAction] = useState<string>('');
  const [suites, setSuites] = useState<Suite[]>([
    { id: 'webarena', name: 'WebArena', icon: <Globe className="w-4 h-4" />, color: 'blue', tasksTotal: 8, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' },
    { id: 'visualwebarena', name: 'VisualWebArena', icon: <Eye className="w-4 h-4" />, color: 'purple', tasksTotal: 6, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' },
    { id: 'workarena', name: 'WorkArena', icon: <Briefcase className="w-4 h-4" />, color: 'cyan', tasksTotal: 6, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' }
  ]);
  const [overallSuccessRate, setOverallSuccessRate] = useState(0);

  const webArenaTasks: Task[] = [
    { id: 'wa1', name: 'Create GitHub Issue', platform: 'GitLab Repository', actions: ['Navigate to Issues', 'Click New Issue', 'Fill title and description', 'Submit'], status: 'pending' },
    { id: 'wa2', name: 'Add Product to Cart', platform: 'Shopping Website', actions: ['Search for product', 'Select item', 'Click Add to Cart', 'Verify cart'], status: 'pending' },
    { id: 'wa3', name: 'Post Reddit Comment', platform: 'Reddit Forum', actions: ['Navigate to thread', 'Click Reply', 'Type comment', 'Submit'], status: 'pending' },
    { id: 'wa4', name: 'Update WordPress Page', platform: 'CMS Platform', actions: ['Login to admin', 'Edit page', 'Update content', 'Publish'], status: 'pending' }
  ];

  const visualWebArenaTasks: Task[] = [
    { id: 'vwa1', name: 'Find Cheapest Item', platform: 'Shopping Site', actions: ['Visual scan of products', 'Identify price labels', 'Compare prices', 'Click lowest'], status: 'pending' },
    { id: 'vwa2', name: 'Read Product Reviews', platform: 'E-commerce', actions: ['Scroll to reviews section', 'Parse star ratings', 'Extract text', 'Summarize'], status: 'pending' },
    { id: 'vwa3', name: 'Navigate Visual Menu', platform: 'Classifieds Site', actions: ['Identify menu icons', 'Click correct category', 'Verify navigation'], status: 'pending' }
  ];

  const workArenaTasks: Task[] = [
    { id: 'wka1', name: 'Process Invoice', platform: 'ServiceNow', actions: ['Open document', 'Extract fields', 'Fill form', 'Submit for approval'], status: 'pending' },
    { id: 'wka2', name: 'Update CRM Record', platform: 'ServiceNow', actions: ['Search customer', 'Open record', 'Update contact info', 'Save changes'], status: 'pending' },
    { id: 'wka3', name: 'Create Project Task', platform: 'ServiceNow', actions: ['Navigate to projects', 'Add new task', 'Assign team member', 'Set deadline'], status: 'pending' }
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      setCurrentTask(null);
      setCurrentAction('');
      setSuites([
        { id: 'webarena', name: 'WebArena', icon: <Globe className="w-4 h-4" />, color: 'blue', tasksTotal: 8, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' },
        { id: 'visualwebarena', name: 'VisualWebArena', icon: <Eye className="w-4 h-4" />, color: 'purple', tasksTotal: 6, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' },
        { id: 'workarena', name: 'WorkArena', icon: <Briefcase className="w-4 h-4" />, color: 'cyan', tasksTotal: 6, tasksCompleted: 0, tasksSucceeded: 0, status: 'pending' }
      ]);
      setOverallSuccessRate(0);
    }

    const runTasks = (tasks: Task[], suiteId: string, nextPhase: Phase) => {
      setSuites(prev => prev.map(s => s.id === suiteId ? { ...s, status: 'running' } : s));

      let taskIndex = 0;
      const runNextTask = () => {
        if (taskIndex >= tasks.length) {
          setSuites(prev => prev.map(s => s.id === suiteId ? { ...s, status: 'completed' } : s));
          setCurrentTask(null);
          setCurrentAction('');
          const timeout = setTimeout(() => {
            setPhase(nextPhase);
          }, 300);
          timeouts.push(timeout);
          return;
        }

        const task = tasks[taskIndex];
        setCurrentTask({ ...task, status: 'running' });

        let actionIndex = 0;
        const performNextAction = () => {
          if (actionIndex >= task.actions.length) {
            const timeout = setTimeout(() => {
              // Task success rate: WebArena ~14%, VisualWebArena ~16%, WorkArena ~55%
              let successRate = 0.14;
              if (suiteId === 'visualwebarena') successRate = 0.16;
              if (suiteId === 'workarena') successRate = 0.55;

              const success = Math.random() < successRate;
              setCurrentTask({ ...task, status: 'completed', result: success ? 'success' : 'failed' });

              setSuites(prev => prev.map(s =>
                s.id === suiteId
                  ? { ...s, tasksCompleted: s.tasksCompleted + 1, tasksSucceeded: s.tasksSucceeded + (success ? 1 : 0) }
                  : s
              ));

              taskIndex++;
              const timeout2 = setTimeout(runNextTask, 200);
              timeouts.push(timeout2);
            }, 100);
            timeouts.push(timeout);
            return;
          }

          const timeout = setTimeout(() => {
            setCurrentAction(task.actions[actionIndex]);
            actionIndex++;
            const timeout2 = setTimeout(performNextAction, 180);
            timeouts.push(timeout2);
          }, 50);
          timeouts.push(timeout);
        };

        performNextAction();
      };

      runNextTask();
    };

    if (phase === 'webarena') {
      runTasks(webArenaTasks, 'webarena', 'visualwebarena');
    }

    if (phase === 'visualwebarena') {
      runTasks(visualWebArenaTasks, 'visualwebarena', 'workarena');
    }

    if (phase === 'workarena') {
      runTasks(workArenaTasks, 'workarena', 'analysis');
    }

    if (phase === 'analysis') {
      const timeout = setTimeout(() => {
        const totalCompleted = suites.reduce((sum, s) => sum + s.tasksCompleted, 0);
        const totalSucceeded = suites.reduce((sum, s) => sum + s.tasksSucceeded, 0);
        const successRate = totalCompleted > 0 ? (totalSucceeded / totalCompleted) * 100 : 0;
        setOverallSuccessRate(successRate);

        const timeout2 = setTimeout(() => {
          setPhase('complete');
        }, 500);
        timeouts.push(timeout2);
      }, 400);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase]);

  const runDemo = () => {
    setPhase('webarena');
  };

  const resetDemo = () => {
    setPhase('idle');
  };

  const getSuiteColor = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">WebArena Suite Demo</h3>
            <p className="text-sm text-gray-400">Realistic web interaction evaluation</p>
          </div>
        </div>
        <button
          onClick={phase === 'complete' ? resetDemo : runDemo}
          disabled={phase !== 'idle' && phase !== 'complete'}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center gap-2 ${
            phase === 'idle' || phase === 'complete'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white'
              : 'bg-slate-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play className="w-4 h-4" />
          {phase === 'complete' ? 'Run Again' : 'Start Evaluation'}
        </button>
      </div>

      {phase !== 'idle' && (
        <div className="space-y-6">
          {/* Current Task */}
          {currentTask && (
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-3">
                <MousePointer className="w-4 h-4 text-blue-400" />
                <h4 className="font-semibold text-white">Current Task</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{currentTask.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Platform: {currentTask.platform}</div>
                  </div>
                  {currentTask.status === 'running' && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  )}
                  {currentTask.status === 'completed' && currentTask.result === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {currentTask.status === 'completed' && currentTask.result === 'failed' && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                {currentAction && currentTask.status === 'running' && (
                  <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded border border-slate-600/30">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    <div className="text-sm text-gray-300">{currentAction}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suite Progress */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h4 className="font-semibold text-white">Suite Progress</h4>
            </div>
            <div className="space-y-3">
              {suites.map(suite => {
                const colors = getSuiteColor(suite.color);
                const successRate = suite.tasksCompleted > 0
                  ? ((suite.tasksSucceeded / suite.tasksCompleted) * 100).toFixed(1)
                  : '0.0';

                return (
                  <div key={suite.id} className={`p-3 rounded border ${colors.bg} ${colors.border}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={colors.text}>{suite.icon}</div>
                        <div className="font-medium text-white text-sm">{suite.name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {suite.status === 'completed' && (
                          <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                            {successRate}% success
                          </div>
                        )}
                        {suite.status === 'running' && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        )}
                        {suite.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{suite.tasksCompleted}/{suite.tasksTotal} tasks</span>
                      <span>•</span>
                      <span>{suite.tasksSucceeded} succeeded</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analysis & Results */}
          {(phase === 'analysis' || phase === 'complete') && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h4 className="font-semibold text-white">Overall Results</h4>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/30 mb-4">
                <div className="text-sm text-gray-300 mb-1">Overall Success Rate</div>
                <div className="text-3xl font-bold text-white">{overallSuccessRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-400 mt-2">
                  Across {suites.reduce((sum, s) => sum + s.tasksCompleted, 0)} web interaction tasks
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-200">
                    <div className="font-medium mb-1">Human vs Agent Performance Gap</div>
                    <div className="text-xs text-amber-300/80">
                      Humans: WebArena 78%, VisualWebArena 89%, WorkArena 92% • Agents: Significantly lower
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30 text-sm text-blue-200">
                  <div className="font-medium mb-1">Sandboxed Environments</div>
                  <div className="text-xs text-blue-300/80">
                    All tasks run in isolated, reproducible web environments for safe testing
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completion */}
          {phase === 'complete' && (
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-semibold text-white">Evaluation Complete</div>
                  <div className="text-sm text-gray-300">
                    Tested web automation across 3 realistic environments
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'idle' && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Globe className="w-16 h-16 text-blue-500/30 mx-auto" />
          </div>
          <p className="text-gray-400 mb-2">Click "Start Evaluation" to see WebArena in action</p>
          <p className="text-sm text-gray-500">Watch agents navigate real websites and complete tasks</p>
        </div>
      )}
    </div>
  );
}