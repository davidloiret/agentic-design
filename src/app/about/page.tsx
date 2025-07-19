import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Agentic Design - a modern Next.js application with SEO optimization.',
}

export default function About() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">About Agentic Design</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn more about this SEO-optimized Next.js application.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Features</h2>
          <ul>
            <li>Next.js 15 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>SEO optimized with metadata API</li>
            <li>Automatic sitemap generation</li>
            <li>Robots.txt configuration</li>
            <li>Vercel deployment ready</li>
            <li>Turbopack for faster development</li>
          </ul>

          <h2>SEO Features</h2>
          <ul>
            <li>Dynamic metadata generation</li>
            <li>Open Graph tags</li>
            <li>Twitter Card tags</li>
            <li>Structured data ready</li>
            <li>Security headers</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}