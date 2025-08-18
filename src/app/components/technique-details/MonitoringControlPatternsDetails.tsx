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

interface MonitoringControlPatternsDetailsProps {
  selectedTechnique?: any;
}

export const MonitoringControlPatternsDetails: React.FC<MonitoringControlPatternsDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Dashboard Design', detail: 'Multi-level information hierarchy from summary to detail' },
      { num: '2', action: 'Real-time Monitoring', detail: 'Live agent status, performance metrics, and alerts' },
      { num: '3', action: 'Control Interface', detail: 'Start/stop/pause controls with clear feedback' },
      { num: '4', action: 'Exception Handling', detail: 'Automated alerts and manual intervention points' },
      { num: '5', action: 'Audit Trail', detail: 'Comprehensive logging of all control actions' }
    ],
    example: 'agent_network → status_dashboard → anomaly_detected → alert + intervention_options'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design clear visual hierarchy from overview to detail', icon: '✅' },
    { type: 'do', text: 'Implement real-time updates with minimal latency', icon: '✅' },
    { type: 'do', text: 'Provide emergency stop/pause for all operations', icon: '✅' },
    { type: 'do', text: 'Use consistent color coding for status indicators', icon: '✅' },
    { type: 'do', text: 'Include context-aware alerts and recommendations', icon: '✅' },
    { type: 'dont', text: 'Overwhelm operators with too much real-time data', icon: '❌' },
    { type: 'dont', text: 'Hide critical controls behind multiple navigation levels', icon: '❌' },
    { type: 'dont', text: 'Use confusing or ambiguous status indicators', icon: '❌' },
    { type: 'dont', text: 'Implement controls without confirmation for destructive actions', icon: '❌' },
    { type: 'dont', text: 'Ignore accessibility requirements for mission-critical interfaces', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Managing complex multi-agent systems',
      'Mission-critical or high-stakes operations',
      'Systems requiring regulatory compliance',
      'Enterprise-scale agent deployments'
    ],
    avoidWhen: [
      'Simple single-agent applications',
      'Prototype or development environments',
      'Low-risk, non-critical operations',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'System Reliability', measure: 'Uptime percentage and mean time to recovery' },
    { metric: 'Alert Response Time', measure: 'Time from anomaly detection to human response' },
    { metric: 'Intervention Accuracy', measure: '% of appropriate vs unnecessary interventions' },
    { metric: 'Operator Efficiency', measure: 'Tasks managed per operator and error rates' },
    { metric: 'Dashboard Usability', measure: 'Time to find information and complete actions' },
    { metric: 'System Visibility', measure: '% of system state observable through interface' }
  ];

  const topUseCases = [
    'Enterprise Agent Networks: Monitor hundreds of agents with hierarchical status views',
    'Critical System Oversight: Real-time monitoring of safety-critical AI operations',
    'Production Deployments: Dashboard for agent performance, errors, and resource usage',
    'Compliance Monitoring: Audit trails and control logs for regulatory requirements',
    'Emergency Response: Rapid intervention capabilities for system anomalies'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Human Factors in Control Room Design (Wickens & Hollands, 2000)', url: 'https://www.semanticscholar.org/paper/Engineering-Psychology-and-Human-Performance-Wickens-Hollands/1c7d8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f' },
        { title: 'Situation Awareness in Dynamic Systems (Endsley, 1995)', url: 'https://journals.sagepub.com/doi/10.1518/001872095779049543' },
        { title: 'Mission Control Interface Design Guidelines (NASA, 2020)', url: 'https://www.nasa.gov/mission_pages/station/research/news/mission_control.html' },
        { title: 'Human-Automation Interaction in Complex Systems (Sheridan, 2002)', url: 'https://www.semanticscholar.org/paper/Humans-and-automation%3A-System-design-and-research-Sheridan/8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'AWS CloudWatch Dashboard Design', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html' },
        { title: 'Grafana Dashboard Best Practices', url: 'https://grafana.com/docs/grafana/latest/best-practices/dashboard-management/' },
        { title: 'Microsoft System Center Operations Manager', url: 'https://docs.microsoft.com/en-us/system-center/scom/' },
        { title: 'Google Cloud Operations Suite', url: 'https://cloud.google.com/products/operations' }
      ]
    },
    {
      title: 'Tools & Platforms',
      items: [
        { title: 'Prometheus + Grafana Stack', url: 'https://prometheus.io/docs/visualization/grafana/' },
        { title: 'Datadog APM Monitoring', url: 'https://docs.datadoghq.com/tracing/' },
        { title: 'New Relic Observability Platform', url: 'https://docs.newrelic.com/' },
        { title: 'Elastic Observability', url: 'https://www.elastic.co/observability' }
      ]
    },
    {
      title: 'Industry Standards',
      items: [
        { title: 'ISO 11064 Control Centre Design', url: 'https://www.iso.org/standard/50496.html' },
        { title: 'IEC 62439 Industrial Communication Networks', url: 'https://webstore.iec.ch/publication/7032' },
        { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
        { title: 'FAA Human Factors Design Standard', url: 'https://www.faa.gov/air_traffic/publications/media/hfds.pdf' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Mission-control style interfaces for real-time agent oversight and intervention"
        why="Complex agent systems need centralized monitoring and rapid intervention capabilities"
        keyInsight="Design hierarchical dashboards with exception-based alerts and clear control mechanisms"
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

export default MonitoringControlPatternsDetails;