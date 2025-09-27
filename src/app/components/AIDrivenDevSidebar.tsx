"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ChevronDown, ChevronRight, Sparkles, BookOpen, Code2, Wrench,
  FileText, Rocket, GitBranch, Cpu, Package, Users, Target,
  Layers, Hexagon, Box, TestTube, Workflow, Terminal
} from 'lucide-react';

interface SidebarSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: {
    id: string;
    label: string;
    route: string;
    icon?: React.ComponentType<any>;
    badge?: string;
  }[];
}

export const AIDrivenDevSidebar = ({
  expandedSections,
  setExpandedSections
}: {
  expandedSections: string[];
  setExpandedSections: (sections: string[]) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections: SidebarSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Sparkles,
      items: [
        { id: 'overview', label: 'Overview', route: '/ai-driven-dev' },
        { id: 'tool-directory', label: 'AI Tools Directory', route: '/ai-driven-dev/tools', icon: Wrench, badge: '40+' },
        { id: 'decision-guide', label: 'Decision Guide', route: '/ai-driven-dev/decision-guide', icon: Target },
        { id: 'environment-setup', label: 'Environment Setup', route: '/ai-driven-dev/environment-setup', icon: Terminal },
        { id: 'first-project', label: 'First AI Project', route: '/ai-driven-dev/first-project', icon: Rocket }
      ]
    },
    {
      id: 'tools-platforms',
      title: 'Tools & Platforms',
      icon: Code2,
      items: [
        { id: 'comparison-matrix', label: 'Comparison Matrix', route: '/ai-driven-dev/comparison', badge: 'New' },
        { id: 'ide-assistants', label: 'IDE Assistants (4)', route: '/ai-driven-dev/ide-assistants' },
        { id: 'terminal-agents', label: 'Terminal Agents (6)', route: '/ai-driven-dev/terminal-agents' },
        { id: 'vscode-extensions', label: 'VS Code Extensions (4)', route: '/ai-driven-dev/vscode-extensions' },
        { id: 'web-platforms', label: 'Web Platforms (5)', route: '/ai-driven-dev/web-platforms' },
        { id: 'autocomplete', label: 'Autocomplete Tools (4)', route: '/ai-driven-dev/autocomplete' },
        { id: 'code-review', label: 'Code Review (4)', route: '/ai-driven-dev/code-review' },
        { id: 'testing-quality', label: 'Testing & Quality (3)', route: '/ai-driven-dev/testing-quality' },
        { id: 'autonomous', label: 'Autonomous Agents (4)', route: '/ai-driven-dev/autonomous' },
        { id: 'no-code', label: 'No-Code Builders (4)', route: '/ai-driven-dev/no-code' }
      ]
    },
    {
      id: 'methodologies',
      title: 'Methodologies',
      icon: BookOpen,
      items: [
        { id: 'vibe-coding', label: 'Vibe Coding', route: '/ai-driven-dev/vibe-coding', icon: Sparkles, badge: 'New' },
        { id: 'spec-driven', label: 'Spec-Driven Development', route: '/ai-driven-dev/spec-driven', icon: FileText, badge: 'Hot' },
        { id: 'test-driven-ai', label: 'Test-Driven AI Dev', route: '/ai-driven-dev/test-driven-ai', icon: TestTube },
        { id: 'ddd', label: 'Domain-Driven Design', route: '/ai-driven-dev/ddd', icon: Layers },
        { id: 'hexagonal', label: 'Hexagonal Architecture', route: '/ai-driven-dev/hexagonal', icon: Hexagon },
        { id: 'ai-pair-programming', label: 'AI Pair Programming', route: '/ai-driven-dev/ai-pair-programming', icon: Users },
        { id: 'prompt-libraries', label: 'Prompt Libraries', route: '/ai-driven-dev/prompt-libraries', icon: Code2, badge: 'Hot' }
      ]
    },
    {
      id: 'workflows',
      title: 'Production Workflows',
      icon: Workflow,
      items: [
        { id: 'spec-to-deploy', label: 'Spec → Deploy Pipeline', route: '/ai-driven-dev/spec-to-deploy', icon: Rocket, badge: 'New' },
        { id: 'harper-reed-workflow', label: 'Harper Reed Method', route: '/ai-driven-dev/harper-reed-workflow', icon: GitBranch },
        { id: '70-percent-problem', label: 'The 70% Problem', route: '/ai-driven-dev/70-percent-problem', icon: Target }
      ]
    },
    {
      id: 'examples',
      title: 'Real Examples',
      icon: Box,
      items: [
        { id: 'fullstack-app', label: 'Building Full-Stack App', route: '/ai-driven-dev/fullstack-app', icon: Box },
        { id: 'refactoring', label: 'Refactoring Legacy Code', route: '/ai-driven-dev/refactoring-legacy' },
        { id: 'debugging', label: 'Debugging with AI', route: '/ai-driven-dev/debugging' },
        { id: 'api-development', label: 'API Development', route: '/ai-driven-dev/api-development' },
        { id: 'microservices', label: 'Microservices', route: '/ai-driven-dev/microservices', icon: Workflow },
        { id: 'performance', label: 'Performance Optimization', route: '/ai-driven-dev/performance', icon: Cpu }
      ]
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(
      expandedSections.includes(sectionId)
        ? expandedSections.filter(id => id !== sectionId)
        : [...expandedSections, sectionId]
    );
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const isActiveRoute = (route: string) => pathname === route;

  if (isMobile) {
    return null;
  }

  return (
    <aside className={`${
      isCollapsed ? 'w-16' : 'w-80'
    } bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 min-h-screen sticky top-0 transition-all duration-200 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-teal-400" />
              <span className="font-semibold text-white">AI Driven Dev</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {sections.map(section => (
          <div key={section.id} className="mb-6">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <section.icon className="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors" />
                {!isCollapsed && (
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${
                  expandedSections.includes(section.id) ? '' : '-rotate-90'
                }`} />
              )}
            </button>

            {!isCollapsed && expandedSections.includes(section.id) && (
              <div className="mt-2 space-y-1 ml-6">
                {section.items.map(item => {
                  const isActive = isActiveRoute(item.route);
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.route)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-400 border-l-2 border-teal-400'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="w-3 h-3" />}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          item.badge === 'New'
                            ? 'bg-blue-500/20 text-blue-400'
                            : item.badge === 'Hot'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-500">
            <div className="flex items-center justify-between mb-1">
              <span>Last updated</span>
              <span className="text-gray-400">Jan 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tools covered</span>
              <span className="text-gray-400">6</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};