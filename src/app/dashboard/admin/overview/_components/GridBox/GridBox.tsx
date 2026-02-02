import AverageTimeChart from "./_components/Charts/AverageTimeChart/AverageTimeChart";
import FinanceDashboard from "./_components/Charts/FinanceDashboard/FinanceDashboard";
import TaskActivityChart from "./_components/Charts/TaskActivityChart/TaskActivityChart";
import TotalUsersChart from "./_components/Charts/TotalUsersChart/TotalUsersChart";
import AssignedTasksTable from "./_components/Tables/AssignedTasksTable/AssignedTasksTable";
import AuditLogsTable from "./_components/Tables/AuditLogsTable/AuditLogsTable";

export interface MonthlyStat {
  month: string;
  income: number;
  expense: number;
}

export interface TaskActivityProps {
  taskActivity: {
    completed: { count: number; percentage: number };
    incomplete: { count: number; percentage: number };
    inProgress: { count: number; percentage: number };
    totalTasks: number;
    totalActivityAverage: number;
  };
}

export interface UserStats {
  userStats: {
    pending: number;
    active: number;
    inactive: number;
    total: number;
  };
}

export interface IAuditLog {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}

interface WeeklyData {
  day: string;
  durationSec: number;
  durationFormatted: string;
  isToday: boolean;
}

export interface ActivityDashboardProps {
  activityDashboard: {
    averageTimeSpent: string;
    weeklyData: WeeklyData[];
  };
}

interface GridBoxProps {
  incomeExpenseStats: MonthlyStat[];
  taskActivity: TaskActivityProps["taskActivity"];
  userStats: UserStats["userStats"];
  recentAudits: IAuditLog[];
  activityDashboard: ActivityDashboardProps["activityDashboard"];
}

function GridBox({
  incomeExpenseStats,
  taskActivity,
  userStats,
  recentAudits,
  activityDashboard,
}: GridBoxProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6 xl:col-span-2">
        <FinanceDashboard data={incomeExpenseStats} />
        <AssignedTasksTable />
        <AuditLogsTable recentAudits={recentAudits} />
      </div>

      {/* RIGHT SIDE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-1">
        <TaskActivityChart taskActivity={taskActivity} />
        <TotalUsersChart userStats={userStats} />
        <AverageTimeChart activityDashboard={activityDashboard} />
      </div>
    </div>
  );
}

export default GridBox;
