'use client';

import { useRouter } from 'next/navigation';
import { 
  Lightbulb, 
  CheckCircle, 
  Star, 
  Trophy, 
  Target,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  Brain,
  Filter,
  BarChart3
} from 'lucide-react';

interface RecommendationsAuthPromptProps {
  feature: string;
  description: string;
}

export const RecommendationsAuthPrompt = ({ feature, description }: RecommendationsAuthPromptProps) => {
  const router = useRouter();

  const benefits = [
    {
      icon: Trophy,
      title: 'Personalized Recommendations',
      description: 'Get AI pattern suggestions tailored to your specific use case and constraints'
    },
    {
      icon: Award,
      title: 'Save Recommendation History',
      description: 'Keep track of past recommendations and your favorite patterns'
    },
    {
      icon: Target,
      title: 'Advanced Filtering',
      description: 'Use sophisticated filters to find exactly the right pattern for your needs'
    },
    {
      icon: TrendingUp,
      title: 'Usage Analytics',
      description: 'Track which patterns work best for your projects and use cases'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'See how other engineers use patterns in similar contexts'
    },
    {
      icon: BookOpen,
      title: 'Custom Pattern Sets',
      description: 'Create and save your own curated collections of patterns'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Intelligent algorithm matches patterns to your specific requirements'
    },
    {
      icon: Filter,
      title: 'Smart Filtering',
      description: 'Filter by complexity, category, use case, and technical constraints'
    },
    {
      icon: BarChart3,
      title: 'Confidence Scoring',
      description: 'Each recommendation comes with confidence scores and reasoning'
    }
  ];

  const handleSignUp = () => {
    router.push('/auth/register');
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl mb-8">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
            Welcome to {feature}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            {description}
          </p>

          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-2xl font-semibold text-purple-400">Sign up to unlock intelligent recommendations!</span>
            </div>
            <p className="text-gray-300 text-lg">
              Create your free account to get personalized AI pattern recommendations and save your preferences.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleSignUp}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Get Recommendations Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={handleSignIn}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-xl border border-gray-700 transition-colors duration-200"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
            What You'll Experience
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-4 flex items-center justify-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <span>Why Create an Account?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Unlock powerful features designed to help you find the perfect AI patterns for your projects
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Ready to Get Smart Recommendations?
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of engineers using AI to find the perfect patterns for their projects
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignUp}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Create Free Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button
                  onClick={handleSignIn}
                  className="px-8 py-4 bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-200"
                >
                  Sign In Instead
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-500">
                Free • No credit card required • Join in seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};