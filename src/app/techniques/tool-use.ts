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
    color: 'from-green-500 to-emerald-500',
    category: 'tool-use',
    description: 'Execute code dynamically to solve computational problems',
    features: [
      'Dynamic code generation',
      'Safe execution environments',
      'Multiple language support',
      'Result validation',
      'Error handling and debugging',
      'Resource management'
    ],
    useCases: ['data-analysis', 'mathematical-computation', 'automation', 'prototyping'],
    complexity: 'high',
    example: 'Data Analysis Request:\n\nUser: "Analyze sales data trends from CSV file"\n\nCode Execution Process:\n1. Generate Python code:\n   ```python\n   import pandas as pd\n   import matplotlib.pyplot as plt\n   \n   df = pd.read_csv("sales_data.csv")\n   monthly_sales = df.groupby("month").sum()\n   trend = monthly_sales["sales"].pct_change()\n   ```\n\n2. Execute in sandboxed environment\n3. Return analysis results and visualizations\n4. Provide insights based on computed trends\n\nResult: Automated data analysis with insights'
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
    abbr: 'MQ',
    icon: '📬',
    color: 'from-pink-500 to-red-500',
    category: 'tool-use',
    description: 'Asynchronous message passing system enabling decoupled communication between AI agents and services in distributed agentic systems',
    features: [
      'Asynchronous agent communication',
      'Message persistence and durability',
      'Priority-based task distribution',
      'Multi-agent coordination',
      'Fault tolerance and recovery',
      'Scalable load balancing',
      'Event-driven workflows',
      'Dead letter queue handling'
    ],
    useCases: ['multi-agent-systems', 'distributed-ai-processing', 'agent-coordination', 'workflow-orchestration', 'event-driven-ai', 'background-inference', 'task-delegation', 'system-integration'],
    complexity: 'high',
    example: 'Multi-Agent Research System:\n\n**Research Coordinator Agent** publishes:\n```json\n{\n  "queue": "research_tasks",\n  "message": {\n    "task_id": "research_789",\n    "type": "literature_review",\n    "topic": "quantum computing applications",\n    "priority": "high",\n    "deadline": "2024-01-15T10:00:00Z",\n    "requirements": {\n      "sources": ["arxiv", "ieee", "acm"],\n      "date_range": "2023-2024",\n      "max_papers": 50\n    },\n    "callback_queue": "research_results"\n  }\n}\n```\n\n**Specialist Agents** consume from different queues:\n- **ArXiv Agent**: Processes "arxiv_search" messages\n- **Analysis Agent**: Processes "paper_analysis" messages  \n- **Summary Agent**: Processes "content_synthesis" messages\n\n**Message Flow**:\n1. Coordinator → research_tasks → Specialist agents\n2. Specialists → analysis_tasks → Analysis agent\n3. Analysis agent → synthesis_tasks → Summary agent\n4. Summary agent → research_results → Coordinator\n\n**Result**: Coordinated multi-agent research with fault tolerance, parallel processing, and automatic retry mechanisms'
  }
];