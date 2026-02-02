"use client";

import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import { AlertTriangle, ListFilter, Search } from "lucide-react";
import {
  financeStatementsData,
  IFinanceStatement,
} from "./data/financeStatementsTable.data";

function FinanceStatementsTable() {
  const tableConfig: TColumn<IFinanceStatement>[] = [
    {
      header: "Item",
      accessor: "item",
    },
    {
      header: "Issue",
      accessor: "issue",
      cell: (row) => <span className="text-[#667085]">{row.issue}</span>,
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.status;
        const config = {
          Done: { bg: "#D1FADF", text: "#039855", icon: null },
          Pending: {
            bg: "#FEF0C7",
            text: "#B54708",
            icon: <AlertTriangle size={12} className="text-[#F79009]" />,
          },
          Missing: {
            bg: "#FEF0C7",
            text: "#B54708",
            icon: <AlertTriangle size={12} className="text-[#F79009]" />,
          },
        }[status] || { bg: "transparent", text: "inherit", icon: null };

        if (!status) return null;

        return (
          <StatusBadge
            status={status}
            bgColor={config.bg}
            textColor={config.text}
          >
            {config.icon}
            {status}
          </StatusBadge>
        );
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <button className="text-sm font-semibold text-[#344054] transition-all hover:underline">
          {row.actionLabel}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#667085]" />
          <Input
            type="search"
            placeholder="Search users, documents, invoices..."
            className="h-11 w-full border-[#D5D7DA] pl-12 shadow-none focus-visible:ring-1"
          />
        </div>

        <Button
          variant="outline"
          className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
        >
          <ListFilter size={18} /> Filter
        </Button>
      </div>
      <h2 className="text-xl font-semibold">Checklist</h2>
      <CustomTable columns={tableConfig} data={financeStatementsData} />
    </div>
  );
}

export default FinanceStatementsTable;
