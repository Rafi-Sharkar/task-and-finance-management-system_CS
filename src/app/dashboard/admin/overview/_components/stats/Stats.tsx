import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { ClipboardList, DollarSign, FileText, Users } from "lucide-react";

const OverviewCardConfig = [
  {
    icon: Users,
    color: "#45B56E",
  },
  {
    icon: FileText,
    color: "#D4A136",
  },
  {
    icon: ClipboardList,
    color: "#E86E6E",
  },
  {
    icon: DollarSign,
    color: "#252B37",
  },
];

interface StatsProps {
  topCounts: {
    documentsCount: number;
    tasksCount: number;
    totalRevenue: number;
    usersCount: number;
  };
}

interface OverviewStatsDataType {
  id: number;
  title: string;
  value: string | number;
}

function Stats({ topCounts }: StatsProps) {
  const OverviewStatsData: OverviewStatsDataType[] = [
    {
      id: 1,
      title: "Total Users",
      value: topCounts?.usersCount || 0,
    },
    {
      id: 2,
      title: "Documents Uploads",
      value: topCounts?.documentsCount || 0,
    },
    {
      id: 3,
      title: "Total Tasks",
      value: topCounts?.tasksCount || 0,
    },
    {
      id: 4,
      title: "Total Revenue",
      value: topCounts?.totalRevenue || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {OverviewStatsData.map((stat) => {
        const config = OverviewCardConfig[stat.id - 1];
        return (
          <DynamicStatsCard
            key={stat?.id}
            title={stat?.title}
            value={stat?.value}
            icon={config?.icon}
            color={config?.color}
          />
        );
      })}
    </div>
  );
}

export default Stats;
