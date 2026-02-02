"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import { TColumn } from "@/types/custom-table.types";

// আপনার API রেসপন্স অনুযায়ী ইন্টারফেস
interface IManagementReporting {
  period: string;
  Revenue: number;
  Expense: number;
  LossProfit: number;
}

interface IProps {
  managementReportingBottom: IManagementReporting[];
}

function FinanceManagementReportingTable({ managementReportingBottom }: IProps) {

  const tableConfig: TColumn<IManagementReporting>[] = [
    {
      header: "Month",
      accessor: "period", // API তে 'period' হিসেবে আসছে
    },
    {
      header: "Revenue",
      accessor: "Revenue",
      cell: (row) => <span>${row.Revenue}</span>
    },
    {
      header: "Expense",
      accessor: "Expense",
      cell: (row) => <span>${row.Expense}</span>
    },
    {
      header: "Profit/Loss",
      cell: (row) => {
        const isProfit = row.LossProfit >= 0;
        return (
          <span
            className={`font-medium ${isProfit ? "text-[#12B76A]" : "text-[#F04438]"
              }`}
          >
            {isProfit ? `+${row.LossProfit}` : row.LossProfit}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-5">
      <CustomTable
        columns={tableConfig}
        data={managementReportingBottom || []}
      />
    </div>
  );
}

export default FinanceManagementReportingTable;