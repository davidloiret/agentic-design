import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const rlaifPattern: PatternScenario = {
  id: 'reinforcement-learning-from-ai-feedback',
  title: 'Reinforcement Learning from AI Feedback',
  initialNodes: [
    {
      id: 'writing-task',
      position: { x: 400, y: 50 },
      data: { label: '📝 Task: Write Product Description\n"Create engaging description for wireless headphones"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 380 },
    },
    // Student Model Attempts
    {
      id: 'student-model',
      position: { x: 100, y: 180 },
      data: { label: '🎓 Student Model\nSmaller, learning model\nGenerates attempts' },
      style: { ...nodeStyle, background: '#3b82f6', minWidth: 180 },
    },
    {
      id: 'attempt-1',
      position: { x: 50, y: 300 },
      data: { label: '📄 Attempt 1\n"Nice headphones.\nGood sound.\nBuy them."' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 150 },
    },
    {
      id: 'attempt-2',
      position: { x: 200, y: 300 },
      data: { label: '📄 Attempt 2\n"Premium audio\nwith crystal-clear\nhighs and deep bass"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 150 },
    },
    {
      id: 'attempt-3',
      position: { x: 350, y: 300 },
      data: { label: '📄 Attempt 3\n"Experience music\nlike never before\nwith 30-hour battery"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 150 },
    },
    // Teacher Model Evaluation
    {
      id: 'teacher-model',
      position: { x: 600, y: 180 },
      data: { label: '👨‍🏫 Teacher Model\nLarge, expert model\n(GPT-4 level)' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    {
      id: 'evaluation-criteria',
      position: { x: 550, y: 300 },
      data: { label: '📋 Evaluation Criteria\n• Engaging language\n• Feature highlights\n• Customer benefits\n• Call to action' },
      style: { ...nodeStyle, background: '#7c3aed', minWidth: 180 },
    },
    // Scoring
    {
      id: 'score-1',
      position: { x: 50, y: 420 },
      data: { label: '❌ Score: 2/10\nToo basic\nNo details\nNot engaging' },
      style: { ...nodeStyle, background: '#dc2626', minWidth: 140 },
    },
    {
      id: 'score-2',
      position: { x: 200, y: 420 },
      data: { label: '⭐ Score: 7/10\nGood features\nNeeds benefits\nMissing CTA' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 140 },
    },
    {
      id: 'score-3',
      position: { x: 350, y: 420 },
      data: { label: '✅ Score: 9/10\nEngaging\nBenefit-focused\nGreat features' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 140 },
    },
    // Learning Process
    {
      id: 'preference-data',
      position: { x: 200, y: 540 },
      data: { label: '📊 Preference Data\nAttempt 3 > Attempt 2 > Attempt 1' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 250 },
    },
    {
      id: 'reward-signal',
      position: { x: 500, y: 540 },
      data: { label: '🎯 Reward Signal\nNo human needed!\nAI feedback only' },
      style: { ...nodeStyle, background: '#ec4899', minWidth: 180 },
    },
    // Training
    {
      id: 'policy-update',
      position: { x: 310, y: 640 },
      data: { label: '🔄 Policy Update\nLearn what makes\ngood descriptions' },
      style: { ...nodeStyle, background: '#6366f1', minWidth: 180 },
    },
    // Improved Output
    {
      id: 'final-output',
      position: { x: 175, y: 760 },
      data: { label: '✨ Final Output\n"Transform your listening experience with our premium\nwireless headphones. Enjoy 30 hours of crystal-clear audio,\nactive noise cancellation, and comfort that lasts all day.\nOrder now and get free shipping!"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 450 },
    },
  ],
  initialEdges: [
    // Task distribution
    {
      id: 'task-student',
      source: 'writing-task',
      target: 'student-model',
      style: { ...edgeStyle, stroke: '#3b82f6', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'task-teacher',
      source: 'writing-task',
      target: 'teacher-model',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeWidth: 2 },
      animated: true,
    },
    // Student attempts
    {
      id: 'student-attempt1',
      source: 'student-model',
      target: 'attempt-1',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'student-attempt2',
      source: 'student-model',
      target: 'attempt-2',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    {
      id: 'student-attempt3',
      source: 'student-model',
      target: 'attempt-3',
      style: { ...edgeStyle, stroke: '#3b82f6' },
      animated: true,
    },
    // Teacher evaluation setup
    {
      id: 'teacher-criteria',
      source: 'teacher-model',
      target: 'evaluation-criteria',
      style: { ...edgeStyle, stroke: '#7c3aed' },
      animated: true,
    },
    // Evaluation of attempts
    {
      id: 'attempt1-score1',
      source: 'attempt-1',
      target: 'score-1',
      style: { ...edgeStyle, stroke: '#dc2626' },
      animated: true,
    },
    {
      id: 'attempt2-score2',
      source: 'attempt-2',
      target: 'score-2',
      style: { ...edgeStyle, stroke: '#f59e0b' },
      animated: true,
    },
    {
      id: 'attempt3-score3',
      source: 'attempt-3',
      target: 'score-3',
      style: { ...edgeStyle, stroke: '#10b981' },
      animated: true,
    },
    {
      id: 'criteria-score1',
      source: 'evaluation-criteria',
      target: 'score-1',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '3 3' },
    },
    {
      id: 'criteria-score2',
      source: 'evaluation-criteria',
      target: 'score-2',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '3 3' },
    },
    {
      id: 'criteria-score3',
      source: 'evaluation-criteria',
      target: 'score-3',
      style: { ...edgeStyle, stroke: '#7c3aed', strokeDasharray: '3 3' },
    },
    // Learning process
    {
      id: 'scores-preference',
      source: 'score-2',
      target: 'preference-data',
      style: { ...edgeStyle, stroke: '#ec4899' },
      animated: true,
    },
    {
      id: 'score1-preference',
      source: 'score-1',
      target: 'preference-data',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'score3-preference',
      source: 'score-3',
      target: 'preference-data',
      style: { ...edgeStyle, stroke: '#ec4899' },
    },
    {
      id: 'preference-reward',
      source: 'preference-data',
      target: 'reward-signal',
      style: { ...edgeStyle, stroke: '#ec4899', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'reward-policy',
      source: 'reward-signal',
      target: 'policy-update',
      style: { ...edgeStyle, stroke: '#6366f1', strokeWidth: 2 },
      animated: true,
    },
    {
      id: 'policy-student',
      source: 'policy-update',
      target: 'student-model',
      style: { ...edgeStyle, stroke: '#6366f1', strokeDasharray: '5 5' },
      label: 'Improve',
    },
    // Final output
    {
      id: 'policy-final',
      source: 'policy-update',
      target: 'final-output',
      style: { ...edgeStyle, stroke: '#10b981', strokeWidth: 3 },
      animated: true,
    },
  ],
  steps: [
    {
      title: 'Writing Task',
      description: 'Create engaging product description for headphones',
      activeNodes: ['writing-task'],
      activeEdges: [],
    },
    {
      title: 'Two Models',
      description: 'Student model learns, Teacher model evaluates',
      activeNodes: ['writing-task', 'student-model', 'teacher-model'],
      activeEdges: ['task-student', 'task-teacher'],
    },
    {
      title: 'Student Attempts',
      description: 'Student generates multiple description attempts',
      activeNodes: ['student-model', 'attempt-1', 'attempt-2', 'attempt-3'],
      activeEdges: ['student-attempt1', 'student-attempt2', 'student-attempt3'],
    },
    {
      title: 'Teacher Evaluation',
      description: 'Teacher AI evaluates each attempt using criteria',
      activeNodes: ['teacher-model', 'evaluation-criteria', 'attempt-1', 'attempt-2', 'attempt-3'],
      activeEdges: ['teacher-criteria'],
    },
    {
      title: 'AI Scoring',
      description: 'Teacher assigns scores: 2/10, 7/10, 9/10',
      activeNodes: ['evaluation-criteria', 'score-1', 'score-2', 'score-3'],
      activeEdges: ['attempt1-score1', 'attempt2-score2', 'attempt3-score3', 'criteria-score1', 'criteria-score2', 'criteria-score3'],
    },
    {
      title: 'Generate Preferences',
      description: 'Convert scores to preference rankings',
      activeNodes: ['score-1', 'score-2', 'score-3', 'preference-data'],
      activeEdges: ['score1-preference', 'scores-preference', 'score3-preference'],
    },
    {
      title: 'AI-Only Reward Signal',
      description: 'No humans needed - AI feedback becomes reward',
      activeNodes: ['preference-data', 'reward-signal'],
      activeEdges: ['preference-reward'],
    },
    {
      title: 'Policy Update',
      description: 'Student learns what makes good descriptions',
      activeNodes: ['reward-signal', 'policy-update', 'student-model'],
      activeEdges: ['reward-policy', 'policy-student'],
    },
    {
      title: 'Improved Output',
      description: 'Student now writes professional descriptions',
      activeNodes: ['policy-update', 'final-output'],
      activeEdges: ['policy-final'],
    },
  ],
};