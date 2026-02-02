import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import ManagerManageTasksTable from "./_components/ManagerManageTasksTable/ManagerManageTasksTable";
import ManageTasksCreateNewTask from "./_components/ManageTasksCreateNewTaskForm/ManageTasksCreateNewTaskForm";

function ManagerManageTasksPage() {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Manage Tasks"
          subTitle="Manage tasks and assign tasks"
        />
        <ManageTasksCreateNewTask />
      </div>

      {/* <ManagerManageTasksStats /> */}
      <ManagerManageTasksTable />
    </section>
  );
}

export default ManagerManageTasksPage;
