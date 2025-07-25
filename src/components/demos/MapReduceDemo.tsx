'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Database, Cpu, Zap, BarChart3, CheckCircle, Activity, HardDrive } from 'lucide-react';

interface WorkerNode {
  id: string;
  name: string;
  type: 'map' | 'reduce';
  status: 'idle' | 'processing' | 'completed' | 'failed';
  progress: number;
  dataSize: number;
  outputSize: number;
  cpuUsage: number;
  memoryUsage: number;
  throughput: number;
}

interface DataChunk {
  id: string;
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed';
  assignedWorker?: string;
}

interface ProcessingScenario {
  id: string;
  name: string;
  description: string;
  dataSize: number;
  dataType: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
  expectedDuration: number;
  mapTasks: number;
  reduceTasks: number;
}

const PROCESSING_SCENARIOS: ProcessingScenario[] = [
  {
    id: 'web-logs',
    name: 'Web Server Log Analysis',
    description: 'Process web server logs to extract user behavior patterns and traffic statistics',
    dataSize: 100,
    dataType: 'Log Files',
    complexity: 'Medium',
    expectedDuration: 120,
    mapTasks: 4,
    reduceTasks: 3
  },
  {
    id: 'word-count',
    name: 'Large Document Word Count', 
    description: 'Count word frequencies across a massive document corpus',
    dataSize: 50,
    dataType: 'Text Documents',
    complexity: 'Low',
    expectedDuration: 80,
    mapTasks: 4,
    reduceTasks: 2
  },
  {
    id: 'financial-analysis',
    name: 'Financial Transaction Analysis',
    description: 'Analyze financial transactions for fraud detection and risk assessment',
    dataSize: 200,
    dataType: 'Transaction Records',
    complexity: 'High',
    expectedDuration: 180,
    mapTasks: 6,
    reduceTasks: 4
  },
  {
    id: 'genomic-data',
    name: 'Genomic Sequence Processing',
    description: 'Process genomic sequences for pattern matching and variant analysis',
    dataSize: 500,
    dataType: 'Genomic Data',
    complexity: 'Extreme',
    expectedDuration: 300,
    mapTasks: 8,
    reduceTasks: 4
  }
];

export const MapReduceDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(PROCESSING_SCENARIOS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [mapWorkers, setMapWorkers] = useState<WorkerNode[]>([]);
  const [reduceWorkers, setReduceWorkers] = useState<WorkerNode[]>([]);
  const [dataChunks, setDataChunks] = useState<DataChunk[]>([]);
  const [intermediateData, setIntermediateData] = useState<number>(0);
  const [finalOutput, setFinalOutput] = useState<number>(0);
  const [processingMetrics, setProcessingMetrics] = useState<any>(null);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const initializeWorkers = useCallback((scenario: ProcessingScenario) => {
    // Initialize map workers
    const maps = Array.from({ length: scenario.mapTasks }, (_, i) => ({
      id: `map-${i + 1}`,
      name: `Map Worker ${i + 1}`,
      type: 'map' as const,
      status: 'idle' as const,
      progress: 0,
      dataSize: 0,
      outputSize: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      throughput: 0
    }));

    // Initialize reduce workers
    const reduces = Array.from({ length: scenario.reduceTasks }, (_, i) => ({
      id: `reduce-${i + 1}`,
      name: `Reduce Worker ${i + 1}`,
      type: 'reduce' as const,
      status: 'idle' as const,
      progress: 0,
      dataSize: 0,
      outputSize: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      throughput: 0
    }));

    // Initialize data chunks
    const chunks = Array.from({ length: scenario.mapTasks }, (_, i) => ({
      id: `chunk-${i + 1}`,
      name: `Data Chunk ${i + 1}`,
      size: Math.floor(scenario.dataSize / scenario.mapTasks),
      status: 'pending' as const,
      assignedWorker: `map-${i + 1}`
    }));

    setMapWorkers(maps);
    setReduceWorkers(reduces);
    setDataChunks(chunks);
  }, []);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setIntermediateData(0);
    setFinalOutput(0);
    setProcessingMetrics(null);
    setExecutionLog([]);
    initializeWorkers(selectedScenario);
  }, [selectedScenario, initializeWorkers]);

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  const runMapReduceDemo = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🗺️ Starting MapReduce job processing...']);

    // Phase 1: Job Setup
    setCurrentPhase('setup');
    setExecutionLog(prev => [...prev, '⚙️ Setting up MapReduce job and allocating resources...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    
    setExecutionLog(prev => [...prev, `✅ Job: ${selectedScenario.name}`]);
    setExecutionLog(prev => [...prev, `✅ Data size: ${selectedScenario.dataSize}TB`]);
    setExecutionLog(prev => [...prev, `✅ Map tasks: ${selectedScenario.mapTasks}, Reduce tasks: ${selectedScenario.reduceTasks}`]);

    // Phase 2: Data Partitioning
    setCurrentPhase('partitioning');
    setExecutionLog(prev => [...prev, '📊 Partitioning data into chunks for parallel processing...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    setDataChunks(prev => prev.map(chunk => ({ ...chunk, status: 'processing' })));
    setExecutionLog(prev => [...prev, `✅ Created ${selectedScenario.mapTasks} data partitions`]);

    // Phase 3: Map Phase
    setCurrentPhase('mapping');
    setExecutionLog(prev => [...prev, '🔄 Starting Map phase - processing data chunks...']);
    await new Promise(resolve => setTimeout(resolve, 500 / speed));

    // Simulate map worker processing
    for (let i = 0; i < 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300 / speed));
      
      setMapWorkers(prev => prev.map(worker => ({
        ...worker,
        status: i >= 100 ? 'completed' : 'processing',
        progress: Math.min(100, i + Math.random() * 25),
        cpuUsage: 75 + Math.random() * 20,
        memoryUsage: 60 + Math.random() * 30,
        throughput: 10000 + Math.random() * 5000,
        dataSize: Math.floor(selectedScenario.dataSize / selectedScenario.mapTasks),
        outputSize: Math.floor((selectedScenario.dataSize / selectedScenario.mapTasks) * 0.3)
      })));
    }

    setExecutionLog(prev => [...prev, '✅ Map phase completed - intermediate results generated']);

    // Calculate intermediate data size
    const intermediateSize = Math.floor(selectedScenario.dataSize * 0.4);
    setIntermediateData(intermediateSize);

    // Phase 4: Shuffle and Sort
    setCurrentPhase('shuffle');
    setExecutionLog(prev => [...prev, '🔀 Shuffling and sorting intermediate data...']);
    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    setExecutionLog(prev => [...prev, `✅ Shuffled ${intermediateSize}TB of intermediate data`]);

    // Phase 5: Reduce Phase
    setCurrentPhase('reducing');
    setExecutionLog(prev => [...prev, '📈 Starting Reduce phase - aggregating results...']);
    await new Promise(resolve => setTimeout(resolve, 500 / speed));

    // Simulate reduce worker processing
    for (let i = 0; i < 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 400 / speed));
      
      setReduceWorkers(prev => prev.map(worker => ({
        ...worker,
        status: i >= 100 ? 'completed' : 'processing',
        progress: Math.min(100, i + Math.random() * 30),
        cpuUsage: 80 + Math.random() * 15,
        memoryUsage: 70 + Math.random() * 25,
        throughput: 5000 + Math.random() * 3000,
        dataSize: Math.floor(intermediateSize / selectedScenario.reduceTasks),
        outputSize: Math.floor((intermediateSize / selectedScenario.reduceTasks) * 0.1)
      })));
    }

    setExecutionLog(prev => [...prev, '✅ Reduce phase completed - final results aggregated']);

    // Calculate final output
    const outputSize = Math.floor(selectedScenario.dataSize * 0.02);
    setFinalOutput(outputSize);

    // Phase 6: Results
    setCurrentPhase('completed');
    setExecutionLog(prev => [...prev, '🎯 Job completed - calculating performance metrics...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    const metrics = {
      totalTime: Math.floor(selectedScenario.expectedDuration * (0.8 + Math.random() * 0.4)),
      throughput: Math.floor((selectedScenario.dataSize * 1000) / selectedScenario.expectedDuration),
      compressionRatio: Math.floor(selectedScenario.dataSize / outputSize),
      efficiency: Math.floor(85 + Math.random() * 12),
      nodeUtilization: Math.floor(88 + Math.random() * 10),
      networkUtilization: Math.floor(75 + Math.random() * 20)
    };

    setProcessingMetrics(metrics);
    setExecutionLog(prev => [...prev, `✅ Processing complete in ${metrics.totalTime} minutes`]);

    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎉 MapReduce job completed successfully!']);
  }, [selectedScenario, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    
    const completedPhases = ['setup', 'partitioning', 'mapping', 'shuffle', 'reducing'];
    const currentIndex = completedPhases.indexOf(currentPhase);
    const phaseIndex = completedPhases.indexOf(phase);
    
    if (currentIndex > phaseIndex || currentPhase === 'completed') {
      return 'border-green-500 bg-green-900/20';
    }
    
    return 'border-gray-600 bg-gray-800/20';
  };

  const getWorkerStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-400 bg-blue-900/20';
      case 'completed': return 'text-green-400 bg-green-900/20';
      case 'failed': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🗺️</span>
          MapReduce Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how MapReduce processes large datasets by distributing computation across multiple nodes using map and reduce operations.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Processing Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = PROCESSING_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PROCESSING_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Demo Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runMapReduceDemo}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Processing...' : 'Start Job'}
              </button>
              
              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Scenario Details */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-2">Scenario: {selectedScenario.name}</h4>
          <p className="text-gray-300 text-sm mb-3">{selectedScenario.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Data Size</div>
              <div className="text-white font-medium">{selectedScenario.dataSize}TB</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Data Type</div>
              <div className="text-white font-medium">{selectedScenario.dataType}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Complexity</div>
              <div className="text-white font-medium">{selectedScenario.complexity}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Est. Duration</div>
              <div className="text-white font-medium">{selectedScenario.expectedDuration}m</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MapReduce Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">MapReduce Processing Pipeline</h3>
          
          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Job Setup */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('setup')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Job Setup & Resource Allocation
                </h4>
                {currentPhase === 'setup' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {getPhaseStatus('setup').includes('green') && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {currentPhase !== '' && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Map Tasks:</span> <span className="text-blue-400">{selectedScenario.mapTasks}</span></div>
                  <div><span className="text-gray-400">Reduce Tasks:</span> <span className="text-green-400">{selectedScenario.reduceTasks}</span></div>
                </div>
              )}
            </div>

            {/* Data Partitioning */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('partitioning')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Data Partitioning
                </h4>
                {currentPhase === 'partitioning' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {getPhaseStatus('partitioning').includes('green') && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {dataChunks.length > 0 && (
                <div className="text-sm text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {dataChunks.map(chunk => (
                      <span key={chunk.id} className="px-2 py-1 bg-blue-600/20 rounded text-xs">
                        {chunk.name}: {chunk.size}TB
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map Phase */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('mapping')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Map Phase Processing
                </h4>
                {currentPhase === 'mapping' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {getPhaseStatus('mapping').includes('green') && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {mapWorkers.length > 0 && mapWorkers[0].progress > 0 && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Progress:</span> <span className="text-yellow-400">{Math.floor(mapWorkers.reduce((sum, w) => sum + w.progress, 0) / mapWorkers.length)}%</span></div>
                  <div><span className="text-gray-400">Intermediate Data:</span> <span className="text-blue-400">{intermediateData}TB</span></div>
                </div>
              )}
            </div>

            {/* Shuffle & Sort */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('shuffle')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Shuffle & Sort
                </h4>
                {currentPhase === 'shuffle' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {getPhaseStatus('shuffle').includes('green') && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {intermediateData > 0 && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Data Redistributed:</span> <span className="text-purple-400">{intermediateData}TB</span></div>
                </div>
              )}
            </div>

            {/* Reduce Phase */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('reducing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Reduce Phase Aggregation
                </h4>
                {currentPhase === 'reducing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {getPhaseStatus('reducing').includes('green') && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {reduceWorkers.length > 0 && reduceWorkers[0].progress > 0 && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Progress:</span> <span className="text-green-400">{Math.floor(reduceWorkers.reduce((sum, w) => sum + w.progress, 0) / reduceWorkers.length)}%</span></div>
                  <div><span className="text-gray-400">Final Output:</span> <span className="text-green-400">{finalOutput}GB</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Worker Status */}
          <div>
            <h4 className="font-medium text-white mb-3">Worker Node Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Map Workers */}
              <div>
                <h5 className="text-sm font-medium text-yellow-400 mb-2">Map Workers</h5>
                <div className="space-y-2">
                  {mapWorkers.map((worker) => (
                    <div key={worker.id} className={`p-2 rounded-lg border ${getWorkerStatusColor(worker.status)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{worker.name}</span>
                        <span className="text-xs capitalize">{worker.status}</span>
                      </div>
                      {worker.progress > 0 && (
                        <div className="text-xs text-gray-300 space-y-1">
                          <div className="flex justify-between">
                            <span>Progress:</span>
                            <span>{Math.floor(worker.progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full transition-all"
                              style={{ width: `${worker.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <span>CPU:</span>
                            <span>{Math.floor(worker.cpuUsage)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Throughput:</span>
                            <span>{Math.floor(worker.throughput).toLocaleString()}/s</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reduce Workers */}
              <div>
                <h5 className="text-sm font-medium text-green-400 mb-2">Reduce Workers</h5>
                <div className="space-y-2">
                  {reduceWorkers.map((worker) => (
                    <div key={worker.id} className={`p-2 rounded-lg border ${getWorkerStatusColor(worker.status)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{worker.name}</span>
                        <span className="text-xs capitalize">{worker.status}</span>
                      </div>
                      {worker.progress > 0 && (
                        <div className="text-xs text-gray-300 space-y-1">
                          <div className="flex justify-between">
                            <span>Progress:</span>
                            <span>{Math.floor(worker.progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-green-500 h-1 rounded-full transition-all"
                              style={{ width: `${worker.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <span>CPU:</span>
                            <span>{Math.floor(worker.cpuUsage)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Throughput:</span>
                            <span>{Math.floor(worker.throughput).toLocaleString()}/s</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Log & Results */}
        <div className="space-y-6">
          {/* Process Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Process Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Process log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          {processingMetrics && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Job Results</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HardDrive className="w-4 h-4" />
                  <span className="font-medium text-white">MapReduce Job Completed</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">SUCCESS</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Processing Time</span>
                    <span className="text-blue-400 font-medium">{processingMetrics.totalTime}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Throughput</span>
                    <span className="text-yellow-400 font-medium">{processingMetrics.throughput.toLocaleString()} GB/h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Compression Ratio</span>
                    <span className="text-purple-400 font-medium">{processingMetrics.compressionRatio}:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Efficiency</span>
                    <span className="text-green-400 font-medium">{processingMetrics.efficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Node Utilization</span>
                    <span className="text-orange-400 font-medium">{processingMetrics.nodeUtilization}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Network Utilization</span>
                    <span className="text-cyan-400 font-medium">{processingMetrics.networkUtilization}%</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Data Flow:</div>
                    <div className="text-xs text-gray-300">
                      <div>Input: {selectedScenario.dataSize}TB → Intermediate: {intermediateData}TB → Output: {finalOutput}GB</div>
                      <div>Map Tasks: {selectedScenario.mapTasks} | Reduce Tasks: {selectedScenario.reduceTasks}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapReduceDemo;