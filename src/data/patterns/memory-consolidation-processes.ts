import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryConsolidationProcessesPattern: PatternScenario = {
  id: 'memory-consolidation-processes',
  title: 'Memory Consolidation Processes',
  initialNodes: [
    {
      id: 'short-term-experiences',
      position: { x: 400, y: 50 },
      data: { label: '⚡ Short-term Experiences\nAgent interactions, observations, decisions' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Consolidation Pipeline
    {
      id: 'consolidation-pipeline',
      position: { x: 375, y: 150 },
      data: { label: '🔄 Consolidation Pipeline\nMulti-stage transformation' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Initial Processing
    {
      id: 'experience-buffer',
      position: { x: 100, y: 250 },
      data: { label: '💾 Experience Buffer\nTemporary holding\nBatch processing' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'salience-detector',
      position: { x: 300, y: 250 },
      data: { label: '⭐ Salience Detector\nImportance scoring\nNovelty detection' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'pattern-identifier',
      position: { x: 500, y: 250 },
      data: { label: '🔍 Pattern Identifier\nRecurring themes\nStructure extraction' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'context-analyzer',
      position: { x: 700, y: 250 },
      data: { label: '🌐 Context Analyzer\nSituational factors\nEnvironmental state' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    // Consolidation Stages
    {
      id: 'synaptic-consolidation',
      position: { x: 50, y: 380 },
      data: { label: '🔗 Synaptic Stage\nImmediate stabilization\n0-6 hours' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'system-consolidation',
      position: { x: 220, y: 380 },
      data: { label: '🏗️ System Stage\nCross-region transfer\n6-24 hours' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'schema-integration',
      position: { x: 390, y: 380 },
      data: { label: '📊 Schema Integration\nKnowledge structures\n1-7 days' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'semantic-transformation',
      position: { x: 560, y: 380 },
      data: { label: '💡 Semantic Transform\nAbstract concepts\n7-30 days' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'long-term-encoding',
      position: { x: 730, y: 380 },
      data: { label: '🗄️ LTM Encoding\nPermanent storage\n30+ days' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Processing Mechanisms
    {
      id: 'replay-mechanism',
      position: { x: 100, y: 520 },
      data: { label: '🔁 Replay Mechanism\nExperience replay\nOffline processing' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'compression-engine',
      position: { x: 280, y: 520 },
      data: { label: '🗜️ Compression\nReduce redundancy\nExtract essence' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'abstraction-layer',
      position: { x: 460, y: 520 },
      data: { label: '📐 Abstraction\nGeneralize patterns\nRemove specifics' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    {
      id: 'association-builder',
      position: { x: 640, y: 520 },
      data: { label: '🔗 Association Builder\nLink formation\nNetwork growth' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 },
    },
    // Multi-Agent Coordination
    {
      id: 'agent-synchronizer',
      position: { x: 50, y: 640 },
      data: { label: '🤝 Agent Synchronizer\nShared experiences\nConsensus building' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'collective-memory',
      position: { x: 250, y: 640 },
      data: { label: '👥 Collective Memory\nShared knowledge\nGroup learning' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'distributed-processing',
      position: { x: 450, y: 640 },
      data: { label: '🌍 Distributed Processing\nParallel consolidation\nLoad balancing' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    {
      id: 'consensus-validator',
      position: { x: 650, y: 640 },
      data: { label: '✅ Consensus Validator\nConflict resolution\nTruth verification' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Quality Assurance
    {
      id: 'integrity-checker',
      position: { x: 100, y: 760 },
      data: { label: '🛡️ Integrity Check\nMemory validation\nError detection' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'coherence-monitor',
      position: { x: 280, y: 760 },
      data: { label: '🎯 Coherence Monitor\nConsistency check\nContradiction detection' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'completeness-analyzer',
      position: { x: 460, y: 760 },
      data: { label: '📊 Completeness\nGap identification\nMissing links' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'retention-tracker',
      position: { x: 640, y: 760 },
      data: { label: '📈 Retention Tracker\nMemory strength\nDecay monitoring' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Optimization
    {
      id: 'sleep-consolidation',
      position: { x: 150, y: 880 },
      data: { label: '😴 Sleep Consolidation\nOffline processing\nMemory replay' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'spaced-repetition',
      position: { x: 350, y: 880 },
      data: { label: '📅 Spaced Repetition\nOptimal intervals\nStrengthening' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'active-rehearsal',
      position: { x: 550, y: 880 },
      data: { label: '🎭 Active Rehearsal\nDeliberate practice\nReinforcement' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    {
      id: 'persistent-memory',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Persistent Long-term Memory\nStable, integrated knowledge for multi-agent systems' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 420 },
    },
  ],
  initialEdges: [
    // Input to pipeline
    {
      id: 'experiences-pipeline',
      source: 'short-term-experiences',
      target: 'consolidation-pipeline',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Pipeline to processors
    {
      id: 'pipeline-buffer',
      source: 'consolidation-pipeline',
      target: 'experience-buffer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Buffer',
    },
    {
      id: 'pipeline-salience',
      source: 'consolidation-pipeline',
      target: 'salience-detector',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Assess',
    },
    {
      id: 'pipeline-pattern',
      source: 'consolidation-pipeline',
      target: 'pattern-identifier',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Identify',
    },
    {
      id: 'pipeline-context',
      source: 'consolidation-pipeline',
      target: 'context-analyzer',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Analyze',
    },
    // Processors to stages
    {
      id: 'buffer-synaptic',
      source: 'experience-buffer',
      target: 'synaptic-consolidation',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'salience-system',
      source: 'salience-detector',
      target: 'system-consolidation',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'pattern-schema',
      source: 'pattern-identifier',
      target: 'schema-integration',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'context-semantic',
      source: 'context-analyzer',
      target: 'semantic-transformation',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Stage progression
    {
      id: 'synaptic-system',
      source: 'synaptic-consolidation',
      target: 'system-consolidation',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Progress',
      animated: true,
    },
    {
      id: 'system-schema',
      source: 'system-consolidation',
      target: 'schema-integration',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Progress',
      animated: true,
    },
    {
      id: 'schema-semantic',
      source: 'schema-integration',
      target: 'semantic-transformation',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Progress',
      animated: true,
    },
    {
      id: 'semantic-ltm',
      source: 'semantic-transformation',
      target: 'long-term-encoding',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Encode',
      animated: true,
    },
    // Stages to mechanisms
    {
      id: 'synaptic-replay',
      source: 'synaptic-consolidation',
      target: 'replay-mechanism',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'system-compression',
      source: 'system-consolidation',
      target: 'compression-engine',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'schema-abstraction',
      source: 'schema-integration',
      target: 'abstraction-layer',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'semantic-association',
      source: 'semantic-transformation',
      target: 'association-builder',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Mechanisms to multi-agent
    {
      id: 'replay-synchronizer',
      source: 'replay-mechanism',
      target: 'agent-synchronizer',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'compression-collective',
      source: 'compression-engine',
      target: 'collective-memory',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'abstraction-distributed',
      source: 'abstraction-layer',
      target: 'distributed-processing',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'association-consensus',
      source: 'association-builder',
      target: 'consensus-validator',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Multi-agent to quality
    {
      id: 'synchronizer-integrity',
      source: 'agent-synchronizer',
      target: 'integrity-checker',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'collective-coherence',
      source: 'collective-memory',
      target: 'coherence-monitor',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'distributed-completeness',
      source: 'distributed-processing',
      target: 'completeness-analyzer',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'consensus-retention',
      source: 'consensus-validator',
      target: 'retention-tracker',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Quality to optimization
    {
      id: 'integrity-sleep',
      source: 'integrity-checker',
      target: 'sleep-consolidation',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'coherence-spaced',
      source: 'coherence-monitor',
      target: 'spaced-repetition',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'completeness-rehearsal',
      source: 'completeness-analyzer',
      target: 'active-rehearsal',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Retention feedback
    {
      id: 'retention-sleep',
      source: 'retention-tracker',
      target: 'sleep-consolidation',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Feedback',
    },
    {
      id: 'retention-spaced',
      source: 'retention-tracker',
      target: 'spaced-repetition',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Feedback',
    },
    // LTM to optimization
    {
      id: 'ltm-sleep',
      source: 'long-term-encoding',
      target: 'sleep-consolidation',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    {
      id: 'ltm-spaced',
      source: 'long-term-encoding',
      target: 'spaced-repetition',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    {
      id: 'ltm-rehearsal',
      source: 'long-term-encoding',
      target: 'active-rehearsal',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3 3' },
    },
    // Optimization to output
    {
      id: 'sleep-persistent',
      source: 'sleep-consolidation',
      target: 'persistent-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'spaced-persistent',
      source: 'spaced-repetition',
      target: 'persistent-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'rehearsal-persistent',
      source: 'active-rehearsal',
      target: 'persistent-memory',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    // LTM to output
    {
      id: 'ltm-persistent',
      source: 'long-term-encoding',
      target: 'persistent-memory',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Experience Capture',
      description: 'Short-term experiences enter consolidation pipeline',
      activeNodes: ['short-term-experiences', 'consolidation-pipeline'],
      activeEdges: ['experiences-pipeline'],
    },
    {
      title: 'Initial Processing',
      description: 'Buffering, salience detection, pattern identification, context analysis',
      activeNodes: ['consolidation-pipeline', 'experience-buffer', 'salience-detector', 'pattern-identifier', 'context-analyzer'],
      activeEdges: ['pipeline-buffer', 'pipeline-salience', 'pipeline-pattern', 'pipeline-context'],
    },
    {
      title: 'Early Consolidation',
      description: 'Synaptic and system consolidation stages begin',
      activeNodes: ['experience-buffer', 'salience-detector', 'synaptic-consolidation', 'system-consolidation'],
      activeEdges: ['buffer-synaptic', 'salience-system'],
    },
    {
      title: 'Schema Formation',
      description: 'Integration into knowledge schemas and semantic transformation',
      activeNodes: ['pattern-identifier', 'context-analyzer', 'schema-integration', 'semantic-transformation'],
      activeEdges: ['pattern-schema', 'context-semantic'],
    },
    {
      title: 'Stage Progression',
      description: 'Memory progresses through consolidation stages',
      activeNodes: ['synaptic-consolidation', 'system-consolidation', 'schema-integration', 'semantic-transformation', 'long-term-encoding'],
      activeEdges: ['synaptic-system', 'system-schema', 'schema-semantic', 'semantic-ltm'],
    },
    {
      title: 'Processing Mechanisms',
      description: 'Replay, compression, abstraction, and association building',
      activeNodes: ['replay-mechanism', 'compression-engine', 'abstraction-layer', 'association-builder'],
      activeEdges: ['synaptic-replay', 'system-compression', 'schema-abstraction', 'semantic-association'],
    },
    {
      title: 'Multi-Agent Coordination',
      description: 'Synchronization and collective memory formation',
      activeNodes: ['agent-synchronizer', 'collective-memory', 'distributed-processing', 'consensus-validator'],
      activeEdges: ['replay-synchronizer', 'compression-collective', 'abstraction-distributed', 'association-consensus'],
    },
    {
      title: 'Quality Assurance',
      description: 'Integrity, coherence, completeness, and retention checking',
      activeNodes: ['integrity-checker', 'coherence-monitor', 'completeness-analyzer', 'retention-tracker'],
      activeEdges: ['synchronizer-integrity', 'collective-coherence', 'distributed-completeness', 'consensus-retention'],
    },
    {
      title: 'Optimization Strategies',
      description: 'Sleep consolidation, spaced repetition, and active rehearsal',
      activeNodes: ['sleep-consolidation', 'spaced-repetition', 'active-rehearsal'],
      activeEdges: ['integrity-sleep', 'coherence-spaced', 'completeness-rehearsal'],
    },
    {
      title: 'Retention Feedback',
      description: 'Adjusting optimization based on retention metrics',
      activeNodes: ['retention-tracker', 'sleep-consolidation', 'spaced-repetition'],
      activeEdges: ['retention-sleep', 'retention-spaced'],
    },
    {
      title: 'Long-term Integration',
      description: 'Final encoding and optimization',
      activeNodes: ['long-term-encoding', 'sleep-consolidation', 'spaced-repetition', 'active-rehearsal'],
      activeEdges: ['ltm-sleep', 'ltm-spaced', 'ltm-rehearsal'],
    },
    {
      title: 'Persistent Memory',
      description: 'Stable long-term memory achieved for multi-agent system',
      activeNodes: ['long-term-encoding', 'sleep-consolidation', 'spaced-repetition', 'active-rehearsal', 'persistent-memory'],
      activeEdges: ['ltm-persistent', 'sleep-persistent', 'spaced-persistent', 'rehearsal-persistent'],
    },
  ],
};