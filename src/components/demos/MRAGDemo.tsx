'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Database, FileText, Cpu, CheckCircle, AlertCircle, Settings, Layers, Shuffle, GitBranch, Repeat, Zap, Filter, Target, ArrowRight, Play, Pause, RefreshCw } from 'lucide-react';

interface RAGModule {
  id: string;
  name: string;
  type: 'retriever' | 'reranker' | 'filter' | 'expander' | 'generator';
  description: string;
  isActive: boolean;
  config?: any;
}

interface Document {
  id: string;
  title: string;
  content: string;
  score?: number;
  metadata?: any;
}

interface PipelineStep {
  module: RAGModule;
  input: any;
  output: any;
  timestamp: number;
  duration: number;
}

interface ModularPipeline {
  id: string;
  name: string;
  modules: RAGModule[];
  isIterative: boolean;
  maxIterations?: number;
}

export default function MRAGDemo() {
  const [query] = useState('Explain transformer architecture in neural networks');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<'sequential' | 'iterative' | 'adaptive'>('sequential');

  const [modules] = useState<RAGModule[]>([
    {
      id: 'query-expander',
      name: 'Query Expander',
      type: 'expander',
      description: 'Expands query with synonyms and related terms',
      isActive: true,
      config: { expansionFactor: 3, useWordNet: true }
    },
    {
      id: 'dense-retriever',
      name: 'Dense Retriever',
      type: 'retriever',
      description: 'Vector-based semantic retrieval',
      isActive: true,
      config: { topK: 10, embeddingModel: 'all-MiniLM-L6' }
    },
    {
      id: 'sparse-retriever',
      name: 'BM25 Retriever',
      type: 'retriever',
      description: 'Keyword-based BM25 retrieval',
      isActive: false,
      config: { k1: 1.2, b: 0.75 }
    },
    {
      id: 'cross-encoder',
      name: 'Cross-Encoder Reranker',
      type: 'reranker',
      description: 'Deep semantic reranking',
      isActive: true,
      config: { model: 'ms-marco-MiniLM', threshold: 0.5 }
    },
    {
      id: 'mmr-filter',
      name: 'MMR Diversity Filter',
      type: 'filter',
      description: 'Maximal Marginal Relevance for diversity',
      isActive: true,
      config: { lambda: 0.5, topK: 5 }
    },
    {
      id: 'recursive-retriever',
      name: 'Recursive Retriever',
      type: 'retriever',
      description: 'Follows references and links',
      isActive: false,
      config: { maxDepth: 2, followCitations: true }
    },
    {
      id: 'context-compressor',
      name: 'Context Compressor',
      type: 'filter',
      description: 'Compresses and summarizes context',
      isActive: false,
      config: { maxTokens: 512, compressionRatio: 0.3 }
    },
    {
      id: 'adaptive-generator',
      name: 'Adaptive Generator',
      type: 'generator',
      description: 'Generates response with feedback loop',
      isActive: true,
      config: { temperature: 0.7, maxTokens: 256 }
    }
  ]);

  const [activeModules, setActiveModules] = useState<RAGModule[]>(
    modules.filter(m => m.isActive)
  );

  const [documents] = useState<Document[]>([
    {
      id: 'doc1',
      title: 'Attention Is All You Need',
      content: 'The Transformer architecture relies entirely on self-attention mechanisms to compute representations of its input and output without using RNNs or convolution. Multi-head attention allows the model to jointly attend to information from different representation subspaces.',
      metadata: { year: 2017, citations: 50000 }
    },
    {
      id: 'doc2',
      title: 'BERT: Pre-training of Deep Bidirectional Transformers',
      content: 'BERT uses a multi-layer bidirectional Transformer encoder architecture. The self-attention mechanism in transformers allows BERT to model bidirectional context, which is crucial for understanding language. The architecture consists of stacked encoder layers.',
      metadata: { year: 2018, citations: 30000 }
    },
    {
      id: 'doc3',
      title: 'GPT-3: Language Models are Few-Shot Learners',
      content: 'GPT-3 uses a decoder-only transformer architecture with 175 billion parameters. The model uses alternating dense and sparse attention patterns in its layers. Each layer contains a multi-head self-attention sub-layer followed by a feed-forward network.',
      metadata: { year: 2020, citations: 10000 }
    },
    {
      id: 'doc4',
      title: 'Vision Transformer (ViT)',
      content: 'Vision Transformer applies the standard Transformer architecture directly to images with minimal modifications. An image is split into fixed-size patches, which are then linearly embedded and treated as a sequence of tokens, similar to words in NLP.',
      metadata: { year: 2020, citations: 5000 }
    },
    {
      id: 'doc5',
      title: 'Transformer Optimization Techniques',
      content: 'Various optimization techniques improve transformer efficiency including: FlashAttention for faster attention computation, gradient checkpointing to reduce memory usage, and mixed precision training. These optimizations enable training larger models.',
      metadata: { year: 2022, citations: 1000 }
    }
  ]);

  const [retrievedDocs, setRetrievedDocs] = useState<Document[]>([]);
  const [finalResponse, setFinalResponse] = useState('');
  const [moduleOutputs, setModuleOutputs] = useState<Map<string, any>>(new Map());

  const pipelines: { [key: string]: ModularPipeline } = {
    sequential: {
      id: 'sequential',
      name: 'Sequential Pipeline',
      modules: modules.filter(m => ['query-expander', 'dense-retriever', 'cross-encoder', 'mmr-filter', 'adaptive-generator'].includes(m.id)),
      isIterative: false
    },
    iterative: {
      id: 'iterative',
      name: 'Iterative Refinement',
      modules: modules.filter(m => ['query-expander', 'dense-retriever', 'cross-encoder', 'adaptive-generator'].includes(m.id)),
      isIterative: true,
      maxIterations: 3
    },
    adaptive: {
      id: 'adaptive',
      name: 'Adaptive Pipeline',
      modules: modules.filter(m => ['query-expander', 'dense-retriever', 'sparse-retriever', 'cross-encoder', 'context-compressor', 'adaptive-generator'].includes(m.id)),
      isIterative: false
    }
  };

  const toggleModule = (moduleId: string) => {
    setActiveModules(prev => {
      const targetModule = modules.find(m => m.id === moduleId);
      if (!targetModule) return prev;

      const isCurrentlyActive = prev.some(m => m.id === moduleId);
      if (isCurrentlyActive) {
        return prev.filter(m => m.id !== moduleId);
      } else {
        return [...prev, targetModule].sort((a, b) =>
          modules.findIndex(m => m.id === a.id) - modules.findIndex(m => m.id === b.id)
        );
      }
    });
  };

  const executeModule = async (module: RAGModule, input: any): Promise<any> => {
    const startTime = Date.now();
    let output: any = null;

    // Simulate module execution based on type
    switch (module.type) {
      case 'expander':
        await new Promise(resolve => setTimeout(resolve, 300));
        output = {
          original: input,
          expanded: [
            input,
            `${input} self-attention mechanism`,
            `${input} multi-head attention layers`,
            `transformer model architecture neural network`
          ]
        };
        break;

      case 'retriever':
        await new Promise(resolve => setTimeout(resolve, 500));
        if (module.id === 'dense-retriever') {
          output = documents.map(doc => ({
            ...doc,
            score: Math.random() * 0.5 + 0.5
          })).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 4);
        } else if (module.id === 'sparse-retriever') {
          output = documents.filter(doc =>
            doc.content.toLowerCase().includes('transformer')
          ).map(doc => ({ ...doc, score: Math.random() * 0.4 + 0.4 }));
        } else {
          // Recursive retriever
          output = documents.slice(0, 2).map(doc => ({
            ...doc,
            score: 0.9,
            related: documents.slice(2, 3)
          }));
        }
        break;

      case 'reranker':
        await new Promise(resolve => setTimeout(resolve, 400));
        output = (input as Document[]).map(doc => ({
          ...doc,
          score: Math.min(1, (doc.score || 0) + Math.random() * 0.2)
        })).sort((a, b) => (b.score || 0) - (a.score || 0));
        break;

      case 'filter':
        await new Promise(resolve => setTimeout(resolve, 300));
        if (module.id === 'mmr-filter') {
          // Simulate diversity filtering
          const filtered = (input as Document[]).slice(0, 3);
          output = filtered.map((doc, idx) => ({
            ...doc,
            diversityScore: 1 - (idx * 0.1)
          }));
        } else {
          // Context compression
          output = {
            compressed: (input as Document[]).map(doc => ({
              ...doc,
              content: doc.content.substring(0, 100) + '...'
            })),
            compressionRatio: 0.3
          };
        }
        break;

      case 'generator':
        await new Promise(resolve => setTimeout(resolve, 800));
        const docs = Array.isArray(input) ? input : input.compressed || [];
        output = {
          response: `Based on the modular RAG pipeline analysis:

The Transformer architecture is a revolutionary neural network design that relies entirely on self-attention mechanisms. Key components include:

1. **Self-Attention Mechanism**: Allows the model to weigh the importance of different positions in the input sequence, captured from "${docs[0]?.title || 'source document'}".

2. **Multi-Head Attention**: Enables the model to jointly attend to information from different representation subspaces, as described in multiple retrieved documents.

3. **Architecture Variants**: Including encoder-only (BERT), decoder-only (GPT), and encoder-decoder models, each optimized for different tasks.

This response was generated using ${activeModules.length} active modules in a ${selectedPipeline} configuration.`,
          confidence: 0.92,
          sourceDocs: docs.slice(0, 3).map((d: Document) => d.id)
        };
        break;
    }

    const step: PipelineStep = {
      module,
      input,
      output,
      timestamp: Date.now(),
      duration: Date.now() - startTime
    };

    setPipelineSteps(prev => [...prev, step]);
    setModuleOutputs(prev => new Map(prev).set(module.id, output));

    return output;
  };

  const runModularPipeline = async () => {
    setIsProcessing(true);
    setPipelineSteps([]);
    setModuleOutputs(new Map());
    setRetrievedDocs([]);
    setFinalResponse('');
    setCurrentIteration(0);

    const pipeline = pipelines[selectedPipeline];
    const maxIterations = pipeline.isIterative ? (pipeline.maxIterations || 1) : 1;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      if (pipeline.isIterative) {
        setCurrentIteration(iteration + 1);
      }

      let pipelineInput: any = query;

      for (const ragModule of pipeline.modules) {
        // Determine input based on previous module outputs
        if (ragModule.type === 'reranker' || ragModule.type === 'filter') {
          pipelineInput = moduleOutputs.get('dense-retriever') ||
                         moduleOutputs.get('sparse-retriever') ||
                         retrievedDocs;
        } else if (ragModule.type === 'generator') {
          pipelineInput = moduleOutputs.get('mmr-filter') ||
                         moduleOutputs.get('context-compressor') ||
                         moduleOutputs.get('cross-encoder') ||
                         retrievedDocs;
        }

        const output = await executeModule(ragModule, pipelineInput);

        // Update state based on module output
        if (ragModule.type === 'retriever' && Array.isArray(output)) {
          setRetrievedDocs(output);
        } else if (ragModule.type === 'generator') {
          setFinalResponse(output.response);
        }

        pipelineInput = output;
      }

      // Add delay between iterations
      if (pipeline.isIterative && iteration < maxIterations - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsProcessing(false);
  };

  const getModuleIcon = (type: RAGModule['type']) => {
    switch (type) {
      case 'expander': return <Target className="w-4 h-4" />;
      case 'retriever': return <Search className="w-4 h-4" />;
      case 'reranker': return <Shuffle className="w-4 h-4" />;
      case 'filter': return <Filter className="w-4 h-4" />;
      case 'generator': return <Cpu className="w-4 h-4" />;
    }
  };

  const getModuleColor = (type: RAGModule['type']) => {
    switch (type) {
      case 'expander': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'retriever': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'reranker': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'filter': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'generator': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Modular RAG Demo</h2>

      {/* Query and Pipeline Selection */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              readOnly
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <button
            onClick={runModularPipeline}
            disabled={isProcessing || activeModules.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 transition-colors flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Pipeline
              </>
            )}
          </button>
        </div>

        {/* Pipeline Configuration */}
        <div className="flex gap-2">
          <span className="text-sm text-gray-400">Pipeline Mode:</span>
          {Object.keys(pipelines).map(key => (
            <button
              key={key}
              onClick={() => setSelectedPipeline(key as any)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                selectedPipeline === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {pipelines[key].name}
            </button>
          ))}
        </div>

        {pipelines[selectedPipeline].isIterative && (
          <div className="mt-2 text-xs text-yellow-400">
            ⚡ Iterative mode: Will run {pipelines[selectedPipeline].maxIterations} iterations
            {currentIteration > 0 && ` (Currently on iteration ${currentIteration})`}
          </div>
        )}
      </div>

      {/* Module Configuration */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Layers className="w-5 h-5 mr-2" />
          Available RAG Modules (Click to toggle)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {modules.map(module => {
            const isActive = activeModules.some(m => m.id === module.id);
            const isInPipeline = pipelines[selectedPipeline].modules.some(m => m.id === module.id);

            return (
              <button
                key={module.id}
                onClick={() => toggleModule(module.id)}
                disabled={!isInPipeline}
                className={`p-3 rounded-lg border transition-all ${
                  isActive && isInPipeline
                    ? `${getModuleColor(module.type)} border-opacity-100`
                    : isInPipeline
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {getModuleIcon(module.type)}
                  <span className="text-xs font-semibold">{module.name}</span>
                </div>
                <div className="text-xs opacity-75">{module.description}</div>
                {module.config && (
                  <div className="text-xs mt-1 opacity-50">
                    Config: {Object.keys(module.config).join(', ')}
                  </div>
                )}
                {!isInPipeline && (
                  <div className="text-xs mt-1 text-yellow-400">
                    Not in {pipelines[selectedPipeline].name}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pipeline Execution Visualization */}
      {pipelineSteps.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <GitBranch className="w-5 h-5 mr-2" />
            Pipeline Execution Flow
          </h3>
          <div className="space-y-3">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getModuleColor(step.module.type)}`}>
                  {getModuleIcon(step.module.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{step.module.name}</div>
                    <div className="text-xs text-gray-400">{step.duration}ms</div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {step.module.type === 'expander' && `Expanded to ${step.output.expanded?.length || 0} queries`}
                    {step.module.type === 'retriever' && `Retrieved ${Array.isArray(step.output) ? step.output.length : 0} documents`}
                    {step.module.type === 'reranker' && `Reranked ${Array.isArray(step.output) ? step.output.length : 0} documents`}
                    {step.module.type === 'filter' && `Applied ${step.module.id} filtering`}
                    {step.module.type === 'generator' && `Generated response with ${step.output.confidence * 100}% confidence`}
                  </div>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-500 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Retrieved Documents */}
      {retrievedDocs.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Retrieved & Processed Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {retrievedDocs.slice(0, 4).map(doc => (
              <div key={doc.id} className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-white text-sm">{doc.title}</div>
                  {doc.score && (
                    <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {Math.round(doc.score * 100)}%
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-300 line-clamp-2">
                  {doc.content.substring(0, 150)}...
                </div>
                {doc.metadata && (
                  <div className="text-xs text-gray-400 mt-2">
                    Year: {doc.metadata.year} | Citations: {doc.metadata.citations?.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Response */}
      {finalResponse && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Generated Response
          </h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-white whitespace-pre-wrap">{finalResponse}</div>
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">🎯 Modular RAG Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-purple-400 mb-2">Flexible Architecture</div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Plug-and-play modules</li>
              <li>• Custom pipeline configurations</li>
              <li>• Runtime module selection</li>
              <li>• Module parameter tuning</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-blue-400 mb-2">Execution Patterns</div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Sequential processing</li>
              <li>• Iterative refinement</li>
              <li>• Adaptive routing</li>
              <li>• Parallel module execution</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-400 mb-2">Module Types</div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Multiple retrievers</li>
              <li>• Reranking strategies</li>
              <li>• Filtering & compression</li>
              <li>• Adaptive generation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}