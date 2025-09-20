'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Brain, Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle, ArrowRight, GitBranch, Zap, Package, Shield, DollarSign, Code2, HelpCircle, Users } from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  confidence?: number;
}

interface RoutingDecision {
  selectedRoute: string;
  confidence: number;
  reasoning: string;
  alternativeRoutes: Array<{ route: string; confidence: number }>;
  timestamp: Date;
  processingTime: number;
}

interface QueryExample {
  id: string;
  query: string;
  category: string;
  expectedRoute: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

interface RoutingScenario {
  id: string;
  name: string;
  description: string;
  routes: RouteOption[];
  examples: QueryExample[];
}

const SCENARIOS: RoutingScenario[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Routing',
    description: 'Route customer queries to specialized support teams based on intent',
    routes: [
      {
        id: 'billing',
        name: 'Billing Team',
        description: 'Payment, subscriptions, invoices',
        icon: <DollarSign className="w-5 h-5" />,
        color: 'green'
      },
      {
        id: 'technical',
        name: 'Technical Support',
        description: 'Product issues, bugs, integration',
        icon: <Code2 className="w-5 h-5" />,
        color: 'blue'
      },
      {
        id: 'sales',
        name: 'Sales Team',
        description: 'Pricing, features, upgrades',
        icon: <Package className="w-5 h-5" />,
        color: 'purple'
      },
      {
        id: 'security',
        name: 'Security Team',
        description: 'Account security, data privacy',
        icon: <Shield className="w-5 h-5" />,
        color: 'red'
      },
      {
        id: 'general',
        name: 'General Support',
        description: 'General inquiries, feedback',
        icon: <HelpCircle className="w-5 h-5" />,
        color: 'gray'
      }
    ],
    examples: [
      { id: 'q1', query: 'My credit card was charged twice for the same subscription', category: 'payment', expectedRoute: 'billing', complexity: 'simple' },
      { id: 'q2', query: 'The API is returning 500 errors when I try to authenticate', category: 'technical', expectedRoute: 'technical', complexity: 'simple' },
      { id: 'q3', query: 'I noticed suspicious login attempts on my account yesterday', category: 'security', expectedRoute: 'security', complexity: 'simple' },
      { id: 'q4', query: 'Can you explain the pricing differences between Pro and Enterprise?', category: 'sales', expectedRoute: 'sales', complexity: 'simple' },
      { id: 'q5', query: 'The integration isn\'t working and I think I was overcharged last month', category: 'mixed', expectedRoute: 'technical', complexity: 'complex' },
      { id: 'q6', query: 'How do I export my data? Also, is it secure?', category: 'mixed', expectedRoute: 'technical', complexity: 'moderate' }
    ]
  },
  {
    id: 'ai-agent-tools',
    name: 'AI Agent Tool Selection',
    description: 'Route tasks to appropriate tools/APIs based on request analysis',
    routes: [
      {
        id: 'code-gen',
        name: 'Code Generator',
        description: 'Generate, refactor, debug code',
        icon: <Code2 className="w-5 h-5" />,
        color: 'blue'
      },
      {
        id: 'data-analysis',
        name: 'Data Analyzer',
        description: 'Statistics, visualization, insights',
        icon: <Zap className="w-5 h-5" />,
        color: 'yellow'
      },
      {
        id: 'research',
        name: 'Research Tool',
        description: 'Web search, fact-checking, citations',
        icon: <Brain className="w-5 h-5" />,
        color: 'purple'
      },
      {
        id: 'creative',
        name: 'Creative Suite',
        description: 'Writing, design, content creation',
        icon: <Package className="w-5 h-5" />,
        color: 'pink'
      },
      {
        id: 'communication',
        name: 'Communication',
        description: 'Email drafts, messaging, scheduling',
        icon: <Users className="w-5 h-5" />,
        color: 'green'
      }
    ],
    examples: [
      { id: 'q1', query: 'Write a Python function to calculate Fibonacci numbers', category: 'programming', expectedRoute: 'code-gen', complexity: 'simple' },
      { id: 'q2', query: 'Analyze this CSV file and create a visualization of trends', category: 'analysis', expectedRoute: 'data-analysis', complexity: 'simple' },
      { id: 'q3', query: 'Find recent research papers on quantum computing', category: 'research', expectedRoute: 'research', complexity: 'simple' },
      { id: 'q4', query: 'Draft a professional email declining a meeting invitation', category: 'communication', expectedRoute: 'communication', complexity: 'simple' },
      { id: 'q5', query: 'Debug this code and then analyze its performance metrics', category: 'mixed', expectedRoute: 'code-gen', complexity: 'complex' },
      { id: 'q6', query: 'Research market trends and create a presentation', category: 'mixed', expectedRoute: 'research', complexity: 'complex' }
    ]
  },
  {
    id: 'model-selection',
    name: 'Model Complexity Routing',
    description: 'Route queries to appropriate model based on complexity and requirements',
    routes: [
      {
        id: 'fast-model',
        name: 'Fast Model (GPT-3.5)',
        description: 'Simple queries, low latency',
        icon: <Zap className="w-5 h-5" />,
        color: 'yellow'
      },
      {
        id: 'balanced-model',
        name: 'Balanced Model (GPT-4)',
        description: 'Moderate complexity, good accuracy',
        icon: <Brain className="w-5 h-5" />,
        color: 'blue'
      },
      {
        id: 'powerful-model',
        name: 'Powerful Model (GPT-4-Turbo)',
        description: 'Complex reasoning, high accuracy',
        icon: <Package className="w-5 h-5" />,
        color: 'purple'
      },
      {
        id: 'specialized-model',
        name: 'Specialized Model',
        description: 'Domain-specific tasks',
        icon: <Shield className="w-5 h-5" />,
        color: 'green'
      },
      {
        id: 'local-model',
        name: 'Local Model',
        description: 'Privacy-sensitive, offline capable',
        icon: <HelpCircle className="w-5 h-5" />,
        color: 'gray'
      }
    ],
    examples: [
      { id: 'q1', query: 'What is the capital of France?', category: 'simple', expectedRoute: 'fast-model', complexity: 'simple' },
      { id: 'q2', query: 'Explain quantum entanglement in simple terms', category: 'educational', expectedRoute: 'balanced-model', complexity: 'moderate' },
      { id: 'q3', query: 'Analyze this legal contract for potential issues', category: 'complex', expectedRoute: 'powerful-model', complexity: 'complex' },
      { id: 'q4', query: 'Process this confidential medical record', category: 'privacy', expectedRoute: 'local-model', complexity: 'moderate' },
      { id: 'q5', query: 'Generate a complex business strategy for market entry', category: 'complex', expectedRoute: 'powerful-model', complexity: 'complex' },
      { id: 'q6', query: 'Translate this technical document to Spanish', category: 'specialized', expectedRoute: 'specialized-model', complexity: 'moderate' }
    ]
  }
];

const simulateRoutingDecision = (query: string, scenario: RoutingScenario): RoutingDecision => {
  const example = scenario.examples.find(e => e.query === query);
  const processingTime = 0.5 + Math.random() * 1.5;
  
  if (example) {
    const mainRoute = scenario.routes.find(r => r.id === example.expectedRoute);
    const otherRoutes = scenario.routes.filter(r => r.id !== example.expectedRoute);
    
    const baseConfidence = example.complexity === 'simple' ? 0.85 : 
                          example.complexity === 'moderate' ? 0.70 : 0.60;
    const confidence = baseConfidence + (Math.random() * 0.15);
    
    const alternatives = otherRoutes.slice(0, 2).map(route => ({
      route: route.id,
      confidence: Math.random() * 0.3
    }));
    
    return {
      selectedRoute: example.expectedRoute,
      confidence: Math.min(confidence, 0.99),
      reasoning: `Query classified as ${example.category} based on key phrases and intent analysis. ${mainRoute?.name} is best equipped to handle this type of request.`,
      alternativeRoutes: alternatives,
      timestamp: new Date(),
      processingTime
    };
  }
  
  const randomRoute = scenario.routes[Math.floor(Math.random() * scenario.routes.length)];
  return {
    selectedRoute: randomRoute.id,
    confidence: 0.5 + Math.random() * 0.4,
    reasoning: 'Query analyzed using general classification model.',
    alternativeRoutes: [],
    timestamp: new Date(),
    processingTime
  };
};

export const LLMBasedRoutingFlowVisualization: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<RoutingScenario>(SCENARIOS[0]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [routingDecision, setRoutingDecision] = useState<RoutingDecision | null>(null);
  const [selectedExample, setSelectedExample] = useState<QueryExample | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [routingHistory, setRoutingHistory] = useState<Array<{ query: string; decision: RoutingDecision }>>([]);
  const [showConfidenceDetails, setShowConfidenceDetails] = useState(false);

  const resetVisualization = useCallback(() => {
    setCurrentQuery('');
    setRoutingDecision(null);
    setSelectedExample(null);
    setExecutionLog([]);
    setIsAnalyzing(false);
    setShowConfidenceDetails(false);
  }, []);

  const analyzeQuery = async () => {
    if (!currentQuery) return;
    
    setIsAnalyzing(true);
    setRoutingDecision(null);
    setExecutionLog(['🚀 Starting LLM routing analysis...']);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setExecutionLog(prev => [...prev, '📝 Extracting query features and intent...']);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setExecutionLog(prev => [...prev, '🧠 Analyzing with LLM classifier...']);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setExecutionLog(prev => [...prev, '🎯 Evaluating routing options...']);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const decision = simulateRoutingDecision(currentQuery, selectedScenario);
    setRoutingDecision(decision);
    
    const selectedRoute = selectedScenario.routes.find(r => r.id === decision.selectedRoute);
    setExecutionLog(prev => [...prev, 
      `✅ Routing decision: ${selectedRoute?.name} (${(decision.confidence * 100).toFixed(1)}% confidence)`,
      `⏱️ Processing time: ${decision.processingTime.toFixed(2)}s`
    ]);
    
    setRoutingHistory(prev => [...prev.slice(-4), { query: currentQuery, decision }]);
    setIsAnalyzing(false);
  };

  const selectExample = (example: QueryExample) => {
    setSelectedExample(example);
    setCurrentQuery(example.query);
    resetVisualization();
    setCurrentQuery(example.query);
  };

  const getRouteColor = (routeId: string) => {
    const route = selectedScenario.routes.find(r => r.id === routeId);
    const colors = {
      green: 'border-green-500 bg-green-900/20',
      blue: 'border-blue-500 bg-blue-900/20',
      purple: 'border-purple-500 bg-purple-900/20',
      red: 'border-red-500 bg-red-900/20',
      yellow: 'border-yellow-500 bg-yellow-900/20',
      pink: 'border-pink-500 bg-pink-900/20',
      gray: 'border-gray-500 bg-gray-900/20'
    };
    return colors[route?.color as keyof typeof colors] || colors.gray;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getComplexityBadge = (complexity: string) => {
    const badges = {
      simple: 'bg-green-900/40 border-green-500 text-green-400',
      moderate: 'bg-yellow-900/40 border-yellow-500 text-yellow-400',
      complex: 'bg-red-900/40 border-red-500 text-red-400'
    };
    return badges[complexity as keyof typeof badges] || badges.simple;
  };

  useEffect(() => {
    resetVisualization();
  }, [selectedScenario, resetVisualization]);

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🧭</span>
          LLM-Based Routing Flow Visualization
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how an LLM analyzes queries and makes intelligent routing decisions based on intent classification.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Routing Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isAnalyzing}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Query Input
            </label>
            <input
              type="text"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="Enter a query or select an example below..."
              disabled={isAnalyzing}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Example Queries */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Example Queries:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedScenario.examples.map((example) => (
              <button
                key={example.id}
                onClick={() => selectExample(example)}
                disabled={isAnalyzing}
                className={`text-left p-3 rounded-lg border transition-all ${
                  selectedExample?.id === example.id
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-gray-600 bg-gray-800/30 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-200 flex-1">{example.query}</p>
                  <span className={`text-xs px-2 py-1 rounded border ml-2 ${getComplexityBadge(example.complexity)}`}>
                    {example.complexity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={analyzeQuery}
            disabled={isAnalyzing || !currentQuery}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
              isAnalyzing || !currentQuery
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAnalyzing ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Query'}
          </button>
          
          <button
            onClick={resetVisualization}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>

          <button
            onClick={() => setShowConfidenceDetails(!showConfidenceDetails)}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <Brain className="w-4 h-4 mr-2" />
            {showConfidenceDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Flow Visualization */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Routing Decision Flow</h3>
          
          {/* Query Analysis Step */}
          <div className="mb-6">
            <div className={`p-4 rounded-lg border transition-all ${
              isAnalyzing ? 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20' : 
              currentQuery ? 'border-gray-500 bg-gray-800/30' : 'border-gray-600 bg-gray-800/20'
            }`}>
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-blue-400 mr-2" />
                <h4 className="font-medium text-white">Query Analysis</h4>
              </div>
              <div className="text-sm text-gray-300">
                {currentQuery || 'Enter a query to begin analysis...'}
              </div>
              {isAnalyzing && (
                <div className="mt-3 flex items-center text-blue-400 text-sm">
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  LLM analyzing intent and features...
                </div>
              )}
            </div>
          </div>

          {/* Routing Decision Arrow */}
          {(routingDecision || isAnalyzing) && (
            <div className="flex justify-center mb-4">
              <GitBranch className="w-8 h-8 text-gray-500" />
            </div>
          )}

          {/* Available Routes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedScenario.routes.map((route) => {
              const isSelected = routingDecision?.selectedRoute === route.id;
              const alternativeConfidence = routingDecision?.alternativeRoutes.find(
                a => a.route === route.id
              )?.confidence;
              
              return (
                <div
                  key={route.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected 
                      ? `${getRouteColor(route.id)} shadow-lg` 
                      : 'border-gray-600 bg-gray-800/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      {route.icon}
                      <h4 className="font-medium text-white ml-2">{route.name}</h4>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{route.description}</p>
                  
                  {/* Confidence Score */}
                  {routingDecision && (isSelected || (alternativeConfidence && showConfidenceDetails)) && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Confidence:</span>
                        <span className={`text-sm font-medium ${
                          getConfidenceColor(isSelected ? routingDecision.confidence : alternativeConfidence!)
                        }`}>
                          {((isSelected ? routingDecision.confidence : alternativeConfidence!) * 100).toFixed(1)}%
                        </span>
                      </div>
                      {isSelected && (
                        <div className="mt-1">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                routingDecision.confidence >= 0.8 ? 'bg-green-500' :
                                routingDecision.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${routingDecision.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Routing Decision Details */}
          {routingDecision && (
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600">
              <h4 className="font-medium text-white mb-3 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                Routing Decision Analysis
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-400">Reasoning:</span>
                  <p className="text-sm text-gray-200 mt-1">{routingDecision.reasoning}</p>
                </div>
                
                {showConfidenceDetails && routingDecision.alternativeRoutes.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-400">Alternative Routes Considered:</span>
                    <div className="mt-2 space-y-1">
                      {routingDecision.alternativeRoutes.map((alt) => {
                        const route = selectedScenario.routes.find(r => r.id === alt.route);
                        return (
                          <div key={alt.route} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{route?.name}</span>
                            <span className={`${getConfidenceColor(alt.confidence)}`}>
                              {(alt.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Processing Time:</span>
                  <span className="text-gray-200">{routingDecision.processingTime.toFixed(2)}s</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Execution Log & History */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto mb-6">
            {executionLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                Execution log will appear here...
              </div>
            ) : (
              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="text-sm font-mono">
                    <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                    <span className="text-gray-300 ml-2">{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Routing History */}
          {routingHistory.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-white mb-4">Recent Routing History</h3>
              <div className="space-y-2">
                {routingHistory.map((item, index) => {
                  const route = selectedScenario.routes.find(r => r.id === item.decision.selectedRoute);
                  return (
                    <div key={index} className="p-3 bg-gray-800/20 rounded-lg border border-gray-600/50">
                      <p className="text-xs text-gray-400 mb-1">
                        {item.query.substring(0, 50)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">{route?.name}</span>
                        <span className={`text-sm ${getConfidenceColor(item.decision.confidence)}`}>
                          {(item.decision.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Scenario Info */}
          <div className="mt-6 p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-white mb-2">About This Scenario</h4>
            <p className="text-sm text-gray-300">{selectedScenario.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMBasedRoutingFlowVisualization;