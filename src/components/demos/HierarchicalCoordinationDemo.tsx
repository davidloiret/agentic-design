import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Users, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, Target, ChevronUp, ChevronDown } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  level: number;
  department: string;
  status: 'idle' | 'working' | 'delegating' | 'reporting' | 'approving' | 'escalating';
  authorityLimit: number;
  currentTask: Task | null;
  subordinates: string[];
  supervisor: string | null;
  performance: number;
  workload: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  cost: number;
  requiredLevel: number;
  assignedTo: string | null;
  status: 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'escalated';
  progress: number;
  delegatedFrom: string | null;
  approvalRequired: boolean;
  subtasks: Task[];
}

interface Decision {
  id: string;
  type: 'approval' | 'escalation' | 'delegation' | 'rejection';
  fromAgent: string;
  toAgent: string;
  task: Task;
  reason: string;
  timestamp: number;
}

interface Report {
  id: string;
  fromAgent: string;
  toAgent: string;
  content: string;
  type: 'progress' | 'completion' | 'issue' | 'metrics';
  timestamp: number;
}

const HIERARCHY_LEVELS = {
  EXECUTIVE: 1,
  DIRECTOR: 2,
  MANAGER: 3,
  LEAD: 4,
  WORKER: 5
};

export default function HierarchicalCoordinationDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'delegation' | 'execution' | 'reporting' | 'escalation' | 'approval' | 'completion'>('idle');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    avgCompletionTime: 0,
    escalationRate: 0,
    approvalRate: 0,
    efficiency: 0
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize hierarchy
  useEffect(() => {
    const initialAgents: Agent[] = [
      // Executive Level
      {
        id: 'ceo',
        name: 'CEO Agent',
        role: 'Chief Executive Officer',
        level: HIERARCHY_LEVELS.EXECUTIVE,
        department: 'Executive',
        status: 'idle',
        authorityLimit: 10000000,
        currentTask: null,
        subordinates: ['cto', 'cmo', 'coo'],
        supervisor: null,
        performance: 95,
        workload: 0
      },
      // Director Level
      {
        id: 'cto',
        name: 'CTO Agent',
        role: 'Chief Technology Officer',
        level: HIERARCHY_LEVELS.DIRECTOR,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 5000000,
        currentTask: null,
        subordinates: ['dev_manager', 'infra_manager'],
        supervisor: 'ceo',
        performance: 90,
        workload: 0
      },
      {
        id: 'cmo',
        name: 'CMO Agent',
        role: 'Chief Marketing Officer',
        level: HIERARCHY_LEVELS.DIRECTOR,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 3000000,
        currentTask: null,
        subordinates: ['product_manager', 'marketing_manager'],
        supervisor: 'ceo',
        performance: 88,
        workload: 0
      },
      {
        id: 'coo',
        name: 'COO Agent',
        role: 'Chief Operating Officer',
        level: HIERARCHY_LEVELS.DIRECTOR,
        department: 'Operations',
        status: 'idle',
        authorityLimit: 4000000,
        currentTask: null,
        subordinates: ['ops_manager'],
        supervisor: 'ceo',
        performance: 92,
        workload: 0
      },
      // Manager Level
      {
        id: 'dev_manager',
        name: 'Dev Manager',
        role: 'Development Manager',
        level: HIERARCHY_LEVELS.MANAGER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 500000,
        currentTask: null,
        subordinates: ['dev_lead'],
        supervisor: 'cto',
        performance: 85,
        workload: 0
      },
      {
        id: 'infra_manager',
        name: 'Infra Manager',
        role: 'Infrastructure Manager',
        level: HIERARCHY_LEVELS.MANAGER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 300000,
        currentTask: null,
        subordinates: ['infra_lead'],
        supervisor: 'cto',
        performance: 87,
        workload: 0
      },
      {
        id: 'product_manager',
        name: 'Product Manager',
        role: 'Product Manager',
        level: HIERARCHY_LEVELS.MANAGER,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 200000,
        currentTask: null,
        subordinates: ['product_lead'],
        supervisor: 'cmo',
        performance: 86,
        workload: 0
      },
      {
        id: 'marketing_manager',
        name: 'Marketing Manager',
        role: 'Marketing Manager',
        level: HIERARCHY_LEVELS.MANAGER,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 250000,
        currentTask: null,
        subordinates: ['marketing_lead'],
        supervisor: 'cmo',
        performance: 84,
        workload: 0
      },
      {
        id: 'ops_manager',
        name: 'Ops Manager',
        role: 'Operations Manager',
        level: HIERARCHY_LEVELS.MANAGER,
        department: 'Operations',
        status: 'idle',
        authorityLimit: 400000,
        currentTask: null,
        subordinates: ['ops_lead'],
        supervisor: 'coo',
        performance: 89,
        workload: 0
      },
      // Lead Level
      {
        id: 'dev_lead',
        name: 'Dev Lead',
        role: 'Development Team Lead',
        level: HIERARCHY_LEVELS.LEAD,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 50000,
        currentTask: null,
        subordinates: ['frontend_dev', 'backend_dev'],
        supervisor: 'dev_manager',
        performance: 82,
        workload: 0
      },
      {
        id: 'infra_lead',
        name: 'Infra Lead',
        role: 'Infrastructure Team Lead',
        level: HIERARCHY_LEVELS.LEAD,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 30000,
        currentTask: null,
        subordinates: ['devops_eng', 'qa_eng'],
        supervisor: 'infra_manager',
        performance: 83,
        workload: 0
      },
      {
        id: 'product_lead',
        name: 'Product Lead',
        role: 'Product Team Lead',
        level: HIERARCHY_LEVELS.LEAD,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 20000,
        currentTask: null,
        subordinates: ['product_analyst'],
        supervisor: 'product_manager',
        performance: 81,
        workload: 0
      },
      {
        id: 'marketing_lead',
        name: 'Marketing Lead',
        role: 'Marketing Team Lead',
        level: HIERARCHY_LEVELS.LEAD,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 25000,
        currentTask: null,
        subordinates: ['market_analyst'],
        supervisor: 'marketing_manager',
        performance: 80,
        workload: 0
      },
      {
        id: 'ops_lead',
        name: 'Ops Lead',
        role: 'Operations Team Lead',
        level: HIERARCHY_LEVELS.LEAD,
        department: 'Operations',
        status: 'idle',
        authorityLimit: 40000,
        currentTask: null,
        subordinates: ['logistics_coord', 'vendor_manager'],
        supervisor: 'ops_manager',
        performance: 84,
        workload: 0
      },
      // Worker Level
      {
        id: 'frontend_dev',
        name: 'Frontend Dev',
        role: 'Frontend Developer',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 5000,
        currentTask: null,
        subordinates: [],
        supervisor: 'dev_lead',
        performance: 78,
        workload: 0
      },
      {
        id: 'backend_dev',
        name: 'Backend Dev',
        role: 'Backend Developer',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 5000,
        currentTask: null,
        subordinates: [],
        supervisor: 'dev_lead',
        performance: 79,
        workload: 0
      },
      {
        id: 'devops_eng',
        name: 'DevOps Engineer',
        role: 'DevOps Engineer',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 3000,
        currentTask: null,
        subordinates: [],
        supervisor: 'infra_lead',
        performance: 77,
        workload: 0
      },
      {
        id: 'qa_eng',
        name: 'QA Engineer',
        role: 'QA Engineer',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Technology',
        status: 'idle',
        authorityLimit: 2000,
        currentTask: null,
        subordinates: [],
        supervisor: 'infra_lead',
        performance: 76,
        workload: 0
      },
      {
        id: 'product_analyst',
        name: 'Product Analyst',
        role: 'Product Analyst',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 2000,
        currentTask: null,
        subordinates: [],
        supervisor: 'product_lead',
        performance: 75,
        workload: 0
      },
      {
        id: 'market_analyst',
        name: 'Market Analyst',
        role: 'Market Analyst',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Marketing',
        status: 'idle',
        authorityLimit: 2500,
        currentTask: null,
        subordinates: [],
        supervisor: 'marketing_lead',
        performance: 74,
        workload: 0
      },
      {
        id: 'logistics_coord',
        name: 'Logistics Coordinator',
        role: 'Logistics Coordinator',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Operations',
        status: 'idle',
        authorityLimit: 4000,
        currentTask: null,
        subordinates: [],
        supervisor: 'ops_lead',
        performance: 77,
        workload: 0
      },
      {
        id: 'vendor_manager',
        name: 'Vendor Manager',
        role: 'Vendor Manager',
        level: HIERARCHY_LEVELS.WORKER,
        department: 'Operations',
        status: 'idle',
        authorityLimit: 4000,
        currentTask: null,
        subordinates: [],
        supervisor: 'ops_lead',
        performance: 76,
        workload: 0
      }
    ];

    setAgents(initialAgents);
  }, []);

  const generateStrategicTask = () => {
    const strategicTasks = [
      {
        title: 'Global Product Launch',
        description: 'Launch new product line across all regions with local customization',
        cost: 8000000,
        priority: 'critical' as const,
        subtasks: [
          { title: 'Develop Core Platform', cost: 3000000, department: 'Technology' },
          { title: 'Marketing Campaign', cost: 2000000, department: 'Marketing' },
          { title: 'Supply Chain Setup', cost: 1500000, department: 'Operations' },
          { title: 'Regional Customization', cost: 1000000, department: 'Marketing' },
          { title: 'Quality Assurance', cost: 500000, department: 'Technology' }
        ]
      },
      {
        title: 'Digital Transformation',
        description: 'Modernize infrastructure and implement AI-driven processes',
        cost: 6000000,
        priority: 'high' as const,
        subtasks: [
          { title: 'Cloud Migration', cost: 2500000, department: 'Technology' },
          { title: 'AI Implementation', cost: 2000000, department: 'Technology' },
          { title: 'Process Automation', cost: 1000000, department: 'Operations' },
          { title: 'Training Program', cost: 500000, department: 'Operations' }
        ]
      },
      {
        title: 'Market Expansion',
        description: 'Enter new geographical markets with targeted strategies',
        cost: 5000000,
        priority: 'high' as const,
        subtasks: [
          { title: 'Market Research', cost: 500000, department: 'Marketing' },
          { title: 'Local Partnerships', cost: 2000000, department: 'Operations' },
          { title: 'Product Adaptation', cost: 1500000, department: 'Technology' },
          { title: 'Marketing Localization', cost: 1000000, department: 'Marketing' }
        ]
      }
    ];

    const selected = strategicTasks[Math.floor(Math.random() * strategicTasks.length)];

    return {
      id: `task_${Date.now()}`,
      title: selected.title,
      description: selected.description,
      priority: selected.priority,
      cost: selected.cost,
      requiredLevel: HIERARCHY_LEVELS.EXECUTIVE,
      assignedTo: null,
      status: 'pending' as const,
      progress: 0,
      delegatedFrom: null,
      approvalRequired: true,
      subtasks: selected.subtasks.map((st, idx) => ({
        id: `subtask_${Date.now()}_${idx}`,
        title: st.title,
        description: `Implement ${st.title} for ${selected.title}`,
        priority: 'high' as const,
        cost: st.cost,
        requiredLevel: HIERARCHY_LEVELS.DIRECTOR,
        assignedTo: null,
        status: 'pending' as const,
        progress: 0,
        delegatedFrom: null,
        approvalRequired: st.cost > 1000000,
        subtasks: []
      }))
    };
  };

  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const icons = {
      info: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    setLogs(prev => [`${icons[type]} ${message}`, ...prev].slice(0, 50));
  };

  const delegateTask = (task: Task, fromAgent: Agent) => {
    // Find suitable subordinate based on department and workload
    const suitableSubordinates = fromAgent.subordinates
      .map(id => agents.find(a => a.id === id))
      .filter(a => a && a.workload < 80)
      .sort((a, b) => (a?.workload || 0) - (b?.workload || 0));

    if (suitableSubordinates.length === 0) {
      addLog(`${fromAgent.name} has no available subordinates for task delegation`, 'warning');
      return null;
    }

    const assignee = suitableSubordinates[0];
    if (!assignee) return null;

    // Check if task cost exceeds subordinate's authority
    if (task.cost > assignee.authorityLimit && task.approvalRequired) {
      addLog(`${fromAgent.name} retaining approval authority for ${task.title} (exceeds ${assignee.name}'s limit)`, 'info');
    }

    // Create delegation decision
    const decision: Decision = {
      id: `decision_${Date.now()}`,
      type: 'delegation',
      fromAgent: fromAgent.id,
      toAgent: assignee.id,
      task: task,
      reason: `Task delegated based on authority and workload distribution`,
      timestamp: Date.now()
    };

    setDecisions(prev => [...prev, decision]);

    // Update task
    const updatedTask = {
      ...task,
      assignedTo: assignee.id,
      delegatedFrom: fromAgent.id,
      status: 'assigned' as const
    };

    // Update agents
    setAgents(prev => prev.map(a => {
      if (a.id === assignee.id) {
        return {
          ...a,
          currentTask: updatedTask,
          status: 'working' as const,
          workload: Math.min(100, a.workload + 20)
        };
      }
      if (a.id === fromAgent.id) {
        return {
          ...a,
          status: 'delegating' as const
        };
      }
      return a;
    }));

    addLog(`${fromAgent.name} delegated "${task.title}" to ${assignee.name}`, 'success');
    return updatedTask;
  };

  const escalateIssue = (task: Task, fromAgent: Agent, issue: string) => {
    const supervisor = agents.find(a => a.id === fromAgent.supervisor);
    if (!supervisor) return;

    const decision: Decision = {
      id: `decision_${Date.now()}`,
      type: 'escalation',
      fromAgent: fromAgent.id,
      toAgent: supervisor.id,
      task: task,
      reason: issue,
      timestamp: Date.now()
    };

    setDecisions(prev => [...prev, decision]);

    // Update task status
    setTasks(prev => prev.map(t =>
      t.id === task.id ? { ...t, status: 'escalated' as const } : t
    ));

    // Update agents
    setAgents(prev => prev.map(a => {
      if (a.id === fromAgent.id) {
        return { ...a, status: 'escalating' as const };
      }
      if (a.id === supervisor.id) {
        return { ...a, status: 'approving' as const };
      }
      return a;
    }));

    addLog(`${fromAgent.name} escalated "${task.title}" to ${supervisor.name}: ${issue}`, 'warning');
  };

  const reportProgress = (fromAgent: Agent, task: Task) => {
    const supervisor = agents.find(a => a.id === fromAgent.supervisor);
    if (!supervisor) return;

    const report: Report = {
      id: `report_${Date.now()}`,
      fromAgent: fromAgent.id,
      toAgent: supervisor.id,
      content: `Task "${task.title}" is ${task.progress}% complete`,
      type: task.progress === 100 ? 'completion' : 'progress',
      timestamp: Date.now()
    };

    setReports(prev => [...prev, report]);

    setAgents(prev => prev.map(a =>
      a.id === fromAgent.id ? { ...a, status: 'reporting' as const } : a
    ));

    addLog(`${fromAgent.name} reported ${task.progress}% progress on "${task.title}" to ${supervisor.name}`, 'info');
  };

  const processApproval = (task: Task, approver: Agent, approved: boolean) => {
    const decision: Decision = {
      id: `decision_${Date.now()}`,
      type: approved ? 'approval' : 'rejection',
      fromAgent: approver.id,
      toAgent: task.assignedTo || '',
      task: task,
      reason: approved ? 'Task approved for execution' : 'Task rejected - requires revision',
      timestamp: Date.now()
    };

    setDecisions(prev => [...prev, decision]);

    // Update task status
    setTasks(prev => prev.map(t =>
      t.id === task.id ? {
        ...t,
        status: approved ? 'in_progress' as const : 'pending' as const
      } : t
    ));

    addLog(`${approver.name} ${approved ? 'approved' : 'rejected'} "${task.title}"`, approved ? 'success' : 'error');
  };

  const runSimulation = useCallback(() => {
    setAgents(prev => {
      const updated = [...prev];

      // Phase-based processing
      switch (currentPhase) {
        case 'idle':
          // Generate new strategic task for CEO
          const ceo = updated.find(a => a.id === 'ceo');
          if (ceo && !ceo.currentTask) {
            const newTask = generateStrategicTask();
            setTasks(current => [...current, newTask]);

            const ceoIndex = updated.findIndex(a => a.id === 'ceo');
            updated[ceoIndex] = {
              ...ceo,
              currentTask: newTask,
              status: 'working',
              workload: 30
            };

            addLog(`CEO received strategic objective: "${newTask.title}"`, 'info');
            setCurrentPhase('delegation');
            setMetrics(prev => ({ ...prev, totalTasks: prev.totalTasks + 1 }));
          }
          break;

        case 'delegation':
          // Cascade delegation down the hierarchy
          let delegationOccurred = false;

          updated.forEach((agent, idx) => {
            if (agent.currentTask && agent.subordinates.length > 0 && agent.currentTask.status === 'pending') {
              const task = agent.currentTask;

              // Decompose task if it has subtasks
              if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks.forEach(subtask => {
                  // Find appropriate subordinate based on department
                  const subordinate = agent.subordinates
                    .map(id => updated.find(a => a.id === id))
                    .filter(a => a && a.workload < 70)
                    .sort((a, b) => (a?.performance || 0) - (b?.performance || 0))
                    .pop();

                  if (subordinate) {
                    const subIndex = updated.findIndex(a => a.id === subordinate.id);
                    updated[subIndex] = {
                      ...subordinate,
                      currentTask: subtask,
                      status: 'working',
                      workload: Math.min(100, subordinate.workload + 25)
                    };

                    subtask.assignedTo = subordinate.id;
                    subtask.delegatedFrom = agent.id;
                    subtask.status = 'assigned';

                    addLog(`${agent.name} delegated "${subtask.title}" to ${subordinate.name}`, 'success');
                    delegationOccurred = true;
                  }
                });

                // Update parent task status
                task.status = 'in_progress';
                updated[idx] = { ...agent, status: 'delegating' };
              } else if (agent.subordinates.length > 0) {
                // Direct delegation for tasks without subtasks
                const subordinate = agent.subordinates
                  .map(id => updated.find(a => a.id === id))
                  .filter(a => a && a.workload < 70)[0];

                if (subordinate) {
                  const subIndex = updated.findIndex(a => a.id === subordinate.id);
                  updated[subIndex] = {
                    ...subordinate,
                    currentTask: task,
                    status: 'working',
                    workload: Math.min(100, subordinate.workload + 30)
                  };

                  task.assignedTo = subordinate.id;
                  task.delegatedFrom = agent.id;
                  task.status = 'assigned';

                  updated[idx] = { ...agent, currentTask: null, status: 'idle', workload: Math.max(0, agent.workload - 20) };

                  addLog(`${agent.name} delegated "${task.title}" to ${subordinate.name}`, 'success');
                  delegationOccurred = true;
                }
              }
            }
          });

          if (!delegationOccurred) {
            setCurrentPhase('execution');
          }
          break;

        case 'execution':
          // Workers execute tasks
          let anyWorking = false;

          updated.forEach((agent, idx) => {
            if (agent.currentTask && agent.level === HIERARCHY_LEVELS.WORKER) {
              const task = agent.currentTask;

              if (task.status === 'assigned' || task.status === 'in_progress') {
                task.status = 'in_progress';
                task.progress = Math.min(100, task.progress + Math.random() * 20 * speed);

                if (task.progress >= 100) {
                  task.status = 'completed';
                  updated[idx] = {
                    ...agent,
                    currentTask: null,
                    status: 'idle',
                    workload: Math.max(0, agent.workload - 25),
                    performance: Math.min(100, agent.performance + 1)
                  };

                  addLog(`${agent.name} completed "${task.title}"`, 'success');
                  setMetrics(prev => ({
                    ...prev,
                    completedTasks: prev.completedTasks + 1,
                    efficiency: Math.round((prev.completedTasks + 1) / prev.totalTasks * 100)
                  }));
                } else {
                  anyWorking = true;

                  // Periodic progress reports
                  if (Math.random() < 0.1) {
                    reportProgress(agent, task);
                  }
                }
              }
            }
          });

          if (!anyWorking) {
            setCurrentPhase('reporting');
          }
          break;

        case 'reporting':
          // Upward reporting through hierarchy
          updated.forEach(agent => {
            if (agent.supervisor && Math.random() < 0.3) {
              const supervisor = updated.find(a => a.id === agent.supervisor);
              if (supervisor) {
                const report: Report = {
                  id: `report_${Date.now()}_${agent.id}`,
                  fromAgent: agent.id,
                  toAgent: supervisor.id,
                  content: `Department status: Workload ${agent.workload}%, Performance ${agent.performance}%`,
                  type: 'metrics',
                  timestamp: Date.now()
                };

                setReports(prev => [...prev, report]);
                addLog(`${agent.name} reported status to ${supervisor.name}`, 'info');
              }
            }
          });

          setCurrentPhase('completion');
          break;

        case 'escalation':
          // Handle escalations
          const escalations = decisions.filter(d => d.type === 'escalation' && d.timestamp > Date.now() - 5000);

          escalations.forEach(esc => {
            const approver = updated.find(a => a.id === esc.toAgent);
            if (approver) {
              // Simulate approval decision
              const approved = Math.random() > 0.3;
              processApproval(esc.task, approver, approved);
            }
          });

          setCurrentPhase('execution');
          break;

        case 'completion':
          // Check overall completion and reset
          const allTasksComplete = tasks.every(t => t.status === 'completed');

          if (allTasksComplete && tasks.length > 0) {
            addLog('All strategic objectives achieved!', 'success');
            setCurrentPhase('idle');

            // Reset for next cycle
            updated.forEach((agent, idx) => {
              updated[idx] = {
                ...agent,
                currentTask: null,
                status: 'idle',
                workload: 0
              };
            });
          } else {
            setCurrentPhase('execution');
          }
          break;
      }

      return updated;
    });
  }, [currentPhase, speed, tasks, decisions]);

  // Simulation control
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        runSimulation();
      }, 1500 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, runSimulation, speed]);

  const startSimulation = () => {
    setIsRunning(true);
    addLog('Hierarchical coordination simulation started', 'success');
  };

  const pauseSimulation = () => {
    setIsRunning(false);
    addLog('Simulation paused', 'info');
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setTasks([]);
    setDecisions([]);
    setReports([]);
    setLogs([]);
    setSelectedAgent(null);
    setMetrics({
      totalTasks: 0,
      completedTasks: 0,
      avgCompletionTime: 0,
      escalationRate: 0,
      approvalRate: 0,
      efficiency: 0
    });

    // Reset agents
    setAgents(prev => prev.map(a => ({
      ...a,
      currentTask: null,
      status: 'idle',
      workload: 0,
      performance: Math.floor(75 + Math.random() * 20)
    })));

    addLog('Simulation reset', 'info');
  };

  const getAgentsByLevel = (level: number) => {
    return agents.filter(a => a.level === level);
  };

  const getAgentColor = (agent: Agent) => {
    const colors = {
      1: 'bg-red-600',      // Executive
      2: 'bg-orange-600',   // Director
      3: 'bg-yellow-600',   // Manager
      4: 'bg-blue-600',     // Lead
      5: 'bg-green-600'     // Worker
    };
    return colors[agent.level as keyof typeof colors] || 'bg-gray-600';
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'idle': return '💤';
      case 'working': return '🔧';
      case 'delegating': return '📨';
      case 'reporting': return '📊';
      case 'approving': return '✅';
      case 'escalating': return '⚠️';
      default: return '❓';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Speed:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-400 w-12">{speed}x</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={isRunning ? pauseSimulation : startSimulation}
              disabled={false}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Simulation
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="px-3 py-1.5 bg-gray-900 rounded">
            <span className="text-xs text-gray-400">Phase: </span>
            <span className="text-xs text-white font-medium capitalize">{currentPhase}</span>
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400 text-sm">Total Tasks</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.totalTasks}</div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-sm">Completed</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.completedTasks}</div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400 text-sm">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.efficiency}%</div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <ChevronUp className="w-4 h-4 text-orange-400" />
            <span className="text-gray-400 text-sm">Escalations</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {decisions.filter(d => d.type === 'escalation').length}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400 text-sm">Approvals</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {decisions.filter(d => d.type === 'approval').length}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-pink-400" />
            <span className="text-gray-400 text-sm">Active Agents</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {agents.filter(a => a.status !== 'idle').length}
          </div>
        </div>
      </div>

      {/* Organizational Hierarchy */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Organizational Hierarchy
        </h3>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(level => {
            const levelAgents = getAgentsByLevel(level);
            const levelNames = {
              1: 'Executive',
              2: 'Directors',
              3: 'Managers',
              4: 'Team Leads',
              5: 'Workers'
            };

            return (
              <div key={level} className="space-y-3">
                <div className="text-sm font-medium text-gray-400">
                  Level {level} - {levelNames[level as keyof typeof levelNames]}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {levelAgents.map(agent => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAgent?.id === agent.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700/50 bg-gray-800/30 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getAgentColor(agent)}`}>
                          L{agent.level}
                        </div>
                        <span className="text-lg">{getStatusIcon(agent.status)}</span>
                      </div>
                      <div className="text-sm font-medium text-white mb-1">{agent.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{agent.role}</div>

                      {/* Workload bar */}
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            agent.workload > 80 ? 'bg-red-500' :
                            agent.workload > 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${agent.workload}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Load: {agent.workload}%</span>
                        <span className="text-gray-500">
                          <DollarSign className="w-3 h-3 inline" />
                          {(agent.authorityLimit / 1000000).toFixed(1)}M
                        </span>
                      </div>

                      {agent.currentTask && (
                        <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs">
                          <div className="text-gray-300 truncate">{agent.currentTask.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-gray-500">Progress:</span>
                            <span className="text-white">{Math.round(agent.currentTask.progress)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            Agent Details: {selectedAgent.name}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Department</div>
              <div className="text-white font-medium">{selectedAgent.department}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Authority Limit</div>
              <div className="text-white font-medium">
                ${(selectedAgent.authorityLimit / 1000000).toFixed(2)}M
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Performance</div>
              <div className="text-white font-medium">{selectedAgent.performance}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Status</div>
              <div className="text-white font-medium capitalize">{selectedAgent.status}</div>
            </div>
          </div>

          {selectedAgent.supervisor && (
            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-1">Reports to</div>
              <div className="text-white">
                {agents.find(a => a.id === selectedAgent.supervisor)?.name}
              </div>
            </div>
          )}

          {selectedAgent.subordinates.length > 0 && (
            <div>
              <div className="text-sm text-gray-400 mb-1">Direct Reports</div>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.subordinates.map(subId => {
                  const sub = agents.find(a => a.id === subId);
                  return sub ? (
                    <span key={subId} className="px-2 py-1 bg-gray-800 rounded text-sm text-white">
                      {sub.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Activity Logs */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Activity Log
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No activity yet. Start the simulation to see the hierarchy in action.
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-300 p-2 bg-gray-800/30 rounded-lg animate-fadeIn"
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Decisions & Reports Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            Recent Decisions
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {decisions.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No decisions yet</div>
            ) : (
              decisions.slice(-5).reverse().map(decision => (
                <div key={decision.id} className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      decision.type === 'approval' ? 'bg-green-600 text-white' :
                      decision.type === 'escalation' ? 'bg-orange-600 text-white' :
                      decision.type === 'delegation' ? 'bg-blue-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {decision.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(decision.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {agents.find(a => a.id === decision.fromAgent)?.name} → {' '}
                    {agents.find(a => a.id === decision.toAgent)?.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{decision.reason}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Recent Reports
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {reports.length === 0 ? (
              <div className="text-gray-500 text-center py-4">No reports yet</div>
            ) : (
              reports.slice(-5).reverse().map(report => (
                <div key={report.id} className="p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      report.type === 'completion' ? 'bg-green-600 text-white' :
                      report.type === 'issue' ? 'bg-red-600 text-white' :
                      report.type === 'metrics' ? 'bg-purple-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {report.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(report.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {agents.find(a => a.id === report.fromAgent)?.name} → {' '}
                    {agents.find(a => a.id === report.toAgent)?.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{report.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}