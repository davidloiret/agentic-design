'use client';

import React, { useState, useEffect } from 'react';
import { User, Bot, Edit, Check, CheckCircle, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

type InitiativeHolder = 'human' | 'ai' | 'collaborative';
type WorkflowStage = 'draft' | 'review' | 'modify' | 'adapt' | 'finalize' | 'complete';
type PhaseType = 'idle' | 'ai-drafts' | 'human-reviews' | 'human-modifies' | 'ai-adapts' | 'joint-execution' | 'complete';

interface WorkflowStep {
  id: string;
  stage: WorkflowStage;
  initiativeHolder: InitiativeHolder;
  action: string;
  status: 'pending' | 'active' | 'complete';
  content?: string;
  controlTransition?: string;
}

interface ControlHandoff {
  id: string;
  from: InitiativeHolder;
  to: InitiativeHolder;
  reason: string;
  timestamp: number;
  smooth: boolean;
}

interface CollaborationMetrics {
  initiativeBalance: { human: number; ai: number };
  handoffQuality: number;
  userSatisfaction: number;
  taskCompletion: number;
  overrideUsage: number;
  collaborationEfficiency: number;
}

const MixedInitiativeInterfacePatternsDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [currentInitiative, setCurrentInitiative] = useState<InitiativeHolder>('ai');
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [handoffs, setHandoffs] = useState<ControlHandoff[]>([]);
  const [metrics, setMetrics] = useState<CollaborationMetrics>({
    initiativeBalance: { human: 0, ai: 0 },
    handoffQuality: 0,
    userSatisfaction: 0,
    taskCompletion: 0,
    overrideUsage: 0,
    collaborationEfficiency: 0,
  });

  const workflowStages: WorkflowStep[] = [
    {
      id: 'step-1',
      stage: 'draft',
      initiativeHolder: 'ai',
      action: 'AI drafts initial content',
      status: 'pending',
      content: 'Draft article: "10 Best Practices for Microservices Architecture"\n\nIntroduction: Microservices architecture has become...',
      controlTransition: 'AI initiates content creation',
    },
    {
      id: 'step-2',
      stage: 'review',
      initiativeHolder: 'human',
      action: 'Human reviews and provides feedback',
      status: 'pending',
      content: 'Feedback: Good start, but needs more technical depth. Add real-world examples and code snippets.',
      controlTransition: 'Human takes control for review',
    },
    {
      id: 'step-3',
      stage: 'modify',
      initiativeHolder: 'human',
      action: 'Human modifies structure and adds requirements',
      status: 'pending',
      content: 'Modified outline: 1) Service boundaries 2) Communication patterns 3) Data management 4) Deployment strategies...',
      controlTransition: 'Human leads modifications',
    },
    {
      id: 'step-4',
      stage: 'adapt',
      initiativeHolder: 'ai',
      action: 'AI adapts to feedback and generates enhanced content',
      status: 'pending',
      content: 'Enhanced sections with code examples, case studies from Netflix, Uber, and Amazon architectures...',
      controlTransition: 'AI adapts to human guidance',
    },
    {
      id: 'step-5',
      stage: 'finalize',
      initiativeHolder: 'collaborative',
      action: 'Joint execution: Human and AI collaborate on final version',
      status: 'pending',
      content: 'Collaborative refinement: Human adds industry insights, AI polishes language and formatting...',
      controlTransition: 'Collaborative mode engaged',
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('ai-drafts');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'ai-drafts') {
      setCurrentInitiative('ai');
      setWorkflowSteps([workflowStages[0]]);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step => ({ ...step, status: 'active' })));
      }, 300);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step => ({ ...step, status: 'complete' })));

        const handoff: ControlHandoff = {
          id: 'handoff-1',
          from: 'ai',
          to: 'human',
          reason: 'Draft complete, ready for human review',
          timestamp: Date.now(),
          smooth: true,
        };
        setHandoffs([handoff]);

        setTimeout(() => setPhase('human-reviews'), 500);
      }, 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'human-reviews') {
      setCurrentInitiative('human');
      setWorkflowSteps(prev => [...prev, workflowStages[1]]);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-2' ? { ...step, status: 'active' } : step
        ));
      }, 300);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-2' ? { ...step, status: 'complete' } : step
        ));

        setTimeout(() => setPhase('human-modifies'), 500);
      }, 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'human-modifies') {
      setWorkflowSteps(prev => [...prev, workflowStages[2]]);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-3' ? { ...step, status: 'active' } : step
        ));
      }, 300);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-3' ? { ...step, status: 'complete' } : step
        ));

        const handoff: ControlHandoff = {
          id: 'handoff-2',
          from: 'human',
          to: 'ai',
          reason: 'Requirements defined, AI adapts to feedback',
          timestamp: Date.now() + 1000,
          smooth: true,
        };
        setHandoffs(prev => [...prev, handoff]);

        setTimeout(() => setPhase('ai-adapts'), 500);
      }, 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'ai-adapts') {
      setCurrentInitiative('ai');
      setWorkflowSteps(prev => [...prev, workflowStages[3]]);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-4' ? { ...step, status: 'active' } : step
        ));
      }, 300);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-4' ? { ...step, status: 'complete' } : step
        ));

        const handoff: ControlHandoff = {
          id: 'handoff-3',
          from: 'ai',
          to: 'collaborative',
          reason: 'Final refinement requires joint effort',
          timestamp: Date.now() + 2000,
          smooth: true,
        };
        setHandoffs(prev => [...prev, handoff]);

        setTimeout(() => setPhase('joint-execution'), 500);
      }, 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'joint-execution') {
      setCurrentInitiative('collaborative');
      setWorkflowSteps(prev => [...prev, workflowStages[4]]);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-5' ? { ...step, status: 'active' } : step
        ));
      }, 300);

      setTimeout(() => {
        setWorkflowSteps(prev => prev.map(step =>
          step.id === 'step-5' ? { ...step, status: 'complete' } : step
        ));

        const totalSteps = workflowStages.length;
        const aiSteps = workflowStages.filter(s => s.initiativeHolder === 'ai').length;
        const humanSteps = workflowStages.filter(s => s.initiativeHolder === 'human').length;

        setMetrics({
          initiativeBalance: {
            human: Math.round((humanSteps / totalSteps) * 100),
            ai: Math.round((aiSteps / totalSteps) * 100),
          },
          handoffQuality: 96,
          userSatisfaction: 93,
          taskCompletion: 100,
          overrideUsage: 8,
          collaborationEfficiency: 85,
        });

        setTimeout(() => setPhase('complete'), 500);
      }, 2000);
    }
  }, [phase]);

  const getInitiativeIcon = (holder: InitiativeHolder) => {
    switch (holder) {
      case 'human': return <User className="w-5 h-5 text-blue-400" />;
      case 'ai': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'collaborative': return <Sparkles className="w-5 h-5 text-green-400" />;
      default: return null;
    }
  };

  const getInitiativeColor = (holder: InitiativeHolder): string => {
    switch (holder) {
      case 'human': return 'bg-blue-600';
      case 'ai': return 'bg-purple-600';
      case 'collaborative': return 'bg-green-600';
      default: return 'bg-slate-700';
    }
  };

  const getInitiativeBorder = (holder: InitiativeHolder): string => {
    switch (holder) {
      case 'human': return 'border-blue-500';
      case 'ai': return 'border-purple-500';
      case 'collaborative': return 'border-green-500';
      default: return 'border-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'complete': return <Check className="w-4 h-4 text-green-400" />;
      default: return <div className="w-4 h-4 rounded-full bg-slate-600" />;
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing mixed-initiative collaboration...';
      case 'ai-drafts': return 'AI Initiative - Generating initial content draft';
      case 'human-reviews': return 'Human Initiative - Reviewing and providing feedback';
      case 'human-modifies': return 'Human Initiative - Modifying structure and adding requirements';
      case 'ai-adapts': return 'AI Initiative - Adapting to feedback and generating enhanced content';
      case 'joint-execution': return 'Collaborative Initiative - Human and AI working together';
      case 'complete': return 'Task completed through seamless mixed-initiative collaboration';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${getInitiativeColor(currentInitiative)}`}>
            {getInitiativeIcon(currentInitiative)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Mixed-Initiative Collaboration</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${getInitiativeColor(currentInitiative)} border-2 ${getInitiativeBorder(currentInitiative)}`}>
            <span className="text-xs font-bold text-white uppercase">
              {currentInitiative === 'collaborative' ? 'Joint Control' : `${currentInitiative} Leading`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['ai-drafts', 'human-reviews', 'human-modifies', 'ai-adapts', 'joint-execution'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ?
                  p.includes('ai') ? 'bg-purple-500' :
                  p.includes('human') ? 'bg-blue-500' :
                  'bg-green-500' :
                ['human-reviews', 'human-modifies', 'ai-adapts', 'joint-execution', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['human-modifies', 'ai-adapts', 'joint-execution', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['ai-adapts', 'joint-execution', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['joint-execution', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Edit className="w-4 h-4 text-green-400" />
          <h4 className="font-semibold text-white">Content Creation Workflow</h4>
        </div>

        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {index > 0 && (
                <div className="absolute left-6 -top-4 w-0.5 h-4 bg-slate-600" />
              )}
              <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                step.status === 'active' ? `${getInitiativeBorder(step.initiativeHolder)} bg-slate-700/50` :
                step.status === 'complete' ? 'border-green-600/50 bg-green-900/10' :
                'border-slate-700 bg-slate-800/30'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getInitiativeColor(step.initiativeHolder)}`}>
                    {getInitiativeIcon(step.initiativeHolder)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h5 className="text-sm font-semibold text-white">{step.action}</h5>
                        {getStatusIcon(step.status)}
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                        step.initiativeHolder === 'human' ? 'bg-blue-600 text-white' :
                        step.initiativeHolder === 'ai' ? 'bg-purple-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {step.initiativeHolder === 'collaborative' ? 'Joint' : step.initiativeHolder}
                      </span>
                    </div>

                    {step.controlTransition && (
                      <div className="mb-2 text-xs text-gray-400 italic flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        {step.controlTransition}
                      </div>
                    )}

                    {step.status !== 'pending' && step.content && (
                      <div className="mt-3 p-3 bg-slate-900/50 rounded border border-slate-700">
                        <p className="text-sm text-gray-300 whitespace-pre-line">{step.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {handoffs.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-4 h-4 text-orange-400" />
            <h4 className="font-semibold text-white">Control Handoffs ({handoffs.length})</h4>
          </div>
          <div className="space-y-3">
            {handoffs.map((handoff) => (
              <div key={handoff.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getInitiativeIcon(handoff.from)}
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    {getInitiativeIcon(handoff.to)}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    handoff.smooth ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {handoff.smooth ? 'Smooth' : 'Friction'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{handoff.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Collaboration Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-2">Initiative Balance</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-400 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Human
                  </span>
                  <span className="text-xl font-bold text-blue-400">{metrics.initiativeBalance.human}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.initiativeBalance.human}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400 flex items-center gap-2">
                    <Bot className="w-3 h-3" />
                    AI
                  </span>
                  <span className="text-xl font-bold text-purple-400">{metrics.initiativeBalance.ai}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.initiativeBalance.ai}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Handoff Quality</div>
              <div className="text-2xl font-bold text-green-400">{metrics.handoffQuality}%</div>
              <div className="text-xs text-gray-500 mt-1">Smooth transitions</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">User Satisfaction</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.userSatisfaction}%</div>
              <div className="text-xs text-gray-500 mt-1">Preference for mixed</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Task Completion</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.taskCompletion}%</div>
              <div className="text-xs text-gray-500 mt-1">Success rate</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Override Usage</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.overrideUsage}%</div>
              <div className="text-xs text-gray-500 mt-1">Control takeovers</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Collaboration Efficiency</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.collaborationEfficiency}%</div>
              <div className="text-xs text-gray-500 mt-1">Time saved</div>
            </div>
          </div>
          <div className="p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="text-sm text-blue-300">
              <strong>Collaboration Summary:</strong> Successfully completed content creation through {workflowSteps.length} mixed-initiative steps
              with {handoffs.length} smooth control handoffs. Initiative balance: {metrics.initiativeBalance.human}% human-led,
              {metrics.initiativeBalance.ai}% AI-led, 20% collaborative. Achieved {metrics.handoffQuality}% handoff quality with
              {metrics.userSatisfaction}% user satisfaction. {metrics.taskCompletion}% task completion with only {metrics.overrideUsage}%
              override usage and {metrics.collaborationEfficiency}% collaboration efficiency vs full manual work.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MixedInitiativeInterfacePatternsDemo;