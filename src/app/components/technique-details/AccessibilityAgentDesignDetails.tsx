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

interface AccessibilityAgentDesignDetailsProps {
  selectedTechnique?: any;
}

export const AccessibilityAgentDesignDetails: React.FC<AccessibilityAgentDesignDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Universal Design', detail: 'Design for diverse abilities from the start, not as afterthought' },
      { num: '2', action: 'Assistive Technology', detail: 'Integrate with screen readers, voice control, and adaptive devices' },
      { num: '3', action: 'Multimodal Access', detail: 'Provide multiple communication channels: text, voice, visual, haptic' },
      { num: '4', action: 'Cognitive Support', detail: 'Simplify language, reduce cognitive load, provide memory aids' },
      { num: '5', action: 'Dynamic Adaptation', detail: 'AI-powered real-time adjustment to user accessibility needs' }
    ],
    example: 'detect_needs → adapt_interface → multiple_modalities → assistive_integration → cognitive_support'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Follow WCAG 2.1 AA standards as minimum baseline', icon: '✅' },
    { type: 'do', text: 'Test with real users who have disabilities', icon: '✅' },
    { type: 'do', text: 'Provide multiple ways to access the same functionality', icon: '✅' },
    { type: 'do', text: 'Use semantic HTML and proper ARIA attributes', icon: '✅' },
    { type: 'do', text: 'Design with keyboard navigation as primary interaction', icon: '✅' },
    { type: 'dont', text: 'Rely solely on color to convey important information', icon: '❌' },
    { type: 'dont', text: 'Use accessibility overlays as primary solution', icon: '❌' },
    { type: 'dont', text: 'Assume one solution works for all disability types', icon: '❌' },
    { type: 'dont', text: 'Hide accessibility features in separate interfaces', icon: '❌' },
    { type: 'dont', text: 'Ignore cognitive and learning disabilities in design', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Public-facing AI applications and services',
      'Enterprise systems with diverse user bases',
      'Educational and healthcare AI tools',
      'Government and compliance-required systems'
    ],
    avoidWhen: [
      'Internal prototypes for technical teams only',
      'Specialized tools for homogeneous expert users',
      'Temporary experimental systems',
      'Single-use demonstration applications'
    ]
  };

  const keyMetrics = [
    { metric: 'WCAG Compliance Score', measure: 'Percentage of AA/AAA criteria met' },
    { metric: 'Assistive Technology Support', measure: 'Screen reader, voice control compatibility' },
    { metric: 'Task Completion Equity', measure: 'Success rates across different ability groups' },
    { metric: 'Cognitive Load Assessment', measure: 'Mental effort required for task completion' },
    { metric: 'User Satisfaction Parity', measure: 'Equal satisfaction across accessibility needs' },
    { metric: 'Adaptation Effectiveness', measure: 'Success of dynamic accessibility adjustments' }
  ];

  const topUseCases = [
    'Vision Accessibility: Screen reader optimization, high contrast, voice navigation for AI assistants',
    'Motor Accessibility: Voice control, eye tracking, switch navigation for agent interfaces',
    'Hearing Accessibility: Visual indicators, captions, sign language for AI communication',
    'Cognitive Accessibility: Simplified language, memory aids, focus assistance for complex AI tools',
    'Neurodiversity Support: Sensory accommodations, flexible interaction patterns for autism/ADHD'
  ];

  const references = [
    {
      title: 'Accessibility Standards & Guidelines',
      items: [
        { title: 'WCAG 2.1 Guidelines (W3C, 2018)', url: 'https://www.w3.org/WAI/WCAG21/Understanding/' },
        { title: 'WCAG 2.2 Latest Updates (W3C, 2023)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/' },
        { title: 'Section 508 Standards (GSA, 2018)', url: 'https://www.section508.gov/manage/laws-and-policies/' },
        { title: 'EN 301 549 European Standard (2021)', url: 'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf' },
        { title: 'ISO/IEC 40500:2012 (ISO, 2012)', url: 'https://www.iso.org/standard/58625.html' }
      ]
    },
    {
      title: 'Universal Design Research',
      items: [
        { title: 'Universal Design Principles (Mace et al., 1997)', url: 'https://projects.ncsu.edu/ncsu/design/cud/about_ud/udprinciplestext.htm' },
        { title: 'Inclusive Design Methodology (Microsoft, 2016)', url: 'https://www.microsoft.com/design/inclusive/' },
        { title: 'Design for Cognitive Accessibility (Clayton Lewis, 2006)', url: 'https://dl.acm.org/doi/10.1145/1168987.1169012' },
        { title: 'CHI 2023: AI Accessibility Research', url: 'https://dl.acm.org/doi/proceedings/10.1145/3544548' },
        { title: 'ASSETS 2022: Assistive Technology Papers', url: 'https://dl.acm.org/conference/assets' }
      ]
    },
    {
      title: 'AI & Accessibility Research',
      items: [
        { title: 'AI for Accessibility (Sato et al., 2022)', url: 'https://www.microsoft.com/en-us/research/project/ai-for-accessibility/' },
        { title: 'Machine Learning for Assistive Technology (Bigham, 2017)', url: 'https://dl.acm.org/doi/10.1145/3132525.3132526' },
        { title: 'Voice Interfaces for Visual Impairments (Pradhan et al., 2018)', url: 'https://dl.acm.org/doi/10.1145/3173574.3174227' },
        { title: 'AI-Mediated Communication (Gleason et al., 2020)', url: 'https://dl.acm.org/doi/10.1145/3313831.3376768' },
        { title: 'Cognitive Accessibility in AI Systems (Morris, 2020)', url: 'https://www.microsoft.com/en-us/research/publication/ai-for-social-good-cognitive-accessibility/' }
      ]
    },
    {
      title: 'Assistive Technology Integration',
      items: [
        { title: 'Screen Reader API Guidelines (Freedom Scientific, 2021)', url: 'https://www.freedomscientific.com/training/jaws/jaws-api/' },
        { title: 'NVDA Developer Guide (NV Access, 2023)', url: 'https://www.nvaccess.org/post/nvda-2023-1-now-available/' },
        { title: 'VoiceOver Programming Guide (Apple, 2023)', url: 'https://developer.apple.com/accessibility/ios/voiceover/' },
        { title: 'TalkBack Accessibility Service (Google, 2023)', url: 'https://developer.android.com/guide/topics/ui/accessibility/service' },
        { title: 'Windows Narrator API (Microsoft, 2023)', url: 'https://docs.microsoft.com/en-us/windows/apps/design/accessibility/narrator' }
      ]
    },
    {
      title: 'Cognitive & Learning Accessibility',
      items: [
        { title: 'Cognitive Accessibility Guidelines (W3C, 2021)', url: 'https://www.w3.org/WAI/WCAG2/supplemental/#cognitiveaccessibilityguidance' },
        { title: 'Plain Language Guidelines (plainlanguage.gov)', url: 'https://www.plainlanguage.gov/guidelines/' },
        { title: 'Dyslexia-Friendly Design (British Dyslexia Association)', url: 'https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide' },
        { title: 'Autism Spectrum UX Guidelines (Autistic Self Advocacy Network)', url: 'https://autisticadvocacy.org/policy/toolkits/accessibility/' },
        { title: 'ADHD Interface Design (CHADD, 2020)', url: 'https://chadd.org/about-adhd/adults/workplace-issues/' }
      ]
    },
    {
      title: 'Testing & Validation',
      items: [
        { title: 'axe Accessibility Testing Engine', url: 'https://www.deque.com/axe/' },
        { title: 'WAVE Web Accessibility Evaluation', url: 'https://wave.webaim.org/' },
        { title: 'Lighthouse Accessibility Audit', url: 'https://developers.google.com/web/tools/lighthouse/audits/accessibility' },
        { title: 'Pa11y Accessibility Testing', url: 'https://pa11y.org/' },
        { title: 'Accessibility Insights (Microsoft)', url: 'https://accessibilityinsights.io/' }
      ]
    },
    {
      title: 'Legal & Compliance',
      items: [
        { title: 'ADA Title III Compliance (DOJ, 2023)', url: 'https://www.ada.gov/resources/title-iii-primer/' },
        { title: 'European Accessibility Act (EU, 2019)', url: 'https://ec.europa.eu/social/main.jsp?catId=1202' },
        { title: 'AODA Accessibility Standards (Ontario, 2021)', url: 'https://www.ontario.ca/page/accessibility-rules-businesses-and-non-profits' },
        { title: 'DDA Accessibility Requirements (Australia, 1992)', url: 'https://www.humanrights.gov.au/our-work/disability-rights/disability-discrimination-act-1992-cth' },
        { title: 'JIS X 8341 Japanese Standards (2016)', url: 'https://www.jisc.go.jp/app/jis/general/GnrJISNumberNameSearchList?show&jisStdNo=X8341' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Universal design patterns for accessible agent interfaces supporting diverse abilities and assistive technologies"
        why="AI agents must be accessible to users with disabilities to ensure equitable access and legal compliance"
        keyInsight="Design inclusive experiences from the start with multimodal access, assistive technology integration, and cognitive support"
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

export default AccessibilityAgentDesignDetails;