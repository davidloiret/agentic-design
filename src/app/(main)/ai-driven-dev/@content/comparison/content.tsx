"use client"

import React from 'react';
import { BarChart3, CheckCircle, XCircle } from 'lucide-react';

export default function ComparisonMatrixContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI Coding Tools Comparison</h1>
            <p className="text-gray-400 mt-2">Side-by-side comparison with real benchmarks</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Top Tools at a Glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Tool</th>
                <th className="text-left py-3 px-4 text-gray-400">Price</th>
                <th className="text-left py-3 px-4 text-gray-400">Context</th>
                <th className="text-left py-3 px-4 text-gray-400">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-white font-medium">Claude Code</td>
                <td className="py-4 px-4 text-gray-300">$20-100/mo</td>
                <td className="py-4 px-4 text-gray-300">200k tokens</td>
                <td className="py-4 px-4 text-gray-300">Large codebases</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-white font-medium">Cursor</td>
                <td className="py-4 px-4 text-gray-300">$20/mo</td>
                <td className="py-4 px-4 text-gray-300">1M tokens</td>
                <td className="py-4 px-4 text-gray-300">Power users</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-white font-medium">Windsurf</td>
                <td className="py-4 px-4 text-gray-300">$15/mo</td>
                <td className="py-4 px-4 text-gray-300">200k tokens</td>
                <td className="py-4 px-4 text-gray-300">Beginners</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4 px-4 text-white font-medium">GitHub Copilot</td>
                <td className="py-4 px-4 text-gray-300">$10/mo</td>
                <td className="py-4 px-4 text-gray-300">32k tokens</td>
                <td className="py-4 px-4 text-gray-300">Universal use</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What to Look For</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <p className="text-gray-300 text-sm">Large context window (100k+ tokens)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <p className="text-gray-300 text-sm">Multi-model support</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
              <p className="text-gray-300 text-sm">Active development and updates</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Red Flags</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 mt-1" />
              <p className="text-gray-300 text-sm">Hidden costs or unclear pricing</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 mt-1" />
              <p className="text-gray-300 text-sm">Vendor lock-in</p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-400 mt-1" />
              <p className="text-gray-300 text-sm">Poor privacy policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}