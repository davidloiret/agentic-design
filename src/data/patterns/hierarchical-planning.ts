import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const hierarchicalPlanningPattern: PatternScenario = {
  id: 'hierarchical-planning',
  title: 'Hierarchical Planning Pattern',
  description: 'Demonstrates goal decomposition into hierarchical sub-tasks with dependency management and resource allocation',
  initialNodes: [
    // Main goal
    {
      id: 'main-goal',
      type: 'default',
      position: { x: 500, y: 50 },
      data: { label: 'Main Goal\n"Launch AI-powered mobile app"' },
      style: { ...nodeStyle, minWidth: 200, background: '#dc2626', fontSize: '14px' }
    },

    // Goal analyzer
    {
      id: 'goal-analyzer',
      type: 'default',
      position: { x: 500, y: 180 },
      data: { label: 'Goal Analyzer\nDecompose into manageable tasks' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Level 1 planning nodes
    {
      id: 'level1-planner',
      type: 'default',
      position: { x: 500, y: 320 },
      data: { label: 'Level 1 Planner\nHigh-level strategic tasks' },
      style: { ...nodeStyle, minWidth: 200, background: '#3b82f6' }
    },

    // Level 1 tasks
    {
      id: 'product-development',
      type: 'default',
      position: { x: 150, y: 480 },
      data: { label: 'Product Development\n6 months • High priority' },
      style: { ...nodeStyle, minWidth: 180, background: '#10b981' }
    },
    {
      id: 'marketing-strategy',
      type: 'default',
      position: { x: 400, y: 480 },
      data: { label: 'Marketing Strategy\n4 months • High priority' },
      style: { ...nodeStyle, minWidth: 180, background: '#f59e0b' }
    },
    {
      id: 'business-operations',
      type: 'default',
      position: { x: 650, y: 480 },
      data: { label: 'Business Operations\n8 months • Medium priority' },
      style: { ...nodeStyle, minWidth: 180, background: '#8b5cf6' }
    },
    {
      id: 'compliance-legal',
      type: 'default',
      position: { x: 900, y: 480 },
      data: { label: 'Compliance & Legal\n3 months • High priority' },
      style: { ...nodeStyle, minWidth: 180, background: '#ef4444' }
    },

    // Level 2 planner
    {
      id: 'level2-planner',
      type: 'default',
      position: { x: 500, y: 620 },
      data: { label: 'Level 2 Planner\nDetailed task breakdown' },
      style: { ...nodeStyle, minWidth: 200, background: '#7c3aed' }
    },

    // Level 2 tasks for Product Development
    {
      id: 'market-research',
      type: 'default',
      position: { x: 50, y: 760 },
      data: { label: 'Market Research\n2 weeks • Research team' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },
    {
      id: 'ui-ux-design',
      type: 'default',
      position: { x: 220, y: 760 },
      data: { label: 'UI/UX Design\n6 weeks • Design team' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },
    {
      id: 'ai-development',
      type: 'default',
      position: { x: 50, y: 880 },
      data: { label: 'AI Model Development\n12 weeks • ML team' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },
    {
      id: 'mobile-development',
      type: 'default',
      position: { x: 220, y: 880 },
      data: { label: 'Mobile App Development\n16 weeks • Dev team' },
      style: { ...nodeStyle, minWidth: 140, background: '#10b981', fontSize: '11px' }
    },

    // Level 2 tasks for Marketing Strategy
    {
      id: 'brand-identity',
      type: 'default',
      position: { x: 380, y: 760 },
      data: { label: 'Brand Identity\n4 weeks • Marketing team' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '11px' }
    },
    {
      id: 'content-strategy',
      type: 'default',
      position: { x: 540, y: 760 },
      data: { label: 'Content Strategy\n8 weeks • Content team' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '11px' }
    },
    {
      id: 'launch-campaign',
      type: 'default',
      position: { x: 380, y: 880 },
      data: { label: 'Launch Campaign\n6 weeks • Marketing team' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '11px' }
    },
    {
      id: 'partnership-outreach',
      type: 'default',
      position: { x: 540, y: 880 },
      data: { label: 'Partnership Outreach\n10 weeks • BD team' },
      style: { ...nodeStyle, minWidth: 140, background: '#f59e0b', fontSize: '11px' }
    },

    // Level 2 tasks for Business Operations
    {
      id: 'infrastructure-setup',
      type: 'default',
      position: { x: 700, y: 760 },
      data: { label: 'Infrastructure Setup\n8 weeks • DevOps team' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },
    {
      id: 'support-system',
      type: 'default',
      position: { x: 860, y: 760 },
      data: { label: 'Support System\n6 weeks • Support team' },
      style: { ...nodeStyle, minWidth: 140, background: '#8b5cf6', fontSize: '11px' }
    },

    // Level 2 tasks for Compliance & Legal
    {
      id: 'privacy-compliance',
      type: 'default',
      position: { x: 920, y: 880 },
      data: { label: 'Privacy Compliance\n8 weeks • Legal team' },
      style: { ...nodeStyle, minWidth: 140, background: '#ef4444', fontSize: '11px' }
    },

    // Dependency manager
    {
      id: 'dependency-manager',
      type: 'default',
      position: { x: 300, y: 1020 },
      data: { label: 'Dependency Manager\nTask ordering and prerequisites' },
      style: { ...nodeStyle, minWidth: 200, background: '#db2777' }
    },

    // Resource allocator
    {
      id: 'resource-allocator',
      type: 'default',
      position: { x: 700, y: 1020 },
      data: { label: 'Resource Allocator\nTeam and budget assignment' },
      style: { ...nodeStyle, minWidth: 200, background: '#0369a1' }
    },

    // Progress tracker
    {
      id: 'progress-tracker',
      type: 'default',
      position: { x: 100, y: 1160 },
      data: { label: 'Progress Tracker\n• Market Research: 100%\n• UI/UX Design: 75%\n• AI Development: 45%\n• Mobile Dev: 20%' },
      style: { ...nodeStyle, minWidth: 160, background: '#059669', fontSize: '11px' }
    },

    // Risk assessor
    {
      id: 'risk-assessor',
      type: 'default',
      position: { x: 300, y: 1160 },
      data: { label: 'Risk Assessor\n• Technical risks: Medium\n• Market risks: Low\n• Resource risks: High\n• Timeline risks: Medium' },
      style: { ...nodeStyle, minWidth: 160, background: '#dc2626', fontSize: '11px' }
    },

    // Timeline optimizer
    {
      id: 'timeline-optimizer',
      type: 'default',
      position: { x: 500, y: 1160 },
      data: { label: 'Timeline Optimizer\n• Critical path: 24 weeks\n• Buffer time: 4 weeks\n• Parallel tracks: 8\n• Dependencies: 12' },
      style: { ...nodeStyle, minWidth: 160, background: '#f59e0b', fontSize: '11px' }
    },

    // Quality gate
    {
      id: 'quality-gate',
      type: 'default',
      position: { x: 700, y: 1160 },
      data: { label: 'Quality Gate\n• Milestones: 8/12 passed\n• KPIs: 85% target met\n• Reviews: All approved\n• Standards: Compliant' },
      style: { ...nodeStyle, minWidth: 160, background: '#3b82f6', fontSize: '11px' }
    },

    // Budget monitor
    {
      id: 'budget-monitor',
      type: 'default',
      position: { x: 900, y: 1160 },
      data: { label: 'Budget Monitor\n• Allocated: $2.5M\n• Spent: $1.8M\n• Remaining: $700K\n• Burn rate: On track' },
      style: { ...nodeStyle, minWidth: 160, background: '#8b5cf6', fontSize: '11px' }
    },

    // Plan executor
    {
      id: 'plan-executor',
      type: 'default',
      position: { x: 500, y: 1300 },
      data: { label: 'Plan Executor\nCoordinate execution across teams' },
      style: { ...nodeStyle, minWidth: 200, background: '#059669' }
    },

    // Final outcome
    {
      id: 'execution-status',
      type: 'default',
      position: { x: 500, y: 1440 },
      data: { label: 'Execution Status\n"Phase 1 complete: 85% on schedule, 90% on budget"' },
      style: { ...nodeStyle, minWidth: 300, background: '#059669' }
    }
  ],

  initialEdges: [
    // Main flow
    {
      id: 'e-goal-analyzer',
      source: 'main-goal',
      target: 'goal-analyzer',
      style: edgeStyle
    },
    {
      id: 'e-analyzer-level1',
      source: 'goal-analyzer',
      target: 'level1-planner',
      style: { ...edgeStyle, stroke: '#3b82f6' }
    },

    // Level 1 decomposition
    {
      id: 'e-level1-product',
      source: 'level1-planner',
      target: 'product-development',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Decompose'
    },
    {
      id: 'e-level1-marketing',
      source: 'level1-planner',
      target: 'marketing-strategy',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Decompose'
    },
    {
      id: 'e-level1-business',
      source: 'level1-planner',
      target: 'business-operations',
      style: { ...edgeStyle, stroke: '#8b5cf6' },
      label: 'Decompose'
    },
    {
      id: 'e-level1-compliance',
      source: 'level1-planner',
      target: 'compliance-legal',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Decompose'
    },

    // Level 2 planning
    {
      id: 'e-product-level2',
      source: 'product-development',
      target: 'level2-planner',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-marketing-level2',
      source: 'marketing-strategy',
      target: 'level2-planner',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-business-level2',
      source: 'business-operations',
      target: 'level2-planner',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-compliance-level2',
      source: 'compliance-legal',
      target: 'level2-planner',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },

    // Level 2 task breakdown - Product Development
    {
      id: 'e-level2-research',
      source: 'level2-planner',
      target: 'market-research',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-level2-design',
      source: 'level2-planner',
      target: 'ui-ux-design',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-level2-ai',
      source: 'level2-planner',
      target: 'ai-development',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-level2-mobile',
      source: 'level2-planner',
      target: 'mobile-development',
      style: { ...edgeStyle, stroke: '#10b981' }
    },

    // Level 2 task breakdown - Marketing Strategy
    {
      id: 'e-level2-brand',
      source: 'level2-planner',
      target: 'brand-identity',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-level2-content',
      source: 'level2-planner',
      target: 'content-strategy',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-level2-campaign',
      source: 'level2-planner',
      target: 'launch-campaign',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-level2-partnership',
      source: 'level2-planner',
      target: 'partnership-outreach',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },

    // Level 2 task breakdown - Business Operations
    {
      id: 'e-level2-infrastructure',
      source: 'level2-planner',
      target: 'infrastructure-setup',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-level2-support',
      source: 'level2-planner',
      target: 'support-system',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },

    // Level 2 task breakdown - Compliance & Legal
    {
      id: 'e-level2-privacy',
      source: 'level2-planner',
      target: 'privacy-compliance',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // Management systems
    {
      id: 'e-research-dependency',
      source: 'market-research',
      target: 'dependency-manager',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '3,3' }
    },
    {
      id: 'e-design-dependency',
      source: 'ui-ux-design',
      target: 'dependency-manager',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '3,3' }
    },
    {
      id: 'e-ai-resource',
      source: 'ai-development',
      target: 'resource-allocator',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },
    {
      id: 'e-mobile-resource',
      source: 'mobile-development',
      target: 'resource-allocator',
      style: { ...edgeStyle, stroke: '#0369a1', strokeDasharray: '3,3' }
    },

    // Monitoring systems
    {
      id: 'e-dependency-progress',
      source: 'dependency-manager',
      target: 'progress-tracker',
      style: { ...edgeStyle, stroke: '#059669', strokeDasharray: '3,3' }
    },
    {
      id: 'e-dependency-risk',
      source: 'dependency-manager',
      target: 'risk-assessor',
      style: { ...edgeStyle, stroke: '#dc2626', strokeDasharray: '3,3' }
    },
    {
      id: 'e-resource-timeline',
      source: 'resource-allocator',
      target: 'timeline-optimizer',
      style: { ...edgeStyle, stroke: '#f59e0b', strokeDasharray: '3,3' }
    },
    {
      id: 'e-resource-budget',
      source: 'resource-allocator',
      target: 'budget-monitor',
      style: { ...edgeStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }
    },

    // Quality and execution
    {
      id: 'e-progress-executor',
      source: 'progress-tracker',
      target: 'plan-executor',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-timeline-executor',
      source: 'timeline-optimizer',
      target: 'plan-executor',
      style: { ...edgeStyle, stroke: '#059669' }
    },
    {
      id: 'e-quality-executor',
      source: 'quality-gate',
      target: 'plan-executor',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Final status
    {
      id: 'e-executor-status',
      source: 'plan-executor',
      target: 'execution-status',
      style: { ...edgeStyle, stroke: '#059669' }
    },

    // Dependencies between tasks
    {
      id: 'e-research-design',
      source: 'market-research',
      target: 'ui-ux-design',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '5,5' },
      label: 'Dependency'
    },
    {
      id: 'e-design-mobile',
      source: 'ui-ux-design',
      target: 'mobile-development',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '5,5' },
      label: 'Dependency'
    },
    {
      id: 'e-brand-campaign',
      source: 'brand-identity',
      target: 'launch-campaign',
      style: { ...edgeStyle, stroke: '#db2777', strokeDasharray: '5,5' },
      label: 'Dependency'
    }
  ],

  steps: [
    {
      id: 'step1',
      title: 'Goal Definition and Analysis',
      description: 'Define the main goal and analyze its complexity for hierarchical decomposition.',
      input: 'Main goal: "Launch AI-powered mobile app within 8 months with $2.5M budget"',
      activeNodes: ['main-goal'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Goal Analysis and Decomposition Strategy',
      description: 'Analyze the main goal to identify major components and decomposition strategy.',
      input: 'Goal analysis: complexity assessment and strategic breakdown approach',
      activeNodes: ['main-goal', 'goal-analyzer'],
      activeEdges: ['e-goal-analyzer'],
      output: 'Goal Analysis Results:\\n\\n**Complexity Assessment**: High complexity project requiring multi-disciplinary approach\\n• **Scope**: AI-powered mobile application development\\n• **Timeline**: 8-month constraint with hard deadline\\n• **Budget**: $2.5M total budget allocation\\n• **Teams Required**: 6+ specialized teams (ML, Mobile, Design, Marketing, Legal, DevOps)\\n• **Risk Level**: Medium-high due to AI integration and market timing\\n\\n**Decomposition Strategy**:\\n• **Level 1**: Strategic domains (Product, Marketing, Operations, Compliance)\\n• **Level 2**: Tactical components within each domain\\n• **Level 3**: Executable tasks with specific deliverables\\n• **Dependencies**: Cross-domain coordination points identified\\n• **Resource Allocation**: Team assignments and budget distribution\\n\\n**Success Metrics**:\\n• On-time delivery within 8 months\\n• Budget adherence within 10% variance\\n• Quality gates and milestone achievement\\n• Market readiness and compliance validation'
    },
    {
      id: 'step3',
      title: 'Level 1 Strategic Planning',
      description: 'Break down the main goal into high-level strategic domains and priorities.',
      input: 'Level 1 planning: identify major strategic components and their relationships',
      activeNodes: ['goal-analyzer', 'level1-planner'],
      activeEdges: ['e-analyzer-level1'],
      output: 'Level 1 Strategic Decomposition:\\n\\n**Strategic Domains Identified** (4 major areas):\\n\\n**1. Product Development** (Priority: Critical)\\n• Duration: 6 months\\n• Budget: $1.2M (48%)\\n• Teams: ML Engineers, Mobile Developers, UI/UX Designers\\n• Key Deliverables: AI model, mobile app, user interface\\n• Success Metrics: Feature completeness, performance benchmarks\\n\\n**2. Marketing Strategy** (Priority: High)\\n• Duration: 4 months\\n• Budget: $600K (24%)\\n• Teams: Marketing, Content, Business Development\\n• Key Deliverables: Brand identity, launch campaign, partnerships\\n• Success Metrics: Brand awareness, user acquisition pipeline\\n\\n**3. Business Operations** (Priority: Medium)\\n• Duration: 8 months\\n• Budget: $500K (20%)\\n• Teams: DevOps, Support, Infrastructure\\n• Key Deliverables: Production infrastructure, support systems\\n• Success Metrics: System reliability, support response times\\n\\n**4. Compliance & Legal** (Priority: Critical)\\n• Duration: 3 months\\n• Budget: $200K (8%)\\n• Teams: Legal, Privacy, Security\\n• Key Deliverables: Privacy compliance, legal framework\\n• Success Metrics: Regulatory approval, risk mitigation'
    },
    {
      id: 'step4',
      title: 'Level 1 Domain Decomposition',
      description: 'Decompose the main goal into four major strategic domains with resource allocation.',
      input: 'Domain decomposition: create high-level strategic components',
      activeNodes: ['level1-planner', 'product-development', 'marketing-strategy', 'business-operations', 'compliance-legal'],
      activeEdges: ['e-level1-product', 'e-level1-marketing', 'e-level1-business', 'e-level1-compliance'],
      output: 'Strategic Domain Breakdown Complete:\\n\\n**Domain Architecture**:\\n\\n**Product Development Domain**:\\n• **Scope**: Core product creation and AI integration\\n• **Timeline**: Months 1-6 (Critical path)\\n• **Resource Allocation**: 12 team members, $1.2M budget\\n• **Key Components**: Market research, AI model, mobile app, UX design\\n• **Risk Factors**: Technical complexity, AI model performance\\n• **Success Criteria**: Feature completeness, performance targets met\\n\\n**Marketing Strategy Domain**:\\n• **Scope**: Brand building and market entry preparation\\n• **Timeline**: Months 3-6 (Overlapping with product)\\n• **Resource Allocation**: 6 team members, $600K budget\\n• **Key Components**: Brand identity, content strategy, partnerships\\n• **Risk Factors**: Market timing, competitive response\\n• **Success Criteria**: Brand recognition, user acquisition pipeline\\n\\n**Business Operations Domain**:\\n• **Scope**: Infrastructure and operational readiness\\n• **Timeline**: Months 1-8 (Full duration)\\n• **Resource Allocation**: 4 team members, $500K budget\\n• **Key Components**: Cloud infrastructure, support systems\\n• **Risk Factors**: Scalability, operational efficiency\\n• **Success Criteria**: System reliability, operational readiness\\n\\n**Compliance & Legal Domain**:\\n• **Scope**: Legal framework and regulatory compliance\\n• **Timeline**: Months 1-3 (Front-loaded)\\n• **Resource Allocation**: 3 team members, $200K budget\\n• **Key Components**: Privacy compliance, legal reviews\\n• **Risk Factors**: Regulatory changes, compliance gaps\\n• **Success Criteria**: Full regulatory compliance, legal clearance'
    },
    {
      id: 'step5',
      title: 'Level 2 Tactical Planning',
      description: 'Further decompose strategic domains into specific tactical components and tasks.',
      input: 'Level 2 planning: break down strategic domains into executable components',
      activeNodes: ['level2-planner'],
      activeEdges: ['e-product-level2', 'e-marketing-level2', 'e-business-level2', 'e-compliance-level2'],
      output: 'Level 2 Tactical Decomposition:\\n\\n**Tactical Component Analysis**:\\n\\n**Product Development Breakdown**:\\n• **Market Research**: User needs analysis, competitor assessment (2 weeks)\\n• **UI/UX Design**: User interface design, user experience optimization (6 weeks)\\n• **AI Model Development**: Machine learning model training and optimization (12 weeks)\\n• **Mobile App Development**: iOS/Android app implementation (16 weeks)\\n\\n**Marketing Strategy Breakdown**:\\n• **Brand Identity**: Logo, messaging, visual identity system (4 weeks)\\n• **Content Strategy**: Content calendar, social media strategy (8 weeks)\\n• **Launch Campaign**: Marketing campaign design and execution (6 weeks)\\n• **Partnership Outreach**: Strategic partnerships and collaborations (10 weeks)\\n\\n**Business Operations Breakdown**:\\n• **Infrastructure Setup**: Cloud deployment, monitoring systems (8 weeks)\\n• **Support System**: Customer support tools and processes (6 weeks)\\n\\n**Compliance & Legal Breakdown**:\\n• **Privacy Compliance**: GDPR, CCPA compliance implementation (8 weeks)\\n\\n**Resource Assignment Summary**:\\n• Total tactical components: 11 specific areas\\n• Team assignments: Specialized teams per component\\n• Timeline coordination: Parallel and sequential execution\\n• Quality checkpoints: Milestone reviews and approvals'
    },
    {
      id: 'step6',
      title: 'Detailed Task Creation and Assignment',
      description: 'Create specific executable tasks with team assignments and timelines.',
      input: 'Task creation: generate detailed tasks with specific deliverables and assignments',
      activeNodes: ['market-research', 'ui-ux-design', 'ai-development', 'mobile-development', 'brand-identity', 'content-strategy', 'launch-campaign', 'partnership-outreach', 'infrastructure-setup', 'support-system', 'privacy-compliance'],
      activeEdges: ['e-level2-research', 'e-level2-design', 'e-level2-ai', 'e-level2-mobile', 'e-level2-brand', 'e-level2-content', 'e-level2-campaign', 'e-level2-partnership', 'e-level2-infrastructure', 'e-level2-support', 'e-level2-privacy'],
      output: 'Detailed Task Creation Complete:\\n\\n**Product Development Tasks**:\\n\\n**Market Research** (2 weeks, Research Team):\\n• Deliverables: Market analysis report, user persona definitions\\n• Success Metrics: 500+ survey responses, competitive analysis\\n• Dependencies: None (can start immediately)\\n\\n**UI/UX Design** (6 weeks, Design Team):\\n• Deliverables: Wireframes, prototypes, design system\\n• Success Metrics: User testing scores >80%, accessibility compliance\\n• Dependencies: Market research completion\\n\\n**AI Model Development** (12 weeks, ML Team):\\n• Deliverables: Trained model, API endpoints, performance benchmarks\\n• Success Metrics: 95% accuracy, <200ms response time\\n• Dependencies: Market research for requirements\\n\\n**Mobile App Development** (16 weeks, Development Team):\\n• Deliverables: iOS/Android apps, app store submissions\\n• Success Metrics: <2s load time, crash rate <1%\\n• Dependencies: UI/UX design completion\\n\\n**Marketing Tasks**:\\n\\n**Brand Identity** (4 weeks, Marketing Team):\\n• Deliverables: Logo, brand guidelines, messaging framework\\n• Success Metrics: Brand recognition tests, stakeholder approval\\n• Dependencies: Market research insights\\n\\n**Content Strategy** (8 weeks, Content Team):\\n• Deliverables: Content calendar, social media strategy\\n• Success Metrics: Content engagement rates, SEO rankings\\n• Dependencies: Brand identity completion\\n\\n**Launch Campaign** (6 weeks, Marketing Team):\\n• Deliverables: Campaign materials, media plan, influencer partnerships\\n• Success Metrics: Reach targets, conversion rates\\n• Dependencies: Brand identity and content strategy\\n\\n**Partnership Outreach** (10 weeks, BD Team):\\n• Deliverables: Partnership agreements, integration plans\\n• Success Metrics: 3+ strategic partnerships, revenue projections\\n• Dependencies: Product development milestones'
    },
    {
      id: 'step7',
      title: 'Dependency Management and Resource Allocation',
      description: 'Identify task dependencies and allocate resources across the project.',
      input: 'Dependency analysis: map task relationships and optimize resource distribution',
      activeNodes: ['dependency-manager', 'resource-allocator'],
      activeEdges: ['e-research-dependency', 'e-design-dependency', 'e-ai-resource', 'e-mobile-resource', 'e-research-design', 'e-design-mobile', 'e-brand-campaign'],
      output: 'Dependency Management and Resource Allocation:\\n\\n**Critical Path Analysis**:\\n• **Primary Path**: Market Research → UI/UX Design → Mobile Development (24 weeks)\\n• **Parallel Path**: AI Model Development (12 weeks, can start after market research)\\n• **Marketing Path**: Brand Identity → Content Strategy → Launch Campaign (18 weeks)\\n• **Support Path**: Infrastructure Setup, Privacy Compliance (parallel execution)\\n\\n**Key Dependencies Identified**:\\n1. **Market Research → UI/UX Design**: User insights required for design decisions\\n2. **UI/UX Design → Mobile Development**: Design specifications needed for implementation\\n3. **Brand Identity → Launch Campaign**: Brand elements required for campaign materials\\n4. **AI Model → Mobile App**: Model integration required for app functionality\\n5. **Privacy Compliance → Launch**: Legal clearance required before public release\\n\\n**Resource Allocation Matrix**:\\n\\n**Team Assignments**:\\n• **Research Team** (2 people): Market research, user studies\\n• **Design Team** (3 people): UI/UX design, visual identity\\n• **ML Team** (4 people): AI model development, optimization\\n• **Development Team** (6 people): Mobile app development, integration\\n• **Marketing Team** (3 people): Brand identity, campaigns\\n• **Content Team** (2 people): Content strategy, social media\\n• **BD Team** (2 people): Partnership outreach, negotiations\\n• **DevOps Team** (2 people): Infrastructure, deployment\\n• **Support Team** (1 person): Support system setup\\n• **Legal Team** (2 people): Privacy compliance, legal review\\n\\n**Budget Distribution**:\\n• Personnel costs: $1.8M (72%)\\n• Technology and tools: $400K (16%)\\n• Marketing and promotion: $200K (8%)\\n• Legal and compliance: $100K (4%)\\n\\n**Timeline Optimization**:\\n• Parallel execution opportunities: 8 concurrent tracks\\n• Buffer time allocation: 4 weeks total\\n• Milestone checkpoints: Every 2 weeks\\n• Risk mitigation: Cross-training and backup resources'
    },
    {
      id: 'step8',
      title: 'Monitoring and Quality Systems Setup',
      description: 'Establish monitoring systems for progress tracking, risk assessment, and quality control.',
      input: 'Monitoring setup: implement tracking systems for progress, risks, timeline, and quality',
      activeNodes: ['progress-tracker', 'risk-assessor', 'timeline-optimizer', 'quality-gate', 'budget-monitor'],
      activeEdges: ['e-dependency-progress', 'e-dependency-risk', 'e-resource-timeline', 'e-resource-budget'],
      output: 'Monitoring and Quality Systems Established:\\n\\n**Progress Tracking System**:\\n• **Current Status**: 4 tasks initiated, 1 completed (Market Research: 100%)\\n• **Completion Rates**: UI/UX Design (75%), AI Development (45%), Mobile Dev (20%)\\n• **Milestone Progress**: 3/12 major milestones achieved\\n• **Team Productivity**: Research team exceeding targets, design team on track\\n• **Deliverable Quality**: All completed deliverables passed quality review\\n• **Update Frequency**: Daily standup reports, weekly executive summaries\\n\\n**Risk Assessment Framework**:\\n• **Technical Risks**: Medium level (AI model performance uncertainty)\\n• **Market Risks**: Low level (validated market demand through research)\\n• **Resource Risks**: High level (key personnel availability, skill gaps)\\n• **Timeline Risks**: Medium level (dependencies on external partners)\\n• **Budget Risks**: Low level (spending within projected ranges)\\n• **Mitigation Strategies**: Cross-training, vendor backup plans, buffer allocation\\n\\n**Timeline Optimization**:\\n• **Critical Path Duration**: 24 weeks (within 8-month target)\\n• **Buffer Allocation**: 4 weeks strategic buffer for risk mitigation\\n• **Parallel Execution**: 8 concurrent workstreams maximizing efficiency\\n• **Dependency Management**: 12 key dependencies tracked and monitored\\n• **Schedule Compression**: 2 weeks saved through parallel execution optimization\\n• **Milestone Alignment**: All major milestones aligned with business objectives\\n\\n**Quality Gate System**:\\n• **Milestone Reviews**: 8/12 quality gates defined and scheduled\\n• **KPI Targets**: 85% of key performance indicators meeting targets\\n• **Review Process**: All deliverables undergo peer review and stakeholder approval\\n• **Standards Compliance**: Technical standards, brand guidelines, legal requirements\\n• **Continuous Improvement**: Weekly retrospectives and process optimization\\n• **Stakeholder Satisfaction**: Regular feedback collection and incorporation\\n\\n**Budget Monitoring**:\\n• **Total Allocated**: $2.5M across all project domains\\n• **Current Spending**: $1.8M committed, $700K remaining\\n• **Burn Rate**: $312K per month, tracking within projected ranges\\n• **Cost Categories**: Personnel (72%), technology (16%), marketing (8%), legal (4%)\\n• **Variance Analysis**: 5% under budget in development, 3% over in marketing\\n• **Forecasting**: On track to complete within budget with 2% contingency remaining'
    },
    {
      id: 'step9',
      title: 'Plan Execution Coordination',
      description: 'Coordinate execution across all teams and domains with integrated management.',
      input: 'Execution coordination: integrate all monitoring systems and coordinate team activities',
      activeNodes: ['plan-executor'],
      activeEdges: ['e-progress-executor', 'e-timeline-executor', 'e-quality-executor'],
      output: 'Plan Execution Coordination Active:\\n\\n**Cross-Domain Coordination**:\\n• **Daily Coordination**: Morning standup with team leads from all domains\\n• **Weekly Integration**: Cross-functional integration meetings and dependency reviews\\n• **Monthly Reviews**: Stakeholder reviews and strategic alignment sessions\\n• **Quarterly Planning**: Quarterly business reviews and plan adjustments\\n\\n**Team Coordination Matrix**:\\n• **Product-Marketing Alignment**: Design team collaborating with brand team for consistency\\n• **Development-Operations Sync**: DevOps team integrated with mobile development for deployment\\n• **Legal-Product Integration**: Privacy team embedded with development for compliance by design\\n• **Marketing-BD Coordination**: Partnership team aligned with marketing for co-promotion opportunities\\n\\n**Communication Framework**:\\n• **Slack Channels**: Domain-specific channels with cross-domain integration channel\\n• **Project Dashboard**: Real-time visibility into all project metrics and status\\n• **Documentation Hub**: Centralized knowledge base with decision logs and meeting notes\\n• **Video Conferences**: Weekly all-hands, domain-specific deep dives\\n\\n**Issue Resolution Process**:\\n• **Escalation Path**: Team lead → Domain lead → Project manager → Executive sponsor\\n• **Response Times**: Critical issues (4 hours), high (24 hours), medium (72 hours)\\n• **Decision Framework**: RACI matrix for clear accountability and decision rights\\n• **Conflict Resolution**: Structured process for cross-domain conflicts and priorities\\n\\n**Performance Optimization**:\\n• **Resource Reallocation**: Dynamic resource shifting based on critical path needs\\n• **Process Improvement**: Continuous optimization based on retrospective feedback\\n• **Tool Integration**: Automated workflows between project management tools\\n• **Knowledge Sharing**: Regular knowledge transfer sessions and documentation updates\\n\\n**Execution Metrics**:\\n• **Team Velocity**: All teams meeting or exceeding planned velocity\\n• **Cross-Domain Dependencies**: 85% of dependencies resolved on schedule\\n• **Communication Effectiveness**: 95% of decisions communicated within 24 hours\\n• **Issue Resolution**: Average resolution time of 36 hours for medium-priority issues'
    },
    {
      id: 'step10',
      title: 'Hierarchical Planning Execution Status',
      description: 'Provide comprehensive status update on hierarchical planning execution and outcomes.',
      input: 'Status reporting: comprehensive project status across all hierarchical levels',
      activeNodes: ['execution-status'],
      activeEdges: ['e-executor-status'],
      output: 'Hierarchical Planning Pattern Execution Complete:\\n\\n**Final Project Status Report**:\\n"Phase 1 complete: 85% on schedule, 90% on budget, all quality gates passed"\\n\\n**Hierarchical Decomposition Success**:\\n\\n**Level 1 (Strategic Domains)** - ✅ **COMPLETED**:\\n• **Product Development**: 95% complete, AI model deployed, mobile app in final testing\\n• **Marketing Strategy**: 90% complete, brand launched, partnerships secured\\n• **Business Operations**: 100% complete, infrastructure live, support team operational\\n• **Compliance & Legal**: 100% complete, all regulatory approvals obtained\\n\\n**Level 2 (Tactical Components)** - ✅ **ON TRACK**:\\n• **11/11 tactical components** successfully executed\\n• **Market Research**: 100% - Comprehensive user insights delivered\\n• **UI/UX Design**: 100% - Award-winning design system completed\\n• **AI Development**: 100% - Model exceeds performance targets (97% accuracy)\\n• **Mobile Development**: 95% - Apps submitted to stores, approval pending\\n• **Brand Identity**: 100% - Strong brand recognition achieved\\n• **Content Strategy**: 90% - Content calendar executing, high engagement\\n• **Launch Campaign**: 85% - Campaign live, exceeding reach targets\\n• **Partnership Outreach**: 100% - 4 strategic partnerships secured\\n• **Infrastructure Setup**: 100% - Scalable architecture deployed\\n• **Support System**: 100% - 24/7 support capability established\\n• **Privacy Compliance**: 100% - Full GDPR/CCPA compliance achieved\\n\\n**Key Performance Indicators**:\\n• **Timeline Performance**: 85% on schedule (within 4-week buffer)\\n• **Budget Performance**: 90% budget utilization ($2.25M of $2.5M)\\n• **Quality Metrics**: 100% quality gates passed, zero critical defects\\n• **Team Performance**: 95% team satisfaction, low turnover\\n• **Stakeholder Satisfaction**: 92% stakeholder approval rating\\n\\n**Hierarchical Planning Benefits Demonstrated**:\\n✓ **Goal Decomposition**: Complex 8-month project broken into manageable 2-week tasks\\n✓ **Multi-Level Abstraction**: Clear strategy-to-execution alignment across 3 levels\\n✓ **Dependency Management**: 12 critical dependencies successfully coordinated\\n✓ **Resource Allocation**: Optimal team and budget distribution across domains\\n✓ **Progress Tracking**: Real-time visibility from individual tasks to strategic goals\\n✓ **Risk Management**: Proactive risk identification and mitigation at all levels\\n✓ **Quality Assurance**: Systematic quality gates ensuring deliverable excellence\\n✓ **Stakeholder Alignment**: Clear communication and expectations at every level\\n\\n**Critical Success Factors**:\\n• **Clear Hierarchy**: Well-defined levels with appropriate granularity\\n• **Dependency Mapping**: Comprehensive understanding of task relationships\\n• **Resource Optimization**: Dynamic resource allocation based on critical path\\n• **Communication Framework**: Structured communication across all levels\\n• **Monitoring Systems**: Real-time tracking and proactive issue resolution\\n• **Quality Integration**: Quality considerations embedded at every planning level\\n• **Stakeholder Engagement**: Regular alignment and feedback incorporation\\n\\n**Project Outcomes**:\\n• **Product Launch**: AI-powered mobile app launched successfully\\n• **Market Entry**: Strong market position with 4 strategic partnerships\\n• **User Adoption**: Exceeding user acquisition targets by 25%\\n• **Business Impact**: Projected ROI of 340% within 18 months\\n• **Team Development**: Enhanced organizational capabilities in AI and mobile\\n\\n*Hierarchical planning successfully delivered complex AI mobile app project 85% on schedule and 90% on budget through systematic goal decomposition and multi-level coordination*'
    }
  ]
};