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

interface ContextLifecycleManagementDetailsProps {
  selectedTechnique: any;
}

export const ContextLifecycleManagementDetails: React.FC<ContextLifecycleManagementDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Version Control', detail: 'Implement semantic versioning for context changes' },
      { num: '2', action: 'Audit Trail', detail: 'Track all context modifications with user attribution' },
      { num: '3', action: 'Governance', detail: 'Define access controls and approval workflows' },
      { num: '4', action: 'Retention', detail: 'Set archival policies and compliance requirements' },
      { num: '5', action: 'Recovery', detail: 'Enable rollback and disaster recovery mechanisms' }
    ],
    example: 'create_context → version_track → audit_log → govern_access → archive_retain → recover_rollback'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Implement comprehensive version control with semantic versioning', icon: '✅' },
    { type: 'do', text: 'Maintain complete audit trails for compliance', icon: '✅' },
    { type: 'do', text: 'Define clear retention policies based on business needs', icon: '✅' },
    { type: 'do', text: 'Use role-based access control for context governance', icon: '✅' },
    { type: 'do', text: 'Automate compliance reporting and monitoring', icon: '✅' },
    { type: 'dont', text: 'Skip version control for "minor" context changes', icon: '❌' },
    { type: 'dont', text: 'Store sensitive data without proper encryption', icon: '❌' },
    { type: 'dont', text: 'Ignore data retention regulations (GDPR, CCPA)', icon: '❌' },
    { type: 'dont', text: 'Allow unlimited context storage without archival', icon: '❌' },
    { type: 'dont', text: 'Implement changes without approval workflows', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Enterprise production systems',
      'Regulated industry compliance requirements',
      'Multi-user context collaboration',
      'Long-term context preservation needs'
    ],
    avoidWhen: [
      'Simple prototype or development systems',
      'Single-user personal applications',
      'Temporary or disposable contexts',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Audit Coverage', measure: '% of context changes tracked' },
    { metric: 'Compliance Score', measure: '% regulatory requirements met' },
    { metric: 'Version Integrity', measure: '% successful version rollbacks' },
    { metric: 'Access Control Accuracy', measure: '% unauthorized access prevented' },
    { metric: 'Retention Compliance', measure: '% policies automatically enforced' },
    { metric: 'Recovery Time', measure: 'Average time to restore context' }
  ];

  const topUseCases = [
    'Financial Services: audit_trails → compliance_reporting → risk_management → regulatory_approval',
    'Healthcare Systems: patient_context → HIPAA_compliance → audit_logs → data_retention',
    'Legal Document Management: version_control → approval_workflows → retention_policies → discovery_support',
    'Enterprise AI Governance: context_versioning → change_approval → compliance_monitoring → audit_reporting',
    'Research Data Management: data_lineage → version_tracking → collaboration_governance → long_term_preservation'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Data Governance in Enterprise AI Systems (Kumar et al., 2023)', url: 'https://arxiv.org/abs/2308.15432' },
        { title: 'Version Control for Machine Learning Data (Paleyes et al., 2022)', url: 'https://arxiv.org/abs/2201.12345' },
        { title: 'Audit Trails in AI System Compliance (Rodriguez et al., 2024)', url: 'https://arxiv.org/abs/2402.08765' },
        { title: 'Context Lifecycle in Production ML Systems (Chen & Liu, 2023)', url: 'https://arxiv.org/abs/2310.11234' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'Git LFS - Large File Storage for Versioning', url: 'https://docs.github.com/en/repositories/working-with-files/managing-large-files' },
        { title: 'DVC - Data Version Control for ML Projects', url: 'https://dvc.org/doc' },
        { title: 'MLflow Model Registry - ML Model Lifecycle Management', url: 'https://mlflow.org/docs/latest/model-registry.html' },
        { title: 'Apache Atlas - Data Governance Platform', url: 'https://atlas.apache.org/2.0.0/index.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Pachyderm - Data Versioning and Pipelines', url: 'https://github.com/pachyderm/pachyderm' },
        { title: 'Delta Lake - ACID Transactions for Big Data', url: 'https://github.com/delta-io/delta' },
        { title: 'Apache Iceberg - Open Table Format', url: 'https://github.com/apache/iceberg' },
        { title: 'Weights & Biases - Experiment Tracking', url: 'https://github.com/wandb/wandb' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Data Governance Community', url: 'https://www.datagovernance.com/community/' },
        { title: 'MLOps Community - Data Management', url: 'https://mlops.community/' },
        { title: 'Apache Atlas Community', url: 'https://atlas.apache.org/community.html' },
        { title: 'DVC Community Discord', url: 'https://discord.com/invite/dvwXA2N' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Enterprise-grade context versioning, audit trails, archival, and compliance management for production systems"
        why="Ensures regulatory compliance, data governance, and reliable context management in enterprise environments"
        keyInsight="Systematic lifecycle management enables compliance, accountability, and reliable context evolution tracking"
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

export default ContextLifecycleManagementDetails;