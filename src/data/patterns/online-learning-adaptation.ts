import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const onlineLearningAgentsPattern: PatternScenario = {
  id: 'online-learning-adaptation',
  title: 'Online Learning for Agents',
  initialNodes: [
    {
      id: 'stock-trading-agent',
      position: { x: 400, y: 50 },
      data: { label: '📈 Stock Trading Agent\nMarkets change every second!\nMust adapt in real-time' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // Monday Market
    {
      id: 'monday-market',
      position: { x: 100, y: 180 },
      data: { label: '📅 Monday 9:30 AM\nTech stocks rising\nAgent strategy: Buy tech' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'monday-action',
      position: { x: 100, y: 300 },
      data: { label: '💰 Action: Buy AAPL\nResult: +2% profit ✅' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Tuesday Shift
    {
      id: 'tuesday-news',
      position: { x: 350, y: 180 },
      data: { label: '📰 Tuesday 10:00 AM\nBreaking: Fed raises rates!\nMarket suddenly changes' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    {
      id: 'old-strategy-fails',
      position: { x: 350, y: 300 },
      data: { label: '❌ Old Strategy Fails\nBuy tech → Loss -3%\nNeed to adapt NOW!' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 180 },
    },
    // Online Learning Process
    {
      id: 'streaming-data',
      position: { x: 600, y: 180 },
      data: { label: '🌊 Streaming Data\nPrices every second\nNews in real-time\nMarket sentiment' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    {
      id: 'incremental-update',
      position: { x: 600, y: 300 },
      data: { label: '🔄 Incremental Update\nDon\'t retrain all\nJust adjust weights\nLearn from last trade' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Adaptation
    {
      id: 'pattern-shift',
      position: { x: 200, y: 420 },
      data: { label: '🔍 Detect Pattern Shift\nTech → Banking\nGrowth → Value\nRisk off!' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'strategy-update',
      position: { x: 400, y: 420 },
      data: { label: '🎯 Update Strategy\nSell tech\nBuy defensive stocks\nReduce position size' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'memory-buffer',
      position: { x: 600, y: 420 },
      data: { label: '💾 Memory Buffer\nKeep last 1000 trades\nForget old patterns\nStay current' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Wednesday Success
    {
      id: 'wednesday-market',
      position: { x: 250, y: 540 },
      data: { label: '📅 Wednesday\nBanking stocks rally\nDefensive play works!' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'adapted-action',
      position: { x: 500, y: 540 },
      data: { label: '💎 New Action: Buy JPM\nResult: +4% profit ✅\nAdaptation successful!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Key Features
    {
      id: 'feature-1',
      position: { x: 100, y: 660 },
      data: { label: '⚡ Real-Time\nLearn instantly\nNo batch wait' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'feature-2',
      position: { x: 270, y: 660 },
      data: { label: '🎯 Adaptive\nChange strategy\nas market shifts' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'feature-3',
      position: { x: 440, y: 660 },
      data: { label: '💾 Efficient\nNo full retrain\nJust updates' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    {
      id: 'feature-4',
      position: { x: 610, y: 660 },
      data: { label: '🔄 Continuous\n24/7 learning\nNever stops' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Final Result
    {
      id: 'adaptive-agent',
      position: { x: 400, y: 780 },
      data: { label: '🎉 Adaptive Trading Agent\nSurvived market crash by learning in real-time!\nProfit even in volatile markets!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Monday flow
    {
      id: 'agent-monday',
      source: 'stock-trading-agent',
      target: 'monday-market',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'monday-action-edge',
      source: 'monday-market',
      target: 'monday-action',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    // Tuesday disruption
    {
      id: 'agent-tuesday',
      source: 'stock-trading-agent',
      target: 'tuesday-news',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'tuesday-fails',
      source: 'tuesday-news',
      target: 'old-strategy-fails',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 2 },
      animated: true,
    },
    // Online learning
    {
      id: 'agent-streaming',
      source: 'stock-trading-agent',
      target: 'streaming-data',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'streaming-incremental',
      source: 'streaming-data',
      target: 'incremental-update',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      animated: true,
    },
    // Adaptation process
    {
      id: 'fails-pattern',
      source: 'old-strategy-fails',
      target: 'pattern-shift',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'pattern-strategy',
      source: 'pattern-shift',
      target: 'strategy-update',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'incremental-strategy',
      source: 'incremental-update',
      target: 'strategy-update',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'strategy-memory',
      source: 'strategy-update',
      target: 'memory-buffer',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Wednesday success
    {
      id: 'strategy-wednesday',
      source: 'strategy-update',
      target: 'wednesday-market',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'wednesday-adapted',
      source: 'wednesday-market',
      target: 'adapted-action',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    // Features
    {
      id: 'incremental-feature1',
      source: 'incremental-update',
      target: 'feature-1',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'strategy-feature2',
      source: 'strategy-update',
      target: 'feature-2',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'memory-feature3',
      source: 'memory-buffer',
      target: 'feature-3',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'streaming-feature4',
      source: 'streaming-data',
      target: 'feature-4',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // Final result
    {
      id: 'adapted-final',
      source: 'adapted-action',
      target: 'adaptive-agent',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'feature2-final',
      source: 'feature-2',
      target: 'adaptive-agent',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'Stock Trading Agent',
      description: 'Agent must adapt to changing markets in real-time',
      activeNodes: ['stock-trading-agent'],
      activeEdges: [],
    },
    {
      title: 'Monday: Initial Success',
      description: 'Tech stocks rising, buy AAPL, +2% profit',
      activeNodes: ['stock-trading-agent', 'monday-market', 'monday-action'],
      activeEdges: ['agent-monday', 'monday-action-edge'],
    },
    {
      title: 'Tuesday: Market Shock',
      description: 'Fed raises rates! Old strategy now loses money',
      activeNodes: ['stock-trading-agent', 'tuesday-news', 'old-strategy-fails'],
      activeEdges: ['agent-tuesday', 'tuesday-fails'],
    },
    {
      title: 'Online Learning Activates',
      description: 'Process streaming data and update incrementally',
      activeNodes: ['stock-trading-agent', 'streaming-data', 'incremental-update'],
      activeEdges: ['agent-streaming', 'streaming-incremental'],
    },
    {
      title: 'Real-Time Adaptation',
      description: 'Detect pattern shift, update strategy, manage memory',
      activeNodes: ['old-strategy-fails', 'pattern-shift', 'strategy-update', 'memory-buffer', 'incremental-update'],
      activeEdges: ['fails-pattern', 'pattern-strategy', 'incremental-strategy', 'strategy-memory'],
    },
    {
      title: 'Wednesday: Adapted Success',
      description: 'New strategy works! Banking stocks rally, +4% profit',
      activeNodes: ['strategy-update', 'wednesday-market', 'adapted-action'],
      activeEdges: ['strategy-wednesday', 'wednesday-adapted'],
    },
    {
      title: 'Key Features',
      description: 'Real-time, adaptive, efficient, continuous learning',
      activeNodes: ['incremental-update', 'strategy-update', 'memory-buffer', 'streaming-data', 'feature-1', 'feature-2', 'feature-3', 'feature-4'],
      activeEdges: ['incremental-feature1', 'strategy-feature2', 'memory-feature3', 'streaming-feature4'],
    },
    {
      title: 'Adaptive Agent Success',
      description: 'Survived market crash by learning in real-time!',
      activeNodes: ['adapted-action', 'feature-2', 'adaptive-agent'],
      activeEdges: ['adapted-final', 'feature2-final'],
    },
  ],
};