import { ActivityDashboardProps, TaskActivityProps, UserStats } from "@/app/dashboard/admin/overview/_components/GridBox/GridBox";
import ManagerAverageTimeChart from "./_components/Charts/ManagerAverageTimeChart/ManagerAverageTimeChart";
import ManagerTaskActivityChart from "./_components/Charts/ManagerTaskActivityChart/ManagerTaskActivityChart";
import ManagerTotalUsersChart from "./_components/Charts/ManagerTotalUsersChart/ManagerTotalUsersChart";
import ManagerMyRecentTasksTable from "./_components/Tables/ManagerMyRecentTasksTable/ManagerMyRecentTasksTable";
import ManagerRecentAuditLogsTable from "./_components/Tables/ManagerRecentAuditLogsTable/ManagerRecentAuditLogsTable";

interface ManagerOverviewGridBoxProps {
  taskActivity: TaskActivityProps["taskActivity"];
  userStats: UserStats["userStats"];
  activityDashboard: ActivityDashboardProps["activityDashboard"];
}

function ManagerOverviewGridBox({ taskActivity, userStats, activityDashboard }: ManagerOverviewGridBoxProps) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ManagerTaskActivityChart taskActivity={taskActivity} />
        <ManagerTotalUsersChart userStats={userStats} />
        <ManagerAverageTimeChart activityDashboard={activityDashboard} />
      </div>

      <ManagerMyRecentTasksTable />
      <ManagerRecentAuditLogsTable />
    </section>
  );
}

export default ManagerOverviewGridBox;
