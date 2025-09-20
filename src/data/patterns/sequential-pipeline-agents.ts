import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const sequentialPipelineAgentsPattern: PatternScenario = {
  id: 'sequential-pipeline-agents',
  title: 'Sequential Pipeline Agents',
  initialNodes: [
    {
      id: 'raw-input',
      position: { x: 50, y: 300 },
      data: { label: '📥 Raw Input\n"Customer feedback data\n10,000 reviews"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Pipeline Stage 1
    {
      id: 'stage1-header',
      position: { x: 250, y: 150 },
      data: { label: '🔹 Stage 1: Data Collection' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'collector-agent',
      position: { x: 250, y: 250 },
      data: { label: '📊 Data Collector Agent\nGather & normalize data' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage1-output',
      position: { x: 250, y: 350 },
      data: { label: '📦 Output: Structured Data\nJSON format, validated' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Stage 2
    {
      id: 'stage2-header',
      position: { x: 500, y: 150 },
      data: { label: '🔹 Stage 2: Preprocessing' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'preprocessor-agent',
      position: { x: 500, y: 250 },
      data: { label: '🔧 Preprocessor Agent\nClean & tokenize text' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage2-output',
      position: { x: 500, y: 350 },
      data: { label: '📦 Output: Clean Tokens\nNormalized, deduplicated' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Stage 3
    {
      id: 'stage3-header',
      position: { x: 750, y: 150 },
      data: { label: '🔹 Stage 3: Analysis' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'analyzer-agent',
      position: { x: 750, y: 250 },
      data: { label: '🧠 Sentiment Analyzer\nExtract sentiment & topics' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage3-output',
      position: { x: 750, y: 350 },
      data: { label: '📦 Output: Sentiments\nScores, topics, entities' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Stage 4
    {
      id: 'stage4-header',
      position: { x: 250, y: 450 },
      data: { label: '🔹 Stage 4: Categorization' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'categorizer-agent',
      position: { x: 250, y: 550 },
      data: { label: '🏷️ Categorizer Agent\nClassify by themes' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage4-output',
      position: { x: 250, y: 650 },
      data: { label: '📦 Output: Categories\nLabeled groups' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Stage 5
    {
      id: 'stage5-header',
      position: { x: 500, y: 450 },
      data: { label: '🔹 Stage 5: Insights' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'insights-agent',
      position: { x: 500, y: 550 },
      data: { label: '💡 Insights Generator\nExtract key findings' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage5-output',
      position: { x: 500, y: 650 },
      data: { label: '📦 Output: Insights\nActionable findings' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Stage 6
    {
      id: 'stage6-header',
      position: { x: 750, y: 450 },
      data: { label: '🔹 Stage 6: Reporting' },
      style: { ...nodeStyle, background: '#1e293b', border: '2px dashed #64748b', minWidth: 200 },
    },
    {
      id: 'reporter-agent',
      position: { x: 750, y: 550 },
      data: { label: '📄 Report Generator\nCreate final report' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'stage6-output',
      position: { x: 750, y: 650 },
      data: { label: '📦 Output: Report\nExecutive summary' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Pipeline Control
    {
      id: 'pipeline-controller',
      position: { x: 100, y: 50 },
      data: { label: '🎛️ Pipeline Controller\nOrchestrate flow & monitor' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },
    {
      id: 'queue-manager',
      position: { x: 350, y: 50 },
      data: { label: '📋 Queue Manager\nBuffer between stages' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'validator',
      position: { x: 550, y: 50 },
      data: { label: '✅ Output Validator\nQuality checks' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'error-handler',
      position: { x: 750, y: 50 },
      data: { label: '⚠️ Error Handler\nRetry & fallback' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Monitoring
    {
      id: 'throughput-monitor',
      position: { x: 200, y: 780 },
      data: { label: '📈 Throughput Monitor\n150 items/min' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'latency-tracker',
      position: { x: 400, y: 780 },
      data: { label: '⏱️ Latency Tracker\nStage delays' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'bottleneck-detector',
      position: { x: 600, y: 780 },
      data: { label: '🚧 Bottleneck Detector\nIdentify slow stages' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'final-output',
      position: { x: 400, y: 900 },
      data: { label: '✨ Final Output\nComprehensive customer insights report' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 300 },
    },
  ],
  initialEdges: [
    // Main pipeline flow
    {
      id: 'input-collector',
      source: 'raw-input',
      target: 'collector-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Start',
    },
    {
      id: 'collector-output1',
      source: 'collector-agent',
      target: 'stage1-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage1-stage2',
      source: 'stage1-output',
      target: 'preprocessor-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Feed',
    },
    {
      id: 'preprocessor-output2',
      source: 'preprocessor-agent',
      target: 'stage2-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage2-stage3',
      source: 'stage2-output',
      target: 'analyzer-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Feed',
    },
    {
      id: 'analyzer-output3',
      source: 'analyzer-agent',
      target: 'stage3-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage3-stage4',
      source: 'stage3-output',
      target: 'categorizer-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Feed',
    },
    {
      id: 'categorizer-output4',
      source: 'categorizer-agent',
      target: 'stage4-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage4-stage5',
      source: 'stage4-output',
      target: 'insights-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Feed',
    },
    {
      id: 'insights-output5',
      source: 'insights-agent',
      target: 'stage5-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage5-stage6',
      source: 'stage5-output',
      target: 'reporter-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'Feed',
    },
    {
      id: 'reporter-output6',
      source: 'reporter-agent',
      target: 'stage6-output',
      style: { ...edgeStyle, stroke: '#7c3aed' },
    },
    {
      id: 'stage6-final',
      source: 'stage6-output',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Control connections
    {
      id: 'controller-collector',
      source: 'pipeline-controller',
      target: 'collector-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
      label: 'Control',
    },
    {
      id: 'controller-preprocessor',
      source: 'pipeline-controller',
      target: 'preprocessor-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
    },
    {
      id: 'controller-analyzer',
      source: 'pipeline-controller',
      target: 'analyzer-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
    },
    {
      id: 'controller-categorizer',
      source: 'pipeline-controller',
      target: 'categorizer-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
    },
    {
      id: 'controller-insights',
      source: 'pipeline-controller',
      target: 'insights-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
    },
    {
      id: 'controller-reporter',
      source: 'pipeline-controller',
      target: 'reporter-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5 5' },
    },
    // Queue management
    {
      id: 'queue-stage1',
      source: 'queue-manager',
      target: 'stage1-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
      label: 'Buffer',
    },
    {
      id: 'queue-stage2',
      source: 'queue-manager',
      target: 'stage2-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    {
      id: 'queue-stage3',
      source: 'queue-manager',
      target: 'stage3-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    // Validation
    {
      id: 'validator-stage1',
      source: 'validator',
      target: 'stage1-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
      label: 'Check',
    },
    {
      id: 'validator-stage3',
      source: 'validator',
      target: 'stage3-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    {
      id: 'validator-stage6',
      source: 'validator',
      target: 'stage6-output',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    // Error handling
    {
      id: 'error-preprocessor',
      source: 'error-handler',
      target: 'preprocessor-agent',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
      label: 'Retry',
    },
    {
      id: 'error-analyzer',
      source: 'error-handler',
      target: 'analyzer-agent',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
    },
    // Monitoring
    {
      id: 'collector-throughput',
      source: 'collector-agent',
      target: 'throughput-monitor',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    {
      id: 'preprocessor-latency',
      source: 'preprocessor-agent',
      target: 'latency-tracker',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    {
      id: 'analyzer-bottleneck',
      source: 'analyzer-agent',
      target: 'bottleneck-detector',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '3 3' },
    },
    // Monitoring feedback
    {
      id: 'bottleneck-controller',
      source: 'bottleneck-detector',
      target: 'pipeline-controller',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
      label: 'Alert',
    },
  ],
  steps: [
    {
      title: 'Pipeline Initialization',
      description: 'Set up pipeline controller and monitoring systems',
      activeNodes: ['pipeline-controller', 'queue-manager', 'validator', 'error-handler'],
      activeEdges: [],
    },
    {
      title: 'Stage 1: Data Collection',
      description: 'Raw input enters pipeline, collector agent processes',
      activeNodes: ['raw-input', 'collector-agent', 'stage1-output'],
      activeEdges: ['input-collector', 'collector-output1', 'controller-collector'],
    },
    {
      title: 'Stage 1→2 Handoff',
      description: 'Stage 1 output becomes Stage 2 input',
      activeNodes: ['stage1-output', 'preprocessor-agent'],
      activeEdges: ['stage1-stage2', 'queue-stage1'],
    },
    {
      title: 'Stage 2: Preprocessing',
      description: 'Preprocessor agent cleans and tokenizes data',
      activeNodes: ['preprocessor-agent', 'stage2-output'],
      activeEdges: ['preprocessor-output2', 'controller-preprocessor'],
    },
    {
      title: 'Stage 2→3 Handoff',
      description: 'Preprocessed data feeds into analyzer',
      activeNodes: ['stage2-output', 'analyzer-agent'],
      activeEdges: ['stage2-stage3', 'queue-stage2'],
    },
    {
      title: 'Stage 3: Analysis',
      description: 'Sentiment analyzer processes tokens',
      activeNodes: ['analyzer-agent', 'stage3-output'],
      activeEdges: ['analyzer-output3', 'controller-analyzer', 'validator-stage3'],
    },
    {
      title: 'Stage 3→4 Handoff',
      description: 'Analysis results flow to categorizer',
      activeNodes: ['stage3-output', 'categorizer-agent'],
      activeEdges: ['stage3-stage4', 'queue-stage3'],
    },
    {
      title: 'Stage 4: Categorization',
      description: 'Categorizer agent classifies by themes',
      activeNodes: ['categorizer-agent', 'stage4-output'],
      activeEdges: ['categorizer-output4', 'controller-categorizer'],
    },
    {
      title: 'Stage 5: Insights Generation',
      description: 'Extract key findings from categorized data',
      activeNodes: ['insights-agent', 'stage5-output'],
      activeEdges: ['stage4-stage5', 'insights-output5', 'controller-insights'],
    },
    {
      title: 'Stage 6: Report Generation',
      description: 'Create final comprehensive report',
      activeNodes: ['reporter-agent', 'stage6-output'],
      activeEdges: ['stage5-stage6', 'reporter-output6', 'controller-reporter', 'validator-stage6'],
    },
    {
      title: 'Performance Monitoring',
      description: 'Track throughput, latency, and bottlenecks',
      activeNodes: ['throughput-monitor', 'latency-tracker', 'bottleneck-detector'],
      activeEdges: ['collector-throughput', 'preprocessor-latency', 'analyzer-bottleneck', 'bottleneck-controller'],
    },
    {
      title: 'Final Output',
      description: 'Deliver processed results through complete pipeline',
      activeNodes: ['stage6-output', 'final-output'],
      activeEdges: ['stage6-final'],
    },
  ],
};