'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Mic, Image, ThumbsUp, CheckCircle, ArrowRight } from 'lucide-react';

type MessageRole = 'user' | 'agent' | 'system';
type Modality = 'text' | 'voice' | 'visual' | 'multimodal';
type IntentType = 'question' | 'command' | 'clarification' | 'confirmation';
type PhaseType = 'idle' | 'greeting' | 'intent-recognition' | 'multimodal-response' | 'clarification' | 'outcome-delivery' | 'complete';

interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  modality: Modality;
  intent?: IntentType;
  timestamp: number;
  suggestions?: string[];
  richMedia?: {
    type: 'card' | 'image' | 'button' | 'list';
    data: any;
  };
}

interface ConversationMetrics {
  completionRate: number;
  intentAccuracy: number;
  satisfactionScore: number;
  errorRecoverySuccess: number;
  modalitySwitchingSmooth: number;
  accessibilityCompliance: number;
}

const ConversationalInterfacePatternsDemo: React.FC = () => {
  const [phase, setPhase] = useState<PhaseType>('idle');
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentModality, setCurrentModality] = useState<Modality>('text');
  const [metrics, setMetrics] = useState<ConversationMetrics>({
    completionRate: 0,
    intentAccuracy: 0,
    satisfactionScore: 0,
    errorRecoverySuccess: 0,
    modalitySwitchingSmooth: 0,
    accessibilityCompliance: 0,
  });

  const conversationFlow: ConversationMessage[] = [
    {
      id: 'msg-1',
      role: 'user',
      content: 'I need help setting up a microservices architecture for my e-commerce platform',
      modality: 'text',
      intent: 'question',
      timestamp: Date.now(),
    },
    {
      id: 'msg-2',
      role: 'agent',
      content: 'I\'d be happy to help you design a microservices architecture. To provide the best guidance, I need to understand your requirements better. Let me ask a few questions.',
      modality: 'text',
      timestamp: Date.now() + 1000,
      suggestions: ['Tell me about your current setup', 'What are your main pain points?', 'Show me examples'],
    },
    {
      id: 'msg-3',
      role: 'user',
      content: 'We currently have a monolith handling 50K requests/sec. Main issues are scaling and deployment speed.',
      modality: 'text',
      intent: 'clarification',
      timestamp: Date.now() + 2000,
    },
    {
      id: 'msg-4',
      role: 'agent',
      content: 'Perfect, those are classic microservices use cases. Based on your traffic and requirements, I recommend a 3-tier approach. Let me show you visually.',
      modality: 'multimodal',
      timestamp: Date.now() + 3000,
      richMedia: {
        type: 'card',
        data: {
          title: 'Recommended Architecture',
          items: [
            'API Gateway Layer (Kong/AWS API Gateway)',
            'Service Layer (6-8 domain services)',
            'Data Layer (Database per service pattern)',
          ],
        },
      },
    },
    {
      id: 'msg-5',
      role: 'user',
      content: '[Voice] How do the services communicate?',
      modality: 'voice',
      intent: 'question',
      timestamp: Date.now() + 4000,
    },
    {
      id: 'msg-6',
      role: 'agent',
      content: 'Great question! For 50K req/sec, I recommend async event-driven communication using Kafka. Synchronous REST for user-facing APIs, async events for internal service communication.',
      modality: 'text',
      timestamp: Date.now() + 5000,
      richMedia: {
        type: 'list',
        data: {
          title: 'Communication Patterns',
          items: [
            { label: 'Synchronous', value: 'REST APIs for frontend ↔ services', icon: '↔️' },
            { label: 'Asynchronous', value: 'Kafka events for service ↔ service', icon: '📨' },
            { label: 'Real-time', value: 'WebSockets for notifications', icon: '⚡' },
          ],
        },
      },
    },
    {
      id: 'msg-7',
      role: 'user',
      content: 'Perfect! Can you generate a detailed implementation plan?',
      modality: 'text',
      intent: 'command',
      timestamp: Date.now() + 6000,
    },
    {
      id: 'msg-8',
      role: 'agent',
      content: 'Absolutely! I\'ve created a comprehensive 6-phase implementation plan with timelines, team structure, and technology choices tailored to your 50K req/sec requirement.',
      modality: 'multimodal',
      timestamp: Date.now() + 7000,
      richMedia: {
        type: 'card',
        data: {
          title: 'Implementation Roadmap',
          items: [
            'Phase 1: Service Boundaries (2 weeks)',
            'Phase 2: API Gateway Setup (1 week)',
            'Phase 3: Service Migration (6 weeks)',
            'Phase 4: Event Bus Integration (2 weeks)',
            'Phase 5: Monitoring & Observability (1 week)',
            'Phase 6: Load Testing & Optimization (2 weeks)',
          ],
        },
      },
    },
  ];

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => {
        setPhase('greeting');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'greeting') {
      setMessages([conversationFlow[0], conversationFlow[1]]);
      setTimeout(() => setPhase('intent-recognition'), 2500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'intent-recognition') {
      setMessages(prev => [...prev, conversationFlow[2]]);
      setTimeout(() => setPhase('multimodal-response'), 2000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'multimodal-response') {
      setCurrentModality('multimodal');
      setMessages(prev => [...prev, conversationFlow[3]]);
      setTimeout(() => setPhase('clarification'), 2500);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'clarification') {
      setCurrentModality('voice');
      setMessages(prev => [...prev, conversationFlow[4], conversationFlow[5]]);
      setTimeout(() => setPhase('outcome-delivery'), 3000);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'outcome-delivery') {
      setCurrentModality('multimodal');
      setMessages(prev => [...prev, conversationFlow[6], conversationFlow[7]]);

      setTimeout(() => {
        setMetrics({
          completionRate: 95,
          intentAccuracy: 92,
          satisfactionScore: 89,
          errorRecoverySuccess: 94,
          modalitySwitchingSmooth: 88,
          accessibilityCompliance: 96,
        });
        setPhase('complete');
      }, 3000);
    }
  }, [phase]);

  const getModalityIcon = (modality: Modality) => {
    switch (modality) {
      case 'text': return <MessageCircle className="w-4 h-4" />;
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'visual': return <Image className="w-4 h-4" />;
      case 'multimodal': return <ThumbsUp className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getModalityColor = (modality: Modality): string => {
    switch (modality) {
      case 'text': return 'text-blue-400';
      case 'voice': return 'text-purple-400';
      case 'visual': return 'text-green-400';
      case 'multimodal': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getPhaseDescription = (): string => {
    switch (phase) {
      case 'idle': return 'Initializing conversational interface...';
      case 'greeting': return 'Initial conversation exchange with intent gathering';
      case 'intent-recognition': return 'Understanding user requirements and context';
      case 'multimodal-response': return 'Delivering visual architecture recommendations';
      case 'clarification': return 'Voice-based question with detailed explanation';
      case 'outcome-delivery': return 'Final outcome: comprehensive implementation plan';
      case 'complete': return 'Conversation completed with multimodal, intent-based interaction';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${phase === 'complete' ? 'bg-green-600' : 'bg-blue-600'}`}>
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Conversational Interface</h3>
            <p className="text-sm text-gray-400 mt-1">{getPhaseDescription()}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg border-2 ${
            currentModality === 'text' ? 'bg-blue-600 border-blue-500' :
            currentModality === 'voice' ? 'bg-purple-600 border-purple-500' :
            currentModality === 'visual' ? 'bg-green-600 border-green-500' :
            'bg-orange-600 border-orange-500'
          }`}>
            <div className="flex items-center gap-2">
              {getModalityIcon(currentModality)}
              <span className="text-xs font-bold text-white uppercase">{currentModality}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {(['greeting', 'intent-recognition', 'multimodal-response', 'clarification', 'outcome-delivery'] as PhaseType[]).map((p, idx) => (
            <React.Fragment key={p}>
              <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' :
                ['intent-recognition', 'multimodal-response', 'clarification', 'outcome-delivery', 'complete'].includes(phase) && idx === 0 ? 'bg-green-600' :
                ['multimodal-response', 'clarification', 'outcome-delivery', 'complete'].includes(phase) && idx === 1 ? 'bg-green-600' :
                ['clarification', 'outcome-delivery', 'complete'].includes(phase) && idx === 2 ? 'bg-green-600' :
                ['outcome-delivery', 'complete'].includes(phase) && idx === 3 ? 'bg-green-600' :
                phase === 'complete' && idx === 4 ? 'bg-green-600' :
                'bg-slate-700'
              }`} />
              {idx < 4 && <div className="w-2 h-2 rounded-full bg-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start gap-3 mb-1">
                  {message.role === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      AI
                    </div>
                  )}
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm order-2">
                      U
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${
                        message.role === 'user' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {message.role === 'user' ? 'User' : 'Agent'}
                      </span>
                      <div className={`flex items-center gap-1 ${getModalityColor(message.modality)}`}>
                        {getModalityIcon(message.modality)}
                        <span className="text-xs capitalize">{message.modality}</span>
                      </div>
                      {message.intent && (
                        <span className="text-xs px-2 py-0.5 bg-slate-700 text-gray-300 rounded capitalize">
                          {message.intent}
                        </span>
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-gray-100'
                    }`}>
                      <p className="text-sm">{message.content}</p>

                      {message.richMedia && message.richMedia.type === 'card' && (
                        <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-600">
                          <div className="text-xs font-semibold text-white mb-2">
                            {message.richMedia.data.title}
                          </div>
                          <div className="space-y-1">
                            {message.richMedia.data.items.map((item: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <ArrowRight className="w-3 h-3 text-green-400" />
                                <span className="text-xs text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {message.richMedia && message.richMedia.type === 'list' && (
                        <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-600">
                          <div className="text-xs font-semibold text-white mb-2">
                            {message.richMedia.data.title}
                          </div>
                          <div className="space-y-2">
                            {message.richMedia.data.items.map((item: any, idx: number) => (
                              <div key={idx} className="p-2 bg-slate-900/50 rounded">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm">{item.icon}</span>
                                  <span className="text-xs font-semibold text-blue-400">{item.label}</span>
                                </div>
                                <p className="text-xs text-gray-400">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-full border border-slate-600 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {phase === 'complete' && (
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Conversation Metrics</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Completion Rate</div>
              <div className="text-2xl font-bold text-green-400">{metrics.completionRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Task flow completed</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Intent Accuracy</div>
              <div className="text-2xl font-bold text-blue-400">{metrics.intentAccuracy}%</div>
              <div className="text-xs text-gray-500 mt-1">User goals understood</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Satisfaction Score</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.satisfactionScore}%</div>
              <div className="text-xs text-gray-500 mt-1">vs traditional interface</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Error Recovery</div>
              <div className="text-2xl font-bold text-yellow-400">{metrics.errorRecoverySuccess}%</div>
              <div className="text-xs text-gray-500 mt-1">Failed conversations recovered</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Modality Switching</div>
              <div className="text-2xl font-bold text-orange-400">{metrics.modalitySwitchingSmooth}%</div>
              <div className="text-xs text-gray-500 mt-1">Smooth transitions</div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400 mb-1">Accessibility</div>
              <div className="text-2xl font-bold text-pink-400">{metrics.accessibilityCompliance}%</div>
              <div className="text-xs text-gray-500 mt-1">WCAG 2.1 AA compliance</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="text-sm text-blue-300">
              <strong>Conversation Summary:</strong> Successfully completed 8-turn conversation with intent-based outcome specification.
              Demonstrated seamless modality switching (text → multimodal → voice → multimodal) with {metrics.intentAccuracy}%
              intent recognition accuracy. Delivered rich media responses including architecture cards and communication pattern lists.
              Achieved {metrics.completionRate}% task completion rate with {metrics.satisfactionScore}% user satisfaction.
              {metrics.modalitySwitchingSmooth}% smooth modality transitions and {metrics.accessibilityCompliance}% accessibility compliance.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalInterfacePatternsDemo;