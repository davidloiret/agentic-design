import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const chainOfThoughtPattern: PatternScenario = {
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
};