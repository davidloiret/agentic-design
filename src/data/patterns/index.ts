import { PatternScenario } from './types';
import { chainOfThoughtPattern } from './chain-of-thought';
import { chainOfDebatesPattern } from './chain-of-debates';
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
import { advancedContextCompressionPattern } from './advanced-context-compression';
import { multimodalContextIntegrationPattern } from './multimodal-context-integration';
import { slidingWindowPattern } from './sliding-window';
import { hierarchicalMemoryPattern } from './hierarchical-memory';
import { attentionMechanismsPattern } from './attention-mechanisms';
import { memoryConsolidationPattern } from './memory-consolidation';
import { workingMemoryPatternsPattern } from './working-memory-patterns';
import { contextCompressionPattern } from './context-compression';
import { llmBasedRoutingPattern } from './llm-based-routing';
import { embeddingBasedRoutingPattern } from './embedding-based-routing';
import { ruleBasedRoutingPattern } from './rule-based-routing';
import { machineLearningModelBasedRoutingPattern } from './machine-learning-model-based-routing';
import { producerCriticPattern } from './producer-critic';
import { llmAsJudgePattern } from './llm-as-judge';
import { reflexionPattern } from './reflexion';
import { modelContextProtocolPattern } from './model-context-protocol';
import { metaReasoningPattern } from './meta-reasoning';
import { htnPlanningPattern } from './htn-planning';
import { taskManagementOrchestrationPattern } from './task-management-orchestration';
import { intelligentGoalDecompositionPattern } from './intelligent-goal-decomposition';
import { a2aProtocolPattern } from './a2a-protocol';
import { supervisorWorkerPattern } from './supervisor-worker';
import { sharedScratchpadCollaborationPattern } from './shared-scratchpad-collaboration';
import { sequentialPipelineAgentsPattern } from './sequential-pipeline-agents';
import { concurrentOrchestrationPattern } from './concurrent-orchestration';
import { handoffOrchestrationPattern } from './handoff-orchestration';
import { peerCollaborationPattern } from './peer-collaboration';
import { hierarchicalCoordinationPattern } from './hierarchical-coordination';
import { consensusAlgorithmsPattern } from './consensus-algorithms';
import { agentCommunicationProtocolsPattern } from './agent-communication-protocols';
import { parametricMemoryPattern } from './parametric-memory';
import { episodicMemorySystemsPattern } from './episodic-memory-systems';
import { semanticMemoryNetworksPattern } from './semantic-memory-networks';
import { transactiveMemorySystemsPattern } from './transactive-memory-systems';
import { memoryOperationsPattern } from './memory-operations';
import { contextualStructuredMemoryPattern } from './contextual-structured-memory';
import { contextualUnstructuredMemoryPattern } from './contextual-unstructured-memory';
import { memoryConsolidationProcessesPattern } from './memory-consolidation-processes';
import { distributedMemoryArchitecturesPattern } from './distributed-memory-architectures';
import { rlhfPattern } from './rlhf';
import { directPreferenceOptimizationPattern } from './direct-preference-optimization';
import { inContextLearningPattern } from './in-context-learning';
import { metaLearningPattern } from './meta-learning';
import { continualLearningPattern } from './continual-learning';
import { selfImprovingSystemsPattern } from './self-improving-systems';
import { constitutionalAIPattern } from './constitutional-ai';
import { rlaifPattern } from './reinforcement-learning-from-ai-feedback';
import { testTimeScalingPattern } from './test-time-scaling';
import { orpoPattern } from './odds-ratio-preference-optimization';
import { simpoPattern } from './simple-preference-optimization';
import { supervisedLearningAgentsPattern } from './supervised-learning-adaptation';
import { unsupervisedLearningAgentsPattern } from './unsupervised-learning-adaptation';
import { onlineLearningAgentsPattern } from './online-learning-adaptation';
import { memoryBasedLearningPattern } from './memory-based-learning';
import { llmCheckpointRecoveryPattern } from './llm-checkpoint-recovery';
import { agentContextPreservationPattern } from './agent-context-preservation';
import { predictiveAgentFaultTolerancePattern } from './predictive-agent-fault-tolerance';
import { agentCommunicationFaultTolerancePattern } from './agent-communication-fault-tolerance';
import { naiveRagPattern } from './naive-rag';
import { advancedRagPattern } from './advanced-rag';
import { modularRagPattern } from './modular-rag';
import { selfRagPattern } from './self-rag';
import { correctiveRagPattern } from './corrective-rag';
import { graphRagPattern } from './graph-rag';
import { multimodalRagPattern } from './multimodal-rag';
import { agenticRagPattern } from './agentic-rag';
import { forestOfThoughtsPattern } from './forest-of-thoughts';
import { metacognitiveMonitoringPattern } from './metacognitive-monitoring';
import { testTimeComputeScalingPattern } from './test-time-compute-scaling';
import { reflectiveMctsPattern } from './reflective-mcts';
import { leastToMostPromptingPattern } from './least-to-most-prompting';
import { analogicalReasoningPattern } from './analogical-reasoning';
import { causalReasoningPattern } from './causal-reasoning';
import { abductiveReasoningPattern } from './abductive-reasoning';
import { stepBackPromptingPattern } from './step-back-prompting';
import { bufferOfThoughtsPattern } from './buffer-of-thoughts';
import { skeletonOfThoughtsPattern } from './skeleton-of-thoughts';
import { layeredDefensePattern } from './layered-defense';
import { contextualGuardrailingPattern } from './contextual-guardrailing';
import { guardAgentPattern } from './guard-agent';
import { intrinsicAlignmentPattern } from './intrinsic-alignment';
import { memoryPoisoningPreventionPattern } from './memory-poisoning-prevention';
import { toolMisusePreventionPattern } from './tool-misuse-prevention';
import { privilegeCompromiseMitigationPattern } from './privilege-compromise-mitigation';
import { agrailAdaptivePattern } from './agrail-adaptive';
import { maestroMultiAgentSecurityPattern } from './maestro-multi-agent-security';
import { systemPromptProtectionPattern } from './system-prompt-protection';
import { differentialPrivacyPattern } from './differential-privacy';
import { privacyByDesignPrinciplesPattern } from './privacy-by-design-principles';
import { transparentDataHandlingPattern } from './transparent-data-handling';
import { granularPrivacyControlsPattern } from './granular-privacy-controls';
import { userEmpowermentPrivacyDashboardPattern } from './user-empowerment-privacy-dashboard';
import { advancedPrivacyTechnologiesUXPattern } from './advanced-privacy-technologies-ux';
import { progressiveConsentCommunicationPattern } from './progressive-consent-communication';
import { regulatoryComplianceUXPattern } from './regulatory-compliance-ux';
import { zeroTrustAgentArchitecturePattern } from './zero-trust-agent-architecture';
import { secureMultiPartyComputationPattern } from './secure-multi-party-computation';
import { complianceAutomationPattern } from './compliance-automation';
import { threatDetectionResponsePattern } from './threat-detection-response';
import { identityAccessManagementPattern } from './identity-access-management';
import { dataAnonymizationPattern } from './data-anonymization';
import { confidentialComputingPattern } from './confidential-computing';
import { hybridSecretCacheManagementPattern } from './hybrid-secret-cache-management';
import { localDistantAgentDataProtectionPattern } from './local-distant-agent-data-protection';
import { mlcommonsAiluminateBenchmarkPattern } from './mlcommons-ailuminate-benchmark';
import { agentBenchPattern } from './agentbench';
import { theAgentCompanyBenchmarkPattern } from './theagentcompany-benchmark';
import { mlrBenchPattern } from './mlr-bench';
import { twelveFactorAgentsPattern } from './twelve-factor-agents';
import { helmAgentEvaluationPattern } from './helm-agent-evaluation';
import { humanInTheLoopAgentPattern } from './human-in-the-loop-agent';
import { cybersecEval3Pattern } from './cyberseceval-3';
import { metrReBenchPattern } from './metr-re-bench';
import { sweBenchSuitePattern } from './swe-bench-suite';
import { gaiaBenchmarkPattern } from './gaia-benchmark';
import { mmauBenchmarkPattern } from './mmau-benchmark';
import { webArenaEvaluationSuitePattern } from './webarena-evaluation-suite';
import { euAiActCompliancePattern } from './eu-ai-act-compliance';
import { aisiEvaluationFrameworkPattern } from './aisi-evaluation-framework';
import { mapsMultilingualBenchmarkPattern } from './maps-multilingual-benchmark';
import { constitutionalAiEvaluationPattern } from './constitutional-ai-evaluation';
import { contextProcessingPipelinesPattern } from './context-processing-pipelines';
import { contextLifecycleManagementPattern } from './context-lifecycle-management';
import { hierarchicalContextArchitecturePattern } from './hierarchical-context-architecture';
import { contextStateMachinesPattern } from './context-state-machines';
import { contextStreamingProtocolsPattern } from './context-streaming-protocols';
import { contextWritePatternsPattern } from './context-write-patterns';
import { contextSelectPatternsPattern } from './context-select-patterns';
import { contextCompressPatternsPattern } from './context-compress-patterns';
import { contextIsolatePatternsPattern } from './context-isolate-patterns';
import { slidingWindowManagementPattern } from './sliding-window-management';
import { semanticContextCompressionPattern } from './semantic-context-compression';
import { infiniAttentionArchitecturePattern } from './infini-attention-architecture';
import { memoryBlockArchitecturePattern } from './memory-block-architecture';
import { kvCacheOptimizationPattern } from './kv-cache-optimization';
import { contextEngineeringFrameworksPattern } from './context-engineering-frameworks';
import { contextFailurePreventionPattern } from './context-failure-prevention';
import { humanInTheLoopPattern } from './human-in-the-loop';
import { humanOnTheLoopPattern } from './human-on-the-loop';
import { progressiveDisclosureUIPattern } from './progressive-disclosure-ui';
import { confidenceVisualizationUIPattern } from './confidence-visualization-ui';
import { mixedInitiativeInterfacePattern } from './mixed-initiative-interface';
import { agentStatusActivityUIPattern } from './agent-status-activity-ui';
import { conversationalInterfacePatternsPattern } from './conversational-interface-patterns';
import { trustTransparencyPatternsPattern } from './trust-transparency-patterns';
import { adaptiveInterfacePatternsPattern } from './adaptive-interface-patterns';
import { contextWindowManagementUIPattern } from './context-window-management-ui';
import { monitoringControlPatternsPattern } from './monitoring-control-patterns';
import { errorHandlingRecoveryPatternsPattern } from './error-handling-recovery-patterns';
import { onboardingEducationPatternsPattern } from './onboarding-education-patterns';
import { privacySecurityUxPattern } from './privacy-security-ux';
import { accessibilityAgentDesignPattern } from './accessibility-agent-design';
import { ambientAgentPatternsPattern } from './ambient-agent-patterns';
import { chatInterfacePatternsPattern } from './chat-interface-patterns';
import { crossPlatformAgentUxPattern } from './cross-platform-agent-ux';
import { multimodalInteractionPatternScenario } from './multimodal-interaction-pattern-scenario';
import { visualReasoningPatternScenario } from './visual-reasoning-pattern-scenario';
import { advancedConversationalPatternScenario } from './advanced-conversational-pattern-scenario';

export * from './types';
export * from './styles';

export const patternScenarios: { [key: string]: PatternScenario } = {
  'cot': chainOfThoughtPattern,
  'cod': chainOfDebatesPattern,
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
  'goal-decomposition': intelligentGoalDecompositionPattern,
  'constraint-satisfaction': constraintSatisfactionPattern,
  'scenario-planning': scenarioPlanningPattern,
  'control-plane': controlPlanePattern,
  'latent-memory-networks': latentMemoryNetworksPattern,
  'adaptive-context-depth': adaptiveContextDepthPattern,
  'latent-knowledge-retrieval': latentKnowledgeRetrievalPattern,
  'context-compression-advanced': advancedContextCompressionPattern,
  'multimodal-context-integration': multimodalContextIntegrationPattern,
  'sliding-window': slidingWindowPattern,
  'hierarchical-memory': hierarchicalMemoryPattern,
  'attention-mechanisms': attentionMechanismsPattern,
  'memory-consolidation': memoryConsolidationPattern,
  'working-memory-patterns': workingMemoryPatternsPattern,
  'context-compression': contextCompressionPattern,
  'llm-based-routing': llmBasedRoutingPattern,
  'embedding-based-routing': embeddingBasedRoutingPattern,
  'rule-based-routing': ruleBasedRoutingPattern,
  'machine-learning-model-based-routing': machineLearningModelBasedRoutingPattern,
  'producer-critic': producerCriticPattern,
  'llm-as-judge': llmAsJudgePattern,
  'reflexion-pattern': reflexionPattern,
  'model-context-protocol': modelContextProtocolPattern,
  'meta-reasoning': metaReasoningPattern,
  'hierarchical-task-network-planning': htnPlanningPattern,
  'task-management-orchestration': taskManagementOrchestrationPattern,
  'a2a-protocol': a2aProtocolPattern,
  'supervisor-worker-pattern': supervisorWorkerPattern,
  'shared-scratchpad-collaboration': sharedScratchpadCollaborationPattern,
  'sequential-pipeline-agents': sequentialPipelineAgentsPattern,
  'concurrent-orchestration': concurrentOrchestrationPattern,
  'handoff-orchestration': handoffOrchestrationPattern,
  'peer-collaboration': peerCollaborationPattern,
  'hierarchical-coordination': hierarchicalCoordinationPattern,
  'consensus-algorithms': consensusAlgorithmsPattern,
  'agent-communication-protocols': agentCommunicationProtocolsPattern,
  'parametric-memory': parametricMemoryPattern,
  'episodic-memory-systems': episodicMemorySystemsPattern,
  'semantic-memory-networks': semanticMemoryNetworksPattern,
  'transactive-memory-systems': transactiveMemorySystemsPattern,
  'memory-reading-writing-operations': memoryOperationsPattern,
  'contextual-structured-memory': contextualStructuredMemoryPattern,
  'contextual-unstructured-memory': contextualUnstructuredMemoryPattern,
  'memory-consolidation-processes': memoryConsolidationProcessesPattern,
  'distributed-memory-architectures': distributedMemoryArchitecturesPattern,
  'reinforcement-learning-from-human-feedback': rlhfPattern,
  'direct-preference-optimization': directPreferenceOptimizationPattern,
  'in-context-learning': inContextLearningPattern,
  'meta-learning': metaLearningPattern,
  'continual-learning': continualLearningPattern,
  'self-improving-systems': selfImprovingSystemsPattern,
  'constitutional-ai': constitutionalAIPattern,
  'reinforcement-learning-from-ai-feedback': rlaifPattern,
  'test-time-scaling': testTimeScalingPattern,
  'odds-ratio-preference-optimization': orpoPattern,
  'simple-preference-optimization': simpoPattern,
  'supervised-learning-adaptation': supervisedLearningAgentsPattern,
  'unsupervised-learning-adaptation': unsupervisedLearningAgentsPattern,
  'online-learning-adaptation': onlineLearningAgentsPattern,
  'memory-based-learning': memoryBasedLearningPattern,
  'llm-checkpoint-recovery': llmCheckpointRecoveryPattern,
  'agent-context-preservation': agentContextPreservationPattern,
  'predictive-agent-fault-tolerance': predictiveAgentFaultTolerancePattern,
  'agent-communication-fault-tolerance': agentCommunicationFaultTolerancePattern,
  'naive-rag': naiveRagPattern,
  'advanced-rag': advancedRagPattern,
  'modular-rag': modularRagPattern,
  'self-rag': selfRagPattern,
  'corrective-rag': correctiveRagPattern,
  'graph-rag': graphRagPattern,
  'multimodal-rag': multimodalRagPattern,
  'agentic-rag-systems': agenticRagPattern,
  'fot': forestOfThoughtsPattern,
  'metacognitive-monitoring': metacognitiveMonitoringPattern,
  'test-time-compute': testTimeComputeScalingPattern,
  'reflective-mcts': reflectiveMctsPattern,
  'least-to-most': leastToMostPromptingPattern,
  'analogical-reasoning': analogicalReasoningPattern,
  'causal-reasoning': causalReasoningPattern,
  'abductive-reasoning': abductiveReasoningPattern,
  'step-back-prompting': stepBackPromptingPattern,
  'buffer-of-thoughts': bufferOfThoughtsPattern,
  'skeleton-of-thoughts': skeletonOfThoughtsPattern,
  'layered-defense-pattern': layeredDefensePattern,
  'contextual-guardrailing-pattern': contextualGuardrailingPattern,
  'guard-agent-pattern': guardAgentPattern,
  'intrinsic-alignment-pattern': intrinsicAlignmentPattern,
  'memory-poisoning-prevention': memoryPoisoningPreventionPattern,
  'tool-misuse-prevention': toolMisusePreventionPattern,
  'privilege-compromise-mitigation': privilegeCompromiseMitigationPattern,
  'agrail-adaptive-pattern': agrailAdaptivePattern,
  'maestro-multi-agent-security': maestroMultiAgentSecurityPattern,
  'system-prompt-protection': systemPromptProtectionPattern,
  'differential-privacy-patterns': differentialPrivacyPattern,
  'privacy-by-design-principles': privacyByDesignPrinciplesPattern,
  'transparent-data-handling': transparentDataHandlingPattern,
  'granular-privacy-controls': granularPrivacyControlsPattern,
  'user-empowerment-privacy-dashboard': userEmpowermentPrivacyDashboardPattern,
  'advanced-privacy-technologies-ux': advancedPrivacyTechnologiesUXPattern,
  'progressive-consent-communication': progressiveConsentCommunicationPattern,
  'regulatory-compliance-ux': regulatoryComplianceUXPattern,
  'zero-trust-agent-architecture': zeroTrustAgentArchitecturePattern,
  'secure-multi-party-computation': secureMultiPartyComputationPattern,
  'compliance-automation-patterns': complianceAutomationPattern,
  'threat-detection-response': threatDetectionResponsePattern,
  'identity-access-management': identityAccessManagementPattern,
  'data-anonymization-patterns': dataAnonymizationPattern,
  'confidential-computing-patterns': confidentialComputingPattern,
  'hybrid-secret-cache-management': hybridSecretCacheManagementPattern,
  'local-distant-agent-data-protection': localDistantAgentDataProtectionPattern,
  'mlcommons-ai-safety': mlcommonsAiluminateBenchmarkPattern,
  'agentbench': agentBenchPattern,
  'theagentcompany': theAgentCompanyBenchmarkPattern,
  'mlr-bench': mlrBenchPattern,
  'twelve-factor-agent': twelveFactorAgentsPattern,
  'helm-agent-eval': helmAgentEvaluationPattern,
  'hula-framework': humanInTheLoopAgentPattern,
  'cyberseceval3': cybersecEval3Pattern,
  'metr-re-bench': metrReBenchPattern,
  'swe-bench-suite': sweBenchSuitePattern,
  'gaia-benchmark': gaiaBenchmarkPattern,
  'mmau-benchmark': mmauBenchmarkPattern,
  'webarena-suite': webArenaEvaluationSuitePattern,
  'eu-ai-act-framework': euAiActCompliancePattern,
  'aisi-evaluation-framework': aisiEvaluationFrameworkPattern,
  'maps-benchmark': mapsMultilingualBenchmarkPattern,
  'constitutional-ai-evaluation': constitutionalAiEvaluationPattern,
  'context-processing-pipelines': contextProcessingPipelinesPattern,
  'context-lifecycle-management': contextLifecycleManagementPattern,
  'hierarchical-context-architecture': hierarchicalContextArchitecturePattern,
  'context-state-machines': contextStateMachinesPattern,
  'context-streaming-protocols': contextStreamingProtocolsPattern,
  'context-write-patterns': contextWritePatternsPattern,
  'context-select-patterns': contextSelectPatternsPattern,
  'context-compress-patterns': contextCompressPatternsPattern,
  'context-isolate-patterns': contextIsolatePatternsPattern,
  'sliding-window-management': slidingWindowManagementPattern,
  'semantic-context-compression': semanticContextCompressionPattern,
  'infini-attention-architecture': infiniAttentionArchitecturePattern,
  'memory-block-architecture': memoryBlockArchitecturePattern,
  'kv-cache-optimization': kvCacheOptimizationPattern,
  'context-engineering-frameworks': contextEngineeringFrameworksPattern,
  'context-failure-prevention': contextFailurePreventionPattern,
  'human-in-the-loop': humanInTheLoopPattern,
  'human-on-the-loop': humanOnTheLoopPattern,
  'progressive-disclosure-patterns': progressiveDisclosureUIPattern,
  'confidence-visualization-patterns': confidenceVisualizationUIPattern,
  'mixed-initiative-interface-patterns': mixedInitiativeInterfacePattern,
  'agent-status-activity-patterns': agentStatusActivityUIPattern,
  'agent-collaboration-ux': conversationalInterfacePatternsPattern,
  'trust-transparency-patterns': trustTransparencyPatternsPattern,
  'adaptive-interface-patterns': adaptiveInterfacePatternsPattern,
  'context-window-management-patterns': contextWindowManagementUIPattern,
  'monitoring-control-patterns': monitoringControlPatternsPattern,
  'error-recovery-patterns': errorHandlingRecoveryPatternsPattern,
  'onboarding-education-patterns': onboardingEducationPatternsPattern,
  'privacy-security-ux': privacySecurityUxPattern,
  'accessibility-agent-design': accessibilityAgentDesignPattern,
  'ambient-agent-patterns': ambientAgentPatternsPattern,
  'chat-interface-patterns': chatInterfacePatternsPattern,
  'cross-platform-agent-ux': crossPlatformAgentUxPattern,
  'multimodal-interaction-patterns': multimodalInteractionPatternScenario,
  'visual-reasoning-patterns': visualReasoningPatternScenario,
  'advanced-conversational-interface-patterns': advancedConversationalPatternScenario,
};

export default patternScenarios;