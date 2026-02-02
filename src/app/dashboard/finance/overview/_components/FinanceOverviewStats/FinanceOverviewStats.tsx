"use client";

import DynamicStatsCard from "@/components/shared/dashboard/DynamicStatsCard/DynamicStatsCard";
import {
  FileText,
  Clock,
  CheckCircle2,
  Receipt
} from "lucide-react";

interface FinanceTopOverview {
  totalInvoices: number;
  pendingPayments: number;
  paidPayments: string;
  dueVat: string;
}

function FinanceOverviewStats({
  financeTopOverview
}: {
  financeTopOverview: FinanceTopOverview
}) {

  const statsData = [
    {
      id: "total-invoices",
      title: "Total Invoices",
      value: `${financeTopOverview?.totalInvoices || 0}`,
      icon: FileText,
      color: "#3B82F6",
    },
    {
      id: "pending-payments",
      title: "Pending Payments",
      value: `$${Number(financeTopOverview?.pendingPayments || 0).toLocaleString()}`,
      icon: Clock,
      color: "#F59E0B",
    },
    {
      id: "paid-payments",
      title: "Paid Payments",
      value: `$${Number(financeTopOverview?.paidPayments || 0).toLocaleString()}`,
      icon: CheckCircle2,
      color: "#10B981",
    },
    {
      id: "due-vat",
      title: "Due VAT",
      value: `$${Number(financeTopOverview?.dueVat || 0).toLocaleString()}`,
      icon: Receipt,
      color: "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6 xl:grid-cols-4">
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

export default FinanceOverviewStats;