import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryBasedLearningPattern: PatternScenario = {
  id: 'memory-based-learning',
  title: 'Memory-Based Learning',
  initialNodes: [
    {
      id: 'travel-assistant',
      position: { x: 400, y: 50 },
      data: { label: '✈️ AI Travel Assistant\nHelps users plan trips based on past experiences' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Past Experiences (Memory)
    {
      id: 'memory-bank',
      position: { x: 400, y: 150 },
      data: { label: '🧠 Memory Bank\n1000s of past trip experiences stored' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 300 },
    },
    {
      id: 'experience-1',
      position: { x: 50, y: 250 },
      data: { label: '📍 Memory #1\nUser: "Beach vacation"\nLocation: Bali\nResult: Loved it! 5⭐' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'experience-2',
      position: { x: 230, y: 250 },
      data: { label: '📍 Memory #2\nUser: "City break"\nLocation: Paris\nResult: Too crowded 2⭐' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'experience-3',
      position: { x: 410, y: 250 },
      data: { label: '📍 Memory #3\nUser: "Adventure trip"\nLocation: Nepal\nResult: Amazing! 5⭐' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'experience-4',
      position: { x: 590, y: 250 },
      data: { label: '📍 Memory #4\nUser: "Family vacation"\nLocation: Disney\nResult: Kids happy 4⭐' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'experience-5',
      position: { x: 770, y: 250 },
      data: { label: '📍 Memory #5\nUser: "Quiet retreat"\nLocation: Japan\nResult: Perfect! 5⭐' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    // New Query
    {
      id: 'new-query',
      position: { x: 400, y: 370 },
      data: { label: '💬 New User Query\n"I want a relaxing beach vacation,\nnot too touristy, good food"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 350 },
    },
    // Memory Retrieval Process
    {
      id: 'similarity-search',
      position: { x: 150, y: 470 },
      data: { label: '🔍 Similarity Search\nFind similar past trips\nBeach + Relaxing' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'pattern-matching',
      position: { x: 350, y: 470 },
      data: { label: '🎯 Pattern Matching\nBali: Beach ✓ Relaxing ✓\nParis: City ✗\nJapan: Relaxing ✓' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'outcome-analysis',
      position: { x: 550, y: 470 },
      data: { label: '📊 Outcome Analysis\nBali: 5⭐ success\nSimilar users loved it\nGood food mentioned' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Learning & Adaptation
    {
      id: 'combine-memories',
      position: { x: 250, y: 580 },
      data: { label: '🔄 Combine Memories\nBali (beach) + Japan (quiet)\n= Gili Islands suggestion' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 200 },
    },
    {
      id: 'avoid-mistakes',
      position: { x: 500, y: 580 },
      data: { label: '⚠️ Avoid Past Mistakes\nParis was too crowded\nAvoid peak season\nSuggest off-season' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    // Recommendation
    {
      id: 'personalized-rec',
      position: { x: 400, y: 690 },
      data: { label: '✨ Personalized Recommendation\n"Try Gili Islands, Indonesia!\n• Quieter than Bali\n• Beautiful beaches\n• Amazing seafood\n• Best in April (off-season)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // New Memory Creation
    {
      id: 'user-feedback',
      position: { x: 200, y: 800 },
      data: { label: '📝 User Goes & Returns\n"Gili Islands was perfect!"\n5⭐ rating' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'store-memory',
      position: { x: 450, y: 800 },
      data: { label: '💾 Store New Memory\nQuery + Recommendation\n+ Outcome = Learning' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    // System Improvement
    {
      id: 'improved-system',
      position: { x: 400, y: 900 },
      data: { label: '🎉 Smarter Assistant\nNow knows: "relaxing beach" → Gili Islands works!\nGets better with every trip!' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Memory bank connections
    {
      id: 'assistant-memory',
      source: 'travel-assistant',
      target: 'memory-bank',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 3 },
      animated: true,
    },
    {
      id: 'memory-exp1',
      source: 'memory-bank',
      target: 'experience-1',
      style: { ...edgeStyle, stroke: '#3b82f6' },
    },
    {
      id: 'memory-exp2',
      source: 'memory-bank',
      target: 'experience-2',
      style: { ...edgeStyle, stroke: '#3b82f6' },
    },
    {
      id: 'memory-exp3',
      source: 'memory-bank',
      target: 'experience-3',
      style: { ...edgeStyle, stroke: '#3b82f6' },
    },
    {
      id: 'memory-exp4',
      source: 'memory-bank',
      target: 'experience-4',
      style: { ...edgeStyle, stroke: '#3b82f6' },
    },
    {
      id: 'memory-exp5',
      source: 'memory-bank',
      target: 'experience-5',
      style: { ...edgeStyle, stroke: '#3b82f6' },
    },
    // New query flow
    {
      id: 'assistant-query',
      source: 'travel-assistant',
      target: 'new-query',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeWidth: 2 },
      animated: true,
    },
    // Retrieval process
    {
      id: 'query-similarity',
      source: 'new-query',
      target: 'similarity-search',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'similarity-pattern',
      source: 'similarity-search',
      target: 'pattern-matching',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'pattern-outcome',
      source: 'pattern-matching',
      target: 'outcome-analysis',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Memory connections to retrieval
    {
      id: 'exp1-similarity',
      source: 'experience-1',
      target: 'similarity-search',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3 3' },
    },
    {
      id: 'exp5-similarity',
      source: 'experience-5',
      target: 'similarity-search',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3 3' },
    },
    // Learning & adaptation
    {
      id: 'outcome-combine',
      source: 'outcome-analysis',
      target: 'combine-memories',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'pattern-avoid',
      source: 'pattern-matching',
      target: 'avoid-mistakes',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    // Generate recommendation
    {
      id: 'combine-rec',
      source: 'combine-memories',
      target: 'personalized-rec',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'avoid-rec',
      source: 'avoid-mistakes',
      target: 'personalized-rec',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    // Feedback loop
    {
      id: 'rec-feedback',
      source: 'personalized-rec',
      target: 'user-feedback',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'feedback-store',
      source: 'user-feedback',
      target: 'store-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'store-bank',
      source: 'store-memory',
      target: 'memory-bank',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
      label: 'Update',
    },
    // System improvement
    {
      id: 'store-improved',
      source: 'store-memory',
      target: 'improved-system',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'AI Travel Assistant',
      description: 'Helps plan trips using past experiences',
      activeNodes: ['travel-assistant', 'memory-bank'],
      activeEdges: ['assistant-memory'],
    },
    {
      title: 'Memory Bank',
      description: 'Stores thousands of past trip experiences with outcomes',
      activeNodes: ['memory-bank', 'experience-1', 'experience-2', 'experience-3', 'experience-4', 'experience-5'],
      activeEdges: ['memory-exp1', 'memory-exp2', 'memory-exp3', 'memory-exp4', 'memory-exp5'],
    },
    {
      title: 'New User Query',
      description: 'User wants relaxing beach vacation, not touristy',
      activeNodes: ['travel-assistant', 'new-query'],
      activeEdges: ['assistant-query'],
    },
    {
      title: 'Memory Retrieval',
      description: 'Search for similar trips, match patterns, analyze outcomes',
      activeNodes: ['new-query', 'similarity-search', 'pattern-matching', 'outcome-analysis', 'experience-1', 'experience-5'],
      activeEdges: ['query-similarity', 'similarity-pattern', 'pattern-outcome', 'exp1-similarity', 'exp5-similarity'],
    },
    {
      title: 'Learn from Memories',
      description: 'Combine successful trips, avoid past mistakes',
      activeNodes: ['outcome-analysis', 'pattern-matching', 'combine-memories', 'avoid-mistakes'],
      activeEdges: ['outcome-combine', 'pattern-avoid'],
    },
    {
      title: 'Generate Recommendation',
      description: 'Suggest Gili Islands based on memory patterns',
      activeNodes: ['combine-memories', 'avoid-mistakes', 'personalized-rec'],
      activeEdges: ['combine-rec', 'avoid-rec'],
    },
    {
      title: 'User Feedback',
      description: 'User loves Gili Islands, rates 5 stars',
      activeNodes: ['personalized-rec', 'user-feedback', 'store-memory'],
      activeEdges: ['rec-feedback', 'feedback-store'],
    },
    {
      title: 'Store New Memory',
      description: 'Add this successful experience to memory bank',
      activeNodes: ['store-memory', 'memory-bank'],
      activeEdges: ['store-bank'],
    },
    {
      title: 'Improved System',
      description: 'Assistant gets smarter with every trip!',
      activeNodes: ['store-memory', 'improved-system'],
      activeEdges: ['store-improved'],
    },
  ],
};