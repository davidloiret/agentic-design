import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const reactPattern: PatternScenario = {
  id: 'react',
  title: 'ReAct Pattern (Reasoning + Acting)',
  description: 'Shows the iterative cycle of thinking, acting, and observing results',
  initialNodes: [
    {
      id: 'task',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { label: 'Task\n"Find current weather in Tokyo"' },
      style: { ...nodeStyle, minWidth: 180 }
    },
    {
      id: 'think1',
      type: 'default',
      position: { x: 250, y: 180 },
      data: { label: 'Thought: Need weather API' },
      style: { ...nodeStyle, background: '#ea580c' }
    },
    {
      id: 'act1',
      type: 'default',
      position: { x: 250, y: 310 },
      data: { label: 'Action: Search for weather API' },
      style: nodeStyle
    },
    {
      id: 'obs1',
      type: 'default',
      position: { x: 250, y: 440 },
      data: { label: 'Observation: Found OpenWeather API' },
      style: nodeStyle
    },
    {
      id: 'check1',
      type: 'default',
      position: { x: 250, y: 570 },
      data: { label: 'Goal Achieved?\nNot yet' },
      style: { ...nodeStyle, background: '#be123c' }
    },
    {
      id: 'think2',
      type: 'default',
      position: { x: 450, y: 440 },
      data: { label: 'Thought: Make API call' },
      style: { ...nodeStyle, background: '#ea580c' }
    },
    {
      id: 'act2',
      type: 'default',
      position: { x: 450, y: 310 },
      data: { label: 'Action: Call weather API' },
      style: nodeStyle
    },
    {
      id: 'obs2',
      type: 'default',
      position: { x: 450, y: 180 },
      data: { label: 'Observation: 22°C, Sunny' },
      style: nodeStyle
    },
    {
      id: 'final',
      type: 'default',
      position: { x: 350, y: 50 },
      data: { label: 'Final Answer: Tokyo is 22°C and sunny' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 }
    }
  ],
  initialEdges: [
    { id: 'e-task-think1', source: 'task', target: 'think1', style: edgeStyle },
    { id: 'e-think1-act1', source: 'think1', target: 'act1', style: edgeStyle },
    { id: 'e-act1-obs1', source: 'act1', target: 'obs1', style: edgeStyle },
    { id: 'e-obs1-check1', source: 'obs1', target: 'check1', style: edgeStyle },
    { id: 'e-check1-think2', source: 'check1', target: 'think2', style: edgeStyle },
    { id: 'e-think2-act2', source: 'think2', target: 'act2', style: edgeStyle },
    { id: 'e-act2-obs2', source: 'act2', target: 'obs2', style: edgeStyle },
    { id: 'e-obs2-final', source: 'obs2', target: 'final', style: edgeStyle }
  ],
  steps: [
    {
      id: 'step1',
      title: 'Task Understanding',
      description: 'AI receives a task that requires external information gathering.',
      input: 'Find current weather in Tokyo',
      activeNodes: ['task'],
      activeEdges: []
    },
    {
      id: 'step2',
      title: 'Initial Reasoning',
      description: 'AI thinks about what tools or APIs it needs to complete the task.',
      activeNodes: ['think1'],
      activeEdges: ['e-task-think1']
    },
    {
      id: 'step3',
      title: 'First Action',
      description: 'AI takes action to search for appropriate weather data sources.',
      output: 'Searching for weather API services...',
      activeNodes: ['act1'],
      activeEdges: ['e-think1-act1']
    },
    {
      id: 'step4',
      title: 'First Observation',
      description: 'AI observes the results of its search action.',
      output: 'Found OpenWeatherMap API - requires API key and city coordinates',
      activeNodes: ['obs1'],
      activeEdges: ['e-act1-obs1']
    },
    {
      id: 'step5',
      title: 'Goal Check',
      description: 'AI evaluates if the goal has been achieved - not yet, need actual weather data.',
      activeNodes: ['check1'],
      activeEdges: ['e-obs1-check1']
    },
    {
      id: 'step6',
      title: 'Next Reasoning',
      description: 'AI plans the next step: make actual API call to get current weather.',
      activeNodes: ['think2'],
      activeEdges: ['e-check1-think2']
    },
    {
      id: 'step7',
      title: 'API Call Action',
      description: 'AI makes the weather API call with Tokyo coordinates.',
      output: 'Calling: api.openweathermap.org/data/2.5/weather?q=Tokyo,jp',
      activeNodes: ['act2'],
      activeEdges: ['e-think2-act2']
    },
    {
      id: 'step8',
      title: 'Weather Data Observation',
      description: 'AI receives and processes the weather data from the API.',
      output: 'Temperature: 22°C\nCondition: Sunny\nHumidity: 65%',
      activeNodes: ['obs2'],
      activeEdges: ['e-act2-obs2']
    },
    {
      id: 'step9',
      title: 'Final Answer',
      description: 'AI provides the final answer with the current weather information.',
      output: 'The current weather in Tokyo is 22°C and sunny with 65% humidity.',
      activeNodes: ['final'],
      activeEdges: ['e-obs2-final']
    }
  ]
};