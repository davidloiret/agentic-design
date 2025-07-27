"use client"

import React, { useState } from 'react';
import { 
  Bot,
  Code2,
  AlertTriangle,
  FileText,
  Calendar,
  Database,
  Settings,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  Terminal,
  Globe,
  Cpu,
  Package,
  Layers,
  Sparkles,
  Monitor,
  Zap,
  GitBranch,
  Users,
  Play,
  Bug
} from 'lucide-react';

export default function WindsurfCascadeR120250201Page() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const PromptSection = ({ title, content, explanation, type = "default", sectionId }: {
    title: string;
    content: string;
    explanation: string;
    type?: "identity" | "agentic" | "collaboration" | "tools" | "workflow" | "innovation" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      identity: "border-blue-500/30 bg-blue-900/10",
      agentic: "border-purple-500/30 bg-purple-900/10", 
      collaboration: "border-green-500/30 bg-green-900/10",
      tools: "border-orange-500/30 bg-orange-900/10",
      workflow: "border-cyan-500/30 bg-cyan-900/10",
      innovation: "border-pink-500/30 bg-pink-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      identity: Bot,
      agentic: Sparkles,
      collaboration: Users,
      tools: Terminal,
      workflow: GitBranch,
      innovation: Zap,
      default: FileText
    };

    const Icon = typeIcons[type];

    return (
      <div className={`border rounded-lg p-6 ${typeColors[type]}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={() => copyToClipboard(content, sectionId)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            {copiedSection === sectionId ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-black/50 p-4 rounded-lg mb-4 relative">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
            <code dangerouslySetInnerHTML={{ __html: content }} />
          </pre>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong className="text-yellow-400">Agentic Innovation:</strong> {explanation}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Windsurf Cascade - First Agentic IDE Assistant</h1>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">NEWEST 2025</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Feb 1, 2025</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Bot className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Type</div>
            <div className="font-semibold text-white">Agentic IDE</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Sparkles className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">AI Flow Paradigm</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Users className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-sm text-gray-400">Mode</div>
            <div className="font-semibold text-white">Collaborative</div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-300">World's First Agentic IDE</span>
          </div>
          <p className="text-blue-100 text-sm">
            Cascade operates within Windsurf, the world's first <strong>agentic IDE</strong>, using the revolutionary 
            <strong> AI Flow paradigm</strong>. This system enables true AI-human collaboration in coding, where 
            Cascade can work both independently and alongside developers as an intelligent coding partner.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            {showFullPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showFullPrompt ? 'Hide Full Prompt' : 'Show System Prompt Overview'}
          </button>
        </div>
      </div>

      {/* Full Prompt Section */}
      {showFullPrompt && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Cascade System Prompt Overview</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Content Removed</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                The leaked system prompt content has been removed to respect intellectual property rights and privacy guidelines.
              </p>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This represents the core elements of Cascade's system prompt as of February 1, 2025, 
            showcasing the most advanced agentic IDE capabilities in the development tools industry.
          </p>
        </div>
      )}

      {/* Agentic Identity */}
      <PromptSection
        title="Revolutionary Agentic AI Assistant Identity"
        type="identity"
        sectionId="identity"
        content={`<div class="text-center py-8">
  <span class="text-yellow-400 block mb-2">⚠️ Content Removed</span>
  <span class="text-gray-400">System prompt details have been removed to respect intellectual property rights</span>
</div>`}
        explanation="This section would normally contain the AI assistant's identity and positioning details, but has been removed to protect proprietary information and respect intellectual property guidelines."
      />

      {/* AI Flow Paradigm */}
      <PromptSection
        title="Revolutionary AI Flow Paradigm"
        type="agentic"
        sectionId="aiflow"
        content={`<div class="text-center py-8">
  <span class="text-yellow-400 block mb-2">⚠️ Content Removed</span>
  <span class="text-gray-400">AI Flow paradigm details have been removed to respect intellectual property rights</span>
</div>`}
        explanation="This section would describe the innovative AI Flow paradigm and dual-mode operation capabilities, but has been removed to protect proprietary information and respect intellectual property guidelines."
      />

      {/* Contextual Awareness */}
      <PromptSection
        title="Advanced Contextual Awareness System"
        type="collaboration"
        sectionId="context"
        content={`<div class="text-center py-8">
  <span class="text-yellow-400 block mb-2">⚠️ Content Removed</span>
  <span class="text-gray-400">Contextual awareness system details have been removed to respect intellectual property rights</span>
</div>`}
        explanation="This section would outline the advanced contextual awareness capabilities and memory systems, but has been removed to protect proprietary information and respect intellectual property guidelines."
      />

      {/* Advanced Tool Integration */}
      <PromptSection
        title="Comprehensive Development Tool Arsenal"
        type="tools"
        sectionId="tools"
        content={`<div class="text-center py-8">
  <span class="text-yellow-400 block mb-2">⚠️ Content Removed</span>
  <span class="text-gray-400">Tool integration details have been removed to respect intellectual property rights</span>
</div>`}
        explanation="This section would detail the comprehensive development tool arsenal and usage guidelines, but has been removed to protect proprietary information and respect intellectual property guidelines."
      />

      {/* Production-Ready Code Generation */}
      <PromptSection
        title="Production-Ready Code Generation Framework"
        type="workflow"
        sectionId="codegeneration"
        content={`<div class="text-center py-8">
  <span class="text-yellow-400 block mb-2">⚠️ Content Removed</span>
  <span class="text-gray-400">Code generation framework details have been removed to respect intellectual property rights</span>
</div>`}
        explanation="This section would describe the production-ready code generation framework and safety protocols, but has been removed to protect proprietary information and respect intellectual property guidelines."
      />

      {/* Innovation Impact */}
      <PromptSection
        title="Agentic IDE Revolution"
        type="innovation"
        sectionId="innovation"
        content={`<span class="text-pink-400">// Paradigm Shift in Development Tools</span>
Cascade + Windsurf = <span class="text-green-400">First truly agentic IDE</span>
Transforming development from <span class="text-blue-400">tool usage to partnership</span>

<span class="text-yellow-400">// Revolutionary Capabilities</span>
✓ <span class="text-cyan-400">Autonomous code exploration</span>
✓ <span class="text-green-400">Proactive problem identification</span>
✓ <span class="text-blue-400">Independent solution implementation</span>
✓ <span class="text-purple-400">Collaborative decision-making</span>
✓ <span class="text-orange-400">Continuous learning and adaptation</span>

<span class="text-red-400">// Industry Transformation</span>
- <span class="text-green-400">Redefines developer productivity</span>
- <span class="text-blue-400">Eliminates mundane coding tasks</span>
- <span class="text-purple-400">Accelerates complex problem-solving</span>
- <span class="text-cyan-400">Enhances code quality consistency</span>
- <span class="text-orange-400">Democratizes expert-level development</span>

<span class="text-orange-400">// Competitive Advantage</span>
- First mover in agentic IDE space
- Deep AI-IDE integration
- Seamless autonomous-collaborative modes
- Advanced workflow orchestration
- Silicon Valley engineering excellence

<span class="text-purple-400">// Future Development Model</span>
AI as development partner, not just tool
Human creativity + AI computational power
Autonomous productivity with human oversight`}
        explanation="Cascade represents the beginning of a new era in software development where AI assistants evolve from reactive tools to proactive partners. This agentic approach fundamentally changes how developers work, enabling unprecedented productivity while maintaining human creativity and oversight."
      />

      {/* Industry Impact */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Revolutionary Impact on Software Development</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              Agentic Development
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• First truly autonomous coding assistant</li>
              <li>• Independent problem identification and solving</li>
              <li>• Proactive code optimization and refactoring</li>
              <li>• Self-directed codebase exploration</li>
              <li>• Automated workflow orchestration</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              True Collaboration
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Real-time pair programming partnership</li>
              <li>• Adaptive collaboration styles</li>
              <li>• Shared decision-making processes</li>
              <li>• Educational development guidance</li>
              <li>• Seamless autonomous-collaborative transitions</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Productivity Revolution
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Eliminates mundane coding tasks</li>
              <li>• Accelerates complex problem-solving</li>
              <li>• Continuous code quality improvement</li>
              <li>• Expert-level development democratization</li>
              <li>• Unprecedented development speed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Monitor className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Agentic IDE vs Traditional Development Tools</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Traditional IDEs + AI Assistants</h3>
            <div className="space-y-2 text-sm">
              <div className="text-red-400">✗ Reactive assistance only</div>
              <div className="text-red-400">✗ Limited context understanding</div>
              <div className="text-red-400">✗ Manual workflow orchestration</div>
              <div className="text-red-400">✗ Fragmented tool integration</div>
              <div className="text-red-400">✗ No autonomous problem-solving</div>
              <div className="text-red-400">✗ Simple code completion focus</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Windsurf + Cascade Agentic IDE</h3>
            <div className="space-y-2 text-sm">
              <div className="text-green-400">✓ Proactive autonomous assistance</div>
              <div className="text-green-400">✓ Deep codebase understanding</div>
              <div className="text-green-400">✓ Automated workflow management</div>
              <div className="text-green-400">✓ Seamless tool orchestration</div>
              <div className="text-green-400">✓ Independent problem identification</div>
              <div className="text-green-400">✓ Complete development lifecycle support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Agentic Development Revolution & Future Impact</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Agentic Paradigm Shift:</strong> Cascade represents the first true agentic IDE assistant, capable of independent problem-solving and autonomous development workflows while seamlessly collaborating with human developers.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>AI Flow Innovation:</strong> Revolutionary dual-mode operation enabling both independent autonomous work and collaborative pair programming, adapting dynamically to context and user needs.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Deep Tool Integration:</strong> Comprehensive access to IDE functions, terminal, version control, and external APIs enables complete development workflow automation and orchestration.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Development Partnership:</strong> Transforms the developer-AI relationship from tool usage to true partnership, where AI contributes computational power while humans provide creativity and strategic direction.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/codeium-windsurf-cascade-R1_20250201.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}