'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FileText, Edit3, Users, Eye, Lock, Unlock, MessageSquare, GitBranch, CheckCircle, AlertCircle, Clock, Zap, Hash, Type, Code, Image, BarChart } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  status: 'idle' | 'reading' | 'writing' | 'thinking' | 'reviewing';
  color: string;
  icon: string;
  currentFocus?: string;
  contributionCount: number;
}

interface ScratchpadEntry {
  id: string;
  type: 'text' | 'code' | 'diagram' | 'data' | 'comment';
  content: string;
  author: string;
  timestamp: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  locked: boolean;
  lockedBy?: string;
  version: number;
  history: Array<{
    content: string;
    author: string;
    timestamp: number;
  }>;
  references: string[];
  tags: string[];
}

interface Collaboration {
  id: string;
  name: string;
  description: string;
  goal: string;
  phases: string[];
  requiredElements: string[];
}

interface Activity {
  id: string;
  agentId: string;
  action: 'create' | 'edit' | 'comment' | 'reference' | 'review' | 'lock' | 'unlock';
  targetId?: string;
  description: string;
  timestamp: number;
}

interface Insight {
  id: string;
  type: 'connection' | 'conflict' | 'synthesis' | 'question';
  description: string;
  involvedAgents: string[];
  relatedEntries: string[];
  timestamp: number;
}

const AGENTS: Agent[] = [
  {
    id: 'agent-researcher',
    name: 'Researcher',
    role: 'Information Gatherer',
    specialty: ['research', 'fact-checking', 'data-collection'],
    status: 'idle',
    color: 'text-blue-400',
    icon: '🔍',
    contributionCount: 0
  },
  {
    id: 'agent-analyst',
    name: 'Analyst',
    role: 'Data Processor',
    specialty: ['analysis', 'patterns', 'insights'],
    status: 'idle',
    color: 'text-green-400',
    icon: '📊',
    contributionCount: 0
  },
  {
    id: 'agent-designer',
    name: 'Designer',
    role: 'Visual Creator',
    specialty: ['diagrams', 'visualization', 'structure'],
    status: 'idle',
    color: 'text-purple-400',
    icon: '🎨',
    contributionCount: 0
  },
  {
    id: 'agent-coder',
    name: 'Developer',
    role: 'Code Writer',
    specialty: ['coding', 'algorithms', 'implementation'],
    status: 'idle',
    color: 'text-yellow-400',
    icon: '💻',
    contributionCount: 0
  },
  {
    id: 'agent-reviewer',
    name: 'Reviewer',
    role: 'Quality Controller',
    specialty: ['review', 'validation', 'synthesis'],
    status: 'idle',
    color: 'text-orange-400',
    icon: '✅',
    contributionCount: 0
  }
];

const COLLABORATIONS: Collaboration[] = [
  {
    id: 'business-plan',
    name: 'Business Plan Development',
    description: 'Collaboratively create a comprehensive business plan',
    goal: 'Complete business plan with market analysis, financial projections, and strategy',
    phases: ['research', 'analysis', 'planning', 'review', 'finalization'],
    requiredElements: ['market-research', 'financial-data', 'strategy-diagram', 'implementation-code', 'executive-summary']
  },
  {
    id: 'software-architecture',
    name: 'Software Architecture Design',
    description: 'Design a microservices architecture collaboratively',
    goal: 'Complete architecture with diagrams, code samples, and documentation',
    phases: ['requirements', 'design', 'implementation', 'documentation', 'review'],
    requiredElements: ['requirements-list', 'architecture-diagram', 'api-design', 'code-samples', 'documentation']
  },
  {
    id: 'research-paper',
    name: 'Research Paper Writing',
    description: 'Collaborative academic research paper',
    goal: 'Complete research paper with data, analysis, and conclusions',
    phases: ['literature-review', 'methodology', 'analysis', 'writing', 'revision'],
    requiredElements: ['literature-review', 'data-tables', 'analysis-graphs', 'methodology-code', 'conclusions']
  },
  {
    id: 'product-launch',
    name: 'Product Launch Strategy',
    description: 'Plan and document a product launch',
    goal: 'Complete launch strategy with timeline, marketing, and metrics',
    phases: ['market-analysis', 'strategy', 'timeline', 'marketing', 'metrics'],
    requiredElements: ['market-data', 'strategy-outline', 'timeline-visual', 'marketing-copy', 'metrics-dashboard']
  }
];

export default function SharedScratchpadDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedCollaborationIndex, setSelectedCollaborationIndex] = useState(0);
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [scratchpadEntries, setScratchpadEntries] = useState<ScratchpadEntry[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'idle' | 'initializing' | 'collaborating' | 'reviewing' | 'synthesizing' | 'complete'>('idle');
  const [logs, setLogs] = useState<Array<{ timestamp: string; type: string; message: string }>>([]);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const entriesRef = useRef<ScratchpadEntry[]>([]);

  const addLog = useCallback((type: string, message: string) => {
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  }, []);

  const getAvailablePosition = useCallback((size: { width: number; height: number }) => {
    // Grid-based positioning to prevent overlaps
    const gridSize = 20;
    const maxX = 500;
    const maxY = 350;
    const entries = entriesRef.current;

    for (let y = gridSize; y < maxY; y += gridSize * 4) {
      for (let x = gridSize; x < maxX; x += gridSize * 8) {
        // Check if this position overlaps with any existing entry
        const overlaps = entries.some(entry => {
          const entryRight = entry.position.x + entry.size.width;
          const entryBottom = entry.position.y + entry.size.height;
          const newRight = x + size.width;
          const newBottom = y + size.height;

          return !(x >= entryRight || newRight <= entry.position.x ||
                  y >= entryBottom || newBottom <= entry.position.y);
        });

        if (!overlaps) {
          return { x, y };
        }
      }
    }

    // Fallback to random position if no grid position available
    return {
      x: Math.random() * (maxX - size.width),
      y: Math.random() * (maxY - size.height)
    };
  }, []);

  const createEntry = useCallback((
    type: ScratchpadEntry['type'],
    content: string,
    author: string,
    tags: string[] = [],
    position?: { x: number; y: number }
  ): ScratchpadEntry => {
    const agent = agents.find(a => a.id === author);
    const size = {
      width: type === 'diagram' ? 200 : 180,
      height: type === 'diagram' ? 150 : 120
    };

    const entry: ScratchpadEntry = {
      id: `entry-${Date.now()}-${Math.random()}`,
      type,
      content,
      author,
      timestamp: Date.now(),
      position: position || getAvailablePosition(size),
      size,
      locked: false,
      version: 1,
      history: [{
        content,
        author,
        timestamp: Date.now()
      }],
      references: [],
      tags
    };

    setScratchpadEntries(prev => {
      const newEntries = [...prev, entry];
      entriesRef.current = newEntries;
      return newEntries;
    });

    const activity: Activity = {
      id: `activity-${Date.now()}`,
      agentId: author,
      action: 'create',
      targetId: entry.id,
      description: `${agent?.name} created ${type}: ${content.substring(0, 50)}...`,
      timestamp: Date.now()
    };

    setActivities(prev => [...prev, activity]);

    addLog('create', `${agent?.name} added ${type} to scratchpad`);

    return entry;
  }, [agents, addLog, getAvailablePosition]);

  const editEntry = useCallback(async (entryId: string, newContent: string, editorId: string) => {
    const agent = agents.find(a => a.id === editorId);

    // Lock the entry
    setScratchpadEntries(prev => prev.map(e =>
      e.id === entryId ? { ...e, locked: true, lockedBy: editorId } : e
    ));

    setAgents(prev => prev.map(a =>
      a.id === editorId ? { ...a, status: 'writing', currentFocus: entryId } : a
    ));

    addLog('lock', `${agent?.name} locked entry for editing`);

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Edit the entry
    setScratchpadEntries(prev => prev.map(e =>
      e.id === entryId ? {
        ...e,
        content: newContent,
        version: e.version + 1,
        history: [...e.history, {
          content: newContent,
          author: editorId,
          timestamp: Date.now()
        }]
      } : e
    ));

    const activity: Activity = {
      id: `activity-${Date.now()}`,
      agentId: editorId,
      action: 'edit',
      targetId: entryId,
      description: `${agent?.name} edited entry`,
      timestamp: Date.now()
    };

    setActivities(prev => [...prev, activity]);

    // Unlock the entry
    setScratchpadEntries(prev => prev.map(e =>
      e.id === entryId ? { ...e, locked: false, lockedBy: undefined } : e
    ));

    setAgents(prev => prev.map(a =>
      a.id === editorId ? {
        ...a,
        status: 'idle',
        currentFocus: undefined,
        contributionCount: a.contributionCount + 1
      } : a
    ));

    addLog('edit', `${agent?.name} updated entry (v${scratchpadEntries.find(e => e.id === entryId)?.version})`);
  }, [agents, scratchpadEntries, speed, addLog]);

  const createReference = useCallback((fromId: string, toId: string, agentId: string) => {
    const agent = agents.find(a => a.id === agentId);

    setScratchpadEntries(prev => prev.map(e =>
      e.id === fromId ? {
        ...e,
        references: [...e.references, toId]
      } : e
    ));

    const activity: Activity = {
      id: `activity-${Date.now()}`,
      agentId,
      action: 'reference',
      targetId: fromId,
      description: `${agent?.name} linked entries`,
      timestamp: Date.now()
    };

    setActivities(prev => [...prev, activity]);

    addLog('link', `${agent?.name} connected related entries`);
  }, [agents, addLog]);

  const addComment = useCallback((targetId: string, comment: string, agentId: string) => {
    const agent = agents.find(a => a.id === agentId);

    const commentEntry = createEntry(
      'comment',
      comment,
      agentId,
      ['comment', 'feedback']
      // Don't pass position, let createEntry use getAvailablePosition
    );

    createReference(commentEntry.id, targetId, agentId);

    addLog('comment', `${agent?.name} commented on entry`);
  }, [agents, createEntry, createReference, addLog]);

  const detectInsights = useCallback(() => {
    const entries = scratchpadEntries;

    // Detect connections
    if (entries.length >= 3) {
      const relatedEntries = entries.filter(e =>
        e.tags.some(t => entries.filter(e2 => e2.id !== e.id).some(e2 => e2.tags.includes(t)))
      );

      if (relatedEntries.length >= 2) {
        const insight: Insight = {
          id: `insight-${Date.now()}`,
          type: 'connection',
          description: 'Multiple entries share common themes',
          involvedAgents: [...new Set(relatedEntries.map(e => e.author))],
          relatedEntries: relatedEntries.map(e => e.id),
          timestamp: Date.now()
        };

        setInsights(prev => [...prev, insight]);
        addLog('insight', '💡 Pattern detected: Related content identified');
      }
    }

    // Detect potential synthesis opportunities
    const codeEntries = entries.filter(e => e.type === 'code');
    const dataEntries = entries.filter(e => e.type === 'data');

    if (codeEntries.length > 0 && dataEntries.length > 0) {
      const insight: Insight = {
        id: `insight-${Date.now()}-synthesis`,
        type: 'synthesis',
        description: 'Code and data can be integrated',
        involvedAgents: [...new Set([...codeEntries, ...dataEntries].map(e => e.author))],
        relatedEntries: [...codeEntries, ...dataEntries].map(e => e.id),
        timestamp: Date.now()
      };

      setInsights(prev => [...prev, insight]);
      addLog('insight', '🔄 Synthesis opportunity identified');
    }
  }, [scratchpadEntries, addLog]);

  const runCollaborativeScratchpad = useCallback(async () => {
    const collaboration = COLLABORATIONS[selectedCollaborationIndex];

    // Reset state
    setScratchpadEntries([]);
    entriesRef.current = [];
    setActivities([]);
    setInsights([]);
    setLogs([]);
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', contributionCount: 0 })));

    addLog('start', `🚀 Starting collaborative session: ${collaboration.name}`);
    addLog('info', collaboration.description);
    addLog('goal', `Goal: ${collaboration.goal}`);

    // Phase 1: Initialization
    setCurrentPhase('initializing');
    addLog('phase', '📝 Initializing shared scratchpad');

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Phase 2: Collaborative Work
    setCurrentPhase('collaborating');
    addLog('phase', '👥 Agents begin collaborative work');

    // Researcher starts with data gathering
    setAgents(prev => prev.map(a =>
      a.id === 'agent-researcher' ? { ...a, status: 'writing' } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    const researchEntry = createEntry(
      'text',
      'Market Research: Target audience analysis shows 65% preference for mobile-first solutions. Competition analysis reveals 3 major players with combined 45% market share.',
      'agent-researcher',
      ['research', 'market-data']
    );

    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Analyst reads and adds data
    setAgents(prev => prev.map(a =>
      a.id === 'agent-analyst' ? { ...a, status: 'reading', currentFocus: researchEntry.id } :
      a.id === 'agent-researcher' ? { ...a, status: 'idle', contributionCount: 1 } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    setAgents(prev => prev.map(a =>
      a.id === 'agent-analyst' ? { ...a, status: 'writing' } : a
    ));

    const dataEntry = createEntry(
      'data',
      'Revenue Projections:\nYear 1: $500K\nYear 2: $1.5M\nYear 3: $3.2M\nGrowth Rate: 180% YoY',
      'agent-analyst',
      ['financial', 'projections']
    );

    createReference(dataEntry.id, researchEntry.id, 'agent-analyst');

    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Designer creates visualization
    setAgents(prev => prev.map(a =>
      a.id === 'agent-designer' ? { ...a, status: 'thinking' } :
      a.id === 'agent-analyst' ? { ...a, status: 'idle', contributionCount: 1 } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1200 / speed));

    setAgents(prev => prev.map(a =>
      a.id === 'agent-designer' ? { ...a, status: 'writing' } : a
    ));

    const diagramEntry = createEntry(
      'diagram',
      '📊 Customer Journey Map\n1. Awareness → 2. Interest → 3. Decision → 4. Action → 5. Retention\n[Visual flow diagram with touchpoints]',
      'agent-designer',
      ['visualization', 'customer-journey']
    );

    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Developer adds implementation
    setAgents(prev => prev.map(a =>
      a.id === 'agent-coder' ? { ...a, status: 'writing' } :
      a.id === 'agent-designer' ? { ...a, status: 'idle', contributionCount: 1 } : a
    ));

    const codeEntry = createEntry(
      'code',
      `// API Implementation
class MarketAnalytics {
  async getProjections() {
    return {
      revenue: calculateGrowth(),
      market: analyzeCompetition()
    };
  }
}`,
      'agent-coder',
      ['implementation', 'api']
    );

    createReference(codeEntry.id, dataEntry.id, 'agent-coder');

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Multiple agents collaborate on same entry
    addLog('collab', '🤝 Multiple agents collaborating on synthesis');

    setAgents(prev => prev.map(a =>
      a.id === 'agent-reviewer' ? { ...a, status: 'reading' } :
      a.id === 'agent-coder' ? { ...a, status: 'idle', contributionCount: 1 } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    // Reviewer synthesizes
    setAgents(prev => prev.map(a =>
      a.id === 'agent-reviewer' ? { ...a, status: 'writing' } : a
    ));

    const synthesisEntry = createEntry(
      'text',
      'Executive Summary: Based on market research (65% mobile preference) and financial projections ($3.2M by Year 3), recommend immediate mobile-first development with phased rollout strategy.',
      'agent-reviewer',
      ['synthesis', 'summary']
    );

    // Create references to all previous work
    createReference(synthesisEntry.id, researchEntry.id, 'agent-reviewer');
    createReference(synthesisEntry.id, dataEntry.id, 'agent-reviewer');
    createReference(synthesisEntry.id, diagramEntry.id, 'agent-reviewer');

    await new Promise(resolve => setTimeout(resolve, 800 / speed));

    // Other agents review and comment
    addComment(synthesisEntry.id, 'Validated data sources - all metrics confirmed accurate', 'agent-researcher');

    await new Promise(resolve => setTimeout(resolve, 600 / speed));

    addComment(synthesisEntry.id, 'Financial model stress-tested - projections conservative', 'agent-analyst');

    await new Promise(resolve => setTimeout(resolve, 600 / speed));

    // Collaborative editing
    addLog('collab', '✏️ Collaborative editing of synthesis');

    await editEntry(
      synthesisEntry.id,
      'Executive Summary: Based on market research (65% mobile preference) and financial projections ($3.2M by Year 3), recommend immediate mobile-first development with phased rollout strategy. Implementation timeline: 6 months to MVP, 12 months to full launch.',
      'agent-designer'
    );

    // Phase 3: Review
    setCurrentPhase('reviewing');
    addLog('phase', '🔍 Reviewing collaborative work');

    await new Promise(resolve => setTimeout(resolve, 1000 / speed));

    detectInsights();

    // Phase 4: Synthesizing
    setCurrentPhase('synthesizing');
    addLog('phase', '🎯 Synthesizing final deliverable');

    await new Promise(resolve => setTimeout(resolve, 1500 / speed));

    // Final update to all agent states
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' })));

    setCurrentPhase('complete');
    addLog('success', `✅ Collaborative session completed successfully!`);
    addLog('stats', `Total contributions: ${scratchpadEntries.length} entries, ${activities.length} activities`);
  }, [selectedCollaborationIndex, speed, addLog, createEntry, createReference, addComment, editEntry, detectInsights]);

  useEffect(() => {
    if (isRunning && currentPhase === 'idle') {
      runCollaborativeScratchpad();
    } else if (isRunning && currentPhase === 'complete') {
      setIsRunning(false);
    }
  }, [isRunning, currentPhase, runCollaborativeScratchpad]);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhase('idle');
    setAgents(AGENTS.map(a => ({ ...a, status: 'idle', contributionCount: 0 })));
    setScratchpadEntries([]);
    setActivities([]);
    setInsights([]);
    setLogs([]);
    setSelectedEntryId(null);
  };

  const getEntryIcon = (type: ScratchpadEntry['type']) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'diagram': return <Image className="w-4 h-4" />;
      case 'data': return <BarChart className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Shared Scratchpad Collaboration Demo</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Collaboration:</label>
              <select
                value={selectedCollaborationIndex}
                onChange={(e) => setSelectedCollaborationIndex(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isRunning}
              >
                {COLLABORATIONS.map((collab, idx) => (
                  <option key={collab.id} value={idx}>
                    {collab.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
              </select>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={currentPhase === 'complete'}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 space-y-4">
            {/* Shared Scratchpad */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-semibold text-white">Shared Scratchpad</h4>
                </div>
                <span className="text-xs text-gray-400">
                  {scratchpadEntries.length} entries • {scratchpadEntries.filter(e => e.locked).length} locked
                </span>
              </div>

              <div className="relative h-96 bg-gray-900 rounded border border-gray-700 overflow-hidden">
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {scratchpadEntries.flatMap(entry =>
                    entry.references.map(refId => {
                      const refEntry = scratchpadEntries.find(e => e.id === refId);
                      if (!refEntry) return null;
                      return (
                        <line
                          key={`${entry.id}-${refId}`}
                          x1={entry.position.x + 75}
                          y1={entry.position.y + 50}
                          x2={refEntry.position.x + 75}
                          y2={refEntry.position.y + 50}
                          stroke="rgba(139, 92, 246, 0.2)"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                      );
                    })
                  )}
                </svg>

                {/* Entries */}
                {scratchpadEntries.map(entry => {
                  const agent = agents.find(a => a.id === entry.author);
                  return (
                    <div
                      key={entry.id}
                      className={`absolute bg-gray-800 rounded-lg p-3 border-2 transition-all cursor-pointer ${
                        entry.locked ? 'border-red-500 animate-pulse' :
                        selectedEntryId === entry.id ? 'border-purple-500' :
                        'border-gray-600 hover:border-gray-500'
                      }`}
                      style={{
                        left: `${entry.position.x}px`,
                        top: `${entry.position.y}px`,
                        width: `${entry.size.width}px`,
                        minHeight: `${entry.size.height}px`
                      }}
                      onClick={() => setSelectedEntryId(entry.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getEntryIcon(entry.type)}
                          <span className={`text-xs font-medium ${agent?.color || 'text-gray-400'}`}>
                            {agent?.icon} {agent?.name}
                          </span>
                        </div>
                        {entry.locked && (
                          <Lock className="w-3 h-3 text-red-400" />
                        )}
                      </div>

                      <div className="text-xs text-gray-300 line-clamp-3">
                        {entry.content}
                      </div>

                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-700 px-1 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.version > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          v{entry.version}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Agents */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-400" />
                <h4 className="text-sm font-semibold text-white">Active Agents</h4>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {agents.map(agent => (
                  <div
                    key={agent.id}
                    className={`bg-gray-700 rounded-lg p-3 text-center transition-all ${
                      agent.status !== 'idle' ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="text-2xl mb-1">{agent.icon}</div>
                    <div className={`text-xs font-medium ${agent.color}`}>
                      {agent.name}
                    </div>
                    <div className={`text-xs mt-1 ${
                      agent.status === 'writing' ? 'text-yellow-400' :
                      agent.status === 'reading' ? 'text-blue-400' :
                      agent.status === 'thinking' ? 'text-purple-400' :
                      agent.status === 'reviewing' ? 'text-green-400' :
                      'text-gray-500'
                    }`}>
                      {agent.status}
                    </div>
                    {agent.contributionCount > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {agent.contributionCount} contrib{agent.contributionCount !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            {insights.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">Collaborative Insights</h4>
                </div>

                <div className="space-y-2">
                  {insights.map(insight => (
                    <div key={insight.id} className="bg-gray-700 rounded p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          insight.type === 'connection' ? 'bg-blue-900 text-blue-300' :
                          insight.type === 'synthesis' ? 'bg-green-900 text-green-300' :
                          insight.type === 'conflict' ? 'bg-red-900 text-red-300' :
                          'bg-purple-900 text-purple-300'
                        }`}>
                          {insight.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {insight.involvedAgents.length} agents involved
                        </span>
                      </div>
                      <div className="text-xs text-gray-300">{insight.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Feed */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-semibold text-white">Recent Activity</h4>
              </div>

              <div className="space-y-1 max-h-32 overflow-y-auto">
                {activities.slice(-5).reverse().map(activity => {
                  const agent = agents.find(a => a.id === activity.agentId);
                  return (
                    <div key={activity.id} className="flex items-center gap-2 text-xs">
                      <span className={agent?.color || 'text-gray-400'}>
                        {agent?.icon} {agent?.name}
                      </span>
                      <span className={`${
                        activity.action === 'create' ? 'text-green-400' :
                        activity.action === 'edit' ? 'text-yellow-400' :
                        activity.action === 'comment' ? 'text-blue-400' :
                        activity.action === 'lock' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {activity.action}
                      </span>
                      <span className="text-gray-400 flex-1">{activity.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-[600px] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                <h4 className="text-sm font-semibold text-white">Collaboration Log</h4>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600">{log.timestamp}</span>
                    <span className={`font-semibold ${
                      log.type === 'start' ? 'text-blue-400' :
                      log.type === 'phase' ? 'text-purple-400' :
                      log.type === 'create' ? 'text-green-400' :
                      log.type === 'edit' ? 'text-yellow-400' :
                      log.type === 'comment' ? 'text-cyan-400' :
                      log.type === 'link' ? 'text-indigo-400' :
                      log.type === 'lock' ? 'text-red-400' :
                      log.type === 'insight' ? 'text-orange-400' :
                      log.type === 'collab' ? 'text-pink-400' :
                      log.type === 'success' ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span className="text-gray-300 flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            {['initializing', 'collaborating', 'reviewing', 'synthesizing', 'complete'].map((phase) => (
              <div key={phase} className="flex-1 text-center">
                <div className={`text-xs mb-1 ${
                  currentPhase === phase ? 'text-white font-semibold' : 'text-gray-500'
                }`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${
                      ['initializing', 'collaborating', 'reviewing', 'synthesizing', 'complete'].indexOf(phase) <=
                      ['initializing', 'collaborating', 'reviewing', 'synthesizing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  </div>
                  <div className={`relative w-3 h-3 mx-auto rounded-full border-2 ${
                    currentPhase === phase
                      ? 'bg-purple-500 border-purple-400 animate-pulse'
                      : ['initializing', 'collaborating', 'reviewing', 'synthesizing', 'complete'].indexOf(phase) <
                        ['initializing', 'collaborating', 'reviewing', 'synthesizing', 'complete'].indexOf(currentPhase)
                        ? 'bg-purple-500 border-purple-400'
                        : 'bg-gray-800 border-gray-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}