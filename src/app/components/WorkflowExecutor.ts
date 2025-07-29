import { 
  WorkflowPattern, 
  WorkflowExecution, 
  StepExecution, 
  getWorkflowPattern, 
  getWorkflowStepPrompt 
} from './PatternConfigurations';

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  costPer1kTokens: number;
  speedRating: number;
  qualityRating: number;
}

export class WorkflowExecutor {
  private generateStepOutput(
    stepPrompt: string, 
    model: ModelConfig, 
    patternId: string, 
    stepId: string
  ): string {
    // Simulate AI response based on the step type and model
    // In a real implementation, this would call the actual AI model
    
    const baseDelay = 1000 + Math.random() * 2000; // Simulate processing time
    const tokensUsed = Math.floor(150 + Math.random() * 300);
    
    // Generate step-specific output based on pattern and step
    if (patternId === 'graph-of-thought') {
      switch (stepId) {
        case 'decompose':
          return this.generateDecompositionOutput(stepPrompt);
        case 'explore_paths':
          return this.generateExplorationOutput(stepPrompt);
        case 'evaluate_connections':
          return this.generateEvaluationOutput(stepPrompt);
        case 'synthesize':
          return this.generateSynthesisOutput(stepPrompt);
        default:
          return `[Generated output for ${stepId} step]`;
      }
    } else if (patternId === 'multi-agent-debate') {
      switch (stepId) {
        case 'assign_roles':
          return this.generateRoleAssignmentOutput(stepPrompt);
        case 'initial_positions':
          return this.generateInitialPositionsOutput(stepPrompt);
        case 'debate_rounds':
          return this.generateDebateRoundsOutput(stepPrompt);
        case 'consensus_solution':
          return this.generateConsensusOutput(stepPrompt);
        default:
          return `[Generated output for ${stepId} step]`;
      }
    }
    
    return `[Generated response for ${stepId} using ${model.name}]\n\n${stepPrompt.substring(0, 200)}...`;
  }

  private generateDecompositionOutput(prompt: string): string {
    return `## Problem Decomposition Analysis

**Core Components:**
1. **Technical Requirements** - System architecture, scalability needs, integration points
2. **User Experience** - Interface design, usability considerations, accessibility
3. **Business Logic** - Rules, workflows, data processing requirements
4. **Infrastructure** - Hosting, security, performance considerations
5. **Stakeholder Needs** - Different user types, admin requirements, reporting needs

**Different Perspectives:**
• **Developer Perspective**: Technical feasibility, maintainability, development time
• **User Perspective**: Ease of use, functionality, reliability
• **Business Perspective**: Cost, ROI, competitive advantage, compliance
• **Operations Perspective**: Monitoring, support, scalability, security

**Key Constraints:**
- Time to market limitations
- Budget constraints
- Technical skill availability
- Regulatory compliance requirements
- Integration with existing systems

**Success Criteria:**
- Functional requirements met within timeline
- User adoption targets achieved
- Performance benchmarks satisfied
- Budget adherence maintained
- Quality standards upheld`;
  }

  private generateExplorationOutput(prompt: string): string {
    return `## Multi-Path Exploration

**Aspect 1: Technical Architecture**
Path A: Monolithic Architecture
- Single deployable unit with all functionality
- Simpler development and testing
- Easier initial deployment and monitoring
- May face scalability challenges later

Path B: Microservices Architecture  
- Distributed system with independent services
- Better scalability and fault isolation
- More complex deployment and monitoring
- Requires stronger DevOps capabilities

Path C: Hybrid Approach
- Core functionality in monolith, auxiliary services separate
- Gradual migration path to microservices
- Balanced complexity and scalability
- Allows learning and iteration

**Aspect 2: User Interface Approach**
Path A: Traditional Web Application
- Server-side rendering with progressive enhancement
- Better SEO and initial load performance
- Simpler caching strategies
- May feel less responsive for complex interactions

Path B: Single Page Application (SPA)
- Rich client-side interactions
- Better user experience for complex workflows
- More complex state management
- Potential SEO and accessibility challenges

Path C: Progressive Web App (PWA)
- Combines benefits of web and native apps
- Offline functionality and push notifications
- Works across all platforms
- Requires additional development effort

**Aspect 3: Data Management Strategy**
Path A: Relational Database (SQL)
- ACID compliance and strong consistency
- Mature tooling and expertise available
- Well-understood query patterns
- May not scale as well for certain use cases

Path B: NoSQL Database
- Better horizontal scaling potential
- Flexible schema for evolving requirements
- Better performance for specific use cases
- Less mature tooling and expertise

Path C: Polyglot Persistence
- Use different databases for different needs
- Optimize each data store for its use case
- More complex data synchronization
- Requires expertise in multiple technologies`;
  }

  private generateEvaluationOutput(prompt: string): string {
    return `## Cross-Path Evaluation & Connections

**Path Evaluations:**

**Technical Architecture Paths:**
- Monolithic (7/10): Simple to start, proven approach, but limited long-term scalability
- Microservices (6/10): Excellent scalability, but high complexity overhead for smaller teams
- Hybrid (8/10): Best balance of simplicity and growth potential

**UI Approach Paths:**
- Traditional Web (7/10): Reliable, SEO-friendly, but limited interactivity
- SPA (7/10): Great UX potential, but complexity in SEO and state management
- PWA (8/10): Modern capabilities with broad compatibility, worth the extra effort

**Data Strategy Paths:**
- SQL (8/10): Proven, reliable, good tooling - solid choice for most use cases
- NoSQL (6/10): Great for specific scenarios, but adds complexity without clear benefit
- Polyglot (5/10): Powerful but over-engineered for most projects at this stage

**Connections & Synergies:**
✅ **Strong Synergies:**
- Hybrid Architecture + PWA: Both emphasize progressive enhancement
- SQL Database + Traditional Web: Mature, well-integrated toolchain
- Monolithic start + Hybrid approach: Natural evolution path

⚠️ **Potential Conflicts:**
- Microservices + Small team: Operational overhead may overwhelm development capacity
- NoSQL + Traditional Web: Mismatch in technology philosophy and tooling
- Complex data strategy + Simple architecture: Inconsistent complexity levels

**Emerging Patterns:**
1. **Progressive Complexity**: Start simple, add sophistication as needed
2. **Developer Experience**: Choose technologies team can execute well
3. **User-Centric Decisions**: Prioritize user value over technical elegance
4. **Future-Proofing**: Select approaches that allow graceful evolution

**Most Promising Combinations:**
1. **Hybrid Architecture + PWA + SQL** (Score: 8.5/10)
2. **Monolithic + PWA + SQL** (Score: 8.0/10)  
3. **Hybrid Architecture + Traditional Web + SQL** (Score: 7.5/10)`;
  }

  private generateSynthesisOutput(prompt: string): string {
    return `## Integrated Solution Strategy

Based on the comprehensive analysis across all dimensions, here's the synthesized approach:

### **Recommended Architecture: Progressive Hybrid Approach**

**Phase 1: Monolithic Foundation (Months 1-3)**
- Start with a well-structured monolithic application
- Use clean architecture principles to prepare for future modularization
- Implement core functionality with proven, stable technologies
- Focus on user value delivery and market validation

**Phase 2: Strategic Separation (Months 4-8)**
- Extract high-load or independent services (auth, notifications, file processing)
- Maintain core business logic in the monolith
- Implement proper API boundaries and monitoring
- Learn microservices patterns in lower-risk contexts

**Phase 3: Selective Scaling (Months 9+)**
- Evaluate which components truly benefit from separation
- Extract services based on data-driven scaling needs
- Maintain simplicity where it serves the business

### **Technology Stack Integration:**

**Frontend: Progressive Web App**
- Start with server-side rendering for SEO and performance
- Add progressive enhancement for rich interactions
- Implement service workers for offline capability
- Ensure accessibility and cross-platform compatibility

**Backend: Node.js/Python with Clean Architecture**
- Modular design within monolith structure
- Clear separation of concerns (API, business logic, data access)
- Comprehensive testing strategy
- Monitoring and observability from day one

**Database: PostgreSQL with Strategic Caching**
- Relational database for core business data
- Redis for session management and caching
- Consider read replicas as scale demands increase
- Document-based storage (PostgreSQL JSON) for flexible schema needs

### **Implementation Strategy:**

**Week 1-2: Foundation Setup**
- Project structure and development environment
- CI/CD pipeline and testing framework
- Database schema design and migration system
- Basic authentication and authorization

**Week 3-6: Core Functionality**
- Primary user workflows and business logic
- API design and implementation
- Basic frontend with server-side rendering
- Integration testing suite

**Week 7-10: Progressive Enhancement**
- Client-side interactivity and state management
- PWA features (service worker, offline support)
- Performance optimization and caching
- Security hardening and accessibility audit

**Week 11-12: Launch Preparation**
- Production deployment and monitoring setup
- Load testing and performance validation
- User acceptance testing and feedback incorporation
- Documentation and support materials

### **Risk Mitigation:**

**Technical Risks:**
- Start with proven technologies to reduce unknowns
- Implement feature flags for safe rollouts
- Maintain comprehensive test coverage
- Plan for database migration strategies

**Business Risks:**
- Focus on MVP to validate market fit quickly
- Build analytics to understand user behavior
- Design for iterative improvement based on feedback
- Keep architecture flexible for pivot scenarios

**Operational Risks:**
- Implement monitoring and alerting from day one
- Plan for scaling bottlenecks before they occur
- Document deployment and operational procedures
- Cross-train team members on critical systems

### **Success Metrics:**

**Technical Metrics:**
- Page load times < 2 seconds
- 99.5% uptime after initial stabilization
- Automated test coverage > 80%
- Deployment time < 10 minutes

**Business Metrics:**
- User onboarding completion rate > 70%
- Feature adoption rates tracking to goals
- Customer satisfaction scores > 4.0/5.0
- Support ticket volume manageable by team

This integrated approach balances immediate delivery needs with long-term scalability, providing a clear path forward while maintaining the flexibility to adapt based on real-world usage and business evolution.`;
  }

  private generateRoleAssignmentOutput(prompt: string): string {
    return `## Agent Role Assignment for Debate

**Agent 1: Technical Architect**
- **Role**: Senior Software Architect with 15+ years experience
- **Background**: Deep expertise in system design, scalability, and technical debt management
- **Key Concerns**: Code maintainability, system performance, technical feasibility, long-term architecture
- **Likely Stance**: Will advocate for robust, scalable solutions even if they require more upfront investment
- **Potential Biases**: May over-engineer solutions; might underestimate business timeline pressures

**Agent 2: Product Manager** 
- **Role**: Product Management Director focused on user outcomes and business metrics
- **Background**: MBA with experience launching consumer and B2B products, data-driven decision making
- **Key Concerns**: User experience, time-to-market, competitive positioning, ROI measurement
- **Likely Stance**: Will push for fastest path to user value, even if it means accepting technical compromises
- **Potential Biases**: May underestimate technical complexity; might sacrifice long-term stability for short-term gains

**Agent 3: Engineering Manager**
- **Role**: Head of Engineering responsible for team productivity and delivery
- **Background**: Former senior developer turned manager, experienced in team scaling and process optimization
- **Key Concerns**: Team capacity, developer experience, sustainable development pace, code quality
- **Likely Stance**: Will balance technical quality with team capabilities and realistic timelines
- **Potential Biases**: May be overly protective of team workload; might resist changes that disrupt established workflows

**Agent 4: DevOps/Infrastructure Specialist**
- **Role**: Site Reliability Engineer with cloud infrastructure expertise
- **Background**: Deep experience in production systems, monitoring, security, and operational excellence
- **Key Concerns**: System reliability, security, operational complexity, incident response, cost optimization
- **Likely Stance**: Will advocate for operational simplicity and proven deployment patterns
- **Potential Biases**: May resist new technologies due to operational risk; might over-emphasize stability over innovation`;
  }

  private generateInitialPositionsOutput(prompt: string): string {
    return `## Initial Position Statements

**Technical Architect Position:**
"We need to prioritize architectural soundness from the beginning. I recommend starting with a microservices architecture using containerized deployments on Kubernetes. While this requires more upfront investment, it will save us significant technical debt and scaling challenges later. We should implement event-driven architecture with proper message queuing, comprehensive monitoring, and infrastructure as code. The additional complexity is justified by the flexibility and scalability it provides. We can't afford to build a monolith that we'll need to rewrite in 18 months when we hit scaling limitations. Modern development teams should embrace cloud-native patterns from day one.

My key success metrics focus on system performance, maintainability scores, and technical debt ratios. I anticipate pushback on timeline and complexity, but cutting corners on architecture always costs more in the long run. The team needs to invest time in proper design patterns, comprehensive testing strategies, and documentation that will pay dividends as the system evolves."

**Product Manager Position:**
"We need to get to market quickly with a solution that validates our core hypothesis and delivers immediate user value. I recommend a monolithic application using proven technologies that the team already knows well. Our primary goal should be launching an MVP within 8 weeks that allows us to gather real user feedback and iterate rapidly. We can always refactor later once we understand user needs better and have revenue to justify additional technical investment.

The biggest risk is over-engineering a solution before we understand the market fit. We should focus on core user workflows, implement basic analytics to understand behavior, and optimize for development velocity. Technical elegance is secondary to user adoption and business validation. We can hire more engineers and address technical debt once we've proven the business model. Speed to market and user feedback loops are more valuable than perfect architecture at this stage."

**Engineering Manager Position:**
"We need to balance architectural quality with team reality and delivery timelines. I propose a hybrid approach: start with a well-structured monolith that can evolve into microservices as specific scaling needs emerge. Our team of 4 developers doesn't have the operational expertise to manage complex distributed systems effectively yet. We should focus on clean code practices, comprehensive testing, and modular design within a simpler deployment model.

My main concerns are sustainable development pace and avoiding burnout. We can deliver quality software on reasonable timelines by choosing technologies the team can execute confidently. I recommend investing in developer tooling, automated testing, and deployment pipelines that will accelerate our velocity long-term while maintaining code quality. The architecture should grow with our team's capabilities and proven business needs rather than anticipating requirements we may never have."

**DevOps/Infrastructure Specialist Position:**
"We must prioritize operational simplicity and system reliability above all else. I strongly recommend a monolithic deployment on a single cloud provider with managed services for databases, caching, and monitoring. Complex distributed systems require significant operational expertise and tooling that we don't currently have. Every additional service multiplies our potential failure modes and incident response complexity.

Security and compliance should be built in from the beginning, not retrofitted later. We need proper access controls, encrypted communications, automated backups, and disaster recovery procedures. I'm concerned about proposals for microservices or event-driven architectures because they dramatically increase our operational surface area. We should prove we can operate one system reliably before adding the complexity of managing dozens of interconnected services. Reliability and security are not negotiable - they form the foundation that everything else builds upon."`;
  }

  private generateDebateRoundsOutput(prompt: string): string {
    return `## Debate Rounds

### **Round 1: Initial Critiques and Defenses**

**Technical Architect Critiques:**
*To Product Manager:* "Your speed-to-market focus ignores the compound cost of technical debt. A poorly architected system doesn't just slow down future development - it creates exponential maintenance costs and can prevent us from scaling when business demands it. The 'rewrite later' approach rarely works because businesses are reluctant to invest in rebuilding systems that appear to be working."

*To Engineering Manager:* "The hybrid approach sounds reasonable but often results in the worst of both worlds - monolithic complexity without distributed system benefits. Clean code within a monolith still faces fundamental scalability limitations."

*To DevOps Specialist:* "While operational simplicity has merit, managed services can become expensive at scale and may lock us into specific vendor patterns. We should invest in operational capabilities that give us more control and flexibility."

**Product Manager Critiques:**
*To Technical Architect:* "Your microservices proposal could delay our launch by months and requires skills our team doesn't currently have. We're optimizing for theoretical future problems while ignoring the immediate market opportunity. Many successful companies started with monoliths and scaled effectively."

*To Engineering Manager:* "The hybrid approach adds complexity without clear user benefit. We should optimize for shipping features that users want, not for theoretical future architectural concerns."

*To DevOps Specialist:* "I agree on operational simplicity, but we can't let perfect be the enemy of good. We need to balance risk management with business velocity."

**Engineering Manager Critiques:**
*To Technical Architect:* "Your proposal exceeds our team's current capabilities and would require significant hiring or training investment. We need solutions our current team can execute well, not ideal solutions they'll struggle with."

*To Product Manager:* "While speed is important, shipping broken or poorly performing software will hurt user adoption more than a slightly delayed launch with quality software."

*To DevOps Specialist:* "I appreciate the operational focus, but we also need to consider developer productivity. Overly restrictive infrastructure choices could slow down development cycles."

**DevOps Specialist Critiques:**
*To Technical Architect:* "Microservices require sophisticated monitoring, service mesh, and distributed tracing capabilities. Our current monitoring is basic, and complex architectures will make debugging production issues much harder."

*To Product Manager:* "Moving fast and breaking things works for some companies, but not when dealing with user data and business-critical systems. We need sustainable practices from day one."

*To Engineering Manager:* "The hybrid approach you propose will require us to solve both monolithic and distributed system problems simultaneously, increasing our operational complexity."

### **Round 2: Addressing Criticisms and Finding Common Ground**

**Areas of Emerging Agreement:**
- All agents agree that operational simplicity is valuable, especially for smaller teams
- Everyone acknowledges the importance of both user value delivery and system sustainability  
- There's consensus that the current team's capabilities should influence architectural decisions
- All parties agree that comprehensive testing and monitoring are essential

**Technical Architect Response:**
"I can concede that a full microservices approach may be premature for our current team size. However, I maintain that we need to design for modularity from the beginning. Perhaps we can start with a modular monolith that clearly separates concerns and could be split into services later when the team and operational capabilities mature."

**Product Manager Response:**
"I'm willing to invest slightly more time upfront if it genuinely prevents major rewrites later. The key is ensuring that architectural decisions don't significantly delay user value delivery. Could we define a clear timeline where architectural investment stops and feature development begins?"

**Engineering Manager Response:**
"I see merit in both perspectives. What if we focus on a clean, modular monolith with strong testing practices and clear service boundaries? This gives us architectural flexibility while staying within our operational capabilities."

**DevOps Specialist Response:**  
"I can support more sophisticated architectures if we pair them with appropriate operational tooling and practices. The key is not adding architectural complexity faster than we build operational maturity."

### **Round 3: Working Toward Integration**

**Converging Solution Elements:**
- Modular monolith architecture with clear service boundaries
- Comprehensive testing and CI/CD from day one
- Gradual complexity increase aligned with team capabilities
- Focus on delivering user value while maintaining quality
- Strong operational practices scaled appropriately to system complexity

**Final Positions:**
All agents are moving toward a pragmatic approach that balances immediate business needs with sustainable technical practices, recognizing that the best solution must work within current team constraints while allowing for future growth.`;
  }

  private generateConsensusOutput(prompt: string): string {
    return `## Consensus Solution: Pragmatic Modular Architecture

After extensive debate, our multi-agent analysis has converged on a balanced approach that satisfies the core concerns of all stakeholders:

### **Agreed-Upon Architecture: Evolutionary Modular Monolith**

**Core Principles:**
1. **Start Simple, Scale Thoughtfully**: Begin with a monolithic deployment that's internally modular
2. **Operational Capability Alignment**: Match architectural complexity to team operational maturity
3. **Value-Driven Decisions**: Prioritize user value delivery while maintaining sustainable practices
4. **Future-Proofed Design**: Create clear service boundaries that enable future distribution when needed

### **Technical Implementation Strategy:**

**Phase 1: Modular Monolith Foundation (Months 1-3)**
- Single deployable application with clear internal module boundaries
- Domain-driven design with well-defined interfaces between modules
- Comprehensive test coverage including integration and contract tests
- Basic monitoring, logging, and alerting infrastructure
- CI/CD pipeline with automated quality gates

**Phase 2: Operational Maturity Building (Months 4-6)**
- Enhanced monitoring with application performance metrics
- Distributed tracing preparation within the monolith
- Database optimization and potential read replica introduction
- Load testing and performance baseline establishment
- Team training on operational best practices

**Phase 3: Selective Service Extraction (Months 7+)**
- Extract services only when clear business value or scaling needs emerge
- Begin with stateless, well-bounded services (authentication, notifications)
- Implement proper service communication patterns and error handling
- Maintain most business logic in the monolith until scaling demands require separation

### **Compromise Solutions to Key Debates:**

**Addressing Technical Debt Concerns:**
- Implement strong code review processes and architectural decision records
- Allocate 20% of development time to refactoring and technical improvements
- Establish technical debt tracking and regular architectural health assessments
- Create clear criteria for when modular components should become separate services

**Balancing Speed vs. Quality:**
- Define "done" criteria that include testing, documentation, and monitoring
- Implement feature flags for safe, incremental rollouts
- Focus initial development on core user workflows with highest business value
- Plan regular technical review sessions to prevent accumulation of shortcuts

**Managing Operational Complexity:**
- Start with managed cloud services to minimize operational overhead
- Implement infrastructure as code from the beginning for reproducibility
- Establish incident response procedures and on-call rotations as the system matures
- Invest in operational tooling incrementally as system complexity increases

**Team Capability Development:**
- Pair experienced developers with less experienced team members on complex features
- Allocate budget for training and conference attendance in key technical areas
- Hire strategically to fill critical skill gaps (senior DevOps, frontend specialist)
- Document architectural decisions and maintain knowledge sharing practices

### **Success Metrics and Governance:**

**Technical Health Indicators:**
- Deployment frequency and lead time for changes
- Mean time to recovery from incidents
- Test coverage and code quality metrics
- Technical debt ratio and architectural fitness scores

**Business Value Metrics:**
- Feature delivery velocity and user adoption rates
- System reliability and user satisfaction scores
- Development team productivity and satisfaction
- Cost per feature and operational cost efficiency

**Decision-Making Framework:**
- Monthly architectural review sessions with all stakeholders
- Clear escalation paths for technical vs. business trade-off decisions
- Quarterly assessments of team capabilities vs. system complexity
- Annual strategic architecture planning aligned with business goals

### **Risk Mitigation Strategies:**

**Technical Risks:**
- Maintain clear service boundaries even within the monolith
- Implement comprehensive monitoring to detect issues early
- Keep deployment processes simple and reliable
- Plan for database scaling before it becomes critical

**Business Risks:**
- Focus on core user value rather than technical perfection
- Implement analytics to validate feature usage and business impact
- Maintain flexibility to pivot or adjust based on market feedback
- Balance feature development with platform stability

**Team Risks:**
- Avoid over-committing to complex technical solutions beyond team capabilities
- Invest in knowledge sharing and documentation to prevent single points of failure
- Plan for team growth and skill development aligned with system evolution
- Maintain sustainable development practices to prevent burnout

This consensus solution reflects the collective wisdom of our debate process, acknowledging that the best architecture is one that the team can execute effectively while delivering user value and maintaining the flexibility to evolve as business needs change.`;
  }

  async executeWorkflow(
    patternId: string,
    modelId: string,
    input: string,
    model: ModelConfig
  ): Promise<WorkflowExecution> {
    const workflow = getWorkflowPattern(patternId);
    if (!workflow) {
      throw new Error(`Workflow pattern ${patternId} not found`);
    }

    const executionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    const stepExecutions: StepExecution[] = [];
    const stepOutputs: Record<string, string> = { input }; // Start with original input
    
    // Execute steps in dependency order
    const executedSteps = new Set<string>();
    
    while (executedSteps.size < workflow.steps.length) {
      // Find next executable step (all dependencies satisfied)
      const executableStep = workflow.steps.find(step => 
        !executedSteps.has(step.id) && 
        step.inputMapping.every(dep => dep === 'input' || executedSteps.has(dep))
      );
      
      if (!executableStep) {
        throw new Error('Circular dependency detected in workflow steps');
      }
      
      // Prepare inputs for this step
      const stepInputs: Record<string, string> = {};
      executableStep.inputMapping.forEach(inputKey => {
        stepInputs[inputKey] = stepOutputs[inputKey] || '';
      });
      
      // Generate step prompt
      const stepPrompt = getWorkflowStepPrompt(patternId, executableStep.id, stepInputs);
      
      // Execute step (simulate AI processing)
      const stepStartTime = Date.now();
      const stepOutput = this.generateStepOutput(stepPrompt, model, patternId, executableStep.id);
      const stepEndTime = Date.now();
      
      // Record step execution
      const stepExecution: StepExecution = {
        stepId: executableStep.id,
        input: stepPrompt,
        output: stepOutput,
        timestamp: stepStartTime,
        tokensUsed: Math.floor(100 + Math.random() * 300),
        responseTime: stepEndTime - stepStartTime
      };
      
      stepExecutions.push(stepExecution);
      stepOutputs[executableStep.id] = stepOutput;
      executedSteps.add(executableStep.id);
    }
    
    const endTime = Date.now();
    const totalTokens = stepExecutions.reduce((sum, step) => sum + step.tokensUsed, 0);
    const totalCost = (totalTokens / 1000) * model.costPer1kTokens;
    
    return {
      id: executionId,
      patternId,
      modelId,
      originalInput: input,
      steps: stepExecutions,
      finalOutput: stepOutputs[workflow.finalOutputStep] || '',
      totalTime: endTime - startTime,
      totalTokens,
      totalCost
    };
  }
}

export const workflowExecutor = new WorkflowExecutor();