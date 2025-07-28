'use client';

import { useRouter } from 'next/navigation';
import { 
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
  ArrowRight,
  Shield,
  Clock,
  Zap
} from 'lucide-react';

interface AuthPromptPageProps {
  feature: string;
  description: string;
}

export const AuthPromptPage = ({ feature, description }: AuthPromptPageProps) => {
  const router = useRouter();

  const benefits = [
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

  const features = [
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Hands-on exercises and real-world scenarios'
    },
    {
      icon: Shield,
      title: 'Expert Content',
      description: 'Curated by AI industry professionals'
    },
    {
      icon: Clock,
      title: 'Self-Paced',
      description: 'Learn at your own speed and schedule'
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl shadow-2xl mb-8">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
            Welcome to {feature}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            {description}
          </p>

          <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-rose-400" />
              <span className="text-2xl font-semibold text-rose-400">Sign up to unlock the full experience!</span>
            </div>
            <p className="text-gray-300 text-lg">
              Create your free account to access all features and start your AI learning journey.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleSignUp}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Start Learning Free</span>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-rose-400" />
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
              Unlock powerful features designed to accelerate your AI learning journey
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-400" />
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
            <div className="bg-gradient-to-r from-rose-600/10 to-pink-600/10 border border-rose-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-400 mb-6">
                Join thousands of learners mastering AI design patterns
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignUp}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <GraduationCap className="w-5 h-5" />
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