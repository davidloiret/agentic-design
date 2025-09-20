'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlausible } from '@/hooks/usePlausible';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resendingConfirmation, setResendingConfirmation] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const { signIn, signInWithGoogle, signInWithGitHub } = useAuth();
  const { trackAuth, trackEvent } = usePlausible();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowResendConfirmation(false);
    setLoading(true);

    try {
      await signIn(email, password);

      // Track successful login
      trackAuth('login');

      router.push('/learning-hub');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);

      // Track failed login attempt
      trackEvent('Auth Failed', { action: 'login' });

      // Show resend confirmation option if email not confirmed
      if (errorMessage.includes('confirmation link') ||
          errorMessage.includes('activate your account') ||
          errorMessage.toLowerCase().includes('email not confirmed') ||
          errorMessage.toLowerCase().includes('check your email')) {
        setShowResendConfirmation(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendingConfirmation(true);
    setError('');
    
    try {
      const response = await fetch('/api/v1/auth/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setConfirmationSent(true);
        setShowResendConfirmation(false);
      } else {
        throw new Error('Failed to resend confirmation email');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend confirmation email');
    } finally {
      setResendingConfirmation(false);
    }
  };

  const addSparkle = () => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // Entre 10% et 90% pour éviter les bords
      y: Math.random() * 70 + 15  // Entre 15% et 85% pour rester dans le formulaire
    };
    setSparkles(prev => [...prev.slice(-4), newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden py-8"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-4 sm:mx-auto"
      >
        {/* Logo and Title */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
            }}
            animate={{
              boxShadow: [
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-3 sm:mb-4 cursor-pointer relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-300 rounded-2xl"
            />
          </motion.div>
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Agentic Design
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm sm:text-base text-gray-400 px-4 sm:px-0"
          >
            Learn how to build reliable and secure AI systems
          </motion.p>
        </motion.div>

        {/* Sign in form */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Magic sparkle effects en fond */}
          <AnimatePresence>
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                initial={{ 
                  scale: 0, 
                  opacity: 0
                }}
                animate={{ 
                  scale: [0, 1, 0.8, 0], 
                  opacity: [0, 0.8, 0.6, 0],
                  y: [0, -30, -50],
                  x: [0, Math.random() * 20 - 10]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute pointer-events-none z-0"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`
                }}
              >
                {/* Petite étincelle magique */}
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut"
                    }}
                    className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  />
                  {/* Petit scintillement */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [0, 2, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full blur-sm"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 text-center mb-5 sm:mb-6">
              Sign in to your account
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Email address
              </label>
              <div className="relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  animate={{ color: email ? "rgb(59 130 246)" : "rgb(107 114 128)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-4 sm:h-5 w-4 sm:w-5" />
                </motion.div>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value && emailFocused) {
                      addSparkle();
                    }
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  whileFocus={{ 
                    borderColor: "rgb(59 130 246)"
                  }}
                  transition={{ duration: 0.2 }}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </Link>
                </motion.div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500" />
                </div>
                <motion.input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value && passwordFocused) {
                      addSparkle();
                    }
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  whileFocus={{ 
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                  className="block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <AnimatePresence mode="wait">
                    {showPassword ? (
                      <motion.div
                        key="eye-off"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EyeOff className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 hover:text-gray-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="eye"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Eye className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500 hover:text-gray-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 overflow-hidden"
                >
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-red-400"
                  >
                    {error}
                  </motion.p>
                  <AnimatePresence>
                    {showResendConfirmation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-red-800/30 overflow-hidden"
                      >
                        <motion.button
                          onClick={handleResendConfirmation}
                          disabled={resendingConfirmation}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-sm text-blue-400 hover:text-blue-300 underline disabled:opacity-50"
                        >
                          {resendingConfirmation ? 'Sending...' : 'Resend confirmation email'}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {confirmationSent && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-green-900/20 border border-green-800/50 rounded-lg p-4"
                >
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-sm text-green-400"
                  >
                    Confirmation email sent! Please check your inbox and click the confirmation link.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span 
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-3"
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </motion.div>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Signing in...
                    </motion.span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="signin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Sign in
                  </motion.span>
                )}
              </AnimatePresence>
              {!loading && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg"
                />
              )}
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                onClick={signInWithGoogle}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex justify-center py-2.5 sm:py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800/50 text-sm sm:text-base font-medium text-gray-100 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </motion.button>

              <motion.button
                onClick={signInWithGitHub}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(55, 65, 81, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex justify-center py-2.5 sm:py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800/50 text-sm sm:text-base font-medium text-gray-100 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="mt-6 text-center"
          >
            <span className="text-gray-400">Don't have an account? </span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </Link>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}