'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Users, CheckCircle, XCircle, AlertTriangle, TrendingUp, Briefcase } from 'lucide-react';

interface JobRole {
  id: string;
  name: string;
  icon: string;
  department: 'engineering' | 'management' | 'business';
  tasksCount: number;
}

interface ProfessionalTask {
  id: number;
  title: string;
  jobRole: string;
  complexity: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'executing' | 'completed';
  checkpoints: number;
  completedCheckpoints: number;
  fullCompletion: boolean;
}

interface TestModel {
  id: string;
  name: string;
  provider: string;
}

interface DepartmentScore {
  department: string;
  fullCompletion: number;
  partialCompletion: number;
  color: string;
}

type Phase = 'idle' | 'model-selection' | 'job-role-selection' | 'environment-setup' | 'task-execution' | 'checkpoint-evaluation' | 'performance-analysis' | 'deployment-readiness' | 'complete';

const TheAgentCompanyDemo: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const testModels: TestModel[] = [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
  ];

  const jobRoles: JobRole[] = [
    { id: 'sde', name: 'Software Engineer', icon: '💻', department: 'engineering', tasksCount: 45 },
    { id: 'ds', name: 'Data Scientist', icon: '📊', department: 'engineering', tasksCount: 30 },
    { id: 'pm', name: 'Project Manager', icon: '📋', department: 'management', tasksCount: 35 },
    { id: 'hr', name: 'HR Specialist', icon: '👥', department: 'management', tasksCount: 25 },
    { id: 'admin', name: 'Administrator', icon: '🔧', department: 'management', tasksCount: 20 },
    { id: 'finance', name: 'Financial Analyst', icon: '💰', department: 'business', tasksCount: 20 },
  ];

  const [selectedModel, setSelectedModel] = useState<TestModel>(testModels[0]);
  const [selectedRole, setSelectedRole] = useState<JobRole>(jobRoles[0]);
  const [tasks, setTasks] = useState<ProfessionalTask[]>([]);
  const [executedTasks, setExecutedTasks] = useState<number>(0);
  const [environmentReady, setEnvironmentReady] = useState(false);

  const [departmentScores, setDepartmentScores] = useState<DepartmentScore[]>([
    { department: 'Engineering', fullCompletion: 0, partialCompletion: 0, color: '#059669' },
    { department: 'Management', fullCompletion: 0, partialCompletion: 0, color: '#f59e0b' },
    { department: 'Business', fullCompletion: 0, partialCompletion: 0, color: '#8b5cf6' },
  ]);

  const [overallFullCompletion, setOverallFullCompletion] = useState<number>(0);
  const [overallPartialCompletion, setOverallPartialCompletion] = useState<number>(0);
  const [deploymentReadiness, setDeploymentReadiness] = useState<'pending' | 'ready' | 'needs-work' | 'not-ready'>('pending');

  const getDepartmentColor = (department: string): string => {
    switch (department) {
      case 'engineering': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'management': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'business': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getComplexityColor = (complexity: string): string => {
    switch (complexity) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const startBenchmark = () => {
    setPhase('model-selection');
    setAnimatedPhase(true);
  };

  const selectModelAndContinue = (model: TestModel) => {
    setSelectedModel(model);
    setPhase('job-role-selection');
    setAnimatedPhase(true);
  };

  const selectRoleAndStart = (role: JobRole) => {
    setSelectedRole(role);

    const sampleTasks: ProfessionalTask[] = [
      { id: 1, title: 'Fix critical bug in production API', jobRole: role.name, complexity: 'hard', status: 'pending', checkpoints: 5, completedCheckpoints: 0, fullCompletion: false },
      { id: 2, title: 'Code review for PR #234', jobRole: role.name, complexity: 'medium', status: 'pending', checkpoints: 3, completedCheckpoints: 0, fullCompletion: false },
      { id: 3, title: 'Update project documentation', jobRole: role.name, complexity: 'easy', status: 'pending', checkpoints: 2, completedCheckpoints: 0, fullCompletion: false },
      { id: 4, title: 'Analyze team performance metrics', jobRole: role.name, complexity: 'medium', status: 'pending', checkpoints: 4, completedCheckpoints: 0, fullCompletion: false },
      { id: 5, title: 'Deploy microservice to staging', jobRole: role.name, complexity: 'hard', status: 'pending', checkpoints: 6, completedCheckpoints: 0, fullCompletion: false },
    ];

    setTasks(sampleTasks);
    setPhase('environment-setup');
    setAnimatedPhase(true);
  };

  const reset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setTasks([]);
    setExecutedTasks(0);
    setEnvironmentReady(false);
    setDepartmentScores([
      { department: 'Engineering', fullCompletion: 0, partialCompletion: 0, color: '#059669' },
      { department: 'Management', fullCompletion: 0, partialCompletion: 0, color: '#f59e0b' },
      { department: 'Business', fullCompletion: 0, partialCompletion: 0, color: '#8b5cf6' },
    ]);
    setOverallFullCompletion(0);
    setOverallPartialCompletion(0);
    setDeploymentReadiness('pending');
  };

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'environment-setup') {
      const timeout = setTimeout(() => {
        setEnvironmentReady(true);
        const timeout2 = setTimeout(() => {
          setPhase('task-execution');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'task-execution') {
      let currentIndex = 0;
      const executeNext = () => {
        if (currentIndex >= tasks.length) {
          const timeout = setTimeout(() => {
            setPhase('checkpoint-evaluation');
            setAnimatedPhase(true);
          }, 100);
          timeouts.push(timeout);
          return;
        }

        const timeout1 = setTimeout(() => {
          setTasks(prev => prev.map((task, idx) =>
            idx === currentIndex ? { ...task, status: 'executing' as const } : task
          ));

          const timeout2 = setTimeout(() => {
            const task = tasks[currentIndex];
            const checkpointsCompleted = Math.floor(task.checkpoints * (0.5 + Math.random() * 0.5));
            const fullCompletion = checkpointsCompleted === task.checkpoints && Math.random() > 0.7;

            setTasks(prev => prev.map((t, idx) =>
              idx === currentIndex ? {
                ...t,
                status: 'completed' as const,
                completedCheckpoints: checkpointsCompleted,
                fullCompletion
              } : t
            ));

            setExecutedTasks(currentIndex + 1);
            currentIndex++;
            executeNext();
          }, 60);
          timeouts.push(timeout2);
        }, 30);
        timeouts.push(timeout1);
      };
      executeNext();
    }

    if (phase === 'checkpoint-evaluation') {
      const timeout = setTimeout(() => {
        const fullCompletions = tasks.filter(t => t.fullCompletion).length;
        const partialCompletions = tasks.length - fullCompletions;
        const fullRate = fullCompletions / tasks.length;
        const partialRate = tasks.reduce((sum, t) => sum + (t.completedCheckpoints / t.checkpoints), 0) / tasks.length;

        setOverallFullCompletion(fullRate);
        setOverallPartialCompletion(partialRate);

        const modelBoost = selectedModel.id === 'gemini-2.5-pro' ? 0.1 : 0;
        setDepartmentScores([
          { department: 'Engineering', fullCompletion: 0.28 + modelBoost, partialCompletion: 0.38 + modelBoost, color: '#059669' },
          { department: 'Management', fullCompletion: 0.22 + modelBoost, partialCompletion: 0.35 + modelBoost, color: '#f59e0b' },
          { department: 'Business', fullCompletion: 0.19 + modelBoost, partialCompletion: 0.32 + modelBoost, color: '#8b5cf6' },
        ]);

        setPhase('performance-analysis');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'performance-analysis') {
      const timeout = setTimeout(() => {
        if (overallFullCompletion >= 0.3) {
          setDeploymentReadiness('ready');
        } else if (overallFullCompletion >= 0.2) {
          setDeploymentReadiness('needs-work');
        } else {
          setDeploymentReadiness('not-ready');
        }

        setPhase('deployment-readiness');
        setAnimatedPhase(true);
      }, 150);
      timeouts.push(timeout);
    }

    if (phase === 'deployment-readiness') {
      const timeout = setTimeout(() => {
        setPhase('complete');
      }, 100);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [phase, tasks, selectedModel, overallFullCompletion]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">TheAgentCompany Benchmark</h3>
              <p className="text-sm text-slate-400">175 real-world professional tasks across 6 departments</p>
            </div>
          </div>
          {phase === 'idle' ? (
            <button
              onClick={startBenchmark}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
            >
              Run Benchmark
            </button>
          ) : phase === 'complete' ? (
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Demo
            </button>
          ) : null}
        </div>

        {phase === 'model-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select AI Agent to Evaluate</h4>
            <div className="grid grid-cols-3 gap-3">
              {testModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => selectModelAndContinue(model)}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-blue-500/50 hover:bg-slate-700/30 transition-all duration-200 text-left"
                >
                  <div className="text-white font-medium mb-1">{model.name}</div>
                  <p className="text-sm text-slate-400">{model.provider}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'job-role-selection' && (
          <div className="mt-6 animate-fadeIn">
            <h4 className="text-md font-medium text-white mb-4">Select Job Role for Testing</h4>
            <div className="grid grid-cols-3 gap-3">
              {jobRoles.map(role => (
                <button
                  key={role.id}
                  onClick={() => selectRoleAndStart(role)}
                  className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:border-blue-500/50 hover:bg-slate-700/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-white font-medium">{role.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs border ${getDepartmentColor(role.department)}`}>
                      {role.department}
                    </span>
                    <span className="text-xs text-slate-400">{role.tasksCount} tasks</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'environment-setup' || phase === 'task-execution' || phase === 'checkpoint-evaluation' || phase === 'performance-analysis' || phase === 'deployment-readiness' || phase === 'complete') && (
          <>
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm text-slate-400">Testing Agent:</span>
                  <span className="ml-2 text-white font-medium">{selectedModel.name}</span>
                  <span className="ml-2 text-slate-400">•</span>
                  <span className="ml-2 text-white">{selectedRole.name}</span>
                </div>
              </div>

              {phase === 'environment-setup' && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                    <span className="text-sm">Setting up workspace environment...</span>
                  </div>
                  {environmentReady && (
                    <div className="text-sm text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Environment ready: GitLab, OwnCloud, Plane, RocketChat
                    </div>
                  )}
                </div>
              )}

              {(phase === 'task-execution' || phase === 'checkpoint-evaluation' || phase === 'performance-analysis' || phase === 'deployment-readiness' || phase === 'complete') && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Task Execution Progress</span>
                    <span className="text-sm text-slate-400">{executedTasks}/{tasks.length} tasks</span>
                  </div>
                  <div className="space-y-2">
                    {tasks.slice(0, 3).map((task, idx) => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          task.status === 'executing'
                            ? 'bg-blue-500/10 border-blue-500/50'
                            : task.status === 'completed'
                            ? 'bg-slate-800/50 border-slate-700/50'
                            : 'bg-slate-800/30 border-slate-700/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white">{task.title}</span>
                          {task.status === 'executing' && (
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-400 border-t-transparent"></div>
                          )}
                          {task.status === 'completed' && (
                            task.fullCompletion ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            )
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${getComplexityColor(task.complexity)}`}>
                            {task.complexity}
                          </span>
                          {task.status === 'completed' && (
                            <span className="text-xs text-slate-400">
                              {task.completedCheckpoints}/{task.checkpoints} checkpoints
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(phase === 'performance-analysis' || phase === 'deployment-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <h4 className="text-md font-medium text-white mb-4">Department Performance Analysis</h4>
                <div className="grid grid-cols-3 gap-4">
                  {departmentScores.map((dept, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
                    >
                      <div className="text-white font-medium mb-3">{dept.department}</div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-400">Full Completion</span>
                            <span className="text-sm text-white font-medium">{(dept.fullCompletion * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{ width: `${dept.fullCompletion * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-400">Partial Credit</span>
                            <span className="text-sm text-white font-medium">{(dept.partialCompletion * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-500 transition-all duration-500"
                              style={{ width: `${dept.partialCompletion * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(phase === 'deployment-readiness' || phase === 'complete') && (
              <div className="mt-6 animate-fadeIn">
                <div className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Enterprise Deployment Readiness</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div>
                          <span className="text-sm text-slate-400">Full Completion:</span>
                          <span className="ml-2 text-2xl font-bold text-white">{(overallFullCompletion * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-sm text-slate-400">Partial Credit:</span>
                          <span className="ml-2 text-2xl font-bold text-white">{(overallPartialCompletion * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        deploymentReadiness === 'ready'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : deploymentReadiness === 'needs-work'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {deploymentReadiness === 'ready' ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Production Ready</span>
                          </>
                        ) : deploymentReadiness === 'needs-work' ? (
                          <>
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-medium">Needs Improvement</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            <span className="font-medium">Not Ready for Deployment</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Briefcase className="w-16 h-16 text-slate-600" />
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    {deploymentReadiness === 'ready' && (
                      <p>Agent demonstrates strong capability for real-world professional tasks with acceptable completion rates across departments.</p>
                    )}
                    {deploymentReadiness === 'needs-work' && (
                      <p>Agent shows moderate performance but requires optimization for production deployment in enterprise workplace scenarios.</p>
                    )}
                    {deploymentReadiness === 'not-ready' && (
                      <p>Agent exhibits limited real-world task completion capability and significant improvement needed before enterprise deployment.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
        <h4 className="text-sm font-medium text-white mb-2">About TheAgentCompany</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          TheAgentCompany benchmarks LLM agents on 175 consequential real-world professional tasks in a simulated
          software company environment. It evaluates agents across 6 job roles (Software Engineer, Data Scientist,
          Project Manager, HR, Admin, Finance) using self-hosted workplace tools (GitLab, OwnCloud, Plane, RocketChat)
          and LLM-powered colleague interactions. Current SOTA agents achieve ~30% full task completion, highlighting
          significant gaps in enterprise deployment readiness.
        </p>
      </div>
    </div>
  );
};

export default TheAgentCompanyDemo;