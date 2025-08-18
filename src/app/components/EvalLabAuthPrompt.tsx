'use client';

import { useRouter } from 'next/navigation';
import { 
  FlaskConical, 
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
  BarChart3,
  GitCompare,
  TestTube
} from 'lucide-react';

interface EvalLabAuthPromptProps {
  feature: string;
  description: string;
}

export const EvalLabAuthPrompt = ({ feature, description }: EvalLabAuthPromptProps) => {
  const router = useRouter();

  const benefits = [
    {
      icon: Trophy,
      title: 'Save Evaluation Results',
      description: 'Keep track of your pattern comparisons and evaluation outcomes'
    },
    {
      icon: Award,
      title: 'Export Test Reports',
      description: 'Generate detailed reports and share findings with your team'
    },
    {
      icon: Target,
      title: 'Custom Test Suites',
      description: 'Create and save reusable evaluation templates and benchmarks'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track pattern performance over time and across different scenarios'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share evaluation results and collaborate on pattern optimization'
    },
    {
      icon: BookOpen,
      title: 'Evaluation History',
      description: 'Access your complete history of pattern evaluations and insights'
    }
  ];

  const features = [
    {
      icon: GitCompare,
      title: 'Side-by-Side Comparison',
      description: 'Compare multiple patterns simultaneously with detailed diff analysis'
    },
    {
      icon: TestTube,
      title: 'Controlled Testing',
      description: 'Run controlled experiments with consistent prompts and parameters'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Get detailed metrics on accuracy, speed, and consistency'
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-teal-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl mb-8">
            <FlaskConical className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
            Welcome to {feature}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            {description}
          </p>

          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-2xl font-semibold text-emerald-400">Sign up to unlock scientific evaluation!</span>
            </div>
            <p className="text-gray-300 text-lg">
              Create your free account to save evaluation results, export reports, and track pattern performance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleSignUp}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
            >
              <FlaskConical className="w-5 h-5" />
              <span>Start Evaluating Free</span>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
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
              Unlock powerful features designed to help you conduct rigorous pattern evaluations
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-400" />
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
            <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Ready to Start Evaluating?
              </h3>
              <p className="text-gray-400 mb-6">
                Join researchers and engineers conducting rigorous AI pattern evaluations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignUp}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <FlaskConical className="w-5 h-5" />
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