import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agentCommunicationFaultTolerancePattern: PatternScenario = {
  id: 'agent-communication-fault-tolerance',
  title: 'Agent Communication Fault Tolerance',
  initialNodes: [
    {
      id: 'order-agent',
      position: { x: 50, y: 50 },
      data: { label: '🛒 Order Agent\n"Process $50K\nB2B order"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'inventory-agent',
      position: { x: 300, y: 50 },
      data: { label: '📦 Inventory Agent\n"Check stock\navailability"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'payment-agent',
      position: { x: 550, y: 50 },
      data: { label: '💳 Payment Agent\n"Process payment\n$50,000"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'message-router',
      position: { x: 300, y: 200 },
      data: { label: '📡 Message Router\nRouting messages\nbetween agents' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 },
    },
    {
      id: 'failure-detection',
      position: { x: 50, y: 350 },
      data: { label: '⚠️ Failure Detection\n"Payment Agent\nunreachable!"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 },
    },
    {
      id: 'backup-payment',
      position: { x: 300, y: 350 },
      data: { label: '🔄 Backup Payment\nSecondary payment\nservice activated' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 180 },
    },
    {
      id: 'message-queue',
      position: { x: 550, y: 350 },
      data: { label: '📬 Message Queue\nBuffer messages\nuntil recovery' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
    {
      id: 'recovery-complete',
      position: { x: 300, y: 500 },
      data: { label: '✅ Recovery Complete\nOrder processed\nsuccessfully' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 },
    },
    {
      id: 'resilience-update',
      position: { x: 550, y: 500 },
      data: { label: '🛡️ Resilience Update\nImprove fault\ntolerance patterns' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 180 },
    },
  ],
  initialEdges: [
    {
      id: 'e1',
      source: 'order-agent',
      target: 'message-router',
      ...edgeStyle,
      label: 'request'
    },
    {
      id: 'e2',
      source: 'message-router',
      target: 'inventory-agent',
      ...edgeStyle,
      label: 'check stock'
    },
    {
      id: 'e3',
      source: 'message-router',
      target: 'payment-agent',
      ...edgeStyle,
      label: 'process payment',
      style: { ...edgeStyle.style, stroke: '#ef4444', strokeDasharray: '5,5' }
    },
    {
      id: 'e4',
      source: 'payment-agent',
      target: 'failure-detection',
      ...edgeStyle,
      label: 'timeout',
      style: { ...edgeStyle.style, stroke: '#ef4444' }
    },
    {
      id: 'e5',
      source: 'failure-detection',
      target: 'backup-payment',
      ...edgeStyle,
      label: 'activate backup'
    },
    {
      id: 'e6',
      source: 'failure-detection',
      target: 'message-queue',
      ...edgeStyle,
      label: 'buffer messages'
    },
    {
      id: 'e7',
      source: 'backup-payment',
      target: 'recovery-complete',
      ...edgeStyle,
      label: 'payment success'
    },
    {
      id: 'e8',
      source: 'message-queue',
      target: 'recovery-complete',
      ...edgeStyle,
      label: 'replay messages'
    },
    {
      id: 'e9',
      source: 'recovery-complete',
      target: 'resilience-update',
      ...edgeStyle,
      label: 'learn'
    },
    {
      id: 'e10',
      source: 'inventory-agent',
      target: 'recovery-complete',
      ...edgeStyle,
      label: 'stock confirmed',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Normal Communication Flow",
      description: "Order agent sends $50K B2B order request through message router to inventory and payment agents for processing."
    },
    {
      title: "Communication Failure Detection",
      description: "Payment agent becomes unreachable due to network issues or service failure. Message router detects timeout after 3 seconds."
    },
    {
      title: "Automatic Failover Activation",
      description: "System immediately activates backup payment service and buffers pending messages in persistent queue to prevent data loss."
    },
    {
      title: "Message Replay and Recovery",
      description: "Buffered messages are replayed to backup payment agent, ensuring no transaction data is lost during the failover process."
    },
    {
      title: "Successful Order Completion",
      description: "Order processes successfully using backup payment service while inventory confirmation proceeds normally, maintaining business continuity."
    },
    {
      title: "Resilience Pattern Learning",
      description: "System analyzes failure patterns to improve future fault detection speed and optimize backup service selection strategies."
    }
  ]
};