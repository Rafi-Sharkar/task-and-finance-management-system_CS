import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import {
  ManagerManageTasksStatsConfig,
  ManagerManageTasksStatsData,
} from "./data/stats.data";
function ManagerManageTasksStats() {
  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-4">
      {ManagerManageTasksStatsData.map((stat, index) => {
        const config = ManagerManageTasksStatsConfig[index];
        return (
          <DynamicStatsCard
            key={stat?.id}
            title={stat?.title}
            value={stat?.value}
            color={config?.color}
          />
        );
      })}
    </div>
  );
}

export default ManagerManageTasksStats;
