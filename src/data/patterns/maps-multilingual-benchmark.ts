import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const mapsMultilingualBenchmarkPattern: PatternScenario = {
  id: 'maps-multilingual-benchmark',
  title: 'MAPS: Multilingual Agent Performance & Security Pattern',
  description: 'First standardized multilingual AI agent evaluation with 11 languages, 9,660 instances across GAIA/SWE-bench/MATH/ASB, revealing up to 17% security degradation in non-English contexts',
  initialNodes: [
    // Multilingual AI agent challenge
    {
      id: 'multilingual-agent-challenge',
      position: { x: 400, y: 50 },
      data: { label: '🌍 Multilingual AI Agent Challenge\n"How to ensure AI agents perform\nsafely and effectively across languages\nbeyond English-centric evaluation?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 320 },
    },

    // MAPS benchmark framework
    {
      id: 'maps-framework',
      position: { x: 400, y: 200 },
      data: { label: '🗺️ MAPS Benchmark Framework\n"Multilingual evaluation suite:\n• 11 diverse languages\n• 805 unique tasks\n• 9,660 total instances"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 280 },
    },

    // 11 language coverage
    {
      id: 'eleven-languages',
      position: { x: 200, y: 350 },
      data: { label: '🌐 11 Language Coverage\n"Global representation:\n• Germanic: German\n• Romance: Spanish, Portuguese, Italian\n• Asian: Chinese, Japanese, Korean"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 280 },
    },

    // Additional languages
    {
      id: 'additional-languages',
      position: { x: 200, y: 500 },
      data: { label: '🗣️ Additional Languages\n"Diverse script systems:\n• Slavic: Russian\n• Semitic: Arabic, Hebrew\n• Indo-Aryan: Hindi"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 200 },
    },

    // Four benchmark domains
    {
      id: 'four-benchmark-domains',
      position: { x: 600, y: 350 },
      data: { label: '📊 Four Benchmark Domains\n"Comprehensive coverage:\n• GAIA: Real-world tasks\n• SWE-bench: Code generation\n• MATH: Mathematical reasoning"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // Agent Security Benchmark
    {
      id: 'agent-security-benchmark',
      position: { x: 600, y: 500 },
      data: { label: '🛡️ Agent Security Benchmark\n"Safety evaluation:\n• Security vulnerabilities\n• Unsafe behaviors\n• Attack resistance testing"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Performance degradation findings
    {
      id: 'performance-degradation',
      position: { x: 200, y: 650 },
      data: { label: '📉 Performance Degradation\n"Non-English impacts:\n• GAIA: Up to 16% drop\n• SWE/MATH: Minimal variation\n• Task-language correlation"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 230 },
    },

    // Security vulnerability increase
    {
      id: 'security-vulnerability',
      position: { x: 600, y: 650 },
      data: { label: '⚠️ Security Vulnerability Increase\n"Critical safety issues:\n• ASB: Up to 17% increase\n• Language-specific weaknesses\n• Chinese/Japanese most robust"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 240 },
    },

    // Human evaluation methodology
    {
      id: 'human-evaluation',
      position: { x: 400, y: 800 },
      data: { label: '👥 Human Evaluation Methodology\n"Quality assurance (2000+ samples):\n• Adequacy: 4.47/5\n• Fluency: 4.60/5\n• Answerability: 94.4%"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 270 },
    },

    // Task-specific impacts
    {
      id: 'task-specific-impacts',
      position: { x: 400, y: 950 },
      data: { label: '📈 Task-Specific Impact Analysis\n"Structured vs Natural Language:\n• Code/Math: Minimal impact\n• Complex real-world: Significant degradation\n• Safety-critical: Highest vulnerability"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 320 },
    },

    // Core multilingual evaluation principle
    {
      id: 'multilingual-evaluation-principle',
      position: { x: 400, y: 1100 },
      data: { label: '🎯 Multilingual Agent Evaluation Principle\n"Equitable AI requires comprehensive language testing\nPerformance degradation reveals hidden vulnerabilities\nGlobal deployment demands multilingual robustness"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Challenge addressed by MAPS framework
    {
      id: 'e1',
      source: 'multilingual-agent-challenge',
      target: 'maps-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements language coverage and domains
    {
      id: 'e2',
      source: 'maps-framework',
      target: 'eleven-languages',
      ...edgeStyle,
      label: 'covers 11 languages'
    },
    {
      id: 'e3',
      source: 'maps-framework',
      target: 'four-benchmark-domains',
      ...edgeStyle,
      label: 'tests 4 domains'
    },

    // Languages include additional coverage
    {
      id: 'e4',
      source: 'eleven-languages',
      target: 'additional-languages',
      ...edgeStyle,
      label: 'extends to'
    },

    // Domains include security benchmark
    {
      id: 'e5',
      source: 'four-benchmark-domains',
      target: 'agent-security-benchmark',
      ...edgeStyle,
      label: 'includes ASB'
    },

    // Languages and domains reveal degradation patterns
    {
      id: 'e6',
      source: 'additional-languages',
      target: 'performance-degradation',
      ...edgeStyle,
      label: 'reveals performance issues'
    },
    {
      id: 'e7',
      source: 'agent-security-benchmark',
      target: 'security-vulnerability',
      ...edgeStyle,
      label: 'exposes vulnerabilities'
    },

    // Framework uses human evaluation
    {
      id: 'e8',
      source: 'maps-framework',
      target: 'human-evaluation',
      ...edgeStyle,
      label: 'validated via'
    },

    // Degradation patterns analyzed
    {
      id: 'e9',
      source: 'performance-degradation',
      target: 'task-specific-impacts',
      ...edgeStyle,
      label: 'analyzed for'
    },
    {
      id: 'e10',
      source: 'security-vulnerability',
      target: 'task-specific-impacts',
      ...edgeStyle,
      label: 'contributes to'
    },

    // Human evaluation validates impacts
    {
      id: 'e11',
      source: 'human-evaluation',
      target: 'task-specific-impacts',
      ...edgeStyle,
      label: 'validates findings'
    },

    // Impacts demonstrate principle
    {
      id: 'e12',
      source: 'task-specific-impacts',
      target: 'multilingual-evaluation-principle',
      ...edgeStyle,
      label: 'proves principle',
      style: { ...edgeStyle.style, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "Multilingual AI Agent Evaluation Challenge",
      description: "How can we ensure AI agents perform safely and effectively across diverse languages when existing benchmarks focus exclusively on English, leaving multilingual settings unexplored?",
      activeNodes: ['multilingual-agent-challenge'],
      activeEdges: []
    },
    {
      title: "MAPS Benchmark Framework Introduction",
      description: "First standardized multilingual evaluation suite addresses challenge with 11 diverse languages, 805 unique tasks, and 9,660 total instances across four major benchmark domains.",
      activeNodes: ['maps-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Comprehensive 11-Language Coverage",
      description: "Framework covers global languages: Germanic (German), Romance (Spanish, Portuguese, Italian), Asian (Chinese, Japanese, Korean), Slavic (Russian), Semitic (Arabic, Hebrew), and Indo-Aryan (Hindi).",
      activeNodes: ['eleven-languages', 'additional-languages'],
      activeEdges: ['e2', 'e4']
    },
    {
      title: "Four Benchmark Domain Integration",
      description: "MAPS integrates GAIA (real-world tasks), SWE-bench (code generation), MATH (mathematical reasoning), and Agent Security Benchmark (ASB) for comprehensive multilingual assessment.",
      activeNodes: ['four-benchmark-domains', 'agent-security-benchmark'],
      activeEdges: ['e3', 'e5']
    },
    {
      title: "Critical Performance and Security Degradation",
      description: "Evaluation reveals significant issues: GAIA shows up to 16% performance drop, ASB shows up to 17% security vulnerability increase, while SWE/MATH show minimal variation across languages.",
      activeNodes: ['performance-degradation', 'security-vulnerability'],
      activeEdges: ['e6', 'e7']
    },
    {
      title: "Human Validation and Task-Specific Analysis",
      description: "2000+ samples manually verified (94.4% answerability, 4.47/5 adequacy) reveal structured tasks minimally affected while complex real-world and safety-critical tasks show significant degradation, proving equitable AI requires comprehensive multilingual testing.",
      activeNodes: ['human-evaluation', 'task-specific-impacts', 'multilingual-evaluation-principle'],
      activeEdges: ['e8', 'e9', 'e10', 'e11', 'e12']
    }
  ]
};