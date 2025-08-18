'use client';

import React from 'react';
import ReferencesSection from './shared/ReferencesSection';
import {
  QuickOverviewSection,
  QuickImplementationSection,
  DosAndDontsSection,
  UsageGuideSection,
  KeyMetricsSection,
  TopUseCasesSection
} from './shared';

interface OnboardingEducationPatternsDetailsProps {
  selectedTechnique?: any;
}

export const OnboardingEducationPatternsDetails: React.FC<OnboardingEducationPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Mental Model Building', detail: 'Establish clear agent capabilities and limitations early' },
      { num: '2', action: 'Progressive Disclosure', detail: 'Layer complexity from basic to advanced features' },
      { num: '3', action: 'Interactive Tutorials', detail: 'Hands-on practice with real agent interactions' },
      { num: '4', action: 'Trust Calibration', detail: 'Demonstrate reliability and failure scenarios' },
      { num: '5', action: 'Contextual Help', detail: 'Just-in-time assistance and feature discovery' }
    ],
    example: 'intro_capabilities → guided_interaction → trust_demo → practice_scenarios → ongoing_support'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Start with clear capability boundaries and limitations', icon: '✅' },
    { type: 'do', text: 'Use progressive disclosure to prevent cognitive overload', icon: '✅' },
    { type: 'do', text: 'Provide hands-on practice with immediate feedback', icon: '✅' },
    { type: 'do', text: 'Build trust gradually through transparency and reliability', icon: '✅' },
    { type: 'do', text: 'Offer contextual help and feature discovery prompts', icon: '✅' },
    { type: 'dont', text: 'Overwhelm users with all features at once', icon: '❌' },
    { type: 'dont', text: 'Promise capabilities the agent cannot deliver', icon: '❌' },
    { type: 'dont', text: 'Use lengthy text-heavy tutorials without interaction', icon: '❌' },
    { type: 'dont', text: 'Hide important limitations or failure modes', icon: '❌' },
    { type: 'dont', text: 'Force users through rigid linear onboarding flows', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Introducing novel AI agent capabilities',
      'Complex systems requiring mental model building',
      'Consumer-facing AI applications',
      'Systems where trust and reliability are critical'
    ],
    avoidWhen: [
      'Expert users already familiar with similar agents',
      'Simple, single-purpose agent tools',
      'Internal tools with extensive training programs',
      'Temporary or experimental prototypes'
    ]
  };

  const keyMetrics = [
    { metric: 'Onboarding Completion', measure: '% of users completing initial training flow' },
    { metric: 'Feature Adoption', measure: 'Rate of advanced feature discovery and usage' },
    { metric: 'Trust Calibration', measure: 'Appropriate reliance on agent recommendations' },
    { metric: 'Time to Productivity', measure: 'Duration from first use to effective task completion' },
    { metric: 'User Retention', measure: '% of users returning after initial onboarding' },
    { metric: 'Support Reduction', measure: 'Decrease in help requests post-onboarding' }
  ];

  const topUseCases = [
    'AI Assistant Introduction: Progressive capability reveal with trust-building scenarios',
    'Professional Tool Onboarding: Expert feature education with workflow integration',
    'Consumer AI Products: Mental model building for everyday users',
    'Enterprise Agent Deployment: Role-based training with compliance education',
    'Educational AI Tutors: Learning methodology explanation and interaction patterns'
  ];

  const references = [
    {
      title: 'Learning Theory & Cognitive Science',
      items: [
        { title: 'Cognitive Load Theory in Instructional Design (Sweller, 2011)', url: 'https://link.springer.com/article/10.1007/s10648-010-9133-4' },
        { title: 'Progressive Disclosure in Learning Systems (Nielsen, 2006)', url: 'https://www.nngroup.com/articles/progressive-disclosure/' },
        { title: 'Mental Models in Human-Computer Interaction (Norman, 2013)', url: 'https://mitpress.mit.edu/books/design-everyday-things' },
        { title: 'Scaffolding Theory in Educational Technology (Wood, Bruner & Ross, 1976)', url: 'https://psycnet.apa.org/record/1977-07458-001' },
        { title: 'Zone of Proximal Development in Interface Design (Vygotsky, 1978)', url: 'https://www.simplypsychology.org/Zone-of-Proximal-Development.html' }
      ]
    },
    {
      title: 'Trust & Mental Models in AI',
      items: [
        { title: 'Trust in Human-AI Collaboration (Lee & See, 2004)', url: 'https://journals.sagepub.com/doi/10.1518/hfes.46.1.50.30392' },
        { title: 'Calibrating Trust in AI Systems (Parasuraman & Riley, 1997)', url: 'https://journals.sagepub.com/doi/10.1518/001872097778543886' },
        { title: 'Mental Models of AI Capabilities (Keil & Wilson, 2000)', url: 'https://mitpress.mit.edu/books/explanation-and-cognition' },
        { title: 'Trust Repair in Automated Systems (Madhavan & Wiegmann, 2007)', url: 'https://journals.sagepub.com/doi/10.1518/001872007X312496' },
        { title: 'AI Transparency and User Understanding (Ribeiro et al., 2016)', url: 'https://dl.acm.org/doi/10.1145/2939672.2939778' }
      ]
    },
    {
      title: 'User Onboarding Research',
      items: [
        { title: 'User Onboarding Design Patterns (Krug, 2014)', url: 'https://sensible.com/dont-make-me-think/' },
        { title: 'First-Time User Experience Design (Hoober & Berkman, 2011)', url: 'https://www.oreilly.com/library/view/designing-mobile-interfaces/9781449318451/' },
        { title: 'Onboarding Effectiveness Studies (Pulizzi & Barrett, 2009)', url: 'https://contentmarketinginstitute.com/research/' },
        { title: 'CHI 2023: AI Onboarding Patterns', url: 'https://dl.acm.org/doi/proceedings/10.1145/3544548' },
        { title: 'Progressive Web App Onboarding (Google, 2021)', url: 'https://web.dev/app-like-pwas/' }
      ]
    },
    {
      title: 'Industry Best Practices',
      items: [
        { title: 'Apple Human Interface Guidelines - Onboarding', url: 'https://developer.apple.com/design/human-interface-guidelines/onboarding' },
        { title: 'Google Material Design - Onboarding', url: 'https://material.io/design/communication/onboarding.html' },
        { title: 'Microsoft Fluent Design - First Run Experience', url: 'https://docs.microsoft.com/en-us/windows/apps/design/basics/navigation-basics' },
        { title: 'Salesforce Lightning Design - Welcome Mats', url: 'https://www.lightningdesignsystem.com/components/welcome-mat/' },
        { title: 'Atlassian Design - Onboarding Patterns', url: 'https://atlassian.design/patterns/onboarding' }
      ]
    },
    {
      title: 'Interactive Tutorial Design',
      items: [
        { title: 'Interactive Tutorial Effectiveness (Carroll & Rosson, 1987)', url: 'https://dl.acm.org/doi/10.1145/22339.22377' },
        { title: 'Guided Tour vs. Contextual Help (Grossman et al., 2009)', url: 'https://dl.acm.org/doi/10.1145/1518701.1518803' },
        { title: 'Microlearning in Software Training (Hug, 2005)', url: 'https://www.researchgate.net/publication/228637025_Microlearning_A_new_pedagogical_challenge' },
        { title: 'Just-in-Time Learning Systems (Ackerman & Malone, 1990)', url: 'https://dl.acm.org/doi/10.1145/97243.97279' },
        { title: 'Adaptive Help Systems (Brusilovsky, 2001)', url: 'https://link.springer.com/chapter/10.1007/3-540-44566-8_1' }
      ]
    },
    {
      title: 'Implementation Frameworks',
      items: [
        { title: 'React Onboarding Libraries (Reactour)', url: 'https://reactour.js.org/' },
        { title: 'Vue.js Tour Components', url: 'https://github.com/pulsardev/vue-tour' },
        { title: 'Intro.js Step-by-Step Guide', url: 'https://introjs.com/' },
        { title: 'Shepherd.js Guided Tours', url: 'https://shepherdjs.dev/' },
        { title: 'Driver.js Onboarding Framework', url: 'https://driverjs.com/' }
      ]
    },
    {
      title: 'Measurement & Analytics',
      items: [
        { title: 'Onboarding Funnel Analysis (Mixpanel, 2022)', url: 'https://mixpanel.com/blog/onboarding-funnel-analysis/' },
        { title: 'User Engagement Metrics (Amplitude, 2021)', url: 'https://amplitude.com/blog/user-engagement-metrics' },
        { title: 'Product Analytics for Onboarding (Segment, 2020)', url: 'https://segment.com/blog/product-analytics-onboarding/' },
        { title: 'A/B Testing Onboarding Flows (Optimizely, 2019)', url: 'https://blog.optimizely.com/2019/02/26/ab-test-onboarding/' },
        { title: 'Retention Analysis Post-Onboarding (Clevertap, 2021)', url: 'https://clevertap.com/blog/user-retention-analysis/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="User education and onboarding patterns for building appropriate mental models and trust in AI agents"
        why="Users need proper introduction to agent capabilities to develop appropriate expectations and effective usage patterns"
        keyInsight="Build trust through progressive capability disclosure, hands-on practice, and transparent limitation communication"
      />

      <QuickImplementationSection
        steps={quickImplementation.steps}
        example={quickImplementation.example}
      />

      <DosAndDontsSection items={dosAndDonts} />

      <UsageGuideSection
        useWhen={usageGuide.useWhen}
        avoidWhen={usageGuide.avoidWhen}
      />

      <KeyMetricsSection metrics={keyMetrics} />

      <TopUseCasesSection useCases={topUseCases} />

      <ReferencesSection categories={references} />
    </>
  );
};

export default OnboardingEducationPatternsDetails;