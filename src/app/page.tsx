import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AIReasoningExplorer } from "./AiReasoningExplorer";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Agentic Design',
    description: 'A modern Next.js application with SEO optimization',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <AIReasoningExplorer />
    </>
  );
}
