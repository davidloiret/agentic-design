"use client"

import React from 'react';
import { FileText, ArrowRight, Code2, CheckCircle, Sparkles } from 'lucide-react';

export default function SpecDrivenContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl">
            <FileText className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Spec-Driven Development</h1>
            <p className="text-gray-400 mt-2">Write specifications first, let AI implement</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The 3-Phase Workflow</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Idea Honing → spec.md</h3>
              <p className="text-sm text-gray-400">Use ChatGPT to refine your idea into a comprehensive specification</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Planning → prompt_plan.md</h3>
              <p className="text-sm text-gray-400">Use reasoning models to create implementation blueprint</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Execution → working code</h3>
              <p className="text-sm text-gray-400">Use Claude Code/Cursor to execute each prompt</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Spec-Driven Wins</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Faster Iterations</p>
              <p className="text-sm text-gray-400">Regenerate code anytime</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
            <div>
              <p className="text-white font-medium">Better Quality</p>
              <p className="text-sm text-gray-400">AI has full context</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
