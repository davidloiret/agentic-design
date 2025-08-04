'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  Trophy,
  Star,
  LogOut,
  Clock,
  Zap,
  Code,
  CheckCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  Award,
  Target,
  Brain,
  Lightbulb,
  Timer
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { workshopApi } from '@/lib/workshop-api'

const WorkshopLivePage: React.FC = () => {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const workshopId = params.id as string
  
  const [workshop, setWorkshop] = useState<any>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<any[]>([])
  
  // Activity state
  const [currentActivity, setCurrentActivity] = useState<'qcm' | 'battle' | 'code' | 'waiting'>('waiting')
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(30)
  const [userScore, setUserScore] = useState<number>(0)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [battleTeams, setBattleTeams] = useState<any[]>([])
  const [codeChallenge, setCodeChallenge] = useState<any>(null)
  const [userCode, setUserCode] = useState<string>('')
  
  // Pre-created content
  const [availableQCMs, setAvailableQCMs] = useState<any[]>([])
  const [availableChallenges, setAvailableChallenges] = useState<any[]>([])
  const [availableBattles, setAvailableBattles] = useState<any[]>([])
  const [showContentSelector, setShowContentSelector] = useState(false)
  const [selectorType, setSelectorType] = useState<'qcm' | 'battle' | 'code'>('qcm')

  useEffect(() => {
    if (workshopId) {
      fetchWorkshopData()
    }
  }, [workshopId])

  const fetchWorkshopData = async () => {
    try {
      setLoading(true)
      const [workshopData, sessionsData] = await Promise.all([
        workshopApi.getWorkshopById(workshopId),
        workshopApi.getWorkshopSessions(workshopId)
      ])
      
      setWorkshop(workshopData)
      setSessions(sessionsData)
      
      // Find current live session
      const liveSession = sessionsData.find((s: any) => s.status === 'live')
      if (liveSession) {
        setCurrentSession(liveSession)
        
        // Mock participants and learning data
        const mockParticipants = [
          { id: user?.id, name: user?.name || 'You', isInstructor: false, avatar: user?.avatar, score: 0 },
          { id: 'instructor', name: workshopData?.instructor?.name || 'Instructor', isInstructor: true, avatar: workshopData?.instructor?.avatar, score: 0 },
          { id: 'user1', name: 'Alice Johnson', isInstructor: false, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c0?w=150&h=150&fit=crop&crop=face', score: 150 },
          { id: 'user2', name: 'Bob Smith', isInstructor: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', score: 120 },
          { id: 'user3', name: 'Clara Davis', isInstructor: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', score: 180 }
        ]
        setParticipants(mockParticipants)
        setLeaderboard(mockParticipants.sort((a, b) => b.score - a.score))
        
        // Mock battle teams
        setBattleTeams([
          { id: 'team1', name: '🔥 Fire Coders', members: ['user1', 'user2'], score: 270, color: 'red' },
          { id: 'team2', name: '⚡ Lightning Devs', members: [user?.id, 'user3'], score: 180, color: 'blue' }
        ])
        
        // Load pre-created content (mock data for now - in real app this would come from backend)
        setAvailableQCMs([
          {
            id: 'qcm1',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var name = "value"', 'variable name = "value"', 'declare name = "value"', 'name := "value"'],
            correctAnswer: 0,
            points: 10,
            timeLimit: 30,
            difficulty: 'easy'
          },
          {
            id: 'qcm2',
            question: 'Which method is used to add an element to the end of an array?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correctAnswer: 0,
            points: 15,
            timeLimit: 25,
            difficulty: 'easy'
          }
        ])
        
        setAvailableChallenges([
          {
            id: 'code1',
            title: 'FizzBuzz Challenge',
            description: 'Write a function that prints numbers from 1 to 100. For multiples of 3, print "Fizz", for multiples of 5, print "Buzz", and for multiples of both, print "FizzBuzz".',
            language: 'javascript',
            starterCode: 'function fizzBuzz() {\n  // Your code here\n}',
            points: 50,
            difficulty: 'medium'
          },
          {
            id: 'code2',
            title: 'Palindrome Checker',
            description: 'Write a function that checks if a string is a palindrome.',
            language: 'javascript',  
            starterCode: 'function isPalindrome(str) {\n  // Your code here\n}',
            points: 30,
            difficulty: 'easy'
          }
        ])
        
        setAvailableBattles([
          {
            id: 'battle1',
            title: 'JavaScript Fundamentals Battle',
            description: 'Team battle focusing on JavaScript basics',
            type: 'qcm_battle',
            teamSize: 2,
            questions: ['qcm1', 'qcm2'],
            timeLimit: 300,
            points: 100
          }
        ])
      }
    } catch (error) {
      console.error('Failed to fetch workshop data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock learning activities
  const startQCMActivity = () => {
    const mockQuestion = {
      id: 'q1',
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: [
        'var name = "value"',
        'variable name = "value"',
        'declare name = "value"',
        'name := "value"'
      ],
      correctAnswer: 0,
      points: 10,
      timeLimit: 30
    }
    setCurrentQuestion(mockQuestion)
    setCurrentActivity('qcm')
    setTimeRemaining(30)
    setSelectedAnswer(null)
  }

  const startBattleActivity = () => {
    setCurrentActivity('battle')
    // Battle logic here
  }

  const startCodeChallenge = () => {
    const mockChallenge = {
      id: 'c1',
      title: 'FizzBuzz Challenge',
      description: 'Write a function that prints numbers from 1 to 100. For multiples of 3, print "Fizz", for multiples of 5, print "Buzz", and for multiples of both, print "FizzBuzz".',
      language: 'javascript',
      starterCode: 'function fizzBuzz() {\n  // Your code here\n}',
      points: 50
    }
    setCodeChallenge(mockChallenge)
    setUserCode(mockChallenge.starterCode)
    setCurrentActivity('code')
  }

  const handleLeaveWorkshop = () => {
    router.push('/workshops')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading workshop...</div>
      </div>
    )
  }

  if (!workshop || !currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Live Session</h2>
          <p className="text-gray-300 mb-6">This workshop doesn't have any live sessions at the moment.</p>
          <button
            onClick={handleLeaveWorkshop}
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    )
  }

  // Render different activity interfaces
  const renderQCMActivity = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              Multiple Choice Question
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-400">
                <Timer className="w-5 h-5" />
                <span className="font-mono text-xl">{timeRemaining}s</span>
              </div>
              <div className="text-yellow-400 font-semibold">+{currentQuestion?.points} XP</div>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-xl text-white mb-6">{currentQuestion?.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion?.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index.toString())}
                  className={`p-4 rounded-lg text-left transition-all ${
                    selectedAnswer === index.toString()
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : 'bg-white/5 text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <button
            disabled={!selectedAnswer}
            className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-bold transition-colors"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  )

  const renderBattleActivity = () => (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            Team Battle Mode
          </h2>
          <p className="text-gray-300">Compete in teams to solve challenges!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {battleTeams.map((team, index) => (
            <div key={team.id} className={`bg-${team.color}-600/20 border border-${team.color}-500/50 rounded-xl p-6`}>
              <h3 className={`text-xl font-bold text-${team.color}-300 mb-4`}>{team.name}</h3>
              <div className={`text-3xl font-bold text-${team.color}-400 mb-4`}>{team.score} pts</div>
              <div className="space-y-2">
                {team.members.map((memberId: string) => {
                  const member = participants.find(p => p.id === memberId)
                  return member ? (
                    <div key={memberId} className="flex items-center gap-2 text-white">
                      <img src={member.avatar || '/default-avatar.png'} alt={member.name} className="w-6 h-6 rounded-full" />
                      <span>{member.name}{member.id === user?.id ? ' (You)' : ''}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Next Challenge Starting Soon...</h3>
          <p className="text-gray-300 mb-6">Get ready for an epic coding battle!</p>
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition-colors">
            Ready to Battle!
          </button>
        </div>
      </div>
    </div>
  )

  const renderCodeChallenge = () => (
    <div className="flex-1 p-4">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Challenge Description */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-green-400" />
              {codeChallenge?.title}
            </h2>
            <p className="text-gray-300 mb-6">{codeChallenge?.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-yellow-400 font-semibold">+{codeChallenge?.points} XP</div>
              <div className="text-blue-400">{codeChallenge?.language}</div>
            </div>
            <div className="bg-black/40 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Expected Output:</h4>
              <pre className="text-green-400 text-sm">
                1{'\n'}2{'\n'}Fizz{'\n'}4{'\n'}Buzz{'\n'}Fizz{'\n'}7{'\n'}8{'\n'}Fizz{'\n'}Buzz{'\n'}...
              </pre>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Code Editor</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm transition-colors">
                  <Play className="w-4 h-4 inline mr-1" />
                  Run
                </button>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm transition-colors">
                  Submit
                </button>
              </div>
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-64 bg-black/60 text-white font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your code here..."
            />
            <div className="mt-4 bg-black/40 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Output:</h4>
              <div className="text-gray-400 text-sm">Run your code to see the output...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWaitingArea = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{currentSession?.title}</h3>
          <p className="text-gray-200 mb-6">{currentSession?.description}</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white">+{workshop?.totalXpReward} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-white">{participants.length} participants</span>
            </div>
          </div>
        </div>
        
        {/* Instructor Controls */}
        {user && workshop?.instructor?.id === user.userId && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h4 className="text-white font-bold mb-4">🎯 Start Learning Activity</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={startQCMActivity}
                className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                <Brain className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">QCM Quiz</div>
                <div className="text-sm opacity-80">Multiple choice questions</div>
              </button>
              <button
                onClick={startBattleActivity}
                className="p-4 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                <Zap className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Team Battle</div>
                <div className="text-sm opacity-80">Competitive challenges</div>
              </button>
              <button
                onClick={startCodeChallenge}
                className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
              >
                <Code className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Code Challenge</div>
                <div className="text-sm opacity-80">Programming problems</div>
              </button>
            </div>
          </div>
        )}
        
        {/* Participant waiting message */}
        {user && workshop?.instructor?.id !== user.userId && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h4 className="text-white font-bold mb-2">Ready to Learn!</h4>
            <p className="text-gray-300">Waiting for the instructor to start the next activity...</p>
          </div>
        )}
      </div>
    </div>
  )

  // Launch specific content
  const launchQCM = (qcm: any) => {
    setCurrentQuestion(qcm)
    setCurrentActivity('qcm')
    setTimeRemaining(qcm.timeLimit)
    setSelectedAnswer(null)
    setShowContentSelector(false)
  }

  const launchCodeChallenge = (challenge: any) => {
    setCodeChallenge(challenge)
    setUserCode(challenge.starterCode)
    setCurrentActivity('code')
    setShowContentSelector(false)
  }

  const launchBattle = (battle: any) => {
    setCurrentActivity('battle')
    setShowContentSelector(false)
    // Battle logic here
  }

  // Content Selector Modal
  const renderContentSelector = () => {
    if (!showContentSelector) return null

    const getContent = () => {
      switch (selectorType) {
        case 'qcm': return availableQCMs
        case 'code': return availableChallenges
        case 'battle': return availableBattles
        default: return []
      }
    }

    const getTitle = () => {
      switch (selectorType) {
        case 'qcm': return 'Select QCM Question'
        case 'code': return 'Select Code Challenge'
        case 'battle': return 'Select Battle'
        default: return 'Select Content'
      }
    }

    const content = getContent()

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
              <button
                onClick={() => setShowContentSelector(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-96">
            {content.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-300 mb-4">No {selectorType} content available.</p>
                <p className="text-gray-400 text-sm">Go to "Manage Content" to create some!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.map((item: any) => (
                  <div key={item.id} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer"
                       onClick={() => {
                         if (selectorType === 'qcm') launchQCM(item)
                         else if (selectorType === 'code') launchCodeChallenge(item)
                         else if (selectorType === 'battle') launchBattle(item)
                       }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        item.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                        item.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {item.difficulty?.toUpperCase() || 'DEFAULT'}
                      </div>
                      <div className="text-yellow-400 text-sm font-semibold">+{item.points} XP</div>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-2">
                      {item.question || item.title}
                    </h3>
                    
                    {selectorType === 'qcm' && (
                      <div className="text-gray-300 text-sm">
                        {item.options?.length || 0} options • {item.timeLimit}s
                      </div>
                    )}
                    
                    {selectorType === 'code' && (
                      <div className="text-gray-300 text-sm">
                        {item.language} • {item.testCases?.length || 0} test cases
                      </div>
                    )}
                    
                    {selectorType === 'battle' && (
                      <div className="text-gray-300 text-sm">
                        {item.teamSize} per team • {item.questions?.length || 0} questions
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{workshop?.title}</h1>
            <p className="text-gray-300 text-sm">{currentSession?.title} • Live</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">{userScore} XP</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">LIVE</span>
            </div>
            <button
              onClick={handleLeaveWorkshop}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Leave
            </button>
          </div>
        </div>
        
        {/* DEBUG: Always show instructor controls for testing */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="mb-2 px-3 py-1 bg-yellow-500/20 rounded text-yellow-300 text-xs">
            DEBUG: Supabase ID: {user?.id} | User ID: {user?.userId} | Instructor ID: {workshop?.instructor?.id} | Is Creator: {user && workshop?.instructor?.id === user.userId ? 'YES' : 'NO'}
          </div>
        </div>
        
        {/* Instructor Controls Bar - Always visible for instructors */}
        {(user && workshop?.instructor?.id === user.userId) || true && (
          <div className="mt-2 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">Instructor Controls:</span>
                <span className="text-gray-300 text-sm">Current Activity: {currentActivity === 'waiting' ? 'Waiting' : currentActivity.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {setSelectorType('qcm'); setShowContentSelector(true)}}
                  className={`px-3 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2 ${
                    currentActivity === 'qcm' ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  QCM Quiz ({availableQCMs.length})
                </button>
                <button
                  onClick={() => {setSelectorType('battle'); setShowContentSelector(true)}}
                  className={`px-3 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2 ${
                    currentActivity === 'battle' ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Team Battle ({availableBattles.length})
                </button>
                <button
                  onClick={() => {setSelectorType('code'); setShowContentSelector(true)}}
                  className={`px-3 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2 ${
                    currentActivity === 'code' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Code Challenge ({availableChallenges.length})
                </button>
                <button
                  onClick={() => setCurrentActivity('waiting')}
                  className={`px-3 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2 ${
                    currentActivity === 'waiting' ? 'bg-gray-700' : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Activity Area */}
        <div className="flex-1">
          {currentActivity === 'qcm' && renderQCMActivity()}
          {currentActivity === 'battle' && renderBattleActivity()}
          {currentActivity === 'code' && renderCodeChallenge()}
          {currentActivity === 'waiting' && renderWaitingArea()}
        </div>

        {/* Sidebar - Leaderboard & Participants */}
        <div className="w-80 bg-black/40 backdrop-blur-md border-l border-white/10 flex flex-col">
          {/* Leaderboard */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Leaderboard
            </h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((participant, index) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <img
                    src={participant.avatar || '/default-avatar.png'}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {participant.name}
                      {participant.id === user?.id && ' (You)'}
                    </p>
                    <p className="text-yellow-400 text-xs">{participant.score} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Participants */}
          <div className="flex-1 p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Participants ({participants.length})
            </h3>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <img
                    src={participant.avatar || '/default-avatar.png'}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {participant.name}
                      {participant.id === user?.id && ' (You)'}
                    </p>
                    {participant.isInstructor && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">Instructor</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Selector Modal */}
      {renderContentSelector()}
    </div>
  )
}

export default WorkshopLivePage