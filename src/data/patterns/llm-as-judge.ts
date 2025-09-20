import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const llmAsJudgePattern: PatternScenario = {
  id: 'llm-as-judge',
  title: 'LLM as Judge Pattern',
  description: 'Demonstrates using an LLM to evaluate, score, and rank multiple outputs',
  initialNodes: [
    {
      id: 'task',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Evaluation Task\n"Select best customer support response"' },
      style: { ...nodeStyle, minWidth: 320 }
    },
    // Multiple candidates to evaluate
    {
      id: 'candidate1',
      type: 'default',
      position: { x: 50, y: 160 },
      data: { label: 'Candidate A\n"I understand your frustration.\nLet me help you resolve this..."' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 }
    },
    {
      id: 'candidate2',
      type: 'default',
      position: { x: 280, y: 160 },
      data: { label: 'Candidate B\n"Thanks for contacting us.\nPlease hold while I check..."' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 }
    },
    {
      id: 'candidate3',
      type: 'default',
      position: { x: 510, y: 160 },
      data: { label: 'Candidate C\n"Your issue has been noted.\nTicket #12345 created."' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 }
    },
    {
      id: 'candidate4',
      type: 'default',
      position: { x: 740, y: 160 },
      data: { label: 'Candidate D\n"Sorry for the inconvenience.\nHave you tried restarting?"' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 200 }
    },
    // Judge LLM
    {
      id: 'judge-llm',
      type: 'default',
      position: { x: 375, y: 300 },
      data: { label: '⚖️ Judge LLM\nEvaluation & Scoring Engine' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 300 }
    },
    {
      id: 'evaluation-rubric',
      type: 'default',
      position: { x: 700, y: 300 },
      data: { label: '📋 Evaluation Rubric\n• Empathy (0-10)\n• Helpfulness (0-10)\n• Clarity (0-10)\n• Action-oriented (0-10)' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 200, fontSize: 11 }
    },
    // Individual evaluations
    {
      id: 'eval1',
      type: 'default',
      position: { x: 50, y: 420 },
      data: { label: 'Score A: 8.5/10\n✓ Empathetic\n✓ Helpful\n✓ Clear next steps' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 160 }
    },
    {
      id: 'eval2',
      type: 'default',
      position: { x: 240, y: 420 },
      data: { label: 'Score B: 6.0/10\n✓ Professional\n✗ Generic\n✗ No solution' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 160 }
    },
    {
      id: 'eval3',
      type: 'default',
      position: { x: 430, y: 420 },
      data: { label: 'Score C: 4.5/10\n✗ Impersonal\n✗ No empathy\n✓ Has ticket' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 }
    },
    {
      id: 'eval4',
      type: 'default',
      position: { x: 620, y: 420 },
      data: { label: 'Score D: 5.0/10\n✓ Apologetic\n✗ Unhelpful\n✗ Generic fix' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 160 }
    },
    // Ranking and comparison
    {
      id: 'ranking-engine',
      type: 'default',
      position: { x: 375, y: 540 },
      data: { label: '🏆 Ranking Engine\nComparative Analysis' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 250 }
    },
    {
      id: 'pairwise-comparison',
      type: 'default',
      position: { x: 650, y: 540 },
      data: { label: '🔄 Pairwise Comparison\nA vs B: A wins\nA vs C: A wins\nA vs D: A wins' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    },
    {
      id: 'final-ranking',
      type: 'default',
      position: { x: 375, y: 660 },
      data: { label: '📊 Final Ranking\n1st: Candidate A (8.5)\n2nd: Candidate B (6.0)\n3rd: Candidate D (5.0)\n4th: Candidate C (4.5)' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 }
    },
    // Decision and output
    {
      id: 'decision',
      type: 'default',
      position: { x: 375, y: 780 },
      data: { label: '✅ Decision\nSelect Candidate A\nConfidence: 85%' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 }
    },
    {
      id: 'output',
      type: 'default',
      position: { x: 375, y: 900 },
      data: { label: 'Selected Response\n"I understand your frustration..."\nWith detailed evaluation report' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 }
    },
    // Evaluation explanation
    {
      id: 'explanation',
      type: 'default',
      position: { x: 50, y: 780 },
      data: { label: '💭 Evaluation Reasoning\n"A shows genuine empathy,\noffers concrete help,\nmaintains professionalism"' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 200, fontSize: 11 }
    }
  ],
  initialEdges: [
    // Task to candidates
    {
      id: 'e-task-c1',
      source: 'task',
      target: 'candidate1',
      style: edgeStyle
    },
    {
      id: 'e-task-c2',
      source: 'task',
      target: 'candidate2',
      style: edgeStyle
    },
    {
      id: 'e-task-c3',
      source: 'task',
      target: 'candidate3',
      style: edgeStyle
    },
    {
      id: 'e-task-c4',
      source: 'task',
      target: 'candidate4',
      style: edgeStyle
    },
    // Candidates to judge
    {
      id: 'e-c1-judge',
      source: 'candidate1',
      target: 'judge-llm',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-c2-judge',
      source: 'candidate2',
      target: 'judge-llm',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-c3-judge',
      source: 'candidate3',
      target: 'judge-llm',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-c4-judge',
      source: 'candidate4',
      target: 'judge-llm',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-judge-rubric',
      source: 'judge-llm',
      target: 'evaluation-rubric',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    // Judge to evaluations
    {
      id: 'e-judge-eval1',
      source: 'judge-llm',
      target: 'eval1',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: '8.5'
    },
    {
      id: 'e-judge-eval2',
      source: 'judge-llm',
      target: 'eval2',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: '6.0'
    },
    {
      id: 'e-judge-eval3',
      source: 'judge-llm',
      target: 'eval3',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: '4.5'
    },
    {
      id: 'e-judge-eval4',
      source: 'judge-llm',
      target: 'eval4',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: '5.0'
    },
    // Evaluations to ranking
    {
      id: 'e-eval1-rank',
      source: 'eval1',
      target: 'ranking-engine',
      style: edgeStyle
    },
    {
      id: 'e-eval2-rank',
      source: 'eval2',
      target: 'ranking-engine',
      style: edgeStyle
    },
    {
      id: 'e-eval3-rank',
      source: 'eval3',
      target: 'ranking-engine',
      style: edgeStyle
    },
    {
      id: 'e-eval4-rank',
      source: 'eval4',
      target: 'ranking-engine',
      style: edgeStyle
    },
    {
      id: 'e-rank-pairwise',
      source: 'ranking-engine',
      target: 'pairwise-comparison',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-rank-final',
      source: 'ranking-engine',
      target: 'final-ranking',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-eval1-explain',
      source: 'eval1',
      target: 'explanation',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-final-decision',
      source: 'final-ranking',
      target: 'decision',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-decision-output',
      source: 'decision',
      target: 'output',
      style: { ...edgeStyle, stroke: '#059669' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Task Setup',
      description: 'Define the evaluation task and gather candidates to be judged.',
      input: 'Task: Select the best customer support response for an angry customer complaining about a delayed shipment.\n\nContext: Customer has been waiting 2 weeks, premium member, first complaint.',
      activeNodes: ['task'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Candidate Generation',
      description: 'Multiple response candidates are generated or provided for evaluation.',
      output: 'Four candidate responses generated:\n\nA: Empathetic and solution-focused\nB: Professional but generic\nC: Brief and transactional\nD: Apologetic but unhelpful\n\nEach represents different support styles.',
      activeNodes: ['task', 'candidate1', 'candidate2', 'candidate3', 'candidate4'],
      activeEdges: ['e-task-c1', 'e-task-c2', 'e-task-c3', 'e-task-c4']
    },
    {
      id: 'step3',
      title: 'Submit to Judge LLM',
      description: 'All candidates are submitted to the Judge LLM for evaluation.',
      input: 'Judge Prompt:\n"Evaluate these customer support responses based on:\n1. Empathy (understanding customer frustration)\n2. Helpfulness (providing solutions)\n3. Clarity (clear communication)\n4. Action-oriented (next steps)\n\nScore each 0-10 and explain your reasoning."',
      activeNodes: ['candidate1', 'candidate2', 'candidate3', 'candidate4', 'judge-llm'],
      activeEdges: ['e-c1-judge', 'e-c2-judge', 'e-c3-judge', 'e-c4-judge']
    },
    {
      id: 'step4',
      title: 'Load Evaluation Rubric',
      description: 'Judge LLM applies structured evaluation criteria to each candidate.',
      output: 'Evaluation Rubric Applied:\n\nEmpathy (0-10): Does the response acknowledge feelings?\nHelpfulness (0-10): Does it offer concrete solutions?\nClarity (0-10): Is the message clear and easy to understand?\nAction-oriented (0-10): Are next steps clearly defined?\n\nWeighted average: All criteria equally weighted',
      activeNodes: ['judge-llm', 'evaluation-rubric'],
      activeEdges: ['e-judge-rubric']
    },
    {
      id: 'step5',
      title: 'Individual Evaluations',
      description: 'Judge LLM evaluates each candidate against the rubric.',
      output: 'Evaluation Results:\n\nCandidate A: 8.5/10\n• Empathy: 9/10 "Shows genuine understanding"\n• Helpfulness: 9/10 "Offers multiple solutions"\n• Clarity: 8/10 "Clear and professional"\n• Action: 8/10 "Defines clear next steps"\n\nCandidate B: 6.0/10\n• Empathy: 5/10 "Generic acknowledgment"\n• Helpfulness: 6/10 "Vague on solutions"\n• Clarity: 7/10 "Professional but impersonal"\n• Action: 6/10 "Unclear timeline"\n\n[Continues for C and D...]',
      activeNodes: ['judge-llm', 'eval1', 'eval2', 'eval3', 'eval4'],
      activeEdges: ['e-judge-eval1', 'e-judge-eval2', 'e-judge-eval3', 'e-judge-eval4']
    },
    {
      id: 'step6',
      title: 'Generate Explanations',
      description: 'Judge provides detailed reasoning for the top-scored candidate.',
      output: 'Evaluation Reasoning for Candidate A:\n\n"This response excels because it:\n1. Opens with genuine empathy (\'I understand your frustration\')\n2. Acknowledges the specific issue (2-week delay)\n3. Takes responsibility without blame-shifting\n4. Offers concrete solutions (expedited shipping, refund option)\n5. Provides clear timeline and follow-up\n6. Maintains professional yet warm tone\n\nThis combination makes it most likely to de-escalate and satisfy the customer."',
      activeNodes: ['eval1', 'explanation'],
      activeEdges: ['e-eval1-explain']
    },
    {
      id: 'step7',
      title: 'Comparative Ranking',
      description: 'Scores are compared and candidates are ranked.',
      output: 'Ranking Process:\n\n1. Score-based ordering:\n   A: 8.5 → Rank 1\n   B: 6.0 → Rank 2\n   D: 5.0 → Rank 3\n   C: 4.5 → Rank 4\n\n2. Confidence check:\n   Gap between 1st and 2nd: 2.5 points\n   Significant difference → High confidence\n\n3. Consistency verification:\n   All criteria favor A → Consistent winner',
      activeNodes: ['eval1', 'eval2', 'eval3', 'eval4', 'ranking-engine'],
      activeEdges: ['e-eval1-rank', 'e-eval2-rank', 'e-eval3-rank', 'e-eval4-rank']
    },
    {
      id: 'step8',
      title: 'Pairwise Comparison',
      description: 'Optional pairwise comparison for validation of ranking.',
      output: 'Pairwise Comparisons:\n\nA vs B: A wins (better empathy, clearer solutions)\nA vs C: A wins (more helpful, action-oriented)\nA vs D: A wins (more professional, specific)\nB vs C: B wins (more professional)\nB vs D: B wins (clearer communication)\nC vs D: D wins (shows some empathy)\n\nConfirmed ranking: A > B > D > C',
      activeNodes: ['ranking-engine', 'pairwise-comparison'],
      activeEdges: ['e-rank-pairwise']
    },
    {
      id: 'step9',
      title: 'Final Ranking',
      description: 'Produce final ranking with scores and confidence levels.',
      output: 'Final Ranking Report:\n\n🥇 1st Place: Candidate A\n   Score: 8.5/10\n   Strengths: Empathy, solutions, clarity\n\n🥈 2nd Place: Candidate B\n   Score: 6.0/10\n   Adequate but generic\n\n🥉 3rd Place: Candidate D\n   Score: 5.0/10\n   Shows effort but unhelpful\n\n4th Place: Candidate C\n   Score: 4.5/10\n   Too transactional',
      activeNodes: ['ranking-engine', 'final-ranking'],
      activeEdges: ['e-rank-final']
    },
    {
      id: 'step10',
      title: 'Decision and Output',
      description: 'Select the best candidate and provide the final output.',
      output: 'Decision Summary:\n\n✅ Selected: Candidate A\n📊 Score: 8.5/10\n🎯 Confidence: 85%\n\nSelected Response:\n"I understand your frustration with the 2-week delay. As a premium member, you deserve better service. Let me immediately expedite a replacement shipment at no cost, which will arrive within 2 days. I\'m also processing a 20% credit for the inconvenience. Would you prefer the replacement or a full refund?"\n\nJudge Certification: This response best serves customer needs.',
      activeNodes: ['final-ranking', 'decision', 'output'],
      activeEdges: ['e-final-decision', 'e-decision-output']
    }
  ]
};