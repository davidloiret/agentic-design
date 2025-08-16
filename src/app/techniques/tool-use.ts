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
    id: 'code-execution',
    name: 'Code Execution',
    abbr: '',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
    category: 'tool-use',
    description: 'Safely execute LLM-generated code in isolated environments for calculations and data processing',
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
];