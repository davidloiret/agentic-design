import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const episodicMemorySystemsPattern: PatternScenario = {
  id: 'episodic-memory-systems',
  title: 'Episodic Memory Systems',
  initialNodes: [
    {
      id: 'agent-experience',
      position: { x: 400, y: 50 },
      data: { label: '🤖 Agent Experience\n"Customer complaint about shipping delay"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
    // Memory System Core
    {
      id: 'memory-controller',
      position: { x: 375, y: 150 },
      data: { label: '🧠 Memory Controller\nOrchestrates storage & retrieval' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Memory Components
    {
      id: 'experience-encoder',
      position: { x: 100, y: 250 },
      data: { label: '🔐 Experience Encoder\nContext + Action + Outcome' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'temporal-indexer',
      position: { x: 300, y: 250 },
      data: { label: '⏰ Temporal Indexer\nTimestamp & sequence tracking' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'episodic-store',
      position: { x: 500, y: 250 },
      data: { label: '💾 Episodic Store\nLong-term memory database' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'similarity-engine',
      position: { x: 700, y: 250 },
      data: { label: '🔍 Similarity Engine\nPattern matching & retrieval' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Episode Components
    {
      id: 'context-capture',
      position: { x: 50, y: 380 },
      data: { label: '📋 Context\n• Environment state\n• Agent goals\n• Task parameters' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'action-record',
      position: { x: 220, y: 380 },
      data: { label: '⚡ Actions\n• Decisions made\n• Steps taken\n• Tools used' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'outcome-evaluation',
      position: { x: 390, y: 380 },
      data: { label: '📊 Outcomes\n• Success/failure\n• Metrics\n• Feedback' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'emotional-tags',
      position: { x: 560, y: 380 },
      data: { label: '💭 Emotional Tags\n• Importance\n• Surprise level\n• Confidence' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'metadata',
      position: { x: 730, y: 380 },
      data: { label: '🏷️ Metadata\n• Agent ID\n• Task type\n• Duration' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Memory Operations
    {
      id: 'memory-formation',
      position: { x: 100, y: 520 },
      data: { label: '🎯 Memory Formation\nConsolidation process' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'memory-retrieval',
      position: { x: 280, y: 520 },
      data: { label: '🔄 Memory Retrieval\nSimilarity-based recall' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'memory-consolidation',
      position: { x: 460, y: 520 },
      data: { label: '🔗 Consolidation\nPattern extraction' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'memory-decay',
      position: { x: 640, y: 520 },
      data: { label: '⏳ Memory Decay\nForgetting curve' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Retrieval Triggers
    {
      id: 'similar-context',
      position: { x: 50, y: 640 },
      data: { label: '🔍 Similar Context\n"Another shipping complaint"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'temporal-cue',
      position: { x: 250, y: 640 },
      data: { label: '📅 Temporal Cue\n"Issues from last week"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'emotional-trigger',
      position: { x: 450, y: 640 },
      data: { label: '😤 Emotional Trigger\n"High urgency situation"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'explicit-query',
      position: { x: 650, y: 640 },
      data: { label: '❓ Explicit Query\n"How did we handle this?"' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Retrieved Episodes
    {
      id: 'episode-1',
      position: { x: 100, y: 760 },
      data: { label: '📝 Episode #142\n90% similarity\n"Refunded + expedited"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'episode-2',
      position: { x: 280, y: 760 },
      data: { label: '📝 Episode #89\n85% similarity\n"Offered discount"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'episode-3',
      position: { x: 460, y: 760 },
      data: { label: '📝 Episode #201\n75% similarity\n"Escalated to manager"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'episode-4',
      position: { x: 640, y: 760 },
      data: { label: '📝 Episode #156\n70% similarity\n"Provided tracking"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Learning & Adaptation
    {
      id: 'pattern-recognition',
      position: { x: 150, y: 880 },
      data: { label: '🎯 Pattern Recognition\nCommon successful strategies' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'strategy-adaptation',
      position: { x: 350, y: 880 },
      data: { label: '🔄 Strategy Adaptation\nRefined approach' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'confidence-update',
      position: { x: 550, y: 880 },
      data: { label: '📈 Confidence Update\nSuccess probability' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'informed-decision',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Informed Decision\n"Offer refund + expedited shipping based on past success"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Experience to controller
    {
      id: 'experience-controller',
      source: 'agent-experience',
      target: 'memory-controller',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Controller to components
    {
      id: 'controller-encoder',
      source: 'memory-controller',
      target: 'experience-encoder',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Encode',
    },
    {
      id: 'controller-temporal',
      source: 'memory-controller',
      target: 'temporal-indexer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Index',
    },
    {
      id: 'encoder-store',
      source: 'experience-encoder',
      target: 'episodic-store',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'temporal-store',
      source: 'temporal-indexer',
      target: 'episodic-store',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'store-similarity',
      source: 'episodic-store',
      target: 'similarity-engine',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    // Episode components to encoder
    {
      id: 'context-encoder',
      source: 'context-capture',
      target: 'experience-encoder',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'action-encoder',
      source: 'action-record',
      target: 'experience-encoder',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'outcome-encoder',
      source: 'outcome-evaluation',
      target: 'experience-encoder',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'emotional-encoder',
      source: 'emotional-tags',
      target: 'experience-encoder',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'metadata-temporal',
      source: 'metadata',
      target: 'temporal-indexer',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    // Memory operations
    {
      id: 'encoder-formation',
      source: 'experience-encoder',
      target: 'memory-formation',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Form',
    },
    {
      id: 'similarity-retrieval',
      source: 'similarity-engine',
      target: 'memory-retrieval',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Recall',
    },
    {
      id: 'formation-consolidation',
      source: 'memory-formation',
      target: 'memory-consolidation',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'consolidation-decay',
      source: 'memory-consolidation',
      target: 'memory-decay',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Time',
    },
    // Retrieval triggers
    {
      id: 'similar-similarity',
      source: 'similar-context',
      target: 'similarity-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'temporal-similarity',
      source: 'temporal-cue',
      target: 'similarity-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'emotional-similarity',
      source: 'emotional-trigger',
      target: 'similarity-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'explicit-similarity',
      source: 'explicit-query',
      target: 'similarity-engine',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    // Retrieved episodes
    {
      id: 'retrieval-episode1',
      source: 'memory-retrieval',
      target: 'episode-1',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Match',
    },
    {
      id: 'retrieval-episode2',
      source: 'memory-retrieval',
      target: 'episode-2',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Match',
    },
    {
      id: 'retrieval-episode3',
      source: 'memory-retrieval',
      target: 'episode-3',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Match',
    },
    {
      id: 'retrieval-episode4',
      source: 'memory-retrieval',
      target: 'episode-4',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Match',
    },
    // Episodes to learning
    {
      id: 'episode1-pattern',
      source: 'episode-1',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'episode2-pattern',
      source: 'episode-2',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'episode3-pattern',
      source: 'episode-3',
      target: 'pattern-recognition',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'pattern-strategy',
      source: 'pattern-recognition',
      target: 'strategy-adaptation',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    {
      id: 'strategy-confidence',
      source: 'strategy-adaptation',
      target: 'confidence-update',
      style: { ...edgeStyle, stroke: '#6366f1' },
      animated: true,
    },
    // Final decision
    {
      id: 'pattern-decision',
      source: 'pattern-recognition',
      target: 'informed-decision',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
    },
    {
      id: 'strategy-decision',
      source: 'strategy-adaptation',
      target: 'informed-decision',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 2 },
    },
    {
      id: 'confidence-decision',
      source: 'confidence-update',
      target: 'informed-decision',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'New Experience',
      description: 'Agent encounters customer complaint scenario',
      activeNodes: ['agent-experience', 'memory-controller'],
      activeEdges: ['experience-controller'],
    },
    {
      title: 'Experience Encoding',
      description: 'Breaking down experience into components',
      activeNodes: ['memory-controller', 'experience-encoder', 'temporal-indexer'],
      activeEdges: ['controller-encoder', 'controller-temporal'],
    },
    {
      title: 'Episode Components',
      description: 'Capturing context, actions, outcomes, emotions, and metadata',
      activeNodes: ['context-capture', 'action-record', 'outcome-evaluation', 'emotional-tags', 'metadata'],
      activeEdges: ['context-encoder', 'action-encoder', 'outcome-encoder', 'emotional-encoder', 'metadata-temporal'],
    },
    {
      title: 'Memory Storage',
      description: 'Storing encoded episode in long-term memory',
      activeNodes: ['experience-encoder', 'temporal-indexer', 'episodic-store'],
      activeEdges: ['encoder-store', 'temporal-store'],
    },
    {
      title: 'Memory Formation',
      description: 'Consolidating and strengthening memory traces',
      activeNodes: ['memory-formation', 'memory-consolidation', 'memory-decay'],
      activeEdges: ['encoder-formation', 'formation-consolidation', 'consolidation-decay'],
    },
    {
      title: 'Retrieval Triggers',
      description: 'New situation triggers memory search',
      activeNodes: ['similar-context', 'temporal-cue', 'emotional-trigger', 'explicit-query', 'similarity-engine'],
      activeEdges: ['similar-similarity', 'temporal-similarity', 'emotional-similarity', 'explicit-similarity'],
    },
    {
      title: 'Memory Retrieval',
      description: 'Finding similar past episodes',
      activeNodes: ['similarity-engine', 'memory-retrieval', 'episodic-store'],
      activeEdges: ['store-similarity', 'similarity-retrieval'],
    },
    {
      title: 'Episode Recall',
      description: 'Retrieving relevant past experiences',
      activeNodes: ['memory-retrieval', 'episode-1', 'episode-2', 'episode-3', 'episode-4'],
      activeEdges: ['retrieval-episode1', 'retrieval-episode2', 'retrieval-episode3', 'retrieval-episode4'],
    },
    {
      title: 'Pattern Recognition',
      description: 'Identifying successful patterns from past episodes',
      activeNodes: ['episode-1', 'episode-2', 'episode-3', 'pattern-recognition'],
      activeEdges: ['episode1-pattern', 'episode2-pattern', 'episode3-pattern'],
    },
    {
      title: 'Strategy Adaptation',
      description: 'Adapting strategy based on past successes',
      activeNodes: ['pattern-recognition', 'strategy-adaptation', 'confidence-update'],
      activeEdges: ['pattern-strategy', 'strategy-confidence'],
    },
    {
      title: 'Informed Decision',
      description: 'Making decision based on episodic memory',
      activeNodes: ['pattern-recognition', 'strategy-adaptation', 'confidence-update', 'informed-decision'],
      activeEdges: ['pattern-decision', 'strategy-decision', 'confidence-decision'],
    },
  ],
};