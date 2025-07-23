import { Node, Edge } from 'reactflow';

export interface PatternScenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
  initialNodes: Node[];
  initialEdges: Edge[];
}

export interface ScenarioStep {
  id: string;
  title: string;
  description: string;
  input?: string;
  output?: string;
  activeNodes: string[];
  activeEdges: string[];
  newNodes?: Node[];
  newEdges?: Edge[];
  nodeUpdates?: { [nodeId: string]: Partial<Node> };
}

const nodeStyle = {
  background: '#1e293b',
  border: '1px solid #64748b',
  borderRadius: 8,
  color: '#ffffff',
  fontSize: 12,
  padding: 10,
  minWidth: 150,
};

const edgeStyle = {
  stroke: '#64748b',
  strokeWidth: 2,
};

export const patternScenarios: { [key: string]: PatternScenario } = {
  'cot': {
    id: 'cot',
    title: 'Chain of Thought (CoT) Pattern',
    description: 'Demonstrates step-by-step reasoning through a complex math problem',
    initialNodes: [
      {
        id: '1',
        type: 'default',
        position: { x: 50, y: 50 },
        data: { label: 'Complex Problem\n"What is 15% of 240 plus 30?"' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: '2',
        type: 'default',
        position: { x: 50, y: 180 },
        data: { label: 'Break Down Steps' },
        style: nodeStyle
      },
      {
        id: '3',
        type: 'default',
        position: { x: 50, y: 310 },
        data: { label: 'Step 1: Calculate 15% of 240' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: '4',
        type: 'default',
        position: { x: 50, y: 440 },
        data: { label: 'Step 2: Add 30 to result' },
        style: { ...nodeStyle, minWidth: 180 }
      },
      {
        id: '5',
        type: 'default',
        position: { x: 50, y: 570 },
        data: { label: 'Final Answer: 66' },
        style: { ...nodeStyle, background: '#059669' }
      }
    ],
    initialEdges: [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        style: edgeStyle
      },
      {
        id: 'e2-3',
        source: '2',
        target: '3',
        style: edgeStyle
      },
      {
        id: 'e3-4',
        source: '3',
        target: '4',
        style: edgeStyle
      },
      {
        id: 'e4-5',
        source: '4',
        target: '5',
        style: edgeStyle
      }
    ],
    steps: [
      {
        id: 'step1',
        title: 'Problem Analysis',
        description: 'AI receives a complex mathematical problem that requires multiple steps to solve.',
        input: 'What is 15% of 240 plus 30?',
        activeNodes: ['1'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Problem Decomposition',
        description: 'The AI recognizes this requires breaking down into smaller, manageable steps.',
        activeNodes: ['1', '2'],
        activeEdges: ['e1-2']
      },
      {
        id: 'step3',
        title: 'First Calculation',
        description: 'Calculate 15% of 240: 240 × 0.15 = 36',
        input: '15% of 240 = ?',
        output: '240 × 0.15 = 36',
        activeNodes: ['3'],
        activeEdges: ['e2-3']
      },
      {
        id: 'step4',
        title: 'Second Calculation',
        description: 'Add 30 to the previous result: 36 + 30 = 66',
        input: '36 + 30 = ?',
        output: '66',
        activeNodes: ['4'],
        activeEdges: ['e3-4']
      },
      {
        id: 'step5',
        title: 'Final Answer',
        description: 'The AI provides the complete solution with clear reasoning.',
        output: 'Final answer: 66\n\nReasoning:\n1. 15% of 240 = 36\n2. 36 + 30 = 66',
        activeNodes: ['5'],
        activeEdges: ['e4-5']
      }
    ]
  },

  'tot': {
    id: 'tot',
    title: 'Tree of Thoughts (ToT) Pattern',
    description: 'Shows parallel exploration of multiple solution paths with evaluation',
    initialNodes: [
      {
        id: 'problem',
        type: 'default',
        position: { x: 300, y: 50 },
        data: { label: 'Complex Problem\n"Plan optimal route for 5 cities"' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: 'generate',
        type: 'default',
        position: { x: 300, y: 180 },
        data: { label: 'Generate Multiple Approaches' },
        style: nodeStyle
      },
      {
        id: 'branch1',
        type: 'default',
        position: { x: 100, y: 310 },
        data: { label: 'Branch 1: Nearest Neighbor' },
        style: { ...nodeStyle, minWidth: 180 }
      },
      {
        id: 'branch2',
        type: 'default',
        position: { x: 300, y: 310 },
        data: { label: 'Branch 2: Shortest Path First' },
        style: { ...nodeStyle, minWidth: 180 }
      },
      {
        id: 'branch3',
        type: 'default',
        position: { x: 500, y: 310 },
        data: { label: 'Branch 3: Genetic Algorithm' },
        style: { ...nodeStyle, minWidth: 180 }
      },
      {
        id: 'eval1',
        type: 'default',
        position: { x: 100, y: 440 },
        data: { label: 'Evaluate: Distance = 450km' },
        style: { ...nodeStyle, minWidth: 160 }
      },
      {
        id: 'eval2',
        type: 'default',
        position: { x: 300, y: 440 },
        data: { label: 'Evaluate: Distance = 380km' },
        style: { ...nodeStyle, minWidth: 160 }
      },
      {
        id: 'eval3',
        type: 'default',
        position: { x: 500, y: 440 },
        data: { label: 'Evaluate: Distance = 420km' },
        style: { ...nodeStyle, minWidth: 160 }
      },
      {
        id: 'decision',
        type: 'default',
        position: { x: 300, y: 570 },
        data: { label: 'Best Path?\nShortest Path First' },
        style: { ...nodeStyle, background: '#ea580c' }
      },
      {
        id: 'continue',
        type: 'default',
        position: { x: 300, y: 700 },
        data: { label: 'Continue with Best Solution' },
        style: nodeStyle
      },
      {
        id: 'final',
        type: 'default',
        position: { x: 300, y: 830 },
        data: { label: 'Optimal Route: 380km' },
        style: { ...nodeStyle, background: '#059669' }
      }
    ],
    initialEdges: [
      { id: 'e-prob-gen', source: 'problem', target: 'generate', style: edgeStyle },
      { id: 'e-gen-b1', source: 'generate', target: 'branch1', style: edgeStyle },
      { id: 'e-gen-b2', source: 'generate', target: 'branch2', style: edgeStyle },
      { id: 'e-gen-b3', source: 'generate', target: 'branch3', style: edgeStyle },
      { id: 'e-b1-eval1', source: 'branch1', target: 'eval1', style: edgeStyle },
      { id: 'e-b2-eval2', source: 'branch2', target: 'eval2', style: edgeStyle },
      { id: 'e-b3-eval3', source: 'branch3', target: 'eval3', style: edgeStyle },
      { id: 'e-eval1-dec', source: 'eval1', target: 'decision', style: edgeStyle },
      { id: 'e-eval2-dec', source: 'eval2', target: 'decision', style: edgeStyle },
      { id: 'e-eval3-dec', source: 'eval3', target: 'decision', style: edgeStyle },
      { id: 'e-dec-cont', source: 'decision', target: 'continue', style: edgeStyle },
      { id: 'e-cont-final', source: 'continue', target: 'final', style: edgeStyle }
    ],
    steps: [
      {
        id: 'step1',
        title: 'Problem Introduction',
        description: 'Complex optimization problem requiring exploration of multiple solution strategies.',
        input: 'Find the optimal route visiting 5 cities: A, B, C, D, E with minimum total distance.',
        activeNodes: ['problem'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Strategy Generation',
        description: 'Generate multiple different algorithmic approaches to solve the traveling salesman problem.',
        activeNodes: ['problem', 'generate'],
        activeEdges: ['e-prob-gen']
      },
      {
        id: 'step3',
        title: 'Parallel Exploration',
        description: 'Explore three different algorithms simultaneously: Nearest Neighbor, Shortest Path First, and Genetic Algorithm.',
        activeNodes: ['generate', 'branch1', 'branch2', 'branch3'],
        activeEdges: ['e-gen-b1', 'e-gen-b2', 'e-gen-b3']
      },
      {
        id: 'step4',
        title: 'Solution Evaluation',
        description: 'Each branch calculates its solution and measures the total distance.',
        input: 'Calculate total distance for each route',
        output: 'Branch 1: 450km\nBranch 2: 380km\nBranch 3: 420km',
        activeNodes: ['eval1', 'eval2', 'eval3'],
        activeEdges: ['e-b1-eval1', 'e-b2-eval2', 'e-b3-eval3']
      },
      {
        id: 'step5',
        title: 'Best Path Selection',
        description: 'Compare all solutions and identify the branch with the shortest total distance.',
        activeNodes: ['decision'],
        activeEdges: ['e-eval1-dec', 'e-eval2-dec', 'e-eval3-dec']
      },
      {
        id: 'step6',
        title: 'Solution Refinement',
        description: 'Continue optimizing the best solution found (Shortest Path First approach).',
        activeNodes: ['continue'],
        activeEdges: ['e-dec-cont']
      },
      {
        id: 'step7',
        title: 'Final Optimal Solution',
        description: 'Present the optimal route with total distance of 380km.',
        output: 'Optimal route: A → C → E → B → D → A\nTotal distance: 380km',
        activeNodes: ['final'],
        activeEdges: ['e-cont-final']
      }
    ]
  },

  'react': {
    id: 'react',
    title: 'ReAct Pattern (Reasoning + Acting)',
    description: 'Shows the iterative cycle of thinking, acting, and observing results',
    initialNodes: [
      {
        id: 'task',
        type: 'default',
        position: { x: 250, y: 50 },
        data: { label: 'Task\n"Find current weather in Tokyo"' },
        style: { ...nodeStyle, minWidth: 180 }
      },
      {
        id: 'think1',
        type: 'default',
        position: { x: 250, y: 180 },
        data: { label: 'Thought: Need weather API' },
        style: { ...nodeStyle, background: '#ea580c' }
      },
      {
        id: 'act1',
        type: 'default',
        position: { x: 250, y: 310 },
        data: { label: 'Action: Search for weather API' },
        style: nodeStyle
      },
      {
        id: 'obs1',
        type: 'default',
        position: { x: 250, y: 440 },
        data: { label: 'Observation: Found OpenWeather API' },
        style: nodeStyle
      },
      {
        id: 'check1',
        type: 'default',
        position: { x: 250, y: 570 },
        data: { label: 'Goal Achieved?\nNot yet' },
        style: { ...nodeStyle, background: '#be123c' }
      },
      {
        id: 'think2',
        type: 'default',
        position: { x: 450, y: 440 },
        data: { label: 'Thought: Make API call' },
        style: { ...nodeStyle, background: '#ea580c' }
      },
      {
        id: 'act2',
        type: 'default',
        position: { x: 450, y: 310 },
        data: { label: 'Action: Call weather API' },
        style: nodeStyle
      },
      {
        id: 'obs2',
        type: 'default',
        position: { x: 450, y: 180 },
        data: { label: 'Observation: 22°C, Sunny' },
        style: nodeStyle
      },
      {
        id: 'final',
        type: 'default',
        position: { x: 350, y: 50 },
        data: { label: 'Final Answer: Tokyo is 22°C and sunny' },
        style: { ...nodeStyle, background: '#059669', minWidth: 200 }
      }
    ],
    initialEdges: [
      { id: 'e-task-think1', source: 'task', target: 'think1', style: edgeStyle },
      { id: 'e-think1-act1', source: 'think1', target: 'act1', style: edgeStyle },
      { id: 'e-act1-obs1', source: 'act1', target: 'obs1', style: edgeStyle },
      { id: 'e-obs1-check1', source: 'obs1', target: 'check1', style: edgeStyle },
      { id: 'e-check1-think2', source: 'check1', target: 'think2', style: edgeStyle },
      { id: 'e-think2-act2', source: 'think2', target: 'act2', style: edgeStyle },
      { id: 'e-act2-obs2', source: 'act2', target: 'obs2', style: edgeStyle },
      { id: 'e-obs2-final', source: 'obs2', target: 'final', style: edgeStyle }
    ],
    steps: [
      {
        id: 'step1',
        title: 'Task Understanding',
        description: 'AI receives a task that requires external information gathering.',
        input: 'Find current weather in Tokyo',
        activeNodes: ['task'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Initial Reasoning',
        description: 'AI thinks about what tools or APIs it needs to complete the task.',
        activeNodes: ['think1'],
        activeEdges: ['e-task-think1']
      },
      {
        id: 'step3',
        title: 'First Action',
        description: 'AI takes action to search for appropriate weather data sources.',
        output: 'Searching for weather API services...',
        activeNodes: ['act1'],
        activeEdges: ['e-think1-act1']
      },
      {
        id: 'step4',
        title: 'First Observation',
        description: 'AI observes the results of its search action.',
        output: 'Found OpenWeatherMap API - requires API key and city coordinates',
        activeNodes: ['obs1'],
        activeEdges: ['e-act1-obs1']
      },
      {
        id: 'step5',
        title: 'Goal Check',
        description: 'AI evaluates if the goal has been achieved - not yet, need actual weather data.',
        activeNodes: ['check1'],
        activeEdges: ['e-obs1-check1']
      },
      {
        id: 'step6',
        title: 'Next Reasoning',
        description: 'AI plans the next step: make actual API call to get current weather.',
        activeNodes: ['think2'],
        activeEdges: ['e-check1-think2']
      },
      {
        id: 'step7',
        title: 'API Call Action',
        description: 'AI makes the weather API call with Tokyo coordinates.',
        output: 'Calling: api.openweathermap.org/data/2.5/weather?q=Tokyo,jp',
        activeNodes: ['act2'],
        activeEdges: ['e-think2-act2']
      },
      {
        id: 'step8',
        title: 'Weather Data Observation',
        description: 'AI receives and processes the weather data from the API.',
        output: 'Temperature: 22°C\nCondition: Sunny\nHumidity: 65%',
        activeNodes: ['obs2'],
        activeEdges: ['e-act2-obs2']
      },
      {
        id: 'step9',
        title: 'Final Answer',
        description: 'AI provides the final answer with the current weather information.',
        output: 'The current weather in Tokyo is 22°C and sunny with 65% humidity.',
        activeNodes: ['final'],
        activeEdges: ['e-obs2-final']
      }
    ]
  }
};

export default patternScenarios;