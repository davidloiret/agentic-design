import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const analogicalReasoningPattern: PatternScenario = {
  id: 'analogical-reasoning',
  title: 'Analogical Reasoning',
  description: 'Solves new problems by finding and applying similar patterns from known domains, transferring successful solutions across different contexts',
  initialNodes: [
    {
      id: 'new-problem',
      position: { x: 400, y: 50 },
      data: { label: '🚧 New Problem\n"How to manage traffic\ncongestion in city center\nduring rush hours?"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'analogy-search',
      position: { x: 400, y: 150 },
      data: { label: '🔍 Analogy Search Engine\n"Looking for similar patterns:\n- Flow control systems\n- Resource bottlenecks\n- Queue management"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    // Known domains with solutions
    {
      id: 'water-domain',
      position: { x: 150, y: 280 },
      data: { label: '💧 Water Systems\n"Pipes, valves, pressure\nFlow regulation\nBottleneck management"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'network-domain',
      position: { x: 400, y: 280 },
      data: { label: '🌐 Network Traffic\n"Bandwidth, routers, packets\nLoad balancing\nCongestion control"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'airline-domain',
      position: { x: 650, y: 280 },
      data: { label: '✈️ Airline Scheduling\n"Gates, runways, planes\nSlot management\nDelay minimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Pattern extraction
    {
      id: 'pattern-extraction',
      position: { x: 400, y: 400 },
      data: { label: '🧩 Pattern Extraction\n"Common structure:\nLimited capacity + High demand\n= Need flow control"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    // Specific analogies
    {
      id: 'water-analogy',
      position: { x: 150, y: 520 },
      data: { label: '🔄 Water → Traffic Mapping\n"Pipe diameter = Road capacity\nValve = Traffic light\nPressure = Congestion level"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'network-analogy',
      position: { x: 400, y: 520 },
      data: { label: '🔄 Network → Traffic Mapping\n"Router = Intersection\nPacket = Vehicle\nLoad balancer = Route optimizer"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'airline-analogy',
      position: { x: 650, y: 520 },
      data: { label: '🔄 Airline → Traffic Mapping\n"Runway slot = Road time slot\nGate = Parking space\nDelay cost = Congestion cost"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Solution synthesis
    {
      id: 'solution-synthesis',
      position: { x: 400, y: 650 },
      data: { label: '💡 Solution Synthesis\n"Combine insights:\n1. Dynamic pricing (airline)\n2. Load balancing (network)\n3. Flow control (water)"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 250 },
    },
    {
      id: 'adapted-solution',
      position: { x: 400, y: 780 },
      data: { label: '✅ Adapted Traffic Solution\n"Dynamic congestion pricing +\nSmart routing algorithms +\nAdaptive signal timing\n= 40% congestion reduction"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },
    // Validation
    {
      id: 'analogy-validation',
      position: { x: 100, y: 650 },
      data: { label: '✓ Validation Check\n"Do analogies hold?\n- Limited capacity ✓\n- Flow dynamics ✓\n- Control mechanisms ✓"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'boundary-awareness',
      position: { x: 700, y: 650 },
      data: { label: '⚠️ Boundary Awareness\n"Where analogies break:\n- Human behavior ≠ packets\n- Social equity concerns\n- Political constraints"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'new-problem',
      target: 'analogy-search',
      ...edgeStyle,
      label: 'search analogies'
    },
    // Search finds domains
    {
      id: 'e2a',
      source: 'analogy-search',
      target: 'water-domain',
      ...edgeStyle,
      label: 'flow similarity'
    },
    {
      id: 'e2b',
      source: 'analogy-search',
      target: 'network-domain',
      ...edgeStyle,
      label: 'congestion similarity'
    },
    {
      id: 'e2c',
      source: 'analogy-search',
      target: 'airline-domain',
      ...edgeStyle,
      label: 'scheduling similarity'
    },
    // Pattern extraction
    {
      id: 'e3a',
      source: 'water-domain',
      target: 'pattern-extraction',
      ...edgeStyle,
      label: 'extract patterns'
    },
    {
      id: 'e3b',
      source: 'network-domain',
      target: 'pattern-extraction',
      ...edgeStyle,
      label: 'extract patterns'
    },
    {
      id: 'e3c',
      source: 'airline-domain',
      target: 'pattern-extraction',
      ...edgeStyle,
      label: 'extract patterns'
    },
    // Create mappings
    {
      id: 'e4a',
      source: 'water-domain',
      target: 'water-analogy',
      ...edgeStyle,
      label: 'map concepts'
    },
    {
      id: 'e4b',
      source: 'network-domain',
      target: 'network-analogy',
      ...edgeStyle,
      label: 'map concepts'
    },
    {
      id: 'e4c',
      source: 'airline-domain',
      target: 'airline-analogy',
      ...edgeStyle,
      label: 'map concepts'
    },
    // Synthesis
    {
      id: 'e5a',
      source: 'water-analogy',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute insight'
    },
    {
      id: 'e5b',
      source: 'network-analogy',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute insight'
    },
    {
      id: 'e5c',
      source: 'airline-analogy',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute insight'
    },
    // Validation and boundaries
    {
      id: 'e6a',
      source: 'pattern-extraction',
      target: 'analogy-validation',
      ...edgeStyle,
      label: 'validate'
    },
    {
      id: 'e6b',
      source: 'pattern-extraction',
      target: 'boundary-awareness',
      ...edgeStyle,
      label: 'check limits'
    },
    {
      id: 'e7a',
      source: 'analogy-validation',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'confirmed valid'
    },
    {
      id: 'e7b',
      source: 'boundary-awareness',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'constrain solution'
    },
    // Final solution
    {
      id: 'e8',
      source: 'solution-synthesis',
      target: 'adapted-solution',
      ...edgeStyle,
      label: 'implement'
    },
  ],
  steps: [
    {
      title: "Problem Recognition & Analogy Search",
      description: "New traffic congestion problem triggers search for analogous domains with similar patterns: flow control systems, resource bottlenecks, and queue management.",
      activeNodes: ['new-problem', 'analogy-search', 'water-domain', 'network-domain', 'airline-domain'],
      activeEdges: ['e1', 'e2a', 'e2b', 'e2c']
    },
    {
      title: "Pattern Extraction Across Domains",
      description: "System identifies common abstract structure across all domains: limited capacity + high demand = need for flow control mechanisms.",
      activeNodes: ['pattern-extraction'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Concept Mapping & Analogical Transfer",
      description: "Creates specific mappings between domains and traffic: pipe diameter→road capacity, router→intersection, runway slot→road time slot.",
      activeNodes: ['water-analogy', 'network-analogy', 'airline-analogy'],
      activeEdges: ['e4a', 'e4b', 'e4c']
    },
    {
      title: "Analogy Validation & Boundary Detection",
      description: "Validates that core analogies hold (limited capacity, flow dynamics, control mechanisms) while identifying where analogies break (human behavior ≠ data packets).",
      activeNodes: ['analogy-validation', 'boundary-awareness'],
      activeEdges: ['e6a', 'e6b']
    },
    {
      title: "Multi-Domain Solution Synthesis",
      description: "Combines validated insights from all analogies: dynamic pricing (airline) + load balancing (network) + flow control (water) = comprehensive traffic solution achieving 40% congestion reduction.",
      activeNodes: ['solution-synthesis', 'adapted-solution'],
      activeEdges: ['e5a', 'e5b', 'e5c', 'e7a', 'e7b', 'e8']
    }
  ]
};