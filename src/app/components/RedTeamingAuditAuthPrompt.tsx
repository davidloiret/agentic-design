'use client';

import { useRouter } from 'next/navigation';
import { 
  Shield, 
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
  Lock,
  Clock,
  Zap,
  Bug,
  AlertTriangle,
  FileSearch
} from 'lucide-react';

interface RedTeamingAuditAuthPromptProps {
  feature: string;
  description: string;
}

export const RedTeamingAuditAuthPrompt = ({ feature, description }: RedTeamingAuditAuthPromptProps) => {
  const router = useRouter();

  const benefits = [
    {
      icon: Trophy,
      title: 'Save Audit Progress',
      description: 'Save your security audit progress and resume comprehensive assessments'
    },
    {
      icon: Award,
      title: 'Generate Security Reports',
      description: 'Export detailed security reports and compliance documentation'
    },
    {
      icon: Target,
      title: 'Custom Audit Templates',
      description: 'Create reusable audit templates for different AI system types'
    },
    {
      icon: TrendingUp,
      title: 'Risk Assessment Analytics',
      description: 'Track risk levels and security improvements over time'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Collaborate with security teams on comprehensive AI audits'
    },
    {
      icon: BookOpen,
      title: 'Audit History',
      description: 'Access your complete security audit history and findings'
    }
  ];

  const features = [
    {
      icon: Bug,
      title: 'Vulnerability Assessment',
      description: 'Systematic testing for AI security vulnerabilities and exploits'
    },
    {
      icon: FileSearch,
      title: 'Compliance Auditing',
      description: 'Comprehensive audits against security frameworks and standards'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Analysis',
      description: 'Advanced risk scoring and threat assessment capabilities'
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-orange-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl shadow-2xl mb-8">
            <Shield className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
            Welcome to {feature}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            {description}
          </p>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-red-400" />
              <span className="text-2xl font-semibold text-red-400">Sign up to unlock comprehensive security auditing!</span>
            </div>
            <p className="text-gray-300 text-lg">
              Create your free account to conduct professional AI security audits and generate detailed reports.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleSignUp}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
            >
              <Shield className="w-5 h-5" />
              <span>Start Security Audit Free</span>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-red-400" />
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
              Unlock powerful features designed to help you conduct thorough AI security assessments
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-red-400" />
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
            <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Ready to Secure Your AI Systems?
              </h3>
              <p className="text-gray-400 mb-6">
                Join security professionals conducting rigorous AI security assessments and audits
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSignUp}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]"
                >
                  <Shield className="w-5 h-5" />
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