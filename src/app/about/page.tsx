import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Agentic Design Patterns',
  description: 'Learn about the comprehensive collection of AI agent design patterns, techniques, and best practices. Discover the philosophy behind agentic systems and intelligent agent architectures.',
  keywords: [
    'AI agent design',
    'agentic systems',
    'design patterns philosophy',
    'AI architecture principles',
    'intelligent systems',
    'agent frameworks',
    'AI development methodology',
    'machine learning patterns',
    'LLM best practices'
  ],
  openGraph: {
    title: 'About Agentic Design Patterns',
    description: 'Learn about the comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.',
    type: 'article',
    url: '/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Agentic Design Patterns',
    description: 'Learn about the comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai'}/about`,
  },
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
              🧠
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            About Agentic Design Patterns
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, open-source collection of AI agent design patterns, techniques, and best practices for building intelligent systems.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              To democratize AI agent development by providing clear, actionable design patterns that help developers build more reliable, scalable, and intelligent agentic systems. We believe that well-designed patterns are the foundation of robust AI applications.
            </p>
          </div>
        </div>

        {/* What You'll Find */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xl mb-4">
              🔗
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Design Patterns</h3>
            <p className="text-gray-400 leading-relaxed">
              Proven patterns for prompt chaining, routing, parallelization, reflection, and advanced agentic workflows that solve real-world problems.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl mb-4">
              🛠️
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Interactive Examples</h3>
            <p className="text-gray-400 leading-relaxed">
              Live demonstrations, code playgrounds, and visual flows that help you understand how each pattern works in practice.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl mb-4">
              📚
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Best Practices</h3>
            <p className="text-gray-400 leading-relaxed">
              Implementation guidelines, common pitfalls to avoid, and optimization strategies for each pattern and technique.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xl mb-4">
              🚀
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Production Ready</h3>
            <p className="text-gray-400 leading-relaxed">
              Real-world tested patterns with performance considerations, scalability insights, and deployment strategies.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Design Philosophy</h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-white">Clarity over Complexity:</strong> Every pattern is explained with clear examples and straightforward implementations.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Practice over Theory:</strong> Focus on actionable techniques that work in real applications, not academic abstractions.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Community Driven:</strong> Open-source patterns that evolve with the AI development community's needs and discoveries.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Pattern Categories</h2>
          <div className="grid gap-4">
            {[
              { name: "Prompt Chaining", desc: "Sequential and parallel prompt execution patterns", icon: "🔗" },
              { name: "Routing", desc: "Dynamic request routing and load balancing", icon: "🎯" },
              { name: "Parallelization", desc: "Concurrent processing and synchronization", icon: "⚡" },
              { name: "Reflection", desc: "Self-improvement and critique patterns", icon: "🪞" },
              { name: "Tool Use", desc: "External system integration patterns", icon: "🛠️" },
              { name: "Multi-Agent", desc: "Collaborative agent architectures", icon: "👥" },
              { name: "Memory Management", desc: "Context and state management strategies", icon: "🧠" },
              { name: "Planning & Execution", desc: "Goal decomposition and execution patterns", icon: "📋" }
            ].map((category, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="text-2xl mr-4">{category.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/patterns"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">🚀</span>
            Explore Design Patterns
          </Link>
        </div>
      </div>
    </div>
  )
}