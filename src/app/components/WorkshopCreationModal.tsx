'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Calendar, Users, DollarSign, Sparkles } from 'lucide-react'
import { workshopApi } from '@/lib/workshop-api'
import { usePlausible } from '@/hooks/usePlausible'

interface WorkshopCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onWorkshopCreated?: (workshop: any) => void
}

const WorkshopCreationModal: React.FC<WorkshopCreationModalProps> = ({
  isOpen,
  onClose,
  onWorkshopCreated
}) => {
  const { trackEvent } = usePlausible()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'online',
    tier: 'free',
    startDate: '',
    endDate: '',
    maxParticipants: 50,
    price: 0,
    requirements: '',
    learningOutcomes: '',
    totalXpReward: 1000
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    trackEvent('Workshop Creation Modal', {
      action: 'create_attempt',
      workshop_type: formData.type,
      workshop_tier: formData.tier,
      max_participants: formData.maxParticipants,
      price: formData.price,
      xp_reward: formData.totalXpReward
    });

    try {
      const workshopData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        learningOutcomes: formData.learningOutcomes.split('\n').filter(o => o.trim()),
        gamificationConfig: {
          enableTeams: true,
          enableLeaderboard: true,
          enableBattles: true
        }
      }

      const workshop = await workshopApi.createWorkshop(workshopData)

      trackEvent('Workshop Creation Modal', {
        action: 'create_success',
        workshop_id: workshop.id,
        workshop_type: formData.type,
        workshop_tier: formData.tier
      });

      if (onWorkshopCreated) {
        onWorkshopCreated(workshop)
      }

      onClose()

      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'online',
        tier: 'free',
        startDate: '',
        endDate: '',
        maxParticipants: 50,
        price: 0,
        requirements: '',
        learningOutcomes: '',
        totalXpReward: 1000
      })

    } catch (err: any) {
      trackEvent('Workshop Creation Modal', {
        action: 'create_error',
        error_message: err.message || 'Failed to create workshop'
      });
      setError(err.message || 'Failed to create workshop')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 pb-0">
          <button
            onClick={() => {
              trackEvent('Workshop Creation Modal', {
                action: 'close_modal'
              });
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Create New Workshop
            </h2>
            <p className="text-gray-300">
              Design an amazing learning experience for your students
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Workshop Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Advanced AI Prompt Engineering"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Learn advanced techniques for crafting effective AI prompts..."
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Workshop Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="online">Online</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Tier */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Workshop Tier
              </label>
              <select
                name="tier"
                value={formData.tier}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date *
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                End Date *
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Max Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                min="1"
                max="1000"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* XP Reward */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Sparkles className="w-4 h-4 inline mr-1" />
                XP Reward
              </label>
              <input
                type="number"
                name="totalXpReward"
                value={formData.totalXpReward}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Requirements (one per line)
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Basic understanding of AI&#10;Laptop with internet connection&#10;Willingness to learn"
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Learning Outcomes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Learning Outcomes (one per line)
              </label>
              <textarea
                name="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={handleInputChange}
                placeholder="Master advanced prompting techniques&#10;Optimize prompt performance&#10;Build reusable templates"
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.description}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Workshop...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Workshop
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default WorkshopCreationModal