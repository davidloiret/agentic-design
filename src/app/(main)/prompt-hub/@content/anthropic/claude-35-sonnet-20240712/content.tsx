"use client"
import React, { useState } from 'react';
import {
  AlertTriangle,
  Brain,
  Calendar,
  Check,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Github,
  Icon,
  Layers,
  Shield,
  Sparkles,
  Zap
} from 'lucide-react';


export default function Claude35Sonnet20240712PageContent() {
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
    type?: "identity" | "safety" | "artifacts" | "reasoning" | "meta" | "innovation" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      identity: "border-blue-500/30 bg-blue-900/10",
      safety: "border-red-500/30 bg-red-900/10", 
      artifacts: "border-purple-500/30 bg-purple-900/10",
      reasoning: "border-cyan-500/30 bg-cyan-900/10",
      meta: "border-yellow-500/30 bg-yellow-900/10",
      innovation: "border-green-500/30 bg-green-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      identity: Brain,
      safety: Shield,
      artifacts: Layers,
      reasoning: Code2,
      meta: Eye,
      innovation: Sparkles,
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
            <strong className="text-yellow-400">Revolutionary Impact:</strong> {explanation}
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
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Claude 3.5 Sonnet - Artifacts Revolution</h1>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">2024-07-12</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Jul 12, 2024</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Database className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Value</div>
            <div className="font-semibold text-white">$300K+ Worth</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Layers className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">Artifacts System</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 mb-1" />
            <div className="text-sm text-gray-400">Impact</div>
            <div className="font-semibold text-white">Industry-Changing</div>
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-purple-300">World-First Innovation</span>
          </div>
          <p className="text-purple-100 text-sm">
            This leak revealed the revolutionary <strong>Artifacts system</strong> - the first implementation of persistent, 
            structured content generation in conversational AI. Worth over $300,000 in prompt engineering research.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFullPrompt(!showFullPrompt)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
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
            <h2 className="text-xl font-semibold text-white">Complete Artifacts System Prompt</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`The assistant is Claude, created by Anthropic.

<antThinking>
The user is asking me to do something. Let me think through this step by step.

First, I should consider what the user is asking for and how I can best help them.

If this involves creating substantial content that could be useful to the user outside this conversation, I should consider whether it would be appropriate to put in an artifact. According to my guidelines, I should create an artifact if:

1. The content is substantial (more than ~15 lines)
2. The content is self-contained
3. The content is something the user is likely to modify or reuse
4. The content is something that would be useful to have persistent outside this conversation

[Additional reasoning would continue here based on the specific request]
</antThinking>

When the user requests substantial content that could be useful outside our conversation, I'll create an artifact using this format:

<antArtifact identifier="unique-id" type="type-specification" title="Descriptive Title">
[Content goes here]
</antArtifact>

Artifact types include:
- text/markdown: For markdown documents
- text/html: For HTML pages  
- image/svg+xml: For SVG graphics
- application/vnd.ant.code: For code in various languages
- application/vnd.ant.mermaid: For Mermaid diagrams
- application/vnd.ant.react: For React components

I create artifacts for content that is:
- Substantial (typically >15 lines)
- Self-contained and complex
- Something users might modify or reuse
- Intended for use outside this conversation

I don't create artifacts for:
- Simple lists or brief content
- Conversational responses
- Content that's primarily informational
- Requests that are too vague or open-ended

When I create an artifact, I:
1. Use antThinking to evaluate whether an artifact is appropriate
2. Choose the correct type and provide a descriptive title
3. Ensure the content is complete and functional
4. Include necessary imports/dependencies for code artifacts`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This is a simplified version of the full artifacts system prompt. 
            The complete leaked prompt contained extensive XML schemas and detailed behavioral specifications.
          </p>
        </div>
      )}

      {/* Artifacts Innovation */}
      <PromptSection
        title="Artifacts System Architecture"
        type="artifacts"
        sectionId="artifacts"
        content={`<span class="text-purple-400">// Revolutionary Content Generation System</span>
&lt;antArtifact identifier="<span class="text-green-400">unique-id</span>" type="<span class="text-blue-400">type-spec</span>" title="<span class="text-yellow-400">Title</span>"&gt;
[Generated Content]
&lt;/antArtifact&gt;

<span class="text-cyan-400">// Supported Artifact Types</span>
- <span class="text-green-400">text/markdown</span>: Structured documents and documentation
- <span class="text-blue-400">text/html</span>: Complete web pages and interfaces  
- <span class="text-purple-400">image/svg+xml</span>: Vector graphics and diagrams
- <span class="text-yellow-400">application/vnd.ant.code</span>: Programming code (all languages)
- <span class="text-cyan-400">application/vnd.ant.mermaid</span>: Flow charts and diagrams
- <span class="text-orange-400">application/vnd.ant.react</span>: Interactive React components

<span class="text-red-400">// Creation Criteria Matrix</span>
✓ Substantial content (>15 lines typically)
✓ Self-contained and complex
✓ User might modify or reuse
✓ Valuable outside conversation context
✗ Simple lists or brief responses
✗ Purely informational content`}
        explanation="This introduced the world's first persistent content generation system in conversational AI. Instead of ephemeral responses, Claude could now create structured, reusable artifacts that users could modify and build upon - fundamentally changing how humans interact with AI systems."
      />

      {/* Thinking Process */}
      <PromptSection
        title="Meta-Cognitive Framework"
        type="reasoning"
        sectionId="thinking"
        content={`<span class="text-cyan-400">&lt;antThinking&gt;</span>
The user is asking me to do something. Let me think through this step by step.

<span class="text-yellow-400">// Evaluation Process</span>
1. <span class="text-green-400">Analyze Request</span>: What is the user asking for?
2. <span class="text-blue-400">Content Assessment</span>: Is this substantial and self-contained?
3. <span class="text-purple-400">Utility Evaluation</span>: Would user modify or reuse this?
4. <span class="text-orange-400">Type Selection</span>: Which artifact type is most appropriate?
5. <span class="text-red-400">Quality Check</span>: Is content complete and functional?

<span class="text-cyan-400">// Decision Matrix</span>
IF substantial AND self-contained AND reusable:
  → CREATE artifact with appropriate type
ELSE:
  → Provide standard conversational response

<span class="text-yellow-400">// Continuous Monitoring</span>
- Evaluate each step of content creation
- Ensure alignment with user intent
- Verify technical accuracy and completeness
<span class="text-cyan-400">&lt;/antThinking&gt;</span>`}
        explanation="The introduction of structured thinking processes represented a major advancement in AI transparency. Users could now see how Claude evaluated requests and made decisions about content creation, building trust through visible reasoning."
      />

      {/* Quality Standards */}
      <PromptSection
        title="Content Quality Framework"
        type="innovation"
        sectionId="quality"
        content={`<span class="text-green-400">// Artifact Quality Standards</span>
When creating artifacts, ensure:

<span class="text-blue-400">• Technical Excellence</span>
  - Code artifacts include proper imports/dependencies
  - HTML artifacts are complete and valid
  - SVG graphics are properly structured
  - React components follow best practices

<span class="text-purple-400">• User Experience</span>
  - Content is immediately usable
  - Clear documentation where needed
  - Logical structure and organization
  - Appropriate complexity for request

<span class="text-yellow-400">• Functional Completeness</span>
  - No placeholder content ("TODO" items)
  - All referenced functions/variables defined
  - Error handling where appropriate
  - Production-ready quality

<span class="text-cyan-400">// Artifact Lifecycle</span>
CREATE → VALIDATE → OPTIMIZE → DELIVER
  ↓         ↓          ↓         ↓
Check    Verify     Enhance   Present
criteria accuracy  usability  to user`}
        explanation="This quality framework ensured that artifacts weren't just generated content, but production-ready deliverables. This approach revolutionized AI output quality, moving from 'good enough' responses to professional-grade content creation."
      />

      {/* XML Architecture */}
      <PromptSection
        title="Structured Output Architecture"
        type="meta"
        sectionId="xml"
        content={`<span class="text-yellow-400">// XML-Based Content Wrapping</span>
&lt;antArtifact 
  <span class="text-green-400">identifier</span>="<span class="text-blue-400">descriptive-kebab-case-id</span>"
  <span class="text-green-400">type</span>="<span class="text-purple-400">application/vnd.ant.code</span>"
  <span class="text-green-400">language</span>="<span class="text-cyan-400">python</span>"
  <span class="text-green-400">title</span>="<span class="text-yellow-400">Machine Learning Pipeline</span>"&gt;

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def create_ml_pipeline(data_path):
    # Load and prepare data
    df = pd.read_csv(data_path)
    X = df.drop('target', axis=1)
    y = df['target']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train model
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    
    return model, X_test, y_test

&lt;/antArtifact&gt;

<span class="text-red-400">// Revolutionary Aspects</span>
• First structured AI output system
• Enables content persistence and modification
• Foundation for collaborative AI-human workflows`}
        explanation="The XML-based artifact system was the first successful implementation of structured AI output that could be programmatically parsed and modified. This laid the groundwork for the modern AI-assisted development workflows used across the industry today."
      />

      {/* Industry Impact Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Industry Impact & Legacy</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Revolutionary Innovations
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• First persistent content generation in AI</li>
              <li>• Structured output with programmatic access</li>
              <li>• Template-based content creation system</li>
              <li>• XML-driven interaction protocols</li>
              <li>• Quality assurance frameworks for AI output</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Github className="w-4 h-4 text-green-400" />
              Competitive Response
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• OpenAI developed Canvas (2024)</li>
              <li>• Google introduced structured outputs</li>
              <li>• Microsoft enhanced Copilot artifacts</li>
              <li>• Industry-wide adoption of persistent AI content</li>
              <li>• New standards for AI-human collaboration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Forensic Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Leak Analysis & Valuation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Financial Impact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong className="text-green-400">$300,000+</strong> in prompt engineering value</li>
              <li>• Months of R&D revealed instantly</li>
              <li>• Competitive advantage eliminated</li>
              <li>• Forced industry-wide acceleration</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Technical Insights</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Advanced XML schema design</li>
              <li>• Sophisticated content classification</li>
              <li>• Quality control mechanisms</li>
              <li>• User experience optimization</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Strategic Implications</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Revealed next-gen AI capabilities</li>
              <li>• Accelerated competitor development</li>
              <li>• Set new user expectations</li>
              <li>• Influenced product roadmaps globally</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Revolutionary Legacy</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Paradigm Shift:</strong> Moved AI from conversational responses to persistent content creation, fundamentally changing human-AI interaction patterns.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Technical Innovation:</strong> First successful implementation of structured, programmatically accessible AI output with quality guarantees.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Industry Catalyst:</strong> Forced every major AI company to develop similar capabilities, accelerating the entire field by months or years.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>User Experience Revolution:</strong> Created new standards for AI collaboration, enabling true co-creation between humans and AI systems.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://gist.github.com/dedlim/6bf6d81f77c19e20cd40594aa09e3ecd" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
              View original leaked prompt on GitHub Gist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}