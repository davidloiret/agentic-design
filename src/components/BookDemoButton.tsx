'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

const BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/a35a19bb709249e5a24331ae0d6c56bb@kortexya.com/meetingtype/uiN02skMMU2ExS8MCFsgOg2?anonymous&ismsaljsauthenabled&ep=mLinkFromTile';

/**
 * Persistent, always-visible floating CTA to book a ReasoningLayer demo.
 * Fixed to the bottom-right corner on every page (mounted in the root layout).
 */
export function BookDemoButton() {
  const { trackEvent } = usePlausible();

  const handleClick = () => {
    trackEvent('Book Demo', { action: 'click', source: 'floating_cta' });
  };

  return (
    <motion.a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Book a ReasoningLayer demo"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: [
          '0 0 20px rgba(139, 92, 246, 0.3)',
          '0 0 40px rgba(139, 92, 246, 0.5)',
          '0 0 20px rgba(139, 92, 246, 0.3)',
        ],
      }}
      transition={{
        opacity: { duration: 0.4, delay: 1 },
        y: { duration: 0.4, delay: 1 },
        boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-white shadow-lg overflow-hidden bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600"
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />

      {/* Icon with subtle pulse */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <Calendar className="w-5 h-5 relative z-10" />
      </motion.div>

      <span className="text-sm relative z-10 whitespace-nowrap">Book a demo</span>
    </motion.a>
  );
}
