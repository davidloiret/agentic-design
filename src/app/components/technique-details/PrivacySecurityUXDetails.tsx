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

interface PrivacySecurityUXDetailsProps {
  selectedTechnique?: any;
}

export const PrivacySecurityUXDetails: React.FC<PrivacySecurityUXDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Privacy by Design', detail: 'Build granular controls and transparency into core UX' },
      { num: '2', action: 'Data Minimization', detail: 'Clear purpose specification and essential data collection only' },
      { num: '3', action: 'User Empowerment', detail: 'Easy access, correction, deletion, and portability controls' },
      { num: '4', action: 'Transparent Processing', detail: 'Plain language explanations of data use and AI decisions' },
      { num: '5', action: 'Security UX', detail: 'Usable security controls that balance protection and usability' }
    ],
    example: 'consent_granular → data_purpose_clear → processing_transparent → controls_accessible → security_usable'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Use plain language for privacy notices and consent forms', icon: '✅' },
    { type: 'do', text: 'Provide granular control over data types and purposes', icon: '✅' },
    { type: 'do', text: 'Make privacy settings easily discoverable and accessible', icon: '✅' },
    { type: 'do', text: 'Implement just-in-time consent for new data uses', icon: '✅' },
    { type: 'do', text: 'Design security features for usability and adoption', icon: '✅' },
    { type: 'dont', text: 'Hide privacy settings in deep menu structures', icon: '❌' },
    { type: 'dont', text: 'Use dark patterns to manipulate privacy choices', icon: '❌' },
    { type: 'dont', text: 'Overwhelm users with complex legal language', icon: '❌' },
    { type: 'dont', text: 'Make privacy-protective choices harder than permissive ones', icon: '❌' },
    { type: 'dont', text: 'Sacrifice security for convenience without user awareness', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Handling personal or sensitive data',
      'Enterprise and regulated environments',
      'Consumer-facing AI applications',
      'Cross-border data processing scenarios'
    ],
    avoidWhen: [
      'Anonymous data processing only',
      'Internal tools with no personal data',
      'Prototype systems without real data',
      'Simple single-purpose utilities'
    ]
  };

  const keyMetrics = [
    { metric: 'Privacy Control Usage', measure: '% of users actively managing privacy settings' },
    { metric: 'Consent Quality', measure: 'Informed consent vs manipulated agreement rates' },
    { metric: 'Data Subject Rights', measure: 'Success rate of access, correction, deletion requests' },
    { metric: 'Security Adoption', measure: '% of users enabling optional security features' },
    { metric: 'Transparency Effectiveness', measure: 'User understanding of data processing purposes' },
    { metric: 'Compliance Efficiency', measure: 'Time to fulfill regulatory requirements' }
  ];

  const topUseCases = [
    'GDPR Compliance Dashboard: Granular consent management with clear data usage explanations',
    'Enterprise Privacy Controls: Role-based data access with audit trails and governance',
    'Consumer AI Privacy: Transparent AI decision-making with easy opt-out mechanisms',
    'Healthcare AI Security: HIPAA-compliant interfaces with patient data protection',
    'Financial AI Systems: SOX/PCI compliance with security-first UX design'
  ];

  const references = [
    {
      title: 'Privacy by Design Frameworks',
      items: [
        { title: 'Privacy by Design Principles (Cavoukian, 2009)', url: 'https://iapp.org/media/pdf/resource_center/pbd_implement_7found_principles.pdf' },
        { title: 'EU GDPR Article 25 - Data Protection by Design', url: 'https://gdpr-info.eu/art-25-gdpr/' },
        { title: 'NIST Privacy Framework (2020)', url: 'https://www.nist.gov/privacy-framework' },
        { title: 'ISO/IEC 27001 Security Management', url: 'https://www.iso.org/isoiec-27001-information-security.html' },
        { title: 'Privacy Engineering at Scale (Microsoft, 2021)', url: 'https://www.microsoft.com/en-us/research/publication/privacy-engineering-at-scale/' }
      ]
    },
    {
      title: 'Privacy UX Research',
      items: [
        { title: 'Privacy Paradox in UX Design (Acquisti & Grossklags, 2005)', url: 'https://www.heinz.cmu.edu/~acquisti/papers/privacy-paradox-acquisti-grossklags.pdf' },
        { title: 'Usable Privacy and Security (Cranor & Garfinkel, 2005)', url: 'https://www.oreilly.com/library/view/security-and-usability/0596008279/' },
        { title: 'Privacy Notices and User Control (McDonald & Cranor, 2008)', url: 'https://dl.acm.org/doi/10.1145/1357054.1357076' },
        { title: 'CHI 2023: Privacy-Preserving AI Interfaces', url: 'https://dl.acm.org/doi/proceedings/10.1145/3544548' },
        { title: 'SOUPS 2022: Privacy UX Patterns', url: 'https://www.usenix.org/conference/soups2022' }
      ]
    },
    {
      title: 'Regulatory Compliance & Legal',
      items: [
        { title: 'GDPR Compliance Guidelines (EU, 2018)', url: 'https://ec.europa.eu/info/law/law-topic/data-protection/eu-data-protection-rules_en' },
        { title: 'CCPA Implementation Guide (California, 2020)', url: 'https://oag.ca.gov/privacy/ccpa' },
        { title: 'HIPAA Privacy Rule (HHS, 2003)', url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/index.html' },
        { title: 'COPPA Safe Harbor Guidelines (FTC, 2013)', url: 'https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule' },
        { title: 'SOX Compliance for IT Systems (2002)', url: 'https://www.sec.gov/about/laws/soa2002.pdf' }
      ]
    },
    {
      title: 'Security UX Design',
      items: [
        { title: 'Usable Security Design Principles (Yee, 2002)', url: 'https://people.eecs.berkeley.edu/~tygar/papers/Why_Johnny_Cant_Encrypt/OReilly.pdf' },
        { title: 'Security UX Toolkit (Microsoft, 2019)', url: 'https://www.microsoft.com/en-us/research/project/security-ux/' },
        { title: 'Google Security by Design', url: 'https://security.googleblog.com/2021/10/shifting-left-security-by-design.html' },
        { title: 'Apple Security and Privacy by Design', url: 'https://www.apple.com/privacy/approach-to-privacy/' },
        { title: 'OWASP Security Design Principles', url: 'https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/' }
      ]
    },
    {
      title: 'Consent Management & Control',
      items: [
        { title: 'Consent Management Platform Standards (IAB, 2020)', url: 'https://iabeurope.eu/transparency-consent-framework/' },
        { title: 'Dark Patterns in Privacy Design (Gray et al., 2018)', url: 'https://dl.acm.org/doi/10.1145/3173574.3174108' },
        { title: 'Nudging and Privacy Choices (Acquisti et al., 2017)', url: 'https://www.aeaweb.org/articles?id=10.1257/jep.31.4.205' },
        { title: 'Granular Privacy Controls (Kelley et al., 2013)', url: 'https://www.usenix.org/system/files/conference/soups2013/soups13-paper_kelley.pdf' },
        { title: 'Privacy Dashboard Design (Schaub et al., 2015)', url: 'https://dl.acm.org/doi/10.1145/2702123.2702204' }
      ]
    },
    {
      title: 'AI-Specific Privacy & Ethics',
      items: [
        { title: 'AI Ethics Guidelines (EU High-Level Expert Group, 2019)', url: 'https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai' },
        { title: 'Algorithmic Transparency Requirements (Diakopoulos, 2016)', url: 'https://www.tandfonline.com/doi/full/10.1080/21670811.2016.1208053' },
        { title: 'Right to Explanation in AI (Goodman & Flaxman, 2017)', url: 'https://dl.acm.org/doi/10.1145/3084100.3084135' },
        { title: 'Privacy-Preserving Machine Learning (Li et al., 2021)', url: 'https://arxiv.org/abs/2103.00638' },
        { title: 'Differential Privacy for AI Systems (Dwork, 2008)', url: 'https://link.springer.com/chapter/10.1007/978-3-540-79228-4_1' }
      ]
    },
    {
      title: 'Implementation Tools & Frameworks',
      items: [
        { title: 'OneTrust Privacy Management Platform', url: 'https://www.onetrust.com/products/privacy-management-software/' },
        { title: 'TrustArc Privacy Platform', url: 'https://trustarc.com/privacy-platform/' },
        { title: 'Cookiebot Consent Management', url: 'https://www.cookiebot.com/en/consent-management-platform/' },
        { title: 'Microsoft Privacy Dashboard APIs', url: 'https://docs.microsoft.com/en-us/privacy/privacy-dashboard/' },
        { title: 'Google Privacy & Security APIs', url: 'https://developers.google.com/privacy' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Privacy-first design patterns with transparent data handling, granular controls, and user empowerment"
        why="AI agents handle sensitive data requiring robust privacy protection and regulatory compliance"
        keyInsight="Implement privacy by design with granular controls, plain language transparency, and usable security"
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

export default PrivacySecurityUXDetails;