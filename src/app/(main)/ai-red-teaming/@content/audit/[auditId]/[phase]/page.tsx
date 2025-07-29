import AuditWizardPage from '../../[auditId]/page';

export default async function AuditPhasePage({ params }: { params: Promise<{ auditId: string; phase: string }> }) {
  const { auditId } = await params;
  return <AuditWizardPage params={{ auditId }} />;
}