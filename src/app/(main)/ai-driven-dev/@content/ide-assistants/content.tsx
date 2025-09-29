"use client"

import React from 'react';
import { Code2, Zap, Star, DollarSign, CheckCircle } from 'lucide-react';

export default function IDEAssistantsContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
            <Code2 className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI-Native IDEs</h1>
            <p className="text-gray-400 mt-2">Complete IDE replacements with AI at the core</p>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Cursor</h2>
              <p className="text-sm text-gray-400">by Anysphere • Most Popular</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$20/mo</p>
            <p className="text-xs text-gray-400">Pro plan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Agent Mode:</strong> AI handles multi-file changes autonomously</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>All Models:</strong> Claude, GPT-4, Gemini, DeepSeek support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Cmd+K:</strong> Inline AI commands for quick edits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Max Mode:</strong> 1M token context window</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>VS Code Fork:</strong> All extensions work</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Best For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Power users who need all models</li>
              <li>• Large refactoring projects</li>
              <li>• Developers switching from VS Code</li>
              <li>• Teams wanting flexibility</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Pricing:</strong></p>
              <p className="text-xs text-gray-500">Free: 2k completions/mo</p>
              <p className="text-xs text-gray-500">Pro ($20): 500 fast requests</p>
              <p className="text-xs text-gray-500">Business ($40): Unlimited + admin</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
          <p className="text-sm text-blue-200">
            <strong>Why Popular:</strong> Cursor pioneered the AI-native IDE category. Agent mode and multi-model support make it the go-to for serious developers.
          </p>
        </div>
      </div>

      {/* Windsurf */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Windsurf</h2>
              <p className="text-sm text-gray-400">by Codeium • Best Value</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$15/mo</p>
            <p className="text-xs text-gray-400">Pro plan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Cascade:</strong> Automatic context detection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Supercomplete:</strong> Multi-line predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Flows:</strong> Reusable AI workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Clean UI:</strong> Polished, beginner-friendly</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Best For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Developers new to AI coding</li>
              <li>• Budget-conscious teams</li>
              <li>• UI/UX focused development</li>
              <li>• Fast prototyping</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Note:</strong></p>
              <p className="text-xs text-gray-500">Gemini 2.5 Flash default (free)</p>
              <p className="text-xs text-gray-500">BYOK for Claude/GPT-4</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
          <p className="text-sm text-green-200">
            <strong>Why Choose:</strong> $5 cheaper than Cursor with similar features. Cascade auto-context is impressive. Great for those who don't need every model.
          </p>
        </div>
      </div>

      {/* Continue.dev */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Continue.dev</h2>
              <p className="text-sm text-gray-400">Open Source • Most Flexible</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Free</p>
            <p className="text-xs text-gray-400">Open source</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong>Any Model:</strong> OpenAI, Anthropic, local LLMs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong>VS Code Extension:</strong> Works in existing setup</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong>Fully Customizable:</strong> Config-driven</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span><strong>Privacy First:</strong> Self-hosted option</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Best For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Developers who want full control</li>
              <li>• Privacy-conscious teams</li>
              <li>• Custom model integration</li>
              <li>• Open source enthusiasts</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Trade-off:</strong> Requires setup and configuration. Not as polished as commercial options, but offers unmatched flexibility and privacy.
          </p>
        </div>
      </div>

      {/* Augment */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Augment</h2>
              <p className="text-sm text-gray-400">Enterprise Focus</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">Custom</p>
            <p className="text-xs text-gray-400">Enterprise pricing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-white mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span><strong>SOC2 Certified:</strong> Enterprise security</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span><strong>On-Premise:</strong> Deploy in your infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span><strong>Team Training:</strong> Fine-tune on your code</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Best For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Large enterprises (500+ devs)</li>
              <li>• Regulated industries (finance, healthcare)</li>
              <li>• Air-gapped environments</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Recommendation */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Quick Recommendation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <Star className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-medium text-white mb-2">Most Popular</h3>
            <p className="text-sm text-gray-400 mb-3">Cursor - Best overall features and model access</p>
            <p className="text-xs text-gray-500">$20/month</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <DollarSign className="w-6 h-6 text-green-400 mb-3" />
            <h3 className="font-medium text-white mb-2">Best Value</h3>
            <p className="text-sm text-gray-400 mb-3">Windsurf - Great features for less money</p>
            <p className="text-xs text-gray-500">$15/month</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <Star className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="font-medium text-white mb-2">Most Flexible</h3>
            <p className="text-sm text-gray-400 mb-3">Continue.dev - Open source, any model</p>
            <p className="text-xs text-gray-500">Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
