"use client"

import { useGetFinanceSummaryTopQuery } from "@/redux/features/finance/financialStatements/financialStatements.api";
import React from "react";

interface StatCardProps {
  status: "Completed" | "Pending" | "Ready to Close";
  title: string;
  subtitle: string;
}

const STATUS_CONFIG: Record<
  StatCardProps["status"],
  {
    textColor: string;
  }
> = {
  Completed: {
    textColor: "text-green-600",
  },
  Pending: {
    textColor: "text-yellow-500",
  },
  "Ready to Close": {
    textColor: "text-yellow-500",
  },
};

const StatCard: React.FC<StatCardProps> = ({ status, title, subtitle }) => {
  return (
    <div className="ui-container flex flex-col gap-2">
      <h4
        className={`text-2xl font-semibold ${STATUS_CONFIG[status].textColor}`}
      >
        {status}
      </h4>

      <p className="text-base font-semibold text-[#344054]">{title}</p>

      <p className="text-xs text-[#667085]">{subtitle}</p>
    </div>
  );
};

const FinancialStatementsStats: React.FC = () => {
  // Fetch finance summary data
  const { data: getFinanceSummaryTop } = useGetFinanceSummaryTopQuery({});

  const statsData: StatCardProps[] = [
    {
      status: "Completed",
      title: "Accruals & Deferrals",
      subtitle: getFinanceSummaryTop?.accrual_deferral || "0/0",
    },
    {
      status: "Completed",
      title: "Provisions",
      subtitle: getFinanceSummaryTop?.provision || "0/0",
    },
    {
      status: "Pending",
      title: "Documents Attached",
      subtitle: getFinanceSummaryTop?.document_attached || "0/0",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          status={stat?.status}
          title={stat?.title}
          subtitle={stat?.subtitle}
        />
      ))}
    </div>
  );
};

export default FinancialStatementsStats;
