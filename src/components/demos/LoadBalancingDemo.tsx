'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, Server, Activity, BarChart3, Zap, Clock, AlertCircle } from 'lucide-react';

interface ServerNode {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  activeTasks: number;
  queueSize: number;
  responseTime: number;
  status: 'healthy' | 'warning' | 'critical';
  capacity: number;
  weight: number;
}

interface LoadBalancingAlgorithm {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface TrafficScenario {
  id: string;
  name: string;
  description: string;
  requestCount: number;
  complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
  duration: number;
  pattern: 'steady' | 'spike' | 'burst' | 'gradual';
}

const INITIAL_SERVERS: ServerNode[] = [
  {
    id: 'server-a',
    name: 'Server A',
    cpu: 45,
    memory: 60,
    activeTasks: 12,
    queueSize: 3,
    responseTime: 180,
    status: 'healthy',
    capacity: 100,
    weight: 0.8
  },
  {
    id: 'server-b',
    name: 'Server B',
    cpu: 78,
    memory: 85,
    activeTasks: 18,
    queueSize: 8,
    responseTime: 320,
    status: 'warning',
    capacity: 100,
    weight: 0.3
  },
  {
    id: 'server-c',
    name: 'Server C',
    cpu: 23,
    memory: 40,
    activeTasks: 6,
    queueSize: 1,
    responseTime: 145,
    status: 'healthy',
    capacity: 100,
    weight: 1.0
  },
  {
    id: 'server-d',
    name: 'Server D',
    cpu: 67,
    memory: 72,
    activeTasks: 14,
    queueSize: 5,
    responseTime: 250,
    status: 'warning',
    capacity: 100,
    weight: 0.6
  }
];

const ALGORITHMS: LoadBalancingAlgorithm[] = [
  {
    id: 'round-robin',
    name: 'Round Robin',
    description: 'Sequential distribution across servers',
    icon: <BarChart3 className="w-4 h-4" />
  },
  {
    id: 'least-connections',
    name: 'Least Connections',
    description: 'Route to server with fewest active connections',
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: 'weighted-round-robin',
    name: 'Weighted Round Robin',
    description: 'Distribution based on server capacity weights',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'least-response-time',
    name: 'Least Response Time',
    description: 'Route to fastest responding server',
    icon: <Clock className="w-4 h-4" />
  }
];

const TRAFFIC_SCENARIOS: TrafficScenario[] = [
  {
    id: 'normal',
    name: 'Normal Traffic',
    description: 'Steady moderate load across all servers',
    requestCount: 500,
    complexity: 'Medium',
    duration: 30,
    pattern: 'steady'
  },
  {
    id: 'traffic-spike',
    name: 'Traffic Spike',
    description: 'Sudden burst of high-volume requests',
    requestCount: 2000,
    complexity: 'High',
    duration: 15,
    pattern: 'spike'
  },
  {
    id: 'gradual-increase',
    name: 'Gradual Increase',
    description: 'Slowly increasing load over time',
    requestCount: 1200,
    complexity: 'Medium',
    duration: 45,
    pattern: 'gradual'
  },
  {
    id: 'burst-pattern',
    name: 'Burst Pattern',
    description: 'Intermittent high-load bursts',
    requestCount: 800,
    complexity: 'High',
    duration: 25,
    pattern: 'burst'
  }
];

export const LoadBalancingDemo: React.FC = () => {
  const [servers, setServers] = useState<ServerNode[]>(INITIAL_SERVERS);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS[2]); // Weighted Round Robin
  const [selectedScenario, setSelectedScenario] = useState(TRAFFIC_SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [totalRequests, setTotalRequests] = useState(0);
  const [processedRequests, setProcessedRequests] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState(0);
  const [systemEfficiency, setSystemEfficiency] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [selectedServer, setSelectedServer] = useState<ServerNode | null>(null);
  const [distributionResult, setDistributionResult] = useState<string>('');

  const resetDemo = useCallback(() => {
    setServers(INITIAL_SERVERS);
    setCurrentPhase('');
    setIsRunning(false);
    setTotalRequests(0);
    setProcessedRequests(0);
    setAvgResponseTime(0);
    setSystemEfficiency(0);
    setExecutionLog([]);
    setSelectedServer(null);
    setDistributionResult('');
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, selectedAlgorithm, resetDemo]);

  const calculateDistribution = (algorithm: LoadBalancingAlgorithm, servers: ServerNode[], requests: number) => {
    const distribution: { [serverId: string]: number } = {};
    
    switch (algorithm.id) {
      case 'round-robin':
        const perServer = Math.floor(requests / servers.length);
        const remainder = requests % servers.length;
        servers.forEach((server, index) => {
          distribution[server.id] = perServer + (index < remainder ? 1 : 0);
        });
        break;
        
      case 'least-connections':
        // Distribute inversely proportional to active tasks
        const totalTasks = servers.reduce((sum, s) => sum + s.activeTasks, 0);
        const maxTasks = Math.max(...servers.map(s => s.activeTasks));
        servers.forEach(server => {
          const weight = (maxTasks - server.activeTasks + 1) / (maxTasks + 1);
          distribution[server.id] = Math.floor(requests * weight / servers.length);
        });
        break;
        
      case 'weighted-round-robin':
        const totalWeight = servers.reduce((sum, s) => sum + s.weight, 0);
        servers.forEach(server => {
          distribution[server.id] = Math.floor(requests * (server.weight / totalWeight));
        });
        break;
        
      case 'least-response-time':
        const totalInverseTime = servers.reduce((sum, s) => sum + (1000 / s.responseTime), 0);
        servers.forEach(server => {
          const weight = (1000 / server.responseTime) / totalInverseTime;
          distribution[server.id] = Math.floor(requests * weight);
        });
        break;
    }
    
    return distribution;
  };

  const getServerStatus = (cpu: number, memory: number): 'healthy' | 'warning' | 'critical' => {
    const avgLoad = (cpu + memory) / 2;
    if (avgLoad > 80) return 'critical';
    if (avgLoad > 65) return 'warning';
    return 'healthy';
  };

  const runLoadBalancingDemo = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting load balancing demonstration...']);
    setTotalRequests(selectedScenario.requestCount);

    // Phase 1: System Assessment
    setCurrentPhase('assessment');
    setExecutionLog(prev => [...prev, '📊 Assessing current system state...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));
    
    setExecutionLog(prev => [...prev, `✅ Scenario: ${selectedScenario.name} (${selectedScenario.requestCount} requests)`]);
    setExecutionLog(prev => [...prev, `✅ Algorithm: ${selectedAlgorithm.name}`]);

    // Phase 2: Algorithm Selection
    setCurrentPhase('algorithm');
    setExecutionLog(prev => [...prev, '🎯 Configuring load balancing algorithm...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    
    setExecutionLog(prev => [...prev, `✅ Selected: ${selectedAlgorithm.name}`]);
    setExecutionLog(prev => [...prev, `✅ Strategy: ${selectedAlgorithm.description}`]);

    // Phase 3: Distribution Calculation
    setCurrentPhase('distribution');
    setExecutionLog(prev => [...prev, '⚖️ Calculating optimal request distribution...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    const distribution = calculateDistribution(selectedAlgorithm, servers, selectedScenario.requestCount);
    setExecutionLog(prev => [...prev, '✅ Distribution calculated successfully']);

    // Phase 4: Load Distribution
    setCurrentPhase('execution');
    setExecutionLog(prev => [...prev, '🚀 Executing load distribution...']);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Update servers based on distribution
    const updatedServers = servers.map(server => {
      const additionalTasks = distribution[server.id] || 0;
      const newCpu = Math.min(95, server.cpu + (additionalTasks * 2.5));
      const newMemory = Math.min(95, server.memory + (additionalTasks * 1.8));
      const newActiveTasks = server.activeTasks + Math.floor(additionalTasks * 0.7);
      const newQueueSize = Math.max(0, server.queueSize + Math.floor(additionalTasks * 0.3));
      const newResponseTime = server.responseTime + (additionalTasks * 3);
      
      return {
        ...server,
        cpu: newCpu,
        memory: newMemory,
        activeTasks: newActiveTasks,
        queueSize: newQueueSize,
        responseTime: newResponseTime,
        status: getServerStatus(newCpu, newMemory)
      };
    });

    setServers(updatedServers);
    
    // Select the server that received the most requests
    const maxDistribution = Math.max(...Object.values(distribution));
    const primaryServer = updatedServers.find(s => distribution[s.id] === maxDistribution);
    setSelectedServer(primaryServer || null);

    setExecutionLog(prev => [...prev, `✅ Distributed ${selectedScenario.requestCount} requests across ${servers.length} servers`]);

    // Phase 5: Processing
    setCurrentPhase('processing');
    setExecutionLog(prev => [...prev, '⚡ Processing requests...']);
    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    // Calculate metrics
    const totalResponseTime = updatedServers.reduce((sum, s) => sum + s.responseTime * (distribution[s.id] || 0), 0);
    const avgResponse = Math.floor(totalResponseTime / selectedScenario.requestCount);
    const totalCapacity = updatedServers.reduce((sum, s) => sum + s.capacity, 0);
    const usedCapacity = updatedServers.reduce((sum, s) => sum + (s.cpu + s.memory) / 2, 0);
    const efficiency = Math.floor(((totalCapacity - usedCapacity) / totalCapacity) * 100);

    setProcessedRequests(selectedScenario.requestCount);
    setAvgResponseTime(avgResponse);
    setSystemEfficiency(Math.max(10, efficiency));

    const distributionSummary = updatedServers.map(server => 
      `${server.name}: ${distribution[server.id] || 0} requests`
    ).join(', ');
    
    setDistributionResult(distributionSummary);
    setExecutionLog(prev => [...prev, `✅ Processing complete: ${avgResponse}ms avg response time`]);

    // Phase 6: Optimization
    setCurrentPhase('optimization');
    setExecutionLog(prev => [...prev, '🔧 Analyzing performance and optimizing...']);
    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    setExecutionLog(prev => [...prev, `✅ System efficiency: ${Math.max(10, efficiency)}%`]);
    setExecutionLog(prev => [...prev, `✅ Load balancing optimization complete`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Load balancing demonstration completed successfully!']);
  }, [selectedScenario, selectedAlgorithm, servers, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (processedRequests > 0 && ['assessment', 'algorithm', 'distribution'].includes(phase)) {
      return 'border-green-500 bg-green-900/20';
    }
    if (distributionResult && phase === 'execution') {
      return 'border-green-500 bg-green-900/20';
    }
    if (systemEfficiency > 0 && ['processing', 'optimization'].includes(phase)) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-900/20';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20';
      case 'critical': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">⚖️</span>
          Load Balancing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how intelligent load balancing distributes workload across servers based on real-time performance metrics and capacity.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Traffic Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = TRAFFIC_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TRAFFIC_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Balancing Algorithm
            </label>
            <select
              value={selectedAlgorithm.id}
              onChange={(e) => {
                const algorithm = ALGORITHMS.find(a => a.id === e.target.value);
                if (algorithm) setSelectedAlgorithm(algorithm);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ALGORITHMS.map((algorithm) => (
                <option key={algorithm.id} value={algorithm.id}>
                  {algorithm.name}
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
                onClick={runLoadBalancingDemo}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Running...' : 'Start Demo'}
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
              <div className="text-gray-400">Requests</div>
              <div className="text-white font-medium">{selectedScenario.requestCount.toLocaleString()}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Complexity</div>
              <div className="text-white font-medium">{selectedScenario.complexity}</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Duration</div>
              <div className="text-white font-medium">{selectedScenario.duration}s</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-gray-400">Algorithm</div>
              <div className="text-white font-medium">{selectedAlgorithm.name}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Load Balancing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Load Balancing Pipeline</h3>
          
          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* System Assessment */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('assessment')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  System Assessment
                </h4>
                {currentPhase === 'assessment' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {processedRequests > 0 && <AlertCircle className="w-4 h-4 text-green-400" />}
              </div>
              {currentPhase !== '' && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Traffic:</span> <span className="text-orange-400">{selectedScenario.requestCount.toLocaleString()} requests</span></div>
                  <div><span className="text-gray-400">Pattern:</span> <span className="text-blue-400">{selectedScenario.pattern}</span></div>
                </div>
              )}
            </div>

            {/* Algorithm Configuration */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('algorithm')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Algorithm Configuration
                </h4>
                {currentPhase === 'algorithm' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {distributionResult && <AlertCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedAlgorithm && (
                <div className="text-sm text-gray-300">
                  <div className="flex items-center gap-2 mb-1">
                    {selectedAlgorithm.icon}
                    <span className="text-white font-medium">{selectedAlgorithm.name}</span>
                  </div>
                  <div className="text-gray-400">{selectedAlgorithm.description}</div>
                </div>
              )}
            </div>

            {/* Distribution Calculation */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('distribution')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Distribution Calculation
                </h4>
                {currentPhase === 'distribution' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {distributionResult && <AlertCircle className="w-4 h-4 text-green-400" />}
              </div>
              {distributionResult && (
                <div className="text-sm text-gray-300">
                  {distributionResult.split(', ').map((item, index) => (
                    <div key={index} className="mb-1">• {item}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Request Processing
                </h4>
                {currentPhase === 'processing' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {avgResponseTime > 0 && <AlertCircle className="w-4 h-4 text-green-400" />}
              </div>
              {avgResponseTime > 0 && (
                <div className="text-sm text-gray-300">
                  <div><span className="text-gray-400">Processed:</span> <span className="text-green-400">{processedRequests.toLocaleString()} / {totalRequests.toLocaleString()}</span></div>
                  <div><span className="text-gray-400">Avg Response:</span> <span className="text-blue-400">{avgResponseTime}ms</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Server Grid */}
          <div>
            <h4 className="font-medium text-white mb-3">Server Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servers.map((server) => {
                const isSelected = selectedServer?.id === server.id;
                
                return (
                  <div
                    key={server.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : `border-gray-600 ${getStatusColor(server.status)}`
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        <div className="font-medium text-white text-sm">{server.name}</div>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded capitalize ${getStatusColor(server.status)}`}>
                        {server.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>CPU:</span>
                        <span className={server.cpu > 80 ? 'text-red-400' : server.cpu > 65 ? 'text-yellow-400' : 'text-green-400'}>
                          {server.cpu}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span className={server.memory > 80 ? 'text-red-400' : server.memory > 65 ? 'text-yellow-400' : 'text-green-400'}>
                          {server.memory}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tasks:</span>
                        <span className="text-white">{server.activeTasks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Queue:</span>
                        <span className="text-white">{server.queueSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response:</span>
                        <span className="text-white">{server.responseTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="text-blue-400">{server.weight.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          {systemEfficiency > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Requests</span>
                    <span className="text-white font-medium">{processedRequests.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg Response Time</span>
                    <span className="text-blue-400 font-medium">{avgResponseTime}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">System Efficiency</span>
                    <span className="text-green-400 font-medium">{systemEfficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Algorithm</span>
                    <span className="text-purple-400 font-medium">{selectedAlgorithm.name}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Load Distribution:</div>
                    <div className="text-xs text-gray-300">
                      {distributionResult.split(', ').map((item, index) => (
                        <div key={index}>• {item}</div>
                      ))}
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

export default LoadBalancingDemo;