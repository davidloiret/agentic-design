import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const metaLearningPattern: PatternScenario = {
  id: 'meta-learning',
  title: 'Meta-Learning Systems',
  initialNodes: [
    {
      id: 'new-task',
      position: { x: 400, y: 50 },
      data: { label: '🎯 New Task\n"Classify birds with only 5 examples:\nRobin, Sparrow, Eagle, Owl, Penguin"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Meta-Training Examples
    {
      id: 'past-task-1',
      position: { x: 50, y: 180 },
      data: { label: '📚 Past Task 1\nDog breeds:\n5 examples → 95% accuracy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'past-task-2',
      position: { x: 230, y: 180 },
      data: { label: '📚 Past Task 2\nCar types:\n5 examples → 92% accuracy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'past-task-3',
      position: { x: 410, y: 180 },
      data: { label: '📚 Past Task 3\nFlowers:\n5 examples → 94% accuracy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'past-task-4',
      position: { x: 590, y: 180 },
      data: { label: '📚 Past Task 4\nFruits:\n5 examples → 96% accuracy' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Meta-Learning Process
    {
      id: 'meta-knowledge',
      position: { x: 320, y: 300 },
      data: { label: '🧠 Meta-Knowledge\n"How to learn from few examples"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // New Task Processing
    {
      id: 'bird-examples',
      position: { x: 100, y: 420 },
      data: { label: '🐦 5 Bird Examples\n• Robin: small, red breast\n• Eagle: large, predator\n• Owl: nocturnal, round head' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'fast-adaptation',
      position: { x: 350, y: 420 },
      data: { label: '⚡ Fast Adaptation\n3 gradient steps\nUsing meta-knowledge' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'feature-extraction',
      position: { x: 580, y: 420 },
      data: { label: '🔍 Learn Features\n• Size patterns\n• Habitat clues\n• Physical traits' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Test
    {
      id: 'test-bird',
      position: { x: 250, y: 540 },
      data: { label: '❓ Test: New Bird\n"Small, yellow, sings"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'prediction',
      position: { x: 500, y: 540 },
      data: { label: '✅ Prediction\n"Canary - 89% confidence"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Result
    {
      id: 'success',
      position: { x: 400, y: 660 },
      data: { label: '🎉 Success!\nLearned to classify birds with just 5 examples\nin only 3 gradient updates!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Past tasks to meta-knowledge
    {
      id: 'task1-meta',
      source: 'past-task-1',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'task2-meta',
      source: 'past-task-2',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'task3-meta',
      source: 'past-task-3',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'task4-meta',
      source: 'past-task-4',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // New task flow
    {
      id: 'new-examples',
      source: 'new-task',
      target: 'bird-examples',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'examples-adapt',
      source: 'bird-examples',
      target: 'fast-adaptation',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'meta-adapt',
      source: 'meta-knowledge',
      target: 'fast-adaptation',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
      label: 'Guide',
    },
    {
      id: 'adapt-features',
      source: 'fast-adaptation',
      target: 'feature-extraction',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    // Testing
    {
      id: 'features-test',
      source: 'feature-extraction',
      target: 'test-bird',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'test-predict',
      source: 'test-bird',
      target: 'prediction',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    // Success
    {
      id: 'predict-success',
      source: 'prediction',
      target: 'success',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'New Task: Classify Birds',
      description: 'Need to learn bird classification with only 5 examples',
      activeNodes: ['new-task'],
      activeEdges: [],
    },
    {
      title: 'Meta-Knowledge from Past Tasks',
      description: 'Model learned "how to learn" from dogs, cars, flowers, fruits',
      activeNodes: ['past-task-1', 'past-task-2', 'past-task-3', 'past-task-4', 'meta-knowledge'],
      activeEdges: ['task1-meta', 'task2-meta', 'task3-meta', 'task4-meta'],
    },
    {
      title: 'Provide 5 Bird Examples',
      description: 'Show the model just 5 bird examples with labels',
      activeNodes: ['new-task', 'bird-examples'],
      activeEdges: ['new-examples'],
    },
    {
      title: 'Fast Adaptation',
      description: 'Use meta-knowledge to adapt in just 3 gradient steps',
      activeNodes: ['bird-examples', 'meta-knowledge', 'fast-adaptation'],
      activeEdges: ['examples-adapt', 'meta-adapt'],
    },
    {
      title: 'Extract Bird Features',
      description: 'Quickly learn relevant features: size, habitat, physical traits',
      activeNodes: ['fast-adaptation', 'feature-extraction'],
      activeEdges: ['adapt-features'],
    },
    {
      title: 'Test on New Bird',
      description: 'Present a new bird description to classify',
      activeNodes: ['feature-extraction', 'test-bird'],
      activeEdges: ['features-test'],
    },
    {
      title: 'Make Prediction',
      description: 'Classify the new bird with high confidence',
      activeNodes: ['test-bird', 'prediction'],
      activeEdges: ['test-predict'],
    },
    {
      title: 'Success!',
      description: 'Learned bird classification from just 5 examples in 3 updates',
      activeNodes: ['prediction', 'success'],
      activeEdges: ['predict-success'],
    },
  ],
};