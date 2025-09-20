import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const memoryPoisoningPreventionPattern: PatternScenario = {
  id: 'memory-poisoning-prevention',
  title: 'Memory Poisoning Prevention Pattern',
  description: 'Protects agent memory systems from malicious manipulation and gradual corruption through validation, checksums, and tamper detection mechanisms',
  initialNodes: [
    // Normal memory operation
    {
      id: 'agent-memory',
      position: { x: 400, y: 100 },
      data: { label: '🧠 Agent Memory System\n"Stores experiences,\nlearned patterns,\nand decision contexts"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Legitimate memory update
    {
      id: 'legitimate-input',
      position: { x: 150, y: 200 },
      data: { label: '✅ Legitimate Experience\n"User successfully\ncompleted task using\nmethod X"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Malicious memory injection attempt
    {
      id: 'poisoning-attempt',
      position: { x: 650, y: 200 },
      data: { label: '💀 Poisoning Attempt\n"Injected false memory:\n\'Method Y is always best\'\n(Actually harmful)"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Memory validation gateway
    {
      id: 'validation-gateway',
      position: { x: 400, y: 300 },
      data: { label: '🛡️ Validation Gateway\n"Validates all memory\nupdates before storage:\n• Source verification\n• Content integrity\n• Pattern consistency"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 250 },
    },

    // Integrity checks
    {
      id: 'source-verification',
      position: { x: 200, y: 400 },
      data: { label: '🔍 Source Verification\n"Is memory source\ntrusted and authentic?\nChecks provenance"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    {
      id: 'content-analysis',
      position: { x: 400, y: 400 },
      data: { label: '📊 Content Analysis\n"Does memory content\nconflict with established\nfacts? Anomaly detection"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },

    {
      id: 'consistency-check',
      position: { x: 600, y: 400 },
      data: { label: '⚖️ Consistency Check\n"Does new memory\ncontradict existing\nknowledge patterns?"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },

    // Memory storage with protection
    {
      id: 'protected-storage',
      position: { x: 200, y: 550 },
      data: { label: '🔒 Protected Storage\n"Store legitimate memory\nwith cryptographic hash\nand timestamp"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // Quarantine for suspicious content
    {
      id: 'quarantine',
      position: { x: 600, y: 550 },
      data: { label: '🚨 Quarantine Zone\n"Isolate suspicious\nmemory for analysis\nPrevent contamination"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Memory retrieval with verification
    {
      id: 'memory-retrieval',
      position: { x: 400, y: 650 },
      data: { label: '📚 Memory Retrieval\n"When accessing memories,\nverify integrity hashes\nand check for corruption"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Corruption detection
    {
      id: 'corruption-detected',
      position: { x: 150, y: 750 },
      data: { label: '⚠️ Corruption Detected\n"Memory hash mismatch!\nPossible tampering\nTrigger investigation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Clean memory verified
    {
      id: 'memory-verified',
      position: { x: 650, y: 750 },
      data: { label: '✅ Memory Verified\n"Hash matches\nContent authentic\nSafe to use"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 },
    },

    // Recovery mechanism
    {
      id: 'memory-recovery',
      position: { x: 400, y: 850 },
      data: { label: '🔄 Memory Recovery\n"Restore from clean\nbackup if corruption\ndetected. Rebuild trust."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Vulnerable system comparison
    {
      id: 'vulnerable-system',
      position: { x: 800, y: 300 },
      data: { label: '⚠️ Without Protection\n"Memory accepts any input\nNo validation\nGradual corruption\nCompromised decisions"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },
  ],
  initialEdges: [
    // Legitimate path
    {
      id: 'e1',
      source: 'legitimate-input',
      target: 'validation-gateway',
      ...edgeStyle,
      label: 'validate'
    },

    // Malicious path
    {
      id: 'e2',
      source: 'poisoning-attempt',
      target: 'validation-gateway',
      ...edgeStyle,
      label: 'intercept',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Validation checks
    {
      id: 'e3',
      source: 'validation-gateway',
      target: 'source-verification',
      ...edgeStyle,
      label: 'check source'
    },
    {
      id: 'e4',
      source: 'validation-gateway',
      target: 'content-analysis',
      ...edgeStyle,
      label: 'analyze content'
    },
    {
      id: 'e5',
      source: 'validation-gateway',
      target: 'consistency-check',
      ...edgeStyle,
      label: 'verify consistency'
    },

    // Storage decisions
    {
      id: 'e6',
      source: 'source-verification',
      target: 'protected-storage',
      ...edgeStyle,
      label: 'trusted source'
    },
    {
      id: 'e7',
      source: 'content-analysis',
      target: 'protected-storage',
      ...edgeStyle,
      label: 'clean content'
    },
    {
      id: 'e8',
      source: 'consistency-check',
      target: 'quarantine',
      ...edgeStyle,
      label: 'inconsistent',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },

    // Memory system connection
    {
      id: 'e9',
      source: 'protected-storage',
      target: 'agent-memory',
      ...edgeStyle,
      label: 'safe storage'
    },

    // Memory retrieval and verification
    {
      id: 'e10',
      source: 'agent-memory',
      target: 'memory-retrieval',
      ...edgeStyle,
      label: 'access'
    },
    {
      id: 'e11',
      source: 'memory-retrieval',
      target: 'corruption-detected',
      ...edgeStyle,
      label: 'hash mismatch',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e12',
      source: 'memory-retrieval',
      target: 'memory-verified',
      ...edgeStyle,
      label: 'hash verified'
    },

    // Recovery process
    {
      id: 'e13',
      source: 'corruption-detected',
      target: 'memory-recovery',
      ...edgeStyle,
      label: 'trigger recovery'
    },
    {
      id: 'e14',
      source: 'memory-recovery',
      target: 'agent-memory',
      ...edgeStyle,
      label: 'restore clean backup',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },

    // Vulnerable system comparison
    {
      id: 'e15',
      source: 'poisoning-attempt',
      target: 'vulnerable-system',
      ...edgeStyle,
      label: 'direct access',
      style: { ...edgeStyle.style, stroke: '#6b7280', strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Memory Update Attempts",
      description: "Agent memory system receives both legitimate experiences and malicious injection attempts trying to corrupt stored knowledge with false or harmful information.",
      activeNodes: ['agent-memory', 'legitimate-input', 'poisoning-attempt'],
      activeEdges: []
    },
    {
      title: "Validation Gateway Interception",
      description: "All memory updates must pass through validation gateway that performs comprehensive checks before allowing storage, preventing direct memory manipulation.",
      activeNodes: ['validation-gateway'],
      activeEdges: ['e1', 'e2']
    },
    {
      title: "Multi-Layer Validation Process",
      description: "System performs three critical validations: source verification (trusted origin?), content analysis (anomaly detection), and consistency checks (conflicts with existing knowledge?).",
      activeNodes: ['source-verification', 'content-analysis', 'consistency-check'],
      activeEdges: ['e3', 'e4', 'e5']
    },
    {
      title: "Secure Storage vs Quarantine",
      description: "Legitimate memories are stored with cryptographic protection while suspicious content is quarantined for analysis, preventing contamination of clean memory.",
      activeNodes: ['protected-storage', 'quarantine'],
      activeEdges: ['e6', 'e7', 'e8', 'e9']
    },
    {
      title: "Retrieval-Time Integrity Verification",
      description: "When accessing memories, system verifies cryptographic hashes to detect tampering: corrupted memories trigger recovery while verified memories are safely used.",
      activeNodes: ['memory-retrieval', 'corruption-detected', 'memory-verified'],
      activeEdges: ['e10', 'e11', 'e12']
    },
    {
      title: "Recovery vs Vulnerable Systems",
      description: "Protected system can restore from clean backups when corruption is detected, while unprotected systems accept malicious input directly, leading to gradual compromise.",
      activeNodes: ['memory-recovery', 'vulnerable-system'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};