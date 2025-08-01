import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from '@/contexts/AuthContext';
import { LearningHubProvider } from '@/contexts/LearningHubContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { SearchModal } from '@/app/components/SearchModal';
import JsonLd from '@/components/JsonLd';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agentic Design Patterns - AI Agent Architecture & Best Practices",
    template: "%s | Agentic Design Patterns",
  },
  description: "Comprehensive collection of AI agent design patterns, techniques, and best practices. Learn prompt chaining, routing, parallelization, reflection, tool use, and advanced agentic system architectures.",
  keywords: [
    "AI agents",
    "design patterns", 
    "artificial intelligence",
    "prompt engineering",
    "LLM patterns",
    "agentic systems",
    "prompt chaining",
    "AI routing",
    "tool use patterns",
    "reflection patterns",
    "multi-agent systems",
    "AI architecture",
    "machine learning patterns",
    "LLM best practices",
    "intelligent systems",
    "AI development",
    "agent frameworks",
    "conversational AI",
    "AI orchestration",
    "cognitive architectures"
  ],
  authors: [{ name: "Agentic Design Team" }],
  creator: "Agentic Design",
  publisher: "Agentic Design",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-design.ai'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Agentic Design Patterns - AI Agent Architecture & Best Practices",
    description: "Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.",
    siteName: "Agentic Design Patterns",
    images: [
      {
        url: "/api/og/default",
        width: 1200,
        height: 630,
        alt: "Agentic Design Patterns - AI Agent Architecture",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Design Patterns - AI Agent Architecture & Best Practices",
    description: "Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.",
    creator: "@agentic_design",
    images: ["/api/og/default"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  classification: "AI/Machine Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Agentic Design Patterns",
    "description": "Comprehensive collection of AI agent design patterns, techniques, and best practices for building intelligent systems.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://agentic-design.ai",
    "publisher": {
      "@type": "Organization",
      "name": "Agentic Design",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://agentic-design.ai"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://agentic-design.ai"}/patterns?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={structuredData} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SearchProvider>
            <LearningHubProvider>
              {children}
              <SearchModal />
            </LearningHubProvider>
          </SearchProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
