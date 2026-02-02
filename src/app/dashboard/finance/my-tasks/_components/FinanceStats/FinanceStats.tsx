import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";

import {
  FinanceStatsStatsConfig,
  FinanceStatsStatsData,
} from "./data/financeStats.data";

function FinanceStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {FinanceStatsStatsData.map((stat, index) => {
        const config = FinanceStatsStatsConfig[index];
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

export default FinanceStats;
