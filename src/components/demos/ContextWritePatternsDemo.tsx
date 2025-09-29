'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = 'idle' | 'scratchpad-setup' | 'note-structure' | 'write-operations' | 'session-persistence' | 'overflow-handling' | 'complete';
type WriteStatus = 'pending' | 'writing' | 'persisted' | 'restored';
type FileType = 'scratchpad' | 'note' | 'reasoning' | 'code' | 'metadata';

interface WriteOperation {
  id: string;
  type: FileType;
  name: string;
  path: string;
  content: string;
  sizeKB: number;
  status: WriteStatus;
  timestamp?: string;
}

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  sizeKB?: number;
  fileType?: FileType;
  children?: FileNode[];
}

interface SessionMetrics {
  totalWrites: number;
  totalSizeKB: number;
  compressionRatio: number;
  retrievalTimeMs: number;
  sessionContinuity: number;
  contextIntegrity: number;
  overflowHandled: boolean;
}

const initialOperations: WriteOperation[] = [
  { id: 'write-1', type: 'scratchpad', name: 'Initial Thoughts', path: '/workspace/thoughts.md', content: 'Analyzing user requirements...', sizeKB: 2.4, status: 'pending' },
  { id: 'write-2', type: 'note', name: 'Research Findings', path: '/notes/research/findings.json', content: '{"sources": 12, "key_insights": 8}', sizeKB: 5.2, status: 'pending' },
  { id: 'write-3', type: 'reasoning', name: 'Problem Breakdown', path: '/reasoning/steps/step_001.md', content: 'Step 1: Decompose problem...', sizeKB: 3.8, status: 'pending' },
  { id: 'write-4', type: 'code', name: 'Implementation Draft', path: '/code/drafts/solution.py', content: 'def solve_problem():\n    pass', sizeKB: 4.6, status: 'pending' },
  { id: 'write-5', type: 'note', name: 'Decision Log', path: '/notes/decisions/dec_001.yaml', content: 'decision: use_approach_A\nrationale: ...', sizeKB: 3.2, status: 'pending' },
  { id: 'write-6', type: 'reasoning', name: 'Alternative Analysis', path: '/reasoning/steps/step_002.md', content: 'Evaluating alternatives...', sizeKB: 4.1, status: 'pending' },
  { id: 'write-7', type: 'metadata', name: 'Session State', path: '/.session/state.json', content: '{"context_tokens": 8500}', sizeKB: 1.8, status: 'pending' },
];

const initialFileTree: FileNode = {
  name: 'external_memory',
  type: 'folder',
  path: '/',
  children: [
    { name: 'workspace', type: 'folder', path: '/workspace', children: [] },
    { name: 'notes', type: 'folder', path: '/notes', children: [
      { name: 'research', type: 'folder', path: '/notes/research', children: [] },
      { name: 'decisions', type: 'folder', path: '/notes/decisions', children: [] },
    ]},
    { name: 'reasoning', type: 'folder', path: '/reasoning', children: [
      { name: 'steps', type: 'folder', path: '/reasoning/steps', children: [] },
    ]},
    { name: 'code', type: 'folder', path: '/code', children: [
      { name: 'drafts', type: 'folder', path: '/code/drafts', children: [] },
    ]},
    { name: '.session', type: 'folder', path: '/.session', children: [] },
  ]
};

export default function ContextWritePatternsDemo() {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [operations, setOperations] = useState<WriteOperation[]>(initialOperations);
  const [fileTree, setFileTree] = useState<FileNode>(initialFileTree);
  const [contextUsage, setContextUsage] = useState({ current: 0, limit: 10000, external: 0 });
  const [metrics, setMetrics] = useState<SessionMetrics>({
    totalWrites: 0,
    totalSizeKB: 0,
    compressionRatio: 0,
    retrievalTimeMs: 0,
    sessionContinuity: 0,
    contextIntegrity: 0,
    overflowHandled: false,
  });

  useEffect(() => {
    if (!isRunning) return;

    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 'idle') {
      timeouts.push(setTimeout(() => setPhase('scratchpad-setup'), 100));
    }

    else if (phase === 'scratchpad-setup') {
      setContextUsage(prev => ({ ...prev, current: 2500 }));

      const scratchpadOps = initialOperations.filter(op => op.type === 'scratchpad');

      let opIndex = 0;
      const processOp = () => {
        if (opIndex >= scratchpadOps.length) {
          timeouts.push(setTimeout(() => setPhase('note-structure'), 300));
          return;
        }

        const op = scratchpadOps[opIndex];
        const timestamp = new Date().toISOString();

        setOperations(prev => prev.map(o =>
          o.id === op.id
            ? { ...o, status: 'writing' as WriteStatus, timestamp }
            : o
        ));

        timeouts.push(setTimeout(() => {
          setOperations(prev => prev.map(o =>
            o.id === op.id
              ? { ...o, status: 'persisted' as WriteStatus }
              : o
          ));

          addFileToTree(op.path, op.name, op.sizeKB, op.type);

          opIndex++;
          timeouts.push(setTimeout(processOp, 200));
        }, 300));
      };

      processOp();
    }

    else if (phase === 'note-structure') {
      setContextUsage(prev => ({ ...prev, current: 4800 }));

      const noteOps = initialOperations.filter(op => op.type === 'note');

      let opIndex = 0;
      const processOp = () => {
        if (opIndex >= noteOps.length) {
          timeouts.push(setTimeout(() => setPhase('write-operations'), 300));
          return;
        }

        const op = noteOps[opIndex];
        const timestamp = new Date().toISOString();

        setOperations(prev => prev.map(o =>
          o.id === op.id
            ? { ...o, status: 'writing' as WriteStatus, timestamp }
            : o
        ));

        timeouts.push(setTimeout(() => {
          setOperations(prev => prev.map(o =>
            o.id === op.id
              ? { ...o, status: 'persisted' as WriteStatus }
              : o
          ));

          addFileToTree(op.path, op.name, op.sizeKB, op.type);

          opIndex++;
          timeouts.push(setTimeout(processOp, 200));
        }, 300));
      };

      processOp();
    }

    else if (phase === 'write-operations') {
      setContextUsage(prev => ({ ...prev, current: 7200 }));

      const writeOps = initialOperations.filter(op => op.type === 'reasoning' || op.type === 'code');

      let opIndex = 0;
      const processOp = () => {
        if (opIndex >= writeOps.length) {
          const totalSize = operations
            .filter(op => op.status === 'persisted')
            .reduce((sum, op) => sum + op.sizeKB, 0);

          setMetrics(prev => ({
            ...prev,
            totalWrites: operations.filter(op => op.status === 'persisted').length,
            totalSizeKB: totalSize,
          }));

          setContextUsage(prev => ({ ...prev, external: Math.floor(totalSize * 100) }));

          timeouts.push(setTimeout(() => setPhase('session-persistence'), 300));
          return;
        }

        const op = writeOps[opIndex];
        const timestamp = new Date().toISOString();

        setOperations(prev => prev.map(o =>
          o.id === op.id
            ? { ...o, status: 'writing' as WriteStatus, timestamp }
            : o
        ));

        timeouts.push(setTimeout(() => {
          setOperations(prev => prev.map(o =>
            o.id === op.id
              ? { ...o, status: 'persisted' as WriteStatus }
              : o
          ));

          addFileToTree(op.path, op.name, op.sizeKB, op.type);

          opIndex++;
          timeouts.push(setTimeout(processOp, 200));
        }, 300));
      };

      processOp();
    }

    else if (phase === 'session-persistence') {
      const metadataOp = initialOperations.find(op => op.type === 'metadata');

      if (metadataOp) {
        const timestamp = new Date().toISOString();

        setOperations(prev => prev.map(o =>
          o.id === metadataOp.id
            ? { ...o, status: 'writing' as WriteStatus, timestamp }
            : o
        ));

        timeouts.push(setTimeout(() => {
          setOperations(prev => prev.map(o =>
            o.id === metadataOp.id
              ? { ...o, status: 'persisted' as WriteStatus }
              : o
          ));

          addFileToTree(metadataOp.path, metadataOp.name, metadataOp.sizeKB, metadataOp.type);

          const uncompressed = operations.reduce((sum, op) => sum + op.sizeKB, 0);
          const compressed = uncompressed * 0.42;
          const compressionRatio = Math.round((1 - compressed / uncompressed) * 100);

          setMetrics(prev => ({
            ...prev,
            compressionRatio,
            retrievalTimeMs: Math.floor(Math.random() * 30) + 15,
            sessionContinuity: 96.5 + Math.random() * 3.5,
            contextIntegrity: 98.2 + Math.random() * 1.8,
          }));

          timeouts.push(setTimeout(() => setPhase('overflow-handling'), 400));
        }, 400));
      }
    }

    else if (phase === 'overflow-handling') {
      setContextUsage(prev => ({ ...prev, current: 9800 }));

      timeouts.push(setTimeout(() => {
        setContextUsage(prev => ({ ...prev, current: 10200 }));

        timeouts.push(setTimeout(() => {
          setContextUsage(prev => ({ ...prev, current: 8200 }));

          setMetrics(prev => ({
            ...prev,
            overflowHandled: true,
          }));

          timeouts.push(setTimeout(() => setPhase('complete'), 400));
        }, 500));
      }, 400));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [phase, isRunning]);

  const addFileToTree = (path: string, name: string, sizeKB: number, fileType: FileType) => {
    setFileTree(prev => {
      const newTree = JSON.parse(JSON.stringify(prev));

      const pathParts = path.split('/').filter(p => p);
      const fileName = pathParts.pop();

      let currentNode = newTree;
      for (const part of pathParts) {
        if (!currentNode.children) currentNode.children = [];
        let childNode = currentNode.children.find((c: FileNode) => c.name === part);
        if (!childNode) {
          childNode = { name: part, type: 'folder', path: `${currentNode.path}${part}/`, children: [] };
          currentNode.children.push(childNode);
        }
        currentNode = childNode;
      }

      if (fileName && currentNode.children) {
        const existingFile = currentNode.children.find((c: FileNode) => c.name === fileName);
        if (!existingFile) {
          currentNode.children.push({
            name: fileName,
            type: 'file',
            path,
            sizeKB,
            fileType,
          });
        }
      }

      return newTree;
    });
  };

  const handleStart = () => {
    setIsRunning(true);
    setPhase('idle');
    setOperations(initialOperations);
    setFileTree(initialFileTree);
    setContextUsage({ current: 0, limit: 10000, external: 0 });
    setMetrics({
      totalWrites: 0,
      totalSizeKB: 0,
      compressionRatio: 0,
      retrievalTimeMs: 0,
      sessionContinuity: 0,
      contextIntegrity: 0,
      overflowHandled: false,
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('idle');
    setOperations(initialOperations);
    setFileTree(initialFileTree);
    setContextUsage({ current: 0, limit: 10000, external: 0 });
    setMetrics({
      totalWrites: 0,
      totalSizeKB: 0,
      compressionRatio: 0,
      retrievalTimeMs: 0,
      sessionContinuity: 0,
      contextIntegrity: 0,
      overflowHandled: false,
    });
  };

  const getPhaseStatus = (targetPhase: PhaseType): 'pending' | 'active' | 'completed' => {
    const phaseOrder: PhaseType[] = ['idle', 'scratchpad-setup', 'note-structure', 'write-operations', 'session-persistence', 'overflow-handling', 'complete'];
    const currentIndex = phaseOrder.indexOf(phase);
    const targetIndex = phaseOrder.indexOf(targetPhase);

    if (currentIndex > targetIndex) return 'completed';
    if (currentIndex === targetIndex) return 'active';
    return 'pending';
  };

  const getStatusColor = (status: WriteStatus): string => {
    switch (status) {
      case 'writing': return 'text-blue-400';
      case 'persisted': return 'text-green-400';
      case 'restored': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getFileTypeColor = (fileType: FileType): string => {
    switch (fileType) {
      case 'scratchpad': return 'text-yellow-400';
      case 'note': return 'text-blue-400';
      case 'reasoning': return 'text-purple-400';
      case 'code': return 'text-green-400';
      case 'metadata': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getFileTypeIcon = (fileType: FileType): string => {
    switch (fileType) {
      case 'scratchpad': return '📝';
      case 'note': return '📋';
      case 'reasoning': return '🧠';
      case 'code': return '💻';
      case 'metadata': return '⚙️';
      default: return '📄';
    }
  };

  const renderFileTree = (node: FileNode, depth: number = 0): React.ReactNode => {
    return (
      <div key={node.path} style={{ marginLeft: `${depth * 16}px` }}>
        <div className="flex items-center gap-2 py-1">
          <span className="text-xs text-gray-500">
            {node.type === 'folder' ? '📁' : getFileTypeIcon(node.fileType || 'note')}
          </span>
          <span className={`text-xs ${node.type === 'folder' ? 'text-gray-300' : 'text-gray-400'}`}>
            {node.name}
          </span>
          {node.type === 'file' && node.sizeKB && (
            <span className="text-[10px] text-gray-600">
              {node.sizeKB}KB
            </span>
          )}
        </div>
        {node.children && node.children.length > 0 && (
          <div>
            {node.children.map(child => renderFileTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const contextPercentage = Math.min(100, (contextUsage.current / contextUsage.limit) * 100);
  const isOverflow = contextUsage.current > contextUsage.limit;

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Context Write Patterns</h3>
          <p className="text-gray-400 text-sm">
            Systematic externalization through scratchpads, notes, and file system integration for unlimited persistent context
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Start Writing
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {(['scratchpad-setup', 'note-structure', 'write-operations', 'session-persistence', 'overflow-handling'] as const).map((p) => {
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-300">Context Window Usage</h4>
            <span className={`text-xs font-mono ${isOverflow ? 'text-red-400' : 'text-gray-400'}`}>
              {contextUsage.current.toLocaleString()} / {contextUsage.limit.toLocaleString()} tokens
              {isOverflow && ' (OVERFLOW)'}
            </span>
          </div>
          <div className="h-6 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-500 ${
                isOverflow ? 'bg-red-500/40' : contextPercentage > 80 ? 'bg-yellow-500/40' : 'bg-blue-500/40'
              }`}
              style={{ width: `${Math.min(100, contextPercentage)}%` }}
            />
          </div>
          {contextUsage.external > 0 && (
            <div className="mt-2 text-xs text-green-400">
              ✓ {contextUsage.external.toLocaleString()} tokens externalized to files
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Write Operations</h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {operations.map((op) => (
                  <div
                    key={op.id}
                    className={`p-3 rounded-lg border ${
                      op.status === 'writing'
                        ? 'bg-blue-500/10 border-blue-500/30'
                        : op.status === 'persisted'
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getFileTypeIcon(op.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-white">{op.name}</div>
                          <div className="text-xs text-gray-400 font-mono">{op.path}</div>
                        </div>
                      </div>
                      <span className={`text-xs ${getStatusColor(op.status)}`}>
                        {op.status === 'pending' ? 'Pending' : op.status === 'writing' ? '⟳ Writing' : '✓ Persisted'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className={getFileTypeColor(op.type)}>
                        {op.type}
                      </span>
                      <span className="text-gray-500">{op.sizeKB}KB</span>
                    </div>
                    {op.timestamp && (
                      <div className="text-[10px] text-gray-600 mt-1">
                        {new Date(op.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">File System Hierarchy</h4>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 max-h-[250px] overflow-y-auto font-mono">
                {renderFileTree(fileTree)}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Storage Metrics</h4>
              <div className="space-y-2">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Total Writes</span>
                    <span className={`text-sm font-mono ${metrics.totalWrites > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {metrics.totalWrites > 0 ? metrics.totalWrites : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Total Size</span>
                    <span className={`text-sm font-mono ${metrics.totalSizeKB > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                      {metrics.totalSizeKB > 0 ? `${metrics.totalSizeKB.toFixed(1)}KB` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Compression Ratio</span>
                    <span className={`text-sm font-mono ${metrics.compressionRatio > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {metrics.compressionRatio > 0 ? `${metrics.compressionRatio}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Retrieval Time</span>
                    <span className={`text-sm font-mono ${metrics.retrievalTimeMs > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                      {metrics.retrievalTimeMs > 0 ? `${metrics.retrievalTimeMs}ms` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Session Continuity</span>
                    <span className={`text-sm font-mono ${metrics.sessionContinuity > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {metrics.sessionContinuity > 0 ? `${metrics.sessionContinuity.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Context Integrity</span>
                    <span className={`text-sm font-mono ${metrics.contextIntegrity > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                      {metrics.contextIntegrity > 0 ? `${metrics.contextIntegrity.toFixed(1)}%` : '-'}
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
              ✓ Context Write Complete
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Persisted {metrics.totalWrites} context files ({metrics.totalSizeKB.toFixed(1)}KB total)</div>
              <div>• Achieved {metrics.compressionRatio}% compression ratio (58% size reduction)</div>
              <div>• Session continuity: {metrics.sessionContinuity.toFixed(1)}% with {metrics.retrievalTimeMs}ms retrieval time</div>
              <div>• Context integrity: {metrics.contextIntegrity.toFixed(1)}% after persistence</div>
              {metrics.overflowHandled && (
                <div className="text-yellow-400">⚠ Detected and handled context window overflow by externalizing to files</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}