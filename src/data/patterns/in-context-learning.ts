import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const inContextLearningPattern: PatternScenario = {
  id: 'in-context-learning',
  title: 'In-Context Learning',
  initialNodes: [
    {
      id: 'task-query',
      position: { x: 400, y: 50 },
      data: { label: '❓ New Task\n"Translate: Hello → Bonjour"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },
    // Examples
    {
      id: 'example-1',
      position: { x: 100, y: 180 },
      data: { label: '📝 Example 1\nGood → Bon' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 150 },
    },
    {
      id: 'example-2',
      position: { x: 300, y: 180 },
      data: { label: '📝 Example 2\nThank you → Merci' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 150 },
    },
    {
      id: 'example-3',
      position: { x: 500, y: 180 },
      data: { label: '📝 Example 3\nGoodbye → Au revoir' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 150 },
    },
    {
      id: 'example-4',
      position: { x: 700, y: 180 },
      data: { label: '📝 Example 4\nYes → Oui' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 150 },
    },
    // Core Process
    {
      id: 'prompt-assembly',
      position: { x: 400, y: 320 },
      data: { label: '🔧 Prompt Assembly\nCombine examples + query' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 },
    },
    {
      id: 'pattern-recognition',
      position: { x: 400, y: 440 },
      data: { label: '🧠 Pattern Recognition\nLearn task from examples' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    {
      id: 'llm-processing',
      position: { x: 400, y: 560 },
      data: { label: '🤖 LLM Processing\nNo training needed!' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    // Variants
    {
      id: 'zero-shot',
      position: { x: 150, y: 680 },
      data: { label: '0️⃣ Zero-Shot\nNo examples' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 140 },
    },
    {
      id: 'few-shot',
      position: { x: 400, y: 680 },
      data: { label: '🔢 Few-Shot\n2-5 examples' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 140 },
    },
    {
      id: 'chain-of-thought',
      position: { x: 650, y: 680 },
      data: { label: '🔗 CoT\nWith reasoning' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 140 },
    },
    // Output
    {
      id: 'task-completion',
      position: { x: 400, y: 800 },
      data: { label: '✅ Answer\n"Hello → Bonjour"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },
  ],
  initialEdges: [
    // Examples to prompt
    {
      id: 'ex1-prompt',
      source: 'example-1',
      target: 'prompt-assembly',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'ex2-prompt',
      source: 'example-2',
      target: 'prompt-assembly',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'ex3-prompt',
      source: 'example-3',
      target: 'prompt-assembly',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'ex4-prompt',
      source: 'example-4',
      target: 'prompt-assembly',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Query to prompt
    {
      id: 'query-prompt',
      source: 'task-query',
      target: 'prompt-assembly',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Main flow
    {
      id: 'prompt-pattern',
      source: 'prompt-assembly',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'pattern-llm',
      source: 'pattern-recognition',
      target: 'llm-processing',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'llm-output',
      source: 'llm-processing',
      target: 'task-completion',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Variants
    {
      id: 'zero-llm',
      source: 'zero-shot',
      target: 'llm-processing',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'few-llm',
      source: 'few-shot',
      target: 'llm-processing',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
    {
      id: 'cot-llm',
      source: 'chain-of-thought',
      target: 'llm-processing',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
    },
  ],
  steps: [
    {
      title: 'New Task',
      description: 'User provides a new task to solve',
      activeNodes: ['task-query'],
      activeEdges: [],
    },
    {
      title: 'Provide Examples',
      description: 'Show the model similar input-output examples',
      activeNodes: ['task-query', 'example-1', 'example-2', 'example-3', 'example-4'],
      activeEdges: [],
    },
    {
      title: 'Combine Examples + Query',
      description: 'Assemble examples with the new task into a prompt',
      activeNodes: ['example-1', 'example-2', 'example-3', 'example-4', 'task-query', 'prompt-assembly'],
      activeEdges: ['ex1-prompt', 'ex2-prompt', 'ex3-prompt', 'ex4-prompt', 'query-prompt'],
    },
    {
      title: 'Pattern Recognition',
      description: 'Model identifies the pattern from examples',
      activeNodes: ['prompt-assembly', 'pattern-recognition'],
      activeEdges: ['prompt-pattern'],
    },
    {
      title: 'LLM Processing',
      description: 'Process without any training or fine-tuning',
      activeNodes: ['pattern-recognition', 'llm-processing'],
      activeEdges: ['pattern-llm'],
    },
    {
      title: 'Generate Answer',
      description: 'Apply learned pattern to generate the answer',
      activeNodes: ['llm-processing', 'task-completion'],
      activeEdges: ['llm-output'],
    },
    {
      title: 'ICL Variants',
      description: 'Different approaches: Zero-shot, Few-shot, Chain-of-Thought',
      activeNodes: ['zero-shot', 'few-shot', 'chain-of-thought', 'llm-processing'],
      activeEdges: ['zero-llm', 'few-llm', 'cot-llm'],
    },
  ],
};