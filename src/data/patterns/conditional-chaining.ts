import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const conditionalChainingPattern: PatternScenario = {
  id: 'conditional-chaining',
  title: 'Conditional Chaining Pattern',
  description: 'Demonstrates dynamic path selection through different prompt chains based on conditions',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Customer Support Request\n"My AI chatbot isn\'t working properly"' },
      style: { ...nodeStyle, minWidth: 280 }
    },
    {
      id: 'classifier',
      type: 'default',
      position: { x: 400, y: 180 },
      data: { label: 'Request Classifier\nAnalyze issue type and complexity' },
      style: { ...nodeStyle, minWidth: 220, background: '#ea580c' }
    },
    {
      id: 'decision',
      type: 'default',
      position: { x: 400, y: 310 },
      data: { label: 'Routing Decision\nTechnical | Billing | General' },
      style: { ...nodeStyle, minWidth: 200, background: '#7c3aed' }
    },
    // Conditional paths
    {
      id: 'technical-path',
      type: 'default',
      position: { x: 100, y: 440 },
      data: { label: 'Technical Support Path\nAPI & Integration Issues' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },
    {
      id: 'billing-path',
      type: 'default',
      position: { x: 400, y: 440 },
      data: { label: 'Billing Support Path\nSubscription & Payment Issues' },
      style: { ...nodeStyle, minWidth: 180, background: '#0891b2' }
    },
    {
      id: 'general-path',
      type: 'default',
      position: { x: 700, y: 440 },
      data: { label: 'General Support Path\nUsage & Best Practices' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
    },
    // Technical path workflow
    {
      id: 'tech-diagnosis',
      type: 'default',
      position: { x: 100, y: 570 },
      data: { label: 'Technical Diagnosis\nAPI logs analysis' },
      style: { ...nodeStyle, minWidth: 160, background: '#065f46' }
    },
    {
      id: 'tech-solution',
      type: 'default',
      position: { x: 100, y: 700 },
      data: { label: 'Technical Solution\nCode fix + documentation' },
      style: { ...nodeStyle, minWidth: 160, background: '#065f46' }
    },
    // Billing path workflow (not used in this demo)
    {
      id: 'billing-review',
      type: 'default',
      position: { x: 400, y: 570 },
      data: { label: 'Account Review\n(Not used in this scenario)' },
      style: { ...nodeStyle, minWidth: 160, background: '#0c4a6e', opacity: 0.3 }
    },
    // General path workflow (not used in this demo)
    {
      id: 'general-guide',
      type: 'default',
      position: { x: 700, y: 570 },
      data: { label: 'Usage Guide\n(Not used in this scenario)' },
      style: { ...nodeStyle, minWidth: 160, background: '#991b1b', opacity: 0.3 }
    },
    // Complexity check
    {
      id: 'complexity-check',
      type: 'default',
      position: { x: 100, y: 830 },
      data: { label: 'Complexity Assessment\nEscalation needed?' },
      style: { ...nodeStyle, minWidth: 180, background: '#ea580c' }
    },
    // Final outcomes
    {
      id: 'resolved',
      type: 'default',
      position: { x: 50, y: 960 },
      data: { label: 'Issue Resolved\nSolution provided' },
      style: { ...nodeStyle, minWidth: 150, background: '#059669' }
    },
    {
      id: 'escalated',
      type: 'default',
      position: { x: 250, y: 960 },
      data: { label: 'Escalated to Human\nComplex technical issue' },
      style: { ...nodeStyle, minWidth: 180, background: '#dc2626' }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-classifier',
      source: 'input',
      target: 'classifier',
      style: edgeStyle
    },
    {
      id: 'e-classifier-decision',
      source: 'classifier',
      target: 'decision',
      style: edgeStyle
    },
    // Conditional routing edges
    {
      id: 'e-decision-technical',
      source: 'decision',
      target: 'technical-path',
      style: { ...edgeStyle, stroke: '#059669', strokeWidth: 3 },
      label: 'Technical Issue Detected',
      labelStyle: { fill: '#059669', fontWeight: 'bold' }
    },
    {
      id: 'e-decision-billing',
      source: 'decision',
      target: 'billing-path',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.3 },
      label: 'Not Selected',
      labelStyle: { fill: '#6b7280' }
    },
    {
      id: 'e-decision-general',
      source: 'decision',
      target: 'general-path',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.3 },
      label: 'Not Selected',
      labelStyle: { fill: '#6b7280' }
    },
    // Technical path flow (active)
    {
      id: 'e-technical-diagnosis',
      source: 'technical-path',
      target: 'tech-diagnosis',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-diagnosis-solution',
      source: 'tech-diagnosis',
      target: 'tech-solution',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-solution-complexity',
      source: 'tech-solution',
      target: 'complexity-check',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    // Final routing
    {
      id: 'e-complexity-resolved',
      source: 'complexity-check',
      target: 'resolved',
      style: { ...edgeStyle, stroke: '#059669', strokeWidth: 3 },
      label: 'Simple Fix',
      labelStyle: { fill: '#059669', fontWeight: 'bold' }
    },
    {
      id: 'e-complexity-escalated',
      source: 'complexity-check',
      target: 'escalated',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.3 },
      label: 'Complex Issue',
      labelStyle: { fill: '#6b7280' }
    },
    // Inactive path edges (faded)
    {
      id: 'e-billing-review',
      source: 'billing-path',
      target: 'billing-review',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.3 }
    },
    {
      id: 'e-general-guide',
      source: 'general-path',
      target: 'general-guide',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5', opacity: 0.3 }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Customer Support Request',
      description: 'A customer submits a support request that needs to be routed to the appropriate specialist team.',
      input: 'Customer Request: "Hi, I\'m having trouble with my AI chatbot integration. The API calls are returning 500 errors and my authentication tokens seem to be expiring every few minutes. I\'ve checked the documentation but can\'t figure out what\'s wrong. This is affecting our production system."',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Request Classification',
      description: 'The classifier analyzes the request content to identify key indicators and categorize the issue type.',
      input: 'Analyzing request for:\n• Technical keywords: API, 500 errors, authentication, tokens\n• Urgency indicators: production system\n• Complexity markers: integration issues\n• Customer sentiment: frustrated but technical',
      activeNodes: ['input', 'classifier'],
      activeEdges: ['e-input-classifier']
    },
    {
      id: 'step3',
      title: 'Routing Decision Analysis',
      description: 'The system evaluates classification results to determine the optimal support path.',
      output: 'Classification Results:\n\n**Issue Type Analysis:**\n• Technical keywords detected: API, 500 errors, authentication, tokens, integration\n• Technical complexity: High\n• Business impact: Production system affected\n• Customer profile: Technical user\n\n**Routing Score:**\n• Technical Support: 95% (API errors, authentication issues)\n• Billing Support: 5% (no payment/subscription mentions)\n• General Support: 10% (some usage questions)\n\n**Decision: Route to Technical Support Path**',
      activeNodes: ['classifier', 'decision'],
      activeEdges: ['e-classifier-decision']
    },
    {
      id: 'step4',
      title: 'Technical Path Selection',
      description: 'Based on the high technical score, the request is routed to the specialized technical support workflow.',
      activeNodes: ['decision', 'technical-path'],
      activeEdges: ['e-decision-technical'],
      nodeUpdates: {
        'billing-path': { style: { ...nodeStyle, minWidth: 180, background: '#0891b2', opacity: 0.3 } },
        'general-path': { style: { ...nodeStyle, minWidth: 180, background: '#dc2626', opacity: 0.3 } }
      }
    },
    {
      id: 'step5',
      title: 'Technical Diagnosis Phase',
      description: 'The technical support workflow begins with detailed diagnosis of the API and authentication issues.',
      input: 'Technical Analysis Tasks:\n• Analyze API error patterns\n• Check authentication token configuration\n• Review rate limiting settings\n• Examine server logs and performance metrics',
      activeNodes: ['technical-path', 'tech-diagnosis'],
      activeEdges: ['e-technical-diagnosis']
    },
    {
      id: 'step6',
      title: 'Diagnosis Results',
      description: 'Technical diagnosis identifies the root cause and determines the appropriate solution approach.',
      output: 'Technical Diagnosis Results:\n\n**Root Cause Analysis:**\n• API 500 errors caused by server overload during peak hours\n• Authentication tokens expiring due to incorrect refresh mechanism\n• Missing rate limiting configuration in client code\n• Server scaling issues under high load\n\n**Issue Severity:** Medium-High\n**Estimated Fix Time:** 2-4 hours\n**Components Affected:** Authentication service, API gateway, client SDK\n\n**Solution Strategy:**\n1. Fix token refresh logic in client SDK\n2. Implement proper retry mechanism with exponential backoff\n3. Update server scaling configuration\n4. Provide updated code examples and documentation',
      activeNodes: ['tech-diagnosis', 'tech-solution'],
      activeEdges: ['e-diagnosis-solution']
    },
    {
      id: 'step7',
      title: 'Technical Solution Implementation',
      description: 'The technical team provides a comprehensive solution with code fixes and documentation.',
      output: 'Technical Solution Package:\n\n**1. Updated Authentication Code:**\n```javascript\n// Fixed token refresh mechanism\nclass APIClient {\n  async refreshToken() {\n    try {\n      const response = await fetch(\'refreshEndpoint\', {\n        method: \'POST\',\n        headers: { \'Authorization\': `Bearer ${this.refreshToken}` }\n      });\n      \n      if (!response.ok) throw new Error(\'Refresh failed\');\n      \n      const { accessToken, expiresIn } = await response.json();\n      this.scheduleTokenRefresh(expiresIn * 0.9); // Refresh at 90% of expiry\n      return accessToken;\n    } catch (error) {\n      console.error(\'Token refresh failed:\', error);\n      // Implement exponential backoff retry\n    }\n  }\n}\n```\n\n**2. Server Configuration Updates:**\n• Increased auto-scaling thresholds\n• Added health check endpoints\n• Improved error handling and logging\n\n**3. Updated Documentation:**\n• Authentication best practices guide\n• Error handling examples\n• Rate limiting guidelines\n• Production deployment checklist\n\n**4. Testing Instructions:**\n• Unit tests for token refresh logic\n• Integration tests for API endpoints\n• Load testing recommendations',
      activeNodes: ['tech-solution', 'complexity-check'],
      activeEdges: ['e-solution-complexity']
    },
    {
      id: 'step8',
      title: 'Complexity Assessment',
      description: 'The system evaluates whether the solution adequately addresses the issue or requires human escalation.',
      input: 'Complexity Evaluation:\n• Solution completeness: High (addresses all identified issues)\n• Implementation difficulty: Medium (requires code changes)\n• Customer technical level: High (can implement provided solution)\n• Risk level: Low (well-tested solution approach)\n• Follow-up needs: Minimal (documentation provided)',
      activeNodes: ['complexity-check'],
      activeEdges: []
    },
    {
      id: 'step9',
      title: 'Issue Resolution',
      description: 'The issue is successfully resolved with the provided technical documentation and code fixes.',
      output: 'Resolution Summary:\n\n**Status:** ✅ RESOLVED\n\n**Solution Provided:**\n• Root cause identified: Token refresh mechanism and server scaling\n• Complete code fix with authentication improvements\n• Updated documentation and best practices\n• Testing guidelines and production checklist\n\n**Customer Actions Required:**\n1. Implement the provided token refresh code\n2. Update server configuration as specified\n3. Run the recommended tests\n4. Deploy to production with monitoring\n\n**Follow-up:**\n• Solution documentation emailed to customer\n• 48-hour follow-up scheduled to confirm resolution\n• Customer satisfaction survey sent\n\n**Estimated Resolution Time:** 2-4 hours for customer implementation\n**Support Ticket Status:** Closed - Solution Provided\n\n**Knowledge Base Update:** New article created for similar authentication issues',
      activeNodes: ['resolved'],
      activeEdges: ['e-complexity-resolved']
    }
  ]
};