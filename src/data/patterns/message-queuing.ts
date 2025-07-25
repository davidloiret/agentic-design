import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const messageQueuingPattern: PatternScenario = {
  id: 'message-queuing',
  title: 'Message Queuing in Agentic AI Systems',
  description: 'Asynchronous message passing between AI agents using queues for decoupled, fault-tolerant communication and coordination',
  steps: [
    {
      id: 'step-1',
      title: 'Task Publication',
      description: 'Research Coordinator publishes a high-priority research task to the message queue',
      input: 'Research Request: "Analyze quantum computing applications in cryptography"',
      activeNodes: ['coordinator', 'research-queue', 'message-flow-1'],
      activeEdges: ['coord-to-queue'],
      nodeUpdates: {
        'coordinator': {
          data: { label: 'Research Coordinator\nPublishing task...' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'research-queue': {
          data: { label: 'Research Queue\nReceiving message (Priority: HIGH)' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        }
      }
    },
    {
      id: 'step-2',
      title: 'Message Routing',
      description: 'Queue system routes the research task to appropriate specialist agents based on capabilities',
      activeNodes: ['research-queue', 'arxiv-queue', 'analysis-queue'],
      activeEdges: ['queue-routing-1', 'queue-routing-2'],
      nodeUpdates: {
        'research-queue': {
          data: { label: 'Research Queue\nRouting to specialists...' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'arxiv-queue': {
          data: { label: 'ArXiv Tasks Queue\n1 message pending' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'analysis-queue': {
          data: { label: 'Analysis Tasks Queue\nAwaiting input...' },
          style: { ...nodeStyle, background: '#6b7280' }
        }
      }
    },
    {
      id: 'step-3',
      title: 'Parallel Processing',
      description: 'Multiple specialist agents consume messages from their respective queues and process tasks in parallel',
      activeNodes: ['arxiv-queue', 'arxiv-agent', 'search-agent'],
      activeEdges: ['arxiv-consume', 'search-consume'],
      nodeUpdates: {
        'arxiv-agent': {
          data: { label: 'ArXiv Agent\nSearching papers...\nStatus: PROCESSING' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'search-agent': {
          data: { label: 'Search Agent\nGathering data...\nStatus: ACTIVE' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'arxiv-queue': {
          data: { label: 'ArXiv Tasks Queue\nProcessing: 1 active' },
          style: { ...nodeStyle, background: '#f59e0b' }
        }
      }
    },
    {
      id: 'step-4',
      title: 'Result Publication',
      description: 'Agents publish their results to downstream queues for further processing',
      activeNodes: ['arxiv-agent', 'analysis-queue', 'synthesis-queue'],
      activeEdges: ['arxiv-to-analysis', 'results-flow'],
      nodeUpdates: {
        'arxiv-agent': {
          data: { label: 'ArXiv Agent\nFound 25 papers\nPublishing results...' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'analysis-queue': {
          data: { label: 'Analysis Tasks Queue\n2 messages queued\nPriority processing' },
          style: { ...nodeStyle, background: '#8b5cf6' }
        },
        'synthesis-queue': {
          data: { label: 'Synthesis Queue\nAwaiting analysis...' },
          style: { ...nodeStyle, background: '#6b7280' }
        }
      }
    },
    {
      id: 'step-5',
      title: 'Analysis Processing',
      description: 'Analysis agents process the collected papers and extract key insights',
      activeNodes: ['analysis-queue', 'analysis-agent', 'nlp-agent'],
      activeEdges: ['analysis-consume-1', 'analysis-consume-2'],
      nodeUpdates: {
        'analysis-queue': {
          data: { label: 'Analysis Tasks Queue\nDispatching to agents...' },
          style: { ...nodeStyle, background: '#f59e0b' }
        },
        'analysis-agent': {
          data: { label: 'Analysis Agent\nSummarizing papers...\nProgress: 60%' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'nlp-agent': {
          data: { label: 'NLP Agent\nExtracting keywords...\nProgress: 80%' },
          style: { ...nodeStyle, background: '#3b82f6' }
        }
      }
    },
    {
      id: 'step-6',
      title: 'Synthesis & Aggregation',
      description: 'Final synthesis agent combines all analysis results into a comprehensive research report',
      activeNodes: ['synthesis-queue', 'synthesis-agent', 'results-queue'],
      activeEdges: ['synthesis-consume', 'final-output'],
      nodeUpdates: {
        'synthesis-agent': {
          data: { label: 'Synthesis Agent\nCombining insights...\nGenerating report...' },
          style: { ...nodeStyle, background: '#3b82f6' }
        },
        'results-queue': {
          data: { label: 'Results Queue\nFinal report ready\nNotifying coordinator' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    },
    {
      id: 'step-7',
      title: 'Result Delivery',
      description: 'Completed research report is delivered back to the requesting coordinator with full traceability',
      activeNodes: ['results-queue', 'coordinator', 'notification-service'],
      activeEdges: ['deliver-results', 'notify-completion'],
      output: 'Research completed: "Quantum Computing in Cryptography Analysis"\n- 25 papers analyzed\n- 5 key applications identified\n- 3 implementation challenges noted\n- Processing time: 12.5 minutes\n- Success rate: 98%',
      nodeUpdates: {
        'coordinator': {
          data: { label: 'Research Coordinator\nReport received ✓\nMission accomplished!' },
          style: { ...nodeStyle, background: '#10b981' }
        },
        'notification-service': {
          data: { label: 'Notification Service\nAlerts sent\nMetrics updated' },
          style: { ...nodeStyle, background: '#10b981' }
        }
      }
    }
  ],
  initialNodes: [
    // Coordinator
    {
      id: 'coordinator',
      position: { x: 100, y: 300 },
      data: { label: 'Research Coordinator\nOrchestrates research workflows' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },

    // Message Queues
    {
      id: 'research-queue',
      position: { x: 350, y: 100 },
      data: { label: 'Research Tasks Queue\nHigh-priority research requests' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'arxiv-queue',
      position: { x: 350, y: 250 },
      data: { label: 'ArXiv Tasks Queue\nPaper search and extraction' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'analysis-queue',
      position: { x: 350, y: 400 },
      data: { label: 'Analysis Tasks Queue\nContent analysis and processing' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'synthesis-queue',
      position: { x: 350, y: 550 },
      data: { label: 'Synthesis Queue\nResult aggregation and reporting' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },
    {
      id: 'results-queue',
      position: { x: 100, y: 550 },
      data: { label: 'Results Queue\nCompleted research reports' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    },

    // Specialist Agents
    {
      id: 'arxiv-agent',
      position: { x: 650, y: 200 },
      data: { label: 'ArXiv Agent\nSpecializes in academic paper search' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },
    {
      id: 'search-agent',
      position: { x: 650, y: 300 },
      data: { label: 'Search Agent\nWeb and database research' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },
    {
      id: 'analysis-agent',
      position: { x: 650, y: 450 },
      data: { label: 'Analysis Agent\nContent summarization and analysis' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },
    {
      id: 'nlp-agent',
      position: { x: 850, y: 450 },
      data: { label: 'NLP Agent\nNatural language processing' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },
    {
      id: 'synthesis-agent',
      position: { x: 650, y: 600 },
      data: { label: 'Synthesis Agent\nReport generation and insights' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 180 }
    },

    // Support Services
    {
      id: 'notification-service',
      position: { x: 100, y: 100 },
      data: { label: 'Notification Service\nAlerts and status updates' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 170 }
    }
  ],
  initialEdges: [
    // Coordinator connections
    {
      id: 'coord-to-queue',
      source: 'coordinator',
      target: 'research-queue',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Queue routing
    {
      id: 'queue-routing-1',
      source: 'research-queue',
      target: 'arxiv-queue',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'queue-routing-2',
      source: 'research-queue',
      target: 'analysis-queue',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Agent consumption
    {
      id: 'arxiv-consume',
      source: 'arxiv-queue',
      target: 'arxiv-agent',
      style: edgeStyle
    },
    {
      id: 'search-consume',
      source: 'arxiv-queue',
      target: 'search-agent',
      style: edgeStyle
    },
    {
      id: 'analysis-consume-1',
      source: 'analysis-queue',
      target: 'analysis-agent',
      style: edgeStyle
    },
    {
      id: 'analysis-consume-2',
      source: 'analysis-queue',
      target: 'nlp-agent',
      style: edgeStyle
    },
    {
      id: 'synthesis-consume',
      source: 'synthesis-queue',
      target: 'synthesis-agent',
      style: edgeStyle
    },

    // Result flow
    {
      id: 'arxiv-to-analysis',
      source: 'arxiv-agent',
      target: 'analysis-queue',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'search-to-analysis',
      source: 'search-agent',
      target: 'analysis-queue',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'analysis-to-synthesis',
      source: 'analysis-agent',
      target: 'synthesis-queue',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'nlp-to-synthesis',
      source: 'nlp-agent',
      target: 'synthesis-queue',
      style: { ...edgeStyle, strokeWidth: 2 }
    },
    {
      id: 'synthesis-to-results',
      source: 'synthesis-agent',
      target: 'results-queue',
      style: { ...edgeStyle, strokeWidth: 3 }
    },

    // Final delivery
    {
      id: 'deliver-results',
      source: 'results-queue',
      target: 'coordinator',
      style: { ...edgeStyle, strokeWidth: 3 }
    },
    {
      id: 'notify-completion',
      source: 'coordinator',
      target: 'notification-service',
      style: edgeStyle
    }
  ]
};