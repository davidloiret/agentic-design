import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const chainOfThoughtPattern: PatternScenario = {
  id: 'cot',
  title: 'Chain of Thought (CoT) Prompting',
  description: `A simple yet powerful prompting technique that dramatically improves reasoning by adding "Let's think step by step" or similar phrases to prompts, triggering systematic reasoning in language models.

Chain of Thought (CoT) is fundamentally a **prompting strategy**, not a complex system. By simply adding phrases like "Let's think step by step" to your prompt, you can trigger the model to break down problems systematically instead of jumping to conclusions.

**How It Works:**
• **Standard Prompt**: Direct question → Often incorrect answer
• **CoT Prompt**: Question + "Let's think step by step" → Step-by-step reasoning → Correct answer

**Key Insight:**
The same model, with the same capabilities, performs dramatically better just by adding a magic phrase. No special training, no complex architecture - just better prompting.

**Common CoT Phrases:**
- "Let's think step by step"
- "Let's break this down step by step"
- "Let's work through this systematically"
- "First, let me understand the problem. Then I'll solve it step by step."

**Applications:**
- Mathematical problems
- Logic puzzles
- Multi-step reasoning
- Complex analysis
- Any task requiring systematic thinking`,

  initialNodes: [
    {
      id: '1',
      type: 'default',
      position: { x: 250, y: 200 },
      data: {
        label: 'Problem:\n"If 5 machines make 5 widgets\nin 5 minutes, how long for\n100 machines to make 100 widgets?"'
      },
      style: { ...nodeStyle, minWidth: 260, backgroundColor: '#6366f1', color: 'white' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 100, y: 50 },
      data: { label: 'Standard Prompt:\nJust the question' },
      style: { ...nodeStyle, backgroundColor: '#ef4444', color: 'white' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'CoT Prompt:\nQuestion +\n"Let\'s think step by step"' },
      style: { ...nodeStyle, minWidth: 180, backgroundColor: '#10b981', color: 'white' }
    },
    {
      id: '4',
      type: 'default',
      position: { x: 100, y: 350 },
      data: { label: 'LLM (Direct Response)' },
      style: { ...nodeStyle, backgroundColor: '#64748b', color: 'white' }
    },
    {
      id: '5',
      type: 'default',
      position: { x: 400, y: 350 },
      data: { label: 'Same LLM\n(Step-by-Step Mode)' },
      style: { ...nodeStyle, backgroundColor: '#8b5cf6', color: 'white' }
    },
    {
      id: '6',
      type: 'default',
      position: { x: 100, y: 500 },
      data: { label: '❌ Wrong Answer:\n"100 minutes"' },
      style: { ...nodeStyle, backgroundColor: '#dc2626', color: 'white' }
    },
    {
      id: '7',
      type: 'default',
      position: { x: 400, y: 500 },
      data: { label: '✓ Correct Answer:\n"5 minutes"' },
      style: { ...nodeStyle, backgroundColor: '#059669', color: 'white' }
    },
    {
      id: '8',
      type: 'default',
      position: { x: 550, y: 425 },
      data: { label: 'Shows reasoning:\n"Each machine makes\n1 widget in 5 minutes.\n100 machines make\n100 widgets in 5 min."' },
      style: { ...nodeStyle, minWidth: 180, backgroundColor: '#0891b2', color: 'white', fontSize: '11px' }
    }
  ],
  
  initialEdges: [
    {
      id: 'e2-1',
      source: '2',
      target: '1',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Standard'
    },
    {
      id: 'e3-1',
      source: '3',
      target: '1',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'With CoT'
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e1-5',
      source: '1',
      target: '5',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      style: { ...edgeStyle, stroke: '#ef4444' },
      label: 'Quick answer'
    },
    {
      id: 'e5-7',
      source: '5',
      target: '7',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Reasoned'
    },
    {
      id: 'e5-8',
      source: '5',
      target: '8',
      style: { ...edgeStyle, stroke: '#10b981', strokeDasharray: '5,5' },
      label: 'Shows work'
    }
  ],
  
  steps: [
      {
        id: 'step1',
        title: 'Problem Presentation',
        description: 'A classic reasoning problem that trips up many LLMs when asked directly. This tests the model\'s ability to avoid linear thinking traps.',
        input: 'If 5 machines make 5 widgets in 5 minutes, how long would it take 100 machines to make 100 widgets?',
        activeNodes: ['1'],
        activeEdges: []
      },
      {
        id: 'step2',
        title: 'Standard Approach (No CoT)',
        description: 'Without Chain-of-Thought prompting, the model often jumps to a conclusion using faulty linear reasoning: "5 machines → 5 widgets, so 100 machines → 100 widgets must take 100 minutes."',
        input: 'Direct question without any prompting strategy',
        activeNodes: ['1', '2'],
        activeEdges: ['e2-1']
      },
      {
        id: 'step3',
        title: 'Standard LLM Response',
        description: 'The model gives a quick, intuitive but wrong answer. It fails to work through the rate calculation properly.',
        output: '100 minutes (incorrect linear scaling)',
        activeNodes: ['1', '4', '6'],
        activeEdges: ['e1-4', 'e4-6']
      },
      {
        id: 'step4',
        title: 'CoT Approach - Add Magic Phrase',
        description: 'Now we ask the exact same question but add "Let\'s think step by step" at the end. This simple addition triggers a completely different reasoning process in the same model.',
        input: 'Same question + "Let\'s think step by step"',
        activeNodes: ['1', '3'],
        activeEdges: ['e3-1']
      },
      {
        id: 'step5',
        title: 'CoT Triggers Systematic Reasoning',
        description: 'With the magic phrase, the same LLM now breaks down the problem systematically instead of jumping to conclusions.',
        activeNodes: ['1', '5'],
        activeEdges: ['e1-5']
      },
      {
        id: 'step6',
        title: 'Step-by-Step Reasoning Process',
        description: 'The model now shows its work: "Let\'s think step by step. If 5 machines make 5 widgets in 5 minutes, then each machine makes 1 widget in 5 minutes. So the rate is 1 widget per machine per 5 minutes. Therefore, 100 machines would make 100 widgets in... 5 minutes!"',
        output: 'Detailed reasoning showing rate calculation',
        activeNodes: ['5', '8'],
        activeEdges: ['e5-8']
      },
      {
        id: 'step7',
        title: 'Correct Answer Through CoT',
        description: 'By simply adding "Let\'s think step by step", we get the correct answer. The same model, same weights, same everything - just better prompting. This is the power of Chain-of-Thought: dramatic improvement from a simple prompt modification.',
        output: '✓ 5 minutes (correct answer with clear reasoning)',
        activeNodes: ['5', '7', '8'],
        activeEdges: ['e5-7', 'e5-8']
      }
  ]
};