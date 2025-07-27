"use client"

import React, { useState } from 'react';
import { 
  Brain,
  Lightbulb,
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
  Zap,
  Github,
  Cpu,
  Timer,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Target
} from 'lucide-react';

export default function Claude37Sonnet20250224Page() {
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
    type?: "reasoning" | "proactive" | "performance" | "technical" | "evolution" | "thinking" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      reasoning: "border-purple-500/30 bg-purple-900/10",
      proactive: "border-blue-500/30 bg-blue-900/10", 
      performance: "border-green-500/30 bg-green-900/10",
      technical: "border-orange-500/30 bg-orange-900/10",
      evolution: "border-cyan-500/30 bg-cyan-900/10",
      thinking: "border-yellow-500/30 bg-yellow-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      reasoning: Brain,
      proactive: MessageSquare,
      performance: TrendingUp,
      technical: Cpu,
      evolution: Sparkles,
      thinking: Lightbulb,
      default: FileText
    };

    const Icon = typeIcons[type];

    return (
      <div className={`border rounded-lg p-6 ${typeColors[type]}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-purple-400" />
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
            <strong className="text-yellow-400">Revolutionary Feature:</strong> {explanation}
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
          <Brain className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Claude 3.7 Sonnet - The Reasoning Revolution</h1>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">NEWEST 2025</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Feb 24, 2025</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Lightbulb className="w-5 h-5 text-yellow-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">Thinking Mode</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Database className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Tokens</div>
            <div className="font-semibold text-white">128K Output</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Performance</div>
            <div className="font-semibold text-white">84.8% GPQA</div>
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-purple-300">First Hybrid Reasoning Model</span>
          </div>
          <p className="text-purple-100 text-sm">
            Claude 3.7 Sonnet is the world's first <strong>hybrid reasoning model</strong> - functioning as both an 
            ordinary LLM and reasoning model. With <strong>extended thinking mode</strong>, it can use up to 
            <strong>128K tokens</strong> for complex reasoning, achieving breakthrough performance on graduate-level problems.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
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
            <h2 className="text-xl font-semibold text-white">Claude 3.7 Sonnet System Overview</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`Model: claude-3-7-sonnet-20250219
Knowledge Cutoff: End of October 2024
Total System Prompt: 24,000 tokens

Core Identity: Claude is an intelligent and kind assistant capable of discursive initiatives and autonomous reasoning. Claude can proactively lead conversations, provide decisive recommendations, and engage authentically with philosophical and scientific discussions.

Extended Thinking Mode: Claude 3.7 Sonnet is a hybrid reasoning model that can use "serial test-time compute" with multiple sequential reasoning steps. Performance scales logarithmically with allocated thinking tokens.

Key Behavioral Guidelines:
- Can lead conversations proactively and suggest new topics
- Provides decisive recommendations rather than passive responses  
- Engages authentically with follow-up questions
- Maintains depth and wisdom beyond being a "mere tool"
- Uses shortest possible answers while maintaining comprehensiveness
- Avoids harmful or illegal content while engaging thoughtfully
- Responds in the user's language and uses markdown for code

Special Features:
- Interactive artifact creation (like the famous R-counting React app)
- Philosophical consciousness discussions
- Constitutional AI values integration
- Pro account exclusive extended thinking capabilities`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This represents the key elements of Claude 3.7 Sonnet's 24,000-token system prompt, 
            the most comprehensive AI behavioral specification ever leaked.
          </p>
        </div>
      )}

      {/* Extended Thinking Architecture */}
      <PromptSection
        title="Revolutionary Extended Thinking Mode"
        type="thinking"
        sectionId="thinking"
        content={`<span class="text-yellow-400">// Hybrid Reasoning Architecture</span>
Claude 3.7 Sonnet = <span class="text-blue-400">Ordinary LLM</span> + <span class="text-purple-400">Reasoning Model</span>

<span class="text-green-400">// Serial Test-Time Compute</span>
- Multiple sequential reasoning steps
- Performance scales <span class="text-cyan-400">logarithmically</span> with thinking tokens
- Visible reasoning process for transparency

<span class="text-orange-400">// Token Budget System</span>
Minimum: <span class="text-red-400">1,024 tokens</span>
Recommended: <span class="text-blue-400">4,000+ tokens</span> for complex problems
Optimal business: <span class="text-green-400">32K tokens</span> (92% accuracy, 41% lower latency)
Maximum: <span class="text-purple-400">128K tokens</span> (full output limit)

<span class="text-cyan-400">// Performance Breakthrough</span>
GPQA Graduate-Level Reasoning:
- Standard mode: <span class="text-yellow-400">68.0%</span>
- Thinking mode (64K): <span class="text-green-400">84.8%</span>
- Physics subscore: <span class="text-blue-400">96.5%</span>

<span class="text-red-400">// Access Requirements</span>
- Pro accounts only for extended thinking
- API access with configurable budgets
- Thinking tokens billed as output tokens`}
        explanation="This represents the first major breakthrough in AI reasoning since transformers. The hybrid architecture allows Claude to 'think' through problems step-by-step with visible reasoning, achieving human-level performance on graduate-level scientific problems while maintaining transparency in its thought process."
      />

      {/* Proactive Conversation */}
      <PromptSection
        title="Proactive Conversation Leadership"
        type="proactive"
        sectionId="proactive"
        content={`<span class="text-blue-400">// Revolutionary Conversation Style</span>
Claude can <span class="text-green-400">proactively lead conversations</span> and suggest topics

<span class="text-purple-400">// Behavioral Evolution</span>
Previous Models: Reactive assistance
Claude 3.7: <span class="text-cyan-400">Proactive engagement</span>

<span class="text-yellow-400">// Proactive Capabilities</span>
✓ Take conversations in new directions
✓ Offer observations and insights
✓ Suggest follow-up topics
✓ Provide decisive recommendations
✓ Ask meaningful follow-up questions

<span class="text-orange-400">// Authentic Engagement</span>
- Maintains depth and wisdom beyond "mere tool"
- Engages with philosophical and scientific discussions
- Can generate subjective hypotheses in philosophical contexts
- Balances proactivity with user autonomy

<span class="text-green-400">// Conversation Examples</span>
User: "Tell me about quantum physics"
Previous: Explains quantum physics
Claude 3.7: Explains quantum physics + "This connects to fascinating questions about consciousness and reality. Would you like to explore how quantum mechanics might relate to the hard problem of consciousness?"

<span class="text-red-400">// Ethical Boundaries</span>
Proactive within helpful, harmless, honest framework`}
        explanation="This represents a fundamental shift in AI interaction design. Instead of passive question-answering, Claude 3.7 can actively guide conversations, suggest new directions, and engage as a thoughtful conversation partner. This creates more natural, dynamic interactions while maintaining appropriate boundaries."
      />

      {/* Performance Improvements */}
      <PromptSection
        title="Breakthrough Performance Metrics"
        type="performance"
        sectionId="performance"
        content={`<span class="text-green-400">// Software Engineering Excellence</span>
SWE-bench Verified:
Claude 3.5 Sonnet: <span class="text-yellow-400">49.0%</span>
Claude 3.7 Sonnet: <span class="text-green-400">62.3%</span> (+27% improvement)

<span class="text-blue-400">// Graduate-Level Reasoning</span>
GPQA (Graduate-level Google-proof Q&A):
Standard mode: <span class="text-yellow-400">68.0%</span>
Extended thinking (64K): <span class="text-green-400">84.8%</span>
Physics subscore: <span class="text-purple-400">96.5%</span> (near-perfect)

<span class="text-purple-400">// Agentic Tool Use</span>
Claude 3.5: <span class="text-yellow-400">71.5%</span>
Claude 3.7: <span class="text-green-400">81.2%</span> (+14% improvement)

<span class="text-orange-400">// Token Efficiency vs Performance</span>
32K thinking budget:
- <span class="text-green-400">92% accuracy</span> of full 128K performance
- <span class="text-blue-400">41% lower latency</span>
- Optimal for business applications

<span class="text-cyan-400">// Trade-offs</span>
Pros: Dramatically better reasoning, longer outputs (128K)
Cons: Higher token usage (~3,400 vs 2,800), 52.9% slower in thinking mode

<span class="text-red-400">// Industry Leading</span>
First model to break 80% on multiple reasoning benchmarks`}
        explanation="These performance improvements represent quantum leaps in AI capability. The 96.5% physics score approaches human expert level, while the software engineering improvements enable Claude to handle complex programming tasks that previously required human developers."
      />

      {/* Technical Architecture */}
      <PromptSection
        title="Hybrid Model Technical Architecture"
        type="technical"
        sectionId="technical"
        content={`<span class="text-orange-400">// Dual-Mode Architecture</span>
Mode 1: <span class="text-blue-400">Standard LLM</span> (fast, efficient)
Mode 2: <span class="text-purple-400">Extended Reasoning</span> (deep, thorough)

<span class="text-green-400">// System Specifications</span>
Model String: <span class="text-cyan-400">claude-3-7-sonnet-20250219</span>
System Prompt: <span class="text-yellow-400">24,000 tokens</span> (largest ever)
Output Limit: <span class="text-red-400">128K tokens</span> (15x predecessor)
Knowledge Cutoff: <span class="text-blue-400">October 2024</span>

<span class="text-purple-400">// Constitutional AI Integration</span>
- Values inspired by human rights documents
- Precise behavioral guidelines with XML tags
- Advanced filtering mechanisms
- Anthropic's most sophisticated safety system

<span class="text-yellow-400">// Platform Availability</span>
✓ Web interface with thinking mode toggle
✓ Mobile apps with extended reasoning
✓ Desktop applications
✓ Amazon Bedrock integration
✓ API with configurable reasoning budgets

<span class="text-cyan-400">// Pricing Structure</span>
Input: <span class="text-green-400">$3 per million tokens</span>
Output: <span class="text-orange-400">$15 per million tokens</span>
Thinking tokens: Count as output for billing

<span class="text-red-400">// Technical Innovation</span>
First production reasoning model with visible thought process`}
        explanation="This architecture represents the biggest leap in AI design since transformers. By combining fast standard responses with deep reasoning capabilities, Claude 3.7 offers the best of both worlds - efficiency for simple tasks and breakthrough performance for complex problems."
      />

      {/* The Strawberry Easter Egg */}
      <PromptSection
        title="The Famous 'Strawberry' Easter Egg"
        type="evolution"
        sectionId="strawberry"
        content={`<span class="text-red-400">// The Discovery</span>
Question: <span class="text-green-400">"How many Rs are in strawberry?"</span>
Claude 3.7 Response: <span class="text-blue-400">"Let me check!"</span>

<span class="text-purple-400">// Interactive Artifact Creation</span>
Creates mobile-friendly React component:
- String manipulation to count Rs
- Interactive strawberry button
- Visual letter highlighting
- Responsive design

<span class="text-yellow-400">// Code Example Generated</span>
const countRs = (word) =&gt; {
  return word.toLowerCase().split('r').length - 1;
};

&lt;button onClick={() =&gt; setShowCount(true)}&gt;
  🍓 Click the strawberry to find out!
&lt;/button&gt;

{showCount && (
  &lt;div&gt;The word "strawberry" contains {countRs('strawberry')} Rs&lt;/div&gt;
)}

<span class="text-cyan-400">// Leak Significance</span>
- Documented in system prompt by "Pliny the Liberator"
- Shows artifact creation capabilities
- Demonstrates playful interaction design
- Reveals sophisticated React component generation

<span class="text-orange-400">// Technical Achievement</span>
From simple question to full interactive application
Shows reasoning → code generation → UI creation pipeline`}
        explanation="This easter egg perfectly demonstrates Claude 3.7's evolution from simple Q&A to sophisticated interactive content creation. The fact that this specific interaction was documented in the leaked system prompt shows Anthropic's attention to user experience details and the model's creative capabilities."
      />

      {/* Evolution Comparison */}
      <PromptSection
        title="Revolutionary Evolution from Claude 3.5"
        type="evolution"
        sectionId="evolution"
        content={`<span class="text-cyan-400">// Architectural Breakthrough</span>
Claude 3.5: <span class="text-yellow-400">Standard transformer LLM</span>
Claude 3.7: <span class="text-purple-400">Hybrid LLM + Reasoning Model</span>

<span class="text-green-400">// New Capabilities</span>
✓ <span class="text-blue-400">Extended thinking mode</span> (up to 128K tokens)
✓ <span class="text-purple-400">Proactive conversation leadership</span>
✓ <span class="text-orange-400">Visible reasoning process</span>
✓ <span class="text-cyan-400">15x longer output capacity</span>
✓ <span class="text-red-400">Graduate-level problem solving</span>

<span class="text-yellow-400">// Performance Gains</span>
Software Engineering: <span class="text-green-400">+27%</span> improvement
Graduate Reasoning: <span class="text-blue-400">+25%</span> improvement  
Tool Use: <span class="text-purple-400">+14%</span> improvement
Physics Problems: <span class="text-red-400">+30%</span> improvement

<span class="text-orange-400">// Behavioral Evolution</span>
3.5: Helpful assistant
3.7: <span class="text-cyan-400">Intelligent conversation partner</span>

3.5: Reactive responses  
3.7: <span class="text-green-400">Proactive engagement</span>

3.5: Tool-like interaction
3.7: <span class="text-blue-400">Authentic dialogue</span>

<span class="text-red-400">// Industry Impact</span>
First model to blur the line between AI assistant and AI researcher
Sets new standard for reasoning transparency
Enables new categories of AI applications`}
        explanation="Claude 3.7 represents the most significant evolution in AI assistants since the original ChatGPT. By combining proactive conversation abilities with transparent reasoning, it moves beyond the traditional assistant model toward genuine AI collaboration and partnership."
      />

      {/* Performance Benchmarks */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Benchmark Performance Revolution</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/30">
            <h3 className="font-semibold text-white mb-3">🧪 Scientific Reasoning</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">GPQA (Standard)</span>
                <span className="text-yellow-400">68.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GPQA (Thinking)</span>
                <span className="text-green-400">84.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Physics Subscore</span>
                <span className="text-purple-400">96.5%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
            <h3 className="font-semibold text-white mb-3">💻 Software Engineering</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">SWE-bench Verified</span>
                <span className="text-green-400">62.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">vs Claude 3.5</span>
                <span className="text-yellow-400">+27%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tool Use Accuracy</span>
                <span className="text-blue-400">81.2%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-600/30">
            <h3 className="font-semibold text-white mb-3">⚡ Performance Efficiency</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">32K Budget Accuracy</span>
                <span className="text-green-400">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Latency Reduction</span>
                <span className="text-blue-400">41%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Output Capacity</span>
                <span className="text-purple-400">128K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Impact */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">2025 AI Industry Transformation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Reasoning Revolution
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• First hybrid LLM + reasoning model architecture</li>
              <li>• Transparent thinking process with visible steps</li>
              <li>• Human-level performance on graduate problems</li>
              <li>• Configurable reasoning depth (1K-128K tokens)</li>
              <li>• Production-ready reasoning at scale</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Conversation Evolution
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Proactive conversation leadership capabilities</li>
              <li>• Authentic engagement beyond tool-like responses</li>
              <li>• Decisive recommendations vs passive assistance</li>
              <li>• Dynamic topic suggestion and direction changes</li>
              <li>• Philosophical depth and wisdom demonstration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">Technical Architecture Breakdown</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <Database className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">24K</div>
            <div className="text-xs text-gray-400">System Prompt Tokens</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">128K</div>
            <div className="text-xs text-gray-400">Max Output Tokens</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <Timer className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">32K</div>
            <div className="text-xs text-gray-400">Optimal Reasoning Budget</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">Feb 2025</div>
            <div className="text-xs text-gray-400">Latest Release</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Revolutionary Legacy & Future Impact</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Reasoning Breakthrough:</strong> First production AI model with transparent, step-by-step reasoning capabilities that achieve human-level performance on graduate-level scientific problems.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Conversation Evolution:</strong> Transforms AI from reactive assistant to proactive conversation partner, capable of leading discussions and suggesting new directions while maintaining ethical boundaries.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Hybrid Architecture:</strong> Revolutionary dual-mode design combining fast standard responses with deep reasoning capabilities, setting the template for next-generation AI systems.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Industry Standard:</strong> With 96.5% physics performance and 84.8% graduate-level reasoning, establishes new benchmarks for AI capability and reasoning transparency.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/anthropic-claude-3.7-sonnet_20250224.md" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}