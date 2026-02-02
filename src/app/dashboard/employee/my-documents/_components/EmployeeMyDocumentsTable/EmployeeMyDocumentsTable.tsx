"use client";
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TColumn } from "@/types/custom-table.types";
import {
  Download,
  Eye,
  FileText,
  ListFilter,
  Search,
  Trash2,
} from "lucide-react";
import {
  employeeDocumentsTableData,
  IEmployeeDocument,
} from "./data/employeeMyDocumentsTable.data";

function EmployeeMyDocumentsTable() {
  const tableConfig: TColumn<IEmployeeDocument>[] = [
    {
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F4F7]">
            <FileText className="h-5 w-5 text-[#155DFC]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#101828]">
              {row.name}
            </span>
            <span className="mt-1 text-xs text-[#667085]">{row.size}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      cell: (row) => {
        const status = row.status;
        const colors =
          status === "Active"
            ? { bg: "#D1FADF", text: "#039855" }
            : status === "Pending"
              ? { bg: "#FEF0C7", text: "#B54708" }
              : status === "Rejected"
                ? { bg: "#FEE4E2", text: "#D92D20" }
                : { bg: "#F2F4F7", text: "#344054" };
        return (
          <StatusBadge
            status={status}
            bgColor={colors.bg}
            textColor={colors.text}
          />
        );
      },
    },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#155DFC] transition-colors hover:bg-blue-50">
            <Eye size={18} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#F04438] transition-colors hover:bg-red-50">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full space-y-6">
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

        <div className="flex items-center gap-3">
          {/* Export Button */}
          <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          {/* Filter Popover */}
          <Button
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <ListFilter size={18} /> Filter
          </Button>
        </div>
      </div>
      <CustomTable columns={tableConfig} data={employeeDocumentsTableData} />
    </section>
  );
}

export default EmployeeMyDocumentsTable;
