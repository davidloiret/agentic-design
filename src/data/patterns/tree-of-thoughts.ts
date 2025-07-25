import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const treeOfThoughtsPattern: PatternScenario = {
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
};