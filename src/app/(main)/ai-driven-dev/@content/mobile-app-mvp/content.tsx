"use client"

import React from 'react';
import { Smartphone, Zap, Users, TrendingUp } from 'lucide-react';

export default function MobileAppMVPContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Smartphone className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Mobile App MVP in 2 Weeks</h1>
            <p className="text-gray-400 mt-2">React Native fitness tracking app from zero to App Store</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Challenge</h2>
        <p className="text-gray-300 mb-6">
          <strong>Startup Goal:</strong> Validate fitness tracking app idea with minimal investment. Budget: $500. Timeline: 2 weeks to App Store.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Timeline</p>
              <p className="text-sm text-gray-400">14 days to v1.0</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Result</p>
              <p className="text-sm text-gray-400">Live on both stores</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Users</p>
              <p className="text-sm text-gray-400">500 beta signups</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Smartphone className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Features</p>
              <p className="text-sm text-gray-400">12 core features</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Week 1: Core App</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 1-2: Project Setup & Design</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Stack Selection (AI-assisted)</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs">
                  <pre className="text-gray-300">{`ChatGPT: "Recommend tech stack for fitness tracking app:
- iOS + Android
- Health data integration
- Offline support
- Real-time sync
- Budget: minimal
- Timeline: 2 weeks"

Recommendation:
✓ React Native (Expo) - single codebase
✓ Expo health plugins - device integration
✓ Supabase - backend + realtime
✓ React Native Paper - UI components
✓ Zustand - state management`}</pre>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Design with AI</p>
                <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-400">
                  <p>• V0: Generated 8 screens (workout list, stats, profile)</p>
                  <p>• Claude: Adapted designs to React Native components</p>
                  <p>• Figma Community: Found free fitness UI kit, customized with AI</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 3-4: Auth & Onboarding</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Cursor + Expo</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`Cursor: "Set up Expo app with:
- TypeScript
- React Navigation (stack + tabs)
- Supabase auth (email + Apple + Google)
- Async storage for offline
- Expo health plugin for step counting"

[AI generates project structure]

Cursor: "Create onboarding flow:
1. Welcome screen with benefits
2. Goal selection (weight loss, muscle gain, etc)
3. Profile setup (age, weight, height)
4. Permissions (health data, notifications)
5. Sign up/login"

[AI creates 5-screen onboarding with animations]`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 5-7: Core Features</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">AI-Generated Features</p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">1. Activity Tracking</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`Cursor: "Create activity tracking screen:
- Real-time step counter (Expo health)
- Distance, calories calculation
- Start/stop workout button
- Timer with pause/resume
- Save workout to Supabase"`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">2. Dashboard</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`Cursor: "Build dashboard with:
- Today's stats (steps, calories, distance)
- Weekly chart (Victory Native)
- Streak counter
- Goal progress rings
- Recent workouts list"`}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">3. Social Features</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`Cursor: "Add social layer:
- Follow friends
- Activity feed (Supabase realtime)
- Like/comment on workouts
- Leaderboard (weekly, all-time)"`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Week 2: Polish & Launch</h2>
        <div className="space-y-8">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 8-9: Advanced Features</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: Claude Code</p>
                <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-xs space-y-2">
                  <pre className="text-gray-300">{`$ "Add workout programs:
- Pre-built workout plans (HIIT, running, strength)
- Custom workout creator
- Exercise library with instructions
- Progress tracking per program"

[AI generates workout data models + UI]

$ "Implement notifications:
- Daily reminder (configurable time)
- Achievement unlocked
- Friend completed workout
- Weekly summary"

[AI sets up Expo notifications + backend]`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-pink-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 10-11: Testing & Bug Fixes</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: GitHub Copilot + Jest</p>
                <div className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-400 space-y-2">
                  <p>• Copilot generated unit tests for utils (calorie calculation, distance conversion)</p>
                  <p>• Integration tests for Supabase queries</p>
                  <p>• Manual testing on 5 devices (iOS + Android)</p>
                  <p>• AI helped debug permission issues on iOS 17</p>
                  <p>• Fixed 12 bugs (AI provided solutions for 10)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 12-13: Store Preparation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Tool: ChatGPT-4 + Midjourney</p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">App Store Assets:</p>
                    <ul className="text-xs text-gray-400 space-y-1 ml-4">
                      <li>• Icon: Midjourney + AI upscaling → all sizes</li>
                      <li>• Screenshots: AI-generated marketing copy overlays</li>
                      <li>• App description: ChatGPT wrote compelling copy</li>
                      <li>• Keywords: AI-optimized for ASO</li>
                      <li>• Privacy policy: AI-generated template</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-300 mb-2">Build & Submit:</p>
                    <div className="font-mono text-xs text-gray-400">
                      <pre>{`$ eas build --platform all
$ eas submit --platform ios
$ eas submit --platform android

Cursor: "Create landing page with:
- Hero section
- Features showcase
- App store badges
- Email signup for updates"

[AI builds Next.js landing in 30 min]`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-teal-500 pl-6">
            <h3 className="text-xl font-semibold text-white mb-3">Day 14: Launch</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-2">Marketing (AI-powered)</p>
                <div className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-400 space-y-2">
                  <p>• Product Hunt launch (AI wrote description + first comment)</p>
                  <p>• Twitter thread (AI generated 8-tweet story)</p>
                  <p>• Reddit r/fitness post (AI crafted community-friendly post)</p>
                  <p>• Email to 500 beta signups (AI personalized messaging)</p>
                  <p>• Press kit with AI-generated quotes and stats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Final Feature List</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Activity tracking (steps, distance, calories)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Workout timer with pause/resume</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Dashboard with charts and stats</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Pre-built workout programs</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Custom workout creator</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Social feed and friends</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Leaderboards</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Push notifications</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Goal setting and tracking</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Offline support</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Health app integration (iOS/Android)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-300">Profile customization</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Launch Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Development Time</span>
              <span className="text-white font-bold">14 days</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Total Cost</span>
              <span className="text-green-400 font-bold">$487</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Lines of Code</span>
              <span className="text-blue-400 font-bold">12,300</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">AI Contribution</span>
              <span className="text-purple-400 font-bold">88%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">Week 1 Downloads</span>
              <span className="text-cyan-400 font-bold">1,247</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
              <span className="text-gray-400">App Store Rating</span>
              <span className="text-yellow-400 font-bold">4.6 / 5.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Users (Month 1)</span>
              <span className="text-orange-400 font-bold">892</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Cost Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">AI Credits (Claude + GPT-4)</span>
            <span className="text-white">$127</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Supabase (Pro plan)</span>
            <span className="text-white">$25</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Expo EAS (Build + Submit)</span>
            <span className="text-white">$99</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Apple Developer Program</span>
            <span className="text-white">$99</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Google Play Console</span>
            <span className="text-white">$25</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Domain + Hosting</span>
            <span className="text-white">$12</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Midjourney (1 month)</span>
            <span className="text-white">$10</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Miscellaneous</span>
            <span className="text-white">$90</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="text-white">Total</span>
            <span className="text-green-400">$487</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">What Enabled Speed</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Expo: No native code needed</li>
              <li>• Supabase: Backend in minutes</li>
              <li>• AI code generation: 88% of code</li>
              <li>• Pre-built UI components</li>
              <li>• Clear spec from day 1</li>
              <li>• Single developer (no coordination overhead)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-3">What AI Struggled With</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• iOS-specific permission flows</li>
              <li>• Animation timing and easing</li>
              <li>• App Store review guidelines</li>
              <li>• Performance optimization</li>
              <li>• Accessibility compliance</li>
              <li>• Complex gesture handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
