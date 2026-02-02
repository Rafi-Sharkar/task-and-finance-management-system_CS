"use client";

import { useGetUserDashboardQuery } from "@/redux/features/admin/dashboard/dashboard.api";
import EmployeeAverageTimeChart from "./EmployeeAverageTimeChart/EmployeeAverageTimeChart";
import EmployeeTaskActivityChart from "./EmployeeTaskActivityChart/EmployeeTaskActivityChart";

function EmployeeCharts() {
  const { data: userDashboard } = useGetUserDashboardQuery({});

  const myTaskActivity = userDashboard?.myTaskActivity;
  const activityDashboard = userDashboard?.activityDashboard;

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <EmployeeTaskActivityChart myTaskActivity={myTaskActivity}  />
      <EmployeeAverageTimeChart activityDashboard={activityDashboard} />
    </section>
  );
}

export default EmployeeCharts;
