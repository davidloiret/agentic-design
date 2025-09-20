import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const predictiveAgentFaultTolerancePattern: PatternScenario = {
  id: 'predictive-agent-fault-tolerance',
  title: 'Predictive Agent Fault Tolerance',
  description: 'Proactive fault tolerance system that monitors agent health, predicts potential failures, and implements preventive measures to maintain system reliability and continuity.',
  initialNodes: [
    {
      id: 'normal-operation',
      position: { x: 100, y: 50 },
      data: { label: '🤖 Trading Agent\nNormal Operation\n($2.5M portfolio)' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'health-monitoring',
      position: { x: 350, y: 50 },
      data: { label: '📊 Health Monitor\nCPU: 45%\nMemory: 60%\nLatency: 12ms' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'pattern-analysis',
      position: { x: 600, y: 50 },
      data: { label: '🔍 Pattern Analyzer\nDetecting anomalies\nin resource usage' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'prediction',
      position: { x: 850, y: 50 },
      data: { label: '🎯 Failure Predictor\n"Memory leak detected!\nCrash predicted in 8 min"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    {
      id: 'alert-trigger',
      position: { x: 350, y: 200 },
      data: { label: '⚠️ Alert Trigger\nRisk Level: HIGH\nTime to failure: 8 min' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'preemptive-action',
      position: { x: 600, y: 200 },
      data: { label: '🚀 Recovery Action\n1. Save trading state\n2. Scale resources\n3. Restart agent' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
    {
      id: 'backup-agent',
      position: { x: 100, y: 350 },
      data: { label: '🔄 Backup Agent\nActivated with\nsaved state' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'seamless-operation',
      position: { x: 350, y: 350 },
      data: { label: '✅ Seamless Operation\nNo trades lost\nPortfolio protected' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'learning-update',
      position: { x: 600, y: 350 },
      data: { label: '🧠 Model Update\nLearn from near-failure\nImprove predictions' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'normal-operation',
      target: 'health-monitoring',
      ...edgeStyle,
      label: 'monitor'
    },
    {
      id: 'e2',
      source: 'health-monitoring',
      target: 'pattern-analysis',
      ...edgeStyle,
      label: 'metrics'
    },
    {
      id: 'e3',
      source: 'pattern-analysis',
      target: 'prediction',
      ...edgeStyle,
      label: 'analyze'
    },
    {
      id: 'e4',
      source: 'prediction',
      target: 'alert-trigger',
      ...edgeStyle,
      label: 'predict failure'
    },
    {
      id: 'e5',
      source: 'alert-trigger',
      target: 'preemptive-action',
      ...edgeStyle,
      label: 'trigger'
    },
    {
      id: 'e6',
      source: 'preemptive-action',
      target: 'backup-agent',
      ...edgeStyle,
      label: 'activate'
    },
    {
      id: 'e7',
      source: 'backup-agent',
      target: 'seamless-operation',
      ...edgeStyle,
      label: 'resume'
    },
    {
      id: 'e8',
      source: 'seamless-operation',
      target: 'learning-update',
      ...edgeStyle,
      label: 'feedback'
    },
    {
      id: 'e9',
      source: 'learning-update',
      target: 'pattern-analysis',
      ...edgeStyle,
      label: 'improve',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Normal Operation Monitoring",
      description: "Trading agent operates normally while health monitor continuously tracks system metrics (CPU, memory, latency, network)."
    },
    {
      title: "Pattern Recognition",
      description: "Pattern analyzer processes historical data to identify early warning signs like memory leaks, resource exhaustion, or performance degradation."
    },
    {
      title: "Failure Prediction",
      description: "AI predictor analyzes current patterns against known failure signatures and predicts potential crash 8 minutes before it would occur."
    },
    {
      title: "Preemptive Recovery",
      description: "System automatically saves agent state, scales resources, and initiates graceful restart before failure occurs, preventing any data loss."
    },
    {
      title: "Seamless Continuation",
      description: "Backup agent activates with preserved state, ensuring continuous operation without interrupting critical trading activities."
    },
    {
      title: "Continuous Learning",
      description: "System learns from near-failure events to improve future predictions and reduce false positives in fault detection."
    }
  ]
};