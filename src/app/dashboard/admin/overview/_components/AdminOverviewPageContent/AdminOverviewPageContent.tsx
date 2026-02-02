"use client";

import { useGetAdminDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";
import React from "react";
import GridBox from "../GridBox/GridBox";
import Stats from "../stats/Stats";

const AdminOverviewPageContent: React.FC = () => {
  const { data: adminDashboard } = useGetAdminDashboardQuery({});

  const topCounts = adminDashboard?.topCounts;
  const incomeExpenseStats = adminDashboard?.incomeExpenseStats;
  const taskActivity = adminDashboard?.taskActivity;
  const userStats = adminDashboard?.userStats;
  const recentAudits = adminDashboard?.recentAudits;
  const activityDashboard = adminDashboard?.activityDashboard;

  return (
    <div className="space-y-6">
      <Stats topCounts={topCounts} />
      <GridBox
        incomeExpenseStats={incomeExpenseStats}
        taskActivity={taskActivity}
        userStats={userStats}
        recentAudits={recentAudits}
        activityDashboard={activityDashboard}
      />
    </div>
  );
};

export default AdminOverviewPageContent;
