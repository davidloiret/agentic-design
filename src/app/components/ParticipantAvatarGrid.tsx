'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Video, VideoOff, Crown, Shield, Star, Zap, Brain, Trophy, Users2 } from 'lucide-react'

interface Participant {
  userId: string
  userName: string
  avatarUrl?: string
  role: 'instructor' | 'participant' | 'assistant'
  teamId?: string
  teamColor?: string
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isSpeaking: boolean
  points: number
  badges: string[]
  status: 'online' | 'away' | 'busy'
  joinedAt: Date
}

interface ParticipantAvatarGridProps {
  participants: Participant[]
  currentUserId: string
  maxVisible?: number
  onParticipantClick?: (participant: Participant) => void
  showTeamColors?: boolean
  highlightSpeaker?: boolean
}

const ParticipantAvatarGrid: React.FC<ParticipantAvatarGridProps> = ({
  participants,
  currentUserId,
  maxVisible = 24,
  onParticipantClick,
  showTeamColors = true,
  highlightSpeaker = true
}) => {
  const [visibleParticipants, setVisibleParticipants] = useState<Participant[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    // Sort participants: instructors first, then by points
    const sorted = [...participants].sort((a, b) => {
      if (a.role === 'instructor' && b.role !== 'instructor') return -1
      if (b.role === 'instructor' && a.role !== 'instructor') return 1
      return b.points - a.points
    })
    setVisibleParticipants(sorted.slice(0, maxVisible))
  }, [participants, maxVisible])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'instructor':
        return <Crown className="w-3 h-3 text-yellow-400" />
      case 'assistant':
        return <Shield className="w-3 h-3 text-blue-400" />
      default:
        return null
    }
  }

  const getTopBadge = (badges: string[]) => {
    // Priority order for displaying badges
    const priorityBadges = [
      { id: 'top-performer', icon: <Trophy className="w-3 h-3 text-yellow-400" /> },
      { id: 'code-master', icon: <Brain className="w-3 h-3 text-purple-400" /> },
      { id: 'speed-demon', icon: <Zap className="w-3 h-3 text-orange-400" /> },
      { id: 'team-player', icon: <Users2 className="w-3 h-3 text-green-400" /> },
      { id: 'first-blood', icon: <Star className="w-3 h-3 text-red-400" /> }
    ]

    for (const badge of priorityBadges) {
      if (badges.includes(badge.id)) {
        return badge.icon
      }
    }
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'busy': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">
          Participants ({participants.length})
        </h3>
        {participants.length > maxVisible && (
          <span className="text-xs text-gray-400">
            +{participants.length - maxVisible} more
          </span>
        )}
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
        <AnimatePresence>
          {visibleParticipants.map((participant) => (
            <motion.div
              key={participant.userId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
              onMouseEnter={() => setHoveredId(participant.userId)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onParticipantClick?.(participant)}
            >
              <div
                className={`
                  relative w-12 h-12 rounded-full overflow-hidden cursor-pointer
                  ${highlightSpeaker && participant.isSpeaking ? 'ring-2 ring-green-400 ring-opacity-75' : ''}
                  ${participant.userId === currentUserId ? 'ring-2 ring-purple-400' : ''}
                `}
                style={{
                  boxShadow: showTeamColors && participant.teamColor
                    ? `0 0 0 2px ${participant.teamColor}40`
                    : undefined
                }}
              >
                {/* Avatar or Initials */}
                {participant.avatarUrl ? (
                  <img
                    src={participant.avatarUrl}
                    alt={participant.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor: participant.teamColor || '#6B7280'
                    }}
                  >
                    {getInitials(participant.userName)}
                  </div>
                )}

                {/* Media Status Indicators */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-1">
                  {!participant.isAudioEnabled && (
                    <div className="bg-red-500 rounded-full p-0.5">
                      <MicOff className="w-2 h-2 text-white" />
                    </div>
                  )}
                  {participant.isVideoEnabled ? (
                    <div className="bg-green-500 rounded-full p-0.5">
                      <Video className="w-2 h-2 text-white" />
                    </div>
                  ) : (
                    <div className="bg-red-500 rounded-full p-0.5">
                      <VideoOff className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Role Badge */}
                {participant.role !== 'participant' && (
                  <div className="absolute top-0 right-0 bg-black/70 rounded-full p-0.5">
                    {getRoleIcon(participant.role)}
                  </div>
                )}

                {/* Achievement Badge */}
                {participant.badges.length > 0 && (
                  <div className="absolute top-0 left-0 bg-black/70 rounded-full p-0.5">
                    {getTopBadge(participant.badges)}
                  </div>
                )}

                {/* Status Indicator */}
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(participant.status)}`} />
              </div>

              {/* Hover Card */}
              <AnimatePresence>
                {hoveredId === participant.userId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48"
                  >
                    <div className="bg-gray-900 rounded-lg shadow-xl p-3 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {participant.avatarUrl ? (
                          <img
                            src={participant.avatarUrl}
                            alt={participant.userName}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            style={{
                              backgroundColor: participant.teamColor || '#6B7280'
                            }}
                          >
                            {getInitials(participant.userName)}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm truncate">
                            {participant.userName}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">
                            {participant.role}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Points</span>
                          <span className="font-bold text-yellow-400">
                            {participant.points}
                          </span>
                        </div>
                        {participant.teamId && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Team</span>
                            <span
                              className="font-medium"
                              style={{ color: participant.teamColor }}
                            >
                              Team {participant.teamId}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Joined</span>
                          <span>
                            {new Date(participant.joinedAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {participant.badges.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-800">
                          <p className="text-xs text-gray-400 mb-1">Badges</p>
                          <div className="flex gap-1">
                            {participant.badges.slice(0, 5).map((badge) => (
                              <div
                                key={badge}
                                className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center"
                                title={badge}
                              >
                                {getTopBadge([badge])}
                              </div>
                            ))}
                            {participant.badges.length > 5 && (
                              <span className="text-xs text-gray-400 ml-1">
                                +{participant.badges.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Speaking Indicator Animation */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .ring-2 {
          animation: pulse-ring 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ParticipantAvatarGrid