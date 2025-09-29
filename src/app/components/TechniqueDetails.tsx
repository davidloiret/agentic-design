'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Check, Brain, GitBranch, Play, Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePlausible } from '@/hooks/usePlausible';
import CodeSandbox from '../../components/CodeSandbox';
import { getComplexityColor, getCategoryColor } from '@/lib/design-system';
import { SelfCritiqueDetails } from './technique-details/SelfCritiqueDetails';
import { ProducerCriticDetails } from './technique-details/ProducerCriticDetails';
import { LLMAsJudgeDetails } from './technique-details/LLMAsJudgeDetails';
import { ReflexionPatternDetails } from './technique-details/ReflexionPatternDetails';
import { GossipProtocolsDetails } from './technique-details/GossipProtocolsDetails';
import { ContextCompressionDetails } from './technique-details/ContextCompressionDetails';
import { ConversationalOrchestrationDetails } from './technique-details/ConversationalOrchestrationDetails';
import { RoleBasedTeamworkDetails } from './technique-details/RoleBasedTeamworkDetails';
import { PeerCollaborationDetails } from './technique-details/PeerCollaborationDetails';
import { MetaReasoningOrchestrationDetails } from './technique-details/MetaReasoningOrchestrationDetails';
import { AgentOrchestrationDetails } from './technique-details/AgentOrchestrationDetails';
import { MessagePassingDetails } from './technique-details/MessagePassingDetails';
import { MessageQueuingDetails } from './technique-details/MessageQueuingDetails';
import { ModelContextProtocolDetails } from './technique-details/ModelContextProtocolDetails';
import { A2aProtocolDetails } from './technique-details/A2aProtocolDetails';
import { HealthMonitoringDetails } from './technique-details/HealthMonitoringDetails';
import { HierarchicalPlanningDetails } from './technique-details/HierarchicalPlanningDetails';
import { ConstraintSatisfactionDetails } from './technique-details/ConstraintSatisfactionDetails';
import { GoalDecompositionDetails } from './technique-details/GoalDecompositionDetails';
import { InteractivePatternFlow } from '../../components/InteractivePatternFlow';
import { ActorFrameworksDetails } from './technique-details/ActorFrameworksDetails';
import { LatentKnowledgeRetrievalDetails } from './technique-details/LatentKnowledgeRetrievalDetails';
import { MlcommonsAiSafetyDetails } from './technique-details/MlcommonsAiSafetyDetails';
import { AgentBenchDetails } from './technique-details/AgentBenchDetails';
import { TheAgentCompanyDetails } from './technique-details/TheAgentCompanyDetails';
import { MlrBenchDetails } from './technique-details/MlrBenchDetails';
import { TwelveFactorAgentDetails } from './technique-details/TwelveFactorAgentDetails';
import { NistAriaDetails } from './technique-details/NistAriaDetails';
import { HelmAgentEvaluationDetails } from './technique-details/HelmAgentEvaluationDetails';
import { HulaFrameworkDetails } from './technique-details/HulaFrameworkDetails';
import { CybersecEval3Details } from './technique-details/CybersecEval3Details';
import { MetrReBenchDetails } from './technique-details/MetrReBenchDetails';
import { SweBenchSuiteDetails } from './technique-details/SweBenchSuiteDetails';
import { GaiaBenchmarkDetails } from './technique-details/GaiaBenchmarkDetails';
import { MmauBenchmarkDetails } from './technique-details/MmauBenchmarkDetails';
import { WebArenaSuiteDetails } from './technique-details/WebArenaSuiteDetails';
import { EuAiActFrameworkDetails } from './technique-details/EuAiActFrameworkDetails';
import { AISIEvaluationFrameworkDetails } from './technique-details/AISIEvaluationFrameworkDetails';
import { MapsBenchmarkDetails } from './technique-details/MapsBenchmarkDetails';
import { ConstitutionalAiEvaluationDetails } from './technique-details/ConstitutionalAiEvaluationDetails';
import { HumanInTheLoopDetails } from './technique-details/HumanInTheLoopDetails';
import { HumanOnTheLoopDetails } from './technique-details/HumanOnTheLoopDetails';
import { ConsensusAlgorithmsDetails } from './technique-details/ConsensusAlgorithmsDetails';
import { AmbientAgentPatternsDetails } from './technique-details/AmbientAgentPatternsDetails';
import { ChatInterfacePatternsDetails } from './technique-details/ChatInterfacePatternsDetails';
import { CrossPlatformAgentUxDetails } from './technique-details/CrossPlatformAgentUxDetails';
import { VisualReasoningPatternsDetails } from './technique-details/VisualReasoningPatternsDetails';
import { MultimodalInteractionPatternsDetails } from './technique-details/MultimodalInteractionPatternsDetails';
import { ConversationalInterfacePatternsDetails } from './technique-details/ConversationalInterfacePatternsDetails';
import { AgentCollaborationUxDetails } from './technique-details/AgentCollaborationUxDetails';
import { TrustTransparencyPatternsDetails } from './technique-details/TrustTransparencyPatternsDetails';
import { IdentityAccessManagementDetails } from './technique-details/IdentityAccessManagementDetails';
import { ThreatDetectionResponseDetails } from './technique-details/ThreatDetectionResponseDetails';
import { ComplianceAutomationPatternsDetails } from './technique-details/ComplianceAutomationPatternsDetails';
import { SecureMultiPartyComputationDetails } from './technique-details/SecureMultiPartyComputationDetails';
import { ZeroTrustAgentArchitectureDetails } from './technique-details/ZeroTrustAgentArchitectureDetails';
import { DifferentialPrivacyPatternsDetails } from './technique-details/DifferentialPrivacyPatternsDetails';
import { DataAnonymizationPatternsDetails } from './technique-details/DataAnonymizationPatternsDetails';
import { ConfidentialComputingPatternsDetails } from './technique-details/ConfidentialComputingPatternsDetails';
import HybridSecretCacheManagementDetails from './technique-details/HybridSecretCacheManagementDetails';
import LocalDistantAgentDataProtectionDetails from './technique-details/LocalDistantAgentDataProtectionDetails';
import { AgentCommunicationProtocolsDetails } from './technique-details/AgentCommunicationProtocolsDetails';
import { ContinuousLearningDetails } from './technique-details/ContinuousLearningDetails';
import { ReinforcementLearningAdaptationDetails } from './technique-details/ReinforcementLearningAdaptationDetails';
import { MetaLearningDetails } from './technique-details/MetaLearningDetails';
import { DistributedCoordinationDetails } from './technique-details/DistributedCoordinationDetails';
import { LatentMemoryNetworks } from './technique-details/LatentMemoryNetworks';
import { AdaptiveComputeScalingDetails } from './technique-details/AdaptiveComputeScalingDetails';
import { HierarchicalCoordinationDetails } from './technique-details/HierarchicalCoordinationDetails';
import { JsonSchemaDetails } from './technique-details/JsonSchemaDetails';
import { ApiIntegrationDetails } from './technique-details/ApiIntegrationDetails';
import { CodeExecutionDetails } from './technique-details/CodeExecutionDetails';
import { PluginArchitectureDetails } from './technique-details/PluginArchitectureDetails';
import { ContextRoutingDetails } from './technique-details/ContextRoutingDetails';
import { DynamicContextAssemblyDetails } from './technique-details/DynamicContextAssemblyDetails';
import { ParallelSynthesisDetails } from './technique-details/ParallelSynthesisDetails';
import { GrpcProtocolDetails } from './technique-details/GrpcProtocolDetails';
import { PubSubPatternsDetails } from './technique-details/PubSubPatternsDetails';
import { StatefulGraphWorkflowsDetails } from './technique-details/StatefulGraphWorkflowsDetails';
import { GraphStateMachinesDetails } from './technique-details/GraphStateMachinesDetails';
import { ActorModelCoordinationDetails } from './technique-details/ActorModelCoordinationDetails';
import { EventDrivenHierarchicalDetails } from './technique-details/EventDrivenHierarchicalDetails';
import { RestApisDetails } from './technique-details/RestApisDetails';
import { CostAwareModelSelectionDetails } from './technique-details/CostAwareModelSelectionDetails';
import { EnergyEfficientInferenceDetails } from './technique-details/EnergyEfficientInferenceDetails';
import { MemoryOptimizationDetails } from './technique-details/MemoryOptimizationDetails';
import { ProgressiveEnhancementDetails } from './technique-details/ProgressiveEnhancementDetails';
import { EnterpriseOrchestrationDetails } from './technique-details/EnterpriseOrchestrationDetails';
import { EdgeAiOptimizationDetails } from './technique-details/EdgeAiOptimizationDetails';
import { HybridReasoningDetails } from './technique-details/HybridReasoningDetails';
import { CognitivePipelinesDetails } from './technique-details/CognitivePipelinesDetails';
import { FunctionCallingDetails } from './technique-details/FunctionCallingDetails';
import { EventDrivenOrchestratorWorkerDetails } from './technique-details/EventDrivenOrchestratorWorkerDetails';
import { MultiSourceContextFusionDetails } from './technique-details/MultiSourceContextFusionDetails';
import { ModularRagDetails } from './technique-details/ModularRagDetails';
import { MultimodalRagDetails } from './technique-details/MultimodalRagDetails';
import { CorrectiveRagDetails } from './technique-details/CorrectiveRagDetails';
import { ConversationalRagDetails } from './technique-details/ConversationalRagDetails';
import { CircuitBreakerDetails } from './technique-details/CircuitBreakerDetails';
import FeedbackChainingDemo from '../../components/demos/FeedbackChainingDemo';
import HierarchicalChainingDemo from '../../components/demos/HierarchicalChainingDemo';
import IterativeRefinementDemo from '../../components/demos/IterativeRefinementDemo';
import ParallelSynthesisDemo from '../../components/demos/ParallelSynthesisDemo';
import DynamicRoutingDemo from '../../components/demos/DynamicRoutingDemo';
import DynamicContextAssemblyDemo from '../../components/demos/DynamicContextAssemblyDemo';
import MessageQueuingDemo from '../../components/demos/MessageQueuingDemo';
import LatentMemoryNetworksDemo from '../../components/demos/LatentMemoryNetworksDemo';
import AdaptiveContextDepthDemo from '../../components/demos/AdaptiveContextDepthDemo';
import LatentKnowledgeRetrievalDemo from '../../components/demos/LatentKnowledgeRetrievalDemo';
import AdvancedContextCompressionDemo from '../../components/demos/AdvancedContextCompressionDemo';
import MultimodalContextIntegrationDemo from '../../components/demos/MultimodalContextIntegrationDemo';
import SlidingWindowDemo from '../../components/demos/SlidingWindowDemo';
import HierarchicalMemoryDemo from '../../components/demos/HierarchicalMemoryDemo';
import AttentionMechanismsDemo from '../../components/demos/AttentionMechanismsDemo';
import MemoryConsolidationDemo from '../../components/demos/MemoryConsolidationDemo';
import WorkingMemoryPatternsDemo from '../../components/demos/WorkingMemoryPatternsDemo';
import ContextCompressionDemo from '../../components/demos/ContextCompressionDemo';
import ContentBasedRoutingDemo from '../../components/demos/ContentBasedRoutingDemo';
import CapabilityRoutingDemo from '../../components/demos/CapabilityRoutingDemo';
import LoadBalancingDemo from '../../components/demos/LoadBalancingDemo';
import GeographicRoutingDemo from '../../components/demos/GeographicRoutingDemo';
import MapReduceDemo from '../../components/demos/MapReduceDemo';
import ScatterGatherDemo from '../../components/demos/ScatterGatherDemo';
import ForkJoinDemo from '../../components/demos/ForkJoinDemo';
import AsyncAwaitDemo from '../../components/demos/AsyncAwaitDemo';
import SelfCritiqueDemo from '../../components/demos/SelfCritiqueDemo';
import ToolUseDemo from '../../components/demos/ToolUseDemo';
import CodeExecutionDemo from '../../components/demos/CodeExecutionDemo';
import HierarchicalPlanningDemo from '../../components/demos/HierarchicalPlanningDemo';
import GoalDecompositionDemo from '../../components/demos/GoalDecompositionDemo';
import ConstraintSatisfactionDemo from '../../components/demos/ConstraintSatisfactionDemo';
import ScenarioPlanningDemo from '../../components/demos/ScenarioPlanningDemo';
import SequentialChainingDemo from '../../components/demos/SequentialChainingDemo';
import ParallelChainingDemo from '../../components/demos/ParallelChainingDemo';
import ConditionalChainingDemo from '../../components/demos/ConditionalChainingDemo';
import LLMBasedRoutingFlowVisualization from '../../components/demos/LLMBasedRoutingFlowVisualization';
import EmbeddingRoutingDemo from '../../components/demos/EmbeddingRoutingDemo';
import RuleBasedRoutingDemo from '../../components/demos/RuleBasedRoutingDemo';
import MLModelRoutingDemo from '../../components/demos/MLModelRoutingDemo';
import ProducerCriticDemo from '../../components/demos/ProducerCriticDemo';
import LLMAsJudgeDemo from '../../components/demos/LLMAsJudgeDemo';
import ReflexionDemo from '../../components/demos/ReflexionDemo';
import MetaReasoningDemo from '../../components/demos/MetaReasoningDemo';
import HTNPlanningDemo from '../../components/demos/HTNPlanningDemo';
import TaskManagementOrchestrationDemo from '../../components/demos/TaskManagementOrchestrationDemo';
import A2AProtocolDemo from '../../components/demos/A2AProtocolDemo';
import SupervisorWorkerDemo from '../../components/demos/SupervisorWorkerDemo';
import SharedScratchpadDemo from '../../components/demos/SharedScratchpadDemo';
import SequentialPipelineDemo from '../../components/demos/SequentialPipelineDemo';
import ConcurrentOrchestrationDemo from '../../components/demos/ConcurrentOrchestrationDemo';
import HandoffOrchestrationDemo from '../../components/demos/HandoffOrchestrationDemo';
import PeerCollaborationDemo from '../../components/demos/PeerCollaborationDemo';
import HierarchicalCoordinationDemo from '../../components/demos/HierarchicalCoordinationDemo';
import AgentCommunicationProtocolsDemo from '../../components/demos/AgentCommunicationProtocolsDemo';
import ParametricMemoryDemo from '../../components/demos/ParametricMemoryDemo';
import EpisodicMemorySystemsDemo from '../../components/demos/EpisodicMemorySystemsDemo';
import SemanticMemoryNetworksDemo from '../../components/demos/SemanticMemoryNetworksDemo';
import TransactiveMemorySystemsDemo from '../../components/demos/TransactiveMemorySystemsDemo';
import MemoryReadWriteOperationsDemo from '../../components/demos/MemoryReadWriteOperationsDemo';
import ContextualStructuredMemoryDemo from '../../components/demos/ContextualStructuredMemoryDemo';
import ContextualUnstructuredMemoryDemo from '../../components/demos/ContextualUnstructuredMemoryDemo';
import DistributedMemoryArchitecturesDemo from '../../components/demos/DistributedMemoryArchitecturesDemo';
import RLHFDemo from '../../components/demos/RLHFDemo';
import DPODemo from '../../components/demos/DPODemo';
import ICLDemo from '../../components/demos/ICLDemo';
import MLSDemo from '../../components/demos/MLSDemo';
import CLDemo from '../../components/demos/CLDemo';
import SISDemo from '../../components/demos/SISDemo';
import CAIDemo from '../../components/demos/CAIDemo';
import RLAIFDemo from '../../components/demos/RLAIFDemo';
import TTSDemo from '../../components/demos/TTSDemo';
import ORPODemo from '../../components/demos/ORPODemo';
import SimPODemo from '../../components/demos/SimPODemo';
import SLADemo from '../../components/demos/SLADemo';
import ULADemo from '../../components/demos/ULADemo';
import OLADemo from '../../components/demos/OLADemo';
import LCRDemo from '../../components/demos/LCRDemo';
import ACPDemo from '../../components/demos/ACPDemo';
import PAFDemo from '../../components/demos/PAFDemo';
import ACFDemo from '../../components/demos/ACFDemo';
import NRAGDemo from '../../components/demos/NRAGDemo';
import ARAGDemo from '../../components/demos/ARAGDemo';
import MRAGDemo from '../../components/demos/MRAGDemo';
import SRAGDemo from '../../components/demos/SRAGDemo';
import CRAGDemo from '../../components/demos/CRAGDemo';
import GRAGDemo from '../../components/demos/GRAGDemo';
import MMRAGDemo from '../../components/demos/MMRAGDemo';
import AgRAGDemo from '../../components/demos/AgRAGDemo';
import CoTDemo from '../../components/demos/CoTDemo';
import ToTDemo from '../../components/demos/ToTDemo';
import GoTDemo from '../../components/demos/GoTDemo';
import LtMDemo from '../../components/demos/LtMDemo';
import ARDemo from '../../components/demos/ARDemo';
import CRDemo from '../../components/demos/CRDemo';
import ABRDemo from '../../components/demos/ABRDemo';
import SBPDemo from '../../components/demos/SBPDemo';
import BoTDemo from '../../components/demos/BoTDemo';
import SoTDemo from '../../components/demos/SoTDemo';
import LDPDemo from '../../components/demos/LDPDemo';
import CGPDemo from '../../components/demos/CGPDemo';
import GAPDemo from '../../components/demos/GAPDemo';
import IAPDemo from '../../components/demos/IAPDemo';
import MPPDemo from '../../components/demos/MPPDemo';
import TMPDemo from '../../components/demos/TMPDemo';
import PCMDemo from '../../components/demos/PCMDemo';
import AAPDemo from '../../components/demos/AAPDemo';
import MASDemo from '../../components/demos/MASDemo';
import SPPDemo from '../../components/demos/SPPDemo';
import DPPDemo from '../../components/demos/DPPDemo';
import ZTAADemo from '../../components/demos/ZTAADemo';
import SMPCDemo from '../../components/demos/SMPCDemo';
import CAPDemo from '../../components/demos/CAPDemo';
import TDRDemo from '../../components/demos/TDRDemo';
import IAMDemo from '../../components/demos/IAMDemo';
import DAPDemo from '../../components/demos/DAPDemo';
import CCPDemo from '../../components/demos/CCPDemo';
import HSCMDemo from '../../components/demos/HSCMDemo';
import LDADPDemo from '../../components/demos/LDADPDemo';
import AILuminateDemo from '../../components/demos/AILuminateDemo';
import ReActDemo from '../../components/demos/ReActDemo';
import FoTDemo from '../../components/demos/FoTDemo';
import MCMDemo from '../../components/demos/MCMDemo';
import TTCDemo from '../../components/demos/TTCDemo';
import RMCTSDemo from '../../components/demos/RMCTSDemo';
import AgentBenchDemo from '../../components/demos/AgentBenchDemo';
import TheAgentCompanyDemo from '../../components/demos/TheAgentCompanyDemo';
import MLRBenchDemo from '../../components/demos/MLRBenchDemo';
import TwelveFactorAgentDemo from '../../components/demos/TwelveFactorAgentDemo';
import HelmAgentEvalDemo from '../../components/demos/HelmAgentEvalDemo';
import HulaFrameworkDemo from '../../components/demos/HulaFrameworkDemo';
import CybersecEval3Demo from '../../components/demos/CybersecEval3Demo';
import MetrReBenchDemo from '../../components/demos/MetrReBenchDemo';
import SweBenchSuiteDemo from '../../components/demos/SweBenchSuiteDemo';
import GaiaBenchmarkDemo from '../../components/demos/GaiaBenchmarkDemo';
import MmauBenchmarkDemo from '../../components/demos/MmauBenchmarkDemo';
import WebArenaSuiteDemo from '../../components/demos/WebArenaSuiteDemo';
import EuAiActFrameworkDemo from '../../components/demos/EuAiActFrameworkDemo';
import AISIEvaluationFrameworkDemo from '../../components/demos/AISIEvaluationFrameworkDemo';
import MapsBenchmarkDemo from '../../components/demos/MapsBenchmarkDemo';
import ConstitutionalAiEvaluationDemo from '../../components/demos/ConstitutionalAiEvaluationDemo';
import ContextProcessingPipelinesDemo from '../../components/demos/ContextProcessingPipelinesDemo';
import ContextLifecycleManagementDemo from '../../components/demos/ContextLifecycleManagementDemo';
import HierarchicalContextArchitectureDemo from '../../components/demos/HierarchicalContextArchitectureDemo';
import ContextStateMachinesDemo from '../../components/demos/ContextStateMachinesDemo';
import ContextStreamingProtocolsDemo from '../../components/demos/ContextStreamingProtocolsDemo';
import ContextWritePatternsDemo from '../../components/demos/ContextWritePatternsDemo';
import ContextSelectPatternsDemo from '../../components/demos/ContextSelectPatternsDemo';
import ContextCompressPatternsDemo from '../../components/demos/ContextCompressPatternsDemo';
import ContextIsolatePatternsDemo from '../../components/demos/ContextIsolatePatternsDemo';
import SlidingWindowManagementDemo from '../../components/demos/SlidingWindowManagementDemo';
import SemanticContextCompressionDemo from '../../components/demos/SemanticContextCompressionDemo';
import InfiniAttentionArchitectureDemo from '../../components/demos/InfiniAttentionArchitectureDemo';
import MemoryBlockArchitectureDemo from '../../components/demos/MemoryBlockArchitectureDemo';
import KVCacheOptimizationDemo from '../../components/demos/KVCacheOptimizationDemo';
import ContextEngineeringFrameworksDemo from '../../components/demos/ContextEngineeringFrameworksDemo';
import ContextFailurePreventionDemo from '../../components/demos/ContextFailurePreventionDemo';
import HumanInTheLoopDemo from '../../components/demos/HumanInTheLoopDemo';
import HumanOnTheLoopDemo from '../../components/demos/HumanOnTheLoopDemo';
import ProgressiveDisclosurePatternsDemo from '../../components/demos/ProgressiveDisclosurePatternsDemo';
import ConfidenceVisualizationPatternsDemo from '../../components/demos/ConfidenceVisualizationPatternsDemo';
import MixedInitiativeInterfacePatternsDemo from '../../components/demos/MixedInitiativeInterfacePatternsDemo';
import AgentStatusActivityPatternsDemo from '../../components/demos/AgentStatusActivityPatternsDemo';
import ConversationalInterfacePatternsDemo from '../../components/demos/ConversationalInterfacePatternsDemo';
import AgentCollaborationUxDemo from '../../components/demos/AgentCollaborationUxDemo';
import TrustTransparencyPatternsDemo from '../../components/demos/TrustTransparencyPatternsDemo';
import AdaptiveInterfacePatternsDemo from '../../components/demos/AdaptiveInterfacePatternsDemo';
import ContextWindowManagementPatternsDemo from '../../components/demos/ContextWindowManagementPatternsDemo';
import MonitoringControlPatternsDemo from '../../components/demos/MonitoringControlPatternsDemo';
import ErrorHandlingRecoveryPatternsDemo from '../../components/demos/ErrorHandlingRecoveryPatternsDemo';
import OnboardingEducationPatternsDemo from '../../components/demos/OnboardingEducationPatternsDemo';
import PrivacySecurityUxDemo from '../../components/demos/PrivacySecurityUxDemo';
import AccessibilityAgentDesignDemo from '../../components/demos/AccessibilityAgentDesignDemo';
import AmbientAgentPatternsDemo from '../../components/demos/AmbientAgentPatternsDemo';
import ChatInterfacePatternsDemo from '../../components/demos/ChatInterfacePatternsDemo';
import CrossPlatformAgentUxDemo from '../../components/demos/CrossPlatformAgentUxDemo';
import VisualReasoningPatternsDemo from '../../components/demos/VisualReasoningPatternsDemo';
import MultimodalInteractionPatternsDemo from '../../components/demos/MultimodalInteractionPatternsDemo';
import AllDemosShowcase from '../../components/demos/AllDemosShowcase';
import { patternExamples, type PatternId, type LanguageType } from '../pattern-examples';
import { patternScenarios } from '../../data/patterns';
import DomainReasoningDetails from './technique-details/DomainReasoningDetails';
import GraphOfDebatesDetails from './technique-details/GraphOfDebatesDetails';
import SelfCorrectionDetails from './technique-details/SelfCorrectionDetails';
import ChainOfThoughtDetails from './technique-details/ChainOfThoughtDetails';
import GraphOfThoughtDetails from './technique-details/GraphOfThoughtDetails';
import TreeOfThoughtDetails from './technique-details/TreeOfThoughtDetails';
import VideoExplanationSection from './technique-details/VideoExplanationSection';
import AdaptiveRAGDetails from './technique-details/AdaptiveRAGDetails';
import SelfRAGDetails from './technique-details/SelfRAGDetails';
import GraphRAGDetails from './technique-details/GraphRAGDetails';
import HierarchicalRAGDetails from './technique-details/HierarchicalRAGDetails';
import SequentialChainingDetails from './technique-details/SequentialChainingDetails';
import ContextRetrievalGenerationDetails from './technique-details/ContextRetrievalGenerationDetails';
import ContextProcessingPipelinesDetails from './technique-details/ContextProcessingPipelinesDetails';
import ContextLifecycleManagementDetails from './technique-details/ContextLifecycleManagementDetails';
import HierarchicalContextArchitectureDetails from './technique-details/HierarchicalContextArchitectureDetails';
import ContextStateMachinesDetails from './technique-details/ContextStateMachinesDetails';
import ContextStreamingProtocolsDetails from './technique-details/ContextStreamingProtocolsDetails';
import ContextWritePatternsDetails from './technique-details/ContextWritePatternsDetails';
import ContextSelectPatternsDetails from './technique-details/ContextSelectPatternsDetails';
import ContextCompressPatternsDetails from './technique-details/ContextCompressPatternsDetails';
import ContextIsolatePatternsDetails from './technique-details/ContextIsolatePatternsDetails';
import SlidingWindowManagementDetails from './technique-details/SlidingWindowManagementDetails';
import SemanticContextCompressionDetails from './technique-details/SemanticContextCompressionDetails';
import InfiniAttentionArchitectureDetails from './technique-details/InfiniAttentionArchitectureDetails';
import MemoryBlockArchitectureDetails from './technique-details/MemoryBlockArchitectureDetails';
import KVCacheOptimizationDetails from './technique-details/KVCacheOptimizationDetails';
import ContextEngineeringFrameworksDetails from './technique-details/ContextEngineeringFrameworksDetails';
import ContextFailurePreventionDetails from './technique-details/ContextFailurePreventionDetails';
import ParallelChainingDetails from './technique-details/ParallelChainingDetails';
import FeedbackChainingDetails from './technique-details/FeedbackChainingDetails';
import MapReduceDetails from './technique-details/MapReduceDetails';
import ScatterGatherDetails from './technique-details/ScatterGatherDetails';
import ForkJoinDetails from './technique-details/ForkJoinDetails';
import AsyncAwaitDetails from './technique-details/AsyncAwaitDetails';
import ContentBasedRoutingDetails from './technique-details/ContentBasedRoutingDetails';
import CapabilityRoutingDetails from './technique-details/CapabilityRoutingDetails';
import LlmBasedRoutingDetails from './technique-details/LlmBasedRoutingDetails';
import EmbeddingBasedRoutingDetails from './technique-details/EmbeddingBasedRoutingDetails';
import RuleBasedRoutingDetails from './technique-details/RuleBasedRoutingDetails';
import MachineLearningModelBasedRoutingDetails from './technique-details/MachineLearningModelBasedRoutingDetails';
import SlidingWindowDetails from './technique-details/SlidingWindowDetails';
import HierarchicalMemoryDetails from './technique-details/HierarchicalMemoryDetails';
import AttentionMechanismsDetails from './technique-details/AttentionMechanismsDetails';
import MemoryConsolidationDetails from './technique-details/MemoryConsolidationDetails';
import WorkingMemoryPatternsDetails from './technique-details/WorkingMemoryPatternsDetails';
import { LatencyOptimizationDetails } from './technique-details/LatencyOptimizationDetails';
import { AdaptiveComplexityScalingDetails } from './technique-details/AdaptiveComplexityScalingDetails';
import { AdaptiveThinkingDetails } from './technique-details/AdaptiveThinkingDetails';
import { AdaptiveContextSizingDetails } from './technique-details/AdaptiveContextSizingDetails';
import { AdaptiveContextDepthDetails } from './technique-details/AdaptiveContextDepthDetails';
import { SelfRegulatingDepthControlDetails } from './technique-details/SelfRegulatingDepthControlDetails';
import { LongCotDetails } from './technique-details/LongCotDetails';
import PalmDetails from './technique-details/PalmDetails';
import LrtDetails from './technique-details/LrtDetails';
import { ResourceAwareSchedulingDetails } from './technique-details/ResourceAwareSchedulingDetails';
import { FederatedOrchestrationDetails } from './technique-details/FederatedOrchestrationDetails';
import { AgenticRagSystemsDetails } from './technique-details/AgenticRagSystemsDetails';
import { ChainOfVerificationRagDetails } from './technique-details/ChainOfVerificationRagDetails';
import { EventDrivenMarketBasedDetails } from './technique-details/EventDrivenMarketBasedDetails';
import { RetryBackoffDetails } from './technique-details/RetryBackoffDetails';
import { GracefulDegradationDetails } from './technique-details/GracefulDegradationDetails';
import { ScenarioPlanningDetails } from './technique-details/ScenarioPlanningDetails';
import { MultiModalCognitionDetails } from './technique-details/MultiModalCognitionDetails';
import { MultimodalContextIntegrationDetails } from './technique-details/MultimodalContextIntegrationDetails';
import { ContextCompressionAdvancedDetails } from './technique-details/ContextCompressionAdvancedDetails';
import { MetaReasoningDetails } from './technique-details/MetaReasoningDetails';
import { HierarchicalTaskNetworkPlanningDetails } from './technique-details/HierarchicalTaskNetworkPlanningDetails';
import { SupervisorWorkerPatternDetails } from './technique-details/SupervisorWorkerPatternDetails';
import { SharedScratchpadCollaborationDetails } from './technique-details/SharedScratchpadCollaborationDetails';
import { TaskManagementOrchestrationDetails } from './technique-details/TaskManagementOrchestrationDetails';
import { SequentialPipelineAgentsDetails } from './technique-details/SequentialPipelineAgentsDetails';
import { ConcurrentOrchestrationDetails } from './technique-details/ConcurrentOrchestrationDetails';
import { HandoffOrchestrationDetails } from './technique-details/HandoffOrchestrationDetails';
import { ParametricMemoryDetails } from './technique-details/ParametricMemoryDetails';
import { EpisodicMemorySystemsDetails } from './technique-details/EpisodicMemorySystemsDetails';
import { SemanticMemoryNetworksDetails } from './technique-details/SemanticMemoryNetworksDetails';
import { TransactiveMemorySystemsDetails } from './technique-details/TransactiveMemorySystemsDetails';
import { MemoryReadingWritingOperationsDetails } from './technique-details/MemoryReadingWritingOperationsDetails';
import { ContextualStructuredMemoryDetails } from './technique-details/ContextualStructuredMemoryDetails';
import { ContextualUnstructuredMemoryDetails } from './technique-details/ContextualUnstructuredMemoryDetails';
import { MemoryConsolidationProcessesDetails } from './technique-details/MemoryConsolidationProcessesDetails';
import { DistributedMemoryArchitecturesDetails } from './technique-details/DistributedMemoryArchitecturesDetails';
import { ReinforcementLearningFromHumanFeedbackDetails } from './technique-details/ReinforcementLearningFromHumanFeedbackDetails';
import { DirectPreferenceOptimizationDetails } from './technique-details/DirectPreferenceOptimizationDetails';
import { InContextLearningDetails } from './technique-details/InContextLearningDetails';
import { MetaLearningSystemsDetails } from './technique-details/MetaLearningSystemsDetails';
import { ContinualLearningSystemsDetails } from './technique-details/ContinualLearningSystemsDetails';
import { SelfImprovingSystemsDetails } from './technique-details/SelfImprovingSystemsDetails';
import { ConstitutionalAIDetails } from './technique-details/ConstitutionalAIDetails';
import { ReinforcementLearningFromAIFeedbackDetails } from './technique-details/ReinforcementLearningFromAIFeedbackDetails';
import { TestTimeScalingDetails } from './technique-details/TestTimeScalingDetails';
import { OddsRatioPreferenceOptimizationDetails } from './technique-details/OddsRatioPreferenceOptimizationDetails';
import ProgressiveDisclosurePatternsDetails from './technique-details/ProgressiveDisclosurePatternsDetails';
import ConfidenceVisualizationPatternsDetails from './technique-details/ConfidenceVisualizationPatternsDetails';
import MixedInitiativeInterfacePatternsDetails from './technique-details/MixedInitiativeInterfacePatternsDetails';
import AgentStatusActivityPatternsDetails from './technique-details/AgentStatusActivityPatternsDetails';
import ContextWindowManagementPatternsDetails from './technique-details/ContextWindowManagementPatternsDetails';
import AdaptiveInterfacePatternsDetails from './technique-details/AdaptiveInterfacePatternsDetails';
import MonitoringControlPatternsDetails from './technique-details/MonitoringControlPatternsDetails';
import ErrorHandlingRecoveryPatternsDetails from './technique-details/ErrorHandlingRecoveryPatternsDetails';
import OnboardingEducationPatternsDetails from './technique-details/OnboardingEducationPatternsDetails';
import PrivacySecurityUXDetails from './technique-details/PrivacySecurityUXDetails';
import AccessibilityAgentDesignDetails from './technique-details/AccessibilityAgentDesignDetails';
import { SimplePreferenceOptimizationDetails } from './technique-details/SimplePreferenceOptimizationDetails';
import { SupervisedLearningAdaptationDetails } from './technique-details/SupervisedLearningAdaptationDetails';
import { UnsupervisedLearningAdaptationDetails } from './technique-details/UnsupervisedLearningAdaptationDetails';
import { OnlineLearningAdaptationDetails } from './technique-details/OnlineLearningAdaptationDetails';
import { MemoryBasedLearningDetails } from './technique-details/MemoryBasedLearningDetails';
import { LlmCheckpointRecoveryDetails } from './technique-details/LlmCheckpointRecoveryDetails';
import { AgentContextPreservationDetails } from './technique-details/AgentContextPreservationDetails';
import { PredictiveAgentFaultToleranceDetails } from './technique-details/PredictiveAgentFaultToleranceDetails';
import { AgentCommunicationFaultToleranceDetails } from './technique-details/AgentCommunicationFaultToleranceDetails';
import { NaiveRagDetails } from './technique-details/NaiveRagDetails';
import { AdvancedRagDetails } from './technique-details/AdvancedRagDetails';
import ReactDetails from './technique-details/ReactDetails';
import ForestOfThoughtsDetails from './technique-details/ForestOfThoughtsDetails';
import MetacognitiveMonitoringDetails from './technique-details/MetacognitiveMonitoringDetails';
import TestTimeComputeScalingDetails from './technique-details/TestTimeComputeScalingDetails';
import ReflectiveMctsDetails from './technique-details/ReflectiveMctsDetails';
import LeastToMostPromptingDetails from './technique-details/LeastToMostPromptingDetails';
import AnalogicalReasoningDetails from './technique-details/AnalogicalReasoningDetails';
import CausalReasoningDetails from './technique-details/CausalReasoningDetails';
import AbductiveReasoningDetails from './technique-details/AbductiveReasoningDetails';
import StepBackPromptingDetails from './technique-details/StepBackPromptingDetails';
import BufferOfThoughtsDetails from './technique-details/BufferOfThoughtsDetails';
import SkeletonOfThoughtsDetails from './technique-details/SkeletonOfThoughtsDetails';
import LayeredDefensePatternDetails from './technique-details/LayeredDefensePatternDetails';
import ContextualGuardrailingDetails from './technique-details/ContextualGuardrailingDetails';
import GuardAgentPatternDetails from './technique-details/GuardAgentPatternDetails';
import IntrinsicAlignmentPatternDetails from './technique-details/IntrinsicAlignmentPatternDetails';
import MemoryPoisoningPreventionDetails from './technique-details/MemoryPoisoningPreventionDetails';
import ToolMisusePreventionDetails from './technique-details/ToolMisusePreventionDetails';
import PrivilegeCompromiseMitigationDetails from './technique-details/PrivilegeCompromiseMitigationDetails';
import AgrailAdaptivePatternDetails from './technique-details/AgrailAdaptivePatternDetails';
import MaestroMultiAgentSecurityDetails from './technique-details/MaestroMultiAgentSecurityDetails';
import SystemPromptProtectionDetails from './technique-details/SystemPromptProtectionDetails';

interface TechniqueDetailsProps {
  selectedTechnique: any;
  categories: any[];
  useCases: any[];
  detailsTab?: 'overview' | 'flow' | 'interactive' | 'code' | 'deepdive';
  setDetailsTab?: (tab: 'overview' | 'flow' | 'interactive' | 'code' | 'deepdive') => void;
  selectedLanguage?: LanguageType;
  setSelectedLanguage?: (lang: LanguageType) => void;
}

export const TechniqueDetails = ({
  selectedTechnique,
  categories,
  useCases,
  detailsTab: propDetailsTab,
  setDetailsTab: propSetDetailsTab,
  selectedLanguage: propSelectedLanguage,
  setSelectedLanguage: propSetSelectedLanguage,
}: TechniqueDetailsProps) => {
  const [localDetailsTab, setLocalDetailsTab] = useState<'overview' | 'flow' | 'interactive' | 'code' | 'deepdive'>('overview');
  const [localSelectedLanguage, setLocalSelectedLanguage] = useState<LanguageType>('typescript');
  const { user, loading } = useAuth();
  const router = useRouter();
  const { trackTechniqueView, trackEvent } = usePlausible();
  
  const detailsTab = propDetailsTab || localDetailsTab;
  const setDetailsTab = propSetDetailsTab || setLocalDetailsTab;
  const selectedLanguage = propSelectedLanguage || localSelectedLanguage;
  const setSelectedLanguage = propSetSelectedLanguage || setLocalSelectedLanguage;

  // Track technique views
  useEffect(() => {
    if (selectedTechnique) {
      const category = categories.find(c => c.id === selectedTechnique.category);
      trackTechniqueView(selectedTechnique.id, category?.name || 'unknown');
    }
  }, [selectedTechnique?.id, trackTechniqueView, categories]);

  // Handle tab switching with auth checks
  const handleTabChange = (tab: 'overview' | 'flow' | 'interactive' | 'code' | 'deepdive') => {
    // Track tab changes
    trackEvent('Technique Tab Change', {
      technique: selectedTechnique?.id,
      tab: tab,
      category: selectedTechnique?.category,
      user_authenticated: !!user
    });

    // Check if user is trying to access protected content
    if ((tab === 'interactive' || tab === 'code') && !user) {
      // Don't switch tab, let the content section handle showing auth prompt
      setDetailsTab(tab);
      return;
    }
    setDetailsTab(tab);
  };
  if (!selectedTechnique) {
    return (
      <div className="lg:col-span-3">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 shadow-2xl flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Select a technique to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-6 lg:p-6 border-b border-gray-700/30">
          <div className="flex items-start gap-4 lg:gap-4">
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 lg:w-16 lg:h-16 bg-gradient-to-br ${getCategoryColor(selectedTechnique.category).light} ${getCategoryColor(selectedTechnique.category).border} border rounded-2xl flex items-center justify-center text-2xl lg:text-2xl`}>
                {selectedTechnique.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-2xl font-semibold text-white mb-2">
                    {selectedTechnique.name}
                    {selectedTechnique.abbr && (
                      <span className="text-lg lg:text-lg ml-2 text-gray-400 font-normal">({selectedTechnique.abbr})</span>
                    )}
                  </h1>
                  <p className="text-gray-300 text-base lg:text-base leading-relaxed mb-4">{selectedTechnique.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className={`inline-flex items-center px-3 lg:px-3 py-1.5 rounded-full text-sm font-medium ${getComplexityColor(selectedTechnique.complexity).badge}`}>
                      Complexity: {selectedTechnique.complexity}
                    </span>
                    <span className={`inline-flex items-center px-3 lg:px-3 py-1.5 rounded-full text-sm font-medium ${(getCategoryColor(selectedTechnique.category) as any).badge || 'bg-gray-800/60 text-gray-200'}`}>
                      {categories.find(c => c.id === selectedTechnique.category)?.name || 'Pattern'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="border-b border-gray-700/30">
          {/* Desktop tabs */}
          <div className="hidden md:flex gap-6 px-6">
            {selectedTechnique.id === 'eu-ai-act-framework' && (
              <button
                onClick={() => handleTabChange('deepdive')}
                className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                  detailsTab === 'deepdive'
                    ? 'text-emerald-400 border-emerald-400'
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Deep Dive
              </button>
            )}
            <button
              onClick={() => handleTabChange('overview')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'overview'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => handleTabChange('flow')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'flow'
                  ? 'text-orange-400 border-orange-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <GitBranch className="w-4 h-4 inline mr-2" />
              Flow Visualization
            </button>
            <button
              onClick={() => handleTabChange('interactive')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'interactive'
                  ? 'text-purple-400 border-purple-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Interactive Demo
            </button>
            <button
              onClick={() => handleTabChange('code')}
              className={`cursor-pointer py-4 px-3 font-medium transition-all border-b-2 ${
                detailsTab === 'code'
                  ? 'text-green-400 border-green-400'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Playground
            </button>
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden px-4 py-3">
            <div className={`grid gap-2 ${selectedTechnique.id === 'eu-ai-act-framework' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {selectedTechnique.id === 'eu-ai-act-framework' && (
                <button
                  onClick={() => handleTabChange('deepdive')}
                  className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                    detailsTab === 'deepdive'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Deep Dive
                </button>
              )}
              <button
                onClick={() => handleTabChange('overview')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-1" />
                Overview
              </button>
              <button
                onClick={() => handleTabChange('flow')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'flow'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <GitBranch className="w-4 h-4 inline mr-1" />
                Flow
              </button>
              <button
                onClick={() => handleTabChange('interactive')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'interactive'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Play className="w-4 h-4 inline mr-1" />
                Demo
              </button>
              <button
                onClick={() => handleTabChange('code')}
                className={`py-4 px-3 rounded-lg font-medium transition-all text-sm min-h-[48px] ${
                  detailsTab === 'code'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                Code
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 lg:p-6">
          {detailsTab === 'overview' ? (
            <div className="space-y-8">
              {/* Video Explanation */}
              <VideoExplanationSection techniqueId={selectedTechnique.id} />

              {/* Overview header block (technique-specific) */}
              {selectedTechnique.id === 'domain-reasoning' ? (
                <DomainReasoningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'cot' ? (
                <ChainOfThoughtDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'got' ? (
                <GraphOfThoughtDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'tot' ? (
                <TreeOfThoughtDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'react' ? (
                <ReactDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'fot' ? (
                <ForestOfThoughtsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'metacognitive-monitoring' ? (
                <MetacognitiveMonitoringDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'test-time-compute' ? (
                <TestTimeComputeScalingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'reflective-mcts' ? (
                <ReflectiveMctsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'least-to-most' ? (
                <LeastToMostPromptingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'analogical-reasoning' ? (
                <AnalogicalReasoningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'causal-reasoning' ? (
                <CausalReasoningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'abductive-reasoning' ? (
                <AbductiveReasoningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'step-back-prompting' ? (
                <StepBackPromptingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'buffer-of-thoughts' ? (
                <BufferOfThoughtsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'skeleton-of-thoughts' ? (
                <SkeletonOfThoughtsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'naive-rag' ? (
                <NaiveRagDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'advanced-rag' ? (
                <AdvancedRagDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'adaptive-rag' ? (
                <AdaptiveRAGDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'self-rag' ? (
                <SelfRAGDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'graph-rag' ? (
                <GraphRAGDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'hierarchical-rag' ? (
                <HierarchicalRAGDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'sequential-chaining' ? (
                <SequentialChainingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-retrieval-generation' ? (
                <ContextRetrievalGenerationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-processing-pipelines' ? (
                <ContextProcessingPipelinesDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-lifecycle-management' ? (
                <ContextLifecycleManagementDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'hierarchical-context-architecture' ? (
                <HierarchicalContextArchitectureDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-state-machines' ? (
                <ContextStateMachinesDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-streaming-protocols' ? (
                <ContextStreamingProtocolsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-write-patterns' ? (
                <ContextWritePatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-select-patterns' ? (
                <ContextSelectPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-compress-patterns' ? (
                <ContextCompressPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-isolate-patterns' ? (
                <ContextIsolatePatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'sliding-window-management' ? (
                <SlidingWindowManagementDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'semantic-context-compression' ? (
                <SemanticContextCompressionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'infini-attention-architecture' ? (
                <InfiniAttentionArchitectureDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'memory-block-architecture' ? (
                <MemoryBlockArchitectureDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'kv-cache-optimization' ? (
                <KVCacheOptimizationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-engineering-frameworks' ? (
                <ContextEngineeringFrameworksDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'context-failure-prevention' ? (
                <ContextFailurePreventionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'parallel-chaining' ? (
                <ParallelChainingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'feedback-chaining' ? (
                <FeedbackChainingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'map-reduce' ? (
                <MapReduceDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'scatter-gather' ? (
                <ScatterGatherDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'fork-join' ? (
                <ForkJoinDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'async-await' ? (
                <AsyncAwaitDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'content-based-routing' ? (
                <ContentBasedRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'capability-routing' ? (
                <CapabilityRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'llm-based-routing' ? (
                <LlmBasedRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'embedding-based-routing' ? (
                <EmbeddingBasedRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'rule-based-routing' ? (
                <RuleBasedRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'machine-learning-model-based-routing' ? (
                <MachineLearningModelBasedRoutingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'sliding-window' ? (
                <SlidingWindowDetails />
              ) : selectedTechnique.id === 'hierarchical-memory' ? (
                <HierarchicalMemoryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'attention-mechanisms' ? (
                <AttentionMechanismsDetails />
              ) : selectedTechnique.id === 'memory-consolidation' ? (
                <MemoryConsolidationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'working-memory-patterns' ? (
                <WorkingMemoryPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'parametric-memory' ? (
                <ParametricMemoryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'episodic-memory-systems' ? (
                <EpisodicMemorySystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'semantic-memory-networks' ? (
                <SemanticMemoryNetworksDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'transactive-memory-systems' ? (
                <TransactiveMemorySystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'memory-reading-writing-operations' ? (
                <MemoryReadingWritingOperationsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'contextual-structured-memory' ? (
                <ContextualStructuredMemoryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'contextual-unstructured-memory' ? (
                <ContextualUnstructuredMemoryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'memory-consolidation-processes' ? (
                <MemoryConsolidationProcessesDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'distributed-memory-architectures' ? (
                <DistributedMemoryArchitecturesDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'reinforcement-learning-from-human-feedback' ? (
                <ReinforcementLearningFromHumanFeedbackDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'direct-preference-optimization' ? (
                <DirectPreferenceOptimizationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'in-context-learning' ? (
                <InContextLearningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'meta-learning' ? (
                <MetaLearningSystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'continual-learning' ? (
                <ContinualLearningSystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'self-improving-systems' ? (
                <SelfImprovingSystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'constitutional-ai' ? (
                <ConstitutionalAIDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'reinforcement-learning-from-ai-feedback' ? (
                <ReinforcementLearningFromAIFeedbackDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'test-time-scaling' ? (
                <TestTimeScalingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'odds-ratio-preference-optimization' ? (
                <OddsRatioPreferenceOptimizationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'simple-preference-optimization' ? (
                <SimplePreferenceOptimizationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'supervised-learning-adaptation' ? (
                <SupervisedLearningAdaptationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'unsupervised-learning-adaptation' ? (
                <UnsupervisedLearningAdaptationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'online-learning-adaptation' ? (
                <OnlineLearningAdaptationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'memory-based-learning' ? (
                <MemoryBasedLearningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'llm-checkpoint-recovery' ? (
                <LlmCheckpointRecoveryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agent-context-preservation' ? (
                <AgentContextPreservationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'predictive-agent-fault-tolerance' ? (
                <PredictiveAgentFaultToleranceDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agent-communication-fault-tolerance' ? (
                <AgentCommunicationFaultToleranceDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'cod' ? (
                <>
                  {/* Core Mechanism */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                      Core Mechanism
                    </h2>
                    <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
                      <p className="text-gray-200 text-base leading-relaxed">
                        Chain of Debates (CoD) orchestrates multiple AI agents with distinct perspectives (e.g., advocate, skeptic,
                        analyst) to engage in structured argumentation over several rounds. Arguments and counterarguments are
                        synthesized by a moderator/judge agent into a final, balanced conclusion. This reduces individual model bias and
                        improves robustness through dialectical reasoning.
                      </p>
                    </div>
                  </section>

                  {/* Workflow / Steps */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                      Workflow / Steps
                    </h2>
                    <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
                      <ol className="list-decimal list-inside space-y-2 text-gray-200 text-sm">
                        <li>Define roles and objectives: assign complementary agent personas and a moderator/judge.</li>
                        <li>Seed the debate: present the problem, constraints, and evaluation criteria.</li>
                        <li>Round-based argumentation: agents produce arguments; peers critique and refine.</li>
                        <li>Evidence grounding: optionally retrieve sources/tools; track citations and assumptions.</li>
                        <li>Judge synthesis: a judge aggregates strongest arguments; flags unresolved conflicts.</li>
                        <li>Convergence check: stop on consensus, confidence threshold, or max rounds.</li>
                        <li>Final report: produce rationale, trade-offs, and decision with references.</li>
                      </ol>
                    </div>
                  </section>

                  {/* Best Practices */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                      Best Practices
                    </h2>
                    <div className="grid gap-3">
                      {[
                        'Diversity by design: make roles orthogonal (optimist/pessimist/analyst/constraints).',
                        'Use a separate judge model/prompt; avoid the same agent evaluating its own claims.',
                        'Constrain format: structured claims, evidence, rebuttals, and confidence scores.',
                        'Ground with tools/retrieval; attach citations and highlight uncertainty.',
                        'Cap rounds and token budgets; early-stop when arguments repeat.',
                        'Cache intermediate arguments; deduplicate to reduce cost and drift.',
                        'Log debate trees for auditability and offline evaluation.',
                      ].map((tip) => (
                        <div key={tip} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg">
                          <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* When NOT to Use */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                      When NOT to Use
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Low-stakes or simple tasks where single-agent output suffices.</li>
                        <li>Hard real-time constraints where multi-round interaction exceeds latency budgets.</li>
                        <li>Severely resource-constrained settings without cost controls or caching.</li>
                        <li>Domains lacking verifiable ground truth or tools to arbitrate disagreements.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Common Pitfalls */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                      Common Pitfalls
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Echo chambers: agents collapse to agreement without real critique (mitigate with role prompts).</li>
                        <li>Judge leakage: using the same prompt/model for both debater and judge roles.</li>
                        <li>Token bloat: repetitive arguments across rounds; enforce novelty constraints.</li>
                        <li>Unverifiable claims: missing citations/tool checks; require evidence fields.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Key Features */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                      Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Multi-agent, role-driven argumentation',
                        'Round-based rebuttal and refinement',
                        'Independent judge/moderator synthesis',
                        'Evidence-grounded decisions with citations',
                        'Configurable stop rules and budgets',
                      ].map((feat) => (
                        <div key={feat} className="p-3 bg-gray-800/40 rounded-lg text-gray-300 text-sm border border-gray-700/40">
                          {feat}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* KPIs / Success Metrics */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                      KPIs / Success Metrics
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Task accuracy/quality vs. baselines (single-agent, self-critique).</li>
                        <li>Judge agreement rate and inter-rater reliability (if human judges present).</li>
                        <li>Consensus rate within N rounds; repetition/novelty ratio across rounds.</li>
                        <li>Evidence coverage and citation correctness.</li>
                        <li>Latency and cost per resolved debate (p50/p95; $/debate).</li>
                      </ul>
                    </div>
                  </section>

                  {/* Token / Resource Usage */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                      Token / Resource Usage
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Cost scales with (num_agents × rounds × tokens_per_turn) + judge synthesis.</li>
                        <li>Mitigate via caching, deduplication, shorter turn formats, and selective tool calls.</li>
                        <li>Prefer compact judge prompts and summarization between rounds.</li>
                        <li>Track token budgets and enforce hard caps to avoid runaway debates.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Best Use Cases */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-fuchsia-500 rounded-full"></div>
                      Best Use Cases
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
                      <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        <li>Complex decisions with trade-offs (policy, strategy, architecture).</li>
                        <li>Safety-sensitive analyses requiring rigorous challenge and evidence.</li>
                        <li>Research synthesis and literature review with conflicting findings.</li>
                        <li>Ethical deliberation and risk assessment with stakeholder perspectives.</li>
                      </ul>
                    </div>
                  </section>

                  {/* References & Further Reading */}
                  <section>
                    <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                      References & Further Reading
                    </h2>
                    <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40 space-y-4">
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Academic Papers</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li><a href="https://arxiv.org/abs/1805.00899" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AI Safety via Debate (Irving, Christiano, Amodei, 2018)</a></li>
                          <li><a href="https://arxiv.org/abs/2312.01703" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Neuro-Symbolic AI: Trends and debates context (2023)</a></li>
                          <li><a href="https://arxiv.org/abs/2306.05685" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LLM-as-a-Judge: Reliable Evaluation via LLMs (2023)</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Implementation Guides</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li><a href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen: Multi-agent and GroupChat patterns</a></li>
                          <li><a href="https://python.langchain.com/docs/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph: Graph-based multi-agent orchestration</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Tools & Libraries</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft AutoGen</a>, <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangGraph</a>, <a href="https://github.com/joaomdmoura/crewAI" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">CrewAI</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-sm">Community & Discussions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li><a href="https://discord.gg/langchain" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">LangChain Community</a></li>
                          <li><a href="https://github.com/microsoft/autogen/discussions" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">AutoGen Discussions</a></li>
                          <li><a href="https://discuss.huggingface.co/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">Hugging Face Forums (multi-agent & debate)</a></li>
                        </ul>
                      </div>
                    </div>
                </section>
                </>
              ) : selectedTechnique.id === 'god' ? (
                <GraphOfDebatesDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'self-correction' ? (
                <SelfCorrectionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'palm' ? (
                <PalmDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'lrt' ? (
                <LrtDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'long-cot' ? (
                <LongCotDetails />
              ) : selectedTechnique.id === 'function-calling' ? (
                <FunctionCallingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'event-driven-orchestrator-worker' ? (
                <EventDrivenOrchestratorWorkerDetails />
              ) : selectedTechnique.id === 'resource-aware-scheduling' ? (
                <ResourceAwareSchedulingDetails />
              ) : selectedTechnique.id === 'cost-aware-model-selection' ? (
                <CostAwareModelSelectionDetails />
              ) : selectedTechnique.id === 'energy-efficient-inference' ? (
                <EnergyEfficientInferenceDetails />
              ) : selectedTechnique.id === 'memory-optimization' ? (
                <MemoryOptimizationDetails />
              ) : selectedTechnique.id === 'progressive-enhancement' ? (
                <ProgressiveEnhancementDetails />
              ) : selectedTechnique.id === 'federated-orchestration' ? (
                <FederatedOrchestrationDetails />
              ) : selectedTechnique.id === 'enterprise-orchestration' ? (
                <EnterpriseOrchestrationDetails />
              ) : selectedTechnique.id === 'edge-ai-optimization' ? (
                <EdgeAiOptimizationDetails />
              ) : selectedTechnique.id === 'hybrid-reasoning' ? (
                <HybridReasoningDetails />
              ) : selectedTechnique.id === 'cognitive-pipelines' ? (
                <CognitivePipelinesDetails />
              ) : selectedTechnique.id === 'agentic-rag-systems' ? (
                <AgenticRagSystemsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'multi-source-context-fusion' ? (
               <MultiSourceContextFusionDetails />
              ) : selectedTechnique.id === 'modular-rag' ? (
                <ModularRagDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'multimodal-rag' ? (
                <MultimodalRagDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'corrective-rag' ? (
                <CorrectiveRagDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'conversational-rag' ? (
                <ConversationalRagDetails />
              ) : selectedTechnique.id === 'chain-of-verification-rag' ? (
                <ChainOfVerificationRagDetails />
              ) : selectedTechnique.id === 'event-driven-market-based' ? (
                <EventDrivenMarketBasedDetails />
              ) : selectedTechnique.id === 'circuit-breaker' ? (
                <CircuitBreakerDetails />
              ) : selectedTechnique.id === 'retry-backoff' ? (
                <RetryBackoffDetails />
              ) : selectedTechnique.id === 'graceful-degradation' ? (
                <GracefulDegradationDetails />
              ) : selectedTechnique.id === 'health-monitoring' ? (
                <HealthMonitoringDetails />
              ) : selectedTechnique.id === 'hierarchical-planning' ? (
                <HierarchicalPlanningDetails />
              ) : selectedTechnique.id === 'constraint-satisfaction' ? (
                <ConstraintSatisfactionDetails />
              ) : selectedTechnique.id === 'goal-decomposition' ? (
                <GoalDecompositionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'scenario-planning' ? (
                <ScenarioPlanningDetails />
              ) : selectedTechnique.id === 'memory-consolidation' ? (
                <MemoryConsolidationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'working-memory-patterns' ? (
                <WorkingMemoryPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'multi-modal-cognition' ? (
                <MultiModalCognitionDetails />
              ) : selectedTechnique.id === 'multimodal-context-integration' ? (
                <MultimodalContextIntegrationDetails />
              ) : selectedTechnique.id === 'sliding-window' ? (
                <SlidingWindowDetails />
              ) : selectedTechnique.id === 'hierarchical-memory' ? (
                <HierarchicalMemoryDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'attention-mechanisms' ? (
                <AttentionMechanismsDetails />
              ) : selectedTechnique.id === 'context-compression' ? (
                <ContextCompressionDetails />
              ) : selectedTechnique.id === 'context-compression-advanced' ? (
                <ContextCompressionAdvancedDetails />
              ) : selectedTechnique.id === 'gossip-protocols' ? (
                <GossipProtocolsDetails />
              ) : selectedTechnique.id === 'conversational-orchestration' ? (
                <ConversationalOrchestrationDetails />
              ) : selectedTechnique.id === 'role-based-teamwork' ? (
                <RoleBasedTeamworkDetails />
              ) : selectedTechnique.id === 'agent-orchestration' ? (
                <AgentOrchestrationDetails />
              ) : selectedTechnique.id === 'meta-reasoning-orchestration' ? (
                <MetaReasoningOrchestrationDetails />
              ) : selectedTechnique.id === 'peer-collaboration' ? (
                <PeerCollaborationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'latent-memory-networks' ? (
                <LatentMemoryNetworks />
              ) : selectedTechnique.id === 'adaptive-compute-scaling' ? (
                <AdaptiveComputeScalingDetails />
              ) : selectedTechnique.id === 'latency-optimization' ? (
                <LatencyOptimizationDetails />
              ) : selectedTechnique.id === 'adaptive-complexity-scaling' ? (
                <AdaptiveComplexityScalingDetails />
              ) : selectedTechnique.id === 'adaptive-thinking' ? (
                <AdaptiveThinkingDetails />
              ) : selectedTechnique.id === 'adaptive-context-sizing' ? (
                <AdaptiveContextSizingDetails />
              ) : selectedTechnique.id === 'adaptive-context-depth' ? (
                <AdaptiveContextDepthDetails />
              ) : selectedTechnique.id === 'self-regulating-depth-control' ? (
                <SelfRegulatingDepthControlDetails />
              ) : selectedTechnique.id === 'latent-knowledge-retrieval' ? (
                <LatentKnowledgeRetrievalDetails />
              ) : selectedTechnique.id === 'actor-frameworks' ? (
                <ActorFrameworksDetails />
              ) : selectedTechnique.id === 'consensus-algorithms' ? (
                <ConsensusAlgorithmsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'ambient-agent-patterns' ? (
                <AmbientAgentPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'chat-interface-patterns' ? (
                <ChatInterfacePatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'cross-platform-agent-ux' ? (
                <CrossPlatformAgentUxDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'visual-reasoning-patterns' ? (
                <VisualReasoningPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'multimodal-interaction-patterns' ? (
                <MultimodalInteractionPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'conversational-interface-patterns' ? (
                <ConversationalInterfacePatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agent-collaboration-ux' ? (
                <AgentCollaborationUxDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'trust-transparency-patterns' ? (
                <TrustTransparencyPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'identity-access-management' ? (
                <IdentityAccessManagementDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'threat-detection-response' ? (
                <ThreatDetectionResponseDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'compliance-automation-patterns' ? (
                <ComplianceAutomationPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'secure-multi-party-computation' ? (
                <SecureMultiPartyComputationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'zero-trust-agent-architecture' ? (
                <ZeroTrustAgentArchitectureDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'differential-privacy-patterns' ? (
                <DifferentialPrivacyPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'data-anonymization-patterns' ? (
                <DataAnonymizationPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'confidential-computing-patterns' ? (
                <ConfidentialComputingPatternsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'hybrid-secret-cache-management' ? (
                <HybridSecretCacheManagementDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'local-distant-agent-data-protection' ? (
                <LocalDistantAgentDataProtectionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agent-communication-protocols' ? (
                <AgentCommunicationProtocolsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'reinforcement-learning-adaptation' ? (
                <ReinforcementLearningAdaptationDetails />
              ) : selectedTechnique.id === 'continuous-learning' ? (
                <ContinuousLearningDetails />
              ) : selectedTechnique.id === 'meta-learning' ? (
                <MetaLearningDetails />
              ) : selectedTechnique.id === 'distributed-coordination' ? (
                <DistributedCoordinationDetails />
              ) : selectedTechnique.id === 'hierarchical-coordination' ? (
                <HierarchicalCoordinationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'json-schema' ? (
                <JsonSchemaDetails />
              ) : selectedTechnique.id === 'api-integration' ? (
                <ApiIntegrationDetails />
              ) : selectedTechnique.id === 'code-execution' ? (
                <CodeExecutionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'plugin-architecture' ? (
                <PluginArchitectureDetails />
              ) : selectedTechnique.id === 'rest-apis' ? (
                <RestApisDetails />
              ) : selectedTechnique.id === 'grpc-protocols' ? (
                <GrpcProtocolDetails />
              ) : selectedTechnique.id === 'pub-sub-patterns' ? (
                <PubSubPatternsDetails />
              ) : selectedTechnique.id === 'stateful-graph-workflows' ? (
                <StatefulGraphWorkflowsDetails />
              ) : selectedTechnique.id === 'graph-state-machines' ? (
                <GraphStateMachinesDetails />
              ) : selectedTechnique.id === 'actor-model-coordination' ? (
                <ActorModelCoordinationDetails />
              ) : selectedTechnique.id === 'event-driven-hierarchical' ? (
                <EventDrivenHierarchicalDetails />
              ) : selectedTechnique.id === 'message-passing' ? (
                <MessagePassingDetails />
              ) : selectedTechnique.id === 'message-queuing' ? (
                <MessageQueuingDetails />
              ) : selectedTechnique.id === 'model-context-protocol' ? (
                <ModelContextProtocolDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'a2a-protocol' ? (
                <A2aProtocolDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'parallel-synthesis' ? (
                <ParallelSynthesisDetails />
              ) : selectedTechnique.id === 'context-routing' ? (
                <ContextRoutingDetails />
              ) : selectedTechnique.id === 'dynamic-context-assembly' ? (
                <DynamicContextAssemblyDetails />
              ) : selectedTechnique.id === 'self-critique' ? (
                <SelfCritiqueDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'producer-critic' ? (
                <ProducerCriticDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'llm-as-judge' ? (
                <LLMAsJudgeDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'reflexion-pattern' ? (
                <ReflexionPatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'meta-reasoning' ? (
                <MetaReasoningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'hierarchical-task-network-planning' ? (
                <HierarchicalTaskNetworkPlanningDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'supervisor-worker-pattern' ? (
                <SupervisorWorkerPatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'shared-scratchpad-collaboration' ? (
                <SharedScratchpadCollaborationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'task-management-orchestration' ? (
                <TaskManagementOrchestrationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'sequential-pipeline-agents' ? (
                <SequentialPipelineAgentsDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'concurrent-orchestration' ? (
                <ConcurrentOrchestrationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'handoff-orchestration' ? (
                <HandoffOrchestrationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'layered-defense-pattern' ? (
                <LayeredDefensePatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'contextual-guardrailing-pattern' ? (
                <ContextualGuardrailingDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'guard-agent-pattern' ? (
                <GuardAgentPatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'intrinsic-alignment-pattern' ? (
                <IntrinsicAlignmentPatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'memory-poisoning-prevention' ? (
                <MemoryPoisoningPreventionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'tool-misuse-prevention' ? (
                <ToolMisusePreventionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'privilege-compromise-mitigation' ? (
                <PrivilegeCompromiseMitigationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agrail-adaptive-pattern' ? (
                <AgrailAdaptivePatternDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'maestro-multi-agent-security' ? (
                <MaestroMultiAgentSecurityDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'system-prompt-protection' ? (
                <SystemPromptProtectionDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'mlcommons-ai-safety' ? (
                <MlcommonsAiSafetyDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'agentbench' ? (
                <AgentBenchDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'theagentcompany' ? (
                <TheAgentCompanyDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'mlr-bench' ? (
                <MlrBenchDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'twelve-factor-agent' ? (
                <TwelveFactorAgentDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'nist-aria' ? (
                <NistAriaDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'helm-agent-eval' ? (
                <HelmAgentEvaluationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'hula-framework' ? (
                <HulaFrameworkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'cyberseceval3' ? (
                <CybersecEval3Details selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'metr-re-bench' ? (
                <MetrReBenchDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'swe-bench-suite' ? (
                <SweBenchSuiteDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'gaia-benchmark' ? (
                <GaiaBenchmarkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'mmau-benchmark' ? (
                <MmauBenchmarkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'webarena-suite' ? (
                <WebArenaSuiteDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'eu-ai-act-framework' ? (
                <EuAiActFrameworkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'aisi-evaluation-framework' ? (
                <AISIEvaluationFrameworkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'maps-benchmark' ? (
                <MapsBenchmarkDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'constitutional-ai-evaluation' ? (
                <ConstitutionalAiEvaluationDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'human-in-the-loop' ? (
                <HumanInTheLoopDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'human-on-the-loop' ? (
                <HumanOnTheLoopDetails selectedTechnique={selectedTechnique} />
              ) : selectedTechnique.id === 'progressive-disclosure-patterns' ? (
                <ProgressiveDisclosurePatternsDetails />
              ) : selectedTechnique.id === 'confidence-visualization-patterns' ? (
                <ConfidenceVisualizationPatternsDetails />
              ) : selectedTechnique.id === 'mixed-initiative-interface-patterns' ? (
                <MixedInitiativeInterfacePatternsDetails />
              ) : selectedTechnique.id === 'agent-status-activity-patterns' ? (
                <AgentStatusActivityPatternsDetails />
              ) : selectedTechnique.id === 'context-window-management-patterns' ? (
                <ContextWindowManagementPatternsDetails />
              ) : selectedTechnique.id === 'adaptive-interface-patterns' ? (
                <AdaptiveInterfacePatternsDetails />
              ) : selectedTechnique.id === 'monitoring-control-patterns' ? (
                <MonitoringControlPatternsDetails />
              ) : selectedTechnique.id === 'error-recovery-patterns' ? (
                <ErrorHandlingRecoveryPatternsDetails />
              ) : selectedTechnique.id === 'onboarding-education-patterns' ? (
                <OnboardingEducationPatternsDetails />
              ) : selectedTechnique.id === 'privacy-security-ux' ? (
                <PrivacySecurityUXDetails />
              ) : selectedTechnique.id === 'accessibility-agent-design' ? (
                <AccessibilityAgentDesignDetails />
              ) : (
                <section>
                  <h2 className="text-xl lg:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                    {selectedTechnique.name}
                  </h2>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                    <p className="text-gray-200 text-base leading-relaxed mb-6">
                      {selectedTechnique.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">{selectedTechnique.icon}</div>
                        <div className="text-sm text-gray-400 mb-1">Pattern Type</div>
                        <div className="text-sm font-medium text-white">
                          {categories.find(c => c.id === selectedTechnique.category)?.name || 'Design Pattern'}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">
                          {selectedTechnique.complexity === 'low' ? '🟢' : 
                           selectedTechnique.complexity === 'medium' ? '🟡' : '🔴'}
                        </div>
                        <div className="text-sm text-gray-400 mb-1">Complexity</div>
                        <div className="text-sm font-medium text-white capitalize">
                          {selectedTechnique.complexity}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">🎯</div>
                        <div className="text-sm text-gray-400 mb-1">Use Cases</div>
                        <div className="text-sm font-medium text-white">
                          {selectedTechnique.useCases.length} scenarios
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                        <div className="text-2xl mb-3">⚡</div>
                        <div className="text-sm text-gray-400 mb-1">Features</div>
                        <div className="text-sm font-medium text-white">
                          {selectedTechnique.features?.length || 0} features
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}                                
            </div>
          ) : detailsTab === 'flow' ? (
            <div className="space-y-6">
              {/* Flow Visualization */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  Step-by-Step Flow Visualization
                </h2>
                <div className="bg-gray-900/60 rounded-xl border border-gray-700/30">
                  <div className="bg-gray-900/60 px-4 py-3 border-b border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">
                        Interactive flow diagram showing the execution pattern
                      </span>
                      <span className="text-xs text-gray-500">
                        {patternScenarios[selectedTechnique.id] ? 'Flow diagram available' : 'Flow coming soon'}
                      </span>
                    </div>
                  </div>
                  {patternScenarios[selectedTechnique.id] ? (
                    <InteractivePatternFlow 
                      scenario={patternScenarios[selectedTechnique.id]}
                      height={500}
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <GitBranch className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Flow Visualization Coming Soon</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        We&apos;re creating an interactive flow diagram for this technique. 
                        Check back soon or explore other techniques with available flows.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : detailsTab === 'interactive' ? (
            !user ? (
              <div className="min-h-screen bg-gray-950 relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
                  {/* Hero Section */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-8">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
                      Interactive Demonstrations
                    </h1>
                    
                    <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                      Experience hands-on demonstrations and interactive learning for AI design patterns
                    </p>

                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                        <span className="text-2xl font-semibold text-blue-400">Sign in to access interactive demos!</span>
                      </div>
                      <p className="text-gray-300 text-lg">
                        Create your free account to explore interactive pattern demonstrations.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/auth/register')}
                        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Exploring Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                      
                      <button
                        onClick={() => router.push('/auth/login')}
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-xl border border-gray-700 transition-colors duration-200"
                      >
                        Already have an account? Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              {/* Interactive Demos */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Interactive Demonstrations
                </h2>
                <div className="bg-gray-900/60 rounded-xl border border-gray-700/30">
                  <div className="bg-gray-900/60 px-4 py-3 border-b border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">
                        {selectedTechnique.id === 'feedback-chaining' 
                          ? 'Interactive feedback loop demonstration'
                          : selectedTechnique.id === 'hierarchical-chaining'
                          ? 'Interactive project management simulation'
                          : selectedTechnique.id === 'capability-routing'
                          ? 'Interactive capability-based routing simulation'
                          : selectedTechnique.id === 'load-balancing'
                          ? 'Interactive load balancing and distribution simulation'
                          : selectedTechnique.id === 'geographic-routing'
                          ? 'Interactive geographic routing and compliance simulation'
                          : selectedTechnique.id === 'map-reduce'
                          ? 'Interactive distributed computing and data processing simulation'
                          : selectedTechnique.id === 'scatter-gather'
                          ? 'Interactive scatter-gather service orchestration simulation'
                          : selectedTechnique.id === 'fork-join'
                          ? 'Interactive fork-join recursive decomposition simulation'
                          : selectedTechnique.id === 'async-await'
                          ? 'Interactive async-await promise coordination simulation'
                          : selectedTechnique.id === 'self-critique'
                          ? 'Interactive self-critique quality assessment simulation'
                          : selectedTechnique.id === 'function-calling'
                          ? 'Interactive function calling and tool use simulation'
                          : selectedTechnique.id === 'code-execution'
                          ? 'Interactive code generation, validation, and execution simulation'
                          : selectedTechnique.id === 'hierarchical-planning'
                          ? 'Interactive hierarchical goal decomposition and project planning simulation'
                          : selectedTechnique.id === 'goal-decomposition'
                          ? 'Interactive goal breakdown, SMART criteria evaluation, and progress tracking simulation'
                          : selectedTechnique.id === 'constraint-satisfaction'
                          ? 'Interactive constraint satisfaction problem solving with multiple algorithms and optimization'
                          : selectedTechnique.id === 'scenario-planning'
                          ? 'Interactive strategic scenario planning with real-world AI system design contexts and adaptive strategies'
                          : selectedTechnique.id === 'context-compression-advanced'
                          ? 'Interactive multi-agent compression coordination with semantic preservation and dynamic optimization'
                          : selectedTechnique.id === 'multimodal-context-integration'
                          ? 'Interactive multimodal context processing with text, visual, and audio input integration'
                          : selectedTechnique.id === 'sliding-window'
                          ? 'Interactive sliding window memory management with automatic eviction and real-time processing'
                          : selectedTechnique.id === 'hierarchical-memory'
                          ? 'Interactive multi-tier memory system with intelligent promotion policies and retention management'
                          : selectedTechnique.id === 'attention-mechanisms'
                          ? 'Interactive attention scoring demonstration with semantic similarity, temporal relevance, and contextual importance'
                          : selectedTechnique.id === 'memory-consolidation'
                          ? 'Interactive memory consolidation process with pattern extraction, redundancy removal, and schema formation'
                          : selectedTechnique.id === 'working-memory-patterns'
                          ? 'Interactive working memory simulation with capacity management, attention control, and interference suppression'
                          : selectedTechnique.id === 'contextual-unstructured-memory'
                          ? 'Interactive multimodal memory system with cross-modal associations, semantic retrieval, and adaptive organization'
                          : selectedTechnique.id === 'context-compression'
                          ? 'Interactive context compression demo with lossy/lossless options, semantic preservation, and compression metrics'
                          : selectedTechnique.id === 'embedding-based-routing'
                          ? 'Interactive embedding-based routing with vector similarity matching and agent selection'
                          : selectedTechnique.id === 'rule-based-routing'
                          ? 'Interactive rule-based routing with deterministic decision trees and audit trails'
                          : selectedTechnique.id === 'machine-learning-model-based-routing'
                          ? 'Interactive ML model routing with feature extraction and sub-10ms inference'
                          : selectedTechnique.id === 'producer-critic'
                          ? 'Interactive producer-critic collaboration with iterative quality improvement'
                          : selectedTechnique.id === 'llm-as-judge'
                          ? 'Interactive LLM judge evaluation with structured rubrics and comparison'
                          : selectedTechnique.id === 'reflexion-pattern'
                          ? 'Interactive reflexion learning with self-reflection and episodic memory'
                          : selectedTechnique.id === 'reinforcement-learning-from-human-feedback'
                          ? 'Interactive RLHF training pipeline with human preference collection and policy optimization'
                          : selectedTechnique.id === 'direct-preference-optimization'
                          ? 'Interactive DPO training simulation with preference pair optimization and policy updates'
                          : selectedTechnique.id === 'in-context-learning'
                          ? 'Interactive ICL demonstration with zero-shot, one-shot, and few-shot learning examples'
                          : selectedTechnique.id === 'meta-learning'
                          ? 'Interactive meta-learning visualization with MAML, task adaptation, and transfer learning'
                          : selectedTechnique.id === 'continual-learning'
                          ? 'Interactive continual learning demo with sequential task training and catastrophic forgetting prevention'
                          : selectedTechnique.id === 'least-to-most'
                          ? 'Interactive progressive problem decomposition from simple to complex components with step-by-step building'
                          : selectedTechnique.id === 'analogical-reasoning'
                          ? 'Interactive analogical reasoning with cross-domain pattern discovery, concept mapping, and solution transfer'
                          : selectedTechnique.id === 'causal-reasoning'
                          ? 'Interactive causal analysis with mechanism exploration, confound checking, counterfactual reasoning, and intervention testing'
                          : selectedTechnique.id === 'abductive-reasoning'
                          ? 'Interactive inference to best explanation with hypothesis generation, evidence evaluation, and plausibility ranking'
                          : selectedTechnique.id === 'step-back-prompting'
                          ? 'Interactive abstraction to higher-level principles with step-back questions, principle-based approaches, and transferable knowledge'
                          : selectedTechnique.id === 'buffer-of-thoughts'
                          ? 'Interactive dynamic buffer of reusable thought patterns with analogical matching, pattern application, and accelerated problem-solving through reuse'
                          : selectedTechnique.id === 'skeleton-of-thoughts'
                          ? 'Interactive structured reasoning framework with skeleton creation, parallel expansion, integration, and reusable templates'
                          : selectedTechnique.id === 'layered-defense-pattern'
                          ? 'Interactive multi-layered security architecture demonstrating Swiss Cheese Model with independent defense layers and continuous improvement'
                          : selectedTechnique.id === 'contextual-guardrailing-pattern'
                          ? 'Interactive dynamic rule enforcement demonstrating context-aware decisions with risk-based constraints and adaptive security controls'
                          : selectedTechnique.id === 'guard-agent-pattern'
                          ? 'Interactive dedicated guard agent demonstration with input analysis, supervised execution, output filtering, and continuous monitoring'
                          : selectedTechnique.id === 'intrinsic-alignment-pattern'
                          ? 'Interactive tamper-proof internal monitoring demonstration with hidden objective detection, deceptive alignment prevention, and pre-impact intervention'
                          : selectedTechnique.id === 'memory-poisoning-prevention'
                          ? 'Interactive memory validation demonstration with cryptographic signing, quarantine system, integrity verification, and automated recovery'
                          : selectedTechnique.id === 'tool-misuse-prevention'
                          ? 'Interactive tool validation demonstration with intent analysis, risk assessment, permission checking, and execution blocking'
                          : selectedTechnique.id === 'privilege-compromise-mitigation'
                          ? 'Interactive access control demonstration with privilege verification, role validation, escalation detection, and continuous monitoring'
                          : selectedTechnique.id === 'agrail-adaptive-pattern'
                          ? 'Interactive lifelong learning demonstration with threat detection, violation analysis, rule generation, and continuous refinement'
                          : selectedTechnique.id === 'maestro-multi-agent-security'
                          ? 'Interactive multi-agent security demonstration with threat modeling, trust verification, anomaly detection, and coordinated defense'
                          : selectedTechnique.id === 'system-prompt-protection'
                          ? 'Interactive prompt protection demonstration with extraction detection, prompt isolation, integrity validation, and response filtering'
                          : selectedTechnique.id === 'differential-privacy-patterns'
                          ? 'Interactive privacy-preserving demonstration with epsilon-delta budgets, Laplace noise injection, and mathematical privacy guarantees'
                          : selectedTechnique.id === 'zero-trust-agent-architecture'
                          ? 'Interactive zero-trust demonstration with identity verification, authorization checks, request validation, and continuous monitoring'
                          : selectedTechnique.id === 'secure-multi-party-computation'
                          ? 'Interactive privacy-preserving collaboration with secret sharing, encrypted computation, and result reconstruction'
                          : selectedTechnique.id === 'compliance-automation-patterns'
                          ? 'Interactive regulatory compliance demonstration with automated policy checking, audit trail generation, and enforcement'
                          : selectedTechnique.id === 'threat-detection-response'
                          ? 'Interactive threat detection demonstration with real-time monitoring, anomaly detection, automated response, and incident logging'
                          : selectedTechnique.id === 'identity-access-management'
                          ? 'Interactive IAM demonstration with multi-factor authentication, role-based authorization, identity validation, and audit logging'
                          : selectedTechnique.id === 'data-anonymization-patterns'
                          ? 'Interactive data anonymization with K-anonymity, L-diversity, T-closeness, and synthetic data generation'
                          : selectedTechnique.id === 'confidential-computing-patterns'
                          ? 'Interactive confidential computing demonstration with secure enclave initialization, memory encryption, remote attestation, and protected processing'
                          : selectedTechnique.id === 'hybrid-secret-cache-management'
                          ? 'Interactive multi-tier storage demonstration with data classification, tier placement, cache operations, and synchronization'
                          : selectedTechnique.id === 'local-distant-agent-data-protection'
                          ? 'Interactive local-distant agent architecture with privacy-preserving data processing, anonymization techniques, and federated aggregation'
                          : selectedTechnique.id === 'mlcommons-ai-safety'
                          ? 'Interactive safety benchmark evaluation with 12 hazard categories, automated testing, and standardized grading system'
                          : selectedTechnique.id === 'agentbench'
                          ? 'Interactive LLM agent evaluation across 8 environments with multi-turn testing and comprehensive capability assessment'
                          : selectedTechnique.id === 'theagentcompany'
                          ? 'Interactive professional task evaluation across 6 job roles with workplace tools and checkpoint-based scoring'
                          : selectedTechnique.id === 'mlr-bench'
                          ? 'Interactive ML research pipeline evaluation across 4 stages with automated MLR-Judge scoring and experimental reliability analysis'
                          : selectedTechnique.id === 'twelve-factor-agent'
                          ? 'Interactive 12-factor compliance assessment comparing traditional vs production-ready agent architectures'
                          : selectedTechnique.id === 'helm-agent-eval'
                          ? 'Interactive holistic evaluation across 7 metrics (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency) with multimodal and tool use assessment'
                          : selectedTechnique.id === 'hula-framework'
                          ? 'Interactive human-in-the-loop development workflow with AI Planner, AI Coder, and Human Agent collaborating through planning, coding, and validation stages'
                          : selectedTechnique.id === 'cyberseceval3'
                          ? 'Interactive cybersecurity evaluation across 5 security domains, 4 multi-agent risks, and Llama Guard 3 deployment for risk mitigation'
                          : selectedTechnique.id === 'metr-re-bench'
                          ? 'Interactive ML research engineering evaluation comparing frontier agents vs 71 human experts across 5 capabilities at multiple time budgets (2h, 8h, 32h)'
                          : selectedTechnique.id === 'swe-bench-suite'
                          ? 'Interactive software engineering evaluation with 4 benchmark variants (Verified, Original, Live, Multimodal) testing coding agents on real GitHub issues from 12+ repositories'
                          : selectedTechnique.id === 'gaia-benchmark'
                          ? 'Interactive GAIA evaluation across 3 difficulty levels testing reasoning, multi-modality, web browsing, and tool-use proficiency against human baseline (92%)'
                          : selectedTechnique.id === 'mmau-benchmark'
                          ? 'Interactive MMAU evaluation across 5 domains (Tool-use, DAG QA, Data Science, Programming, Mathematics) with 20 tasks assessing 5 core capabilities'
                          : selectedTechnique.id === 'webarena-suite'
                          ? 'Interactive WebArena suite evaluation across 3 environments: WebArena (web tasks), VisualWebArena (visual understanding), WorkArena (enterprise workflows)'
                          : selectedTechnique.id === 'eu-ai-act-framework'
                          ? 'Interactive EU AI Act compliance assessment with risk classification, high-risk compliance checks, and GPAI model evaluation for regulatory approval'
                          : selectedTechnique.id === 'aisi-evaluation-framework'
                          ? 'Interactive AISI evaluation with three-tier progressive testing (Automated → Manual → Expert red-teaming) for frontier AI safety assessment'
                          : selectedTechnique.id === 'maps-benchmark'
                          ? 'Interactive MAPS evaluation across 11 languages testing GAIA, SWE-bench, MATH, and ASB tasks with language parity analysis'
                          : selectedTechnique.id === 'constitutional-ai-evaluation'
                          ? 'Interactive Constitutional AI evaluation with 5 principles, classifier training, and red team jailbreak testing (95.6% blocking rate)'
                          : selectedTechnique.id === 'context-processing-pipelines'
                          ? 'Interactive pipeline demonstration with 5 stages (Ingestion → Validation → Transform → Integration → Output) processing 8 multi-modal contexts'
                          : selectedTechnique.id === 'context-lifecycle-management'
                          ? 'Interactive lifecycle management with 5 stages (Versioning → Audit Trail → Governance → Retention → Recovery) and enterprise compliance tracking'
                          : selectedTechnique.id === 'hierarchical-context-architecture'
                          ? 'Interactive 5-level hierarchy tree (Global → Department → Project → Agent → Task) with inheritance, scope isolation, and override capabilities'
                          : selectedTechnique.id === 'context-state-machines'
                          ? 'Interactive finite state machine with 8 states, guard conditions, error recovery, and transition validation'
                          : selectedTechnique.id === 'context-streaming-protocols'
                          ? 'Interactive streaming demo with 4 streams, circular buffering, flow control with backpressure, and real-time synchronization'
                          : selectedTechnique.id === 'context-write-patterns'
                          ? 'Interactive externalization demo with scratchpads, hierarchical file system, overflow handling, and session persistence'
                          : selectedTechnique.id === 'context-select-patterns'
                          ? 'Interactive RAG demo with semantic search, relevance ranking, dynamic assembly, and token budget optimization'
                          : selectedTechnique.id === 'context-compress-patterns'
                          ? 'Interactive compression demo with semantic analysis, progressive compression, redundancy detection, and quality validation'
                          : selectedTechnique.id === 'context-isolate-patterns'
                          ? 'Interactive multi-agent demo with 5 specialized agents, context isolation, selective sharing, and conflict resolution'
                          : selectedTechnique.id === 'sliding-window-management'
                          ? 'Interactive window demo with 10 conversation messages, exponential decay recency weighting, and relevance-based retention'
                          : selectedTechnique.id === 'semantic-context-compression'
                          ? 'Interactive AI-driven compression with information lattice learning, hierarchical abstraction, and cross-modal fusion'
                          : selectedTechnique.id === 'infini-attention-architecture'
                          ? 'Interactive demo of Google\'s infinite context processing with bounded O(1) memory, dual attention, and streaming architecture'
                          : selectedTechnique.id === 'memory-block-architecture'
                          ? 'Interactive memory block demo with 5 functional blocks, hierarchical relationships, LRU caching, and version control'
                          : selectedTechnique.id === 'kv-cache-optimization'
                          ? 'Interactive KV cache demo with INT4/INT8 quantization, 4-node distribution, memory pooling, and 75% memory reduction'
                          : selectedTechnique.id === 'context-engineering-frameworks'
                          ? 'Interactive framework demo with XML-like structuring, 6 modular components, validation pipeline, and failure recovery'
                          : selectedTechnique.id === 'context-failure-prevention'
                          ? 'Interactive security demo with threat detection, 4 attack types, automatic recovery, and 100% detection rate'
                          : selectedTechnique.id === 'human-in-the-loop'
                          ? 'Interactive HITL demo with 6 decisions, confidence thresholds, 3 domain experts, and feedback learning'
                          : selectedTechnique.id === 'human-on-the-loop'
                          ? 'Interactive HOTL demo with autonomous trading, real-time monitoring, anomaly detection, and human intervention'
                          : selectedTechnique.id === 'progressive-disclosure-patterns'
                          ? 'Interactive disclosure demo with 4 information layers, 13 expandable sections, and cognitive load management'
                          : selectedTechnique.id === 'confidence-visualization-patterns'
                          ? 'Interactive confidence demo with 4 use cases, 3 visualization types, uncertainty ranges, and calibration metrics'
                          : selectedTechnique.id === 'mixed-initiative-interface-patterns'
                          ? 'Interactive mixed-initiative demo with 5 workflow steps, 3 control handoffs, and seamless human-AI collaboration'
                          : selectedTechnique.id === 'agent-status-activity-patterns'
                          ? 'Interactive status demo with 3 agent tasks, 15 activity stages, real-time progress tracking, and activity logs'
                          : selectedTechnique.id === 'conversational-interface-patterns'
                          ? 'Interactive conversational demo with 8-turn dialogue, multimodal interaction, intent recognition, and rich media responses'
                          : selectedTechnique.id === 'agent-collaboration-ux'
                          ? 'Interactive multi-agent coordination with 6 specialized agents, seamless handoffs, and transparent orchestration'
                          : selectedTechnique.id === 'trust-transparency-patterns'
                          ? 'Interactive explainable AI demo with decision transparency, source attribution, and progressive disclosure'
                          : selectedTechnique.id === 'adaptive-interface-patterns'
                          ? 'Interactive adaptive UI demo with context detection, personalization, and dynamic interface adjustments'
                          : selectedTechnique.id === 'context-window-management-patterns'
                          ? 'Interactive token management demo with real-time tracking, compression strategies, and optimization controls'
                          : selectedTechnique.id === 'monitoring-control-patterns'
                          ? 'Interactive mission control demo with 6 agents, real-time monitoring, alerts, and intervention capabilities'
                          : selectedTechnique.id === 'error-handling-recovery-patterns'
                          ? 'Interactive error handling demo with classification, recovery strategies, and context preservation'
                          : selectedTechnique.id === 'onboarding-education-patterns'
                          ? 'Interactive onboarding demo with progressive capability revelation and trust building'
                          : selectedTechnique.id === 'privacy-security-ux'
                          ? 'Interactive privacy controls demo with granular consent management and transparent data handling'
                          : selectedTechnique.id === 'accessibility-agent-design'
                          ? 'Interactive accessibility demo with WCAG compliance, assistive technology, and multimodal interfaces'
                          : selectedTechnique.id === 'ambient-agent-patterns'
                          ? 'Interactive ambient agent demo with continuous signal monitoring and selective human interaction'
                          : selectedTechnique.id === 'chat-interface-patterns'
                          ? 'Interactive chat demo with message threading, rich content, and collaborative features'
                          : selectedTechnique.id === 'cross-platform-agent-ux'
                          ? 'Interactive cross-platform demo with device synchronization and seamless context transfer'
                          : selectedTechnique.id === 'visual-reasoning-patterns'
                          ? 'Interactive reasoning visualization with decision trees, confidence metrics, and cognitive transparency'
                          : selectedTechnique.id === 'multimodal-interaction-patterns'
                          ? 'Interactive multimodal demo with voice, visual, gesture, and text integration'
                          : 'Hands-on demonstration of the technique'
                        }
                      </span>
                      <span className="text-xs text-gray-500">
                        {selectedTechnique.id === 'feedback-chaining' || selectedTechnique.id === 'hierarchical-chaining' || selectedTechnique.id === 'iterative-refinement' || selectedTechnique.id === 'parallel-synthesis' || selectedTechnique.id === 'dynamic-routing' || selectedTechnique.id === 'dynamic-context-assembly' || selectedTechnique.id === 'message-queuing' || selectedTechnique.id === 'latent-memory-networks' || selectedTechnique.id === 'adaptive-context-depth' || selectedTechnique.id === 'latent-knowledge-retrieval' || selectedTechnique.id === 'context-compression-advanced' || selectedTechnique.id === 'multimodal-context-integration' || selectedTechnique.id === 'sliding-window' || selectedTechnique.id === 'hierarchical-memory' || selectedTechnique.id === 'attention-mechanisms' || selectedTechnique.id === 'memory-consolidation' || selectedTechnique.id === 'working-memory-patterns' || selectedTechnique.id === 'contextual-unstructured-memory' || selectedTechnique.id === 'reinforcement-learning-from-human-feedback' || selectedTechnique.id === 'direct-preference-optimization' || selectedTechnique.id === 'in-context-learning' || selectedTechnique.id === 'meta-learning' || selectedTechnique.id === 'continual-learning' || selectedTechnique.id === 'least-to-most' || selectedTechnique.id === 'analogical-reasoning' || selectedTechnique.id === 'causal-reasoning' || selectedTechnique.id === 'abductive-reasoning' || selectedTechnique.id === 'step-back-prompting' || selectedTechnique.id === 'buffer-of-thoughts' || selectedTechnique.id === 'skeleton-of-thoughts' || selectedTechnique.id === 'layered-defense-pattern' || selectedTechnique.id === 'contextual-guardrailing-pattern' || selectedTechnique.id === 'guard-agent-pattern' || selectedTechnique.id === 'intrinsic-alignment-pattern' || selectedTechnique.id === 'memory-poisoning-prevention' || selectedTechnique.id === 'tool-misuse-prevention' || selectedTechnique.id === 'privilege-compromise-mitigation' || selectedTechnique.id === 'agrail-adaptive-pattern' || selectedTechnique.id === 'maestro-multi-agent-security' || selectedTechnique.id === 'system-prompt-protection' || selectedTechnique.id === 'differential-privacy-patterns' || selectedTechnique.id === 'zero-trust-agent-architecture' || selectedTechnique.id === 'secure-multi-party-computation' || selectedTechnique.id === 'compliance-automation-patterns' || selectedTechnique.id === 'threat-detection-response' || selectedTechnique.id === 'identity-access-management' || selectedTechnique.id === 'data-anonymization-patterns' || selectedTechnique.id === 'confidential-computing-patterns' || selectedTechnique.id === 'hybrid-secret-cache-management' || selectedTechnique.id === 'local-distant-agent-data-protection' || selectedTechnique.id === 'mlcommons-ai-safety' || selectedTechnique.id === 'agentbench' || selectedTechnique.id === 'theagentcompany' || selectedTechnique.id === 'mlr-bench' || selectedTechnique.id === 'twelve-factor-agent' || selectedTechnique.id === 'helm-agent-eval' || selectedTechnique.id === 'hula-framework' || selectedTechnique.id === 'cyberseceval3' || selectedTechnique.id === 'metr-re-bench' || selectedTechnique.id === 'swe-bench-suite' || selectedTechnique.id === 'gaia-benchmark' || selectedTechnique.id === 'mmau-benchmark' || selectedTechnique.id === 'webarena-suite' || selectedTechnique.id === 'eu-ai-act-framework' || selectedTechnique.id === 'aisi-evaluation-framework' || selectedTechnique.id === 'maps-benchmark' || selectedTechnique.id === 'constitutional-ai-evaluation' || selectedTechnique.id === 'context-processing-pipelines' || selectedTechnique.id === 'context-lifecycle-management' || selectedTechnique.id === 'hierarchical-context-architecture' || selectedTechnique.id === 'context-state-machines' || selectedTechnique.id === 'context-streaming-protocols' || selectedTechnique.id === 'context-write-patterns' || selectedTechnique.id === 'context-select-patterns' || selectedTechnique.id === 'context-compress-patterns' || selectedTechnique.id === 'context-isolate-patterns' || selectedTechnique.id === 'sliding-window-management' || selectedTechnique.id === 'semantic-context-compression' || selectedTechnique.id === 'infini-attention-architecture' || selectedTechnique.id === 'memory-block-architecture' || selectedTechnique.id === 'kv-cache-optimization' || selectedTechnique.id === 'context-engineering-frameworks' || selectedTechnique.id === 'context-failure-prevention' || selectedTechnique.id === 'human-in-the-loop' || selectedTechnique.id === 'human-on-the-loop' || selectedTechnique.id === 'progressive-disclosure-patterns' || selectedTechnique.id === 'confidence-visualization-patterns' || selectedTechnique.id === 'mixed-initiative-interface-patterns' || selectedTechnique.id === 'agent-status-activity-patterns' || selectedTechnique.id === 'conversational-interface-patterns' || selectedTechnique.id === 'agent-collaboration-ux' || selectedTechnique.id === 'trust-transparency-patterns' || selectedTechnique.id === 'adaptive-interface-patterns' || selectedTechnique.id === 'context-window-management-patterns' || selectedTechnique.id === 'monitoring-control-patterns' || selectedTechnique.id === 'error-handling-recovery-patterns' || selectedTechnique.id === 'onboarding-education-patterns' || selectedTechnique.id === 'privacy-security-ux' || selectedTechnique.id === 'accessibility-agent-design' || selectedTechnique.id === 'ambient-agent-patterns' || selectedTechnique.id === 'chat-interface-patterns' || selectedTechnique.id === 'cross-platform-agent-ux' || selectedTechnique.id === 'visual-reasoning-patterns' || selectedTechnique.id === 'multimodal-interaction-patterns' || selectedTechnique.id === 'context-compression' || selectedTechnique.id === 'content-based-routing' || selectedTechnique.id === 'capability-routing' || selectedTechnique.id === 'load-balancing' || selectedTechnique.id === 'geographic-routing' || selectedTechnique.id === 'map-reduce' || selectedTechnique.id === 'scatter-gather' || selectedTechnique.id === 'fork-join' || selectedTechnique.id === 'async-await' || selectedTechnique.id === 'self-critique' || selectedTechnique.id === 'producer-critic' || selectedTechnique.id === 'producer-critic-pattern' || selectedTechnique.id === 'llm-as-judge' || selectedTechnique.id === 'reflexion-pattern' || selectedTechnique.id === 'meta-reasoning' || selectedTechnique.id === 'hierarchical-task-network-planning' || selectedTechnique.id === 'task-management-orchestration' || selectedTechnique.id === 'a2a-protocol' || selectedTechnique.id === 'supervisor-worker-pattern' || selectedTechnique.id === 'shared-scratchpad-collaboration' || selectedTechnique.id === 'sequential-pipeline-agents' || selectedTechnique.id === 'concurrent-orchestration' || selectedTechnique.id === 'handoff-orchestration' || selectedTechnique.id === 'peer-collaboration' || selectedTechnique.id === 'function-calling' || selectedTechnique.id === 'code-execution' || selectedTechnique.id === 'hierarchical-planning' || selectedTechnique.id === 'goal-decomposition' || selectedTechnique.id === 'constraint-satisfaction' || selectedTechnique.id === 'scenario-planning' || selectedTechnique.id === 'sequential-chaining' || selectedTechnique.id === 'parallel-chaining' || selectedTechnique.id === 'conditional-chaining' || selectedTechnique.id === 'embedding-based-routing' || selectedTechnique.id === 'rule-based-routing' || selectedTechnique.id === 'machine-learning-model-based-routing' ? 'Interactive demo available' : 'Demo coming soon'}
                      </span>
                    </div>
                  </div>
                  {selectedTechnique.id === 'feedback-chaining' ? (
                    <FeedbackChainingDemo />
                  ) : selectedTechnique.id === 'hierarchical-chaining' ? (
                    <HierarchicalChainingDemo />
                  ) : selectedTechnique.id === 'iterative-refinement' ? (
                    <IterativeRefinementDemo />
                  ) : selectedTechnique.id === 'parallel-synthesis' ? (
                    <ParallelSynthesisDemo />
                  ) : selectedTechnique.id === 'dynamic-routing' ? (
                    <DynamicRoutingDemo />
                  ) : selectedTechnique.id === 'dynamic-context-assembly' ? (
                    <DynamicContextAssemblyDemo />
                  ) : selectedTechnique.id === 'message-queuing' ? (
                    <MessageQueuingDemo />
                  ) : selectedTechnique.id === 'latent-memory-networks' ? (
                    <LatentMemoryNetworksDemo />
                  ) : selectedTechnique.id === 'adaptive-context-depth' ? (
                    <AdaptiveContextDepthDemo />
                  ) : selectedTechnique.id === 'latent-knowledge-retrieval' ? (
                    <LatentKnowledgeRetrievalDemo />
                  ) : selectedTechnique.id === 'context-compression-advanced' ? (
                    <AdvancedContextCompressionDemo />
                  ) : selectedTechnique.id === 'multimodal-context-integration' ? (
                    <MultimodalContextIntegrationDemo />
                  ) : selectedTechnique.id === 'sliding-window' ? (
                    <SlidingWindowDemo />
                  ) : selectedTechnique.id === 'hierarchical-memory' ? (
                    <HierarchicalMemoryDemo />
                  ) : selectedTechnique.id === 'attention-mechanisms' ? (
                    <AttentionMechanismsDemo />
                  ) : selectedTechnique.id === 'memory-consolidation' ? (
                    <MemoryConsolidationDemo />
                  ) : selectedTechnique.id === 'working-memory-patterns' ? (
                    <WorkingMemoryPatternsDemo />
                  ) : selectedTechnique.id === 'contextual-unstructured-memory' ? (
                    <ContextualUnstructuredMemoryDemo />
                  ) : selectedTechnique.id === 'reinforcement-learning-from-human-feedback' ? (
                    <RLHFDemo />
                  ) : selectedTechnique.id === 'direct-preference-optimization' ? (
                    <DPODemo />
                  ) : selectedTechnique.id === 'in-context-learning' ? (
                    <ICLDemo />
                  ) : selectedTechnique.id === 'meta-learning' ? (
                    <MLSDemo />
                  ) : selectedTechnique.id === 'continual-learning' ? (
                    <CLDemo />
                  ) : selectedTechnique.id === 'self-improving-systems' ? (
                    <SISDemo />
                  ) : selectedTechnique.id === 'constitutional-ai' ? (
                    <CAIDemo />
                  ) : selectedTechnique.id === 'reinforcement-learning-from-ai-feedback' ? (
                    <RLAIFDemo />
                  ) : selectedTechnique.id === 'test-time-scaling' ? (
                    <TTSDemo />
                  ) : selectedTechnique.id === 'odds-ratio-preference-optimization' ? (
                    <ORPODemo />
                  ) : selectedTechnique.id === 'simple-preference-optimization' ? (
                    <SimPODemo />
                  ) : selectedTechnique.id === 'supervised-learning-adaptation' ? (
                    <SLADemo />
                  ) : selectedTechnique.id === 'unsupervised-learning-adaptation' ? (
                    <ULADemo />
                  ) : selectedTechnique.id === 'online-learning-adaptation' ? (
                    <OLADemo />
                  ) : selectedTechnique.id === 'llm-checkpoint-recovery' ? (
                    <LCRDemo />
                  ) : selectedTechnique.id === 'agent-context-preservation' ? (
                    <ACPDemo />
                  ) : selectedTechnique.id === 'predictive-agent-fault-tolerance' ? (
                    <PAFDemo />
                  ) : selectedTechnique.id === 'agent-communication-fault-tolerance' ? (
                    <ACFDemo />
                  ) : selectedTechnique.id === 'naive-rag' ? (
                    <NRAGDemo />
                  ) : selectedTechnique.id === 'advanced-rag' ? (
                    <ARAGDemo />
                  ) : selectedTechnique.id === 'modular-rag' ? (
                    <MRAGDemo />
                  ) : selectedTechnique.id === 'self-rag' ? (
                    <SRAGDemo />
                  ) : selectedTechnique.id === 'corrective-rag' ? (
                    <CRAGDemo />
                  ) : selectedTechnique.id === 'graph-rag' ? (
                    <GRAGDemo />
                  ) : selectedTechnique.id === 'multimodal-rag' ? (
                    <MMRAGDemo />
                  ) : selectedTechnique.id === 'agentic-rag-systems' ? (
                    <AgRAGDemo />
                  ) : selectedTechnique.id === 'cot' ? (
                    <CoTDemo />
                  ) : selectedTechnique.id === 'tot' ? (
                    <ToTDemo />
                  ) : selectedTechnique.id === 'least-to-most' ? (
                    <LtMDemo />
                  ) : selectedTechnique.id === 'analogical-reasoning' ? (
                    <ARDemo />
                  ) : selectedTechnique.id === 'causal-reasoning' ? (
                    <CRDemo />
                  ) : selectedTechnique.id === 'abductive-reasoning' ? (
                    <ABRDemo />
                  ) : selectedTechnique.id === 'step-back-prompting' ? (
                    <SBPDemo />
                  ) : selectedTechnique.id === 'buffer-of-thoughts' ? (
                    <BoTDemo />
                  ) : selectedTechnique.id === 'skeleton-of-thoughts' ? (
                    <SoTDemo />
                  ) : selectedTechnique.id === 'layered-defense-pattern' ? (
                    <LDPDemo />
                  ) : selectedTechnique.id === 'contextual-guardrailing-pattern' ? (
                    <CGPDemo />
                  ) : selectedTechnique.id === 'guard-agent-pattern' ? (
                    <GAPDemo />
                  ) : selectedTechnique.id === 'intrinsic-alignment-pattern' ? (
                    <IAPDemo />
                  ) : selectedTechnique.id === 'memory-poisoning-prevention' ? (
                    <MPPDemo />
                  ) : selectedTechnique.id === 'tool-misuse-prevention' ? (
                    <TMPDemo />
                  ) : selectedTechnique.id === 'privilege-compromise-mitigation' ? (
                    <PCMDemo />
                  ) : selectedTechnique.id === 'agrail-adaptive-pattern' ? (
                    <AAPDemo />
                  ) : selectedTechnique.id === 'maestro-multi-agent-security' ? (
                    <MASDemo />
                  ) : selectedTechnique.id === 'system-prompt-protection' ? (
                    <SPPDemo />
                  ) : selectedTechnique.id === 'differential-privacy-patterns' ? (
                    <DPPDemo />
                  ) : selectedTechnique.id === 'zero-trust-agent-architecture' ? (
                    <ZTAADemo />
                  ) : selectedTechnique.id === 'secure-multi-party-computation' ? (
                    <SMPCDemo />
                  ) : selectedTechnique.id === 'compliance-automation-patterns' ? (
                    <CAPDemo />
                  ) : selectedTechnique.id === 'threat-detection-response' ? (
                    <TDRDemo />
                  ) : selectedTechnique.id === 'identity-access-management' ? (
                    <IAMDemo />
                  ) : selectedTechnique.id === 'data-anonymization-patterns' ? (
                    <DAPDemo />
                  ) : selectedTechnique.id === 'confidential-computing-patterns' ? (
                    <CCPDemo />
                  ) : selectedTechnique.id === 'hybrid-secret-cache-management' ? (
                    <HSCMDemo />
                  ) : selectedTechnique.id === 'local-distant-agent-data-protection' ? (
                    <LDADPDemo />
                  ) : selectedTechnique.id === 'mlcommons-ai-safety' ? (
                    <AILuminateDemo />
                  ) : selectedTechnique.id === 'agentbench' ? (
                    <AgentBenchDemo />
                  ) : selectedTechnique.id === 'theagentcompany' ? (
                    <TheAgentCompanyDemo />
                  ) : selectedTechnique.id === 'mlr-bench' ? (
                    <MLRBenchDemo />
                  ) : selectedTechnique.id === 'twelve-factor-agent' ? (
                    <TwelveFactorAgentDemo />
                  ) : selectedTechnique.id === 'helm-agent-eval' ? (
                    <HelmAgentEvalDemo />
                  ) : selectedTechnique.id === 'hula-framework' ? (
                    <HulaFrameworkDemo />
                  ) : selectedTechnique.id === 'cyberseceval3' ? (
                    <CybersecEval3Demo />
                  ) : selectedTechnique.id === 'metr-re-bench' ? (
                    <MetrReBenchDemo />
                  ) : selectedTechnique.id === 'swe-bench-suite' ? (
                    <SweBenchSuiteDemo />
                  ) : selectedTechnique.id === 'gaia-benchmark' ? (
                    <GaiaBenchmarkDemo />
                  ) : selectedTechnique.id === 'mmau-benchmark' ? (
                    <MmauBenchmarkDemo />
                  ) : selectedTechnique.id === 'webarena-suite' ? (
                    <WebArenaSuiteDemo />
                  ) : selectedTechnique.id === 'eu-ai-act-framework' ? (
                    <EuAiActFrameworkDemo />
                  ) : selectedTechnique.id === 'aisi-evaluation-framework' ? (
                    <AISIEvaluationFrameworkDemo />
                  ) : selectedTechnique.id === 'maps-benchmark' ? (
                    <MapsBenchmarkDemo />
                  ) : selectedTechnique.id === 'constitutional-ai-evaluation' ? (
                    <ConstitutionalAiEvaluationDemo />
                  ) : selectedTechnique.id === 'context-processing-pipelines' ? (
                    <ContextProcessingPipelinesDemo />
                  ) : selectedTechnique.id === 'context-lifecycle-management' ? (
                    <ContextLifecycleManagementDemo />
                  ) : selectedTechnique.id === 'hierarchical-context-architecture' ? (
                    <HierarchicalContextArchitectureDemo />
                  ) : selectedTechnique.id === 'context-state-machines' ? (
                    <ContextStateMachinesDemo />
                  ) : selectedTechnique.id === 'context-streaming-protocols' ? (
                    <ContextStreamingProtocolsDemo />
                  ) : selectedTechnique.id === 'context-write-patterns' ? (
                    <ContextWritePatternsDemo />
                  ) : selectedTechnique.id === 'context-select-patterns' ? (
                    <ContextSelectPatternsDemo />
                  ) : selectedTechnique.id === 'context-compress-patterns' ? (
                    <ContextCompressPatternsDemo />
                  ) : selectedTechnique.id === 'context-isolate-patterns' ? (
                    <ContextIsolatePatternsDemo />
                  ) : selectedTechnique.id === 'sliding-window-management' ? (
                    <SlidingWindowManagementDemo />
                  ) : selectedTechnique.id === 'semantic-context-compression' ? (
                    <SemanticContextCompressionDemo />
                  ) : selectedTechnique.id === 'infini-attention-architecture' ? (
                    <InfiniAttentionArchitectureDemo />
                  ) : selectedTechnique.id === 'memory-block-architecture' ? (
                    <MemoryBlockArchitectureDemo />
                  ) : selectedTechnique.id === 'kv-cache-optimization' ? (
                    <KVCacheOptimizationDemo />
                  ) : selectedTechnique.id === 'context-engineering-frameworks' ? (
                    <ContextEngineeringFrameworksDemo />
                  ) : selectedTechnique.id === 'context-failure-prevention' ? (
                    <ContextFailurePreventionDemo />
                  ) : selectedTechnique.id === 'human-in-the-loop' ? (
                    <HumanInTheLoopDemo />
                  ) : selectedTechnique.id === 'human-on-the-loop' ? (
                    <HumanOnTheLoopDemo />
                  ) : selectedTechnique.id === 'progressive-disclosure-patterns' ? (
                    <ProgressiveDisclosurePatternsDemo />
                  ) : selectedTechnique.id === 'confidence-visualization-patterns' ? (
                    <ConfidenceVisualizationPatternsDemo />
                  ) : selectedTechnique.id === 'mixed-initiative-interface-patterns' ? (
                    <MixedInitiativeInterfacePatternsDemo />
                  ) : selectedTechnique.id === 'agent-status-activity-patterns' ? (
                    <AgentStatusActivityPatternsDemo />
                  ) : selectedTechnique.id === 'conversational-interface-patterns' ? (
                    <ConversationalInterfacePatternsDemo />
                  ) : selectedTechnique.id === 'agent-collaboration-ux' ? (
                    <AgentCollaborationUxDemo />
                  ) : selectedTechnique.id === 'trust-transparency-patterns' ? (
                    <TrustTransparencyPatternsDemo />
                  ) : selectedTechnique.id === 'adaptive-interface-patterns' ? (
                    <AdaptiveInterfacePatternsDemo />
                  ) : selectedTechnique.id === 'context-window-management-patterns' ? (
                    <ContextWindowManagementPatternsDemo />
                  ) : selectedTechnique.id === 'monitoring-control-patterns' ? (
                    <MonitoringControlPatternsDemo />
                  ) : selectedTechnique.id === 'error-handling-recovery-patterns' ? (
                    <ErrorHandlingRecoveryPatternsDemo />
                  ) : selectedTechnique.id === 'onboarding-education-patterns' ? (
                    <OnboardingEducationPatternsDemo />
                  ) : selectedTechnique.id === 'privacy-security-ux' ? (
                    <PrivacySecurityUxDemo />
                  ) : selectedTechnique.id === 'accessibility-agent-design' ? (
                    <AccessibilityAgentDesignDemo />
                  ) : selectedTechnique.id === 'ambient-agent-patterns' ? (
                    <AmbientAgentPatternsDemo />
                  ) : selectedTechnique.id === 'chat-interface-patterns' ? (
                    <ChatInterfacePatternsDemo />
                  ) : selectedTechnique.id === 'cross-platform-agent-ux' ? (
                    <CrossPlatformAgentUxDemo />
                  ) : selectedTechnique.id === 'visual-reasoning-patterns' ? (
                    <VisualReasoningPatternsDemo />
                  ) : selectedTechnique.id === 'multimodal-interaction-patterns' ? (
                    <MultimodalInteractionPatternsDemo />
                  ) : selectedTechnique.id === 'got' ? (
                    <GoTDemo />
                  ) : selectedTechnique.id === 'react' ? (
                    <ReActDemo />
                  ) : selectedTechnique.id === 'fot' ? (
                    <FoTDemo />
                  ) : selectedTechnique.id === 'metacognitive-monitoring' ? (
                    <MCMDemo />
                  ) : selectedTechnique.id === 'test-time-compute-scaling' ? (
                    <TTCDemo />
                  ) : selectedTechnique.id === 'test-time-compute' ? (
                    <TTCDemo />
                  ) : selectedTechnique.id === 'reflective-mcts' ? (
                    <RMCTSDemo />
                  ) : selectedTechnique.id === 'distributed-memory-architectures' ? (
                    <DistributedMemoryArchitecturesDemo />
                  ) : selectedTechnique.id === 'context-compression' ? (
                    <ContextCompressionDemo />
                  ) : selectedTechnique.id === 'content-based-routing' ? (
                    <ContentBasedRoutingDemo />
                  ) : selectedTechnique.id === 'capability-routing' ? (
                    <CapabilityRoutingDemo />
                  ) : selectedTechnique.id === 'load-balancing' ? (
                    <LoadBalancingDemo />
                  ) : selectedTechnique.id === 'geographic-routing' ? (
                    <GeographicRoutingDemo />
                  ) : selectedTechnique.id === 'map-reduce' ? (
                    <MapReduceDemo />
                  ) : selectedTechnique.id === 'scatter-gather' ? (
                    <ScatterGatherDemo />
                  ) : selectedTechnique.id === 'fork-join' ? (
                    <ForkJoinDemo />
                  ) : selectedTechnique.id === 'async-await' ? (
                    <AsyncAwaitDemo />
                  ) : selectedTechnique.id === 'self-critique' ? (
                    <SelfCritiqueDemo />
                  ) : selectedTechnique.id === 'producer-critic' ? (
                    <ProducerCriticDemo />
                  ) : selectedTechnique.id === 'llm-as-judge' ? (
                    <LLMAsJudgeDemo />
                  ) : selectedTechnique.id === 'reflexion-pattern' ? (
                    <ReflexionDemo />
                  ) : selectedTechnique.id === 'function-calling' ? (
                    <ToolUseDemo />
                  ) : selectedTechnique.id === 'code-execution' ? (
                    <CodeExecutionDemo />
                  ) : selectedTechnique.id === 'hierarchical-planning' ? (
                    <HierarchicalPlanningDemo />
                  ) : selectedTechnique.id === 'goal-decomposition' ? (
                    <GoalDecompositionDemo />
                  ) : selectedTechnique.id === 'constraint-satisfaction' ? (
                    <ConstraintSatisfactionDemo />
                  ) : selectedTechnique.id === 'scenario-planning' ? (
                    <ScenarioPlanningDemo />
                  ) : selectedTechnique.id === 'sequential-chaining' ? (
                    <SequentialChainingDemo />
                  ) : selectedTechnique.id === 'parallel-chaining' ? (
                    <ParallelChainingDemo />
                  ) : selectedTechnique.id === 'conditional-chaining' ? (
                    <ConditionalChainingDemo />
                  ) : selectedTechnique.id === 'llm-based-routing' ? (
                    <LLMBasedRoutingFlowVisualization />
                  ) : selectedTechnique.id === 'embedding-based-routing' ? (
                    <EmbeddingRoutingDemo />
                  ) : selectedTechnique.id === 'rule-based-routing' ? (
                    <RuleBasedRoutingDemo />
                  ) : selectedTechnique.id === 'machine-learning-model-based-routing' ? (
                    <MLModelRoutingDemo />
                  ) : selectedTechnique.id === 'producer-critic-pattern' ? (
                    <ProducerCriticDemo />
                  ) : selectedTechnique.id === 'meta-reasoning' ? (
                    <MetaReasoningDemo />
                  ) : selectedTechnique.id === 'hierarchical-task-network-planning' ? (
                    <HTNPlanningDemo />
                  ) : selectedTechnique.id === 'task-management-orchestration' ? (
                    <TaskManagementOrchestrationDemo />
                  ) : selectedTechnique.id === 'a2a-protocol' ? (
                    <A2AProtocolDemo />
                  ) : selectedTechnique.id === 'supervisor-worker-pattern' ? (
                    <SupervisorWorkerDemo />
                  ) : selectedTechnique.id === 'shared-scratchpad-collaboration' ? (
                    <SharedScratchpadDemo />
                  ) : selectedTechnique.id === 'sequential-pipeline-agents' ? (
                    <SequentialPipelineDemo />
                  ) : selectedTechnique.id === 'concurrent-orchestration' ? (
                    <ConcurrentOrchestrationDemo />
                  ) : selectedTechnique.id === 'handoff-orchestration' ? (
                    <HandoffOrchestrationDemo />
                  ) : selectedTechnique.id === 'peer-collaboration' ? (
                    <PeerCollaborationDemo />
                  ) : selectedTechnique.id === 'hierarchical-coordination' ? (
                    <HierarchicalCoordinationDemo />
                  ) : selectedTechnique.id === 'agent-communication-protocols' ? (
                    <AgentCommunicationProtocolsDemo />
                  ) : selectedTechnique.id === 'parametric-memory' ? (
                    <ParametricMemoryDemo />
                  ) : selectedTechnique.id === 'episodic-memory-systems' ? (
                    <EpisodicMemorySystemsDemo />
                  ) : selectedTechnique.id === 'semantic-memory-networks' ? (
                    <SemanticMemoryNetworksDemo />
                  ) : selectedTechnique.id === 'transactive-memory-systems' ? (
                    <TransactiveMemorySystemsDemo />
                  ) : selectedTechnique.id === 'memory-reading-writing-operations' ? (
                    <MemoryReadWriteOperationsDemo />
                  ) : selectedTechnique.id === 'contextual-structured-memory' ? (
                    <ContextualStructuredMemoryDemo />
                  ) : (
                    <div className="p-8 text-center">
                      <Play className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">Interactive Demo Coming Soon</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        We&apos;re working on an interactive hands-on demonstration for this technique. 
                        Check back soon or explore other techniques with available demos.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )
          ) : detailsTab === 'code' ? (
            !user ? (
              <div className="min-h-screen bg-gray-950 relative overflow-hidden">
                {/* Background gradient effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-blue-900/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
                  {/* Hero Section */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl shadow-2xl mb-8">
                      <Code className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
                      Code Playground
                    </h1>
                    
                    <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                      Access live code examples and interactive programming environments for AI design patterns
                    </p>

                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <Sparkles className="w-6 h-6 text-green-400" />
                        <span className="text-2xl font-semibold text-green-400">Sign in to access the code playground!</span>
                      </div>
                      <p className="text-gray-300 text-lg">
                        Create your free account to explore live code examples and interactive environments.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/auth/register')}
                        className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Code className="w-5 h-5" />
                        <span>Start Coding Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                      
                      <button
                        onClick={() => router.push('/auth/login')}
                        className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-xl border border-gray-700 transition-colors duration-200"
                      >
                        Already have an account? Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            <div className="space-y-6">
              {/* Language Selection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Code Playground
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  {(['typescript', 'python', 'rust'] as LanguageType[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`flex-1 sm:flex-none px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                        selectedLanguage === lang
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Code Sandbox */}
              {patternExamples[selectedTechnique.id as PatternId] ? (
                <CodeSandbox
                  patternId={selectedTechnique.id}
                  initialCode={patternExamples[selectedTechnique.id as PatternId][selectedLanguage]}
                  language={selectedLanguage}
                  onCodeChange={(code) => {
                    console.log('Code changed:', code);
                  }}
                />
              ) : (
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700/30 text-center">
                  <Code className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">Code examples coming soon for this pattern</p>
                </div>
              )}
            </div>
            )
          ) : detailsTab === 'deepdive' && selectedTechnique.id === 'eu-ai-act-framework' ? (
            <div className="space-y-8">
              {/* Deep Dive Content for EU AI Act */}
              {/* Risk Classification Deep Dive */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  Risk-Based Classification System
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-red-400 mb-3">🚫 Prohibited (Unacceptable Risk)</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>Social scoring systems</strong> by public authorities</li>
                      <li>• <strong>Manipulative AI</strong> exploiting psychological vulnerabilities</li>
                      <li>• <strong>Real-time biometric identification</strong> in public spaces (with exceptions)</li>
                      <li>• <strong>Biometric categorization</strong> inferring sensitive attributes</li>
                      <li>• <strong>Emotion recognition</strong> in workplaces and educational institutions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-orange-400 mb-3">⚠️ High-Risk AI Systems</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>Biometric identification</strong> and categorization</li>
                      <li>• <strong>Critical infrastructure</strong> management (transport, utilities)</li>
                      <li>• <strong>Educational/vocational training</strong> assessment systems</li>
                      <li>• <strong>Employment decisions</strong> (recruitment, promotion, termination)</li>
                      <li>• <strong>Essential services</strong> (creditworthiness, insurance, healthcare)</li>
                      <li>• <strong>Law enforcement</strong> (risk assessment, polygraph, crime analytics)</li>
                      <li>• <strong>Migration/asylum</strong> management systems</li>
                      <li>• <strong>Democratic processes</strong> (election management)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* GPAI Model Requirements Deep Dive */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  GPAI Models: 10²⁵ FLOPs Threshold Requirements
                </h3>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">11</div>
                      <div className="text-gray-400">Global providers exceed threshold</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">€10M+</div>
                      <div className="text-gray-400">Estimated training cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">2 weeks</div>
                      <div className="text-gray-400">Notification deadline</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Mandatory Obligations for Systemic Risk Models:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">Model evaluation with standardized protocols</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">Adversarial testing and red teaming</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">Systematic risk assessment and mitigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">Serious incident tracking and reporting</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">Cybersecurity protection measures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">Technical documentation maintenance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">Copyright material disclosure</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">EU Commission notification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Implementation Timeline Deep Dive */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                  Implementation Timeline & Enforcement
                </h3>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-green-400">August 1, 2024 - Act in Force</h4>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">✓ ACTIVE</span>
                      </div>
                      <p className="text-gray-300 text-sm">EU AI Act officially entered into force</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-green-400">February 2, 2025 - Prohibitions Active</h4>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">✓ ACTIVE</span>
                      </div>
                      <p className="text-gray-300 text-sm">Prohibitions and AI literacy obligations became enforceable</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-blue-400">August 2, 2025 - GPAI Rules</h4>
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">✓ CURRENT</span>
                      </div>
                      <p className="text-gray-300 text-sm">GPAI model obligations and governance rules became applicable</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-orange-400">August 2, 2026 - Full Enforcement</h4>
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">UPCOMING</span>
                      </div>
                      <p className="text-gray-300 text-sm">AI Office gains full enforcement powers and penalty authority</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-purple-400">August 2, 2027 - High-Risk Systems</h4>
                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">FUTURE</span>
                      </div>
                      <p className="text-gray-300 text-sm">High-risk AI systems must comply (extended transition period)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enforcement & Penalties Deep Dive */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                  Enforcement & Financial Penalties
                </h3>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">€35M</div>
                      <div className="text-gray-400">Maximum fine amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">7%</div>
                      <div className="text-gray-400">Global annual turnover</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">CE</div>
                      <div className="text-gray-400">Marking required</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Penalty Structure:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                        <span className="text-gray-300">Prohibited AI practices</span>
                        <span className="text-red-400 font-medium">€35M or 7% turnover</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                        <span className="text-gray-300">GPAI model non-compliance</span>
                        <span className="text-orange-400 font-medium">€15M or 3% turnover</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                        <span className="text-gray-300">Inaccurate/incomplete information</span>
                        <span className="text-yellow-400 font-medium">€7.5M or 1.5% turnover</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Global Impact Deep Dive */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Global Impact & International Alignment
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-purple-400 mb-3">International Coordination</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>US Executive Order</strong> alignment on dual-use foundation models</li>
                      <li>• <strong>UK AI regulation</strong> framework influence</li>
                      <li>• <strong>G7/G20 cooperation</strong> on AI governance</li>
                      <li>• <strong>OECD AI Principles</strong> integration</li>
                      <li>• <strong>ISO/IEC standards</strong> harmonization</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-blue-400 mb-3">Brussels Effect</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>Global compliance</strong> for EU market access</li>
                      <li>• <strong>De facto standard</strong> for AI regulation worldwide</li>
                      <li>• <strong>Supply chain impact</strong> on international AI providers</li>
                      <li>• <strong>Investment influence</strong> in AI development priorities</li>
                      <li>• <strong>Risk assessment</strong> becoming global best practice</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
