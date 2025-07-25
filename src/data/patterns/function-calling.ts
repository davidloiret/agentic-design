import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const functionCallingPattern: PatternScenario = {
  id: 'function-calling',
  title: 'Function Calling Pattern',
  description: 'Demonstrates structured AI-tool interaction through function calling with parameter validation, execution, and result processing',
  initialNodes: [
    // User request
    {
      id: 'user-request',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'User Request\n"What\'s the weather in NYC and schedule a meeting"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Intent analyzer
    {
      id: 'intent-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Intent Analyzer\nIdentify required functions' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Function registry
    {
      id: 'function-registry',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Function Registry\nAvailable tools catalog' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Available functions
    {
      id: 'weather-function',
      type: 'default',
      position: { x: 150, y: 480 },
      data: { label: 'Weather Function\nget_weather(location, units)' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'calendar-function',
      type: 'default',
      position: { x: 350, y: 480 },
      data: { label: 'Calendar Function\nschedule_meeting(time, attendees)' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'email-function',
      type: 'default',
      position: { x: 550, y: 480 },
      data: { label: 'Email Function\nsend_email(to, subject, body)' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'search-function',
      type: 'default',
      position: { x: 750, y: 480 },
      data: { label: 'Search Function\nweb_search(query, limit)' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },
    {
      id: 'database-function',
      type: 'default',
      position: { x: 950, y: 480 },
      data: { label: 'Database Function\nquery_db(table, conditions)' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Function selector
    {
      id: 'function-selector',
      type: 'default',
      position: { x: 300, y: 620 },
      data: { label: 'Function Selector\nChoose: weather + calendar' },
      style: { ...nodeStyle, minWidth: 180, background: '#db2777' }
    },

    // Parameter extractor
    {
      id: 'parameter-extractor',
      type: 'default',
      position: { x: 700, y: 620 },
      data: { label: 'Parameter Extractor\nExtract function arguments' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    // Parameter validation
    {
      id: 'param-validator',
      type: 'default',
      position: { x: 500, y: 760 },
      data: { label: 'Parameter Validator\nValidate input schemas' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Function calls
    {
      id: 'weather-call',
      type: 'default',
      position: { x: 250, y: 900 },
      data: { label: 'Weather API Call\nlocation: "NYC", units: "celsius"' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6' }
    },
    {
      id: 'calendar-call',
      type: 'default',
      position: { x: 750, y: 900 },
      data: { label: 'Calendar API Call\ntime: "2024-01-15 14:00"' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981' }
    },

    // Execution engine
    {
      id: 'execution-engine',
      type: 'default',
      position: { x: 500, y: 1040 },
      data: { label: 'Execution Engine\nManage concurrent calls' },
      style: { ...nodeStyle, minWidth: 200, background: '#db2777' }
    },

    // Response handlers
    {
      id: 'weather-response',
      type: 'default',
      position: { x: 250, y: 1180 },
      data: { label: 'Weather Response\n{"temp": 18, "condition": "cloudy"}' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6', fontSize: '11px' }
    },
    {
      id: 'calendar-response',
      type: 'default',
      position: { x: 750, y: 1180 },
      data: { label: 'Calendar Response\n{"id": "mtg_123", "status": "scheduled"}' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981', fontSize: '11px' }
    },

    // Result synthesizer
    {
      id: 'result-synthesizer',
      type: 'default',
      position: { x: 500, y: 1320 },
      data: { label: 'Result Synthesizer\nCombine function outputs' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Supporting systems
    {
      id: 'schema-validator',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Schema Validator\nFunction definitions' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    {
      id: 'auth-manager',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Auth Manager\nAPI credentials' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Rate limiter
    {
      id: 'rate-limiter',
      type: 'default',
      position: { x: 100, y: 760 },
      data: { label: 'Rate Limiter\nAPI quota management' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1' }
    },

    // Error handler
    {
      id: 'error-handler',
      type: 'default',
      position: { x: 900, y: 760 },
      data: { label: 'Error Handler\nException management' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Cache manager
    {
      id: 'cache-manager',
      type: 'default',
      position: { x: 100, y: 900 },
      data: { label: 'Cache Manager\nResponse caching' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1' }
    },

    // Retry mechanism
    {
      id: 'retry-mechanism',
      type: 'default',
      position: { x: 900, y: 900 },
      data: { label: 'Retry Mechanism\nFailure recovery' },
      style: { ...nodeStyle, minWidth: 140, background: '#ef4444' }
    },

    // Performance monitor
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 50, y: 480 },
      data: { label: 'Performance Monitor\n• Function calls: 2\\n• Success rate: 100%\\n• Avg latency: 245ms\\n• Cache hits: 15%\\n• Rate limit: 85/100' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Security scanner
    {
      id: 'security-scanner',
      type: 'default',
      position: { x: 1100, y: 480 },
      data: { label: 'Security Scanner\n• Input sanitization: ✓\\n• SQL injection: None\\n• XSS attempts: None\\n• Auth validation: ✓\\n• Permissions: Valid' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16', fontSize: '11px' }
    },

    // Logging system
    {
      id: 'logging-system',
      type: 'default',
      position: { x: 100, y: 1180 },
      data: { label: 'Logging System\nAudit trail capture' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1' }
    },

    // Response formatter
    {
      id: 'response-formatter',
      type: 'default',
      position: { x: 900, y: 1180 },
      data: { label: 'Response Formatter\nUser-friendly output' },
      style: { ...nodeStyle, minWidth: 140, background: '#059669' }
    },

    // Final response
    {
      id: 'final-response',
      type: 'default',
      position: { x: 500, y: 1460 },
      data: { label: 'Final Response\n"Weather: 18°C cloudy. Meeting scheduled for 2PM."' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Analytics collector
    {
      id: 'analytics-collector',
      type: 'default',
      position: { x: 200, y: 1460 },
      data: { label: 'Analytics Collector\nUsage metrics' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },

    // Tool registry updater
    {
      id: 'registry-updater',
      type: 'default',
      position: { x: 800, y: 1460 },
      data: { label: 'Registry Updater\nFunction usage stats' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    }
  ],

  initialEdges: [
    // Initial request flow
    {
      id: 'e-user-intent',
      source: 'user-request',
      target: 'intent-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-intent-registry',
      source: 'intent-analyzer',
      target: 'function-registry',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Support systems
    {
      id: 'e-registry-schema',
      source: 'function-registry',
      target: 'schema-validator',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },
    {
      id: 'e-registry-auth',
      source: 'function-registry',
      target: 'auth-manager',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Function discovery
    {
      id: 'e-registry-weather',
      source: 'function-registry',
      target: 'weather-function',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Discover'
    },
    {
      id: 'e-registry-calendar',
      source: 'function-registry',
      target: 'calendar-function',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Discover'
    },
    {
      id: 'e-registry-email',
      source: 'function-registry',
      target: 'email-function',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Discover'
    },
    {
      id: 'e-registry-search',
      source: 'function-registry',
      target: 'search-function',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Discover'
    },
    {
      id: 'e-registry-database',
      source: 'function-registry',
      target: 'database-function',
      style: { ...edgeStyle, stroke: '#f97316' },
      label: 'Discover'
    },

    // Function selection
    {
      id: 'e-weather-selector',
      source: 'weather-function',
      target: 'function-selector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-calendar-selector',
      source: 'calendar-function',
      target: 'function-selector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Parameter extraction
    {
      id: 'e-selector-extractor',
      source: 'function-selector',
      target: 'parameter-extractor',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Parameter validation
    {
      id: 'e-extractor-validator',
      source: 'parameter-extractor',
      target: 'param-validator',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Rate limiting and error handling
    {
      id: 'e-validator-rate',
      source: 'param-validator',
      target: 'rate-limiter',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },
    {
      id: 'e-validator-error',
      source: 'param-validator',
      target: 'error-handler',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },

    // Function calls
    {
      id: 'e-validator-weather-call',
      source: 'param-validator',
      target: 'weather-call',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-validator-calendar-call',
      source: 'param-validator',
      target: 'calendar-call',
      style: { ...edgeStyle, stroke: '#10b981' }
    },

    // Execution management
    {
      id: 'e-weather-call-engine',
      source: 'weather-call',
      target: 'execution-engine',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-calendar-call-engine',
      source: 'calendar-call',
      target: 'execution-engine',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Response handling
    {
      id: 'e-engine-weather-response',
      source: 'execution-engine',
      target: 'weather-response',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-engine-calendar-response',
      source: 'execution-engine',
      target: 'calendar-response',
      style: { ...edgeStyle, stroke: '#10b981' }
    },

    // Result synthesis
    {
      id: 'e-weather-response-synthesizer',
      source: 'weather-response',
      target: 'result-synthesizer',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-calendar-response-synthesizer',
      source: 'calendar-response',
      target: 'result-synthesizer',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Final response
    {
      id: 'e-synthesizer-final',
      source: 'result-synthesizer',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Supporting operations
    {
      id: 'e-cache-weather-call',
      source: 'cache-manager',
      target: 'weather-call',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-retry-calendar-call',
      source: 'retry-mechanism',
      target: 'calendar-call',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3,3' }
    },

    // Logging and formatting
    {
      id: 'e-weather-response-logging',
      source: 'weather-response',
      target: 'logging-system',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-calendar-response-formatter',
      source: 'calendar-response',
      target: 'response-formatter',
      style: { ...edgeStyle, stroke: '#059669', strokeDasharray: '3,3' }
    },

    // Analytics and updates
    {
      id: 'e-final-analytics',
      source: 'final-response',
      target: 'analytics-collector',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },
    {
      id: 'e-final-registry-update',
      source: 'final-response',
      target: 'registry-updater',
      style: { ...edgeStyle, stroke: '#f97316' }
    },

    // Monitoring
    {
      id: 'e-perf-weather',
      source: 'performance-monitor',
      target: 'weather-function',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-security-database',
      source: 'security-scanner',
      target: 'database-function',
      style: { ...edgeStyle, stroke: '#dc7b16', strokeDasharray: '3,3' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'User Request Analysis',
      description: 'Analyze user request to identify required function calls and tool interactions.',
      input: 'User request: "What is the weather in NYC and schedule a meeting for 2PM today?"',
      activeNodes: ['user-request'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Intent Recognition and Analysis',
      description: 'Parse user intent to identify which functions need to be called.',
      input: 'Intent analysis: identify weather lookup and calendar scheduling requirements',
      activeNodes: ['user-request', 'intent-analyzer'],
      activeEdges: ['e-user-intent'],
      output: 'Intent Analysis Results:\\n• **Primary Intents**: 2 distinct function calls required\\n• **Weather Intent**: Get current weather for New York City\\n• **Calendar Intent**: Schedule meeting for today 2PM\\n• **Parameters Needed**: location, time, meeting details\\n• **Function Types**: External API calls required\\n• **Priority**: Both functions can execute in parallel\\n• **User Context**: Timezone detection needed for meeting\\n• **Confidence**: 95% accuracy in intent recognition'
    },
    {
      id: 'step3',
      title: 'Function Registry Access',
      description: 'Access the function registry to discover available tools and their schemas.',
      input: 'Registry query: search for weather and calendar functions with their schemas',
      activeNodes: ['function-registry', 'schema-validator', 'auth-manager'],
      activeEdges: ['e-intent-registry', 'e-registry-schema', 'e-registry-auth'],
      output: 'Function Registry Status:\\n• **Available Functions**: 5 registered tools\\n• **Weather Function**: get_weather(location, units) - API available\\n• **Calendar Function**: schedule_meeting(time, attendees, title) - API available\\n• **Schema Validation**: All function definitions verified\\n• **Authentication**: API keys validated and active\\n• **Rate Limits**: Weather API: 1000/hour, Calendar API: 500/hour\\n• **Function Versions**: All up-to-date\\n• **Access Permissions**: User authorized for both functions'
    },
    {
      id: 'step4',
      title: 'Function Discovery and Enumeration',
      description: 'Discover and enumerate all available functions from the registry.',
      input: 'Function discovery: identify available tools and their capabilities',
      activeNodes: ['weather-function', 'calendar-function', 'email-function', 'search-function', 'database-function'],
      activeEdges: ['e-registry-weather', 'e-registry-calendar', 'e-registry-email', 'e-registry-search', 'e-registry-database'],
      output: 'Available Functions Discovered:\\n\\n**Weather Function** (✓ Selected):\\n• Name: get_weather\\n• Parameters: location (string), units (celsius|fahrenheit)\\n• Description: Get current weather conditions\\n• API: OpenWeatherMap v2.5\\n• Latency: ~150ms average\\n\\n**Calendar Function** (✓ Selected):\\n• Name: schedule_meeting\\n• Parameters: time (ISO datetime), attendees (array), title (string)\\n• Description: Schedule calendar meeting\\n• API: Google Calendar API v3\\n• Latency: ~200ms average\\n\\n**Other Available Functions**:\\n• Email: send_email (not needed)\\n• Search: web_search (not needed)\\n• Database: query_db (not needed)'
    },
    {
      id: 'step5',
      title: 'Function Selection and Parameter Extraction',
      description: 'Select required functions and extract parameters from user input.',
      input: 'Function selection: choose weather and calendar functions, extract parameters from user request',
      activeNodes: ['function-selector', 'parameter-extractor'],
      activeEdges: ['e-weather-selector', 'e-calendar-selector', 'e-selector-extractor'],
      output: 'Function Selection Results:\\n\\n**Selected Functions**: 2 functions chosen\\n\\n**Weather Function Parameters**:\\n• location: "New York City" (extracted from "NYC")\\n• units: "celsius" (default preference)\\n\\n**Calendar Function Parameters**:\\n• time: "2024-01-15T14:00:00Z" (parsed from "2PM today")\\n• attendees: [] (none specified, will prompt if required)\\n• title: "Meeting" (default title)\\n\\n**Parameter Extraction Confidence**: 92%\\n**Missing Parameters**: attendees list (optional)\\n**Timezone**: EST detected from user context'
    },
    {
      id: 'step6',
      title: 'Parameter Validation and Security Checks',
      description: 'Validate function parameters against schemas and perform security checks.',
      input: 'Parameter validation: check schemas, sanitize inputs, validate security constraints',
      activeNodes: ['param-validator', 'rate-limiter', 'error-handler'],
      activeEdges: ['e-extractor-validator', 'e-validator-rate', 'e-validator-error'],
      output: 'Parameter Validation Results:\\n\\n**Weather Function Validation**:\\n• ✓ location: "New York City" - valid string\\n• ✓ units: "celsius" - valid enum value\\n• ✓ Schema compliance: passed\\n• ✓ Security scan: no malicious input detected\\n\\n**Calendar Function Validation**:\\n• ✓ time: "2024-01-15T14:00:00Z" - valid ISO datetime\\n• ✓ attendees: [] - valid array (empty allowed)\\n• ✓ title: "Meeting" - valid string\\n• ✓ Schema compliance: passed\\n• ✓ Security scan: no injection attempts\\n\\n**Rate Limiting Status**:\\n• Weather API: 23/1000 calls used today\\n• Calendar API: 12/500 calls used today\\n• ✓ Both within limits'
    },
    {
      id: 'step7',
      title: 'Function Execution Preparation',
      description: 'Prepare and initiate function calls with validated parameters.',
      input: 'Function execution: prepare API calls with validated parameters and authentication',
      activeNodes: ['weather-call', 'calendar-call'],
      activeEdges: ['e-validator-weather-call', 'e-validator-calendar-call'],
      output: 'Function Call Preparation:\\n\\n**Weather API Call Prepared**:\\n• Endpoint: GET https://api.openweathermap.org/data/2.5/weather\\n• Parameters: ?q=New+York+City&units=metric&appid=***\\n• Headers: User-Agent, Accept: application/json\\n• Timeout: 5000ms\\n• Retry Policy: 3 attempts with exponential backoff\\n\\n**Calendar API Call Prepared**:\\n• Endpoint: POST https://www.googleapis.com/calendar/v3/calendars/primary/events\\n• Authentication: Bearer token (OAuth 2.0)\\n• Body: {"summary": "Meeting", "start": {"dateTime": "2024-01-15T14:00:00Z"}}\\n• Headers: Authorization, Content-Type: application/json\\n• Timeout: 8000ms'
    },
    {
      id: 'step8',
      title: 'Concurrent Function Execution',
      description: 'Execute both function calls concurrently through the execution engine.',
      input: 'Concurrent execution: run weather and calendar API calls simultaneously',
      activeNodes: ['execution-engine', 'cache-manager', 'retry-mechanism'],
      activeEdges: ['e-weather-call-engine', 'e-calendar-call-engine', 'e-cache-weather-call', 'e-retry-calendar-call'],
      output: 'Function Execution Status:\\n\\n**Execution Engine**: Managing 2 concurrent calls\\n• Thread Pool: 4 workers available\\n• Concurrency Level: 2 simultaneous requests\\n• Execution Mode: Parallel with timeout management\\n• Connection Pooling: HTTP/2 multiplexing enabled\\n\\n**Weather API Call**: In Progress\\n• Status: HTTP request sent (t+0ms)\\n• Cache Check: No cached result for NYC weather\\n• Expected Response: 150ms average latency\\n\\n**Calendar API Call**: In Progress\\n• Status: HTTP request sent (t+0ms)\\n• OAuth Token: Valid (expires in 3600s)\\n• Expected Response: 200ms average latency\\n• Retry Mechanism: Standby (not needed)'
    },
    {
      id: 'step9',
      title: 'Function Response Processing',
      description: 'Process and validate responses from both function calls.',
      input: 'Response processing: handle API responses and validate return data',
      activeNodes: ['weather-response', 'calendar-response', 'logging-system', 'response-formatter'],
      activeEdges: ['e-engine-weather-response', 'e-engine-calendar-response', 'e-weather-response-logging', 'e-calendar-response-formatter'],
      output: 'Function Response Results:\\n\\n**Weather API Response** (Success - 147ms):\\n```json\\n{\\n  "weather": [{"main": "Clouds", "description": "overcast clouds"}],\\n  "main": {"temp": 18.5, "feels_like": 16.8, "humidity": 72},\\n  "name": "New York",\\n  "cod": 200\\n}\\n```\\n• Status: 200 OK\\n• Data Validation: ✓ Schema compliant\\n• Parsed Result: 18°C, cloudy conditions\\n\\n**Calendar API Response** (Success - 189ms):\\n```json\\n{\\n  "id": "mtg_abc123xyz",\\n  "status": "confirmed",\\n  "htmlLink": "https://calendar.google.com/event?eid=...",\\n  "start": {"dateTime": "2024-01-15T14:00:00-05:00"}\\n}\\n```\\n• Status: 201 Created\\n• Meeting ID: mtg_abc123xyz\\n• Confirmation: ✓ Successfully scheduled'
    },
    {
      id: 'step10',
      title: 'Result Synthesis and Integration',
      description: 'Combine function results into a coherent response for the user.',
      input: 'Result synthesis: combine weather and calendar data into unified user response',
      activeNodes: ['result-synthesizer'],
      activeEdges: ['e-weather-response-synthesizer', 'e-calendar-response-synthesizer'],
      output: 'Result Synthesis Complete:\\n\\n**Data Integration**:\\n• Weather Data: 18°C, overcast clouds in New York\\n• Calendar Data: Meeting scheduled for 2:00 PM EST today\\n• Meeting Link: Generated and available\\n• Status: Both operations successful\\n\\n**Response Preparation**:\\n• Format: Natural language summary\\n• Include: Weather conditions and meeting confirmation\\n• User Context: Timezone-aware (EST)\\n• Additional Info: Meeting link for easy access\\n\\n**Quality Checks**:\\n• ✓ Data accuracy verified\\n• ✓ User intent fully addressed\\n• ✓ No errors or warnings\\n• ✓ Response completeness confirmed'
    },
    {
      id: 'step11',
      title: 'Response Delivery and Analytics',
      description: 'Deliver final response to user and collect usage analytics.',
      input: 'Response delivery: provide final answer to user and update usage metrics',
      activeNodes: ['final-response', 'performance-monitor', 'security-scanner'],
      activeEdges: ['e-synthesizer-final', 'e-perf-weather', 'e-security-database'],
      output: 'Final Response Delivered:\\n\\n**User Response**:\\n"The weather in New York City is currently 18°C with overcast clouds. I have successfully scheduled your meeting for today at 2:00 PM EST. You can access the meeting details here: [Meeting Link]"\\n\\n**Performance Metrics**:\\n• Total Execution Time: 189ms (calendar was slowest)\\n• Function Success Rate: 100% (2/2 successful)\\n• Average API Latency: 168ms\\n• Cache Utilization: 0% (no cached data used)\\n• Rate Limit Usage: Weather 24/1000, Calendar 13/500\\n\\n**Security Assessment**:\\n• Input Sanitization: ✓ All inputs cleaned\\n• SQL Injection Attempts: 0 detected\\n• XSS Attempts: 0 detected\\n• Authentication: ✓ All tokens valid\\n• Permission Verification: ✓ User authorized for both functions'
    },
    {
      id: 'step12',
      title: 'Function Calling Pattern Completion',
      description: 'Complete the function calling cycle with analytics collection and registry updates.',
      activeNodes: ['analytics-collector', 'registry-updater'],
      activeEdges: ['e-final-analytics', 'e-final-registry-update'],
      output: 'Function Calling Pattern Execution Complete:\\n\\n**Operation**: Multi-function AI tool interaction\\n**Functions Called**: 2 (Weather API + Calendar API)\\n**Total Execution Time**: 189ms\\n**Success Rate**: 100% (both functions successful)\\n\\n**Execution Summary**:\\n• **Intent Recognition**: Successfully identified 2 distinct function calls\\n• **Parameter Extraction**: 92% confidence, all required params extracted\\n• **Schema Validation**: All parameters passed validation\\n• **Security Screening**: No threats detected, all inputs sanitized\\n• **Concurrent Execution**: 2 parallel API calls completed\\n• **Response Integration**: Successfully combined results\\n\\n**Function Calling Benefits Demonstrated**:\\n✓ **Structured Interface**: Schema-based function definitions\\n✓ **Parameter Validation**: Automatic input validation and sanitization\\n✓ **Concurrent Execution**: Parallel function calls for efficiency\\n✓ **Error Handling**: Robust exception management and recovery\\n✓ **Security**: Input sanitization and authentication validation\\n✓ **Rate Limiting**: Automatic quota management\\n✓ **Caching**: Response caching for performance optimization\\n\\n**Key Performance Metrics**:\\n• **Function Discovery**: 5 available functions identified\\n• **Selection Accuracy**: 100% correct function selection\\n• **Parameter Extraction**: 92% accuracy with context awareness\\n• **Validation Success**: 100% schema compliance\\n• **API Response Time**: Weather 147ms, Calendar 189ms\\n• **Total Latency**: 189ms end-to-end\\n• **Resource Efficiency**: Concurrent execution saved ~50% time\\n\\n**Function Calling Insights**:\\n• Structured schemas enable reliable parameter validation\\n• Concurrent execution significantly improves performance\\n• Rate limiting prevents API quota exhaustion\\n• Security scanning protects against malicious inputs\\n• Response caching can further optimize repeated calls\\n• Error handling ensures graceful failure recovery\\n\\n**Usage Analytics**:\\n• **Function Popularity**: Weather (45%), Calendar (32%), Email (23%)\\n• **Success Patterns**: Multi-function requests have 94% success rate\\n• **Performance Trends**: Average latency decreased 15% this month\\n• **Error Categories**: 3% timeout, 2% validation, 1% authentication\\n\\n**Registry Updates**:\\n• Weather function: +1 successful call, avg latency updated\\n• Calendar function: +1 successful call, reliability score improved\\n• User preferences: NYC weather and 2PM meetings noted\\n• Function affinity: Weather+Calendar combination frequency increased\\n\\n*Function calling pattern successfully executed 2 parallel API calls with 100% success rate in 189ms total time*'
    }
  ]
};