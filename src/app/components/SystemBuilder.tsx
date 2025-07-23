"use client"

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Code, Database, Server, Globe, User, Cpu, Layers, FileText, Zap, Shield, Archive, Edit3, X, Save, Terminal, Maximize2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface SystemBuilderProps {
  techniques: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    complexity: string;
    category: string;
    features?: string[];
  }>;
  categories: Array<{id: string; name: string; color: string}>;
  useCases: Array<{id: string; name: string; description: string}>;
}


interface SystemMetrics {
  totalComponents: number;
  complexityScore: number;
  estimatedCost: number;
  reliabilityScore: number;
  scalabilityScore: number;
  riskFactors: string[];
}

// Node detail editor modal
const NodeDetailModal = ({ node, isOpen, onClose, onSave, onOpenCodeEditor }: {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (nodeId: string, details: any) => void;
  onOpenCodeEditor?: (nodeId: string, code: string, language: string) => void;
}) => {
  const [details, setDetails] = useState<any>({});

  React.useEffect(() => {
    if (node) {
      setDetails(node.data || {});
    }
  }, [node]);

  const handleSave = () => {
    if (node) {
      onSave(node.id, details);
    }
    onClose();
  };

  const updateDetail = (key: string, value: any) => {
    setDetails((prev: any) => ({ ...prev, [key]: value }));
  };

  const addToArray = (key: string, value: string) => {
    if (value.trim()) {
      setDetails((prev: any) => ({
        ...prev,
        [key]: [...(prev[key] || []), value.trim()]
      }));
    }
  };

  const removeFromArray = (key: string, index: number) => {
    setDetails((prev: any) => ({
      ...prev,
      [key]: prev[key]?.filter((_: any, i: number) => i !== index) || []
    }));
  };

  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-600 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-600 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Edit {node.type} Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Basic Properties */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Name</label>
              <input
                type="text"
                value={details.label || ''}
                onChange={(e) => updateDetail('label', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Complexity</label>
              <select
                value={details.complexity || 'medium'}
                onChange={(e) => updateDetail('complexity', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Cost</label>
              <select
                value={details.cost || 'medium'}
                onChange={(e) => updateDetail('cost', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Reliability</label>
              <select
                value={details.reliability || 'standard'}
                onChange={(e) => updateDetail('reliability', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              value={details.description || ''}
              onChange={(e) => updateDetail('description', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white h-20 resize-none"
              placeholder="Detailed description of this component..."
            />
          </div>

          {/* Type-specific fields */}
          {node.type === 'code' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Programming Language</label>
                <select
                  value={details.language || 'javascript'}
                  onChange={(e) => updateDetail('language', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="sql">SQL</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                  <option value="yaml">YAML</option>
                  <option value="bash">Bash</option>
                  <option value="dockerfile">Dockerfile</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Code Snippet</label>
                <div className="relative">
                  <textarea
                    value={details.code || ''}
                    onChange={(e) => updateDetail('code', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white font-mono text-sm h-32 resize-none"
                    placeholder="Enter your code here..."
                  />
                  <button
                    onClick={() => {
                      if (onOpenCodeEditor) {
                        onOpenCodeEditor(node.id, details.code || '', details.language || 'javascript');
                      }
                    }}
                    className="absolute top-2 right-2 p-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                    title="Open full editor"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Code Type</label>
                <select
                  value={details.codeType || 'snippet'}
                  onChange={(e) => updateDetail('codeType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="snippet">Code Snippet</option>
                  <option value="function">Function</option>
                  <option value="class">Class</option>
                  <option value="module">Module</option>
                  <option value="config">Configuration</option>
                  <option value="schema">Schema</option>
                  <option value="test">Test</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Dependencies</label>
                <div className="space-y-2">
                  {(details.dependencies || []).map((dep: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={dep}
                        onChange={(e) => {
                          const newDeps = [...(details.dependencies || [])];
                          newDeps[i] = e.target.value;
                          updateDetail('dependencies', newDeps);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                      <button
                        onClick={() => removeFromArray('dependencies', i)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add dependency..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('dependencies', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
            </>
          )}

          {node.type === 'service' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Service Type</label>
                <input
                  type="text"
                  value={details.serviceType || ''}
                  onChange={(e) => updateDetail('serviceType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., REST API, GraphQL, gRPC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Endpoints</label>
                <div className="space-y-2">
                  {(details.endpoints || []).map((endpoint: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={endpoint}
                        onChange={(e) => {
                          const newEndpoints = [...(details.endpoints || [])];
                          newEndpoints[i] = e.target.value;
                          updateDetail('endpoints', newEndpoints);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                      <button
                        onClick={() => removeFromArray('endpoints', i)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add endpoint..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToArray('endpoints', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Environment Variables</label>
                <textarea
                  value={details.envVars || ''}
                  onChange={(e) => updateDetail('envVars', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white h-16 resize-none"
                  placeholder="PORT=3000\nDB_URL=...\nAPI_KEY=..."
                />
              </div>
            </>
          )}

          {node.type === 'database' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Database Type</label>
                <input
                  type="text"
                  value={details.dbType || ''}
                  onChange={(e) => updateDetail('dbType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., PostgreSQL, MongoDB, Redis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Tables/Collections</label>
                <div className="space-y-2">
                  {(details.tables || []).map((table: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={table}
                        onChange={(e) => {
                          const newTables = [...(details.tables || [])];
                          newTables[i] = e.target.value;
                          updateDetail('tables', newTables);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                      <button
                        onClick={() => removeFromArray('tables', i)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add table/collection..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('tables', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Schema/Model</label>
                <textarea
                  value={details.schema || ''}
                  onChange={(e) => updateDetail('schema', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white h-24 resize-none"
                  placeholder="Define your database schema or model structure..."
                />
              </div>
            </>
          )}

          {node.type === 'interface' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Interface Type</label>
                <input
                  type="text"
                  value={details.interfaceType || ''}
                  onChange={(e) => updateDetail('interfaceType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., Web App, Mobile App, CLI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Pages/Screens</label>
                <div className="space-y-2">
                  {(details.pages || []).map((page: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={page}
                        onChange={(e) => {
                          const newPages = [...(details.pages || [])];
                          newPages[i] = e.target.value;
                          updateDetail('pages', newPages);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                      <button
                        onClick={() => removeFromArray('pages', i)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add page/screen..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('pages', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">UI Framework</label>
                <input
                  type="text"
                  value={details.framework || ''}
                  onChange={(e) => updateDetail('framework', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., React, Vue, Flutter"
                />
              </div>
            </>
          )}

          {node.type === 'process' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Process Type</label>
                <input
                  type="text"
                  value={details.processType || ''}
                  onChange={(e) => updateDetail('processType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., ETL, Data Pipeline, Batch Job"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Schedule</label>
                <input
                  type="text"
                  value={details.schedule || ''}
                  onChange={(e) => updateDetail('schedule', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., 0 0 * * *, @daily, real-time"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Input/Output</label>
                <textarea
                  value={details.dataFlow || ''}
                  onChange={(e) => updateDetail('dataFlow', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white h-16 resize-none"
                  placeholder="Input: CSV files\nOutput: Processed data to database"
                />
              </div>
            </>
          )}

          {node.type === 'data' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Data Type</label>
                <input
                  type="text"
                  value={details.dataType || ''}
                  onChange={(e) => updateDetail('dataType', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="e.g., JSON, CSV, XML, Binary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Fields/Structure</label>
                <div className="space-y-2">
                  {(details.fields || []).map((field: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={field}
                        onChange={(e) => {
                          const newFields = [...(details.fields || [])];
                          newFields[i] = e.target.value;
                          updateDetail('fields', newFields);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                      <button
                        onClick={() => removeFromArray('fields', i)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add field (name: type)..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('fields', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">Technical Requirements</label>
            <textarea
              value={details.requirements || ''}
              onChange={(e) => updateDetail('requirements', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white h-20 resize-none"
              placeholder="List specific technical requirements, constraints, or specifications..."
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-600 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom node components
const PatternNode = ({ data, selected }: {data: any; selected: boolean}) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity?.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg border-2 min-w-[150px] cursor-pointer group relative ${
      selected 
        ? 'border-blue-400 bg-blue-900/50' 
        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <span className="text-lg">{data.icon}</span>
        <div>
          <div className="font-semibold text-white text-sm">{data.label}</div>
          <div className="text-xs text-gray-400">{data.type}</div>
          {data.complexity && (
            <div className={`text-xs ${getComplexityColor(data.complexity)}`}>
              {data.complexity} complexity
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="w-3 h-3 text-gray-400" />
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const DataNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[120px] ${
      selected 
        ? 'border-green-400 bg-green-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.dataType}</div>
        {data.fields && (
          <div className="text-xs text-gray-500 mt-1 border-t border-gray-600 pt-1">
            {data.fields.slice(0, 3).map((field: string, i: number) => (
              <div key={i}>{field}</div>
            ))}
            {data.fields.length > 3 && <div>...</div>}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const DatabaseNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-emerald-400 bg-emerald-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <Database className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.dbType || 'Database'}</div>
        {data.tables && (
          <div className="text-xs text-gray-500 mt-1 border-t border-gray-600 pt-1">
            {data.tables.slice(0, 2).map((table: string, i: number) => (
              <div key={i}>📄 {table}</div>
            ))}
            {data.tables.length > 2 && <div>+{data.tables.length - 2} more</div>}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const ServiceNode = ({ data, selected }: {data: any; selected: boolean}) => {
  const getCostIndicator = (cost: string) => {
    switch (cost?.toLowerCase()) {
      case 'low': return '💚';
      case 'medium': return '💛';
      case 'high': return '🧡';
      default: return '⚪';
    }
  };

  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-purple-400 bg-purple-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Server className="w-4 h-4 text-purple-400" />
          {data.cost && <span className="text-xs">{getCostIndicator(data.cost)}</span>}
        </div>
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.serviceType || 'Service'}</div>
        {data.reliability && (
          <div className="text-xs text-blue-400 mt-1">
            {data.reliability} reliability
          </div>
        )}
        {data.endpoints && (
          <div className="text-xs text-gray-500 mt-1 border-t border-gray-600 pt-1">
            {data.endpoints.slice(0, 2).map((endpoint: string, i: number) => (
              <div key={i}>🔗 {endpoint}</div>
            ))}
            {data.endpoints.length > 2 && <div>+{data.endpoints.length - 2} more</div>}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const InterfaceNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-cyan-400 bg-cyan-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <Globe className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.interfaceType || 'Interface'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const ActorNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[120px] ${
      selected 
        ? 'border-yellow-400 bg-yellow-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <User className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.role || 'Actor'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const ProcessNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-indigo-400 bg-indigo-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <Cpu className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">{data.processType || 'Process'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const EvaluationNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-3 py-2 shadow-lg rounded border-2 min-w-[140px] ${
      selected 
        ? 'border-orange-400 bg-orange-900/50' 
        : 'border-gray-600 bg-gray-700'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-center">
        <div className="font-medium text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-400">Evaluation</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

// Code editor component with inline editing capability
const CodeNode = ({ id, data, selected, onUpdateNode }: {id: string; data: any; selected: boolean; onUpdateNode?: (nodeId: string, updates: any) => void}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingCode, setEditingCode] = React.useState(data.code || '');
  const [editingLabel, setEditingLabel] = React.useState(data.label || '');
  const [isEditingLabel, setIsEditingLabel] = React.useState(false);
  const [editingLanguage, setEditingLanguage] = React.useState(data.language || 'javascript');
  const labelInputRef = React.useRef<HTMLInputElement>(null);

  const getLanguageIcon = (language: string) => {
    switch (language?.toLowerCase()) {
      case 'javascript': case 'js': return '🟨';
      case 'typescript': case 'ts': return '🔷';
      case 'python': case 'py': return '🐍';
      case 'java': return '☕';
      case 'go': return '🐹';
      case 'rust': return '🦀';
      case 'sql': return '🗃️';
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'json': return '📋';
      case 'yaml': case 'yml': return '📝';
      default: return '💻';
    }
  };

  const truncateCode = (code: string, maxLines: number = 3) => {
    if (!code) return 'Click to add code...';
    const lines = code.split('\n');
    if (lines.length <= maxLines) return code;
    return lines.slice(0, maxLines).join('\n') + '\n...';
  };

  const handleCodeDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
    setEditingCode(data.code || '');
    setEditingLanguage(data.language || 'javascript');
  };

  const handleLabelDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditingLabel(true);
    setEditingLabel(data.label || '');
    setTimeout(() => labelInputRef.current?.focus(), 0);
  };

  // Prevent any clicks from propagating to ReactFlow
  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCodeSave = () => {
    console.log('Saving code:', { id, code: editingCode, language: editingLanguage });
    if (onUpdateNode && id) {
      onUpdateNode(id, { code: editingCode, language: editingLanguage });
    }
    setIsEditing(false);
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setEditingCode(newCode);
    // Auto-save on change
    if (onUpdateNode && id) {
      onUpdateNode(id, { code: newCode, language: editingLanguage });
    }
  };

  const handleLabelSave = () => {
    if (onUpdateNode && id) {
      onUpdateNode(id, { label: editingLabel });
    }
    setIsEditingLabel(false);
  };

  const handleLanguageChange = (language: string) => {
    setEditingLanguage(language);
    if (onUpdateNode && id) {
      onUpdateNode(id, { language });
    }
  };

  const handleEscapeKey = () => {
    setIsEditing(false);
    setEditingCode(data.code || '');
    setEditingLanguage(data.language || 'javascript');
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLabelSave();
    } else if (e.key === 'Escape') {
      setIsEditingLabel(false);
      setEditingLabel(data.label || '');
    }
  };

  // Keep local state in sync with node data
  React.useEffect(() => {
    setEditingCode(data.code || '');
    setEditingLanguage(data.language || 'javascript');
  }, [data.code, data.language]);

  return (
    <div 
      className={`px-4 py-3 shadow-lg rounded border-2 min-w-[250px] max-w-[400px] group relative resize overflow-hidden ${
        selected 
          ? 'border-green-400 bg-green-900/50' 
          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
      } ${isEditing ? 'max-w-[500px]' : ''}`}
      onClick={handleNodeClick}
      style={{ resize: 'both', minHeight: '120px' }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-lg">{getLanguageIcon(data.language)}</span>
          <div className="flex-1 min-w-0">
            {isEditingLabel ? (
              <input
                ref={labelInputRef}
                value={editingLabel}
                onChange={(e) => setEditingLabel(e.target.value)}
                onBlur={handleLabelSave}
                onKeyDown={handleLabelKeyDown}
                className="font-medium text-white text-sm bg-transparent border border-gray-500 rounded px-1 w-full"
              />
            ) : (
              <div 
                className="font-medium text-white text-sm truncate cursor-text hover:bg-gray-700 px-1 rounded relative group/label"
                onDoubleClick={handleLabelDoubleClick}
                onClick={(e) => e.stopPropagation()}
                title="Double-click to edit"
              >
                {data.label}
                <Edit3 className="w-3 h-3 text-gray-500 absolute -right-1 top-0 opacity-0 group-hover/label:opacity-100 transition-opacity" />
              </div>
            )}
            <select
              value={data.language || 'javascript'}
              onChange={(e) => {
                e.stopPropagation();
                handleLanguageChange(e.target.value);
              }}
              className="text-xs text-gray-400 bg-transparent border-none outline-none cursor-pointer hover:text-white"
              title="Select language"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="sql">SQL</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="bash">Bash</option>
              <option value="dockerfile">Dockerfile</option>
            </select>
          </div>
        </div>
        
        {isEditing ? (
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <select
                value={editingLanguage}
                onChange={(e) => {
                  setEditingLanguage(e.target.value);
                  if (onUpdateNode && id) {
                    onUpdateNode(id, { language: e.target.value });
                  }
                }}
                className="text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="bash">Bash</option>
                <option value="dockerfile">Dockerfile</option>
              </select>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCodeSave}
                  className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-white"
                >
                  Save
                </button>
                <button
                  onClick={handleEscapeKey}
                  className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="border border-gray-500 rounded overflow-hidden">
              <Editor
                height="200px"
                language={editingLanguage === 'bash' ? 'shell' : editingLanguage === 'dockerfile' ? 'dockerfile' : editingLanguage}
                value={editingCode}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 13,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollbar: { vertical: 'auto' },
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  bracketPairColorization: { enabled: true },
                  formatOnPaste: true,
                  formatOnType: true,
                }}
                onMount={(editor) => {
                  editor.focus();
                  // Handle Escape key (Monaco uses KeyMod.Escape which is 9)
                  editor.addCommand(9, () => {
                    handleEscapeKey();
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div 
            className="text-xs font-mono text-gray-300 bg-gray-900 rounded p-2 border border-gray-700 overflow-hidden cursor-text hover:bg-gray-850 transition-colors relative group/code"
            onDoubleClick={handleCodeDoubleClick}
            onClick={(e) => e.stopPropagation()}
            title="Double-click to edit code"
          >
            {data.code ? (
              <Editor
                height="auto"
                language={data.language || 'javascript'}
                value={truncateCode(data.code, 6)}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 12,
                  lineNumbers: 'off',
                  folding: false,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  glyphMargin: false,
                  scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,
                  overviewRulerLanes: 0,
                  wordWrap: 'on',
                  contextmenu: false,
                  selectOnLineNumbers: false,
                  automaticLayout: true,
                }}
              />
            ) : (
              <div className="flex items-center gap-2 py-4">
                <Edit3 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 italic">Double-click to add code...</span>
              </div>
            )}
            <div className="absolute top-1 right-1 opacity-0 group-hover/code:opacity-100 transition-opacity">
              <Edit3 className="w-3 h-3 text-gray-500 bg-gray-800 rounded p-0.5" />
            </div>
          </div>
        )}
        
        {data.description && !isEditing && (
          <div className="text-xs text-gray-400 mt-2 truncate">
            {data.description}
          </div>
        )}
        
        {/* General editing hint */}
        {!isEditing && !isEditingLabel && (
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-xs text-gray-400 bg-gray-800 rounded px-1 py-0.5 border border-gray-600">
              <Edit3 className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

// Base node types without the code node (will be added inside component)
const baseNodeTypes = {
  pattern: PatternNode,
  data: DataNode,
  database: DatabaseNode,
  service: ServiceNode,
  interface: InterfaceNode,
  actor: ActorNode,
  process: ProcessNode,
  evaluation: EvaluationNode,
};

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'actor',
    position: { x: 100, y: 100 },
    data: { label: 'User', role: 'Primary Actor' },
  },
];

const initialEdges: Edge[] = [];

export const SystemBuilder = ({ techniques }: SystemBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showBAMLOutput, setShowBAMLOutput] = useState(false);
  const [systemName, setSystemName] = useState('MySystem');
  const [systemDescription, setSystemDescription] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [editingCode, setEditingCode] = useState<{nodeId: string; code: string; language: string} | null>(null);

  // Update node data for inline editing
  const updateNodeData = useCallback((nodeId: string, updates: any) => {
    console.log('updateNodeData called:', { nodeId, updates });
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          console.log('Updating node:', node.id, 'with:', updates);
          return { ...node, data: { ...node.data, ...updates } };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Create nodeTypes with access to updateNodeData
  const nodeTypes: NodeTypes = useMemo(() => ({
    ...baseNodeTypes,
    code: (props: any) => <CodeNode {...props} onUpdateNode={updateNodeData} />,
  }), [updateNodeData]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node click for editing (only for non-code nodes)
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    // Only open modal for non-code nodes
    if (node.type !== 'code') {
      setEditingNode(node);
    }
  }, []);

  // Save node details
  const saveNodeDetails = useCallback((nodeId: string, details: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...details } }
          : node
      )
    );
  }, [setNodes]);

  // Add pattern node to the flow
  const addPatternNode = useCallback((patternId: string) => {
    const pattern = techniques.find(t => t.id === patternId);
    if (!pattern) return;

    const newNode: Node = {
      id: `pattern-${Date.now()}`,
      type: 'pattern',
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 200 },
      data: { 
        label: pattern.name,
        icon: pattern.icon,
        type: 'Pattern',
        patternId: pattern.id,
        description: pattern.description
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [techniques, setNodes]);

  // Add system component nodes with complexity/cost defaults
  const addComponentNode = useCallback((nodeType: string, defaultData: Record<string, any>) => {
    const componentDefaults = {
      complexity: 'medium',
      cost: 'medium', 
      reliability: 'standard',
      scalability: 'moderate'
    };
    
    const newNode: Node = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 200 },
      data: { ...componentDefaults, ...defaultData },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // Open code editor
  const openCodeEditor = useCallback((nodeId: string, code: string, language: string) => {
    setEditingCode({ nodeId, code, language });
    setShowCodeEditor(true);
  }, []);

  // Save code from full editor
  const saveCodeFromEditor = useCallback((nodeId: string, code: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, code } }
          : node
      )
    );
    setShowCodeEditor(false);
    setEditingCode(null);
  }, [setNodes]);

  // Add evaluation node
  const addEvaluationNode = useCallback(() => {
    const newNode: Node = {
      id: `eval-${Date.now()}`,
      type: 'evaluation',
      position: { x: Math.random() * 400 + 200, y: Math.random() * 300 + 400 },
      data: { 
        label: 'Quality Check',
        type: 'Evaluation'
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // System templates
  const loadTemplate = useCallback((templateName: string) => {
    let templateNodes: Node[] = [];
    let templateEdges: Edge[] = [];
    
    switch (templateName) {
      case 'web-app':
        templateNodes = [
          { id: 'user', type: 'actor', position: { x: 100, y: 100 }, data: { label: 'User', role: 'Web User' } },
          { id: 'frontend', type: 'interface', position: { x: 300, y: 100 }, data: { label: 'Web Frontend', interfaceType: 'React App' } },
          { id: 'api', type: 'service', position: { x: 500, y: 100 }, data: { label: 'REST API', serviceType: 'Node.js', endpoints: ['/api/users', '/api/data'] } },
          { id: 'db', type: 'database', position: { x: 700, y: 100 }, data: { label: 'PostgreSQL', dbType: 'Relational', tables: ['users', 'products', 'orders'] } },
        ];
        templateEdges = [
          { id: 'e1', source: 'user', target: 'frontend' },
          { id: 'e2', source: 'frontend', target: 'api' },
          { id: 'e3', source: 'api', target: 'db' },
        ];
        break;
      case 'microservices':
        templateNodes = [
          { id: 'gateway', type: 'service', position: { x: 300, y: 50 }, data: { label: 'API Gateway', serviceType: 'Kong' } },
          { id: 'auth', type: 'service', position: { x: 150, y: 200 }, data: { label: 'Auth Service', serviceType: 'JWT' } },
          { id: 'users', type: 'service', position: { x: 300, y: 200 }, data: { label: 'User Service', serviceType: 'Node.js' } },
          { id: 'orders', type: 'service', position: { x: 450, y: 200 }, data: { label: 'Order Service', serviceType: 'Java' } },
          { id: 'userdb', type: 'database', position: { x: 150, y: 350 }, data: { label: 'User DB', dbType: 'MongoDB' } },
          { id: 'orderdb', type: 'database', position: { x: 450, y: 350 }, data: { label: 'Order DB', dbType: 'PostgreSQL' } },
        ];
        templateEdges = [
          { id: 'e1', source: 'gateway', target: 'auth' },
          { id: 'e2', source: 'gateway', target: 'users' },
          { id: 'e3', source: 'gateway', target: 'orders' },
          { id: 'e4', source: 'users', target: 'userdb' },
          { id: 'e5', source: 'orders', target: 'orderdb' },
        ];
        break;
      case 'ml-pipeline':
        templateNodes = [
          { id: 'data', type: 'data', position: { x: 100, y: 100 }, data: { label: 'Raw Data', dataType: 'CSV' } },
          { id: 'preprocess', type: 'process', position: { x: 300, y: 100 }, data: { label: 'Preprocessing', processType: 'ETL' } },
          { id: 'train', type: 'process', position: { x: 500, y: 100 }, data: { label: 'Model Training', processType: 'ML' } },
          { id: 'model', type: 'service', position: { x: 700, y: 100 }, data: { label: 'Model API', serviceType: 'FastAPI' } },
          { id: 'monitor', type: 'evaluation', position: { x: 500, y: 250 }, data: { label: 'Model Monitor', type: 'Evaluation' } },
        ];
        templateEdges = [
          { id: 'e1', source: 'data', target: 'preprocess' },
          { id: 'e2', source: 'preprocess', target: 'train' },
          { id: 'e3', source: 'train', target: 'model' },
          { id: 'e4', source: 'model', target: 'monitor' },
        ];
        break;
      default:
        return;
    }
    
    setNodes(templateNodes);
    setEdges(templateEdges);
  }, [setNodes, setEdges]);

  // Calculate system metrics
  const calculateSystemMetrics = useMemo((): SystemMetrics => {
    const components = nodes.filter(n => n.type !== 'actor');
    
    const complexityScores = { low: 1, medium: 2, high: 3, critical: 4 };
    const costScores = { low: 1, medium: 2, high: 3 };
    const reliabilityScores = { basic: 1, standard: 2, high: 3, critical: 4 };
    const scalabilityScores = { limited: 1, moderate: 2, high: 3, unlimited: 4 };
    
    const totalComplexity = components.reduce((sum, node) => 
      sum + (complexityScores[node.data.complexity as keyof typeof complexityScores] || 2), 0);
    const totalCost = components.reduce((sum, node) => 
      sum + (costScores[node.data.cost as keyof typeof costScores] || 2), 0);
    const avgReliability = components.length > 0 ? 
      components.reduce((sum, node) => 
        sum + (reliabilityScores[node.data.reliability as keyof typeof reliabilityScores] || 2), 0) / components.length : 0;
    const avgScalability = components.length > 0 ? 
      components.reduce((sum, node) => 
        sum + (scalabilityScores[node.data.scalability as keyof typeof scalabilityScores] || 2), 0) / components.length : 0;
    
    const riskFactors: string[] = [];
    if (totalComplexity / components.length > 2.5) riskFactors.push('High system complexity');
    if (totalCost / components.length > 2.5) riskFactors.push('High operational costs');
    if (avgReliability < 2) riskFactors.push('Low reliability components');
    if (edges.length < components.length - 1) riskFactors.push('Insufficient component connections');
    
    return {
      totalComponents: components.length,
      complexityScore: Math.round((totalComplexity / Math.max(components.length, 1)) * 10) / 10,
      estimatedCost: totalCost,
      reliabilityScore: Math.round(avgReliability * 10) / 10,
      scalabilityScore: Math.round(avgScalability * 10) / 10,
      riskFactors
    };
  }, [nodes, edges]);

  // Generate BAML schema for LLM consumption
  const generateBAMLSchema = useMemo(() => {
    const dbNodes = nodes.filter(n => n.type === 'database');
    const serviceNodes = nodes.filter(n => n.type === 'service');
    const interfaceNodes = nodes.filter(n => n.type === 'interface');
    const actorNodes = nodes.filter(n => n.type === 'actor');
    const processNodes = nodes.filter(n => n.type === 'process');
    const patternNodes = nodes.filter(n => n.type === 'pattern');
    const evalNodes = nodes.filter(n => n.type === 'evaluation');
    const metrics = calculateSystemMetrics;

    // BAML schema structure for LLM code generation
    const bamlSchema = {
      system_specification: {
        name: systemName,
        description: systemDescription || `A ${systemName} system with ${metrics.totalComponents} components`,
        objectives: [
          'Build a scalable and reliable system',
          'Ensure high performance and low latency', 
          'Implement proper error handling and monitoring'
        ],
        
        architecture: {
          style: serviceNodes.length > 3 ? 'microservices' : interfaceNodes.length > 0 ? 'web-application' : 'service-oriented',
          complexity_level: metrics.complexityScore > 3 ? 'high' : metrics.complexityScore > 2 ? 'medium' : 'low',
          scalability_target: metrics.scalabilityScore > 3 ? 'unlimited' : metrics.scalabilityScore > 2 ? 'high' : 'moderate'
        },
        
        components: {
          actors: actorNodes.map(node => ({
            name: node.data.label,
            type: 'user_actor',
            role: node.data.role || 'end_user',
            requirements: ['authentication', 'authorization', 'user_experience']
          })),
          
          interfaces: interfaceNodes.map(node => ({
            name: node.data.label,
            type: node.data.interfaceType || 'web_interface',
            description: node.data.description || '',
            complexity: node.data.complexity,
            reliability_requirement: node.data.reliability,
            framework: node.data.framework || '',
            pages: node.data.pages || [],
            requirements: node.data.requirements || '',
            technologies: node.data.interfaceType === 'React App' ? ['react', 'typescript', 'tailwind'] : ['html', 'css', 'javascript']
          })),
          
          services: serviceNodes.map(node => ({
            name: node.data.label,
            type: node.data.serviceType || 'api_service',
            description: node.data.description || '',
            complexity: node.data.complexity,
            cost_tier: node.data.cost,
            reliability_requirement: node.data.reliability,
            scalability_requirement: node.data.scalability,
            endpoints: node.data.endpoints || [],
            environment_variables: node.data.envVars ? node.data.envVars.split('\n').filter((line: string) => line.trim()) : [],
            requirements: node.data.requirements || '',
            dependencies: [], // Will be calculated from edges
            features: [
              'rest_api',
              'error_handling',
              'logging',
              'monitoring',
              ...(node.data.reliability === 'critical' ? ['circuit_breaker', 'retry_logic'] : []),
              ...(node.data.scalability === 'high' ? ['load_balancing', 'horizontal_scaling'] : [])
            ]
          })),
          
          databases: dbNodes.map(node => ({
            name: node.data.label,
            type: node.data.dbType || 'relational',
            description: node.data.description || '',
            complexity: node.data.complexity,
            cost_tier: node.data.cost,
            reliability_requirement: node.data.reliability,
            scalability_requirement: node.data.scalability,
            tables: node.data.tables || [],
            schema: node.data.schema || '',
            requirements: node.data.requirements || '',
            features: [
              'backup_recovery',
              'indexing',
              ...(node.data.reliability === 'critical' ? ['replication', 'failover'] : []),
              ...(node.data.scalability === 'high' ? ['sharding', 'read_replicas'] : [])
            ]
          })),
          
          data_processors: processNodes.map(node => ({
            name: node.data.label,
            type: node.data.processType || 'data_processor',
            description: node.data.description || '',
            complexity: node.data.complexity,
            reliability_requirement: node.data.reliability,
            schedule: node.data.schedule || '',
            data_flow: node.data.dataFlow || '',
            requirements: node.data.requirements || '',
            features: ['data_validation', 'transformation', 'error_handling']
          })),

          data_models: nodes.filter(n => n.type === 'data').map(node => ({
            name: node.data.label,
            type: node.data.dataType || 'json',
            description: node.data.description || '',
            fields: node.data.fields || [],
            requirements: node.data.requirements || '',
            validation_rules: []
          })),
          
          ai_patterns: patternNodes.map(node => {
            const pattern = techniques.find(t => t.id === node.data.patternId);
            return {
              name: node.data.label,
              pattern_type: pattern?.category || 'reasoning',
              complexity: pattern?.complexity || node.data.complexity,
              description: pattern?.description || node.data.description,
              features: pattern?.features || ['llm_integration', 'prompt_management']
            };
          }),
          
          monitoring: evalNodes.map(node => ({
            name: node.data.label,
            type: 'quality_assurance',
            metrics: ['performance', 'reliability', 'security', 'cost'],
            alerts: ['error_rate', 'response_time', 'availability']
          }))
        },
        
        connections: edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          return {
            from: sourceNode?.data.label,
            to: targetNode?.data.label,
            type: 'data_flow',
            protocol: sourceNode?.type === 'interface' && targetNode?.type === 'service' ? 'http' : 'internal'
          };
        }),
        
        quality_requirements: {
          performance: {
            response_time: metrics.complexityScore > 2 ? '< 500ms' : '< 200ms',
            throughput: metrics.scalabilityScore > 2 ? 'high' : 'standard'
          },
          reliability: {
            availability: metrics.reliabilityScore > 3 ? '99.9%' : '99.5%',
            error_rate: '< 0.1%'
          },
          security: {
            authentication: true,
            authorization: true,
            encryption: metrics.reliabilityScore > 2,
            audit_logging: metrics.reliabilityScore > 2
          },
          cost_optimization: {
            target_tier: metrics.estimatedCost > 15 ? 'high' : metrics.estimatedCost > 8 ? 'medium' : 'low',
            auto_scaling: metrics.scalabilityScore > 2
          }
        },
        
        implementation_guidance: {
          technology_stack: {
            backend: serviceNodes.length > 0 ? (serviceNodes[0].data.serviceType?.includes('Node') ? 'nodejs' : 'java') : 'nodejs',
            database: dbNodes.length > 0 ? (dbNodes[0].data.dbType?.toLowerCase().includes('mongo') ? 'mongodb' : 'postgresql') : 'postgresql',
            frontend: interfaceNodes.length > 0 ? 'react' : null,
            ai_framework: patternNodes.length > 0 ? 'openai' : null
          },
          deployment: {
            strategy: metrics.complexityScore > 2 ? 'microservices' : 'monolith',
            containerization: true,
            orchestration: metrics.totalComponents > 5 ? 'kubernetes' : 'docker-compose'
          },
          risk_mitigation: metrics.riskFactors.map(risk => ({
            risk: risk,
            mitigation: risk.includes('complexity') ? 'Break down into smaller services' :
                       risk.includes('cost') ? 'Implement cost monitoring and optimization' :
                       risk.includes('reliability') ? 'Add redundancy and monitoring' :
                       'Review system design'
          }))
        }
      }
    };

    return JSON.stringify(bamlSchema, null, 2);
  }, [nodes, edges, techniques, systemName, systemDescription, calculateSystemMetrics]);

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 border bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">System Builder</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              placeholder="System Name"
            />
            <textarea
              value={systemDescription}
              onChange={(e) => setSystemDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm h-20 resize-none"
              placeholder="System description and objectives..."
            />
          </div>
        </div>

        {/* Pattern Library */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">AI Patterns</h3>
          <div className="space-y-2">
            {techniques.slice(0, 8).map((technique) => (
              <button
                key={technique.id}
                onClick={() => addPatternNode(technique.id)}
                className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{technique.icon}</span>
                  <div>
                    <div className="text-white text-sm font-medium">{technique.name}</div>
                    <div className="text-gray-400 text-xs">{technique.complexity} complexity</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Templates */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Templates</h3>
          <div className="space-y-2">
            <button
              onClick={() => loadTemplate('web-app')}
              className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white text-sm font-medium">Web Application</div>
                  <div className="text-gray-400 text-xs">Frontend + API + DB</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => loadTemplate('microservices')}
              className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-white text-sm font-medium">Microservices</div>
                  <div className="text-gray-400 text-xs">Distributed services</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => loadTemplate('ml-pipeline')}
              className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-white text-sm font-medium">ML Pipeline</div>
                  <div className="text-gray-400 text-xs">Data + Training + API</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* System Components */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Components</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addComponentNode('database', { label: 'Database', dbType: 'SQL', tables: ['table1'], complexity: 'medium', cost: 'medium', reliability: 'high' })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Database className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Database</div>
            </button>
            <button
              onClick={() => addComponentNode('service', { label: 'Service', serviceType: 'API', endpoints: ['/api'], complexity: 'medium', cost: 'medium', reliability: 'standard' })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Server className="w-4 h-4 text-purple-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Service</div>
            </button>
            <button
              onClick={() => addComponentNode('interface', { label: 'Interface', interfaceType: 'Web' })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Globe className="w-4 h-4 text-cyan-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Interface</div>
            </button>
            <button
              onClick={() => addComponentNode('actor', { label: 'Actor', role: 'User' })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <User className="w-4 h-4 text-yellow-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Actor</div>
            </button>
            <button
              onClick={() => addComponentNode('process', { label: 'Process', processType: 'ETL' })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Cpu className="w-4 h-4 text-indigo-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Process</div>
            </button>
            <button
              onClick={() => addComponentNode('data', { label: 'Data', dataType: 'JSON', fields: ['id', 'name'] })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <FileText className="w-4 h-4 text-green-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Data</div>
            </button>
            <button
              onClick={addEvaluationNode}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Shield className="w-4 h-4 text-orange-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Eval</div>
            </button>
            <button
              onClick={() => addComponentNode('code', { label: 'New Code Block', language: 'javascript', code: '', codeType: 'snippet', dependencies: [] })}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <Terminal className="w-4 h-4 text-green-400 mx-auto" />
              <div className="text-white text-xs text-center mt-1">Code</div>
            </button>
            <button
              onClick={() => addPatternNode(techniques[0]?.id)}
              className="text-left px-2 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
            >
              <span className="block text-center text-sm">{techniques[0]?.icon || '🧠'}</span>
              <div className="text-white text-xs text-center mt-1">Pattern</div>
            </button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="mb-6">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
          >
            <span className="text-white text-sm font-medium">System Metrics</span>
            <span className="text-gray-400">{showMetrics ? '−' : '+'}</span>
          </button>
          {showMetrics && (
            <div className="mt-2 p-3 bg-gray-800 rounded border border-gray-600 text-xs space-y-2">
              <div className="flex justify-between text-white">
                <span>Components:</span>
                <span>{calculateSystemMetrics.totalComponents}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Complexity:</span>
                <span className={calculateSystemMetrics.complexityScore > 3 ? 'text-red-400' : calculateSystemMetrics.complexityScore > 2 ? 'text-yellow-400' : 'text-green-400'}>
                  {calculateSystemMetrics.complexityScore}/4
                </span>
              </div>
              <div className="flex justify-between text-white">
                <span>Est. Cost:</span>
                <span className={calculateSystemMetrics.estimatedCost > 15 ? 'text-red-400' : calculateSystemMetrics.estimatedCost > 8 ? 'text-yellow-400' : 'text-green-400'}>
                  {calculateSystemMetrics.estimatedCost}
                </span>
              </div>
              <div className="flex justify-between text-white">
                <span>Reliability:</span>
                <span className="text-blue-400">{calculateSystemMetrics.reliabilityScore}/4</span>
              </div>
              {calculateSystemMetrics.riskFactors.length > 0 && (
                <div className="pt-2 border-t border-gray-600">
                  <div className="text-red-400 mb-1">Risk Factors:</div>
                  {calculateSystemMetrics.riskFactors.map((risk, i) => (
                    <div key={i} className="text-red-300 text-xs">• {risk}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => setShowBAMLOutput(!showBAMLOutput)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
          >
            <Code className="w-4 h-4" />
            {showBAMLOutput ? 'Hide' : 'Show'} Schema
          </button>
          <button
            onClick={() => { setNodes([]); setEdges([]); }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
          >
            <Archive className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Main Flow Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={(event, node) => {
            // Prevent double-click from opening modal for code nodes
            if (node.type === 'code') {
              event.stopPropagation();
              return;
            }
            // For other nodes, allow double-click to open modal
            setEditingNode(node);
          }}
          nodeTypes={nodeTypes}
          className="bg-gray-950"
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          selectNodesOnDrag={false}
        >
          <Controls className="bg-gray-800 border-gray-600" />
          <MiniMap 
            className="bg-gray-800 border border-gray-600" 
            nodeColor="#374151"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
          <Background color="#374151" gap={16} />
        </ReactFlow>

        {/* Node Detail Modal */}
        <NodeDetailModal
          node={editingNode}
          isOpen={!!editingNode}
          onClose={() => setEditingNode(null)}
          onSave={saveNodeDetails}
          onOpenCodeEditor={openCodeEditor}
        />

        {/* Full Screen Code Editor */}
        {showCodeEditor && editingCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-600 rounded-lg w-[90vw] h-[80vh] flex flex-col">
              <div className="p-4 border-b border-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">Code Editor</h3>
                  <select
                    value={editingCode.language}
                    onChange={(e) => setEditingCode(prev => prev ? {...prev, language: e.target.value} : null)}
                    className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="sql">SQL</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="json">JSON</option>
                    <option value="yaml">YAML</option>
                    <option value="bash">Bash</option>
                    <option value="dockerfile">Dockerfile</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      saveCodeFromEditor(editingCode.nodeId, editingCode.code);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowCodeEditor(false);
                      setEditingCode(null);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <textarea
                  value={editingCode.code}
                  onChange={(e) => setEditingCode(prev => prev ? {...prev, code: e.target.value} : null)}
                  className="w-full h-full p-4 bg-gray-950 text-white font-mono text-sm resize-none border-none outline-none"
                  placeholder="Enter your code here..."
                  style={{
                    fontFamily: 'JetBrains Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    lineHeight: '1.5',
                    tabSize: 2
                  }}
                />
                
                {/* Simple syntax highlighting overlay */}
                <div className="absolute top-4 right-4 bg-gray-800 rounded px-2 py-1 text-xs text-gray-400">
                  Lines: {editingCode.code.split('\n').length} | Characters: {editingCode.code.length}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-600 bg-gray-800">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>Language: {editingCode.language}</span>
                    <span>Tab size: 2</span>
                  </div>
                  <div className="text-xs">
                    Tip: Use Ctrl+A to select all, Ctrl+/ to toggle comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BAML Schema Output */}
        {showBAMLOutput && (
          <div className="absolute top-4 right-4 w-[500px] h-[600px] bg-gray-900 border border-gray-600 rounded-lg shadow-2xl">
            <div className="p-3 border-b border-gray-600 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Schema</h3>
                <p className="text-xs text-gray-400">For LLM code generation</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(generateBAMLSchema)}
                  className="text-gray-400 hover:text-white px-2 py-1 text-xs border border-gray-600 rounded"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowBAMLOutput(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-3 text-xs text-gray-300 overflow-auto h-full bg-gray-950 font-mono">
              <pre className="whitespace-pre-wrap">{generateBAMLSchema}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};