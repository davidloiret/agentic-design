"use client"

import React, { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Tag, Lightbulb, Code } from 'lucide-react';

interface Library {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  stars: number;
  forks: number;
  useCases: string[];
  category: string;
  referenceProjects: ReferenceProject[];
  lastUpdated: string;
  license: string;
  npmUrl?: string;
}

interface ReferenceProject {
  name: string;
  githubUrl: string;
  stars: number;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  isOpenSource: boolean;
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  techniques: string[];
  prompts: string[];
  category: string;
  tags: string[];
}

const libraries: Library[] = [
  {
    id: 'eventsource-parser',
    name: 'eventsource-parser',
    description: 'A streaming parser for server-sent events/eventsource, without any assumptions about how the actual stream is read.',
    githubUrl: 'https://github.com/rexxars/eventsource-parser',
    stars: 532,
    forks: 45,
    useCases: ['Server-sent events parsing', 'Streaming API responses', 'Real-time data processing', 'Chat applications', 'Live updates'],
    category: 'Streaming',
    referenceProjects: [
      {
        name: 'OpenAI Node.js API',
        githubUrl: 'https://github.com/openai/openai-node',
        stars: 6800,
        description: 'Official OpenAI Node.js library using eventsource-parser for streaming completions'
      },
      {
        name: 'Vercel AI SDK',
        githubUrl: 'https://github.com/vercel/ai',
        stars: 8500,
        description: 'AI SDK for TypeScript that uses eventsource-parser for streaming responses'
      }
    ],
    lastUpdated: '2024-03-15',
    license: 'MIT',
    npmUrl: 'https://www.npmjs.com/package/eventsource-parser'
  },
  {
    id: 'zod',
    name: 'Zod',
    description: 'TypeScript-first schema validation with static type inference.',
    githubUrl: 'https://github.com/colinhacks/zod',
    stars: 32000,
    forks: 1100,
    useCases: ['API validation', 'Form validation', 'Runtime type checking', 'Data parsing', 'Schema definition'],
    category: 'Validation',
    referenceProjects: [
      {
        name: 'tRPC',
        githubUrl: 'https://github.com/trpc/trpc',
        stars: 33000,
        description: 'End-to-end typesafe APIs made easy, uses Zod for input validation'
      },
      {
        name: 'T3 Stack',
        githubUrl: 'https://github.com/t3-oss/create-t3-app',
        stars: 24000,
        description: 'Full-stack TypeScript framework that heavily relies on Zod'
      }
    ],
    lastUpdated: '2024-04-01',
    license: 'MIT',
    npmUrl: 'https://www.npmjs.com/package/zod'
  }
];

// Helper function to add new libraries - makes the system extendable
export const addLibrary = (newLibrary: Omit<Library, 'id'> & { id?: string }): Library => {
  const library: Library = {
    id: newLibrary.id || newLibrary.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    ...newLibrary
  };
  libraries.push(library);
  return library;
};

// Helper function to search libraries by multiple criteria
export const searchLibraries = (query: string, category?: string): Library[] => {
  return libraries.filter(library => {
    const matchesCategory = !category || category === 'all' || library.category === category;
    const matchesQuery = !query || 
      library.name.toLowerCase().includes(query.toLowerCase()) ||
      library.description.toLowerCase().includes(query.toLowerCase()) ||
      library.useCases.some(useCase => useCase.toLowerCase().includes(query.toLowerCase())) ||
      library.referenceProjects.some(project => 
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });
};

const projects: Project[] = [
  {
    id: '1',
    name: 'AutoGPT',
    description: 'An experimental open-source attempt to make GPT-4 fully autonomous.',
    isOpenSource: true,
    githubUrl: 'https://github.com/Significant-Gravitas/AutoGPT',
    stars: 164000,
    forks: 43000,
    techniques: ['Chain of Thought', 'Planning', 'Tool Use', 'Memory Management'],
    prompts: [
      'You are Auto-GPT, an AI designed to autonomously accomplish goals',
      'Break down complex tasks into manageable subtasks',
      'Use available tools to gather information and execute actions'
    ],
    category: 'Autonomous Agents',
    tags: ['autonomous', 'planning', 'gpt-4']
  },
  {
    id: '2',
    name: 'LangChain',
    description: 'Framework for developing applications powered by language models.',
    isOpenSource: true,
    githubUrl: 'https://github.com/langchain-ai/langchain',
    stars: 89000,
    forks: 14000,
    techniques: ['Retrieval Augmented Generation', 'Chain of Thought', 'Agent Framework', 'Vector Search'],
    prompts: [
      'Use the following context to answer the question',
      'Think step by step to solve this problem',
      'Select the appropriate tool for this task'
    ],
    category: 'Framework',
    tags: ['rag', 'framework', 'python']
  },
  {
    id: '3',
    name: 'GPT Engineer',
    description: 'Specify what you want it to build, the AI asks for clarification, and then builds it.',
    isOpenSource: true,
    githubUrl: 'https://github.com/gpt-engineer-org/gpt-engineer',
    stars: 51000,
    forks: 8000,
    techniques: ['Clarification', 'Code Generation', 'Iterative Refinement'],
    prompts: [
      'Ask clarifying questions about the requirements',
      'Generate clean, well-documented code',
      'Iterate based on feedback and requirements'
    ],
    category: 'Code Generation',
    tags: ['coding', 'clarification', 'iteration']
  },
  {
    id: '4',
    name: 'ChatGPT Plus',
    description: 'OpenAI\'s premium conversational AI with advanced capabilities.',
    isOpenSource: false,
    liveUrl: 'https://chat.openai.com',
    techniques: ['Conversation', 'Code Interpreter', 'Web Browsing', 'DALL-E Integration'],
    prompts: [
      'Engage in helpful, harmless, and honest conversation',
      'Generate and execute Python code for analysis',
      'Browse the web for current information'
    ],
    category: 'Conversational AI',
    tags: ['proprietary', 'multimodal', 'web-access']
  },
  {
    id: '5',
    name: 'Cursor',
    description: 'AI-powered code editor built for pair programming with AI.',
    isOpenSource: false,
    liveUrl: 'https://cursor.sh',
    techniques: ['Code Completion', 'Context Awareness', 'Pair Programming', 'Code Explanation'],
    prompts: [
      'Complete this code based on context and patterns',
      'Explain this code section in simple terms',
      'Suggest improvements for this implementation'
    ],
    category: 'Development Tools',
    tags: ['proprietary', 'ide', 'code-completion']
  }
];

export const ProjectHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'libraries'>('projects');

  const projectCategories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const libraryCategories = ['all', ...Array.from(new Set(libraries.map(l => l.category)))];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techniques.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredLibraries = libraries.filter(library => {
    const matchesCategory = selectedCategory === 'all' || library.category === selectedCategory;
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.useCases.some(useCase => useCase.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-10xl mx-auto px-6 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Project Hub</h1>
          <p className="text-gray-400 mb-6">
            Get inspired by amazing agentic projects, their techniques, and useful libraries with real-world examples.
          </p>
          
          {/* Tabs */}
          <div className="flex gap-1 mb-6">
            <button
              onClick={() => {setActiveTab('projects'); setSelectedCategory('all');}}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => {setActiveTab('libraries'); setSelectedCategory('all');}}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'libraries'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Libraries
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder={activeTab === 'projects' ? "Search projects, techniques, or descriptions..." : "Search libraries, use cases, or descriptions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {(activeTab === 'projects' ? projectCategories : libraryCategories).map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'projects' ? filteredProjects.map(project => (
            <div key={project.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all cursor-pointer"
                 onClick={() => setSelectedProject(project)}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <div className="flex items-center gap-2">
                  {project.isOpenSource ? (
                    <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full flex items-center gap-1">
                      <Github className="w-3 h-3" />
                      Open Source
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded-full">
                      Proprietary
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
              
              {/* GitHub Stats */}
              {project.isOpenSource && project.stars && (
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {(project.stars / 1000).toFixed(0)}k
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {(project.forks! / 1000).toFixed(0)}k
                  </div>
                </div>
              )}
              
              {/* Techniques */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                  <Code className="w-4 h-4" />
                  Techniques
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.techniques.slice(0, 3).map(technique => (
                    <span key={technique} className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded">
                      {technique}
                    </span>
                  ))}
                  {project.techniques.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      +{project.techniques.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors"
                     onClick={(e) => e.stopPropagation()}>
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors"
                     onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>
            </div>
          )) : filteredLibraries.map(library => (
            <div key={library.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all cursor-pointer"
                 onClick={() => setSelectedLibrary(library)}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{library.name}</h3>
                <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-full">
                  {library.license}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4 text-sm">{library.description}</p>
              
              {/* GitHub Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {library.stars > 1000 ? `${(library.stars / 1000).toFixed(1)}k` : library.stars}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {library.forks > 1000 ? `${(library.forks / 1000).toFixed(1)}k` : library.forks}
                </div>
              </div>
              
              {/* Use Cases */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  Use Cases
                </h4>
                <div className="flex flex-wrap gap-1">
                  {library.useCases.slice(0, 3).map(useCase => (
                    <span key={useCase} className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">
                      {useCase}
                    </span>
                  ))}
                  {library.useCases.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      +{library.useCases.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Reference Projects Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Used by {library.referenceProjects.length} projects</h4>
                <div className="text-xs text-gray-500">
                  {library.referenceProjects.slice(0, 2).map(ref => ref.name).join(', ')}
                  {library.referenceProjects.length > 2 && ` +${library.referenceProjects.length - 2} more`}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex gap-2">
                <a href={library.githubUrl} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors"
                   onClick={(e) => e.stopPropagation()}>
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
                {library.npmUrl && (
                  <a href={library.npmUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1 px-3 py-1 bg-red-800 hover:bg-red-700 text-red-300 text-xs rounded transition-colors"
                     onClick={(e) => e.stopPropagation()}>
                    npm
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedProject(null)}>
            <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.name}</h2>
                    <p className="text-gray-400">{selectedProject.description}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </div>
                
                {/* All Techniques */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Techniques Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techniques.map(technique => (
                      <span key={technique} className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Prompts */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Key Prompts & Patterns
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.prompts.map((prompt, index) => (
                      <div key={index} className="bg-gray-800 border border-gray-700 rounded p-3">
                        <code className="text-green-300 text-sm">{prompt}</code>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Try It Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Library Detail Modal */}
        {selectedLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedLibrary(null)}>
            <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      {selectedLibrary.name}
                      <span className="px-3 py-1 bg-blue-900 text-blue-300 text-sm rounded-full">
                        {selectedLibrary.license}
                      </span>
                    </h2>
                    <p className="text-gray-400 mb-3">{selectedLibrary.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {selectedLibrary.stars.toLocaleString()} stars
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {selectedLibrary.forks.toLocaleString()} forks
                      </div>
                      <span>Updated {selectedLibrary.lastUpdated}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLibrary(null)} className="text-gray-400 hover:text-white">
                    ✕
                  </button>
                </div>
                
                {/* Use Cases */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Use Cases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLibrary.useCases.map(useCase => (
                      <span key={useCase} className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Reference Projects */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Projects Using This Library
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLibrary.referenceProjects.map(project => (
                      <div key={project.name} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Star className="w-3 h-3" />
                            {project.stars > 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                          <Github className="w-3 h-3" />
                          View on GitHub
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  <a href={selectedLibrary.githubUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                  {selectedLibrary.npmUrl && (
                    <a href={selectedLibrary.npmUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                      Install via npm
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};