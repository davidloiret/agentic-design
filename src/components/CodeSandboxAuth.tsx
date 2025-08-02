'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CodeSandbox from './CodeSandbox';
import { 
  Code,
  Lock,
  Play,
  Sparkles,
  ArrowRight,
  Zap,
  Download,
  GitBranch
} from 'lucide-react';

interface CodeSandboxAuthProps {
  patternId: string;
  initialCode: string;
  language: 'typescript' | 'python' | 'rust';
  onCodeChange?: (code: string) => void;
}

export default function CodeSandboxAuth({ 
  patternId, 
  initialCode, 
  language, 
  onCodeChange 
}: CodeSandboxAuthProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-white border-b border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Interactive Code Sandbox</h3>
                <p className="text-sm text-gray-600">Test and run {language} code in real-time</p>
              </div>
            </div>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Preview Code */}
        <div className="p-6 bg-gray-900 text-green-400 font-mono text-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
          <div className="relative">
            <pre className="overflow-hidden">
              {initialCode.split('\n').slice(0, 8).map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-4 select-none">{index + 1}</span>
                  <span className="blur-sm hover:blur-none transition-all duration-300">{line}</span>
                </div>
              ))}
              {initialCode.split('\n').length > 8 && (
                <div className="text-gray-500 text-center mt-2">... and {initialCode.split('\n').length - 8} more lines</div>
              )}
            </pre>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Features */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <Play className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Instant Execution</div>
                <div className="text-xs text-gray-600">Run code securely</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Save & Export</div>
                <div className="text-xs text-gray-600">Download your code</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
              <div className="p-2 bg-orange-100 rounded-lg">
                <GitBranch className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Version Control</div>
                <div className="text-xs text-gray-600">Track changes</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Unlock the Full Sandbox Experience
            </h4>
            <p className="text-gray-600 mb-6">
              Sign up to run code, save your work, and experiment with AI patterns in real-time
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push('/auth/register')}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => router.push('/auth/login')}
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Free forever • No credit card required • Instant access
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, show the full sandbox
  return (
    <CodeSandbox
      patternId={patternId}
      initialCode={initialCode}
      language={language}
      onCodeChange={onCodeChange}
    />
  );
}