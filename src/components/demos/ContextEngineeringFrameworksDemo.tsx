'use client';

import React, { useState, useEffect } from 'react';
import { FileCode, Layers, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

type ComponentStatus = 'idle' | 'designed' | 'assembled' | 'validated' | 'recovered' | 'failed';
type ValidationStatus = 'pending' | 'passed' | 'warning' | 'failed';
type PhaseType = 'idle' | 'schema-design' | 'component-assembly' | 'orchestration' | 'validation' | 'failure-prevention' | 'complete';

interface ContextComponent {
  id: string;
  name: string;
  type: 'system' | 'user' | 'document' | 'instruction' | 'constraint' | 'example';
  xmlTag: string;
  content: string;
  tokens: number;
  status: ComponentStatus;
  dependencies: string[];
  reusable: boolean;
}

interface AssemblyStep {
  id: string;
  operation: string;
  components: string[];
  timestamp: number;
  status: 'pending' | 'active' | 'complete';
}

interface ValidationCheck {
  id: string;
  name: string;
  category: 'coherence' | 'completeness' | 'structure' | 'quality';
  status: ValidationStatus;
  score: number;
  message: string;
}

interface FailureScenario {
  id: string;
  type: 'token-overflow' | 'missing-dependency' | 'schema-violation' | 'quality-gate';
  detected: boolean;
  recovered: boolean;
  recovery: string;
}

const ContextEngineeringFrameworksDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [components, setComponents] = useState<ContextComponent[]>([]);
  const [assemblySteps, setAssemblySteps] = useState<AssemblyStep[]>([]);
  const [validationChecks, setValidationChecks] = useState<ValidationCheck[]>([]);
  const [failureScenarios, setFailureScenarios] = useState<FailureScenario[]>([]);
  const [overallCoherence, setOverallCoherence] = useState(0);
  const [systemReliability, setSystemReliability] = useState(0);
  const [componentReusability, setComponentReusability] = useState(0);

  const initialComponents: ContextComponent[] = [
    {
      id: 'comp-1',
      name: 'System Role',
      type: 'system',
      xmlTag: '<system_role>',
      content: 'You are an expert software architect...',
      tokens: 120,
      status: 'idle',
      dependencies: [],
      reusable: true,
    },
    {
      id: 'comp-2',
      name: 'Task Instructions',
      type: 'instruction',
      xmlTag: '<instructions>',
      content: 'Design a microservices architecture...',
      tokens: 250,
      status: 'idle',
      dependencies: ['comp-1'],
      reusable: false,
    },
    {
      id: 'comp-3',
      name: 'Domain Knowledge',
      type: 'document',
      xmlTag: '<knowledge_base>',
      content: 'Enterprise patterns: CQRS, Event Sourcing...',
      tokens: 450,
      status: 'idle',
      dependencies: [],
      reusable: true,
    },
    {
      id: 'comp-4',
      name: 'Constraints',
      type: 'constraint',
      xmlTag: '<constraints>',
      content: 'Must support 10K RPS, 99.9% uptime...',
      tokens: 180,
      status: 'idle',
      dependencies: ['comp-2'],
      reusable: false,
    },
    {
      id: 'comp-5',
      name: 'Code Examples',
      type: 'example',
      xmlTag: '<examples>',
      content: 'Implementation patterns: API Gateway...',
      tokens: 320,
      status: 'idle',
      dependencies: ['comp-3'],
      reusable: true,
    },
    {
      id: 'comp-6',
      name: 'User Context',
      type: 'user',
      xmlTag: '<user_context>',
      content: 'Current project: E-commerce platform...',
      tokens: 200,
      status: 'idle',
      dependencies: [],
      reusable: false,
    },
  ];

  const initialValidationChecks: ValidationCheck[] = [
    {
      id: 'val-1',
      name: 'Semantic Coherence',
      category: 'coherence',
      status: 'pending',
      score: 0,
      message: 'Checking logical flow and consistency...',
    },
    {
      id: 'val-2',
      name: 'Component Completeness',
      category: 'completeness',
      status: 'pending',
      score: 0,
      message: 'Verifying all required components...',
    },
    {
      id: 'val-3',
      name: 'XML Structure Validity',
      category: 'structure',
      status: 'pending',
      score: 0,
      message: 'Validating tag hierarchy and nesting...',
    },
    {
      id: 'val-4',
      name: 'Context Quality',
      category: 'quality',
      status: 'pending',
      score: 0,
      message: 'Assessing information density and relevance...',
    },
  ];

  const initialFailureScenarios: FailureScenario[] = [
    {
      id: 'fail-1',
      type: 'missing-dependency',
      detected: false,
      recovered: false,
      recovery: 'Auto-injected missing component',
    },
    {
      id: 'fail-2',
      type: 'schema-violation',
      detected: false,
      recovered: false,
      recovery: 'Schema validation corrected',
    },
    {
      id: 'fail-3',
      type: 'quality-gate',
      detected: false,
      recovered: false,
      recovery: 'Component enrichment applied',
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('schema-design');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'schema-design') {
      setComponents(initialComponents);

      let designIndex = 0;
      const designInterval = setInterval(() => {
        if (designIndex < initialComponents.length) {
          const component = initialComponents[designIndex];
          setComponents(prev => prev.map(c =>
            c.id === component.id ? { ...c, status: 'designed' } : c
          ));
          designIndex++;
        } else {
          clearInterval(designInterval);
          setTimeout(() => setPhase('component-assembly'), 400);
        }
      }, 300);

      return () => clearInterval(designInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'component-assembly') {
      const steps: AssemblyStep[] = [
        {
          id: 'step-1',
          operation: 'Initialize system context',
          components: ['comp-1'],
          timestamp: Date.now(),
          status: 'pending',
        },
        {
          id: 'step-2',
          operation: 'Inject domain knowledge',
          components: ['comp-3'],
          timestamp: Date.now() + 1000,
          status: 'pending',
        },
        {
          id: 'step-3',
          operation: 'Add task instructions',
          components: ['comp-2'],
          timestamp: Date.now() + 2000,
          status: 'pending',
        },
        {
          id: 'step-4',
          operation: 'Apply constraints',
          components: ['comp-4'],
          timestamp: Date.now() + 3000,
          status: 'pending',
        },
        {
          id: 'step-5',
          operation: 'Include code examples',
          components: ['comp-5'],
          timestamp: Date.now() + 4000,
          status: 'pending',
        },
        {
          id: 'step-6',
          operation: 'Merge user context',
          components: ['comp-6'],
          timestamp: Date.now() + 5000,
          status: 'pending',
        },
      ];

      setAssemblySteps(steps);

      let stepIndex = 0;
      const assemblyInterval = setInterval(() => {
        if (stepIndex < steps.length) {
          const step = steps[stepIndex];
          setAssemblySteps(prev => prev.map(s =>
            s.id === step.id ? { ...s, status: 'active' } : s
          ));

          setTimeout(() => {
            setAssemblySteps(prev => prev.map(s =>
              s.id === step.id ? { ...s, status: 'complete' } : s
            ));

            step.components.forEach(compId => {
              setComponents(prev => prev.map(c =>
                c.id === compId ? { ...c, status: 'assembled' } : c
              ));
            });
          }, 200);

          stepIndex++;
        } else {
          clearInterval(assemblyInterval);
          setTimeout(() => setPhase('orchestration'), 400);
        }
      }, 350);

      return () => clearInterval(assemblyInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'orchestration') {
      const orchestrationTimer = setTimeout(() => {
        setComponents(prev => prev.map(c => ({ ...c, status: 'assembled' })));
        setPhase('validation');
      }, 1500);

      return () => clearTimeout(orchestrationTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'validation') {
      setValidationChecks(initialValidationChecks);

      let valIndex = 0;
      const validationInterval = setInterval(() => {
        if (valIndex < initialValidationChecks.length) {
          const check = initialValidationChecks[valIndex];
          let score: number;
          let status: ValidationStatus;
          let message: string;

          if (check.id === 'val-1') {
            score = 94;
            status = 'passed';
            message = 'High semantic coherence across components';
          } else if (check.id === 'val-2') {
            score = 88;
            status = 'warning';
            message = 'One dependency missing - auto-resolved';
          } else if (check.id === 'val-3') {
            score = 96;
            status = 'passed';
            message = 'Valid XML structure with proper nesting';
          } else {
            score = 91;
            status = 'passed';
            message = 'High quality context with good density';
          }

          setValidationChecks(prev => prev.map(v =>
            v.id === check.id ? { ...v, status, score, message } : v
          ));

          setComponents(prev => prev.map(c => ({ ...c, status: 'validated' })));

          valIndex++;
        } else {
          clearInterval(validationInterval);
          const avgScore = Math.round(
            initialValidationChecks.reduce((sum, v) => {
              if (v.id === 'val-1') return sum + 94;
              if (v.id === 'val-2') return sum + 88;
              if (v.id === 'val-3') return sum + 96;
              return sum + 91;
            }, 0) / initialValidationChecks.length
          );
          setOverallCoherence(avgScore);
          setTimeout(() => setPhase('failure-prevention'), 400);
        }
      }, 400);

      return () => clearInterval(validationInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'failure-prevention') {
      setFailureScenarios(initialFailureScenarios);

      let failIndex = 0;
      const failureInterval = setInterval(() => {
        if (failIndex < initialFailureScenarios.length) {
          const scenario = initialFailureScenarios[failIndex];

          setFailureScenarios(prev => prev.map(f =>
            f.id === scenario.id ? { ...f, detected: true } : f
          ));

          setTimeout(() => {
            setFailureScenarios(prev => prev.map(f =>
              f.id === scenario.id ? { ...f, recovered: true } : f
            ));

            if (scenario.type === 'missing-dependency') {
              setComponents(prev => prev.map(c =>
                c.id === 'comp-2' ? { ...c, status: 'recovered' } : c
              ));
            }
          }, 300);

          failIndex++;
        } else {
          clearInterval(failureInterval);

          const reliability = 98;
          setSystemReliability(reliability);

          const reusableCount = components.filter(c => c.reusable).length;
          const reusability = Math.round((reusableCount / components.length) * 100);
          setComponentReusability(reusability);

          setTimeout(() => setPhase('complete'), 500);
        }
      }, 450);

      return () => clearInterval(failureInterval);
    }
  }, [phase, components]);

  const getStatusColor = (status: ComponentStatus): string => {
    switch (status) {
      case 'idle': return 'bg-slate-700';
      case 'designed': return 'bg-blue-600';
      case 'assembled': return 'bg-purple-600';
      case 'validated': return 'bg-green-600';
      case 'recovered': return 'bg-yellow-600';
      case 'failed': return 'bg-red-600';
      default: return 'bg-slate-700';
    }
  };

  const getValidationColor = (status: ValidationStatus): string => {
    switch (status) {
      case 'pending': return 'bg-slate-700 text-gray-300';
      case 'passed': return 'bg-green-600 text-white';
      case 'warning': return 'bg-yellow-600 text-white';
      case 'failed': return 'bg-red-600 text-white';
      default: return 'bg-slate-700 text-gray-300';
    }
  };

  const getComponentTypeIcon = (type: string): string => {
    switch (type) {
      case 'system': return '⚙️';
      case 'user': return '👤';
      case 'document': return '📄';
      case 'instruction': return '📋';
      case 'constraint': return '🔒';
      case 'example': return '💡';
      default: return '📦';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing context engineering framework...';
      case 'schema-design': return 'Designing XML-like structured components with semantic tags...';
      case 'component-assembly': return 'Assembling modular context components with dependency resolution...';
      case 'orchestration': return 'Orchestrating dynamic context composition...';
      case 'validation': return 'Validating coherence, completeness, and quality...';
      case 'failure-prevention': return 'Detecting and recovering from failure scenarios...';
      case 'complete': return 'Framework deployed with 92% coherence and 98% reliability';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <FileCode className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Context Engineering Pipeline</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['schema-design', 'component-assembly', 'orchestration', 'validation', 'failure-prevention'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['component-assembly', 'orchestration', 'validation', 'failure-prevention', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['orchestration', 'validation', 'failure-prevention', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['validation', 'failure-prevention', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['failure-prevention', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Context Components ({components.length})</h4>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${getStatusColor(component.status)} border-slate-600`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getComponentTypeIcon(component.type)}</span>
                    <span className="text-sm font-medium text-white">{component.name}</span>
                  </div>
                  {component.reusable && (
                    <span className="text-xs px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded">
                      Reusable
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-purple-400 mb-1">{component.xmlTag}</div>
                <div className="text-xs text-gray-400 truncate">{component.content}</div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <span>{component.tokens} tokens</span>
                  {component.dependencies.length > 0 && (
                    <span>Deps: {component.dependencies.length}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-purple-400" />
              <h4 className="font-semibold text-white">Assembly Steps</h4>
            </div>
            <div className="space-y-2">
              {assemblySteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    step.status === 'complete' ? 'bg-green-600 border-green-500' :
                    step.status === 'active' ? 'bg-blue-600 border-blue-500' :
                    'bg-slate-700 border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">{step.operation}</span>
                    {step.status === 'complete' && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    Components: {step.components.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {validationChecks.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <h4 className="font-semibold text-white">Validation Checks</h4>
              </div>
              <div className="space-y-2">
                {validationChecks.map((check) => (
                  <div
                    key={check.id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${getValidationColor(check.status)} border-slate-600`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{check.name}</span>
                      {check.status !== 'pending' && (
                        <span className="text-xs font-bold">{check.score}%</span>
                      )}
                    </div>
                    <div className="text-xs opacity-90">{check.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {failureScenarios.length > 0 && failureScenarios.some(f => f.detected) && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-yellow-400" />
            <h4 className="font-semibold text-white">Failure Prevention & Recovery</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {failureScenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  scenario.recovered ? 'bg-green-600/20 border-green-600/50' :
                  scenario.detected ? 'bg-yellow-600/20 border-yellow-600/50' :
                  'bg-slate-700/50 border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {scenario.recovered ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : scenario.detected ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  ) : null}
                  <span className="text-sm font-medium text-white capitalize">
                    {scenario.type.replace('-', ' ')}
                  </span>
                </div>
                {scenario.detected && (
                  <div className="text-xs text-gray-300">{scenario.recovery}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Framework Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Context Coherence</div>
              <div className="text-2xl font-bold text-green-400">{overallCoherence}%</div>
              <div className="text-xs text-gray-500 mt-1">All validation checks passed</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">System Reliability</div>
              <div className="text-2xl font-bold text-blue-400">{systemReliability}%</div>
              <div className="text-xs text-gray-500 mt-1">Uptime with failure prevention</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Component Reusability</div>
              <div className="text-2xl font-bold text-purple-400">{componentReusability}%</div>
              <div className="text-xs text-gray-500 mt-1">Reusable across projects</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <div className="text-sm text-green-300">
              <strong>Engineering Summary:</strong> Deployed enterprise-grade context framework with XML-like
              structuring across {components.length} modular components. Achieved {overallCoherence}% coherence
              through validation pipeline with {systemReliability}% reliability from automated failure prevention.
              Component library supports {componentReusability}% reusability for collaborative development.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextEngineeringFrameworksDemo;