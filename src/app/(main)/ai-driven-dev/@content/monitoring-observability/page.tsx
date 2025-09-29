"use client"

import React from 'react';
import { Activity, AlertTriangle, BarChart3, Eye, TrendingUp, Bell, Shield, Zap } from 'lucide-react';

export default function MonitoringObservabilityContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold">Monitoring & Observability for AI Code</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Track AI-generated code in production. Identify patterns, catch issues early, 
            and build confidence in AI-assisted development.
          </p>
        </div>

        {/* Why Monitor AI Code */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Monitor AI-Generated Code?</h2>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">The Reality:</h3>
                <p className="text-gray-300 text-sm mb-3">
                  AI makes mistakes. Even Claude 3.5 Sonnet and GPT-4 produce code with bugs, 
                  performance issues, or security vulnerabilities.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-900/50 rounded p-2">
                    <p className="text-orange-400 font-bold">18%</p>
                    <p className="text-gray-400">of AI code has bugs</p>
                  </div>
                  <div className="bg-gray-900/50 rounded p-2">
                    <p className="text-orange-400 font-bold">12%</p>
                    <p className="text-gray-400">has security issues</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Source: GitHub Copilot Impact Study, 2024</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <Eye className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Visibility</h3>
              <p className="text-sm text-gray-400">
                Know which code was AI-generated vs. human-written. Track patterns.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Quality Metrics</h3>
              <p className="text-sm text-gray-400">
                Compare error rates, performance, and quality of AI vs. human code.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <Bell className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Early Alerts</h3>
              <p className="text-sm text-gray-400">
                Get notified when AI-generated code causes production issues.
              </p>
            </div>
          </div>
        </section>

        {/* Tagging Strategy */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold">Tag AI-Generated Code</h2>
          </div>

          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Add metadata to commits, PRs, and deploys to track AI involvement.
            </p>

            <h3 className="font-bold text-teal-400 mb-3">Git Commit Convention:</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
              <div className="font-mono text-xs text-gray-300 space-y-2">
                <pre className="text-green-400"># AI-generated (100% AI)</pre>
                <pre>git commit -m "feat: add user authentication [ai-generated: cursor]"</pre>
                
                <pre className="text-yellow-400 mt-3"># AI-assisted (human edited AI output)</pre>
                <pre>git commit -m "fix: resolve memory leak [ai-assisted: claude-code]"</pre>
                
                <pre className="text-blue-400 mt-3"># Human-written</pre>
                <pre>git commit -m "refactor: simplify auth logic"</pre>
              </div>
            </div>

            <h3 className="font-bold text-teal-400 mb-3">PR Labels:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                ai-generated
              </span>
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">
                ai-assisted
              </span>
              <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs text-orange-400">
                tool:cursor
              </span>
              <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                tool:claude-code
              </span>
            </div>

            <div className="bg-gray-800/50 rounded p-3 text-xs text-gray-400">
              <strong className="text-white">Automate tagging:</strong> Use GitHub Actions to auto-label PRs based on commit messages.
            </div>
          </div>
        </section>

        {/* Error Tracking */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold">Error Tracking & Attribution</h2>
          </div>

          <div className="space-y-6">
            {/* Sentry Integration */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
              <h3 className="text-lg font-bold text-red-400 mb-4">Sentry - Tag Errors by Source</h3>
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-4 mb-4">
                <pre>{`// In your error boundary or global error handler
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend(event, hint) {
    // Tag errors from AI-generated files
    const file = event.exception?.values?.[0]?.stacktrace?.frames?.[0]?.filename;
    
    if (file && isAIGenerated(file)) {
      event.tags = {
        ...event.tags,
        ai_generated: true,
        ai_tool: getAITool(file) // 'cursor', 'claude-code', etc.
      };
    }
    
    return event;
  }
});

// Track which files are AI-generated
function isAIGenerated(filepath) {
  // Check git commit history for [ai-generated] tag
  // Or maintain a manifest file
  return checkGitHistory(filepath);
}`}</pre>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">Then query in Sentry:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Filter by <code className="bg-gray-800 px-1 rounded">ai_generated:true</code></li>
                  <li>• Compare error rates AI vs. human code</li>
                  <li>• Track which AI tool produces fewer errors</li>
                </ul>
              </div>
            </div>

            {/* Datadog Integration */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-400 mb-4">Datadog - Custom Metrics</h3>
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-4 mb-4">
                <pre>{`// Track AI code execution metrics
import { datadogRum } from '@datadog/browser-rum';

function trackFunctionCall(funcName, isAIGenerated, aiTool) {
  datadogRum.addAction('function_execution', {
    function_name: funcName,
    ai_generated: isAIGenerated,
    ai_tool: aiTool || 'none'
  });
}

// Use in your code
export function processPayment(amount) {  // AI-generated by Cursor
  trackFunctionCall('processPayment', true, 'cursor');
  
  const startTime = Date.now();
  try {
    // Payment logic...
  } catch (error) {
    datadogRum.addError(error, {
      ai_generated: true,
      ai_tool: 'cursor'
    });
  } finally {
    const duration = Date.now() - startTime;
    datadogRum.addAction('function_completed', {
      function_name: 'processPayment',
      duration_ms: duration,
      ai_generated: true
    });
  }
}`}</pre>
              </div>
              <div className="text-sm text-gray-400">
                <p><strong className="text-white">Dashboard queries:</strong></p>
                <ul className="space-y-1 ml-4 mt-2">
                  <li>• <code className="bg-gray-800 px-1 rounded">{'avg:function.duration{ai_generated:true}'}</code></li>
                  <li>• <code className="bg-gray-800 px-1 rounded">{'count:errors{ai_tool:cursor}'}</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Monitoring */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Performance Monitoring</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              AI sometimes writes inefficient code (nested loops, excessive API calls, memory leaks).
            </p>

            <h3 className="font-bold text-yellow-400 mb-3">Lighthouse CI for AI-Generated Frontend:</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-3">
                <pre>{`# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/dashboard
          uploadArtifacts: true
          
      - name: Check if PR is AI-generated
        id: check_ai
        run: |
          if git log --format=%B -n 1 | grep -q '\[ai-generated\]'; then
            echo "ai_generated=true" >> $GITHUB_OUTPUT
          fi
      
      - name: Comment performance on PR
        uses: actions/github-script@v6
        with:
          script: |
            const isAI = '\${{ steps.check_ai.outputs.ai_generated }}';
            const label = isAI ? '⚠️ AI-GENERATED CODE' : 'Human-written';
            // Post Lighthouse results with AI label`}</pre>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-xs text-gray-400 mb-2">Avg Performance Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-green-400">94</p>
                  <p className="text-xs text-gray-500">Human code</p>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-xs text-gray-400 mb-2">Avg Performance Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-yellow-400">87</p>
                  <p className="text-xs text-gray-500">AI-generated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboards */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Observability Dashboards</h2>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
            <h3 className="font-bold text-blue-400 mb-4">Example Grafana Dashboard:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Error Rate by Source</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI-generated (Cursor)</span>
                    <span className="text-orange-400">2.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI-assisted (Claude)</span>
                    <span className="text-yellow-400">1.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Human-written</span>
                    <span className="text-green-400">0.8%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Code Contribution %</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI-generated</span>
                    <span className="text-blue-400">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI-assisted</span>
                    <span className="text-purple-400">31%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Human-written</span>
                    <span className="text-green-400">27%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Avg Response Time (ms)</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI endpoints</span>
                    <span className="text-orange-400">342ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Human endpoints</span>
                    <span className="text-green-400">287ms</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Security Incidents</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI code</span>
                    <span className="text-red-400">3 this month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Human code</span>
                    <span className="text-green-400">1 this month</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded p-3 text-xs text-blue-300">
              <strong>Insight:</strong> AI code has 2.8x more errors but developers write 50% faster. 
              Trade-off: Speed vs. initial quality (fixable with good testing).
            </div>
          </div>
        </section>

        {/* Alert Rules */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Alert Rules for AI Code</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-orange-400">High Error Rate Alert</h3>
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">Critical</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                If error rate from AI-generated code exceeds 5% in 15 minutes → Alert #engineering
              </p>
              <div className="font-mono text-xs text-gray-500">
                <code>avg(errors{'{'}ai_generated:true{'}'}) by (ai_tool) &gt; 5%</code>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-yellow-400">Performance Degradation</h3>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">Warning</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                If AI-generated endpoint latency exceeds human-written by 2x → Alert
              </p>
              <div className="font-mono text-xs text-gray-500">
                <code>p95(latency{'{'}ai_generated:true{'}'}) / p95(latency{'{'}ai_generated:false{'}'}) &gt; 2</code>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-blue-400">New AI Tool Adoption</h3>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">Info</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                When a new AI tool is used for first time → Notify team lead
              </p>
              <div className="font-mono text-xs text-gray-500">
                <code>count(commits{'{'}ai_tool:new{'}'}) &gt; 0</code>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Monitoring Best Practices</h2>
          
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-400 mb-3">✓ DO</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Tag all AI-generated commits consistently</li>
                  <li>• Track which tool generated each piece of code</li>
                  <li>• Set up separate alerts for AI code</li>
                  <li>• Compare AI vs. human metrics monthly</li>
                  <li>• Share findings with team</li>
                  <li>• Adjust AI usage based on data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-3">✗ DON'T</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Assume all AI code is bad</li>
                  <li>• Ignore patterns in AI errors</li>
                  <li>• Over-alert on minor issues</li>
                  <li>• Skip monitoring during POC phase</li>
                  <li>• Forget to review dashboards regularly</li>
                  <li>• Blame AI for human errors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recommended Monitoring Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Sentry</h3>
              <p className="text-xs text-gray-400 mb-2">Error tracking & performance</p>
              <p className="text-xs text-gray-500">Free - $26/mo</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Datadog</h3>
              <p className="text-xs text-gray-400 mb-2">Full observability platform</p>
              <p className="text-xs text-gray-500">$15/host/mo</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Grafana + Prometheus</h3>
              <p className="text-xs text-gray-400 mb-2">Open-source metrics</p>
              <p className="text-xs text-gray-500">Free (self-hosted)</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">New Relic</h3>
              <p className="text-xs text-gray-400 mb-2">APM & infrastructure</p>
              <p className="text-xs text-gray-500">Free - $99/mo</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">Lighthouse CI</h3>
              <p className="text-xs text-gray-400 mb-2">Performance testing</p>
              <p className="text-xs text-gray-500">Free</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-white mb-2">PagerDuty</h3>
              <p className="text-xs text-gray-400 mb-2">Incident management</p>
              <p className="text-xs text-gray-500">$21/user/mo</p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/cicd-integration" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">CI/CD Integration</p>
              <p className="text-sm text-gray-400">Automate AI code quality checks</p>
            </a>
            <a href="/ai-driven-dev/security-best-practices" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Security Best Practices</p>
              <p className="text-sm text-gray-400">Secure your AI-generated code</p>
            </a>
            <a href="/ai-driven-dev/team-workflows" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Team Workflows</p>
              <p className="text-sm text-gray-400">Coordinate AI usage across teams</p>
            </a>
            <a href="/ai-driven-dev/debugging" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Debugging with AI</p>
              <p className="text-sm text-gray-400">Diagnose issues in AI code</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
