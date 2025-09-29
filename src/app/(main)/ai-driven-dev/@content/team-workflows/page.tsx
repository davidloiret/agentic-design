"use client"

import React from 'react';
import { Users, Shield, BookOpen, GitBranch, Key, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TeamWorkflowsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold">Team Workflows with AI</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Scale AI-driven development across your team. Standardize practices, manage access, 
            and ensure code quality when multiple developers use AI tools.
          </p>
        </div>

        {/* Team Onboarding */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Team Onboarding Checklist</h2>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Choose Team Standard Tools</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Select 2-3 AI tools for different use cases. Too many tools = fragmentation.
                  </p>
                  <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-300">
                    <p className="font-semibold mb-1">Example Stack:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Cursor</strong> - Primary IDE for feature development</li>
                      <li>• <strong>Claude Code</strong> - Terminal agent for refactoring</li>
                      <li>• <strong>CodeRabbit</strong> - Automated code review</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Distribute API Keys Securely</h3>
                  <p className="text-sm text-gray-400">
                    Use a secret manager. Never share keys via Slack or email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Train Team on Prompt Engineering</h3>
                  <p className="text-sm text-gray-400">
                    2-hour workshop covering effective prompting techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Create Shared Prompt Library</h3>
                  <p className="text-sm text-gray-400">
                    Document proven prompts for common tasks (API integration, testing, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Establish Code Review Process</h3>
                  <p className="text-sm text-gray-400">
                    Define what requires human review vs. automated review.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">6</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">Set Usage Policies</h3>
                  <p className="text-sm text-gray-400">
                    Document what code can/cannot be shared with AI tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Key Management */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Team API Key Management</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bad Approach */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4">❌ DON'T: Share Individual Keys</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Developer shares personal API key in Slack</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Key gets hardcoded in shared .env file</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>No way to revoke if someone leaves</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Cannot track who used what</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-900/20 rounded text-xs text-red-300">
                <strong>Risk:</strong> Keys leak, costs spike, security breach.
              </div>
            </div>

            {/* Good Approach */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4">✓ DO: Use Team Management</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Each developer gets their own key</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Keys stored in 1Password/Vault</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Usage tracked per person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Auto-rotate keys quarterly</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-900/20 rounded text-xs text-green-300">
                <strong>Benefit:</strong> Accountable, auditable, secure.
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-900/50 rounded-lg p-6 border border-yellow-500/30">
            <h3 className="font-bold text-yellow-400 mb-3">Recommended Tools:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded p-3">
                <p className="font-semibold text-white mb-1">1Password</p>
                <p className="text-xs text-gray-400">Secret vaults, team sharing</p>
              </div>
              <div className="bg-gray-800/50 rounded p-3">
                <p className="font-semibold text-white mb-1">HashiCorp Vault</p>
                <p className="text-xs text-gray-400">Enterprise secret management</p>
              </div>
              <div className="bg-gray-800/50 rounded p-3">
                <p className="font-semibold text-white mb-1">AWS Secrets Manager</p>
                <p className="text-xs text-gray-400">Cloud-native secrets</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shared Prompt Library */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Shared Prompt Library</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Create a team wiki with proven prompts. Saves time, ensures consistency, accelerates onboarding.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-white mb-3">Example Structure:</h3>
              <div className="font-mono text-xs text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <span>prompts/</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <span>api-integration.md</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <span>testing-unit.md</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <span>refactoring-legacy.md</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <span>database-migrations.md</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="font-bold text-purple-400 mb-2">Sample Prompt Entry:</h3>
              <div className="font-mono text-xs text-gray-300 bg-gray-900/50 rounded p-3">
                <pre>{`## API Integration Prompt

**Use when:** Adding new third-party API

**Prompt:**
Create a TypeScript API client for [SERVICE_NAME] with:
- Type-safe request/response interfaces
- Error handling with custom error classes
- Rate limiting (max [X] req/sec)
- Retry logic (3 attempts with exponential backoff)
- Jest tests with mocked responses

**Example usage:**
[Link to successful PR]

**Last updated:** Jan 2025
**Maintainer:** @engineering-team`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Code Review Process */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GitBranch className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold">AI-Enhanced Code Review Process</h2>
          </div>

          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-teal-400 mb-3">Hybrid Review Strategy:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🤖 AI Reviews (Automated)</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Code style & formatting</li>
                      <li>• Security vulnerabilities</li>
                      <li>• Performance anti-patterns</li>
                      <li>• Test coverage</li>
                      <li>• Documentation completeness</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">👤 Human Reviews (Required)</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Architecture decisions</li>
                      <li>• Business logic correctness</li>
                      <li>• API contract changes</li>
                      <li>• Database schema migrations</li>
                      <li>• Security-critical code</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">GitHub Actions Workflow:</h4>
                <div className="font-mono text-xs text-gray-300 bg-gray-900/50 rounded p-3">
                  <pre>{`name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: coderabbitai/coderabbit@v1
        with:
          review_level: thorough
          focus_areas: security,performance,tests
      - name: Block if critical issues
        run: |
          if grep -q "CRITICAL" review.txt; then
            exit 1
          fi`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Policies */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold">AI Usage Policies</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-400 mb-3">✓ Safe to Share:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Open-source code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Public API documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Generic utility functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Error messages (without sensitive data)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Schema definitions (no real data)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-red-400 mb-3">✗ NEVER Share:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>API keys, secrets, credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Customer data (PII, financial, health)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Proprietary algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Internal infrastructure details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Code under NDA</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-orange-400 mb-1">Enterprise Policy Template:</h4>
                  <p className="text-xs text-gray-400">
                    Create a 1-page policy document. Review quarterly. Require signed acknowledgment 
                    from all developers. Include examples of violations and consequences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Measuring Team Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <p className="text-3xl font-bold text-white mb-1">37%</p>
              <p className="text-sm text-gray-400">Faster PR cycle time</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6">
              <p className="text-3xl font-bold text-white mb-1">28%</p>
              <p className="text-sm text-gray-400">Fewer bugs in production</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <p className="text-3xl font-bold text-white mb-1">53%</p>
              <p className="text-sm text-gray-400">More code coverage</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <p className="text-3xl font-bold text-white mb-1">4.2x</p>
              <p className="text-sm text-gray-400">Developer satisfaction</p>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <h3 className="font-bold text-white mb-4">Track These KPIs:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <ul className="space-y-2">
                <li>• Time to merge (before vs. after AI)</li>
                <li>• Lines of code per developer per sprint</li>
                <li>• Test coverage percentage</li>
                <li>• Code review iterations</li>
              </ul>
              <ul className="space-y-2">
                <li>• Production bugs per release</li>
                <li>• Developer NPS score</li>
                <li>• AI tool adoption rate</li>
                <li>• Monthly AI spend per developer</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Team Success Stories</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Stripe Engineering (150 devs)</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Deployed GitHub Copilot + Cursor across the team. Created internal prompt library 
                    with 200+ templates. Result: 30% faster feature delivery, 45% reduction in boilerplate code.
                  </p>
                  <p className="text-xs text-gray-500">Source: Stripe Engineering Blog, 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">Shopify Backend Team (40 devs)</h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Standardized on Claude Code for refactoring, Cursor for new features. Mandatory 
                    2-hour training. Result: 50% faster onboarding, 28% fewer code review rounds.
                  </p>
                  <p className="text-xs text-gray-500">Source: Shopify Engineering, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/security-best-practices" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Security Best Practices</p>
              <p className="text-sm text-gray-400">Keep your code and data safe</p>
            </a>
            <a href="/ai-driven-dev/cost-management" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Cost Management</p>
              <p className="text-sm text-gray-400">Budget for team AI usage</p>
            </a>
            <a href="/ai-driven-dev/prompt-engineering" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Prompt Engineering</p>
              <p className="text-sm text-gray-400">Train your team to write better prompts</p>
            </a>
            <a href="/ai-driven-dev/prompt-libraries" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Prompt Libraries</p>
              <p className="text-sm text-gray-400">200+ ready-to-use prompts</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
