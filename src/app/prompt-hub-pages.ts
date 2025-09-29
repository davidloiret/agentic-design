export interface PromptHubPage {
  id: string; // Full path like "anthropic/claude-35-sonnet-20240712"
  provider: string;
  model: string;
  date: string;
  title: string;
  description: string;
  keywords?: string[];
  priority?: number;
}

export const promptHubPages: PromptHubPage[] = [
  // Anthropic
  {
    id: 'anthropic/claude-2-0-20240306',
    provider: 'Anthropic',
    model: 'Claude 2.0',
    date: 'March 6, 2024',
    title: 'Anthropic Claude 2.0 System Prompt (March 2024)',
    description: 'Leaked system prompt for Anthropic Claude 2.0 from March 2024. Explore the hidden instructions that define Claude 2.0\'s behavior, personality, and capabilities.',
    keywords: ['Claude 2.0', 'Anthropic', 'system prompt', 'leaked prompt', 'AI instructions'],
    priority: 0.7
  },
  {
    id: 'anthropic/claude-2-1-20240306',
    provider: 'Anthropic',
    model: 'Claude 2.1',
    date: 'March 6, 2024',
    title: 'Anthropic Claude 2.1 System Prompt (March 2024)',
    description: 'Leaked system prompt for Anthropic Claude 2.1 from March 2024. Learn how Claude 2.1 was programmed to behave and respond.',
    keywords: ['Claude 2.1', 'Anthropic', 'system prompt', 'leaked prompt'],
    priority: 0.7
  },
  {
    id: 'anthropic/claude-3-opus-20240306',
    provider: 'Anthropic',
    model: 'Claude 3 Opus',
    date: 'March 6, 2024',
    title: 'Anthropic Claude 3 Opus System Prompt (March 2024)',
    description: 'Leaked system prompt for Anthropic Claude 3 Opus. Discover the instructions behind Claude\'s most powerful model.',
    keywords: ['Claude 3 Opus', 'Anthropic', 'system prompt', 'leaked prompt'],
    priority: 0.8
  },
  {
    id: 'anthropic/claude-35-sonnet-20240712',
    provider: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    date: 'July 12, 2024',
    title: 'Anthropic Claude 3.5 Sonnet System Prompt (July 2024)',
    description: 'Leaked system prompt for Anthropic Claude 3.5 Sonnet from July 2024. The latest instructions for Claude\'s flagship model.',
    keywords: ['Claude 3.5 Sonnet', 'Anthropic', 'system prompt', 'leaked prompt'],
    priority: 0.9
  },
  {
    id: 'anthropic/claude-37-sonnet-20250224',
    provider: 'Anthropic',
    model: 'Claude 3.7 Sonnet',
    date: 'February 24, 2025',
    title: 'Anthropic Claude 3.7 Sonnet System Prompt (February 2025)',
    description: 'Latest leaked system prompt for Anthropic Claude 3.7 Sonnet from February 2025. See the newest updates to Claude\'s instructions.',
    keywords: ['Claude 3.7 Sonnet', 'Anthropic', 'system prompt', 'leaked prompt'],
    priority: 0.9
  },
  {
    id: 'anthropic/claude-api-tool-use-20250119',
    provider: 'Anthropic',
    model: 'Claude API Tool Use',
    date: 'January 19, 2025',
    title: 'Anthropic Claude API Tool Use System Prompt (January 2025)',
    description: 'Leaked system prompt for Claude\'s tool use API from January 2025. Learn how Claude is instructed to use tools and function calling.',
    keywords: ['Claude API', 'tool use', 'function calling', 'Anthropic', 'system prompt'],
    priority: 0.8
  },

  // OpenAI
  {
    id: 'openai/chatgpt-20221201',
    provider: 'OpenAI',
    model: 'ChatGPT',
    date: 'December 1, 2022',
    title: 'OpenAI ChatGPT System Prompt (December 2022)',
    description: 'Original leaked system prompt for ChatGPT from December 2022. Historical look at how ChatGPT was initially programmed.',
    keywords: ['ChatGPT', 'OpenAI', 'system prompt', 'leaked prompt', 'GPT-3.5'],
    priority: 0.8
  },
  {
    id: 'openai/chatgpt-4o-20241210',
    provider: 'OpenAI',
    model: 'ChatGPT-4o',
    date: 'December 10, 2024',
    title: 'OpenAI ChatGPT-4o System Prompt (December 2024)',
    description: 'Leaked system prompt for ChatGPT-4o from December 2024. See how GPT-4o is instructed to behave and respond.',
    keywords: ['ChatGPT-4o', 'GPT-4o', 'OpenAI', 'system prompt', 'leaked prompt'],
    priority: 0.9
  },
  {
    id: 'openai/chatgpt-4o-20250506',
    provider: 'OpenAI',
    model: 'ChatGPT-4o',
    date: 'May 6, 2025',
    title: 'OpenAI ChatGPT-4o System Prompt (May 2025)',
    description: 'Latest leaked system prompt for ChatGPT-4o from May 2025. Updated instructions for GPT-4o\'s behavior.',
    keywords: ['ChatGPT-4o', 'GPT-4o', 'OpenAI', 'system prompt'],
    priority: 0.9
  },
  {
    id: 'openai/chatgpt-4o-mini-voice-mode-20250706',
    provider: 'OpenAI',
    model: 'ChatGPT-4o-mini Voice Mode',
    date: 'July 6, 2025',
    title: 'OpenAI ChatGPT-4o-mini Voice Mode System Prompt (July 2025)',
    description: 'Leaked system prompt for ChatGPT-4o-mini voice mode. Learn how voice interactions are programmed.',
    keywords: ['ChatGPT-4o-mini', 'voice mode', 'OpenAI', 'system prompt'],
    priority: 0.8
  },
  {
    id: 'openai/dalle-3-20231007',
    provider: 'OpenAI',
    model: 'DALL-E 3',
    date: 'October 7, 2023',
    title: 'OpenAI DALL-E 3 System Prompt (October 2023)',
    description: 'Leaked system prompt for DALL-E 3. Discover how image generation models are instructed to create and modify images.',
    keywords: ['DALL-E 3', 'image generation', 'OpenAI', 'system prompt'],
    priority: 0.8
  },

  // Bolt
  {
    id: 'bolt/bolt-new-20241009',
    provider: 'Bolt',
    model: 'Bolt.new',
    date: 'October 9, 2024',
    title: 'Bolt.new System Prompt (October 2024)',
    description: 'Leaked system prompt for Bolt.new AI coding platform. See how Bolt is programmed to generate full-stack applications.',
    keywords: ['Bolt.new', 'AI coding', 'system prompt', 'code generation'],
    priority: 0.8
  },

  // Browser Company
  {
    id: 'browser-company/dia-20250515',
    provider: 'Browser Company',
    model: 'Dia',
    date: 'May 15, 2025',
    title: 'Browser Company Dia System Prompt (May 2025)',
    description: 'Leaked system prompt for Browser Company\'s Dia AI assistant. Learn how Dia is programmed for web browsing assistance.',
    keywords: ['Dia', 'Browser Company', 'system prompt', 'AI browser'],
    priority: 0.7
  },

  // Codeium
  {
    id: 'codeium/windsurf-cascade-r1-20250201',
    provider: 'Codeium',
    model: 'Windsurf Cascade R1',
    date: 'February 1, 2025',
    title: 'Codeium Windsurf Cascade R1 System Prompt (February 2025)',
    description: 'Leaked system prompt for Codeium Windsurf Cascade R1. Discover how this AI coding assistant is programmed.',
    keywords: ['Windsurf', 'Codeium', 'Cascade', 'system prompt', 'AI coding'],
    priority: 0.8
  },

  // Cognition
  {
    id: 'cognition/devin-20250515',
    provider: 'Cognition',
    model: 'Devin',
    date: 'May 15, 2025',
    title: 'Cognition Devin System Prompt (May 2025)',
    description: 'Leaked system prompt for Cognition\'s Devin AI software engineer. Learn how the first AI software engineer is programmed.',
    keywords: ['Devin', 'Cognition', 'AI engineer', 'system prompt', 'autonomous coding'],
    priority: 0.9
  },

  // Perplexity
  {
    id: 'perplexity/perplexity-ai-20250112',
    provider: 'Perplexity',
    model: 'Perplexity AI',
    date: 'January 12, 2025',
    title: 'Perplexity AI System Prompt (January 2025)',
    description: 'Leaked system prompt for Perplexity AI search assistant. See how Perplexity is programmed for research and citations.',
    keywords: ['Perplexity', 'AI search', 'system prompt', 'research assistant'],
    priority: 0.8
  },

  // Vercel
  {
    id: 'vercel/v0-20250306',
    provider: 'Vercel',
    model: 'v0',
    date: 'March 6, 2025',
    title: 'Vercel v0 System Prompt (March 2025)',
    description: 'Leaked system prompt for Vercel v0 UI generation tool. Learn how v0 is programmed to generate React components.',
    keywords: ['v0', 'Vercel', 'UI generation', 'system prompt', 'React'],
    priority: 0.8
  }
];

export function getPromptHubPageById(id: string): PromptHubPage | undefined {
  return promptHubPages.find(page => page.id === id);
}

export function getPromptHubPagesByProvider(provider: string): PromptHubPage[] {
  return promptHubPages.filter(page => page.provider === provider);
}

export const promptHubProviders = [
  'Anthropic',
  'OpenAI',
  'Bolt',
  'Browser Company',
  'Codeium',
  'Cognition',
  'Perplexity',
  'Vercel'
];