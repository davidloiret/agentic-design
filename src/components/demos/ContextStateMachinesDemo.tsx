'use client';

import React, { useState, useEffect } from 'react';
import { GitBranch, Activity, CheckCircle, XCircle, AlertTriangle, ArrowRight, RotateCcw, Zap, Shield } from 'lucide-react';

type StateName = 'idle' | 'greeting' | 'analyzing' | 'searching' | 'resolving' | 'validating' | 'closing' | 'completed' | 'error';
type EventName = 'START' | 'GREET' | 'ANALYZE' | 'SEARCH' | 'RESOLVE' | 'VALIDATE' | 'CLOSE' | 'COMPLETE' | 'ERROR' | 'RECOVER';

interface State {
  name: StateName;
  label: string;
  description: string;
  status: 'inactive' | 'active' | 'completed' | 'error';
  validationPassed?: boolean;
}

interface Transition {
  from: StateName;
  to: StateName;
  event: EventName;
  guard?: string;
  action?: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
}

interface StateMetrics {
  stateValidity: number;
  recoverySuccess: number;
  consistencyRate: number;
  deadlockPrevention: number;
}

const initialStates: State[] = [
  { name: 'idle', label: 'Idle', description: 'Waiting for customer interaction', status: 'inactive' },
  { name: 'greeting', label: 'Greeting', description: 'Welcoming customer', status: 'inactive' },
  { name: 'analyzing', label: 'Analyzing', description: 'Understanding customer needs', status: 'inactive' },
  { name: 'searching', label: 'Searching', description: 'Finding solution', status: 'inactive' },
  { name: 'resolving', label: 'Resolving', description: 'Applying solution', status: 'inactive' },
  { name: 'validating', label: 'Validating', description: 'Confirming resolution', status: 'inactive' },
  { name: 'closing', label: 'Closing', description: 'Ending conversation', status: 'inactive' },
  { name: 'completed', label: 'Completed', description: 'Session ended successfully', status: 'inactive' },
  { name: 'error', label: 'Error', description: 'Error state with recovery', status: 'inactive' }
];

const transitions: Transition[] = [
  { from: 'idle', to: 'greeting', event: 'START', guard: 'customer_present', action: 'initialize_session', status: 'pending' },
  { from: 'greeting', to: 'analyzing', event: 'GREET', guard: 'greeting_completed', action: 'start_analysis', status: 'pending' },
  { from: 'analyzing', to: 'searching', event: 'ANALYZE', guard: 'needs_identified', action: 'search_solutions', status: 'pending' },
  { from: 'searching', to: 'resolving', event: 'SEARCH', guard: 'solution_found', action: 'apply_solution', status: 'pending' },
  { from: 'resolving', to: 'validating', event: 'RESOLVE', guard: 'solution_applied', action: 'validate_result', status: 'pending' },
  { from: 'validating', to: 'closing', event: 'VALIDATE', guard: 'validation_passed', action: 'close_session', status: 'pending' },
  { from: 'closing', to: 'completed', event: 'CLOSE', guard: 'session_closed', action: 'finalize', status: 'pending' },
  { from: 'analyzing', to: 'error', event: 'ERROR', action: 'log_error', status: 'pending' },
  { from: 'searching', to: 'error', event: 'ERROR', action: 'log_error', status: 'pending' },
  { from: 'resolving', to: 'error', event: 'ERROR', action: 'log_error', status: 'pending' },
  { from: 'error', to: 'analyzing', event: 'RECOVER', guard: 'recovery_possible', action: 'restore_state', status: 'pending' }
];

export default function ContextStateMachinesDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [states, setStates] = useState<State[]>(initialStates);
  const [currentState, setCurrentState] = useState<StateName>('idle');
  const [transitionLog, setTransitionLog] = useState<Transition[]>([]);
  const [errorEncountered, setErrorEncountered] = useState(false);

  const [metrics, setMetrics] = useState<StateMetrics>({
    stateValidity: 0,
    recoverySuccess: 0,
    consistencyRate: 0,
    deadlockPrevention: 0
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    const executeTransition = (transition: Transition) => {
      // Mark transition as executing
      setTransitionLog(prev => [...prev, { ...transition, status: 'executing' }]);

      timeouts.push(setTimeout(() => {
        // Mark source state as completed
        setStates(prev => prev.map(s =>
          s.name === transition.from ? { ...s, status: 'completed' } : s
        ));

        // Validate guard condition
        const guardPassed = !transition.guard || Math.random() > 0.1;

        if (!guardPassed) {
          // Guard failed - go to error state
          setTransitionLog(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'failed' };
            return updated;
          });

          setStates(prev => prev.map(s =>
            s.name === 'error' ? { ...s, status: 'active' } : s
          ));
          setCurrentState('error');
          setErrorEncountered(true);

          // Attempt recovery
          timeouts.push(setTimeout(() => {
            const recoveryTransition = transitions.find(t => t.from === 'error' && t.event === 'RECOVER');
            if (recoveryTransition) {
              executeTransition(recoveryTransition);
            }
          }, 1000));

          return;
        }

        // Transition successful
        setTransitionLog(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'completed' };
          return updated;
        });

        // Activate target state
        setStates(prev => prev.map(s =>
          s.name === transition.to ? { ...s, status: 'active', validationPassed: true } : s
        ));
        setCurrentState(transition.to);

        // Check if we should inject an error (10% chance at searching or resolving)
        const shouldError = !errorEncountered &&
          (transition.to === 'searching' || transition.to === 'resolving') &&
          Math.random() < 0.15;

        if (shouldError) {
          timeouts.push(setTimeout(() => {
            const errorTransition = transitions.find(t => t.from === transition.to && t.event === 'ERROR');
            if (errorTransition) {
              setErrorEncountered(true);
              executeTransition(errorTransition);
            }
          }, 800));
        } else if (transition.to !== 'completed' && transition.to !== 'error') {
          // Continue to next state
          timeouts.push(setTimeout(() => {
            const nextTransition = transitions.find(t => t.from === transition.to && t.event !== 'ERROR' && t.event !== 'RECOVER');
            if (nextTransition) {
              executeTransition(nextTransition);
            }
          }, 600));
        } else if (transition.to === 'completed') {
          // Calculate final metrics
          const totalTransitions = transitionLog.length + 1;
          const validTransitions = transitionLog.filter(t => t.status === 'completed').length + 1;
          const errorTransitions = transitionLog.filter(t => t.event === 'ERROR').length;
          const recoveryTransitions = transitionLog.filter(t => t.event === 'RECOVER').length;

          setMetrics({
            stateValidity: (validTransitions / totalTransitions) * 100,
            recoverySuccess: errorTransitions > 0 ? (recoveryTransitions / errorTransitions) * 100 : 100,
            consistencyRate: 95 + Math.random() * 5,
            deadlockPrevention: 100
          });

          setIsRunning(false);
        }
      }, 400));
    };

    // Start with first transition
    if (currentState === 'idle') {
      const firstTransition = transitions.find(t => t.from === 'idle');
      if (firstTransition) {
        setStates(prev => prev.map(s =>
          s.name === 'idle' ? { ...s, status: 'active' } : s
        ));
        timeouts.push(setTimeout(() => executeTransition(firstTransition), 500));
      }
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [isRunning, currentState]);

  const handleStart = () => {
    setIsRunning(true);
    setStates(initialStates);
    setCurrentState('idle');
    setTransitionLog([]);
    setErrorEncountered(false);
    setMetrics({
      stateValidity: 0,
      recoverySuccess: 0,
      consistencyRate: 0,
      deadlockPrevention: 0
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setStates(initialStates);
    setCurrentState('idle');
    setTransitionLog([]);
    setErrorEncountered(false);
    setMetrics({
      stateValidity: 0,
      recoverySuccess: 0,
      consistencyRate: 0,
      deadlockPrevention: 0
    });
  };

  const getStateColor = (state: State) => {
    if (state.status === 'active') return 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500/50';
    if (state.status === 'completed') return 'bg-green-500/20 border-green-500';
    if (state.status === 'error') return 'bg-red-500/20 border-red-500';
    return 'bg-slate-800/50 border-slate-600';
  };

  const getStateIcon = (state: State) => {
    if (state.status === 'active') return <Activity className="w-4 h-4 text-blue-400 animate-pulse" />;
    if (state.status === 'completed') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (state.status === 'error') return <XCircle className="w-4 h-4 text-red-400" />;
    return null;
  };

  const getTransitionIcon = (transition: Transition) => {
    if (transition.status === 'executing') return <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />;
    if (transition.status === 'completed') return <CheckCircle className="w-3 h-3 text-green-400" />;
    if (transition.status === 'failed') return <XCircle className="w-3 h-3 text-red-400" />;
    return <ArrowRight className="w-3 h-3 text-gray-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-2 rounded-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Context State Machines</h3>
            <p className="text-sm text-gray-400">Finite State Machine with Validation & Recovery</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && currentState === 'idle' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Start Flow
            </button>
          )}
          {(currentState === 'completed' || !isRunning) && currentState !== 'idle' && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Current State Indicator */}
      <div className="mb-6 p-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-lg border border-teal-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className={`w-5 h-5 ${isRunning ? 'text-teal-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">
              Current State: <span className="text-teal-400">{states.find(s => s.name === currentState)?.label || 'Unknown'}</span>
            </span>
          </div>
          {isRunning && (
            <div className="text-sm text-gray-400">
              Transitions: {transitionLog.length}
            </div>
          )}
        </div>
      </div>

      {/* State Diagram */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <GitBranch className="w-4 h-4" />
          State Machine Diagram
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {states.filter(s => s.name !== 'error').map((state) => (
            <div
              key={state.name}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${getStateColor(state)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-sm">{state.label}</span>
                {getStateIcon(state)}
              </div>
              <div className="text-xs text-gray-400">{state.description}</div>
              {state.validationPassed !== undefined && (
                <div className="mt-2 flex items-center gap-1">
                  {state.validationPassed ? (
                    <Shield className="w-3 h-3 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-yellow-400" />
                  )}
                  <span className="text-xs text-gray-400">
                    {state.validationPassed ? 'Validated' : 'Pending'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error State (separate) */}
        {errorEncountered && (
          <div className="mt-4 p-3 rounded-lg border-2 bg-red-500/20 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Error State (Recovery Active)
              </span>
              {states.find(s => s.name === 'error')?.status === 'active' && (
                <Activity className="w-4 h-4 text-red-400 animate-pulse" />
              )}
            </div>
            <div className="text-xs text-gray-400">Error detected - initiating recovery</div>
          </div>
        )}
      </div>

      {/* Transition Log */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          Transition Log ({transitionLog.length} transitions)
        </h4>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {transitionLog.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">No transitions yet</div>
          ) : (
            transitionLog.map((transition, index) => (
              <div
                key={index}
                className={`p-2 rounded border text-xs transition-all duration-200 ${
                  transition.status === 'executing' ? 'bg-yellow-500/10 border-yellow-500/50' :
                  transition.status === 'completed' ? 'bg-green-500/10 border-green-500/30' :
                  transition.status === 'failed' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-slate-800/30 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTransitionIcon(transition)}
                    <span className="text-gray-300">
                      <span className="text-cyan-400">{states.find(s => s.name === transition.from)?.label}</span>
                      {' → '}
                      <span className="text-teal-400">{states.find(s => s.name === transition.to)?.label}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">{transition.event}</span>
                    {transition.guard && (
                      <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                        {transition.guard}
                      </span>
                    )}
                  </div>
                </div>
                {transition.action && (
                  <div className="mt-1 ml-5 text-gray-500">
                    Action: {transition.action}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* State Metrics */}
      {currentState === 'completed' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30">
            <div className="text-xs text-gray-400 mb-1">State Validity</div>
            <div className="text-2xl font-bold text-green-400">{metrics.stateValidity.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Valid transitions</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="text-xs text-gray-400 mb-1">Recovery Success</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.recoverySuccess.toFixed(0)}%</div>
            <div className="text-xs text-gray-400 mt-1">Error recovery</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/30">
            <div className="text-xs text-gray-400 mb-1">Consistency Rate</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.consistencyRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">States validated</div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-lg p-4 border border-teal-500/30">
            <div className="text-xs text-gray-400 mb-1">Deadlock Prevention</div>
            <div className="text-2xl font-bold text-teal-400">{metrics.deadlockPrevention.toFixed(0)}%</div>
            <div className="text-xs text-gray-400 mt-1">No stuck states</div>
          </div>
        </div>
      )}

      {currentState === 'completed' && (
        <div className="mt-4 p-3 rounded-lg border bg-green-500/10 border-green-500/30">
          <div className="text-sm text-white">
            ✓ State machine completed successfully. {transitionLog.length} transitions executed with {errorEncountered ? 'error recovery' : 'no errors'}.
          </div>
        </div>
      )}
    </div>
  );
}