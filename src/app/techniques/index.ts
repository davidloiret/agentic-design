import { Technique } from './types';
import { reasoningTechniques } from './reasoning-techniques';
import { promptChainingTechniques } from './prompt-chaining';
import { routingTechniques } from './routing';
import { toolUseTechniques } from './tool-use';
import { memoryManagementTechniques } from './memory-management';
import { workflowOrchestrationTechniques } from './workflow-orchestration';
import { planningExecutionTechniques } from './planning-execution';
import { interpretabilityTechniques } from './interpretability';
import { knowledgeRetrievalTechniques } from './knowledge-retrieval';
import { knowledgeRepresentationTechniques } from './knowledge-representation';
import { parallelizationTechniques } from './parallelization';
import { multiAgentTechniques } from './multi-agent';
import { resourceAwareOptimizationTechniques } from './resource-aware-optimization';
import { contextOrchestrationTechniques } from './context-orchestration';
import { evaluationMonitoringTechniques } from './evaluation-monitoring';
import { faultToleranceInfrastructureTechniques } from './fault-tolerance-infrastructure';
import { explorationDiscoveryTechniques } from './exploration-discovery';
import { learningAdaptationTechniques } from './learning-adaptation';
import { prioritizationTechniques } from './prioritization';
import { reflectionTechniques } from './reflection-techniques';
import { securityPrivacyPatterns } from './security-privacy';
import { contextManagementPatterns } from './context-management';
import { uiUxPatterns } from './ui-ux-patterns';

export * from './types';

// For now, let's add the remaining techniques inline until we create their separate files
const remainingTechniques: Technique[] = [
  // Add other remaining techniques here as needed...
];

export const techniques: Technique[] = [
  ...reasoningTechniques,
  ...promptChainingTechniques,
  ...routingTechniques,
  ...toolUseTechniques,
  ...memoryManagementTechniques,
  ...workflowOrchestrationTechniques,
  ...planningExecutionTechniques,
  ...parallelizationTechniques,
  ...multiAgentTechniques,
  ...interpretabilityTechniques,
  ...knowledgeRetrievalTechniques,
  ...knowledgeRepresentationTechniques,
  ...resourceAwareOptimizationTechniques,
  ...contextOrchestrationTechniques,
  ...evaluationMonitoringTechniques,
  ...faultToleranceInfrastructureTechniques,
  ...explorationDiscoveryTechniques,
  ...learningAdaptationTechniques,
  ...prioritizationTechniques,
  ...reflectionTechniques,
  ...securityPrivacyPatterns,
  ...contextManagementPatterns,
  ...uiUxPatterns,
  ...remainingTechniques,
];

export default techniques;