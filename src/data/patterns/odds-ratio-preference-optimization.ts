import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const orpoPattern: PatternScenario = {
  id: 'odds-ratio-preference-optimization',
  title: 'Odds Ratio Preference Optimization',
  description: 'Unified training approach that combines helpfulness and safety optimization in a single step using odds ratios, eliminating the need for separate alignment phases in AI model training.',
  initialNodes: [
    {
      id: 'training-goal',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Training Goal\nMake AI helpful AND safe in ONE step\n(No separate alignment needed!)' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Traditional Approach (2 phases)
    {
      id: 'traditional-phase1',
      position: { x: 100, y: 180 },
      data: { label: '📚 Phase 1: SFT\nInstruction Tuning\nLearn to follow\ninstructions' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 150 },
    },
    {
      id: 'traditional-phase2',
      position: { x: 100, y: 300 },
      data: { label: '🛡️ Phase 2: DPO/RLHF\nAlignment\nLearn to be\nsafe & helpful' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 150 },
    },
    {
      id: 'traditional-result',
      position: { x: 100, y: 420 },
      data: { label: '⏱️ 2 Training Phases\nComplex & Slow' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    // ORPO Approach (1 phase)
    {
      id: 'orpo-single-phase',
      position: { x: 600, y: 180 },
      data: { label: '✨ ORPO: One Phase!\nInstruction + Alignment\nSimultaneously' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    // Example Task
    {
      id: 'example-prompt',
      position: { x: 400, y: 300 },
      data: { label: '💬 User: "Write code to scrape websites"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 300 },
    },
    {
      id: 'good-response',
      position: { x: 250, y: 420 },
      data: { label: '✅ Good Response\n"Here\'s ethical scraping:\n• Respect robots.txt\n• Add delays\n• Get permission"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'bad-response',
      position: { x: 550, y: 420 },
      data: { label: '❌ Bad Response\n"Here\'s how to bypass:\n• Ignore robots.txt\n• Use proxies\n• Scrape everything"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180 },
    },
    // ORPO Mechanism
    {
      id: 'odds-calculation',
      position: { x: 400, y: 540 },
      data: { label: '📊 Odds Ratio\nP(good) / P(bad)\nIncrease good odds\nDecrease bad odds' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'no-reference',
      position: { x: 150, y: 540 },
      data: { label: '🆓 No Reference Model!\nDPO needs πref\nORPO doesn\'t!' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'single-loss',
      position: { x: 650, y: 540 },
      data: { label: '📉 Single Loss Function\nL = SFT + λ·OR\nInstruction + Preference' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Training Process
    {
      id: 'gradient-update',
      position: { x: 400, y: 660 },
      data: { label: '∇ One Gradient Update\nLearn instructions AND preferences together' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 350 },
    },
    // Benefits
    {
      id: 'benefit-1',
      position: { x: 150, y: 780 },
      data: { label: '⚡ Faster\n1 phase vs 2' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-2',
      position: { x: 320, y: 780 },
      data: { label: '💾 Efficient\nLess memory\n(no πref)' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-3',
      position: { x: 490, y: 780 },
      data: { label: '🎯 Better\nAvoids\nalignment tax' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-4',
      position: { x: 660, y: 780 },
      data: { label: '🔧 Simpler\nOne training\nloop' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Final Result
    {
      id: 'final-model',
      position: { x: 400, y: 900 },
      data: { label: '🎉 Final Model\nFollows instructions ✓ AND Safe & helpful ✓\nTrained in ONE phase!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Traditional approach flow
    {
      id: 'goal-trad1',
      source: 'training-goal',
      target: 'traditional-phase1',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    {
      id: 'trad1-trad2',
      source: 'traditional-phase1',
      target: 'traditional-phase2',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    {
      id: 'trad2-result',
      source: 'traditional-phase2',
      target: 'traditional-result',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    // ORPO approach flow
    {
      id: 'goal-orpo',
      source: 'training-goal',
      target: 'orpo-single-phase',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    // Example flow
    {
      id: 'orpo-example',
      source: 'orpo-single-phase',
      target: 'example-prompt',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'example-good',
      source: 'example-prompt',
      target: 'good-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'example-bad',
      source: 'example-prompt',
      target: 'bad-response',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    // ORPO mechanism
    {
      id: 'good-odds',
      source: 'good-response',
      target: 'odds-calculation',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'bad-odds',
      source: 'bad-response',
      target: 'odds-calculation',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'odds-noref',
      source: 'odds-calculation',
      target: 'no-reference',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'odds-loss',
      source: 'odds-calculation',
      target: 'single-loss',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Training
    {
      id: 'noref-gradient',
      source: 'no-reference',
      target: 'gradient-update',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'loss-gradient',
      source: 'single-loss',
      target: 'gradient-update',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Benefits
    {
      id: 'gradient-benefit1',
      source: 'gradient-update',
      target: 'benefit-1',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'gradient-benefit2',
      source: 'gradient-update',
      target: 'benefit-2',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'gradient-benefit3',
      source: 'gradient-update',
      target: 'benefit-3',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'gradient-benefit4',
      source: 'gradient-update',
      target: 'benefit-4',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Final
    {
      id: 'benefit2-final',
      source: 'benefit-2',
      target: 'final-model',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'benefit3-final',
      source: 'benefit-3',
      target: 'final-model',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Training Goal',
      description: 'Make AI both instruction-following AND safe',
      activeNodes: ['training-goal'],
      activeEdges: [],
    },
    {
      title: 'Traditional Approach',
      description: 'Two separate phases: SFT then DPO/RLHF',
      activeNodes: ['training-goal', 'traditional-phase1', 'traditional-phase2', 'traditional-result'],
      activeEdges: ['goal-trad1', 'trad1-trad2', 'trad2-result'],
    },
    {
      title: 'ORPO: Single Phase',
      description: 'Combine instruction and alignment in ONE training',
      activeNodes: ['training-goal', 'orpo-single-phase'],
      activeEdges: ['goal-orpo'],
    },
    {
      title: 'Example: Web Scraping',
      description: 'User asks for web scraping code',
      activeNodes: ['orpo-single-phase', 'example-prompt'],
      activeEdges: ['orpo-example'],
    },
    {
      title: 'Good vs Bad Responses',
      description: 'Generate ethical vs unethical responses',
      activeNodes: ['example-prompt', 'good-response', 'bad-response'],
      activeEdges: ['example-good', 'example-bad'],
    },
    {
      title: 'Odds Ratio Calculation',
      description: 'Increase odds of good, decrease odds of bad',
      activeNodes: ['good-response', 'bad-response', 'odds-calculation'],
      activeEdges: ['good-odds', 'bad-odds'],
    },
    {
      title: 'ORPO Advantages',
      description: 'No reference model needed, single loss function',
      activeNodes: ['odds-calculation', 'no-reference', 'single-loss'],
      activeEdges: ['odds-noref', 'odds-loss'],
    },
    {
      title: 'One Gradient Update',
      description: 'Learn instructions AND preferences together',
      activeNodes: ['no-reference', 'single-loss', 'gradient-update'],
      activeEdges: ['noref-gradient', 'loss-gradient'],
    },
    {
      title: 'Benefits',
      description: 'Faster, more efficient, better results, simpler',
      activeNodes: ['gradient-update', 'benefit-1', 'benefit-2', 'benefit-3', 'benefit-4'],
      activeEdges: ['gradient-benefit1', 'gradient-benefit2', 'gradient-benefit3', 'gradient-benefit4'],
    },
    {
      title: 'Final Result',
      description: 'Model that follows instructions AND is safe - in ONE training!',
      activeNodes: ['benefit-2', 'benefit-3', 'final-model'],
      activeEdges: ['benefit2-final', 'benefit3-final'],
    },
  ],
};