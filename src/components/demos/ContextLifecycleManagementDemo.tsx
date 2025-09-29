'use client';

import React, { useState, useEffect } from 'react';
import { GitBranch, Activity, CheckCircle, Clock, Shield, Archive, RotateCcw, FileText, User, AlertCircle } from 'lucide-react';

type Phase = 'idle' | 'versioning' | 'audit-trail' | 'governance' | 'retention' | 'recovery' | 'complete';
type ContextStatus = 'active' | 'archived' | 'deprecated' | 'recovered';
type AccessLevel = 'public' | 'restricted' | 'confidential';

interface ContextVersion {
  id: string;
  name: string;
  version: string;
  status: ContextStatus;
  accessLevel: AccessLevel;
  author: string;
  timestamp: string;
  changes: string[];
  auditLog: AuditEntry[];
  retentionDays: number;
  approved: boolean;
}

interface AuditEntry {
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

interface LifecycleMetrics {
  auditCoverage: number;
  complianceScore: number;
  versionIntegrity: number;
  accessControlAccuracy: number;
  retentionCompliance: number;
}

const initialContexts: ContextVersion[] = [
  {
    id: 'ctx1',
    name: 'Customer Data Context',
    version: '1.0.0',
    status: 'active',
    accessLevel: 'confidential',
    author: 'Alice Johnson',
    timestamp: '2025-09-20 10:30:00',
    changes: ['Initial creation'],
    auditLog: [],
    retentionDays: 365,
    approved: true
  },
  {
    id: 'ctx2',
    name: 'Product Catalog Context',
    version: '2.1.3',
    status: 'active',
    accessLevel: 'public',
    author: 'Bob Smith',
    timestamp: '2025-09-22 14:15:00',
    changes: ['Added new product categories'],
    auditLog: [],
    retentionDays: 730,
    approved: true
  },
  {
    id: 'ctx3',
    name: 'Analytics Context',
    version: '1.5.2',
    status: 'active',
    accessLevel: 'restricted',
    author: 'Carol Davis',
    timestamp: '2025-09-25 09:45:00',
    changes: ['Updated metrics definitions'],
    auditLog: [],
    retentionDays: 90,
    approved: false
  },
  {
    id: 'ctx4',
    name: 'Legacy API Context',
    version: '0.9.8',
    status: 'active',
    accessLevel: 'restricted',
    author: 'David Lee',
    timestamp: '2025-08-15 16:20:00',
    changes: ['Deprecated endpoints removed'],
    auditLog: [],
    retentionDays: 30,
    approved: true
  }
];

export default function ContextLifecycleManagementDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentContext, setCurrentContext] = useState<ContextVersion | null>(null);
  const [contexts, setContexts] = useState<ContextVersion[]>(initialContexts);

  const [metrics, setMetrics] = useState<LifecycleMetrics>({
    auditCoverage: 0,
    complianceScore: 0,
    versionIntegrity: 0,
    accessControlAccuracy: 0,
    retentionCompliance: 0
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Versioning Phase
    if (phase === 'versioning') {
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          timeouts.push(setTimeout(() => setPhase('audit-trail'), 300));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext(context);

        timeouts.push(setTimeout(() => {
          // Increment version
          const versionParts = context.version.split('.');
          const newVersion = `${versionParts[0]}.${parseInt(versionParts[1]) + 1}.0`;

          setContexts(prev => prev.map(c =>
            c.id === context.id ? {
              ...c,
              version: newVersion,
              changes: [...c.changes, 'Version updated via lifecycle management']
            } : c
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 120));
        }, 150));
      };

      processNext();
    }

    // Audit Trail Phase
    if (phase === 'audit-trail') {
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          timeouts.push(setTimeout(() => setPhase('governance'), 300));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext(context);

        timeouts.push(setTimeout(() => {
          const auditEntry: AuditEntry = {
            action: 'VERSION_UPDATE',
            user: context.author,
            timestamp: new Date().toISOString(),
            details: `Updated to version ${context.version}`
          };

          setContexts(prev => prev.map(c =>
            c.id === context.id ? {
              ...c,
              auditLog: [...c.auditLog, auditEntry]
            } : c
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 130));
        }, 160));
      };

      processNext();
    }

    // Governance Phase
    if (phase === 'governance') {
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          timeouts.push(setTimeout(() => setPhase('retention'), 300));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext(context);

        timeouts.push(setTimeout(() => {
          // Check access controls and approval status
          const requiresApproval = context.accessLevel === 'confidential' || context.accessLevel === 'restricted';
          const isApproved = !requiresApproval || Math.random() > 0.2;

          const auditEntry: AuditEntry = {
            action: 'GOVERNANCE_CHECK',
            user: 'System',
            timestamp: new Date().toISOString(),
            details: isApproved ? 'Access controls verified' : 'Pending approval'
          };

          setContexts(prev => prev.map(c =>
            c.id === context.id ? {
              ...c,
              approved: isApproved,
              auditLog: [...c.auditLog, auditEntry]
            } : c
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 140));
        }, 170));
      };

      processNext();
    }

    // Retention Phase
    if (phase === 'retention') {
      let contextIndex = 0;

      const processNext = () => {
        if (contextIndex >= initialContexts.length) {
          setCurrentContext(null);
          timeouts.push(setTimeout(() => setPhase('recovery'), 300));
          return;
        }

        const context = initialContexts[contextIndex];
        setCurrentContext(context);

        timeouts.push(setTimeout(() => {
          // Apply retention policies
          const shouldArchive = context.retentionDays < 60 || Math.random() < 0.25;
          const newStatus: ContextStatus = shouldArchive ? 'archived' : context.status;

          const auditEntry: AuditEntry = {
            action: shouldArchive ? 'ARCHIVED' : 'RETENTION_CHECK',
            user: 'System',
            timestamp: new Date().toISOString(),
            details: shouldArchive ? `Archived after ${context.retentionDays} days retention` : 'Retention policy compliant'
          };

          setContexts(prev => prev.map(c =>
            c.id === context.id ? {
              ...c,
              status: newStatus,
              auditLog: [...c.auditLog, auditEntry]
            } : c
          ));

          contextIndex++;
          timeouts.push(setTimeout(processNext, 130));
        }, 160));
      };

      processNext();
    }

    // Recovery Phase
    if (phase === 'recovery') {
      // Find one archived context to recover
      const archivedContext = contexts.find(c => c.status === 'archived');

      if (archivedContext) {
        setCurrentContext(archivedContext);

        timeouts.push(setTimeout(() => {
          const auditEntry: AuditEntry = {
            action: 'RECOVERED',
            user: 'Admin User',
            timestamp: new Date().toISOString(),
            details: 'Context recovered from archive'
          };

          setContexts(prev => prev.map(c =>
            c.id === archivedContext.id ? {
              ...c,
              status: 'recovered',
              auditLog: [...c.auditLog, auditEntry]
            } : c
          ));

          setCurrentContext(null);
          timeouts.push(setTimeout(() => {
            // Calculate final metrics
            const auditCoverage = 100;
            const complianceScore = 92 + Math.random() * 6;
            const versionIntegrity = 95 + Math.random() * 5;
            const accessControlAccuracy = 98 + Math.random() * 2;
            const retentionCompliance = 94 + Math.random() * 5;

            setMetrics({
              auditCoverage,
              complianceScore,
              versionIntegrity,
              accessControlAccuracy,
              retentionCompliance
            });

            setPhase('complete');
            setIsRunning(false);
          }, 600));
        }, 800));
      } else {
        timeouts.push(setTimeout(() => {
          const auditCoverage = 100;
          const complianceScore = 92 + Math.random() * 6;
          const versionIntegrity = 95 + Math.random() * 5;
          const accessControlAccuracy = 98 + Math.random() * 2;
          const retentionCompliance = 94 + Math.random() * 5;

          setMetrics({
            auditCoverage,
            complianceScore,
            versionIntegrity,
            accessControlAccuracy,
            retentionCompliance
          });

          setPhase('complete');
          setIsRunning(false);
        }, 600));
      }
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('versioning');
    setCurrentContext(null);
    setContexts(initialContexts);
    setMetrics({
      auditCoverage: 0,
      complianceScore: 0,
      versionIntegrity: 0,
      accessControlAccuracy: 0,
      retentionCompliance: 0
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentContext(null);
    setContexts(initialContexts);
    setMetrics({
      auditCoverage: 0,
      complianceScore: 0,
      versionIntegrity: 0,
      accessControlAccuracy: 0,
      retentionCompliance: 0
    });
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'versioning': return 'Version control and semantic versioning...';
      case 'audit-trail': return 'Creating audit trails...';
      case 'governance': return 'Applying access controls and approvals...';
      case 'retention': return 'Enforcing retention policies...';
      case 'recovery': return 'Testing recovery mechanisms...';
      case 'complete': return 'Lifecycle Management Complete';
      default: return 'Ready to manage lifecycle';
    }
  };

  const getAccessLevelColor = (level: AccessLevel) => {
    switch (level) {
      case 'public': return 'text-green-400 bg-green-500/20';
      case 'restricted': return 'text-yellow-400 bg-yellow-500/20';
      case 'confidential': return 'text-red-400 bg-red-500/20';
    }
  };

  const getStatusColor = (status: ContextStatus) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'archived': return 'text-gray-400 bg-gray-500/20';
      case 'deprecated': return 'text-orange-400 bg-orange-500/20';
      case 'recovered': return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Context Lifecycle Management</h3>
            <p className="text-sm text-gray-400">Enterprise Versioning & Compliance</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase !== 'complete' && (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Start Lifecycle
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
      <div className="mb-6 p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isRunning ? 'text-violet-400 animate-pulse' : 'text-gray-400'}`} />
            <span className="font-semibold text-white">{getPhaseLabel()}</span>
          </div>
        </div>
      </div>

      {/* Lifecycle Stages Progress */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { id: 'versioning', label: 'Version Control', icon: GitBranch },
          { id: 'audit-trail', label: 'Audit Trail', icon: FileText },
          { id: 'governance', label: 'Governance', icon: Shield },
          { id: 'retention', label: 'Retention', icon: Archive },
          { id: 'recovery', label: 'Recovery', icon: RotateCcw }
        ].map((stage) => (
          <div
            key={stage.id}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              phase === stage.id ? 'bg-violet-500/10 border-violet-500/50' :
              ['versioning', 'audit-trail', 'governance', 'retention', 'recovery'].indexOf(phase) > ['versioning', 'audit-trail', 'governance', 'retention', 'recovery'].indexOf(stage.id) ? 'bg-green-500/10 border-green-500/50' :
              'bg-slate-800/50 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <stage.icon className={`w-4 h-4 ${
                phase === stage.id ? 'text-violet-400' :
                ['versioning', 'audit-trail', 'governance', 'retention', 'recovery'].indexOf(phase) > ['versioning', 'audit-trail', 'governance', 'retention', 'recovery'].indexOf(stage.id) ? 'text-green-400' :
                'text-gray-400'
              }`} />
              <div className="text-xs font-semibold text-white">{stage.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Context Display */}
      {currentContext && (
        <div className="mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h4 className="font-semibold text-white">Processing Context</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="font-medium text-white">{currentContext.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                Version: {currentContext.version} • By: {currentContext.author}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${getAccessLevelColor(currentContext.accessLevel)}`}>
                {currentContext.accessLevel}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(currentContext.status)}`}>
                {currentContext.status}
              </span>
              <Activity className="w-4 h-4 text-cyan-400 animate-spin ml-auto" />
            </div>
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
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Version</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Status</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Access</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Approved</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Audit Logs</th>
                <th className="text-center px-3 py-2 text-gray-300 font-semibold">Retention</th>
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
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-white font-medium">{context.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      <User className="w-3 h-3 inline mr-1" />
                      {context.author}
                    </div>
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className="text-violet-400 font-mono font-semibold">{context.version}</span>
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(context.status)}`}>
                      {context.status}
                    </span>
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className={`text-xs px-2 py-1 rounded ${getAccessLevelColor(context.accessLevel)}`}>
                      {context.accessLevel}
                    </span>
                  </td>
                  <td className="text-center px-3 py-2">
                    {context.approved ? (
                      <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400 mx-auto" />
                    )}
                  </td>
                  <td className="text-center px-3 py-2">
                    <span className="text-gray-300">{context.auditLog.length} entries</span>
                  </td>
                  <td className="text-center px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-300">{context.retentionDays}d</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lifecycle Metrics */}
      {(phase === 'complete') && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/30">
            <div className="text-xs text-gray-400 mb-1">Audit Coverage</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.auditCoverage.toFixed(0)}%</div>
            <div className="text-xs text-gray-400 mt-1">All changes tracked</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg p-4 border border-green-500/30">
            <div className="text-xs text-gray-400 mb-1">Compliance Score</div>
            <div className="text-2xl font-bold text-green-400">{metrics.complianceScore.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Regulatory compliance</div>
          </div>

          <div className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 rounded-lg p-4 border border-violet-500/30">
            <div className="text-xs text-gray-400 mb-1">Version Integrity</div>
            <div className="text-2xl font-bold text-violet-400">{metrics.versionIntegrity.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Rollback success</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/30">
            <div className="text-xs text-gray-400 mb-1">Access Control</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.accessControlAccuracy.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Unauthorized blocked</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg p-4 border border-pink-500/30">
            <div className="text-xs text-gray-400 mb-1">Retention</div>
            <div className="text-2xl font-bold text-pink-400">{metrics.retentionCompliance.toFixed(1)}%</div>
            <div className="text-xs text-gray-400 mt-1">Policy enforcement</div>
          </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="mt-4 p-3 rounded-lg border bg-green-500/10 border-green-500/30">
          <div className="text-sm text-white">
            ✓ Context lifecycle management complete. All contexts versioned, audited, governed, and compliant with retention policies.
          </div>
        </div>
      )}
    </div>
  );
}