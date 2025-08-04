'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  Brain,
  Code,
  Zap,
  Clock,
  Users,
  Trophy,
  Target,
  Play,
  Settings,
  BookOpen,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { workshopApi } from '@/lib/workshop-api'

interface QCM {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
  timeLimit: number
  difficulty: 'easy' | 'medium' | 'hard'
}

interface CodeChallenge {
  id: string
  title: string
  description: string
  language: string
  starterCode: string
  solution: string
  testCases: Array<{input: string, expectedOutput: string}>
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

interface Battle {
  id: string
  title: string
  description: string
  type: 'qcm_battle' | 'code_battle' | 'mixed'
  teamSize: number
  questions: string[]  // QCMs or Challenges IDs
  timeLimit: number
  points: number
}

const WorkshopManagePage: React.FC = () => {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const workshopId = params.id as string
  
  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'qcms' | 'challenges' | 'battles'>('qcms')
  
  // Content state
  const [qcms, setQCMs] = useState<QCM[]>([])
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([])
  const [battles, setBattles] = useState<Battle[]>([])
  
  // Form states
  const [showQCMForm, setShowQCMForm] = useState(false)
  const [showChallengeForm, setShowChallengeForm] = useState(false)
  const [showBattleForm, setShowBattleForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  useEffect(() => {
    if (workshopId) {
      fetchWorkshopData()
    }
  }, [workshopId])

  const fetchWorkshopData = async () => {
    try {
      setLoading(true)
      const workshopData = await workshopApi.getWorkshopById(workshopId)
      setWorkshop(workshopData)
      
      // Load existing content (mock data for now)
      setQCMs([
        {
          id: 'qcm1',
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var name = "value"', 'variable name = "value"', 'declare name = "value"', 'name := "value"'],
          correctAnswer: 0,
          points: 10,
          timeLimit: 30,
          difficulty: 'easy'
        }
      ])
      
      setCodeChallenges([
        {
          id: 'code1',
          title: 'FizzBuzz Challenge',
          description: 'Write a function that prints numbers from 1 to 100. For multiples of 3, print "Fizz", for multiples of 5, print "Buzz", and for multiples of both, print "FizzBuzz".',
          language: 'javascript',
          starterCode: 'function fizzBuzz() {\n  // Your code here\n}',
          solution: 'function fizzBuzz() {\n  for (let i = 1; i <= 100; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}',
          testCases: [
            {input: '1', expectedOutput: '1'},
            {input: '3', expectedOutput: 'Fizz'},
            {input: '5', expectedOutput: 'Buzz'},
            {input: '15', expectedOutput: 'FizzBuzz'}
          ],
          points: 50,
          difficulty: 'medium'
        }
      ])
      
      setBattles([
        {
          id: 'battle1',
          title: 'JavaScript Fundamentals Battle',
          description: 'Team battle focusing on JavaScript basics',
          type: 'qcm_battle',
          teamSize: 2,
          questions: ['qcm1'],
          timeLimit: 300,
          points: 100
        }
      ])
      
    } catch (error) {
      console.error('Failed to fetch workshop data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartLiveSession = () => {
    router.push(`/workshops/${workshopId}/live`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading workshop management...</div>
      </div>
    )
  }

  // Check if user is the instructor
  const isInstructor = user && workshop?.instructor?.id === user.userId
  
  // DEBUG: Always show debug info
  console.log('Workshop Management Debug:', {
    user: user,
    supabaseId: user?.id,
    userId: user?.userId,
    userEmail: user?.email,
    workshop: workshop,
    instructor: workshop?.instructor,
    instructorId: workshop?.instructor?.id,
    instructorEmail: workshop?.instructor?.email,
    isInstructor: isInstructor,
    comparison: user?.userId + ' === ' + workshop?.instructor?.id
  })
  
  if (!isInstructor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">Only the workshop instructor can manage content.</p>
          
          {/* DEBUG INFO */}
          <div className="mb-6 p-4 bg-yellow-500/20 rounded-lg text-left max-w-md mx-auto">
            <div className="text-yellow-300 font-bold mb-2">DEBUG INFO:</div>
            <div className="text-yellow-100 text-sm space-y-1">
              <div>Your Supabase ID: {user?.id || 'Not logged in'}</div>
              <div>Your User ID: {user?.userId || 'No user ID'}</div>
              <div>Your Email: {user?.email || 'No email'}</div>
              <div>Instructor ID: {workshop?.instructor?.id || 'No instructor ID'}</div>
              <div>Instructor Email: {workshop?.instructor?.email || 'No instructor email'}</div>
              <div>Workshop ID: {workshop?.id || 'No workshop'}</div>
              <div>IDs Match: {user?.userId === workshop?.instructor?.id ? '✅ YES' : '❌ NO'}</div>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/workshops')}
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/workshops')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Manage Workshop</h1>
              <p className="text-gray-300">{workshop?.title}</p>
              {/* DEBUG INFO */}
              <div className="mt-2 p-2 bg-yellow-500/20 rounded text-yellow-300 text-xs">
                Supabase ID: {user?.id} | User ID: {user?.userId} | Instructor ID: {workshop?.instructor?.id} | Match: {isInstructor ? '✅' : '❌'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-300 text-sm">
              {qcms.length} QCMs • {codeChallenges.length} Challenges • {battles.length} Battles
            </div>
            <button
              onClick={handleStartLiveSession}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold flex items-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Live Session
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('qcms')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === 'qcms' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Brain className="w-5 h-5" />
            QCMs ({qcms.length})
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === 'challenges' ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Code className="w-5 h-5" />
            Code Challenges ({codeChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('battles')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === 'battles' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Zap className="w-5 h-5" />
            Battles ({battles.length})
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'qcms' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Multiple Choice Questions</h2>
              <button
                onClick={() => setShowQCMForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add QCM
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qcms.map((qcm) => (
                <div key={qcm.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      qcm.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                      qcm.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {qcm.difficulty.toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold mb-3 line-clamp-2">{qcm.question}</h3>
                  
                  <div className="space-y-2 mb-4">
                    {qcm.options.slice(0, 2).map((option, index) => (
                      <div key={index} className={`text-sm p-2 rounded ${
                        index === qcm.correctAnswer ? 'bg-green-500/20 text-green-300' : 'bg-white/5 text-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}. {option.length > 30 ? option.substring(0, 30) + '...' : option}
                      </div>
                    ))}
                    {qcm.options.length > 2 && (
                      <div className="text-xs text-gray-400">+{qcm.options.length - 2} more options</div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-yellow-400 flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {qcm.points} XP
                    </div>
                    <div className="text-blue-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {qcm.timeLimit}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Code Challenges</h2>
              <button
                onClick={() => setShowChallengeForm(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Challenge
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {codeChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      challenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {challenge.difficulty.toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{challenge.description}</p>
                  
                  <div className="bg-black/40 rounded-lg p-3 mb-4">
                    <div className="text-gray-400 text-xs mb-1">Starter Code ({challenge.language})</div>
                    <pre className="text-green-400 text-xs overflow-x-auto">
                      {challenge.starterCode.split('\n').slice(0, 3).join('\n')}
                      {challenge.starterCode.split('\n').length > 3 && '\n...'}
                    </pre>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-yellow-400 flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {challenge.points} XP
                    </div>
                    <div className="text-blue-400">
                      {challenge.testCases.length} test cases
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'battles' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Team Battles</h2>
              <button
                onClick={() => setShowBattleForm(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Battle
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {battles.map((battle) => (
                <div key={battle.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      battle.type === 'qcm_battle' ? 'bg-blue-500/20 text-blue-300' :
                      battle.type === 'code_battle' ? 'bg-green-500/20 text-green-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {battle.type.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2">{battle.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{battle.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-gray-400 mb-1">Team Size</div>
                      <div className="text-white font-semibold flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {battle.teamSize} players
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-gray-400 mb-1">Time Limit</div>
                      <div className="text-white font-semibold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor(battle.timeLimit / 60)}m
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-yellow-400 flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {battle.points} XP
                    </div>
                    <div className="text-purple-400">
                      {battle.questions.length} questions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkshopManagePage