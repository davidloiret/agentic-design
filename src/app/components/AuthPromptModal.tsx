'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  GraduationCap,
  CheckCircle,
  Star,
  Trophy,
  Target,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Cpu,
  Zap,
  Brain
} from 'lucide-react';
import { usePlausible } from '@/hooks/usePlausible';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description: string;
}

export const AuthPromptModal = ({ isOpen, onClose, feature, description }: AuthPromptModalProps) => {
  const router = useRouter();
  const { trackEvent } = usePlausible();

  if (!isOpen) return null;

  // Get feature-specific styling
  const getFeatureStyle = (feature: string) => {
    if (feature === 'Model Recommendations') {
      return {
        icon: Brain,
        iconBg: 'bg-gradient-to-br from-blue-500 to-purple-600',
        accentColor: 'blue',
        gradientFrom: 'from-blue-500/10',
        gradientTo: 'to-purple-500/10',
        borderColor: 'border-blue-500/20',
        sparkleColor: 'text-blue-400'
      };
    }
    // Default learning hub style
    return {
      icon: GraduationCap,
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
      accentColor: 'rose',
      gradientFrom: 'from-rose-500/10',
      gradientTo: 'to-pink-500/10',
      borderColor: 'border-rose-500/20',
      sparkleColor: 'text-rose-400'
    };
  };

  const featureStyle = getFeatureStyle(feature);

  // Dynamic benefits based on the feature
  const getFeatureBenefits = (feature: string) => {
    if (feature === 'Model Recommendations') {
      return [
        {
          icon: Target,
          title: 'AI-Powered Matching',
          description: 'Get personalized model recommendations based on your specific requirements'
        },
        {
          icon: BookOpen,
          title: 'Save Recommendations',
          description: 'Bookmark and track your recommended models for future reference'
        },
        {
          icon: TrendingUp,
          title: 'Usage Analytics',
          description: 'Track which models work best for your projects and learn from experience'
        },
        {
          icon: Trophy,
          title: 'Project History',
          description: 'Keep a history of your fine-tuning projects and model performance'
        },
        {
          icon: Users,
          title: 'Community Insights',
          description: 'See what models other developers with similar needs are using'
        },
        {
          icon: Award,
          title: 'Expert Guidance',
          description: 'Access advanced filtering and comparison tools for better decisions'
        }
      ];
    }

    // Default benefits for other features
    return [
      {
        icon: Trophy,
        title: 'Track Your Progress',
        description: 'Save your learning progress and pick up where you left off'
      },
      {
        icon: Award,
        title: 'Earn Certificates',
        description: 'Get certified in AI design patterns and showcase your skills'
      },
      {
        icon: Target,
        title: 'Personalized Learning',
        description: 'Get customized learning paths based on your goals'
      },
      {
        icon: TrendingUp,
        title: 'Skill Analytics',
        description: 'Track your improvement and identify areas to focus on'
      },
      {
        icon: Users,
        title: 'Community Access',
        description: 'Connect with other learners and share your achievements'
      },
      {
        icon: BookOpen,
        title: 'Saved Resources',
        description: 'Bookmark patterns and resources for quick reference'
      }
    ];
  };

  const benefits = getFeatureBenefits(feature);

  const handleSignUp = () => {
    trackEvent('Auth Prompt Modal', {
      action: 'sign_up_click',
      feature: feature,
      description: description
    });
    onClose();
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    trackEvent('Auth Prompt Modal', {
      action: 'sign_in_click',
      feature: feature,
      description: description
    });
    onClose();
    router.push('/auth/login');
  };

  const handleContinueAsGuest = () => {
    trackEvent('Auth Prompt Modal', {
      action: 'continue_as_guest',
      feature: feature,
      description: description
    });
    onClose();
    router.push('/learning-hub');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-800">
          <button
            onClick={() => {
              trackEvent('Auth Prompt Modal', {
                action: 'close_modal',
                feature: feature,
                description: description
              });
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 ${featureStyle.iconBg} rounded-2xl flex items-center justify-center shadow-xl`}>
              <featureStyle.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">
                Unlock {feature}
              </h2>
              <p className="text-gray-400">
                {description}
              </p>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${featureStyle.gradientFrom} ${featureStyle.gradientTo} border ${featureStyle.borderColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className={`w-5 h-5 ${featureStyle.sparkleColor}`} />
              <span className={`${featureStyle.sparkleColor} font-semibold`}>
                {feature === 'Model Recommendations' ? 'Sign up for AI-powered recommendations!' : 'Sign up to get the full experience!'}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {feature === 'Model Recommendations'
                ? 'Create an account to access personalized model recommendations, save your preferences, and track your fine-tuning projects.'
                : 'Create an account to save your progress, earn certificates, and access personalized learning features.'
              }
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>What you'll get with an account:</span>
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-100 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSignUp}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r ${
                feature === 'Model Recommendations'
                  ? 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  : 'from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700'
              } text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02]`}
            >
              <featureStyle.icon className="w-5 h-5" />
              <span>Sign Up Free</span>
            </button>
            
            <button
              onClick={handleSignIn}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold rounded-lg transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
            Free account • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};