import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const simpoPattern: PatternScenario = {
  id: 'simple-preference-optimization',
  title: 'Simple Preference Optimization',
  description: 'Streamlined approach to preference optimization that simplifies complex alignment methods while maintaining effectiveness in training models according to human preferences.',
  initialNodes: [
    {
      id: 'user-task',
      position: { x: 400, y: 50 },
      data: { label: '💬 Task: "Explain quantum computing to a child"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // DPO Complexity
    {
      id: 'dpo-approach',
      position: { x: 100, y: 150 },
      data: { label: '🤯 DPO Complexity\n• Reference model πref\n• KL divergence\n• Bradley-Terry\n• Complex math!' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180 },
    },
    {
      id: 'dpo-formula',
      position: { x: 100, y: 280 },
      data: { label: '📐 DPO Loss\nlog σ(β·log[π/πref](yw)\n- β·log[π/πref](yl))' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // SimPO Simplicity
    {
      id: 'simpo-approach',
      position: { x: 600, y: 150 },
      data: { label: '✨ SimPO Simplicity\n• NO reference model\n• NO reward margin\n• Just average log prob\n• Simple & effective!' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    {
      id: 'simpo-formula',
      position: { x: 600, y: 280 },
      data: { label: '🎯 SimPO Loss\nlog(π(yw)) - log(π(yl))\n+ margin γ' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    // Example Responses
    {
      id: 'winning-response',
      position: { x: 250, y: 400 },
      data: { label: '✅ Winning Response\n"Quantum computers are like\nmagic calculators that can try\nmany answers at once,\nlike a maze solver checking\nall paths simultaneously!"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    {
      id: 'losing-response',
      position: { x: 530, y: 400 },
      data: { label: '❌ Losing Response\n"Quantum computing uses\nsuperposition and entanglement\nof qubits to perform\ncomputations on amplitudes\nof probability waves."' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 220 },
    },
    // Key Innovation
    {
      id: 'length-normalization',
      position: { x: 150, y: 540 },
      data: { label: '📏 Length Normalization\nAverage log prob\nper token' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'reward-margin',
      position: { x: 400, y: 540 },
      data: { label: '📊 Target Reward Margin\nγ = winning - losing\nDirectly set gap!' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'no-reference',
      position: { x: 650, y: 540 },
      data: { label: '🆓 No Reference Model\nSaves 50% memory!\nFaster training' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Training Process
    {
      id: 'direct-optimization',
      position: { x: 400, y: 660 },
      data: { label: '🎯 Direct Optimization\nMaximize good response probability\nMinimize bad response probability' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 350 },
    },
    // Results Comparison
    {
      id: 'performance',
      position: { x: 200, y: 780 },
      data: { label: '📈 Performance\nDPO: 72.3%\nSimPO: 73.5%\nBetter & simpler!' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'efficiency',
      position: { x: 400, y: 780 },
      data: { label: '⚡ Efficiency\n2x faster\n50% less memory\nEasier to tune' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'simplicity',
      position: { x: 600, y: 780 },
      data: { label: '🎨 Simplicity\nNo πref to maintain\nCleaner code\nFewer bugs' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    // Final Output
    {
      id: 'final-result',
      position: { x: 400, y: 900 },
      data: { label: '🎉 SimPO Result\n"Think of atoms as LEGO blocks. Normal computers\ncan only try one LEGO combination at a time.\nQuantum computers? They\'re like having magical hands\nthat can try ALL combinations at once!"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 500 },
    },
  ],
  initialEdges: [
    // DPO path
    {
      id: 'task-dpo',
      source: 'user-task',
      target: 'dpo-approach',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    {
      id: 'dpo-formula-edge',
      source: 'dpo-approach',
      target: 'dpo-formula',
      style: { ...edgeStyle, stroke: '#ef4444' },
      animated: true,
    },
    // SimPO path
    {
      id: 'task-simpo',
      source: 'user-task',
      target: 'simpo-approach',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'simpo-formula-edge',
      source: 'simpo-approach',
      target: 'simpo-formula',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    // Responses
    {
      id: 'simpo-winning',
      source: 'simpo-formula',
      target: 'winning-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'simpo-losing',
      source: 'simpo-formula',
      target: 'losing-response',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    // Key innovations
    {
      id: 'winning-length',
      source: 'winning-response',
      target: 'length-normalization',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'losing-length',
      source: 'losing-response',
      target: 'length-normalization',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'responses-margin',
      source: 'winning-response',
      target: 'reward-margin',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'losing-margin',
      source: 'losing-response',
      target: 'reward-margin',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'simpo-noref',
      source: 'simpo-approach',
      target: 'no-reference',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Optimization
    {
      id: 'length-optimize',
      source: 'length-normalization',
      target: 'direct-optimization',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'margin-optimize',
      source: 'reward-margin',
      target: 'direct-optimization',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'noref-optimize',
      source: 'no-reference',
      target: 'direct-optimization',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Results
    {
      id: 'optimize-performance',
      source: 'direct-optimization',
      target: 'performance',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'optimize-efficiency',
      source: 'direct-optimization',
      target: 'efficiency',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'optimize-simplicity',
      source: 'direct-optimization',
      target: 'simplicity',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Final
    {
      id: 'performance-final',
      source: 'performance',
      target: 'final-result',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'efficiency-final',
      source: 'efficiency',
      target: 'final-result',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'simplicity-final',
      source: 'simplicity',
      target: 'final-result',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'User Task',
      description: 'Explain quantum computing to a child',
      activeNodes: ['user-task'],
      activeEdges: [],
    },
    {
      title: 'DPO: Complex Approach',
      description: 'Needs reference model, KL divergence, complex math',
      activeNodes: ['user-task', 'dpo-approach', 'dpo-formula'],
      activeEdges: ['task-dpo', 'dpo-formula-edge'],
    },
    {
      title: 'SimPO: Simple Approach',
      description: 'No reference model, just average log probabilities',
      activeNodes: ['user-task', 'simpo-approach', 'simpo-formula'],
      activeEdges: ['task-simpo', 'simpo-formula-edge'],
    },
    {
      title: 'Generate Responses',
      description: 'Winning: child-friendly, Losing: too technical',
      activeNodes: ['simpo-formula', 'winning-response', 'losing-response'],
      activeEdges: ['simpo-winning', 'simpo-losing'],
    },
    {
      title: 'Key Innovations',
      description: 'Length normalization, target margin, no reference model',
      activeNodes: ['winning-response', 'losing-response', 'length-normalization', 'reward-margin', 'no-reference'],
      activeEdges: ['winning-length', 'losing-length', 'responses-margin', 'losing-margin', 'simpo-noref'],
    },
    {
      title: 'Direct Optimization',
      description: 'Maximize good responses, minimize bad ones directly',
      activeNodes: ['length-normalization', 'reward-margin', 'no-reference', 'direct-optimization'],
      activeEdges: ['length-optimize', 'margin-optimize', 'noref-optimize'],
    },
    {
      title: 'Results',
      description: 'Better performance, 2x faster, 50% less memory',
      activeNodes: ['direct-optimization', 'performance', 'efficiency', 'simplicity'],
      activeEdges: ['optimize-performance', 'optimize-efficiency', 'optimize-simplicity'],
    },
    {
      title: 'Final Output',
      description: 'Perfect child-friendly explanation using SimPO',
      activeNodes: ['performance', 'efficiency', 'simplicity', 'final-result'],
      activeEdges: ['performance-final', 'efficiency-final', 'simplicity-final'],
    },
  ],
};