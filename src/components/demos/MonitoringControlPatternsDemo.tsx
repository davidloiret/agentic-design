'use client';

import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  StopCircle,
  RefreshCw,
  Shield,
  Cpu,
  MemoryStick,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Settings,
  Bell,
  Eye
} from 'lucide-react';

// Types for monitoring and control
type AgentStatus = 'running' | 'paused' | 'stopped' | 'error' | 'warning' | 'initializing';
type AlertSeverity = 'critical' | 'warning' | 'info';
type ControlAction = 'start' | 'pause' | 'stop' | 'restart' | 'intervene';
type SystemPhase = 'normal' | 'degraded' | 'critical' | 'recovering' | 'optimal';

interface Agent {
  id: string;
  name: string;
  type: 'processing' | 'monitoring' | 'analysis' | 'coordination';
  status: AgentStatus;
  cpu: number;
  memory: number;
  tasksCompleted: number;
  errorRate: number;
  responseTime: number;
  uptime: number;
}

interface Alert {
  id: string;
  agentId: string;
  severity: AlertSeverity;
  message: string;
  timestamp: number;
  acknowledged: boolean;
  resolved: boolean;
}

interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  systemLoad: number;
  averageResponseTime: number;
  successRate: number;
  alertsActive: number;
}

interface AuditLog {
  id: string;
  timestamp: number;
  action: ControlAction;
  target: string;
  operator: string;
  result: 'success' | 'failed';
  details: string;
}

export default function MonitoringControlPatternsDemo() {
  const [phase, setPhase] = useState<SystemPhase>('normal');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [autoMode, setAutoMode] = useState(true);

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Data Processor Alpha',
      type: 'processing',
      status: 'running',
      cpu: 45,
      memory: 62,
      tasksCompleted: 1247,
      errorRate: 0.2,
      responseTime: 124,
      uptime: 99.8
    },
    {
      id: 'agent-2',
      name: 'Monitor Beta',
      type: 'monitoring',
      status: 'running',
      cpu: 28,
      memory: 41,
      tasksCompleted: 3892,
      errorRate: 0.1,
      responseTime: 87,
      uptime: 99.9
    },
    {
      id: 'agent-3',
      name: 'Analyzer Gamma',
      type: 'analysis',
      status: 'running',
      cpu: 67,
      memory: 78,
      tasksCompleted: 892,
      errorRate: 0.5,
      responseTime: 245,
      uptime: 98.5
    },
    {
      id: 'agent-4',
      name: 'Coordinator Delta',
      type: 'coordination',
      status: 'running',
      cpu: 34,
      memory: 45,
      tasksCompleted: 2156,
      errorRate: 0.3,
      responseTime: 156,
      uptime: 99.2
    },
    {
      id: 'agent-5',
      name: 'Processor Epsilon',
      type: 'processing',
      status: 'running',
      cpu: 52,
      memory: 59,
      tasksCompleted: 1578,
      errorRate: 0.4,
      responseTime: 189,
      uptime: 98.9
    },
    {
      id: 'agent-6',
      name: 'Monitor Zeta',
      type: 'monitoring',
      status: 'running',
      cpu: 31,
      memory: 38,
      tasksCompleted: 4123,
      errorRate: 0.2,
      responseTime: 92,
      uptime: 99.7
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalAgents: 6,
    activeAgents: 6,
    systemLoad: 47,
    averageResponseTime: 148,
    successRate: 99.3,
    alertsActive: 0
  });

  // Simulate real-time updates and anomalies
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        const cpuChange = (Math.random() - 0.5) * 10;
        const memoryChange = (Math.random() - 0.5) * 8;
        const newCpu = Math.max(10, Math.min(95, agent.cpu + cpuChange));
        const newMemory = Math.max(20, Math.min(90, agent.memory + memoryChange));

        // Simulate anomaly for agent-3
        if (agent.id === 'agent-3' && phase === 'normal' && Math.random() > 0.95) {
          setPhase('degraded');
          createAlert(agent.id, 'warning', `High CPU usage detected: ${Math.round(newCpu)}%`);

          return {
            ...agent,
            cpu: 85,
            memory: 82,
            status: 'warning',
            errorRate: 2.5,
            responseTime: agent.responseTime * 1.5
          };
        }

        // Simulate critical issue
        if (agent.id === 'agent-3' && phase === 'degraded' && Math.random() > 0.9) {
          setPhase('critical');
          createAlert(agent.id, 'critical', 'Agent unresponsive - immediate intervention required');

          return {
            ...agent,
            status: 'error',
            cpu: 95,
            memory: 89,
            errorRate: 12.5,
            responseTime: 999
          };
        }

        return {
          ...agent,
          cpu: newCpu,
          memory: newMemory,
          tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 5),
          responseTime: Math.max(50, agent.responseTime + (Math.random() - 0.5) * 20)
        };
      }));

      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        systemLoad: Math.max(20, Math.min(85, prev.systemLoad + (Math.random() - 0.5) * 10)),
        averageResponseTime: Math.max(100, prev.averageResponseTime + (Math.random() - 0.5) * 15),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [phase]);

  const createAlert = (agentId: string, severity: AlertSeverity, message: string) => {
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      agentId,
      severity,
      message,
      timestamp: Date.now(),
      acknowledged: false,
      resolved: false
    };

    setAlerts(prev => [alert, ...prev]);
    setSystemMetrics(prev => ({
      ...prev,
      alertsActive: prev.alertsActive + 1
    }));
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const controlAgent = (agentId: string, action: ControlAction) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    // Log the action
    const logEntry: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      action,
      target: agent.name,
      operator: 'System Operator',
      result: 'success',
      details: `${action} command executed on ${agent.name}`
    };
    setAuditLog(prev => [logEntry, ...prev]);

    // Update agent status
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        switch (action) {
          case 'start':
            return { ...a, status: 'running' };
          case 'pause':
            return { ...a, status: 'paused' };
          case 'stop':
            return { ...a, status: 'stopped' };
          case 'restart':
            return { ...a, status: 'initializing' };
          case 'intervene':
            if (phase === 'critical') {
              setPhase('recovering');
              setTimeout(() => {
                setPhase('normal');
                setAlerts(prev => prev.map(alert =>
                  alert.agentId === agentId ? { ...alert, resolved: true } : alert
                ));
              }, 3000);
            }
            return { ...a, status: 'running', cpu: 45, memory: 55, errorRate: 0.3, responseTime: 150 };
          default:
            return a;
        }
      }
      return a;
    }));
  };

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'running': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'stopped': return 'text-gray-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'initializing': return 'text-blue-400';
    }
  };

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'stopped': return <StopCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'initializing': return <RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Monitor className="w-6 h-6 text-cyan-400" />
          Monitoring and Control Patterns Demo
        </h3>
        <p className="text-gray-400">
          Mission-control interface for real-time agent oversight and intervention
        </p>
      </div>

      {/* System Status Bar */}
      <div className={`mb-6 p-3 rounded-lg border flex items-center justify-between ${
        phase === 'critical' ? 'bg-red-500/10 border-red-500/30' :
        phase === 'degraded' || phase === 'recovering' ? 'bg-orange-500/10 border-orange-500/30' :
        'bg-green-500/10 border-green-500/30'
      }`}>
        <div className="flex items-center gap-3">
          <Shield className={`w-5 h-5 ${
            phase === 'critical' ? 'text-red-400' :
            phase === 'degraded' || phase === 'recovering' ? 'text-orange-400' :
            'text-green-400'
          }`} />
          <span className="font-medium">System Status: {phase.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400">Auto-Recovery:</span>
          <button
            onClick={() => setAutoMode(!autoMode)}
            className={`px-3 py-1 rounded ${
              autoMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {autoMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* System Metrics Overview */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Total Agents</div>
          <div className="text-2xl font-bold text-cyan-400">{systemMetrics.totalAgents}</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Active</div>
          <div className="text-2xl font-bold text-green-400">{systemMetrics.activeAgents}</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">System Load</div>
          <div className="text-2xl font-bold text-blue-400">{systemMetrics.systemLoad}%</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Avg Response</div>
          <div className="text-2xl font-bold text-purple-400">{systemMetrics.averageResponseTime}ms</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Success Rate</div>
          <div className="text-2xl font-bold text-green-400">{systemMetrics.successRate.toFixed(1)}%</div>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Active Alerts</div>
          <div className={`text-2xl font-bold ${
            systemMetrics.alertsActive > 0 ? 'text-orange-400' : 'text-gray-400'
          }`}>
            {systemMetrics.alertsActive}
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          Agent Fleet Status
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {agents.map(agent => (
            <div
              key={agent.id}
              className={`p-3 bg-gray-800 rounded border ${
                selectedAgent === agent.id ? 'border-cyan-500' : 'border-gray-700'
              } cursor-pointer hover:border-gray-600`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={getStatusColor(agent.status)}>
                    {getStatusIcon(agent.status)}
                  </span>
                  <span className="text-sm font-medium">{agent.name}</span>
                </div>
                <span className="text-xs text-gray-500 capitalize">{agent.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-gray-400" />
                  <span className={agent.cpu > 80 ? 'text-orange-400' : 'text-gray-300'}>
                    CPU: {Math.round(agent.cpu)}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MemoryStick className="w-3 h-3 text-gray-400" />
                  <span className={agent.memory > 80 ? 'text-orange-400' : 'text-gray-300'}>
                    MEM: {Math.round(agent.memory)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Tasks: {agent.tasksCompleted}</span>
                <span className={agent.errorRate > 1 ? 'text-orange-400' : ''}>
                  Errors: {agent.errorRate.toFixed(1)}%
                </span>
              </div>

              {/* Control Buttons */}
              {selectedAgent === agent.id && (
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      controlAgent(agent.id, agent.status === 'running' ? 'pause' : 'start');
                    }}
                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    {agent.status === 'running' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      controlAgent(agent.id, 'stop');
                    }}
                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    <StopCircle className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      controlAgent(agent.id, 'restart');
                    }}
                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  {agent.status === 'error' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        controlAgent(agent.id, 'intervene');
                      }}
                      className="p-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded"
                    >
                      <Zap className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-400" />
          Active Alerts
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {alerts.filter(a => !a.resolved).length > 0 ? (
            alerts.filter(a => !a.resolved).map(alert => (
              <div key={alert.id} className={`p-2 rounded border flex items-center justify-between ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{alert.message}</span>
                  <span className="text-xs text-gray-500">
                    {agents.find(a => a.id === alert.agentId)?.name}
                  </span>
                </div>
                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-3 bg-gray-800 rounded text-gray-500 text-sm text-center">
              No active alerts
            </div>
          )}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="p-3 bg-gray-800 rounded border border-gray-700">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          Audit Trail
        </h4>
        <div className="space-y-1 text-xs max-h-20 overflow-y-auto">
          {auditLog.slice(0, 5).map(log => (
            <div key={log.id} className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-cyan-400">{log.operator}</span>
              <span>executed</span>
              <span className="text-blue-400">{log.action}</span>
              <span>on</span>
              <span className="text-purple-400">{log.target}</span>
              <span className={log.result === 'success' ? 'text-green-400' : 'text-red-400'}>
                [{log.result}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}