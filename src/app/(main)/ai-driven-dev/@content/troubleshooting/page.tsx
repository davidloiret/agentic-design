"use client"

import React from 'react';
import { Wrench, AlertCircle, CheckCircle, XCircle, Zap, Search, Code2, Terminal } from 'lucide-react';

export default function TroubleshootingContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold">Troubleshooting Guide</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Common issues with AI coding tools and how to fix them. Solutions for errors, 
            performance problems, and unexpected behavior.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 bg-gray-900/50 rounded-lg p-6 border border-gray-700">
          <h2 className="font-bold text-white mb-4">Jump to:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <a href="#auth-errors" className="text-teal-400 hover:text-teal-300">• Authentication</a>
            <a href="#api-limits" className="text-teal-400 hover:text-teal-300">• API Limits</a>
            <a href="#bad-output" className="text-teal-400 hover:text-teal-300">• Poor Quality</a>
            <a href="#slow-response" className="text-teal-400 hover:text-teal-300">• Performance</a>
            <a href="#context-issues" className="text-teal-400 hover:text-teal-300">• Context Problems</a>
            <a href="#tool-crashes" className="text-teal-400 hover:text-teal-300">• Crashes</a>
            <a href="#billing" className="text-teal-400 hover:text-teal-300">• Billing Issues</a>
            <a href="#security" className="text-teal-400 hover:text-teal-300">• Security Errors</a>
          </div>
        </div>

        {/* Authentication Errors */}
        <section id="auth-errors" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-400" />
            Authentication Errors
          </h2>

          <div className="space-y-6">
            {/* Error 1 */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
              <h3 className="font-bold text-red-400 mb-3">❌ "Invalid API Key" or "Unauthorized"</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Symptoms:</strong></p>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• AI completions don't work</li>
                  <li>• Error: "API key invalid"</li>
                  <li>• Tool shows "Authentication failed"</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Solutions:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Check API key format:</strong> Should start with sk-, claude-, ghp_, etc.</li>
                  <li><strong>Verify key is not expired:</strong> Check your AI provider dashboard</li>
                  <li><strong>Regenerate key:</strong> Create new API key and update .env file</li>
                  <li><strong>Check environment variables:</strong> Run <code className="bg-gray-900 px-1 rounded">echo $ANTHROPIC_API_KEY</code></li>
                  <li><strong>Restart tool:</strong> Close and reopen IDE/terminal after updating keys</li>
                </ol>
              </div>
              <div className="bg-green-900/20 rounded p-3 text-xs text-green-300">
                <strong>Quick fix:</strong> <code className="bg-gray-900 px-1 rounded">export ANTHROPIC_API_KEY="sk-ant-xxx"</code> then restart tool
              </div>
            </div>

            {/* Error 2 */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
              <h3 className="font-bold text-red-400 mb-3">❌ "Rate limit exceeded for organization"</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Symptoms:</strong></p>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• Error after several requests</li>
                  <li>• Works then stops working</li>
                  <li>• "Too many requests" error</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Solutions:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Wait 1 minute:</strong> Rate limits usually reset quickly</li>
                  <li><strong>Upgrade tier:</strong> Free/trial tiers have strict limits</li>
                  <li><strong>Use different API key:</strong> If team has multiple keys</li>
                  <li><strong>Implement retry logic:</strong> Add exponential backoff in code</li>
                  <li><strong>Check usage limits:</strong> View API dashboard for current usage</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* API Limits */}
        <section id="api-limits" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            API Limits & Quotas
          </h2>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-yellow-500/30">
            <h3 className="font-bold text-yellow-400 mb-4">Common Rate Limits (as of Jan 2025):</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-2 text-gray-400">Provider</th>
                    <th className="text-left p-2 text-gray-400">Free Tier</th>
                    <th className="text-left p-2 text-gray-400">Paid Tier</th>
                    <th className="text-left p-2 text-gray-400">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-2 text-white">Anthropic</td>
                    <td className="p-2 text-gray-400">5 req/min</td>
                    <td className="p-2 text-gray-400">1000 req/min</td>
                    <td className="p-2 text-teal-400">Upgrade to paid</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-2 text-white">OpenAI</td>
                    <td className="p-2 text-gray-400">3 req/min</td>
                    <td className="p-2 text-gray-400">3500 req/min</td>
                    <td className="p-2 text-teal-400">Add payment method</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-2 text-white">GitHub Copilot</td>
                    <td className="p-2 text-gray-400">N/A</td>
                    <td className="p-2 text-gray-400">Unlimited</td>
                    <td className="p-2 text-teal-400">Subscribe</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500">Limits change frequently. Check provider documentation.</p>
          </div>
        </section>

        {/* Poor Quality Output */}
        <section id="bad-output" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-400" />
            Poor Quality AI Output
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <h3 className="font-bold text-purple-400 mb-3">🤔 "AI generates buggy/incorrect code"</h3>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Fixes:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Add more context:</strong> Include related files, interfaces, types in prompt</li>
                  <li><strong>Be specific:</strong> "Create React component with TypeScript, Tailwind CSS" vs "make component"</li>
                  <li><strong>Show examples:</strong> Few-shot learning - give AI examples of desired output</li>
                  <li><strong>Break into steps:</strong> Don't ask AI to build entire feature at once</li>
                  <li><strong>Try different model:</strong> Claude 3.5 Sonnet often better than GPT-4 for code</li>
                  <li><strong>Regenerate:</strong> Click "Try again" - AI is non-deterministic</li>
                </ol>
              </div>
              <div className="bg-purple-900/20 rounded p-3 text-xs text-purple-300">
                <strong>Pro tip:</strong> Use chain-of-thought prompting: "Before writing code, explain your approach."
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <h3 className="font-bold text-purple-400 mb-3">🤔 "AI uses outdated patterns"</h3>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Fixes:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Specify versions:</strong> "Use React 18 hooks, not class components"</li>
                  <li><strong>Show modern examples:</strong> Paste current codebase patterns</li>
                  <li><strong>Mention year:</strong> "Using 2025 best practices..."</li>
                  <li><strong>Use newer models:</strong> Models trained on recent data</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Issues */}
        <section id="slow-response" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-green-400" />
            Slow Response Times
          </h2>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
            <h3 className="font-bold text-green-400 mb-4">⏱️ "AI takes too long to respond"</h3>
            <div className="mb-4">
              <p className="text-sm text-white mb-2">Typical Times:</p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Autocomplete: 0.5-2 seconds</li>
                <li>• Chat response: 3-10 seconds</li>
                <li>• Agent mode: 30-120 seconds</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4 mb-4">
              <p className="text-sm text-white mb-2">Solutions:</p>
              <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                <li><strong>Reduce context:</strong> Don't include entire codebase, only relevant files</li>
                <li><strong>Use faster models:</strong> GPT-3.5-turbo faster than GPT-4</li>
                <li><strong>Check internet:</strong> Slow connection = slow responses</li>
                <li><strong>Switch to local models:</strong> Ollama/LM Studio for instant responses</li>
                <li><strong>Use streaming:</strong> See partial results as AI generates</li>
                <li><strong>Restart tool:</strong> Sometimes fixes hung connections</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Context Issues */}
        <section id="context-issues" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-400" />
            Context Window Problems
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <h3 className="font-bold text-blue-400 mb-3">📄 "This request is too long"</h3>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Fixes:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Remove large files:</strong> Don't include package-lock.json, build artifacts</li>
                  <li><strong>Use .cursorignore:</strong> Exclude node_modules, dist/, .git/</li>
                  <li><strong>Focus on specific files:</strong> Explicitly reference only needed code</li>
                  <li><strong>Switch to larger model:</strong> Claude 3.5 has 200K context vs GPT-4's 128K</li>
                  <li><strong>Break into smaller requests:</strong> Ask about one function at a time</li>
                </ol>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <h3 className="font-bold text-blue-400 mb-3">🔍 "AI doesn't see my file"</h3>
              <div className="bg-gray-800/50 rounded p-4 mb-4">
                <p className="text-sm text-white mb-2">Fixes:</p>
                <ol className="text-xs text-gray-300 space-y-2 ml-4 list-decimal">
                  <li><strong>Check .gitignore:</strong> File might be excluded</li>
                  <li><strong>Check workspace:</strong> Make sure file is in current project</li>
                  <li><strong>Explicitly reference:</strong> "@filename.ts" or paste code directly</li>
                  <li><strong>Restart IDE:</strong> Indexing may be stale</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Crashes */}
        <section id="tool-crashes" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-400" />
            Tool Crashes & Freezes
          </h2>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
            <h3 className="font-bold text-red-400 mb-4">💥 Common Crash Scenarios</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded p-4">
                <p className="text-sm text-white mb-2">Cursor/VS Code freezes:</p>
                <ol className="text-xs text-gray-300 space-y-1 ml-4 list-decimal">
                  <li>Disable other extensions (conflict with AI extension)</li>
                  <li>Clear cache: <code className="bg-gray-900 px-1 rounded">~/.cursor</code> or <code className="bg-gray-900 px-1 rounded">~/.vscode</code></li>
                  <li>Update to latest version</li>
                  <li>Reinstall extension</li>
                </ol>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <p className="text-sm text-white mb-2">Terminal agent (Claude Code, Aider) crashes:</p>
                <ol className="text-xs text-gray-300 space-y-1 ml-4 list-decimal">
                  <li>Check Python version: <code className="bg-gray-900 px-1 rounded">python --version</code> (need 3.10+)</li>
                  <li>Reinstall: <code className="bg-gray-900 px-1 rounded">pip install --upgrade aider-chat</code></li>
                  <li>Check logs: <code className="bg-gray-900 px-1 rounded">~/.aider/logs/</code></li>
                  <li>Run with debug: <code className="bg-gray-900 px-1 rounded">aider --verbose</code></li>
                </ol>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <p className="text-sm text-white mb-2">Web platform (Bolt, V0) not loading:</p>
                <ol className="text-xs text-gray-300 space-y-1 ml-4 list-decimal">
                  <li>Clear browser cache</li>
                  <li>Try incognito mode (disable extensions)</li>
                  <li>Check status page (status.bolt.new)</li>
                  <li>Try different browser</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Billing */}
        <section id="billing" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Billing Issues
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/30">
              <h3 className="font-bold text-orange-400 mb-3">💳 "Payment declined"</h3>
              <div className="text-xs text-gray-300 space-y-2">
                <p>1. Check card has sufficient funds</p>
                <p>2. Verify card not expired</p>
                <p>3. Contact bank (may block AI service charges)</p>
                <p>4. Try different payment method</p>
                <p>5. Check billing address matches card</p>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-500/30">
              <h3 className="font-bold text-orange-400 mb-3">📊 "Unexpected high costs"</h3>
              <div className="text-xs text-gray-300 space-y-2">
                <p>1. Check usage dashboard (tokens consumed)</p>
                <p>2. Look for API key leaks (GitHub, logs)</p>
                <p>3. Set spending limits in provider dashboard</p>
                <p>4. Review which team members are using keys</p>
                <p>5. Switch to cheaper models (gpt-3.5 vs gpt-4)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Errors */}
        <section id="security" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-400" />
            Security Warnings
          </h2>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
            <h3 className="font-bold text-red-400 mb-4">🔒 Common Security Issues:</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-white mb-1">⚠️ "API key detected in commit"</p>
                <p className="text-xs text-gray-400 mb-2">Solution: Immediately revoke key, use .env files, add to .gitignore</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">⚠️ "SSL certificate error"</p>
                <p className="text-xs text-gray-400 mb-2">Solution: Update CA certificates, check corporate proxy settings</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">⚠️ "AI generated code with SQL injection"</p>
                <p className="text-xs text-gray-400 mb-2">Solution: Always review AI code, use parameterized queries, run Snyk scan</p>
              </div>
            </div>
          </div>
        </section>

        {/* General Debugging */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">General Debugging Steps</h2>
          
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">When all else fails, try these in order:</p>
            <ol className="text-sm text-gray-300 space-y-2 ml-6 list-decimal">
              <li>Restart the tool/IDE</li>
              <li>Check API key is valid and not expired</li>
              <li>Check internet connection</li>
              <li>Clear cache/cookies</li>
              <li>Update to latest version</li>
              <li>Check provider status page</li>
              <li>Read error logs (usually in ~/.tool-name/logs/)</li>
              <li>Search GitHub issues for your error message</li>
              <li>Ask in tool's Discord/Slack community</li>
              <li>Contact support with logs</li>
            </ol>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/environment-setup" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Environment Setup</p>
              <p className="text-sm text-gray-400">Proper installation guides</p>
            </a>
            <a href="/ai-driven-dev/security-best-practices" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Security Best Practices</p>
              <p className="text-sm text-gray-400">Prevent security errors</p>
            </a>
            <a href="/ai-driven-dev/cost-management" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Cost Management</p>
              <p className="text-sm text-gray-400">Control spending</p>
            </a>
            <a href="/ai-driven-dev/prompt-engineering" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Prompt Engineering</p>
              <p className="text-sm text-gray-400">Get better AI outputs</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
