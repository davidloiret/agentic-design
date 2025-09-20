import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const metacognitiveMonitoringPattern: PatternScenario = {
  id: 'metacognitive-monitoring',
  title: 'Metacognitive Monitoring',
  description: 'Self-awareness and continuous monitoring of reasoning quality, confidence levels, and decision-making processes to improve performance',
  initialNodes: [
    {
      id: 'medical-diagnosis',
      position: { x: 400, y: 50 },
      data: { label: '🩺 Medical Case\n"Patient: chest pain,\nshortness of breath,\nfatigue for 3 days"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'initial-reasoning',
      position: { x: 400, y: 150 },
      data: { label: '💭 Initial Analysis\n"Could be cardiac,\npulmonary, or anxiety.\nNeed more data."' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'confidence-monitor',
      position: { x: 150, y: 250 },
      data: { label: '📊 Confidence Monitor\n"Current confidence: 30%\nInsufficient data for\nreliable diagnosis"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'knowledge-check',
      position: { x: 400, y: 250 },
      data: { label: '🧠 Knowledge Assessment\n"I know cardiac signs,\nbut need to verify\npulmonary embolism criteria"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'bias-detector',
      position: { x: 650, y: 250 },
      data: { label: '⚠️ Bias Check\n"Am I anchoring on\nheart attack? Consider\nother possibilities."' },
      style: { ...nodeStyle, background: '#f97316', minWidth: 180 },
    },
    {
      id: 'gather-vitals',
      position: { x: 400, y: 350 },
      data: { label: '📋 Data Collection\n"BP: 140/90, HR: 105\nO2 sat: 94%, Temp: 98.6°F\nECG: Normal sinus rhythm"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },
    {
      id: 'reasoning-quality',
      position: { x: 150, y: 450 },
      data: { label: '🎯 Reasoning Quality\n"Good: Systematic approach\nWeak: Need D-dimer test\nfor PE rule-out"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'updated-confidence',
      position: { x: 400, y: 450 },
      data: { label: '📈 Confidence Update\n"Now 60% confident:\nVitals suggest cardiac\nbut need troponin levels"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'uncertainty-flag',
      position: { x: 650, y: 450 },
      data: { label: '🚩 Uncertainty Alert\n"High-stakes decision\nwith moderate confidence\n→ Order more tests"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'lab-results',
      position: { x: 400, y: 550 },
      data: { label: '🧪 Lab Results\n"Troponin: Elevated\nD-dimer: Normal\n→ Cardiac event likely"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'meta-evaluation',
      position: { x: 400, y: 650 },
      data: { label: '🔍 Meta-Evaluation\n"My reasoning was sound:\n✓ Avoided anchoring bias\n✓ Gathered appropriate data"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    {
      id: 'final-diagnosis',
      position: { x: 400, y: 750 },
      data: { label: '✅ Diagnosis (Confidence: 85%)\n"Non-STEMI myocardial\ninfarction. Recommend\ncardiac catheterization."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },
    {
      id: 'learning-update',
      position: { x: 400, y: 850 },
      data: { label: '📚 Learning Integration\n"Remember: Normal ECG\ndoesn\'t rule out MI.\nTroponin is key marker."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'medical-diagnosis',
      target: 'initial-reasoning',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e2a',
      source: 'initial-reasoning',
      target: 'confidence-monitor',
      ...edgeStyle,
      label: 'assess confidence'
    },
    {
      id: 'e2b',
      source: 'initial-reasoning',
      target: 'knowledge-check',
      ...edgeStyle,
      label: 'check knowledge'
    },
    {
      id: 'e2c',
      source: 'initial-reasoning',
      target: 'bias-detector',
      ...edgeStyle,
      label: 'detect bias'
    },
    {
      id: 'e3',
      source: 'knowledge-check',
      target: 'gather-vitals',
      ...edgeStyle,
      label: 'need more data'
    },
    {
      id: 'e4a',
      source: 'gather-vitals',
      target: 'reasoning-quality',
      ...edgeStyle,
      label: 'evaluate reasoning'
    },
    {
      id: 'e4b',
      source: 'gather-vitals',
      target: 'updated-confidence',
      ...edgeStyle,
      label: 'update confidence'
    },
    {
      id: 'e4c',
      source: 'gather-vitals',
      target: 'uncertainty-flag',
      ...edgeStyle,
      label: 'flag uncertainty'
    },
    {
      id: 'e5',
      source: 'uncertainty-flag',
      target: 'lab-results',
      ...edgeStyle,
      label: 'order tests'
    },
    {
      id: 'e6',
      source: 'lab-results',
      target: 'meta-evaluation',
      ...edgeStyle,
      label: 'evaluate process'
    },
    {
      id: 'e7',
      source: 'meta-evaluation',
      target: 'final-diagnosis',
      ...edgeStyle,
      label: 'confident diagnosis'
    },
    {
      id: 'e8',
      source: 'final-diagnosis',
      target: 'learning-update',
      ...edgeStyle,
      label: 'integrate learning'
    },
    // Feedback loops
    {
      id: 'e9',
      source: 'confidence-monitor',
      target: 'gather-vitals',
      ...edgeStyle,
      label: 'low confidence',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
    {
      id: 'e10',
      source: 'reasoning-quality',
      target: 'updated-confidence',
      ...edgeStyle,
      label: 'quality check',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Initial Self-Assessment",
      description: "System analyzes medical case and immediately monitors its own confidence level (30%), knowledge gaps, and potential biases in reasoning.",
      activeNodes: ['medical-diagnosis', 'initial-reasoning', 'confidence-monitor', 'knowledge-check', 'bias-detector'],
      activeEdges: ['e1', 'e2a', 'e2b', 'e2c']
    },
    {
      title: "Knowledge-Driven Data Collection",
      description: "Based on self-assessed knowledge gaps and low confidence, system systematically gathers vital signs and ECG data.",
      activeNodes: ['gather-vitals'],
      activeEdges: ['e3', 'e9']
    },
    {
      title: "Multi-Dimensional Self-Monitoring",
      description: "System simultaneously evaluates its reasoning quality, updates confidence level (60%), and flags remaining uncertainty for high-stakes medical decision.",
      activeNodes: ['reasoning-quality', 'updated-confidence', 'uncertainty-flag'],
      activeEdges: ['e4a', 'e4b', 'e4c', 'e10']
    },
    {
      title: "Uncertainty-Driven Action",
      description: "High uncertainty flag triggers additional lab tests (troponin, D-dimer) rather than proceeding with moderate confidence diagnosis.",
      activeNodes: ['lab-results'],
      activeEdges: ['e5']
    },
    {
      title: "Meta-Cognitive Evaluation & Learning",
      description: "System evaluates its entire reasoning process, confirms sound methodology, makes confident diagnosis (85%), and integrates new learning about MI diagnosis.",
      activeNodes: ['meta-evaluation', 'final-diagnosis', 'learning-update'],
      activeEdges: ['e6', 'e7', 'e8']
    }
  ]
};