"use client";
import React from "react";
import ManagerOverviewStats from "../ManagerOverviewStats/ManagerOverviewStats";
import ManagerOverviewGridBox from "../ManagerOverviewGridBox/ManagerOverviewGridBox";
import { useGetManagerDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";

const ManagerOverviewPageContent: React.FC = () => {
  const { data: managerDashboard } = useGetManagerDashboardQuery({});

  const topCounts = managerDashboard?.topCounts;
  const taskActivity = managerDashboard?.taskActivity;
  const userStats = managerDashboard?.userStats;
  const activityDashboard = managerDashboard?.activityDashboard;

  return (
    <div>
      <ManagerOverviewStats topCounts={topCounts} />
      <ManagerOverviewGridBox
        taskActivity={taskActivity}
        userStats={userStats}
        activityDashboard={activityDashboard} />
    </div>
  );
};

export default ManagerOverviewPageContent;
