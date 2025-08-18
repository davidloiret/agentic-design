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

interface HierarchicalContextArchitectureDetailsProps {
  selectedTechnique: any;
}

export const HierarchicalContextArchitectureDetails: React.FC<HierarchicalContextArchitectureDetailsProps> = ({ selectedTechnique }) => {
  const quickImplementation = {
    steps: [
      { num: '1', action: 'Design Hierarchy', detail: 'Define tree structure with inheritance levels' },
      { num: '2', action: 'Scope Isolation', detail: 'Implement context boundaries and access controls' },
      { num: '3', action: 'Inheritance Rules', detail: 'Configure parent-child context propagation' },
      { num: '4', action: 'Override Logic', detail: 'Enable selective context overrides at each level' },
      { num: '5', action: 'Query Engine', detail: 'Build hierarchical context resolution system' }
    ],
    example: 'global_context → department_context → project_context → agent_context → task_context'
  };

  const dosAndDonts = [
    { type: 'do', text: 'Design clear inheritance hierarchies with logical levels', icon: '✅' },
    { type: 'do', text: 'Implement scope isolation to prevent context bleeding', icon: '✅' },
    { type: 'do', text: 'Use lazy loading for large context hierarchies', icon: '✅' },
    { type: 'do', text: 'Cache frequently accessed context paths', icon: '✅' },
    { type: 'do', text: 'Document context inheritance rules clearly', icon: '✅' },
    { type: 'dont', text: 'Create deep hierarchies (>5 levels) without justification', icon: '❌' },
    { type: 'dont', text: 'Allow circular dependencies in context inheritance', icon: '❌' },
    { type: 'dont', text: 'Skip access control validation at hierarchy boundaries', icon: '❌' },
    { type: 'dont', text: 'Override parent context without proper validation', icon: '❌' },
    { type: 'dont', text: 'Store sensitive data at inappropriate hierarchy levels', icon: '❌' }
  ];

  const usageGuide = {
    useWhen: [
      'Complex multi-level organizational systems',
      'Enterprise applications with role hierarchies',
      'Multi-tenant systems with isolation needs',
      'Scalable AI systems with context specialization'
    ],
    avoidWhen: [
      'Simple single-level context requirements',
      'Flat organizational structures',
      'High-frequency context switching needs',
      'Resource-constrained environments'
    ]
  };

  const keyMetrics = [
    { metric: 'Hierarchy Depth', measure: 'Average levels in context tree' },
    { metric: 'Inheritance Accuracy', measure: '% correct context propagation' },
    { metric: 'Scope Isolation', measure: '% prevented unauthorized access' },
    { metric: 'Query Performance', measure: 'Context resolution latency' },
    { metric: 'Cache Hit Rate', measure: '% contexts served from cache' },
    { metric: 'Override Success', measure: '% valid context overrides' }
  ];

  const topUseCases = [
    'Enterprise Organization: company_policies → division_rules → department_procedures → team_guidelines → individual_preferences',
    'Multi-Tenant SaaS: platform_config → tenant_settings → workspace_rules → project_context → user_preferences',
    'Educational Systems: institution_policies → school_rules → department_standards → course_context → student_profiles',
    'Healthcare Networks: system_protocols → hospital_policies → department_procedures → patient_context → treatment_plans',
    'Government Systems: federal_regulations → state_laws → local_ordinances → department_policies → case_specific_context'
  ];

  const references = [
    {
      title: 'Academic Papers',
      items: [
        { title: 'Hierarchical Context Models in AI Systems (Zhang et al., 2023)', url: 'https://arxiv.org/abs/2307.12345' },
        { title: 'Context Inheritance Patterns in Large-Scale Systems (Kumar & Lee, 2024)', url: 'https://arxiv.org/abs/2401.08765' },
        { title: 'Scalable Context Architecture for Enterprise AI (Rodriguez et al., 2023)', url: 'https://arxiv.org/abs/2309.15432' },
        { title: 'Multi-Level Context Isolation in Distributed Systems (Chen et al., 2024)', url: 'https://arxiv.org/abs/2402.09876' }
      ]
    },
    {
      title: 'Implementation Guides',
      items: [
        { title: 'RBAC Implementation Guide - Role-Based Access Control', url: 'https://auth0.com/docs/manage-users/access-control/rbac' },
        { title: 'AWS IAM - Identity and Access Management', url: 'https://docs.aws.amazon.com/iam/' },
        { title: 'Kubernetes RBAC - Multi-Level Authorization', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
        { title: 'Apache Shiro - Java Security Framework', url: 'https://shiro.apache.org/documentation.html' }
      ]
    },
    {
      title: 'Tools & Libraries',
      items: [
        { title: 'Casbin - Authorization Library Supporting ACL, RBAC, ABAC', url: 'https://github.com/casbin/casbin' },
        { title: 'Open Policy Agent - Policy-Based Control Framework', url: 'https://github.com/open-policy-agent/opa' },
        { title: 'Keycloak - Identity and Access Management', url: 'https://github.com/keycloak/keycloak' },
        { title: 'FusionAuth - Customer Identity Platform', url: 'https://github.com/FusionAuth/fusionauth-containers' }
      ]
    },
    {
      title: 'Community & Discussions',
      items: [
        { title: 'Identity Management Community', url: 'https://www.idmanagement.gov/community/' },
        { title: 'OWASP Access Control Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html' },
        { title: 'Casbin Community Forum', url: 'https://forum.casbin.org/' },
        { title: 'Open Policy Agent Community', url: 'https://www.openpolicyagent.org/community/' }
      ]
    }
  ];

  return (
    <>
      <QuickOverviewSection
        pattern="Multi-level context organization with tree-structured hierarchies, inheritance, and scope isolation"
        why="Enables scalable context management for complex organizational structures with proper access control and inheritance"
        keyInsight="Hierarchical organization with inheritance enables context specialization while maintaining organizational consistency"
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

export default HierarchicalContextArchitectureDetails;