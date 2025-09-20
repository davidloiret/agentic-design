import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agentContextPreservationPattern: PatternScenario = {
  id: 'agent-context-preservation',
  title: 'Agent Context Preservation and Recovery',
  description: 'Maintains conversation context, memory state, and relationship continuity during system failures, enabling seamless recovery without losing progress or requiring users to restart interactions.',
  initialNodes: [
    {
      id: 'therapy-session',
      position: { x: 400, y: 50 },
      data: { label: '🧠 AI Therapy Assistant\nDeep 2-hour session helping user with anxiety' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Conversation Context
    {
      id: 'hour-1-context',
      position: { x: 100, y: 150 },
      data: { label: '💬 Hour 1 Context\n• User\'s background\n• Family situation\n• Work stress\n• Health history' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'breakthroughs',
      position: { x: 300, y: 150 },
      data: { label: '💡 Breakthroughs\n• Root cause found\n• Childhood trauma\n• Coping patterns\n• Trust established' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'current-topic',
      position: { x: 500, y: 150 },
      data: { label: '🎯 Current Topic\n"Working through\nfear of failure"' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'emotional-state',
      position: { x: 700, y: 150 },
      data: { label: '❤️ Emotional State\nUser: Vulnerable\nAgent: Supportive\nRapport: High' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // System Crash
    {
      id: 'connection-lost',
      position: { x: 400, y: 270 },
      data: { label: '💥 CONNECTION LOST!\nServer crash at 1h 45min\nSession interrupted!' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Without Preservation
    {
      id: 'without-preservation',
      position: { x: 100, y: 380 },
      data: { label: '😱 Without Preservation\n"Hello, how can I help?"\nNo memory of session\nUser must start over\nTrust broken!' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    // With Preservation System
    {
      id: 'context-snapshot',
      position: { x: 400, y: 380 },
      data: { label: '📸 Context Snapshot\nSaved every 5 minutes' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 },
    },
    {
      id: 'preserved-data',
      position: { x: 650, y: 380 },
      data: { label: '💾 Preserved Data\n• Full conversation\n• Emotional markers\n• Key insights\n• Current thread' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Preservation Components
    {
      id: 'conversation-history',
      position: { x: 150, y: 500 },
      data: { label: '📜 Conversation\n90 messages\nFull transcript' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'memory-state',
      position: { x: 310, y: 500 },
      data: { label: '🧩 Memory State\nUser facts\nPreferences\nTriggers' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'reasoning-chain',
      position: { x: 470, y: 500 },
      data: { label: '🔗 Reasoning\nTherapy approach\nTechniques used\nNext steps' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'relationship-state',
      position: { x: 630, y: 500 },
      data: { label: '💫 Relationship\nTrust level: 9/10\nComfort: High\nProgress: 70%' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    // Recovery Process
    {
      id: 'detect-disconnect',
      position: { x: 200, y: 620 },
      data: { label: '🔍 Detect Disconnect\nUser reconnects' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'load-context',
      position: { x: 380, y: 620 },
      data: { label: '📂 Load Context\nRestore full state\nfrom 5 min ago' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'rebuild-state',
      position: { x: 560, y: 620 },
      data: { label: '🔄 Rebuild State\nReconstruct memory\nResume reasoning' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Seamless Recovery
    {
      id: 'acknowledge-disruption',
      position: { x: 250, y: 740 },
      data: { label: '👋 Acknowledge\n"Sorry for the interruption.\nWe were discussing your\nfear of failure..."' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 200 },
    },
    {
      id: 'continue-session',
      position: { x: 500, y: 740 },
      data: { label: '✨ Continue Seamlessly\n"You mentioned your father\'s\nexpectations. Let\'s explore\nthat further..."' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },
    // Success
    {
      id: 'preserved-trust',
      position: { x: 400, y: 860 },
      data: { label: '🎉 Trust Preserved!\nUser feels heard and remembered\nTherapy progress continues\nNo need to repeat painful stories!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Context building
    {
      id: 'session-hour1',
      source: 'therapy-session',
      target: 'hour-1-context',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'session-breakthroughs',
      source: 'therapy-session',
      target: 'breakthroughs',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'session-current',
      source: 'therapy-session',
      target: 'current-topic',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'session-emotional',
      source: 'therapy-session',
      target: 'emotional-state',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    // Crash
    {
      id: 'current-crash',
      source: 'current-topic',
      target: 'connection-lost',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
      label: 'CRASH!',
    },
    // Without preservation
    {
      id: 'crash-without',
      source: 'connection-lost',
      target: 'without-preservation',
      style: { ...edgeStyle, stroke: '#ef4444', strokeWidth: 2 },
      animated: true,
    },
    // With preservation
    {
      id: 'crash-snapshot',
      source: 'connection-lost',
      target: 'context-snapshot',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'snapshot-preserved',
      source: 'context-snapshot',
      target: 'preserved-data',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      animated: true,
    },
    // Preservation components
    {
      id: 'preserved-conversation',
      source: 'preserved-data',
      target: 'conversation-history',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'preserved-memory',
      source: 'preserved-data',
      target: 'memory-state',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'preserved-reasoning',
      source: 'preserved-data',
      target: 'reasoning-chain',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'preserved-relationship',
      source: 'preserved-data',
      target: 'relationship-state',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Recovery process
    {
      id: 'crash-detect',
      source: 'connection-lost',
      target: 'detect-disconnect',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'detect-load',
      source: 'detect-disconnect',
      target: 'load-context',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'load-rebuild',
      source: 'load-context',
      target: 'rebuild-state',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Load from preserved
    {
      id: 'conversation-load',
      source: 'conversation-history',
      target: 'load-context',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'memory-load',
      source: 'memory-state',
      target: 'load-context',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'reasoning-load',
      source: 'reasoning-chain',
      target: 'load-context',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    {
      id: 'relationship-load',
      source: 'relationship-state',
      target: 'load-context',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3 3' },
    },
    // Seamless recovery
    {
      id: 'rebuild-acknowledge',
      source: 'rebuild-state',
      target: 'acknowledge-disruption',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'acknowledge-continue',
      source: 'acknowledge-disruption',
      target: 'continue-session',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    // Success
    {
      id: 'continue-trust',
      source: 'continue-session',
      target: 'preserved-trust',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Deep Therapy Session',
      description: '2-hour AI therapy session in progress',
      activeNodes: ['therapy-session'],
      activeEdges: [],
    },
    {
      title: 'Rich Context Built',
      description: 'Hour of conversation, breakthroughs, trust established',
      activeNodes: ['therapy-session', 'hour-1-context', 'breakthroughs', 'current-topic', 'emotional-state'],
      activeEdges: ['session-hour1', 'session-breakthroughs', 'session-current', 'session-emotional'],
    },
    {
      title: 'Connection Lost!',
      description: 'Server crashes at 1h 45min - critical moment',
      activeNodes: ['current-topic', 'connection-lost'],
      activeEdges: ['current-crash'],
    },
    {
      title: 'Without Preservation',
      description: 'Agent has no memory - user must start over!',
      activeNodes: ['connection-lost', 'without-preservation'],
      activeEdges: ['crash-without'],
    },
    {
      title: 'With Context Preservation',
      description: 'System saved snapshots every 5 minutes',
      activeNodes: ['connection-lost', 'context-snapshot', 'preserved-data'],
      activeEdges: ['crash-snapshot', 'snapshot-preserved'],
    },
    {
      title: 'Preserved Components',
      description: 'Conversation, memory, reasoning, and relationship saved',
      activeNodes: ['preserved-data', 'conversation-history', 'memory-state', 'reasoning-chain', 'relationship-state'],
      activeEdges: ['preserved-conversation', 'preserved-memory', 'preserved-reasoning', 'preserved-relationship'],
    },
    {
      title: 'Recovery Process',
      description: 'Detect reconnection, load context, rebuild state',
      activeNodes: ['connection-lost', 'detect-disconnect', 'load-context', 'rebuild-state', 'conversation-history', 'memory-state', 'reasoning-chain', 'relationship-state'],
      activeEdges: ['crash-detect', 'detect-load', 'load-rebuild', 'conversation-load', 'memory-load', 'reasoning-load', 'relationship-load'],
    },
    {
      title: 'Seamless Continuation',
      description: 'Acknowledge interruption and continue where left off',
      activeNodes: ['rebuild-state', 'acknowledge-disruption', 'continue-session'],
      activeEdges: ['rebuild-acknowledge', 'acknowledge-continue'],
    },
    {
      title: 'Trust Preserved',
      description: 'User feels heard, therapy continues without repetition',
      activeNodes: ['continue-session', 'preserved-trust'],
      activeEdges: ['continue-trust'],
    },
  ],
};