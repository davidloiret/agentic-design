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

interface ThreatDetectionResponseDetailsProps {
  selectedTechnique: any;
}

export const ThreatDetectionResponseDetails: React.FC<ThreatDetectionResponseDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Data Collection', detail: 'Multi-source telemetry & behavioral logs' },
      { num: '2', action: 'Anomaly Detection', detail: 'ML models for behavioral analysis' },
      { num: '3', action: 'Threat Classification', detail: 'Severity & impact assessment' },
      { num: '4', action: 'Automated Response', detail: 'Containment & mitigation actions' },
      { num: '5', action: 'Intelligence Update', detail: 'IOC database & pattern learning' }
    ],
    example: 'telemetry_collection → anomaly_detection → threat_classification → automated_response → intelligence_update'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement multi-layered detection (behavioral, network, access)', icon: '✅' },
    { type: 'do', text: 'Use ML models trained on agent-specific behaviors', icon: '✅' },
    { type: 'do', text: 'Automate immediate response for critical threats', icon: '✅' },
    { type: 'do', text: 'Maintain comprehensive forensic capabilities', icon: '✅' },
    { type: 'do', text: 'Integrate external threat intelligence feeds', icon: '✅' },
    { type: 'dont', text: 'Rely on signature-based detection alone', icon: '❌' },
    { type: 'dont', text: 'Ignore false positive rate optimization', icon: '❌' },
    { type: 'dont', text: 'Skip incident response playbook automation', icon: '❌' },
    { type: 'dont', text: 'Delay threat containment pending manual review', icon: '❌' },
    { type: 'dont', text: 'Forget to update detection models regularly', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Enterprise security operations',
      'Real-time monitoring requirements',
      'Incident response automation',
      'Threat hunting activities'
    ],
    avoidWhen: [
      'Low-risk development environments',
      'Resource-constrained systems',
      'Single-user applications',
      'Offline-only deployments'
    ]
  };

  const keyMetrics = [
    { metric: 'Mean Time to Detection (MTTD)', measure: 'Time to identify threats' },
    { metric: 'Mean Time to Response (MTTR)', measure: 'Time to begin containment' },
    { metric: 'False Positive Rate', measure: '% benign activities flagged as threats' },
    { metric: 'Threat Coverage', measure: '% known attack vectors detected' },
    { metric: 'Incident Containment Rate', measure: '% threats successfully isolated' },
    { metric: 'Alert Fatigue Index', measure: 'Security team alert overload metric' }
  ];

  const topUseCases = [
    'SOC Operations: 24/7 monitoring, automated triage, incident orchestration',
    'Cloud AI Security: Container threats, API anomalies, data exfiltration detection',
    'Enterprise Agents: Insider threat detection, privilege escalation, lateral movement',
    'Financial AI: Fraud detection, market manipulation, compliance violations',
    'Healthcare AI: HIPAA breaches, unauthorized access, data integrity attacks'
  ];

  const references = [
    {
      title: 'Frameworks & Standards',
      items: [
        { title: 'MITRE ATT&CK Framework - Enterprise Matrix', url: 'https://attack.mitre.org/matrices/enterprise/' },
        { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
        { title: 'SANS Incident Response Process', url: 'https://www.sans.org/white-papers/1901/' },
        { title: 'ISO/IEC 27035 - Incident Security Management', url: 'https://www.iso.org/standard/44379.html' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Microsoft Defender for Cloud - Threat Detection', url: 'https://docs.microsoft.com/en-us/azure/security-center/' },
        { title: 'AWS GuardDuty - Intelligent Threat Detection', url: 'https://docs.aws.amazon.com/guardduty/' },
        { title: 'Google Cloud Security Command Center', url: 'https://cloud.google.com/security-command-center' },
        { title: 'Splunk Security Operations - SOAR Platform', url: 'https://www.splunk.com/en_us/software/splunk-security-orchestration-and-automation-response.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'YARA - Pattern Matching Engine', url: 'https://github.com/virustotal/yara' },
        { title: 'Suricata - Network Security Monitoring', url: 'https://github.com/oisf/suricata' },
        { title: 'Elastic Security - SIEM and Endpoint Security', url: 'https://github.com/elastic/elasticsearch' },
        { title: 'TheHive - Security Incident Response Platform', url: 'https://github.com/thehiveproject/thehive' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'SANS Internet Storm Center', url: 'https://isc.sans.edu/' },
        { title: 'FIRST - Forum of Incident Response Teams', url: 'https://www.first.org/' },
        { title: 'Reddit Cybersecurity Community', url: 'https://reddit.com/r/cybersecurity' },
        { title: 'InfoSec Twitter Community', url: 'https://twitter.com/search?q=%23infosec' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Real-time security monitoring and automated threat response for AI agent environments"
        why="Enables rapid threat detection, reduces security incidents, automates response, and maintains forensic evidence"
        keyInsight="Multi-source telemetry + ML anomaly detection + automated response → proactive security posture"
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

export default ThreatDetectionResponseDetails;