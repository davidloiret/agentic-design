import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const llmBasedRoutingPattern: PatternScenario = {
  id: 'llm-based-routing',
  title: 'LLM-Based Routing Pattern',
  description: 'Demonstrates intelligent routing using LLM for intent classification and decision-making',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Incoming Query\n"My credit card was charged twice"' },
      style: { ...nodeStyle, minWidth: 250 }
    },
    {
      id: 'llm-router',
      type: 'default',
      position: { x: 375, y: 180 },
      data: { label: '🧠 LLM Router\nIntent Classification & Analysis' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 300 }
    },
    {
      id: 'intent-analysis',
      type: 'default',
      position: { x: 50, y: 280 },
      data: { label: 'Intent Analysis\n• Category: Billing\n• Urgency: High\n• Confidence: 92%' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    },
    // Route options
    {
      id: 'billing-route',
      type: 'default',
      position: { x: 100, y: 420 },
      data: { label: '💳 Billing Team\nPayment & Subscription Issues' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 }
    },
    {
      id: 'technical-route',
      type: 'default',
      position: { x: 350, y: 420 },
      data: { label: '🔧 Technical Support\nProduct Issues & Bugs' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    {
      id: 'sales-route',
      type: 'default',
      position: { x: 600, y: 420 },
      data: { label: '📦 Sales Team\nPricing & Upgrades' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    // Processing nodes
    {
      id: 'billing-processor',
      type: 'default',
      position: { x: 100, y: 550 },
      data: { label: 'Process Billing Request\n• Verify duplicate charge\n• Initiate refund\n• Send confirmation' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 680 },
      data: { label: 'Response to User\n"Refund initiated for duplicate charge"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 250 }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-llm',
      source: 'input',
      target: 'llm-router',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-llm-analysis',
      source: 'llm-router',
      target: 'intent-analysis',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Analyze'
    },
    // Routing decision edges
    {
      id: 'e-llm-billing',
      source: 'llm-router',
      target: 'billing-route',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      label: '92% confidence'
    },
    {
      id: 'e-llm-technical',
      source: 'llm-router',
      target: 'technical-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '5% confidence'
    },
    {
      id: 'e-llm-sales',
      source: 'llm-router',
      target: 'sales-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '3% confidence'
    },
    {
      id: 'e-billing-processor',
      source: 'billing-route',
      target: 'billing-processor',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true
    },
    {
      id: 'e-processor-output',
      source: 'billing-processor',
      target: 'output',
      style: edgeStyle
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Query Received',
      description: 'User submits a query that needs to be routed to the appropriate handler.',
      input: 'User Query: "My credit card was charged twice for the same subscription"',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'LLM Router Activation',
      description: 'The LLM router receives the query and begins analysis to determine the appropriate route.',
      input: 'Query sent to LLM with routing prompt:\n"Classify this query into one of: billing, technical, sales, security, general"',
      activeNodes: ['input', 'llm-router'],
      activeEdges: ['e-input-llm']
    },
    {
      id: 'step3',
      title: 'Intent Classification',
      description: 'LLM analyzes the query to extract intent, category, and urgency level.',
      output: 'LLM Analysis:\n{\n  "category": "billing",\n  "intent": "duplicate_charge",\n  "urgency": "high",\n  "confidence": 0.92,\n  "reasoning": "Query mentions credit card and duplicate charge"\n}',
      activeNodes: ['llm-router', 'intent-analysis'],
      activeEdges: ['e-llm-analysis']
    },
    {
      id: 'step4',
      title: 'Routing Decision',
      description: 'Based on the classification, the router evaluates all possible routes with confidence scores.',
      output: 'Routing Evaluation:\n• Billing Team: 92% confidence ✓\n• Technical Support: 5% confidence\n• Sales Team: 3% confidence\n\nDecision: Route to Billing Team',
      activeNodes: ['llm-router', 'billing-route', 'technical-route', 'sales-route'],
      activeEdges: ['e-llm-billing', 'e-llm-technical', 'e-llm-sales']
    },
    {
      id: 'step5',
      title: 'Route Selection',
      description: 'The highest confidence route is selected and the query is forwarded.',
      input: 'Query forwarded to Billing Team with context:\n• Original query\n• Classification results\n• Urgency level',
      activeNodes: ['billing-route'],
      activeEdges: ['e-llm-billing']
    },
    {
      id: 'step6',
      title: 'Specialized Processing',
      description: 'The billing team handler processes the request with domain-specific logic.',
      output: 'Billing Processing:\n1. Query transaction database\n2. Identify duplicate charge\n3. Initiate refund process\n4. Generate confirmation number\n5. Prepare customer response',
      activeNodes: ['billing-route', 'billing-processor'],
      activeEdges: ['e-billing-processor']
    },
    {
      id: 'step7',
      title: 'Response Generation',
      description: 'The processed result is formatted and sent back to the user.',
      output: 'Customer Response:\n\n"We\'ve identified the duplicate charge of $49.99 on your account. A refund has been initiated and will appear in your account within 3-5 business days. Your confirmation number is #REF-2024-1234. We apologize for the inconvenience."',
      activeNodes: ['billing-processor', 'output'],
      activeEdges: ['e-processor-output']
    },
    {
      id: 'step8',
      title: 'Pattern Variations',
      description: 'The LLM router adapts to different query types, always selecting the most appropriate handler.',
      output: 'Other Routing Examples:\n\n• "API returns 500 errors" → Technical Support (95% confidence)\n• "What\'s included in the Pro plan?" → Sales Team (88% confidence)\n• "Someone tried to login from Russia" → Security Team (97% confidence)\n• "How do I reset my password?" → General Support (85% confidence)\n\nKey Benefits:\n• Handles ambiguous queries intelligently\n• Provides confidence scores for transparency\n• Can route to multiple handlers if needed\n• Learns from feedback to improve accuracy',
      activeNodes: ['llm-router'],
      activeEdges: []
    }
  ]
};