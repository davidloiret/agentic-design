import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const scatterGatherPattern: PatternScenario = {
  id: 'scatter-gather',
  title: 'Scatter-Gather Pattern',
  description: 'Demonstrates concurrent request distribution to multiple services followed by response aggregation for comprehensive data collection',
  initialNodes: [
    // Input request
    {
      id: 'client-request',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Client Request\n"Product search query"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626' }
    },

    // Request coordinator
    {
      id: 'request-coordinator',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Request Coordinator\nOrchestration hub' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Scatter phase - Request dispatcher
    {
      id: 'request-dispatcher',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Request Dispatcher\nScatter to services' },
      style: { ...nodeStyle, minWidth: 200, background: '#f59e0b' }
    },

    // Service nodes
    {
      id: 'inventory-service',
      type: 'default',
      position: { x: 150, y: 480 },
      data: { label: 'Inventory Service\nStock & availability' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6' }
    },
    {
      id: 'pricing-service',
      type: 'default',
      position: { x: 350, y: 480 },
      data: { label: 'Pricing Service\nPrices & discounts' },
      style: { ...nodeStyle, minWidth: 160, background: '#10b981' }
    },
    {
      id: 'review-service',
      type: 'default',
      position: { x: 550, y: 480 },
      data: { label: 'Review Service\nRatings & comments' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6' }
    },
    {
      id: 'recommendation-service',
      type: 'default',
      position: { x: 750, y: 480 },
      data: { label: 'Recommendation Service\nSuggested items' },
      style: { ...nodeStyle, minWidth: 160, background: '#ec4899' }
    },
    {
      id: 'catalog-service',
      type: 'default',
      position: { x: 950, y: 480 },
      data: { label: 'Catalog Service\nProduct details' },
      style: { ...nodeStyle, minWidth: 160, background: '#f97316' }
    },

    // Service processing
    {
      id: 'inventory-processing',
      type: 'default',
      position: { x: 150, y: 620 },
      data: { label: 'Stock Check\nQuantity: 45\nStatus: Available' },
      style: { ...nodeStyle, minWidth: 140, background: '#3b82f6', fontSize: '11px' }
    },
    {
      id: 'pricing-processing',
      type: 'default',
      position: { x: 350, y: 620 },
      data: { label: 'Price Lookup\nPrice: $299.99\nDiscount: 15%' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },
    {
      id: 'review-processing',
      type: 'default',
      position: { x: 550, y: 620 },
      data: { label: 'Review Aggregation\nRating: 4.3/5\nReviews: 127' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },
    {
      id: 'recommendation-processing',
      type: 'default',
      position: { x: 750, y: 620 },
      data: { label: 'ML Recommendation\n3 similar items\nPersonalized' },
      style: { ...nodeStyle, minWidth: 140, background: '#ec4899', fontSize: '11px' }
    },

    // Response collector (Gather phase)
    {
      id: 'response-collector',
      type: 'default',
      position: { x: 500, y: 780 },
      data: { label: 'Response Collector\nGather all responses' },
      style: { ...nodeStyle, minWidth: 200, background: '#db2777' }
    },

    // Aggregation and merging
    {
      id: 'data-aggregator',
      type: 'default',
      position: { x: 300, y: 920 },
      data: { label: 'Data Aggregator\nMerge & combine data' },
      style: { ...nodeStyle, minWidth: 180, background: '#7c3aed' }
    },

    {
      id: 'result-formatter',
      type: 'default',
      position: { x: 700, y: 920 },
      data: { label: 'Result Formatter\nStructure final response' },
      style: { ...nodeStyle, minWidth: 180, background: '#059669' }
    },

    // Final response
    {
      id: 'final-response',
      type: 'default',
      position: { x: 500, y: 1060 },
      data: { label: 'Unified Response\nComplete product info' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Supporting systems
    {
      id: 'timeout-manager',
      type: 'default',
      position: { x: 200, y: 320 },
      data: { label: 'Timeout Manager\nResponse time limits' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16' }
    },

    {
      id: 'circuit-breaker',
      type: 'default',
      position: { x: 800, y: 320 },
      data: { label: 'Circuit Breaker\nFailure protection' },
      style: { ...nodeStyle, minWidth: 160, background: '#ef4444' }
    },

    // Error handling
    {
      id: 'error-handler',
      type: 'default',
      position: { x: 100, y: 780 },
      data: { label: 'Error Handler\nFailure management' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626' }
    },

    // Partial response handler
    {
      id: 'partial-response',
      type: 'default',
      position: { x: 900, y: 780 },
      data: { label: 'Partial Response Handler\nIncomplete data mgmt' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b' }
    },

    // Load balancing
    {
      id: 'load-balancer',
      type: 'default',
      position: { x: 350, y: 180 },
      data: { label: 'Load Balancer\nService distribution' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1' }
    },

    // Caching layer
    {
      id: 'cache-layer',
      type: 'default',
      position: { x: 650, y: 180 },
      data: { label: 'Cache Layer\nResponse caching' },
      style: { ...nodeStyle, minWidth: 160, background: '#6366f1' }
    },

    // Performance metrics
    {
      id: 'performance-monitor',
      type: 'default',
      position: { x: 50, y: 480 },
      data: { label: 'Performance Monitor\n• Response time: 245ms\n• Success rate: 98.5%\n• Timeout rate: 1.2%\n• Concurrent requests: 150' },
      style: { ...nodeStyle, minWidth: 160, background: '#0369a1', fontSize: '11px' }
    },

    // Service health monitor
    {
      id: 'health-monitor',
      type: 'default',
      position: { x: 1100, y: 480 },
      data: { label: 'Health Monitor\n• Inventory: Healthy\n• Pricing: Healthy\n• Reviews: Warning\n• Recommendations: Healthy\n• Catalog: Healthy' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc7b16', fontSize: '11px' }
    },

    // Rate limiter
    {
      id: 'rate-limiter',
      type: 'default',
      position: { x: 500, y: 920 },
      data: { label: 'Rate Limiter\nThrottle control' },
      style: { ...nodeStyle, minWidth: 140, background: '#ef4444' }
    }
  ],

  initialEdges: [
    // Request flow
    {
      id: 'e-client-coordinator',
      source: 'client-request',
      target: 'request-coordinator',
      style: edgeStyle
    },

    // Coordinator to dispatcher
    {
      id: 'e-coordinator-dispatcher',
      source: 'request-coordinator',
      target: 'request-dispatcher',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Supporting systems
    {
      id: 'e-coordinator-balancer',
      source: 'request-coordinator',
      target: 'load-balancer',
      style: { ...edgeStyle, stroke: '#0369a1' }
    },
    {
      id: 'e-coordinator-cache',
      source: 'request-coordinator',
      target: 'cache-layer',
      style: { ...edgeStyle, stroke: '#6366f1' }
    },

    // Timeout and circuit breaker
    {
      id: 'e-dispatcher-timeout',
      source: 'request-dispatcher',
      target: 'timeout-manager',
      style: { ...edgeStyle, stroke: '#dc7b16' }
    },
    {
      id: 'e-dispatcher-breaker',
      source: 'request-dispatcher',
      target: 'circuit-breaker',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Scatter - Dispatcher to services
    {
      id: 'e-dispatcher-inventory',
      source: 'request-dispatcher',
      target: 'inventory-service',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      label: 'Stock Query'
    },
    {
      id: 'e-dispatcher-pricing',
      source: 'request-dispatcher',
      target: 'pricing-service',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Price Query'
    },
    {
      id: 'e-dispatcher-review',
      source: 'request-dispatcher',
      target: 'review-service',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Review Query'
    },
    {
      id: 'e-dispatcher-recommendation',
      source: 'request-dispatcher',
      target: 'recommendation-service',
      style: { ...edgeStyle, stroke: '#ec4899' },
      label: 'Recommendation Query'
    },
    {
      id: 'e-dispatcher-catalog',
      source: 'request-dispatcher',
      target: 'catalog-service',
      style: { ...edgeStyle, stroke: '#f97316' },
      label: 'Catalog Query'
    },

    // Services to processing
    {
      id: 'e-inventory-processing',
      source: 'inventory-service',
      target: 'inventory-processing',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },
    {
      id: 'e-pricing-processing',
      source: 'pricing-service',
      target: 'pricing-processing',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-review-processing',
      source: 'review-service',
      target: 'review-processing',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-recommendation-processing',
      source: 'recommendation-service',
      target: 'recommendation-processing',
      style: { ...edgeStyle, stroke: '#ec4899' }
    },

    // Gather - Processing to collector
    {
      id: 'e-inventory-collector',
      source: 'inventory-processing',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-pricing-collector',
      source: 'pricing-processing',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-review-collector',
      source: 'review-processing',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },
    {
      id: 'e-recommendation-collector',
      source: 'recommendation-processing',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#db2777' }
    },

    // Collector to aggregation
    {
      id: 'e-collector-aggregator',
      source: 'response-collector',
      target: 'data-aggregator',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-collector-formatter',
      source: 'response-collector',
      target: 'result-formatter',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Final aggregation
    {
      id: 'e-aggregator-response',
      source: 'data-aggregator',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-formatter-response',
      source: 'result-formatter',
      target: 'final-response',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Error handling
    {
      id: 'e-error-collector',
      source: 'error-handler',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#dc2626', strokeDasharray: '5,5' }
    },
    {
      id: 'e-partial-collector',
      source: 'partial-response',
      target: 'response-collector',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '5,5' }
    },

    // Rate limiting
    {
      id: 'e-limiter-aggregator',
      source: 'rate-limiter',
      target: 'data-aggregator',
      style: { ...edgeStyle, stroke: '#ef4444', strokeDasharray: '3,3' }
    },

    // Monitoring
    {
      id: 'e-performance-dispatcher',
      source: 'performance-monitor',
      target: 'request-dispatcher',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-health-services',
      source: 'health-monitor',
      target: 'catalog-service',  
      style: { ...edgeStyle, stroke: '#dc7b16', strokeDasharray: '3,3' }
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Client Request Reception',
      description: 'Client submits a product search request requiring data from multiple services.',
      input: 'Product search request: "laptop gaming under $1500" with user context and preferences.',
      activeNodes: ['client-request'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Request Coordination Setup',
      description: 'Request coordinator receives the query and prepares for service orchestration.',
      input: 'Request coordination: parse query, identify required services, prepare scatter strategy',
      activeNodes: ['client-request', 'request-coordinator'],
      activeEdges: ['e-client-coordinator']
    },
    {
      id: 'step3',
      title: 'Load Balancing and Caching Check',
      description: 'Load balancer optimizes service distribution while cache layer checks for cached responses.',
      input: 'Infrastructure preparation: load balancing, cache lookup, service health assessment',
      activeNodes: ['load-balancer', 'cache-layer'],
      activeEdges: ['e-coordinator-balancer', 'e-coordinator-cache'],
      output: 'Infrastructure Status:\n• Load balancer: 5 service clusters available\n• Cache hit rate: 23% (partial data available)\n• Service health: 4/5 services healthy (Reviews: warning)\n• Expected response time: 180-250ms\n• Concurrent capacity: 500 requests/second\n• Circuit breaker status: All circuits closed (healthy)'
    },
    {
      id: 'step4',
      title: 'Request Dispatcher Activation',
      description: 'Request dispatcher prepares to scatter the query to multiple services simultaneously.',
      input: 'Scatter preparation: service selection, timeout configuration, parallel execution setup',
      activeNodes: ['request-dispatcher'],
      activeEdges: ['e-coordinator-dispatcher'],
      output: 'Scatter Configuration:\n• Target services: 5 (Inventory, Pricing, Reviews, Recommendations, Catalog)\n• Parallel execution: All services called simultaneously\n• Timeout threshold: 500ms per service\n• Retry policy: 2 attempts with exponential backoff\n• Circuit breaker: Enabled for fault tolerance\n• Request ID: REQ-2024-789456 for tracing'
    },
    {
      id: 'step5',
      title: 'Timeout and Circuit Breaker Setup',
      description: 'Configure timeout management and circuit breaker protection for reliable service calls.',
      input: 'Reliability configuration: timeout thresholds, circuit breaker rules, failure handling',
      activeNodes: ['timeout-manager', 'circuit-breaker'],
      activeEdges: ['e-dispatcher-timeout', 'e-dispatcher-breaker'],
      output: 'Reliability Configuration:\n• **Timeout Manager**:\n  - Global timeout: 500ms\n  - Per-service timeout: 400ms\n  - Grace period: 50ms for response processing\n• **Circuit Breaker**:\n  - Failure threshold: 5 consecutive failures\n  - Recovery timeout: 30 seconds\n  - Half-open test requests: 3\n• **Current Status**: All services operational'
    },
    {
      id: 'step6',
      title: 'Scatter Phase - Parallel Service Calls',
      description: 'Simultaneously dispatch requests to all required services for comprehensive data collection.',
      input: 'Parallel scatter: simultaneous calls to inventory, pricing, review, recommendation, and catalog services',
      activeNodes: ['inventory-service', 'pricing-service', 'review-service', 'recommendation-service', 'catalog-service'],
      activeEdges: ['e-dispatcher-inventory', 'e-dispatcher-pricing', 'e-dispatcher-review', 'e-dispatcher-recommendation', 'e-dispatcher-catalog'],
      output: 'Scatter Execution:\n• **Inventory Service**: Query dispatched for stock levels\n• **Pricing Service**: Query dispatched for pricing and discounts\n• **Review Service**: Query dispatched for ratings and reviews\n• **Recommendation Service**: Query dispatched for personalized suggestions\n• **Catalog Service**: Query dispatched for product specifications\n• **Dispatch Time**: 2ms for all services\n• **Tracking ID**: Each request tagged with correlation ID'
    },
    {
      id: 'step7',
      title: 'Service Processing - Inventory Check',
      description: 'Inventory service processes stock availability and quantity information.',
      input: 'Inventory processing: check stock levels, availability status, warehouse locations',
      activeNodes: ['inventory-processing'],
      activeEdges: ['e-inventory-processing'],
      output: 'Inventory Service Response:\n• **Stock Status**: Available\n• **Quantity**: 45 units in stock\n• **Warehouse Locations**: 3 fulfillment centers\n• **Estimated Delivery**: 2-3 business days\n• **Reserved Stock**: 5 units (pending orders)\n• **Restock Date**: N/A (well stocked)\n• **Response Time**: 89ms'
    },
    {
      id: 'step8',
      title: 'Service Processing - Pricing and Reviews',
      description: 'Pricing and review services process cost information and user feedback data.',
      input: 'Multi-service processing: price calculation with discounts, review aggregation with ratings',
      activeNodes: ['pricing-processing', 'review-processing'],
      activeEdges: ['e-pricing-processing', 'e-review-processing'],
      output: 'Pricing Service Response:\n• **Base Price**: $299.99\n• **Discount**: 15% (Black Friday promotion)\n• **Final Price**: $254.99\n• **Tax**: Calculated at checkout based on location\n• **Payment Options**: Credit card, PayPal, financing available\n\nReview Service Response:\n• **Average Rating**: 4.3/5 stars\n• **Total Reviews**: 127 reviews\n• **Recent Reviews**: 23 in last month\n• **Top Keywords**: "fast", "reliable", "great value"\n• **Response Time**: 156ms'
    },
    {
      id: 'step9',
      title: 'Service Processing - Recommendations',
      description: 'Recommendation service generates personalized product suggestions using ML algorithms.',
      input: 'ML recommendation processing: analyze user history, generate personalized suggestions, calculate similarity scores',
      activeNodes: ['recommendation-processing'],
      activeEdges: ['e-recommendation-processing'],
      output: 'Recommendation Service Response:\n• **Algorithm**: Collaborative filtering + content-based\n• **Personalized Suggestions**: 3 similar products identified\n• **Confidence Score**: 87% match with user preferences\n• **Similar Items**:\n  - Gaming Laptop Pro X1: $1,299 (95% similarity)\n  - UltraBook Gaming Elite: $1,199 (89% similarity)\n  - PowerBook Gaming Series: $1,399 (84% similarity)\n• **Cross-sell Opportunities**: Gaming accessories, warranty\n• **Response Time**: 201ms'
    },
    {
      id: 'step10',
      title: 'Response Gathering Phase',
      description: 'Response collector gathers all service responses and handles partial/failed responses.',
      input: 'Response collection: aggregate successful responses, handle timeouts, manage partial data',
      activeNodes: ['response-collector', 'error-handler', 'partial-response'],
      activeEdges: ['e-inventory-collector', 'e-pricing-collector', 'e-review-collector', 'e-recommendation-collector', 'e-error-collector', 'e-partial-collector'],
      output: 'Response Collection Status:\n• **Successful Responses**: 4/5 services (80% success rate)\n• **Failed Responses**: 1 (Catalog service timeout after 450ms)\n• **Partial Responses**: 0\n• **Data Completeness**: 85% of required data collected\n• **Fallback Strategy**: Use cached catalog data from 5 minutes ago\n• **Collection Time**: 245ms (within 500ms threshold)\n• **Decision**: Proceed with available data + cached fallback'
    },
    {
      id: 'step11',
      title: 'Data Aggregation and Formatting',
      description: 'Aggregate collected data and format into a unified response structure.',
      input: 'Data processing: merge service responses, resolve conflicts, apply business rules, format output',
      activeNodes: ['data-aggregator', 'result-formatter', 'rate-limiter'],
      activeEdges: ['e-collector-aggregator', 'e-collector-formatter', 'e-limiter-aggregator'],
      output: 'Data Aggregation Results:\n• **Data Merge**: Successfully combined inventory, pricing, and review data\n• **Conflict Resolution**: No conflicts detected\n• **Enrichment**: Added cached catalog specifications\n• **Business Rules Applied**:\n  - Applied regional pricing\n  - Filtered age-appropriate content\n  - Added promotional messaging\n• **Format**: JSON response with nested product objects\n• **Size**: 2.3KB response payload\n• **Rate Limiting**: 85/100 requests per minute used'
    },
    {
      id: 'step12',
      title: 'Unified Response Delivery',
      description: 'Deliver comprehensive product information combining all service data.',
      activeNodes: ['final-response', 'performance-monitor', 'health-monitor'],
      activeEdges: ['e-aggregator-response', 'e-formatter-response', 'e-performance-dispatcher', 'e-health-services'],
      output: 'Scatter-Gather Complete:\n\n**Product Search Results:**\n• **Product**: Gaming Laptop MSI Stealth 15M\n• **Price**: $254.99 (15% discount applied)\n• **Availability**: In stock (45 units)\n• **Rating**: 4.3/5 stars (127 reviews)\n• **Delivery**: 2-3 business days\n• **Warranty**: 2-year manufacturer warranty\n• **Financing**: 0% APR for 12 months available\n\n**Personalized Recommendations:**\n1. Gaming Laptop Pro X1 - $1,299 (95% match)\n2. UltraBook Gaming Elite - $1,199 (89% match)\n3. PowerBook Gaming Series - $1,399 (84% match)\n\n**Performance Metrics:**\n• **Total Response Time**: 267ms (target: <500ms) ✓\n• **Service Success Rate**: 80% (4/5 services)\n• **Data Completeness**: 85% (acceptable threshold)\n• **Cache Utilization**: 23% hit rate\n• **Concurrent Requests**: 142/500 capacity\n\n**Service Health Summary:**\n• Inventory Service: ✓ Healthy (89ms)\n• Pricing Service: ✓ Healthy (134ms)\n• Review Service: ⚠️ Warning (156ms - elevated response time)\n• Recommendation Service: ✓ Healthy (201ms)\n• Catalog Service: ❌ Timeout (450ms+ timeout)\n\n**Reliability Metrics:**\n• Circuit breakers: All closed (healthy)\n• Fallback strategies: 1 used (cached catalog data)\n• Error rate: 0.2% over last hour\n• Availability: 99.7% uptime\n\n*Scatter-Gather achieved 85% data completeness with 267ms response time*'
    }
  ]
};