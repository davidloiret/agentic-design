export const patternDiagrams = {
  'cot': `graph TD
    A[Complex Problem] --> B[Break Down]
    B --> C[Step 1: Identify Key Components]
    C --> D[Step 2: Analyze Each Component]
    D --> E[Step 3: Synthesize Solution]
    E --> F[Final Answer]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style F fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style C fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff
    style D fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff
    style E fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff`,

  'tot': `graph TD
    A[Problem] --> B[Generate Multiple Approaches]
    B --> C[Branch 1: Method A]
    B --> D[Branch 2: Method B]
    B --> E[Branch 3: Method C]
    
    C --> F[Evaluate Outcome 1]
    D --> G[Evaluate Outcome 2]
    E --> H[Evaluate Outcome 3]
    
    F --> I{Best Path?}
    G --> I
    H --> I
    
    I -->|Yes| J[Continue with Best]
    I -->|No| K[Backtrack & Try New Branch]
    K --> B
    J --> L[Final Solution]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style L fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style I fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style B fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff
    style C fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style D fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style E fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style F fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style G fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style H fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style J fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style K fill:#dc2626,stroke:#ef4444,stroke-width:3px,color:#ffffff`,

  'self-correction': `graph LR
    A[Initial Response] --> B[Self-Review]
    B --> C{Issues Found?}
    C -->|Yes| D[Identify Problems]
    C -->|No| H[Final Output]
    D --> E[Generate Corrections]
    E --> F[Apply Improvements]
    F --> G[Revised Response]
    G --> B
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style H fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style C fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style B fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff
    style D fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style E fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style F fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style G fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff`,

  'palm': `graph TD
    A[Problem Statement] --> B[Analyze Requirements]
    B --> C{Needs Computation?}
    C -->|Yes| D[Generate Code]
    C -->|No| E[Direct Response]
    D --> F[Execute Code]
    F --> G[Get Results]
    G --> H[Interpret Output]
    H --> I[Format Response]
    E --> I
    I --> J[Final Answer]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style J fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style D fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style B fill:#7c3aed,stroke:#8b5cf6,stroke-width:3px,color:#ffffff
    style C fill:#0891b2,stroke:#06b6d4,stroke-width:3px,color:#ffffff
    style E fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style F fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style G fill:#be123c,stroke:#e11d48,stroke-width:3px,color:#ffffff
    style H fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style I fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'react': `graph TD
    A[Task] --> B[Thought: Plan Action]
    B --> C[Action: Use Tool]
    C --> D[Observation: Get Result]
    D --> E{Goal Achieved?}
    E -->|No| F[Thought: Next Step]
    E -->|Yes| G[Final Answer]
    F --> H[Action: Next Tool]
    H --> I[Observation: New Result]
    I --> E
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style G fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style F fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'cod': `graph TD
    A[Question] --> B[Model 1 Response]
    A --> C[Model 2 Response]
    A --> D[Model 3 Response]
    
    B --> E[Debate Round 1]
    C --> E
    D --> E
    
    E --> F[Model 1 Counter]
    E --> G[Model 2 Counter]
    E --> H[Model 3 Counter]
    
    F --> I[Final Consensus]
    G --> I
    H --> I
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style I fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style E fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'god': `graph TD
    A[Central Topic] --> B[Argument 1]
    A --> C[Argument 2] 
    A --> D[Argument 3]
    
    B --> E[Sub-argument 1.1]
    B --> F[Sub-argument 1.2]
    C --> G[Sub-argument 2.1]
    D --> H[Sub-argument 3.1]
    
    E -.->|supports| G
    F -.->|conflicts| H
    G -.->|extends| H
    
    E --> I[Consensus Cluster]
    G --> I
    H --> I
    I --> J[Final Decision]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style J fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style I fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'rlvr': `graph TD
    A[Problem] --> B[Allocate Thinking Time]
    B --> C[Generate Attempt 1]
    C --> D[Verify Solution]
    D --> E{Correct?}
    E -->|No| F[Learn from Error]
    E -->|Yes| G[Solution Found]
    F --> H[Adjust Approach]
    H --> I[Generate Attempt 2]
    I --> D
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style G fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style F fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'constitutional-ai': `graph TD
    A[User Input] --> B[Check Against Constitution]
    B --> C{Violates Principles?}
    C -->|Yes| D[Apply Safety Constraints]
    C -->|No| E[Process Normally]
    D --> F[Generate Safe Alternative]
    F --> G[Explain Limitations]
    E --> H[Generate Response]
    G --> I[Final Output]
    H --> I
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style I fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#ffebee
    style D fill:#ffebee`,

  'output-filtering': `graph LR
    A[Raw Output] --> B[Content Scanner]
    B --> C[Pattern Detection]
    C --> D{Inappropriate Content?}
    D -->|Yes| E[Block/Filter]
    D -->|No| F[Allow Through]
    E --> G[Generate Alternative]
    G --> H[Safe Output]
    F --> H
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style H fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style E fill:#ffebee`,

  'input-sanitization': `graph LR
    A[Raw Input] --> B[Detect Injection Attempts]
    B --> C[Remove Malicious Content]
    C --> D[Validate Structure]
    D --> E[Normalize Format]
    E --> F[Clean Input]
    F --> G[Process Safely]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style G fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#ffebee
    style C fill:#ffebee`,

  'confidence-thresholding': `graph TD
    A[Question] --> B[Generate Response]
    B --> C[Calculate Confidence]
    C --> D{Above Threshold?}
    D -->|Yes| E[Provide Answer]
    D -->|No| F[Express Uncertainty]
    F --> G[Suggest Alternatives]
    E --> H[Final Output]
    G --> H
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style H fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style C fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'sequential-chaining': `graph LR
    A[Input] --> B[Prompt 1]
    B --> C[Output 1]
    C --> D[Prompt 2]
    D --> E[Output 2]
    E --> F[Prompt 3]
    F --> G[Final Output]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style G fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#e3f2fd
    style D fill:#e3f2fd
    style F fill:#e3f2fd`,

  'parallel-chaining': `graph TD
    A[Input] --> B[Prompt 1]
    A --> C[Prompt 2]
    A --> D[Prompt 3]
    
    B --> E[Output 1]
    C --> F[Output 2]
    D --> G[Output 3]
    
    E --> H[Aggregator]
    F --> H
    G --> H
    H --> I[Combined Result]
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style I fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style H fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'conditional-chaining': `graph TD
    A[Input] --> B[Classifier]
    B --> C{Route Decision}
    C -->|Type A| D[Prompt A]
    C -->|Type B| E[Prompt B]
    C -->|Type C| F[Prompt C]
    
    D --> G[Output A]
    E --> H[Output B]
    F --> I[Output C]
    
    G --> J[Final Response]
    H --> J
    I --> J
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style J fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style B fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'feedback-chaining': `graph TD
    A[Initial Input] --> B[Generate Version 1]
    B --> C[Evaluate Quality]
    C --> D{Meets Standard?}
    D -->|No| E[Generate Feedback]
    D -->|Yes| F[Final Output]
    E --> G[Improve Version]
    G --> H[Generate Version 2]
    H --> C
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style F fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style E fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`,

  'hierarchical-chaining': `graph TD
    A[Main Task] --> B[Subtask 1]
    A --> C[Subtask 2]
    A --> D[Subtask 3]
    
    B --> E[Sub-subtask 1.1]
    B --> F[Sub-subtask 1.2]
    C --> G[Sub-subtask 2.1]
    
    E --> H[Result 1.1]
    F --> I[Result 1.2]
    G --> J[Result 2.1]
    D --> K[Result 3]
    
    H --> L[Aggregate 1]
    I --> L
    J --> M[Aggregate 2]
    
    L --> N[Final Result]
    M --> N
    K --> N
    
    style A fill:#1e40af,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style N fill:#059669,stroke:#10b981,stroke-width:3px,color:#ffffff
    style L fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff
    style M fill:#ea580c,stroke:#f97316,stroke-width:3px,color:#ffffff`
};