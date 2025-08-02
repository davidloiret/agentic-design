'use client';

import { Sparkles, Search, Command, GraduationCap, Star, Flame } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearningHub } from '@/contexts/LearningHubContext';
import { UserMenu } from './UserMenu';
import { NotificationBell } from './NotificationBell';
import Link from 'next/link';
import { useSearch } from '@/contexts/SearchContext';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainMascot, BrainExpression } from '@/components/BrainMascot';

// Component to show either tour button or tagline based on tour status
const TourButtonOrTagline = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const seenTour = localStorage.getItem('hasSeenOnboarding');
    setHasSeenOnboarding(!!seenTour);

    // Listen for onboarding completion to update state
    const handleOnboardingComplete = () => {
      setHasSeenOnboarding(true);
    };

    window.addEventListener('onboardingCompleted', handleOnboardingComplete);
    return () => window.removeEventListener('onboardingCompleted', handleOnboardingComplete);
  }, []);

  const startTour = () => {
    // Trigger the tour by dispatching a custom event
    window.dispatchEvent(new CustomEvent('startOnboardingTour'));
  };

  if (hasSeenOnboarding === null) {
    // Loading state
    return (
      <div className="hidden lg:inline-block w-32 h-4 bg-gray-700/50 rounded animate-pulse"></div>
    );
  }

  if (hasSeenOnboarding) {
    // Show tagline if tour has been taken
    return (
      <span className="hidden lg:inline text-xs text-gray-400 font-medium">
        • Learn how to build reliable and secure AI systems
      </span>
    );
  }

  // Show tour button if tour hasn't been taken
  return (
    <motion.button
      onClick={startTour}
      className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 hover:border-purple-400/50 rounded-full text-xs font-medium text-purple-300 hover:text-purple-200 transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sparkles className="w-3 h-3" />
      Take Tour
    </motion.button>
  );
};

export const Header = () => {
  const { user, loading } = useAuth();
  const { currentStreak } = useLearningHub();
  const { openSearch } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const isLearningHubActive = pathname === '/learning-hub' || pathname.startsWith('/learning-hub/');
  const [logoExpression, setLogoExpression] = useState<BrainExpression>('happy');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  return (
    <div className="z-50 relative bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-700/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative mx-auto px-4 sm:px-6 py-2">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setLogoExpression('excited')}
                  onHoverEnd={() => setLogoExpression('happy')}
                  onClick={() => {
                    setLogoExpression('winking');
                    setTimeout(() => setLogoExpression('happy'), 1000);
                  }}
                >
                  <BrainMascot
                    expression={logoExpression}
                    size="tiny"
                    color="purple"
                    animate={true}
                    skipInitialAnimation={true}
                  />
                </motion.div>
                
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                    Agentic Design
                  </h1>
                  <TourButtonOrTagline />
                </div>
              </Link>
            </div>
          </div>

          {/* Middle - Search Bar */}
          <motion.div 
            className="flex-1 max-w-md mx-4 lg:mx-8"
            layout
            transition={isLearningHubActive ? {
              type: "spring",
              stiffness: 500,
              damping: 40,
              duration: 0.3
            } : {
              type: "tween",
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <button
              onClick={openSearch}
              className="w-full relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative flex items-center bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200">
                <Search className="absolute left-3 text-gray-400 w-4 h-4" />
                <div className="w-full pl-10 pr-20 py-2 text-left">
                  <span className="text-gray-400 text-sm">Search</span>
                </div>
                <div className="absolute right-3 flex items-center space-x-1 text-gray-500">
                  <Command className="w-3 h-3" />
                  <span className="text-xs">K</span>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Right side - Learning Hub, Status and User menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Learning Hub - Gamified button with animations */}
            <motion.button
              id="learning-hub-button"
              onClick={() => router.push('/learning-hub')}
              className={`relative flex items-center space-x-2 px-4 py-2 font-medium rounded-lg shadow-lg overflow-hidden ${
                isLearningHubActive 
                  ? 'bg-gradient-to-r from-rose-600 to-pink-700 text-white shadow-xl ring-2 ring-rose-400/50' 
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
              }`}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isLearningHubActive ? {
                boxShadow: [
                  '0 0 20px rgba(244, 63, 94, 0.3)',
                  '0 0 40px rgba(244, 63, 94, 0.5)',
                  '0 0 20px rgba(244, 63, 94, 0.3)',
                ],
              } : {}}
              transition={{
                layout: isLearningHubActive ? {
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                  duration: 0.3
                } : {
                  type: "tween",
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1]
                },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Animated background particles */}
              <AnimatePresence>
                {isLearningHubActive && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ 
                          x: (i - 1) * 30, 
                          y: 20,
                          opacity: 0 
                        }}
                        animate={{ 
                          x: (i - 1) * 30, 
                          y: -20,
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Icon with rotation animation */}
              <motion.div
                animate={isLearningHubActive ? {
                  rotate: [0, -10, 10, -10, 0],
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <GraduationCap className="w-4 h-4 relative z-10" />
              </motion.div>
              
              {/* Text with level indicator */}
              <span className="text-sm relative z-10">Learning Hub</span>
              
              {/* Streak indicator */}
              <AnimatePresence>
                {isLearningHubActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="flex items-center space-x-1 ml-2"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                    </motion.div>
                    <span className="text-xs font-bold text-orange-400">{currentStreak}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
                    
            {/* Auth section - Last item on the right */}
            {loading ? (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="flex items-center space-x-2 p-1.5">
                  <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <NotificationBell />
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="flex items-center h-[44px] px-3 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center h-[44px] px-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setLogoExpression('winking');
                  setTimeout(() => setLogoExpression('happy'), 1000);
                }}
              >
                <BrainMascot
                  expression={logoExpression}
                  size="tiny"
                  color="purple"
                  animate={true}
                  skipInitialAnimation={true}
                />
              </motion.div>
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Agentic Design
              </h1>
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={openSearch}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <motion.button
                id="learning-hub-button-mobile"
                onClick={() => router.push('/learning-hub')}
                className={`relative flex items-center space-x-1 px-3 py-1.5 font-medium rounded-lg shadow-lg overflow-hidden ${
                  isLearningHubActive 
                    ? 'bg-gradient-to-r from-rose-600 to-pink-700 text-white shadow-xl ring-2 ring-rose-400/50' 
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                }`}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isLearningHubActive ? {
                  boxShadow: [
                    '0 0 15px rgba(244, 63, 94, 0.3)',
                    '0 0 25px rgba(244, 63, 94, 0.5)',
                    '0 0 15px rgba(244, 63, 94, 0.3)',
                  ],
                } : {}}
                transition={{
                  layout: isLearningHubActive ? {
                    type: "spring",
                    stiffness: 500,
                    damping: 40,
                    duration: 0.3
                  } : {
                    type: "tween",
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Shimmer effect for mobile */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />

                {/* Icon with rotation */}
                <motion.div
                  animate={isLearningHubActive ? {
                    rotate: [0, -10, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <GraduationCap className="w-3.5 h-3.5 relative z-10" />
                </motion.div>
                <span className="text-xs relative z-10">Learning</span>
                
                {/* Mobile streak indicator */}
                <AnimatePresence>
                  {isLearningHubActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.8 }}
                      transition={{
                        type: "tween",
                        duration: 0.25,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="flex items-center ml-1"
                    >
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span className="text-[10px] font-bold text-orange-400">{currentStreak}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="flex items-center space-x-2 p-1.5">
                    <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <NotificationBell />
                  <UserMenu />
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center h-[44px] px-2 text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};