'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle, GitBranch, ArrowRight, XCircle } from 'lucide-react';

interface ConditionalPath {
  id: string;
  title: string;
  description: string;
  condition: string;
  steps: ConditionalStep[];
  isActive: boolean;
  probability: number;
  color: string;
}

interface ConditionalStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  input?: string;
  output?: string;
  processingTime?: number;
}

interface ConditionalScenario {
  id: string;
  name: string;
  description: string;
  initialInput: string;
  classificationPhase: {
    description: string;
    factors: string[];
  };
  paths: ConditionalPath[];
}

const SCENARIOS: ConditionalScenario[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Routing',
    description: 'Route customer requests to appropriate support channels based on issue classification',
    initialInput: 'Hi, I\'m having trouble with my AI chatbot integration. The API calls are returning 500 errors and my authentication tokens seem to be expiring every few minutes. This is affecting our production system.',
    classificationPhase: {
      description: 'Analyze request content to determine issue type and routing decision',
      factors: ['Technical keywords', 'Urgency indicators', 'Customer expertise level', 'Business impact']
    },
    paths: [
      {
        id: 'technical',
        title: 'Technical Support Path',
        description: 'Advanced technical issues requiring specialized knowledge',
        condition: 'Technical complexity score > 70 AND contains API/integration keywords',
        isActive: false,
        probability: 0,
        color: 'bg-green-500',
        steps: [
          {
            id: 'diagnosis',
            title: 'Technical Diagnosis',
            description: 'Analyze logs and identify root cause',
            status: 'pending'
          },
          {
            id: 'solution',
            title: 'Solution Development',
            description: 'Create technical solution with code examples',
            status: 'pending'
          },
          {
            id: 'complexity-check',
            title: 'Complexity Assessment',
            description: 'Determine if escalation to human expert is needed',
            status: 'pending'
          }
        ]
      },
      {
        id: 'billing',
        title: 'Billing Support Path',
        description: 'Payment, subscription, and account-related issues',
        condition: 'Contains billing/payment keywords AND low technical complexity',
        isActive: false,
        probability: 0,
        color: 'bg-blue-500',
        steps: [
          {
            id: 'account-review',
            title: 'Account Review',
            description: 'Check account status and billing history',
            status: 'pending'
          },
          {
            id: 'payment-resolution',
            title: 'Payment Resolution',
            description: 'Resolve billing issues and update account',
            status: 'pending'
          }
        ]
      },
      {
        id: 'general',
        title: 'General Support Path',
        description: 'Usage questions and general guidance',
        condition: 'Low technical complexity AND no billing indicators',
        isActive: false,
        probability: 0,
        color: 'bg-purple-500',
        steps: [
          {
            id: 'guide-provision',
            title: 'Usage Guide',
            description: 'Provide relevant documentation and tutorials',
            status: 'pending'
          },
          {
            id: 'followup',
            title: 'Follow-up Check',
            description: 'Ensure customer satisfaction and offer additional help',
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'content-moderation',
    name: 'Content Moderation System',
    description: 'Automatically classify and route content based on moderation requirements',
    initialInput: 'User-generated post: "This is a great product review! I love how it helped me automate my workflow. The customer service team was also incredibly helpful when I had questions. Highly recommend to other businesses looking to streamline operations."',
    classificationPhase: {
      description: 'Analyze content for policy violations, spam, or quality issues',
      factors: ['Sentiment analysis', 'Spam indicators', 'Policy violation keywords', 'Content quality score']
    },
    paths: [
      {
        id: 'auto-approve',
        title: 'Auto-Approval Path',
        description: 'High-quality content that meets all guidelines',
        condition: 'Quality score > 85 AND no policy violations AND positive sentiment',
        isActive: false,
        probability: 0,
        color: 'bg-green-500',
        steps: [
          {
            id: 'quality-confirm',
            title: 'Quality Confirmation',
            description: 'Final quality check and metadata tagging',
            status: 'pending'
          },
          {
            id: 'publish',
            title: 'Auto-Publish',
            description: 'Publish content with appropriate visibility settings',
            status: 'pending'
          }
        ]
      },
      {
        id: 'human-review',
        title: 'Human Review Path',
        description: 'Content requiring manual moderation review',
        condition: 'Quality score 40-85 OR potential policy issues detected',
        isActive: false,
        probability: 0,
        color: 'bg-yellow-500',
        steps: [
          {
            id: 'queue-review',
            title: 'Queue for Review',
            description: 'Add to human moderator queue with priority score',
            status: 'pending'
          },
          {
            id: 'context-prepare',
            title: 'Context Preparation',
            description: 'Prepare context and recommendation for moderator',
            status: 'pending'
          }
        ]
      },
      {
        id: 'auto-reject',
        title: 'Auto-Rejection Path',
        description: 'Content that clearly violates policies',
        condition: 'Quality score < 40 OR high-confidence policy violations',
        isActive: false,
        probability: 0,
        color: 'bg-red-500',
        steps: [
          {
            id: 'violation-log',
            title: 'Violation Logging',
            description: 'Log policy violation details and user action',
            status: 'pending'
          },
          {
            id: 'user-notify',
            title: 'User Notification',
            description: 'Send explanation and improvement suggestions',
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'investment-advice',
    name: 'Investment Advisory System',
    description: 'Provide personalized investment recommendations based on risk assessment',
    initialInput: 'I\'m 28 years old, make $85k annually, have $15k saved, and want to start investing. I\'m comfortable with some risk but don\'t want to lose everything. I\'m planning to buy a house in 5-7 years.',
    classificationPhase: {
      description: 'Assess risk tolerance, investment timeline, and financial goals',
      factors: ['Age and income', 'Risk tolerance', 'Investment timeline', 'Financial goals', 'Current savings']
    },
    paths: [
      {
        id: 'conservative',
        title: 'Conservative Investment Path',
        description: 'Low-risk, steady growth strategy',
        condition: 'Low risk tolerance OR short timeline (<3 years)',
        isActive: false,
        probability: 0,
        color: 'bg-blue-500',
        steps: [
          {
            id: 'bond-allocation',
            title: 'Bond Portfolio Design',
            description: 'Create bond-heavy portfolio with stable returns',
            status: 'pending'
          },
          {
            id: 'safety-review',
            title: 'Safety Assessment',
            description: 'Ensure capital preservation and liquidity',
            status: 'pending'
          }
        ]
      },
      {
        id: 'balanced',
        title: 'Balanced Growth Path',
        description: 'Moderate risk with balanced stock/bond allocation',
        condition: 'Medium risk tolerance AND 3-10 year timeline',
        isActive: false,
        probability: 0,
        color: 'bg-green-500',
        steps: [
          {
            id: 'portfolio-mix',
            title: 'Balanced Portfolio',
            description: 'Design 60/40 stock/bond allocation strategy',
            status: 'pending'
          },
          {
            id: 'rebalancing',
            title: 'Rebalancing Plan',
            description: 'Create automated rebalancing schedule',
            status: 'pending'
          },
          {
            id: 'goal-tracking',
            title: 'Goal Alignment',
            description: 'Align investments with house purchase timeline',
            status: 'pending'
          }
        ]
      },
      {
        id: 'aggressive',
        title: 'Aggressive Growth Path',
        description: 'High-risk, high-reward strategy for long-term growth',
        condition: 'High risk tolerance AND long timeline (>10 years)',
        isActive: false,
        probability: 0,
        color: 'bg-purple-500',
        steps: [
          {
            id: 'growth-stocks',
            title: 'Growth Stock Strategy',
            description: 'Focus on high-growth potential investments',
            status: 'pending'
          },
          {
            id: 'diversification',
            title: 'Risk Diversification',
            description: 'Spread risk across sectors and geographies',
            status: 'pending'
          }
        ]
      }
    ]
  }
];

const generateStepOutput = (step: ConditionalStep, pathId: string, scenario: string): string => {
  const outputs: { [key: string]: { [pathId: string]: { [stepId: string]: string } } } = {
    'customer-support': {
      'technical': {
        'diagnosis': 'Technical Diagnosis Results:\n\n**Root Cause Analysis:**\n• API 500 errors caused by server overload during peak hours\n• Authentication tokens expiring due to incorrect refresh mechanism\n• Missing rate limiting configuration in client code\n• Server scaling issues under high load\n\n**Issue Severity:** Medium-High\n**Estimated Fix Time:** 2-4 hours\n**Components Affected:** Authentication service, API gateway, client SDK\n\n**Next Steps:**\n1. Fix token refresh logic in client SDK\n2. Implement proper retry mechanism\n3. Update server scaling configuration\n4. Provide updated documentation',
        'solution': 'Technical Solution Package:\n\n**1. Updated Authentication Code:**\n```javascript\nclass APIClient {\n  async refreshToken() {\n    try {\n      const response = await fetch(\'refreshEndpoint\', {\n        method: \'POST\',\n        headers: { \'Authorization\': `Bearer ${this.refreshToken}` }\n      });\n      \n      if (!response.ok) throw new Error(\'Refresh failed\');\n      \n      const { accessToken, expiresIn } = await response.json();\n      this.scheduleTokenRefresh(expiresIn * 0.9);\n      return accessToken;\n    } catch (error) {\n      console.error(\'Token refresh failed:\', error);\n    }\n  }\n}\n```\n\n**2. Server Configuration Updates:**\n• Auto-scaling thresholds increased\n• Health check endpoints added\n• Error handling improved\n\n**3. Documentation Package:**\n• Authentication best practices guide\n• Error handling examples\n• Production deployment checklist',
        'complexity-check': 'Complexity Assessment Results:\n\n**Solution Evaluation:**\n• Issue complexity: Medium (well-documented solution exists)\n• Implementation difficulty: Low-Medium (requires code changes but straightforward)\n• Customer technical level: High (capable of implementing provided solution)\n• Risk level: Low (tested solution approach)\n\n**Decision: RESOLVED**\n✅ Issue can be resolved with provided documentation and code fixes\n\n**Resolution Summary:**\n• Complete technical solution provided\n• Implementation time: 2-4 hours\n• Follow-up scheduled in 48 hours\n• Customer satisfaction survey sent\n\n**No escalation required** - Solution addresses all identified issues with clear implementation path.'
      }
    },
    'content-moderation': {
      'auto-approve': {
        'quality-confirm': 'Quality Confirmation Results:\n\n**Content Analysis:**\n• Sentiment: Positive (0.92 confidence)\n• Language quality: Excellent (no grammatical errors)\n• Helpfulness score: 8.7/10\n• Authenticity indicators: High (personal experience details)\n• Spam probability: <1%\n\n**Policy Compliance:**\n• No policy violations detected\n• No prohibited content found\n• Appropriate business context\n• Constructive and informative tone\n\n**Metadata Tags Applied:**\n• Category: Product Review\n• Sentiment: Positive\n• Quality: High\n• Review type: Business/Professional\n• Helpful vote eligible: Yes\n\n**Final Quality Score: 94/100**\n✅ Content approved for immediate publication',
        'publish': 'Auto-Publication Complete:\n\n**Publication Details:**\n• Published: Yes ✅\n• Visibility: Public\n• Search indexing: Enabled\n• User notifications: Sent\n• Review aggregation: Updated\n\n**Content Metrics:**\n• Expected reach: 500-1000 views\n• Engagement prediction: High\n• SEO value: Positive\n• Brand sentiment impact: +0.3\n\n**Automated Actions:**\n• Added to featured reviews queue\n• Included in product recommendation algorithm\n• User credited with quality contribution points\n• Similar content suggestions updated\n\n**Post-Publication Monitoring:**\n• Engagement tracking: Active\n• User feedback collection: Enabled\n• Quality maintenance: Automated'
      }
    },
    'investment-advice': {
      'balanced': {
        'portfolio-mix': 'Balanced Portfolio Recommendation:\n\n**Recommended Asset Allocation:**\n• US Stock Market (Total Market Index): 35%\n• International Stocks (Developed Markets): 15%\n• Emerging Markets: 10%\n• US Bonds (Aggregate Bond Index): 30%\n• Real Estate Investment Trusts (REITs): 10%\n\n**Expected Annual Returns:**\n• Conservative estimate: 6-7%\n• Moderate estimate: 7-9%\n• Historical average: 8.2%\n\n**Risk Profile:**\n• Volatility: Moderate\n• Maximum expected annual loss: -15%\n• Time to recovery from major losses: 2-3 years\n\n**Initial Investment Plan:**\n• Emergency fund: Keep $10k in high-yield savings\n• Initial investment: $5k spread across allocation\n• Monthly contributions: $500-750 (based on budget)\n\n**Platform Recommendations:**\n• Vanguard: Low-cost index funds\n• Fidelity: Zero-fee funds available\n• Charles Schwab: Excellent research tools',
        'rebalancing': 'Automated Rebalancing Strategy:\n\n**Rebalancing Schedule:**\n• Frequency: Quarterly (every 3 months)\n• Trigger: When any asset class deviates >5% from target\n• Method: Sell high-performing, buy underperforming assets\n\n**Tax-Efficient Rebalancing:**\n• Use new contributions for rebalancing when possible\n• Harvest tax losses in taxable accounts\n• Prioritize rebalancing in tax-advantaged accounts\n\n**Automated Features:**\n• Auto-rebalancing: Enabled\n• Dividend reinvestment: Enabled\n• Tax-loss harvesting: Enabled (if available)\n\n**Monitoring Thresholds:**\n• Minor adjustment: ±5% from target\n• Major rebalancing: ±10% from target\n• Emergency review: ±15% from target\n\n**Annual Review Process:**\n• Portfolio performance assessment\n• Risk tolerance re-evaluation\n• Goal progress tracking\n• Allocation adjustments if needed',
        'goal-tracking': 'House Purchase Goal Alignment:\n\n**Timeline Analysis:**\n• Target timeline: 5-7 years\n• Investment horizon: Suitable for moderate risk\n• Required down payment: $60-80k (assumed)\n\n**Projected Portfolio Growth:**\n• Year 1: $8,500 (with $500/month contributions)\n• Year 3: $25,200\n• Year 5: $45,800\n• Year 7: $70,400\n\n**Goal Achievement Probability:**\n• Conservative scenario (6% returns): 85% likely to reach $60k\n• Moderate scenario (7.5% returns): 95% likely to reach $70k\n• Growth scenario (9% returns): 99% likely to reach $80k+\n\n**Risk Management for House Goal:**\n• Years 5-7: Gradually shift to more conservative allocation\n• Final 2 years: Move 50% to stable bonds/CDs\n• Emergency fund: Maintain separate $15k buffer\n\n**Milestone Checkpoints:**\n• Year 2: $15k target (on track assessment)\n• Year 4: $35k target (rebalancing review)\n• Year 6: $55k target (begin conservative shift)\n\n**Backup Plans:**\n• If behind target: Increase contributions or extend timeline\n• If ahead of target: Consider additional real estate markets\n• Market downturn: Delay purchase 1-2 years if needed'
      }
    }
  };

  const scenarioOutputs = outputs[scenario]?.[pathId] || {};
  return scenarioOutputs[step.id] || `${step.title} completed successfully.\n\nDetailed processing results for ${step.description.toLowerCase()}.`;
};

export const ConditionalChainingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ConditionalScenario>(SCENARIOS[0]);
  const [paths, setPaths] = useState<ConditionalPath[]>(SCENARIOS[0].paths);
  const [isRunning, setIsRunning] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1.5);
  const [classificationResult, setClassificationResult] = useState<string>('');

  const resetDemo = useCallback(() => {
    const resetPaths = selectedScenario.paths.map(path => ({
      ...path,
      isActive: false,
      probability: 0,
      steps: path.steps.map(step => ({
        ...step,
        status: 'pending' as const,
        input: undefined,
        output: undefined,
        processingTime: undefined
      }))
    }));
    
    setPaths(resetPaths);
    setIsRunning(false);
    setIsClassifying(false);
    setSelectedPath('');
    setExecutionLog([]);
    setClassificationResult('');
  }, [selectedScenario]);

  const classifyRequest = async (): Promise<string> => {
    setIsClassifying(true);
    setExecutionLog(prev => [...prev, '🔍 Analyzing request and determining optimal path...']);

    await new Promise(resolve => setTimeout(resolve, 2500 / speed));

    // Simulate classification logic based on scenario
    let selectedPathId = '';
    let probabilities: { [key: string]: number } = {};

    if (selectedScenario.id === 'customer-support') {
      probabilities = { technical: 92, billing: 5, general: 3 };
      selectedPathId = 'technical';
    } else if (selectedScenario.id === 'content-moderation') {
      probabilities = { 'auto-approve': 89, 'human-review': 8, 'auto-reject': 3 };
      selectedPathId = 'auto-approve';
    } else if (selectedScenario.id === 'investment-advice') {
      probabilities = { conservative: 15, balanced: 78, aggressive: 7 };
      selectedPathId = 'balanced';
    }

    // Update path probabilities and activate selected path
    setPaths(prev => prev.map(path => ({
      ...path,
      probability: probabilities[path.id] || 0,
      isActive: path.id === selectedPathId
    })));

    const selectedPathObj = selectedScenario.paths.find(p => p.id === selectedPathId);
    const classificationOutput = generateClassificationResult(selectedScenario.id, selectedPathId, probabilities);
    
    setClassificationResult(classificationOutput);
    setExecutionLog(prev => [...prev, `✅ Classification complete: ${selectedPathObj?.title} selected (${probabilities[selectedPathId]}% confidence)`]);
    setIsClassifying(false);
    
    return selectedPathId;
  };

  const generateClassificationResult = (scenarioId: string, selectedPathId: string, probabilities: { [key: string]: number }): string => {
    const results: { [key: string]: { [pathId: string]: string } } = {
      'customer-support': {
        'technical': 'Request Classification Results:\n\n**Content Analysis:**\n• Technical keywords detected: API, 500 errors, authentication, tokens, integration\n• Urgency indicators: "production system affected"\n• Expertise level: High (technical language, specific error codes)\n• Business impact: High (production environment)\n\n**Routing Scores:**\n• Technical Support: 92% (API errors, authentication issues, production impact)\n• Billing Support: 5% (no payment/subscription mentions)\n• General Support: 3% (minimal general inquiry indicators)\n\n**Decision Factors:**\n• Primary: Technical complexity and specific error types\n• Secondary: Production environment impact\n• Tertiary: Customer technical expertise level\n\n**Routing Decision: Technical Support Path**\nHigh confidence routing based on clear technical indicators and production urgency.'
      },
      'content-moderation': {
        'auto-approve': 'Content Moderation Analysis:\n\n**Quality Assessment:**\n• Language quality: Excellent (proper grammar, clear expression)\n• Content length: Appropriate (detailed but concise)\n• Sentiment analysis: Positive (0.92 confidence)\n• Authenticity score: High (personal experience indicators)\n\n**Policy Compliance Check:**\n• Spam indicators: None detected\n• Prohibited content: None found\n• Community guidelines: Fully compliant\n• Brand safety: Positive brand association\n\n**Classification Scores:**\n• Auto-Approve: 89% (high quality, policy compliant)\n• Human Review: 8% (borderline cases, minor uncertainty)\n• Auto-Reject: 3% (very low violation probability)\n\n**Decision: Auto-Approval Path**\nContent meets all quality standards and policy requirements for immediate publication.'
      },
      'investment-advice': {
        'balanced': 'Investment Profile Assessment:\n\n**Risk Analysis:**\n• Age factor: 28 years old (long investment horizon available)\n• Income stability: $85k annual (good capacity for regular investment)\n• Risk tolerance: Moderate ("comfortable with some risk but don\'t want to lose everything")\n• Timeline: 5-7 years (medium-term investment horizon)\n\n**Goal Analysis:**\n• Primary goal: House purchase (specific timeline and amount needed)\n• Secondary goal: Long-term wealth building\n• Liquidity needs: Moderate (house down payment requirement)\n\n**Path Suitability Scores:**\n• Conservative: 15% (too low growth for timeline and age)\n• Balanced: 78% (perfect match for risk tolerance and timeline)\n• Aggressive: 7% (too risky given house purchase goal)\n\n**Recommendation: Balanced Growth Path**\nOptimal balance of growth potential and risk management for stated goals and timeline.'
      }
    };

    return results[scenarioId]?.[selectedPathId] || 'Classification analysis completed with path selection based on input criteria.';
  };

  const executeStep = async (pathId: string, stepIndex: number): Promise<void> => {
    const path = paths.find(p => p.id === pathId);
    if (!path || stepIndex >= path.steps.length) return;

    const step = path.steps[stepIndex];
    
    // Start execution
    setPaths(prev => prev.map(p => 
      p.id === pathId 
        ? {
            ...p,
            steps: p.steps.map((s, i) => 
              i === stepIndex 
                ? { ...s, status: 'in-progress', input: selectedScenario.initialInput }
                : s
            )
          }
        : p
    ));

    setExecutionLog(prev => [...prev, `🔄 Executing: ${step.title} (${path.title})`]);

    const processingTime = (2000 + Math.random() * 2000) / speed;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    const output = generateStepOutput(step, pathId, selectedScenario.id);

    setPaths(prev => prev.map(p => 
      p.id === pathId 
        ? {
            ...p,
            steps: p.steps.map((s, i) => 
              i === stepIndex 
                ? { 
                    ...s, 
                    status: 'completed', 
                    output, 
                    processingTime: processingTime / 1000
                  }
                : s
            )
          }
        : p
    ));

    setExecutionLog(prev => [...prev, `✅ Completed: ${step.title} (${(processingTime / 1000).toFixed(1)}s)`]);
  };

  const runConditionalChain = async () => {
    setIsRunning(true);
    resetDemo();
    
    setExecutionLog(['🚀 Starting conditional chain execution...']);
    
    // Classification phase
    const selectedPathId = await classifyRequest();
    setSelectedPath(selectedPathId);
    
    // Mark non-selected paths as skipped
    setPaths(prev => prev.map(path => ({
      ...path,
      steps: path.id !== selectedPathId 
        ? path.steps.map(step => ({ ...step, status: 'skipped' as const }))
        : path.steps
    })));

    await new Promise(resolve => setTimeout(resolve, 500));

    // Execute selected path
    const selectedPathObj = paths.find(p => p.id === selectedPathId);
    if (selectedPathObj) {
      for (let i = 0; i < selectedPathObj.steps.length; i++) {
        await executeStep(selectedPathId, i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    setExecutionLog(prev => [...prev, '🎉 Conditional chain execution completed!']);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'skipped': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>;
    }
  };

  const getPathBorderStyle = (path: ConditionalPath) => {
    if (path.isActive) return 'border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20';
    if (path.probability > 0) return 'border-yellow-500 bg-yellow-900/10';
    return 'border-gray-600 bg-gray-800/20';
  };

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">🔀</span>
          Conditional Chaining Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch how requests are analyzed and routed to different execution paths based on conditional logic and classification results.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Execution Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={runConditionalChain}
            disabled={isRunning}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
              isRunning
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Running...' : 'Start Conditional Chain'}
          </button>
          
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conditional Flow */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            Conditional Flow Execution
            <GitBranch className="w-5 h-5 ml-2 text-blue-400" />
          </h3>
          
          {/* Initial Input */}
          <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-gray-300 mb-2">Initial Input</h4>
            <div className="text-sm text-gray-200">{selectedScenario.initialInput}</div>
          </div>

          {/* Classification Phase */}
          <div className={`mb-6 p-4 rounded-lg border transition-all ${
            isClassifying 
              ? 'border-blue-500 bg-blue-900/20' 
              : classificationResult 
                ? 'border-green-500 bg-green-900/10' 
                : 'border-gray-600/50 bg-gray-800/30'
          }`}>
            <div className="flex items-center mb-3">
              {isClassifying ? (
                <Clock className="w-5 h-5 text-blue-400 animate-spin mr-3" />
              ) : classificationResult ? (
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"></div>
              )}
              <h4 className="font-medium text-white">Classification & Routing</h4>
            </div>
            
            <p className="text-sm text-gray-300 mb-3">{selectedScenario.classificationPhase.description}</p>
            
            <div className="mb-3">
              <span className="text-xs font-medium text-gray-400">ANALYSIS FACTORS:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedScenario.classificationPhase.factors.map((factor, index) => (
                  <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {classificationResult && (
              <div>
                <h5 className="text-xs font-medium text-gray-400 mb-1">CLASSIFICATION RESULT:</h5>
                <div className="text-xs text-gray-200 bg-gray-800/40 p-3 rounded border-l-2 border-blue-400 max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans">{classificationResult}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Conditional Paths */}
          <div className="space-y-4">
            {paths.map((path) => (
              <div key={path.id} className={`p-4 rounded-lg border transition-all ${getPathBorderStyle(path)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${path.color} mr-3`}></div>
                    <h4 className="font-medium text-white">{path.title}</h4>
                    {path.isActive && (
                      <span className="ml-2 text-xs bg-green-600 px-2 py-1 rounded text-white">
                        SELECTED
                      </span>
                    )}
                  </div>
                  {path.probability > 0 && (
                    <span className="text-sm text-gray-300">
                      {path.probability}% confidence
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-2">{path.description}</p>
                
                <div className="text-xs text-gray-400 mb-3">
                  <strong>Condition:</strong> {path.condition}
                </div>

                {/* Path Steps */}
                <div className="space-y-2">
                  {path.steps.map((step, stepIndex) => (
                    <div key={step.id} className={`flex items-center p-2 rounded ${
                      step.status === 'skipped' ? 'opacity-40' : ''
                    }`}>
                      <div className="mr-3">{getStatusIcon(step.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{step.title}</span>
                          {step.processingTime && (
                            <span className="text-xs text-gray-400">
                              {step.processingTime.toFixed(1)}s
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-300">{step.description}</p>
                        
                        {step.output && (
                          <div className="mt-2">
                            <div className="text-xs text-gray-200 bg-gray-800/40 p-2 rounded border-l-2 border-green-400 max-h-24 overflow-y-auto">
                              <pre className="whitespace-pre-wrap font-sans">
                                {step.output.length > 150 
                                  ? `${step.output.substring(0, 150)}...` 
                                  : step.output
                                }
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Log & Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto mb-6">
            {executionLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                Execution log will appear here...
              </div>
            ) : (
              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="text-sm font-mono">
                    <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                    <span className="text-gray-300 ml-2">{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Path Probabilities */}
          {paths.some(p => p.probability > 0) && (
            <div className="p-4 bg-gray-800/20 rounded-lg border border-gray-600/50 mb-4">
              <h4 className="font-medium text-white mb-2">Path Probabilities</h4>
              <div className="space-y-2">
                {paths.map((path) => (
                  <div key={path.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${path.color} mr-2`}></div>
                      <span className="text-sm text-gray-300">{path.title}</span>
                    </div>
                    <span className={`text-sm ${
                      path.isActive ? 'text-green-400 font-medium' : 'text-gray-400'
                    }`}>
                      {path.probability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scenario Info */}
          <div className="p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-white mb-2">About This Scenario</h4>
            <p className="text-sm text-gray-300">{selectedScenario.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionalChainingDemo; 