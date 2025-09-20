import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const agrailAdaptivePattern: PatternScenario = {
  id: 'agrail-adaptive',
  title: 'AGrail Adaptive Pattern',
  description: 'Lifelong adaptive safety system that dynamically generates and refines safety checks based on emerging threats and operational experience',
  initialNodes: [
    // Initial deployment
    {
      id: 'initial-deployment',
      position: { x: 400, y: 50 },
      data: { label: '🚀 AI System Deployment\n"Customer service chatbot launched\nwith basic safety rules:\n• No personal data sharing\n• Polite responses only"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 280 },
    },

    // Novel threat emerges
    {
      id: 'novel-threat',
      position: { x: 150, y: 200 },
      data: { label: '🆕 Novel Threat Emerges\n"Social engineering attack:\nUsers trick bot into generating\nphishing email templates"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 220 },
    },

    // Static system (left path)
    {
      id: 'static-system',
      position: { x: 150, y: 350 },
      data: { label: '⚠️ Static Safety System\n"Fixed rules cannot adapt\nNo mechanism to learn\nfrom new attack patterns"' },
      style: { ...nodeStyle, background: '#6b7280', minWidth: 200 },
    },

    {
      id: 'exploitation',
      position: { x: 150, y: 500 },
      data: { label: '💀 Successful Exploitation\n"Bot generates phishing emails\nUsers get scammed\nSafety system bypassed"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // AGrail adaptive system (right path)
    {
      id: 'agrail-system',
      position: { x: 650, y: 200 },
      data: { label: '🧠 AGrail Adaptive System\n"Monitors interactions\nDetects safety violations\nLearns from incidents"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 220 },
    },

    {
      id: 'threat-detection',
      position: { x: 650, y: 350 },
      data: { label: '🔍 Anomaly Detection\n"Pattern identified:\nRequests for email templates\n+ Social engineering markers"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 220 },
    },

    {
      id: 'safety-generation',
      position: { x: 650, y: 500 },
      data: { label: '⚡ Dynamic Safety Generation\n"Creates new rule:\nBlock email template requests\nwith deceptive intent markers"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 220 },
    },

    {
      id: 'rule-deployment',
      position: { x: 650, y: 650 },
      data: { label: '🛡️ Automatic Rule Deployment\n"New safety check activated\nPhishing attempts blocked\nContinuous monitoring active"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 220 },
    },

    // Continuous learning
    {
      id: 'continuous-learning',
      position: { x: 400, y: 800 },
      data: { label: '🔄 Lifelong Adaptive Learning\n"System continuously evolves\nNew threats → New protections\nSafety improves over time"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 280 },
    },

    // Future threat example
    {
      id: 'future-threat',
      position: { x: 900, y: 350 },
      data: { label: '🔮 Future Threat Example\n"Next month: Code injection\nvia natural language\nAGrail adapts again"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 200 },
    },
  ],
  initialEdges: [
    // Initial system encounters threat
    {
      id: 'e1',
      source: 'initial-deployment',
      target: 'novel-threat',
      ...edgeStyle,
      label: 'encounters new attack'
    },

    // Split into static vs adaptive responses
    {
      id: 'e2',
      source: 'novel-threat',
      target: 'static-system',
      ...edgeStyle,
      label: 'static safety cannot adapt'
    },
    {
      id: 'e3',
      source: 'novel-threat',
      target: 'agrail-system',
      ...edgeStyle,
      label: 'AGrail detects threat'
    },

    // Static system failure path
    {
      id: 'e4',
      source: 'static-system',
      target: 'exploitation',
      ...edgeStyle,
      label: 'enables exploitation',
      style: { ...edgeStyle, stroke: '#ef4444' }
    },

    // AGrail adaptive response flow
    {
      id: 'e5',
      source: 'agrail-system',
      target: 'threat-detection',
      ...edgeStyle,
      label: 'analyzes patterns'
    },
    {
      id: 'e6',
      source: 'threat-detection',
      target: 'safety-generation',
      ...edgeStyle,
      label: 'generates new rule'
    },
    {
      id: 'e7',
      source: 'safety-generation',
      target: 'rule-deployment',
      ...edgeStyle,
      label: 'deploys protection'
    },

    // Connect to continuous learning
    {
      id: 'e8',
      source: 'exploitation',
      target: 'continuous-learning',
      ...edgeStyle,
      label: 'demonstrates need',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e9',
      source: 'rule-deployment',
      target: 'continuous-learning',
      ...edgeStyle,
      label: 'adaptive success',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Future adaptability
    {
      id: 'e10',
      source: 'agrail-system',
      target: 'future-threat',
      ...edgeStyle,
      label: 'ready for future threats',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e11',
      source: 'future-threat',
      target: 'continuous-learning',
      ...edgeStyle,
      label: 'ongoing evolution',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },

    // Feedback loop for continuous improvement
    {
      id: 'e12',
      source: 'continuous-learning',
      target: 'agrail-system',
      ...edgeStyle,
      label: 'improves detection',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Initial AI System with Basic Safety",
      description: "Customer service chatbot deployed with fundamental safety rules like no personal data sharing and polite responses, but limited to predefined threats.",
      activeNodes: ['initial-deployment'],
      activeEdges: []
    },
    {
      title: "Novel Threat Emerges",
      description: "New social engineering attack emerges where users trick the bot into generating phishing email templates - a threat not covered by original safety rules.",
      activeNodes: ['novel-threat'],
      activeEdges: ['e1']
    },
    {
      title: "Static vs Adaptive Safety Response",
      description: "Static safety systems cannot adapt to new threats and fail to block novel attacks, while AGrail adaptive system detects and analyzes the emerging threat pattern.",
      activeNodes: ['static-system', 'agrail-system'],
      activeEdges: ['e2', 'e3']
    },
    {
      title: "Static System Failure vs Adaptive Detection",
      description: "Fixed rules enable successful exploitation of the novel attack, while AGrail system identifies patterns like email template requests combined with social engineering markers.",
      activeNodes: ['exploitation', 'threat-detection'],
      activeEdges: ['e4', 'e5']
    },
    {
      title: "Dynamic Safety Rule Generation",
      description: "AGrail automatically generates new safety check to block email template requests with deceptive intent markers, then deploys the protection system-wide.",
      activeNodes: ['safety-generation', 'rule-deployment'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Lifelong Adaptive Learning Principle",
      description: "System demonstrates continuous evolution: new threats trigger new protections, creating lifelong adaptive safety that improves over time and prepares for future unknown threats.",
      activeNodes: ['continuous-learning', 'future-threat'],
      activeEdges: ['e8', 'e9', 'e10', 'e11', 'e12']
    }
  ]
};