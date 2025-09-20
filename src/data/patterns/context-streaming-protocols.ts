import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextStreamingProtocolsPattern: PatternScenario = {
  id: 'context-streaming-protocols',
  title: 'Context Streaming Protocols Pattern',
  description: 'Real-time communication protocols enabling token-by-token LLM output streaming, agent event propagation, and bidirectional context updates through SSE, WebSockets, and callback handlers',
  initialNodes: [
    // Real-time streaming challenge
    {
      id: 'streaming-challenge',
      position: { x: 400, y: 50 },
      data: { label: '⚡ Real-Time Streaming Challenge\n"How to deliver LLM responses\ntoken-by-token with minimal latency\nwhile tracking agent events?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Streaming protocols framework
    {
      id: 'streaming-protocols-framework',
      position: { x: 400, y: 200 },
      data: { label: '📡 Streaming Protocols Framework\n"Multi-protocol architecture:\n• Server-Sent Events (SSE)\n• WebSocket connections\n• HTTP streaming fallbacks"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Server-Sent Events
    {
      id: 'server-sent-events',
      position: { x: 200, y: 350 },
      data: { label: '📨 Server-Sent Events (SSE)\n"Unidirectional streaming:\n• HTTP-based protocol\n• Auto-reconnection\n• UTF-8 text streams\n• Event ID tracking"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 240 },
    },

    // SSE implementation details
    {
      id: 'sse-implementation',
      position: { x: 50, y: 500 },
      data: { label: '🔧 SSE Implementation\n"Token delivery:\n• text/event-stream\n• Chunked encoding\n• Event namespacing\n• Heartbeat signals"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // WebSocket protocol
    {
      id: 'websocket-protocol',
      position: { x: 600, y: 350 },
      data: { label: '🔌 WebSocket Protocol\n"Bidirectional streaming:\n• Full-duplex channel\n• Binary/text frames\n• Low latency\n• Stateful connections"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 230 },
    },

    // WebSocket features
    {
      id: 'websocket-features',
      position: { x: 750, y: 500 },
      data: { label: '⚡ WebSocket Features\n"Advanced capabilities:\n• Agent state sync\n• Tool invocations\n• Context updates\n• Event propagation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Token streaming layer
    {
      id: 'token-streaming-layer',
      position: { x: 400, y: 650 },
      data: { label: '🔤 Token Streaming Layer\n"Incremental delivery:\n• Token batching\n• Stream buffering\n• Backpressure handling\n• Partial JSON streaming"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Callback handlers
    {
      id: 'callback-handlers',
      position: { x: 200, y: 800 },
      data: { label: '📞 Callback Handlers\n"Event processing:\n• on_llm_new_token\n• on_agent_action\n• on_tool_start/end\n• on_chain_stream"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Event streaming API
    {
      id: 'event-streaming-api',
      position: { x: 600, y: 800 },
      data: { label: '🎯 Event Streaming API\n"astream_events:\n• Intermediate outputs\n• Custom events\n• Agent steps\n• Error propagation"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 210 },
    },

    // Protocol selection logic
    {
      id: 'protocol-selection',
      position: { x: 200, y: 950 },
      data: { label: '🎛️ Protocol Selection\n"Adaptive routing:\n• SSE for LLM streaming\n• WebSocket for agents\n• HTTP for fallback\n• gRPC for microservices"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 240 },
    },

    // Performance optimization
    {
      id: 'performance-optimization',
      position: { x: 600, y: 950 },
      data: { label: '🚀 Performance Metrics\n"Streaming benefits:\n• 10x faster first token\n• 50% reduced latency\n• Real-time feedback\n• Progressive rendering"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Core streaming principle
    {
      id: 'streaming-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Context Streaming Principle\n"Real-time protocols transform LLM interactions from batch to stream\nToken-by-token delivery enables responsive user experiences\nEvent-driven architecture supports complex agent orchestration"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'streaming-challenge',
      target: 'streaming-protocols-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements protocols
    {
      id: 'e2',
      source: 'streaming-protocols-framework',
      target: 'server-sent-events',
      ...edgeStyle,
      label: 'implements SSE'
    },
    {
      id: 'e3',
      source: 'streaming-protocols-framework',
      target: 'websocket-protocol',
      ...edgeStyle,
      label: 'implements WS'
    },

    // Protocol implementation details
    {
      id: 'e4',
      source: 'server-sent-events',
      target: 'sse-implementation',
      ...edgeStyle,
      label: 'configures'
    },
    {
      id: 'e5',
      source: 'websocket-protocol',
      target: 'websocket-features',
      ...edgeStyle,
      label: 'enables'
    },

    // Both feed token streaming
    {
      id: 'e6',
      source: 'sse-implementation',
      target: 'token-streaming-layer',
      ...edgeStyle,
      label: 'streams to'
    },
    {
      id: 'e7',
      source: 'websocket-features',
      target: 'token-streaming-layer',
      ...edgeStyle,
      label: 'feeds'
    },

    // Token layer connects to handlers
    {
      id: 'e8',
      source: 'token-streaming-layer',
      target: 'callback-handlers',
      ...edgeStyle,
      label: 'triggers'
    },
    {
      id: 'e9',
      source: 'token-streaming-layer',
      target: 'event-streaming-api',
      ...edgeStyle,
      label: 'publishes to'
    },

    // Handlers influence selection
    {
      id: 'e10',
      source: 'callback-handlers',
      target: 'protocol-selection',
      ...edgeStyle,
      label: 'informs'
    },
    {
      id: 'e11',
      source: 'event-streaming-api',
      target: 'performance-optimization',
      ...edgeStyle,
      label: 'optimizes'
    },

    // Selection feeds back to protocols
    {
      id: 'e12',
      source: 'protocol-selection',
      target: 'streaming-protocols-framework',
      ...edgeStyle,
      label: 'adapts',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Performance validates principle
    {
      id: 'e13',
      source: 'performance-optimization',
      target: 'streaming-principle',
      ...edgeStyle,
      label: 'validates'
    },
    {
      id: 'e14',
      source: 'protocol-selection',
      target: 'streaming-principle',
      ...edgeStyle,
      label: 'demonstrates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Real-Time Streaming Challenge",
      description: "How can we deliver LLM responses token-by-token with minimal latency while tracking agent events, tool invocations, and intermediate steps in complex workflows?",
      activeNodes: ['streaming-challenge'],
      activeEdges: []
    },
    {
      title: "Streaming Protocols Framework",
      description: "Multi-protocol architecture addresses challenge through Server-Sent Events for unidirectional streaming, WebSockets for bidirectional communication, and HTTP streaming fallbacks.",
      activeNodes: ['streaming-protocols-framework'],
      activeEdges: ['e1']
    },
    {
      title: "SSE and WebSocket Implementation",
      description: "SSE provides lightweight HTTP-based streaming with auto-reconnection and event tracking, while WebSockets enable full-duplex channels for agent state sync and real-time context updates.",
      activeNodes: ['server-sent-events', 'sse-implementation', 'websocket-protocol', 'websocket-features'],
      activeEdges: ['e2', 'e3', 'e4', 'e5']
    },
    {
      title: "Token Streaming and Event Processing",
      description: "Token streaming layer handles incremental delivery with batching, buffering, and backpressure management, supporting partial JSON streaming for complex structured outputs.",
      activeNodes: ['token-streaming-layer'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Callback Handlers and Event APIs",
      description: "Callback system processes on_llm_new_token, agent actions, and tool events while astream_events API provides access to intermediate outputs, custom events, and error propagation.",
      activeNodes: ['callback-handlers', 'event-streaming-api'],
      activeEdges: ['e8', 'e9']
    },
    {
      title: "Adaptive Protocol Selection and Performance",
      description: "System adaptively routes SSE for LLM streaming and WebSockets for agent interactions, achieving 10x faster first token, 50% latency reduction, proving real-time protocols transform batch to stream processing.",
      activeNodes: ['protocol-selection', 'performance-optimization', 'streaming-principle'],
      activeEdges: ['e10', 'e11', 'e12', 'e13', 'e14']
    }
  ]
};