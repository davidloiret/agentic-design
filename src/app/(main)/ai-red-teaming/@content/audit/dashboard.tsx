'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Search,
  Filter,
  Plus,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  Building2
} from 'lucide-react';
import Link from 'next/link';

// Mock data for audits
const mockAudits = [
  {
    id: '1',
    clientName: 'TechCorp AI Assistant',
    clientLogo: '🏢',
    auditType: 'Full System Audit',
    status: 'in_progress',
    progress: 65,
    startDate: '2025-01-15',
    lastActivity: '2 hours ago',
    auditor: 'John Doe',
    riskScore: 2.3,
    criticalFindings: 3,
    highFindings: 8,
    phase: 'technical'
  }
];

const statusConfig = {
  in_progress: {
    label: 'In Progress',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30'
  },
  completed: {
    label: 'Completed',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30'
  },
  scheduled: {
    label: 'Scheduled',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30'
  },
  paused: {
    label: 'Paused',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30'
  }
};

export default function AuditDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [audits] = useState(mockAudits);

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || audit.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    active: 2,
    completed: 1,
    scheduled: 0,
    criticalFindings: 9
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">AI Security Audits</h1>
            <p className="text-sm text-gray-400">Manage and track all security assessments</p>
          </div>
        </div>
        <Link
          href="/ai-red-teaming/audit/new"
          className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Audit</span>
        </Link>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col space-y-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <div className="text-2xl sm:text-3xl font-bold text-white">{stats.active}</div>
            <div className="text-xs sm:text-sm text-gray-400">Active Audits</div>
            <div className="text-xs text-blue-400">↑ 2 from last week</div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col space-y-2">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
            <div className="text-2xl sm:text-3xl font-bold text-white">{stats.completed}</div>
            <div className="text-xs sm:text-sm text-gray-400">Completed</div>
            <div className="text-xs text-gray-500">This month</div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col space-y-2">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
            <div className="text-2xl sm:text-3xl font-bold text-white">{stats.criticalFindings}</div>
            <div className="text-xs sm:text-sm text-gray-400">Critical Findings</div>
            <div className="text-xs text-orange-400">Needs attention</div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col space-y-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <div className="text-2xl sm:text-3xl font-bold text-white">2.4</div>
            <div className="text-xs sm:text-sm text-gray-400">Avg Risk Score</div>
            <div className="text-xs text-purple-400">↓ 0.3 improvement</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Audit List */}
      <div className="space-y-4">
        {filteredAudits.map((audit) => {
          const statusInfo = statusConfig[audit.status as keyof typeof statusConfig];
          const phaseText = audit.phase === 'technical' ? 'Technical' : audit.phase;
          
          return (
            <div
              key={audit.id}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Building2 className="w-10 h-10 sm:w-12 sm:h-12 p-2 sm:p-3 bg-gray-700/50 rounded-lg text-gray-400 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                        {audit.clientName}
                      </h3>
                      {audit.status === 'in_progress' && (
                        <span className="px-2 sm:px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300 self-start sm:self-auto">
                          In Progress
                        </span>
                      )}
                    </div>
                    
                    {audit.status === 'in_progress' && (
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm gap-2 sm:gap-0">
                        <div className="text-gray-400">
                          Phase: <span className="text-white">{phaseText}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all"
                              style={{ width: `${audit.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{audit.progress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Link
                  href={`/ai-red-teaming/audit/${audit.id}`}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full sm:w-auto lg:w-auto"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAudits.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No audits found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? 'Try adjusting your search criteria' : 'Start your first security audit'}
          </p>
          {!searchQuery && (
            <Link
              href="/ai-red-teaming/audit/new"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Audit</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}