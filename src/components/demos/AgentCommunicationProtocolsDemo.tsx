'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Send, Zap, Globe, Radio, MessageSquare, Activity } from 'lucide-react';

// Types
type ProtocolType = 'REST' | 'WebSocket' | 'PubSub' | 'MessageQueue';
type MessageStatus = 'pending' | 'sent' | 'received' | 'acknowledged' | 'failed';

interface Agent {
  id: string;
  name: string;
  type: 'sender' | 'receiver' | 'broker' | 'subscriber';
  protocol: ProtocolType;
  status: 'idle' | 'sending' | 'receiving' | 'processing';
  messageCount: number;
  lastActivity?: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  protocol: ProtocolType;
  type: 'request' | 'response' | 'publish' | 'subscribe' | 'broadcast';
  content: string;
  timestamp: number;
  status: MessageStatus;
  latency?: number;
  retries?: number;
}

interface Channel {
  id: string;
  name: string;
  protocol: ProtocolType;
  subscribers: string[];
  messageQueue: Message[];
  throughput: number;
  latency: number;
}

interface ProtocolMetrics {
  protocol: ProtocolType;
  messagesPerSecond: number;
  avgLatency: number;
  successRate: number;
  activeConnections: number;
}

const AgentCommunicationProtocolsDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [metrics, setMetrics] = useState<ProtocolMetrics[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType | 'all'>('all');
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize demo
  useEffect(() => {
    initializeAgents();
    initializeChannels();
    initializeMetrics();
  }, []);

  const initializeAgents = () => {
    const initialAgents: Agent[] = [
      // REST Agents
      { id: 'rest-client', name: 'REST Client', type: 'sender', protocol: 'REST', status: 'idle', messageCount: 0 },
      { id: 'rest-server', name: 'REST Server', type: 'receiver', protocol: 'REST', status: 'idle', messageCount: 0 },

      // WebSocket Agents
      { id: 'ws-client-1', name: 'WS Client 1', type: 'sender', protocol: 'WebSocket', status: 'idle', messageCount: 0 },
      { id: 'ws-client-2', name: 'WS Client 2', type: 'sender', protocol: 'WebSocket', status: 'idle', messageCount: 0 },
      { id: 'ws-server', name: 'WS Server', type: 'broker', protocol: 'WebSocket', status: 'idle', messageCount: 0 },

      // Pub/Sub Agents
      { id: 'publisher-1', name: 'Publisher 1', type: 'sender', protocol: 'PubSub', status: 'idle', messageCount: 0 },
      { id: 'publisher-2', name: 'Publisher 2', type: 'sender', protocol: 'PubSub', status: 'idle', messageCount: 0 },
      { id: 'subscriber-1', name: 'Subscriber 1', type: 'subscriber', protocol: 'PubSub', status: 'idle', messageCount: 0 },
      { id: 'subscriber-2', name: 'Subscriber 2', type: 'subscriber', protocol: 'PubSub', status: 'idle', messageCount: 0 },
      { id: 'subscriber-3', name: 'Subscriber 3', type: 'subscriber', protocol: 'PubSub', status: 'idle', messageCount: 0 },

      // Message Queue Agents
      { id: 'producer-1', name: 'Producer 1', type: 'sender', protocol: 'MessageQueue', status: 'idle', messageCount: 0 },
      { id: 'producer-2', name: 'Producer 2', type: 'sender', protocol: 'MessageQueue', status: 'idle', messageCount: 0 },
      { id: 'consumer-1', name: 'Consumer 1', type: 'receiver', protocol: 'MessageQueue', status: 'idle', messageCount: 0 },
      { id: 'consumer-2', name: 'Consumer 2', type: 'receiver', protocol: 'MessageQueue', status: 'idle', messageCount: 0 },
      { id: 'queue-broker', name: 'Queue Broker', type: 'broker', protocol: 'MessageQueue', status: 'idle', messageCount: 0 },
    ];
    setAgents(initialAgents);
  };

  const initializeChannels = () => {
    const initialChannels: Channel[] = [
      {
        id: 'rest-channel',
        name: 'REST API Channel',
        protocol: 'REST',
        subscribers: [],
        messageQueue: [],
        throughput: 0,
        latency: 0,
      },
      {
        id: 'websocket-channel',
        name: 'WebSocket Channel',
        protocol: 'WebSocket',
        subscribers: ['ws-client-1', 'ws-client-2'],
        messageQueue: [],
        throughput: 0,
        latency: 0,
      },
      {
        id: 'events-topic',
        name: 'Events Topic',
        protocol: 'PubSub',
        subscribers: ['subscriber-1', 'subscriber-2', 'subscriber-3'],
        messageQueue: [],
        throughput: 0,
        latency: 0,
      },
      {
        id: 'task-queue',
        name: 'Task Queue',
        protocol: 'MessageQueue',
        subscribers: ['consumer-1', 'consumer-2'],
        messageQueue: [],
        throughput: 0,
        latency: 0,
      },
    ];
    setChannels(initialChannels);
  };

  const initializeMetrics = () => {
    const initialMetrics: ProtocolMetrics[] = [
      { protocol: 'REST', messagesPerSecond: 0, avgLatency: 0, successRate: 100, activeConnections: 0 },
      { protocol: 'WebSocket', messagesPerSecond: 0, avgLatency: 0, successRate: 100, activeConnections: 0 },
      { protocol: 'PubSub', messagesPerSecond: 0, avgLatency: 0, successRate: 100, activeConnections: 0 },
      { protocol: 'MessageQueue', messagesPerSecond: 0, avgLatency: 0, successRate: 100, activeConnections: 0 },
    ];
    setMetrics(initialMetrics);
  };

  // Simulation logic
  const simulateRESTCommunication = useCallback(() => {
    const client = agents.find(a => a.id === 'rest-client');
    const server = agents.find(a => a.id === 'rest-server');

    if (!client || !server) return;

    // Create request
    const request: Message = {
      id: `rest-${Date.now()}`,
      from: client.id,
      to: server.id,
      protocol: 'REST',
      type: 'request',
      content: `GET /api/data/${Math.floor(Math.random() * 100)}`,
      timestamp: Date.now(),
      status: 'pending',
    };

    setMessages(prev => [...prev, request]);
    setAgents(prev => prev.map(a =>
      a.id === client.id ? { ...a, status: 'sending', lastActivity: 'Sending request' } : a
    ));

    // Simulate network latency
    setTimeout(() => {
      request.status = 'sent';
      request.latency = 20 + Math.random() * 30;

      setAgents(prev => prev.map(a =>
        a.id === server.id ? { ...a, status: 'processing', lastActivity: 'Processing request' } : a
      ));

      // Create response
      setTimeout(() => {
        const response: Message = {
          id: `rest-resp-${Date.now()}`,
          from: server.id,
          to: client.id,
          protocol: 'REST',
          type: 'response',
          content: `200 OK - {"data": "value_${Math.floor(Math.random() * 1000)}"}`,
          timestamp: Date.now(),
          status: 'received',
          latency: request.latency,
        };

        setMessages(prev => [...prev, response]);
        setMessageHistory(prev => [...prev.slice(-19), response]);

        setAgents(prev => prev.map(a => {
          if (a.id === client.id) return { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Received response' };
          if (a.id === server.id) return { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Sent response' };
          return a;
        }));

        updateMetrics('REST', request.latency!, true);
      }, 100 / speed);
    }, 50 / speed);
  }, [agents, speed]);

  const simulateWebSocketCommunication = useCallback(() => {
    const clients = agents.filter(a => a.protocol === 'WebSocket' && a.type === 'sender');
    const server = agents.find(a => a.id === 'ws-server');

    if (!server || clients.length === 0) return;

    const sender = clients[Math.floor(Math.random() * clients.length)];

    // Create WebSocket message
    const message: Message = {
      id: `ws-${Date.now()}`,
      from: sender.id,
      to: 'ws-server',
      protocol: 'WebSocket',
      type: 'broadcast',
      content: `{"event": "update", "data": "${Math.random().toString(36).substring(7)}"}`,
      timestamp: Date.now(),
      status: 'pending',
    };

    setMessages(prev => [...prev, message]);
    setAgents(prev => prev.map(a =>
      a.id === sender.id ? { ...a, status: 'sending', lastActivity: 'Broadcasting message' } : a
    ));

    // Instant delivery (WebSocket is real-time)
    setTimeout(() => {
      message.status = 'received';
      message.latency = 5 + Math.random() * 10;

      // Broadcast to all connected clients
      const otherClients = clients.filter(c => c.id !== sender.id);

      setAgents(prev => prev.map(a => {
        if (a.id === sender.id) return { ...a, status: 'idle', messageCount: a.messageCount + 1 };
        if (a.id === server.id) return { ...a, status: 'processing', messageCount: a.messageCount + 1, lastActivity: 'Broadcasting to clients' };
        if (otherClients.some(c => c.id === a.id)) return { ...a, status: 'receiving', lastActivity: 'Receiving broadcast' };
        return a;
      }));

      // Deliver to other clients
      setTimeout(() => {
        otherClients.forEach(client => {
          const broadcast: Message = {
            id: `ws-broadcast-${Date.now()}-${client.id}`,
            from: server.id,
            to: client.id,
            protocol: 'WebSocket',
            type: 'broadcast',
            content: message.content,
            timestamp: Date.now(),
            status: 'received',
            latency: message.latency,
          };

          setMessageHistory(prev => [...prev.slice(-19), broadcast]);
        });

        setAgents(prev => prev.map(a => {
          if (otherClients.some(c => c.id === a.id)) {
            return { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Received broadcast' };
          }
          if (a.id === server.id) return { ...a, status: 'idle', lastActivity: 'Broadcast complete' };
          return a;
        }));

        updateMetrics('WebSocket', message.latency!, true);
      }, 20 / speed);
    }, 10 / speed);
  }, [agents, speed]);

  const simulatePubSubCommunication = useCallback(() => {
    const publishers = agents.filter(a => a.protocol === 'PubSub' && a.type === 'sender');
    const subscribers = agents.filter(a => a.protocol === 'PubSub' && a.type === 'subscriber');

    if (publishers.length === 0 || subscribers.length === 0) return;

    const publisher = publishers[Math.floor(Math.random() * publishers.length)];
    const topic = 'events-topic';

    // Publish message
    const message: Message = {
      id: `pubsub-${Date.now()}`,
      from: publisher.id,
      to: topic,
      protocol: 'PubSub',
      type: 'publish',
      content: `{"topic": "events", "payload": {"id": ${Math.floor(Math.random() * 1000)}, "type": "event"}}`,
      timestamp: Date.now(),
      status: 'pending',
    };

    setMessages(prev => [...prev, message]);
    setAgents(prev => prev.map(a =>
      a.id === publisher.id ? { ...a, status: 'sending', lastActivity: `Publishing to ${topic}` } : a
    ));

    // Deliver to subscribers asynchronously
    setTimeout(() => {
      message.status = 'sent';
      message.latency = 10 + Math.random() * 20;

      // Notify each subscriber
      subscribers.forEach((subscriber, index) => {
        setTimeout(() => {
          const notification: Message = {
            id: `pubsub-notify-${Date.now()}-${subscriber.id}`,
            from: topic,
            to: subscriber.id,
            protocol: 'PubSub',
            type: 'subscribe',
            content: message.content,
            timestamp: Date.now(),
            status: 'received',
            latency: message.latency! + index * 5,
          };

          setMessageHistory(prev => [...prev.slice(-19), notification]);

          setAgents(prev => prev.map(a => {
            if (a.id === subscriber.id) {
              return { ...a, status: 'receiving', messageCount: a.messageCount + 1, lastActivity: 'Received event' };
            }
            return a;
          }));

          // Mark as processed
          setTimeout(() => {
            setAgents(prev => prev.map(a => {
              if (a.id === subscriber.id) {
                return { ...a, status: 'idle', lastActivity: 'Event processed' };
              }
              return a;
            }));
          }, 50 / speed);
        }, (index * 10) / speed);
      });

      setAgents(prev => prev.map(a =>
        a.id === publisher.id ? { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Published successfully' } : a
      ));

      updateMetrics('PubSub', message.latency!, true);
    }, 30 / speed);
  }, [agents, speed]);

  const simulateMessageQueueCommunication = useCallback(() => {
    const producers = agents.filter(a => a.protocol === 'MessageQueue' && a.type === 'sender');
    const consumers = agents.filter(a => a.protocol === 'MessageQueue' && a.type === 'receiver');
    const broker = agents.find(a => a.id === 'queue-broker');

    if (producers.length === 0 || consumers.length === 0 || !broker) return;

    const producer = producers[Math.floor(Math.random() * producers.length)];
    const queue = channels.find(c => c.id === 'task-queue');

    if (!queue) return;

    // Produce message to queue
    const message: Message = {
      id: `queue-${Date.now()}`,
      from: producer.id,
      to: 'task-queue',
      protocol: 'MessageQueue',
      type: 'request',
      content: `{"task": "process", "priority": ${Math.floor(Math.random() * 3)}, "data": "${Math.random().toString(36).substring(7)}"}`,
      timestamp: Date.now(),
      status: 'pending',
      retries: 0,
    };

    setMessages(prev => [...prev, message]);
    setAgents(prev => prev.map(a =>
      a.id === producer.id ? { ...a, status: 'sending', lastActivity: 'Enqueuing message' } : a
    ));

    // Add to queue
    setTimeout(() => {
      message.status = 'sent';
      queue.messageQueue.push(message);

      setChannels(prev => prev.map(c =>
        c.id === 'task-queue' ? { ...c, messageQueue: [...c.messageQueue, message], throughput: c.throughput + 1 } : c
      ));

      setAgents(prev => prev.map(a => {
        if (a.id === producer.id) return { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Message enqueued' };
        if (a.id === broker.id) return { ...a, status: 'processing', lastActivity: 'Managing queue' };
        return a;
      }));

      // Consumer pulls from queue
      const availableConsumers = consumers.filter(c =>
        agents.find(a => a.id === c.id)?.status === 'idle'
      );

      if (availableConsumers.length > 0 && queue.messageQueue.length > 0) {
        const consumer = availableConsumers[Math.floor(Math.random() * availableConsumers.length)];

        setTimeout(() => {
          const dequeuedMessage = queue.messageQueue.shift();
          if (!dequeuedMessage) return;

          dequeuedMessage.status = 'received';
          dequeuedMessage.latency = 15 + Math.random() * 35;

          setChannels(prev => prev.map(c =>
            c.id === 'task-queue' ? { ...c, messageQueue: c.messageQueue.filter(m => m.id !== dequeuedMessage.id) } : c
          ));

          setAgents(prev => prev.map(a => {
            if (a.id === consumer.id) return { ...a, status: 'processing', lastActivity: 'Processing task' };
            if (a.id === broker.id) return { ...a, messageCount: a.messageCount + 1 };
            return a;
          }));

          // Acknowledge processing
          setTimeout(() => {
            const ack: Message = {
              id: `queue-ack-${Date.now()}`,
              from: consumer.id,
              to: broker.id,
              protocol: 'MessageQueue',
              type: 'response',
              content: 'ACK - Task processed successfully',
              timestamp: Date.now(),
              status: 'acknowledged',
              latency: dequeuedMessage.latency,
            };

            setMessageHistory(prev => [...prev.slice(-19), ack]);

            setAgents(prev => prev.map(a => {
              if (a.id === consumer.id) return { ...a, status: 'idle', messageCount: a.messageCount + 1, lastActivity: 'Task completed' };
              if (a.id === broker.id) return { ...a, status: 'idle', lastActivity: 'Queue updated' };
              return a;
            }));

            updateMetrics('MessageQueue', dequeuedMessage.latency!, true);
          }, 100 / speed);
        }, 50 / speed);
      }
    }, 40 / speed);
  }, [agents, channels, speed]);

  const updateMetrics = (protocol: ProtocolType, latency: number, success: boolean) => {
    setMetrics(prev => prev.map(m => {
      if (m.protocol === protocol) {
        const newMessagesPerSecond = m.messagesPerSecond * 0.9 + 0.1 * (success ? 1 : 0);
        const newAvgLatency = m.avgLatency * 0.9 + 0.1 * latency;
        const newSuccessRate = m.successRate * 0.95 + (success ? 5 : 0);
        const activeConnections = agents.filter(a => a.protocol === protocol && a.status !== 'idle').length;

        return {
          ...m,
          messagesPerSecond: Math.round(newMessagesPerSecond * 10) / 10,
          avgLatency: Math.round(newAvgLatency * 10) / 10,
          successRate: Math.min(100, Math.round(newSuccessRate * 10) / 10),
          activeConnections,
        };
      }
      return m;
    }));
  };

  // Simulation runner
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const rand = Math.random();
        if (rand < 0.25) {
          simulateRESTCommunication();
        } else if (rand < 0.5) {
          simulateWebSocketCommunication();
        } else if (rand < 0.75) {
          simulatePubSubCommunication();
        } else {
          simulateMessageQueueCommunication();
        }
      }, 1000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, simulateRESTCommunication, simulateWebSocketCommunication, simulatePubSubCommunication, simulateMessageQueueCommunication]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMessages([]);
    setMessageHistory([]);
    initializeAgents();
    initializeChannels();
    initializeMetrics();
  };

  const getProtocolIcon = (protocol: ProtocolType) => {
    switch (protocol) {
      case 'REST': return <Globe className="w-4 h-4" />;
      case 'WebSocket': return <Zap className="w-4 h-4" />;
      case 'PubSub': return <Radio className="w-4 h-4" />;
      case 'MessageQueue': return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getProtocolColor = (protocol: ProtocolType) => {
    switch (protocol) {
      case 'REST': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'WebSocket': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'PubSub': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'MessageQueue': return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'idle': return 'bg-gray-600';
      case 'sending': return 'bg-blue-500';
      case 'receiving': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
    }
  };

  const filteredAgents = selectedProtocol === 'all'
    ? agents
    : agents.filter(a => a.protocol === selectedProtocol);

  const filteredMetrics = selectedProtocol === 'all'
    ? metrics
    : metrics.filter(m => m.protocol === selectedProtocol);

  return (
    <div className="w-full space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Speed:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-300 w-12">{speed}x</span>
            </div>
          </div>
        </div>

        {/* Protocol Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProtocol('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedProtocol === 'all'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Protocols
          </button>
          {(['REST', 'WebSocket', 'PubSub', 'MessageQueue'] as ProtocolType[]).map(protocol => (
            <button
              key={protocol}
              onClick={() => setSelectedProtocol(protocol)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                selectedProtocol === protocol
                  ? getProtocolColor(protocol)
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {getProtocolIcon(protocol)}
              {protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Active Agents
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredAgents.map(agent => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border transition-all ${
                    getProtocolColor(agent.protocol)
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getProtocolIcon(agent.protocol)}
                      <span className="font-medium text-sm">{agent.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} ${
                      agent.status !== 'idle' ? 'animate-pulse' : ''
                    }`} />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="text-gray-400">Type: {agent.type}</div>
                    <div className="text-gray-400">Messages: {agent.messageCount}</div>
                    {agent.lastActivity && (
                      <div className="text-gray-500 truncate">{agent.lastActivity}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channels & Queues */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Channels & Queues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.filter(c => selectedProtocol === 'all' || c.protocol === selectedProtocol).map(channel => (
                <div key={channel.id} className={`p-3 rounded-lg border ${getProtocolColor(channel.protocol)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{channel.name}</span>
                    {getProtocolIcon(channel.protocol)}
                  </div>
                  <div className="text-xs space-y-1 text-gray-400">
                    <div>Queue Depth: {channel.messageQueue.length}</div>
                    <div>Subscribers: {channel.subscribers.length}</div>
                    <div>Throughput: {channel.throughput} msgs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics & History Panel */}
        <div className="space-y-4">
          {/* Protocol Metrics */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Protocol Metrics</h3>
            <div className="space-y-3">
              {filteredMetrics.map(metric => (
                <div key={metric.protocol} className={`p-3 rounded-lg border ${getProtocolColor(metric.protocol)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getProtocolIcon(metric.protocol)}
                    <span className="font-medium text-sm">{metric.protocol}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Throughput</div>
                      <div className="font-medium">{metric.messagesPerSecond} msg/s</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Avg Latency</div>
                      <div className="font-medium">{metric.avgLatency}ms</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Success Rate</div>
                      <div className="font-medium">{metric.successRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Active Conns</div>
                      <div className="font-medium">{metric.activeConnections}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message History */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-400" />
              Message History
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messageHistory.slice(-10).reverse().map((msg, index) => (
                <div
                  key={`${msg.id}-${index}`}
                  className={`p-2 rounded border text-xs ${getProtocolColor(msg.protocol)}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      {getProtocolIcon(msg.protocol)}
                      <span className="font-medium">{msg.type.toUpperCase()}</span>
                    </div>
                    {msg.latency && (
                      <span className="text-gray-500">{msg.latency.toFixed(1)}ms</span>
                    )}
                  </div>
                  <div className="text-gray-400">
                    <div>{msg.from} → {msg.to}</div>
                    <div className="truncate mt-1">{msg.content}</div>
                  </div>
                </div>
              ))}
              {messageHistory.length === 0 && (
                <div className="text-gray-500 text-center py-4">No messages yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCommunicationProtocolsDemo;