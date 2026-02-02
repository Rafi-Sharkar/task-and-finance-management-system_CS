import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import FinanceMyTasksTable from "./_components/FinanceMyTasksTable/FinanceMyTasksTable";

function FinanceMyTasksPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="My Tasks"
        subTitle="Manage tasks and assign tasks"
      />

      {/* <FinanceStats /> */}
      <FinanceMyTasksTable />
    </section>
  );
}

export default FinanceMyTasksPage;
