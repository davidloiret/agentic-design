'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, FileText, Image, Music, Video, Code, Database, Search, Brain, Layers, Hash, Tag, Clock, Activity, BarChart3, Zap, Filter, Globe } from 'lucide-react';

interface MemoryChunk {
  id: string;
  content: any;
  modality: 'text' | 'image' | 'audio' | 'video' | 'code' | 'structured' | 'mixed';
  encoding: 'raw' | 'embedding' | 'compressed' | 'tokenized';
  metadata: {
    source: string;
    timestamp: number;
    context: string;
    tags: string[];
    relevance: number;
    accessCount: number;
    lastAccessed: number;
    size: number;
  };
  embeddings?: number[];
  associations: string[];
}

interface ProcessingAgent {
  id: string;
  name: string;
  type: 'encoder' | 'retriever' | 'synthesizer' | 'contextualizer' | 'compressor';
  modalities: string[];
  status: 'idle' | 'processing' | 'retrieving' | 'encoding';
  currentTask?: string;
  performance: {
    tasksCompleted: number;
    avgProcessingTime: number;
    accuracy: number;
  };
}

interface RetrievalQuery {
  id: string;
  query: string;
  modalities: string[];
  filters: {
    timeRange?: [number, number];
    tags?: string[];
    minRelevance?: number;
  };
  results: MemoryChunk[];
  latency: number;
  status: 'pending' | 'searching' | 'ranking' | 'completed';
}

interface SystemMetrics {
  totalChunks: number;
  totalSize: number;
  modalityDistribution: Map<string, number>;
  averageRetrievalTime: number;
  compressionRatio: number;
  crossModalAssociations: number;
  activeQueries: number;
  memoryUtilization: number;
}

const modalityIcons = {
  text: FileText,
  image: Image,
  audio: Music,
  video: Video,
  code: Code,
  structured: Database,
  mixed: Layers
};

const sampleInputs = [
  {
    content: "The quantum computing breakthrough announced today marks a significant milestone in computational physics, with implications for cryptography and drug discovery.",
    modality: 'text' as const,
    context: "Scientific article on quantum computing advances"
  },
  {
    content: "🖼️ [Image: Neural network architecture diagram showing 12 layers with attention mechanisms]",
    modality: 'image' as const,
    context: "Deep learning model visualization"
  },
  {
    content: "🎵 [Audio: 3.2s clip of whale song at 52Hz frequency]",
    modality: 'audio' as const,
    context: "Marine biology research recording"
  },
  {
    content: "def fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)",
    modality: 'code' as const,
    context: "Python implementation of recursive algorithm"
  },
  {
    content: "📹 [Video: 5s timelapse of cell division process]",
    modality: 'video' as const,
    context: "Biological process documentation"
  },
  {
    content: '{"temperature": 23.5, "humidity": 65, "pressure": 1013.25, "location": "Lab A"}',
    modality: 'structured' as const,
    context: "Environmental sensor data"
  },
  {
    content: "Mixed content: Text describing image 🖼️ with embedded code `print('hello')` and data points [1,2,3]",
    modality: 'mixed' as const,
    context: "Multimodal research notebook entry"
  }
];

const initialAgents: ProcessingAgent[] = [
  {
    id: 'agent-encoder',
    name: 'Universal Encoder',
    type: 'encoder',
    modalities: ['text', 'image', 'audio', 'video', 'code', 'structured', 'mixed'],
    status: 'idle',
    performance: { tasksCompleted: 0, avgProcessingTime: 250, accuracy: 0.95 }
  },
  {
    id: 'agent-retriever',
    name: 'Semantic Retriever',
    type: 'retriever',
    modalities: ['text', 'image', 'code', 'mixed'],
    status: 'idle',
    performance: { tasksCompleted: 0, avgProcessingTime: 150, accuracy: 0.92 }
  },
  {
    id: 'agent-synthesizer',
    name: 'Cross-Modal Synthesizer',
    type: 'synthesizer',
    modalities: ['mixed'],
    status: 'idle',
    performance: { tasksCompleted: 0, avgProcessingTime: 350, accuracy: 0.88 }
  },
  {
    id: 'agent-contextualizer',
    name: 'Context Analyzer',
    type: 'contextualizer',
    modalities: ['text', 'structured', 'mixed'],
    status: 'idle',
    performance: { tasksCompleted: 0, avgProcessingTime: 200, accuracy: 0.90 }
  },
  {
    id: 'agent-compressor',
    name: 'Memory Compressor',
    type: 'compressor',
    modalities: ['text', 'image', 'video'],
    status: 'idle',
    performance: { tasksCompleted: 0, avgProcessingTime: 300, accuracy: 0.93 }
  }
];

export const ContextualUnstructuredMemoryDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const [memoryChunks, setMemoryChunks] = useState<MemoryChunk[]>([]);
  const [agents, setAgents] = useState<ProcessingAgent[]>(initialAgents);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [queries, setQueries] = useState<RetrievalQuery[]>([]);
  const [currentQuery, setCurrentQuery] = useState<RetrievalQuery | null>(null);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalChunks: 0,
    totalSize: 0,
    modalityDistribution: new Map(),
    averageRetrievalTime: 0,
    compressionRatio: 1.0,
    crossModalAssociations: 0,
    activeQueries: 0,
    memoryUtilization: 0
  });
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addLogEntry = useCallback((message: string) => {
    setOperationLog(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  const resetDemo = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    setMemoryChunks([]);
    setAgents(initialAgents);
    setCurrentInputIndex(0);
    setQueries([]);
    setCurrentQuery(null);
    setMetrics({
      totalChunks: 0,
      totalSize: 0,
      modalityDistribution: new Map(),
      averageRetrievalTime: 0,
      compressionRatio: 1.0,
      crossModalAssociations: 0,
      activeQueries: 0,
      memoryUtilization: 0
    });
    setOperationLog([]);
    setSelectedChunk(null);
  }, []);

  // Generate embeddings simulation
  const generateEmbeddings = useCallback((content: any, modality: string): number[] => {
    const embeddings = [];
    const dimensions = 384; // Simulated embedding dimensions

    // Create pseudo-embeddings based on content and modality
    for (let i = 0; i < dimensions; i++) {
      const modalityFactor = modality.charCodeAt(0) / 100;
      const contentFactor = typeof content === 'string' ?
        (content.charCodeAt(i % content.length) / 255) : 0.5;
      embeddings.push(Math.sin(i * modalityFactor) * contentFactor);
    }

    return embeddings;
  }, []);

  // Calculate similarity between embeddings
  const cosineSimilarity = useCallback((a: number[], b: number[]): number => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }, []);

  // Find associations between chunks
  const findAssociations = useCallback((chunk: MemoryChunk, allChunks: MemoryChunk[]): string[] => {
    if (!chunk.embeddings) return [];

    const associations: string[] = [];
    const threshold = 0.7; // Similarity threshold

    allChunks.forEach(other => {
      if (other.id !== chunk.id && other.embeddings) {
        const similarity = cosineSimilarity(chunk.embeddings, other.embeddings);
        if (similarity > threshold) {
          associations.push(other.id);
        }
      }
    });

    return associations;
  }, [cosineSimilarity]);

  // Process new input
  const processInput = useCallback(async (input: typeof sampleInputs[0]) => {
    // Select encoder agent
    const encoder = agents.find(a => a.type === 'encoder');
    if (!encoder) return;

    setAgents(prev => prev.map(a =>
      a.id === encoder.id
        ? { ...a, status: 'encoding' as const, currentTask: `Encoding ${input.modality} input` }
        : a
    ));

    addLogEntry(`Encoding ${input.modality} input: "${input.context}"`);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Create memory chunk
    const chunk: MemoryChunk = {
      id: `chunk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: input.content,
      modality: input.modality,
      encoding: input.modality === 'text' ? 'tokenized' :
                input.modality === 'structured' ? 'raw' : 'compressed',
      metadata: {
        source: `Agent ${encoder.name}`,
        timestamp: Date.now(),
        context: input.context,
        tags: input.context.toLowerCase().split(' ').filter(w => w.length > 4),
        relevance: Math.random() * 0.5 + 0.5,
        accessCount: 0,
        lastAccessed: Date.now(),
        size: Math.floor(Math.random() * 1000) + 100
      },
      embeddings: generateEmbeddings(input.content, input.modality),
      associations: []
    };

    // Find associations
    setMemoryChunks(prev => {
      const associations = findAssociations(chunk, prev);
      chunk.associations = associations;

      // Update cross-modal associations count
      if (associations.length > 0) {
        const hasCrossModal = associations.some(id => {
          const other = prev.find(c => c.id === id);
          return other && other.modality !== chunk.modality;
        });

        if (hasCrossModal) {
          setMetrics(m => ({ ...m, crossModalAssociations: m.crossModalAssociations + 1 }));
          addLogEntry(`Cross-modal association detected between ${chunk.modality} and other modalities`);
        }
      }

      return [...prev, chunk];
    });

    // Update metrics
    setMetrics(prev => {
      const dist = new Map(prev.modalityDistribution);
      dist.set(input.modality, (dist.get(input.modality) || 0) + 1);

      return {
        ...prev,
        totalChunks: prev.totalChunks + 1,
        totalSize: prev.totalSize + chunk.metadata.size,
        modalityDistribution: dist,
        memoryUtilization: Math.min(0.95, (prev.totalChunks + 1) / 100)
      };
    });

    // Update agent performance
    setAgents(prev => prev.map(a =>
      a.id === encoder.id
        ? {
            ...a,
            status: 'idle' as const,
            currentTask: undefined,
            performance: {
              ...a.performance,
              tasksCompleted: a.performance.tasksCompleted + 1
            }
          }
        : a
    ));

    addLogEntry(`Stored ${input.modality} chunk with ${chunk.associations.length} associations`);

  }, [agents, addLogEntry, generateEmbeddings, findAssociations]);

  // Simulate retrieval query
  const executeQuery = useCallback(async () => {
    const queryTexts = [
      "Find all scientific data related to quantum physics",
      "Retrieve visual and code implementations of neural networks",
      "Get biological process recordings across all modalities",
      "Search for environmental sensor readings and analysis"
    ];

    const queryText = queryTexts[Math.floor(Math.random() * queryTexts.length)];

    const query: RetrievalQuery = {
      id: `query-${Date.now()}`,
      query: queryText,
      modalities: ['text', 'image', 'code', 'mixed'],
      filters: {
        minRelevance: 0.6,
        tags: queryText.toLowerCase().split(' ').filter(w => w.length > 4)
      },
      results: [],
      latency: 0,
      status: 'pending'
    };

    setCurrentQuery(query);
    setQueries(prev => [...prev.slice(-5), query]);

    // Select retriever agent
    const retriever = agents.find(a => a.type === 'retriever');
    if (!retriever) return;

    setAgents(prev => prev.map(a =>
      a.id === retriever.id
        ? { ...a, status: 'retrieving' as const, currentTask: 'Searching memory chunks' }
        : a
    ));

    addLogEntry(`Executing query: "${queryText}"`);

    // Simulate search phases
    await new Promise(resolve => setTimeout(resolve, 300));
    setCurrentQuery(prev => prev ? { ...prev, status: 'searching' } : null);

    await new Promise(resolve => setTimeout(resolve, 400));
    setCurrentQuery(prev => prev ? { ...prev, status: 'ranking' } : null);

    // Find relevant chunks
    const queryEmbedding = generateEmbeddings(queryText, 'text');
    const results = memoryChunks
      .map(chunk => ({
        chunk,
        score: chunk.embeddings ? cosineSimilarity(queryEmbedding, chunk.embeddings) : 0
      }))
      .filter(r => r.score > 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(r => r.chunk);

    const latency = 150 + Math.random() * 100;

    setCurrentQuery(prev => prev ? {
      ...prev,
      status: 'completed',
      results,
      latency
    } : null);

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      averageRetrievalTime: (prev.averageRetrievalTime * prev.activeQueries + latency) / (prev.activeQueries + 1),
      activeQueries: prev.activeQueries + 1
    }));

    // Update agent
    setAgents(prev => prev.map(a =>
      a.id === retriever.id
        ? {
            ...a,
            status: 'idle' as const,
            currentTask: undefined,
            performance: {
              ...a.performance,
              tasksCompleted: a.performance.tasksCompleted + 1
            }
          }
        : a
    ));

    addLogEntry(`Query completed: Found ${results.length} relevant chunks in ${latency.toFixed(0)}ms`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentQuery(null);

  }, [memoryChunks, agents, addLogEntry, generateEmbeddings, cosineSimilarity]);

  // Visualize memory network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw chunks as nodes
    const nodeRadius = 15;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Position chunks by modality
    const modalityAngles = new Map<string, number>();
    const modalities = Array.from(new Set(memoryChunks.map(c => c.modality)));
    modalities.forEach((mod, i) => {
      modalityAngles.set(mod, (i / modalities.length) * Math.PI * 2);
    });

    const chunkPositions = new Map<string, { x: number; y: number }>();

    memoryChunks.forEach((chunk, index) => {
      const baseAngle = modalityAngles.get(chunk.modality) || 0;
      const angleVariation = (index % 3) * 0.3 - 0.3;
      const angle = baseAngle + angleVariation;
      const radius = 80 + (index % 4) * 30;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      chunkPositions.set(chunk.id, { x, y });
    });

    // Draw associations
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;

    memoryChunks.forEach(chunk => {
      const pos = chunkPositions.get(chunk.id);
      if (!pos) return;

      chunk.associations.forEach(assocId => {
        const assocPos = chunkPositions.get(assocId);
        if (!assocPos) return;

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(assocPos.x, assocPos.y);
        ctx.stroke();
      });
    });

    // Draw nodes
    memoryChunks.forEach(chunk => {
      const pos = chunkPositions.get(chunk.id);
      if (!pos) return;

      // Node color by modality
      const modalityColors = {
        text: '#3b82f6',
        image: '#10b981',
        audio: '#f59e0b',
        video: '#ef4444',
        code: '#8b5cf6',
        structured: '#06b6d4',
        mixed: '#ec4899'
      };

      ctx.fillStyle = modalityColors[chunk.modality] || '#6b7280';

      // Highlight selected chunk
      if (chunk.id === selectedChunk) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeRadius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw modality icon
      ctx.fillStyle = 'white';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const modalitySymbols = {
        text: 'T',
        image: 'I',
        audio: 'A',
        video: 'V',
        code: 'C',
        structured: 'S',
        mixed: 'M'
      };

      ctx.fillText(modalitySymbols[chunk.modality] || '?', pos.x, pos.y);
    });

    // Draw query results highlight
    if (currentQuery && currentQuery.status === 'completed') {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      currentQuery.results.forEach(chunk => {
        const pos = chunkPositions.get(chunk.id);
        if (!pos) return;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeRadius + 8, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.setLineDash([]);
    }

  }, [memoryChunks, selectedChunk, currentQuery]);

  const runDemo = useCallback(async () => {
    setIsRunning(true);
    isRunningRef.current = true;
    addLogEntry('Contextual unstructured memory system initialized');

    while (isRunningRef.current) {
      // Process new inputs
      if (currentInputIndex < sampleInputs.length * 2) {
        const input = sampleInputs[currentInputIndex % sampleInputs.length];
        await processInput(input);
        setCurrentInputIndex(prev => prev + 1);
      }

      // Execute queries periodically
      if (memoryChunks.length > 3 && Math.random() > 0.6) {
        await executeQuery();
      }

      // Compression simulation
      if (memoryChunks.length > 5 && Math.random() > 0.8) {
        const compressor = agents.find(a => a.type === 'compressor');
        if (compressor) {
          setAgents(prev => prev.map(a =>
            a.id === compressor.id
              ? { ...a, status: 'processing' as const, currentTask: 'Compressing old chunks' }
              : a
          ));

          addLogEntry('Running memory compression on older chunks');
          await new Promise(resolve => setTimeout(resolve, 800));

          setMetrics(prev => ({
            ...prev,
            compressionRatio: Math.min(0.7, prev.compressionRatio * 0.95)
          }));

          setAgents(prev => prev.map(a =>
            a.id === compressor.id
              ? { ...a, status: 'idle' as const, currentTask: undefined }
              : a
          ));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    }

  }, [currentInputIndex, memoryChunks.length, processInput, executeQuery, agents, addLogEntry]);

  const startDemo = () => {
    runDemo();
  };

  const pauseDemo = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    addLogEntry('System paused');
  };

  const getModalityIcon = (modality: string) => {
    const Icon = modalityIcons[modality as keyof typeof modalityIcons] || FileText;
    return Icon;
  };

  const getEncodingColor = (encoding: string) => {
    const colors = {
      raw: 'text-green-400',
      embedding: 'text-blue-400',
      compressed: 'text-purple-400',
      tokenized: 'text-yellow-400'
    };
    return colors[encoding as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Contextual Unstructured Memory</h2>
          <p className="text-gray-400">Modality-general memory system for heterogeneous inputs</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={isRunning ? pauseDemo : startDemo}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Current Query */}
      {currentQuery && (
        <div className="mb-6 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className={`w-4 h-4 text-cyan-400 ${currentQuery.status === 'searching' ? 'animate-pulse' : ''}`} />
              <span className="text-cyan-300">Query: "{currentQuery.query}"</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm ${
                currentQuery.status === 'completed' ? 'text-green-400' :
                currentQuery.status === 'ranking' ? 'text-yellow-400' :
                'text-cyan-400'
              }`}>
                {currentQuery.status}
              </span>
              {currentQuery.latency > 0 && (
                <span className="text-sm text-gray-400">{currentQuery.latency.toFixed(0)}ms</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Memory Network Visualization */}
      <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Memory Network Graph
        </h3>
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-gray-900/50 rounded-lg"
          style={{ width: '100%', height: '256px' }}
        />
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          {Object.entries(modalityIcons).map(([modality, Icon]) => (
            <div key={modality} className="flex items-center gap-1">
              <Icon className="w-3 h-3" />
              <span className="capitalize">{modality}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Chunks */}
        <div className="lg:col-span-2 bg-gray-800/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Memory Chunks ({memoryChunks.length})
          </h3>

          <div className="space-y-3">
            {memoryChunks.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No memory chunks stored yet</p>
              </div>
            ) : (
              memoryChunks.slice(-10).reverse().map(chunk => {
                const Icon = getModalityIcon(chunk.modality);

                return (
                  <div
                    key={chunk.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedChunk === chunk.id
                        ? 'border-yellow-500/50 bg-yellow-500/10'
                        : 'border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50'
                    }`}
                    onClick={() => setSelectedChunk(chunk.id === selectedChunk ? null : chunk.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium capitalize">{chunk.modality}</span>
                        <span className={`text-xs ${getEncodingColor(chunk.encoding)}`}>
                          [{chunk.encoding}]
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {chunk.metadata.size} bytes
                      </div>
                    </div>

                    <div className="text-xs text-gray-300 mb-2 truncate">
                      {typeof chunk.content === 'string' ? chunk.content : JSON.stringify(chunk.content)}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {chunk.metadata.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Relevance:</span>
                        <span className="ml-1 text-cyan-400">
                          {(chunk.metadata.relevance * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Associations:</span>
                        <span className="ml-1 text-purple-400">{chunk.associations.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Accessed:</span>
                        <span className="ml-1 text-green-400">{chunk.metadata.accessCount}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Metrics and Agents */}
        <div className="space-y-6">
          {/* System Metrics */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              System Metrics
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Chunks:</span>
                <span className="font-medium text-blue-400">{metrics.totalChunks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Size:</span>
                <span className="font-medium text-green-400">
                  {(metrics.totalSize / 1024).toFixed(1)} KB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Compression Ratio:</span>
                <span className="font-medium text-purple-400">
                  {(metrics.compressionRatio * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Retrieval:</span>
                <span className="font-medium text-cyan-400">
                  {metrics.averageRetrievalTime.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cross-Modal Links:</span>
                <span className="font-medium text-yellow-400">{metrics.crossModalAssociations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memory Usage:</span>
                <span className="font-medium text-orange-400">
                  {(metrics.memoryUtilization * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Processing Agents */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Processing Agents
            </h3>

            <div className="space-y-2">
              {agents.map(agent => (
                <div key={agent.id} className="p-2 bg-gray-700/30 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <span className={`text-xs ${
                      agent.status === 'processing' ? 'text-yellow-400' :
                      agent.status === 'retrieving' ? 'text-blue-400' :
                      agent.status === 'encoding' ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  {agent.currentTask && (
                    <div className="text-xs text-gray-400 mb-1">{agent.currentTask}</div>
                  )}
                  <div className="text-xs text-gray-500">
                    Tasks: {agent.performance.tasksCompleted} |
                    Accuracy: {(agent.performance.accuracy * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Log */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Operation Log
            </h3>

            <div className="space-y-1 text-xs overflow-y-auto" style={{ maxHeight: '150px' }}>
              {operationLog.map((entry, index) => (
                <div key={index} className="text-gray-300 py-1 border-b border-gray-700/30 last:border-b-0">
                  {entry}
                </div>
              ))}
              {operationLog.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
                  <p>Waiting for operations...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-yellow-400" />
          Contextual Unstructured Memory Algorithm
        </h4>
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>Core Principle:</strong> Modality-agnostic memory system that stores and retrieves heterogeneous information through unified embeddings and cross-modal associations.</p>
          <p><strong>Key Mechanisms:</strong> Universal encoding for all modalities, semantic embedding generation, similarity-based retrieval, automatic association discovery, and adaptive compression.</p>
          <p><strong>Modality Support:</strong> Text, images, audio, video, code, structured data, and mixed-modality content with seamless cross-modal querying.</p>
          <p><strong>Benefits:</strong> Unified memory interface, efficient heterogeneous storage, context-aware retrieval, and emergent cross-modal relationships.</p>
        </div>
      </div>
    </div>
  );
};

export default ContextualUnstructuredMemoryDemo;