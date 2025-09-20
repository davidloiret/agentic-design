import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const layeredDefensePattern: PatternScenario = {
  id: 'layered-defense',
  title: 'Layered Defense Pattern',
  description: 'Multi-layered security architecture implementing the Swiss Cheese Model for AI safety, where multiple independent safeguards prevent harmful outputs even if individual layers fail',
  initialNodes: [
    // Swiss Cheese Model Explanation
    {
      id: 'swiss-cheese-model',
      position: { x: 400, y: 50 },
      data: { label: '🧀 Swiss Cheese Model\n"Each layer has holes\nbut holes rarely align\nMultiple failures needed\nfor harm to get through"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },
    // Threat source
    {
      id: 'harmful-input',
      position: { x: 100, y: 150 },
      data: { label: '⚠️ Harmful Input\n"Generate instructions\nfor creating illegal\nsubstances"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Layer 1: Input Filtering
    {
      id: 'layer1-defense',
      position: { x: 300, y: 200 },
      data: { label: '🛡️ Layer 1: Input Filter\n"Blocks 90% of harmful requests\nKeyword detection"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'layer1-bypass',
      position: { x: 500, y: 200 },
      data: { label: '🕳️ 10% Bypass Layer 1\n"Euphemisms and\nindirect language\nslip through"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Layer 2: Intent Classification
    {
      id: 'layer2-defense',
      position: { x: 300, y: 300 },
      data: { label: '🧠 Layer 2: Intent Analysis\n"Blocks 80% of remaining\nDetects manipulation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'layer2-bypass',
      position: { x: 500, y: 300 },
      data: { label: '🕳️ 2% Bypass Layer 2\n"Academic framing\nfools classifier"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Layer 3: Generation Controls
    {
      id: 'layer3-defense',
      position: { x: 300, y: 400 },
      data: { label: '⚙️ Layer 3: Generation Controls\n"Blocks 90% of remaining\nConstitutional AI training"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'layer3-bypass',
      position: { x: 500, y: 400 },
      data: { label: '🕳️ 0.2% Bypass Layer 3\n"Novel patterns not\nin training data"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Layer 4: Output Scanning
    {
      id: 'layer4-defense',
      position: { x: 300, y: 500 },
      data: { label: '🔍 Layer 4: Output Scanner\n"Blocks 85% of remaining\nContent analysis"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'layer4-bypass',
      position: { x: 500, y: 500 },
      data: { label: '🕳️ 0.03% Bypass Layer 4\n"Subtle harmful\nimplications pass"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Layer 5: Human Oversight
    {
      id: 'layer5-defense',
      position: { x: 300, y: 600 },
      data: { label: '👥 Layer 5: Human Oversight\n"Blocks 80% of remaining\nManual review"' },
      style: { ...nodeStyle, background: '#f97316', minWidth: 200 },
    },
    {
      id: 'final-escape',
      position: { x: 500, y: 600 },
      data: { label: '⚠️ 0.006% Final Escape\n"Extremely rare case\nwhere all layers fail\nsimultaneously"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    // Success outcomes
    {
      id: 'threat-blocked',
      position: { x: 100, y: 450 },
      data: { label: '✅ 99.994% Threats Blocked\n"Layered defense\nsuccessfully prevents\nharm in vast majority"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    // Continuous improvement
    {
      id: 'feedback-improvement',
      position: { x: 400, y: 750 },
      data: { label: '🔄 Continuous Improvement\n"Learn from rare escapes\nStrengthen weak layers\nAdd new defenses"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },
  ],
  initialEdges: [
    // Swiss cheese model concept connection
    {
      id: 'e0',
      source: 'swiss-cheese-model',
      target: 'harmful-input',
      ...edgeStyle,
      label: 'demonstrates'
    },
    // Layer progression - harmful input attempts each layer
    {
      id: 'e1',
      source: 'harmful-input',
      target: 'layer1-defense',
      ...edgeStyle,
      label: '100% attempts'
    },
    {
      id: 'e1b',
      source: 'harmful-input',
      target: 'layer1-bypass',
      ...edgeStyle,
      label: '10% bypass',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    // Layer 1 to Layer 2
    {
      id: 'e2',
      source: 'layer1-bypass',
      target: 'layer2-defense',
      ...edgeStyle,
      label: 'reaches layer 2'
    },
    {
      id: 'e2b',
      source: 'layer1-bypass',
      target: 'layer2-bypass',
      ...edgeStyle,
      label: '2% total bypass',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    // Layer 2 to Layer 3
    {
      id: 'e3',
      source: 'layer2-bypass',
      target: 'layer3-defense',
      ...edgeStyle,
      label: 'reaches layer 3'
    },
    {
      id: 'e3b',
      source: 'layer2-bypass',
      target: 'layer3-bypass',
      ...edgeStyle,
      label: '0.2% total bypass',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    // Layer 3 to Layer 4
    {
      id: 'e4',
      source: 'layer3-bypass',
      target: 'layer4-defense',
      ...edgeStyle,
      label: 'reaches layer 4'
    },
    {
      id: 'e4b',
      source: 'layer3-bypass',
      target: 'layer4-bypass',
      ...edgeStyle,
      label: '0.03% total bypass',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    // Layer 4 to Layer 5
    {
      id: 'e5',
      source: 'layer4-bypass',
      target: 'layer5-defense',
      ...edgeStyle,
      label: 'reaches layer 5'
    },
    {
      id: 'e5b',
      source: 'layer4-bypass',
      target: 'final-escape',
      ...edgeStyle,
      label: '0.006% final escape',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    // Success path
    {
      id: 'e6',
      source: 'layer1-defense',
      target: 'threat-blocked',
      ...edgeStyle,
      label: '90% blocked here'
    },
    {
      id: 'e7',
      source: 'layer2-defense',
      target: 'threat-blocked',
      ...edgeStyle,
      label: '8% blocked here'
    },
    {
      id: 'e8',
      source: 'layer3-defense',
      target: 'threat-blocked',
      ...edgeStyle,
      label: '1.8% blocked here'
    },
    {
      id: 'e9',
      source: 'layer4-defense',
      target: 'threat-blocked',
      ...edgeStyle,
      label: '0.17% blocked here'
    },
    {
      id: 'e10',
      source: 'layer5-defense',
      target: 'threat-blocked',
      ...edgeStyle,
      label: '0.024% blocked here'
    },
    // Feedback and improvement
    {
      id: 'e11',
      source: 'final-escape',
      target: 'feedback-improvement',
      ...edgeStyle,
      label: 'learn from rare failures'
    },
    {
      id: 'e12',
      source: 'threat-blocked',
      target: 'feedback-improvement',
      ...edgeStyle,
      label: 'optimize defenses'
    },
    // Improvement feedback loops
    {
      id: 'e13',
      source: 'feedback-improvement',
      target: 'layer1-defense',
      ...edgeStyle,
      label: 'strengthen',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e14',
      source: 'feedback-improvement',
      target: 'layer3-defense',
      ...edgeStyle,
      label: 'strengthen',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Swiss Cheese Model Foundation",
      description: "Swiss Cheese Model demonstrates that each defense layer has vulnerabilities, but multiple independent layers prevent harm by making simultaneous failure extremely unlikely.",
      activeNodes: ['swiss-cheese-model', 'harmful-input'],
      activeEdges: ['e0']
    },
    {
      title: "Layered Defense Architecture",
      description: "Five independent defense layers create multiplicative protection: Layer 1 blocks 90%, Layer 2 blocks 80% of remainder, creating exponentially decreasing threat probability through each layer.",
      activeNodes: ['layer1-defense', 'layer2-defense', 'layer3-defense', 'layer4-defense', 'layer5-defense'],
      activeEdges: ['e1']
    },
    {
      title: "Vulnerability Bypass Progression",
      description: "Threats that bypass each layer face exponentially decreasing success rates: 10% → 2% → 0.2% → 0.03% → 0.006%, demonstrating how layered defenses compound effectiveness.",
      activeNodes: ['layer1-bypass', 'layer2-bypass', 'layer3-bypass', 'layer4-bypass', 'final-escape'],
      activeEdges: ['e1b', 'e2b', 'e3b', 'e4b', 'e5b']
    },
    {
      title: "Defense Success Statistics",
      description: "Vast majority of threats (99.994%) are successfully blocked across all layers, with most stopped at early layers. Only 0.006% extremely rare cases escape all defenses simultaneously.",
      activeNodes: ['threat-blocked'],
      activeEdges: ['e6', 'e7', 'e8', 'e9', 'e10']
    },
    {
      title: "Continuous Defense Evolution",
      description: "System learns from both rare failures and successful blocks to strengthen weak layers, patch discovered vulnerabilities, and add new defense mechanisms, further reducing escape probability.",
      activeNodes: ['feedback-improvement'],
      activeEdges: ['e11', 'e12', 'e13', 'e14']
    }
  ]
};