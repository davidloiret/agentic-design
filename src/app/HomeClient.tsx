'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainMascot, BrainExpression } from '@/components/BrainMascot';
import { ArrowRight, Sparkles, Brain, Code, Shield, Zap, BookOpen, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { usePlausible } from '@/hooks/usePlausible';

export function HomeClient() {
  const router = useRouter();
  const { trackEvent } = usePlausible();
  const [mascotExpression, setMascotExpression] = useState<BrainExpression>('happy');
  const [isHovering, setIsHovering] = useState(false);
  
  // Cycle through expressions periodically
  useEffect(() => {
    const expressions: BrainExpression[] = ['happy', 'excited', 'winking', 'thinking', 'focused'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % expressions.length;
      if (!isHovering) {
        setMascotExpression(expressions[index]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const features = [
    {
      icon: Brain,
      title: 'AI Design Patterns',
      description: 'Comprehensive collection of proven patterns for building intelligent systems',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Shield,
      title: 'AI Red Teaming',
      description: 'Security patterns and defensive techniques for robust AI systems',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Zap,
      title: 'Inference Optimization',
      description: 'Strategies for efficient AI deployment across platforms',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Code,
      title: 'Interactive Examples',
      description: 'Live demos and code samples for immediate implementation',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    }
  ];

  const stats = [
    { label: 'Patterns', value: '150+', icon: BookOpen },
    { label: 'Techniques', value: '500+', icon: Code },
    { label: 'Use Cases', value: '1000+', icon: Sparkles },
    { label: 'Active Users', value: '10k+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
        
        {/* Auth Buttons - Top Right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/auth/login"
              onClick={() => trackEvent('Homepage CTA', { action: 'sign_in', location: 'header' })}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
              >
                Sign In
              </motion.button>
            </Link>
            <Link
              href="/auth/register"
              onClick={() => trackEvent('Homepage CTA', { action: 'sign_up', location: 'header' })}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg shadow-lg transition-all duration-200"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24 md:pb-32">
          <div className="text-center">
            {/* Animated Brain Mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <div
                onMouseEnter={() => {
                  setIsHovering(true);
                  setMascotExpression('love');
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setMascotExpression('happy');
                }}
              >
                <BrainMascot
                  expression={mascotExpression}
                  size="medium"
                  color="purple"
                  animate={true}
                  skipInitialAnimation={true}
                  onExpressionChange={(expr) => setMascotExpression(expr)}
                />
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Agentic Design
              </span>
              <br />
              <span className="text-white">Patterns</span>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0"
            >
              Build intelligent AI systems with confidence. Explore comprehensive patterns,
              techniques, and best practices for creating robust agentic workflows.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            >
              <Link
                href="/patterns"
                data-tour="patterns-link"
                onClick={() => trackEvent('Homepage CTA', { action: 'explore_patterns', location: 'hero' })}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base"
                >
                  Explore Patterns
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link
                href="/learning-hub"
                data-tour="learning-hub-link"
                onClick={() => trackEvent('Homepage CTA', { action: 'learning_hub', location: 'hero' })}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  Learning Hub
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
              Everything You Need to Build Intelligent AI Systems
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              From foundational patterns to advanced techniques, we've got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const tourIds = ['', 'ai-red-teaming', 'inference-optimization', 'code-sandbox'];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-gray-800/70 transition-all duration-200"
                  data-tour={tourIds[index]}
                >
                  <div className={`${feature.bgColor} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
          >
            {/* Floating mascot - hidden on very small screens */}
            <motion.div
              className="hidden min-[400px]:block absolute top-2 right-2 sm:top-4 sm:right-4"
              animate={{
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BrainMascot
                expression="excited"
                size="tiny"
                color="blue"
                animate={true}
                skipInitialAnimation={true}
              />
            </motion.div>

            <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Build Smarter AI?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join thousands of developers building the next generation of intelligent systems
            </p>
            <Link
              href="/patterns"
              onClick={() => trackEvent('Homepage CTA', { action: 'start_learning', location: 'bottom_cta' })}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
              >
                Start Learning Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}