import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Expert AI Services | Consulting, Development & Mentoring',
  description: 'Accelerate your AI journey with personalized expertise. We offer AI strategy consulting, custom AI agent development, technical mentoring, architecture reviews, workshops, and feasibility studies. Book a free 30-minute discovery call.',
  keywords: 'AI consulting, AI development, AI mentoring, custom AI agents, LLM integration, AI strategy, machine learning consulting, AI workshops, AI architecture review, AI feasibility study, multi-agent orchestration, prompt engineering, AI transformation, AI implementation, technical mentoring',
  authors: [{ name: 'Agentic Design' }],
  openGraph: {
    title: 'Expert AI Services - Transform Your Business with AI | Agentic Design',
    description: 'From strategy to implementation: AI consulting, custom development, and mentoring services. Schedule your free discovery call to explore how we can accelerate your AI journey.',
    type: 'website',
    url: 'https://agentic-design.ai/expert-services',
    siteName: 'Agentic Design',
    images: [
      {
        url: '/api/og/expert-services',
        width: 1200,
        height: 630,
        alt: 'Agentic Design Expert AI Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert AI Services | Agentic Design',
    description: 'AI consulting, custom development & mentoring to accelerate your AI transformation. Book a free discovery call.',
    images: ['/api/og/expert-services'],
    creator: '@agentic_design',
  },
  alternates: {
    canonical: 'https://agentic-design.ai/expert-services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Service Schema for SEO
const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://agentic-design.ai/#organization',
      'name': 'Agentic Design',
      'url': 'https://agentic-design.ai',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://agentic-design.ai/logo.png',
        'width': 512,
        'height': 512
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'contact@agentic-design.ai',
        'contactType': 'sales',
        'availableLanguage': ['English', 'French']
      },
      'sameAs': [
        'https://twitter.com/agentic_design',
        'https://github.com/agentic-design'
      ]
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://agentic-design.ai/expert-services#service',
      'name': 'Expert AI Services',
      'provider': {
        '@id': 'https://agentic-design.ai/#organization'
      },
      'description': 'Comprehensive AI consulting, development, and mentoring services to accelerate your AI transformation journey',
      'url': 'https://agentic-design.ai/expert-services',
      'serviceType': ['AI Consulting', 'Software Development', 'Technical Training', 'Technical Advisory'],
      'areaServed': 'Worldwide',
      'availableLanguage': ['English', 'French'],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'AI Services Catalog',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'AI Strategy Consulting',
              'description': 'Transform your business with a comprehensive AI strategy tailored to your unique needs and goals',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'price': 'Custom quote',
              'priceCurrency': 'EUR'
            },
            'availabilityStarts': '2024-01-01',
            'validFrom': '2024-01-01'
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Custom AI Agent Development',
              'description': 'Build powerful, production-ready AI agents and systems designed specifically for your use cases',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'price': 'Project-based',
              'priceCurrency': 'EUR'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Technical Mentoring',
              'description': 'Accelerate your AI/ML journey with personalized 1-on-1 mentoring from an expert practitioner',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'price': '1500',
              'priceCurrency': 'EUR',
              'billingDuration': 'P1M'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Architecture Review',
              'description': 'Get expert analysis of your AI system architecture with actionable recommendations for improvement',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'price': '5000',
              'priceCurrency': 'EUR'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'AI Workshop',
              'description': 'Master the art of prompt design, context engineering, and AI integration with hands-on training',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'minPrice': '8000',
              'priceCurrency': 'EUR',
              'unitText': 'per workshop'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Research & Feasibility Study',
              'description': 'Evaluate the technical and business viability of AI solutions for your specific challenges',
              'provider': {
                '@id': 'https://agentic-design.ai/#organization'
              }
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'price': 'Custom quote',
              'priceCurrency': 'EUR'
            }
          }
        ]
      }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How does the free discovery call work?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'The free 30-minute discovery call is a no-obligation consultation where we discuss your challenges, explore AI opportunities, and determine if we\'re the right fit for your needs. You can book it directly through our Calendly link.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What languages are services available in?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'All our services are available in both English and French. Nous offrons tous nos services en anglais et en français.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the typical project duration?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Project duration varies by service: Strategy Consulting (2-4 weeks), Custom Development (4-12 weeks), Architecture Review (1-2 weeks), Workshops (2-3 days), and Technical Mentoring (monthly subscription).'
          }
        }
      ]
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://agentic-design.ai'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Expert Services',
          'item': 'https://agentic-design.ai/expert-services'
        }
      ]
    }
  ]
};

export default function ExpertServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={serviceSchema} />
      {children}
    </>
  );
}