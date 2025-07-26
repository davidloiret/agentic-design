import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const chainOfThoughtPattern: PatternScenario = {
  id: 'cot',
  title: 'Chain of Thought (CoT) Reasoning',
  description: `A fundamental AI reasoning technique that breaks complex problems into explicit, step-by-step reasoning processes, enabling transparent and verifiable problem-solving through sequential decomposition and intermediate verification.

Chain of Thought (CoT) reasoning represents a paradigm shift in how AI systems approach complex problems. Rather than jumping directly to conclusions, CoT enables models to work through problems step-by-step, making their reasoning process explicit and verifiable.

**Core Principles:**
• **Sequential Decomposition**: Breaking complex problems into manageable sub-steps
• **Transparent Reasoning**: Making each step of the thinking process visible
• **Intermediate Verification**: Validating conclusions at each stage
• **Cumulative Problem Solving**: Building final solutions from verified intermediate steps

**Why CoT Matters:**
This approach mirrors human System 2 thinking (deliberate, analytical) and addresses critical limitations of traditional AI systems, including the "leap to conclusion" problem, lack of transparency, and difficulty with multi-step reasoning tasks.

**Key Applications:**
- Mathematical problem solving and complex calculations
- Logical reasoning and multi-step inference
- Educational tutoring and explanation systems  
- High-stakes decision making requiring transparency
- Scientific reasoning and hypothesis testing
- Code analysis and debugging processes`,

  initialNodes: [
    {
      id: '1',
      type: 'default',
      position: { x: 100, y: 50 },
      data: { 
        label: 'Complex Problem\n"Calculate the compound interest on $5,000\ninvested at 6% annually for 3 years,\nthen determine monthly payments\nfor a 5-year loan of that amount at 4%"' 
      },
      style: { ...nodeStyle, minWidth: 280, backgroundColor: '#ef4444', color: 'white' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 100, y: 200 },
      data: { label: 'Problem Analysis\n& Decomposition' },
      style: { ...nodeStyle, backgroundColor: '#3b82f6', color: 'white' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 50, y: 350 },
      data: { label: 'Step 1: Compound Interest\nA = P(1 + r)^t\nA = 5000(1 + 0.06)^3' },
      style: { ...nodeStyle, minWidth: 200, backgroundColor: '#8b5cf6', color: 'white' }
    },
    {
      id: '4',
      type: 'default',
      position: { x: 300, y: 350 },
      data: { label: 'Step 2: Calculate Final Amount\nA = 5000 × 1.191016\nA = $5,955.08' },
      style: { ...nodeStyle, minWidth: 200, backgroundColor: '#8b5cf6', color: 'white' }
    },
    {
      id: '5',
      type: 'default',
      position: { x: 50, y: 500 },
      data: { label: 'Step 3: Loan Payment Formula\nPMT = P[r(1+r)^n]/[(1+r)^n-1]\nr = 0.04/12, n = 60 months' },
      style: { ...nodeStyle, minWidth: 220, backgroundColor: '#10b981', color: 'white' }
    },
    {
      id: '6',
      type: 'default',
      position: { x: 300, y: 500 },
      data: { label: 'Step 4: Calculate Payment\nPMT = 5955.08 × 0.0184\nPMT = $109.57/month' },
      style: { ...nodeStyle, minWidth: 200, backgroundColor: '#10b981', color: 'white' }
    },
    {
      id: '7',
      type: 'default',
      position: { x: 175, y: 650 },
      data: { label: 'Final Solution\nCompound Interest: $5,955.08\nMonthly Payment: $109.57\n\n✓ Verified through step-by-step calculation' },
      style: { ...nodeStyle, minWidth: 250, backgroundColor: '#059669', color: 'white' }
    }
  ],
  
  initialEdges: [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      style: edgeStyle,
      label: 'Analyze'
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      style: edgeStyle,
      label: 'Decompose'
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      style: edgeStyle
    },
    {
      id: 'e3-5',
      source: '3',
      target: '5',
      style: edgeStyle,
      label: 'Sequential'
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      style: edgeStyle,
      label: 'Process'
    },
    {
      id: 'e5-7',
      source: '5',
      target: '7',
      style: edgeStyle,
      label: 'Synthesize'
    },
    {
      id: 'e6-7',
      source: '6',
      target: '7',
      style: edgeStyle
    }
  ],
  
  steps: [
          {
        id: 'step1',
        title: 'Problem Presentation',
        description: 'AI receives a complex, multi-part financial problem requiring sequential calculations and different mathematical concepts. This problem demonstrates CoT\'s strength with multi-step problems that require different formulas and intermediate results to reach the final solution.',
        input: 'Calculate compound interest on $5,000 at 6% for 3 years, then determine monthly payments for a 5-year loan of that amount at 4%',
        activeNodes: ['1'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Problem Analysis & Decomposition',
        description: 'The AI recognizes this requires breaking down into distinct, sequential sub-problems rather than attempting a direct solution. CoT shines here by explicitly identifying the logical dependencies: the loan amount depends on the compound interest calculation result.',
        input: 'Multi-part problem requiring: 1) Compound interest calculation, 2) Loan payment calculation using result from step 1',
        activeNodes: ['1', '2'],
        activeEdges: ['e1-2']
      },
      {
        id: 'step3',
        title: 'Step 1: Apply Compound Interest Formula',
        description: 'Calculate the future value using the compound interest formula A = P(1 + r)^t with clearly stated variables. Each mathematical step is explicit, showing formula application and intermediate calculations for verification.',
        input: 'Principal (P) = $5,000, Rate (r) = 6% = 0.06, Time (t) = 3 years',
        output: 'A = 5000(1 + 0.06)^3 = 5000 × 1.191016',
        activeNodes: ['3'],
        activeEdges: ['e2-3']
      },
      {
        id: 'step4',
        title: 'Step 2: Complete Interest Calculation',
        description: 'Execute the calculation to determine the final amount after compound interest. The intermediate result is clearly stated and will be used as input for the next phase of the problem.',
        input: 'A = 5000 × 1.191016',
        output: 'Final Amount = $5,955.08',
        activeNodes: ['4'],
        activeEdges: ['e2-4']
      },
      {
        id: 'step5',
        title: 'Step 3: Set Up Loan Payment Formula',
        description: 'Apply the monthly payment formula using the compound interest result as the loan principal. The reasoning shows how results from previous steps feed into subsequent calculations, demonstrating problem interdependency.',
        input: 'Loan Amount = $5,955.08, Annual Rate = 4%, Term = 5 years (60 months)',
        output: 'PMT = P[r(1+r)^n]/[(1+r)^n-1] where r = 0.04/12 = 0.003333, n = 60',
        activeNodes: ['5'],
        activeEdges: ['e3-5']
      },
      {
        id: 'step6',
        title: 'Step 4: Calculate Monthly Payment',
        description: 'Execute the loan payment calculation with the derived values. The final calculation step shows precise mathematical execution with clearly traceable logic.',
        input: 'PMT = 5955.08 × [0.003333(1.003333)^60]/[(1.003333)^60-1]',
        output: 'PMT = 5955.08 × 0.0184 = $109.57 per month',
        activeNodes: ['6'],
        activeEdges: ['e4-6']
      },
      {
        id: 'step7',
        title: 'Solution Synthesis & Verification',
        description: 'Combine results from both calculation phases and verify the logical consistency of the complete solution. CoT enables verification by showing all work, allowing checking of both individual steps and overall logical flow. The solution includes context about what the numbers mean.',
        output: 'Complete Solution:\n• Compound Interest Result: $5,955.08 (original $5,000 grew by $955.08)\n• Monthly Loan Payment: $109.57 for 60 months\n• Total loan payments: $6,574.20\n• Verification: Payment calculations based on compound interest result ✓',
        activeNodes: ['7'],
        activeEdges: ['e5-7', 'e6-7']
      }
  ]
};