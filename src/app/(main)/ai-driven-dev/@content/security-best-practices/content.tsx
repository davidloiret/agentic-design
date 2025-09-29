"use client"

import React from 'react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';

export default function SecurityBestPracticesContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Security Best Practices with AI Coding</h1>
            <p className="text-gray-400 mt-2">Protecting your code, data, and API keys</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Critical Security Concerns</h2>
            <p className="text-gray-300 mb-4">
              AI coding tools introduce new security risks. Your code, API keys, and proprietary logic may be exposed to third-party services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-white font-medium mb-2">Data Privacy</p>
                <p className="text-xs text-gray-400">Is your code used for training?</p>
              </div>
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-white font-medium mb-2">API Key Exposure</p>
                <p className="text-xs text-gray-400">Keys in prompts or code context</p>
              </div>
              <div className="bg-gray-900/50 rounded p-4">
                <p className="text-white font-medium mb-2">Code Quality</p>
                <p className="text-xs text-gray-400">AI-generated vulnerabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">1. API Key Management</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Key className="w-5 h-5 text-red-400" />
              Never Commit API Keys
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-3">❌ <strong className="text-red-400">WRONG</strong>:</p>
                <div className="font-mono text-xs bg-red-500/10 rounded p-3">
                  <pre className="text-gray-300">{`// config.ts
export const OPENAI_API_KEY = "sk-proj-abc123...";
export const ANTHROPIC_API_KEY = "sk-ant-xyz789...";`}</pre>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-3">✓ <strong className="text-green-400">CORRECT</strong>:</p>
                <div className="font-mono text-xs bg-green-500/10 rounded p-3">
                  <pre className="text-gray-300">{`// .env (not committed)
OPENAI_API_KEY=sk-proj-abc123...
ANTHROPIC_API_KEY=sk-ant-xyz789...

// config.ts
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;

// .gitignore
.env
.env.local`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Use .env Files & Secret Management</h3>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-300 mb-2">Development:</p>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• Use `.env` files (add to `.gitignore`)</li>
                  <li>• Use `dotenv` or framework env support</li>
                  <li>• Never log API keys</li>
                  <li>• Rotate keys if accidentally exposed</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-300 mb-2">Production:</p>
                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                  <li>• AWS Secrets Manager / GCP Secret Manager</li>
                  <li>• HashiCorp Vault</li>
                  <li>• Vercel/Netlify Environment Variables</li>
                  <li>• GitHub Encrypted Secrets (for CI/CD)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Prevent Accidental Exposure to AI</h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3">When using AI coding tools, your entire codebase context may be sent to the AI. Protect sensitive data:</p>
              <div className="font-mono text-xs space-y-2">
                <div className="bg-gray-950/50 rounded p-3">
                  <pre className="text-gray-300">{`# .cursorignore or .aiderignore
.env
.env.*
credentials.json
secrets/
*.pem
*.key
config/production.yml`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">2. Data Privacy & Training Concerns</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              What Data Do AI Tools See?
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-gray-400">Tool</th>
                      <th className="text-left py-2 text-gray-400">Data Usage</th>
                      <th className="text-left py-2 text-gray-400">Training</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">GitHub Copilot</td>
                      <td className="py-3 text-gray-400 text-xs">Your code snippets</td>
                      <td className="py-3 text-gray-400 text-xs">Not used (enterprise plan)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">Claude Code</td>
                      <td className="py-3 text-gray-400 text-xs">Full codebase context</td>
                      <td className="py-3 text-gray-400 text-xs">Not used for training</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">Cursor</td>
                      <td className="py-3 text-gray-400 text-xs">Selected files</td>
                      <td className="py-3 text-gray-400 text-xs">Not used (privacy mode)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 text-gray-300">ChatGPT</td>
                      <td className="py-3 text-gray-400 text-xs">Conversation history</td>
                      <td className="py-3 text-gray-400 text-xs">Used unless opted out</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Enterprise & Compliance</h3>
            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-300 mb-3">For regulated industries (healthcare, finance):</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    <p>Use **Enterprise plans** with data residency guarantees</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    <p>Enable **Privacy Mode** (Cursor, Continue.dev)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    <p>Use **Self-hosted models** (LocalAI, Ollama)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    <p>Sign **Business Associate Agreements (BAA)** for HIPAA</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                    <p>Review **SOC 2, ISO 27001** certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">3. Reviewing AI-Generated Code for Security</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Common AI Security Mistakes</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-red-400 mb-2">1. SQL Injection</p>
                <div className="font-mono text-xs space-y-2">
                  <div>
                    <p className="text-gray-500 mb-1">❌ AI might generate:</p>
                    <div className="bg-red-500/10 rounded p-2">
                      <pre className="text-gray-300">{`const query = \`SELECT * FROM users WHERE id = \${userId}\`;`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">✓ Correct:</p>
                    <div className="bg-green-500/10 rounded p-2">
                      <pre className="text-gray-300">{`const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-red-400 mb-2">2. XSS Vulnerabilities</p>
                <div className="font-mono text-xs space-y-2">
                  <div>
                    <p className="text-gray-500 mb-1">❌ Dangerous:</p>
                    <div className="bg-red-500/10 rounded p-2">
                      <pre className="text-gray-300">{`<div dangerouslySetInnerHTML={{ __html: userInput }} />`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">✓ Safe:</p>
                    <div className="bg-green-500/10 rounded p-2">
                      <pre className="text-gray-300">{`import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm font-medium text-red-400 mb-2">3. Insecure Authentication</p>
                <div className="font-mono text-xs space-y-2">
                  <div>
                    <p className="text-gray-500 mb-1">❌ Weak:</p>
                    <div className="bg-red-500/10 rounded p-2">
                      <pre className="text-gray-300">{`const hash = crypto.createHash('md5').update(password).digest('hex');`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">✓ Strong:</p>
                    <div className="bg-green-500/10 rounded p-2">
                      <pre className="text-gray-300">{`import bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 12);`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-3">Automated Security Scanning</h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3">Always scan AI-generated code:</p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p><strong className="text-white">Snyk Code:</strong> Real-time vulnerability detection</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p><strong className="text-white">SonarQube:</strong> Code quality + security</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p><strong className="text-white">GitHub Advanced Security:</strong> Secret scanning, dependency review</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <p><strong className="text-white">npm audit / pip-audit:</strong> Dependency vulnerabilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Security Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Before Using AI Tools</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Read tool's privacy policy</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Enable privacy mode if available</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Add sensitive files to ignore list</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Set up environment variables</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Review team policy on AI usage</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">After AI Generates Code</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Review for hardcoded secrets</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Check for SQL injection risks</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Verify input validation</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Run security scanner (Snyk/SonarQube)</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <label>Test with malicious inputs</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
