"use client"

import React from 'react';
import { 
  FileText,
  Lock,
  Unlock,
  AlertTriangle,
  Brain,
  Github,
  Globe,
  Eye,
  Shield,
  Search,
  Database
} from 'lucide-react';

export default function PromptHubOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-orange-400" />
          <h1 className="text-3xl font-bold text-white">Prompt Hub Overview</h1>
        </div>
        <p className="text-xl text-gray-300 mb-6">
          Explore leaked AI system prompts organized by provider. Understand how major AI models are programmed to behave.
        </p>
        <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-300">Key Insight</span>
          </div>
          <p className="text-yellow-100 text-sm">
            "If you're interacting with an AI without knowing its system prompt, you're not talking to a neutral intelligence — you're talking to a shadow-puppet."
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Database className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">17</div>
          <div className="text-sm text-gray-400">Total Prompts</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Brain className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">8</div>
          <div className="text-sm text-gray-400">AI Providers</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Shield className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">2025</div>
          <div className="text-sm text-gray-400">Latest Leaks</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Search className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">Live</div>
          <div className="text-sm text-gray-400">Updated Daily</div>
        </div>
      </div>

      {/* Provider Categories */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Browse by Provider</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Anthropic */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Anthropic</h3>
                <p className="text-sm text-gray-400">Claude Series</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Constitutional AI prompts from Claude 2.0 through 3.5 Sonnet, including the famous 24,000-token leak.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-medium">6 prompts</span>
              <span className="text-xs text-gray-500">2024-2025</span>
            </div>
          </div>

          {/* OpenAI */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">OpenAI</h3>
                <p className="text-sm text-gray-400">GPT Series</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              ChatGPT, GPT-4o, DALL-E 3, and Assistants API system prompts revealing OpenAI's approach.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-medium">5 prompts</span>
              <span className="text-xs text-gray-500">2022-2025</span>
            </div>
          </div>

          {/* Microsoft */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-indigo-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Microsoft</h3>
                <p className="text-sm text-gray-400">Copilot Series</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Microsoft Copilot and GitHub Copilot Chat prompts showing enterprise AI integration.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-indigo-400 font-medium">4 prompts</span>
              <span className="text-xs text-gray-500">2023-2024</span>
            </div>
          </div>

          {/* xAI */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">xAI</h3>
                <p className="text-sm text-gray-400">Grok Series</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Elon Musk's Grok AI system prompts with real-time X integration and uncensored approach.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-medium">10 prompts</span>
              <span className="text-xs text-gray-500">2023-2025</span>
            </div>
          </div>

          {/* Google */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Google</h3>
                <p className="text-sm text-gray-400">Gemini Series</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Gemini multimodal prompts showing Google's search integration and cross-platform approach.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-red-400 font-medium">2 prompts</span>
              <span className="text-xs text-gray-500">2024</span>
            </div>
          </div>

          {/* Perplexity */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-teal-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Perplexity</h3>
                <p className="text-sm text-gray-400">Search AI</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Real-time search AI prompts showing citation and source handling mechanisms.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-teal-400 font-medium">1 prompt</span>
              <span className="text-xs text-gray-500">2025</span>
            </div>
          </div>

          {/* The Browser Company */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">The Browser Company</h3>
                <p className="text-sm text-gray-400">Browser-Native AI</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Revolutionary browser-native AI with Ask Dia Hyperlinks and rich multimedia integration.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-medium">1 prompt</span>
              <span className="text-xs text-gray-500">2025</span>
            </div>
          </div>

          {/* Cognition */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Cognition</h3>
                <p className="text-sm text-gray-400">Software Engineer AI</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Revolutionary AI software engineer operating on real computer systems with full OS integration.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-orange-400 font-medium">1 prompt</span>
              <span className="text-xs text-gray-500">2025</span>
            </div>
          </div>

        </div>
      </div>

      {/* Understanding System Prompts */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Understanding System Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">What are System Prompts?</h3>
            <p className="text-gray-300 text-sm mb-4">
              System prompts are hidden instructions that define an AI model's behavior, personality, and capabilities. 
              They're like the "DNA" of AI assistants - invisible to users but controlling every interaction.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Define personality and tone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Set safety boundaries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Control knowledge access</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Why This Matters</h3>
            <p className="text-gray-300 text-sm mb-4">
              Understanding system prompts reveals the biases, limitations, and hidden agendas built into AI systems. 
              This transparency is crucial for informed AI usage.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Reveals hidden biases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Shows manipulation tactics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Enables informed decisions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg p-6 border border-orange-800/30">
        <h3 className="text-lg font-semibold text-white mb-4">🔥 Recent Major Leaks</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-medium">Claude 3.5 Sonnet (May 2025)</p>
              <p className="text-xs text-gray-400">24,000-token constitutional AI framework leaked</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-medium">Grok 3 (January 2025)</p>
              <p className="text-xs text-gray-400">Uncensored AI with real-time data access</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-white font-medium">ChatGPT-4o (December 2024)</p>
              <p className="text-xs text-gray-400">Enhanced multimodal capabilities revealed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}