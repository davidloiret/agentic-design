'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Brain, Zap, Shield, Clock, ArrowRight } from 'lucide-react';

const WAITLIST_MODAL_KEY = 'reasoning-layer-waitlist-seen';

interface WaitlistModalProps {
  onClose?: () => void;
}

export function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeen = localStorage.getItem(WAITLIST_MODAL_KEY);
    if (!hasSeen) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(WAITLIST_MODAL_KEY, 'true');
    setIsOpen(false);
    onClose?.();
  };

  const handleJoinWaitlist = () => {
    localStorage.setItem(WAITLIST_MODAL_KEY, 'true');
    window.open('https://reasoninglayer.ai/', '_blank');
    setIsOpen(false);
    onClose?.();
  };

  const features = [
    {
      icon: Brain,
      title: 'Neuro-Symbolic AI',
      description: 'Bridge neural networks with symbolic reasoning'
    },
    {
      icon: Shield,
      title: 'Fix Hallucinations',
      description: 'Auditable, trustworthy AI decisions'
    },
    {
      icon: Zap,
      title: '90% Cost Reduction',
      description: 'LLM-free reasoning for rule evaluation'
    },
    {
      icon: Clock,
      title: 'Temporal Reasoning',
      description: 'Native time-aware inference built-in'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 max-w-lg w-full pointer-events-auto overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Exclusive Early Access</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                >
                  ReasoningLayer Waitlist is{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Now Open
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 mb-6"
                >
                  The enterprise-grade neuro-symbolic AI platform that makes your AI{' '}
                  <span className="text-white font-semibold">trustworthy</span>,{' '}
                  <span className="text-white font-semibold">auditable</span>, and{' '}
                  <span className="text-white font-semibold">cost-effective</span>.
                </motion.p>

                {/* Features grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="grid grid-cols-2 gap-3 mb-6"
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/50"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                          <p className="text-xs text-gray-400">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 mb-6 text-sm"
                >
                  <div className="flex -space-x-2">
                    {['M', 'K', 'S', 'J'].map((letter, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 border-2 border-gray-800 flex items-center justify-center text-xs font-semibold text-white"
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-400">
                    Join other early adopters on the waitlist
                  </span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinWaitlist}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Join the Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Urgency text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-xs text-gray-500 mt-3"
                >
                  Early adopters get exclusive founder pricing. Limited spots available.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
