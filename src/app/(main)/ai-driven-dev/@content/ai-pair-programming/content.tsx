"use client"

import React from 'react';
import { Users, MessageSquare, Code2, CheckCircle, Zap } from 'lucide-react';

export default function AIPairProgrammingContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Users className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI Pair Programming</h1>
            <p className="text-gray-400 mt-2">Real-time collaboration between human and AI</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The Driver/Navigator Model</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">You as Driver</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Define the problem and approach</li>
              <li>• Review AI suggestions critically</li>
              <li>• Make final decisions on architecture</li>
              <li>• Write complex business logic</li>
              <li>• Ensure code quality standards</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">AI as Navigator</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Generate boilerplate and patterns</li>
              <li>• Suggest optimizations</li>
              <li>• Write tests automatically</li>
              <li>• Refactor for readability</li>
              <li>• Find bugs and edge cases</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Best Practices</h2>
        <div className="space-y-4">
          {[
            { icon: MessageSquare, title: 'Clear Communication', desc: 'Be specific in prompts, provide context' },
            { icon: Code2, title: 'Iterate Quickly', desc: 'Generate, review, refine in tight loops' },
            { icon: CheckCircle, title: 'Verify Output', desc: 'Always test AI-generated code' },
            { icon: Zap, title: 'Stay in Flow', desc: 'Let AI handle boring parts, you focus on hard problems' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <item.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">The Sweet Spot</h2>
        <p className="text-gray-300 mb-4">
          AI pair programming works best when you maintain the creative vision and architectural decisions, 
          while AI handles implementation details, testing, and refactoring.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-white font-medium mb-1">30-50%</p>
            <p className="text-xs text-gray-400">Time saved on average</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-white font-medium mb-1">2-3x</p>
            <p className="text-xs text-gray-400">Faster prototyping</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="text-white font-medium mb-1">Higher</p>
            <p className="text-xs text-gray-400">Code quality with review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
