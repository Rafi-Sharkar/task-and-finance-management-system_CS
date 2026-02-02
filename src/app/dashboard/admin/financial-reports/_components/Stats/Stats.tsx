/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import { CircleDollarSign, HandCoins, Clock, Wallet } from "lucide-react";

interface ManagementReportingTop {
  totalRevenue: string;
  thisMonthPaidAmount: string;
  thisMonthDueAmount: string;
  totalReserve: {
    cashIn: string;
    [key: string]: any;
  };
}

function Stats({
  managementReportingTop,
}: {
  managementReportingTop: ManagementReportingTop;
}) {
  const statsData = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `$${Number(managementReportingTop?.totalRevenue || 0).toLocaleString()}`,
      icon: CircleDollarSign,
      color: "#3B82F6",
    },
    {
      id: "paid",
      title: "Paid This Month",
      value: `$${Number(managementReportingTop?.thisMonthPaidAmount || 0).toLocaleString()}`,
      icon: HandCoins,
      color: "#10B981",
    },
    {
      id: "due",
      title: "Due This Month",
      value: `$${Number(managementReportingTop?.thisMonthDueAmount || 0).toLocaleString()}`,
      icon: Clock,
      color: "#F59E0B",
    },
    {
      id: "reserve",
      title: "Total Reserve",
      value: `$${Number(managementReportingTop?.totalReserve?.totalbalance || 0).toLocaleString()}`,
      icon: Wallet,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {statsData.map((stat) => (
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

export default Stats;
