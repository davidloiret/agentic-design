import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const abductiveReasoningPattern: PatternScenario = {
  id: 'abductive-reasoning',
  title: 'Abductive Reasoning',
  description: 'Infers the most likely explanation from incomplete observations by generating and evaluating competing hypotheses to find the best fit',
  initialNodes: [
    {
      id: 'incomplete-observations',
      position: { x: 400, y: 50 },
      data: { label: '🕵️ Incomplete Observations\n"Server crashed at 3AM\nHigh CPU usage logged\nNew deployment yesterday\nNo error logs found"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 250 },
    },
    {
      id: 'hypothesis-generation',
      position: { x: 400, y: 170 },
      data: { label: '💡 Hypothesis Generation\n"Multiple explanations possible\nNeed to find BEST fit\nfor observed evidence"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    // Competing hypotheses
    {
      id: 'code-bug-hypothesis',
      position: { x: 150, y: 300 },
      data: { label: '🐛 Hypothesis 1: Code Bug\n"New deployment introduced\nmemory leak causing\ngradual CPU spike"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'attack-hypothesis',
      position: { x: 400, y: 300 },
      data: { label: '⚔️ Hypothesis 2: Cyber Attack\n"DDoS or malicious code\ncausing resource\nexhaustion"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'hardware-hypothesis',
      position: { x: 650, y: 300 },
      data: { label: '💻 Hypothesis 3: Hardware\n"Cooling fan failure\ncausing thermal throttling\nand system instability"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Evidence evaluation
    {
      id: 'evidence-evaluation',
      position: { x: 400, y: 430 },
      data: { label: '⚖️ Evidence Evaluation\n"Which hypothesis BEST\nexplains ALL observations?\nConsider fit & simplicity"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    // Detailed analysis per hypothesis
    {
      id: 'code-analysis',
      position: { x: 150, y: 560 },
      data: { label: '🔍 Code Bug Analysis\n"✓ Timing fits deployment\n✓ Explains CPU spike\n? Missing error logs odd\nLikelihood: 70%"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'attack-analysis',
      position: { x: 400, y: 560 },
      data: { label: '🔍 Attack Analysis\n"? No network anomalies\n? No security alerts\n? High CPU unusual pattern\nLikelihood: 20%"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'hardware-analysis',
      position: { x: 650, y: 560 },
      data: { label: '🔍 Hardware Analysis\n"? CPU usage, not thermal\n? No temperature alerts\n? Recent deployment timing\nLikelihood: 10%"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Best explanation
    {
      id: 'best-explanation',
      position: { x: 400, y: 690 },
      data: { label: '🎯 Best Explanation\n"Code bug most likely:\n- Fits timing evidence\n- Explains symptoms\n- Simplest explanation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    // Abductive inference
    {
      id: 'abductive-inference',
      position: { x: 400, y: 810 },
      data: { label: '💭 Abductive Inference\n"Given incomplete evidence,\ncode bug in new deployment\nis most plausible cause\nof server crash"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },
    // Additional evidence discovery
    {
      id: 'seek-confirmation',
      position: { x: 100, y: 690 },
      data: { label: '🔍 Seek Confirmation\n"Check code diff from\nyesterday\'s deployment\nfor memory-intensive ops"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 },
    },
    {
      id: 'confirmation-found',
      position: { x: 100, y: 810 },
      data: { label: '✅ Confirmation\n"Found infinite loop in\nnew batch processing\ncode → Validates hypothesis"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Contrast with other reasoning types
    {
      id: 'deductive-contrast',
      position: { x: 700, y: 690 },
      data: { label: '📐 vs Deductive\n"Would need complete\nknowledge to deduce\ncause with certainty"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 },
    },
    {
      id: 'inductive-contrast',
      position: { x: 700, y: 810 },
      data: { label: '📊 vs Inductive\n"Would need many\nsimilar cases to find\ngeneral pattern"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'incomplete-observations',
      target: 'hypothesis-generation',
      ...edgeStyle,
      label: 'generate explanations'
    },
    // Generate hypotheses
    {
      id: 'e2a',
      source: 'hypothesis-generation',
      target: 'code-bug-hypothesis',
      ...edgeStyle,
      label: 'possibility 1'
    },
    {
      id: 'e2b',
      source: 'hypothesis-generation',
      target: 'attack-hypothesis',
      ...edgeStyle,
      label: 'possibility 2'
    },
    {
      id: 'e2c',
      source: 'hypothesis-generation',
      target: 'hardware-hypothesis',
      ...edgeStyle,
      label: 'possibility 3'
    },
    // Evaluate evidence
    {
      id: 'e3a',
      source: 'code-bug-hypothesis',
      target: 'evidence-evaluation',
      ...edgeStyle,
      label: 'evaluate fit'
    },
    {
      id: 'e3b',
      source: 'attack-hypothesis',
      target: 'evidence-evaluation',
      ...edgeStyle,
      label: 'evaluate fit'
    },
    {
      id: 'e3c',
      source: 'hardware-hypothesis',
      target: 'evidence-evaluation',
      ...edgeStyle,
      label: 'evaluate fit'
    },
    // Detailed analysis
    {
      id: 'e4a',
      source: 'evidence-evaluation',
      target: 'code-analysis',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e4b',
      source: 'evidence-evaluation',
      target: 'attack-analysis',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e4c',
      source: 'evidence-evaluation',
      target: 'hardware-analysis',
      ...edgeStyle,
      label: 'analyze'
    },
    // Best explanation
    {
      id: 'e5a',
      source: 'code-analysis',
      target: 'best-explanation',
      ...edgeStyle,
      label: 'highest likelihood'
    },
    {
      id: 'e5b',
      source: 'attack-analysis',
      target: 'best-explanation',
      ...edgeStyle,
      label: 'lower likelihood'
    },
    {
      id: 'e5c',
      source: 'hardware-analysis',
      target: 'best-explanation',
      ...edgeStyle,
      label: 'lowest likelihood'
    },
    // Inference
    {
      id: 'e6',
      source: 'best-explanation',
      target: 'abductive-inference',
      ...edgeStyle,
      label: 'conclude'
    },
    // Confirmation seeking
    {
      id: 'e7',
      source: 'best-explanation',
      target: 'seek-confirmation',
      ...edgeStyle,
      label: 'verify'
    },
    {
      id: 'e8',
      source: 'seek-confirmation',
      target: 'confirmation-found',
      ...edgeStyle,
      label: 'find evidence'
    },
    {
      id: 'e9',
      source: 'confirmation-found',
      target: 'abductive-inference',
      ...edgeStyle,
      label: 'strengthen inference'
    },
    // Contrasts
    {
      id: 'e10',
      source: 'abductive-inference',
      target: 'deductive-contrast',
      ...edgeStyle,
      label: 'compare',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e11',
      source: 'abductive-inference',
      target: 'inductive-contrast',
      ...edgeStyle,
      label: 'compare',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Incomplete Observation Analysis",
      description: "System encounters incomplete evidence: server crash at 3AM, high CPU usage, recent deployment, but missing error logs. Recognizes need for explanatory reasoning.",
      activeNodes: ['incomplete-observations', 'hypothesis-generation'],
      activeEdges: ['e1']
    },
    {
      title: "Multiple Hypothesis Generation",
      description: "Generates competing explanations for observed evidence: code bug from deployment, cyber attack causing resource exhaustion, or hardware failure with thermal issues.",
      activeNodes: ['code-bug-hypothesis', 'attack-hypothesis', 'hardware-hypothesis'],
      activeEdges: ['e2a', 'e2b', 'e2c']
    },
    {
      title: "Evidence-Hypothesis Fit Evaluation",
      description: "Systematically evaluates how well each hypothesis explains the observed evidence, considering both explanatory power and simplicity (Occam's razor).",
      activeNodes: ['evidence-evaluation', 'code-analysis', 'attack-analysis', 'hardware-analysis'],
      activeEdges: ['e3a', 'e3b', 'e3c', 'e4a', 'e4b', 'e4c']
    },
    {
      title: "Best Explanation Selection",
      description: "Code bug hypothesis emerges as best explanation (70% likelihood) due to timing alignment with deployment and symptom fit, while attack (20%) and hardware (10%) explanations have gaps.",
      activeNodes: ['best-explanation'],
      activeEdges: ['e5a', 'e5b', 'e5c']
    },
    {
      title: "Abductive Inference & Confirmation",
      description: "Makes abductive inference that code bug is most plausible cause, then seeks confirmation by checking deployment code, finding infinite loop that validates the hypothesis.",
      activeNodes: ['abductive-inference', 'seek-confirmation', 'confirmation-found', 'deductive-contrast', 'inductive-contrast'],
      activeEdges: ['e6', 'e7', 'e8', 'e9', 'e10', 'e11']
    }
  ]
};