import { Technique } from './types';

export const toolUseTechniques: Technique[] = [
  {
    id: 'function-calling',
    name: 'Function Calling',
    abbr: '',
    icon: '📞',
    color: 'from-purple-500 to-pink-500',
    category: 'tool-use',
    description: 'Structured interface for AI to invoke external functions and APIs',
    features: [
      'Schema-based function definitions',
      'Parameter validation',
      'Return value handling',
      'Error management'
    ],
    useCases: ['api-integration', 'system-automation', 'data-processing', 'external-services'],
    complexity: 'medium',
    example: 'Function Definition:\n{\n  "name": "get_weather",\n  "description": "Get current weather",\n  "parameters": {\n    "location": "string",\n    "units": "celsius|fahrenheit"\n  }\n}\n\nAI Call:\nget_weather(location="New York", units="celsius")\n\nResponse: {"temp": 22, "condition": "sunny"}'
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    abbr: '',
    icon: '🔌',
    color: 'from-pink-500 to-red-500',
    category: 'tool-use',
    description: 'Seamless integration with external APIs and web services',
    features: [
      'REST and GraphQL support',
      'Authentication handling',
      'Rate limiting management',
      'Response parsing'
    ],
    useCases: ['web-services', 'data-retrieval', 'third-party-integration', 'microservices'],
    complexity: 'high',
    example: 'API Integration Flow:\n\n1. Authentication: OAuth token refresh\n2. Request: GET /api/v1/users/profile\n3. Headers: Authorization, Content-Type\n4. Rate Limit: 100 req/min, current: 23\n5. Response: Parse JSON, extract data\n6. Error Handling: Retry on 429, fail on 4xx\n\nResult: User profile data available for AI processing'
  },
  {
    id: 'code-execution',
    name: 'Code Execution',
    abbr: '',
    icon: '💻',
    color: 'from-red-500 to-orange-500',
    category: 'tool-use',
    description: 'Secure execution of generated code in sandboxed environments',
    features: [
      'Multi-language support',
      'Sandboxed execution',
      'Resource limiting',
      'Output capture'
    ],
    useCases: ['data-analysis', 'calculations', 'automation', 'validation'],
    complexity: 'high',
    example: 'Code Generation and Execution:\n\nGenerated Python Code:\n```python\nimport pandas as pd\ndata = [1, 2, 3, 4, 5]\nmean = sum(data) / len(data)\nprint(f"Mean: {mean}")\n```\n\nExecution Environment:\n• Language: Python 3.9\n• Timeout: 30 seconds\n• Memory limit: 512MB\n• Output: "Mean: 3.0"'
  },
  {
    id: 'plugin-architecture',
    name: 'Plugin Architecture',
    abbr: '',
    icon: '🧩',
    color: 'from-orange-500 to-yellow-500',
    category: 'tool-use',
    description: 'Extensible plugin system for adding new tools and capabilities',
    features: [
      'Dynamic plugin loading',
      'Standardized interfaces',
      'Capability discovery',
      'Version management'
    ],
    useCases: ['extensibility', 'third-party-tools', 'custom-integration', 'marketplace'],
    complexity: 'high',
    example: 'Plugin Registration:\n\n```javascript\nclass WeatherPlugin {\n  name = "weather-tool"\n  version = "1.2.0"\n  capabilities = ["current-weather", "forecast"]\n  \n  async execute(command, params) {\n    // Plugin implementation\n  }\n}\n\npluginManager.register(new WeatherPlugin())\n```\n\nUsage: AI can discover and use weather capabilities'
  },
  {
    id: 'model-context-protocol',
    name: 'Model Context Protocol',
    abbr: 'MCP',
    icon: '🔌',
    color: 'from-indigo-500 to-purple-500',
    category: 'tool-use',
    description: 'Standardized protocol for sharing context and capabilities between AI models and tools',
    features: [
      'Standardized context sharing',
      'Tool capability discovery',
      'Cross-model interoperability',
      'Session state management'
    ],
    useCases: ['multi-model-systems', 'tool-integration', 'context-handoffs', 'agent-coordination'],
    complexity: 'high',
    example: 'MCP Context Sharing:\n\n```json\n{\n  "protocol": "mcp/1.0",\n  "context": {\n    "session_id": "sess_123",\n    "conversation_history": [...],\n    "user_preferences": {...},\n    "active_tools": ["web_search", "calculator"]\n  },\n  "capabilities": {\n    "tools": [\n      {\n        "name": "web_search",\n        "schema": {...},\n        "version": "1.2.0"\n      }\n    ]\n  }\n}\n```\n\nEnables seamless handoffs between different AI models'
  },
  {
    id: 'json-schema',
    name: 'JSON Schema',
    abbr: '',
    icon: '📋',
    color: 'from-green-500 to-blue-500',
    category: 'tool-use',
    description: 'Structured data format specification for consistent tool interfaces',
    features: [
      'Schema validation',
      'Type safety',
      'Documentation generation',
      'API contract definition'
    ],
    useCases: ['api-design', 'data-validation', 'tool-interfaces', 'configuration'],
    complexity: 'medium',
    example: 'Tool Interface Schema:\n\n```json\n{\n  "type": "object",\n  "properties": {\n    "function": {\n      "type": "string",\n      "enum": ["search", "analyze", "summarize"]\n    },\n    "parameters": {\n      "type": "object",\n      "properties": {\n        "query": {"type": "string"},\n        "limit": {"type": "integer", "minimum": 1}\n      },\n      "required": ["query"]\n    }\n  }\n}\n```'
  },
  {
    id: 'grpc-protocols',
    name: 'gRPC Protocols',
    abbr: '',
    icon: '🔄',
    color: 'from-blue-500 to-purple-500',
    category: 'tool-use',
    description: 'High-performance RPC framework for inter-service communication',
    features: [
      'Protocol Buffers serialization',
      'Bidirectional streaming',
      'Code generation',
      'Load balancing'
    ],
    useCases: ['microservices', 'real-time-communication', 'distributed-systems', 'high-performance'],
    complexity: 'high',
    example: 'Agent Communication Service:\n\n```protobuf\nservice AgentComm {\n  rpc SendMessage(MessageRequest) returns (MessageResponse);\n  rpc StreamUpdates(stream UpdateRequest) returns (stream UpdateResponse);\n}\n\nmessage MessageRequest {\n  string agent_id = 1;\n  string content = 2;\n  MessageType type = 3;\n}\n```'
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    abbr: '',
    icon: '🌐',
    color: 'from-purple-500 to-pink-500',
    category: 'tool-use',
    description: 'RESTful web service interfaces for standardized HTTP communication',
    features: [
      'HTTP standard methods',
      'Stateless communication',
      'Resource-based URLs',
      'JSON/XML payloads'
    ],
    useCases: ['web-services', 'third-party-integration', 'mobile-apps', 'browser-based'],
    complexity: 'medium',
    example: 'AI Tool REST API:\n\nPOST /api/v1/tools/execute\n```json\n{\n  "tool": "web_search",\n  "parameters": {\n    "query": "latest AI research",\n    "max_results": 10\n  },\n  "context_id": "session_123"\n}\n```\n\nResponse: Tool execution results with metadata'
  },
  {
    id: 'message-queuing',
    name: 'Message Queuing',
    abbr: '',
    icon: '📬',
    color: 'from-pink-500 to-red-500',
    category: 'tool-use',
    description: 'Asynchronous message passing for decoupled system communication',
    features: [
      'Asynchronous processing',
      'Message persistence',
      'Load distribution',
      'Fault tolerance'
    ],
    useCases: ['background-processing', 'event-driven-architecture', 'workflow-orchestration', 'scalability'],
    complexity: 'high',
    example: 'AI Agent Task Queue:\n\nPublisher: Web Interface\nQueue: "ai_tasks"\nMessage: {\n  "task_id": "task_456",\n  "type": "document_analysis",\n  "payload": {"document_url": "..."},\n  "priority": "high"\n}\n\nConsumer: AI Processing Agent\nProcesses tasks asynchronously and publishes results'
  }
];