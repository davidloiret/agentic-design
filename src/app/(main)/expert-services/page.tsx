'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeadphonesIcon,
  Rocket,
  Code2,
  BookOpen,
  Microscope,
  CheckCircle2,
  Calendar,
  Mail,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  MessageSquare,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePlausible } from '@/hooks/usePlausible';

interface ServiceCard {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  duration: string;
  price: string;
  gradient: string;
}

const services: ServiceCard[] = [
  {
    icon: Rocket,
    title: 'AI Strategy Consulting',
    description: 'Transform your business with a comprehensive AI strategy tailored to your unique needs and goals.',
    features: [
      'AI readiness assessment',
      'Strategic roadmap development',
      'Technology stack recommendations',
      'Implementation timeline planning',
      'ROI analysis and projections',
    ],
    duration: '2-4 weeks',
    price: 'Custom quote',
    gradient: 'from-purple-500 to-blue-600',
  },
  {
    icon: Code2,
    title: 'Custom AI Agent Development',
    description: 'Build powerful, production-ready AI agents and systems designed specifically for your use cases.',
    features: [
      'Custom LLM integration',
      'Multi-agent orchestration',
      'API development and deployment',
      'Performance optimization',
      'Continuous monitoring setup',
    ],
    duration: '4-12 weeks',
    price: 'Project-based',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: BookOpen,
    title: 'Technical Mentoring',
    description: 'Accelerate your AI/ML journey with personalized 1-on-1 mentoring from an expert practitioner.',
    features: [
      'Weekly 1-on-1 sessions',
      'Code reviews and feedback',
      'Career guidance',
      'Project architecture advice',
      'Direct Slack/Discord access',
    ],
    duration: 'Monthly subscription',
    price: '€2,500/month',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Architecture Review',
    description: 'Get expert analysis of your AI system architecture with actionable recommendations for improvement.',
    features: [
      'System design evaluation',
      'Security assessment',
      'Scalability analysis',
      'Performance bottleneck identification',
      'Best practices recommendations',
    ],
    duration: '1-2 weeks',
    price: 'Starting from €5,000',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Zap,
    title: 'AI Workshop',
    description: 'Master the art of prompt design, context engineering, and AI integration with hands-on training tailored to your team and use cases.',
    features: [
      'Custom workshop curriculum',
      'Hands-on exercises',
      'Real-world examples',
      'Team collaboration sessions',
      'Resource library access',
    ],
    duration: '2-3 days',
    price: 'Starting from €8,000/workshop',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Microscope,
    title: 'Research & Feasibility Study',
    description: 'Evaluate the technical and business viability of AI solutions for your specific challenges.',
    features: [
      'Technical feasibility analysis',
      'Market research',
      'Proof of concept development',
      'Risk assessment',
      'Implementation recommendations',
    ],
    duration: '2-4 weeks',
    price: 'Custom quote',
    gradient: 'from-indigo-500 to-purple-600',
  },
];

export default function ExpertServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [hoveredProcessStep, setHoveredProcessStep] = useState<number | null>(null);
  const [viewedTrustIndicators, setViewedTrustIndicators] = useState<Set<string>>(new Set());
  const { trackEvent } = usePlausible();

  // Track page visit on mount
  useEffect(() => {
    trackEvent('Expert Services Page View', {
      page: 'expert-services',
      timestamp: new Date().toISOString()
    });

    // Track how long users spend on the page
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackEvent('Expert Services Engagement', {
          action: 'page_exit',
          time_spent_seconds: timeSpent
        });
      }
    };
  }, [trackEvent]);

  const handleServiceClick = (index: number) => {
    const isExpanding = index !== selectedService;
    trackEvent('Expert Services', {
      action: isExpanding ? 'service_expand' : 'service_collapse',
      service: services[index].title,
      service_index: index,
      price: services[index].price,
      duration: services[index].duration
    });
    setSelectedService(index === selectedService ? null : index);
  };

  const handleBookCall = (location: string = 'default') => {
    trackEvent('Expert Services CTA', {
      action: 'book_call_click',
      location: location,
      destination: 'calendly',
      timestamp: new Date().toISOString()
    });
    // Open Calendly in a new tab
    window.open('https://calendly.com/contact-agentic-design/30min', '_blank');
  };

  const handleCTAScroll = () => {
    trackEvent('Expert Services Navigation', {
      action: 'cta_scroll_click',
      target: 'cta-section'
    });
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    trackEvent('Expert Services Contact', {
      action: 'email_link_click',
      method: 'email',
      address: 'contact@agentic-design.ai'
    });
  };

  const handleProcessStepHover = (stepIndex: number, stepTitle: string) => {
    if (hoveredProcessStep !== stepIndex) {
      setHoveredProcessStep(stepIndex);
      trackEvent('Expert Services Interaction', {
        action: 'process_step_hover',
        step_number: stepIndex + 1,
        step_title: stepTitle
      });
    }
  };

  const handleTrustIndicatorView = (indicator: string) => {
    if (!viewedTrustIndicators.has(indicator)) {
      setViewedTrustIndicators(prev => new Set(prev).add(indicator));
      trackEvent('Expert Services Trust', {
        action: 'trust_indicator_view',
        indicator: indicator
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-3 min-[400px]:px-4 sm:px-6 py-8 min-[400px]:py-12 sm:py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-3 min-[400px]:mb-4 sm:mb-6">
              <motion.div
                className="p-2.5 min-[400px]:p-3 sm:p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl min-[400px]:rounded-2xl border border-amber-500/30"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(251, 146, 60, 0.3)',
                    '0 0 40px rgba(251, 146, 60, 0.5)',
                    '0 0 20px rgba(251, 146, 60, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <HeadphonesIcon className="w-7 h-7 min-[400px]:w-8 min-[400px]:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-400" />
              </motion.div>
            </div>

            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 min-[400px]:mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Expert AI Services
              </span>
            </h1>

            <p className="text-sm min-[400px]:text-base sm:text-lg md:text-xl text-gray-300 mb-5 min-[400px]:mb-6 sm:mb-8 px-2 min-[400px]:px-4 sm:px-0">
              Accelerate your AI journey with personalized expertise, custom solutions, and strategic guidance
            </p>

            <div className="flex flex-wrap justify-center gap-3 min-[400px]:gap-4 mb-6 min-[400px]:mb-8 sm:mb-12">
              <motion.button
                onClick={() => handleBookCall('hero_section')}
                className="px-5 min-[400px]:px-6 sm:px-8 md:px-10 py-2.5 min-[400px]:py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm min-[400px]:text-base sm:text-lg max-w-[280px] min-[400px]:max-w-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 justify-center">
                  <Calendar className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="leading-tight min-[400px]:leading-normal">Schedule Free Discovery Call</span>
                </div>
              </motion.button>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-col min-[400px]:grid min-[400px]:grid-cols-1 sm:grid-cols-3 gap-3 min-[400px]:gap-4 sm:gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 min-[400px]:gap-3 text-left justify-center min-[400px]:justify-start"
                whileInView={{ opacity: 1 }}
                onAnimationComplete={() => handleTrustIndicatorView('30-minute-call')}
              >
                <Clock className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                <span className="text-xs min-[400px]:text-sm sm:text-base text-gray-300">30-minute discovery call</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 min-[400px]:gap-3 text-left justify-center min-[400px]:justify-start"
                whileInView={{ opacity: 1 }}
                onAnimationComplete={() => handleTrustIndicatorView('100-confidential')}
              >
                <Shield className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                <span className="text-xs min-[400px]:text-sm sm:text-base text-gray-300">100% confidential</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 min-[400px]:gap-3 text-left justify-center min-[400px]:justify-start"
                whileInView={{ opacity: 1 }}
                onAnimationComplete={() => handleTrustIndicatorView('no-obligation')}
              >
                <Target className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                <span className="text-xs min-[400px]:text-sm sm:text-base text-gray-300">No obligation</span>
              </motion.div>
            </div>

            {/* Language note */}
            <p className="mt-4 sm:mt-6 text-[10px] min-[400px]:text-xs text-gray-500 text-center px-2">
              Available in English and French • Disponible en anglais et français
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-100">
            How Can We Help You?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-6 px-4 sm:px-0">
            Choose from our range of services designed to accelerate your AI transformation
          </p>
          <p className="text-xs sm:text-sm text-amber-400 px-4 sm:px-0">
            Every partnership begins with a discovery call to ensure we're the right fit for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div
                  className={`h-full p-4 sm:p-5 md:p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 cursor-pointer ${
                    selectedService === index ? 'ring-2 ring-amber-500/50' : ''
                  }`}
                  onClick={() => handleServiceClick(index)}
                >
                  <div
                    className={`inline-flex p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${service.gradient} bg-opacity-20 mb-3 sm:mb-4`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-100">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{service.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{service.duration}</span>
                    <span className="font-semibold text-amber-400">{service.price}</span>
                  </div>

                  <AnimatePresence>
                    {selectedService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-800"
                      >
                        <h4 className="font-semibold text-gray-200 mb-2">What's included:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-4 sm:px-0">
            Ready to discuss your specific needs?
          </p>
          <motion.button
            onClick={() => handleBookCall('mid_page_cta')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Book Your Free Discovery Call</span>
            </div>
          </motion.button>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-100">
            Your Journey Starts Here
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            A simple 4-step process from discovery to successful implementation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {[
            {
              step: '01',
              title: 'Book Your Call',
              description: 'Choose a convenient time for your free 30-minute discovery session',
              icon: Calendar,
            },
            {
              step: '02',
              title: 'Discovery Session',
              description: 'We\'ll explore your challenges and determine if we\'re a good fit',
              icon: MessageSquare,
            },
            {
              step: '03',
              title: 'Tailored Proposal',
              description: 'If there\'s a fit, receive a custom solution with clear investment details',
              icon: Target,
            },
            {
              step: '04',
              title: 'Begin Your Journey',
              description: 'Start transforming your AI capabilities with expert guidance',
              icon: TrendingUp,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="relative"
              onMouseEnter={() => handleProcessStepHover(index, item.title)}
              onMouseLeave={() => setHoveredProcessStep(null)}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-3 sm:mb-4">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500/30 mb-2">{item.step}</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 px-2 sm:px-0">{item.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Book a Call */}
      <section id="cta-section" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-amber-900/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-amber-500/30 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
              whileInView={{ opacity: 1 }}
              onAnimationComplete={() => trackEvent('Expert Services Section View', {
                action: 'cta_section_view',
                section: 'final_cta'
              })}
            >
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-400 mx-auto mb-6 sm:mb-8" />

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-100">
                Let's Explore Your AI Potential
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2 sm:px-0">
                Book a free 30-minute discovery call to discuss your challenges and see if we're the right partner for your AI journey
              </p>

              {/* What you'll get */}
              <div className="bg-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto">
                <h3 className="text-base sm:text-lg font-semibold text-amber-400 mb-4 sm:mb-6">In Your Free Discovery Call, We'll:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                  {[
                    'Understand your current challenges',
                    'Identify your AI opportunities',
                    'Discuss your business goals',
                    'Explore potential solutions together',
                    'Determine if we\'re the right fit',
                    'Outline possible next steps'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main CTA Button */}
              <motion.button
                onClick={() => handleBookCall('final_cta_section')}
                className="px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base md:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="whitespace-normal sm:whitespace-nowrap">Book Your Free Discovery Call</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:inline-block" />
                </div>
              </motion.button>

              {/* Trust indicators */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-400">
                <motion.div
                  className="flex items-center gap-2"
                  whileInView={{ opacity: 1 }}
                  onAnimationComplete={() => handleTrustIndicatorView('real-human-expertise')}
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Real human expertise</span>
                  <span className="sm:hidden">Human expertise</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileInView={{ opacity: 1 }}
                  onAnimationComplete={() => handleTrustIndicatorView('final-100-confidential')}
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>100% Confidential</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileInView={{ opacity: 1 }}
                  onAnimationComplete={() => handleTrustIndicatorView('no-pressure')}
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">No pressure or obligation</span>
                  <span className="sm:hidden">No obligation</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileInView={{ opacity: 1 }}
                  onAnimationComplete={() => handleTrustIndicatorView('bilingual-support')}
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>English or French</span>
                </motion.div>
              </div>

              {/* Alternative contact - subtle */}
              <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
                Prefer email? Reach out at{' '}
                <Link
                  href="mailto:contact@agentic-design.ai"
                  onClick={handleEmailClick}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  contact@agentic-design.ai
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}