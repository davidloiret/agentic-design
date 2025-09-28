'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Database, Zap, Server, CheckCircle, Lock, TrendingUp, HardDrive } from 'lucide-react';

type Phase =
  | 'idle'
  | 'classify'
  | 'tier-placement'
  | 'cache-operation'
  | 'sync'
  | 'verification'
  | 'comparison'
  | 'complete';

interface DataItem {
  id: string;
  name: string;
  type: string;
  sensitivity: 'critical' | 'high' | 'medium' | 'low';
  accessFrequency: 'very-high' | 'high' | 'medium' | 'low';
  size: string;
  tier?: 1 | 2 | 3;
  cached?: boolean;
}

interface TierStatus {
  tier: 1 | 2 | 3;
  name: string;
  icon: any;
  itemCount: number;
  status: 'idle' | 'storing' | 'active';
  security: string;
  latency: string;
}

interface CacheMetrics {
  hits: number;
  misses: number;
  hitRate: number;
  avgLatency: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  dataItems: DataItem[];
  cacheMetrics: CacheMetrics;
  comparisonData: {
    singleTierLatency: string;
    hybridLatency: string;
    singleTierSecurity: string;
    hybridSecurity: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 'banking-app',
    name: 'Banking AI Assistant',
    description: 'Managing financial credentials and transaction data',
    dataItems: [
      { id: '1', name: 'Master Password', type: 'Credential', sensitivity: 'critical', accessFrequency: 'low', size: '128 B', tier: 3 },
      { id: '2', name: 'API Keys', type: 'Credential', sensitivity: 'critical', accessFrequency: 'medium', size: '256 B', tier: 1 },
      { id: '3', name: 'Session Token', type: 'Token', sensitivity: 'high', accessFrequency: 'very-high', size: '512 B', tier: 2, cached: true },
      { id: '4', name: 'Transaction History', type: 'Data', sensitivity: 'high', accessFrequency: 'high', size: '2 MB', tier: 2, cached: true },
      { id: '5', name: 'Account Balance', type: 'Data', sensitivity: 'medium', accessFrequency: 'very-high', size: '64 B', tier: 2, cached: true },
      { id: '6', name: 'User Preferences', type: 'Config', sensitivity: 'low', accessFrequency: 'medium', size: '4 KB', tier: 1 },
    ],
    cacheMetrics: {
      hits: 847,
      misses: 23,
      hitRate: 97.4,
      avgLatency: 12,
    },
    comparisonData: {
      singleTierLatency: '250-800ms (cloud only)',
      hybridLatency: '5-50ms (cached)',
      singleTierSecurity: 'Single point of failure',
      hybridSecurity: 'Multi-layer defense',
    },
  },
  {
    id: 'healthcare-app',
    name: 'Healthcare AI Assistant',
    description: 'Securing patient records and medical data',
    dataItems: [
      { id: '1', name: 'Encryption Keys', type: 'Key', sensitivity: 'critical', accessFrequency: 'low', size: '256 B', tier: 3 },
      { id: '2', name: 'Patient PHI', type: 'Medical', sensitivity: 'critical', accessFrequency: 'medium', size: '5 MB', tier: 3 },
      { id: '3', name: 'Doctor Notes', type: 'Medical', sensitivity: 'high', accessFrequency: 'high', size: '1 MB', tier: 2, cached: true },
      { id: '4', name: 'Medication List', type: 'Medical', sensitivity: 'high', accessFrequency: 'very-high', size: '128 KB', tier: 2, cached: true },
      { id: '5', name: 'Vital Signs', type: 'Medical', sensitivity: 'medium', accessFrequency: 'very-high', size: '64 KB', tier: 1, cached: true },
      { id: '6', name: 'Appointment Schedule', type: 'Data', sensitivity: 'low', accessFrequency: 'high', size: '16 KB', tier: 1 },
    ],
    cacheMetrics: {
      hits: 1243,
      misses: 41,
      hitRate: 96.8,
      avgLatency: 15,
    },
    comparisonData: {
      singleTierLatency: '300-1200ms (remote)',
      hybridLatency: '8-60ms (tiered)',
      singleTierSecurity: 'All data at risk if breached',
      hybridSecurity: 'Layered protection + isolation',
    },
  },
  {
    id: 'business-app',
    name: 'Business AI Assistant',
    description: 'Managing corporate documents and credentials',
    dataItems: [
      { id: '1', name: 'Root Certificates', type: 'Certificate', sensitivity: 'critical', accessFrequency: 'low', size: '4 KB', tier: 3 },
      { id: '2', name: 'OAuth Tokens', type: 'Token', sensitivity: 'critical', accessFrequency: 'high', size: '1 KB', tier: 1 },
      { id: '3', name: 'Confidential Docs', type: 'Document', sensitivity: 'high', accessFrequency: 'medium', size: '10 MB', tier: 3 },
      { id: '4', name: 'Meeting Transcripts', type: 'Document', sensitivity: 'high', accessFrequency: 'high', size: '3 MB', tier: 2, cached: true },
      { id: '5', name: 'Recent Files', type: 'Document', sensitivity: 'medium', accessFrequency: 'very-high', size: '8 MB', tier: 2, cached: true },
      { id: '6', name: 'Workspace Settings', type: 'Config', sensitivity: 'low', accessFrequency: 'medium', size: '32 KB', tier: 1 },
    ],
    cacheMetrics: {
      hits: 2134,
      misses: 87,
      hitRate: 96.1,
      avgLatency: 18,
    },
    comparisonData: {
      singleTierLatency: '400-1500ms (network)',
      hybridLatency: '10-80ms (hybrid)',
      singleTierSecurity: 'Vulnerable to network attacks',
      hybridSecurity: 'Defense in depth architecture',
    },
  },
];

const HSCMDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [animatedPhase, setAnimatedPhase] = useState<Phase | null>(null);
  const [classifiedItems, setClassifiedItems] = useState<DataItem[]>([]);
  const [tierStatuses, setTierStatuses] = useState<TierStatus[]>([
    { tier: 1, name: 'Local Device Vault', icon: HardDrive, itemCount: 0, status: 'idle', security: 'Hardware-encrypted', latency: '5ms' },
    { tier: 2, name: 'Edge Cache Layer', icon: Zap, itemCount: 0, status: 'idle', security: 'Encrypted cache', latency: '25ms' },
    { tier: 3, name: 'Remote Server Vault', icon: Server, itemCount: 0, status: 'idle', security: 'Multi-layer encryption', latency: '150ms' },
  ]);
  const [cacheOperations, setCacheOperations] = useState<Array<{ operation: string; item: string; status: 'pending' | 'complete' }>>([]);
  const [syncProgress, setSyncProgress] = useState(0);

  const scenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const startDemo = () => {
    setPhase('classify');
    setAnimatedPhase('classify');
    setClassifiedItems([]);
    setTierStatuses([
      { tier: 1, name: 'Local Device Vault', icon: HardDrive, itemCount: 0, status: 'idle', security: 'Hardware-encrypted', latency: '5ms' },
      { tier: 2, name: 'Edge Cache Layer', icon: Zap, itemCount: 0, status: 'idle', security: 'Encrypted cache', latency: '25ms' },
      { tier: 3, name: 'Remote Server Vault', icon: Server, itemCount: 0, status: 'idle', security: 'Multi-layer encryption', latency: '150ms' },
    ]);
    setCacheOperations([]);
    setSyncProgress(0);
  };

  const resetDemo = () => {
    setPhase('idle');
    setAnimatedPhase(null);
    setClassifiedItems([]);
    setTierStatuses([
      { tier: 1, name: 'Local Device Vault', icon: HardDrive, itemCount: 0, status: 'idle', security: 'Hardware-encrypted', latency: '5ms' },
      { tier: 2, name: 'Edge Cache Layer', icon: Zap, itemCount: 0, status: 'idle', security: 'Encrypted cache', latency: '25ms' },
      { tier: 3, name: 'Remote Server Vault', icon: Server, itemCount: 0, status: 'idle', security: 'Multi-layer encryption', latency: '150ms' },
    ]);
    setCacheOperations([]);
    setSyncProgress(0);
  };

  useEffect(() => {
    if (!animatedPhase) return;

    const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];
    const dataItems = currentScenario.dataItems;
    const dataItemsLength = dataItems.length;
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'classify' && classifiedItems.length === 0) {
      let currentIndex = 0;
      const classifyNext = () => {
        if (currentIndex >= dataItemsLength) {
          const timeout = setTimeout(() => setPhase('tier-placement'), 600);
          timeouts.push(timeout);
          return;
        }

        const item = dataItems[currentIndex];
        if (item) {
          setClassifiedItems(prev => [...prev, item]);
        }
        currentIndex++;
        const timeout = setTimeout(classifyNext, 300);
        timeouts.push(timeout);
      };
      classifyNext();
    } else if (phase === 'tier-placement') {
      dataItems.forEach((item, index) => {
        const timeout = setTimeout(() => {
          setTierStatuses(prev => prev.map(tier => {
            if (tier.tier === item.tier) {
              return { ...tier, itemCount: tier.itemCount + 1, status: 'storing' as const };
            }
            return tier;
          }));

          if (index === dataItemsLength - 1) {
            const timeout1 = setTimeout(() => {
              setTierStatuses(prev => prev.map(tier => ({ ...tier, status: 'active' as const })));
              const timeout2 = setTimeout(() => setPhase('cache-operation'), 500);
              timeouts.push(timeout2);
            }, 300);
            timeouts.push(timeout1);
          }
        }, index * 400);
        timeouts.push(timeout);
      });
    } else if (phase === 'cache-operation') {
      const cachedItems = dataItems.filter(item => item.cached);
      const ops = [
        { operation: 'Cache Hit', item: cachedItems[0]?.name || 'Session Token', status: 'pending' as const },
        { operation: 'Cache Hit', item: cachedItems[1]?.name || 'Transaction History', status: 'pending' as const },
        { operation: 'Cache Miss', item: 'Historical Data', status: 'pending' as const },
        { operation: 'Cache Promotion', item: cachedItems[2]?.name || 'Account Balance', status: 'pending' as const },
      ];

      setCacheOperations(ops);

      ops.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setCacheOperations(prev => prev.map((op, idx) =>
            idx === index ? { ...op, status: 'complete' } : op
          ));

          if (index === ops.length - 1) {
            const timeout2 = setTimeout(() => setPhase('sync'), 600);
            timeouts.push(timeout2);
          }
        }, index * 500);
        timeouts.push(timeout);
      });
    } else if (phase === 'sync') {
      let progress = 0;
      const syncInterval = setInterval(() => {
        progress += 10;
        setSyncProgress(progress);
        if (progress >= 100) {
          clearInterval(syncInterval);
          const timeout = setTimeout(() => setPhase('verification'), 500);
          timeouts.push(timeout);
        }
      }, 150);
      return () => {
        clearInterval(syncInterval);
        timeouts.forEach(t => clearTimeout(t));
      };
    } else if (phase === 'verification') {
      const timeout = setTimeout(() => setPhase('comparison'), 1000);
      timeouts.push(timeout);
    } else if (phase === 'comparison') {
      const timeout = setTimeout(() => setPhase('complete'), 1500);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [animatedPhase, phase, selectedScenario]);

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-purple-900/30 border-purple-500/30';
      case 2: return 'bg-cyan-900/30 border-cyan-500/30';
      case 3: return 'bg-blue-900/30 border-blue-500/30';
      default: return 'bg-slate-700/30 border-slate-500/30';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Hybrid Secret & Cache Management</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Application Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              disabled={phase !== 'idle'}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white disabled:opacity-50"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            {phase === 'idle' ? (
              <button
                onClick={startDemo}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/30"
              >
                <Database className="w-4 h-4" />
                Start Hybrid Storage
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
              >
                <Database className="w-4 h-4" />
                Start Hybrid Storage
              </button>
            )}
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {phase !== 'idle' && (
        <>
          {(phase === 'classify' || phase === 'tier-placement' || phase === 'cache-operation' || phase === 'sync' || phase === 'verification' || phase === 'comparison' || phase === 'complete') && classifiedItems.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold text-white">Data Classification</h4>
              </div>

              <div className="space-y-2">
                {classifiedItems.filter(item => item != null).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                    <div className="flex items-center gap-3 flex-1">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.type} • {item.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className={`${getSensitivityColor(item.sensitivity)}`}>
                        {item.sensitivity.charAt(0).toUpperCase() + item.sensitivity.slice(1)} Sensitivity
                      </div>
                      <div className="text-slate-400">
                        Access: {item.accessFrequency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(phase === 'tier-placement' || phase === 'cache-operation' || phase === 'sync' || phase === 'verification' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Three-Tier Storage Architecture</h4>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {tierStatuses.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div key={tier.tier} className={`p-4 rounded-lg border ${getTierColor(tier.tier)}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <div className="text-sm font-semibold text-white">Tier {tier.tier}</div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="text-slate-300">{tier.name}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Items:</span>
                          <span className="text-white font-medium">{tier.itemCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Security:</span>
                          <span className="text-green-400">{tier.security}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Latency:</span>
                          <span className="text-cyan-400">{tier.latency}</span>
                        </div>
                        <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${
                          tier.status === 'idle' ? 'bg-slate-700 text-slate-400' :
                          tier.status === 'storing' ? 'bg-yellow-900/40 text-yellow-200' :
                          'bg-green-900/40 text-green-200'
                        }`}>
                          {tier.status === 'idle' && '⏸️ Idle'}
                          {tier.status === 'storing' && '⏳ Storing'}
                          {tier.status === 'active' && '✓ Active'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(phase === 'cache-operation' || phase === 'sync' || phase === 'verification' || phase === 'comparison' || phase === 'complete') && cacheOperations.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Cache Operations</h4>
              </div>

              <div className="space-y-2">
                {cacheOperations.map((op, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded">
                    {op.status === 'pending' && <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />}
                    {op.status === 'complete' && <CheckCircle className="w-4 h-4 text-cyan-400" />}
                    <div className="flex-1">
                      <div className="text-sm text-white">{op.operation}</div>
                      <div className="text-xs text-slate-400">{op.item}</div>
                    </div>
                    {op.status === 'complete' && (
                      <span className="text-xs text-cyan-400 font-medium">
                        {op.operation.includes('Hit') ? '5ms' : op.operation.includes('Miss') ? '150ms' : '25ms'}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="bg-cyan-900/30 p-3 rounded">
                  <span className="text-cyan-400 font-medium">Cache Hits:</span>
                  <div className="text-cyan-200 mt-1">{scenario.cacheMetrics.hits}</div>
                </div>
                <div className="bg-cyan-900/30 p-3 rounded">
                  <span className="text-cyan-400 font-medium">Hit Rate:</span>
                  <div className="text-cyan-200 mt-1">{scenario.cacheMetrics.hitRate}%</div>
                </div>
                <div className="bg-cyan-900/30 p-3 rounded">
                  <span className="text-cyan-400 font-medium">Avg Latency:</span>
                  <div className="text-cyan-200 mt-1">{scenario.cacheMetrics.avgLatency}ms</div>
                </div>
              </div>
            </div>
          )}

          {(phase === 'sync' || phase === 'verification' || phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">Tier Synchronization</h4>
                {syncProgress === 100 && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Syncing data across all tiers</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-200"
                      style={{ width: `${syncProgress}%` }}
                    />
                  </div>
                </div>

                {syncProgress === 100 && (
                  <div className="text-xs text-green-300 bg-green-900/20 border border-green-500/30 p-3 rounded">
                    ✓ All tiers synchronized • Data consistency maintained • Backup complete
                  </div>
                )}
              </div>
            </div>
          )}

          {(phase === 'comparison' || phase === 'complete') && (
            <div className="bg-slate-800/30 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold text-white">Single-Tier vs Hybrid Multi-Tier</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-red-900/40 p-3 rounded">
                    <h5 className="font-semibold text-red-200 mb-2">Single-Tier Storage</h5>
                    <ul className="text-sm space-y-2 text-slate-300">
                      <li>• All data in one location</li>
                      <li>• Single point of failure</li>
                      <li>• No performance optimization</li>
                      <li>• Latency: {scenario.comparisonData.singleTierLatency}</li>
                      <li className="text-red-300 font-medium">• {scenario.comparisonData.singleTierSecurity}</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-900/40 p-3 rounded">
                    <h5 className="font-semibold text-green-200 mb-2">Hybrid Multi-Tier (HSCM)</h5>
                    <ul className="text-sm space-y-2 text-slate-300">
                      <li>• 3-tier architecture</li>
                      <li>• Distributed resilience</li>
                      <li>• Intelligent caching</li>
                      <li>• Latency: {scenario.comparisonData.hybridLatency}</li>
                      <li className="text-green-300 font-medium">• {scenario.comparisonData.hybridSecurity}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-cyan-200">
                    <strong>Real-World Impact:</strong> Hybrid multi-tier storage reduces access latency from {scenario.comparisonData.singleTierLatency} to {scenario.comparisonData.hybridLatency}, improves cache hit rate to {scenario.cacheMetrics.hitRate}%, and provides {scenario.comparisonData.hybridSecurity} with automatic tier synchronization and disaster recovery.
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HSCMDemo;