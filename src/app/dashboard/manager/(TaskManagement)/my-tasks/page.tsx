import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ManagerMyTasksTable from "./_components/ManagerMyTasksTable/ManagerMyTasksTable";

function ManagerMyTasksPage() {
  return (
    <section className="space-y-5">
      <SectionHeader
        title="My Tasks"
        subTitle="Manage tasks and assign tasks"
      />

      {/* <ManagerMyTasksStats /> */}
      <ManagerMyTasksTable />
    </section>
  );
}

export default ManagerMyTasksPage;
