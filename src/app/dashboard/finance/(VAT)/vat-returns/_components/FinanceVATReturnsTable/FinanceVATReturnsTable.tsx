"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, ListFilter, MoreVertical, Calendar, X } from "lucide-react";
import { toast } from "sonner";

// UI Components
import CustomTable from "@/components/shared/dashboard/CustomTable/CustomTable";
import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomPagination from "@/components/shared/dashboard/CustomPagination/CustomPagination";

// Hooks & API
import {
  useGetVatReturnByIdQuery,
  useGetVatReturnsQuery,
  useUpdateVatReturnStatusMutation
} from "@/redux/features/finance/vatReturn/vatReturn.api";
import useExportData from "@/hooks/useExportData";
import { TColumn } from "@/types/custom-table.types";
import { IFinanceVATReturn } from "./data/financeVATReturnsTable.data";


const PERIODS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  "Q1", "Q2", "Q3", "Q4"
];

function FinanceVATReturnsTable() {
  const searchParams = useSearchParams();

  // States for independent filtering
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [viewId, setViewId] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useGetVatReturnsQuery({
    vatStatus: statusFilter,
    search: selectedMonth || undefined, // Sends MARCH or Q1
    page,
    limit
  });

  const { data: singleReturn, isLoading: isSingleLoading } = useGetVatReturnByIdQuery(viewId, {
    skip: !viewId,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateVatReturnStatusMutation();

  const vatReturns = data?.data || [];
  const meta = data?.metadata;

  const { exportToCSV } = useExportData({ fileName: "Regulatory Reporting" });

  const handleExport = () => {
    if (vatReturns.length > 0) exportToCSV(vatReturns);
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateStatus({ id, status: "PAID" }).unwrap();
      toast.success("Updated status successfully!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const tableConfig: TColumn<IFinanceVATReturn>[] = [
    {
      header: "VAT Period",
      cell: (row) => `${row.period} ${row.years}`,
    },
    { header: "Output VAT", accessor: "outVat" },
    { header: "Input VAT", accessor: "inVat" },
    { header: "Net VAT", accessor: "netVat" },
    {
      header: "Status",
      cell: (row) => {
        const status = row.vatStatus;
        const colors =
          status === "SUBMITTED"
            ? { bg: "#EEF4FF", text: "#3538CD" }
            : status === "PAID"
              ? { bg: "#D1FADF", text: "#039855" }
              : { bg: "#F2F4F7", text: "#344054" };

        return <StatusBadge status={status} bgColor={colors.bg} textColor={colors.text} />;
      },
    },
    {
      header: "Action",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-1.5 text-[#667085] transition-colors hover:bg-gray-100">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 border bg-white shadow-lg">
            <DropdownMenuItem
              disabled={row.vatStatus === "PAID" || isUpdating}
              onClick={() => handleMarkAsPaid(row.id)}
              className="cursor-pointer"
            >
              {isUpdating ? "Updating..." : "Mark As Paid"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setViewId(row.id)}
              className="cursor-pointer font-medium text-[#155DFC]"
            >
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <section className="w-full space-y-5">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-white p-4 border border-gray-100">

        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-37.5 justify-between border-[#D5D7DA] bg-white">
                  {selectedMonth || "All Periods"}
                  <Calendar size={16} className="text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-60 overflow-y-auto bg-white">
                <DropdownMenuItem onClick={() => setSelectedMonth("")} className="text-blue-600 font-medium">
                  All Periods
                </DropdownMenuItem>
                {PERIODS.map((m) => (
                  <DropdownMenuItem key={m} onClick={() => setSelectedMonth(m)}>
                    {m}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Clear All Shortcut */}
          {(selectedMonth || statusFilter) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedMonth("");
                setStatusFilter(undefined);
              }}
              className="h-8 px-2 text-xs text-gray-500 hover:text-red-500 gap-1"
            >
              <X size={14} /> Clear Filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]"
          >
            <Download size={18} /> Export
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-[#D5D7DA] bg-[#FDFDFD] font-semibold text-[#181D27]">
                <ListFilter size={18} /> {statusFilter || "Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white">
              <DropdownMenuItem onClick={() => setStatusFilter("PENDING")}>PENDING</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("PAID")}>PAID</DropdownMenuItem>
              {statusFilter && (
                <DropdownMenuItem onClick={() => setStatusFilter(undefined)} className="text-red-600">
                  Clear Status
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-md bg-white border">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : vatReturns.length > 0 ? (
        <>
          <CustomTable columns={tableConfig} data={vatReturns} />
          {meta && <CustomPagination meta={meta} />}
        </>
      ) : (
        <div className="flex py-12 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-white">
          <p className="text-lg font-medium text-gray-900">No matching returns</p>
          <p className="text-sm text-gray-500">Try changing your month or year selection.</p>
        </div>
      )}

      {/* View Modal */}
      <Dialog open={!!viewId} onOpenChange={(open) => !open && setViewId(null)}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold border-b pb-4">VAT Return Details</DialogTitle>
          </DialogHeader>

          {isSingleLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : singleReturn?.data ? (
            <div className="space-y-6 py-4">
              {/* Financial summary content here as per previous code... */}
              <div className="flex justify-end pt-4">
                <Button onClick={() => setViewId(null)} variant="outline">Close</Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default FinanceVATReturnsTable;