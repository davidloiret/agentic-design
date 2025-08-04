'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Key, Loader, CheckCircle } from 'lucide-react'
import SessionCodeModal from '@/app/components/SessionCodeModal'
import { workshopApi } from '@/lib/workshop-api'

const WorkshopJoinPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [workshopData, setWorkshopData] = useState<any>(null)

  const sessionCodeFromUrl = searchParams.get('code')

  useEffect(() => {
    if (sessionCodeFromUrl) {
      handleJoinWithCode(sessionCodeFromUrl)
    }
  }, [sessionCodeFromUrl])

  const handleJoinWithCode = async (code: string) => {
    setLoading(true)
    setError('')

    try {
      const result = await workshopApi.joinSessionByCode(code)
      const workshop = await workshopApi.getWorkshopById(result.workshopId)
      
      setWorkshopData({ workshop, ...result })
      setSuccess(true)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/workshops/${result.workshopId}/session/${result.sessionId}`)
      }, 2000)
      
    } catch (err: any) {
      setError(err.message || 'Failed to join workshop')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Joining Workshop...</h2>
          <p className="text-gray-300">Please wait while we connect you to the session</p>
        </div>
      </div>
    )
  }

  if (success && workshopData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to the Workshop! 🎉
          </h2>
          
          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {workshopData.workshop?.title}
            </h3>
            <p className="text-gray-300 mb-4">
              by {workshopData.workshop?.instructor?.name}
            </p>
            <p className="text-sm text-green-400">
              ✅ Successfully enrolled and ready to join!
            </p>
          </div>

          <p className="text-gray-300 mb-4">
            Redirecting you to the workshop session...
          </p>

          <div className="w-full bg-purple-900 rounded-full h-2">
            <motion.div
              className="bg-purple-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/workshops')}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
            >
              Browse Workshops
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default state - show session code modal
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <SessionCodeModal
        isOpen={true}
        onClose={() => router.push('/workshops')}
        onJoinSession={(sessionId, workshopId) => {
          router.push(`/workshops/${workshopId}/session/${sessionId}`)
        }}
      />
    </div>
  )
}

export default WorkshopJoinPage