"use client"

import React from 'react';
import { DollarSign, TrendingDown, Calculator, AlertCircle, BarChart3, PieChart, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

export default function CostManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI Coding Cost Management</h1>
              <p className="text-gray-400 mt-2">Optimize spend while maximizing productivity</p>
            </div>
          </div>
        </div>

        {/* 2025 Market Landscape */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">2025 Market Landscape: The Numbers</h2>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-cyan-400 mb-2">41%</p>
                <p className="text-sm text-gray-300">of global code is AI-generated</p>
                <p className="text-xs text-gray-500 mt-1">256 billion lines/year</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-blue-400 mb-2">90%</p>
                <p className="text-sm text-gray-300">developer adoption rate</p>
                <p className="text-xs text-gray-500 mt-1">up from 76% in 2024</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-green-400 mb-2">36%</p>
                <p className="text-sm text-gray-300">spending increase</p>
                <p className="text-xs text-gray-500 mt-1">$62K → $85K monthly</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold text-purple-400 mb-2">10-15%</p>
                <p className="text-sm text-gray-300">productivity gains</p>
                <p className="text-xs text-gray-500 mt-1">2-3 hrs/week saved</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  The Trust Paradox
                </h4>
                <p className="text-sm text-gray-300 mb-2">
                  Teams spending <strong className="text-white">30% more</strong> on AI despite lower trust:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-green-900/20 rounded p-2">
                    <p className="text-green-400 font-bold">24%</p>
                    <p className="text-gray-400">High trust in AI code</p>
                  </div>
                  <div className="bg-red-900/20 rounded p-2">
                    <p className="text-red-400 font-bold">30%</p>
                    <p className="text-gray-400">Low trust but still using</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  ROI Measurement Challenge
                </h4>
                <p className="text-sm text-gray-300 mb-2">
                  Despite proven gains, <strong className="text-white">only 45%</strong> of orgs track AI ROI effectively.
                </p>
                <div className="text-xs text-gray-400">
                  <p>• Hard to attribute code quality improvements</p>
                  <p>• Mixed with other productivity tools</p>
                  <p>• Learning curve offsets initial gains</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Enterprise Reality: The $114K Question</h4>
              <p className="text-sm text-gray-300">
                A 500-developer organization spending <strong className="text-white">$228/dev/year</strong> on GitHub Copilot alone equals <strong className="text-cyan-400">$114,000 annually</strong>. Add Cursor licenses, API costs, and custom integrations: <strong className="text-green-400">$250K-500K/year</strong> total AI spend for mid-size teams.
              </p>
            </div>
          </div>
        </section>

        {/* Understanding Costs */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Understanding AI Coding Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-white font-medium mb-2">Subscription Costs</p>
              <p className="text-3xl font-bold text-green-400 mb-1">$10-100</p>
              <p className="text-xs text-gray-400">per developer/month</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-white font-medium mb-2">Token/API Costs</p>
              <p className="text-3xl font-bold text-blue-400 mb-1">$0.03</p>
              <p className="text-xs text-gray-400">per 1K tokens (Claude)</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-white font-medium mb-2">Typical Monthly</p>
              <p className="text-3xl font-bold text-purple-400 mb-1">$50-200</p>
              <p className="text-xs text-gray-400">per developer all-in</p>
            </div>
          </div>
        </div>

        {/* Detailed Pricing Breakdown */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Detailed Tool Pricing (2025)</h2>
          </div>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-400 font-semibold">Tool</th>
                    <th className="text-left p-3 text-gray-400 font-semibold">Individual</th>
                    <th className="text-left p-3 text-gray-400 font-semibold">Team</th>
                    <th className="text-left p-3 text-gray-400 font-semibold">Enterprise</th>
                    <th className="text-left p-3 text-gray-400 font-semibold">Limits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">GitHub Copilot</td>
                    <td className="p-3 text-gray-300">$10/mo</td>
                    <td className="p-3 text-gray-300">$19/user</td>
                    <td className="p-3 text-gray-300">Custom</td>
                    <td className="p-3 text-gray-400 text-xs">Unlimited suggestions</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">Cursor</td>
                    <td className="p-3 text-gray-300">$20/mo</td>
                    <td className="p-3 text-gray-300">$40/user</td>
                    <td className="p-3 text-gray-300">Custom</td>
                    <td className="p-3 text-gray-400 text-xs">500 fast, unlimited slow</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">Claude Code Pro</td>
                    <td className="p-3 text-gray-300">$20/mo</td>
                    <td className="p-3 text-gray-300">N/A</td>
                    <td className="p-3 text-gray-300">Via API</td>
                    <td className="p-3 text-gray-400 text-xs">5x free tier limit</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">ChatGPT Plus</td>
                    <td className="p-3 text-gray-300">$20/mo</td>
                    <td className="p-3 text-gray-300">$25/user</td>
                    <td className="p-3 text-gray-300">Custom</td>
                    <td className="p-3 text-gray-400 text-xs">40 msgs/3h (GPT-4)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">Windsurf</td>
                    <td className="p-3 text-gray-300">$15/mo</td>
                    <td className="p-3 text-gray-300">N/A</td>
                    <td className="p-3 text-gray-300">Contact</td>
                    <td className="p-3 text-gray-400 text-xs">Unlimited Cascade</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">Tabnine</td>
                    <td className="p-3 text-gray-300">$12/mo</td>
                    <td className="p-3 text-gray-300">$39/user</td>
                    <td className="p-3 text-gray-300">Custom</td>
                    <td className="p-3 text-gray-400 text-xs">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 text-white font-semibold">Codeium</td>
                    <td className="p-3 text-green-400">Free</td>
                    <td className="p-3 text-gray-300">$10/user</td>
                    <td className="p-3 text-gray-300">Custom</td>
                    <td className="p-3 text-gray-400 text-xs">Unlimited (free tier)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* API Pricing Deep Dive */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">API Pricing Deep Dive</h2>
          </div>

          <div className="space-y-6">
            {/* Claude API */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4">Claude 3.5 Sonnet API</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-900/50 rounded p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">Pricing:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Input:</span>
                        <span className="text-white">$3 / 1M tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Output:</span>
                        <span className="text-white">$15 / 1M tokens</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-800 pt-1 mt-2">
                        <span className="text-gray-300">Avg cost per request:</span>
                        <span className="text-green-400">$0.02 - $0.10</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-sm text-white font-semibold mb-2">Example: Refactoring Task</p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>• Input: 50K tokens (codebase context)</p>
                      <p>• Output: 5K tokens (refactored code)</p>
                      <p className="text-green-400 pt-1">Cost: $0.225 per refactor</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-sm text-white font-semibold mb-3">Monthly Cost Scenarios:</p>
                    <div className="space-y-3 text-xs">
                      <div className="bg-gray-950/50 rounded p-2">
                        <p className="text-blue-400 mb-1">Light Usage (100 requests/day)</p>
                        <p className="text-gray-400">~3K requests/month</p>
                        <p className="text-white mt-1">$60 - $300/month</p>
                      </div>
                      <div className="bg-gray-950/50 rounded p-2">
                        <p className="text-yellow-400 mb-1">Medium Usage (500 requests/day)</p>
                        <p className="text-gray-400">~15K requests/month</p>
                        <p className="text-white mt-1">$300 - $1,500/month</p>
                      </div>
                      <div className="bg-gray-950/50 rounded p-2">
                        <p className="text-red-400 mb-1">Heavy Usage (2K requests/day)</p>
                        <p className="text-gray-400">~60K requests/month</p>
                        <p className="text-white mt-1">$1,200 - $6,000/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OpenAI API */}
            <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4">OpenAI GPT-4 API</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-sm text-gray-400 mb-2">GPT-4o (Latest):</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Input:</span>
                        <span className="text-white">$2.50 / 1M tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Output:</span>
                        <span className="text-white">$10 / 1M tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-sm text-gray-400 mb-2">GPT-4 Turbo:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Input:</span>
                        <span className="text-white">$10 / 1M tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Output:</span>
                        <span className="text-white">$30 / 1M tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud Provider Cost Comparison */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Cloud Provider Cost Comparison (2025)</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <p className="text-gray-300 mb-6 text-sm">
              When self-hosting AI coding infrastructure or deploying custom AI tools, cloud provider choice significantly impacts costs. Here's the 2025 reality:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* AWS */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-orange-400">AWS</h3>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Most Expensive</span>
                </div>
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">GPU Instance (g5.xlarge):</p>
                    <p className="text-white font-bold">$1.006/hour</p>
                    <p className="text-gray-500">= $724/month (730 hrs)</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">API Gateway + Lambda:</p>
                    <p className="text-white font-bold">$3.50 per 1M requests</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">S3 Storage (models):</p>
                    <p className="text-white font-bold">$0.023/GB/month</p>
                  </div>
                  <div className="border-t border-gray-800 pt-2 mt-2">
                    <p className="text-gray-400">Typical AI API hosting:</p>
                    <p className="text-orange-400 font-bold">$850-1,200/month</p>
                  </div>
                </div>
              </div>

              {/* GCP */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-green-400">Google Cloud (GCP)</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Best Value</span>
                </div>
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">GPU Instance (g2-standard-4):</p>
                    <p className="text-white font-bold">$0.886/hour</p>
                    <p className="text-gray-500">= $647/month (730 hrs)</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">Cloud Functions + API:</p>
                    <p className="text-white font-bold">$2.80 per 1M requests</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">Cloud Storage (models):</p>
                    <p className="text-white font-bold">$0.020/GB/month</p>
                  </div>
                  <div className="border-t border-gray-800 pt-2 mt-2">
                    <p className="text-gray-400">Typical AI API hosting:</p>
                    <p className="text-green-400 font-bold">$700-950/month</p>
                  </div>
                  <div className="bg-green-900/20 rounded p-2 border border-green-500/30">
                    <p className="text-green-300 font-semibold">15-22% cheaper than AWS</p>
                  </div>
                </div>
              </div>

              {/* Azure */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-blue-400">Azure</h3>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Best for Enterprise</span>
                </div>
                <div className="space-y-3 text-xs text-gray-300">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">GPU Instance (NC6s v3):</p>
                    <p className="text-white font-bold">$0.902/hour</p>
                    <p className="text-gray-500">= $659/month (730 hrs)</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">Functions + API Management:</p>
                    <p className="text-white font-bold">$3.00 per 1M requests</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">Blob Storage (models):</p>
                    <p className="text-white font-bold">$0.018/GB/month</p>
                  </div>
                  <div className="border-t border-gray-800 pt-2 mt-2">
                    <p className="text-gray-400">Typical AI API hosting:</p>
                    <p className="text-blue-400 font-bold">$720-1,000/month</p>
                  </div>
                  <div className="bg-blue-900/20 rounded p-2 border border-blue-500/30">
                    <p className="text-blue-300 font-semibold">42% savings with 3-year reserved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Caching (Gemini Feature) */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-purple-400">New: Context Caching (Gemini 2.5)</h3>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Cost Optimizer</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-300 mb-2">
                    Gemini 2.5 Pro introduces <strong className="text-white">context caching</strong> - cache up to 2M tokens of codebase context for 1 hour, reducing repeated context costs by <strong className="text-green-400">90%</strong>.
                  </p>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-400 mb-1">Standard pricing:</p>
                    <p className="text-white">Input: $3.50/1M tokens</p>
                    <p className="text-white">Output: $10.50/1M tokens</p>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-950/50 rounded p-2 mb-2">
                    <p className="text-gray-400 mb-1">Cached input pricing:</p>
                    <p className="text-green-400 font-bold">$0.35/1M tokens (90% off!)</p>
                  </div>
                  <div className="bg-green-900/20 rounded p-2 border border-green-500/30">
                    <p className="text-white font-semibold mb-1">Example Savings:</p>
                    <p className="text-gray-300">
                      Refactoring with 100K token codebase context, 50 requests/day:
                    </p>
                    <p className="text-red-400 mt-1">Without caching: $525/month</p>
                    <p className="text-green-400">With caching: $70/month</p>
                    <p className="text-purple-400 font-bold mt-1">Saves $455/month (87%)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Optimization Matrix */}
            <div className="bg-gray-900/50 rounded p-4">
              <h4 className="font-semibold text-white mb-3 text-sm">When to Choose Each Provider:</h4>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold min-w-[60px]">GCP →</span>
                  <span>Best raw cost, excellent for Gemini-based tools, TPU access, strong Vertex AI integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold min-w-[60px]">Azure →</span>
                  <span>Microsoft ecosystem integration, GitHub Copilot backend, best reserved instance discounts (42%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold min-w-[60px]">AWS →</span>
                  <span>Largest ecosystem, best tools/services maturity, preferred for Amazon Q, highest cost</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden Costs */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Hidden Costs to Watch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="font-bold text-red-400 mb-3">API Overages</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="text-gray-400">When you exceed rate limits or quotas:</p>
                <ul className="space-y-1 ml-4 list-disc text-xs">
                  <li>Cursor: Drops to slow model (3.5 Sonnet)</li>
                  <li>Claude API: $3-15 per 1M tokens above tier</li>
                  <li>OpenAI: Automatic scaling (watch your bill!)</li>
                  <li>ChatGPT Plus: Hard cap (40 msgs/3h)</li>
                </ul>
                <div className="bg-red-900/20 rounded p-2 text-xs">
                  <p className="text-red-300"><strong>Real incident:</strong> Team hit $12K OpenAI bill in one weekend from uncapped API key.</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="font-bold text-orange-400 mb-3">Compute & Storage</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="text-gray-400">Often overlooked costs:</p>
                <ul className="space-y-1 ml-4 list-disc text-xs">
                  <li>Embeddings storage: $0.10/GB/month</li>
                  <li>Vector databases (Pinecone): $70-280/mo</li>
                  <li>Fine-tuning data storage: Variable</li>
                  <li>Logging/monitoring: $20-100/mo</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="font-bold text-yellow-400 mb-3">Training & Onboarding</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="text-gray-400">Time costs:</p>
                <ul className="space-y-1 ml-4 list-disc text-xs">
                  <li>Developer learning curve: 5-10 hours</li>
                  <li>Team prompt library setup: 20-40 hours</li>
                  <li>Workflow integration: 10-20 hours</li>
                  <li>At $75/hr: $2,625-5,250 one-time</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="font-bold text-blue-400 mb-3">Tool Sprawl</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="text-gray-400">Multiple overlapping subscriptions:</p>
                <ul className="space-y-1 ml-4 list-disc text-xs">
                  <li>Copilot + Cursor + ChatGPT = $50/dev/mo</li>
                  <li>Often 50% redundant functionality</li>
                  <li>Solution: Standardize on 1-2 core tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Optimization Strategies */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Cost Optimization Strategies</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">1. Choose the Right Tool for the Task</h3>
              <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400 space-y-2">
                <p>• **Autocomplete** (GitHub Copilot $10): Daily coding, boilerplate</p>
                <p>• **IDE Assistant** (Cursor $20): Complex refactors, multi-file edits</p>
                <p>• **Terminal Agent** (Aider free): Large codebase migrations</p>
                <p>• **Web Platform** (Bolt $20): Quick prototypes, MVPs</p>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">2. Optimize Context Window Usage</h3>
              <div className="bg-gray-900/50 rounded p-4 space-y-3">
                <p className="text-sm text-gray-400">Tokens = $$$. Reduce context to save money:</p>
                <div className="font-mono text-xs space-y-2">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-500 mb-1">✓ Be specific with file selection</p>
                    <pre className="text-gray-300">Instead of: @codebase "fix this bug"
Use: @src/components/Header.tsx "fix dropdown"</pre>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-gray-500 mb-1">✓ Use .cursorignore/.aiderignore</p>
                    <pre className="text-gray-300">node_modules/
dist/
*.log
test-data/</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">3. Hybrid Approach</h3>
              <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400">
                <p className="mb-3">Don't use expensive tools for everything:</p>
                <table className="w-full text-xs">
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-white">Simple completions</td>
                    <td className="py-2 text-gray-500">→</td>
                    <td className="py-2 text-green-400">Free: Codeium, TabNine</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-white">Quick questions</td>
                    <td className="py-2 text-gray-500">→</td>
                    <td className="py-2 text-blue-400">$0: Claude.ai (free tier)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-white">Complex refactors</td>
                    <td className="py-2 text-gray-500">→</td>
                    <td className="py-2 text-orange-400">$20: Cursor/Claude Code</td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">4. Monitor Usage</h3>
              <div className="bg-gray-900/50 rounded p-4 text-sm text-gray-400">
                <p className="mb-2">Track your AI spend:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Cursor: Settings → Usage</li>
                  <li>• Claude API: Console → Usage</li>
                  <li>• OpenAI: Dashboard → Usage</li>
                  <li>• GitHub Copilot: Included (flat rate)</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-pink-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">5. Rate Limiting & Caching</h3>
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-sm text-gray-400 mb-3">Reduce redundant API calls:</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-white mb-1">✓ Cache common completions</p>
                    <p className="text-gray-400">Save 30-50% on API costs for repetitive tasks</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-white mb-1">✓ Implement request batching</p>
                    <p className="text-gray-400">Combine multiple queries to save on per-request overhead</p>
                  </div>
                  <div className="bg-gray-950/50 rounded p-2">
                    <p className="text-white mb-1">✓ Set per-developer limits</p>
                    <p className="text-gray-400">Prevent runaway costs with usage quotas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6">
              <h3 className="text-lg font-semibold text-white mb-3">6. Use Smaller Models for Simple Tasks</h3>
              <div className="bg-gray-900/50 rounded p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 text-gray-400">Task</th>
                      <th className="text-left py-2 text-gray-400">Model</th>
                      <th className="text-left py-2 text-gray-400">Cost Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 text-white">Code completion</td>
                      <td className="py-2 text-gray-300">Claude 3.5 Haiku</td>
                      <td className="py-2 text-green-400">-80%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 text-white">Simple bug fixes</td>
                      <td className="py-2 text-gray-300">GPT-4o mini</td>
                      <td className="py-2 text-green-400">-90%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 text-white">Documentation</td>
                      <td className="py-2 text-gray-300">GPT-3.5 Turbo</td>
                      <td className="py-2 text-green-400">-95%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Analysis */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">ROI Calculator & Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-400" />
                Standard ROI
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded p-4">
                  <p className="text-sm text-gray-400 mb-3">Typical productivity gains:</p>
                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Developer hourly cost</span>
                      <span className="text-white">$75/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time saved with AI</span>
                      <span className="text-white">30%</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-2">
                      <span>Monthly savings</span>
                      <span className="text-green-400 font-bold">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI tool cost</span>
                      <span className="text-red-400">-$50</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-2">
                      <span className="font-bold">Net benefit</span>
                      <span className="text-green-400 font-bold">$4,150/mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">ROI: 8,300% per developer</p>
              </div>
            </div>

            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Real-World Case Studies</h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded p-4">
                  <p className="text-sm font-medium text-white mb-2">Startup (10 devs)</p>
                  <div className="space-y-1 text-xs text-gray-400">
                    <p>• GitHub Copilot: $100/mo</p>
                    <p>• 2 Cursor licenses: $40/mo</p>
                    <p>• Claude API: $200/mo</p>
                    <p className="text-green-400 font-bold pt-2">Total: $340/mo</p>
                    <p className="text-white pt-1">Time savings: 25% = 500 dev hours/mo</p>
                    <p className="text-green-400">Value: $37,500/mo ($450K/yr)</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded p-4">
                  <p className="text-sm font-medium text-white mb-2">Enterprise (200 devs)</p>
                  <div className="space-y-1 text-xs text-gray-400">
                    <p>• Copilot Enterprise: $3,800/mo</p>
                    <p>• 50 Cursor Pro: $1,000/mo</p>
                    <p>• API credits: $5,000/mo</p>
                    <p className="text-orange-400 font-bold pt-2">Total: $9,800/mo</p>
                    <p className="text-white pt-1">Time savings: 20% = 8,000 dev hours/mo</p>
                    <p className="text-green-400">Value: $600K/mo ($7.2M/yr)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Budget Planning */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Budget Planning by Team Size</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
              <h3 className="font-bold text-green-400 mb-3">Small Team (5 devs)</h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="text-white font-semibold mb-2">Recommended Stack:</p>
                  <p>• Base: GitHub Copilot ($50/mo)</p>
                  <p>• 2-3 power users: Cursor ($40-60/mo)</p>
                  <p>• Shared API keys: $100/mo buffer</p>
                  <p className="text-green-400 font-bold pt-2">Total: ~$200/mo</p>
                </div>
                <div className="bg-blue-900/20 rounded p-2">
                  <p className="text-blue-300">$40/dev/mo</p>
                  <p className="text-gray-400 text-xs">ROI: 20,750%</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <h3 className="font-bold text-blue-400 mb-3">Mid-size (20 devs)</h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="text-white font-semibold mb-2">Recommended Stack:</p>
                  <p>• Enterprise Copilot ($200/mo)</p>
                  <p>• 5 Cursor Pro ($100/mo)</p>
                  <p>• API credits ($300/mo)</p>
                  <p className="text-blue-400 font-bold pt-2">Total: ~$600/mo</p>
                </div>
                <div className="bg-blue-900/20 rounded p-2">
                  <p className="text-blue-300">$30/dev/mo</p>
                  <p className="text-gray-400 text-xs">ROI: 27,667%</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <h3 className="font-bold text-purple-400 mb-3">Enterprise (100+ devs)</h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="bg-gray-950/50 rounded p-3">
                  <p className="text-white font-semibold mb-2">Recommended Stack:</p>
                  <p>• Copilot Enterprise (negotiated)</p>
                  <p>• Cursor Team licenses (bulk)</p>
                  <p>• Dedicated API infrastructure</p>
                  <p>• Custom fine-tuned models</p>
                  <p className="text-purple-400 font-bold pt-2">Total: ~$2,000-5,000/mo</p>
                </div>
                <div className="bg-purple-900/20 rounded p-2">
                  <p className="text-purple-300">$20-50/dev/mo</p>
                  <p className="text-gray-400 text-xs">ROI: 16,600%+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Tracking & Monitoring */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold">Cost Tracking & Monitoring</h2>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-cyan-400 mb-3">Built-in Dashboards</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">Cursor Usage</p>
                    <p className="text-xs text-gray-400">Settings → Usage → See fast/slow request counts</p>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">OpenAI Dashboard</p>
                    <p className="text-xs text-gray-400">platform.openai.com/usage → Real-time API spend</p>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">Anthropic Console</p>
                    <p className="text-xs text-gray-400">console.anthropic.com/usage → Token consumption</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-cyan-400 mb-3">Third-Party Tools</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">PromptLayer</p>
                    <p className="text-xs text-gray-400">Track all LLM requests, costs, and performance</p>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">LangSmith</p>
                    <p className="text-xs text-gray-400">Debug and optimize LLM applications with cost tracking</p>
                  </div>
                  <div className="bg-gray-900/50 rounded p-3">
                    <p className="text-white font-semibold mb-1">Helicone</p>
                    <p className="text-xs text-gray-400">Open-source observability with cost analytics</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-900/50 rounded p-4">
              <h4 className="font-semibold text-white mb-3">Set Up Cost Alerts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-yellow-900/20 rounded p-2 border border-yellow-500/30">
                  <p className="text-yellow-400 font-semibold mb-1">Warning: 80% budget</p>
                  <p className="text-gray-400">Email team lead</p>
                </div>
                <div className="bg-orange-900/20 rounded p-2 border border-orange-500/30">
                  <p className="text-orange-400 font-semibold mb-1">Critical: 95% budget</p>
                  <p className="text-gray-400">Email + Slack</p>
                </div>
                <div className="bg-red-900/20 rounded p-2 border border-red-500/30">
                  <p className="text-red-400 font-semibold mb-1">Emergency: 100% budget</p>
                  <p className="text-gray-400">Auto-throttle</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Negotiations */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold">Enterprise Pricing Negotiations</h2>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              For teams of 50+, custom enterprise contracts can save 30-50% on list prices.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded p-4">
                <h4 className="font-semibold text-indigo-400 mb-2">What to Negotiate:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Volume discounts</p>
                      <p className="text-xs text-gray-400">50-100 seats: 15% off, 100-500: 25% off, 500+: 35%+ off</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Annual prepay discounts</p>
                      <p className="text-xs text-gray-400">Pay yearly upfront for 10-20% savings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Custom usage limits</p>
                      <p className="text-xs text-gray-400">Negotiate higher API rate limits without overage charges</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Multi-year lock-in</p>
                      <p className="text-xs text-gray-400">2-3 year contracts can save additional 15-25%</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-900/20 rounded p-3 text-xs text-indigo-200">
                <strong>Pro tip:</strong> Negotiate during end of quarter (Q4 especially) when vendors have sales quotas to hit.
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Key Takeaways</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
                <div>
                  <p className="text-white font-medium mb-2">Do:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Start with free tiers to evaluate</li>
                    <li>• Use cheaper tools for simple tasks</li>
                    <li>• Monitor usage patterns weekly</li>
                    <li>• Optimize context windows</li>
                    <li>• Calculate ROI regularly</li>
                    <li>• Set budget alerts at 80%/95%</li>
                    <li>• Negotiate enterprise discounts</li>
                    <li>• Use smaller models for simple tasks</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-2">Don't:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Buy all tools at once</li>
                    <li>• Send entire codebase unnecessarily</li>
                    <li>• Ignore usage limits</li>
                    <li>• Use expensive tools for autocomplete</li>
                    <li>• Forget to track spend</li>
                    <li>• Leave API keys uncapped</li>
                    <li>• Pay list price for 50+ seats</li>
                    <li>• Use GPT-4 for documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
