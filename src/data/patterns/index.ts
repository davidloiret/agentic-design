import { PatternScenario } from './types';
import { chainOfThoughtPattern } from './chain-of-thought';
import { treeOfThoughtsPattern } from './tree-of-thoughts';
import { reactPattern } from './react';
import { sequentialChainingPattern } from './sequential-chaining';
import { parallelChainingPattern } from './parallel-chaining';
import { conditionalChainingPattern } from './conditional-chaining';
import { hierarchicalChainingPattern } from './hierarchical-chaining';
import { feedbackChainingPattern } from './feedback-chaining';
import { iterativeRefinementPattern } from './iterative-refinement';
import { parallelSynthesisPattern } from './parallel-synthesis';
import { dynamicRoutingPattern } from './dynamic-routing';
import { dynamicContextAssemblyPattern } from './dynamic-context-assembly';
import { messageQueuingPattern } from './message-queuing';
import { contentBasedRoutingPattern } from './content-based-routing';
import { capabilityRoutingPattern } from './capability-routing';
import { loadBalancingPattern } from './load-balancing';
import { geographicRoutingPattern } from './geographic-routing';
import { mapReducePattern } from './map-reduce';
import { scatterGatherPattern } from './scatter-gather';
import { forkJoinPattern } from './fork-join';
import { asyncAwaitPattern } from './async-await';
import { selfCritiquePattern } from './self-critique';
import { functionCallingPattern } from './function-calling';
import { codeExecutionPattern } from './code-execution';
import { hierarchicalPlanningPattern } from './hierarchical-planning';
import { goalDecompositionPattern } from './goal-decomposition';
import { constraintSatisfactionPattern } from './constraint-satisfaction';
import { scenarioPlanningPattern } from './scenario-planning';
import { latentRecurrentThinkingPattern } from './latent-recurrent-thinking';
import { graphOfThoughtPattern } from './graph-of-thought';
import { controlPlanePattern } from './control-plane';
import { latentMemoryNetworksPattern } from './latent-memory-networks';
import { adaptiveContextDepthPattern } from './adaptive-context-depth';
import { latentKnowledgeRetrievalPattern } from './latent-knowledge-retrieval';

export * from './types';
export * from './styles';

export const patternScenarios: { [key: string]: PatternScenario } = {
  'cot': chainOfThoughtPattern,
  'tot': treeOfThoughtsPattern,
  'lrt': latentRecurrentThinkingPattern,
  'got': graphOfThoughtPattern,
  'react': reactPattern,
  'sequential-chaining': sequentialChainingPattern,
  'parallel-chaining': parallelChainingPattern,
  'conditional-chaining': conditionalChainingPattern,
  'hierarchical-chaining': hierarchicalChainingPattern,
  'feedback-chaining': feedbackChainingPattern,
  'iterative-refinement': iterativeRefinementPattern,
  'parallel-synthesis': parallelSynthesisPattern,
  'dynamic-routing': dynamicRoutingPattern,
  'dynamic-context-assembly': dynamicContextAssemblyPattern,
  'message-queuing': messageQueuingPattern,
  'content-based-routing': contentBasedRoutingPattern,
  'capability-routing': capabilityRoutingPattern,
  'load-balancing': loadBalancingPattern,
  'geographic-routing': geographicRoutingPattern,
  'map-reduce': mapReducePattern,
  'scatter-gather': scatterGatherPattern,
  'fork-join': forkJoinPattern,
  'async-await': asyncAwaitPattern,
  'self-critique': selfCritiquePattern,
  'function-calling': functionCallingPattern,
  'code-execution': codeExecutionPattern,
  'hierarchical-planning': hierarchicalPlanningPattern,
  'goal-decomposition': goalDecompositionPattern,
  'constraint-satisfaction': constraintSatisfactionPattern,
  'scenario-planning': scenarioPlanningPattern,
  'control-plane': controlPlanePattern,
  'latent-memory-networks': latentMemoryNetworksPattern,
  'adaptive-context-depth': adaptiveContextDepthPattern,
  'latent-knowledge-retrieval': latentKnowledgeRetrievalPattern,
};

export default patternScenarios;