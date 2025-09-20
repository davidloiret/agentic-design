import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const llmCheckpointRecoveryPattern: PatternScenario = {
  id: 'llm-checkpoint-recovery',
  title: 'LLM Checkpoint Recovery',
  initialNodes: [
    {
      id: 'writing-task',
      position: { x: 400, y: 50 },
      data: { label: '📝 Task: Write 10,000 Word Report\n"Analyze climate change impacts on agriculture"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
    // Normal Processing
    {
      id: 'llm-processing',
      position: { x: 100, y: 180 },
      data: { label: '🤖 LLM Processing\nGenerating report...\n7,500 words done' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'progress-75',
      position: { x: 100, y: 300 },
      data: { label: '📊 Progress: 75%\n30 minutes elapsed\n$5 compute cost' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Failure Happens
    {
      id: 'system-crash',
      position: { x: 350, y: 240 },
      data: { label: '💥 CRASH!\nGPU out of memory\nNetwork timeout\nProcess killed' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180 },
    },
    {
      id: 'without-checkpoint',
      position: { x: 600, y: 180 },
      data: { label: '😱 Without Checkpoints\nLost everything!\nStart from zero\nWaste $5 + 30 min' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    // Checkpoint System
    {
      id: 'checkpoint-manager',
      position: { x: 400, y: 380 },
      data: { label: '💾 Checkpoint Manager\nSaves progress every 1000 words' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 250 },
    },
    {
      id: 'checkpoint-1',
      position: { x: 150, y: 480 },
      data: { label: '✅ Checkpoint 1\n1000 words\nIntroduction saved' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'checkpoint-2',
      position: { x: 300, y: 480 },
      data: { label: '✅ Checkpoint 2\n3000 words\nAnalysis saved' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'checkpoint-3',
      position: { x: 450, y: 480 },
      data: { label: '✅ Checkpoint 3\n5000 words\nData section saved' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'checkpoint-4',
      position: { x: 600, y: 480 },
      data: { label: '✅ Checkpoint 4\n7000 words\nResults saved' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    // Recovery Process
    {
      id: 'detect-failure',
      position: { x: 200, y: 600 },
      data: { label: '🔍 Detect Failure\nProcess died at 7,500' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'find-checkpoint',
      position: { x: 380, y: 600 },
      data: { label: '📍 Find Last Checkpoint\nCheckpoint 4: 7,000 words' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'restore-state',
      position: { x: 580, y: 600 },
      data: { label: '🔄 Restore State\nLoad saved context\nRebuild memory' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Resume Work
    {
      id: 'resume-point',
      position: { x: 300, y: 720 },
      data: { label: '▶️ Resume from 7,000\nOnly redo 500 words\nSave time & money!' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'complete-task',
      position: { x: 520, y: 720 },
      data: { label: '✨ Task Complete\n10,000 words done\nMinimal time lost' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Benefits
    {
      id: 'save-time',
      position: { x: 150, y: 840 },
      data: { label: '⏱️ Save Time\n5 min vs 30 min\nrestart' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'save-money',
      position: { x: 320, y: 840 },
      data: { label: '💰 Save Money\n$0.50 vs $5.00\nrecompute' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'reliability',
      position: { x: 490, y: 840 },
      data: { label: '🛡️ Reliability\nNo fear of\nlong tasks' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'scalability',
      position: { x: 660, y: 840 },
      data: { label: '📈 Scalability\nHandle huge\nworkloads' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
  ],
  initialEdges: [
    // Normal processing
    {
      id: 'task-llm',
      source: 'writing-task',
      target: 'llm-processing',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'llm-progress',
      source: 'llm-processing',
      target: 'progress-75',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    // Crash happens
    {
      id: 'progress-crash',
      source: 'progress-75',
      target: 'system-crash',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
      label: 'CRASH!',
    },
    {
      id: 'crash-without',
      source: 'system-crash',
      target: 'without-checkpoint',
      style: { ...edgeStyle, stroke: '#ef4444', strokeWidth: 2 },
      animated: true,
    },
    // Checkpoint system
    {
      id: 'task-checkpoint',
      source: 'writing-task',
      target: 'checkpoint-manager',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'manager-cp1',
      source: 'checkpoint-manager',
      target: 'checkpoint-1',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'manager-cp2',
      source: 'checkpoint-manager',
      target: 'checkpoint-2',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'manager-cp3',
      source: 'checkpoint-manager',
      target: 'checkpoint-3',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'manager-cp4',
      source: 'checkpoint-manager',
      target: 'checkpoint-4',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Recovery process
    {
      id: 'crash-detect',
      source: 'system-crash',
      target: 'detect-failure',
      style: { ...edgeStyle, stroke: '#ec4899', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'detect-find',
      source: 'detect-failure',
      target: 'find-checkpoint',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'find-restore',
      source: 'find-checkpoint',
      target: 'restore-state',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'cp4-find',
      source: 'checkpoint-4',
      target: 'find-checkpoint',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5 5' },
      label: 'Latest',
    },
    // Resume work
    {
      id: 'restore-resume',
      source: 'restore-state',
      target: 'resume-point',
      style: { ...edgeStyle, stroke: '#6366f1', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'resume-complete',
      source: 'resume-point',
      target: 'complete-task',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    // Benefits
    {
      id: 'resume-time',
      source: 'resume-point',
      target: 'save-time',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'resume-money',
      source: 'resume-point',
      target: 'save-money',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'complete-reliability',
      source: 'complete-task',
      target: 'reliability',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'complete-scalability',
      source: 'complete-task',
      target: 'scalability',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'Long Task Running',
      description: 'Writing 10,000 word report on climate change',
      activeNodes: ['writing-task', 'llm-processing'],
      activeEdges: ['task-llm'],
    },
    {
      title: '75% Complete',
      description: '7,500 words done, 30 minutes elapsed',
      activeNodes: ['llm-processing', 'progress-75'],
      activeEdges: ['llm-progress'],
    },
    {
      title: 'System Crash!',
      description: 'GPU out of memory, process dies',
      activeNodes: ['progress-75', 'system-crash'],
      activeEdges: ['progress-crash'],
    },
    {
      title: 'Without Checkpoints',
      description: 'Lost everything! Must restart from zero',
      activeNodes: ['system-crash', 'without-checkpoint'],
      activeEdges: ['crash-without'],
    },
    {
      title: 'With Checkpoint System',
      description: 'Saves progress every 1000 words automatically',
      activeNodes: ['writing-task', 'checkpoint-manager', 'checkpoint-1', 'checkpoint-2', 'checkpoint-3', 'checkpoint-4'],
      activeEdges: ['task-checkpoint', 'manager-cp1', 'manager-cp2', 'manager-cp3', 'manager-cp4'],
    },
    {
      title: 'Detect & Find Checkpoint',
      description: 'System finds last checkpoint at 7,000 words',
      activeNodes: ['system-crash', 'detect-failure', 'find-checkpoint', 'checkpoint-4'],
      activeEdges: ['crash-detect', 'detect-find', 'cp4-find'],
    },
    {
      title: 'Restore State',
      description: 'Load saved context and rebuild memory',
      activeNodes: ['find-checkpoint', 'restore-state'],
      activeEdges: ['find-restore'],
    },
    {
      title: 'Resume from Checkpoint',
      description: 'Only need to redo 500 words instead of 7,500!',
      activeNodes: ['restore-state', 'resume-point', 'complete-task'],
      activeEdges: ['restore-resume', 'resume-complete'],
    },
    {
      title: 'Massive Savings',
      description: 'Save 25 minutes and $4.50 in compute costs',
      activeNodes: ['resume-point', 'complete-task', 'save-time', 'save-money', 'reliability', 'scalability'],
      activeEdges: ['resume-time', 'resume-money', 'complete-reliability', 'complete-scalability'],
    },
  ],
};