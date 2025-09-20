import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const unsupervisedLearningAgentsPattern: PatternScenario = {
  id: 'unsupervised-learning-adaptation',
  title: 'Unsupervised Learning for Agents',
  description: 'Learning methodology for agents to discover patterns and structure in unlabeled data through clustering, dimensionality reduction, and self-organization techniques.',
  initialNodes: [
    {
      id: 'agent-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Challenge: E-commerce Support Agent\n100,000 customer messages\nNO LABELS - just raw text!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
    // Unlabeled Data
    {
      id: 'raw-messages',
      position: { x: 100, y: 180 },
      data: { label: '📧 Raw Messages\n"Where\'s my order?"\n"Product broken"\n"Love it!"\n"Cancel subscription"\n"How to return?"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'no-labels',
      position: { x: 100, y: 320 },
      data: { label: '❌ No Labels\nNo categories\nNo expert annotations\nJust text!' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180 },
    },
    // Unsupervised Discovery
    {
      id: 'clustering',
      position: { x: 400, y: 180 },
      data: { label: '🔍 Clustering\nGroup similar messages\nautomatically' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    // Discovered Patterns
    {
      id: 'cluster-1',
      position: { x: 250, y: 320 },
      data: { label: '📦 Cluster 1: Shipping\n"Where\'s my order?"\n"Tracking number?"\n"Delivery delayed"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'cluster-2',
      position: { x: 430, y: 320 },
      data: { label: '🔧 Cluster 2: Issues\n"Product broken"\n"Not working"\n"Defective item"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'cluster-3',
      position: { x: 610, y: 320 },
      data: { label: '💚 Cluster 3: Happy\n"Love it!"\n"Great product"\n"Five stars"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Topic Modeling
    {
      id: 'topic-discovery',
      position: { x: 700, y: 180 },
      data: { label: '📊 Topic Modeling\nFind hidden themes\nLDA/BERT embeddings' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Agent Learning
    {
      id: 'pattern-recognition',
      position: { x: 400, y: 440 },
      data: { label: '🧠 Pattern Recognition\nAgent learns:\n• Common issues\n• Customer language\n• Problem types' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 200 },
    },
    {
      id: 'response-templates',
      position: { x: 150, y: 440 },
      data: { label: '📝 Auto Templates\nShipping → Track link\nIssues → Return form\nHappy → Thank you' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'anomaly-detection',
      position: { x: 650, y: 440 },
      data: { label: '⚠️ Anomaly Detection\nUnusual requests\nNew problems\nEscalate to human' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Benefits
    {
      id: 'benefit-1',
      position: { x: 100, y: 560 },
      data: { label: '💰 No Labeling\nSave weeks\nof manual work' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-2',
      position: { x: 270, y: 560 },
      data: { label: '🔍 Discovery\nFind unknown\npatterns' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-3',
      position: { x: 440, y: 560 },
      data: { label: '📈 Scalable\nHandles millions\nof messages' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'benefit-4',
      position: { x: 610, y: 560 },
      data: { label: '🔄 Adaptive\nLearns new\npatterns' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Test Case
    {
      id: 'new-message',
      position: { x: 250, y: 680 },
      data: { label: '💬 New: "Item never arrived, very frustrated!"' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 250 },
    },
    {
      id: 'agent-action',
      position: { x: 550, y: 680 },
      data: { label: '🤖 Agent Knows\nType: Shipping issue\nEmotion: Frustrated\nAction: Priority support' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    // Final Result
    {
      id: 'smart-agent',
      position: { x: 400, y: 800 },
      data: { label: '🎉 Smart Agent\nUnderstands 15 issue types\nLearned from patterns, not labels!\nNo human annotation needed!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Data flow
    {
      id: 'challenge-messages',
      source: 'agent-challenge',
      target: 'raw-messages',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'messages-nolabels',
      source: 'raw-messages',
      target: 'no-labels',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    // Unsupervised techniques
    {
      id: 'challenge-clustering',
      source: 'agent-challenge',
      target: 'clustering',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'challenge-topic',
      source: 'agent-challenge',
      target: 'topic-discovery',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      animated: true,
    },
    // Clustering results
    {
      id: 'clustering-cluster1',
      source: 'clustering',
      target: 'cluster-1',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'clustering-cluster2',
      source: 'clustering',
      target: 'cluster-2',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'clustering-cluster3',
      source: 'clustering',
      target: 'cluster-3',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    // Learning from patterns
    {
      id: 'cluster1-pattern',
      source: 'cluster-1',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'cluster2-pattern',
      source: 'cluster-2',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'cluster3-pattern',
      source: 'cluster-3',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'topic-pattern',
      source: 'topic-discovery',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Agent capabilities
    {
      id: 'pattern-templates',
      source: 'pattern-recognition',
      target: 'response-templates',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'pattern-anomaly',
      source: 'pattern-recognition',
      target: 'anomaly-detection',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Benefits
    {
      id: 'nolabels-benefit1',
      source: 'no-labels',
      target: 'benefit-1',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'pattern-benefit2',
      source: 'pattern-recognition',
      target: 'benefit-2',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'pattern-benefit3',
      source: 'pattern-recognition',
      target: 'benefit-3',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'anomaly-benefit4',
      source: 'anomaly-detection',
      target: 'benefit-4',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Test case
    {
      id: 'templates-test',
      source: 'response-templates',
      target: 'new-message',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'test-action',
      source: 'new-message',
      target: 'agent-action',
      style: { ...edgeStyle, stroke: '#6366f1', strokeWidth: 2 },
      animated: true,
    },
    // Final result
    {
      id: 'action-smart',
      source: 'agent-action',
      target: 'smart-agent',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'benefit3-smart',
      source: 'benefit-3',
      target: 'smart-agent',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'The Challenge',
      description: '100,000 customer messages with NO labels',
      activeNodes: ['agent-challenge'],
      activeEdges: [],
    },
    {
      title: 'Unlabeled Data',
      description: 'Just raw messages - no categories or annotations',
      activeNodes: ['agent-challenge', 'raw-messages', 'no-labels'],
      activeEdges: ['challenge-messages', 'messages-nolabels'],
    },
    {
      title: 'Unsupervised Techniques',
      description: 'Use clustering and topic modeling to find patterns',
      activeNodes: ['agent-challenge', 'clustering', 'topic-discovery'],
      activeEdges: ['challenge-clustering', 'challenge-topic'],
    },
    {
      title: 'Discovered Clusters',
      description: 'Automatically found: Shipping, Issues, Happy customers',
      activeNodes: ['clustering', 'cluster-1', 'cluster-2', 'cluster-3'],
      activeEdges: ['clustering-cluster1', 'clustering-cluster2', 'clustering-cluster3'],
    },
    {
      title: 'Pattern Recognition',
      description: 'Agent learns common issues and customer language',
      activeNodes: ['cluster-1', 'cluster-2', 'cluster-3', 'topic-discovery', 'pattern-recognition'],
      activeEdges: ['cluster1-pattern', 'cluster2-pattern', 'cluster3-pattern', 'topic-pattern'],
    },
    {
      title: 'Agent Capabilities',
      description: 'Auto-generate templates and detect anomalies',
      activeNodes: ['pattern-recognition', 'response-templates', 'anomaly-detection'],
      activeEdges: ['pattern-templates', 'pattern-anomaly'],
    },
    {
      title: 'Benefits',
      description: 'No labeling needed, discovers unknown patterns',
      activeNodes: ['no-labels', 'pattern-recognition', 'anomaly-detection', 'benefit-1', 'benefit-2', 'benefit-3', 'benefit-4'],
      activeEdges: ['nolabels-benefit1', 'pattern-benefit2', 'pattern-benefit3', 'anomaly-benefit4'],
    },
    {
      title: 'Test New Message',
      description: 'Customer: "Item never arrived, very frustrated!"',
      activeNodes: ['response-templates', 'new-message', 'agent-action'],
      activeEdges: ['templates-test', 'test-action'],
    },
    {
      title: 'Smart Agent Result',
      description: 'Understands 15 issue types without any human labeling!',
      activeNodes: ['agent-action', 'benefit-3', 'smart-agent'],
      activeEdges: ['action-smart', 'benefit3-smart'],
    },
  ],
};