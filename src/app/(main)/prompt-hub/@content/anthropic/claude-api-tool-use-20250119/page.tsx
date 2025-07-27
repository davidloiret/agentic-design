"use client"

import React, { useState } from 'react';
import { 
  Code,
  Wrench,
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
  Terminal,
  Brackets,
  Cpu,
  Network,
  Sparkles
} from 'lucide-react';

export default function ClaudeAPIToolUse20250119Page() {
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
    type?: "xml" | "parameters" | "error" | "technical" | "architecture" | "modern" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      xml: "border-green-500/30 bg-green-900/10",
      parameters: "border-blue-500/30 bg-blue-900/10", 
      error: "border-red-500/30 bg-red-900/10",
      technical: "border-purple-500/30 bg-purple-900/10",
      architecture: "border-orange-500/30 bg-orange-900/10",
      modern: "border-cyan-500/30 bg-cyan-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      xml: Brackets,
      parameters: Settings,
      error: AlertTriangle,
      technical: Terminal,
      architecture: Cpu,
      modern: Sparkles,
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
            <strong className="text-yellow-400">Technical Innovation:</strong> {explanation}
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
          <Wrench className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Claude API Tool Use - Function Calling Architecture</h1>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">LATEST 2025</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Jan 19, 2025</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Wrench className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Domain</div>
            <div className="font-semibold text-white">Tool Integration</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Brackets className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Format</div>
            <div className="font-semibold text-white">XML-Based</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Sparkles className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-sm text-gray-400">Era</div>
            <div className="font-semibold text-white">Claude 4 Ready</div>
          </div>
        </div>
        
        <div className="bg-green-900/20 border border-green-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-green-300">Most Recent AI Tool Architecture</span>
          </div>
          <p className="text-green-100 text-sm">
            This January 2025 leak reveals Claude's complete <strong>function calling architecture</strong>, including 
            XML-based tool invocation, sophisticated parameter handling, and advanced error management. 
            This represents the cutting-edge of AI tool integration technology.
          </p>
        </div>

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
            <h2 className="text-xl font-semibold text-white">Claude API Tool Use Instructions</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`You are in an environment where you have access to a set of tools you can use to answer the user's question.

You can invoke functions by writing a "<function_calls>" block like the following as part of your reply to the user:

<function_calls>
<invoke name="$FUNCTION_NAME">
<parameter name="$PARAMETER_NAME">$PARAMETER_VALUE</parameter>
...
</invoke>
<invoke name="$FUNCTION_NAME2">
...
</invoke>
</function_calls>

String and scalar parameters should be specified as is, while lists and objects should use JSON format.

Answer the user's request using the relevant tool(s), if they are available. Check that all the required parameters for each tool call are provided or can reasonably be inferred from context. IF there are no relevant tools or there are missing values for required parameters, ask the user to supply these values; otherwise proceed with the tool calls. If the user provides a specific value for a parameter (for example provided in quotes), make sure to use that value EXACTLY. DO NOT make up values for or ask about optional parameters.

When making multiple tool calls, if they are independent and can be executed in parallel, you can include them in the same function_calls block.`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This represents Claude's complete tool use system prompt as of January 2025, 
            showing the XML-based architecture for function calling and parameter handling.
          </p>
        </div>
      )}

      {/* XML Architecture */}
      <PromptSection
        title="XML-Based Function Calling Architecture"
        type="xml"
        sectionId="xml"
        content={`<span class="text-green-400">// Core XML Structure</span>
&lt;function_calls&gt;
&lt;invoke name="<span class="text-blue-400">$FUNCTION_NAME</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">$PARAMETER_NAME</span>"&gt;<span class="text-cyan-400">$PARAMETER_VALUE</span>&lt;/parameter&gt;
&lt;parameter name="<span class="text-yellow-400">$PARAMETER_NAME2</span>"&gt;<span class="text-cyan-400">$PARAMETER_VALUE2</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;/function_calls&gt;

<span class="text-purple-400">// Multiple Function Calls</span>
&lt;function_calls&gt;
&lt;invoke name="<span class="text-blue-400">function_1</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">param1</span>"&gt;<span class="text-cyan-400">value1</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;invoke name="<span class="text-blue-400">function_2</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">param2</span>"&gt;<span class="text-cyan-400">value2</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;/function_calls&gt;

<span class="text-orange-400">// Technical Specifications</span>
- Parsed with regular expressions (not XML parser)
- Stop sequence: <span class="text-red-400">&lt;/function_calls&gt;</span>
- Supports parallel execution of independent calls
- Structured output for programmatic processing`}
        explanation="This XML-based architecture represents the cutting edge of AI function calling. Unlike simple JSON APIs, this structured approach allows for complex multi-function calls with clear parameter delineation, enabling sophisticated tool orchestration and parallel execution."
      />

      {/* Parameter Handling */}
      <PromptSection
        title="Advanced Parameter Handling System"
        type="parameters"
        sectionId="parameters"
        content={`<span class="text-blue-400">// Parameter Type Specifications</span>
<span class="text-green-400">String and scalar parameters</span>: specified as plain text
<span class="text-purple-400">Lists and objects</span>: must use JSON format

<span class="text-yellow-400">// Parameter Handling Rules</span>
✓ Spaces in string values are <span class="text-cyan-400">NOT stripped</span>
✓ Use exact values when provided in quotes by user
✓ Infer required parameters from context when possible
✓ Use <span class="text-red-400">&lt;UNKNOWN&gt;</span> if no reasonable guess possible

<span class="text-orange-400">// Required vs Optional Parameters</span>
<span class="text-green-400">Required Parameters:</span>
- Must be provided or reasonably inferred
- Ask user for missing values if can't infer
- Block execution if missing

<span class="text-blue-400">Optional Parameters:</span>
- <span class="text-red-400">DO NOT make up values</span>
- <span class="text-red-400">DO NOT ask about</span> unless specified
- Only include if explicitly provided

<span class="text-purple-400">// Context Inference Rules</span>
- Analyze user request for implicit parameter values
- Use conversation history for context
- Apply domain knowledge for reasonable defaults
- Preserve user-specified exact values`}
        explanation="This sophisticated parameter handling system represents a major advancement in AI tool use. By distinguishing between required and optional parameters and using context inference, Claude can make intelligent decisions about function calls while avoiding the common AI problem of hallucinating parameter values."
      />

      {/* Error Handling */}
      <PromptSection
        title="Robust Error Handling Framework"
        type="error"
        sectionId="error"
        content={`<span class="text-red-400">// Error Prevention Strategy</span>
IF there are no relevant tools:
  → Ask user to clarify requirements
  
IF missing required parameters:
  → Request specific missing values from user
  
IF optional parameters unclear:
  → Proceed without making assumptions

<span class="text-yellow-400">// Runtime Error Management</span>
- <span class="text-green-400">Robust error handling</span> in tool execution code
- <span class="text-blue-400">Informative error feedback</span> sent back to Claude
- <span class="text-purple-400">Clear error messages</span> for debugging
- <span class="text-cyan-400">Graceful handling</span> of potential errors

<span class="text-orange-400">// Error Recovery Protocols</span>
1. Detect parameter validation errors
2. Provide specific feedback to user
3. Suggest corrective actions
4. Retry with corrected parameters
5. Fallback to alternative approaches

<span class="text-purple-400">// Production-Ready Error Handling</span>
- Network timeout management
- API rate limit handling
- Invalid parameter type detection
- Resource unavailability graceful degradation`}
        explanation="This comprehensive error handling framework ensures Claude's tool use is production-ready. By implementing multiple layers of error prevention and recovery, the system can handle real-world complexities while providing clear feedback to users and developers."
      />

      {/* Technical Architecture */}
      <PromptSection
        title="Production Architecture Specifications"
        type="technical"
        sectionId="technical"
        content={`<span class="text-purple-400">// Parsing Implementation</span>
- Uses <span class="text-red-400">regular expressions</span> (not full XML parser)
- Optimized for speed and reliability
- Handles malformed XML gracefully
- Stop sequence: <span class="text-yellow-400">&lt;/function_calls&gt;</span>

<span class="text-green-400">// Parallel Execution Support</span>
When making multiple tool calls:
- If <span class="text-blue-400">independent</span> and can be executed in parallel
- Include them in the <span class="text-cyan-400">same function_calls block</span>
- System handles concurrent execution automatically

<span class="text-orange-400">// Model Compatibility</span>
- <span class="text-green-400">Claude 3.7</span>: Full compatibility
- <span class="text-blue-400">Claude 4</span>: Full compatibility (Anthropic API)
- <span class="text-yellow-400">Claude 4 AWS Bedrock</span>: Known compatibility issues
- <span class="text-purple-400">Earlier versions</span>: Legacy support

<span class="text-cyan-400">// Platform Integration</span>
- Anthropic API: Native support
- AWS Bedrock: Varies by model version
- Azure OpenAI: Adapter required
- Custom implementations: Full spec available`}
        explanation="This technical architecture represents enterprise-grade AI tool integration. The regular expression parsing approach provides reliability and speed, while parallel execution support enables sophisticated multi-tool workflows that are essential for complex AI applications."
      />

      {/* Modern Context */}
      <PromptSection
        title="2025 AI Tool Use Evolution"
        type="modern"
        sectionId="modern"
        content={`<span class="text-cyan-400">// 2025 AI Tool Landscape</span>
Claude's tool use architecture leads the industry in:
- <span class="text-green-400">Sophisticated parameter inference</span>
- <span class="text-blue-400">Parallel function execution</span>
- <span class="text-purple-400">Production-ready error handling</span>
- <span class="text-yellow-400">Enterprise-grade reliability</span>

<span class="text-orange-400">// Competitive Advantages</span>
vs OpenAI Function Calling:
✓ More flexible parameter handling
✓ Better context inference
✓ XML structure easier to parse
✓ Built-in parallel execution

vs Google Gemini Tools:
✓ More robust error handling
✓ Clearer parameter specifications
✓ Better production reliability
✓ Advanced context understanding

<span class="text-red-400">// Current Platform Issues (2025)</span>
- Claude 4 on AWS Bedrock: XML format incompatibility
- Some enterprise environments: Integration challenges
- Legacy systems: Requires adapter implementation

<span class="text-green-400">// Future-Ready Architecture</span>
- Designed for multi-modal tool use
- Scalable to complex agent workflows
- Foundation for autonomous task execution`}
        explanation="This 2025 architecture positions Claude at the forefront of AI tool integration. The sophisticated design enables complex agent workflows and autonomous task execution, setting the foundation for the next generation of AI applications that can seamlessly interact with external systems and APIs."
      />

      {/* Implementation Examples */}
      <PromptSection
        title="Real-World Implementation Examples"
        type="architecture"
        sectionId="examples"
        content={`<span class="text-orange-400">// Single Function Call Example</span>
&lt;function_calls&gt;
&lt;invoke name="<span class="text-blue-400">web_search</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">query</span>"&gt;<span class="text-cyan-400">latest AI developments 2025</span>&lt;/parameter&gt;
&lt;parameter name="<span class="text-yellow-400">max_results</span>"&gt;<span class="text-green-400">10</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;/function_calls&gt;

<span class="text-purple-400">// Multiple Parallel Calls Example</span>
&lt;function_calls&gt;
&lt;invoke name="<span class="text-blue-400">get_weather</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">location</span>"&gt;<span class="text-cyan-400">San Francisco</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;invoke name="<span class="text-blue-400">get_news</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">category</span>"&gt;<span class="text-cyan-400">technology</span>&lt;/parameter&gt;
&lt;parameter name="<span class="text-yellow-400">limit</span>"&gt;<span class="text-green-400">5</span>&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;/function_calls&gt;

<span class="text-green-400">// Complex JSON Parameter Example</span>
&lt;function_calls&gt;
&lt;invoke name="<span class="text-blue-400">create_calendar_event</span>"&gt;
&lt;parameter name="<span class="text-yellow-400">event_data</span>"&gt;{
  "title": "AI Conference 2025",
  "start_time": "2025-03-15T09:00:00Z",
  "attendees": ["alice@company.com", "bob@company.com"],
  "location": {"venue": "Tech Center", "room": "A1"}
}&lt;/parameter&gt;
&lt;/invoke&gt;
&lt;/function_calls&gt;`}
        explanation="These real-world examples demonstrate the practical power of Claude's tool architecture. The system can handle everything from simple API calls to complex multi-parameter functions with JSON data structures, enabling sophisticated automation and integration scenarios."
      />

      {/* Industry Impact */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Industry Leadership in AI Tool Integration</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              Technical Advantages
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• XML structure more readable than JSON</li>
              <li>• Parallel execution built-in</li>
              <li>• Sophisticated parameter inference</li>
              <li>• Production-grade error handling</li>
              <li>• Context-aware parameter filling</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Enterprise Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Robust error recovery mechanisms</li>
              <li>• Clear parameter validation rules</li>
              <li>• Scalable to complex workflows</li>
              <li>• Multi-platform compatibility</li>
              <li>• Developer-friendly debugging</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Future Applications
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Autonomous agent workflows</li>
              <li>• Complex enterprise automation</li>
              <li>• Multi-modal tool integration</li>
              <li>• Real-time system orchestration</li>
              <li>• Advanced AI-human collaboration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Competitive Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">2025 AI Tool Use Comparison</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Claude API Tool Use</h3>
            <div className="space-y-2 text-sm">
              <div className="text-green-400">✓ XML-based structured calls</div>
              <div className="text-green-400">✓ Parallel execution support</div>
              <div className="text-green-400">✓ Context-aware parameter inference</div>
              <div className="text-green-400">✓ Robust error handling</div>
              <div className="text-green-400">✓ Production-ready architecture</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Competitors (OpenAI, Google)</h3>
            <div className="space-y-2 text-sm">
              <div className="text-yellow-400">~ JSON-based function calling</div>
              <div className="text-red-400">✗ Limited parallel execution</div>
              <div className="text-yellow-400">~ Basic parameter handling</div>
              <div className="text-red-400">✗ Less sophisticated error recovery</div>
              <div className="text-yellow-400">~ Varying production reliability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 border border-green-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Cutting-Edge AI Tool Architecture (2025)</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>XML Innovation:</strong> Revolutionary XML-based architecture provides clearer structure and easier parsing than JSON alternatives, enabling more reliable tool integration at scale.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Parallel Execution:</strong> Built-in support for concurrent function calls enables sophisticated multi-tool workflows that are essential for complex AI agent applications.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Context Intelligence:</strong> Advanced parameter inference from conversation context reduces the need for explicit parameter specification, making AI interactions more natural and efficient.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Production Ready:</strong> Enterprise-grade error handling and recovery mechanisms ensure reliability in real-world applications, setting new standards for AI tool integration.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/anthropic-claude-api-tool-use_20250119.md" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}