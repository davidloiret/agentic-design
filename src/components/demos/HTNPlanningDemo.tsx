'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, GitBranch, Layers, CheckCircle, AlertCircle, Clock, Zap, Target, ArrowDown, ArrowRight, Package, Settings } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  type: 'abstract' | 'primitive';
  description: string;
  preconditions: string[];
  effects: string[];
  duration: number;
  resources: string[];
  status: 'pending' | 'planning' | 'executing' | 'completed' | 'failed';
  level: number;
  parentId?: string;
}

interface Method {
  id: string;
  name: string;
  abstractTask: string;
  subtasks: string[];
  ordering: 'sequential' | 'parallel' | 'any-order';
  constraints: string[];
  applicability: number;
}

interface PlanNode {
  taskId: string;
  methodId?: string;
  children: PlanNode[];
  startTime?: number;
  endTime?: number;
  status: 'pending' | 'active' | 'completed' | 'failed';
  x?: number;
  y?: number;
}

interface DomainKnowledge {
  tasks: Map<string, Task>;
  methods: Map<string, Method>;
  operators: Map<string, string[]>;
}

interface WorldState {
  facts: Set<string>;
  resources: Map<string, number>;
  time: number;
}

interface PlanningProblem {
  id: string;
  name: string;
  description: string;
  initialTask: string;
  initialState: WorldState;
  goals: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

// Sample domain: Travel Planning
const TRAVEL_TASKS: Task[] = [
  // Abstract tasks
  {
    id: 'plan-trip',
    name: 'Plan Trip',
    type: 'abstract',
    description: 'Plan complete travel itinerary',
    preconditions: ['has-destination', 'has-dates'],
    effects: ['trip-planned'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 0
  },
  {
    id: 'arrange-transport',
    name: 'Arrange Transportation',
    type: 'abstract',
    description: 'Book all transportation',
    preconditions: ['has-destination'],
    effects: ['transport-arranged'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  {
    id: 'arrange-accommodation',
    name: 'Arrange Accommodation',
    type: 'abstract',
    description: 'Book all accommodations',
    preconditions: ['has-dates'],
    effects: ['accommodation-arranged'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  {
    id: 'plan-activities',
    name: 'Plan Activities',
    type: 'abstract',
    description: 'Schedule activities and tours',
    preconditions: ['has-destination'],
    effects: ['activities-planned'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  // Primitive tasks
  {
    id: 'search-flights',
    name: 'Search Flights',
    type: 'primitive',
    description: 'Find available flights',
    preconditions: ['has-airports'],
    effects: ['flights-found'],
    duration: 2,
    resources: ['search-api'],
    status: 'pending',
    level: 2
  },
  {
    id: 'book-flight',
    name: 'Book Flight',
    type: 'primitive',
    description: 'Reserve flight tickets',
    preconditions: ['flights-found', 'has-payment'],
    effects: ['flight-booked'],
    duration: 3,
    resources: ['booking-api', 'payment-system'],
    status: 'pending',
    level: 2
  },
  {
    id: 'search-hotels',
    name: 'Search Hotels',
    type: 'primitive',
    description: 'Find available hotels',
    preconditions: ['has-destination'],
    effects: ['hotels-found'],
    duration: 2,
    resources: ['search-api'],
    status: 'pending',
    level: 2
  },
  {
    id: 'book-hotel',
    name: 'Book Hotel',
    type: 'primitive',
    description: 'Reserve hotel rooms',
    preconditions: ['hotels-found', 'has-payment'],
    effects: ['hotel-booked'],
    duration: 3,
    resources: ['booking-api', 'payment-system'],
    status: 'pending',
    level: 2
  },
  {
    id: 'research-activities',
    name: 'Research Activities',
    type: 'primitive',
    description: 'Find things to do',
    preconditions: ['has-destination'],
    effects: ['activities-researched'],
    duration: 4,
    resources: ['search-api', 'review-api'],
    status: 'pending',
    level: 2
  },
  {
    id: 'book-tours',
    name: 'Book Tours',
    type: 'primitive',
    description: 'Reserve tours and activities',
    preconditions: ['activities-researched'],
    effects: ['tours-booked'],
    duration: 2,
    resources: ['booking-api'],
    status: 'pending',
    level: 2
  },
  {
    id: 'arrange-rental-car',
    name: 'Arrange Rental Car',
    type: 'primitive',
    description: 'Book rental car',
    preconditions: ['has-license'],
    effects: ['car-rented'],
    duration: 2,
    resources: ['rental-api'],
    status: 'pending',
    level: 2
  },
  {
    id: 'book-train',
    name: 'Book Train',
    type: 'primitive',
    description: 'Reserve train tickets',
    preconditions: ['has-stations'],
    effects: ['train-booked'],
    duration: 2,
    resources: ['rail-api'],
    status: 'pending',
    level: 2
  }
];

const TRAVEL_METHODS: Method[] = [
  {
    id: 'method-plan-trip-full',
    name: 'Full Trip Planning',
    abstractTask: 'plan-trip',
    subtasks: ['arrange-transport', 'arrange-accommodation', 'plan-activities'],
    ordering: 'parallel',
    constraints: ['budget-available'],
    applicability: 0.9
  },
  {
    id: 'method-plan-trip-minimal',
    name: 'Minimal Trip Planning',
    abstractTask: 'plan-trip',
    subtasks: ['arrange-transport', 'arrange-accommodation'],
    ordering: 'sequential',
    constraints: ['limited-time'],
    applicability: 0.7
  },
  {
    id: 'method-transport-fly',
    name: 'Air Travel',
    abstractTask: 'arrange-transport',
    subtasks: ['search-flights', 'book-flight'],
    ordering: 'sequential',
    constraints: ['airport-available'],
    applicability: 0.85
  },
  {
    id: 'method-transport-drive',
    name: 'Road Trip',
    abstractTask: 'arrange-transport',
    subtasks: ['arrange-rental-car'],
    ordering: 'sequential',
    constraints: ['has-license', 'short-distance'],
    applicability: 0.6
  },
  {
    id: 'method-transport-train',
    name: 'Rail Travel',
    abstractTask: 'arrange-transport',
    subtasks: ['book-train'],
    ordering: 'sequential',
    constraints: ['rail-available'],
    applicability: 0.7
  },
  {
    id: 'method-accommodation-hotel',
    name: 'Hotel Stay',
    abstractTask: 'arrange-accommodation',
    subtasks: ['search-hotels', 'book-hotel'],
    ordering: 'sequential',
    constraints: ['hotels-available'],
    applicability: 0.9
  },
  {
    id: 'method-activities-full',
    name: 'Full Activity Planning',
    abstractTask: 'plan-activities',
    subtasks: ['research-activities', 'book-tours'],
    ordering: 'sequential',
    constraints: ['has-time'],
    applicability: 0.8
  },
  {
    id: 'method-activities-research',
    name: 'Research Only',
    abstractTask: 'plan-activities',
    subtasks: ['research-activities'],
    ordering: 'sequential',
    constraints: ['flexible-schedule'],
    applicability: 0.6
  }
];

// Manufacturing domain
const MANUFACTURING_TASKS: Task[] = [
  {
    id: 'manufacture-product',
    name: 'Manufacture Product',
    type: 'abstract',
    description: 'Complete product manufacturing',
    preconditions: ['order-received'],
    effects: ['product-manufactured'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 0
  },
  {
    id: 'prepare-materials',
    name: 'Prepare Materials',
    type: 'abstract',
    description: 'Prepare all required materials',
    preconditions: [],
    effects: ['materials-ready'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  {
    id: 'assemble-product',
    name: 'Assemble Product',
    type: 'abstract',
    description: 'Assemble product components',
    preconditions: ['materials-ready'],
    effects: ['product-assembled'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  {
    id: 'quality-control',
    name: 'Quality Control',
    type: 'abstract',
    description: 'Perform quality checks',
    preconditions: ['product-assembled'],
    effects: ['quality-verified'],
    duration: 0,
    resources: [],
    status: 'pending',
    level: 1
  },
  {
    id: 'check-inventory',
    name: 'Check Inventory',
    type: 'primitive',
    description: 'Verify material availability',
    preconditions: [],
    effects: ['inventory-checked'],
    duration: 1,
    resources: ['inventory-system'],
    status: 'pending',
    level: 2
  },
  {
    id: 'order-materials',
    name: 'Order Materials',
    type: 'primitive',
    description: 'Order missing materials',
    preconditions: ['inventory-checked'],
    effects: ['materials-ordered'],
    duration: 2,
    resources: ['procurement-system'],
    status: 'pending',
    level: 2
  },
  {
    id: 'cut-parts',
    name: 'Cut Parts',
    type: 'primitive',
    description: 'Cut raw materials to size',
    preconditions: ['materials-ready'],
    effects: ['parts-cut'],
    duration: 3,
    resources: ['cutting-machine'],
    status: 'pending',
    level: 2
  },
  {
    id: 'weld-components',
    name: 'Weld Components',
    type: 'primitive',
    description: 'Weld parts together',
    preconditions: ['parts-cut'],
    effects: ['components-welded'],
    duration: 4,
    resources: ['welding-station'],
    status: 'pending',
    level: 2
  },
  {
    id: 'paint-finish',
    name: 'Paint & Finish',
    type: 'primitive',
    description: 'Apply paint and finishing',
    preconditions: ['components-welded'],
    effects: ['product-finished'],
    duration: 3,
    resources: ['paint-booth'],
    status: 'pending',
    level: 2
  },
  {
    id: 'inspect-product',
    name: 'Inspect Product',
    type: 'primitive',
    description: 'Detailed inspection',
    preconditions: ['product-assembled'],
    effects: ['product-inspected'],
    duration: 2,
    resources: ['inspection-tools'],
    status: 'pending',
    level: 2
  },
  {
    id: 'test-product',
    name: 'Test Product',
    type: 'primitive',
    description: 'Functional testing',
    preconditions: ['product-inspected'],
    effects: ['product-tested'],
    duration: 3,
    resources: ['testing-equipment'],
    status: 'pending',
    level: 2
  }
];

const MANUFACTURING_METHODS: Method[] = [
  {
    id: 'method-manufacture-full',
    name: 'Full Manufacturing Process',
    abstractTask: 'manufacture-product',
    subtasks: ['prepare-materials', 'assemble-product', 'quality-control'],
    ordering: 'sequential',
    constraints: [],
    applicability: 0.95
  },
  {
    id: 'method-prepare-procure',
    name: 'Procure Materials',
    abstractTask: 'prepare-materials',
    subtasks: ['check-inventory', 'order-materials'],
    ordering: 'sequential',
    constraints: ['materials-not-available'],
    applicability: 0.7
  },
  {
    id: 'method-prepare-available',
    name: 'Use Available Materials',
    abstractTask: 'prepare-materials',
    subtasks: ['check-inventory'],
    ordering: 'sequential',
    constraints: ['materials-in-stock'],
    applicability: 0.9
  },
  {
    id: 'method-assemble-welded',
    name: 'Welded Assembly',
    abstractTask: 'assemble-product',
    subtasks: ['cut-parts', 'weld-components', 'paint-finish'],
    ordering: 'sequential',
    constraints: ['metal-product'],
    applicability: 0.85
  },
  {
    id: 'method-qc-full',
    name: 'Full Quality Control',
    abstractTask: 'quality-control',
    subtasks: ['inspect-product', 'test-product'],
    ordering: 'sequential',
    constraints: [],
    applicability: 0.95
  },
  {
    id: 'method-qc-inspection',
    name: 'Inspection Only',
    abstractTask: 'quality-control',
    subtasks: ['inspect-product'],
    ordering: 'sequential',
    constraints: ['low-risk-product'],
    applicability: 0.7
  }
];

const SAMPLE_PROBLEMS: PlanningProblem[] = [
  {
    id: 'vacation-planning',
    name: 'Vacation to Paris',
    description: 'Plan a week-long vacation to Paris',
    initialTask: 'plan-trip',
    initialState: {
      facts: new Set(['has-destination', 'has-dates', 'has-payment', 'has-airports', 'budget-available', 'has-time', 'hotels-available', 'airport-available']),
      resources: new Map([['search-api', 10], ['booking-api', 10], ['payment-system', 10]]),
      time: 0
    },
    goals: ['trip-planned', 'transport-arranged', 'accommodation-arranged'],
    complexity: 'moderate'
  },
  {
    id: 'quick-business-trip',
    name: 'Business Trip',
    description: 'Quick 2-day business trip',
    initialTask: 'plan-trip',
    initialState: {
      facts: new Set(['has-destination', 'has-dates', 'has-payment', 'has-airports', 'limited-time', 'hotels-available', 'airport-available']),
      resources: new Map([['search-api', 5], ['booking-api', 5], ['payment-system', 5]]),
      time: 0
    },
    goals: ['trip-planned'],
    complexity: 'simple'
  },
  {
    id: 'road-trip',
    name: 'Road Trip Adventure',
    description: 'Multi-city road trip',
    initialTask: 'plan-trip',
    initialState: {
      facts: new Set(['has-destination', 'has-dates', 'has-license', 'short-distance', 'budget-available', 'flexible-schedule']),
      resources: new Map([['search-api', 8], ['rental-api', 5]]),
      time: 0
    },
    goals: ['trip-planned'],
    complexity: 'moderate'
  },
  {
    id: 'product-manufacturing',
    name: 'Metal Product Assembly',
    description: 'Manufacture custom metal product',
    initialTask: 'manufacture-product',
    initialState: {
      facts: new Set(['order-received', 'metal-product', 'materials-not-available']),
      resources: new Map([['cutting-machine', 1], ['welding-station', 1], ['paint-booth', 1], ['testing-equipment', 1]]),
      time: 0
    },
    goals: ['product-manufactured', 'quality-verified'],
    complexity: 'complex'
  },
  {
    id: 'quick-assembly',
    name: 'Quick Assembly',
    description: 'Fast product assembly with available materials',
    initialTask: 'manufacture-product',
    initialState: {
      facts: new Set(['order-received', 'metal-product', 'materials-in-stock', 'low-risk-product']),
      resources: new Map([['cutting-machine', 1], ['welding-station', 1], ['paint-booth', 1]]),
      time: 0
    },
    goals: ['product-manufactured'],
    complexity: 'simple'
  }
];

export default function HTNPlanningDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'decomposing' | 'planning' | 'executing' | 'complete'>('idle');
  const [planTree, setPlanTree] = useState<PlanNode | null>(null);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const selectMethod = useCallback((task: Task, methods: Method[], worldState: WorldState): Method | null => {
    const applicableMethods = methods
      .filter(m => m.abstractTask === task.id)
      .filter(m => {
        // Check constraints against world state
        return m.constraints.every(c => worldState.facts.has(c));
      })
      .sort((a, b) => b.applicability - a.applicability);

    return applicableMethods.length > 0 ? applicableMethods[0] : null;
  }, []);

  const decomposePlan = useCallback(async (
    taskId: string,
    tasks: Map<string, Task>,
    methods: Map<string, Method>,
    worldState: WorldState,
    level: number = 0
  ): Promise<PlanNode> => {
    const task = tasks.get(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    addLog('decompose', `Decomposing: ${task.name} (Level ${level})`);

    const node: PlanNode = {
      taskId: task.id,
      children: [],
      status: 'pending'
    };

    if (task.type === 'abstract') {
      // Find applicable method
      const method = selectMethod(task, Array.from(methods.values()), worldState);

      if (method) {
        addLog('method', `Selected method: ${method.name} for ${task.name}`);
        node.methodId = method.id;

        // Recursively decompose subtasks
        for (const subtaskId of method.subtasks) {
          await new Promise(resolve => setTimeout(resolve, 300 / speed));
          const childNode = await decomposePlan(subtaskId, tasks, methods, worldState, level + 1);
          node.children.push(childNode);
        }
      } else {
        addLog('error', `No applicable method found for ${task.name}`);
        node.status = 'failed';
      }
    } else {
      // Primitive task - check preconditions
      const preconditionsMet = task.preconditions.every(p => worldState.facts.has(p));
      if (!preconditionsMet) {
        addLog('warning', `Preconditions not met for ${task.name}`);
      }
      addLog('primitive', `Added primitive task: ${task.name}`);
    }

    return node;
  }, [speed, addLog, selectMethod]);

  const executePlan = useCallback(async (node: PlanNode, tasks: Map<string, Task>, worldState: WorldState) => {
    const task = tasks.get(node.taskId);
    if (!task) return;

    node.status = 'active';
    setPlanTree(prev => ({ ...prev! }));

    if (task.type === 'primitive') {
      addLog('execute', `Executing: ${task.name}`);

      // Simulate execution time
      const executionTime = (task.duration * 1000) / speed;
      node.startTime = Date.now();

      await new Promise(resolve => setTimeout(resolve, executionTime));

      // Apply effects to world state
      task.effects.forEach(effect => worldState.facts.add(effect));

      node.endTime = Date.now();
      node.status = 'completed';

      addLog('complete', `Completed: ${task.name} (${task.duration}s)`);

      // Update progress
      setExecutionProgress(prev => prev + 1);
    } else {
      // Execute children based on ordering
      const method = node.methodId ? Array.from(TRAVEL_METHODS.concat(MANUFACTURING_METHODS)).find(m => m.id === node.methodId) : null;

      if (method) {
        if (method.ordering === 'sequential') {
          for (const child of node.children) {
            await executePlan(child, tasks, worldState);
          }
        } else if (method.ordering === 'parallel') {
          await Promise.all(node.children.map(child => executePlan(child, tasks, worldState)));
        }
      }

      node.status = 'completed';
    }

    setPlanTree(prev => ({ ...prev! }));
  }, [speed, addLog]);

  const runPlanning = useCallback(async () => {
    const problem = SAMPLE_PROBLEMS[selectedProblemIndex];
    const isManufacturing = problem.id.includes('manufacturing') || problem.id.includes('assembly');

    const tasks = new Map((isManufacturing ? MANUFACTURING_TASKS : TRAVEL_TASKS).map(t => [t.id, t]));
    const methods = new Map((isManufacturing ? MANUFACTURING_METHODS : TRAVEL_METHODS).map(m => [m.id, m]));

    setLogs([]);
    setPlanTree(null);
    setWorldState(problem.initialState);
    setExecutionProgress(0);
    setCurrentTasks(isManufacturing ? MANUFACTURING_TASKS : TRAVEL_TASKS);

    addLog('start', `Starting HTN planning for: ${problem.name}`);
    addLog('problem', problem.description);
    addLog('goals', `Goals: ${problem.goals.join(', ')}`);

    // Phase 1: Decompose the initial task
    setCurrentPhase('decomposing');
    addLog('phase', 'Phase 1: Hierarchical Decomposition');

    const plan = await decomposePlan(
      problem.initialTask,
      tasks,
      methods,
      problem.initialState,
      0
    );

    setPlanTree(plan);

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Plan validation
    setCurrentPhase('planning');
    addLog('phase', 'Phase 2: Plan Validation & Optimization');

    // Count total primitive tasks
    const countPrimitiveTasks = (node: PlanNode): number => {
      const task = tasks.get(node.taskId);
      if (task?.type === 'primitive') return 1;
      return node.children.reduce((sum, child) => sum + countPrimitiveTasks(child), 0);
    };

    const totalTasks = countPrimitiveTasks(plan);
    addLog('plan', `Generated plan with ${totalTasks} primitive tasks`);

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 3: Execute the plan
    setCurrentPhase('executing');
    addLog('phase', 'Phase 3: Plan Execution');

    await executePlan(plan, tasks, problem.initialState);

    // Check if goals are met
    const goalsMet = problem.goals.every(goal => problem.initialState.facts.has(goal));

    setCurrentPhase('complete');
    addLog('result', goalsMet ? 'All goals achieved successfully!' : 'Some goals were not achieved');
    addLog('complete', `Planning and execution completed`);
  }, [selectedProblemIndex, speed, addLog, decomposePlan, executePlan]);

  useEffect(() => {
    if (isRunning && currentPhase === 'idle') {
      runPlanning();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }
  }, [isRunning, currentPhase, runPlanning]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setPlanTree(null);
    setCurrentTasks([]);
    setWorldState(null);
    setExecutionProgress(0);
    setLogs([]);
  };

  const renderPlanNode = (node: PlanNode, tasks: Task[], depth: number = 0): React.ReactNode => {
    const task = tasks.find(t => t.id === node.taskId);
    if (!task) return null;

    return (
      <div key={node.taskId} className="ml-4">
        <div className="flex items-center gap-2 py-1">
          <div className={`w-3 h-3 rounded-full ${
            node.status === 'completed' ? 'bg-green-500' :
            node.status === 'active' ? 'bg-blue-500 animate-pulse' :
            node.status === 'failed' ? 'bg-red-500' :
            'bg-gray-600'
          }`} />
          <span className={`text-sm ${
            task.type === 'abstract' ? 'font-semibold text-purple-400' : 'text-gray-300'
          } ${node.status === 'active' ? 'text-white' : ''}`}>
            {task.name}
          </span>
          {task.type === 'primitive' && (
            <span className="text-xs text-gray-500">({task.duration}s)</span>
          )}
        </div>
        {node.children.length > 0 && (
          <div className="border-l border-gray-700 ml-1.5">
            {node.children.map(child => renderPlanNode(child, tasks, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">HTN Planning Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Problem:</label>
              <select
                value={selectedProblemIndex}
                onChange={(e) => setSelectedProblemIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {SAMPLE_PROBLEMS.map((problem, idx) => (
                  <option key={problem.id} value={idx}>
                    {problem.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={currentPhase === 'complete'}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 space-y-4">
            {/* Problem Details */}
            {SAMPLE_PROBLEMS[selectedProblemIndex] && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-semibold text-white">Problem Definition</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">{SAMPLE_PROBLEMS[selectedProblemIndex].description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">Complexity:</span>
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                      {SAMPLE_PROBLEMS[selectedProblemIndex].complexity}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">Goals:</span>
                    {SAMPLE_PROBLEMS[selectedProblemIndex].goals.map((goal, idx) => (
                      <span key={idx} className="bg-blue-900 px-2 py-1 rounded text-xs text-blue-300">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Plan Tree Visualization */}
            {planTree && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <h4 className="text-sm font-semibold text-white">Hierarchical Plan</h4>
                  {executionProgress > 0 && (
                    <span className="ml-auto text-xs text-gray-400">
                      Progress: {executionProgress} tasks completed
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  {renderPlanNode(planTree, currentTasks)}
                </div>
              </div>
            )}

            {/* World State */}
            {worldState && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-green-400" />
                  <h4 className="text-sm font-semibold text-white">World State</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Current Facts:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Array.from(worldState.facts).slice(0, 10).map((fact, idx) => (
                        <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                          {fact}
                        </span>
                      ))}
                      {worldState.facts.size > 10 && (
                        <span className="text-xs text-gray-500">+{worldState.facts.size - 10} more</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Resources:</span>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {Array.from(worldState.resources.entries()).map(([resource, count]) => (
                        <div key={resource} className="bg-gray-700 rounded p-1">
                          <span className="text-xs text-gray-400">{resource}:</span>
                          <span className="text-xs text-gray-300 ml-1">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-5">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-[600px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Planning Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'start' ? 'text-blue-400' :
                      log.type === 'phase' ? 'text-purple-400' :
                      log.type === 'decompose' ? 'text-cyan-400' :
                      log.type === 'method' ? 'text-indigo-400' :
                      log.type === 'primitive' ? 'text-green-400' :
                      log.type === 'execute' ? 'text-yellow-400' :
                      log.type === 'complete' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'warning' ? 'text-orange-400' :
                      log.type === 'result' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            {['decomposing', 'planning', 'executing', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase === 'decomposing' ? 'Decomposition' :
                   phase === 'planning' ? 'Planning' :
                   phase === 'executing' ? 'Execution' :
                   'Complete'}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['decomposing', 'planning', 'executing', 'complete'].indexOf(phase) <=
                      ['decomposing', 'planning', 'executing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['decomposing', 'planning', 'executing', 'complete'].indexOf(phase) <
                        ['decomposing', 'planning', 'executing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500 border-purple-400'
                        : 'bg-gray-800 border-gray-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}