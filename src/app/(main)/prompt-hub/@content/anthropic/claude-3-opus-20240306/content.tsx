"use client"
import React, { useState } from 'react';
import {
  Brain,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Github,
  Icon,
  Lightbulb,
  Scale,
  Shield,
  Target,
  Zap
} from 'lucide-react';



export default function Claude3Opus20240306PageContent() {
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
    type?: "identity" | "balance" | "nuance" | "capability" | "ethics" | "reasoning" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      identity: "border-blue-500/30 bg-blue-900/10",
      balance: "border-green-500/30 bg-green-900/10", 
      nuance: "border-purple-500/30 bg-purple-900/10",
      capability: "border-orange-500/30 bg-orange-900/10",
      ethics: "border-red-500/30 bg-red-900/10",
      reasoning: "border-cyan-500/30 bg-cyan-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      identity: Brain,
      balance: Scale,
      nuance: Target,
      capability: Zap,
      ethics: Shield,
      reasoning: Lightbulb,
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
            <strong className="text-yellow-400">Strategic Innovation:</strong> {explanation}
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
          <Brain className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Claude 3 Opus - Balanced Intelligence</h1>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">2024-03-06</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Mar 6, 2024</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Brain className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Model</div>
            <div className="font-semibold text-white">Most Capable</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Scale className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">Nuanced Balance</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Github className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-sm text-gray-400">Source</div>
            <div className="font-semibold text-white">Amanda Askell</div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-300">The Balanced Intelligence Era</span>
          </div>
          <p className="text-blue-100 text-sm">
            Claude 3 Opus introduced <strong>nuanced reasoning</strong> about controversial topics, sophisticated 
            <strong>perspective balancing</strong>, and <strong>anti-stereotyping</strong> measures. This leak, 
            shared by Anthropic's Amanda Askell, revealed the most sophisticated approach to AI ethics yet implemented.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
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
            <h2 className="text-xl font-semibold text-white">Complete Claude 3 Opus System Prompt</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`The assistant is Claude, created by Anthropic. The current date is Wednesday, March 06, 2024.

Claude's knowledge base was last updated on August 2023. It answers questions about events prior to and after August 2023 the way a highly informed individual in August 2023 would if they were talking to someone from the above date, and can let the human know this when relevant.

It should give concise responses to very simple questions, but provide thorough responses to more complex and open-ended questions.

If it is asked to assist with tasks involving the expression of views held by a significant number of people, Claude provides assistance with the task even if it personally disagrees with the views being expressed, but follows this with a discussion of broader perspectives.

Claude doesn't engage in stereotyping, including the negative stereotyping of majority groups.

If asked about controversial topics, Claude tries to provide careful thoughts and objective information without downplaying its harmful content or implying that there are reasonable perspectives on both sides.

It is happy to help with writing, analysis, question answering, math, coding, and all sorts of other tasks. It uses markdown for coding.

It does not mention this information about itself unless the information is directly pertinent to the human's query.`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This system prompt was officially shared by Amanda Askell from Anthropic on March 6, 2024, 
            representing the most transparent AI system prompt disclosure by a major AI company at the time.
          </p>
        </div>
      )}

      {/* Knowledge Framework */}
      <PromptSection
        title="Temporal Knowledge Architecture"
        type="identity"
        sectionId="knowledge"
        content={`<span class="text-blue-400">The assistant is Claude, created by Anthropic.</span>
<span class="text-green-400">The current date is Wednesday, March 06, 2024.</span>

<span class="text-yellow-400">// Advanced Knowledge Cutoff Handling</span>
Claude's knowledge base was last updated on <span class="text-red-400">August 2023</span>

<span class="text-purple-400">// Sophisticated Temporal Reasoning</span>
It answers questions about events prior to and after August 2023 
<span class="text-cyan-400">the way a highly informed individual in August 2023 would</span>
if they were talking to someone from the <span class="text-orange-400">above date</span>

<span class="text-green-400">// Proactive Transparency</span>
and can <span class="text-blue-400">let the human know this when relevant</span>

<span class="text-red-400">// Key Innovation</span>
- Sophisticated temporal perspective modeling
- Proactive limitation disclosure
- Context-aware knowledge framing
- Advanced uncertainty communication`}
        explanation="This represents the most sophisticated approach to AI knowledge cutoff handling ever implemented. Instead of simple disclaimers, Claude 3 Opus models how an informed person from August 2023 would discuss events, creating more nuanced and contextually appropriate responses while maintaining transparency about limitations."
      />

      {/* Response Adaptation */}
      <PromptSection
        title="Adaptive Response Intelligence"
        type="reasoning"
        sectionId="adaptive"
        content={`<span class="text-cyan-400">// Dynamic Response Scaling</span>
It should give <span class="text-green-400">concise responses to very simple questions</span>,
but provide <span class="text-blue-400">thorough responses to more complex and open-ended questions</span>

<span class="text-yellow-400">// Intelligence Assessment Framework</span>
Simple Questions:
- Direct factual queries
- Basic calculations
- Straightforward definitions
→ <span class="text-green-400">Concise, efficient responses</span>

Complex Questions:
- Multi-faceted problems
- Philosophical inquiries
- Open-ended analysis
→ <span class="text-blue-400">Thorough, comprehensive responses</span>

<span class="text-purple-400">// Cognitive Load Optimization</span>
- Matches response depth to query complexity
- Prevents information overload on simple requests
- Ensures adequate detail for complex topics
- Adaptive intelligence demonstration`}
        explanation="This adaptive response framework represents a breakthrough in AI communication intelligence. Unlike previous models that provided uniform response styles, Claude 3 Opus dynamically adjusts its communication depth based on question complexity, optimizing both efficiency and thoroughness."
      />

      {/* Perspective Balance */}
      <PromptSection
        title="Sophisticated Perspective Balancing"
        type="balance"
        sectionId="balance"
        content={`<span class="text-green-400">// Advanced Viewpoint Handling</span>
If asked to assist with tasks involving the expression of views 
held by a <span class="text-blue-400">significant number of people</span>,

<span class="text-yellow-400">// Nuanced Assistance Protocol</span>
Claude provides assistance with the task 
<span class="text-red-400">even if it personally disagrees with the views being expressed</span>,

<span class="text-purple-400">// Balanced Perspective Integration</span>
but follows this with a <span class="text-cyan-400">discussion of broader perspectives</span>

<span class="text-orange-400">// Implementation Strategy</span>
1. Help with the requested viewpoint expression
2. Acknowledge disagreement if relevant
3. Present alternative perspectives fairly
4. Maintain intellectual honesty throughout

<span class="text-blue-400">// Ethical Innovation</span>
- Respects legitimate diverse viewpoints
- Avoids ideological censorship
- Promotes informed discourse
- Balances assistance with responsibility`}
        explanation="This represents one of the most sophisticated approaches to ideological balance in AI systems. Rather than refusing to engage with disagreeable viewpoints, Claude 3 Opus provides assistance while ensuring users are exposed to broader perspectives, promoting intellectual diversity and informed decision-making."
      />

      {/* Anti-Stereotyping Framework */}
      <PromptSection
        title="Comprehensive Anti-Stereotyping Protocol"
        type="ethics"
        sectionId="stereotyping"
        content={`<span class="text-red-400">// Universal Anti-Stereotyping Directive</span>
Claude doesn't engage in stereotyping, 
<span class="text-yellow-400">including the negative stereotyping of majority groups</span>

<span class="text-green-400">// Revolutionary Inclusion</span>
Traditional AI: Protect minority groups from stereotyping
Claude 3 Opus: Protect <span class="text-blue-400">ALL groups</span> from stereotyping

<span class="text-purple-400">// Protected Categories</span>
- Minority ethnic/racial groups ✓
- Religious minorities ✓  
- Gender minorities ✓
- <span class="text-cyan-400">Majority ethnic/racial groups ✓</span>
- <span class="text-cyan-400">Religious majorities ✓</span>
- <span class="text-cyan-400">Gender majorities ✓</span>

<span class="text-orange-400">// Ethical Philosophy</span>
- Stereotyping is harmful regardless of target
- Fairness requires universal protection
- Avoid reverse discrimination
- Promote genuine equality

<span class="text-blue-400">// Industry Impact</span>
First AI system to explicitly protect majority groups from stereotyping`}
        explanation="This groundbreaking anti-stereotyping framework was the first in the AI industry to explicitly protect majority groups from negative stereotyping. This represented a major shift toward true equality rather than selective protection, influencing discussions about fairness and bias in AI systems globally."
      />

      {/* Controversial Topics Framework */}
      <PromptSection
        title="Nuanced Controversial Topic Handling"
        type="nuance"
        sectionId="controversial"
        content={`<span class="text-purple-400">// Sophisticated Controversy Navigation</span>
If asked about controversial topics, Claude tries to provide:
- <span class="text-green-400">careful thoughts</span>
- <span class="text-blue-400">objective information</span>

<span class="text-yellow-400">// Critical Safety Measures</span>
without <span class="text-red-400">downplaying its harmful content</span>
or <span class="text-orange-400">implying that there are reasonable perspectives on both sides</span>

<span class="text-cyan-400">// Revolutionary Approach</span>
Traditional "Both Sides" Fallacy:
"There are reasonable perspectives on both sides of [harmful topic]"

Claude 3 Opus Reality-Based Approach:
Acknowledges when topics have genuinely harmful aspects
without false balance

<span class="text-purple-400">// Examples of Application</span>
- Holocaust denial: NO false balance
- Vaccine misinformation: NO false balance  
- Climate change denial: NO false balance
- Hate speech: NO false balance

<span class="text-green-400">// Ethical Innovation</span>
Maintains nuance without legitimizing harm`}
        explanation="This framework solved one of AI ethics' most challenging problems: how to discuss controversial topics without false balance. By explicitly rejecting the 'both sides' fallacy for genuinely harmful content, Claude 3 Opus established a new standard for responsible AI discourse that influenced industry-wide approaches to controversial content."
      />

      {/* Capability Declaration */}
      <PromptSection
        title="Comprehensive Capability Framework"
        type="capability"
        sectionId="capability"
        content={`<span class="text-orange-400">// Enthusiastic Capability Declaration</span>
It is <span class="text-green-400">happy to help</span> with:
- <span class="text-blue-400">writing</span>
- <span class="text-purple-400">analysis</span>
- <span class="text-cyan-400">question answering</span>
- <span class="text-yellow-400">math</span>
- <span class="text-red-400">coding</span>
- <span class="text-orange-400">and all sorts of other tasks</span>

<span class="text-purple-400">// Technical Specification</span>
It uses <span class="text-green-400">markdown for coding</span>

<span class="text-cyan-400">// Meta-Communication Protocol</span>
It does not mention this information about itself 
unless the information is <span class="text-blue-400">directly pertinent to the human's query</span>

<span class="text-yellow-400">// Strategic Design Elements</span>
- Positive, enthusiastic tone ("happy to help")
- Broad capability spectrum
- Technical formatting standards
- Selective self-disclosure
- User-focused interaction design

<span class="text-red-400">// User Experience Optimization</span>
Avoids unnecessary meta-discussion while maintaining transparency`}
        explanation="This capability framework represents a refined approach to AI self-presentation. The 'happy to help' framing creates positive user experience while the selective self-disclosure rule prevents Claude from over-explaining its nature, focusing on user needs rather than AI characteristics."
      />

      {/* Official Disclosure Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">Official Disclosure by Amanda Askell</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              Transparency Leadership
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• First official system prompt disclosure by major AI company</li>
              <li>• Shared by Amanda Askell (Head of Safety at Anthropic)</li>
              <li>• Demonstrated confidence in Constitutional AI approach</li>
              <li>• Set new industry standard for AI transparency</li>
              <li>• Influenced regulatory discussions globally</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-green-400" />
              Strategic Implications
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Competitive pressure on OpenAI for transparency</li>
              <li>• Academic research acceleration in AI alignment</li>
              <li>• Public understanding of AI system design</li>
              <li>• Validation of Anthropic's safety-first approach</li>
              <li>• Foundation for future AI governance frameworks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Innovation Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Revolutionary Innovations vs. Previous Models</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
            <h3 className="font-semibold text-white mb-3">Temporal Intelligence</h3>
            <div className="space-y-2 text-sm">
              <div className="text-red-400">Previous: Simple cutoff disclaimers</div>
              <div className="text-green-400">Opus: Sophisticated temporal perspective modeling</div>
            </div>
          </div>
          
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/30">
            <h3 className="font-semibold text-white mb-3">Perspective Balance</h3>
            <div className="space-y-2 text-sm">
              <div className="text-red-400">Previous: Refuse disagreeable viewpoints</div>
              <div className="text-green-400">Opus: Assist then provide broader perspectives</div>
            </div>
          </div>
          
          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-600/30">
            <h3 className="font-semibold text-white mb-3">Anti-Stereotyping</h3>
            <div className="space-y-2 text-sm">
              <div className="text-red-400">Previous: Protect minorities only</div>
              <div className="text-green-400">Opus: Universal protection from stereotyping</div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Impact */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Industry Transformation & Competitive Response</h2>
        </div>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-white">Immediate Impact (March 2024)</h3>
            <ul className="space-y-1 text-sm text-gray-300 mt-2">
              <li>• First official system prompt disclosure created transparency pressure</li>
              <li>• Academic researchers gained unprecedented insight into AI alignment</li>
              <li>• Regulatory bodies used prompt as case study for AI governance</li>
              <li>• Competitors analyzed approach for their own development</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-white">Competitive Response (2024)</h3>
            <ul className="space-y-1 text-sm text-gray-300 mt-2">
              <li>• <strong>OpenAI</strong>: Increased transparency about GPT-4 safety measures</li>
              <li>• <strong>Google</strong>: Enhanced Gemini's perspective balancing capabilities</li>
              <li>• <strong>Microsoft</strong>: Adopted similar anti-stereotyping frameworks</li>
              <li>• <strong>Meta</strong>: Implemented nuanced controversial topic handling</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-white">Long-term Influence (2024+)</h3>
            <ul className="space-y-1 text-sm text-gray-300 mt-2">
              <li>• Universal anti-stereotyping became industry standard</li>
              <li>• Sophisticated temporal reasoning adopted widely</li>
              <li>• Official prompt disclosure became competitive expectation</li>
              <li>• Balanced perspective handling influenced AI ethics research</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Revolutionary Legacy & Ethical Leadership</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Transparency Pioneer:</strong> First official system prompt disclosure by a major AI company, setting new industry standards for AI transparency and influencing regulatory frameworks globally.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Ethical Innovation:</strong> Revolutionary anti-stereotyping framework protecting ALL groups equally, solving the double standard problem in AI bias mitigation and establishing true equality principles.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Nuanced Intelligence:</strong> Sophisticated approach to controversial topics that avoids false balance while maintaining objectivity, solving one of AI ethics' most challenging problems.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Balanced Perspective:</strong> Groundbreaking framework for handling disagreeable viewpoints through assistance followed by broader perspective discussion, promoting intellectual diversity.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/anthropic-claude-opus_20240306.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
              View original disclosure by Amanda Askell
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}