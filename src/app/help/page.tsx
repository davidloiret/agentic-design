'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  HelpCircle, 
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Book,
  Video,
  FileText,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Zap,
  Shield,
  CreditCard,
  Settings,
  Lightbulb,
  Download,
  Globe
} from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
  tags: string[];
}

interface SupportTicket {
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

function HelpPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [supportForm, setSupportForm] = useState<SupportTicket>({
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Support', icon: MessageSquare },
    { id: 'resources', label: 'Resources', icon: Book },
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: HelpCircle },
    { id: 'account', label: 'Account & Billing', icon: CreditCard },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'features', label: 'Features & Usage', icon: Zap },
    { id: 'technical', label: 'Technical Issues', icon: Settings },
    { id: 'getting-started', label: 'Getting Started', icon: Lightbulb },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'getting-started',
      question: 'How do I get started with Agentic Design?',
      answer: 'Getting started is easy! After creating your account, explore our Pattern Library to learn about different AI design patterns. Start with basic patterns like Prompt Chaining and gradually work your way up to more advanced techniques. Check out our interactive tutorials and examples to get hands-on experience.',
      helpful: 145,
      tags: ['onboarding', 'patterns', 'tutorial']
    },
    {
      id: '2',
      category: 'account',
      question: 'How do I upgrade my plan?',
      answer: 'You can upgrade your plan anytime by visiting the Billing section in your account settings. Choose from our Pro or Enterprise plans to unlock additional features like unlimited projects, priority support, and advanced integrations. Your upgrade takes effect immediately.',
      helpful: 98,
      tags: ['billing', 'upgrade', 'plans']
    },
    {
      id: '3',
      category: 'features',
      question: 'What AI patterns are available?',
      answer: 'We offer comprehensive coverage of AI design patterns including Prompt Chaining, Routing, Parallelization, Reflection, Tool Use, Multi-Agent systems, Memory Management, and Knowledge Retrieval. Each pattern includes detailed explanations, code examples, and interactive demos.',
      helpful: 203,
      tags: ['patterns', 'features', 'ai']
    },
    {
      id: '4',
      category: 'security',
      question: 'How is my data protected?',
      answer: 'We take security seriously. All data is encrypted in transit and at rest using industry-standard encryption. We never store your API keys in plain text, and you have full control over your data with options to export or delete it at any time. We comply with GDPR and other privacy regulations.',
      helpful: 167,
      tags: ['security', 'privacy', 'data']
    },
    {
      id: '5',
      category: 'technical',
      question: 'API rate limits and quotas',
      answer: 'Rate limits vary by plan: Free (100 requests/day), Pro (10,000 requests/day), Enterprise (unlimited). If you exceed your quota, you can upgrade your plan or wait for the daily reset. Enterprise customers can request custom rate limits.',
      helpful: 89,
      tags: ['api', 'limits', 'quota']
    },
    {
      id: '6',
      category: 'account',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from the Billing section. Your access will continue until the end of your current billing period. If you cancel, you can always reactivate your subscription later without losing your data.',
      helpful: 76,
      tags: ['billing', 'cancel', 'subscription']
    },
    {
      id: '7',
      category: 'features',
      question: 'Can I integrate with my existing tools?',
      answer: 'Yes! We offer integrations with popular development tools, APIs, and frameworks. Pro and Enterprise plans include custom integrations, webhooks, and API access. Check our documentation for specific integration guides.',
      helpful: 134,
      tags: ['integrations', 'api', 'tools']
    },
    {
      id: '8',
      category: 'technical',
      question: 'Troubleshooting common errors',
      answer: 'Common issues include API key configuration, network timeouts, and rate limiting. Check your API key setup, ensure stable internet connection, and verify you haven\'t exceeded rate limits. Our status page shows any ongoing service issues.',
      helpful: 112,
      tags: ['troubleshooting', 'errors', 'debugging']
    }
  ];

  const resources = [
    {
      category: 'Documentation',
      items: [
        { title: 'Getting Started Guide', icon: Book, url: '#', description: 'Complete guide to using Agentic Design' },
        { title: 'API Reference', icon: FileText, url: '#', description: 'Detailed API documentation and examples' },
        { title: 'Pattern Library', icon: Lightbulb, url: '#', description: 'Comprehensive AI pattern documentation' },
        { title: 'Integration Guides', icon: Settings, url: '#', description: 'How to integrate with popular tools' },
      ]
    },
    {
      category: 'Tutorials & Videos',
      items: [
        { title: 'Video Tutorials', icon: Video, url: '#', description: 'Step-by-step video guides' },
        { title: 'Webinar Recordings', icon: Video, url: '#', description: 'Expert sessions and Q&A' },
        { title: 'Best Practices', icon: CheckCircle, url: '#', description: 'Tips and recommendations from experts' },
        { title: 'Use Case Examples', icon: Lightbulb, url: '#', description: 'Real-world implementation examples' },
      ]
    },
    {
      category: 'Community',
      items: [
        { title: 'Community Forum', icon: Users, url: '#', description: 'Connect with other users and experts' },
        { title: 'Discord Server', icon: MessageSquare, url: '#', description: 'Real-time chat and support' },
        { title: 'GitHub Repository', icon: ExternalLink, url: '#', description: 'Open source examples and contributions' },
        { title: 'Blog & Updates', icon: Globe, url: '#', description: 'Latest news and feature announcements' },
      ]
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleSubmitSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to submit support ticket
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      setSupportForm({ subject: '', message: '', priority: 'medium', category: 'general' });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No FAQ found</h3>
            <p className="text-gray-500">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-800/30 rounded-lg border border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{faq.question}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="capitalize">{faq.category.replace('-', ' ')}</span>
                    <span>{faq.helpful} people found this helpful</span>
                  </div>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-700/50">
                    <p className="text-gray-300 leading-relaxed mb-4">{faq.answer}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <button className="px-3 py-1 text-sm bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors duration-200">
                          Yes
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderContactSupport = () => (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6 text-center">
          <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-100 mb-2">Email Support</h3>
          <p className="text-sm text-gray-400 mb-3">Get help via email</p>
          <p className="text-blue-400 text-sm">contact@agentic-design.ai</p>
          <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
        </div>

        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6 text-center">
          <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-100 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-400 mb-3">Chat with our team</p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors duration-200">
            Start Chat
          </button>
          <p className="text-xs text-gray-500 mt-2">Available 9 AM - 6 PM EST</p>
        </div>

        <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6 text-center">
          <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-100 mb-2">Priority Support</h3>
          <p className="text-sm text-gray-400 mb-3">Enterprise customers</p>
          <p className="text-purple-400 text-sm">Dedicated support manager</p>
          <p className="text-xs text-gray-500 mt-2">Response within 2 hours</p>
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Submit a Support Request</span>
        </h3>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400">Support request submitted successfully! We'll get back to you soon.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitSupport} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={supportForm.category}
                onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="general">General Question</option>
                <option value="billing">Billing & Account</option>
                <option value="technical">Technical Issue</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={supportForm.priority}
                onChange={(e) => setSupportForm({ ...supportForm, priority: e.target.value as any })}
                className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={supportForm.subject}
              onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={supportForm.message}
              onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
              rows={6}
              className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Please describe your issue in detail..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      {resources.map((section) => (
        <div key={section.category}>
          <h3 className="text-xl font-semibold text-gray-100 mb-6">{section.category}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                      <span>{item.title}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return renderFAQ();
      case 'contact':
        return renderContactSupport();
      case 'resources':
        return renderResources();
      default:
        return renderFAQ();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Help & Support</h1>
              <p className="text-gray-400">Find answers and get assistance</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-4 shadow-2xl">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-left ${
                        activeTab === tab.id
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <ProtectedRoute>
      <HelpPageContent />
    </ProtectedRoute>
  );
}