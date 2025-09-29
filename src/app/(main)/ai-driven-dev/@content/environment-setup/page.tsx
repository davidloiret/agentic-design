"use client"

import React, { useState } from 'react';
import { Terminal, Key, CheckCircle, AlertTriangle, Copy, Check, Settings, Lock, Cloud, Laptop } from 'lucide-react';

export default function EnvironmentSetupPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
            <Settings className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Environment Setup
            </h1>
            <p className="text-gray-400 mt-2">
              Configure your development environment for AI coding
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Laptop className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Local First</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Run AI tools locally, full control over data and privacy
          </p>
          <div className="text-xs text-gray-500">
            Time: ~30 minutes
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Cloud Based</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Use web platforms, no installation required
          </p>
          <div className="text-xs text-gray-500">
            Time: ~5 minutes
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Hybrid</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Local IDE with cloud AI services (recommended)
          </p>
          <div className="text-xs text-gray-500">
            Time: ~15 minutes
          </div>
        </div>
      </div>

      {/* API Keys Setup */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-semibold text-white">API Keys Configuration</h2>
        </div>

        <p className="text-gray-400 mb-6">
          Most AI coding tools require API keys. Here's how to get and configure them:
        </p>

        <div className="space-y-6">
          {/* Anthropic (Claude) */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Anthropic (Claude)</h3>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Most Popular</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>1. Get API Key:</strong></p>
                <div className="bg-gray-950 rounded p-3 text-sm text-gray-400">
                  Visit <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">console.anthropic.com</a> → API Keys → Create Key
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>2. Set Environment Variable:</strong></p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800 relative">
                  <button
                    onClick={() => copyToClipboard('export ANTHROPIC_API_KEY="sk-ant-..."', 'anthropic')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedId === 'anthropic' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."`}
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>Pricing:</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-950 rounded p-3 text-sm">
                    <p className="text-gray-400">Claude 3.7 Sonnet</p>
                    <p className="text-white font-medium">$3 / 1M input tokens</p>
                    <p className="text-gray-500 text-xs mt-1">Best for production</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 text-sm">
                    <p className="text-gray-400">Claude 3.5 Haiku</p>
                    <p className="text-white font-medium">$1 / 1M input tokens</p>
                    <p className="text-gray-500 text-xs mt-1">Fast, budget-friendly</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <p className="text-xs text-purple-200">
                  <strong>Used by:</strong> Claude Code, Cursor, Cline, Windsurf (BYOK)
                </p>
              </div>
            </div>
          </div>

          {/* OpenAI */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">OpenAI (GPT-4)</h3>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Widely Supported</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>1. Get API Key:</strong></p>
                <div className="bg-gray-950 rounded p-3 text-sm text-gray-400">
                  Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">platform.openai.com/api-keys</a> → Create new secret key
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>2. Set Environment Variable:</strong></p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800 relative">
                  <button
                    onClick={() => copyToClipboard('export OPENAI_API_KEY="sk-..."', 'openai')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedId === 'openai' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Add to ~/.bashrc or ~/.zshrc
export OPENAI_API_KEY="sk-..."`}
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>Pricing:</strong></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-950 rounded p-3 text-sm">
                    <p className="text-gray-400">GPT-4 Turbo</p>
                    <p className="text-white font-medium">$10 / 1M input tokens</p>
                    <p className="text-gray-500 text-xs mt-1">High quality</p>
                  </div>
                  <div className="bg-gray-950 rounded p-3 text-sm">
                    <p className="text-gray-400">GPT-4o</p>
                    <p className="text-white font-medium">$2.50 / 1M input tokens</p>
                    <p className="text-gray-500 text-xs mt-1">Faster, cheaper</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <p className="text-xs text-green-200">
                  <strong>Used by:</strong> Cursor, GitHub Copilot, Aider, Continue.dev, most tools
                </p>
              </div>
            </div>
          </div>

          {/* Google (Gemini) */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Google (Gemini)</h3>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Free Tier</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>1. Get API Key:</strong></p>
                <div className="bg-gray-950 rounded p-3 text-sm text-gray-400">
                  Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">makersuite.google.com/app/apikey</a> → Get API Key
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>2. Set Environment Variable:</strong></p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800 relative">
                  <button
                    onClick={() => copyToClipboard('export GOOGLE_API_KEY="..."', 'google')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedId === 'google' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Add to ~/.bashrc or ~/.zshrc
export GOOGLE_API_KEY="..."`}
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2"><strong>Free Tier:</strong></p>
                <div className="bg-gray-950 rounded p-3 text-sm">
                  <p className="text-white font-medium">15 RPM (requests per minute)</p>
                  <p className="text-gray-400 text-xs mt-1">Gemini 2.5 Flash • 1M token context • Free forever</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <p className="text-xs text-blue-200">
                  <strong>Used by:</strong> Windsurf (default), Cursor, Continue.dev
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IDE Setup */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">IDE & Tool Installation</h2>

        <div className="space-y-6">
          {/* Cursor */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Cursor (AI-Native IDE)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-300 mb-3"><strong>Installation:</strong></p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">1. Download from <a href="https://cursor.sh" className="text-cyan-400">cursor.sh</a></p>
                  <p className="text-gray-400">2. Install like VS Code (it's a fork)</p>
                  <p className="text-gray-400">3. Import VS Code settings (optional)</p>
                  <p className="text-gray-400">4. Configure API keys in Settings → Models</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-3"><strong>Pro Tips:</strong></p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>• Use Cmd+K for inline AI commands</p>
                  <p>• Enable Agent Mode for complex tasks</p>
                  <p>• Try Max Mode for large codebases</p>
                  <p>• Cmd+L for chat interface</p>
                </div>
              </div>
            </div>
          </div>

          {/* Claude Code */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Claude Code (Terminal Agent)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-300 mb-3"><strong>Installation:</strong></p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800 relative">
                  <button
                    onClick={() => copyToClipboard('npm install -g @anthropic-ai/claude-code', 'claude-code')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedId === 'claude-code' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300">
{`# Install globally
npm install -g @anthropic-ai/claude-code

# Or with homebrew
brew install claude-code`}
                  </pre>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-3"><strong>First Run:</strong></p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800 relative">
                  <button
                    onClick={() => copyToClipboard('claude-code', 'claude-run')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedId === 'claude-run' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <pre className="text-sm text-gray-300">
{`# Start in your project directory
cd your-project
claude-code

# It will ask for API key on first run`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* VS Code Extensions */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">VS Code Extensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-950 rounded p-4 border border-gray-800">
                <p className="font-medium text-white mb-2">Cline</p>
                <p className="text-xs text-gray-400 mb-3">1.2M+ installs, most popular</p>
                <code className="text-xs text-cyan-400">ext install saoudrizwan.claude-dev</code>
              </div>
              <div className="bg-gray-950 rounded p-4 border border-gray-800">
                <p className="font-medium text-white mb-2">GitHub Copilot</p>
                <p className="text-xs text-gray-400 mb-3">$10/month, universal</p>
                <code className="text-xs text-cyan-400">ext install GitHub.copilot</code>
              </div>
              <div className="bg-gray-950 rounded p-4 border border-gray-800">
                <p className="font-medium text-white mb-2">Continue.dev</p>
                <p className="text-xs text-gray-400 mb-3">Open source, customizable</p>
                <code className="text-xs text-cyan-400">ext install Continue.continue</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-start gap-3 mb-6">
          <Lock className="w-6 h-6 text-red-400 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Security Best Practices</h2>
            <p className="text-gray-400">Protect your API keys and sensitive data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Use Environment Variables</p>
                <p className="text-xs text-gray-400">Never hardcode API keys in source code</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Add .env to .gitignore</p>
                <p className="text-xs text-gray-400">Prevent accidental commits of secrets</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Rotate Keys Regularly</p>
                <p className="text-xs text-gray-400">Change API keys every 90 days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Use Read-Only Keys When Possible</p>
                <p className="text-xs text-gray-400">Limit permissions to minimum necessary</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Monitor Usage</p>
                <p className="text-xs text-gray-400">Set billing alerts to catch leaked keys</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Review Tool Permissions</p>
                <p className="text-xs text-gray-400">Understand what data each tool accesses</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Use Different Keys Per Project</p>
                <p className="text-xs text-gray-400">Isolate exposure if one is compromised</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Revoke Unused Keys</p>
                <p className="text-xs text-gray-400">Delete old keys after project completion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded p-4">
          <p className="text-sm text-red-200">
            <strong>⚠️ Never commit:</strong> .env files, API keys, tokens, passwords, private keys, or any credentials to version control
          </p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Common Issues & Solutions</h2>

        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ "API key not found" error</p>
            <p className="text-sm text-gray-400 mb-2">Solution: Restart terminal after setting environment variables, or use <code className="text-cyan-400">source ~/.bashrc</code></p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Rate limit errors</p>
            <p className="text-sm text-gray-400 mb-2">Solution: Reduce requests, upgrade tier, or use multiple API keys with rotation</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Context window exceeded</p>
            <p className="text-sm text-gray-400 mb-2">Solution: Use tools with larger context (Cursor Max Mode, Claude Code), or break tasks into smaller chunks</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-medium text-white mb-2">❌ Slow responses</p>
            <p className="text-sm text-gray-400 mb-2">Solution: Try faster models (GPT-4o, Claude 3.5 Haiku), reduce context size, or check network connection</p>
          </div>
        </div>
      </div>
    </div>
  );
}