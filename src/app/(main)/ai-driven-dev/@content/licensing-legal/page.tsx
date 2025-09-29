"use client"

import React from 'react';
import { Scale, AlertTriangle, Shield, FileText, CheckCircle, XCircle, Book, Gavel } from 'lucide-react';

export default function LicensingLegalContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold">Licensing & Legal Issues</h1>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Navigate the legal landscape of AI-generated code. Understand ownership, licensing, 
            copyright concerns, and protect your company from liability.
          </p>
        </div>

        {/* Critical Warning */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-3">Legal Disclaimer</h3>
                <p className="text-gray-300 text-sm mb-3">
                  This is NOT legal advice. Consult with a qualified IP attorney for your specific situation. 
                  Laws vary by jurisdiction and are rapidly evolving.
                </p>
                <p className="text-gray-400 text-xs">
                  Last updated: January 2025. The legal landscape around AI is changing rapidly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Ownership */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Gavel className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Who Owns AI-Generated Code?</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-white mb-4">The Short Answer: It's Complicated</h3>
            <p className="text-gray-300 mb-4">
              Copyright law requires human authorship. AI-generated code with no human modification 
              may not be copyrightable in many jurisdictions (US, EU).
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">✓ You Likely Own It If:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• You substantially modified the AI output (selection, arrangement, edits)</li>
                  <li>• You wrote the prompts and made creative decisions</li>
                  <li>• AI was a "tool" you controlled, like a spell-checker</li>
                  <li>• Your contract with the AI provider grants you ownership</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">✗ Ownership is Unclear If:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• AI generated 100% of the code with minimal human input</li>
                  <li>• You didn't review or modify the output</li>
                  <li>• The code is purely functional with no creative elements</li>
                  <li>• Multiple people/teams contributed via AI</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-500/30">
            <h3 className="font-bold text-purple-400 mb-3">Tool Ownership Policies:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-400">Tool</th>
                    <th className="text-left p-3 text-gray-400">Your Output</th>
                    <th className="text-left p-3 text-gray-400">Restrictions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 font-semibold text-white">GitHub Copilot</td>
                    <td className="p-3 text-green-400">You own it</td>
                    <td className="p-3 text-gray-400">None stated</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 font-semibold text-white">Claude (API)</td>
                    <td className="p-3 text-green-400">You own it</td>
                    <td className="p-3 text-gray-400">None stated</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 font-semibold text-white">OpenAI (API)</td>
                    <td className="p-3 text-green-400">You own it</td>
                    <td className="p-3 text-gray-400">Can't reverse engineer</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 font-semibold text-white">Cursor</td>
                    <td className="p-3 text-green-400">You own it</td>
                    <td className="p-3 text-gray-400">None stated</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3 font-semibold text-white">Bolt.new</td>
                    <td className="p-3 text-yellow-400">Check ToS</td>
                    <td className="p-3 text-gray-400">May retain rights</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Always read the Terms of Service. These can change.
            </p>
          </div>
        </section>

        {/* Copyright Infringement Risk */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold">Copyright Infringement Risk</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-white mb-4">The Problem: AI Training Data</h3>
            <p className="text-gray-300 mb-4">
              AI models are trained on massive amounts of code, including copyrighted repositories. 
              Sometimes they reproduce that code verbatim or nearly verbatim.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-400 mb-3">Real Example: GitHub Copilot Lawsuit</h4>
              <p className="text-sm text-gray-400 mb-2">
                In 2022, developers sued GitHub, Microsoft, and OpenAI alleging Copilot reproduced 
                GPL-licensed code without attribution, violating open-source licenses.
              </p>
              <p className="text-xs text-gray-500">
                Status: Ongoing litigation (as of Jan 2025). Could set precedent.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2">Risk Scenarios:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• AI reproduces GPL code → You ship it → GPL violation</li>
                  <li>• AI reproduces proprietary code → You ship it → Copyright infringement</li>
                  <li>• Original author finds their code in your product → Lawsuit</li>
                  <li>• Your company lacks proper indemnification → You pay damages</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-red-500/30">
            <h3 className="font-bold text-red-400 mb-4">How to Protect Yourself:</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">1. Review All AI-Generated Code</p>
                  <p className="text-gray-400">Don't blindly accept AI suggestions. Read and understand.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">2. Use Tools with Filtering</p>
                  <p className="text-gray-400">GitHub Copilot has "block suggestions matching public code" setting.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">3. Run License Scanners</p>
                  <p className="text-gray-400">Tools like FOSSA, Black Duck, Snyk can detect copied code.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">4. Get Indemnification</p>
                  <p className="text-gray-400">Enterprise contracts should include IP indemnification clauses.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">5. Document Human Contribution</p>
                  <p className="text-gray-400">Keep records of your modifications to prove authorship.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Licenses */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Book className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Open Source License Conflicts</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              If AI generates code similar to GPL/AGPL licensed projects, you may be required to 
              open-source your entire codebase.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Viral Licenses (Risky):</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• GPL v2/v3 - Forces your code open</li>
                  <li>• AGPL - Even SaaS must open-source</li>
                  <li>• SSPL - Commercial restrictions</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">✓ Permissive Licenses (Safe):</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• MIT - Very permissive</li>
                  <li>• Apache 2.0 - Patent protection</li>
                  <li>• BSD - Simple, permissive</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-900/20 rounded p-3 text-xs text-orange-300">
              <strong>Action:</strong> Use license scanning tools in CI/CD to catch GPL violations early.
            </div>
          </div>
        </section>

        {/* Enterprise Contracts */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Enterprise Contract Terms</h2>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 border border-green-500/30">
            <h3 className="font-bold text-green-400 mb-4">What to Negotiate:</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="font-semibold text-white mb-2">1. IP Indemnification</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Vendor agrees to defend and cover costs if AI output infringes third-party IP.
                </p>
                <p className="text-xs text-gray-500">
                  Example: "Vendor will indemnify Customer against claims that AI-generated code infringes copyright."
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="font-semibold text-white mb-2">2. Data Retention</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Clarify if your code/prompts are stored, used for training, or shared.
                </p>
                <p className="text-xs text-gray-500">
                  Example: "Customer input will not be used to train models or shared with other customers."
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="font-semibold text-white mb-2">3. Output Ownership</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Explicitly state you own all AI-generated output.
                </p>
                <p className="text-xs text-gray-500">
                  Example: "All output from the Service is Customer's sole property."
                </p>
              </div>

              <div className="bg-gray-800/50 rounded p-4">
                <h4 className="font-semibold text-white mb-2">4. Compliance Guarantees</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Vendor certifies they comply with GDPR, CCPA, etc.
                </p>
                <p className="text-xs text-gray-500">
                  Example: "Service is GDPR-compliant and SOC 2 Type II certified."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Liability Scenarios */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Liability Scenarios</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2">Scenario 1: AI Generates Vulnerable Code</h4>
              <p className="text-sm text-gray-400 mb-2">
                AI writes SQL query with injection vulnerability. You ship it. Customer data breached.
              </p>
              <p className="text-xs text-gray-500">
                <strong>Liability:</strong> You're responsible. "AI did it" is not a legal defense.
              </p>
            </div>

            <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-400 mb-2">Scenario 2: AI Reproduces GPL Code</h4>
              <p className="text-sm text-gray-400 mb-2">
                AI copies GPL-licensed function. Original author demands compliance or payment.
              </p>
              <p className="text-xs text-gray-500">
                <strong>Liability:</strong> You may need to open-source your entire codebase or settle.
              </p>
            </div>

            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
              <h4 className="font-semibold text-yellow-400 mb-2">Scenario 3: AI Violates Patent</h4>
              <p className="text-sm text-gray-400 mb-2">
                AI generates algorithm that infringes active patent. Patent holder sues.
              </p>
              <p className="text-xs text-gray-500">
                <strong>Liability:</strong> Depends on indemnification. Could be expensive.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Legal Risk Mitigation Checklist</h2>
          
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-400 mb-3">✓ DO</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Review all AI-generated code</li>
                  <li>• Enable "block public code" filters</li>
                  <li>• Run license scanners in CI/CD</li>
                  <li>• Get enterprise contracts with indemnification</li>
                  <li>• Document human modifications</li>
                  <li>• Train developers on legal risks</li>
                  <li>• Consult IP attorney for high-risk projects</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-400 mb-3">✗ DON'T</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Blindly accept AI suggestions</li>
                  <li>• Ignore license warnings</li>
                  <li>• Use AI for safety-critical code without review</li>
                  <li>• Assume "AI did it" protects you legally</li>
                  <li>• Skip reading ToS of AI tools</li>
                  <li>• Generate code for regulated industries without legal review</li>
                  <li>• Share proprietary code with AI without permission</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Future Outlook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Future Legal Developments</h2>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              The legal landscape is evolving rapidly. Watch for:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong className="text-white">GitHub Copilot lawsuit outcome</strong> - Will set precedent for AI training on public code</li>
              <li>• <strong className="text-white">EU AI Act implementation</strong> - New regulations for high-risk AI systems</li>
              <li>• <strong className="text-white">US Copyright Office guidance</strong> - Clearer rules on AI-generated work</li>
              <li>• <strong className="text-white">New licensing models</strong> - Open source licenses adapted for AI era</li>
              <li>• <strong className="text-white">Vendor indemnification standards</strong> - Industry norms emerging</li>
            </ul>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/ai-driven-dev/security-best-practices" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Security Best Practices</p>
              <p className="text-sm text-gray-400">Protect your code and data</p>
            </a>
            <a href="/ai-driven-dev/team-workflows" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Team Workflows</p>
              <p className="text-sm text-gray-400">Create usage policies</p>
            </a>
            <a href="/ai-driven-dev/code-review" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">Code Review</p>
              <p className="text-sm text-gray-400">Review AI-generated code</p>
            </a>
            <a href="/ai-driven-dev/cicd-integration" className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors">
              <p className="font-semibold text-white mb-1">CI/CD Integration</p>
              <p className="text-sm text-gray-400">Automate license scanning</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
