"use client";
import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { useGetDraftProvisionSummaryQuery } from "@/redux/features/finance/provision/provision.api";

type FinanceProvisionsStatDataType = {
  id: number;
  title: string;
  value: string | number;
  color: string;
};

function FinanceProvisionsStats() {
  const { data: provisionSummary } = useGetDraftProvisionSummaryQuery({});

  const FinanceProvisionsStatData: FinanceProvisionsStatDataType[] = [
    {
      id: 1,
      title: "Active Provisions",
      value: provisionSummary?.data?.totalCount || 0,
      color: "#2563EB",
    },
    {
      id: 2,
      title: "Total Amount",
      value: `$${provisionSummary?.data?.totalAmount || 0}`,
      color: "#B77D04",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {FinanceProvisionsStatData.map((stat) => {
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

export default FinanceProvisionsStats;
