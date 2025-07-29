"use client"

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Zap, Target, Code } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthCTA } from './AuthCTA';

interface ChatBotProps {
  onRecommendationSelect?: (useCase: string, complexity: string) => void;
  getRecommendations?: () => any[];
  techniques?: any[];
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export const ChatBot = ({ onRecommendationSelect, getRecommendations, techniques = [] }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthCTA, setShowAuthCTA] = useState(false);
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI reasoning assistant. I can help you learn or find the best patterns for your project. What are you building?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Build a chatbot",
        "Create an analysis tool", 
        "Design a recommendation system",
        "Develop a planning assistant"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { icon: Target, text: "What's best for my use case?", action: "usecase" },
    { icon: Zap, text: "I need something fast", action: "speed" },
    { icon: Code, text: "Show me code examples", action: "code" },
    { icon: Sparkles, text: "Surprise me!", action: "random" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Pattern matching for different intents
    if (lowerMessage.includes('chatbot') || lowerMessage.includes('conversational')) {
      return "For chatbots, I recommend Chain-of-Thought (CoT) for reasoning transparency, or ReAct for tool integration. CoT is simpler to implement and great for conversational flow!";
    }
    
    if (lowerMessage.includes('analysis') || lowerMessage.includes('data')) {
      return "For analysis tools, Tree-of-Thoughts (ToT) excels at exploring multiple approaches, while PALM provides systematic verification. What type of data will you be analyzing?";
    }
    
    if (lowerMessage.includes('recommendation') || lowerMessage.includes('suggest')) {
      return "For recommendation systems, Self-Consistency works great for multiple perspective generation, and ReAct can integrate with external data sources. Are you building content or product recommendations?";
    }
    
    if (lowerMessage.includes('planning') || lowerMessage.includes('task')) {
      return "For planning assistants, I'd suggest ReAct for tool integration or Decomposition for breaking down complex tasks. What kind of planning are you focusing on?";
    }
    
    if (lowerMessage.includes('fast') || lowerMessage.includes('speed') || lowerMessage.includes('quick')) {
              return "For speed, Chain-of-Thought is your best bet! It&apos;s lightweight and fast. Self-Correction is also quick while improving accuracy. Avoid Tree-of-Thoughts for speed-critical apps.";
    }
    
    if (lowerMessage.includes('accurate') || lowerMessage.includes('quality')) {
      return "For maximum accuracy, try Tree-of-Thoughts or PALM. ToT explores multiple reasoning paths, while PALM provides systematic verification. They're slower but much more accurate!";
    }
    
    if (lowerMessage.includes('simple') || lowerMessage.includes('beginner') || lowerMessage.includes('easy')) {
              return "Start with Chain-of-Thought! It&apos;s the most straightforward pattern and works great for most use cases. You can always upgrade to more complex patterns later.";
    }
    
    if (lowerMessage.includes('code') || lowerMessage.includes('example') || lowerMessage.includes('implement')) {
      return "I can show you implementations! Chain-of-Thought has the cleanest code examples. Which pattern interests you most?";
    }
    
    // Default responses with helpful suggestions
    const defaultResponses = [
      "That's interesting! Could you tell me more about your specific requirements? Are you prioritizing speed, accuracy, or simplicity?",
      "I'd love to help you choose the right pattern. What's the main goal of your project?",
      "Great question! To give you the best recommendation, what constraints are you working with? (speed, resources, complexity)",
      "Let me help you find the perfect pattern. What type of reasoning does your application need?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(async () => {
      const response = await generateResponse(messageToSend);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
        suggestions: generateSuggestions(messageToSend)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('chatbot')) {
      return ["Tell me about Chain-of-Thought", "Show ReAct examples", "What about tool integration?"];
    }
    
    if (lowerMessage.includes('fast')) {
      return ["Compare CoT vs Self-Correction", "Show me benchmarks", "Any other fast patterns?"];
    }
    
    if (lowerMessage.includes('accurate')) {
      return ["Explain Tree-of-Thoughts", "What is PALM?", "Show accuracy comparisons"];
    }
    
    return ["Tell me more", "Show examples", "What else should I consider?"];
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "usecase":
        handleSend("What's the best pattern for my specific use case?");
        break;
      case "speed":
        handleSend("I need something fast and efficient");
        break;
      case "code":
        handleSend("Can you show me some code examples?");
        break;
      case "random":
        const randomTechnique = techniques[Math.floor(Math.random() * techniques.length)];
        handleSend(`Tell me about ${randomTechnique?.name || 'an interesting pattern'}`);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          if (!user) {
            setShowAuthCTA(true);
            setIsOpen(true);
          } else {
            setIsOpen(true);
          }
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 z-50"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile fullscreen overlay */}
      <div className="md:hidden fixed inset-0 bg-gray-900 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">AI Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close AI Assistant"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* AuthCTA or Messages */}
        {showAuthCTA && !user ? (
          <AuthCTA 
            onClose={() => {
              setShowAuthCTA(false);
              setIsOpen(false);
            }} 
            variant="replacement" 
          />
        ) : (
          <>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${
                message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-sm p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        <div className="p-4 border-t border-gray-700">
          <div className="grid grid-cols-1 gap-2 mb-4">
            {quickSuggestions.map((suggestion, idx) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(suggestion.action)}
                  className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300"
                >
                  <Icon className="w-4 h-4" />
                  <span>{suggestion.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg p-3 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
          </>
        )}
      </div>

      {/* Desktop popup */}
      <div className="hidden md:block fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">AI Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close AI Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AuthCTA or Messages */}
        {showAuthCTA && !user ? (
          <AuthCTA 
            onClose={() => {
              setShowAuthCTA(false);
              setIsOpen(false);
            }} 
            variant="overlay" 
          />
        ) : (
          <>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm">{message.content}</p>
                {message.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions - only show when no messages yet */}
        {messages.length <= 1 && (
          <div className="p-3 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickSuggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(suggestion.action)}
                    className="flex items-center gap-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs text-gray-300"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input - always at bottom */}
        <div className="mt-auto p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg p-2 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
};