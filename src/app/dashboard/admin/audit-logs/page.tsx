import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import AuditLogsTable from "./_components/AuditLogsTable/AuditLogsTable";

function AdminAuditLogsPage() {
  return (
    <section className="w-full space-y-5">
      <SectionHeader title="Audit Logs" subTitle="Manage logs" />

      <AuditLogsTable />
    </section>
  );
}

export default AdminAuditLogsPage;
