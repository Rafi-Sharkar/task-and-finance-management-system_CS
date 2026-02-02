"use client"
import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { useGetUserSummaryQuery } from "@/redux/features/admin/user/user.api";

type UserManagementStatsDataType = {
  id: number;
  title: string;
  value: number;
  color?: string
};

function ManagerUsersStats() {

  const { data: getUserSummary } = useGetUserSummaryQuery({})

  const ManagerUsersStatsData: UserManagementStatsDataType[] = [
    {
      id: 1,
      title: "Total Users",
      value: getUserSummary?.data?.totalUsers || 0,
      color: "#2563EB",
    },
    {
      id: 2,
      title: "Pending",
      value: getUserSummary?.data?.pendingUsers || 0,
      color: "#C98904",
    },
    {
      id: 3,
      title: "Active",
      value: getUserSummary?.data?.activeUsers || 0,
      color: "#16A34A",
    },
    {
      id: 4,
      title: "Inactive",
      value: getUserSummary?.data?.inactiveUsers || 0,
      color: "#414651",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {ManagerUsersStatsData.map((stat) => {

        return (
          <DynamicStatsCard
            key={stat?.id}
            title={stat?.title}
            value={stat?.value}
            color={stat?.color}
          />
        );
      })}
    </div>
  );
}

export default ManagerUsersStats;
