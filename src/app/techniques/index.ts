import { Technique } from './types';
import { reasoningTechniques } from './reasoning-techniques';
import { promptChainingTechniques } from './prompt-chaining';
import { routingTechniques } from './routing';
import { toolUseTechniques } from './tool-use';
import { memoryManagementTechniques } from './memory-management';
import { workflowOrchestrationTechniques } from './workflow-orchestration';
import { securitySafetyTechniques } from './security-safety';
import { planningExecutionTechniques } from './planning-execution';
import { interpretabilityTechniques } from './interpretability';
import { humanAiCollaborationTechniques } from './human-ai-collaboration';
import { knowledgeRetrievalTechniques } from './knowledge-retrieval';

export * from './types';

// For now, let's add the remaining techniques inline until we create their separate files
const remainingTechniques: Technique[] = [
  // Reflection and Learning techniques
  {
    id: 'self-critique',
    name: 'Self-Critique',
    abbr: '',
    icon: '🔍',
    color: 'from-purple-500 to-indigo-500',
    category: 'reflection',
    description: 'Systematic evaluation and critique of own outputs and reasoning',
    features: [
      'Quality assessment',
      'Error identification',
      'Improvement suggestions',
      'Confidence scoring'
    ],
    useCases: ['quality-assurance', 'content-review', 'error-detection', 'self-improvement'],
    complexity: 'medium',
    example: 'Generated Article Self-Critique:\n\nOriginal: "AI will change everything in business."\n\nSelf-Critique:\n• Too vague and generic\n• Lacks specific examples\n• No supporting evidence\n• Overly broad claims\n\nImproved: "AI automation is transforming business operations:\n• 40% reduction in data processing time\n• 24/7 customer service capabilities\n• Predictive maintenance preventing 60% of equipment failures"'
  },
  // Add other remaining techniques here as needed...
];

export const techniques: Technique[] = [
  ...reasoningTechniques,
  ...promptChainingTechniques,
  ...routingTechniques,
  ...toolUseTechniques,
  ...memoryManagementTechniques,
  ...workflowOrchestrationTechniques,
  ...securitySafetyTechniques,
  ...planningExecutionTechniques,
  ...interpretabilityTechniques,
  ...humanAiCollaborationTechniques,
  ...knowledgeRetrievalTechniques,
  ...remainingTechniques,
];

export default techniques;