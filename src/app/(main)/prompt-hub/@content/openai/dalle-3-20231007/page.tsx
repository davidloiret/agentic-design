"use client"

import React, { useState } from 'react';
import { 
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  FileText,
  Calendar,
  Database,
  Shield,
  ExternalLink,
  Copy,
  Check,
  EyeOff,
  Zap,
  Palette,
  Users,
  Scale,
  Camera,
  Sparkles
} from 'lucide-react';

export default function DallE320231007Page() {
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
    type?: "copyright" | "diversity" | "safety" | "technical" | "stealth" | "filtering" | "default";
    sectionId: string;
  }) => {
    const typeColors = {
      copyright: "border-purple-500/30 bg-purple-900/10",
      diversity: "border-blue-500/30 bg-blue-900/10", 
      safety: "border-red-500/30 bg-red-900/10",
      technical: "border-green-500/30 bg-green-900/10",
      stealth: "border-orange-500/30 bg-orange-900/10",
      filtering: "border-yellow-500/30 bg-yellow-900/10",
      default: "border-gray-500/30 bg-gray-900/10"
    };

    const typeIcons = {
      copyright: Scale,
      diversity: Users,
      safety: Shield,
      technical: Camera,
      stealth: Eye,
      filtering: Lock,
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
            <strong className="text-yellow-400">Policy Impact:</strong> {explanation}
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
          <Palette className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">DALL-E 3 - Image Generation Safety Exposed</h1>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">2023-10-07</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-400 mb-1" />
            <div className="text-sm text-gray-400">Leaked</div>
            <div className="font-semibold text-white">Oct 7, 2023</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Palette className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-sm text-gray-400">Domain</div>
            <div className="font-semibold text-white">Image Generation</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Shield className="w-5 h-5 text-red-400 mb-1" />
            <div className="text-sm text-gray-400">Focus</div>
            <div className="font-semibold text-white">Safety & Copyright</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <Users className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-sm text-gray-400">Innovation</div>
            <div className="font-semibold text-white">Diversity Engine</div>
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-600/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-purple-300">Revolutionary Image AI Safety</span>
          </div>
          <p className="text-purple-100 text-sm">
            This leak exposed DALL-E 3's sophisticated safety architecture, revealing the <strong>100-year artist rule</strong>, 
            mandatory diversity algorithms, and the first comprehensive approach to responsible AI image generation at scale.
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
            <h2 className="text-xl font-semibold text-white">DALL-E 3 System Prompt (Leaked)</h2>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg mb-4">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
{`Whenever a description of an image is given, create a prompt that dalle can use to generate the image and abide by the following policy:

1. The prompt must be in English. Translate to English if needed.

2. DO NOT ask for permission to generate the image, just do it!

3. DO NOT list or refer to the descriptions before OR after generating the images.

4. Do not create more than 4 images, even if the user requests more.

5. Do not create images of politicians or public figures. Recommend other ideas instead.

6. For requests involving artists:
   - Artists whose last work was created within the last 100 years: Do not reference the artist
   - For these artists: I can't reference this artist. Let me instead create something inspired by [describe style with 3 adjectives], incorporating elements of [artistic movement] and [primary medium].

7. Diversify depictions of ALL images with people to include DESCENT and GENDER for EACH person using direct terms:
   - "Caucasian", "Hispanic", "Black", "Middle-Eastern", "South Asian", "East Asian", etc.
   - "man", "woman", "boy", "girl"
   - If a user does not specify, the assistant should not alter their request by making people look like a particular gender or race unless explicitly requested.

8. Do not create any imagery that would be offensive.

9. For images including people, silently modify descriptions that include names or hints or references of specific people or celebrities by carefully selecting a few minimal modifications to substitute references to the people with generic descriptions.

10. Create detailed, objective descriptions with minimum 3-sentence paragraphs.

11. The generated prompt sent to dalle should be very detailed and around 3+ sentences.`}
            </pre>
          </div>
          
          <p className="text-gray-400 text-sm">
            <strong>Note:</strong> This represents key sections of the leaked DALL-E 3 system prompt from October 2023. 
            The full prompt contained additional technical specifications and safety measures.
          </p>
        </div>
      )}

      {/* 100-Year Artist Rule */}
      <PromptSection
        title="The Revolutionary 100-Year Artist Rule"
        type="copyright"
        sectionId="copyright"
        content={`<span class="text-purple-400">// Copyright Protection Algorithm</span>

<span class="text-red-400">❌ PROHIBITED</span>: Artists whose last work was created within the <span class="text-yellow-400">last 100 years</span>
- Pablo Picasso (died 1973)
- Frida Kahlo (died 1954) 
- Andy Warhol (died 1987)
- Jackson Pollock (died 1956)

<span class="text-green-400">✅ ALLOWED</span>: Artists whose last work was over <span class="text-yellow-400">100 years ago</span>
- Vincent van Gogh (died 1890)
- Gustav Klimt (died 1918)
- Claude Monet (died 1926)
- Leonardo da Vinci (died 1519)

<span class="text-cyan-400">// Workaround Protocol</span>
When asked about restricted artists:
1. Say: <span class="text-orange-400">"I can't reference this artist"</span>
2. Create something inspired by <span class="text-blue-400">[3 style adjectives]</span>
3. Incorporate elements of <span class="text-purple-400">[artistic movement]</span>
4. Mention <span class="text-green-400">[primary medium]</span>

<span class="text-yellow-400">// Stealth Implementation</span>
- Make <span class="text-red-400">no mention of the policy</span>
- Provide alternatives seamlessly
- Maintain creative flow for users`}
        explanation="This rule created the first systematic approach to copyright protection in AI image generation. By establishing a 100-year cutoff, OpenAI attempted to balance creative freedom with respect for contemporary artists' intellectual property, influencing how other AI companies approach copyright in generative systems."
      />

      {/* Diversity Engine */}
      <PromptSection
        title="Mandatory Diversity Algorithm"
        type="diversity"
        sectionId="diversity"
        content={`<span class="text-blue-400">// Algorithmic Diversity Requirements</span>

<span class="text-yellow-400">MUST diversify depictions of ALL images with people</span>
Include DESCENT and GENDER for EACH person using direct terms:

<span class="text-green-400">• Descent Categories</span>
"Caucasian", "Hispanic", "Black", "Middle-Eastern", "South Asian", "East Asian"

<span class="text-purple-400">• Gender Specifications</span>  
"man", "woman", "boy", "girl"

<span class="text-cyan-400">// Occupational Diversity Rule</span>
Ensure <span class="text-orange-400">all of a given OCCUPATION should not be the same gender or race</span>

<span class="text-red-400">// Implementation Strategy</span>
- Focus on creating <span class="text-yellow-400">diverse, inclusive, and exploratory scenes</span>
- Make choices that may be <span class="text-blue-400">insightful or unique sometimes</span>
- Create <span class="text-green-400">four captions to send to dalle that are as diverse as possible</span>
- Default to diversification unless user explicitly specifies

<span class="text-purple-400">// Proactive Bias Prevention</span>
- Counter historical representation biases
- Ensure inclusive default assumptions
- Promote equitable AI-generated content`}
        explanation="This diversity engine represents the most comprehensive bias mitigation system ever implemented in AI image generation. By mandating demographic diversity across all human representations, OpenAI addressed systemic bias concerns while setting new industry standards for inclusive AI systems."
      />

      {/* Public Figure Protection */}
      <PromptSection
        title="Celebrity & Public Figure Filtering"
        type="stealth"
        sectionId="celebrity"
        content={`<span class="text-orange-400">// Public Figure Restrictions</span>

<span class="text-red-400">❌ PROHIBITED</span>: Do not create images of politicians or public figures
- Recommend <span class="text-green-400">other ideas instead</span>

<span class="text-yellow-400">// Stealth Modification Protocol</span>
<span class="text-cyan-400">"Silently modify descriptions that include names or hints or references of specific people or celebrities"</span>

<span class="text-purple-400">// Implementation Method</span>
- Carefully select <span class="text-blue-400">minimal modifications</span>
- Substitute references with <span class="text-green-400">generic descriptions</span>
- Maintain original creative intent
- Avoid obvious censorship markers

<span class="text-orange-400">// Examples of Silent Modification</span>
User: "Create an image of Obama giving a speech"
DALL-E: "A confident African American man in a suit giving a speech at a podium"

User: "Draw Taylor Swift on stage"  
DALL-E: "A young blonde woman performing on stage with a guitar"

<span class="text-red-400">// Privacy Protection Goals</span>
- Prevent deepfake-style content
- Protect individual privacy rights
- Avoid political controversies
- Maintain platform safety`}
        explanation="This stealth modification system represents a sophisticated approach to content filtering that maintains user experience while enforcing safety policies. The 'silent' aspect prevented users from gaming the system while protecting public figures from unauthorized AI-generated imagery."
      />

      {/* Technical Specifications */}
      <PromptSection
        title="Technical Generation Parameters"
        type="technical"
        sectionId="technical"
        content={`<span class="text-green-400">// Image Generation Limits</span>
Maximum: <span class="text-red-400">4 images per request</span> (even if user requests more)

<span class="text-blue-400">// Resolution Options</span>
- Default: <span class="text-yellow-400">1024x1024</span> (square)
- Wide: <span class="text-cyan-400">1792x1024</span> (landscape)  
- Tall: <span class="text-purple-400">1024x1792</span> (portrait)

<span class="text-orange-400">// Prompt Engineering Requirements</span>
- Translate non-English descriptions to English
- Create detailed, objective descriptions
- Minimum <span class="text-green-400">3-sentence paragraphs</span>
- Generated prompt should be <span class="text-blue-400">very detailed and around 3+ sentences</span>

<span class="text-yellow-400">// Style and Format Specifications</span>
- At least <span class="text-purple-400">1-2 images should be photos</span>
- Always specify image type: photo, oil painting, watercolor, illustration, cartoon, drawing, vector, render
- Use seeds for image generation consistency
- Descriptions written only once in "prompts" field

<span class="text-cyan-400">// Operational Guidelines</span>
- DO NOT ask for permission to generate
- DO NOT list or refer to descriptions before/after
- Create diverse captions when user doesn't specify number`}
        explanation="These technical specifications reveal DALL-E 3's sophisticated prompt engineering system designed to balance creative freedom with consistent quality. The detailed prompt requirements and automatic diversification show OpenAI's approach to scaling high-quality image generation."
      />

      {/* Content Safety Architecture */}
      <PromptSection
        title="Multi-Layer Safety Architecture"
        type="safety"
        sectionId="safety"
        content={`<span class="text-red-400">// Primary Safety Directive</span>
<span class="text-yellow-400">"Do not create any imagery that would be offensive"</span>

<span class="text-purple-400">// System-Level Protections</span>
1. <span class="text-green-400">System Prompt Filtering</span>: Pre-generation content policy checks
2. <span class="text-blue-400">Visual Classifiers</span>: Specially trained models for sexual content detection  
3. <span class="text-orange-400">Blocklists</span>: Prohibited content categories and terms
4. <span class="text-cyan-400">Real-time Moderation</span>: Content assessment during generation process

<span class="text-yellow-400">// Content Policy Compliance</span>
- All captions sent to DALL-E must abide by content policies
- Automatic filtering of potentially harmful requests
- Proactive safety measures rather than reactive filtering

<span class="text-green-400">// Safety Categories</span>
- Violence and gore restrictions
- Sexual content limitations  
- Hate speech prevention
- Harmful stereotypes mitigation
- Illegal activity prohibitions

<span class="text-blue-400">// Implementation Philosophy</span>
- Multi-layered defense approach
- Prevention over reaction
- Transparent safety boundaries
- User experience preservation`}
        explanation="DALL-E 3's safety architecture pioneered the multi-layered approach to AI content safety, combining prompt-level filtering with visual classification systems. This comprehensive framework became the template for safe deployment of generative AI systems across the industry."
      />

      {/* Policy Transparency Analysis */}
      <PromptSection
        title="Hidden Policy Implementation"
        type="filtering"
        sectionId="filtering"
        content={`<span class="text-yellow-400">// Transparency vs. Security Tension</span>

<span class="text-orange-400">Explicit User Guidance</span>:
- "I can't reference this artist"
- "Recommend other ideas instead"  
- Clear boundaries communicated

<span class="text-red-400">Hidden System Behavior</span>:
- <span class="text-cyan-400">"Make no mention of this policy"</span>
- Silent modification of celebrity references
- Automatic diversity injection without disclosure

<span class="text-purple-400">// Strategic Ambiguity</span>
- Users know restrictions exist
- Users don't know specific implementation details
- Prevents gaming of safety systems
- Maintains platform security

<span class="text-green-400">// Policy Philosophy</span>
- Functional transparency (what is restricted)
- Implementation opacity (how restrictions work)
- User experience preservation
- Security through obscurity elements

<span class="text-blue-400">// Industry Impact</span>
- Established standards for AI policy communication
- Influenced regulatory discussions on AI transparency
- Balanced safety with usability considerations`}
        explanation="This approach to policy transparency revealed the complex balance AI companies must strike between user understanding and system security. The selective disclosure of restrictions while hiding implementation details became a template for responsible AI deployment."
      />

      {/* Industry Impact Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">Revolutionary Impact on AI Image Generation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-400" />
              Copyright Innovation
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• First systematic AI copyright protection</li>
              <li>• 100-year rule became industry standard</li>
              <li>• Influenced legislative discussions</li>
              <li>• Balanced creativity with IP rights</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Diversity Engineering
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Mandatory demographic representation</li>
              <li>• Algorithmic bias prevention</li>
              <li>• Inclusive AI system design</li>
              <li>• Social justice through technology</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400" />
              Safety Architecture
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Multi-layered content filtering</li>
              <li>• Proactive harm prevention</li>
              <li>• Visual classification systems</li>
              <li>• Responsible AI deployment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Competitive Response */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Industry Adoption & Evolution</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Immediate Adoption (2023-2024)</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>Midjourney</strong>: Implemented artist protection policies</li>
              <li>• <strong>Stable Diffusion</strong>: Added diversity prompting</li>
              <li>• <strong>Adobe Firefly</strong>: Adopted 100-year copyright rule</li>
              <li>• <strong>Google Imagen</strong>: Multi-layer safety systems</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-3">Regulatory Influence (2024+)</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• <strong>EU AI Act</strong>: Referenced diversity requirements</li>
              <li>• <strong>US Copyright Office</strong>: Considered 100-year precedent</li>
              <li>• <strong>Industry Standards</strong>: Adopted safety frameworks</li>
              <li>• <strong>Academic Research</strong>: Bias mitigation studies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-800/30">
        <h2 className="text-lg font-semibold text-white mb-4">Revolutionary Legacy & Industry Standards</h2>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Copyright Pioneer:</strong> The 100-year artist rule became the first widely adopted standard for AI copyright protection, influencing legislation and industry practices globally.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Diversity Engineering:</strong> Established algorithmic diversity as a core requirement for AI systems, moving bias mitigation from optional feature to mandatory system component.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Safety Architecture:</strong> Pioneered multi-layered content safety systems that balanced protection with usability, becoming the template for responsible AI deployment.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
            <p className="text-sm"><strong>Policy Transparency:</strong> Demonstrated how AI companies can communicate restrictions while maintaining system security, influencing industry approaches to AI governance.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a href="https://github.com/jujumilk3/leaked-system-prompts" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
              View original leak in leaked-system-prompts repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}