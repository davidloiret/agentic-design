'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle, Zap, GitBranch } from 'lucide-react';

interface ParallelChain {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  progress: number;
  input?: string;
  output?: string;
  processingTime?: number;
  startTime?: Date;
  completionTime?: Date;
  color: string;
}

interface ParallelScenario {
  id: string;
  name: string;
  description: string;
  initialInput: string;
  chains: ParallelChain[];
}

const SCENARIOS: ParallelScenario[] = [
  {
    id: 'market-analysis',
    name: 'Market Analysis Research',
    description: 'Comprehensive market research through parallel analysis chains',
    initialInput: 'Conduct comprehensive market analysis for our new AI-powered productivity assistant targeting enterprise customers',
    chains: [
      {
        id: 'competitor',
        title: 'Competitor Analysis',
        description: 'Analyze market competitors and positioning',
        status: 'pending',
        progress: 0,
        color: 'bg-green-500'
      },
      {
        id: 'demographics',
        title: 'Target Demographics',
        description: 'Identify and profile target user segments',
        status: 'pending',
        progress: 0,
        color: 'bg-blue-500'
      },
      {
        id: 'trends',
        title: 'Market Trends',
        description: 'Analyze industry trends and growth patterns',
        status: 'pending',
        progress: 0,
        color: 'bg-purple-500'
      },
      {
        id: 'regulatory',
        title: 'Regulatory Compliance',
        description: 'Review compliance requirements and regulations',
        status: 'pending',
        progress: 0,
        color: 'bg-red-500'
      }
    ]
  },
  {
    id: 'content-creation',
    name: 'Multi-Channel Content Creation',
    description: 'Create content for different platforms simultaneously',
    initialInput: 'Create a comprehensive content campaign for our new sustainable fashion brand launch',
    chains: [
      {
        id: 'social-media',
        title: 'Social Media Content',
        description: 'Instagram, TikTok, and Twitter content creation',
        status: 'pending',
        progress: 0,
        color: 'bg-pink-500'
      },
      {
        id: 'blog-articles',
        title: 'Blog Articles',
        description: 'Long-form educational and promotional content',
        status: 'pending',
        progress: 0,
        color: 'bg-indigo-500'
      },
      {
        id: 'email-campaign',
        title: 'Email Campaign',
        description: 'Newsletter and promotional email sequences',
        status: 'pending',
        progress: 0,
        color: 'bg-yellow-500'
      },
      {
        id: 'press-release',
        title: 'Press Release',
        description: 'Media outreach and press announcement',
        status: 'pending',
        progress: 0,
        color: 'bg-teal-500'
      }
    ]
  },
  {
    id: 'product-development',
    name: 'Product Development Analysis',
    description: 'Multi-faceted product development research and planning',
    initialInput: 'Develop comprehensive product strategy for AI-powered personal health monitoring device',
    chains: [
      {
        id: 'technical-feasibility',
        title: 'Technical Feasibility',
        description: 'Assess technical requirements and constraints',
        status: 'pending',
        progress: 0,
        color: 'bg-cyan-500'
      },
      {
        id: 'user-research',
        title: 'User Research',
        description: 'Conduct user interviews and needs analysis',
        status: 'pending',
        progress: 0,
        color: 'bg-orange-500'
      },
      {
        id: 'financial-modeling',
        title: 'Financial Modeling',
        description: 'Cost analysis and revenue projections',
        status: 'pending',
        progress: 0,
        color: 'bg-emerald-500'
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment',
        description: 'Identify and evaluate potential risks',
        status: 'pending',
        progress: 0,
        color: 'bg-violet-500'
      }
    ]
  }
];

const generateChainOutput = (chain: ParallelChain, scenario: string): string => {
  const outputs: { [key: string]: { [chainId: string]: string } } = {
    'market-analysis': {
      'competitor': 'Competitor Analysis Results:\n\n**Major Players:**\n• OpenAI (ChatGPT): $80B valuation, 100M+ users, consumer focus\n• Microsoft (Copilot): Integrated across Office suite, $30/user/month\n• Google (Gemini): Search integration advantage, enterprise growing\n• Anthropic (Claude): Safety-focused, strong reasoning capabilities\n\n**Market Gaps Identified:**\n• Industry-specific workflow integration\n• Advanced privacy controls for enterprise\n• Seamless integration beyond basic chat interfaces\n\n**Competitive Pricing:**\n• Consumer tier: $20/month standard\n• Enterprise: $25-30/user/month\n• API costs: $0.01-0.06 per 1K tokens\n\n**Key Differentiators:**\n• Focus on enterprise workflow automation\n• Industry-specific knowledge bases\n• Superior on-premise deployment options',
      'demographics': 'Target Demographics Analysis:\n\n**Primary User Segments:**\n• Software Developers (40%): Code completion, debugging assistance\n• Business Analysts (25%): Data analysis, automated reporting\n• Content Creators (20%): Writing, editing, creative assistance\n• Executives (15%): Decision support, meeting summarization\n\n**Geographic Distribution:**\n• North America: 45% (high willingness to pay)\n• Europe: 30% (strong privacy requirements)\n• Asia-Pacific: 20% (rapidly growing market)\n• Other regions: 5%\n\n**Company Size Preferences:**\n• Enterprise (1000+ employees): 60% of revenue potential\n• Mid-market (100-999 employees): 30%\n• Small business (<100 employees): 10%\n\n**Key Insights:**\n• Developers willing to pay $30-50/month for quality tools\n• Privacy concerns are top barrier for European adoption\n• Integration capabilities more important than raw AI performance',
      'trends': 'Market Trends Analysis:\n\n**Growth Metrics:**\n• AI productivity tools market: +300% YoY growth\n• Enterprise AI adoption: 78% (up from 35% last year)\n• Remote work tools demand: Sustained high post-pandemic\n\n**Emerging Technology Trends:**\n• Multi-modal interfaces (text + voice + visual)\n• Real-time collaborative AI assistance\n• Industry-specific AI agents and workflows\n• Privacy-first AI solutions with local deployment\n\n**Market Dynamics:**\n• Shift from general AI to specialized business tools\n• Increasing demand for AI explainability and transparency\n• Integration with existing enterprise systems critical\n\n**Investment Landscape:**\n• $50B+ invested in AI productivity tools (2024)\n• Average Series A: $25M for AI productivity startups\n• 67% of enterprises planning AI tool procurement in next 12 months\n\n**Future Projections:**\n• Market expected to reach $45B by 2027\n• Enterprise segment will dominate (80% of total market)\n• On-premise solutions growing 400% faster than cloud-only',
      'regulatory': 'Regulatory Compliance Analysis:\n\n**Key Regulatory Frameworks:**\n• GDPR (Europe): Data protection, right to explanation for AI decisions\n• CCPA (California): Consumer privacy rights, data usage transparency\n• EU AI Act: High-risk AI system requirements, conformity assessments\n• SOC 2 Type II: Enterprise security standards for data handling\n\n**Data Handling Requirements:**\n• Data residency: 73% of enterprises require local data storage\n• Audit trails: Mandatory for financial and healthcare sectors\n• Encryption: End-to-end encryption becoming standard expectation\n• Data retention: Clear policies needed for training data usage\n\n**AI-Specific Compliance:**\n• Algorithmic transparency requirements increasing\n• Human oversight mandates for high-stakes decisions\n• Bias testing and mitigation documentation required\n• Error correction and appeal processes must be available\n\n**Compliance Costs:**\n• Initial compliance setup: $200K-500K\n• Annual compliance management: $50K-150K\n• Risk of non-compliance: Fines up to $10M+ (4% of global revenue)\n\n**Recommendations:**\n• Implement privacy-by-design architecture from day one\n• Establish clear data governance and audit capabilities\n• Budget 15-20% of development costs for compliance\n• Consider compliance as competitive advantage in enterprise sales'
    },
    'content-creation': {
      'social-media': 'Social Media Content Package:\n\n**Instagram Content:**\n• 15 feed posts showcasing sustainable fashion pieces\n• 30 story templates highlighting eco-friendly materials\n• 5 Reels scripts focusing on behind-the-scenes sustainability\n• IGTV series: "Sustainable Style Journey" (5 episodes)\n\n**TikTok Content:**\n• 20 short videos demonstrating styling versatility\n• Educational series on fashion sustainability (10 videos)\n• Trend-based content adapting popular formats for brand message\n• User-generated content campaign hashtags and prompts\n\n**Twitter/X Strategy:**\n• Daily tweets sharing sustainability tips and facts\n• Thread series on fashion industry impact\n• Real-time engagement with sustainability conversations\n• Partnership tweets with eco-conscious influencers\n\n**Content Calendar:**\n• Week 1-2: Brand introduction and values\n• Week 3-4: Product showcases and styling\n• Week 5-6: Educational sustainability content\n• Week 7-8: Community engagement and user-generated content\n\n**Engagement Tactics:**\n• Interactive polls about sustainable fashion choices\n• Before/after styling challenges\n• Sustainable wardrobe audit tutorials\n• Collaboration opportunities with eco-influencers',
      'blog-articles': 'Blog Content Strategy:\n\n**Educational Articles (8 pieces):**\n1. "The True Cost of Fast Fashion: Environmental and Social Impact"\n2. "Building a Sustainable Capsule Wardrobe: A Step-by-Step Guide"\n3. "Sustainable Fabrics Guide: What to Look for When Shopping"\n4. "From Farm to Fashion: Our Supply Chain Transparency Report"\n5. "Caring for Your Clothes: Extending Garment Lifespan"\n6. "Sustainable Fashion on a Budget: Tips and Tricks"\n7. "The Future of Fashion: Innovations in Sustainable Materials"\n8. "Circular Fashion: Understanding the Lifecycle of Clothing"\n\n**Brand Story Content (4 pieces):**\n1. "Our Journey: From Idea to Sustainable Fashion Brand"\n2. "Meet Our Artisans: The People Behind Your Clothes"\n3. "Transparency Report: Our First Year Impact Metrics"\n4. "Looking Forward: Our 2025 Sustainability Goals"\n\n**SEO Strategy:**\n• Target keywords: sustainable fashion, eco-friendly clothing, ethical fashion\n• Long-tail keywords: best sustainable clothing brands, eco-friendly fabric guide\n• Local SEO: sustainable fashion + [city] for flagship locations\n\n**Content Distribution:**\n• Weekly blog posts on company website\n• Guest posting on sustainability and fashion blogs\n• LinkedIn articles for B2B audience\n• Medium publication for broader reach',
      'email-campaign': 'Email Marketing Campaign:\n\n**Welcome Series (5 emails):**\n1. Welcome & Brand Story Introduction\n2. Sustainability Education: Why It Matters\n3. Product Showcase: Our Signature Pieces\n4. Styling Guide: Versatile Sustainable Fashion\n5. Community Invitation: Join the Movement\n\n**Weekly Newsletter Content:**\n• Sustainability tip of the week\n• Featured product with styling suggestions\n• Customer spotlight and stories\n• Industry news and sustainable fashion trends\n• Behind-the-scenes content from production\n\n**Promotional Campaigns:**\n• Launch week: 20% off first purchase\n• Earth Day special: Plant a tree with every order\n• Back-to-school: Professional sustainable wardrobe\n• Holiday season: Sustainable gift guides\n\n**Segmentation Strategy:**\n• New subscribers: Educational focus\n• Repeat customers: Exclusive previews and loyalty rewards\n• High-value customers: Personal styling consultations\n• Engaged subscribers: Community events and partnerships\n\n**Performance Metrics:**\n• Target open rate: 25-30%\n• Click-through rate: 3-5%\n• Conversion rate: 2-4%\n• List growth: 15% monthly increase\n\n**Automation Workflows:**\n• Abandoned cart recovery sequence\n• Post-purchase care and styling tips\n• Re-engagement campaign for inactive subscribers\n• Birthday and anniversary special offers',
      'press-release': 'Press Release Strategy:\n\n**Primary Press Release:**\n**FOR IMMEDIATE RELEASE**\n\n**Revolutionary Sustainable Fashion Brand Launches with Zero-Waste Production Model**\n\n*New company introduces innovative circular fashion approach, partnering with regenerative farms and carbon-negative production facilities*\n\n[City, Date] – [Brand Name], a groundbreaking sustainable fashion company, today announced its official launch with a revolutionary zero-waste production model that transforms agricultural waste into high-quality, fashionable clothing. The company\'s innovative approach addresses the fashion industry\'s environmental crisis while delivering premium garments for conscious consumers.\n\n**Key Announcements:**\n• Partnership with 50+ regenerative farms for material sourcing\n• Carbon-negative production process removes 2kg CO2 per garment\n• Living wage guarantee for all workers in supply chain\n• B-Corp certification achieved prior to launch\n• $2M seed funding from impact investors\n\n**Media Kit Contents:**\n• High-resolution product photography\n• Founder interview videos and biography\n• Sustainability impact infographics\n• Supply chain transparency documentation\n• Customer testimonials and case studies\n\n**Target Media Outlets:**\n• Fashion publications: Vogue, Elle, Harper\'s Bazaar\n• Sustainability media: Eco-Age, Sustainable Brands, GreenBiz\n• Business publications: Fast Company, Inc., Entrepreneur\n• Local media: City business journals and lifestyle magazines\n\n**Press Tour Schedule:**\n• Week 1: Fashion and sustainability podcast interviews\n• Week 2: Local media appearances and store opening events\n• Week 3: Industry conference presentations\n• Week 4: Follow-up interviews and feature story development\n\n**Media Contact Information:**\n• Press contact details and media inquiry process\n• Sample availability for fashion editors\n• Interview scheduling and availability\n• Social media press kit for online coverage'
    },
    'product-development': {
      'technical-feasibility': 'Technical Feasibility Assessment:\n\n**Core Technology Requirements:**\n• Multi-sensor integration: Heart rate, blood oxygen, sleep patterns, activity tracking\n• AI/ML processing: Local edge computing for real-time health insights\n• Connectivity: Bluetooth 5.0+, WiFi, optional cellular for standalone operation\n• Battery life: 7+ days typical usage, 2+ days with continuous monitoring\n• Water resistance: IPX8 rating for swimming and showering\n\n**Hardware Specifications:**\n• Processor: Custom ARM Cortex-M4 with AI acceleration\n• Memory: 512MB RAM, 4GB storage for health data and ML models\n• Sensors: PPG, ECG, accelerometer, gyroscope, ambient light, skin temperature\n• Display: 1.4" OLED, 400x400 resolution, always-on capability\n• Charging: Wireless charging with proprietary dock\n\n**Software Architecture:**\n• Embedded RTOS for real-time sensor processing\n• TensorFlow Lite for on-device ML inference\n• Secure health data storage with end-to-end encryption\n• Cloud sync for backup and advanced analytics\n• Mobile app integration (iOS/Android)\n\n**Development Challenges:**\n• Miniaturization of multiple sensors while maintaining accuracy\n• Power optimization for extended battery life\n• FDA/CE medical device approval process (12-18 months)\n• Integration testing with diverse physiological conditions\n\n**Technology Readiness:**\n• Sensor technology: TRL 8 (commercially available)\n• AI/ML algorithms: TRL 6 (prototype demonstrated)\n• Integration platform: TRL 5 (lab-scale validation)\n• Manufacturing process: TRL 7 (pilot production ready)\n\n**Estimated Timeline:**\n• Prototype development: 6 months\n• Clinical validation: 12 months\n• Regulatory approval: 18 months\n• Manufacturing ramp: 6 months\n• Total to market: 30 months',
      'user-research': 'User Research Findings:\n\n**Primary Research Methods:**\n• 45 in-depth interviews with target users\n• 300+ survey responses from health-conscious consumers\n• 12 focus groups across different demographics\n• Competitive analysis of existing health monitoring devices\n• Ethnographic studies of daily health monitoring behaviors\n\n**Key User Personas:**\n1. **Health Enthusiast Sarah (35%):** Active professionals tracking fitness goals\n2. **Chronic Condition Manager Mike (25%):** Users monitoring specific health conditions\n3. **Wellness Beginner Lisa (20%):** New to health monitoring, wants guidance\n4. **Senior Health Guardian Robert (20%):** Older adults or caregivers monitoring aging-related health\n\n**Core User Needs:**\n• Accurate, continuous health monitoring without disruption\n• Actionable insights and personalized recommendations\n• Early warning system for potential health issues\n• Integration with healthcare providers and family members\n• Simple, intuitive interface requiring minimal learning\n\n**Pain Points with Current Solutions:**\n• Inconsistent accuracy across different devices\n• Data fragmentation across multiple apps and devices\n• Lack of actionable insights from collected data\n• Privacy concerns about health data sharing\n• Device discomfort during sleep and exercise\n\n**Feature Prioritization:**\n**Must-Have Features:**\n• Heart rate monitoring (100% of users)\n• Sleep quality tracking (92% of users)\n• Activity and exercise tracking (89% of users)\n• Smartphone notifications (85% of users)\n\n**Nice-to-Have Features:**\n• Blood oxygen monitoring (78% of users)\n• Stress level detection (65% of users)\n• ECG functionality (45% of users)\n• Blood pressure estimation (40% of users)\n\n**Usage Patterns:**\n• Primary wearing time: 16+ hours daily (including sleep)\n• Data checking frequency: 3-5 times per day\n• App engagement: 2-3 sessions daily, 2-4 minutes each\n• Preferred notification types: Gentle vibrations, minimal sound\n\n**Pricing Sensitivity:**\n• Acceptable price range: $200-400 for device\n• Monthly subscription willingness: $5-15 for premium features\n• Insurance coverage expectation: 60% expect partial coverage',
      'financial-modeling': 'Financial Model & Projections:\n\n**Revenue Model:**\n• Hardware sales: $299 device price (65% of revenue)\n• Subscription services: $9.99/month premium features (25% of revenue)\n• Healthcare partnerships: B2B licensing and integration (10% of revenue)\n\n**5-Year Financial Projections:**\n\n**Year 1:**\n• Units sold: 15,000\n• Revenue: $4.5M ($4.5M hardware, $0.5M subscriptions)\n• Gross margin: 35% (hardware), 85% (subscriptions)\n• Net loss: ($8.2M) - heavy R&D and marketing investment\n\n**Year 2:**\n• Units sold: 50,000\n• Revenue: $16.8M ($14.9M hardware, $1.9M subscriptions)\n• Gross margin: 42% (improved manufacturing scale)\n• Net loss: ($2.1M) - approaching profitability\n\n**Year 3:**\n• Units sold: 120,000\n• Revenue: $42.3M ($35.9M hardware, $6.4M subscriptions)\n• Gross margin: 48%\n• Net profit: $3.2M - first profitable year\n\n**Year 4:**\n• Units sold: 250,000\n• Revenue: $89.7M ($74.8M hardware, $14.9M subscriptions)\n• Gross margin: 52%\n• Net profit: $12.4M\n\n**Year 5:**\n• Units sold: 400,000\n• Revenue: $147.2M ($119.6M hardware, $27.6M subscriptions)\n• Gross margin: 55%\n• Net profit: $25.8M\n\n**Cost Structure:**\n• Cost of goods sold: 45-55% of hardware revenue\n• R&D expenses: 15-20% of total revenue\n• Sales & marketing: 25-30% of total revenue\n• General & administrative: 8-12% of total revenue\n\n**Funding Requirements:**\n• Seed round (completed): $2M\n• Series A (Year 1): $15M for product development and initial marketing\n• Series B (Year 2): $35M for scaling manufacturing and market expansion\n• Total funding needed: $50M through profitability\n\n**Key Financial Metrics:**\n• Customer acquisition cost: $75 (Year 1) → $35 (Year 5)\n• Customer lifetime value: $420 (device + 2 years subscription)\n• LTV/CAC ratio: 5.6:1 (target: >3:1)\n• Monthly churn rate: 3.5% (subscription services)\n• Gross margin improvement: Manufacturing scale and subscription growth',
      'risk-assessment': 'Risk Assessment & Mitigation:\n\n**TECHNICAL RISKS (High Impact, Medium Probability)**\n\n**Risk 1: Regulatory Approval Delays**\n• Impact: 6-12 month market delay, $5-10M additional costs\n• Mitigation: Early FDA pre-submission, regulatory consulting, phased approval strategy\n• Contingency: Launch with wellness-focused features first, add medical features post-approval\n\n**Risk 2: Battery Technology Limitations**\n• Impact: Reduced user satisfaction, competitive disadvantage\n• Mitigation: Multiple battery technology partnerships, power optimization algorithms\n• Contingency: Rapid charging capability, battery replacement program\n\n**Risk 3: Sensor Accuracy Issues**\n• Impact: Clinical validation failure, regulatory rejection\n• Mitigation: Extensive testing protocols, clinical partnerships, sensor redundancy\n• Contingency: Focus on relative trends vs absolute accuracy, clear user communication\n\n**MARKET RISKS (Medium Impact, Medium Probability)**\n\n**Risk 4: Competitive Response**\n• Impact: Market share erosion, pricing pressure\n• Mitigation: Patent protection, unique value proposition, rapid iteration\n• Contingency: Pivot to B2B healthcare market, partnership opportunities\n\n**Risk 5: Consumer Adoption Slower Than Expected**\n• Impact: Revenue shortfall, extended runway needed\n• Mitigation: Comprehensive user research, pilot programs, iterative design\n• Contingency: Adjust pricing strategy, focus on niche markets first\n\n**OPERATIONAL RISKS (Medium Impact, Low Probability)**\n\n**Risk 6: Manufacturing Quality Issues**\n• Impact: Product recalls, brand damage, regulatory issues\n• Mitigation: Multiple supplier relationships, quality control systems, insurance coverage\n• Contingency: Recall procedures, customer communication plan, warranty program\n\n**Risk 7: Data Privacy Breach**\n• Impact: Legal liability, user trust loss, regulatory penalties\n• Mitigation: Security-by-design, regular audits, cyber insurance, compliance frameworks\n• Contingency: Incident response plan, user notification systems, legal support\n\n**FINANCIAL RISKS (High Impact, Low Probability)**\n\n**Risk 8: Funding Shortfall**\n• Impact: Development delays, team reduction, feature cuts\n• Mitigation: Multiple funding sources, milestone-based funding, revenue diversification\n• Contingency: Extended runway through cost reduction, strategic partnerships\n\n**Overall Risk Management Strategy:**\n• Monthly risk assessment reviews\n• Contingency planning for top 5 risks\n• Insurance coverage for key operational risks\n• Diverse advisory board for strategic guidance\n• Regular scenario planning and stress testing'
    }
  };

  const scenarioOutputs = outputs[scenario] || outputs['market-analysis'];
  return scenarioOutputs[chain.id] || `Analysis completed for ${chain.title}.\n\nDetailed ${chain.description.toLowerCase()} results generated.`;
};

export const ParallelChainingDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ParallelScenario>(SCENARIOS[0]);
  const [chains, setChains] = useState<ParallelChain[]>(SCENARIOS[0].chains);
  const [isRunning, setIsRunning] = useState(false);
  const [isAggregating, setIsAggregating] = useState(false);
  const [finalResult, setFinalResult] = useState<string>('');
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1.5);

  const resetDemo = useCallback(() => {
    const resetChains = selectedScenario.chains.map(chain => ({
      ...chain,
      status: 'pending' as const,
      progress: 0,
      input: undefined,
      output: undefined,
      processingTime: undefined,
      startTime: undefined,
      completionTime: undefined
    }));
    
    setChains(resetChains);
    setIsRunning(false);
    setIsAggregating(false);
    setFinalResult('');
    setExecutionLog([]);
  }, [selectedScenario]);

  const executeChain = async (chainIndex: number): Promise<void> => {
    const chain = chains[chainIndex];
    if (!chain) return;

    // Start execution
    const startTime = new Date();
    setChains(prev => prev.map((c, i) => 
      i === chainIndex 
        ? { ...c, status: 'in-progress', startTime, input: selectedScenario.initialInput }
        : c
    ));

    setExecutionLog(prev => [...prev, `🔄 Started: ${chain.title}`]);

    // Simulate progressive execution with progress updates
    const totalTime = (3000 + Math.random() * 4000) / speed; // 3-7 seconds
    const updateInterval = 100;
    const steps = totalTime / updateInterval;

    for (let step = 0; step < steps; step++) {
      await new Promise(resolve => setTimeout(resolve, updateInterval));
      const progress = Math.min(((step + 1) / steps) * 100, 100);
      
      setChains(prev => prev.map((c, i) => 
        i === chainIndex ? { ...c, progress } : c
      ));
    }

    // Generate output and complete
    const output = generateChainOutput(chain, selectedScenario.id);
    const completionTime = new Date();
    const processingTime = (completionTime.getTime() - startTime.getTime()) / 1000;

    setChains(prev => prev.map((c, i) => 
      i === chainIndex 
        ? { 
            ...c, 
            status: 'completed', 
            progress: 100, 
            output, 
            completionTime,
            processingTime
          }
        : c
    ));

    setExecutionLog(prev => [...prev, `✅ Completed: ${chain.title} (${processingTime.toFixed(1)}s)`]);
  };

  const aggregateResults = async (): Promise<void> => {
    setIsAggregating(true);
    setExecutionLog(prev => [...prev, '🔄 Aggregating results from all chains...']);

    await new Promise(resolve => setTimeout(resolve, 2000 / speed));

    const aggregatedResult = generateAggregatedResult();
    setFinalResult(aggregatedResult);
    setExecutionLog(prev => [...prev, '✅ Results aggregated and synthesized']);
    setIsAggregating(false);
  };

  const generateAggregatedResult = (): string => {
    const results: { [key: string]: string } = {
      'market-analysis': '# Comprehensive Market Analysis Report\n## AI-Powered Productivity Assistant\n\n### Executive Summary\nBased on parallel analysis across four key areas, the AI productivity assistant market presents a compelling $15B opportunity with strong differentiation potential in the enterprise segment.\n\n### Key Findings\n\n**Market Opportunity (from Trends Analysis):**\n• Total addressable market: $15B with 300% YoY growth\n• Enterprise segment represents 80% of revenue potential\n• Strong demand for industry-specific solutions\n\n**Target Market (from Demographics Analysis):**\n• Primary: Software developers (40% of market) - willing to pay $30-50/month\n• Secondary: Business analysts (25%) - focus on automation and reporting\n• Geographic priority: North America (45%), Europe (30%)\n\n**Competitive Landscape (from Competitor Analysis):**\n• Market gaps in enterprise workflow integration\n• Pricing opportunity at $25-45/user/month\n• Differentiation through industry-specific features\n\n**Regulatory Considerations (from Compliance Analysis):**\n• Budget $200K-500K for initial compliance setup\n• GDPR compliance critical for European market\n• Privacy-by-design architecture provides competitive advantage\n\n### Strategic Recommendations\n\n1. **Product Strategy:** Focus on enterprise workflow integration over generic chat interfaces\n2. **Market Entry:** Target software development teams first, expand to business analysts\n3. **Pricing:** Premium positioning at $35-45/user/month with enterprise features\n4. **Geographic:** North America launch, followed by GDPR-compliant European expansion\n5. **Compliance:** Implement privacy-first architecture as competitive differentiator\n\n### Financial Projections\n• Year 1 target: 100 enterprise customers, $3M ARR\n• Year 3 target: 500 customers, $20M ARR\n• Investment required: $8M for development and compliance\n\n### Next Steps\n1. Validate enterprise workflow integration opportunities\n2. Develop MVP focusing on developer productivity\n3. Establish compliance framework and legal structure\n4. Build strategic partnerships with enterprise software vendors',
      
      'content-creation': '# Comprehensive Content Campaign Strategy\n## Sustainable Fashion Brand Launch\n\n### Campaign Overview\nIntegrated multi-channel content strategy designed to establish brand authority in sustainable fashion while driving engagement and conversions across all major platforms.\n\n### Content Asset Summary\n\n**Social Media Content (from Social Media Analysis):**\n• 65+ pieces of visual content across Instagram, TikTok, and Twitter\n• Educational series on sustainability with entertainment value\n• User-generated content campaigns and community engagement\n• Influencer collaboration framework and guidelines\n\n**Educational Content (from Blog Analysis):**\n• 12 comprehensive blog articles covering sustainability education and brand story\n• SEO-optimized content targeting sustainable fashion keywords\n• Guest posting strategy for authority building\n• Thought leadership content for industry publications\n\n**Email Marketing (from Email Campaign Analysis):**\n• 5-part welcome series introducing brand values and products\n• Weekly newsletter with sustainability tips and product features\n• Automated campaigns for different customer lifecycle stages\n• Segmentation strategy for personalized messaging\n\n**Public Relations (from Press Release Analysis):**\n• Major launch announcement with revolutionary zero-waste angle\n• Media kit with high-quality assets and founder story\n• Strategic media outreach to fashion and sustainability publications\n• Event and interview schedule for maximum exposure\n\n### Integrated Campaign Timeline\n\n**Pre-Launch (Weeks 1-4):**\n• Blog content publication for SEO foundation\n• Email list building with sustainability guide lead magnets\n• Social media account setup and early community building\n• Press outreach and media relationship development\n\n**Launch Phase (Weeks 5-8):**\n• Press release distribution and media interviews\n• Social media campaign launch with coordinated posting\n• Email welcome series activation for new subscribers\n• Influencer partnerships and collaboration content\n\n**Post-Launch (Weeks 9-12):**\n• User-generated content campaigns and community challenges\n• Educational blog series and sustainability thought leadership\n• Customer success stories and testimonials\n• Performance analysis and campaign optimization\n\n### Expected Outcomes\n• Brand awareness: 500K+ social media impressions in first month\n• Website traffic: 50K+ monthly visitors by month 3\n• Email list: 10K+ subscribers by launch end\n• Media coverage: 20+ publications covering launch story\n• Sales impact: 25% of initial sales attributed to content marketing\n\n### Budget Allocation\n• Content creation: 40% ($20K)\n• Paid promotion: 30% ($15K)\n• Influencer partnerships: 20% ($10K)\n• Tools and software: 10% ($5K)\n• Total campaign budget: $50K\n\n### Success Metrics\n• Engagement rate: >4% across all social platforms\n• Email open rate: >25% for newsletters\n• Website conversion rate: >2% from content traffic\n• Brand mention sentiment: >80% positive\n• Organic reach growth: 50% month-over-month',
      
      'product-development': '# Product Development Strategy Report\n## AI-Powered Personal Health Monitoring Device\n\n### Executive Summary\nComprehensive analysis across technical, user, financial, and risk dimensions reveals a viable path to market for an AI-powered health monitoring device with strong differentiation potential and clear user demand.\n\n### Technical Feasibility Assessment\n**Development Readiness:** High confidence with 30-month timeline to market\n• Core sensor technology is mature and commercially available\n• AI/ML algorithms require 6 months of additional development\n• FDA approval process well-understood with 18-month timeline\n• Manufacturing partners identified with pilot production capability\n\n### Market Validation\n**Strong User Demand Confirmed:**\n• 4 distinct user personas identified with clear needs\n• Price acceptance at $299 device + $9.99/month subscription\n• Key features validated: heart rate (100%), sleep tracking (92%), activity monitoring (89%)\n• Market gap identified in actionable health insights and seamless integration\n\n### Financial Projections\n**Path to Profitability Established:**\n• Break-even: Year 3 with 120,000 units sold\n• 5-year revenue projection: $147M with 55% gross margins\n• Funding requirement: $50M through profitability\n• Customer LTV/CAC ratio: 5.6:1 (strong unit economics)\n\n### Risk Management\n**Comprehensive Risk Mitigation Strategy:**\n• Primary risks identified in regulatory approval and competitive response\n• Mitigation strategies established for all high-impact risks\n• Contingency plans developed for technical and market challenges\n• Insurance and legal frameworks planned for operational risks\n\n### Strategic Recommendations\n\n**Product Development Approach:**\n1. Phased development starting with wellness features, adding medical capabilities post-FDA approval\n2. Focus on user experience and actionable insights as key differentiators\n3. Build robust data privacy and security architecture from day one\n4. Establish clinical partnerships for validation and credibility\n\n**Go-to-Market Strategy:**\n1. Launch with Health Enthusiast segment (highest willingness to pay)\n2. Expand to Chronic Condition Managers with proven medical value\n3. Geographic expansion: US first, then Europe with privacy-compliant version\n4. Partnership strategy with healthcare providers and fitness ecosystems\n\n**Financial Strategy:**\n1. Series A funding ($15M) for product development and initial marketing\n2. Series B funding ($35M) for scaling manufacturing and market expansion\n3. Revenue diversification through hardware, subscription, and B2B partnerships\n4. Conservative growth projections with upside potential\n\n### Implementation Timeline\n• Months 1-6: Core technology development and initial prototyping\n• Months 7-18: Clinical validation and FDA submission process\n• Months 19-24: Regulatory approval and manufacturing preparation\n• Months 25-30: Market launch and initial customer acquisition\n\n### Success Metrics\n• Technical: FDA approval within 18 months, 7-day battery life achieved\n• Market: 15,000 units sold in Year 1, 4.5+ app store rating\n• Financial: $4.5M revenue in Year 1, 35% gross margin achieved\n• User: <3.5% monthly churn rate, >80% user satisfaction score\n\n### Next Steps\n1. Secure Series A funding for development team expansion\n2. Initiate FDA pre-submission process and regulatory strategy\n3. Begin clinical validation studies with partner institutions\n4. Establish supply chain relationships and manufacturing partnerships\n5. Develop comprehensive IP protection strategy'
    };

    return results[selectedScenario.id] || 'Comprehensive analysis completed. All parallel chains have been successfully executed and results aggregated.';
  };

  const runParallelExecution = async () => {
    setIsRunning(true);
    resetDemo();
    
    setExecutionLog(['🚀 Starting parallel chain execution...']);
    
    // Execute all chains in parallel
    const chainPromises = selectedScenario.chains.map((_, index) => executeChain(index));
    await Promise.all(chainPromises);
    
    // Wait a moment then aggregate results
    await new Promise(resolve => setTimeout(resolve, 1000));
    await aggregateResults();
    
    setIsRunning(false);
  };

  const getOverallProgress = () => {
    const totalProgress = chains.reduce((sum, chain) => sum + chain.progress, 0);
    return totalProgress / chains.length;
  };

  const getCompletedCount = () => chains.filter(c => c.status === 'completed').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>;
    }
  };

  useEffect(() => {
    resetDemo();
  }, [selectedScenario, resetDemo]);

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-900/40 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
          <span className="text-4xl mr-3">⚡</span>
          Parallel Chaining Demo
        </h2>
        <p className="text-gray-300 mb-6">
          Watch multiple specialized chains execute simultaneously, processing different aspects of complex tasks in parallel before aggregating results.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const scenario = SCENARIOS.find(s => s.id === e.target.value);
                if (scenario) setSelectedScenario(scenario);
              }}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Execution Speed
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full accent-blue-500"
            />
            <div className="text-sm text-gray-400">{speed}x speed</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Overall Progress</span>
            <span className="text-sm text-gray-400">
              {getCompletedCount()}/{chains.length} chains completed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getOverallProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={runParallelExecution}
            disabled={isRunning}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
              isRunning
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Running...' : 'Start Parallel Execution'}
          </button>
          
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parallel Chains */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Parallel Execution Chains</h3>
            <GitBranch className="w-5 h-5 ml-2 text-blue-400" />
          </div>
          
          {/* Initial Input */}
          <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
            <h4 className="font-medium text-gray-300 mb-2">Input (Distributed to All Chains)</h4>
            <div className="text-sm text-gray-200">{selectedScenario.initialInput}</div>
          </div>

          {/* Parallel Chains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {chains.map((chain, index) => (
              <div key={chain.id} className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {getStatusIcon(chain.status)}
                    <h4 className="font-medium text-white ml-3">{chain.title}</h4>
                  </div>
                  {chain.processingTime && (
                    <span className="text-sm text-gray-400">
                      {chain.processingTime.toFixed(1)}s
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-3">{chain.description}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-gray-400">{chain.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${chain.color} h-2 rounded-full transition-all duration-200`}
                      style={{ width: `${chain.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Output */}
                {chain.output && (
                  <div>
                    <h5 className="text-xs font-medium text-gray-400 mb-1">OUTPUT:</h5>
                    <div className="text-xs text-gray-200 bg-gray-800/40 p-3 rounded border-l-2 border-green-400 max-h-32 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-sans">
                        {chain.output.length > 200 
                          ? `${chain.output.substring(0, 200)}...` 
                          : chain.output
                        }
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Aggregation Phase */}
          {(isAggregating || finalResult) && (
            <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4">
              <div className="flex items-center mb-3">
                {isAggregating ? (
                  <Clock className="w-5 h-5 text-orange-400 animate-spin mr-3" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                )}
                <h4 className="font-medium text-white">Result Aggregation & Synthesis</h4>
              </div>

              {isAggregating && (
                <div className="text-sm text-gray-300">
                  Combining insights from all parallel chains...
                </div>
              )}

              {finalResult && (
                <div>
                  <h5 className="text-xs font-medium text-gray-400 mb-1">FINAL AGGREGATED RESULT:</h5>
                  <div className="text-xs text-gray-200 bg-gray-800/40 p-3 rounded border-l-2 border-purple-400 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans">{finalResult}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Execution Log & Stats */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Execution Log</h3>
          <div className="bg-gray-800/30 rounded-lg border border-gray-600/50 p-4 h-64 overflow-y-auto mb-6">
            {executionLog.length === 0 ? (
              <div className="text-gray-400 text-center text-sm mt-8">
                Execution log will appear here...
              </div>
            ) : (
              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="text-sm font-mono">
                    <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
                    <span className="text-gray-300 ml-2">{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scenario Info */}
          <div className="p-4 bg-gray-800/20 rounded-lg border border-gray-600/50 mb-4">
            <h4 className="font-medium text-white mb-2">About This Scenario</h4>
            <p className="text-sm text-gray-300">{selectedScenario.description}</p>
          </div>

          {/* Execution Statistics */}
          {chains.some(c => c.processingTime) && (
            <div className="p-4 bg-gray-800/20 rounded-lg border border-gray-600/50">
              <h4 className="font-medium text-white mb-2">Execution Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed Chains:</span>
                  <span className="text-white">{getCompletedCount()}/{chains.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Time:</span>
                  <span className="text-white">
                    {chains.filter(c => c.processingTime).length > 0 
                      ? (chains.reduce((sum, c) => sum + (c.processingTime || 0), 0) / chains.filter(c => c.processingTime).length).toFixed(1)
                      : '0.0'
                    }s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Parallel Efficiency:</span>
                  <span className="text-green-400">
                    {chains.filter(c => c.processingTime).length > 0 ? 
                      `${((chains.reduce((sum, c) => sum + (c.processingTime || 0), 0) / Math.max(...chains.map(c => c.processingTime || 0))) * 100).toFixed(0)}%` 
                      : '0%'
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParallelChainingDemo; 