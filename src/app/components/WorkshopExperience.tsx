'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import io from 'socket.io-client'
import {
  Users, MessageSquare, Trophy, Zap, Target, Brain,
  Video, VideoOff, Mic, MicOff, Monitor, Send,
  Award, Star, TrendingUp, Clock, CheckCircle,
  Users2, Swords, Lightbulb, BarChart, Gift,
  Sparkles, Flame, Medal, Crown, Shield, Key, Copy, Check
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { workshopApi } from '@/lib/workshop-api'
import ParticipantAvatarGrid from './ParticipantAvatarGrid'
import SessionCodeModal from './SessionCodeModal'

interface WorkshopSession {
  id: string
  title: string
  type: 'lecture' | 'interactive' | 'lab' | 'challenge' | 'team_battle' | 'q_and_a'
  status: 'scheduled' | 'live' | 'completed'
  instructor: string
  participants: number
  activities: Activity[]
}

interface Activity {
  id: string
  title: string
  type: 'poll' | 'quiz' | 'code_challenge' | 'team_battle' | 'discussion'
  status: 'pending' | 'active' | 'completed'
  points: number
  timeLimit?: number
}

interface Participant {
  userId: string
  userName: string
  role: 'instructor' | 'participant' | 'assistant'
  teamId?: string
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  points: number
  badges: string[]
}

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  points: number
  rank: number
}

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: Date
  isInstructor: boolean
  reactions: Record<string, string[]>
}

interface Poll {
  id: string
  question: string
  options: string[]
  votes: Record<string, number>
  hasVoted: boolean
  showResults: boolean
}

const WorkshopExperience: React.FC<{ workshopId: string; sessionId?: string; sessionCode?: string }> = ({
  workshopId,
  sessionId,
  sessionCode
}) => {
  const { user } = useAuth()
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
  const [session, setSession] = useState<WorkshopSession | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [userTeam, setUserTeam] = useState<Team | null>(null)
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [activityTimeRemaining, setActivityTimeRemaining] = useState<number>(0)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [polls, setPolls] = useState<Poll[]>([])
  const [userPoints, setUserPoints] = useState(0)
  const [userBadges, setUserBadges] = useState<string[]>([])
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showTeamBattle, setShowTeamBattle] = useState(false)
  const [battleResults, setBattleResults] = useState<any>(null)
  const [newAchievement, setNewAchievement] = useState<any>(null)
  const [showSessionCode, setShowSessionCode] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize WebSocket connection
  useEffect(() => {
    if (!sessionId || !user) return

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/workshop`)

    newSocket.on('connect', () => {
      console.log('Connected to workshop')
      newSocket.emit('session:join', {
        sessionId,
        userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        role: 'participant'
      })
    })

    newSocket.on('session:joined', (data) => {
      setParticipants(data.participants)
      setChatMessages(data.chat)
      setPolls(data.polls)
    })

    newSocket.on('participant:joined', (data) => {
      setParticipants(prev => [...prev, data.participant])
      // Show join notification
      showNotification(`${data.participant.userName} joined the session`, 'info')
    })

    newSocket.on('participant:left', (data) => {
      setParticipants(prev => prev.filter(p => p.userId !== data.userId))
    })

    newSocket.on('chat:message', (message) => {
      setChatMessages(prev => [...prev, message])
    })

    newSocket.on('activity:started', (activity) => {
      setCurrentActivity(activity)
      setActivityTimeRemaining(activity.timeLimit || 0)
      startActivityTimer()
      showNotification(`Activity started: ${activity.title}`, 'activity')
    })

    newSocket.on('activity:leaderboard', (data) => {
      setLeaderboard(data.leaderboard)
    })

    newSocket.on('poll:created', (poll) => {
      setPolls(prev => [...prev, { ...poll, hasVoted: false }])
    })

    newSocket.on('poll:results', (data) => {
      setPolls(prev => prev.map(p => 
        p.id === data.pollId 
          ? { ...p, votes: data.votes, showResults: true }
          : p
      ))
    })

    newSocket.on('team:battle:start', (data) => {
      setShowTeamBattle(true)
      setBattleResults(null)
    })

    newSocket.on('team:battle:results', (results) => {
      setBattleResults(results)
    })

    newSocket.on('achievement:unlocked', (achievement) => {
      setNewAchievement(achievement)
      setUserBadges(prev => [...prev, achievement.id])
      setTimeout(() => setNewAchievement(null), 5000)
    })

    newSocket.on('points:update', (data) => {
      setUserPoints(data.points)
      if (userTeam) {
        setTeams(prev => prev.map(t => 
          t.id === userTeam.id 
            ? { ...t, points: data.teamPoints }
            : t
        ))
      }
    })

    setSocket(newSocket)

    return () => {
      if (activityTimerRef.current) {
        clearInterval(activityTimerRef.current)
      }
      newSocket.disconnect()
    }
  }, [sessionId, user])

  const startActivityTimer = () => {
    if (activityTimerRef.current) {
      clearInterval(activityTimerRef.current)
    }

    activityTimerRef.current = setInterval(() => {
      setActivityTimeRemaining(prev => {
        if (prev <= 1) {
          if (activityTimerRef.current) {
            clearInterval(activityTimerRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const sendChatMessage = () => {
    if (!socket || !chatInputRef.current?.value.trim()) return

    socket.emit('chat:send', {
      sessionId,
      message: chatInputRef.current.value
    })

    chatInputRef.current.value = ''
  }

  const reactToMessage = (messageId: string, reaction: string) => {
    if (!socket) return

    socket.emit('chat:react', {
      sessionId,
      messageId,
      reaction
    })
  }

  const voteOnPoll = (pollId: string, option: string) => {
    if (!socket) return

    socket.emit('poll:vote', {
      sessionId,
      pollId,
      option
    })

    setPolls(prev => prev.map(p => 
      p.id === pollId ? { ...p, hasVoted: true } : p
    ))
  }

  const submitActivityResponse = (response: any) => {
    if (!socket || !currentActivity) return

    socket.emit('activity:submit', {
      sessionId,
      activityId: currentActivity.id,
      response
    })
  }

  const toggleAudio = () => {
    if (!socket) return

    const newState = !isAudioEnabled
    setIsAudioEnabled(newState)
    
    socket.emit('media:toggle', {
      sessionId,
      mediaType: 'audio',
      enabled: newState
    })
  }

  const toggleVideo = () => {
    if (!socket) return

    const newState = !isVideoEnabled
    setIsVideoEnabled(newState)
    
    socket.emit('media:toggle', {
      sessionId,
      mediaType: 'video',
      enabled: newState
    })
  }

  const showNotification = (message: string, type: string) => {
    // Implement notification system
    console.log(`[${type}] ${message}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copySessionCode = () => {
    if (sessionCode) {
      navigator.clipboard.writeText(sessionCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const transformParticipants = (): any[] => {
    return participants.map(p => ({
      userId: p.userId,
      userName: p.userName,
      avatarUrl: `/api/avatar/${p.userId}`, // Mock avatar URL
      role: p.role,
      teamId: p.teamId,
      teamColor: teams.find(t => t.members.includes(p.userId))?.color,
      isAudioEnabled: p.isAudioEnabled,
      isVideoEnabled: p.isVideoEnabled,
      isSpeaking: false, // Would be updated via WebRTC
      points: p.points,
      badges: p.badges,
      status: 'online',
      joinedAt: new Date()
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Achievement Notification */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{newAchievement.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">Achievement Unlocked!</h3>
                  <p className="text-lg">{newAchievement.name}</p>
                  <p className="text-sm opacity-90">+{newAchievement.points} XP</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{session?.title || 'Workshop Session'}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {participants.length} participants
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  {userPoints} points
                </span>
                {userTeam && (
                  <span className="flex items-center gap-1" style={{ color: userTeam.color }}>
                    <Users2 className="w-4 h-4" />
                    {userTeam.name}
                  </span>
                )}
                {sessionCode && (
                  <button
                    onClick={copySessionCode}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600/20 rounded-full hover:bg-purple-600/30 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    <span className="font-mono text-xs">{sessionCode}</span>
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                Share Session
              </button>
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Leaderboard
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAudio}
                  className={`p-2 rounded-lg ${isAudioEnabled ? 'bg-green-600' : 'bg-red-600'}`}
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-2 rounded-lg ${isVideoEnabled ? 'bg-green-600' : 'bg-red-600'}`}
                >
                  {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  <Monitor className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Participant Avatars Grid */}
      <div className="container mx-auto px-4 mt-4">
        <ParticipantAvatarGrid
          participants={transformParticipants()}
          currentUserId={user?.id || ''}
          maxVisible={48}
          showTeamColors={true}
          highlightSpeaker={true}
          onParticipantClick={(participant) => {
            console.log('Clicked participant:', participant)
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Current Activity */}
            {currentActivity && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      {currentActivity.title}
                    </h2>
                    <p className="text-sm text-gray-300 mt-1">
                      {currentActivity.points} points available
                    </p>
                  </div>
                  {activityTimeRemaining > 0 && (
                    <div className="text-2xl font-mono bg-red-600 px-4 py-2 rounded-lg">
                      <Clock className="inline w-5 h-5 mr-2" />
                      {formatTime(activityTimeRemaining)}
                    </div>
                  )}
                </div>

                {/* Activity Content Based on Type */}
                {currentActivity.type === 'quiz' && (
                  <QuizActivity
                    activity={currentActivity}
                    onSubmit={submitActivityResponse}
                  />
                )}

                {currentActivity.type === 'code_challenge' && (
                  <CodeChallengeActivity
                    activity={currentActivity}
                    onSubmit={submitActivityResponse}
                  />
                )}

                {currentActivity.type === 'team_battle' && (
                  <TeamBattleActivity
                    activity={currentActivity}
                    teams={teams}
                    onSubmit={submitActivityResponse}
                  />
                )}
              </motion.div>
            )}

            {/* Polls */}
            {polls.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Live Polls</h2>
                {polls.map(poll => (
                  <PollComponent
                    key={poll.id}
                    poll={poll}
                    onVote={(option) => voteOnPoll(poll.id, option)}
                  />
                ))}
              </div>
            )}

            {/* Video/Content Area */}
            <div className="bg-black/50 rounded-xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">Main content area</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Live Leaderboard */}
            {showLeaderboard && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Live Leaderboard
                </h3>
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map((entry, index) => (
                    <div
                      key={entry.userId}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </span>
                        <span>{entry.userName}</span>
                      </div>
                      <span className="font-bold">{entry.points}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-96 flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Chat
              </h3>
              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {chatMessages.map(message => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onReact={reactToMessage}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                />
                <button
                  onClick={sendChatMessage}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Badges */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Badges
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {userBadges.map(badge => (
                  <div
                    key={badge}
                    className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer"
                    title={badge}
                  >
                    {getBadgeIcon(badge)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Battle Overlay */}
      {showTeamBattle && battleResults && (
        <TeamBattleResults
          results={battleResults}
          onClose={() => setShowTeamBattle(false)}
        />
      )}

      {/* Session Share Modal */}
      {showShareModal && sessionCode && (
        <ShareSessionModal
          sessionCode={sessionCode}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}

// Helper Components
const QuizActivity: React.FC<{
  activity: Activity
  onSubmit: (response: any) => void
}> = ({ activity, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  
  // Mock quiz data - would come from activity config
  const questions = [
    {
      id: '1',
      question: 'What is the primary benefit of Chain of Thought prompting?',
      options: [
        'Faster responses',
        'Step-by-step reasoning',
        'Shorter outputs',
        'Less token usage'
      ]
    }
  ]

  return (
    <div className="space-y-4">
      {questions.map(q => (
        <div key={q.id} className="bg-white/5 rounded-lg p-4">
          <p className="font-medium mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer"
              >
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  onChange={(e) => setSelectedAnswers({
                    ...selectedAnswers,
                    [q.id]: e.target.value
                  })}
                  className="w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => onSubmit({ answers: selectedAnswers })}
        className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-bold"
      >
        Submit Answers
      </button>
    </div>
  )
}

const CodeChallengeActivity: React.FC<{
  activity: Activity
  onSubmit: (response: any) => void
}> = ({ activity, onSubmit }) => {
  const [code, setCode] = useState('')

  return (
    <div>
      <p className="mb-4">
        Write a function that implements the ReAct pattern for an AI agent.
      </p>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 bg-black/50 text-green-400 font-mono rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="// Your code here..."
      />
      <button
        onClick={() => onSubmit({ code })}
        className="w-full mt-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-bold"
      >
        Submit Code
      </button>
    </div>
  )
}

const TeamBattleActivity: React.FC<{
  activity: Activity
  teams: Team[]
  onSubmit: (response: any) => void
}> = ({ activity, teams, onSubmit }) => {
  return (
    <div className="text-center py-8">
      <Swords className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h3 className="text-2xl font-bold mb-4">Team Battle in Progress!</h3>
      <p className="text-gray-300 mb-6">
        Work with your team to solve the challenge faster than the others!
      </p>
      <div className="grid grid-cols-2 gap-4">
        {teams.slice(0, 4).map(team => (
          <div
            key={team.id}
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${team.color}20` }}
          >
            <h4 className="font-bold" style={{ color: team.color }}>
              {team.name}
            </h4>
            <p className="text-2xl font-bold mt-2">{team.points}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const PollComponent: React.FC<{
  poll: Poll
  onVote: (option: string) => void
}> = ({ poll, onVote }) => {
  const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0)

  return (
    <div className="mb-4 p-4 bg-white/5 rounded-lg">
      <p className="font-medium mb-3">{poll.question}</p>
      <div className="space-y-2">
        {poll.options.map(option => {
          const votes = poll.votes[option] || 0
          const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0

          return (
            <div key={option}>
              {!poll.hasVoted && !poll.showResults ? (
                <button
                  onClick={() => onVote(option)}
                  className="w-full text-left p-3 bg-white/5 rounded hover:bg-white/10 transition-colors"
                >
                  {option}
                </button>
              ) : (
                <div className="relative p-3 bg-white/5 rounded">
                  <div
                    className="absolute inset-0 bg-purple-600/30 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative flex justify-between">
                    <span>{option}</span>
                    {poll.showResults && (
                      <span className="font-bold">{percentage.toFixed(1)}%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChatMessage: React.FC<{
  message: ChatMessage
  onReact: (messageId: string, reaction: string) => void
}> = ({ message, onReact }) => {
  const reactions = ['👍', '❤️', '😂', '🎉', '🤔']

  return (
    <div className={`p-3 rounded-lg ${message.isInstructor ? 'bg-purple-600/20' : 'bg-white/5'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {message.userName}
            </span>
            {message.isInstructor && (
              <span className="text-xs bg-purple-600 px-2 py-0.5 rounded">
                Instructor
              </span>
            )}
          </div>
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {reactions.map(reaction => (
          <button
            key={reaction}
            onClick={() => onReact(message.id, reaction)}
            className="text-sm hover:scale-125 transition-transform"
          >
            {reaction}
          </button>
        ))}
        {Object.entries(message.reactions).map(([reaction, users]) => (
          <span key={reaction} className="text-xs bg-white/10 px-2 py-1 rounded">
            {reaction} {users.length}
          </span>
        ))}
      </div>
    </div>
  )
}

const TeamBattleResults: React.FC<{
  results: any
  onClose: () => void
}> = ({ results, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Battle Results!</h2>
        <div className="space-y-4">
          {results.teams.map((team: any, index: number) => (
            <div
              key={team.id}
              className={`p-4 rounded-lg flex items-center justify-between ${
                index === 0 ? 'bg-yellow-500/20 ring-2 ring-yellow-500' : 'bg-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  {index === 0 && '🏆'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                </span>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: team.color }}>
                    {team.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {team.members.length} members
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{team.score}</p>
                <p className="text-sm text-green-400">+{team.bonusPoints} XP</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full mt-8 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors font-bold"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  )
}

const getBadgeIcon = (badgeId: string) => {
  const icons: Record<string, React.ReactNode> = {
    'first-blood': <Zap className="w-8 h-8" />,
    'speed-demon': <Flame className="w-8 h-8" />,
    'perfectionist': <Star className="w-8 h-8" />,
    'team-player': <Users2 className="w-8 h-8" />,
    'code-master': <Brain className="w-8 h-8" />,
    'quiz-champion': <Trophy className="w-8 h-8" />,
    'participation': <Medal className="w-8 h-8" />,
    'top-performer': <Crown className="w-8 h-8" />,
    'helping-hand': <Sparkles className="w-8 h-8" />,
    'workshop-graduate': <Shield className="w-8 h-8" />
  }
  return icons[badgeId] || <Award className="w-8 h-8" />
}

const ShareSessionModal: React.FC<{
  sessionCode: string
  onClose: () => void
}> = ({ sessionCode, onClose }) => {
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(sessionCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    const link = `${window.location.origin}/workshops/join?code=${sessionCode}`
    navigator.clipboard.writeText(link)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Share Workshop Session</h2>
        
        <div className="space-y-6">
          {/* Session Code */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Session Code</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-black/30 rounded-lg p-4 font-mono text-xl text-center">
                {sessionCode}
              </div>
              <button
                onClick={copyCode}
                className="p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Direct Link */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Direct Link</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/workshops/join?code=${sessionCode}`}
                className="flex-1 bg-black/30 rounded-lg p-3 text-sm text-gray-300"
              />
              <button
                onClick={copyLink}
                className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold mb-2">How to Join:</h3>
            <ol className="text-sm text-gray-300 space-y-1">
              <li>1. Share the session code with participants</li>
              <li>2. They can enter it on the workshops page</li>
              <li>3. Or use the direct link for instant access</li>
            </ol>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WorkshopExperience