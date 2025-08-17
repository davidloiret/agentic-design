'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Target, CheckCircle, AlertCircle, Clock, Users, DollarSign, Calendar, TrendingUp, Settings, BarChart3, Shield, Activity, Building2, AlertTriangle } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  level: number;
  parentId?: string;
  duration: number;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  team: string;
  budget: number;
  dependencies: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface PlanningSession {
  id: string;
  scenario: string;
  mainGoal: string;
  tasks: Task[];
  currentLevel: number;
  status: 'analyzing' | 'decomposing' | 'planning' | 'executing' | 'monitoring' | 'complete';
  totalBudget: number;
  timeline: number;
  progress: number;
  startTime?: number;
}

interface ScenarioConfig {
  name: string;
  description: string;
  mainGoal: string;
  totalBudget: number;
  timeline: number;
  complexity: 'low' | 'medium' | 'high';
  domains: string[];
}

const scenarios: ScenarioConfig[] = [
  {
    name: 'AI Mobile App Launch',
    description: 'Launch AI-powered mobile application with market entry strategy',
    mainGoal: 'Launch AI-powered mobile app within 8 months with $2.5M budget',
    totalBudget: 2500000,
    timeline: 32,
    complexity: 'high',
    domains: ['Product Development', 'Marketing Strategy', 'Business Operations', 'Compliance & Legal']
  },
  {
    name: 'E-commerce Platform',
    description: 'Build comprehensive e-commerce platform with multi-vendor support',
    mainGoal: 'Deploy multi-vendor e-commerce platform within 6 months with $1.8M budget',
    totalBudget: 1800000,
    timeline: 24,
    complexity: 'high',
    domains: ['Platform Development', 'Vendor Onboarding', 'Payment Systems', 'Marketing & Sales']
  },
  {
    name: 'Digital Transformation',
    description: 'Modernize legacy systems with cloud migration and automation',
    mainGoal: 'Complete digital transformation within 12 months with $3.2M budget',
    totalBudget: 3200000,
    timeline: 48,
    complexity: 'high',
    domains: ['Cloud Migration', 'Process Automation', 'Staff Training', 'Security Compliance']
  },
  {
    name: 'Product Redesign',
    description: 'Redesign flagship product with enhanced user experience',
    mainGoal: 'Launch redesigned product within 4 months with $800K budget',
    totalBudget: 800000,
    timeline: 16,
    complexity: 'medium',
    domains: ['User Research', 'Design & Prototyping', 'Development', 'Testing & Launch']
  }
];

const generateHierarchicalTasks = (scenario: ScenarioConfig): Task[] => {
  const tasks: Task[] = [];
  
  // Level 1 - Strategic domains
  const level1Tasks = scenario.domains.map((domain, index) => ({
    id: `level1-${index}`,
    name: domain,
    level: 1,
    duration: Math.floor(scenario.timeline * (0.6 + Math.random() * 0.4)),
    progress: Math.floor(Math.random() * 60 + 20),
    status: ['in-progress', 'completed', 'not-started'][Math.floor(Math.random() * 3)] as Task['status'],
    team: `${domain.split(' ')[0]} Team`,
    budget: Math.floor(scenario.totalBudget / scenario.domains.length * (0.8 + Math.random() * 0.4)),
    dependencies: [],
    priority: ['high', 'critical'][Math.floor(Math.random() * 2)] as Task['priority']
  }));

  tasks.push(...level1Tasks);

  // Level 2 - Tactical components
  level1Tasks.forEach((level1Task, level1Index) => {
    const numLevel2Tasks = 3 + Math.floor(Math.random() * 2); // 3-4 tasks per level1
    
    for (let i = 0; i < numLevel2Tasks; i++) {
      const level2TaskNames = {
        'Product Development': ['Market Research', 'UI/UX Design', 'AI Development', 'Mobile Development'],
        'Platform Development': ['Architecture Design', 'Core Development', 'API Integration', 'Testing'],
        'Cloud Migration': ['Assessment', 'Migration Planning', 'Data Migration', 'System Integration'],
        'User Research': ['User Interviews', 'Usability Testing', 'Competitor Analysis', 'Persona Development'],
        'Marketing Strategy': ['Brand Identity', 'Content Strategy', 'Launch Campaign', 'Partnership Outreach'],
        'Vendor Onboarding': ['Vendor Portal', 'Integration APIs', 'Support System', 'Documentation'],
        'Process Automation': ['Workflow Analysis', 'Tool Selection', 'Implementation', 'Training'],
        'Design & Prototyping': ['Wireframing', 'Visual Design', 'Prototyping', 'Design System'],
        'Business Operations': ['Infrastructure Setup', 'Support System', 'Monitoring', 'Scaling'],
        'Payment Systems': ['Gateway Integration', 'Security Implementation', 'Testing', 'Compliance'],
        'Staff Training': ['Training Materials', 'Workshop Sessions', 'Certification', 'Support'],
        'Development': ['Frontend Development', 'Backend Development', 'Integration', 'Optimization'],
        'Compliance & Legal': ['Privacy Compliance', 'Legal Review', 'Documentation', 'Auditing'],
        'Marketing & Sales': ['Sales Training', 'Marketing Materials', 'Lead Generation', 'Customer Acquisition'],
        'Security Compliance': ['Security Assessment', 'Implementation', 'Testing', 'Documentation'],
        'Testing & Launch': ['QA Testing', 'User Acceptance', 'Performance Testing', 'Launch Preparation']
      };

      const taskNames = level2TaskNames[level1Task.name as keyof typeof level2TaskNames] || 
        [`Task ${i+1}`, `Component ${i+1}`, `Module ${i+1}`, `Phase ${i+1}`];
      
      const task: Task = {
        id: `level2-${level1Index}-${i}`,
        name: taskNames[i] || `Task ${i+1}`,
        level: 2,
        parentId: level1Task.id,
        duration: Math.floor(level1Task.duration * (0.2 + Math.random() * 0.3)),
        progress: Math.floor(Math.random() * 80 + 10),
        status: ['in-progress', 'completed', 'not-started', 'blocked'][Math.floor(Math.random() * 4)] as Task['status'],
        team: level1Task.team,
        budget: Math.floor(level1Task.budget / numLevel2Tasks * (0.7 + Math.random() * 0.6)),
        dependencies: i > 0 ? [`level2-${level1Index}-${i-1}`] : [],
        priority: ['medium', 'high'][Math.floor(Math.random() * 2)] as Task['priority']
      };
      
      tasks.push(task);
    }
  });

  return tasks;
};

const HierarchicalPlanningDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<PlanningSession | null>(null);
  const [planningHistory, setPlanningHistory] = useState<PlanningSession[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [viewLevel, setViewLevel] = useState<'all' | 1 | 2>(1);

  const scenario = scenarios[selectedScenario];

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentSession(null);
    setPlanningHistory([]);
    setLogs([]);
    setViewLevel(1);
  };

  const simulateHierarchicalPlanning = async () => {
    setIsRunning(true);
    const startTime = Date.now();
    
    addLog(`Starting hierarchical planning: ${scenario.name}`);
    addLog(`Main goal: "${scenario.mainGoal}"`);

    // Create planning session
    const session: PlanningSession = {
      id: `session-${Date.now()}`,
      scenario: scenario.name,
      mainGoal: scenario.mainGoal,
      tasks: [],
      currentLevel: 0,
      status: 'analyzing',
      totalBudget: scenario.totalBudget,
      timeline: scenario.timeline,
      progress: 0,
      startTime
    };

    setCurrentSession(session);

    // Analysis phase
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog('Analyzing goal complexity and decomposition strategy...');
    
    // Level 1 decomposition
    session.status = 'decomposing';
    session.currentLevel = 1;
    setCurrentSession({...session});
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    addLog(`Decomposing into ${scenario.domains.length} strategic domains`);
    
    // Generate initial tasks
    const hierarchicalTasks = generateHierarchicalTasks(scenario);
    session.tasks = hierarchicalTasks;
    session.progress = 15;
    setCurrentSession({...session});
    
    scenario.domains.forEach(domain => {
      addLog(`Level 1 domain created: ${domain}`);
    });

    // Level 2 decomposition
    await new Promise(resolve => setTimeout(resolve, 800));
    session.currentLevel = 2;
    session.progress = 35;
    setCurrentSession({...session});
    
    const level2Count = hierarchicalTasks.filter(t => t.level === 2).length;
    addLog(`Level 2 breakdown: ${level2Count} tactical components identified`);

    // Planning phase
    session.status = 'planning';
    session.progress = 50;
    setCurrentSession({...session});
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('Creating dependency matrix and resource allocation...');
    addLog('Optimizing timeline and identifying critical path...');

    // Execution simulation
    session.status = 'executing';
    session.progress = 65;
    setCurrentSession({...session});
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addLog('Plan execution initiated across all teams...');
    
    // Simulate progress updates
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      session.progress = 65 + (i + 1) * 5;
      
      // Update some task progress
      const randomTask = session.tasks[Math.floor(Math.random() * session.tasks.length)];
      if (randomTask.status === 'in-progress') {
        randomTask.progress = Math.min(100, randomTask.progress + Math.floor(Math.random() * 15 + 5));
        if (randomTask.progress >= 100) {
          randomTask.status = 'completed';
        }
      }
      
      setCurrentSession({...session});
      
      if (i === 2) {
        addLog('Mid-phase progress: 75% of tasks on track');
      }
    }

    // Monitoring phase
    session.status = 'monitoring';
    session.progress = 90;
    setCurrentSession({...session});
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addLog('Progress monitoring and risk assessment complete');
    addLog('Quality gates and milestone reviews passed');

    // Completion
    session.status = 'complete';
    session.progress = 100;
    setCurrentSession({...session});
    setPlanningHistory(prev => [...prev, session]);
    
    const totalTasks = session.tasks.length;
    const completedTasks = session.tasks.filter(t => t.status === 'completed').length;
    
    addLog(`Planning complete: ${totalTasks} tasks created, ${completedTasks} completed`);
    addLog(`Hierarchical planning session finished successfully`);
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started': return <Clock className="w-3 h-3 text-gray-400" />;
      case 'in-progress': return <Activity className="w-3 h-3 text-blue-400 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'blocked': return <AlertCircle className="w-3 h-3 text-red-400" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'border-gray-500 bg-gray-900/30';
      case 'in-progress': return 'border-blue-500 bg-blue-900/30';
      case 'completed': return 'border-green-500 bg-green-900/30';  
      case 'blocked': return 'border-red-500 bg-red-900/30';
      default: return 'border-gray-500 bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredTasks = currentSession?.tasks.filter(task => {
    if (viewLevel === 'all') return true;
    return task.level === viewLevel;
  }) || [];

  const getTeamIcon = (team: string) => {
    if (team.includes('Product') || team.includes('Platform')) return Building2;
    if (team.includes('Marketing') || team.includes('Sales')) return TrendingUp;
    if (team.includes('Design') || team.includes('User')) return Target;
    if (team.includes('Security') || team.includes('Compliance')) return Shield;
    return Users;
  };

  return (
    <div className="p-6 bg-gray-900/40 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Hierarchical Planning Pattern Demo</h3>
          <p className="text-gray-300 text-sm">
            Simulate goal decomposition into hierarchical sub-tasks with dependency management
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={simulateHierarchicalPlanning}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Planning...' : 'Start Planning'}
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
          Select Planning Scenario:
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
              <div className="font-medium mb-1">{scenario.name}</div>
              <div className="text-xs text-gray-400 mb-2">{scenario.description}</div>
              <div className="text-xs text-gray-500">
                Budget: ${(scenario.totalBudget / 1000000).toFixed(1)}M • Timeline: {scenario.timeline} weeks • Complexity: {scenario.complexity}
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
            <div className="text-sm text-gray-400">Budget</div>
            <div className="text-white">${(scenario.totalBudget / 1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Timeline</div>
            <div className="text-white">{scenario.timeline} weeks</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Status</div>
            <div className="text-white capitalize">{currentSession?.status || 'Ready'}</div>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-400 mb-2">Main Goal:</div>
          <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg">
            "{scenario.mainGoal}"
          </div>
        </div>
      </div>

      {/* Level View Controls */}
      {currentSession && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-gray-300">View Level:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewLevel('all')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  viewLevel === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setViewLevel(1)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  viewLevel === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Level 1 (Strategic)
              </button>
              <button
                onClick={() => setViewLevel(2)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  viewLevel === 2
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Level 2 (Tactical)
              </button>
            </div>
          </div>

          {/* Planning Progress */}
          <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Planning Progress</span>
              <span className="text-sm text-gray-300">{currentSession.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentSession.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Task Hierarchy Display */}
      {currentSession && filteredTasks.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Task Hierarchy ({filteredTasks.length} tasks)
          </h4>
          
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const TeamIcon = getTeamIcon(task.team);
              const isLevel1 = task.level === 1;
              
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(task.status)} ${
                    isLevel1 ? 'ml-0' : 'ml-6'
                  }`}
                  style={{ 
                    backgroundColor: isLevel1 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    borderLeftWidth: isLevel1 ? '4px' : '2px',
                    borderLeftColor: isLevel1 ? '#3b82f6' : '#10b981'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{task.name}</span>
                          <span className={` flex-nowrap text-xs px-2 py-0.5 rounded-full ${
                            isLevel1 ? 'bg-blue-600/20 text-blue-300' : 'bg-green-600/20 text-green-300'
                          }`}>
                            Level {task.level}
                          </span>
                          <span className={` flex-nowrap text-xs px-2 py-0.5 rounded-full bg-opacity-20 ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {task.duration} weeks • {task.team}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-bold">{task.progress}%</div>
                        <div className="text-gray-400 text-xs">Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-bold">${(task.budget / 1000).toFixed(0)}K</div>
                        <div className="text-gray-400 text-xs">Budget</div>
                      </div>
                      <TeamIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        task.status === 'blocked' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>

                  {/* Dependencies */}
                  {task.dependencies.length > 0 && (
                    <div className="text-xs text-gray-400">
                      <span className="font-medium">Dependencies:</span> {task.dependencies.length} tasks
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Planning Statistics */}
      {currentSession && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Planning Statistics
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-800/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">
                {currentSession.tasks.filter(t => t.level === 1).length}
              </div>
              <div className="text-sm text-gray-400">Strategic Domains</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {currentSession.tasks.filter(t => t.level === 2).length}
              </div>
              <div className="text-sm text-gray-400">Tactical Tasks</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {currentSession.tasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(currentSession.tasks.reduce((sum, t) => sum + t.progress, 0) / currentSession.tasks.length)}%
              </div>
              <div className="text-sm text-gray-400">Avg Progress</div>
            </div>
          </div>
        </div>
      )}

      {/* Planning History */}
      {planningHistory.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Planning History
          </h4>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <div className="space-y-3">
              {planningHistory.map((session, index) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{session.scenario}</div>
                    <div className="text-sm text-gray-400">
                      {session.tasks.length} tasks • {session.tasks.filter(t => t.status === 'completed').length} completed
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">
                      ${(session.totalBudget / 1000000).toFixed(1)}M budget
                    </div>
                    <div className="text-xs text-gray-500">
                      {session.timeline} weeks timeline
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
          Planning Process Log
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
                <Target className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">Click "Start Planning" to begin hierarchical planning demonstration</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HierarchicalPlanningDemo;