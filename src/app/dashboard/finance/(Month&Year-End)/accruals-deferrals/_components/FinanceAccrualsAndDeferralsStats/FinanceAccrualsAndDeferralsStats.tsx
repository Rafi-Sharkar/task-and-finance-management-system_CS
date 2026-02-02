

"use client";

import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { useGetDraftAccrualDeferralSummaryQuery } from "@/redux/features/finance/accrualsAndDeferrals/accrualsAndDeferrals.api";

type FinanceProvisionsStatDataType = {
  id: number;
  title: string;
  value: string | number;
  color: string;
};

function FinanceAccrualsAndDeferralsStats() {
  //  Draft Accruals & Deferrals SUMMARY
  const { data: getDraftAccrualDeferralSummary } = useGetDraftAccrualDeferralSummaryQuery({});

  const FinanceProvisionsStatData: FinanceProvisionsStatDataType[] = [
    {
      id: 1,
      title: "Total Accruals",
      value: `$${getDraftAccrualDeferralSummary?.data?.totalAccruals || 0}`,
      color: "#B77D04",
    },
    {
      id: 2,
      title: "Total Deferrals",
      value: `$${getDraftAccrualDeferralSummary?.data?.totalDeferrals || 0}`,
      color: "#2563EB",
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

export default FinanceAccrualsAndDeferralsStats;
