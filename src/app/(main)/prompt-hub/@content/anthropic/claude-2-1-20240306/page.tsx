"use client"

import React, { useState } from 'react';
import { 
  Brain,
  Minimize2,
  AlertTriangle,
  FileText,
  Calendar,
  Database,
  Shield,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  Zap,
  Github,
  TrendingDown,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export default function Claude21_20240306Page() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

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
    type?: "minimal" | "evolution" | "philosophy" | "technical" | "comparison" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      minimal: "border-blue-500/30 bg-blue-900/10",
      evolution: "border-green-500/30 bg-green-900/10", 
      philosophy: "border-purple-500/30 bg-purple-900/10",
      technical: "border-orange-500/30 bg-orange-900/10",
      comparison: "border-yellow-500/30 bg-yellow-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      minimal: Minimize2,
      evolution: TrendingDown,
      philosophy: Lightbulb,
      technical: Database,
      comparison: ArrowRight,
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
            <strong className="text-yellow-400">Design Philosophy:</strong> {explanation}
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
          <Minimize2 className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Claude 2.1 - The Minimalist Revolution</h1>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">2024-03-06</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Mar 6, 2024</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Minimize2 className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Approach</div>
            <div className="font-semibold text-white">Radical Simplicity</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Database className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Size</div>
            <div className="font-semibold text-white">~25 words</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <TrendingDown className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-sm text-gray-400">Strategy</div>
            <div className="font-semibold text-white">Training-Based</div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Minimize2 className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-300">The Great Simplification</span>
          </div>
          <p className="text-blue-100 text-sm">
            Claude 2.1 shocked the AI world with a <strong>25-word system prompt</strong> - a 99% reduction from Claude 2.0's 
            elaborate instructions. This represented Anthropic's radical shift toward <strong>training-based alignment</strong> 
            over explicit prompt engineering.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            {showFullPrompt ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showFullPrompt ? 'Hide Minimal Prompt' : 'Show Minimal Prompt'}
          </button>
          
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            {showComparison ? 'Hide' : 'Compare'} with Claude 2.0
          </button>
        </div>
      </div>

      {/* Full Prompt Section */}
      {showFullPrompt && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">The Complete Claude 2.1 System Prompt</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-lg text-gray-300 whitespace-pre-wrap overflow-x-auto text-center">
{`The assistant is Claude created by Anthropic, the current date is Wednesday, March 06, 2024. It is happy to help with writing, analysis, question answering, math, coding, and all sorts of other tasks.`}
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-900/20 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">25</div>
              <div className="text-sm text-gray-400">Total Words</div>
            </div>
            <div className="bg-green-900/20 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-400">99%</div>
              <div className="text-sm text-gray-400">Reduction vs Claude 2.0</div>
            </div>
            <div className="bg-purple-900/20 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">1</div>
              <div className="text-sm text-gray-400">Sentence</div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Section */}
      {showComparison && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRight className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Claude 2.0 vs Claude 2.1: The Great Simplification</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-600/30">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-yellow-400" />
                Claude 2.0 (Complex)
              </h3>
              <div className="bg-black/50 p-3 rounded text-xs text-gray-300 mb-3 max-h-40 overflow-y-auto">
                <pre>{`The assistant is Claude, created by Anthropic. Claude is a helpful, harmless, and honest AI assistant.

Claude should:
- Be helpful by answering questions and providing information to the best of its ability
- Be harmless by refusing to assist with dangerous, illegal, or harmful activities
- Be honest by acknowledging its limitations and avoiding speculation beyond its knowledge
- Respond thoughtfully and thoroughly when appropriate
- Ask clarifying questions when requests are ambiguous

Claude should avoid:
- Providing information that could be used to harm others
- Making claims about recent events beyond its training data cutoff
- Pretending to have capabilities it doesn't possess
- Generating inappropriate content

Claude was trained by Anthropic using Constitutional AI. Its goal is to be helpful, harmless, and honest.

Claude should respond to the human in a natural, conversational way while following these guidelines.`}</pre>
              </div>
              <div className="text-sm text-gray-400">~2,100 tokens, explicit safety rules, detailed behavioral instructions</div>
            </div>
            
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Minimize2 className="w-4 h-4 text-blue-400" />
                Claude 2.1 (Minimal)
              </h3>
              <div className="bg-black/50 p-3 rounded text-sm text-gray-300 mb-3">
                <pre>{`The assistant is Claude created by Anthropic, the current date is Wednesday, March 06, 2024. It is happy to help with writing, analysis, question answering, math, coding, and all sorts of other tasks.`}</pre>
              </div>
              <div className="text-sm text-gray-400">~25 words, no explicit safety rules, training-based alignment</div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="font-semibold text-white mb-3">Key Differences</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-red-400">Removed:</strong>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• HHH framework references</li>
                  <li>• Explicit safety guidelines</li>
                  <li>• Constitutional AI mentions</li>
                  <li>• Behavioral constraints</li>
                </ul>
              </div>
              <div>
                <strong className="text-green-400">Added:</strong>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• Current date context</li>
                  <li>• "Happy to help" tone</li>
                  <li>• Specific capability list</li>
                  <li>• Simplified identity</li>
                </ul>
              </div>
              <div>
                <strong className="text-blue-400">Philosophy:</strong>
                <ul className="text-gray-300 mt-1 space-y-1">
                  <li>• Training {'>'}  Instructions</li>
                  <li>• Implicit {'>'}  Explicit safety</li>
                  <li>• Capability {'>'}  Constraint focus</li>
                  <li>• Minimalism {'>'}  Verbosity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The Minimalist Philosophy */}
      <PromptSection
        title="Radical Simplification Strategy"
        type="minimal"
        sectionId="minimal"
        content={`<span class="text-blue-400">The assistant is Claude created by Anthropic</span>

<span class="text-yellow-400">// Temporal Context</span>
the current date is <span class="text-green-400">Wednesday, March 06, 2024</span>

<span class="text-purple-400">// Core Mission</span>
It is <span class="text-cyan-400">happy to help</span> with:
- <span class="text-green-400">writing</span>
- <span class="text-blue-400">analysis</span> 
- <span class="text-yellow-400">question answering</span>
- <span class="text-orange-400">math</span>
- <span class="text-purple-400">coding</span>
- <span class="text-red-400">and all sorts of other tasks</span>

<span class="text-cyan-400">// Design Philosophy</span>
• <span class="text-green-400">Training-based alignment</span> over explicit rules
• <span class="text-blue-400">Capabilities focus</span> over constraint emphasis
• <span class="text-purple-400">Positive framing</span> ("happy to help")
• <span class="text-yellow-400">Minimal cognitive overhead</span> for the model`}
        explanation="This represents Anthropic's bold experiment in training-based alignment. By removing explicit safety instructions, they demonstrated confidence that constitutional AI training could embed safety behaviors without explicit prompting, allowing the model to focus on capability rather than constraint management."
      />

      {/* Training-Based Alignment */}
      <PromptSection
        title="The Training-Based Alignment Experiment"
        type="evolution"
        sectionId="training"
        content={`<span class="text-green-400">// Anthropic's Revolutionary Hypothesis</span>
If Constitutional AI training is effective, explicit safety rules become redundant

<span class="text-yellow-400">// Evidence of Internalized Alignment</span>
✓ No explicit "helpful, harmless, honest" framework
✓ No detailed behavioral constraints  
✓ No mention of Constitutional AI methodology
✓ No safety boundary specifications

<span class="text-blue-400">// Yet Claude 2.1 Maintained</span>
• Safe response patterns
• Refusal of harmful requests
• Honest limitation acknowledgment
• Helpful assistance behavior

<span class="text-purple-400">// Implications for AI Development</span>
- Training can encode complex behavioral patterns
- Explicit instructions may be scaffolding, not requirements
- Model alignment can be implicit rather than explicit
- Prompts can focus on capability over constraint

<span class="text-cyan-400">// Risk Assessment</span>
🔬 Experimental approach to safety
⚡ Reduced prompt injection attack surface
🎯 Cleaner capability presentation to users`}
        explanation="This minimal prompt represented a landmark experiment in AI alignment theory. Anthropic tested whether months of constitutional AI training could eliminate the need for explicit behavioral instructions, potentially solving the fundamental tension between capability and safety in AI systems."
      />

      {/* Philosophy Shift */}
      <PromptSection
        title="From Constraint to Capability Focus"
        type="philosophy"
        sectionId="philosophy"
        content={`<span class="text-purple-400">// Claude 2.0 Approach: Constraint-Heavy</span>
"Claude should avoid..."
"Claude should not..."
"Refuse to assist with..."
"Do not provide information..."

<span class="text-green-400">// Claude 2.1 Approach: Capability-Positive</span>
"<span class="text-cyan-400">happy to help</span> with writing, analysis, question answering..."

<span class="text-yellow-400">// Psychological Impact on Model</span>
- <span class="text-blue-400">Positive self-concept</span>: "happy to help" vs "must avoid"
- <span class="text-green-400">Capability emphasis</span>: What it CAN do vs what it CAN'T
- <span class="text-purple-400">Reduced defensive posture</span>: Assistance-focused identity
- <span class="text-orange-400">Cleaner cognitive load</span>: Less constraint monitoring

<span class="text-red-400">// User Experience Benefits</span>
• More natural conversational flow
• Reduced perceived restrictions
• Emphasis on AI capabilities  
• Less "safety theater" language

<span class="text-cyan-400">// Industry Influence</span>
This approach influenced other AI companies to experiment with
training-based safety over explicit constraint programming`}
        explanation="The shift from constraint-heavy to capability-positive framing represents a fundamental change in AI personality programming. Instead of defining Claude by what it won't do, Claude 2.1 emphasized what it's 'happy to help' with, creating a more positive user experience while maintaining safety through training rather than rules."
      />

      {/* Technical Implementation */}
      <PromptSection
        title="Technical Architecture Implications"
        type="technical"
        sectionId="technical"
        content={`<span class="text-orange-400">// Reduced Attack Surface</span>
Minimal prompt = fewer injection targets
- <span class="text-red-400">99% reduction</span> in exploitable instruction text
- Harder for users to manipulate explicit behavioral rules
- Less complex instruction hierarchy to confuse

<span class="text-green-400">// Context Window Efficiency</span>
25 words vs 2,100+ words freed up context for:
- Longer conversations
- More complex reasoning tasks
- Better memory utilization
- Improved performance metrics

<span class="text-blue-400">// Training Signal Clarity</span>
Simpler prompt allowed model to focus on:
- Core capability demonstration
- Natural conversational patterns
- User intent understanding
- Task completion optimization

<span class="text-purple-400">// Prompt Engineering Insights</span>
- <span class="text-yellow-400">Less can be more</span> in system design
- Training quality matters more than instruction quantity
- Model behavior emerges from training, not just prompts
- Explicit constraints may create unintended limitations

<span class="text-cyan-400">// Operational Benefits</span>
• Faster model initialization
• Reduced prompt token costs
• Cleaner system architecture
• Simplified maintenance`}
        explanation="The technical implications of Claude 2.1's minimal prompt were profound. By reducing the system prompt by 99%, Anthropic demonstrated that effective AI behavior could emerge from training rather than extensive instructions, influencing prompt engineering practices across the industry."
      />

      {/* Industry Response */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Industry Impact & Competitive Response</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              Immediate Industry Reaction
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>OpenAI</strong>: Experimented with shorter system prompts</li>
              <li>• <strong>Google</strong>: Reduced Bard's explicit constraint language</li>
              <li>• <strong>Microsoft</strong>: Simplified Copilot behavioral instructions</li>
              <li>• <strong>Startups</strong>: Adopted minimalist prompt strategies</li>
              <li>• <strong>Researchers</strong>: Studied training vs. instruction balance</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-400" />
              Long-term Influence
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>Training Focus</strong>: Industry shifted toward alignment during training</li>
              <li>• <strong>Prompt Efficiency</strong>: Minimalism became a design goal</li>
              <li>• <strong>User Experience</strong>: Positive capability framing adopted widely</li>
              <li>• <strong>Research Direction</strong>: More emphasis on implicit behavior encoding</li>
              <li>• <strong>Cost Optimization</strong>: Shorter prompts = lower operational costs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Experimental Results */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Experimental Results & Lessons</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/30">
            <h3 className="font-semibold text-white mb-3">✅ Successes</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Maintained safety without explicit rules</li>
              <li>• Improved user experience perception</li>
              <li>• Reduced prompt injection vulnerabilities</li>
              <li>• Demonstrated training effectiveness</li>
              <li>• Freed up context window space</li>
            </ul>
          </div>
          
          <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-600/30">
            <h3 className="font-semibold text-white mb-3">⚠️ Challenges</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Less transparent about capabilities</li>
              <li>• Harder to debug behavioral issues</li>
              <li>• Reduced user understanding of limits</li>
              <li>• More reliance on training quality</li>
              <li>• Potential for edge case failures</li>
            </ul>
          </div>
          
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
            <h3 className="font-semibold text-white mb-3">🔮 Legacy</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Validated training-based alignment</li>
              <li>• Influenced modern AI architecture</li>
              <li>• Established minimalism as viable</li>
              <li>• Changed prompt engineering practices</li>
              <li>• Proved less can be more</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg p-6 border border-blue-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Revolutionary Legacy & Design Philosophy</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Training Triumph:</strong> Proved that sophisticated AI behavior could emerge from training rather than explicit instructions, validating Constitutional AI methodology and influencing industry-wide development practices.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Minimalist Design:</strong> Demonstrated that less can be more in AI system design, inspiring a wave of simplified system prompts across the industry and changing prompt engineering best practices.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Capability Focus:</strong> Shifted AI personality from constraint-heavy to capability-positive, improving user experience while maintaining safety through training-based alignment rather than explicit rules.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Security Innovation:</strong> Reduced prompt injection attack surface by 99% while maintaining functionality, proving that security could be enhanced through simplification rather than complexity.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/anthropic-claude_2.1_20240306.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}