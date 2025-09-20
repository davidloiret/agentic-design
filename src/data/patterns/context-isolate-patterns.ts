import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const contextIsolatePatternsPattern: PatternScenario = {
  id: 'context-isolate-patterns',
  title: 'Context Isolate Patterns',
  description: 'Security-focused isolation techniques preventing prompt injection, cross-tenant data leakage, and unauthorized access through sandboxing, namespace separation, and instruction hierarchies',
  initialNodes: [
    // Security isolation challenge
    {
      id: 'isolation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🔒 Isolation Challenge\n"How to prevent context mixing,\nprompt injection, and data leakage\nacross users and tenants?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // Isolation framework
    {
      id: 'isolation-framework',
      position: { x: 400, y: 200 },
      data: { label: '🛡️ Isolation Framework\n"Multi-layer protection:\n• Namespace separation\n• Sandboxed execution\n• Instruction hierarchy\n• Context boundaries"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // Namespace isolation
    {
      id: 'namespace-isolation',
      position: { x: 200, y: 350 },
      data: { label: '📁 Namespace Isolation\n"Container-level separation:\n• Tenant namespaces\n• API scoping\n• Resource isolation\n• Invisible boundaries"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // Multi-tenant architecture
    {
      id: 'multi-tenant-architecture',
      position: { x: 50, y: 500 },
      data: { label: '🏢 Multi-Tenant Architecture\n"Secure separation:\n• RBAC controls\n• Quota management\n• Network policies\n• Pod sandboxing"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 230 },
    },

    // Instruction hierarchy
    {
      id: 'instruction-hierarchy',
      position: { x: 600, y: 350 },
      data: { label: '📜 Instruction Hierarchy\n"Priority levels:\n• System instructions\n• Developer prompts\n• User inputs\n• 63% robustness gain"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 240 },
    },

    // Prompt injection defense
    {
      id: 'prompt-injection-defense',
      position: { x: 750, y: 500 },
      data: { label: '🚫 Injection Defense\n"Attack prevention:\n• Input sanitization\n• Output monitoring\n• Canary tokens\n• Jailbreak detection"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Sandboxed execution
    {
      id: 'sandboxed-execution',
      position: { x: 400, y: 650 },
      data: { label: '📦 Sandboxed Execution\n"Contained processing:\n• Micro VMs\n• User-space kernels\n• Control-flow integrity\n• Privilege boundaries"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Context boundaries
    {
      id: 'context-boundaries',
      position: { x: 200, y: 800 },
      data: { label: '🚪 Context Boundaries\n"Formal separation:\n• Action-Selector\n• Plan-Then-Execute\n• Dual LLM patterns\n• Context minimization"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // MCP context broker
    {
      id: 'mcp-context-broker',
      position: { x: 600, y: 800 },
      data: { label: '🌐 MCP Context Broker\n"Access control:\n• User scoping\n• Tool authorization\n• Data filtering\n• Prompt assembly"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    // Security monitoring
    {
      id: 'security-monitoring',
      position: { x: 200, y: 950 },
      data: { label: '📊 Security Monitoring\n"Detection systems:\n• Prompt leakage alerts\n• Anomaly detection\n• Audit logging\n• Compliance tracking"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Data compartmentalization
    {
      id: 'data-compartmentalization',
      position: { x: 600, y: 950 },
      data: { label: '🗝️ Data Compartments\n"Information silos:\n• Row-level security\n• Tenant data isolation\n• Memory segregation\n• Cross-tenant prevention"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Least privilege principle
    {
      id: 'least-privilege',
      position: { x: 400, y: 1100 },
      data: { label: '🔐 Least Privilege\n"Minimal access:\n• Role-based permissions\n• Scoped contexts\n• Tool restrictions\n• Action constraints"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 230 },
    },

    // Core isolation principle
    {
      id: 'isolation-principle',
      position: { x: 400, y: 1250 },
      data: { label: '🎯 Context Isolation Principle\n"Strong security boundaries prevent unauthorized access\nMulti-layer defenses protect against injection attacks\nFormal isolation patterns ensure safe multi-tenant operation"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 400 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'isolation-challenge',
      target: 'isolation-framework',
      ...edgeStyle,
      label: 'solved by'
    },

    // Framework implements patterns
    {
      id: 'e2',
      source: 'isolation-framework',
      target: 'namespace-isolation',
      ...edgeStyle,
      label: 'implements'
    },
    {
      id: 'e3',
      source: 'isolation-framework',
      target: 'instruction-hierarchy',
      ...edgeStyle,
      label: 'enforces'
    },
    {
      id: 'e4',
      source: 'isolation-framework',
      target: 'sandboxed-execution',
      ...edgeStyle,
      label: 'provides'
    },

    // Namespace details
    {
      id: 'e5',
      source: 'namespace-isolation',
      target: 'multi-tenant-architecture',
      ...edgeStyle,
      label: 'enables'
    },

    // Instruction hierarchy connections
    {
      id: 'e6',
      source: 'instruction-hierarchy',
      target: 'prompt-injection-defense',
      ...edgeStyle,
      label: 'defends against'
    },

    // Sandboxing connections
    {
      id: 'e7',
      source: 'sandboxed-execution',
      target: 'context-boundaries',
      ...edgeStyle,
      label: 'establishes'
    },
    {
      id: 'e8',
      source: 'sandboxed-execution',
      target: 'mcp-context-broker',
      ...edgeStyle,
      label: 'managed by'
    },

    // Security layer connections
    {
      id: 'e9',
      source: 'context-boundaries',
      target: 'security-monitoring',
      ...edgeStyle,
      label: 'monitored via'
    },
    {
      id: 'e10',
      source: 'mcp-context-broker',
      target: 'data-compartmentalization',
      ...edgeStyle,
      label: 'enforces'
    },

    // Multi-tenant flows
    {
      id: 'e11',
      source: 'multi-tenant-architecture',
      target: 'data-compartmentalization',
      ...edgeStyle,
      label: 'requires'
    },
    {
      id: 'e12',
      source: 'prompt-injection-defense',
      target: 'security-monitoring',
      ...edgeStyle,
      label: 'reports to'
    },

    // Principle connections
    {
      id: 'e13',
      source: 'security-monitoring',
      target: 'least-privilege',
      ...edgeStyle,
      label: 'enforces'
    },
    {
      id: 'e14',
      source: 'data-compartmentalization',
      target: 'least-privilege',
      ...edgeStyle,
      label: 'implements'
    },

    // Least privilege validates principle
    {
      id: 'e15',
      source: 'least-privilege',
      target: 'isolation-principle',
      ...edgeStyle,
      label: 'validates',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Context Isolation Security Challenge",
      description: "How can we prevent context mixing, prompt injection attacks, and cross-tenant data leakage in multi-user LLM systems while maintaining functionality?",
      activeNodes: ['isolation-challenge'],
      activeEdges: []
    },
    {
      title: "Multi-Layer Isolation Framework",
      description: "Comprehensive framework addresses challenge through namespace separation for container-level isolation, sandboxed execution environments, instruction hierarchies for priority control, and formal context boundaries.",
      activeNodes: ['isolation-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Namespace and Instruction Hierarchy",
      description: "Container namespaces provide invisible API-scoped boundaries enabling secure multi-tenant architectures with RBAC and quotas, while instruction hierarchy establishes priority levels achieving 63% robustness improvement against prompt injection.",
      activeNodes: ['namespace-isolation', 'multi-tenant-architecture', 'instruction-hierarchy', 'prompt-injection-defense'],
      activeEdges: ['e2', 'e3', 'e5', 'e6']
    },
    {
      title: "Sandboxed Execution and Context Boundaries",
      description: "Sandboxed execution uses micro VMs and user-space kernels for contained processing with privilege boundaries, establishing formal context boundaries through Action-Selector, Plan-Then-Execute, and Dual LLM patterns.",
      activeNodes: ['sandboxed-execution', 'context-boundaries', 'mcp-context-broker'],
      activeEdges: ['e4', 'e7', 'e8']
    },
    {
      title: "Security Monitoring and Data Compartmentalization",
      description: "Security monitoring detects prompt leakage and anomalies with audit logging, while data compartmentalization implements row-level security and tenant isolation preventing cross-tenant access.",
      activeNodes: ['security-monitoring', 'data-compartmentalization'],
      activeEdges: ['e9', 'e10', 'e11', 'e12']
    },
    {
      title: "Least Privilege and Isolation Principle",
      description: "Least privilege enforces minimal access through role-based permissions and scoped contexts, validating that strong security boundaries with multi-layer defenses ensure safe multi-tenant LLM operation.",
      activeNodes: ['least-privilege', 'isolation-principle'],
      activeEdges: ['e13', 'e14', 'e15']
    }
  ]
};