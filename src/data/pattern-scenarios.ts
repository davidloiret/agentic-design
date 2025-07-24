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
  },

  'sequential-chaining': {
    id: 'sequential-chaining',
    title: 'Sequential Chaining Pattern',
    description: 'Demonstrates linear workflow execution where each output feeds the next input',
    initialNodes: [
      {
        id: 'input',
        type: 'default',
        position: { x: 250, y: 50 },
        data: { label: 'Input Request\n"Write a product review for wireless headphones"' },
        style: { ...nodeStyle, minWidth: 250 }
      },
      {
        id: 'research',
        type: 'default',
        position: { x: 250, y: 180 },
        data: { label: 'Chain 1: Research Phase\nAnalyze product features' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: 'compare',
        type: 'default',
        position: { x: 250, y: 310 },
        data: { label: 'Chain 2: Comparison Phase\nCompare with competitors' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: 'write',
        type: 'default',
        position: { x: 250, y: 440 },
        data: { label: 'Chain 3: Writing Phase\nGenerate review content' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: 'edit',
        type: 'default',
        position: { x: 250, y: 570 },
        data: { label: 'Chain 4: Editing Phase\nImprove clarity and tone' },
        style: { ...nodeStyle, minWidth: 200 }
      },
      {
        id: 'output',
        type: 'default',
        position: { x: 250, y: 700 },
        data: { label: 'Final Output\nPolished Product Review' },
        style: { ...nodeStyle, background: '#059669', minWidth: 200 }
      },
      // Context flow nodes
      {
        id: 'context1',
        type: 'default',
        position: { x: 550, y: 180 },
        data: { label: 'Research Output\n• Noise cancellation: 95%\n• Battery life: 30hrs\n• Price: $299' },
        style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
      },
      {
        id: 'context2',
        type: 'default',
        position: { x: 550, y: 310 },
        data: { label: 'Comparison Output\n• Competitor A: $349, 25hrs\n• Competitor B: $279, 20hrs\n• Best value proposition' },
        style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
      },
      {
        id: 'context3',
        type: 'default',
        position: { x: 550, y: 440 },
        data: { label: 'Draft Review\n"Excellent headphones with\ngreat battery life..."' },
        style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
      },
      {
        id: 'context4',
        type: 'default',
        position: { x: 550, y: 570 },
        data: { label: 'Edited Review\nImproved flow, corrected\ngrammar, enhanced tone' },
        style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
      }
    ],
    initialEdges: [
      {
        id: 'e-input-research',
        source: 'input',
        target: 'research',
        style: edgeStyle
      },
      {
        id: 'e-research-compare',
        source: 'research',
        target: 'compare',
        style: edgeStyle
      },
      {
        id: 'e-compare-write',
        source: 'compare',
        target: 'write',
        style: edgeStyle
      },
      {
        id: 'e-write-edit',
        source: 'write',
        target: 'edit',
        style: edgeStyle
      },
      {
        id: 'e-edit-output',
        source: 'edit',
        target: 'output',
        style: edgeStyle
      },
      // Context flow edges
      {
        id: 'e-research-context1',
        source: 'research',
        target: 'context1',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-context1-compare',
        source: 'context1',
        target: 'compare',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-compare-context2',
        source: 'compare',
        target: 'context2',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-context2-write',
        source: 'context2',
        target: 'write',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-write-context3',
        source: 'write',
        target: 'context3',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-context3-edit',
        source: 'context3',
        target: 'edit',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      },
      {
        id: 'e-edit-context4',
        source: 'edit',
        target: 'context4',
        style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
      }
    ],
    steps: [
      {
        id: 'step1',
        title: 'Initial Request',
        description: 'User provides the task that needs to be accomplished through sequential processing.',
        input: 'Write a comprehensive product review for Sony WH-1000XM5 wireless headphones.',
        activeNodes: ['input'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Research Chain Activation',
        description: 'First chain analyzes product specifications, features, and technical details.',
        input: 'Product: Sony WH-1000XM5\nTask: Extract key features and specifications',
        activeNodes: ['input', 'research'],
        activeEdges: ['e-input-research']
      },
      {
        id: 'step3',
        title: 'Research Output Generation',
        description: 'Research chain produces structured data about the product features.',
        output: 'Features Analysis:\n• Noise Cancellation: Industry-leading ANC\n• Battery Life: 30 hours\n• Audio Quality: Hi-Res Audio certified\n• Price Point: $399 MSRP\n• Comfort: Lightweight design\n• Connectivity: Bluetooth 5.2, multipoint',
        activeNodes: ['research', 'context1'],
        activeEdges: ['e-research-context1']
      },
      {
        id: 'step4',
        title: 'Comparison Chain Activation',
        description: 'Second chain receives research output and performs competitive analysis.',
        input: 'Research data + Task: Compare with competitor products',
        activeNodes: ['context1', 'compare'],
        activeEdges: ['e-context1-compare']
      },
      {
        id: 'step5',
        title: 'Comparison Output Generation',
        description: 'Comparison chain generates competitive positioning analysis.',
        output: 'Competitive Analysis:\n• vs Bose QuietComfort 45: Better battery (30 vs 24hrs)\n• vs Apple AirPods Max: More affordable ($399 vs $549)\n• vs Sennheiser Momentum 4: Similar price, better ANC\n• Market Position: Premium tier, excellent value\n• Key Differentiators: Battery life + ANC quality',
        activeNodes: ['compare', 'context2'],
        activeEdges: ['e-compare-context2']
      },
      {
        id: 'step6',
        title: 'Writing Chain Activation',
        description: 'Third chain combines research and comparison data to create the review content.',
        input: 'Research data + Comparison analysis + Task: Write engaging review',
        activeNodes: ['context2', 'write'],
        activeEdges: ['e-context2-write']
      },
      {
        id: 'step7',
        title: 'Draft Review Generation',
        description: 'Writing chain produces the initial review draft.',
        output: 'Draft Review:\n\n"The Sony WH-1000XM5 headphones deliver exceptional performance in the premium wireless category. With industry-leading noise cancellation and impressive 30-hour battery life, they outperform competitors like the Bose QuietComfort 45. The Hi-Res Audio certification ensures superior sound quality, while the lightweight design provides all-day comfort. At $399, they offer excellent value compared to pricier alternatives like Apple\'s AirPods Max. The Bluetooth 5.2 connectivity with multipoint pairing adds practical convenience for daily use."',
        activeNodes: ['write', 'context3'],
        activeEdges: ['e-write-context3']
      },
      {
        id: 'step8',
        title: 'Editing Chain Activation',
        description: 'Fourth chain receives the draft and improves clarity, flow, and engagement.',
        input: 'Draft review + Task: Improve clarity, flow, and reader engagement',
        activeNodes: ['context3', 'edit'],
        activeEdges: ['e-context3-edit']
      },
      {
        id: 'step9',
        title: 'Final Polish and Enhancement',
        description: 'Editing chain refines the review for publication quality.',
        output: 'Editing Improvements:\n• Enhanced introduction hook\n• Improved paragraph transitions\n• Added specific use case examples\n• Strengthened conclusion with clear recommendation\n• Corrected grammar and enhanced readability\n• Added pros/cons structure for clarity',
        activeNodes: ['edit', 'context4'],
        activeEdges: ['e-edit-context4']
      },
      {
        id: 'step10',
        title: 'Final Polished Review',
        description: 'The complete sequential chain delivers a publication-ready product review.',
        output: 'Final Review:\n\n**Sony WH-1000XM5: Premium Wireless Excellence**\n\nIf you\'re searching for wireless headphones that deliver on every front, the Sony WH-1000XM5 should top your list. After extensive testing, these headphones prove why Sony dominates the premium audio market.\n\n**Standout Performance**\nThe noise cancellation is simply outstanding—whether you\'re on a busy flight or working in a noisy café, external sounds virtually disappear. The 30-hour battery life outshines competitors like the Bose QuietComfort 45 (24 hours), making these perfect for long trips or heavy daily use.\n\n**Superior Value**\nAt $399, they\'re significantly more affordable than Apple\'s AirPods Max ($549) while delivering comparable audio quality. The Hi-Res Audio certification isn\'t just marketing—you\'ll hear the difference in your favorite tracks.\n\n**Pros:**\n• Best-in-class noise cancellation\n• Exceptional 30-hour battery life\n• Lightweight, comfortable design\n• Excellent value vs competitors\n\n**Cons:**\n• Touch controls can be oversensitive\n• No wired audio when battery dies\n\n**Verdict:** The WH-1000XM5 headphones offer premium features at a reasonable price, making them an easy recommendation for anyone serious about audio quality.',
        activeNodes: ['output'],
        activeEdges: ['e-edit-output']
      }
    ]
  },

  'parallel-chaining': {
    id: 'parallel-chaining',
    title: 'Parallel Chaining Pattern',
    description: 'Demonstrates concurrent execution of multiple prompts with result aggregation',
    initialNodes: [
      {
        id: 'input',
        type: 'default',
        position: { x: 400, y: 50 },
        data: { label: 'Input Request\n"Market analysis for new AI product"' },
        style: { ...nodeStyle, minWidth: 250 }
      },
      {
        id: 'dispatcher',
        type: 'default',
        position: { x: 400, y: 180 },
        data: { label: 'Task Dispatcher\nDistribute to parallel chains' },
        style: { ...nodeStyle, minWidth: 200, background: '#ea580c' }
      },
      // Parallel chains
      {
        id: 'chain1',
        type: 'default',
        position: { x: 100, y: 310 },
        data: { label: 'Chain A: Competitor Analysis\nAnalyze market competitors' },
        style: { ...nodeStyle, minWidth: 180, background: '#059669' }
      },
      {
        id: 'chain2',
        type: 'default',
        position: { x: 300, y: 310 },
        data: { label: 'Chain B: Target Demographics\nIdentify user segments' },
        style: { ...nodeStyle, minWidth: 180, background: '#0891b2' }
      },
      {
        id: 'chain3',
        type: 'default',
        position: { x: 500, y: 310 },
        data: { label: 'Chain C: Market Trends\nAnalyze industry trends' },
        style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
      },
      {
        id: 'chain4',
        type: 'default',
        position: { x: 700, y: 310 },
        data: { label: 'Chain D: Regulatory\nCompliance requirements' },
        style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
      },
      // Results from parallel chains
      {
        id: 'result1',
        type: 'default',
        position: { x: 100, y: 440 },
        data: { label: 'Competitor Results\n• OpenAI: $80B valuation\n• Anthropic: $15B valuation\n• Google: Dominant search' },
        style: { ...nodeStyle, minWidth: 180, background: '#065f46' }
      },
      {
        id: 'result2',
        type: 'default',
        position: { x: 300, y: 440 },
        data: { label: 'Demographics Results\n• Developers: 40%\n• Enterprises: 35%\n• Researchers: 25%' },
        style: { ...nodeStyle, minWidth: 180, background: '#0c4a6e' }
      },
      {
        id: 'result3',
        type: 'default',
        position: { x: 500, y: 440 },
        data: { label: 'Trends Results\n• AI adoption: +300%\n• Automation demand: High\n• Privacy concerns: Rising' },
        style: { ...nodeStyle, minWidth: 180, background: '#581c87' }
      },
      {
        id: 'result4',
        type: 'default',
        position: { x: 700, y: 440 },
        data: { label: 'Regulatory Results\n• GDPR compliance needed\n• AI Act requirements\n• Data localization' },
        style: { ...nodeStyle, minWidth: 180, background: '#991b1b' }
      },
      {
        id: 'aggregator',
        type: 'default',
        position: { x: 400, y: 570 },
        data: { label: 'Result Aggregator\nCombine all insights' },
        style: { ...nodeStyle, minWidth: 200, background: '#ea580c' }
      },
      {
        id: 'synthesis',
        type: 'default',
        position: { x: 400, y: 700 },
        data: { label: 'Market Analysis Report\nComprehensive insights' },
        style: { ...nodeStyle, minWidth: 220, background: '#059669' }
      }
    ],
    initialEdges: [
      // Input to dispatcher
      {
        id: 'e-input-dispatcher',
        source: 'input',
        target: 'dispatcher',
        style: edgeStyle
      },
      // Dispatcher to parallel chains
      {
        id: 'e-dispatcher-chain1',
        source: 'dispatcher',
        target: 'chain1',
        style: { ...edgeStyle, stroke: '#059669' }
      },
      {
        id: 'e-dispatcher-chain2',
        source: 'dispatcher',
        target: 'chain2',
        style: { ...edgeStyle, stroke: '#0891b2' }
      },
      {
        id: 'e-dispatcher-chain3',
        source: 'dispatcher',
        target: 'chain3',
        style: { ...edgeStyle, stroke: '#7c3aed' }
      },
      {
        id: 'e-dispatcher-chain4',
        source: 'dispatcher',
        target: 'chain4',
        style: { ...edgeStyle, stroke: '#dc2626' }
      },
      // Chains to results
      {
        id: 'e-chain1-result1',
        source: 'chain1',
        target: 'result1',
        style: { ...edgeStyle, stroke: '#059669' }
      },
      {
        id: 'e-chain2-result2',
        source: 'chain2',
        target: 'result2',
        style: { ...edgeStyle, stroke: '#0891b2' }
      },
      {
        id: 'e-chain3-result3',
        source: 'chain3',
        target: 'result3',
        style: { ...edgeStyle, stroke: '#7c3aed' }
      },
      {
        id: 'e-chain4-result4',
        source: 'chain4',
        target: 'result4',
        style: { ...edgeStyle, stroke: '#dc2626' }
      },
      // Results to aggregator
      {
        id: 'e-result1-aggregator',
        source: 'result1',
        target: 'aggregator',
        style: edgeStyle
      },
      {
        id: 'e-result2-aggregator',
        source: 'result2',
        target: 'aggregator',
        style: edgeStyle
      },
      {
        id: 'e-result3-aggregator',
        source: 'result3',
        target: 'aggregator',
        style: edgeStyle
      },
      {
        id: 'e-result4-aggregator',
        source: 'result4',
        target: 'aggregator',
        style: edgeStyle
      },
      // Aggregator to final synthesis
      {
        id: 'e-aggregator-synthesis',
        source: 'aggregator',
        target: 'synthesis',
        style: edgeStyle
      }
    ],
    steps: [
      {
        id: 'step1',
        title: 'Market Analysis Request',
        description: 'User requests comprehensive market analysis requiring multiple research areas to be investigated simultaneously.',
        input: 'Conduct comprehensive market analysis for our new AI-powered productivity assistant targeting enterprise customers.',
        activeNodes: ['input'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Task Distribution',
        description: 'Dispatcher identifies parallel research areas and distributes tasks to specialized chains simultaneously.',
        input: 'Task breakdown:\n• Competitor landscape analysis\n• Target demographic research\n• Market trend analysis\n• Regulatory compliance review',
        activeNodes: ['input', 'dispatcher'],
        activeEdges: ['e-input-dispatcher']
      },
      {
        id: 'step3',
        title: 'Parallel Chain Activation',
        description: 'All four specialized chains begin processing their assigned research areas concurrently.',
        activeNodes: ['dispatcher', 'chain1', 'chain2', 'chain3', 'chain4'],
        activeEdges: ['e-dispatcher-chain1', 'e-dispatcher-chain2', 'e-dispatcher-chain3', 'e-dispatcher-chain4']
      },
      {
        id: 'step4',
        title: 'Competitor Analysis Complete',
        description: 'Chain A completes competitor research and provides market positioning insights.',
        output: 'Competitor Analysis Results:\n\n**Major Players:**\n• OpenAI (ChatGPT): $80B valuation, 100M+ users\n• Microsoft (Copilot): Integrated across Office suite\n• Google (Bard/Gemini): Search integration advantage\n• Anthropic (Claude): Focus on safety and reasoning\n\n**Market Gaps:**\n• Enterprise-specific workflow integration\n• Industry-specific customization\n• Advanced privacy controls\n\n**Pricing Analysis:**\n• Consumer: $20/month standard\n• Enterprise: $25-30/user/month\n• API costs: $0.01-0.06 per 1K tokens',
        activeNodes: ['chain1', 'result1'],
        activeEdges: ['e-chain1-result1']
      },
      {
        id: 'step5',
        title: 'Demographics Analysis Complete',
        description: 'Chain B finishes target audience research and segments potential users.',
        output: 'Target Demographics Results:\n\n**Primary Segments:**\n• Software Developers (40%): Code completion, debugging\n• Business Analysts (25%): Data analysis, reporting\n• Content Creators (20%): Writing, editing assistance\n• Executives (15%): Decision support, summarization\n\n**Geographic Distribution:**\n• North America: 45%\n• Europe: 30%\n• Asia-Pacific: 20%\n• Other regions: 5%\n\n**Company Size Preference:**\n• Enterprise (1000+ employees): 60%\n• Mid-market (100-999 employees): 30%\n• Small business (<100 employees): 10%',
        activeNodes: ['chain2', 'result2'],
        activeEdges: ['e-chain2-result2']
      },
      {
        id: 'step6',
        title: 'Market Trends Analysis Complete',
        description: 'Chain C provides comprehensive industry trend analysis and growth projections.',
        output: 'Market Trends Results:\n\n**Growth Metrics:**\n• AI productivity tools market: +300% YoY\n• Enterprise AI adoption: 78% (up from 35%)\n• Remote work tools demand: Sustained high\n\n**Emerging Trends:**\n• Multi-modal AI interfaces (text + voice + visual)\n• Industry-specific AI assistants\n• Real-time collaboration with AI\n• Privacy-first AI solutions\n\n**Technology Shifts:**\n• On-premise AI deployment growing\n• Edge computing for AI inference\n• Integration with existing enterprise systems\n\n**Investment Activity:**\n• $50B+ invested in AI productivity tools (2024)\n• Average funding round: $25M\n• 67% of enterprises planning AI tool procurement',
        activeNodes: ['chain3', 'result3'],
        activeEdges: ['e-chain3-result3']
      },
      {
        id: 'step7',
        title: 'Regulatory Analysis Complete',
        description: 'Chain D completes compliance and regulatory landscape review.',
        output: 'Regulatory Requirements Results:\n\n**Key Compliance Areas:**\n• GDPR (Europe): Data protection, right to explanation\n• CCPA (California): Consumer privacy rights\n• EU AI Act: High-risk AI system requirements\n• SOC 2 Type II: Enterprise security standards\n\n**Data Requirements:**\n• Data residency: 73% of enterprises require local storage\n• Audit trails: Mandatory for financial/healthcare sectors\n• Encryption: End-to-end encryption becoming standard\n\n**Liability Considerations:**\n• AI decision transparency requirements\n• Human oversight mandates\n• Error correction and appeal processes\n\n**Compliance Costs:**\n• Initial setup: $200K-500K\n• Annual compliance: $50K-150K\n• Risk of non-compliance: $10M+ fines',
        activeNodes: ['chain4', 'result4'],
        activeEdges: ['e-chain4-result4']
      },
      {
        id: 'step8',
        title: 'Result Aggregation',
        description: 'All parallel chain results are collected and prepared for synthesis into a comprehensive report.',
        input: 'Aggregating results from all parallel chains:\n• Competitor analysis data\n• Target demographics insights\n• Market trend projections\n• Regulatory compliance requirements',
        activeNodes: ['result1', 'result2', 'result3', 'result4', 'aggregator'],
        activeEdges: ['e-result1-aggregator', 'e-result2-aggregator', 'e-result3-aggregator', 'e-result4-aggregator']
      },
      {
        id: 'step9',
        title: 'Comprehensive Market Analysis',
        description: 'Final synthesis combines all parallel research into actionable market intelligence.',
        output: '# Comprehensive Market Analysis Report\n## AI-Powered Productivity Assistant\n\n### Executive Summary\nThe AI productivity tools market presents a $15B opportunity with 300% YoY growth. Our analysis reveals strong enterprise demand with clear differentiation opportunities.\n\n### Market Opportunity\n**Size & Growth:**\n• Total Addressable Market: $15B (2024)\n• Annual Growth Rate: 300%\n• Enterprise segment: $12B (80% of market)\n\n**Target Segments (Priority Order):**\n1. **Software Developers** (40% of market)\n   - Primary need: Code completion, debugging assistance\n   - Willingness to pay: $30-50/month\n   - Decision makers: Engineering leads, CTOs\n\n2. **Business Analysts** (25% of market)\n   - Primary need: Data analysis, automated reporting\n   - Willingness to pay: $25-40/month\n   - Decision makers: Data team leads, CDOs\n\n### Competitive Landscape\n**Direct Competitors:**\n• OpenAI ChatGPT: Consumer-focused, limited enterprise features\n• Microsoft Copilot: Strong integration, enterprise focused\n• Google Gemini: Search advantage, enterprise adoption growing\n\n**Differentiation Opportunities:**\n• Industry-specific customization (finance, healthcare, legal)\n• Advanced privacy controls and on-premise deployment\n• Seamless workflow integration beyond basic chat\n\n### Go-to-Market Strategy\n**Pricing Recommendation:**\n• Tier 1 (Basic): $25/user/month\n• Tier 2 (Professional): $45/user/month\n• Tier 3 (Enterprise): $75/user/month + custom features\n\n**Geographic Priority:**\n1. North America (45% of demand)\n2. Europe (30% of demand, high privacy requirements)\n3. Asia-Pacific (20% of demand, growing rapidly)\n\n### Risk Mitigation\n**Regulatory Compliance:**\n• Budget $300K for initial GDPR/AI Act compliance\n• Implement privacy-by-design architecture\n• Establish audit trail capabilities from day one\n\n**Competitive Response:**\n• Focus on enterprise workflow integration\n• Build industry-specific knowledge bases\n• Develop superior on-premise deployment options\n\n### Financial Projections\n**Year 1 Targets:**\n• 50 enterprise customers\n• $2.5M ARR\n• 25% market share in target segments\n\n**Investment Required:**\n• Product development: $5M\n• Compliance & security: $500K\n• Go-to-market: $3M\n• Total: $8.5M\n\n### Next Steps\n1. Validate findings with 20 target customer interviews\n2. Develop MVP focusing on developer and analyst segments\n3. Establish compliance framework before product launch\n4. Build strategic partnerships with system integrators',
        activeNodes: ['synthesis'],
        activeEdges: ['e-aggregator-synthesis']
      }
    ]
  }
};

export default patternScenarios;