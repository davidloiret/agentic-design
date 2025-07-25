import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const codeExecutionPattern: PatternScenario = {
  id: 'code-execution',
  title: 'Code Execution Pattern',
  description: 'Demonstrates secure code generation, validation, and execution in sandboxed environments with multi-language support',
  initialNodes: [
    // User request
    {
      id: 'user-request',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'User Request\n"Calculate portfolio variance for these stocks"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Code generation
    {
      id: 'code-generator',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Code Generator\nAnalyze request and generate code' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Language detection
    {
      id: 'language-detector',
      type: 'default',
      position: { x: 300, y: 320 },
      data: { label: 'Language Detector\nDetermine optimal language' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Code validator
    {
      id: 'code-validator',
      type: 'default',
      position: { x: 700, y: 320 },
      data: { label: 'Code Validator\nSyntax and security checks' },
      style: { ...nodeStyle, minWidth: 180, background: '#3b82f6' }
    },

    // Language environments
    {
      id: 'python-env',
      type: 'default',
      position: { x: 150, y: 480 },
      data: { label: 'Python Environment\nPython 3.11 + NumPy/Pandas' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'javascript-env',
      type: 'default',
      position: { x: 350, y: 480 },
      data: { label: 'JavaScript Environment\nNode.js 18 + Libraries' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b' }
    },
    {
      id: 'r-env',
      type: 'default',
      position: { x: 550, y: 480 },
      data: { label: 'R Environment\nR 4.3 + tidyverse' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'sql-env',
      type: 'default',
      position: { x: 750, y: 480 },
      data: { label: 'SQL Environment\nSQLite + Extensions' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'rust-env',
      type: 'default',
      position: { x: 950, y: 480 },
      data: { label: 'Rust Environment\nRust 1.75 + Cargo' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Sandbox manager
    {
      id: 'sandbox-manager',
      type: 'default',
      position: { x: 500, y: 620 },
      data: { label: 'Sandbox Manager\nIsolated execution environment' },
      style: { ...nodeStyle, minWidth: 200, background: '#db2777' }
    },

    // Security systems
    {
      id: 'security-scanner',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Security Scanner\n• Code injection detection\n• Malicious pattern analysis\n• Import validation\n• System call filtering' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626', fontSize: '11px' }
    },

    {
      id: 'resource-limiter',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Resource Limiter\n• CPU: 2 cores max\n• Memory: 1GB limit\n• Disk: 100MB temp\n• Network: Restricted' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Execution components
    {
      id: 'code-executor',
      type: 'default',
      position: { x: 500, y: 760 },
      data: { label: 'Code Executor\nExecute in sandboxed environment' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Monitoring systems
    {
      id: 'execution-monitor',
      type: 'default',
      position: { x: 250, y: 760 },
      data: { label: 'Execution Monitor\n• Real-time resource usage\n• Performance metrics\n• Error detection\n• Timeout management' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '11px' }
    },

    {
      id: 'output-capture',
      type: 'default',
      position: { x: 750, y: 760 },
      data: { label: 'Output Capture\n• STDOUT/STDERR streams\n• Return values\n• Exception handling\n• Result serialization' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899', fontSize: '11px' }
    },

    // Result processing
    {
      id: 'result-processor',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Result Processor\nProcess and format output' },
      style: { ...nodeStyle, minWidth: 200, background: '#7c3aed' }
    },

    // Output formatting
    {
      id: 'output-formatter',
      type: 'default',
      position: { x: 300, y: 1040 },
      data: { label: 'Output Formatter\nFormat for user presentation' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    {
      id: 'error-handler',
      type: 'default',
      position: { x: 700, y: 1040 },
      data: { label: 'Error Handler\nHandle execution errors' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
    },

    // Cleanup system
    {
      id: 'cleanup-manager',
      type: 'default',
      position: { x: 100, y: 900 },
      data: { label: 'Cleanup Manager\nRemove temporary files' },
      style: { ...nodeStyle, minWidth: 160, background: '#6b7280' }
    },

    // Audit system
    {
      id: 'audit-logger',
      type: 'default',
      position: { x: 900, y: 900 },
      data: { label: 'Audit Logger\nLog execution attempts' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Cache system
    {
      id: 'result-cache',
      type: 'default',
      position: { x: 100, y: 620 },
      data: { label: 'Result Cache\nCache execution results' },
      style: { ...nodeStyle, minWidth: 140, background: '#6366f1' }
    },

    // Final response
    {
      id: 'final-response',
      type: 'default',
      position: { x: 500, y: 1180 },
      data: { label: 'Final Response\n"Portfolio variance: 0.0234 (2.34%)"' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Performance metrics
    {
      id: 'performance-metrics',
      type: 'default',
      position: { x: 150, y: 1180 },
      data: { label: 'Performance Metrics\n• Execution time: 1.2s\n• Memory used: 45MB\n• CPU usage: 23%\n• Cache hit: No' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Security report
    {
      id: 'security-report',
      type: 'default',
      position: { x: 850, y: 1180 },
      data: { label: 'Security Report\n• Threats detected: 0\n• Safe imports: ✓\n• No system calls: ✓\n• Sandbox intact: ✓' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626', fontSize: '11px' }
    },

    // Generated code display
    {
      id: 'generated-code',
      type: 'default',
      position: { x: 500, y: 1320 },
      data: { label: 'Generated Code\nimport numpy as np\nstocks = [0.12, 0.08, 0.15]\nvariance = np.var(stocks)\nprint(f"Variance: {variance:.4f}")' },
      style: { ...nodeStyle, minWidth: 300, background: '#374151', fontSize: '10px', fontFamily: 'monospace' }
    }
  ],

  initialEdges: [
    // Main flow
    {
      id: 'e-user-generator',
      source: 'user-request',
      target: 'code-generator',
      style: edgeStyle
    },
    {
      id: 'e-generator-detector',
      source: 'code-generator',
      target: 'language-detector',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-generator-validator',
      source: 'code-generator',
      target: 'code-validator',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },

    // Security and validation
    {
      id: 'e-generator-security',
      source: 'code-generator',
      target: 'security-scanner',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },
    {
      id: 'e-validator-limiter',
      source: 'code-validator',
      target: 'resource-limiter',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },

    // Language environment selection
    {
      id: 'e-detector-python',
      source: 'language-detector',
      target: 'python-env',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Select'
    },
    {
      id: 'e-detector-javascript',
      source: 'language-detector',
      target: 'javascript-env',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3,3' },
      label: 'Available'
    },
    {
      id: 'e-detector-r',
      source: 'language-detector',
      target: 'r-env',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeDasharray: '3,3' },
      label: 'Available'
    },
    {
      id: 'e-detector-sql',
      source: 'language-detector',
      target: 'sql-env',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' },
      label: 'Available'
    },
    {
      id: 'e-detector-rust',
      source: 'language-detector',
      target: 'rust-env',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3,3' },
      label: 'Available'
    },

    // Sandbox setup
    {
      id: 'e-python-sandbox',
      source: 'python-env',
      target: 'sandbox-manager',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-validator-sandbox',
      source: 'code-validator',
      target: 'sandbox-manager',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Cache check
    {
      id: 'e-cache-sandbox',
      source: 'result-cache',
      target: 'sandbox-manager',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },

    // Execution
    {
      id: 'e-sandbox-executor',
      source: 'sandbox-manager',
      target: 'code-executor',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Monitoring
    {
      id: 'e-monitor-executor',
      source: 'execution-monitor',
      target: 'code-executor',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-executor-capture',
      source: 'code-executor',
      target: 'output-capture',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },

    // Result processing
    {
      id: 'e-executor-processor',
      source: 'code-executor',
      target: 'result-processor',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-capture-processor',
      source: 'output-capture',
      target: 'result-processor',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Output handling
    {
      id: 'e-processor-formatter',
      source: 'result-processor',
      target: 'output-formatter',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-processor-error',
      source: 'result-processor',
      target: 'error-handler',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },

    // Cleanup and audit
    {
      id: 'e-executor-cleanup',
      source: 'code-executor',
      target: 'cleanup-manager',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '3,3' }
    },
    {
      id: 'e-executor-audit',
      source: 'code-executor',
      target: 'audit-logger',
      style: { ...edgeStyle, stroke: '#f97316', strokeDasharray: '3,3' }
    },

    // Final response
    {
      id: 'e-formatter-final',
      source: 'output-formatter',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-error-final',
      source: 'error-handler',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },

    // Metrics and reporting
    {
      id: 'e-monitor-metrics',
      source: 'execution-monitor',
      target: 'performance-metrics',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-security-report',
      source: 'security-scanner',
      target: 'security-report',
      style: { ...edgeStyle, stroke: '#dc2626', strokeDasharray: '3,3' }
    },

    // Code display
    {
      id: 'e-final-code',
      source: 'final-response',
      target: 'generated-code',
      style: { ...edgeStyle, stroke: '#374151' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'User Request Analysis',
      description: 'Analyze user request to understand computational requirements and generate appropriate code.',
      input: 'User request: "Calculate portfolio variance for these stocks: AAPL (12%), GOOGL (8%), MSFT (15%)"',
      activeNodes: ['user-request'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Code Generation and Analysis',
      description: 'Generate code based on user requirements and prepare for validation.',
      input: 'Code generation: analyze requirements and create executable solution',
      activeNodes: ['user-request', 'code-generator'],
      activeEdges: ['e-user-generator'],
      output: 'Code Generation Results:\\n\\n**Task Analysis**: Portfolio variance calculation\\n• **Input Data**: Stock returns as percentages\\n• **Required Libraries**: NumPy for mathematical operations\\n• **Output Format**: Variance value with percentage display\\n• **Complexity**: Medium - statistical calculation\\n• **Language Recommendation**: Python (optimal for data analysis)\\n\\n**Generated Algorithm**:\\n1. Convert percentage returns to decimal format\\n2. Create NumPy array for efficient computation\\n3. Calculate variance using np.var() function\\n4. Format result for user presentation\\n5. Include error handling for invalid inputs'
    },
    {
      id: 'step3',
      title: 'Language Detection and Security Scanning',
      description: 'Determine optimal programming language and perform security analysis.',
      input: 'Language detection: analyze task requirements and perform security screening',
      activeNodes: ['code-generator', 'language-detector', 'security-scanner'],
      activeEdges: ['e-generator-detector', 'e-generator-security'],
      output: 'Language and Security Analysis:\\n\\n**Language Selection Process**:\\n• **Task Type**: Mathematical/Statistical computation\\n• **Data Requirements**: Numerical array processing\\n• **Library Needs**: Scientific computing libraries\\n• **Performance Considerations**: Vectorized operations preferred\\n• **Selected Language**: Python 3.11\\n• **Reasoning**: NumPy ecosystem, readability, mathematical libraries\\n\\n**Security Scan Results**:\\n• **Code Injection**: No malicious patterns detected\\n• **Import Analysis**: Only safe scientific libraries (numpy)\\n• **System Calls**: No dangerous system access\\n• **File Operations**: No file system access required\\n• **Network Access**: No external connections needed\\n• **Security Rating**: ✓ SAFE - Code approved for execution'
    },
    {
      id: 'step4',
      title: 'Code Validation and Environment Setup',
      description: 'Validate generated code syntax and prepare execution environment.',
      input: 'Code validation: syntax checking and environment preparation',
      activeNodes: ['code-validator', 'resource-limiter', 'python-env'],
      activeEdges: ['e-generator-validator', 'e-validator-limiter', 'e-detector-python'],
      output: 'Validation and Environment Setup:\\n\\n**Code Validation Results**:\\n• **Syntax Check**: ✓ Valid Python syntax\\n• **Import Validation**: ✓ NumPy import approved\\n• **Function Calls**: ✓ All functions are safe\\n• **Variable Usage**: ✓ No undefined variables\\n• **Logic Flow**: ✓ Proper execution sequence\\n\\n**Python Environment Configuration**:\\n• **Python Version**: 3.11.7\\n• **Available Libraries**: numpy 1.24.3, pandas 2.0.3\\n• **Memory Allocation**: 1GB maximum\\n• **CPU Cores**: 2 cores available\\n• **Execution Timeout**: 30 seconds\\n• **Temp Directory**: /tmp/sandbox_exec_123\\n• **Network Access**: Disabled for security'
    },
    {
      id: 'step5',
      title: 'Resource Limiting and Sandbox Preparation',
      description: 'Configure resource limits and prepare isolated execution environment.',
      input: 'Resource configuration: set limits and prepare sandbox environment',
      activeNodes: ['resource-limiter', 'sandbox-manager', 'result-cache'],
      activeEdges: ['e-validator-limiter', 'e-validator-sandbox', 'e-cache-sandbox'],
      output: 'Resource and Sandbox Configuration:\\n\\n**Resource Limits Applied**:\\n• **CPU Limit**: 2 cores, 80% max utilization\\n• **Memory Limit**: 1GB RAM, 100MB swap\\n• **Disk Space**: 100MB temporary storage\\n• **Network**: Completely isolated (no internet)\\n• **Process Limit**: 10 maximum processes\\n• **File Descriptors**: 256 maximum\\n\\n**Sandbox Environment**:\\n• **Container ID**: sandbox_py_abc123\\n• **Base Image**: python:3.11-alpine\\n• **Working Directory**: /app/workspace\\n• **User Permissions**: Non-root (uid: 1001)\\n• **Security Context**: SELinux enforcing\\n• **Result Cache**: No cached results found for this query'
    },
    {
      id: 'step6',
      title: 'Code Execution Initiation',
      description: 'Begin code execution within the secured sandbox environment.',
      input: 'Code execution: run generated Python code in sandbox',
      activeNodes: ['sandbox-manager', 'code-executor', 'execution-monitor'],
      activeEdges: ['e-sandbox-executor', 'e-monitor-executor'],
      output: 'Code Execution Started:\\n\\n**Execution Environment**:\\n• **Container Status**: Running (sandbox_py_abc123)\\n• **Process ID**: 1001\\n• **Working Directory**: /app/workspace\\n• **Python Interpreter**: /usr/local/bin/python3.11\\n• **Command**: python3 -c "import numpy as np; stocks = [0.12, 0.08, 0.15]; variance = np.var(stocks); print(f\\"Variance: {variance:.4f}\\")"\\n\\n**Real-time Monitoring**:\\n• **Execution Status**: In Progress\\n• **CPU Usage**: 15% (within limits)\\n• **Memory Usage**: 28MB (within limits)\\n• **Execution Time**: 0.3s elapsed\\n• **Process Count**: 1 active process\\n• **Network Attempts**: 0 (expected)\\n• **File System Access**: Read-only imports only'
    },
    {
      id: 'step7',
      title: 'Output Capture and Result Processing',
      description: 'Capture execution output and process results for user presentation.',
      input: 'Output processing: capture results and handle any errors',
      activeNodes: ['code-executor', 'output-capture', 'result-processor'],
      activeEdges: ['e-executor-capture', 'e-executor-processor', 'e-capture-processor'],
      output: 'Execution Output Captured:\\n\\n**Execution Results**:\\n• **Status**: Completed Successfully ✓\\n• **Exit Code**: 0 (success)\\n• **Execution Time**: 1.247 seconds\\n• **Peak Memory**: 45.2MB\\n• **CPU Time**: 0.82 seconds\\n\\n**Standard Output**:\\n```\\nVariance: 0.0009\\n```\\n\\n**Standard Error**: (empty - no errors)\\n\\n**Result Processing**:\\n• **Output Type**: Numerical result with formatting\\n• **Data Validation**: ✓ Valid numerical output\\n• **Format Conversion**: Raw variance to percentage format\\n• **User-Friendly Format**: "Portfolio variance: 0.0009 (0.09%)"\\n• **Additional Context**: Low variance indicates stable portfolio'
    },
    {
      id: 'step8',
      title: 'Output Formatting and Error Handling',
      description: 'Format results for user presentation and handle any potential errors.',
      input: 'Result formatting: prepare final output and check for errors',
      activeNodes: ['result-processor', 'output-formatter', 'error-handler'],
      activeEdges: ['e-processor-formatter', 'e-processor-error'],
      output: 'Output Formatting Complete:\\n\\n**Formatted Results**:\\n• **Primary Result**: "Portfolio variance: 0.0009 (0.09%)"\\n• **Interpretation**: "This indicates a low-risk, stable portfolio"\\n• **Technical Details**: "Calculated using NumPy variance function"\\n• **Execution Context**: "Computed in 1.25s using Python 3.11"\\n\\n**Error Handling Status**:\\n• **Runtime Errors**: None detected\\n• **Mathematical Errors**: No division by zero or invalid operations\\n• **Import Errors**: All libraries loaded successfully\\n• **Memory Errors**: No memory allocation issues\\n• **Timeout Status**: Completed well within 30-second limit\\n\\n**Quality Assurance**:\\n• **Result Validation**: ✓ Variance value is mathematically correct\\n• **Format Consistency**: ✓ Matches expected output format\\n• **User Readability**: ✓ Clear and interpretable result'
    },
    {
      id: 'step9',
      title: 'System Cleanup and Audit Logging',
      description: 'Clean up temporary resources and log execution details for audit.',
      input: 'Cleanup and audit: remove temporary files and log execution activity',
      activeNodes: ['cleanup-manager', 'audit-logger', 'performance-metrics'],
      activeEdges: ['e-executor-cleanup', 'e-executor-audit', 'e-monitor-metrics'],
      output: 'Cleanup and Audit Complete:\\n\\n**Cleanup Operations**:\\n• **Container Termination**: sandbox_py_abc123 stopped and removed\\n• **Temporary Files**: /tmp/sandbox_exec_123 directory cleaned\\n• **Memory Release**: 45.2MB freed back to system\\n• **Process Cleanup**: All child processes terminated\\n• **Network Isolation**: Sandbox network namespace removed\\n\\n**Audit Log Entry**:\\n• **Timestamp**: 2024-01-15T14:23:47.123Z\\n• **User ID**: user_789\\n• **Request Type**: Portfolio variance calculation\\n• **Language**: Python 3.11\\n• **Execution Time**: 1.247s\\n• **Memory Peak**: 45.2MB\\n• **Status**: SUCCESS\\n• **Security Events**: None\\n\\n**Performance Metrics**:\\n• **Total Processing Time**: 2.1s (including setup)\\n• **Code Generation**: 0.3s\\n• **Validation**: 0.2s\\n• **Execution**: 1.25s\\n• **Cleanup**: 0.35s\\n• **Efficiency Rating**: 98.5% (excellent)'
    },
    {
      id: 'step10',
      title: 'Final Response and Security Report',
      description: 'Deliver final results to user with comprehensive security and performance reporting.',
      input: 'Final delivery: provide results and generate comprehensive reports',
      activeNodes: ['final-response', 'security-report', 'generated-code'],
      activeEdges: ['e-formatter-final', 'e-security-report', 'e-final-code'],
      output: 'Code Execution Pattern Complete:\\n\\n**Final User Response**:\\n"I calculated the portfolio variance for your stocks. The result is 0.0009 (0.09%), which indicates a low-risk, stable portfolio with minimal volatility between the three stocks."\\n\\n**Generated and Executed Code**:\\n```python\\nimport numpy as np\\nstocks = [0.12, 0.08, 0.15]  # AAPL, GOOGL, MSFT returns\\nvariance = np.var(stocks)\\nprint(f"Variance: {variance:.4f}")\\n```\\n\\n**Comprehensive Security Report**:\\n• **Threat Assessment**: No security threats detected\\n• **Code Analysis**: 100% safe operations\\n• **Import Validation**: Only approved scientific libraries used\\n• **System Access**: No unauthorized system calls\\n• **Data Leakage**: No sensitive data exposure\\n• **Sandbox Integrity**: Maintained throughout execution\\n\\n**Execution Summary**:\\n• **Success Rate**: 100% (code executed successfully)\\n• **Performance**: Excellent (1.25s execution time)\\n• **Resource Efficiency**: 4.5% memory usage, 15% CPU peak\\n• **Security Compliance**: Full compliance with security policies\\n• **Code Quality**: High (readable, efficient, mathematically correct)\\n\\n**Key Benefits Demonstrated**:\\n✓ **Secure Execution**: Isolated sandbox prevented any security risks\\n✓ **Multi-language Support**: Optimal language selection (Python for data analysis)\\n✓ **Resource Management**: Efficient resource utilization with hard limits\\n✓ **Error Handling**: Comprehensive error detection and handling\\n✓ **Output Formatting**: User-friendly result presentation\\n✓ **Audit Trail**: Complete execution logging for compliance\\n✓ **Performance Monitoring**: Real-time resource usage tracking\\n\\n*Code execution completed successfully with portfolio variance of 0.09% calculated in 1.25 seconds*'
    }
  ]
};