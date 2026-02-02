"use client"
import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { useGetUserSummaryQuery } from "@/redux/features/admin/user/user.api";


// user summary type
type UserManagementStatsDataType = {
  id: number;
  title: string;
  value: number;
  color?: string
};


function Stats() {
  const { data: getUserSummary } = useGetUserSummaryQuery({})

  const UserManagementStatsData: UserManagementStatsDataType[] = [
    {
      id: 1,
      title: "Total Users",
      value: getUserSummary?.data?.totalUsers || 0,
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
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {UserManagementStatsData.map((stat) => {
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

export default Stats;
