import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const forestOfThoughtsPattern: PatternScenario = {
  id: 'forest-of-thoughts',
  title: 'Forest-of-Thoughts (FoT)',
  description: 'Generates multiple diverse reasoning trees in parallel to enhance solution robustness and explore different approaches',
  initialNodes: [
    {
      id: 'problem',
      position: { x: 400, y: 50 },
      data: { label: '❓ Problem\n"Design a sustainable\nwater management system\nfor drought-prone city"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
    // Tree 1: Conservation-Focused
    {
      id: 'tree1-root',
      position: { x: 100, y: 180 },
      data: { label: '🌳 Tree 1: Conservation\n"Focus on reducing\nwater usage"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'tree1-branch1',
      position: { x: 50, y: 280 },
      data: { label: '💧 Smart Meters\n"Real-time usage\nmonitoring"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 150 },
    },
    {
      id: 'tree1-branch2',
      position: { x: 150, y: 280 },
      data: { label: '🏠 Greywater Systems\n"Reuse shower/sink\nwater for irrigation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 150 },
    },
    {
      id: 'tree1-solution',
      position: { x: 100, y: 380 },
      data: { label: '✅ Solution 1\n"40% usage reduction\nvia smart conservation"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Tree 2: Supply-Focused
    {
      id: 'tree2-root',
      position: { x: 400, y: 180 },
      data: { label: '🌳 Tree 2: Supply\n"Focus on increasing\nwater sources"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'tree2-branch1',
      position: { x: 350, y: 280 },
      data: { label: '🌧️ Rainwater Harvesting\n"Capture & store\nrainfall"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 150 },
    },
    {
      id: 'tree2-branch2',
      position: { x: 450, y: 280 },
      data: { label: '🏭 Desalination\n"Convert seawater\nto freshwater"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 150 },
    },
    {
      id: 'tree2-solution',
      position: { x: 400, y: 380 },
      data: { label: '✅ Solution 2\n"60% supply increase\nvia new sources"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Tree 3: Tech-Focused
    {
      id: 'tree3-root',
      position: { x: 700, y: 180 },
      data: { label: '🌳 Tree 3: Technology\n"Focus on smart\nautomation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'tree3-branch1',
      position: { x: 650, y: 280 },
      data: { label: '📊 AI Prediction\n"Forecast demand\n& optimize flow"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    {
      id: 'tree3-branch2',
      position: { x: 750, y: 280 },
      data: { label: '💧 Smart Distribution\n"IoT sensors +\nautomatic valves"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    {
      id: 'tree3-solution',
      position: { x: 700, y: 380 },
      data: { label: '✅ Solution 3\n"30% efficiency gain\nvia smart systems"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Forest Integration
    {
      id: 'evaluation',
      position: { x: 400, y: 500 },
      data: { label: '⚖️ Cross-Tree Evaluation\n"Compare solutions:\nCost, Timeline, Impact"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },
    {
      id: 'hybrid-solution',
      position: { x: 400, y: 600 },
      data: { label: '🔗 Hybrid Forest Solution\n"Combine best elements:\nSmart meters + Rainwater\n+ AI optimization"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
    {
      id: 'robust-plan',
      position: { x: 400, y: 720 },
      data: { label: '🌟 Robust Final Plan\n"70% water security improvement\nthrough diversified approach\nwith fallback strategies"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },
  ],
  initialEdges: [
    // Problem to Trees
    {
      id: 'e1',
      source: 'problem',
      target: 'tree1-root',
      ...edgeStyle,
      label: 'approach 1'
    },
    {
      id: 'e2',
      source: 'problem',
      target: 'tree2-root',
      ...edgeStyle,
      label: 'approach 2'
    },
    {
      id: 'e3',
      source: 'problem',
      target: 'tree3-root',
      ...edgeStyle,
      label: 'approach 3'
    },
    // Tree 1 Structure
    {
      id: 'e4',
      source: 'tree1-root',
      target: 'tree1-branch1',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e5',
      source: 'tree1-root',
      target: 'tree1-branch2',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e6',
      source: 'tree1-branch1',
      target: 'tree1-solution',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'e7',
      source: 'tree1-branch2',
      target: 'tree1-solution',
      ...edgeStyle,
      label: 'combine'
    },
    // Tree 2 Structure
    {
      id: 'e8',
      source: 'tree2-root',
      target: 'tree2-branch1',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e9',
      source: 'tree2-root',
      target: 'tree2-branch2',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e10',
      source: 'tree2-branch1',
      target: 'tree2-solution',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'e11',
      source: 'tree2-branch2',
      target: 'tree2-solution',
      ...edgeStyle,
      label: 'combine'
    },
    // Tree 3 Structure
    {
      id: 'e12',
      source: 'tree3-root',
      target: 'tree3-branch1',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e13',
      source: 'tree3-root',
      target: 'tree3-branch2',
      ...edgeStyle,
      label: 'explore'
    },
    {
      id: 'e14',
      source: 'tree3-branch1',
      target: 'tree3-solution',
      ...edgeStyle,
      label: 'combine'
    },
    {
      id: 'e15',
      source: 'tree3-branch2',
      target: 'tree3-solution',
      ...edgeStyle,
      label: 'combine'
    },
    // Cross-Tree Integration
    {
      id: 'e16',
      source: 'tree1-solution',
      target: 'evaluation',
      ...edgeStyle,
      label: 'evaluate'
    },
    {
      id: 'e17',
      source: 'tree2-solution',
      target: 'evaluation',
      ...edgeStyle,
      label: 'evaluate'
    },
    {
      id: 'e18',
      source: 'tree3-solution',
      target: 'evaluation',
      ...edgeStyle,
      label: 'evaluate'
    },
    {
      id: 'e19',
      source: 'evaluation',
      target: 'hybrid-solution',
      ...edgeStyle,
      label: 'synthesize'
    },
    {
      id: 'e20',
      source: 'hybrid-solution',
      target: 'robust-plan',
      ...edgeStyle,
      label: 'finalize'
    },
  ],
  steps: [
    {
      title: "Parallel Tree Generation",
      description: "Problem spawns three diverse reasoning trees: Conservation-focused, Supply-focused, and Technology-focused approaches explored simultaneously.",
      activeNodes: ['problem', 'tree1-root', 'tree2-root', 'tree3-root'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Independent Branch Exploration",
      description: "Each tree explores different solution paths independently: smart meters vs greywater, rainwater vs desalination, AI vs IoT sensors.",
      activeNodes: ['tree1-branch1', 'tree1-branch2', 'tree2-branch1', 'tree2-branch2', 'tree3-branch1', 'tree3-branch2'],
      activeEdges: ['e4', 'e5', 'e8', 'e9', 'e12', 'e13']
    },
    {
      title: "Tree-Specific Solutions",
      description: "Each tree generates its own solution: 40% usage reduction, 60% supply increase, 30% efficiency gain - providing diverse options.",
      activeNodes: ['tree1-solution', 'tree2-solution', 'tree3-solution'],
      activeEdges: ['e6', 'e7', 'e10', 'e11', 'e14', 'e15']
    },
    {
      title: "Cross-Forest Evaluation",
      description: "All tree solutions evaluated together comparing cost, implementation timeline, and environmental impact across different approaches.",
      activeNodes: ['evaluation'],
      activeEdges: ['e16', 'e17', 'e18']
    },
    {
      title: "Forest Synthesis & Robustness",
      description: "Best elements from all trees combined: smart meters + rainwater harvesting + AI optimization creates superior hybrid solution with 70% improvement.",
      activeNodes: ['hybrid-solution', 'robust-plan'],
      activeEdges: ['e19', 'e20']
    }
  ]
};