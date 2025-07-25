'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Clock, CheckCircle, AlertCircle, Globe, Database, Star, ShoppingCart, Package, TrendingUp, Settings, Wifi, WifiOff } from 'lucide-react';

interface ServiceResponse {
  service: string;
  status: 'pending' | 'processing' | 'success' | 'error' | 'timeout';
  responseTime: number;
  data?: any;
  error?: string;
}

interface ScenarioConfig {
  name: string;
  description: string;
  query: string;
  services: string[];
  timeout: number;
  simulatedLatencies: { [key: string]: number };
  simulatedFailures: string[];
}

const scenarios: ScenarioConfig[] = [
  {
    name: 'E-commerce Product Search',
    description: 'Search for laptop products across multiple microservices',
    query: 'gaming laptop under $1500',
    services: ['Inventory', 'Pricing', 'Reviews', 'Recommendations', 'Catalog'],
    timeout: 500,
    simulatedLatencies: {
      'Inventory': 120,
      'Pricing': 95,
      'Reviews': 180,
      'Recommendations': 230,
      'Catalog': 85
    },
    simulatedFailures: []
  },
  {
    name: 'Financial Data Aggregation',
    description: 'Gather financial data from multiple market data providers',
    query: 'AAPL stock analysis',
    services: ['Market Data', 'News', 'Analytics', 'Historical', 'Options'],
    timeout: 800,
    simulatedLatencies: {
      'Market Data': 150,
      'News': 320,
      'Analytics': 450,
      'Historical': 200,
      'Options': 180
    },
    simulatedFailures: ['News']
  },
  {
    name: 'Travel Booking Search',
    description: 'Search across multiple travel service providers',
    query: 'flights NYC to LAX Dec 15',
    services: ['Flights', 'Hotels', 'Cars', 'Weather', 'Reviews'],
    timeout: 1000,
    simulatedLatencies: {
      'Flights': 400,
      'Hotels': 350,
      'Cars': 280,
      'Weather': 120,
      'Reviews': 380
    },
    simulatedFailures: []
  },
  {
    name: 'Health Data Integration',
    description: 'Aggregate patient data from multiple healthcare systems',
    query: 'patient ID: 12345 comprehensive view',
    services: ['EMR', 'Lab Results', 'Imaging', 'Pharmacy', 'Insurance'],
    timeout: 2000,
    simulatedLatencies: {
      'EMR': 300,
      'Lab Results': 250,
      'Imaging': 600,
      'Pharmacy': 180,
      'Insurance': 450
    },
    simulatedFailures: ['Insurance']
  }
];

const ScatterGatherDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'scatter' | 'processing' | 'gather' | 'complete'>('idle');
  const [serviceResponses, setServiceResponses] = useState<ServiceResponse[]>([]);
  const [scatterTime, setScatterTime] = useState(0);
  const [gatherTime, setGatherTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [completedServices, setCompletedServices] = useState(0);
  const [failedServices, setFailedServices] = useState(0);

  const scenario = scenarios[selectedScenario];

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep('idle');
    setServiceResponses([]);
    setScatterTime(0);
    setGatherTime(0);
    setTotalTime(0);
    setCompletedServices(0);
    setFailedServices(0);
  };

  const runDemo = async () => {
    setIsRunning(true);
    setCurrentStep('scatter');
    
    const startTime = Date.now();
    
    // Initialize service responses
    const initialResponses: ServiceResponse[] = scenario.services.map(service => ({
      service,
      status: 'pending',
      responseTime: 0
    }));
    setServiceResponses(initialResponses);

    // Scatter phase
    await new Promise(resolve => setTimeout(resolve, 100));
    setScatterTime(Date.now() - startTime);
    setCurrentStep('processing');

    // Update to processing status
    setServiceResponses(prev => prev.map(response => ({
      ...response,
      status: 'processing'
    })));

    // Simulate parallel service calls
    const servicePromises = scenario.services.map(async (service, index) => {
      const latency = scenario.simulatedLatencies[service] || 200;
      const shouldFail = scenario.simulatedFailures.includes(service);
      
      await new Promise(resolve => setTimeout(resolve, latency));
      
      setServiceResponses(prev => prev.map(response => 
        response.service === service 
          ? {
              ...response,
              status: shouldFail ? 'error' : 'success',
              responseTime: latency,
              data: shouldFail ? undefined : generateMockData(service),
              error: shouldFail ? 'Service temporarily unavailable' : undefined
            }
          : response
      ));

      if (shouldFail) {
        setFailedServices(prev => prev + 1);
      } else {
        setCompletedServices(prev => prev + 1);
      }
    });

    // Wait for all services or timeout
    try {
      await Promise.race([
        Promise.allSettled(servicePromises),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), scenario.timeout)
        )
      ]);
    } catch (error) {
      // Handle timeout - mark remaining pending services as timeout
      setServiceResponses(prev => prev.map(response => 
        response.status === 'processing' 
          ? { ...response, status: 'timeout', error: 'Request timeout' }
          : response
      ));
    }

    // Gather phase
    setCurrentStep('gather');
    const gatherStart = Date.now();
    await new Promise(resolve => setTimeout(resolve, 150));
    setGatherTime(Date.now() - gatherStart);

    // Complete
    setCurrentStep('complete');
    setTotalTime(Date.now() - startTime);
    setIsRunning(false);
  };

  const generateMockData = (service: string) => {
    const mockData: { [key: string]: any } = {
      'Inventory': { stock: 45, available: true, warehouse: '3 locations' },
      'Pricing': { price: 1299.99, discount: 15, finalPrice: 1104.99 },
      'Reviews': { rating: 4.3, count: 127, summary: 'Highly rated' },
      'Recommendations': { similar: 3, confidence: 87, personalized: true },
      'Catalog': { specs: 'Intel i7, 16GB RAM, RTX 3070' },
      'Market Data': { price: 150.25, change: '+2.3%', volume: '2.1M' },
      'News': { articles: 15, sentiment: 'positive', trending: true },
      'Analytics': { score: 8.2, recommendation: 'BUY', target: 165 },
      'Historical': { volatility: 'medium', trend: 'bullish' },
      'Options': { calls: 1250, puts: 890, ratio: 1.4 },
      'Flights': { results: 12, cheapest: 299, duration: '5h 30m' },
      'Hotels': { available: 45, from: 89, rating: '4.2★' },
      'Cars': { available: 23, from: 35, pickup: 'LAX' },
      'Weather': { temp: '72°F', condition: 'sunny', forecast: 'clear' },
      'EMR': { records: 'complete', lastVisit: '2024-01-15' },
      'Lab Results': { pending: 0, abnormal: 1, urgent: 0 },
      'Imaging': { studies: 3, reports: 'available' },
      'Pharmacy': { prescriptions: 4, refills: 2 },
      'Insurance': { coverage: 'active', copay: 25 }
    };
    return mockData[service] || { status: 'success' };
  };

  const getServiceIcon = (service: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Inventory': <Package className="w-4 h-4" />,
      'Pricing': <TrendingUp className="w-4 h-4" />,
      'Reviews': <Star className="w-4 h-4" />,
      'Recommendations': <Zap className="w-4 h-4" />,
      'Catalog': <Database className="w-4 h-4" />,
      'Market Data': <TrendingUp className="w-4 h-4" />,
      'News': <Globe className="w-4 h-4" />,
      'Analytics': <Settings className="w-4 h-4" />,
      'Historical': <Clock className="w-4 h-4" />,
      'Options': <ShoppingCart className="w-4 h-4" />,
      'Flights': <Globe className="w-4 h-4" />,
      'Hotels': <Package className="w-4 h-4" />,
      'Cars': <ShoppingCart className="w-4 h-4" />,
      'Weather': <Globe className="w-4 h-4" />,
      'EMR': <Database className="w-4 h-4" />,
      'Lab Results': <Settings className="w-4 h-4" />,
      'Imaging': <Package className="w-4 h-4" />,
      'Pharmacy': <Star className="w-4 h-4" />,
      'Insurance': <CheckCircle className="w-4 h-4" />
    };
    return icons[service] || <Wifi className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-400 border-gray-600';
      case 'processing': return 'text-blue-400 border-blue-500';
      case 'success': return 'text-green-400 border-green-500';
      case 'error': return 'text-red-400 border-red-500';
      case 'timeout': return 'text-orange-400 border-orange-500';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Wifi className="w-4 h-4 animate-pulse" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <WifiOff className="w-4 h-4" />;
      case 'timeout': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Scatter-Gather Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate concurrent requests to multiple services with response aggregation
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
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">Query</div>
            <div className="text-white font-mono text-sm">"{scenario.query}"</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Services</div>
            <div className="text-white">{scenario.services.length} services</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Timeout</div>
            <div className="text-white">{scenario.timeout}ms</div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      {currentStep !== 'idle' && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Phase</div>
            <div className="text-white font-medium capitalize">{currentStep}</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Total Time</div>
            <div className="text-white font-medium">{totalTime}ms</div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Success Rate</div>
            <div className="text-green-400 font-medium">
              {serviceResponses.length > 0 ? 
                Math.round((completedServices / serviceResponses.length) * 100) : 0}%
            </div>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-400">Status</div>
            <div className="text-white font-medium">
              {completedServices}/{serviceResponses.length} completed
            </div>
          </div>
        </div>
      )}

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {serviceResponses.map((response, index) => (
          <div
            key={response.service}
            className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(response.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getServiceIcon(response.service)}
                <span className="font-medium text-white">{response.service}</span>
              </div>
              {getStatusIcon(response.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`capitalize ${getStatusColor(response.status).split(' ')[0]}`}>
                  {response.status}
                </span>
              </div>
              
              {response.responseTime > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Time:</span>
                  <span className="text-white">{response.responseTime}ms</span>
                </div>
              )}
              
              {response.error && (
                <div className="text-red-400 text-xs mt-2">
                  Error: {response.error}
                </div>
              )}
              
              {response.data && (
                <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs">
                  <div className="text-gray-400 mb-1">Response Data:</div>
                  <div className="text-green-300 font-mono">
                    {JSON.stringify(response.data, null, 2)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Aggregated Results */}
      {currentStep === 'complete' && (
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Scatter-Gather Results
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Performance Metrics</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Scatter Time:</span>
                  <span className="text-blue-400">{scatterTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Gather Time:</span>
                  <span className="text-purple-400">{gatherTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Time:</span>
                  <span className="text-green-400">{totalTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="text-green-400">
                    {Math.round((completedServices / serviceResponses.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Data Completeness</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Successful Services:</span>
                  <span className="text-green-400">{completedServices}</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed Services:</span>
                  <span className="text-red-400">{failedServices}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Coverage:</span>
                  <span className="text-blue-400">
                    {Math.round((completedServices / serviceResponses.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-300">
            <strong>Summary:</strong> Scatter-gather pattern completed with {completedServices} successful responses
            out of {serviceResponses.length} services in {totalTime}ms. 
            {failedServices > 0 && ` ${failedServices} services failed but system remained operational with partial data.`}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterGatherDemo;