import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agentCommunicationProtocolsPattern: PatternScenario = {
  id: 'agent-communication-protocols',
  title: 'Agent Communication Protocols',
  description: 'Standardized communication frameworks using FIPA-ACL, KQML, and other protocols to enable structured, secure, and reliable message exchange between distributed agents.',
  initialNodes: [
    {
      id: 'communication-task',
      position: { x: 400, y: 50 },
      data: { label: '🎯 Communication Task\n"Coordinate multi-agent data processing pipeline"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Protocol Layer
    {
      id: 'protocol-stack',
      position: { x: 375, y: 150 },
      data: { label: '📚 Protocol Stack\nACL / FIPA / KQML' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 200 },
    },
    // Communication Agents
    {
      id: 'sender-agent',
      position: { x: 100, y: 250 },
      data: { label: '📤 Sender Agent\nData Producer\nProtocol: FIPA-ACL' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'receiver-agent',
      position: { x: 650, y: 250 },
      data: { label: '📥 Receiver Agent\nData Consumer\nProtocol: FIPA-ACL' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 160 },
    },
    {
      id: 'broker-agent',
      position: { x: 375, y: 250 },
      data: { label: '🔄 Broker Agent\nMessage Router\nProtocol: KQML' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 160 },
    },
    // Message Types
    {
      id: 'performative-types',
      position: { x: 100, y: 380 },
      data: { label: '💬 Performatives\n• INFORM\n• REQUEST\n• QUERY\n• PROPOSE\n• ACCEPT' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'message-structure',
      position: { x: 250, y: 380 },
      data: { label: '📋 Message Structure\n• Sender ID\n• Receiver ID\n• Content\n• Ontology\n• Protocol' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'content-language',
      position: { x: 400, y: 380 },
      data: { label: '🗣️ Content Language\n• JSON-LD\n• RDF\n• SL (Semantic)\n• XML' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'conversation-id',
      position: { x: 550, y: 380 },
      data: { label: '🔖 Conversation\n• ID: conv-2024-01\n• Thread tracking\n• Reply-to chains' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'ontology-ref',
      position: { x: 700, y: 380 },
      data: { label: '📖 Ontology\n• Domain vocab\n• Shared semantics\n• Term definitions' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    // Protocol Patterns
    {
      id: 'request-response',
      position: { x: 50, y: 520 },
      data: { label: '↔️ Request-Response\nSynchronous exchange' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'publish-subscribe',
      position: { x: 220, y: 520 },
      data: { label: '📢 Publish-Subscribe\nEvent broadcasting' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'contract-net',
      position: { x: 390, y: 520 },
      data: { label: '📜 Contract Net\nTask bidding protocol' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'auction-protocol',
      position: { x: 560, y: 520 },
      data: { label: '🏆 Auction Protocol\nCompetitive bidding' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    {
      id: 'negotiation-protocol',
      position: { x: 730, y: 520 },
      data: { label: '🤝 Negotiation\nIterative agreement' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 160 },
    },
    // Message Flow Control
    {
      id: 'message-queue',
      position: { x: 150, y: 640 },
      data: { label: '📬 Message Queue\nFIFO processing\nBuffer: 1000 msgs' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'flow-controller',
      position: { x: 320, y: 640 },
      data: { label: '🎛️ Flow Controller\nRate limiting\nPriority routing' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'ack-handler',
      position: { x: 490, y: 640 },
      data: { label: '✅ ACK Handler\nDelivery confirmation\nRetry logic' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    {
      id: 'timeout-manager',
      position: { x: 660, y: 640 },
      data: { label: '⏱️ Timeout Manager\nResponse deadlines\nFailure detection' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 },
    },
    // Security & Validation
    {
      id: 'authentication',
      position: { x: 100, y: 760 },
      data: { label: '🔐 Authentication\nAgent identity\nDigital signatures' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'encryption',
      position: { x: 270, y: 760 },
      data: { label: '🔒 Encryption\nTLS/SSL\nEnd-to-end security' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'schema-validator',
      position: { x: 440, y: 760 },
      data: { label: '📏 Schema Validator\nMessage format\nOntology compliance' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    {
      id: 'audit-log',
      position: { x: 610, y: 760 },
      data: { label: '📝 Audit Log\nCommunication trace\nCompliance record' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 160 },
    },
    // Transport Layer
    {
      id: 'http-transport',
      position: { x: 150, y: 880 },
      data: { label: '🌐 HTTP/REST\nWeb-based' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'websocket-transport',
      position: { x: 290, y: 880 },
      data: { label: '🔌 WebSocket\nReal-time' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'mqtt-transport',
      position: { x: 430, y: 880 },
      data: { label: '📡 MQTT\nIoT messaging' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'grpc-transport',
      position: { x: 570, y: 880 },
      data: { label: '⚡ gRPC\nHigh performance' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 140 },
    },
    {
      id: 'successful-comm',
      position: { x: 400, y: 1000 },
      data: { label: '✨ Successful Communication\nPipeline coordinated with guaranteed delivery' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 350 },
    },
  ],
  initialEdges: [
    // Task to protocol stack
    {
      id: 'task-protocol',
      source: 'communication-task',
      target: 'protocol-stack',
      style: { ...edgeStyle, stroke: '#dc2626', strokeWidth: 3 },
      animated: true,
    },
    // Protocol to agents
    {
      id: 'protocol-sender',
      source: 'protocol-stack',
      target: 'sender-agent',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Initialize',
    },
    {
      id: 'protocol-broker',
      source: 'protocol-stack',
      target: 'broker-agent',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Configure',
    },
    {
      id: 'protocol-receiver',
      source: 'protocol-stack',
      target: 'receiver-agent',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Initialize',
    },
    // Message flow
    {
      id: 'sender-broker',
      source: 'sender-agent',
      target: 'broker-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'INFORM',
    },
    {
      id: 'broker-receiver',
      source: 'broker-agent',
      target: 'receiver-agent',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 3 },
      animated: true,
      label: 'FORWARD',
    },
    {
      id: 'receiver-broker-ack',
      source: 'receiver-agent',
      target: 'broker-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'ACK',
    },
    {
      id: 'broker-sender-ack',
      source: 'broker-agent',
      target: 'sender-agent',
      style: { ...edgeStyle, stroke: '#22c55e', strokeDasharray: '5 5' },
      label: 'CONFIRM',
    },
    // Message components
    {
      id: 'sender-performative',
      source: 'sender-agent',
      target: 'performative-types',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'sender-structure',
      source: 'sender-agent',
      target: 'message-structure',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'broker-language',
      source: 'broker-agent',
      target: 'content-language',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'broker-conversation',
      source: 'broker-agent',
      target: 'conversation-id',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    {
      id: 'receiver-ontology',
      source: 'receiver-agent',
      target: 'ontology-ref',
      style: { ...edgeStyle, stroke: '#f59e0b' },
    },
    // Protocol patterns
    {
      id: 'performative-request',
      source: 'performative-types',
      target: 'request-response',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'structure-publish',
      source: 'message-structure',
      target: 'publish-subscribe',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'language-contract',
      source: 'content-language',
      target: 'contract-net',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'conversation-auction',
      source: 'conversation-id',
      target: 'auction-protocol',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'ontology-negotiation',
      source: 'ontology-ref',
      target: 'negotiation-protocol',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    // Flow control
    {
      id: 'request-queue',
      source: 'request-response',
      target: 'message-queue',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'publish-flow',
      source: 'publish-subscribe',
      target: 'flow-controller',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'contract-ack',
      source: 'contract-net',
      target: 'ack-handler',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    {
      id: 'auction-timeout',
      source: 'auction-protocol',
      target: 'timeout-manager',
      style: { ...edgeStyle, stroke: '#ef4444' },
    },
    // Security
    {
      id: 'queue-auth',
      source: 'message-queue',
      target: 'authentication',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'flow-encrypt',
      source: 'flow-controller',
      target: 'encryption',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'ack-validate',
      source: 'ack-handler',
      target: 'schema-validator',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    {
      id: 'timeout-audit',
      source: 'timeout-manager',
      target: 'audit-log',
      style: { ...edgeStyle, stroke: '#6366f1' },
    },
    // Transport
    {
      id: 'auth-http',
      source: 'authentication',
      target: 'http-transport',
      style: { ...edgeStyle, stroke: '#22c55e' },
    },
    {
      id: 'encrypt-websocket',
      source: 'encryption',
      target: 'websocket-transport',
      style: { ...edgeStyle, stroke: '#22c55e' },
    },
    {
      id: 'validate-mqtt',
      source: 'schema-validator',
      target: 'mqtt-transport',
      style: { ...edgeStyle, stroke: '#22c55e' },
    },
    {
      id: 'audit-grpc',
      source: 'audit-log',
      target: 'grpc-transport',
      style: { ...edgeStyle, stroke: '#22c55e' },
    },
    // Final success
    {
      id: 'http-success',
      source: 'http-transport',
      target: 'successful-comm',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'websocket-success',
      source: 'websocket-transport',
      target: 'successful-comm',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'mqtt-success',
      source: 'mqtt-transport',
      target: 'successful-comm',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
    {
      id: 'grpc-success',
      source: 'grpc-transport',
      target: 'successful-comm',
      style: { ...edgeStyle, stroke: '#10b981' },
    },
  ],
  steps: [
    {
      title: 'Communication Initialization',
      description: 'Set up protocol stack and initialize agents',
      activeNodes: ['communication-task', 'protocol-stack'],
      activeEdges: ['task-protocol'],
    },
    {
      title: 'Agent Configuration',
      description: 'Configure agents with appropriate protocols',
      activeNodes: ['protocol-stack', 'sender-agent', 'broker-agent', 'receiver-agent'],
      activeEdges: ['protocol-sender', 'protocol-broker', 'protocol-receiver'],
    },
    {
      title: 'Message Construction',
      description: 'Build message with performatives and structure',
      activeNodes: ['sender-agent', 'performative-types', 'message-structure', 'content-language', 'conversation-id', 'ontology-ref'],
      activeEdges: ['sender-performative', 'sender-structure', 'broker-language', 'broker-conversation', 'receiver-ontology'],
    },
    {
      title: 'Message Transmission',
      description: 'Send message through broker to receiver',
      activeNodes: ['sender-agent', 'broker-agent', 'receiver-agent'],
      activeEdges: ['sender-broker', 'broker-receiver'],
    },
    {
      title: 'Acknowledgment Flow',
      description: 'Confirm message delivery with ACK',
      activeNodes: ['receiver-agent', 'broker-agent', 'sender-agent'],
      activeEdges: ['receiver-broker-ack', 'broker-sender-ack'],
    },
    {
      title: 'Protocol Patterns',
      description: 'Apply communication patterns based on use case',
      activeNodes: ['request-response', 'publish-subscribe', 'contract-net', 'auction-protocol', 'negotiation-protocol'],
      activeEdges: ['performative-request', 'structure-publish', 'language-contract', 'conversation-auction', 'ontology-negotiation'],
    },
    {
      title: 'Flow Control',
      description: 'Manage message flow and delivery',
      activeNodes: ['message-queue', 'flow-controller', 'ack-handler', 'timeout-manager'],
      activeEdges: ['request-queue', 'publish-flow', 'contract-ack', 'auction-timeout'],
    },
    {
      title: 'Security Layer',
      description: 'Apply authentication, encryption, and validation',
      activeNodes: ['authentication', 'encryption', 'schema-validator', 'audit-log'],
      activeEdges: ['queue-auth', 'flow-encrypt', 'ack-validate', 'timeout-audit'],
    },
    {
      title: 'Transport Selection',
      description: 'Choose appropriate transport protocol',
      activeNodes: ['http-transport', 'websocket-transport', 'mqtt-transport', 'grpc-transport'],
      activeEdges: ['auth-http', 'encrypt-websocket', 'validate-mqtt', 'audit-grpc'],
    },
    {
      title: 'Successful Communication',
      description: 'Complete pipeline coordination with guaranteed delivery',
      activeNodes: ['successful-comm', 'http-transport', 'websocket-transport', 'mqtt-transport', 'grpc-transport'],
      activeEdges: ['http-success', 'websocket-success', 'mqtt-success', 'grpc-success'],
    },
  ],
};