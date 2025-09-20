import { PatternScenario } from './types';
import { nodeStyle, edgeStyle } from './styles';

export const sweBenchSuitePattern: PatternScenario = {
  id: 'swe-bench-suite',
  title: 'SWE-bench Suite: Real-World Software Engineering Evaluation Pattern',
  description: 'Comprehensive AI software engineering benchmark with 2,294 real GitHub issues across 12 Python repositories, featuring multiple variants and revealing significant AI limitations in complex code tasks',
  initialNodes: [
    // AI code evaluation limitation challenge
    {
      id: 'code-evaluation-challenge',
      position: { x: 400, y: 50 },
      data: { label: '💻 AI Code Evaluation Challenge\n"How to evaluate AI systems on realistic\nsoftware engineering tasks beyond\nsimple algorithmic problems?"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 300 },
    },

    // SWE-bench comprehensive framework
    {
      id: 'swe-bench-framework',
      position: { x: 400, y: 200 },
      data: { label: '🏗️ SWE-bench Comprehensive Framework\n"Real-world software engineering benchmark:\n• 2,294 GitHub issues/PRs\n• 12 Python repositories\n• Execution-based evaluation"' },
      style: { ...nodeStyle, background: '#06b6d4', minWidth: 300 },
    },

    // Core dataset construction
    {
      id: 'dataset-construction',
      position: { x: 200, y: 350 },
      data: { label: '📊 Real-World Dataset Construction\n"Authentic software problems:\n• User-submitted GitHub issues\n• Corresponding pull request solutions\n• Fail-to-pass test validation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 250 },
    },

    // 12 Python repositories
    {
      id: 'twelve-repositories',
      position: { x: 50, y: 500 },
      data: { label: '📚 12 Python Repositories\n"Popular open-source projects:\n• Diverse codebases\n• Real maintenance issues\n• Production-quality code"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 180 },
    },

    // 2,294 issue instances
    {
      id: 'issue-instances',
      position: { x: 250, y: 500 },
      data: { label: '🐛 2,294 Issue Instances\n"Complex software problems:\n• Multi-file changes required\n• Long context understanding\n• Complex reasoning needed"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 200 },
    },

    // Multiple benchmark variants
    {
      id: 'benchmark-variants',
      position: { x: 600, y: 350 },
      data: { label: '🎯 Multiple Benchmark Variants\n"Specialized evaluation subsets:\n• SWE-bench Full (2,294)\n• SWE-bench Lite (300)\n• SWE-bench Verified (500)"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 250 },
    },

    // SWE-bench Verified (human-confirmed)
    {
      id: 'swe-bench-verified',
      position: { x: 500, y: 500 },
      data: { label: '✅ SWE-bench Verified (500)\n"Human-confirmed solvable:\n• Software engineer validation\n• Quality-assured problems\n• Realistic difficulty assessment"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 200 },
    },

    // SWE-bench Multimodal (visual)
    {
      id: 'swe-bench-multimodal',
      position: { x: 700, y: 500 },
      data: { label: '🖼️ SWE-bench Multimodal (517)\n"Visual software issues:\n• Images in problem descriptions\n• UI/rendering problems\n• Multimodal understanding required"' },
      style: { ...nodeStyle, background: '#f59e0b', minWidth: 200 },
    },

    // Docker evaluation harness
    {
      id: 'docker-evaluation-harness',
      position: { x: 400, y: 650 },
      data: { label: '🐳 Docker Evaluation Harness\n"Reproducible testing environment:\n• Containerized execution\n• Patch application testing\n• Unit/system test validation"' },
      style: { ...nodeStyle, background: '#8b5cf6', minWidth: 270 },
    },

    // Challenging performance results
    {
      id: 'performance-results',
      position: { x: 200, y: 800 },
      data: { label: '📉 Challenging Performance Results\n"AI limitations exposed:\n• Claude 2: 1.96% success (original)\n• Top models: ~65% (Verified)\n• Significant capability gaps"' },
      style: { ...nodeStyle, background: '#ef4444', minWidth: 230 },
    },

    // Continuous benchmark evolution
    {
      id: 'benchmark-evolution',
      position: { x: 600, y: 800 },
      data: { label: '🔄 Continuous Benchmark Evolution\n"Living evaluation platform:\n• Regular updates with new issues\n• Community contributions\n• Improved evaluation methods"' },
      style: { ...nodeStyle, background: '#10b981', minWidth: 240 },
    },

    // Core software engineering evaluation principle
    {
      id: 'software-evaluation-principle',
      position: { x: 400, y: 950 },
      data: { label: '🎯 Real-World Software Evaluation Principle\n"Authentic software engineering tasks reveal true AI capabilities\nComplex, multi-file problems expose reasoning limitations\nContinuous real-world benchmarking drives practical progress"' },
      style: { ...nodeStyle, background: '#059669', minWidth: 380 },
    },
  ],
  initialEdges: [
    // Challenge addressed by framework
    {
      id: 'e1',
      source: 'code-evaluation-challenge',
      target: 'swe-bench-framework',
      ...edgeStyle,
      label: 'addressed by'
    },

    // Framework implements dataset construction and variants
    {
      id: 'e2',
      source: 'swe-bench-framework',
      target: 'dataset-construction',
      ...edgeStyle,
      label: 'implements construction'
    },
    {
      id: 'e3',
      source: 'swe-bench-framework',
      target: 'benchmark-variants',
      ...edgeStyle,
      label: 'creates variants'
    },

    // Dataset construction includes repositories and issues
    {
      id: 'e4',
      source: 'dataset-construction',
      target: 'twelve-repositories',
      ...edgeStyle,
      label: 'sources from'
    },
    {
      id: 'e5',
      source: 'dataset-construction',
      target: 'issue-instances',
      ...edgeStyle,
      label: 'creates instances'
    },

    // Benchmark variants include specialized subsets
    {
      id: 'e6',
      source: 'benchmark-variants',
      target: 'swe-bench-verified',
      ...edgeStyle,
      label: 'includes verified'
    },
    {
      id: 'e7',
      source: 'benchmark-variants',
      target: 'swe-bench-multimodal',
      ...edgeStyle,
      label: 'includes multimodal'
    },

    // All components evaluated through Docker harness
    {
      id: 'e8',
      source: 'twelve-repositories',
      target: 'docker-evaluation-harness',
      ...edgeStyle,
      label: 'tested via'
    },
    {
      id: 'e9',
      source: 'issue-instances',
      target: 'docker-evaluation-harness',
      ...edgeStyle,
      label: 'executed in'
    },
    {
      id: 'e10',
      source: 'swe-bench-verified',
      target: 'docker-evaluation-harness',
      ...edgeStyle,
      label: 'validated by'
    },
    {
      id: 'e11',
      source: 'swe-bench-multimodal',
      target: 'docker-evaluation-harness',
      ...edgeStyle,
      label: 'processed by'
    },

    // Evaluation produces performance results and drives evolution
    {
      id: 'e12',
      source: 'docker-evaluation-harness',
      target: 'performance-results',
      ...edgeStyle,
      label: 'produces results'
    },
    {
      id: 'e13',
      source: 'docker-evaluation-harness',
      target: 'benchmark-evolution',
      ...edgeStyle,
      label: 'enables evolution'
    },

    // Results and evolution demonstrate core principle
    {
      id: 'e14',
      source: 'performance-results',
      target: 'software-evaluation-principle',
      ...edgeStyle,
      label: 'reveals limitations',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
    {
      id: 'e15',
      source: 'benchmark-evolution',
      target: 'software-evaluation-principle',
      ...edgeStyle,
      label: 'drives progress',
      style: { ...edgeStyle, strokeDasharray: '5,5' }
    },
  ],
  steps: [
    {
      title: "AI Code Evaluation Limitation Challenge",
      description: "How can we evaluate AI systems on realistic software engineering tasks that go beyond simple algorithmic problems to test complex, multi-file reasoning capabilities?",
      activeNodes: ['code-evaluation-challenge'],
      activeEdges: []
    },
    {
      title: "SWE-bench Comprehensive Framework Introduction",
      description: "Revolutionary real-world software engineering benchmark addresses challenge with 2,294 authentic GitHub issues across 12 Python repositories using execution-based evaluation methodology.",
      activeNodes: ['swe-bench-framework'],
      activeEdges: ['e1']
    },
    {
      title: "Real-World Dataset Construction and Repository Sources",
      description: "Framework implements authentic dataset construction from user-submitted GitHub issues with corresponding pull request solutions, sourced from 12 popular Python repositories creating 2,294 complex problem instances.",
      activeNodes: ['dataset-construction', 'twelve-repositories', 'issue-instances'],
      activeEdges: ['e2', 'e4', 'e5']
    },
    {
      title: "Multiple Specialized Benchmark Variants",
      description: "Comprehensive framework creates targeted evaluation subsets: SWE-bench Full (2,294 total), SWE-bench Verified (500 human-confirmed), SWE-bench Multimodal (517 visual issues) for diverse testing needs.",
      activeNodes: ['benchmark-variants', 'swe-bench-verified', 'swe-bench-multimodal'],
      activeEdges: ['e3', 'e6', 'e7']
    },
    {
      title: "Docker-Based Evaluation Harness",
      description: "All benchmark variants processed through reproducible Docker evaluation harness: containerized execution, patch application testing, unit/system test validation ensuring consistent evaluation conditions.",
      activeNodes: ['docker-evaluation-harness'],
      activeEdges: ['e8', 'e9', 'e10', 'e11']
    },
    {
      title: "Performance Results and Continuous Evolution",
      description: "Evaluation exposes AI limitations (Claude 2: 1.96% original success, ~65% on Verified) while driving continuous benchmark evolution with regular updates, community contributions, and improved methods, proving real-world software tasks reveal true AI capabilities.",
      activeNodes: ['performance-results', 'benchmark-evolution', 'software-evaluation-principle'],
      activeEdges: ['e12', 'e13', 'e14', 'e15']
    }
  ]
};