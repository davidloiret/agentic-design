'use client';

import React, { useState, useCallback, useEffect, ReactElement } from 'react';
import { ChevronRight, ChevronDown, Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface HierarchicalNode {
  id: string;
  level: number;
  parentId?: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  children: string[];
  dependencies: string[];
  estimatedTime: number;
  actualTime?: number;
  output?: string;
  timestamp?: Date;
}

interface ProjectScenario {
  id: string;
  name: string;
  description: string;
  rootNodeId: string;
  nodes: { [id: string]: HierarchicalNode };
}

const PROJECT_SCENARIOS: ProjectScenario[] = [
  {
    id: 'business-plan',
    name: 'Business Plan Creation',
    description: 'Comprehensive business plan development with market analysis and financial projections',
    rootNodeId: 'root',
    nodes: {
      'root': {
        id: 'root',
        level: 0,
        title: 'Complete Business Plan',
        description: 'Create a comprehensive business plan for AI startup',
        status: 'pending',
        children: ['exec-summary', 'market-analysis', 'financial-proj', 'marketing-strategy'],
        dependencies: [],
        estimatedTime: 40
      },
      'exec-summary': {
        id: 'exec-summary',
        level: 1,
        parentId: 'root',
        title: 'Executive Summary',
        description: 'High-level overview of the business concept and key points',
        status: 'pending',
        children: ['vision-mission', 'key-highlights'],
        dependencies: ['market-analysis', 'financial-proj'],
        estimatedTime: 8
      },
      'market-analysis': {
        id: 'market-analysis',
        level: 1,
        parentId: 'root',
        title: 'Market Analysis',
        description: 'Comprehensive market research and competitive landscape',
        status: 'pending',
        children: ['competitor-analysis', 'target-customers', 'market-size'],
        dependencies: [],
        estimatedTime: 12
      },
      'financial-proj': {
        id: 'financial-proj',
        level: 1,
        parentId: 'root',
        title: 'Financial Projections',
        description: 'Revenue forecasts, cost analysis, and funding requirements',
        status: 'pending',
        children: ['revenue-forecast', 'cost-analysis', 'funding-req'],
        dependencies: ['market-analysis'],
        estimatedTime: 10
      },
      'marketing-strategy': {
        id: 'marketing-strategy',
        level: 1,
        parentId: 'root',
        title: 'Marketing Strategy',
        description: 'Go-to-market strategy and customer acquisition plan',
        status: 'pending',
        children: ['channel-strategy', 'pricing-strategy'],
        dependencies: ['market-analysis'],
        estimatedTime: 8
      },
      'vision-mission': {
        id: 'vision-mission',
        level: 2,
        parentId: 'exec-summary',
        title: 'Vision & Mission Statements',
        description: 'Define company vision, mission, and core values',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 3
      },
      'key-highlights': {
        id: 'key-highlights',
        level: 2,
        parentId: 'exec-summary',
        title: 'Key Business Highlights',
        description: 'Summarize unique value proposition and key metrics',
        status: 'pending',
        children: [],
        dependencies: ['financial-proj', 'market-analysis'],
        estimatedTime: 2
      },
      'competitor-analysis': {
        id: 'competitor-analysis',
        level: 2,
        parentId: 'market-analysis',
        title: 'Competitor Analysis',
        description: 'Analyze direct and indirect competitors',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 4
      },
      'target-customers': {
        id: 'target-customers',
        level: 2,
        parentId: 'market-analysis',
        title: 'Target Customer Segments',
        description: 'Identify and profile target customer groups',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 4
      },
      'market-size': {
        id: 'market-size',
        level: 2,
        parentId: 'market-analysis',
        title: 'Market Size Analysis',
        description: 'Calculate TAM, SAM, and SOM',
        status: 'pending',
        children: [],
        dependencies: ['target-customers'],
        estimatedTime: 3
      },
      'revenue-forecast': {
        id: 'revenue-forecast',
        level: 2,
        parentId: 'financial-proj',
        title: 'Revenue Forecast',
        description: '3-year revenue projections by segment',
        status: 'pending',
        children: [],
        dependencies: ['market-size'],
        estimatedTime: 4
      },
      'cost-analysis': {
        id: 'cost-analysis',
        level: 2,
        parentId: 'financial-proj',
        title: 'Cost Structure Analysis',
        description: 'Break down fixed and variable costs',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 3
      },
      'funding-req': {
        id: 'funding-req',
        level: 2,
        parentId: 'financial-proj',
        title: 'Funding Requirements',
        description: 'Calculate funding needs and milestones',
        status: 'pending',
        children: [],
        dependencies: ['revenue-forecast', 'cost-analysis'],
        estimatedTime: 2
      },
      'channel-strategy': {
        id: 'channel-strategy',
        level: 2,
        parentId: 'marketing-strategy',
        title: 'Channel Strategy',
        description: 'Define distribution and sales channels',
        status: 'pending',
        children: [],
        dependencies: ['target-customers'],
        estimatedTime: 4
      },
      'pricing-strategy': {
        id: 'pricing-strategy',
        level: 2,
        parentId: 'marketing-strategy',
        title: 'Pricing Strategy',
        description: 'Develop pricing model and positioning',
        status: 'pending',
        children: [],
        dependencies: ['competitor-analysis', 'cost-analysis'],
        estimatedTime: 3
      }
    }
  },
  {
    id: 'software-project',
    name: 'Software Development Project',
    description: 'Full-stack web application development with modern architecture',
    rootNodeId: 'root',
    nodes: {
      'root': {
        id: 'root',
        level: 0,
        title: 'Web Application Development',
        description: 'Build a modern full-stack web application',
        status: 'pending',
        children: ['planning', 'backend', 'frontend', 'deployment'],
        dependencies: [],
        estimatedTime: 60
      },
      'planning': {
        id: 'planning',
        level: 1,
        parentId: 'root',
        title: 'Project Planning',
        description: 'Requirements gathering and system design',
        status: 'pending',
        children: ['requirements', 'architecture'],
        dependencies: [],
        estimatedTime: 12
      },
      'backend': {
        id: 'backend',
        level: 1,
        parentId: 'root',
        title: 'Backend Development',
        description: 'API and database implementation',
        status: 'pending',
        children: ['database', 'api-routes', 'auth'],
        dependencies: ['planning'],
        estimatedTime: 25
      },
      'frontend': {
        id: 'frontend',
        level: 1,
        parentId: 'root',
        title: 'Frontend Development',
        description: 'User interface and client-side logic',
        status: 'pending',
        children: ['ui-components', 'state-management'],
        dependencies: ['backend'],
        estimatedTime: 20
      },
      'deployment': {
        id: 'deployment',
        level: 1,
        parentId: 'root',
        title: 'Deployment & DevOps',
        description: 'Production deployment and monitoring',
        status: 'pending',
        children: ['ci-cd', 'monitoring'],
        dependencies: ['frontend', 'backend'],
        estimatedTime: 8
      },
      'requirements': {
        id: 'requirements',
        level: 2,
        parentId: 'planning',
        title: 'Requirements Analysis',
        description: 'Gather and document functional requirements',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 6
      },
      'architecture': {
        id: 'architecture',
        level: 2,
        parentId: 'planning',
        title: 'System Architecture',
        description: 'Design system architecture and data flow',
        status: 'pending',
        children: [],
        dependencies: ['requirements'],
        estimatedTime: 5
      },
      'database': {
        id: 'database',
        level: 2,
        parentId: 'backend',
        title: 'Database Schema',
        description: 'Design and implement database schema',
        status: 'pending',
        children: [],
        dependencies: ['architecture'],
        estimatedTime: 8
      },
      'api-routes': {
        id: 'api-routes',
        level: 2,
        parentId: 'backend',
        title: 'API Routes',
        description: 'Implement REST API endpoints',
        status: 'pending',
        children: [],
        dependencies: ['database'],
        estimatedTime: 12
      },
      'auth': {
        id: 'auth',
        level: 2,
        parentId: 'backend',
        title: 'Authentication System',
        description: 'Implement user authentication and authorization',
        status: 'pending',
        children: [],
        dependencies: ['database'],
        estimatedTime: 8
      },
      'ui-components': {
        id: 'ui-components',
        level: 2,
        parentId: 'frontend',
        title: 'UI Components',
        description: 'Build reusable React components',
        status: 'pending',
        children: [],
        dependencies: ['api-routes'],
        estimatedTime: 12
      },
      'state-management': {
        id: 'state-management',
        level: 2,
        parentId: 'frontend',
        title: 'State Management',
        description: 'Implement client-side state management',
        status: 'pending',
        children: [],
        dependencies: ['ui-components'],
        estimatedTime: 6
      },
      'ci-cd': {
        id: 'ci-cd',
        level: 2,
        parentId: 'deployment',
        title: 'CI/CD Pipeline',
        description: 'Set up automated build and deployment',
        status: 'pending',
        children: [],
        dependencies: [],
        estimatedTime: 5
      },
      'monitoring': {
        id: 'monitoring',
        level: 2,
        parentId: 'deployment',
        title: 'Monitoring & Logging',
        description: 'Implement application monitoring',
        status: 'pending',
        children: [],
        dependencies: ['ci-cd'],
        estimatedTime: 4
      }
    }
  }
];

export const HierarchicalChainingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ProjectScenario>(PROJECT_SCENARIOS[0]);
  const [nodes, setNodes] = useState<{ [id: string]: HierarchicalNode }>(PROJECT_SCENARIOS[0].nodes);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const [speed, setSpeed] = useState(1); // Execution speed multiplier

  const resetScenario = useCallback(() => {
    const resetNodes = { ...selectedScenario.nodes };
    Object.values(resetNodes).forEach(node => {
      node.status = 'pending';
      node.actualTime = undefined;
      node.output = undefined;
      node.timestamp = undefined;
    });
    setNodes(resetNodes);
    setCurrentStep('');
    setExecutionLog([]);
    setIsRunning(false);
  }, [selectedScenario]);

  const toggleNodeExpansion = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const canExecuteNode = (nodeId: string): boolean => {
    const node = nodes[nodeId];
    if (!node || node.status !== 'pending') return false;
    
    // Check if all dependencies are completed
    return node.dependencies.every(depId => 
      nodes[depId]?.status === 'completed'
    );
  };

  const getReadyNodes = (): string[] => {
    return Object.keys(nodes).filter(canExecuteNode);
  };

  const executeNode = async (nodeId: string): Promise<void> => {
    const node = nodes[nodeId];
    if (!node) return;

    // Start execution
    setNodes(prev => ({
      ...prev,
      [nodeId]: { 
        ...prev[nodeId], 
        status: 'in-progress',
        timestamp: new Date()
      }
    }));
    
    setCurrentStep(nodeId);
    setExecutionLog(prev => [...prev, `Started: ${node.title}`]);

    // Simulate execution time
    const executionTime = Math.max(1000, (node.estimatedTime * 1000) / speed);
    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Generate output based on node type
    const output = generateNodeOutput(node);
    const actualTime = node.estimatedTime + (Math.random() - 0.5) * 2; // Add some variance

    // Complete execution
    setNodes(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        status: 'completed',
        actualTime: Math.max(1, actualTime),
        output,
        timestamp: new Date()
      }
    }));

    setExecutionLog(prev => [...prev, `Completed: ${node.title} (${actualTime.toFixed(1)}h)`]);
  };

  const generateNodeOutput = (node: HierarchicalNode): string => {
    const outputs: { [key: string]: string } = {
      'vision-mission': 'Vision: Transform business operations through AI innovation.\nMission: Democratize AI tools for small and medium enterprises.',
      'competitor-analysis': 'Key competitors: OpenAI (enterprise focus), Anthropic (safety-first), Google (integration advantage). Market gap: SME-focused solutions.',
      'target-customers': 'Primary: SMEs (100-500 employees), Secondary: Startups, Tertiary: Enterprise departments. Pain points: Complex AI adoption, high costs.',
      'revenue-forecast': 'Year 1: $2M, Year 2: $8M, Year 3: $20M. Growth drivers: subscription model, enterprise contracts, API usage.',
      'requirements': 'Functional: User authentication, data processing, real-time analytics, API integration. Non-functional: <2s response time, 99.9% uptime.',
      'database': 'PostgreSQL schema: Users, Projects, Analytics, API_Keys. Optimized indexes, connection pooling, backup strategy implemented.',
      'ui-components': 'Component library: Navigation, Forms, Charts, Tables. Design system with consistent theming, accessibility compliance.',
    };
    
    const genericOutputs = [
      `✅ ${node.title} completed successfully with all requirements met.`,
      `📋 Detailed analysis and documentation provided for ${node.title}.`,
      `🎯 Strategic recommendations developed for ${node.title}.`,
      `📊 Comprehensive framework established for ${node.title}.`
    ];

    return outputs[node.id] || genericOutputs[Math.floor(Math.random() * genericOutputs.length)];
  };

  const runHierarchicalExecution = async () => {
    setIsRunning(true);
    resetScenario();
    
    setExecutionLog(['🚀 Starting hierarchical execution...']);

    while (true) {
      const readyNodes = getReadyNodes();
      
      if (readyNodes.length === 0) {
        // Check if we're done
        const allCompleted = Object.values(nodes).every(node => 
          node.status === 'completed' || node.status === 'blocked'
        );
        
        if (allCompleted) {
          setExecutionLog(prev => [...prev, '✅ All tasks completed successfully!']);
          break;
        } else {
          // Check for deadlock
          const pendingNodes = Object.values(nodes).filter(node => node.status === 'pending');
          if (pendingNodes.length > 0) {
            setExecutionLog(prev => [...prev, '⚠️ Execution blocked - circular dependencies detected']);
            break;
          }
        }
        break;
      }

      // Execute leaf nodes first (bottom-up approach)
      const leafNodes = readyNodes.filter(nodeId => nodes[nodeId].children.length === 0);
      const nodesToExecute = leafNodes.length > 0 ? leafNodes : readyNodes;

      // Execute nodes in parallel where possible
      await Promise.all(nodesToExecute.map(executeNode));
    }

    setIsRunning(false);
    setCurrentStep('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-900/20';
      case 'in-progress': return 'border-blue-500 bg-blue-900/20';
      case 'blocked': return 'border-red-500 bg-red-900/20';
      default: return 'border-gray-600 bg-gray-800/20';
    }
  };

  const renderNode = (nodeId: string, depth: number = 0): ReactElement => {
    const node = nodes[nodeId];
    if (!node) return <></>;

    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = node.children.length > 0;
    const canExecute = canExecuteNode(nodeId);

    return (
      <div key={nodeId} className="mb-2">
        <div
          className={`flex items-center p-3 rounded-lg border transition-all ${getStatusColor(node.status)} ${
            currentStep === nodeId ? 'ring-2 ring-blue-400' : ''
          }`}
          style={{ marginLeft: `${depth * 24}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNodeExpansion(nodeId)}
              className="mr-2 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          <div className="mr-3">{getStatusIcon(node.status)}</div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white truncate">{node.title}</h4>
              <div className="flex items-center space-x-2 text-sm">
                {node.actualTime && (
                  <span className="text-green-400">{node.actualTime.toFixed(1)}h</span>
                )}
                <span className="text-gray-400">{node.estimatedTime}h est.</span>
                {canExecute && !isRunning && (
                  <span className="text-blue-400 text-xs">Ready</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-1">{node.description}</p>
            
            {node.dependencies.length > 0 && (
              <div className="mt-2">
                <span className="text-xs text-gray-400">Depends on: </span>
                {node.dependencies.map(depId => (
                  <span key={depId} className="text-xs text-gray-300 mr-1">
                    {nodes[depId]?.title}
                  </span>
                ))}
              </div>
            )}

            {node.output && (
              <div className="mt-3 p-2 bg-gray-800/40 rounded border-l-2 border-green-400">
                <p className="text-sm text-gray-200">{node.output}</p>
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node.children.map(childId => renderNode(childId, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const getProjectStats = () => {
    const allNodes = Object.values(nodes);
    const completed = allNodes.filter(n => n.status === 'completed').length;
    const inProgress = allNodes.filter(n => n.status === 'in-progress').length;
    const totalEstimated = allNodes.reduce((sum, n) => sum + n.estimatedTime, 0);
    const totalActual = allNodes.reduce((sum, n) => sum + (n.actualTime || 0), 0);
    
    return { completed, inProgress, total: allNodes.length, totalEstimated, totalActual };
  };

  const stats = getProjectStats();

  useEffect(() => {
    resetScenario();
  }, [selectedScenario, resetScenario]);

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🏗️</span>
          Hierarchical Chaining Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how complex projects are broken down into hierarchical tasks with dependencies and executed in optimal order.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = PROJECT_SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PROJECT_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Execution Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
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
                onClick={runHierarchicalExecution}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Running...' : 'Start Execution'}
              </button>
              
              <button
                onClick={resetScenario}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/50">
            <div className="text-2xl font-bold text-white">{stats.completed}/{stats.total}</div>
            <div className="text-sm text-gray-400">Tasks Completed</div>
          </div>
          <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/50">
            <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
          <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/50">
            <div className="text-2xl font-bold text-yellow-400">{stats.totalEstimated}h</div>
            <div className="text-sm text-gray-400">Estimated Time</div>
          </div>
          <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/50">
            <div className="text-2xl font-bold text-green-400">{stats.totalActual.toFixed(1)}h</div>
            <div className="text-sm text-gray-400">Actual Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hierarchical Structure */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Project Hierarchy</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 max-h-96 overflow-y-auto">
            {renderNode(selectedScenario.rootNodeId)}
          </div>
        </div>

        {/* Execution Log */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-96 overflow-y-auto">
            {executionLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                Execution log will appear here...
              </div>
            ) : (
              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="text-sm text-gray-300 font-mono">
                    <span className="text-gray-500">{index + 1}.</span> {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scenario Description */}
      <div className="mt-6 p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
        <h4 className="font-medium text-white mb-2">About This Scenario</h4>
        <p className="text-sm text-gray-300">{selectedScenario.description}</p>
      </div>
    </div>
  );
};

export default HierarchicalChainingDemo;