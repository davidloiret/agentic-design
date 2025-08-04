'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar, Users, Globe, MapPin, Clock, DollarSign,
  Star, Trophy, Zap, Filter, Search, ChevronRight,
  Video, Monitor, Users2, Shield, Award, TrendingUp,
  Sparkles, Target, Brain, MessageSquare, CheckCircle, Key,
  Plus, Settings
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { workshopApi } from '@/lib/workshop-api'
import SessionCodeModal from '@/app/components/SessionCodeModal'
import WorkshopCreationModal from '@/app/components/WorkshopCreationModal'

interface Workshop {
  id: string
  title: string
  description: string
  workshopCode?: string
  instructor: {
    id: string
    name: string
    avatar: string
    rating: number
    totalWorkshops: number
  }
  type: 'online' | 'onsite' | 'hybrid'
  tier: 'free' | 'basic' | 'premium' | 'enterprise'
  status: string
  startDate: Date
  endDate: Date
  maxParticipants: number
  currentParticipants: number
  price?: number
  requirements: string[]
  learningOutcomes: string[]
  totalXpReward: number
  badges: Array<{
    id: string
    name: string
    icon: string
  }>
  gamificationConfig: {
    enableTeams: boolean
    enableLeaderboard: boolean
    enableBattles: boolean
  }
  schedule: {
    sessions: Array<{
      date: string
      title: string
    }>
  }
  locationDetails?: {
    city?: string
    country?: string
  }
  prerequisites?: {
    minLevel?: number
    requiredJourneys?: string[]
  }
}

const WorkshopsPage: React.FC = () => {
  const { user } = useAuth()
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true)
  const [showSessionCodeModal, setShowSessionCodeModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [canCreateWorkshop, setCanCreateWorkshop] = useState(false)

  useEffect(() => {
    fetchWorkshops()
    checkCanCreateWorkshop()
  }, [user])

  useEffect(() => {
    filterWorkshops()
  }, [workshops, selectedType, selectedTier, searchQuery, showUpcomingOnly])

  const fetchWorkshops = async () => {
    try {
      const data = await workshopApi.getWorkshops()
      setWorkshops(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch workshops:', error)
      setLoading(false)
    }
  }

  const checkCanCreateWorkshop = async () => {
    if (!user) {
      setCanCreateWorkshop(false)
      return
    }

    try {
      const result = await workshopApi.canCreateWorkshop()
      console.log('resdddult', result)
      setCanCreateWorkshop(result.canCreate)
    } catch (error) {
      console.error('Failed to check workshop creation permission:', error)
      setCanCreateWorkshop(false)
    }
  }

  const handleWorkshopCreated = (newWorkshop: any) => {
    setWorkshops(prev => [newWorkshop, ...prev])
  }

  const filterWorkshops = () => {
    let filtered = [...workshops]

    if (selectedType !== 'all') {
      filtered = filtered.filter(w => w.type === selectedType)
    }

    if (selectedTier !== 'all') {
      filtered = filtered.filter(w => w.tier === selectedTier)
    }

    if (searchQuery) {
      filtered = filtered.filter(w =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (showUpcomingOnly) {
      filtered = filtered.filter(w => new Date(w.startDate) > new Date())
    }

    setFilteredWorkshops(filtered)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return <Globe className="w-5 h-5" />
      case 'onsite': return <MapPin className="w-5 h-5" />
      case 'hybrid': return <Monitor className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-green-500'
      case 'basic': return 'bg-blue-500'
      case 'premium': return 'bg-purple-500'
      case 'enterprise': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading workshops...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Live AI Workshops
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join interactive workshops with expert instructors, collaborate with peers,
            and level up your AI skills through hands-on challenges and team competitions.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setShowSessionCodeModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-bold flex items-center gap-2 shadow-lg"
          >
            <Key className="w-5 h-5" />
            Join with Workshop Code
          </button>
          
          {canCreateWorkshop && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Workshop
            </button>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="online">Online</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-3 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Tiers</option>
              <option value="free">Free</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>

            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showUpcomingOnly}
                onChange={(e) => setShowUpcomingOnly(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span>Upcoming only</span>
            </label>
          </div>
        </motion.div>

        {/* Featured Workshop Banner */}
        {filteredWorkshops.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <FeaturedWorkshopBanner workshop={filteredWorkshops[0]} />
          </motion.div>
        )}

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.slice(1).map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <WorkshopCard workshop={workshop} />
            </motion.div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">No workshops found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <SessionCodeModal
        isOpen={showSessionCodeModal}
        onClose={() => setShowSessionCodeModal(false)}
      />
      
      <WorkshopCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onWorkshopCreated={handleWorkshopCreated}
      />
    </div>
  )
}

const FeaturedWorkshopBanner: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const { user } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [sessions, setSessions] = useState<any[]>([])
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false)

  // Check if current user is the workshop creator  
  const isCreator = user && workshop.instructor?.id === user.userId


  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (user && workshop.id) {
        try {
          console.log('Checking enrollment status for workshop:', workshop.id)
          const status = await workshopApi.getEnrollmentStatus(workshop.id)
          setIsEnrolled(status.isEnrolled)
          
          // If enrolled, fetch sessions
          if (status.isEnrolled) {
            setLoadingSessions(true)
            try {
              const workshopSessions = await workshopApi.getWorkshopSessions(workshop.id)
              setSessions(workshopSessions)
            } catch (error) {
              console.error('Failed to fetch sessions:', error)
            } finally {
              setLoadingSessions(false)
            }
          }
        } catch (error) {
          console.error('Failed to check enrollment status:', error)
        }
      }
    }

    checkEnrollmentStatus()
  }, [user, workshop.id])

  const handleEnroll = async () => {
    if (!user || enrolling) return

    console.log('Enrolling in workshop:', workshop.id, 'Workshop object:', workshop)
    setEnrolling(true)
    try {
      await workshopApi.enrollInWorkshop(workshop.id, {})
      setIsEnrolled(true)
      
      // Fetch sessions after successful enrollment
      setLoadingSessions(true)
      try {
        const workshopSessions = await workshopApi.getWorkshopSessions(workshop.id)
        setSessions(workshopSessions)
      } catch (error) {
        console.error('Failed to fetch sessions:', error)
      } finally {
        setLoadingSessions(false)
      }
    } catch (error: any) {
      console.error('Failed to enroll:', error)
      alert(error.message || 'Failed to enroll in workshop')
    } finally {
      setEnrolling(false)
    }
  }

  const handleCopyWorkshopCode = async () => {
    if (!workshop.workshopCode) return
    
    try {
      await navigator.clipboard.writeText(workshop.workshopCode)
      setCopyCodeSuccess(true)
      setTimeout(() => setCopyCodeSuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = workshop.workshopCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopyCodeSuccess(true)
      setTimeout(() => setCopyCodeSuccess(false), 2000)
    }
  }

  const handleStartLiveSession = async () => {
    try {
      // Get the first session and start it
      const sessions = await workshopApi.getWorkshopSessions(workshop.id)
      if (sessions.length > 0) {
        const firstSession = sessions[0]
        await workshopApi.startSession(workshop.id, firstSession.id)
        
        // Redirect to live session
        window.location.href = `/workshops/${workshop.id}/live`
      } else {
        alert('No sessions available to start.')
      }
    } catch (error: any) {
      console.error('Failed to start session:', error)
      alert(error.message || 'Failed to start live session')
    }
  }

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative p-8 md:p-12">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                Featured Workshop
              </span>
              {isCreator && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                  <Star className="w-4 h-4" />
                  Your Workshop
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {workshop.title}
            </h2>
            <p className="text-lg text-gray-100 mb-6 max-w-3xl">
              {workshop.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {workshop.price ? `$${workshop.price}` : 'FREE'}
            </div>
            <div className="text-yellow-400 mt-2">
              <Trophy className="inline w-5 h-5 mr-1" />
              {workshop.totalXpReward} XP
            </div>
            
            {/* Workshop Code for Creator */}
            {isCreator && workshop.workshopCode && (
              <div className="mt-4 p-3 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
                <div className="text-white text-sm font-medium mb-2">📋 Your Workshop Code:</div>
                <div className="flex items-center gap-2">
                  <code className="text-white font-mono text-lg bg-black/30 px-3 py-1 rounded">
                    {workshop.workshopCode}
                  </code>
                  <button
                    onClick={handleCopyWorkshopCode}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    {copyCodeSuccess ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-gray-300 text-xs mt-1">Share this with participants</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(workshop.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5" />
            <span>{workshop.schedule?.sessions?.length || 0} sessions</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5" />
            <span>{workshop.currentParticipants}/{workshop.maxParticipants}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            {getTypeIcon(workshop.type)}
            <span className="capitalize">{workshop.type}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={workshop.instructor?.avatar || '/default-avatar.png'}
            alt={workshop.instructor?.name || 'Instructor'}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-white font-medium">{workshop.instructor?.name || 'Unknown Instructor'}</p>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span>{workshop.instructor?.rating || 0}/5.0</span>
              <span className="text-gray-300">({workshop.instructor?.totalWorkshops || 0} workshops)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {workshop.gamificationConfig?.enableTeams && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              Team Challenges
            </span>
          )}
          {workshop.gamificationConfig?.enableBattles && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Live Battles
            </span>
          )}
          {workshop.gamificationConfig?.enableLeaderboard && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Leaderboard
            </span>
          )}
          {workshop.badges?.slice(0, 3).map(badge => (
            <span key={badge.id} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4" />
              {badge.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/workshops/${workshop.id}`}
            className="px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            View Details
            <ChevronRight className="w-5 h-5" />
          </Link>
          {user && !isEnrolled && (
            <button 
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-8 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          )}
          {isEnrolled && (
            <span className="px-8 py-3 bg-green-500 text-white rounded-lg font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Enrolled
            </span>
          )}
          {isCreator && (
            <>
              <Link 
                href={`/workshops/${workshop.id}/manage`}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Manage Content
              </Link>
              <button 
                onClick={handleStartLiveSession}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Start Live Session
              </button>
            </>
          )}
        </div>

        {/* Session Information - Only show if enrolled */}
        {isEnrolled && (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">
              🎯 Workshop Sessions - Ready to Join!
            </h3>
            
            {loadingSessions ? (
              <div className="text-white">Loading sessions...</div>
            ) : sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <div key={session.id} className="bg-white/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{session.title}</h4>
                        <p className="text-gray-300 text-sm">{session.description}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(session.startTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono text-sm bg-blue-600 px-3 py-1 rounded mb-2">
                          {session.sessionCode}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${
                          session.status === 'live' ? 'bg-green-600 text-white' :
                          session.status === 'scheduled' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {session.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-2">📋 How to Join Sessions:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Use Session Code:</strong> Copy any session code above and use "Join with Session Code" button</li>
                    <li>• <strong>Live Sessions:</strong> When status shows "LIVE", you can join immediately</li>
                    <li>• <strong>Scheduled Sessions:</strong> Join when the instructor starts the session</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-gray-300">No sessions available yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const { user } = useAuth()
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false)
  const progressPercentage = (workshop.currentParticipants / workshop.maxParticipants) * 100
  const isFull = workshop.currentParticipants >= workshop.maxParticipants
  
  // Check if current user is the workshop creator  
  const isCreator = user && workshop.instructor?.id === user.userId


  const handleCopyWorkshopCode = async () => {
    if (!workshop.workshopCode) return
    
    try {
      await navigator.clipboard.writeText(workshop.workshopCode)
      setCopyCodeSuccess(true)
      setTimeout(() => setCopyCodeSuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = workshop.workshopCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopyCodeSuccess(true)
      setTimeout(() => setCopyCodeSuccess(false), 2000)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/15 transition-all h-full flex flex-col">
        {/* Header */}
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {getTypeIcon(workshop.type)}
              <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTierColor(workshop.tier)}`}>
                {workshop.tier.toUpperCase()}
              </span>
              {isCreator && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-bold">
                  <Star className="w-3 h-3" />
                  Your Workshop
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">
                {workshop.price ? `$${workshop.price}` : 'FREE'}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {workshop.title}
          </h3>
          
          {/* Workshop Code for Creator */}
          {isCreator && workshop.workshopCode && (
            <div className="mb-3 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <div className="text-white text-xs font-medium mb-1">📋 Workshop Code:</div>
              <div className="flex items-center gap-2">
                <code className="text-white font-mono text-sm bg-black/30 px-2 py-1 rounded flex-1">
                  {workshop.workshopCode}
                </code>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleCopyWorkshopCode()
                  }}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                  {copyCodeSuccess ? '✓' : 'Copy'}
                </button>
              </div>
              <div className="text-gray-400 text-xs mt-1">Share with participants</div>
            </div>
          )}
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {workshop.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={workshop.instructor?.avatar || '/default-avatar.png'}
              alt={workshop.instructor?.name || 'Instructor'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white text-sm font-medium">{workshop.instructor?.name || 'Unknown Instructor'}</p>
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Star className="w-3 h-3 fill-current" />
                <span>{workshop.instructor?.rating || 0}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(workshop.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Clock className="w-4 h-4" />
              <span>{workshop.schedule?.sessions?.length || 0} sessions</span>
            </div>
            {workshop.locationDetails?.city && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{workshop.locationDetails.city}, {workshop.locationDetails.country}</span>
              </div>
            )}
          </div>

          {/* Gamification Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workshop.gamificationConfig?.enableTeams && (
              <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs">
                Teams
              </span>
            )}
            {workshop.gamificationConfig?.enableBattles && (
              <span className="px-2 py-1 bg-red-500/20 rounded text-red-300 text-xs">
                Battles
              </span>
            )}
            <span className="px-2 py-1 bg-yellow-500/20 rounded text-yellow-300 text-xs">
              +{workshop.totalXpReward} XP
            </span>
          </div>

          {/* Prerequisites */}
          {workshop.prerequisites?.minLevel && (
            <div className="text-sm text-orange-400 mb-4">
              <Shield className="inline w-4 h-4 mr-1" />
              Requires Level {workshop.prerequisites.minLevel}
            </div>
          )}
        </div>

        {/* Footer - Enrollment Progress */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <span>{workshop.currentParticipants} enrolled</span>
            <span>{workshop.maxParticipants} max</span>
          </div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 transition-all ${
                isFull ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          {isFull && (
            <p className="text-red-400 text-xs mt-2">Workshop is full</p>
          )}
        </div>
      </div>
  )
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'online': return <Globe className="w-5 h-5 text-blue-400" />
    case 'onsite': return <MapPin className="w-5 h-5 text-green-400" />
    case 'hybrid': return <Monitor className="w-5 h-5 text-purple-400" />
    default: return <Globe className="w-5 h-5 text-gray-400" />
  }
}

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'free': return 'bg-green-500'
    case 'basic': return 'bg-blue-500'
    case 'premium': return 'bg-purple-500'
    case 'enterprise': return 'bg-orange-500'
    default: return 'bg-gray-500'
  }
}

export default WorkshopsPage