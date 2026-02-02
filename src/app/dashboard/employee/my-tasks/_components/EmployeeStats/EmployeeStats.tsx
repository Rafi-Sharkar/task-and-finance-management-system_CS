import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";

import {
  EmployeeStatsStatsConfig,
  EmployeeStatsStatsData,
} from "./data/employeeStats.data";

function EmployeeStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {EmployeeStatsStatsData.map((stat, index) => {
        const config = EmployeeStatsStatsConfig[index];
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

export default EmployeeStats;
