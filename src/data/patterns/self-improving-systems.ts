import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const selfImprovingSystemsPattern: PatternScenario = {
  id: 'self-improving-systems',
  title: 'Self-Improving Systems',
  initialNodes: [
    {
      id: 'chatbot-v1',
      position: { x: 400, y: 50 },
      data: { label: '🤖 Customer Support Bot v1.0\n60% success rate\nMany confused users' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 300 },
    },
    // Real Interactions
    {
      id: 'user-question',
      position: { x: 100, y: 180 },
      data: { label: '💬 User Question\n"My order #12345\nis missing"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'bot-response',
      position: { x: 300, y: 180 },
      data: { label: '🤖 Bot Response\n"Check your email\nfor tracking"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'user-feedback',
      position: { x: 500, y: 180 },
      data: { label: '👎 User Feedback\n"Not helpful!\nStill no order"' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 160 },
    },
    {
      id: 'human-takeover',
      position: { x: 700, y: 180 },
      data: { label: '👤 Human Agent\n"Let me check...\nRefund issued"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Self-Improvement Loop
    {
      id: 'failure-analysis',
      position: { x: 150, y: 320 },
      data: { label: '📊 Analyze Failures\nWhy did bot fail?\nWhat patterns?' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'learn-from-human',
      position: { x: 350, y: 320 },
      data: { label: '📚 Learn from Human\nCorrect approach:\nCheck → Refund' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'pattern-extraction',
      position: { x: 550, y: 320 },
      data: { label: '🔍 Extract Patterns\n"Missing order"\n→ Check status\n→ Offer solution' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Improvement Mechanisms
    {
      id: 'knowledge-update',
      position: { x: 100, y: 460 },
      data: { label: '💾 Update Knowledge\nNew response templates\nBetter understanding' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'confidence-calibration',
      position: { x: 300, y: 460 },
      data: { label: '🎯 Calibrate Confidence\nKnow when to\nescalate to human' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'response-generation',
      position: { x: 500, y: 460 },
      data: { label: '✨ Better Responses\nMore empathetic\nAction-oriented' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'performance-tracking',
      position: { x: 700, y: 460 },
      data: { label: '📈 Track Metrics\nSuccess rate: 75%\nUser satisfaction ↑' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Test New Version
    {
      id: 'new-user-question',
      position: { x: 200, y: 580 },
      data: { label: '💬 Same Question\n"My order #67890\nis missing"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'improved-response',
      position: { x: 500, y: 580 },
      data: { label: '🤖 Improved Response\n"I see order #67890.\nProcessing refund now.\nExpect 2-3 days"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // Result
    {
      id: 'chatbot-v2',
      position: { x: 400, y: 700 },
      data: { label: '🎉 Customer Support Bot v2.0\n85% success rate\nContinuously improving!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Initial interaction flow
    {
      id: 'v1-question',
      source: 'chatbot-v1',
      target: 'user-question',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'question-response',
      source: 'user-question',
      target: 'bot-response',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'response-feedback',
      source: 'bot-response',
      target: 'user-feedback',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    {
      id: 'feedback-human',
      source: 'user-feedback',
      target: 'human-takeover',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      animated: true,
      label: 'Escalate',
    },
    // Learning from failure
    {
      id: 'feedback-analysis',
      source: 'user-feedback',
      target: 'failure-analysis',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'human-learn',
      source: 'human-takeover',
      target: 'learn-from-human',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'learn-pattern',
      source: 'learn-from-human',
      target: 'pattern-extraction',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'analysis-pattern',
      source: 'failure-analysis',
      target: 'pattern-extraction',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Improvement implementation
    {
      id: 'pattern-knowledge',
      source: 'pattern-extraction',
      target: 'knowledge-update',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'pattern-confidence',
      source: 'pattern-extraction',
      target: 'confidence-calibration',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'knowledge-response',
      source: 'knowledge-update',
      target: 'response-generation',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'confidence-response',
      source: 'confidence-calibration',
      target: 'response-generation',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'response-tracking',
      source: 'response-generation',
      target: 'performance-tracking',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Testing improved version
    {
      id: 'tracking-new-question',
      source: 'performance-tracking',
      target: 'new-user-question',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'new-question-improved',
      source: 'new-user-question',
      target: 'improved-response',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Success
    {
      id: 'improved-v2',
      source: 'improved-response',
      target: 'chatbot-v2',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Continuous loop
    {
      id: 'v2-loop',
      source: 'chatbot-v2',
      target: 'chatbot-v1',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Continue improving',
    },
  ],
  steps: [
    {
      title: 'Starting Point',
      description: 'Customer support bot with 60% success rate',
      activeNodes: ['chatbot-v1'],
      activeEdges: [],
    },
    {
      title: 'User Interaction',
      description: 'User asks about missing order',
      activeNodes: ['chatbot-v1', 'user-question', 'bot-response'],
      activeEdges: ['v1-question', 'question-response'],
    },
    {
      title: 'Failure & Escalation',
      description: 'Bot gives unhelpful response, user complains, human takes over',
      activeNodes: ['bot-response', 'user-feedback', 'human-takeover'],
      activeEdges: ['response-feedback', 'feedback-human'],
    },
    {
      title: 'Learn from Failure',
      description: 'Analyze why bot failed and learn from human solution',
      activeNodes: ['user-feedback', 'human-takeover', 'failure-analysis', 'learn-from-human', 'pattern-extraction'],
      activeEdges: ['feedback-analysis', 'human-learn', 'learn-pattern', 'analysis-pattern'],
    },
    {
      title: 'Self-Improvement',
      description: 'Update knowledge, calibrate confidence, generate better responses',
      activeNodes: ['pattern-extraction', 'knowledge-update', 'confidence-calibration', 'response-generation'],
      activeEdges: ['pattern-knowledge', 'pattern-confidence', 'knowledge-response', 'confidence-response'],
    },
    {
      title: 'Track Performance',
      description: 'Monitor metrics showing improvement',
      activeNodes: ['response-generation', 'performance-tracking'],
      activeEdges: ['response-tracking'],
    },
    {
      title: 'Test Improved Version',
      description: 'Same type of question gets much better response',
      activeNodes: ['new-user-question', 'improved-response'],
      activeEdges: ['tracking-new-question', 'new-question-improved'],
    },
    {
      title: 'Success & Continue',
      description: 'Bot v2.0 with 85% success rate, keeps improving!',
      activeNodes: ['improved-response', 'chatbot-v2'],
      activeEdges: ['improved-v2', 'v2-loop'],
    },
  ],
};