import AuditWizardPage from '../[auditId]/page';

export default function NewAuditPage() {
  return <AuditWizardPage params={{ auditId: 'new' }} />;
}