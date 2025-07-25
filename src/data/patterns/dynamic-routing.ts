import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const dynamicRoutingPattern: PatternScenario = {
  id: 'dynamic-routing',
  title: 'Dynamic Routing Pattern',
  description: 'Demonstrates intelligent routing of tasks through different processing paths based on content analysis and contextual conditions',
  initialNodes: [
    // Input
    {
      id: 'input',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Incoming Request\n"Help me with my problem"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Classification layer
    {
      id: 'classifier',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Content Classifier\nAnalyze request type & complexity' },
      style: { ...nodeStyle, minWidth: 220, background: '#8b5cf6' }
    },

    // Context analysis
    {
      id: 'context-analyzer',
      type: 'default',
      position: { x: 800, y: 180 },
      data: { label: 'Context Analyzer\nUser history, preferences, urgency' },
      style: { ...nodeStyle, minWidth: 200, background: '#6366f1' }
    },

    // Route decision
    {
      id: 'router',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Dynamic Router\nSelect optimal processing path' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Processing paths
    {
      id: 'simple-path',
      type: 'default',
      position: { x: 200, y: 480 },
      data: { label: 'Simple Path\nDirect answer retrieval' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'analytical-path',
      type: 'default',
      position: { x: 400, y: 480 },
      data: { label: 'Analytical Path\nMulti-step reasoning' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },
    {
      id: 'creative-path',
      type: 'default',
      position: { x: 600, y: 480 },
      data: { label: 'Creative Path\nIdeation & brainstorming' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'expert-path',
      type: 'default',
      position: { x: 800, y: 480 },
      data: { label: 'Expert Path\nSpecialized processing' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Path-specific processing
    {
      id: 'knowledge-lookup',
      type: 'default',
      position: { x: 200, y: 620 },
      data: { label: 'Knowledge Lookup\nRetrieve factual info' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'reasoning-engine',
      type: 'default',
      position: { x: 400, y: 620 },
      data: { label: 'Reasoning Engine\nLogical analysis' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'creativity-engine',
      type: 'default',
      position: { x: 600, y: 620 },
      data: { label: 'Creativity Engine\nIdeation algorithms' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },
    {
      id: 'specialist-models',
      type: 'default',
      position: { x: 800, y: 620 },
      data: { label: 'Specialist Models\nDomain experts' },
      style: { ...nodeStyle, minWidth: 140, background: '#7c3aed', fontSize: '12px' }
    },

    // Quality gates
    {
      id: 'quality-gate',
      type: 'default',
      position: { x: 500, y: 760 },
      data: { label: 'Quality Gate\nValidate & score output' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },

    // Adaptive feedback
    {
      id: 'feedback-loop',
      type: 'default',
      position: { x: 300, y: 760 },
      data: { label: 'Adaptive Feedback\nLearn from outcomes' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Final output
    {
      id: 'output',
      type: 'default',
      position: { x: 500, y: 900 },
      data: { label: 'Optimized Response\nTailored to request & context' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Classification examples
    {
      id: 'classification-rules',
      type: 'default',
      position: { x: 200, y: 180 },
      data: { label: 'Classification Rules\n• Factual → Simple\n• Complex → Analytical\n• Open-ended → Creative\n• Technical → Expert' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '11px' }
    },

    // Context factors
    {
      id: 'context-factors',
      type: 'default',
      position: { x: 1000, y: 320 },
      data: { label: 'Context Factors\n• User expertise\n• Time constraints\n• Quality requirements\n• Resource availability' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1', fontSize: '11px' }
    },

    // Routing logic
    {
      id: 'routing-logic',
      type: 'default',
      position: { x: 700, y: 320 },
      data: { label: 'Routing Logic\nWeighted decision matrix\nConfidence thresholds\nLoad balancing' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b', fontSize: '11px' }
    }
  ],
  initialEdges: [
    // Main flow
    {
      id: 'e-input-classifier',
      source: 'input',
      target: 'classifier',
      style: edgeStyle
    },
    {
      id: 'e-input-context',
      source: 'input',
      target: 'context-analyzer',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e-classifier-router',
      source: 'classifier',
      target: 'router',
      style: edgeStyle
    },
    {
      id: 'e-context-router',
      source: 'context-analyzer',
      target: 'router',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5,5' }
    },

    // Dynamic routing to paths
    {
      id: 'e-router-simple',
      source: 'router',
      target: 'simple-path',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Factual Query'
    },
    {
      id: 'e-router-analytical',
      source: 'router',
      target: 'analytical-path',
      style: { ...edgeStyle, stroke: '#f97316' },
      label: 'Complex Problem'
    },
    {
      id: 'e-router-creative',
      source: 'router',
      target: 'creative-path',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Open-ended'
    },
    {
      id: 'e-router-expert',
      source: 'router',
      target: 'expert-path',
      style: { ...edgeStyle, stroke: '#dc2626' },
      label: 'Specialized'
    },

    // Path processing
    {
      id: 'e-simple-lookup',
      source: 'simple-path',
      target: 'knowledge-lookup',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-analytical-reasoning',
      source: 'analytical-path',
      target: 'reasoning-engine',
      style: { ...edgeStyle, stroke: '#f97316' }
    },
    {
      id: 'e-creative-engine',
      source: 'creative-path',
      target: 'creativity-engine',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-expert-specialist',
      source: 'expert-path',
      target: 'specialist-models',
      style: { ...edgeStyle, stroke: '#dc2626' }
    },

    // Convergence to quality gate
    {
      id: 'e-lookup-quality',
      source: 'knowledge-lookup',
      target: 'quality-gate',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-reasoning-quality',
      source: 'reasoning-engine',
      target: 'quality-gate',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-creativity-quality',
      source: 'creativity-engine',
      target: 'quality-gate',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-specialist-quality',
      source: 'specialist-models',
      target: 'quality-gate',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Final processing
    {
      id: 'e-quality-output',
      source: 'quality-gate',
      target: 'output',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Feedback loop
    {
      id: 'e-quality-feedback',
      source: 'quality-gate',
      target: 'feedback-loop',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
    {
      id: 'e-feedback-router',
      source: 'feedback-loop',
      target: 'router',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '8,8' },
      animated: true
    },

    // Supporting information
    {
      id: 'e-rules-classifier',
      source: 'classification-rules',
      target: 'classifier',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-factors-context',
      source: 'context-factors',
      target: 'context-analyzer',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-logic-router',
      source: 'routing-logic',
      target: 'router',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3,3' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Request Ingestion',
      description: 'System receives an incoming request that needs intelligent processing.',
      input: 'User Request: "Help me understand quantum computing and how it might affect my cryptocurrency investments"',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Parallel Analysis Initiation',
      description: 'Request is simultaneously sent to classification and context analysis.',
      input: 'Trigger both content analysis and user context evaluation',
      activeNodes: ['input', 'classifier', 'context-analyzer'],
      activeEdges: ['e-input-classifier', 'e-input-context']
    },
    {
      id: 'step3',
      title: 'Content Classification',
      description: 'Analyze request complexity, topic domain, and required processing type.',
      input: 'Classification analysis: Topic complexity, domain requirements, response type',
      activeNodes: ['classifier', 'classification-rules'],
      activeEdges: ['e-rules-classifier'],
      output: 'Classification Results:\n• Topic: Technical/Educational (quantum computing)\n• Complexity: High (requires explanation)\n• Domain: Physics + Finance\n• Type: Analytical explanation needed\n• Confidence: 87%'
    },
    {
      id: 'step4',
      title: 'Context Analysis',
      description: 'Evaluate user background, preferences, and situational factors.',
      input: 'User context: Previous interactions, expertise level, current needs',
      activeNodes: ['context-analyzer', 'context-factors'],
      activeEdges: ['e-factors-context'],
      output: 'Context Analysis:\n• User expertise: Intermediate (has crypto knowledge)\n• Previous topics: Technology, investing\n• Preferred style: Detailed explanations\n• Time sensitivity: Normal\n• Quality requirement: High accuracy'
    },
    {
      id: 'step5',
      title: 'Dynamic Route Selection',
      description: 'Combine classification and context to determine optimal processing path.',
      input: 'Classification + Context → Route decision matrix',
      activeNodes: ['router', 'routing-logic'],
      activeEdges: ['e-classifier-router', 'e-context-router', 'e-logic-router'],
      output: 'Routing Decision:\n• Primary path: Expert Path (technical domain)\n• Fallback: Analytical Path (complex reasoning)\n• Confidence: 92%\n• Reasoning: High technical complexity + user expertise level'
    },
    {
      id: 'step6',
      title: 'Expert Path Activation',
      description: 'Route to specialized processing for technical domain expertise.',
      input: 'Expert path selected for quantum computing + finance intersection',
      activeNodes: ['router', 'expert-path'],
      activeEdges: ['e-router-expert'],
      output: 'Expert Path Activated:\n• Quantum computing specialists engaged\n• Financial analysis models loaded\n• Cross-domain integration prepared'
    },
    {
      id: 'step7',
      title: 'Specialist Model Processing',
      description: 'Deploy domain-specific models for quantum computing and financial analysis.',
      input: 'Specialist processing: Quantum physics + Financial modeling',
      activeNodes: ['expert-path', 'specialist-models'],
      activeEdges: ['e-expert-specialist'],
      output: 'Specialist Analysis:\n• Quantum computing: Current state, capabilities, timeline\n• Crypto impact: Potential vulnerabilities, timeline, mitigation\n• Cross-analysis: Risk assessment, investment implications\n• Technical accuracy: 94%'
    },
    {
      id: 'step8',
      title: 'Alternative Path Processing',
      description: 'Show how different requests would route to different paths.',
      input: 'Example routing for other request types',
      activeNodes: ['router', 'simple-path', 'analytical-path', 'creative-path'],
      activeEdges: ['e-router-simple', 'e-router-analytical', 'e-router-creative'],
      output: 'Alternative Routing Examples:\n• "What is Bitcoin?" → Simple Path (factual lookup)\n• "Analyze market trends" → Analytical Path (reasoning)\n• "Name my startup" → Creative Path (ideation)'
    },
    {
      id: 'step9',
      title: 'Quality Gate Evaluation',
      description: 'Validate output quality and completeness before delivery.',
      input: 'Quality assessment: Accuracy, completeness, relevance, clarity',
      activeNodes: ['specialist-models', 'quality-gate'],
      activeEdges: ['e-specialist-quality'],
      output: 'Quality Assessment:\n• Technical accuracy: 94% (verified)\n• Completeness: 91% (comprehensive)\n• User relevance: 89% (context-matched)\n• Clarity: 87% (appropriate level)\n• Overall score: 90% (passes threshold)'
    },
    {
      id: 'step10',
      title: 'Adaptive Feedback Collection',
      description: 'Gather performance data to improve future routing decisions.',
      input: 'Collect routing performance metrics and user satisfaction data',
      activeNodes: ['quality-gate', 'feedback-loop'],
      activeEdges: ['e-quality-feedback'],
      output: 'Feedback Data:\n• Route accuracy: Expert path was optimal\n• Processing time: Within expected range\n• User satisfaction: High (inferred from engagement)\n• Model performance: Quantum specialist performed well'
    },
    {
      id: 'step11',
      title: 'Route Optimization',
      description: 'Update routing algorithms based on feedback for continuous improvement.',
      input: 'Apply learnings to routing decision matrix',
      activeNodes: ['feedback-loop', 'router'],
      activeEdges: ['e-feedback-router'],
      output: 'Route Optimization:\n• Increased confidence in expert path for quantum topics\n• Updated context weights for technical users\n• Refined classification rules for crypto-related queries\n• Enhanced cross-domain routing logic'
    },
    {
      id: 'step12',
      title: 'Optimized Response Delivery',
      description: 'Deliver the final response tailored to user context and request complexity.',
      activeNodes: ['output'],
      activeEdges: ['e-quality-output'],
      output: 'Final Response:\n\n"Quantum computing poses a theoretical long-term threat to cryptocurrency security, but practical impact is likely 10-15 years away. Current cryptocurrencies use encryption that quantum computers could eventually break, but the crypto community is actively developing quantum-resistant algorithms.\n\nFor your investment strategy:\n• Short-term (1-5 years): Minimal impact expected\n• Medium-term (5-10 years): Monitor quantum developments\n• Long-term (10+ years): Quantum-resistant cryptos may gain value\n\nRecommendation: Diversify across established and quantum-resistant cryptocurrencies while staying informed about technological developments."\n\n*Response generated via Expert Path with 90% quality score*'
    }
  ]
};