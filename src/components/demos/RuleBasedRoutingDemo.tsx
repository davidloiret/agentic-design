'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, GitBranch, Shield, Zap, AlertTriangle, CheckCircle, XCircle, ArrowRight, FileText, DollarSign, Users, Code } from 'lucide-react';

interface RoutingRule {
  id: string;
  priority: number;
  condition: string;
  description: string;
  handler: string;
  category: 'security' | 'compliance' | 'performance' | 'business' | 'technical';
  icon: React.ReactNode;
}

interface RuleEvaluation {
  ruleId: string;
  evaluated: boolean;
  matched: boolean;
  reason: string;
  executionTime: number;
}

interface RequestContext {
  text: string;
  userId: string;
  userRole: 'admin' | 'user' | 'guest' | 'developer';
  requestType: string;
  region: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
  dataClassification: 'public' | 'internal' | 'confidential' | 'restricted';
  complianceRequirements: string[];
}

interface Handler {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
  capabilities: string[];
  restrictions: string[];
}

const HANDLERS: Handler[] = [
  {
    id: 'secure-handler',
    name: 'Secure Processing Handler',
    description: 'GDPR-compliant handler with encryption',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-green-400',
    backgroundColor: 'bg-green-900/20 border-green-500/30',
    capabilities: ['Encryption at rest', 'Audit logging', 'Data anonymization', 'Compliance reports'],
    restrictions: ['EU data only', 'No third-party sharing']
  },
  {
    id: 'fast-handler',
    name: 'High Performance Handler',
    description: 'Optimized for low-latency responses',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-yellow-400',
    backgroundColor: 'bg-yellow-900/20 border-yellow-500/30',
    capabilities: ['<10ms response', 'Caching enabled', 'CDN distribution', 'Parallel processing'],
    restrictions: ['Public data only', 'No complex operations']
  },
  {
    id: 'admin-handler',
    name: 'Administrative Handler',
    description: 'Full access handler for admin operations',
    icon: <Users className="w-5 h-5" />,
    color: 'text-purple-400',
    backgroundColor: 'bg-purple-900/20 border-purple-500/30',
    capabilities: ['Full system access', 'User management', 'Configuration changes', 'Audit access'],
    restrictions: ['Admin users only', 'MFA required']
  },
  {
    id: 'financial-handler',
    name: 'Financial Processing Handler',
    description: 'PCI-DSS compliant financial operations',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-blue-400',
    backgroundColor: 'bg-blue-900/20 border-blue-500/30',
    capabilities: ['Payment processing', 'Transaction logging', 'Fraud detection', 'PCI compliance'],
    restrictions: ['Encrypted connections', 'Tokenized data only']
  },
  {
    id: 'default-handler',
    name: 'Default Handler',
    description: 'General purpose request processing',
    icon: <FileText className="w-5 h-5" />,
    color: 'text-gray-400',
    backgroundColor: 'bg-gray-900/20 border-gray-500/30',
    capabilities: ['Basic processing', 'Standard logging', 'Error handling'],
    restrictions: ['Rate limited', 'No sensitive data']
  }
];

const ROUTING_RULES: RoutingRule[] = [
  {
    id: 'rule-1',
    priority: 1,
    condition: 'dataClassification === "restricted" && region === "EU"',
    description: 'EU restricted data must use secure handler',
    handler: 'secure-handler',
    category: 'compliance',
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: 'rule-2',
    priority: 2,
    condition: 'userRole === "admin" && requestType.includes("admin")',
    description: 'Admin requests require admin handler',
    handler: 'admin-handler',
    category: 'security',
    icon: <Users className="w-4 h-4" />
  },
  {
    id: 'rule-3',
    priority: 3,
    condition: 'requestType.includes("payment") || requestType.includes("transaction")',
    description: 'Financial operations use financial handler',
    handler: 'financial-handler',
    category: 'business',
    icon: <DollarSign className="w-4 h-4" />
  },
  {
    id: 'rule-4',
    priority: 4,
    condition: 'priority === "critical" && dataClassification === "public"',
    description: 'Critical public requests use fast handler',
    handler: 'fast-handler',
    category: 'performance',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'rule-5',
    priority: 5,
    condition: 'complianceRequirements.includes("GDPR")',
    description: 'GDPR compliance requires secure handler',
    handler: 'secure-handler',
    category: 'compliance',
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: 'rule-6',
    priority: 6,
    condition: 'userRole === "developer" && requestType.includes("debug")',
    description: 'Developer debug requests use admin handler',
    handler: 'admin-handler',
    category: 'technical',
    icon: <Code className="w-4 h-4" />
  },
  {
    id: 'rule-7',
    priority: 99,
    condition: 'true',
    description: 'Default fallback rule',
    handler: 'default-handler',
    category: 'technical',
    icon: <FileText className="w-4 h-4" />
  }
];

const SAMPLE_REQUESTS: Array<{
  id: string;
  name: string;
  context: RequestContext;
  expectedHandler: string;
}> = [
  {
    id: 'gdpr-request',
    name: 'GDPR Compliant Data Request',
    context: {
      text: 'Retrieve user personal data for GDPR request',
      userId: 'usr_123',
      userRole: 'user',
      requestType: 'data_retrieval',
      region: 'EU',
      priority: 'normal',
      dataClassification: 'restricted',
      complianceRequirements: ['GDPR', 'Data Protection']
    },
    expectedHandler: 'secure-handler'
  },
  {
    id: 'admin-config',
    name: 'Admin Configuration Change',
    context: {
      text: 'Update system configuration settings',
      userId: 'admin_456',
      userRole: 'admin',
      requestType: 'admin_config_update',
      region: 'US',
      priority: 'high',
      dataClassification: 'internal',
      complianceRequirements: []
    },
    expectedHandler: 'admin-handler'
  },
  {
    id: 'payment-process',
    name: 'Payment Transaction',
    context: {
      text: 'Process credit card payment for order',
      userId: 'usr_789',
      userRole: 'user',
      requestType: 'payment_processing',
      region: 'US',
      priority: 'high',
      dataClassification: 'confidential',
      complianceRequirements: ['PCI-DSS']
    },
    expectedHandler: 'financial-handler'
  },
  {
    id: 'public-api',
    name: 'Public API Call',
    context: {
      text: 'Get public product information',
      userId: 'guest_000',
      userRole: 'guest',
      requestType: 'public_api',
      region: 'Global',
      priority: 'critical',
      dataClassification: 'public',
      complianceRequirements: []
    },
    expectedHandler: 'fast-handler'
  },
  {
    id: 'debug-logs',
    name: 'Developer Debug Request',
    context: {
      text: 'Access debug logs for troubleshooting',
      userId: 'dev_321',
      userRole: 'developer',
      requestType: 'debug_log_access',
      region: 'US',
      priority: 'normal',
      dataClassification: 'internal',
      complianceRequirements: []
    },
    expectedHandler: 'admin-handler'
  }
];

export const RuleBasedRoutingDemo: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState(SAMPLE_REQUESTS[0]);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [evaluatedRules, setEvaluatedRules] = useState<RuleEvaluation[]>([]);
  const [selectedHandler, setSelectedHandler] = useState<Handler | null>(null);
  const [decisionPath, setDecisionPath] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalResult, setFinalResult] = useState<string>('');
  const [speed, setSpeed] = useState(2);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [totalExecutionTime, setTotalExecutionTime] = useState(0);

  const resetDemo = useCallback(() => {
    setCurrentPhase('');
    setIsRunning(false);
    setEvaluatedRules([]);
    setSelectedHandler(null);
    setDecisionPath([]);
    setIsProcessing(false);
    setFinalResult('');
    setExecutionLog([]);
    setTotalExecutionTime(0);
  }, []);

  useEffect(() => {
    resetDemo();
  }, [selectedRequest, resetDemo]);

  const evaluateCondition = (condition: string, context: RequestContext): boolean => {
    try {
      // Create a safe evaluation context
      const evalContext = {
        dataClassification: context.dataClassification,
        region: context.region,
        userRole: context.userRole,
        requestType: context.requestType,
        priority: context.priority,
        complianceRequirements: context.complianceRequirements
      };

      // Build the evaluation function
      const evalFunction = new Function(
        ...Object.keys(evalContext),
        `return ${condition};`
      );

      return evalFunction(...Object.values(evalContext));
    } catch (error) {
      console.error('Rule evaluation error:', error);
      return false;
    }
  };

  const generateResult = (handler: Handler, request: any): string => {
    const results: { [key: string]: { [key: string]: string } } = {
      'secure-handler': {
        'gdpr-request': '**Secure Processing Result:**\n\n🔐 **Security Measures Applied:**\n• End-to-end encryption enabled\n• Data anonymization applied\n• Audit log entry created\n• GDPR compliance verified\n\n**Data Retrieved:**\n• User ID: usr_123 (anonymized)\n• Personal data packaged for GDPR export\n• Retention policy: 30 days\n• Access logged with timestamp\n\n**Compliance Status:**\n✅ GDPR Article 15 (Right of Access)\n✅ Data minimization applied\n✅ Purpose limitation verified\n✅ Audit trail complete',
        'default': 'Request processed with enhanced security measures. All data encrypted and compliance requirements met.'
      },
      'admin-handler': {
        'admin-config': '**Administrative Operation Result:**\n\n⚙️ **Configuration Updated:**\n• Setting: System parameters\n• Changed by: admin_456\n• Timestamp: 2024-01-15 10:30:45 UTC\n• Backup created: config_backup_20240115\n\n**Validation:**\n✅ Admin privileges verified\n✅ MFA authentication passed\n✅ Change management ticket: #ADM-2024-001\n✅ Rollback plan available\n\n**Applied Changes:**\n• Cache TTL: 300s → 600s\n• Rate limit: 1000/min → 1500/min\n• Log level: INFO → DEBUG',
        'debug-logs': '**Debug Access Granted:**\n\n🔍 **Log Access Details:**\n• Developer: dev_321\n• Access level: Debug logs only\n• Time window: Last 24 hours\n• Filtered by: Error and Warning levels\n\n**Retrieved Logs:**\n```\n2024-01-15 09:45:23 [ERROR] Connection timeout to service-b\n2024-01-15 09:46:01 [WARN] High memory usage detected (85%)\n2024-01-15 09:47:15 [ERROR] Database query timeout\n2024-01-15 09:48:30 [WARN] Rate limit approaching threshold\n```\n\n**Access logged for security audit**',
        'default': 'Administrative operation completed with full audit logging.'
      },
      'financial-handler': {
        'payment-process': '**Payment Processing Result:**\n\n💳 **Transaction Details:**\n• Transaction ID: TXN-2024-789456\n• Amount: $99.99 USD\n• Status: APPROVED\n• Authorization: AUTH-123456\n\n**Security Verification:**\n✅ PCI-DSS compliance verified\n✅ Card data tokenized\n✅ 3D Secure authentication passed\n✅ Fraud check: PASSED (Score: 12/100)\n\n**Processing Steps:**\n1. Token validation: Success\n2. Fraud screening: Approved\n3. Payment gateway: Processed\n4. Confirmation sent: Email & SMS\n\n**Compliance:** PCI-DSS Level 1 certified',
        'default': 'Financial transaction processed with full PCI compliance and security measures.'
      },
      'fast-handler': {
        'public-api': '**High-Performance Response:**\n\n⚡ **Performance Metrics:**\n• Response time: 7ms\n• Cache hit: YES\n• CDN location: Edge server (US-West)\n• Compression: gzip enabled\n\n**Data Delivered:**\n```json\n{\n  "products": [\n    {"id": "prod_001", "name": "Widget A", "price": 29.99},\n    {"id": "prod_002", "name": "Widget B", "price": 39.99},\n    {"id": "prod_003", "name": "Widget C", "price": 49.99}\n  ],\n  "cached": true,\n  "ttl": 3600\n}\n```\n\n**Optimization:** Response served from edge cache',
        'default': 'Request processed with optimized performance. Response cached for faster subsequent access.'
      },
      'default-handler': {
        'default': '**Standard Processing Result:**\n\n📄 **Request Processed:**\n• Handler: Default processor\n• Status: Completed\n• Processing time: 45ms\n• Rate limit status: 250/1000 requests\n\n**Basic Operations:**\n✅ Input validation passed\n✅ Standard processing applied\n✅ Response formatted\n✅ Basic logging completed\n\n**Note:** Upgrade to specialized handler for enhanced features'
      }
    };

    const handlerResults = results[handler.id];
    const requestKey = request.id;
    return handlerResults[requestKey] || handlerResults['default'];
  };

  const runRuleBasedRouting = useCallback(async () => {
    setIsRunning(true);
    setExecutionLog(['🚀 Starting rule-based routing evaluation...']);
    const startTime = Date.now();

    // Phase 1: Context Analysis
    setCurrentPhase('context');
    setExecutionLog(prev => [...prev, '📋 Analyzing request context...']);
    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    setExecutionLog(prev => [...prev, `✅ Context loaded: ${selectedRequest.context.userRole} user, ${selectedRequest.context.priority} priority, ${selectedRequest.context.dataClassification} data`]);

    // Phase 2: Rule Evaluation
    setCurrentPhase('evaluation');
    setExecutionLog(prev => [...prev, '⚙️ Evaluating routing rules in priority order...']);

    const evaluations: RuleEvaluation[] = [];
    const path: string[] = [];
    let matchedHandler: Handler | null = null;

    for (const rule of ROUTING_RULES.sort((a, b) => a.priority - b.priority)) {
      await new Promise(resolve => setTimeout(resolve, 500 / speed));

      const ruleStartTime = Date.now();
      const matched = evaluateCondition(rule.condition, selectedRequest.context);
      const ruleExecutionTime = Date.now() - ruleStartTime;

      const evaluation: RuleEvaluation = {
        ruleId: rule.id,
        evaluated: true,
        matched,
        reason: matched ? `Condition "${rule.condition}" matched` : `Condition "${rule.condition}" not matched`,
        executionTime: ruleExecutionTime
      };

      evaluations.push(evaluation);
      setEvaluatedRules([...evaluations]);

      if (matched) {
        path.push(`Rule ${rule.priority}: ${rule.description} → ${rule.handler}`);
        setDecisionPath([...path]);
        setExecutionLog(prev => [...prev, `✅ Rule ${rule.priority} matched: ${rule.description}`]);
        matchedHandler = HANDLERS.find(h => h.id === rule.handler) || null;
        break;
      } else {
        setExecutionLog(prev => [...prev, `❌ Rule ${rule.priority} not matched: ${rule.condition}`]);
      }
    }

    // Phase 3: Handler Assignment
    setCurrentPhase('assignment');
    setExecutionLog(prev => [...prev, '🎯 Assigning request to handler...']);
    await new Promise(resolve => setTimeout(resolve, 600 / speed));

    if (matchedHandler) {
      setSelectedHandler(matchedHandler);
      setExecutionLog(prev => [...prev, `✅ Handler selected: ${matchedHandler.name}`]);
    } else {
      const defaultHandler = HANDLERS.find(h => h.id === 'default-handler')!;
      setSelectedHandler(defaultHandler);
      setExecutionLog(prev => [...prev, `⚠️ No rules matched, using default handler`]);
    }

    // Phase 4: Processing
    setCurrentPhase('processing');
    setIsProcessing(true);
    setExecutionLog(prev => [...prev, `⚡ Processing request with ${matchedHandler?.name || 'default handler'}...`]);

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    if (matchedHandler) {
      // Log handler capabilities
      matchedHandler.capabilities.forEach(capability => {
        setExecutionLog(prev => [...prev, `  → ${capability}`]);
      });
    }

    // Generate result
    const result = generateResult(matchedHandler || HANDLERS.find(h => h.id === 'default-handler')!, selectedRequest);
    setFinalResult(result);
    setIsProcessing(false);

    const totalTime = Date.now() - startTime;
    setTotalExecutionTime(totalTime);
    setExecutionLog(prev => [...prev, `✅ Processing complete in ${totalTime}ms`]);

    setCurrentPhase('complete');
    setIsRunning(false);
    setExecutionLog(prev => [...prev, '🎯 Rule-based routing completed successfully!']);
  }, [selectedRequest, speed]);

  const getPhaseStatus = (phase: string) => {
    if (currentPhase === phase) return 'border-blue-500 bg-blue-900/20';
    if (currentPhase === 'complete' ||
        (phase === 'context' && (currentPhase === 'evaluation' || currentPhase === 'assignment' || currentPhase === 'processing')) ||
        (phase === 'evaluation' && (currentPhase === 'assignment' || currentPhase === 'processing')) ||
        (phase === 'assignment' && currentPhase === 'processing')) {
      return 'border-green-500 bg-green-900/20';
    }
    return 'border-gray-600 bg-gray-800/20';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'text-red-400';
      case 'compliance': return 'text-green-400';
      case 'performance': return 'text-yellow-400';
      case 'business': return 'text-blue-400';
      case 'technical': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">📋</span>
          Rule-based Routing Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how deterministic rules evaluate conditions and route requests to appropriate handlers with full auditability.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sample Request
            </label>
            <select
              value={selectedRequest.id}
              onChange={(e) => {
                const request = SAMPLE_REQUESTS.find(r => r.id === e.target.value);
                if (request) setSelectedRequest(request);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAMPLE_REQUESTS.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Evaluation Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>

          <div className="flex items-end">
            <div className="flex space-x-2">
              <button
                onClick={runRuleBasedRouting}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  isRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Evaluating...' : 'Start Routing'}
              </button>

              <button
                onClick={resetDemo}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Request Context */}
        <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
          <h4 className="font-medium text-white mb-3">Request Context</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-400">User Role:</span>
              <span className="ml-2 text-blue-400 font-mono">{selectedRequest.context.userRole}</span>
            </div>
            <div>
              <span className="text-gray-400">Priority:</span>
              <span className="ml-2 text-yellow-400 font-mono">{selectedRequest.context.priority}</span>
            </div>
            <div>
              <span className="text-gray-400">Data Class:</span>
              <span className="ml-2 text-purple-400 font-mono">{selectedRequest.context.dataClassification}</span>
            </div>
            <div>
              <span className="text-gray-400">Region:</span>
              <span className="ml-2 text-green-400 font-mono">{selectedRequest.context.region}</span>
            </div>
          </div>
          {selectedRequest.context.complianceRequirements.length > 0 && (
            <div className="mt-2">
              <span className="text-gray-400 text-sm">Compliance:</span>
              {selectedRequest.context.complianceRequirements.map((req, idx) => (
                <span key={idx} className="ml-2 text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                  {req}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Pipeline */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Rule Evaluation Pipeline</h3>

          {/* Processing Phases */}
          <div className="space-y-4 mb-6">
            {/* Context Loading */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('context')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Context Loading
                </h4>
                {currentPhase === 'context' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['evaluation', 'assignment', 'processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            </div>

            {/* Rule Evaluation */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('evaluation')}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Rule Evaluation (Priority Order)
                </h4>
                {currentPhase === 'evaluation' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['assignment', 'processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {evaluatedRules.length > 0 && (
                <div className="space-y-2">
                  {evaluatedRules.map((evaluation) => {
                    const rule = ROUTING_RULES.find(r => r.id === evaluation.ruleId);
                    return (
                      <div key={evaluation.ruleId} className="flex items-center gap-2 text-sm">
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${evaluation.matched ? 'bg-green-600' : 'bg-gray-600'}`}>
                          {evaluation.matched ? <CheckCircle className="w-3 h-3 text-white" /> : <XCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={getCategoryColor(rule?.category || '')}>
                          {rule?.icon}
                        </span>
                        <span className="flex-1 text-gray-300">
                          Rule {rule?.priority}: {rule?.description}
                        </span>
                        <span className="text-xs text-gray-500">{evaluation.executionTime}ms</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Handler Assignment */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('assignment')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Handler Assignment
                </h4>
                {currentPhase === 'assignment' && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {['processing', 'complete'].includes(currentPhase) && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedHandler && (
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${selectedHandler.color === 'text-green-400' ? 'bg-green-600' : selectedHandler.color === 'text-yellow-400' ? 'bg-yellow-600' : selectedHandler.color === 'text-purple-400' ? 'bg-purple-600' : selectedHandler.color === 'text-blue-400' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                    {selectedHandler.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{selectedHandler.name}</div>
                    <div className="text-sm text-gray-400">{selectedHandler.description}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Processing */}
            <div className={`p-4 rounded-lg border transition-all ${getPhaseStatus('processing')}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Request Processing
                </h4>
                {isProcessing && <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
                {currentPhase === 'complete' && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
              {selectedHandler && isProcessing && (
                <div className="text-sm text-gray-300">
                  Processing with {selectedHandler.name}...
                </div>
              )}
            </div>
          </div>

          {/* Routing Rules */}
          <div>
            <h4 className="font-medium text-white mb-3">Routing Rules (Priority Order)</h4>
            <div className="space-y-2">
              {ROUTING_RULES.sort((a, b) => a.priority - b.priority).slice(0, 6).map((rule) => (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg border transition-all ${
                    evaluatedRules.find(e => e.ruleId === rule.id && e.matched)
                      ? 'border-green-500 bg-green-900/20'
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-1 rounded ${getCategoryColor(rule.category)}`}>
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">Priority {rule.priority}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(rule.category)} bg-gray-700`}>
                          {rule.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 font-mono bg-gray-900/50 px-2 py-1 rounded">
                        {rule.condition}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">→ {rule.handler}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Log & Results */}
        <div className="space-y-6">
          {/* Decision Path */}
          {decisionPath.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Decision Path</h3>
              <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
                {decisionPath.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{step}</span>
                  </div>
                ))}
                {totalExecutionTime > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <span className="text-xs text-gray-400">Total execution time: </span>
                    <span className="text-xs text-yellow-400 font-mono">{totalExecutionTime}ms</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Execution Log */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-48 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-400 text-center text-sm mt-8">
                  Execution log will appear here...
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-gray-300 font-mono">
                      <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Final Result */}
          {finalResult && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Processing Result</h3>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {selectedHandler?.icon}
                  <span className="font-medium text-white">{selectedHandler?.name}</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">ROUTED</span>
                </div>
                <div className="text-sm text-gray-200 whitespace-pre-line">
                  {finalResult}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuleBasedRoutingDemo;