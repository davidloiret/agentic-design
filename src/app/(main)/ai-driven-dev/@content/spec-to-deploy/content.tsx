"use client"

import React from 'react';
import { Rocket, GitBranch, CheckCircle, Zap } from 'lucide-react';

export default function SpecToDeployContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <Rocket className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Spec → Deploy Pipeline</h1>
            <p className="text-gray-400 mt-2">Complete CI/CD with AI from specification to production</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">The Complete Pipeline</h2>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Write spec.md', desc: 'Define all requirements, tech stack, success criteria' },
            { step: 2, title: 'AI generates code', desc: 'Claude Code/Cursor implements from spec' },
            { step: 3, title: 'Automated testing', desc: 'Run test suite, linting, type checking' },
            { step: 4, title: 'Git commit', desc: 'Commit with descriptive message referencing spec' },
            { step: 5, title: 'CI/CD pipeline', desc: 'GitHub Actions runs tests, builds, deploys' },
            { step: 6, title: 'Deploy to prod', desc: 'Vercel/AWS/Railway auto-deploy on merge' },
            { step: 7, title: 'Monitor', desc: 'Sentry, LogRocket track errors and performance' }
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">{item.step}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Zap className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Speed</p>
            <p className="text-sm text-gray-400">Spec to production in hours, not days</p>
          </div>
          <div>
            <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Quality</p>
            <p className="text-sm text-gray-400">Automated testing catches issues early</p>
          </div>
          <div>
            <GitBranch className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">Reproducible</p>
            <p className="text-sm text-gray-400">Same spec = same result every time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
