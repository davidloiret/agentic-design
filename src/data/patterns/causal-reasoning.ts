import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const causalReasoningPattern: PatternScenario = {
  id: 'causal-reasoning',
  title: 'Causal Reasoning',
  description: 'Establishes and follows explicit cause-and-effect relationships to understand mechanisms, predict outcomes, and design effective interventions',
  initialNodes: [
    {
      id: 'observation',
      position: { x: 400, y: 50 },
      data: { label: '📊 Observation\n"Sales dropped 30%\nafter website redesign\nlast month"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'correlation-vs-causation',
      position: { x: 400, y: 150 },
      data: { label: '🤔 Initial Analysis\n"Correlation observed, but\nis redesign the CAUSE\nor just coincidence?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    // Potential causes
    {
      id: 'website-cause',
      position: { x: 200, y: 280 },
      data: { label: '💻 Redesign Hypothesis\n"New UI confused users\n→ Fewer purchases"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'external-cause',
      position: { x: 400, y: 280 },
      data: { label: '🌍 External Factors\n"Economic downturn\n→ Reduced spending"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'competitor-cause',
      position: { x: 600, y: 280 },
      data: { label: '🏪 Competition\n"Rival launched sale\n→ Customer shift"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Causal mechanism exploration
    {
      id: 'mechanism-analysis',
      position: { x: 400, y: 400 },
      data: { label: '🔍 Mechanism Analysis\n"HOW could redesign\ncause sales drop?\nWhat\'s the pathway?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    // Detailed causal chain
    {
      id: 'ui-confusion',
      position: { x: 150, y: 520 },
      data: { label: '😵 User Confusion\n"New checkout button\nhard to find"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    {
      id: 'cart-abandonment',
      position: { x: 300, y: 520 },
      data: { label: '🛒 Cart Abandonment\n"Users give up\nat checkout"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    {
      id: 'lost-sales',
      position: { x: 450, y: 520 },
      data: { label: '📉 Lost Sales\n"Abandoned carts\n= Lost revenue"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    // Counterfactual analysis
    {
      id: 'counterfactual',
      position: { x: 650, y: 400 },
      data: { label: '🔄 Counterfactual\n"What if we HADN\'T\nredesigned? Would sales\nstill have dropped?"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    // Intervention design
    {
      id: 'intervention-design',
      position: { x: 400, y: 650 },
      data: { label: '⚡ Intervention Design\n"If UI confusion causes\ndrop, then fixing UI\nshould restore sales"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'ab-test',
      position: { x: 200, y: 750 },
      data: { label: '🧪 A/B Test\n"Old UI vs New UI\nwith 50/50 traffic split"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'results',
      position: { x: 400, y: 750 },
      data: { label: '📈 Results\n"Old UI: 2.1% conversion\nNew UI: 1.5% conversion\nCausation confirmed!"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'causal-model',
      position: { x: 600, y: 750 },
      data: { label: '🎯 Causal Model\n"Redesign → UI confusion\n→ Cart abandonment\n→ Sales drop"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },
    // External validation
    {
      id: 'external-validation',
      position: { x: 100, y: 400 },
      data: { label: '✅ External Check\n"Economy stable,\ncompetitor quiet\n→ Rules out alternatives"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'observation',
      target: 'correlation-vs-causation',
      ...edgeStyle,
      label: 'analyze'
    },
    // Generate hypotheses
    {
      id: 'e2a',
      source: 'correlation-vs-causation',
      target: 'website-cause',
      ...edgeStyle,
      label: 'hypothesis 1'
    },
    {
      id: 'e2b',
      source: 'correlation-vs-causation',
      target: 'external-cause',
      ...edgeStyle,
      label: 'hypothesis 2'
    },
    {
      id: 'e2c',
      source: 'correlation-vs-causation',
      target: 'competitor-cause',
      ...edgeStyle,
      label: 'hypothesis 3'
    },
    // Mechanism exploration
    {
      id: 'e3',
      source: 'website-cause',
      target: 'mechanism-analysis',
      ...edgeStyle,
      label: 'explore mechanism'
    },
    // Causal chain
    {
      id: 'e4a',
      source: 'mechanism-analysis',
      target: 'ui-confusion',
      ...edgeStyle,
      label: 'step 1'
    },
    {
      id: 'e4b',
      source: 'ui-confusion',
      target: 'cart-abandonment',
      ...edgeStyle,
      label: 'causes'
    },
    {
      id: 'e4c',
      source: 'cart-abandonment',
      target: 'lost-sales',
      ...edgeStyle,
      label: 'results in'
    },
    // Counterfactual
    {
      id: 'e5',
      source: 'mechanism-analysis',
      target: 'counterfactual',
      ...edgeStyle,
      label: 'consider alternative'
    },
    // External validation
    {
      id: 'e6',
      source: 'external-cause',
      target: 'external-validation',
      ...edgeStyle,
      label: 'check'
    },
    {
      id: 'e7',
      source: 'competitor-cause',
      target: 'external-validation',
      ...edgeStyle,
      label: 'check'
    },
    // Intervention
    {
      id: 'e8a',
      source: 'lost-sales',
      target: 'intervention-design',
      ...edgeStyle,
      label: 'design fix'
    },
    {
      id: 'e8b',
      source: 'counterfactual',
      target: 'intervention-design',
      ...edgeStyle,
      label: 'inform design'
    },
    {
      id: 'e8c',
      source: 'external-validation',
      target: 'intervention-design',
      ...edgeStyle,
      label: 'confirm focus'
    },
    // Testing
    {
      id: 'e9a',
      source: 'intervention-design',
      target: 'ab-test',
      ...edgeStyle,
      label: 'test hypothesis'
    },
    {
      id: 'e9b',
      source: 'intervention-design',
      target: 'results',
      ...edgeStyle,
      label: 'measure'
    },
    {
      id: 'e10',
      source: 'ab-test',
      target: 'results',
      ...edgeStyle,
      label: 'generate'
    },
    {
      id: 'e11',
      source: 'results',
      target: 'causal-model',
      ...edgeStyle,
      label: 'confirm model'
    },
  ],
  steps: [
    {
      title: "Correlation vs Causation Distinction",
      description: "Observes sales drop after website redesign but questions whether correlation implies causation. Generates multiple competing hypotheses: website, external factors, or competition.",
      activeNodes: ['observation', 'correlation-vs-causation', 'website-cause', 'external-cause', 'competitor-cause'],
      activeEdges: ['e1', 'e2a', 'e2b', 'e2c']
    },
    {
      title: "Causal Mechanism Exploration",
      description: "Goes beyond correlation to explore HOW redesign could cause sales drop. Maps detailed causal pathway: UI confusion → cart abandonment → lost sales.",
      activeNodes: ['mechanism-analysis', 'ui-confusion', 'cart-abandonment', 'lost-sales'],
      activeEdges: ['e3', 'e4a', 'e4b', 'e4c']
    },
    {
      title: "Counterfactual & Alternative Validation",
      description: "Considers counterfactual (what if no redesign?) and validates that external factors (economy, competition) are ruled out as primary causes.",
      activeNodes: ['counterfactual', 'external-validation'],
      activeEdges: ['e5', 'e6', 'e7']
    },
    {
      title: "Causal Intervention Design",
      description: "Uses causal understanding to design targeted intervention: if UI confusion causes the problem, then fixing UI should restore sales performance.",
      activeNodes: ['intervention-design'],
      activeEdges: ['e8a', 'e8b', 'e8c']
    },
    {
      title: "Causal Hypothesis Testing",
      description: "Tests causal model with A/B experiment comparing old vs new UI. Results confirm causation: old UI (2.1%) vs new UI (1.5%) conversion, validating causal chain.",
      activeNodes: ['ab-test', 'results', 'causal-model'],
      activeEdges: ['e9a', 'e9b', 'e10', 'e11']
    }
  ]
};