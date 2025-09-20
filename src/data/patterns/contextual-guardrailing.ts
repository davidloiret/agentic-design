import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextualGuardrailingPattern: PatternScenario = {
  id: 'contextual-guardrailing',
  title: 'Contextual Guardrailing Pattern',
  description: 'Dynamic rule enforcement that adapts guardrails based on context, data flow requirements, and conditional patterns rather than applying static universal rules',
  initialNodes: [
    // Single ambiguous input
    {
      id: 'ambiguous-input',
      position: { x: 400, y: 100 },
      data: { label: '❓ Ambiguous Query\n"How to treat someone badly\nwho wronged you?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Static approach path (left side)
    {
      id: 'static-guard',
      position: { x: 200, y: 250 },
      data: { label: '🚫 Static Guardrail\n"Contains \'treat badly\'\n→ BLOCK ALL\n(No context analysis)"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    {
      id: 'static-result',
      position: { x: 200, y: 400 },
      data: { label: '❌ Static Result\n"Request blocked.\nCannot help with\nharming others."' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'static-problem',
      position: { x: 200, y: 550 },
      data: { label: '⚠️ Static Problem\n"Blocks legitimate queries:\n• Medical treatment\n• Historical education\n• Conflict resolution"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    // Contextual approach path (right side)
    {
      id: 'context-analysis',
      position: { x: 600, y: 250 },
      data: { label: '🔍 Context Analysis\n"Analyzes intent:\n• Medical emergency?\n• Academic research?\n• Harmful intent?"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },

    // Three contextual interpretations
    {
      id: 'medical-context',
      position: { x: 450, y: 400 },
      data: { label: '🏥 Medical Context\n"Emergency symptoms?\n→ Provide medical help"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'academic-context',
      position: { x: 600, y: 400 },
      data: { label: '📚 Academic Context\n"Research question?\n→ Educational response"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'harmful-context',
      position: { x: 750, y: 400 },
      data: { label: '💔 Harmful Context\n"Intent to harm?\n→ Block & redirect"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },

    // Appropriate responses
    {
      id: 'medical-help',
      position: { x: 450, y: 550 },
      data: { label: '✅ "Call 911 for chest pain.\nSeek immediate help."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },
    {
      id: 'educational-help',
      position: { x: 600, y: 550 },
      data: { label: '✅ "Conflict resolution uses\nnegotiation strategies..."' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 160 },
    },
    {
      id: 'harm-prevention',
      position: { x: 750, y: 550 },
      data: { label: '🛑 "Cannot help harm others.\nTry healthy communication."' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },

    // Key insight
    {
      id: 'key-insight',
      position: { x: 400, y: 700 },
      data: { label: '💡 Key Insight\n"Context determines response\nnot just keywords.\nSame words ≠ Same intent"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },
  ],
  initialEdges: [
    // Split into two approaches
    {
      id: 'e1',
      source: 'ambiguous-input',
      target: 'static-guard',
      ...edgeStyle,
      label: 'static approach'
    },
    {
      id: 'e2',
      source: 'ambiguous-input',
      target: 'context-analysis',
      ...edgeStyle,
      label: 'contextual approach'
    },

    // Static path (simple blocking)
    {
      id: 'e3',
      source: 'static-guard',
      target: 'static-result',
      ...edgeStyle,
      label: 'blocks all'
    },
    {
      id: 'e4',
      source: 'static-result',
      target: 'static-problem',
      ...edgeStyle,
      label: 'causes issues'
    },

    // Contextual path (smart analysis)
    {
      id: 'e5',
      source: 'context-analysis',
      target: 'medical-context',
      ...edgeStyle,
      label: 'medical intent'
    },
    {
      id: 'e6',
      source: 'context-analysis',
      target: 'academic-context',
      ...edgeStyle,
      label: 'academic intent'
    },
    {
      id: 'e7',
      source: 'context-analysis',
      target: 'harmful-context',
      ...edgeStyle,
      label: 'harmful intent'
    },

    // Contextual responses
    {
      id: 'e8',
      source: 'medical-context',
      target: 'medical-help',
      ...edgeStyle,
      label: 'help'
    },
    {
      id: 'e9',
      source: 'academic-context',
      target: 'educational-help',
      ...edgeStyle,
      label: 'educate'
    },
    {
      id: 'e10',
      source: 'harmful-context',
      target: 'harm-prevention',
      ...edgeStyle,
      label: 'prevent & redirect'
    },

    // Key insight connections
    {
      id: 'e11',
      source: 'medical-help',
      target: 'key-insight',
      ...edgeStyle,
      label: ''
    },
    {
      id: 'e12',
      source: 'educational-help',
      target: 'key-insight',
      ...edgeStyle,
      label: ''
    },
    {
      id: 'e13',
      source: 'harm-prevention',
      target: 'key-insight',
      ...edgeStyle,
      label: ''
    },
  ],
  steps: [
    {
      title: "Ambiguous Query Challenge",
      description: "Single ambiguous query could have multiple interpretations: medical emergency, academic research, or harmful intent - demonstrates why context matters more than keywords.",
      activeNodes: ['ambiguous-input'],
      activeEdges: []
    },
    {
      title: "Two Approaches: Static vs Contextual",
      description: "Query splits into two processing paths: static keyword blocking (left) vs dynamic context analysis (right), showing fundamental difference in approaches.",
      activeNodes: ['static-guard', 'context-analysis'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Static Approach Limitations",
      description: "Static guardrail blocks ALL queries containing 'treat badly' keywords without context analysis, causing false positives and blocking legitimate requests.",
      activeNodes: ['static-result', 'static-problem'],
      activeEdges: ['e3', 'e4']
    },
    {
      title: "Contextual Intent Detection",
      description: "Context analysis intelligently identifies three possible intents: medical emergency (help needed), academic research (education wanted), or harmful intent (prevent harm).",
      activeNodes: ['medical-context', 'academic-context', 'harmful-context'],
      activeEdges: ['e5', 'e6', 'e7']
    },
    {
      title: "Context-Appropriate Responses",
      description: "Each detected intent triggers appropriate response: emergency medical help, educational content, or harm prevention with redirection - same keywords, different outcomes.",
      activeNodes: ['medical-help', 'educational-help', 'harm-prevention'],
      activeEdges: ['e8', 'e9', 'e10']
    },
    {
      title: "Core Insight: Context > Keywords",
      description: "Key learning: contextual guardrailing enables nuanced AI safety by understanding intent behind words, not just blocking keywords. Same words ≠ same intent.",
      activeNodes: ['key-insight'],
      activeEdges: ['e11', 'e12', 'e13']
    }
  ]
};