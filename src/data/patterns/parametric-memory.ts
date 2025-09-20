import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const parametricMemoryPattern: PatternScenario = {
  id: 'parametric-memory',
  title: 'Parametric Memory',
  description: 'Knowledge storage system where information is encoded directly into model parameters, enabling fast access to learned knowledge without external memory lookups.',
  initialNodes: [
    {
      id: 'knowledge-query',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Knowledge Query\n"What are the key principles of quantum computing?"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Core Model with Parametric Memory
    {
      id: 'llm-core',
      position: { x: 375, y: 150 },
      data: { label: '🧠 LLM Core\n175B parameters\nKnowledge encoded in weights' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Parameter Layers
    {
      id: 'embedding-layer',
      position: { x: 100, y: 250 },
      data: { label: '📊 Embedding Layer\nToken → Vector mapping\n50K vocabulary' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'attention-layers',
      position: { x: 300, y: 250 },
      data: { label: '🔍 Attention Layers\nSelf-attention heads\nPattern recognition' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'ffn-layers',
      position: { x: 500, y: 250 },
      data: { label: '🔄 FFN Layers\nFeed-forward networks\nKnowledge storage' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'output-layer',
      position: { x: 700, y: 250 },
      data: { label: '📤 Output Layer\nLogits generation\nToken prediction' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Knowledge Types in Parameters
    {
      id: 'factual-knowledge',
      position: { x: 50, y: 380 },
      data: { label: '📚 Factual Knowledge\n• Historical dates\n• Scientific facts\n• Entity relations' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'procedural-knowledge',
      position: { x: 220, y: 380 },
      data: { label: '⚙️ Procedural Knowledge\n• How-to steps\n• Algorithms\n• Methods' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'linguistic-knowledge',
      position: { x: 390, y: 380 },
      data: { label: '🗣️ Linguistic Knowledge\n• Grammar rules\n• Syntax patterns\n• Semantics' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'domain-knowledge',
      position: { x: 560, y: 380 },
      data: { label: '🎓 Domain Knowledge\n• Medical terms\n• Legal concepts\n• Tech specs' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'common-sense',
      position: { x: 730, y: 380 },
      data: { label: '💡 Common Sense\n• Cause-effect\n• Physics intuition\n• Social norms' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Multi-Agent Access
    {
      id: 'agent-1',
      position: { x: 100, y: 520 },
      data: { label: '🤖 Research Agent\nAccessing scientific knowledge' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'agent-2',
      position: { x: 300, y: 520 },
      data: { label: '🤖 Analysis Agent\nAccessing analytical patterns' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'agent-3',
      position: { x: 500, y: 520 },
      data: { label: '🤖 Writing Agent\nAccessing language patterns' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'agent-4',
      position: { x: 700, y: 520 },
      data: { label: '🤖 Validation Agent\nAccessing fact-checking data' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Retrieval Mechanisms
    {
      id: 'forward-pass',
      position: { x: 150, y: 640 },
      data: { label: '➡️ Forward Pass\nActivation flow\n~50ms latency' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'pattern-matching',
      position: { x: 320, y: 640 },
      data: { label: '🎯 Pattern Matching\nWeight activation\nContext-free recall' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'parallel-access',
      position: { x: 490, y: 640 },
      data: { label: '⚡ Parallel Access\nMultiple agents\nNo interference' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'gradient-flow',
      position: { x: 660, y: 640 },
      data: { label: '📈 Gradient Flow\nKnowledge paths\nActivation strength' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Advantages
    {
      id: 'instant-access',
      position: { x: 100, y: 760 },
      data: { label: '⚡ Instant Access\nNo retrieval needed\nO(1) complexity' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'context-independence',
      position: { x: 280, y: 760 },
      data: { label: '🔓 Context-Free\nNo prompt needed\nDirect activation' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'scalable-sharing',
      position: { x: 460, y: 760 },
      data: { label: '📊 Scalable Sharing\nUnlimited agents\nNo memory copies' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'integrated-reasoning',
      position: { x: 640, y: 760 },
      data: { label: '🧩 Integrated\nSeamless reasoning\nNo external lookups' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Limitations & Mitigations
    {
      id: 'hallucination-risk',
      position: { x: 150, y: 880 },
      data: { label: '⚠️ Hallucination Risk\nConfabulation possible' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'update-challenge',
      position: { x: 320, y: 880 },
      data: { label: '🔄 Update Challenge\nRetraining required' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'fact-verification',
      position: { x: 490, y: 880 },
      data: { label: '✅ Fact Verification\nCross-check needed' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'hybrid-approach',
      position: { x: 660, y: 880 },
      data: { label: '🔀 Hybrid Solution\n+ Non-parametric memory' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 160 },
    },
    {
      id: 'knowledge-output',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Retrieved Knowledge\nQuantum computing principles extracted from parameters' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Query to core
    {
      id: 'query-core',
      source: 'knowledge-query',
      target: 'llm-core',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Core to layers
    {
      id: 'core-embedding',
      source: 'llm-core',
      target: 'embedding-layer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Encode',
    },
    {
      id: 'embedding-attention',
      source: 'embedding-layer',
      target: 'attention-layers',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'attention-ffn',
      source: 'attention-layers',
      target: 'ffn-layers',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'ffn-output',
      source: 'ffn-layers',
      target: 'output-layer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    // Knowledge types to layers
    {
      id: 'factual-embedding',
      source: 'factual-knowledge',
      target: 'embedding-layer',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'procedural-attention',
      source: 'procedural-knowledge',
      target: 'attention-layers',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'linguistic-attention',
      source: 'linguistic-knowledge',
      target: 'attention-layers',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'domain-ffn',
      source: 'domain-knowledge',
      target: 'ffn-layers',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'common-ffn',
      source: 'common-sense',
      target: 'ffn-layers',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    // Agents accessing core
    {
      id: 'agent1-core',
      source: 'agent-1',
      target: 'llm-core',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Access',
    },
    {
      id: 'agent2-core',
      source: 'agent-2',
      target: 'llm-core',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Access',
    },
    {
      id: 'agent3-core',
      source: 'agent-3',
      target: 'llm-core',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Access',
    },
    {
      id: 'agent4-core',
      source: 'agent-4',
      target: 'llm-core',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Access',
    },
    // Agents to knowledge types
    {
      id: 'agent1-factual',
      source: 'agent-1',
      target: 'factual-knowledge',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'agent2-procedural',
      source: 'agent-2',
      target: 'procedural-knowledge',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'agent3-linguistic',
      source: 'agent-3',
      target: 'linguistic-knowledge',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'agent4-domain',
      source: 'agent-4',
      target: 'domain-knowledge',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    // Retrieval mechanisms
    {
      id: 'agent1-forward',
      source: 'agent-1',
      target: 'forward-pass',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'agent2-pattern',
      source: 'agent-2',
      target: 'pattern-matching',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'agent3-parallel',
      source: 'agent-3',
      target: 'parallel-access',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'agent4-gradient',
      source: 'agent-4',
      target: 'gradient-flow',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Mechanisms to advantages
    {
      id: 'forward-instant',
      source: 'forward-pass',
      target: 'instant-access',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'pattern-context',
      source: 'pattern-matching',
      target: 'context-independence',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'parallel-scalable',
      source: 'parallel-access',
      target: 'scalable-sharing',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'gradient-integrated',
      source: 'gradient-flow',
      target: 'integrated-reasoning',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Limitations
    {
      id: 'instant-hallucination',
      source: 'instant-access',
      target: 'hallucination-risk',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Risk',
    },
    {
      id: 'context-update',
      source: 'context-independence',
      target: 'update-challenge',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Issue',
    },
    {
      id: 'scalable-verification',
      source: 'scalable-sharing',
      target: 'fact-verification',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Need',
    },
    // Mitigation
    {
      id: 'hallucination-hybrid',
      source: 'hallucination-risk',
      target: 'hybrid-approach',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Solve',
    },
    {
      id: 'update-hybrid',
      source: 'update-challenge',
      target: 'hybrid-approach',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Solve',
    },
    {
      id: 'verification-hybrid',
      source: 'fact-verification',
      target: 'hybrid-approach',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Solve',
    },
    // Output
    {
      id: 'output-knowledge',
      source: 'output-layer',
      target: 'knowledge-output',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'integrated-output',
      source: 'integrated-reasoning',
      target: 'knowledge-output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'hybrid-output',
      source: 'hybrid-approach',
      target: 'knowledge-output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'Knowledge Query',
      description: 'Query about quantum computing principles',
      activeNodes: ['knowledge-query', 'llm-core'],
      activeEdges: ['query-core'],
    },
    {
      title: 'Parameter Activation',
      description: 'Query flows through model layers',
      activeNodes: ['llm-core', 'embedding-layer', 'attention-layers', 'ffn-layers', 'output-layer'],
      activeEdges: ['core-embedding', 'embedding-attention', 'attention-ffn', 'ffn-output'],
    },
    {
      title: 'Knowledge Encoding',
      description: 'Different knowledge types stored in parameters',
      activeNodes: ['factual-knowledge', 'procedural-knowledge', 'linguistic-knowledge', 'domain-knowledge', 'common-sense'],
      activeEdges: ['factual-embedding', 'procedural-attention', 'linguistic-attention', 'domain-ffn', 'common-ffn'],
    },
    {
      title: 'Multi-Agent Access',
      description: 'Multiple agents access shared parametric memory',
      activeNodes: ['agent-1', 'agent-2', 'agent-3', 'agent-4', 'llm-core'],
      activeEdges: ['agent1-core', 'agent2-core', 'agent3-core', 'agent4-core'],
    },
    {
      title: 'Knowledge Retrieval',
      description: 'Agents retrieve specific knowledge types',
      activeNodes: ['agent-1', 'agent-2', 'agent-3', 'agent-4', 'factual-knowledge', 'procedural-knowledge', 'linguistic-knowledge', 'domain-knowledge'],
      activeEdges: ['agent1-factual', 'agent2-procedural', 'agent3-linguistic', 'agent4-domain'],
    },
    {
      title: 'Retrieval Mechanisms',
      description: 'Fast, parallel, context-free access',
      activeNodes: ['forward-pass', 'pattern-matching', 'parallel-access', 'gradient-flow'],
      activeEdges: ['agent1-forward', 'agent2-pattern', 'agent3-parallel', 'agent4-gradient'],
    },
    {
      title: 'Performance Advantages',
      description: 'Instant, scalable, integrated knowledge access',
      activeNodes: ['instant-access', 'context-independence', 'scalable-sharing', 'integrated-reasoning'],
      activeEdges: ['forward-instant', 'pattern-context', 'parallel-scalable', 'gradient-integrated'],
    },
    {
      title: 'Limitations Identified',
      description: 'Hallucination risk, update challenges, verification needs',
      activeNodes: ['hallucination-risk', 'update-challenge', 'fact-verification'],
      activeEdges: ['instant-hallucination', 'context-update', 'scalable-verification'],
    },
    {
      title: 'Hybrid Mitigation',
      description: 'Combine with non-parametric memory for robustness',
      activeNodes: ['hybrid-approach', 'hallucination-risk', 'update-challenge', 'fact-verification'],
      activeEdges: ['hallucination-hybrid', 'update-hybrid', 'verification-hybrid'],
    },
    {
      title: 'Knowledge Output',
      description: 'Quantum computing knowledge successfully retrieved',
      activeNodes: ['output-layer', 'integrated-reasoning', 'hybrid-approach', 'knowledge-output'],
      activeEdges: ['output-knowledge', 'integrated-output', 'hybrid-output'],
    },
  ],
};