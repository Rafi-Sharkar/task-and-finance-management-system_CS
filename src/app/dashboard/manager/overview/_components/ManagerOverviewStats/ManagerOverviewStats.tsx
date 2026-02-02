import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { ManagerOverviewStatsConfig } from "./data/managerOverviewStats.data";

interface ManagerOverviewStatsProps {
  topCounts: {
    usersCount: number;
    documentsCount: number;
    tasksCount: number;
    totalRevenue: string;
  };
}

function ManagerOverviewStats({ topCounts }: ManagerOverviewStatsProps) {
  const statsDisplay = [
    {
      id: "users",
      title: "Total Users",
      value: topCounts?.usersCount?.toLocaleString() || "0",
      icon: ManagerOverviewStatsConfig[0]?.icon,
      color: ManagerOverviewStatsConfig[0]?.color,
    },
    {
      id: "documents",
      title: "Documents",
      value: topCounts?.documentsCount?.toLocaleString() || "0",
      icon: ManagerOverviewStatsConfig[1]?.icon,
      color: ManagerOverviewStatsConfig[1]?.color,
    },
    {
      id: "tasks",
      title: "Total Tasks",
      value: topCounts?.tasksCount?.toLocaleString() || "0",
      icon: ManagerOverviewStatsConfig[2]?.icon,
      color: ManagerOverviewStatsConfig[2]?.color,
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: topCounts?.totalRevenue || "$0",
      icon: ManagerOverviewStatsConfig[3]?.icon,
      color: ManagerOverviewStatsConfig[3]?.color,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-4">
      {statsDisplay.map((stat) => (
        <DynamicStatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}

export default ManagerOverviewStats;
