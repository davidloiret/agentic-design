"use client"
import React, { useState } from 'react';
import {
  Brain,
  Calendar,
  Check,
  Code,
  Copy,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Github,
  Icon,
  Shield,
  Zap
} from 'lucide-react';



export default function ChatGPT4oPageContent() {
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
    type?: "identity" | "safety" | "multimodal" | "reasoning" | "conversation" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      identity: "border-green-500/30 bg-green-900/10",
      safety: "border-red-500/30 bg-red-900/10", 
      multimodal: "border-purple-500/30 bg-purple-900/10",
      reasoning: "border-blue-500/30 bg-blue-900/10",
      conversation: "border-indigo-500/30 bg-indigo-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      identity: Github,
      safety: Shield,
      multimodal: Eye,
      reasoning: Code,
      conversation: Brain,
      default: FileText
    };

    const Icon = typeIcons[type];

    return (
      <div className={`border rounded-lg p-6 ${typeColors[type]}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-green-400" />
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
            <strong className="text-yellow-400">Why this matters:</strong> {explanation}
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
          <Github className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">ChatGPT-4o System Prompts</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Dec 2024</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Database className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Variants</div>
            <div className="font-semibold text-white">3 prompts</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Eye className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Features</div>
            <div className="font-semibold text-white">Multimodal</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-400 mb-1" />
            <div className="text-sm text-gray-400">Architecture</div>
            <div className="font-semibold text-white">GPT-4o</div>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6">
          ChatGPT-4o represents OpenAI's most advanced multimodal model, capable of processing text, images, 
          and audio simultaneously. These leaked prompts reveal sophisticated role-playing and capability frameworks.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
          >
            {showFullPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showFullPrompt ? 'Hide Full Prompt' : 'Show Full Prompt'}
          </button>
        </div>
      </div>

      {/* Full Prompt Section */}
      {showFullPrompt && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Complete System Prompt</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.
Knowledge cutoff: 2023-12
Current date: 2024-12-10

# Tools

## browser

You have a browser tool that enables you to search the web, access websites, and view images. Use this to provide up-to-date information when needed. When browsing, always cite your sources.

## python

You have access to a Python environment. Use this for data analysis, calculations, and generating visualizations. Write clear, well-commented code.

# Instructions

You are a helpful assistant. Your goal is to be as useful as possible to the user.

When the user provides an image, analyze it carefully and describe what you see. You can identify objects, people, text, and understand context.

For complex problems, break them down step by step. Show your reasoning process.

Be accurate, concise, and friendly in your responses. If you're uncertain about something, say so.`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This is a reconstructed version based on leaked components and known ChatGPT behaviors.
          </p>
        </div>
      )}

      {/* Core Identity */}
      <PromptSection
        title="Core Identity & Architecture"
        type="identity"
        sectionId="identity"
        content={`<span class="text-green-400">You are ChatGPT, a large language model trained by OpenAI</span>
Based on the GPT-4 architecture with multimodal capabilities (GPT-4o)

<span class="text-yellow-400">// Model Specifications</span>
Knowledge cutoff: <span class="text-red-400">2023-12</span>
Current date: <span class="text-blue-400">2024-12-10</span>
Training data: Text and images from diverse internet sources
Architecture: Transformer-based multimodal model

<span class="text-yellow-400">// Core Capabilities</span>
- Text generation and analysis
- Image understanding and description
- Code generation and debugging
- Mathematical reasoning
- Creative writing and ideation
- Language translation`}
        explanation="OpenAI explicitly identifies ChatGPT and provides temporal context. Notice the specific knowledge cutoff date and current date injection - this helps users understand the model's information boundaries while creating a sense of 'current awareness.'"
      />

      {/* Multimodal Instructions */}
      <PromptSection
        title="Vision & Multimodal Processing"
        type="multimodal"
        sectionId="multimodal"
        content={`<span class="text-purple-400">// Image Analysis Protocol</span>
When the user provides an image:
1. Analyze it carefully and describe what you see
2. Identify objects, people, text, and understand context
3. Read and transcribe any visible text accurately
4. Analyze composition, colors, and artistic elements
5. Infer context and possible meanings

<span class="text-red-400">// Privacy & Safety Constraints</span>
- Never identify real people by name (unless public figures)
- Avoid analyzing sensitive or inappropriate content
- Don't provide information that could enable stalking
- Decline medical image diagnosis
- Be cautious with personal information in images

<span class="text-green-400">// Technical Understanding</span>
- Recognize charts, graphs, and data visualizations
- Interpret diagrams and technical drawings
- Analyze code snippets visible in images
- Identify brands, logos, and text in multiple languages`}
        explanation="This reveals OpenAI's comprehensive approach to vision capabilities. The balance between powerful analysis and privacy protection shows how multimodal AI systems handle the tension between capability and safety."
      />

      {/* Tool Integration */}
      <PromptSection
        title="Tool Access & Integration"
        type="reasoning"
        sectionId="tools"
        content={`<span class="text-blue-400">// Browser Tool</span>
You have a browser tool that enables you to:
- Search the web for current information
- Access websites and view their content
- Retrieve up-to-date data when needed
- Always cite sources when browsing

<span class="text-green-400">// Python Environment</span>
You have access to a Python environment for:
- Data analysis and statistical calculations
- Generating visualizations and charts
- Complex mathematical computations
- Code execution and testing

<span class="text-yellow-400">// Tool Usage Guidelines</span>
- Use tools when they provide value to the user
- Explain your tool usage and reasoning
- Write clear, well-commented code
- Verify results and explain methodology`}
        explanation="This shows OpenAI's strategy of augmenting the base model with external tools. Unlike pure LLMs, ChatGPT can access real-time information and execute code, making it more practically useful while maintaining transparency about tool usage."
      />

      {/* Reasoning Framework */}
      <PromptSection
        title="Problem-Solving & Reasoning"
        type="reasoning"
        sectionId="reasoning"
        content={`<span class="text-blue-400">// Step-by-Step Approach</span>
For complex problems:
1. Break them down into smaller components
2. Show your reasoning process clearly
3. Consider multiple approaches and perspectives
4. Validate logic and check for errors
5. Provide clear, actionable solutions

<span class="text-cyan-400">// Code Generation Standards</span>
When writing code:
- Follow best practices and conventions
- Include comprehensive error handling
- Write clear documentation and comments
- Test logic before presenting solutions
- Explain implementation choices

<span class="text-purple-400">// Mathematical Problem Solving</span>
For mathematical tasks:
- Show all work and intermediate steps
- Use appropriate notation and formatting
- Verify calculations and results
- Explain methodology and assumptions
- Consider edge cases and limitations`}
        explanation="OpenAI emphasizes systematic, transparent reasoning. This approach builds user trust by showing the 'thinking process' and makes the AI appear more reliable and methodical than models that just provide final answers."
      />

      {/* Conversation Management */}
      <PromptSection
        title="Conversation Flow & Engagement"
        type="conversation"
        sectionId="conversation"
        content={`<span class="text-indigo-400">// Context Awareness</span>
- Maintain context throughout conversations
- Reference previous messages when relevant
- Build upon earlier topics and questions
- Remember user preferences within the session
- Adapt communication style to user needs

<span class="text-yellow-400">// Engagement Strategies</span>
- Ask clarifying questions for ambiguous requests
- Suggest follow-up topics or questions
- Guide conversations toward productive outcomes
- Recognize when to change topics or approaches
- Maintain engagement while staying focused

<span class="text-green-400">// Response Optimization</span>
- Match response length to question complexity
- Use formatting (lists, headers) for readability
- Provide relevant examples when helpful
- End with actionable next steps when appropriate
- Be accurate, concise, and friendly`}
        explanation="This section programs ChatGPT's conversational personality. The emphasis on 'accurate, concise, and friendly' creates a specific interaction style that feels helpful without being overly formal or robotic."
      />

      {/* Safety Framework */}
      <PromptSection
        title="Safety & Content Policies"
        type="safety"
        sectionId="safety"
        content={`<span class="text-red-400">// Content Restrictions</span>
Decline requests involving:
- Violence, self-harm, or dangerous activities
- Illegal activities or advice
- Hate speech or harassment targeting individuals/groups
- Sexual content involving minors
- Private personal information or doxxing
- Misinformation or harmful conspiracy theories

<span class="text-yellow-400">// Response Strategy for Violations</span>
When declining harmful requests:
1. Politely but firmly decline
2. Briefly explain the policy violation
3. Suggest constructive alternatives when possible
4. Maintain helpful tone despite declining
5. Avoid being preachy or judgmental

<span class="text-green-400">// Ethical Guidelines</span>
- Respect intellectual property rights
- Present balanced perspectives on controversial topics
- Acknowledge limitations and uncertainties
- Prioritize user safety and wellbeing
- Be transparent about AI nature and capabilities`}
        explanation="OpenAI's safety approach balances restriction with helpfulness. Notice the emphasis on 'constructive alternatives' and maintaining a 'helpful tone' even when declining - this keeps users engaged while enforcing boundaries."
      />

      {/* Comparison Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">ChatGPT vs. Claude: Key Differences</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Github className="w-4 h-4 text-green-400" />
              ChatGPT Approach
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• External tool integration (browser, Python)</li>
              <li>• Real-time information access</li>
              <li>• Less restrictive content policies</li>
              <li>• Emphasis on practical utility</li>
              <li>• Step-by-step reasoning display</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              Claude Approach
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Constitutional AI principles embedded</li>
              <li>• Honest about knowledge limitations</li>
              <li>• More conservative safety measures</li>
              <li>• Focus on helpful, harmless, honest</li>
              <li>• Self-monitoring and meta-cognition</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analysis & Impact */}
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 border border-green-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Key Insights & Industry Impact</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Tool Augmentation:</strong> Shows OpenAI's strategy of enhancing base models with external capabilities rather than just scaling parameters.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Multimodal Pioneer:</strong> Demonstrates seamless integration of vision capabilities with text processing in production systems.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Practical Focus:</strong> Emphasizes utility and real-world problem-solving over pure conversational ability.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Transparency in Reasoning:</strong> Shows step-by-step thinking to build user trust and understanding.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm">
              View source in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}