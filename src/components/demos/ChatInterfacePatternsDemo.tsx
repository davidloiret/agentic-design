'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Send, Paperclip, Code, Image, FileText,
  Link, ThumbsUp, Heart, Sparkles, Loader, ChevronRight,
  GitBranch, Users, Clock, Bot, User, Hash, Plus,
  BookOpen, Share2, Edit, Trash2, MoreVertical, Search
} from 'lucide-react';

// Types
type MessageType = 'text' | 'code' | 'image' | 'document' | 'link' | 'widget';
type SenderType = 'user' | 'agent' | 'system';
type ThreadStatus = 'active' | 'resolved' | 'archived';

interface Reaction {
  emoji: string;
  users: string[];
}

interface Citation {
  id: string;
  source: string;
  url?: string;
  confidence: number;
  excerpt?: string;
}

interface Message {
  id: string;
  threadId: string;
  parentId?: string;
  sender: SenderType;
  senderName: string;
  content: string;
  type: MessageType;
  timestamp: number;
  isThinking?: boolean;
  citations?: Citation[];
  reactions: Reaction[];
  edited?: boolean;
  codeLanguage?: string;
  imageUrl?: string;
  documentName?: string;
  linkUrl?: string;
  widgetData?: any;
}

interface Thread {
  id: string;
  title: string;
  status: ThreadStatus;
  participants: string[];
  messageCount: number;
  lastActivity: number;
  parentThreadId?: string;
  summary?: string;
  tags: string[];
}

interface TypingIndicator {
  threadId: string;
  user: string;
}

const ChatInterfacePatternsDemo = () => {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 'main',
      title: 'Main Conversation',
      status: 'active',
      participants: ['User', 'AI Assistant'],
      messageCount: 0,
      lastActivity: Date.now(),
      tags: ['general', 'getting-started']
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [activeThreadId, setActiveThreadId] = useState('main');
  const [inputValue, setInputValue] = useState('');
  const [attachmentType, setAttachmentType] = useState<MessageType>('text');
  const [showCitations, setShowCitations] = useState<string | null>(null);
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showThreadPanel, setShowThreadPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const threadIdRef = useRef(1);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      threadId: 'main',
      sender: 'agent',
      senderName: 'AI Assistant',
      content: 'Welcome to the Chat Interface Patterns demo! I can help you explore threading, rich content, and collaborative features. Try sending different types of content or creating new threads!',
      type: 'text',
      timestamp: Date.now(),
      reactions: []
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate agent responses
  const generateAgentResponse = (userMessage: Message) => {
    // Show typing indicator
    setTypingIndicators(prev => [...prev, { threadId: userMessage.threadId, user: 'AI Assistant' }]);

    // Simulate thinking
    setTimeout(() => {
      const thinkingMessage: Message = {
        id: `msg-${messageIdRef.current++}`,
        threadId: userMessage.threadId,
        parentId: userMessage.id,
        sender: 'agent',
        senderName: 'AI Assistant',
        content: '',
        type: 'text',
        timestamp: Date.now(),
        isThinking: true,
        reactions: []
      };
      setMessages(prev => [...prev, thinkingMessage]);

      // Generate actual response
      setTimeout(() => {
        setTypingIndicators(prev => prev.filter(t => t.user !== 'AI Assistant'));

        let responseContent = '';
        let responseType: MessageType = 'text';
        let additionalProps: Partial<Message> = {};

        if (userMessage.content.toLowerCase().includes('code')) {
          responseContent = `function analyzePattern(data) {
  // Implementing chat interface pattern
  const threads = data.threads || [];
  const messages = threads.flatMap(t => t.messages);

  return {
    threadCount: threads.length,
    messageCount: messages.length,
    richContent: messages.filter(m => m.type !== 'text').length
  };
}`;
          responseType = 'code';
          additionalProps.codeLanguage = 'javascript';
        } else if (userMessage.content.toLowerCase().includes('image')) {
          responseContent = 'Here\'s a visualization of the chat architecture:';
          responseType = 'image';
          additionalProps.imageUrl = '/api/placeholder/600/400';
        } else if (userMessage.content.toLowerCase().includes('document')) {
          responseContent = 'I\'ve prepared a comprehensive guide on chat patterns:';
          responseType = 'document';
          additionalProps.documentName = 'Chat_Interface_Patterns_Guide.pdf';
        } else if (userMessage.content.toLowerCase().includes('thread')) {
          responseContent = 'Threading allows us to organize conversations by topic. You can create branches for different discussions, keeping each context separate while maintaining the overall conversation flow.';
          additionalProps.citations = [
            { id: '1', source: 'Slack Engineering Blog', url: 'https://slack.engineering', confidence: 0.95, excerpt: 'Threading improves conversation organization...' },
            { id: '2', source: 'UX Research Papers', confidence: 0.88, excerpt: 'Users prefer threaded conversations for complex topics...' }
          ];
        } else {
          const responses = [
            'That\'s an interesting point! Let me elaborate on that with some examples.',
            'I understand. Here\'s how we can implement that pattern effectively.',
            'Great question! This relates to several key design principles.',
            'Let me show you how this works with a practical example.'
          ];
          responseContent = responses[Math.floor(Math.random() * responses.length)];

          if (Math.random() > 0.5) {
            additionalProps.citations = [
              { id: '1', source: 'Design Systems Guide', confidence: 0.92 },
              { id: '2', source: 'Chat UX Best Practices', confidence: 0.87 }
            ];
          }
        }

        const response: Message = {
          id: `msg-${messageIdRef.current++}`,
          threadId: userMessage.threadId,
          parentId: userMessage.id,
          sender: 'agent',
          senderName: 'AI Assistant',
          content: responseContent,
          type: responseType,
          timestamp: Date.now(),
          reactions: [],
          ...additionalProps
        };

        setMessages(prev => prev.filter(m => m.id !== thinkingMessage.id).concat(response));
        updateThreadActivity(userMessage.threadId);
      }, 2000);
    }, 500);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: `msg-${messageIdRef.current++}`,
      threadId: activeThreadId,
      sender: 'user',
      senderName: 'User',
      content: inputValue,
      type: attachmentType,
      timestamp: Date.now(),
      reactions: [],
      codeLanguage: attachmentType === 'code' ? 'javascript' : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    updateThreadActivity(activeThreadId);
    setInputValue('');
    setAttachmentType('text');

    // Generate agent response
    generateAgentResponse(newMessage);
  };

  const createThread = (parentMessageId?: string) => {
    const newThread: Thread = {
      id: `thread-${threadIdRef.current++}`,
      title: `Branch: ${parentMessageId ? 'Discussion' : 'New Topic'}`,
      status: 'active',
      participants: ['User', 'AI Assistant'],
      messageCount: 0,
      lastActivity: Date.now(),
      parentThreadId: parentMessageId ? activeThreadId : undefined,
      tags: []
    };

    setThreads(prev => [...prev, newThread]);
    setActiveThreadId(newThread.id);

    if (parentMessageId) {
      const branchMessage: Message = {
        id: `msg-${messageIdRef.current++}`,
        threadId: newThread.id,
        sender: 'system',
        senderName: 'System',
        content: `Thread branched from main conversation`,
        type: 'text',
        timestamp: Date.now(),
        reactions: []
      };
      setMessages(prev => [...prev, branchMessage]);
    }
  };

  const updateThreadActivity = (threadId: string) => {
    setThreads(prev => prev.map(t =>
      t.id === threadId
        ? { ...t, lastActivity: Date.now(), messageCount: t.messageCount + 1 }
        : t
    ));
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.users.includes('User')) {
            existingReaction.users = existingReaction.users.filter(u => u !== 'User');
            if (existingReaction.users.length === 0) {
              msg.reactions = msg.reactions.filter(r => r.emoji !== emoji);
            }
          } else {
            existingReaction.users.push('User');
          }
        } else {
          msg.reactions.push({ emoji, users: ['User'] });
        }
      }
      return msg;
    }));
  };

  const renderMessage = (message: Message) => {
    const isAgent = message.sender === 'agent';
    const isSystem = message.sender === 'system';

    if (message.isThinking) {
      return (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader className="w-4 h-4 animate-spin" />
          <span className="italic">AI is thinking...</span>
        </div>
      );
    }

    return (
      <div className={`flex ${isAgent ? 'justify-start' : isSystem ? 'justify-center' : 'justify-end'}`}>
        <div className={`max-w-2xl ${isSystem ? 'w-full' : ''}`}>
          <div className={`rounded-lg p-4
            ${isAgent ? 'bg-gray-800' : isSystem ? 'bg-gray-700/50 text-center' : 'bg-blue-600'}`}>

            {/* Message Header */}
            {!isSystem && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  <span className="text-sm font-medium">{message.senderName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  {message.edited && <span className="text-xs text-gray-500">(edited)</span>}
                </div>
                <button className="text-gray-400 hover:text-gray-300">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Message Content */}
            <div className="text-gray-100">
              {message.type === 'code' ? (
                <div className="bg-gray-900 rounded p-3 font-mono text-sm overflow-x-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{message.codeLanguage}</span>
                    <button className="text-xs text-blue-400 hover:text-blue-300">Copy</button>
                  </div>
                  <pre>{message.content}</pre>
                </div>
              ) : message.type === 'image' ? (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                    <Image className="w-32 h-32 text-gray-500" />
                  </div>
                </div>
              ) : message.type === 'document' ? (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <div className="bg-gray-700/50 rounded-lg p-3 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <div className="flex-1">
                      <p className="font-medium">{message.documentName}</p>
                      <p className="text-xs text-gray-400">PDF Document • 2.3 MB</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30">
                      Open
                    </button>
                  </div>
                </div>
              ) : (
                <p>{message.content}</p>
              )}

              {/* Citations */}
              {message.citations && message.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => setShowCitations(showCitations === message.id ? null : message.id)}
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                  >
                    <BookOpen className="w-3 h-3" />
                    {message.citations.length} source{message.citations.length > 1 ? 's' : ''}
                    <ChevronRight className={`w-3 h-3 transition-transform ${showCitations === message.id ? 'rotate-90' : ''}`} />
                  </button>
                  {showCitations === message.id && (
                    <div className="mt-2 space-y-2">
                      {message.citations.map((citation) => (
                        <div key={citation.id} className="bg-gray-700/50 rounded p-2 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{citation.source}</span>
                            <span className="text-green-400">{Math.round(citation.confidence * 100)}% confidence</span>
                          </div>
                          {citation.excerpt && (
                            <p className="text-gray-400 italic">"{citation.excerpt}"</p>
                          )}
                          {citation.url && (
                            <a href={citation.url} className="text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1">
                              <Link className="w-3 h-3" />
                              View source
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reactions */}
            {!isSystem && (
              <div className="flex items-center gap-2 mt-3">
                {message.reactions.map((reaction) => (
                  <button
                    key={reaction.emoji}
                    onClick={() => addReaction(message.id, reaction.emoji)}
                    className={`px-2 py-1 rounded-full text-sm flex items-center gap-1
                      ${reaction.users.includes('User')
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-xs">{reaction.users.length}</span>
                  </button>
                ))}
                <div className="flex gap-1">
                  {['👍', '❤️', '🎉', '🤔', '👀'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => addReaction(message.id, emoji)}
                      className="w-7 h-7 rounded hover:bg-gray-700 flex items-center justify-center text-sm"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => createThread(message.id)}
                  className="ml-auto text-gray-400 hover:text-gray-300 flex items-center gap-1 text-sm"
                >
                  <GitBranch className="w-4 h-4" />
                  Branch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const activeMessages = messages.filter(m => m.threadId === activeThreadId);
  const filteredThreads = threads.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Chat Interface Patterns Demo</h2>
        <p className="text-gray-400">Threading, rich content, and collaborative features for agent interactions</p>
      </div>

      <div className="flex gap-6 h-[600px]">
        {/* Thread Panel */}
        {showThreadPanel && (
          <div className="w-64 bg-gray-800 rounded-lg p-4 flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search threads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 text-gray-100 rounded-lg text-sm"
                />
              </div>
            </div>

            <button
              onClick={() => createThread()}
              className="w-full mb-4 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Thread
            </button>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredThreads.map(thread => (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all
                    ${activeThreadId === thread.id
                      ? 'bg-blue-500/20 border border-blue-400'
                      : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100 text-sm flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {thread.title}
                    </span>
                    {thread.status === 'active' && (
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{thread.messageCount} messages</span>
                    <span>{thread.participants.length} participants</span>
                  </div>
                  {thread.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {thread.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-600 rounded text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 bg-gray-800 rounded-lg flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowThreadPanel(!showThreadPanel)}
                className="text-gray-400 hover:text-gray-300"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {threads.find(t => t.id === activeThreadId)?.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {threads.find(t => t.id === activeThreadId)?.participants.join(', ')}
                  </span>
                  {typingIndicators.filter(t => t.threadId === activeThreadId).length > 0 && (
                    <span className="text-blue-400 animate-pulse">
                      {typingIndicators.find(t => t.threadId === activeThreadId)?.user} is typing...
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded hover:bg-gray-700">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300 rounded hover:bg-gray-700">
                <Users className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeMessages.map(message => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setAttachmentType('text')}
                className={`p-2 rounded ${attachmentType === 'text' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setAttachmentType('code')}
                className={`p-2 rounded ${attachmentType === 'code' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <Code className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setAttachmentType('image')}
                className={`p-2 rounded ${attachmentType === 'image' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <Image className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setAttachmentType('document')}
                className={`p-2 rounded ${attachmentType === 'document' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                <FileText className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Send a ${attachmentType} message...`}
                className="flex-1 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{threads.length}</div>
          <div className="text-sm text-gray-400">Active Threads</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{messages.length}</div>
          <div className="text-sm text-gray-400">Total Messages</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">
            {messages.filter(m => m.type !== 'text').length}
          </div>
          <div className="text-sm text-gray-400">Rich Content</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {messages.reduce((acc, m) => acc + m.reactions.length, 0)}
          </div>
          <div className="text-sm text-gray-400">Reactions</div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterfacePatternsDemo;