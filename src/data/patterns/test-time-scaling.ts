import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const testTimeScalingPattern: PatternScenario = {
  id: 'test-time-scaling',
  title: 'Test-Time Scaling',
  initialNodes: [
    {
      id: 'math-problem',
      position: { x: 400, y: 50 },
      data: { label: '🧮 Hard Math Problem\n"If a train travels 120km in 1.5 hours,\nand slows down by 25% for the next hour,\nwhat\'s the total distance?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
    // Standard Approach
    {
      id: 'standard-model',
      position: { x: 100, y: 180 },
      data: { label: '🤖 Standard Model\n(Same size: 7B params)' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'single-attempt',
      position: { x: 100, y: 300 },
      data: { label: '⚡ Quick Answer\n1 attempt\n0.5 seconds' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'wrong-answer',
      position: { x: 100, y: 420 },
      data: { label: '❌ Answer: 180km\n(Incorrect!)' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 150 },
    },
    // Test-Time Scaling
    {
      id: 'scaled-model',
      position: { x: 500, y: 180 },
      data: { label: '🧠 Test-Time Scaling\n(Same 7B model!)' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Multiple Attempts
    {
      id: 'attempt-1',
      position: { x: 350, y: 300 },
      data: { label: '📝 Attempt 1\n"120 + 60 = 180"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 140 },
    },
    {
      id: 'attempt-2',
      position: { x: 500, y: 300 },
      data: { label: '📝 Attempt 2\n"Speed: 80km/h\n80 × 2.5 = 200"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'attempt-3',
      position: { x: 650, y: 300 },
      data: { label: '📝 Attempt 3\n"120 + (80×0.75×1)\n= 120 + 60 = 180"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Verification Process
    {
      id: 'self-check',
      position: { x: 400, y: 420 },
      data: { label: '🔍 Self-Verification\nCheck each step\nRecalculate speed' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'consensus',
      position: { x: 600, y: 420 },
      data: { label: '🗳️ Majority Vote\n2 out of 3 say 180km' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Reasoning Chain
    {
      id: 'step-by-step',
      position: { x: 500, y: 540 },
      data: { label: '📋 Step-by-Step\n1. Speed = 120/1.5 = 80km/h\n2. Slow 25% = 60km/h\n3. Distance = 60 × 1 = 60km\n4. Total = 120 + 60 = 180km' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 250 },
    },
    // Comparison
    {
      id: 'compute-standard',
      position: { x: 150, y: 660 },
      data: { label: '⚡ Standard\nCompute: 1x\nTime: 0.5s\nAccuracy: 40%' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 140 },
    },
    {
      id: 'compute-scaled',
      position: { x: 550, y: 660 },
      data: { label: '🚀 Test-Time Scaled\nCompute: 10x\nTime: 5s\nAccuracy: 85%' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Final Answer
    {
      id: 'correct-answer',
      position: { x: 400, y: 780 },
      data: { label: '✅ Correct Answer: 180km\nUsing same 7B model, just more thinking time!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Standard approach
    {
      id: 'problem-standard',
      source: 'math-problem',
      target: 'standard-model',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'standard-single',
      source: 'standard-model',
      target: 'single-attempt',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'single-wrong',
      source: 'single-attempt',
      target: 'wrong-answer',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 2 },
      animated: true,
    },
    // Test-time scaling approach
    {
      id: 'problem-scaled',
      source: 'math-problem',
      target: 'scaled-model',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'scaled-attempt1',
      source: 'scaled-model',
      target: 'attempt-1',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'scaled-attempt2',
      source: 'scaled-model',
      target: 'attempt-2',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'scaled-attempt3',
      source: 'scaled-model',
      target: 'attempt-3',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Verification
    {
      id: 'attempts-check',
      source: 'attempt-2',
      target: 'self-check',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'attempt1-check',
      source: 'attempt-1',
      target: 'self-check',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'attempt3-check',
      source: 'attempt-3',
      target: 'self-check',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'check-consensus',
      source: 'self-check',
      target: 'consensus',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Reasoning
    {
      id: 'consensus-steps',
      source: 'consensus',
      target: 'step-by-step',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    // Comparison
    {
      id: 'wrong-compute',
      source: 'wrong-answer',
      target: 'compute-standard',
      style: { ...edgeStyle, stroke: '#dc2626' },
    },
    {
      id: 'steps-compute',
      source: 'step-by-step',
      target: 'compute-scaled',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Final answer
    {
      id: 'compute-correct',
      source: 'compute-scaled',
      target: 'correct-answer',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Math Problem',
      description: 'A train speed problem requiring multi-step reasoning',
      activeNodes: ['math-problem'],
      activeEdges: [],
    },
    {
      title: 'Standard Approach',
      description: 'Model gives quick answer with single attempt',
      activeNodes: ['math-problem', 'standard-model', 'single-attempt'],
      activeEdges: ['problem-standard', 'standard-single'],
    },
    {
      title: 'Wrong Answer',
      description: 'Quick answer is incorrect - missed the speed reduction',
      activeNodes: ['single-attempt', 'wrong-answer'],
      activeEdges: ['single-wrong'],
    },
    {
      title: 'Test-Time Scaling',
      description: 'Same 7B model, but generate multiple attempts',
      activeNodes: ['math-problem', 'scaled-model', 'attempt-1', 'attempt-2', 'attempt-3'],
      activeEdges: ['problem-scaled', 'scaled-attempt1', 'scaled-attempt2', 'scaled-attempt3'],
    },
    {
      title: 'Self-Verification',
      description: 'Model checks its own work and finds consensus',
      activeNodes: ['attempt-1', 'attempt-2', 'attempt-3', 'self-check', 'consensus'],
      activeEdges: ['attempt1-check', 'attempts-check', 'attempt3-check', 'check-consensus'],
    },
    {
      title: 'Step-by-Step Reasoning',
      description: 'Break down the problem with detailed steps',
      activeNodes: ['consensus', 'step-by-step'],
      activeEdges: ['consensus-steps'],
    },
    {
      title: 'Compute Comparison',
      description: '10x more compute at inference = 2x better accuracy',
      activeNodes: ['wrong-answer', 'compute-standard', 'step-by-step', 'compute-scaled'],
      activeEdges: ['wrong-compute', 'steps-compute'],
    },
    {
      title: 'Correct Answer',
      description: 'Same model size, just more thinking time!',
      activeNodes: ['compute-scaled', 'correct-answer'],
      activeEdges: ['compute-correct'],
    },
  ],
};