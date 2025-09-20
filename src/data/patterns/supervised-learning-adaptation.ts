import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const supervisedLearningAgentsPattern: PatternScenario = {
  id: 'supervised-learning-adaptation',
  title: 'Supervised Learning for Agents',
  description: 'Training methodology for agents using labeled examples and expert demonstrations to learn desired behaviors through supervised learning techniques and iterative improvement.',
  initialNodes: [
    {
      id: 'agent-goal',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Goal: Train Customer Service Agent\nHandle returns, refunds, and complaints professionally' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
    // Expert Examples
    {
      id: 'expert-agent',
      position: { x: 100, y: 180 },
      data: { label: '👨‍💼 Expert Agent\n5 years experience\n98% satisfaction' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'expert-examples',
      position: { x: 100, y: 300 },
      data: { label: '📚 10,000 Examples\nReal conversations\nLabeled actions' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Concrete Example
    {
      id: 'example-scenario',
      position: { x: 400, y: 180 },
      data: { label: '💬 Customer: "My package arrived damaged!"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 350 },
    },
    {
      id: 'expert-decision',
      position: { x: 350, y: 300 },
      data: { label: '✅ Expert Action\n1. Apologize\n2. Verify order\n3. Offer replacement\n4. Expedite shipping' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'expert-response',
      position: { x: 550, y: 300 },
      data: { label: '💬 Expert Response\n"I\'m sorry about that!\nLet me send a replacement\nwith express shipping."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // New Agent Learning
    {
      id: 'new-agent',
      position: { x: 700, y: 180 },
      data: { label: '🤖 New Agent\nNo experience\nNeeds training' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'learning-process',
      position: { x: 700, y: 300 },
      data: { label: '📖 Learning\nStudy examples\nImitate expert' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Training Process
    {
      id: 'input-features',
      position: { x: 150, y: 420 },
      data: { label: '📊 Input Features\n• Customer emotion\n• Issue type\n• Order value\n• History' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'action-labels',
      position: { x: 350, y: 420 },
      data: { label: '🏷️ Action Labels\n• Refund: Yes/No\n• Replace: Yes/No\n• Priority: 1-5\n• Response tone' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'supervised-training',
      position: { x: 550, y: 420 },
      data: { label: '🎓 Supervised Training\nInput → Action\nMinimize error\nBatch learning' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Testing
    {
      id: 'test-scenario',
      position: { x: 250, y: 540 },
      data: { label: '🧪 Test: "Wrong item delivered"' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 200 },
    },
    {
      id: 'agent-prediction',
      position: { x: 500, y: 540 },
      data: { label: '🤖 Agent Predicts\n1. Apologize ✓\n2. Return label ✓\n3. Send correct item ✓' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    // Benefits
    {
      id: 'benefit-1',
      position: { x: 100, y: 660 },
      data: { label: '⚡ Fast Learning\nThousands of\nexamples at once' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-2',
      position: { x: 270, y: 660 },
      data: { label: '🎯 Consistent\nSame quality\nas expert' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-3',
      position: { x: 440, y: 660 },
      data: { label: '📈 Scalable\nTrain many\nagents quickly' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-4',
      position: { x: 610, y: 660 },
      data: { label: '✅ Reliable\nNo trial-error\nrisks' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Final Result
    {
      id: 'trained-agent',
      position: { x: 400, y: 780 },
      data: { label: '🎉 Trained Agent\nHandles 95% of cases correctly\nLearned from expert examples, not mistakes!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Expert flow
    {
      id: 'goal-expert',
      source: 'agent-goal',
      target: 'expert-agent',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'expert-examples-edge',
      source: 'expert-agent',
      target: 'expert-examples',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Example scenario
    {
      id: 'goal-scenario',
      source: 'agent-goal',
      target: 'example-scenario',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'scenario-decision',
      source: 'example-scenario',
      target: 'expert-decision',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'scenario-response',
      source: 'example-scenario',
      target: 'expert-response',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    // New agent learning
    {
      id: 'goal-new',
      source: 'agent-goal',
      target: 'new-agent',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'new-learning',
      source: 'new-agent',
      target: 'learning-process',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Training connections
    {
      id: 'examples-features',
      source: 'expert-examples',
      target: 'input-features',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'decision-labels',
      source: 'expert-decision',
      target: 'action-labels',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'response-labels',
      source: 'expert-response',
      target: 'action-labels',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'features-training',
      source: 'input-features',
      target: 'supervised-training',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'labels-training',
      source: 'action-labels',
      target: 'supervised-training',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'learning-training',
      source: 'learning-process',
      target: 'supervised-training',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Testing
    {
      id: 'training-test',
      source: 'supervised-training',
      target: 'test-scenario',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'test-prediction',
      source: 'test-scenario',
      target: 'agent-prediction',
      style: { ...edgeStyle, stroke: '#6366f1', strokeWidth: 2 },
      animated: true,
    },
    // Benefits
    {
      id: 'training-benefit1',
      source: 'supervised-training',
      target: 'benefit-1',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'prediction-benefit2',
      source: 'agent-prediction',
      target: 'benefit-2',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'prediction-benefit3',
      source: 'agent-prediction',
      target: 'benefit-3',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'prediction-benefit4',
      source: 'agent-prediction',
      target: 'benefit-4',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Final result
    {
      id: 'benefit2-final',
      source: 'benefit-2',
      target: 'trained-agent',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'benefit3-final',
      source: 'benefit-3',
      target: 'trained-agent',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Training Goal',
      description: 'Train customer service agent to handle returns and complaints',
      activeNodes: ['agent-goal'],
      activeEdges: [],
    },
    {
      title: 'Expert Examples',
      description: 'Collect 10,000 examples from experienced agent',
      activeNodes: ['agent-goal', 'expert-agent', 'expert-examples'],
      activeEdges: ['goal-expert', 'expert-examples-edge'],
    },
    {
      title: 'Example Scenario',
      description: 'Customer complains about damaged package',
      activeNodes: ['agent-goal', 'example-scenario'],
      activeEdges: ['goal-scenario'],
    },
    {
      title: 'Expert Handling',
      description: 'Expert shows correct actions and response',
      activeNodes: ['example-scenario', 'expert-decision', 'expert-response'],
      activeEdges: ['scenario-decision', 'scenario-response'],
    },
    {
      title: 'New Agent Learning',
      description: 'New agent studies expert examples',
      activeNodes: ['agent-goal', 'new-agent', 'learning-process'],
      activeEdges: ['goal-new', 'new-learning'],
    },
    {
      title: 'Extract Training Data',
      description: 'Convert examples to features and labels',
      activeNodes: ['expert-examples', 'expert-decision', 'expert-response', 'input-features', 'action-labels'],
      activeEdges: ['examples-features', 'decision-labels', 'response-labels'],
    },
    {
      title: 'Supervised Training',
      description: 'Train agent to predict expert actions from inputs',
      activeNodes: ['input-features', 'action-labels', 'learning-process', 'supervised-training'],
      activeEdges: ['features-training', 'labels-training', 'learning-training'],
    },
    {
      title: 'Test New Scenario',
      description: 'Test on "wrong item delivered" complaint',
      activeNodes: ['supervised-training', 'test-scenario', 'agent-prediction'],
      activeEdges: ['training-test', 'test-prediction'],
    },
    {
      title: 'Benefits',
      description: 'Fast, consistent, scalable, and reliable training',
      activeNodes: ['supervised-training', 'agent-prediction', 'benefit-1', 'benefit-2', 'benefit-3', 'benefit-4'],
      activeEdges: ['training-benefit1', 'prediction-benefit2', 'prediction-benefit3', 'prediction-benefit4'],
    },
    {
      title: 'Trained Agent',
      description: '95% accuracy from learning expert examples',
      activeNodes: ['benefit-2', 'benefit-3', 'trained-agent'],
      activeEdges: ['benefit2-final', 'benefit3-final'],
    },
  ],
};