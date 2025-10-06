"use client"

import React from 'react';
import { Eye, Image, Layout, Sparkles, Code2, Smartphone, CheckCircle, Zap } from 'lucide-react';

export default function VisualDevelopmentContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Visual Development with AI</h1>
            <p className="text-gray-400 mt-2">Screenshot-to-code, UI debugging, and design-to-implementation workflows</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Interface-Driven Code Generation</h2>
              <p className="text-gray-300">
                Modern AI interprets visual artifacts—screenshots, Figma exports, wireframes—transforming them into deployable components. This bridge from design to implementation slashes iteration cycles and streamlines frontend development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot to Code */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Screenshot-to-Code Generation</h2>
        <p className="text-gray-300 mb-6">
          Modern AI tools can analyze screenshots or designs and generate accurate HTML, CSS, and component code.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <Image className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-3">How It Works</h3>
            <ol className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Upload screenshot, design file, or mockup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>AI analyzes layout, colors, typography, spacing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Generates semantic HTML + CSS/Tailwind</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>Creates React/Vue components with props</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">5.</span>
                <span>Adds responsive breakpoints automatically</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <Layout className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-3">What Gets Generated</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Clean, semantic HTML structure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Tailwind CSS or vanilla CSS styles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Component-based architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Responsive design patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                <span>Accessibility attributes (ARIA)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Screenshot-to-Code Tools</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">v0.dev by Vercel</h4>
                  <p className="text-sm text-gray-400 mt-1">Screenshot → React + Tailwind components</p>
                </div>
                <span className="text-blue-400 font-bold text-sm">Free tier</span>
              </div>
              <p className="text-xs text-gray-400">Upload designs or describe UI, get production-ready React components with shadcn/ui</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">Claude with Vision</h4>
                  <p className="text-sm text-gray-400 mt-1">Screenshot analysis + code generation</p>
                </div>
                <span className="text-purple-400 font-bold text-sm">API access</span>
              </div>
              <p className="text-xs text-gray-400">Analyzes UI screenshots and generates HTML/CSS/JS with detailed explanations</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">GPT-4 Vision</h4>
                  <p className="text-sm text-gray-400 mt-1">Multimodal image understanding</p>
                </div>
                <span className="text-green-400 font-bold text-sm">ChatGPT Plus</span>
              </div>
              <p className="text-xs text-gray-400">Upload UI mockups, get component code with styling and interactivity</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">screenshot-to-code (OSS)</h4>
                  <p className="text-sm text-gray-400 mt-1">Open-source screenshot converter</p>
                </div>
                <span className="text-orange-400 font-bold text-sm">Free</span>
              </div>
              <p className="text-xs text-gray-400">Self-hosted tool using GPT-4 Vision to convert screenshots to HTML/Tailwind</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Debugging */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Visual UI Debugging</h2>
        <p className="text-gray-300 mb-6">
          AI can inspect live UIs, identify issues, and suggest fixes based on visual analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              What AI Can Detect
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Layout misalignments and spacing issues</li>
              <li>• Color contrast problems (accessibility)</li>
              <li>• Responsive breakpoint failures</li>
              <li>• Overlapping or hidden elements</li>
              <li>• Font rendering inconsistencies</li>
              <li>• Image sizing and aspect ratio issues</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-green-400" />
              Automated Fixes
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Flexbox/Grid layout corrections</li>
              <li>• Padding/margin adjustments</li>
              <li>• Z-index conflict resolution</li>
              <li>• Media query optimizations</li>
              <li>• Color palette harmonization</li>
              <li>• Component prop refinements</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
          <h3 className="text-lg font-bold text-white mb-3">Playwright MCP for Visual Testing</h3>
          <p className="text-sm text-gray-300 mb-3">
            Model Context Protocol (MCP) integration enables AI to control browsers and perform visual testing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-white mb-2">Capabilities:</p>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Navigate pages and interact with elements</li>
                <li>• Take screenshots at various breakpoints</li>
                <li>• Capture accessibility snapshots</li>
                <li>• Monitor console errors and network</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Use Cases:</p>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Visual regression testing</li>
                <li>• Cross-browser UI validation</li>
                <li>• Automated UI bug detection</li>
                <li>• Performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design to Implementation */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Design-to-Implementation Workflow</h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Design Handoff</h3>
              <p className="text-sm text-gray-400 mb-2">Export from Figma, Sketch, or Adobe XD</p>
              <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-400">
                → AI reads design files, extracts colors, fonts, spacing tokens
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Component Generation</h3>
              <p className="text-sm text-gray-400 mb-2">AI creates reusable components</p>
              <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-400">
                → Generates Button, Card, Modal components with variants and props
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Responsive Implementation</h3>
              <p className="text-sm text-gray-400 mb-2">Auto-generate mobile/tablet/desktop views</p>
              <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-400">
                → Adds breakpoints, mobile-first CSS, touch-friendly interactions
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <span className="text-orange-400 font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Polish & Refine</h3>
              <p className="text-sm text-gray-400 mb-2">Iterate with AI on spacing, colors, animations</p>
              <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-400">
                → AI suggests improvements, adds microinteractions, optimizes performance
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Development */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Mobile UI Development</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
            <Smartphone className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-3">React Native from Screenshots</h3>
            <p className="text-sm text-gray-300 mb-3">
              AI can generate React Native components from mobile app screenshots
            </p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Native component mapping (TouchableOpacity, FlatList)</li>
              <li>• Platform-specific styling (iOS vs Android)</li>
              <li>• Navigation structure (Stack, Tab, Drawer)</li>
              <li>• Responsive dimensions (useWindowDimensions)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-3">Flutter from Designs</h3>
            <p className="text-sm text-gray-300 mb-3">
              Convert Figma designs to Flutter widgets automatically
            </p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Widget tree generation (Container, Column, Row)</li>
              <li>• Material Design compliance</li>
              <li>• Theme customization (colors, fonts)</li>
              <li>• State management setup</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Best Practices</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Do
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Provide high-quality, clear screenshots</li>
              <li>• Specify framework and styling library</li>
              <li>• Review generated code for accessibility</li>
              <li>• Test on multiple devices and browsers</li>
              <li>• Refactor component structure for reusability</li>
              <li>• Add proper TypeScript types</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Don't
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Blindly trust pixel-perfect accuracy</li>
              <li>• Skip manual testing of interactions</li>
              <li>• Ignore performance implications</li>
              <li>• Forget to optimize images and assets</li>
              <li>• Deploy without accessibility audit</li>
              <li>• Neglect responsive edge cases</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded p-4">
          <p className="text-sm text-purple-200">
            <strong>Key Insight:</strong> Visual development with AI accelerates the design-to-code process by 10x, but human oversight remains critical for accessibility, performance, and user experience refinement.
          </p>
        </div>
      </div>
    </div>
  );
}
