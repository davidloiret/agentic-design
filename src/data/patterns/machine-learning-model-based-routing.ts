import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const machineLearningModelBasedRoutingPattern: PatternScenario = {
  id: 'machine-learning-model-based-routing',
  title: 'Machine Learning Model-Based Routing Pattern',
  description: 'Demonstrates routing using trained ML classification models with probability distributions',
  initialNodes: [
    {
      id: 'input',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Customer Query\n"My order hasn\'t arrived and tracking shows delivered"' },
      style: { ...nodeStyle, minWidth: 350 }
    },
    {
      id: 'preprocessor',
      type: 'default',
      position: { x: 375, y: 150 },
      data: { label: '🔄 Preprocessor\nTokenize, Normalize, Feature Extract' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 300 }
    },
    {
      id: 'feature-vector',
      type: 'default',
      position: { x: 50, y: 250 },
      data: { label: 'Feature Vector\n• TF-IDF scores\n• N-grams\n• Sentiment: -0.7\n• Length: 12 tokens' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 }
    },
    {
      id: 'ml-model',
      type: 'default',
      position: { x: 375, y: 350 },
      data: { label: '🤖 ML Classifier\nRandom Forest Model\nTrained on 100K queries\nAccuracy: 94.2%' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 280 }
    },
    {
      id: 'model-metadata',
      type: 'default',
      position: { x: 700, y: 350 },
      data: { label: '📊 Model Info\n• Version: 2.3.1\n• Last trained: 2024-01-08\n• Features: 512\n• Classes: 8' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    },
    // Probability distribution
    {
      id: 'probabilities',
      type: 'default',
      position: { x: 375, y: 460 },
      data: { label: '📈 Class Probabilities\nDelivery Issue: 0.82\nOrder Status: 0.09\nRefund Request: 0.04\nProduct Question: 0.02\nOther: 0.03' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 }
    },
    // Route options with probabilities
    {
      id: 'delivery-route',
      type: 'default',
      position: { x: 100, y: 580 },
      data: { label: '📦 Delivery Support\nProbability: 0.82\nHandles shipping issues' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 }
    },
    {
      id: 'order-route',
      type: 'default',
      position: { x: 325, y: 580 },
      data: { label: '📋 Order Management\nProbability: 0.09\nOrder status & tracking' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    {
      id: 'refund-route',
      type: 'default',
      position: { x: 550, y: 580 },
      data: { label: '💰 Refund Team\nProbability: 0.04\nRefunds & returns' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 }
    },
    // Confidence threshold check
    {
      id: 'threshold-check',
      type: 'default',
      position: { x: 775, y: 460 },
      data: { label: '✓ Confidence Check\nThreshold: 0.70\n0.82 > 0.70\n✅ Confident routing' },
      style: { ...nodeStyle, background: '#22c55e', minWidth: 180 }
    },
    // Processing
    {
      id: 'delivery-processor',
      type: 'default',
      position: { x: 100, y: 700 },
      data: { label: 'Process Delivery Issue\n• Verify delivery status\n• Check carrier records\n• Initiate investigation' },
      style: { ...nodeStyle, minWidth: 200 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 400, y: 820 },
      data: { label: 'Response\n"Investigation started for your missing package.\nWe\'ll contact the carrier within 24 hours."' },
      style: { ...nodeStyle, background: '#059669', minWidth: 350 }
    },
    // Model performance metrics
    {
      id: 'metrics',
      type: 'default',
      position: { x: 700, y: 250 },
      data: { label: '📉 Performance Metrics\n• Precision: 0.93\n• Recall: 0.91\n• F1 Score: 0.92\n• Latency: 12ms' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    }
  ],
  initialEdges: [
    {
      id: 'e-input-preprocessor',
      source: 'input',
      target: 'preprocessor',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-preprocessor-features',
      source: 'preprocessor',
      target: 'feature-vector',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      label: 'Extract'
    },
    {
      id: 'e-features-model',
      source: 'feature-vector',
      target: 'ml-model',
      style: edgeStyle
    },
    {
      id: 'e-preprocessor-model',
      source: 'preprocessor',
      target: 'ml-model',
      style: edgeStyle
    },
    {
      id: 'e-model-metadata',
      source: 'ml-model',
      target: 'model-metadata',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-preprocessor-metrics',
      source: 'preprocessor',
      target: 'metrics',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-model-probabilities',
      source: 'ml-model',
      target: 'probabilities',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Predict'
    },
    {
      id: 'e-probabilities-threshold',
      source: 'probabilities',
      target: 'threshold-check',
      style: edgeStyle
    },
    // Probability to routes
    {
      id: 'e-prob-delivery',
      source: 'probabilities',
      target: 'delivery-route',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      label: '82%'
    },
    {
      id: 'e-prob-order',
      source: 'probabilities',
      target: 'order-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '9%'
    },
    {
      id: 'e-prob-refund',
      source: 'probabilities',
      target: 'refund-route',
      style: { ...edgeStyle, stroke: '#6b7280', strokeDasharray: '5,5' },
      label: '4%'
    },
    {
      id: 'e-delivery-processor',
      source: 'delivery-route',
      target: 'delivery-processor',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true
    },
    {
      id: 'e-processor-output',
      source: 'delivery-processor',
      target: 'output',
      style: edgeStyle
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Query Input',
      description: 'Customer submits a query that needs to be classified and routed.',
      input: 'Customer Query: "My order hasn\'t arrived and tracking shows delivered"\n\nContext:\n• Order #12345\n• Ordered: 5 days ago\n• Customer tier: Premium',
      activeNodes: ['input'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Text Preprocessing',
      description: 'Query is preprocessed to extract features for the ML model.',
      output: 'Preprocessing Steps:\n1. Tokenization: ["order", "arrived", "tracking", "shows", "delivered"]\n2. Lowercase & remove stopwords\n3. Lemmatization: arrive → arrived, show → shows\n4. Calculate TF-IDF scores\n5. Extract n-grams (unigrams, bigrams)\n6. Sentiment analysis: Negative (-0.7)',
      activeNodes: ['input', 'preprocessor'],
      activeEdges: ['e-input-preprocessor']
    },
    {
      id: 'step3',
      title: 'Feature Extraction',
      description: 'Convert preprocessed text into numerical feature vector for ML model.',
      output: 'Feature Vector (512 dimensions):\n• TF-IDF weights for top 300 words\n• Bigram presence indicators\n• Sentiment score: -0.7\n• Message length: 12 tokens\n• Punctuation count: 0\n• Capital letters ratio: 0.02\n• Domain-specific features (order, delivery, tracking)',
      activeNodes: ['preprocessor', 'feature-vector', 'metrics'],
      activeEdges: ['e-preprocessor-features', 'e-preprocessor-metrics']
    },
    {
      id: 'step4',
      title: 'ML Model Inference',
      description: 'Random Forest classifier processes the feature vector to predict the category.',
      output: 'Model Processing:\n• Input: 512-dimensional feature vector\n• Model: Random Forest with 100 trees\n• Training data: 100K labeled queries\n• Inference time: 12ms\n\nDecision process:\n• Trees voting for "Delivery Issue": 82/100\n• Trees voting for "Order Status": 9/100\n• Trees voting for other classes: 9/100',
      activeNodes: ['feature-vector', 'ml-model', 'model-metadata'],
      activeEdges: ['e-features-model', 'e-preprocessor-model', 'e-model-metadata']
    },
    {
      id: 'step5',
      title: 'Probability Distribution',
      description: 'Model outputs probability distribution across all possible classes.',
      output: 'Class Probability Distribution:\n\n1. Delivery Issue: 0.82 (82%)\n2. Order Status: 0.09 (9%)\n3. Refund Request: 0.04 (4%)\n4. Product Question: 0.02 (2%)\n5. Account Issue: 0.01 (1%)\n6. Technical Support: 0.01 (1%)\n7. Billing: 0.005 (0.5%)\n8. Other: 0.005 (0.5%)\n\nTotal: 1.00 (100%)',
      activeNodes: ['ml-model', 'probabilities'],
      activeEdges: ['e-model-probabilities']
    },
    {
      id: 'step6',
      title: 'Confidence Threshold Check',
      description: 'Verify if the highest probability exceeds the confidence threshold.',
      output: 'Confidence Validation:\n\nHighest probability: 0.82 (Delivery Issue)\nConfidence threshold: 0.70\n\nCheck: 0.82 > 0.70 ✅\n\nResult: Confident routing approved\n\nNote: If below threshold, would route to human agent for manual classification',
      activeNodes: ['probabilities', 'threshold-check'],
      activeEdges: ['e-probabilities-threshold']
    },
    {
      id: 'step7',
      title: 'Route Selection',
      description: 'Select the route with highest probability that exceeds threshold.',
      output: 'Routing Decision:\n\n✓ Selected: Delivery Support Team\n  • Probability: 82%\n  • Confidence: High\n  • Specialized in shipping issues\n  • Average resolution time: 2 hours\n\nAlternative routes (not selected):\n• Order Management (9%) - Below relevance\n• Refund Team (4%) - Low probability',
      activeNodes: ['probabilities', 'delivery-route', 'order-route', 'refund-route'],
      activeEdges: ['e-prob-delivery', 'e-prob-order', 'e-prob-refund']
    },
    {
      id: 'step8',
      title: 'Specialized Processing',
      description: 'Delivery support team handles the issue with domain expertise.',
      output: 'Delivery Team Processing:\n\n1. Query carrier API for delivery proof\n2. Check GPS coordinates of delivery\n3. Review delivery photo if available\n4. Cross-reference with customer address\n5. Initiate carrier investigation\n6. Create replacement order if needed\n7. Generate case number for tracking',
      activeNodes: ['delivery-route', 'delivery-processor'],
      activeEdges: ['e-delivery-processor']
    },
    {
      id: 'step9',
      title: 'Response Generation',
      description: 'Generate and send appropriate response to customer.',
      output: 'Customer Response:\n\n"Thank you for contacting us about your missing package. I understand how frustrating this must be.\n\nI\'ve initiated an investigation with our carrier regarding your order #12345, which shows as delivered but hasn\'t arrived. Here\'s what happens next:\n\n1. We\'ll contact the carrier within 24 hours\n2. Check delivery location and any photos\n3. Investigate with the local delivery team\n\nCase number: DEL-2024-5678\n\nIf we can\'t locate your package within 48 hours, we\'ll send a replacement at no charge. You\'ll receive email updates on the investigation progress."',
      activeNodes: ['delivery-processor', 'output'],
      activeEdges: ['e-processor-output']
    },
    {
      id: 'step10',
      title: 'Model Learning & Feedback',
      description: 'Routing decision and outcome are logged for model retraining.',
      output: 'Feedback Loop:\n\n• Query logged with classification\n• Customer satisfaction tracked\n• Resolution time recorded\n• Model performance monitored\n\nRetraining Schedule:\n• Weekly: Fine-tuning with new data\n• Monthly: Full model retraining\n• Quarterly: Architecture review\n\nCurrent Performance:\n• Accuracy: 94.2% (↑ 0.3% from last month)\n• Average confidence: 0.78\n• False positive rate: 2.1%',
      activeNodes: ['ml-model', 'metrics'],
      activeEdges: []
    }
  ]
};