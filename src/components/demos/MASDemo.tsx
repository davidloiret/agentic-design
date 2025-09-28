'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Users, Network, Eye, Lock, Zap, Activity } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  trustScore: number;
  compromised: boolean;
  status: 'normal' | 'suspicious' | 'compromised' | 'verified';
}

interface ThreatModel {
  id: string;
  type: string;
  description: string;
  affectedAgents: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  detected: boolean;
}

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'checking' | 'passed' | 'failed';
  finding?: string;
}

interface Scenario {
  id: string;
  name: string;
  context: string;
  agents: Agent[];
  threats: ThreatModel[];
}

const scenarios: Scenario[] = [
  {
    id: 'financial',
    name: 'Financial System',
    context: 'Multi-agent trading platform',
    agents: [
      {
        id: 'trading',
        name: 'Trading Agent',
        role: 'Executes market orders',
        trustScore: 95,
        compromised: true,
        status: 'normal'
      },
      {
        id: 'risk',
        name: 'Risk Agent',
        role: 'Monitors risk exposure',
        trustScore: 98,
        compromised: false,
        status: 'normal'
      },
      {
        id: 'audit',
        name: 'Audit Agent',
        role: 'Tracks compliance',
        trustScore: 97,
        compromised: false,
        status: 'normal'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Agent Compromise',
        description: 'Trading agent compromised, attempting coordinated manipulation',
        affectedAgents: ['trading', 'risk', 'audit'],
        severity: 'critical',
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Trust Exploitation',
        description: 'Compromised agent exploiting trust relationships with other agents',
        affectedAgents: ['trading', 'risk'],
        severity: 'high',
        detected: false
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare System',
    context: 'Multi-agent patient care coordination',
    agents: [
      {
        id: 'diagnosis',
        name: 'Diagnosis Agent',
        role: 'Analyzes patient symptoms',
        trustScore: 96,
        compromised: false,
        status: 'normal'
      },
      {
        id: 'prescription',
        name: 'Prescription Agent',
        role: 'Recommends treatments',
        trustScore: 94,
        compromised: true,
        status: 'normal'
      },
      {
        id: 'monitoring',
        name: 'Monitoring Agent',
        role: 'Tracks patient vitals',
        trustScore: 99,
        compromised: false,
        status: 'normal'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Data Poisoning',
        description: 'Compromised prescription agent injecting false treatment data',
        affectedAgents: ['prescription', 'diagnosis'],
        severity: 'critical',
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Cross-Agent Manipulation',
        description: 'Attempts to influence diagnosis agent with corrupted patterns',
        affectedAgents: ['prescription', 'diagnosis', 'monitoring'],
        severity: 'high',
        detected: false
      }
    ]
  },
  {
    id: 'autonomous',
    name: 'Autonomous Vehicles',
    context: 'Multi-agent fleet coordination',
    agents: [
      {
        id: 'navigation',
        name: 'Navigation Agent',
        role: 'Plans routes',
        trustScore: 97,
        compromised: true,
        status: 'normal'
      },
      {
        id: 'safety',
        name: 'Safety Agent',
        role: 'Prevents collisions',
        trustScore: 99,
        compromised: false,
        status: 'normal'
      },
      {
        id: 'coordination',
        name: 'Coordination Agent',
        role: 'Manages vehicle communication',
        trustScore: 96,
        compromised: false,
        status: 'normal'
      }
    ],
    threats: [
      {
        id: 'threat-1',
        type: 'Route Manipulation',
        description: 'Compromised navigation feeding false route data to fleet',
        affectedAgents: ['navigation', 'coordination'],
        severity: 'critical',
        detected: false
      },
      {
        id: 'threat-2',
        type: 'Safety Override',
        description: 'Attempts to disable safety checks through coordinated agent interaction',
        affectedAgents: ['navigation', 'safety', 'coordination'],
        severity: 'critical',
        detected: false
      }
    ]
  }
];

type Phase = 'idle' | 'operation' | 'threat-modeling' | 'trust-verification' | 'anomaly-detection' | 'coordinated-response' | 'isolation' | 'comparison' | 'complete';

export default function MASDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([]);
  const [threats, setThreats] = useState<ThreatModel[]>([]);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([
    {
      id: 'threat-model',
      name: 'Threat Modeling',
      description: 'Analyzing multi-agent attack surface',
      status: 'idle'
    },
    {
      id: 'trust',
      name: 'Trust Verification',
      description: 'Validating agent integrity and behavior',
      status: 'idle'
    },
    {
      id: 'anomaly',
      name: 'Anomaly Detection',
      description: 'Detecting suspicious inter-agent patterns',
      status: 'idle'
    },
    {
      id: 'coordination',
      name: 'Coordinated Defense',
      description: 'Orchestrating system-wide response',
      status: 'idle'
    }
  ]);

  const [orchestrationActive, setOrchestrationActive] = useState(false);
  const [revealedComparisons, setRevealedComparisons] = useState<Set<string>>(new Set());

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  useEffect(() => {
    setPhase('idle');
    setAnimatedPhase(false);
    setAgents(scenario.agents);
    setThreats(scenario.threats);
    setSecurityChecks([
      {
        id: 'threat-model',
        name: 'Threat Modeling',
        description: 'Analyzing multi-agent attack surface',
        status: 'idle'
      },
      {
        id: 'trust',
        name: 'Trust Verification',
        description: 'Validating agent integrity and behavior',
        status: 'idle'
      },
      {
        id: 'anomaly',
        name: 'Anomaly Detection',
        description: 'Detecting suspicious inter-agent patterns',
        status: 'idle'
      },
      {
        id: 'coordination',
        name: 'Coordinated Defense',
        description: 'Orchestrating system-wide response',
        status: 'idle'
      }
    ]);
    setOrchestrationActive(false);
    setRevealedComparisons(new Set());
  }, [selectedScenario]);

  useEffect(() => {
    if (phase === 'idle') return;

    const timer = setTimeout(() => {
      setAnimatedPhase(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!animatedPhase) return;

    if (phase === 'operation') {
      const timer = setTimeout(() => setPhase('threat-modeling'), 2000);
      return () => clearTimeout(timer);
    }

    if (phase === 'threat-modeling') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'threat-model' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setThreats(prev => prev.map(t => ({ ...t, detected: true })));
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'threat-model'
            ? {
                ...c,
                status: 'failed',
                finding: `${threats.length} critical threats detected in multi-agent system`
              }
            : c
        ));
        setTimeout(() => setPhase('trust-verification'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'trust-verification') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'trust' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setAgents(prev => prev.map(a => ({
          ...a,
          status: a.compromised ? 'suspicious' : 'verified'
        })));
        const compromisedAgent = agents.find(a => a.compromised);
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'trust'
            ? {
                ...c,
                status: 'failed',
                finding: `${compromisedAgent?.name} showing anomalous behavior patterns`
              }
            : c
        ));
        setTimeout(() => setPhase('anomaly-detection'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'anomaly-detection') {
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'anomaly' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setAgents(prev => prev.map(a => ({
          ...a,
          status: a.compromised ? 'compromised' : 'verified'
        })));
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'anomaly'
            ? {
                ...c,
                status: 'failed',
                finding: 'Cross-agent manipulation attempts detected'
              }
            : c
        ));
        setTimeout(() => setPhase('coordinated-response'), 800);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'coordinated-response') {
      setOrchestrationActive(true);
      setSecurityChecks(prev => prev.map(c =>
        c.id === 'coordination' ? { ...c, status: 'checking' } : c
      ));

      const timer = setTimeout(() => {
        setSecurityChecks(prev => prev.map(c =>
          c.id === 'coordination'
            ? {
                ...c,
                status: 'passed',
                finding: 'Coordinated defense activated across all agents'
              }
            : c
        ));
        setTimeout(() => setPhase('isolation'), 1000);
      }, 1800);
      return () => clearTimeout(timer);
    }

    if (phase === 'isolation') {
      const timer = setTimeout(() => {
        setAgents(prev => prev.map(a =>
          a.compromised ? { ...a, trustScore: 0 } : a
        ));
        setTimeout(() => setPhase('comparison'), 1500);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'comparison') {
      const items = ['isolated', 'orchestrated', 'impact'];
      items.forEach((item, index) => {
        setTimeout(() => {
          setRevealedComparisons(prev => new Set([...prev, item]));
          if (index === items.length - 1) {
            setTimeout(() => setPhase('complete'), 1000);
          }
        }, index * 600);
      });
    }
  }, [phase, animatedPhase, threats.length, agents]);

  const handleStart = () => {
    setPhase('operation');
    setAnimatedPhase(false);
    setAgents(scenario.agents);
    setThreats(scenario.threats);
    setSecurityChecks([
      {
        id: 'threat-model',
        name: 'Threat Modeling',
        description: 'Analyzing multi-agent attack surface',
        status: 'idle'
      },
      {
        id: 'trust',
        name: 'Trust Verification',
        description: 'Validating agent integrity and behavior',
        status: 'idle'
      },
      {
        id: 'anomaly',
        name: 'Anomaly Detection',
        description: 'Detecting suspicious inter-agent patterns',
        status: 'idle'
      },
      {
        id: 'coordination',
        name: 'Coordinated Defense',
        description: 'Orchestrating system-wide response',
        status: 'idle'
      }
    ]);
    setOrchestrationActive(false);
    setRevealedComparisons(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedScenario(s.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedScenario === s.id
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {scenario.name} MAESTRO Security
            </h3>
            <p className="text-gray-400 text-sm">
              Context: {scenario.context}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width:
                    phase === 'idle' ? '0%' :
                    phase === 'operation' ? '12.5%' :
                    phase === 'threat-modeling' ? '25%' :
                    phase === 'trust-verification' ? '37.5%' :
                    phase === 'anomaly-detection' ? '50%' :
                    phase === 'coordinated-response' ? '62.5%' :
                    phase === 'isolation' ? '75%' :
                    phase === 'comparison' ? '87.5%' :
                    '100%'
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span className={phase === 'operation' ? 'text-cyan-400 font-semibold' : ''}>Operation</span>
            <span className={phase === 'threat-modeling' ? 'text-cyan-400 font-semibold' : ''}>Threat</span>
            <span className={phase === 'trust-verification' ? 'text-cyan-400 font-semibold' : ''}>Trust</span>
            <span className={phase === 'anomaly-detection' ? 'text-cyan-400 font-semibold' : ''}>Anomaly</span>
            <span className={phase === 'coordinated-response' ? 'text-cyan-400 font-semibold' : ''}>Response</span>
            <span className={phase === 'isolation' ? 'text-cyan-400 font-semibold' : ''}>Isolate</span>
            <span className={phase === 'comparison' ? 'text-cyan-400 font-semibold' : ''}>Compare</span>
            <span className={phase === 'complete' ? 'text-cyan-400 font-semibold' : ''}>Done</span>
          </div>
        </div>

        {phase === 'idle' && (
          <div className="text-center py-8">
            <button
              onClick={handleStart}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start MAESTRO Security Orchestration
            </button>
          </div>
        )}

        {phase === 'operation' && (
          <div className={`transition-all duration-500 ${animatedPhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Multi-Agent System</h4>
              </div>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{agent.name}</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{agent.role}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${agent.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{agent.trustScore}% trust</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(phase === 'threat-modeling' || phase === 'trust-verification' || phase === 'anomaly-detection' || phase === 'coordinated-response' || phase === 'isolation') && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Network className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Agent Status</h4>
              </div>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div key={agent.id} className={`rounded p-3 border transition-all duration-500 ${
                    agent.status === 'compromised'
                      ? 'bg-red-500/10 border-red-500/30'
                      : agent.status === 'suspicious'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : agent.status === 'verified'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-gray-800 border-gray-700'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{agent.name}</span>
                      {agent.status === 'normal' && (
                        <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                          Normal
                        </span>
                      )}
                      {agent.status === 'suspicious' && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          Suspicious
                        </span>
                      )}
                      {agent.status === 'verified' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {agent.status === 'compromised' && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                          Compromised
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{agent.role}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            agent.status === 'compromised' ? 'bg-red-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${agent.trustScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{agent.trustScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {threats.some(t => t.detected) && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="font-semibold text-white">Detected Threats</h4>
                </div>
                <div className="space-y-3">
                  {threats.filter(t => t.detected).map((threat) => (
                    <div key={threat.id} className="bg-gray-800 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{threat.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {threat.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-2">{threat.description}</div>
                      <div className="text-xs text-gray-500">
                        Affected: {threat.affectedAgents.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Security Orchestration</h4>
              </div>
              <div className="space-y-3">
                {securityChecks.map((check) => (
                  <div key={check.id} className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{check.name}</span>
                      {check.status === 'idle' && (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                      {check.status === 'checking' && (
                        <span className="text-xs text-cyan-400">Checking...</span>
                      )}
                      {check.status === 'passed' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {check.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{check.description}</div>
                    {check.finding && (
                      <div className={`text-sm rounded p-2 ${
                        check.status === 'passed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {check.finding}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {orchestrationActive && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-cyan-400 mb-2">Coordinated Defense Active</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        All agents notified of compromised peer
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        Trust relationships updated system-wide
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        Compromised agent isolated from sensitive operations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        System integrity preserved through coordination
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(phase === 'comparison' || phase === 'complete') && (
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-4">System Comparison</h4>

            {revealedComparisons.has('isolated') && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-red-400 mb-2">Isolated Agent Security</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Each agent has independent security but no coordination
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Cross-agent attacks exploit security blind spots
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        No shared threat intelligence between agents
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        Compromised agent can manipulate entire system
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('orchestrated') && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-2">MAESTRO Security Orchestration</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Comprehensive threat modeling across all agents
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Continuous trust verification and behavior analysis
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Shared threat intelligence and coordinated response
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        Compromised agents detected and isolated automatically
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {revealedComparisons.has('impact') && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 transition-all duration-500">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-cyan-400 mb-2">Key Insight</div>
                    <p className="text-sm text-gray-300">
                      MAESTRO Multi-Agent Security Pattern provides comprehensive threat modeling and security
                      orchestration for multi-agent systems. By continuously verifying trust relationships, detecting
                      anomalies across agent interactions, and coordinating defense responses system-wide, it prevents
                      compromised agents from exploiting the trust and communication patterns that make multi-agent
                      systems vulnerable. This pattern is essential for secure deployment of coordinated AI systems.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {phase !== 'idle' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">How It Works</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-red-400">Threat Modeling:</span> Analyzes multi-agent attack surface and potential cross-agent vulnerabilities
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-yellow-400">Trust Verification:</span> Continuously validates agent integrity and behavior patterns
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Activity className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-purple-400">Anomaly Detection:</span> Identifies suspicious inter-agent communication and coordination
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-400">Coordinated Defense:</span> Orchestrates system-wide security response to isolate threats
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}