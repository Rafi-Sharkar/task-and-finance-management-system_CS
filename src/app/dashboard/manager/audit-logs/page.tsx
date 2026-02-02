import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ManagerAuditLogsTable from "./_components/ManagerAuditLogsTable/ManagerAuditLogsTable";

function ManagerAuditLogsPage() {
  return (
    <section className="w-full space-y-5">
      <SectionHeader title="Manage logs" subTitle="Manage logs" />
      <ManagerAuditLogsTable />
    </section>
  );
}

export default ManagerAuditLogsPage;
