import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const bufferOfThoughtsPattern: PatternScenario = {
  id: 'buffer-of-thoughts',
  title: 'Buffer of Thoughts',
  description: 'Maintains a dynamic buffer of reusable thought patterns and reasoning strategies that can be retrieved and applied to new problems through analogical reasoning',
  initialNodes: [
    {
      id: 'thought-buffer',
      position: { x: 400, y: 50 },
      data: { label: '🧠 Dynamic Thought Buffer\n"Reusable reasoning patterns\nstored from past problems\nready for analogical reuse"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },
    // Stored thought patterns
    {
      id: 'optimization-pattern',
      position: { x: 150, y: 180 },
      data: { label: '⚡ Optimization Pattern\n"Identify bottleneck\n→ Remove constraint\n→ Measure improvement"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'debugging-pattern',
      position: { x: 400, y: 180 },
      data: { label: '🐛 Debugging Pattern\n"Isolate variables\n→ Test systematically\n→ Verify root cause"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'scaling-pattern',
      position: { x: 650, y: 180 },
      data: { label: '📈 Scaling Pattern\n"Start small\n→ Validate approach\n→ Expand gradually"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // New problem arrives
    {
      id: 'new-problem',
      position: { x: 400, y: 320 },
      data: { label: '❓ New Problem\n"Customer complaint:\nCheckout process too slow\n(taking 45 seconds)"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },
    // Pattern matching
    {
      id: 'pattern-matching',
      position: { x: 400, y: 420 },
      data: { label: '🔍 Pattern Matching\n"This feels like an\noptimization problem\nRetrieving similar patterns..."' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },
    // Retrieved pattern application
    {
      id: 'retrieved-optimization',
      position: { x: 150, y: 550 },
      data: { label: '⚡ Applied: Optimization\n"Checkout = bottleneck\nAnalyze: Payment API calls\nMultiple redundant requests"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 200 },
    },
    {
      id: 'retrieved-debugging',
      position: { x: 400, y: 550 },
      data: { label: '🐛 Applied: Debugging\n"Isolate: Payment step\nTest: Remove redundancy\nVerify: 45s → 12s"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },
    {
      id: 'retrieved-scaling',
      position: { x: 650, y: 550 },
      data: { label: '📈 Applied: Scaling\n"Fix validated locally\nGradual rollout: 10%→50%→100%\nMonitor performance"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },
    // Solution synthesis
    {
      id: 'solution-synthesis',
      position: { x: 400, y: 680 },
      data: { label: '🔗 Solution Synthesis\n"Combined all patterns:\nOptimize → Debug → Scale\nComprehensive solution"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },
    // Buffer update
    {
      id: 'buffer-update',
      position: { x: 400, y: 800 },
      data: { label: '📝 Buffer Update\n"New pattern learned:\nAPI Optimization Pattern\nAdded to buffer for reuse"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 220 },
    },
    // Next problem demonstration
    {
      id: 'next-problem',
      position: { x: 100, y: 320 },
      data: { label: '❓ Next Problem\n"Database queries\nrunning slowly\n(5 second delay)"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'instant-match',
      position: { x: 100, y: 420 },
      data: { label: '⚡ Instant Pattern Match\n"API optimization pattern\napplies here too!\nCheck for redundant queries"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    // Buffer management
    {
      id: 'buffer-management',
      position: { x: 700, y: 50 },
      data: { label: '⚙️ Buffer Management\n"Rank by success rate\nPrune outdated patterns\nMerge similar patterns"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 },
    },
  ],
  initialEdges: [
    // Buffer contains patterns
    {
      id: 'e1a',
      source: 'thought-buffer',
      target: 'optimization-pattern',
      ...edgeStyle,
      label: 'contains'
    },
    {
      id: 'e1b',
      source: 'thought-buffer',
      target: 'debugging-pattern',
      ...edgeStyle,
      label: 'contains'
    },
    {
      id: 'e1c',
      source: 'thought-buffer',
      target: 'scaling-pattern',
      ...edgeStyle,
      label: 'contains'
    },
    // Problem triggers pattern matching
    {
      id: 'e2',
      source: 'new-problem',
      target: 'pattern-matching',
      ...edgeStyle,
      label: 'triggers'
    },
    // Pattern matching retrieves relevant patterns
    {
      id: 'e3a',
      source: 'optimization-pattern',
      target: 'pattern-matching',
      ...edgeStyle,
      label: 'match detected'
    },
    {
      id: 'e3b',
      source: 'debugging-pattern',
      target: 'pattern-matching',
      ...edgeStyle,
      label: 'match detected'
    },
    {
      id: 'e3c',
      source: 'scaling-pattern',
      target: 'pattern-matching',
      ...edgeStyle,
      label: 'match detected'
    },
    // Apply retrieved patterns
    {
      id: 'e4a',
      source: 'pattern-matching',
      target: 'retrieved-optimization',
      ...edgeStyle,
      label: 'apply'
    },
    {
      id: 'e4b',
      source: 'pattern-matching',
      target: 'retrieved-debugging',
      ...edgeStyle,
      label: 'apply'
    },
    {
      id: 'e4c',
      source: 'pattern-matching',
      target: 'retrieved-scaling',
      ...edgeStyle,
      label: 'apply'
    },
    // Synthesis
    {
      id: 'e5a',
      source: 'retrieved-optimization',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute'
    },
    {
      id: 'e5b',
      source: 'retrieved-debugging',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute'
    },
    {
      id: 'e5c',
      source: 'retrieved-scaling',
      target: 'solution-synthesis',
      ...edgeStyle,
      label: 'contribute'
    },
    // Buffer update
    {
      id: 'e6',
      source: 'solution-synthesis',
      target: 'buffer-update',
      ...edgeStyle,
      label: 'learn new pattern'
    },
    {
      id: 'e7',
      source: 'buffer-update',
      target: 'thought-buffer',
      ...edgeStyle,
      label: 'update',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    // Next problem reuse
    {
      id: 'e8',
      source: 'next-problem',
      target: 'instant-match',
      ...edgeStyle,
      label: 'instant recognition'
    },
    {
      id: 'e9',
      source: 'buffer-update',
      target: 'instant-match',
      ...edgeStyle,
      label: 'enables reuse',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    // Buffer management
    {
      id: 'e10',
      source: 'buffer-management',
      target: 'thought-buffer',
      ...edgeStyle,
      label: 'manages'
    },
  ],
  steps: [
    {
      title: "Dynamic Thought Buffer Maintenance",
      description: "System maintains a living buffer of proven thought patterns: optimization (bottleneck analysis), debugging (systematic isolation), scaling (gradual rollout) with management for ranking and pruning.",
      activeNodes: ['thought-buffer', 'optimization-pattern', 'debugging-pattern', 'scaling-pattern', 'buffer-management'],
      activeEdges: ['e1a', 'e1b', 'e1c', 'e10']
    },
    {
      title: "Problem-Pattern Analogical Matching",
      description: "New checkout performance problem triggers pattern matching engine that recognizes similarity to stored optimization, debugging, and scaling patterns in the buffer.",
      activeNodes: ['new-problem', 'pattern-matching'],
      activeEdges: ['e2', 'e3a', 'e3b', 'e3c']
    },
    {
      title: "Multi-Pattern Application & Synthesis",
      description: "Retrieved patterns are applied simultaneously: optimization identifies API bottleneck, debugging isolates redundant calls, scaling plans gradual rollout - creating comprehensive solution.",
      activeNodes: ['retrieved-optimization', 'retrieved-debugging', 'retrieved-scaling', 'solution-synthesis'],
      activeEdges: ['e4a', 'e4b', 'e4c', 'e5a', 'e5b', 'e5c']
    },
    {
      title: "Buffer Learning & Pattern Extraction",
      description: "Successful solution generates new 'API Optimization Pattern' that is abstracted and added to the thought buffer for future reuse on similar problems.",
      activeNodes: ['buffer-update'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Accelerated Problem Solving Through Reuse",
      description: "When next database performance problem arises, the newly learned API optimization pattern enables instant recognition and solution application, demonstrating buffer's value for analogical reasoning.",
      activeNodes: ['next-problem', 'instant-match'],
      activeEdges: ['e8', 'e9']
    }
  ]
};