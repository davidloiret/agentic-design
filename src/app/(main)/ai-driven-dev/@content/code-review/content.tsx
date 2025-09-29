"use client"

import React from 'react';
import { CheckCircle, AlertTriangle, Shield, GitPullRequest } from 'lucide-react';

export default function CodeReviewContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
            <GitPullRequest className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI Code Review</h1>
            <p className="text-gray-400 mt-2">Automated PR analysis and security scanning</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Leading Review Tools</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">CodeRabbit</h3>
                <p className="text-sm text-gray-400 mt-1">AI-powered PR reviews</p>
              </div>
              <span className="text-blue-400 font-bold">$12/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Model</p>
                <p className="text-sm text-gray-300">GPT-4 + Claude</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Integration</p>
                <p className="text-sm text-gray-300">GitHub, GitLab</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Response</p>
                <p className="text-sm text-gray-300">&lt; 2 minutes</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Line-by-line suggestions. Catches bugs, security issues, performance problems. Learns your style.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Bloop</h3>
                <p className="text-sm text-gray-400 mt-1">Semantic code search + review</p>
              </div>
              <span className="text-purple-400 font-bold">$15/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Model</p>
                <p className="text-sm text-gray-300">GPT-4</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Search</p>
                <p className="text-sm text-gray-300">Natural language</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Deployment</p>
                <p className="text-sm text-gray-300">Self-hosted</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Ask questions about PRs in plain English. "What does this change break?" Context-aware answers.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Snyk Code</h3>
                <p className="text-sm text-gray-400 mt-1">Security-focused analysis</p>
              </div>
              <span className="text-orange-400 font-bold">Free tier</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Focus</p>
                <p className="text-sm text-gray-300">Security</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Languages</p>
                <p className="text-sm text-gray-300">15+</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">DB</p>
                <p className="text-sm text-gray-300">1M+ vulns</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Real-time vulnerability scanning. Fix suggestions with code. Integrates with CI/CD.
            </p>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-white">SonarQube</h3>
                <p className="text-sm text-gray-400 mt-1">Static analysis + quality gates</p>
              </div>
              <span className="text-red-400 font-bold">$10/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Metrics</p>
                <p className="text-sm text-gray-300">30+ rules</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Coverage</p>
                <p className="text-sm text-gray-300">Test tracking</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Reports</p>
                <p className="text-sm text-gray-300">Technical debt</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Code quality metrics. Block PRs that don't meet standards. Tracks code smells over time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Quality Checks</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• Code style violations</li>
            <li>• Unused variables</li>
            <li>• Missing error handling</li>
            <li>• Performance anti-patterns</li>
            <li>• Documentation gaps</li>
          </ul>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Security Scans</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• SQL injection risks</li>
            <li>• XSS vulnerabilities</li>
            <li>• Exposed secrets</li>
            <li>• Dependency issues</li>
            <li>• Authentication flaws</li>
          </ul>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Architecture</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• Circular dependencies</li>
            <li>• God objects</li>
            <li>• Tight coupling</li>
            <li>• Complexity hotspots</li>
            <li>• Duplicate code</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">GitHub Actions Integration</h2>
        <p className="text-gray-300 mb-4">Run AI reviews automatically on every PR:</p>
        <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
          <pre className="text-gray-300">{`name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: coderabbit/action@v1
        with:
          api_key: \${{ secrets.CODERABBIT_KEY }}
          auto_review: true
          review_simple_changes: false`}</pre>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Do</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Review AI suggestions before applying</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Set up quality gates in CI/CD</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Use for learning and mentorship</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Combine multiple tools</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Don't</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Auto-merge without human review</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Ignore false positives (tune rules)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Skip security scans on "quick fixes"</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Rely solely on AI (humans still needed)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
