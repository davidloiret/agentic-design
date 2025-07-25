'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Code, CheckCircle, AlertCircle, Clock, Terminal, Shield, Cpu, MemoryStick, HardDrive, Activity, FileCode, Zap, Settings, AlertTriangle, TrendingUp } from 'lucide-react';

interface ExecutionEnvironment {
  id: string;
  name: string;
  language: string;
  version: string;
  status: 'idle' | 'preparing' | 'executing' | 'completed' | 'error';
  libraries: string[];
  icon: any;
  color: string;
}

interface ResourceUsage {
  cpu: number;
  memory: number;
  disk: number;
  executionTime: number;
  processCount: number;
}

interface CodeExecution {
  id: string;
  scenario: string;
  userRequest: string;
  generatedCode: string;
  language: string;
  status: 'analyzing' | 'generating' | 'validating' | 'executing' | 'processing' | 'complete' | 'error';
  output?: string;
  error?: string;
  resources?: ResourceUsage;
  securityChecks?: {
    codeInjection: boolean;
    maliciousPatterns: boolean;
    safeImports: boolean;
    systemCalls: boolean;
  };
  executionTime?: number;
  startTime?: number;
}

interface ScenarioConfig {
  name: string;
  description: string;
  userRequest: string;
  expectedLanguage: string;
  codeTemplate: string;
  expectedOutput: string;
  libraries: string[];
  complexity: 'low' | 'medium' | 'high';
}

const environments: ExecutionEnvironment[] = [
  {
    id: 'python',
    name: 'Python Environment',
    language: 'Python',
    version: '3.11.7',
    status: 'idle',
    libraries: ['numpy', 'pandas', 'matplotlib', 'scipy'],
    icon: FileCode,
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'javascript',
    name: 'JavaScript Environment', 
    language: 'JavaScript',
    version: 'Node.js 18.19',
    status: 'idle',
    libraries: ['lodash', 'moment', 'axios', 'express'],
    icon: Terminal,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'r',
    name: 'R Environment',
    language: 'R',
    version: '4.3.2',
    status: 'idle',
    libraries: ['tidyverse', 'ggplot2', 'dplyr', 'caret'],
    icon: Activity,
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'sql',
    name: 'SQL Environment',
    language: 'SQL',
    version: 'SQLite 3.44',
    status: 'idle',
    libraries: ['json1', 'fts5', 'rtree', 'geopoly'],
    icon: HardDrive,
    color: 'from-purple-500 to-pink-500'
  }
];

const scenarios: ScenarioConfig[] = [
  {
    name: 'Data Analysis',
    description: 'Statistical analysis and portfolio variance calculation',
    userRequest: 'Calculate portfolio variance for stocks: AAPL (12%), GOOGL (8%), MSFT (15%)',
    expectedLanguage: 'Python',
    codeTemplate: `import numpy as np

# Stock returns as percentages
stocks = [0.12, 0.08, 0.15]  # AAPL, GOOGL, MSFT

# Calculate variance
variance = np.var(stocks)

# Display result
print(f"Portfolio variance: {variance:.4f} ({variance*100:.2f}%)")
print(f"Standard deviation: {np.sqrt(variance):.4f}")`,
    expectedOutput: 'Portfolio variance: 0.0009 (0.09%)\nStandard deviation: 0.0300',
    libraries: ['numpy'],
    complexity: 'medium'
  },
  {
    name: 'Algorithm Implementation',
    description: 'Sorting algorithm with performance analysis',
    userRequest: 'Implement quicksort algorithm and analyze its performance on random data',
    expectedLanguage: 'Python',
    codeTemplate: `import random
import time

def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Generate random data
data = [random.randint(1, 1000) for _ in range(100)]
print(f"Original size: {len(data)} elements")

# Measure sorting time
start_time = time.time()
sorted_data = quicksort(data.copy())
end_time = time.time()

print(f"Sorted in {(end_time - start_time)*1000:.2f}ms")
print(f"First 10 elements: {sorted_data[:10]}")`,
    expectedOutput: 'Original size: 100 elements\nSorted in 2.34ms\nFirst 10 elements: [1, 7, 12, 23, 29, 34, 41, 56, 67, 78]',
    libraries: ['random', 'time'],
    complexity: 'medium'
  },
  {
    name: 'Web Scraping',
    description: 'Data extraction and processing from web sources',
    userRequest: 'Create a web scraping script to extract and analyze product prices',
    expectedLanguage: 'JavaScript',
    codeTemplate: `// Simulated web scraping (actual HTTP requests disabled in sandbox)
const products = [
  { name: 'Laptop', price: 899.99, category: 'Electronics' },
  { name: 'Phone', price: 599.99, category: 'Electronics' },
  { name: 'Tablet', price: 399.99, category: 'Electronics' },
  { name: 'Headphones', price: 199.99, category: 'Audio' }
];

// Price analysis
const totalValue = products.reduce((sum, product) => sum + product.price, 0);
const avgPrice = totalValue / products.length;
const maxPrice = Math.max(...products.map(p => p.price));
const minPrice = Math.min(...products.map(p => p.price));

console.log(\`Products analyzed: \${products.length}\`);
console.log(\`Total value: $\${totalValue.toFixed(2)}\`);
console.log(\`Average price: $\${avgPrice.toFixed(2)}\`);
console.log(\`Price range: $\${minPrice} - $\${maxPrice}\`);

// Category breakdown
const categories = [...new Set(products.map(p => p.category))];
console.log(\`Categories: \${categories.join(', ')}\`);`,
    expectedOutput: 'Products analyzed: 4\nTotal value: $2099.96\nAverage price: $524.99\nPrice range: $199.99 - $899.99\nCategories: Electronics, Audio',
    libraries: ['axios', 'cheerio'],
    complexity: 'high'
  },
  {
    name: 'Database Query',
    description: 'SQL data analysis and reporting',
    userRequest: 'Analyze sales data and generate summary report with top products',
    expectedLanguage: 'SQL',
    codeTemplate: `-- Create sample sales data
CREATE TEMP TABLE sales (
    id INTEGER PRIMARY KEY,
    product_name TEXT,
    category TEXT,
    price DECIMAL(10,2),
    quantity INTEGER,
    sale_date DATE
);

INSERT INTO sales VALUES
(1, 'Laptop Pro', 'Electronics', 1299.99, 25, '2024-01-15'),
(2, 'Wireless Mouse', 'Accessories', 29.99, 150, '2024-01-15'),
(3, 'USB Cable', 'Accessories', 12.99, 200, '2024-01-15'),
(4, 'Monitor', 'Electronics', 399.99, 45, '2024-01-15');

-- Sales analysis query
SELECT 
    category,
    COUNT(*) as product_count,
    SUM(quantity) as total_units,
    SUM(price * quantity) as total_revenue,
    AVG(price) as avg_price
FROM sales 
GROUP BY category 
ORDER BY total_revenue DESC;`,
    expectedOutput: 'Electronics: 2 products, 70 units, $50,497.75 revenue, $849.99 avg price\nAccessories: 2 products, 350 units, $7,095.50 revenue, $21.49 avg price',
    libraries: ['sqlite3'],
    complexity: 'medium'
  },
  {
    name: 'Machine Learning',
    description: 'Simple ML model training and prediction',
    userRequest: 'Train a linear regression model to predict house prices based on size',
    expectedLanguage: 'R',
    codeTemplate: `# Sample house data
house_data <- data.frame(
  size = c(1200, 1500, 1800, 2000, 2200, 2500, 2800),
  price = c(180000, 220000, 280000, 320000, 360000, 420000, 480000)
)

# Train linear regression model
model <- lm(price ~ size, data = house_data)

# Model summary
cat("Model Coefficients:\\n")
cat(sprintf("Intercept: $%.2f\\n", coef(model)[1]))
cat(sprintf("Price per sq ft: $%.2f\\n", coef(model)[2]))

# Prediction for new house
new_size <- 2100
predicted_price <- predict(model, data.frame(size = new_size))
cat(sprintf("\\nPredicted price for %d sq ft house: $%.2f\\n", 
           new_size, predicted_price))

# Model fit
r_squared <- summary(model)$r.squared
cat(sprintf("R-squared: %.3f\\n", r_squared))`,
    expectedOutput: 'Model Coefficients:\nIntercept: $-12000.00\nPrice per sq ft: $175.71\n\nPredicted price for 2100 sq ft house: $356,991.43\nR-squared: 0.995',
    libraries: ['stats'],
    complexity: 'high'
  }
];

const CodeExecutionDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentExecution, setCurrentExecution] = useState<CodeExecution | null>(null);
  const [executionHistory, setExecutionHistory] = useState<CodeExecution[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('python');

  const scenario = scenarios[selectedScenario];
  const environment = environments.find(env => env.id === selectedEnvironment) || environments[0];

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentExecution(null);
    setExecutionHistory([]);
    setLogs([]);
    environments.forEach(env => env.status = 'idle');
  };

  const simulateCodeExecution = async () => {
    setIsRunning(true);
    const startTime = Date.now();
    
    addLog(`Starting code execution: ${scenario.name}`);
    addLog(`User request: "${scenario.userRequest}"`);

    // Create execution session
    const execution: CodeExecution = {
      id: `exec-${Date.now()}`,
      scenario: scenario.name,
      userRequest: scenario.userRequest,
      generatedCode: '',
      language: scenario.expectedLanguage,
      status: 'analyzing',
      startTime
    };

    setCurrentExecution(execution);

    // Analysis phase
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('Analyzing request and determining computational requirements...');
    
    // Code generation phase
    execution.status = 'generating';
    setCurrentExecution({...execution});
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    execution.generatedCode = scenario.codeTemplate;
    addLog(`Generated ${scenario.expectedLanguage} code (${scenario.codeTemplate.split('\n').length} lines)`);
    
    // Validation phase
    execution.status = 'validating';
    setCurrentExecution({...execution});
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Security checks
    execution.securityChecks = {
      codeInjection: true,
      maliciousPatterns: true,
      safeImports: true,
      systemCalls: true
    };
    
    addLog('Security validation passed - code approved for execution');
    addLog(`Selected environment: ${scenario.expectedLanguage} ${environment.version}`);

    // Environment preparation
    const selectedEnv = environments.find(env => env.language === scenario.expectedLanguage);
    if (selectedEnv) {
      selectedEnv.status = 'preparing';
      await new Promise(resolve => setTimeout(resolve, 600));
      addLog(`Environment prepared: ${selectedEnv.name}`);
    }

    // Execution phase
    execution.status = 'executing';
    setCurrentExecution({...execution});
    if (selectedEnv) selectedEnv.status = 'executing';
    
    addLog('Code execution started in sandboxed environment...');
    
    // Simulate resource usage during execution
    const executionTime = 800 + Math.random() * 1200; // 0.8-2.0 seconds
    const intervals = 10;
    const intervalTime = executionTime / intervals;
    
    for (let i = 0; i < intervals; i++) {
      await new Promise(resolve => setTimeout(resolve, intervalTime));
      
      const progress = (i + 1) / intervals;
      execution.resources = {
        cpu: Math.round(10 + progress * 60 + Math.random() * 20),
        memory: Math.round(20 + progress * 40 + Math.random() * 15),
        disk: Math.round(5 + progress * 15),
        executionTime: Math.round((Date.now() - startTime) / 1000 * 100) / 100,
        processCount: 1
      };
      
      setCurrentExecution({...execution});
      
      if (i === Math.floor(intervals / 2)) {
        addLog(`Execution progress: ${Math.round(progress * 100)}% - Resource usage within limits`);
      }
    }

    // Processing phase
    execution.status = 'processing';
    setCurrentExecution({...execution});
    if (selectedEnv) selectedEnv.status = 'completed';
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic output
    execution.output = scenario.expectedOutput;
    execution.executionTime = Math.round((Date.now() - startTime) / 1000 * 100) / 100;
    
    addLog(`Code executed successfully in ${execution.executionTime}s`);
    addLog('Processing output and formatting results...');
    
    // Completion
    execution.status = 'complete';
    setCurrentExecution({...execution});
    setExecutionHistory(prev => [...prev, execution]);
    
    addLog(`Execution complete: ${scenario.name}`);
    addLog(`Final output: ${execution.output?.substring(0, 50)}...`);
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />;
      case 'generating': return <Code className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'validating': return <Shield className="w-4 h-4 text-purple-400 animate-pulse" />;
      case 'executing': return <Zap className="w-4 h-4 text-green-400 animate-pulse" />;
      case 'processing': return <Settings className="w-4 h-4 text-orange-400 animate-pulse" />;
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing': return 'border-yellow-500 bg-yellow-900/30';
      case 'generating': return 'border-blue-500 bg-blue-900/30';
      case 'validating': return 'border-purple-500 bg-purple-900/30';
      case 'executing': return 'border-green-500 bg-green-900/30';
      case 'processing': return 'border-orange-500 bg-orange-900/30';
      case 'complete': return 'border-green-500 bg-green-900/30';
      case 'error': return 'border-red-500 bg-red-900/30';
      default: return 'border-gray-500 bg-gray-900/30';
    }
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Code Execution Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate secure code generation, validation, and execution in sandboxed environments
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={simulateCodeExecution}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Executing...' : 'Execute Code'}
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
          Select Code Execution Scenario:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {scenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedScenario(index);
                resetDemo();
              }}
              className={`p-3 rounded-lg text-left transition-colors border ${
                selectedScenario === index
                  ? 'bg-green-600/20 border-green-500 text-green-300'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="font-medium mb-1">{scenario.name}</div>
              <div className="text-xs text-gray-400 mb-2">{scenario.description}</div>
              <div className="text-xs text-gray-500">
                Language: {scenario.expectedLanguage} • Complexity: {scenario.complexity}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario Info */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-400">Scenario</div>
            <div className="text-white font-medium">{scenario.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Language</div>
            <div className="text-white">{scenario.expectedLanguage}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Complexity</div>
            <div className="text-white capitalize">{scenario.complexity}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Status</div>
            <div className="text-white capitalize">{currentExecution?.status || 'Ready'}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-400 mb-2">User Request:</div>
          <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">
            "{scenario.userRequest}"
          </div>
        </div>
      </div>

      {/* Execution Environments */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Available Execution Environments
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {environments.map((env) => {
            const Icon = env.icon;
            const isSelected = env.language === scenario.expectedLanguage;
            
            return (
              <div
                key={env.id}
                className={`p-3 rounded-lg border transition-all ${
                  isSelected 
                    ? 'border-green-500 bg-green-900/20' 
                    : env.status === 'idle'
                    ? 'border-gray-600 bg-gray-800/30'
                    : env.status === 'preparing'
                    ? 'border-yellow-500 bg-yellow-900/20'
                    : env.status === 'executing'
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-green-500 bg-green-900/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="font-medium text-white">{env.language}</span>
                  {isSelected && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mb-1">{env.version}</div>
                <div className="text-xs text-gray-500">
                  Status: <span className="capitalize">{env.status}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Libraries: {env.libraries.slice(0, 2).join(', ')}...
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Execution Status */}
      {currentExecution && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Execution Status
          </h4>
          
          <div className={`bg-gray-800/30 rounded-lg border-2 transition-all p-4 ${getStatusColor(currentExecution.status)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(currentExecution.status)}
                <span className="font-medium text-white capitalize">{currentExecution.status}</span>
              </div>
              <div className="text-sm text-gray-300">
                {currentExecution.executionTime ? `${currentExecution.executionTime}s` : 'In progress...'}
              </div>
            </div>

            {/* Resource Usage */}
            {currentExecution.resources && (
              <div className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <Cpu className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                  <div className="text-sm font-bold text-white">{currentExecution.resources.cpu}%</div>
                  <div className="text-xs text-gray-400">CPU</div>
                </div>
                <div className="text-center">
                  <MemoryStick className="w-4 h-4 mx-auto text-green-400 mb-1" />
                  <div className="text-sm font-bold text-white">{currentExecution.resources.memory}MB</div>
                  <div className="text-xs text-gray-400">Memory</div>
                </div>
                <div className="text-center">
                  <HardDrive className="w-4 h-4 mx-auto text-purple-400 mb-1" />
                  <div className="text-sm font-bold text-white">{currentExecution.resources.disk}MB</div>
                  <div className="text-xs text-gray-400">Disk</div>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 mx-auto text-orange-400 mb-1" />
                  <div className="text-sm font-bold text-white">{currentExecution.resources.executionTime}s</div>
                  <div className="text-xs text-gray-400">Runtime</div>
                </div>
                <div className="text-center">
                  <Activity className="w-4 h-4 mx-auto text-red-400 mb-1" />
                  <div className="text-sm font-bold text-white">{currentExecution.resources.processCount}</div>
                  <div className="text-xs text-gray-400">Processes</div>
                </div>
              </div>
            )}

            {/* Security Checks */}
            {currentExecution.securityChecks && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Security Validation:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center gap-2">
                    {currentExecution.securityChecks.codeInjection ? 
                      <CheckCircle className="w-3 h-3 text-green-400" /> : 
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    }
                    <span className="text-xs text-gray-300">No Injection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentExecution.securityChecks.maliciousPatterns ? 
                      <CheckCircle className="w-3 h-3 text-green-400" /> : 
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    }
                    <span className="text-xs text-gray-300">Safe Patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentExecution.securityChecks.safeImports ? 
                      <CheckCircle className="w-3 h-3 text-green-400" /> : 
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    }
                    <span className="text-xs text-gray-300">Safe Imports</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentExecution.securityChecks.systemCalls ? 
                      <CheckCircle className="w-3 h-3 text-green-400" /> : 
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    }
                    <span className="text-xs text-gray-300">No Sys Calls</span>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Code */}
            {currentExecution.generatedCode && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Generated Code:</div>
                <div className="bg-gray-900/60 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                    {currentExecution.generatedCode}
                  </pre>
                </div>
              </div>
            )}

            {/* Output */}
            {currentExecution.output && (
              <div>
                <div className="text-sm font-medium text-white mb-2">Execution Output:</div>
                <div className="bg-gray-900/60 rounded-lg p-3">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {currentExecution.output}
                  </pre>
                </div>
              </div>
            )}

            {/* Error */}
            {currentExecution.error && (
              <div>
                <div className="text-sm font-medium text-white mb-2">Execution Error:</div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                  <pre className="text-sm text-red-400 font-mono whitespace-pre-wrap">
                    {currentExecution.error}
                  </pre>
                </div>
              </div>
            )}
          </div>
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
              {executionHistory.map((execution, index) => (
                <div key={execution.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{execution.scenario}</div>
                    <div className="text-sm text-gray-400">
                      {execution.language} • {execution.status} • {execution.executionTime}s
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">
                      {execution.resources ? `${execution.resources.memory}MB peak` : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(execution.startTime || 0).toLocaleTimeString()}
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
          <Terminal className="w-5 h-5" />
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
                <Code className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Click "Execute Code" to begin code execution demonstration</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionDemo;