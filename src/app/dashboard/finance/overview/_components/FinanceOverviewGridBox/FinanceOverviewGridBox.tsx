/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdminDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";
import FinanceAverageTimeChart from "./_components/FinanceCharts/FinanceAverageTimeChart/FinanceAverageTimeChart";
import FinanceFinanceDashboard from "./_components/FinanceCharts/FinanceFinanceDashboard/FinanceFinanceDashboard";
import FinanceTaskActivityChart from "./_components/FinanceCharts/FinanceTaskActivityChart/FinanceTaskActivityChart";
import FinanceTotalUsersChart from "./_components/FinanceCharts/FinanceTotalUsersChart/FinanceTotalUsersChart";

interface FinanceOverviewGridBoxProps {
  financeMidDashboard: {
    "completeTasks": number;
    "incompleteTasks": number;
    "inProgressTasks": number;
    "pendingInvoices": number;
    "overdueInvoices": number;
  };
  financeMyRecentTasks: any;
}

function FinanceOverviewGridBox({ financeMidDashboard, financeMyRecentTasks }: FinanceOverviewGridBoxProps) {
  const { data: adminDashboard } = useGetAdminDashboardQuery({});

  const activityDashboard = adminDashboard?.activityDashboard;
  console.log(activityDashboard, "activityDashboard");

  const taskActivityChart = {
    complete: financeMidDashboard?.completeTasks,
    incomplete: financeMidDashboard?.incompleteTasks,
    inProgress: financeMidDashboard?.inProgressTasks,
  };

  const totalUsersChart = {
    pending: financeMidDashboard?.pendingInvoices,
    overdue: financeMidDashboard?.overdueInvoices,
  };

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <FinanceTaskActivityChart taskActivityChart={taskActivityChart} />
        <FinanceTotalUsersChart totalUsersChart={totalUsersChart} />
        <FinanceAverageTimeChart activityDashboard={activityDashboard} />
      </div>

      <FinanceFinanceDashboard financeMyRecentTasks={financeMyRecentTasks}  />
    </section>
  );
}

export default FinanceOverviewGridBox;
