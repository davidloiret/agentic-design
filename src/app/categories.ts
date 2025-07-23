export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  parent?: string;
  children?: string[];
  detailedDescription?: string;
  useCases?: string[];
  whyImportant?: string;
  implementationGuide?: {
    whenToUse: string[];
    bestPractices: string[];
    commonPitfalls: string[];
  };
  techniques?: string[];
}

export const categories: Category[] = [
  { id: 'all', name: 'All Patterns', icon: '🔮', description: 'View all available patterns' },
  { 
    id: 'reasoning', 
    name: 'Reasoning Patterns', 
    icon: '🧠', 
    description: 'Advanced reasoning and thinking techniques',
    detailedDescription: 'Reasoning patterns represent sophisticated cognitive frameworks that enable AI systems to process complex information through structured, multi-layered approaches. These methodologies transform how intelligent agents handle challenging tasks by implementing explicit reasoning chains, systematic problem decomposition, and iterative refinement processes. Unlike traditional single-pass responses, these patterns encourage deeper computational investment during inference, allowing systems to explore multiple solution pathways, validate intermediate conclusions, and self-correct when necessary. The fundamental advantage lies in their ability to make the reasoning process transparent and traceable, which is crucial for building trustworthy AI systems. Modern reasoning patterns also incorporate dynamic resource allocation, where computational effort scales with problem complexity, ensuring optimal performance across diverse scenarios.',
    useCases: [
      'Multi-Step Research & Analysis: Enable systematic investigation of complex topics by breaking down research questions into manageable components, synthesizing information from multiple sources, and building comprehensive knowledge maps with traceable reasoning chains.',
      'Mathematical & Scientific Problem Solving: Transform complex equations and scientific challenges into step-by-step solutions, with each intermediate calculation verified and explained, supporting both educational understanding and practical computation.',
      'Software Architecture & Code Review: Guide the design of complex systems through structured analysis of requirements, constraints, and trade-offs, while providing detailed explanations for architectural decisions and code optimization strategies.',
      'Business Strategy & Decision Making: Support executive decision-making by systematically evaluating market conditions, competitive landscapes, and strategic options, with clear reasoning trails for stakeholder communication and future reference.',
      'Creative Content Development: Enhance creative workflows by exploring multiple narrative paths, character development arcs, or design concepts, allowing for iterative refinement and collaborative brainstorming with transparent creative reasoning.',
      'Educational Curriculum Design: Structure learning experiences by breaking down complex subjects into progressive learning objectives, with clear reasoning for pedagogical choices and adaptive pathways for different learning styles.',
      'Risk Assessment & Compliance: Systematically evaluate potential risks, regulatory requirements, and mitigation strategies across various domains, providing audit trails and justification for compliance decisions.',
      'Product Development & Innovation: Guide innovation processes through structured exploration of user needs, technical feasibility, and market opportunities, with documented reasoning for feature prioritization and development decisions.'
    ],
    whyImportant: 'Reasoning patterns are fundamental to building trustworthy AI systems because they bridge the gap between raw computational power and human-like problem-solving. They address the critical challenge of AI interpretability by making decision processes transparent and auditable. In high-stakes applications, understanding how an AI system reached its conclusion is as important as the conclusion itself. These patterns enable AI systems to handle novel situations more effectively by providing structured approaches to break down unfamiliar problems into familiar components, while ensuring reliable performance through systematic validation and iterative refinement.',
    implementationGuide: {
      whenToUse: [
        'Complex, multi-faceted problems requiring systematic decomposition and analysis',
        'Applications where decision transparency and auditability are legally or ethically required',
        'Tasks benefiting from iterative refinement and self-correction capabilities',
        'Integration scenarios involving multiple information sources or external tools',
        'Educational contexts where demonstrating reasoning processes enhances learning outcomes',
        'High-stakes decisions where confidence estimation and uncertainty quantification are critical'
      ],
      bestPractices: [
        'Define clear problem boundaries and success criteria before starting the reasoning process',
        'Implement validation checkpoints at each major reasoning step to catch errors early',
        'Use confidence scoring to dynamically allocate computational resources based on problem complexity',
        'Maintain detailed documentation of reasoning chains for debugging and improvement',
        'Test patterns across diverse problem domains to ensure generalizability and robustness',
        'Design graceful degradation strategies for when reasoning chains become computationally expensive',
        'Balance transparency with efficiency - not every step needs explicit documentation'
      ],
      commonPitfalls: [
        'Over-engineering simple problems that could be solved with direct approaches',
        'Skipping intermediate validation steps, allowing errors to propagate through the reasoning chain',
        'Failing to set appropriate stopping criteria for iterative processes, leading to infinite loops',
        'Ignoring computational cost versus accuracy trade-offs in resource-constrained environments',
        'Not adapting reasoning depth to match the specific problem context and requirements',
        'Mixing incompatible reasoning paradigms without clear transition mechanisms'
      ]
    },
    techniques: ['cot', 'tot', 'self-correction', 'palm', 'react', 'cod', 'god', 'rlvr']
  },
  { 
    id: 'safety', 
    name: 'Guardrails & Safety', 
    icon: '🛡️', 
    description: 'Safety measures and content filtering',
    children: ['input-validation', 'output-filtering'],
    detailedDescription: 'Safety patterns are essential for deploying AI systems responsibly in production environments. These patterns focus on preventing harmful outputs, protecting against malicious inputs, and ensuring reliable behavior under various conditions. They form the defensive layer that makes AI systems trustworthy and suitable for real-world applications where safety and reliability are paramount.',
    useCases: [
      'Content Moderation: Automatically detecting and filtering inappropriate, harmful, or policy-violating content in user-generated text, images, or other media',
      'Brand Safety: Ensuring AI-generated content aligns with brand values and doesn\'t produce outputs that could damage reputation or violate compliance requirements',
      'Prompt Injection Defense: Protecting against malicious attempts to override system instructions or extract sensitive information through crafted inputs',
      'High-Stakes Decision Support: Providing safety nets for AI systems used in critical applications like healthcare, finance, or autonomous systems',
      'Regulatory Compliance: Meeting industry standards and legal requirements for AI safety in regulated sectors',
      'User Protection: Safeguarding users from potentially harmful or misleading AI-generated advice or information'
    ]
  },
  { 
    id: 'input-validation', 
    name: 'Input Validation', 
    icon: '🔍', 
    description: 'Validate and sanitize inputs',
    parent: 'safety'
  },
  { 
    id: 'output-filtering', 
    name: 'Output Filtering', 
    icon: '🚧', 
    description: 'Filter and moderate outputs',
    parent: 'safety'
  },
  { 
    id: 'chaining', 
    name: 'Prompt Chaining', 
    icon: '🔗', 
    description: 'Multi-step prompt orchestration patterns',
    children: ['sequential', 'parallel', 'conditional'],
    detailedDescription: 'Prompt chaining patterns enable the creation of sophisticated AI workflows by connecting multiple prompts in various configurations. These patterns allow for complex task decomposition, parallel processing, and dynamic routing based on conditions. By chaining prompts together, developers can create AI systems that handle multi-step processes, maintain context across interactions, and achieve more reliable results than single-prompt approaches.',
    useCases: [
      'Content Creation Pipelines: Orchestrating research, drafting, editing, and formatting phases in automated content generation workflows',
      'Data Processing Workflows: Breaking down complex data analysis tasks into sequential steps like cleaning, analysis, visualization, and reporting',
      'Decision Support Systems: Creating multi-stage evaluation processes that consider various factors before making recommendations',
      'Quality Assurance: Implementing multi-step validation and improvement cycles for AI-generated outputs',
      'Research Automation: Coordinating information gathering, synthesis, and analysis across multiple sources and perspectives',
      'Customer Service Flows: Managing complex customer interactions through routing, escalation, and specialized handling patterns'
    ]
  },
  { 
    id: 'sequential', 
    name: 'Sequential Chaining', 
    icon: '➡️', 
    description: 'Step-by-step sequential execution',
    parent: 'chaining'
  },
  { 
    id: 'parallel', 
    name: 'Parallel Chaining', 
    icon: '⚡', 
    description: 'Concurrent parallel execution',
    parent: 'chaining'
  },
  { 
    id: 'conditional', 
    name: 'Conditional Chaining', 
    icon: '🔀', 
    description: 'Dynamic branching logic',
    parent: 'chaining'
  }
];
