'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Key, Copy, Check, Users, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { workshopApi } from '@/lib/workshop-api'

interface SessionCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onJoinSession?: (sessionId: string, workshopId: string) => void
}

const SessionCodeModal: React.FC<SessionCodeModalProps> = ({
  isOpen,
  onClose,
  onJoinSession
}) => {
  const router = useRouter()
  const [sessionCode, setSessionCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await workshopApi.joinByCode(sessionCode.toUpperCase())
      
      // Success - redirect based on type
      if (result.type === 'live_workshop') {
        // Join live workshop session immediately
        setError('')
        onClose()
        router.push(`/workshops/${result.workshopId}/live`)
      } else if (result.type === 'workshop') {
        // Show success briefly then redirect to workshops list
        setError('')
        onClose()
        setTimeout(() => {
          router.push(`/workshops`)
        }, 500)
      } else if (result.type === 'session') {
        if (onJoinSession) {
          onJoinSession(result.sessionId, result.workshopId)
        } else {
          // Redirect to workshops page since session detail page may not exist
          setError('')
          onClose()
          setTimeout(() => {
            router.push(`/workshops`)
          }, 500)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Invalid code')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyExample = () => {
    navigator.clipboard.writeText('WORKSHOP-2024-ABCD')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Join Workshop
            </h2>
            <p className="text-gray-300">
              Enter the workshop code shared by the creator
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="sessionCode" className="block text-sm font-medium text-gray-300 mb-2">
              Workshop Code
            </label>
            <input
              id="sessionCode"
              type="text"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
              placeholder="ABC-DEF-GHI"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-mono"
              required
              pattern="[A-Z0-9-]+"
              maxLength={20}
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          {/* Example Code */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Example Format:</span>
              <button
                type="button"
                onClick={handleCopyExample}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <code className="text-purple-300 font-mono">WORKSHOP-2024-ABCD</code>
          </div>

          {/* Benefits */}
          <div className="mb-6 space-y-3">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">
                  Instant Access
                </p>
                <p className="text-xs text-gray-400">
                  Join the workshop immediately without prior enrollment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">
                  Earn XP & Badges
                </p>
                <p className="text-xs text-gray-400">
                  Start earning rewards from your first activity
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || sessionCode.length < 10}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <Key className="w-5 h-5" />
                Join Session
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Session codes are case-insensitive and expire after 24 hours
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SessionCodeModal