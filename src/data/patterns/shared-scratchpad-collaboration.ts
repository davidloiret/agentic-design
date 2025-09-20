import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const sharedScratchpadCollaborationPattern: PatternScenario = {
  id: 'shared-scratchpad-collaboration',
  title: 'Shared Scratchpad Collaboration',
  initialNodes: [
    {
      id: 'collaborative-task',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Collaborative Task\n"Write comprehensive research report on renewable energy"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    {
      id: 'shared-scratchpad',
      position: { x: 350, y: 150 },
      data: { label: '📋 Shared Scratchpad\nCentral collaborative workspace\nVersion: 1.0 | Last update: Agent-2' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 300 },
    },
    // Participating Agents
    {
      id: 'research-agent',
      position: { x: 50, y: 280 },
      data: { label: '🔍 Research Agent\nGather data & sources\nStatus: Writing §2.1' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 160 },
    },
    {
      id: 'analysis-agent',
      position: { x: 250, y: 280 },
      data: { label: '📊 Analysis Agent\nData interpretation\nStatus: Reviewing §1.3' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 160 },
    },
    {
      id: 'writing-agent',
      position: { x: 450, y: 280 },
      data: { label: '✍️ Writing Agent\nContent creation\nStatus: Editing §3.0' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 160 },
    },
    {
      id: 'fact-check-agent',
      position: { x: 650, y: 280 },
      data: { label: '✅ Fact-Check Agent\nVerify accuracy\nStatus: Validating §2.0' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 160 },
    },
    // Scratchpad Components
    {
      id: 'content-sections',
      position: { x: 100, y: 420 },
      data: { label: '📄 Content Sections\n1. Introduction ✓\n2. Solar Energy (in progress)\n3. Wind Power (draft)\n4. Hydroelectric (pending)' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'shared-notes',
      position: { x: 350, y: 420 },
      data: { label: '📝 Shared Notes\n• Key statistics database\n• Reference links\n• Terminology glossary\n• TODO items' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'version-history',
      position: { x: 600, y: 420 },
      data: { label: '📚 Version History\nv1.0: Initial outline\nv1.1: Research added\nv1.2: Analysis integrated\nv1.3: Current draft' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    // Collaboration Mechanisms
    {
      id: 'lock-manager',
      position: { x: 50, y: 550 },
      data: { label: '🔒 Lock Manager\nPrevent edit conflicts\nLocked: §2.1 by Research' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'change-tracker',
      position: { x: 250, y: 550 },
      data: { label: '📍 Change Tracker\nMonitor modifications\n+45 lines, -12 lines' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'merge-resolver',
      position: { x: 450, y: 550 },
      data: { label: '🔀 Merge Resolver\nHandle concurrent edits\nNo conflicts' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'notification-hub',
      position: { x: 650, y: 550 },
      data: { label: '🔔 Notification Hub\nBroadcast updates\n3 agents notified' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Coordination Features
    {
      id: 'task-coordinator',
      position: { x: 150, y: 680 },
      data: { label: '📋 Task Coordinator\nAssign sections to agents' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'consistency-checker',
      position: { x: 350, y: 680 },
      data: { label: '🎯 Consistency Checker\nEnsure coherent output' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'quality-monitor',
      position: { x: 550, y: 680 },
      data: { label: '⭐ Quality Monitor\nTrack content standards' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Synchronization Layer
    {
      id: 'sync-engine',
      position: { x: 250, y: 800 },
      data: { label: '🔄 Sync Engine\nReal-time synchronization' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'conflict-handler',
      position: { x: 450, y: 800 },
      data: { label: '⚠️ Conflict Handler\nResolve write conflicts' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'backup-manager',
      position: { x: 650, y: 800 },
      data: { label: '💾 Backup Manager\nAuto-save & recovery' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'output',
      position: { x: 400, y: 920 },
      data: { label: '✨ Completed Report\nComprehensive research document with full transparency' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 320 },
    },
  ],
  initialEdges: [
    {
      id: 'task-scratchpad',
      source: 'collaborative-task',
      target: 'shared-scratchpad',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    // Agents to scratchpad (bidirectional)
    {
      id: 'research-scratchpad',
      source: 'research-agent',
      target: 'shared-scratchpad',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Read/Write',
    },
    {
      id: 'scratchpad-research',
      source: 'shared-scratchpad',
      target: 'research-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'Updates',
    },
    {
      id: 'analysis-scratchpad',
      source: 'analysis-agent',
      target: 'shared-scratchpad',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Read/Write',
    },
    {
      id: 'scratchpad-analysis',
      source: 'shared-scratchpad',
      target: 'analysis-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'Updates',
    },
    {
      id: 'writing-scratchpad',
      source: 'writing-agent',
      target: 'shared-scratchpad',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Read/Write',
    },
    {
      id: 'scratchpad-writing',
      source: 'shared-scratchpad',
      target: 'writing-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'Updates',
    },
    {
      id: 'factcheck-scratchpad',
      source: 'fact-check-agent',
      target: 'shared-scratchpad',
      style: { ...edgeStyle, stroke: '#22c55e' },
      label: 'Read/Write',
    },
    {
      id: 'scratchpad-factcheck',
      source: 'shared-scratchpad',
      target: 'fact-check-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'Updates',
    },
    // Scratchpad to components
    {
      id: 'scratchpad-content',
      source: 'shared-scratchpad',
      target: 'content-sections',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'scratchpad-notes',
      source: 'shared-scratchpad',
      target: 'shared-notes',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'scratchpad-history',
      source: 'shared-scratchpad',
      target: 'version-history',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Agent interactions with components
    {
      id: 'research-content',
      source: 'research-agent',
      target: 'content-sections',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Write',
    },
    {
      id: 'analysis-notes',
      source: 'analysis-agent',
      target: 'shared-notes',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Update',
    },
    {
      id: 'writing-content',
      source: 'writing-agent',
      target: 'content-sections',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Edit',
    },
    // Collaboration mechanisms
    {
      id: 'content-lock',
      source: 'content-sections',
      target: 'lock-manager',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'content-change',
      source: 'content-sections',
      target: 'change-tracker',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'change-merge',
      source: 'change-tracker',
      target: 'merge-resolver',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'merge-notification',
      source: 'merge-resolver',
      target: 'notification-hub',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Notification to agents
    {
      id: 'notify-research',
      source: 'notification-hub',
      target: 'research-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
      label: 'Alert',
    },
    {
      id: 'notify-analysis',
      source: 'notification-hub',
      target: 'analysis-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
      label: 'Alert',
    },
    {
      id: 'notify-writing',
      source: 'notification-hub',
      target: 'writing-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeDasharray: '5 5' },
      label: 'Alert',
    },
    // Coordination
    {
      id: 'lock-coordinator',
      source: 'lock-manager',
      target: 'task-coordinator',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'merge-consistency',
      source: 'merge-resolver',
      target: 'consistency-checker',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'consistency-quality',
      source: 'consistency-checker',
      target: 'quality-monitor',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Synchronization
    {
      id: 'coordinator-sync',
      source: 'task-coordinator',
      target: 'sync-engine',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'consistency-conflict',
      source: 'consistency-checker',
      target: 'conflict-handler',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'quality-backup',
      source: 'quality-monitor',
      target: 'backup-manager',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Final output
    {
      id: 'sync-output',
      source: 'sync-engine',
      target: 'output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'conflict-output',
      source: 'conflict-handler',
      target: 'output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'backup-output',
      source: 'backup-manager',
      target: 'output',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Agent-to-agent visibility
    {
      id: 'research-analysis-visibility',
      source: 'research-agent',
      target: 'analysis-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'See work',
    },
    {
      id: 'analysis-writing-visibility',
      source: 'analysis-agent',
      target: 'writing-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'See work',
    },
    {
      id: 'writing-factcheck-visibility',
      source: 'writing-agent',
      target: 'fact-check-agent',
      style: { ...edgeStyle, stroke: '#64748b', strokeDasharray: '3 3' },
      label: 'See work',
    },
  ],
  steps: [
    {
      title: 'Collaborative Task',
      description: 'Complex task requiring multiple agents to work together',
      activeNodes: ['collaborative-task'],
      activeEdges: ['task-scratchpad'],
    },
    {
      title: 'Initialize Shared Workspace',
      description: 'Set up shared scratchpad with sections and components',
      activeNodes: ['shared-scratchpad', 'content-sections', 'shared-notes', 'version-history'],
      activeEdges: ['scratchpad-content', 'scratchpad-notes', 'scratchpad-history'],
    },
    {
      title: 'Agent Connection',
      description: 'All agents connect to shared scratchpad with read/write access',
      activeNodes: ['research-agent', 'analysis-agent', 'writing-agent', 'fact-check-agent', 'shared-scratchpad'],
      activeEdges: ['research-scratchpad', 'analysis-scratchpad', 'writing-scratchpad', 'factcheck-scratchpad'],
    },
    {
      title: 'Transparent Visibility',
      description: 'Agents can see each other\'s work in real-time',
      activeNodes: ['research-agent', 'analysis-agent', 'writing-agent', 'fact-check-agent'],
      activeEdges: ['research-analysis-visibility', 'analysis-writing-visibility', 'writing-factcheck-visibility'],
    },
    {
      title: 'Concurrent Work',
      description: 'Multiple agents work simultaneously on different sections',
      activeNodes: ['research-agent', 'writing-agent', 'content-sections', 'shared-notes'],
      activeEdges: ['research-content', 'writing-content', 'analysis-notes'],
    },
    {
      title: 'Lock Management',
      description: 'Prevent conflicts by locking sections being edited',
      activeNodes: ['content-sections', 'lock-manager', 'task-coordinator'],
      activeEdges: ['content-lock', 'lock-coordinator'],
    },
    {
      title: 'Change Tracking',
      description: 'Track all modifications made by agents',
      activeNodes: ['change-tracker', 'merge-resolver'],
      activeEdges: ['content-change', 'change-merge'],
    },
    {
      title: 'Update Notifications',
      description: 'Broadcast changes to all connected agents',
      activeNodes: ['notification-hub', 'research-agent', 'analysis-agent', 'writing-agent'],
      activeEdges: ['merge-notification', 'notify-research', 'notify-analysis', 'notify-writing'],
    },
    {
      title: 'Live Updates',
      description: 'Agents receive real-time updates from scratchpad',
      activeNodes: ['shared-scratchpad', 'research-agent', 'analysis-agent', 'writing-agent', 'fact-check-agent'],
      activeEdges: ['scratchpad-research', 'scratchpad-analysis', 'scratchpad-writing', 'scratchpad-factcheck'],
    },
    {
      title: 'Consistency Check',
      description: 'Ensure coherent output across all contributions',
      activeNodes: ['consistency-checker', 'quality-monitor'],
      activeEdges: ['merge-consistency', 'consistency-quality'],
    },
    {
      title: 'Synchronization',
      description: 'Sync all changes and resolve any conflicts',
      activeNodes: ['sync-engine', 'conflict-handler', 'backup-manager'],
      activeEdges: ['coordinator-sync', 'consistency-conflict', 'quality-backup'],
    },
    {
      title: 'Final Output',
      description: 'Deliver completed collaborative document',
      activeNodes: ['output', 'sync-engine', 'conflict-handler', 'backup-manager'],
      activeEdges: ['sync-output', 'conflict-output', 'backup-output'],
    },
  ],
};