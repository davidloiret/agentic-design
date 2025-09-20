import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const continualLearningPattern: PatternScenario = {
  id: 'continual-learning',
  title: 'Continual Learning',
  description: 'Adaptive learning system that acquires new knowledge over time while preventing catastrophic forgetting, using techniques like elastic weight consolidation and progressive neural networks.',
  initialNodes: [
    {
      id: 'assistant-v1',
      position: { x: 400, y: 50 },
      data: { label: '🤖 AI Assistant v1.0\nKnows: Weather, News, Sports' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 300 },
    },
    // New Tasks Over Time
    {
      id: 'task-1',
      position: { x: 50, y: 180 },
      data: { label: '📚 Month 1: Learn Cooking\nRecipes, techniques,\ningredients' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'task-2',
      position: { x: 250, y: 180 },
      data: { label: '🏥 Month 2: Learn Medicine\nSymptoms, treatments,\ndrugs' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'task-3',
      position: { x: 450, y: 180 },
      data: { label: '💰 Month 3: Learn Finance\nStocks, budgeting,\ntaxes' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'task-4',
      position: { x: 650, y: 180 },
      data: { label: '🎨 Month 4: Learn Art\nTechniques, history,\nstyles' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    // The Problem
    {
      id: 'catastrophic-forgetting',
      position: { x: 100, y: 320 },
      data: { label: '❌ Catastrophic Forgetting\n"What\'s the weather?"\n"I only know art now!"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 200 },
    },
    // Solutions
    {
      id: 'memory-replay',
      position: { x: 350, y: 320 },
      data: { label: '🔄 Memory Replay\nStore & review\npast examples' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    {
      id: 'elastic-weights',
      position: { x: 580, y: 320 },
      data: { label: '🔒 Elastic Weights\nProtect important\nparameters' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Implementation
    {
      id: 'knowledge-buffer',
      position: { x: 100, y: 460 },
      data: { label: '💾 Knowledge Buffer\n• Weather patterns\n• Recipe basics\n• Drug interactions' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'importance-weights',
      position: { x: 320, y: 460 },
      data: { label: '⚖️ Importance Scores\nWeather: 0.9\nSports: 0.7\nCooking: 0.8' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'task-boundaries',
      position: { x: 540, y: 460 },
      data: { label: '🎯 Task Detection\nIdentify when\nnew domain arrives' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Test Scenario
    {
      id: 'test-old',
      position: { x: 200, y: 580 },
      data: { label: '❓ Test Old Knowledge\n"What\'s the weather\nin Paris?"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'test-new',
      position: { x: 500, y: 580 },
      data: { label: '❓ Test New Knowledge\n"How to paint\nwatercolors?"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Success
    {
      id: 'assistant-v2',
      position: { x: 400, y: 700 },
      data: { label: '🎉 AI Assistant v2.0\nKnows: Weather + Cooking + Medicine + Finance + Art\nNo forgetting!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Learning sequence
    {
      id: 'v1-task1',
      source: 'assistant-v1',
      target: 'task-1',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'task1-task2',
      source: 'task-1',
      target: 'task-2',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'task2-task3',
      source: 'task-2',
      target: 'task-3',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'task3-task4',
      source: 'task-3',
      target: 'task-4',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    // Problem identification
    {
      id: 'task4-forgetting',
      source: 'task-4',
      target: 'catastrophic-forgetting',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
      label: 'Problem!',
    },
    // Solutions
    {
      id: 'forgetting-replay',
      source: 'catastrophic-forgetting',
      target: 'memory-replay',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'forgetting-elastic',
      source: 'catastrophic-forgetting',
      target: 'elastic-weights',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Implementation
    {
      id: 'replay-buffer',
      source: 'memory-replay',
      target: 'knowledge-buffer',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'elastic-importance',
      source: 'elastic-weights',
      target: 'importance-weights',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'replay-boundaries',
      source: 'memory-replay',
      target: 'task-boundaries',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'elastic-boundaries',
      source: 'elastic-weights',
      target: 'task-boundaries',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Testing
    {
      id: 'buffer-test-old',
      source: 'knowledge-buffer',
      target: 'test-old',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'importance-test-old',
      source: 'importance-weights',
      target: 'test-old',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'boundaries-test-new',
      source: 'task-boundaries',
      target: 'test-new',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Success
    {
      id: 'test-old-success',
      source: 'test-old',
      target: 'assistant-v2',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
      label: '✓ Remembers',
    },
    {
      id: 'test-new-success',
      source: 'test-new',
      target: 'assistant-v2',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
      label: '✓ Knows new',
    },
  ],
  steps: [
    {
      title: 'Starting Point',
      description: 'AI Assistant knows weather, news, and sports',
      activeNodes: ['assistant-v1'],
      activeEdges: [],
    },
    {
      title: 'Learning New Domains',
      description: 'Each month, learn a completely new domain',
      activeNodes: ['assistant-v1', 'task-1', 'task-2', 'task-3', 'task-4'],
      activeEdges: ['v1-task1', 'task1-task2', 'task2-task3', 'task3-task4'],
    },
    {
      title: 'The Problem: Catastrophic Forgetting',
      description: 'After learning art, the model forgets weather!',
      activeNodes: ['task-4', 'catastrophic-forgetting'],
      activeEdges: ['task4-forgetting'],
    },
    {
      title: 'Solution Strategies',
      description: 'Use memory replay and elastic weight consolidation',
      activeNodes: ['catastrophic-forgetting', 'memory-replay', 'elastic-weights'],
      activeEdges: ['forgetting-replay', 'forgetting-elastic'],
    },
    {
      title: 'Implementation Details',
      description: 'Store examples, protect important weights, detect task shifts',
      activeNodes: ['memory-replay', 'elastic-weights', 'knowledge-buffer', 'importance-weights', 'task-boundaries'],
      activeEdges: ['replay-buffer', 'elastic-importance', 'replay-boundaries', 'elastic-boundaries'],
    },
    {
      title: 'Test Old Knowledge',
      description: 'Can it still answer weather questions?',
      activeNodes: ['knowledge-buffer', 'importance-weights', 'test-old'],
      activeEdges: ['buffer-test-old', 'importance-test-old'],
    },
    {
      title: 'Test New Knowledge',
      description: 'Can it answer art questions too?',
      activeNodes: ['task-boundaries', 'test-new'],
      activeEdges: ['boundaries-test-new'],
    },
    {
      title: 'Success: Continual Learning',
      description: 'Knows all domains without forgetting!',
      activeNodes: ['test-old', 'test-new', 'assistant-v2'],
      activeEdges: ['test-old-success', 'test-new-success'],
    },
  ],
};