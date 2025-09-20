import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const reflexionPattern: PatternScenario = {
  id: 'reflexion',
  title: 'Reflexion Pattern',
  description: 'Demonstrates agents learning from experience through verbal self-reflection and episodic memory',
  initialNodes: [
    {
      id: 'task',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { label: 'Task\n"Debug and fix a failing unit test"' },
      style: { ...nodeStyle, minWidth: 280 }
    },
    // Episode 1 - First Attempt
    {
      id: 'episode1-attempt',
      type: 'default',
      position: { x: 100, y: 160 },
      data: { label: '🎯 Episode 1: Attempt\nTry to fix test by changing assertion' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 220 }
    },
    {
      id: 'episode1-execution',
      type: 'default',
      position: { x: 100, y: 280 },
      data: { label: '⚡ Execution\nRun test suite' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 }
    },
    {
      id: 'episode1-result',
      type: 'default',
      position: { x: 100, y: 400 },
      data: { label: '❌ Result: Failed\nTest still failing\nDifferent error now' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 180 }
    },
    {
      id: 'episode1-reflection',
      type: 'default',
      position: { x: 100, y: 520 },
      data: { label: '💭 Reflection\n"I only fixed the symptom,\nnot the root cause.\nNeed to check the\nactual implementation."' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    // Episode 2 - Learning Applied
    {
      id: 'episode2-attempt',
      type: 'default',
      position: { x: 400, y: 160 },
      data: { label: '🎯 Episode 2: Attempt\nCheck implementation\nbased on reflection' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 220 }
    },
    {
      id: 'episode2-execution',
      type: 'default',
      position: { x: 400, y: 280 },
      data: { label: '⚡ Execution\nDebug & fix logic error' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 }
    },
    {
      id: 'episode2-result',
      type: 'default',
      position: { x: 400, y: 400 },
      data: { label: '⚠️ Result: Partial\n3/4 tests pass\nEdge case failing' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 180 }
    },
    {
      id: 'episode2-reflection',
      type: 'default',
      position: { x: 400, y: 520 },
      data: { label: '💭 Reflection\n"Good progress!\nImplementation was wrong.\nForgot edge case:\nnull input handling"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 }
    },
    // Episode 3 - Success
    {
      id: 'episode3-attempt',
      type: 'default',
      position: { x: 700, y: 160 },
      data: { label: '🎯 Episode 3: Attempt\nAdd null check\nbased on learnings' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 220 }
    },
    {
      id: 'episode3-execution',
      type: 'default',
      position: { x: 700, y: 280 },
      data: { label: '⚡ Execution\nImplement edge case' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 }
    },
    {
      id: 'episode3-result',
      type: 'default',
      position: { x: 700, y: 400 },
      data: { label: '✅ Result: Success\nAll tests passing\nCode coverage 100%' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 180 }
    },
    {
      id: 'episode3-reflection',
      type: 'default',
      position: { x: 700, y: 520 },
      data: { label: '💭 Reflection\n"Success! Key learnings:\n1. Check implementation\n2. Consider edge cases\n3. Test thoroughly"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 }
    },
    // Episodic Memory
    {
      id: 'episodic-memory',
      type: 'default',
      position: { x: 400, y: 660 },
      data: { label: '🧠 Episodic Memory\nStoring experiences & reflections' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 280 }
    },
    {
      id: 'memory-entry1',
      type: 'default',
      position: { x: 100, y: 780 },
      data: { label: '📝 Memory 1\nPattern: Test failures\nLesson: Check implementation\nnot just assertions' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200, fontSize: 11 }
    },
    {
      id: 'memory-entry2',
      type: 'default',
      position: { x: 320, y: 780 },
      data: { label: '📝 Memory 2\nPattern: Logic errors\nLesson: Debug systematically\nfrom root cause' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200, fontSize: 11 }
    },
    {
      id: 'memory-entry3',
      type: 'default',
      position: { x: 540, y: 780 },
      data: { label: '📝 Memory 3\nPattern: Edge cases\nLesson: Always handle\nnull/empty inputs' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200, fontSize: 11 }
    },
    // Learning Synthesis
    {
      id: 'learning-synthesis',
      type: 'default',
      position: { x: 400, y: 900 },
      data: { label: '🎓 Learning Synthesis\nGeneralized debugging strategy:\n1. Understand failure mode\n2. Find root cause\n3. Consider edge cases\n4. Verify comprehensively' },
      style: { ...nodeStyle, background: '#059669', minWidth: 320 }
    },
    // Reflection Prompts
    {
      id: 'reflection-prompts',
      type: 'default',
      position: { x: 850, y: 520 },
      data: { label: '❓ Reflection Prompts\n• What went wrong?\n• Why did it fail?\n• What did I learn?\n• How to improve?' },
      style: { ...nodeStyle, background: '#1f2937', minWidth: 180, fontSize: 11 }
    }
  ],
  initialEdges: [
    // Task to episodes
    {
      id: 'e-task-ep1',
      source: 'task',
      target: 'episode1-attempt',
      style: edgeStyle,
      animated: true
    },
    {
      id: 'e-task-ep2',
      source: 'task',
      target: 'episode2-attempt',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e-task-ep3',
      source: 'task',
      target: 'episode3-attempt',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    // Episode 1 flow
    {
      id: 'e-ep1-attempt-exec',
      source: 'episode1-attempt',
      target: 'episode1-execution',
      style: edgeStyle
    },
    {
      id: 'e-ep1-exec-result',
      source: 'episode1-execution',
      target: 'episode1-result',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },
    {
      id: 'e-ep1-result-reflect',
      source: 'episode1-result',
      target: 'episode1-reflection',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Reflect'
    },
    // Episode 2 flow
    {
      id: 'e-ep2-attempt-exec',
      source: 'episode2-attempt',
      target: 'episode2-execution',
      style: edgeStyle
    },
    {
      id: 'e-ep2-exec-result',
      source: 'episode2-execution',
      target: 'episode2-result',
      style: { ...edgeStyle, stroke: '#f59e0b' }
    },
    {
      id: 'e-ep2-result-reflect',
      source: 'episode2-result',
      target: 'episode2-reflection',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      label: 'Reflect'
    },
    // Episode 3 flow
    {
      id: 'e-ep3-attempt-exec',
      source: 'episode3-attempt',
      target: 'episode3-execution',
      style: edgeStyle
    },
    {
      id: 'e-ep3-exec-result',
      source: 'episode3-execution',
      target: 'episode3-result',
      style: { ...edgeStyle, stroke: '#10b981' }
    },
    {
      id: 'e-ep3-result-reflect',
      source: 'episode3-result',
      target: 'episode3-reflection',
      style: { ...edgeStyle, stroke: '#10b981' },
      label: 'Reflect'
    },
    // Learning connections between episodes
    {
      id: 'e-ep1-reflect-ep2',
      source: 'episode1-reflection',
      target: 'episode2-attempt',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Apply learning',
      animated: true
    },
    {
      id: 'e-ep2-reflect-ep3',
      source: 'episode2-reflection',
      target: 'episode3-attempt',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      label: 'Apply learning',
      animated: true
    },
    // Reflections to memory
    {
      id: 'e-ep1-memory',
      source: 'episode1-reflection',
      target: 'episodic-memory',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-ep2-memory',
      source: 'episode2-reflection',
      target: 'episodic-memory',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    {
      id: 'e-ep3-memory',
      source: 'episode3-reflection',
      target: 'episodic-memory',
      style: { ...edgeStyle, stroke: '#7c3aed' }
    },
    // Memory to entries
    {
      id: 'e-memory-entry1',
      source: 'episodic-memory',
      target: 'memory-entry1',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-memory-entry2',
      source: 'episodic-memory',
      target: 'memory-entry2',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    {
      id: 'e-memory-entry3',
      source: 'episodic-memory',
      target: 'memory-entry3',
      style: { ...edgeStyle, stroke: '#8b5cf6' }
    },
    // Memory entries to synthesis
    {
      id: 'e-mem1-synthesis',
      source: 'memory-entry1',
      target: 'learning-synthesis',
      style: edgeStyle
    },
    {
      id: 'e-mem2-synthesis',
      source: 'memory-entry2',
      target: 'learning-synthesis',
      style: edgeStyle
    },
    {
      id: 'e-mem3-synthesis',
      source: 'memory-entry3',
      target: 'learning-synthesis',
      style: edgeStyle
    },
    // Reflection prompts connections
    {
      id: 'e-reflect-prompts1',
      source: 'episode1-reflection',
      target: 'reflection-prompts',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-reflect-prompts2',
      source: 'episode2-reflection',
      target: 'reflection-prompts',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    },
    {
      id: 'e-reflect-prompts3',
      source: 'episode3-reflection',
      target: 'reflection-prompts',
      style: { ...edgeStyle, stroke: '#1f2937', strokeDasharray: '5,5' }
    }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Initial Task',
      description: 'Agent receives a task to complete.',
      input: 'Task: Debug and fix a failing unit test\n\nTest Error: "Expected 42 but got undefined"\nFile: calculator.test.js\nFunction: calculateAnswer()',
      activeNodes: ['task'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Episode 1 - First Attempt',
      description: 'Agent makes initial attempt based on surface-level understanding.',
      output: 'Action: Change test assertion from 42 to undefined\n\nReasoning: "The test expects 42 but gets undefined, so I\'ll update the expectation to match the output."',
      activeNodes: ['task', 'episode1-attempt'],
      activeEdges: ['e-task-ep1']
    },
    {
      id: 'step3',
      title: 'Episode 1 - Execution & Failure',
      description: 'Execute the attempted fix and observe the result.',
      output: 'Result: ❌ Test Still Failing\n\nNew Error: "calculateAnswer is not a function"\n\nRealization: The problem wasn\'t the assertion, there\'s an actual implementation issue.',
      activeNodes: ['episode1-attempt', 'episode1-execution', 'episode1-result'],
      activeEdges: ['e-ep1-attempt-exec', 'e-ep1-exec-result']
    },
    {
      id: 'step4',
      title: 'Episode 1 - Self-Reflection',
      description: 'Agent reflects verbally on what went wrong and what to learn.',
      output: 'Reflection:\n\n"I made a mistake by trying to fix the test instead of the implementation. The error message was telling me the expected value, not suggesting I change it. I should have:\n1. Looked at the actual implementation\n2. Understood why it returns undefined\n3. Fixed the root cause\n\nLesson: Don\'t fix symptoms, fix causes."',
      activeNodes: ['episode1-result', 'episode1-reflection', 'reflection-prompts'],
      activeEdges: ['e-ep1-result-reflect', 'e-reflect-prompts1']
    },
    {
      id: 'step5',
      title: 'Episode 2 - Learning Applied',
      description: 'Agent attempts again, applying lessons from reflection.',
      output: 'Action: Check implementation file\n\nFound: calculateAnswer() function is missing return statement\nFix: Add "return result;" to function\n\nApplying lesson: Looking at root cause, not symptoms',
      activeNodes: ['episode1-reflection', 'episode2-attempt', 'episode2-execution'],
      activeEdges: ['e-ep1-reflect-ep2', 'e-ep2-attempt-exec']
    },
    {
      id: 'step6',
      title: 'Episode 2 - Partial Success & Reflection',
      description: 'Better result but not complete. Agent reflects on progress.',
      output: 'Result: ⚠️ Partial Success - 3/4 tests pass\n\nRemaining failure: Null input causes crash\n\nReflection:\n"Good progress! I correctly identified and fixed the missing return statement. However, I didn\'t consider edge cases. The function crashes on null input.\n\nLesson: Always consider edge cases like null, undefined, empty values."',
      activeNodes: ['episode2-execution', 'episode2-result', 'episode2-reflection', 'reflection-prompts'],
      activeEdges: ['e-ep2-exec-result', 'e-ep2-result-reflect', 'e-reflect-prompts2']
    },
    {
      id: 'step7',
      title: 'Episode 3 - Comprehensive Solution',
      description: 'Agent applies cumulative learning for complete solution.',
      output: 'Action: Add input validation\n\nCode added:\nif (input === null || input === undefined) {\n  return 0; // Handle null/undefined gracefully\n}\n\nApplying lessons:\n1. Fixed implementation (Episode 1 learning)\n2. Added edge case handling (Episode 2 learning)',
      activeNodes: ['episode2-reflection', 'episode3-attempt', 'episode3-execution'],
      activeEdges: ['e-ep2-reflect-ep3', 'e-ep3-attempt-exec']
    },
    {
      id: 'step8',
      title: 'Episode 3 - Success & Final Reflection',
      description: 'Complete success. Agent synthesizes all learnings.',
      output: 'Result: ✅ All Tests Pass!\n\nFinal Reflection:\n"Success! Through iterative attempts and reflection, I learned:\n\n1. Read errors carefully - they describe problems, not solutions\n2. Fix root causes in implementation, not test expectations\n3. Always handle edge cases (null, undefined, empty)\n4. Test thoroughly after each change\n\nThis systematic debugging approach will help in future tasks."',
      activeNodes: ['episode3-execution', 'episode3-result', 'episode3-reflection', 'reflection-prompts'],
      activeEdges: ['e-ep3-exec-result', 'e-ep3-result-reflect', 'e-reflect-prompts3']
    },
    {
      id: 'step9',
      title: 'Store in Episodic Memory',
      description: 'All experiences and reflections are stored in episodic memory.',
      output: 'Episodic Memory Updated:\n\n📝 Entry 1: "Test failures → Check implementation"\n📝 Entry 2: "Fix root causes, not symptoms"\n📝 Entry 3: "Always handle edge cases"\n\nThese memories can be retrieved for similar future tasks, allowing the agent to start with accumulated wisdom rather than repeating mistakes.',
      activeNodes: ['episode1-reflection', 'episode2-reflection', 'episode3-reflection', 'episodic-memory', 'memory-entry1', 'memory-entry2', 'memory-entry3'],
      activeEdges: ['e-ep1-memory', 'e-ep2-memory', 'e-ep3-memory', 'e-memory-entry1', 'e-memory-entry2', 'e-memory-entry3']
    },
    {
      id: 'step10',
      title: 'Learning Synthesis',
      description: 'Agent synthesizes all experiences into generalized knowledge.',
      output: 'Generalized Learning Strategy:\n\n🎓 Debugging Framework:\n1. Understand the failure mode (not just symptoms)\n2. Locate root cause in implementation\n3. Consider edge cases and error handling\n4. Test comprehensively after fixes\n5. Document lessons for future reference\n\nThis framework emerged from specific experiences but applies broadly to debugging tasks.\n\nNext time facing a similar task, the agent will:\n• Start with implementation review\n• Consider edge cases upfront\n• Apply systematic debugging\n• Avoid previous mistakes',
      activeNodes: ['memory-entry1', 'memory-entry2', 'memory-entry3', 'learning-synthesis'],
      activeEdges: ['e-mem1-synthesis', 'e-mem2-synthesis', 'e-mem3-synthesis']
    }
  ]
};