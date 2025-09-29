'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Users, GitPullRequest, Code, FileText, ThumbsUp, MessageSquare } from 'lucide-react';

type DemoPhase = 'idle' | 'task-selection' | 'planning' | 'plan-review' | 'coding' | 'code-review' | 'testing' | 'validation' | 'complete';

interface Task {
  id: string;
  jiraId: string;
  title: string;
  type: 'bug-fix' | 'feature' | 'refactor';
  complexity: 'low' | 'medium' | 'high';
}

interface PlanningStage {
  status: 'pending' | 'generating' | 'review' | 'approved' | 'rejected';
  plan?: string;
  humanFeedback?: string;
  confidence?: number;
}

interface CodingStage {
  status: 'pending' | 'generating' | 'review' | 'approved' | 'corrected';
  filesGenerated?: number;
  linterIssues?: number;
  humanCorrections?: number;
  quality?: number;
}

interface TestingStage {
  status: 'pending' | 'running' | 'review' | 'validated';
  testCoverage?: number;
  testsPass?: boolean;
  humanValidation?: boolean;
}

interface Outcome {
  prCreated: boolean;
  merged: boolean;
  developmentTime: number;
  codeQuality: number;
  developerSatisfaction: number;
}

const HulaFrameworkDemo: React.FC = () => {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [planningStage, setPlanningStage] = useState<PlanningStage>({ status: 'pending' });
  const [codingStage, setCodingStage] = useState<CodingStage>({ status: 'pending' });
  const [testingStage, setTestingStage] = useState<TestingStage>({ status: 'pending' });
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const tasks: Task[] = [
    { id: 'task1', jiraId: 'ENG-2341', title: 'Add authentication error handling', type: 'feature', complexity: 'medium' },
    { id: 'task2', jiraId: 'BUG-1872', title: 'Fix memory leak in data processor', type: 'bug-fix', complexity: 'high' },
    { id: 'task3', jiraId: 'REF-945', title: 'Refactor API integration module', type: 'refactor', complexity: 'medium' },
    { id: 'task4', jiraId: 'ENG-2456', title: 'Implement user preferences API', type: 'feature', complexity: 'low' },
  ];

  useEffect(() => {
    if (phase === 'idle') return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'task-selection' && selectedTask) {
      const timeout = setTimeout(() => {
        setPhase('planning');
        setAnimatedPhase(true);
      }, 100);
      timeouts.push(timeout);
    }

    if (phase === 'planning') {
      setPlanningStage({ status: 'generating' });

      const timeout1 = setTimeout(() => {
        const planDescriptions = {
          'feature': 'Create authentication error handling with try-catch blocks, custom error classes, and user-friendly error messages',
          'bug-fix': 'Identify memory leak source, implement proper cleanup in destructor, add weak references to prevent cycles',
          'refactor': 'Extract API logic to separate service class, implement dependency injection, add comprehensive error handling'
        };

        const confidence = 0.75 + Math.random() * 0.15;

        setPlanningStage({
          status: 'review',
          plan: planDescriptions[selectedTask!.type],
          confidence
        });

        const timeout2 = setTimeout(() => {
          setPhase('plan-review');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 800);
      timeouts.push(timeout1);
    }

    if (phase === 'plan-review') {
      const timeout = setTimeout(() => {
        const approved = Math.random() > 0.18;

        if (approved) {
          setPlanningStage(prev => ({
            ...prev,
            status: 'approved',
            humanFeedback: 'Plan looks good, approved'
          }));

          const timeout2 = setTimeout(() => {
            setPhase('coding');
            setAnimatedPhase(true);
          }, 700);
          timeouts.push(timeout2);
        } else {
          setPlanningStage(prev => ({
            ...prev,
            status: 'rejected',
            humanFeedback: 'Add unit tests and edge case handling'
          }));

          const timeout2 = setTimeout(() => {
            setPlanningStage(prev => ({
              ...prev,
              status: 'generating'
            }));

            const timeout3 = setTimeout(() => {
              setPlanningStage(prev => ({
                ...prev,
                status: 'review',
                plan: prev.plan + ' with unit tests and edge case handling'
              }));

              const timeout4 = setTimeout(() => {
                setPlanningStage(prev => ({
                  ...prev,
                  status: 'approved',
                  humanFeedback: 'Updated plan approved'
                }));

                const timeout5 = setTimeout(() => {
                  setPhase('coding');
                  setAnimatedPhase(true);
                }, 700);
                timeouts.push(timeout5);
              }, 600);
              timeouts.push(timeout4);
            }, 600);
            timeouts.push(timeout3);
          }, 500);
          timeouts.push(timeout2);
        }
      }, 1200);
      timeouts.push(timeout);
    }

    if (phase === 'coding') {
      setCodingStage({ status: 'generating' });

      const timeout1 = setTimeout(() => {
        const complexity = selectedTask!.complexity;
        const filesGenerated = complexity === 'high' ? 5 : complexity === 'medium' ? 3 : 2;
        const linterIssues = Math.floor(Math.random() * 4);
        const quality = 0.80 + Math.random() * 0.15;

        setCodingStage({
          status: 'review',
          filesGenerated,
          linterIssues,
          quality
        });

        const timeout2 = setTimeout(() => {
          setPhase('code-review');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 1000);
      timeouts.push(timeout1);
    }

    if (phase === 'code-review') {
      const timeout = setTimeout(() => {
        const needsCorrection = (codingStage.linterIssues || 0) > 0 || Math.random() > 0.7;

        if (needsCorrection) {
          const humanCorrections = Math.floor(1 + Math.random() * 3);

          setCodingStage(prev => ({
            ...prev,
            status: 'corrected',
            humanCorrections
          }));

          const timeout2 = setTimeout(() => {
            setCodingStage(prev => ({
              ...prev,
              status: 'approved',
              linterIssues: 0,
              quality: Math.min(1, (prev.quality || 0) + 0.1)
            }));

            const timeout3 = setTimeout(() => {
              setPhase('testing');
              setAnimatedPhase(true);
            }, 600);
            timeouts.push(timeout3);
          }, 800);
          timeouts.push(timeout2);
        } else {
          setCodingStage(prev => ({
            ...prev,
            status: 'approved'
          }));

          const timeout2 = setTimeout(() => {
            setPhase('testing');
            setAnimatedPhase(true);
          }, 600);
          timeouts.push(timeout2);
        }
      }, 1000);
      timeouts.push(timeout);
    }

    if (phase === 'testing') {
      setTestingStage({ status: 'running' });

      const timeout1 = setTimeout(() => {
        const testCoverage = 0.85 + Math.random() * 0.12;
        const testsPass = Math.random() > 0.1;

        setTestingStage({
          status: 'review',
          testCoverage,
          testsPass
        });

        const timeout2 = setTimeout(() => {
          setPhase('validation');
          setAnimatedPhase(true);
        }, 100);
        timeouts.push(timeout2);
      }, 900);
      timeouts.push(timeout1);
    }

    if (phase === 'validation') {
      const timeout = setTimeout(() => {
        const humanValidation = testingStage.testsPass && Math.random() > 0.05;

        setTestingStage(prev => ({
          ...prev,
          status: 'validated',
          humanValidation
        }));

        const timeout2 = setTimeout(() => {
          const prCreated = humanValidation ?? false;
          const merged = prCreated && Math.random() > 0.41;
          const developmentTime = selectedTask!.complexity === 'high' ? -35 : selectedTask!.complexity === 'medium' ? -40 : -45;
          const codeQuality = (codingStage.quality || 0) * 100 + 15;
          const developerSatisfaction = 4.5 + Math.random() * 0.5;

          setOutcome({
            prCreated,
            merged,
            developmentTime,
            codeQuality,
            developerSatisfaction
          });

          setPhase('complete');
        }, 800);
        timeouts.push(timeout2);
      }, 1000);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, selectedTask, codingStage.linterIssues, codingStage.quality, testingStage.testsPass]);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setPhase('task-selection');
    setAnimatedPhase(false);
  };

  const handleReset = () => {
    setPhase('idle');
    setAnimatedPhase(false);
    setSelectedTask(null);
    setPlanningStage({ status: 'pending' });
    setCodingStage({ status: 'pending' });
    setTestingStage({ status: 'pending' });
    setOutcome(null);
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-blue-500/20 text-blue-300';
      case 'bug-fix': return 'bg-red-500/20 text-red-300';
      case 'refactor': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-lg p-6 border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">HULA: Human-in-the-Loop Agent</h3>
            <p className="text-emerald-300 text-sm">Collaborative AI Software Development Framework</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Three-agent collaboration: AI Planner creates development plans, AI Coder generates code, Human Agent reviews and guides at each stage.
          Deployed at Atlassian with 45 engineers, ~900 merged PRs.
        </p>
      </div>

      {/* Task Selection */}
      {phase === 'idle' && (
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Select JIRA Task for HULA Development
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => handleTaskSelect(task)}
                className="bg-slate-800/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400 font-mono text-sm">{task.jiraId}</span>
                  <span className={`text-xs px-2 py-1 rounded ${getTaskTypeColor(task.type)}`}>
                    {task.type}
                  </span>
                </div>
                <div className="text-white font-medium mb-2">{task.title}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Complexity:</span>
                  <span className={`text-xs font-medium ${getComplexityColor(task.complexity)}`}>
                    {task.complexity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stage 1: Planning */}
      {(phase === 'planning' || phase === 'plan-review' || (phase !== 'idle' && planningStage.status !== 'pending')) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && (phase === 'planning' || phase === 'plan-review') ? 'ring-2 ring-emerald-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Stage 1: AI Planner
            {planningStage.status === 'generating' && (
              <span className="text-sm text-gray-400 font-normal ml-auto">Generating coding plan...</span>
            )}
            {planningStage.status === 'review' && (
              <span className="text-sm text-yellow-400 font-normal ml-auto">Human reviewing plan...</span>
            )}
            {planningStage.status === 'approved' && (
              <span className="text-sm text-green-400 font-normal ml-auto flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Plan approved
              </span>
            )}
          </h4>

          {planningStage.status !== 'pending' && (
            <div className="space-y-3">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-semibold">Generated Plan</span>
                  {planningStage.confidence && (
                    <span className="ml-auto text-xs text-gray-400">
                      Confidence: {(planningStage.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm">{planningStage.plan}</p>
              </div>

              {planningStage.humanFeedback && (
                <div className={`rounded-lg p-4 border ${
                  planningStage.status === 'approved'
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-yellow-500/10 border-yellow-500/50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm font-semibold">Human Engineer Feedback</span>
                  </div>
                  <p className="text-gray-300 text-sm">{planningStage.humanFeedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stage 2: Coding */}
      {(phase === 'coding' || phase === 'code-review' || (phase !== 'idle' && phase !== 'task-selection' && phase !== 'planning' && phase !== 'plan-review' && codingStage.status !== 'pending')) && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && (phase === 'coding' || phase === 'code-review') ? 'ring-2 ring-emerald-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-400" />
            Stage 2: AI Coder
            {codingStage.status === 'generating' && (
              <span className="text-sm text-gray-400 font-normal ml-auto">Generating code...</span>
            )}
            {codingStage.status === 'review' && (
              <span className="text-sm text-yellow-400 font-normal ml-auto">Human reviewing code...</span>
            )}
            {codingStage.status === 'corrected' && (
              <span className="text-sm text-orange-400 font-normal ml-auto">Applying corrections...</span>
            )}
            {codingStage.status === 'approved' && (
              <span className="text-sm text-green-400 font-normal ml-auto flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Code approved
              </span>
            )}
          </h4>

          {codingStage.status !== 'pending' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-600/50">
                <div className="text-gray-400 text-xs mb-1">Files Generated</div>
                <div className="text-white text-xl font-semibold">{codingStage.filesGenerated}</div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-600/50">
                <div className="text-gray-400 text-xs mb-1">Linter Issues</div>
                <div className={`text-xl font-semibold ${
                  (codingStage.linterIssues || 0) === 0 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {codingStage.linterIssues}
                </div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-600/50">
                <div className="text-gray-400 text-xs mb-1">Human Corrections</div>
                <div className="text-white text-xl font-semibold">{codingStage.humanCorrections || 0}</div>
              </div>
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-600/50">
                <div className="text-gray-400 text-xs mb-1">Code Quality</div>
                <div className="text-emerald-400 text-xl font-semibold">
                  {codingStage.quality ? (codingStage.quality * 100).toFixed(0) : '-'}%
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Testing & Validation */}
      {(phase === 'testing' || phase === 'validation' || phase === 'complete') && (
        <div className={`bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 transition-all ${
          animatedPhase && (phase === 'testing' || phase === 'validation') ? 'ring-2 ring-emerald-500/50' : ''
        }`}>
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Stage 3: Testing & Validation
            {testingStage.status === 'running' && (
              <span className="text-sm text-gray-400 font-normal ml-auto">Running tests...</span>
            )}
            {testingStage.status === 'review' && (
              <span className="text-sm text-yellow-400 font-normal ml-auto">Human validating...</span>
            )}
            {testingStage.status === 'validated' && (
              <span className="text-sm text-green-400 font-normal ml-auto flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Validation complete
              </span>
            )}
          </h4>

          {testingStage.status !== 'pending' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                  <div className="text-gray-400 text-xs mb-2">Test Coverage</div>
                  <div className="text-white text-2xl font-semibold mb-2">
                    {testingStage.testCoverage ? (testingStage.testCoverage * 100).toFixed(0) : '-'}%
                  </div>
                  {testingStage.testCoverage && (
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                        style={{ width: `${testingStage.testCoverage * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                  <div className="text-gray-400 text-xs mb-2">Tests Status</div>
                  <div className="flex items-center gap-2">
                    {testingStage.testsPass !== undefined && (
                      testingStage.testsPass ? (
                        <>
                          <CheckCircle className="w-8 h-8 text-green-400" />
                          <span className="text-green-400 text-lg font-semibold">All Pass</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-8 h-8 text-red-400" />
                          <span className="text-red-400 text-lg font-semibold">Failed</span>
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>

              {testingStage.humanValidation !== undefined && (
                <div className={`rounded-lg p-4 border ${
                  testingStage.humanValidation
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-red-500/10 border-red-500/50'
                }`}>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className={`w-5 h-5 ${testingStage.humanValidation ? 'text-green-400' : 'text-red-400'}`} />
                    <span className="text-white font-semibold">
                      Human Validation: {testingStage.humanValidation ? 'Approved for PR' : 'Needs revision'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Outcome */}
      {phase === 'complete' && outcome && (
        <div className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 rounded-lg p-6 border border-emerald-500/30">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-emerald-400" />
            Development Outcome
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h5 className="text-emerald-400 font-semibold text-sm mb-3">Delivery Status</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Pull Request Created</span>
                  {outcome.prCreated ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">PR Merged</span>
                  {outcome.merged ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h5 className="text-emerald-400 font-semibold text-sm mb-3">Impact Metrics</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Development Time</span>
                  <span className="text-green-400 font-semibold">{outcome.developmentTime}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Code Quality</span>
                  <span className="text-emerald-400 font-semibold">+{outcome.codeQuality.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Developer Satisfaction</span>
                  <span className="text-emerald-400 font-semibold">{outcome.developerSatisfaction.toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold text-sm mb-2">HULA Framework Metrics</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">Plan Success:</span> <span className="text-white font-medium">79%</span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">Approval Rate:</span> <span className="text-white font-medium">82%</span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">Code Gen:</span> <span className="text-white font-medium">87%</span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">PR Rate:</span> <span className="text-white font-medium">25%</span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">Merge Rate:</span> <span className="text-white font-medium">59%</span>
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">SWE-bench:</span> <span className="text-white font-medium">37.2%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {phase === 'complete' && (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            Start New HULA Session
          </button>
        </div>
      )}
    </div>
  );
};

export default HulaFrameworkDemo;