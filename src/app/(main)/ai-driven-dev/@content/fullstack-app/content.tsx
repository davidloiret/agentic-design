"use client"

import React from 'react';
import { Box, Database, Server, Smartphone, CheckCircle } from 'lucide-react';

export default function FullStackAppContent() {
  return (
    <div className="min-h-screen bg-gray-950 px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
            <Box className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Building a Full-Stack App with AI</h1>
            <p className="text-gray-400 mt-2">Complete guide: Task management SaaS from scratch</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">The Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Smartphone className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Frontend</p>
              <p className="text-sm text-gray-400">Next.js 14, React, Tailwind</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Server className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Backend</p>
              <p className="text-sm text-gray-400">tRPC, Node.js, TypeScript</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Database</p>
              <p className="text-sm text-gray-400">Prisma, PostgreSQL</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-medium">Auth</p>
              <p className="text-sm text-gray-400">NextAuth.js, OAuth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Step-by-Step Implementation</h2>
        <p className="text-gray-400 mb-6">
          This example demonstrates building a production-ready task management application using AI assistance for every layer of the stack. See the related pages for detailed implementations:
        </p>
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Phase 1: Project Setup</h3>
            <p className="text-sm text-gray-400 mb-4">
              Using AI to scaffold the complete project structure with all necessary configurations.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Initialize Next.js 14 with App Router</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Configure TypeScript and ESLint</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Set up Tailwind CSS with custom theme</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Install and configure Prisma ORM</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Phase 2: Database Layer</h3>
            <p className="text-sm text-gray-400 mb-4">
              AI-generated Prisma schema with proper relations and constraints.
            </p>
            <div className="bg-gray-950/50 rounded p-4 font-mono text-xs">
              <pre className="text-gray-300">{`model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  tasks     Task[]
  projects  Project[]
  createdAt DateTime @default(now())
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority @default(MEDIUM)
  dueDate     DateTime?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  projectId   String?
  project     Project? @relation(fields: [projectId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Project {
  id        String   @id @default(cuid())
  name      String
  color     String
  tasks     Task[]
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}`}</pre>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Phase 3: API Layer (tRPC)</h3>
            <p className="text-sm text-gray-400 mb-4">
              Type-safe API routes with full end-to-end type safety.
            </p>
            <div className="bg-gray-950/50 rounded p-4 font-mono text-xs">
              <pre className="text-gray-300">{`export const taskRouter = router({
  getAll: publicProcedure
    .input(z.object({ projectId: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: { userId: ctx.session?.user?.id, projectId: input.projectId },
        include: { project: true },
        orderBy: { createdAt: 'desc' }
      });
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      dueDate: z.date().optional(),
      projectId: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: { ...input, userId: ctx.session.user.id }
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
      // ...other fields
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: input
      });
    })
});`}</pre>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Phase 4: Frontend Components</h3>
            <p className="text-sm text-gray-400 mb-4">
              AI-generated React components with proper state management and data fetching.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Dashboard with real-time task stats</li>
              <li>• Kanban board with drag-and-drop</li>
              <li>• Task detail modal with form validation</li>
              <li>• Project management sidebar</li>
              <li>• Filtering and search functionality</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Phase 5: Authentication & Authorization</h3>
            <p className="text-sm text-gray-400 mb-4">
              Complete auth setup with NextAuth.js supporting multiple providers.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Email/password authentication</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Google OAuth integration</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Protected API routes with middleware</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-sm text-gray-300">Session management and persistence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Related Examples</h2>
        <p className="text-gray-400 mb-6">
          For more detailed implementations of specific aspects, check out these related examples:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/ai-driven-dev/saas-from-scratch" className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-colors">
            <h3 className="text-white font-medium mb-2">SaaS from Scratch</h3>
            <p className="text-xs text-gray-400">Complete 72-hour build timeline</p>
          </a>
          <a href="/ai-driven-dev/api-wrapper-library" className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-colors">
            <h3 className="text-white font-medium mb-2">API Development</h3>
            <p className="text-xs text-gray-400">Building type-safe API wrappers</p>
          </a>
          <a href="/ai-driven-dev/mobile-app-mvp" className="block p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-colors">
            <h3 className="text-white font-medium mb-2">Mobile App MVP</h3>
            <p className="text-xs text-gray-400">React Native in 14 days</p>
          </a>
        </div>
      </div>
    </div>
  );
}
