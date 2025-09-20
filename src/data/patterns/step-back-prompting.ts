import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const stepBackPromptingPattern: PatternScenario = {
  id: 'step-back-prompting',
  title: 'Step-Back Prompting',
  description: 'Abstracts to higher-level principles and concepts before tackling specific problems, gaining broader perspective to improve solution quality',
  initialNodes: [
    {
      id: 'specific-problem',
      position: { x: 400, y: 50 },
      data: { label: '📐 Specific Problem\n"Calculate the area of\na trapezoid with bases\n12cm and 8cm, height 5cm"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'direct-approach',
      position: { x: 150, y: 150 },
      data: { label: '⚡ Direct Approach\n"Just apply trapezoid formula:\nA = ½(b₁ + b₂)h\nA = ½(12 + 8)5 = 50cm²"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },
    {
      id: 'step-back',
      position: { x: 400, y: 150 },
      data: { label: '🔄 Step Back\n"What higher-level concepts\napply here? What general\nprinciples govern area?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    // Higher-level principles
    {
      id: 'area-principles',
      position: { x: 400, y: 280 },
      data: { label: '📚 Area Principles\n"Area = space enclosed\nCan be decomposed\nCan be approximated\nUnits must be consistent"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'geometric-thinking',
      position: { x: 150, y: 380 },
      data: { label: '🔺 Geometric Decomposition\n"Complex shapes = \nsum of simple shapes\nTrapezoid = triangle + rectangle"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'approximation-thinking',
      position: { x: 400, y: 380 },
      data: { label: '📊 Approximation Methods\n"Average the bases\nMultiply by height\nEstimate vs exact"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'verification-thinking',
      position: { x: 650, y: 380 },
      data: { label: '✅ Verification Strategies\n"Multiple approaches\nshould yield same result\nCheck units and reasonableness"' },
      style: { ...nodeStyle, background: '#f97316', minWidth: 200 },
    },
    // Apply principles to specific problem
    {
      id: 'method-1-decompose',
      position: { x: 150, y: 520 },
      data: { label: '🔍 Method 1: Decompose\n"Split into rectangle + triangle\nRect: 8×5 = 40cm²\nTriangle: ½×4×5 = 10cm²\nTotal: 50cm²"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'method-2-average',
      position: { x: 400, y: 520 },
      data: { label: '🔍 Method 2: Average\n"Average bases: (12+8)÷2 = 10\nMultiply by height: 10×5\nResult: 50cm²"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'method-3-verify',
      position: { x: 650, y: 520 },
      data: { label: '🔍 Method 3: Verify\n"Use standard formula:\nA = ½(b₁ + b₂)h\nA = ½(12+8)×5 = 50cm²\n✓ All methods agree!"' },
      style: { ...nodeStyle, background: '#f97316', minWidth: 200 },
    },
    // Enhanced understanding
    {
      id: 'deeper-insight',
      position: { x: 400, y: 660 },
      data: { label: '💡 Deeper Insight\n"Trapezoid formula IS averaging!\n½(b₁ + b₂) = average base\nAll area methods connect\nto fundamental principles"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },
    {
      id: 'transferable-knowledge',
      position: { x: 400, y: 780 },
      data: { label: '🌟 Transferable Knowledge\n"These principles apply to:\n• Any polygon decomposition\n• Integration approximation\n• 3D volume problems"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
    // Contrast with direct approach
    {
      id: 'direct-limitation',
      position: { x: 150, y: 280 },
      data: { label: '❌ Direct Approach Limits\n"Formula memorization\nNo deeper understanding\nHard to verify\nNo transfer to new problems"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
  ],
  initialEdges: [
    {
      id: 'e1a',
      source: 'specific-problem',
      target: 'direct-approach',
      ...edgeStyle,
      label: 'immediate',
      style: { ...edgeStyle.style, strokeDasharray: '5,5', stroke: '#6b7280' }
    },
    {
      id: 'e1b',
      source: 'specific-problem',
      target: 'step-back',
      ...edgeStyle,
      label: 'step back first'
    },
    // Step back to principles
    {
      id: 'e2',
      source: 'step-back',
      target: 'area-principles',
      ...edgeStyle,
      label: 'identify principles'
    },
    // Derive approaches from principles
    {
      id: 'e3a',
      source: 'area-principles',
      target: 'geometric-thinking',
      ...edgeStyle,
      label: 'decomposition'
    },
    {
      id: 'e3b',
      source: 'area-principles',
      target: 'approximation-thinking',
      ...edgeStyle,
      label: 'approximation'
    },
    {
      id: 'e3c',
      source: 'area-principles',
      target: 'verification-thinking',
      ...edgeStyle,
      label: 'verification'
    },
    // Apply to specific problem
    {
      id: 'e4a',
      source: 'geometric-thinking',
      target: 'method-1-decompose',
      ...edgeStyle,
      label: 'apply'
    },
    {
      id: 'e4b',
      source: 'approximation-thinking',
      target: 'method-2-average',
      ...edgeStyle,
      label: 'apply'
    },
    {
      id: 'e4c',
      source: 'verification-thinking',
      target: 'method-3-verify',
      ...edgeStyle,
      label: 'apply'
    },
    // Synthesis
    {
      id: 'e5a',
      source: 'method-1-decompose',
      target: 'deeper-insight',
      ...edgeStyle,
      label: 'connect'
    },
    {
      id: 'e5b',
      source: 'method-2-average',
      target: 'deeper-insight',
      ...edgeStyle,
      label: 'connect'
    },
    {
      id: 'e5c',
      source: 'method-3-verify',
      target: 'deeper-insight',
      ...edgeStyle,
      label: 'connect'
    },
    // Transfer
    {
      id: 'e6',
      source: 'deeper-insight',
      target: 'transferable-knowledge',
      ...edgeStyle,
      label: 'generalize'
    },
    // Contrast
    {
      id: 'e7',
      source: 'direct-approach',
      target: 'direct-limitation',
      ...edgeStyle,
      label: 'limitations',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
  ],
  steps: [
    {
      title: "Problem Recognition & Step-Back Decision",
      description: "Encounters specific trapezoid area problem. Instead of applying formula directly, consciously steps back to explore higher-level principles governing area calculation.",
      activeNodes: ['specific-problem', 'step-back', 'direct-approach', 'direct-limitation'],
      activeEdges: ['e1a', 'e1b', 'e7']
    },
    {
      title: "Higher-Level Principle Identification",
      description: "Abstracts to fundamental area principles: area represents enclosed space, can be decomposed into simpler shapes, approximated through averaging, and verified through multiple methods.",
      activeNodes: ['area-principles'],
      activeEdges: ['e2']
    },
    {
      title: "Principle-Driven Approach Generation",
      description: "From abstract principles, derives three concrete approaches: geometric decomposition (split into simple shapes), approximation method (average bases), and verification strategy (multiple methods).",
      activeNodes: ['geometric-thinking', 'approximation-thinking', 'verification-thinking'],
      activeEdges: ['e3a', 'e3b', 'e3c']
    },
    {
      title: "Multiple Method Application",
      description: "Applies all three principle-based methods to specific problem: decomposition (40+10=50), averaging (10×5=50), formula verification (50), showing they all yield the same result.",
      activeNodes: ['method-1-decompose', 'method-2-average', 'method-3-verify'],
      activeEdges: ['e4a', 'e4b', 'e4c']
    },
    {
      title: "Deep Understanding & Knowledge Transfer",
      description: "Synthesizes methods to reveal that trapezoid formula IS averaging, connecting all approaches. This principle-based understanding transfers to polygon decomposition, integration, and 3D problems.",
      activeNodes: ['deeper-insight', 'transferable-knowledge'],
      activeEdges: ['e5a', 'e5b', 'e5c', 'e6']
    }
  ]
};