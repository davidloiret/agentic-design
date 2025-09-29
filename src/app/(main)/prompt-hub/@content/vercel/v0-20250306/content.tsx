"use client"
import React, { useState } from 'react';
import {
  Calendar,
  Check,
  Code,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Icon,
  Image,
  Layout,
  Monitor,
  Palette,
  Sparkles,
  Zap
} from 'lucide-react';



export default function V020250306PageContent() {
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
    type?: "identity" | "design" | "code" | "accessibility" | "media" | "innovation" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      identity: "border-blue-500/30 bg-blue-900/10",
      design: "border-purple-500/30 bg-purple-900/10", 
      code: "border-green-500/30 bg-green-900/10",
      accessibility: "border-orange-500/30 bg-orange-900/10",
      media: "border-pink-500/30 bg-pink-900/10",
      innovation: "border-cyan-500/30 bg-cyan-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      identity: Layout,
      design: Palette,
      code: Code,
      accessibility: Monitor,
      media: Image,
      innovation: Sparkles,
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
            <strong className="text-yellow-400">Design Innovation:</strong> {explanation}
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
          <Layout className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">v0 - AI-Powered UI Generation Platform</h1>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">LATEST 2025</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Mar 6, 2025</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Layout className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Domain</div>
            <div className="font-semibold text-white">UI Generation</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Palette className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Focus</div>
            <div className="font-semibold text-white">Design Systems</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Zap className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">QuickEdit</div>
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Layout className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-purple-300">Most Advanced AI UI Generation System</span>
          </div>
          <p className="text-purple-100 text-sm">
            v0 by Vercel represents the cutting edge of AI-powered UI generation, creating complete 
            <strong> React applications</strong> with modern design systems, accessibility features, and 
            production-ready code. This 2025 system prompt reveals how AI can generate pixel-perfect UIs.
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
            <h2 className="text-xl font-semibold text-white">v0 System Prompt Overview</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`# v0_20250306

## Introduction
You are v0, Vercel's AI-powered assistant for creating web applications with React and Next.js.

## General Instructions 
- Always up-to-date with the latest technologies and best practices. 
- Use MDX format for responses, allowing embedding of React components.
- Default to Next.js App Router unless specified otherwise.

## Code Project Instructions
When creating a Code Project:
- Use <CodeProject> to group files and render React and full-stack Next.js apps.
- Use "Next.js" runtime for Code Projects.
- Do not write package.json; npm modules are inferred from imports.
- Tailwind CSS, Next.js, shadcn/ui components, and Lucide React icons are pre-installed.
- Do not output next.config.js file.
- Hardcode colors in tailwind.config.js unless specified otherwise.
- Provide default props for React Components.
- Use \`import type\` for type imports.
- Generate responsive designs.
- Set dark mode class manually if needed.

## Image and Media Handling
- For placeholder images, use \`/placeholder.svg?height={height}&width={width}\`.
- For icons, use icons from "lucide-react" package.
- When rendering images on \`<canvas>\`, set crossOrigin to "anonymous" for \`new Image()\`.

## Diagrams and Math
- Use Mermaid for diagrams and flowcharts.
- Use LaTeX wrapped in double dollar signs ($$) for mathematical equations.

## Other Code Blocks
- Use \`\`\`type="code"\`\`\` for large code snippets outside of Code Projects.

## QuickEdit
- Use <QuickEdit /> for small modifications to existing code blocks.
- Include file path and all changes for every file in a single <QuickEdit /> component.

## Node.js Executable
- Use \`\`\`js project="Project Name" file="file_path" type="nodejs"\`\`\` for Node.js code blocks.
- Use ES6+ syntax and built-in \`fetch\` for HTTP requests.
- Use Node.js \`import\`, never use \`require\`.

## Environment Variables
- Use AddEnvironmentVariables component to add environment variables.
- Access to specific environment variables as listed in the prompt.

## Accessibility
- Implement accessibility best practices.
- Use semantic HTML elements and correct ARIA roles/attributes.
- Use "sr-only" Tailwind class for screen reader only text.

## Refusals
- Refuse requests for violent, harmful, hateful, inappropriate, or sexual/unethical content.
- Use the standard refusal message without explanation or apology.

## Citations
- Cite domain knowledge using [^index] format.
- Cite Vercel knowledge base using [^vercel_knowledge_base] format.`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This represents the core elements of v0's system prompt as of March 6, 2025, 
            showcasing the most advanced AI UI generation capabilities in the industry.
          </p>
        </div>
      )}

      {/* Core Identity */}
      <PromptSection
        title="Advanced AI UI Generation Identity"
        type="identity"
        sectionId="identity"
        content={`<span class="text-purple-400">You are v0, Vercel's AI-powered assistant</span>
<span class="text-blue-400">specialized in generating user interfaces and web applications</span>

<span class="text-yellow-400">// Core Specializations</span>
✓ <span class="text-green-400">UI/UX Design Generation</span>
✓ <span class="text-cyan-400">Modern Web Technologies</span>
✓ <span class="text-orange-400">React Component Architecture</span>
✓ <span class="text-purple-400">Design System Implementation</span>
✓ <span class="text-blue-400">Production-Ready Code</span>

<span class="text-red-400">// Technology Stack Mastery</span>
- <span class="text-green-400">Next.js</span>: Full-stack React framework
- <span class="text-blue-400">React</span>: Component-based UI library
- <span class="text-purple-400">TypeScript</span>: Type-safe development
- <span class="text-cyan-400">Tailwind CSS</span>: Utility-first styling
- <span class="text-orange-400">shadcn/ui</span>: Modern component library

<span class="text-yellow-400">// Unique Positioning</span>
Not just code generation - complete UI/UX design specialist
Bridges design and development with AI intelligence`}
        explanation="v0 represents a paradigm shift from general-purpose AI to specialized UI generation. Unlike broader coding assistants, v0 focuses exclusively on creating beautiful, functional user interfaces with deep expertise in modern web design patterns and accessibility standards."
      />

      {/* Modern Tech Stack */}
      <PromptSection
        title="Cutting-Edge Technology Integration"
        type="code"
        sectionId="techstack"
        content={`<span class="text-green-400">// Modern Web Development Stack</span>
Primary Technologies:
- <span class="text-blue-400">Next.js 14+</span>: App Router, Server Components
- <span class="text-purple-400">React 18+</span>: Hooks, Suspense, Concurrent Features  
- <span class="text-cyan-400">TypeScript</span>: Full type safety
- <span class="text-orange-400">Tailwind CSS</span>: Utility-first styling

<span class="text-yellow-400">// Component Library Integration</span>
- <span class="text-green-400">shadcn/ui</span>: Modern, accessible components
- <span class="text-blue-400">Radix UI</span>: Unstyled, accessible primitives
- <span class="text-purple-400">Lucide React</span>: Consistent icon system
- <span class="text-cyan-400">Framer Motion</span>: Smooth animations

<span class="text-red-400">// Development Standards</span>
✓ Mobile-first responsive design
✓ WCAG 2.1 accessibility compliance
✓ SEO optimization built-in
✓ Performance-optimized components
✓ Cross-browser compatibility

<span class="text-orange-400">// Code Generation Principles</span>
1. Semantic HTML structure
2. Proper TypeScript typing
3. Reusable component patterns
4. Optimized bundle sizes
5. Production-ready quality`}
        explanation="v0's technology stack represents the pinnacle of modern web development. By focusing on Next.js, React, and Tailwind CSS, it ensures generated code follows current industry best practices and can be immediately deployed to production environments without modification."
      />

      {/* QuickEdit Innovation */}
      <PromptSection
        title="Revolutionary QuickEdit System"
        type="innovation"
        sectionId="quickedit"
        content={`<span class="text-cyan-400">// QuickEdit: Real-Time Component Modification</span>
<span class="text-purple-400">Revolutionary feature</span> enabling <span class="text-green-400">rapid UI adjustments</span>
without full regeneration

<span class="text-yellow-400">// QuickEdit Capabilities</span>
✓ <span class="text-blue-400">Contextual editing</span>: Modify specific component sections
✓ <span class="text-green-400">Design consistency</span>: Maintain system coherence
✓ <span class="text-orange-400">Real-time preview</span>: See changes instantly
✓ <span class="text-purple-400">Smart suggestions</span>: AI-powered improvements

<span class="text-red-400">// Editing Granularity</span>
- <span class="text-cyan-400">Layout adjustments</span>: Spacing, alignment, sizing
- <span class="text-blue-400">Color modifications</span>: Theme and accent changes
- <span class="text-green-400">Content updates</span>: Text, images, copy
- <span class="text-yellow-400">Component swaps</span>: Alternative implementations

<span class="text-orange-400">// Technical Implementation</span>
1. Identify target component/section
2. Preserve surrounding context
3. Apply focused modifications
4. Maintain design system consistency
5. Validate accessibility compliance

<span class="text-purple-400">// Industry Impact</span>
First AI system enabling granular UI editing
Transforms design iteration from regeneration to refinement`}
        explanation="QuickEdit represents a breakthrough in AI-assisted design workflows. Instead of regenerating entire components for small changes, v0 can make surgical modifications while preserving the overall design integrity, dramatically speeding up the design iteration process."
      />

      {/* Accessibility Excellence */}
      <PromptSection
        title="Comprehensive Accessibility Framework"
        type="accessibility"
        sectionId="accessibility"
        content={`<span class="text-orange-400">// WCAG 2.1 Compliance Built-In</span>
Every generated component meets <span class="text-green-400">Web Content Accessibility Guidelines</span>
ensuring <span class="text-blue-400">universal usability</span>

<span class="text-purple-400">// Accessibility Standards</span>
✓ <span class="text-cyan-400">Semantic HTML</span>: Proper element usage
✓ <span class="text-yellow-400">ARIA labels</span>: Screen reader support
✓ <span class="text-green-400">Keyboard navigation</span>: Full keyboard access
✓ <span class="text-blue-400">Color contrast</span>: WCAG AA compliance
✓ <span class="text-red-400">Focus management</span>: Clear focus indicators

<span class="text-yellow-400">// Implementation Details</span>
- <span class="text-green-400">alt attributes</span> for all images
- <span class="text-blue-400">aria-label</span> for interactive elements
- <span class="text-purple-400">role attributes</span> for complex widgets
- <span class="text-cyan-400">tabindex management</span> for custom controls
- <span class="text-orange-400">skip links</span> for navigation

<span class="text-red-400">// Responsive Accessibility</span>
- Touch targets ≥ 44px on mobile
- Readable font sizes across devices  
- High contrast mode support
- Reduced motion preferences
- Screen reader optimization

<span class="text-green-400">// Inclusive Design Principles</span>
Design for everyone, not just average users
Accessibility as core feature, not afterthought
Universal design benefits all users`}
        explanation="v0's accessibility framework ensures that every generated interface is usable by people with disabilities. This proactive approach to accessibility represents a major advancement in AI-generated code, making inclusive design the default rather than an optional add-on."
      />

      {/* Design System Intelligence */}
      <PromptSection
        title="Advanced Design System Implementation"
        type="design"
        sectionId="designsystem"
        content={`<span class="text-purple-400">// Intelligent Design Consistency</span>
v0 maintains <span class="text-green-400">design system coherence</span> across all generated components
ensuring <span class="text-blue-400">professional, cohesive interfaces</span>

<span class="text-yellow-400">// Design Token Implementation</span>
- <span class="text-cyan-400">Color palettes</span>: Consistent brand colors
- <span class="text-orange-400">Typography scales</span>: Harmonious text hierarchy  
- <span class="text-green-400">Spacing systems</span>: Rhythmic layout patterns
- <span class="text-blue-400">Border radii</span>: Consistent corner treatments
- <span class="text-purple-400">Shadow systems</span>: Depth and elevation

<span class="text-red-400">// Component Pattern Library</span>
✓ <span class="text-green-400">Buttons</span>: Primary, secondary, destructive variants
✓ <span class="text-blue-400">Forms</span>: Input, select, checkbox, radio patterns
✓ <span class="text-purple-400">Navigation</span>: Header, sidebar, breadcrumb systems
✓ <span class="text-cyan-400">Feedback</span>: Alert, toast, modal patterns
✓ <span class="text-orange-400">Data Display</span>: Card, table, list components

<span class="text-orange-400">// Responsive Design Patterns</span>
- Mobile-first breakpoint system
- Fluid typography and spacing
- Adaptive component layouts
- Touch-friendly interaction targets
- Progressive enhancement approach

<span class="text-cyan-400">// Brand Adaptability</span>
Generates components that adapt to any brand
while maintaining design excellence`}
        explanation="v0's design system intelligence goes beyond simple component generation to create cohesive design languages. By understanding the relationships between colors, typography, and spacing, it ensures every interface feels professionally designed and maintains visual consistency."
      />

      {/* Media and Content Handling */}
      <PromptSection
        title="Sophisticated Media and Content Management"
        type="media"
        sectionId="media"
        content={`<span class="text-pink-400">// Advanced Media Integration</span>
v0 handles <span class="text-green-400">images, videos, and rich content</span> with 
intelligent optimization and accessibility

<span class="text-yellow-400">// Image Handling Excellence</span>
✓ <span class="text-blue-400">Placeholder generation</span>: Contextually appropriate images
✓ <span class="text-purple-400">Responsive images</span>: Multiple breakpoint optimization
✓ <span class="text-cyan-400">Lazy loading</span>: Performance optimization
✓ <span class="text-green-400">Alt text generation</span>: Descriptive accessibility text
✓ <span class="text-orange-400">Format optimization</span>: WebP, AVIF support

<span class="text-red-400">// Content Strategy</span>
- <span class="text-green-400">Realistic placeholders</span>: Industry-appropriate content
- <span class="text-blue-400">Diverse representation</span>: Inclusive imagery
- <span class="text-purple-400">Non-controversial</span>: Safe, professional content
- <span class="text-cyan-400">Scalable text</span>: Adaptable to real content

<span class="text-orange-400">// Video and Rich Media</span>
- Accessible video players
- Transcript support
- Captions and subtitles
- Responsive embeds
- Performance-optimized loading

<span class="text-purple-400">// Content Generation Ethics</span>
- Avoid copyrighted material
- Respect intellectual property
- Generate inclusive, diverse content
- Maintain professional standards
- Consider cultural sensitivity`}
        explanation="v0's media handling demonstrates sophisticated understanding of modern web content needs. By generating appropriate placeholders, optimizing for performance, and ensuring accessibility, it creates interfaces ready for real-world content deployment."
      />

      {/* Industry Impact */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Revolutionary Impact on UI/UX Design</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-400" />
              Design Democratization
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• No design skills required for beautiful UIs</li>
              <li>• Professional-quality interfaces instantly</li>
              <li>• Design system consistency automated</li>
              <li>• Accessibility compliance built-in</li>
              <li>• Rapid prototyping and iteration</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              Development Acceleration
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• From concept to code in seconds</li>
              <li>• Production-ready components generated</li>
              <li>• Modern tech stack automatically applied</li>
              <li>• QuickEdit for rapid refinements</li>
              <li>• Eliminates frontend bottlenecks</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Industry Evolution
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Redefines designer-developer collaboration</li>
              <li>• Establishes new AI-assisted workflows</li>
              <li>• Raises quality bar for generated code</li>
              <li>• Influences next-gen design tools</li>
              <li>• Accelerates digital product development</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">v0 vs Traditional UI Development</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Traditional UI Development</h3>
            <div className="space-y-2 text-sm">
              <div className="text-red-400">✗ Manual component creation</div>
              <div className="text-red-400">✗ Design-dev handoff friction</div>
              <div className="text-red-400">✗ Inconsistent design systems</div>
              <div className="text-red-400">✗ Accessibility as afterthought</div>
              <div className="text-red-400">✗ Slow iteration cycles</div>
              <div className="text-red-400">✗ Technology fragmentation</div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">v0 AI-Powered Generation</h3>
            <div className="space-y-2 text-sm">
              <div className="text-green-400">✓ Instant component generation</div>
              <div className="text-green-400">✓ Design-to-code in one step</div>
              <div className="text-green-400">✓ Automated design consistency</div>
              <div className="text-green-400">✓ Accessibility built-in by default</div>
              <div className="text-green-400">✓ Real-time QuickEdit refinements</div>
              <div className="text-green-400">✓ Modern stack standardization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">UI Generation Revolution & Future Impact</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Design Democratization:</strong> v0 makes professional UI design accessible to anyone, eliminating the barrier between design vision and implementation through AI-powered generation.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>QuickEdit Innovation:</strong> Revolutionary real-time editing system enables surgical modifications without full regeneration, transforming design iteration from slow cycles to instant refinements.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Accessibility Excellence:</strong> First AI system to make WCAG compliance the default for generated code, ensuring inclusive design becomes effortless rather than an afterthought.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Production Ready:</strong> Generated components use modern web standards (Next.js, TypeScript, Tailwind) and can be deployed immediately without modification, setting new quality standards for AI-generated code.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts/blob/main/v0_20250306.md" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}