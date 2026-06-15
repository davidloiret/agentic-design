'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, Clock, ArrowRight, Brain, ShieldCheck, Gauge, Network } from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

// Set only when the visitor actually clicks through to read the article.
// Closing the modal (X / backdrop) does NOT set this, so it reappears on the
// next page load until the visitor reads the post.
const BLOG_PROMO_READ_KEY = 'world-model-blog-read';

const BLOG_URL = 'https://reasoninglayer.ai/blog/the-world-model-ai-is-missing';

interface BlogPromoModalProps {
  onClose?: () => void;
}

export function BlogPromoModal({ onClose }: BlogPromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { trackEvent } = usePlausible();

  useEffect(() => {
    // Show on every page load until the visitor has read the article.
    const hasRead = localStorage.getItem(BLOG_PROMO_READ_KEY);
    if (!hasRead) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        trackEvent('Blog Promo Modal', { action: 'view', post: 'the-world-model-ai-is-missing' });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [trackEvent]);

  const handleClose = () => {
    // Intentionally does NOT persist anything, so the modal returns on next load.
    setIsOpen(false);
    trackEvent('Blog Promo Modal', { action: 'dismiss', post: 'the-world-model-ai-is-missing' });
    onClose?.();
  };

  const handleReadArticle = () => {
    localStorage.setItem(BLOG_PROMO_READ_KEY, 'true');
    trackEvent('Blog Promo Modal', { action: 'read_article', post: 'the-world-model-ai-is-missing' });
    window.open(BLOG_URL, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    onClose?.();
  };

  const highlights = [
    {
      icon: Brain,
      title: 'A grounded world model',
      description: 'Why LLMs hallucinate, and what they actually lack'
    },
    {
      icon: ShieldCheck,
      title: 'Honest about uncertainty',
      description: 'Reasoning that suspends instead of guessing'
    },
    {
      icon: Gauge,
      title: '~1ms reasoning',
      description: 'Complete and correct, vs. 5 to 247ms for 7 rivals'
    },
    {
      icon: Network,
      title: 'Native n-ary facts',
      description: 'More than binary RDF/OWL triples'
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
                  aria-label="Close"
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
                  <span>New from ReasoningLayer</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight"
                >
                  The world model AI is missing,{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    and the engine built to hold it
                  </span>
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-purple-200/90 italic mb-3"
                >
                  “An answer you can check is an answer you can trust.”
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="text-gray-300 mb-5"
                >
                  LLMs have a model of <span className="text-white font-semibold">text</span>,
                  not a model of the <span className="text-white font-semibold">world</span>.
                  That&apos;s why they hallucinate. Here&apos;s the engine built to fix it.
                </motion.p>

                {/* Highlights grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="grid grid-cols-2 gap-3 mb-6"
                >
                  {highlights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.32 + index * 0.05 }}
                        className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/50"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-gray-400">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Meta row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 mb-6 text-sm text-gray-400"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    15 min read
                  </span>
                  <span className="text-gray-600">•</span>
                  <span>By the Reasoning Layer team</span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReadArticle}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4" />
                  Read the article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Dismiss link */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleClose}
                  className="block w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors mt-3"
                >
                  Maybe later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
