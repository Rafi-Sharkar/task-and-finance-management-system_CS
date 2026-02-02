import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import EmployeeMyTasksTable from "./_components/EmployeeMyTasksTable/EmployeeMyTasksTable";

function EmployeeMyTasksPage() {
  return (
    <section className="w-full space-y-6">
      <SectionHeader
        title="My Tasks"
        subTitle="Manage tasks and assign tasks"
      />

      {/* <EmployeeStats /> */}
      <EmployeeMyTasksTable />
    </section>
  );
}

export default EmployeeMyTasksPage;
