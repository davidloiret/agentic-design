import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const graphOfThoughtPattern: PatternScenario = {
  id: 'got',
  title: 'Graph-of-Thought (GoT)',
  description: 'Non-linear reasoning where thoughts are vertices and dependencies are edges in a dynamic graph structure',
  initialNodes: [
    {
      id: 'query',
      position: { x: 400, y: 50 },
      data: { label: '❓ Problem\n"How to reduce carbon\nfootprint of our\noffice building?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'energy-thought',
      position: { x: 150, y: 200 },
      data: { label: '💡 Energy Systems\n"Switch to renewable\nsources + efficiency"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'transport-thought',
      position: { x: 400, y: 200 },
      data: { label: '🚗 Transportation\n"Encourage public\ntransit + remote work"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'waste-thought',
      position: { x: 650, y: 200 },
      data: { label: '♻️ Waste Management\n"Implement recycling\n+ composting programs"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'dependency-1',
      position: { x: 275, y: 350 },
      data: { label: '🔗 Energy-Transport\n"Electric vehicle\ncharging stations"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'dependency-2',
      position: { x: 525, y: 350 },
      data: { label: '🔗 Transport-Waste\n"Reduce delivery\npackaging waste"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'synergy',
      position: { x: 400, y: 500 },
      data: { label: '✨ Synergistic Solution\n"Smart building system:\nSolar + EV charging +\nWaste-to-energy"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'feedback',
      position: { x: 150, y: 500 },
      data: { label: '🔄 Feedback Loop\n"Monitor & adjust\nbased on results"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 },
    },
    {
      id: 'final-plan',
      position: { x: 400, y: 650 },
      data: { label: '📋 Integrated Plan\n"30% reduction via\nsolar + transit + waste\nmanagement system"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'query',
      target: 'energy-thought',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2',
      source: 'query',
      target: 'transport-thought',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e3',
      source: 'query',
      target: 'waste-thought',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e4',
      source: 'energy-thought',
      target: 'dependency-1',
      ...edgeStyle,
      label: 'connects to'
    },
    {
      id: 'e5',
      source: 'transport-thought',
      target: 'dependency-1',
      ...edgeStyle,
      label: 'connects to'
    },
    {
      id: 'e6',
      source: 'transport-thought',
      target: 'dependency-2',
      ...edgeStyle,
      label: 'connects to'
    },
    {
      id: 'e7',
      source: 'waste-thought',
      target: 'dependency-2',
      ...edgeStyle,
      label: 'connects to'
    },
    {
      id: 'e8',
      source: 'dependency-1',
      target: 'synergy',
      ...edgeStyle,
      label: 'contributes'
    },
    {
      id: 'e9',
      source: 'dependency-2',
      target: 'synergy',
      ...edgeStyle,
      label: 'contributes'
    },
    {
      id: 'e10',
      source: 'waste-thought',
      target: 'synergy',
      ...edgeStyle,
      label: 'direct input'
    },
    {
      id: 'e11',
      source: 'synergy',
      target: 'feedback',
      ...edgeStyle,
      label: 'monitor'
    },
    {
      id: 'e12',
      source: 'feedback',
      target: 'energy-thought',
      ...edgeStyle,
      label: 'refine',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e13',
      source: 'synergy',
      target: 'final-plan',
      ...edgeStyle,
      label: 'formulate'
    },
  ],
  steps: [
    {
      title: "Multi-Dimensional Thought Generation",
      description: "Problem decomposed into independent thought vertices: energy systems, transportation, and waste management - each explored separately.",
      activeNodes: ['query', 'energy-thought', 'transport-thought', 'waste-thought'],
      activeEdges: ['e1', 'e2', 'e3']
    },
    {
      title: "Dependency Discovery",
      description: "Graph edges reveal unexpected connections: energy systems enable EV charging, transportation choices affect packaging waste.",
      activeNodes: ['dependency-1', 'dependency-2'],
      activeEdges: ['e4', 'e5', 'e6', 'e7']
    },
    {
      title: "Synergistic Synthesis",
      description: "Multiple thought paths converge into synergistic solution: smart building system integrating all three domains with multiplicative benefits.",
      activeNodes: ['synergy'],
      activeEdges: ['e8', 'e9', 'e10']
    },
    {
      title: "Non-Linear Feedback Integration",
      description: "Feedback loops allow backtracking and refinement - monitoring results can update original energy thoughts dynamically.",
      activeNodes: ['feedback'],
      activeEdges: ['e11', 'e12']
    },
    {
      title: "Graph-Informed Final Solution",
      description: "Solution emerges from graph structure: 30% carbon reduction through integrated approach impossible with linear thinking.",
      activeNodes: ['final-plan'],
      activeEdges: ['e13']
    }
  ]
};