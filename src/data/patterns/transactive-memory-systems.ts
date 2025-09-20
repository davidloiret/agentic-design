import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const transactiveMemorySystemsPattern: PatternScenario = {
  id: 'transactive-memory-systems',
  title: 'Transactive Memory Systems',
  initialNodes: [
    {
      id: 'complex-task',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Complex Task\n"Design and implement a multi-modal AI system"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Transactive Memory Core
    {
      id: 'tms-coordinator',
      position: { x: 375, y: 150 },
      data: { label: '🧠 TMS Coordinator\nDistributed knowledge management' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 250 },
    },
    // Agent Specialists
    {
      id: 'vision-agent',
      position: { x: 100, y: 250 },
      data: { label: '👁️ Vision Agent\nSpecialist: Computer Vision\nExpertise: CNNs, Object Detection' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'nlp-agent',
      position: { x: 320, y: 250 },
      data: { label: '💬 NLP Agent\nSpecialist: Language Processing\nExpertise: Transformers, LLMs' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'audio-agent',
      position: { x: 540, y: 250 },
      data: { label: '🎵 Audio Agent\nSpecialist: Sound Processing\nExpertise: Speech, Music' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    {
      id: 'integration-agent',
      position: { x: 760, y: 250 },
      data: { label: '🔧 Integration Agent\nSpecialist: System Architecture\nExpertise: APIs, Pipelines' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 200 },
    },
    // Knowledge Directory
    {
      id: 'expertise-map',
      position: { x: 200, y: 380 },
      data: { label: '🗺️ Expertise Map\nWho knows what' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'skill-registry',
      position: { x: 370, y: 380 },
      data: { label: '📚 Skill Registry\nCapability catalog' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'knowledge-boundaries',
      position: { x: 540, y: 380 },
      data: { label: '🔲 Knowledge Boundaries\nExpertise domains' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    {
      id: 'meta-knowledge',
      position: { x: 710, y: 380 },
      data: { label: '🎓 Meta-Knowledge\nKnowledge about knowledge' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Knowledge Queries
    {
      id: 'query-1',
      position: { x: 50, y: 500 },
      data: { label: '❓ Query 1\n"How to process video streams?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'query-2',
      position: { x: 250, y: 500 },
      data: { label: '❓ Query 2\n"Best transformer architecture?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'query-3',
      position: { x: 450, y: 500 },
      data: { label: '❓ Query 3\n"Audio-visual synchronization?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'query-4',
      position: { x: 650, y: 500 },
      data: { label: '❓ Query 4\n"System integration patterns?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    // Routing Decisions
    {
      id: 'route-vision',
      position: { x: 100, y: 620 },
      data: { label: '➡️ Route to Vision\nVideo expertise match' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'route-nlp',
      position: { x: 280, y: 620 },
      data: { label: '➡️ Route to NLP\nTransformer expertise' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'route-collaborative',
      position: { x: 460, y: 620 },
      data: { label: '🤝 Collaborative Route\nVision + Audio agents' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'route-integration',
      position: { x: 640, y: 620 },
      data: { label: '➡️ Route to Integration\nArchitecture expertise' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Knowledge Sharing Mechanisms
    {
      id: 'direct-access',
      position: { x: 100, y: 740 },
      data: { label: '🔗 Direct Access\nAgent-to-agent query' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'knowledge-transfer',
      position: { x: 280, y: 740 },
      data: { label: '📤 Knowledge Transfer\nExpertise sharing' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'collaborative-memory',
      position: { x: 460, y: 740 },
      data: { label: '🧩 Collaborative Memory\nShared understanding' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'expertise-update',
      position: { x: 640, y: 740 },
      data: { label: '🔄 Expertise Update\nDynamic skill tracking' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Benefits
    {
      id: 'specialization',
      position: { x: 150, y: 860 },
      data: { label: '🎯 Specialization\nDeep expertise per agent' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'scalability',
      position: { x: 320, y: 860 },
      data: { label: '📈 Scalability\nAdd agents = add expertise' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'efficiency',
      position: { x: 490, y: 860 },
      data: { label: '⚡ Efficiency\nNo redundant knowledge' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'resilience',
      position: { x: 660, y: 860 },
      data: { label: '🛡️ Resilience\nDistributed redundancy' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'integrated-solution',
      position: { x: 400, y: 980 },
      data: { label: '✨ Integrated Solution\nMulti-modal system designed through distributed expertise' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Task to coordinator
    {
      id: 'task-coordinator',
      source: 'complex-task',
      target: 'tms-coordinator',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Coordinator to agents
    {
      id: 'coordinator-vision',
      source: 'tms-coordinator',
      target: 'vision-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Register',
    },
    {
      id: 'coordinator-nlp',
      source: 'tms-coordinator',
      target: 'nlp-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Register',
    },
    {
      id: 'coordinator-audio',
      source: 'tms-coordinator',
      target: 'audio-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Register',
    },
    {
      id: 'coordinator-integration',
      source: 'tms-coordinator',
      target: 'integration-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      label: 'Register',
    },
    // Agents to knowledge directory
    {
      id: 'vision-expertise',
      source: 'vision-agent',
      target: 'expertise-map',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'nlp-skills',
      source: 'nlp-agent',
      target: 'skill-registry',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'audio-boundaries',
      source: 'audio-agent',
      target: 'knowledge-boundaries',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    {
      id: 'integration-meta',
      source: 'integration-agent',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5 5' },
    },
    // Directory components interconnections
    {
      id: 'expertise-skills',
      source: 'expertise-map',
      target: 'skill-registry',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'skills-boundaries',
      source: 'skill-registry',
      target: 'knowledge-boundaries',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    {
      id: 'boundaries-meta',
      source: 'knowledge-boundaries',
      target: 'meta-knowledge',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Queries to coordinator
    {
      id: 'query1-coordinator',
      source: 'query-1',
      target: 'tms-coordinator',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'query2-coordinator',
      source: 'query-2',
      target: 'tms-coordinator',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'query3-coordinator',
      source: 'query-3',
      target: 'tms-coordinator',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'query4-coordinator',
      source: 'query-4',
      target: 'tms-coordinator',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Routing decisions
    {
      id: 'query1-route',
      source: 'query-1',
      target: 'route-vision',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'route-vision-agent',
      source: 'route-vision',
      target: 'vision-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'query2-route',
      source: 'query-2',
      target: 'route-nlp',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'route-nlp-agent',
      source: 'route-nlp',
      target: 'nlp-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'query3-route',
      source: 'query-3',
      target: 'route-collaborative',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'route-collab-vision',
      source: 'route-collaborative',
      target: 'vision-agent',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'route-collab-audio',
      source: 'route-collaborative',
      target: 'audio-agent',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'query4-route',
      source: 'query-4',
      target: 'route-integration',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'route-integration-agent',
      source: 'route-integration',
      target: 'integration-agent',
      style: { ...edgeStyle, stroke: '#ec4899', strokeWidth: 2 },
      animated: true,
    },
    // Knowledge sharing
    {
      id: 'vision-direct',
      source: 'vision-agent',
      target: 'direct-access',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'nlp-transfer',
      source: 'nlp-agent',
      target: 'knowledge-transfer',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'audio-collaborative',
      source: 'audio-agent',
      target: 'collaborative-memory',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'integration-update',
      source: 'integration-agent',
      target: 'expertise-update',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Inter-agent communication
    {
      id: 'vision-audio-link',
      source: 'vision-agent',
      target: 'audio-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
      label: 'Share',
    },
    {
      id: 'nlp-integration-link',
      source: 'nlp-agent',
      target: 'integration-agent',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3 3' },
      label: 'Consult',
    },
    // Benefits
    {
      id: 'direct-specialization',
      source: 'direct-access',
      target: 'specialization',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'transfer-scalability',
      source: 'knowledge-transfer',
      target: 'scalability',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'collaborative-efficiency',
      source: 'collaborative-memory',
      target: 'efficiency',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'update-resilience',
      source: 'expertise-update',
      target: 'resilience',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Final solution
    {
      id: 'specialization-solution',
      source: 'specialization',
      target: 'integrated-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'scalability-solution',
      source: 'scalability',
      target: 'integrated-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'efficiency-solution',
      source: 'efficiency',
      target: 'integrated-solution',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'resilience-solution',
      source: 'resilience',
      target: 'integrated-solution',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Complex Task Assignment',
      description: 'Multi-modal AI system design task arrives',
      activeNodes: ['complex-task', 'tms-coordinator'],
      activeEdges: ['task-coordinator'],
    },
    {
      title: 'Agent Registration',
      description: 'Specialized agents register their expertise',
      activeNodes: ['tms-coordinator', 'vision-agent', 'nlp-agent', 'audio-agent', 'integration-agent'],
      activeEdges: ['coordinator-vision', 'coordinator-nlp', 'coordinator-audio', 'coordinator-integration'],
    },
    {
      title: 'Knowledge Directory Setup',
      description: 'Building expertise map and skill registry',
      activeNodes: ['vision-agent', 'nlp-agent', 'audio-agent', 'integration-agent', 'expertise-map', 'skill-registry', 'knowledge-boundaries', 'meta-knowledge'],
      activeEdges: ['vision-expertise', 'nlp-skills', 'audio-boundaries', 'integration-meta'],
    },
    {
      title: 'Directory Integration',
      description: 'Connecting knowledge directory components',
      activeNodes: ['expertise-map', 'skill-registry', 'knowledge-boundaries', 'meta-knowledge'],
      activeEdges: ['expertise-skills', 'skills-boundaries', 'boundaries-meta'],
    },
    {
      title: 'Knowledge Queries',
      description: 'Task decomposed into specific knowledge queries',
      activeNodes: ['query-1', 'query-2', 'query-3', 'query-4', 'tms-coordinator'],
      activeEdges: ['query1-coordinator', 'query2-coordinator', 'query3-coordinator', 'query4-coordinator'],
    },
    {
      title: 'Query Routing',
      description: 'Routing queries to appropriate specialists',
      activeNodes: ['query-1', 'query-2', 'query-3', 'query-4', 'route-vision', 'route-nlp', 'route-collaborative', 'route-integration'],
      activeEdges: ['query1-route', 'query2-route', 'query3-route', 'query4-route'],
    },
    {
      title: 'Expert Assignment',
      description: 'Queries directed to relevant agents',
      activeNodes: ['route-vision', 'route-nlp', 'route-collaborative', 'route-integration', 'vision-agent', 'nlp-agent', 'audio-agent', 'integration-agent'],
      activeEdges: ['route-vision-agent', 'route-nlp-agent', 'route-collab-vision', 'route-collab-audio', 'route-integration-agent'],
    },
    {
      title: 'Knowledge Sharing',
      description: 'Agents share expertise and collaborate',
      activeNodes: ['vision-agent', 'nlp-agent', 'audio-agent', 'integration-agent', 'direct-access', 'knowledge-transfer', 'collaborative-memory', 'expertise-update'],
      activeEdges: ['vision-direct', 'nlp-transfer', 'audio-collaborative', 'integration-update', 'vision-audio-link', 'nlp-integration-link'],
    },
    {
      title: 'System Benefits',
      description: 'Realizing advantages of transactive memory',
      activeNodes: ['specialization', 'scalability', 'efficiency', 'resilience'],
      activeEdges: ['direct-specialization', 'transfer-scalability', 'collaborative-efficiency', 'update-resilience'],
    },
    {
      title: 'Integrated Solution',
      description: 'Complete multi-modal system through distributed expertise',
      activeNodes: ['specialization', 'scalability', 'efficiency', 'resilience', 'integrated-solution'],
      activeEdges: ['specialization-solution', 'scalability-solution', 'efficiency-solution', 'resilience-solution'],
    },
  ],
};