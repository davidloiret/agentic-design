'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, CheckCircle, AlertCircle, Clock, Database, Cloud, Search, Calendar, Calculator, Mail, TrendingUp, Shield, Settings, Activity } from 'lucide-react';

interface FunctionCall {
  id: string;
  name: string;
  parameters: Record<string, any>;
  status: 'pending' | 'validating' | 'executing' | 'completed' | 'failed';
  result?: any;
  executionTime?: number;
  startTime?: number;
}

interface ToolSession {
  id: string;
  scenario: string;
  query: string;
  functions: FunctionCall[];
  status: 'analyzing' | 'planning' | 'executing' | 'synthesizing' | 'complete';
  overallResult?: string;
  executionTime?: number;
  startTime?: number;
}

interface ScenarioConfig {
  name: string;
  description: string;
  query: string;
  availableFunctions: {
    name: string;
    description: string;
    parameters: Record<string, any>;
    icon: any;
    mockDelay: number;
    mockResult: any;
  }[];
  expectedFunctions: string[];
}

const scenarios: ScenarioConfig[] = [
  {
    name: 'Personal Assistant',
    description: 'Multi-function personal assistance with weather, calendar, and email',
    query: 'What\'s the weather in San Francisco today and can you schedule a meeting with John at 3 PM tomorrow?',
    availableFunctions: [
      {
        name: 'get_weather',
        description: 'Get current weather conditions for a location',
        parameters: { location: 'string', units: 'string' },
        icon: Cloud,
        mockDelay: 1200,
        mockResult: { temperature: 72, condition: 'sunny', humidity: 45, wind: '5 mph' }
      },
      {
        name: 'schedule_meeting',
        description: 'Schedule a calendar meeting with attendees',
        parameters: { title: 'string', attendees: 'array', datetime: 'string', duration: 'number' },
        icon: Calendar,
        mockDelay: 1800,
        mockResult: { meeting_id: 'mtg_789', status: 'scheduled', link: 'https://meet.example.com/abc123' }
      },
      {
        name: 'send_email',
        description: 'Send an email to recipients',
        parameters: { to: 'array', subject: 'string', body: 'string' },
        icon: Mail,
        mockDelay: 900,
        mockResult: { message_id: 'msg_456', status: 'sent' }
      }
    ],
    expectedFunctions: ['get_weather', 'schedule_meeting']
  },
  {
    name: 'Data Analysis',
    description: 'Research and analysis with web search and calculations',
    query: 'Find the latest stock price for Apple and calculate the percentage change from last month',
    availableFunctions: [
      {
        name: 'web_search',
        description: 'Search the web for current information',
        parameters: { query: 'string', limit: 'number' },
        icon: Search,
        mockDelay: 2000,
        mockResult: { results: [{ title: 'Apple Stock Price', price: '$185.42', change: '+2.3%' }] }
      },
      {
        name: 'calculate',
        description: 'Perform mathematical calculations',
        parameters: { expression: 'string', precision: 'number' },
        icon: Calculator,
        mockDelay: 500,
        mockResult: { result: 3.74, expression: '((185.42 - 178.91) / 178.91) * 100' }
      },
      {
        name: 'get_stock_data',
        description: 'Retrieve historical stock data',
        parameters: { symbol: 'string', period: 'string' },
        icon: TrendingUp,
        mockDelay: 1500,
        mockResult: { symbol: 'AAPL', current: 185.42, previous_month: 178.91, change: 6.51 }
      }
    ],
    expectedFunctions: ['web_search', 'get_stock_data', 'calculate']
  },
  {
    name: 'System Administration',
    description: 'Server monitoring and database operations',
    query: 'Check server status, query user count from database, and send alert if usage is high',
    availableFunctions: [
      {
        name: 'check_server_status',
        description: 'Monitor server health and performance',
        parameters: { server_id: 'string', metrics: 'array' },
        icon: Activity,
        mockDelay: 1000,
        mockResult: { status: 'healthy', cpu: 78, memory: 65, disk: 34, uptime: '15 days' }
      },
      {
        name: 'database_query',
        description: 'Execute SQL queries on the database',
        parameters: { query: 'string', database: 'string' },
        icon: Database,
        mockDelay: 800,
        mockResult: { rows: [{ active_users: 2847, total_sessions: 15234 }] }
      },
      {
        name: 'send_alert',
        description: 'Send system alerts to administrators',
        parameters: { level: 'string', message: 'string', recipients: 'array' },
        icon: AlertCircle,
        mockDelay: 600,
        mockResult: { alert_id: 'alert_321', status: 'sent', recipients: 3 }
      }
    ],
    expectedFunctions: ['check_server_status', 'database_query']
  },
  {
    name: 'E-commerce Integration',
    description: 'Product search, inventory check, and order processing',
    query: 'Search for wireless headphones under $200, check inventory, and process an order',
    availableFunctions: [
      {
        name: 'search_products',
        description: 'Search product catalog with filters',
        parameters: { query: 'string', max_price: 'number', category: 'string' },
        icon: Search,
        mockDelay: 1400,
        mockResult: { products: [{ id: 'prod_123', name: 'Sony WH-1000XM4', price: 179.99, stock: 15 }] }
      },
      {
        name: 'check_inventory',
        description: 'Check product availability and stock levels',
        parameters: { product_id: 'string', location: 'string' },
        icon: Database,
        mockDelay: 700,
        mockResult: { product_id: 'prod_123', available: true, stock: 15, warehouse: 'West Coast' }
      },
      {
        name: 'process_order',
        description: 'Create and process customer orders',
        parameters: { product_id: 'string', quantity: 'number', customer_id: 'string' },
        icon: CheckCircle,
        mockDelay: 2200,
        mockResult: { order_id: 'ord_789', status: 'confirmed', estimated_delivery: '3-5 days' }
      },
      {
        name: 'calculate_shipping',
        description: 'Calculate shipping costs and delivery estimates',
        parameters: { destination: 'string', weight: 'number', method: 'string' },
        icon: Calculator,
        mockDelay: 400,
        mockResult: { cost: 12.99, method: 'standard', delivery_days: 4 }
      }
    ],
    expectedFunctions: ['search_products', 'check_inventory', 'process_order']
  }
];

const ToolUseDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<ToolSession | null>(null);
  const [executionHistory, setExecutionHistory] = useState<ToolSession[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const scenario = scenarios[selectedScenario];

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentSession(null);
    setExecutionHistory([]);
    setLogs([]);
  };

  const simulateFunctionCall = async (funcDef: any, parameters: Record<string, any>): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, funcDef.mockDelay));
    return funcDef.mockResult;
  };

  const runToolUseDemo = async () => {
    setIsRunning(true);
    const startTime = Date.now();
    
    addLog(`Started tool use session: ${scenario.name}`);
    addLog(`User query: "${scenario.query}"`);

    // Create initial session
    const session: ToolSession = {
      id: `session-${Date.now()}`,
      scenario: scenario.name,
      query: scenario.query,
      functions: [],
      status: 'analyzing',
      startTime
    };

    setCurrentSession(session);

    // Analysis phase
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('Analyzing user intent and identifying required functions...');
    
    // Planning phase
    session.status = 'planning';
    setCurrentSession({...session});
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Identify and prepare function calls
    const selectedFunctions = scenario.availableFunctions.filter(func => 
      scenario.expectedFunctions.includes(func.name)
    );
    
    const functionCalls: FunctionCall[] = selectedFunctions.map(func => {
      let parameters: Record<string, any> = {};
      
      // Generate realistic parameters based on function and query
      if (func.name === 'get_weather') {
        parameters = { location: 'San Francisco', units: 'fahrenheit' };
      } else if (func.name === 'schedule_meeting') {
        parameters = { 
          title: 'Meeting with John', 
          attendees: ['john@example.com'], 
          datetime: '2024-01-16T15:00:00Z',
          duration: 60
        };
      } else if (func.name === 'web_search') {
        parameters = { query: 'Apple AAPL stock price current', limit: 5 };
      } else if (func.name === 'get_stock_data') {
        parameters = { symbol: 'AAPL', period: '1month' };
      } else if (func.name === 'calculate') {
        parameters = { expression: '((185.42 - 178.91) / 178.91) * 100', precision: 2 };
      } else if (func.name === 'check_server_status') {
        parameters = { server_id: 'prod-server-01', metrics: ['cpu', 'memory', 'disk'] };
      } else if (func.name === 'database_query') {
        parameters = { query: 'SELECT COUNT(*) as active_users FROM sessions WHERE status = "active"', database: 'main' };
      } else if (func.name === 'search_products') {
        parameters = { query: 'wireless headphones', max_price: 200, category: 'electronics' };
      } else if (func.name === 'check_inventory') {
        parameters = { product_id: 'prod_123', location: 'warehouse' };
      } else if (func.name === 'process_order') {
        parameters = { product_id: 'prod_123', quantity: 1, customer_id: 'cust_456' };
      }

      return {
        id: `call-${func.name}-${Date.now()}`,
        name: func.name,
        parameters,
        status: 'pending' as const
      };
    });

    session.functions = functionCalls;
    session.status = 'executing';
    setCurrentSession({...session});

    addLog(`Identified ${functionCalls.length} functions to execute`);
    functionCalls.forEach(call => {
      addLog(`Planned: ${call.name}(${Object.keys(call.parameters).join(', ')})`);
    });

    // Execute functions
    for (const functionCall of session.functions) {
      functionCall.status = 'validating';
      functionCall.startTime = Date.now();
      setCurrentSession({...session});
      
      addLog(`Validating parameters for ${functionCall.name}...`);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      functionCall.status = 'executing';
      setCurrentSession({...session});
      
      addLog(`Executing ${functionCall.name}...`);
      
      try {
        const funcDef = scenario.availableFunctions.find(f => f.name === functionCall.name);
        if (funcDef) {
          const result = await simulateFunctionCall(funcDef, functionCall.parameters);
          functionCall.result = result;
          functionCall.status = 'completed';
          functionCall.executionTime = Date.now() - (functionCall.startTime || 0);
          
          addLog(`${functionCall.name} completed in ${functionCall.executionTime}ms`);
          addLog(`Result: ${JSON.stringify(result).substring(0, 100)}...`);
        }
      } catch (error) {
        functionCall.status = 'failed';
        addLog(`${functionCall.name} failed: ${error}`);
      }
      
      setCurrentSession({...session});
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Synthesis phase
    session.status = 'synthesizing';
    setCurrentSession({...session});
    addLog('Synthesizing results into final response...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate final result
    const completedFunctions = session.functions.filter(f => f.status === 'completed');
    let overallResult = '';
    
    if (scenario.name === 'Personal Assistant') {
      const weather = completedFunctions.find(f => f.name === 'get_weather')?.result;
      const meeting = completedFunctions.find(f => f.name === 'schedule_meeting')?.result;
      
      overallResult = `The weather in San Francisco today is ${weather?.temperature}°F and ${weather?.condition}. I've scheduled your meeting with John for tomorrow at 3 PM (Meeting ID: ${meeting?.meeting_id}).`;
    } else if (scenario.name === 'Data Analysis') {
      const search = completedFunctions.find(f => f.name === 'web_search')?.result;
      const stockData = completedFunctions.find(f => f.name === 'get_stock_data')?.result;
      const calculation = completedFunctions.find(f => f.name === 'calculate')?.result;
      
      overallResult = `Apple's current stock price is $${stockData?.current}. Compared to last month ($${stockData?.previous_month}), this represents a ${calculation?.result}% increase.`;
    } else if (scenario.name === 'System Administration') {
      const server = completedFunctions.find(f => f.name === 'check_server_status')?.result;
      const db = completedFunctions.find(f => f.name === 'database_query')?.result;
      
      overallResult = `Server status: ${server?.status} (CPU: ${server?.cpu}%, Memory: ${server?.memory}%). Current active users: ${db?.rows?.[0]?.active_users}. System is running normally.`;
    } else if (scenario.name === 'E-commerce Integration') {
      const products = completedFunctions.find(f => f.name === 'search_products')?.result;
      const inventory = completedFunctions.find(f => f.name === 'check_inventory')?.result;
      const order = completedFunctions.find(f => f.name === 'process_order')?.result;
      
      overallResult = `Found ${products?.products?.[0]?.name} for $${products?.products?.[0]?.price} (${inventory?.stock} in stock). Order processed successfully (Order ID: ${order?.order_id}, delivery in ${order?.estimated_delivery}).`;
    }

    session.overallResult = overallResult;
    session.status = 'complete';
    session.executionTime = Date.now() - startTime;
    
    setCurrentSession({...session});
    setExecutionHistory(prev => [...prev, session]);
    
    addLog(`Tool use session completed in ${session.executionTime}ms`);
    addLog(`Final result: ${overallResult.substring(0, 100)}...`);
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'validating': return <Shield className="w-4 h-4 text-yellow-400 animate-pulse" />;
      case 'executing': return <Zap className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-gray-500 bg-gray-900/30';
      case 'validating': return 'border-yellow-500 bg-yellow-900/30';
      case 'executing': return 'border-blue-500 bg-blue-900/30';
      case 'completed': return 'border-green-500 bg-green-900/30';
      case 'failed': return 'border-red-500 bg-red-900/30';
      default: return 'border-gray-500 bg-gray-900/30';
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Function Calling / Tool Use Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate structured AI-tool interaction with parameter validation and execution
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={runToolUseDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Execute Functions'}
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
          Select Use Case:
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
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="font-medium mb-1">{scenario.name}</div>
              <div className="text-xs text-gray-400 mb-2">{scenario.description}</div>
              <div className="text-xs text-gray-500">
                Functions: {scenario.expectedFunctions.length} • Available: {scenario.availableFunctions.length}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-400">Scenario</div>
            <div className="text-white font-medium">{scenario.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Available Functions</div>
            <div className="text-white">{scenario.availableFunctions.length} tools</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Session Status</div>
            <div className="text-white capitalize">{currentSession?.status || 'Ready'}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-400 mb-2">User Query:</div>
          <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">
            "{scenario.query}"
          </div>
        </div>
      </div>

      {/* Available Functions */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Available Functions
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenario.availableFunctions.map((func, index) => {
            const Icon = func.icon;
            const isExpected = scenario.expectedFunctions.includes(func.name);
            
            return (
              <div
                key={func.name}
                className={`p-3 rounded-lg border transition-all ${
                  isExpected 
                    ? 'border-purple-500 bg-purple-900/20' 
                    : 'border-gray-600 bg-gray-800/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${isExpected ? 'text-purple-400' : 'text-gray-400'}`} />
                  <span className="font-medium text-white">{func.name}</span>
                  {isExpected && (
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                      Expected
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-2">{func.description}</div>
                <div className="text-xs text-gray-500">
                  Parameters: {Object.keys(func.parameters).join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Session Display */}
      {currentSession && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Function Execution Status
          </h4>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentSession.functions.length}</div>
                  <div className="text-sm text-gray-400">Functions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {currentSession.functions.filter(f => f.status === 'completed').length}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {currentSession.executionTime ? `${currentSession.executionTime}ms` : '--'}
                  </div>
                  <div className="text-sm text-gray-400">Total Time</div>
                </div>
              </div>
              <div className="text-sm text-gray-300 capitalize">
                Status: {currentSession.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSession.functions.map((functionCall) => {
                const funcDef = scenario.availableFunctions.find(f => f.name === functionCall.name);
                const Icon = funcDef?.icon || Settings;
                
                return (
                  <div
                    key={functionCall.id}
                    className={`p-3 rounded-lg border-2 transition-all ${getStatusColor(functionCall.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(functionCall.status)}
                        <span className="font-medium text-white">{functionCall.name}</span>
                      </div>
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-2">
                      {functionCall.executionTime ? `${functionCall.executionTime}ms` : 'Pending'}
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-2">
                      <strong>Parameters:</strong>
                      <div className="mt-1 font-mono bg-gray-900/50 p-2 rounded">
                        {JSON.stringify(functionCall.parameters, null, 2)}
                      </div>
                    </div>
                    
                    {functionCall.result && (
                      <div className="text-xs text-gray-300">
                        <strong>Result:</strong>
                        <div className="mt-1 font-mono bg-gray-900/50 p-2 rounded">
                          {JSON.stringify(functionCall.result, null, 2)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Result */}
          {currentSession.overallResult && (
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30">
              <h5 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Final Response
              </h5>
              <p className="text-gray-300">{currentSession.overallResult}</p>
            </div>
          )}
        </div>
      )}

      {/* Execution History */}
      {executionHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Execution History
          </h4>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <div className="space-y-3">
              {executionHistory.map((session, index) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{session.scenario}</div>
                    <div className="text-sm text-gray-400">
                      {session.functions.length} functions • {session.functions.filter(f => f.status === 'completed').length} successful
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">{session.executionTime}ms</div>
                    <div className="text-xs text-gray-500">
                      {new Date(session.startTime || 0).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Execution Logs */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5" />
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
                <Zap className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Click "Execute Functions" to begin tool use demonstration</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolUseDemo;