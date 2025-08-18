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
  getBezierPath,
  EdgeProps,
  BaseEdge,
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

// Zone/Group Node for visual boundaries
const ZoneNode = ({ data, selected }: {data: any; selected?: boolean}) => {
  const getZoneStyle = () => {
    switch (data.zone) {
      case 'internet':
        return {
          bg: 'bg-blue-900/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          label: '🌐 Internet Zone'
        };
      case 'dmz':
        return {
          bg: 'bg-red-900/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          label: '🛡️ DMZ (Demilitarized Zone)'
        };
      case 'application':
        return {
          bg: 'bg-purple-900/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          label: '⚙️ Application Layer'
        };
      case 'data':
        return {
          bg: 'bg-green-900/10',
          border: 'border-green-500/30',
          text: 'text-green-400',
          label: '💾 Data Layer'
        };
      case 'infrastructure':
        return {
          bg: 'bg-gray-900/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          label: '🏗️ Infrastructure'
        };
      case 'external':
        return {
          bg: 'bg-cyan-900/10',
          border: 'border-cyan-500/30',
          text: 'text-cyan-400',
          label: '☁️ External Services'
        };
      case 'monitoring':
        return {
          bg: 'bg-yellow-900/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          label: '📊 Monitoring & Observability'
        };
      default:
        return {
          bg: 'bg-gray-900/10',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          label: data.label
        };
    }
  };

  const style = getZoneStyle();

  return (
    <div 
      className={`${style.bg} ${style.border} border-2 border-dashed rounded-xl cursor-move hover:bg-opacity-20 transition-all duration-200 ${
        selected ? 'ring-2 ring-white/30 border-solid' : ''
      }`}
      style={{
        width: data.width || 400,
        height: data.height || 300,
      }}
    >
      <div 
        className={`${style.text} text-sm font-semibold px-3 py-1 bg-black/20 rounded-tr-xl inline-block pointer-events-none select-none`}
      >
        {style.label}
      </div>
      {selected && (
        <div className="absolute top-2 right-2 text-white/60 text-xs pointer-events-none select-none">
          Draggable Zone
        </div>
      )}
    </div>
  );
};

// Custom node components with enhanced visual hierarchy
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
  const getDbColors = () => {
    const dbType = data.dbType?.toLowerCase() || '';
    const label = data.label?.toLowerCase() || '';
    
    // Vector databases - Teal
    if (dbType.includes('vector') || dbType.includes('pinecone') || dbType.includes('weaviate')) {
      return {
        border: selected ? 'border-teal-400' : 'border-teal-600',
        bg: selected ? 'bg-teal-900/70' : 'bg-teal-800/50',
        icon: 'text-teal-300',
        glow: 'shadow-teal-500/30'
      };
    }
    
    // Graph databases - Emerald
    if (dbType.includes('graph') || dbType.includes('neo4j')) {
      return {
        border: selected ? 'border-emerald-400' : 'border-emerald-600',
        bg: selected ? 'bg-emerald-900/70' : 'bg-emerald-800/50',
        icon: 'text-emerald-300',
        glow: 'shadow-emerald-500/30'
      };
    }
    
    // Memory stores - Sky
    if (label.includes('memory') || dbType.includes('redis')) {
      return {
        border: selected ? 'border-sky-400' : 'border-sky-600',
        bg: selected ? 'bg-sky-900/70' : 'bg-sky-800/50',
        icon: 'text-sky-300',
        glow: 'shadow-sky-500/30'
      };
    }
    
    // Time series - Violet
    if (dbType.includes('influx') || label.includes('episodic')) {
      return {
        border: selected ? 'border-violet-400' : 'border-violet-600',
        bg: selected ? 'bg-violet-900/70' : 'bg-violet-800/50',
        icon: 'text-violet-300',
        glow: 'shadow-violet-500/30'
      };
    }
    
    // Default SQL - Blue
    return {
      border: selected ? 'border-blue-400' : 'border-blue-600',
      bg: selected ? 'bg-blue-900/70' : 'bg-blue-800/50',
      icon: 'text-blue-300',
      glow: 'shadow-blue-500/30'
    };
  };

  const colors = getDbColors();

  return (
    <div className={`px-4 py-3 shadow-xl rounded-lg border-2 min-w-[160px] cursor-move ${colors.border} ${colors.bg} ${colors.glow} hover:shadow-2xl transition-all duration-200 ${
      selected ? 'ring-2 ring-white/50 scale-105' : ''
    }`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`w-3 h-3 ${colors.border.replace('border-', 'bg-')}`}
      />
      <div className="text-center">
        <Database className={`w-5 h-5 mx-auto mb-1 ${colors.icon}`} />
        <div className="font-semibold text-white text-sm">{data.label}</div>
        <div className="text-xs text-gray-300 opacity-80">{data.dbType || 'Database'}</div>
        {data.tables && (
          <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-600/50">
            <div className="font-semibold mb-1">Tables:</div>
            {data.tables.slice(0, 2).map((table: string, i: number) => (
              <div key={i}>• {table}</div>
            ))}
            {data.tables.length > 2 && <div className="italic">+{data.tables.length - 2} more</div>}
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`w-3 h-3 ${colors.border.replace('border-', 'bg-')}`}
      />
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

  // Enhanced color scheme based on service layer
  const getServiceColors = () => {
    const label = data.label?.toLowerCase() || '';
    const serviceType = data.serviceType?.toLowerCase() || '';
    
    // Layer 1: Entry points & Gateway - Blue theme
    if (label.includes('gateway') || label.includes('balancer')) {
      return {
        border: selected ? 'border-blue-400' : 'border-blue-600',
        bg: selected ? 'bg-blue-900/70' : 'bg-blue-800/50',
        icon: 'text-blue-300',
        glow: 'shadow-blue-500/30'
      };
    }
    
    // Layer 2: Security - Red theme
    if (label.includes('validator') || label.includes('guard') || label.includes('filter') || label.includes('audit')) {
      return {
        border: selected ? 'border-red-400' : 'border-red-600',
        bg: selected ? 'bg-red-900/70' : 'bg-red-800/50',
        icon: 'text-red-300',
        glow: 'shadow-red-500/30'
      };
    }
    
    // Layer 3: Core Orchestration - Purple theme
    if (label.includes('orchestrator') || label.includes('dispatcher') || label.includes('registry') || label.includes('queue') || label.includes('config')) {
      return {
        border: selected ? 'border-purple-400' : 'border-purple-600',
        bg: selected ? 'bg-purple-900/70' : 'bg-purple-800/50',
        icon: 'text-purple-300',
        glow: 'shadow-purple-500/30'
      };
    }
    
    // Layer 4: AI Agents - Green theme
    if (label.includes('agent') && serviceType.includes('llm')) {
      return {
        border: selected ? 'border-green-400' : 'border-green-600',
        bg: selected ? 'bg-green-900/70' : 'bg-green-800/50',
        icon: 'text-green-300',
        glow: 'shadow-green-500/30'
      };
    }
    
    // Layer 5: Tool Services - Orange theme
    if (label.includes('tool') || label.includes('executor') || label.includes('scraper')) {
      return {
        border: selected ? 'border-orange-400' : 'border-orange-600',
        bg: selected ? 'bg-orange-900/70' : 'bg-orange-800/50',
        icon: 'text-orange-300',
        glow: 'shadow-orange-500/30'
      };
    }
    
    // Layer 6: Learning Systems - Pink theme
    if (label.includes('feedback') || label.includes('learner') || label.includes('trainer')) {
      return {
        border: selected ? 'border-pink-400' : 'border-pink-600',
        bg: selected ? 'bg-pink-900/70' : 'bg-pink-800/50',
        icon: 'text-pink-300',
        glow: 'shadow-pink-500/30'
      };
    }
    
    // External Services - Cyan theme
    if (label.includes('llm provider') || label.includes('external')) {
      return {
        border: selected ? 'border-cyan-400' : 'border-cyan-600',
        bg: selected ? 'bg-cyan-900/70' : 'bg-cyan-800/50',
        icon: 'text-cyan-300',
        glow: 'shadow-cyan-500/30'
      };
    }
    
    // Monitoring - Yellow theme
    if (label.includes('logger') || serviceType.includes('telemetry')) {
      return {
        border: selected ? 'border-yellow-400' : 'border-yellow-600',
        bg: selected ? 'bg-yellow-900/70' : 'bg-yellow-800/50',
        icon: 'text-yellow-300',
        glow: 'shadow-yellow-500/30'
      };
    }
    
    // Default
    return {
      border: selected ? 'border-gray-400' : 'border-gray-600',
      bg: selected ? 'bg-gray-800' : 'bg-gray-700',
      icon: 'text-gray-400',
      glow: 'shadow-gray-500/20'
    };
  };

  const colors = getServiceColors();
  const isOrchestrator = data.label?.includes('Master Orchestrator');
  const size = isOrchestrator ? 'min-w-[180px] min-h-[80px]' : 'min-w-[160px]';

  return (
    <div className={`px-4 py-3 shadow-xl rounded-lg border-2 ${size} ${colors.border} ${colors.bg} ${colors.glow} hover:shadow-2xl transition-all duration-200 cursor-move ${
      isOrchestrator ? 'ring-2 ring-purple-500/30' : ''
    } ${selected ? 'ring-2 ring-white/50 scale-105' : ''}`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`w-3 h-3 ${colors.border.replace('border-', 'bg-')}`}
      />
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Server className={`w-5 h-5 ${colors.icon}`} />
          {data.cost && <span className="text-xs">{getCostIndicator(data.cost)}</span>}
        </div>
        <div className={`font-semibold text-white ${isOrchestrator ? 'text-base' : 'text-sm'}`}>
          {data.label}
        </div>
        <div className="text-xs text-gray-300 opacity-80">{data.serviceType || 'Service'}</div>
        {data.reliability && (
          <div className="text-xs text-blue-300 mt-1 opacity-90">
            {data.reliability} reliability
          </div>
        )}
        {data.endpoints && data.endpoints.length > 0 && (
          <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-600/50">
            <div className="font-semibold mb-1">Endpoints:</div>
            {data.endpoints.slice(0, 2).map((endpoint: string, i: number) => (
              <div key={i} className="truncate">• {endpoint}</div>
            ))}
            {data.endpoints.length > 2 && <div className="italic">+{data.endpoints.length - 2} more</div>}
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`w-3 h-3 ${colors.border.replace('border-', 'bg-')}`}
      />
    </div>
  );
};

const InterfaceNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-4 py-3 shadow-xl rounded-lg border-2 min-w-[160px] cursor-move ${
      selected 
        ? 'border-indigo-400 bg-indigo-900/70 shadow-indigo-500/40 ring-2 ring-white/30 scale-105' 
        : 'border-indigo-600 bg-indigo-800/50 shadow-indigo-500/20'
    } hover:shadow-2xl transition-all duration-200`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-indigo-500"
      />
      <div className="text-center">
        <Globe className="w-5 h-5 mx-auto mb-1 text-indigo-300" />
        <div className="font-semibold text-white text-sm">{data.label}</div>
        <div className="text-xs text-indigo-200 opacity-80">{data.interfaceType || 'Interface'}</div>
        {data.framework && (
          <div className="text-xs text-indigo-300 mt-1">
            {data.framework}
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-indigo-500"
      />
    </div>
  );
};

const ActorNode = ({ data, selected }: {data: any; selected: boolean}) => {
  return (
    <div className={`px-4 py-3 shadow-2xl rounded-full border-3 min-w-[140px] cursor-move ${
      selected 
        ? 'border-amber-400 bg-amber-900/80 shadow-amber-500/50 ring-2 ring-amber-400/30 scale-110' 
        : 'border-amber-500 bg-amber-800/60 shadow-amber-500/30'
    } hover:shadow-3xl transition-all duration-200`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-amber-500"
      />
      <div className="text-center">
        <User className="w-6 h-6 mx-auto mb-1 text-amber-300" />
        <div className="font-bold text-white text-base">{data.label}</div>
        <div className="text-xs text-amber-200">{data.role || 'Actor'}</div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-amber-500"
      />
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
  const getEvalIcon = () => {
    const label = data.label?.toLowerCase() || '';
    if (label.includes('performance')) return '⚡';
    if (label.includes('cost')) return '💰';
    if (label.includes('error')) return '🚨';
    return '📊';
  };

  return (
    <div className={`px-4 py-3 shadow-xl rounded-lg border-2 min-w-[160px] ${
      selected 
        ? 'border-yellow-400 bg-yellow-900/70 shadow-yellow-500/40' 
        : 'border-yellow-600 bg-yellow-800/50 shadow-yellow-500/20'
    } hover:shadow-2xl transition-all duration-200`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-yellow-500"
      />
      <div className="text-center">
        <div className="text-2xl mb-1">{getEvalIcon()}</div>
        <div className="font-semibold text-white text-sm">{data.label}</div>
        <div className="text-xs text-yellow-300 opacity-80">{data.type || 'Monitoring'}</div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-yellow-500"
      />
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

// Custom edge component with animated gradient
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getEdgeColor = () => {
    // Priority/critical paths
    if (data?.priority === 'high') return '#ef4444'; // Red
    if (data?.type === 'security') return '#dc2626'; // Dark red
    if (data?.type === 'llm') return '#10b981'; // Green
    if (data?.type === 'data') return '#3b82f6'; // Blue
    if (data?.type === 'monitoring') return '#eab308'; // Yellow
    return '#6b7280'; // Gray default
  };

  const edgeColor = getEdgeColor();

  return (
    <>
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={edgeColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={edgeColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={edgeColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <BaseEdge 
        id={id} 
        path={edgePath}
        style={{
          stroke: selected ? edgeColor : `url(#gradient-${id})`,
          strokeWidth: selected ? 3 : 2,
          filter: selected ? 'drop-shadow(0 0 4px rgba(255,255,255,0.3))' : 'none',
          ...style
        }}
      />
      {selected && (
        <circle r="3" fill={edgeColor}>
          <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
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
  zone: ZoneNode,
};

const edgeTypes = {
  custom: CustomEdge,
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

  // Handle zone dragging and move contained nodes automatically
  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node, draggedNodes: Node[]) => {
    if (node.type === 'zone') {
      // Find the zone that was dragged
      const draggedZone = draggedNodes.find(n => n.id === node.id);
      if (!draggedZone) return;
      
      // Calculate the movement delta
      const originalZoneNode = nodes.find(n => n.id === node.id);
      if (!originalZoneNode) return;
      
      const deltaX = draggedZone.position.x - originalZoneNode.position.x;
      const deltaY = draggedZone.position.y - originalZoneNode.position.y;
      
      // Move all nodes that belong to this zone
      const zoneName = draggedZone.data.zone;
      setNodes((nds) => 
        nds.map((n) => {
          if (n.type !== 'zone' && n.data.zone === zoneName) {
            return {
              ...n,
              position: {
                x: n.position.x + deltaX,
                y: n.position.y + deltaY
              }
            };
          }
          return n;
        })
      );
    }
  }, [nodes, setNodes]);

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
      case 'agentic-ai-system':
        // Smart layout calculation inline
        const nodeWidth = 220;
        const nodeHeight = 140;
        const zonePadding = 50; // Keep padding reasonable
        const nodeSpacingX = 400;
        const nodeSpacingY = 200;
        
        // Define node positions by zone
        const nodePositions = [
          // Internet Zone nodes
          { id: 'chat-ui', x: 150, y: 100, zone: 'internet' },
          { id: 'user', x: 550, y: 100, zone: 'internet' },
          { id: 'dashboard', x: 950, y: 100, zone: 'internet' },
          
          // DMZ Zone nodes
          { id: 'load-balancer', x: 350, y: 400, zone: 'dmz' },
          { id: 'api-gateway', x: 750, y: 400, zone: 'dmz' },
          
          // Application Zone nodes
          { id: 'input-validator', x: 150, y: 700, zone: 'application' },
          { id: 'guard-agent', x: 550, y: 700, zone: 'application' },
          { id: 'output-filter', x: 950, y: 700, zone: 'application' },
          { id: 'audit-logger', x: 1350, y: 700, zone: 'application' },
          
          { id: 'agent-registry', x: 350, y: 900, zone: 'application' },
          { id: 'master-orchestrator', x: 750, y: 900, zone: 'application' },
          { id: 'task-dispatcher', x: 1150, y: 900, zone: 'application' },
          
          { id: 'planning-agent', x: 150, y: 1100, zone: 'application' },
          { id: 'execution-agent', x: 550, y: 1100, zone: 'application' },
          { id: 'memory-agent', x: 950, y: 1100, zone: 'application' },
          { id: 'tool-agent', x: 1350, y: 1100, zone: 'application' },
          { id: 'evaluation-agent', x: 1750, y: 1100, zone: 'application' },
          { id: 'reflection-agent', x: 950, y: 1250, zone: 'application' },
          
          // Data Zone nodes - NO OVERLAP (Application ends Y:1440, Data starts Y:1500)
          { id: 'vector-db', x: 150, y: 1500, zone: 'data' },
          { id: 'knowledge-graph', x: 550, y: 1500, zone: 'data' },
          { id: 'short-term-memory', x: 950, y: 1500, zone: 'data' },
          { id: 'long-term-memory', x: 1350, y: 1500, zone: 'data' },
          { id: 'episodic-memory', x: 1750, y: 1500, zone: 'data' },
          
          // Infrastructure Zone nodes - Compact layout within zone boundaries
          { id: 'message-queue', x: 150, y: 1750, zone: 'infrastructure' },
          { id: 'config-manager', x: 550, y: 1750, zone: 'infrastructure' },
          { id: 'tool-registry', x: 950, y: 1750, zone: 'infrastructure' },
          { id: 'code-executor', x: 350, y: 1820, zone: 'infrastructure' },
          { id: 'web-scraper', x: 750, y: 1820, zone: 'infrastructure' },
          
          // External Zone nodes (moved far right)
          { id: 'llm-provider', x: 2400, y: 700, zone: 'external' },
          { id: 'external-apis', x: 2400, y: 1100, zone: 'external' },
          
          // Monitoring Zone nodes - NO OVERLAP (Infrastructure ends Y:2040, Monitoring starts Y:2100)
          { id: 'feedback-collector', x: 1450, y: 2100, zone: 'monitoring' },
          { id: 'preference-learner', x: 1850, y: 2100, zone: 'monitoring' },
          { id: 'model-trainer', x: 2250, y: 2100, zone: 'monitoring' },
          { id: 'performance-monitor', x: 1550, y: 2200, zone: 'monitoring' },
          { id: 'trace-logger', x: 1850, y: 2200, zone: 'monitoring' },
          { id: 'error-monitor', x: 2150, y: 2200, zone: 'monitoring' },
          { id: 'cost-tracker', x: 2450, y: 2200, zone: 'monitoring' },
        ];
        
        // Calculate zone boundaries
        const zones = ['internet', 'dmz', 'application', 'data', 'infrastructure', 'external', 'monitoring'];
        const zoneBounds: Record<string, any> = {};
        
        zones.forEach(zone => {
          const zoneNodes = nodePositions.filter(n => n.zone === zone);
          if (zoneNodes.length > 0) {
            const minX = Math.min(...zoneNodes.map(n => n.x)) - zonePadding;
            const minY = Math.min(...zoneNodes.map(n => n.y)) - zonePadding;
            const maxX = Math.max(...zoneNodes.map(n => n.x)) + nodeWidth + zonePadding;
            const maxY = Math.max(...zoneNodes.map(n => n.y)) + nodeHeight + zonePadding;
            
            zoneBounds[zone] = {
              minX,
              minY,
              maxX,
              maxY,
              nodes: zoneNodes.map(n => n.id)
            };
          }
        });
        
        // Manual positioning - no automatic zone spacing needed
        // Zones are positioned manually with optimal spacing
        
        // Node mapping with all data attributes
        const nodeMapping: Record<string, any> = {
          // Internet Zone nodes
          'chat-ui': { type: 'interface', data: { label: 'Chat Interface', interfaceType: 'React App', framework: 'React', pages: ['chat', 'history'], zone: 'internet' } },
          'user': { type: 'actor', data: { label: 'User', role: 'End User', zone: 'internet' } },
          'dashboard': { type: 'interface', data: { label: 'Admin Dashboard', interfaceType: 'Web App', framework: 'React', pages: ['dashboard', 'agents', 'logs'], zone: 'internet' } },
          
          // DMZ Zone nodes
          'load-balancer': { type: 'service', data: { label: 'Load Balancer', serviceType: 'HAProxy', endpoints: ['/balance', '/health', '/route'], complexity: 'low', reliability: 'critical', zone: 'dmz' } },
          'api-gateway': { type: 'service', data: { label: 'API Gateway', serviceType: 'Kong/Nginx', endpoints: ['/api/chat', '/api/agents', '/api/tools'], complexity: 'medium', reliability: 'high', zone: 'dmz' } },
          
          // Application Zone nodes
          'input-validator': { type: 'service', data: { label: 'Input Validator', serviceType: 'Python', endpoints: ['/validate', '/sanitize', '/filter'], complexity: 'medium', reliability: 'critical', zone: 'application' } },
          'guard-agent': { type: 'service', data: { label: 'Guard Agent', serviceType: 'Python', endpoints: ['/validate', '/filter', '/block'], complexity: 'medium', reliability: 'critical', zone: 'application' } },
          'output-filter': { type: 'service', data: { label: 'Output Filter', serviceType: 'Python', endpoints: ['/filter', '/scan', '/approve'], complexity: 'medium', reliability: 'critical', zone: 'application' } },
          'audit-logger': { type: 'service', data: { label: 'Audit Logger', serviceType: 'Go', endpoints: ['/log', '/audit', '/trace'], complexity: 'low', reliability: 'critical', zone: 'application' } },
          'agent-registry': { type: 'service', data: { label: 'Agent Registry', serviceType: 'Go', endpoints: ['/register', '/discover', '/health'], complexity: 'medium', reliability: 'high', zone: 'application' } },
          'master-orchestrator': { type: 'service', data: { label: 'Master Orchestrator', serviceType: 'Node.js', endpoints: ['/orchestrate', '/delegate', '/coordinate'], complexity: 'high', reliability: 'critical', zone: 'application' } },
          'task-dispatcher': { type: 'service', data: { label: 'Task Dispatcher', serviceType: 'Python', endpoints: ['/dispatch', '/queue', '/priority'], complexity: 'medium', reliability: 'high', zone: 'application' } },
          
          // Application Zone - Specialized Agents
          'planning-agent': { type: 'service', data: { label: 'Planning Agent', serviceType: 'Python + LLM', endpoints: ['/plan', '/decompose', '/goals'], complexity: 'high', reliability: 'high', zone: 'application' } },
          'execution-agent': { type: 'service', data: { label: 'Execution Agent', serviceType: 'Python', endpoints: ['/execute', '/action', '/result'], complexity: 'high', reliability: 'high', zone: 'application' } },
          'memory-agent': { type: 'service', data: { label: 'Memory Agent', serviceType: 'Python + Vector DB', endpoints: ['/store', '/retrieve', '/update'], complexity: 'high', reliability: 'critical', zone: 'application' } },
          'tool-agent': { type: 'service', data: { label: 'Tool Agent', serviceType: 'Python', endpoints: ['/tools', '/call', '/validate'], complexity: 'medium', reliability: 'high', zone: 'application' } },
          'evaluation-agent': { type: 'service', data: { label: 'Evaluation Agent', serviceType: 'Python + LLM', endpoints: ['/evaluate', '/score', '/feedback'], complexity: 'medium', reliability: 'high', zone: 'application' } },
          'reflection-agent': { type: 'service', data: { label: 'Reflection Agent', serviceType: 'Python + LLM', endpoints: ['/reflect', '/learn', '/improve'], complexity: 'high', reliability: 'standard', zone: 'application' } },
          
          // Data Zone nodes
          'vector-db': { type: 'database', data: { label: 'Vector Database', dbType: 'Pinecone/Weaviate', tables: ['embeddings', 'metadata'], complexity: 'medium', reliability: 'high', zone: 'data' } },
          'knowledge-graph': { type: 'database', data: { label: 'Knowledge Graph', dbType: 'Neo4j', tables: ['entities', 'relationships'], complexity: 'high', reliability: 'high', zone: 'data' } },
          'short-term-memory': { type: 'database', data: { label: 'Short-term Memory', dbType: 'Redis', tables: ['conversations', 'context'], complexity: 'low', reliability: 'high', zone: 'data' } },
          'long-term-memory': { type: 'database', data: { label: 'Long-term Memory', dbType: 'PostgreSQL', tables: ['knowledge', 'experiences'], complexity: 'medium', reliability: 'critical', zone: 'data' } },
          'episodic-memory': { type: 'database', data: { label: 'Episodic Memory', dbType: 'InfluxDB', tables: ['episodes', 'timeseries'], complexity: 'medium', reliability: 'standard', zone: 'data' } },
          
          // Infrastructure Zone nodes
          'message-queue': { type: 'service', data: { label: 'Message Queue', serviceType: 'RabbitMQ/Kafka', endpoints: ['/publish', '/subscribe', '/dlq'], complexity: 'medium', reliability: 'high', zone: 'infrastructure' } },
          'config-manager': { type: 'service', data: { label: 'Config Manager', serviceType: 'Consul/etcd', endpoints: ['/config', '/secrets', '/watch'], complexity: 'low', reliability: 'high', zone: 'infrastructure' } },
          'tool-registry': { type: 'service', data: { label: 'Tool Registry', serviceType: 'Go', endpoints: ['/tools', '/register', '/catalog'], complexity: 'low', reliability: 'high', zone: 'infrastructure' } },
          'code-executor': { type: 'service', data: { label: 'Code Executor', serviceType: 'Docker + Python', endpoints: ['/execute', '/sandbox', '/result'], complexity: 'high', reliability: 'high', zone: 'infrastructure' } },
          'web-scraper': { type: 'service', data: { label: 'Web Scraper', serviceType: 'Python + Selenium', endpoints: ['/scrape', '/extract', '/clean'], complexity: 'medium', reliability: 'standard', zone: 'infrastructure' } },
          
          // External Zone nodes
          'llm-provider': { type: 'service', data: { label: 'LLM Provider', serviceType: 'OpenAI/Anthropic', endpoints: ['/completions', '/embeddings', '/models'], complexity: 'low', reliability: 'high', cost: 'high', zone: 'external' } },
          'external-apis': { type: 'service', data: { label: 'External APIs', serviceType: 'REST/GraphQL', endpoints: ['/weather', '/news', '/finance'], complexity: 'low', reliability: 'standard', zone: 'external' } },
          
          // Monitoring Zone nodes
          'feedback-collector': { type: 'service', data: { label: 'Feedback Collector', serviceType: 'Python', endpoints: ['/feedback', '/rating', '/analytics'], complexity: 'low', reliability: 'standard', zone: 'monitoring' } },
          'preference-learner': { type: 'service', data: { label: 'Preference Learner', serviceType: 'Python + ML', endpoints: ['/learn', '/adapt', '/preferences'], complexity: 'high', reliability: 'standard', zone: 'monitoring' } },
          'model-trainer': { type: 'service', data: { label: 'Model Trainer', serviceType: 'Python + GPU', endpoints: ['/train', '/finetune', '/validate'], complexity: 'critical', reliability: 'standard', zone: 'monitoring' } },
          'performance-monitor': { type: 'evaluation', data: { label: 'Performance Monitor', type: 'Monitoring', zone: 'monitoring' } },
          'trace-logger': { type: 'service', data: { label: 'Trace Logger', serviceType: 'OpenTelemetry', endpoints: ['/trace', '/metrics', '/logs'], complexity: 'medium', reliability: 'high', zone: 'monitoring' } },
          'error-monitor': { type: 'evaluation', data: { label: 'Error Monitor', type: 'Alerting', zone: 'monitoring' } },
          'cost-tracker': { type: 'evaluation', data: { label: 'Cost Tracker', type: 'Analytics', zone: 'monitoring' } },
        };
        
        // Create nodes from calculated positions
        const regularNodes = nodePositions.map((nodePos: any) => ({
          id: nodePos.id,
          type: nodeMapping[nodePos.id].type,
          position: { x: nodePos.x, y: nodePos.y },
          data: nodeMapping[nodePos.id].data,
          draggable: true,
          selectable: true
        }));
        
        // Create zone nodes from calculated bounds
        const zoneNodes = Object.entries(zoneBounds).map(([zone, bounds]: [string, any]) => ({
          id: `zone-${zone}`,
          type: 'zone',
          position: { x: bounds.minX, y: bounds.minY },
          data: { 
            zone, 
            width: bounds.maxX - bounds.minX, 
            height: bounds.maxY - bounds.minY 
          },
          draggable: true,
          selectable: true
        }));
        
        // Combine zone nodes and regular nodes
        templateNodes = [...zoneNodes, ...regularNodes];
        templateEdges = [
          // Layer 1: User Flow
          { id: 'e1', source: 'user', target: 'chat-ui', type: 'custom', animated: true },
          { id: 'e2', source: 'user', target: 'dashboard', type: 'custom', animated: true },
          { id: 'e3', source: 'chat-ui', target: 'load-balancer', type: 'custom' },
          { id: 'e4', source: 'dashboard', target: 'load-balancer', type: 'custom' },
          { id: 'e5', source: 'load-balancer', target: 'api-gateway', type: 'custom' },
          
          // Layer 2: Security Flow - High Priority
          { id: 'e6', source: 'api-gateway', target: 'input-validator', type: 'custom', data: { type: 'security', priority: 'high' } },
          { id: 'e7', source: 'input-validator', target: 'guard-agent', type: 'custom', data: { type: 'security', priority: 'high' } },
          { id: 'e8', source: 'guard-agent', target: 'output-filter', type: 'custom', data: { type: 'security' } },
          { id: 'e9', source: 'output-filter', target: 'audit-logger', type: 'custom', data: { type: 'security' } },
          
          // Layer 3: Orchestration Flow  
          { id: 'e10', source: 'guard-agent', target: 'master-orchestrator', type: 'custom', data: { priority: 'high' } },
          { id: 'e11', source: 'agent-registry', target: 'master-orchestrator', type: 'custom' },
          { id: 'e12', source: 'master-orchestrator', target: 'task-dispatcher', type: 'custom', data: { priority: 'high' }, animated: true },
          { id: 'e13', source: 'task-dispatcher', target: 'message-queue', type: 'custom' },
          { id: 'e14', source: 'config-manager', target: 'master-orchestrator', type: 'custom' },
          
          // Layer 4: Agent Coordination
          { id: 'e15', source: 'task-dispatcher', target: 'planning-agent', type: 'custom', animated: true },
          { id: 'e16', source: 'task-dispatcher', target: 'execution-agent', type: 'custom', animated: true },
          { id: 'e17', source: 'task-dispatcher', target: 'memory-agent', type: 'custom', animated: true },
          { id: 'e18', source: 'task-dispatcher', target: 'tool-agent', type: 'custom', animated: true },
          { id: 'e19', source: 'task-dispatcher', target: 'evaluation-agent', type: 'custom', animated: true },
          { id: 'e20', source: 'task-dispatcher', target: 'reflection-agent', type: 'custom', animated: true },
          
          // Layer 5: Memory Systems
          { id: 'e21', source: 'memory-agent', target: 'vector-db', type: 'custom', data: { type: 'data' } },
          { id: 'e22', source: 'memory-agent', target: 'knowledge-graph', type: 'custom', data: { type: 'data' } },
          { id: 'e23', source: 'memory-agent', target: 'short-term-memory', type: 'custom', data: { type: 'data' } },
          { id: 'e24', source: 'memory-agent', target: 'long-term-memory', type: 'custom', data: { type: 'data' } },
          { id: 'e25', source: 'memory-agent', target: 'episodic-memory', type: 'custom', data: { type: 'data' } },
          
          // Layer 6: Tool Integration
          { id: 'e26', source: 'tool-agent', target: 'tool-registry', type: 'custom' },
          { id: 'e27', source: 'tool-agent', target: 'code-executor', type: 'custom' },
          { id: 'e28', source: 'tool-agent', target: 'web-scraper', type: 'custom' },
          { id: 'e29', source: 'tool-agent', target: 'external-apis', type: 'custom' },
          
          // Layer 7: Learning Systems
          { id: 'e30', source: 'evaluation-agent', target: 'feedback-collector', type: 'custom' },
          { id: 'e31', source: 'feedback-collector', target: 'preference-learner', type: 'custom' },
          { id: 'e32', source: 'preference-learner', target: 'model-trainer', type: 'custom' },
          
          // LLM Integration - Green for AI
          { id: 'e33', source: 'planning-agent', target: 'llm-provider', type: 'custom', data: { type: 'llm' }, animated: true },
          { id: 'e34', source: 'execution-agent', target: 'llm-provider', type: 'custom', data: { type: 'llm' }, animated: true },
          { id: 'e35', source: 'evaluation-agent', target: 'llm-provider', type: 'custom', data: { type: 'llm' }, animated: true },
          { id: 'e36', source: 'reflection-agent', target: 'llm-provider', type: 'custom', data: { type: 'llm' }, animated: true },
          
          // Monitoring & Observability - Yellow
          { id: 'e37', source: 'master-orchestrator', target: 'performance-monitor', type: 'custom', data: { type: 'monitoring' } },
          { id: 'e38', source: 'llm-provider', target: 'cost-tracker', type: 'custom', data: { type: 'monitoring' } },
          { id: 'e39', source: 'master-orchestrator', target: 'error-monitor', type: 'custom', data: { type: 'monitoring' } },
          { id: 'e40', source: 'master-orchestrator', target: 'trace-logger', type: 'custom', data: { type: 'monitoring' } },
          
          // Cross-layer connections
          { id: 'e41', source: 'planning-agent', target: 'execution-agent', type: 'custom' },
          { id: 'e42', source: 'execution-agent', target: 'evaluation-agent', type: 'custom' },
          { id: 'e43', source: 'evaluation-agent', target: 'reflection-agent', type: 'custom' },
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
              onClick={() => loadTemplate('agentic-ai-system')}
              className="w-full text-left px-3 py-3 bg-gradient-to-r from-purple-900/50 to-blue-900/50 hover:from-purple-800/60 hover:to-blue-800/60 rounded border border-purple-500/30 hover:border-purple-400/50 transition-colors relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all"></div>
              <div className="relative flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-500/20 rounded-full">
                  <span className="text-sm">🤖</span>
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Complete Agentic AI System</div>
                  <div className="text-purple-300 text-xs">Full enterprise-grade architecture</div>
                  <div className="text-gray-400 text-xs mt-1">40+ components, 9 layers, production-ready</div>
                </div>
              </div>
            </button>
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
          onNodeDragStop={onNodeDragStop}
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
          edgeTypes={edgeTypes}
          className="bg-gray-950"
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          defaultEdgeOptions={{
            type: 'custom',
            animated: false,
          }}
          fitView
          fitViewOptions={{
            padding: 0.1,
            includeHiddenNodes: false,
            minZoom: 0.05,
            maxZoom: 1.5
          }}
          minZoom={0.01}
          maxZoom={5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.15 }}
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