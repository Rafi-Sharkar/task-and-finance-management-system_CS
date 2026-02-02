import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import CreateNewTask from "./_components/CreateNewTaskForm/CreateNewTaskForm";
import TaskManagementTable from "./_components/TaskManagementTable/TaskManagementTable";
import Stats from "./_components/stats/Stats";

function AdminDashboardTaskManagement() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Task Management"
          subTitle="Manage user accounts and permissions"
        />
        <CreateNewTask />
      </div>

      <Stats />
      <TaskManagementTable />
    </section>
  );
}

export default AdminDashboardTaskManagement;
