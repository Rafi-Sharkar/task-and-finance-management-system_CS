import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import EmployeeAuditLogsTable from "./_components/AuditLogsTable/EmployeeAuditLogsTable";

function EmployeeAuditLogsPage() {
  return (
    <section className="w-full space-y-5">
      <SectionHeader title="Audit Logs" subTitle="Manage logs" />

      <EmployeeAuditLogsTable />
    </section>
  );
}

export default EmployeeAuditLogsPage;
