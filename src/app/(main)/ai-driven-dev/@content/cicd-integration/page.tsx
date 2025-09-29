"use client"

import React from 'react';
import { GitBranch, CheckCircle, XCircle, Zap, Shield, FileCheck, AlertTriangle, Play } from 'lucide-react';

export default function CICDIntegrationContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold">CI/CD Integration with AI</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Automate AI code review, testing, and quality checks in your deployment pipeline. 
            Catch issues before they reach production.
          </p>
        </div>

        {/* Why Integrate AI into CI/CD */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Integrate AI into CI/CD?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/10 border border-green-500/30 rounded-lg p-6">
              <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Catch Issues Early</h3>
              <p className="text-sm text-gray-400">
                AI reviews every PR for security vulnerabilities, performance issues, and code quality problems.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <Zap className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Faster Reviews</h3>
              <p className="text-sm text-gray-400">
                Automated AI feedback in seconds vs. hours waiting for human reviewers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <Shield className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Consistent Standards</h3>
              <p className="text-sm text-gray-400">
                AI enforces code standards uniformly across all PRs and developers.
              </p>
            </div>
          </div>
        </section>

        {/* GitHub Actions Integration */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Play className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">GitHub Actions Examples</h2>
          </div>

          {/* CodeRabbit Integration */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-green-400 mb-4">CodeRabbit - Automated PR Reviews</h3>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-4 mb-4">
                <pre>{`# .github/workflows/coderabbit-review.yml
name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: CodeRabbit Review
        uses: coderabbitai/coderabbit-action@v1
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          openai_api_key: \${{ secrets.OPENAI_API_KEY }}
          review_level: thorough
          focus_areas: security,performance,maintainability
          
      - name: Block merge on critical issues
        if: steps.review.outputs.critical_issues > 0
        run: |
          echo "::error::Critical issues found. Fix before merging."
          exit 1`}</pre>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">What it does:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Runs on every PR</li>
                  <li>• Reviews for security, performance, maintainability</li>
                  <li>• Blocks merge if critical issues found</li>
                  <li>• Posts inline comments on problematic code</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SonarQube Integration */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-400 mb-4">SonarQube - Code Quality Gates</h3>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/30">
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-4 mb-4">
                <pre>{`# .github/workflows/sonar-scan.yml
name: SonarQube Scan
on: [push, pull_request]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for better analysis
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ secrets.SONAR_HOST_URL }}
      
      - name: Quality Gate Check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}`}</pre>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">Checks for:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Code smells and bugs</li>
                  <li>• Security vulnerabilities (OWASP Top 10)</li>
                  <li>• Test coverage thresholds</li>
                  <li>• Code duplication</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Snyk Security Scan */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Snyk - Security Vulnerability Scanning</h3>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-4 mb-4">
                <pre>{`# .github/workflows/snyk-security.yml
name: Snyk Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --fail-on=all
      
      - name: Upload Snyk results to GitHub Code Scanning
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: snyk.sarif`}</pre>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">Features:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Scans dependencies for vulnerabilities</li>
                  <li>• Checks for license compliance</li>
                  <li>• Suggests fix PRs automatically</li>
                  <li>• Integrates with GitHub Security tab</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-commit Hooks */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileCheck className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Pre-commit Hooks with AI</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Run AI checks locally before commits reach CI/CD. Faster feedback loop.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-yellow-400 mb-3">Setup with Husky + lint-staged:</h3>
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-3 mb-3">
                <pre>{`# package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write",
      "node scripts/ai-security-check.js"
    ]
  }
}`}</pre>
              </div>

              <h3 className="font-bold text-yellow-400 mb-3 mt-4">AI Security Check Script:</h3>
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-3">
                <pre>{`// scripts/ai-security-check.js
const Anthropic = require('@anthropic-ai/sdk');

async function checkSecurityIssues(filePath, content) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
  const prompt = \`Review this code for security issues:
  
\${content}

List any security vulnerabilities (SQL injection, XSS, hardcoded secrets, etc.)
Return ONLY "PASS" if no issues, or list issues.\`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const result = message.content[0].text;
  if (result !== 'PASS') {
    console.error(\`Security issues in \${filePath}:\\n\${result}\`);
    process.exit(1);
  }
}

// Run on staged files
const files = process.argv.slice(2);
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  checkSecurityIssues(file, content);
});`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Integration */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold">AI-Generated Test Enforcement</h2>
          </div>

          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Ensure AI-generated code has proper test coverage before merging.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="font-mono text-xs text-gray-300 bg-gray-800/50 rounded p-3">
                <pre>{`# .github/workflows/test-coverage.yml
name: Test Coverage Enforcement
on: [pull_request]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests with coverage
        run: npm run test:coverage
      
      - name: Coverage threshold check
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( \$(echo "$COVERAGE < 80" | bc -l) )); then
            echo "::error::Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi
      
      - name: Comment coverage on PR
        uses: romeovs/lcov-reporter-action@v0.3.1
        with:
          lcov-file: ./coverage/lcov.info
          github-token: \${{ secrets.GITHUB_TOKEN }}`}</pre>
              </div>
            </div>

            <div className="mt-4 p-3 bg-teal-900/20 rounded text-xs text-teal-300">
              <strong>Pro tip:</strong> Combine with TDD Guard to ensure tests are written before implementation.
            </div>
          </div>
        </section>

        {/* Deployment Gates */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold">Deployment Gates</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <h3 className="font-bold text-white mb-4">Multi-stage Quality Checks:</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Pre-commit (Local)</p>
                  <p className="text-sm text-gray-400">Lint, format, basic security checks</p>
                </div>
                <div className="text-xs text-gray-500">~5s</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-sm">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">PR Created (CI)</p>
                  <p className="text-sm text-gray-400">AI code review, tests, coverage, Snyk scan</p>
                </div>
                <div className="text-xs text-gray-500">~3min</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Merge Approved (Human)</p>
                  <p className="text-sm text-gray-400">Human reviews AI findings, approves</p>
                </div>
                <div className="text-xs text-gray-500">~1hr</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-orange-400 text-sm">4</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Pre-deploy (Staging)</p>
                  <p className="text-sm text-gray-400">Integration tests, E2E tests, performance checks</p>
                </div>
                <div className="text-xs text-gray-500">~10min</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-sm">5</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-200">Production Deploy</p>
                  <p className="text-sm text-gray-400">Canary deploy, monitoring alerts configured</p>
                </div>
                <div className="text-xs text-gray-500">~5min</div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">CI/CD Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
              <h3 className="font-bold text-green-400 mb-3">✓ DO</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Run fast checks first (linting before tests)</li>
                <li>• Cache dependencies to speed up builds</li>
                <li>• Parallelize independent checks</li>
                <li>• Provide clear error messages</li>
                <li>• Set appropriate timeout limits</li>
                <li>• Monitor CI/CD costs (API usage)</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
              <h3 className="font-bold text-red-400 mb-3">✗ DON'T</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Run expensive AI checks on every commit</li>
                <li>• Expose API keys in workflow logs</li>
                <li>• Block all PRs on minor issues</li>
                <li>• Skip checks with --no-verify flag</li>
                <li>• Ignore AI warnings without review</li>
                <li>• Use AI checks as only quality gate</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tool Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI CI/CD Tools Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-400 font-semibold">Tool</th>
                  <th className="text-left p-3 text-gray-400 font-semibold">Focus</th>
                  <th className="text-left p-3 text-gray-400 font-semibold">Pricing</th>
                  <th className="text-left p-3 text-gray-400 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold text-white">CodeRabbit</td>
                  <td className="p-3 text-gray-300">PR Reviews</td>
                  <td className="p-3 text-gray-300">$15/dev/mo</td>
                  <td className="p-3 text-gray-400">Automated code reviews</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold text-white">SonarQube</td>
                  <td className="p-3 text-gray-300">Code Quality</td>
                  <td className="p-3 text-gray-300">Free - $150/mo</td>
                  <td className="p-3 text-gray-400">Quality gates, tech debt</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold text-white">Snyk</td>
                  <td className="p-3 text-gray-300">Security</td>
                  <td className="p-3 text-gray-300">Free - $52/dev/mo</td>
                  <td className="p-3 text-gray-400">Vulnerability scanning</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold text-white">DeepCode</td>
                  <td className="p-3 text-gray-300">Bug Detection</td>
                  <td className="p-3 text-gray-300">Free - $30/dev/mo</td>
                  <td className="p-3 text-gray-400">AI-powered bug finding</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold text-white">Qodo (formerly CodiumAI)</td>
                  <td className="p-3 text-gray-300">Test Generation</td>
                  <td className="p-3 text-gray-300">$19/dev/mo</td>
                  <td className="p-3 text-gray-400">Automated test creation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/security-best-practices" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Security Best Practices</p>
              <p className="text-sm text-gray-400">Secure your AI development workflow</p>
            </a>
            <a href="/ai-driven-dev/testing-quality" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Testing & Quality</p>
              <p className="text-sm text-gray-400">AI-powered testing strategies</p>
            </a>
            <a href="/ai-driven-dev/team-workflows" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Team Workflows</p>
              <p className="text-sm text-gray-400">Coordinate AI usage across teams</p>
            </a>
            <a href="/ai-driven-dev/code-review" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Code Review Tools</p>
              <p className="text-sm text-gray-400">AI-powered code review platforms</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
