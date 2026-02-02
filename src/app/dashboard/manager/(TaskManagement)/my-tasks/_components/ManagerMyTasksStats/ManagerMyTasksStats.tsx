import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import {
  ManagerMyTasksStatsConfig,
  ManagerMyTasksStatsData,
} from "./data/managerMyTasksStats.data";

function ManagerMyTasksStats() {
  return (
    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-4">
      {ManagerMyTasksStatsData.map((stat, index) => {
        const config = ManagerMyTasksStatsConfig[index];
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

export default ManagerMyTasksStats;
