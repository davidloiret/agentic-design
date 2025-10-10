"use client"

import React, { useState } from 'react';
import {
  Wrench, Search, Filter, DollarSign, Star, GitFork, Users,
  Terminal, Code2, Globe, Shield, Zap, Package, Brain,
  CheckCircle, XCircle, ArrowUpRight, TrendingUp, Clock
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  company?: string;
  category: string;
  description: string;
  pricing: string;
  stars?: number;
  users?: string;
  keyFeatures: string[];
  limitations: string[];
  bestFor: string;
  swe_bench?: number;
  humaneval?: number;
  contextWindow?: string;
  models?: string[];
  deployment?: string[];
  badge?: string;
  url?: string;
}

const tools: Tool[] = [
  // IDE-Based AI Assistants
  {
    id: 'cursor',
    name: 'Cursor',
    company: 'Anysphere',
    category: 'IDE Assistants',
    description: 'AI-native IDE with agent mode, forked from VS Code with deep AI integration',
    pricing: '$20/month, $40/month business',
    stars: 25000,
    users: '1M+',
    keyFeatures: ['Agent mode', 'All frontier models', '//fix commands', 'Background agent'],
    limitations: ['Higher price', 'Manual context', 'Limited requests'],
    bestFor: 'Power users needing advanced AI features',
    contextWindow: '1M tokens (Max Mode)',
    models: ['Claude 4', 'GPT-4', 'Custom APIs'],
    deployment: ['Desktop app'],
    url: 'https://cursor.sh'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    company: 'Codeium',
    category: 'IDE Assistants',
    description: 'Features Cascade for deep context awareness with polished UI',
    pricing: '$15/month, $30/month team',
    stars: 18000,
    users: '500k+',
    keyFeatures: ['Cascade auto-context', 'Supercomplete', 'Multi-file workflows', 'Repository indexing'],
    limitations: ['BYOK for Claude', 'Gemini default', 'Newer platform'],
    bestFor: 'Beginners and UI-focused developers',
    contextWindow: '100k tokens',
    models: ['Gemini 2.5', 'Claude (BYOK)'],
    deployment: ['Desktop app'],
    url: 'https://windsurf.com'
  },
  {
    id: 'continue',
    name: 'Continue.dev',
    company: 'Continue',
    category: 'IDE Assistants',
    description: 'Open-source IDE extension for custom AI assistants',
    pricing: 'Free (open source)',
    stars: 20000,
    users: '100k+',
    keyFeatures: ['Fully customizable', 'Local LLM support', 'Custom blocks', 'Enterprise ready'],
    limitations: ['Setup complexity', 'Requires configuration'],
    bestFor: 'Teams needing customization',
    models: ['Any model', 'Local LLMs'],
    deployment: ['VS Code', 'JetBrains'],
    badge: 'Open Source',
    url: 'https://continue.dev'
  },
  {
    id: 'augment',
    name: 'Augment Code',
    company: 'Augment',
    category: 'IDE Assistants',
    description: 'Enterprise AI platform with deep codebase indexing',
    pricing: 'Enterprise pricing',
    stars: 5000,
    keyFeatures: ['200k token context', 'ISO certified', 'On-premise option', 'Agent execution'],
    limitations: ['Enterprise only', 'Higher cost'],
    bestFor: 'Large enterprises with compliance needs',
    contextWindow: '200k tokens',
    deployment: ['On-premise', 'Cloud'],
    badge: 'Enterprise'
  },
  {
    id: 'zed',
    name: 'Zed',
    company: 'Zed Industries',
    category: 'IDE Assistants',
    description: 'Lightning-fast multiplayer code editor with built-in AI from Atom creators',
    pricing: 'Free (open source)',
    stars: 45000,
    users: '100k+',
    keyFeatures: ['Blazing fast', 'Multiplayer editing', 'Native AI integration', 'Rust-based performance'],
    limitations: ['Newer ecosystem', 'Limited extensions'],
    bestFor: 'Speed-focused developers wanting native AI',
    models: ['GPT-4', 'Claude'],
    deployment: ['Desktop app'],
    badge: 'New 2025',
    url: 'https://zed.dev'
  },

  // Terminal/CLI Agents
  {
    id: 'claude-code',
    name: 'Claude Code',
    company: 'Anthropic',
    category: 'Terminal Agents',
    description: 'Terminal-based AI coding with deep reasoning across entire repositories',
    pricing: '$20-100/month usage-based',
    users: '50k+',
    keyFeatures: ['Million-line codebases', 'Multi-file editing', 'Git integration', 'Safety-focused'],
    limitations: ['No GUI', 'CLI only', 'Usage-based pricing'],
    bestFor: 'Large codebases and CLI workflows',
    contextWindow: '200k tokens',
    models: ['Claude 3.7', 'Claude 4'],
    deployment: ['Terminal'],
    swe_bench: 70.3
  },
  {
    id: 'aider',
    name: 'Aider',
    company: 'Open Source',
    category: 'Terminal Agents',
    description: 'CLI tool with deep git integration for multi-file changes',
    pricing: 'Free (open source)',
    stars: 15000,
    keyFeatures: ['Git integration', 'Tree-sitter context', 'Multi-file edits', 'Auditable commits'],
    limitations: ['CLI only', 'Less user-friendly'],
    bestFor: 'CLI purists and git workflows',
    models: ['Any API'],
    deployment: ['Terminal'],
    badge: 'Open Source'
  },
  {
    id: 'openhands',
    name: 'OpenHands',
    company: 'All Hands AI',
    category: 'Terminal Agents',
    description: 'Open platform for AI software development agents (formerly OpenDevin)',
    pricing: 'Free (open source)',
    stars: 41700,
    keyFeatures: ['53% SWE-bench', 'Web browsing', 'API calls', 'Command execution'],
    limitations: ['Setup required', 'Resource intensive'],
    bestFor: 'Open source development',
    swe_bench: 53,
    deployment: ['Docker', 'Local'],
    badge: 'Open Source'
  },
  {
    id: 'swe-agent',
    name: 'SWE-agent',
    company: 'Princeton NLP',
    category: 'Terminal Agents',
    description: 'Specialized agent for debugging and resolving GitHub issues',
    pricing: 'Free (open source)',
    stars: 12000,
    keyFeatures: ['Debugging focus', 'GitHub integration', 'Error resolution', 'IDE integration'],
    limitations: ['Python focused', 'Academic tool'],
    bestFor: 'Debugging and issue resolution',
    swe_bench: 13.86,
    deployment: ['Terminal'],
    badge: 'Research'
  },
  {
    id: 'amazon-q-cli',
    name: 'Amazon Q CLI',
    company: 'AWS',
    category: 'Terminal Agents',
    description: 'New 2025 agentic CLI with MCP support for autonomous coding workflows',
    pricing: 'Free tier, Pro $19/month',
    keyFeatures: ['MCP support', 'Agentic workflows', 'AWS integration', 'Security scanning', 'Multi-step tasks'],
    limitations: ['AWS ecosystem focus', 'Newer platform'],
    bestFor: 'AWS developers wanting agentic CLI workflows',
    models: ['Claude', 'Amazon Titan'],
    deployment: ['Terminal'],
    badge: 'New 2025',
    url: 'https://aws.amazon.com/q/developer'
  },

  // VS Code Extensions
  {
    id: 'cline',
    name: 'Cline',
    company: 'Open Source',
    category: 'VS Code Extensions',
    description: 'Thoughtful coding partner with 1.2M+ installs, breaks down complex tasks',
    pricing: 'Free + API costs',
    stars: 39000,
    users: '1.2M+',
    keyFeatures: ['Plan & Act modes', 'MCP Marketplace', 'Claude 4 support', 'Project analysis'],
    limitations: ['Token costs high', 'VS Code only'],
    bestFor: 'Complex multi-step tasks',
    models: ['Claude', 'GPT-4', 'Custom'],
    deployment: ['VS Code'],
    badge: 'Most Popular'
  },
  {
    id: 'roo-code',
    name: 'Roo Code',
    company: 'RooCode Inc',
    category: 'VS Code Extensions',
    description: 'Fork of Cline with custom modes for specialized AI personalities',
    pricing: 'Free + API costs',
    stars: 8000,
    keyFeatures: ['Custom AI modes', 'Boomerang tasks', 'Architect mode', 'Debug mode'],
    limitations: ['Setup complexity', 'Token costs'],
    bestFor: 'Teams needing specialized agents',
    models: ['Any OpenAI-compatible'],
    deployment: ['VS Code']
  },
  {
    id: 'kilo-code',
    name: 'Kilo Code',
    company: 'Kilo Org',
    category: 'VS Code Extensions',
    description: 'Spec-driven development fork combining Cline and Roo features',
    pricing: 'Free + $20 credits',
    stars: 3000,
    keyFeatures: ['Orchestrator mode', 'Memory bank', 'MCP servers', 'Multi-model support'],
    limitations: ['Beta status', 'Fork maintenance'],
    bestFor: 'Spec-driven development',
    models: ['Claude 4', 'Gemini 2.5', 'GPT-4'],
    deployment: ['VS Code', 'JetBrains'],
    badge: 'Spec-Driven'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    company: 'Microsoft/GitHub',
    category: 'VS Code Extensions',
    description: 'Universal AI pair programmer, most widely adopted. Pricing changed June 4, 2025',
    pricing: '$10/month (was $19), $19 business',
    users: '10M+',
    keyFeatures: ['Universal IDE support', 'GitHub integration', 'Reliable completions', 'Chat assistant', 'Agentic capabilities'],
    limitations: ['Basic features', 'No deep agent mode', 'Limited context'],
    bestFor: 'Universal compatibility',
    humaneval: 90,
    models: ['GPT-4', 'GPT-4o', 'Codex'],
    deployment: ['All major IDEs'],
    badge: '10M+ users'
  },

  // Web-Based Platforms
  {
    id: 'bolt',
    name: 'Bolt.new',
    company: 'StackBlitz',
    category: 'Web Platforms',
    description: 'Blazing-fast prototyping, $40M ARR in 4.5 months',
    pricing: 'Free tier + paid plans',
    users: '1M+',
    keyFeatures: ['In-browser execution', 'Screenshot to UI', 'Diffs feature', 'Instant deployment'],
    limitations: ['Limited backend', 'Prototype focused'],
    bestFor: 'Rapid prototyping and MVPs',
    deployment: ['Browser'],
    badge: '$40M ARR',
    url: 'https://bolt.new'
  },
  {
    id: 'v0',
    name: 'V0',
    company: 'Vercel',
    category: 'Web Platforms',
    description: 'UI component generation with shadcn/ui and Tailwind',
    pricing: 'Free tier + paid credits',
    users: '500k+',
    keyFeatures: ['Component library', 'Clean code output', 'Backend services', 'API routes'],
    limitations: ['Component focused', 'React only'],
    bestFor: 'UI component generation',
    deployment: ['Browser'],
    url: 'https://v0.dev'
  },
  {
    id: 'lovable',
    name: 'Lovable',
    company: 'Lovable',
    category: 'Web Platforms',
    description: 'Full-stack app generation, $17M ARR in 3 months',
    pricing: 'Free tier + paid plans',
    keyFeatures: ['Full-stack apps', 'Database setup', 'Authentication', 'Team collaboration'],
    limitations: ['Limited customization', 'Design focused'],
    bestFor: 'Designers and PMs',
    deployment: ['Browser'],
    badge: '$17M ARR',
    url: 'https://lovable.dev'
  },
  {
    id: 'replit',
    name: 'Replit',
    company: 'Replit',
    category: 'Web Platforms',
    description: 'Cloud IDE with AI, valued at $1.16B',
    pricing: 'Free tier, Pro $20/month',
    users: '20M+',
    keyFeatures: ['50+ languages', 'Built-in database', 'Instant hosting', 'Multiplayer coding'],
    limitations: ['Performance limits', 'Cloud only'],
    bestFor: 'Full-stack development',
    deployment: ['Browser'],
    badge: '$1.16B valuation',
    url: 'https://replit.com'
  },
  {
    id: 'a0dev',
    name: 'A0.dev',
    company: 'A0',
    category: 'Web Platforms',
    description: 'Mobile-first AI coding for React Native apps',
    pricing: 'Free tier + paid',
    keyFeatures: ['Mobile focus', 'React Native', 'From mobile device', 'Real app generation'],
    limitations: ['Mobile only', 'Limited scope'],
    bestFor: 'Mobile app development',
    deployment: ['Mobile browser']
  },

  // Autocomplete Tools
  {
    id: 'openai-codex',
    name: 'Codex',
    company: 'OpenAI',
    category: 'Terminal Agents',
    description: 'Reverse proxy for accessing various AI models through CLI, supports multiple providers',
    pricing: 'Free (bring your own API keys)',
    keyFeatures: ['Multi-provider support', 'CLI interface', 'Reverse proxy', 'Model switching'],
    limitations: ['Requires API keys', 'Terminal only', 'Setup complexity'],
    bestFor: 'Developers wanting unified CLI access to multiple AI providers',
    models: ['GPT-4', 'Claude', 'Gemini', 'Others'],
    deployment: ['Local CLI'],
    url: 'https://github.com/openai/codex'
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    company: 'Google',
    category: 'Terminal Agents',
    description: 'Official command-line interface for Google Gemini AI models',
    pricing: 'Free tier, Pay-as-you-go',
    keyFeatures: ['Gemini Pro access', 'Multi-modal support', 'Function calling', 'Streaming responses'],
    limitations: ['Google account required', 'Rate limits', 'API key needed'],
    bestFor: 'Developers wanting direct Gemini access from terminal',
    models: ['Gemini Pro', 'Gemini Ultra'],
    deployment: ['Terminal'],
    badge: 'Official Google',
    url: 'https://ai.google.dev/gemini-api/docs/quickstart?lang=cli'
  },
  {
    id: 'gemini-code-assist',
    name: 'Gemini Code Assist',
    company: 'Google',
    category: 'IDE Assistants',
    description: 'Enterprise AI coding with Gemini 2.5, free for individual developers in 2025',
    pricing: 'Free for individuals, $19-45/user/month enterprise',
    users: '200k+',
    keyFeatures: ['Gemini 2.5 Flash', 'Context caching', 'Multi-file editing', 'GCP integration', 'Free for individuals'],
    limitations: ['Google Cloud focus', 'Enterprise features paywalled'],
    bestFor: 'Google Cloud developers and individual devs',
    models: ['Gemini 2.5 Flash', 'Gemini 2.5 Pro'],
    deployment: ['VS Code', 'JetBrains', 'Cloud IDE'],
    badge: 'New 2025',
    url: 'https://cloud.google.com/products/gemini/code-assist'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    company: 'Codeium',
    category: 'Autocomplete',
    description: 'Free unlimited autocomplete and chat',
    pricing: 'Free, Pro $15/month',
    users: '1M+',
    keyFeatures: ['Unlimited free tier', 'Chat + autocomplete', 'IDE support', '70+ languages'],
    limitations: ['Less sophisticated', 'Weaker on complex'],
    bestFor: 'Budget-conscious developers',
    deployment: ['All major IDEs'],
    badge: 'Free Unlimited',
    url: 'https://codeium.com'
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    company: 'Tabnine',
    category: 'Autocomplete',
    description: 'Privacy-focused with offline mode and team training',
    pricing: '$20/month enterprise',
    users: '1M+',
    keyFeatures: ['On-premise deploy', 'Offline mode', 'Team training', 'No code sharing'],
    limitations: ['Expensive', 'Setup complexity'],
    bestFor: 'Enterprise with privacy needs',
    deployment: ['On-premise', 'Cloud'],
    badge: 'Privacy First'
  },
  {
    id: 'amazon-q',
    name: 'Amazon Q Developer',
    company: 'AWS',
    category: 'Autocomplete',
    description: 'AWS-optimized coding assistant with security scanning',
    pricing: 'Free',
    keyFeatures: ['AWS optimized', 'Security scanning', 'Free tier', 'Code transformation'],
    limitations: ['AWS-centric', 'Limited languages'],
    bestFor: 'AWS developers',
    deployment: ['IDE plugins'],
    badge: 'Free',
    url: 'https://aws.amazon.com/q'
  },

  // Code Review
  {
    id: 'coderabbit',
    name: 'CodeRabbit',
    company: 'CodeRabbit',
    category: 'Code Review',
    description: 'AI-powered automated code review bot for GitHub and GitLab',
    pricing: 'Free for open source, $15/month/developer',
    stars: 5000,
    keyFeatures: ['PR summaries', 'Line-by-line reviews', 'Security scanning', 'Auto-suggestions'],
    limitations: ['PR-focused only', 'No code generation'],
    bestFor: 'Teams wanting automated PR reviews',
    deployment: ['GitHub App', 'GitLab Integration'],
    badge: 'PR Automation',
    url: 'https://coderabbit.ai'
  },
  {
    id: 'pr-agent',
    name: 'PR-Agent',
    company: 'CodiumAI',
    category: 'Code Review',
    description: 'Open-source AI-powered pull request agent',
    pricing: 'Free (self-hosted), Cloud from $0',
    stars: 8000,
    keyFeatures: ['PR description', 'Review generation', 'Q&A on PRs', 'Improvement suggestions'],
    limitations: ['Setup complexity', 'GitHub/GitLab only'],
    bestFor: 'Open source projects and budget-conscious teams',
    deployment: ['Self-hosted', 'Cloud'],
    url: 'https://github.com/Codium-ai/pr-agent'
  },
  {
    id: 'what-the-diff',
    name: 'What The Diff',
    company: 'What The Diff',
    category: 'Code Review',
    description: 'AI assistant for pull request reviews with plain English explanations',
    pricing: 'Free trial, from $19/month',
    keyFeatures: ['Plain English summaries', 'Weekly reports', 'Inline suggestions', 'Token refills'],
    limitations: ['Simple reviews only', 'Token limits'],
    bestFor: 'Small teams needing simple PR summaries',
    deployment: ['GitHub App', 'GitLab App'],
    url: 'https://whatthediff.ai'
  },
  {
    id: 'reviewbot',
    name: 'ReviewBot',
    company: 'Various',
    category: 'Code Review',
    description: 'Collection of automated review tools and linters',
    pricing: 'Free (open source)',
    keyFeatures: ['Multiple linters', 'Custom rules', 'CI/CD integration', 'Extensible'],
    limitations: ['Configuration heavy', 'Not AI-powered'],
    bestFor: 'Teams wanting traditional automated checks',
    deployment: ['CI/CD', 'GitHub Actions']
  },

  // Testing & Quality
  {
    id: 'qodo',
    name: 'Qodo (Codium)',
    company: 'Qodo',
    category: 'Testing & Quality',
    description: 'AI test generation and code integrity platform',
    pricing: 'Free, Teams $30/month',
    users: '500k+',
    keyFeatures: ['AI test generation', 'Edge case detection', 'Code review', 'SOC2 certified'],
    limitations: ['Testing focused', 'Not general coding'],
    bestFor: 'Test-driven development',
    deployment: ['IDE plugins'],
    badge: 'Testing Focus'
  },
  {
    id: 'snyk-code',
    name: 'Snyk Code',
    company: 'Snyk',
    category: 'Testing & Quality',
    description: 'Security-focused code analysis',
    pricing: 'Free tier, Pro from $25',
    keyFeatures: ['Security scanning', 'Vulnerability detection', 'Fix suggestions', 'CI/CD integration'],
    limitations: ['Security only', 'Not code generation'],
    bestFor: 'Security-conscious teams',
    deployment: ['IDE', 'CI/CD']
  },
  {
    id: 'deepcode',
    name: 'DeepCode',
    company: 'Snyk',
    category: 'Testing & Quality',
    description: 'AI-powered code review and bug detection',
    pricing: 'Included with Snyk',
    keyFeatures: ['Pattern analysis', 'Bug detection', 'Code quality', 'Multi-language'],
    limitations: ['Analysis only'],
    bestFor: 'Code quality improvement',
    deployment: ['IDE', 'GitHub']
  },

  // Autonomous Agents
  {
    id: 'devin',
    name: 'Devin',
    company: 'Cognition',
    category: 'Autonomous',
    description: 'First fully autonomous AI software engineer. 96% price reduction in 2025!',
    pricing: '$20/month (was $500 enterprise)',
    keyFeatures: ['Full autonomy', 'Project planning', 'Deployment', 'Sandboxed environment', 'Complete workflows'],
    limitations: ['Still evolving', 'Autonomous limits'],
    bestFor: 'Autonomous development workflows',
    swe_bench: 13.86,
    badge: 'AI Engineer',
    url: 'https://devin.ai'
  },
  {
    id: 'goose',
    name: 'Goose',
    company: 'Open Source',
    category: 'Autonomous',
    description: 'Open-source autonomous agent with BYOL (bring your own LLM)',
    pricing: 'Free + API costs',
    stars: 5000,
    keyFeatures: ['BYOL flexibility', 'Open source', 'Customizable', 'Multi-model'],
    limitations: ['Setup required', 'DIY approach'],
    bestFor: 'Custom autonomous workflows',
    deployment: ['Local'],
    badge: 'Open Source'
  },
  {
    id: 'jules',
    name: 'Jules',
    company: 'Jules AI',
    category: 'Autonomous',
    description: 'New 2025 agentic coding assistant with advanced task decomposition',
    pricing: '$20/month',
    keyFeatures: ['Task decomposition', 'Autonomous execution', 'Multi-file changes', 'Git integration', 'Context preservation'],
    limitations: ['Newer platform', 'Limited track record'],
    bestFor: 'Complex autonomous coding tasks',
    models: ['Claude', 'GPT-4'],
    deployment: ['CLI', 'VS Code'],
    badge: 'New 2025',
    url: 'https://jules.ai'
  },

  // Additional IDE/Editors
  {
    id: 'jetbrains-ai',
    name: 'JetBrains AI Assistant',
    company: 'JetBrains',
    category: 'IDE Assistants',
    description: 'AI assistant integrated into JetBrains IDEs',
    pricing: '$10/month individual',
    users: '500k+',
    keyFeatures: ['Deep IDE integration', 'Refactoring', 'Test generation', 'Documentation'],
    limitations: ['JetBrains only', 'Limited models'],
    bestFor: 'JetBrains IDE users',
    deployment: ['JetBrains IDEs']
  },
  {
    id: 'sourcegraph-cody',
    name: 'Sourcegraph Cody',
    company: 'Sourcegraph',
    category: 'IDE Assistants',
    description: 'AI coding assistant with enterprise code search',
    pricing: 'Free, Pro $9/month',
    keyFeatures: ['Code search', 'Context from repos', 'Multi-repo support', 'Enterprise ready'],
    limitations: ['Setup required', 'Learning curve'],
    bestFor: 'Large codebases',
    deployment: ['VS Code', 'JetBrains'],
    url: 'https://sourcegraph.com/cody'
  },

  // Additional VS Code Extensions
  {
    id: 'codegpt',
    name: 'CodeGPT',
    company: 'CodeGPT',
    category: 'VS Code Extensions',
    description: 'AI pair programming with multiple LLM providers',
    pricing: 'Free + API keys',
    stars: 3000,
    keyFeatures: ['Multiple LLMs', 'Custom prompts', 'Code explanation', 'Unit tests'],
    limitations: ['Requires API keys', 'Basic features'],
    bestFor: 'Flexible LLM usage',
    deployment: ['VS Code']
  },
  {
    id: 'bito',
    name: 'Bito AI',
    company: 'Bito',
    category: 'VS Code Extensions',
    description: 'AI assistant for code generation and explanation',
    pricing: 'Free tier, Pro $15/month',
    users: '100k+',
    keyFeatures: ['Code chat', 'Explanation', 'Performance analysis', 'Security checks'],
    limitations: ['Limited free tier', 'Rate limits'],
    bestFor: 'Code understanding',
    deployment: ['VS Code', 'JetBrains']
  },

  // Additional Web Platforms
  {
    id: 'codesandbox-ai',
    name: 'CodeSandbox AI',
    company: 'CodeSandbox',
    category: 'Web Platforms',
    description: 'Cloud development platform with AI assistance',
    pricing: 'Free tier, Pro $15/month',
    users: '4M+',
    keyFeatures: ['Cloud IDE', 'AI suggestions', 'Instant preview', 'Collaboration'],
    limitations: ['Internet required', 'Resource limits'],
    bestFor: 'Web development',
    deployment: ['Browser'],
    url: 'https://codesandbox.io'
  },
  {
    id: 'gitpod',
    name: 'Gitpod',
    company: 'Gitpod',
    category: 'Web Platforms',
    description: 'Cloud development environments with AI features',
    pricing: 'Free 50hrs/month, Pro $9',
    users: '1M+',
    keyFeatures: ['Instant dev environments', 'AI assistance', 'GitHub integration', 'Prebuilds'],
    limitations: ['Usage limits', 'Internet dependent'],
    bestFor: 'Cloud development',
    deployment: ['Browser'],
    url: 'https://gitpod.io'
  },

  // Additional Testing Tools
  {
    id: 'codacy',
    name: 'Codacy',
    company: 'Codacy',
    category: 'Testing & Quality',
    description: 'Automated code review and quality monitoring',
    pricing: 'Free for open source, Pro from $15',
    keyFeatures: ['Auto review', 'Quality metrics', 'Security analysis', 'Coverage reports'],
    limitations: ['Config overhead', 'False positives'],
    bestFor: 'Code quality automation',
    deployment: ['GitHub', 'GitLab', 'CI/CD']
  },

  // Additional Autonomous Agents
  {
    id: 'metgpt',
    name: 'MetaGPT',
    company: 'Open Source',
    category: 'Autonomous',
    description: 'Multi-agent framework for software development',
    pricing: 'Free (open source)',
    stars: 40000,
    keyFeatures: ['Multi-agent', 'Software company sim', 'Role-based', 'Documentation'],
    limitations: ['Complex setup', 'Resource heavy'],
    bestFor: 'Complete project generation',
    deployment: ['Local'],
    badge: 'Open Source'
  },
  {
    id: 'auto-code-rover',
    name: 'AutoCodeRover',
    company: 'Open Source',
    category: 'Autonomous',
    description: 'Autonomous program improvement for GitHub issues',
    pricing: 'Free (open source)',
    stars: 2000,
    keyFeatures: ['Issue resolution', 'Auto debugging', 'Code improvement', 'GitHub integration'],
    limitations: ['Research project', 'Limited support'],
    bestFor: 'Automated issue fixing',
    swe_bench: 22.7,
    deployment: ['Local'],
    badge: 'Research'
  },

  // No-Code Builders
  {
    id: 'databutton',
    name: 'Databutton',
    company: 'Databutton',
    category: 'No-Code',
    description: 'AI app builder for non-coders from Norway',
    pricing: 'Free tier + paid',
    keyFeatures: ['No coding required', 'Visual builder', 'App deployment', 'Database included'],
    limitations: ['Limited flexibility', 'Template-based'],
    bestFor: 'Non-technical founders',
    deployment: ['Browser']
  },
  {
    id: 'canvas',
    name: 'Canvas (Canva Code)',
    company: 'Canva',
    category: 'No-Code',
    description: 'Visual-first code generation for marketers',
    pricing: 'Included with Canva',
    keyFeatures: ['Visual design', 'Lead magnets', 'Interactive tools', 'Marketing focus'],
    limitations: ['Simple apps only', 'Marketing focused'],
    bestFor: 'Marketers and designers',
    deployment: ['Browser']
  },
  {
    id: 'trae',
    name: 'Trae',
    company: 'ByteDance',
    category: 'No-Code',
    description: 'Full-stack web app development through prompting',
    pricing: 'Free',
    keyFeatures: ['Full-stack apps', 'Intuitive prompting', 'Free tool', 'Rapid development'],
    limitations: ['Limited support', 'Basic features'],
    bestFor: 'Quick web apps',
    deployment: ['Browser'],
    badge: 'Free'
  },
  {
    id: 'grok-studio',
    name: 'Grok Studio',
    company: 'X (Twitter)',
    category: 'No-Code',
    description: 'Fun, intuitive coding for beginners',
    pricing: 'Free with X Premium',
    keyFeatures: ['Beginner friendly', 'Interactive learning', 'Code playground', 'AI assistance'],
    limitations: ['Learning focused', 'Not production'],
    bestFor: 'Learning to code',
    deployment: ['Browser']
  }
];

export default function ToolsDirectoryContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [deploymentFilter, setDeploymentFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category)))];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'free' && tool.pricing.toLowerCase().includes('free')) ||
                        (priceFilter === 'paid' && !tool.pricing.toLowerCase().includes('free'));
    const matchesDeployment = deploymentFilter === 'all' ||
                             (deploymentFilter === 'cloud' && tool.deployment?.some(d => d.includes('Cloud') || d.includes('Browser'))) ||
                             (deploymentFilter === 'local' && tool.deployment?.some(d => d.includes('Local') || d.includes('Desktop')));

    return matchesCategory && matchesSearch && matchesPrice && matchesDeployment;
  });

  const categoryStats = categories.slice(1).map(cat => ({
    name: cat,
    count: tools.filter(t => t.category === cat).length,
    icon: cat.includes('IDE') ? Code2 :
          cat.includes('Terminal') ? Terminal :
          cat.includes('VS Code') ? Package :
          cat.includes('Web') ? Globe :
          cat.includes('Autocomplete') ? Zap :
          cat.includes('Testing') ? Shield :
          cat.includes('Autonomous') ? Brain :
          Users
  }));

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <div className="px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
              <Wrench className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                AI Coding Tools Directory
              </h1>
              <p className="text-gray-400 mt-2">
                Comprehensive guide to 40+ AI coding assistants, agents, and platforms
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{tools.length}</div>
            <div className="text-sm text-gray-400">Total Tools</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{tools.filter(t => t.pricing.toLowerCase().includes('free')).length}</div>
            <div className="text-sm text-gray-400">Free Options</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{tools.filter(t => t.badge === 'Open Source').length}</div>
            <div className="text-sm text-gray-400">Open Source</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Options</option>
              <option value="paid">Paid Only</option>
            </select>

            {/* Deployment Filter */}
            <select
              value={deploymentFilter}
              onChange={(e) => setDeploymentFilter(e.target.value)}
              className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All Deployment</option>
              <option value="cloud">Cloud/Browser</option>
              <option value="local">Local/Desktop</option>
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredTools.length} of {tools.length} tools
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

        {/* Category Cards */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categoryStats.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 hover:border-gray-600 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <cat.icon className="w-5 h-5 text-teal-400" />
                  <span className="text-2xl font-bold text-white">{cat.count}</span>
                </div>
                <div className="text-sm text-gray-300">{cat.name}</div>
              </button>
            ))}
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 hover:border-gray-600 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  {tool.company && (
                    <p className="text-xs text-gray-500">{tool.company}</p>
                  )}
                </div>
                {tool.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tool.badge === 'Open Source' ? 'bg-green-500/20 text-green-400' :
                    tool.badge === 'Enterprise' ? 'bg-purple-500/20 text-purple-400' :
                    tool.badge === 'Free' ? 'bg-cyan-500/20 text-cyan-400' :
                    tool.badge.includes('ARR') ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {tool.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-3">{tool.description}</p>

              {/* Pricing */}
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-300">{tool.pricing}</span>
              </div>

              {/* Stats */}
              {(tool.stars || tool.users) && (
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  {tool.stars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {tool.stars > 1000 ? `${(tool.stars / 1000).toFixed(0)}k` : tool.stars}
                    </div>
                  )}
                  {tool.users && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {tool.users}
                    </div>
                  )}
                </div>
              )}

              {/* Performance Metrics */}
              {(tool.swe_bench || tool.humaneval) && (
                <div className="flex items-center gap-3 mb-3 text-xs">
                  {tool.swe_bench && (
                    <span className="text-green-400">SWE: {tool.swe_bench}%</span>
                  )}
                  {tool.humaneval && (
                    <span className="text-blue-400">HumanEval: {tool.humaneval}%</span>
                  )}
                </div>
              )}

              {/* Key Features */}
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Key Features:</div>
                <div className="flex flex-wrap gap-1">
                  {tool.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-900/50 text-xs text-gray-400 rounded">
                      {feature}
                    </span>
                  ))}
                  {tool.keyFeatures.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-900/50 text-xs text-gray-500 rounded">
                      +{tool.keyFeatures.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Best For */}
              <div className="text-xs text-gray-400 mb-3">
                <span className="text-gray-500">Best for:</span> {tool.bestFor}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <button className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
                  View Details →
                </button>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
                  >
                    Visit
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceFilter('all');
                setDeploymentFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}