import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const modelContextProtocolPattern: PatternScenario = {
  id: 'model-context-protocol',
  title: 'Model Context Protocol (MCP) Pattern',
  description: 'Demonstrates standardized protocol for sharing context and capabilities between AI models and external tools/systems',
  initialNodes: [
    {
      id: 'user-request',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'User Request\n"Search for Python tutorials and create a study plan"' },
      style: { ...nodeStyle, minWidth: 350 }
    },
    // MCP Client (LLM Host)
    {
      id: 'mcp-client',
      type: 'default',
      position: { x: 375, y: 160 },
      data: { label: '🤖 MCP Client\n(Claude/GPT Host Application)' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 300 }
    },
    {
      id: 'protocol-layer',
      type: 'default',
      position: { x: 375, y: 280 },
      data: { label: '🔌 MCP Protocol Layer\nJSON-RPC over stdio/SSE' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 300 }
    },
    // MCP Servers (Tools/Resources)
    {
      id: 'web-search-server',
      type: 'default',
      position: { x: 50, y: 400 },
      data: { label: '🔍 Web Search Server\nGoogle/Bing API\nMCP Server' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 }
    },
    {
      id: 'database-server',
      type: 'default',
      position: { x: 250, y: 400 },
      data: { label: '🗄️ Database Server\nPostgreSQL\nMCP Server' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 }
    },
    {
      id: 'file-system-server',
      type: 'default',
      position: { x: 450, y: 400 },
      data: { label: '📁 File System Server\nLocal Files\nMCP Server' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 }
    },
    {
      id: 'github-server',
      type: 'default',
      position: { x: 650, y: 400 },
      data: { label: '🐙 GitHub Server\nRepositories\nMCP Server' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 }
    },
    // Context & Capabilities
    {
      id: 'context-state',
      type: 'default',
      position: { x: 50, y: 160 },
      data: { label: '📋 Context State\n• Session ID: sess_789\n• History: 5 messages\n• User prefs: Python, beginner\n• Active tools: 4' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200, fontSize: 11 }
    },
    {
      id: 'capabilities-registry',
      type: 'default',
      position: { x: 700, y: 160 },
      data: { label: '🛠️ Capabilities Registry\n• search(): Web search\n• query(): SQL queries\n• read(): File access\n• clone(): Git operations' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200, fontSize: 11 }
    },
    // Tool Discovery & Execution
    {
      id: 'tool-discovery',
      type: 'default',
      position: { x: 150, y: 520 },
      data: { label: '🔎 Tool Discovery\ntools/list → Available tools\ntools/call → Execute' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    {
      id: 'resource-access',
      type: 'default',
      position: { x: 375, y: 520 },
      data: { label: '📚 Resource Access\nresources/list → Available\nresources/read → Content' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    {
      id: 'prompt-enhancement',
      type: 'default',
      position: { x: 600, y: 520 },
      data: { label: '✨ Prompt Enhancement\nprompts/list → Templates\nprompts/get → Retrieve' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    // Execution Flow
    {
      id: 'execution-plan',
      type: 'default',
      position: { x: 375, y: 640 },
      data: { label: '📝 Execution Plan\n1. Search for tutorials\n2. Save to database\n3. Generate study plan\n4. Write to file' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 250 }
    },
    {
      id: 'response-aggregation',
      type: 'default',
      position: { x: 375, y: 760 },
      data: { label: '🔄 Response Aggregation\nCombining results from multiple servers' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 280 }
    },
    {
      id: 'final-output',
      type: 'default',
      position: { x: 375, y: 880 },
      data: { label: '✅ Final Output\nStudy plan created with 10 tutorials\nSaved to database and file' },
      style: { ...nodeStyle, background: '#059669', minWidth: 300 }
    },
    // Protocol Messages
    {
      id: 'protocol-messages',
      type: 'default',
      position: { x: 850, y: 280 },
      data: { label: '📨 Protocol Messages\n• initialize\n• tools/list\n• tools/call\n• resources/read\n• completion/create' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    }
  ],
  initialEdges: [
    {
      id: 'e-user-client',
      source: 'user-request',
      target: 'mcp-client',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-client-protocol',
      source: 'mcp-client',
      target: 'protocol-layer',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      animated: true
    },
    {
      id: 'e-client-context',
      source: 'mcp-client',
      target: 'context-state',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-client-capabilities',
      source: 'mcp-client',
      target: 'capabilities-registry',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '5,5' }
    },
    {
      id: 'e-protocol-messages',
      source: 'protocol-layer',
      target: 'protocol-messages',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    // Protocol to servers
    {
      id: 'e-protocol-web',
      source: 'protocol-layer',
      target: 'web-search-server',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'JSON-RPC'
    },
    {
      id: 'e-protocol-db',
      source: 'protocol-layer',
      target: 'database-server',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'JSON-RPC'
    },
    {
      id: 'e-protocol-files',
      source: 'protocol-layer',
      target: 'file-system-server',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'JSON-RPC'
    },
    {
      id: 'e-protocol-github',
      source: 'protocol-layer',
      target: 'github-server',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'JSON-RPC'
    },
    // Servers to discovery
    {
      id: 'e-web-discovery',
      source: 'web-search-server',
      target: 'tool-discovery',
      style: edgeStyle
    },
    {
      id: 'e-db-discovery',
      source: 'database-server',
      target: 'tool-discovery',
      style: edgeStyle
    },
    {
      id: 'e-files-resources',
      source: 'file-system-server',
      target: 'resource-access',
      style: edgeStyle
    },
    {
      id: 'e-github-prompt',
      source: 'github-server',
      target: 'prompt-enhancement',
      style: edgeStyle
    },
    // Discovery to execution
    {
      id: 'e-discovery-plan',
      source: 'tool-discovery',
      target: 'execution-plan',
      style: edgeStyle
    },
    {
      id: 'e-resources-plan',
      source: 'resource-access',
      target: 'execution-plan',
      style: edgeStyle
    },
    {
      id: 'e-prompt-plan',
      source: 'prompt-enhancement',
      target: 'execution-plan',
      style: edgeStyle
    },
    {
      id: 'e-plan-aggregation',
      source: 'execution-plan',
      target: 'response-aggregation',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },
    {
      id: 'e-aggregation-output',
      source: 'response-aggregation',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#059669' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'User Request',
      description: 'User makes a request that requires multiple tools and resources.',
      input: 'User: "Search for Python tutorials and create a study plan"\n\nThis request requires:\n• Web search capabilities\n• Database storage\n• File system access\n• Content generation',
      activeNodes: ['user-request'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'MCP Client Initialization',
      description: 'The LLM host application initializes as an MCP client.',
      output: 'MCP Client Setup:\n• Load user context and preferences\n• Establish protocol connections\n• Register available MCP servers\n• Initialize session state\n\nClient Configuration:\n```json\n{\n  "mcpServers": {\n    "web-search": { "command": "mcp-server-websearch" },\n    "database": { "command": "mcp-server-postgres" },\n    "filesystem": { "command": "mcp-server-filesystem" },\n    "github": { "command": "mcp-server-github" }\n  }\n}\n```',
      activeNodes: ['user-request', 'mcp-client', 'context-state', 'capabilities-registry'],
      activeEdges: ['e-user-client', 'e-client-context', 'e-client-capabilities']
    },
    {
      id: 'step3',
      title: 'Protocol Layer Connection',
      description: 'Establish JSON-RPC connections to MCP servers.',
      output: 'Protocol Initialization:\n\n1. Start MCP servers as subprocesses\n2. Establish stdio/SSE connections\n3. Exchange initialization messages:\n\n```json\n{\n  "jsonrpc": "2.0",\n  "method": "initialize",\n  "params": {\n    "protocolVersion": "0.1.0",\n    "capabilities": {\n      "roots": { "listChanged": true },\n      "sampling": {}\n    },\n    "clientInfo": { "name": "Claude", "version": "1.0" }\n  }\n}\n```',
      activeNodes: ['mcp-client', 'protocol-layer', 'protocol-messages'],
      activeEdges: ['e-client-protocol', 'e-protocol-messages']
    },
    {
      id: 'step4',
      title: 'Connect to MCP Servers',
      description: 'Protocol layer connects to all configured MCP servers.',
      output: 'Server Connections Established:\n\n✅ Web Search Server: Connected\n   Capabilities: search(), trending()\n\n✅ Database Server: Connected\n   Capabilities: query(), insert(), update()\n\n✅ File System Server: Connected\n   Resources: /home/user/projects/*\n\n✅ GitHub Server: Connected\n   Capabilities: clone(), search_code()',
      activeNodes: ['protocol-layer', 'web-search-server', 'database-server', 'file-system-server', 'github-server'],
      activeEdges: ['e-protocol-web', 'e-protocol-db', 'e-protocol-files', 'e-protocol-github']
    },
    {
      id: 'step5',
      title: 'Tool Discovery',
      description: 'Client discovers available tools from connected servers.',
      output: 'Tool Discovery Request:\n```json\n{\n  "method": "tools/list"\n}\n```\n\nDiscovered Tools:\n• web_search: Search the web for content\n• sql_query: Execute SQL queries\n• file_read: Read file contents\n• file_write: Write to files\n• git_clone: Clone repositories\n• create_prompt: Generate prompt templates',
      activeNodes: ['web-search-server', 'database-server', 'tool-discovery'],
      activeEdges: ['e-web-discovery', 'e-db-discovery']
    },
    {
      id: 'step6',
      title: 'Resource & Prompt Discovery',
      description: 'Discover available resources and prompt templates.',
      output: 'Resource Discovery:\n```json\n{\n  "method": "resources/list"\n}\n```\n\nAvailable Resources:\n• file://~/documents/study_plans/\n• file://~/tutorials/python/\n• postgres://learning_db/tutorials\n\nPrompt Templates:\n• study_plan_generator\n• tutorial_summarizer\n• learning_path_creator',
      activeNodes: ['file-system-server', 'github-server', 'resource-access', 'prompt-enhancement'],
      activeEdges: ['e-files-resources', 'e-github-prompt']
    },
    {
      id: 'step7',
      title: 'Create Execution Plan',
      description: 'LLM creates a plan using discovered tools and resources.',
      output: 'Execution Plan:\n\n1. Call web_search tool:\n   Query: "best Python tutorials 2024 beginners"\n\n2. Process search results:\n   Extract titles, URLs, difficulty levels\n\n3. Store in database:\n   INSERT INTO tutorials (...)\n\n4. Generate study plan:\n   Use study_plan_generator prompt\n\n5. Write to file system:\n   Save as ~/study_plans/python_plan.md',
      activeNodes: ['tool-discovery', 'resource-access', 'prompt-enhancement', 'execution-plan'],
      activeEdges: ['e-discovery-plan', 'e-resources-plan', 'e-prompt-plan']
    },
    {
      id: 'step8',
      title: 'Execute Tool Calls',
      description: 'Execute the plan by calling tools through MCP.',
      output: 'Tool Execution:\n\n1. Web Search:\n```json\n{\n  "method": "tools/call",\n  "params": {\n    "name": "web_search",\n    "arguments": { "query": "Python tutorials beginners" }\n  }\n}\n```\nResult: 10 tutorials found\n\n2. Database Insert:\n```json\n{\n  "method": "tools/call",\n  "params": {\n    "name": "sql_query",\n    "arguments": { \n      "query": "INSERT INTO tutorials VALUES (...)" \n    }\n  }\n}\n```\nResult: 10 rows inserted\n\n3. File Write:\n```json\n{\n  "method": "tools/call",\n  "params": {\n    "name": "file_write",\n    "arguments": { \n      "path": "~/study_plans/python_plan.md",\n      "content": "# Python Study Plan\\n..." \n    }\n  }\n}\n```',
      activeNodes: ['execution-plan', 'web-search-server', 'database-server', 'file-system-server'],
      activeEdges: ['e-protocol-web', 'e-protocol-db', 'e-protocol-files']
    },
    {
      id: 'step9',
      title: 'Aggregate Responses',
      description: 'Combine results from multiple tool calls.',
      output: 'Response Aggregation:\n\n✅ Web Search: 10 tutorials retrieved\n✅ Database: Tutorials stored with IDs 1-10\n✅ Study Plan: Generated 4-week curriculum\n✅ File System: Plan saved to python_plan.md\n\nAggregated Context:\n• Total resources: 10 tutorials\n• Estimated time: 40 hours\n• Difficulty progression: Beginner → Intermediate\n• Next steps: Start with Tutorial #1',
      activeNodes: ['execution-plan', 'response-aggregation'],
      activeEdges: ['e-plan-aggregation']
    },
    {
      id: 'step10',
      title: 'Final Response',
      description: 'Return consolidated response to user.',
      output: 'Final Response to User:\n\n"I\'ve created your Python study plan! Here\'s what I did:\n\n1. ✅ Searched and found 10 highly-rated Python tutorials\n2. ✅ Saved them to your learning database for tracking\n3. ✅ Created a 4-week structured study plan\n4. ✅ Saved the plan to ~/study_plans/python_plan.md\n\nYour personalized plan includes:\n• Week 1: Python basics and syntax\n• Week 2: Data structures and functions\n• Week 3: Object-oriented programming\n• Week 4: Real-world projects\n\nAll resources are now accessible through your connected tools. Ready to start learning!"',
      activeNodes: ['response-aggregation', 'final-output'],
      activeEdges: ['e-aggregation-output']
    }
  ]
};