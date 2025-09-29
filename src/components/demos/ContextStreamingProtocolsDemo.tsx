'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'streaming' | 'buffering' | 'flow-control' | 'synchronizing' | 'monitoring' | 'complete';
type StreamStatus = 'idle' | 'streaming' | 'throttled' | 'synced' | 'completed';

interface ContextStream {
  id: string;
  name: string;
  source: string;
  priority: 'high' | 'medium' | 'low';
  status: StreamStatus;
  updatesReceived: number;
  bytesTransferred: number;
  latencyMs: number;
  compressed: boolean;
}

interface BufferSlot {
  index: number;
  occupied: boolean;
  contextId?: string;
  size: number;
}

interface Subscriber {
  id: string;
  name: string;
  status: 'active' | 'throttled' | 'synced';
  updatesDelivered: number;
  latencyMs: number;
  backpressure: boolean;
}

interface Metrics {
  avgLatencyMs: number;
  throughputUpdatesPerSec: number;
  syncAccuracy: number;
  bufferUtilization: number;
  backpressureEvents: number;
  connectionStability: number;
}

const initialStreams: ContextStream[] = [
  { id: 'stream-1', name: 'Agent State Updates', source: 'agent-coordinator', priority: 'high', status: 'idle', updatesReceived: 0, bytesTransferred: 0, latencyMs: 0, compressed: false },
  { id: 'stream-2', name: 'User Collaboration', source: 'collab-editor', priority: 'high', status: 'idle', updatesReceived: 0, bytesTransferred: 0, latencyMs: 0, compressed: false },
  { id: 'stream-3', name: 'Sensor Data', source: 'iot-gateway', priority: 'medium', status: 'idle', updatesReceived: 0, bytesTransferred: 0, latencyMs: 0, compressed: false },
  { id: 'stream-4', name: 'Analytics Events', source: 'analytics-service', priority: 'low', status: 'idle', updatesReceived: 0, bytesTransferred: 0, latencyMs: 0, compressed: false },
];

const initialBuffer: BufferSlot[] = Array.from({ length: 12 }, (_, i) => ({
  index: i,
  occupied: false,
  size: 0,
}));

const initialSubscribers: Subscriber[] = [
  { id: 'sub-1', name: 'Dashboard', status: 'active', updatesDelivered: 0, latencyMs: 0, backpressure: false },
  { id: 'sub-2', name: 'Agent Network', status: 'active', updatesDelivered: 0, latencyMs: 0, backpressure: false },
  { id: 'sub-3', name: 'Archive Service', status: 'active', updatesDelivered: 0, latencyMs: 0, backpressure: false },
];

export default function ContextStreamingProtocolsDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [streams, setStreams] = useState<ContextStream[]>(initialStreams);
  const [buffer, setBuffer] = useState<BufferSlot[]>(initialBuffer);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [metrics, setMetrics] = useState<Metrics>({
    avgLatencyMs: 0,
    throughputUpdatesPerSec: 0,
    syncAccuracy: 0,
    bufferUtilization: 0,
    backpressureEvents: 0,
    connectionStability: 100,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('streaming'), 100));
    }

    else if (phase === 'streaming') {
      let streamIndex = 0;

      const processStream = () => {
        if (streamIndex >= initialStreams.length) {
          timeouts.push(setTimeout(() => setPhase('buffering'), 300));
          return;
        }

        const stream = initialStreams[streamIndex];
        const updatesReceived = Math.floor(Math.random() * 30) + 50;
        const bytesBase = updatesReceived * (Math.random() * 500 + 300);
        const bytesTransferred = Math.floor(bytesBase);
        const latencyMs = Math.floor(Math.random() * 15) + 5;

        setStreams(prev => prev.map(s =>
          s.id === stream.id
            ? { ...s, status: 'streaming', updatesReceived, bytesTransferred, latencyMs, compressed: false }
            : s
        ));

        streamIndex++;
        timeouts.push(setTimeout(processStream, 200));
      };

      processStream();
    }

    else if (phase === 'buffering') {
      const totalUpdates = initialStreams.reduce((sum, s) => {
        const stream = streams.find(st => st.id === s.id);
        return sum + (stream?.updatesReceived || 0);
      }, 0);

      const slotsToFill = Math.min(10, Math.floor(totalUpdates / 20));

      let slotIndex = 0;
      const fillSlot = () => {
        if (slotIndex >= slotsToFill) {
          const bufferUtilization = Math.floor((slotsToFill / initialBuffer.length) * 100);
          setMetrics(prev => ({ ...prev, bufferUtilization }));
          timeouts.push(setTimeout(() => setPhase('flow-control'), 300));
          return;
        }

        const contextId = initialStreams[slotIndex % initialStreams.length].id;
        const size = Math.floor(Math.random() * 70) + 30;

        setBuffer(prev => prev.map((slot, idx) =>
          idx === slotIndex
            ? { ...slot, occupied: true, contextId, size }
            : slot
        ));

        slotIndex++;
        timeouts.push(setTimeout(fillSlot, 100));
      };

      fillSlot();
    }

    else if (phase === 'flow-control') {
      const occupiedSlots = buffer.filter(s => s.occupied).length;
      const utilization = (occupiedSlots / buffer.length);

      if (utilization > 0.7) {
        setStreams(prev => prev.map(s => ({
          ...s,
          status: 'throttled' as StreamStatus
        })));

        setSubscribers(prev => prev.map((sub, idx) => ({
          ...sub,
          status: idx === 2 ? 'throttled' as const : sub.status,
          backpressure: idx === 2
        })));

        setMetrics(prev => ({
          ...prev,
          backpressureEvents: Math.floor(Math.random() * 3) + 2
        }));

        timeouts.push(setTimeout(() => {
          setStreams(prev => prev.map(s => ({
            ...s,
            compressed: true,
            bytesTransferred: Math.floor(s.bytesTransferred * 0.35)
          })));

          timeouts.push(setTimeout(() => setPhase('synchronizing'), 300));
        }, 400));
      } else {
        timeouts.push(setTimeout(() => setPhase('synchronizing'), 300));
      }
    }

    else if (phase === 'synchronizing') {
      let subIndex = 0;

      const syncSubscriber = () => {
        if (subIndex >= initialSubscribers.length) {
          setStreams(prev => prev.map(s => ({ ...s, status: 'synced' })));
          setMetrics(prev => ({
            ...prev,
            syncAccuracy: 97.5 + Math.random() * 2.5
          }));
          timeouts.push(setTimeout(() => setPhase('monitoring'), 300));
          return;
        }

        const sub = initialSubscribers[subIndex];
        const totalUpdates = streams.reduce((sum, s) => sum + s.updatesReceived, 0);
        const updatesDelivered = Math.floor(totalUpdates * (0.95 + Math.random() * 0.05));
        const latencyMs = Math.floor(Math.random() * 12) + 8;

        setSubscribers(prev => prev.map(s =>
          s.id === sub.id
            ? { ...s, status: 'synced', updatesDelivered, latencyMs, backpressure: false }
            : s
        ));

        subIndex++;
        timeouts.push(setTimeout(syncSubscriber, 200));
      };

      syncSubscriber();
    }

    else if (phase === 'monitoring') {
      const totalUpdates = streams.reduce((sum, s) => sum + s.updatesReceived, 0);
      const avgLatency = streams.reduce((sum, s) => sum + s.latencyMs, 0) / streams.length;
      const throughput = Math.floor(totalUpdates / 2.5);

      setMetrics(prev => ({
        ...prev,
        avgLatencyMs: avgLatency,
        throughputUpdatesPerSec: throughput,
        connectionStability: 99.2 + Math.random() * 0.8
      }));

      timeouts.push(setTimeout(() => setPhase('complete'), 400));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setStreams(initialStreams);
    setBuffer(initialBuffer);
    setSubscribers(initialSubscribers);
    setMetrics({
      avgLatencyMs: 0,
      throughputUpdatesPerSec: 0,
      syncAccuracy: 0,
      bufferUtilization: 0,
      backpressureEvents: 0,
      connectionStability: 100,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setStreams(initialStreams);
    setBuffer(initialBuffer);
    setSubscribers(initialSubscribers);
    setMetrics({
      avgLatencyMs: 0,
      throughputUpdatesPerSec: 0,
      syncAccuracy: 0,
      bufferUtilization: 0,
      backpressureEvents: 0,
      connectionStability: 100,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'streaming', 'buffering', 'flow-control', 'synchronizing', 'monitoring', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: StreamStatus | Subscriber['status']): string => {
    switch (status) {
      case 'streaming': return 'text-blue-400';
      case 'throttled': return 'text-yellow-400';
      case 'synced': return 'text-green-400';
      case 'completed': return 'text-green-400';
      case 'active': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Context Streaming Protocols</h3>
          <p className="text-gray-400 text-sm">
            Real-time context processing with buffering, flow control, and low-latency synchronization
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Streaming
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['streaming', 'buffering', 'flow-control', 'synchronizing', 'monitoring'] as const).map((p) => {
            const status = getPhaseStatus(p);
            return (
              <div
                key={p}
                className={`p-3 rounded-lg border ${
                  status === 'completed'
                    ? 'bg-green-500/10 border-green-500/30'
                    : status === 'active'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-gray-300 mb-1">
                  {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className={`text-xs ${
                  status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-blue-400' : 'text-gray-500'
                }`}>
                  {status === 'completed' ? '✓ Done' : status === 'active' ? '⟳ Running' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Context Streams</h4>
              <div className="space-y-2">
                {streams.map((stream) => (
                  <div
                    key={stream.id}
                    className="p-3 bg-slate-800 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-white">{stream.name}</div>
                        <div className="text-xs text-gray-400">{stream.source}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(stream.priority)}`}>
                        {stream.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={getStatusColor(stream.status)}>
                        {stream.status === 'idle' ? 'Idle' : stream.status === 'streaming' ? 'Streaming' : stream.status === 'throttled' ? 'Throttled' : stream.status === 'synced' ? 'Synced' : 'Completed'}
                      </span>
                      {stream.updatesReceived > 0 && (
                        <span className="text-gray-400">
                          {stream.updatesReceived} updates • {(stream.bytesTransferred / 1024).toFixed(1)}KB
                          {stream.compressed && <span className="text-green-400 ml-1">⚡ -65%</span>}
                        </span>
                      )}
                    </div>
                    {stream.latencyMs > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        Latency: {stream.latencyMs}ms
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Subscribers</h4>
              <div className="space-y-2">
                {subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className={`p-3 rounded-lg border ${
                      sub.backpressure
                        ? 'bg-yellow-500/5 border-yellow-500/30'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium text-white">{sub.name}</div>
                      <span className={getStatusColor(sub.status)}>
                        {sub.status === 'active' ? '⟳ Active' : sub.status === 'throttled' ? '⚠ Throttled' : '✓ Synced'}
                      </span>
                    </div>
                    {sub.updatesDelivered > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{sub.updatesDelivered} delivered</span>
                        <span className="text-gray-500">~{sub.latencyMs}ms</span>
                      </div>
                    )}
                    {sub.backpressure && (
                      <div className="mt-1 text-xs text-yellow-400">
                        ⚠ Backpressure applied
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Circular Buffer (12 slots)</h4>
              <div className="grid grid-cols-6 gap-2">
                {buffer.map((slot) => (
                  <div
                    key={slot.index}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                      slot.occupied
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xs font-mono text-gray-400">{slot.index}</div>
                      {slot.occupied && slot.size > 0 && (
                        <div className="text-[10px] text-blue-400">{slot.size}%</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Utilization: {metrics.bufferUtilization}%
                {metrics.bufferUtilization > 70 && (
                  <span className="text-yellow-400 ml-2">⚠ High load</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Streaming Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Avg Latency</span>
                    <span className={`text-sm font-mono ${
                      metrics.avgLatencyMs > 0
                        ? metrics.avgLatencyMs < 15 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.avgLatencyMs > 0 ? `${metrics.avgLatencyMs.toFixed(1)}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Throughput</span>
                    <span className={`text-sm font-mono ${
                      metrics.throughputUpdatesPerSec > 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {metrics.throughputUpdatesPerSec > 0 ? `${metrics.throughputUpdatesPerSec} u/s` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Sync Accuracy</span>
                    <span className={`text-sm font-mono ${
                      metrics.syncAccuracy > 0
                        ? metrics.syncAccuracy >= 95 ? 'text-green-400' : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {metrics.syncAccuracy > 0 ? `${metrics.syncAccuracy.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Backpressure Events</span>
                    <span className={`text-sm font-mono ${
                      metrics.backpressureEvents > 0 ? 'text-yellow-400' : 'text-gray-500'
                    }`}>
                      {metrics.backpressureEvents > 0 ? metrics.backpressureEvents : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Connection Stability</span>
                    <span className={`text-sm font-mono ${
                      metrics.connectionStability >= 99 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {metrics.connectionStability > 0 ? `${metrics.connectionStability.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {phase === 'complete' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-sm font-medium text-green-400 mb-2">
              ✓ Streaming Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Processed {streams.reduce((sum, s) => sum + s.updatesReceived, 0)} context updates across 4 streams</div>
              <div>• Delivered {subscribers.reduce((sum, s) => sum + s.updatesDelivered, 0)} updates to 3 subscribers</div>
              <div>• Applied delta compression (65% reduction) and flow control</div>
              <div>• Achieved {metrics.syncAccuracy.toFixed(1)}% synchronization accuracy with {metrics.avgLatencyMs.toFixed(1)}ms latency</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}