/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { FinanceManagementReportingStatsDataConfig } from "./data/financeManagementReportingStats.data";

interface IFinanceStatsProps {
  managementReportingTop: {
    totalRevenue: string | number;
    thisMonthPaidAmount: number;
    thisMonthDueAmount: number;
    totalReserve: {
      cashIn: string | number;
      [key: string]: any;
    };
  };
}

function FinanceManagementReportingStats({ managementReportingTop }: IFinanceStatsProps) {
  const statsArray = [
    {
      id: 1,
      title: "Total Revenue",
      value: `$${managementReportingTop?.totalRevenue || 0}`,
    },
    {
      id: 2,
      title: "Paid This Month",
      value: `$${managementReportingTop?.thisMonthPaidAmount || 0}`,
    },
    {
      id: 3,
      title: "Due This Month",
      value: `$${managementReportingTop?.thisMonthDueAmount || 0}`,
    },
    {
      id: 4,
      title: "Total Reserve",
      value: `$${managementReportingTop?.totalReserve?.totalbalance || 0}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {statsArray.map((stat, index) => {
        const config = FinanceManagementReportingStatsDataConfig[index];
        return (
          <DynamicStatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={config?.icon}
            color={config?.color}
          />
        );
      })}
    </div>
  );
}

export default FinanceManagementReportingStats;