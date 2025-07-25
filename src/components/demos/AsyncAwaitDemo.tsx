'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Clock, CheckCircle, AlertCircle, Globe, Database, Mail, Bell, BarChart3, Wifi, WifiOff, Activity, Timer, Layers } from 'lucide-react';

interface AsyncOperation {
  id: string;
  name: string;
  url: string;
  status: 'pending' | 'running' | 'fulfilled' | 'rejected';
  startTime?: number;
  endTime?: number;
  duration?: number;
  result?: any;
  error?: string;
  progress?: number;
}

interface ScenarioConfig {
  name: string;
  description: string;
  operations: {
    id: string;
    name: string;
    url: string;
    expectedDuration: number;
    failureRate: number;
    dataSize: number;
  }[];
  strategy: 'Promise.all' | 'Promise.allSettled' | 'Sequential' | 'Promise.race';
  timeout: number;
}

const scenarios: ScenarioConfig[] = [
  {
    name: 'Dashboard Data Fetching',
    description: 'Fetch user dashboard data from multiple services concurrently',
    operations: [
      { id: 'profile', name: 'User Profile', url: '/api/user/profile', expectedDuration: 180, failureRate: 0.05, dataSize: 2.1 },
      { id: 'orders', name: 'Recent Orders', url: '/api/user/orders', expectedDuration: 245, failureRate: 0.1, dataSize: 15.3 },
      { id: 'preferences', name: 'User Preferences', url: '/api/user/preferences', expectedDuration: 95, failureRate: 0.02, dataSize: 1.2 },
      { id: 'notifications', name: 'Notifications', url: '/api/user/notifications', expectedDuration: 320, failureRate: 0.08, dataSize: 8.7 },
      { id: 'analytics', name: 'Analytics Data', url: '/api/user/analytics', expectedDuration: 400, failureRate: 0.3, dataSize: 25.6 }
    ],
    strategy: 'Promise.allSettled',
    timeout: 5000
  },
  {
    name: 'E-commerce Product Search',
    description: 'Search products across multiple databases and services',
    operations: [
      { id: 'inventory', name: 'Inventory Search', url: '/api/inventory/search', expectedDuration: 150, failureRate: 0.05, dataSize: 12.4 },
      { id: 'pricing', name: 'Price Lookup', url: '/api/pricing/search', expectedDuration: 120, failureRate: 0.08, dataSize: 3.2 },
      { id: 'reviews', name: 'Reviews & Ratings', url: '/api/reviews/search', expectedDuration: 280, failureRate: 0.15, dataSize: 18.9 },
      { id: 'recommendations', name: 'Recommendations', url: '/api/ml/recommendations', expectedDuration: 450, failureRate: 0.12, dataSize: 6.7 }
    ],
    strategy: 'Promise.all',
    timeout: 3000
  },
  {
    name: 'Real-time Monitoring',
    description: 'Collect real-time metrics from multiple monitoring endpoints',
    operations: [
      { id: 'cpu', name: 'CPU Metrics', url: '/api/metrics/cpu', expectedDuration: 50, failureRate: 0.02, dataSize: 0.8 },
      { id: 'memory', name: 'Memory Metrics', url: '/api/metrics/memory', expectedDuration: 45, failureRate: 0.03, dataSize: 1.1 },
      { id: 'network', name: 'Network Metrics', url: '/api/metrics/network', expectedDuration: 80, failureRate: 0.05, dataSize: 2.3 },
      { id: 'storage', name: 'Storage Metrics', url: '/api/metrics/storage', expectedDuration: 120, failureRate: 0.08, dataSize: 1.9 }
    ],
    strategy: 'Promise.race',
    timeout: 1000
  },
  {
    name: 'Sequential File Processing',
    description: 'Process files sequentially with async/await for order-dependent operations',
    operations: [
      { id: 'validate', name: 'File Validation', url: '/api/files/validate', expectedDuration: 200, failureRate: 0.1, dataSize: 0.5 },
      { id: 'transform', name: 'Data Transform', url: '/api/files/transform', expectedDuration: 800, failureRate: 0.15, dataSize: 45.2 },
      { id: 'analyze', name: 'Content Analysis', url: '/api/files/analyze', expectedDuration: 600, failureRate: 0.12, dataSize: 12.8 },
      { id: 'store', name: 'Store Results', url: '/api/files/store', expectedDuration: 300, failureRate: 0.05, dataSize: 2.1 }
    ],
    strategy: 'Sequential',
    timeout: 10000
  }
];

const AsyncAwaitDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [operations, setOperations] = useState<AsyncOperation[]>([]);
  const [executionPhase, setExecutionPhase] = useState<'idle' | 'initializing' | 'executing' | 'complete'>('idle');
  const [metrics, setMetrics] = useState({
    totalTime: 0,
    successCount: 0,
    failureCount: 0,
    averageLatency: 0,
    concurrencyLevel: 0,
    dataTransferred: 0,
    memoryUsage: 0
  });
  const [logs, setLogs] = useState<string[]>([]);

  const scenario = scenarios[selectedScenario];

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setOperations([]);
    setExecutionPhase('idle');
    setMetrics({
      totalTime: 0,
      successCount: 0,
      failureCount: 0,
      averageLatency: 0,
      concurrencyLevel: 0,
      dataTransferred: 0,
      memoryUsage: 0
    });
    setLogs([]);
  };

  const simulateAsyncOperation = async (operation: any): Promise<any> => {
    const startTime = Date.now();
    
    // Simulate variable latency and potential failures
    const actualDuration = operation.expectedDuration + (Math.random() - 0.5) * 100;
    const shouldFail = Math.random() < operation.failureRate;
    
    await new Promise(resolve => setTimeout(resolve, actualDuration));
    
    if (shouldFail) {
      throw new Error(`${operation.name} service unavailable`);
    }
    
    // Generate mock data
    const mockData = {
      [operation.id]: {
        timestamp: new Date().toISOString(),
        size: operation.dataSize,
        status: 'success',
        data: `Mock data for ${operation.name}`
      }
    };
    
    return {
      duration: Date.now() - startTime,
      result: mockData
    };
  };

  const runDemo = async () => {
    setIsRunning(true);
    setExecutionPhase('initializing');
    
    const startTime = Date.now();
    addLog(`Starting ${scenario.name} execution`);
    addLog(`Strategy: ${scenario.strategy}, Timeout: ${scenario.timeout}ms`);
    
    // Initialize operations
    const initialOps: AsyncOperation[] = scenario.operations.map(op => ({
      id: op.id,
      name: op.name,
      url: op.url,
      status: 'pending',
      progress: 0
    }));
    
    setOperations(initialOps);
    setExecutionPhase('executing');
    
    try {
      let results: any[] = [];
      let successCount = 0;
      let failureCount = 0;
      let totalDataTransferred = 0;
      
      if (scenario.strategy === 'Sequential') {
        addLog('Executing operations sequentially...');
        
        for (let i = 0; i < scenario.operations.length; i++) {
          const operation = scenario.operations[i];
          
          setOperations(prev => prev.map(op => 
            op.id === operation.id 
              ? { ...op, status: 'running', startTime: Date.now() }
              : op
          ));
          
          addLog(`Starting ${operation.name}...`);
          
          try {
            const result = await simulateAsyncOperation(operation);
            
            setOperations(prev => prev.map(op => 
              op.id === operation.id 
                ? { 
                    ...op, 
                    status: 'fulfilled', 
                    endTime: Date.now(),
                    duration: result.duration,
                    result: result.result
                  }
                : op
            ));
            
            successCount++;
            totalDataTransferred += operation.dataSize;
            addLog(`✓ ${operation.name} completed in ${result.duration}ms`);
            
          } catch (error) {
            setOperations(prev => prev.map(op => 
              op.id === operation.id 
                ? { 
                    ...op, 
                    status: 'rejected', 
                    endTime: Date.now(),
                    error: (error as Error).message
                  }
                : op
            ));
            
            failureCount++;
            addLog(`✗ ${operation.name} failed: ${(error as Error).message}`);
          }
        }
        
      } else {
        addLog(`Executing ${scenario.operations.length} operations concurrently...`);
        
        // Mark all as running
        setOperations(prev => prev.map(op => ({ 
          ...op, 
          status: 'running', 
          startTime: Date.now() 
        })));
        
        const promises = scenario.operations.map(async (operation) => {
          try {
            const result = await simulateAsyncOperation(operation);
            
            setOperations(prev => prev.map(op => 
              op.id === operation.id 
                ? { 
                    ...op, 
                    status: 'fulfilled', 
                    endTime: Date.now(),
                    duration: result.duration,
                    result: result.result
                  }
                : op
            ));
            
            addLog(`✓ ${operation.name} completed in ${result.duration}ms`);
            return { status: 'fulfilled', value: result, operation };
            
          } catch (error) {
            setOperations(prev => prev.map(op => 
              op.id === operation.id 
                ? { 
                    ...op, 
                    status: 'rejected', 
                    endTime: Date.now(),
                    error: (error as Error).message
                  }
                : op
            ));
            
            addLog(`✗ ${operation.name} failed: ${(error as Error).message}`);
            return { status: 'rejected', reason: error, operation };
          }
        });
        
        if (scenario.strategy === 'Promise.all') {
          try {
            results = await Promise.all(promises);
            successCount = results.length;
          } catch (error) {
            addLog('Promise.all failed - operation aborted');
            failureCount = scenario.operations.length;
          }
        } else if (scenario.strategy === 'Promise.allSettled') {
          results = await Promise.allSettled(promises);
          successCount = results.filter(r => r.status === 'fulfilled').length;
          failureCount = results.filter(r => r.status === 'rejected').length;
        } else if (scenario.strategy === 'Promise.race') {
          try {
            const winner = await Promise.race(promises);
            results = [winner];
            successCount = 1;
            addLog(`Race won by: ${winner.operation.name}`);
          } catch (error) {
            failureCount = 1;
            addLog('Promise.race failed');
          }
        }
        
        totalDataTransferred = scenario.operations
          .filter(op => operations.some(o => o.id === op.id && o.status === 'fulfilled'))
          .reduce((sum, op) => sum + op.dataSize, 0);
      }
      
      const totalTime = Date.now() - startTime;
      const averageLatency = scenario.operations
        .map(op => operations.find(o => o.id === op.id)?.duration || 0)
        .reduce((sum, duration) => sum + duration, 0) / scenario.operations.length;
      
      setMetrics({
        totalTime,
        successCount,
        failureCount,
        averageLatency,
        concurrencyLevel: scenario.strategy === 'Sequential' ? 1 : scenario.operations.length,
        dataTransferred: totalDataTransferred,
        memoryUsage: totalDataTransferred * 1.5 // Estimate memory usage
      });
      
      addLog(`Execution completed: ${successCount} success, ${failureCount} failures`);
      addLog(`Total time: ${totalTime}ms, Data transferred: ${totalDataTransferred.toFixed(1)}KB`);
      
    } catch (error) {
      addLog(`Execution error: ${(error as Error).message}`);
    }
    
    setExecutionPhase('complete');
    setIsRunning(false);
  };

  const getOperationIcon = (id: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      profile: <Database className="w-4 h-4" />,
      orders: <BarChart3 className="w-4 h-4" />,
      preferences: <Activity className="w-4 h-4" />,
      notifications: <Bell className="w-4 h-4" />,
      analytics: <BarChart3 className="w-4 h-4" />,
      inventory: <Database className="w-4 h-4" />,
      pricing: <Zap className="w-4 h-4" />,
      reviews: <Mail className="w-4 h-4" />,
      recommendations: <Activity className="w-4 h-4" />,
      cpu: <Activity className="w-4 h-4" />,
      memory: <Database className="w-4 h-4" />,
      network: <Globe className="w-4 h-4" />,
      storage: <Database className="w-4 h-4" />,
      validate: <CheckCircle className="w-4 h-4" />,
      transform: <Activity className="w-4 h-4" />,
      analyze: <BarChart3 className="w-4 h-4" />,
      store: <Database className="w-4 h-4" />
    };
    return icons[id] || <Globe className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-400 border-gray-600 bg-gray-800/30';
      case 'running': return 'text-blue-400 border-blue-500 bg-blue-600/20 animate-pulse';
      case 'fulfilled': return 'text-green-400 border-green-500 bg-green-600/20';
      case 'rejected': return 'text-red-400 border-red-500 bg-red-600/20';
      default: return 'text-gray-400 border-gray-600 bg-gray-800/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'running': return <Wifi className="w-4 h-4 animate-pulse" />;
      case 'fulfilled': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <WifiOff className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Async-Await Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate non-blocking asynchronous operations with promise-based coordination
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Run Demo'}
          </button>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Scenario:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedScenario(index);
                resetDemo();
              }}
              className={`p-3 rounded-lg text-left transition-colors border ${
                selectedScenario === index
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="font-medium">{scenario.name}</div>
              <div className="text-xs text-gray-400 mt-1">{scenario.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                Strategy: {scenario.strategy} • {scenario.operations.length} operations
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Strategy</div>
            <div className="text-white font-medium">{scenario.strategy}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Operations</div>
            <div className="text-white">{scenario.operations.length} async calls</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Timeout</div>
            <div className="text-white">{scenario.timeout}ms</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Phase</div>
            <div className="text-white capitalize">{executionPhase}</div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      {executionPhase !== 'idle' && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Total Time</div>
            <div className="text-white font-medium">{metrics.totalTime}ms</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Success Rate</div>
            <div className="text-green-400 font-medium">
              {operations.length > 0 ? Math.round((metrics.successCount / operations.length) * 100) : 0}%
            </div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Avg Latency</div>
            <div className="text-blue-400 font-medium">{Math.round(metrics.averageLatency)}ms</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Data Transfer</div>
            <div className="text-purple-400 font-medium">{metrics.dataTransferred.toFixed(1)}KB</div>
          </div>
        </div>
      )}

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {operations.map((operation) => (
          <div
            key={operation.id}
            className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(operation.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getOperationIcon(operation.id)}
                <span className="font-medium text-white">{operation.name}</span>
              </div>
              {getStatusIcon(operation.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`capitalize ${getStatusColor(operation.status).split(' ')[0]}`}>
                  {operation.status}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">URL:</span>
                <span className="text-gray-300 font-mono text-xs">{operation.url}</span>
              </div>
              
              {operation.duration && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{operation.duration}ms</span>
                </div>
              )}
              
              {operation.error && (
                <div className="text-red-400 text-xs mt-2">
                  Error: {operation.error}
                </div>
              )}
              
              {operation.result && (
                <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs">
                  <div className="text-gray-400 mb-1">Response:</div>
                  <div className="text-green-300 font-mono">
                    Size: {Object.values(operation.result)[0]?.size}KB
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Execution Logs */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Execution Log
        </h4>
        <div className="bg-gray-900/60 rounded-lg border border-gray-700 p-4 h-48 overflow-y-auto">
          {logs.length > 0 ? (
            <div className="space-y-1 text-sm font-mono">
              {logs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Timer className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Click "Run Demo" to see execution logs</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {executionPhase === 'complete' && (
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Async-Await Execution Results
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Execution Summary</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Strategy Used:</span>
                  <span className="text-blue-400">{scenario.strategy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Execution Time:</span>
                  <span className="text-green-400">{metrics.totalTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful Operations:</span>
                  <span className="text-green-400">{metrics.successCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed Operations:</span>
                  <span className="text-red-400">{metrics.failureCount}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Performance Metrics</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Concurrency Level:</span>
                  <span className="text-blue-400">{metrics.concurrencyLevel}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Latency:</span>
                  <span className="text-purple-400">{Math.round(metrics.averageLatency)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Transferred:</span>
                  <span className="text-orange-400">{metrics.dataTransferred.toFixed(1)}KB</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span className="text-cyan-400">{metrics.memoryUsage.toFixed(1)}KB</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>Summary:</strong> Async-await pattern executed {scenario.name.toLowerCase()} using {scenario.strategy} strategy
            with {metrics.successCount} successful operations out of {operations.length} total operations in {metrics.totalTime}ms.
            {scenario.strategy !== 'Sequential' && ` Concurrency level of ${metrics.concurrencyLevel}x provided significant performance benefits.`}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsyncAwaitDemo;